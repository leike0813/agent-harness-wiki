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

Conventions when ADRs are written:

- Filename: `NNNN-short-kebab-title.md`.
- Status values: `proposed`, `accepted`, `superseded`, `deprecated`.
- Reference the PRD sections being implemented and the upstream source where
  the decision was validated.
