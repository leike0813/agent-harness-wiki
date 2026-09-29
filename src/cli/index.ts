#!/usr/bin/env node
import { Command } from "commander";
import {
  compileChapterRelease,
  selectChapterRelease,
} from "../compiler/chapter-release.js";
import { loadAndValidateChapters } from "../validation/chapters.js";
import { QueryService } from "../query/service.js";
import { serveMcp } from "../mcp/server.js";

const program = new Command()
  .name("ahw")
  .description("Offline chapter knowledge queries");
const output = (value: unknown, json: boolean) =>
  process.stdout.write(`${JSON.stringify(value, null, json ? 0 : 2)}\n`);
const parseJson = (value: string): unknown => JSON.parse(value) as unknown;
program
  .command("validate")
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>")
  .action(async (x) => {
    if (x.profile !== "fixture" && x.profile !== "production")
      throw new Error("Invalid profile.");
    const result = await loadAndValidateChapters({
      root: x.datasetRoot,
      profile: x.profile,
    });
    for (const item of result.diagnostics)
      process.stderr.write(
        `${item.severity} ${item.code} ${item.file}${item.path}: ${item.reason}\n`,
      );
    if (!result.ok) process.exitCode = 1;
    else
      output({ valid: true, chapters: result.dataset.chapters.length }, true);
  });
program
  .command("compile")
  .requiredOption("--dataset-root <path>")
  .requiredOption("--profile <profile>")
  .requiredOption("--release-id <id>")
  .requiredOption("--published-at <timestamp>")
  .option("--releases-root <path>", "Release directory", "releases")
  .option("--stage", "Build without switching current")
  .action(async (x) => {
    const result = await compileChapterRelease({
      datasetRoot: x.datasetRoot,
      profile: x.profile,
      releaseId: x.releaseId,
      publishedAt: x.publishedAt,
      releasesRoot: x.releasesRoot,
      publishCurrent: !x.stage,
    });
    output(
      { release_id: result.manifest.release_id, directory: result.releaseDir },
      true,
    );
  });
program
  .command("publish")
  .requiredOption("--release-id <id>")
  .option("--releases-root <path>", "Release directory", "releases")
  .action(async (x) => {
    await selectChapterRelease(x.releasesRoot, x.releaseId);
    output({ release_id: x.releaseId, current: true }, true);
  });
const query = program
  .command("query")
  .option("--release-id <id>")
  .option("--releases-root <path>", "Release directory", "releases")
  .option("--json");
program
  .command("mcp")
  .option("--release-id <id>")
  .option("--releases-root <path>", "Release directory", "releases")
  .action(async (x) => {
    const service = await QueryService.open({
      releasesRoot: x.releasesRoot,
      ...(x.releaseId ? { releaseId: x.releaseId } : {}),
    });
    await serveMcp(service);
  });
async function runQuery<T>(
  callback: (service: QueryService) => T,
): Promise<void> {
  const x = query.opts();
  const service = await QueryService.open({
    releasesRoot: x.releasesRoot,
    ...(x.releaseId ? { releaseId: x.releaseId } : {}),
  });
  try {
    output(callback(service), Boolean(x.json));
  } finally {
    service.close();
  }
}
query
  .command("list")
  .option("--query <text>")
  .option("--limit <number>")
  .option("--cursor <cursor>")
  .action(async (x) =>
    runQuery((s) =>
      s.listHarnesses({
        ...(x.query ? { query: x.query } : {}),
        ...(x.limit ? { limit: Number(x.limit) } : {}),
        ...(x.cursor ? { cursor: x.cursor } : {}),
      }),
    ),
  );
query
  .command("topic")
  .requiredOption("--harness <name>")
  .requiredOption("--topic <topic>")
  .option("--section-id <id>")
  .option("--version <version>")
  .action(async (x) =>
    runQuery((s) =>
      s.getTopic({
        harness: x.harness,
        topic: x.topic,
        ...(x.sectionId ? { section_id: x.sectionId } : {}),
        ...(x.version ? { version: x.version } : {}),
      }),
    ),
  );
query
  .command("compare")
  .requiredOption("--topic <topic>")
  .requiredOption("--targets <json>", "Two to five product/version targets")
  .option("--question-ids <json>")
  .action(async (x) =>
    runQuery((s) =>
      s.compareTopics({
        topic: x.topic,
        targets: parseJson(x.targets),
        ...(x.questionIds ? { question_ids: parseJson(x.questionIds) } : {}),
      }),
    ),
  );
query
  .command("search")
  .option("--text <text>")
  .option("--harness <name>")
  .option("--topic <topic>")
  .option("--limit <number>")
  .option("--cursor <cursor>")
  .action(async (x) =>
    runQuery((s) =>
      s.searchKnowledge({
        ...(x.text ? { text: x.text } : {}),
        ...(x.harness ? { harness: x.harness } : {}),
        ...(x.topic ? { topic: x.topic } : {}),
        ...(x.limit ? { limit: Number(x.limit) } : {}),
        ...(x.cursor ? { cursor: x.cursor } : {}),
      }),
    ),
  );
query
  .command("source")
  .requiredOption("--reference-id <id>")
  .action(async (x) =>
    runQuery((s) => s.getSource({ reference_id: x.referenceId })),
  );
try {
  await program.parseAsync(process.argv);
} catch (error) {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
}
