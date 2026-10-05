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

### Requirement: Isolated maintenance workers and aggregate delivery
Maintenance SHALL accept `role=coordinator|worker` with coordinator as default and `delivery=local|pr` with local as default. The coordinator SHALL pin observations before preparing independent product candidates and decide worker/reviewer concurrency. Workers SHALL edit only their candidate and return changes, completed and blocked questions, selection proposals, audits, review needs and workspace IDs. They SHALL NOT rescan, publish or refresh managed binaries. The coordinator SHALL generate a validated temporary merge, check before-values and integrate through native editing tools after all workers/reviewers stop. Stale product baselines and identity collisions SHALL reject the affected candidate while retaining valid completed products. Local delivery SHALL stage and publish once after aggregation; PR delivery SHALL leave reviewed Git changes. Managed package-set mutation SHALL remain separately locked and sequential.

#### Scenario: Two products update shared selections
- **WHEN** isolated workers select new editions for two products
- **THEN** the coordinator merges both product/topic selections and preserves all other selections

#### Scenario: One worker has a half-written file
- **WHEN** one candidate contains incomplete YAML while another is finished
- **THEN** the finished candidate can validate independently and the incomplete candidate is not integrated

### Requirement: Automatic completed-content publication
A manually invoked update SHALL validate changed chapter editions, source references, version mappings and release artifacts, then create and select a new immutable local release for completed reader-visible changes without a human acceptance gate. A blocked question or source SHALL retain its previous published chapter scope and pending audit; other completed chapters MAY publish. A failure SHALL leave the previous current release selected. A delegated pull-request delivery round SHALL instead stop after investigation, self-check, audit and report: it SHALL NOT select a new release, change the current pointer or run the local publication commands, and it SHALL NOT require a maintainer publication step once the request is merged.

#### Scenario: One product blocked
- **WHEN** one product has an unresolved source conflict and another has a completed cited chapter update
- **THEN** the completed update may enter a new release while the blocked product retains its old edition and audit blocker

#### Scenario: Pull-request delivery round
- **WHEN** a delegated round completes a valid chapter update in pull-request mode
- **THEN** the update is left as a reviewed change, no release is selected, and the existing publication pipeline continues from the merge without a follow-up maintainer step

### Requirement: Independent managed refresh
In ID mode, a manual update SHALL invoke the managed-binary Skill once for every requested registered harness ID, even when all registered sources are unchanged or the knowledge audit needs no new release. In direct fixed-source mode, it SHALL invoke that Skill only when the maintainer explicitly requests binary verification. A delegated pull-request delivery round SHALL NOT invoke the managed-binary Skill. Binary outcomes SHALL be reported separately and SHALL NOT block validated knowledge publication.

#### Scenario: Unchanged sources for multiple products
- **WHEN** the maintainer requests two registered IDs and both source scans report no change
- **THEN** the maintenance Skill still checks each product's latest managed binary once and completes both audits without a knowledge release

#### Scenario: Direct question without binary request
- **WHEN** the maintainer asks a question about a pinned source without asking for binary verification
- **THEN** the maintenance Skill investigates that source without invoking the managed-binary Skill

#### Scenario: Binary fails, chapter succeeds
- **WHEN** a changed official document yields a valid chapter update but the managed binary cannot start
- **THEN** the knowledge release can switch while the prior runnable binary remains selected and the binary failure is reported separately

#### Scenario: Managed refresh in a pull-request round
- **WHEN** a delegated round delivers a chapter update for a product
- **THEN** no managed binary check runs in that round and merging does not trigger one
