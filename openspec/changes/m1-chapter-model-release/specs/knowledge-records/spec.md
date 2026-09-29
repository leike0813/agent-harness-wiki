# Spec Delta

## REMOVED Requirements

### Requirement: Explicit identity and scope
**Reason**: Per-Claim and per-Coverage complete Targets are replaced by chapter editions, fixed source scopes and separate software-version mappings.
**Migration**: Use topic-chapters edition, section and version-mapping identities.

### Requirement: Typed assertions and conditions
**Reason**: Chapter prose carries mechanisms, paths and conditions; the knowledge store no longer requires a typed assertion for each sentence.
**Migration**: Put applicability and configuration detail in cited chapter sections.

### Requirement: Separate evidence, review, and coverage states
**Reason**: Per-Claim review and Coverage records are no longer publication gates.
**Migration**: Use question status, cited source references and update audit review records.

### Requirement: Package snapshot and investigation links
**Reason**: Package snapshots remain source metadata, while Coverage-to-Snapshot and Claim-to-Evidence links are retired.
**Migration**: Cite published source references from chapter questions and sections, and create a separate software-version mapping only with evidence.

## ADDED Requirements

### Requirement: Chapter and source identities
Harnesses, snapshots, chapter editions, section IDs, question IDs, source references and version mappings SHALL have unambiguous identities. A chapter's product and topic identity SHALL agree with every referenced source's product, while a snapshot's source identity SHALL remain distinct from software-version applicability.

#### Scenario: Wrong product source
- **WHEN** a Pi question cites an OMP-only source reference
- **THEN** the dataset rejects the cross-product link rather than publishing a Pi conclusion
