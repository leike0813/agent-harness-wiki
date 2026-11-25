# Antigravity maintenance report — 2026-11-25 follow-up

- Audit: `audit-antigravity-576b0b4a-4b17-4db3-b24c-42303c0a3d20`
- Harness: `antigravity` (surface `cli`)
- Candidate: `/tmp/ahw-batch-13/candidates/antigravity`
- Review status: **pending** — this product stays blocked.

## A. Completed 2026-11-24 evidence set

Five sources previously existed only as `archive/antigravity/artifact-source-*/source.md`. Each now has an `archived_document` artifact whose `archive_path` points at that retained file and whose `raw_sha256` was computed from it, plus a `snapshot-*-20261124` whose `source_fetched_at` is the source's `checked_at` from audit `audit-antigravity-76853419-857d-42ac-99c9-a851a3cf4481`:

| Source | Artifact | Snapshot | Fetched | SHA-256 (first 12) |
| --- | --- | --- | --- | --- |
| permissions | `artifact-source-agy-permissions-doc-8704d654f7b3` | `snapshot-agy-permissions-doc-20261124` | 2026-11-24T14:09:49.719Z | `8704d654f7b3` |
| rules | `artifact-source-agy-rules-doc-8097f234439d` | `snapshot-agy-rules-doc-20261124` | 2026-11-24T14:09:49.694Z | `8097f234439d` |
| agent-settings | `artifact-source-agy-agent-settings-doc-b14e2408f87e` | `snapshot-agy-agent-settings-doc-20261124` | 2026-11-24T14:09:48.706Z | `b14e2408f87e` |
| sandbox | `artifact-source-agy-sandbox-doc-1d6d0eaddccd` | `snapshot-agy-sandbox-doc-20261124` | 2026-11-24T14:09:49.977Z | `1d6d0eaddccd` |
| install (getting-started) | `artifact-source-agy-install-doc-6b1fcfbd8597` | `snapshot-agy-install-doc-20261124` | 2026-11-24T14:09:48.897Z | `6b1fcfbd8597` |

Archived bytes were not modified.

New references bind each claim to a fixed snapshot and a document section:

- permissions: `ref-agy-configuration-perms-app-previous-20261124`, `ref-agy-configuration-perms-cli-20261124`, `ref-agy-configuration-perms-unsandboxed-20261124`.
- rules: `ref-agy-configuration-rules-cumulative-20261124`.
- agent-settings: `ref-agy-configuration-agent-settings-toolpermission-20261124`.
- sandbox: `ref-agy-configuration-sandbox-cli-agentmode-20261124`.
- install: `ref-agy-configuration-install-cli-20261124` (install command and default binary location; used in this report because `/docs/install.md` auth/flags/endpoint/revert/troubleshooting remain unverified).
- CLI reference defaults: `ref-agy-configuration-cli-ref-verbosity-20261124`, `ref-agy-configuration-cli-ref-useg1credits-20261124`, `ref-agy-configuration-cli-ref-agentmode-20261124`, `ref-agy-configuration-cli-ref-toolpermission-20261124`.

## B. Hooks and settings snapshots now cited

`snapshot-agy-hooks-doc-20261124` (`c500f806…`) and `snapshot-agy-settings-doc-20261124` (`7714a0e5…`) had no references. They now back the configuration chapter's existing hooks-location claim (`~/.gemini/config/hooks.json`; `settings.json` hooks are never loaded) through `ref-agy-configuration-hooks-cli-20261124` and `ref-agy-configuration-settings-other-files-20261124`. `snapshot-agy-plugins-doc-20261124` remains cited by `ref-agy-skills-plugin-staging-20261124`.

## C. Configuration v5

New edition `antigravity-cli-configuration-v5`, selected in `registry/chapter-current.yaml`. It carries only the evidence-backed CLI default corrections:

- `verbosity` default is `medium` (2026-11-24 key table), not `high`.
- `useG1Credits` is "Not available for business accounts" (account-gated), not "external builds only".
- `agentMode` defaults to `"auto"` where available (`v1.5.7+`), otherwise `""`; the Agent Mode list now includes `auto`.

The App-level permission-preset table is left in place. A new scoping paragraph says the App's **Previous permission settings** section is for App business/enterprise accounts, not the CLI; the CLI still documents `permissions.allow/ask/deny` and `toolPermission` default `request-review`; the only CLI permission rule marked business/enterprise-only is `unsandboxed`. The old "Windows uses the previous permission system" framing was replaced with the account/form boundary.

## D. Held topics

No hooks or native_plugins chapter was written or reselected:

- hooks stays at `antigravity-cli-hooks-v1` (settings.json hook-location conflict unresolved).
- native_plugins stays at `antigravity-cli-native_plugins-v2` (marketplace IDs and staging path unresolved). Any future revision may state only the observed manifest example fields (`displayName`, `version`, `logo`, `suggestedPrompts`); there is no build-plugins/schema snapshot, so it must not claim a complete allowed-property set.
- `config.trust` stays pending for the one undocumented permission-scope question: whether CLI business/enterprise accounts have any additional policy layer beyond the documented lists and `unsandboxed`.

## E. Audit

Impacts were added for the three default fixes, the App-vs-CLI scope sentence, and the newly cited hooks/settings/rules evidence. `pending_question_ids` now contains only `config.trust`, all seven `hooks.*`, and all six `plugins.*` questions. `review_status` remains `pending`.

## Verification

```sh
cd /home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor
pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-13/candidates/antigravity
```

Exit 0; candidate validation passed.

Not run: `pnpm chapters:update`, `pnpm ahw publish`, `pnpm sources:audit-log`, `pnpm sources:scan`, managed-binary steps. Publishing and binary handling stay with the coordinator.

## Known limitation

The 2026-11-24 CLI key table no longer lists `enableTelemetry` (the CLI saves that choice with the account, and it is always off for business accounts). v4's telemetry wording was left unchanged because this round is limited to the three default fixes; it remains for a later review.
