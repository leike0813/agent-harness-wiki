# Tasks

## 1. Chapter content

- [ ] 1.1 Migrate one open-source and one closed-source theme into new chapter editions with question states and source references; verify a reader can locate an answer, a gap and the cited fixed source in each.
- [ ] 1.2 Rework the remaining 33 chapters for five products and seven themes, including product-specific fields, processing chain, conditions, minimal cited examples and local gaps; verify all 35 chapters cover every question in their topic and pass production validation.
- [ ] 1.3 Review the 35 pages against real configuration and diagnostic questions, correcting thin investigation summaries; verify a sampled page from every theme explains a usable mechanism or a concrete evidence gap.

## 2. Shared reading interfaces

- [ ] 2.1 Replace old capability and evidence query paths in src/query with listHarnesses, getTopic, compareTopics, searchKnowledge and getSource over one new-format release; verify exact, prefix, nearest-earlier, source_only, history and section boundaries through stable response tests.
- [ ] 2.2 Replace CLI query commands and examples with the shared chapter operations; verify JSON output retains release, selected version, source and question statuses, and invalid input exits nonzero.
- [ ] 2.3 Replace the five MCP handlers and schemas, including bounded section reads and source excerpts; verify a real SDK stdio client lists exactly the new tools, calls all five and distinguishes business results from errors.

## 3. Wiki and publication

- [ ] 3.1 Render product overviews and independent theme Wiki pages with stable anchors, optional Q&A, source links and history from the release; verify site build and navigation for all five products, including inert source text.
- [ ] 3.2 Update README, site guidance and docs/development.md for the new commands and reading behavior; verify every documented CLI/MCP example against a staged new-format release.
- [ ] 3.3 Validate production data and openspec validate m1-reader-guides --strict, run relevant integration checks, compile an immutable production release and inspect all five products in site and MCP before switching current; record actual content and protocol results rather than reusing old task checkmarks.
