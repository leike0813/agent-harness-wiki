# Spec Delta

## Purpose

Defines the model-invoked Skill that maintains one managed executable environment per registered official npm CLI, admitting first candidates and latest updates through one command.

## ADDED Requirements

### Requirement: Model-invoked managed binary admission
A model-invoked managed-binary Skill SHALL be reachable by other Skills and SHALL expose first admission and latest updates through the same command, `pnpm managed:packages update <id>`. For a product without a registered `managedPackages` entry it SHALL first register the official package name, direct entry, runtime, identity matcher and platform dependency, then run the update command.

#### Scenario: First admission
- **WHEN** a newly onboarded product has a verified registered official npm source
- **THEN** the Skill registers its `managedPackages` entry and admits the candidate through the same update command used for later updates

### Requirement: Verified official npm source required
The Skill SHALL refuse to act on a product that has no verified registered official `npm_registry` source, SHALL NOT substitute another distribution channel, and SHALL NOT block knowledge publication.

#### Scenario: Unregistered or non-npm product
- **WHEN** the product has no verified official npm source or is not distributed over npm
- **THEN** the Skill reports unsupported and the knowledge release proceeds independently

### Requirement: Scoped observation and distinct reporting
The Skill SHALL observe the requested product's latest identity with `managed:packages observe <harness-id>`, allow the update command to re-observe latest, and report candidate identity, direct entry, isolated startup outcome and whether the run was a first admission (`selected` empty) or an update (previous `selected` version).

#### Scenario: Update keeps prior environment on failure
- **WHEN** a verified candidate fails its isolated startup check
- **THEN** the previous runnable environment stays selected and the failure is reported separately from knowledge publication
