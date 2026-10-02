import { execFile } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";
import {
  buildSourceDirectory,
  prepareOnlineRelease,
  verifyOnlineResources,
} from "../../src/compiler/online-release.js";
import { canonical } from "../../src/compiler/projection.js";
import type { OnlineResource } from "../../src/domain/online.js";

const fixture = fileURLToPath(
  new URL("../fixtures/datasets/chapters", import.meta.url),
);
const exec = promisify(execFile);
const roots: string[] = [];

async function temp(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "ahw-online-"));
  roots.push(root);
  return root;
}
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

const git = (repo: string, args: string[]): Promise<{ stdout: string }> =>
  exec("git", ["-C", repo, ...args], { maxBuffer: 64 * 1024 * 1024 });

async function commit(repo: string, message: string): Promise<void> {
  await git(repo, ["add", "-A"]);
  await git(repo, [
    "-c",
    "user.email=test@example.invalid",
    "-c",
    "user.name=test",
    "commit",
    "-q",
    "-m",
    message,
  ]);
}

async function repo(): Promise<{ root: string; commit: string }> {
  const root = await temp();
  await cp(fixture, path.join(root, "dataset"), { recursive: true });
  await git(root, ["init", "-q", "-b", "main"]);
  await commit(root, "init");
  const head = (await git(root, ["rev-parse", "HEAD"])).stdout.trim();
  return { root, commit: head };
}

async function copyEdition(
  root: string,
  harness: string,
  fromId: string,
  toId: string,
): Promise<void> {
  const dir = path.join(root, "dataset", "knowledge", harness, "chapters");
  const text = await readFile(path.join(dir, fromId + ".md"), "utf8");
  await writeFile(
    path.join(dir, toId + ".md"),
    text.replace("edition_id: " + fromId, "edition_id: " + toId),
  );
}
const addEdition = (root: string, fromId: string, toId: string) =>
  copyEdition(root, "demo-open-cli", fromId, toId);

const prepare = (datasetRoot: string, commit: string) =>
  prepareOnlineRelease({
    datasetRoot,
    profile: "fixture",
    commit,
    publishedAt: "2026-10-02T00:00:00Z",
    base: "/wiki/",
  });

function topicOf(
  resources: Map<string, OnlineResource>,
  harness: string,
  topic: string,
): Extract<OnlineResource, { resource_kind: "topic" }> {
  const resource = resources.get(
    "topics/" + harness + "/" + topic + "/index.json",
  );
  if (!resource || resource.resource_kind !== "topic")
    throw new Error("topic missing");
  return resource;
}
const dump = (resources: Map<string, OnlineResource>): string =>
  [...resources.keys()]
    .sort()
    .map((key) => key + "\n" + canonical(resources.get(key)))
    .join("\n");
const clone = (resources: Map<string, OnlineResource>) =>
  new Map(
    [...resources].map(
      ([key, value]) => [key, structuredClone(value)] as const,
    ),
  );

test("prepares independent web identity, trims history, shards sources", async () => {
  const { root, commit: head } = await repo();
  const prepared = await prepare(path.join(root, "dataset"), head);
  expect(prepared.releaseId).toBe("web-v1-" + head);
  expect(prepared.inputDigest).toMatch(/^[a-f0-9]{64}$/);
  const manifest = prepared.resources.get("manifest.json");
  expect(manifest).toMatchObject({
    resource_kind: "manifest",
    release_id: prepared.releaseId,
    profile: "fixture",
    history: "current_and_previous",
    sources: "sources/index/index.json",
    search: "search/manifest.json",
  });
  const topic = topicOf(prepared.resources, "demo-open-cli", "skills");
  expect(topic.current).toBe("demo-open-cli-skills-v1");
  const historical = topic.editions.find(
    (edition) => edition.edition_id === "demo-open-cli-skills-v0",
  );
  expect(historical?.availability).toBe("available");
  expect(prepared.resources.has("chapters/demo-open-cli-skills-v0.json")).toBe(
    true,
  );
  expect(prepared.resources.has("chapters/demo-open-cli-skills-v1.json")).toBe(
    true,
  );
  const index = prepared.resources.get("sources/index/index.json");
  expect(index?.resource_kind).toBe("navigation");
  const block = prepared.resources.get("sources/index/blocks/block-0000.json");
  expect(block?.resource_kind).toBe("source_directory");
  expect(
    prepared.knowledge.records.chapters.map((x) => x.edition_id),
  ).toContain("demo-open-cli-skills-v1");
  verifyOnlineResources(
    prepared.resources,
    prepared.releaseId,
    prepared.knowledge,
  );
});

test("rejects a chapter that would be trimmed when its citation is invalid", async () => {
  const { root } = await repo();
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v2");
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v3");
  await commit(root, "more editions");
  const file = path.join(
    root,
    "dataset",
    "knowledge",
    "demo-open-cli",
    "chapters",
    "demo-open-cli-skills-v0.md",
  );
  await writeFile(
    file,
    (await readFile(file, "utf8")).replace("ref-demo-open\n", "ref-missing\n"),
  );
  await commit(root, "break citation");
  const head = (await git(root, ["rev-parse", "HEAD"])).stdout.trim();
  await expect(prepare(path.join(root, "dataset"), head)).rejects.toThrow(
    /Dataset validation failed/,
  );
});

test("orders editions by first-parent introduction with stable ties", async () => {
  const { root } = await repo();
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v2");
  await commit(root, "v2");
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v3");
  await commit(root, "v3");
  const head = (await git(root, ["rev-parse", "HEAD"])).stdout.trim();
  const prepared = await prepare(path.join(root, "dataset"), head);
  const byId = new Map(
    topicOf(prepared.resources, "demo-open-cli", "skills").editions.map(
      (edition) => [edition.edition_id, edition],
    ),
  );
  expect(byId.get("demo-open-cli-skills-v3")?.availability).toBe("available");
  expect(byId.get("demo-open-cli-skills-v2")?.availability).toBe("trimmed");
  expect(byId.get("demo-open-cli-skills-v0")?.availability).toBe("trimmed");
});

test("breaks introduction ties by stable edition ID", async () => {
  const { root } = await repo();
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v2");
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v3");
  await commit(root, "both together");
  const head = (await git(root, ["rev-parse", "HEAD"])).stdout.trim();
  const prepared = await prepare(path.join(root, "dataset"), head);
  const byId = new Map(
    topicOf(prepared.resources, "demo-open-cli", "skills").editions.map(
      (edition) => [edition.edition_id, edition],
    ),
  );
  expect(byId.get("demo-open-cli-skills-v2")?.availability).toBe("available");
  expect(byId.get("demo-open-cli-skills-v3")?.availability).toBe("trimmed");
});

test("fails when shallow history cannot prove recency", async () => {
  const { root } = await repo();
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v2");
  await commit(root, "v2");
  await addEdition(root, "demo-open-cli-skills-v1", "demo-open-cli-skills-v3");
  await commit(root, "v3");
  const head = (await git(root, ["rev-parse", "HEAD"])).stdout.trim();
  const shallow = root + "-shallow";
  roots.push(shallow);
  await exec("git", ["clone", "-q", "--depth", "1", "file://" + root, shallow]);
  expect(
    (
      await git(shallow, ["rev-parse", "--is-shallow-repository"])
    ).stdout.trim(),
  ).toBe("true");
  await expect(prepare(path.join(shallow, "dataset"), head)).rejects.toThrow(
    /Insufficient Git history/,
  );
});

test("derives catalog registration and surface coverage", async () => {
  const { root, commit: head } = await repo();
  const prepared = await prepare(path.join(root, "dataset"), head);
  const catalog = prepared.resources.get("catalog.json");
  if (catalog?.resource_kind !== "catalog") throw new Error("catalog missing");
  const candidate = catalog.products.find(
    (product) => product.harness_id === "demo-candidate",
  );
  expect(candidate).toMatchObject({ registration: "candidate", topics: [] });
  expect(candidate?.coverage).toEqual([]);
  const product = catalog.products.find(
    (item) => item.harness_id === "demo-open-cli",
  )!;
  expect(product.registration).toBe("registered");
  expect(product.topics).toHaveLength(7);
  const desktop = product.coverage.find(
    (entry) => entry.topic === "skills" && entry.surface_id === "desktop",
  );
  expect(desktop?.statuses).toEqual(["not_investigated"]);
  const cli = product.coverage.find(
    (entry) => entry.topic === "skills" && entry.surface_id === "cli",
  );
  expect(cli?.statuses).toEqual(
    expect.arrayContaining(["answered", "unknown"]),
  );
});

test("keeps mapping evidence identity and rejects cross-identity tampering", async () => {
  const { root, commit: head } = await repo();
  const prepared = await prepare(path.join(root, "dataset"), head);
  expect(prepared.resources.has("sources/ref-demo-package-npm.json")).toBe(
    true,
  );
  const topic = topicOf(
    prepared.resources,
    "demo-package-cli",
    "native_plugins",
  );
  const mapped = topic.editions.flatMap((edition) => edition.mappings);
  expect(mapped.length).toBeGreaterThan(0);
  expect(mapped[0]!.package_snapshot_id).toBe("snapshot-demo-package-npm-142");
  const tampered = clone(prepared.resources);
  const target = tampered.get(
    "topics/demo-package-cli/native_plugins/index.json",
  ) as Extract<OnlineResource, { resource_kind: "topic" }>;
  (target.editions[0]!.mappings[0] as { harness_id: string }).harness_id =
    "demo-open-cli";
  expect(() => verifyOnlineResources(tampered, prepared.releaseId)).toThrow(
    /Mapping identity differs/,
  );
});

test("rejects dangling, orphaned, and forged resources", async () => {
  const { root, commit: head } = await repo();
  const prepared = await prepare(path.join(root, "dataset"), head);
  const verify = (resources: Map<string, OnlineResource>) =>
    verifyOnlineResources(resources, prepared.releaseId);
  const sourceOf = (resources: Map<string, OnlineResource>, key: string) =>
    resources.get(key) as Extract<OnlineResource, { resource_kind: "source" }>;

  const missingChapterSource = clone(prepared.resources);
  missingChapterSource.delete("sources/ref-demo-open.json");
  expect(() => verify(missingChapterSource)).toThrow(
    /Chapter source is missing/,
  );

  const declared = clone(prepared.resources);
  const catalog = declared.get("catalog.json") as Extract<
    OnlineResource,
    { resource_kind: "catalog" }
  >;
  catalog.products[0]!.reference_ids = [
    ...catalog.products[0]!.reference_ids,
    "ref-does-not-exist",
  ];
  expect(() => verify(declared)).toThrow(/Declared catalog source is missing/);

  const missingChapter = clone(prepared.resources);
  missingChapter.delete("chapters/demo-open-cli-skills-v0.json");
  expect(() => verify(missingChapter)).toThrow(/no chapter/);

  const badScope = clone(prepared.resources);
  const chapter = badScope.get(
    "chapters/demo-open-cli-skills-v0.json",
  ) as Extract<OnlineResource, { resource_kind: "chapter" }>;
  chapter.source_scope[0]!.reference_id = "ref-not-published";
  expect(() => verify(badScope)).toThrow(/Chapter source scope differs/);

  const badUrl = clone(prepared.resources);
  (
    sourceOf(badUrl, "sources/ref-demo-open.json").reference.record as {
      official_url: string;
    }
  ).official_url = "https://example.invalid/other";
  expect(() => verify(badUrl)).toThrow(
    /Chapter source scope differs from its record/,
  );

  // A source published without any readable chapter or mapping citing it.
  const orphan = clone(prepared.resources);
  const donor = sourceOf(orphan, "sources/ref-demo-open.json").reference;
  if (donor.kind !== "chapter") throw new Error("expected a chapter source");
  sourceOf(orphan, "sources/ref-demo-candidate-catalog.json").reference = {
    kind: "chapter",
    record: {
      ...structuredClone(donor.record),
      reference_id: "ref-demo-candidate-catalog",
    },
  };
  const block = orphan.get("sources/index/blocks/block-0000.json") as Extract<
    OnlineResource,
    { resource_kind: "source_directory" }
  >;
  block.entries = block.entries.map((entry) =>
    entry.reference_id === "ref-demo-candidate-catalog"
      ? { ...entry, harness_id: "demo-open-cli" }
      : entry,
  );
  expect(() => verify(orphan)).toThrow(/Published source is orphaned/);

  // A posting claiming another surface of the same section.
  const forgedPosting = clone(prepared.resources);
  const postings = [...forgedPosting.values()].find(
    (resource) =>
      resource.resource_kind === "postings" && resource.entries.length > 0,
  ) as Extract<OnlineResource, { resource_kind: "postings" }>;
  postings.entries[0]!.locator.surface_ids = ["desktop"];
  expect(() => verify(forgedPosting)).toThrow(/Search locator surfaces differ/);

  expect(() =>
    verifyOnlineResources(
      clone(prepared.resources),
      "web-v1-" + "0".repeat(40),
    ),
  ).toThrow();
});

test("retains a trimmed edition's partial section mapping", async () => {
  const { root } = await repo();
  await copyEdition(
    root,
    "demo-package-cli",
    "demo-package-cli-native_plugins-v1",
    "demo-package-cli-native_plugins-v2",
  );
  await commit(root, "v2");
  await copyEdition(
    root,
    "demo-package-cli",
    "demo-package-cli-native_plugins-v1",
    "demo-package-cli-native_plugins-v3",
  );
  await commit(root, "v3");
  const mapping = [
    "schema_version: 3",
    "record_kind: fixture",
    "mapping_id: mapping-demo-package-plugin-142-v2",
    "edition_id: demo-package-cli-native_plugins-v2",
    "harness_id: demo-package-cli",
    "surface_id: cli",
    "software_version: 1.4.2",
    "package_snapshot_id: snapshot-demo-package-npm-142",
    "scope: section",
    "sections:",
    "  - section_id: plugin-behavior",
    "    evidence_ref: ref-demo-package-npm",
    "",
  ].join("\n");
  await writeFile(
    path.join(
      root,
      "dataset",
      "knowledge",
      "demo-package-cli",
      "mappings",
      "mapping-demo-package-plugin-142-v2.yaml",
    ),
    mapping,
  );
  await commit(root, "partial mapping");
  const head = (await git(root, ["rev-parse", "HEAD"])).stdout.trim();
  const prepared = await prepare(path.join(root, "dataset"), head);
  const topic = topicOf(
    prepared.resources,
    "demo-package-cli",
    "native_plugins",
  );
  const trimmed = topic.editions.find(
    (edition) => edition.edition_id === "demo-package-cli-native_plugins-v2",
  )!;
  expect(trimmed.availability).toBe("trimmed");
  expect(trimmed.sections.map((section) => section.section_id)).toEqual([
    "plugin-behavior",
    "plugin-remaining",
  ]);
  expect(trimmed.mappings).toHaveLength(1);
  expect(trimmed.mappings[0]).toMatchObject({
    scope: "section",
    surface_id: "cli",
  });
  expect(
    trimmed.mappings[0]!.sections.map((section) => section.section_id),
  ).toEqual(["plugin-behavior"]);
  expect(
    prepared.resources.has("chapters/demo-package-cli-native_plugins-v2.json"),
  ).toBe(false);
  verifyOnlineResources(
    prepared.resources,
    prepared.releaseId,
    prepared.knowledge,
  );
});

test("rejects fixture records under the production profile", async () => {
  const { root, commit: head } = await repo();
  await expect(
    prepareOnlineRelease({
      datasetRoot: path.join(root, "dataset"),
      profile: "production",
      commit: head,
      publishedAt: "2026-10-02T00:00:00Z",
      base: "/",
    }),
  ).rejects.toThrow(/Dataset validation failed/);
});

test("repeats deterministically and rejects a mismatched commit", async () => {
  const { root, commit: head } = await repo();
  const first = await prepare(path.join(root, "dataset"), head);
  const second = await prepare(path.join(root, "dataset"), head);
  expect(dump(first.resources)).toBe(dump(second.resources));
  expect(first.inputDigest).toBe(second.inputDigest);
  await expect(
    prepare(path.join(root, "dataset"), "0".repeat(40)),
  ).rejects.toThrow(/differs from requested commit/);
  const selection = path.join(
    root,
    "dataset",
    "registry",
    "chapter-current.yaml",
  );
  await writeFile(selection, (await readFile(selection, "utf8")) + "# dirty\n");
  await expect(prepare(path.join(root, "dataset"), head)).rejects.toThrow(
    /uncommitted/,
  );
});

test("deepens source navigation when the real envelope exceeds the budget", () => {
  const entries = Array.from({ length: 400 }, (_, index) => ({
    reference_id: "ref-" + String(index).padStart(4, "0"),
    harness_id: "demo-open-cli",
  }));
  const budget = 800;
  const resources = buildSourceDirectory(
    entries,
    "web-v1-" + "a".repeat(40),
    budget,
  );
  const collected: string[] = [];
  const visit = (key: string): void => {
    const node = resources.get(key);
    if (!node) throw new Error("missing node: " + key);
    expect(Buffer.byteLength(canonical(node), "utf8")).toBeLessThanOrEqual(
      budget,
    );
    if (node.resource_kind === "source_directory")
      collected.push(...node.entries.map((entry) => entry.reference_id));
    else if (node.resource_kind === "navigation")
      for (const range of node.ranges) visit(range.resource);
    else throw new Error("unexpected node kind");
  };
  visit("sources/index/index.json");
  expect(collected).toEqual(entries.map((entry) => entry.reference_id).sort());
  expect(
    [...resources.keys()].some((key) => key.startsWith("sources/index/nodes/")),
  ).toBe(true);
});
