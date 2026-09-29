import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { afterAll, beforeAll, expect, test } from "vitest";
import { compileRelease } from "../../src/compiler/release.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/basic", import.meta.url),
);
const cli = fileURLToPath(new URL("../../src/cli/index.ts", import.meta.url));
const scope = {
  harness: "demo-open-cli",
  surface: "cli",
  distribution: "demo-package",
  os: "linux",
  arch: "x64",
  execution_mode: "native",
};
const version = (value: string) => ({
  policy: "exact",
  identity: { kind: "release", value },
});

let root: string;
let client: Client;
let transport: StdioClientTransport;
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-mcp-"));
  await compileRelease({
    datasetRoot: fixture,
    profile: "fixture",
    releaseId: "mcp-fixture",
    publishedAt: "2026-09-27T00:00:00Z",
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
    expect(result.structuredContent).toBeDefined();
    expect(result.content[0]).toEqual({
      type: "text",
      text: JSON.stringify(result.structuredContent),
    });
    expect(result.structuredContent).toHaveProperty(
      "release_id",
      "mcp-fixture",
    );
  }
  return {
    ...result,
    structuredContent: result.structuredContent as
      Record<string, unknown> | undefined,
  };
}

test("one pinned stdio server exposes exactly five read-only tools", async () => {
  const tools = (await client.listTools()).tools;
  expect(tools.map((tool) => tool.name)).toEqual([
    "list_harnesses",
    "get_capability",
    "compare_capabilities",
    "search_knowledge",
    "get_evidence",
  ]);
  expect(tools.every((tool) => tool.annotations?.readOnlyHint)).toBe(true);
}, 20_000);

test("five calls preserve business states, evidence and cursor binding", async () => {
  const first = await call("list_harnesses", { limit: 1 });
  expect(first.isError).not.toBe(true);
  const cursor = first.structuredContent?.next_cursor;
  expect(typeof cursor).toBe("string");
  const second = await call("list_harnesses", { limit: 1, cursor });
  expect(second.structuredContent?.items).toHaveLength(1);

  const capability = await call("get_capability", {
    scope,
    topic: "skills",
    version: version("1.4.2"),
    detail_level: "summary",
  });
  expect(capability.isError).not.toBe(true);
  expect(capability.structuredContent?.detail_level).toBe("summary");
  expect(capability.structuredContent?.facts).toHaveLength(1);
  const guided = await call("get_capability", {
    scope,
    topic: "custom_agents",
    version: version("1.4.2"),
    detail_level: "summary",
  });
  expect(
    (guided.structuredContent?.guides as { body: string }[])[0]?.body,
  ).toContain("虚构来源");
  const unverified = await call("get_capability", {
    scope,
    topic: "skills",
    version: version("9.0.0"),
  });
  expect(unverified.structuredContent?.status).toBe("not_verified");
  expect(unverified.isError).not.toBe(true);

  const compared = await call("compare_capabilities", {
    requests: [
      { scope, topic: "skills", version: version("1.4.2") },
      { scope, topic: "skills", version: version("9.0.0") },
    ],
  });
  expect(compared.isError).not.toBe(true);
  expect(compared.structuredContent?.results).toHaveLength(2);

  const searched = await call("search_knowledge", { topic: "skills" });
  expect(searched.isError).not.toBe(true);
  expect(
    (searched.structuredContent?.items as unknown[]).length,
  ).toBeGreaterThan(0);
  const guideSearch = await call("search_knowledge", {
    text: "虚构来源",
    harness: "demo-open-cli",
  });
  expect((guideSearch.structuredContent?.guides as unknown[]).length).toBe(1);

  const evidence = await call("get_evidence", {
    evidence_id: "evidence-demo-open-skills",
  });
  expect(evidence.isError).not.toBe(true);
  expect(evidence.structuredContent?.status).toBe("ok");
  expect(evidence.structuredContent?.excerpt_truncated).toBe(false);
}, 20_000);

test("invalid parameters and unrelated cursors fail without changing release", async () => {
  expect((await call("list_harnesses", { limit: 21 })).isError).toBe(true);
  expect((await call("search_knowledge", {})).isError).toBe(true);
  expect(
    (await call("get_evidence", { evidence_id: "../archive" })).isError,
  ).toBe(true);
  const first = await call("list_harnesses", { limit: 1 });
  const mismatch = await call("list_harnesses", {
    limit: 1,
    search: "demo",
    cursor: first.structuredContent?.next_cursor,
  });
  expect(mismatch.isError).toBe(true);
}, 20_000);
