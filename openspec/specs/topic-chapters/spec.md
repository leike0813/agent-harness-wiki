# topic-chapters Specification

## Purpose

Defines immutable product-topic chapter editions and their question, section, source, and software-version indexes so readers can distinguish investigated upstream knowledge from verified package applicability.

## Requirements

### Requirement: Immutable topic chapter editions
Each chapter edition SHALL be one complete Markdown document for one catalog product and one of the eight topics, including local_transcripts. Its metadata SHALL identify a stable edition, section IDs, each section's non-empty explicit surface set and source scope, and every fixed question of that topic. Rewriting any section SHALL create another edition; unchanged sections SHALL retain their original fixed source references and surface set.

#### Scenario: One section changes
- **WHEN** an update changes only a Skills diagnostics section
- **THEN** the new complete Skills edition keeps the unchanged sections and their prior fixed source scopes and surface sets while the old edition remains immutable

### Requirement: Question-level meaning and provenance
Each fixed question SHALL carry one or more answers, each recording its non-empty surface set, a state of answered, partial, unknown, not_applicable or conflict, its principal section ID, and its own source-reference IDs where it states a conclusion. A shared answer SHALL list every surface it covers, and one question SHALL NOT carry overlapping surfaces. A surface that the product declares but the chapter does not answer SHALL be reported as not_investigated by a read rather than stored as a per-question stub. Answered unsupported behavior SHALL cite a source; partial, unknown, not_applicable and conflict SHALL explain their known scope, gap, reason, or competing claims in the located section. A section's other references SHALL NOT silently become this question's evidence.

#### Scenario: Two questions in one section
- **WHEN** one section answers discovery and leaves collision unknown
- **THEN** discovery links its own source reference and collision retains a specific gap rather than inheriting discovery's source

#### Scenario: Shared backend, one surface investigated
- **WHEN** a product has CLI and IDE surfaces and only the CLI was investigated
- **THEN** the answered questions scope to the CLI surface and a whole-product read reports the IDE surface as not_investigated without a stored stub

#### Scenario: Overlapping answers
- **WHEN** one question has two answers that both name the CLI surface
- **THEN** validation rejects the overlap

### Requirement: Separate software-version mapping
A software release mapping SHALL independently identify the exact software version, its surface, the supported chapter edition or section, and evidence for that association. A source commit or unversioned document alone SHALL NOT establish a release mapping. An entire chapter SHALL count as mapped for a surface only when every section of that surface has evidence for that release; adding only a mapping SHALL create a new knowledge release without altering the chapter edition.

#### Scenario: Partial package mapping
- **WHEN** only two of a chapter's sections are connected to a package version
- **THEN** those sections can be selected for that version but the complete chapter is not represented as verified for it

#### Scenario: Per-surface versions
- **WHEN** the CLI surface maps to one version and the IDE surface to another
- **THEN** each mapping stands for its own surface and a versioned read without a surface is ambiguous

### Requirement: Local transcript investigation contract
The local_transcripts topic SHALL cover ten transcripts.* questions: scope, location, naming, format, schema, lifecycle, database, archive, cleanup and diagnostics. Content SHALL describe conversation records and necessary storage dependencies with fixed sources and surface boundaries. Schema and operation examples SHALL be sanitized and source-supported.

#### Scenario: Unknown cleanup consequences
- **WHEN** fixed sources do not establish whether direct file deletion also updates a database
- **THEN** cleanup retains a specific uncertainty rather than claiming deletion is safe

#### Scenario: Archival dependencies
- **WHEN** recovery depends on transcript files and database state
- **THEN** archival explains which artifacts must be retained and the evidenced restoration limits
