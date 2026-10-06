# dataset-validation Specification

## Purpose

Validates structured knowledge inputs before they can become a release, rejecting malformed records and unsupported conclusions while preserving legitimate unknown, partial, and disputed investigation states.

## Requirements

### Requirement: Bounded YAML input and schema validation
The system SHALL load only explicit dataset files within the selected root, reject duplicate YAML keys, unknown fields, unsupported tags, oversized input, and unsafe relative paths, and validate each record against its declared schema version, including catalog metadata and registry records at schema version 1, chapter source references at schema version 2, and chapter editions and release records at schema version 3. It SHALL export JSON Schema from the same record schemas used for runtime validation.

#### Scenario: Malformed YAML record
- **WHEN** a record contains a duplicate key or an unrecognized field
- **THEN** validation fails with a diagnostic naming the file and field location

#### Scenario: Wrong record schema version
- **WHEN** a chapter record declares an unsupported schema version
- **THEN** validation fails and names the expected version

### Requirement: Production provenance validation
The validator SHALL check official source kinds, artifact ID uniqueness, snapshot-to-source and snapshot-to-artifact references, matching product identity, a declared catalog product for every registry record, a declared catalog surface for every surface-scoped record, content and commit identities, and safe relative archive and checkout paths. Production validation SHALL be possible from tracked metadata without requiring ignored originals or network access.

#### Scenario: Cross-harness artifact
- **WHEN** a snapshot references an artifact owned by another harness
- **THEN** validation fails with a relationship diagnostic

#### Scenario: Missing local archive during offline build
- **WHEN** tracked production metadata is valid but an ignored original is absent locally
- **THEN** ordinary offline validation can succeed while the explicit local source audit reports the missing original

#### Scenario: Registry product absent from the catalog
- **WHEN** a registry record names a product the catalog does not declare
- **THEN** validation fails with a relationship diagnostic

#### Scenario: Unknown surface
- **WHEN** a section, answer, or mapping names a surface absent from its product
- **THEN** validation fails with a relationship diagnostic

### Requirement: Chapter diagnostics
Validation SHALL distinguish schema, relationship, semantic, and publishability errors from warnings. Each diagnostic SHALL contain a stable code, severity, file or record, field location, reason, and actionable hint. An invalid dataset SHALL not return a valid normalized dataset.

#### Scenario: Missing question source
- **WHEN** an answered question cites a missing source reference
- **THEN** validation returns a publishability diagnostic pointing to that chapter edition and question

### Requirement: Chapter structural and source validation
Before publication, validation SHALL require every fixed question of each chapter's topic exactly once, valid states and section IDs, non-empty surface sets that name declared surfaces, answers whose surfaces lie inside their located section, and resolvable source references for answered conclusions with a marker in the referenced section. Overlapping answers for one surface SHALL be rejected, while a declared surface with no answer SHALL NOT be an error because a read reports it as not_investigated. Partial, unknown, not_applicable and conflict SHALL retain an explanation. Unsafe active markup, missing snapshots, cross-product citations and invalid locator metadata SHALL fail with file-specific diagnostics.

#### Scenario: Unrelated citation in shared section
- **WHEN** a question cites a source reference absent from its located section
- **THEN** validation rejects the chapter even if another question in that section cites the reference

#### Scenario: Honest partial answer
- **WHEN** a question contains a cited known mechanism and a concrete remaining gap
- **THEN** its partial state remains publishable without inventing an unsupported conclusion

#### Scenario: Unanswered declared surface
- **WHEN** a chapter declares a surface but answers no question for it
- **THEN** validation passes and a whole-product read reports that surface as not_investigated

#### Scenario: Overlapping answers
- **WHEN** one question has two answers covering the same surface
- **THEN** validation rejects the overlap

### Requirement: Software mapping validation
A software-version mapping SHALL identify its cited fixed source, its surface, and its exact software version. Validation SHALL reject unsupported version extrapolation, mismatched product or surface identities, and whole-chapter mappings that omit a section. A whole-chapter mapping SHALL cover every section of its surface, and its surface kind SHALL match the mapped package snapshot's surface. Unknown package applicability SHALL remain valid chapter data without a mapping.

#### Scenario: Source-only chapter
- **WHEN** a chapter cites an official document whose package applicability is unknown
- **THEN** the chapter can publish as fixed-source knowledge but no exact package mapping is created

#### Scenario: Surface mismatch
- **WHEN** a mapping names a surface that belongs to another product
- **THEN** validation rejects the mapping

### Requirement: Gradual topic coverage and current selection integrity
Validation SHALL permit a registered product to omit topics for which it has no chapter editions. Each authored product-topic pair SHALL have exactly one current selection identifying its own edition. Each registered product SHALL have at least one current chapter. Authored chapters SHALL retain the complete fixed question index and existing source validation.

#### Scenario: New topic not investigated
- **WHEN** an existing registered product has current knowledge but no local_transcripts edition
- **THEN** validation succeeds without adding a placeholder chapter

#### Scenario: Authored topic without current selection
- **WHEN** a product has a topic edition but no current selection for that topic
- **THEN** validation fails with CURRENT_MISSING

#### Scenario: Registered product without knowledge
- **WHEN** a registered product has no current chapter
- **THEN** validation fails with CURRENT_MISSING
