# Spec Delta

## REMOVED Requirements

### Requirement: Actionable diagnostics
**Reason**: Its assessment-only example is obsolete under chapter publication.
**Migration**: Use Chapter diagnostics, retaining stable codes and actionable locations.

### Requirement: Cross-record integrity
**Reason**: Claim/Evidence/Assessment links and Claim replacement cycles cease to be the knowledge publication graph.
**Migration**: Validate chapter, question, section, source-reference and software-version mapping links.

### Requirement: Exact version and condition boundary
**Reason**: Per-Claim exact Target applicability and declarative condition predicates are no longer the chapter model.
**Migration**: Keep platform and conditions in chapter prose; require explicit evidence for each software-version mapping.

### Requirement: Unknown document applicability cannot verify a version
**Reason**: The old exact-Target Claim acceptance gate is retired.
**Migration**: Reject a software-version mapping when its only basis is an unversioned document or unrelated source commit.

### Requirement: Package and investigation integrity
**Reason**: Coverage investigation references are retired with the Claim-centered input model.
**Migration**: Validate fixed source and package snapshot identities and chapter source references.

## ADDED Requirements

### Requirement: Chapter diagnostics
Validation SHALL distinguish schema, relationship, semantic, and publishability errors from warnings. Each diagnostic SHALL contain a stable code, severity, file or record, field location, reason, and actionable hint. An invalid dataset SHALL not return a valid normalized dataset.

#### Scenario: Missing question source
- **WHEN** an answered question cites a missing source reference
- **THEN** validation returns a publishability diagnostic pointing to that chapter edition and question

### Requirement: Chapter structural and source validation
Before publication, validation SHALL require every fixed question of each chapter's topic exactly once, valid states and section IDs, resolvable source references for answered conclusions, and a marker in the referenced section for each question-level citation. Partial, unknown, not_applicable, and conflict SHALL retain an explanation. Unsafe active markup, missing snapshots, cross-product citations and invalid locator metadata SHALL fail with file-specific diagnostics.

#### Scenario: Unrelated citation in shared section
- **WHEN** a question cites a source reference absent from its located section
- **THEN** validation rejects the chapter even if another question in that section cites the reference

#### Scenario: Honest partial answer
- **WHEN** a question contains a cited known mechanism and a concrete remaining gap
- **THEN** its partial state remains publishable without inventing an unsupported conclusion

### Requirement: Software mapping validation
A software-version mapping SHALL identify its cited fixed source and exact software version. Validation SHALL reject unsupported version extrapolation, mismatched product identities, and whole-chapter mappings that omit a section; unknown package applicability SHALL remain valid chapter data without a mapping.

#### Scenario: Source-only chapter
- **WHEN** a chapter cites an official document whose package applicability is unknown
- **THEN** the chapter can publish as fixed-source knowledge but no exact package mapping is created
