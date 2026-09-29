import { Command } from "commander";
import { publishChapterUpdate } from "../src/compiler/chapter-update.js";

const options = new Command()
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>")
  .requiredOption("--release-id <id>")
  .requiredOption("--published-at <timestamp>")
  .option("--releases-root <path>", "Release directory", "releases")
  .option(
    "--managed-audits <json>",
    "JSON array of current-invocation audit YAML paths",
    "[]",
  )
  .option("--managed-root <path>", "Managed package root", ".")
  .option("--managed-candidates <json>", "JSON array of managed IDs", "[]")
  .option(
    "--blocked <json>",
    "JSON array of {harness_id,topic} to retain",
    "[]",
  )
  .option("--no-managed", "Skip the managed refresh lane")
  .option("--stage", "Build without switching current")
  .parse()
  .opts();
try {
  const result = await publishChapterUpdate({
    datasetRoot: options.datasetRoot,
    profile: options.profile,
    releaseId: options.releaseId,
    publishedAt: options.publishedAt,
    releasesRoot: options.releasesRoot,
    managedAudits: JSON.parse(options.managedAudits),
    managedRoot: options.managedRoot,
    managedCandidates: JSON.parse(options.managedCandidates),
    blocked: JSON.parse(options.blocked),
    skipManaged: !options.managed,
    publishCurrent: !options.stage,
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.status === "blocked") process.exitCode = 1;
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
