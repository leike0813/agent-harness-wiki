# harness-monitor Specification

## Purpose

Defines the daily orchestration boundary: one scheduled read-only upstream observation per registered product, a fixed monitoring worktree with a main-process PID lock, one maintenance delegation per product needing handling, and a single rolling pull request that keeps one candidate per product and topic until it merges.

## Requirements

### Requirement: Scheduled daily observation
The system SHALL run one daily observation round for every catalog product that also has a registry record, at 02:00 `Asia/Shanghai` with a 60-minute grace period, in an Orca-managed dedicated worktree. Each round SHALL start a fresh session and atomically acquire a persistent lock associated with its main process PID. A live owner SHALL prevent another round from starting. A dead owner's temporary output and owned source workspaces SHALL be recovered by the next start. Normal completion SHALL explicitly close source workspaces and finish the session. A missed round MAY run within its grace window. The schedule SHALL remain disabled until repository commands are available on `main` and a manual trial verifies the configured models and delivery flow.

#### Scenario: Missed round replayed in the grace window
- **WHEN** a round is skipped and replayed before its grace period ends
- **THEN** the replay follows the same scope, lock and delivery rules as a scheduled round

#### Scenario: Second round requested while one is active
- **WHEN** a round starts while the recorded owner PID is still alive
- **THEN** the second round does not start and reports the active run instead of running concurrently

#### Scenario: Previous round left temporary output behind
- **WHEN** a round starts and a previous run's temporary output is still present
- **THEN** a dead owner's output and source workspaces are recovered while a live owner's resources remain untouched

#### Scenario: Schedule enabled before prerequisites
- **WHEN** the schedule is still disabled because commands or the models are unverified
- **THEN** no scheduled observation runs and no upstream access is attempted

### Requirement: Pinned model and isolated parallel delegation
The project model configuration SHALL select the monitoring main session's model, and the monitoring round SHALL NOT inherit the orchestrating coordinator's model. Every maintenance and review delegation SHALL pass `minimax-cn/MiniMax-M3.1-Flash-Preview` explicitly. The main agent SHALL decide concurrency without a fixed worker limit. Each product SHALL have one writer in an independent candidate dataset. Workers SHALL NOT edit shared project data, rescan sources, publish knowledge or update managed binaries. The parent SHALL merge candidates by product and product/topic, preserve unrelated edits, and reject stale baselines or colliding identities without discarding other completed candidates.

#### Scenario: Pinned model unavailable
- **WHEN** the pinned model cannot be selected for a delegation
- **THEN** the round reports the blocked product and continues with the remaining products without substituting another model

#### Scenario: Concurrent delegation requested
- **WHEN** a second maintenance delegation would start while one is running
- **THEN** the main agent may start it in a different product candidate, with shared project data unchanged

### Requirement: Read-only observation scope
The round SHALL observe each in-scope product's registered Git HEAD, registered official documentation content, and registered npm latest version and integrity as separate identities, together with its unsettled prior audit records. The read-only observation SHALL share baselines and audit history with the maintainer-invoked scan, and SHALL write no files, download no package bytes and create no clone. A product whose observations match their baselines and which has no unsettled audit SHALL NOT cause a delegation or new commits.

#### Scenario: Catalog candidate without registry record
- **WHEN** a catalog product has no registered source record
- **THEN** the round excludes it instead of reporting a missing source

#### Scenario: One source blocked
- **WHEN** one product's source cannot be observed
- **THEN** that source is recorded as blocked, the product's last successful baseline is retained, and other products continue

#### Scenario: No product needs handling
- **WHEN** every in-scope product reports unchanged sources and no unsettled audit
- **THEN** the round reports no change, pushes nothing, and leaves any open pull request as it is

### Requirement: One maintenance delegation per product per round
The parent SHALL assess candidate signals against fixed questions, existing evidence and actual changed content before dispatch. It SHALL delegate at most once per product with material knowledge-update evidence or an actionable incomplete question, passing pinned observations, bounded questions, candidate root, original project/owner identity, `role=worker`, `delivery=pr`, output location and prohibited paths. Version-only metadata, unrelated code and formatting changes SHALL be closed with audit reasons without maintenance; an unverified version SHALL remain unverified. Unknown impact SHALL first receive bounded entrypoint investigation, expanding only with evidence. Source failures without an actionable repair clue and repeated blockers without new evidence SHALL remain blocked without repeated delegation. Pending audits SHALL resume only incomplete actionable questions. A failed subagent SHALL NOT stop remaining products. The parent SHALL review aggregate changes and affected chapters before delivery.

#### Scenario: Source changed without a knowledge impact
- **WHEN** only npm version metadata, unrelated code or documentation formatting changed
- **THEN** the parent records its reasoning, closes resolved audit work and dispatches no maintenance worker

#### Scenario: Source repeats a known blocker
- **WHEN** a source fails in the same way and no new evidence or repair clue is available
- **THEN** the audit remains blocked/pending and no identical maintenance task is dispatched

#### Scenario: Related baseline changed during candidate work
- **WHEN** the project data for one product differs from its prepared baseline
- **THEN** that candidate is rejected for reconciliation and other valid completed products may be merged

#### Scenario: Changed source and unsettled audit for one product
- **WHEN** a product has both a changed source and unsettled prior audits
- **THEN** the round delegates maintenance for that product once, passing both inputs

#### Scenario: Subagent fails
- **WHEN** a maintenance subagent fails or times out
- **THEN** the round records the failure and continues with the rest; timeout alone does not establish that the worker stopped

### Requirement: Rolling pull request with one candidate per product and topic
Delivery SHALL use a single rolling pull request against `main` that stays open until it merges. While an earlier pull request is unmerged, each round SHALL fetch the remote, switch to that same branch, merge `origin/main` into it with an ordinary merge, and add its own commits there instead of opening a competing branch. Across the whole unmerged pull request, each product and topic SHALL hold at most one unpublished edition or topic; a later change for the same product and topic SHALL revise that existing candidate rather than add a second one, and nothing SHALL be deferred or dropped. The pull request content SHALL always equal the full difference between its branch and `main`. The round SHALL NOT force-push, rebase a pushed branch or rewrite `main` history. After an ordinary merge, the existing publication pipeline SHALL proceed on its own, and the round SHALL NOT require a maintainer publication step or start a managed-binary refresh.

#### Scenario: Two products produce candidates
- **WHEN** two products each produce one unpublished edition or topic
- **THEN** both enter the same pull request

#### Scenario: Earlier pull request is still open
- **WHEN** a round runs while a previous pull request has not been merged
- **THEN** it updates that same branch by merging `origin/main` and pushing its own commits, rather than opening a second request

#### Scenario: A product and topic changes again on a later day
- **WHEN** a later round produces new content for a product and topic already present in the unmerged pull request
- **THEN** it revises that candidate in place and the pull request still holds one candidate for that product and topic

#### Scenario: Gate fails
- **WHEN** any validation gate fails
- **THEN** nothing is pushed, the local commits and report are preserved, and the failure reason is recorded

### Requirement: Managed temporary source workspaces
The round SHALL read Git sources through project-external temporary checkouts pinned to exact commits with the original project root and long-lived coordinator owner PID. Each task SHALL record its unique workspace IDs. Each checkout SHALL remain available through investigation and independent review, then be explicitly closed. All workers and reviewers SHALL be confirmed stopped before integration or round cleanup; timeout alone SHALL NOT authorize cleanup. Recovery SHALL remove only the current project's dead-owner entries. Knowledge records SHALL preserve commit, file and content hash without temporary paths. Official documentation originals and tracked knowledge and audit history SHALL remain retained. Per-run verification output SHALL be released on finish. Uncertain ownership SHALL remain untouched and be reported. Binary artifacts and full logs are outside this round's scope; no fixed peak storage bound is promised.

#### Scenario: Subagent leaves a workspace open
- **WHEN** a subagent exits without closing its source workspace
- **THEN** the parent explicitly closes the workspace by its registered ID, or a later recovery removes it after its owner process exits

#### Scenario: Retained knowledge history
- **WHEN** a round finishes and cleans its temporary outputs
- **THEN** the chapter editions, source metadata, audits and reports committed in that round remain in Git

#### Scenario: Cleanup target has uncertain ownership
- **WHEN** a candidate cleanup target is not registered to the current lock owner or is still in use
- **THEN** it is kept and named in the round report instead of being deleted
