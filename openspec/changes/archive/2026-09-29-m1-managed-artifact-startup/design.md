# Design

## Context

See proposal.md. The repository has a tracked research/package-set manifest and pnpm lock, a project-specific store, and sources:scan that can download candidate tarballs. There is no reusable direct binary entry or bwrap startup contract. Claude Code and OpenCode may expose a placeholder main command when lifecycle scripts are disabled.

## Goals / Non-Goals

**Goals:** A reproducible current runnable package identity for each first-wave CLI, safe candidate promotion, and an auditable Linux offline startup check independent of chapter publication.

**Non-Goals:** Topic behavior probing, using real user credentials, enabling package lifecycle scripts, cross-platform isolation claims, or making startup a release gate.

## Decisions

1. Resolve latest from each registered official npm channel and compare it with the selected version and integrity. Keep registry observation separate from source-commit and document identities. Suspicious rollback, integrity drift or ambiguous ordering stops automatic promotion.
2. Prepare the candidate package manifest, lock and installed bytes under a Git-ignored staging root; leave research/package-set as the selected identity until success. Use the existing package manager and project store rather than a second package installer. Record enough exact paths to reproduce the invocation.
3. Register a direct executable path and runtime per package. For placeholder launchers, select the locked platform dependency's real entry; if it is absent, keep a blocker. Do not run postinstall to discover a path.
4. Run a minimal version/help command inside bwrap with a clean temporary config root and workspace, read-only candidate bytes, no ambient tokens or network, and process/time/output limits. The check establishes startup in that environment only; no provider request is made.
5. Promote the verified candidate as the selected package set, then retire old executable bytes. On any failure, preserve the previous selected set and record the candidate outcome. The knowledge current pointer is never part of this transaction.

## Risks / Trade-offs

- Package metadata can change under an unchanged version → integrity drift stops promotion and leaves a reviewable anomaly.
- A command may unexpectedly access network or user files → the sandbox denies both; inability to form the sandbox blocks the check.
- A tracked lock may be updated without matching runnable bytes → write selected identity only after startup succeeds and verify it against the promoted bytes.
- First-wave packages have different entry layouts → register one explicit entry per package instead of guessing from command names.

## Migration Plan

Add an isolated candidate path and direct-entry registry, then exercise each first-wave CLI in the Linux sandbox. Keep the currently selected package set until its replacement passes. Update the tracked manifest and lock after successful candidate promotion; report objective blockers per product and retain the previous runnable set when present.
