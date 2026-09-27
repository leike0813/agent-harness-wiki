# Proposal

## Why

The compiler now publishes verifiable releases, but users cannot query them. M0 needs one offline read path that preserves version, environment, condition, review, and coverage boundaries before adding MCP or the site.

## What Changes

- Add a release-bound QueryService for listing harnesses, reading capabilities and evidence, comparing Targets, and searching published knowledge.
- Add the five query commands and `validate`/`compile` commands to `ahw`.
- Retain source snapshot discovery metadata in releases so `latest_upstream` can report a discovered but unverified version; add a fictional newer-version snapshot.
- Add query and CLI tests and document the commands and query semantics.

## Capabilities

### New Capabilities

- `knowledge-query`: Fixed-release, read-only queries with explicit version, Target, condition, coverage, evidence, comparison, search, and cursor semantics.
- `query-cli`: Local CLI commands that use the shared query service and expose validation and compilation.

### Modified Capabilities

- `knowledge-release`: Preserve validated discovery snapshot metadata even when no reviewed claim refers to a newer version.

## Impact

`src/query/`, `src/cli/`, release projection, fictional fixtures, query schemas, tests, package scripts, README and development documentation. No new dependency or network access.
