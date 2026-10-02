# online-knowledge-query Specification

## Purpose

Defines on-demand online and explicitly cached-offline reads of published harness knowledge, preserving one fixed release, existing domain meaning, bounded resource processing and observable technical failures.

## Requirements

### Requirement: Initialization and fixed publication
Online startup SHALL confirm current, validate its manifest and catalog within 30 seconds and bind that release before offering queries. Each CLI query and MCP process SHALL stay bound despite pointer changes or failures. Initialization SHALL never silently use a prior release. Consumers SHALL validate each read resource's schema, release and requested object without whole-publication downloads or upstream access.

#### Scenario: Current changes during a process
- **WHEN** current moves from A to B after initialization
- **THEN** the existing process continues reading A and a new process initializes B

#### Scenario: New initialization fails
- **WHEN** current or its required manifest or catalog cannot be validated
- **THEN** startup fails without exposing tools or replacing the last successful initialization record

### Requirement: Shared five query semantics
The consumer SHALL expose the existing five input schemas and shared product, surface, question, version and source semantics. Listing SHALL need only catalog; topic and comparison SHALL read selected editions; search SHALL use current lexical sections; source SHALL use existence navigation before its single resource. Missing published resources SHALL not become knowledge uncertainty.

#### Scenario: Unknown source versus missing file
- **WHEN** a source directory proves an ID absent, or declares an ID whose resource returns 404
- **THEN** the absent ID is normal not_found and the declared missing file is release_resource_missing regardless of prior calls

### Requirement: Consumer metadata and limited history
Consumer results SHALL carry release_id, knowledge_published_at and access_mode. Versioned results SHALL declare current_and_previous history scope. Selection SHALL consider available and trimmed entries using existing mapping rules; a selected trimmed edition SHALL return normal history_not_available with target, edition and resolution plus local-history guidance. It SHALL not substitute another chapter or invent answers.

#### Scenario: Exact trimmed section mapping
- **WHEN** an evidenced section mapping selects a trimmed edition
- **THEN** the section result reports history_not_available while an unsupported whole-chapter mapping still follows source_only rules

#### Scenario: Comparison contains unavailable history
- **WHEN** one comparison target selects trimmed history
- **THEN** comparison preserves that target's result and does not manufacture its question answers

### Requirement: Explicit cached offline operation
Offline SHALL make no network request and select the most recent successful initialization for the same entry and protocol. Missing required cache SHALL be offline_cache_miss; corrupt required cache SHALL be invalid_cached_data. Online cache hits SHALL remain access_mode online. Disabling file cache SHALL disable both reads and writes; no full offline snapshot SHALL be promised.

#### Scenario: Partial cached publication
- **WHEN** offline initialization succeeds but a requested chapter was never cached or was evicted
- **THEN** that call fails with offline_cache_miss while independently cached operations remain usable

### Requirement: Cache ownership and capacity
Validated completed resources SHALL be cached by normalized entry, protocol, release and relative path. Memory content SHALL be limited to 32 MiB; file content SHALL target 128 MiB with least-recently-used recovery. Atomic writes SHALL prevent partial JSON reads. Immutable resources SHALL expire by capacity rather than time. Cache write/recovery failure SHALL not invalidate a validated online result; cleanup SHALL stay within owned namespaces.

#### Scenario: Concurrent writes and read-only cache
- **WHEN** processes write or reclaim concurrently or storage refuses writes
- **THEN** readers never consume partial JSON and online results remain usable, with bounded diagnostics; the disk target is not claimed as a strict cross-process quota

### Requirement: Request budgets and cancellation
Initialization and each call SHALL have a 30-second total deadline including queues, retries, body, validation and assembly. HTTP SHALL have at most 4 active requests per process and 10 seconds per attempt. Each call SHALL count at most 64 distinct resources including cache hits; excess SHALL be query_too_broad. Existing lexical byte/candidate budgets SHALL also apply. Cancellation and shutdown SHALL stop queued, fetching, reading and waiting work without cancelling independent calls.

#### Scenario: Cancel one overlapping call
- **WHEN** an SDK cancellation targets one call while another is active
- **THEN** that call's work stops and the independent call may complete; no response is forced for a withdrawn MCP request

### Requirement: Bounded retry and atomic call results
GET SHALL retry at most once for network interruption, request timeout or HTTP 408/429/502/503/504, respecting Retry-After and the unchanged overall deadline. Other HTTP, invalid data, identity, cancellation and total timeout failures SHALL not retry. Retries SHALL retain the same release and resource. A failed required comparison target or search block SHALL fail the whole call without terminating the MCP process.

#### Scenario: Retry delay exceeds remaining time
- **WHEN** Retry-After exceeds the remaining operation budget
- **THEN** the call reports the corresponding failure without retrying prematurely or extending its deadline

### Requirement: Technical errors and protocol initialization
Consumer technical errors SHALL provide stable code, short reason, retryable and bound release when known. Codes SHALL distinguish cache, network, request/operation timeout, HTTP/rate limits, missing resource, invalid data, query breadth and cursor errors. Unsupported protocol and explicit retirement SHALL fail startup as unsupported_protocol and protocol_retired. CLI JSON and MCP structured/text errors SHALL agree; normal domain outcomes SHALL not be technical errors.

#### Scenario: Retirement versus missing entry
- **WHEN** initialization reads a valid retired pointer or merely encounters a missing entry
- **THEN** only the explicit pointer produces protocol_retired, with upgrade guidance and no invented release ID

### Requirement: Lexical consumer discovery
Consumer CLI and MCP SHALL share the established online lexical implementation, emit no semantic_status and offer no model or semantic-enable option. Actual read resources SHALL count toward processing budgets even on cache hits. Cooperative cancellation SHALL apply to bounded traversal and result assembly without changing deterministic ranking or cursors.

#### Scenario: Warm cache over budget
- **WHEN** cached resources exceed an operation's processing budget
- **THEN** it returns query_too_broad instead of treating those bytes or resource counts as free
