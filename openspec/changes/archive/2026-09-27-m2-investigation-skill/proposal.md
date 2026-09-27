# Proposal

## Why

Maintainers currently have schemas and validation commands but no project workflow for turning a question about a fixed harness Target into reviewable knowledge records. The user needs that workflow now to continue the five-harness investigation directly, without waiting for a source-change scanner or a working subagent provider.

## What Changes

- Add one manually invoked project Skill that investigates a specified exact Target and question against fixed official sources, then writes draft Claim, Evidence, Assessment, and Coverage records or a concrete evidence gap.
- Reuse the existing dataset validator and optional local-original audit; retain human semantic acceptance and release publication as separate maintainer actions.
- Track only this Skill under `.agents/skills/` and document its invocation. Let a later source scanner provide optional investigation input.

## Capabilities

### New Capabilities

- `manual-investigation-skill`: User-directed, source-bound investigation that yields validated review candidates or explicit gaps while preserving accepted knowledge and the current release.

### Modified Capabilities

None.

## Impact

Adds `.agents/skills/harness-investigation/SKILL.md` and an OpenSpec capability. Changes `.gitignore`, the implementation roadmap, README, and developer documentation. No application API, dependency, query command, source scanner, or release format changes.
