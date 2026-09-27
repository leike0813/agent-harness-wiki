# Design

## Context

See proposal.md. The repository has a root package and an empty `site/` workspace, no lockfile, no domain code, and no knowledge release. The PRD makes Git-tracked structured records the future truth and requires fixture/production separation before building an index.

## Goals / Non-Goals

**Goals:** A strict, exportable record contract; a bounded loader and validator shared by later compiler work; fixture data that exercises product semantics; a reproducible toolchain and early MCP SDK protocol check.

**Non-Goals:** Release output, QueryService behavior, production harness investigation, five-tool MCP service, or complete site pages.

## Decisions

1. **Toolchain.** Pin Node 24.12.0 and pnpm 11.10.0; use TypeScript 6.0.3 with NodeNext ESM resolution and explicit `.js` import extensions. Use Zod 4.6.5, YAML 2.9.1, Vitest 5.0.2 with its Vite 8.3.1 peer, tsx 4.23.15, ESLint 10.11.0, typescript-eslint 8.70.1, and Prettier 3.9.9. MCP server/client 2.1.0 are separate packages. Install the already selected Commander 15.0.0, better-sqlite3 13.0.3 and VitePress 1.6.4 to check compatibility early, even though their product behavior belongs to later changes. pnpm generates the lockfile. This avoids mixing MCP v1 and v2 examples and keeps TypeScript within typescript-eslint's declared peer range.
2. **One schema truth.** Zod strict objects define all persisted records. TypeScript types derive from them; `z.toJSONSchema()` exports their data shape. Checks that need the whole dataset live in validation, not in parallel schema definitions. Persisted schemas use JSON-representable values only. Unknown fields are rejected; no generic extension payload is added in M0.
3. **Version scope.** A persisted Claim has a Target selector without version and `version_applicability: {kind: exact, versions: [one version]}`. The validator materializes the full Target by combining them. Coverage and Snapshot use a full Target. This keeps one version value per Claim while retaining the PRD's exact applicability field; no SemVer inference occurs.
4. **Fixture layout and loading.** `tests/fixtures/datasets/basic/` mirrors `registry/` and `knowledge/<harness-id>/`; one YAML record per file. The loader enumerates only known record directories, reads UTF-8, caps each YAML at 1 MiB and the full dataset at 16 MiB, rejects symlinks and path escapes, and parses with unique keys and no custom tags. Source excerpts remain inert data. Fixture source file hashes are SHA-256 of actual bytes.
5. **Validation result.** `loadAndValidateDataset({root, profile})` returns a discriminated success/failure result with typed normalized records only on success and diagnostics on both paths. Diagnostics have `code`, `severity`, `category`, `file`, `record_id`, `path`, `reason`, and `hint`. The same validator enforces fixture/production profile. Unknown and partial coverage may pass; accepted substantive claims require valid Evidence and Assessment. Conflicting evidence requires disputed assessment, never first-record-wins.
6. **Early protocol check.** A test-only stdio server exposes one ping tool; the official client connects, lists/calls it, and closes the child process. The test verifies SDK wiring and stdout discipline, while the five production tools are deferred.

## Risks / Trade-offs

- Native `better-sqlite3` installation may fail in the environment → record the error and environment facts; do not claim SQLite is available or substitute an array.
- Future real harness facts may need assertion or condition variants not present in fixtures → add them through reviewed schema changes, not an unrestricted payload.
- YAML aliases can expand input beyond byte limits → set parser alias limits and reject excessive documents before semantic validation.
