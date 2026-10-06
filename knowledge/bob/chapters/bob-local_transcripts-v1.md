---
schema_version: 3
record_kind: production
edition_id: bob-local_transcripts-v1
harness_id: bob
topic: local_transcripts
title: "Bob Shell 本地 Transcript：任务记录、恢复、保留与诊断"
sections:
  - section_id: transcripts-fixed-sources
    surface_ids: [cli]
    source_refs: []
  - section_id: transcripts-task-model
    surface_ids: [cli]
    source_refs: [ref-bob-lt-run-list-tasks-workspace, ref-bob-lt-run-resume-task-id, ref-bob-lt-run-resume-latest, ref-bob-lt-run-field-title, ref-bob-lt-run-field-status, ref-bob-lt-slash-clear, ref-bob-lt-subagent-isolated, ref-bob-lt-subagent-no-history, ref-bob-lt-subagent-fork-context, ref-bob-lt-subtask-dedicated-conversation]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-bob-lt-run-ndjson-switch, ref-bob-lt-run-field-title, ref-bob-lt-run-field-updated-at, ref-bob-lt-run-field-status]
  - section_id: transcripts-lookup-resume
    surface_ids: [cli]
    source_refs: [ref-bob-lt-run-list-tasks-workspace, ref-bob-lt-run-resume-task-id, ref-bob-lt-run-resume-latest, ref-bob-lt-run-field-updated-at, ref-bob-lt-slash-resume, ref-bob-lt-slash-compact, ref-bob-lt-subagent-isolated]
  - section_id: transcripts-retention
    surface_ids: [cli]
    source_refs: [ref-bob-lt-config-retention-policy, ref-bob-lt-config-retention-version, ref-bob-lt-config-log-rotation, ref-bob-lt-ts-log-retention-count]
  - section_id: transcripts-log-boundary
    surface_ids: [cli]
    source_refs: [ref-bob-lt-chat-find-task-id, ref-bob-lt-chat-footer-context, ref-bob-lt-slash-status, ref-bob-lt-slash-logs, ref-bob-lt-ts-log-level-env, ref-bob-lt-ts-log-files, ref-bob-lt-config-log-rotation]
  - section_id: transcripts-gaps
    surface_ids: [cli]
    source_refs: [ref-bob-lt-run-ndjson-switch, ref-bob-lt-run-list-tasks-workspace]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-task-model
        status: partial
        source_refs: [ref-bob-lt-run-resume-task-id, ref-bob-lt-run-resume-latest, ref-bob-lt-run-field-title, ref-bob-lt-slash-clear, ref-bob-lt-subagent-isolated, ref-bob-lt-subagent-no-history, ref-bob-lt-subagent-fork-context, ref-bob-lt-subtask-dedicated-conversation]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lookup-resume
        status: partial
        source_refs: [ref-bob-lt-run-list-tasks-workspace, ref-bob-lt-run-field-updated-at]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-task-model
        status: partial
        source_refs: [ref-bob-lt-run-resume-task-id, ref-bob-lt-run-resume-latest, ref-bob-lt-run-field-title, ref-bob-lt-run-field-status]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-bob-lt-run-ndjson-switch, ref-bob-lt-run-field-title]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-bob-lt-run-ndjson-switch, ref-bob-lt-run-field-title, ref-bob-lt-run-field-updated-at, ref-bob-lt-run-field-status]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lookup-resume
        status: partial
        source_refs: [ref-bob-lt-run-resume-task-id, ref-bob-lt-run-resume-latest, ref-bob-lt-slash-resume, ref-bob-lt-slash-compact, ref-bob-lt-subagent-isolated]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-gaps
        status: unknown
        source_refs: []
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-gaps
        status: partial
        source_refs: [ref-bob-lt-run-ndjson-switch, ref-bob-lt-run-list-tasks-workspace]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention
        status: partial
        source_refs: [ref-bob-lt-config-retention-policy, ref-bob-lt-config-retention-version, ref-bob-lt-config-log-rotation, ref-bob-lt-ts-log-retention-count]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-log-boundary
        status: partial
        source_refs: [ref-bob-lt-chat-find-task-id, ref-bob-lt-chat-footer-context, ref-bob-lt-slash-status, ref-bob-lt-slash-logs, ref-bob-lt-ts-log-level-env, ref-bob-lt-ts-log-files, ref-bob-lt-config-log-rotation]
---

## 固定来源与适用边界 {#transcripts-fixed-sources}

本章是 Bob Shell（catalog 中的唯一界面 `cli`）的本地 Transcript 首采。全部证据来自官方文档，没有源码提交：六个固定文档快照分别是 `snapshot-bob-lt-run-20261006`（Non-interactive，抓取于 2026-10-06T04:32:59Z）、`snapshot-bob-lt-chat-20261006`（Interactive，抓取于 2026-10-06T04:32:58Z）、`snapshot-bob-lt-configuring-20261006`（Configuring，抓取于 2026-10-06T04:32:58Z）、`snapshot-bob-lt-slash-20261006`（Slash commands，抓取于 2026-10-06T04:33:00Z）、`snapshot-bob-lt-subagents-20261006`（Subagents，抓取于 2026-10-06T04:33:00Z）和 `snapshot-bob-lt-troubleshoot-20261006`（Troubleshoot，抓取于 2026-10-06T04:33:00Z）。

六个快照的 `version_applicability` 均为 `unknown`：文档没有标注适用版本，因此**不能**把下面的结论绑定到某个已安装的 Bob Shell 版本。第 5 节引用的一条版本条件是文档自身写明的例外情况，读者只能按原文的版本区间理解，不能外推到区间之外。

引用约定：这些原件是服务端渲染的 HTML，页面里的行内代码标记是原件的一部分。本章的 `excerpt` 按原件逐字保留这些标记，截断只发生在语义完整的句子边界上。

## 任务记录模型与记录范围 {#transcripts-task-model}

Bob Shell 落在本机的会话单位叫 **task（任务）**。文档的措辞是 “saved tasks”：`bob --list-tasks` 列出**当前工作区**已保存的任务后退出。[@ref-bob-lt-run-list-tasks-workspace] 任务因此按工作区划分，`--list-tasks` 本身就是一个按工作区过滤的记录入口。

记录的内容可以确定到“可恢复的对话”这一层，而不是仅仅输入历史或调试日志：

- 恢复入口按任务 ID 定位既有任务（`--resume` 加任务 ID 参数），`--resume latest` 恢复最近一个任务。[@ref-bob-lt-run-resume-task-id][@ref-bob-lt-run-resume-latest] 能按 ID 恢复，说明每个任务背后有持续保存的状态，而不只是本次进程的内存。
- 任务标题在缺失时回退到**首条消息**，再回退到 ID，说明记录里保存了消息内容而不只是元数据。[@ref-bob-lt-run-field-title]
- 任务状态有 `active`、`completed`、`paused` 三种取值，说明记录还保存生命周期状态。[@ref-bob-lt-run-field-status]

父子关系由子代理的上下文边界表达，而不是由文件路径表达。子代理运行在自己的隔离上下文窗口里，完成后把结果摘要返回主对话；[@ref-bob-lt-subagent-isolated] 默认它看不到父对话历史，[@ref-bob-lt-subagent-no-history] 需要时可以用 `fork_context: true` 把对话历史传给它，[@ref-bob-lt-subagent-fork-context] 文档还把 subagent 与 subtask 区分开，subtask 面向需要可见性和“专属对话”的复杂工作。[@ref-bob-lt-subtask-dedicated-conversation] 这说明存在两种粒度的会话延续，但文档没有说明子代理或 subtask 是否各自产生独立的已保存任务记录。

`/clear` 会清屏并重置对话历史。[@ref-bob-lt-slash-clear] 文档只描述会话内可见历史被重置，没有说明它是否删除已保存的任务记录——这两个动作不能互相推断。

已查入口与剩余缺口（`transcripts.scope` 因此是 partial）：本轮核对了 Configuring 的 Settings schema 全表、Slash commands 的内建命令表、Interactive 与 Non-interactive 两页、Troubleshoot 的排障章节，以及本轮归档的全部 23 个 bob 官方文档原件。仍未记录的是：消息与工具事件是否逐条落盘、落盘顺序、附件与外部引用如何处理、有没有开关可以关闭任务记录、遥测载荷与会话记录的关系（`telemetry.excludePayload` 只针对遥测，不等于本地记录开关）。

## 第一方记录字段与机读形态 {#transcripts-record-schema}

文档给出的唯一第一方记录 schema 是 `--list-tasks` 的机读输出：当 stdout 不是 TTY（管道或重定向）时，它从人类可读表格切换为 NDJSON，每行一个 JSON 对象。[@ref-bob-lt-run-ndjson-switch] 字段表给出五个字段：

| 字段 | 类型 | 文档给出的说明 |
| :-- | :-- | :-- |
| `id` | string（UUID） | 唯一任务标识，可用于恢复 |
| `title` | string | 任务标题，回退到首条消息，再回退到 ID [@ref-bob-lt-run-field-title] |
| `status` | string | 任务状态，取值 `active`、`completed`、`paused` [@ref-bob-lt-run-field-status] |
| `workspace` | string（file URI） | 工作区的绝对路径 |
| `updatedAt` | number | 最后更新时间的 Unix 毫秒 [@ref-bob-lt-run-field-updated-at] |

按上表整理的最小占位示例（字段名与类型来自字段表，值是占位符，**不是**文档逐字输出）：

```json
{"id":"00000000-0000-0000-0000-000000000000","title":"example task","status":"active","workspace":"file:///path/to/workspace","updatedAt":0}
```

必须区分的一点：这里的 NDJSON 是**命令行 stdout 的输出格式**，不是磁盘上会话记录的存储格式。`bob run --json` 的 NDJSON 流式事件输出、`--list-tasks` 的人类可读表格，都属于运行输出通道。文档没有给出任务记录在磁盘上的文件名、扩展名、编码、追加还是覆盖、是否分片或压缩，也没有给出索引文件——这些是 `transcripts.format` 与 `transcripts.schema` 只记为 partial 的原因。schema 层同样缺具体字段级定义：上面五个字段是摘要层记录，消息、工具调用与事件的记录类型、必填项与版本迁移规则在固定来源中没有描述。

## 定位、恢复与生命周期 {#transcripts-lookup-resume}

定位一次旧会话的做法：交互式下用 `bob --list-tasks` 找到前一次会话的 task ID。[@ref-bob-lt-chat-find-task-id] 非交互式与交互式共用同一组直接挂在 `bob` 上的 flag，因此 `--list-tasks` 对两者一致。[@ref-bob-lt-run-list-tasks-workspace] 恢复入口有三个：非交互式的 `--resume` 加任务 ID 与 `--resume latest`，以及交互式会话内的 `/resume`（别名 `/history`），后者用于浏览并恢复之前的对话。[@ref-bob-lt-run-resume-task-id][@ref-bob-lt-run-resume-latest][@ref-bob-lt-slash-resume]

上下文压缩后的延续由 `/compact` 提供，别名 `/condense`、`/compress`、`/summarize`，作用是智能压缩上下文窗口以腾出空间。[@ref-bob-lt-slash-compact] 文档没有说明压缩是否改写已保存的任务记录，也没有说明压缩前后任务 ID 是否保持不变。子代理交接是另一条延续路径：子代理在隔离上下文中执行并把摘要返回主对话。[@ref-bob-lt-subagent-isolated]

`transcripts.location` 只能记为 partial：已证实的部分是作用域与标识——记录按工作区划分，`--list-tasks` 只列当前工作区的任务，工作区以绝对路径的 file URI 表示，排序依据是 Unix 毫秒级的 `updatedAt`（这也是 `latest` 的判定依据）。[@ref-bob-lt-run-list-tasks-workspace][@ref-bob-lt-run-field-updated-at] 未证实的部分是磁盘位置：任务记录文件或目录的实际路径、是否随 `$HOME` 或环境变量变化、是否有必要附件目录，本轮固定来源都没有记录。文档只给出 `~/.bob/` 下的配置与日志路径（见下一节），没有任何一处把任务记录指向某个具体路径——不能因为它同在 `~/.bob/` 之下就推断位置。

`transcripts.lifecycle` 也是 partial：创建、追加、刷盘、关闭的时机与写入方式没有记录；已记录的是恢复、浏览、压缩后继续、子代理隔离与交接，以及三态状态取值。

## 保留期与官方清理 {#transcripts-retention}

Bob Shell 文档给出的唯一官方删除机制是配置项 `tasks.retentionDays`（number，默认 `30`）：超过该天数后**未固定（unpinned）**的任务被自动删除；已固定（pinned）的任务永不自动删除；把它设为 `0` 表示关闭自动清理并保留全部任务历史。[@ref-bob-lt-config-retention-policy]

这条设置带有文档自身写明的版本条件：只有在 Bob Shell 2.0.1 或更高版本把它设为 `0` 才是“关闭清理”，在更早版本设为 `0` 反而可能删除未固定的任务及其历史。[@ref-bob-lt-config-retention-version] 这是本主题里唯一带明确版本边界的结论，其余结论在 `version_applicability: unknown` 下不能绑定版本。

日志是另一条独立的清理路径，不属于会话记录：日志写在 `~/.bob/logs/shell/` 下并自动滚动，最多保留 10 个日志文件、每个上限 5 MB，旧文件被自动清理。[@ref-bob-lt-config-log-rotation][@ref-bob-lt-ts-log-retention-count] 文档没有说明任务记录的保留策略与日志清理之间存在级联，因此清理任务记录会连带删除日志、或清理日志会影响可恢复性，都属于不能推断的结论。

`transcripts.cleanup` 记为 partial 的具体缺口（已查入口：Settings schema 全表、Slash commands 内建命令表、Troubleshoot 排障章节、本轮全部 23 个归档原件）：

- **固定（pin）动作本身没有记录入口。** 文档说明 pinned 任务不会被自动删除，却没有说明在哪里 pin 或取消固定。
- 手动删除记录文件或目录的后果未记录，也没有说明删除前必须先停止哪些写入者。
- 级联删除、孤儿记录、能否重建与如何恢复都没有记录。“文档没有说可以安全删除”不等于“删除是安全的”。

## 日志边界与诊断 {#transcripts-log-boundary}

排查顺序按“记录 → 会话状态 → 日志”分层。

记录定位：`bob --list-tasks` 是唯一的记录清单入口，非 TTY 下切换为 NDJSON 便于脚本处理。[@ref-bob-lt-chat-find-task-id][@ref-bob-lt-run-list-tasks-workspace]

会话状态：交互式内用 `/status`（别名 `/info`）查看会话状态、用量与版本信息；输入框下方的 footer 实时显示会话信息，其中包含模式、上下文窗口占用（token 数与百分比）以及当前任务的累计成本。[@ref-bob-lt-slash-status][@ref-bob-lt-chat-footer-context] 这些是运行状态而非历史记录，不能用来判断某个任务是否已被保留策略删除。

日志：路径为 `~/.bob/logs/shell/`，文件名带时间戳并自动滚动，最多保留 10 个文件、每个上限 5 MB；[@ref-bob-lt-ts-log-files][@ref-bob-lt-config-log-rotation] 提高某个会话的日志详细程度用 `--log-level` 或 `BOB_LOG_LEVEL` 环境变量；[@ref-bob-lt-ts-log-level-env] `/logs` 用系统查看器打开最新的日志文件。[@ref-bob-lt-slash-logs] 排障页给出的定位方式是列出该目录按时间排序的文件。文档把日志定位为调试输出，没有说明日志是否包含完整对话内容，也没有说明能否用日志重建任务记录——**不要**把日志当作会话记录的备份。

`transcripts.diagnostics` 记为 partial：定位与读取记录、检查当前会话状态这三件事有第一方入口；缺口是记录完整性校验（校验和、索引一致性、损坏记录的处理）以及为备份、恢复、清理排错的方法，本轮固定来源都没有记录。

## 未记录的机制 {#transcripts-gaps}

**数据库（unknown）**：本轮在 Configuring 的 Settings schema 全表、Slash commands 内建命令表、Interactive 与 Non-interactive 两页、Troubleshoot 排障章节中核对过全部配置键，没有出现任何指向会话记录的数据库、索引或辅助状态文件的键、表名或路径；本轮归档的 23 个官方文档原件中也没有相应描述。这一项是“没找到证据”，不是“不使用数据库”。

**归档与导出（partial）**：文档没有提供原生归档开关，也没有 export、backup 或复制会话记录的命令。唯一被文档确认的机读提取是 `--list-tasks` 的 NDJSON，[@ref-bob-lt-run-ndjson-switch] 而它只包含第 3 节那五个摘要字段、按当前工作区过滤、[@ref-bob-lt-run-list-tasks-workspace] 因此它不构成完整对话的导出。归档依赖哪些必要文件、恢复后在路径与机器可移植性上的损失、信息完整性会丢失什么，都无法评估——本主题不对“能否安全搬移记录”给出任何倾向。

**云端会话历史**：本轮固定来源没有把任务历史同步到云端的描述。`~/.bob/settings/auth-secrets.json` 属于凭据存储，与会话记录无关，不应混为一谈。若后续来源说明存在云端历史，应显式标注为云端而不是本机记录。