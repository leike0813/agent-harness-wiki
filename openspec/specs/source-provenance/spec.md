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
Each captured original SHALL have a stable artifact ID, source reference, kind, safe location, and content identity. Archived document bytes SHALL remain outside Git and query releases; an available official source checkout SHALL be represented by a Git submodule pinned to its recorded commit. The system SHALL support an explicit offline audit of local archive bytes and checkout identity without fetching or executing sources.

#### Scenario: Archived document differs from metadata
- **WHEN** a local archived document's bytes differ from its recorded hash
- **THEN** the source audit fails and identifies the artifact

#### Scenario: Original absent on a query machine
- **WHEN** a verified release is opened without the local source archive
- **THEN** published metadata and reviewed facts remain queryable without reading or recreating that archive
