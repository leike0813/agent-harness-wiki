# Spec Delta

## MODIFIED Requirements

### Requirement: Fixed release and read-only boundary
The query service SHALL verify and bind one local release at opening, use only its published data, and expose no arbitrary file, SQL, network, shell, or knowledge-write operation. An implicit current pointer SHALL be resolved once. Fixture releases SHALL require explicit selection.

Local service requirements in this specification SHALL remain local. Consumer reads SHALL follow online-knowledge-query, sharing domain selection and answer semantics while accessing only published protocol resources.

#### Scenario: Current pointer changes
- **WHEN** a caller changes the current pointer after opening a production query service
- **THEN** that service continues returning its original release ID

#### Scenario: Implicit fixture
- **WHEN** the current pointer selects a fixture release without an explicit release ID
- **THEN** opening the service fails

### Requirement: Exact and hybrid section ranking
Section search SHALL prioritize exact question IDs, configuration keys and paths, then combine alias, full-text and semantic candidates with stable section-level deduplication and release-bound pagination. Each result SHALL expose its match mode, an excerpt from actual published body text, section ID, chapter source scope and release ID. Similarity SHALL mean relevance only and SHALL NOT assert trust, software-version applicability or product ranking.

Local service requirements in this specification SHALL remain local. Consumer reads SHALL follow online-knowledge-query, sharing domain selection and answer semantics while accessing only published protocol resources.

#### Scenario: Exact key and semantic candidate
- **WHEN** one section contains the exact requested configuration key and another is only semantically related
- **THEN** the exact-key section ranks first and both results retain their own source scopes
