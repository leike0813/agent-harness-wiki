# Spec Delta

## MODIFIED Requirements

### Requirement: Current section search corpus
Exact, full-text and semantic indexes SHALL cover only the current chapter edition's published sections for each product-topic in one release. Searchable lexical material SHALL include section titles and body, fixed question IDs and wording, configuration keys and paths, plus product, topic and surface names and aliases. Each result SHALL carry the surfaces its section applies to. Historical editions, unreviewed candidates, audit reports and source originals SHALL not enter the semantic index.

#### Scenario: Historical duplicate
- **WHEN** an old and current edition share the same passage
- **THEN** search returns only the current edition section while get_topic remains available for the historical edition

#### Scenario: Surface-scoped result
- **WHEN** a section applies to only one surface of a multi-surface product
- **THEN** its search result identifies that surface and the omitted-surface read still reports the whole product
