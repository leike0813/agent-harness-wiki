# query-cli Specification

## Purpose

Makes local dataset validation, release compilation, and all five release-bound query operations available through an offline command line interface.

## Requirements

### Requirement: Validation and compilation commands
`ahw validate` SHALL validate an explicitly selected dataset profile, and `ahw compile` SHALL compile an explicit dataset, profile, release ID, publication time, and release root using the existing validator and compiler. Invalid inputs SHALL exit nonzero with a useful diagnostic.

#### Scenario: Invalid dataset
- **WHEN** validation encounters a broken reference
- **THEN** the command exits nonzero and identifies the diagnostic

### Requirement: Shared chapter query commands
The CLI SHALL expose release-bound list, topic, compare, search and source reads using the same inputs and business results as the shared query service. JSON output SHALL preserve release ID, source scope, version resolution and question status. Normal uncertainty SHALL exit successfully; invalid arguments and technical failures SHALL exit nonzero.

#### Scenario: Approximate topic version
- **WHEN** a CLI topic query requests an unmapped newer package version with an evidenced earlier match
- **THEN** it exits successfully and reports the selected earlier version and requested not_verified applicability

### Requirement: Hybrid search availability in CLI
The CLI search command SHALL return the shared section ranking, match reason, source scope and semantic availability without changing topic version selection.

#### Scenario: CLI and MCP consistency
- **WHEN** CLI and MCP search the same release and normalized query
- **THEN** they identify the same ranked section IDs and semantic availability
