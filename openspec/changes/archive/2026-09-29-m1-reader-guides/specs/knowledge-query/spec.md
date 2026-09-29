# Spec Delta

## REMOVED Requirements

### Requirement: Version and Target resolution
**Reason**: Complete Target and latest_verified/latest_upstream Claim selection are retired.
**Migration**: Select whole chapter editions or sections by evidenced software-version mapping.

### Requirement: Facts, conditions, and uncertainty
**Reason**: Per-Claim fact keys, availability and Coverage are replaced by question status and cited prose.
**Migration**: Return chapter body, question states, source scope and explicit version applicability.

### Requirement: Five query operations
**Reason**: Capability and evidence operations are replaced by topic and source operations.
**Migration**: Use listHarnesses, getTopic, compareTopics, searchKnowledge and getSource.

### Requirement: Bounded search and pagination
**Reason**: Claim FTS and Target-filtered search no longer describe published chapter sections.
**Migration**: Search current chapter sections and bind cursors to release, normalized query and order.

## ADDED Requirements

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
