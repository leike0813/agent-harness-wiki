# Spec Delta

## MODIFIED Requirements

### Requirement: Five fixed read-only chapter tools
The stdio MCP server SHALL expose exactly `list_harnesses`, `get_topic`, `search_knowledge`, `compare_topics` and `get_source`, all backed by one verified release fixed at process start. `list_harnesses` SHALL accept a registration scope of registry or catalog, and `get_topic`, `compare_topics`, `search_knowledge` and `get_source` SHALL accept an optional surface. It SHALL reject per-call release selection, arbitrary paths or SQL and SHALL expose no write tool, Resources or Prompts. Every successful structured result and equivalent text rendering SHALL identify the fixed release.

#### Scenario: SDK tool listing
- **WHEN** an SDK client connects to a server started with a new-format fixture release
- **THEN** it sees exactly the five chapter tools and each successful call identifies that release

#### Scenario: Catalog-scope listing
- **WHEN** a client lists harnesses with the catalog scope
- **THEN** catalog-only candidates appear with their declared surfaces and no chapters or facts

### Requirement: Chapter response meaning
get_topic SHALL return whole chapter or stable section Markdown, question status and source indexes, explicit surface scope and explicit software-version resolution. compare_topics SHALL align common questions only; search_knowledge SHALL return readable section locators; get_source SHALL read a published source reference, including a catalog-registered reference, with its snapshot identity, locator, official link and bounded excerpt. Partial, unknown, conflict, not_investigated, source_only, approximate, not_found and ambiguous SHALL be business outcomes, while invalid input SHALL be an error.

#### Scenario: Source-only package request
- **WHEN** an installed version is requested but only a fixed unversioned document chapter exists
- **THEN** get_topic returns source_only with selected software version null and not_verified applicability

#### Scenario: Catalog reference
- **WHEN** get_source requests a catalog product's reference that no chapter cites
- **THEN** it returns the reference's snapshot identity, locator and excerpt
