# Spec Delta

## MODIFIED Requirements

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
