import { Command } from "commander";
import { buildOnlineSite } from "../src/compiler/online-site.js";

try {
  const command = new Command()
    .requiredOption("--dataset-root <path>")
    .requiredOption("--profile <profile>", "fixture or production")
    .requiredOption("--commit <sha>", "Full Git commit SHA")
    .requiredOption("--published-at <iso>")
    .requiredOption("--base <path>", "Public project subpath")
    .requiredOption("--out-dir <path>")
    .option(
      "--retain <directories...>",
      "Verified previous deployment directories",
    )
    .parse();
  const options = command.opts<{
    datasetRoot: string;
    profile: "fixture" | "production";
    commit: string;
    publishedAt: string;
    base: string;
    outDir: string;
    retain?: string[];
  }>();
  const result = await buildOnlineSite(options);
  process.stdout.write(`${JSON.stringify(result)}\n`);
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exitCode = 1;
}
