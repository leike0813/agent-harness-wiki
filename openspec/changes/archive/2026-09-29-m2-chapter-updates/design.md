# Design

## Context

See proposal.md. The current sources:scan reads registered sources and writes audit YAML, but also downloads npm tarballs and maps impacts to Claim IDs. The project Skill prepares draft Claim/Evidence/Coverage, then stops before acceptance or publication. The new chapter model, reader and managed updater are prerequisites.

## Goals / Non-Goals

**Goals:** One manual invocation can observe upstream identities, update affected questions, obtain conditional independent review, and publish completed chapters while retaining audit and old knowledge on failure.

**Non-Goals:** Periodic polling, automatic provider calls during query, package-version inference from source dates, or making binary startup a knowledge gate.

## Decisions

1. Keep the registered-source scanner limited to observation and audit. It compares Git HEAD, fixed official document bytes and npm version/integrity independently. Document and Git candidate capture is allowed for investigation; npm package bytes belong to the managed updater. Existing pending audits remain explicit inputs to later runs.
2. Map changes through published source references to section IDs, question IDs and cross-topic links. When a changed shared loader or an unknown impact cannot be bounded, expand to the affected themes and explain why in the audit. Do not assume unchanged package metadata means unchanged source behavior.
3. The project Skill owns semantic investigation and publication. It drafts a complete new chapter edition, retains unchanged sections' cited scopes, checks the diff and data validator, and calls a second Agent only for unresolved conflict, reversal or cross-theme loading changes. Unfinished review leaves affected questions pending.
4. Select only completed editions and evidenced mapping changes for a new staged release. Keep blocked chapters' previous editions and source scopes; preserve audit blockers. After artifact checks, atomically switch the local current pointer. No reader-visible change means audit-only completion.
5. Invoke the managed updater as a separate result lane when a package candidate appears. Its outcome is recorded in the same maintenance report but cannot veto the knowledge switch.

## Risks / Trade-offs

- Automated semantic review can miss an implied claim → insist on precise source references, an Agent diff check and independent review for high-impact paths.
- Partial publication can hide unfinished changes → retain pending audit references and prior source scopes in the release report.
- A failed source can erase the last good baseline → record failures separately and advance a source baseline only on successful observation.
- The Skill may publish from stale working-tree input → verify selected files and release artifacts immediately before pointer switch.

## Migration Plan

Replace Claim-oriented audit fields and scanner package downloads after the chapter and managed changes are active. Update the Skill instructions and report template together. Exercise no-change, partial failure, source conflict, completed publication and independent binary failure scenarios with fixture or controlled local sources before relying on a real update.
