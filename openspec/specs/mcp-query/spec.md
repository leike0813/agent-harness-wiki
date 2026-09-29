# mcp-query Specification

## Purpose

Exposes reviewed local knowledge through five stable MCP stdio tools that retain the selected release, version boundaries, conditions, uncertainty, and evidence.

## Requirements

### Requirement: Five fixed read-only chapter tools
The stdio MCP server SHALL expose exactly `list_harnesses`, `get_topic`, `search_knowledge`, `compare_topics` and `get_source`, all backed by one verified release fixed at process start. It SHALL reject per-call release selection, arbitrary paths or SQL and SHALL expose no write tool, Resources or Prompts. Every successful structured result and equivalent text rendering SHALL identify the fixed release.

#### Scenario: SDK tool listing
- **WHEN** an SDK client connects to a server started with a new-format fixture release
- **THEN** it sees exactly the five chapter tools and each successful call identifies that release

### Requirement: Chapter response meaning
get_topic SHALL return whole chapter or stable section Markdown, question status and source indexes, and explicit software-version resolution. compare_topics SHALL align common questions only; search_knowledge SHALL return readable section locators; get_source SHALL read only published snapshot locator, official link and bounded excerpt. Partial, unknown, conflict, source_only, approximate, not_found and ambiguous SHALL be business outcomes, while invalid input SHALL be an error.

#### Scenario: Source-only package request
- **WHEN** an installed version is requested but only a fixed unversioned document chapter exists
- **THEN** get_topic returns source_only with selected software version null and not_verified applicability

### Requirement: Bounded section reading
List and search SHALL default to 10 and reject limits above 20; comparison SHALL accept two to five targets. Source excerpts SHALL be at most 2000 characters, and response content SHALL not exceed 128 KiB. An oversized whole chapter SHALL return response_too_large with its section index instead of a truncated body; every published section SHALL be individually readable. Cursors SHALL bind release, normalized query and order.

#### Scenario: Large chapter
- **WHEN** a whole chapter exceeds the MCP response limit
- **THEN** get_topic returns the section index and a caller can read each section without content truncation

### Requirement: Hybrid search availability in MCP
search_knowledge SHALL expose section-level match reasons and semantic availability from the shared query service. A missing local model SHALL be a successful degraded search response, not a false claim that hybrid recall completed.

#### Scenario: Offline fallback
- **WHEN** an MCP search runs without its release-bound model
- **THEN** lexical section matches are returned with semantic_unavailable indicated
