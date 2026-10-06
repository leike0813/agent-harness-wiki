# Proposal

## Why

Readers need to understand where harnesses retain local conversations and whether those records can be archived or cleaned without breaking recovery or associated databases. The current seven-topic contract has no shared investigation questions for this storage lifecycle.

## What Changes

- Add `local_transcripts`, with ten `transcripts.*` questions covering records, locations, naming, formats, schema, lifecycle, database relationships, archival, cleanup and diagnostics.
- Permit gradual topic coverage without placeholder chapters; retain current selections for authored topics and reject registered products with no current content.
- Expose the topic through existing queries, search, site presentation and investigation/maintenance workflows.
- Build local releases with builder 7 while preserving builder 6's frozen Markdown verification.
- **BREAKING**: online knowledge containing the new topic requires consumer 1.2.0 or newer because older consumers use a closed topic enum. This change does not publish such production knowledge.

## Capabilities

### New Capabilities

None; extend the existing chapter contract.

### Modified Capabilities

- `topic-chapters`: eight topics and the local transcript content contract.
- `dataset-validation`: gradual coverage with current selection integrity.
- `knowledge-query`: missing declared topics are normal not_investigated outcomes.
- `knowledge-site`: show uninvestigated topics without unreadable links.
- `harness-onboarding`: onboarding covers the complete topic catalog; maintained products may add missing topics.
- `knowledge-release`: builder 7 output and frozen builder 6 verification.
- `consumer-distribution`: consumer 1.2.0 topic support and upgrade boundary.

## Impact

Shared topic schemas, question parsing, aliases, local compilation/verification, presentation, generated schemas, consumer metadata, Skills and current documentation. Existing five query interfaces and data/v1 resource layouts remain in use. Real product investigations, publication, dependency changes and Git commits are outside this change.
