# upstream-incremental-audit Specification

## Purpose

TBD - Update Purpose after archive

## Requirements

### Requirement: Registered on-demand observation
The system SHALL accept one or more registered harness IDs and inspect only their registered npm, Git, and official documentation Sources when explicitly invoked.

#### Scenario: Multiple harnesses
- **WHEN** a maintainer invokes the scanner with two registered harness IDs
- **THEN** each harness receives an independent audit record covering its registered Sources.

### Requirement: Durable audit history
The system SHALL write a schema-validated Git-tracked audit record for every invocation, including unchanged and partially failed scans. The record SHALL include the baseline and observed source identities, timestamps, status, and affected topic and Claim references. Audit records SHALL not enter KnowledgeRelease.

#### Scenario: No source changed
- **WHEN** all current observations match their baselines
- **THEN** the invocation writes a no-change audit record and does not create knowledge candidates.

#### Scenario: One source fails
- **WHEN** one Source cannot be observed
- **THEN** the record marks that Source blocked and retains the successful observations of other Sources.

### Requirement: Isolated candidates
New npm package bytes SHALL be integrity-checked and stored in ignored archive space without installation, extraction, lifecycle execution, or replacement of the pinned package set. Changed Git revisions SHALL use an isolated checkout without moving submodule pointers.

#### Scenario: New npm release
- **WHEN** the latest registered npm release differs from the baseline
- **THEN** its verified tarball is retained as a candidate and no conclusion is inferred for its Target.

### Requirement: Human semantic gate
The scanner SHALL not accept assessments, change accepted claims, compile a release, or switch the current release pointer.

#### Scenario: Review required
- **WHEN** a changed source is observed
- **THEN** the audit points to affected topics and the Skill prepares drafts or explicit gaps for human review.
