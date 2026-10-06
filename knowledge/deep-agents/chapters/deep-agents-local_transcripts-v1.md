---
schema_version: 3
record_kind: production
edition_id: deep-agents-local_transcripts-v1
harness_id: deep-agents
topic: local_transcripts
title: Deep Agents Code 的本地会话记录：sessions.db checkpoint、profile 路径布局、hook 投影、conversation_history 归档与 threads 删除
sections:
- section_id: transcripts-record-scope
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-thread-list-index-note
  - ref-deep-agents-lt-resume-state-channels
  - ref-deep-agents-lt-thread-list-query
  - ref-deep-agents-lt-hook-transcript-store
  - ref-deep-agents-lt-doc-startup-cmd
  - ref-deep-agents-lt-debug-dir-resolution
  - ref-deep-agents-lt-thread-checkpointer
- section_id: transcripts-storage-layout
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-profile-root-default
  - ref-deep-agents-lt-profile-root-resolution
  - ref-deep-agents-lt-profile-state-dir
  - ref-deep-agents-lt-profile-paths-state-layout
  - ref-deep-agents-lt-debug-dir-default
  - ref-deep-agents-lt-archive-dir-name
  - ref-deep-agents-lt-hook-transcript-root
  - ref-deep-agents-lt-sessions-db-path
  - ref-deep-agents-lt-hook-private-dirs
  - ref-deep-agents-lt-harden-state-dir
  - ref-deep-agents-lt-harden-state-dir-windows
  - ref-deep-agents-lt-thread-id-generation
  - ref-deep-agents-lt-archive-delete-path
  - ref-deep-agents-lt-handoff-archive-prefix
  - ref-deep-agents-lt-owner-lock-paths
  - ref-deep-agents-lt-debug-log-name
  - ref-deep-agents-lt-hook-safe-component
  - ref-deep-agents-lt-hook-transcript-path
  - ref-deep-agents-lt-hook-agent-transcript-path
  - ref-deep-agents-lt-legacy-state-names
  - ref-deep-agents-lt-state-migration-startup
  - ref-deep-agents-lt-history-append
  - ref-deep-agents-lt-history-bounded
- section_id: transcripts-hook-projection
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-hook-transcript-root
  - ref-deep-agents-lt-hook-transcript-store
  - ref-deep-agents-lt-hook-record-shape
  - ref-deep-agents-lt-hook-record-redaction
  - ref-deep-agents-lt-hook-materialize-merge
  - ref-deep-agents-lt-hook-backup-prune
- section_id: transcripts-record-format
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-thread-list-index-note
  - ref-deep-agents-lt-hook-materialize-merge
  - ref-deep-agents-lt-history-bounded
  - ref-deep-agents-lt-archive-dir-name
  - ref-deep-agents-lt-hook-record-shape
  - ref-deep-agents-lt-btw-cost-table
  - ref-deep-agents-lt-thread-checkpointer
  - ref-deep-agents-lt-thread-list-query
  - ref-deep-agents-lt-thread-metadata-stamp
  - ref-deep-agents-lt-resume-state-channels
  - ref-deep-agents-lt-thread-cwd-filter
- section_id: transcripts-thread-lifecycle
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-thread-id-generation
  - ref-deep-agents-lt-thread-checkpointer
  - ref-deep-agents-lt-thread-seed
  - ref-deep-agents-lt-thread-metadata-stamp
  - ref-deep-agents-lt-hook-transcript-store
  - ref-deep-agents-lt-hook-agent-transcript-path
  - ref-deep-agents-lt-doc-agents-sessions
  - ref-deep-agents-lt-slash-threads
  - ref-deep-agents-lt-slash-offload
  - ref-deep-agents-lt-compaction-archive-path
  - ref-deep-agents-lt-handoff-archive-plan
  - ref-deep-agents-lt-handoff-seed-text
  - ref-deep-agents-lt-startup-history-sweep
- section_id: transcripts-database-role
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-sessions-db-path
  - ref-deep-agents-lt-btw-cost-table
  - ref-deep-agents-lt-owner-lock-paths
  - ref-deep-agents-lt-legacy-state-names
  - ref-deep-agents-lt-thread-list-index-note
  - ref-deep-agents-lt-thread-list-index-ddl
- section_id: transcripts-archive-and-cleanup
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-slash-offload
  - ref-deep-agents-lt-compaction-archive-path
  - ref-deep-agents-lt-archive-dir-name
  - ref-deep-agents-lt-archive-delete-doc
  - ref-deep-agents-lt-archive-ephemeral
  - ref-deep-agents-lt-history-retention-default
  - ref-deep-agents-lt-history-retention-env
  - ref-deep-agents-lt-history-retention-resolve
  - ref-deep-agents-lt-startup-history-sweep
  - ref-deep-agents-lt-doc-threads-cli
  - ref-deep-agents-lt-doc-dry-run
  - ref-deep-agents-lt-threads-delete-cli
  - ref-deep-agents-lt-thread-delete-command
  - ref-deep-agents-lt-thread-delete-guard
  - ref-deep-agents-lt-thread-delete-cascade
  - ref-deep-agents-lt-archive-delete-path
  - ref-deep-agents-lt-hook-backup-prune
- section_id: transcripts-diagnostics
  surface_ids:
  - cli
  source_refs:
  - ref-deep-agents-lt-doc-threads-cli
  - ref-deep-agents-lt-doc-dry-run
  - ref-deep-agents-lt-thread-list-query
  - ref-deep-agents-lt-thread-cwd-filter
  - ref-deep-agents-lt-profile-root-default
  - ref-deep-agents-lt-harden-state-dir
  - ref-deep-agents-lt-doc-cost-persist
  - ref-deep-agents-lt-btw-cost-table
  - ref-deep-agents-lt-hook-transcript-store
  - ref-deep-agents-lt-debug-dir-resolution
  - ref-deep-agents-lt-debug-dir-default
  - ref-deep-agents-lt-debug-log-name
questions:
- question_id: transcripts.scope
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-record-scope
    status: answered
    source_refs:
    - ref-deep-agents-lt-thread-list-index-note
    - ref-deep-agents-lt-resume-state-channels
    - ref-deep-agents-lt-thread-list-query
    - ref-deep-agents-lt-hook-transcript-store
    - ref-deep-agents-lt-doc-startup-cmd
    - ref-deep-agents-lt-debug-dir-resolution
- question_id: transcripts.location
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-deep-agents-lt-profile-root-default
    - ref-deep-agents-lt-profile-root-resolution
    - ref-deep-agents-lt-profile-state-dir
    - ref-deep-agents-lt-profile-paths-state-layout
    - ref-deep-agents-lt-archive-dir-name
    - ref-deep-agents-lt-hook-transcript-root
    - ref-deep-agents-lt-sessions-db-path
    - ref-deep-agents-lt-hook-private-dirs
    - ref-deep-agents-lt-harden-state-dir
    - ref-deep-agents-lt-harden-state-dir-windows
    - ref-deep-agents-lt-legacy-state-names
    - ref-deep-agents-lt-debug-dir-default
- question_id: transcripts.naming
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-deep-agents-lt-thread-id-generation
    - ref-deep-agents-lt-archive-delete-path
    - ref-deep-agents-lt-handoff-archive-prefix
    - ref-deep-agents-lt-owner-lock-paths
    - ref-deep-agents-lt-debug-log-name
    - ref-deep-agents-lt-hook-safe-component
    - ref-deep-agents-lt-hook-transcript-path
    - ref-deep-agents-lt-hook-agent-transcript-path
- question_id: transcripts.format
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-record-format
    status: answered
    source_refs:
    - ref-deep-agents-lt-thread-list-index-note
    - ref-deep-agents-lt-hook-materialize-merge
    - ref-deep-agents-lt-history-bounded
    - ref-deep-agents-lt-archive-dir-name
- question_id: transcripts.schema
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-record-format
    status: partial
    source_refs:
    - ref-deep-agents-lt-hook-record-shape
    - ref-deep-agents-lt-btw-cost-table
    - ref-deep-agents-lt-thread-checkpointer
    - ref-deep-agents-lt-thread-list-query
    - ref-deep-agents-lt-thread-metadata-stamp
    - ref-deep-agents-lt-resume-state-channels
- question_id: transcripts.lifecycle
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-thread-lifecycle
    status: answered
    source_refs:
    - ref-deep-agents-lt-thread-id-generation
    - ref-deep-agents-lt-thread-seed
    - ref-deep-agents-lt-thread-metadata-stamp
    - ref-deep-agents-lt-thread-checkpointer
    - ref-deep-agents-lt-hook-transcript-store
    - ref-deep-agents-lt-hook-agent-transcript-path
    - ref-deep-agents-lt-doc-agents-sessions
    - ref-deep-agents-lt-slash-threads
    - ref-deep-agents-lt-slash-offload
    - ref-deep-agents-lt-compaction-archive-path
    - ref-deep-agents-lt-handoff-archive-plan
    - ref-deep-agents-lt-handoff-seed-text
    - ref-deep-agents-lt-startup-history-sweep
- question_id: transcripts.database
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-database-role
    status: answered
    source_refs:
    - ref-deep-agents-lt-sessions-db-path
    - ref-deep-agents-lt-thread-list-index-note
    - ref-deep-agents-lt-thread-list-index-ddl
    - ref-deep-agents-lt-btw-cost-table
    - ref-deep-agents-lt-owner-lock-paths
    - ref-deep-agents-lt-legacy-state-names
- question_id: transcripts.archive
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-archive-and-cleanup
    status: partial
    source_refs:
    - ref-deep-agents-lt-slash-offload
    - ref-deep-agents-lt-compaction-archive-path
    - ref-deep-agents-lt-archive-dir-name
    - ref-deep-agents-lt-archive-delete-doc
    - ref-deep-agents-lt-archive-ephemeral
    - ref-deep-agents-lt-startup-history-sweep
- question_id: transcripts.cleanup
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-archive-and-cleanup
    status: answered
    source_refs:
    - ref-deep-agents-lt-history-retention-default
    - ref-deep-agents-lt-history-retention-env
    - ref-deep-agents-lt-history-retention-resolve
    - ref-deep-agents-lt-startup-history-sweep
    - ref-deep-agents-lt-doc-threads-cli
    - ref-deep-agents-lt-doc-dry-run
    - ref-deep-agents-lt-threads-delete-cli
    - ref-deep-agents-lt-thread-delete-command
    - ref-deep-agents-lt-thread-delete-guard
    - ref-deep-agents-lt-thread-delete-cascade
    - ref-deep-agents-lt-archive-delete-path
    - ref-deep-agents-lt-archive-delete-doc
    - ref-deep-agents-lt-hook-backup-prune
- question_id: transcripts.diagnostics
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-diagnostics
    status: partial
    source_refs:
    - ref-deep-agents-lt-doc-threads-cli
    - ref-deep-agents-lt-doc-dry-run
    - ref-deep-agents-lt-thread-list-query
    - ref-deep-agents-lt-thread-cwd-filter
    - ref-deep-agents-lt-profile-root-default
    - ref-deep-agents-lt-harden-state-dir
    - ref-deep-agents-lt-doc-cost-persist
    - ref-deep-agents-lt-btw-cost-table
    - ref-deep-agents-lt-hook-transcript-store
    - ref-deep-agents-lt-debug-dir-resolution
    - ref-deep-agents-lt-debug-dir-default
    - ref-deep-agents-lt-debug-log-name
---

Deep Agents Code（`dcode`）是 Python 实现的 CLI 形态 Agent 宿主。它的会话记录不是一套自研日志，而是三路并行：主路把整张 LangGraph 状态图交给 checkpointer 落进一个 SQLite 文件；旁路为 hooks 客户端维护一份按线程切分的 JSONL 投影；再旁路是压缩产出的 Markdown 归档。输入框的历史回填另有一个 JSONL 文件。搞清这四者的分工，是判断"哪份文件能删、删了会丢什么"的前提。

本文只覆盖 `cli` 界面（Deep Agents Code / `dcode`）。

固定来源范围：仓库 `https://github.com/langchain-ai/deepagents.git` 在 commit `4b9410272a4e4885ec70fb1ec8549e307a15e585` 的源码树（`source-deep-agents-repo`，抓取时间 2026-10-06T04:33:30Z），以及官方命令参考文档 `https://docs.langchain.com/oss/deepagents/code/cli-reference.md` 的归档原件（sha256 `d76bb88e…`，抓取时间同上）。两条来源的 `version_applicability` 都是 unknown：源码 commit 只证明该提交下的源码树，不代表任何已发布发行包的行为；文档页面未标注适用版本，因此本文不写 `mappings/`。平台边界：路径与权限结论以 POSIX 为准，源码对 Windows 单独分支的地方在正文中点出。路径一律写成语义形式：`{profile}` 指 profile 根目录（默认 `~/.deepagents`），不出现执行机的绝对路径。

## 记录范围：checkpoint 状态、hook 投影与被排除的内容 {#transcripts-record-scope}

会话正文的唯一权威载体是 `sessions.db` 里的 checkpoint 行。`sessions.py` 在解释线程列表索引为何需要覆盖索引时写明了存储形态：LangGraph 的 `SqliteSaver` 把每个 checkpoint 的**完整状态 blob 内联存在 `checkpoints` 行里**，与较小的 `metadata` 字段并列 [@ref-deep-agents-lt-thread-list-index-note]。因此"会话记录"包含的不只是聊天消息，还包括图上的全部通道值。

能从固定来源确证的通道类别有两类。一类是消息通道与工具事件，它们与模型回合一起被 checkpoint；另一类是恢复时读回的一组私有通道，`resume_state.py` 的模块注释逐项列出——`_context_tokens`（供 `/tokens` 与状态栏）、`_model_spec` / `_model_params`（让 `dcode -r` 恢复线程原本使用的模型而不是全局默认）、`_last_model_request_at` / `_last_cache_model_spec`（供 TUI 判断提示词前缀是否已冷） [@ref-deep-agents-lt-resume-state-channels]。注释同时说明写入路径的分工：模型回合内的通道由图内中间件随同一次 checkpoint 落盘，用户/Agent 拥有的通道（目标、rubric 等）由 TUI 客户端经 `aupdate_state` 写入。

线程元数据也落在同一行的 `metadata` JSON 里。线程列表查询用 `json_extract` 读取 `agent_name`、`updated_at`、`created_at`、`git_branch`、`cwd` [@ref-deep-agents-lt-thread-list-query]，所以"哪个 Agent 拥有这个线程""当时在哪个目录、哪个 git 分支"这类信息是随会话一起持久化的，而不是另存一份清单。

第二路记录是给 hooks 用的客户端投影，源码称之为"由客户端进程拥有的、按版本管理的逐线程与逐子代理 JSONL"，供 hook 命令经 `transcript_path` / `agent_transcript_path` 读取 [@ref-deep-agents-lt-hook-transcript-store]。它是 checkpoint 的**投影而不是副本**：两者之间没有同步关系。

不落盘的内容同样要分清。`--startup-cmd` 的输出会渲染在 transcript 里供人阅读，但官方文档明确说明它**不会被加入 Agent 的消息历史**；要把命令输出交给 Agent 只能走 stdin [@ref-deep-agents-lt-doc-startup-cmd]。`/btw` 侧问的答案出现在临时对话框中，同样不进入主对话。调试日志是第三个独立文件，属于**可选开关**，日志目录可由环境变量或 `config.toml` 的 `[debug]` 段改写 [@ref-deep-agents-lt-debug-dir-resolution]，与前两路都不是一回事。

本轮没有找到"关闭 checkpoint 记录"的开关：`get_checkpointer()` 在会话启动路径上被直接取用，返回绑定到 `sessions.db` 的 `AsyncSqliteSaver` [@ref-deep-agents-lt-thread-checkpointer]，没有被配置项或环境变量包裹。已查入口：`sessions.py` 的 checkpointer 工厂、`main.py` 启动路径、`config_manifest.py` 选项表。剩余缺口：是否存在绕过 checkpointer 的无痕模式，本轮固定来源未给出证据，不作断言。

## 存储位置与命名 {#transcripts-storage-layout}

全部本地记录都挂在一个"用户 profile 根"下面。未配置时根目录是 home 下的 `.deepagents` [@ref-deep-agents-lt-profile-root-default]；配置 `DEEPAGENTS_HOME` 时接受绝对路径或以 `~/` 开头的相对路径，解析结果被规范化后固定下来 [@ref-deep-agents-lt-profile-root-resolution]。这个快照在加载任何 dotenv 之前捕获并导出给子进程，所以客户端与 server 子进程不会各选一个 profile。

根目录下的布局由一段路径构造函数固定 [@ref-deep-agents-lt-profile-state-dir] [@ref-deep-agents-lt-profile-paths-state-layout]：

| 语义路径 | 内容 | 形态 |
|---|---|---|
| `{profile}/.state/` | 应用自用状态目录 | 目录，POSIX 下 `0o700` |
| `{profile}/.state/sessions.db` | 会话 checkpoint 主库 | SQLite |
| `{profile}/.state/sessions.db-wal`、`-shm` | SQLite 边车文件 | 视 WAL 模式与关机时是否落盘而定 |
| `{profile}/.state/sessions.db.owners/` | 线程归属锁文件目录 | 每线程两个 `0o600` 锁文件 |
| `{profile}/.state/history.jsonl` | 输入提示历史 | JSON Lines，仅供上箭头导航 |
| `{profile}/.state/auth.json`、`{profile}/.state/mcp-tokens/` | 凭据类状态 | 不属于会话记录 |
| `{profile}/transcripts/` | hooks 客户端投影 | 逐线程 JSONL 与 `.bak-*` 旧版 |
| `{profile}/conversation_history/` | 压缩产出的会话归档 | 每线程一个 Markdown 文件 |
| 调试目录（默认 `/tmp/deepagents_debug` [@ref-deep-agents-lt-debug-dir-default]） | 逐线程 debug 日志 | 可选开关 |

`.state` 目录是拼出来的，其下挂 `sessions.db` 与 `history.jsonl`；`conversation_history` 与 `transcripts` 则直接位于根下 [@ref-deep-agents-lt-archive-dir-name] [@ref-deep-agents-lt-hook-transcript-root]。会话库的最终路径在 `get_db_path()` 里解析，解析前先对状态目录做一次加固 [@ref-deep-agents-lt-sessions-db-path]；hooks 投影目录同样按私有模式建立，POSIX 上逐级 `chmod` [@ref-deep-agents-lt-hook-private-dirs]。

目录加固有实际含义，注释写得很直白：状态目录存放 `sessions.db` 与 `history.jsonl`，保存完整对话内容且按默认文件模式写入，**目录权限是挡住同机其他本地用户的唯一手段**，因此所有创建方都必须走这个函数而不能裸创建目录 [@ref-deep-agents-lt-harden-state-dir]。平台差异必须写清楚：失败只记日志不抛出，而且在 Windows 上权限收紧步骤被跳过，目录沿用父目录继承的 ACL，本函数不额外提供保护 [@ref-deep-agents-lt-harden-state-dir-windows]。在 Linux 上把 `.state` 拷走或共享给其它账号，等于交出完整对话记录。

命名规则。线程 ID 由 `uuid7()` 生成完整 UUID 字符串，注释说明选它是为了天然按创建时间排序 [@ref-deep-agents-lt-thread-id-generation]。围绕这个 ID 派生出四套文件名：

- 会话归档：Markdown 文件名直接是线程 ID 加 `.md` 后缀 [@ref-deep-agents-lt-archive-delete-path]。
- 交接快照：文件名前缀是 `handoff_` 加上线程 ID 的 sha256，再跟随机后缀，从而把来源线程的归属编码进文件名，既不嵌入路径也不用通配符 [@ref-deep-agents-lt-handoff-archive-prefix]。
- 线程锁：`{profile}/.state/sessions.db.owners/` 下以线程 ID 的 sha256 命名的 `.client` 与 `.writer` 两个文件，目录以 `0o700` 创建、锁文件以 `0o600` 创建 [@ref-deep-agents-lt-owner-lock-paths]。锁文件名是纯哈希，不含时间戳。
- 调试日志：合法的短线程 ID 直接用作文件名，加 `.log`；过长或含不安全字符时退化为 `thread-` 加 sha256 前 16 位 [@ref-deep-agents-lt-debug-log-name]。

hooks 投影是唯一不直接用线程 ID 命名的一路：文件名经 `_safe_component` 归一化，取 NFKD 归一后的可读 ASCII 前缀加短横线，再拼上完整 sha256，形式为 `{prefix}--{sha256}` [@ref-deep-agents-lt-hook-safe-component]。主线程文件是 `{profile}/transcripts/{safe(thread_id)}.jsonl` [@ref-deep-agents-lt-hook-transcript-path]；子代理文件嵌套在 `{profile}/transcripts/{safe(thread_id)}/agents/{safe(agent_id)}.jsonl` [@ref-deep-agents-lt-hook-agent-transcript-path]。所以"父子"关系在这一路是目录结构而非字段，跨线程对比时要注意前缀被截断、只有哈希后缀有区分度。

项目路径不编码进任何文件名，而是作为 `cwd` 元数据存在库里供过滤使用。历史上这些状态文件曾平铺在 profile 根下，启动时会做一次幂等迁移，把 `sessions.db`、`sessions.db-wal`、`sessions.db-shm`、`history.jsonl` 等名字搬进 `.state/`；注释说明 `-wal` 与 `-shm` 是否存在取决于是否以 WAL 模式打开以及关机前是否跑过 checkpoint [@ref-deep-agents-lt-legacy-state-names]。若旧文件与新位置同时存在，迁移会跳过并告警而不是覆盖 [@ref-deep-agents-lt-state-migration-startup]。所以在较旧版本留下的机器上排查路径问题时，要同时看 `{profile}/` 与 `{profile}/.state/`。

输入提示历史是另一回事。`history.jsonl` 每行一个 JSON 字符串，`HistoryManager` 以追加写方式落盘，注释说明多个 Agent 写同一文件也不会损坏 [@ref-deep-agents-lt-history-append]；默认最多保留 100 条供上箭头导航 [@ref-deep-agents-lt-history-bounded]。它只是输入框的回填来源，不参与线程恢复。

## hooks 客户端投影：位置、记录形状与刷新语义 {#transcripts-hook-projection}

这一路独立于 `sessions.db`，由 hooks 运行时持有 `TranscriptStore`，根目录默认是 `{profile}/transcripts`，调用方可以改 [@ref-deep-agents-lt-hook-transcript-root]。它是**只增不改**的 JSONL 投影，存在的唯一理由是给 hook 脚本一个可读的对话文件 [@ref-deep-agents-lt-hook-transcript-store]。

记录形状是第一方定义、可以逐字段引用的一类。`_record_from_message` 把 `BaseMessage` 子类映射为四个角色（`HumanMessage`→`user`、`AIMessage`→`assistant`、`ToolMessage`→`tool`、`SystemMessage`→`system`），无法识别的消息类型直接返回 `None` 即不落投影 [@ref-deep-agents-lt-hook-record-shape]。每条记录带 `sequence`、自增 `record_id`（优先用 message 的 id，否则退化为 `role:sequence`）、`thread_id`、`agent_id`、`role`、`message_id`、`content` 与工具名 `name`。

内容在写入前统一过一遍脱敏：键名命中密钥环境变量规则的字典项被替换为 `[redacted]`，文本里的 `KEY=值` 赋值、Bearer 头、带前缀的令牌、JWT 会被替换，URL 只保留 scheme 与主机名，路径、查询值与 fragment 全部抹掉 [@ref-deep-agents-lt-hook-record-redaction]。这意味着**投影可以交给 hook 脚本，但不能当作会话全文备份**——脱敏是不可逆的。

刷新语义要特别注意。`materialize()` 在返回路径前会重写整个逐线程 JSONL 文件，过程在跨进程咨询锁下先重读磁盘记录再合并本进程缓冲，避免另一个 `dcode` 进程恢复同一线程时静默丢记录 [@ref-deep-agents-lt-hook-materialize-merge]。重写会留下 `.bak-*` 旧版，按 `retention_revisions` 修剪 [@ref-deep-agents-lt-hook-backup-prune]。模块文档串同时给出一条使用约束：磁盘上的 JSONL **可能滞后于实时 checkpoint/UI 状态**，需要刚结束那一轮完整内容的 hook 应改用 Stop/SubagentStop 事件上的 `last_assistant_message` [@ref-deep-agents-lt-hook-transcript-store]。

## 记录格式与可确证的 schema {#transcripts-record-format}

形态不止一种，且各自不可互相替代：

- 会话正文：SQLite 单文件，状态 blob 内联在 `checkpoints` 行中 [@ref-deep-agents-lt-thread-list-index-note]。
- hooks 投影：逐线程（逐子代理）JSONL，整文件重写加旧版备份 [@ref-deep-agents-lt-hook-materialize-merge]。
- 输入提示历史：JSON Lines 追加写，条目有上限 [@ref-deep-agents-lt-history-bounded]。
- 压缩归档：Markdown 文件 [@ref-deep-agents-lt-archive-dir-name]。

源码中未见分片、轮转或压缩：主库是单文件，WAL 边车由 SQLite 自己管，归档是普通 Markdown。写入模型是"追加 checkpoint"——每回合产生新的 checkpoint 行，而不是原地改写历史行 [@ref-deep-agents-lt-thread-list-index-note]。

关于 schema，必须区分"本仓库第一方定义"和"来自依赖"。完全属于第一方、可逐字段引用的有两处：hooks 投影的记录字段 [@ref-deep-agents-lt-hook-record-shape]，以及自有的 `dcode_btw_costs` 表——两列，`thread_id TEXT PRIMARY KEY NOT NULL` 与 `breakdown TEXT NOT NULL` [@ref-deep-agents-lt-btw-cost-table]。

`checkpoints` 与 `writes` 两张表的建表语句不在本仓库内，它们由 `langgraph-checkpoint-sqlite` 的 `AsyncSqliteSaver` 定义 [@ref-deep-agents-lt-thread-checkpointer]。本仓库能证实的是**查询与写入这些表时用到的字段**：线程列表查询用 `thread_id`、`checkpoint_id` 列和 `metadata` JSON 中的 `agent_name`、`updated_at`、`created_at`、`git_branch`、`cwd` 五个键 [@ref-deep-agents-lt-thread-list-query]；新线程的元数据用 `json_set` 补写 `$.agent_name`、`$.cwd`、`$.updated_at` [@ref-deep-agents-lt-thread-metadata-stamp]。此外恢复路径读回的一组私有通道名可从 `resume_state.py` 的注释逐项读出 [@ref-deep-agents-lt-resume-state-channels]，但那不是序列化格式的契约。

一个脱敏的最小元数据示例（示意键名与形状，值已占位）：

```json
{
  "agent_name": "agent-profile-name",
  "cwd": "absolute-path-of-workspace",
  "git_branch": "branch-name",
  "created_at": "ISO-8601 UTC timestamp",
  "updated_at": "ISO-8601 UTC timestamp"
}
```

`cwd` 的语义有一个容易踩的点：`list_threads` 的文档串明确写着它是**精确字符串比较**，不做路径规范化、不解析符号链接、不做前缀匹配，且没有存过 `cwd` 的旧行会被过滤掉 [@ref-deep-agents-lt-thread-cwd-filter]。同一路径的不同写法（尾斜杠、符号链接）会得到不同结果。

仍缺的 schema 缺口，照实列出：checkpoint 状态 blob 的字段级定义与序列化格式由 LangChain / LangGraph 的消息类型与 `JsonPlusSerializer` 决定，本仓库不重新定义，本轮也没有取到该序列化器的固定来源；因此**无法给出状态 blob 的字段级 schema，也无法说明其版本迁移规则**。`state_migration.py` 只处理文件位置的迁移，不涉及记录格式版本。

## 会话生命周期：创建、追加、恢复、压缩与交接 {#transcripts-thread-lifecycle}

创建时先取一个 UUID7 线程 ID [@ref-deep-agents-lt-thread-id-generation]，再由绑定到会话库的 checkpointer 写入首个 checkpoint [@ref-deep-agents-lt-thread-checkpointer]。远程 handoff 场景下本地只做"索引"：`save_thread_seed` 在线程不存在时写入一个 `step: 0`、`channel_versions` 全部为同一版本的种子 checkpoint，文档串强调它只补种缺失的线程、绝不替换已存在的服务端 checkpoint [@ref-deep-agents-lt-thread-seed]。随后 `set_thread_metadata` 补写 `agent_name`、`cwd` 与当前时间戳，若该线程没有任何 checkpoint 则抛 `RuntimeError` [@ref-deep-agents-lt-thread-metadata-stamp]。

每回合模型响应都随图执行追加 checkpoint；同一批消息还会经 `append_messages` 进入 hooks 投影缓冲 [@ref-deep-agents-lt-hook-transcript-store]。子代理的消息按 `agent_id` 分流，写到嵌套的子代理文件 [@ref-deep-agents-lt-hook-agent-transcript-path]。

恢复有两条入口：启动时 `dcode -r`（不带 ID 打开最近线程，带 ID 打开指定线程，且恢复会绕过 Agent 选择标志、还原线程原本的 Agent），以及会话内 `/threads` 浏览并恢复历史线程 [@ref-deep-agents-lt-doc-agents-sessions] [@ref-deep-agents-lt-slash-threads]。`/clear` 的语义是开一个新线程，而不是清空旧记录。

上下文压缩走 `/offload`，别名 `/compact`，参数是可选的模型规格 [@ref-deep-agents-lt-slash-offload]。压缩在**当前线程内**推进截断点，并把被摘掉的消息写进归档；执行结果里带上归档路径与一个"存储是否为临时"标志 [@ref-deep-agents-lt-compaction-archive-path]。因此压缩不产生新线程，恢复后仍在原线程延续，只是消息被摘要与截断点替代。

冷缓存提示的 handoff 与压缩不同：它总结**每一条**已 checkpoint 的消息而不推进源线程的截断点，写出一份"承诺完整可恢复"的交接归档 [@ref-deep-agents-lt-handoff-archive-plan]，然后新线程的第一条消息里带上上一线程 ID 与 transcript 路径 [@ref-deep-agents-lt-handoff-seed-text]。恢复归档缺失时，可回原线程继续。

启动时还有一次后台动作：以线程池执行 `sweep_offloaded_history`，不阻塞事件循环 [@ref-deep-agents-lt-startup-history-sweep]。这是清理路径的入口之一，详见归档与清理一节。

## 数据库与关联文件的分工 {#transcripts-database-role}

`sessions.db`（路径由 `get_db_path()` 解析 [@ref-deep-agents-lt-sessions-db-path]）是恢复一个会话所必需的唯一文件。它承载三类内容：`checkpoints`（内联状态 blob 与 metadata）、`writes`（通道增量的写入记录，线程列表的消息计数在最新 checkpoint 没有内联 `messages` 时要从这里重建）、以及本仓库自有的 `dcode_btw_costs` [@ref-deep-agents-lt-btw-cost-table]。围绕它还有两类附属文件，都不保存会话正文：`{profile}/.state/sessions.db.owners/` 里的线程归属锁 [@ref-deep-agents-lt-owner-lock-paths]，以及可能出现的 `-wal` / `-shm` 边车文件 [@ref-deep-agents-lt-legacy-state-names]。删掉边车文件不会丢记录，删掉 `sessions.db` 会。

`{profile}/conversation_history/` 下的归档与 `{profile}/.state/history.jsonl` 都不参与恢复：前者是摘要与可读转录，后者只是输入框导航历史。

索引值得单独说。`list_threads` 需要按线程聚合 metadata，但 `checkpoints` 表被巨大的状态 blob 撑满，没有覆盖索引时一次列表查询要全表扫描。源码为此建了一个覆盖索引，列顺序与表达式和查询一一对应，注释记录了动机：约 12 GB blob 的 profile 上，全扫要几十秒，索引覆盖后是亚秒级索引扫描 [@ref-deep-agents-lt-thread-list-index-note] [@ref-deep-agents-lt-thread-list-index-ddl]。它用 `CREATE INDEX IF NOT EXISTS` 幂等创建，失败只告警并退回全表扫描，不中断 `threads list`；旧版同族索引会被显式丢弃。**因此索引可以重建，代价是一次全表扫描。**

反过来，消息正文不能从任何旁路重建：归档是压缩后的摘要，hooks 投影既经过脱敏又可能滞后于 checkpoint，二者都不是 checkpoint 状态的备份。已查入口：`offload.py` 的归档写入与删除、`hooks/transcript.py` 的投影写入、`state_migration.py` 的文件迁移、`btw_cost.py` 的费用持久化。剩余缺口：把整个 profile 搬到另一台机器是否需要额外步骤（例如 `DEEPAGENTS_HOME` 与 profile 标记的关系），本轮未取到覆盖迁移场景的固定来源证据。

## 归档、保留与删除 {#transcripts-archive-and-cleanup}

原生归档由 `/offload` 触发，结果里带回归档路径 [@ref-deep-agents-lt-slash-offload] [@ref-deep-agents-lt-compaction-archive-path]，落盘位置是 profile 根下的 `conversation_history/`，每线程一个 Markdown 文件 [@ref-deep-agents-lt-archive-dir-name] [@ref-deep-agents-lt-archive-delete-doc]。

这里有一个必须讲清楚的风险：当持久的 profile 位置不可写时，归档根会退回到临时目录，该状态由一个专门的函数暴露，压缩结果里也带对应标志；源码注释明说这种临时目录**可能熬不过重启**，且该标志在 server/sandbox 模式下恒为 false，因为持久性由服务端后端负责 [@ref-deep-agents-lt-archive-ephemeral]。所以"归档丢了"要先看这个标志，不要直接归因于删除。

保留策略是一个配置项，链路上有四个环节。默认窗口是 30 天 [@ref-deep-agents-lt-history-retention-default]；环境变量与 `config.toml` 的 `[history].retention_days` 都能改它，取值必须是非负整数，**`0` 彻底关闭清理**，无法解析或为负则落到下一个配置来源 [@ref-deep-agents-lt-history-retention-env]。运行时按同一选项解析，解析不出来就回到默认值 [@ref-deep-agents-lt-history-retention-resolve]。清理本身是启动时的后台扫描，只删除归档目录下的 Markdown 直接子文件 [@ref-deep-agents-lt-startup-history-sweep]。

删除会话用 `dcode threads delete ID`。官方文档把它与 `agents reset`、`skills delete` 并列为支持 `--dry-run` 的破坏性命令，JSON 模式下 `--dry-run` 返回同结构信封并带 `dry_run: true` [@ref-deep-agents-lt-doc-threads-cli] [@ref-deep-agents-lt-doc-dry-run] [@ref-deep-agents-lt-threads-delete-cli] [@ref-deep-agents-lt-thread-delete-command]。实际删除是级联的，顺序固定：

1. 先取线程归属租约。**线程在别处打开时直接抛 `BlockingIOError`，提示先去那边关掉** [@ref-deep-agents-lt-thread-delete-guard]——这就是"删除前必须停掉的写入者"，代码层面强制，不依赖用户自觉。
2. 在同一事务里先擦 `dcode_btw_costs`（留一条 `breakdown = 'null'` 的墓碑，丢弃待重试与迟到的完成回调），再删 `checkpoints` 行与 `writes` 行，最后清进程内的消息计数缓存与最近线程缓存 [@ref-deep-agents-lt-thread-delete-cascade]。
3. 提交后删磁盘上的归档：该线程的 Markdown 归档，以及所有 `handoff_` 前缀加该线程哈希的交接快照；文件名带路径逃逸保护，可疑线程 ID 会告警并拒绝 [@ref-deep-agents-lt-archive-delete-path] [@ref-deep-agents-lt-archive-delete-doc]。文件系统失败只记日志不抛出，因此清理失败不影响删除结果。

**删除路径不覆盖 hooks 投影。** `TranscriptStore` 只暴露备份修剪，没有删除单个线程投影的接口，唯一会消失的投影文件是超过 `retention_revisions` 的旧版 `.bak-*` [@ref-deep-agents-lt-hook-backup-prune]。因此 `dcode threads delete` 之后，`{profile}/transcripts/` 里的 JSONL 与其旧版会留下；想清掉它们目前只能直接操作该目录，而源码未提供对应命令。

由此得到的操作纪律：不要手工 `rm sessions.db`。那会同时丢掉所有线程正文、留下无主的归档文件，而且绕过了归属检查，别的进程可能正在写；对应的正确入口是 `threads delete`。反过来，孤儿文件是可能出现的——归档删除是 best-effort，失败只记日志。剩余缺口：本轮在固定来源中**没有找到**对 `sessions.db` 的自动保留期或自动清理，只有用户显式删除；也没有找到 `VACUUM` 或 `integrity_check` 调用，所以手工删除后空间不会自动回收。这两点是"未找到"，不是"不支持自动清理"的结论。

## 定位、读取与排错 {#transcripts-diagnostics}

读记录的第一入口是 `dcode threads list`（别名 `ls`）。官方命令参考列出了它的完整过滤面：`--agent`、`--limit`、环境变量改默认条数、`--sort {created,updated}`、`--branch` 按 git 分支过滤、`--cwd [PATH]` 按工作目录过滤（裸标志用当前目录）、`-v/--verbose` 显示全列、`-r/--relative` 相对时间 [@ref-deep-agents-lt-doc-threads-cli]。所有管理子命令都支持 `--json` [@ref-deep-agents-lt-doc-dry-run]。返回的列直接对应库里读的 metadata 键 [@ref-deep-agents-lt-thread-list-query]，所以列表里看不到线程，最常见的原因是 `cwd` 过滤的精确字符串比较没匹配上 [@ref-deep-agents-lt-thread-cwd-filter]。

`dcode doctor` 适合排查"路径对不对、目录能不能用"这类问题：它报告 profile 根（未自定义时以 `~` 缩写）、受管二进制与更新锁的候选位置 [@ref-deep-agents-lt-profile-root-default] [@ref-deep-agents-lt-harden-state-dir]。它**不检查 `sessions.db` 的内容**。源码中未发现任何完整性校验、`VACUUM` 或记录计数命令，固定来源里也没有相应文档段落。要人工核对记录，直接用 SQLite 客户端按 `thread_id` 与 `checkpoint_id` 读，注意状态 blob 是内联大字段，直接 dump 会淹掉输出。

成本维度的排错走会话内 `/cost`，官方文档说明其总额覆盖主 Agent、子代理、offload、Auto 分类与 rubric 评分，并且在恢复或切换线程后继续保留 [@ref-deep-agents-lt-doc-cost-persist]；对应的持久化是 `dcode_btw_costs` 表 [@ref-deep-agents-lt-btw-cost-table]。

hooks 投影自身没有官方查看命令，只能按上面的命名规则定位文件；注意它可能滞后于实时状态，排查刚结束的一轮时以 hook 事件上的 `last_assistant_message` 为准 [@ref-deep-agents-lt-hook-transcript-store]。

要追具体某回合发生了什么，只能开可选的逐线程 debug 日志。日志目录按环境变量、兼容变量、`config.toml` 的 `[debug]` 段、源码常量默认值 `/tmp/deepagents_debug` 的顺序解析 [@ref-deep-agents-lt-debug-dir-resolution] [@ref-deep-agents-lt-debug-dir-default]，文件名是线程 ID 或哈希化后的 `thread-` 前缀形式 [@ref-deep-agents-lt-debug-log-name]。默认路径在临时目录且默认关闭，跨重启不保证存在。

**与其它主题的接口。** 本文出现的可配置项归属现有配置章节：`history.retention_days` 是普通可配置项，其默认值与"可配置项"这一语义对应 `config.defaults`；`DEEPAGENTS_HOME` 决定整套记录的位置、属于环境变量覆盖，对应 `config.overrides`；记录落在哪个 profile 取决于配置来源的解析顺序，对应 `config.sources`；`dcode doctor` 报的 profile 根与 `config.diagnostics` 同源；调试目录的开关按"环境变量先于配置文件"的运行期规则解析，对应 `config.runtime`。`/offload` 的触发点同时是 hooks 主题的中间件入口，`transcript_path` 则是 hooks 投影存在的原因，两者的交叉点在 `hooks.conditions`。

已查入口：本文引用的 17 个源码文件与 1 份归档文档原件，另核对了 `doctor.py` 的四个诊断分段（Diagnostics / Updates / Tracing / Configuration）以及 `sessions.py` 与 `hooks/transcript.py` 中检索到的全部删除相关入口。剩余缺口三项——(1) 没有面向记录完整性的内建检查命令；(2) 归档、hook 投影与数据库之间的一致性无法用官方命令核对；(3) 主库与归档的静态加密，本轮未在固定来源中找到任何实现或文档，不能断定其存在或不存在（hook 投影侧只有前述脱敏）。
