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
The system SHALL write a schema-validated Git-tracked audit record for every manual invocation, including unchanged and partially failed scans. It SHALL retain each registered source's baseline, observed identity, time and failure independently, plus affected question IDs, section IDs, source references and pending work. Audit records SHALL not enter KnowledgeRelease. A substantive change, failed source or unresolved disagreement SHALL also have a concise Markdown report; an entirely unchanged check needs only YAML.

#### Scenario: No source changed
- **WHEN** all current observations match their baselines
- **THEN** the invocation writes a no-change audit record and does not create a knowledge release unless prior pending work completed

#### Scenario: One source fails
- **WHEN** one Source cannot be observed
- **THEN** the record marks that Source blocked, retains its last successful baseline and preserves successful observations of other Sources

### Requirement: Metadata-first package observation
The scanner SHALL record registered npm latest version and integrity without obtaining executable package bytes as a side effect. Fixed official documentation content and isolated Git revisions MAY be captured for knowledge comparison, without moving a pinned submodule. Package acquisition SHALL be delegated to the managed environment updater.

#### Scenario: New npm release
- **WHEN** latest resolves to a different exact version
- **THEN** the audit records the version and integrity, while the scanner itself does not download a tarball or assert a chapter conclusion
