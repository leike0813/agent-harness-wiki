import * as z from "zod";
import {
  evidenceSchema,
  resolvedGuideSchema,
  harnessSchema,
  queryRequestSchema,
  queryResultSchema,
  releaseManifestSchema,
  topicSchema,
  versionIdentitySchema,
} from "../domain/schema.js";

const releaseId = releaseManifestSchema.shape.release_id;
const page = {
  limit: z.int().min(1).max(100).default(20),
  cursor: z.string().max(1024).optional(),
};

export const listSchema = z.strictObject({
  search: z.string().trim().max(100).optional(),
  ...page,
});
export const compareSchema = z.strictObject({
  requests: z.array(queryRequestSchema).min(2).max(5),
});
export const searchSchema = z
  .strictObject({
    text: z.string().trim().max(256).optional(),
    harness: z.string().min(1).optional(),
    topic: topicSchema.optional(),
    os: z.enum(["linux", "windows", "macos"]).optional(),
    version: versionIdentitySchema.optional(),
    guide_cursor: z.string().max(1024).optional(),
    ...page,
  })
  .refine(
    (value) =>
      value.text || value.harness || value.topic || value.os || value.version,
    { message: "Search requires text or a structured filter." },
  );
export const evidenceRequestSchema = z.strictObject({
  evidence_id: releaseId,
});

const factSchema = queryResultSchema.shape.facts.element;
export const listResultSchema = z.strictObject({
  release_id: releaseId,
  items: z.array(harnessSchema),
  next_cursor: z.string().optional(),
});
export const compareResultSchema = z.strictObject({
  release_id: releaseId,
  dimensions: z.array(
    z.strictObject({
      topic: topicSchema,
      fact_key: z.string(),
      facts: z.array(z.array(factSchema)),
    }),
  ),
  results: z.array(queryResultSchema),
});
export const searchResultSchema = z.strictObject({
  release_id: releaseId,
  items: z.array(
    factSchema.extend({ match: z.enum(["alias", "filter", "exact", "text"]) }),
  ),
  next_cursor: z.string().optional(),
  guides: z.array(
    resolvedGuideSchema.omit({ body: true }).extend({ preview: z.string() }),
  ),
  next_guide_cursor: z.string().optional(),
});
export const evidenceResultSchema = z.strictObject({
  release_id: releaseId,
  status: z.enum(["ok", "not_found"]),
  evidence: evidenceSchema.optional(),
});

export { queryRequestSchema, queryResultSchema };
