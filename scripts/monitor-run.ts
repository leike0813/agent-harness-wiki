import path from "node:path";
import { Command } from "commander";
import { readFile } from "node:fs/promises";
import {
  finishMonitorRun,
  startMonitorRun,
  precheckMonitorRun,
} from "../src/sources/monitor-run.js";
import {
  MonitorState,
  monitorResultSchema,
} from "../src/sources/monitor-state.js";
import { priorAudits } from "../src/sources/scan.js";
import { z } from "zod";

const command = new Command("monitor:run").description(
  "Observe daily without an LLM; claim at most five products for Sunday maintenance. JSON on stdout; errors on stderr.",
);
command.option("--root <path>", "Original dataset/worktree", ".");
command.option(
  "--observation-urls <file>",
  "Built runtime's registered stable document endpoints",
);
const root = () => path.resolve(String(command.opts().root));

command
  .command("status")
  .description("Read queue, weekly budget and the latest twenty task outcomes.")
  .action(async () => {
    const state = await MonitorState.open(root());
    try {
      process.stdout.write(`${JSON.stringify(state.status())}\n`);
    } finally {
      state.close();
    }
  });

command
  .command("precheck")
  .description(
    "Persist one observation. Exit 0 only for eligible Sunday work, 2 for a normal skip, 1 for failure. Run before launching an agent.",
  )
  .action(async () => {
    const file = command.opts().observationUrls as string | undefined;
    const urls = file
      ? z
          .record(
            z.string(),
            z.url().refine((url) => url.startsWith("https://")),
          )
          .parse(JSON.parse(await readFile(file, "utf8")))
      : undefined;
    const result = await precheckMonitorRun({
      root: root(),
      ...(urls ? { observationUrls: new Map(Object.entries(urls)) } : {}),
    });
    process.stdout.write(`${JSON.stringify(result)}\n`);
    if (!result.launch)
      process.exitCode = result.status === "delivery_blocked" ? 1 : 2;
  });

command
  .command("start")
  .description("Preflight a monitor round and print the handoff as JSON.")
  .requiredOption("--owner-pid <pid>")
  .action(async (options: { ownerPid: string }) => {
    const result = await startMonitorRun({
      root: root(),
      ownerPid: Number(options.ownerPid),
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  });

command
  .command("record")
  .description(
    "Record an automatic task or explicit manual maintenance outcome backed by an audit.",
  )
  .requiredOption(
    "--result <file>",
    "JSON: task_id (automatic only), harness_id, audit_id, outcome, reason",
  )
  .action(async (options: { result: string }) => {
    const result = monitorResultSchema.parse(
      JSON.parse(await readFile(options.result, "utf8")),
    );
    const audit = (await priorAudits(root(), result.harness_id)).find(
      (item) => item.audit_id === result.audit_id,
    );
    if (!audit)
      throw new Error("Result audit was not found in this product dataset.");
    const state = await MonitorState.open(root());
    try {
      state.record(result, audit);
    } finally {
      state.close();
    }
    process.stdout.write(`${JSON.stringify({ recorded: result })}\n`);
  });

command
  .command("finish")
  .description("Release this round's session lock and its temporary directory.")
  .argument("<session-id>")
  .action(async (sessionId: string) => {
    await finishMonitorRun(root(), sessionId);
    process.stdout.write(`${JSON.stringify({ finished: sessionId })}\n`);
  });

try {
  await command.parseAsync(process.argv);
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
