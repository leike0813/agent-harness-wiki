# Spec Delta

## Purpose

Validates structured knowledge inputs before they can become a release, rejecting malformed records and unsupported conclusions while preserving legitimate unknown, partial, and disputed investigation states.

## ADDED Requirements

### Requirement: Bounded YAML input and schema validation
The system SHALL load only explicit dataset files within the selected root, reject duplicate YAML keys, unknown fields, unsupported tags, oversized input, and unsafe relative paths, and validate each record against its declared schema version. It SHALL export JSON Schema from the same record schemas used for runtime validation.

#### Scenario: Malformed YAML record
- **WHEN** a record contains a duplicate key or an unrecognized field
- **THEN** validation fails with a diagnostic naming the file and field location

### Requirement: Cross-record integrity
The system SHALL reject duplicate IDs, missing references, invalid claim/evidence/assessment relationships, incompatible Targets, and cycles in claim replacement relationships. Accepted substantive claims SHALL have evidence and a review record; disputed claims SHALL remain disputed rather than becoming unconditional support.

#### Scenario: Accepted claim lacks evidence
- **WHEN** an accepted claim references missing evidence
- **THEN** validation reports a relationship error and the dataset is not publishable

#### Scenario: Conflicting evidence
- **WHEN** supporting and refuting evidence remain unresolved and an assessment marks the claim disputed
- **THEN** validation preserves the dispute instead of selecting the first evidence item as fact

### Requirement: Exact version and condition boundary
The M0 validator SHALL accept only an exact, explicitly stated version identity. It SHALL reject a claim that extends to an unverified version or contradicts its Target or conditions. Missing condition values and partial or unknown coverage SHALL be valid data rather than schema failures.

#### Scenario: Unsupported extrapolation
- **WHEN** a claim attempts to cover all later versions from one checked version
- **THEN** validation rejects its version applicability

### Requirement: Actionable diagnostics
Validation SHALL distinguish schema, relationship, semantic, and publishability errors from warnings. Each diagnostic SHALL contain a stable code, severity, file or record, field location, reason, and actionable hint. An invalid dataset SHALL not return a valid normalized dataset.

#### Scenario: Missing assessment
- **WHEN** an accepted claim has no accepting assessment
- **THEN** validation returns a publishability diagnostic pointing to that claim and its assessment field
