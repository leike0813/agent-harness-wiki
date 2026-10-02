import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as z from "zod";
import {
  chapterPublishedKnowledgeSchema,
  type ChapterDataset,
  type ChapterEdition,
  type ChapterPublishedKnowledge,
  type SoftwareMapping,
} from "../domain/chapter.js";
import {
  lexicalRules,
  parseOnlineResource,
  resourcePathSchema,
  type OnlineResource,
} from "../domain/online.js";
import { parseQuestionCatalog } from "../domain/question-catalog.js";
import { topicSchema, type Topic } from "../domain/schema.js";
import { buildOnlineSearch } from "../query/lexical.js";
import { buildSearchSections } from "../query/search-index.js";
import { loadAndValidateChapters } from "../validation/chapters.js";
import { projectChapters } from "./chapter-release.js";
import { canonical, sha256 } from "./projection.js";

const questionsFile = fileURLToPath(
  new URL("../../docs/topic-questions.md", import.meta.url),
);

const optionsSchema = z.object({
  datasetRoot: z.string().min(1),
  profile: z.enum(["fixture", "production"]),
  commit: z.string().regex(/^[a-f0-9]{40}$/),
  publishedAt: z.iso.datetime(),
  base: z.string().regex(/^\/[A-Za-z0-9._/-]*$/),
  repoRoot: z.string().min(1).optional(),
  extraInputs: z.record(z.string(), z.string()).optional(),
});
export type OnlineReleaseInput = z.input<typeof optionsSchema>;

export interface PreparedOnlineRelease {
  releaseId: string;
  knowledge: ChapterPublishedKnowledge;
  resources: Map<string, OnlineResource>;
  inputDigest: string;
}

const statusOrder = [
  "answered",
  "partial",
  "unknown",
  "not_applicable",
  "conflict",
  "not_investigated",
] as const;

function run(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
      command,
      args,
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
      (error, stdout) => (error ? reject(error) : resolve(stdout)),
    );
  });
}

const git = (repo: string, args: string[]) => run("git", ["-C", repo, ...args]);
const lines = (value: string): string[] =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

async function resolveRepo(
  datasetRoot: string,
  explicit?: string,
): Promise<string | undefined> {
  try {
    return (
      await git(explicit ?? datasetRoot, ["rev-parse", "--show-toplevel"])
    ).trim();
  } catch {
    return undefined;
  }
}

async function assertCommitCorresponds(
  repo: string,
  commit: string,
  datasetRoot: string,
): Promise<void> {
  const head = (await git(repo, ["rev-parse", "HEAD"])).trim();
  if (head !== commit)
    throw new Error(
      `Working tree HEAD ${head} differs from requested commit ${commit}.`,
    );
  // Only the structured input and locked toolchain must match the commit; the
  // surrounding program and docs may differ. Untracked files under these paths
  // are input too, so they are reported as well.
  const candidates = [
    ...["catalog", "registry", "knowledge"].map((dir) =>
      path.join(datasetRoot, dir),
    ),
    questionsFile,
    path.join(repo, "package.json"),
    path.join(repo, "pnpm-lock.yaml"),
  ];
  const paths = new Set<string>();
  for (const candidate of candidates) {
    const relative = path.relative(repo, path.resolve(candidate));
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative))
      continue;
    paths.add(relative.split(path.sep).join("/"));
  }
  if (!paths.size)
    throw new Error(
      "No published input paths could be resolved for the commit.",
    );
  const status = await git(repo, ["status", "--porcelain", "--", ...paths]);
  if (status.trim())
    throw new Error(
      "Published input has uncommitted or untracked changes; refusing to build.",
    );
}

const chapterPath = (harnessId: string, editionId: string) =>
  `knowledge/${harnessId}/chapters/${editionId}.md`;

const historicalEditions = (
  dataset: ChapterDataset,
  selection: { harness_id: string; topic: Topic; edition_id: string },
): ChapterEdition[] =>
  dataset.chapters.filter(
    (chapter) =>
      chapter.harness_id === selection.harness_id &&
      chapter.topic === selection.topic &&
      chapter.edition_id !== selection.edition_id,
  );

async function selectRetainedEditions(
  dataset: ChapterDataset,
  repo: string | undefined,
  commit: string,
  datasetRoot: string,
): Promise<Set<string>> {
  const available = new Set<string>();
  if (!repo) {
    for (const selection of dataset.current) {
      available.add(selection.edition_id);
      const others = historicalEditions(dataset, selection);
      if (others.length > 1)
        throw new Error(
          "Git history is required to order multiple historical editions.",
        );
      for (const chapter of others) available.add(chapter.edition_id);
    }
    return available;
  }
  const chain = lines(
    await git(repo, ["log", "--first-parent", "--format=%H", commit]),
  );
  const rank = new Map(chain.map((hash, index) => [hash, index]));
  const relativeChapter = (harnessId: string, editionId: string) =>
    path
      .relative(repo, path.join(datasetRoot, chapterPath(harnessId, editionId)))
      .split(path.sep)
      .join("/");
  let shallow: boolean | undefined;
  for (const selection of dataset.current) {
    available.add(selection.edition_id);
    const others = historicalEditions(dataset, selection);
    if (others.length <= 1) {
      for (const chapter of others) available.add(chapter.edition_id);
      continue;
    }
    shallow ??=
      (await git(repo, ["rev-parse", "--is-shallow-repository"])).trim() ===
      "true";
    if (shallow)
      throw new Error("Insufficient Git history to order chapter editions.");
    const ordered = await Promise.all(
      others.map(async (chapter) => {
        const introduced = lines(
          await git(repo, [
            "log",
            "--first-parent",
            "--reverse",
            "--format=%H",
            "--diff-filter=A",
            commit,
            "--",
            relativeChapter(chapter.harness_id, chapter.edition_id),
          ]),
        )[0];
        return {
          edition_id: chapter.edition_id,
          index: introduced ? rank.get(introduced) : undefined,
        };
      }),
    );
    if (ordered.some((entry) => entry.index === undefined))
      throw new Error(
        "Insufficient Git history to order chapter editions; fetch full history.",
      );
    ordered.sort(
      (a, b) => a.index! - b.index! || (a.edition_id < b.edition_id ? -1 : 1),
    );
    if (ordered[0]) available.add(ordered[0].edition_id);
  }
  return available;
}

function deriveStatuses(
  chapter: ChapterEdition,
  surfaceId: string,
): (typeof statusOrder)[number][] {
  const seen = new Set<string>();
  for (const question of chapter.questions)
    for (const answer of question.answers)
      if (answer.surface_ids.includes(surfaceId)) seen.add(answer.status);
  const statuses = statusOrder.filter((status) => seen.has(status));
  return statuses.length ? [...statuses] : ["not_investigated"];
}

interface DirectoryEntry {
  reference_id: string;
  harness_id: string;
}
interface DirectoryNode {
  first: string;
  last: string;
  resource: string;
}

/**
 * Build the source existence directory as leaf blocks of sorted reference IDs
 * plus a navigation tree. Blocks and navigation nodes are packed by the real
 * decoded envelope byte size against the shared block budget; when the root
 * navigation would exceed it, the tree is deepened instead of growing one
 * oversized node. The optional budget exists for exercising that growth.
 */
export function buildSourceDirectory(
  entries: DirectoryEntry[],
  releaseId: string,
  budget = lexicalRules.block_bytes,
): Map<string, OnlineResource> {
  const out = new Map<string, OnlineResource>();
  const sorted = [...entries].sort((a, b) =>
    a.reference_id < b.reference_id ? -1 : 1,
  );
  if (!sorted.length) throw new Error("Source directory is empty.");
  const leaf = (items: DirectoryEntry[]) => ({
    protocol_version: 1 as const,
    release_id: releaseId,
    resource_kind: "source_directory" as const,
    entries: items,
  });
  const navigation = (nodes: DirectoryNode[]) => ({
    protocol_version: 1 as const,
    release_id: releaseId,
    resource_kind: "navigation" as const,
    purpose: "sources" as const,
    ranges: nodes.map((node) => ({
      first: node.first,
      last: node.last,
      resource: node.resource,
    })),
  });
  const byteLength = (value: unknown): number =>
    Buffer.byteLength(canonical(value), "utf8");
  const largestPrefix = <T>(
    items: T[],
    whole: (slice: T[]) => unknown,
  ): number => {
    let low = 1;
    let high = items.length;
    let best = 0;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (byteLength(whole(items.slice(0, mid))) <= budget) {
        best = mid;
        low = mid + 1;
      } else high = mid - 1;
    }
    return best;
  };
  const leaves: DirectoryNode[] = [];
  let remaining = sorted;
  while (remaining.length) {
    const size = largestPrefix(remaining, leaf);
    if (!size)
      throw new Error(
        "Source directory block budget is too small for one entry.",
      );
    const chunk = remaining.slice(0, size);
    const resource = `sources/index/blocks/block-${String(leaves.length).padStart(4, "0")}.json`;
    out.set(resource, leaf(chunk));
    leaves.push({
      first: chunk[0]!.reference_id,
      last: chunk[chunk.length - 1]!.reference_id,
      resource,
    });
    remaining = remaining.slice(size);
  }
  let level = 0;
  let children = leaves;
  while (true) {
    const root = navigation(children);
    if (children.length === 1 || byteLength(root) <= budget) {
      out.set("sources/index/index.json", root);
      return out;
    }
    const previous = children;
    const nodes: DirectoryNode[] = [];
    let rest = previous;
    while (rest.length) {
      const size = largestPrefix(rest, navigation) || 1;
      const group = rest.slice(0, size);
      const resource = `sources/index/nodes/${level}-${String(nodes.length).padStart(4, "0")}.json`;
      out.set(resource, navigation(group));
      nodes.push({
        first: group[0]!.first,
        last: group[group.length - 1]!.last,
        resource,
      });
      rest = rest.slice(size);
    }
    if (nodes.length >= previous.length)
      throw new Error(
        "Source navigation budget is too small to subdivide the directory.",
      );
    children = nodes;
    level += 1;
  }
}

function sourceIdsFromChapter(chapter: {
  sections: { source_refs: string[] }[];
  questions: { answers: { source_refs: string[] }[] }[];
}): Set<string> {
  const ids = new Set<string>();
  for (const section of chapter.sections)
    for (const id of section.source_refs) ids.add(id);
  for (const question of chapter.questions)
    for (const answer of question.answers)
      for (const id of answer.source_refs) ids.add(id);
  return ids;
}

function retainedSources(
  dataset: ChapterDataset,
  available: Set<string>,
): { ids: Set<string>; byEdition: Map<string, SoftwareMapping[]> } {
  const byEdition = new Map<string, SoftwareMapping[]>();
  for (const mapping of dataset.mappings) {
    const list = byEdition.get(mapping.edition_id) ?? [];
    list.push(mapping);
    byEdition.set(mapping.edition_id, list);
  }
  const ids = new Set<string>();
  for (const chapter of dataset.chapters) {
    if (!available.has(chapter.edition_id)) continue;
    for (const id of sourceIdsFromChapter(chapter)) ids.add(id);
    for (const mapping of byEdition.get(chapter.edition_id) ?? [])
      for (const section of mapping.sections) ids.add(section.evidence_ref);
  }
  return { ids, byEdition };
}

export async function prepareOnlineRelease(
  input: OnlineReleaseInput,
): Promise<PreparedOnlineRelease> {
  const options = optionsSchema.parse(input);
  const validated = await loadAndValidateChapters({
    root: options.datasetRoot,
    profile: options.profile,
  });
  if (!validated.ok)
    throw new Error(
      `Dataset validation failed: ${validated.diagnostics
        .filter((entry) => entry.severity === "error")
        .map((entry) => `${entry.code} ${entry.file}`)
        .join("; ")}`,
    );
  const dataset = validated.dataset;
  const questionsText = await readFile(questionsFile, "utf8");
  const releaseId = `web-v1-${options.commit}`;
  const repo = await resolveRepo(options.datasetRoot, options.repoRoot);
  if (repo)
    await assertCommitCorresponds(repo, options.commit, options.datasetRoot);
  else if (options.profile === "production")
    throw new Error("Production online build needs a clean Git work tree.");

  const available = await selectRetainedEditions(
    dataset,
    repo,
    options.commit,
    options.datasetRoot,
  );
  const knowledge = projectOnlineKnowledge(
    dataset,
    available,
    releaseId,
    options,
  );
  const searchResources = buildOnlineSearch(
    buildSearchSections(knowledge, parseQuestionCatalog(questionsText)),
    releaseId,
  );
  const searchManifest = [...searchResources.keys()].find((key) =>
    key.endsWith("manifest.json"),
  );
  if (!searchManifest) throw new Error("Online search manifest is missing.");

  const resources = new Map<string, OnlineResource>();
  const add = (key: string, resource: OnlineResource): void => {
    resourcePathSchema.parse(key);
    if (resources.has(key))
      throw new Error(`Duplicate online resource path: ${key}`);
    resources.set(key, resource);
  };
  for (const [key, resource] of searchResources) add(key, resource);

  const refs = new Map(
    dataset.source_references.map((ref) => [ref.reference_id, ref]),
  );
  const { ids: sourceIds, byEdition } = retainedSources(dataset, available);
  const registered = new Set(
    dataset.harnesses.map((harness) => harness.harness_id),
  );
  const topicKeys = new Map<string, { harness_id: string; topic: Topic }>();
  for (const selection of dataset.current)
    topicKeys.set(`${selection.harness_id}|${selection.topic}`, {
      harness_id: selection.harness_id,
      topic: selection.topic,
    });

  for (const { harness_id: harnessId, topic } of topicKeys.values()) {
    const editions = dataset.chapters
      .filter(
        (chapter) =>
          chapter.harness_id === harnessId && chapter.topic === topic,
      )
      .sort((a, b) => (a.edition_id < b.edition_id ? -1 : 1));
    if (!editions.length) continue;
    const current = dataset.current.find(
      (selection) =>
        selection.harness_id === harnessId && selection.topic === topic,
    )!.edition_id;
    add(`topics/${harnessId}/${topic}/index.json`, {
      protocol_version: 1,
      release_id: releaseId,
      resource_kind: "topic",
      harness_id: harnessId,
      topic,
      current,
      editions: editions.map((chapter) => {
        const identity = {
          edition_id: chapter.edition_id,
          sections: chapter.sections.map((section) => ({
            section_id: section.section_id,
            surface_ids: section.surface_ids,
          })),
          mappings: (byEdition.get(chapter.edition_id) ?? [])
            .slice()
            .sort((a, b) => (a.mapping_id < b.mapping_id ? -1 : 1)),
        };
        return available.has(chapter.edition_id)
          ? {
              ...identity,
              availability: "available" as const,
              resource: `chapters/${chapter.edition_id}.json`,
            }
          : { ...identity, availability: "trimmed" as const };
      }),
    });
  }

  for (const chapter of dataset.chapters) {
    if (!available.has(chapter.edition_id)) continue;
    const scope = [...sourceIdsFromChapter(chapter)]
      .map((id) => refs.get(id))
      .map((ref) => {
        if (!ref)
          throw new Error(
            `Chapter references an unknown source: ${chapter.edition_id}`,
          );
        return {
          reference_id: ref.reference_id,
          snapshot_id: ref.snapshot_id,
          official_url: ref.official_url,
        };
      })
      .sort((a, b) => (a.reference_id < b.reference_id ? -1 : 1));
    add(`chapters/${chapter.edition_id}.json`, {
      protocol_version: 1,
      release_id: releaseId,
      resource_kind: "chapter",
      chapter,
      source_scope: scope,
    });
  }

  for (const id of [...sourceIds].sort()) {
    const ref = refs.get(id);
    if (!ref) throw new Error(`Unknown source reference: ${id}`);
    add(`sources/${id}.json`, {
      protocol_version: 1,
      release_id: releaseId,
      resource_kind: "source",
      reference: { kind: "chapter", record: ref },
    });
  }
  const catalog = dataset.catalog;
  for (const ref of catalog.references) {
    add(`sources/${ref.reference_id}.json`, {
      protocol_version: 1,
      release_id: releaseId,
      resource_kind: "source",
      reference: {
        kind: "catalog",
        record: {
          reference_id: ref.reference_id,
          harness_id: ref.harness_id,
          official_url: ref.official_url,
          captured_at: ref.captured_at,
          snapshot: {
            kind: ref.snapshot.kind,
            sha256: ref.snapshot.sha256,
            ...(ref.snapshot.revision !== undefined
              ? { revision: ref.snapshot.revision }
              : {}),
          },
          locator: ref.locator,
          excerpt: ref.excerpt,
        },
      },
    });
  }

  const directoryEntries = [
    ...[...sourceIds].map((id) => ({
      reference_id: id,
      harness_id: refs.get(id)!.harness_id,
    })),
    ...catalog.references.map((ref) => ({
      reference_id: ref.reference_id,
      harness_id: ref.harness_id,
    })),
  ].sort((a, b) => (a.reference_id < b.reference_id ? -1 : 1));
  for (const [key, resource] of buildSourceDirectory(
    directoryEntries,
    releaseId,
  ))
    add(key, resource);

  const products = catalog.products.map((product) => {
    const topics = topicSchema.options.filter((topic) =>
      topicKeys.has(`${product.harness_id}|${topic}`),
    );
    const coverage = topics.flatMap((topic) => {
      const current = dataset.current.find(
        (selection) =>
          selection.harness_id === product.harness_id &&
          selection.topic === topic,
      )!;
      const chapter = dataset.chapters.find(
        (item) => item.edition_id === current.edition_id,
      )!;
      return product.surfaces.map((surface) => ({
        surface_id: surface.surface_id,
        topic,
        statuses: deriveStatuses(chapter, surface.surface_id),
      }));
    });
    return {
      ...product,
      registration: registered.has(product.harness_id)
        ? ("registered" as const)
        : ("candidate" as const),
      topics,
      coverage,
    };
  });
  add("catalog.json", {
    protocol_version: 1,
    release_id: releaseId,
    resource_kind: "catalog",
    products,
  });

  add("manifest.json", {
    protocol_version: 1,
    release_id: releaseId,
    resource_kind: "manifest",
    knowledge_published_at: options.publishedAt,
    profile: options.profile,
    history: "current_and_previous",
    catalog: "catalog.json",
    topics: "topics/",
    sources: "sources/index/index.json",
    search: searchManifest,
  });

  const lockDigest = async (name: string): Promise<string | null> => {
    if (!repo) return null;
    try {
      return sha256(await readFile(path.join(repo, name)));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  };
  return {
    releaseId,
    knowledge,
    resources,
    inputDigest: sha256(
      canonical({
        dataset,
        commit: options.commit,
        publishedAt: options.publishedAt,
        profile: options.profile,
        base: options.base,
        questions: sha256(questionsText),
        tools: {
          node: process.version,
          icu: process.versions.icu ?? "unknown",
          rules: lexicalRules,
        },
        locks: {
          package_json: await lockDigest("package.json"),
          pnpm_lock: await lockDigest("pnpm-lock.yaml"),
        },
        extra: options.extraInputs ?? {},
      }),
    ),
  };
}

function projectOnlineKnowledge(
  dataset: ChapterDataset,
  available: Set<string>,
  releaseId: string,
  options: { profile: "fixture" | "production"; publishedAt: string },
): ChapterPublishedKnowledge {
  const full = projectChapters(
    dataset,
    releaseId,
    options.profile,
    options.publishedAt,
  );
  const chapters = full.records.chapters.filter((chapter) =>
    available.has(chapter.edition_id),
  );
  const mappings = full.records.mappings.filter((mapping) =>
    available.has(mapping.edition_id),
  );
  const sourceIds = new Set<string>();
  for (const chapter of chapters) {
    for (const id of sourceIdsFromChapter(chapter)) sourceIds.add(id);
    for (const mapping of mappings)
      if (mapping.edition_id === chapter.edition_id)
        for (const section of mapping.sections)
          sourceIds.add(section.evidence_ref);
  }
  return chapterPublishedKnowledgeSchema.parse({
    ...full,
    records: {
      ...full.records,
      chapters,
      mappings,
      source_references: full.records.source_references.filter((ref) =>
        sourceIds.has(ref.reference_id),
      ),
    },
  });
}

type TopicResource = Extract<OnlineResource, { resource_kind: "topic" }>;
type ChapterResource = Extract<OnlineResource, { resource_kind: "chapter" }>;
type SourceResource = Extract<OnlineResource, { resource_kind: "source" }>;

/**
 * Verify a complete set of online resources without publishing: schemas,
 * release/object identity, derived coverage, trim invariants, source directory
 * and every navigation target. When the retained projection is supplied it also
 * binds readable chapters, current selections and catalog identity to it.
 */
export function verifyOnlineResources(
  resources: Map<string, OnlineResource>,
  releaseId: string,
  expected?: ChapterPublishedKnowledge,
): void {
  const parsed = new Map<string, OnlineResource>();
  for (const [key, value] of resources) {
    resourcePathSchema.parse(key);
    parsed.set(key, parseOnlineResource(value, releaseId));
  }
  const requireResource = <K extends OnlineResource["resource_kind"]>(
    key: string,
    kind: K,
  ): Extract<OnlineResource, { resource_kind: K }> => {
    const resource = parsed.get(key);
    if (!resource || resource.resource_kind !== kind)
      throw new Error(`Missing ${kind} resource: ${key}`);
    return resource as Extract<OnlineResource, { resource_kind: K }>;
  };
  const manifest = requireResource("manifest.json", "manifest");
  const catalog = requireResource(manifest.catalog, "catalog");
  const sourcesNavigation = requireResource(manifest.sources, "navigation");
  if (sourcesNavigation.purpose !== "sources")
    throw new Error("Manifest source entry is not a source directory.");
  const searchManifest = requireResource(manifest.search, "search_manifest");

  const topics = new Map<string, TopicResource>();
  const chapters = new Map<string, ChapterResource>();
  const sources = new Map<string, SourceResource>();
  const currentEditions = new Set<string>();
  for (const [key, resource] of parsed) {
    if (resource.resource_kind === "topic") {
      if (key !== `topics/${resource.harness_id}/${resource.topic}/index.json`)
        throw new Error(`Topic resource path differs from identity: ${key}`);
      for (const edition of resource.editions) {
        for (const mapping of edition.mappings)
          if (
            mapping.edition_id !== edition.edition_id ||
            mapping.harness_id !== resource.harness_id
          )
            throw new Error(`Mapping identity differs: ${edition.edition_id}`);
        if (
          edition.availability === "available" &&
          edition.resource !== `chapters/${edition.edition_id}.json`
        )
          throw new Error(
            `Available edition path differs: ${edition.edition_id}`,
          );
      }
      const current = resource.editions.find(
        (edition) => edition.edition_id === resource.current,
      );
      if (!current || current.availability !== "available")
        throw new Error(`Current edition is not readable: ${resource.current}`);
      currentEditions.add(resource.current);
      topics.set(`${resource.harness_id}|${resource.topic}`, resource);
    } else if (resource.resource_kind === "chapter") {
      const editionId = resource.chapter.edition_id;
      if (key !== `chapters/${editionId}.json`)
        throw new Error(`Chapter resource path differs from identity: ${key}`);
      chapters.set(editionId, resource);
    } else if (resource.resource_kind === "source") {
      const referenceId = resource.reference.record.reference_id;
      if (key !== `sources/${referenceId}.json`)
        throw new Error(`Source resource path differs from identity: ${key}`);
      sources.set(referenceId, resource);
    } else if (resource.resource_kind === "navigation") {
      for (const range of resource.ranges)
        if (!parsed.has(range.resource))
          throw new Error(
            `Navigation points at a missing resource: ${range.resource}`,
          );
    } else if (resource.resource_kind === "sections") {
      if (!key.startsWith("search/scopes/"))
        throw new Error(`Section directory outside scope root: ${key}`);
    } else if (
      resource.resource_kind === "postings" &&
      !key.startsWith("search/")
    )
      throw new Error(`Postings outside search root: ${key}`);
  }

  for (const resource of topics.values()) {
    for (const edition of resource.editions) {
      const chapter = chapters.get(edition.edition_id);
      if (edition.availability === "available") {
        if (!chapter)
          throw new Error(
            `Readable edition has no chapter: ${edition.edition_id}`,
          );
        if (
          chapter.chapter.harness_id !== resource.harness_id ||
          chapter.chapter.topic !== resource.topic
        )
          throw new Error(
            `Chapter identity differs from topic: ${edition.edition_id}`,
          );
        const projectedSections = chapter.chapter.sections.map((section) => ({
          section_id: section.section_id,
          surface_ids: section.surface_ids,
        }));
        if (canonical(edition.sections) !== canonical(projectedSections))
          throw new Error(
            `Topic sections differ from chapter: ${edition.edition_id}`,
          );
        const scopeIds = chapter.source_scope
          .map((scope) => scope.reference_id)
          .sort();
        const derivedScopeIds = [
          ...sourceIdsFromChapter(chapter.chapter),
        ].sort();
        if (canonical(scopeIds) !== canonical(derivedScopeIds))
          throw new Error(
            `Chapter source scope differs from its sections: ${edition.edition_id}`,
          );
        for (const scope of chapter.source_scope) {
          const source = sources.get(scope.reference_id);
          if (!source || source.reference.kind !== "chapter")
            throw new Error(`Chapter source is missing: ${scope.reference_id}`);
          const record = source.reference.record;
          if (
            record.snapshot_id !== scope.snapshot_id ||
            record.official_url !== scope.official_url ||
            record.harness_id !== chapter.chapter.harness_id
          )
            throw new Error(
              `Chapter source scope differs from its record: ${scope.reference_id}`,
            );
        }
        for (const mapping of edition.mappings) {
          const mappedSections = new Set<string>();
          for (const section of mapping.sections) {
            mappedSections.add(section.section_id);
            const target = chapter.chapter.sections.find(
              (item) => item.section_id === section.section_id,
            );
            if (!target || !target.surface_ids.includes(mapping.surface_id))
              throw new Error(
                `Mapping section is outside the chapter surface: ${section.section_id}`,
              );
            const evidence = sources.get(section.evidence_ref);
            if (
              !evidence ||
              evidence.reference.kind !== "chapter" ||
              evidence.reference.record.snapshot_id !==
                mapping.package_snapshot_id
            )
              throw new Error(
                `Mapping evidence snapshot differs: ${section.evidence_ref}`,
              );
          }
          if (
            mapping.scope === "chapter" &&
            mappedSections.size !==
              chapter.chapter.sections.filter((item) =>
                item.surface_ids.includes(mapping.surface_id),
              ).length
          )
            throw new Error(
              `Mapping is incomplete for its surface: ${mapping.mapping_id}`,
            );
          if (mapping.scope === "section" && mappedSections.size !== 1)
            throw new Error(
              `Section mapping names more than one section: ${mapping.mapping_id}`,
            );
        }
      } else if (chapters.has(edition.edition_id))
        throw new Error(
          `Trimmed edition has a chapter resource: ${edition.edition_id}`,
        );
    }
  }

  const directoryEntries: { reference_id: string; harness_id: string }[] = [];
  const visitedDirectories = new Set<string>();
  const collectDirectory = (
    resource: Extract<OnlineResource, { resource_kind: "navigation" }>,
    key: string,
  ): void => {
    if (resource.purpose !== "sources" || visitedDirectories.has(key))
      throw new Error(`Invalid or cyclic source navigation: ${key}`);
    visitedDirectories.add(key);
    for (const range of resource.ranges) {
      const child = parsed.get(range.resource);
      if (!child)
        throw new Error(
          `Navigation points at a missing resource: ${range.resource}`,
        );
      if (child.resource_kind === "source_directory") {
        if (
          !child.entries.length ||
          child.entries[0]!.reference_id !== range.first ||
          child.entries[child.entries.length - 1]!.reference_id !== range.last
        )
          throw new Error(`Source block range differs: ${range.resource}`);
        for (const entry of child.entries) directoryEntries.push(entry);
      } else if (child.resource_kind === "navigation")
        collectDirectory(child, range.resource);
      else
        throw new Error(
          `Source navigation points at ${child.resource_kind}: ${range.resource}`,
        );
    }
  };
  collectDirectory(sourcesNavigation, manifest.sources);
  const sortedDirectory = [...directoryEntries].sort((a, b) =>
    a.reference_id < b.reference_id ? -1 : 1,
  );
  if (canonical(sortedDirectory) !== canonical(directoryEntries))
    throw new Error("Source directory is not in stable ID order.");
  if (
    directoryEntries.length !== sources.size ||
    directoryEntries.some((entry) => !sources.has(entry.reference_id))
  )
    throw new Error("Source directory differs from published source files.");
  for (const entry of directoryEntries)
    if (
      sources.get(entry.reference_id)!.reference.record.harness_id !==
      entry.harness_id
    )
      throw new Error(`Source owner differs: ${entry.reference_id}`);

  const referencedSources = new Set<string>();
  for (const resource of topics.values())
    for (const edition of resource.editions) {
      if (edition.availability !== "available") continue;
      const chapter = chapters.get(edition.edition_id)!;
      for (const scope of chapter.source_scope)
        referencedSources.add(scope.reference_id);
      for (const mapping of edition.mappings)
        for (const section of mapping.sections)
          referencedSources.add(section.evidence_ref);
    }
  for (const [referenceId, source] of sources)
    if (
      source.reference.kind === "chapter" &&
      !referencedSources.has(referenceId)
    )
      throw new Error(`Published source is orphaned: ${referenceId}`);
  // The online catalog resource carries no reference list, so catalog identity
  // sources are checked through every reference a product actually declares.
  const declaredCatalogReferences = new Set<string>();
  for (const product of catalog.products) {
    for (const id of product.reference_ids) declaredCatalogReferences.add(id);
    for (const surface of product.surfaces)
      for (const id of surface.reference_ids) declaredCatalogReferences.add(id);
    for (const runtime of product.runtimes)
      for (const id of runtime.reference_ids) declaredCatalogReferences.add(id);
    for (const binding of product.bindings)
      for (const id of binding.reference_ids) declaredCatalogReferences.add(id);
  }
  for (const referenceId of declaredCatalogReferences)
    if (!sources.has(referenceId))
      throw new Error(`Declared catalog source is missing: ${referenceId}`);

  for (const product of catalog.products) {
    const expectedTopics = topicSchema.options.filter((topic) =>
      topics.has(`${product.harness_id}|${topic}`),
    );
    if (canonical(product.topics) !== canonical(expectedTopics))
      throw new Error(`Catalog topics differ: ${product.harness_id}`);
    if (product.registration === "candidate" && product.topics.length)
      throw new Error(
        `Candidate exposes capability topics: ${product.harness_id}`,
      );
    const coverage = expectedTopics.flatMap((topic) => {
      const topicResource = topics.get(`${product.harness_id}|${topic}`)!;
      const chapter = chapters.get(topicResource.current)!;
      return product.surfaces.map((surface) => ({
        surface_id: surface.surface_id,
        topic,
        statuses: deriveStatuses(chapter.chapter, surface.surface_id),
      }));
    });
    if (canonical(coverage) !== canonical(product.coverage))
      throw new Error(`Catalog coverage differs: ${product.harness_id}`);
  }

  const checkLocator = (locator: {
    harness_id: string;
    topic: Topic;
    edition_id: string;
    section_id: string;
    surface_ids: string[];
  }): void => {
    const topic = topics.get(`${locator.harness_id}|${locator.topic}`);
    if (!topic || topic.current !== locator.edition_id)
      throw new Error(
        `Search indexes a non-current edition: ${locator.edition_id}`,
      );
    const chapter = chapters.get(locator.edition_id);
    if (!chapter)
      throw new Error(
        `Search points at a missing chapter: ${locator.edition_id}`,
      );
    if (
      chapter.chapter.harness_id !== locator.harness_id ||
      chapter.chapter.topic !== locator.topic
    )
      throw new Error(
        `Search locator crosses product or topic: ${locator.edition_id}`,
      );
    const section = chapter.chapter.sections.find(
      (item) => item.section_id === locator.section_id,
    );
    if (!section)
      throw new Error(
        `Search points at a missing section: ${locator.section_id}`,
      );
    if (
      canonical([...locator.surface_ids].sort()) !==
      canonical([...section.surface_ids].sort())
    )
      throw new Error(
        `Search locator surfaces differ from the section: ${locator.section_id}`,
      );
  };
  for (const [key, resource] of parsed) {
    if (!key.startsWith("search/")) continue;
    if (resource.resource_kind === "postings")
      for (const entry of resource.entries) checkLocator(entry.locator);
    else if (resource.resource_kind === "sections")
      for (const entry of resource.entries) checkLocator(entry);
  }
  for (const key of [searchManifest.exact, searchManifest.lexical])
    if (!parsed.has(key))
      throw new Error(`Search entry point is missing: ${key}`);
  if (!parsed.has("search/manifest.json"))
    throw new Error("Search manifest path is not conventional.");
  if (manifest.profile === "production")
    for (const chapter of chapters.values())
      if (chapter.chapter.record_kind !== "production")
        throw new Error(
          `Fixture chapter in production release: ${chapter.chapter.edition_id}`,
        );

  if (expected) {
    if (expected.release_id !== releaseId)
      throw new Error("Retained projection names another release.");
    const expectedChapters = new Map(
      expected.records.chapters.map((chapter) => [chapter.edition_id, chapter]),
    );
    for (const [editionId, chapter] of expectedChapters) {
      const resource = chapters.get(editionId);
      if (!resource)
        throw new Error(
          `Retained chapter is not readable online: ${editionId}`,
        );
      if (canonical(resource.chapter) !== canonical(chapter))
        throw new Error(
          `Chapter differs from retained projection: ${editionId}`,
        );
      const topic = topics.get(`${chapter.harness_id}|${chapter.topic}`);
      const entry = topic?.editions.find(
        (edition) => edition.edition_id === editionId,
      );
      if (!entry)
        throw new Error(
          `Retained edition missing from topic index: ${editionId}`,
        );
      const expectedMappings = expected.records.mappings
        .filter((mapping) => mapping.edition_id === editionId)
        .sort((a, b) => (a.mapping_id < b.mapping_id ? -1 : 1));
      if (canonical(entry.mappings) !== canonical(expectedMappings))
        throw new Error(
          `Mappings differ from retained projection: ${editionId}`,
        );
      const scope = resource.source_scope
        .map((item) => item.reference_id)
        .sort();
      const derived = [...sourceIdsFromChapter(chapter)].sort();
      if (canonical(scope) !== canonical(derived))
        throw new Error(
          `Source scope differs from retained projection: ${editionId}`,
        );
    }
    for (const editionId of chapters.keys())
      if (!expectedChapters.has(editionId))
        throw new Error(`Unexpected readable chapter: ${editionId}`);
    for (const selection of expected.records.current) {
      const topic = topics.get(`${selection.harness_id}|${selection.topic}`);
      if (!topic || topic.current !== selection.edition_id)
        throw new Error(`Current selection differs: ${selection.harness_id}`);
    }
    for (const ref of expected.records.source_references) {
      const source = sources.get(ref.reference_id);
      if (!source || source.reference.kind !== "chapter")
        throw new Error(
          `Retained source is missing online: ${ref.reference_id}`,
        );
      if (canonical(source.reference.record) !== canonical(ref))
        throw new Error(`Retained source record differs: ${ref.reference_id}`);
    }
    for (const ref of expected.records.catalog.references) {
      const source = sources.get(ref.reference_id);
      if (!source || source.reference.kind !== "catalog")
        throw new Error(
          `Catalog source is missing online: ${ref.reference_id}`,
        );
      const record = {
        reference_id: ref.reference_id,
        harness_id: ref.harness_id,
        official_url: ref.official_url,
        captured_at: ref.captured_at,
        snapshot: {
          kind: ref.snapshot.kind,
          sha256: ref.snapshot.sha256,
          ...(ref.snapshot.revision !== undefined
            ? { revision: ref.snapshot.revision }
            : {}),
        },
        locator: ref.locator,
        excerpt: ref.excerpt,
      };
      if (canonical(source.reference.record) !== canonical(record))
        throw new Error(`Catalog source record differs: ${ref.reference_id}`);
    }
    for (const product of catalog.products) {
      const base = {
        harness_id: product.harness_id,
        name: product.name,
        aliases: product.aliases,
        reference_ids: product.reference_ids,
        surfaces: product.surfaces,
        runtimes: product.runtimes,
        bindings: product.bindings,
      };
      const projected = expected.records.catalog.products.find(
        (item) => item.harness_id === product.harness_id,
      );
      if (!projected || canonical(base) !== canonical(projected))
        throw new Error(`Catalog product differs: ${product.harness_id}`);
    }
  }
}
