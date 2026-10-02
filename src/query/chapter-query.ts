/**
 * Pure shared chapter-query core used by the local SQLite-backed query service
 * and the online published-resource service. It resolves products, selects a
 * published edition for a requested version, projects a surface-scoped chapter
 * answer set, compares common questions and paginates release-bound results.
 *
 * It deliberately imports no SQLite, Ollama, MCP, compiler or network module so
 * the consumer package's compiled graph stays free of those dependencies.
 */
import { createHash } from "node:crypto";
import * as z from "zod";
import type { Topic } from "../domain/schema.js";
import type { ChapterEdition, SoftwareMapping } from "../domain/chapter.js";
import { canonical } from "../domain/json.js";

export type ResolutionMatchKind =
  "current" | "exact" | "prefix" | "nearest_earlier" | "source_only";

export interface Resolution {
  requested_version: string | null;
  selected_version: string | null;
  match_kind: ResolutionMatchKind;
  requested_applicability: "mapped" | "not_verified";
}

export interface SourceScopeEntry {
  reference_id: string;
  snapshot_id: string;
  official_url: string;
}

/** Raised when a cursor is malformed or does not bind this release and query. */
export class CursorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CursorError";
  }
}

export interface ProductLike {
  harness_id: string;
  name: string;
  aliases: string[];
}

export function versionParts(value: string): number[] | undefined {
  if (!/^\d+(?:\.\d+)*$/.test(value)) return undefined;
  const parts = value.split(".").map(Number);
  return parts.every(Number.isSafeInteger) ? parts : undefined;
}

export function compareVersions(
  left: string,
  right: string,
): number | undefined {
  const a = versionParts(left);
  const b = versionParts(right);
  if (!a || !b) return undefined;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const delta = (a[i] ?? 0) - (b[i] ?? 0);
    if (delta) return Math.sign(delta);
  }
  return 0;
}

/** Resolve a name or alias to exactly one product, or report ambiguity. */
export function resolveProduct<P extends ProductLike>(
  products: readonly P[],
  name: string,
): P | "ambiguous" | undefined {
  const found = products.filter((product) =>
    [product.harness_id, product.name, ...product.aliases].some(
      (alias) => alias.toLocaleLowerCase() === name.toLocaleLowerCase(),
    ),
  );
  return found.length > 1 ? "ambiguous" : found[0];
}

/** Extract one `## title {#section-id}` section, or undefined when absent. */
export function sectionText(
  body: string,
  sectionId: string,
): string | undefined {
  const headings = [...body.matchAll(/^## (.+) \{#([a-z][a-z0-9_-]*)\}\s*$/gm)];
  const index = headings.findIndex((heading) => heading[2] === sectionId);
  return index < 0
    ? undefined
    : body.slice(headings[index]!.index, headings[index + 1]?.index).trim();
}

/**
 * Slice a release-bound page. The cursor binds release, normalized query and
 * ordering position; a cursor from another release or query is rejected.
 */
export function page<T>(
  items: readonly T[],
  limit: number,
  cursor: string | undefined,
  release: string,
  query: unknown,
  order = 1,
): { items: T[]; next_cursor?: string } {
  const digest = createHash("sha256").update(canonical(query)).digest("hex");
  let offset = 0;
  if (cursor) {
    let decoded: unknown;
    try {
      decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    } catch {
      throw new CursorError("Invalid cursor.");
    }
    const parsed = z
      .strictObject({
        release: z.string(),
        digest: z.string(),
        order: z.int(),
        offset: z.int().nonnegative(),
      })
      .safeParse(decoded);
    if (
      !parsed.success ||
      parsed.data.release !== release ||
      parsed.data.digest !== digest ||
      parsed.data.order !== order ||
      parsed.data.offset > items.length
    )
      throw new CursorError("Cursor does not match this release and query.");
    offset = parsed.data.offset;
  }
  const next = offset + limit;
  return {
    items: items.slice(offset, next),
    ...(next < items.length
      ? {
          next_cursor: Buffer.from(
            JSON.stringify({ release, digest, order, offset: next }),
          ).toString("base64url"),
        }
      : {}),
  };
}

/** One candidate edition of a product/topic with its mapping metadata. */
export interface EditionCandidate {
  edition_id: string;
  availability: "available" | "trimmed";
  sections: readonly { section_id: string; surface_ids: readonly string[] }[];
  mappings: readonly SoftwareMapping[];
}

export interface EditionSelection {
  edition: EditionCandidate | undefined;
  resolution: Resolution;
}

/**
 * Apply the shared exact / prefix / nearest-earlier selection rules over an
 * edition set. A mapping that selects an edition outside the set, or no mapping
 * at all, falls back to the current edition and a source_only resolution.
 */
export function selectEdition(
  candidates: readonly EditionCandidate[],
  currentEditionId: string | undefined,
  version: string | undefined,
  sectionId: string | undefined,
  surfaceId: string | undefined,
): EditionSelection {
  const current = candidates.find(
    (candidate) => candidate.edition_id === currentEditionId,
  );
  const sourceOnly: Resolution = {
    requested_version: version ?? null,
    selected_version: null,
    match_kind: version ? "source_only" : "current",
    requested_applicability: "not_verified",
  };
  if (!version) return { edition: current, resolution: sourceOnly };
  const requested = version;
  const mappings = candidates
    .flatMap((candidate) => candidate.mappings)
    .filter(
      (mapping) =>
        mapping.surface_id === surfaceId &&
        (sectionId
          ? mapping.sections.some((s) => s.section_id === sectionId)
          : mapping.scope === "chapter"),
    );
  const latest = (items: SoftwareMapping[]): SoftwareMapping | undefined =>
    items
      .slice()
      .sort(
        (a, b) =>
          (compareVersions(b.software_version, a.software_version) ?? 0) ||
          a.mapping_id.localeCompare(b.mapping_id),
      )[0];
  const exact = latest(
    mappings.filter((mapping) => mapping.software_version === requested),
  );
  const prefix = exact
    ? undefined
    : latest(
        mappings.filter((mapping) =>
          mapping.software_version.startsWith(`${requested}.`),
        ),
      );
  const earlier =
    exact || prefix
      ? undefined
      : latest(
          mappings.filter((mapping) => {
            const order = compareVersions(mapping.software_version, requested);
            return order !== undefined && order <= 0;
          }),
        );
  const selected = exact ?? prefix ?? earlier;
  if (!selected) return { edition: current, resolution: sourceOnly };
  return {
    edition: candidates.find(
      (candidate) => candidate.edition_id === selected.edition_id,
    ),
    resolution: {
      requested_version: requested,
      selected_version: selected.software_version,
      match_kind: exact ? "exact" : prefix ? "prefix" : "nearest_earlier",
      requested_applicability: exact ? "mapped" : "not_verified",
    },
  };
}

export interface ChapterProjectionInput {
  chapter: ChapterEdition;
  surfaceId: string | undefined;
  sectionId: string | undefined;
  /** Every surface id declared by the product, for whole-product reads. */
  surfaceIds: readonly string[];
  sourceScope: readonly SourceScopeEntry[];
}

/**
 * Project one chapter into the shared surface-scoped answer shape. Surfaces
 * without an answer receive an explicit not_investigated placeholder rather
 * than being silently dropped.
 */
export function projectChapter(input: ChapterProjectionInput) {
  const { chapter, surfaceId, sectionId } = input;
  const section = sectionId
    ? chapter.sections.find((item) => item.section_id === sectionId)
    : undefined;
  const selectedSurfaces = surfaceId ? [surfaceId] : [...input.surfaceIds];
  const selectedSections = (section ? [section] : chapter.sections).filter(
    (item) => !surfaceId || item.surface_ids.includes(surfaceId),
  );
  const questions = chapter.questions
    .map((question) => ({
      question_id: question.question_id,
      answers: [
        ...question.answers
          .filter(
            (answer) =>
              (!surfaceId || answer.surface_ids.includes(surfaceId)) &&
              (!section || answer.section_id === section.section_id),
          )
          .map((answer) => ({
            ...answer,
            surface_ids: answer.surface_ids.filter((id) =>
              selectedSurfaces.includes(id),
            ),
          })),
        ...(!section
          ? selectedSurfaces
              .filter(
                (id) =>
                  !question.answers.some((answer) =>
                    answer.surface_ids.includes(id),
                  ),
              )
              .map((id) => ({
                surface_ids: [id],
                section_id: null,
                status: "not_investigated" as const,
                source_refs: [] as string[],
              }))
          : []),
      ],
    }))
    .filter((question) => question.answers.length);
  const refs = [
    ...new Set(selectedSections.flatMap((item) => item.source_refs)),
  ];
  const scopeById = new Map(
    input.sourceScope.map((entry) => [entry.reference_id, entry]),
  );
  const source_scope = refs.map((id) => {
    const entry = scopeById.get(id);
    if (!entry)
      throw new Error(`Source reference is missing from scope: ${id}`);
    return {
      reference_id: id,
      snapshot_id: entry.snapshot_id,
      official_url: entry.official_url,
    };
  });
  return {
    status: selectedSections.length
      ? ("ok" as const)
      : ("not_investigated" as const),
    surface_id: surfaceId ?? null,
    topic: chapter.topic,
    edition_id: chapter.edition_id,
    title: chapter.title,
    body:
      surfaceId || section
        ? selectedSections
            .map((item) => sectionText(chapter.body, item.section_id)!)
            .join("\n\n")
        : chapter.body,
    sections: selectedSections.map((item) => ({
      section_id: item.section_id,
      surface_ids: item.surface_ids,
      question_ids: chapter.questions
        .filter((question) =>
          question.answers.some(
            (answer) =>
              answer.section_id === item.section_id &&
              (!surfaceId || answer.surface_ids.includes(surfaceId)),
          ),
        )
        .map((question) => question.question_id),
      source_refs: item.source_refs,
    })),
    questions,
    source_refs: refs,
    source_scope,
  };
}

export interface AnswerLike {
  surface_ids: string[];
  section_id: string | null;
  status:
    | "answered"
    | "partial"
    | "unknown"
    | "not_applicable"
    | "conflict"
    | "not_investigated";
  source_refs: string[];
}

interface QuestionBearing {
  release_id: string;
  status: "ok" | "not_investigated";
  harness_id: string;
  surface_id: string | null;
  topic: Topic;
  edition_id: string;
  resolution: Resolution;
  questions: { question_id: string; answers: AnswerLike[] }[];
}

/** A chapter result carries questions when it is readable at all. */
export function isQuestionBearing(value: unknown): value is QuestionBearing {
  return (
    typeof value === "object" &&
    value !== null &&
    "questions" in value &&
    ((value as { status?: unknown }).status === "ok" ||
      (value as { status?: unknown }).status === "not_investigated")
  );
}

/** Common questions across every presented target, honoring an explicit subset. */
export function comparisonQuestionIds(
  results: readonly unknown[],
  requested?: readonly string[],
): string[] {
  const present = results.filter((result): result is QuestionBearing =>
    isQuestionBearing(result),
  );
  const common =
    results.length > 0 && present.length === results.length
      ? present[0]!.questions
          .filter((question) =>
            present.every((result) =>
              result.questions.some(
                (other) => other.question_id === question.question_id,
              ),
            ),
          )
          .map((question) => question.question_id)
      : [];
  return requested ? common.filter((id) => requested.includes(id)) : common;
}

/**
 * Assemble a comparison result: readable targets are summarized, unavailable
 * or unknown targets are preserved verbatim, and only common questions are
 * aligned. A target without readable questions never gets manufactured answers.
 */
export function assembleComparison<R>(
  releaseId: string,
  topic: Topic,
  fullResults: readonly R[],
  requested?: readonly string[],
) {
  const present = fullResults.filter((result): result is R & QuestionBearing =>
    isQuestionBearing(result),
  );
  const ids = comparisonQuestionIds(fullResults, requested);
  return {
    release_id: releaseId,
    topic,
    results: fullResults.map((result) =>
      isQuestionBearing(result)
        ? {
            release_id: result.release_id,
            status: result.status,
            harness_id: result.harness_id,
            surface_id: result.surface_id,
            topic: result.topic,
            edition_id: result.edition_id,
            resolution: result.resolution,
          }
        : result,
    ),
    questions: ids.map((question_id) => ({
      question_id,
      entries: present.map((result) => {
        const question = result.questions.find(
          (item) => item.question_id === question_id,
        )!;
        return {
          harness_id: result.harness_id,
          surface_id: result.surface_id,
          answers: question.answers,
          resolution: result.resolution,
        };
      }),
    })),
  };
}
