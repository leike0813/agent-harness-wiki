import { spawnSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";
import { compileChapterRelease } from "../../src/compiler/chapter-release.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const cli = fileURLToPath(new URL("../../src/cli/index.ts", import.meta.url));
let root: string;
const ahw = (...args: string[]) =>
  spawnSync(process.execPath, ["--import", "tsx", cli, ...args], {
    encoding: "utf8",
    timeout: 30_000,
  });
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-cli-"));
  await compileChapterRelease({
    datasetRoot: fixture,
    profile: "fixture",
    releaseId: "cli-fixture",
    publishedAt: "2026-09-29T00:00:00Z",
    releasesRoot: root,
  });
});
afterAll(async () => {
  if (root) await rm(root, { recursive: true, force: true });
});

test("CLI chapter commands share a release and preserve uncertainty", () => {
  const base = [
    "query",
    "--release-id",
    "cli-fixture",
    "--releases-root",
    root,
    "--json",
  ];
  const call = (...args: string[]) => {
    const result = ahw(...base, ...args);
    expect(result.status, result.stderr).toBe(0);
    return JSON.parse(result.stdout);
  };
  expect(call("list").items).toHaveLength(2);
  const topic = call(
    "topic",
    "--harness",
    "demo-open-cli",
    "--topic",
    "skills",
    "--version",
    "9.0.0",
  );
  expect(topic.release_id).toBe("cli-fixture");
  expect(topic.resolution.match_kind).toBe("source_only");
  expect(
    topic.questions.some((q: { status: string }) => q.status === "unknown"),
  ).toBe(true);
  expect(call("search", "--topic", "skills").items.length).toBeGreaterThan(0);
  const found = call(
    "search",
    "--harness",
    "demo-open-cli",
    "--text",
    "skills.discovery",
  );
  expect(found.semantic_status).toBe("semantic_unavailable");
  expect(found.items[0]).toMatchObject({
    section_id: "skills-overview",
    match: "exact_question_id",
  });
  expect(found.items[0].preview).toContain("skills.discovery");
  expect(found.items[0].source_scope[0].reference_id).toBe("ref-demo-open");
  expect(
    call(
      "compare",
      "--topic",
      "skills",
      "--targets",
      '[{"harness":"demo-open-cli"},{"harness":"demo-package-cli"}]',
    ).questions.length,
  ).toBeGreaterThan(0);
  expect(
    call("source", "--reference-id", "ref-demo-open").source.snapshot_id,
  ).toBeDefined();
  expect(
    ahw(...base, "topic", "--harness", "demo-open-cli", "--topic", "invalid")
      .status,
  ).not.toBe(0);
}, 20_000);
