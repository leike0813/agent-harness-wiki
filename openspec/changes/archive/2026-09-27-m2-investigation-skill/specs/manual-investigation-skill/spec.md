# Spec Delta

## Purpose

Provides a maintainer-invoked investigation workflow that turns a question about a fixed harness Target into source-traceable review candidates or an explicit evidence gap without changing published knowledge.

## ADDED Requirements

### Requirement: Direct and bounded investigation
The project Skill SHALL accept a user-selected harness, exact Target, topic or question, and available fixed source identities. A source-change scan SHALL be optional input. For a multi-topic request, it SHALL account for every requested Target-topic pair in the final handoff.

#### Scenario: Direct question before a scanner exists
- **WHEN** a maintainer invokes the Skill with an exact existing Target and a Skills question but no change-scan output
- **THEN** the Skill can investigate the fixed sources and return a candidate or a specific evidence gap

#### Scenario: Missing Target identity
- **WHEN** the request omits the version or distribution needed to distinguish Targets
- **THEN** the Skill requests that identity before drafting a capability Claim

### Requirement: Source-bound candidates and gaps
The Skill SHALL preserve source, artifact, snapshot, Target, condition, and evidence distinctions while preparing Claim, Evidence, Assessment, and Coverage records. A substantive new Claim SHALL remain a draft for human semantic review. Insufficient or conflicting evidence SHALL be recorded as an explicit gap or conflict, without manufacturing supported or unsupported behavior.

#### Scenario: Unversioned page beside a pinned package
- **WHEN** an official page has unknown applicability to the selected package version
- **THEN** the Skill records the page and version gap without treating it as exact-package proof

#### Scenario: Evidence-backed candidate
- **WHEN** a fixed package contains a directly located statement for the selected Target
- **THEN** the Skill can create a typed draft Claim with matching Evidence and draft Assessment, while leaving the accepted publication unchanged

### Requirement: Validated review handoff
Before presenting candidate records, the Skill SHALL run the existing production dataset validator, inspect the local diff, and report every changed record, validation failure, unresolved gap, and decision required from the maintainer. A failure SHALL preserve available candidate work and its blocker. Invocation SHALL NOT accept a Claim or switch a KnowledgeRelease.

#### Scenario: Candidate fails relationship validation
- **WHEN** a drafted Evidence refers to the wrong Snapshot
- **THEN** the Skill reports the validator diagnostic and repairs the candidate or leaves a concrete blocker; it does not publish the Claim

#### Scenario: Investigation stops with unknown behavior
- **WHEN** fixed sources do not establish a capability after the documented checks
- **THEN** the Skill records what was inspected and the missing proof in Coverage and reports the question as unresolved
