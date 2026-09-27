# five-harness-investigation Specification

## Purpose

Defines the first five real CLI Targets and makes their topic investigations visible without confusing research progress, unreviewed candidates, and published capability facts.

## Requirements

### Requirement: Fixed first-wave catalog
The production dataset SHALL identify Codex CLI, Claude Code, OpenCode, Pi, and OMP as five distinct harnesses, each with one exact npm release Target on Linux/x64. It SHALL contain one coverage record for each of seven topics per Target.

#### Scenario: Five exact Targets
- **WHEN** the first-wave production dataset is validated
- **THEN** it contains five distinct package Targets and 35 Target-topic coverage records, without merging Pi and OMP or claiming another platform

### Requirement: Traceable seven-topic investigations
For all seven topics, each first-wave Target SHALL record the fixed source snapshots examined, the investigation scope and checks, and either a finding or a specific evidence gap. All 35 Target-topic results SHALL be presented for semantic review. A coverage state alone SHALL NOT count as an investigation, and an evidence gap SHALL NOT be relabeled complete or unsupported.

#### Scenario: Evidence gap
- **WHEN** package materials do not establish an exact-version MCP behavior
- **THEN** the MCP coverage record identifies what was checked and the remaining gap without creating an unsupported or supported Claim

#### Scenario: Full review matrix
- **WHEN** the first-wave investigation is handed to the user
- **THEN** every one of the 35 Target-topic pairs has a fixed source reference, a specific finding or gap, and a reviewable status

### Requirement: Human semantic acceptance
Research Claims SHALL remain drafts until the user reviews the source locator, excerpt, precise Target, assertion, and conditions in a local diff. Only claims accepted by that review SHALL be published as facts.

#### Scenario: Draft candidate
- **WHEN** a candidate Claim has evidence but only a draft Assessment
- **THEN** its production release retains coverage and discovery metadata but excludes the candidate assertion from CLI, MCP, and generated fact pages
