# Spec Delta

## MODIFIED Requirements

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
