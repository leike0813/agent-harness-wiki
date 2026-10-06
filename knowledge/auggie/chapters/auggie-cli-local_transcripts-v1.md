---
schema_version: 3
record_kind: production
edition_id: auggie-cli-local_transcripts-v1
harness_id: auggie
topic: local_transcripts
title: "Auggie 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs:
      - ref-auggie-lt-incremental-session-save
      - ref-auggie-lt-keep-transcript-setting
      - ref-auggie-lt-session-json-metadata
      - ref-auggie-docs-reference-sessions
  - section_id: transcripts-storage-and-naming
    surface_ids: [cli]
    source_refs:
      - ref-auggie-docs-reference-sessions
      - ref-auggie-lt-session-list-resume-commands
      - ref-auggie-lt-session-rename
      - ref-auggie-lt-worker-child-sessions
      - ref-auggie-lt-picker-filters-subagent-sessions
      - ref-auggie-lt-session-list-ordering
      - ref-auggie-lt-session-json-metadata
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-auggie-lt-incremental-session-save
      - ref-auggie-lt-context-compression
      - ref-auggie-lt-fork-session
      - ref-auggie-lt-replay-session-summary
      - ref-auggie-lt-session-list-resume-commands
      - ref-auggie-lt-session-json-metadata
      - ref-auggie-docs-reference-sessions
  - section_id: transcripts-index-and-queue
    surface_ids: [cli]
    source_refs:
      - ref-auggie-lt-transcript-queue-rows
      - ref-auggie-lt-session-list-pagination
  - section_id: transcripts-cleanup-and-deletion
    surface_ids: [cli]
    source_refs:
      - ref-auggie-lt-session-sharing-link
      - ref-auggie-lt-session-delete-workspace-id
      - ref-auggie-lt-selective-session-deletion
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-auggie-docs-reference-sessions
      - ref-auggie-lt-session-list-ordering
      - ref-auggie-lt-replay-session-summary
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: partial
        source_refs:
          - ref-auggie-lt-incremental-session-save
          - ref-auggie-lt-keep-transcript-setting
          - ref-auggie-lt-session-json-metadata
          - ref-auggie-docs-reference-sessions
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: unknown
        source_refs:
          - ref-auggie-docs-reference-sessions
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs:
          - ref-auggie-docs-reference-sessions
          - ref-auggie-lt-session-rename
          - ref-auggie-lt-worker-child-sessions
          - ref-auggie-lt-picker-filters-subagent-sessions
          - ref-auggie-lt-session-list-ordering
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs:
          - ref-auggie-lt-session-json-metadata
          - ref-auggie-docs-reference-sessions
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs:
          - ref-auggie-lt-session-json-metadata
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-auggie-lt-incremental-session-save
          - ref-auggie-lt-context-compression
          - ref-auggie-lt-fork-session
          - ref-auggie-lt-replay-session-summary
          - ref-auggie-lt-session-list-resume-commands
          - ref-auggie-docs-reference-sessions
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-queue
        status: partial
        source_refs:
          - ref-auggie-lt-transcript-queue-rows
          - ref-auggie-lt-session-list-pagination
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-deletion
        status: partial
        source_refs:
          - ref-auggie-lt-session-sharing-link
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-deletion
        status: partial
        source_refs:
          - ref-auggie-lt-session-delete-workspace-id
          - ref-auggie-lt-selective-session-deletion
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs:
          - ref-auggie-docs-reference-sessions
          - ref-auggie-lt-session-list-ordering
          - ref-auggie-lt-replay-session-summary
---

## 记录范围与开关 {#transcripts-record-scope}

Auggie CLI 把一次 CLI 会话保存为一条“已保存会话”，并以“本地历史”称呼这份记录。官方 CLI 参考的 Sessions 表把 `--dont-save-session` 描述为“不把对话保存到本地历史”，这句话反向确认了默认行为是保存会话 [@ref-auggie-docs-reference-sessions]。同一张表还给出 `--continue`、`--resume`、`auggie session list`、`auggie session continue`、`auggie session resume` 与 `auggie session delete`，说明保存下来的会话是后续恢复、列举和删除操作共同作用的同一份记录。

保存动作发生在会话运行过程中，而不是退出时才一次性落盘。CHANGELOG 在 0.17.0 记录了两条相关行为：agent 进度在每次 LLM 交换后即被保存，进程在回合中途崩溃也不会丢失工作；排队消息被写入会话文件，因此能跨 CLI 重启存活 [@ref-auggie-lt-incremental-session-save]。这两条说明队列内容与会话正文属于同一份会话文件的保存范围。

会话记录里除对话正文外还保存了每次交换的元数据。0.29.0 的条目写明 Session JSON 现在记录每次交换的 model ID、summarization 计费信息与 sub-agent 历史 [@ref-auggie-lt-session-json-metadata]。sub-agent 历史进入会话记录，意味着被委派子代理的会话内容也会汇入父会话记录，而不只是留在子代理一侧。

是否把历史带入新会话由一个独立设置控制。0.25.1 引入 `keepTranscriptOnNewSession`，用于在开始新 TUI 会话时保留对话历史 [@ref-auggie-lt-keep-transcript-setting]。该设置的完整键名、取值与默认值在本轮固定来源中没有出现，配置文件文档页也没有列出它；能确认的只是它存在并作用于 TUI 新会话这一路径。

**已查入口与剩余缺口**：`docs.augmentcode.com/cli/reference.md`、`cli/interactive.md`、`cli/config.md`、`troubleshooting/logs.md` 四页原件，以及固定 commit 的 CHANGELOG 全文。缺口有三处：会话记录是否包含工具调用的完整入参出参、是否有任何内容被明确排除在落盘之外（例如凭据、密钥类字段）、以及 `keepTranscriptOnNewSession` 在设置文件中的确切写法。本轮没有任何来源说明“不落盘”的内容清单，因此不能推断哪些字段被过滤。

## 存储位置、命名与格式 {#transcripts-storage-and-naming}

**会话记录的落盘路径在本轮固定来源中未知。** 官方文档给出了大量 `~/.augment/` 下的路径——设置、规则、命令、agents、skills 都有明确位置——但 Sessions 一节只描述命令行为，没有任何路径；`--augment-cache-dir` 也只被说明为缓存目录，未说明会话记录是否随之迁移。CHANGELOG 提到“会话文件”时同样不带路径。因此本节不给出路径模板：读者若需定位，应先用 `auggie session list --json` 观察会话是否可见，再自行确认位置。

会话以 ID 寻址，接受 ID 前缀。`auggie --resume` 交互式选择已保存会话，`auggie --resume [sessionId]` 按 ID 或前缀恢复特定会话，`auggie session continue` 恢复最近一次会话 [@ref-auggie-docs-reference-sessions]；对应的 `auggie session list` 与 `auggie session resume` 子命令用于管理并继续会话 [@ref-auggie-lt-session-list-resume-commands]。会话还带用户可设的名字：`/rename` 为会话命名，其结果会向用户显示 [@ref-auggie-lt-session-rename]。

会话与工作区绑定，并按此分层。`auggie session list` 只列当前工作区的会话，`--all` 扩大到所有工作区 [@ref-auggie-docs-reference-sessions]。工作区归属是记录本身的属性而非纯展示维度：0.25.0 修复了 `session delete` 在缺少工作区 ID 时失败的问题 [@ref-auggie-lt-session-delete-workspace-id]，说明删除路径要按工作区标识定位记录。

父会话与子会话通过父子关系表达，而不是靠目录层级。0.33.0 让 `auggie session get` 显示一个会话的子 worker 会话 [@ref-auggie-lt-worker-child-sessions]。子代理会话与普通会话同为记录，但默认对用户隐藏：0.27.0 的会话选择器会过滤掉 subagent 会话，同时支持滚动查看更多会话 [@ref-auggie-lt-picker-filters-subagent-sessions]。列表顺序为最新优先 [@ref-auggie-lt-session-list-ordering]。

格式上，会话记录是 JSON。官方文档提供 `auggie session list --json` 以 JSON 输出已保存会话 [@ref-auggie-docs-reference-sessions]；CHANGELOG 对同一份记录直接使用“Session JSON”这一称呼，并列出它承载的字段 [@ref-auggie-lt-session-json-metadata]。本轮来源没有给出字段级 schema、编码方式、是否分片、是否压缩，也没有给出消息、工具调用、事件的类型划分与必填项，所以 `transcripts.format` 与 `transcripts.schema` 都只能停在部分确认：可确认 JSON 这一格式与三类元数据字段的存在，不可确认完整记录结构与迁移规则。最小示例因此不予编造。

## 记录的写入、恢复与分支 {#transcripts-lifecycle}

写入是增量的。agent 进度在每次 LLM 交换后即被保存，排队消息在入队时写入会话文件 [@ref-auggie-lt-incremental-session-save]。这意味着读者不能把会话文件当作回合结束后才出现的产物：进程崩溃时，文件里已经包含崩溃前完成的交换与尚未消费的队列内容。

长会话会先被压缩再继续。0.30.0 恢复了上下文压缩，使长 agent 会话能更可靠地处理大对话量 [@ref-auggie-lt-context-compression]。压缩作用于送给模型的上下文，本轮来源没有说明被压缩掉的原文是否仍完整保留在会话记录里——`/context` 与 `/stats` 只展示用量与计数，不展示记录内容，因此这一层不能从来源推断。

恢复走两条路径。`--continue` 与 `auggie session continue` 恢复最近一次对话，`--resume` 交互式选择或按 ID 前缀恢复指定会话 [@ref-auggie-docs-reference-sessions]；`auggie session resume` 是对应的子命令形式 [@ref-auggie-lt-session-list-resume-commands]。恢复过程会重放已保存的会话摘要：0.36.0 修复了重放包含不支持的 thinking 内容的会话摘要时可能出现的崩溃 [@ref-auggie-lt-replay-session-summary]。这说明摘要本身是会话记录的组成部分，格式或内容不兼容会在恢复路径上直接失败，而不只是渲染异常。

分支由 `/fork` 表达。0.22.0 加入 `/fork`，把当前会话分叉为一个新会话 [@ref-auggie-lt-fork-session]。被委派的子代理同样形成记录，sub-agent 历史写入父会话的 Session JSON [@ref-auggie-lt-session-json-metadata]。

**已查入口与剩余缺口**：CHANGELOG 中全部含 session、transcript、history、fork、compress 的条目，以及 CLI 参考的 Sessions 小节与交互模式 slash 命令表。缺口包括：会话文件在何时创建（首个回合前还是首个交换后）、关闭时是否刷盘或 fsync、压缩后原文在记录中的存留形态、以及 `/fork` 是否共享底层记录还是复制。

## 索引、队列与工作区作用域 {#transcripts-index-and-queue}

来源中出现了“行”级别的表述，说明会话数据并非只以一个大文件保存。0.25.0 修复了 CLI transcript queue 中出现重复行的问题 [@ref-auggie-lt-transcript-queue-rows]——重复行是可被逐行观测并修复的存储单位，指向行式或表式存储。这与“会话文件承载正文与队列”这一说法一致，但**来源没有指明具体引擎**：本轮没有出现 SQLite 或任何数据库名，也没有给出表名、文件扩展名或建表语句。

会话列表在规模较大时分页。0.25.0 为大列表加入分页以避免超时 [@ref-auggie-lt-session-list-pagination]，用户侧对应 `auggie session list -n` 加条数限制显示范围 [@ref-auggie-docs-reference-sessions]。分页是列举行为，不是导出行为：`-n` 与 `--json` 都作用于列表输出，本轮来源没有提供绕过列表直接导出全部会话正文的接口。

**已查入口与剩余缺口**：CHANGELOG 全文关键词检索（session、transcript、queue、row、sqlite、database、db、storage）与 CLI 参考全篇。缺口是决定性的：数据库引擎未知、文件与表的位置未知、哪些文件或表是恢复所必需未知、能否从记录重建索引未知。因此本节不给出任何可直接用于备份或恢复的文件清单，也不声称会话可以被重新生成。

## 归档、共享与删除 {#transcripts-cleanup-and-deletion}

官方提供的是分享与删除，不是本地归档。分享能力以链接形式给出：CHANGELOG 记录 TUI 的 `/share` 命令与对应的 CLI 子命令用于为聊天会话生成分享链接 [@ref-auggie-lt-session-sharing-link]。**本轮来源没有出现任何原生归档开关，也没有出现导出、复制、移动或外部备份命令**；分享链接的生成涉及哪一侧的数据、恢复后在路径与机器可移植性上损失什么，来源均未说明。归档依赖哪些必要文件同样未知——这与存储位置未知是同一个缺口。

删除是官方机制，且分两个粒度。命令层面按工作区作用域执行 `session delete`；0.25.0 修复了它在缺少工作区 ID 时失败的问题 [@ref-auggie-lt-session-delete-workspace-id]。交互层面 0.17.0 允许在会话选择器中删除单个会话 [@ref-auggie-lt-selective-session-deletion]。

**已查入口与剩余缺口**：CLI 参考 Sessions 小节、交互模式 slash 命令表、CHANGELOG 中 delete/retention/cleanup/auto-archive/share/export/backup 相关条目。缺口包括：删除前必须停止哪些写入者（运行中的 CLI、后台 daemon）、是否级联删除子代理会话、删除后是否留下可重建或不可重建的孤儿记录、以及是否存在官方保留期限或容量上限机制。0.26.0 出现的 `auto-archive` 设置属于 Expert YAML 包的自动会话清理，面向 Expert 部署而非本地 CLI 会话记录，本节不将其当作本地归档机制。“没找到保留策略”不等于可以安全手动删除文件。

## 定位、读取与排错 {#transcripts-diagnostics}

读者可见的定位入口是会话列表，而不是文件路径。`auggie session list` 列出当前工作区的已保存会话，`--all` 覆盖所有工作区，`-n` 限制条数，`--json` 输出 JSON [@ref-auggie-docs-reference-sessions]；列表按最新优先排序 [@ref-auggie-lt-session-list-ordering]。这些入口能回答“有哪些会话、能否恢复”，不能回答“记录存在哪个文件”。

恢复失败可从重放路径定位。0.36.0 的崩溃修复表明恢复会重放已保存的会话摘要，不兼容的 thinking 内容会在这条路径上失败 [@ref-auggie-lt-replay-session-summary]；同一类问题也会出现在 sub-agent 历史与逐次 model ID 元数据上 [@ref-auggie-lt-session-json-metadata]。排查时应先确认会话能否被列出，再确认能否被恢复，两者失败的原因并不相同。

本主题不逐项审计日志、缓存与遥测文件。会话记录相关的排错信息若只能从日志获得，应作为线索记录，而不是当作会话记录的证据；固定来源中的日志页给出的是 macOS 与 Windows 的临时日志文件位置，且日志不是会话记录。

**已查入口与剩余缺口**：CLI 参考的 Sessions 与 Diagnostics 小节、交互模式 slash 命令表、CHANGELOG 中 diagnostics、session errors、session list 相关条目。缺口包括：官方是否提供完整性校验或状态检查命令、记录损坏时的官方修复路径、以及是否存在官方推荐的备份流程。CLI 参考 Diagnostics 小节记录的是 `--log-file` 与 `--log-level`，属于日志而非会话记录，本节不将其作为 transcript 诊断手段。

跨主题提示：控制这些记录行为的设置项（例如 `keepTranscriptOnNewSession`）在设置文件中的加载顺序与合并规则属于“配置机制”主题，本章不重复；skill、命令与 agents 的位置规则同样在各自主题记录。