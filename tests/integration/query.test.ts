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

test("local transcripts preserve cited schema, missing coverage and comparison uncertainty", async () => {
  const topic = service.getTopic({
    harness: "demo-open-cli",
    topic: "local_transcripts",
    surface_id: "cli",
  });
  expect(topic.status).toBe("ok");
  if (topic.status !== "ok") throw new Error("Expected transcript chapter.");
  expect(topic.questions).toHaveLength(10);
  expect(
    topic.questions.find((q) => q.question_id === "transcripts.schema")
      ?.answers[0],
  ).toMatchObject({
    status: "partial",
    source_refs: ["ref-demo-open-transcripts"],
  });
  expect(topic.resolution.selected_version).toBeNull();
  expect(
    service.getTopic({
      harness: "demo-package-cli",
      topic: "local_transcripts",
    }).status,
  ).toBe("not_investigated");
  expect(
    service.getTopic({
      harness: "demo-open-cli",
      topic: "local_transcripts",
      surface_id: "desktop",
    }).status,
  ).toBe("not_investigated");
  const search = await service.searchKnowledge({ text: "transcripts.schema" });
  expect(search.items[0]).toMatchObject({
    topic: "local_transcripts",
    section_id: "transcript-storage",
    match: "exact_question_id",
  });
  expect(
    (
      await service.searchKnowledge({
        text: "会话记录",
        topic: "local_transcripts",
      })
    ).items.length,
  ).toBeGreaterThan(0);
  const compare = service.compareTopics({
    topic: "local_transcripts",
    targets: [{ harness: "demo-open-cli" }, { harness: "demo-package-cli" }],
  });
  expect(compare.results.map((result) => result.status)).toEqual([
    "ok",
    "not_investigated",
  ]);
  expect(compare.questions).toEqual([]);
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
    current.questions.find((q) => q.question_id === "skills.roots")?.answers[0]
      ?.status,
  ).toBe("unknown");
  const versioned = service.getTopic({
    harness: "demo-open-cli",
    topic: "skills",
    version: "9.0.0",
    surface_id: "cli",
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
    service.getSource({ reference_id: "ref-demo-open", surface_id: "cli" })
      .status,
  ).toBe("ok");
  expect(
    service.getSource({ reference_id: "ref-demo-open", surface_id: "missing" })
      .status,
  ).toBe("not_found");
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
    surface_id: "cli",
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
    surface_id: "cli",
  });
  expect(whole.status).toBe("ok");
  if (whole.status === "ok")
    expect(whole.resolution.match_kind).toBe("source_only");
});

test("current search reads back by section and cursors bind normalized query", async () => {
  const first = await service.searchKnowledge({ topic: "skills", limit: 1 });
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
  const exact = await service.searchKnowledge({
    harness: "demo-open-cli",
    text: "skills.discovery",
  });
  expect(exact.status).toBe("ok");
  expect(exact.semantic_status).toBe("semantic_unavailable");
  expect(exact.items[0]?.match).toBe("exact_question_id");
  await expect(
    service.searchKnowledge({
      topic: "mcp",
      limit: 1,
      cursor: first.next_cursor,
    }),
  ).rejects.toThrow(/Cursor/);
  const compared = service.compareTopics({
    topic: "skills",
    targets: [{ harness: "demo-open-cli" }, { harness: "demo-package-cli" }],
  });
  expect(compared.questions.length).toBeGreaterThan(0);
  expect(compared.questions[0]?.entries).toHaveLength(2);
});

test("catalog discovery and surface coverage remain separate from investigated knowledge", async () => {
  const registry = service.listHarnesses();
  const catalog = service.listHarnesses({ scope: "catalog" });
  expect(registry.items).toHaveLength(2);
  const candidate = catalog.items.find((x) => !x.registered)!;
  expect(candidate).toBeDefined();
  expect(candidate.topics).toEqual([]);
  expect(
    service.getSource({ reference_id: candidate.reference_ids[0] }).status,
  ).toBe("ok");
  expect(
    service.getTopic({ harness: candidate.harness_id, topic: "skills" }).status,
  ).toBe("not_investigated");
  expect(
    service.getTopic({
      harness: "demo-open-cli",
      topic: "skills",
      surface_id: "missing",
    }).status,
  ).toBe("not_found");
  expect(
    service.getTopic({
      harness: "demo-package-cli",
      topic: "native_plugins",
      version: "1.4.2",
    }).status,
  ).toBe("ambiguous");
  const whole = service.getTopic({ harness: "demo-open-cli", topic: "skills" });
  expect(whole.status).toBe("ok");
  if (whole.status !== "ok") return;
  expect(
    whole.questions.every((q) =>
      q.answers.some(
        (a) =>
          a.surface_ids.includes("desktop") && a.status === "not_investigated",
      ),
    ),
  ).toBe(true);
  const desktop = service.getTopic({
    harness: "demo-open-cli",
    topic: "skills",
    surface_id: "desktop",
  });
  expect(desktop.status).toBe("not_investigated");
  if (!("body" in desktop))
    throw new Error("Expected an explicit coverage result.");
  expect(desktop.body).toBe("");
  const searched = await service.searchKnowledge({
    harness: "demo-open-cli",
    topic: "skills",
    surface_id: "desktop",
  });
  expect(searched.status).toBe("not_investigated");
  expect(searched.items).toEqual([]);
  const cli = await service.searchKnowledge({
    harness: "demo-open-cli",
    surface_id: "cli",
    limit: 1,
  });
  expect(cli.items[0]?.surface_ids).toEqual(["cli"]);
  if (!("next_cursor" in cli))
    throw new Error("Expected another scoped section.");
  await expect(
    service.searchKnowledge({
      harness: "demo-open-cli",
      surface_id: "desktop",
      cursor: cli.next_cursor,
    }),
  ).rejects.toThrow(/Cursor/);
  const compared = service.compareTopics({
    topic: "skills",
    targets: [{ harness: "demo-open-cli" }, { harness: "demo-package-cli" }],
  });
  expect(
    compared.questions[0]?.entries[0]?.answers.some(
      (a) => a.status === "not_investigated",
    ),
  ).toBe(true);
});
