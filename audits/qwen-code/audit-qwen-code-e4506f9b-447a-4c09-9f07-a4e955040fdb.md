# Qwen Code 上游审阅报告 · 2026-10-09

## 给维护者的结论

`source-qwen-code-repo` 从 `4bffa678` 走到 `29aef7de`，665 个文件，其中真正改变已登记机制答案的是四处：CLI 新注册 `qwen agents` 子命令（把本机 `qwen serve` 作为 Agent Host 加入 coordinator，以及一个隐藏的 `session_send` stdio MCP server）、`settingsSchema.ts` 里两个记忆 Agent 预算键作用域被写死为 User/System/SystemDefaults、`chatRecordingService.ts` 新增会话多 Agent 的两类记录、`jsonl-utils.ts` 的读取预算改为达额即停。这四处影响 custom agents、mcp、configuration、local_transcripts 四个主题，本轮各出一个新 edition（共 8 个固定问题全部取得新证据），旧 edition 原样保留。npm 来源 `0.25.0` 未变，且本轮证据只能证明源码树行为，没有写任何软件版本映射。

值得知道的边界：`qwen agents` 与 `agentCollaboration` 在较新提交的用户文档里仍无记载，相关答案按源码级知识陈述，`agents.invocation` 保持 `partial`。托管会话的记录写入方没有 `agent_mention`/`agent_message` 映射，写入会被显式拒绝——这条限制来自源码注释，不是文档承诺。

## 变化的意义与证据边界

### `qwen agents` 是新入口，但不管理 Subagent 定义

`packages/cli/src/config/config.ts` 在 `sessions` 之后注册 `agentsCommand`，并把 `agents` 加进“执行后直接退出”的子命令名单。`packages/cli/src/commands/agents.ts` 把它描述为 “Session agents: join a coordinator as a runtime”，带 `join` 与隐藏的 `session-send-mcp` 两个子命令。`agents-entry` 原文里“固定提交的文档未记载任何名为 `qwen agents` 的 CLI 子命令”这条缺口据此修订，并明确它与 `.qwen/agents/`、`/agents *` 那套 Subagent 定义入口不是同一机制。

证据只能到源码这一层：同提交的 `docs/users/features/sub-agents.md` 与 `multi-agent-coordination.md` 没有改动，也没有提到该命令。

### 宿主自己提供 `session_send` MCP server

方向与既有 MCP 章节相反：Qwen 不用 `settings.json` 的 `mcpServers` 连接它，而是自己起一个 `StdioServerTransport` 的 server（自报 `qwen-session`），只暴露 `session_send` 一个工具，把文本 POST 回 daemon。daemon 每次运行现场生成启动命令 `node <入口> agents session-send-mcp --url ENDPOINT`，令牌放子进程环境变量 `QWEN_SESSION_SEND_TOKEN`；Claude 适配器写临时 `mcp-config.json` 并用 `--mcp-config` 传入（刻意不加 `--strict-mcp-config`），Codex 适配器用 `-c mcp_servers.*` 覆盖。这些是 `mcp.entry` 与 `mcp.transport` 的新答案，未进入用户文档。

### 两个记忆 Agent 预算键的工作区作用域

`memory.agentTimeoutMinutes` 与 `memory.agentMaxTurns` 的设置描述与官方设置参考表现在都写明 “User/System/SystemDefaults scopes only; Workspace values are ignored with a warning”。两者本来就登记在 `settingsUtils.ts` 的 `WORKSPACE_RESTRICTED_SETTINGS` 里，因此这不是新限制而是首次被文档与 schema 讲清楚的既有行为；本轮把它写进 `config-overrides` 的“例外二”，并把该常量作为工作区受限键的单一事实源给出定位。

### 转录多出两类记录

`chatRecordingService.ts` 的 `ChatRecord` 闭集尾部新增 `agent_mention`、`agent_message`：都是 `type: 'user'` 记录，写进**主会话** transcript，`systemPayload` 分别是 `AgentMentionRecordPayload` / `AgentMessageRecordPayload`，Agent 侧写入时 `provenance` 为新增的 `external_agent`，并带持久化的幂等键 `externalRecordKey`（重复请求在重启后仍命中同一条记录）。它们不开启轮次、不参与自动标题、重建轮次边界时被排除；托管会话直接抛 `ManagedSessionRecordRefusedError`。文件格式本身没变（仍是 JSONL 追加 + `flush` fsync），`jsonl-utils.ts` 只是把读取预算的检查提前，读前 N 条会在达额时停止扫描。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_agents | qwen-code-cli-custom_agents-v3 | agents.entry：answered；agents.invocation：partial；agents.limits：partial | 新 edition，替换 v2 选择 |
| mcp | qwen-code-cli-mcp-v3 | mcp.entry：answered；mcp.transport：answered | 新 edition，替换 v2 选择 |
| configuration | qwen-code-cli-configuration-v3 | config.overrides：partial | 新 edition，替换 v2 选择 |
| local_transcripts | qwen-code-local_transcripts-v2 | transcripts.format：answered；transcripts.schema：partial | 新 edition，替换 v1 选择 |
| skills / custom_providers / hooks / native_plugins | 各自现行 edition | 本轮未调查 | 保留旧版本 |

**发布：** 无（worker 不发布、不切换指针；`registry/chapter-current.yaml` 在候选内指向四个新 edition）。**受管二进制：** 未触发。

## 待处理与独立复核

**审计记录：** `audits/qwen-code/audit-qwen-code-e4506f9b-447a-4c09-9f07-a4e955040fdb.yaml`（同目录同名 `.md`）。**待处理旧审计：** `audit-qwen-code-20261004t061205z`、`audit-qwen-code-0cd93675-58bd-4a50-a4da-f9619039fe0c`、`audit-qwen-code-20261006t134000z`，本轮未解决其跨主题 pending，故新审计保持 `review_status: pending`。**待复核问题：** 无——本轮结论是新增机制与既有机制的补充，没有来源冲突，也没有推翻已发布的配置步骤；会话记录的新增 subtype 不改变既有记录的读写路径。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-qwen-code-repo | `4bffa678bced8b14c25c85e3ba4226b7b752414d` → `29aef7de40b752bb0464919ab4af8f08a988dd31` | changed；665 个文件；`config.ts`、`settingsSchema.ts`、`chatRecordingService.ts`、`jsonl-utils.ts` 与新建的 `commands/agents/`、`serve/session-agents/` 命中已登记引用 |
| source-qwen-code-npm | `0.25.0@sha512-XlqtxN7…` → 同上 | unchanged |

## 验证与差异入口

```sh
pnpm maintenance:candidates check --candidate var/harness-monitor/run-20261009t020000z/batch/candidates/qwen-code
```

结果通过（`harness_id: qwen-code`）。本轮新增记录：`knowledge/qwen-code/references/ref-qwen-agents-*`、`ref-qwen-session-send-*`、`ref-qwen-settings-{memory-agent-*,workspace-restricted-list,agent-*,max-parallel-agents*}`、`ref-qwen-transcripts-{agent-record-*,external-record-*,turn-boundary-exclusion,jsonl-read-budget}`，配套 `snapshot-qwen-code-29aef7d-*` 与 `artifact-qwen-code-29aef7d-*`（全部 `kind: git_source_file`，只记 commit、相对路径与 `content_sha256`）。未运行：全库 `knowledge:validate`、`chapters:update`、publish 与受管二进制更新——按 worker 契约不在本任务内。
