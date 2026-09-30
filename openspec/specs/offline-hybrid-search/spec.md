# offline-hybrid-search Specification

## Purpose

Defines an offline, release-bound semantic supplement to exact and full-text discovery of current chapter sections, preserving source and software-version meaning while improving bilingual recall.

## Requirements

### Requirement: Current section search corpus
Exact, full-text and semantic indexes SHALL cover only the current chapter edition's published sections for each product-topic in one release. Searchable lexical material SHALL include section titles and body, fixed question IDs and wording, configuration keys and paths, plus product, topic and surface names and aliases. Each result SHALL carry the surfaces its section applies to. Historical editions, unreviewed candidates, audit reports and source originals SHALL not enter the semantic index.

#### Scenario: Historical duplicate
- **WHEN** an old and current edition share the same passage
- **THEN** search returns only the current edition section while get_topic remains available for the historical edition

#### Scenario: Surface-scoped result
- **WHEN** a section applies to only one surface of a multi-surface product
- **THEN** its search result identifies that surface and the omitted-surface read still reports the whole product

### Requirement: Bounded semantic passages
Long sections SHALL be split into model-sized passages at paragraph boundaries. Every passage SHALL retain its parent stable section ID; search SHALL deduplicate candidates to that section before returning results.

#### Scenario: Two matching passages
- **WHEN** two passages from one section match a query
- **THEN** the response contains one section result with a body preview rather than two duplicate results

### Requirement: Fixed offline model and graceful fallback
A semantic index SHALL be bound to the release and a fixed local model identity. Build and query SHALL not download model files. If the model or index is unavailable, lexical search SHALL still return results with an explicit semantic-unavailable status; that fallback SHALL not count as complete M1 hybrid-search acceptance.

#### Scenario: Missing model
- **WHEN** a published release is opened without its required local model files
- **THEN** exact and full-text search remains usable and the response reports semantic search unavailable

### Requirement: Semantic recall acceptance
The M1 release SHALL demonstrate on representative Chinese, English and configuration-term queries that offline semantic candidates recover relevant current sections missed by lexical search, without changing fact, source, version or condition judgments.

#### Scenario: Lexical miss
- **WHEN** a representative paraphrase has no lexical match but a relevant published section exists
- **THEN** the offline hybrid result includes that section and get_topic returns its cited original text
