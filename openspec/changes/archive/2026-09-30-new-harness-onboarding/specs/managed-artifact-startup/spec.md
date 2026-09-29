# Spec Delta

## ADDED Requirements

### Requirement: Skill-mediated first admission and update
The managed-artifact-startup workflow SHALL be driven by a model-invoked Skill that performs first admission and latest updates through the same `pnpm managed:packages update <id>` command, reachable by the onboarding and maintenance Skills. The knowledge publisher SHALL remain knowledge-only and SHALL NOT refresh the managed binary.

#### Scenario: Update from onboarding
- **WHEN** a newly onboarded product is chained to the managed-binary Skill
- **THEN** first admission uses `managed:packages update <id>` exactly as later updates do

### Requirement: Unsupported distribution
A product without a verified registered official npm source SHALL be reported unsupported by the managed-binary Skill, without substituting another channel and without blocking knowledge publication.

#### Scenario: No verified npm source
- **WHEN** a product has no verified registered official npm source
- **THEN** the Skill reports unsupported and the knowledge release proceeds independently
