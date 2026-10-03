# Spec Delta

## MODIFIED Requirements

### Requirement: Immutable recovery archives
Each accepted online release SHALL have a retrievable immutable archive of its own data and matching pages, independent of online retained releases. First generation SHALL fix publication time. Retries SHALL reuse successful archives without replacement. Complete archives and their ledger records SHALL remain retained after online exclusion, with no automatic deletion, and SHALL contain no local originals, models or credentials.

#### Scenario: Retry saved release
- **WHEN** the same commit is retried after its archive succeeded
- **THEN** the same archive and publication time are used without rebuilding or replacing immutable assets

#### Scenario: Restore an excluded release
- **WHEN** a maintainer selects a verified archive no longer present online
- **THEN** its saved data and pages remain available for validated manual recovery without rebuilding the archive

### Requirement: Server release retention
Each supported protocol SHALL retain online only the deployment's current release and its most recent independently verified recovery release, deduplicated when necessary. An unverified current SHALL not replace a verified recovery. Older releases SHALL have no guaranteed online window; bound clients needing excluded resources SHALL restart to bind current. Deployment selection SHALL match the resulting ledger pointers. Capacity failure SHALL preserve the deployed site.

#### Scenario: Failed release recovered
- **WHEN** a deployed but unverified release is replaced with a verified recovery target
- **THEN** the target supplies the pages and pointer, the unverified release is excluded online, and all complete archives remain retained

#### Scenario: Consecutive verified publications
- **WHEN** a third distinct release replaces two previously verified releases
- **THEN** only the new current and immediately preceding verified current remain online for that protocol

#### Scenario: First publication or same target retry
- **WHEN** there is no distinct verified recovery or a publication retries its current target
- **THEN** online identities are deduplicated and at most two releases are retained for that protocol

### Requirement: Protocol freeze and retirement
When a new major protocol becomes available, the old protocol SHALL freeze at its usable target and retain its current and recovery online until an announced retirement date at least 90 days later. Retirement SHALL require no unresolved deployment and preserve an explicit machine-readable upgrade entry. Ending support SHALL release the protocol's online current and recovery without deleting complete archives, ledger records or local history.

#### Scenario: Retirement not due
- **WHEN** an old partition's announced date has not elapsed
- **THEN** its required pointer and current and recovery data remain readable rather than being removed for capacity

#### Scenario: Retirement due
- **WHEN** the announced date has elapsed and no deployment remains unresolved
- **THEN** retirement releases the protocol's online data while preserving its upgrade entry and complete archives
