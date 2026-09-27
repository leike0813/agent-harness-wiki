# Spec Delta

## ADDED Requirements

### Requirement: Production provenance validation
The validator SHALL check official source kinds, artifact ID uniqueness, snapshot-to-source and snapshot-to-artifact references, matching harness identity, content and commit identities, and safe relative archive and checkout paths. Production validation SHALL be possible from tracked metadata without requiring ignored originals or network access.

#### Scenario: Cross-harness artifact
- **WHEN** a snapshot references an artifact owned by another harness
- **THEN** validation fails with a relationship diagnostic

#### Scenario: Missing local archive during offline build
- **WHEN** tracked production metadata is valid but an ignored original is absent locally
- **THEN** ordinary offline validation can succeed while the explicit local source audit reports the missing original

### Requirement: Unknown document applicability cannot verify a version
An unversioned documentation snapshot SHALL NOT by itself make a claim for an exact Target publishable as accepted or disputed. The existing exact Target and assessment gates SHALL continue to apply to every published claim.

#### Scenario: Exact claim cites only unversioned document
- **WHEN** an accepted exact-version claim cites an evidence record tied to an unversioned documentation snapshot
- **THEN** validation rejects that claim rather than inferring version applicability

