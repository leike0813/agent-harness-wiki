# query-cli Specification

## Purpose

Makes local dataset validation, release compilation, and all five release-bound query operations available through an offline command line interface.

## Requirements

### Requirement: Validation and compilation commands
`ahw validate` SHALL validate an explicitly selected dataset profile, and `ahw compile` SHALL compile an explicit dataset, profile, release ID, publication time, and release root using the existing validator and compiler. Invalid inputs SHALL exit nonzero with a useful diagnostic.

#### Scenario: Invalid dataset
- **WHEN** validation encounters a broken reference
- **THEN** the command exits nonzero and identifies the diagnostic

### Requirement: Shared query commands
`ahw query list`, `capability`, `compare`, `search`, and `evidence` SHALL call the shared query service with explicit release selection support. JSON output SHALL preserve the service's structured status, release ID, Target, conditions, coverage, and evidence fields. Normal uncertainty SHALL be a successful business response; invalid arguments or technical failures SHALL exit nonzero.

#### Scenario: Unverified version
- **WHEN** capability queries a discovered but unverified version
- **THEN** the command exits successfully and reports not_verified in JSON

#### Scenario: Invalid argument
- **WHEN** a query receives malformed Target input
- **THEN** the command exits nonzero without a false success message
