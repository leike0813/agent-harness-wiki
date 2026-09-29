# dataset-validation Specification

## Purpose

Validates structured knowledge inputs before they can become a release, rejecting malformed records and unsupported conclusions while preserving legitimate unknown, partial, and disputed investigation states.

## Requirements

### Requirement: Bounded YAML input and schema validation
The system SHALL load only explicit dataset files within the selected root, reject duplicate YAML keys, unknown fields, unsupported tags, oversized input, and unsafe relative paths, and validate each record against its declared schema version. It SHALL export JSON Schema from the same record schemas used for runtime validation.

#### Scenario: Malformed YAML record
- **WHEN** a record contains a duplicate key or an unrecognized field
- **THEN** validation fails with a diagnostic naming the file and field location

### Requirement: Production provenance validation
The validator SHALL check official source kinds, artifact ID uniqueness, snapshot-to-source and snapshot-to-artifact references, matching harness identity, content and commit identities, and safe relative archive and checkout paths. Production validation SHALL be possible from tracked metadata without requiring ignored originals or network access.

#### Scenario: Cross-harness artifact
- **WHEN** a snapshot references an artifact owned by another harness
- **THEN** validation fails with a relationship diagnostic

#### Scenario: Missing local archive during offline build
- **WHEN** tracked production metadata is valid but an ignored original is absent locally
- **THEN** ordinary offline validation can succeed while the explicit local source audit reports the missing original

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
