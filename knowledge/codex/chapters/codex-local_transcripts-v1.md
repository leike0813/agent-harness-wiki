---
schema_version: 3
record_kind: production
edition_id: codex-local_transcripts-v1
harness_id: codex
topic: local_transcripts
title: "Codex 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-scope-persisted-items
      - ref-codex-cli-transcripts-scope-response-items
      - ref-codex-cli-transcripts-scope-transient-events
      - ref-codex-cli-transcripts-scope-ephemeral-flag
      - ref-codex-cli-transcripts-scope-ephemeral-field
      - ref-codex-cli-transcripts-scope-history-settings
      - ref-codex-cli-transcripts-scope-history-file
      - ref-codex-cli-transcripts-history-persistence-doc
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-location-subdirs
      - ref-codex-cli-transcripts-location-codex-home
      - ref-codex-cli-transcripts-location-rollout-path
      - ref-codex-cli-transcripts-naming-file-name
      - ref-codex-cli-transcripts-naming-file-name-render
      - ref-codex-cli-transcripts-naming-lineage
      - ref-codex-cli-transcripts-location-sqlite-home-env
      - ref-codex-cli-transcripts-sqlite-home-doc
      - ref-codex-cli-transcripts-location-sqlite-db-files
      - ref-codex-cli-transcripts-location-session-index
      - ref-codex-cli-transcripts-location-media-inline
      - ref-codex-cli-transcripts-schema-session-meta-head
  - section_id: transcripts-jsonl-format-and-schema
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-format-envelope
      - ref-codex-cli-transcripts-schema-item-types
      - ref-codex-cli-transcripts-schema-session-meta-head
      - ref-codex-cli-transcripts-schema-session-meta-history
      - ref-codex-cli-transcripts-format-append-open
      - ref-codex-cli-transcripts-format-line-write
      - ref-codex-cli-transcripts-format-compression-constants
      - ref-codex-cli-transcripts-format-compression-worker
      - ref-codex-cli-transcripts-format-compression-cold-file
      - ref-codex-cli-transcripts-schema-migration-command
      - ref-codex-cli-transcripts-lifecycle-cli-subcommands
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-lifecycle-recorder-api
      - ref-codex-cli-transcripts-lifecycle-find-thread
      - ref-codex-cli-transcripts-lifecycle-cli-subcommands
      - ref-codex-cli-transcripts-lifecycle-writer-lock
      - ref-codex-cli-transcripts-scope-persisted-items
      - ref-codex-cli-transcripts-schema-session-meta-head
      - ref-codex-cli-transcripts-schema-session-meta-history
      - ref-codex-cli-transcripts-naming-lineage
  - section_id: transcripts-state-database
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-location-sqlite-db-files
      - ref-codex-cli-transcripts-database-threads-table
      - ref-codex-cli-transcripts-database-backfill
      - ref-codex-cli-transcripts-database-backfill-lease
      - ref-codex-cli-transcripts-database-recovery
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-location-subdirs
      - ref-codex-cli-transcripts-archive-writer-conflict
      - ref-codex-cli-transcripts-archive-move
      - ref-codex-cli-transcripts-cleanup-delete-semantics
      - ref-codex-cli-transcripts-cleanup-delete-order
      - ref-codex-cli-transcripts-cleanup-maintenance-lock
      - ref-codex-cli-transcripts-lifecycle-cli-subcommands
      - ref-codex-cli-transcripts-history-max-bytes-doc
      - ref-codex-cli-transcripts-scope-history-settings
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-transcripts-diagnostics-read-example
      - ref-codex-cli-transcripts-diagnostics-state-check
      - ref-codex-cli-transcripts-diagnostics-parity-check
      - ref-codex-cli-transcripts-lifecycle-cli-subcommands
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: answered
        source_refs:
          - ref-codex-cli-transcripts-scope-persisted-items
          - ref-codex-cli-transcripts-scope-response-items
          - ref-codex-cli-transcripts-scope-transient-events
          - ref-codex-cli-transcripts-scope-ephemeral-flag
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-codex-cli-transcripts-location-codex-home
          - ref-codex-cli-transcripts-location-rollout-path
          - ref-codex-cli-transcripts-location-sqlite-home-env
          - ref-codex-cli-transcripts-location-sqlite-db-files
          - ref-codex-cli-transcripts-location-session-index
          - ref-codex-cli-transcripts-location-media-inline
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-codex-cli-transcripts-naming-file-name
          - ref-codex-cli-transcripts-naming-file-name-render
          - ref-codex-cli-transcripts-naming-lineage
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-jsonl-format-and-schema
        status: answered
        source_refs:
          - ref-codex-cli-transcripts-format-envelope
          - ref-codex-cli-transcripts-format-append-open
          - ref-codex-cli-transcripts-format-line-write
          - ref-codex-cli-transcripts-format-compression-constants
          - ref-codex-cli-transcripts-format-compression-cold-file
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-jsonl-format-and-schema
        status: partial
        source_refs:
          - ref-codex-cli-transcripts-format-envelope
          - ref-codex-cli-transcripts-schema-item-types
          - ref-codex-cli-transcripts-schema-session-meta-head
          - ref-codex-cli-transcripts-schema-session-meta-history
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-codex-cli-transcripts-lifecycle-recorder-api
          - ref-codex-cli-transcripts-lifecycle-find-thread
          - ref-codex-cli-transcripts-lifecycle-writer-lock
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-state-database
        status: partial
        source_refs:
          - ref-codex-cli-transcripts-location-sqlite-db-files
          - ref-codex-cli-transcripts-database-threads-table
          - ref-codex-cli-transcripts-database-backfill
          - ref-codex-cli-transcripts-database-recovery
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs:
          - ref-codex-cli-transcripts-archive-move
          - ref-codex-cli-transcripts-lifecycle-cli-subcommands
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs:
          - ref-codex-cli-transcripts-cleanup-delete-semantics
          - ref-codex-cli-transcripts-cleanup-delete-order
          - ref-codex-cli-transcripts-history-max-bytes-doc
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-transcripts-diagnostics-read-example
          - ref-codex-cli-transcripts-diagnostics-state-check
          - ref-codex-cli-transcripts-diagnostics-parity-check
---

本主题的固定来源是 openai/codex 源码快照 `snapshot-codex-repo-822e58cc`（commit `822e58cc3d666166c7446c5b1ea2e52f5d09594c`，来源抓取时间 2026-10-06）与官方配置参考快照 `snapshot-codex-cli-configuration-doc-learn`（`https://learn.chatgpt.com/docs/config-file/config-reference.md`，抓取时间 2026-10-03，`version_applicability: unknown`）。全部结论限定在 `surface_id: cli`、linux/x64 源码树。文档快照的 `version_applicability` 是 unknown，没有逐小节证据把它绑定到任何 npm 发行版，因此本文只陈述源码 commit 与文档快照范围内的机制，不写 `mappings/`。未调查的界面（`vscode`、`desktop`、`cloud`）不写答案。

## 记录范围与开关 {#transcripts-recording-scope}

Codex CLI 至少落两类内容，位置和开关都不同：`rollout` 会话记录（消息、工具调用与执行摘要的 JSONL 逐行追加），以及 `history.jsonl` 里的用户输入历史。先分清两者，再谈开关。

rollout 记录哪些内容由 `persisted_rollout_item` 单点决定。模型侧 `ResponseItem` 里被保留的是消息、推理、`LocalShellCall`/`FunctionCall` 及其输出、`ToolSearch`、`CustomTool`、`WebSearch`、`ImageGeneration`、`ConfigurationUpdate`、`Compaction` 与 `ContextCompaction`；`CompactionTrigger` 和 `Other` 不写盘。[@ref-codex-cli-transcripts-scope-response-items] 命令输出与 MCP 工具结果在写入前截断到 64 KiB，分别由 `PERSISTED_COMMAND_OUTPUT_MAX_BYTES` 与 `PERSISTED_MCP_RESULT_MAX_BYTES` 控制，命令输出截断标记是 `... command output truncated for persistence ...`。[@ref-codex-cli-transcripts-scope-persisted-items]

事件侧 `EventMsg` 只有一部分持久化。源码把一批事件显式列为 "Transient, non-durable events"，包括 `Error`、`Warning`、`ExecCommandBegin/End`、各种 `Delta` 流式事件、`RequestPermissions`、`ApplyPatchApprovalRequest`、`McpToolCallBegin`、`HookStarted/Completed`、`PlanUpdate`、`TurnDiff`、`SessionConfigured` 等，它们不进入 rollout。[@ref-codex-cli-transcripts-scope-transient-events] 换句话说，rollout 记录的是"发生了什么"，不是"终端当时刷了什么"；流式增量、审批请求和错误提示不留痕。

哪些事件持久化还取决于线程的 `history_mode`（`legacy` 或 `paginated`，见下文 schema 小节）：`legacy` 模式只保留无无损原始 `ResponseItem` 对应物的少数 `ItemCompleted` 事件，`paginated` 模式才把 `TurnItem` 全量写入。这个分支由同一个 `persisted_rollout_item` 按 `history_mode` 判定，源码中带 `TODO(jif): sqlite migration phase 1` 的迁移尚未把全部线程切到 `paginated`。[@ref-codex-cli-transcripts-scope-persisted-items]

关闭 rollout 的开关是 `--ephemeral`：`codex exec --ephemeral` 的 flag 描述是 "Run without persisting session files to disk."，对应的配置字段注释是 "When true, session is not persisted on disk. Default to `false`"。[@ref-codex-cli-transcripts-scope-ephemeral-flag][@ref-codex-cli-transcripts-scope-ephemeral-field] 在固定 commit 的 `cli/src/main.rs` 里，`--ephemeral` 定义在 `exec` 子命令的共享参数组上；未在 `cli/src/main.rs` 的子命令枚举或 TUI 参数中确认同名 flag，所以不能把它外推为交互式 `codex` 的开关。

`history.jsonl` 是另一回事：它是全局追加的用户输入历史，每行一个 JSON 对象 `{"session_id":"SESSION_UUID","ts":UNIX_SECONDS,"text":"MESSAGE_TEXT"}`，不含工具事件。它由 `[history]` 配置控制：`persistence` 取 `save-all`（默认）或 `none`，`max_bytes` 超过上限时丢弃最旧条目。[@ref-codex-cli-transcripts-scope-history-file][@ref-codex-cli-transcripts-scope-history-settings] 官方配置参考把这组键描述为 "Control whether Codex saves session transcripts to history.jsonl."[@ref-codex-cli-transcripts-history-persistence-doc] 源码的 `History` 结构注释和该文件的三字段 schema 说明 `history.jsonl` 存的是输入消息，不是会话 transcript；本文以后者为准，并把这个措辞差异记为未消解的分歧点。

最小完整块（用户与项目作用域的合并规则见 [Codex CLI 主题章节：配置机制](codex-cli-configuration-v3.md)，本文不重复）：

```toml
# ~/.codex/config.toml —— 关闭用户输入历史（不影响 rollout 记录）
[history]
persistence = "none"

# 限制 history.jsonl 体积，超限丢弃最旧条目
# max_bytes = 1048576
```

生效条件：`history` 段读自用户级 `config.toml`；`persistence = "none"` 只影响 `history.jsonl`，不关掉 rollout。可观察检查：`ls ~/.codex/history.jsonl` 与 `ls ~/.codex/sessions/` 分别验证两者。

## 存储位置、命名与格式 {#transcripts-storage-layout}

### 位置

根目录由 `find_codex_home()` 决定：`CODEX_HOME` 环境变量优先（必须已存在且是目录，值会被 canonicalize），未设置时用 `~/.codex`。[@ref-codex-cli-transcripts-location-codex-home] 会话文件放在该根下的 `sessions` 与 `archived_sessions` 两个常量子目录里。[@ref-codex-cli-transcripts-location-subdirs]

新 rollout 的目录按本地时间分三级：`codex_home/sessions/YYYY/MM/DD/`，其中 `YYYY` 不补零、月份与日期用 `{:02}` 补零。[@ref-codex-cli-transcripts-location-rollout-path] 因此按 `CODEX_HOME` 换根、按时区换目录两级，Windows 与 macOS 的路径分隔符由 Rust 路径类型处理；本文不把这些结论外推到其他系统。

SQLite 状态库可以移到 `sqlite_home`：`resolve_sqlite_home_env` 从 `codex_state::SQLITE_HOME_ENV` 读环境变量并相对已解析的 cwd 解析；`config.toml` 侧对应键 `sqlite_home` 的官方描述是 "Directory where Codex stores the SQLite-backed state DB used by agent jobs and other resumable runtime state."。[@ref-codex-cli-transcripts-location-sqlite-home-env][@ref-codex-cli-transcripts-sqlite-home-doc] 该目录下的库文件名固定为 `logs_2.sqlite`、`goals_1.sqlite`、`memories_1.sqlite`、`queue_1.sqlite`、`state_5.sqlite`、`thread_history_1.sqlite`。[@ref-codex-cli-transcripts-location-sqlite-db-files] 文件名带数字后缀意味着升级会换新库文件；本文未验证旧库文件的迁移与回收时机。

线程名索引是 rollout 根目录下的 `session_index.jsonl`，每条 `SessionIndexEntry` 是 `{id, thread_name, updated_at}`，追加写入、后写覆盖先写。[@ref-codex-cli-transcripts-location-session-index] 源码常量 `SESSION_INDEX_FILE` 给出文件名，未验证其相对 `codex_home` 的具体父目录拼接，这里不写完整路径。

必要附件方面，本地图片与音频在进入记录前就被读成 data URL，因此 rollout 文件自包含、没有外部附件文件可丢：image 有 `MAX_PROMPT_IMAGE_INPUT_BYTES` 上限、audio 有 `MAX_PROMPT_AUDIO_INPUT_BYTES`（50 MiB），转换后 `UserInput::Image` 用 `ImageReference::Inline { image_url }`。[@ref-codex-cli-transcripts-location-media-inline]

### 命名

普通 rollout 文件名形如：

```text
rollout-2025-05-07T17-24-21-5973b6c0-94b8-487b-a530-2aeb6098ae0e.jsonl
```

`RolloutFileName` 存三个分量：时间戳、thread ID、rollout ID。普通情况下二者相同，文件名只编码一个 ID；被 revert 过的线程会在稳定的 thread ID 之后追加下划线和另一个 rollout ID。[@ref-codex-cli-transcripts-naming-file-name] 渲染规则用 `[year]-[month]-[day]T[hour]-[minute]-[second]`，相同则 `rollout-{timestamp}-{thread_id}.jsonl`，不同则 `rollout-{timestamp}-{thread_id}_{rollout_id}.jsonl`。[@ref-codex-cli-transcripts-naming-file-name-render]

项目路径与父/子、分支关系不进文件名，而是落在每条记录的首条 `SessionMeta` 里：`forked_from_id`、`forked_from_ordinal_exclusive`、`parent_thread_id`、`cwd`。[@ref-codex-cli-transcripts-schema-session-meta-head] 跨文件的历史衔接由 `history_base` 表达；`RolloutLineage` 是本地唯一跟随该指针的抽象，读取方消费它给出的有界 rollout 区间，自己不解析也不修改 fork 指针。[@ref-codex-cli-transcripts-naming-lineage]

## JSONL 记录格式与记录类型 {#transcripts-jsonl-format-and-schema}

### 格式

每行是一个 `RolloutLine`：`timestamp`（`[year]-[month]-[day]T[hour]:[minute]:[second].[subsecond digits:3]Z`，UTC）、可选的 `ordinal`，以及 `#[serde(flatten)]` 展平的 `item`。展平意味着 `type` 标签与 payload 字段在同一层对象上。源码特意不给 `RolloutLine` 实现 `Deserialize`，要求 JSONL 读取方走 `codex_rollout` 的规范解析器，以免展平信封里的嵌套小数被破坏。[@ref-codex-cli-transcripts-format-envelope]

写入方式是追加：打开时 `OpenOptions` 用 `read(true).append(true).create(true)`，并调用 `ensure_rollout_is_newline_terminated` 保证已有文件以换行结尾；打开前先 `materialize_rollout_for_append_blocking`，即已压缩的 `.jsonl.zst` 会先物化回明文再追加。[@ref-codex-cli-transcripts-format-append-open] 每行 `serde_json::to_string` 后追加 `'\n'` 并 `flush`。[@ref-codex-cli-transcripts-format-line-write] 没有分片机制；分片靠"每线程一个文件"。

压缩是自动的后台行为，不需要用户开关。`spawn_rollout_compression_worker` 是 fire-and-forget 作业，失败只记日志、不阻塞启动，靠 `codex_home` 下的 run marker 防止重叠或过于频繁。[@ref-codex-cli-transcripts-format-compression-worker] 冷热判定是文件 mtime 距今至少 7 天（`MIN_ROLLOUT_AGE`），压缩级别 zstd 3，产物后缀 `.jsonl`，临时后缀 `.tmp`，run marker 文件名 `rollout-compression.lock`，run marker 6 小时后视为过期，单次 worker 最长 5 小时、最多 2 个并发作业。[@ref-codex-cli-transcripts-format-compression-constants][@ref-codex-cli-transcripts-format-compression-cold-file] `sessions` 与 `archived_sessions` 两个根都参与压缩；压缩后的文件仍可被同一个读取器透明读取。回读路径我没有逐行核对压缩后 ordinal 的续写逻辑，这里不断言。

### 记录类型

`RolloutItem` 的第一方变体是：`SessionMeta`、`ResponseItem`、`InterAgentCommunication`、`InterAgentCommunicationMetadata`、`Compacted`、`TurnContext`、`TokenUsageRecord`、`WorldState`、`SecurityRiskScore`、`RetainedContext`、`EventMsg`、`RealtimeItem`。[@ref-codex-cli-transcripts-schema-item-types] 每个 rollout 的第一行是 `SessionMeta`，其必填字段包括 `session_id`（等于根线程 ID）、`id`、`timestamp`、`cwd`、`originator`、`cli_version`，可选字段包括 `forked_from_id`、`forked_from_ordinal_exclusive`、`parent_thread_id`、`creator_user_id`、`creator_account_id`、`runtime_workspace_roots`、`thread_source`、`agent_nickname`、`agent_role`、`agent_path`、`model_provider`、`base_instructions`、`dynamic_tools`、`selected_capability_roots`、`memory_mode`、`multi_agent_version`、`context_window`。[@ref-codex-cli-transcripts-schema-session-meta-head] 历史模式相关的四个字段是 `history_mode`（`legacy`/`paginated`，`#[serde(default)]`）、`history_base`、`subagent_history_start_ordinal` 与 `multi_agent_version`。[@ref-codex-cli-transcripts-schema-session-meta-history]

脱敏最小示例（占位值，只保留一个 `SessionMeta` 行加一条消息行）：

```jsonl
{"timestamp":"2025-05-07T17:24:21.000Z","type":"session_meta","payload":{"id":"00000000-0000-4000-8000-000000000000","session_id":"00000000-0000-4000-8000-000000000000","timestamp":"2025-05-07T17:24:21.000Z","cwd":"/path/to/project","originator":"codex_cli_rs","cli_version":"CLI_VERSION","history_mode":"paginated"}}
{"timestamp":"2025-05-07T17:24:22.000Z","ordinal":1,"type":"response_item","payload":{"type":"message","role":"user","content":[{"type":"input_text","text":"REDACTED_USER_INPUT"}]}}
```

版本迁移在固定 commit 里是显式命令而非自动升级：`migrate_rollouts.rs` 的 `MigrateRolloutsCommand` 带 `--apply`，文档说明 "Publish the migration. Without this flag the command only reports eligible sessions."，可配 `--thread`、`--max-mib-per-second`、`--json`、`--verbose`。[@ref-codex-cli-transcripts-schema-migration-command] `codex migrate-rollouts` 在子命令枚举中的描述是 "Inspect or migrate legacy local sessions to paginated thread history."。[@ref-codex-cli-transcripts-lifecycle-cli-subcommands]

仍缺的 schema 缺口（照实列出，不跨产品归纳）：

- `ResponseItem` 各变体的完整字段级定义在 `codex-rs/protocol/src/models.rs`，本文只固定了"哪些变体会落盘"，没有逐变体核对必填字段与可选字段。
- `EventMsg` 被保留分支的 payload 结构（`TurnItem`、`TurnContextItem`、`TokenUsageRecord`、`WorldStateItem` 等）没有逐个核对字段。
- `CompactedItem`、`HistoryPosition`、`ThreadHistoryMode` 的完整字段未核对；`HistoryPosition` 的定义不在本文引用的行区间内。
- 官方文档快照没有给出 rollout JSONL 的 schema 文档；`config-schema.json` 只覆盖 `config.toml`，因此本文没有"官方公布的记录 schema"可对照。

## 记录生命周期 {#transcripts-lifecycle}

创建发生在 `precompute_new_rollout_path`：先按本地时间算出 `sessions/YYYY/MM/DD/rollout-….jsonl`，再由 `RolloutRecorderParams` 构造 `SessionMeta`。[@ref-codex-cli-transcripts-location-rollout-path] 写入端是独立的后台任务 `rollout_writer`：条目先进入内存队列 `pending_items`，只有成功写出后才从队列移除；`persist()` 物化文件并落盘全部缓冲条目，注释写明它是幂等的，物化失败时条目留在内存里、可由后续 `persist()` 或 `flush()` 重试。[@ref-codex-cli-transcripts-lifecycle-recorder-api] I/O 失败时 writer 丢弃文件句柄进入恢复模式，条目继续保留待重试；`flush()` 等到写入被 writer 任务确认后才返回。

恢复按 thread ID 定位：`find_thread_path_by_id_str` 在 `sessions` 子目录里找该 thread 最新的 rollout 文件，优先用 SQLite 返回的路径，回退到文件系统按文件名匹配；注释明确 "A thread normally has one rollout file."，而 `thread/revert` 保持 thread ID 不变、创建新 rollout 文件并把线程切过去，所以回退匹配会取 `_rollout-id` 后缀之前的稳定 thread ID 并选最新的匹配文件名。[@ref-codex-cli-transcripts-lifecycle-find-thread] 归档态另有 `find_archived_thread_path_by_id_str` 在 `archived_sessions` 里找。

分支与子代理：`fork` 保留 `forked_from_id` 与 `forked_from_ordinal_exclusive`（注释说 "Revert may replace the physical history base while retaining this fork boundary"），子代理通过 `parent_thread_id` 与 `subagent_history_start_ordinal` 表达"自己的投影历史从哪一条 ordinal 开始，之前的记录只是继承的模型上下文"。[@ref-codex-cli-transcripts-schema-session-meta-head][@ref-codex-cli-transcripts-schema-session-meta-history] 跨文件的历史由 `history_base` 串起，由 `RolloutLineage` 解析成有界区间。[@ref-codex-cli-transcripts-naming-lineage]

上下文压缩后的延续由 `Compacted` 记录表达：源码注释 "Persist Codex executive markers so we can analyze flows (e.g., compaction, API turns)."，与 `TurnContext`、`TokenUsageRecord`、`WorldState`、`RetainedContext`、`SecurityRiskScore`、`SessionMeta` 一并无条件持久化，压缩不结束当前 rollout 文件。[@ref-codex-cli-transcripts-scope-persisted-items]

并发控制靠 `$CODEX_HOME/thread-writer-locks/` 下以 thread ID 命名的 `.lock` 文件 的文件锁，协调锁是同目录的 `.coordination.lock`；活跃写入者会让 `acquire` 返回 `WouldBlock`，锁的注释说 "Shared cross-process ownership for local thread writers and rollout publication"。[@ref-codex-cli-transcripts-lifecycle-writer-lock]

剩余缺口：`codex resume` 的选择器交互（cwd 过滤、`--last`、`--all`）我在子命令枚举层见到 `Fork` 的 `--all` 说明 cwd 过滤，但 `Resume` 的具体读取顺序没有逐层核对；进程退出时最后一次刷盘的确切触发点（是 writer 任务 `shutdown` 还是调用方 `flush`）也没有在固定来源中直接确认。压缩后继续追加时 ordinal 是否从原值续写，同样未逐行核对。

## 状态数据库与索引分工 {#transcripts-state-database}

会话正文在 rollout JSONL 里，SQLite 存元数据与索引。`state_5.sqlite` 的 `threads` 表建表语句包含 `id`、`rollout_path`、`created_at`、`updated_at`、`source`、`model_provider`、`cwd`、`title`、`sandbox_policy`、`approval_mode`、`tokens_used`、`has_user_event`、`archived`、`archived_at`、`git_sha`、`git_branch`、`git_origin_url`；没有任何消息或工具输出的列。[@ref-codex-cli-transcripts-database-threads-table] 也就是说 `rollout_path` 是数据库指向正文文件的指针，`threads` 表可以在没有 rollout 文件时独立存在。

分工是"文件是真相、库是索引"：`backfill_sessions` 从 `codex_home` 扫描 rollout 文件并把会话元数据补进状态库，带一个带租约的 worker 声明，状态为 `Complete` 时直接返回，避免重复 worker。[@ref-codex-cli-transcripts-database-backfill][@ref-codex-cli-transcripts-database-backfill-lease] 因此删库之后数据库可重建；反过来删 rollout 文件，库里会留下指向缺失文件的行，这也是 doctor 的 parity 检查存在的理由。

恢复策略写在 `SqliteConfig` 打开路径上：连接后做一次限时 100 ms 的 quick check，判定 `CorruptedNeedsFixed` 时，若该库的恢复模式是 `BackupAndRebuild`，先关连接、`backup_runtime_db_for_fresh_start` 把损坏文件备份走，再重新连接并重建。[@ref-codex-cli-transcripts-database-recovery] 重建是"重新建库"而不是"修库"，所以损坏库里的索引信息会丢，正文以 rollout 文件为准仍在。

同一 `sqlite_home` 下还有 `thread_history_1.sqlite`、`logs_2.sqlite`、`goals_1.sqlite`、`memories_1.sqlite`、`queue_1.sqlite`。[@ref-codex-cli-transcripts-location-sqlite-db-files] 其中哪些表是"恢复会话所必需"、哪些只是派生索引，本文没有逐一验证：`thread-store/src/local/thread_history.rs` 会打开 `thread_history_db_path`，但我没有确认它是恢复的硬依赖还是分页历史的缓存。

缺口：迁移文件 `codex-rs/state/migrations/` 已有 59 个（到 `0059_thread_attachment_reverse_lookup.sql`），但除 `0001_threads.sql` 外我没有逐表核对哪些列承载会话恢复所需信息；`SQLITE_HOME_ENV` 的环境变量名常量值我只在调用点看到符号名，没有取到字面量，因此上文只写符号而不写环境变量名。

## 归档、备份、移动与删除 {#transcripts-archive-and-cleanup}

原生归档是移动而非复制。`codex archive` 与 `codex unarchive` 接受会话 id 或名称，子命令描述分别是 "Archive a saved session by id or session name." 与 "Unarchive a saved session by id or session name."。[@ref-codex-cli-transcripts-lifecycle-cli-subcommands] 归档实现把目标线程的 rollout 文件从 `sessions` 树 `std::fs::rename` 到 `codex_home/archived_sessions`，`archived_sessions` 目录按需创建；文件名前先经 `validated_rollout_file_name` 与 `scoped_rollout_path` 校验，确保目标确实在该线程的 `sessions` 范围内，随后调 `mark_archived` 写库；任何一步失败都会 `restore_rollout_moves` 把已移动的文件搬回去。[@ref-codex-cli-transcripts-archive-move]

归档前必须先取得该线程的生命周期锁、活跃写入锁和跨进程 writer 锁；若 `live_recorders` 里还有该 thread 的活跃 recorder，直接返回 `Conflict`，消息是 "thread {thread_id} already has an active writer"。[@ref-codex-cli-transcripts-archive-writer-conflict] 也就是说归档与仍在写入的会话互斥。

删除是硬删除且顺序固定。`delete_thread.rs` 的模块注释写明："Existing rollout files are deleted before this operation reports success. A rollout file that vanishes after discovery counts as already deleted. Main state DB rows are deleted after every associated rollout is removed, under the same lifecycle lock, so queued artifact mutations cannot use deleted thread metadata. Host-owned data is cleaned after reference and writer checks, before removing rollouts, so cleanup failures remain retryable even without a state DB."[@ref-codex-cli-transcripts-cleanup-delete-semantics] 实现顺序是：生命周期锁 → 活跃写入锁 → 扫描引用索引 → 检查外部引用 → 取 writer 锁 → 宿主数据清理 → 删除 rollout → 删除状态库行。[@ref-codex-cli-transcripts-cleanup-delete-order] 用户入口是 `codex delete`，带 `--force` 免确认，且注释要求 "SESSION must be a UUID"。

保留机制只有一处自动化：`history.max_bytes` 让 `history.jsonl` 超限时丢弃最旧条目。[@ref-codex-cli-transcripts-history-max-bytes-doc][@ref-codex-cli-transcripts-scope-history-settings] 对 rollout 文件本身，固定来源里没有"按天/按大小保留最近 N 个"的官方开关；7 天年龄阈值来自压缩 worker 而非清理。压缩与 legacy 迁移这类"用重命名覆盖 rollout 路径"的作业共享 `$CODEX_HOME/.tmp/rollout-maintenance.lock` 的进程级非阻塞文件锁，注释明确它与 per-thread writer 锁、与压缩的 run marker 是三件不同的事。[@ref-codex-cli-transcripts-cleanup-maintenance-lock]

缺口与不做推断的地方：

- 归档的"可移植性损失"没有任何官方说明。源码只做同机同 `codex_home` 树内的 rename；跨机器复制 `.jsonl` 或 `archived_sessions` 后是否仍能 resume、固定 commit 没有可引用的证据，本文不写结论。
- 级联范围只见于归档路径：归档父线程时会一并移动后代线程的 rollout，失败按 warn 记录；删除路径的级联范围（`ensure_no_external_references` 检查的是"别的线程是否引用了它"）我没有读完，因此不写"删除父线程会级联删子线程"。
- 手动 `rm` rollout 文件后的孤儿行、索引漂移、以及由此触发的修复路径没有在固定来源中确认。`history.jsonl` 没有对应的删除命令，也没有官方保留窗口。

## 定位、完整性与排错 {#transcripts-diagnostics}

读记录本身不需要 Codex 工具。recorder 的类型文档给出直接查看方式：rollout 是 JSONL，可用 `jq -C .` 或 `fx` 读 `~/.codex/sessions/` 下的 `rollout-` 前缀记录文件。[@ref-codex-cli-transcripts-diagnostics-read-example] 压缩后的 `.jsonl.zst` 用同一路径族，注意归档文件不在 `sessions` 下而在 `archived_sessions` 下。

`codex doctor` 有两个直接相关的检查。`state.paths`（category `state`）先报 `CODEX_HOME`、log dir、`sqlite home` 的路径可读性，再对 `runtime_db_paths()` 里每个库做完整性检查，并附上 rollout 统计；三种摘要分别是 "state paths and databases are inspectable"、"some database integrity checks exceeded their time limit"、"state database integrity check failed"。[@ref-codex-cli-transcripts-diagnostics-state-check] 状态为 `Fail` 时它给出的修复建议是：把损坏的 SQLite 库移开，然后重启交互式 CLI 或 app server 让它重建该运行时库；同一段文字还提示 "Other entry points may not rebuild automatically."，这一点与上文"删除状态库可由 rollout 重建"是同一机制的两面。

`state.rollout_db_parity`（category `threads`）比对 rollout 文件与 SQLite 线程清单，源码注释是 "Doctor check that compares rollout files against the SQLite thread inventory."；扫描有上限 `MAX_PARITY_SCAN_FILES = 10_000`，每个文件只读前 `MAX_ROLLOUT_HEADER_LINES = 64` 行，样本最多 5 条、摘要最多 8 条，状态库缺失时按"跳过比对"处理而不是判失败。[@ref-codex-cli-transcripts-diagnostics-parity-check] 这就是排查"库里能列出线程但 resume 不到"的第一入口。[@ref-codex-cli-transcripts-lifecycle-cli-subcommands]

缺口：`codex doctor` 的 `DoctorCommand` 完整参数集合我没有逐项核对（源码里可见 `--feedback` 影响检查预算），因此不写各 flag 的确切语义；`thread_inventory` 的具体告警文案与"发现漂移后是否自动修复"没有确认，本文只把它当作检测手段。
