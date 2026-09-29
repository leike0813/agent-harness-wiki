# Spec Delta

## Purpose

Defines the content and reading acceptance of the first-wave product-topic Wiki chapters so a person or Agent can use the same cited explanation instead of interpreting old Claim and Coverage records.

## ADDED Requirements

### Requirement: Useful mechanism chapters
Each published first-wave chapter SHALL explain its product's relevant configuration entry, first-party fields or events, discovery or execution chain, applicable conditions, a minimum cited example where a reliable syntax exists, diagnostics, and local uncertainty. Prose SHALL cite fixed source references at the relevant paragraph. It SHALL NOT turn an unmapped source commit or unversioned document into a claim about an installed package release.

A chapter SHALL organize independently usable mechanisms into stable sections with natural headings and connected prose. Its structured question index SHALL locate every fixed question without requiring question IDs to introduce prose paragraphs. The reader-facing topic page SHALL expose the question-to-section mapping. A section with several indexed questions SHALL explain the relevant mechanisms, rather than use a source list or field names as a substitute for an answer.

For each applicable configuration-file shape that a reader needs to create or edit, the chapter SHALL name the file path and scope, show a fixed-source-supported minimum complete configuration block, and explain its fields, prerequisites, effect and observable check. Distinct syntax or processing paths SHALL have separate examples. First-party field, event and option coverage remains complete even when examples omit optional fields. Where appropriate, directory layouts, CLI operations, Hook input/output and precedence or conflict rules SHALL use explained, source-supported examples. When a fixed source cannot establish safe syntax or a reliable result, the chapter SHALL identify the missing proof instead of inventing an example. Example citations, platform and software-version boundaries SHALL be near the example; credentials SHALL use placeholders.

#### Scenario: Source-only Skills page
- **WHEN** the available official Skills page has no evidenced package-version mapping
- **THEN** the chapter explains the documented locations and processing chain as fixed-source knowledge, flags package applicability as unverified and does not present a version-specific recipe

#### Scenario: Known negative result
- **WHEN** a fixed official source clearly establishes that a first-party mechanism is absent
- **THEN** the relevant question is answered with that scope and citation rather than marked unknown or generalized to extensions

#### Scenario: Two configuration transports
- **WHEN** one theme offers both stdio and HTTP server configuration in the same file
- **THEN** the page shows each distinct minimal file block and explains its fields, preconditions and checks without treating a listed server as a successful tool call

#### Scenario: Indexed prose
- **WHEN** several fixed questions are answered in one natural-language section
- **THEN** the page links each question ID to that section and the section carries the required citations without repeating the IDs as paragraph labels

### Requirement: First-wave topic and question coverage
The first-wave production release SHALL contain a current chapter for all seven topics on each of Codex CLI, Claude Code, OpenCode, Pi and OMP. Each product SHALL account for all 53 fixed question IDs through the topic indexes, allowing justified partial, unknown, not_applicable and conflict states. Editorial acceptance SHALL consider whether a reader can use the mechanism explanation or understand a concrete remaining gap, not merely whether files and fields exist.

#### Scenario: Thin placeholder
- **WHEN** a chapter only repeats that materials are insufficient without naming inspected entry points and the missing proof
- **THEN** it does not satisfy first-wave reading acceptance even if the dataset validates
