## Why

The project investigation Skill currently requires a fixed Target and a question. Maintainers need to invoke it with registered harness IDs, discover upstream changes, and retain a reviewable history even when nothing changed.

## What Changes

- Add an on-demand `sources:scan` command that checks only registered npm, Git, and documentation sources and writes one audit record per selected harness per run.
- Preserve new npm package bytes and Git revisions as isolated candidates without changing the pinned package set or submodule pointers.
- Extend provenance for archived npm package files and isolated Git checkouts.
- Make the Skill's default path harness-ID-driven incremental investigation, with exact Target/question investigation still available.
- Keep semantic acceptance and publishing manual.

## Capabilities

### New Capabilities

- `upstream-incremental-audit`: On-demand source observation, baseline comparison, candidate preservation, and durable audit history.

### Modified Capabilities

- `manual-investigation-skill`: Harness-ID intake and review handoff.
- `source-provenance`: Candidate originals may live in isolated archives while published provenance remains exact.

## Impact

Adds a scanner, audit record schema and validation, a bounded tar reader, source provenance validation, tests, Skill instructions, and documentation. Does not change QueryService, published release selection, or accepted records.
