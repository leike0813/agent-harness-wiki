# Design

## Context

QueryService already opens one verified SQLite release and implements five operations. The pinned MCP SDK 2.1.0 passes a real stdio ping test and accepts Zod input/output schemas plus structured content. VitePress 1.6.4 was tested building the existing generated release Markdown directly with an external output directory.

## Goals / Non-Goals

**Goals:** Complete the M0 read-only interfaces and make their offline checks runnable repeatedly from a fresh installation.

**Non-Goals:** Remote MCP transport, live upstream reads, embedding, real harness knowledge, or a second source of website facts.

## Decisions

- Move private list, search, comparison, and evidence request schemas into a shared query contract, with result schemas derived from existing domain records. MCP registers these schemas and delegates to QueryService; the CLI keeps the same service. This avoids a separate MCP interpretation of version or support.
- Start `ahw mcp` with `--release-id` and `--releases-root`; otherwise QueryService resolves current once. Open before connecting stdio so startup errors go to stderr, and close the service on termination. Use the installed SDK's Zod-based `registerTool`, `structuredContent`, output schemas, and read-only annotations. Register only five tools.
- `get_capability` uses full detail by default. Summary projects only display fields from the one service result, retaining support, Target, conditions, coverage, assessment status, and evidence IDs. The compact text block is JSON of the same structured payload. Tool-specific presentation is permitted; fact selection stays in QueryService.
- MCP limits are 20 for list/search, 2000 Unicode characters for evidence excerpts, and 128 KiB for a serialized response. A too-large response returns an error. Backend cursors remain unchanged. This bounds stdio memory and prevents silent fact truncation.
- Keep the immutable release renderer unchanged so older releases remain verifiable. A Node script creates a temporary fixture release when no ID is supplied, or verifies a selected release. It copies generated Markdown into an ignored temporary site source, adds a static status guide without configuration facts, then runs VitePress with `--outDir site/.vitepress/dist`. The copy also keeps dependency resolution inside the workspace when a selected release lives outside it.
- `pnpm mcp:smoke` targets the complete SDK subprocess integration test. `pnpm test:integration` includes that test; `pnpm verify` runs integration once, plus all other required checks and the self-contained site build.

## Risks / Trade-offs

- A large fact may exceed the MCP response cap → return an explicit error, preserving integrity; callers can narrow filters.
- Site build output can be partial on failure → only report success after VitePress exits successfully; generated site files remain ignored.
- The fixture has no default disputed/partial fact page → generate an explanation page and test a temporary altered release for actual disputed/partial rendering.

## Migration Plan

No data migration. Existing releases remain valid; generated status guidance appears in newly built releases. The default docs build uses a temporary fixture and does not replace the user's current release pointer.
