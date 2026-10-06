import {
  cp,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import YAML from "yaml";
import { afterEach, expect, test } from "vitest";
import {
  compileChapterRelease,
  renderChapterDocs,
  type ChapterCompileOptions,
  verifyChapterRelease,
} from "../../src/compiler/chapter-release.js";
import {
  chapterEditionSchema,
  chapterPublishedKnowledgeSchema,
} from "../../src/domain/chapter.js";
import { catalogSchema } from "../../src/domain/catalog.js";
import { sha256 } from "../../src/compiler/projection.js";
import { QueryService } from "../../src/query/service.js";
import { loadAndValidateChapters } from "../../src/validation/chapters.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const roots: string[] = [];
async function temp(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-chapter-"));
  roots.push(root);
  return root;
}
async function copy(): Promise<string> {
  const root = await temp();
  await cp(fixture, path.join(root, "dataset"), { recursive: true });
  return path.join(root, "dataset");
}
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});
const build = (datasetRoot: string, releasesRoot: string, releaseId: string) =>
  compileChapterRelease({
    datasetRoot,
    releasesRoot,
    releaseId,
    profile: "fixture",
    publishedAt: "2026-09-29T00:00:00Z",
  });
const chapterPath =
  "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v1.md";
const mappingPath =
  "knowledge/demo-package-cli/mappings/mapping-demo-package-plugin-142.yaml";
const mcpReferencePath =
  "knowledge/demo-open-cli/references/ref-demo-open-mcp.yaml";
async function edit(
  root: string,
  relative: string,
  update: (text: string) => string,
): Promise<void> {
  const file = path.join(root, relative);
  await writeFile(file, update(await readFile(file, "utf8")));
}
async function mutateFrontmatter(
  root: string,
  relative: string,
  mutate: (doc: Record<string, unknown>) => void,
): Promise<void> {
  const file = path.join(root, relative);
  const text = await readFile(file, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/.exec(text)!;
  const doc = YAML.parse(match[1]!) as Record<string, unknown>;
  mutate(doc);
  await writeFile(
    file,
    `---\n${YAML.stringify(doc).trimEnd()}\n---\n${match[2]}`,
  );
}
async function digests(
  dir: string,
  relative = "",
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const entry of await readdir(path.join(dir, relative), {
    withFileTypes: true,
  })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) Object.assign(out, await digests(dir, name));
    else out[name] = sha256(await readFile(path.join(dir, name)));
  }
  return out;
}
async function markProduction(dir: string): Promise<void> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await markProduction(full);
    else if (/\.(ya?ml|md)$/i.test(entry.name)) {
      const text = await readFile(full, "utf8");
      if (text.includes("record_kind: fixture"))
        await writeFile(
          full,
          text.replaceAll("record_kind: fixture", "record_kind: production"),
        );
    }
  }
}

test("fixture chapters parse, preserve uncertainty, and reject malformed IDs", async () => {
  const result = await loadAndValidateChapters({
    root: fixture,
    profile: "fixture",
  });
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  expect(result.dataset.chapters).toHaveLength(16);
  expect(result.dataset.current).toHaveLength(15);
  expect(
    result.dataset.chapters
      .find((x) => x.edition_id === "demo-open-cli-skills-v1")
      ?.questions.find((x) => x.question_id === "skills.roots")?.answers[0]
      ?.status,
  ).toBe("unknown");
  expect(result.dataset.mappings).toHaveLength(1);
  expect(
    result.dataset.mappings.every((x) => x.harness_id !== "demo-open-cli"),
  ).toBe(true);
  expect(
    result.dataset.snapshots.find(
      (x) => x.snapshot_id === "snapshot-demo-open-doc",
    ),
  ).toMatchObject({ version_applicability: { kind: "unknown" } });
  expect(
    result.dataset.chapters
      .find((x) => x.edition_id === "demo-open-cli-mcp-v1")
      ?.questions.find((x) => x.question_id === "mcp.transport")?.answers[0]
      ?.status,
  ).toBe("partial");
  expect(
    chapterEditionSchema.safeParse({
      ...result.dataset.chapters[0],
      edition_id: "Bad ID",
    }).success,
  ).toBe(false);
  expect(
    (await loadAndValidateChapters({ root: fixture, profile: "production" }))
      .ok,
  ).toBe(false);
});

test("authored topics require current selections while unauthored topics may be absent", async () => {
  const root = await copy();
  const valid = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(valid.ok).toBe(true);
  if (valid.ok)
    expect(
      valid.dataset.current.some(
        (item) =>
          item.harness_id === "demo-package-cli" &&
          item.topic === "local_transcripts",
      ),
    ).toBe(false);
  await edit(root, "registry/chapter-current.yaml", (text) => {
    const selection = YAML.parse(text);
    selection.selections = selection.selections.filter(
      (item: { topic: string }) => item.topic !== "local_transcripts",
    );
    return YAML.stringify(selection);
  });
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((item) => item.code)).toContain(
    "CURRENT_MISSING",
  );
});

test("transcript chapters must index every fixed question", async () => {
  const root = await copy();
  await mutateFrontmatter(
    root,
    "knowledge/demo-open-cli/chapters/demo-open-cli-local_transcripts-v1.md",
    (doc) => {
      doc.questions = (doc.questions as { question_id: string }[]).filter(
        (question) => question.question_id !== "transcripts.cleanup",
      );
    },
  );
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((item) => item.code)).toContain(
    "QUESTION_MISSING",
  );
});

test("builder 6 remains readable with its frozen Markdown and builder 7 compiles current counts", async () => {
  const { releaseDir, manifest } = await build(
    fixture,
    await temp(),
    "frozen-builder",
  );
  expect(manifest.builder_version).toBe("7");
  const knowledge = chapterPublishedKnowledgeSchema.parse(
    JSON.parse(await readFile(path.join(releaseDir, "knowledge.json"), "utf8")),
  );
  const frozen = { ...manifest, builder_version: "6" };
  for (const [file, content] of renderChapterDocs(knowledge, {
    builderVersion: "6",
  })) {
    await writeFile(path.join(releaseDir, file), content);
    frozen.artifacts[file] = sha256(content);
  }
  await writeFile(
    path.join(releaseDir, "manifest.json"),
    JSON.stringify(frozen),
  );
  const before = await digests(releaseDir);
  expect((await verifyChapterRelease(releaseDir)).builder_version).toBe("6");
  const service = await QueryService.open({
    releasesRoot: path.dirname(releaseDir),
    releaseId: "frozen-builder",
  });
  try {
    expect(
      service.getTopic({ harness: "demo-open-cli", topic: "skills" }).status,
    ).toBe("ok");
  } finally {
    service.close();
  }
  expect(await digests(releaseDir)).toEqual(before);
});

test("registering a catalog candidate without chapters reports missing editions", async () => {
  const root = await copy();
  expect((await loadAndValidateChapters({ root, profile: "fixture" })).ok).toBe(
    true,
  );
  const catalog = YAML.parse(
    await readFile(path.join(root, "catalog/harnesses.yaml"), "utf8"),
  ) as { products: { harness_id: string }[] };
  const registered = new Set(
    (await readdir(path.join(root, "registry/harnesses"))).map((x) =>
      x.replace(/\.ya?ml$/i, ""),
    ),
  );
  const candidate = catalog.products.find((x) => !registered.has(x.harness_id));
  expect(candidate).toBeTruthy();
  if (!candidate) return;
  const sourceId = `source-${candidate.harness_id}`;
  await writeFile(
    path.join(root, `registry/sources/${sourceId}.yaml`),
    `schema_version: 1\nrecord_kind: fixture\nsource_id: ${sourceId}\nharness_id: ${candidate.harness_id}\nkind: official_documentation\nurl: https://example.com/${candidate.harness_id}\n`,
  );
  await writeFile(
    path.join(root, `registry/harnesses/${candidate.harness_id}.yaml`),
    `schema_version: 1\nrecord_kind: fixture\nharness_id: ${candidate.harness_id}\nsource_refs: [${sourceId}]\n`,
  );
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  if (result.ok) return;
  expect(result.diagnostics.map((x) => x.code)).toContain("CURRENT_MISSING");
});

test.each([
  [
    "missing citation",
    chapterPath,
    (s: string) => s.replace("[@ref-demo-open]", ""),
    "QUESTION_SOURCE_MISSING",
  ],
  [
    "cross-product citation",
    chapterPath,
    (s: string) => s.replace("ref-demo-open", "ref-demo-package"),
    "QUESTION_SOURCE_MISSING",
  ],
  [
    "incomplete whole-chapter mapping",
    mappingPath,
    (s: string) => s.replace("scope: section", "scope: chapter"),
    "MAPPING_INCOMPLETE",
  ],
  [
    "missing fixed snapshot",
    mcpReferencePath,
    (s: string) =>
      s.replace("snapshot-demo-open-142-linux", "missing-snapshot"),
    "SOURCE_REFERENCE_MISMATCH",
  ],
  [
    "invalid locator",
    mcpReferencePath,
    (s: string) => s.replace("end: 3", "end: 1"),
    "LOCATOR_INVALID",
  ],
] as const)("rejects %s", async (_label, relative, update, code) => {
  const root = await copy();
  await edit(root, relative, update);
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((x) => x.code)).toContain(code);
});

test("an answer pointing at an absent section is rejected", async () => {
  const root = await copy();
  await mutateFrontmatter(root, chapterPath, (doc) => {
    const questions = doc.questions as { answers: { section_id: string }[] }[];
    questions[0]!.answers[0]!.section_id = "absent";
  });
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((x) => x.code)).toContain(
    "QUESTION_SECTION_MISMATCH",
  );
});

test("an undeclared section surface is rejected", async () => {
  const root = await copy();
  await mutateFrontmatter(root, chapterPath, (doc) => {
    const sections = doc.sections as { surface_ids: string[] }[];
    sections[0]!.surface_ids = ["ghost"];
  });
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((x) => x.code)).toContain(
    "SECTION_SURFACE_INVALID",
  );
});

test("overlapping answers for one surface are rejected", async () => {
  const root = await copy();
  await mutateFrontmatter(root, chapterPath, (doc) => {
    const questions = doc.questions as {
      answers: {
        surface_ids: string[];
        section_id: string;
        status: string;
        source_refs: string[];
      }[];
    }[];
    const first = questions[0]!.answers[0]!;
    // A deep clone keeps YAML.stringify from emitting shared-node anchors.
    questions[0]!.answers.push({
      ...first,
      surface_ids: [...first.surface_ids],
      source_refs: [...first.source_refs],
    });
  });
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(false);
  expect(result.diagnostics.map((x) => x.code)).toContain(
    "ANSWER_SURFACE_OVERLAP",
  );
});

test("natural prose can answer an indexed question without a paragraph label", async () => {
  const root = await copy();
  await edit(root, chapterPath, (s) =>
    s.replace(
      "**skills.discovery**：虚构来源描述了项目 Skill 的发现路径。",
      "项目 Skill 的发现路径由虚构来源描述。",
    ),
  );
  const result = await loadAndValidateChapters({ root, profile: "fixture" });
  expect(result.ok).toBe(true);
});

test("repeat builds agree across JSON, SQLite, Markdown; mapping-only release keeps chapter bytes", async () => {
  const dataset = await copy();
  const leftRoot = await temp(),
    rightRoot = await temp();
  const left = await build(dataset, leftRoot, "first");
  const right = await build(dataset, rightRoot, "first");
  expect(await verifyChapterRelease(left.releaseDir)).toEqual(left.manifest);
  expect(left.manifest.history).toEqual(["demo-open-cli-skills-v0"]);
  const search = JSON.parse(
    await readFile(path.join(left.releaseDir, "search.json"), "utf8"),
  ) as {
    schema_version: number;
    sections: {
      edition_id: string;
      surface_ids: string[];
      question_wording: string[];
    }[];
  };
  expect(search.schema_version).toBe(2);
  expect(search.sections.every((x) => x.surface_ids.length > 0)).toBe(true);
  expect(
    search.sections.every(
      (section) => section.edition_id !== "demo-open-cli-skills-v0",
    ),
  ).toBe(true);
  expect(
    search.sections.some((section) =>
      section.question_wording.some((wording) => wording.includes("扫描")),
    ),
  ).toBe(true);
  expect(
    Object.entries(left.manifest.artifacts).filter(([name]) =>
      name.endsWith(".md"),
    ),
  ).toEqual(
    Object.entries(right.manifest.artifacts).filter(([name]) =>
      name.endsWith(".md"),
    ),
  );
  expect(await readFile(path.join(left.releaseDir, "knowledge.json"))).toEqual(
    await readFile(path.join(right.releaseDir, "knowledge.json")),
  );
  const knowledge = JSON.parse(
    await readFile(path.join(left.releaseDir, "knowledge.json"), "utf8"),
  );
  expect(knowledge.records.current).toHaveLength(15);
  expect(knowledge.records.chapters).toHaveLength(16);
  expect(knowledge.records.mappings[0].scope).toBe("section");
  expect(
    await readFile(
      path.join(left.releaseDir, "docs/harnesses/demo-open-cli/skills.md"),
      "utf8",
    ),
  ).toContain("| `skills.discovery` | cli | answered |");
  const db = new Database(path.join(left.releaseDir, "knowledge.sqlite"), {
    readonly: true,
  });
  try {
    expect(db.prepare("SELECT count(*) AS n FROM current").get()).toEqual({
      n: knowledge.records.current.length,
    });
    expect(db.prepare("SELECT count(*) AS n FROM questions").get()).toEqual({
      n: knowledge.records.chapters.reduce(
        (n: number, x: { questions: unknown[] }) => n + x.questions.length,
        0,
      ),
    });
    expect(db.pragma("foreign_key_check")).toEqual([]);
  } finally {
    db.close();
  }
  const chapterFile = "docs/chapters/demo-package-cli-native_plugins-v1.md";
  const before = await readFile(path.join(left.releaseDir, chapterFile));
  const mapping2 = path.join(
    dataset,
    "knowledge/demo-package-cli/mappings/mapping-demo-package-plugin-remaining-142.yaml",
  );
  await writeFile(
    mapping2,
    (await readFile(path.join(dataset, mappingPath), "utf8"))
      .replace(
        "mapping-demo-package-plugin-142",
        "mapping-demo-package-plugin-remaining-142",
      )
      .replace("plugin-behavior", "plugin-remaining"),
  );
  const second = await build(dataset, leftRoot, "second");
  expect(await readFile(path.join(second.releaseDir, chapterFile))).toEqual(
    before,
  );
  expect((await verifyChapterRelease(second.releaseDir)).release_id).toBe(
    "second",
  );
}, 30_000);

test("invalid input and corrupt output leave current pointer unchanged", async () => {
  const dataset = await copy(),
    root = await temp();
  const first = await build(dataset, root, "first");
  const pointer = await readFile(path.join(root, "current.json"), "utf8");
  await edit(dataset, mappingPath, (s) =>
    s.replace("scope: section", "scope: chapter"),
  );
  await expect(build(dataset, root, "bad")).rejects.toThrow(
    /MAPPING_INCOMPLETE/,
  );
  expect(await readFile(path.join(root, "current.json"), "utf8")).toBe(pointer);
  await edit(dataset, mappingPath, (s) =>
    s.replace("scope: chapter", "scope: section"),
  );
  await edit(
    dataset,
    chapterPath,
    (s) => `${s}\nChanged without a new edition.\n`,
  );
  await expect(build(dataset, root, "changed")).rejects.toThrow(
    /Immutable chapter edition changed/,
  );
  expect(await readFile(path.join(root, "current.json"), "utf8")).toBe(pointer);
  const json = path.join(first.releaseDir, "knowledge.json");
  await writeFile(json, `${await readFile(json, "utf8")}damage`);
  await expect(verifyChapterRelease(first.releaseDir)).rejects.toThrow(
    /hash mismatch/i,
  );
  expect(await readFile(path.join(root, "current.json"), "utf8")).toBe(pointer);
});

type SemanticFile = {
  model: {
    name: string;
    digest: string;
    blob_sha256: string;
    dimensions: number;
    license: string;
    source_url: string;
  };
  passages: {
    edition_id: string;
    section_id: string;
    ordinal: number;
    vector: number[];
  }[];
};

test("production compile reuses unchanged semantic vectors and re-embeds only new editions", async () => {
  const lock = JSON.parse(
    await readFile(path.resolve("registry/search-model.json"), "utf8"),
  ) as {
    name: string;
    digest: string;
    blob_sha256: string;
    dimensions: number;
  };
  const vector = (input: string): number[] => {
    const values: number[] = [];
    let seed = sha256(input);
    while (values.length < lock.dimensions) {
      seed = sha256(seed);
      for (
        let i = 0;
        i < seed.length && values.length < lock.dimensions;
        i += 2
      )
        values.push(Number.parseInt(seed.slice(i, i + 2), 16) / 256 + 0.001);
    }
    return values;
  };
  const embedded: string[] = [];
  let embedRequests = 0;
  const server = createServer((request, response) => {
    const send = (status: number, body: unknown) => {
      response.writeHead(status, { "content-type": "application/json" });
      response.end(JSON.stringify(body));
    };
    if (request.method === "GET" && request.url === "/api/tags")
      return send(200, { models: [{ name: lock.name, digest: lock.digest }] });
    if (request.method === "POST" && request.url === "/api/show")
      return send(200, { modelfile: `FROM x sha256-${lock.blob_sha256}` });
    if (request.method === "POST" && request.url === "/api/embed") {
      let raw = "";
      request.on("data", (chunk) => (raw += chunk));
      request.on("end", () => {
        const { input } = JSON.parse(raw) as { input: string[] };
        embedRequests += 1;
        embedded.push(...input);
        send(200, { model: lock.name, embeddings: input.map(vector) });
      });
      return;
    }
    send(404, {});
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const endpoint = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const dataset = await copy();
  await markProduction(dataset);
  const root = await temp();
  try {
    const compile = (releaseId: string) => {
      const options: ChapterCompileOptions & { ollamaEndpoint: string } = {
        datasetRoot: dataset,
        releasesRoot: root,
        releaseId,
        profile: "production",
        publishedAt: "2026-09-29T00:00:00Z",
        ollamaEndpoint: endpoint,
      };
      return compileChapterRelease(options);
    };
    const semantic = async (dir: string): Promise<SemanticFile> => {
      const lines = (await readFile(path.join(dir, "semantic.jsonl"), "utf8"))
        .split("\n")
        .filter((line) => line.trim());
      const [header, ...passages] = lines.map((line) => JSON.parse(line));
      return { ...(header as SemanticFile), passages } as SemanticFile;
    };
    const keyOf = (passage: SemanticFile["passages"][number]): string =>
      `${passage.edition_id}|${passage.section_id}|${passage.ordinal}`;

    const first = await compile("prod-first");
    const firstSemantic = await semantic(first.releaseDir);
    expect(firstSemantic.model.digest).toBe(lock.digest);
    expect(firstSemantic.model).toEqual(lock);
    for (const passage of firstSemantic.passages) {
      expect(passage.vector).toHaveLength(lock.dimensions);
      expect(Math.abs(Math.hypot(...passage.vector) - 1)).toBeLessThan(0.00001);
    }
    expect(firstSemantic.passages.length).toBeGreaterThan(0);
    expect(embedded.length).toBeGreaterThan(0);
    expect(embedded.length).toBeLessThanOrEqual(firstSemantic.passages.length);
    expect(new Set(embedded).size).toBe(embedded.length);
    expect(embedRequests).toBeGreaterThan(0);
    const firstVectors = new Map(
      firstSemantic.passages.map((p) => [keyOf(p), JSON.stringify(p.vector)]),
    );

    // Catalog-only metadata change embeds nothing and reuses the same vectors.
    const catalogFile = path.join(dataset, "catalog/harnesses.yaml");
    const catalog = YAML.parse(await readFile(catalogFile, "utf8")) as {
      products: { harness_id: string; aliases: string[] }[];
    };
    catalog.products
      .find((x) => x.harness_id === "demo-open-cli")!
      .aliases.push("catalog-only-alias");
    await writeFile(catalogFile, YAML.stringify(catalog));
    const embeddedBeforeCatalog = embedded.length;
    const requestsBeforeCatalog = embedRequests;
    const catalogRelease = await compile("prod-catalog");
    expect(embedded.length).toBe(embeddedBeforeCatalog);
    expect(embedRequests).toBe(requestsBeforeCatalog);
    expect(
      await readFile(path.join(catalogRelease.releaseDir, "semantic.jsonl")),
    ).toEqual(await readFile(path.join(first.releaseDir, "semantic.jsonl")));

    // A fresh edition with a changed body re-embeds only that edition.
    const skillsV1 = await readFile(
      path.join(
        dataset,
        "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v1.md",
      ),
      "utf8",
    );
    await writeFile(
      path.join(
        dataset,
        "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v2.md",
      ),
      skillsV1
        .replaceAll("demo-open-cli-skills-v1", "demo-open-cli-skills-v2")
        .replace(
          "虚构来源描述了项目 Skill 的发现路径。",
          "虚构来源说明了项目 Skill 的发现路径。",
        ),
    );
    const currentFile = path.join(dataset, "registry/chapter-current.yaml");
    const current = YAML.parse(await readFile(currentFile, "utf8")) as {
      selections: { harness_id: string; topic: string; edition_id: string }[];
    };
    current.selections.find(
      (x) => x.harness_id === "demo-open-cli" && x.topic === "skills",
    )!.edition_id = "demo-open-cli-skills-v2";
    await writeFile(currentFile, YAML.stringify(current));
    const embeddedBeforeEdition = embedded.length;
    const requestsBeforeEdition = embedRequests;
    const edition = await compile("prod-edition");
    const editionSemantic = await semantic(edition.releaseDir);
    const changed = editionSemantic.passages.filter(
      (p) => p.edition_id === "demo-open-cli-skills-v2",
    );
    expect(changed.length).toBeGreaterThan(0);
    const reEmbedded = embedded.length - embeddedBeforeEdition;
    expect(reEmbedded).toBeGreaterThan(0);
    expect(reEmbedded).toBeLessThanOrEqual(changed.length);
    expect(reEmbedded).toBeLessThan(firstSemantic.passages.length);
    expect(embedRequests - requestsBeforeEdition).toBeGreaterThan(0);
    for (const passage of editionSemantic.passages) {
      if (passage.edition_id === "demo-open-cli-skills-v2") continue;
      expect(JSON.stringify(passage.vector)).toBe(
        firstVectors.get(keyOf(passage)),
      );
    }

    // Recompiling the same corpus reuses every passage, changed edition included.
    const embeddedBeforeRepeat = embedded.length;
    const repeat = await compile("prod-edition-again");
    expect(embedded.length).toBe(embeddedBeforeRepeat);
    expect(
      await readFile(path.join(repeat.releaseDir, "semantic.jsonl")),
    ).toEqual(await readFile(path.join(edition.releaseDir, "semantic.jsonl")));
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}, 120_000);

test("cross-schema publish verifies a historical release and skips the frozen compare", async () => {
  const dataset = await copy(),
    root = await temp();
  const first = await build(dataset, root, "first");
  const manifestPath = path.join(first.releaseDir, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Record<
    string,
    unknown
  >;
  await writeFile(
    manifestPath,
    `${JSON.stringify(
      { ...manifest, schema_version: 2, builder_version: "5" },
      null,
      2,
    )}\n`,
  );
  const before = await digests(first.releaseDir);
  await edit(dataset, chapterPath, (s) =>
    s.replace("虚构来源描述了", "虚构来源说明了"),
  );
  const second = await build(dataset, root, "second");
  expect((await verifyChapterRelease(second.releaseDir)).release_id).toBe(
    "second",
  );
  expect(await digests(first.releaseDir)).toEqual(before);
  await edit(dataset, chapterPath, (s) =>
    s.replace("虚构来源说明了", "虚构来源阐述了"),
  );
  await expect(build(dataset, root, "third")).rejects.toThrow(
    /Immutable chapter edition changed/,
  );
});

test("a declared surface without an answer validates and reads as not_investigated", async () => {
  const validated = await loadAndValidateChapters({
    root: fixture,
    profile: "fixture",
  });
  expect(validated.ok).toBe(true);
  if (!validated.ok) return;
  const product = validated.dataset.catalog.products.find(
    (x) => x.surfaces.length > 1,
  );
  expect(product).toBeTruthy();
  if (!product) return;
  const root = await temp();
  await build(fixture, root, "surfaced");
  const service = await QueryService.open({
    releasesRoot: root,
    releaseId: "surfaced",
  });
  try {
    let found = false;
    for (const selection of validated.dataset.current.filter(
      (x) => x.harness_id === product.harness_id,
    )) {
      const page = service.getTopic({
        harness: product.harness_id,
        topic: selection.topic,
      });
      if (page.status !== "ok") continue;
      if (
        page.questions.some((q) =>
          q.answers.some((a) => a.status === "not_investigated"),
        )
      ) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  } finally {
    service.close();
  }
});

test("a shared-surface answer is stored once and an uncovered surface is derived", async () => {
  const dataset = await copy(),
    root = await temp();
  await mutateFrontmatter(dataset, chapterPath, (doc) => {
    const sections = doc.sections as {
      section_id: string;
      surface_ids: string[];
    }[];
    sections.find((x) => x.section_id === "skills-overview")!.surface_ids = [
      "cli",
      "desktop",
    ];
    const questions = doc.questions as {
      question_id: string;
      answers: { surface_ids: string[] }[];
    }[];
    questions.find(
      (x) => x.question_id === "skills.discovery",
    )!.answers[0]!.surface_ids = ["cli", "desktop"];
  });
  const { releaseDir } = await build(dataset, root, "surfaced");
  const knowledge = JSON.parse(
    await readFile(path.join(releaseDir, "knowledge.json"), "utf8"),
  ) as {
    records: {
      chapters: {
        edition_id: string;
        questions: {
          question_id: string;
          answers: { surface_ids: string[]; status: string }[];
        }[];
      }[];
    };
  };
  const chapter = knowledge.records.chapters.find(
    (x) => x.edition_id === "demo-open-cli-skills-v1",
  )!;
  const discovery = chapter.questions.find(
    (x) => x.question_id === "skills.discovery",
  )!;
  expect(discovery.answers).toHaveLength(1);
  expect([...discovery.answers[0]!.surface_ids].sort()).toEqual([
    "cli",
    "desktop",
  ]);
  const format = chapter.questions.find(
    (x) => x.question_id === "skills.format",
  )!;
  expect(format.answers).toHaveLength(1);
  expect(format.answers[0]!.surface_ids).toEqual(["cli"]);
  const db = new Database(path.join(releaseDir, "knowledge.sqlite"), {
    readonly: true,
  });
  try {
    const row = db
      .prepare(
        "SELECT payload_json FROM questions WHERE chapter_id = ? AND question_id = ?",
      )
      .get("demo-open-cli-skills-v1", "skills.discovery") as {
      payload_json: string;
    };
    expect(
      (JSON.parse(row.payload_json) as { answers: unknown[] }).answers,
    ).toHaveLength(1);
  } finally {
    db.close();
  }
  const service = await QueryService.open({
    releasesRoot: root,
    releaseId: "surfaced",
  });
  try {
    const page = service.getTopic({
      harness: "demo-open-cli",
      topic: "skills",
    });
    expect(page.status).toBe("ok");
    if (page.status !== "ok") return;
    const shared = page.questions.find(
      (x) => x.question_id === "skills.discovery",
    )!;
    const stored = shared.answers.filter(
      (x) => x.status !== "not_investigated",
    );
    expect(stored).toHaveLength(1);
    expect([...stored[0]!.surface_ids].sort()).toEqual(["cli", "desktop"]);
    const single = page.questions.find(
      (x) => x.question_id === "skills.format",
    )!;
    expect(
      single.answers.some(
        (x) =>
          x.status === "not_investigated" && x.surface_ids.includes("desktop"),
      ),
    ).toBe(true);
  } finally {
    service.close();
  }
  const pageText = await readFile(
    path.join(releaseDir, "docs/harnesses/demo-open-cli/skills.md"),
    "utf8",
  );
  const rows = pageText.split("\n").filter((line) => line.startsWith("|"));
  for (const id of ["skills-overview", "skills.discovery"])
    expect(
      rows.some(
        (row) =>
          row.includes(id) && row.includes("cli") && row.includes("desktop"),
      ),
    ).toBe(true);
  expect(
    rows.some(
      (row) => row.includes("skills.discovery") && row.includes("answered"),
    ),
  ).toBe(true);
  expect(
    rows.some(
      (row) =>
        row.includes("skills.format") &&
        row.includes("desktop") &&
        row.includes("not_investigated"),
    ),
  ).toBe(true);
});

test("SDK package mappings validate and remain isolated from the CLI", async () => {
  const dataset = await copy(),
    root = await temp();
  await edit(dataset, "catalog/harnesses.yaml", (text) => {
    const catalog = catalogSchema.parse(YAML.parse(text));
    const product = catalog.products.find(
      (x) => x.harness_id === "demo-package-cli",
    )!;
    product.surfaces.push({
      surface_id: "sdk",
      name: "Fictional SDK",
      kind: "sdk",
      reference_ids: ["ref-demo-package-catalog"],
    });
    product.bindings.push({
      surface_id: "sdk",
      status: "unknown",
      reference_ids: [],
    });
    return YAML.stringify(catalog);
  });
  await edit(
    dataset,
    "knowledge/demo-package-cli/snapshots/snapshot-demo-package-npm-142.yaml",
    (text) => text.replace("surface: cli", "surface: sdk"),
  );
  await edit(dataset, mappingPath, (text) =>
    text.replace("surface_id: cli", "surface_id: sdk"),
  );
  await mutateFrontmatter(
    dataset,
    "knowledge/demo-package-cli/chapters/demo-package-cli-native_plugins-v1.md",
    (doc) => {
      const sections = doc.sections as { surface_ids: string[] }[];
      sections[0]!.surface_ids = ["sdk"];
      const questions = doc.questions as {
        answers: { surface_ids: string[] }[];
      }[];
      questions[0]!.answers[0]!.surface_ids = ["sdk"];
    },
  );
  await build(dataset, root, "sdk-mapping");
  const service = await QueryService.open({
    releasesRoot: root,
    releaseId: "sdk-mapping",
  });
  try {
    const request = {
      harness: "demo-package-cli",
      topic: "native_plugins",
      section_id: "plugin-behavior",
      version: "1.4.2",
    };
    const sdk = service.getTopic({ ...request, surface_id: "sdk" });
    expect(sdk.status).toBe("ok");
    if (!("resolution" in sdk)) throw new Error("Expected SDK resolution.");
    expect(sdk.resolution.match_kind).toBe("exact");
    const cli = service.getTopic({ ...request, surface_id: "cli" });
    expect(cli.status).toBe("not_investigated");
    if (!("resolution" in cli)) throw new Error("Expected CLI resolution.");
    expect(cli.resolution.match_kind).toBe("source_only");
  } finally {
    service.close();
  }
});

test("staged chapter build leaves current pointer for later acceptance", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await readFile(path.join(root, "current.json"), "utf8");
  const staged = await compileChapterRelease({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "staged",
    profile: "fixture",
    publishedAt: "2026-09-29T00:00:00Z",
    publishCurrent: false,
  });
  expect((await verifyChapterRelease(staged.releaseDir)).release_id).toBe(
    "staged",
  );
  expect(await readFile(path.join(root, "current.json"), "utf8")).toBe(pointer);
});
