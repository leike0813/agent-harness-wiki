# Design

## Context

The first change supplies `loadAndValidateDataset` and strict Zod records. There is no compiler or release yet. PRD §12 requires immutable local releases, staging, a current pointer, and offline builds. The installed better-sqlite3 supports FTS5 on the development machine.

## Goals / Non-Goals

**Goals:** A deterministic, integrity-checked handoff from validated Git knowledge to read-only release artifacts, with a database layout usable by the next query change.

**Non-Goals:** QueryService behavior, CLI query commands, MCP tools, VitePress build, real harness investigation, or remote publishing.

## Decisions

1. **One published projection.** Sort records by stable ID and recursively sort object keys before serializing. Filter Claim records to those with an accepted or disputed assessment; include their referenced evidence, assessments, snapshots, and source metadata, plus harnesses and all coverage. Keep superseded reviewed claims and their relations for history. All artifact writers consume this same projection. This prevents rejected or draft assertions from leaking into query rows or fact pages while preserving disputes.
2. **Manifest identity.** Extend `releaseManifestSchema` with `builder_version: "1"`. Hash canonical projected input and each output file (`knowledge.json`, `knowledge.sqlite`, and each generated Markdown page); do not hash `manifest.json` from itself. Explicit publication time is mandatory. A release verifier checks exact artifact inventory, hashes, manifest schema, SQLite quick/integrity and foreign-key checks, and the lack of WAL/SHM files.
3. **SQLite layout.** Use ordinary tables for harnesses, sources, snapshots, claims, evidence, assessments, and coverage. Keep a canonical JSON payload per row, and index typed claim columns (`harness_id`, exact Target key, topic, fact key) and coverage scope. Join references use foreign keys. FTS5 indexes reviewed claim text only. Use `journal_mode=DELETE`, close the connection, then verify the standalone file. No ORM or vector extension.
4. **Publish sequence.** `compileRelease({datasetRoot, profile, releaseId, publishedAt, releasesRoot})` validates input, builds in an owned staging directory below the release root, verifies it, refuses an existing release ID, renames staging to `releases/<id>/`, then atomically replaces `releases/current.json` with a one-field ID pointer. On any failure the old pointer and old releases are untouched; only the compiler's own staging is cleaned. A pointer-update error may leave the new immutable directory present but inactive, which the caller reports.
5. **Markdown as display.** Emit deterministic plain Markdown for the index, harnesses, seven topics, evidence, and release metadata. Escape data-derived text and HTML rather than embedding raw upstream markup. Every fixture page carries a fictional-data notice. VitePress wiring waits for the site change.
6. **Entry point.** A small script accepts explicit dataset/profile/ID/time/output arguments; `pnpm fixtures:build` supplies stable fixture parameters. Reuse the existing validator and package dependencies.

## Risks / Trade-offs

- SQLite file bytes can vary across engine versions → compare ordered logical rows for repeatability; keep a byte hash in each concrete manifest for integrity.
- The first production source kind is still `fixture_file` → this change only proves fixture publication; M1 expands real Source variants before real data is admitted.
- Filesystem rename and pointer replacement have platform-specific behavior → use Node APIs, keep old pointer until new release passes verification, and report Windows as unverified until executed there.
