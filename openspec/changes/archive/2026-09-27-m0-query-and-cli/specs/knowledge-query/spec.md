# Spec Delta

## Purpose

Provides offline, release-bound reads of reviewed harness knowledge while preserving exact version, environment, conditions, uncertainty, and evidence.

## ADDED Requirements

### Requirement: Fixed release and read-only boundary
The query service SHALL verify and bind one local release at opening, use only its published data, and expose no arbitrary file, SQL, network, shell, or knowledge-write operation. An implicit current pointer SHALL be resolved once. Fixture releases SHALL require explicit selection.

#### Scenario: Current pointer changes
- **WHEN** a caller changes the current pointer after opening a production query service
- **THEN** that service continues returning its original release ID

#### Scenario: Implicit fixture
- **WHEN** the current pointer selects a fixture release without an explicit release ID
- **THEN** opening the service fails

### Requirement: Version and Target resolution
Queries SHALL match the complete Target scope. Exact versions SHALL NOT fall back. `latest_verified` SHALL select one version with accepted claims in the requested scope and topic; `latest_upstream` SHALL select from published discovery snapshots and expose its observation time without treating discovery as verification. Versions without a defensible order SHALL return ambiguous rather than being combined.

#### Scenario: Exact newer version
- **WHEN** the requested exact version has only not_started coverage
- **THEN** the result identifies that version as not_verified and preserves its coverage

#### Scenario: Newer discovery
- **WHEN** a snapshot discovers a newer version that has no accepted claim
- **THEN** latest_upstream identifies the newer version and returns not_verified

#### Scenario: Latest verified
- **WHEN** an older exact version has accepted topic claims and a newer discovered version does not
- **THEN** latest_verified resolves only the older version

### Requirement: Facts, conditions, and uncertainty
Capability results SHALL retain each published claim's Target, fact key, support availability, delivery method, conditions, evidence references, and assessment state. Missing required conditions SHALL produce ambiguous results. Disputed claims SHALL produce conflict; coverage without a claim SHALL remain unknown or partial and SHALL NOT become unsupported.

#### Scenario: Conditional path
- **WHEN** a path claim requires a condition the caller has not specified
- **THEN** the result shows the conditional claim and marks the answer ambiguous

#### Scenario: Disputed claim
- **WHEN** a Target has a disputed reviewed claim
- **THEN** the result reports conflict and retains the claim and its evidence

### Requirement: Five query operations
The service SHALL list harnesses, get capabilities, compare capabilities by shared fact key and topic, search published knowledge, and get published evidence by ID. Comparisons SHALL keep each Target's conditions and statuses separate. Evidence lookup SHALL NOT access source archives.

#### Scenario: Cross-Target comparison
- **WHEN** two Targets have different delivery methods or coverage
- **THEN** the comparison returns each Target's own result without merging its facts

#### Scenario: Evidence lookup
- **WHEN** a caller requests a published evidence ID
- **THEN** the response contains its recorded locator, basis, excerpt, and release ID

### Requirement: Bounded search and pagination
Search SHALL prioritize harness aliases, structured filters and exact keys or semantic paths before literal FTS5 candidates, including fixed Chinese topic aliases. List and search SHALL have bounded limits and opaque cursors bound to release, normalized query, and ordering. Invalid cursors and malformed FTS input SHALL be rejected without executing arbitrary SQL or changing the search contract.

#### Scenario: Literal FTS punctuation
- **WHEN** search text contains FTS syntax punctuation
- **THEN** the text is treated as literal search terms and cannot alter the FTS expression

#### Scenario: Cursor from another query
- **WHEN** a cursor is reused with another filter or release
- **THEN** it is rejected rather than returning an inconsistent page

