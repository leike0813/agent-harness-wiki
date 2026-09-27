# Tasks

## 1. Toolchain

- [x] 1.1 Pin Node, pnpm, strict TypeScript/ESM, root and site workspace manifests; install selected dependencies and generate `pnpm-lock.yaml` with pnpm.
- [x] 1.2 Add build, typecheck, lint, format check, test, and schema export scripts; verify a minimal official MCP v2 stdio client/server exchange.

## 2. Domain and fixtures

- [x] 2.1 Implement strict Zod record schemas, derived TypeScript types, finite condition and assertion unions, and deterministic JSON Schema export.
- [x] 2.2 Create the basic two-harness fixture dataset with real content hashes, precise Target/conditions, six core topics, config precedence, Evidence, Assessment, and Coverage.

## 3. Validation

- [x] 3.1 Implement bounded YAML loading and actionable schema diagnostics, including duplicate keys, unsupported tags, unsafe paths, and fixture profile separation.
- [x] 3.2 Implement cross-record IDs, references, Target/version/condition, accepted-evidence/review, supersession, and dispute validation.
- [x] 3.3 Add representative positive and negative tests using separate invalid fixtures; preserve unknown and partial states.

## 4. Documentation and acceptance

- [x] 4.1 Record actual schemas, commands, dependency compatibility and remaining M0 scope in README, data-model/development docs and a concise ADR.
- [x] 4.2 Run frozen-lockfile install, schema export consistency, build, typecheck, lint, format check, unit/integration tests and `openspec validate m0-domain-and-fixtures --strict`; report any blocked checks without marking them complete.
