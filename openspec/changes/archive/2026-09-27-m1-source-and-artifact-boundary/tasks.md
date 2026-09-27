# Tasks

## 1. Provenance model and validation

- [x] 1.1 Add typed source, artifact and snapshot variants plus JSON Schema exports; verify TypeScript and schema checks.
- [x] 1.2 Load artifact records and validate owner, reference, Target, hash and safe-path relationships; verify existing fixture tests and focused negative cases.
- [x] 1.3 Add an explicit offline source audit for archived bytes and Git checkout identity; verify local positive and negative cases without network access.

## 2. Fixed official sources and releases

- [x] 2.1 Pin the official Codex repository submodule and capture the official CLI documentation original; verify Git commit, URLs and file hashes.
- [x] 2.2 Add source-only Codex registry, snapshot and artifact records; verify production validation with no accepted Claim.
- [x] 2.3 Publish artifact metadata in JSON and SQLite with builder version 2, preserve version 1 releases and exclude unversioned documents from version discovery; verify release and query integration tests.

## 3. Delivery

- [x] 3.1 Update scripts, ignore rules, obsolete placeholders, data-model/development docs and ADR; verify commands reflect actual behavior.
- [x] 3.2 Run local source audit, offline production build/query, `pnpm verify`, strict OpenSpec validation and diff checks; record failures or platform limits honestly.
