## MODIFIED Requirements

### Requirement: Product-topic Wiki pages
The site SHALL build from one verified local release or independently verified online projection and provide product overviews with their declared surfaces and independent theme pages for each published product-topic. Each topic page SHALL present mechanism prose with stable section anchors, a brief fixed-source scope, inline citations, optional useful Q&A after the body and before source links, local gaps and conflicts, and access to historical editions retained in the selected publication. Sections and answers SHALL show which surfaces they apply to. Generated source text SHALL remain inert, and fixture pages SHALL identify fictional data. Each current topic page SHALL show a question index linking fixed question IDs, their surface-scoped states, and the stable sections that answer them. Online pages SHALL identify their release and finite history scope, preserve source links for retained historical editions, and SHALL NOT link trimmed editions as readable pages.

#### Scenario: First-wave navigation
- **WHEN** the first-wave release is built into the site
- **THEN** a reader can open every published product-topic page, follow section and source links, see which surfaces an answer applies to, and distinguish a fixed source revision from a verified installed version

#### Scenario: Trimmed online history
- **WHEN** the online release trims an earlier chapter
- **THEN** its pages expose the retained historical chapter and sources, explain limited online history, and preserve local-history guidance without a dangling chapter link

## ADDED Requirements

### Requirement: Uninvestigated topic presentation
Product overviews SHALL identify each declared topic without a current chapter as uninvestigated, without linking it to an unreadable chapter. Readable topic counts and navigation SHALL derive from actual current selections. Uninvestigated labels SHALL NOT become stored chapter editions or searchable knowledge.

#### Scenario: Transcript not investigated
- **WHEN** a product has seven readable topics and no transcript chapter
- **THEN** its overview labels local transcripts as uninvestigated, reports seven readable topics and exposes no dangling transcript link
