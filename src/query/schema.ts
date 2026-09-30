import * as z from "zod";
import { topicSchema } from "../domain/schema.js";

const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const page = {
  limit: z.int().min(1).max(20).default(10),
  cursor: z.string().max(1024).optional(),
};
export const listSchema = z.strictObject({
  scope: z.enum(["registry", "catalog"]).default("registry"),
  query: z.string().trim().max(100).optional(),
  ...page,
});
export const topicRequestSchema = z.strictObject({
  harness: z.string().min(1),
  topic: topicSchema,
  section_id: id.optional(),
  surface_id: id.optional(),
  version: z.string().min(1).max(100).optional(),
});
export const compareSchema = z.strictObject({
  topic: topicSchema,
  targets: z
    .array(
      z.strictObject({
        harness: z.string().min(1),
        surface_id: id.optional(),
        version: z.string().min(1).max(100).optional(),
      }),
    )
    .min(2)
    .max(5),
  question_ids: z
    .array(z.string().regex(/^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$/))
    .optional(),
});
export const searchSchema = z
  .strictObject({
    text: z.string().trim().max(256).optional(),
    harness: z.string().min(1).optional(),
    topic: topicSchema.optional(),
    surface_id: id.optional(),
    ...page,
  })
  .refine((v) => Boolean(v.text || v.harness || v.topic), {
    message: "Search requires text, harness or topic.",
  });
export const sourceRequestSchema = z.strictObject({
  reference_id: id,
  surface_id: id.optional(),
});
