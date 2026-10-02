# online-knowledge-release Specification

## Purpose

Defines an independently identified static publication of validated harness knowledge, with resources that consumers can read on demand, limited online chapter history, and complete data-and-page verification before deployment.

## Requirements

### Requirement: Independent online publication identity
An online release SHALL use `web-v1-<full Git commit SHA>` and protocol partition `data/v1/`. Protocol, program, release, edition and software identities SHALL remain distinct. Publication time SHALL be fixed; identical inputs and parameters SHALL reproduce normalized resources. Existing successful artifacts SHALL be reused or rejected intact, never overwritten or relabelled from a different local release.

#### Scenario: Same commit rebuilt
- **WHEN** an online build repeats a previously successful commit and protocol partition
- **THEN** it reuses the verified saved artifact or refuses replacement, without changing its publication time or bytes

#### Scenario: Local release has more history
- **WHEN** a full-history local dataset is projected to an online release
- **THEN** the online resources have the independent web identity rather than the local release ID

### Requirement: Complete input validation before projection
Online builds SHALL validate the complete structured source dataset before selecting online history, then validate all projected relationships. They SHALL work without ignored local releases, archived originals, SQLite artifacts or semantic models, and SHALL not fetch upstream knowledge, execute harnesses or read user configuration. Production output SHALL reject fixtures.

#### Scenario: Invalid chapter outside retained history
- **WHEN** a chapter that would be trimmed has an invalid source reference
- **THEN** the complete input validation fails rather than hiding the error by trimming the chapter

#### Scenario: Clean production checkout
- **WHEN** a production checkout with installed locked tools and required Git history has no local release, archive or model
- **THEN** it can produce and verify online lexical data and pages without upstream access

### Requirement: Partitioned entry points and resource identity
The protocol SHALL expose `data/v1/current.json` and `data/v1/releases/<release-id>/manifest.json`. The active pointer and compact manifest SHALL declare protocol and release identity; the manifest SHALL include publication time and resource entry points. Every release resource SHALL identify its release and requested object. Locations SHALL resolve under the configured site subpath without arbitrary path traversal.

#### Scenario: Project site path
- **WHEN** a build uses a project subpath instead of the domain root
- **THEN** entry points and relative resource locations resolve to the same bound release beneath that subpath

#### Scenario: Compact initialization
- **WHEN** a consumer reads the pointer and manifest
- **THEN** neither resource embeds all chapters, references, postings or a complete file inventory

### Requirement: Derived product catalog
`catalog.json` SHALL preserve product names, aliases, surfaces, runtimes, bindings and identity reference IDs from the catalog authority. It SHALL include registration status and current topic and surface coverage derived from chapter answers, sufficient for registry- and catalog-scoped listing without chapter reads. Declared unanswered surfaces SHALL derive `not_investigated` rather than stored invented answers.

#### Scenario: Candidate and uncovered surface
- **WHEN** the catalog includes a candidate and a registered product with an unanswered declared surface
- **THEN** the online catalog exposes the candidate without capability facts and the registered product's derived coverage gap

### Requirement: Topic navigation and chapter resources
`topics/<harness-id>/<topic>/index.json` SHALL locate current and retained editions and evidenced software-version/surface mappings, preserving chapter/section scope and evidence IDs. It SHALL omit prose and answers. Each readable edition SHALL have one `chapters/<edition-id>.json` containing the complete body, introduction, sections, question answers, reference IDs and derived source-scope summaries.

#### Scenario: Section and comparison data
- **WHEN** a reader locates a section or compares two products through their topic indexes
- **THEN** each chosen edition supplies its own complete chapter, surface-scoped answers and source summaries without reading all source files or a separate answer database

#### Scenario: Source-only topic
- **WHEN** a topic has fixed official sources but no defensible software mapping
- **THEN** its index and chapter remain readable without inventing a mapped software version

### Requirement: Limited online chapter history
Each online product-topic SHALL retain its explicit current edition and the most recent other historical edition, or all actual editions if fewer than two exist. Each retained edition SHALL keep its complete references and evidenced mappings. Local source and local publications SHALL retain full history. Online pages SHALL link only editions readable in the current online release.

#### Scenario: Three editions
- **WHEN** a product-topic has a current edition and two historical editions
- **THEN** the online release contains current and latest historical prose with their references while the earlier edition remains available locally

### Requirement: Explicit trimmed history metadata
Trimmed editions SHALL have lightweight topic-index markers retaining edition, surface, version and mapping scope needed for existing selection rules, without body URLs or full source excerpts. Markers SHALL distinguish an evidenced but unavailable selected edition from a never-mapped version, enabling the normal `history_not_available` outcome without substituting another chapter or inferring availability from HTTP errors.

#### Scenario: Exact mapped edition trimmed
- **WHEN** an exact software-version and surface mapping selects a trimmed edition
- **THEN** the index identifies the selected edition as unavailable online and preserves resolution data for local-history guidance

#### Scenario: Partial section mapping
- **WHEN** a trimmed edition has evidence for one section but lacks a complete chapter mapping
- **THEN** its marker preserves that distinction and does not turn the partial mapping into a verified whole chapter

### Requirement: Deterministic historical recency
Historical recency SHALL follow when an edition first entered the specified commit's first-parent tree history, newest first, with stable edition ID as the tie-breaker. The explicit current selection SHALL take precedence over this ordering. Missing Git history needed to prove recency SHALL fail construction instead of guessing from file timestamps or software versions.

#### Scenario: Editions introduced together
- **WHEN** two non-current editions first enter the same tree
- **THEN** their stable edition IDs determine the retained historical edition reproducibly

#### Scenario: Insufficient shallow history
- **WHEN** a shallow checkout cannot establish the historical editions' introduction order
- **THEN** construction fails with the missing-history cause rather than choosing an arbitrary historical edition

### Requirement: Displayable sources and existence directory
Each retained chapter reference and catalog identity reference SHALL have `sources/<reference-id>.json` preserving its fixed snapshot identity, official URL, locator and short excerpt. `sources/index/index.json` SHALL route by ID range to `sources/index/blocks/<block-id>.json` listing only reference IDs and owners. The directory SHALL describe actual retained references, distinguishing absent IDs from missing declared resources.

#### Scenario: Historical and candidate references
- **WHEN** a retained historical chapter and a candidate product cite distinct references
- **THEN** both appear in the existence directory with correct owners and readable source files

#### Scenario: Declared source removed
- **WHEN** a source directory entry exists but its file is absent
- **THEN** whole-publication verification fails rather than publishing that absence as a normal unknown reference

### Requirement: Full online artifact verification
Before a staged projection is accepted, verification SHALL check schemas, identities, selection, mappings, derived coverage, summaries, all source and search navigation targets, page links and fixture isolation against the validated input. The public manifest SHALL remain compact; build-side integrity records SHALL bind the complete data and page inventory. Failure SHALL preserve existing accepted output and pointer.

#### Scenario: Mixed release or dangling posting
- **WHEN** staging contains a chapter from another release or an index pointing at an unavailable section
- **THEN** verification rejects the complete candidate and leaves existing output intact

### Requirement: Complete deployment directory capacity
An assembled deployment directory SHALL include candidate data, matching pages and pointer, and every explicitly supplied retained release/protocol resource intact. Verification SHALL measure all unpacked regular-file bytes against 512 MiB, including static assets and trim markers. Excess or incomplete input SHALL reject acceptance without deleting protected resources or changing an existing site.

#### Scenario: Older resources exceed capacity
- **WHEN** the candidate alone fits but the complete directory including supplied retained releases exceeds 512 MiB
- **THEN** acceptance fails with actual size and major contributors, without shortening retention or omitting sources

#### Scenario: Exact capacity boundary
- **WHEN** the complete verified directory is at the limit or one byte above it
- **THEN** the directory at the limit is accepted and the directory above it is rejected

### Requirement: Machine-readable protocol retirement
The protocol SHALL define a retired entry-point variant with protocol identity, retirement date and client-upgrade guidance, distinct from an active pointer and empty knowledge. Version 1 builds SHALL emit active resources only; later retirement publishing SHALL use the explicit variant rather than a missing resource or automatic cross-protocol redirect.

#### Scenario: Retired partition entry
- **WHEN** an entry point carries the valid retired variant
- **THEN** its schema unambiguously identifies retirement without naming a readable current release

### Requirement: Release archives and deployment assemblies
An immutable single-release artifact SHALL be independently verifiable and usable to restore its own pages and data. A deployment assembly SHALL combine the selected artifact with only the explicitly selected protected releases and protocol pointers, preserving source artifact bytes. Assembly SHALL verify the complete directory and capacity before acceptance and SHALL not alter the selected release's identity or publication time.

#### Scenario: Recovery without rebuilding
- **WHEN** a saved release is selected with different currently protected history
- **THEN** a new deployment assembly is verified while the original saved artifact remains unchanged
