import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Database from "better-sqlite3";
import * as z from "zod";
import { verifyChapterRelease } from "../compiler/chapter-release.js";
import { canonical } from "../compiler/projection.js";
import {
  chapterPublishedKnowledgeSchema,
  type ChapterEdition,
  type ChapterPublishedKnowledge,
} from "../domain/chapter.js";
import {
  compareSchema,
  listSchema,
  searchSchema,
  sourceRequestSchema,
  topicRequestSchema,
} from "./schema.js";
import {
  normalizeVector,
  searchIndexSchema,
  sectionText,
  type SearchSection,
  type SemanticIndex,
} from "./search-index.js";
import { assertLocalModel, embedLocal, OLLAMA_ENDPOINT } from "./ollama.js";
import { readSemanticIndex, semanticFileName } from "./semantic-file.js";

type Records = ChapterPublishedKnowledge["records"];
const searchStopwords = new Set([
  "a",
  "an",
  "and",
  "are",
  "do",
  "does",
  "for",
  "from",
  "get",
  "how",
  "in",
  "is",
  "of",
  "on",
  "the",
  "to",
  "up",
  "where",
  "with",
]);
type Resolution = {
  requested_version: string | null;
  selected_version: string | null;
  match_kind:
    "current" | "exact" | "prefix" | "nearest_earlier" | "source_only";
  requested_applicability: "mapped" | "not_verified";
};

function page<T>(
  items: T[],
  limit: number,
  cursor: string | undefined,
  release: string,
  query: unknown,
  order = 1,
) {
  const digest = createHash("sha256").update(canonical(query)).digest("hex");
  let offset = 0;
  if (cursor) {
    let decoded: unknown;
    try {
      decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    } catch {
      throw new Error("Invalid cursor.");
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
      throw new Error("Cursor does not match this release and query.");
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

function versionParts(value: string): number[] | undefined {
  if (!/^\d+(?:\.\d+)*$/.test(value)) return undefined;
  const parts = value.split(".").map(Number);
  return parts.every(Number.isSafeInteger) ? parts : undefined;
}
function compareVersions(left: string, right: string): number | undefined {
  const a = versionParts(left),
    b = versionParts(right);
  if (!a || !b) return undefined;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const delta = (a[i] ?? 0) - (b[i] ?? 0);
    if (delta) return Math.sign(delta);
  }
  return 0;
}
export class QueryService {
  private constructor(
    readonly releaseId: string,
    private readonly records: Records,
    private readonly searchSections: SearchSection[],
    private readonly searchDb: Database.Database | undefined,
    private readonly semantic: SemanticIndex | undefined,
    private readonly ollamaEndpoint: string,
  ) {}

  static async open(options: {
    releasesRoot: string;
    releaseId?: string;
    ollamaEndpoint?: string;
  }): Promise<QueryService> {
    const releaseId =
      options.releaseId ??
      (
        JSON.parse(
          await readFile(
            path.join(options.releasesRoot, "current.json"),
            "utf8",
          ),
        ) as { release_id: string }
      ).release_id;
    if (!/^[a-z][a-z0-9_-]*$/.test(releaseId))
      throw new Error("Invalid release ID.");
    const dir = path.join(options.releasesRoot, releaseId);
    const manifest = await verifyChapterRelease(dir);
    if (!options.releaseId && manifest.profile === "fixture")
      throw new Error("Fixture release requires an explicit release ID.");
    const knowledge = chapterPublishedKnowledgeSchema.parse(
      JSON.parse(await readFile(path.join(dir, "knowledge.json"), "utf8")),
    );
    const searchSections = searchIndexSchema.parse(
      JSON.parse(await readFile(path.join(dir, "search.json"), "utf8")),
    ).sections;
    let semantic: SemanticIndex | undefined;
    const semanticFile = manifest.artifacts[semanticFileName]
      ? semanticFileName
      : manifest.artifacts["semantic.json"]
        ? "semantic.json"
        : undefined;
    if (manifest.semantic && semanticFile) {
      try {
        semantic = await readSemanticIndex(dir, semanticFile);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
    }
    const db = new Database(path.join(dir, "knowledge.sqlite"), {
      readonly: true,
      fileMustExist: true,
    });
    return new QueryService(
      releaseId,
      knowledge.records,
      searchSections,
      db,
      semantic,
      options.ollamaEndpoint ?? OLLAMA_ENDPOINT,
    );
  }
  close(): void {
    this.searchDb?.close();
  }

  private harness(name: string) {
    const found = this.records.catalog.products.filter((x) =>
      [x.harness_id, x.name, ...x.aliases].some(
        (alias) => alias.toLocaleLowerCase() === name.toLocaleLowerCase(),
      ),
    );
    return found.length > 1 ? ("ambiguous" as const) : found[0];
  }
  listHarnesses(input: unknown = {}) {
    const request = listSchema.parse(input),
      query = request.query?.toLocaleLowerCase() ?? "";
    const items = this.records.catalog.products
      .filter(
        (x) =>
          request.scope === "catalog" ||
          this.records.harnesses.some((r) => r.harness_id === x.harness_id),
      )
      .filter((x) =>
        [x.harness_id, x.name, ...x.aliases].some((alias) =>
          alias.toLocaleLowerCase().includes(query),
        ),
      )
      .map((x) => ({
        ...x,
        registered: this.records.harnesses.some(
          (r) => r.harness_id === x.harness_id,
        ),
        surface_coverage: x.surfaces.map((surface) => ({
          surface_id: surface.surface_id,
          topics: this.records.current
            .filter(
              (selection) =>
                selection.harness_id === x.harness_id &&
                this.records.chapters
                  .find(
                    (chapter) => chapter.edition_id === selection.edition_id,
                  )
                  ?.questions.some((q) =>
                    q.answers.some((a) =>
                      a.surface_ids.includes(surface.surface_id),
                    ),
                  ),
            )
            .map((selection) => selection.topic),
        })),
        topics: this.records.current
          .filter((s) => s.harness_id === x.harness_id)
          .map((s) => s.topic),
      }));
    return {
      release_id: this.releaseId,
      ...page(items, request.limit, request.cursor, this.releaseId, {
        query,
        scope: request.scope,
      }),
    };
  }
  private select(
    harnessId: string,
    topic: string,
    version?: string,
    sectionId?: string,
    surfaceId?: string,
  ): { chapter: ChapterEdition | undefined; resolution: Resolution } {
    const current = this.records.current.find(
      (x) => x.harness_id === harnessId && x.topic === topic,
    );
    const currentChapter = this.records.chapters.find(
      (x) => x.edition_id === current?.edition_id,
    );
    const sourceOnly: Resolution = {
      requested_version: version ?? null,
      selected_version: null,
      match_kind: version ? "source_only" : "current",
      requested_applicability: "not_verified",
    };
    if (!version) return { chapter: currentChapter, resolution: sourceOnly };
    const mappings = this.records.mappings.filter(
      (x) =>
        x.harness_id === harnessId &&
        x.surface_id === surfaceId &&
        this.records.chapters.some(
          (c) => c.edition_id === x.edition_id && c.topic === topic,
        ) &&
        (sectionId
          ? x.sections.some((s) => s.section_id === sectionId)
          : x.scope === "chapter"),
    );
    const latest = (xs: typeof mappings) =>
      xs.sort(
        (a, b) =>
          (compareVersions(b.software_version, a.software_version) ?? 0) ||
          a.mapping_id.localeCompare(b.mapping_id),
      )[0];
    const exact = latest(
      mappings.filter((x) => x.software_version === version),
    );
    const prefix = exact
      ? undefined
      : latest(
          mappings.filter((x) => x.software_version.startsWith(`${version}.`)),
        );
    const earlier =
      exact || prefix
        ? undefined
        : latest(
            mappings.filter((x) => {
              const order = compareVersions(x.software_version, version);
              return order !== undefined && order <= 0;
            }),
          );
    const selected = exact ?? prefix ?? earlier;
    return {
      chapter: selected
        ? this.records.chapters.find(
            (x) => x.edition_id === selected.edition_id,
          )
        : currentChapter,
      resolution: selected
        ? {
            requested_version: version,
            selected_version: selected.software_version,
            match_kind: exact ? "exact" : prefix ? "prefix" : "nearest_earlier",
            requested_applicability: exact ? "mapped" : "not_verified",
          }
        : sourceOnly,
    };
  }
  getTopic(input: unknown) {
    const request = topicRequestSchema.parse(input),
      harness = this.harness(request.harness);
    const empty = <S extends "not_found" | "ambiguous" | "not_investigated">(
      status: S,
    ) => ({
      release_id: this.releaseId,
      status,
      requested_version: request.version ?? null,
      surface_id: request.surface_id ?? null,
    });
    if (harness === "ambiguous") return empty("ambiguous");
    if (!harness) return empty("not_found");
    if (
      request.surface_id &&
      !harness.surfaces.some((x) => x.surface_id === request.surface_id)
    )
      return empty("not_found");
    if (request.version && !request.surface_id)
      return {
        ...empty("ambiguous"),
        harness_id: harness.harness_id,
        surfaces: harness.surfaces,
      };
    const { chapter, resolution } = this.select(
      harness.harness_id,
      request.topic,
      request.version,
      request.section_id,
      request.surface_id,
    );
    if (!chapter)
      return {
        ...empty("not_investigated"),
        harness_id: harness.harness_id,
        topic: request.topic,
        surfaces: harness.surfaces,
        runtimes: harness.runtimes,
        bindings: harness.bindings,
      };
    const section = request.section_id
      ? chapter.sections.find((x) => x.section_id === request.section_id)
      : undefined;
    if (request.section_id && !section) return empty("not_found");
    const selectedSurfaces = request.surface_id
      ? [request.surface_id]
      : harness.surfaces.map((x) => x.surface_id);
    const selectedSections = (section ? [section] : chapter.sections).filter(
      (x) => !request.surface_id || x.surface_ids.includes(request.surface_id),
    );
    const questions = chapter.questions
      .map((question) => ({
        question_id: question.question_id,
        answers: [
          ...question.answers
            .filter(
              (answer) =>
                (!request.surface_id ||
                  answer.surface_ids.includes(request.surface_id)) &&
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
      .filter((q) => q.answers.length);
    const refs = [...new Set(selectedSections.flatMap((x) => x.source_refs))];
    return {
      release_id: this.releaseId,
      status: selectedSections.length
        ? ("ok" as const)
        : ("not_investigated" as const),
      harness_id: harness.harness_id,
      surface_id: request.surface_id ?? null,
      surfaces: harness.surfaces,
      runtimes: harness.runtimes,
      bindings: harness.bindings,
      topic: chapter.topic,
      edition_id: chapter.edition_id,
      title: chapter.title,
      body:
        request.surface_id || section
          ? selectedSections
              .map((x) => sectionText(chapter.body, x.section_id)!)
              .join("\n\n")
          : chapter.body,
      sections: selectedSections.map((x) => ({
        section_id: x.section_id,
        surface_ids: x.surface_ids,
        question_ids: chapter.questions
          .filter((q) =>
            q.answers.some(
              (answer) =>
                answer.section_id === x.section_id &&
                (!request.surface_id ||
                  answer.surface_ids.includes(request.surface_id)),
            ),
          )
          .map((q) => q.question_id),
        source_refs: x.source_refs,
      })),
      questions,
      source_refs: refs,
      source_scope: refs.map((id) => {
        const ref = this.records.source_references.find(
          (x) => x.reference_id === id,
        )!;
        return {
          reference_id: id,
          snapshot_id: ref.snapshot_id,
          official_url: ref.official_url,
        };
      }),
      history: this.records.chapters
        .filter(
          (x) =>
            x.harness_id === harness.harness_id && x.topic === chapter.topic,
        )
        .map((x) => x.edition_id),
      resolution,
    };
  }
  compareTopics(input: unknown) {
    const request = compareSchema.parse(input);
    const fullResults = request.targets.map((target) =>
      this.getTopic({ ...target, topic: request.topic }),
    );
    const present = fullResults.filter(
      (x): x is Extract<typeof x, { questions: unknown }> =>
        "questions" in x &&
        (x.status === "ok" || x.status === "not_investigated"),
    );
    const common =
      present.length === fullResults.length
        ? present[0]!.questions
            .filter((q) =>
              present.every((r) =>
                r.questions.some(
                  (other) => other.question_id === q.question_id,
                ),
              ),
            )
            .map((q) => q.question_id)
        : [];
    const ids = request.question_ids
      ? common.filter((id) => request.question_ids!.includes(id))
      : common;
    const results = fullResults.map((x) =>
      "questions" in x
        ? {
            release_id: x.release_id,
            status: x.status,
            harness_id: x.harness_id,
            surface_id: x.surface_id,
            topic: x.topic,
            edition_id: x.edition_id,
            resolution: x.resolution,
          }
        : x,
    );
    return {
      release_id: this.releaseId,
      topic: request.topic,
      results,
      questions: ids.map((question_id) => ({
        question_id,
        entries: present.map((r) => {
          const q = r.questions.find((x) => x.question_id === question_id)!;
          return {
            harness_id: r.harness_id,
            surface_id: r.surface_id,
            answers: q.answers,
            resolution: r.resolution,
          };
        }),
      })),
    };
  }
  async searchKnowledge(input: unknown) {
    const request = searchSchema.parse(input),
      harness = request.harness ? this.harness(request.harness) : undefined;
    if (harness === "ambiguous")
      return {
        release_id: this.releaseId,
        status: "ambiguous" as const,
        semantic_status: "not_requested" as const,
        items: [],
      };
    if (request.harness && !harness)
      return {
        release_id: this.releaseId,
        status: "not_found" as const,
        semantic_status: "not_requested" as const,
        items: [],
      };
    const needle = request.text?.toLocaleLowerCase() ?? "";
    if (
      harness &&
      request.surface_id &&
      !harness.surfaces.some((x) => x.surface_id === request.surface_id)
    )
      return {
        release_id: this.releaseId,
        status: "not_found" as const,
        semantic_status: "not_requested" as const,
        items: [],
      };
    const scoped = this.searchSections
      .filter(
        (section) =>
          (!harness || section.harness_id === harness.harness_id) &&
          (!request.topic || section.topic === request.topic),
      )
      .filter(
        (section) =>
          !request.surface_id ||
          section.surface_ids.includes(request.surface_id),
      );
    const ranked = new Map<string, { score: number; reason: string }>();
    const key = (section: SearchSection) =>
      `${section.edition_id}|${section.section_id}`;
    const offer = (sectionKey: string, score: number, reason: string) => {
      const old = ranked.get(sectionKey);
      if (!old || score > old.score) ranked.set(sectionKey, { score, reason });
    };
    if (needle) {
      for (const section of scoped) {
        const sectionKey = key(section);
        if (
          section.question_ids.some((id) => id.toLocaleLowerCase() === needle)
        )
          offer(sectionKey, 100, "exact_question_id");
        else if (
          section.exact_terms.some(
            (term) => term.toLocaleLowerCase() === needle,
          )
        )
          offer(sectionKey, 95, "exact_config_term");
        else if (
          section.question_wording.some(
            (wording) => wording.toLocaleLowerCase() === needle,
          )
        )
          offer(sectionKey, 90, "exact_question_wording");
        else if (
          section.aliases.some((alias) => alias.toLocaleLowerCase() === needle)
        )
          offer(sectionKey, 80, "alias");
        else if (
          `${section.title} ${section.body}`
            .toLocaleLowerCase()
            .includes(needle)
        )
          offer(sectionKey, 60, "full_text");
      }
      const tokens = [...new Set(needle.match(/[\p{L}\p{N}_.\/-]+/gu) ?? [])]
        .filter((token) => token.length > 1 && !searchStopwords.has(token))
        .slice(0, 8);
      if (this.searchDb && tokens.length) {
        const expression = tokens.map((token) => `"${token}"`).join(" OR ");
        const hits = this.searchDb
          .prepare(
            "SELECT section_key, bm25(search_fts) AS rank FROM search_fts WHERE search_fts MATCH ? ORDER BY rank LIMIT 200",
          )
          .all(expression) as { section_key: string; rank: number }[];
        for (const hit of hits)
          offer(
            hit.section_key,
            50 + Math.min(9, Math.max(0, -hit.rank)),
            "full_text",
          );
      }
    } else for (const section of scoped) offer(key(section), 0, "filter");
    let semanticStatus: "available" | "semantic_unavailable" | "not_requested" =
      needle ? "semantic_unavailable" : "not_requested";
    if (needle && this.semantic) {
      let queryVector: number[] | undefined;
      try {
        await assertLocalModel(this.semantic.model, this.ollamaEndpoint);
        [queryVector] = await embedLocal(
          this.semantic.model,
          [
            `Instruct: Retrieve a relevant agent harness configuration guide section.\nQuery: ${request.text}`,
          ],
          this.ollamaEndpoint,
        );
      } catch {
        // The local model can disappear without making lexical search unusable.
      }
      if (queryVector) {
        const normalized = normalizeVector(queryVector!);
        const candidates = this.semantic.passages
          .map((passage) => ({
            key: `${passage.edition_id}|${passage.section_id}`,
            similarity: passage.vector.reduce(
              (score, value, i) => score + value * normalized[i]!,
              0,
            ),
          }))
          .sort(
            (a, b) => b.similarity - a.similarity || a.key.localeCompare(b.key),
          );
        const allowed = new Set(scoped.map(key));
        const seen = new Set<string>();
        for (const candidate of candidates) {
          if (
            !allowed.has(candidate.key) ||
            candidate.similarity < 0.25 ||
            seen.has(candidate.key)
          )
            continue;
          offer(candidate.key, 65 + candidate.similarity * 10, "semantic");
          seen.add(candidate.key);
          if (seen.size === 40) break;
        }
        semanticStatus = "available";
      }
    }
    const refs = new Map(
      this.records.source_references.map((ref) => [ref.reference_id, ref]),
    );
    const items = scoped
      .filter((section) => ranked.has(key(section)))
      .sort(
        (a, b) =>
          ranked.get(key(b))!.score - ranked.get(key(a))!.score ||
          key(a).localeCompare(key(b)),
      )
      .map((section) => ({
        harness_id: section.harness_id,
        topic: section.topic,
        edition_id: section.edition_id,
        section_id: section.section_id,
        surface_ids: section.surface_ids,
        question_ids: section.question_ids,
        preview: section.body.slice(0, 240),
        source_refs: section.source_refs,
        source_scope: section.source_refs.map((id) => {
          const ref = refs.get(id)!;
          return {
            reference_id: id,
            snapshot_id: ref.snapshot_id,
            official_url: ref.official_url,
          };
        }),
        match: ranked.get(key(section))!.reason,
      }));
    return {
      release_id: this.releaseId,
      status:
        harness && !scoped.length
          ? ("not_investigated" as const)
          : ("ok" as const),
      semantic_status: semanticStatus,
      ...page(
        items,
        request.limit,
        request.cursor,
        this.releaseId,
        {
          text: needle,
          harness: harness?.harness_id,
          topic: request.topic ?? null,
          surface_id: request.surface_id ?? null,
          semantic: semanticStatus,
        },
        2,
      ),
    };
  }
  getSource(input: unknown) {
    const request = sourceRequestSchema.parse(input),
      ref =
        this.records.source_references.find(
          (x) => x.reference_id === request.reference_id,
        ) ??
        this.records.catalog.references.find(
          (x) => x.reference_id === request.reference_id,
        );
    const product = this.records.catalog.products.find(
      (x) => x.harness_id === ref?.harness_id,
    );
    if (
      request.surface_id &&
      !product?.surfaces.some((x) => x.surface_id === request.surface_id)
    )
      return {
        release_id: this.releaseId,
        status: "not_found" as const,
        surface_id: request.surface_id,
      };
    return {
      release_id: this.releaseId,
      status: ref ? ("ok" as const) : ("not_found" as const),
      surface_id: request.surface_id ?? null,
      ...(ref
        ? {
            source: {
              ...ref,
              excerpt: Array.from(ref.excerpt).slice(0, 2000).join(""),
            },
          }
        : {}),
    };
  }
}
