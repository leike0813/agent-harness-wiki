# Spec Delta

## MODIFIED Requirements

### Requirement: Source-specific impact analysis
A manual update SHALL observe registered Git HEAD, official documentation content and npm version and integrity as separate identities. It SHALL trace relevant differences to question IDs, stable sections, source references, affected surfaces and cross-topic links. A new package version alone SHALL NOT assert that a chapter changed or that a source commit maps to the package. Unknown impact or shared loading-path changes SHALL widen investigation with a recorded reason.

#### Scenario: New npm version, unchanged source knowledge
- **WHEN** only the registered package version changes without reader-visible chapter or mapping evidence
- **THEN** the audit records the new package identity but no new knowledge release is required

#### Scenario: Shared backend change
- **WHEN** a change affects a mechanism shared by several surfaces
- **THEN** the update widens to every affected surface and records which surfaces it rechecked
