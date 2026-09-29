# Design

## Context

See proposal.md. The existing worktree has 35 old guide Markdown files, Claim/Coverage-based validation and publication, a QueryService with getCapability/searchKnowledge, and five old MCP tools. A prior review notes that the prose is still largely investigation commentary. m1-chapter-model-release supplies new chapter editions, sources and version mappings.

## Goals / Non-Goals

**Goals:** Useful first-wave Wiki chapters; a single release-backed chapter reader for site, CLI and MCP; explicit software-version uncertainty; actual content and protocol acceptance.

**Non-Goals:** Querying old-format releases; choosing an embedding model; running products to approve prose; automatically treating old accepted Claims as valid for the latest package.

## Decisions

1. Treat the 35 existing guides, 42 Coverage records and three accepted Claims as investigation inputs. Each new chapter is a complete edition with its topic's fixed question states and citations. The old accepted status can guide source review but does not create a version mapping by itself. Unknowns remain local to their questions.
2. QueryService selects an edition from the one fixed release. No version reads the current investigated edition; an explicit version uses exact, prefix or nearest earlier evidenced mapping, otherwise source_only. Whole-chapter selection is atomic, while a section may use a section-specific mapping. Return requested and selected versions separately.
3. Render one product overview and seven independent topic pages per product from the same release. Mechanism prose comes first; optional real-use Q&A precedes the source list. Use stable section IDs for deep links and historical chapter navigation.
4. Make CLI and MCP thin adapters over the same five query operations. The MCP process fixes one verified release at startup. It exposes the new five tool names only, emits structured and matching text content, and returns business outcomes separately from malformed input or broken release errors. Large chapters return a section index; each section remains readable.
5. Keep lexical search of current chapter sections in this change. m1-offline-hybrid-search later adds local semantic candidates without changing what get_topic considers verified.
6. Preserve the published v1 editions. Write revised prose as v2 editions and point `registry/chapter-current.yaml` to them only after review. A stable H2 section covers one mechanism readers can independently locate or use; H3, tables and examples can organize details inside it. The frontmatter question index maps every fixed ID to a section; the rendered topic page exposes that map after the body. Validation checks that the located section exists, has prose and contains each indexed fixed citation, without requiring a question ID at the start of a paragraph. Editorial review decides whether that prose really answers the indexed question.
7. For each applicable configuration-file shape, show the named file and scope, a source-supported minimum complete block, and explain fields, prerequisites, effect and an observable check. Give distinct shapes separate examples; keep the complete first-party field inventory in prose or tables. Use a directory tree, CLI command, Hook payload/result, or competing-input/result example when the reader needs it to use or understand the mechanism and fixed sources support it. If reliable syntax or outcome is not established, state the exact gap rather than inventing a recipe. Keep credentials as placeholders and cite examples locally.

## Risks / Trade-offs

- Old prose may describe leads as instructions → check every question against its fixed source, put uncertainty next to the affected mechanism and avoid fabricated recipes.
- A chapter can be complete in fields but unhelpful → review representative real reader tasks across all seven themes; the 35-chapter acceptance checks substance, not only schema.
- A block can be syntactically plausible yet misleading → check each example against its fixed source and avoid presenting source-only material as tested package behavior.
- Approximate version matches may be mistaken for verified behavior → return explicit resolution and requested applicability in CLI/MCP and display it in the site.
- The five-tool rename breaks old clients → document the new names and examples; no old release adapter is required.

## Migration Plan

Recheck and rewrite all old checked tasks; migrate one representative open-source and one closed-source page first, then the remaining chapters. Update shared readers and verify a new production release in staging. Only after content, site and real stdio calls pass, switch the current pointer. Keep existing uncommitted source files until their useful material has been migrated.
