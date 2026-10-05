## MODIFIED Requirements

### Requirement: Consumer commands and startup options
The consumer SHALL expose query list/topic/search/compare/source, mcp, init, help and version. Query commands and MCP SHALL remain read-only; init SHALL follow consumer-mcp-init. Startup options SHALL be data-url, offline, cache-dir and no-file-cache, with default https://leike0813.github.io/agent-harness-wiki/data/v1/. Tools SHALL not accept URL or release switches. Help/version/init SHALL require no knowledge access; program version SHALL also appear in MCP serverInfo.

#### Scenario: Help without published site
- **WHEN** a user requests help or version without network access
- **THEN** it succeeds without initializing knowledge or pretending the default site is deployed

#### Scenario: Configuration without published site
- **WHEN** a user runs init against a nonworking data URL
- **THEN** configuration is planned and written independently of knowledge availability

### Requirement: License attribution and consumer documentation
Code SHALL use MIT and original knowledge/documentation CC BY 4.0, preserving third-party rights and attribution. Consumer documentation SHALL explain init, unversioned default npx/MCP launch, optional exact-version installation, pure lexical discovery, URL and cache controls, limited history, local full-history preparation, errors and protocol upgrade. Publishing, OIDC, next/latest and server retention SHALL remain separate delivery work.

#### Scenario: Third-party excerpt
- **WHEN** a published source contains an official document excerpt
- **THEN** documentation preserves its source and original rights rather than claiming the project license replaces them

#### Scenario: Default MCP template
- **WHEN** a reader uses the documentation site's default configuration
- **THEN** the npm package argument is agent-harness-wiki without a version suffix
