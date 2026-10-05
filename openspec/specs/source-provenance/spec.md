# source-provenance Specification

## Purpose

Tracks fixed official source snapshots and locally retained originals so research can distinguish a repository revision, a mutable documentation page, and an independently verified product release.

## Requirements

### Requirement: Fixed official source identity
The system SHALL identify an official Git repository or official documentation URL separately from a captured snapshot. A Git snapshot SHALL bind a full commit identity and a source-tree Target. A documentation snapshot SHALL retain requested and resolved URLs, capture time, raw content hash, extraction identity, and explicitly unknown software-version applicability when no version is stated.

#### Scenario: Unversioned official document
- **WHEN** an official CLI documentation page has no precise CLI release applicability
- **THEN** its snapshot remains unversioned and does not discover or verify a CLI release

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

### Requirement: Shared coordinator ownership for isolated maintenance
Parallel maintenance source workspaces SHALL be registered to the original project root and a long-lived coordinator PID, with unique workspace IDs recorded per task. Isolated candidate roots SHALL NOT become owning project identities. Investigation and independent review SHALL use the same fixed source identity. The coordinator SHALL wait for every worker and reviewer to stop before aggregate integration and round cleanup; waiting timeout SHALL NOT authorize removal of a still-used workspace or candidate.

#### Scenario: Reviewer still reads a fixed source
- **WHEN** investigation has finished but its reviewer is still using the source workspace
- **THEN** the workspace and candidate remain retained until that reviewer stops

### Requirement: Exact npm release provenance
An official npm package snapshot SHALL bind package name, exact version, registry integrity, distribution identity, capture time, and one managed package artifact. Package provenance SHALL remain separate from Git source commits and unversioned documentation. A chapter or section SHALL be mapped to that package release only when the cited mapping evidence establishes the association.

#### Scenario: Repository tag and package version
- **WHEN** a Git tag and an npm package report the same-looking version but no verified build mapping exists
- **THEN** the Git snapshot does not establish that package's behavior or create a software-version mapping

### Requirement: Candidate-safe executable retention
The project-owned package set SHALL identify selected exact versions and locked dependencies through local manifest and lock files. Bytes SHALL use the active local or NFS layout. In NFS mode complete snapshots SHALL remain at stable `candidates/<UUID>/` locations after promotion; `current` SHALL only select a snapshot and SHALL NOT serve as fixed provenance. Historical and failed candidates SHALL NOT be automatically deleted. Storage location SHALL NOT change published source identity or imply version verification.

#### Scenario: Failed replacement
- **WHEN** a new candidate cannot start in the required sandbox
- **THEN** the current package set and its runnable entry remain available

#### Scenario: Current pointer changes
- **WHEN** a new verified NFS snapshot becomes current
- **THEN** the previous complete snapshot and its fixed package identity remain retained, and published references do not follow the mutable pointer

### Requirement: Published source references
A publishable source reference SHALL resolve to one fixed official snapshot and a specific file, symbol or document location. It SHALL include an official link, a fixed snapshot identity, and a bounded displayable excerpt. The release SHALL also carry the catalog's own captured references for every catalog product, whether or not a chapter cites them, and those references SHALL carry a capture time, a snapshot identity, a locator and an excerpt. Source-reference identities and excerpts SHALL be available within the release without opening original archive bytes. A catalog reference alone SHALL NOT establish a capability fact or a software-version mapping.

#### Scenario: Read without original
- **WHEN** a query machine has the release but lacks its source archive
- **THEN** it can still return the citation's snapshot identity, locator, link and excerpt

#### Scenario: Catalog reference read
- **WHEN** a source is requested for a catalog product that no chapter cites
- **THEN** the release returns the catalog reference's snapshot identity, capture time, locator, link and excerpt

#### Scenario: No fact from a catalog reference
- **WHEN** only a catalog reference exists for a claimed capability
- **THEN** the claim remains unsupported
