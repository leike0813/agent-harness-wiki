# Design

## Context

The repository already has strict YAML schemas, a production dataset validator, an explicit local-original audit, immutable release compilation, and a draft-to-accepted review boundary. The planned source scanner is not implemented. See proposal.md for the reason to advance the Skill now.

## Goals / Non-Goals

**Goals:** Make one user-invoked project Skill sufficient to investigate an existing exact Target, produce durable review candidates, and resume from those records after interruption.

**Non-Goals:** Add an agent runtime, background worker, scanner, source downloader, new schema, automatic acceptance, or automatic release publication.

## Decisions

1. Use `.agents/skills/harness-investigation/SKILL.md` as a manually invoked Skill. Its frontmatter disables automatic invocation, keeping unrelated coding requests free of project investigation instructions. A future scanner can pass a change list as optional input; manual Target and question input remains sufficient.
2. Keep the executable contract in the Skill file: intake, fixed-source search, version checks, candidate record placement, validation, diff review, failure recovery, and user handoff. Use existing schema files and one accepted Pi record as examples, not duplicated templates or a new generator.
3. Treat tracked YAML and Git diff as durable investigation state. The Skill writes only candidate records, retains existing accepted records, and uses the existing CLI validator. Original-byte audit runs when the referenced originals are available. Semantic review remains a human decision after the Skill returns.
4. Narrow Git tracking to one project Skill subtree. Existing `.agents/` tool caches and third-party skills remain ignored.

## Risks / Trade-offs

- A user may ask for more topics than available sources can prove → require one documented result or concrete gap per requested Target-topic pair, with unresolved coverage kept partial or blocked.
- A mutable official page may look applicable to a pinned package → retain its version uncertainty and require exact evidence before claiming package behavior.
- A manual workflow can be interrupted → preserve candidate YAML and report incomplete files/diagnostics; resume from the current diff rather than restarting or changing the release pointer.

## Migration Plan

Add the Skill and ignore exception, then document direct invocation. No existing records or releases move. Source-scan integration can supply an optional input when implemented.
