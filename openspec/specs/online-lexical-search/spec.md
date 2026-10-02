# online-lexical-search Specification

## Purpose

Defines current-section lexical discovery over static, selectively readable JSON indexes, with shared matching and pagination rules and explicit processing limits. It is independent of the maintainer's local semantic-search acceptance.

## Requirements

### Requirement: Current lexical corpus and exact entries
Online search SHALL index only current-edition sections, with independent exact entries for question IDs, configuration keys and complete paths, full question wording and aliases. Lexical material SHALL cover titles, body and wording with Chinese word/phrase and English keyword combinations. The contract SHALL not promise arbitrary character substrings, typo correction or semantic recall.

#### Scenario: Punctuation in configuration path
- **WHEN** a current section publishes a configuration key or path containing punctuation
- **THEN** the whole exact term remains addressable even if lexical segmentation splits the punctuation

#### Scenario: Historical duplicate and no match
- **WHEN** a phrase appears in a current and historical edition or no current section matches the query
- **THEN** discovery indexes only the current section and treats no match as ordinary empty results without capability judgments

### Requirement: Search resource navigation
`search/manifest.json` SHALL declare release identity, format and rule versions, budgets and index entry points. Exact and lexical `index.json` resources SHALL route term ranges to `blocks/<block-id>.json`; oversized navigation SHALL subdivide. `search/scopes/<harness-id>/<topic>/index.json` SHALL expose stable, presorted current section locators and surface scope without body text.

#### Scenario: Growing vocabulary
- **WHEN** both distinct terms and products increase until navigation requires subdivision
- **THEN** a query can locate its term ranges without first loading the complete dictionary or all section identities

### Requirement: Bounded lossless postings and early pruning
Postings SHALL be packaged by sorted term and decoded byte size, targeting approximately 64 KiB per block including envelopes. Popular terms SHALL span blocks without truncation. Navigation and postings SHALL support early product/topic pruning; surface filtering SHALL precede ranking. A global text query SHALL locate relevant term blocks instead of scanning every product or downloading all bodies.

#### Scenario: Popular term in unrelated products
- **WHEN** a term spans many blocks but the query names one product-topic
- **THEN** unrelated ranges can be skipped and the selected scope's complete postings reconstruct without truncation

### Requirement: Filter-only discovery
A search without text SHALL use lightweight scope section directories in stable ID order, with surface filtering before paging. It SHALL not scan text postings or fetch all chapter bodies to discover the page window.

#### Scenario: Product filter and surface
- **WHEN** a caller supplies a product and surface without text
- **THEN** eligible current sections are paged from scope metadata and only that page requires chapter reads

### Requirement: Shared deterministic matching rules
Build and consumers SHALL share versioned segmentation, normalization and ranking rules. Exact question ID, configuration term, full wording and alias categories SHALL precede body lexical matches; ties SHALL rank keyword coverage and fixed field weights before stable edition/section IDs. Mandatory segmentation absence SHALL fail explicitly. ICU version strings SHALL not alone gate compatibility.

#### Scenario: Many and few keywords
- **WHEN** same-category sections match all or only some query keywords
- **THEN** broader keyword coverage ranks first and weaker complete candidates remain eligible after it

### Requirement: Stateless release-bound pagination
Search cursors SHALL bind release, normalized query, actual normalized terms, filters, ranking version and position. Recomputing a page SHALL not require a stored query session. A changed binding SHALL produce `invalid_cursor`; input or candidate truncation SHALL not be used to preserve a seemingly valid page.

#### Scenario: Different segmentation result
- **WHEN** a cursor is reused with the same text but different actual normalized terms
- **THEN** the old cursor is rejected rather than producing repeated or missing results

### Requirement: Search processing budgets
Each query SHALL process at most 2 MiB of decoded distinct index/navigation/filter/ranking resources and 20,000 filtered, deduplicated sorting candidates. Each page SHALL process at most 8 MiB of distinct decoded chapters. Processing accounting SHALL be independent of the supplied resource reader; repeated references to one resource SHALL count once. Exceeding any limit SHALL produce `query_too_broad` without a truncated successful page.

#### Scenario: Unfiltered and filtered candidate counts
- **WHEN** the global postings exceed 20,000 sections but early scope/surface pruning leaves fewer than the limit
- **THEN** the remaining candidates are eligible if byte limits also hold, and only those candidates count toward sorting

#### Scenario: In-memory over-budget resource
- **WHEN** a supplied reader returns an already resident index or page chapter set exceeding its processing budget
- **THEN** the operation reports `query_too_broad` rather than treating resident bytes as free

### Requirement: Page body previews and source scope
After ranking, search SHALL retrieve only page-selected chapters and deduplicate same-chapter reads. Results SHALL preserve current edition/section identity, surfaces, questions, match category, release and derived source scope. Body hits SHALL use nearby actual text; filter or metadata-only hits SHALL use the section start. Previews SHALL fit 240 UTF-16 code units without broken Unicode.

#### Scenario: Two results in one chapter
- **WHEN** a selected page includes two sections in one edition
- **THEN** one chapter resource supplies both actual previews and their own source scopes without retrieving full source files

### Requirement: Lexical capability declaration
Search metadata SHALL declare lexical-only capability, distinct from local semantic-unavailable fallback. Complete online search resources SHALL require neither semantic indexes nor model metadata. Their declared capability SHALL not be treated as a temporary failure of local hybrid search.

#### Scenario: Online lexical release
- **WHEN** a verified online publication contains lexical indexes but no vectors or model metadata
- **THEN** it is complete for its declared capability and does not claim successful local M1 semantic acceptance
