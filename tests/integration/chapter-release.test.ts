import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { afterEach, expect, test } from "vitest";
import {
  compileChapterRelease,
  verifyChapterRelease,
} from "../../src/compiler/chapter-release.js";
import { chapterEditionSchema } from "../../src/domain/chapter.js";
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

test("fixture chapters parse, preserve uncertainty, and reject malformed IDs", async () => {
  const result = await loadAndValidateChapters({
    root: fixture,
    profile: "fixture",
  });
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  expect(result.dataset.chapters).toHaveLength(15);
  expect(result.dataset.current).toHaveLength(14);
  expect(
    result.dataset.chapters
      .find((x) => x.edition_id === "demo-open-cli-skills-v1")
      ?.questions.find((x) => x.question_id === "skills.roots")?.status,
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
      ?.questions.find((x) => x.question_id === "mcp.transport")?.status,
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

test.each([
  [
    "missing citation",
    chapterPath,
    (s: string) => s.replace("[@ref-demo-open]", ""),
    "QUESTION_SOURCE_MISSING",
  ],
  [
    "citation inherited from another question in one section",
    chapterPath,
    (s: string) =>
      s.replace(
        "question_id: skills.roots\n    section_id: skills-overview\n    status: unknown\n    source_refs: []",
        "question_id: skills.roots\n    section_id: skills-overview\n    status: unknown\n    source_refs: [ref-demo-open]",
      ),
    "QUESTION_SOURCE_MISSING",
  ],
  [
    "cross-product citation",
    chapterPath,
    (s: string) => s.replace("ref-demo-open", "ref-demo-package"),
    "QUESTION_SOURCE_MISSING",
  ],
  [
    "bad section",
    chapterPath,
    (s: string) =>
      s.replace("section_id: skills-overview", "section_id: absent"),
    "QUESTION_SECTION_MISMATCH",
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

test("repeat builds agree across JSON, SQLite, Markdown; mapping-only release keeps chapter bytes", async () => {
  const dataset = await copy();
  const leftRoot = await temp(),
    rightRoot = await temp();
  const left = await build(dataset, leftRoot, "first");
  const right = await build(dataset, rightRoot, "first");
  expect(await verifyChapterRelease(left.releaseDir)).toEqual(left.manifest);
  expect(left.manifest.history).toEqual(["demo-open-cli-skills-v0"]);
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
  expect(knowledge.records.current).toHaveLength(14);
  expect(knowledge.records.chapters).toHaveLength(15);
  expect(knowledge.records.mappings[0].scope).toBe("section");
  const db = new Database(path.join(left.releaseDir, "knowledge.sqlite"), {
    readonly: true,
  });
  try {
    expect(db.prepare("SELECT count(*) AS n FROM current").get()).toEqual({
      n: 14,
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
});

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
