---
schema_version: 3
record_kind: production
edition_id: kiro-local_transcripts-v1
harness_id: kiro
topic: local_transcripts
title: "Kiro 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-settings-history-mode, ref-kiro-lt-settings-session-index, ref-kiro-lt-settings-compaction, ref-kiro-lt-slash-stats]
  - section_id: transcripts-storage-naming
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-settings-home-env, ref-kiro-lt-slash-chat-notes, ref-kiro-lt-slash-session-id, ref-kiro-lt-slash-load]
  - section_id: transcripts-format-schema
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-slash-chat-subcommands, ref-kiro-lt-slash-custom-storage, ref-kiro-lt-headless-stream-json, ref-kiro-lt-settings-acp-record]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-slash-chat-notes, ref-kiro-lt-slash-clear, ref-kiro-lt-slash-compact, ref-kiro-lt-slash-checkpoint, ref-kiro-lt-headless-resumed-model]
  - section_id: transcripts-index-and-specs
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-slash-sessions-dashboard, ref-kiro-lt-settings-session-index, ref-kiro-lt-slash-spec]
  - section_id: transcripts-export-cleanup
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-slash-chat-subcommands, ref-kiro-lt-slash-custom-storage, ref-kiro-lt-slash-clear, ref-kiro-lt-slash-sessions-dashboard]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-lt-slash-sessions-dashboard, ref-kiro-lt-slash-session-id, ref-kiro-lt-slash-load, ref-kiro-lt-install-logs, ref-kiro-lt-slash-stats]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-kiro-lt-settings-history-mode, ref-kiro-lt-settings-session-index, ref-kiro-lt-slash-stats]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-naming
        status: partial
        source_refs: [ref-kiro-lt-settings-home-env, ref-kiro-lt-slash-chat-notes]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-naming
        status: partial
        source_refs: [ref-kiro-lt-slash-session-id, ref-kiro-lt-slash-chat-notes, ref-kiro-lt-slash-load]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-schema
        status: partial
        source_refs: [ref-kiro-lt-slash-chat-subcommands, ref-kiro-lt-slash-custom-storage, ref-kiro-lt-headless-stream-json]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-schema
        status: unknown
        source_refs: [ref-kiro-lt-slash-custom-storage, ref-kiro-lt-slash-chat-subcommands]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-kiro-lt-slash-chat-notes, ref-kiro-lt-slash-clear, ref-kiro-lt-slash-compact, ref-kiro-lt-slash-checkpoint]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-specs
        status: unknown
        source_refs: [ref-kiro-lt-slash-sessions-dashboard, ref-kiro-lt-settings-session-index]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-cleanup
        status: partial
        source_refs: [ref-kiro-lt-slash-chat-subcommands, ref-kiro-lt-slash-custom-storage]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-cleanup
        status: partial
        source_refs: [ref-kiro-lt-slash-sessions-dashboard, ref-kiro-lt-slash-clear]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-kiro-lt-slash-sessions-dashboard, ref-kiro-lt-slash-session-id, ref-kiro-lt-install-logs]
---

## 记录范围与开关 {#transcripts-scope}

本章只调查 Kiro CLI。固定来源是四份官方文档快照（`snapshot-kiro-lt-docs-settings`、`snapshot-kiro-lt-docs-slash-commands`、`snapshot-kiro-lt-docs-headless`、`snapshot-kiro-lt-install`），抓取时间 2026-10-06，对应 `https://kiro.dev/docs/reference/settings.md`、`https://kiro.dev/docs/reference/slash-commands.md`、`https://kiro.dev/docs/cli/headless.md` 与 `https://kiro.dev/docs/getting-started/installation.md`；四份快照的 `version_applicability` 均为 `unknown`，因此下面的结论描述的是文档快照所描述的机制，不能绑定到任何已安装版本。catalog 里另有 `kiro`（IDE）与 `web` 两个界面，本轮没有能证明其本机记录形态的来源，不在此写答案，查询会派生为 `not_investigated`。

Kiro 官方文档没有给出“会话记录包含哪些字段”的完整定义，只在两个可观察面上限定了记录内容。

第一个是 V3 会话面板的检索范围。`chat.sessionDashboard.indexResponses` 决定 `/sessions` 检索时是否包含 agent 响应：`true` 为 Prompts 与 agent responses，`false` 只索引 Prompts；文档同时写明标题与用户 prompt 始终被索引，而**工具输出从不被索引**。`chat.sessionDashboard.scope` 决定面板列出哪些目录的会话：`current` 只列当前目录，`all` 列全部工作区，默认 `current`，Kiro 会在你切换面板里的 “current workspace only” 过滤时改写该值。[@ref-kiro-lt-settings-session-index]

第二个是输入历史。`chat.historyMode` 决定 prompt 历史的作用域：`session` 为默认的每会话历史，`global` 为跨会话共享；它通过 `/settings history` 设置，并在下一个会话生效。[@ref-kiro-lt-settings-history-mode]

哪些内容会被摘要化同样可配：`chat.disableAutoCompaction` 关闭自动会话摘要，`compaction.excludeMessages` 与 `compaction.excludeContextWindowPercent` 分别设定压缩时至少保留的消息对数与上下文窗口百分比。[@ref-kiro-lt-settings-compaction]

不落盘的内容至少有一处被文档明确排除：`/stats` 面板的数据保存在内存环形缓冲区中，只保留最近 100 次请求，会话结束即清零，只有显式 `/stats save` 才写成 JSON 文件。[@ref-kiro-lt-slash-stats]

**剩余缺口**：官方文档没有描述自动保存的会话文件里逐字段记录了什么（消息、工具调用、思考块、token 统计分别是否写入），也没有给出关闭或删除单条记录的机制；本轮已查入口为 settings 参考的 Chat interface 全表、`/chat`、`/sessions`、`/stats`、`/compact` 与 headless 的结构化输出小节。因此 `transcripts.scope` 记为 partial：索引范围与 prompt 历史可证实，记录内容的完整集合不可证实。

## 存储位置、路径作用域与会话标识 {#transcripts-storage-naming}

会话记录的位置在文档里只以“根目录 + 每目录分组”两级形式出现，没有具体文件名。

`KIRO_HOME` 环境变量覆盖 `~/.kiro`，而该目录用于全局的 agents、prompts、skills、steering、settings **和 sessions**；官方用途是在同一台机器上保留多套独立 Kiro 配置。据此可以确定，会话记录位于被 `KIRO_HOME` 指向的 Kiro 根目录下，而不是硬编码的家目录。[@ref-kiro-lt-settings-home-env]

分组方式是按目录：`/chat` 的说明写明会话按目录存储，每个项目有自己的一组会话。面板与选择器随之按目录展示，选择器显示会话名、最后活动时间和消息预览。[@ref-kiro-lt-slash-chat-notes]

会话标识由 `/session-id` 打印，可用 `kiro-cli chat --resume-id ID` 精确恢复同一会话；CLI 退出时也会显示带该 ID 的恢复提示。[@ref-kiro-lt-slash-session-id] 手工导出的文件名由使用者给出：`/chat load PATH` 列出并加载已保存的会话文件。[@ref-kiro-lt-slash-load] 全局配置本身落在 `~/.kiro/settings/cli.json`，工作区的 `.kiro/settings/cli.json` 覆盖全局值——那是设置而不是会话记录，作用域规则见配置章节。

**剩余缺口**：官方文档从未写出自动保存会话的目录名、文件名、扩展名、时间戳或项目路径编码方式，也没有说明父会话、子会话与分支在磁盘上如何关联；`/spawn` 启动的并行会话与主会话的关系只描述为“并排运行、可用 `Ctrl+G` 在 crew monitor 查看”，其记录是否独立成文件未说明。因此 `transcripts.location` 与 `transcripts.naming` 均记为 partial：根目录作用域与按目录分组可证实，文件级命名规则不可证实。本轮已查入口为 settings 参考的“Settings file location”与“Environment variables”小节、`/chat`、`/session-id`、`/load`，以及 steering 参考中出现的全部 `.kiro/` 与 `~/.kiro/` 路径。

## 记录格式与 schema 缺口 {#transcripts-format-schema}

格式信息全部来自显式导出与运行输出，自动保存的会话文件格式未被文档描述。

`/chat` 的子命令把会话描述为 JSON：`load` 从文件加载会话且 `.json` 扩展名可选，`save-via-script` 通过 stdin 接收 JSON，`load-via-script` 通过 stdout 输出 JSON。[@ref-kiro-lt-slash-chat-subcommands] 自定义存储小节进一步写明脚本收到的是 “the chat session JSON”，并给出把会话 JSON 写进 Git notes 的示例脚本，因此导出对象是单个 JSON 文档，而不是文档明确描述的 JSONL 流。[@ref-kiro-lt-slash-custom-storage]

两处使用 JSON Lines，但都不是会话记录文件：headless 的 `--output-format stream-json` 把运行事件按 JSON Lines 打到 stdout，每行是自包含的 JSON 对象，V3 下被中断的运行会写入一条最终中断记录；`KIRO_ACP_RECORD_PATH` 指向一个记录 TUI ACP wire 流量的 JSONL 文件，用于调试 agent 通信协议。[@ref-kiro-lt-headless-stream-json] [@ref-kiro-lt-settings-acp-record]

**剩余缺口**：没有任何来源给出自动保存会话的编码、追加还是覆盖写入规则、是否分片或压缩，也没有给出消息、工具调用、事件的字段与类型、必填项、版本迁移规则。文档也没有说明 `stream-json` 的事件类型集合能否直接当作会话记录结构——它是非交互运行的 stdout 输出，不等于磁盘上的会话存储。因此本节**不给出**脱敏示例记录：来源不足以支撑一个“最小完整”的样例，写出来只会变成编造。`transcripts.format` 记为 partial（导出与运行输出的格式可证实，落盘格式不可证实），`transcripts.schema` 记为 unknown。本轮已查入口为 slash commands 参考的 `/chat`、`/load`、`/save`、Custom session storage 小节，settings 参考的环境变量表，以及 headless 参考的 Structured output 小节。

## 记录生命周期 {#transcripts-lifecycle}

生命周期是文档描述得最完整的一面。

- **创建与追加**：会话在每个对话轮次自动保存，无需显式命令。[@ref-kiro-lt-slash-chat-notes]
- **清除而不新建会话**：`/clear` 擦除当前会话的对话历史并重置上下文，同时保留同一个会话；`/chat new` 保留当前对话并另起一段会话。[@ref-kiro-lt-slash-clear]
- **恢复**：`/chat resume` 通过选择器恢复历史会话；V3 下恢复或加载的会话保留其存储的模型，模型不可用时 Kiro 报告请求会失败并指向 `/model`；headless 侧未显式传 `--model` 时，被恢复的会话保持原有 agent 与模型。[@ref-kiro-lt-headless-resumed-model]
- **上下文压缩后延续**：`/compact` 让模型生成对话摘要并以该摘要替换消息历史，腾出上下文窗口。[@ref-kiro-lt-slash-compact]
- **与文件状态对齐**：实验特性 checkpoint 每个对话轮次创建一次、每次工具调用再创建子 checkpoint，恢复到 checkpoint 时对话历史一并回退；它通过一个 shadow bare git 仓库跟踪文件变化，可用 `/checkpoint clean` 清理该 shadow 仓库。[@ref-kiro-lt-slash-checkpoint]

因此 `transcripts.lifecycle` 记为 answered，覆盖创建、追加、清除、恢复、压缩延续与检查点回退。**未覆盖的细节**：刷盘时机（何时把内存中的轮次写入磁盘）、关闭时的收尾写入、交给子代理与分支的记录关联，文档均未描述。

## 检索面板与 spec/task 产物的关系 {#transcripts-index-and-specs}

V3 的 `/sessions` 面板同时面对本地与云端会话，负责浏览、检索、恢复与清理。[@ref-kiro-lt-slash-sessions-dashboard] 它的检索范围由 `chat.sessionDashboard.indexResponses` 控制，目录范围由 `chat.sessionDashboard.scope` 控制——这两个设置只影响面板检索，不改变会话本身的记录范围。[@ref-kiro-lt-settings-session-index]

**会话记录与 spec/task 产物是两套东西**。`/spec` 子命令把 spec 当作独立文档实体管理：`new FEATURE` 建 spec，`run FEATURE` 执行该 spec 的任务，`view FEATURE requirements|design|tasks` 打开其中一份文档，`analyze_requirements` 分析需求文档。也就是说 requirements、design、tasks 是 spec 自身的文档，与聊天会话的自动保存是不同机制；`/spec` 在云端会话激活时不可用，也说明 spec 产物与云端会话存储不是同一层。[@ref-kiro-lt-slash-spec]

**恢复一个会话需要哪些文件，官方文档没有给出**。面板、选择器与 `--resume-id` 都只按会话 ID 与目录定位，没有说明恢复时除会话记录外还要读取哪些文件；spec 文档的落盘位置同样未在已归档来源中出现（`/spec` 小节把细节指向未归档的 specs 文档）。因此 `transcripts.database` 记为 unknown：没有来源说明 Kiro CLI 是否用数据库保存会话、是否维护索引表、哪些文件或表是恢复所必需、能否重建。本轮已查入口为 `/sessions`、`/sessions clean`、`/session-id`、`/chat resume`、`/spec` 全节与 settings 参考的 Chat interface 全表。缺少证据不等于没有数据库，也不等于可以安全删除任何文件。

## 导出、备份与清理 {#transcripts-export-cleanup}

导出与自动保存是两条独立路径。自动保存在每轮对话时发生，不指定路径；导出由使用者显式触发：`/chat save PATH` 把当前会话写到一个文件，V3 可用 `--force`（或 `-f`）覆盖同名路径，`/chat load PATH` 再把它读回来。[@ref-kiro-lt-slash-chat-subcommands] `save-via-script` 与 `load-via-script` 进一步把落点交给自定义脚本，官方明确这种做法可以把会话存进版本控制系统、云存储、数据库或任意自定义位置，脚本经 stdin/stdout 交换会话 JSON。[@ref-kiro-lt-slash-custom-storage]

归档与自动保存的差别因此是：前者只带走一份会话 JSON 及其中的引用，是否包含工具输出、思考块与 spec 文档一概未说明；把它放进 Git、云存储或数据库后，恢复是否保留原路径、是否可在另一台机器上恢复，文档没有给出结论。把 `/chat save` 产出的文件当作完整备份是不安全的推断。

清理方面，官方入口有两个，作用范围不同：`/clear` 只清除当前会话的对话历史并保留会话本身；[@ref-kiro-lt-slash-clear] `/sessions clean` 先预览将被清理的空本地会话，`/sessions clean --yes` 才执行永久清理，面板本身也承担清理入口。[@ref-kiro-lt-slash-sessions-dashboard] 设置层面的删除（`kiro-cli settings --delete KEY`）只作用于 `~/.kiro/settings/cli.json` 里的设置键，与会话记录无关，不要混为一谈。

**剩余缺口**：`/sessions clean` 官方限定为“空本地会话”，非空会话的删除入口、级联删除行为、删除前需要停止哪些写入者（正在运行的 CLI、后台更新、cloud 会话）都未说明；手动删除会话文件或索引的后果同样没有来源。因此 `transcripts.archive` 与 `transcripts.cleanup` 均记为 partial：**没有证据不等于可以安全删除**，在缺少官方说明前不应把删除文件当作清理方式。本轮已查入口为 `/clear`、`/sessions`、`/sessions clean`、`/chat save|load|save-via-script|load-via-script`、settings 参考的 “Resetting settings” 小节。

## 定位、读取与排错 {#transcripts-diagnostics}

日常定位会话记录有三条官方入口：

- `/sessions`（V3 面板，未开始聊天时用 `kiro-cli chat --sessions`）浏览、检索、恢复与清理本地与云端会话；[@ref-kiro-lt-slash-sessions-dashboard]
- `/session-id` 打印当前会话 ID，配合 `kiro-cli chat --resume-id ID` 精确恢复；退出时 CLI 也会显示带 ID 的恢复提示；[@ref-kiro-lt-slash-session-id]
- `/chat load PATH` 列出并加载手工保存的会话文件，`/stats` 面板显示最近请求的 request ID、耗时、TTFC 与 token 计数，`/stats save` 可把内存中的记录写成 JSON 附到缺陷报告里。[@ref-kiro-lt-slash-load]

排错时区分“会话记录”与“日志”很重要。官方给出的 chat 日志路径按平台不同：macOS 为 `$TMPDIR/kiro-log/kiro-chat.log`，Linux 为 `$XDG_RUNTIME_DIR/kiro-log/kiro-chat.log`，Windows 为 `%TEMP%\kiro-log\logs\kiro-chat.log`，可用 `KIRO_CHAT_LOG_FILE` 覆盖；需要看 TUI 与 agent 之间的协议报文时，用 `KIRO_ACP_RECORD_PATH` 指定一个 JSONL 录制文件。[@ref-kiro-lt-install-logs] 会话本体落在 `KIRO_HOME` 根目录下、按目录分组，但**没有官方文档给出逐文件完整性检查或状态校验命令**——`kiro-cli doctor` 面向安装与登录类问题，settings 参考给出的备份做法只针对设置文件。因此 `transcripts.diagnostics` 记为 answered（入口齐全），而“如何验证一份会话记录是否完整、能否脱离原机恢复”仍是本主题的开放缺口。