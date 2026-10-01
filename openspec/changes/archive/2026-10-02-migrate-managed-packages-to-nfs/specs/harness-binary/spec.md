# Spec Delta

## ADDED Requirements

### Requirement: External storage layout contract

Before package-set operations the Skill SHALL read `docs/decisions/0008-managed-package-storage.md` and `research/package-set/README.md` and follow the active layout. Only absent storage configuration SHALL select local behavior; invalid configuration or mount, permission or path failures SHALL block operations. The Skill SHALL require local backup and recovery before new updates, preserve historical snapshots and distinguish pending hard NFS operations from completed failure or rollback.

#### Scenario: Storage configuration absent

- **WHEN** the storage configuration file does not exist
- **THEN** the Skill uses the local layout and does not touch remote bytes

#### Scenario: Invalid configured layout

- **WHEN** configuration, mount identity, permissions or path boundaries are invalid
- **THEN** the Skill reports blocked without falling back to local storage
