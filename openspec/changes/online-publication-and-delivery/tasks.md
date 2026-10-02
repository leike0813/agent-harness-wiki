# Tasks

## 1. Durable state and retention

- [x] 1.1 Implement strict publication ledger, fixed-time reservations, serialized/CAS GitHub persistence and uncertain-operation recovery; controlled HTTP tests verify conflicts, missing state and interrupted deployments.
- [x] 1.2 Implement pure 30-day retention, renewed exit timing, current/recovery and pending protection, 90-day freeze/retirement policy; table-driven tests cover boundaries and failed targets; document authority and lifecycle in the publication ADR.

## 2. Archives and deployment assembly

- [x] 2.1 Add independently immutable candidate archive packing/extraction and draft-to-immutable Release reuse; verify archive round trips, unsafe entries and failed/repeated uploads without replacing published assets.
- [x] 2.2 Extend existing site module to assemble selected pages with exactly protected data and explicit lifecycle pointers; integration tests cover restoration, source-byte preservation, expiry and inclusive 512 MiB failure; document canonical/archive/deployment separation.

## 3. Knowledge publication

- [x] 3.1 Implement maintainer prepare/begin/finish/reconcile operations and bounded public readback; controlled tests cover stale candidates, fixed targets, failures and conservative transition recording.
- [x] 3.2 Add main/PR/manual Pages workflow with locked tooling, complete history, shared non-cancelling production concurrency and least permissions; run production build/verify and document retry/recovery commands.

## 4. Program publication

- [x] 4.1 Reuse package version in verification and add exact-public-package CLI/SDK stdio validation with isolated configuration; controlled tests verify candidate integrity, failed installs and release metadata without default public network.
- [x] 4.2 Add tag/version/main checks, next publication and latest promotion with pinned npm/OIDC and shared ledger; controlled tests cover reruns and older candidates; document initial interactive 1.0.0 bootstrap and trust fields.
- [x] 4.3 Add public six-platform candidate acceptance before promotion; validate workflow and preserve actual runner/package/knowledge evidence.

## 5. Integration and actual delivery

- [x] 5.1 Update PRD/AGENTS/README/architecture/data-model/development/knowledge-workflow/roadmap and ADR to implemented boundaries, then pass pnpm verify and OpenSpec strict validation.
- [x] 5.2 Commit/push dev, create and merge a passing PR, initialize ledger/Pages/environments/immutable releases and actually deploy; record CI, archive, public resource/page identities and successful readback.
- [x] 5.3 Actually retrieve an archive, exercise manual recovery and restore the latest production target; record transition/protection and public validation evidence.
- [x] 5.4 Tag the verified 1.0.0 candidate, deliver its tested tgz for maintainer bootstrap/trust setup, run public npm and actual Pages acceptance on the platform matrix, promote and verify latest; leave incomplete if account preparation or public acceptance is blocked.

Public acceptance is separate from controlled tests. No fixture, authored workflow, prepared tgz or account-setup instruction counts as successful deployment or publication. This change stays active until all required external checks succeed; archive is not part of this request.
