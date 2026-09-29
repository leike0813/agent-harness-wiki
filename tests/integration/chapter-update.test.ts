import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
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
  "schema_version: 2",
  "record_kind: fixture",
  "mapping_id: mapping-demo-package-plugin-remaining-142",
  "edition_id: demo-package-cli-native_plugins-v1",
  "harness_id: demo-package-cli",
  "software_version: 1.4.2",
  "package_snapshot_id: snapshot-demo-package-npm-142",
  "scope: section",
  "sections:",
  "  - section_id: plugin-remaining",
  "    evidence_ref: ref-demo-package-npm",
  "",
].join("\n");
const auditYaml = (auditId: string): string =>
  [
    "schema_version: 2",
    `audit_id: ${auditId}`,
    "harness_id: codex-cli",
    "checked_at: 2026-09-29T00:00:00Z",
    "status: changed",
    "review_status: pending",
    "pending_audit_refs: []",
    "checks:",
    "  - source_id: source-codex-cli-npm",
    "    kind: npm_registry",
    "    checked_at: 2026-09-29T00:00:00Z",
    "    status: changed",
    "    observed: 0.158.0@sha512-abc",
    "impacts: []",
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
    skipManaged: true,
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
    skipManaged: true,
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
        "  - question_id: skills.roots\n    section_id: skills-overview\n    status: unknown\n    source_refs: []",
        "  - question_id: skills.roots\n    section_id: skills-overview\n    status: answered\n    source_refs:\n      - ref-demo-open",
      )
      .replace(
        "**skills.roots**：skills.roots 尚未调查；需要检查相应的固定来源入口。",
        "**skills.roots**：虚构来源描述了 Skill 的根目录发现。 [@ref-demo-open]",
      ),
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
    skipManaged: true,
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
  ).toContain("| `skills.roots` | answered |");
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
    skipManaged: true,
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
    skipManaged: true,
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
    skipManaged: true,
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
    skipManaged: true,
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
    skipManaged: true,
  });
  expect(result.status).toBe("blocked");
  expect(result.knowledge_error).toMatch(
    /Released software mapping is missing: mapping-demo-package-plugin-142/,
  );
  expect(await pointerText(root)).toBe(pointer);
  await expect(lstat(path.join(root, "second"))).rejects.toThrow();
});

test("current audits drive the managed lane and never veto knowledge", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const auditDir = path.join(root, "audits/codex-cli");
  await mkdir(auditDir, { recursive: true });
  const audit = path.join(auditDir, "audit-codex-cli-current.yaml");
  await writeFile(audit, auditYaml("audit-codex-cli-current"));
  const calls: string[] = [];
  const refresh = async (id: string) => {
    calls.push(id);
    return { id, status: "blocked", reason: "bwrap unavailable" };
  };

  const ignored = await publishChapterUpdate(
    {
      datasetRoot: dataset,
      releasesRoot: root,
      releaseId: "second",
      profile: "fixture",
      publishedAt,
      publishCurrent: false,
      managedAudits: [],
    },
    { refresh },
  );
  expect(calls).toEqual([]);
  expect(ignored.status).toBe("audit_only");
  expect(ignored.managed_outcomes).toEqual([]);

  const triggered = await publishChapterUpdate(
    {
      datasetRoot: dataset,
      releasesRoot: root,
      releaseId: "second",
      profile: "fixture",
      publishedAt,
      publishCurrent: false,
      managedAudits: [audit],
    },
    { refresh },
  );
  expect(calls).toEqual(["codex-cli"]);
  expect(triggered.status).toBe("audit_only");
  expect(triggered.managed_outcomes).toEqual([
    { id: "codex-cli", status: "blocked", reason: "bwrap unavailable" },
  ]);

  await writeFile(path.join(dataset, mappingPath), mappingYaml);
  const broken = path.join(auditDir, "audit-broken.yaml");
  await writeFile(broken, "harness_id: codex-cli\nchecks: []\n");
  calls.length = 0;
  const mixed = await publishChapterUpdate(
    {
      datasetRoot: dataset,
      releasesRoot: root,
      releaseId: "third",
      profile: "fixture",
      publishedAt,
      publishCurrent: false,
      managedAudits: [audit, broken],
    },
    { refresh },
  );
  expect(mixed.status).toBe("staged");
  expect(calls).toEqual(["codex-cli"]);
  expect(
    mixed.managed_outcomes.some(
      (x) => x.id === "audit-broken.yaml" && x.status === "blocked",
    ),
  ).toBe(true);
});

test("a blocked chapter release still runs and reports the managed lane", async () => {
  const dataset = await copy(),
    root = await temp();
  await build(dataset, root, "first");
  const pointer = await pointerText(root);
  await edit(dataset, skillsPath, (text) => `${text}\nBroken in place.\n`);
  const auditDir = path.join(root, "audits/codex-cli");
  await mkdir(auditDir, { recursive: true });
  const audit = path.join(auditDir, "audit-codex-cli-current.yaml");
  await writeFile(audit, auditYaml("audit-codex-cli-current"));
  const calls: string[] = [];
  const refresh = async (id: string) => {
    calls.push(id);
    return { id, status: "promoted" };
  };
  const result = await publishChapterUpdate(
    {
      datasetRoot: dataset,
      releasesRoot: root,
      releaseId: "second",
      profile: "fixture",
      publishedAt,
      publishCurrent: false,
      managedAudits: [audit],
    },
    { refresh },
  );
  expect(result.status).toBe("blocked");
  expect(result.knowledge_error).toMatch(/Immutable chapter edition changed/);
  expect(calls).toEqual(["codex-cli"]);
  expect(result.managed_outcomes).toEqual([
    { id: "codex-cli", status: "promoted" },
  ]);
  expect(await pointerText(root)).toBe(pointer);
  await expect(lstat(path.join(root, "second"))).rejects.toThrow();
});
