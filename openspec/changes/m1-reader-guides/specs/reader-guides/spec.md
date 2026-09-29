# Spec Delta

## Purpose

Defines the content and reading acceptance of the first-wave product-topic Wiki chapters so a person or Agent can use the same cited explanation instead of interpreting old Claim and Coverage records.

## ADDED Requirements

### Requirement: Useful mechanism chapters
Each published first-wave chapter SHALL explain its product's relevant configuration entry, first-party fields or events, discovery or execution chain, applicable conditions, a minimum cited example where a reliable syntax exists, diagnostics, and local uncertainty. Prose SHALL cite fixed source references at the relevant paragraph. It SHALL NOT turn an unmapped source commit or unversioned document into a claim about an installed package release.

#### Scenario: Source-only Skills page
- **WHEN** the available official Skills page has no evidenced package-version mapping
- **THEN** the chapter explains the documented locations and processing chain as fixed-source knowledge, flags package applicability as unverified and does not present a version-specific recipe

#### Scenario: Known negative result
- **WHEN** a fixed official source clearly establishes that a first-party mechanism is absent
- **THEN** the relevant question is answered with that scope and citation rather than marked unknown or generalized to extensions

### Requirement: First-wave topic and question coverage
The first-wave production release SHALL contain a current chapter for all seven topics on each of Codex CLI, Claude Code, OpenCode, Pi and OMP. Each product SHALL account for all 53 fixed question IDs through the topic indexes, allowing justified partial, unknown, not_applicable and conflict states. Editorial acceptance SHALL consider whether a reader can use the mechanism explanation or understand a concrete remaining gap, not merely whether files and fields exist.

#### Scenario: Thin placeholder
- **WHEN** a chapter only repeats that materials are insufficient without naming inspected entry points and the missing proof
- **THEN** it does not satisfy first-wave reading acceptance even if the dataset validates
