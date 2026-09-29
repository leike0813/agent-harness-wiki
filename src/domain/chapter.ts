import * as z from "zod";
import {
  artifactSchema,
  harnessSchema,
  snapshotSchema,
  sourceSchema,
  topicSchema,
} from "./schema.js";

const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const sha256 = z.string().regex(/^[a-f0-9]{64}$/);
const record = {
  schema_version: z.literal(2),
  record_kind: z.enum(["fixture", "production"]),
};

export const chapterEditionSchema = z.strictObject({
  ...record,
  edition_id: id,
  harness_id: id,
  topic: topicSchema,
  title: z.string().min(1).max(120),
  sections: z
    .array(
      z.strictObject({
        section_id: id,
        source_refs: z.array(id),
      }),
    )
    .min(1),
  questions: z
    .array(
      z.strictObject({
        question_id: z.string().regex(/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/),
        section_id: id,
        status: z.enum([
          "answered",
          "partial",
          "unknown",
          "not_applicable",
          "conflict",
        ]),
        source_refs: z.array(id),
      }),
    )
    .min(1),
  body: z.string().min(1).max(100_000),
});

export const sourceReferenceSchema = z.strictObject({
  ...record,
  reference_id: id,
  harness_id: id,
  snapshot_id: id,
  locator: z.discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("file_lines"),
      file: z.string().min(1),
      start: z.int().positive(),
      end: z.int().positive(),
    }),
    z.strictObject({
      kind: z.literal("symbol"),
      file: z.string().min(1),
      symbol: z.string().min(1),
    }),
    z.strictObject({
      kind: z.literal("document_section"),
      heading: z.string().min(1),
    }),
  ]),
  official_url: z.url().refine((value) => value.startsWith("https://")),
  excerpt: z.string().min(1).max(800),
});

export const softwareMappingSchema = z.strictObject({
  ...record,
  mapping_id: id,
  edition_id: id,
  harness_id: id,
  software_version: z.string().min(1),
  package_snapshot_id: id,
  scope: z.enum(["section", "chapter"]),
  sections: z
    .array(z.strictObject({ section_id: id, evidence_ref: id }))
    .min(1),
});

export const chapterSelectionSchema = z.strictObject({
  ...record,
  selections: z.array(
    z.strictObject({
      harness_id: id,
      topic: topicSchema,
      edition_id: id,
    }),
  ),
});

export const chapterReleaseManifestSchema = z.strictObject({
  schema_version: z.literal(2),
  builder_version: z.literal("4"),
  release_id: id,
  profile: z.enum(["fixture", "production"]),
  knowledge_published_at: z.iso.datetime(),
  input_sha256: sha256,
  current: z.array(
    z.strictObject({ harness_id: id, topic: topicSchema, edition_id: id }),
  ),
  history: z.array(id),
  artifacts: z.record(z.string(), sha256),
});

export const chapterPublishedKnowledgeSchema = z.strictObject({
  schema_version: z.literal(2),
  release_id: id,
  profile: z.enum(["fixture", "production"]),
  knowledge_published_at: z.iso.datetime(),
  records: z.strictObject({
    harnesses: z.array(harnessSchema),
    sources: z.array(sourceSchema),
    artifacts: z.array(artifactSchema),
    snapshots: z.array(snapshotSchema),
    source_references: z.array(sourceReferenceSchema),
    chapters: z.array(chapterEditionSchema),
    mappings: z.array(softwareMappingSchema),
    current: z.array(
      z.strictObject({ harness_id: id, topic: topicSchema, edition_id: id }),
    ),
  }),
});

export const chapterRecordSchemas = {
  chapter_edition: chapterEditionSchema,
  source_reference: sourceReferenceSchema,
  software_mapping: softwareMappingSchema,
  chapter_selection: chapterSelectionSchema,
  chapter_release_manifest: chapterReleaseManifestSchema,
  chapter_published_knowledge: chapterPublishedKnowledgeSchema,
} as const;

export type ChapterEdition = z.infer<typeof chapterEditionSchema>;
export type SourceReference = z.infer<typeof sourceReferenceSchema>;
export type SoftwareMapping = z.infer<typeof softwareMappingSchema>;
export type ChapterPublishedKnowledge = z.infer<
  typeof chapterPublishedKnowledgeSchema
>;
export type ChapterDataset = ChapterPublishedKnowledge["records"];
