#!/usr/bin/env node
import { Command } from "commander";
import { compileRelease } from "../compiler/release.js";
import { loadAndValidateDataset } from "../validation/dataset.js";
import { QueryService } from "../query/service.js";

const program = new Command()
  .name("ahw")
  .description("Offline agent harness knowledge queries");
const output = (value: unknown, json: boolean) =>
  process.stdout.write(`${JSON.stringify(value, null, json ? 0 : 2)}\n`);
const parseJson = (value: string): unknown => JSON.parse(value) as unknown;

program
  .command("validate")
  .description("Validate an explicit structured dataset")
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>", "fixture or production")
  .action(async (options) => {
    if (options.profile !== "fixture" && options.profile !== "production")
      throw new Error("Profile must be fixture or production.");
    const result = await loadAndValidateDataset({
      root: options.datasetRoot,
      profile: options.profile,
    });
    for (const item of result.diagnostics)
      process.stderr.write(
        `${item.severity} ${item.code} ${item.file}${item.path}: ${item.reason} ${item.hint}\n`,
      );
    if (!result.ok) {
      process.exitCode = 1;
      return;
    }
    output({ valid: true, claims: result.dataset.claims.length }, true);
  });

program
  .command("compile")
  .description("Compile an immutable offline release")
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>", "fixture or production")
  .requiredOption("--release-id <id>")
  .requiredOption("--published-at <timestamp>")
  .option("--releases-root <path>", "Release directory", "releases")
  .action(async (options) => {
    const result = await compileRelease({
      datasetRoot: options.datasetRoot,
      profile: options.profile,
      releaseId: options.releaseId,
      publishedAt: options.publishedAt,
      releasesRoot: options.releasesRoot,
    });
    output(
      { release_id: result.manifest.release_id, directory: result.releaseDir },
      true,
    );
  });

const query = program
  .command("query")
  .description("Read one verified local release")
  .option("--release-id <id>", "Required for fixture releases")
  .option("--releases-root <path>", "Release directory", "releases")
  .option("--json", "Compact JSON output");

async function runQuery<T>(
  callback: (service: QueryService) => T,
): Promise<void> {
  const options = query.opts();
  const service = await QueryService.open({
    releasesRoot: options.releasesRoot,
    ...(options.releaseId ? { releaseId: options.releaseId } : {}),
  });
  try {
    output(callback(service), Boolean(options.json));
  } finally {
    service.close();
  }
}

query
  .command("list")
  .description("List published harnesses")
  .option("--search <text>")
  .option("--limit <number>")
  .option("--cursor <cursor>")
  .action(async (options) =>
    runQuery((service) =>
      service.listHarnesses({
        ...(options.search ? { search: options.search } : {}),
        ...(options.limit ? { limit: Number(options.limit) } : {}),
        ...(options.cursor ? { cursor: options.cursor } : {}),
      }),
    ),
  );

query
  .command("capability")
  .description("Read one Target's capability facts and coverage")
  .requiredOption("--harness <name>")
  .requiredOption("--surface <surface>")
  .requiredOption("--distribution <name>")
  .requiredOption("--os <os>")
  .requiredOption("--arch <arch>")
  .requiredOption("--execution-mode <mode>")
  .requiredOption(
    "--policy <policy>",
    "exact, latest_verified or latest_upstream",
  )
  .option("--version <value>", "Required for exact policy")
  .option("--version-kind <kind>", "release or commit", "release")
  .option("--topic <topic>")
  .option("--fact-key <key>")
  .option("--conditions <json>", "JSON array of condition predicates", "[]")
  .action(async (options) => {
    if (options.policy === "exact" && !options.version)
      throw new Error("Exact policy requires --version.");
    if (
      options.policy !== "exact" &&
      (options.version || options.versionKind !== "release")
    )
      throw new Error("Version options require exact policy.");
    return runQuery((service) =>
      service.getCapability({
        scope: {
          harness: options.harness,
          surface: options.surface,
          distribution: options.distribution,
          os: options.os,
          arch: options.arch,
          execution_mode: options.executionMode,
        },
        version:
          options.policy === "exact"
            ? {
                policy: "exact",
                identity: { kind: options.versionKind, value: options.version },
              }
            : { policy: options.policy },
        ...(options.topic ? { topic: options.topic } : {}),
        ...(options.factKey ? { fact_key: options.factKey } : {}),
        conditions: parseJson(options.conditions),
      }),
    );
  });

query
  .command("compare")
  .description("Compare two to five complete capability requests")
  .requiredOption("--requests <json>", "JSON array of capability requests")
  .action(async (options) =>
    runQuery((service) =>
      service.compareCapabilities({ requests: parseJson(options.requests) }),
    ),
  );

query
  .command("search")
  .description("Search published facts by text or structured filter")
  .option("--text <text>")
  .option("--harness <name>")
  .option("--topic <topic>")
  .option("--os <os>")
  .option("--version <value>", "Exact release version filter")
  .option("--limit <number>")
  .option("--cursor <cursor>")
  .action(async (options) =>
    runQuery((service) =>
      service.searchKnowledge({
        ...(options.text ? { text: options.text } : {}),
        ...(options.harness ? { harness: options.harness } : {}),
        ...(options.topic ? { topic: options.topic } : {}),
        ...(options.os ? { os: options.os } : {}),
        ...(options.version
          ? { version: { kind: "release", value: options.version } }
          : {}),
        ...(options.limit ? { limit: Number(options.limit) } : {}),
        ...(options.cursor ? { cursor: options.cursor } : {}),
      }),
    ),
  );

query
  .command("evidence")
  .description("Read one published evidence record")
  .requiredOption("--evidence-id <id>")
  .action(async (options) =>
    runQuery((service) =>
      service.getEvidence({ evidence_id: options.evidenceId }),
    ),
  );

try {
  await program.parseAsync(process.argv);
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
