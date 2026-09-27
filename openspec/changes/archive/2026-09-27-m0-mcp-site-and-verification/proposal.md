# Proposal

## Why

The reviewed fixture release is queryable through the CLI, but M0 still lacks its promised MCP and website entry points. This change closes the same-release, offline path and gives contributors one repeatable acceptance command.

## What Changes

- Expose the five existing QueryService operations through a read-only local MCP stdio server and `ahw mcp`.
- Build a VitePress site directly from the verified release's generated Markdown, with an explanation of uncertainty states.
- Add real SDK client/server smoke coverage and an idempotent `pnpm verify` workflow.
- Update user and development documentation to reflect the completed M0 path only after checks pass.

## Capabilities

### New Capabilities

- `mcp-query`: Five fixed, release-bound, bounded read-only MCP tools over QueryService.
- `knowledge-site`: Offline VitePress rendering of published knowledge and an independent, repeatable M0 acceptance path.

### Modified Capabilities

None. Existing knowledge and query semantics remain the source of truth.

## Impact

MCP adapter and CLI startup, shared query schemas, generated status guidance, site build script, package scripts, SDK integration tests, site checks, README and development documentation. No dependency upgrade or real harness research.
