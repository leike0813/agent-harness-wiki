import { readFile } from "node:fs/promises";
import path from "node:path";
import * as z from "zod";
import YAML from "yaml";
import {
  chapterPublishedKnowledgeSchema,
  type ChapterDataset,
  type ChapterPublishedKnowledge,
} from "../domain/chapter.js";
import {
  topicSchema,
  upstreamAuditSchema,
  type Topic,
} from "../domain/schema.js";
import {
  managedPackages,
  updateManaged,
  type ManagedId,
} from "../sources/managed.js";
import { QueryService } from "../query/service.js";
import { loadAndValidateChapters } from "../validation/chapters.js";
import {
  compileChapterDataset,
  selectChapterRelease,
} from "./chapter-release.js";
import { canonical } from "./projection.js";

const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const optionsSchema = z.strictObject({
  datasetRoot: z.string().min(1),
  profile: z.enum(["fixture", "production"]),
  releaseId: z.string().regex(/^[a-z][a-z0-9_-]*$/),
  publishedAt: z.iso.datetime(),
  releasesRoot: z.string().min(1),
  blocked: z
    .array(z.strictObject({ harness_id: id, topic: topicSchema }))
    .default([]),
  managedAudits: z.array(z.string()).default([]),
  managedRoot: z.string().min(1).default("."),
  managedCandidates: z.array(z.string()).default([]),
  skipManaged: z.boolean().default(false),
  publishCurrent: z.boolean().default(true),
});
export type ChapterUpdateOptions = z.input<typeof optionsSchema>;

export type ManagedOutcome = {
  id: string;
  status: string;
  reason?: string;
};

export type ChapterUpdateResult = {
  status: "published" | "staged" | "audit_only" | "blocked";
  previous_release_id: string | null;
  release_id: string | null;
  release_dir: string | null;
  retained: { harness_id: string; topic: Topic; edition_id: string }[];
  managed_outcomes: ManagedOutcome[];
  knowledge_error: string | null;
};

export type ManagedRefresh = (id: ManagedId) => Promise<ManagedOutcome>;

async function readPointer(root: string): Promise<string | null> {
  try {
    const raw = JSON.parse(
      await readFile(path.join(root, "current.json"), "utf8"),
    ) as { release_id?: unknown };
    if (typeof raw.release_id !== "string")
      throw new Error("Current release pointer is invalid.");
    return raw.release_id;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function readPrevious(
  root: string,
  previousId: string,
): Promise<ChapterPublishedKnowledge> {
  if (!/^[a-z][a-z0-9_-]*$/.test(previousId))
    throw new Error("Invalid current release ID.");
  return chapterPublishedKnowledgeSchema.parse(
    JSON.parse(
      await readFile(path.join(root, previousId, "knowledge.json"), "utf8"),
    ),
  );
}

// A released record is immutable and must persist: the release carries history
// forward, so a dropped or edited record would rewrite what readers already
// have. The compiler only freezes chapter Markdown bytes, so source metadata,
// snapshots, artifacts and version mappings need the same guard.
function assertFrozen<T>(
  label: string,
  released: T[],
  current: T[],
  idOf: (record: T) => string,
): void {
  for (const record of released) {
    const match = current.find((x) => idOf(x) === idOf(record));
    if (!match)
      throw new Error(`Released ${label} is missing: ${idOf(record)}`);
    if (canonical(match) !== canonical(record))
      throw new Error(`Immutable ${label} changed in place: ${idOf(record)}`);
  }
}

function assertReleasedRecordsFrozen(
  previous: ChapterPublishedKnowledge,
  dataset: ChapterDataset,
): void {
  assertFrozen(
    "chapter edition",
    previous.records.chapters,
    dataset.chapters,
    (x) => x.edition_id,
  );
  assertFrozen(
    "source reference",
    previous.records.source_references,
    dataset.source_references,
    (x) => x.reference_id,
  );
  assertFrozen(
    "snapshot",
    previous.records.snapshots,
    dataset.snapshots,
    (x) => x.snapshot_id,
  );
  assertFrozen(
    "artifact",
    previous.records.artifacts,
    dataset.artifacts,
    (x) => x.artifact_id,
  );
  assertFrozen(
    "software mapping",
    previous.records.mappings,
    dataset.mappings,
    (x) => x.mapping_id,
  );
}

// ponytail: drops blocked drafts and prunes records they alone introduced; a
// retained topic is byte-identical to the previous release. Revisit only if a
// blocked topic ever needs reviewer-approved sections to publish early.
function retainBlocked(
  dataset: ChapterDataset,
  previous: ChapterPublishedKnowledge | null,
  blocked: { harness_id: string; topic: Topic }[],
): { dataset: ChapterDataset; retained: ChapterUpdateResult["retained"] } {
  const key = (harness: string, topic: Topic): string => `${harness}|${topic}`;
  const previousChapters = new Set(
    previous?.records.chapters.map((x) => x.edition_id) ?? [],
  );
  const previousCurrent = new Map(
    (previous?.records.current ?? []).map((x) => [
      key(x.harness_id, x.topic),
      x.edition_id,
    ]),
  );
  const previousReferences = new Set(
    (previous?.records.source_references ?? []).map((x) => x.reference_id),
  );
  const previousSnapshots = new Set(
    (previous?.records.snapshots ?? []).map((x) => x.snapshot_id),
  );
  const previousArtifacts = new Set(
    (previous?.records.artifacts ?? []).map((x) => x.artifact_id),
  );
  const current = new Map(
    dataset.current.map((x) => [key(x.harness_id, x.topic), x]),
  );
  const dropped = new Set<string>();
  const retained: ChapterUpdateResult["retained"] = [];
  for (const block of blocked) {
    const selection = key(block.harness_id, block.topic);
    const edition = previousCurrent.get(selection);
    if (!edition)
      throw new Error(
        `Blocked topic has no previous edition to retain: ${selection}`,
      );
    if (!dataset.chapters.some((x) => x.edition_id === edition))
      throw new Error(
        `Blocked topic previous edition is absent from the dataset: ${edition}`,
      );
    current.set(selection, {
      harness_id: block.harness_id,
      topic: block.topic,
      edition_id: edition,
    });
    for (const chapter of dataset.chapters)
      if (
        chapter.harness_id === block.harness_id &&
        chapter.topic === block.topic &&
        chapter.edition_id !== edition &&
        !previousChapters.has(chapter.edition_id)
      )
        dropped.add(chapter.edition_id);
    retained.push({
      harness_id: block.harness_id,
      topic: block.topic,
      edition_id: edition,
    });
  }
  const chapters = dataset.chapters.filter((x) => !dropped.has(x.edition_id));
  const mappings = dataset.mappings.filter((x) => !dropped.has(x.edition_id));
  const cited = new Set<string>();
  for (const chapter of chapters) {
    for (const section of chapter.sections)
      for (const ref of section.source_refs) cited.add(ref);
    for (const question of chapter.questions)
      for (const ref of question.source_refs) cited.add(ref);
  }
  for (const mapping of mappings)
    for (const section of mapping.sections) cited.add(section.evidence_ref);
  const source_references = previous
    ? dataset.source_references.filter(
        (x) =>
          previousReferences.has(x.reference_id) || cited.has(x.reference_id),
      )
    : dataset.source_references;
  const keptSnapshots = new Set(source_references.map((x) => x.snapshot_id));
  const snapshots = previous
    ? dataset.snapshots.filter(
        (x) =>
          previousSnapshots.has(x.snapshot_id) ||
          keptSnapshots.has(x.snapshot_id),
      )
    : dataset.snapshots;
  const keptArtifacts = new Set(
    snapshots.flatMap((x) => ("artifact_id" in x ? [x.artifact_id] : [])),
  );
  const artifacts = previous
    ? dataset.artifacts.filter(
        (x) =>
          previousArtifacts.has(x.artifact_id) ||
          keptArtifacts.has(x.artifact_id),
      )
    : dataset.artifacts;
  return {
    dataset: {
      ...dataset,
      artifacts,
      snapshots,
      source_references,
      chapters,
      mappings,
      current: [...current.values()],
    },
    retained,
  };
}

function byId<T>(items: T[], key: (item: T) => string): T[] {
  return [...items].sort((a, b) =>
    key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0,
  );
}

// Reader-visible state only: the selected editions, the source locators they
// cite, and version mappings. Unreferenced snapshots, artifacts or sources do
// not change what a reader sees.
function readerVisible(dataset: ChapterDataset): unknown {
  const selected = new Map(
    dataset.current.map((x) => [`${x.harness_id}|${x.topic}`, x.edition_id]),
  );
  const chapters = dataset.chapters.filter(
    (x) => selected.get(`${x.harness_id}|${x.topic}`) === x.edition_id,
  );
  const cited = new Set<string>();
  for (const chapter of chapters) {
    for (const section of chapter.sections)
      for (const ref of section.source_refs) cited.add(ref);
    for (const question of chapter.questions)
      for (const ref of question.source_refs) cited.add(ref);
  }
  for (const mapping of dataset.mappings)
    for (const section of mapping.sections) cited.add(section.evidence_ref);
  return {
    current: byId(
      [...selected.entries()].map(([key, edition_id]) => ({ key, edition_id })),
      (x) => x.key,
    ),
    chapters: byId(chapters, (x) => x.edition_id),
    mappings: byId(dataset.mappings, (x) => x.mapping_id),
    references: byId(
      dataset.source_references.filter((x) => cited.has(x.reference_id)),
      (x) => x.reference_id,
    ),
  };
}

// Candidates come only from the explicit current-invocation audits (or an
// explicit list), never from the whole audit history, so an already-handled
// observation cannot re-trigger the updater on every run.
async function auditCandidates(
  audits: string[],
  outcomes: ManagedOutcome[],
): Promise<ManagedId[]> {
  const ids = new Set<ManagedId>();
  for (const file of audits) {
    try {
      const document = YAML.parseDocument(await readFile(file, "utf8"), {
        uniqueKeys: true,
        customTags: [],
      });
      if (document.errors.length || document.warnings.length)
        throw new Error("Invalid audit YAML");
      const audit = upstreamAuditSchema.parse(
        document.toJS({ maxAliasCount: 0 }),
      );
      if (!(audit.harness_id in managedPackages)) continue;
      if (
        audit.checks.some(
          (check) =>
            check.kind === "npm_registry" && check.status === "changed",
        )
      )
        ids.add(audit.harness_id as ManagedId);
    } catch (error) {
      outcomes.push({
        id: path.basename(file),
        status: "blocked",
        reason: `Unreadable current audit: ${String(error)}`,
      });
    }
  }
  return [...ids];
}

async function refreshManaged(
  candidates: ManagedId[],
  refresh: ManagedRefresh,
): Promise<ManagedOutcome[]> {
  const outcomes: ManagedOutcome[] = [];
  for (const candidate of candidates) {
    try {
      const outcome = await refresh(candidate);
      outcomes.push({
        id: outcome.id,
        status: outcome.status,
        ...(outcome.reason ? { reason: outcome.reason } : {}),
      });
    } catch (error) {
      outcomes.push({
        id: candidate,
        status: "blocked",
        reason: String(error),
      });
    }
  }
  return outcomes;
}

// The staged release must answer through the same surface the CLI and MCP use,
// not just pass artifact hashing.
async function assertReadable(
  releasesRoot: string,
  releaseId: string,
  selections: { harness_id: string; topic: Topic; edition_id: string }[],
): Promise<void> {
  const selection = selections[0];
  if (!selection) return;
  const service = await QueryService.open({ releasesRoot, releaseId });
  try {
    const page = service.getTopic({
      harness: selection.harness_id,
      topic: selection.topic,
    });
    if (page.status !== "ok" || page.edition_id !== selection.edition_id)
      throw new Error(
        `Staged release is not readable: ${selection.harness_id}/${selection.topic}`,
      );
  } finally {
    service.close();
  }
}

export async function publishChapterUpdate(
  input: ChapterUpdateOptions,
  deps: { refresh?: ManagedRefresh } = {},
): Promise<ChapterUpdateResult> {
  const options = optionsSchema.parse(input);
  if (options.profile !== "production" && options.publishCurrent)
    throw new Error(
      "A non-production release cannot switch the current pointer; stage it with publishCurrent:false.",
    );
  const root = path.resolve(options.releasesRoot);
  let previousId: string | null = null;
  let retained: ChapterUpdateResult["retained"] = [];
  let status: ChapterUpdateResult["status"] = "audit_only";
  let releaseId: string | null = null;
  let releaseDir: string | null = null;
  let knowledgeError: string | null = null;
  try {
    previousId = await readPointer(root);
    const previous = previousId ? await readPrevious(root, previousId) : null;
    const validated = await loadAndValidateChapters({
      root: options.datasetRoot,
      profile: options.profile,
    });
    if (!validated.ok)
      throw new Error(
        `Dataset validation failed: ${validated.diagnostics
          .filter((x) => x.severity === "error")
          .map((x) => `${x.code} ${x.file}`)
          .join("; ")}`,
      );
    if (previous) assertReleasedRecordsFrozen(previous, validated.dataset);
    const merged = retainBlocked(validated.dataset, previous, options.blocked);
    retained = merged.retained;
    if (
      !previous ||
      canonical(readerVisible(previous.records)) !==
        canonical(readerVisible(merged.dataset))
    ) {
      const result = await compileChapterDataset(merged.dataset, {
        datasetRoot: options.datasetRoot,
        profile: options.profile,
        releaseId: options.releaseId,
        publishedAt: options.publishedAt,
        releasesRoot: options.releasesRoot,
        publishCurrent: false,
      });
      await assertReadable(
        options.releasesRoot,
        options.releaseId,
        merged.dataset.current,
      );
      if (options.publishCurrent)
        await selectChapterRelease(options.releasesRoot, options.releaseId);
      status = options.publishCurrent ? "published" : "staged";
      releaseId = options.releaseId;
      releaseDir = result.releaseDir;
    }
  } catch (error) {
    knowledgeError = error instanceof Error ? error.message : String(error);
    status = "blocked";
    releaseId = null;
    releaseDir = null;
  }
  const managed_outcomes: ManagedOutcome[] = [];
  if (!options.skipManaged) {
    const candidates = [
      ...new Set<ManagedId>([
        ...options.managedCandidates.filter(
          (x): x is ManagedId => x in managedPackages,
        ),
        ...(await auditCandidates(options.managedAudits, managed_outcomes)),
      ]),
    ];
    if (candidates.length)
      managed_outcomes.push(
        ...(await refreshManaged(
          candidates,
          deps.refresh ??
            ((managedId) =>
              updateManaged(path.resolve(options.managedRoot), managedId)),
        )),
      );
  }
  return {
    status,
    previous_release_id: previousId,
    release_id: releaseId,
    release_dir: releaseDir,
    retained,
    managed_outcomes,
    knowledge_error: knowledgeError,
  };
}
