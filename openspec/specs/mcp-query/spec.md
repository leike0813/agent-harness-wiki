# mcp-query Specification

## Purpose

Exposes reviewed local knowledge through five stable MCP stdio tools that retain the selected release, version boundaries, conditions, uncertainty, and evidence.

## Requirements

### Requirement: Fixed read-only tool surface
The server SHALL expose exactly `list_harnesses`, `get_capability`, `compare_capabilities`, `search_knowledge`, and `get_evidence` over local stdio. It SHALL bind one verified release at startup and SHALL NOT accept per-call release selection, arbitrary paths or SQL, network access, write tools, Resources, or Prompts. Fixture releases MUST be selected explicitly.

#### Scenario: Startup and listing
- **WHEN** an SDK client connects to a server started with an explicit fixture release
- **THEN** the tool list contains exactly the five named tools and every successful response identifies that release

#### Scenario: Pointer changes during a session
- **WHEN** the current release pointer changes after a server starts
- **THEN** later calls remain bound to the originally verified release

### Requirement: Shared query meaning and structured results
Tool inputs SHALL have strict schemas and route through the shared query service. Successful results SHALL provide structured content and a text rendering of the same content. Capability queries SHALL accept complete Target scope, topic or fact key, version policy, conditions, and optional summary or full detail. Summary detail SHALL retain Target, conditions, support, coverage, review status, and evidence references. Business outcomes including unknown, not_verified, ambiguous, partial, and conflict SHALL NOT be protocol failures.

#### Scenario: Unverified exact version
- **WHEN** an SDK client requests a discovered version without a reviewed capability claim
- **THEN** the capability tool returns not_verified with the requested Target and coverage as a successful result

#### Scenario: Malformed input
- **WHEN** a client submits an invalid Target or a per-call release selector
- **THEN** the call fails input validation without returning a false capability fact

### Requirement: Bounded MCP responses
List and search SHALL default to 20 results and reject limits above 20; comparisons SHALL retain the existing two-to-five Target bound. Evidence excerpts SHALL be limited to 2000 characters with truncation made visible. A response exceeding 128 KiB SHALL fail clearly rather than silently omitting facts. Pagination cursors SHALL retain the query service's release, normalized query, and order binding.

#### Scenario: Oversize response
- **WHEN** a result cannot fit the response limit
- **THEN** the tool returns a technical size error and asks the caller to narrow the query

#### Scenario: Cursor mismatch
- **WHEN** a cursor is reused with a different query or release
- **THEN** the continuation fails instead of returning a mixed page
