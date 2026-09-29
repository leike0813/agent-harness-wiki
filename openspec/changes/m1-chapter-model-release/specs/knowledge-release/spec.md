# Spec Delta

## MODIFIED Requirements

### Requirement: Consistent release views
JSON, SQLite, and generated Markdown SHALL derive from one normalized published chapter set. SQLite SHALL expose chapter editions, current and historical chapter selection, question and section indexes, source references, and software-version mappings. The database SHALL enforce foreign keys and be usable as one closed file without a required WAL sidecar. Source excerpts SHALL be rendered as inert text.

#### Scenario: Cross-artifact consistency
- **WHEN** a new-format fixture release is verified
- **THEN** its current and historical edition IDs, question states, source references and version mappings agree across JSON, SQLite and generated pages

## REMOVED Requirements

### Requirement: Source metadata release without originals
**Reason**: Its old-format release compatibility and Claim-centered examples are retired.
**Migration**: Use Source metadata in chapter releases; old release readers need no adapter.

### Requirement: Reviewed facts and visible uncertainty
**Reason**: Accepted/disputed Claim projection and Coverage rows are replaced by chapter prose and question-level states.
**Migration**: Publish validated chapter editions, question indexes and source references.

## ADDED Requirements

### Requirement: Source metadata in chapter releases
New releases SHALL include validated official source, snapshot, artifact and displayable source-reference metadata in canonical JSON and SQLite while excluding archived originals and submodule contents. Fixed-source chapters MAY publish without any mapped software version. The new reader and verifier SHALL operate on the new schema without a compatibility requirement for old Claim-based releases.

#### Scenario: Source-only chapter
- **WHEN** a chapter cites a fixed official document without a software-version mapping
- **THEN** its release preserves source scope and prose without asserting a verified package version

### Requirement: Current and historical chapter index
A new-format release SHALL explicitly select one current edition for every published harness-topic and retain referenced historical editions for version lookup. Changing only software-version mapping SHALL create a new release that can reuse the same immutable chapter edition. A failed validation or verification SHALL keep the previous current pointer unchanged.

#### Scenario: Mapping-only update
- **WHEN** a fixed source provides a new defensible mapping to an unchanged chapter edition
- **THEN** a new release carries that mapping and references the same edition without rewriting its Markdown
