# Spec Delta

## MODIFIED Requirements

### Requirement: Shared chapter query commands
The CLI SHALL expose release-bound list, topic, compare, search and source reads using the same inputs and business results as the shared query service, including a list scope of registry or catalog and an optional surface on topic, compare, search and source. JSON output SHALL preserve release ID, surface scope, source scope, version resolution and question status. Normal uncertainty, including `ambiguous` and `not_investigated`, SHALL exit successfully; invalid arguments and technical failures SHALL exit nonzero.

#### Scenario: Approximate topic version
- **WHEN** a CLI topic query requests an unmapped newer package version with an evidenced earlier match
- **THEN** it exits successfully and reports the selected earlier version and requested not_verified applicability

#### Scenario: Surface-scoped read
- **WHEN** a CLI topic query names a surface
- **THEN** it reports that surface's answers and scope while the omitted-surface form reports the whole product
