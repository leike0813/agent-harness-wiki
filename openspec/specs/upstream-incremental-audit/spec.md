# upstream-incremental-audit Specification

## Purpose

Keeps upstream observation separate from knowledge processing: registered sources are observed read-only, their identities are tracked per source, and only settled, audited investigations advance what the knowledge base treats as processed.

## Requirements

### Requirement: Registered on-demand observation
The system SHALL accept one or more registered harness IDs and inspect only their registered npm, Git, and official documentation Sources when explicitly invoked.

#### Scenario: Multiple harnesses
- **WHEN** a maintainer invokes the scanner with two registered harness IDs
- **THEN** each harness receives an independent audit record covering its registered Sources.

### Requirement: Durable audit history
The system SHALL write a schema-validated Git-tracked audit record for every manual invocation, including unchanged and partially failed scans. It SHALL retain each registered source's baseline, observed identity, time and failure independently, plus affected question IDs, section IDs, source references and pending work. Audit records SHALL not enter KnowledgeRelease. A substantive change, failed source or unresolved disagreement SHALL also have a concise Markdown report; an entirely unchanged check needs only YAML.

#### Scenario: No source changed
- **WHEN** all current observations match their baselines
- **THEN** the invocation writes a no-change audit record and does not create a knowledge release unless prior pending work completed

#### Scenario: One source fails
- **WHEN** one Source cannot be observed
- **THEN** the record marks that Source blocked, retains its last successful baseline and preserves successful observations of other Sources

### Requirement: Metadata-first package observation
The scanner SHALL record registered npm latest version and integrity without obtaining executable package bytes as a side effect. Fixed official documentation content and isolated Git revisions MAY be captured for knowledge comparison, without moving a pinned submodule. Package acquisition SHALL be delegated to the managed environment updater.

#### Scenario: New npm release
- **WHEN** latest resolves to a different exact version
- **THEN** the audit records the version and integrity, while the scanner itself does not download a tarball or assert a chapter conclusion

### Requirement: Read-only triage observation
The manual `sources:check` command SHALL observe only registered npm, Git, and official documentation identities without writing audits, retaining documents, downloading package bytes, creating checkouts, or advancing monitor state. It SHALL expose `requires_triage` only when at least one current source check is `changed`. The signal SHALL NOT start maintenance by itself.

#### Scenario: Changed source
- **WHEN** a current registered source differs from its baseline
- **THEN** the product reports `requires_triage: true` and no task is created

#### Scenario: Blocked source only
- **WHEN** a source cannot be observed and no current source is changed
- **THEN** the product reports `requires_triage: false` and retains the blocked state for triage

#### Scenario: Repeated read-only check
- **WHEN** `sources:check` runs twice without an intervening settlement
- **THEN** neither run changes a baseline, audit, document cache, or checkout

### Requirement: Separate documentation observation URL
An official documentation source MAY declare an optional `observation_url`. Observation SHALL fetch `observation_url ?? url`; a new snapshot's requested URL SHALL match one registered endpoint. Historical snapshots and references SHALL remain unchanged when an observation endpoint is added.

#### Scenario: Amp uses the markdown observation endpoint
- **WHEN** the Amp manual source keeps `url: https://ampcode.com/manual` and sets `observation_url: https://ampcode.com/docs/markdown`
- **THEN** scans fetch the markdown endpoint while existing Amp snapshots and references keep their original URL identity

#### Scenario: No observation URL
- **WHEN** an official documentation source has no `observation_url`
- **THEN** scans use its `url` for both observation and fixed identity

### Requirement: Observation versus processing
The monitor SHALL store observations separately from processing progress. Normal npm version advances MAY close metadata handling without knowledge or version-mapping conclusions. Other observations SHALL retain the processing baseline until an audited result advances it. A result covering an older observation SHALL leave newer changes queued.

#### Scenario: Several identities arrive before settlement
- **WHEN** A was processed, daily observations recorded B and then C, and an investigation settles A through C
- **THEN** the processed identity becomes C and no B work remains queued

#### Scenario: Observation arrives after settlement
- **WHEN** a source becomes D after a result settled C
- **THEN** D remains queued for a later week

#### Scenario: Same identity is seen again
- **WHEN** a previously settled identity is observed unchanged on a later day
- **THEN** the source does not re-enter the maintenance queue

#### Scenario: Ordinary npm metadata advances
- **WHEN** npm latest moves forward normally
- **THEN** the source's processed identity advances as metadata-only and no chapter task or version mapping is created

### Requirement: Durable local and Git history
Daily observation history, queue age, attempted identities, weekly usage, and the active lock SHALL remain in the local monitor ledger. Weekly conclusions, source scope, unresolved questions, and review status SHALL be written to Git-tracked audits in the original dataset. A local observation SHALL not be represented as a completed audit.

#### Scenario: Weekly conclusion retained
- **WHEN** a claimed product result is recorded
- **THEN** its audit and conclusions remain in the original dataset's Git-tracked audit history

#### Scenario: Daily observation remains local
- **WHEN** an observation occurs without a weekly investigation
- **THEN** no new Git audit is created for that observation

### Requirement: Dormant incomplete history
Historical pending audits, unknown answers, and missing topics SHALL remain dormant unless a newly observed source has a relevant evidence entry point or a maintainer explicitly reopens the work. Neither a later unchanged observation nor an unrelated source change SHALL create a new task for that history. Dormant work SHALL remain visibly incomplete and SHALL NOT be closed as completed or no-impact.

#### Scenario: Unrelated later observation
- **WHEN** a product has an old pending question and a later source change makes no relevant reference or question entry point available
- **THEN** no new task is created and the old pending question remains visible

#### Scenario: Explicit manual reopen
- **WHEN** a maintainer explicitly reopens an unresolved product question
- **THEN** manual maintenance may investigate it without changing automatic queue history

### Requirement: Bounded Git impact hints
A Git HEAD-only change SHALL produce no chapter impact hints. Known changed paths SHALL map only to references that cite those exact fixed files. A path whose only connection is a broad name such as `config` or `loader` SHALL NOT expand a task to the whole topic. The coordinator SHALL inspect the smallest relevant entry point and extend the scope only with evidence.

#### Scenario: HEAD without changed paths
- **WHEN** observation detects only a new Git HEAD and no per-file change evidence
- **THEN** it reports the identity change with no impact list and allows bounded manual triage

#### Scenario: Cited file changed
- **WHEN** a known changed path equals a file cited by a current section
- **THEN** that section, its questions, and its source references may be reported as impact hints

#### Scenario: Broadly named uncited file
- **WHEN** an uncited `config/loader.ts` changes while a chapter discusses configuration loading
- **THEN** the hint does not expand to all configuration questions before the file is inspected
