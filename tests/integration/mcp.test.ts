import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { afterAll, beforeAll, expect, test } from "vitest";
import { compileChapterRelease } from "../../src/compiler/chapter-release.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const cli = fileURLToPath(new URL("../../src/cli/index.ts", import.meta.url));
let root: string, client: Client, transport: StdioClientTransport;
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-mcp-"));
  await compileChapterRelease({
    datasetRoot: fixture,
    profile: "fixture",
    releaseId: "mcp-fixture",
    publishedAt: "2026-09-29T00:00:00Z",
    releasesRoot: root,
  });
  transport = new StdioClientTransport({
    command: process.execPath,
    args: [
      "--import",
      "tsx",
      cli,
      "mcp",
      "--release-id",
      "mcp-fixture",
      "--releases-root",
      root,
    ],
    stderr: "pipe",
  });
  client = new Client({ name: "ahw-smoke", version: "0.0.0" });
  await client.connect(transport);
});
afterAll(async () => {
  await client?.close();
  await transport?.close();
  if (root) await rm(root, { recursive: true, force: true });
});
async function call(name: string, args: Record<string, unknown>) {
  const result = await client.callTool({ name, arguments: args });
  if (!result.isError) {
    expect(result.structuredContent).toHaveProperty(
      "release_id",
      "mcp-fixture",
    );
    expect(result.content[0]).toEqual({
      type: "text",
      text: JSON.stringify(result.structuredContent),
    });
  }
  return result;
}
test("stdio exposes exactly five chapter tools and calls all five", async () => {
  expect((await client.listTools()).tools.map((x) => x.name)).toEqual([
    "list_harnesses",
    "get_topic",
    "search_knowledge",
    "compare_topics",
    "get_source",
  ]);
  await call("list_harnesses", { limit: 1 });
  const topic = await call("get_topic", {
    harness: "demo-open-cli",
    topic: "skills",
    version: "9.0.0",
  });
  expect((topic.structuredContent as Record<string, unknown>).status).toBe(
    "ok",
  );
  const section = await call("get_topic", {
    harness: "demo-open-cli",
    topic: "skills",
    section_id: "skills-overview",
  });
  expect((section.structuredContent as Record<string, unknown>).body).toContain(
    "skills.discovery",
  );
  const search = await call("search_knowledge", {
    harness: "demo-open-cli",
    text: "skills.discovery",
  });
  const found = search.structuredContent as {
    semantic_status: string;
    items: { section_id: string; match: string; source_scope: unknown[] }[];
  };
  expect(found.semantic_status).toBe("semantic_unavailable");
  expect(found.items[0]).toMatchObject({
    section_id: "skills-overview",
    match: "exact_question_id",
  });
  expect(found.items[0]?.source_scope.length).toBeGreaterThan(0);
  await call("compare_topics", {
    topic: "skills",
    targets: [{ harness: "demo-open-cli" }, { harness: "demo-package-cli" }],
  });
  await call("get_source", { reference_id: "ref-demo-open" });
  const missing = await call("get_topic", {
    harness: "absent",
    topic: "skills",
  });
  expect(missing.isError).not.toBe(true);
  expect((missing.structuredContent as Record<string, unknown>).status).toBe(
    "not_found",
  );
  expect(
    (
      await client.callTool({
        name: "get_topic",
        arguments: { harness: "demo-open-cli", topic: "bad" },
      })
    ).isError,
  ).toBe(true);
}, 20_000);
