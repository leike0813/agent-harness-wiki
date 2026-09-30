# Spec Delta

## MODIFIED Requirements

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
