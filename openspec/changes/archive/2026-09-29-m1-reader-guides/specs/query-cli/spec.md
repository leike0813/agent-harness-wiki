# Spec Delta

## REMOVED Requirements

### Requirement: Shared query commands
**Reason**: Capability, compare and evidence CLI commands expose the retired Claim model.
**Migration**: Use chapter-oriented list, topic, compare, search and source commands over the shared service.

## ADDED Requirements

### Requirement: Shared chapter query commands
The CLI SHALL expose release-bound list, topic, compare, search and source reads using the same inputs and business results as the shared query service. JSON output SHALL preserve release ID, source scope, version resolution and question status. Normal uncertainty SHALL exit successfully; invalid arguments and technical failures SHALL exit nonzero.

#### Scenario: Approximate topic version
- **WHEN** a CLI topic query requests an unmapped newer package version with an evidenced earlier match
- **THEN** it exits successfully and reports the selected earlier version and requested not_verified applicability
