# Design

## Context

The v2 release already publishes artifact metadata, and its query projection excludes draft Claims. Current source snapshots distinguish exact Git revisions from unversioned documentation. The seven-topic Coverage schema has free-text investigation notes but no structured snapshot references. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** Fix the five package identities, make source-backed investigations inspectable, and prepare a reviewable exact-version fact candidate. Keep release building offline and historical releases queryable without executable originals.

**Non-Goals:** Executing a harness, proving startup, observing runtime behavior, automatic version polling, or adding query operations.

## Decisions

1. Use one standalone `research/package-set/package.json` with five exact dependencies and its own pnpm lockfile. `--ignore-workspace --ignore-scripts --ignore-pnpmfile` separates it from the application workspace and prevents package lifecycle scripts. The package store is project-owned under ignored `archive/pnpm-store`; the installed package links are also ignored. Fetch only the host's Linux/x64/glibc optional package closure. A later manual refresh replaces the lockfile, verifies the new set, then prunes the dedicated store. This uses pnpm's existing lock and content store instead of a custom downloader or tarball archive.
2. Add `npm_registry` Source, `managed_package` Artifact, and `npm_release` Snapshot variants. The Source names the official registry package. Artifact records exact package version, registry SRI, safe package link, a selected bounded file and its SHA-256, and the tracked package-set lockfile. Snapshot binds that artifact to the exact release Target and capture time. Validation cross-checks these identities; offline audit checks installed package identity, lockfile integrity, and selected file bytes. Package facts require this snapshot, not a source-tree commit or unversioned page.
3. Add optional `snapshot_refs` to Coverage, reusing `investigation_notes` for scope, checks, result, and gap. All 35 Target-topic records need fixed-source references and a concrete investigation result or gap; unknown package behavior remains `partial` or `blocked`. No general investigation object or new query API is needed.
4. Keep draft Claims in tracked knowledge for user review. Existing release projection already excludes drafts. An accepted Assessment must represent the user's actual semantic decision and cite evidence from the same exact Target. Compile a candidate release in a temporary root first; publish the formal local release only after human acceptance.
5. Retain source documentation originals separately from executable package retention. The immutable release contains metadata and reviewed excerpts, so old releases work after package eviction. Explicit original audit reports a retired package as unavailable rather than pretending it remains locally reproducible.

## Risks / Trade-offs

- Native bundles consume substantial disk despite pnpm sharing other dependencies → keep one selected version per package and use a dedicated prunable store.
- A package's files may be unavailable after an update → keep integrity, exact identity, locator, and reviewed short excerpt in tracked records; require exact re-fetch for a later original audit.
- An official public repository may not match an npm package build → keep source-tree and package snapshots separate unless a verified mapping is added later.

## Migration Plan

Additive schema variants preserve existing fixture and v1/v2 release reads. Update docs and the source-provenance spec for the revised executable retention policy. Do not change the current release pointer until the review gate and release verification pass.
