# harness-monitor Specification

## Purpose

Defines the monitoring boundary: a daily script-only observation of registered sources into a shared ledger, a weekly budgeted window that claims a limited set of products, audited settlement of every claimed task, and a single rolling pull request that keeps one candidate per product and topic until it merges.

## Requirements

### Requirement: Scheduled daily observation
The scheduler SHALL run a verified script runtime daily at 02:00 Asia/Shanghai with 60 minutes of grace. Only an eligible Sunday precheck SHALL start a fresh Agent session. Observation and maintenance SHALL use the repository's shared PID lock. A live owner SHALL prevent overlap; dead-owner recovery SHALL preserve foreign resources. Enabling SHALL require verified commands, runtime assets, and deterministic precheck tests.

#### Scenario: Missed round replayed in the grace window
- **WHEN** a missed daily invocation is replayed within its grace window
- **THEN** the script records one observation and starts no Agent unless the weekly gate is satisfied

#### Scenario: Second round requested while one is active
- **WHEN** a recorded monitor owner is still alive
- **THEN** another invocation reports the active owner without starting concurrent work

#### Scenario: Previous round left temporary output behind
- **WHEN** a dead owner left registered temporary outputs
- **THEN** the next invocation recovers owned outputs and preserves live or foreign resources

#### Scenario: Schedule enabled before prerequisites
- **WHEN** runtime or precheck validation has not passed
- **THEN** the schedule stays disabled and no Agent investigation runs

### Requirement: Pinned model and isolated parallel delegation
The project model configuration SHALL select the monitoring main session's model, and the monitoring round SHALL NOT inherit the orchestrating coordinator's model. Every maintenance and review delegation SHALL pass `minimax-cn/MiniMax-M3.1-Flash-Preview` explicitly. The main agent SHALL decide concurrency without a fixed worker limit. Each product SHALL have one writer in an independent candidate dataset. Workers SHALL NOT edit shared project data, rescan sources, publish knowledge or update managed binaries. The parent SHALL merge candidates by product and product/topic, preserve unrelated edits, and reject stale baselines or colliding identities without discarding other completed candidates.

#### Scenario: Pinned model unavailable
- **WHEN** the pinned model cannot be selected for a delegation
- **THEN** the round reports the blocked product and continues with the remaining products without substituting another model

#### Scenario: Concurrent delegation requested
- **WHEN** a second maintenance delegation would start while one is running
- **THEN** the main agent may start it in a different product candidate, with shared project data unchanged

### Requirement: Read-only observation scope
Daily observation SHALL check registered Git HEADs, official documentation bytes, and npm latest identities without changing Git, downloading package bytes, or creating source checkouts. It SHALL persist the raw observation and queue state locally. Other source observations SHALL leave the processed baseline at its last settled identity, while a normal npm version advance SHALL be closed locally as metadata-only without a version mapping or knowledge conclusion. The manual `sources:check` entry SHALL remain read-only and SHALL report `requires_triage` only when the current observation contains a changed source.

#### Scenario: Catalog candidate without registry record
- **WHEN** a catalog product has no registered source record
- **THEN** observation excludes it instead of reporting a missing source

#### Scenario: One source blocked
- **WHEN** one product's source cannot be observed
- **THEN** that source is recorded as blocked, its prior successful baseline is retained, and other products continue

#### Scenario: No product needs handling
- **WHEN** every in-scope product reports unchanged sources and no unsettled audit
- **THEN** observation records no maintenance candidate and pushes nothing

#### Scenario: Read-only check never advances state
- **WHEN** a maintainer runs `sources:check`
- **THEN** it writes no audit, cache, checkout, package bytes, or processed baseline

#### Scenario: Changed source requests triage
- **WHEN** a current source observation differs from its baseline
- **THEN** `requires_triage` is true without directly creating or dispatching a maintenance task

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

### Requirement: Daily scripted observation
One Orca automation SHALL invoke a script-only precheck every day at 02:00 in `Asia/Shanghai`. The precheck SHALL observe registered sources and persist its local result without starting an LLM, switching branches, opening source workspaces, or changing Git. Precheck and agent sessions SHALL coordinate through the same shared monitor lock. Weekday observations SHALL complete without a launch decision for an Agent.

#### Scenario: Weekday observation
- **WHEN** the daily precheck runs on a weekday
- **THEN** it records the observation, refreshes the queue, and exits with the normal skip status without starting an Agent

#### Scenario: Daily observation is retained
- **WHEN** two consecutive daily prechecks observe different identities
- **THEN** both local observations remain available and neither marks the earlier identity as processed

#### Scenario: Ordinary npm metadata advance
- **WHEN** a registered npm latest version advances with a normal integrity-bearing identity
- **THEN** that source is recorded as handled metadata without a version mapping or chapter conclusion

#### Scenario: Precheck overlaps an active session
- **WHEN** a maintenance session already owns the shared monitor lock
- **THEN** the precheck does not change monitor state concurrently and reports the conflict as a technical result

### Requirement: Weekly investigation window
Only the Sunday 02:00 scheduler window, including its 60-minute grace period, SHALL be eligible to start an Agent. The launch decision SHALL require a due week, a launchable precheck no older than 60 minutes, an unexhausted budget, and at least one eligible queued product. Each week SHALL investigate at most five products; a narrow investigation and a failed task each consume one product slot.

#### Scenario: Sunday with queued work
- **WHEN** a fresh Sunday precheck reports eligible products and remaining budget
- **THEN** the scheduler may start the Agent and the Agent claims at most five products for that week

#### Scenario: Sixth product in one week
- **WHEN** five products have already been claimed for the current monitor week
- **THEN** no sixth product is claimed and the queue remains for a later week

#### Scenario: Weekday launch attempt
- **WHEN** an Agent start is requested outside the Sunday window or with a stale precheck
- **THEN** the start is refused and no task or budget is consumed

### Requirement: One writer per product per week
The coordinator SHALL create at most one maintenance writer for a product in a monitor week. Narrow investigations and failures SHALL count as that product's attempt. Necessary independent review SHALL remain separate from the writer and SHALL not create a second investigation of the same product.

#### Scenario: Narrow follow-up appears after a claim
- **WHEN** new related evidence appears for a product already claimed that week
- **THEN** the evidence is added to the existing task scope or deferred, and no second writer is started for that product

#### Scenario: High-impact conclusion needs review
- **WHEN** a claimed product produces a conclusion that requires independent review
- **THEN** one independent reviewer checks the fixed evidence and candidate without becoming a second writer

### Requirement: Shared monitor ledger
Git worktrees of one repository SHALL share the monitor ledger and lock at `<git-common-dir>/agent-harness-wiki-monitor/session.sqlite`. A standalone dataset SHALL use `<dataset-root>/var/harness-monitor/`. The ledger SHALL retain daily observations, per-source processed and attempted identities, pending queue age, tasks, weekly usage, and the active session. It SHALL keep document comparison data across session cleanup.

#### Scenario: Two real worktrees
- **WHEN** the dedicated monitor worktree and another worktree of the same repository open monitor state
- **THEN** both use the same ledger and the same session lock

#### Scenario: Standalone dataset
- **WHEN** the monitor runs against a directory that is not a Git worktree
- **THEN** its ledger and lock live under that dataset's `var/harness-monitor`

#### Scenario: Session cleanup
- **WHEN** a monitor session finishes successfully
- **THEN** its temporary observation directory is removed while the ledger, document comparison cache, and prior observations remain

### Requirement: Queue aging and settled identities
Unclaimed products SHALL remain queued and SHALL be ordered by their first pending observation time and then by harness ID. A later changed identity SHALL preserve the product's original queue age. A daily observation other than a normal npm metadata advance SHALL not advance the processed baseline. A settled identity SHALL not be dispatched again automatically after completion, no-impact review, blocking, or failure; a new observed identity may create new work.

#### Scenario: New change does not reset age
- **WHEN** a queued product observes another changed identity before it is claimed
- **THEN** it keeps its original pending time and queue position relative to products with older pending work

#### Scenario: Observations overtake processing
- **WHEN** daily observation advances a source from A to B to C while only A was processed
- **THEN** the next investigation sees A to C and the processed baseline remains A until a settled result advances it to C

#### Scenario: Settled identity remains settled
- **WHEN** a completed, blocked, failed, or reviewed-no-impact identity is observed again unchanged
- **THEN** it is not automatically dispatched again

### Requirement: Claimed-task triage
The coordinator SHALL triage only tasks returned by the current `start` handoff, using only their frozen observations and bounded evidence entry points. It SHALL not rescan sources or inspect unclaimed products. A product outcome SHALL be recorded before the session is finished.

#### Scenario: Unclaimed product changed again
- **WHEN** an unclaimed product appears in the daily observation after `start`
- **THEN** the current round leaves it for a later claim instead of adding it to the active investigation

#### Scenario: Candidate work fails after the audit
- **WHEN** a claimed product cannot deliver its candidate
- **THEN** the coordinator writes a blocking audit to the original dataset and records that product before finishing

### Requirement: Monitor command contract
The monitor CLI SHALL expose `precheck`, `start`, `status`, `record`, and `finish`. Precheck SHALL emit JSON with schedule, budget, queue, source failures, launch status, diagnostic, and a persisted observation path. It SHALL exit 0 only when launchable, 2 for a normal skip, and 1 for a technical or delivery failure. Start SHALL consume a fresh precheck, and finish SHALL require every claimed task to have a recorded outcome.

#### Scenario: Launchable precheck
- **WHEN** precheck is due with queued work and remaining budget
- **THEN** it emits `launch: true` and exits 0

#### Scenario: Ordinary skipped precheck
- **WHEN** precheck finds no launchable condition without a technical error
- **THEN** it emits `launch: false` and exits 2

#### Scenario: Delivery worktree blocks a due week
- **WHEN** Sunday precheck has queued work and remaining budget but the delivery worktree is not linked or is dirty
- **THEN** it retains the observation, emits `status: delivery_blocked` and a diagnostic, sets launch false, and exits 1

#### Scenario: Dirty worktree at start
- **WHEN** `start` finds uncommitted changes in the delivery worktree
- **THEN** it refuses to claim any product and leaves the queue and budget unchanged

#### Scenario: Start reuses observation
- **WHEN** `start` accepts the shared lock
- **THEN** it returns the frozen precheck path and claimed tasks without rescanning upstream sources

#### Scenario: Status remains local
- **WHEN** `status` reports queue and recent tasks
- **THEN** it reads only the shared ledger and does not observe upstream or create work

#### Scenario: Unsettled finish
- **WHEN** `finish` is called while a claimed task has no recorded outcome
- **THEN** it refuses to release the session

### Requirement: Audited result settlement
`record` SHALL bind each outcome to a valid original-dataset audit and the frozen task's source identities. Outcomes SHALL be `completed`, `reviewed_no_impact`, `blocked`, `failed`, or `waiting_for_integration`. Completion SHALL require recorded self-check or review, no incomplete current questions, no failed source, and applicable integration validation. Waiting outcomes MAY later become completed.

#### Scenario: Missing audit
- **WHEN** the result names an audit that is absent or belongs to another product
- **THEN** recording fails and the task remains unsettled

#### Scenario: Waiting for delivery
- **WHEN** a valid result is waiting for integration
- **THEN** its identity remains attempted, the session may finish, and the result remains visible as undelivered

#### Scenario: Waiting result delivered
- **WHEN** integration validation succeeds after a waiting result
- **THEN** the same task is recorded as completed and its processed identity advances to the settled observation

#### Scenario: Failed task remains visible
- **WHEN** a task result is failed
- **THEN** the failure is recorded and the same identity is not automatically investigated again
