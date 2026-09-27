## ADDED Requirements

### Requirement: Harness-ID incremental investigation
The project Skill SHALL accept one or more registered harness IDs without a Target or question, run on-demand source observation, and investigate the resulting changes. It SHALL retain the precise Target and question workflow as an optional mode.

#### Scenario: ID-only request
- **WHEN** a maintainer invokes the Skill with registered harness IDs only
- **THEN** it checks their registered upstream Sources and produces an audit record and review handoff for each harness.

#### Scenario: New Target
- **WHEN** an npm release has a new exact version
- **THEN** investigation records coverage for all seven topics and does not carry old-version claims forward as accepted.
