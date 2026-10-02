import { Command } from "commander";
import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  PublicationGithub,
  PublicationError,
} from "../src/publication/github.js";
import {
  preparePublication,
  loadPublicationPlan,
  beginPublication,
  finishPublication,
  reconcilePublication,
} from "../src/publication/operations.js";
import { defaultDataUrl } from "../src/query/online-client.js";
import { freezeProtocol, retireProtocol } from "../src/publication/state.js";

const program = new Command()
  .option(
    "--repository <owner/repo>",
    "Publication repository",
    process.env.GITHUB_REPOSITORY ?? "leike0813/agent-harness-wiki",
  )
  .option("--data-url <url>", "Public v1 data entry", defaultDataUrl)
  .option(
    "--work-dir <path>",
    "Owned local operation artifacts",
    "var/publication",
  );
function github() {
  return new PublicationGithub({
    repository: program.opts().repository as string,
    token: process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "",
  });
}
const output = (value: unknown): void => {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
};
program
  .command("init")
  .description("Initialize the independent remote ledger once")
  .action(async () => output((await github().initialize()).state));
program
  .command("state")
  .description("Read the durable publication ledger")
  .action(async () => output((await github().readState()).state));
program
  .command("prepare")
  .requiredOption("--commit <sha>")
  .option("--execution-commit <sha>")
  .requiredOption("--run-id <id>")
  .option("--recovery-target <release>")
  .option("--dataset-root <path>", "Clean production source", ".")
  .option("--base <path>", "Project site base", "/agent-harness-wiki/")
  .action(
    async (options: {
      commit: string;
      executionCommit?: string;
      runId: string;
      recoveryTarget?: string;
      datasetRoot: string;
      base: string;
    }) => {
      const plan = await preparePublication({
        github: github(),
        commit: options.commit,
        executionCommit: options.executionCommit ?? options.commit,
        runId: options.runId,
        root: options.datasetRoot,
        base: options.base,
        workDir: program.opts().workDir as string,
        dataUrl: program.opts().dataUrl as string,
        ...(options.recoveryTarget
          ? { recoveryTarget: options.recoveryTarget }
          : {}),
      });
      if (process.env.GITHUB_OUTPUT)
        await appendFile(
          process.env.GITHUB_OUTPUT,
          `output=${plan.output}\ntarget=${plan.target}\n`,
        );
      output(plan);
    },
  );
program.command("begin").action(async () => {
  const plan = await loadPublicationPlan(
    path.join(program.opts().workDir as string, "plan.json"),
  );
  const started = await beginPublication(github(), plan);
  if (process.env.GITHUB_OUTPUT)
    await appendFile(process.env.GITHUB_OUTPUT, `started=${started}\n`);
  output({ started, target: plan.target });
});
program
  .command("finish")
  .requiredOption("--deployment-result <result>")
  .action(async (options: { deploymentResult: string }) => {
    const plan = await loadPublicationPlan(
      path.join(program.opts().workDir as string, "plan.json"),
    );
    await finishPublication(
      github(),
      plan,
      options.deploymentResult === "success",
    );
    output({ verified: true, target: plan.target });
  });
program
  .command("reconcile")
  .requiredOption("--deployment-id <id>")
  .option("--abort")
  .action(async (options: { deploymentId: string; abort?: boolean }) =>
    output(
      (
        await reconcilePublication(github(), {
          deploymentId: options.deploymentId,
          dataUrl: program.opts().dataUrl as string,
          ...(options.abort ? { abort: true } : {}),
        })
      ).state,
    ),
  );
program
  .command("freeze")
  .requiredOption("--protocol <number>")
  .requiredOption("--retire-at <ISO-time>")
  .requiredOption("--upgrade <guidance>")
  .action(
    async (options: {
      protocol: string;
      retireAt: string;
      upgrade: string;
    }) => {
      const client = github();
      const snapshot = await client.readState();
      freezeProtocol(
        snapshot.state,
        Number(options.protocol),
        new Date().toISOString(),
        options.retireAt,
        options.upgrade,
      );
      output(
        (
          await client.writeState(
            snapshot,
            `Freeze protocol ${options.protocol}`,
          )
        ).state,
      );
    },
  );
program
  .command("retire")
  .requiredOption("--protocol <number>")
  .action(async (options: { protocol: string }) => {
    const client = github();
    const snapshot = await client.readState();
    retireProtocol(
      snapshot.state,
      Number(options.protocol),
      new Date().toISOString(),
    );
    output(
      (await client.writeState(snapshot, `Retire protocol ${options.protocol}`))
        .state,
    );
  });
try {
  await program.parseAsync();
} catch (error) {
  const report = {
    status: "error",
    code: error instanceof PublicationError ? error.code : "publication_failed",
    reason: error instanceof Error ? error.message : "Publication failed.",
  };
  const directory = path.resolve(program.opts().workDir as string);
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, "failure.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  process.stderr.write(`${report.code}: ${report.reason}\n`);
  process.exitCode = 1;
}
