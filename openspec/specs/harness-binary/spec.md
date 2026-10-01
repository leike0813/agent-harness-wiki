# harness-binary Specification

## Purpose

Defines the model-invoked Skill that maintains one managed executable environment per registered official npm CLI, admitting first candidates and latest updates through one command.

## Requirements

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

### Requirement: External storage layout contract
Before package-set operations the Skill SHALL read `docs/decisions/0008-managed-package-storage.md` and `research/package-set/README.md` and follow the active layout. Only absent storage configuration SHALL select local behavior; invalid configuration or mount, permission or path failures SHALL block operations. The Skill SHALL require local backup and recovery before new updates, preserve historical snapshots and distinguish pending hard NFS operations from completed failure or rollback.

#### Scenario: Storage configuration absent
- **WHEN** the storage configuration file does not exist
- **THEN** the Skill uses the local layout and does not touch remote bytes

#### Scenario: Invalid configured layout
- **WHEN** configuration, mount identity, permissions or path boundaries are invalid
- **THEN** the Skill reports blocked without falling back to local storage
