# Spec Delta

## ADDED Requirements

### Requirement: Exact npm release provenance
An official npm package snapshot SHALL bind package name, exact version, registry integrity, distribution Target, capture time, and one managed package artifact. Package provenance SHALL remain separate from Git source commits and unversioned documentation.

#### Scenario: Repository tag and package version
- **WHEN** a Git tag and an npm package report the same-looking version but no verified build mapping exists
- **THEN** the Git snapshot does not establish package behavior; an exact package Claim needs evidence tied to the package snapshot

### Requirement: Bounded local executable retention
The managed package set SHALL keep the most recently selected stable version of each first-wave CLI in a project-owned pnpm store. Replacing that set SHALL retire older executable package bytes only after the new set is installed and audited. Historical release metadata and reviewed excerpts SHALL remain queryable; a local audit SHALL report evicted originals as unavailable.

#### Scenario: Historical release after update
- **WHEN** an earlier release is queried after its package bytes are retired
- **THEN** the release remains readable and its source metadata identifies the old version, while an explicit original audit reports that package as unavailable
