# Design

## Context

See proposal.md for motivation. The archived online builder already verifies whole deployments and a 512 MiB limit, but mixes retained inputs into a build. The consumer is installable and its six-platform matrix passed; its verification script still fixes programVersion to 1.0.0. The remote main predates both changes. Pages and the public npm package return 404. The user selected a dedicated ledger branch, real delivery, PR integration and interactive 1.0.0 bootstrap.

## Goals / Non-Goals

**Goals:** preserve independently immutable publications while producing mutable deployment envelopes; make interruption and public readback visible; keep the two release channels independently recoverable.

**Non-Goals:** v2 knowledge production, background workers, upstream refresh, changes to consumer v1 DTO or local hybrid-search requirements. No new dependencies.

## Decisions

### Ledger and operation state

Use publication-state/state.json with strict Zod parsing and GitHub Contents API compare-and-swap updates. Initialize the branch once through the Git data API, never force-push or commit ledger files into main. Keep release reservations (commit, protocol, fixed published_at, archive tag, verified time and last exit), per-protocol lifecycle/current/recovery, pending deployment and transition records, and npm candidate/latest records in one JSON authority. Every production writer shares the publication-production concurrency group with queue=max and no running cancellation; optimistic updates still reject lost changes.

Before deployment save run identity, old target, selected target and intent time. Successful deployment and confirmed public pointer record a conservative exit timestamp; only successful full readback marks the target verified. Unknown outcomes retain pending state and protect all implicated resources. A reconciliation operation confirms deployment status and the public pointer before completing or rejecting intent. A first publication cannot invent a predecessor. A Release timestamp, client cache or initial build is never a current transition.

### Immutable artifacts and deployment envelopes

Build canonical candidates without retained data. A web-v1-<SHA> GitHub Release contains site.tar.gz with the candidate's complete directory and integrity.json, plus existing code/knowledge license notices. Enable repository immutable releases; upload into a draft and publish after archive verification. Retries download saved successful assets; interrupted drafts can be completed without overwriting published bytes. Archive extraction rejects absolute/traversal paths, links and special files, and bounds expanded bytes with the existing deployment limit.

Expose assembleOnlineDeployment({candidateDir, retainedDirs, outDir, pointers?}) in the existing online-site module. Copy the verified candidate into fresh staging, include only selected retained data, apply explicit protocol lifecycle pointers, regenerate the mutable root integrity inventory, and verify everything before accepting output. Source archives stay unchanged. Known v1 resources retain full semantic validation; preserved other partitions retain verified archive integrity. Candidate pages always belong to the selected publication. Do not make a new copy of all previous pages in every deployment.

### Retention and retirement

Retention is a pure policy over strict ledger state and an injected UTC time. Keep current, an independently verified recovery candidate, every confirmed exit less than 30 days ago, and all pending/uncertain targets. Freeze a legacy partition only with a verified current, announced upgrade guidance and a retirement date at least 90 days after freeze. Retirement requires both announcement time and outstanding windows to pass; replace its entry with the existing retired variant. The policy is tested with synthetic protocol transitions; actual v1 builds remain v1. Do not automatically delete Release archives or add scheduled cleanup. Apply eligible data exclusion only during a validated deployment assembly.

### Production workflow and scripts

The maintainer publication script provides prepare, begin, finish, reconcile and lifecycle operations; workflows own the official Pages upload/deploy actions. Prepare reserves publication time, obtains or creates the immutable archive, selects protected archives and assembles output. Normal begin rechecks main head immediately before deployment; recovery accepts an archived verified target. Finish records deployment identity and public readback; failures distinguish pre-deployment from unknown deployment. Public readback is bounded by 120 seconds, uses the existing online query client for data and representative lexical queries, and checks matching page identities.

PR only runs production build and controlled verification with read permission. Main and manual publishing use contents write for archives/ledger and the official pages/id-token write deployment permissions in github-pages. Required Git history is fetched without executing submodules. The production checkout is clean and does not depend on local ignored knowledge or models. A shared mutex includes program state writers so the ledger cannot lose a channel's updates.

### Program publication and bootstrap

Use a separate npm-publication.yml triggered by npm-vX.Y.Z, with candidate packaging/controlled verification, next publication and public matrix validation before latest promotion. Use Node 24.12.0 and npm 11.21.0 for publisher operations; npm OIDC dist-tag requires this version and separate permission. Reuse existing six OS/Node combinations for consumer runtime evidence. Candidate version and artifact integrity come from package metadata, not a second version constant.

The first tag run retains the verified tgz as an Actions artifact and stops before publishing if bootstrap is unavailable. The maintainer uses isolated interactive npm authentication to publish exactly that 1.0.0 artifact to next and configures trusted publisher owner/repository/workflow/environment with publish and dist-tag permission. A rerun recognizes the existing candidate by integrity, verifies public installation against Pages and uses OIDC to promote latest. Future candidates publish with OIDC. No automated login, existing user npm configuration read, token output or long-lived CI write token. Pending/promoted records and public tags prevent an older candidate overtaking a newer stable program.

## Risks / Trade-offs

- Current production is about 232 MiB and each retained data release about 99 MiB: four complete recent releases can exceed capacity. Stop and report rather than weaken retention.
- Deployment and ledger updates cannot be one platform transaction: durable intent and conservative reconciliation block unsafe follow-up after an interruption.
- GitHub Pages can lag deployment completion: bounded retry accepts only the expected public identity; unresolved results remain uncertain.
- Interactive npm bootstrap/2FA cannot be completed unattended: finish all code and artifact validation first, then request the specific account action.
- Archives grow because automatic archive deletion is omitted: operators can review their lifecycle later without shortening protected windows.

## Migration Plan

Implement and validate on dev, create a PR and merge with a merge commit so dev remains. Initialize ledger and publishing settings, deploy and verify production Pages, exercise archive recovery, then push npm-v1.0.0 and perform the agreed bootstrap. Rerun the tag workflow through public acceptance and latest. Preserve separate implementation, deployment and publication evidence; do not mark external tasks complete while account setup or real checks are pending.
