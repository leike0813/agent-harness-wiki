# knowledge-release Specification

## Purpose

Turns reviewed structured knowledge into a fixed, verifiable local release that every future read-only interface can consume without contacting upstream sources.

## Requirements

### Requirement: Deterministic offline compilation
The system SHALL compile an explicitly selected dataset profile, release ID, and publication time into `knowledge.json`, `knowledge.sqlite`, generated Markdown, and `manifest.json`. The normalized JSON and Markdown bytes and SQLite logical rows SHALL be identical for identical validated inputs and release parameters. The build SHALL not access upstream networks, run harnesses, or read user configuration.

#### Scenario: Repeated fixture build
- **WHEN** the same fictional dataset is compiled twice with equal release parameters into separate roots
- **THEN** the normalized JSON, generated Markdown, manifest, and SQLite logical rows match

### Requirement: Reviewed facts and visible uncertainty
The release SHALL include accepted and disputed claims with their applicable Target, conditions, evidence, and assessment status. Draft and rejected claims SHALL NOT be exposed as published query facts. Coverage records, including incomplete coverage without claims, SHALL remain available. Generated fixture pages SHALL identify their fictional status and display disputes without asserting unconditional support.

#### Scenario: Uninvestigated version
- **WHEN** a fixture Target has `not_started` coverage and no accepted claim
- **THEN** the release retains that coverage and does not create an unsupported fact

#### Scenario: Unreviewed claim
- **WHEN** a valid dataset contains a draft or rejected claim
- **THEN** its assertion is absent from published query rows and generated fact pages

### Requirement: Integrity and immutable publication
The manifest SHALL bind schema and builder versions, profile, release ID, publication time, normalized input digest, and hashes of every publishable artifact except itself. The system SHALL verify file hashes and database integrity before making a release current. A failed build or verification SHALL leave the prior current release unchanged; an existing release ID SHALL not be overwritten.

#### Scenario: Damaged new release
- **WHEN** a staged artifact is corrupted before publication
- **THEN** verification fails and the previous current pointer still selects its intact release

#### Scenario: Existing release ID
- **WHEN** compilation requests an ID already present under the release root
- **THEN** compilation fails without changing the existing directory or current pointer

### Requirement: Consistent release views
JSON, SQLite, and generated Markdown SHALL derive from one normalized published data set. SQLite SHALL expose exact Target and topic fields, retain record relationships, enforce foreign keys, and provide an FTS5 candidate index for the later query service. The database SHALL be usable as one closed file without a required WAL sidecar. Source excerpts SHALL be rendered as inert text.

#### Scenario: Cross-artifact consistency
- **WHEN** a fixture release is verified
- **THEN** its claim, evidence, assessment, and coverage identities agree between JSON, SQLite, and the generated pages

### Requirement: Published discovery metadata
The release SHALL preserve validated source and snapshot metadata for discovered versions even when no reviewed claim references them. Discovery metadata SHALL not by itself create a supported claim or imply runtime verification.

#### Scenario: Discovered unverified version
- **WHEN** a newer version has a validated source snapshot and only not_started coverage
- **THEN** the release retains its version and observation time while publishing no supported fact for it
