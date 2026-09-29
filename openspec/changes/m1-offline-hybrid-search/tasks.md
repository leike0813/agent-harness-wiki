# Tasks

## 1. Corpus and model choice

- [ ] 1.1 Extract current published section text, question wording, keys and paths from the real chapter release; verify history and unpublished records are absent from a corpus inspection.
- [ ] 1.2 Compare available local Node-compatible embedding options on representative Chinese, English and configuration queries, then lock one model revision, files, license and inference dependency; verify it runs offline on the target machine and record measured lexical misses.

## 2. Release-bound hybrid index

- [ ] 2.1 Replace Claim FTS and guide substring discovery with exact/alias and full-text current-section indexes; verify short Chinese aliases and exact question/key/path hits rank ahead of fuzzy matches.
- [ ] 2.2 Build bounded passage embeddings and manifest model/index identity in an immutable release; verify passage-to-section deduplication, repeatable logical index and no build-time download.
- [ ] 2.3 Add query-time local model loading, candidate merge, stable pagination and semantic_unavailable fallback to the shared service; verify missing files keep lexical results but surface degraded status.

## 3. Read interfaces and acceptance

- [ ] 3.1 Adapt CLI and MCP search output plus README examples to match reason, body preview and source scope; verify both return the same section IDs for one release and query.
- [ ] 3.2 Run the fixed bilingual lexical-miss and boundary checks, relevant integration tests and openspec validate m1-offline-hybrid-search --strict; verify full semantic recall offline before marking M1 search complete.
