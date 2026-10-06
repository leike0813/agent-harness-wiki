---
schema_version: 3
record_kind: production
edition_id: grok-cli-local_transcripts-v1
harness_id: grok
topic: local_transcripts
title: "Grok Build CLI 的本地 Transcript：会话记录、恢复、清理与诊断"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-sessions-what-are, ref-grok-lt-doc-sessions-persistence-format, ref-grok-lt-doc-sessions-metadata, ref-grok-lt-src-export-updates-source, ref-grok-lt-src-session-file-names, ref-grok-lt-src-remote-writeback, ref-grok-lt-src-summary-fields-core]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-sessions-what-are, ref-grok-lt-doc-sessions-storage-layout, ref-grok-lt-doc-config-file-locations, ref-grok-lt-doc-config-paths-env, ref-grok-lt-src-grok-home-resolution, ref-grok-lt-src-grok-home-cached, ref-grok-lt-src-sessions-cwd-dir, ref-grok-lt-src-encode-cwd-dirname, ref-grok-lt-src-ensure-sessions-cwd-dir, ref-grok-lt-src-session-dir-owner-only, ref-grok-lt-src-subagent-meta-path, ref-grok-lt-src-rewind-checkpoint-store, ref-grok-lt-src-compaction-artifacts, ref-grok-lt-src-session-file-names]
  - section_id: transcripts-format-and-schema
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-sessions-persistence-format, ref-grok-lt-doc-sessions-metadata, ref-grok-lt-src-session-file-names, ref-grok-lt-src-atomic-write, ref-grok-lt-src-jsonl-append-heal, ref-grok-lt-src-summary-fields-core, ref-grok-lt-src-summary-fields-fork, ref-grok-lt-src-summary-format-version, ref-grok-lt-src-chat-history-version, ref-grok-lt-src-persisted-info]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-sessions-delete-command, ref-grok-lt-doc-sessions-resume-tui, ref-grok-lt-doc-sessions-resume-cli, ref-grok-lt-doc-sessions-headless-flags, ref-grok-lt-doc-sessions-worktree, ref-grok-lt-src-persisted-info, ref-grok-lt-src-jsonl-append-heal, ref-grok-lt-src-summary-fields-fork, ref-grok-lt-src-compaction-artifacts, ref-grok-lt-src-rewind-checkpoint-store, ref-grok-lt-src-subagent-meta-path, ref-grok-lt-src-session-last-activity]
  - section_id: transcripts-database-index
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-sessions-persistence-format, ref-grok-lt-doc-sessions-subcommand, ref-grok-lt-doc-config-file-locations, ref-grok-lt-src-session-search-index, ref-grok-lt-src-session-search-recovery, ref-grok-lt-src-active-sessions, ref-grok-lt-src-persisted-info, ref-grok-lt-src-delete-local-evict, ref-grok-lt-src-remote-writeback, ref-grok-lt-src-delete-session-remote-first]
  - section_id: transcripts-retention-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-config-cleanup-ttl, ref-grok-lt-doc-sessions-delete-command, ref-grok-lt-doc-sessions-persistence-format, ref-grok-lt-doc-sessions-storage-layout, ref-grok-lt-src-cleanup-ttl-days, ref-grok-lt-src-cleanup-swept-dirs, ref-grok-lt-src-cleanup-prune-blobs, ref-grok-lt-src-session-last-activity, ref-grok-lt-src-delete-session-admin, ref-grok-lt-src-delete-session-remote-first, ref-grok-lt-src-delete-local-evict, ref-grok-lt-src-summary-fields-core, ref-grok-lt-src-export-updates-source, ref-grok-lt-src-remote-writeback, ref-grok-lt-src-rewind-checkpoint-store, ref-grok-lt-src-persisted-info]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-grok-lt-doc-sessions-grok-du, ref-grok-lt-doc-sessions-subcommand, ref-grok-lt-doc-sessions-usage-subcommand, ref-grok-lt-src-session-repair, ref-grok-lt-src-session-search-recovery, ref-grok-lt-src-cleanup-swept-dirs, ref-grok-lt-src-grok-home-resolution, ref-grok-lt-src-session-file-names]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: answered
        source_refs: [ref-grok-lt-doc-sessions-what-are, ref-grok-lt-doc-sessions-metadata, ref-grok-lt-src-export-updates-source, ref-grok-lt-src-session-file-names, ref-grok-lt-src-remote-writeback]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-grok-lt-doc-sessions-what-are, ref-grok-lt-doc-sessions-storage-layout, ref-grok-lt-doc-config-file-locations, ref-grok-lt-doc-config-paths-env, ref-grok-lt-src-grok-home-resolution, ref-grok-lt-src-grok-home-cached, ref-grok-lt-src-sessions-cwd-dir, ref-grok-lt-src-encode-cwd-dirname, ref-grok-lt-src-ensure-sessions-cwd-dir, ref-grok-lt-src-session-dir-owner-only, ref-grok-lt-src-subagent-meta-path, ref-grok-lt-src-rewind-checkpoint-store, ref-grok-lt-src-compaction-artifacts]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-grok-lt-src-sessions-cwd-dir, ref-grok-lt-src-encode-cwd-dirname, ref-grok-lt-src-ensure-sessions-cwd-dir, ref-grok-lt-doc-sessions-storage-layout, ref-grok-lt-src-subagent-meta-path]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: answered
        source_refs: [ref-grok-lt-doc-sessions-persistence-format, ref-grok-lt-src-session-file-names, ref-grok-lt-src-atomic-write, ref-grok-lt-src-jsonl-append-heal]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: partial
        source_refs: [ref-grok-lt-src-summary-fields-core, ref-grok-lt-src-summary-fields-fork, ref-grok-lt-src-summary-format-version, ref-grok-lt-src-chat-history-version, ref-grok-lt-src-session-file-names]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-grok-lt-doc-sessions-delete-command, ref-grok-lt-doc-sessions-resume-tui, ref-grok-lt-doc-sessions-resume-cli, ref-grok-lt-doc-sessions-headless-flags, ref-grok-lt-doc-sessions-worktree, ref-grok-lt-src-persisted-info, ref-grok-lt-src-jsonl-append-heal, ref-grok-lt-src-summary-fields-fork, ref-grok-lt-src-compaction-artifacts, ref-grok-lt-src-subagent-meta-path, ref-grok-lt-src-session-last-activity]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-index
        status: answered
        source_refs: [ref-grok-lt-doc-sessions-persistence-format, ref-grok-lt-src-session-search-index, ref-grok-lt-src-persisted-info, ref-grok-lt-src-active-sessions]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-cleanup
        status: partial
        source_refs: [ref-grok-lt-src-export-updates-source, ref-grok-lt-src-remote-writeback, ref-grok-lt-src-rewind-checkpoint-store]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-cleanup
        status: answered
        source_refs: [ref-grok-lt-doc-config-cleanup-ttl, ref-grok-lt-doc-sessions-delete-command, ref-grok-lt-src-cleanup-ttl-days, ref-grok-lt-src-cleanup-swept-dirs, ref-grok-lt-src-cleanup-prune-blobs, ref-grok-lt-src-session-last-activity, ref-grok-lt-src-delete-session-admin, ref-grok-lt-src-delete-session-remote-first, ref-grok-lt-src-delete-local-evict]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-grok-lt-doc-sessions-grok-du, ref-grok-lt-doc-sessions-subcommand, ref-grok-lt-doc-sessions-usage-subcommand, ref-grok-lt-src-session-repair, ref-grok-lt-src-session-search-recovery, ref-grok-lt-src-cleanup-swept-dirs, ref-grok-lt-src-grok-home-resolution]
---

Grok Build CLI 把每个会话完整落盘为本地文件树，**没有**「是否记录会话」的开关：TUI、headless 与 ACP stdio 三种入口都在会话期间自动写入同一套文件 [@ref-grok-lt-doc-sessions-what-are]。本章的固定来源只有一处——Git 仓库 `https://github.com/xai-org/grok-build.git` 的 commit `2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8`（本轮巡检 HEAD 与基线相同，观察时间 2026-10-06T04:34:03Z），证据全部是该提交下的 `crates/codegen/...` 源码与同提交内的 `docs/user-guide/` 用户指南。项目根的 `archive/grok/` 在本轮不可用，因此本轮**没有**任何 `archived_document` 证据，只用 `git_source_file`。源码 commit 只代表源码树，不代表任何已发布 npm 包的二进制行为；本章不建立任何 `mappings/`，也不把这里的结论外推到 `docs.x.ai` 未归档页面或未来版本。所有路径以 `$GROK_HOME` 为基准书写，`$GROK_HOME` 默认解析为用户主目录下的 `.grok`。

## 记录范围与记录开关 {#transcripts-scope}

会话记录覆盖的不只是对话文本，而是一整套恢复与展示所需的产物 [@ref-grok-lt-doc-sessions-what-are]：用户提示与助手回复、工具调用及其结果、TODO/任务列表状态、用于撤销的 rewind 点、token 用量与 turn 计数，以及启用子代理时的子代理会话。

按介质分工，两个 JSONL 各司其职：

- `updates.jsonl` 是**权威会话日志**，每行是一条自包含的 ACP session update 事件（对话 + 工具调用），`/resume` 与会话恢复由它驱动 [@ref-grok-lt-doc-sessions-storage-layout]。
- `chat_history.jsonl` 是**发给模型侧的原始消息**。会话导出走 `updates.jsonl` 而不是它，因为后者「只服务于 LLM API 调用」[@ref-grok-lt-src-export-updates-source]。
- `tool_definitions.json` 记录最近一次模型调用下发的 function tools，但**不含** MCP 的 `server__tool` 条目——模型是通过 `search_tool` / `use_tool` 触达它们的 [@ref-grok-lt-doc-sessions-metadata]。

**不落盘或不进会话目录的内容**：诊断日志另在 `~/.grok/logs/`（例如 `unified.jsonl` 与 MCP server 日志），与 `sessions/` 树并列，不属于会话记录 [@ref-grok-lt-doc-config-file-locations]。每个工作目录还有一份输入历史 `prompt_history.jsonl`，位于该 cwd 组目录内，属输入历史而非会话正文。媒体附件落在会话目录的 `images/`、`videos/`、`downloads/` 与终端日志目录下 [@ref-grok-lt-src-cleanup-swept-dirs]。文件名的单一事实源是 `storage/mod.rs` 里的常量表，另有 `plan_mode.json`、`usage.json`、`goal/state.json`、`announcement_state.json` 等本轮未逐项调查的状态文件 [@ref-grok-lt-src-session-file-names]。

**记录开关**：本轮固定来源里没有找到关闭会话持久化的配置键或环境变量；可关闭的只有两条独立的出站链路——遥测 trace 上传（`GROK_TELEMETRY_TRACE_UPLOAD`）与反馈开关，它们不改变本地落盘行为。会话写回后端（`save_session_data`）是**尽力而为**的后台同步，其源码明确写着「pending buffered messages are lost」是可以接受的，因为「local JSONL files are the source of truth」[@ref-grok-lt-src-remote-writeback]。

## 存储位置、目录命名与权限 {#transcripts-storage-layout}

### 基准目录

`$GROK_HOME` 非空时**原样**使用，否则取主目录下的 `.grok`（经 `dunce` 规范化，避免 Windows `\\?\` 前缀）；主目录取自 `std::env::home_dir()`，即 Unix 的 `HOME`、Windows 的 `USERPROFILE` [@ref-grok-lt-src-grok-home-resolution]。文档侧同一事实以环境变量表给出：`GROK_HOME` 覆盖配置目录，默认 `~/.grok` [@ref-grok-lt-doc-config-paths-env]。解析结果在进程内 `OnceLock` 缓存并按需创建目录，缺失时回落到 `default_grok_home()` [@ref-grok-lt-src-grok-home-cached]。因此 `sessions/` 的实际落点是 `$GROK_HOME/sessions/`，官方用户指南把这一层描述为「按工作目录组织的持久会话」[@ref-grok-lt-doc-config-file-locations]。

### 分组与命名

会话按工作目录分组，分组名由 `encode_cwd_dirname` 生成：先做 URL 编码；编码后超过 255 字节时改用 `{slug}-{blake3_hex16}` 紧凑形式（恒不超过 57 字节）[@ref-grok-lt-src-encode-cwd-dirname]。短路径形式可由目录名反解；哈希形式必须在组目录内写 `.cwd` 文件保存原始工作目录，`ensure_sessions_cwd_dir` 用 `create_new`（`O_CREAT|O_EXCL`）加 fsync 写入以避免并发启动的 TOCTOU [@ref-grok-lt-src-ensure-sessions-cwd-dir]。组目录路径的唯一形状来源是 `sessions_cwd_dir_in`：`grok_home()/sessions/{encode_cwd_dirname(cwd)}` [@ref-grok-lt-src-sessions-cwd-dir]。

会话目录自身的文件名是 session ID：官方文档说明它是 UUIDv7（客户端可用 `-s` 自带 ID），并把 `~/.grok/sessions/{encoded-cwd}/{session-id}/` 列为完整布局 [@ref-grok-lt-doc-sessions-what-are]。

### 目录内容与附件

单个会话目录内的文件清单以官方布局给出（`summary.json`、`updates.jsonl`、`chat_history.jsonl`、`system_prompt.txt`、`prompt_context.json`、`tool_definitions.json`、`plan.json`、`rewind_points.jsonl`、`signals.json`、`feedback.jsonl` 等）[@ref-grok-lt-doc-sessions-storage-layout]。

两处**落在会话目录之外、但恢复会话仍需要**的状态值得单独记：

- 子代理：子代理会话本体在正常的 sessions 树里，父会话目录下的 `subagents/{subagent-id}/meta.json` 只是元数据；TUI 侧按 `grok_home/sessions/{encode(parent_cwd)}/{parent_session_id}/subagents/{id}/meta.json` 这个精确路径读取它 [@ref-grok-lt-src-subagent-meta-path]。
- rewind 检查点：`checkpoint_store` 把每个 finalize 后的 `RewindCheckpoint` 镜像到**会话工作树内部**的 `{cwd}/.grok/rewind-checkpoints/{session_id}/checkpoint-{prompt_index}.json`（配一份 `.gitignore` 忽略 `*`），每会话默认保留 64 个，超出按 `prompt_index` 淘汰最旧的 [@ref-grok-lt-src-rewind-checkpoint-store]。压缩产物则落在会话目录内：`compaction_checkpoints/{id}.json` [@ref-grok-lt-src-compaction-artifacts]。

**权限**：`sessions/` 下的目录一律以 Unix `0700` 出生（用 `DirBuilder` 的 mode 避免 umask 窗口），并在每次 touch 时重新 chmod 自愈；失败只记 debug 日志，因为 FAT、部分网络挂载上永远无法修复 [@ref-grok-lt-src-session-dir-owner-only]。Windows 上跳过 chmod。

**已知缺口**：本轮没有在固定来源里找到 `sessions/` 目录整体的 relocation / symlink 迁移的完整说明（源码里有 `storage/relocation` 模块，本轮未逐项核实其触发条件）；也没有找到 macOS 与 Windows 各自的等价路径实测结论。

## 落盘格式、写入方式与记录 schema {#transcripts-format-and-schema}

### 格式与写入

会话正文是 JSONL：`updates.jsonl` 每行一个自包含 ACP session update，会话期间**只追加**；小状态文件 `summary.json`、`plan.json`、`signals.json` 是普通 JSON [@ref-grok-lt-doc-sessions-persistence-format]。文件名常量表在 `storage/mod.rs` 中作为单一事实源 [@ref-grok-lt-src-session-file-names]。

两种写入方式并存：

- **整文件替换**用「写唯一命名的同目录临时文件再 rename」完成，并同时 fsync 新文件与父目录；失败时删除临时文件，崩溃或并发写者都不会留下被截断的文件 [@ref-grok-lt-src-atomic-write]。
- **JSONL 追加**不是崩溃原子的：进程被 kill 或 `ENOSPC` 打断 `write_all` 会让文件尾部残留一条**没有换行符的部分记录**。因此追加前先检查最后一个字节，若不是 `\n` 就先补一个换行，把撕裂记录封成单独一条损坏行；随后在 append 锁下以 `O_APPEND` 打开写入 [@ref-grok-lt-src-jsonl-append-heal]。

### `summary.json` 的字段

`Summary` 结构体是索引条目的字段事实源，核心字段包括 `info`（session ID 与工作目录）、`session_summary`、`created_at` / `updated_at`、`num_messages` / `num_chat_messages`、`current_model_id`、`parent_session_id`（fork 或 restore 的来源会话）、`forked_at`、`collection_id` 与 `next_trace_turn` [@ref-grok-lt-src-summary-fields-core]。fork / 子代理相关字段在同一结构里继续：`prompt_display_cwd`、`session_kind`（`"fork"`、`"subagent"`、`"subagent_fork"` …）、`fork_context_source`（`"new"` 或 `"forked"`）与 `fork_parent_prompt_id` [@ref-grok-lt-src-summary-fields-fork]。同一结构还带 `last_active_at`、`generated_title`、`title_is_manual`、`worktree_label`、`sandbox_profile`、`reasoning_effort`、`context_window`、`last_turn_summary`、`last_recap` 等，均为 `Option` 且 `skip_serializing_if` 为空时不写出。

### 版本迁移

`summary.json` 里有显式的 `chat_format_version` 字段，`0` 表示旧的 `ChatRequestMessage` 格式、`1` 表示 `ConversationItem` 格式，缺省为 `0` [@ref-grok-lt-src-summary-format-version]。仓库内随附 `chat-history-downgrade` 二进制把 v1 行降级为 v0，用于数据处理管线 [@ref-grok-lt-src-chat-history-version]。

### 脱敏的最小记录示例

`summary.json`（占位值）：

```json
{
  "info": { "id": "{session-id}", "cwd": "{absolute-workspace-path}" },
  "session_summary": "",
  "created_at": "{RFC3339 UTC}",
  "updated_at": "{RFC3339 UTC}",
  "num_messages": 0,
  "num_chat_messages": 0,
  "current_model_id": "{model-id}",
  "chat_format_version": 1
}
```

`updates.jsonl` 每行的形状是 ACP `session/update` 通知的 JSON-RPC 包装（`{"method":"session/update","params":{…}}`），由 `export.rs` 的 `AcpJsonRpcNotification` 定义 [@ref-grok-lt-src-export-updates-source]。

### schema 缺口（照实列出）

固定来源没有给出 `updates.jsonl` 内 ACP session update 各变体（agent message chunk、tool call、tool update 等）的完整字段表与必填项——它把 wire 格式的所有权留给 `agent_client_protocol` 外部 crate，本仓库不复制。`chat_history.jsonl` 的 `ConversationItem` 各变体字段表同样来自 `xai_grok_sampling_types`，本轮未在固定提交内逐项抄录。缺少跨 `chat_format_version` 之外的整体版本迁移规则与向后兼容承诺。因此 `transcripts.schema` 记 `partial`。

## 创建、追加、恢复、分支与延续 {#transcripts-lifecycle}

- **创建**：TUI 每次启动创建一个新会话，`/new`（别名 `/clear`）显式开始新会话 [@ref-grok-lt-doc-sessions-delete-command]。`-s/--session-id` 只用于**创建**新会话的 UUID，不恢复既有会话（旧的无声 upsert 行为已移除）；`-s` 只有与 `-r`/`-c` 且同时传 `--fork-session` 时才用来命名 fork 出的子会话 UUID [@ref-grok-lt-doc-sessions-headless-flags]。
- **追加**：每条更新追加进 `updates.jsonl`、每条模型侧消息追加进 `chat_history.jsonl`，追加路径带撕裂修复与追加锁 [@ref-grok-lt-src-jsonl-append-heal]。
- **恢复**：`/resume` 打开会话选择器（列出当前 workspace 的近期会话，边输入边按标题与正文内容过滤）；命令行 `grok --resume {id-or-title}`、headless 的 `-r/--resume` 与 `-c/--continue`、ACP 的 `session/load` 都走同一份存储 [@ref-grok-lt-doc-sessions-resume-tui][@ref-grok-lt-doc-sessions-resume-cli]。恢复走 `load_light`：它把 `summary`、`chat_history`、`plan_state`、`plan_mode_state`、`signals`、`announcement_state`、`goal_mode_state`、`workflow_runs` 与 `rewind_points_file_path` 装进 `PersistedInfo`，并**不**把 `updates.jsonl` 读进内存，而是给出文件路径供流式回放 [@ref-grok-lt-src-persisted-info]。若本地命中 `NotFound`，会尝试从后端拉取后再落回本地加载 [@ref-grok-lt-src-persisted-info]。
- **分支**：`/fork` 从会话副本生成同级 agent，`summary.json` 用 `parent_session_id` + `forked_at` + `session_kind` 记录关系 [@ref-grok-lt-doc-sessions-worktree][@ref-grok-lt-src-summary-fields-fork]。worktree 会话用 `grok -w -r {session-id}` 在全新 worktree 中恢复 [@ref-grok-lt-doc-sessions-worktree]。
- **交给子代理**：子代理会话是正常 sessions 树里的独立会话目录，父侧只留 `subagents/{id}/meta.json` [@ref-grok-lt-src-subagent-meta-path]。
- **压缩后延续**：`/compact` 与自动压缩把状态写入 `compaction_checkpoints/{id}.json`；压缩请求/响应、recap 请求/响应也各自落文件，用于离线提示迭代 [@ref-grok-lt-src-compaction-artifacts]。压缩产物依赖会话目录，因此压缩后延续仍以同一会话目录为准。
- **活跃度标记**：每次 attach 会 `mark_session_live` 触碰 `summary.json` 的 mtime 以重置「最后活动」，而仅做加载不会改写它 [@ref-grok-lt-src-session-last-activity]。
- **删除即生命周期终点**：`/delete` 确认后永久移除会话历史并回到欢迎屏 [@ref-grok-lt-doc-sessions-delete-command]。

## 数据库、索引与辅助状态的分工 {#transcripts-database-index}

会话正文**不用数据库**。正文与状态是上文的 JSONL 与 JSON 文件 [@ref-grok-lt-doc-sessions-persistence-format]。数据库只承担可重建的检索缓存：

- **会话全文索引**是 `{grok home}/sessions/session_search.sqlite`，一个**可重建的** SQLite FTS5 缓存。分层为：`fts` 拥有 schema、BM25 查询与受 fence 的 `meta` 写入；`recovery` 判定不可用文件、隔离并重建空库；`doc` 把会话与抽取文本转成索引文档；`bootstrap` 在租约保护下做全量重建；`manager` 去抖 per-session upsert 并应答查询。该 crate **从不直接读会话存储**——调用方提供 `SessionSource` 与 `ContentExtractor`，从而让 `updates.jsonl` 的 wire 格式仍由存储层独占 [@ref-grok-lt-src-session-search-index]。
- **活跃会话登记**是 `~/.grok/active_sessions.json`（配 `active_sessions.lock` 与 `.tmp`）：干净退出会移除条目，崩溃会留下残迹，下次 `register` 会剪掉 PID 已死的条目 [@ref-grok-lt-src-active-sessions]。它是并发/诊断用的辅助状态，不是会话正文。

**恢复所必需的文件**：由 `PersistedInfo` 与存储层常量表判定——`summary.json`、`updates.jsonl`、`chat_history.jsonl`、`plan.json`、`plan_mode.json`、`signals.json`、`rewind_points.jsonl`、`usage.json`、`goal/state.json`、`announcement_state.json` [@ref-grok-lt-src-persisted-info][@ref-grok-lt-src-session-file-names]。`session_search.sqlite` 与 `active_sessions.json` 都不在其中：前者可由 `bootstrap` 全量重建 [@ref-grok-lt-src-session-search-index]，后者每次 attach 重新登记。

**云端副本**：非 ZDR 场景下 `RemoteSync` 会把 ACP 通知 best-effort 推送到后端，源码把它定位成「本地 JSONL 是真源」的镜像，缓冲溢出且网络失败时丢弃最旧消息 [@ref-grok-lt-src-remote-writeback]。本地加载 `NotFound` 时会尝试从远端拉取 [@ref-grok-lt-src-persisted-info]。

## 保留、清理与删除 {#transcripts-retention-and-cleanup}

### 官方保留机制

会话保留由 `[storage] cleanup_ttl_days` 一个键控制：会话空闲达到该天数后其目录被删除；活跃会话中比该天数更旧的媒体与终端日志被剪除；**未设置或 `0` 即关闭清理** [@ref-grok-lt-doc-config-cleanup-ttl]。解析上要求该键为正整数；配置加载失败时返回 `None`（不扫、不回落默认 TTL），日志为 `SESSION_CLEANUP_SKIPPED: …` [@ref-grok-lt-src-cleanup-ttl-days]。

扫描只在一次 attach 时用 `Once` 触发一次，且从不整目录删除 mid-attach 的 live 会话目录；活跃会话内**只**扫四个 blob 目录（`images`、`videos`、`downloads`、终端日志目录），因为其余是 write-once 产物、其自身年龄不能说明是否还需要 [@ref-grok-lt-src-cleanup-swept-dirs]。剪枝只删过期**普通文件**，绝不 `rmdir`，因为写者可能正处在 `create_dir_all` 与 `persist` 之间 [@ref-grok-lt-src-cleanup-prune-blobs]。「最后活动」取会话目录内所有普通文件 mtime 的最新值（没有则取目录自身 mtime），`updates.jsonl` 每次追加、`mark_session_live` 每次触碰都会推高它 [@ref-grok-lt-src-session-last-activity]。

### 官方删除

`/delete` 确认后永久删除当前会话历史 [@ref-grok-lt-doc-sessions-delete-command]；`/resume` 列表中按 `d` 再 `y`，Agent Dashboard 上 `Ctrl+X` 两次也走同一条路径。删除的实现顺序在源码里写得很明确：若 `needs_remote` 为真，**远端删除先执行且具权威性**，真实失败会在任何本地改动之前中止，避免行重新出现；`404` 视为已消失，保持幂等并继续本地清理 [@ref-grok-lt-src-delete-session-remote-first]。`needs_remote` 的判定是「agent 处于 writeback 存储 **且** 当前登录不是 ZDR 团队」，并且删除前会先 teardown 可能仍在收尾的活会话 [@ref-grok-lt-src-delete-session-admin]。本地侧随后删除会话目录，并从 FTS 索引驱逐该 session 行（未指明 cwd 时也驱逐，因为那一行比目录活得久、无人其它清理）；删除后再排队一次索引更新，避免在途 upsert 把行写回来 [@ref-grok-lt-src-delete-local-evict]。

### 手动删除的后果

固定来源没有提供「离线手动删文件后如何让索引自愈」的公开保证。可确证的是：

- 直接删掉 `summary.json` 会使该会话不再出现在列表中（列表按 mtime 扫 summary 文件），但 `updates.jsonl` 等孤儿文件留在原地；由于 `session_last_activity` 会把目录内所有普通文件的最新 mtime 计入，孤立残留**不会被** TTL 清扫单独识别为可回收 [@ref-grok-lt-src-session-last-activity]。
- 手动删 `session_search.sqlite` 不会丢正文：该文件是可重建缓存，下次 bootstrap 全量重建 [@ref-grok-lt-src-session-search-index]。
- **删除前必须停止的写入者**是仍附着在该会话上的 grok 进程。官方删除路径显式调用 `teardown_live_session_before_delete` 才能保证目录不再被写；手动删文件绕过了这一步，且 `prune_blob_dirs` 的注释说明写者可能正处在建目录与落盘之间 [@ref-grok-lt-src-delete-session-admin][@ref-grok-lt-src-cleanup-prune-blobs]。
- **级联**：删除父会话不会自动删除 fork 出来的子会话目录——关系只以 `parent_session_id` 记录，没有源码显示父删除会级联。

**归档（`transcripts.archive`）记 `partial`**：源码里有走云端存储的会话分享与 trace 上传路径（`ExportedMessage` 以 `updates.jsonl` 为真源 [@ref-grok-lt-src-export-updates-source]），`RemoteSync` 是后端写回 [@ref-grok-lt-src-remote-writeback]，rewind 检查点是磁盘镜像 [@ref-grok-lt-src-rewind-checkpoint-store]；但固定来源没有给出「导出会话为单个归档文件」的用户可见开关、归档文件清单或跨机恢复的损失说明。因此不能断言归档可移植性，只能说：**目前没有可证的原生归档开关**，外部备份的可靠做法是整棵复制会话目录（必需文件见上一节）。

## 定位、完整性与排错 {#transcripts-diagnostics}

- **先定位 grok home**：`$GROK_HOME` 优先，否则 `{home}/.grok`；源码还保留了「本次解析来自 env 还是 home」的判定类型，用于诊断中回答「为什么 grok 选了这个目录」 [@ref-grok-lt-src-grok-home-resolution]。
- **看占用**：`grok du`（别名 `grok disk-usage`）报告 grok home 的磁盘占用，按最大优先列出每个顶层目录，再列出各 worktree 的 size/type/age/label/path；registry 未跟踪的 worktree 记为 `untracked`，`--json` 给出同样数据 [@ref-grok-lt-doc-sessions-grok-du]。这是判断「会话树有多大」的首选入口。
- **列出与搜索**：`grok sessions list` 列出当前工作目录的会话（按 worktree 标签分组，含 session ID、创建与更新日期、source status、summary），`grok sessions search "{keyword}"` 匹配标题与提示词 [@ref-grok-lt-doc-sessions-subcommand]。搜索的索引损坏时走 `recovery` 分类 → 隔离 → 重建空库，并用递增 epoch 让调用方能看出「索引文件被换过」 [@ref-grok-lt-src-session-search-recovery]。
- **读用量而非读文件**：`grok usage {session-id}` 打印持久化的 token 与成本汇总（JSON，含 `sessionId`、`updatedAt`、`session`、`turns`），文档明确说「用它代替直接读会话文件」 [@ref-grok-lt-doc-sessions-usage-subcommand]。
- **修历史损坏**：当 `chat_history.jsonl` 出现撕裂或粘连行，导致 `tool_result` 找不到所属 `tool_call`、每次请求都 400 时，走 `x.ai/session/repair` 带 `dryRun` 先看报告；常驻会话走 `RepairHistory` 与会话活动串行、turn 中途会被拒绝，非常驻会话用原子 `replace_chat_history` 直接改盘 [@ref-grok-lt-src-session-repair]。
- **清扫是否跑过**：清扫只在 attach 时一次性触发，未设置 TTL 时日志为 `SESSION_CLEANUP_SKIPPED: no positive [storage] cleanup_ttl_days`，配置加载失败则是 `SESSION_CLEANUP_SKIPPED: config load failed`；文件名常量表可用于核对一个会话目录是否被削去了文件 [@ref-grok-lt-src-cleanup-swept-dirs][@ref-grok-lt-src-session-file-names]。

**`transcripts.diagnostics` 记 `partial`** 的原因：清理与修复路径在源码里只有 `tracing` 日志目标名，固定来源没有公开这些日志的检索方式或稳定字段；也没有可证的官方「校验会话完整性」命令。上面给出的是能定位到具体文件与符号的入口，不是完整诊断手册。

## 本章未调查与边界

- 未调查 `memory/` 跨会话记忆的存储（`~/.grok/memory/` 与其独立索引）——它不是会话记录，属于 `local_transcripts` 之外的依赖 [@ref-grok-lt-doc-config-file-locations]。
- 未审计 `~/.grok/logs/` 下的内部日志、`crash/` 转储与遥测落盘细节。
- 未建立任何 `mappings/`：源码 commit 不证明任何 npm 发行包版本的行为。
- 未在 Windows 或 macOS 上执行验证；本轮所有运行期结论限定为源码所示的跨平台逻辑，实际路径形态由 `dunce` / `home_dir()` 的平台分支决定 [@ref-grok-lt-src-grok-home-resolution]。