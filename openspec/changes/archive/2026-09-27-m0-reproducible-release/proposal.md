# Proposal

## Why

The first M0 change can validate fictional knowledge, but no fixed release exists for the future QueryService, CLI, MCP, or site to read. A reproducible offline compiler is the next dependency in the planned M0 chain.

## What Changes

- Compile a validated dataset into canonical JSON, a SQLite query index, safe Markdown pages, and an integrity manifest.
- Stage and verify a new immutable release before switching the local current-release pointer; failed builds leave the previous release available.
- Provide a fixed-parameter fixture build command and focused release verification tests.
- Exclude draft and rejected claims from published query data while retaining accepted and disputed claims with their review state.

## Capabilities

### New Capabilities

- `knowledge-release`: Deterministic offline release compilation, publication, and integrity verification.

### Modified Capabilities

None. The existing knowledge-record and dataset-validation requirements remain intact.

## Impact

Adds `src/compiler/`, a build script, integration tests, and release documentation. Extends the manifest schema with builder identity. No new dependency is needed: Node file APIs, Zod, and the installed better-sqlite3 cover the work. Generated releases stay Git-ignored.
