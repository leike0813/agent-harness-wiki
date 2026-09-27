# Spec Delta

## ADDED Requirements

### Requirement: Package and investigation integrity
Offline validation SHALL reject mismatched npm source, package artifact, snapshot, or Target identities and missing or cross-harness investigation snapshot references. A package artifact's local absence SHALL be distinguished from invalid tracked metadata.

#### Scenario: Wrong package version
- **WHEN** an npm snapshot declares a version or Target different from its managed artifact
- **THEN** validation rejects the relationship before publication

#### Scenario: Investigation cites another harness
- **WHEN** a Coverage record references a snapshot of another harness
- **THEN** validation reports the offending reference and record
