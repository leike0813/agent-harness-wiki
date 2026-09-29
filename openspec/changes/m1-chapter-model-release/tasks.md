# Tasks

## 1. Chapter input and validation

- [ ] 1.1 Define chapter edition, section, question status, source-reference and software-version mapping schemas in src/domain and exported schemas; verify a fixture chapter parses and a malformed ID fails.
- [ ] 1.2 Change dataset loading and relationship validation in src/validation to read versioned Markdown and separate mapping/reference records; verify missing citations, cross-product references, bad section IDs and unsupported whole-chapter mappings fail, while honest partial and source-only cases pass.
- [ ] 1.3 Replace fixture knowledge with two clearly fictional chapter sets and update docs/data-model.md for the new input contract; verify production validation still rejects fixture records.

## 2. New-format publication

- [ ] 2.1 Project validated chapters, current/history selection and source metadata into normalized JSON and SQLite; verify identical inputs produce identical logical rows and Markdown.
- [ ] 2.2 Update manifest, verifier and staging publication for the new schema; verify corrupted output leaves the current pointer unchanged and a mapping-only release reuses chapter bytes.
- [ ] 2.3 Document release layout and compatibility boundary in docs/architecture.md and docs/development.md; verify the documented fixture build and verification commands work from an installed checkout.

## 3. Integration

- [ ] 3.1 Run the smallest relevant schema, compiler and release integration checks, then openspec validate m1-chapter-model-release --strict; record any environment limitation without switching a production release.
