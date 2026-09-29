# chapter-update-workflow Specification

## Purpose

Defines the maintainer-invoked path from fixed upstream source observation through question-level chapter revision, Agent self-check, conditional independent review, and atomic local publication.

## Requirements

### Requirement: Source-specific impact analysis
A manual update SHALL observe registered Git HEAD, official documentation content and npm version/integrity as separate identities. It SHALL trace relevant differences to question IDs, stable sections, source references and cross-topic links. A new package version alone SHALL NOT assert that a chapter changed or that a source commit maps to the package. Unknown impact or shared loading-path changes SHALL widen investigation with a recorded reason.

#### Scenario: New npm version, unchanged source knowledge
- **WHEN** only the registered package version changes without reader-visible chapter or mapping evidence
- **THEN** the audit records the new package identity but no new knowledge release is required

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
When the manual update observes a new registered package candidate, it SHALL attempt the separate managed-artifact-startup workflow in the same invocation. A failed or blocked executable refresh SHALL be recorded but SHALL NOT prevent validated knowledge publication.

#### Scenario: Binary fails, chapter succeeds
- **WHEN** a changed official document yields a valid chapter update but the candidate binary cannot start
- **THEN** the knowledge release can switch while the prior runnable binary remains selected
