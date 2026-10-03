import * as z from "zod";
import { surfaceKindSchema } from "./schema.js";

const id = z.string().regex(/^[a-z][a-z0-9_-]*$/);
const refs = z.array(id).min(1);
const archivePath = z
  .string()
  .regex(/^archive\/catalog\/[a-zA-Z0-9_./-]+$/)
  .refine(
    (value) =>
      !value.split("/").some((part) => part === ".." || part === "." || !part),
  );
export const catalogReferenceSchema = z.strictObject({
  reference_id: id,
  harness_id: id,
  official_url: z.url().refine((value) => value.startsWith("https://")),
  captured_at: z.iso.datetime(),
  snapshot: z.strictObject({
    kind: z.enum(["document", "git_commit"]),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    revision: z
      .string()
      .regex(/^[a-f0-9]{40}$/)
      .optional(),
    // A git identity may be pinned by revision alone; a document has no other
    // fixed identity, so it must keep a retained original.
    archive_path: archivePath.optional(),
  }),
  locator: z.string().min(1),
  excerpt: z.string().min(1).max(800),
});
export const catalogProductSchema = z.strictObject({
  harness_id: id,
  name: z.string().min(1),
  aliases: z.array(z.string().min(1)),
  reference_ids: refs,
  surfaces: z
    .array(
      z.strictObject({
        surface_id: id,
        name: z.string().min(1),
        kind: surfaceKindSchema,
        reference_ids: refs,
      }),
    )
    .min(1),
  runtimes: z.array(
    z.strictObject({
      runtime_id: id,
      name: z.string().min(1),
      reference_ids: refs,
    }),
  ),
  bindings: z.array(
    z.strictObject({
      surface_id: id,
      runtime_id: id.optional(),
      status: z.enum(["documented", "unknown", "conflict"]),
      reference_ids: z.array(id),
    }),
  ),
});
export const harnessRegistrationSchema = z.strictObject({
  schema_version: z.literal(1),
  record_kind: z.enum(["fixture", "production"]),
  harness_id: id,
  source_refs: refs,
});
export const catalogSchema = z
  .strictObject({
    schema_version: z.literal(1),
    record_kind: z.enum(["fixture", "production"]),
    products: z.array(catalogProductSchema).min(1),
    references: z.array(catalogReferenceSchema).min(1),
  })
  .superRefine((catalog, ctx) => {
    const fail = (message: string, path: (string | number)[]) =>
      ctx.addIssue({ code: "custom", message, path });
    const unique = (ids: string[], path: (string | number)[]) => {
      if (new Set(ids).size !== ids.length) fail("Duplicate identity.", path);
    };
    unique(
      catalog.products.map((x) => x.harness_id),
      ["products"],
    );
    unique(
      catalog.references.map((x) => x.reference_id),
      ["references"],
    );
    const products = new Set(catalog.products.map((x) => x.harness_id));
    const references = new Map(
      catalog.references.map((x) => [x.reference_id, x]),
    );
    const names = new Map<string, string>();
    for (const [index, product] of catalog.products.entries()) {
      const root = ["products", index];
      for (const name of [
        product.harness_id,
        product.name,
        ...product.aliases,
      ]) {
        const key = name.toLocaleLowerCase();
        if (names.has(key) && names.get(key) !== product.harness_id)
          fail("Product names and aliases must resolve uniquely.", root);
        names.set(key, product.harness_id);
      }
      const checkRefs = (ids: string[]) => {
        for (const ref of ids)
          if (references.get(ref)?.harness_id !== product.harness_id)
            fail("Reference is missing or belongs to another product.", root);
      };
      checkRefs(product.reference_ids);
      unique(
        product.surfaces.map((x) => x.surface_id),
        [...root, "surfaces"],
      );
      unique(
        product.runtimes.map((x) => x.runtime_id),
        [...root, "runtimes"],
      );
      product.surfaces.forEach((x) => checkRefs(x.reference_ids));
      product.runtimes.forEach((x) => checkRefs(x.reference_ids));
      unique(
        product.bindings.map((x) => x.surface_id),
        [...root, "bindings"],
      );
      for (const binding of product.bindings) {
        checkRefs(binding.reference_ids);
        if (
          !product.surfaces.some((x) => x.surface_id === binding.surface_id) ||
          (binding.runtime_id &&
            !product.runtimes.some((x) => x.runtime_id === binding.runtime_id))
        )
          fail("Binding has an unknown surface or runtime.", [
            ...root,
            "bindings",
          ]);
        if (
          binding.status === "documented" &&
          (!binding.runtime_id || !binding.reference_ids.length)
        )
          fail("Documented bindings require a runtime and evidence.", [
            ...root,
            "bindings",
          ]);
        if (binding.status === "conflict" && !binding.reference_ids.length)
          fail("Conflicting bindings require evidence.", [...root, "bindings"]);
        if (binding.status === "unknown" && binding.runtime_id)
          fail("Unknown bindings cannot assert a runtime.", [
            ...root,
            "bindings",
          ]);
      }
      if (
        product.surfaces.some(
          (s) => !product.bindings.some((b) => b.surface_id === s.surface_id),
        )
      )
        fail("Every surface needs an explicit binding status.", [
          ...root,
          "bindings",
        ]);
    }
    for (const [index, ref] of catalog.references.entries()) {
      if (!products.has(ref.harness_id))
        fail("Unknown reference product.", ["references", index]);
      if (ref.snapshot.kind === "git_commit" && !ref.snapshot.revision)
        fail("Git snapshots require a fixed commit.", [
          "references",
          index,
          "snapshot",
        ]);
      if (ref.snapshot.kind === "document" && !ref.snapshot.archive_path)
        fail("Document snapshots require a retained original.", [
          "references",
          index,
          "snapshot",
          "archive_path",
        ]);
    }
  });

export type HarnessCatalog = z.infer<typeof catalogSchema>;
