# Spec Delta

## MODIFIED Requirements

### Requirement: Persistent original boundary

Each captured original SHALL have a stable artifact ID, official source identity, kind, safe location and content identity. Archived document and npm package bytes SHALL remain outside Git and query releases and SHALL be retained. New Git originals SHALL be read from a project-external temporary checkout pinned to an exact commit and SHALL be recorded with that commit, file and content hash but without a checkout path; existing checkout-path records and their retained originals SHALL remain readable and auditable. Catalog Git snapshots SHALL include an exact revision and content hash; their archive path is optional. An explicit offline audit SHALL report every record as `verified` or `not_retained` without fetching or executing sources; `not_retained` denotes a deliberately metadata-only record and SHALL NOT be reported as successful verification of original bytes, while a missing required original or a hash mismatch SHALL remain an error. Ordinary chapter validation, query and build SHALL use tracked metadata and published source references without requiring ignored originals.

#### Scenario: Archived document differs from metadata

- **WHEN** a local archived document's bytes differ from its recorded hash
- **THEN** the explicit source audit fails and identifies the artifact

#### Scenario: Original absent on a query machine

- **WHEN** a verified new-format release is opened without the local source archive
- **THEN** its chapter and source-reference metadata remain queryable without reading or recreating that archive

#### Scenario: Package file candidate

- **WHEN** a chapter source reference cites text from an exact npm package file
- **THEN** its fixed snapshot identifies that package and the explicit local audit can check the retained original when available

#### Scenario: Git candidate

- **WHEN** a chapter source reference cites a new source commit
- **THEN** its snapshot identifies the file by commit, file and content hash in a project-external temporary pinned checkout, records no checkout path, and changes no submodule pointer

#### Scenario: Catalog Git reference without an archive

- **WHEN** a catalog Git reference declares no archive path
- **THEN** it carries an exact revision and hash, while its archive path is optional

#### Scenario: Metadata-only original audited offline

- **WHEN** the offline audit reaches a record that intentionally keeps only identity metadata
- **THEN** it reports `not_retained` for that record and does not count it as a verified original

#### Scenario: Required original missing

- **WHEN** an original that must be retained is absent, or its bytes differ from the recorded hash
- **THEN** the audit fails and identifies the record instead of reporting a metadata-only status
