# Design

## Context

See proposal.md for motivation. The archived projection exposes strict v1 JSON and `queryOnlineSearch` with a byte reader. Local QueryService currently imports SQLite, compiler verification and Ollama; its private selection and answer projection must be shared without loading those dependencies. MCP callbacks currently accept a concrete local service and are synchronous except search. No consumer workspace or licenses exist. The resolved map (especially issues 03 and 06) fixes product policy; this design assigns implementation boundaries.

## Goals / Non-Goals

Goals: one domain implementation for local/online chapter semantics; one consumer operation context for deadlines, resource count and cancellation; actual isolated npm artifacts. Non-goals: generic storage plugins, background cache daemons, JS API, semantic consumer search, upstream network, publication or Git mutation. Local synchronous query callers and model gate remain valid.

## Decisions

### Shared domain and DTO

Extract cohesive pure chapter-query logic for aliases, resolution, surface-scoped chapter results and common-question comparison. Local QueryService adapts its records; online service uses catalog and topic metadata, resolves trimmed markers before fetching prose, and uses chapter source_scope directly. Move sectionText into this pure module so runtime imports do not reach search-index's Ollama import. Keep existing local DTOs; define/export consumer result schemas separately in src/domain/consumer.ts, with shared resolution schema, metadata and stable error codes. Search flattens lexical locators into existing items shape without semantic_status. Version results use history_scope=current_and_previous; history_not_available carries edition_id, resolution, target and local_history_url.

### Online resource client

src/query/online-client.ts exports OnlineClient.open(options), manifest/catalog/releaseId metadata, operation(signal?) and read(relative, operation). Operation exposes signal, check() and cooperative checkpoint(), owns one 30-second monotonic deadline and a set of 64 distinct resources; repeated reads count once even from cache. Initialization uses one such context across current/manifest/catalog; last-success is updated only after validation. close() aborts all operations. Use native fetch with 4-slot process semaphore, complete-body 10-second request timeout, at most one retry, cancellable bounded waits and Retry-After. Required 404 is technical; source absence comes solely from directory. Every resource is schema- and identity-checked before cache installation; request-specific identities are also checked by service. Reader APIs remain fixed-release-relative and never expose arbitrary reads to tools.

Errors live in src/query/online-error.ts with OnlineError(code, reason, {retryable, releaseId?, httpStatus?}), plus one serialization helper; codes include agreed failures, invalid_input and operation_cancelled. Consumers distinguish unsupported protocol before parsing the strict v1 pointer; valid retired pointers carry upgrade guidance without a fabricated release.

### Cache

Use Map insertion order for 32 MiB LRU content and filesystem mtime for best-effort 128 MiB disk LRU; no cache database. Owned directories are keyed by hash of normalized entry/protocol and contain immutable relative resources plus atomic last-success JSON. Same-directory unique temporary files and rename install only validated complete bytes. Read resources are revalidated; online damaged cache refetches the same path, offline fails. Disk read/write/reclaim failures produce bounded diagnostics without invalidating good online bytes. Default directories follow issue 06; no-file-cache bypasses all disk operations. Active returned objects survive eviction. Simultaneous calls do not share in-flight fetch cancellation. The disk target is soft across processes.

### Consumer package and MCP

packages/consumer owns public name/version/bin; root renamed agent-harness-wiki-maintainer remains private and retains pnpm ahw. A consumer TypeScript config emits the consumer entry's reachable graph into package dist, preserving relative imports; explicit files ensures runtime code is packed despite gitignore. Runtime dependencies are the existing exact Commander/Zod/MCP server versions. No exports library API. A structural five-operation contract lets MCP await both local and online results, pass SDK ctx.mcpReq.signal, and close the bound service on disconnect. Consumers attach program version and lexical description. Response bounding preserves online metadata and resolution. CLI initializes only a selected query/mcp command, permits global startup options around subcommands, and emits the same structured errors in JSON mode.

### Verification and CI

Use actual v1 resources from existing projection fixtures, loopback HTTP and temporary cache/home. Real tgz installation and npx use isolated npm state outside the source tree; default tests do not use public registry knowledge or real HOME. Locked installed dependencies can seed a controlled npm registry/cache for offline artifact tests. Reuse domain behavior tests rather than snapshots. consumer:build, consumer:pack and consumer:verify become reproducible package-script entry points. Validation-only CI runs ubuntu-24.04/x64, macos-15/arm64, windows-2025/x64 × Node 24.12.0 and latest 24.x (record actual versions); no deploy permissions or publication. Missing runner executions stay unchecked as explicitly approved by user. Root verify exercises local regressions and consumer checks independently.

## Risks / Trade-offs

Disk concurrency can briefly exceed target → atomic resource install and best-effort owned LRU; no strict quota claim. Cooperative cancellation during parsing/ranking → bounded inputs and checkpoints around batches, retaining 20,000 candidate limit. Workspace compilation can emit forbidden imports → actual tgz and installed dependency closure checks. Current host is only Linux minimum Node → matrix configuration plus truthful not_run records; no CI execution fabricated. Default URL not deployed → controlled data-url tests and documentation distinguish readiness from publication.

## Migration Plan

Create and validate artifacts, implement shared core and client, integrate consumer/MCP/package, run controlled and full local acceptance, update evidence and matrix status. No current pointer, public site, npm channel, branch or commit changes are part of execution. No schema changes to source knowledge or previously immutable releases.
