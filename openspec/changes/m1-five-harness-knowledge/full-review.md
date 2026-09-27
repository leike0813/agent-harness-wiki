# Five-product, seven-topic semantic review packet

All Targets are CLI, Linux/x64, native execution, and the pinned npm distribution recorded in each Coverage file. This packet is a review of **35 investigations**, not a claim that 35 capabilities are supported. Each row is `partial`: the cited material was examined, but at least one exact-version or runtime question remains. `partial` is a coverage state, not a support verdict.

| Short name | Exact npm release | Package/source boundary |
|---|---|---|
| Codex | `@openai/codex@0.157.1` | Package README is sparse; captured official docs have unknown version applicability. Older checkout is a separate identity. |
| Claude | `@anthropic-ai/claude-code@2.1.283` | Package README is sparse; captured official docs have unknown version applicability. |
| OpenCode | `opencode-ai@1.18.32` | npm wrapper ships a binary; pinned source tag is not yet mapped to the binary build. |
| Pi | `@mariozechner/pi-coding-agent@0.73.1` | Package ships topic docs; selected source files are tied to the npm integrity. |
| OMP | `@oh-my-pi/pi-coding-agent@18.3.4` | Package ships the inspected TypeScript source; execution and installed extension state remain unobserved. |

## Investigation matrix

Each link opens the full Coverage record with exact Target, Snapshot IDs, checked file/section, and remaining gap. The short finding below is a pointer to that record, not a published fact.

| Product | Topic | Investigation result / remaining proof |
|---|---|---|
| Codex | [Skills](../../../knowledge/codex-cli/coverage/coverage-codex-cli-skills.yaml) | Official page describes paths; package README does not bind those paths to 0.157.1. |
| Codex | [MCP](../../../knowledge/codex-cli/coverage/coverage-codex-cli-mcp.yaml) | Official page describes server configuration; exact package applicability unverified. |
| Codex | [Custom agents](../../../knowledge/codex-cli/coverage/coverage-codex-cli-custom-agents.yaml) | Configuration reference mentions agent settings, but no exact-package definition/loading contract was established. |
| Codex | [Custom providers](../../../knowledge/codex-cli/coverage/coverage-codex-cli-custom-providers.yaml) | `model_provider(s)` appears in unversioned configuration reference; exact-package schema unverified. |
| Codex | [Hooks](../../../knowledge/codex-cli/coverage/coverage-codex-cli-hooks.yaml) | Reference lists hook settings and events; 0.157.1 applicability and execution unverified. |
| Codex | [Native plugins](../../../knowledge/codex-cli/coverage/coverage-codex-cli-native-plugins.yaml) | Skills and MCP pages mention plugin distribution; binary plugin loading unverified. |
| Codex | [Configuration](../../../knowledge/codex-cli/coverage/coverage-codex-cli-configuration.yaml) | Page describes user/project precedence; exact-package precedence unverified. |
| Claude | [Skills](../../../knowledge/claude-code/coverage/coverage-claude-code-skills.yaml) | Captured page describes locations and duplicate names; package version binding absent. |
| Claude | [MCP](../../../knowledge/claude-code/coverage/coverage-claude-code-mcp.yaml) | Captured page describes transport/scope; exact-package behavior unverified. |
| Claude | [Custom agents](../../../knowledge/claude-code/coverage/coverage-claude-code-custom-agents.yaml) | Captured pages refer to agent files and scoped servers; definition/loading for 2.1.283 unverified. |
| Claude | [Custom providers](../../../knowledge/claude-code/coverage/coverage-claude-code-custom-providers.yaml) | Settings page mentions model/provider options; general custom-provider contract unknown. |
| Claude | [Hooks](../../../knowledge/claude-code/coverage/coverage-claude-code-hooks.yaml) | Settings page mentions hook configuration/reload; exact package execution unverified. |
| Claude | [Native plugins](../../../knowledge/claude-code/coverage/coverage-claude-code-native-plugins.yaml) | Pages mention plugins, trust and plugin-provided MCP; loaded/active/healthy state unverified. |
| Claude | [Configuration](../../../knowledge/claude-code/coverage/coverage-claude-code-configuration.yaml) | Captured page describes scopes/precedence; exact-package applicability unverified. |
| OpenCode | [Skills](../../../knowledge/opencode/coverage/coverage-opencode-skills.yaml) | Pinned source documents Skills; source-to-binary mapping unverified. |
| OpenCode | [MCP](../../../knowledge/opencode/coverage/coverage-opencode-mcp.yaml) | Pinned source documents local/remote servers; binary behavior unverified. |
| OpenCode | [Custom agents](../../../knowledge/opencode/coverage/coverage-opencode-custom-agents.yaml) | Pinned source defines configurable primary/subagents; binary mapping and loading unverified. |
| OpenCode | [Custom providers](../../../knowledge/opencode/coverage/coverage-opencode-custom-providers.yaml) | Pinned source has provider configuration; binary mapping and connection unverified. |
| OpenCode | [Hooks](../../../knowledge/opencode/coverage/coverage-opencode-hooks.yaml) | Pinned source documents plugin event/tool hooks; binary mapping and invocation unverified. |
| OpenCode | [Native plugins](../../../knowledge/opencode/coverage/coverage-opencode-native-plugins.yaml) | Pinned source documents local/npm plugins; binary mapping and activation unverified. |
| OpenCode | [Configuration](../../../knowledge/opencode/coverage/coverage-opencode-configuration.yaml) | Pinned source describes config precedence; binary mapping unverified. |
| Pi | [Skills](../../../knowledge/pi/coverage/coverage-pi-skills.yaml) | Package docs identify user path; one narrow path Claim was previously accepted. |
| Pi | [MCP](../../../knowledge/pi/coverage/coverage-pi-mcp.yaml) | Package README excludes built-in MCP and points to extensions; narrow draft below. |
| Pi | [Custom agents](../../../knowledge/pi/coverage/coverage-pi-custom-agents.yaml) | Package README excludes built-in subagents and points to external composition; extension behavior unobserved. |
| Pi | [Custom providers](../../../knowledge/pi/coverage/coverage-pi-custom-providers.yaml) | Package docs describe `models.json` and `registerProvider`; registration/authentication unobserved. |
| Pi | [Hooks](../../../knowledge/pi/coverage/coverage-pi-hooks.yaml) | Package docs describe extension event callbacks; event execution unobserved. |
| Pi | [Native plugins](../../../knowledge/pi/coverage/coverage-pi-native-plugins.yaml) | Package docs describe `pi install` and manifests; installed package activation unobserved. |
| Pi | [Configuration](../../../knowledge/pi/coverage/coverage-pi-configuration.yaml) | Package docs state project/global settings precedence; exact rule remains under semantic review. |
| OMP | [Skills](../../../knowledge/omp/coverage/coverage-omp-skills.yaml) | Packaged source has discovery and duplicate resolution; path outcomes unverified. |
| OMP | [MCP](../../../knowledge/omp/coverage/coverage-omp-mcp.yaml) | Packaged source has MCP manager/transports; server health unobserved. |
| OMP | [Custom agents](../../../knowledge/omp/coverage/coverage-omp-custom-agents.yaml) | Packaged discovery code names OMP agent roots; narrow user path draft below. |
| OMP | [Custom providers](../../../knowledge/omp/coverage/coverage-omp-custom-providers.yaml) | Packaged config validates custom providers/models; connection unobserved. |
| OMP | [Hooks](../../../knowledge/omp/coverage/coverage-omp-hooks.yaml) | Packaged hook loader/runner and pre/post definitions inspected; execution unobserved. |
| OMP | [Native plugins](../../../knowledge/omp/coverage/coverage-omp-native-plugins.yaml) | Packaged `plugin` command has install/list/enable/doctor; installed plugin health unobserved. |
| OMP | [Configuration](../../../knowledge/omp/coverage/coverage-omp-configuration.yaml) | Packaged settings code layers sources; setting-specific precedence unverified. |

## Exact-package Claim decisions

The first row was already accepted by the user and published in `first-wave-pi-skills-20260927`. The next two are **drafts** and need semantic review before any acceptance. Neither draft is in the current release.

| State | Claim / Target | Assertion and conditions | Evidence to review |
|---|---|---|---|
| Accepted | [Pi Skills user path](../../../knowledge/pi/claims/claim-pi-user-skills-path.yaml), Pi 0.73.1 | User Skills directory `~/.pi/agent/skills`; no extra condition | [Evidence](../../../knowledge/pi/evidence/evidence-pi-user-skills-path.yaml): `snapshot-pi-npm`, `docs/skills.md:27`, documented. |
| Draft | [Pi core MCP](../../../knowledge/pi/claims/claim-pi-core-mcp.yaml), Pi 0.73.1 | Built-in MCP client in Pi core is unsupported; does **not** judge external extensions | [Evidence](../../../knowledge/pi/evidence/evidence-pi-core-mcp.yaml): `snapshot-pi-readme-npm`, `README.md:470`, documented. |
| Draft | [OMP user agent path](../../../knowledge/omp/claims/claim-omp-user-agents-path.yaml), OMP 18.3.4 | OMP-native user agent definitions discovered from `~/.omp/agent/agents/*.md`; no extra condition | [Evidence](../../../knowledge/omp/evidence/evidence-omp-user-agents-path.yaml): `snapshot-omp-agent-discovery-npm`, `src/task/discovery.ts:5`, source inspected; discovery function at lines 99-110. |

For each draft, review the linked Claim, Evidence, and Assessment together. Accept, revise, or reject the narrow assertion and its Target; `draft` remains until a human decision is recorded. A request for runtime proof would require a separately authorized experiment against an isolated environment.

## Reproduction and boundary

Run `pnpm ahw validate --dataset-root . --profile production` and `pnpm sources:audit` while the current package originals are retained. `COVERAGE_INCOMPLETE` warnings are expected: the records expose remaining exact-version and runtime gaps. The isolated candidate `var/review-full/five-topic-review-20260927/` was built and checked: five harnesses, 35 Coverage records, and only the previously accepted Pi Skills fact. CLI and a real MCP client returned Pi MCP as `partial` with zero facts; the candidate site built and its generated Markdown contains neither draft. `pnpm verify` and strict validation of both OpenSpec changes passed. The formal release pointer stays on `first-wave-pi-skills-20260927` until review and a new verified build.
