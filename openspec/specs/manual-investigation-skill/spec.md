# manual-investigation-skill Specification

## Purpose

Provides a maintainer-invoked investigation workflow that turns a question about a fixed harness Target into source-traceable review candidates or an explicit evidence gap without changing published knowledge.

## Requirements

### Requirement: Direct or ID-based chapter investigation
The project Skill SHALL accept one or more registered harness IDs for on-demand source observation, or a fixed source identity and specific question for direct investigation. It SHALL account for every requested product, topic and question, preserve source/package distinctions, and produce cited chapter updates or concrete gaps without manufacturing support.

#### Scenario: Direct fixed source
- **WHEN** a maintainer asks how one Skills mechanism works at a pinned source commit
- **THEN** the Skill can update the source-scoped chapter without requiring an npm Target or claiming package-version applicability

### Requirement: Investigate, review and publish
The Skill SHALL inspect the actual diff, validate changed inputs and sources, perform its own semantic check, obtain independent review for high-impact cases, and publish completed chapters through the normal staging and current-pointer process. It SHALL report changed chapters, unmapped versions, audit IDs, validation and publication results, and unresolved blockers. A failure SHALL preserve prior current knowledge and the work needed to resume.

#### Scenario: Valid ordinary change
- **WHEN** a cited routine documentation update passes validation and Agent self-check
- **THEN** the Skill creates a new local release without waiting for human Claim acceptance

#### Scenario: Incomplete review
- **WHEN** an affected question requires independent review that has not finished
- **THEN** it remains pending with its audit and does not enter the new release
