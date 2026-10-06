---
schema_version: 3
record_kind: production
edition_id: amazon-q-local_transcripts-v1
harness_id: amazon-q
topic: local_transcripts
title: "Amazon Q Developer CLI 的本地会话记录：落盘范围、存储布局、schema、生命周期、归档与清理"
sections:
  - section_id: lt-source-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-workspace-default-members, ref-amazon-q-lt-agent-crate-stub-main, ref-amazon-q-lt-state-struct-head, ref-amazon-q-lt-state-struct-transcript, ref-amazon-q-lt-state-struct-checkpoint, ref-amazon-q-lt-history-entry, ref-amazon-q-lt-user-message-struct, ref-amazon-q-lt-assistant-message-enum, ref-amazon-q-lt-user-env-context, ref-amazon-q-lt-build-env-state, ref-amazon-q-lt-env-state-fields, ref-amazon-q-lt-request-metadata-fields, ref-amazon-q-lt-push-assistant-persist, ref-amazon-q-lt-compact-autocompact-setting]
  - section_id: lt-storage-layout
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-state-struct-head, ref-amazon-q-lt-create-checkpoint, ref-amazon-q-lt-db-path-static, ref-amazon-q-lt-db-open-permissions, ref-amazon-q-lt-global-dirs, ref-amazon-q-lt-shadow-repo-path, ref-amazon-q-lt-shadow-repo-per-conversation, ref-amazon-q-lt-workspace-dirs, ref-amazon-q-lt-todo-id-path, ref-amazon-q-lt-agent-file-path, ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-tangent-checkpoint-struct, ref-amazon-q-lt-checkpoint-manager-struct, ref-amazon-q-lt-conversations-ddl, ref-amazon-q-lt-set-entry, ref-amazon-q-lt-append-transcript, ref-amazon-q-lt-history-limits, ref-amazon-q-lt-trim-history, ref-amazon-q-lt-persist-save]
  - section_id: lt-database
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-migration-list, ref-amazon-q-lt-table-enum, ref-amazon-q-lt-conversations-ddl, ref-amazon-q-lt-json-entry-helpers, ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-resume-by-cwd, ref-amazon-q-lt-global-dirs]
  - section_id: lt-record-schema
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-history-entry, ref-amazon-q-lt-user-message-struct, ref-amazon-q-lt-assistant-message-enum, ref-amazon-q-lt-request-metadata-fields, ref-amazon-q-lt-user-env-context, ref-amazon-q-lt-env-state-fields, ref-amazon-q-lt-state-struct-head, ref-amazon-q-lt-state-struct-transcript, ref-amazon-q-lt-state-struct-checkpoint, ref-amazon-q-lt-checkpoint-manager-struct, ref-amazon-q-lt-agent-execution-schema]
  - section_id: lt-lifecycle
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-resume-flag, ref-amazon-q-lt-resume-by-cwd, ref-amazon-q-lt-push-assistant-persist, ref-amazon-q-lt-compact-call, ref-amazon-q-lt-replace-with-summary, ref-amazon-q-lt-compact-autocompact-setting, ref-amazon-q-lt-trim-history, ref-amazon-q-lt-create-checkpoint, ref-amazon-q-lt-checkpoint-manager-struct, ref-amazon-q-lt-tangent-checkpoint-struct, ref-amazon-q-lt-slash-tangent-persist, ref-amazon-q-lt-agent-file-path, ref-amazon-q-lt-agent-execution-schema]
  - section_id: lt-archive-cleanup
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-slash-tangent-persist, ref-amazon-q-lt-persist-save, ref-amazon-q-lt-persist-load-parse, ref-amazon-q-lt-persist-load-assign, ref-amazon-q-lt-global-dirs, ref-amazon-q-lt-shadow-repo-path, ref-amazon-q-lt-checkpoint-drop-cleanup, ref-amazon-q-lt-checkpoint-clean-command, ref-amazon-q-lt-state-clear, ref-amazon-q-lt-clear-execute, ref-amazon-q-lt-slash-clear-compact, ref-amazon-q-lt-json-entry-helpers, ref-amazon-q-lt-db-open-permissions]
  - section_id: lt-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amazon-q-lt-diagnostics-fields, ref-amazon-q-lt-migration-list, ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-get-conversation-by-path, ref-amazon-q-lt-db-path-static, ref-amazon-q-lt-agent-file-path, ref-amazon-q-lt-todo-id-path, ref-amazon-q-lt-todo-save, ref-amazon-q-lt-shadow-repo-per-conversation]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: lt-source-scope
        status: partial
        source_refs: [ref-amazon-q-lt-state-struct-head, ref-amazon-q-lt-state-struct-transcript, ref-amazon-q-lt-state-struct-checkpoint, ref-amazon-q-lt-history-entry, ref-amazon-q-lt-user-message-struct, ref-amazon-q-lt-assistant-message-enum, ref-amazon-q-lt-user-env-context, ref-amazon-q-lt-build-env-state, ref-amazon-q-lt-env-state-fields, ref-amazon-q-lt-request-metadata-fields, ref-amazon-q-lt-push-assistant-persist, ref-amazon-q-lt-compact-autocompact-setting]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: lt-storage-layout
        status: partial
        source_refs: [ref-amazon-q-lt-db-path-static, ref-amazon-q-lt-db-open-permissions, ref-amazon-q-lt-global-dirs, ref-amazon-q-lt-shadow-repo-path, ref-amazon-q-lt-shadow-repo-per-conversation, ref-amazon-q-lt-workspace-dirs, ref-amazon-q-lt-todo-id-path, ref-amazon-q-lt-agent-file-path]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: lt-storage-layout
        status: answered
        source_refs: [ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-state-struct-head, ref-amazon-q-lt-shadow-repo-per-conversation, ref-amazon-q-lt-todo-id-path, ref-amazon-q-lt-agent-file-path, ref-amazon-q-lt-tangent-checkpoint-struct, ref-amazon-q-lt-checkpoint-manager-struct, ref-amazon-q-lt-create-checkpoint]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: lt-storage-layout
        status: answered
        source_refs: [ref-amazon-q-lt-conversations-ddl, ref-amazon-q-lt-set-entry, ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-append-transcript, ref-amazon-q-lt-history-limits, ref-amazon-q-lt-trim-history, ref-amazon-q-lt-persist-save]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: lt-record-schema
        status: partial
        source_refs: [ref-amazon-q-lt-history-entry, ref-amazon-q-lt-user-message-struct, ref-amazon-q-lt-assistant-message-enum, ref-amazon-q-lt-request-metadata-fields, ref-amazon-q-lt-user-env-context, ref-amazon-q-lt-env-state-fields, ref-amazon-q-lt-state-struct-head, ref-amazon-q-lt-state-struct-transcript, ref-amazon-q-lt-state-struct-checkpoint, ref-amazon-q-lt-checkpoint-manager-struct, ref-amazon-q-lt-agent-execution-schema]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: lt-lifecycle
        status: answered
        source_refs: [ref-amazon-q-lt-resume-flag, ref-amazon-q-lt-resume-by-cwd, ref-amazon-q-lt-push-assistant-persist, ref-amazon-q-lt-compact-call, ref-amazon-q-lt-replace-with-summary, ref-amazon-q-lt-compact-autocompact-setting, ref-amazon-q-lt-trim-history, ref-amazon-q-lt-create-checkpoint, ref-amazon-q-lt-checkpoint-manager-struct, ref-amazon-q-lt-tangent-checkpoint-struct, ref-amazon-q-lt-slash-tangent-persist, ref-amazon-q-lt-agent-file-path, ref-amazon-q-lt-agent-execution-schema]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: lt-database
        status: partial
        source_refs: [ref-amazon-q-lt-migration-list, ref-amazon-q-lt-table-enum, ref-amazon-q-lt-conversations-ddl, ref-amazon-q-lt-json-entry-helpers, ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-resume-by-cwd, ref-amazon-q-lt-global-dirs]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: lt-archive-cleanup
        status: answered
        source_refs: [ref-amazon-q-lt-slash-tangent-persist, ref-amazon-q-lt-persist-save, ref-amazon-q-lt-persist-load-parse, ref-amazon-q-lt-persist-load-assign, ref-amazon-q-lt-global-dirs, ref-amazon-q-lt-shadow-repo-path, ref-amazon-q-lt-checkpoint-drop-cleanup]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: lt-archive-cleanup
        status: partial
        source_refs: [ref-amazon-q-lt-state-clear, ref-amazon-q-lt-clear-execute, ref-amazon-q-lt-slash-clear-compact, ref-amazon-q-lt-json-entry-helpers, ref-amazon-q-lt-checkpoint-clean-command, ref-amazon-q-lt-checkpoint-drop-cleanup, ref-amazon-q-lt-db-open-permissions]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: lt-diagnostics
        status: partial
        source_refs: [ref-amazon-q-lt-diagnostics-fields, ref-amazon-q-lt-migration-list, ref-amazon-q-lt-set-conversation-by-path, ref-amazon-q-lt-db-path-static, ref-amazon-q-lt-agent-file-path, ref-amazon-q-lt-todo-id-path, ref-amazon-q-lt-shadow-repo-per-conversation]
---

## 固定来源与记录范围 {#lt-source-scope}

本章的固定来源是官方仓库 `aws/amazon-q-developer-cli`（提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`，抓取时间 2026-10-06T04:32:39Z），全部结论只覆盖 `cli` 界面在该提交源码树上的行为。本轮没有为本产品保留官方文档原件，因此本章不引用任何 AWS 用户指南页面，也不写发行包版本的行为判断。

先说明一个边界。同一 workspace 里有两个相关 crate，但工作区根 `Cargo.toml` 的 `default-members` 只有 `crates/chat-cli` [@ref-amazon-q-lt-workspace-default-members]；`crates/agent` 的 `main.rs` 目前只有一句 `println!("Hello, world!")`，`cli` 模块被整段注释掉 [@ref-amazon-q-lt-agent-crate-stub-main]。本章讲的会话记录实现全部在 `crates/chat-cli` 下。`configuration` 章节引用的 `crates/agent/src/agent/util/directories.rs` 属于这个尚未接入二进制的 crate，下一节会说明它与本章路径结论的差异。

**transcripts.scope**：`q chat` 的会话正文以**整段会话状态 JSON**的形式落在一个 SQLite 行里，不是逐条事件流。落盘的对象是 `ConversationState`，字段包括 `conversation_id`、`next_message`、`history`、`valid_history_range`、`transcript`、`tools`、`context_manager`、`file_line_tracker`、`model_info`、`checkpoint_manager`、`mcp_enabled` 与 `tangent_state` [@ref-amazon-q-lt-state-struct-head][@ref-amazon-q-lt-state-struct-transcript][@ref-amazon-q-lt-state-struct-checkpoint]。其中：

- `history` 是 `VecDequeHistoryEntry`，每个元素是一轮对话，固定由一条 user 消息、一条 assistant 消息和一个可选的 `request_metadata` 组成 [@ref-amazon-q-lt-history-entry]。user 消息带 `additional_context`、`env_context`、`content`、`timestamp`、`images` [@ref-amazon-q-lt-user-message-struct]；assistant 消息是两个变体：纯回复 `Response{message_id, content}` 或带工具调用的 `ToolUse{message_id, content, tool_uses}` [@ref-amazon-q-lt-assistant-message-enum]。
- `transcript` 是并行的人类可读字符串队列，用户输入前缀 `> `，助手输出追加 `[Tool uses: ...]` 行；它不参与发往后端的请求 [@ref-amazon-q-lt-state-struct-transcript]。
- `request_metadata` 保存每次请求的 `request_id`、`message_id`、起止时间戳、`time_to_first_chunk`、chunk 间隔数组、prompt 与 response 的字节数、`tool_use_ids_and_names`、`model_id` 和 `message_meta_tags` [@ref-amazon-q-lt-request-metadata-fields]。
- 每条 user 消息带一份环境快照。快照结构是 `EnvState`，含 `operating_system`、`current_working_directory`、`environment_variables` 三项 [@ref-amazon-q-lt-env-state-fields]；但构造器 `build_env_state()` 只填前两项（cwd 被截断），`environment_variables` 保持为空数组 [@ref-amazon-q-lt-build-env-state][@ref-amazon-q-lt-user-env-context]。也就是说，按这份源码构造的消息里不含环境变量取值。

不会落盘的内容有两类。第一类是**尚未被助手确认的输入**：`push_assistant_message` 先把 `next_message` 取走、再把整个状态写库，因此库里的值中该字段恒为空 [@ref-amazon-q-lt-push-assistant-persist]。用户刚输入、还没等到回复就退出的那一轮不在记录里。第二类是标了 `#[serde(skip)]` 的运行时句柄：`tool_manager` 与 `agents` 明确跳过序列化，恢复时要重建 [@ref-amazon-q-lt-state-struct-transcript]。

关于记录开关：写库发生在 `push_assistant_message` 里，调用处没有条件判断 [@ref-amazon-q-lt-push-assistant-persist]。但**是否存在关闭落盘的设置项或环境变量，本轮没有正面证据**——我逐项看过设置键枚举（`crates/chat-cli/src/database/settings.rs`）和环境变量常量表（`crates/chat-cli/src/util/consts.rs`），其中与对话相关的只有 `chat.defaultModel`、`chat.disableAutoCompaction`、`chat.enableHistoryHints` 等，前者选模型、后者影响自动摘要而非是否落盘 [@ref-amazon-q-lt-compact-autocompact-setting]。这两处枚举本身未生成本章引用，因此“完全不存在关闭开关”这一判断按 partial 记录，缺口是无法用登记来源正面排除未来版本新增开关。

边界声明：遥测上报、`qlog` 日志目录和 token 用量统计不在本章范围内。同一数据库里的 `history` 表虽然与 `conversations` 同库，但记的是 shell 命令历史而不是会话正文，见下一节和 `lt-database`。

## 存储位置、命名与格式 {#lt-storage-layout}

**transcripts.location**：会话正文的唯一落点是 SQLite 文件 `dirs::data_local_dir()/amazon-q/data.sqlite3`，路径由 `GlobalPaths::database_path_static()` 拼出 [@ref-amazon-q-lt-db-path-static]。打开数据库时会创建缺失的父目录，并在 Unix 上把文件权限强制为 `0600` [@ref-amazon-q-lt-db-open-permissions]。

围绕它的会话相关存储有三类。

一是 checkpoint 的影子仓库，位于用户级 `~/.aws/amazonq/cli-checkouts/{会话ID}`：全局常量 `SHADOW_REPO_DIR` 定义为 `.aws/amazonq/cli-checkouts` [@ref-amazon-q-lt-global-dirs]，解析函数返回该目录并拼接 `conversation_id` [@ref-amazon-q-lt-shadow-repo-path][@ref-amazon-q-lt-shadow-repo-per-conversation]。

二是工作区级的会话辅助记录，都相对当前工作目录：to-do 列表 `.amazonq/cli-todo-lists/{todo_id}.json`、委派子代理状态 `.amazonq/.subagents/{agent名}.json`，两者都由 workspace 常量声明 [@ref-amazon-q-lt-workspace-dirs][@ref-amazon-q-lt-todo-id-path][@ref-amazon-q-lt-agent-file-path]。

三是同一用户目录下的其它文件——bash 历史、旧的全局上下文、旧 profile 目录、知识库目录 [@ref-amazon-q-lt-global-dirs]。它们与会话正文无关，只用于说明“改数据目录”会连带影响哪些东西。

路径随什么变化：键是当前工作目录，因此**同一项目的不同子目录各有一份独立记录**，换目录就换一份；换机器则因为绝对路径不同而读不到原记录。这两点在下面 naming 一节展开。

两处需要如实标出的缺口。其一，这条路径在本提交里**没有环境变量覆盖入口**：`GlobalPaths::database_path_static()` 直接调用 `dirs::data_local_dir()`，函数体内没有任何读取环境变量的分支 [@ref-amazon-q-lt-db-path-static]。`configuration` 章节记录的 `Q_CLI_DATA_DIR` 覆盖来自 `crates/agent/src/agent/util/directories.rs`，其中的 `database_path()` 在本工作区内没有调用方。这属于章节间的文档漂移，本章以本节所引源码为准。其二，`dirs::data_local_dir()` 与 `dirs::home_dir()` 的各平台取值来自 `dirs` crate 而非本仓库，Windows 与 macOS 的具体目录无法在本轮从固定来源核实，故 `transcripts.location` 记 partial。

**transcripts.naming**：命名规则本身是确定的。

- `conversations` 表的主键**不是会话 ID，也不是文件名，而是当前工作目录的 UTF-8 路径字符串本身**；读写接口直接以路径字符串作键 [@ref-amazon-q-lt-set-conversation-by-path]。同文件注释写明非 UTF-8 路径需要额外编码，因此当前实现遇到非 UTF-8 的 cwd 时直接放弃写入。
- 会话 ID 是启动时生成的 UUID v4，存在于值内部而非键 [@ref-amazon-q-lt-state-struct-head]，它唯一的结构性用途是作为影子仓库目录名 [@ref-amazon-q-lt-shadow-repo-per-conversation]。
- to-do 列表的 id 是自 Unix 纪元起的毫秒时间戳字符串，文件名为 `{todo_id}.json` [@ref-amazon-q-lt-todo-id-path]；子代理状态文件名为 `{agent名}.json`，键是 agent 名 [@ref-amazon-q-lt-agent-file-path]。
- **父子会话在源码里没有对应关系**：委派出去的子代理执行状态是独立文件，不在 `conversations` 行内 [@ref-amazon-q-lt-agent-file-path]。
- **分支**由两个机制在同一个值内部表达。一是 tangent 模式：`ConversationCheckpoint` 保存 `main_history`、`main_next_message`、`main_transcript`、`main_latest_summary` 和进入时间戳 [@ref-amazon-q-lt-tangent-checkpoint-struct]。二是 checkpoint：`Checkpoints` 是按时间排列的向量，每个 checkpoint 带 `tag`、本地时间戳、描述和 `history_snapshot`，并用 `tag_index` 做 tag 到下标的快查 [@ref-amazon-q-lt-checkpoint-manager-struct]；tag 在每个 turn 内递增（如 `3`、`3.1`）[@ref-amazon-q-lt-create-checkpoint]。

**transcripts.format**：格式为 SQLite 数据库中的 UTF-8 文本列。建表语句是 `CREATE TABLE conversations (key TEXT PRIMARY KEY, value TEXT)` [@ref-amazon-q-lt-conversations-ddl]；值由 `serde_json::to_string` 序列化成紧凑 JSON 存入 [@ref-amazon-q-lt-set-conversation-by-path]。写入语义是 `INSERT OR REPLACE` 的**整行覆盖**——不是追加，没有分片，没有压缩，旧值被直接替换 [@ref-amazon-q-lt-set-entry]。

长度上限有两处常量与逻辑。`MAX_CONVERSATION_STATE_HISTORY_LEN` 为 10000，可读 transcript 队列超限就丢掉最旧一条 [@ref-amazon-q-lt-history-limits][@ref-amazon-q-lt-append-transcript]；`history` 的裁剪条件是 `(len * 2) > 10000 - 6`，此时从最旧的、第二条不带工具结果的 user 消息开始整体截断，找不到合法起点时清空并把待发消息换成“历史已溢出”的提示 [@ref-amazon-q-lt-trim-history]。这两条都是**内存里的裁剪**，不是写盘时截断；写盘的是裁剪后的当前状态。

唯一会额外产出文件的格式是 `/persist save`，它写的是 `serde_json::to_string_pretty` 的缩进 JSON 单文件 [@ref-amazon-q-lt-persist-save]，见归档一节。

## 数据库与恢复依赖 {#lt-database}

**transcripts.database**：确实用数据库，且一个文件承载多类互相独立的状态。启动时按内嵌的 8 个 SQL 迁移建库：`000_migration_table`、`001_history_table`、`002_drop_history_in_ssh_docker`、`003_improved_history_timing`、`004_state_table`、`005_auth_table`、`006_make_state_blob`、`007_conversations_table` [@ref-amazon-q-lt-migration-list]。按代码里的表分类，实际使用的四张是：

| 表 | 内容 | 与会话正文的关系 |
|---|---|---|
| `conversations` | `key`=cwd 路径，`value`=会话状态 JSON | 会话正文本体 [@ref-amazon-q-lt-conversations-ddl] |
| `state` | key/value，value 是 BLOB | 设置、profile、变更日志展示次数等持久应用状态 [@ref-amazon-q-lt-table-enum] |
| `auth_kv` | key/value | 凭据 [@ref-amazon-q-lt-table-enum] |
| `history` | shell 命令、cwd、起止时间、退出码 | **不是**会话正文，是 CLI 执行过的 shell 命令历史 [@ref-amazon-q-lt-migration-list] |

版本迁移只作用于表结构：`Database::migrate()` 读出已执行的最大版本，把未执行的迁移在一个事务里跑完并写 `migrations` 表 [@ref-amazon-q-lt-migration-list]。**会话值本身没有版本字段，也没有任何针对 `value` 的迁移脚本**，只有结构层面靠 `#[serde(default)]`、`skip_serializing_if` 做的向前兼容。

读写都经由同一对按路径取放的接口，值在两侧都是 `ConversationState` 的 JSON [@ref-amazon-q-lt-set-conversation-by-path]；这些 key/value 表的通用访问只有 `get_entry`/`set_entry` 与其上的 `get_json_entry`/`set_json_entry`/`delete_entry` 一层封装 [@ref-amazon-q-lt-json-entry-helpers]。

分工与恢复必需项：`conversations` 中的那一行是恢复会话正文的唯一来源，恢复时整行反序列化为 `ConversationState` [@ref-amazon-q-lt-resume-by-cwd]。`state` 与 `auth_kv` 不是正文恢复的必需项——恢复流程会用它们补齐 profile、模型、MCP 开关与 agent，profile 已不存在时会打印错误并回退到默认 agent [@ref-amazon-q-lt-resume-by-cwd]。checkpoint 的影子仓库与 `Checkpoints` 元数据分工明确：历史快照存在 `conversations` 的值里，**文件内容快照存在影子 git 仓库里** [@ref-amazon-q-lt-global-dirs]，两者缺一都会让 `/checkpoint restore` 不完整。

不能确定的部分：`conversations` 表有 `key` 主键，源码里没有为 `value` 建索引、没有设置 WAL 或其他 PRAGMA，连接走 r2d2 池。因此“删库之后能否重建会话内容”在固定来源里**没有答案**——迁移只保证新库会带上这张空表，没有任何从其它地方重建 `value` 的路径。该题记 partial。

## 记录类型与 schema {#lt-record-schema}

**transcripts.schema**：第一方记录类型是三个 Rust 结构加上它们内嵌的枚举，全部可从固定来源逐字段读出。

顶层 `ConversationState` [@ref-amazon-q-lt-state-struct-head][@ref-amazon-q-lt-state-struct-transcript][@ref-amazon-q-lt-state-struct-checkpoint]：

```json
{
  "conversation_id": "{uuid-v4}",
  "next_message": null,
  "history": [],
  "valid_history_range": [0, 0],
  "transcript": [],
  "tools": {},
  "context_manager": null,
  "context_message_length": null,
  "latest_summary": null,
  "model_info": null,
  "file_line_tracker": {},
  "checkpoint_manager": null,
  "mcp_enabled": true,
  "tangent_state": null
}
```

上例是按源码字段与 serde 属性重建的**最小形状**，不是从真实库导出的记录；`model`、`model_info`、`tangent_state` 标了 `skip_serializing_if = "Option::is_none"`，为 `None` 时字段直接缺席，`model` 字段被注释为仅用于兼容 `<= v1.13.3` 的反序列化 [@ref-amazon-q-lt-state-struct-checkpoint]。

一轮对话的形状 [@ref-amazon-q-lt-history-entry][@ref-amazon-q-lt-user-message-struct][@ref-amazon-q-lt-assistant-message-enum]：

```json
{
  "user": {
    "additional_context": "",
    "env_context": { "env_state": { "operating_system": "linux", "current_working_directory": "/workspace/{项目目录}", "environment_variables": [] } },
    "content": { "Prompt": { "prompt": "<用户输入>" } },
    "timestamp": null,
    "images": null
  },
  "assistant": {
    "ToolUse": {
      "message_id": "{utterance_id}",
      "content": "<助手文本>",
      "tool_uses": []
    }
  },
  "request_metadata": null
}
```

每条 user 消息都带 `env_context`，它序列化为只含 `env_state` 的对象，而 `env_state` 的类型是 `EnvState`，字段为 `operating_system`、`current_working_directory`、`environment_variables` [@ref-amazon-q-lt-user-env-context][@ref-amazon-q-lt-env-state-fields]。

要点：`content` 是外部标记的枚举，序列化后是 `{"Prompt": {...}}`、`{"CancelledToolUses": {...}}` 或 `{"ToolUseResults": {...}}`；assistant 消息同理是 `{"Response": {...}}` 或 `{"ToolUse": {...}}` [@ref-amazon-q-lt-user-message-struct][@ref-amazon-q-lt-assistant-message-enum]。工具结果元素是 `ToolUseResult`，含 `tool_use_id`、`content`（文本或 JSON 块）、`status`。`request_metadata` 可为 `null`，非空时含前述请求计数字段 [@ref-amazon-q-lt-request-metadata-fields]。

两个附属记录类型：`CheckpointManager` 自身也被序列化进这个值里，字段为 `shadow_repo_path`、`work_tree_path`、`checkpoints`、`tag_index`、`current_turn`、`tools_in_turn`、`pending_user_message`、`message_locked`、`file_stats_cache` [@ref-amazon-q-lt-checkpoint-manager-struct]。委派子代理的执行记录是独立 JSON，字段为 `agent`、`task`、`status`（Running/Completed/Failed）、`launched_at`、`completed_at`、`pid`、`exit_code`、`output`、`user_notified`、`summary`、`cwd`，全部带默认值以容忍旧文件 [@ref-amazon-q-lt-agent-execution-schema]。

仍然缺的 schema 细节，照实列出：没有官方 JSON Schema 文件可对照；`value` 没有版本号，跨版本兼容性只能靠 Rust 字段上的 serde 属性推断；`RequestMetadata.chat_conversation_type` 等枚举的具体取值集合、`context_manager` 内部的序列化形状、`tools` 的键（`ToolOrigin`）取值集合本轮未逐一核实。因此该题记 partial。

## 生命周期：创建、落盘、恢复、压缩、分支与委派 {#lt-lifecycle}

**transcripts.lifecycle** 的机制链在固定来源里是完整的。

**创建**：每次进入 `q chat` 都会生成一个新的 UUID v4 会话 ID，无论是否恢复 [@ref-amazon-q-lt-resume-flag]。命令行开关是 `--resume` / `-r`，文档串明确写着“Resumes the previous conversation from this directory” [@ref-amazon-q-lt-resume-flag]。

**恢复**：带 `--resume` 时按当前工作目录取回那一行，反序列化为 `ConversationState`；只有 `history` 非空的记录才会被采纳——源码注释说明这是为了避免“清空后未聊天就退出”的边界情形 [@ref-amazon-q-lt-resume-by-cwd]。恢复后运行时相关字段被换成本次会话的：`tool_manager`、`mcp_enabled`、`model_info` 重新赋值，并调用 `update_state(true)` 与 `enforce_tool_use_history_invariants()` 修正工具调用历史 [@ref-amazon-q-lt-resume-by-cwd]。注意恢复用的是库里那份 `conversation_id`，本次新生成的 ID 被丢弃。

**追加与刷盘**：唯一的写盘点是 `push_assistant_message`——它把待发用户消息与助手消息配成一条 `HistoryEntry` 推入 `history`，然后在拿到 `current_dir()` 后整行覆盖写库 [@ref-amazon-q-lt-push-assistant-persist]。没有显式的 flush 或退出前写入点，也没有关闭时的 checkpoint 落盘。因此进程在助手回复完成前被中断时，本轮输入与已产生的部分输出都不会进入记录。

**上下文压缩后延续**：`/compact` 会生成摘要，然后调用 `replace_history_with_summary`，把 `history` 截到尾部 `messages_to_exclude` 条并把摘要存进 `latest_summary` [@ref-amazon-q-lt-compact-call][@ref-amazon-q-lt-replace-with-summary]。上下文窗口溢出时会自动走同一条路径；命令自带的长帮助写明关闭开关是 `q settings chat.disableAutoCompaction true` [@ref-amazon-q-lt-compact-autocompact-setting]。若压缩之后历史仍超限，`enforce_conversation_invariants` 会按固定阈值继续裁剪最旧的对话对 [@ref-amazon-q-lt-trim-history]。换言之压缩后延续的是摘要加尾部消息，而不是原始全文——被丢弃的部分在库里也已经不存在。

**checkpoint 分支**：实验开关是 `chat.enableCheckpoint`，未开启时 `/checkpoint` 直接拒绝执行。每个 checkpoint 会在影子仓库里 stage、commit、打 tag，再把当时的 `history` 克隆进 `history_snapshot` [@ref-amazon-q-lt-create-checkpoint]；turn 级 checkpoint 的 tag 重复时会移到向量末尾以维持顺序 [@ref-amazon-q-lt-create-checkpoint]。`CheckpointManager` 自身带 `shadow_repo_path`、`work_tree_path`、`checkpoints`、`tag_index` 等字段并整体参与序列化 [@ref-amazon-q-lt-checkpoint-manager-struct]，因此恢复会话时 checkpoint 列表与历史快照会一并回来。

**隔离分支**：`tangent_state` 在进入 tangent 模式时对主历史做一次内存检查点，退出时整体还原，`/tangent tail` 额外保留最后一条 user/assistant 配对 [@ref-amazon-q-lt-tangent-checkpoint-struct][@ref-amazon-q-lt-slash-tangent-persist]。tangent 期间 checkpoint 功能被显式禁用。

**交给子代理**：委派工具把子任务作为独立进程执行，执行状态写进工作区的 `.amazonq/.subagents/{agent名}.json`，含 `pid`、`launched_at`、`completed_at`、`exit_code`；父进程会按 PID 存活情况把状态改成 Failed 并回写 [@ref-amazon-q-lt-agent-file-path][@ref-amazon-q-lt-agent-execution-schema]。这条链**不经过 `conversations` 行**：父会话里只保留模型看到的工具调用与结果，跨进程的状态与退出码在那个 JSON 文件里。

## 归档、备份、移动与删除 {#lt-archive-cleanup}

**transcripts.archive**：产品里唯一称得上归档的功能是 `/persist` 这对子命令 [@ref-amazon-q-lt-slash-tangent-persist]。`/persist save PATH` 把当前 `ConversationState` 以 pretty JSON 写到用户指定路径，目标已存在时要求 `-f`/`--force` 才覆盖 [@ref-amazon-q-lt-persist-save]。`/persist load PATH` 读回；若原路径读不到且不以 `.json` 结尾，会自动补后缀重试一次 [@ref-amazon-q-lt-persist-load-parse]。导入是有意**部分采用**的：先保留当前会话的 `tool_manager`、`mcp_enabled`、`model_info`，把文件里的上下文路径并入当前上下文路径（不带入 hook），再换入 `context_manager` 与 `agents`，最后整体赋值 `session.conversation = new_state` [@ref-amazon-q-lt-persist-load-parse][@ref-amazon-q-lt-persist-load-assign]。

它与“复制数据库文件 / 外部备份”的区别很实在：导出文件只含一个会话的状态，不含同库中其它 cwd 的行、不含 `state` 与 `auth_kv`、也不含影子仓库 `~/.aws/amazonq/cli-checkouts/{会话ID}` 里的文件快照 [@ref-amazon-q-lt-global-dirs][@ref-amazon-q-lt-shadow-repo-path]。恢复后的三类损失需要明说：路径可移植性——记录的键是原机器的绝对 cwd，换机器后 `--resume` 永远匹配不上；信息完整性——导入的 `checkpoint_manager` 里 `shadow_repo_path` 与 `work_tree_path` 仍指向原机器路径，`/checkpoint restore` 在导入后不可用；范围——只覆盖你主动导出的那一个会话。

**transcripts.cleanup**：产品**没有**会话记录的删除或保留期机制。源码里 `delete_entry` 只被用于 `state` 与 `auth_kv` 的键，从未用于 `conversations` [@ref-amazon-q-lt-json-entry-helpers]。`conversations` 的行因此只增不减，同一个目录反复聊天也只更新同一行。

`/clear` 不是删除。它需要二次确认，然后调用 `conversation.clear()` 清空内存中的 `next_message`、`history` 与 `latest_summary`，同时清掉 hook 缓存与挂起的工具确认态 [@ref-amazon-q-lt-clear-execute][@ref-amazon-q-lt-state-clear][@ref-amazon-q-lt-slash-clear-compact]。它不触碰数据库行——库里的旧记录会一直留到下一次助手消息把它整行覆盖成空历史；由于恢复要求 `history` 非空，那次覆盖之后 `--resume` 就不会再恢复它 [@ref-amazon-q-lt-clear-execute]。这是“清空当前会话”与“删除磁盘记录”之间的实际差别。

影子仓库有两条删除路径：`/checkpoint clean` 打印将删除的路径后调用 `cleanup()` 递归删除该目录，失败时把 manager 放回会话 [@ref-amazon-q-lt-checkpoint-clean-command]；此外 `CheckpointManager` 的 `Drop` 实现会在 manager 被丢弃时异步删除同一个 shadow repo 路径 [@ref-amazon-q-lt-checkpoint-drop-cleanup]。也就是说 checkpoint 的文件快照不会跨进程存活，跨会话可恢复的是 `conversations` 行里的历史快照与 tag 列表，不是文件内容。

手动删除数据库文件的后果必须谨慎陈述：删除会一并丢失该用户下所有目录的会话正文以及设置与凭据；库会在下次启动时被 8 个内嵌迁移重新建表，但 `conversations` 是空表，没有任何重建 `value` 的来源 [@ref-amazon-q-lt-migration-list]。删除前应当停止所有正在运行的 CLI 进程——数据库启动时会写文件权限，多个进程共享同一个连接池 [@ref-amazon-q-lt-db-open-permissions]。**没有证据支持“删掉是安全的”，也没有证据支持“必须定期删”**：该题按 partial 记录，缺口是没有官方保留策略、没有官方清理命令，也没有说明孤儿行的产生条件。

## 定位、读取与排错 {#lt-diagnostics}

**transcripts.diagnostics**：产品没有提供列出、导出或校验会话记录的专用命令。最接近的 `q diagnostic` 输出的是构建信息、系统信息、当前环境（cwd、安装方式、是否在 SSH/CI/WSL/Codespaces 中）和一组环境变量，结构体里**没有**数据库或会话相关的检查项 [@ref-amazon-q-lt-diagnostics-fields]。会话内的 `/usage`、`/context show` 报的是上下文窗口用量与上下文文件，不是落盘记录。

产品内部的读取接口与写入对称：同样是按 cwd 的 UTF-8 路径字符串作键，路径无法转成 UTF-8 时直接返回空 [@ref-amazon-q-lt-get-conversation-by-path]。

可行办法是用 SQLite 客户端直接打开 `dirs::data_local_dir()/amazon-q/data.sqlite3` [@ref-amazon-q-lt-db-path-static]：`SELECT key, value FROM conversations` 的 `key` 就是 cwd 路径、`value` 就是完整状态 JSON [@ref-amazon-q-lt-set-conversation-by-path]。判断库结构是否完整可以查 `SELECT version FROM migrations ORDER BY version`，与源码内嵌的 8 个迁移逐一对照 [@ref-amazon-q-lt-migration-list]；缺版本说明迁移未跑完，此时不要直接删库。

按来源分类定位：会话正文在数据库行里；checkpoint 的 tag 与历史快照也在同一行里，但文件快照在影子仓库 `~/.aws/amazonq/cli-checkouts/{会话ID}` [@ref-amazon-q-lt-shadow-repo-per-conversation]；委派子代理状态与 to-do 列表是普通 JSON 文件，可直接打开 [@ref-amazon-q-lt-agent-file-path][@ref-amazon-q-lt-todo-id-path]；to-do 列表保存时先创建空文件再整体覆写，读取失败会明确报“Could not load todo list” [@ref-amazon-q-lt-todo-save]。

排错时的已知限制：没有命令校验某个 `value` 能否成功反序列化（`--resume` 遇到解析失败的具体报错文本在源码中未固定）；也没有命令报告“某个 cwd 的记录里 history 为空因而不会被恢复”这类状态。这类判断只能靠读取 JSON 自行确认，因此该题记 partial。