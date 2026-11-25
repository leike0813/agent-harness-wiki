---
schema_version: 3
record_kind: production
edition_id: opencode-local_transcripts-v3
harness_id: opencode
topic: local_transcripts
title: "opencode 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-global-paths
      - ref-opencode-transcripts-db-path
      - ref-opencode-transcripts-db-pragmas-v2
      - ref-opencode-transcripts-sql-message-v2
      - ref-opencode-transcripts-db-migration-v2
      - ref-opencode-transcripts-snapshot-gitdir
      - ref-opencode-transcripts-tool-output
      - ref-opencode-transcripts-truncate-legacy
      - ref-opencode-transcripts-plan-path
      - ref-opencode-transcripts-legacy-storage
      - ref-opencode-transcripts-ids
      - ref-opencode-transcripts-session-archive-list
      - ref-opencode-transcripts-session-child
  - section_id: transcripts-record-content
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-sql-message-v2
      - ref-opencode-transcripts-sql-part-v2
      - ref-opencode-transcripts-sql-inbox-v2
      - ref-opencode-transcripts-projector-parts-v2
      - ref-opencode-transcripts-part-rows-v2
      - ref-opencode-transcripts-sql-blob-v2
      - ref-opencode-transcripts-media-blob-v2
      - ref-opencode-transcripts-compaction-keepid
      - ref-opencode-transcripts-compaction-rebuild
      - ref-opencode-transcripts-tool-output-limits
      - ref-opencode-transcripts-tool-output-marker-v2
      - ref-opencode-transcripts-doc-compaction
      - ref-opencode-transcripts-compaction-config-v2
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-schema-session
      - ref-opencode-transcripts-schema-parts
      - ref-opencode-transcripts-schema-assistant
      - ref-opencode-transcripts-sql-session
      - ref-opencode-transcripts-sql-message
      - ref-opencode-transcripts-sql-part
  - section_id: transcripts-session-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-sql-event
      - ref-opencode-transcripts-sql-message-v2
      - ref-opencode-transcripts-sql-part-v2
      - ref-opencode-transcripts-projector-parts-v2
      - ref-opencode-transcripts-sql-inbox-v2
      - ref-opencode-transcripts-compaction-create
      - ref-opencode-transcripts-history-load
      - ref-opencode-transcripts-session-fork
      - ref-opencode-transcripts-session-child
      - ref-opencode-transcripts-doc-compaction
      - ref-opencode-transcripts-doc-env
  - section_id: transcripts-database-layout
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-sql-event
      - ref-opencode-transcripts-sql-session-v2
      - ref-opencode-transcripts-sql-message-v2
      - ref-opencode-transcripts-sql-part-v2
      - ref-opencode-transcripts-sql-inbox-v2
      - ref-opencode-transcripts-sql-blob-v2
      - ref-opencode-transcripts-db-migration-v2
      - ref-opencode-transcripts-import-tables
      - ref-opencode-transcripts-projector-parts-v2
  - section_id: transcripts-retention-and-recovery
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-archive-service
      - ref-opencode-transcripts-archive-projector
      - ref-opencode-transcripts-list-archived-filter
      - ref-opencode-transcripts-transfer-export-v2
      - ref-opencode-transcripts-transfer-import-v2
      - ref-opencode-transcripts-doc-cli-export-v2
      - ref-opencode-transcripts-remove-v2
      - ref-opencode-transcripts-tool-output-cleanup-v2
      - ref-opencode-transcripts-tool-output-schedule-v2
      - ref-opencode-transcripts-cli-session-commands-v2
      - ref-opencode-transcripts-media-blob-v2
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-transcripts-db-file
      - ref-opencode-transcripts-cli-debug-paths
      - ref-opencode-transcripts-cli-session-commands-v2
      - ref-opencode-transcripts-sql-message-v2
      - ref-opencode-transcripts-sql-part-v2
      - ref-opencode-transcripts-sql-blob-v2
      - ref-opencode-transcripts-tool-output-marker-v2
      - ref-opencode-transcripts-tool-output-cleanup-v2
      - ref-opencode-transcripts-archive-service
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-content
        status: answered
        source_refs:
          - ref-opencode-transcripts-sql-message-v2
          - ref-opencode-transcripts-sql-part-v2
          - ref-opencode-transcripts-part-rows-v2
          - ref-opencode-transcripts-sql-blob-v2
          - ref-opencode-transcripts-compaction-keepid
          - ref-opencode-transcripts-compaction-rebuild
          - ref-opencode-transcripts-tool-output-limits
          - ref-opencode-transcripts-tool-output-marker-v2
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-opencode-transcripts-global-paths
          - ref-opencode-transcripts-db-path
          - ref-opencode-transcripts-db-pragmas-v2
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
          - ref-opencode-transcripts-db-pragmas-v2
          - ref-opencode-transcripts-sql-message-v2
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
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
          - ref-opencode-transcripts-projector-parts-v2
          - ref-opencode-transcripts-sql-message-v2
          - ref-opencode-transcripts-sql-part-v2
          - ref-opencode-transcripts-compaction-create
          - ref-opencode-transcripts-history-load
          - ref-opencode-transcripts-session-fork
          - ref-opencode-transcripts-sql-inbox-v2
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-layout
        status: answered
        source_refs:
          - ref-opencode-transcripts-sql-event
          - ref-opencode-transcripts-sql-session-v2
          - ref-opencode-transcripts-sql-message-v2
          - ref-opencode-transcripts-sql-part-v2
          - ref-opencode-transcripts-sql-inbox-v2
          - ref-opencode-transcripts-sql-blob-v2
          - ref-opencode-transcripts-db-migration-v2
          - ref-opencode-transcripts-import-tables
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-recovery
        status: answered
        source_refs:
          - ref-opencode-transcripts-archive-service
          - ref-opencode-transcripts-archive-projector
          - ref-opencode-transcripts-list-archived-filter
          - ref-opencode-transcripts-transfer-export-v2
          - ref-opencode-transcripts-transfer-import-v2
          - ref-opencode-transcripts-doc-cli-export-v2
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-recovery
        status: answered
        source_refs:
          - ref-opencode-transcripts-remove-v2
          - ref-opencode-transcripts-cli-session-commands-v2
          - ref-opencode-transcripts-tool-output-cleanup-v2
          - ref-opencode-transcripts-tool-output-schedule-v2
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs:
          - ref-opencode-transcripts-db-file
          - ref-opencode-transcripts-cli-debug-paths
          - ref-opencode-transcripts-cli-session-commands-v2
          - ref-opencode-transcripts-sql-message-v2
          - ref-opencode-transcripts-sql-part-v2
          - ref-opencode-transcripts-sql-blob-v2
          - ref-opencode-transcripts-tool-output-marker-v2
          - ref-opencode-transcripts-tool-output-cleanup-v2
---

本页的当前修订依据 `source-opencode-repo`（`https://github.com/anomalyco/opencode.git`）在 commit `d62d2db9bcff0fe039567f6666d0d8a5bdf2e96f`（refs/heads/dev）上的源码树，抓取时间 2026-11-25T02:22:50Z；存储布局、记录内容、生命周期、数据库分工、归档与诊断各节按该提交重写，记录类型一节保留上一版对 commit `652c090dc119b5f3dc1e5e0bf1c4b40d9721f0ef` 的 V1 形状调查结论并注明其历史范围。结论只覆盖 opencode 的 CLI 界面在 Linux 上的行为；catalog 里另一个界面 OpenCode Desktop 本轮没有调查，查询会把它派生为 `not_investigated`。源码 commit 只代表这一棵树，本轮没有建立它与任何 npm 发行版本的映射。

## 会话记录放在哪里、叫什么、什么格式 {#transcripts-storage-layout}

四个全局根目录来自 `xdg-basedir` 的 data、cache、config、state，各自拼上应用名 `opencode`；tmp 取 `os.tmpdir()`，data 下再派生 `log` 与 `repos`，cache 下派生 `bin` [@ref-opencode-transcripts-global-paths]。会话正文全部落在一个 SQLite 文件里，文件名按安装通道决定：`OPENCODE_DB` 优先，值为 `:memory:` 或绝对路径时原样使用，相对路径拼到 data 目录下；通道是 `latest`、`dev`、`beta`、`next`、`prod`，或者 `OPENCODE_DISABLE_CHANNEL_DB` 为 `1`／`true` 时用 `opencode.db`；其它通道用 `opencode-{通道}.db`，非法字符替换成连字符 [@ref-opencode-transcripts-db-path]。

同一目录里还有几处会话记录的旁路依赖。文件状态快照放在 `snapshot/PROJECT_ID/WORKTREE_HASH`，是一个独立的 git 目录，服务回滚与差异计算 [@ref-opencode-transcripts-snapshot-gitdir]。超出阈值的工具输出全文写进 `tool-output/`，文件名以 `tool_` 开头 [@ref-opencode-transcripts-truncate-legacy][@ref-opencode-transcripts-tool-output]。计划文件在有 VCS 的项目里写进工作树的 `.opencode/plans`，否则落在 data 目录下的 `plans`，文件名由创建时间与 slug 拼成 [@ref-opencode-transcripts-plan-path]。`storage/` 子目录只剩旧 JSON 布局的迁移入口，靠一个 `migration` 标记文件记录已执行的步数 [@ref-opencode-transcripts-legacy-storage]。

命名规则集中在一张前缀表里：会话 `ses`、消息 `msg`、片段 `prt`，另有事件、权限、提问、终端、工具与工作空间等前缀；ID 由前缀、下划线与标识符组成，并区分升序与降序两种方向 [@ref-opencode-transcripts-ids]。父子关系不靠目录表达，而是落在 `session.parent_id`；会话列表默认只返回 `parent_id` 为空的根会话，并默认排除 `time_archived` 非空的行 [@ref-opencode-transcripts-session-archive-list]。子会话没有显式标题时，标题取 `Child session - ` 加 ISO 时间戳 [@ref-opencode-transcripts-session-child]。

格式是单文件 SQLite：打开文件数据库时把 journal 模式设为 WAL、`synchronous` 设为 `NORMAL`、`busy_timeout` 设为 5000 毫秒、`cache_size` 设为 -64000，并打开外键约束；早先版本会额外执行一次 PASSIVE checkpoint，当前提交已不再执行。Durable Object 环境跳过这些调优 pragma，因为它总是强制外键并拒绝切换。文件数据库在打开前收紧为仅属主可读写，并执行一次旧 `auth.json` 凭据导入；内存库与注入库不做该导入。迁移在持有数据库级锁的情况下执行 [@ref-opencode-transcripts-db-pragmas-v2]。记录正文不做独立编码，而是以 JSON 文本存进 `data` 列 [@ref-opencode-transcripts-sql-message-v2]；时间是毫秒整数。固定来源里没有压缩、按会话分库或轮转文件的设置。

## 记录了什么、没记录什么 {#transcripts-record-content}

会话正文分布在两张表里。`session_message` 以 id 为主键，带 `session_id`、`type`、单调 `seq` 与一个 JSON `data` 列，对会话行声明级联删除，唯一索引是 (session_id, seq)，另有按类型与时间创建的索引 [@ref-opencode-transcripts-sql-message-v2]。助手消息的内容片段不再内联，而是拆到 `session_part`：以 (message_id, ordinal) 为主键，带 `session_id`、`type`、可选的 `call_id`、时间戳与 JSON `data`，对消息行和会话行都声明级联删除 [@ref-opencode-transcripts-sql-part-v2]。

投影器写入时，助手消息的 `data.content` 被置为空数组，片段逐条写进 `session_part`；只有旧版本留下的内联内容或 `experimental.part_rows` 显式设为 false 时才回到整条消息写入。`part_rows` 默认 true，是这次拆分的开关 [@ref-opencode-transcripts-projector-parts-v2] [@ref-opencode-transcripts-part-rows-v2]。

消息里的媒体有两种存法。默认仍内联在消息 JSON 的 `data` 字段里；`media_blob` 标志开启时，媒体按内容哈希去重后写入 `blob` 表（hash、mime、bytes、宽高、二进制与创建时间），消息行只保留 `media:` 引用，`blob_ref` 以 (session_id, message_id, hash) 记录引用关系并对会话行与 blob 行级联删除。该标志按会话所在位置解析，读取失败时退回内联 [@ref-opencode-transcripts-sql-blob-v2] [@ref-opencode-transcripts-media-blob-v2]。

排队中的输入落在 `session_inbox`：每条带类型、JSON payload、投递状态与入队序号，因此“已提交但还没进对话”的提示也能从库里查出来 [@ref-opencode-transcripts-sql-inbox-v2]。

压缩是唯一改变“记录什么”的机制。摘要式压缩把摘要正文写在自己的消息行里，并用 metadata.keepID 指向被逐字保留的第一条消息 [@ref-opencode-transcripts-compaction-keepid]。读取历史时服务端从该 keepID 起、到压缩行之前重新读出这些消息，在内存里拼回 recent 文本，只有拼装结果进入上下文，不再落盘 [@ref-opencode-transcripts-compaction-rebuild]。因此被保留的原始消息只存一份，摘要不再重复保存它们的正文；旧格式压缩没有这个指针，仍沿用自己存下的文本。native 压缩则把替换窗口写进消息的 native.messages 并记录产生它的 model，只有同一 provider 与模型才允许重放。

不落进数据库的仍是超出阈值的工具输出：默认 2000 行与 50 KiB 任一越界即触发，完整文本写进 data 目录下的 `tool-output/tool_` 文件，数据库里只保留截断后的内容与一段指向该文件的提示 [@ref-opencode-transcripts-tool-output-limits]。提示会注明显示的行范围与总行数，最后一行被截断时额外标记；如果全文写入失败，提示改为 “full output could not be saved: …” 并省略文件路径 [@ref-opencode-transcripts-tool-output-marker-v2]。没有关闭会话记录的第一方开关；用户能调的开关集中在 `compaction` 的 auto、background、keep 与 buffer（百分比或 token 数）[@ref-opencode-transcripts-compaction-config-v2]。

## 记录类型与 V1 形状 {#transcripts-record-schema}

本节保留上一版对提交 652c090d 的调查结论，是历史形状说明；当前提交的 `session_message` / `session_part` 表结构见前两节，二者不是同一份 schema。

消息与内容在那棵源码树里分成两套并存的表示：`message` 表按 role 判别保存 user 与 assistant 消息的 JSON 正文，`part` 表保存片段 JSON，两张表都对会话行声明级联删除 [@ref-opencode-transcripts-sql-message][@ref-opencode-transcripts-sql-part]；`session` 表保存会话元数据与汇总计数 [@ref-opencode-transcripts-sql-session]。

第一方记录类型是有限的几组。片段是以 `type` 判别的联合，共 12 种：text、subtask、reasoning、file、tool、step-start、step-finish、snapshot、patch、agent、retry、compaction [@ref-opencode-transcripts-schema-parts]。工具片段必填 `callID`、工具名与状态机，压缩片段带 `auto`、`overflow` 与可选的 `tail_start_id`；用户消息必填 role、创建时间、Agent 与模型，助手消息必填 role、时间、父消息 ID、模型与供应方、模式、Agent、工作路径、费用与 token 明细 [@ref-opencode-transcripts-schema-assistant] [@ref-opencode-transcripts-schema-session]。

## 记录的生命周期与延续 {#transcripts-session-lifecycle}

写入不是直接改表，而是先发布事件：`event` 表按聚合（会话 ID）加单调 `seq` 存下事件，事件类型带版本号、载荷是 JSON [@ref-opencode-transcripts-sql-event]。投影器在同一个事务里把消息事件落成 `session_message` 行；助手消息的片段再逐条写进 `session_part`，并在同一步记录 blob 引用 [@ref-opencode-transcripts-projector-parts-v2] [@ref-opencode-transcripts-sql-message-v2] [@ref-opencode-transcripts-sql-part-v2]。所以记录既在事件日志里，也在投影表里，两者在正常路径上不会分叉。

排队中的输入先落在 `session_inbox`，带投递状态与入队序号，因此“已提交但还没进对话”的提示也能从库里查出来 [@ref-opencode-transcripts-sql-inbox-v2]。分支有两条路。`fork` 会新建一个会话，把目标消息之前的消息与片段复制过去并分配新 ID，助手消息的父引用按映射表重写 [@ref-opencode-transcripts-session-fork]；子代理则用子会话表示，靠 `parent_id` 挂在父会话下 [@ref-opencode-transcripts-session-child]。

上下文压缩后仍能续上：压缩时写入一个 compaction 片段并记录 `time.compacting` [@ref-opencode-transcripts-compaction-create]，重新加载历史时从最后一次 compaction 之后取消息 [@ref-opencode-transcripts-history-load]。`prune` 不是删除，它只在配置打开时运行，从后往前累计 token，给够老的已完成工具片段打上 `state.time.compacted` 时间戳；该选项默认关闭 [@ref-opencode-transcripts-doc-compaction]，环境变量 `OPENCODE_DISABLE_PRUNE` 会强制把它关掉，`OPENCODE_DISABLE_AUTOCOMPACT` 同样能关掉自动压缩 [@ref-opencode-transcripts-doc-env]。

## 数据库与事件日志的分工 {#transcripts-database-layout}

会话记录确实走数据库，且不止一张表。`event` 与 `event_sequence` 是事件日志，聚合 ID 就是会话 ID [@ref-opencode-transcripts-sql-event]；`session_v2` 是元数据与汇总，另有 `time_busy`、`time_idle`、`time_viewed`、`time_compacting`、`time_archived` 等状态列 [@ref-opencode-transcripts-sql-session-v2]；`session_message` 保存带序号的消息信封，`session_part` 保存助手内容片段 [@ref-opencode-transcripts-sql-message-v2][@ref-opencode-transcripts-sql-part-v2]；`session_inbox` 保存排队输入 [@ref-opencode-transcripts-sql-inbox-v2]；媒体按 `media_blob` 标志落在 `blob` 与 `blob_ref` [@ref-opencode-transcripts-sql-blob-v2]。旧 V1 的 `message`、`part` 表只作为迁移来源存在，当前读写路径不再使用。

恢复一个会话真正必需的是 `session_v2` 行加上该会话的 `session_message` 与 `session_part` 行；`session_inbox`、回滚状态与差异汇总缺失只影响展示和回滚，不影响把对话读回来。版本迁移在打开数据库时执行：先看 `sqlite_master`，已有 `session` 或 `session_v2` 表就只补未完成的迁移；库非空却两种表都没有直接终止；全新库一次性建表、可选导入旧凭据并把所有迁移标记为已完成 [@ref-opencode-transcripts-db-migration-v2]。

投影与事件写入在同一事务内提交 [@ref-opencode-transcripts-projector-parts-v2]，但固定来源里没有面向用户的“从 `event` 表重放投影”命令。可用的重建入口是 `opencode session import`，它按 `session_v2` 与 `session_message` 两张表写入，冲突时直接报已存在 [@ref-opencode-transcripts-import-tables]。因此只删投影表而保留事件表不会自动恢复记录，这一点不能当作“可重建”来依赖。

## 归档、导出、删除与保留 {#transcripts-retention-and-recovery}

归档是原地状态标记，不是导出也不是搬走文件。会话服务提供 archive 与 unarchive：前者在该会话已归档时直接返回，否则发布 Archived 事件；后者发布 Unarchived 事件 [@ref-opencode-transcripts-archive-service]。投影器收到事件后只改该会话行的 `time_archived`（归档写事件时间，取消归档置空）并顺带更新 `time_updated` [@ref-opencode-transcripts-archive-projector]；消息、事件记录与旁路文件都不动。

归档不改变可见范围。会话列表的 `archived` 过滤是可选项：取 true 只返回归档会话，取 false 排除归档会话，省略则两者都返回 [@ref-opencode-transcripts-list-archived-filter]。命令行的 `opencode session list` 不传这个参数，所以归档会话仍会出现在列表里；默认条数上限是 100，可用 `--max-count` 调整 [@ref-opencode-transcripts-cli-session-commands-v2]。

导出与导入搬运的是会话信息加当前消息表。导出取会话元数据与该会话按创建时间升序的全部消息，只保留已结算的消息（助手消息必须已 completed，shell 与 compaction 必须不在 running），加 `--sanitize` 时把标题、元数据、目录、回滚补丁与消息内容替换成占位标记 [@ref-opencode-transcripts-transfer-export-v2] [@ref-opencode-transcripts-doc-cli-export-v2]。导入先查同名会话，存在就报冲突并提示已存在；父会话必须已存在；随后按当前项目重写项目归属与子路径，把消息重新编号成 seq 1..n 写入 `session_message`，并在创建事件的提交里回填费用、token 计数、创建时间、忙碌／空闲／查看时间与归档时间 [@ref-opencode-transcripts-transfer-import-v2]。导入源可以是本地 JSON 文件，也可以是 URL，`opencode session import` 额外提供 `--directory` 指定导入到哪个目录 [@ref-opencode-transcripts-cli-session-commands-v2]。

导入时的媒体处理取决于目标位置：只有导入数据里内联的媒体才会被拆成 blob，且只有这些新 blob 会记录引用；目标位置开启 `media_blob` 时媒体去重写入 `blob`／`blob_ref`，否则保持内联 [@ref-opencode-transcripts-transfer-import-v2] [@ref-opencode-transcripts-media-blob-v2]。

因此跨机器恢复会丢几类内容：`tool-output` 里的完整工具输出与 `snapshot` 目录里的文件状态快照都不在导出范围内，被截断的工具输出只剩指向旧绝对路径的提示文本；消息里的 native 压缩窗口只有在同一 provider 与模型上才可重放。分享不再是记录机制的一部分：会话行还保留 `share_url` 列但会话层没有读写它的实现，本章不把分享当作归档或导出手段。

删除走 `opencode session delete SESSION_ID` [@ref-opencode-transcripts-cli-session-commands-v2]。服务先确认会话存在，中断执行、等待空闲、取消该会话的后台任务、关闭传输，清掉该会话的环境变量并发布 Deleted 事件，最后再逐个删除子会话；父会话先删是为了避免中断中的子会话在父行已删除后回写生命周期 [@ref-opencode-transcripts-remove-v2]；投影器删掉会话行，消息、片段与汇总靠外键级联一起消失。保留策略只覆盖旁路目录：`tool-output` 只清理以 `tool_` 加 12 位十六进制命名的文件，保留期 7 天 [@ref-opencode-transcripts-tool-output-cleanup-v2]，这层扫描全局只跑一份，按一小时间隔重复 [@ref-opencode-transcripts-tool-output-schedule-v2]。会话本身没有自动过期或保留机制。

## 定位、读取与排错 {#transcripts-diagnostics}

先确认路径。`opencode debug paths [name]` 打印全局路径，传入 `db` 时只打印数据库文件 [@ref-opencode-transcripts-cli-debug-paths]。数据库文件名由 `databasePath` 决定：`OPENCODE_DB` 优先；否则看通道，`latest`、`dev`、`beta`、`next`、`prod` 或 `OPENCODE_DISABLE_CHANNEL_DB` 为 `1`／`true` 时用 `opencode.db`，其余通道用 `opencode-{通道}.db`（非法字符替换成连字符）；`:memory:` 原样返回，其他值解析到 data 目录下 [@ref-opencode-transcripts-db-file]。

命令注册表里没有顶层 `opencode db` 命令；能用的入口是 `debug paths`、`session list`、`session delete`、`session export`、`session import` 与对应的服务端接口 [@ref-opencode-transcripts-cli-session-commands-v2]。

需要人读的内容用 `opencode session list --format json` 取会话的 id、标题、创建与更新时间、项目 id 与目录 [@ref-opencode-transcripts-cli-session-commands-v2]，再用 `opencode session export` 配合 `--sanitize` 导出可读 JSON 做人工核对 [@ref-opencode-transcripts-cli-session-commands-v2]。

直接读库时，会话信封都在 `session_message`：按 `session_id` 过滤、按 `seq` 排序，`data` 列是 JSON 文本，需要在查询侧解析 [@ref-opencode-transcripts-sql-message-v2]；助手内容在 `session_part`，按 (message_id, ordinal) 排序 [@ref-opencode-transcripts-sql-part-v2]；会话行在 `session_v2`，归档状态看 `time_archived` 是否为空，忙碌／空闲状态看 `time_busy` 与 `time_idle`。开启 `media_blob` 时，消息里的 `media:` 引用需要到 `blob` 表按 hash 取回二进制 [@ref-opencode-transcripts-sql-blob-v2]。

完整性方面能确认的有限：外键在打开数据库时启用，消息行通过 `session_id` 关联会话行，片段通过 `message_id` 关联消息行，递归删除由外键级联完成；没有校验事件日志与投影表一致性的命令，`tool-output` 缺失只能靠消息里的截断提示与目录实际内容比对发现 [@ref-opencode-transcripts-tool-output-marker-v2] [@ref-opencode-transcripts-tool-output-cleanup-v2]。归档与取消归档只改 `time_archived` 列的入口是会话服务的 archive／unarchive [@ref-opencode-transcripts-archive-service]。
