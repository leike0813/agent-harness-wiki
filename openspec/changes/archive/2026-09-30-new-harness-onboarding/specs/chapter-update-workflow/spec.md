# Spec Delta

## MODIFIED Requirements

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
