# Proposal

## Why

M0 accepts only fictional local files as sources. M1 needs fixed official source identities and locally retained originals before real harness conclusions can be reviewed without confusing a source commit or unversioned documentation with a verified CLI release.

## What Changes

- Add typed Git repository and official documentation sources, fixed source and document snapshots, and explicit Git checkout or archived document artifacts.
- Pin one official Codex CLI repository revision and capture one official CLI documentation snapshot as source-only production records. Neither produces an accepted capability claim.
- Validate source, snapshot, artifact, Target, hash, and path relationships; provide an explicit offline audit of local originals.
- Include artifact metadata in new releases while keeping originals out of releases and preserving access to M0 releases.

## Capabilities

### New Capabilities

- `source-provenance`: Fixed official source identity, snapshot applicability, and archive or Git checkout verification.

### Modified Capabilities

- `knowledge-records`: Include artifact identity and an explicitly unversioned document snapshot without weakening exact Claim Targets.
- `dataset-validation`: Validate new source relationships and prevent an unversioned document from supporting an accepted exact-version claim.
- `knowledge-release`: Publish source and artifact metadata without raw originals and keep older releases readable.

## Impact

Domain and JSON schemas, dataset validation, local source audit, JSON/SQLite publication and query snapshot selection, official Codex source records, Git submodule, ignored local archive, tests, and development documentation. No new runtime dependencies, MCP tools, upstream polling, installation, or harness execution.
