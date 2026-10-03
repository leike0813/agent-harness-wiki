# Architecture Decision Records (ADR)

This directory holds ADRs that document material decisions for the
agent-harness-wiki project.

Per `AGENTS.md` §11, ADRs are only created when a real choice is
made. `0001-m0-toolchain-and-input.md` records the first implemented change;
`0002-local-release-publication.md` records the local release layout and SQLite index.
`0003-release-bound-query.md` records the offline query boundary.
`0004-fixed-source-provenance.md` records the first real source boundary.
`0005-first-wave-package-set.md` records the initial five fixed npm Targets; current managed-package storage and retention follow `0008-managed-package-storage.md`.
`0006-invoked-upstream-audit.md` records the on-demand audit ledger and isolated candidate originals.
`0007-offline-hybrid-search.md` records the fixed local embedding model and release-bound section search.
[`0008-managed-package-storage.md`](0008-managed-package-storage.md) records the approved NFS layout, local store index and registration, promotion backups and recovery, and historical snapshot retention. Approval does not establish migration acceptance.
[`0009-online-knowledge-distribution.md`](0009-online-knowledge-distribution.md) records the independent online static projection identity, limited online history with trim markers, bounded JSON lexical search, and the deployment capacity boundary.
[`0010-online-consumer.md`](0010-online-consumer.md) records the public consumer package identity, shared chapter-query domain, online client budgets and cache, lexical-only capability, and code/knowledge licensing. The public release pipeline remains a later change.
[`0011-public-publication.md`](0011-public-publication.md) records the durable publication ledger, immutable archives, retention and recovery windows, and the independent next/latest program release.
[`0012-daily-harness-monitor.md`](0012-daily-harness-monitor.md) records the daily upstream observation schedule, the monitoring worktree and main-process PID lock, the project-selected main-session model with an explicitly passed subagent model, a rolling pull request that keeps one candidate per product and topic until it merges, and the retained originals versus ephemeral source checkouts. The schedule stays disabled until its prerequisites are verified on `main`.

Conventions when ADRs are written:

- Filename: `NNNN-short-kebab-title.md`.
- Status values: `proposed`, `accepted`, `superseded`, `deprecated`.
- Reference the PRD sections being implemented and the upstream source where
  the decision was validated.
