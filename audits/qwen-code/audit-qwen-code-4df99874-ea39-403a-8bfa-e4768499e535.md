# qwen-code 巡检维护报告（20261011T015904Z）

## 观察

- 来源 `source-qwen-code-repo`：基线 `29aef7de40b752bb0464919ab4af8f08a988dd31` → 观察值 `e9582993bf419dba43839d62a3ee4da67cfbab6a`，66 个提交。
- 来源 `source-qwen-code-npm`：未变（`0.25.0`，integrity 相同），本轮不作任何映射处理。
- 固定源码工作区：`ws-e9582993bf41-1e373f3d-d546-4f71-8529-38cc2480409f`（owner pid 1424129，项目根 `/home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor`）。

## 调查范围与语义判断

本轮指派范围为 `custom_agents`、`mcp`，以及 `local_transcripts`（仅当受托的 managed-agent 会话提交改变已发布的记录/生命周期答案时）。结论：两个章节确有答案变化并新建 edition，`local_transcripts` 逐条核对后判定无知识影响。

### custom_agents → 新版 `qwen-code-cli-custom_agents-v4`

提交 “feat(agents): remove the thread backend and run A2A on sessions (#13583)” 删除 thread 运行时的 `dispatcher`、`dispatch-policy`、`host-lease`、`prompt`、`run-context`、`run-lifecycle`、`stranded-runs`、`thread-actions`、`thread-status`、`session-binding`（`git diff --name-status 29aef7d e9582993 -- packages/core/src/agents/workspace-agents/` 全部为 `D`），A2A 入站改为复用 daemon 会话多 Agent 编排器：

| 固定问题 | 变化 | 证据（commit + 文件） |
| --- | --- | --- |
| `agents.invocation` | 一个 A2A task = 一次 Agent 运行，落在为该调用方创建的聊天会话；`contextId` 是会话 id；续聊用 `contextId`、带 `taskId` 的消息被拒；调用方无法回答工具批准（`INPUT_REQUIRED`，由工作区所有者在 WebShell 回答）；运行时不可用返回 `unavailable` / envelope `-32012` | `e9582993` + `packages/cli/src/serve/routes/a2a.ts`、`packages/cli/src/serve/session-agents/a2a-sessions.ts`、`packages/core/src/agents/workspace-agents/a2a-server.ts` |
| `agents.diagnostics` | 新增两条可核对路径：A2A 卡在 `awaiting_approval` 的定位方法；Agent Host 被移除后 `endRunsForRemovedHost` 把滞留运行置 `offline`（错误串 “its Agent Host was removed”，排队运行记 `totalTokens: 0`） | `e9582993` + `packages/cli/src/serve/session-agents/orchestrator.ts` |

`agents.entry`、`agents.format`、`agents.roles`、`agents.overrides`、`agents.limits` 的已发布答案未被这些提交改变（Subagent 定义文件格式、`maxParallelAgents*`、`agentChainLimit`/`agentTokenBudget` 均未变），因此不另开 edition、不改这些小节。三个受托的 managed-agent 提交（#13544 角色与 session owner、#13550 H4b child Session runtime、#13572 H5b/H5c channel runtime）落在 Java `managed-agent-server`、托管 channel/child session 与 `qwen channel managed-email` 子命令上，不是本产品 `cli` 表面已登记的 Subagent/会话 Agent 机制入口，未改变任何已发布的 custom_agents 答案。

### mcp → 新版 `qwen-code-cli-mcp-v4`

提交 “fix(core): surface PreToolUse ask content on MCP tool confirmations (#13687) (#13697)” 在 `withPreToolUseAskReason` 中新增 `case 'mcp'`：

- MCP 确认详情整体降级为字面文本的 `info` 确认，`title` 为 “Hook requested confirmation to run TOOL”，正文写明 hook 理由与 `MCP Server:` / `Tool:`，并置 `hideAlwaysAllow: true`（这一次没有“总是允许”可选）。证据：`e9582993` + `packages/core/src/core/coreToolScheduler.ts:1617-1629`。
- plan 模式按 `ask` 改写**前**的形状判定（`planModeDetails`），改写不得把被 plan 拦下的 MCP 调用变成可批准的 `info` 对话框。证据：同文件 `:4186-4192`。
- 非交互自动拒绝的 STREAM_JSON 豁免被收窄：程序化宿主无法给出只面向人的确认，因此直接拒绝。证据：同文件 `:4261-4269`。

`mcp.entry`、`mcp.definition`、`mcp.transport`、`mcp.auth`、`mcp.lifecycle`、`mcp.capabilities` 未变，不改版。

### local_transcripts → 已复核，无知识影响

逐条核对了 #13544、#13550、#13572：它们不改变 `cli` 表面已发布的 `transcripts.scope/location/naming/format/schema/lifecycle/database/archive/cleanup/diagnostics` 任一答案。A2A 会话确实写入同一 transcript（`sourceType: 'default'`，WebShell 显示 “A2A · CALLER”），但该证据归属 custom_agents 提交，且已在 `agents-invocation` 中交代，不为此改写本地 transcript 章节。

## 附带发现（未改章，交协调者定范围）

`packages/core/src/services/chatRecordingService.ts` 在本轮新增可选 `ChatRecord.executionContext`（`modelId`、`authType`、`approvalMode`），随 `recordUserMessage` 与 `recordMidTurnUserMessage` 写入。这属于 `transcripts.schema`，但不在本轮指派问题范围内，因此只记录不写章节；是否另开范围由协调者判断。

## 排除（按指派明确不调查）

- `docs(verify-pr): add local-round publish, follow-up, mutation and rig rules (#13756)`
- `.qwen/skills/verify-pr/SKILL.md`（本项目自有开发 skill，不是被记录产品的机制）
- 全部 `docs/design/*.md` 规划文档
- 禁改主题：`configuration`、`skills`、`hooks`、`native_plugins`、`custom_providers`

## 候选与校验

- 候选根：`/tmp/ahw-monitor-ae5885a4-b44d-4571-8acc-55d0bcefbcff-clr5On/batch/candidates/qwen-code`
- 新增记录：5 个 artifact、5 个 snapshot、9 个 reference；新章节 2 个（`qwen-code-cli-custom_agents-v4`、`qwen-code-cli-mcp-v4`），旧 edition 全部保留。
- `registry/chapter-current.yaml` 在候选内切换 `custom_agents` → v4、`mcp` → v4。
- `pnpm maintenance:candidates check --candidate <候选根>` 通过。
- 复核：作者自检（逐条核对 source ref、question、surface 与版本边界）。两处改动都是在既有小节内补充新证据、未推翻已发布步骤，判断为非高影响；如协调者要求，可交独立 reviewer 复核 `agents.invocation` 与 `mcp.exposure` 的结论措辞。