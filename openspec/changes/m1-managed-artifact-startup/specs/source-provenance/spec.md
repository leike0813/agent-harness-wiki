# Spec Delta

## REMOVED Requirements

### Requirement: Bounded local executable retention
**Reason**: Its old-format historical release query promise and install-only promotion rule do not match the new managed environment contract.
**Migration**: Use Candidate-safe executable retention and managed-artifact-startup checks.

## ADDED Requirements

### Requirement: Candidate-safe executable retention
The project-owned package set SHALL identify the selected runnable version and locked dependency set for each registered npm CLI. Candidate bytes SHALL remain separate until identity and isolated startup succeed; only then may the selected identity and package bytes change. Retiring older executable bytes SHALL NOT alter a published chapter's fixed source references or imply that another version has been checked.

#### Scenario: Failed replacement
- **WHEN** a new candidate cannot start in the required sandbox
- **THEN** the current package set and its runnable entry remain available
