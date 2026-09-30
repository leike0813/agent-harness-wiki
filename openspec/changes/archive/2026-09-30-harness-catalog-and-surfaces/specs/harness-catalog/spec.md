# Spec Delta

## Purpose

Defines the product and surface catalog that fixes product naming, declares each product's shared-backend runtime entities and their bindings, captures the fixed official references behind them, and records the complete candidate set.

## ADDED Requirements

### Requirement: Catalog naming authority
The catalog SHALL be the single source of truth for product ids, display names, aliases, and per-product surface ids. A product id SHALL name the product, and a surface id SHALL be local to its product. Product ids, names, and aliases SHALL resolve uniquely across the catalog, and every chapter, section, answer, registry record, source, and software mapping SHALL reference a declared catalog product.

#### Scenario: Interface-specific product id
- **WHEN** a product is submitted with the id `codex-cli`
- **THEN** validation rejects it because `codex` is the product and `cli` is a surface id

#### Scenario: Duplicate name
- **WHEN** two products claim the same name or alias
- **THEN** validation rejects the catalog

### Requirement: Runtime entities and bindings
The catalog SHALL declare each product's runtime entities and one explicit binding for every surface. A binding SHALL link a surface to a runtime, or to none, and SHALL carry a status of `documented`, `unknown`, or `conflict` with the fixed references behind it. A `documented` binding SHALL name a runtime and evidence; a `conflict` binding SHALL carry evidence; an `unknown` binding SHALL NOT assert a runtime.

#### Scenario: Shared backend, undocumented interface
- **WHEN** a product ships a CLI and an IDE extension over one backend and only the CLI binding is documented
- **THEN** the CLI binding is documented with its runtime and evidence while the IDE binding is unknown without a runtime

#### Scenario: Conflicting binding evidence
- **WHEN** two fixed sources describe the same surface binding differently
- **THEN** the binding is a conflict and cites both references

#### Scenario: Missing binding
- **WHEN** a declared surface has no binding entry
- **THEN** validation rejects the catalog

### Requirement: Fixed catalog references
Every catalog reference SHALL belong to one product and SHALL capture its official source with the official link, capture time, a fixed snapshot identity, a locator, and a bounded displayable excerpt. A Git snapshot SHALL bind a fixed commit. Catalog references SHALL be readable from the release without the original archive bytes, and a catalog reference alone SHALL NOT establish a capability fact or a software-version mapping.

#### Scenario: Reference without a commit
- **WHEN** a Git snapshot reference has no commit
- **THEN** validation rejects the catalog

#### Scenario: Cross-product reference
- **WHEN** a product cites a reference owned by another product
- **THEN** validation rejects the catalog

### Requirement: Complete candidate set and derived registration
The catalog SHALL record the complete candidate set of harness products the project intends to consider, each with its naming, surfaces, runtime entities, bindings, and references. Registration SHALL be derived from the registry: a product is registered exactly when a registry record exists for it, and otherwise it is a candidate. A candidate SHALL NOT publish chapters, facts, or a current selection.

#### Scenario: Catalog-only product
- **WHEN** a catalog product has no registry record
- **THEN** it is listed only from the catalog scope and produces no chapters or facts
