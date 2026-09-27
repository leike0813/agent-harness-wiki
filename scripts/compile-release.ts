import { Command } from "commander";
import { compileRelease } from "../src/compiler/release.js";

const command = new Command()
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>")
  .requiredOption("--release-id <id>")
  .requiredOption("--published-at <timestamp>")
  .requiredOption("--releases-root <path>")
  .parse();

try {
  const options = command.opts();
  const result = await compileRelease({
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
