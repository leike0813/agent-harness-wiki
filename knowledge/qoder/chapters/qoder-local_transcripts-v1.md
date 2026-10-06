---
schema_version: 3
record_kind: production
edition_id: qoder-local_transcripts-v1
harness_id: qoder
topic: local_transcripts
title: "Qoder 的本地 Transcript：IDE 会话日志的记录范围、文件格式与生命周期边界"
sections:
  - section_id: transcripts-sources
    surface_ids: [qoder, cli]
    source_refs:
      - ref-qoder-lt-transcript-file
      - ref-qoder-lt-cli-user-dir
      - ref-qoder-lt-ide-qoder-dir
      - ref-qoder-lt-ide-indexing-cloud
  - section_id: transcripts-ide-storage
    surface_ids: [qoder]
    source_refs:
      - ref-qoder-lt-transcript-file
      - ref-qoder-lt-line-fields
      - ref-qoder-lt-hook-input-transcript
      - ref-qoder-lt-hook-env-transcript
      - ref-qoder-lt-subagent-transcript
      - ref-qoder-lt-ide-chat-history
      - ref-qoder-lt-ide-separate-window
  - section_id: transcripts-ide-schema
    surface_ids: [qoder]
    source_refs:
      - ref-qoder-lt-line-fields
      - ref-qoder-lt-record-session-meta
      - ref-qoder-lt-record-user
      - ref-qoder-lt-record-assistant-text
      - ref-qoder-lt-record-assistant-tool
      - ref-qoder-lt-record-progress
      - ref-qoder-lt-timeline
      - ref-qoder-lt-meta-records
  - section_id: transcripts-ide-lifecycle
    surface_ids: [qoder]
    source_refs:
      - ref-qoder-lt-session-start
      - ref-qoder-lt-session-end
      - ref-qoder-lt-precompact
      - ref-qoder-lt-stop-full-history
      - ref-qoder-lt-quest-notes
      - ref-qoder-lt-quest-conversation
  - section_id: transcripts-ide-archive-cleanup
    surface_ids: [qoder]
    source_refs:
      - ref-qoder-lt-session-end
      - ref-qoder-lt-transcript-file
      - ref-qoder-lt-ide-regen-dir
      - ref-qoder-lt-ide-indexing-cloud
      - ref-qoder-lt-quest-task-ops
  - section_id: transcripts-ide-diagnostics
    surface_ids: [qoder]
    source_refs:
      - ref-qoder-lt-jq-commands
      - ref-qoder-lt-hook-input-transcript
      - ref-qoder-lt-meta-records
      - ref-qoder-lt-stop-full-history
      - ref-qoder-lt-ide-log-tail
      - ref-qoder-lt-ide-log-analysis
  - section_id: transcripts-cli-sessions
    surface_ids: [cli]
    source_refs:
      - ref-qoder-lt-cli-user-dir
      - ref-qoder-lt-cli-env
      - ref-qoder-lt-cli-session-retention
      - ref-qoder-lt-cli-plan-dir
      - ref-qoder-cli-configdir
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-schema
        status: partial
        source_refs:
          - ref-qoder-lt-line-fields
          - ref-qoder-lt-record-session-meta
          - ref-qoder-lt-record-user
          - ref-qoder-lt-record-assistant-text
          - ref-qoder-lt-record-assistant-tool
          - ref-qoder-lt-record-progress
          - ref-qoder-lt-meta-records
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-env, ref-qoder-lt-cli-session-retention]
  - question_id: transcripts.location
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-storage
        status: partial
        source_refs:
          - ref-qoder-lt-transcript-file
          - ref-qoder-lt-hook-input-transcript
          - ref-qoder-lt-hook-env-transcript
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: partial
        source_refs: [ref-qoder-lt-cli-user-dir, ref-qoder-lt-cli-env, ref-qoder-cli-configdir]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-storage
        status: partial
        source_refs:
          - ref-qoder-lt-transcript-file
          - ref-qoder-lt-line-fields
          - ref-qoder-lt-subagent-transcript
          - ref-qoder-lt-ide-separate-window
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-env]
  - question_id: transcripts.format
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-storage
        status: answered
        source_refs: [ref-qoder-lt-transcript-file, ref-qoder-lt-line-fields]
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-user-dir]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-schema
        status: answered
        source_refs:
          - ref-qoder-lt-line-fields
          - ref-qoder-lt-record-session-meta
          - ref-qoder-lt-record-user
          - ref-qoder-lt-record-assistant-text
          - ref-qoder-lt-record-assistant-tool
          - ref-qoder-lt-record-progress
          - ref-qoder-lt-timeline
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-env]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-lifecycle
        status: partial
        source_refs:
          - ref-qoder-lt-session-start
          - ref-qoder-lt-session-end
          - ref-qoder-lt-precompact
          - ref-qoder-lt-stop-full-history
          - ref-qoder-lt-quest-notes
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: partial
        source_refs: [ref-qoder-lt-cli-env, ref-qoder-lt-cli-session-retention]
  - question_id: transcripts.database
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-archive-cleanup
        status: partial
        source_refs:
          - ref-qoder-lt-transcript-file
          - ref-qoder-lt-ide-indexing-cloud
          - ref-qoder-lt-ide-regen-dir
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-user-dir]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-archive-cleanup
        status: partial
        source_refs:
          - ref-qoder-lt-session-end
          - ref-qoder-lt-transcript-file
          - ref-qoder-lt-quest-task-ops
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-session-retention]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-archive-cleanup
        status: partial
        source_refs:
          - ref-qoder-lt-ide-regen-dir
          - ref-qoder-lt-session-end
          - ref-qoder-lt-quest-task-ops
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: partial
        source_refs: [ref-qoder-lt-cli-session-retention]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: transcripts-ide-diagnostics
        status: answered
        source_refs:
          - ref-qoder-lt-jq-commands
          - ref-qoder-lt-hook-input-transcript
          - ref-qoder-lt-meta-records
          - ref-qoder-lt-stop-full-history
          - ref-qoder-lt-ide-log-tail
          - ref-qoder-lt-ide-log-analysis
      - surface_ids: [cli]
        section_id: transcripts-cli-sessions
        status: unknown
        source_refs: [ref-qoder-lt-cli-env, ref-qoder-lt-cli-plan-dir]
---

适用性说明：本章按 catalog 登记的两个界面分别采写——`qoder`（Qoder IDE，kind `ide`）与 `cli`（Qoder CLI，kind `cli`）。全部结论只固定到下列官方文档快照，抓取时间均为 2026-09-30：`extensions/hooks.md`（`snapshot-qoder-docs-ide-hooks`）、`user-guide/chat/overview.md`（`snapshot-qoder-docs-ide-chat`）、`user-guide/quest/overview.md`（`snapshot-qoder-docs-ide-quest`）、`troubleshooting/troubleshooting-guide.md`（`snapshot-qoder-docs-ide-diagnose-faq`）、`user-guide/indexing.md`（`snapshot-qoder-docs-ide-indexing`）、`cli/settings-reference.md`（`snapshot-qoder-docs-cli-settings-reference`）、`cli/config-scope.md`（`snapshot-qoder-docs-cli-config-scope`）。这些来源都未标注软件版本，`version_applicability` 为 `unknown`，因此不能把下文结论绑定到某个已安装版本；Qoder 是闭源产品，没有官方源码仓库可固定 commit，本章不写源码级映射。行文中给出的路径模板保持文档原文的占位形态，不替换成本机真实绝对路径。

## 固定来源与两类记录的边界 {#transcripts-sources}

本章把三类东西分开写，因为它们在 Qoder 文档里并存且容易被混为一谈：

1. **本机会话记录**：IDE 侧有明确机制——Qoder IDE 自动生成的会话日志文件 Transcript，路径由 Hook 输入里的 `transcript_path` 给出，文档举例 `~/.qoder/projects/{project}/transcript/{session-id}.jsonl`（原文用尖括号表示占位，本章统一改写为花括号，避免与 Markdown 的行内标记混淆）。[@ref-qoder-lt-transcript-file]
2. **本机配置与运行时数据**：CLI 侧的用户级数据默认在 `~/.qoder`，可用 `QODER_CONFIG_DIR` 改；项目级 `.qoder` 目录固定在项目根。[@ref-qoder-lt-cli-user-dir] IDE 侧在 Windows 上确认存在 `.qoder` 目录（`C:\Users\{用户名}\.qoder`），并可列出该目录的结构与文件大小。[@ref-qoder-lt-ide-qoder-dir]
3. **云端数据**：Qoder IDE 的代码索引会把必要代码文件上传生成云端向量数据，生成后上传的文件即销毁，只在云端保留向量数据。[@ref-qoder-lt-ide-indexing-cloud] 这条与本机会话记录无关，不能当作本机存储机制。

已查入口（CLI 侧为什么大量题只能是 partial/unknown）：`cli/config-scope.md` 的 `.qoder` 目录清单、`cli/settings-reference.md` 的全部配置组与环境变量表、`cli/Skills.md`、`cli/mcp-reference.md`、`cli/plugins-reference.md`。这五处都没有给出 Qoder CLI 会话记录的路径、格式、schema、读取或删除方法；结论是"本轮固定来源没有记录"，不是"CLI 不记录会话"。加载与合并这些设置文件的位置与优先级属于配置机制主题（`config.sources`、`config.overrides`、`config.runtime`、`config.defaults`），本章不重复。

## IDE 会话记录的位置、命名与格式 {#transcripts-ide-storage}

Transcript 由 IDE 自动生成、用户不手工创建。**要拿到准确路径，官方给的是 Hook 通道而不是文档约定**：每个 Hook 事件输入都带 `transcript_path`（表内标记为 Always Present），脚本同时能读到 `QODER_TRANSCRIPT_PATH` 环境变量。[@ref-qoder-lt-hook-input-transcript] [@ref-qoder-lt-hook-env-transcript] 也就是说，路径是运行期由 IDE 注入的值，`~/.qoder/projects/{project}/transcript/{session-id}.jsonl` 只是文档给出的示例形态。

命名方面，文件名是 `{session-id}.jsonl`，放在 `transcript/` 子目录下；记录内每行都带 `sessionId` 字段，另有 `uuid`、`timestamp`、`cwd`。[@ref-qoder-lt-transcript-file] [@ref-qoder-lt-line-fields] `{project}` 这一层如何编码项目路径（绝对路径散列、目录名转义或其它规则），固定来源没有说明——这是位置一题只能给 partial 的主要原因。

会话之间的关系：主会话与分窗口会话各自独立，文档把它们描述为"完全独立的窗口"并按"不同 session"来举例；子代理有自己的 transcript 文件，`SubagentStop` 事件通过 `agent_transcript_path` 指向它。[@ref-qoder-lt-ide-separate-window] [@ref-qoder-lt-subagent-transcript] 子代理与主会话记录之间是否共享同一 `sessionId`、如何关联分叉，文档没有给出可验证的命名规则。UI 侧的历史入口是聊天面板右上角的历史图标，能查看全部聊天历史。[@ref-qoder-lt-ide-chat-history]

格式是 **JSONL**：每行是一个独立 JSON 对象，按时间顺序追加（append），记录完整会话交互。[@ref-qoder-lt-transcript-file] 这三件事——行式、逐行独立、按时间追加——由来源直接给出，所以格式一题为 answered。固定来源没有记录字符编码、压缩、分片或轮转规则，也没有记录是否存在会话结束后的重写。

## 记录内容与逐行 schema {#transcripts-ide-schema}

每一行共享一组字段：`type`、`sessionId`、`uuid`、`timestamp`、`cwd`，正文放在 `message`（`user`/`assistant`）或 `data`（`session_meta`/`progress`）。[@ref-qoder-lt-line-fields] `type` 的取值就是记录类型枚举：`session_meta` / `user` / `assistant` / `progress`。

四类记录及其字段（脱敏后的最小示例，取自来源原文）：[@ref-qoder-lt-record-session-meta] [@ref-qoder-lt-record-user] [@ref-qoder-lt-record-assistant-text] [@ref-qoder-lt-record-assistant-tool] [@ref-qoder-lt-record-progress]

| 记录类型 | 承载字段 | 内容要点 |
| :-- | :-- | :-- |
| `session_meta` | `data.meta_type`、`data.content` | 每个文件第一行；`data.content.mode` 取 `agent`/`plan`/`ask`/`debug`，`data.content.session_type` 取 `assistant`/`inline_chat` 等 |
| `user` | `message.content` | 两种形态：字符串是用户提问；数组时元素为 `tool_result`，含 `tool_use_id`、`content`、`is_error`，同层还有 `toolUseResult` 快捷字段 |
| `assistant` | `message.content` 数组 | 元素只有两种：`text`（模型文本）与 `tool_use`（`id`、`name`、`input`） |
| `progress` | `data` | `data.type` 为 `hook_progress` 时记录 Hook 触发：`hookEvent`、`hookName`、`command` |

关系上有一条明确约束：assistant 侧 `tool_use.id` 与随后的 `user` 侧 `tool_result.tool_use_id` 对应，所以"哪些工具调用失败了"可以从文件本身判定。[@ref-qoder-lt-record-assistant-tool] [@ref-qoder-lt-record-user]

除逐轮对话外，Transcript 还会自动记入三类元数据：`session_meta(rules)`（本次会话加载的 Rules：名称、触发类型、文件路径）、`session_meta(slash_command)`（本次用到的 Skills：名称、类型、文件路径）、`session_meta(session_info)`（会话模式与类型）。[@ref-qoder-lt-meta-records] 这解释了为什么 Rules 与 Skills 的加载情况可以在会话文件里事后回看。

一次会话的典型记录顺序是固定的：`session_meta` 开场，随后按 `progress`（Hook 触发）→ 用户提问 → 模型文本 → `tool_use` → `tool_result` 交替推进，末尾是 `Stop` Hook 与最后一次 `assistant` 文本。[@ref-qoder-lt-timeline]

仍缺的具体 schema 缺口，照实列出：来源没有给出字段的必填/可选标注（Hook 输入侧反而明确要求"每个字段都按可选对待"）、没有给出 `uuid`/`sessionId` 的生成规则、没有记录 `tool_result.content` 的截断或体积上限，也没有记录任何**版本迁移规则**——固定来源没有说明升级后旧 transcript 是否仍被同一解析路径读取。**哪些内容不落盘**同样没有来源：文档没有列出排除清单，也没有给出关闭 transcript 记录的开关，所以 `transcripts.scope` 只能给 partial。

## 会话生命周期 {#transcripts-ide-lifecycle}

创建与恢复：Transcript 的第一行是 `session_meta`，`SessionStart` 事件在"会话开始或恢复"时触发，IDE 目前把 `type` 传为 `startup`。[@ref-qoder-lt-session-start] 来源只说明该事件的触发时机，没有给出恢复时 transcript 是继续追加同一文件还是另起文件——这是 `transcripts.lifecycle` 只能给 partial 的原因之一。

关闭与副作用：`SessionEnd` 在会话结束时触发、不可阻断，文档明确它的用途是"做清理或会话归档的副作用"，并通过输入字段 `reason` 给出结束原因。[@ref-qoder-lt-session-end] 注意文档同时提醒历史 matcher 元数据曾叫 `exit_reason`，脚本应读实际的 `reason` 字段。

上下文压缩：`PreCompact` 在压缩前触发，matcher 区分 `manual`（用户发起）与 `auto`（接近上下文上限时自动触发），IDE 侧该事件只能通知与做副作用，不能阻断压缩。[@ref-qoder-lt-precompact] 压缩之后 transcript 如何延续（是否写入压缩摘要记录）没有来源。

交给子代理：子代理有自己的 transcript 文件路径，通过 `SubagentStop` 的 `agent_transcript_path` 暴露；主会话 transcript 与子代理 transcript 的归并关系未见文档说明。[@ref-qoder-lt-subagent-transcript]

读取时机上有一个对排错很有用的性质：`UserPromptSubmit` 与 `PostToolUse` 只能看到当次交互的数据，而 `Stop` 时点的 Transcript 文件已经包含完整会话历史，可一次抽出模型回复文本、工具调用分布与成功率。[@ref-qoder-lt-stop-full-history]

IDE 的 Quest 界面在任务层面提供回滚与分叉：编辑已发送的消息后重新提交会把工作区文件回滚到该轮之前的状态；Quest 任务在任务管理区支持 Pin、Fork、重命名与删除。[@ref-qoder-lt-quest-notes] [@ref-qoder-lt-quest-task-ops] 这些是**任务与工作区**层面的操作，文档没有说它们如何改写 transcript 文件，不要当成记录层的分支机制。Quest 的会话区在界面上呈现完整 transcript——用户指令、模型回复、中间步骤与输出；来源没有说明这一界面视图与磁盘上的 JSONL 记录如何对应。[@ref-qoder-lt-quest-conversation]

## 数据库、归档与清理 {#transcripts-ide-archive-cleanup}

**数据库分工**：已归档来源里，IDE 会话记录只以 `transcript_path` 指向的那一个 JSONL 文件作为载体，没有第二个本地存储。[@ref-qoder-lt-transcript-file] 来源里没有任何关于本机会话数据库、会话索引或辅助状态表的记载，也没有说明哪些文件是恢复会话所必需的。代码索引这一侧确实有存储，但它是云端向量数据，本机没有对应的索引位置可查。[@ref-qoder-lt-ide-indexing-cloud] 因此 `transcripts.database` 只能给 partial：文件形态已知，数据库部分未知。

**归档**：没有找到原生归档开关或导出命令的记载——记录本体就是 `transcript_path` 指向的那个文件，文档没有给出针对它的导出入口。[@ref-qoder-lt-transcript-file] 官方给出的路径是扩展点——在 `SessionEnd` 事件里自己做复制或清理。[@ref-qoder-lt-session-end] 这与"导出"不是一回事：它由用户的脚本实现，跨机器恢复会连带丢失 IDE 侧的其它状态，来源没有说明恢复后哪些信息不完整。Quest 的 Pin/Fork/delete 作用在任务对象上，不能等同于 transcript 文件的导出或归档。[@ref-qoder-lt-quest-task-ops]

**清理**：官方文档给出的整目录重置手段出现在排障指南里——当 `Qoder.exe` 存在性检查报错时，处置步骤是"检查安装路径 → 删除 `.qoder` 目录 → 重启 IDE 让目录重新生成"。[@ref-qoder-lt-ide-regen-dir] 这条只说明目录可被删除并重建；文档没有说明其中的会话记录删除后能否恢复、UI 的聊天历史会变成什么样，因此不能推断"删了也没事"或"删了不可逆"。同样没有来源支持"手动删除单个 transcript 文件"的后果、级联关系或孤儿记录处理。删除前应停止哪些写入者（IDE 进程、后台索引任务）也没有记载。

## 定位、读取与排错 {#transcripts-ide-diagnostics}

官方给出的读取方式是按行用 `jq` 过滤，文档列出的常用抽取包括：全部用户提问（用 `message.content` 是字符串来排除工具结果）、全部模型文本回复、全部工具调用与工具名分布、失败的工具调用（`tool_result` 且 `is_error == true`）、会话模式（`session_meta` 的 `data.content.mode`）以及 Hook 触发记录。[@ref-qoder-lt-jq-commands] 记录里的 `meta_type` 值还可用来区分 `rules`、`slash_command`、`session_info`。[@ref-qoder-lt-meta-records]

路径的获取入口与健壮性检查：Hook 输入的 `transcript_path` 是官方入口，示例脚本先判断该路径非空且文件存在再继续读取。[@ref-qoder-lt-hook-input-transcript] 完整性检查的官方做法有两项：诊断脚本收集 `qoder.log` 的最后 80 行用于识别运行错误与连接问题；脚本列出 `.qoder` 下完整的目录结构与文件大小，用于检查磁盘占用并发现缺失或异常小的文件。[@ref-qoder-lt-ide-log-tail] [@ref-qoder-lt-ide-log-analysis] 排障入口本身要求 Windows、以管理员权限运行，并把收集结果打包为 `qoder-diagnosis_YYYYMMDD_HHMMSS.zip`。

需要区分的一点：文档示例脚本会把抽取结果写进 `~/.qoder/stats/` 下的 JSONL（例如按日期的 usage 汇总）。[@ref-qoder-lt-meta-records] 那是用户脚本自己产生的派生数据，不是第一方会话记录；备份或清理时不要把它当作 transcript 的子目录依赖。做全量归档或完整性核对时，取数时机的差别会影响结果：单次交互事件只覆盖当轮，而 `Stop` 时点的文件才含完整历史。[@ref-qoder-lt-stop-full-history]

## Qoder CLI 的会话记录：可证实的部分与缺口 {#transcripts-cli-sessions}

CLI 侧能由固定来源证实的只有三点：

1. **会话对象存在，且有身份变量**。环境变量表里有 `QODER_SESSION_ID`（Session ID）与 `QODER_SESSION_NAME`（Session name）；同一张表给出 `QODER_CONFIG_DIR`——用户配置目录位置，默认 `~/.qoder`。[@ref-qoder-lt-cli-env]
2. **用户级数据的位置与覆盖方式**。用户级数据（`settings.json`、认证状态、插件）存在用户配置目录，默认 `~/.qoder`，可用 `QODER_CONFIG_DIR` 改；项目级 `.qoder` 目录固定在项目根。[@ref-qoder-lt-cli-user-dir] 项目级 `.qoder` 的公开清单是配置、rules、skills、`--worktree` 产生的隔离检出与 `scheduled_tasks.json`，其中没有列出任何会话记录文件。[@ref-qoder-cli-configdir]
3. **存在自动会话清理开关**。`general.sessionRetention.enabled` 默认 `true` 控制自动会话清理，`general.sessionRetention.maxAge` 默认 `30d` 删除超过该时长的会话，`general.sessionRetention.minRetention` 默认 `1d` 是保留期下限。三项都不需要重启即可生效。[@ref-qoder-lt-cli-session-retention]

顺带澄清一个易混项：`general.plan.directory` 默认是系统临时目录，用途是"存放 plan 工件"，不是会话记录目录；系统临时目录在重启后可能被清空，不能当作归档位置。[@ref-qoder-lt-cli-plan-dir]

由此产生的缺口（全部是"本轮来源没有记录"，不是"不支持"）：

- `transcripts.scope` / `format` / `schema` / `naming` / `database` / `archive`：CLI 会话记录写在哪、什么格式、有哪些字段与记录类型、是否有索引或数据库、能否导出，全部无来源。`QODER_SESSION_ID` 只证明会话有身份标识，不证明记录文件的形态。
- `transcripts.lifecycle`：新会话在启动时加载配置与 Skills（已在 Skills 主题记录），但记录文件的创建、追加、恢复行为无来源。
- `transcripts.cleanup`：`sessionRetention` 是文档中唯一的官方清理机制，但它删除的对象范围（是否包含 transcript 文件、索引或缓存）、是否级联、手动删除的后果，文档都没有说明。[@ref-qoder-lt-cli-session-retention]
- `transcripts.diagnostics`：没有来源说明如何定位或读取 CLI 的会话记录。

要把这些题从 partial/unknown 推进到 answered，需要官方文档给出 CLI 会话记录的路径与格式，或官方源码仓库可固定 commit；本轮 `registry/harnesses/qoder.yaml` 没有登记 git 仓库来源，无法用源码补证。