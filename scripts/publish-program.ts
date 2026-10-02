/**
 * Maintainer entrypoints for the independent npm program channel.
 *
 * `prepare`/`next`/`promote` write the shared publication ledger through
 * PublicationGithub; `probe` only reads the public site.
 * Nothing here reads an existing user npm configuration or a long-lived token.
 */
import { Command } from "commander";
import { readFileSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ConsumerProcess } from "../src/publication/consumer-verification.js";
import {
  PublicationGithub,
  PublicationError,
} from "../src/publication/github.js";
import {
  ProgramError,
  candidateManifest,
  nextCandidate,
  prepareCandidate,
  promoteCandidate,
} from "../src/publication/program.js";
import { verifyPublishedSite } from "../src/publication/readback.js";
import { defaultDataUrl } from "../src/query/online-client.js";
import { npmCli, runNode } from "./consumer-process.js";

const runner: ConsumerProcess = { npm: npmCli, runNode };

const program = new Command()
  .option(
    "--repository <owner/repo>",
    "Publication repository",
    process.env.GITHUB_REPOSITORY ?? "leike0813/agent-harness-wiki",
  )
  .option("--registry <url>", "npm registry", "https://registry.npmjs.org")
  .option("--data-url <url>", "Public v1 data entry", defaultDataUrl)
  .option("--work-dir <path>", "Owned local artifacts", "var/consumer-package");

const store = () =>
  new PublicationGithub({
    repository: program.opts().repository as string,
    token: process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN ?? "",
  });
const registry = () => program.opts().registry as string;
const now = () => new Date().toISOString();
const output = (value: unknown) =>
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
const write = async (file: string, value: unknown) => {
  await mkdir(path.dirname(path.resolve(file)), { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
};
/** Every report file under a directory; artifact subdirectories are kept. */
async function reportFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await reportFiles(full)));
    else if (entry.name.endsWith(".json")) files.push(full);
  }
  return files.sort();
}
/** The minimum Node the consumer supports, from the one package authority. */
function consumerMinimumNode(): string {
  const manifest = JSON.parse(
    readFileSync(path.join("packages/consumer/package.json"), "utf8"),
  ) as { engines?: { node?: string } };
  const match = /^>=\s*(\d+\.\d+\.\d+)/.exec(manifest.engines?.node ?? "");
  if (!match)
    throw new Error("packages/consumer declares no minimum Node version.");
  return match[1]!;
}

program
  .command("prepare")
  .requiredOption("--version <x.y.z>")
  .requiredOption("--commit <sha>")
  .requiredOption("--tgz <path>")
  .option("--package <name>", "Published package name")
  .option(
    "--out <path>",
    "Candidate manifest",
    "var/consumer-package/candidate.json",
  )
  .action(
    async (options: {
      version: string;
      commit: string;
      tgz: string;
      package?: string;
      out: string;
    }) => {
      const manifest = await candidateManifest({
        version: options.version,
        commit: options.commit,
        tgz: options.tgz,
        ...(options.package ? { package: options.package } : {}),
      });
      await prepareCandidate(store(), manifest, now());
      await write(options.out, manifest);
      output(manifest);
    },
  );

program
  .command("next")
  .requiredOption("--version <x.y.z>")
  .requiredOption("--commit <sha>")
  .requiredOption("--tgz <path>")
  .option("--package <name>", "Published package name")
  .action(
    async (options: {
      version: string;
      commit: string;
      tgz: string;
      package?: string;
    }) => {
      const manifest = await candidateManifest({
        version: options.version,
        commit: options.commit,
        tgz: options.tgz,
        ...(options.package ? { package: options.package } : {}),
      });
      const result = await nextCandidate({
        store: store(),
        runner,
        manifest,
        now: now(),
        registry: registry(),
      });
      output({ status: result.status, published: result.published });
      if (result.status === "bootstrap_required") {
        process.stderr.write(
          "bootstrap_required: the package cannot accept a trusted publish yet; publish the verified tgz interactively to next, then rerun this workflow.\n",
        );
        process.exitCode = 1;
      }
    },
  );

program
  .command("probe")
  .option("--out <path>", "Readback report", "var/consumer-package/probe.json")
  .action(async (options: { out: string }) => {
    const report = await verifyPublishedSite({
      dataUrl: program.opts().dataUrl as string,
    });
    await write(options.out, report);
    output({
      result: report.result,
      release_id: report.release_id,
      failures: report.failures,
    });
    if (report.result !== "passed") {
      process.stderr.write(
        `Public probe failed: ${report.failures.join(", ")}\n`,
      );
      process.exitCode = 1;
    }
  });

program
  .command("promote")
  .requiredOption("--version <x.y.z>")
  .requiredOption(
    "--release-id <web-v1-sha>",
    "Knowledge release the reports observed",
  )
  .requiredOption("--reports <dir>")
  .option("--min-node <version>", "Minimum Node version the matrix covered")
  .action(
    async (options: {
      version: string;
      releaseId: string;
      reports: string;
      minNode?: string;
    }) => {
      const reports: unknown[] = [];
      for (const file of await reportFiles(path.resolve(options.reports)))
        reports.push(JSON.parse(await readFile(file, "utf8")));
      const snapshot = await promoteCandidate({
        store: store(),
        runner,
        version: options.version,
        expectedReleaseId: options.releaseId,
        reports,
        now: now(),
        minimumNode: options.minNode ?? consumerMinimumNode(),
        registry: registry(),
      });
      output({
        latest: snapshot.state.npm.latest,
        candidates: snapshot.state.npm.candidates,
      });
    },
  );

try {
  await program.parseAsync();
} catch (error) {
  const code =
    error instanceof ProgramError || error instanceof PublicationError
      ? error.code
      : "program_failed";
  const reason = error instanceof Error ? error.message : String(error);
  process.stderr.write(
    `PROGRAM_RESULT ${JSON.stringify({ status: "error", code, reason })}\n`,
  );
  process.exitCode = 1;
}
