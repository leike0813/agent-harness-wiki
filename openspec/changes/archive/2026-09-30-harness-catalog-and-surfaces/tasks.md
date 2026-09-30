# Tasks

## 1. Catalog research and naming

- [x] 1.1 Compile the complete candidate set from the Orca named-CLI list, the OpenSpec supported-tools list, and the products already covered, record each candidate's discovery source and default product id, and verify the list against every first-wave product so no registered product is missing
- [x] 1.2 Settle product ids and local surface ids for the registered products (`codex`, `antigravity`, `claude-code`, `opencode`, `pi`, `omp`) and verify a review note lists each product's surfaces plus the runtimes and bindings behind them and the reason for any candidate left out

## 2. Catalog model and registry projection

- [x] 2.1 Add the catalog schema and domain type (schema version 1, fixture or production kind: product id, name, aliases, surfaces, runtime entities, bindings with documented/unknown/conflict states, and fixed references) and verify JSON Schema export and a fixture catalog validate
- [x] 2.2 Reduce the registry harness record to schema version 1 with product id and source references and resolve names and surfaces from the catalog, and verify a renamed registry loads and that a product without a registry record is reported as a candidate, not a registered product

## 3. Surface-scoped chapters and version mappings

- [x] 3.1 Change the chapter record to non-empty per-surface answers, section `surface_ids`, and a `surface_id` on software mappings, and verify a fixture chapter with one shared multi-surface answer and one single-surface answer validates
- [x] 3.2 Migrate the tracked chapters and current selection to the new shape, copying bodies and opaque source, artifact, reference, snapshot, and edition ids verbatim, and verify the migration diff changes only metadata

## 4. Validation

- [x] 4.1 Enforce catalog and surface references, reject unknown surfaces and overlapping answers for one surface, and allow a declared surface with no answer, and verify an undeclared surface and an overlapping answer both fail with file-specific diagnostics while an unanswered declared surface passes

## 5. Query service and CLI

- [x] 5.1 Add optional surface resolution, query-derived `not_investigated`, and the rule that any versioned read without a surface is `ambiguous`, and verify a versioned read without a surface returns `ambiguous` and a declared-but-unanswered surface returns `not_investigated`
- [x] 5.2 Expose the surface option and the `registry` or `catalog` list scope through the CLI with JSON output, and verify a surface-scoped read and a catalog-scope list both exit zero

## 6. MCP and search

- [x] 6.1 Add the surface option, the registry or catalog list scope, and catalog reference returns to the five MCP tools, and verify the SDK smoke test still sees exactly five tools and lists catalog candidates
- [x] 6.2 Scope the search corpus and results to surfaces, and verify a surface-scoped section result and an omitted-surface whole-product read agree on the section id

## 7. Release baseline and site

- [x] 7.1 Build releases on chapter schema version 3 and builder version 6 with the catalog embedded, and verify a repeated build is identical while an older-schema release is verified intact and left unmodified
- [x] 7.2 Render surfaces and surface-scoped question states in the site and verify a topic page shows surface scope and builds from the new release

## 8. Identity migration

- [x] 8.1 Apply the one-time rename (`codex-cli` to `codex`, `antigravity-cli` to `antigravity`) across the catalog, registry, sources, knowledge, and current selection without adding old ids as aliases, and verify the catalog holds no old-id alias and every record resolves

## 9. Docs and Skills

- [x] 9.1 Update PRD, architecture, data-model, knowledge-workflow, topic-questions, and roadmap to the product and surface model, and verify no document still describes a harness as a single CLI
- [x] 9.2 Update the `harness-investigation`, `harness-maintenance`, and `harness-binary` Skills for catalog registration, surface-scoped answers, and per-surface versions, and verify each Skill's steps name the catalog, surface and binding inputs it now needs

## 10. Verification and local publish

- [x] 10.1 Run the full offline verification chain (schema export, fixtures, typecheck, lint, tests, MCP smoke, site build) and verify it passes, then run `openspec validate harness-catalog-and-surfaces --strict`
- [x] 10.2 Stage and select a new local release on the new baseline and verify CLI and MCP reads agree on the release id and a pre-existing release directory is unchanged
