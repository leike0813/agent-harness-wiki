#!/usr/bin/env node
/**
 * Public consumer acceptance for one exact published version.
 *
 * Installs the exact version from the selected registry outside the source
 * tree with isolated npm configuration, then verifies the five CLI queries and
 * the five MCP tools over the real SDK against a published data URL. Defaults
 * to the public npm registry and the public Pages data entry; pass
 * `--registry` to point at a controlled registry instead.
 */
import { Command } from "commander";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { runPublicConsumerVerification } from "../src/publication/consumer-verification.js";
import { npmCli, runNode } from "./consumer-process.js";

const command = new Command()
  .name("verify-public-consumer")
  .description("Verify one exact published consumer version against a site")
  .requiredOption(
    "--package-version <version>",
    "Exact published version to install",
  )
  .requiredOption("--data-url <url>", "Published v1 data entry")
  .option("--registry <url>", "npm registry", "https://registry.npmjs.org")
  .option("--out <path>", "Write the JSON report to this path")
  .parse();

const options = command.opts<{
  packageVersion: string;
  dataUrl: string;
  registry: string;
  out?: string;
}>();

const report = await runPublicConsumerVerification({
  packageVersion: options.packageVersion,
  dataUrl: options.dataUrl,
  registry: options.registry,
  runner: { npm: npmCli, runNode },
});
const json = `${JSON.stringify(report, null, 2)}\n`;
if (options.out) {
  await mkdir(path.dirname(options.out), { recursive: true });
  await writeFile(options.out, json);
}
process.stdout.write(json);
if (report.result !== "passed") process.exitCode = 1;
