# Design

## Context

See proposal.md. The chapter reader first ships lexical section discovery. Current code still contains Claim FTS and guide string search. The real 35-chapter corpus must exist before choosing a local model.

## Goals / Non-Goals

**Goals:** Offline bilingual hybrid recall over current chapter sections, stable section-level results, explicit fallback and release-bound model identity.

**Non-Goals:** Vector database service, online embeddings, historical-edition semantic indexing, semantic scoring as evidence or version verification.

## Decisions

1. Build lexical and semantic candidates from the same release-selected current sections. Index titles, prose, question IDs and wording, config keys and paths; normalize known aliases and preserve exact key/path matching ahead of fuzzy candidates. Existing SQLite FTS can remain the lexical base, with a bounded exact lookup for short Chinese terms.
2. Select one locally executable model after examining representative real chapter passages and queries. Fix model revision, files, normalization and index identity in release metadata; store model originals outside Git. Neither compiler nor query may fetch at runtime.
3. Split oversized sections on paragraph boundaries into bounded passages for model input. Store passage-to-section identity, rank candidates, then collapse to one section result and take its preview from published prose. Start with a simple exact scan over the current small corpus; add vector infrastructure only if measurements require it.
4. Preserve the shared QueryService as the ranking owner. CLI and MCP adapt its structured result; get_topic remains the authority for full text and software-version resolution. If model loading fails, report semantic_unavailable and continue lexical search.
5. Validate with a fixed bilingual query set drawn from actual chapter questions, including a measured lexical miss and negative cases for source, current-edition and pagination boundaries.

## Risks / Trade-offs

- Default FTS tokenization can miss short Chinese terms → explicit aliases and key/path matching, with query-set checks.
- Model files can disappear after a release is built → query returns a visible degraded state; M1 acceptance requires a complete offline path.
- Semantic ranking can appear like confidence → return match reason and source scope, never a truth score.

## Migration Plan

After m1-reader-guides has real production sections, replace Claim FTS and guide string search with current-section indexing, then add local semantic index and model binding. Rebuild a new immutable release and validate CLI/MCP offline; retain prior current release if the new index fails verification.
