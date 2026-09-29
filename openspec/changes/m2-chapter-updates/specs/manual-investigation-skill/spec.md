# Spec Delta

## REMOVED Requirements

### Requirement: Direct and bounded investigation
**Reason**: Mandatory complete Target input is replaced by fixed-source chapter investigation with optional package-version mapping.
**Migration**: Invoke the Skill with registered harness IDs or a fixed source and question scope.

### Requirement: Source-bound candidates and gaps
**Reason**: Claim/Evidence/Assessment/Coverage draft handoff is replaced by cited chapter editions and question states.
**Migration**: Record source-bound conclusions, gaps and mappings in the new chapter model.

### Requirement: Validated review handoff
**Reason**: The user removed the human semantic acceptance gate and authorized the Agent to publish completed knowledge.
**Migration**: Validate and self-check within the invocation, using an independent Agent on designated high-impact cases.

### Requirement: Harness-ID incremental investigation
**Reason**: Its Coverage-on-new-Target behavior is obsolete.
**Migration**: Retain the ID entry mode but investigate affected chapter questions without auto-mapping a new package version.

## ADDED Requirements

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
