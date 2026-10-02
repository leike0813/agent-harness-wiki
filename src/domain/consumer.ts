/**
 * Strict public result contract for the online consumer CLI and MCP entry
 * points. These schemas describe the online service's five query results, the
 * shared publication metadata and the structured technical errors; they are
 * deliberately separate from the maintainer CLI/MCP domain DTOs.
 */
import * as z from "zod";
import { catalogProductSchema, catalogReferenceSchema } from "./catalog.js";
import { sourceReferenceSchema } from "./chapter.js";
import { onlineCatalogSchema, onlineReleaseIdSchema } from "./online.js";
import { topicSchema } from "./schema.js";

export const consumerErrorCodeSchema = z.enum([
  "offline_cache_miss",
  "invalid_cached_data",
  "network_error",
  "request_timeout",
  "operation_timeout",
  "rate_limited",
  "http_error",
  "release_resource_missing",
  "invalid_release_data",
  "unsupported_protocol",
  "protocol_retired",
  "query_too_broad",
  "invalid_cursor",
  "invalid_input",
  "operation_cancelled",
]);
export type ConsumerErrorCode = z.infer<typeof consumerErrorCodeSchema>;
export const consumerErrorSchema = z.strictObject({
  status: z.literal("error"),
  release_id: onlineReleaseIdSchema.optional(),
  error: z.strictObject({
    code: consumerErrorCodeSchema,
    reason: z.string().min(1),
    retryable: z.boolean(),
    http_status: z.int().min(100).max(599).optional(),
  }),
});
export const consumerMetadataShape = {
  release_id: onlineReleaseIdSchema,
  knowledge_published_at: z.iso.datetime(),
  access_mode: z.enum(["online", "offline"]),
};

export const consumerMetadataSchema = z.strictObject({
  ...consumerMetadataShape,
});
export const consumerHistoryScopeSchema = z.literal("current_and_previous");
export const consumerResolutionSchema = z.strictObject({
  requested_version: z.string().nullable(),
  selected_version: z.string().nullable(),
  match_kind: z.enum([
    "current",
    "exact",
    "prefix",
    "nearest_earlier",
    "source_only",
  ]),
  requested_applicability: z.enum(["mapped", "not_verified"]),
});
export const consumerSourceScopeSchema = z.strictObject({
  reference_id: z.string().regex(/^[a-z][a-z0-9_-]*$/),
  snapshot_id: z.string().min(1),
  official_url: z.url(),
});
export const consumerAnswerSchema = z.strictObject({
  surface_ids: z.array(z.string()).min(1),
  section_id: z
    .string()
    .regex(/^[a-z][a-z0-9_-]*$/)
    .nullable(),
  status: z.enum([
    "answered",
    "partial",
    "unknown",
    "not_applicable",
    "conflict",
    "not_investigated",
  ]),
  source_refs: z.array(z.string()),
});
export const consumerQuestionSchema = z.strictObject({
  question_id: z.string(),
  answers: z.array(consumerAnswerSchema).min(1),
});
export const consumerSectionSchema = z.strictObject({
  section_id: z.string(),
  surface_ids: z.array(z.string()).min(1),
  question_ids: z.array(z.string()),
  source_refs: z.array(z.string()),
});

const surfaceSchema = catalogProductSchema.shape.surfaces.element;
const runtimeSchema = catalogProductSchema.shape.runtimes.element;
const bindingSchema = catalogProductSchema.shape.bindings.element;
/** The online catalog product already carries registration, topics and coverage. */
export const consumerProductSchema = onlineCatalogSchema.shape.products.element;
export const consumerListHarnessesSchema = z.strictObject({
  ...consumerMetadataShape,
  items: z.array(consumerProductSchema),
  next_cursor: z.string().optional(),
});

const consumerAmbiguousSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  status: z.literal("ambiguous"),
  requested_version: z.string().nullable(),
  surface_id: z.string().nullable(),
  harness_id: z.string().optional(),
  surfaces: z.array(surfaceSchema).optional(),
});
const consumerNotFoundSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  status: z.literal("not_found"),
  requested_version: z.string().nullable(),
  surface_id: z.string().nullable(),
});
export const consumerTopicNotInvestigatedSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  status: z.literal("not_investigated"),
  requested_version: z.string().nullable(),
  surface_id: z.string().nullable(),
  harness_id: z.string(),
  topic: topicSchema,
  surfaces: z.array(surfaceSchema),
  runtimes: z.array(runtimeSchema),
  bindings: z.array(bindingSchema),
});
export const consumerTopicProjectionSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  status: z.enum(["ok", "not_investigated"]),
  harness_id: z.string(),
  surface_id: z.string().nullable(),
  surfaces: z.array(surfaceSchema),
  runtimes: z.array(runtimeSchema),
  bindings: z.array(bindingSchema),
  topic: topicSchema,
  edition_id: z.string(),
  title: z.string(),
  body: z.string(),
  sections: z.array(consumerSectionSchema),
  questions: z.array(consumerQuestionSchema),
  source_refs: z.array(z.string()),
  source_scope: z.array(consumerSourceScopeSchema),
  history: z.array(z.string()),
  resolution: consumerResolutionSchema,
});
export const consumerTopicHistoryNotAvailableSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  status: z.literal("history_not_available"),
  harness_id: z.string(),
  surface_id: z.string().nullable(),
  topic: topicSchema,
  edition_id: z.string(),
  resolution: consumerResolutionSchema,
  local_history_url: z.url(),
});
export const consumerGetTopicSchema = z.union([
  consumerTopicProjectionSchema,
  consumerTopicHistoryNotAvailableSchema,
  consumerTopicNotInvestigatedSchema,
  consumerAmbiguousSchema,
  consumerNotFoundSchema,
]);

export const consumerSearchItemSchema = z.strictObject({
  harness_id: z.string(),
  topic: topicSchema,
  edition_id: z.string(),
  section_id: z.string(),
  surface_ids: z.array(z.string()).min(1),
  question_ids: z.array(z.string()),
  preview: z.string(),
  source_refs: z.array(z.string()),
  source_scope: z.array(consumerSourceScopeSchema),
  match: z.enum([
    "exact_question_id",
    "exact_config_term",
    "exact_question_wording",
    "alias",
    "full_text",
    "filter",
  ]),
});
export const consumerSearchKnowledgeSchema = z.strictObject({
  ...consumerMetadataShape,
  status: z.enum(["ok", "ambiguous", "not_found", "not_investigated"]),
  items: z.array(consumerSearchItemSchema),
  next_cursor: z.string().optional(),
});

const consumerCompareSummarySchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  status: z.enum(["ok", "not_investigated"]),
  harness_id: z.string(),
  surface_id: z.string().nullable(),
  topic: topicSchema,
  edition_id: z.string(),
  resolution: consumerResolutionSchema,
});
export const consumerCompareTopicsSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema,
  topic: topicSchema,
  results: z.array(
    z.union([
      consumerCompareSummarySchema,
      consumerTopicProjectionSchema,
      consumerTopicHistoryNotAvailableSchema,
      consumerTopicNotInvestigatedSchema,
      consumerAmbiguousSchema,
      consumerNotFoundSchema,
    ]),
  ),
  questions: z.array(
    z.strictObject({
      question_id: z.string(),
      entries: z.array(
        z.strictObject({
          harness_id: z.string(),
          surface_id: z.string().nullable(),
          answers: z.array(consumerAnswerSchema),
          resolution: consumerResolutionSchema,
        }),
      ),
    }),
  ),
});

/** Published source records: chapter references and catalog references alike. */
const consumerSourceRecordSchema = z.union([
  sourceReferenceSchema,
  catalogReferenceSchema.omit({ snapshot: true }).extend({
    snapshot: catalogReferenceSchema.shape.snapshot.omit({
      archive_path: true,
    }),
  }),
]);
export const consumerGetSourceSchema = z.union([
  z.strictObject({
    ...consumerMetadataShape,
    status: z.literal("ok"),
    surface_id: z.string().nullable(),
    source: consumerSourceRecordSchema,
  }),
  z.strictObject({
    ...consumerMetadataShape,
    status: z.literal("not_found"),
    surface_id: z.string().nullable(),
  }),
]);

export const consumerResponseTooLargeSchema = z.strictObject({
  ...consumerMetadataShape,
  history_scope: consumerHistoryScopeSchema.optional(),
  status: z.literal("response_too_large"),
  harness_id: z.string().optional(),
  surface_id: z.string().nullable().optional(),
  topic: topicSchema.optional(),
  edition_id: z.string().optional(),
  resolution: consumerResolutionSchema.optional(),
  sections: z.array(consumerSectionSchema).optional(),
  message: z.string(),
});

/** Strict result schemas for the five consumer operations plus error shapes. */
export const consumerResultSchemas = {
  list_harnesses: consumerListHarnessesSchema,
  get_topic: consumerGetTopicSchema,
  search_knowledge: consumerSearchKnowledgeSchema,
  compare_topics: consumerCompareTopicsSchema,
  get_source: consumerGetSourceSchema,
  error: consumerErrorSchema,
  response_too_large: consumerResponseTooLargeSchema,
} as const;

/** JSON Schema export map; consumed by scripts/export-schemas.ts. */
export const consumerRecordSchemas = {
  consumer_metadata: consumerMetadataSchema,
  consumer_list_harnesses: consumerListHarnessesSchema,
  consumer_get_topic: consumerGetTopicSchema,
  consumer_search_knowledge: consumerSearchKnowledgeSchema,
  consumer_compare_topics: consumerCompareTopicsSchema,
  consumer_get_source: consumerGetSourceSchema,
  consumer_response_too_large: consumerResponseTooLargeSchema,
  consumer_error: consumerErrorSchema,
} as const;
