# Spec Delta

## MODIFIED Requirements

### Requirement: Deterministic offline compilation
The system SHALL compile an explicitly selected dataset profile, release ID, and publication time into `knowledge.json`, `knowledge.sqlite`, generated Markdown, and `manifest.json`. New chapter editions and release records SHALL use chapter schema version 3 and builder version 6, while catalog metadata and registry records keep schema version 1. The normalized JSON and Markdown bytes and SQLite logical rows SHALL be identical for identical validated inputs and release parameters. The build SHALL not access upstream networks, run harnesses, or read user configuration.

#### Scenario: Repeated fixture build
- **WHEN** the same fictional dataset is compiled twice with equal release parameters into separate roots
- **THEN** the normalized JSON, generated Markdown, manifest, and SQLite logical rows match

### Requirement: Integrity and immutable publication
The manifest SHALL bind schema and builder versions, profile, release ID, publication time, normalized input digest, and hashes of every publishable artifact except itself. The system SHALL verify file hashes and database integrity before making a release current. A failed build or verification SHALL leave the prior current release unchanged; an existing release ID SHALL not be overwritten. Frozen deterministic and hash checks SHALL apply to the new schema baseline; a release of an older chapter schema SHALL be verified for intactness only and SHALL NOT be rewritten or migrated in place.

#### Scenario: Damaged new release
- **WHEN** a staged artifact is corrupted before publication
- **THEN** verification fails and the previous current pointer still selects its intact release

#### Scenario: Existing release ID
- **WHEN** compilation requests an ID already present under the release root
- **THEN** compilation fails without changing the existing directory or current pointer

#### Scenario: Old-format release
- **WHEN** verification encounters a release of the previous chapter schema
- **THEN** it confirms the release is intact and leaves its files unmodified

### Requirement: Consistent release views
JSON, SQLite, and generated Markdown SHALL derive from one normalized published chapter set. SQLite SHALL expose the catalog with its products, surfaces, runtime entities and bindings, chapter editions, current and historical chapter selection, question and section indexes, source references, and software-version mappings. The database SHALL enforce foreign keys and be usable as one closed file without a required WAL sidecar. Source excerpts SHALL be rendered as inert text.

#### Scenario: Cross-artifact consistency
- **WHEN** a new-format fixture release is verified
- **THEN** its current and historical edition IDs, question states, surfaces, source references and version mappings agree across JSON, SQLite and generated pages

### Requirement: Published discovery metadata
The release SHALL preserve validated source and snapshot metadata for discovered versions even when no reviewed claim references them, and SHALL embed the catalog so catalog-scoped listing and candidate identities are available from the release alone. Discovery metadata SHALL not by itself create a supported claim or imply runtime verification.

#### Scenario: Discovered unverified version
- **WHEN** a newer version has a validated source snapshot and only not_started coverage
- **THEN** the release retains its version and observation time while publishing no supported fact for it

#### Scenario: Catalog available offline
- **WHEN** a registered release is opened without the build tree
- **THEN** catalog-scoped listing returns the declared products, surfaces, runtime entities and bindings
