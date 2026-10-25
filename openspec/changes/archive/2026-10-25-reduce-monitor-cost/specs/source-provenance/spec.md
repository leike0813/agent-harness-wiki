# Spec Delta

## ADDED Requirements

### Requirement: Fixed-snapshot reference validation
A published source reference SHALL validate its locator and excerpt against the reference's own fixed snapshot. A later upstream line move, content shift outside the cited excerpt, redirect to an equivalent official path, or relative-to-absolute link spelling SHALL NOT invalidate the fixed reference or by itself trigger a chapter revision. A changed source location MAY be registered for future observation without rewriting an old snapshot or reference.

#### Scenario: Later upstream line movement
- **WHEN** the current upstream file has moved the cited text to new line numbers
- **THEN** validation uses the fixed snapshot and the prior reference remains valid

#### Scenario: Equivalent official link
- **WHEN** an official source is now reached through an equivalent absolute link instead of its earlier relative form
- **THEN** the old reference remains valid and no chapter rewrite is required

#### Scenario: Fixed excerpt differs
- **WHEN** the excerpt or locator does not match the bytes in its own fixed snapshot
- **THEN** validation fails and the reference is not treated as proof

#### Scenario: Observation entry changes
- **WHEN** a registered source sets a separate `observation_url` for later checks
- **THEN** its `url`, prior snapshots and published references remain unchanged
