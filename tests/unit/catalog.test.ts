import { expect, test } from "vitest";
import { catalogSchema } from "../../src/domain/catalog.js";
import { sha256 } from "../../src/compiler/projection.js";

const ref = {
  reference_id: "ref-fictional-product",
  harness_id: "demo-product",
  official_url: "https://example.invalid/product",
  captured_at: "2026-09-30T00:00:00Z",
  snapshot: {
    kind: "document",
    sha256: sha256("Fictional product"),
    archive_path: "archive/catalog/demo-product.md",
  },
  locator: "Fictional identity",
  excerpt: "Fictional product",
};
const product = {
  harness_id: "demo-product",
  name: "Fictional product",
  aliases: [],
  reference_ids: [ref.reference_id],
  surfaces: [
    {
      surface_id: "cli",
      name: "Fictional CLI",
      kind: "cli",
      reference_ids: [ref.reference_id],
    },
  ],
  runtimes: [
    {
      runtime_id: "core",
      name: "Fictional core",
      reference_ids: [ref.reference_id],
    },
  ],
  bindings: [
    {
      surface_id: "cli",
      runtime_id: "core",
      status: "documented",
      reference_ids: [ref.reference_id],
    },
  ],
};
const catalog = {
  schema_version: 1,
  record_kind: "fixture",
  products: [product],
  references: [ref],
};

test("catalog preserves explicit unknown bindings and rejects invalid identities and evidence", () => {
  expect(catalogSchema.safeParse(catalog).success).toBe(true);
  expect(
    catalogSchema.safeParse({
      ...catalog,
      products: [
        {
          ...product,
          bindings: [
            { surface_id: "cli", status: "unknown", reference_ids: [] },
          ],
        },
      ],
    }).success,
  ).toBe(true);
  for (const invalid of [
    { ...catalog, products: [product, product] },
    { ...catalog, references: [{ ...ref, harness_id: "other-product" }] },
    {
      ...catalog,
      products: [
        {
          ...product,
          bindings: [{ ...product.bindings[0], reference_ids: [] }],
        },
      ],
    },
    {
      ...catalog,
      products: [
        {
          ...product,
          bindings: [{ ...product.bindings[0], runtime_id: "missing" }],
        },
      ],
    },
    {
      ...catalog,
      products: [
        {
          ...product,
          bindings: [{ ...product.bindings[0], status: "unknown" }],
        },
      ],
    },
    {
      ...catalog,
      references: [
        {
          ...ref,
          snapshot: {
            ...ref.snapshot,
            archive_path: "archive/catalog/../secrets",
          },
        },
      ],
    },
  ])
    expect(catalogSchema.safeParse(invalid).success).toBe(false);
});

test("a pinned Git identity may drop its original, a document may not", () => {
  const unretained = { kind: "document", sha256: sha256("Fictional product") };
  const git = {
    ...ref,
    reference_id: "ref-fictional-git",
    snapshot: {
      kind: "git_commit",
      sha256: sha256("Fictional commit"),
      revision: "a".repeat(40),
    },
  };
  const withGit = { ...catalog, references: [...catalog.references, git] };
  expect(catalogSchema.safeParse(withGit).success).toBe(true);
  expect(
    catalogSchema.safeParse({
      ...catalog,
      references: [
        ...catalog.references,
        {
          ...git,
          snapshot: {
            ...git.snapshot,
            archive_path: "archive/catalog/demo-git.md",
          },
        },
      ],
    }).success,
  ).toBe(true);
  for (const invalid of [
    { ...git, snapshot: { ...git.snapshot, revision: undefined } },
    { ...git, snapshot: { ...git.snapshot, revision: "A".repeat(40) } },
    { ...git, snapshot: { kind: "git_commit", sha256: git.snapshot.sha256 } },
    { ...git, snapshot: unretained },
  ])
    expect(
      catalogSchema.safeParse({
        ...catalog,
        references: [...catalog.references, invalid],
      }).success,
    ).toBe(false);
});
