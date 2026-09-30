# chapter-update-workflow Specification

## Purpose

Defines the maintainer-invoked path from fixed upstream source observation through question-level chapter revision, Agent self-check, conditional independent review, and atomic local publication.

## Requirements

### Requirement: Source-specific impact analysis
A manual update SHALL observe registered Git HEAD, official documentation content and npm version and integrity as separate identities. It SHALL trace relevant differences to question IDs, stable sections, source references, affected surfaces and cross-topic links. A new package version alone SHALL NOT assert that a chapter changed or that a source commit maps to the package. Unknown impact or shared loading-path changes SHALL widen investigation with a recorded reason.

#### Scenario: New npm version, unchanged source knowledge
- **WHEN** only the registered package version changes without reader-visible chapter or mapping evidence
- **THEN** the audit records the new package identity but no new knowledge release is required

#### Scenario: Shared backend change
- **WHEN** a change affects a mechanism shared by several surfaces
- **THEN** the update widens to every affected surface and records which surfaces it rechecked

### Requirement: Agent review and conflict handling
The investigating Agent SHALL cite fixed sources and self-check ordinary updates. An unresolved source conflict, reversal of a published configuration step, or key loading mechanism spanning topics SHALL receive independent second-Agent review before its affected question is published. Scope differences SHALL be checked first; unresolved conflict SHALL publish competing source-bound accounts without a single recommendation once review is complete. Pending review SHALL keep that question out of the update.

#### Scenario: Conflicting loading rule
- **WHEN** a new document contradicts a published source-based loading rule
- **THEN** the affected question is held for independent review while unrelated completed sections may proceed

### Requirement: Automatic completed-content publication
A manually invoked update SHALL validate changed chapter editions, source references, version mappings and release artifacts, then create and select a new immutable local release for completed reader-visible changes without a human acceptance gate. A blocked question or source SHALL retain its previous published chapter scope and pending audit; other completed chapters MAY publish. A failure SHALL leave the previous current release selected.

#### Scenario: One product blocked
- **WHEN** one product has an unresolved source conflict and another has a completed cited chapter update
- **THEN** the completed update may enter a new release while the blocked product retains its old edition and audit blocker

### Requirement: Independent managed refresh
In ID mode, a manual update SHALL invoke the managed-binary Skill once for every requested registered harness ID, even when all registered sources are unchanged or the knowledge audit needs no new release. In direct fixed-source mode, it SHALL invoke that Skill only when the maintainer explicitly requests binary verification. Binary outcomes SHALL be reported separately and SHALL NOT block validated knowledge publication.

#### Scenario: Unchanged sources for multiple products
- **WHEN** the maintainer requests two registered IDs and both source scans report no change
- **THEN** the maintenance Skill still checks each product's latest managed binary once and completes both audits without a knowledge release

#### Scenario: Direct question without binary request
- **WHEN** the maintainer asks a question about a pinned source without asking for binary verification
- **THEN** the maintenance Skill investigates that source without invoking the managed-binary Skill

#### Scenario: Binary fails, chapter succeeds
- **WHEN** a changed official document yields a valid chapter update but the managed binary cannot start
- **THEN** the knowledge release can switch while the prior runnable binary remains selected and the binary failure is reported separately
