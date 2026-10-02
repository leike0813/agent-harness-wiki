import * as z from "zod";
import { catalogProductSchema, catalogReferenceSchema } from "./catalog.js";
import {
  chapterEditionSchema,
  softwareMappingSchema,
  sourceReferenceSchema,
} from "./chapter.js";
import { topicSchema } from "./schema.js";

export const onlineIdSchema = z.string().regex(/^[a-z][a-z0-9_-]*$/);
export const onlineReleaseIdSchema = z.string().regex(/^web-v1-[a-f0-9]{40}$/);
export const resourcePathSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_./-]+\.json$/)
  .refine(
    (value) =>
      !value.startsWith("/") &&
      value.split("/").every((part) => part && part !== "." && part !== ".."),
  );
const identity = {
  protocol_version: z.literal(1),
  release_id: onlineReleaseIdSchema,
};
const profile = z.enum(["fixture", "production"]);
export const onlinePointerSchema = z.discriminatedUnion("state", [
  z.strictObject({
    ...identity,
    state: z.literal("active"),
    manifest: resourcePathSchema,
  }),
  z.strictObject({
    protocol_version: z.literal(1),
    state: z.literal("retired"),
    retired_at: z.iso.datetime(),
    upgrade: z.string().min(1),
  }),
]);
export const onlineManifestSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("manifest"),
  knowledge_published_at: z.iso.datetime(),
  profile,
  history: z.literal("current_and_previous"),
  catalog: resourcePathSchema,
  topics: z.literal("topics/"),
  sources: resourcePathSchema,
  search: resourcePathSchema,
});
const coverageSchema = z.strictObject({
  surface_id: onlineIdSchema,
  topic: topicSchema,
  statuses: z.array(
    z.enum([
      "answered",
      "partial",
      "unknown",
      "not_applicable",
      "conflict",
      "not_investigated",
    ]),
  ),
});
export const onlineCatalogSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("catalog"),
  products: z.array(
    catalogProductSchema.extend({
      registration: z.enum(["registered", "candidate"]),
      topics: z.array(topicSchema),
      coverage: z.array(coverageSchema),
    }),
  ),
});
const editionIdentity = {
  edition_id: onlineIdSchema,
  sections: z.array(
    z.strictObject({
      section_id: onlineIdSchema,
      surface_ids: z.array(onlineIdSchema).min(1),
    }),
  ),
  mappings: z.array(softwareMappingSchema),
};
export const onlineTopicSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("topic"),
  harness_id: onlineIdSchema,
  topic: topicSchema,
  current: onlineIdSchema,
  editions: z.array(
    z.discriminatedUnion("availability", [
      z.strictObject({
        ...editionIdentity,
        availability: z.literal("available"),
        resource: resourcePathSchema,
      }),
      z.strictObject({
        ...editionIdentity,
        availability: z.literal("trimmed"),
      }),
    ]),
  ),
});
export const onlineSourceScopeSchema = z.strictObject({
  reference_id: onlineIdSchema,
  snapshot_id: z.string().min(1),
  official_url: z.url(),
});
export const onlineChapterSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("chapter"),
  chapter: chapterEditionSchema,
  source_scope: z.array(onlineSourceScopeSchema),
});
export const onlineSourceSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("source"),
  reference: z.discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("chapter"),
      record: sourceReferenceSchema,
    }),
    z.strictObject({
      kind: z.literal("catalog"),
      record: catalogReferenceSchema.omit({ snapshot: true }).extend({
        snapshot: catalogReferenceSchema.shape.snapshot.omit({
          archive_path: true,
        }),
      }),
    }),
  ]),
});
export const onlineLocatorSchema = z.strictObject({
  harness_id: onlineIdSchema,
  topic: topicSchema,
  edition_id: onlineIdSchema,
  section_id: onlineIdSchema,
  surface_ids: z.array(onlineIdSchema).min(1),
});
export const matchKindSchema = z.enum([
  "exact_question_id",
  "exact_config_term",
  "exact_question_wording",
  "alias",
  "full_text",
  "filter",
]);
export const onlinePostingSchema = z.strictObject({
  term: z.string().min(1),
  locator: onlineLocatorSchema,
  match: matchKindSchema,
  fields: z.array(z.enum(["title", "wording", "body"])),
});
export const onlineNavigationSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("navigation"),
  purpose: z.enum(["exact", "lexical", "scope", "sources"]),
  ranges: z.array(
    z.strictObject({
      first: z.string(),
      last: z.string(),
      resource: resourcePathSchema,
      harness_id: onlineIdSchema.optional(),
      topic: topicSchema.optional(),
    }),
  ),
});
export const onlinePostingsSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("postings"),
  purpose: z.enum(["exact", "lexical"]),
  entries: z.array(onlinePostingSchema),
});
export const onlineSectionsSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("sections"),
  entries: z.array(onlineLocatorSchema),
});
export const onlineSourceDirectorySchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("source_directory"),
  entries: z.array(
    z.strictObject({
      reference_id: onlineIdSchema,
      harness_id: onlineIdSchema,
    }),
  ),
});
export const lexicalRules = {
  format: 1,
  segmentation: 1,
  normalization: 1,
  ranking: 1,
  weights: { title: 3, wording: 2, body: 1 },
  block_bytes: 64 * 1024,
  index_bytes: 2 * 1024 * 1024,
  candidates: 20_000,
  chapter_bytes: 8 * 1024 * 1024,
} as const;
export const onlineSearchManifestSchema = z.strictObject({
  ...identity,
  resource_kind: z.literal("search_manifest"),
  capability: z.literal("lexical_only"),
  rules: z.strictObject({
    format: z.literal(1),
    segmentation: z.literal(1),
    normalization: z.literal(1),
    ranking: z.literal(1),
    weights: z.strictObject({
      title: z.literal(3),
      wording: z.literal(2),
      body: z.literal(1),
    }),
    block_bytes: z.literal(65536),
    index_bytes: z.literal(2097152),
    candidates: z.literal(20000),
    chapter_bytes: z.literal(8388608),
  }),
  environment: z.strictObject({ node: z.string(), icu: z.string() }),
  exact: resourcePathSchema,
  lexical: resourcePathSchema,
  scopes: z.literal("search/scopes/"),
});
export const onlineResourceSchema = z.discriminatedUnion("resource_kind", [
  onlineManifestSchema,
  onlineCatalogSchema,
  onlineTopicSchema,
  onlineChapterSchema,
  onlineSourceSchema,
  onlineNavigationSchema,
  onlinePostingsSchema,
  onlineSectionsSchema,
  onlineSourceDirectorySchema,
  onlineSearchManifestSchema,
]);
export function parseOnlineResource(
  input: unknown,
  releaseId: string,
): OnlineResource {
  const resource = onlineResourceSchema.parse(input);
  if (resource.release_id !== releaseId)
    throw new Error("Online resource release identity differs.");
  return resource;
}
export const onlineRecordSchemas = {
  online_pointer: onlinePointerSchema,
  online_resource: onlineResourceSchema,
};
export type OnlineResource = z.infer<typeof onlineResourceSchema>;
export type OnlineManifest = z.infer<typeof onlineManifestSchema>;
export type OnlineTopic = z.infer<typeof onlineTopicSchema>;
export type OnlineChapter = z.infer<typeof onlineChapterSchema>;
export type OnlineLocator = z.infer<typeof onlineLocatorSchema>;
export type OnlinePosting = z.infer<typeof onlinePostingSchema>;
export type OnlineNavigation = z.infer<typeof onlineNavigationSchema>;
export type OnlineSearchManifest = z.infer<typeof onlineSearchManifestSchema>;
