# Spec Delta

## ADDED Requirements

### Requirement: Package snapshot and investigation links
The record model SHALL represent an exact official package snapshot and managed package artifact without implying that installation proves runtime behavior. A Coverage record SHALL be able to reference the fixed snapshots used in its investigation.

#### Scenario: Package-specific Skills evidence
- **WHEN** a Skills candidate cites text shipped in one exact npm package
- **THEN** its Evidence resolves to that package snapshot and its Claim retains the matching exact Target
