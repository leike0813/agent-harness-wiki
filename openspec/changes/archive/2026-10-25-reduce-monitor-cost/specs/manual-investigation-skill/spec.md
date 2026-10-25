# Spec Delta

## ADDED Requirements

### Requirement: Manual outcome registration
Manual maintenance SHALL register its integrated audit through `record` with `task_id` omitted, using automatic-task audit validation. Failed candidates SHALL leave a blocking audit before registration. Manual work SHALL not consume automatic weekly slots or start a monitor session.

#### Scenario: Completed manual chapter update
- **WHEN** a manual local update integrates its audit and passes the applicable self-check, review, and release validation
- **THEN** the coordinator records `completed` without a task ID and the automatic weekly usage is unchanged

#### Scenario: Manual candidate fails
- **WHEN** a manual candidate cannot be integrated but the investigation produced a blocking audit
- **THEN** that audit is written to the original dataset and the result is recorded as blocked or failed

#### Scenario: PR manual delivery
- **WHEN** manual maintenance uses `delivery=pr`
- **THEN** it records the outcome after audit integration without publishing or refreshing a managed binary

#### Scenario: Manual ID maintenance binary boundary
- **WHEN** a maintainer targets registered product IDs in local delivery mode
- **THEN** the existing managed-binary checks and separate results remain in force
