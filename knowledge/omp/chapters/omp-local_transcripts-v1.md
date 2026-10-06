---
schema_version: 3
record_kind: production
edition_id: omp-local_transcripts-v1
harness_id: omp
topic: local_transcripts
title: Oh My Pi 本地 Transcript：JSONL 会话树、blob 附件与 history.db 索引
sections:
- section_id: transcripts-scope
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-entry-scope-cli-session-flags
  - ref-omp-lt-storage-jsonl-title-slot
  - ref-omp-lt-format-entry-taxonomy
  - ref-omp-lt-format-persisted-roles-conversation
  - ref-omp-lt-format-persisted-roles-tui
  - ref-omp-lt-format-reconstructed-roles
  - ref-omp-lt-format-model-usage-outside-transcript
  - ref-omp-lt-format-reset-boundary
  - ref-omp-lt-storage-size-controls-blobs
  - ref-omp-lt-lifecycle-in-memory-mode
  - ref-omp-lt-diagnostics-history-storage-scope
  - ref-omp-lt-lifecycle-clear-retains-file
- section_id: transcripts-storage-layout
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-storage-layout-default
  - ref-omp-lt-storage-cwd-bucket
  - ref-omp-lt-storage-dir-name-resolution-code
  - ref-omp-lt-storage-dir-name-scope-code
  - ref-omp-lt-storage-legacy-abs-dir-name-code
  - ref-omp-lt-storage-sessions-blobs-dir-code
  - ref-omp-lt-storage-layout-blobs-breadcrumb
  - ref-omp-lt-storage-terminal-and-marker-dirs-code
  - ref-omp-lt-storage-session-owners-dir-code
  - ref-omp-lt-storage-agent-root-dirs-code
  - ref-omp-lt-storage-artifacts-dir-code
  - ref-omp-lt-storage-abstractions
  - ref-omp-lt-entry-scope-cli-session-flags
  - ref-omp-lt-format-file-name-code
  - ref-omp-lt-format-header-notes
  - ref-omp-lt-lifecycle-tree-leaf
  - ref-omp-lt-storage-jsonl-title-slot
  - ref-omp-lt-storage-size-controls-blobs
- section_id: transcripts-schema-lifecycle
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-format-header-example
  - ref-omp-lt-format-header-notes
  - ref-omp-lt-format-entry-base
  - ref-omp-lt-schema-versioning-migration
  - ref-omp-lt-schema-migration-trigger
  - ref-omp-lt-lifecycle-load-behavior
  - ref-omp-lt-lifecycle-set-session-file
  - ref-omp-lt-lifecycle-tree-leaf
  - ref-omp-lt-format-file-name-code
  - ref-omp-lt-lifecycle-persist-vs-memory
  - ref-omp-lt-lifecycle-lazy-persistence-gate
  - ref-omp-lt-lifecycle-error-behavior
  - ref-omp-lt-lifecycle-clear-retains-file
  - ref-omp-lt-format-reset-boundary
  - ref-omp-lt-lifecycle-breadcrumb-root-code
  - ref-omp-lt-format-entry-taxonomy
  - ref-omp-lt-format-persisted-roles-conversation
  - ref-omp-lt-format-persisted-roles-tui
  - ref-omp-lt-format-reconstructed-roles
  - ref-omp-lt-lifecycle-in-memory-mode
- section_id: transcripts-database
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-database-history-db-path-code
  - ref-omp-lt-database-history-table-ddl-code
  - ref-omp-lt-database-history-fts-code
  - ref-omp-lt-database-index-tables-doc
  - ref-omp-lt-database-index-ddl-code
  - ref-omp-lt-diagnostics-history-storage-scope
  - ref-omp-lt-diagnostics-history-storage-boundary
- section_id: transcripts-cleanup-archive
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-cleanup-manual-maintenance
  - ref-omp-lt-cleanup-gc-phase-flags-code
  - ref-omp-lt-cleanup-gc-retention-flags-code
  - ref-omp-lt-cleanup-gc-settings-code
  - ref-omp-lt-cleanup-gc-stale-settings-code
  - ref-omp-lt-cleanup-gc-run-order-code
  - ref-omp-lt-cleanup-archive-dir-code
  - ref-omp-lt-cleanup-archive-gate-code
  - ref-omp-lt-cleanup-archive-age-code
  - ref-omp-lt-cleanup-stale-markers-code
  - ref-omp-lt-cleanup-stale-collab-code
  - ref-omp-lt-cleanup-delete-command
  - ref-omp-lt-cleanup-delete-not-erasure-boundary
  - ref-omp-lt-cleanup-delete-session-code
  - ref-omp-lt-cleanup-delete-backup-code
  - ref-omp-lt-cleanup-picker-delete
  - ref-omp-lt-diagnostics-continue-fallback
  - ref-omp-lt-diagnostics-gc-report-code
  - ref-omp-lt-entry-scope-cli-session-flags
  - ref-omp-lt-format-header-notes
  - ref-omp-lt-storage-session-owners-dir-code
- section_id: transcripts-diagnostics
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-diagnostics-discovery-utilities
  - ref-omp-lt-diagnostics-continue-order
  - ref-omp-lt-diagnostics-continue-fallback
  - ref-omp-lt-lifecycle-breadcrumb-root-code
  - ref-omp-lt-diagnostics-missing-invalid-header
  - ref-omp-lt-diagnostics-gc-report-code
  - ref-omp-lt-cleanup-gc-run-order-code
  - ref-omp-lt-diagnostics-history-storage-boundary
  - ref-omp-lt-lifecycle-error-behavior
  - ref-omp-lt-storage-agent-root-dirs-code
  - ref-omp-lt-storage-layout-default
questions:
- question_id: transcripts.scope
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-scope
    status: answered
    source_refs:
    - ref-omp-lt-entry-scope-cli-session-flags
    - ref-omp-lt-storage-jsonl-title-slot
    - ref-omp-lt-format-entry-taxonomy
    - ref-omp-lt-format-persisted-roles-conversation
    - ref-omp-lt-format-persisted-roles-tui
    - ref-omp-lt-format-reconstructed-roles
    - ref-omp-lt-format-model-usage-outside-transcript
    - ref-omp-lt-format-reset-boundary
    - ref-omp-lt-storage-size-controls-blobs
- question_id: transcripts.location
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-omp-lt-storage-layout-default
    - ref-omp-lt-storage-cwd-bucket
    - ref-omp-lt-storage-sessions-blobs-dir-code
    - ref-omp-lt-storage-layout-blobs-breadcrumb
    - ref-omp-lt-storage-terminal-and-marker-dirs-code
    - ref-omp-lt-storage-agent-root-dirs-code
    - ref-omp-lt-storage-session-owners-dir-code
- question_id: transcripts.naming
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-omp-lt-storage-layout-default
    - ref-omp-lt-storage-cwd-bucket
    - ref-omp-lt-storage-dir-name-resolution-code
    - ref-omp-lt-storage-dir-name-scope-code
    - ref-omp-lt-storage-legacy-abs-dir-name-code
    - ref-omp-lt-storage-artifacts-dir-code
    - ref-omp-lt-format-file-name-code
    - ref-omp-lt-format-header-notes
    - ref-omp-lt-lifecycle-tree-leaf
- question_id: transcripts.format
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-omp-lt-storage-jsonl-title-slot
    - ref-omp-lt-storage-artifacts-dir-code
    - ref-omp-lt-storage-sessions-blobs-dir-code
    - ref-omp-lt-storage-abstractions
    - ref-omp-lt-storage-size-controls-blobs
- question_id: transcripts.schema
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-schema-lifecycle
    status: answered
    source_refs:
    - ref-omp-lt-format-header-example
    - ref-omp-lt-format-header-notes
    - ref-omp-lt-format-entry-base
    - ref-omp-lt-format-entry-taxonomy
    - ref-omp-lt-format-persisted-roles-conversation
    - ref-omp-lt-format-persisted-roles-tui
    - ref-omp-lt-format-reconstructed-roles
    - ref-omp-lt-schema-versioning-migration
    - ref-omp-lt-schema-migration-trigger
- question_id: transcripts.lifecycle
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-schema-lifecycle
    status: answered
    source_refs:
    - ref-omp-lt-lifecycle-persist-vs-memory
    - ref-omp-lt-lifecycle-lazy-persistence-gate
    - ref-omp-lt-lifecycle-tree-leaf
    - ref-omp-lt-lifecycle-load-behavior
    - ref-omp-lt-lifecycle-set-session-file
    - ref-omp-lt-lifecycle-error-behavior
    - ref-omp-lt-lifecycle-clear-retains-file
    - ref-omp-lt-lifecycle-in-memory-mode
- question_id: transcripts.database
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-database
    status: answered
    source_refs:
    - ref-omp-lt-database-history-db-path-code
    - ref-omp-lt-database-history-table-ddl-code
    - ref-omp-lt-database-history-fts-code
    - ref-omp-lt-database-index-tables-doc
    - ref-omp-lt-database-index-ddl-code
    - ref-omp-lt-diagnostics-history-storage-scope
    - ref-omp-lt-diagnostics-history-storage-boundary
- question_id: transcripts.archive
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-cleanup-archive
    status: partial
    source_refs:
    - ref-omp-lt-cleanup-archive-dir-code
    - ref-omp-lt-cleanup-archive-gate-code
    - ref-omp-lt-cleanup-archive-age-code
    - ref-omp-lt-cleanup-gc-run-order-code
    - ref-omp-lt-cleanup-gc-phase-flags-code
    - ref-omp-lt-entry-scope-cli-session-flags
- question_id: transcripts.cleanup
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-cleanup-archive
    status: partial
    source_refs:
    - ref-omp-lt-cleanup-manual-maintenance
    - ref-omp-lt-cleanup-gc-settings-code
    - ref-omp-lt-cleanup-gc-stale-settings-code
    - ref-omp-lt-cleanup-stale-markers-code
    - ref-omp-lt-cleanup-stale-collab-code
    - ref-omp-lt-cleanup-delete-command
    - ref-omp-lt-cleanup-delete-not-erasure-boundary
    - ref-omp-lt-cleanup-delete-session-code
    - ref-omp-lt-cleanup-delete-backup-code
    - ref-omp-lt-cleanup-picker-delete
    - ref-omp-lt-cleanup-gc-retention-flags-code
- question_id: transcripts.diagnostics
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-diagnostics
    status: answered
    source_refs:
    - ref-omp-lt-diagnostics-discovery-utilities
    - ref-omp-lt-diagnostics-continue-order
    - ref-omp-lt-diagnostics-continue-fallback
    - ref-omp-lt-lifecycle-breadcrumb-root-code
    - ref-omp-lt-diagnostics-missing-invalid-header
    - ref-omp-lt-diagnostics-gc-report-code
    - ref-omp-lt-diagnostics-history-storage-boundary
---

## 固定来源与记录范围 {#transcripts-scope}

本章只覆盖 CLI 界面（catalog `surface_id: cli`）。全部结论来自官方仓库 `can1357/oh-my-pi` 在固定 commit `fc6c0c90dab012a0b7edea731af92f5bbd09cff0` 的源码树与随仓文档，对应本轮候选里的 `snapshot-omp-lt-repo-fc6c-*`（`source_id: source-omp-repo`，`distribution: source-tree`，`os: linux`，`arch: x64`，`source_fetched_at: 2026-10-06T05:20:00Z`）。这个 commit 只代表源码树，不代表任何已发布二进制或 npm 包版本的行为；本章不写发行版本映射，`source-omp-npm` 上观察到的 18.6.1 本轮没有取到对应的会话记录文件。

一句话概括记录形态：**会话正文是每个会话一个 JSONL 文件，存在按 cwd 分桶的目录下，附件（大图、base64 载荷）外置到内容寻址的 blob store，标题与 prompt 历史另存一个 `history.db`** [@ref-omp-lt-storage-jsonl-title-slot]。

落盘的内容与不落盘的内容：

- **会话正文与工具事件同文件**。`message` 条目里，assistant 轮的 tool call 以 `{ "type": "toolCall" }` 块留在 `content` 中，工具结果以独立 `toolResult` 角色配 `toolCallId`/`toolName`；此外还有 `bashExecution`、`pythonExecution`、`hookMessage`、`fileMention` 等 TUI 侧角色 [@ref-omp-lt-format-persisted-roles-conversation][@ref-omp-lt-format-persisted-roles-tui]。也就是说工具调用与对话文本在同一条记录里，不需要另找日志。
- **非对话的会话内状态也写进同一个 JSONL**。`SessionEntry` 联合类型含 `message`、`model_usage`、`thinking_level_change`、`model_change`、`service_tier_change`、`compaction`、`branch_summary`、`reset_boundary`、`custom`、`custom_message`、`label`、`title_change`、`ttsr_injection`、`credential_pin`、`session_init`、`mode_change` [@ref-omp-lt-format-entry-taxonomy]。模型选择、思考档位、标签、重命名审计、ttsr 注入都在同一棵树里。
- **`model_usage` 不进对话**。它记录 transcript 之外的模型调用（`purpose`/`api`/`provider`/`model`/`usage`/`stopReason`/可选 `errorMessage`），只参与用量统计 [@ref-omp-lt-format-model-usage-outside-transcript]。
- **重建角色不等于持久化角色**。`branch_summary`、`compaction`、`custom_message` 在上下文重建时分别合成为 `branchSummary`、`compactionSummary`、`custom`；文档明确要求读者按 `entry.type` 判别而不是按重建角色反推持久化形态 [@ref-omp-lt-format-reconstructed-roles]。
- **`/clear` 不删历史**。它追加一个无载荷的 `reset_boundary`，压缩后的实时 transcript 与重建的模型上下文从最后一个边界之后开始，而 full-history transcript 导出仍保留边界之前的条目 [@ref-omp-lt-format-reset-boundary][@ref-omp-lt-lifecycle-clear-retains-file]。
- **落盘前有投影，不是原样写入**。超过 500,000 字符的字符串被截断成 `"[Session persistence truncated large content]"`（部分 provider 签名/回放载体除外），瞬态 `jsonlEvents` 被移除，`image_url` 里的图片 data URL 一律内容寻址外置并替换为 `blob:sha256:[hash]`，≥1,024 字符的 base64 载荷在图像内容块、`images[]`、snapcompact `frames[]` 与图像生成结果里外置 [@ref-omp-lt-storage-size-controls-blobs]。投影不动内存中的活条目，加载时普通图片引用会被还原为内联载荷。
- **`--no-session` 完全不落盘**。`--session-dir`/`--session` 指定非默认目录，`--continue`/`--resume`/`--fork`/外部会话导入都需要持久化，与 `--no-session` 互斥 [@ref-omp-lt-entry-scope-cli-session-flags]；`SessionManager.inMemory()` 下会话没有文件路径，`/export` 报 `Cannot export in-memory session to HTML`，`/fork` 失败，只有 `/dump` 与 `/share` 仍可用 [@ref-omp-lt-lifecycle-in-memory-mode]。

**Prompt 输入历史不在这个 JSONL 里**：`HistoryStorage` 是独立的 SQLite 子系统，文档明确它不是会话回放 [@ref-omp-lt-diagnostics-history-storage-scope]，详见下文数据库小节。

## 存储位置、命名与格式 {#transcripts-storage-layout}

### 路径与它随什么变化

默认布局 [@ref-omp-lt-storage-layout-default]：

```text
~/.omp/agent/sessions/[encoded-cwd]/[timestamp]_[sessionId].jsonl
~/.omp/agent/blobs/[sha256]
~/.omp/agent/terminal-sessions/[terminal-id]
```

- **会话桶随 cwd 变**。`[encoded-cwd]` 由 canonicalize 后的 cwd 推导（所以符号链接别名共享一个桶）：home 下用 `-[relative]`，临时根下用 `-tmp-[relative]`，其它用 `--[编码后的绝对路径]--`，路径分隔符替换为 `-`。计算代码先 `path.resolve` 再 `resolveEquivalentPath`，并分别与 home、temp 根求相对路径 [@ref-omp-lt-storage-dir-name-resolution-code]；scope 判定按“临时根优先、其次 home、最后绝对路径”三段分支，home 与 temp 嵌套时还会算一个 shadowed 名字再向前迁移 [@ref-omp-lt-storage-dir-name-scope-code]；绝对路径分支的编码把开头的 `/` 或 `\` 去掉并把剩下的 `/\:` 全换成 `-` [@ref-omp-lt-storage-legacy-abs-dir-name-code]。`SessionManager.list(cwd, sessionDir?)` 默认只读解析出的那个桶，除非显式传入 `sessionDir` [@ref-omp-lt-storage-cwd-bucket]。
- **根目录随环境变量与 profile 变**。`getSessionsDir`/`getBlobsDir` 走 `dirs.agentSubdir(agentDir, "sessions"|"blobs", "data")`，`terminal-sessions` 与 `custom-session-files` 走 `"state"` 域；解析结果里 XDG 分支会把 `~/.omp/agent/` 前缀拍平——注释写明 `~/.omp/agent/sessions` 在设了 XDG 时变成 `$XDG_DATA_HOME/omp/sessions` [@ref-omp-lt-storage-sessions-blobs-dir-code][@ref-omp-lt-storage-agent-root-dirs-code]。CLI 的 `--profile [name]` 会为 auth、sessions、settings 与缓存启用隔离 profile，因此换 profile 就是换一套会话路径 [@ref-omp-lt-entry-scope-cli-session-flags]。
- **终端面包屑与自定义会话标记**。`terminal-sessions/[terminal-id]` 的首行是 cwd 与会话文件路径，可选附加行是 `fresh` 与 `cwdstat [device] [inode]`；`fresh` 用来保住“刚创建但文件尚未落盘”的 lazy 会话，避免 `continueRecent()` 打开上一个会话 [@ref-omp-lt-storage-layout-blobs-breadcrumb]。每个 `--session-dir`/`--session` 会话都会在 `custom-session-files/` 留一个标记文件，好让 GC 在面包屑被后续会话覆盖之后仍能扫到确切路径 [@ref-omp-lt-storage-terminal-and-marker-dirs-code]。
- **会话所有权租约**。`~/.omp/run/session-owners`（XDG 默认 `$XDG_STATE_HOME/omp/run/session-owners`）存放目录命名会话的租约，注释说它跨 profile 共享，打开同一会话的每个 omp 进程都要满足同一租约 [@ref-omp-lt-storage-session-owners-dir-code]。

**没有查证的部分**：本轮在固定 commit 里没有读到 blob store 的分片层级、`blobs/` 内部是否分桶，以及归档目录的确切相对层级描述以外的细节；也没有逐项审计缓存、日志与遥测文件。

### 命名与父子关系

文件名形如 `[timestamp]_[sessionId].jsonl`，时间戳里的 `:` 与 `.` 被替换成 `-`，随后紧接着写 256 字节的 title slot 与 header [@ref-omp-lt-format-file-name-code]。父会话/子会话/分支有**三种不同的表达**，容易混淆：

- **header 里的 `parentSession`** 是**不透明的谱系字符串**。当前代码按流程写会话 id 或会话路径（`fork`、`forkFrom`、`createBranchedSession` 或显式 `newSession({ parentSession })`），文档要求把它当元数据而不是类型化外键 [@ref-omp-lt-format-header-notes]。子代理会话因此**不以目录形式嵌在父文件旁边**（这一点与“文件即唯一会话”的直觉相反）。
- **条目树**才是真正的父子关系：普通追加生成一条 `parentId` 为当前 `leafId` 的新条目并前移叶子；`appendMessageToBranch()` 向显式父节点追加但不动活叶子；`branch(entryId)` 只移动 `leafId` 不改既有条目；`resetLeaf()` 置 `leafId = null`，下一次追加生成新的根条目 [@ref-omp-lt-lifecycle-tree-leaf]。
- **同名 artifact 目录**按去掉 `.jsonl` 后缀得到，`[session].jsonl` 的附件住在 `[session]/` [@ref-omp-lt-storage-artifacts-dir-code]。

### 格式与写入方式

JSONL，一行一个 JSON 对象。当前文件物理上以**固定 256 字节的 `type: "title"` slot（含换行）**开头，然后才是 header，然后是 `SessionEntry`；旧文件可能直接从 header 开始，加载器会剥掉这个物理 slot 并把它的标题/来源折进逻辑 header [@ref-omp-lt-storage-jsonl-title-slot]。标题之所以要这个 slot，是因为改名要避免全文件重写；`title_change` 是追加式审计条目，当前标题同时写进 slot [@ref-omp-lt-format-header-notes]。

写入前还有一层投影，因此"文件里看到的"不等于"内存里的"：超长字符串截断、瞬态字段剔除、图片与 base64 载荷外置成 `blob:sha256:[hash]` 引用都发生在这里，加载时普通图片引用再还原为内联载荷 [@ref-omp-lt-storage-size-controls-blobs]。写入规则：普通追加是追加；分支导航只移动内存里的 `leafId` 指针；定向重写/丢弃辅助函数可以改既有记录 [@ref-omp-lt-storage-jsonl-title-slot]。存储后端是可替换的——`SessionStorage` 定义文件系统式操作，`FileSessionStorage` 是真实本地文件，`MemorySessionStorage` 用于非持久会话与测试，`IndexedSessionStorage` 用于共享本地索引加有序远端发布（Redis/SQL 后端） [@ref-omp-lt-storage-abstractions]。也就是说"JSONL 追加"是默认后端的行为，不是协议保证。

## Schema 与生命周期 {#transcripts-schema-lifecycle}

### 记录结构

header 是文件里的第一个逻辑条目，字段集为 [@ref-omp-lt-format-header-example]：

```json
{
  "type": "session",
  "version": 3,
  "id": "019c625b-b900-7000-8000-000000000001",
  "timestamp": "2026-02-16T10:20:30.000Z",
  "cwd": "/work/pi",
  "title": "optional session title",
  "titleSource": "auto",
  "additionalDirectories": ["/work/shared"],
  "previousSessionFiles": ["/old/location/session.jsonl"],
  "providerPromptCacheKey": "optional inherited cache identity",
  "parentSession": "optional lineage marker"
}
```

其余所有条目共享 `SessionEntryBase`：`type`、8 字符 `id`、`parentId`、`timestamp`；`parentId` 可为 `null`（首次追加或 `resetLeaf()` 之后）。条目 id 通常是八个十六进制字符，碰撞耗尽时回退为完整 Snowflake id，**消费者不得假定固定宽度** [@ref-omp-lt-format-entry-base]。`titleSource` 是 `auto` 或 `user`，自动改名不能覆盖用户标题；`additionalDirectories` 是归一去重后的附加工作区根；`previousSessionFiles` 记录成功迁移后的旧绝对位置 [@ref-omp-lt-format-header-notes]。

`type` 取值全集是 `message`、`model_usage`、`thinking_level_change`、`model_change`、`service_tier_change`、`compaction`、`branch_summary`、`reset_boundary`、`custom`、`custom_message`、`label`、`title_change`、`ttsr_injection`、`credential_pin`、`session_init`、`mode_change` [@ref-omp-lt-format-entry-taxonomy]。其中 `type: "message"` 的 `message.role` 取值分两族：pi-ai 的对话族（`user`、`developer`、`assistant`、`toolResult`）与 pi-tui 的执行族（`bashExecution`、`pythonExecution`、遗留的 `hookMessage`、内联 `@file` 的 `fileMention`）[@ref-omp-lt-format-persisted-roles-conversation][@ref-omp-lt-format-persisted-roles-tui]。重建时 `branch_summary`、`compaction`、`custom_message` 会分别合成为 `branchSummary`、`compactionSummary`、`custom`，因此**持久化形态与重建角色不是一一对应**，读取方必须按 `type` 判别 [@ref-omp-lt-format-reconstructed-roles]。

版本迁移。当前会话版本 `3` [@ref-omp-lt-schema-versioning-migration]：

| 从 → 到 | 触发条件 | 动作 |
|---|---|---|
| v1 → v2 | header `version` 缺失或 `< 2` | 给每个非 header 条目补 `id`/`parentId`，按文件顺序重建线性父链，把 compaction 字段 `firstKeptEntryIndex` 迁成 `firstKeptEntryId`，header `version = 2` |
| v2 → v3 | header `version < 3` | 把 `message` 条目里遗留的 `message.role === "hookMessage"` 重写为 `"custom"`，header `version = 3` |

迁移在加载时（`setSessionFile`）运行；只要跑过迁移，内存表示就被标记为“下次持久化全量重写”，重写发生在下一次持久化操作时而不是立刻 [@ref-omp-lt-schema-migration-trigger]。

**schema 缺口（如实列出）**：固定来源没有随包发布的机器可读 schema 文件（无 JSON Schema、无 `.schema.json`）；`custom`、`ttsr_injection`、`credential_pin`、`session_init`、`label` 这几个条目类型的字段定义本轮没有逐一定位到行，只确认它们在联合类型里存在；`providerPayload` 的结构由各 provider 实现决定，源码里没有统一约束；本轮没有查证旧版本读取新格式时的行为。

### 生命周期

1. **创建与命名**。`SessionManager.create/open/continueRecent/forkFrom` 进持久化模式，`SessionManager.inMemory` 是不持久模式配 `MemorySessionStorage` [@ref-omp-lt-lifecycle-persist-vs-memory]；该模式下没有会话文件路径，`--continue`/`--resume`/`--fork` 与外部会话导入都会被拒绝，`/export` 报 `Cannot export in-memory session to HTML`，只有 `/dump` 与 `/share` 仍可用 [@ref-omp-lt-lifecycle-in-memory-mode]。
2. **惰性落盘门槛**。新的普通会话在出现首条 assistant 消息或调用方显式 `ensureOnDisk()` 之前**只在内存里**；跨过门槛时写入完整 title slot、header 与累积条目。显式 `newSession()`（含 `/new`）返回前会调 `ensureOnDisk()`，以保住跨终端的空会话边界；此后条目增量追加 [@ref-omp-lt-lifecycle-lazy-persistence-gate]。**这条对排错很关键**：刚开就退出的会话可能没有文件，只能靠 `fresh` 面包屑占位。
3. **加载**。`loadEntriesFromFile(path)`：文件缺失返回 `[]`（除非 `throwIfMissing: true`）；当前 ≥8 MiB 的文件走流式 JSONL 加载器，更小或非文件存储走全文读；损坏记录被跳过并计数；固定宽度 title slot 被剥离折进 header；首个逻辑条目不是合法 session header 时返回 `[]` [@ref-omp-lt-lifecycle-load-behavior]。
4. **打开与续接**。`setSessionFile()`：缺失或真空的文件在该确切路径初始化新会话并立即物化 header，`open(..., { throwIfMissing: true })` 则拒绝缺失/空输入；非空但没有合法首条 header 的数据被拒绝且**不改文件**；合法文件加载、必要时迁移、解析 blob 引用、再索引 [@ref-omp-lt-lifecycle-set-session-file]。`--continue` 的解析顺序见诊断小节。
5. **分支与上下文重建**。每次普通追加生成一条新条目并前移 `leafId`，`appendMessageToBranch()` 向显式父节点追加而不动活叶子，`branch(entryId)` 只移动叶子指针、`resetLeaf()` 让下一次追加生成新根 [@ref-omp-lt-lifecycle-tree-leaf]。`buildSessionContext(entries, leafId?, byId?, options?)` 决定送给模型的内容，`options.transcript: true` 改走展示用 transcript。
6. **失败模型**。普通追加失败被**锁存并只记录一次**（带会话文件上下文），不抛进 turn 循环；后续追加可重试完整的内存 journal，`flush()`/`flushSync()` 与 close 才暴露未解决的失败。`onPersistenceNotice` 报告会话移动到兄弟文件，以 home 相对路径在交互模式显示为警告、print 模式写 stderr、RPC 作为 `warning` 通知帧 [@ref-omp-lt-lifecycle-error-behavior]。
7. **上下文压缩后延续**。压缩写 `compaction` 条目，只改变"读多少"，不删除旧消息；`reset_boundary` 同理 [@ref-omp-lt-format-reset-boundary][@ref-omp-lt-lifecycle-clear-retains-file]。
8. **交给子代理**。子代理会话是**独立会话文件**，父子关系落在 header 的 `parentSession` 字符串上；面包屑指向子代理会话时会先解析回交互根会话，避免 `--continue` 恢复成子代理记录 [@ref-omp-lt-format-header-notes][@ref-omp-lt-lifecycle-breadcrumb-root-code]。委派机制本身属于自定义 agent 主题（`agents.invocation`）。

## 数据库与索引的分工 {#transcripts-database}

**正文不在数据库里**。`history.db` 是与 JSONL 并存的辅助数据库，承担三类职责：

- **prompt 输入历史**。DDL 是 `history(id, prompt UNIQUE, created_at, cwd, session_id, use_count)` 加 `created_at DESC` 索引 [@ref-omp-lt-database-history-table-ddl-code]，FTS5 虚拟表 `history_fts(prompt, content='history', content_rowid='id')` 由插入触发器维护 [@ref-omp-lt-database-history-fts-code]。文档说它服务 prompt 回忆/搜索而**不是**会话回放：换行与首尾空白归一后跨库去重，重新提交更新最新时间戳/cwd/session 并递增 `use_count`，`add()` 在返回已 resolve 的 promise 之前同步写入、失败只记日志 [@ref-omp-lt-diagnostics-history-storage-scope]。
- **会话标题索引**。`session_titles(session_id PRIMARY KEY, title, updated_at)`；标题创建或改名时写入，近期会话回退扫描也会回填，让欢迎页的 "Recent sessions" 用 stat + 查询代替扫描项目目录里每个会话文件（文档说在数千会话的目录上这是数百毫秒级差异） [@ref-omp-lt-database-index-tables-doc][@ref-omp-lt-database-index-ddl-code]。
- **空闲 recap 日志**。`session_recaps(id, session_id, cwd, recap, created_at)` 是只追加表，recap 是**旁路输出，从不进入会话 JSONL 或 LLM 上下文**，这张表是它唯一的持久记录；`omp gc` 会删除已归档会话的行 [@ref-omp-lt-database-index-tables-doc][@ref-omp-lt-database-index-ddl-code]。

数据库路径是 `dirs.agentSubdir(agentDir, "history.db", "data")`，与 `sessions/`、`blobs/` 同在 data 域 [@ref-omp-lt-database-history-db-path-code]。同一模块的注释说明索引侧持有自己惰性打开的连接而不是 `HistoryStorage` 的路径绑定单例，因为 db 路径每次调用都重新解析，`setAgentDir`/profile 切换要能透明重开；**它从不给 db 设版本**——`PRAGMA user_version` 归 `HistoryStorage` 的重建流程所有，而那次重建只删自己的表 [@ref-omp-lt-database-index-tables-doc]。

恢复一个会话**必需**的是该会话的 JSONL 文件、它的同名 artifact 目录，以及 JSONL 里引用的 blob；`history.db` 里的 `session_titles` 与 `history` 行只影响列表显示与 prompt 回忆，删掉之后程序会回退到内容扫描再回填 [@ref-omp-lt-diagnostics-history-storage-boundary]。**能重建的**：表结构（DDL 常量在源码里）、索引、`history_fts`（有 rebuild 触发路径）。**不能重建的**：会话正文、artifact 内容、被引用且已从 blob store 扫掉的附件。

## 归档、备份、移动与删除 {#transcripts-cleanup-archive}

### `omp gc`：四个阶段，默认只预览

`omp gc` 默认预览，需要 `--apply` 才真正清扫无引用 blob、归档符合条件的冷会话、checkpoint 数据库 WAL 或剪除陈旧状态；存储维护与模型上下文压缩是两件事 [@ref-omp-lt-cleanup-manual-maintenance]。阶段开关 [@ref-omp-lt-cleanup-gc-phase-flags-code]：

```text
--apply                      Apply changes (default is dry-run)
--json                       Output JSON
--agent-dir DIR             Agent directory to maintain
--blobs                      Sweep unreferenced blobs
--archive                    Archive cold sessions
--wal                        Checkpoint history/model database WAL files
--stale                      Prune dangling session markers/breadcrumbs and old debug reports and collab replicas
```

保留参数 [@ref-omp-lt-cleanup-gc-retention-flags-code]：`--cold-archive-after-days`、`--retain-newest-global`、`--retain-newest-per-cwd`、`--stale-retain-newest`、`--stale-retain-days`。对应配置项默认值是 `gc.blobs`/`gc.archive`/`gc.wal` 为 true、`gc.coldArchiveAfterDays` 30、`gc.retainNewestGlobal` 20、`gc.retainNewestPerCwd` 10 [@ref-omp-lt-cleanup-gc-settings-code]；**陈旧状态阶段是显式 opt-in**——`gc.stale` 默认 false，因为与其它阶段不同它删的是用户可见文件（debug 报告、collab 副本），一次不带限定的 `omp gc --apply` 不动它们；`gc.staleRetainNewest` 默认 20、`gc.staleRetainDays` 默认 30 [@ref-omp-lt-cleanup-gc-stale-settings-code]。

阶段顺序固定为 stale → blobs → archive → wal，整体在一把 GC 锁内执行；注释写明理由是"先剪陈旧状态，被剪掉的 collab 副本随后就在本轮 blob 清扫里释放" [@ref-omp-lt-cleanup-gc-run-order-code]。

### 归档是"压缩移走"，不是可携带归档

归档目录是 `path.dirname(getSessionsDir(agentDir))/archive/sessions` [@ref-omp-lt-cleanup-archive-dir-code]。归档候选要连过三道闸：会话状态不在活动集合、修改时间早于写入宽限、且没有活的嵌套子会话 [@ref-omp-lt-cleanup-archive-gate-code]；之后按全局/每 cwd 的最新 N 条保留规则放行，最后才检查 `--cold-archive-after-days` 年龄门 [@ref-omp-lt-cleanup-archive-age-code]。

因此归档产物是 `[archive]/sessions/[相对桶路径].jsonl.gz` 这类**压缩移走的文件**，而不是一个能整体搬运的会话包。这带来几个具体后果：

- **可移植性**：JSONL 里存的是 `cwd` 绝对路径、`previousSessionFiles` 旧绝对位置、`custom-session-files` 标记里记的绝对路径、blob 引用 `blob:sha256:[hash]`。换机器或换路径后，cwd 不匹配、`--continue` 的面包屑与目录同一性判断都不会把它当作同一项目 [@ref-omp-lt-format-header-notes][@ref-omp-lt-diagnostics-continue-fallback]。
- **完整性**：归档阶段会同时删掉该会话在 `history.db` 里的行（报告里是 `historyRowsDeleted` 与 `statsRowsDeleted` 计数）[@ref-omp-lt-diagnostics-gc-report-code]。也就是说归档不只是"搬走"，还会**丢弃标题索引与 recap 历史**。
- **归档后能否恢复**：固定来源里没有查到从 `.jsonl.gz` 恢复回活动目录的官方路径。CLI 侧另有 `--export [session]` 导出 HTML 后退出，但那是展示产物，不是可续接的会话 [@ref-omp-lt-entry-scope-cli-session-flags]。**这是 `transcripts.archive` 记为 partial 的原因**。

### 删除与保留

官方删除入口有两类：

- **`/delete`**（交互式）。它走与 `/new` 相同的切换但带 `drop: true`，需要会话文件路径，尝试删除旧 JSONL 与 artifact 树而不是保留它们，删除失败也仍然起新会话 [@ref-omp-lt-cleanup-delete-command]。文档在已知实现注意事项里明确说它是 **best-effort**：失败只记日志并仍会创建并切换到新会话，**部分失败可能把旧会话或其 artifacts 留在磁盘上，所以 `/delete` 不是保证的擦除边界** [@ref-omp-lt-cleanup-delete-not-erasure-boundary]。
- **会话选择器里的 Delete**。交互选择器里 Delete（或空搜索时按 Backspace）走确认流程，删除 JSONL 与 session artifacts [@ref-omp-lt-cleanup-picker-delete]。

底层删除实现先 unlink 会话文件，再按"去掉 `.jsonl` 后缀"算出 artifact 目录并递归删除；artifact 删除失败会抛出明确错误（此时会话文件已经没了），随后还会 best-effort 清理 EPERM 重写遗留的 `[name].jsonl.[snowflake].bak` 备份，注释说否则选择器扫描会把已删会话从最新陈旧备份里复活 [#11499] [@ref-omp-lt-cleanup-delete-session-code][@ref-omp-lt-cleanup-delete-backup-code]。

陈旧状态清理只处理**指针类文件**：扫描 `custom-session-files` 标记目录找悬空指针、扫描 `terminal-sessions` 面包屑目录找悬空面包屑（`fresh` 面包屑被显式排除，因为它标记的是尚未物化的 `/new` 边界）[@ref-omp-lt-cleanup-stale-markers-code]；在默认 agent dir 下还会按 `gc.staleRetainNewest`/`gc.staleRetainDays` 过期 debug 报告包与 collab 访客副本，副本若被某个终端面包屑指向则跳过 [@ref-omp-lt-cleanup-stale-collab-code]。

**删除前必须停止的写入者**：至少要退出所有正在使用该 agent dir 的 omp 进程。本轮在固定来源里查到的协调机制是 GC 自带的锁（`withGcLock`）与 `~/.omp/run/session-owners` 租约目录 [@ref-omp-lt-cleanup-gc-run-order-code][@ref-omp-lt-storage-session-owners-dir-code]；手工删除 JSONL 而不退出进程时，正在运行的会话仍持有内存 journal 并可能在后续追加时重建或继续写。**没有证据支持"手工删除某个 jsonl 是安全的"**——缺少证据不等于可以安全删除。

## 定位、完整性与排错 {#transcripts-diagnostics}

1. **先确认路径与桶**。默认布局、桶编码与迁移规则见存储小节；`--profile` 与 XDG 环境变量会改变根目录 [@ref-omp-lt-storage-layout-default][@ref-omp-lt-storage-agent-root-dirs-code]。
2. **列出与定位会话**。发现辅助函数在 `session-listing.ts`，`SessionManager` 提供项目作用域包装：`getRecentSessions(sessionDir, limit?)`（欢迎页元数据，默认 4 条）、`findMostRecentSession`（按 mtime）、`findMostRecentNonEmptySession`（`continueRecent` 用的可恢复内容）、`listSessions(sessionDir, storage)` / `SessionManager.list()`（项目作用域加生命周期状态） [@ref-omp-lt-diagnostics-discovery-utilities]。
3. **`--continue` 解析顺序**（排错"为什么续的不是我以为的那个"）：先读终端作用域面包屑，校验目标——已物化的目标可用，目标缺失时只有可选第三行是 `fresh` 才可用（标记尚未物化的 `/new` 边界）；`fresh` 目标缺失则**开新会话而不是回退去复活旧记录** [@ref-omp-lt-diagnostics-continue-order]。随后把陈旧的修复前子代理面包屑解析回交互父会话 [@ref-omp-lt-lifecycle-breadcrumb-root-code]；面包屑 cwd 不同时只在记录的 device/inode 与当前目录一致时重新生根（源码明确说"已删除、已卸载或跨文件系统移动的项目不是重命名的正面证据"），否则用 cwd 匹配的最近非空桶内会话，没有可用面包屑就按 mtime 取最新非空 [@ref-omp-lt-diagnostics-continue-fallback]。
4. **加载失败分类**。缺失或空路径在 `setSessionFile` 下会初始化并持久化新会话；非空文件 header 缺失或格式错误会抛 `Cannot resume session "...": the session header is missing or malformed. The file was not modified.`；严格 open/resume 路径可能拒绝没有条目的文件而不是创建；合法 header 之后的损坏 body 记录被宽松恢复并把文件标记为待重写。**header 恢复永远不会覆盖原文件** [@ref-omp-lt-diagnostics-missing-invalid-header]。
5. **持久化错误**。看到"会话移动到兄弟文件"的提示，对应的是 `SessionPersistenceNotice`（`reason`/`from`/`to`），不是失败；真正的追加失败被锁存且只记一次日志，靠 `flush()`/close 才暴露 [@ref-omp-lt-lifecycle-error-behavior]。
6. **GC 结果读取**。文本报告给出 `sessions: archived/wouldArchive archived, … history rows and … stats rows removed`、`sessions skipped active: …`、`session errors: …`、`wal: checkpointed | checkpoint dry-run, …` 等行 [@ref-omp-lt-diagnostics-gc-report-code]；`--json` 给结构化结果，`agentDir`、`apply` 与 `lockPath` 都在里面 [@ref-omp-lt-cleanup-gc-run-order-code]。
7. **区分数据库与正文**。想把某个会话读出来，应读它的 JSONL；`history.db` 只服务 prompt 回忆与标题/recap 索引，删掉行不会删会话 [@ref-omp-lt-diagnostics-history-storage-boundary]。

**完整性检查的边界**：固定来源里没有提供校验或修复命令。可观察的健全信号是 `SessionManager.list()` 能列出带生命周期状态的会话、`--continue` 能解析到预期会话、以及 `omp gc --json` 的 `errors` 为空。任何超出这些信号（尤其是"手工改库/删文件之后是否安全"）的判断，本轮没有固定来源支撑。

**跨主题链接**：会话标题的持久化与自动命名属于配置与模型侧行为（`config.sources`、`config.defaults`）；子代理委派与父子谱系属于 `agents.invocation`；压缩摘要条目的产生属于 `models.responses` 的上下文构造。