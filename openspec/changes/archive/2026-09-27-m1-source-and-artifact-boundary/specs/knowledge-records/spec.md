# Spec Delta

## ADDED Requirements

### Requirement: Artifact and snapshot identity
The system SHALL give artifacts globally unique IDs and keep each artifact tied to one harness and one official source. A source revision snapshot SHALL preserve its exact source-tree Target and commit; a documentation snapshot with unspecified software version SHALL preserve that uncertainty rather than inventing an exact Target. Neither source identity nor content hash alone SHALL assert a product capability.

#### Scenario: Repository commit and CLI package differ
- **WHEN** a snapshot identifies a repository commit but has no verified association with a distributed CLI package
- **THEN** it cannot be presented as evidence of that package's behavior

