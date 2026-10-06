## MODIFIED Requirements

### Requirement: Immutable topic chapter editions
Each chapter edition SHALL be one complete Markdown document for one catalog product and one of the eight topics, including local_transcripts. Its metadata SHALL identify a stable edition, section IDs, each section's non-empty explicit surface set and source scope, and every fixed question of that topic. Rewriting any section SHALL create another edition; unchanged sections SHALL retain their original fixed source references and surface set.

#### Scenario: One section changes
- **WHEN** an update changes only a Skills diagnostics section
- **THEN** the new complete Skills edition keeps the unchanged sections and their prior fixed source scopes and surface sets while the old edition remains immutable

## ADDED Requirements

### Requirement: Local transcript investigation contract
The local_transcripts topic SHALL cover ten transcripts.* questions: scope, location, naming, format, schema, lifecycle, database, archive, cleanup and diagnostics. Content SHALL describe conversation records and necessary storage dependencies with fixed sources and surface boundaries. Schema and operation examples SHALL be sanitized and source-supported.

#### Scenario: Unknown cleanup consequences
- **WHEN** fixed sources do not establish whether direct file deletion also updates a database
- **THEN** cleanup retains a specific uncertainty rather than claiming deletion is safe

#### Scenario: Archival dependencies
- **WHEN** recovery depends on transcript files and database state
- **THEN** archival explains which artifacts must be retained and the evidenced restoration limits
