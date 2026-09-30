# Spec Delta

## MODIFIED Requirements

### Requirement: Direct or ID-based chapter investigation
The project maintenance Skill SHALL accept one or more registered harness IDs for on-demand source observation, or a fixed source identity and specific question for direct investigation. It SHALL account for every requested product, topic, question and surface it investigates, preserve source and package distinctions, and produce cited chapter updates or concrete gaps without manufacturing support. A declared surface it does not investigate SHALL be left unanswered and read as not_investigated. In ID mode it SHALL apply the managed-binary Skill once per requested ID on every invocation, even when registered sources are unchanged; in direct mode it SHALL verify the managed binary only when the maintainer explicitly requests it.

#### Scenario: Direct fixed source
- **WHEN** a maintainer asks how one Skills mechanism works at a pinned source commit
- **THEN** the Skill can update the source-scoped chapter without requiring an npm Target or claiming package-version applicability

#### Scenario: ID mode with no source change
- **WHEN** an ID-mode invocation finds every registered source unchanged for each requested ID
- **THEN** it still applies the managed-binary Skill once per ID and completes the audit without a knowledge release

#### Scenario: Surface-scoped answer
- **WHEN** an investigation changes only the CLI surface of a product with a shared backend
- **THEN** the update scopes the affected answers to that surface and leaves the other surfaces' answers unchanged
