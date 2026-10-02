#!/usr/bin/env node
import { Command, CommanderError } from "commander";
import { readFileSync } from "node:fs";
import type * as z from "zod";
import { OnlineQueryService } from "../query/online-service.js";
import { defaultDataUrl } from "../query/online-client.js";
import { OnlineError, onlineErrorResult } from "../query/online-error.js";
import { serveMcp } from "../mcp/server.js";
import {
  listSchema,
  topicRequestSchema,
  compareSchema,
  searchSchema,
  sourceRequestSchema,
} from "../query/schema.js";

const packageInfo = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
) as { version: string; private?: boolean };
const version = packageInfo.private
  ? (
      JSON.parse(
        readFileSync(
          new URL("../../packages/consumer/package.json", import.meta.url),
          "utf8",
        ),
      ) as { version: string }
    ).version
  : packageInfo.version;
const program = new Command()
  .name("ahw")
  .version(version)
  .description(
    "Read published harness knowledge; search uses lexical matching only.",
  )
  .option("--data-url <URL>", "Published v1 data entry", defaultDataUrl)
  .option(
    "--offline",
    "Read previously cached resources without network access",
  )
  .option("--cache-dir <path>", "File cache directory")
  .option("--no-file-cache", "Disable file cache reads and writes")
  .option("--json", "Structured JSON output")
  .exitOverride();
program.configureOutput({ writeErr: () => {} });
const query = program
  .command("query")
  .description("Five read-only knowledge queries");
const lifetime = new AbortController();
process.once("SIGINT", () => lifetime.abort());
process.once("SIGTERM", () => lifetime.abort());
const output = (value: unknown) =>
  process.stdout.write(
    `${JSON.stringify(value, null, program.opts().json ? 0 : 2)}\n`,
  );
function open() {
  const options = program.opts();
  return OnlineQueryService.open({
    dataUrl: options.dataUrl,
    offline: Boolean(options.offline),
    fileCache: Boolean(options.fileCache),
    ...(options.cacheDir ? { cacheDir: options.cacheDir } : {}),
    signal: lifetime.signal,
    diagnostic: (message: string) => process.stderr.write(`${message}\n`),
  });
}
async function run<S extends z.ZodType>(
  schema: S,
  input: unknown,
  call: (service: OnlineQueryService, input: z.output<S>) => Promise<unknown>,
) {
  const parsed = schema.safeParse(input);
  if (!parsed.success)
    throw new OnlineError("invalid_input", "Query parameters are invalid.");
  const service = await open();
  try {
    output(await call(service, parsed.data));
  } finally {
    service.close();
  }
}
const optional = (
  value: unknown,
  key: string,
  transform: (value: unknown) => unknown = (x) => x,
) => (value !== undefined ? { [key]: transform(value) } : {});
const json = (value: unknown): unknown => JSON.parse(String(value)) as unknown;
query
  .command("list")
  .option("--scope <scope>")
  .option("--query <text>")
  .option("--limit <number>")
  .option("--cursor <cursor>")
  .action(async (x) =>
    run(
      listSchema,
      {
        ...optional(x.scope, "scope"),
        ...optional(x.query, "query"),
        ...optional(x.limit, "limit", Number),
        ...optional(x.cursor, "cursor"),
      },
      (s, input) => s.listHarnesses(input, lifetime.signal),
    ),
  );
query
  .command("topic")
  .requiredOption("--harness <name>")
  .requiredOption("--topic <topic>")
  .option("--surface-id <id>")
  .option("--section-id <id>")
  .option("--version <version>")
  .action(async (x) =>
    run(
      topicRequestSchema,
      {
        harness: x.harness,
        topic: x.topic,
        ...optional(x.surfaceId, "surface_id"),
        ...optional(x.sectionId, "section_id"),
        ...optional(x.version, "version"),
      },
      (s, input) => s.getTopic(input, lifetime.signal),
    ),
  );
query
  .command("search")
  .description("Lexical search of current readable sections")
  .option("--text <text>")
  .option("--harness <name>")
  .option("--topic <topic>")
  .option("--surface-id <id>")
  .option("--limit <number>")
  .option("--cursor <cursor>")
  .action(async (x) =>
    run(
      searchSchema,
      {
        ...optional(x.text, "text"),
        ...optional(x.harness, "harness"),
        ...optional(x.topic, "topic"),
        ...optional(x.surfaceId, "surface_id"),
        ...optional(x.limit, "limit", Number),
        ...optional(x.cursor, "cursor"),
      },
      (s, input) => s.searchKnowledge(input, lifetime.signal),
    ),
  );
query
  .command("compare")
  .requiredOption("--topic <topic>")
  .requiredOption("--targets <json>", "Two to five product/version targets")
  .option("--question-ids <json>")
  .action(async (x) =>
    run(
      compareSchema,
      {
        topic: x.topic,
        targets: json(x.targets),
        ...optional(x.questionIds, "question_ids", json),
      },
      (s, input) => s.compareTopics(input, lifetime.signal),
    ),
  );
query
  .command("source")
  .requiredOption("--reference-id <id>")
  .option("--surface-id <id>")
  .action(async (x) =>
    run(
      sourceRequestSchema,
      {
        reference_id: x.referenceId,
        ...optional(x.surfaceId, "surface_id"),
      },
      (s, input) => s.getSource(input, lifetime.signal),
    ),
  );
program
  .command("mcp")
  .description("Five read-only MCP tools over stdio")
  .action(async () => {
    const service = await open();
    lifetime.signal.addEventListener("abort", () => service.close(), {
      once: true,
    });
    await serveMcp(service, { version, online: true });
  });
try {
  await program.parseAsync(process.argv);
} catch (error) {
  if (error instanceof CommanderError && error.exitCode === 0) {
    /* help/version */
  } else {
    const failure =
      error instanceof CommanderError || error instanceof SyntaxError
        ? new OnlineError("invalid_input", "Command parameters are invalid.")
        : error;
    const result = onlineErrorResult(failure);
    if (program.opts().json || process.argv.includes("--json")) output(result);
    process.stderr.write(`${result.error.code}: ${result.error.reason}\n`);
    process.exitCode = 1;
  }
}
