# Design

## Context

The current compiler publishes checked JSON and SQLite with Target keys and FTS5. The existing projection retains only snapshots referenced by published evidence, so it cannot support discovered-but-unverified latest versions. Query entry points do not yet exist.

## Goals / Non-Goals

**Goals:** One immutable read snapshot; precise version and condition semantics; bounded query interfaces; a CLI adapter with no business logic duplication.

**Non-Goals:** MCP, site, live upstream reads, embeddings, executing harnesses, automatic publication.

## Decisions

- Open a release by ID under a release root (or resolve `current.json` once), run `verifyRelease`, and keep a read-only SQLite handle. Require explicit ID for fixture profiles. This reuses the compiler's integrity gate; loading unverified JSON directly would weaken release binding.
- Retain all validated source and snapshot metadata in the published projection. These records identify observed upstream versions and contain no raw source content. Keep the existing reviewed-only claim/evidence filter, so draft facts stay private. The alternative, deriving latest upstream from coverage, would confuse investigation planning with discovery.
- Use complete Target scope and exact identity for lookup. Order only numeric dotted release versions; mixed or noncomparable version sets are ambiguous. Discovery time is `source_fetched_at`, not an upstream publication timestamp. Do not infer runtime support from it.
- Use shared domain schemas for Target, version, and conditions and strict query input schemas. Normalize aliases before scope matching, then query only published rows. Conditions with missing caller values stay visible and ambiguous; mismatches exclude the claim. No server environment inspection.
- Use SQL parameters for filters and literal-quoted FTS5 terms for full-text queries. Apply stable ranking and ID ordering. Cursor encodes release, normalized request digest, sort version, and offset; limit 20 by default and 100 maximum. Bound compare targets to five.
- Commander handles parsing and output; it passes validated request objects to the service. JSON is the complete contract; human output can be concise.

## Risks / Trade-offs

- Source metadata for unreviewed versions becomes visible in releases → include metadata only, never material bytes or unreviewed assertions.
- Release verification reads each artifact at open → acceptable for M0 releases; later optimize only if measured.
- FTS5 may not tokenize Chinese as desired → map the six Chinese topic names to structured topic filters, without adding a tokenizer or model.
- Only numeric dotted release versions are ordered → report ambiguous for other identities and record this limit in docs.

## Migration Plan

Existing immutable releases remain usable for exact and verified queries. Rebuild the fixture under a new release ID to include the discovery snapshot. No release is overwritten.
