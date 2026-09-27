# knowledge-site Specification

## Purpose

Builds a navigable offline website from one verified KnowledgeRelease and provides a repeatable local acceptance command for the complete M0 path.

## Requirements

### Requirement: Published knowledge site
The site SHALL build from the generated Markdown of one verified release without maintaining a second copy of configuration facts. It SHALL contain an entry page, harness index and fixture harness pages, the six core topics, evidence pages, release information, and explanations of unknown, partial coverage, conflict, and distinct observation and verification times. Fixture pages SHALL visibly identify fictional data; source excerpts SHALL remain inert.

#### Scenario: Fixture site build
- **WHEN** a validated fixture release is built into the site
- **THEN** the resulting pages include both fictional harnesses, six topic pages, evidence, release identity, and a prominent fixture notice

#### Scenario: Untrusted source text
- **WHEN** an evidence excerpt contains active markup
- **THEN** the rendered site displays it as inert text

### Requirement: Repeatable offline build and acceptance
The document build command SHALL work from a fresh installed checkout without relying on an existing ignored release directory. It SHALL also accept an explicitly selected existing release, verify it, and leave its immutable files unchanged. The full verification command SHALL run schema/data checks, typecheck, lint, formatting, tests, program build, MCP protocol coverage, and site build with no upstream network or real harness execution.

#### Scenario: Repeated verification
- **WHEN** a contributor runs the full verification command twice after installation
- **THEN** both runs complete without release ID collision or modifying tracked knowledge

#### Scenario: Damaged selected release
- **WHEN** an explicitly selected release fails integrity verification
- **THEN** the site build fails without presenting that release as successfully built
