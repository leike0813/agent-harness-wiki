# Spec Delta

## ADDED Requirements

### Requirement: Exact and hybrid section ranking
Section search SHALL prioritize exact question IDs, configuration keys and paths, then combine alias, full-text and semantic candidates with stable section-level deduplication and release-bound pagination. Each result SHALL expose its match mode, an excerpt from actual published body text, section ID, chapter source scope and release ID. Similarity SHALL mean relevance only and SHALL NOT assert trust, software-version applicability or product ranking.

#### Scenario: Exact key and semantic candidate
- **WHEN** one section contains the exact requested configuration key and another is only semantically related
- **THEN** the exact-key section ranks first and both results retain their own source scopes
