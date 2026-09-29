import { Command } from "commander";
import { compileChapterRelease } from "../src/compiler/chapter-release.js";

const options = new Command()
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>")
  .requiredOption("--release-id <id>")
  .requiredOption("--published-at <timestamp>")
  .requiredOption("--releases-root <path>")
  .parse()
  .opts();
try {
  const result = await compileChapterRelease({
    datasetRoot: options.datasetRoot,
    profile: options.profile,
    releaseId: options.releaseId,
    publishedAt: options.publishedAt,
    releasesRoot: options.releasesRoot,
  });
  process.stdout.write(`${result.releaseDir}\n`);
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
