# knowledge-records Specification

## Purpose

Defines the structured records that make a harness configuration fact traceable to a precise version, environment, condition, source, and review, while keeping fictional fixture knowledge separate from real product knowledge.

## Requirements

### Requirement: Fixture identity
Every fictional input record SHALL be marked as a fixture. Fixture data SHALL remain under the fixture dataset root and SHALL NOT be accepted by the production validation profile.

#### Scenario: Fixture presented as production
- **WHEN** production validation receives a fictional harness or knowledge record
- **THEN** validation rejects it as fixture contamination

### Requirement: Artifact and snapshot identity
The system SHALL give artifacts globally unique IDs and keep each artifact tied to one harness and one official source. A source revision snapshot SHALL preserve its exact source-tree Target and commit; a documentation snapshot with unspecified software version SHALL preserve that uncertainty rather than inventing an exact Target. Neither source identity nor content hash alone SHALL assert a product capability.

#### Scenario: Repository commit and CLI package differ
- **WHEN** a snapshot identifies a repository commit but has no verified association with a distributed CLI package
- **THEN** it cannot be presented as evidence of that package's behavior

### Requirement: Chapter and source identities
Harnesses, snapshots, chapter editions, section IDs, question IDs, source references and version mappings SHALL have unambiguous identities. A chapter's product SHALL be a declared catalog product and its topic identity SHALL agree with every referenced source's product; every surface a chapter, section, answer, or mapping names SHALL be a declared surface of that product. A snapshot's source identity SHALL remain distinct from software-version applicability.

#### Scenario: Wrong product source
- **WHEN** a Pi question cites an OMP-only source reference
- **THEN** the dataset rejects the cross-product link rather than publishing a Pi conclusion

#### Scenario: Undeclared surface
- **WHEN** a section or answer names a surface absent from its product's catalog entry
- **THEN** validation rejects the unknown surface
