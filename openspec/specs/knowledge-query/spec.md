# knowledge-query Specification

## Purpose

Provides offline, release-bound reads of reviewed harness knowledge while preserving exact version, environment, conditions, uncertainty, and evidence.

## Requirements

### Requirement: Fixed release and read-only boundary
The query service SHALL verify and bind one local release at opening, use only its published data, and expose no arbitrary file, SQL, network, shell, or knowledge-write operation. An implicit current pointer SHALL be resolved once. Fixture releases SHALL require explicit selection.

#### Scenario: Current pointer changes
- **WHEN** a caller changes the current pointer after opening a production query service
- **THEN** that service continues returning its original release ID

#### Scenario: Implicit fixture
- **WHEN** the current pointer selects a fixture release without an explicit release ID
- **THEN** opening the service fails

### Requirement: Chapter and section version selection
A query without software version SHALL read the current investigated chapter of its fixed release. An explicit version SHALL select an evidenced exact mapping, otherwise latest evidenced matching prefix, otherwise a nearest earlier comparable version; where no mapping exists it SHALL return a fixed-source chapter as source_only. Results SHALL include requested version, selected version or null, match kind, requested applicability and source scope. Whole chapters SHALL NOT combine sections from different editions; a section-specific mapping MAY support a section read when a whole-chapter mapping does not.

#### Scenario: Newer package than mapped knowledge
- **WHEN** a request names version 2.0 and the nearest evidenced chapter mapping is 1.9
- **THEN** the result returns the 1.9 chapter as approximate and marks version 2.0 not_verified

#### Scenario: Unversioned official page
- **WHEN** no software-version mapping is defensible but a current fixed-source chapter exists
- **THEN** the result returns source_only with selected software version null and the source scope

### Requirement: Five chapter query operations
The shared release-bound service SHALL list harnesses, get a whole topic or stable section, compare two to five product/version targets by common question IDs, search current sections and get a published source reference. A found chapter SHALL retain question-level answered, partial, unknown, not_applicable and conflict independently of the top-level selection status. Missing IDs and ambiguous aliases SHALL be normal business outcomes; malformed input and broken releases SHALL be technical errors.

#### Scenario: Section read
- **WHEN** getTopic requests a valid section ID
- **THEN** it returns that section's complete Markdown, question IDs, source references, release ID and version resolution

#### Scenario: Comparison
- **WHEN** two products answer the same question differently
- **THEN** compareTopics returns each product's own status, section locator, source references and version resolution without a synthesized verdict

### Requirement: Section discovery and pagination
Search SHALL return bounded current-edition section matches with a body preview and source scope; it SHALL NOT accept a software-version filter or fill results with historical editions. List and search cursors SHALL bind release, normalized query and order. A search result SHALL provide a section ID that getTopic can read back.

#### Scenario: Historical edition
- **WHEN** a topic has current and historical editions with the same phrase
- **THEN** search returns the current section once while getTopic can still retrieve the historical edition through an evidenced version mapping

### Requirement: Exact and hybrid section ranking
Section search SHALL prioritize exact question IDs, configuration keys and paths, then combine alias, full-text and semantic candidates with stable section-level deduplication and release-bound pagination. Each result SHALL expose its match mode, an excerpt from actual published body text, section ID, chapter source scope and release ID. Similarity SHALL mean relevance only and SHALL NOT assert trust, software-version applicability or product ranking.

#### Scenario: Exact key and semantic candidate
- **WHEN** one section contains the exact requested configuration key and another is only semantically related
- **THEN** the exact-key section ranks first and both results retain their own source scopes
