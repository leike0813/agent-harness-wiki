# Spec Delta

## Purpose

Defines how the project keeps one verified current executable environment per registered CLI by checking official package identity and a minimal isolated startup before promotion, without making execution a knowledge-publication gate.

## ADDED Requirements

### Requirement: Official latest candidate identity
For each first-wave npm CLI, the maintainer-invoked updater SHALL observe its registered package's latest dist-tag and record channel, exact resolved version, registry integrity and observation time. It SHALL NOT infer latest from the largest version string or equate npm identity with a Git commit or documentation snapshot. A comparable tag rollback, changed integrity for the same version, or incomparable candidate SHALL suspend automatic promotion with a recorded anomaly.

#### Scenario: Same version, changed integrity
- **WHEN** latest reports the current version with a different integrity
- **THEN** the candidate is recorded as anomalous and the current executable remains selected

### Requirement: Staged verified package set
Candidate package bytes and platform dependencies SHALL be acquired in ignored staging, pinned with the package-manager lock, and checked against official integrity before any current set is replaced. Installation scripts SHALL remain disabled. A missing platform dependency or a command that requires postinstall download SHALL be blocked rather than executed to repair the candidate.

#### Scenario: Placeholder main command
- **WHEN** a package's public command is a postinstall placeholder but a locked platform dependency contains the real executable
- **THEN** startup uses the registered direct executable path without enabling installation scripts

### Requirement: Isolated offline startup
The Linux startup check SHALL invoke the registered direct entry and offline version or help argument in bwrap with read-only package bytes, temporary home/config/workspace, no user credentials, no network, and bounded time, output and processes. It SHALL record the actual command, runtime, sandbox setup, exit status, recognizable identity output and any failure. If bwrap is unavailable it SHALL report blocked rather than silently use a HOME-only fallback.

#### Scenario: Sandbox absent
- **WHEN** bwrap cannot provide the required isolation
- **THEN** the candidate is blocked, the prior environment remains current, and knowledge publication can proceed independently

### Requirement: Successful promotion and independent status
Only a candidate that passes identity and isolated startup checks SHALL become the current managed environment. Failure SHALL retain the previous runnable version and an auditable candidate result. After successful promotion the older executable bytes MAY be retired. Startup status SHALL NOT be treated as evidence of Skills, MCP or another topic capability and SHALL NOT block a validated knowledge release.

#### Scenario: New package fails startup
- **WHEN** a candidate package verifies but its offline help command fails
- **THEN** the old runnable package remains current while the new candidate and its reason remain recorded
