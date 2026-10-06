---
schema_version: 3
record_kind: production
edition_id: autohand-local_transcripts-v1
harness_id: autohand
topic: local_transcripts
title: "Autohand Code CLI 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-message-record, ref-autohand-lt-user-assistant-append, ref-autohand-lt-tool-message-shape, ref-autohand-lt-stream-switch, ref-autohand-lt-transient-tool-chunk, ref-autohand-lt-ephemeral-flag, ref-autohand-lt-ephemeral-skips-sync, ref-autohand-lt-sync-message-shape, ref-autohand-lt-typed-history-entry, ref-autohand-lt-doc-typed-history]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-home-resolution, ref-autohand-lt-paths-under-home, ref-autohand-lt-session-id-and-index-files, ref-autohand-lt-create-session-metadata, ref-autohand-lt-branch-provenance, ref-autohand-lt-index-shape, ref-autohand-lt-conversation-append, ref-autohand-lt-append-context-fsync, ref-autohand-lt-atomic-write-json, ref-autohand-lt-file-lock, ref-autohand-lt-typed-history-write, ref-autohand-lt-typed-history-path, ref-autohand-lt-import-writes-session, ref-autohand-lt-doc-directory-structure, ref-autohand-lt-doc-home-override]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-metadata-required, ref-autohand-lt-usage-metadata, ref-autohand-lt-read-file-state, ref-autohand-lt-workspace-state, ref-autohand-lt-index-shape, ref-autohand-lt-message-record, ref-autohand-lt-tool-message-shape, ref-autohand-lt-typed-history-entry, ref-autohand-lt-transfer-shape]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-create-session-metadata, ref-autohand-lt-user-assistant-append, ref-autohand-lt-conversation-append, ref-autohand-lt-append-context-fsync, ref-autohand-lt-close-session, ref-autohand-lt-clear-closes-session, ref-autohand-lt-resume-command, ref-autohand-lt-load-session-files, ref-autohand-lt-fork-experimental-flag, ref-autohand-lt-branch-provenance, ref-autohand-lt-subagent-in-memory, ref-autohand-lt-compaction-prepares-request]
  - section_id: transcripts-index-and-project-state
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-index-shape, ref-autohand-lt-index-mutation-lock, ref-autohand-lt-index-metadata-lookup, ref-autohand-lt-corrupt-index-reset, ref-autohand-lt-resolve-reference, ref-autohand-lt-import-index-update, ref-autohand-lt-project-store, ref-autohand-lt-project-jsonl-logs]
  - section_id: transcripts-export-transfer-and-retention
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-json-export, ref-autohand-lt-export-filename, ref-autohand-lt-transfer-shape, ref-autohand-lt-transfer-limits, ref-autohand-lt-import-writes-session, ref-autohand-lt-doc-session-sync, ref-autohand-lt-index-read-lock-timeout, ref-autohand-lt-index-metadata-lookup, ref-autohand-lt-file-lock, ref-autohand-lt-corrupt-index-reset, ref-autohand-lt-clear-closes-session, ref-autohand-lt-conversation-append]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-lt-current-session-cmd, ref-autohand-lt-sessions-list-cmd, ref-autohand-lt-resume-first-message, ref-autohand-lt-resolve-reference, ref-autohand-lt-doc-session-management, ref-autohand-lt-corrupt-index-reset, ref-autohand-lt-conversation-append, ref-autohand-lt-transient-tool-chunk]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: answered
        source_refs: [ref-autohand-lt-message-record, ref-autohand-lt-user-assistant-append, ref-autohand-lt-tool-message-shape, ref-autohand-lt-stream-switch, ref-autohand-lt-transient-tool-chunk, ref-autohand-lt-ephemeral-flag, ref-autohand-lt-ephemeral-skips-sync, ref-autohand-lt-sync-message-shape, ref-autohand-lt-typed-history-entry, ref-autohand-lt-doc-typed-history]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-autohand-lt-home-resolution, ref-autohand-lt-paths-under-home, ref-autohand-lt-doc-directory-structure, ref-autohand-lt-doc-home-override, ref-autohand-lt-typed-history-path]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-autohand-lt-session-id-and-index-files, ref-autohand-lt-create-session-metadata, ref-autohand-lt-branch-provenance, ref-autohand-lt-index-shape, ref-autohand-lt-import-writes-session]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-autohand-lt-conversation-append, ref-autohand-lt-append-context-fsync, ref-autohand-lt-atomic-write-json, ref-autohand-lt-file-lock, ref-autohand-lt-typed-history-write]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-autohand-lt-metadata-required, ref-autohand-lt-usage-metadata, ref-autohand-lt-read-file-state, ref-autohand-lt-workspace-state, ref-autohand-lt-index-shape, ref-autohand-lt-message-record, ref-autohand-lt-tool-message-shape, ref-autohand-lt-typed-history-entry, ref-autohand-lt-transfer-shape]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-autohand-lt-create-session-metadata, ref-autohand-lt-user-assistant-append, ref-autohand-lt-conversation-append, ref-autohand-lt-append-context-fsync, ref-autohand-lt-close-session, ref-autohand-lt-clear-closes-session, ref-autohand-lt-resume-command, ref-autohand-lt-load-session-files, ref-autohand-lt-fork-experimental-flag, ref-autohand-lt-branch-provenance, ref-autohand-lt-subagent-in-memory, ref-autohand-lt-compaction-prepares-request]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-project-state
        status: partial
        source_refs: [ref-autohand-lt-index-shape, ref-autohand-lt-index-mutation-lock, ref-autohand-lt-index-metadata-lookup, ref-autohand-lt-corrupt-index-reset, ref-autohand-lt-import-index-update, ref-autohand-lt-project-store, ref-autohand-lt-project-jsonl-logs]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-transfer-and-retention
        status: answered
        source_refs: [ref-autohand-lt-json-export, ref-autohand-lt-export-filename, ref-autohand-lt-transfer-shape, ref-autohand-lt-transfer-limits, ref-autohand-lt-import-writes-session, ref-autohand-lt-doc-session-sync]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-transfer-and-retention
        status: partial
        source_refs: [ref-autohand-lt-index-read-lock-timeout, ref-autohand-lt-index-metadata-lookup, ref-autohand-lt-file-lock, ref-autohand-lt-corrupt-index-reset, ref-autohand-lt-clear-closes-session]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-autohand-lt-current-session-cmd, ref-autohand-lt-sessions-list-cmd, ref-autohand-lt-resume-first-message, ref-autohand-lt-resolve-reference, ref-autohand-lt-doc-session-management, ref-autohand-lt-corrupt-index-reset, ref-autohand-lt-conversation-append, ref-autohand-lt-transient-tool-chunk]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599`（`source-autohand-repo`，source-tree，`cli` 界面，linux），固定观察时间 `2026-10-06T06:20:00Z`；仓库内的 `docs/config-reference.md` 与 `README.md` 是同一 commit 的源码树文件，因此也按 `git_source_file` 引用。官方文档站（`docs.autohand.ai`）在本轮候选里没有留存原件，本章不引用 `archived_document`，涉及官方口径的结论一律降级或改用仓库内文档。

适用性说明：来源只把机制固定到源码提交，仓库 `package.json` 的版本号不构成机制归属，因此本章按来源级知识记录（`version_applicability: unknown`），不写 `mappings/`，也不把这里的结论外推到 npm 发行包或任何其它界面。本轮未执行真实 harness，未读取任何真实会话文件；所有结论来自源码与仓库文档阅读。

## 记录哪些内容、由什么开关控制 {#transcripts-recording-scope}

落盘的是会话消息流本身。`SessionMessage` 的 `role` 取 `user | assistant | tool | system`，必填 `content` 与 `timestamp`，可选 `toolCalls`、`name`、`tool_call_id` 与 `_meta`。[@ref-autohand-lt-message-record]

- 用户与助手消息在每轮结束时 `append` 进当前会话。[@ref-autohand-lt-user-assistant-append]
- 工具事件单独成条，带工具名与 `tool_call_id`，用于把工具结果挂回对应的工具调用。[@ref-autohand-lt-tool-message-shape]
- 工具输出的**流式分片**是独立开关：只有 `AUTOHAND_STREAM_TOOL_OUTPUT=1` 时才把 stdout/stderr 分片按 `appendTransient` 追加进同一个 `conversation.jsonl`（分片来源记在 `_meta.stream`），且这条路径不更新 `metadata.json`；未设置该变量时分片不落盘。[@ref-autohand-lt-stream-switch][@ref-autohand-lt-transient-tool-chunk]
- `--ephemeral` 让整轮运行不进入会话历史：不建会话文件、不做 auto-memory、不做 session sync；它与 `--resume`/`--fork` 互斥，因为这种运行没有会话可延续。[@ref-autohand-lt-ephemeral-flag][@ref-autohand-lt-ephemeral-skips-sync]
- 离开本机的会话同步只发送压缩后的消息：每条被压成 `role`、`content`、`timestamp` 三个字段，`toolCalls`、`name`、`_meta` 不在同步载荷里。[@ref-autohand-lt-sync-message-shape]
- 另有一份与正文无关的**输入历史**：`/whatityped` 使用的最近 200 条提交记录，条目含 `id`、`text`、`cwd`、`createdAt`，可带 peer 引用元数据，落在 `typed-message-history.json`。仓库文档说明它从你开始用该功能后才记录。[@ref-autohand-lt-typed-history-entry][@ref-autohand-lt-doc-typed-history]

本章只覆盖会话记录及其维持所需的存储依赖。`AUTOHAND_HOME` 下还有 `error.log`、`telemetry/`、MCP 缓存等目录，本章不逐项审计。[@ref-autohand-lt-doc-directory-structure]

已查入口与剩余缺口：`src/session/`、`src/core/agent/` 下的落盘调用点、`src/index.ts` 的根命令选项、`src/i18n/locales/en.json` 的命令文案。缺口是**图片与附件在原生会话正文中的最终表达没有固定**：本 commit 里只有跨客户端传输的导入路径给出 `attachmentNames` 字段，原生会话如何持久化图片字节未在来源中确定，因此不推断正文里存的是内联 base64 还是外部文件。

## 存储位置、命名与格式 {#transcripts-storage-layout}

**根目录**由 `resolveAutohandHome()` 决定：优先取环境变量 `AUTOHAND_HOME`（Windows 下拒绝指向 `\Windows\` 的取值），否则非 Windows 平台取 `[home]/.autohand`；Windows 在未设变量时依次尝试 `USERPROFILE`、`HOMEDRIVE`+`HOMEPATH`、由 `LOCALAPPDATA`/`APPDATA` 反推的 home。[@ref-autohand-lt-home-resolution] 仓库文档把同一结论写成“数据在 `~/.autohand/`，可用 `AUTOHAND_HOME` 覆盖”。[@ref-autohand-lt-doc-home-override][@ref-autohand-lt-doc-directory-structure] 环境变量与配置层的介入时机属于配置主题的 `config.overrides`，本章不重复。

会话数据目录是 `$AUTOHAND_HOME/sessions`，同级还有 `active-agents/`（活动会话心跳）与 `projects/`（项目知识库）。[@ref-autohand-lt-paths-under-home]

**命名**：

- 会话 id 为 `[uuid]-[Date.now() 毫秒时间戳]`，会话目录名即该 id；目录内固定三个文件名：`metadata.json`、`conversation.jsonl`、`state.json`；索引文件是 `sessions/index.json`，锁文件是 `sessions/index.json.lock`。[@ref-autohand-lt-session-id-and-index-files]
- `metadata.json` 把工作区记成 `path.resolve` 后的绝对 `projectPath` 与取 basename 的 `projectName`，并记录模型、消息计数、状态与发起客户端（`AUTOHAND_CLIENT_NAME`，默认 `terminal`）。[@ref-autohand-lt-create-session-metadata]
- 索引的 `byProject` 以该绝对路径为键，所以**项目作用域体现在索引分组上，会话目录本身不按项目分层**。[@ref-autohand-lt-index-shape]
- 父子关系不靠目录嵌套，而是靠新会话目录里的 `branch` 溯源块：`type`（`fork`/`clone`）、`sourceSessionId`、`sourceMessageIndex`、`sourceUserMessageOrdinal`、`createdAt`。[@ref-autohand-lt-branch-provenance]
- 传输导入的会话目录 id 形如 `web-[transfer-id]`，与其原生 id 规则不同。[@ref-autohand-lt-import-writes-session]
- 输入历史是单个文件 `$AUTOHAND_HOME/typed-message-history.json`，不是目录。[@ref-autohand-lt-typed-history-path]

```text
$AUTOHAND_HOME/sessions/
├── index.json                 # 会话元数据目录（不含正文）
├── index.json.lock            # 多进程写锁
└── [uuid]-[epoch-ms]/         # 一个会话一个目录
    ├── metadata.json          # 原子覆盖写
    ├── conversation.jsonl     # 追加写，一行一条消息
    └── state.json             # 分支创建时写入
```

**格式**：正文是 JSONL，每行一个 `JSON.stringify(message)`，`appendFile` 追加，读取时按行 `JSON.parse`，无法解析的行在部分读取路径被跳过。[@ref-autohand-lt-conversation-append][@ref-autohand-lt-resume-first-message] `metadata.json` 与 `index.json` 走 `atomicWriteJson`（临时文件 + 落盘 + rename），因此这两个文件是整文件覆盖而非追加。[@ref-autohand-lt-atomic-write-json] 上下文注入类记录（peer 引用）用 `0o600` 打开文件、`writeFile` 后 `sync()` 刷盘，并按 `recordId` 去重。[@ref-autohand-lt-append-context-fsync] 跨进程写入用锁文件串行化，索引的读改写在锁内完成。[@ref-autohand-lt-file-lock] 输入历史同样在锁内原子覆盖写，条目按时间倒序合并后截断到 200 条。[@ref-autohand-lt-typed-history-write]

本 commit 里没有分片、压缩或二进制容器：没有滚动切割，也没有 gzip 之类的落盘压缩。剩余缺口是**文件权限默认值没有固定**——只有上下文注入路径显式写 `0o600`，普通 `appendFile` 未显式指定 mode，实际权限取决于进程 umask，来源中查不到承诺值。

## 记录类型与字段 {#transcripts-record-schema}

会话目录里有三类第一方结构，都在 `src/session/types.ts` 中声明：

- `metadata.json` → `SessionMetadata`。必填 `sessionId`、`createdAt`、`lastActiveAt`、`projectPath`、`projectName`、`model`、`messageCount`、`status`（`active | completed | crashed`）；可选 `closedAt`、`summary`、`title`、`titleSource`、`type`、`usage`、`automodePrompt`、`automodeIterations`、`client`、`clientVersion`、`importedFrom`、`branch`、`readFileState`。[@ref-autohand-lt-metadata-required]
- 累计用量 `usage` 挂在 metadata 上，含 `totalTokens`、`turnCount`、`tokenUsageStatus`（`actual | unavailable`）等；provider 没有报缓存数字时字段缺省而不是记 0，因为 0 会被读成“每次请求都没命中缓存”这一未经测量的断言。[@ref-autohand-lt-usage-metadata]
- 实验性的读取跟踪 `readFileState` 自带 `schemaVersion: 1`，逐文件记录大小/mtime/ctime、覆盖行区间、sha256 与是否完整。[@ref-autohand-lt-read-file-state]
- `state.json` → `WorkspaceState`：`workspaceRoot`、`workspaceFiles`、`contextUsed`、`contextLimit`，可选 `gitStatus`。[@ref-autohand-lt-workspace-state]
- `index.json` → `SessionIndex`：`sessions[]` 每项含 `id`、`projectPath`、`createdAt`，可选 `summary`、`title`、`importedFrom`、`branch`；外加 `byProject` 路径到 id 数组的映射。[@ref-autohand-lt-index-shape]
- `conversation.jsonl` 每行是 `SessionMessage`；工具事件额外带 `name` 与 `tool_call_id`，流式分片在 `_meta.stream`。[@ref-autohand-lt-message-record][@ref-autohand-lt-tool-message-shape]
- 输入历史条目是 `{ id, text, cwd, createdAt }` 加可选 peer 引用元数据。[@ref-autohand-lt-typed-history-entry]
- 跨客户端传输快照是独立类型 `SessionTransfer`，字段固定为 `version`、`source`、`sourceSessionId`、`title`、`createdAt`、`provider`、`model`、`messages`、`repository`，声明为无凭据快照。[@ref-autohand-lt-transfer-shape]

脱敏后的最小示例（按上述类型构造，非真实文件内容）：

```jsonl
{"role":"user","content":"[用户输入，已脱敏]","timestamp":"2026-01-01T00:00:00.000Z"}
{"role":"assistant","content":"[助手回复，已脱敏]","timestamp":"2026-01-01T00:00:01.000Z","toolCalls":[]}
{"role":"tool","content":"[工具输出，已脱敏]","timestamp":"2026-01-01T00:00:02.000Z","name":"read_file","tool_call_id":"[占位]"}
```

```json
{
  "sessionId": "[uuid]-[epoch-ms]",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "lastActiveAt": "2026-01-01T00:00:03.000Z",
  "projectPath": "[工作区绝对路径]",
  "projectName": "[工作区目录名]",
  "model": "[模型标识]",
  "messageCount": 3,
  "status": "active"
}
```

**仍缺的具体 schema 缺口**（这一题因此记 `partial`）：

1. `conversation.jsonl` 的记录没有版本字段，来源中也没有针对它的迁移或兼容解析代码；旧记录能否被后续实现继续读取，本 commit 未固定。
2. `SessionMessage.toolCalls` 声明为 `any[]`，工具调用结构没有第一方类型定义。
3. `metadata.json` 同样没有版本字段；只有 `index.json` 有结构校验（`isSessionIndex`），校验失败即重置而不是迁移。
4. 带版本的只有 `readFileState`（`schemaVersion: 1`）和传输快照（`version: 1 | 2`，解析时显式接受 v1）；后者是导入格式，不能当作本地会话格式的版本契约。
5. 图片与附件在原生会话记录中的表达未固定（见上一节缺口）。

## 创建、追加、关闭、恢复与分支 {#transcripts-lifecycle}

- **创建**：`createSession` 生成 id、建会话目录、组装 `metadata`（含创建时间、解析后的工作区路径、模型、空消息计数、`status: active`），保存后登记进索引。[@ref-autohand-lt-create-session-metadata]
- **追加与刷盘**：每条用户/助手消息走 `append`——追加一行 JSONL 后重写 `metadata.json`（更新 `messageCount` 与 `lastActiveAt`）。[@ref-autohand-lt-user-assistant-append][@ref-autohand-lt-conversation-append] peer 引用这类上下文注入单独走 `appendContext`，带 `fsync`。[@ref-autohand-lt-append-context-fsync]
- **关闭**：`closeSession` 写 `closedAt`、把 `status` 置为 `completed`，可选写入 `summary`，然后更新索引。[@ref-autohand-lt-close-session] `/clear` 的顺序是：先关当前会话、再重置上下文、然后在同一工作区新建一个会话——旧会话目录保留，不做删除。[@ref-autohand-lt-clear-closes-session]
- **恢复**：`autohand resume [reference]` 接受完整 ID、唯一 ID 前缀、已保存名称、会话目录或文件路径；`--last` 取最近活跃的会话，`--all` 跨项目，否则打开交互选择器。`load()` 只读两个文件：逐行解析 `conversation.jsonl` 得到消息，存在则读 `state.json` 得到工作区状态。[@ref-autohand-lt-resume-command][@ref-autohand-lt-load-session-files]
- **分支**：`/fork`、`/clone`、`/tree` 在本 commit 仍受实验开关约束（`experimental_fork`、`experimental_clone`），未开启时命令直接返回提示而不写入任何文件。[@ref-autohand-lt-fork-experimental-flag] 分支创建会复制源会话选中的消息到**新目录**，把来源写进 `branch` 溯源块；`clone` 复制全部消息，`fork` 复制到第 N 条用户消息为止。[@ref-autohand-lt-branch-provenance]
- **交给子代理**：子代理使用自己的内存 `ConversationManager`，不写会话文件；父会话里留下的是子代理返回后由父流程追加的记录。[@ref-autohand-lt-subagent-in-memory] 子代理定义与调用入口属于 custom agents 主题（`agents.invocation`）。
- **压缩后延续**：auto-compaction 由上下文编排器为“这一次请求”产出裁剪后的消息列表与摘要，摘要只保留在当次上下文里，日志只报告“压缩了 N 条消息、摘要保留在上下文中”。[@ref-autohand-lt-compaction-prepares-request] 在本 commit 的源码中，会话正文的整体重写（`replaceMessages`）只出现在分支创建路径上，因此压缩不会回写 `conversation.jsonl`；会话在压缩后仍沿用同一文件继续追加。这是对该提交源码的观察，不是对后续版本的断言。

## 索引与项目派生状态如何分工 {#transcripts-index-and-project-state}

会话子系统**不使用数据库**：正文、状态、元数据、目录索引都是文件，没有表、没有 SQL、没有独立的 schema 版本层。[@ref-autohand-lt-index-shape]

`index.json` 是**元数据目录而不是正文**：它只保存 `id`、工作区路径、创建时间、摘要、标题、导入与分支溯源，以及 `byProject` 分组。[@ref-autohand-lt-index-shape] 写入方式是“进锁 → 重新读最新索引 → 修改 → 原子写回”，所以多个 Autohand 进程不会互相覆盖对方的条目。[@ref-autohand-lt-index-mutation-lock]

恢复一个会话所必需的文件是会话目录里的 `metadata.json` 与 `conversation.jsonl`；`state.json` 是可选项，只有 `load()` 发现它存在时才读入。[@ref-autohand-lt-load-session-files]

索引与正文**不做级联维护**：

- 列出会话时，索引里某个 id 若已没有 `metadata.json`，这一行会被跳过而不是报错，列表仍然可用。[@ref-autohand-lt-index-metadata-lookup]
- 索引条目从会话目录删除后不会自动清理，`byProject` 里会留下悬挂 id；来源中没有回填或清理路径。[@ref-autohand-lt-index-metadata-lookup]
- 索引**不能从会话目录重建**：来源中没有扫描 `sessions/` 目录回填 `index.json` 的代码路径。`index.json` 结构非法时，代码会先把原文件复制成 `index.json.corrupt-[时间戳]-[uuid]` 备份，再写入空索引并打印告警；此后旧会话仍可按完整 ID 或目录路径直接加载，但不会出现在按索引构建的列表里。[@ref-autohand-lt-corrupt-index-reset][@ref-autohand-lt-resolve-reference]
- 传输导入是唯一一处会话目录与索引同时落盘的写入者，它在写完会话目录后补登记索引条目。[@ref-autohand-lt-import-index-update]

项目级派生状态另有一套文件，位于 `projects/[工作区路径哈希]/`：`index.json`（项目索引）、`failures.jsonl`、`successes.jsonl` 与 `knowledge.json`。它由 `ProjectManager` 按路径哈希建目录并首次初始化，属于知识库而不是会话正文，恢复会话不依赖它。[@ref-autohand-lt-project-store][@ref-autohand-lt-project-jsonl-logs]

这一题记 `partial`：**已证实的必需文件与分工如上，缺口是没有来源能固定“索引可重建”的办法**——来源只给出损坏后的备份与重置，没有重建；也未固定 `state.json` 在恢复后的语义（它记录的是分支创建时的工作区状态，不是运行日志）。

## 导出、跨客户端传输与保留 {#transcripts-export-transfer-and-retention}

**导出**：`/export` 把当前会话（或选择的历史会话）导出为单文件 Markdown、JSON 或 HTML。JSON 形态是 `{ metadata, messages, exportedAt, version: "1.0" }`；建议文件名是 `[项目名 slug]-[YYYY-MM-DD]-[会话 id 前 8 位].[格式]`。[@ref-autohand-lt-json-export][@ref-autohand-lt-export-filename] 导出是**阅读用快照而不是可恢复归档**：它不含 `state.json`、不含 `readFileState`，也不含 `index.json` 条目；把它放回 `sessions/` 目录不会自动恢复出一个可继续的会话。

**跨客户端传输**是另一条独立通道：传递的是无凭据的会话快照，字段与上限都在来源中写死——消息数 1 到 500 条、整体 8 MB、每条最多 4 张图、单图不超过 1 MB，且解析器“宁可整体拒绝也不截断”，以免把不完整交接当成完整交接。[@ref-autohand-lt-transfer-shape][@ref-autohand-lt-transfer-limits] 导入端把快照写成一个新会话目录（id 形如 `web-[transfer-id]`，`status` 直接置 `completed`），并补登记索引；同一个 transfer 重复导入是幂等的，导入的内容不会被当作指令执行。[@ref-autohand-lt-import-writes-session][@ref-autohand-lt-import-index-update]

**云端副本**与本地记录是两条线：登录用户的设置同步默认包含 `sessions/`，可用 `--sync-settings=false` 或配置里的 `sync.enabled` 关闭。[@ref-autohand-lt-doc-session-sync] 因此判断“某段对话还在不在”时，本地目录与账户侧不是同一份事实。

**保留与删除**：本轮在会话子系统、`src/commands/` 全目录、`src/i18n/locales/en.json` 命令文案、README 与 `docs/config-reference.md` 中检索“删除/保留/过期”相关入口，**没有找到官方的会话删除命令、保留期配置或自动清理策略**。`/clear` 只关会话并新建，旧目录仍在。[@ref-autohand-lt-clear-closes-session]因此这一题只能给 `partial`，并且不能把“没找到删除机制”读成“可以安全删除”。

手动删除的已知后果，全部来自源码可证的部分：

- 删除会话目录后，索引里的条目不会级联删除；`metadata.json` 缺失时该条目在列表中被跳过，`byProject` 留下悬挂 id。[@ref-autohand-lt-index-metadata-lookup]
- 只删 `conversation.jsonl` 而保留 `metadata.json`，索引仍会列出该会话，`messageCount` 也不会被修正，加载时得到空消息列表而不是报错。[@ref-autohand-lt-conversation-append]
- 删除前必须先停掉写入者：索引写入在 `index.json.lock` 内完成，别的进程持锁时读取会退化为“用上一次已提交的索引”并打印一次告警；会话目录内的 `metadata.json` 由原子写保护，但被删掉的目录不会被任何进程重建。[@ref-autohand-lt-index-read-lock-timeout][@ref-autohand-lt-file-lock]
- 删除 `index.json` 会让列表回到空索引，但会话目录仍在，可按完整 ID 或路径重新加载；这与“索引损坏被重置”是同一条恢复路径的两种触发方式。[@ref-autohand-lt-corrupt-index-reset]

缺口：来源没有固定删除后重建（rehydrate）索引的做法，也没有固定 `AUTOHAND_HOME` 下会话数据的总量上限或保留策略。

## 定位、读取与排错 {#transcripts-diagnostics}

- `/session` 打印当前会话的 ID、名称、工作区、模型、消息数与开始时间——这是确认“我刚才那次运行落在哪个会话”的第一步。[@ref-autohand-lt-current-session-cmd]
- `/sessions` 从索引列出会话（表格最多显示 20 条，其余只提示还有多少条），并提示用 `/resume [id]` 继续。[@ref-autohand-lt-sessions-list-cmd]
- 交互式恢复选择器会**直接读** `$AUTOHAND_HOME/sessions/[id]/conversation.jsonl` 的第一条 `user` 消息作为标题候选，解析失败的行被跳过；源码特意不经过 `loadSession()`，以免读取动作改写“当前会话”这一进程状态。[@ref-autohand-lt-resume-first-message]
- 引用解析顺序是：把输入当路径（存在且含 `metadata.json` 就取其中的 `sessionId`）→ 当作会话目录名 → 已保存名称 → ID 前缀。名称或前缀命中多条时报错并列出候选 ID 前 8 位。[@ref-autohand-lt-resolve-reference] 排错时用完整 ID 或直接给目录路径可以绕过歧义。
- 索引损坏时控制台会打印“索引已损坏并被重置”的告警和备份文件路径，备份留在 `sessions/` 目录内，可据此找回原索引。[@ref-autohand-lt-corrupt-index-reset]
- 文档给出的日常入口是 `autohand resume`、`autohand resume --last`、`--all` 与 `autohand resume [会话引用]`。[@ref-autohand-lt-doc-session-management]

手工核对记录完整性时的注意点：`metadata.json` 的 `messageCount` 只在 `append` 路径上更新，而 `appendTransient`（工具输出流式分片）不计数，所以开启 `AUTOHAND_STREAM_TOOL_OUTPUT=1` 后 `conversation.jsonl` 的行数会大于 `messageCount`，这不一定是损坏。[@ref-autohand-lt-conversation-append][@ref-autohand-lt-transient-tool-chunk]

缺口：来源中**没有**官方完整性校验命令，也没有对 `messageCount` 与实际行数不一致的告警；判断一个会话文件是否可恢复，目前只能靠上面这些读取入口加上人工比对。
