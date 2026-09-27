# Tasks

## 1. Published discovery data

- [x] 1.1 Preserve validated snapshot and source metadata in releases; verify existing release integration tests pass.
- [x] 1.2 Add fictional 2.0.0 discovery source and snapshot; verify dataset validation and a release includes them without a claim.

## 2. Query service

- [x] 2.1 Implement strict request schemas and verified, read-only, release-bound service; verify invalid inputs and implicit fixture selection fail.
- [x] 2.2 Implement list, capability, comparison, and evidence operations; verify exact, latest, conditions, conflicts, coverage, and Target tests.
- [x] 2.3 Implement bounded search and cursors; verify alias, exact, FTS literal, pagination, and cursor tests.

## 3. CLI and delivery

- [x] 3.1 Implement `ahw validate`, `compile`, and five query commands; verify CLI integration and nonzero invalid input behavior.
- [x] 3.2 Update scripts and documentation; verify commands and query limits match actual implementation.
- [x] 3.3 Run OpenSpec strict validation and relevant build, test, typecheck, lint, and formatting checks; fix failures.
