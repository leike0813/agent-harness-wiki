import path from "node:path";
import { Command } from "commander";
import {
  finishMonitorRun,
  startMonitorRun,
} from "../src/sources/monitor-run.js";

const command = new Command("monitor:run").description(
  "Preflight one monitor round from a dedicated worktree: fetch, decide the rolling branch, take the session lock and record a single observation. The coordinator continues with the harness-monitor skill; this command never runs a harness itself.",
);

command
  .command("start")
  .description("Preflight a monitor round and print the handoff as JSON.")
  .requiredOption("--owner-pid <pid>")
  .action(async (options: { ownerPid: string }) => {
    const result = await startMonitorRun({
      root: path.resolve("."),
      ownerPid: Number(options.ownerPid),
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  });

command
  .command("finish")
  .description("Release this round's session lock and its temporary directory.")
  .argument("<session-id>")
  .action(async (sessionId: string) => {
    await finishMonitorRun(path.resolve("."), sessionId);
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
