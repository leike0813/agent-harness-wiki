# harness-onboarding Specification

## Purpose

Defines the user-invoked path that onboards a new CLI product into the knowledge base: register official sources, pin source identities directly, author seven cited topic chapters, and publish knowledge before any managed-binary step.

## Requirements

### Requirement: New CLI knowledge onboarding
A user-invoked onboarding Skill SHALL register a new product in the catalog with its product id, name, aliases, surfaces, runtime entities and bindings, promoting an existing candidate entry instead of inventing a new identity, register its official sources including an official `npm_registry` source identity when the product has one, pin the source identities directly, and produce a complete chapter edition for each of the seven topics covering all 53 fixed questions with per-surface answers, states and source references for every surface it investigates. It SHALL validate only after all seven current selections exist, and SHALL NOT run the incremental source scan, write an audit record, or reuse the maintenance report template.

#### Scenario: Complete onboarding
- **WHEN** a maintainer requests that a new product be added with its official sources
- **THEN** the Skill registers its catalog entry, surfaces, runtime entities and bindings, produces seven cited chapter editions, validates them with the current selections in place, and stages a new local release; a declared surface it did not investigate stays unanswered and reads as not_investigated

#### Scenario: npm source registered as identity only
- **WHEN** the new product has an official npm package
- **THEN** the Skill registers the `npm_registry` source identity without a knowledge snapshot, artifact or version mapping unless package bytes were inspected

### Requirement: Staged publication then current switch
The onboarding Skill SHALL build the new release with `chapters:update --stage` and `--blocked '[]'` (a first product has no prior edition to retain), verify the staged release through CLI topic/source queries and the site build, then select it with `ahw publish --release-id <same-id>`. It SHALL NOT rerun the publish command without `--stage` for the same immutable release ID.

#### Scenario: Verified staged release
- **WHEN** the staged release passes CLI and site checks
- **THEN** `ahw publish --release-id <same-id>` selects it as current

### Requirement: Existing product routing
The onboarding Skill SHALL route a product that already has all seven current chapters to the maintenance Skill, and SHALL resume onboarding for a registered product that is missing any current chapter. A catalog candidate SHALL be onboarded under its existing catalog identity rather than treated as maintained.

#### Scenario: Partially onboarded product
- **WHEN** the product is registered but lacks a current chapter for some topic
- **THEN** the Skill continues onboarding rather than treating it as maintained

#### Scenario: Catalog candidate
- **WHEN** the catalog declares a candidate product with no registry record
- **THEN** the Skill onboards it under that catalog identity

### Requirement: Managed-binary question after publication
Only after a successful knowledge publication SHALL the onboarding Skill ask the maintainer, user-facing, whether to chain the managed-binary Skill, and SHALL wait for the answer before running any package updater command.

#### Scenario: Knowledge published, binary undecided
- **WHEN** onboarding completes its knowledge release
- **THEN** the Skill asks the maintainer and does not run `managed:packages` before an affirmative answer