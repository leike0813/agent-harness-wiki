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
Each captured original SHALL have a stable artifact ID, official source identity, kind, safe location and content identity. Archived document and npm package bytes SHALL remain outside Git and query releases. Pinned official source checkouts SHALL use Git submodules; candidate revisions MAY use isolated archive checkouts without moving those submodules. An explicit offline audit SHALL verify available original bytes and checkout identity without fetching or executing sources. Ordinary chapter validation and query SHALL use tracked metadata and published source references without requiring ignored originals.

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
- **THEN** its snapshot can identify a file in an isolated checkout at that commit without changing the pinned submodule

### Requirement: Exact npm release provenance
An official npm package snapshot SHALL bind package name, exact version, registry integrity, distribution identity, capture time, and one managed package artifact. Package provenance SHALL remain separate from Git source commits and unversioned documentation. A chapter or section SHALL be mapped to that package release only when the cited mapping evidence establishes the association.

#### Scenario: Repository tag and package version
- **WHEN** a Git tag and an npm package report the same-looking version but no verified build mapping exists
- **THEN** the Git snapshot does not establish that package's behavior or create a software-version mapping

### Requirement: Candidate-safe executable retention
The project-owned package set SHALL identify the selected runnable version and locked dependency set for each registered npm CLI. Candidate bytes SHALL remain separate until identity and isolated startup succeed; only then may the selected identity and package bytes change. Retiring older executable bytes SHALL NOT alter a published chapter's fixed source references or imply that another version has been checked.

#### Scenario: Failed replacement
- **WHEN** a new candidate cannot start in the required sandbox
- **THEN** the current package set and its runnable entry remain available

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
