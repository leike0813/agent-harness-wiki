# Design

## Context

See proposal.md for motivation. Today a harness record is a flat schema-1 object with `harness_id`, `name`, `aliases`, `surfaces` (a bare kind list), and `source_refs`; chapters are schema-2 documents keyed by `harness_id` and topic whose questions hold a single `section_id`/status/source set; software mappings carry no surface; and the query service, the five MCP tools, the CLI, search, and the site treat a harness as one undifferentiated product. The last commit added `antigravity-cli` through that path, and the same shape produced `codex-cli`.

## Goals / Non-Goals

**Goals:**

- One naming authority so a product id names the product and every interface is a surface of it.
- A catalog that records how each surface relates to the shared backend, with honest evidence.
- A chapter that explains a shared mechanism once and records which surfaces each answer applies to.
- Reads that can address a surface or the whole product and never silently pick a surface for a version.
- A new schema baseline that leaves already published releases untouched.

**Non-Goals:**

- Rewriting or migrating any existing published release in place.
- Onboarding the candidate products; the catalog records identity and references only.
- Reconciling the old Claim/Coverage model.
- Changing the five-tool MCP surface or the offline-only query boundary.

## Decisions

### Product and surface are separate identities
`catalog/harnesses.yaml` is a schema-version-1 record with `record_kind` of `fixture` or `production`. It holds products, each with a product id, display name, aliases, fixed reference ids, `surfaces`, `runtimes`, and `bindings`. A product id names the product (`codex`, `antigravity`); a surface id is local to its product (`cli`, `vscode`, ...). Surface kind is `cli`, `ide`, `desktop`, `web`, or `sdk`.

Rationale: a shared backend makes the CLI, IDE extension, and desktop app one product with several front ends, so scoping knowledge by product keeps shared mechanisms in one place. Local surface ids avoid inventing a global namespace. Alternative considered: one record per interface, which duplicates shared mechanisms and is what produced the current names.

### Runtime entities and bindings carry documented/unknown/conflict evidence
Each product lists its `runtimes` and exactly one `binding` per surface. A binding names a surface, optionally a runtime, a status of `documented`, `unknown`, or `conflict`, and the references behind it. A documented binding requires a runtime and evidence; a conflict binding requires evidence; an unknown binding cannot assert a runtime.

Rationale: the interface-to-backend relationship is exactly the knowledge the project currently lacks, so it is modeled explicitly instead of being implied by a surface label. The three states keep "we have a source", "we have nothing", and "sources disagree" distinct rather than collapsing them into a boolean.

### Registry keeps id and sources; naming and registration live in the catalog
`registry/harnesses/<product_id>.yaml` is a schema-version-1 registration record carrying `harness_id` (the product id) and `source_refs` only. The catalog supplies the name, aliases, and surfaces, and registration is derived: a product is registered exactly when a registration record exists.

Rationale: the catalog is the naming authority (DRY/SSOT); duplicating names into registry records would let them drift, and a stored registration flag would be a second source of truth that can disagree with the registry.

### Catalog references are fixed captures, not links
Every catalog reference carries the official link, capture time, a fixed snapshot identity (a content hash, and a commit for a Git snapshot), a locator, and a bounded excerpt. The release carries the catalog, so `get_source` can serve a catalog reference that no chapter cites.

Rationale: a link is not evidence; the project's evidence boundary requires a fixed snapshot and a displayable excerpt that survive without the local archive.

### Questions carry explicit per-surface answers
A chapter question becomes `{question_id, answers: [...]}`, where each answer is `{surface_ids: [id], section_id, status, source_refs: [id]}` and `surface_ids` is a non-empty, explicit set. A section becomes `{section_id, surface_ids: [id], source_refs: [id]}`. Each software mapping gains a `surface_id`.

Rationale: this lets one chapter describe a shared mechanism once while stating which front end each conclusion applies to. A shared answer lists every surface it covers, and a question must not carry overlapping surfaces. Alternative considered: separate editions per surface, which multiply immutable editions and break whole-product reads.

### not_investigated is query-derived
A declared surface a chapter does not answer is reported as `not_investigated` by a read. The chapter does not store a per-question stub, and validation does not require every surface to be answered; it only rejects unknown surfaces and overlapping answers.

Rationale: `not_investigated` is a boundary of the shared backend, not content. A query can derive "the product declares this surface, no answer covers it" without forcing authors to add placeholder prose, and `unknown` keeps its distinct meaning of "examined, no conclusion".

### Surface resolution and ambiguity in reads
Every read accepts an optional `surface_id`. When omitted, a read without a version addresses the whole product and resolves each question through its answers. Any versioned read that omits `surface_id` is `ambiguous`, because surfaces of one product can ship different versions and choosing one would assert unverified applicability. A read of a declared surface with no answering section reports `not_investigated`.

Rationale: this matches the confirmed contract and the project's core judgment about never implying unverified version applicability.

### Registry or catalog listing
`list_harnesses` takes a scope: `registry` (default) returns registered products, and `catalog` adds candidate products with their surfaces, runtimes, and bindings.

Rationale: candidate identities must be visible without shipping them as knowledge, and the distinction is a listing scope, not a stored product state.

### New baseline, old releases verified only
New chapter editions and release records use chapter schema version 3 and builder version 6; catalog metadata and registry records stay at schema version 1, and chapter source references stay at schema version 2. Verification applies frozen deterministic and hash checks to that baseline. A release of the older chapter schema is checked for intactness and left byte-for-byte unmodified.

Rationale: old releases remain valid local research material, and the project has no new-interface compatibility obligation toward them; rewriting them would destroy evidence.

### One-time metadata migration with preserved identifiers
The tracked registry, catalog, current-selection, and knowledge metadata migrate once from the old shape to the new one: `codex-cli` becomes `codex`, `antigravity-cli` becomes `antigravity`, surface sets are added, and questions are reshaped to answers. Opaque `source_id`, `artifact_id`, `reference_id`, `snapshot_id`, and `edition_id` values and every chapter `body` stay exactly as they are, and no old product id is registered as an alias.

Rationale: identifiers and prose are opaque evidence; only the surrounding identity and shape change. Adding old ids as aliases would let a stale name resolve to a renamed product and imply an equivalence the migration does not establish.

## Risks / Trade-offs

- [Surface proliferation] → Surfaces are declared per product in the catalog; a surface exists only when an interface actually ships, and a segment without an answer reads as `not_investigated` without blocking publication.
- [Binding bookkeeping] → Every surface needs a binding, but an `unknown` binding is cheap and honest; it records that the relationship was not established.
- [Ambiguous reads frustrate callers] → Ambiguity is a business outcome naming the product's surfaces; a caller resolves it by naming a surface.
- [Migration touches many files] → It is a single mechanical pass over tracked metadata; bodies and opaque ids are copied verbatim, so review is diff-based.
- [Catalog drift from registry] → Registration is derived at validation time, so a product without a registry record is a candidate and cannot be presented as registered.

## Migration Plan

1. Add `catalog/harnesses.yaml` with all registered products (renamed) plus the candidate set, their surfaces, runtimes, bindings, and fixed references.
2. Reduce registry harness records to product id and source references; rename the files and update source `harness_id` values.
3. Rename `knowledge/codex-cli` to `knowledge/codex` and `knowledge/antigravity-cli` to `knowledge/antigravity`; rewrite chapter, selection, and mapping metadata to the new shape while copying bodies and opaque ids verbatim.
4. Update the domain, validation, compiler, query, MCP, CLI, and search code to the new records, then rebuild fixtures and export schemas.
5. Publish a new local release on the new baseline and verify it; leave every existing release directory untouched.

Rollback: the previous release and the pre-change Git revision remain the fallback; nothing in this plan mutates a published release.

## Open Questions

- Which exact products belong to the candidate set is settled by the research task, not fixed here.
