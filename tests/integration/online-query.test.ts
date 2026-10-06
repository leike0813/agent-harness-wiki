import { createServer, type Server } from "node:http";
import { cp, mkdtemp, rm } from "node:fs/promises";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";
import { prepareOnlineRelease } from "../../src/compiler/online-release.js";
import { consumerResultSchemas } from "../../src/domain/consumer.js";
import { OnlineError } from "../../src/query/online-error.js";
import { OnlineQueryService } from "../../src/query/online-service.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);

let root: string | undefined;
let server: Server | undefined;
let service: OnlineQueryService | undefined;
const files = new Map<string, string>();
const requests: string[] = [];

interface TopicEditionView {
  edition_id: string;
  availability: string;
  sections: unknown;
  mappings: unknown[];
  resource?: string;
}

/** Mark one retained edition trimmed and map a version to it, as the online projection would. */
function trimSkillsHistory(): void {
  const key = "topics/demo-open-cli/skills/index.json";
  const topic = JSON.parse(files.get(key)!) as {
    editions: TopicEditionView[];
  } & Record<string, unknown>;
  const mapping = {
    schema_version: 3,
    record_kind: "fixture",
    mapping_id: "mapping-demo-open-skills-999",
    edition_id: "demo-open-cli-skills-v0",
    harness_id: "demo-open-cli",
    surface_id: "cli",
    software_version: "9.9.9",
    package_snapshot_id: "snapshot-demo-open-142-linux",
    scope: "section",
    sections: [
      { section_id: "skills-overview", evidence_ref: "ref-demo-open" },
    ],
  };
  // A whole-chapter mapping selects trimmed history for comparison targets,
  // which carry a version but no section.
  const chapterMapping = {
    ...mapping,
    mapping_id: "mapping-demo-open-skills-1000",
    software_version: "10.0.0",
    scope: "chapter",
  };
  topic.editions = topic.editions.map((edition) => {
    if (edition.edition_id !== "demo-open-cli-skills-v0") return edition;
    return {
      edition_id: edition.edition_id,
      sections: edition.sections,
      availability: "trimmed",
      mappings: [...edition.mappings, mapping, chapterMapping],
    };
  });
  files.set(key, JSON.stringify(topic));
  files.delete("chapters/demo-open-cli-skills-v0.json");
}

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "ahw-online-query-"));
  const datasetRoot = path.join(root, "dataset");
  await cp(fixture, datasetRoot, { recursive: true });
  const prepared = await prepareOnlineRelease({
    datasetRoot,
    profile: "fixture",
    commit: "a".repeat(40),
    publishedAt: "2026-10-02T00:00:00Z",
    base: "/",
  });
  for (const [key, resource] of prepared.resources)
    files.set(key, JSON.stringify(resource));
  trimSkillsHistory();
  files.set(
    "current.json",
    JSON.stringify({
      protocol_version: 1,
      release_id: prepared.releaseId,
      state: "active",
      manifest: "manifest.json",
    }),
  );
  server = createServer((request, response) => {
    const key = decodeURIComponent(
      new URL(request.url ?? "/", "http://localhost").pathname.slice(1),
    );
    requests.push(key);
    const body = files.get(key);
    if (body === undefined) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { "content-type": "application/json" });
    response.end(body);
  });
  await new Promise<void>((resolve) => server!.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  service = await OnlineQueryService.open({
    dataUrl: `http://127.0.0.1:${port}/`,
    cacheDir: path.join(root, "cache"),
  });
});

afterAll(async () => {
  service?.close();
  await new Promise<void>((resolve) => server?.close(() => resolve()));
  if (root) await rm(root, { recursive: true, force: true });
});

test("opens one fixed release and lists registry and catalog scope", async () => {
  const registry = consumerResultSchemas.list_harnesses.parse(
    await service!.listHarnesses({}),
  );
  expect(registry.release_id).toBe(service!.releaseId);
  expect(registry.access_mode).toBe("online");
  expect(registry.items.map((item) => item.harness_id).sort()).toEqual([
    "demo-open-cli",
    "demo-package-cli",
  ]);
  const catalog = consumerResultSchemas.list_harnesses.parse(
    await service!.listHarnesses({ scope: "catalog" }),
  );
  const candidate = catalog.items.find(
    (item) => item.registration === "candidate",
  );
  expect(candidate?.harness_id).toBe("demo-candidate");
  expect(candidate?.topics).toEqual([]);
});

test("online transcript reads and comparisons preserve missing coverage without fetching absent resources", async () => {
  const topic = consumerResultSchemas.get_topic.parse(
    await service!.getTopic({
      harness: "demo-open-cli",
      topic: "local_transcripts",
    }),
  );
  expect(topic.status).toBe("ok");
  if (!("questions" in topic))
    throw new Error("Expected transcript questions.");
  expect(topic.questions).toHaveLength(10);
  const start = requests.length;
  expect(
    (
      await service!.getTopic({
        harness: "demo-package-cli",
        topic: "local_transcripts",
      })
    ).status,
  ).toBe("not_investigated");
  expect(
    requests
      .slice(start)
      .some((request) =>
        request.endsWith(
          "topics/demo-package-cli/local_transcripts/index.json",
        ),
      ),
  ).toBe(false);
  const found = await service!.searchKnowledge({
    topic: "local_transcripts",
    text: "transcripts.schema",
  });
  expect(found.items[0]).toMatchObject({
    topic: "local_transcripts",
    section_id: "transcript-storage",
  });
  const compared = consumerResultSchemas.compare_topics.parse(
    await service!.compareTopics({
      topic: "local_transcripts",
      targets: [{ harness: "demo-open-cli" }, { harness: "demo-package-cli" }],
    }),
  );
  expect(compared.results.map((result) => result.status)).toEqual([
    "ok",
    "not_investigated",
  ]);
});

test("reads the current chapter with metadata and limited history", async () => {
  const topic = consumerResultSchemas.get_topic.parse(
    await service!.getTopic({ harness: "demo-open-cli", topic: "skills" }),
  );
  expect(topic.status).toBe("ok");
  if (!("body" in topic)) throw new Error("Expected a readable chapter.");
  expect(topic.history_scope).toBe("current_and_previous");
  expect(topic.edition_id).toBe("demo-open-cli-skills-v1");
  expect(topic.history).toContain("demo-open-cli-skills-v1");
  expect(topic.resolution.match_kind).toBe("current");
});

test("resolves exact, prefix, nearest-earlier and source-only versions", async () => {
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
    const result = await service!.getTopic({ ...base, version });
    expect(result).toMatchObject({ status: "ok" });
    if (!("resolution" in result)) throw new Error("Expected a resolution.");
    expect(result.resolution.match_kind).toBe(kind);
  }
  const whole = await service!.getTopic({
    harness: base.harness,
    topic: base.topic,
    version: "1.4.2",
    surface_id: "cli",
  });
  if (!("resolution" in whole)) throw new Error("Expected a resolution.");
  expect(whole.resolution.match_kind).toBe("source_only");
  const unsupported = await service!.getTopic({
    harness: "demo-open-cli",
    topic: "skills",
    version: "7.7.7",
    surface_id: "cli",
  });
  if (!("resolution" in unsupported)) throw new Error("Expected a resolution.");
  expect(unsupported.resolution.match_kind).toBe("source_only");
  expect(unsupported.status).toBe("ok");
  // A version with only a section mapping stays source_only for the whole
  // chapter rather than borrowing the section mapping.
  const sectionOnlyWhole = await service!.getTopic({
    harness: "demo-open-cli",
    topic: "skills",
    version: "9.9.9",
    surface_id: "cli",
  });
  if (!("resolution" in sectionOnlyWhole))
    throw new Error("Expected a resolution.");
  expect(sectionOnlyWhole.resolution.match_kind).toBe("source_only");
  expect(sectionOnlyWhole.status).toBe("ok");
});

test("reports ambiguous, not_found and not_investigated without technical errors", async () => {
  const ambiguous = await service!.getTopic({
    harness: "demo-package-cli",
    topic: "native_plugins",
    version: "1.4.2",
  });
  expect(ambiguous.status).toBe("ambiguous");
  expect(
    (
      await service!.getTopic({
        harness: "demo-open-cli",
        topic: "skills",
        surface_id: "missing",
      })
    ).status,
  ).toBe("not_found");
  expect(
    (
      await service!.getTopic({
        harness: "demo-open-cli",
        topic: "skills",
        section_id: "missing",
      })
    ).status,
  ).toBe("not_found");
  expect(
    (await service!.getTopic({ harness: "demo-candidate", topic: "skills" }))
      .status,
  ).toBe("not_investigated");
});

test("a section mapping to trimmed history never fetches the chapter", async () => {
  requests.length = 0;
  const topic = consumerResultSchemas.get_topic.parse(
    await service!.getTopic({
      harness: "demo-open-cli",
      topic: "skills",
      surface_id: "cli",
      section_id: "skills-overview",
      version: "9.9.9",
    }),
  );
  expect(topic).toMatchObject({
    status: "history_not_available",
    edition_id: "demo-open-cli-skills-v0",
  });
  if (!("resolution" in topic)) throw new Error("Expected a resolution.");
  expect(topic.resolution.match_kind).toBe("exact");
  expect("local_history_url" in topic).toBe(true);
  expect(
    requests.some((key) => key === "chapters/demo-open-cli-skills-v0.json"),
  ).toBe(false);
});

test("lexical search keeps exact ranking and drops semantic_status", async () => {
  const exact = consumerResultSchemas.search_knowledge.parse(
    await service!.searchKnowledge({
      harness: "demo-open-cli",
      text: "skills.discovery",
    }),
  );
  expect(exact.status).toBe("ok");
  expect(exact.items[0]?.match).toBe("exact_question_id");
  expect("semantic_status" in exact).toBe(false);
});

test("an invalid cursor is a technical invalid_cursor error", async () => {
  await expect(
    service!.searchKnowledge({ topic: "skills", cursor: "not-a-cursor" }),
  ).rejects.toMatchObject({ code: "invalid_cursor" });
});

test("compares common questions with metadata on every readable target", async () => {
  const compared = consumerResultSchemas.compare_topics.parse(
    await service!.compareTopics({
      topic: "skills",
      targets: [
        { harness: "demo-open-cli", surface_id: "cli" },
        { harness: "demo-package-cli", surface_id: "cli" },
      ],
    }),
  );
  expect(compared.questions.length).toBeGreaterThan(0);
  expect(compared.questions[0]?.entries).toHaveLength(2);
  for (const result of compared.results) {
    expect(result).toHaveProperty("knowledge_published_at");
    expect(result).toHaveProperty("history_scope", "current_and_previous");
  }
});

test("comparison preserves a trimmed target without manufacturing answers", async () => {
  const compared = consumerResultSchemas.compare_topics.parse(
    await service!.compareTopics({
      topic: "skills",
      targets: [
        { harness: "demo-open-cli", surface_id: "cli", version: "10.0.0" },
        { harness: "demo-package-cli", surface_id: "cli" },
      ],
    }),
  );
  expect(compared.results[0]).toMatchObject({
    status: "history_not_available",
    edition_id: "demo-open-cli-skills-v0",
  });
  expect(compared.questions).toEqual([]);
});

test("reads chapter and catalog sources and reports an absent ID as not_found", async () => {
  const chapter = consumerResultSchemas.get_source.parse(
    await service!.getSource({ reference_id: "ref-demo-open" }),
  );
  expect(chapter.status).toBe("ok");
  if (chapter.status !== "ok") throw new Error("Expected a source.");
  expect(chapter.source.reference_id).toBe("ref-demo-open");
  const catalog = await service!.getSource({
    reference_id: "ref-demo-candidate-catalog",
  });
  expect(catalog.status).toBe("ok");
  expect(
    (await service!.getSource({ reference_id: "ref-missing" })).status,
  ).toBe("not_found");
  expect(
    (
      await service!.getSource({
        reference_id: "ref-demo-open",
        surface_id: "web",
      })
    ).status,
  ).toBe("not_found");
});

test("a registered source whose file 404s is release_resource_missing", async () => {
  const key = "sources/ref-demo-open-doc.json";
  const saved = files.get(key)!;
  files.delete(key);
  try {
    await expect(
      service!.getSource({ reference_id: "ref-demo-open-doc" }),
    ).rejects.toMatchObject({ code: "release_resource_missing" });
  } finally {
    files.set(key, saved);
  }
});

test("a wrong source owner is rejected before caching and refetches after a fix", async () => {
  const key = "sources/ref-demo-open-doc.json";
  const saved = files.get(key)!;
  const record = JSON.parse(saved) as {
    reference: { record: { harness_id: string } };
  };
  record.reference.record.harness_id = "demo-package-cli";
  files.set(key, JSON.stringify(record));
  try {
    await expect(
      service!.getSource({ reference_id: "ref-demo-open-doc" }),
    ).rejects.toMatchObject({ code: "invalid_release_data" });
    files.set(key, saved);
    const restored = await service!.getSource({
      reference_id: "ref-demo-open-doc",
    });
    expect(restored.status).toBe("ok");
    const cached = await service!.getSource({
      reference_id: "ref-demo-open-doc",
    });
    expect(cached.status).toBe("ok");
  } finally {
    files.set(key, saved);
  }
});

test("an aborted call rejects as operation_cancelled", async () => {
  const controller = new AbortController();
  controller.abort();
  await expect(
    service!.getTopic(
      { harness: "demo-open-cli", topic: "skills" },
      controller.signal,
    ),
  ).rejects.toBeInstanceOf(OnlineError);
  await expect(
    service!.getTopic(
      { harness: "demo-open-cli", topic: "skills" },
      controller.signal,
    ),
  ).rejects.toMatchObject({ code: "operation_cancelled" });
});
