## MODIFIED Requirements

### Requirement: Persistent original boundary
Each captured original SHALL have a stable artifact ID, source reference, kind, safe location, and content identity. Archived document and npm package bytes SHALL remain outside Git and query releases. Pinned official source checkouts SHALL use Git submodules; candidate revisions MAY use isolated archive checkouts without moving those submodules. The system SHALL support an explicit offline audit of local archive bytes and checkout identity without fetching or executing sources. Validation SHALL bind archived package files and isolated Git files to their Source, exact version or commit, safe harness-local location, and selected file hash.

#### Scenario: Archived document differs from metadata
- **WHEN** a local archived document's bytes differ from its recorded hash
- **THEN** the source audit fails and identifies the artifact

#### Scenario: Original absent on a query machine
- **WHEN** a verified release is opened without the local source archive
- **THEN** published metadata and reviewed facts remain queryable without reading or recreating that archive

#### Scenario: Package file candidate
- **WHEN** a draft Evidence cites a new npm release
- **THEN** its Snapshot may reference an archived package file whose integrity, version, and file hash are checked against the retained original.

#### Scenario: Git candidate
- **WHEN** a draft Evidence cites a new source commit
- **THEN** its Snapshot may reference a file in an isolated checkout at that exact commit without changing the pinned submodule.
