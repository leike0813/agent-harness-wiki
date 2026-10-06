# knowledge-query Specification

## Purpose

Provides offline, release-bound reads of reviewed harness knowledge while preserving exact version, environment, conditions, uncertainty, and evidence.

## Requirements

### Requirement: Fixed release and read-only boundary
The query service SHALL verify and bind one local release at opening, use only its published data, and expose no arbitrary file, SQL, network, shell, or knowledge-write operation. An implicit current pointer SHALL be resolved once. Fixture releases SHALL require explicit selection.

Local service requirements in this specification SHALL remain local. Consumer reads SHALL follow online-knowledge-query, sharing domain selection and answer semantics while accessing only published protocol resources.

#### Scenario: Current pointer changes
- **WHEN** a caller changes the current pointer after opening a production query service
- **THEN** that service continues returning its original release ID

#### Scenario: Implicit fixture
- **WHEN** the current pointer selects a fixture release without an explicit release ID
- **THEN** opening the service fails

### Requirement: Chapter and section version selection
A read without software version SHALL return the current investigated chapter of its fixed release. A read MAY name a surface; when it does not, it addresses the whole product and resolves each question through its surface-scoped answers. An explicit version SHALL select an evidenced exact mapping for the requested surface, otherwise latest evidenced matching prefix, otherwise a nearest earlier comparable version; where no mapping exists it SHALL return a fixed-source chapter as source_only. Any versioned read that does not name a surface SHALL be ambiguous rather than choosing one surface. A read of a declared surface that the chapter does not answer SHALL report not_investigated. Results SHALL include requested version, requested surface or null, selected version or null, match kind, requested applicability, surface scope and source scope. Whole chapters SHALL NOT combine sections from different editions; a section-specific mapping MAY support a section read when a whole-chapter mapping does not.

#### Scenario: Newer package than mapped knowledge
- **WHEN** a request names version 2.0 and the nearest evidenced chapter mapping is 1.9
- **THEN** the result returns the 1.9 chapter as approximate and marks version 2.0 not_verified

#### Scenario: Unversioned official page
- **WHEN** no software-version mapping is defensible but a current fixed-source chapter exists
- **THEN** the result returns source_only with selected software version null and the source scope

#### Scenario: Version without surface
- **WHEN** a read names a version but no surface
- **THEN** the result is ambiguous and names the product's surfaces instead of choosing one

#### Scenario: Uninvestigated surface
- **WHEN** a read names a declared surface that the chapter does not answer
- **THEN** the result reports not_investigated for that surface without inventing a conclusion

### Requirement: Five chapter query operations
The shared release-bound service SHALL list harnesses, get a whole topic or stable section, compare two to five product/version targets by common question IDs, search current sections and get a source reference. List SHALL accept a scope of registry, the default, or catalog, which adds candidate products. Topic, compare, search and source reads MAY name a surface. A found chapter SHALL retain question-level answered, partial, unknown, not_applicable, conflict and query-derived not_investigated independently of the top-level selection status. Missing IDs and ambiguous aliases SHALL be normal business outcomes; malformed input and broken releases SHALL be technical errors.

#### Scenario: Section read
- **WHEN** getTopic requests a valid section ID
- **THEN** it returns that section's complete Markdown, question IDs, source references, release ID and version resolution

#### Scenario: Comparison
- **WHEN** two products answer the same question differently
- **THEN** compareTopics returns each product's own status, section locator, source references and version resolution without a synthesized verdict

#### Scenario: Catalog listing
- **WHEN** list requests the catalog scope
- **THEN** it returns registered and candidate products with their declared surfaces, runtime entities and bindings

### Requirement: Section discovery and pagination
Search SHALL return bounded current-edition section matches with a body preview and source scope; it SHALL NOT accept a software-version filter or fill results with historical editions. List and search cursors SHALL bind release, normalized query and order. A search result SHALL provide a section ID that getTopic can read back.

#### Scenario: Historical edition
- **WHEN** a topic has current and historical editions with the same phrase
- **THEN** search returns the current section once while getTopic can still retrieve the historical edition through an evidenced version mapping

### Requirement: Exact and hybrid section ranking
Section search SHALL prioritize exact question IDs, configuration keys and paths, then combine alias, full-text and semantic candidates with stable section-level deduplication and release-bound pagination. Each result SHALL expose its match mode, an excerpt from actual published body text, section ID, chapter source scope and release ID. Similarity SHALL mean relevance only and SHALL NOT assert trust, software-version applicability or product ranking.

Local service requirements in this specification SHALL remain local. Consumer reads SHALL follow online-knowledge-query, sharing domain selection and answer semantics while accessing only published protocol resources.

#### Scenario: Exact key and semantic candidate
- **WHEN** one section contains the exact requested configuration key and another is only semantically related
- **THEN** the exact-key section ranks first and both results retain their own source scopes

### Requirement: Uninvestigated declared topic
A read of a valid topic with no chapter for a known product SHALL return not_investigated through existing local and consumer query interfaces. Invalid product or surface identities SHALL retain not_found; version requests without a surface SHALL remain ambiguous. Comparison SHALL preserve each target's uncertainty without inventing answers.

#### Scenario: Partial product coverage
- **WHEN** local_transcripts is requested for a known product that has other current topics only
- **THEN** the read returns not_investigated with the fixed release identity

#### Scenario: Mixed comparison
- **WHEN** one product has local transcript answers and another has no transcript chapter
- **THEN** comparison preserves the answered result and the uninvestigated target
