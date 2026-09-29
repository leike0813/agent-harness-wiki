# Spec Delta

## REMOVED Requirements

### Requirement: Fixed first-wave catalog
**Reason**: Its 35 exact Target-topic Coverage records are replaced by current chapter editions.
**Migration**: Keep the five distinct harness identities and require 35 product-topic chapters.

### Requirement: Traceable seven-topic investigations
**Reason**: Coverage handoff and its Target-topic matrix are superseded by chapter question indexes and fixed source references.
**Migration**: Investigate all 53 questions per product and record local findings or gaps in chapters.

### Requirement: Human semantic acceptance
**Reason**: The user removed per-Claim human acceptance as a publication gate.
**Migration**: Use Agent self-check, conditional second-Agent review and source/structure validation recorded in audits.

## ADDED Requirements

### Requirement: First-wave chapter catalog
Codex CLI, Claude Code, OpenCode, Pi and OMP SHALL remain distinct harness identities. Each SHALL publish seven current topic chapters using its own fixed official sources, with all fixed question IDs accounted for and no unsupported package-version extrapolation.

#### Scenario: Five-product release
- **WHEN** first-wave production knowledge is published
- **THEN** the release has 35 current product-topic chapters and 53 question states per product, with Pi and OMP kept separate
