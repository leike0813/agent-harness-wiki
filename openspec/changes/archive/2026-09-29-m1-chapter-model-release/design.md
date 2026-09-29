# Design

## Context

See proposal.md. The current loader reads YAML Claim/Evidence/Assessment/Coverage plus one guide Markdown per Target-topic. The compiler projects accepted Claims into JSON, SQLite Claim FTS and generated Markdown; verifyRelease assumes that schema. Source, Artifact and Snapshot identities already exist and should be reused.

## Goals / Non-Goals

**Goals:** One chapter data contract, deterministic new-format fixture publication, explicit current/history index, source references and separately evidenced software-version mappings.

**Non-Goals:** Authoring the 35 real chapters; public query/MCP migration; embedding model selection; old-format release compatibility.

## Decisions

1. Store each complete chapter edition in a distinct tracked Markdown file. Frontmatter holds edition identity, section ID/source scope and question status/section/reference index; body holds mechanism prose and inline reference markers. This keeps one authored text source while allowing precise query lookup. Do not generate prose from Claim rows.
2. Store fixed source references and software-version mappings in separate structured records. Reuse Source/Snapshot/Artifact metadata and local-original audit boundaries. A mapping records evidence for the source-to-package association; a source snapshot's date or commit alone is insufficient.
3. Build a new release schema that records current edition per product-topic and the historical editions retained for lookup. Normalize once, then generate JSON, SQLite and Markdown. Version mappings can change without rewriting chapter bytes. The verifier selects the new schema directly; compatibility with old Claim releases is outside scope.
4. Keep publication atomic: validate and write a staging directory, verify its artifact inventory and database, then switch the current pointer. Fixture verification uses an isolated release root so this change cannot advertise incomplete production chapters.

## Risks / Trade-offs

- A question may inherit an unrelated citation from a shared section → require question-level reference IDs and markers in its located section.
- An edition may be falsely mapped to a package → validate each mapped section and its association evidence; otherwise expose it as source-only.
- New schema breaks old query code → the subsequent m1-reader-guides change replaces the reader and MCP before any new production pointer is switched.
- A large frontmatter can become tedious → keep only stable lookup fields there; mechanism prose stays in the body.

## Migration Plan

Implement and verify the new fixture model and publisher first. Use current source records as migration inputs, but do not auto-promote old Claim conclusions or overwrite ignored old release directories. After m1-reader-guides migrates public readers and all 35 chapters, publish a new production release and switch the pointer.
