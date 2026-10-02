# Spec Delta

## ADDED Requirements

### Requirement: Release archives and deployment assemblies
An immutable single-release artifact SHALL be independently verifiable and usable to restore its own pages and data. A deployment assembly SHALL combine the selected artifact with only the explicitly selected protected releases and protocol pointers, preserving source artifact bytes. Assembly SHALL verify the complete directory and capacity before acceptance and SHALL not alter the selected release's identity or publication time.

#### Scenario: Recovery without rebuilding
- **WHEN** a saved release is selected with different currently protected history
- **THEN** a new deployment assembly is verified while the original saved artifact remains unchanged
