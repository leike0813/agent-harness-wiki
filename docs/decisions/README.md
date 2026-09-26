# Architecture Decision Records (ADR)

This directory holds ADRs that document material decisions for the
agent-harness-wiki project.

Per `AGENTS.md` §11 / PRD §23, ADRs are only created when a real choice is
made. The directory is intentionally empty during the M0 scaffolding phase;
decisions will be added as features land (toolchain lock, SQLite access
strategy, release layout, conditional expression scope, search strategy, etc.).

Conventions when ADRs are written:

- Filename: `NNNN-short-kebab-title.md`.
- Status values: `proposed`, `accepted`, `superseded`, `deprecated`.
- Reference the PRD sections being implemented and the upstream source where
  the decision was validated.