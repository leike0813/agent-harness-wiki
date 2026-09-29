# Spec Delta

## MODIFIED Requirements

### Requirement: Repeatable offline build and acceptance
The document build command SHALL work from a fresh installed checkout without relying on an existing ignored release directory. It SHALL also accept an explicitly selected new-format release, verify it, and leave its immutable files unchanged. The full verification command SHALL run relevant schema/data checks, typecheck, lint, formatting, tests, program build, new five-tool MCP protocol coverage, and site build without upstream network or real harness execution.

#### Scenario: Repeated verification
- **WHEN** a contributor runs the full verification command twice after installation
- **THEN** both runs complete without release ID collision or modifying tracked knowledge

#### Scenario: Damaged selected release
- **WHEN** an explicitly selected release fails integrity verification
- **THEN** the site build fails without presenting that release as successfully built

## REMOVED Requirements

### Requirement: Published knowledge site
**Reason**: Fixture Claim cards, six core topics and evidence pages no longer define the public Wiki.
**Migration**: Render product overview and seven independent topic pages from published chapter editions.

## ADDED Requirements

### Requirement: Product-topic Wiki pages
The site SHALL build from one verified new-format release and provide product overviews with seven independent theme pages per first-wave product. Each topic page SHALL present mechanism prose with stable section anchors, a brief fixed-source scope, inline citations, optional useful Q&A after the body and before source links, local gaps and conflicts, and access to retained historical editions. Generated source text SHALL remain inert, and fixture pages SHALL identify fictional data.
Each current topic page SHALL show a question index linking fixed question IDs and their states to the stable sections that answer them.

#### Scenario: First-wave navigation
- **WHEN** the first-wave release is built into the site
- **THEN** a reader can open any of the 35 topic pages, follow section and source links, and distinguish a fixed source revision from a verified installed version
