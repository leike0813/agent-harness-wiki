import type { Dirent } from "node:fs";
import { readFile, readdir, lstat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as z from "zod";
import YAML from "yaml";
import {
  chapterEditionSchema,
  chapterSelectionSchema,
  softwareMappingSchema,
  sourceReferenceSchema,
  type ChapterDataset,
} from "../domain/chapter.js";
import { type Topic } from "../domain/schema.js";
import { parseQuestionCatalog } from "../domain/question-catalog.js";
import { loadAndValidateDataset, type Diagnostic } from "./dataset.js";

const questionsFile = fileURLToPath(
  new URL("../../docs/topic-questions.md", import.meta.url),
);

export type ChapterValidationResult =
  | { ok: true; dataset: ChapterDataset; diagnostics: Diagnostic[] }
  | { ok: false; diagnostics: Diagnostic[] };

// Per-record and whole-dataset read budgets. The dataset budget covers every
// chapter, source reference, mapping, the current-selection file and the
// catalog, so it has to grow as topics and products are added: eight topics
// across all registered products already reach ~18 MiB, which the previous
// 16 MiB budget rejected as INPUT_TOO_LARGE.
const MAX_RECORD_BYTES = 1024 * 1024;
const MAX_INPUT_BYTES = 32 * 1024 * 1024;

export async function loadAndValidateChapters(input: {
  root: string;
  profile: "fixture" | "production";
}): Promise<ChapterValidationResult> {
  const base = await loadAndValidateDataset({ ...input, chapterCatalog: true });
  const diagnostics = [...base.diagnostics];
  if (!base.ok) return { ok: false, diagnostics };
  const catalog = base.catalog!;
  const dataset: ChapterDataset = {
    catalog,
    harnesses: base.dataset.harnesses,
    sources: base.dataset.sources,
    artifacts: base.dataset.artifacts,
    snapshots: base.dataset.snapshots,
    source_references: [],
    chapters: [],
    mappings: [],
    current: [],
  };
  const files = new Map<string, string>();
  const fail = (
    code: string,
    category: Diagnostic["category"],
    file: string,
    field: string,
    reason: string,
    hint: string,
    record_id?: string,
  ): void => {
    diagnostics.push({
      code,
      severity: "error",
      category,
      file,
      path: `/${field}`,
      reason,
      hint,
      ...(record_id ? { record_id } : {}),
    });
  };
  const seen = new Set([
    ...catalog.references.map((x) => x.reference_id),
    ...dataset.harnesses.map((x) => x.harness_id),
    ...dataset.sources.map((x) => x.source_id),
    ...dataset.artifacts.map((x) => x.artifact_id),
    ...dataset.snapshots.map((x) => x.snapshot_id),
  ]);
  const selectionFile = "registry/chapter-current.yaml";
  let totalBytes = 0;
  async function records(dir: string, extension: RegExp): Promise<string[]> {
    let entries;
    try {
      if (!(await lstat(path.join(input.root, dir))).isDirectory()) {
        fail(
          "INVALID_DATASET_ENTRY",
          "schema",
          dir,
          "",
          "Record directory is not a regular directory.",
          "Replace it with a directory.",
        );
        return [];
      }
      entries = await readdir(path.join(input.root, dir), {
        withFileTypes: true,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
    const result: string[] = [];
    for (const entry of entries) {
      const relative = path.posix.join(dir, entry.name);
      if (!entry.isFile() || !extension.test(entry.name))
        fail(
          "INVALID_DATASET_ENTRY",
          "schema",
          relative,
          "",
          "Unexpected chapter record entry.",
          "Use a regular YAML or Markdown file.",
        );
      else result.push(relative);
    }
    return result.sort();
  }
  const read = async <T>(
    file: string,
    schema: z.ZodType<T>,
    markdown: boolean,
    idOf: (value: T) => string,
    add: (value: T) => void,
  ): Promise<void> => {
    const absolute = path.join(input.root, file);
    const stat = await lstat(absolute);
    if (!stat.isFile()) {
      fail(
        "INVALID_DATASET_ENTRY",
        "schema",
        file,
        "",
        "Record is not a regular file.",
        "Use a regular file, not a symlink.",
      );
      return;
    }
    if (
      stat.size > MAX_RECORD_BYTES ||
      (totalBytes += stat.size) > MAX_INPUT_BYTES
    ) {
      fail(
        "INPUT_TOO_LARGE",
        "schema",
        file,
        "",
        `Record exceeds ${MAX_RECORD_BYTES / 1024 / 1024} MiB, or the chapter dataset exceeds its input budget.`,
        "Split the record.",
      );
      return;
    }
    const content = await readFile(absolute, "utf8");
    const match = markdown
      ? /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/.exec(content)
      : undefined;
    if (markdown && !match) {
      fail(
        "YAML_INVALID",
        "schema",
        file,
        "",
        "Chapter needs frontmatter and body.",
        "Add YAML frontmatter.",
      );
      return;
    }
    let raw: unknown;
    try {
      const doc = YAML.parseDocument(match?.[1] ?? content, {
        uniqueKeys: true,
        customTags: [],
      });
      if (doc.errors.length || doc.warnings.length)
        throw new Error(
          [...doc.errors, ...doc.warnings].map((e) => e.message).join("; "),
        );
      raw = doc.toJS({ maxAliasCount: 0 });
      if (markdown && raw && typeof raw === "object")
        raw = { ...raw, body: match![2]!.trim() };
    } catch (error) {
      fail(
        "YAML_INVALID",
        "schema",
        file,
        "",
        String(error),
        "Use plain YAML with unique keys.",
      );
      return;
    }
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues)
        fail(
          "SCHEMA_INVALID",
          "schema",
          file,
          issue.path.join("/"),
          issue.message,
          "Match the exported schema.",
        );
      return;
    }
    const item = parsed.data;
    const id = idOf(item);
    if (seen.has(id))
      fail(
        "DUPLICATE_ID",
        "relationship",
        file,
        "",
        "Record ID is already used.",
        "Use a unique ID.",
        id,
      );
    seen.add(id);
    files.set(id, file);
    if (
      item &&
      typeof item === "object" &&
      "record_kind" in item &&
      item.record_kind !== input.profile
    )
      fail(
        "PROFILE_MISMATCH",
        "publishability",
        file,
        "record_kind",
        "Record kind differs from profile.",
        "Keep fixture records separate.",
        id,
      );
    add(item);
  };
  const harnessIds = new Set(dataset.harnesses.map((x) => x.harness_id));
  let knowledgeDirs: Dirent[];
  try {
    knowledgeDirs = await readdir(path.join(input.root, "knowledge"), {
      withFileTypes: true,
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    knowledgeDirs = [];
    fail(
      "INVALID_DATASET_ENTRY",
      "schema",
      "knowledge",
      "",
      "Knowledge directory is missing.",
      "Add product chapter directories.",
    );
  }
  for (const entry of knowledgeDirs)
    if (!entry.isDirectory() || !harnessIds.has(entry.name))
      fail(
        "INVALID_DATASET_ENTRY",
        "schema",
        `knowledge/${entry.name}`,
        "",
        "Knowledge directory has no matching harness.",
        "Use a registered harness directory.",
      );
  for (const harness of dataset.harnesses) {
    const root = `knowledge/${harness.harness_id}`;
    for (const file of await records(`${root}/references`, /\.ya?ml$/i))
      await read(
        file,
        sourceReferenceSchema,
        false,
        (x) => x.reference_id,
        (x) => dataset.source_references.push(x),
      );
    for (const file of await records(`${root}/chapters`, /\.md$/i))
      await read(
        file,
        chapterEditionSchema,
        true,
        (x) => x.edition_id,
        (x) => dataset.chapters.push(x),
      );
    for (const file of await records(`${root}/mappings`, /\.ya?ml$/i))
      await read(
        file,
        softwareMappingSchema,
        false,
        (x) => x.mapping_id,
        (x) => dataset.mappings.push(x),
      );
  }
  try {
    await read(
      selectionFile,
      chapterSelectionSchema,
      false,
      () => "chapter-current",
      (x) => dataset.current.push(...x.selections),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    fail(
      "CURRENT_MISSING",
      "publishability",
      selectionFile,
      "",
      "Current selection file is missing.",
      "Add current selections for published chapters.",
    );
  }
  const questionsText = await readFile(questionsFile, "utf8");
  const expected = new Map<Topic, Set<string>>(
    [...parseQuestionCatalog(questionsText)].map(([topic, questions]) => [
      topic,
      new Set(questions.keys()),
    ]),
  );
  const sources = new Map(dataset.sources.map((x) => [x.source_id, x]));
  const snapshots = new Map(dataset.snapshots.map((x) => [x.snapshot_id, x]));
  const refs = new Map(
    dataset.source_references.map((x) => [x.reference_id, x]),
  );
  const chapters = new Map(dataset.chapters.map((x) => [x.edition_id, x]));
  const current = new Map<string, string>();
  for (const item of dataset.current) {
    const key = `${item.harness_id}|${item.topic}`;
    if (current.has(key))
      fail(
        "CURRENT_DUPLICATE",
        "publishability",
        selectionFile,
        "selections",
        "More than one current edition.",
        "Select one current edition.",
        item.edition_id,
      );
    current.set(key, item.edition_id);
  }
  for (const ref of dataset.source_references) {
    const file = files.get(ref.reference_id) ?? ref.reference_id;
    const snap = snapshots.get(ref.snapshot_id);
    const source = snap && sources.get(snap.source_id);
    if (
      !snap ||
      !source ||
      source.harness_id !== ref.harness_id ||
      ("target" in snap ? snap.target.harness_id : snap.harness_id) !==
        ref.harness_id
    )
      fail(
        "SOURCE_REFERENCE_MISMATCH",
        "relationship",
        file,
        "snapshot_id",
        "Reference needs a fixed snapshot of the same product.",
        "Cite a matching snapshot.",
        ref.reference_id,
      );
    if (
      ref.locator.kind === "file_lines" &&
      ref.locator.end < ref.locator.start
    )
      fail(
        "LOCATOR_INVALID",
        "semantic",
        file,
        "locator/end",
        "Line range is reversed.",
        "Set end at or after start.",
        ref.reference_id,
      );
    if (
      "file" in ref.locator &&
      (ref.locator.file.startsWith("/") ||
        ref.locator.file
          .split("/")
          .some((x) => !x || x === "." || x === "..") ||
        ref.locator.file.includes("\\"))
    )
      fail(
        "LOCATOR_INVALID",
        "semantic",
        file,
        "locator/file",
        "Unsafe source path.",
        "Use a relative source path.",
        ref.reference_id,
      );
  }
  for (const chapter of dataset.chapters) {
    const file = files.get(chapter.edition_id) ?? chapter.edition_id;
    if (
      !dataset.harnesses.some((x) => x.harness_id === chapter.harness_id) ||
      !file.startsWith(`knowledge/${chapter.harness_id}/chapters/`) ||
      path.basename(file) !== `${chapter.edition_id}.md`
    )
      fail(
        "CHAPTER_IDENTITY",
        "relationship",
        file,
        "edition_id",
        "Chapter path or product differs from its identity.",
        "Use the matching product directory and edition filename.",
        chapter.edition_id,
      );
    if (/<\/?[a-z][^>]*>|javascript:|data:/i.test(chapter.body))
      fail(
        "CHAPTER_UNSAFE_MARKUP",
        "publishability",
        file,
        "body",
        "Active or raw HTML markup.",
        "Use inert Markdown.",
        chapter.edition_id,
      );
    const sectionIds = new Set<string>();
    const sectionBodies = new Map<string, string>();
    const headings = [
      ...chapter.body.matchAll(/^## .+ \{#([a-z][a-z0-9_-]*)\}\s*$/gm),
    ];
    for (let i = 0; i < headings.length; i++)
      sectionBodies.set(
        headings[i]![1]!,
        chapter.body.slice(headings[i]!.index, headings[i + 1]?.index),
      );
    for (const section of chapter.sections) {
      if (
        Buffer.byteLength(sectionBodies.get(section.section_id) ?? "", "utf8") >
        32 * 1024
      )
        fail(
          "SECTION_TOO_LARGE",
          "publishability",
          file,
          "body",
          "Section exceeds the bounded reader size.",
          "Split this section into smaller stable sections.",
          chapter.edition_id,
        );
      if (
        Buffer.byteLength(
          JSON.stringify({
            section,
            questions: chapter.questions.filter((q) =>
              q.answers.some((a) => a.section_id === section.section_id),
            ),
          }),
          "utf8",
        ) >
        8 * 1024
      )
        fail(
          "SECTION_INDEX_TOO_LARGE",
          "publishability",
          file,
          "sections",
          "Section index exceeds the bounded reader size.",
          "Reduce section references or questions.",
          chapter.edition_id,
        );
      if (
        sectionIds.has(section.section_id) ||
        !sectionBodies.has(section.section_id)
      )
        fail(
          "SECTION_INVALID",
          "relationship",
          file,
          "sections",
          "Section ID is duplicated or absent from the body.",
          "Use one heading with the matching {#id}.",
          chapter.edition_id,
        );
      sectionIds.add(section.section_id);
      const surfaceIds =
        catalog.products
          .find((x) => x.harness_id === chapter.harness_id)
          ?.surfaces.map((x) => x.surface_id) ?? [];
      if (
        new Set(section.surface_ids).size !== section.surface_ids.length ||
        section.surface_ids.some((id) => !surfaceIds.includes(id))
      )
        fail(
          "SECTION_SURFACE_INVALID",
          "relationship",
          file,
          "sections/surface_ids",
          "Section must name unique known surfaces.",
          "Use catalog surface IDs.",
          chapter.edition_id,
        );
      for (const refId of section.source_refs)
        if (refs.get(refId)?.harness_id !== chapter.harness_id)
          fail(
            "SOURCE_REFERENCE_MISMATCH",
            "relationship",
            file,
            "sections/source_refs",
            "Section source is missing or from another product.",
            "Cite a matching source reference.",
            chapter.edition_id,
          );
    }
    for (const id of sectionBodies.keys())
      if (!sectionIds.has(id))
        fail(
          "SECTION_INVALID",
          "relationship",
          file,
          "body",
          "Body heading has no section metadata.",
          "Add the section to frontmatter.",
          chapter.edition_id,
        );
    if (
      Buffer.byteLength(
        JSON.stringify({
          sections: chapter.sections,
          questions: chapter.questions,
        }),
        "utf8",
      ) >
      32 * 1024
    )
      fail(
        "CHAPTER_INDEX_TOO_LARGE",
        "publishability",
        file,
        "sections",
        "Chapter index exceeds the bounded reader size.",
        "Split the chapter into fewer sections.",
        chapter.edition_id,
      );
    const fixed = expected.get(chapter.topic) ?? new Set<string>();
    const seenQuestions = new Set<string>();
    for (const q of chapter.questions) {
      if (seenQuestions.has(q.question_id) || !fixed.has(q.question_id))
        fail(
          "QUESTION_INVALID",
          "relationship",
          file,
          "questions",
          "Question is duplicated or outside this topic.",
          "Use each fixed question exactly once.",
          chapter.edition_id,
        );
      seenQuestions.add(q.question_id);
      const answeredSurfaces = new Set<string>();
      for (const answer of q.answers) {
        for (const surface of answer.surface_ids) {
          if (answeredSurfaces.has(surface))
            fail(
              "ANSWER_SURFACE_OVERLAP",
              "relationship",
              file,
              "questions/answers",
              "A question has overlapping answers for one surface.",
              "Use one answer per surface; represent conflicts explicitly.",
              chapter.edition_id,
            );
          answeredSurfaces.add(surface);
        }
        const section = chapter.sections.find(
          (x) => x.section_id === answer.section_id,
        );
        if (answer.surface_ids.some((id) => !section?.surface_ids.includes(id)))
          fail(
            "ANSWER_SURFACE_INVALID",
            "relationship",
            file,
            "questions/answers/surface_ids",
            "Answer surface lies outside its section.",
            "Use a section covering the answer surfaces.",
            chapter.edition_id,
          );
        const body = sectionBodies.get(answer.section_id) ?? "";
        const explanation = body
          .replace(/^## .+ \{#[a-z][a-z0-9_-]*\}\s*/, "")
          .replace(/\[@[a-z][a-z0-9_-]*\]/g, "")
          .trim();
        if (!section || !explanation)
          fail(
            "QUESTION_SECTION_MISMATCH",
            "publishability",
            file,
            `questions/${q.question_id}`,
            "Located section has no explanation.",
            "Add mechanism prose to the located section.",
            chapter.edition_id,
          );
        if (
          (answer.status === "answered" || answer.status === "partial") &&
          answer.source_refs.length === 0
        )
          fail(
            "QUESTION_SOURCE_MISSING",
            "publishability",
            file,
            `questions/${q.question_id}/source_refs`,
            "Answered question has no citation.",
            "Cite a fixed source.",
            chapter.edition_id,
          );
        for (const refId of answer.source_refs)
          if (
            refs.get(refId)?.harness_id !== chapter.harness_id ||
            !section?.source_refs.includes(refId) ||
            !body.includes(`[@${refId}]`)
          )
            fail(
              "QUESTION_SOURCE_MISSING",
              "publishability",
              file,
              `questions/${q.question_id}/source_refs`,
              "Question citation is missing, cross-product, or absent from its section.",
              "Add the reference to the section and an inline marker.",
              chapter.edition_id,
            );
      }
    }
    for (const id of fixed)
      if (!seenQuestions.has(id))
        fail(
          "QUESTION_MISSING",
          "publishability",
          file,
          "questions",
          `Missing fixed question ${id}.`,
          "Index every fixed question.",
          chapter.edition_id,
        );
  }
  for (const harness of dataset.harnesses) {
    const topics = new Set(
      dataset.chapters
        .filter((chapter) => chapter.harness_id === harness.harness_id)
        .map((chapter) => chapter.topic),
    );
    if (topics.size === 0)
      fail(
        "CURRENT_MISSING",
        "publishability",
        selectionFile,
        "selections",
        `No current knowledge for ${harness.harness_id}.`,
        "Publish at least one current chapter for a registered product.",
      );
    for (const topic of topics)
      if (!current.has(`${harness.harness_id}|${topic}`))
        fail(
          "CURRENT_MISSING",
          "publishability",
          selectionFile,
          "selections",
          `No current ${topic} edition for ${harness.harness_id}.`,
          "Select one current edition for every authored topic.",
        );
  }
  for (const item of dataset.current)
    if (
      chapters.get(item.edition_id)?.harness_id !== item.harness_id ||
      chapters.get(item.edition_id)?.topic !== item.topic
    )
      fail(
        "CURRENT_MISMATCH",
        "relationship",
        selectionFile,
        "selections",
        "Current selection does not match an edition.",
        "Select an edition of the same product and topic.",
        item.edition_id,
      );
  const mapped = new Set<string>();
  for (const mapping of dataset.mappings) {
    const file = files.get(mapping.mapping_id) ?? mapping.mapping_id;
    const chapter = chapters.get(mapping.edition_id);
    const packageSnapshot = snapshots.get(mapping.package_snapshot_id);
    if (
      !chapter ||
      chapter.harness_id !== mapping.harness_id ||
      !packageSnapshot ||
      !("kind" in packageSnapshot) ||
      packageSnapshot.kind !== "npm_release" ||
      packageSnapshot.target.harness_id !== mapping.harness_id ||
      packageSnapshot.version !== mapping.software_version ||
      !catalog.products
        .find((x) => x.harness_id === mapping.harness_id)
        ?.surfaces.some(
          (x) =>
            x.surface_id === mapping.surface_id &&
            x.kind === packageSnapshot.target.surface,
        )
    )
      fail(
        "MAPPING_IDENTITY",
        "relationship",
        file,
        "package_snapshot_id",
        "Mapping lacks a matching exact npm release snapshot and chapter.",
        "Use the exact package snapshot and edition.",
        mapping.mapping_id,
      );
    const ids = new Set<string>();
    for (const section of mapping.sections) {
      const mappingKey = `${mapping.edition_id}|${mapping.surface_id}|${mapping.software_version}|${section.section_id}`;
      if (mapped.has(mappingKey))
        fail(
          "MAPPING_DUPLICATE",
          "relationship",
          file,
          "sections",
          "Section already mapped for this exact version.",
          "Keep one mapping per edition, version and section.",
          mapping.mapping_id,
        );
      mapped.add(mappingKey);
      if (
        ids.has(section.section_id) ||
        !chapter?.sections.some(
          (x) =>
            x.section_id === section.section_id &&
            x.surface_ids.includes(mapping.surface_id),
        )
      )
        fail(
          "MAPPING_SECTION_INVALID",
          "relationship",
          file,
          "sections",
          "Mapped section is duplicated or missing.",
          "Use a section in the chapter edition.",
          mapping.mapping_id,
        );
      ids.add(section.section_id);
      const ref = refs.get(section.evidence_ref);
      if (
        !ref ||
        ref.harness_id !== mapping.harness_id ||
        ref.snapshot_id !== mapping.package_snapshot_id
      )
        fail(
          "MAPPING_EVIDENCE_INVALID",
          "publishability",
          file,
          "sections/evidence_ref",
          "Mapping evidence is not from the exact package snapshot.",
          "Cite a fixed reference to that package snapshot.",
          mapping.mapping_id,
        );
    }
    if (
      mapping.scope === "chapter" &&
      chapter &&
      ids.size !==
        chapter.sections.filter((x) =>
          x.surface_ids.includes(mapping.surface_id),
        ).length
    )
      fail(
        "MAPPING_INCOMPLETE",
        "publishability",
        file,
        "sections",
        "Whole chapter mapping omits a section.",
        "Map every section or use section scope.",
        mapping.mapping_id,
      );
    if (mapping.scope === "section" && ids.size !== 1)
      fail(
        "MAPPING_SECTION_INVALID",
        "semantic",
        file,
        "sections",
        "Section mapping must name one section.",
        "Split it into separate mappings.",
        mapping.mapping_id,
      );
  }
  return diagnostics.some((x) => x.severity === "error")
    ? { ok: false, diagnostics }
    : { ok: true, dataset, diagnostics };
}
