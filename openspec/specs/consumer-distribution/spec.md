# consumer-distribution Specification

## Purpose

Defines the independently installable consumer program and its licensing, read-only command surface, actual packaged-runtime acceptance and honest platform support declarations, separate from maintainer tooling and public publication workflows.

## Requirements

### Requirement: Independent lightweight package
The public package SHALL be agent-harness-wiki, initial version 1.0.0, with ahw bin and no public JS library API. It SHALL contain compiled consumer runtime, required dependencies, metadata, documentation and licenses, excluding SQLite, models, full knowledge, upstream artifacts, maintainer commands and configuration. The root maintainer workspace SHALL stay private with independently usable local commands.

#### Scenario: External install
- **WHEN** the actual tgz is installed outside the source tree
- **THEN** ahw runs without pnpm, TypeScript or native build tools and all runtime imports resolve from installed package dependencies

### Requirement: Consumer commands and startup options
The consumer SHALL expose query list/topic/search/compare/source, mcp, help and version. Startup options SHALL be data-url, offline, cache-dir and no-file-cache, with default https://leike0813.github.io/agent-harness-wiki/data/v1/. Tools SHALL not accept URL or release switches. Help/version SHALL require no knowledge access; program version SHALL also appear in MCP serverInfo.

#### Scenario: Help without published site
- **WHEN** a user requests help or version without network access
- **THEN** it succeeds without initializing knowledge or pretending the default site is deployed

### Requirement: Platform cache conventions and runtime
Consumers SHALL require Node >=24.12.0 <25. Explicit cache-dir SHALL resolve from cwd and override platform defaults. Linux SHALL use valid absolute XDG_CACHE_HOME or home/.cache; macOS home/Library/Caches; Windows valid absolute LOCALAPPDATA or home/AppData/Local, followed by the established agent-harness-wiki namespace and Windows Cache suffix.

#### Scenario: Invalid platform cache variable
- **WHEN** XDG_CACHE_HOME or LOCALAPPDATA is absent, empty or relative
- **THEN** the documented home fallback is used without reading a real user's configuration in tests

### Requirement: Packaged CLI and MCP contracts
Actual installed-package CLI/npx and SDK stdio SHALL demonstrate five tools, matching consumer results, strict input, read-only annotations, no Resources or Prompts, cancellation and clean stdout. MCP responses SHALL retain the existing 128 KiB bound, readable-section guidance and 2,000-character excerpt limit; technical errors SHALL use isError and CLI nonzero JSON errors.

#### Scenario: Oversized whole chapter
- **WHEN** its MCP response exceeds the bound
- **THEN** response_too_large preserves publication metadata and section guidance without truncating the body

### Requirement: Validation matrix and truthful delivery
A validation-only CI matrix SHALL cover Linux x64, macOS arm64 and Windows native x64 on minimum and latest Node 24.x, including real tgz, path-with-spaces, CLI and stdio. Actual OS/architecture/Node/ICU and results SHALL be recorded. Unrun combinations SHALL remain unverified; package creation SHALL not be called npm publication or Pages deployment.

#### Scenario: CI configuration without execution
- **WHEN** the matrix exists but a runner has not executed it
- **THEN** its combination remains not_run and is not declared supported or marked accepted

### Requirement: License attribution and consumer documentation
Code SHALL use MIT and original knowledge/documentation CC BY 4.0, preserving third-party rights and attribution. Consumer documentation SHALL explain fixed-version npx/MCP, pure lexical discovery, URL and cache controls, limited history, local full-history preparation, errors and protocol upgrade. Publishing, OIDC, next/latest and server retention SHALL remain separate delivery work.

#### Scenario: Third-party excerpt
- **WHEN** a published source contains an official document excerpt
- **THEN** documentation preserves its source and original rights rather than claiming the project license replaces them
