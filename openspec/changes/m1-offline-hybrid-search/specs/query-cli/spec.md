# Spec Delta

## ADDED Requirements

### Requirement: Hybrid search availability in CLI
The CLI search command SHALL return the shared section ranking, match reason, source scope and semantic availability without changing topic version selection.

#### Scenario: CLI and MCP consistency
- **WHEN** CLI and MCP search the same release and normalized query
- **THEN** they identify the same ranked section IDs and semantic availability
