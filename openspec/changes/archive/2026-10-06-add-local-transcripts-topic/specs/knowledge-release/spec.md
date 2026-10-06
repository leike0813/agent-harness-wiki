## MODIFIED Requirements

### Requirement: Deterministic offline compilation
The local release compiler SHALL compile an explicitly selected dataset profile, release ID, and publication time into `knowledge.json`, `knowledge.sqlite`, generated Markdown, and `manifest.json`. Local chapter editions and release records SHALL use chapter schema version 3 and builder version 7, while catalog metadata and registry records keep schema version 1. The normalized JSON and Markdown bytes and SQLite logical rows SHALL be identical for identical validated inputs and release parameters. The build SHALL not access upstream networks, run harnesses, or read user configuration. Independently identified online projections SHALL follow the online-knowledge-release contract rather than require local SQLite or semantic artifacts.

#### Scenario: Repeated fixture build
- **WHEN** the same fictional dataset is compiled twice with equal release parameters into separate roots
- **THEN** the normalized JSON, generated Markdown, manifest, and SQLite logical rows match

## ADDED Requirements

### Requirement: Frozen builder verification
Local releases with chapter schema 3 and builder 6 SHALL remain readable and fully verifiable against that builder's frozen Markdown rendering. Builder 7 SHALL render product overviews from actual current topics. Verification SHALL select rendering by manifest builder identity and SHALL NOT rewrite immutable release files.

#### Scenario: Existing builder 6 release
- **WHEN** a builder 6 release is opened after topic expansion
- **THEN** its hashes, database and Markdown are verified using builder 6 rendering without mutation

#### Scenario: New builder 7 release
- **WHEN** a release is compiled with missing uninvestigated topics
- **THEN** its manifest identifies builder 7 and its Markdown matches its actual current chapter set
