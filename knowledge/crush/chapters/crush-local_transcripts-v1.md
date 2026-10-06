---
schema_version: 3
record_kind: production
edition_id: crush-local_transcripts-v1
harness_id: crush
topic: local_transcripts
title: "Crush 本地 Transcript：单个项目数据目录里的 SQLite 会话库"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-crush-transcripts-message-service, ref-crush-transcripts-message-debounce, ref-crush-transcripts-prompt-history, ref-crush-transcripts-shell-persist, ref-crush-transcripts-parts-encoding, ref-crush-transcripts-part-types, ref-crush-transcripts-shell-part, ref-crush-transcripts-message-struct, ref-crush-transcripts-session-struct, ref-crush-transcripts-schema-read-files, ref-crush-transcripts-file-history, ref-crush-transcripts-disable-auto-summarize]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-crush-transcripts-data-directory, ref-crush-transcripts-data-dir-flag, ref-crush-transcripts-data-dir-resolve, ref-crush-transcripts-project-bootstrap, ref-crush-transcripts-db-connect, ref-crush-transcripts-db-pragmas, ref-crush-transcripts-parts-encoding, ref-crush-transcripts-global-data-dir, ref-crush-transcripts-projects-registry, ref-crush-transcripts-logs-path, ref-crush-transcripts-stats-output, ref-crush-transcripts-session-create, ref-crush-transcripts-title-session-id, ref-crush-transcripts-sub-session-id, ref-crush-transcripts-session-hash, ref-crush-transcripts-git-branch]
  - section_id: transcripts-schema-lifecycle
    surface_ids: [cli]
    source_refs: [ref-crush-transcripts-schema-sessions, ref-crush-transcripts-schema-messages, ref-crush-transcripts-parts-encoding, ref-crush-transcripts-part-types, ref-crush-transcripts-shell-part, ref-crush-transcripts-message-struct, ref-crush-transcripts-message-debounce, ref-crush-transcripts-message-service, ref-crush-transcripts-shutdown-flush, ref-crush-transcripts-summarize, ref-crush-transcripts-compacted-read, ref-crush-transcripts-messages-from-summary, ref-crush-transcripts-session-create, ref-crush-transcripts-db-connect, ref-crush-transcripts-shell-spill-limits, ref-crush-transcripts-shell-spill-write]
  - section_id: transcripts-database
    surface_ids: [cli]
    source_refs: [ref-crush-transcripts-db-connect, ref-crush-transcripts-db-pragmas, ref-crush-transcripts-schema-sessions, ref-crush-transcripts-schema-messages, ref-crush-transcripts-message-count-trigger, ref-crush-transcripts-schema-files, ref-crush-transcripts-schema-read-files, ref-crush-transcripts-file-history, ref-crush-transcripts-schema-mcp-disabled, ref-crush-transcripts-schema-mcp-enabled, ref-crush-transcripts-datalock, ref-crush-transcripts-datalock-optin, ref-crush-transcripts-datalock-acquire, ref-crush-transcripts-skip-lock]
  - section_id: transcripts-cleanup-archive
    surface_ids: [cli]
    source_refs: [ref-crush-transcripts-session-mutate-commands, ref-crush-transcripts-session-delete, ref-crush-transcripts-tui-delete, ref-crush-transcripts-schema-messages, ref-crush-transcripts-schema-files, ref-crush-transcripts-db-pragmas, ref-crush-transcripts-datalock, ref-crush-transcripts-shell-persist, ref-crush-transcripts-shell-spill-write, ref-crush-transcripts-shell-spill-prune, ref-crush-transcripts-shell-spill-limits, ref-crush-transcripts-shell-spill-cap]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-transcripts-session-commands, ref-crush-transcripts-session-json-flags, ref-crush-transcripts-session-id-lookup, ref-crush-transcripts-session-show-json, ref-crush-transcripts-stats-flags, ref-crush-transcripts-stats-crawl, ref-crush-transcripts-db-readonly, ref-crush-transcripts-logs-path, ref-crush-transcripts-dirs-cmd, ref-crush-transcripts-datalock, ref-crush-transcripts-skip-lock]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: answered
        source_refs: [ref-crush-transcripts-message-service, ref-crush-transcripts-message-debounce, ref-crush-transcripts-prompt-history, ref-crush-transcripts-shell-persist, ref-crush-transcripts-parts-encoding, ref-crush-transcripts-part-types, ref-crush-transcripts-shell-part, ref-crush-transcripts-message-struct, ref-crush-transcripts-session-struct, ref-crush-transcripts-schema-read-files, ref-crush-transcripts-file-history, ref-crush-transcripts-disable-auto-summarize]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-crush-transcripts-data-directory, ref-crush-transcripts-data-dir-flag, ref-crush-transcripts-data-dir-resolve, ref-crush-transcripts-project-bootstrap, ref-crush-transcripts-db-connect, ref-crush-transcripts-global-data-dir, ref-crush-transcripts-projects-registry, ref-crush-transcripts-logs-path]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-crush-transcripts-session-create, ref-crush-transcripts-title-session-id, ref-crush-transcripts-sub-session-id, ref-crush-transcripts-session-hash, ref-crush-transcripts-git-branch]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-crush-transcripts-db-connect, ref-crush-transcripts-db-pragmas, ref-crush-transcripts-parts-encoding, ref-crush-transcripts-global-data-dir]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-schema-lifecycle
        status: answered
        source_refs: [ref-crush-transcripts-schema-sessions, ref-crush-transcripts-schema-messages, ref-crush-transcripts-parts-encoding, ref-crush-transcripts-part-types, ref-crush-transcripts-shell-part, ref-crush-transcripts-message-struct]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-schema-lifecycle
        status: answered
        source_refs: [ref-crush-transcripts-message-debounce, ref-crush-transcripts-message-service, ref-crush-transcripts-shutdown-flush, ref-crush-transcripts-summarize, ref-crush-transcripts-compacted-read, ref-crush-transcripts-messages-from-summary, ref-crush-transcripts-shell-spill-limits]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database
        status: answered
        source_refs: [ref-crush-transcripts-db-connect, ref-crush-transcripts-db-pragmas, ref-crush-transcripts-schema-sessions, ref-crush-transcripts-schema-messages, ref-crush-transcripts-message-count-trigger, ref-crush-transcripts-schema-files, ref-crush-transcripts-schema-read-files, ref-crush-transcripts-file-history, ref-crush-transcripts-schema-mcp-disabled, ref-crush-transcripts-schema-mcp-enabled, ref-crush-transcripts-datalock, ref-crush-transcripts-datalock-optin, ref-crush-transcripts-datalock-acquire, ref-crush-transcripts-skip-lock]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-archive
        status: partial
        source_refs: [ref-crush-transcripts-session-mutate-commands, ref-crush-transcripts-datalock, ref-crush-transcripts-db-pragmas]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-archive
        status: partial
        source_refs: [ref-crush-transcripts-session-mutate-commands, ref-crush-transcripts-session-delete, ref-crush-transcripts-tui-delete, ref-crush-transcripts-datalock, ref-crush-transcripts-shell-persist, ref-crush-transcripts-shell-spill-write, ref-crush-transcripts-shell-spill-prune, ref-crush-transcripts-shell-spill-limits, ref-crush-transcripts-shell-spill-cap]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-crush-transcripts-session-commands, ref-crush-transcripts-session-json-flags, ref-crush-transcripts-session-id-lookup, ref-crush-transcripts-session-show-json, ref-crush-transcripts-stats-flags, ref-crush-transcripts-stats-crawl, ref-crush-transcripts-db-readonly, ref-crush-transcripts-logs-path, ref-crush-transcripts-dirs-cmd, ref-crush-transcripts-datalock]
---

## 固定来源与记录范围 {#transcripts-scope}

本章只覆盖 CLI 界面，结论来自官方仓库 `charmbracelet/crush` 在固定 commit `8da349060b7df148d209979be0a5e9c9281d1f15` 的源码树（本轮候选知识库内的 `snapshot-crush-transcripts-*`，抓取时间 2026-10-06T04:33:25Z，`distribution: source-tree`、`os: linux`、`arch: x64`）。这一 commit 只代表源码树，不代表任何已发布二进制或 npm 包版本的行为；本章不写发行版本映射。

在这个 commit 里，Crush 的会话记录不是逐会话一个 JSONL 文件，而是**每个项目一个 SQLite 数据库**：正文（消息、工具调用与结果）在 `messages` 表的 `parts` 列里，会话元数据在 `sessions` 表，两张表都住在数据目录下的 `crush.db` 里 [@ref-crush-transcripts-message-struct][@ref-crush-transcripts-session-struct][@ref-crush-transcripts-schema-read-files]。

落盘的内容覆盖三类：

- **会话正文**。一条消息是一个 `Message`，它的 `Parts` 是一组带类型标签的内容片段，标签全集是 `reasoning`、`text`、`image_url`、`binary`、`tool_call`、`tool_result`、`finish`、`shell_command` [@ref-crush-transcripts-parts-encoding]。工具调用与结果各是一个结构体（`id`/`name`/`input` 与 `tool_call_id`/`content`/`is_error` 等字段），因此工具事件和对话文本存在同一条记录里，不需要另找日志 [@ref-crush-transcripts-part-types]。
- **会话元数据与辅助状态**。`Session` 除标题、时间戳、用量外，还带 `ParentSessionID`（父会话）、`SummaryMessageID`（上下文压缩的锚点）、`Todos`、`Channel` [@ref-crush-transcripts-session-struct]。项目级还有文件版本历史 `File`（`path` + `content` + `version`）与按会话记录的 `read_files` [@ref-crush-transcripts-file-history][@ref-crush-transcripts-schema-read-files]。
- **从记录派生出来的界面状态**。TUI 的输入历史（上下方向键回溯）不是独立文件，而是查询消息表里的 user 消息与 shell 命令片段得到的 [@ref-crush-transcripts-prompt-history]。bang 模式执行的 shell 命令会以 user 角色消息落库，命令与输出存进一个独立的 `ShellCommand` 片段（源码注释说明这样才能在会话恢复时重建），源会话已不存在时静默跳过 [@ref-crush-transcripts-shell-persist][@ref-crush-transcripts-shell-part]。

写入是**最终一致**而不是逐字同步：`Update` 先把新状态收进内存缓冲，到下一个防抖刻度（默认 33 毫秒）或遇到终止态更新时才写 SQLite 并广播事件 [@ref-crush-transcripts-message-service][@ref-crush-transcripts-message-debounce]。所以“消息已经出现在界面上”与“消息已经写进数据库”之间存在一个很短的窗口。

本轮已查入口与已知缺口：章节只覆盖 CLI（`surface_id: cli`），本 commit 中没有独立的桌面或 IDE 界面实现，因此不存在第二个界面的记录形态结论。记录开关方面，`internal/cmd` 下没有关闭 transcript 记录的子命令或全局开关（`crush session` 只有 list/show/last/delete/rename），`crush.db` 始终写入；唯一与记录内容直接相关的配置项是 `options.disable_auto_summarize`，关掉它就不再自动产出摘要消息 [@ref-crush-transcripts-disable-auto-summarize]。本轮未检索到“输入历史”“调试日志”“缓存”的独立存储开关；日志与 spill 文件见下文。

## 数据目录与文件布局 {#transcripts-storage-layout}

Crush 把“每项目状态”放在一个数据目录里，配置字段 `options.data_directory`，注释直接写明它承载 SQLite 数据库与 workspace 覆盖文件，默认值 `.crush`，相对路径按工作目录解析、绝对路径原样使用，落盘后总是绝对路径 [@ref-crush-transcripts-data-directory]。命令行可以用 `-D/--data-dir` 覆盖 [@ref-crush-transcripts-data-dir-flag]。解析顺序是：显式传入的 dataDir 优先；否则若配置里已有值就用它；否则从工作目录向上找最近的 `.crush`，找不到就落在 `<工作目录>/.crush`；最后统一按工作目录 join 并 clean [@ref-crush-transcripts-data-dir-resolve]。也就是说会话库的落点随项目作用域变化，从项目子目录启动时可能命中父项目的数据目录。

数据目录同时决定配置覆盖的落点，其配置来源、合并与默认值规则见配置机制主题（`config.defaults`）。启动时宿主会建目录（`0700`）、在目录里写一个内容为 `*` 的 `.gitignore`（避免整库进版本库）、把当前项目登记进全局 `projects.json`，然后才打开数据库并配置日志文件 [@ref-crush-transcripts-project-bootstrap]。数据库文件名固定为 `crush.db`，路径是数据目录加文件名 [@ref-crush-transcripts-db-connect]。

数据目录内的相关文件布局（`<数据目录>` 为占位符）：

| 路径 | 内容 | 边界 |
|---|---|---|
| `<数据目录>/crush.db` | 会话库：会话、消息正文、文件版本、已读文件、MCP 覆盖 | 记录本体 |
| `<数据目录>/crush.db-wal`、`-shm` | SQLite WAL 日志与共享内存索引 | 进程存活期间可能未并入主库 |
| `<数据目录>/crush.lock` | 数据目录独占锁与持有者信息 | 只在 client/server 模式的 workspace 启动路径获取 |
| `<数据目录>/crush.json` | workspace 级配置覆盖 | 不是会话记录 |
| `<数据目录>/logs/crush.log` | 运行日志 | 诊断用途，不是会话记录 |
| `<数据目录>/shell-output/output-*.log` | 被截断的 shell 输出全文 | 见下文清理小节 |
| `<数据目录>/stats/index.html` | `crush stats` 生成的统计页 | 派生产物 [@ref-crush-transcripts-stats-output] |

其中只有 `crush.db` 与 `shell-output/` 里的文件是会话记录的一部分；`-wal`、`-shm` 是 SQLite 运行期文件，`crush.json`、`logs/`、`stats/` 属于配置或诊断。

数据库之外还有一处跨项目索引：全局数据文件 `crush.json` 同目录下的 `projects.json`，登记每个项目的 `path`、`data_dir` 与 `last_accessed` [@ref-crush-transcripts-projects-registry]。全局数据位置本身随环境变量与操作系统变化：`CRUSH_GLOBAL_DATA` 优先，其次 `XDG_DATA_HOME`，Windows 走 `%LOCALAPPDATA%/crush/`，其余平台走 `~/.local/share/crush/` [@ref-crush-transcripts-global-data-dir]。这段分支只在全局索引与全局配置上体现；**会话库本体始终在项目数据目录里，不随该环境变量迁移**。日志文件路径由同一数据目录推导 [@ref-crush-transcripts-logs-path]。

命名与 ID。普通会话的 ID 是新建时生成的 UUID 字符串 [@ref-crush-transcripts-session-create]；用于生成标题的临时会话 ID 形如 `title-<父会话ID>` [@ref-crush-transcripts-title-session-id]；交给子代理（agent tool）的子会话 ID 由父消息 ID 与工具调用 ID 拼成 `messageID$$toolCallID` [@ref-crush-transcripts-sub-session-id]。三者都是 `sessions.id` 的主键值，父子关系由 `sessions.parent_session_id` 表达。命令行与 TUI 展示用的是 ID 的 XXH3 十六进制散列前缀，不是原值 [@ref-crush-transcripts-session-hash]。

时间戳一律是 Unix 秒整数字段（`created_at`、`updated_at`），不编码进文件名。目录与文件名里也**没有**项目路径编码：项目作用域由“哪个数据目录被选中”承担，而不是由文件名承担。

格式与写入方式：SQLite 单文件，WAL 日志模式，连接时打开 `foreign_keys`、`secure_delete` 等 PRAGMA，连接池把并发数限制为 1 以串行化写入 [@ref-crush-transcripts-db-pragmas]。正文不是追加日志，而是按行 `UPDATE` 覆盖 `messages.parts` 里那份带类型标签的 JSON [@ref-crush-transcripts-parts-encoding]；没有分片，也没有压缩。

已知缺口（Git 分支关联）：本 commit 的 `sessions` 与 `messages` 表都**没有** git 分支列，界面上的分支名是每次运行时从工作目录现读仓库状态得到的 [@ref-crush-transcripts-git-branch]。因此“某段对话属于哪个分支”只能靠时间点对照仓库历史推断，记录本身不保存这条关联。文件级时间戳也只有秒级精度，同一秒内的事件先后无法从记录恢复。

## 记录 schema 与生命周期 {#transcripts-schema-lifecycle}

第一方记录类型就是数据库表加 `parts` 列里的带标签 JSON 片段；消息自身的 `id`、`role`、`session_id`、`model`、`provider` 与两个时间字段定义在 `Message` 结构体上，`is_summary_message` 也在这层 [@ref-crush-transcripts-message-struct]。最小会话行：

```sql
-- sessions 表（初始迁移，去掉注释后的最小列集）
id TEXT PRIMARY KEY,
parent_session_id TEXT,
title TEXT NOT NULL,
message_count INTEGER NOT NULL DEFAULT 0,
prompt_tokens INTEGER NOT NULL DEFAULT 0,
completion_tokens INTEGER NOT NULL DEFAULT 0,
cost REAL NOT NULL DEFAULT 0.0,
updated_at INTEGER NOT NULL,
created_at INTEGER NOT NULL
```

消息行是 `id`、`session_id`、`role`、`parts`、`model`、`created_at`、`updated_at`、`finished_at`，其中 `parts TEXT NOT NULL default '[]'`，外键指向 `sessions(id)` 且 `ON DELETE CASCADE` [@ref-crush-transcripts-schema-sessions][@ref-crush-transcripts-schema-messages]。`parts` 的编码是类型标签加载荷的包装数组：

```json
[
  { "type": "text", "data": { "text": "重构这个函数" } },
  { "type": "tool_call", "data": { "id": "call_1", "name": "edit", "input": "{}", "provider_executed": false, "finished": true } },
  { "type": "tool_result", "data": { "tool_call_id": "call_1", "name": "edit", "content": "ok", "data": "", "mime_type": "", "metadata": "", "is_error": false } },
  { "type": "finish", "data": { "reason": "end_turn", "time": 0 } }
]
```

`type` 的全集是 `reasoning`、`text`、`image_url`、`binary`、`tool_call`、`tool_result`、`finish`、`shell_command` [@ref-crush-transcripts-parts-encoding]。载荷结构由各内容类型的字段定义，`tool_call` 带 `id`/`name`/`input`/`provider_executed`/`finished`，`tool_result` 带 `tool_call_id`/`name`/`content`/`data`/`mime_type`/`metadata`/`is_error` [@ref-crush-transcripts-part-types]；bang 模式 shell 命令单独成片段，注释明确说它存在就是为了在会话恢复时能被重建 [@ref-crush-transcripts-shell-part]。片段顺序即消息内事件顺序，`role` 与 `session_id` 在外层列上。

版本迁移由 goose 管理：迁移文件被内嵌进二进制，`Connect` 每次打开都执行 `goose.Up` [@ref-crush-transcripts-db-connect]。也就是说表结构随程序自动升级，没有面向用户的手动迁移步骤；反过来，旧版本程序读到被新版本升级过的库会怎样，本轮没有查证。

生命周期，按发生顺序：

1. **创建**。会话由 `Create` 插入一行并生成 UUID；子会话与标题会话按上文的三种 ID 形态创建并写入 `parent_session_id` [@ref-crush-transcripts-session-create]。
2. **追加**。每条消息一行，流式增量进入内存缓冲；同 33 毫秒窗口内的增量合并成一次 SQL 写入与一次事件广播 [@ref-crush-transcripts-message-debounce]。
3. **刷盘**。终止态更新（消息结束、工具调用新增或结束、推理段结束）绕开防抖，在 `Update` 返回前同步落盘；其余需要更强顺序的读取方（关闭、切会话）显式调用 `Flush`/`FlushAll` [@ref-crush-transcripts-message-service]。切换会话时后端会先排空防抖再读列表，注释写明这是为了让 TUI 与 HTTP 客户端看到最新状态而不是与防抖计时器竞争。
4. **关闭**。应用关闭时先取消所有 agent，再用 5 秒超时上下文把防抖缓冲排空，然后才关闭连接 [@ref-crush-transcripts-shutdown-flush]。强杀（SIGKILL、断电）会丢掉防抖窗口内尚未落盘的增量。
5. **恢复**。重开项目后从 `sessions` 取会话、按 `created_at` 升序读 `messages` 即重建对话；上下文压缩过的会话改从摘要消息之后读取 [@ref-crush-transcripts-compacted-read]。
6. **上下文压缩**。压缩动作本身也落盘：它新建一条 `is_summary_message` 为真的 assistant 消息承载摘要，并把该消息 ID 记到会话的 `summary_messageID` 上 [@ref-crush-transcripts-summarize]。压缩只改变“读多少”，不删除旧消息；对应的查询按摘要消息的 `created_at` 取其之后的记录，因为时间戳只有秒级精度可能多带回几条，调用方再按消息 ID 切片 [@ref-crush-transcripts-messages-from-summary]。
7. **交给子代理**。子代理拿到的是独立会话行，ID 内嵌父消息与工具调用 ID，父会话关系落在 `parent_session_id`；委派机制本身属于自定义 agent 主题（`agents.invocation`），这里只记录它产生的会话行。

超出上下文预算的 shell 输出另有一份落盘：超过 2000 行或 50 KiB 时，正文全文写入数据目录的 `shell-output/` 子目录，数据库里只留截断后的首尾加一个文件指针 [@ref-crush-transcripts-shell-spill-limits][@ref-crush-transcripts-shell-spill-write]。所以一条消息的可见内容与磁盘上的实际内容之间可能有缺口，需要读 spill 文件才能补全。

schema 缺口（如实列出）：本 commit 没有随包发布的 schema 文档或版本号常量，字段含义只能从 Go 结构体与迁移文件读出；`parts` 里各 `data` 对象没有独立的 JSON Schema，字段的“必填”与 `omitempty` 行为分散在各结构体上；`todos`、`channel` 等后加字段的迁移与空值语义也没有文档化说明。

## 数据库分工与必要文件 {#transcripts-database}

Crush 确实使用数据库，而且数据库就是记录本体，不存在“会话文件 + 数据库”的双份：`Connect` 按数据目录拼出 `crush.db` 并立即执行迁移，连接池按绝对路径去重，同一进程内对同一文件只保留一个连接，引用计数归零才关闭 [@ref-crush-transcripts-db-connect]。

分工可以这样理解：

- `sessions` 表存会话元数据与用量，`message_count` 由 `messages` 表的插入触发器在每次 `INSERT` 时加一 [@ref-crush-transcripts-schema-sessions][@ref-crush-transcripts-schema-messages][@ref-crush-transcripts-message-count-trigger]。
- `messages` 表存**正文**：每条消息一行，`parts` 列承载全部内容片段。库以 WAL 运行并开启 `foreign_keys` 与 `secure_delete`，写入经连接池串行化 [@ref-crush-transcripts-db-pragmas]。
- `files` 表存 agent 改文件前的版本快照（`path` + `content` + `version`，对 `(path, session_id, version)` 唯一）[@ref-crush-transcripts-schema-files]，服务层对应 `history.File` [@ref-crush-transcripts-file-history]。它服务于会话内的文件回退，不是对话记录本身。
- `read_files` 表按 `(path, session_id)` 记录最后读取时间，用于避免重复读文件 [@ref-crush-transcripts-schema-read-files]。
- `mcp_disabled_servers`、`mcp_enabled_servers` 保存仓库作用域的 MCP 启停覆盖（各只有 `name` 主键），与会话记录无关但同库 [@ref-crush-transcripts-schema-mcp-disabled][@ref-crush-transcripts-schema-mcp-enabled]；覆盖本身的生效规则见 MCP 主题（`mcp.exposure`）。

恢复一个会话所必需的是 `crush.db` 中的 `sessions` 行与其 `messages` 行；`files` 行只在需要回退文件改动时才必需。**能重建的部分**：表结构可以重建——`Connect` 会跑内嵌的迁移，空库或缺表的库会被补齐；索引可以重建。**不能重建的部分**：消息正文、会话元数据、文件快照一旦丢失就只能重新生成，没有第二份来源。WAL 模式下若在进程仍存活时直接拷走 `crush.db`，未 checkpoint 的页可能不在主库文件里，需要一并处理 `-wal`/`-shm`，或先让进程正常退出。

并发模型决定了备份与清理的时机：数据目录锁默认关闭、由 server 的 workspace 启动路径显式打开，被占用时 `Connect` 返回 `ErrDataDirLocked` 并附带持有者信息 [@ref-crush-transcripts-datalock-optin][@ref-crush-transcripts-datalock]。锁是排他且非阻塞的 advisory flock，权威状态在内核文件描述符而不是锁文件内容；`CRUSH_SKIP_DATADIR_LOCK` 会直接返回一个空操作锁，注释把它定位为不支持 advisory locking 的文件系统的逃生口，不建议常规使用 [@ref-crush-transcripts-skip-lock][@ref-crush-transcripts-datalock-acquire]。锁文件本身留在数据目录里，释放只是关掉文件描述符。

## 删除、保留与归档 {#transcripts-cleanup-archive}

官方删除入口是 `crush session delete <会话ID>`（别名 `rm`）与 `crush session rename` [@ref-crush-transcripts-session-mutate-commands]，TUI 里还有会话对话框的删除确认，确认后调用同一套工作区删除接口 [@ref-crush-transcripts-tui-delete]。删除是显式事务：先删该会话的消息，再删文件版本，最后删会话行，成功后清理内存态并广播删除事件 [@ref-crush-transcripts-session-delete]。子表 `messages`、`files`、`read_files` 都以外键 `ON DELETE CASCADE` 指向 `sessions`，所以即便绕开服务层直接删 `sessions` 行，这些行也会跟着清 [@ref-crush-transcripts-schema-messages][@ref-crush-transcripts-schema-files]。目标 ID 可以是 UUID，也可以是散列或散列前缀。

手动删除数据库文件或表行的后果要分开看。删整个数据目录等于删掉这个项目的全部会话、文件快照与 MCP 覆盖，没有回收路径；删单行则在 `foreign_keys=ON` 与 `secure_delete=ON` 的连接下会级联清理并把页内容置零 [@ref-crush-transcripts-db-pragmas]，但**不在源码中查证过的手工 SQL 组合仍可能留下不一致**。可以确定的是：删除前必须先停掉写入者——至少要退出正在使用该数据目录的 crush 进程，否则内存防抖缓冲会在删除之后把内容重新写回；被另一个 workspace 进程占着时，打开连接就会撞上 `ErrDataDirLocked`，删除请求根本进不到 SQL [@ref-crush-transcripts-datalock]。同理，备份 `crush.db` 前也应确认没有活跃写入者，或接受 WAL 未 checkpoint 的部分。

保留机制只有一处，且范围有限：shell 输出 spill 文件，超预算时正文被写成单独的文件并把指针留在消息里 [@ref-crush-transcripts-shell-persist]。清理函数按 7 天保留期删除过期文件，再把目录压到 256 MiB 以内，匹配范围被限制为 `output-*.log` 这一形状，避免误删同一目录里的无关文件 [@ref-crush-transcripts-shell-spill-limits][@ref-crush-transcripts-shell-spill-cap][@ref-crush-transcripts-shell-spill-prune]。每个进程每个目录只扫一次，失败只记 debug 不影响主流程 [@ref-crush-transcripts-shell-spill-write]。会话记录本身在本 commit 里没有保留期、容量上限或按时间清理的开关。

归档方面：本 commit 的 `internal/cmd` 下没有导出或归档子命令，`crush session` 只有 list/show/last/delete/rename [@ref-crush-transcripts-session-mutate-commands]。因此“原生归档开关”在这个 commit 里查不到，最接近导出的是 `crush session show --json` 输出的可读快照，以及直接复制整个数据目录。复制目录带来的损失是具体的：spill 文件的绝对路径在消息里以指针形式存在，移动到另一台机器或另一个路径后，这些指针会指向原位置；`.gitignore`、`crush.json`、`stats/` 也会一起被复制，需要读者自己判断哪些该带走。**不能据此推断“数据目录里没有别的东西”**——本轮只核对了会话记录与维持它所需的存储，没有逐项审计缓存、日志与遥测。

## 定位与排错 {#transcripts-diagnostics}

排查顺序在固定源码里是稳定的：

1. **确认路径**。`crush dirs` 打印全局配置目录、全局数据目录与项目级配置目录 [@ref-crush-transcripts-dirs-cmd]；实际数据库位置由 `options.data_directory` 与 `--data-dir` 决定，规则见上文小节。
2. **列出与读取会话**。`crush session list`、`crush session show <会话ID>`、`crush session last` 都支持 `--json` [@ref-crush-transcripts-session-commands][@ref-crush-transcripts-session-json-flags]。ID 可以是 UUID、完整散列或散列前缀；前缀命中多个会话时命令报错并列出候选，而不是随便挑一个 [@ref-crush-transcripts-session-id-lookup]。`show --json` 输出的是会话元数据加逐条消息的 role、时间、模型、provider 与片段，是目前最接近“导出单条会话”的形态 [@ref-crush-transcripts-session-show-json]。
3. **跨项目聚合**。`crush stats` 可以指定 `--crawl-dir` 递归找出多个项目的 `.crush/crush.db`，或用 `--all` 汇总已登记项目 [@ref-crush-transcripts-stats-flags]；这条路径走只读连接，不跑迁移 [@ref-crush-transcripts-stats-crawl][@ref-crush-transcripts-db-readonly]。它的作用是验证“某个库里有没有数据”，不是修复库。
4. **日志**。`crush logs` 读数据目录下的 `logs/crush.log`，支持 `--follow` 与 `--tail`；文件不存在时提示“不在 crush 项目里”而不是报错 [@ref-crush-transcripts-logs-path]。
5. **并发与锁错误**。看到“数据目录已被另一个 crush 进程占用”时，对照的是 `crush.lock` 里的持有者信息与 `ErrDataDirLocked` [@ref-crush-transcripts-datalock]。先确认是否还有残留进程；`CRUSH_SKIP_DATADIR_LOCK` 能强行绕过，但源码注释把它定位为逃生口，正常排错不该用它 [@ref-crush-transcripts-skip-lock]。

完整性检查方面，本 commit 提供的是**读路径**而非校验工具：没有会话一致性校验命令，也没有重建/修复索引的子命令。可观察的健全信号是 `crush session list` 与 `show` 能正常列出并读出消息、`stats` 能汇总出数据。任何超出这些信号（尤其是“手动改库之后是否安全”）的判断，本轮没有固定来源支撑。