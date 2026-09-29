import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
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

type Records = ChapterPublishedKnowledge["records"];
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
        order: z.literal(1),
        offset: z.int().nonnegative(),
      })
      .safeParse(decoded);
    if (
      !parsed.success ||
      parsed.data.release !== release ||
      parsed.data.digest !== digest ||
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
            JSON.stringify({ release, digest, order: 1, offset: next }),
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
function sectionBody(
  chapter: ChapterEdition,
  sectionId: string,
): string | undefined {
  const headings = [
    ...chapter.body.matchAll(/^## .+ \{#([a-z][a-z0-9_-]*)\}\s*$/gm),
  ];
  const index = headings.findIndex((x) => x[1] === sectionId);
  return index < 0
    ? undefined
    : chapter.body
        .slice(headings[index]!.index, headings[index + 1]?.index)
        .trim();
}

export class QueryService {
  private constructor(
    readonly releaseId: string,
    private readonly records: Records,
  ) {}

  static async open(options: {
    releasesRoot: string;
    releaseId?: string;
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
    return new QueryService(releaseId, knowledge.records);
  }
  close(): void {}

  private harness(name: string) {
    const found = this.records.harnesses.filter((x) =>
      [x.harness_id, x.name, ...x.aliases].some(
        (alias) => alias.toLocaleLowerCase() === name.toLocaleLowerCase(),
      ),
    );
    return found.length > 1 ? ("ambiguous" as const) : found[0];
  }
  listHarnesses(input: unknown = {}) {
    const request = listSchema.parse(input),
      query = request.query?.toLocaleLowerCase() ?? "";
    const items = this.records.harnesses
      .filter((x) =>
        [x.harness_id, x.name, ...x.aliases].some((alias) =>
          alias.toLocaleLowerCase().includes(query),
        ),
      )
      .map((x) => ({
        ...x,
        topics: this.records.current
          .filter((s) => s.harness_id === x.harness_id)
          .map((s) => s.topic),
      }));
    return {
      release_id: this.releaseId,
      ...page(items, request.limit, request.cursor, this.releaseId, { query }),
    };
  }
  private select(
    harnessId: string,
    topic: string,
    version?: string,
    sectionId?: string,
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
    const empty = (status: "not_found" | "ambiguous") => ({
      release_id: this.releaseId,
      status,
      requested_version: request.version ?? null,
    });
    if (harness === "ambiguous") return empty("ambiguous");
    if (!harness) return empty("not_found");
    const { chapter, resolution } = this.select(
      harness.harness_id,
      request.topic,
      request.version,
      request.section_id,
    );
    if (!chapter) return empty("not_found");
    const section = request.section_id
      ? chapter.sections.find((x) => x.section_id === request.section_id)
      : undefined;
    if (request.section_id && !section) return empty("not_found");
    const questions = section
      ? chapter.questions.filter((x) => x.section_id === section.section_id)
      : chapter.questions;
    const refs = [
      ...new Set(
        section
          ? section.source_refs
          : chapter.sections.flatMap((x) => x.source_refs),
      ),
    ];
    return {
      release_id: this.releaseId,
      status: "ok" as const,
      harness_id: harness.harness_id,
      topic: chapter.topic,
      edition_id: chapter.edition_id,
      title: chapter.title,
      body: section ? sectionBody(chapter, section.section_id)! : chapter.body,
      sections: (section ? [section] : chapter.sections).map((x) => ({
        section_id: x.section_id,
        question_ids: chapter.questions
          .filter((q) => q.section_id === x.section_id)
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
    const present = fullResults.filter((x) => x.status === "ok");
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
      x.status === "ok"
        ? {
            release_id: x.release_id,
            status: x.status,
            harness_id: x.harness_id,
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
            status: q.status,
            section_id: q.section_id,
            source_refs: q.source_refs,
            resolution: r.resolution,
          };
        }),
      })),
    };
  }
  searchKnowledge(input: unknown) {
    const request = searchSchema.parse(input),
      harness = request.harness ? this.harness(request.harness) : undefined;
    if (harness === "ambiguous")
      return {
        release_id: this.releaseId,
        status: "ambiguous" as const,
        items: [],
      };
    if (request.harness && !harness)
      return {
        release_id: this.releaseId,
        status: "not_found" as const,
        items: [],
      };
    const needle = request.text?.toLocaleLowerCase() ?? "";
    const items = this.records.current.flatMap((selection) => {
      if (
        (harness && selection.harness_id !== harness.harness_id) ||
        (request.topic && selection.topic !== request.topic)
      )
        return [];
      const chapter = this.records.chapters.find(
        (x) => x.edition_id === selection.edition_id,
      )!;
      return chapter.sections.flatMap((section) => {
        const body = sectionBody(chapter, section.section_id)!;
        const questionIds = chapter.questions
          .filter((q) => q.section_id === section.section_id)
          .map((q) => q.question_id);
        if (
          needle &&
          !`${chapter.title} ${section.section_id} ${questionIds.join(" ")} ${body}`
            .toLocaleLowerCase()
            .includes(needle)
        )
          return [];
        return [
          {
            harness_id: chapter.harness_id,
            topic: chapter.topic,
            edition_id: chapter.edition_id,
            section_id: section.section_id,
            question_ids: questionIds,
            preview: body.slice(0, 240),
            source_refs: section.source_refs,
            source_scope: section.source_refs.map((id) => {
              const ref = this.records.source_references.find(
                (x) => x.reference_id === id,
              )!;
              return {
                reference_id: id,
                snapshot_id: ref.snapshot_id,
                official_url: ref.official_url,
              };
            }),
            match: needle ? ("text" as const) : ("filter" as const),
          },
        ];
      });
    });
    return {
      release_id: this.releaseId,
      status: "ok" as const,
      ...page(items, request.limit, request.cursor, this.releaseId, {
        text: needle,
        harness: harness?.harness_id,
        topic: request.topic ?? null,
      }),
    };
  }
  getSource(input: unknown) {
    const request = sourceRequestSchema.parse(input),
      ref = this.records.source_references.find(
        (x) => x.reference_id === request.reference_id,
      );
    return {
      release_id: this.releaseId,
      status: ref ? ("ok" as const) : ("not_found" as const),
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
