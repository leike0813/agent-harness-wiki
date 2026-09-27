# knowledge-records Specification

## Purpose

Defines the structured records that make a harness configuration fact traceable to a precise version, environment, condition, source, and review, while keeping fictional fixture knowledge separate from real product knowledge.

## Requirements

### Requirement: Explicit identity and scope
The system SHALL identify each harness, source, snapshot, claim, evidence, assessment, and coverage record by a unique ID. Every claim and coverage record SHALL identify a harness, product surface, distribution, operating system, architecture, execution mode, and exact version identity. A version verified on one Target MUST NOT imply validity on another.

#### Scenario: Two versions of one harness
- **WHEN** records describe two exact versions of the same fictional harness
- **THEN** the records retain distinct version identities and neither record silently applies to the other version

### Requirement: Typed assertions and conditions
The system SHALL represent configuration and extension assertions as a discriminated union rather than an unrestricted value. It SHALL support distinct assertion records for Skills, MCP, custom agents, custom providers, Hooks, native plugins, and configuration precedence. It SHALL represent conditions as a finite, declarative set of predicates and paths as semantic bases with safe segments.

#### Scenario: Conditional skill location
- **WHEN** a fictional skill path applies only in a trusted workspace and a specified environment-variable state
- **THEN** the claim retains those conditions and its semantic path without resolving the server's home or environment

### Requirement: Separate evidence, review, and coverage states
The system SHALL keep availability, delivery method, evidence basis, assessment status, and investigation coverage as independent dimensions. A substantive accepted claim SHALL reference evidence and an accepting assessment. An unknown coverage record SHALL NOT be treated as an unsupported claim.

#### Scenario: Uninvestigated plugin behavior
- **WHEN** a Target has plugin coverage marked not_started and no accepted plugin claim
- **THEN** the dataset represents unknown coverage without manufacturing an unsupported assertion

#### Scenario: External extension
- **WHEN** a supported capability is delivered by an external extension
- **THEN** its delivery remains external_extension and is not relabeled native

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
