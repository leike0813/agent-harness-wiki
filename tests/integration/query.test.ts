import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";
import { compileChapterRelease } from "../../src/compiler/chapter-release.js";
import { QueryService } from "../../src/query/service.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
let root: string, service: QueryService;
beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-query-"));
  await compileChapterRelease({
    datasetRoot: fixture,
    profile: "fixture",
    releaseId: "query-fixture",
    publishedAt: "2026-09-29T00:00:00Z",
    releasesRoot: root,
  });
  service = await QueryService.open({
    releasesRoot: root,
    releaseId: "query-fixture",
  });
});
afterAll(async () => {
  service?.close();
  if (root) await rm(root, { recursive: true, force: true });
});

test("chapter, section, source and history preserve source-only uncertainty", () => {
  const current = service.getTopic({
    harness: "demo-open-cli",
    topic: "skills",
  });
  expect(current.status).toBe("ok");
  if (current.status !== "ok") return;
  expect(current.history).toContain("demo-open-cli-skills-v0");
  expect(
    current.questions.find((q) => q.question_id === "skills.roots")?.status,
  ).toBe("unknown");
  const versioned = service.getTopic({
    harness: "demo-open-cli",
    topic: "skills",
    version: "9.0.0",
    section_id: "skills-overview",
  });
  expect(versioned.status).toBe("ok");
  if (versioned.status !== "ok") return;
  expect(versioned.resolution.match_kind).toBe("source_only");
  expect(versioned.resolution.selected_version).toBeNull();
  expect(versioned.body).toContain("skills.discovery");
  const source = service.getSource({ reference_id: "ref-demo-open" });
  expect(source.status).toBe("ok");
  expect(
    service.getTopic({
      harness: "demo-open-cli",
      topic: "skills",
      section_id: "missing",
    }).status,
  ).toBe("not_found");
});

test("section mapping resolves exact, prefix and nearest earlier without whole-chapter stitching", () => {
  const base = {
    harness: "demo-package-cli",
    topic: "native_plugins" as const,
    section_id: "plugin-behavior",
  };
  for (const [version, kind] of [
    ["1.4.2", "exact"],
    ["1.4", "prefix"],
    ["2.0.0", "nearest_earlier"],
  ] as const) {
    const result = service.getTopic({ ...base, version });
    expect(result.status).toBe("ok");
    if (result.status === "ok") expect(result.resolution.match_kind).toBe(kind);
  }
  const whole = service.getTopic({
    harness: base.harness,
    topic: base.topic,
    version: "1.4.2",
  });
  expect(whole.status).toBe("ok");
  if (whole.status === "ok")
    expect(whole.resolution.match_kind).toBe("source_only");
});

test("current search reads back by section and cursors bind normalized query", () => {
  const first = service.searchKnowledge({ topic: "skills", limit: 1 });
  expect(first.status).toBe("ok");
  if (first.status !== "ok") return;
  const item = first.items[0]!;
  expect(
    service.getTopic({
      harness: item.harness_id,
      topic: item.topic,
      section_id: item.section_id,
    }).status,
  ).toBe("ok");
  expect(first.next_cursor).toBeDefined();
  expect(() =>
    service.searchKnowledge({
      topic: "mcp",
      limit: 1,
      cursor: first.next_cursor,
    }),
  ).toThrow(/Cursor/);
  const compared = service.compareTopics({
    topic: "skills",
    targets: [{ harness: "demo-open-cli" }, { harness: "demo-package-cli" }],
  });
  expect(compared.questions.length).toBeGreaterThan(0);
  expect(compared.questions[0]?.entries).toHaveLength(2);
});
