import { Command } from "commander";
import { publishChapterUpdate } from "../src/compiler/chapter-update.js";

const options = new Command()
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>")
  .requiredOption("--release-id <id>")
  .requiredOption("--published-at <timestamp>")
  .option("--releases-root <path>", "Release directory", "releases")
  .option(
    "--blocked <json>",
    "JSON array of {harness_id,topic} to retain",
    "[]",
  )
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
    blocked: JSON.parse(options.blocked),
    publishCurrent: !options.stage,
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.status === "blocked") process.exitCode = 1;
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
