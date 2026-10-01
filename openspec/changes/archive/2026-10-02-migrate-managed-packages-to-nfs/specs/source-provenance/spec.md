# Spec Delta

## MODIFIED Requirements

### Requirement: Candidate-safe executable retention

The project-owned package set SHALL identify selected exact versions and locked dependencies through local manifest and lock files. Bytes SHALL use the active local or NFS layout. In NFS mode complete snapshots SHALL remain at stable `candidates/<UUID>/` locations after promotion; `current` SHALL only select a snapshot and SHALL NOT serve as fixed provenance. Historical and failed candidates SHALL NOT be automatically deleted. Storage location SHALL NOT change published source identity or imply version verification.

#### Scenario: Failed replacement

- **WHEN** a new candidate cannot start in the required sandbox
- **THEN** the current package set and its runnable entry remain available

#### Scenario: Current pointer changes

- **WHEN** a new verified NFS snapshot becomes current
- **THEN** the previous complete snapshot and its fixed package identity remain retained, and published references do not follow the mutable pointer
