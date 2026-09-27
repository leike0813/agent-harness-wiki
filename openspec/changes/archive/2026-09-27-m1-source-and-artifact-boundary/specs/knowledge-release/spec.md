# Spec Delta

## ADDED Requirements

### Requirement: Source metadata release without originals
New releases SHALL include validated artifact metadata alongside source and snapshot metadata in canonical JSON and SQLite while excluding archived originals and submodule contents. A source-only release SHALL publish no capability facts without reviewed claims. Earlier M0 releases SHALL remain verifiable and queryable after this additive format change.

#### Scenario: Source-only Codex release
- **WHEN** a dataset has fixed Codex sources, snapshots, and artifacts but no reviewed claims
- **THEN** its release retains provenance metadata and returns no supported capability fact

#### Scenario: Earlier release
- **WHEN** a valid M0 release lacks artifact records and uses the prior builder version
- **THEN** release verification and query opening continue to succeed

