# Spec Delta

## ADDED Requirements

### Requirement: Published discovery metadata
The release SHALL preserve validated source and snapshot metadata for discovered versions even when no reviewed claim references them. Discovery metadata SHALL not by itself create a supported claim or imply runtime verification.

#### Scenario: Discovered unverified version
- **WHEN** a newer version has a validated source snapshot and only not_started coverage
- **THEN** the release retains its version and observation time while publishing no supported fact for it

