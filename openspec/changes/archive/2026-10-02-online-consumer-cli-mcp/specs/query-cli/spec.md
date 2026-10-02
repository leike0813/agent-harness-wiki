# Spec Delta

## MODIFIED Requirements

### Requirement: Shared chapter query commands
The CLI SHALL expose release-bound list, topic, compare, search and source reads using the same inputs and business results as the shared query service, including a list scope of registry or catalog and an optional surface on topic, compare, search and source. JSON output SHALL preserve release ID, surface scope, source scope, version resolution and question status. Normal uncertainty, including `ambiguous` and `not_investigated`, SHALL exit successfully; invalid arguments and technical failures SHALL exit nonzero.

The private maintainer CLI SHALL retain its local contract. The independently packaged consumer CLI SHALL follow consumer-distribution and online-knowledge-query, use lexical-only search and its own result schemas without semantic_status.

#### Scenario: Approximate topic version
- **WHEN** a CLI topic query requests an unmapped newer package version with an evidenced earlier match
- **THEN** it exits successfully and reports the selected earlier version and requested not_verified applicability

#### Scenario: Surface-scoped read
- **WHEN** a CLI topic query names a surface
- **THEN** it reports that surface's answers and scope while the omitted-surface form reports the whole product

### Requirement: Hybrid search availability in CLI
The CLI search command SHALL return the shared section ranking, match reason, source scope and semantic availability without changing topic version selection.

The private maintainer CLI SHALL retain its local contract. The independently packaged consumer CLI SHALL follow consumer-distribution and online-knowledge-query, use lexical-only search and its own result schemas without semantic_status.

#### Scenario: CLI and MCP consistency
- **WHEN** CLI and MCP search the same release and normalized query
- **THEN** they identify the same ranked section IDs and semantic availability
