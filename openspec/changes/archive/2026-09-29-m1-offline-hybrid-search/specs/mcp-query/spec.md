# Spec Delta

## ADDED Requirements

### Requirement: Hybrid search availability in MCP
search_knowledge SHALL expose section-level match reasons and semantic availability from the shared query service. A missing local model SHALL be a successful degraded search response, not a false claim that hybrid recall completed.

#### Scenario: Offline fallback
- **WHEN** an MCP search runs without its release-bound model
- **THEN** lexical section matches are returned with semantic_unavailable indicated
