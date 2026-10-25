# codebuff — maintenance report for audit-codebuff-ff80e11a

**Observation frozen at** `source-codebuff-repo` `7798b1320bccc2644aa819d042ac355b463055dc` →
`99d7092ee7cc6aa17aac3f3a292c2ba7a7d54310`, plus ten `source-codebuff-docs-*` official-documentation
sources and an unchanged `source-codebuff-npm` (`1.0.688`, same integrity).

**Evidence read from** the pinned workspace `ws-99d7092ee7cc-5a6c3e3f-a614-4b76-b929-b5f8d28a6c1a`
(`git -C <workspace> diff 7798b1320bcc 99d7092ee7cc -- <path>`). All 62 changed paths were classified;
only the five files named below became new pinned records.

## Included — verified, chapter editions created

### custom_providers → `codebuff-cli-custom-providers-v3`

- `sdk/src/impl/byok-request.ts` (+73 lines, no deletions). `byokRequestTransform` gained a fourth
  provider-specific rewrite. When the completion endpoint host equals
  `generativelanguage.googleapis.com`, `backfillGeminiThoughtSignatures` runs after the existing
  reasoning rewrites and gives the **first** tool call of every assistant message that carries
  `tool_calls` but no string `extra_content.google.thought_signature` Google's placeholder constant
  `GEMINI_SKIP_THOUGHT_SIGNATURE` (`skip_thought_signature_validator`).
  The published v2 edition enumerated "另外三项专门处理" — three — so both the count and the
  Gemini-specific handling were wrong from this commit on. `providers.forwarding` updated.
- `packages/llm-providers/src/openai-compatible/chat/openai-compatible-chat-language-model.ts`
  (+54 lines, no deletions) and `sdk/src/impl/llm.ts`: streamed and non-streamed tool calls now keep
  `extra_content` as provider metadata shaped `{ [providerOptionsName]: { extra_content, model } }`,
  tagged with the producing model id the way `reasoning_details` already was, and the SDK rides that
  metadata into the history's tool-call part. `providers.responses` extended with this
  capture-and-replay half of the same mechanism.

New pinned records, all at commit `99d7092ee7cc6aa17aac3f3a292c2ba7a7d54310` with `content_sha256`
computed from the workspace bytes (`git cat-file blob`): artifacts + snapshots for
`sdk/src/impl/byok-request.ts`, `sdk/src/impl/llm.ts`,
`packages/llm-providers/src/openai-compatible/chat/openai-compatible-chat-language-model.ts`, and
references `ref-codebuff-byok-gemini-signature`, `ref-codebuff-byok-gemini-placeholder`,
`ref-codebuff-byok-gemini-backfill`, `ref-codebuff-provider-tool-call-extra-content`,
`ref-codebuff-llm-provider-metadata-replay`. Every excerpt was re-checked as a verbatim substring of
the pinned blob.

### custom_agents → `codebuff-cli-custom-agents-v4`

- `common/src/tools/params/tool/spawn-agents.ts` added `MAX_LIVE_SUBAGENTS_PER_ROOT = 20`.
- `packages/agent-runtime/src/tools/handlers/tool/spawn-agents.ts` now enforces it for **every** agent
  type, not only the Freebuff Projects subagent: `liveBucket` splits counting into a shared per-root
  Projects count and a `MAX_LIVE_SUBAGENTS_PER_ROOT` count scoped to the nearest Projects subagent,
  and `reserveLiveSlot` refuses with a message that tells the model not to retry the spawn.
  This was verified against the runtime handler, not just against the tool schema.
- `codebuff-cli-custom-agents-v3` recorded the exact opposite as a gap ("固定来源没有给出并发子 agent
  数量、嵌套深度或单 agent 时长的独立上限"), which the diff shows was true at its own pinned commit and
  false from `99d7092ee7cc`. `agents.limits` corrected; the narrowed gap (no per-agent duration cap, no
  separate nesting-depth limit) is stated instead. Answer stays `partial`.

New pinned records: artifacts + snapshots for `common/src/tools/params/tool/spawn-agents.ts` and
`packages/agent-runtime/src/tools/handlers/tool/spawn-agents.ts`, and references
`ref-codebuff-subagent-agents-per-call` (the per-call 6, unchanged constant re-pinned because the
section now cites it), `ref-codebuff-subagent-live-cap`, `ref-codebuff-subagent-live-cap-scope`,
`ref-codebuff-subagent-live-cap-refusal`.

## Excluded — reviewed, with reason

- **Ten `source-codebuff-docs-*` sources** — `reviewed_no_impact`. The coordinator already diffed the
  archived originals with scripts and styles stripped: rendered text is byte-identical to the previous
  archived copies, only Next.js chunk/CSS build hashes and the `b:` build id moved. Recorded, not
  re-derived.
- **`agents/base3.ts`, `agents/projects-subagent.ts`** — no published statement. `base3.ts` adds an
  `instructionsPrompt` (`TURN_ENDING_NOTE`) only when the compiled model is Muse Spark 1.3, and
  `ref-codebuff-agent-modes` is pinned to `cli/src/utils/constants.ts`, which did not change.
- **`packages/agent-runtime/src/{tools/stream-parser.ts,tool-stream-parser.ts,run-agent-step.ts,util/
  suggest-prompts-before-answer.ts}`** — thread the tool-call `providerOptions` through (corroborating
  the custom_providers claim already recorded) and add a new "suggest prompts before answer"
  turn-ending nudge that no chapter states.
- **`sdk/src/impl/stream-interruption.ts`** — rewords interruption classification and recovery strings;
  no chapter states the wording.
- **`common/src/desktop-cloud/history.ts` → local_transcripts** — adds `removedAt` to
  `CloudHistoryProject` and changes the project-update type. The chapter covers the CLI's on-disk
  session records only, and the desktop cloud project list is a different surface from the registered
  `cli`.
- **`common/src/ads/*`, survey/telemetry/i18n files, `common/src/desktop-cloud/turn-metrics.ts`,
  `common/src/sites/client.ts`, `common/src/constants/freebuff-*`, `common/src/util/*`,
  `cli/src/components/*`, `cli/src/hooks/*`, `cli/src/state/*`, `cli/src/utils/*`,
  `docs/testing.md`, `bun.lock`** — none is cited by any codebuff chapter and none is a provider
  request, stream, error, configuration loader, hook event, MCP definition, plugin manifest or skill
  discovery entry point. Verified by matching every changed path against
  `knowledge/codebuff/references/` and `knowledge/codebuff/chapters/`; only
  `sdk/src/impl/byok-request.ts` and
  `packages/llm-providers/src/openai-compatible/chat/openai-compatible-chat-language-model.ts` matched.

## Mapping and version notes

No software-version mapping was created. All new evidence is pinned to a source commit, which by the
project rule cannot on its own prove an npm release's behaviour; `source-codebuff-npm` is unchanged.

## Review

No independent reviewer requested. Both edits are fully explained by the version change — the
superseded statements were accurate for the commits their editions pinned, and the diffs show the new
code arriving here. Neither edit touches a published configuration step, and the subagent cap is not a
cross-topic key loader or config mechanism. The one judgement call worth flagging to the coordinator:
`agents.limits` does overturn a published statement, though a gap statement rather than an
instruction.

## Out of scope

`audits/codebuff/audit-codebuff-1c23337c-6204-49c1-a163-096fdaf80896.yaml` is a later scan whose git
baseline is this audit's observed commit and whose observed commit `86e5fd356845357952cd85616446b60167da0944`
has no pinned workspace in this task. It is left untouched and still `pending`; this report does not
close it.

## Verification actually run

`pnpm maintenance:candidates check --candidate /tmp/ahw-batch-1791831061/candidates/codebuff` from the
project root.
