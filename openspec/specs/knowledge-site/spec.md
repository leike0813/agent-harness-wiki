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
The site SHALL build from one verified local release or independently verified online projection and provide product overviews with their declared surfaces and independent theme pages for each published product-topic. Each topic page SHALL present mechanism prose with stable section anchors, a brief fixed-source scope, inline citations, optional useful Q&A after the body and before source links, local gaps and conflicts, and access to historical editions retained in the selected publication. Sections and answers SHALL show which surfaces they apply to. Generated source text SHALL remain inert, and fixture pages SHALL identify fictional data. Each current topic page SHALL show a question index linking fixed question IDs, their surface-scoped states, and the stable sections that answer them. Online pages SHALL identify their release and finite history scope, preserve source links for retained historical editions, and SHALL NOT link trimmed editions as readable pages.

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

### Requirement: Shared online source details
The online site SHALL generate one shared source reader page at `sources/`, with citations selecting a reference ID through the URL fragment. The reader SHALL fetch only the selected source resource from the site's fixed release, validate its protocol, release and reference identity, and display snapshot identity, locator, short excerpt and official link as inert content. Switching references SHALL cancel stale reads and prevent stale results replacing the selected reference. Each read SHALL be bounded to 10 seconds and 16 MiB. Loading, missing references and read failures SHALL be distinguishable, with retry available for read failures. Local immutable release Markdown SHALL retain its static source pages.

#### Scenario: Source count grows
- **WHEN** an online publication retains more source references
- **THEN** their source JSON resources remain readable and the site still builds one source HTML page

#### Scenario: Source reader navigation
- **WHEN** a reader opens a current chapter, retained historical chapter or product identity citation, refreshes its source URL, or navigates between source fragments using browser history
- **THEN** the shared page displays the selected reference from the same fixed release without reading the current pointer or the full source directory

#### Scenario: Invalid or absent source link
- **WHEN** a generated source link selects an invalid ID or a reference absent from the same publication
- **THEN** deployment validation fails even if the shared page exists and file hashes have been recalculated

#### Scenario: Recovery source navigation
- **WHEN** public readback verifies a restored archive
- **THEN** it follows the representative chapter's actual source link and verifies the matching source page and data without requiring the archive to adopt the new source URL

### Requirement: Public static delivery acceptance
Pages publication SHALL deploy matching machine resources and reader pages together after complete validation. Public readback SHALL confirm release identity and representative navigability before recording verified usability. Deployment failure or uncertain state SHALL be reported distinctly from successful output construction, with archived manual recovery available where a verified predecessor exists.

#### Scenario: Successful build but failed deployment
- **WHEN** a validated site cannot be deployed or publicly verified
- **THEN** it is not declared publicly usable solely because the build succeeded

### Requirement: Uninvestigated topic presentation
Product overviews SHALL identify each declared topic without a current chapter as uninvestigated, without linking it to an unreadable chapter. Readable topic counts and navigation SHALL derive from actual current selections. Uninvestigated labels SHALL NOT become stored chapter editions or searchable knowledge.

#### Scenario: Transcript not investigated
- **WHEN** a product has seven readable topics and no transcript chapter
- **THEN** its overview labels local transcripts as uninvestigated, reports seven readable topics and exposes no dangling transcript link
