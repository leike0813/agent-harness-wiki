import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { afterEach, expect, test } from "vitest";
import {
  compileChapterRelease,
  verifyChapterRelease,
} from "../../src/compiler/chapter-release.js";
import { publishChapterUpdate } from "../../src/compiler/chapter-update.js";
import { QueryService } from "../../src/query/service.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const publishedAt = "2026-09-29T00:00:00Z";
const skillsPath =
  "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v1.md";
const referencePath = "knowledge/demo-open-cli/references/ref-demo-open.yaml";
const mappingPath =
  "knowledge/demo-package-cli/mappings/mapping-demo-package-plugin-remaining-142.yaml";
const mappingYaml = [
  "schema_version: 3",
  "record_kind: fixture",
  "mapping_id: mapping-demo-package-plugin-remaining-142",
  "edition_id: demo-package-cli-native_plugins-v1",
  "harness_id: demo-package-cli",
  "surface_id: cli",
  "software_version: 1.4.2",
  "package_snapshot_id: snapshot-demo-package-npm-142",
  "scope: section",
  "sections:",
  "  - section_id: plugin-remaining",
  "    evidence_ref: ref-demo-package-npm",
  "",
].join("\n");
const roots: string[] = [];
async function temp(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-chapter-update-"));
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
    publishedAt,
  });
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
async function addEdition(
  dataset: string,
  harness: string,
  sourceId: string,
  targetId: string,
): Promise<void> {
  const dir = path.join(dataset, `knowledge/${harness}/chapters`);
  await writeFile(
    path.join(dir, `${targetId}.md`),
    (await readFile(path.join(dir, `${sourceId}.md`), "utf8")).replaceAll(
      sourceId,
      targetId,
    ),
  );
}
async function select(
  dataset: string,
  updates: [string, string, string][],
): Promise<void> {
  const file = path.join(dataset, "registry/chapter-current.yaml");
  const doc = YAML.parse(await readFile(file, "utf8")) as {
    selections: { harness_id: string; topic: string; edition_id: string }[];
  };
  for (const [harness, topic, edition] of updates) {
    const selection = doc.selections.find(
      (x) => x.harness_id === harness && x.topic === topic,
    )!;
    selection.edition_id = edition;
  }
  await writeFile(file, YAML.stringify(doc));
}
const currentOf = (
  knowledge: {
    records: {
      current: { harness_id: string; topic: string; edition_id: string }[];
    };
  },
  harness: string,
  topic: string,
): string | undefined =>
  knowledge.records.current.find(
    (x) => x.harness_id === harness && x.topic === topic,
  )?.edition_id;
const pointerText = (root: string): Promise<string> =>
  readFile(path.join(root, "current.json"), "utf8");

test("no reader-visible change is audit-only and leaves the pointer", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
  });
  expect(result).toMatchObject({
    status: "audit_only",
    release_id: null,
    previous_release_id: "first",
    release_dir: null,
    knowledge_error: null,
  });
  expect(await pointerText(root)).toBe(pointer);
  await expect(lstat(path.join(root, "second"))).rejects.toThrow();
});

test("unreferenced new metadata does not force a release", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  const dir = path.join(dataset, "knowledge/demo-open-cli/snapshots");
  await writeFile(
    path.join(dir, "snapshot-demo-open-999-linux.yaml"),
    (
      await readFile(
        path.join(dir, "snapshot-demo-open-142-linux.yaml"),
        "utf8",
      )
    ).replaceAll(
      "snapshot-demo-open-142-linux",
      "snapshot-demo-open-999-linux",
    ),
  );
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
  });
  expect(result.status).toBe("audit_only");
  expect(await pointerText(root)).toBe(pointer);
});

test("ordinary source-scoped edition update stages a readable chapter", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const dir = path.join(dataset, "knowledge/demo-open-cli/chapters");
  const source = await readFile(
    path.join(dir, "demo-open-cli-skills-v1.md"),
    "utf8",
  );
  await writeFile(
    path.join(dir, "demo-open-cli-skills-v2.md"),
    source
      .replaceAll("demo-open-cli-skills-v1", "demo-open-cli-skills-v2")
      .replace(
        "**skills.roots**：skills.roots 尚未调查；需要检查相应的固定来源入口。",
        "**skills.roots**：虚构来源描述了 Skill 的根目录发现。 [@ref-demo-open]",
      ),
  );
  await mutateFrontmatter(
    dataset,
    "knowledge/demo-open-cli/chapters/demo-open-cli-skills-v2.md",
    (doc) => {
      const questions = doc.questions as {
        question_id: string;
        answers: { status: string; source_refs: string[] }[];
      }[];
      const roots = questions.find((x) => x.question_id === "skills.roots")!;
      roots.answers[0]!.status = "answered";
      roots.answers[0]!.source_refs = ["ref-demo-open"];
    },
  );
  await select(dataset, [
    ["demo-open-cli", "skills", "demo-open-cli-skills-v2"],
  ]);
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
  });
  expect(result.status).toBe("staged");
  await expect(
    verifyChapterRelease(result.release_dir!),
  ).resolves.toMatchObject({ release_id: "second" });
  const knowledge = JSON.parse(
    await readFile(path.join(result.release_dir!, "knowledge.json"), "utf8"),
  );
  expect(currentOf(knowledge, "demo-open-cli", "skills")).toBe(
    "demo-open-cli-skills-v2",
  );
  expect(
    knowledge.records.mappings.some(
      (x: { edition_id: string }) => x.edition_id === "demo-open-cli-skills-v2",
    ),
  ).toBe(false);
  expect(
    await readFile(
      path.join(result.release_dir!, "docs/harnesses/demo-open-cli/skills.md"),
      "utf8",
    ),
  ).toContain("| `skills.roots` | cli | answered |");
  await expect(
    lstat(
      path.join(
        result.release_dir!,
        "docs/chapters/demo-open-cli-skills-v1.md",
      ),
    ),
  ).resolves.toBeTruthy();
  const service = await QueryService.open({
    releasesRoot: root,
    releaseId: "second",
  });
  try {
    expect(
      service.getTopic({ harness: "demo-open-cli", topic: "skills" }),
    ).toMatchObject({ status: "ok", edition_id: "demo-open-cli-skills-v2" });
  } finally {
    service.close();
  }
});

test("a new fictional CLI stages only after its seven current chapters exist", async () => {
  const dataset = await copy(),
    releasesRoot = await temp();
  await build(dataset, releasesRoot, "first");
  const oldId = "demo-open-cli";
  const newId = "demo-new-cli";
  const rewrite = (value: string) =>
    value
      .replaceAll("demo-open", "demo-new")
      .replaceAll("Demo Open", "Demo New")
      .replaceAll("虚构开放命令行", "虚构新命令行");
  const catalogFile = path.join(dataset, "catalog/harnesses.yaml");
  const catalog = YAML.parse(await readFile(catalogFile, "utf8")) as {
    products: { harness_id: string }[];
    references: { harness_id: string }[];
  };
  const clone = <T>(value: T): T =>
    JSON.parse(rewrite(JSON.stringify(value))) as T;
  catalog.products.push(
    ...catalog.products.filter((x) => x.harness_id === oldId).map(clone),
  );
  catalog.references.push(
    ...catalog.references.filter((x) => x.harness_id === oldId).map(clone),
  );
  await writeFile(catalogFile, YAML.stringify(catalog));
  for (const directory of ["registry/harnesses", "registry/sources"])
    for (const file of await readdir(path.join(dataset, directory))) {
      const text = await readFile(path.join(dataset, directory, file), "utf8");
      if (!text.includes(oldId)) continue;
      await writeFile(
        path.join(dataset, directory, rewrite(file)),
        rewrite(text),
      );
    }
  const oldKnowledge = path.join(dataset, "knowledge", oldId);
  const newKnowledge = path.join(dataset, "knowledge", newId);
  for (const directory of [
    "artifacts",
    "snapshots",
    "references",
    "chapters",
  ]) {
    await mkdir(path.join(newKnowledge, directory), { recursive: true });
    for (const file of await readdir(path.join(oldKnowledge, directory))) {
      await writeFile(
        path.join(newKnowledge, directory, rewrite(file)),
        rewrite(
          await readFile(path.join(oldKnowledge, directory, file), "utf8"),
        ),
      );
    }
  }
  await cp(
    path.join(dataset, "materials/demo-open-cli.txt"),
    path.join(dataset, "materials/demo-new-cli.txt"),
  );
  const currentFile = path.join(dataset, "registry/chapter-current.yaml");
  const current = YAML.parse(await readFile(currentFile, "utf8")) as {
    selections: { harness_id: string; topic: string; edition_id: string }[];
  };
  current.selections.push(
    ...current.selections
      .filter((x) => x.harness_id === oldId)
      .map((x) => ({
        ...x,
        harness_id: newId,
        edition_id: rewrite(x.edition_id),
      })),
  );
  await writeFile(currentFile, YAML.stringify(current));

  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot,
    releaseId: "onboarded",
    profile: "fixture",
    publishedAt,
    blocked: [],
    publishCurrent: false,
  });
  expect(result).toMatchObject({ status: "staged", retained: [] });
  const service = await QueryService.open({
    releasesRoot,
    releaseId: "onboarded",
  });
  try {
    for (const selection of current.selections.filter(
      (x) => x.harness_id === newId,
    ))
      expect(
        service.getTopic({ harness: newId, topic: selection.topic }),
      ).toMatchObject({ status: "ok", edition_id: selection.edition_id });
  } finally {
    service.close();
  }
});

test("mixed completed and blocked run stages only completed content", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  await addEdition(
    dataset,
    "demo-open-cli",
    "demo-open-cli-skills-v1",
    "demo-open-cli-skills-v2",
  );
  await addEdition(
    dataset,
    "demo-package-cli",
    "demo-package-cli-native_plugins-v1",
    "demo-package-cli-native_plugins-v2",
  );
  await select(dataset, [
    ["demo-open-cli", "skills", "demo-open-cli-skills-v2"],
    [
      "demo-package-cli",
      "native_plugins",
      "demo-package-cli-native_plugins-v2",
    ],
  ]);
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
    blocked: [{ harness_id: "demo-package-cli", topic: "native_plugins" }],
  });
  expect(result).toMatchObject({
    status: "staged",
    release_id: "second",
    retained: [
      {
        harness_id: "demo-package-cli",
        topic: "native_plugins",
        edition_id: "demo-package-cli-native_plugins-v1",
      },
    ],
  });
  await expect(
    verifyChapterRelease(result.release_dir!),
  ).resolves.toMatchObject({ release_id: "second" });
  const knowledge = JSON.parse(
    await readFile(path.join(result.release_dir!, "knowledge.json"), "utf8"),
  );
  expect(currentOf(knowledge, "demo-open-cli", "skills")).toBe(
    "demo-open-cli-skills-v2",
  );
  expect(currentOf(knowledge, "demo-package-cli", "native_plugins")).toBe(
    "demo-package-cli-native_plugins-v1",
  );
  const editions = knowledge.records.chapters.map(
    (x: { edition_id: string }) => x.edition_id,
  );
  expect(editions).not.toContain("demo-package-cli-native_plugins-v2");
  expect(editions).toContain("demo-open-cli-skills-v0");
  expect(await pointerText(root)).toBe(pointer);
});

test("mapping-only change stages without changing chapter bytes", async () => {
  const dataset = await copy(),
    root = await temp();
  const first = await build(dataset, root, "first");
  const chapterFile = "docs/chapters/demo-package-cli-native_plugins-v1.md";
  const before = await readFile(path.join(first.releaseDir, chapterFile));
  await writeFile(path.join(dataset, mappingPath), mappingYaml);
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
  });
  expect(result.status).toBe("staged");
  expect(await readFile(path.join(result.release_dir!, chapterFile))).toEqual(
    before,
  );
  const knowledge = JSON.parse(
    await readFile(path.join(result.release_dir!, "knowledge.json"), "utf8"),
  );
  expect(
    knowledge.records.mappings.map((x: { mapping_id: string }) => x.mapping_id),
  ).toContain("mapping-demo-package-plugin-remaining-142");
});

test("chapter failure reports knowledge_error and leaves current unchanged", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  await addEdition(
    dataset,
    "demo-open-cli",
    "demo-open-cli-skills-v1",
    "demo-open-cli-skills-v2",
  );
  await select(dataset, [
    ["demo-open-cli", "skills", "demo-open-cli-skills-v2"],
  ]);
  await edit(dataset, skillsPath, (text) => `${text}\nChanged in place.\n`);
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
  });
  expect(result.status).toBe("blocked");
  expect(result.knowledge_error).toMatch(/Immutable chapter edition changed/);
  expect(result.release_id).toBeNull();
  expect(await pointerText(root)).toBe(pointer);
  await expect(lstat(path.join(root, "second"))).rejects.toThrow();
});

test("an in-place edit of a released reference blocks a blocked topic", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  await edit(dataset, referencePath, (text) =>
    text.replace(
      "Trusted projects without DEMO_SKILLS_DIR discover skills in .demo/skills.",
      "Changed excerpt.",
    ),
  );
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
    blocked: [{ harness_id: "demo-open-cli", topic: "skills" }],
  });
  expect(result.status).toBe("blocked");
  expect(result.knowledge_error).toMatch(
    /Immutable source reference changed in place: ref-demo-open/,
  );
  expect(await pointerText(root)).toBe(pointer);
  await expect(lstat(path.join(root, "second"))).rejects.toThrow();
});

test("removing a released version mapping blocks the release", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  await rm(
    path.join(
      dataset,
      "knowledge/demo-package-cli/mappings/mapping-demo-package-plugin-142.yaml",
    ),
  );
  const result = await publishChapterUpdate({
    datasetRoot: dataset,
    releasesRoot: root,
    releaseId: "second",
    profile: "fixture",
    publishedAt,
    publishCurrent: false,
  });
  expect(result.status).toBe("blocked");
  expect(result.knowledge_error).toMatch(
    /Released software mapping is missing: mapping-demo-package-plugin-142/,
  );
  expect(await pointerText(root)).toBe(pointer);
  await expect(lstat(path.join(root, "second"))).rejects.toThrow();
});
