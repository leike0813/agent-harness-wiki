# Spec Delta

## MODIFIED Requirements

### Requirement: Durable audit history
The system SHALL write a schema-validated Git-tracked audit record for every manual invocation, including unchanged and partially failed scans. It SHALL retain each registered source's baseline, observed identity, time and failure independently, plus affected question IDs, section IDs, source references and pending work. Audit records SHALL not enter KnowledgeRelease. A substantive change, failed source or unresolved disagreement SHALL also have a concise Markdown report; an entirely unchanged check needs only YAML.

#### Scenario: No source changed
- **WHEN** all current observations match their baselines
- **THEN** the invocation writes a no-change audit record and does not create a knowledge release unless prior pending work completed

#### Scenario: One source fails
- **WHEN** one Source cannot be observed
- **THEN** the record marks that Source blocked, retains its last successful baseline and preserves successful observations of other Sources

## REMOVED Requirements

### Requirement: Isolated candidates
**Reason**: The old scanner pre-downloads every new npm tarball and mixes source observation with executable acquisition.
**Migration**: The scanner observes package metadata; managed-artifact-startup separately stages a candidate for identity and startup checking.

### Requirement: Human semantic gate
**Reason**: Manual human acceptance is no longer required before a completed chapter can publish.
**Migration**: Agent self-check and conditional independent review precede the normal validated release switch.

## ADDED Requirements

### Requirement: Metadata-first package observation
The scanner SHALL record registered npm latest version and integrity without obtaining executable package bytes as a side effect. Fixed official documentation content and isolated Git revisions MAY be captured for knowledge comparison, without moving a pinned submodule. Package acquisition SHALL be delegated to the managed environment updater.

#### Scenario: New npm release
- **WHEN** latest resolves to a different exact version
- **THEN** the audit records the version and integrity, while the scanner itself does not download a tarball or assert a chapter conclusion
