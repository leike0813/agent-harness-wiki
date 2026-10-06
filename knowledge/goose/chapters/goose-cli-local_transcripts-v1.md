---
schema_version: 3
record_kind: production
edition_id: goose-cli-local_transcripts-v1
harness_id: goose
topic: local_transcripts
title: Goose CLI 本地 Transcript：记录范围、存储、schema、生命周期、归档与排错
sections:
  - section_id: transcripts-recording
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-add-message
      - ref-goose-lt-src-cli-create
      - ref-goose-lt-src-cli-info-paths
      - ref-goose-lt-src-cli-nosession
      - ref-goose-lt-src-compaction-keep
      - ref-goose-lt-src-content-block
      - ref-goose-lt-src-ddl-messages
      - ref-goose-lt-src-ddl-sessions-state
      - ref-goose-lt-src-ddl-usage
      - ref-goose-lt-src-get-conversation
      - ref-goose-lt-src-metadata
      - ref-goose-lt-src-role-string
      - ref-goose-lt-src-session-type
  - section_id: transcripts-storage
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-add-message
      - ref-goose-lt-src-cli-info-paths
      - ref-goose-lt-src-constants
      - ref-goose-lt-src-indexes-sessions
      - ref-goose-lt-src-legacy-import
      - ref-goose-lt-src-legacy-jsonl
      - ref-goose-lt-src-paths-app-strategy
      - ref-goose-lt-src-paths-in-data-dir
      - ref-goose-lt-src-paths-root
      - ref-goose-lt-src-pool
      - ref-goose-lt-src-session-id
      - ref-goose-lt-src-storage-new
      - ref-goose-lt-src-subagent-session
      - ref-goose-lt-src-threads-ddl
      - ref-goose-lt-src-timestamp-normalize
      - ref-goose-lt-src-tree-query
  - section_id: transcripts-schema
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-constants
      - ref-goose-lt-src-content-block
      - ref-goose-lt-src-ddl-messages
      - ref-goose-lt-src-ddl-sessions-core
      - ref-goose-lt-src-ddl-sessions-state
      - ref-goose-lt-src-ddl-usage
      - ref-goose-lt-src-get-conversation
      - ref-goose-lt-src-metadata
      - ref-goose-lt-src-migration-loop
      - ref-goose-lt-src-role-string
      - ref-goose-lt-src-run-migrations
      - ref-goose-lt-src-session-struct
      - ref-goose-lt-src-threads-ddl
      - ref-goose-lt-src-tool-request
      - ref-goose-lt-src-tool-response
  - section_id: transcripts-database
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-constants
      - ref-goose-lt-src-ddl-messages
      - ref-goose-lt-src-ddl-sessions-state
      - ref-goose-lt-src-ddl-usage
      - ref-goose-lt-src-indexes-messages
      - ref-goose-lt-src-indexes-sessions
      - ref-goose-lt-src-inventory-ddl
      - ref-goose-lt-src-inventory-models
      - ref-goose-lt-src-legacy-import
      - ref-goose-lt-src-legacy-jsonl
      - ref-goose-lt-src-migration-loop
      - ref-goose-lt-src-pool
      - ref-goose-lt-src-run-migrations
      - ref-goose-lt-src-storage-new
      - ref-goose-lt-src-threads-ddl
  - section_id: transcripts-lifecycle
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-add-message
      - ref-goose-lt-src-cli-create
      - ref-goose-lt-src-cli-nosession
      - ref-goose-lt-src-cli-resolve
      - ref-goose-lt-src-cli-session-fork
      - ref-goose-lt-src-compaction-keep
      - ref-goose-lt-src-effects-append
      - ref-goose-lt-src-effects-compact
      - ref-goose-lt-src-get-conversation
      - ref-goose-lt-src-session-id
      - ref-goose-lt-src-subagent-session
      - ref-goose-lt-src-tree-query
  - section_id: transcripts-retention
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-acp-archive
      - ref-goose-lt-src-cli-remove-confirm
      - ref-goose-lt-src-cli-session-export
      - ref-goose-lt-src-cli-session-import
      - ref-goose-lt-src-cli-session-remove
      - ref-goose-lt-src-ddl-usage
      - ref-goose-lt-src-delete-session
      - ref-goose-lt-src-export-session
      - ref-goose-lt-src-import-session
      - ref-goose-lt-src-pool
      - ref-goose-lt-src-session-struct
      - ref-goose-lt-src-threads-ddl
  - section_id: transcripts-diagnostics
    surface_ids:
      - cli
    source_refs:
      - ref-goose-lt-src-cli-info-paths
      - ref-goose-lt-src-cli-session-diagnostics
      - ref-goose-lt-src-constants
      - ref-goose-lt-src-diagnostics-report
      - ref-goose-lt-src-paths-in-data-dir
      - ref-goose-lt-src-search-keywords
      - ref-goose-lt-src-search-like
      - ref-goose-lt-src-search-text
      - ref-goose-lt-src-search-visibility
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-recording
        status: answered
        source_refs:
          - ref-goose-lt-src-cli-nosession
          - ref-goose-lt-src-ddl-messages
          - ref-goose-lt-src-ddl-sessions-state
          - ref-goose-lt-src-ddl-usage
          - ref-goose-lt-src-add-message
          - ref-goose-lt-src-get-conversation
          - ref-goose-lt-src-metadata
          - ref-goose-lt-src-compaction-keep
          - ref-goose-lt-src-session-type
          - ref-goose-lt-src-content-block
  - question_id: transcripts.location
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-storage
        status: partial
        source_refs:
          - ref-goose-lt-src-paths-root
          - ref-goose-lt-src-paths-in-data-dir
          - ref-goose-lt-src-paths-app-strategy
          - ref-goose-lt-src-storage-new
          - ref-goose-lt-src-constants
          - ref-goose-lt-src-cli-info-paths
          - ref-goose-lt-src-pool
          - ref-goose-lt-src-legacy-jsonl
  - question_id: transcripts.naming
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-storage
        status: answered
        source_refs:
          - ref-goose-lt-src-storage-new
          - ref-goose-lt-src-constants
          - ref-goose-lt-src-session-id
          - ref-goose-lt-src-threads-ddl
          - ref-goose-lt-src-tree-query
          - ref-goose-lt-src-subagent-session
          - ref-goose-lt-src-legacy-jsonl
  - question_id: transcripts.format
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-storage
        status: answered
        source_refs:
          - ref-goose-lt-src-pool
          - ref-goose-lt-src-constants
          - ref-goose-lt-src-legacy-jsonl
          - ref-goose-lt-src-legacy-import
          - ref-goose-lt-src-indexes-sessions
  - question_id: transcripts.schema
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-schema
        status: answered
        source_refs:
          - ref-goose-lt-src-ddl-sessions-core
          - ref-goose-lt-src-ddl-sessions-state
          - ref-goose-lt-src-ddl-messages
          - ref-goose-lt-src-ddl-usage
          - ref-goose-lt-src-content-block
          - ref-goose-lt-src-tool-request
          - ref-goose-lt-src-tool-response
          - ref-goose-lt-src-metadata
          - ref-goose-lt-src-constants
          - ref-goose-lt-src-run-migrations
          - ref-goose-lt-src-migration-loop
          - ref-goose-lt-src-threads-ddl
          - ref-goose-lt-src-session-struct
          - ref-goose-lt-src-get-conversation
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-lifecycle
        status: answered
        source_refs:
          - ref-goose-lt-src-cli-create
          - ref-goose-lt-src-cli-resolve
          - ref-goose-lt-src-cli-session-fork
          - ref-goose-lt-src-add-message
          - ref-goose-lt-src-get-conversation
          - ref-goose-lt-src-effects-append
          - ref-goose-lt-src-effects-compact
          - ref-goose-lt-src-compaction-keep
          - ref-goose-lt-src-subagent-session
          - ref-goose-lt-src-session-id
          - ref-goose-lt-src-cli-nosession
  - question_id: transcripts.database
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-database
        status: answered
        source_refs:
          - ref-goose-lt-src-pool
          - ref-goose-lt-src-ddl-messages
          - ref-goose-lt-src-ddl-usage
          - ref-goose-lt-src-indexes-messages
          - ref-goose-lt-src-indexes-sessions
          - ref-goose-lt-src-threads-ddl
          - ref-goose-lt-src-inventory-ddl
          - ref-goose-lt-src-inventory-models
          - ref-goose-lt-src-legacy-import
          - ref-goose-lt-src-legacy-jsonl
  - question_id: transcripts.archive
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-retention
        status: answered
        source_refs:
          - ref-goose-lt-src-acp-archive
          - ref-goose-lt-src-cli-session-export
          - ref-goose-lt-src-export-session
          - ref-goose-lt-src-import-session
          - ref-goose-lt-src-threads-ddl
  - question_id: transcripts.cleanup
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-retention
        status: partial
        source_refs:
          - ref-goose-lt-src-cli-session-remove
          - ref-goose-lt-src-cli-remove-confirm
          - ref-goose-lt-src-delete-session
          - ref-goose-lt-src-ddl-usage
          - ref-goose-lt-src-threads-ddl
          - ref-goose-lt-src-pool
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids:
          - cli
        section_id: transcripts-diagnostics
        status: answered
        source_refs:
          - ref-goose-lt-src-cli-info-paths
          - ref-goose-lt-src-cli-session-diagnostics
          - ref-goose-lt-src-diagnostics-report
          - ref-goose-lt-src-search-keywords
          - ref-goose-lt-src-search-visibility
          - ref-goose-lt-src-search-text
          - ref-goose-lt-src-search-like
          - ref-goose-lt-src-paths-in-data-dir
          - ref-goose-lt-src-constants
---

Goose CLI 不为每个会话生成独立文件，全部会话记录集中在数据目录下单个 SQLite 数据库 `sessions.db`；正文写进 `messages` 表，会话元数据、token 计量、线程分组和 provider 清单表与它同库共存。是否落盘由 `--no-session` 决定，恢复依赖整库而不是单个文件。

本节固定来源：仓库 `block/goose` 提交 `104ddde5` 的 Rust 源码，抓取时间 2026-10-06。本节引用的 13 个源码文件各有一个绑定该文件的快照（`snapshot-goose-repo-20261006` 对应 `crates/goose/src/session/session_manager.rs`，其余按文件名加后缀，例如 `-cli-args`、`-message-types`、`-paths`、`-acp-manage-sessions`），每条引用的 `locator.file` 与其快照绑定的文件一致。提交只代表源码树，不证明 npm 发行包的行为，因此本节不给发行版映射。目录解析与配置目录同源，见 `config.sources`；provider 清单表与 `providers.models` 讨论的 provider 发现结果共用同一个库文件。catalog 声明的 `desktop` 界面本轮没有取证，本节全部答案只覆盖 `cli`。

## 记录范围与写入开关 {#transcripts-recording}

落盘的是会话本身，不是日志。`messages` 表逐条保存角色、消息内容 JSON、创建时间与元数据 JSON [@ref-goose-lt-src-ddl-messages]；`sessions` 表保存名称、工作目录、类型、provider、模型配置、`goose_mode`、归档时间与父会话等状态 [@ref-goose-lt-src-ddl-sessions-state]；`usage_ledger` 表另存每次调用的模型、token 与费用，并带 `is_compaction` 标志区分普通调用与压缩产生的用量 [@ref-goose-lt-src-ddl-usage]。会话类型是固定枚举 `user` / `scheduled` / `sub_agent` / `hidden` / `terminal` / `gateway` / `acp`，序列化用 snake_case [@ref-goose-lt-src-session-type]。

唯一的写入开关在命令行：`--no-session`（`long_help` 为 “Execute commands without creating or using a session file”），它与 `--resume`、`--name`、`--path` 互斥 [@ref-goose-lt-src-cli-nosession]。不带该开关启动一次 `goose` 就会先建一个 `user` 类型会话，工作目录取启动时的当前目录、名称默认 `CLI Session` [@ref-goose-lt-src-cli-create]。

写消息时 goose 逐条插入并顺带刷新 `sessions.updated_at`，同一秒内产生的消息靠自增主键 `id` 稳定排序；`content_json` 是消息内容块数组，序列化时用 `"type"` 标签加 camelCase 变体名（`text`、`toolRequest`、`toolResponse`、`thinking` 等） [@ref-goose-lt-src-add-message] [@ref-goose-lt-src-content-block]。每条消息另存一份 `metadata_json`，字段为 camelCase 的 `userVisible`、`agentVisible`，以及可选的 `turnContext`、`usage` 等 [@ref-goose-lt-src-metadata]。

**不会落盘或不作为会话记录出现的部分**：

- 上下文压缩掉的历史消息**不会被删库**，只把已存行的 `agentVisible` 改成 `false` [@ref-goose-lt-src-compaction-keep]。它们仍在 `messages` 表里，只是不再进入 agent 上下文。
- 写入侧的角色映射只有 `user` 与 `assistant` 两种 [@ref-goose-lt-src-role-string]，读回会话时同样只按 `role` 取这两类行，其余角色直接跳过 [@ref-goose-lt-src-get-conversation]。因此系统提示不进入会话记录表内容。
- 工具调用与工具响应作为 `content_json` 里的内容块保存，与正文同表同行；token 与费用另存 `usage_ledger` [@ref-goose-lt-src-ddl-usage]。
- 调试日志、遥测和缓存不在本节范围内。`goose info` 打印的 Logs dir 指向 `state` 目录下的 `logs`，与会话数据库分开 [@ref-goose-lt-src-cli-info-paths]。

## 存储位置、命名与格式 {#transcripts-storage}

### 位置

记录根目录是 `Paths::data_dir()`：设置了绝对路径的 `GOOSE_PATH_ROOT` 时为该根下的 `data` 子目录，否则交给 `etcetera` 的 app 策略解析（顶层域与作者 `Block`、应用名 `goose`，源码注释说明保留 `Block` 是为兼容既有安装目录，并举例 `~/Library/Application Support/Block/goose/`）；相对路径的 `GOOSE_PATH_ROOT` 被忽略 [@ref-goose-lt-src-paths-root] [@ref-goose-lt-src-paths-app-strategy]。会话目录固定是数据目录下的 `sessions`，数据库文件名固定 `sessions.db` [@ref-goose-lt-src-constants] [@ref-goose-lt-src-storage-new] [@ref-goose-lt-src-paths-in-data-dir]。

| 内容 | 相对位置 | 说明 |
| --- | --- | --- |
| 会话数据库 | `DATA_DIR/sessions/sessions.db` | 唯一的会话记录文件 [@ref-goose-lt-src-storage-new] |
| 索引 | 同库内索引 | 没有独立的索引文件，也没有全文索引 [@ref-goose-lt-src-indexes-sessions] |
| 必要附件 | 无 | 记录正文以 JSON 文本存在库内，源码没有随会话落盘的附件目录 |
| 旧版 JSONL | `DATA_DIR/sessions/*.jsonl` | 仅作为历史导入源被读取 [@ref-goose-lt-src-legacy-jsonl] |
| 调试日志 | `STATE_DIR/logs` | 不属于会话记录 [@ref-goose-lt-src-cli-info-paths] |

`goose info` 把 `Sessions DB (sqlite)` 的解析结果直接打印出来，可用于确认当前生效的绝对路径 [@ref-goose-lt-src-cli-info-paths]。

**已查入口与剩余缺口**：位置机制（`GOOSE_PATH_ROOT` → `data` 子目录、否则平台目录策略）由固定来源直接证实。Linux 与 Windows 的字面目录字符串由 `etcetera` 这一外部 crate 决定，不在本轮固定源码内；本节只给出源码注释里出现的 macOS 形态作为示例，不据此外推其它平台的绝对路径。`desktop` 界面如何解析自己的数据根（Electron 侧会向被拉起的 goose 进程传递 `GOOSE_PATH_ROOT`）本轮未取证。

### 命名

数据库内没有“每会话一个文件名”，会话身份由 `sessions.id` 承担。ID 由 SQL 在插入时生成：取当天 UTC 日期 `%Y%m%d`，再接上当天已有 ID 后缀的最大值加一，形如 `20260115_3` [@ref-goose-lt-src-session-id]。`working_dir` 只是列字段，用来筛选与展示，不参与目录分片。

父子关系由 `sessions.parent_session_id` 表达，并配 `idx_sessions_parent` 索引 [@ref-goose-lt-src-indexes-sessions]。子代理会话以 `sub_agent` 类型创建后再回填父 ID [@ref-goose-lt-src-subagent-session]；用量汇总用递归 CTE 沿 `parent_session_id` 展开整棵子树 [@ref-goose-lt-src-tree-query]。分组维度另有 `threads` 与 `thread_messages` 两张表，`thread_messages.session_id` 只是普通列、不带外键 [@ref-goose-lt-src-threads-ddl]。

时间戳有两种：`created_timestamp` 是消息写入时的应用时间（秒），`timestamp` 由 SQLite `CURRENT_TIMESTAMP` 填充。读取时超过 `10_000_000_000` 的值按毫秒处理并除以 1000，因此旧数据里的毫秒时间戳也能正确还原 [@ref-goose-lt-src-constants] [@ref-goose-lt-src-timestamp-normalize]。

### 格式

格式是 SQLite（WAL 日志模式），不是 JSONL、也不是每会话文件。连接参数固定为：文件不存在则创建、开启外键、30 秒 busy timeout、WAL 模式，并在 Unix 上把会话目录权限设为 `0700` [@ref-goose-lt-src-pool]。写入是逐行 `INSERT`，每条消息一个事务 [@ref-goose-lt-src-add-message]，没有分片、压缩或轮转逻辑；同一目录里的 `*.jsonl` 只在初始化时被当作历史记录读取并导入，导入后不删除原文件 [@ref-goose-lt-src-legacy-jsonl] [@ref-goose-lt-src-legacy-import]。

## 记录 schema 与迁移 {#transcripts-schema}

### 表与字段

`schema_version` 表记录迁移版本，插入时以 `INSERT OR IGNORE` 写入 `CURRENT_SCHEMA_VERSION`（本提交为 16） [@ref-goose-lt-src-constants]。`sessions` 表的核心列是 `id`（主键）、`name`、`description`、`user_set_name`、`session_type`、`working_dir` 与时间戳列 [@ref-goose-lt-src-ddl-sessions-core]，后半段是扩展状态列：`extension_data`、各组 token 计数、`accumulated_cost`、`schedule_id`、`recipe_json`、`user_recipe_values_json`、`provider_name`、`model_config_json`、`goose_mode`、`archived_at`、`project_id`、`parent_session_id` [@ref-goose-lt-src-ddl-sessions-state]。

`messages` 表是 `id INTEGER PRIMARY KEY AUTOINCREMENT` 加 `message_id`、`session_id`（外键指向 `sessions(id)`）、`role`、`content_json`、`created_timestamp`、`timestamp`、`tokens`、`metadata_json` [@ref-goose-lt-src-ddl-messages]。注意 `messages.session_id` 的外键**没有** `ON DELETE CASCADE`，删除由代码显式完成。`usage_ledger.session_id` 带 `ON DELETE CASCADE`，并有 `is_compaction` 默认 0 [@ref-goose-lt-src-ddl-usage]。

内容块类型由 `MessageContentBlock` 定义，带 `"type"` 标签且变体名 camelCase [@ref-goose-lt-src-content-block]。工具请求与响应各有 `id` 与调用载荷，序列化同样 camelCase，`toolCall` / `tool_result` 的外层是 `{"status":"success","value":…}` 或 `{"status":"error","error":…}` 的信封 [@ref-goose-lt-src-tool-request] [@ref-goose-lt-src-tool-response]。消息元数据 `MessageMetadata` 也是 camelCase，`userVisible` 与 `agentVisible` 无 `skip_serializing_if`，因此几乎每行都有这两个键 [@ref-goose-lt-src-metadata]。

### 脱敏的最小记录示例

`sessions` 行（占位值）：

```yaml
id: "20260115_3"
name: "CLI Session"
description: ""
user_set_name: false
session_type: user          # snake_case 枚举
working_dir: "<项目绝对路径>"
created_at: "2026-01-15 04:00:00"
updated_at: "2026-01-15 04:03:20"
goose_mode: auto
parent_session_id: null
archived_at: null
```

`extension_data` 列默认写入空 JSON 对象 `{}`。

`messages` 行（占位值）：

| 列 | 用户消息 | 工具响应 |
| --- | --- | --- |
| `role` | `user` | `assistant` |
| `content_json` | `[{"type":"text","text":"占位：用户输入"}]` | `[{"type":"toolResponse","id":"占位调用 ID","tool_result":{"status":"success","value":{"content":[…]}}}]` |
| `created_timestamp` | `1768459200` | `1768459260` |
| `metadata_json` | `{"userVisible":true,"agentVisible":true}` | `{"userVisible":true,"agentVisible":true}` |

### 迁移

首次初始化在一个 `BEGIN IMMEDIATE` 事务里建 `schema_version`、`sessions`、`messages`、`usage_ledger` 与索引，然后写入当前版本号。版本落后时进入 `run_migrations`：从 `current_version + 1` 逐级调用 `apply_migration` 并更新版本号，整个过程在单个立即写事务内完成 [@ref-goose-lt-src-run-migrations] [@ref-goose-lt-src-migration-loop]。迁移是逐版本前进的，没有任何降级路径被本轮来源证实；读到的行缺列时由 `try_get(...).ok().flatten()` 兜底，例如 `parent_session_id` [@ref-goose-lt-src-session-struct]。

**仍缺来源的 schema 缺口**：

- `text`、`image`、`resource` 等内容块的内层字段（文本正文、图片编码、注解）由外部 crate `rmcp` 定义，不在本轮固定源码内；本节只证实了 `"type"` 标签与变体名。
- `recipe_json`、`model_config_json`、`extension_data` 的内部结构分别由 recipe、模型配置与 `ExtensionData` 类型定义，本轮只取证了它们的列位置与 `'{}'` 默认值。
- `threads` / `thread_messages` 的完整字段集合见 [@ref-goose-lt-src-threads-ddl]，但写入方（线程化界面）本轮未取证。
- 写入侧的角色映射只产生 `user` 与 `assistant` [@ref-goose-lt-src-role-string]，读回侧也只取这两类，因此表中不会存在其它角色的行 [@ref-goose-lt-src-get-conversation]。

## 数据库分工与可重建性 {#transcripts-database}

**数据库是唯一存储，没有“会话文件 + 数据库”的分工**：`SessionStorage::new` 只按 `DATA_DIR/sessions/sessions.db` 这一个路径建连接池，不存在同级的会话文件目录 [@ref-goose-lt-src-storage-new]。库的迁移版本由 `schema_version` 表记录，版本常量在本提交为 16 [@ref-goose-lt-src-constants]；库打开时若版本落后，逐级 `apply_migration` 并在同一事务内更新版本号 [@ref-goose-lt-src-run-migrations] [@ref-goose-lt-src-migration-loop]。库内部分工如下：

| 表 | 作用 | 恢复会话是否必需 |
| --- | --- | --- |
| `sessions` | 会话元数据、类型、归档与父子关系 | 必需 [@ref-goose-lt-src-ddl-sessions-state] |
| `messages` | 消息正文与元数据 | 必需 [@ref-goose-lt-src-ddl-messages] |
| `usage_ledger` | 逐次调用的 token 与费用 | 否；只影响统计与 `is_compaction` 记账 [@ref-goose-lt-src-ddl-usage] |
| `threads` / `thread_messages` | 线程分组视图 | 否；本轮未取证写入方 [@ref-goose-lt-src-threads-ddl] |
| `provider_inventory_entries` / `provider_inventory_models` | provider 清单与模型元数据 | 否；与 provider 发现相关，见 `providers.models` [@ref-goose-lt-src-inventory-ddl] [@ref-goose-lt-src-inventory-models] |

索引全部建在同一个库文件里，不存在独立的索引产物：消息侧有 `idx_messages_session`、`idx_messages_timestamp`、`idx_messages_message_id` 与复合索引 `idx_messages_session_created(session_id, created_timestamp, id)` [@ref-goose-lt-src-indexes-messages]；会话侧有 `idx_sessions_updated`、`idx_sessions_type`、`idx_sessions_parent` 与 `idx_usage_ledger_session` [@ref-goose-lt-src-indexes-sessions]。**没有全文索引**：历史检索走的是对 `content_json` 的 JSON 遍历加 `LIKE`（见排错小节）。

**能否重建**：没有官方的“重建记录”机制。可重建的只有 `usage_ledger` 这类统计性内容——它在每轮调用时按会话写入，缺失只影响统计。`messages` 与 `sessions` 没有再生成路径：正文只能通过 `goose session import` 从导出的 JSON 或外部 transcript 重新写入，而导入会创建**新会话**，不是原地恢复。

**复制数据库的注意事项**：`create_pool` 打开 WAL 与 30 秒 busy timeout，进程存活期间同一库可能存在多个写入者 [@ref-goose-lt-src-pool]。WAL 模式下的附属文件命名与 checkpoint 时机属 SQLite 通用行为，本轮固定来源只证实了 `journal_mode=Wal` 这一设置，没有 goose 侧的备份或 checkpoint 流程代码。

**历史 JSONL 的处理**：初始化时若 `sessions` 目录存在 `*.jsonl`，会逐个读入并导入为记录，导入失败只记日志不阻断 [@ref-goose-lt-src-legacy-jsonl] [@ref-goose-lt-src-legacy-import]。这是单向迁移，源码没有删除原文件。

## 生命周期：创建、追加、恢复、分支、子代理与压缩 {#transcripts-lifecycle}

- **创建**：不带标识符启动时立即 `create_session`，工作目录取当前目录，类型 `user`，模式取当前 goose mode [@ref-goose-lt-src-cli-create]。ID 在插入时按“当天日期 + 当天最大后缀 + 1”生成 [@ref-goose-lt-src-session-id]。
- **追加**：每条消息一次事务，写 `messages` 行并刷新 `sessions.updated_at`；`created_timestamp` 取消息自带时间与库内已有最大值中的较大者，避免后写的消息排到前面 [@ref-goose-lt-src-add-message]。状态机的 `AppendMessage` 效果直接落到这个写入路径 [@ref-goose-lt-src-effects-append]。
- **恢复**：`--resume` 不带标识符时取最近使用的 `user` 会话；带 `--session-id`、按 `--name` 匹配名称或 ID、或给一个文件路径取其 stem 作为会话 ID [@ref-goose-lt-src-cli-resolve]。读回时按 `(created_timestamp, id)` 排序重建对话，不按可见性过滤 [@ref-goose-lt-src-get-conversation]。
- **分支**：`--fork`（必须配合 `--resume`）复制全部消息创建一个新会话 [@ref-goose-lt-src-cli-session-fork]。分叉不会共享记录，两个会话的 `messages` 相互独立。
- **子代理**：`sub_agent` 类型会话创建后回填 `parent_session_id` 指向调用方 [@ref-goose-lt-src-subagent-session]，用量按父子树递归汇总 [@ref-goose-lt-src-tree-query]。
- **上下文压缩后延续**：压缩效果先记一条 `is_compaction` 的用量，再调 `save_compacted_conversation`，最后重估上下文用量 [@ref-goose-lt-src-effects-compact]。这一步**只更新或插入**压缩后对话里的消息行，不删除任何已存行 [@ref-goose-lt-src-compaction-keep]，被折叠的历史通过 `metadata_json` 的 `agentVisible=false` 表达。因此恢复会话时原始消息仍在库中，只是不会进入 agent 上下文。
- **不记录**：`--no-session` 时整条链路不建会话、不写库 [@ref-goose-lt-src-cli-nosession]。

## 归档、备份、移动与删除 {#transcripts-retention}

**归档与导出是两件事。** 归档只有一个软标志 `archived_at`；CLI 侧没有归档子命令，`goose session` 只有 list / remove / export / import / diagnostics / rename。设置 `archived_at` 的代码路径在 ACP 服务端：归档时写入当前时间并把会话从内存缓存中移除，取消归档写回空值 [@ref-goose-lt-src-acp-archive]。对 `cli` 界面而言，这意味着**没有官方归档开关可用**；`archived_at` 只能由 ACP 客户端设置。

导出是用户主动的读操作：`goose session export` 支持 markdown / json / yaml / html，不给输出路径时写 stdout [@ref-goose-lt-src-cli-session-export]，底层就是把读回的会话序列化成 JSON [@ref-goose-lt-src-export-session]。导入侧对应 `goose session import`，接受 goose 自身导出的 JSON 或外部 transcript [@ref-goose-lt-src-cli-session-import]。导出的 JSON 不含线程分组，也不含 `usage_ledger` 明细；恢复时 `import` 先 `create_session` 造一个**新 ID** 的会话，再把扩展状态与对话写回去 [@ref-goose-lt-src-import-session]。

**恢复后的损失**（由上述代码路径直接决定）：

| 维度 | 后果 |
| --- | --- |
| 身份 | 会话 ID 变成新生成的当日序号，原始 ID 不保留 [@ref-goose-lt-src-import-session] |
| 时间 | `created_at` / `updated_at` 是新建时间，导入代码不回写原始时间戳 |
| 状态 | 归档标志 `archived_at`、`project_id`、`parent_session_id` 属于会话状态字段，但导入的 builder 不回写它们 [@ref-goose-lt-src-session-struct] |
| 计量 | `usage_ledger` 不在导出结构内，导入后明细为空 |
| 分组 | `threads` / `thread_messages` 关系不恢复 [@ref-goose-lt-src-threads-ddl] |
| 可移植性 | `working_dir` 按原值写入 [@ref-goose-lt-src-import-session]，换机器后指向的原路径需要人工修正；库文件本身可以整份复制，WAL 附属文件需一并处理 |

**删除**：`goose session remove` 支持按 ID、名称或正则选择，无参数时进入交互式多选，选完仍需一次确认，默认值为否 [@ref-goose-lt-src-cli-session-remove] [@ref-goose-lt-src-cli-remove-confirm]。落库删除在一个立即写事务里依次删除 `messages`、`usage_ledger` 与 `sessions` 三处 [@ref-goose-lt-src-delete-session]。

**级联与孤儿的具体边界**：

- `usage_ledger.session_id` 带 `ON DELETE CASCADE`，但删除函数仍显式删除一次，属冗余保险 [@ref-goose-lt-src-ddl-usage]。
- `messages.session_id` 没有 `ON DELETE CASCADE`，依赖显式 DELETE；绕过该函数只删 `sessions` 行会留下 `messages` 孤儿行，而外键校验仍然开启，之后为该会话写入消息会直接失败而不是静默写入 [@ref-goose-lt-src-pool]。直接删除库文件则会丢掉全部记录。
- `sessions.parent_session_id` 没有外键约束，删掉父会话不会级联子代理会话，子行会变成孤儿 [@ref-goose-lt-src-threads-ddl]。
- `thread_messages.session_id` 同样不是外键，删除会话后可能留下指向已删会话的线程消息行。
- SQLite 不会因 `DELETE` 自动回收空间；本轮固定来源中没有 `VACUUM` 调用。

**已查入口与剩余缺口**（`transcripts.cleanup` 记为 partial 的原因）：

- 在 `crates/` 全量检索 `retention`、`prune`、`VACUUM`、`wal_checkpoint` 等关键字，未命中任何官方保留期、自动清理或压缩维护路径；因此**不能据此断定可以安全删除**，只能说明本提交没有自动清理逻辑。
- 固定来源没有给出“删除前应停止哪些写入者”的官方流程。库以 30 秒 busy timeout 的连接池被多个 goose 进程共享 [@ref-goose-lt-src-pool]，运行期手工删库或删目录的后果（并发写冲突、残留 WAL）本轮无来源可证。
- 没有官方备份/还原命令；外部备份（复制 `sessions.db` 及其 WAL 附属文件）的正确时点需在无写入者时进行，这一前提是 SQLite WAL 的通用性质，goose 侧没有对应说明。

## 定位、读取与排错 {#transcripts-diagnostics}

**定位路径**：`goose info` 打印 `Config dir`、`Config yaml`、`Sessions DB (sqlite)`、`Logs dir` 四行，路径由与写入端相同的 `Paths` 解析 [@ref-goose-lt-src-cli-info-paths] [@ref-goose-lt-src-paths-in-data-dir]。要判断当前进程用的是哪一个库，先看这一行输出。

**读取记录**：

- `goose session list` 支持 text / json 输出、按工作目录筛选、限制条数；`goose session export` 可把整段对话导成 markdown / json / yaml / html。
- `goose session diagnostics` 生成诊断报告，可写文件；报告结构含 `session` 字段（会话 JSON）以及 `config`、`extensions`、`logs`、`schedule`、`errors` 等并列部分 [@ref-goose-lt-src-cli-session-diagnostics] [@ref-goose-lt-src-diagnostics-report]。会话记录本身的检查点就是 `session` 字段，报告的 `schema_version` 字段可用于比对不同提交的报告形态 [@ref-goose-lt-src-constants]。

**检索记录**（chat recall）：查询被拆成小写关键词并包成 `%kw%` [@ref-goose-lt-src-search-keywords]；SQL 在 `messages` 与 `sessions` 内连接，先用 `metadata_json` 的 `$.turnContext` 过滤掉按轮注入的上下文事件 [@ref-goose-lt-src-search-visibility]，再用 `json_each(content_json)` 挑出 `"type" = "text"` 且受众为 assistant 或无受众的文本块 [@ref-goose-lt-src-search-text]，最后对块内 `$.text` 做 `LOWER(...) LIKE ?` 匹配 [@ref-goose-lt-src-search-like]。这解释了两件事：检索**只覆盖文本块**，工具调用与工具响应内容不参与匹配；检索是逐行 JSON 遍历加 `LIKE`，不是全文索引，大库上开销随库体积线性增长。

**完整性与状态的判据**（均为源码可直接核对的条件）：`schema_version` 表中的最大版本是否等于本提交的 `CURRENT_SCHEMA_VERSION`；`messages` 中是否存在指向 `sessions` 的孤儿行；`sessions.parent_session_id` 是否指向已删除会话；`thread_messages.session_id` 是否指向已删除会话；`metadata_json` 是否能被 `json_valid` 解析（检索与可见性判断都依赖它）。这些是本轮从代码读出的检查项，不是官方诊断命令的输出。

**排错时的已知边界**：数据库文件损坏时本轮来源没有可用的修复或重建路径——`messages` / `sessions` 只能从导出的 JSON 重新导入，而导入会生成新会话 ID（见上一小节）。`usage_ledger` 与 `threads` 属于可丢失的辅助状态。
