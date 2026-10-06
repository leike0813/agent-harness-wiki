---
schema_version: 3
record_kind: production
edition_id: forgecode-local_transcripts-v1
harness_id: forgecode
topic: local_transcripts
title: "ForgeCode CLI 的本地 Transcript：会话库、记录 schema、导出与清理"
sections:
  - section_id: transcripts-source-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-env-paths, ref-forgecode-lt-env-database-path, ref-forgecode-lt-schema-history-switch]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-base-path-order, ref-forgecode-lt-base-path-resolve, ref-forgecode-lt-env-paths, ref-forgecode-lt-env-database-path, ref-forgecode-lt-env-workspace-hash, ref-forgecode-lt-snapshot-path]
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-record-text-message, ref-forgecode-lt-record-context, ref-forgecode-lt-record-metrics, ref-forgecode-lt-record-upsert-new, ref-forgecode-lt-schema-debug-requests]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-db-schema-table, ref-forgecode-lt-record-row-fields, ref-forgecode-lt-record-context, ref-forgecode-lt-record-message-enum, ref-forgecode-lt-record-tool-value-legacy, ref-forgecode-lt-record-metrics, ref-forgecode-lt-db-migration-metrics]
  - section_id: transcripts-naming-and-hierarchy
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-domain-conversation-id, ref-forgecode-lt-domain-related-ids, ref-forgecode-lt-agent-subconversation, ref-forgecode-lt-agent-output-link, ref-forgecode-lt-ui-user-initiated]
  - section_id: transcripts-format-and-write
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-db-migration-create, ref-forgecode-lt-db-wal-pragmas, ref-forgecode-lt-db-pool-config, ref-forgecode-lt-repo-upsert, ref-forgecode-lt-app-save-after-dispatch]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-ui-init-by-id, ref-forgecode-lt-ui-init-from-file, ref-forgecode-lt-app-save-after-dispatch, ref-forgecode-lt-app-compaction-persist, ref-forgecode-lt-agent-subconversation, ref-forgecode-lt-cli-conversation-commands, ref-forgecode-lt-snapshot-undo]
  - section_id: transcripts-database-and-index
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-db-schema-table, ref-forgecode-lt-db-migration-index, ref-forgecode-lt-repo-list, ref-forgecode-lt-db-wal-pragmas, ref-forgecode-lt-env-database-path]
  - section_id: transcripts-archive-and-restore
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-cli-conversation-commands, ref-forgecode-lt-ui-dump, ref-forgecode-lt-ui-dump-json, ref-forgecode-lt-cli-session-input, ref-forgecode-lt-ui-init-from-file, ref-forgecode-lt-domain-related-ids]
  - section_id: transcripts-cleanup
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-cli-conversation-delete, ref-forgecode-lt-repo-delete, ref-forgecode-lt-schema-max-conversations, ref-forgecode-lt-repo-list, ref-forgecode-lt-snapshot-undo]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-forgecode-lt-info-paths, ref-forgecode-lt-cli-conversation-delete, ref-forgecode-lt-repo-list, ref-forgecode-lt-db-wal-pragmas]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: answered
        source_refs: [ref-forgecode-lt-record-text-message, ref-forgecode-lt-record-context, ref-forgecode-lt-record-metrics, ref-forgecode-lt-record-upsert-new, ref-forgecode-lt-schema-debug-requests]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-forgecode-lt-base-path-order, ref-forgecode-lt-base-path-resolve, ref-forgecode-lt-env-paths, ref-forgecode-lt-env-database-path, ref-forgecode-lt-env-workspace-hash, ref-forgecode-lt-snapshot-path]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-naming-and-hierarchy
        status: answered
        source_refs: [ref-forgecode-lt-domain-conversation-id, ref-forgecode-lt-domain-related-ids, ref-forgecode-lt-agent-subconversation, ref-forgecode-lt-agent-output-link, ref-forgecode-lt-ui-user-initiated]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-write
        status: answered
        source_refs: [ref-forgecode-lt-db-migration-create, ref-forgecode-lt-db-wal-pragmas, ref-forgecode-lt-db-pool-config, ref-forgecode-lt-repo-upsert]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: answered
        source_refs: [ref-forgecode-lt-db-schema-table, ref-forgecode-lt-record-row-fields, ref-forgecode-lt-record-context, ref-forgecode-lt-record-message-enum, ref-forgecode-lt-record-tool-value-legacy, ref-forgecode-lt-record-metrics, ref-forgecode-lt-db-migration-metrics]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-forgecode-lt-ui-init-by-id, ref-forgecode-lt-ui-init-from-file, ref-forgecode-lt-app-save-after-dispatch, ref-forgecode-lt-app-compaction-persist, ref-forgecode-lt-agent-subconversation, ref-forgecode-lt-cli-conversation-commands, ref-forgecode-lt-snapshot-undo]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-and-index
        status: answered
        source_refs: [ref-forgecode-lt-db-schema-table, ref-forgecode-lt-db-migration-index, ref-forgecode-lt-repo-list, ref-forgecode-lt-db-wal-pragmas, ref-forgecode-lt-env-database-path]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-restore
        status: answered
        source_refs: [ref-forgecode-lt-cli-conversation-commands, ref-forgecode-lt-ui-dump, ref-forgecode-lt-ui-dump-json, ref-forgecode-lt-cli-session-input, ref-forgecode-lt-ui-init-from-file, ref-forgecode-lt-domain-related-ids]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup
        status: partial
        source_refs: [ref-forgecode-lt-cli-conversation-delete, ref-forgecode-lt-repo-delete, ref-forgecode-lt-schema-max-conversations, ref-forgecode-lt-repo-list, ref-forgecode-lt-snapshot-undo]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-forgecode-lt-info-paths, ref-forgecode-lt-cli-conversation-delete, ref-forgecode-lt-repo-list, ref-forgecode-lt-db-wal-pragmas]
---

适用性说明：本章只固定到所列来源身份——官方仓库 `tailcallhq/forgecode` 固定 commit `1469f75aa0fa3a2a768bde24f7dc528723b67259`（对应 snapshot 前缀 `snapshot-forgecode-lt-`，`source_fetched_at` 2026-10-06T04:33:51.860Z）。来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布 npm 包版本的行为。路径推导使用 Rust 标准路径语义并在 `Environment` 上按 `os` 区分显示格式，但本轮固定来源没有在 Windows 或 macOS 上实际执行过读写，因此本节的路径结论限定在源码层，平台差异未逐项验证。界面口径为 catalog 唯一登记的 `cli`。本章只覆盖会话记录与维持记录所需的存储依赖；MCP 缓存、日志与遥测只在与记录生命周期直接相关处提及，不逐项审计。

## 固定来源 {#transcripts-source-scope}

会话正文、标题、时间戳与 metrics 全部落在一个 SQLite 数据库文件里，路径是 `{base_path}/.forge.db` [@ref-forgecode-lt-env-database-path]；`base_path` 之外的同一目录下还有独立的输入历史文件与文件快照目录 [@ref-forgecode-lt-env-paths]。这两类文件不属于会话记录本身：输入历史只是行编辑器的输入历史，其路径可由配置 `custom_history_path` 改写 [@ref-forgecode-lt-schema-history-switch]。

关键结论先说：**ForgeCode CLI 没有“会话记录文件”这一形态，会话就是 SQLite 里的一行**。下文所有格式、命名、清理问题都围绕这一点展开。

## 存储位置与路径推导 {#transcripts-storage-layout}

所有路径都从单一 `base_path` 派生，解析顺序是：`FORGE_CONFIG` 环境变量 → `~/forge`（legacy 目录，存在时优先）→ `~/.forge` [@ref-forgecode-lt-base-path-order][@ref-forgecode-lt-base-path-resolve]。因此换机器或改环境变量会把整套记录写到另一个根目录下，原位置的库不会被读取。

派生结果如下：

| 用途 | 路径 | 依据 |
| :-- | :-- | :-- |
| 会话正文与元数据 | `{base_path}/.forge.db` | `Environment::database_path()` [@ref-forgecode-lt-env-database-path] |
| 输入历史（非会话记录） | `{base_path}/.forge_history`，可由 `custom_history_path` 覆盖 | `Environment::history_path()` [@ref-forgecode-lt-env-paths] |
| 文件修改快照（撤销用） | `{base_path}/snapshots` | `Environment::snapshot_path()` [@ref-forgecode-lt-env-paths] |
| 运行日志 | `{base_path}/logs` | `Environment::log_path()` [@ref-forgecode-lt-env-paths] |
| MCP 缓存（非会话记录） | `{base_path}/cache/mcp_cache` | `Environment::cache_dir()` [@ref-forgecode-lt-env-database-path] |

项目作用域不是靠路径体现，而是靠库内一列：`workspace_id` 由当前 `cwd` 的哈希得到 [@ref-forgecode-lt-env-workspace-hash]。同一个 `{base_path}/.forge.db` 承载所有项目的会话，查询时按 `workspace_id` 过滤；换目录即换工作区视图，历史会话不会出现在新目录下列表里，且该列存的是不可逆的 64 位哈希而不是项目路径。

文件快照的落盘命名规则与会话不同：按被改文件路径的哈希分目录，目录内用 `YYYY-MM-DD_HH-MM-SS-%9f.snap` 时间戳文件名 [@ref-forgecode-lt-snapshot-path]。

## 记录范围 {#transcripts-record-scope}

落盘的是完整会话上下文，不是原始输入历史，也不是日志。一条会话行包含三部分 [@ref-forgecode-lt-record-context]：

- `conversation_id` 与 `initiator`（发起方标记）；
- `messages`：消息数组，每条是 `text` / `tool` / `image` 三选一的判别联合；
- `tools`、`tool_choice`、`max_tokens`、`temperature`、`top_p`、`top_k`、`reasoning`、`stream` 等本轮请求参数。

`text` 消息的字段是 `role`（system/user/assistant）、`content`，以及可选的 `raw_content`、`tool_calls`、`thought_signature`、`model`、`reasoning_details`、`droppable` [@ref-forgecode-lt-record-text-message]。除 `role` 与 `content` 外全部可选，且序列化时 `None` 直接省略——这意味着记录不是逐字段显式置空，而是靠“键缺失”表达缺省。

另有一份独立记录 `metrics`：起始时间、被改文件路径到增删行数的映射、以及被访问文件集合 [@ref-forgecode-lt-record-metrics]。

**哪些内容不落盘**，从写入路径可以直接读出：`conversation.context` 为空（没有任何消息）且没有 `initiator` 时，整个 `context` 列写成 NULL；`updated_at` 也只在 `context` 存在时才刷新 [@ref-forgecode-lt-record-upsert-new]。这意味着“创建了会话但还没说话”的那一行确实存在，`updated_at` 为空，正文列为空。

**记录开关**：本轮固定来源中没有发现关闭会话记录的开关——写入发生在每轮对话结束的固定路径上（见 [格式与写入](#transcripts-format-and-write)），不受配置控制。与会话记录相邻、但由独立配置控制的是请求调试转储：`debug_requests` 缺省即不写文件 [@ref-forgecode-lt-schema-debug-requests]。已查入口：`Environment` 的全部路径方法、`ForgeConfig` 的 schema（`forge.schema.json` 全部字段名）、`forge_app::App::chat` 的写入点。剩余缺口：本轮未逐一枚举 `ForgeConfig` 的全部配置项与写入点的交互，若存在更细粒度的记录开关，需要在固定来源中继续查证后才能断言。

## 记录 schema {#transcripts-record-schema}

行结构由数据库表定义固定 [@ref-forgecode-lt-db-schema-table][@ref-forgecode-lt-record-row-fields]：

| 列 | 类型 | 语义 |
| :-- | :-- | :-- |
| `conversation_id` | TEXT PRIMARY KEY | 随机 UUID |
| `title` | TEXT（可空） | 会话标题，缺失时显示为空标记 |
| `workspace_id` | BIGINT NOT NULL | 当前 `cwd` 的哈希 |
| `context` | TEXT（可空） | 会话正文，JSON 序列化字符串 |
| `created_at` | TIMESTAMP NOT NULL | 创建时间 |
| `updated_at` | TIMESTAMP（可空） | 最近一次带正文写入的时间 |
| `metrics` | TEXT（可空） | 文件改动与访问统计，JSON 字符串 |

`context` 与 `metrics` 都是 JSON 文本，不是独立表，也不是每条消息一行。`context` 的顶层字段就是上一节列出的 `conversation_id`、`initiator`、`messages`、`tools` 与请求参数 [@ref-forgecode-lt-record-context]；`messages` 的每条是一个带 `message` 与可选 `usage` 的对象 [@ref-forgecode-lt-record-message-enum]。`metrics` 列承载上一节提到的文件改动与访问统计 [@ref-forgecode-lt-record-metrics]。

**脱敏最小示例**（占位值，形状来自 `ContextRecord` 与 `ContextMessageRecord` 的 serde 定义）：

```json
{
  "conversationId": "00000000-0000-4000-8000-000000000000",
  "initiator": "user",
  "messages": [
    { "message": { "text": { "role": "user", "content": "REDACTED_USER_INPUT" } } },
    { "message": { "text": { "role": "assistant", "content": "REDACTED_ASSISTANT_REPLY" } },
      "usage": { "input_tokens": 0, "output_tokens": 0 } }
  ]
}
```

这是 `context` 列内容的形状，不是可运行的官方示例；序列化细节（字段命名、枚举标签大小写）随 `serde` 属性而变，例如消息判别联合显式使用 snake_case 标签 [@ref-forgecode-lt-record-message-enum]。

**版本迁移**有两层机制。第一层是数据库迁移：`metrics` 列由一条 `ALTER TABLE conversations ADD COLUMN metrics TEXT` 迁移追加 [@ref-forgecode-lt-db-migration-metrics]。第二层是读侧的 legacy 变体容忍：工具输出值保留了 `Markdown`、`FileDiff`、`Pair` 三个已从领域模型移除的旧变体，注释明确说明它们“从存储数据中仍可能存在”，读回时转换为当前形态 [@ref-forgecode-lt-record-tool-value-legacy]。也就是说，记录格式的演进不靠单一版本号字段，而靠“写新形态 + 读时兼容旧形态”。

仍缺的具体 schema 缺口：本轮固定来源未给出 `context` JSON 的字段级 schema 文档，`usage` 等嵌套对象的完整字段集未在引用的行区间内完整呈现，也未见任何字段的显式必填声明（除数据库层的 NOT NULL 列）。已查入口：`conversation_record.rs` 全部 record 类型、`database/schema.rs`、`database/migrations/` 全部七条迁移。

## 命名、父子关系与会话树 {#transcripts-naming-and-hierarchy}

会话 ID 是随机 UUID v4，不编码时间、不编码项目路径、不编码标题 [@ref-forgecode-lt-domain-conversation-id]。因此从文件名或 ID 本身无法看出会话何时开始、属于哪个项目；这两项分别由 `created_at` 列和 `workspace_id` 列承担。

**父子关系没有独立字段**。子代理被调用时会新建一条独立会话记录，并把 `initiator` 标为 `agent` 以与用户发起区分 [@ref-forgecode-lt-agent-subconversation]；父会话与子会话的关联写在父会话正文的工具输出里——工具结果携带子会话的 ID [@ref-forgecode-lt-agent-output-link]，读侧靠扫描全部工具结果中的这类值反推子会话列表 [@ref-forgecode-lt-domain-related-ids]。这意味着关系是单向可推导的：知道父会话 ID 就能找到子会话 ID，反之不行；删除父会话不会让子会话变成孤儿数据，只会让这条链断掉。

顶层列表并不等于“全部会话”：UI 过滤掉 `initiator` 非 `user` 的会话，并排除掉被其他会话引用为子会话的那些 [@ref-forgecode-lt-ui-user-initiated]。所以子代理会话存在于库中，但默认不在会话列表里出现。

“分支”只有一种实现：`conversation clone` 复制整条会话并分配新 ID，两条记录之间没有任何父子标记，与被复制的那条是并列关系。

## 格式与写入 {#transcripts-format-and-write}

格式是 SQLite 单文件，不分片、不压缩：建表语句把正文定义为单个 `TEXT` 列 [@ref-forgecode-lt-db-migration-create]。连接在获取时统一设置 PRAGMA——`journal_mode = WAL`、`synchronous = NORMAL`、`busy_timeout = 30000`、`wal_autocheckpoint = 1000` [@ref-forgecode-lt-db-wal-pragmas]。WAL 意味着库文件旁会出现 `-wal` 与 `-shm` 附属文件；`wal_autocheckpoint = 1000` 页决定自动 checkpoint 时机，`synchronous = NORMAL` 意味着断电时最近的事务可能丢失而非必然持久。连接池默认上限 5、空闲 10 分钟 [@ref-forgecode-lt-db-pool-config]。

写入是**整行 upsert**，不是追加：冲突时按 `conversation_id` 更新 `title`、`context`、`updated_at`、`metrics` 四列 [@ref-forgecode-lt-repo-upsert]。也就是说会话正文在库中始终是当前全量快照，没有 append-only 日志；单条消息的粒度只在 `context` JSON 内部体现。

写入时机是每轮对话 dispatch 结束之后——先执行对话，再把整条会话 upsert 回去 [@ref-forgecode-lt-app-save-after-dispatch]。因此进程在对话中途被杀时，本轮已产生的消息不会进入库；上一轮的内容仍在。

## 记录生命周期 {#transcripts-lifecycle}

- **创建**：首次发送消息时若无会话 ID，则生成新 UUID 并立即 upsert 一条空正文记录 [@ref-forgecode-lt-ui-init-by-id]。
- **续接**：`--conversation-id`（别名 `--cid`）指向已存在的会话时直接复用；指向不存在的 ID 则当场新建该 ID 的行 [@ref-forgecode-lt-ui-init-by-id]。这意味着传入一个任意合法 UUID 会得到一条新会话，不会报错。
- **追加**：每轮对话结束后整行覆盖写入 [@ref-forgecode-lt-app-save-after-dispatch]。
- **上下文压缩**：压缩结果直接替换 `conversation.context` 后 upsert，同一行被覆盖，压缩前的完整消息不在库中另存 [@ref-forgecode-lt-app-compaction-persist]。压缩策略可由 `forge conversation compact CONVERSATION_ID` 手动触发 [@ref-forgecode-lt-cli-conversation-commands]。
- **交给子代理**：新建独立会话，`initiator` 标为 `agent` [@ref-forgecode-lt-agent-subconversation]。
- **恢复**：`forge conversation resume CONVERSATION_ID` 进入交互模式继续同一会话；`retry` 子命令在不改上下文的前提下重跑上一条指令 [@ref-forgecode-lt-cli-conversation-commands]。跨机器恢复走导入路径 `--conversation FILE_PATH`，该路径的解析与写入见[导出与恢复](#transcripts-archive-and-restore) [@ref-forgecode-lt-ui-init-from-file]。
- **文件侧快照**：与消息记录无关的另一条线。写文件前把原内容存进 `{base_path}/snapshots`，撤销时取回并**删除**该快照文件 [@ref-forgecode-lt-snapshot-undo]——它是单次使用的临时副本，不是会话记录的一部分。

## 数据库与索引分工 {#transcripts-database-and-index}

数据库承担全部会话正文与元数据，没有“会话文件 + 数据库索引”的分工：正文、元数据、指标同在 `conversations` 一张表里 [@ref-forgecode-lt-db-schema-table]。

索引只有两条，都围绕工作区视图 [@ref-forgecode-lt-db-migration-index]：一条 `(workspace_id, created_at DESC)`，一条按 `(workspace_id, updated_at DESC)` 的部分索引，条件是 `context IS NOT NULL`。查询侧与索引对应——按 `workspace_id` 过滤、`context` 非空、按 `updated_at` 倒序、可选条数上限 [@ref-forgecode-lt-repo-list]。这带来一个可观察后果：没有正文的空会话行永远不出现在任何列表查询结果中，只能按 ID 直接取到。

会话库本身位于 `{base_path}/.forge.db`，与缓存目录并列但彼此独立 [@ref-forgecode-lt-env-database-path]；连接以 WAL 模式打开并设 30 秒 `busy_timeout` 与自动 checkpoint [@ref-forgecode-lt-db-wal-pragmas]，因此读这个文件时库旁可能存在尚未 checkpoint 的 WAL 附属文件。

**恢复所必需的文件**：只有 `{base_path}/.forge.db` 一个。运行时会自动执行内嵌迁移创建或升级表结构，因此删掉库文件后程序仍能启动，但历史会话一并消失且无法从其它文件重建——`.forge_history`、`snapshots`、`logs` 都不含会话正文。WAL 模式下的 `-wal` / `-shm` 附属文件在进程全部退出后会被 checkpoint 合并；强行删除库文件而保留 WAL 附属文件的行为，本轮固定来源未作规定。

## 导出、导入与外部备份 {#transcripts-archive-and-restore}

没有“归档开关”这种机制。可用的是显式的导出/导入：

- **导出**：`forge conversation dump CONVERSATION_ID` 写出一个文件；`--html` 输出 HTML，否则输出 JSON [@ref-forgecode-lt-cli-conversation-commands]。文件名以本地时间戳 `%Y-%m-%d_%H-%M-%S` 打头并加 `-dump.html` / `-dump.json` 后缀 [@ref-forgecode-lt-ui-dump][@ref-forgecode-lt-ui-dump-json]，**写在当前工作目录**，不是 `{base_path}` 下。导出时会顺带按上节的反推规则收集子会话 [@ref-forgecode-lt-domain-related-ids]，把它们与主会话放进同一个文件。
- **导入**：`forge --conversation FILE_PATH` 读一个 JSON 文件执行，解析时先尝试带 `conversation` 包装的导出格式，再回退到裸会话对象 [@ref-forgecode-lt-ui-init-from-file]。导入用的是文件里携带的原 ID，因此可以恢复到另一台机器。
- **续接指定 ID**：`--conversation-id` 只接受 ID，不接受文件 [@ref-forgecode-lt-cli-session-input]。

**恢复后的损失**，按固定来源可确认的部分：

- `workspace_id` 不随导出传递。导入到新目录时，会话按当时的 `cwd` 哈希归入新的工作区，与原项目不再关联。
- 导出文件是 JSON/HTML 渲染产物，不是库文件；库内 `metrics`、索引等结构不会被携带回来。
- 子会话虽然在导出文件里，但恢复后父子链是否仍能被读侧反推，取决于导入路径是否写回工具结果中的子会话 ID；本轮固定来源只证实导出侧收集了相关会话，未证实导入侧的关联完整性，**这一点属未验证缺口**。
- 导出文件写在工作目录，含会话正文（含用户输入内容），备份策略需自行考虑其敏感性。

## 删除与保留 {#transcripts-cleanup}

官方删除入口是 `forge conversation delete CONVERSATION_ID`，同组还有 `info`、`stats`、`clone`、`rename` [@ref-forgecode-lt-cli-conversation-delete]。删除的实现是一条带 `workspace_id` 与 `conversation_id` 双条件的 `DELETE`，源码注释说明这是为了确保用户只能删除自己工作区内的会话 [@ref-forgecode-lt-repo-delete]。

据此可确认的事实：

- **不级联**：删除父会话不会删除子会话行；子会话行仍留在库里，只是失去了可反推的父链，并且默认不出现在列表中。
- **不重试、不软删**：删除是直接 `DELETE`，源码中未见墓碑标记或回收站。
- **无保留期机制**：`max_conversations` 的 schema 描述是“会话列表中显示的最大会话数”，默认 0，即它限制**列表条数**而非磁盘保留 [@ref-forgecode-lt-schema-max-conversations]。本轮固定来源中未发现按时间或容量清理旧会话的官方机制——这不等于“没有”，而是本轮未找到证据。
- **手动删除文件的后果未在来源中规定**：删除 `{base_path}/.forge.db` 会移除全部工作区的会话，程序下次启动会重新建表 [@ref-forgecode-lt-env-database-path]；直接删单个 `.forge.db-wal` 附属文件或在库文件仍被进程持有时改动库文件的后果，源码未作规定。
- **删除前应停止的写入者**：会话写入由运行中的 CLI 进程持有连接池完成 [@ref-forgecode-lt-db-wal-pragmas]，因此手工操作库文件前应先退出所有 forge 进程。仅 `context` 为空的行本来就不出现在列表中 [@ref-forgecode-lt-repo-list]，无法通过列表发现。
- 文件快照目录是另一套生命周期：快照在撤销时被消费即删 [@ref-forgecode-lt-snapshot-undo]，目录里长期残留的 `.snap` 是未被撤销的文件副本，不含会话正文。

状态说明：本题为 `partial`——已查入口为 `ConversationCommand` 子命令组、repository 的删除实现、`forge.schema.json` 中 `max_conversations` 与相邻配置项、快照服务。剩余缺口是官方保留/清理策略与手工改库文件的官方说明在本轮固定来源中未找到。

## 定位与排错 {#transcripts-diagnostics}

可用的只读入口：

- `forge info` 的 PATHS 段列出 Logs、Agents、History、Checkpoints、Policies 路径 [@ref-forgecode-lt-info-paths]——注意**其中不含会话库路径**，`.forge.db` 需要按上节规则自行推导。
- `forge conversation list`（别名 `session list`）列出当前工作区的顶层会话，`info` / `stats` 查看单条会话的标题、任务、耗时与用量，`--porcelain` 给机器可读输出 [@ref-forgecode-lt-cli-conversation-delete]。
- 直接读取 `{base_path}/.forge.db` 是可行的诊断手段：正文在 `conversations.context` 列的 JSON 里，指标在 `metrics` 列。注意库由运行中进程持有且启用 WAL，读取应只读打开。

排错线索：

- **会话看不到**：先确认工作目录是否与创建时一致（`workspace_id` 由 `cwd` 哈希决定）；列表查询同时要求 `context` 非空，因此空会话不会出现 [@ref-forgecode-lt-repo-list]。
- **内容不完整**：写入是每轮结束的整行覆盖，对话中途终止会丢掉本轮未落盘的消息；上下文压缩也会覆盖正文。
- **并发报错或锁等待**：写入走连接池，PRAGMA 设了 30 秒 `busy_timeout` 与 WAL [@ref-forgecode-lt-db-wal-pragmas]，多进程同时操作同一库时表现为延迟而非立即失败。
- **删除无效**：删除条件包含 `workspace_id`，跨工作区的同 ID 不会被删掉。

状态说明：本题为 `partial`——已查入口为 `forge info` 展示项、会话子命令组、repository 查询实现与连接 PRAGMA。剩余缺口是本轮固定来源中没有官方诊断文档或完整性校验工具；手工打开数据库时的一致性保证（如是否需要先 checkpoint）源码未作规定。

## 与其它主题的关联

- 配置键的读取顺序、作用域与 `custom_history_path`、`max_conversations`、`debug_requests` 等键的覆盖规则见配置机制的 `config.sources`、`config.overrides`、`config.defaults` 与 `config.diagnostics`；本章只使用其最终生效值。
- 会话正文里的子代理调用链见自定义 Agent 的 `agents.format`、`agents.roles`；`subagents` 开关的生效条件见 `agents.roles`，上下文压缩的阈值与策略由 agent 的 `compact` 字段决定、见 `agents.overrides` 与 `agents.limits`。本章只记录它们对存储的影响：子会话独立建行、压缩覆盖而非追加。