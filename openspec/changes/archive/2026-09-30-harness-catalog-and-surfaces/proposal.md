# Proposal

## Why

The last commit added `antigravity-cli` as a flat record that treats one CLI binary as a whole product. Many agent harnesses now ship several interfaces over one shared backend, but the knowledge model, query contract, and Skills still equate a product with a single CLI. The names `codex-cli` and `antigravity-cli` bake an interface into a product identity, and nothing defines the complete set of harness products the project intends to cover, so each addition invents its own name.

## What Changes

- Add `catalog/harnesses.yaml` as the naming authority: product ids, display names, aliases, runtime entities, per-product surfaces with local ids, and one explicit binding per surface with `documented`, `unknown`, or `conflict` evidence. It also captures each product's fixed catalog references, with a snapshot hash, capture time, locator, and bounded excerpt.
- Reduce registry harness records to a product id and source references. Registration is derived from the registry, so the catalog stores no registration flag.
- Rename products so the id names the product: `codex-cli` to `codex`, `antigravity-cli` to `antigravity`. **BREAKING** for existing harness ids; old ids are not added as aliases and existing releases are left untouched.
- Model shared-backend surfaces in chapters: sections and answers carry a non-empty explicit `surface_ids` set, a shared answer lists every surface it covers, and software mappings carry a `surface_id`. A read of a declared surface the chapter does not answer reports `not_investigated` at query time; the chapter stores no per-question stub.
- Give reads an optional `surface_id`: an omitted read addresses the whole product, and any versioned read without a surface is `ambiguous`.
- List with scope `registry` (default) or `catalog`; `get_source` also returns catalog-registered references.
- Version the new baseline as chapter and release `schema_version 3` and `builder_version 6`, with catalog metadata and registry records at `schema_version 1` and chapter source references at `schema_version 2`. Old-format releases are verified for intactness only and never rewritten.
- Migrate tracked knowledge metadata once: opaque source, artifact, reference, snapshot, and edition ids and every chapter body stay unchanged.
- Update the three Skills, the docs, and the site to the product and surface model.

## Capabilities

### New Capabilities
- `harness-catalog`: product and surface naming authority, shared-backend runtime entities and bindings, fixed catalog references, and the complete candidate set with registration derived from the registry.

### Modified Capabilities
- `knowledge-records`: chapter identity now references a catalog product and its declared surfaces.
- `topic-chapters`: non-empty per-surface answers, surface-scoped sections, surface-scoped mappings, and query-derived `not_investigated`.
- `source-provenance`: catalog references carried into the release with fixed snapshot identity.
- `knowledge-release`: new schema and builder baseline, embedded catalog, and cross-format verify-only handling of old releases.
- `dataset-validation`: catalog, registry, and surface validation.
- `knowledge-query`: optional surface resolution, query-derived `not_investigated`, and registry or catalog listing.
- `mcp-query`: optional surface inputs, catalog listing, and catalog reference reads.
- `query-cli`: optional surface inputs and registry or catalog listing.
- `offline-hybrid-search`: surface-scoped search corpus and results.
- `knowledge-site`: surface scope on rendered sections and answers.
- `harness-onboarding`: register a catalog product with surfaces, runtimes and bindings and promote candidates.
- `manual-investigation-skill`: account for the surfaces an investigation actually covers.
- `chapter-update-workflow`: surface-scoped impact analysis.
- `five-harness-investigation`: first-wave products named by product id.
- `reader-guides`: first-wave coverage reflects products, surfaces, and query-derived `not_investigated`.

## Impact

- Tracked knowledge: `registry/harnesses/*`, `registry/chapter-current.yaml`, `knowledge/*/chapters/*`, and the new `catalog/harnesses.yaml`.
- Domain, validation, compiler, query, MCP, CLI, and search source under `src/`.
- Schemas under `schemas/` and their exported JSON Schema.
- Skills under `.agents/skills/{harness-investigation,harness-maintenance,harness-binary}`.
- Docs: PRD, architecture, data-model, knowledge-workflow, topic-questions, and roadmap.
- Existing published releases stay read-only; no in-place rewrite.
