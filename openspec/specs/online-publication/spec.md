# online-publication Specification

## Purpose

Defines durable public knowledge and consumer-program delivery, with separately recorded deployment and verification, immutable recovery artifacts, server retention, failure reconciliation and real public acceptance.

## Requirements

### Requirement: Knowledge publication events
Main pushes SHALL publish validated production knowledge and matching pages. Pull requests SHALL validate without publication authority. Manual operations SHALL support retry, recovery and reconciliation. Production mutations SHALL serialize without cancelling an ongoing deployment; a normal candidate SHALL still be main's latest commit immediately before deployment.

#### Scenario: Stale candidate
- **WHEN** a newer main commit exists before an older candidate starts deployment
- **THEN** the old candidate is skipped and cannot overwrite the newer publication

#### Scenario: Recovery selected
- **WHEN** a maintainer selects a verified archived recovery target
- **THEN** its historical commit is allowed without bypassing serialization or validation

### Requirement: Durable publication state
A durable ledger separate from immutable archives SHALL record fixed publication identities and times, intended and actual deployments, verification, current exit events, recovery targets and program releases. Updates SHALL detect concurrent changes. Missing required state or uncertain deployment SHALL stop publication and cleanup until reconciled; artifact creation or a failed attempt SHALL not count as a successful current transition.

#### Scenario: Interrupted deployment
- **WHEN** execution ends after deployment intent but before its outcome is recorded
- **THEN** subsequent publication stops and reconciliation must confirm the actual target before retention can be evaluated

### Requirement: Immutable recovery archives
Each accepted online release SHALL have a retrievable immutable archive of its own data and matching pages, independent of retained releases. First generation SHALL fix publication time. Retries SHALL reuse successful archives without replacement. Archives SHALL cover current, recovery and protected historical releases and SHALL contain no local originals, models or credentials.

#### Scenario: Retry saved release
- **WHEN** the same commit is retried after its archive succeeded
- **THEN** the same archive and publication time are used without rebuilding or replacing immutable assets

### Requirement: Server release retention
An old release SHALL remain readable for at least 30 days after confirmed exit from current. Supported protocols SHALL protect current and a verified recovery release. Returning to current SHALL renew protection and a later exit SHALL restart its window. Chapter trimming, client caches and archive creation SHALL not shorten server retention. Capacity failure SHALL preserve the deployed site.

#### Scenario: Failed release recovered
- **WHEN** a deployed but unverified release is replaced with a verified recovery target
- **THEN** the failed release's data remains intact for its exit window while the recovery target supplies the pages and pointer

### Requirement: Protocol freeze and retirement
When a new major protocol becomes available, the old protocol SHALL freeze at its usable target and remain readable until an announced retirement date at least 90 days later. Retirement SHALL require all applicable retention obligations to be satisfied and preserve an explicit machine-readable upgrade entry. Ending support SHALL release the protocol's permanent current and recovery protection, without deleting local history.

#### Scenario: Retirement not due
- **WHEN** an old partition's announced date or another protected release window has not elapsed
- **THEN** its required pointer and data remain readable rather than being removed for capacity

### Requirement: Verification and manual recovery
Deployment and verified usability SHALL be recorded separately. Bounded post-deployment checks SHALL read the pointer, navigation, representative chapter, lexical query, source and matching reader pages. Failures SHALL report an unusable or uncertain result and a saved recovery target without automatic network-triggered rollback. Recovery SHALL reassemble saved pages and pointer with protected data, then repeat complete and public validation.

#### Scenario: Public readback fails
- **WHEN** a deployment succeeds but its public verification fails
- **THEN** the failure is recorded without marking it usable or automatically changing its target

### Requirement: Independent program publication
Only a selected npm-vX.Y.Z tag matching the package version and verified main ancestry SHALL release the program. The same validated tgz SHALL go to next; exact public installation against real Pages SHALL precede latest promotion. Published versions SHALL not be overwritten, retries SHALL verify existing candidate integrity, and older candidates SHALL not displace newer stable versions. Program failure SHALL not rewrite knowledge current.

#### Scenario: Candidate already published
- **WHEN** a tag workflow retries a version already in npm
- **THEN** it verifies that version's integrity and repeats missing acceptance rather than treating existence as success

### Requirement: Initial package bootstrap and trusted publication
The first verified 1.0.0 tgz SHALL be interactively published to next by the maintainer to establish the package, then configured for trusted publishing. Subsequent releases and latest promotions SHALL use GitHub-hosted OIDC with compatible pinned tools and explicit publish and dist-tag permission. Missing account preparation SHALL be reported without storing a long-lived publishing token or declaring completion.

#### Scenario: Initial trust unavailable
- **WHEN** package ownership or trusted publishing is not prepared
- **THEN** the validated candidate is available for setup while publication acceptance remains incomplete

### Requirement: Honest public acceptance
Delivery SHALL separately record implementation, packaging, deployment, verified usability and npm publication, including actual identities and platform results. Default tests SHALL use controlled services and temporary configuration. Real Pages, archive recovery and exact public npm installation SHALL be explicit acceptance; future retention periods SHALL use controlled time rather than claims of elapsed real time.

#### Scenario: Workflow authored only
- **WHEN** publication workflows exist but have not deployed or published successfully
- **THEN** public delivery tasks remain incomplete
