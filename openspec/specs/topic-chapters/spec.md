# topic-chapters Specification

## Purpose

Defines immutable product-topic chapter editions and their question, section, source, and software-version indexes so readers can distinguish investigated upstream knowledge from verified package applicability.

## Requirements

### Requirement: Immutable topic chapter editions
Each chapter edition SHALL be one complete Markdown document for one harness and one of the seven topics. Its metadata SHALL identify a stable edition, section IDs, section source scopes, and every fixed question of that topic. Rewriting any section SHALL create another edition; unchanged sections SHALL retain their original fixed source references.

#### Scenario: One section changes
- **WHEN** an update changes only a Skills diagnostics section
- **THEN** the new complete Skills edition keeps the unchanged sections and their prior fixed source scopes while the old edition remains immutable

### Requirement: Question-level meaning and provenance
Each fixed question SHALL record answered, partial, unknown, not_applicable, or conflict, its principal section ID, and its own source-reference IDs where it states a conclusion. Answered unsupported behavior SHALL cite a source; partial, unknown, not_applicable, and conflict SHALL explain their known scope, gap, reason, or competing claims in the located section. A section's other references SHALL NOT silently become this question's evidence.

#### Scenario: Two questions in one section
- **WHEN** one section answers discovery and leaves collision unknown
- **THEN** discovery links its own source reference and collision retains a specific gap rather than inheriting discovery's source

### Requirement: Separate software-version mapping
A software release mapping SHALL independently identify the exact software version, the supported chapter edition or section, and evidence for that association. A source commit or unversioned document alone SHALL NOT establish a release mapping. An entire chapter SHALL count as mapped only when every section has evidence for that release; adding only a mapping SHALL create a new knowledge release without altering the chapter edition.

#### Scenario: Partial package mapping
- **WHEN** only two of a chapter's sections are connected to a package version
- **THEN** those sections can be selected for that version but the complete chapter is not represented as verified for it
