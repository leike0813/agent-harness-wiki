# Architecture Decision Records (ADR)

This directory holds ADRs that document material decisions for the
agent-harness-wiki project.

Per `AGENTS.md` §11 / PRD §23, ADRs are only created when a real choice is
made. `0001-m0-toolchain-and-input.md` records the first implemented change;
`0002-local-release-publication.md` records the local release layout and SQLite index.
Query ranking and search policy belong to later changes.

Conventions when ADRs are written:

- Filename: `NNNN-short-kebab-title.md`.
- Status values: `proposed`, `accepted`, `superseded`, `deprecated`.
- Reference the PRD sections being implemented and the upstream source where
  the decision was validated.
