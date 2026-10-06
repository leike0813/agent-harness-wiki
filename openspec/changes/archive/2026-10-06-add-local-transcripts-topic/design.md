# Design

## Context

The shared topic enum reaches local and online schemas. Fixed questions are parsed from docs/topic-questions.md; query services already return not_investigated for missing chapters. Validation currently requires every registered product to have every topic. Markdown verification regenerates pages and compares their bytes, so changing the overview text needs a distinct builder identity.

## Goals / Non-Goals

Support the new topic throughout existing interfaces and allow gradual investigation. Reuse chapter answers and provenance rather than introducing a transcript parser or universal storage schema. Real product research and public delivery are separate work.

## Decisions

- Use local_transcripts with transcripts.* question IDs and existing aliases/labels maps. Ten fixed questions are authoritative in docs/topic-questions.md.
- Replace the product × all-topics gate with one current selection per authored product-topic and at least one current selection per registered product. Missing topics are derived, never stored as placeholder knowledge.
- Preserve readable topics in existing site data; derive a separate missing-topic presentation in temporary page metadata. This avoids changing online catalog DTOs or indexing empty chapters.
- Accept builders 6 and 7 in the schema; emit only 7. Pass the manifest builder to Markdown regeneration, keeping the single old overview sentence for builder 6. No duplicate compiler or full renderer fork.
- Add one fictional transcript chapter and cited fictional document. Leave the second fictional product uncovered to test gradual coverage. Extend existing integration suites, including packaged CLI and SDK stdio checks.
- Set consumer metadata to 1.2.0 without adding dependencies or installing packages. Reconcile pnpm workspace lock metadata only through pnpm if needed; never hand-edit the lock.

## Risks / Trade-offs

- Older consumers reject the new enum → document the upgrade boundary before real transcript knowledge is published; retain data/v1 by the approved choice.
- Frozen output changes invalidate existing releases → verify a builder 6 fixture with original overview bytes and existing production releases when available.
- A question prefix omission silently skips required questions → explicitly register transcripts and verify missing-question rejection through the fixture.

## Migration Plan

Build and verify locally without selecting a production pointer. Existing knowledge remains untouched. Later investigations add cited editions and current selections through maintenance; release the upgraded consumer before online data containing the new topic.
