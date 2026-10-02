# knowledge-site Specification

## Purpose

Builds a navigable offline website from one verified KnowledgeRelease and provides a repeatable local acceptance command for the complete M0 path.

## Requirements

### Requirement: Repeatable offline build and acceptance
The document build command SHALL work from a fresh installed checkout without relying on an existing ignored release directory. It SHALL also accept an explicitly selected new-format local release, verify it, and leave its immutable files unchanged. An explicit online build SHALL generate and verify production data and pages from the structured source and required Git history without local releases, originals or semantic models. The full verification command SHALL run relevant schema/data checks, typecheck, lint, formatting, tests, program build, new five-tool MCP protocol coverage, and site build without upstream network or real harness execution. Online checks SHALL remain distinct from local hybrid-search acceptance.

#### Scenario: Repeated verification
- **WHEN** a contributor runs the full verification command twice after installation
- **THEN** both runs complete without release ID collision or modifying tracked knowledge

#### Scenario: Damaged selected release
- **WHEN** an explicitly selected release fails integrity verification
- **THEN** the site build fails without presenting that release as successfully built

#### Scenario: Explicit online production build
- **WHEN** a contributor requests online production output from a clean checkout without local releases or an Ollama model
- **THEN** verified machine resources and matching production pages are built without silently selecting fixture data

### Requirement: Product-topic Wiki pages
The site SHALL build from one verified local release or independently verified online projection and provide product overviews with their declared surfaces and seven independent theme pages per first-wave product. Each topic page SHALL present mechanism prose with stable section anchors, a brief fixed-source scope, inline citations, optional useful Q&A after the body and before source links, local gaps and conflicts, and access to historical editions retained in the selected publication. Sections and answers SHALL show which surfaces they apply to. Generated source text SHALL remain inert, and fixture pages SHALL identify fictional data. Each current topic page SHALL show a question index linking fixed question IDs, their surface-scoped states, and the stable sections that answer them. Online pages SHALL identify their release and finite history scope, preserve source links for retained historical editions, and SHALL NOT link trimmed editions as readable pages.

#### Scenario: First-wave navigation
- **WHEN** the first-wave release is built into the site
- **THEN** a reader can open every published product-topic page, follow section and source links, see which surfaces an answer applies to, and distinguish a fixed source revision from a verified installed version

#### Scenario: Trimmed online history
- **WHEN** the online release trims an earlier chapter
- **THEN** its pages expose the retained historical chapter and sources, explain limited online history, and preserve local-history guidance without a dangling chapter link

### Requirement: Joint static data and page output
The online site build SHALL produce a staged deployment directory containing matching reader pages, protocol resources and candidate pointer from one verified knowledge projection. A configurable project base path SHALL apply to pages, assets and data entry points. Complete validation SHALL precede output acceptance; failure SHALL preserve existing accepted output. Prior-release retention and remote deployment SHALL remain separate operations.

#### Scenario: Subpath source navigation
- **WHEN** online data and pages are built beneath a non-root base path
- **THEN** product, topic, historical, source and static-asset links resolve beneath that path and identify the same release

#### Scenario: Page-data mismatch
- **WHEN** staged pages identify another release or link a source absent from the projected data
- **THEN** joint validation fails before the candidate output replaces existing accepted output
