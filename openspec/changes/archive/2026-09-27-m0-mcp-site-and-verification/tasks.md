# Tasks

## 1. Shared MCP contract

- [x] 1.1 Export shared query input/output schemas and preserve existing CLI/query behavior; verify typecheck and query integration tests.
- [x] 1.2 Implement the five bounded MCP tool adapters and `ahw mcp`; verify the built CLI starts with an explicit fixture release.
- [x] 1.3 Test all five tools, normal uncertainty, malformed input, cursor binding, and shutdown with an SDK subprocess; test size and Unicode excerpt limits directly; verify `pnpm mcp:smoke` passes.

## 2. Published site

- [x] 2.1 Add site guidance for status and time semantics while preserving existing release integrity; verify fixture labeling.
- [x] 2.2 Implement self-contained VitePress build from a temporary fixture or explicit verified release; verify repeated `pnpm docs:build` succeeds without changing the release.
- [x] 2.3 Test built pages and release integrity, plus escaped evidence and disputed/partial projection; verify site integration test passes.

## 3. M0 delivery

- [x] 3.1 Add `pnpm verify` and update README, architecture, data model, development guide, and roadmap to actual commands; verify a fresh-style run needs no prebuilt release.
- [x] 3.2 Run full verification, standalone MCP smoke, strict OpenSpec validation, and diff checks; fix failures and record actual limitations.
