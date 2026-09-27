# Tasks

## 1. Release contract and projection

- [x] 1.1 Extend the manifest schema with builder identity and export its JSON Schema; verify schema consistency and typecheck.
- [x] 1.2 Implement stable reviewed-data projection and serialization; verify accepted/disputed inclusion, draft/rejected exclusion, and deterministic ordering in focused tests.

## 2. Artifact generation

- [x] 2.1 Write SQLite tables, relationships, indexes, and FTS5 from the projection; verify ordered rows, foreign keys, and standalone database integrity.
- [x] 2.2 Generate safe Markdown from the same projection; verify fixture labels, seven topics, evidence, uncertainty, and inert source text.

## 3. Publication

- [x] 3.1 Implement manifest hashing and read-only release verification; verify corruption and missing-artifact failures.
- [x] 3.2 Implement staging, immutable release directory, and current pointer switching; verify a failed build or duplicate ID leaves the prior release unchanged.
- [x] 3.3 Add explicit-parameter compiler script and `pnpm fixtures:build`; verify it creates a valid fixture release.

## 4. Documentation and acceptance

- [x] 4.1 Update README, development/data-model/architecture docs, roadmap status, and a release ADR; verify commands and described state match the implementation.
- [x] 4.2 Run repeat-build and cross-artifact integration checks, frozen-lockfile install, typecheck, build, lint, formatting, unit/integration tests, and strict OpenSpec validation; report any not-run checks.
