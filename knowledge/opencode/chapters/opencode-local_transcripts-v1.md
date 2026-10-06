---
schema_version: 3
record_kind: production
edition_id: opencode-local_transcripts-v1
harness_id: opencode
topic: local_transcripts
title: "opencode 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-global-paths
      - ref-opencode-transcripts-db-path
      - ref-opencode-transcripts-db-pragmas
      - ref-opencode-transcripts-sql-message
      - ref-opencode-transcripts-ids
      - ref-opencode-transcripts-session-archive-list
      - ref-opencode-transcripts-session-child
      - ref-opencode-transcripts-snapshot-gitdir
      - ref-opencode-transcripts-tool-output
      - ref-opencode-transcripts-truncate-legacy
      - ref-opencode-transcripts-plan-path
      - ref-opencode-transcripts-legacy-storage
      - ref-opencode-transcripts-doc-env
  - section_id: transcripts-record-content
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-sql-session
      - ref-opencode-transcripts-sql-message
      - ref-opencode-transcripts-sql-part
      - ref-opencode-transcripts-sql-input
      - ref-opencode-transcripts-sql-context-epoch
      - ref-opencode-transcripts-schema-session
      - ref-opencode-transcripts-schema-user
      - ref-opencode-transcripts-schema-assistant
      - ref-opencode-transcripts-schema-parts
      - ref-opencode-transcripts-schema-toolpart
      - ref-opencode-transcripts-schema-compaction
      - ref-opencode-transcripts-history-load
      - ref-opencode-transcripts-message-page
      - ref-opencode-transcripts-tool-output-bound
      - ref-opencode-transcripts-truncate-hint
      - ref-opencode-transcripts-tool-output-config
      - ref-opencode-transcripts-doc-compaction
  - section_id: transcripts-session-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-sql-event
      - ref-opencode-transcripts-projector-message
      - ref-opencode-transcripts-projector-part
      - ref-opencode-transcripts-sql-input
      - ref-opencode-transcripts-sql-context-epoch
      - ref-opencode-transcripts-history-load
      - ref-opencode-transcripts-compaction-create
      - ref-opencode-transcripts-compaction-prune
      - ref-opencode-transcripts-session-fork
      - ref-opencode-transcripts-session-child
      - ref-opencode-transcripts-doc-compaction
      - ref-opencode-transcripts-doc-env
  - section_id: transcripts-database-layout
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-sql-event
      - ref-opencode-transcripts-sql-session
      - ref-opencode-transcripts-sql-session-index
      - ref-opencode-transcripts-sql-message
      - ref-opencode-transcripts-sql-part
      - ref-opencode-transcripts-sql-todo
      - ref-opencode-transcripts-sql-input
      - ref-opencode-transcripts-sql-context-epoch
      - ref-opencode-transcripts-projector-message
      - ref-opencode-transcripts-db-pragmas
      - ref-opencode-transcripts-db-migration
      - ref-opencode-transcripts-import-tables
  - section_id: transcripts-retention-and-recovery
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-server-archive
      - ref-opencode-transcripts-session-archive-list
      - ref-opencode-transcripts-schema-session
      - ref-opencode-transcripts-sql-session
      - ref-opencode-transcripts-doc-cli-export
      - ref-opencode-transcripts-export-sanitize
      - ref-opencode-transcripts-doc-cli-import
      - ref-opencode-transcripts-import-tables
      - ref-opencode-transcripts-doc-share
      - ref-opencode-transcripts-tool-output-bound
      - ref-opencode-transcripts-truncate-hint
      - ref-opencode-transcripts-snapshot-gitdir
      - ref-opencode-transcripts-doc-cli-session
      - ref-opencode-transcripts-session-remove
      - ref-opencode-transcripts-projector-message
      - ref-opencode-transcripts-sql-message
      - ref-opencode-transcripts-tool-output
      - ref-opencode-transcripts-tool-output-cleanup
      - ref-opencode-transcripts-tool-output-schedule
      - ref-opencode-transcripts-db-migration
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-debug-paths
      - ref-opencode-transcripts-doc-cli-db
      - ref-opencode-transcripts-db-path
      - ref-opencode-transcripts-db-pragmas
      - ref-opencode-transcripts-doc-cli-session
      - ref-opencode-transcripts-doc-cli-export
      - ref-opencode-transcripts-import-tables
      - ref-opencode-transcripts-message-page
      - ref-opencode-transcripts-tool-output-cleanup
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-content
        status: answered
        source_refs:
          - ref-opencode-transcripts-sql-message
          - ref-opencode-transcripts-sql-part
          - ref-opencode-transcripts-schema-parts
          - ref-opencode-transcripts-tool-output-bound
          - ref-opencode-transcripts-tool-output-config
          - ref-opencode-transcripts-doc-compaction
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-opencode-transcripts-global-paths
          - ref-opencode-transcripts-db-path
          - ref-opencode-transcripts-legacy-storage
          - ref-opencode-transcripts-snapshot-gitdir
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-opencode-transcripts-ids
          - ref-opencode-transcripts-session-child
          - ref-opencode-transcripts-session-archive-list
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-opencode-transcripts-db-pragmas
          - ref-opencode-transcripts-sql-message
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-content
        status: answered
        source_refs:
          - ref-opencode-transcripts-schema-session
          - ref-opencode-transcripts-schema-parts
          - ref-opencode-transcripts-schema-assistant
          - ref-opencode-transcripts-sql-session
          - ref-opencode-transcripts-sql-message
          - ref-opencode-transcripts-sql-part
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-session-lifecycle
        status: answered
        source_refs:
          - ref-opencode-transcripts-projector-message
          - ref-opencode-transcripts-projector-part
          - ref-opencode-transcripts-compaction-create
          - ref-opencode-transcripts-history-load
          - ref-opencode-transcripts-session-fork
          - ref-opencode-transcripts-sql-input
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-layout
        status: answered
        source_refs:
          - ref-opencode-transcripts-sql-event
          - ref-opencode-transcripts-sql-message
          - ref-opencode-transcripts-sql-part
          - ref-opencode-transcripts-db-migration
          - ref-opencode-transcripts-import-tables
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-recovery
        status: answered
        source_refs:
          - ref-opencode-transcripts-server-archive
          - ref-opencode-transcripts-session-archive-list
          - ref-opencode-transcripts-doc-cli-export
          - ref-opencode-transcripts-import-tables
          - ref-opencode-transcripts-tool-output-bound
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-recovery
        status: partial
        source_refs:
          - ref-opencode-transcripts-session-remove
          - ref-opencode-transcripts-doc-cli-session
          - ref-opencode-transcripts-tool-output-cleanup
          - ref-opencode-transcripts-db-migration
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs:
          - ref-opencode-transcripts-doc-cli-db
          - ref-opencode-transcripts-debug-paths
          - ref-opencode-transcripts-doc-cli-session
          - ref-opencode-transcripts-doc-cli-export
---

本页的固定来源是 `source-opencode-repo`（`https://github.com/anomalyco/opencode.git`）在 commit `652c090dc119b5f3dc1e5e0bf1c4b40d9721f0ef`（refs/heads/dev）上的源码树，抓取时间 2026-10-06T04:34:33Z。本轮共 24 个 `kind: source_revision` 快照 `snapshot-opencode-<文件路径>-20261006`，每个绑定一个 `git_source_file` 来源记录，50 条引用各自指向自己 locator 声明的那个源码文件，按 snapshot 打开即可落到对应位置。结论只覆盖 opencode 的 CLI 界面在 Linux 上的行为；catalog 里另一个界面 OpenCode Desktop 本轮没有调查，查询会把它派生为 `not_investigated`。源码 commit 只代表这一棵树，本轮没有建立它与 npm 发行包 `opencode-ai@1.18.34` 的映射，因此正文不描述任何发行版本的行为。涉及具体操作系统的目录名请以 `opencode debug paths` 的实际输出为准 [@ref-opencode-transcripts-debug-paths]。

## 会话记录放在哪里、叫什么、什么格式 {#transcripts-storage-layout}

四个全局根目录来自 `xdg-basedir` 的 data、cache、config、state，各自拼上应用名 `opencode`；tmp 取 `os.tmpdir()`，data 下再派生 `log` 与 `repos`，cache 下派生 `bin`，进程启动时这些目录都会被创建 [@ref-opencode-transcripts-global-paths]。会话正文全部落在一个 SQLite 文件里，文件名按安装通道决定：`OPENCODE_DB` 优先，值为 `:memory:` 或绝对路径时原样使用，相对路径拼到 data 目录下；通道是 `latest`、`beta`、`prod`，或者设置了 `OPENCODE_DISABLE_CHANNEL_DB` 时用 `opencode.db`；其它通道用 `opencode-<通道>.db`，非法字符替换成连字符 [@ref-opencode-transcripts-db-path]。`OPENCODE_DB` 与 `OPENCODE_DISABLE_CHANNEL_DB` 在这一提交的官方文档环境变量表里没有出现 [@ref-opencode-transcripts-doc-env]，目前只有源码能证实。

同一目录里还有几处会话记录的旁路依赖。文件状态快照放在 `snapshot/PROJECT_ID/WORKTREE_HASH`，是一个独立的 git 目录，服务回滚与差异计算 [@ref-opencode-transcripts-snapshot-gitdir]。超出阈值的工具输出全文写进 `tool-output/`，文件名以 `tool_` 开头 [@ref-opencode-transcripts-truncate-legacy][@ref-opencode-transcripts-tool-output]。计划文件在有 VCS 的项目里写进工作树的 `.opencode/plans`，否则落在 data 目录下的 `plans`，文件名由创建时间与 slug 拼成 [@ref-opencode-transcripts-plan-path]。`storage/` 子目录只剩旧 JSON 布局的迁移入口，靠一个 `migration` 标记文件记录已执行的步数 [@ref-opencode-transcripts-legacy-storage]；`auth.json`、`mcp-auth.json`、`model.json` 与会话正文无关，不在本章范围。

命名规则集中在一张前缀表里：会话 `ses`、消息 `msg`、片段 `prt`，另有事件、权限、提问、终端、工具与工作空间等前缀；ID 由前缀、下划线与标识符组成，并区分升序与降序两种方向 [@ref-opencode-transcripts-ids]。父子关系不靠目录表达，而是落在 `session.parent_id`；会话列表默认只返回 `parent_id` 为空的根会话，并默认排除 `time_archived` 非空的行 [@ref-opencode-transcripts-session-archive-list]。子会话没有显式标题时，标题取 `Child session - ` 加 ISO 时间戳 [@ref-opencode-transcripts-session-child]。

格式是单文件 SQLite：启动时把 journal 模式设为 WAL、`synchronous` 设为 `NORMAL`、`busy_timeout` 设为 5000 毫秒、打开外键约束，再做一次 PASSIVE checkpoint 并执行数据库迁移 [@ref-opencode-transcripts-db-pragmas]。记录正文不做独立编码，而是以 JSON 文本存进 `data` 列 [@ref-opencode-transcripts-sql-message]；时间是毫秒整数。固定来源里没有压缩、按会话分库或轮转文件的设置。

## 记录了什么、没记录什么 {#transcripts-record-content}

`session` 表保存会话元数据与汇总计数：标识、项目与工作区归属、父会话、slug、目录与相对路径、标题、版本、分享链接、差异与费用汇总、各类 token 计数、回滚状态、权限规则、Agent 与模型 [@ref-opencode-transcripts-sql-session]。消息与内容分成两套并存的表示。`message` 表按 role 判别保存 user 与 assistant 消息的 JSON 正文，`part` 表保存片段 JSON，两张表都对会话行声明级联删除 [@ref-opencode-transcripts-sql-message][@ref-opencode-transcripts-sql-part]；`session_message` 是另一份带 `type` 与 `seq` 的消息表示，`session_input` 记录还没提升为正式消息的排队输入及其准入序号，`session_context_epoch` 保存系统上下文快照与基线序号 [@ref-opencode-transcripts-sql-input][@ref-opencode-transcripts-sql-context-epoch]。当前提交里两条读取路径都在用：旧路径按 `time_created` 与 `id` 倒序分页读 `message` 与 `part` [@ref-opencode-transcripts-message-page]，新路径按 `seq` 读 `session_message`，并从最后一次 compaction 之后截取 [@ref-opencode-transcripts-history-load]。

第一方记录类型是有限的几组。片段是以 `type` 判别的联合，共 12 种：text、subtask、reasoning、file、tool、step-start、step-finish、snapshot、patch、agent、retry、compaction [@ref-opencode-transcripts-schema-parts]。工具片段必填 `callID`、工具名与状态机 [@ref-opencode-transcripts-schema-toolpart]，压缩片段带 `auto`、`overflow` 与可选的 `tail_start_id` [@ref-opencode-transcripts-schema-compaction]。用户消息必填 role、创建时间、Agent 与模型，另可选输出格式、标题正文摘要、系统提示与逐工具开关 [@ref-opencode-transcripts-schema-user]；助手消息必填 role、时间、父消息 ID、模型与供应方、模式、Agent、工作路径、费用与 token 明细 [@ref-opencode-transcripts-schema-assistant]。会话对象必填 ID、slug、项目 ID、目录、标题、宿主版本与创建更新时间，归档时间是可选字段 [@ref-opencode-transcripts-schema-session]。

不落进数据库的只有一类内容：超出阈值的工具输出。全文写入 `tool-output` 文件，数据库里只保留一段带路径的截断提示 [@ref-opencode-transcripts-tool-output-bound][@ref-opencode-transcripts-truncate-hint]。阈值由 `tool_output.max_lines`（默认 2000 行）与 `tool_output.max_bytes`（默认 51200 字节）控制，两者取任意一个越界即触发 [@ref-opencode-transcripts-tool-output-config]。没有关闭会话记录的第一方开关；用户能调的开关集中在 `compaction` 的 `auto`、`prune` 与 `reserved` [@ref-opencode-transcripts-doc-compaction]。调试日志、模型缓存与遥测文件不属本章范围。

## 记录的生命周期与延续 {#transcripts-session-lifecycle}

写入不是直接改表，而是先发布事件：`event` 表按聚合（会话 ID）加单调 `seq` 存下事件，事件类型带版本号、载荷是 JSON [@ref-opencode-transcripts-sql-event]。投影器在同一个事务里把这些事件落成 `session`、`message`、`part` 与 `session_message` 的行，例如消息更新走 `message` 表的插入加冲突更新 [@ref-opencode-transcripts-projector-message]，片段更新走 `part` 表的插入加冲突更新 [@ref-opencode-transcripts-projector-part]。所以记录既在事件日志里，也在投影表里，两者在正常路径上不会分叉。

排队中的输入先落在 `session_input`：每条带投递状态、准入序号和可选的提升序号，因此“已提交但还没进对话”的提示也能从库里查出来 [@ref-opencode-transcripts-sql-input]。分支有两条路。`fork` 会新建一个会话，把目标消息之前的消息与片段复制过去并分配新 ID，助手消息的父引用按映射表重写 [@ref-opencode-transcripts-session-fork]；子代理则用子会话表示，靠 `parent_id` 挂在父会话下 [@ref-opencode-transcripts-session-child]。

上下文压缩后仍能续上：压缩时写入一个 compaction 片段并记录 `time.compacting` [@ref-opencode-transcripts-compaction-create]，重新加载历史时从最后一次 compaction 之后取消息 [@ref-opencode-transcripts-history-load]，系统上下文另有 `session_context_epoch` 的基线序号参与裁剪 [@ref-opencode-transcripts-sql-context-epoch]。`prune` 不是删除，它只在配置打开时运行，从后往前累计 token，给够老的已完成工具片段的 `state.time.compacted` 打上时间戳 [@ref-opencode-transcripts-compaction-prune]；该选项默认关闭 [@ref-opencode-transcripts-doc-compaction]，环境变量 `OPENCODE_DISABLE_PRUNE` 会强制把它关掉，`OPENCODE_DISABLE_AUTOCOMPACT` 同样能把自动压缩关掉 [@ref-opencode-transcripts-doc-env]。

## 数据库与事件日志的分工 {#transcripts-database-layout}

会话记录确实走数据库，且不止一张表。`event` 与 `event_sequence` 是事件日志，聚合 ID 就是会话 ID [@ref-opencode-transcripts-sql-event]；`session` 是元数据与汇总 [@ref-opencode-transcripts-sql-session]；`message` 与 `part` 保存 V1 形状的正文 [@ref-opencode-transcripts-sql-message][@ref-opencode-transcripts-sql-part]；`session_message` 保存带序号的消息表示；`todo` 保存任务清单，主键是会话 ID 加位置 [@ref-opencode-transcripts-sql-todo]；`session_input` 与 `session_context_epoch` 分别保存排队输入与上下文快照 [@ref-opencode-transcripts-sql-input][@ref-opencode-transcripts-sql-context-epoch]。索引覆盖了常用查询：会话按项目、工作区、父会话各一条索引 [@ref-opencode-transcripts-sql-session-index]，消息按会话加创建时间加 ID 联合索引，片段按消息 ID 与会话各一条。

恢复一个会话真正必需的是 `session` 行加上该会话的消息与片段——旧读取路径要 `message` 与 `part` [@ref-opencode-transcripts-message-page]，新读取路径要 `session_message` [@ref-opencode-transcripts-history-load]。`todo`、回滚状态与差异汇总缺失只影响展示和回滚，不影响把对话读回来。版本迁移在打开数据库时执行：先看 `sqlite_master`，已有 `session` 表就只补未完成的迁移；库非空却没有 `session` 表直接终止；全新库一次性建表并把所有迁移标记为已完成 [@ref-opencode-transcripts-db-migration]。

投影与事件写入在同一事务内提交 [@ref-opencode-transcripts-projector-message]，但固定来源里没有面向用户的“从 `event` 表重放投影”命令。可用的重建入口是 `opencode import`，它按 `session`、`message`、`part` 三张表写入，冲突时只更新项目、目录与相对路径 [@ref-opencode-transcripts-import-tables]。因此只删投影表而保留事件表不会自动恢复记录，这一点不能当作“可重建”来依赖。

## 归档、导出、删除与保留 {#transcripts-retention-and-recovery}

归档不是导出，也不是搬走文件。会话更新接口接受 `time.archived` 并把它写进该字段 [@ref-opencode-transcripts-server-archive]，会话列表默认排除已归档会话，除非显式要求包含归档项 [@ref-opencode-transcripts-session-archive-list]；记录本身原地不动，`share_url` 之类的同行数据继续留在原处 [@ref-opencode-transcripts-sql-session]。导出是另一件事：`opencode export` 接受会话 ID，省略时交互选择，输出由会话信息与消息数组组成的 JSON；加 `--sanitize` 会把正文、文件路径、符号名与 diff 片段替换成占位标记 [@ref-opencode-transcripts-doc-cli-export][@ref-opencode-transcripts-export-sanitize]。导入接受本地 JSON 文件或分享链接 [@ref-opencode-transcripts-doc-cli-import]，写入时把项目 ID、目录与相对路径改写成当前项目和工作树 [@ref-opencode-transcripts-import-tables]。分享又不同：它把会话历史同步到 opencode 的服务器并生成 `opncd.ai` 链接 [@ref-opencode-transcripts-doc-share]。

归档与导出都不会带走旁路文件。被截断的工具输出全文在 `tool-output` 目录里 [@ref-opencode-transcripts-tool-output-bound][@ref-opencode-transcripts-truncate-hint]，文件状态快照在 `snapshot` 的独立 git 目录里 [@ref-opencode-transcripts-snapshot-gitdir]；导出与导入都只搬运那三张表，所以在新机器上恢复之后，这两类内容会缺失，被截断的工具输出只剩一段指向旧路径的提示文本。

删除走 `opencode session delete` [@ref-opencode-transcripts-doc-cli-session]。它先取消该会话的后台作业，再递归删除所有子会话，然后发布删除事件并清掉该会话的事件记录 [@ref-opencode-transcripts-session-remove]；投影器收到删除事件后删掉 `session` 行，消息与片段靠外键级联一起消失 [@ref-opencode-transcripts-projector-message][@ref-opencode-transcripts-sql-message]。保留策略目前只覆盖旁路目录：`tool-output` 的保留期常量是 7 天 [@ref-opencode-transcripts-tool-output]，清理只删 `tool_` 开头且修改时间早于该期限的文件 [@ref-opencode-transcripts-tool-output-cleanup]，这层扫描全局只跑一份，按一小时间隔重复 [@ref-opencode-transcripts-tool-output-schedule]。固定来源里没有针对会话本身的自动保留或过期删除机制；这不等于可以安全手删——删掉数据库文件后，下次启动会按迁移逻辑建一个空库 [@ref-opencode-transcripts-db-migration]，会话与事件一并消失，而运行中的进程与 WAL 边车文件会怎样，源码里没有对应处理，这一层没有取证。

## 定位、读取与排错 {#transcripts-diagnostics}

先确认路径再动手。`opencode db path` 打印实际使用的数据库文件 [@ref-opencode-transcripts-doc-cli-db][@ref-opencode-transcripts-db-path]，`opencode debug paths` 打印 data、config、cache、state 等全局路径 [@ref-opencode-transcripts-debug-paths]。`opencode db` 带查询串时执行一次查询并支持 `--format json`，不带查询串时直接拉起指向同一文件的 `sqlite3` 交互 shell [@ref-opencode-transcripts-doc-cli-db]。排错常用的几条只读查询是 `select id, title, time_updated from session order by time_updated desc` 列出最近会话，以及按 `session_id` 查 `message` 与 `part`；两者的 `data` 列是 JSON 文本，需要在查询侧解析。

需要人读的内容用 `opencode session list --format json` 取会话的 ID、标题、创建与更新时间、项目 ID 和目录 [@ref-opencode-transcripts-doc-cli-session]，再用 `opencode export` 配合 `--sanitize` 导出可读 JSON 做人工核对 [@ref-opencode-transcripts-doc-cli-export]。恢复演练可以把导出的 JSON 交给 `opencode import` 写回三张表，注意它会按当前项目重写归属 [@ref-opencode-transcripts-import-tables]。

完整性方面可以确认的有限：外键约束在每次打开数据库时开启，启动时会做一次 checkpoint [@ref-opencode-transcripts-db-pragmas]；旧读取路径在指定会话没有任何消息行时报“会话不存在”，说明会话行与消息行的缺失是可区分的 [@ref-opencode-transcripts-message-page]。没有校验事件日志与投影表是否一致的命令；`tool-output` 缺失只能靠片段里的截断提示与目录实际内容比对发现 [@ref-opencode-transcripts-tool-output-cleanup]。
