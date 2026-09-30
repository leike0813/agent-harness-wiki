# manual-investigation-skill Specification

## Purpose

Provides a maintainer-invoked investigation workflow that turns a question about a fixed harness Target into source-traceable review candidates or an explicit evidence gap without changing published knowledge.

## Requirements

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

### Requirement: Investigate, review and publish
The Skill SHALL inspect the actual diff, validate changed inputs and sources, perform its own semantic check, obtain independent review for high-impact cases, and publish completed chapters by staging an immutable release and then selecting it. The publication command SHALL publish knowledge only and SHALL NOT refresh the managed binary. It SHALL report changed chapters, unmapped versions, audit IDs, validation and publication results, and unresolved blockers. A failure SHALL preserve prior current knowledge and the work needed to resume.

#### Scenario: Valid ordinary change
- **WHEN** a cited routine documentation update passes validation and Agent self-check
- **THEN** the Skill stages a new local release and selects it without waiting for human Claim acceptance

#### Scenario: Incomplete review
- **WHEN** an affected question requires independent review that has not finished
- **THEN** it remains pending with its audit and does not enter the new release
