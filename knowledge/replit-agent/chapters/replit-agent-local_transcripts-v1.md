---
schema_version: 3
record_kind: production
edition_id: replit-agent-local_transcripts-v1
harness_id: replit-agent
topic: local_transcripts
title: "Replit Agent 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-source-scope
    surface_ids: [web]
    source_refs: [ref-replit-agent-what, ref-replit-tasks-what, ref-replit-tasks-background, ref-replit-config-cp-what, ref-replit-config-mem-manage, ref-replit-std-memory, ref-replit-index-chat, ref-replit-config-user-settings]
  - section_id: transcripts-record-scope
    surface_ids: [web]
    source_refs: [ref-replit-tasks-what, ref-replit-config-cp-creation, ref-replit-config-mem-manage, ref-replit-std-memory, ref-replit-config-user-settings]
  - section_id: transcripts-storage-layout
    surface_ids: [web]
    source_refs: [ref-replit-config-cp-finding, ref-replit-config-cp-what, ref-replit-tasks-lifecycle-archive, ref-replit-tasks-lifecycle-queued, ref-replit-tasks-what]
  - section_id: transcripts-record-schema
    surface_ids: [web]
    source_refs: [ref-replit-config-cp-creation, ref-replit-config-cp-what, ref-replit-tasks-what]
  - section_id: transcripts-run-lifecycle
    surface_ids: [web]
    source_refs: [ref-replit-tasks-what, ref-replit-tasks-lifecycle-queued, ref-replit-tasks-lifecycle-archive, ref-replit-tasks-background, ref-replit-tasks-availability]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [web]
    source_refs: [ref-replit-tasks-lifecycle-archive, ref-replit-config-cp-what, ref-replit-config-cp-rollback, ref-replit-config-mem-manage, ref-replit-std-memory]
  - section_id: transcripts-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-config-cp-finding, ref-replit-agent-overview-modes, ref-replit-tasks-lifecycle-queued, ref-replit-config-user-notifications, ref-replit-mcp-server-tools]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [web]
        section_id: transcripts-record-scope
        status: partial
        source_refs: [ref-replit-tasks-what, ref-replit-config-cp-creation, ref-replit-config-mem-manage, ref-replit-std-memory]
  - question_id: transcripts.location
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-replit-config-cp-finding, ref-replit-config-cp-what]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-replit-tasks-lifecycle-archive, ref-replit-tasks-lifecycle-queued]
  - question_id: transcripts.format
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-replit-config-cp-what]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [web]
        section_id: transcripts-record-schema
        status: unknown
        source_refs: [ref-replit-config-cp-creation, ref-replit-config-cp-what]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [web]
        section_id: transcripts-run-lifecycle
        status: partial
        source_refs: [ref-replit-tasks-what, ref-replit-tasks-lifecycle-queued, ref-replit-tasks-lifecycle-archive, ref-replit-tasks-background]
  - question_id: transcripts.database
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-replit-config-cp-what]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [web]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-replit-tasks-lifecycle-archive, ref-replit-config-cp-what, ref-replit-config-cp-rollback]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [web]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-replit-tasks-lifecycle-archive, ref-replit-config-mem-manage, ref-replit-std-memory]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [web]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-replit-config-cp-finding, ref-replit-agent-overview-modes, ref-replit-tasks-lifecycle-queued, ref-replit-config-user-notifications]
---

## 固定来源与本主题的适用边界 {#transcripts-source-scope}

Replit Agent 只登记了 `web` 一个界面，形态是浏览器里的 Replit 服务
[@ref-replit-agent-what]。这一点决定了本章的整个结论走向：**Replit Agent 是托管服务，
不是在本机运行的 agent 进程**，因此"本地 transcript"在本产品上首先是一个适用性问题——
读者在自己电脑上找会话记录文件，很可能找错了对象。

本主题的固定来源是 Replit 官方文档站的 markdown 快照，全部 `version_applicability: unknown`，
抓取时间见对应 snapshot 记录。**文档快照不标注 Replit Agent 的产品版本，因此本章任何结论都
不能绑定到某个已安装版本**；界面 `web` 也没有对应的本地发行包。Replit Agent 没有登记
git 仓库来源，本轮全部证据来自官方文档，不含任何第一方源码。

为回答这十个问题，本章显式检查了这些入口：Agent 总览与任务系统
（`core-concepts/agent/task-system.md`）、任务生命周期
（`features/agent/task-lifecycle.md`）、Checkpoints 与回滚
（`features/version-control/checkpoints-and-rollbacks.md`）、Memories
（`chat/memories.md`）与 Standardization（`teams/standardization.md`）、用户设置
（`features/editor/user-settings.md`）、官方文档索引的 Chat 与 Enterprise 两节
[@ref-replit-index-chat][@ref-replit-agent-what][@ref-replit-tasks-what][@ref-replit-tasks-background][@ref-replit-config-cp-what][@ref-replit-config-mem-manage][@ref-replit-std-memory][@ref-replit-config-user-settings]。

### 必须区分的三类东西

读本章前请先分清三类对象，官方文档把它们放在完全不同的层面上：

1. **服务端会话与任务对象**：主线程（main thread）就是那个对话本身，background task
   是独立的另一条线程 [@ref-replit-tasks-what]；它们由 Replit 服务端保存，读者只能通过
   Project Editor 的界面操作。
2. **App 状态快照**：checkpoint 是一份 Replit App 的完整状态快照 [@ref-replit-config-cp-what]，
   记的是代码与应用状态，不是对话内容。
3. **跨会话的偏好摘要**：Memory 是 Replit 保留的"一小段偏好摘要"，跨项目与跨对话复用
   [@ref-replit-std-memory]。

**第 2、3 类都不是会话 transcript。** 后文所有 partial 结论都建立在这个区分上：本主题问的是
会话记录本身，而登记来源描述的是任务状态、App 快照和偏好摘要。

## 记录范围与开关 {#transcripts-record-scope}

**transcripts.scope：partial。** 官方文档说明了 Replit Agent 在服务端保留什么形态的会话内容，
但**没有任何来源描述一份"会话消息与工具事件"的记录**——既没有记录范围的定义，也没有控制是否
记录的开关。

可证实的是记录的两个服务端对象。**主线程是对话本身**：Agent 在主线程里接收描述、调整方向并
决定哪些改动应用到 main version；background task 则是"独立线程，在项目的隔离副本里工作"
[@ref-replit-tasks-what]。**第二个对象是 checkpoint**：Agent 在功能完成、重大里程碑、稳定状态
和错误恢复前自动创建，每条 checkpoint 带 AI 生成的描述、时间戳和变更范围
[@ref-replit-config-cp-creation]——这三项是 App 变更的元数据，不是消息或工具事件。

唯一带开关的保留项是 **Memory**，但它保留的是偏好摘要而不是会话内容：文档说明它让 Replit
"保留一段你的偏好的简短摘要，并在各项目与各对话之间使用" [@ref-replit-std-memory]。它的控制项
是设置页里的 opt in／关闭、是否与协作者共享，以及查看与更新 Memory file
[@ref-replit-config-mem-manage]。

**剩余缺口**：哪些消息、工具调用与事件进入服务端会话对象；是否有开关能让某类内容不落库；
输入历史、调试日志与缓存是否单独记录——登记来源都没有表达。用户设置页列出的类别（主题、代码
智能、编辑器偏好、通知、无障碍、快捷键）也不含任何记录或导出类设置
[@ref-replit-config-user-settings]。

## 存储位置、命名与格式 {#transcripts-storage-layout}

**transcripts.location、transcripts.naming、transcripts.format、transcripts.database：
全部 unknown。** 四个问题的共同答案是：**登记来源没有给出任何本机路径、服务端存储位置、
索引或数据库。**

**transcripts.location。** 没有任何来源提到文件系统路径、数据库文件或索引目录。可观察到的
checkpoint 位置全部是**界面位置而非存储路径**：Project Editor 的 Agent tab、Git pane，以及
Agent chat 里的 history 图标（一条完整时间线）
[@ref-replit-config-cp-finding]。checkpoint 本身被描述为"Replit App 状态的完整快照"
[@ref-replit-config-cp-what]——一个托管对象，不是本机文件。路径怎样随操作系统、环境变量、
宿主配置或项目作用域变化，在这里无从谈起，因为没有路径可随这些因素变化。

**transcripts.naming。** 没有文件名、目录名、会话 ID、时间戳编码或项目路径编码规则的记载。
任务生命周期里出现的 **Draft、Active、Queued、Ready、Done** 是看板上的**状态列**，不是文件名：
Archived 任务"被搁置，其 plan 被保留"，可以打开卡片恢复回 Drafts
[@ref-replit-tasks-lifecycle-archive]；Queued 表示"已批准但等待开始"
[@ref-replit-tasks-lifecycle-queued]。父／子会话与分支的关联关系也没有对应表述——只有
主线程与 background task 的二分，以及多个任务并行时"Agent 自动处理冲突合并"
[@ref-replit-tasks-what]。

**transcripts.format。** 没有 JSON、JSONL、数据库或二进制格式的记载，也没有编码、追加／覆盖、
分片与压缩规则。

**transcripts.database。** 没有证据表明使用数据库，也没有"会话文件与数据库／索引分工"的机制
可描述。哪些文件或表是恢复会话所必需的、如何重建，同样无从回答。

**这里必须写清一条边界**：以上四项是"来源未表达"，**不是"Replit Agent 不记录"**。托管服务
当然在服务端保存会话数据，但登记来源没有说明它保存成什么、放在哪、能否导出。也不能据此推断
"没有数据可以删"或"删掉本地任何东西都安全"。

## 记录 schema {#transcripts-record-schema}

**transcripts.schema：unknown。** 登记来源没有给出任何第一方记录类型、字段、必填项、关系或
版本迁移规则，因此本章**不提供**记录示例——在没有字段定义的情况下编造一个 JSON 片段只会
制造误导。

最接近"结构化字段"描述的是 checkpoint 的属性：AI 生成描述、时间戳、变更范围
[@ref-replit-config-cp-creation]，以及它捕获"整个开发上下文"
[@ref-replit-config-cp-what]。这三点描述的是**一次 App 变更的标注**，不是会话记录的类型系统。
任务系统侧能确认的只有线程二分：主线程是对话，background task 是隔离副本里的独立线程
[@ref-replit-tasks-what]。

**仍缺的具体 schema 缺口**（逐项照实列出）：

- 消息记录的类型、字段与必填项；
- 工具调用与工具事件是否入记、如何表示；
- 会话与任务对象之间的外键关系；
- 记录格式的版本与迁移规则；
- 脱敏后的最小完整示例——缺少前四项，无法给出可信示例。

## 记录与服务端对象的生命周期 {#transcripts-run-lifecycle}

**transcripts.lifecycle：partial。** 官方文档完整描述了**任务对象**的服务端生命周期，
但没有描述会话记录的创建、追加、刷盘、关闭与恢复。

可证实的状态流转是：Draft（尚未开始构建的规划会话）→ 规划通过后进入构建阶段（Active、
Queued、Ready）→ 完成后进入 Done。**Queued 的含义是"已批准但等待开始"**，可能因为依赖另一个
任务，或因为已达套餐的活跃 background task 上限；前置任务完成且空出槽位后自动开始
[@ref-replit-tasks-lifecycle-queued]。**Active background task 的并发上限按套餐分层**：Core
1 个、Pro 最多 10 个、Enterprise 最多 64 个，Starter 不支持
[@ref-replit-tasks-availability][@ref-replit-tasks-what]。

与"交给子代理"最接近的机制是 background task：它们在**项目的隔离副本**中运行，主版本保持
不动，直到用户审阅并应用改动，Agent 会自动处理多任务合并时的冲突
[@ref-replit-tasks-background]。但官方文档把它描述为并行执行单位，**不是子代理交接记录**。

任务的终点同样有明确语义：Draft 阶段的规划会话可以被 Archive 搁置且 plan 保留、可逆恢复，
进入构建阶段后则只能 Cancel，丢弃进行中的工作且不可逆
[@ref-replit-tasks-lifecycle-archive]。这是任务状态机的收尾，不是记录文件的关闭或刷盘。

**剩余缺口**：会话记录何时写入与刷盘；关闭浏览器或会话后如何恢复；上下文压缩后如何延续；
记录本身是否存在版本迁移。这些在登记来源里都没有对应表述。

## 归档、回滚、导出与删除 {#transcripts-archive-and-cleanup}

**transcripts.archive、transcripts.cleanup：partial。** 官方提供两个**服务端**操作，都容易被
误认为 transcript 归档，因此需要明确各自的对象与不可逆性。

### Archive／Cancel：作用于任务卡片，不是记录归档

两者都把任务移到 Done 列，但行为不同：**Archive** 只在规划阶段（尚未开始构建的 Draft）
可用，作用是"搁置规划会话而不执行，其 plan 被保留"，**可逆**——打开 Done 列的卡片即可恢复
回 Drafts；**Cancel** 在任务已进入构建阶段（Active、Queued、Ready）后可用，作用是"停止任务并
丢弃进行中的工作"，且**不应用到 main version**，**不可逆**
[@ref-replit-tasks-lifecycle-archive]。

这不是导出或复制：文档没有描述把会话或任务导出为文件的路径。任务本身留在 Done 列
[@ref-replit-tasks-lifecycle-archive]。

### Checkpoint 与 Rollback：作用于 App 状态，不是会话内容

Checkpoint 是 Replit App 状态的完整快照；**Rollback** 可以"单击把 Replit App 恢复到任何先前
的 checkpoint 状态"，其设计目标是安全可预期——部分界面支持回滚前预览，且每个 checkpoint
代表一个逻辑开发里程碑 [@ref-replit-config-cp-what][@ref-replit-config-cp-rollback]。
由于 checkpoint 捕获的是 App 状态而非对话内容，**回滚不会带回会话记录**。

### Memory：唯一带官方保留／关闭控制的对象

Memory 可以关闭、可以选择是否与协作者共享（**默认私有、默认不共享**），并且可以查看与更新
Memory file [@ref-replit-config-mem-manage]；它保留的是偏好摘要而非会话记录
[@ref-replit-std-memory]。

### 删除的边界（重要）

**登记来源没有提供任何删除会话记录的官方机制，也没有任何数据保留期限的表述。** 手动删除的
后果、删除前必须停止哪些写入者、级联删除与孤儿记录的影响，全部无从判断。

**缺少证据不等于可以安全删除。** 本章不构成"可以删除任何本地文件"的依据；同样地，Cancel 会
丢弃进行中的工作并不可逆 [@ref-replit-tasks-lifecycle-archive]，这是有来源的破坏性操作，
不要与"清理本地缓存"混为一谈。

## 定位、完整性与排错 {#transcripts-diagnostics}

**transcripts.diagnostics：partial。** 没有本机会话记录文件可定位，因此不存在"读取记录、
检查完整性"的排查路径。官方提供的观察点全部是界面与服务端状态：

- **checkpoint 时间线**：Project Editor 的 Agent tab（带描述与回滚选项）、Git pane（作为 Git
  commit 呈现）、以及 Agent chat 里 history 图标给出的完整时间线
  [@ref-replit-config-cp-finding]；
- **用量与模式**：Free Mode 的 Core／Pro 额度每五小时重置并有周上限，可查 **Settings → Usage**
  [@ref-replit-agent-overview-modes]；
- **任务卡在哪一列**：若任务未开始，看它是否处于 Queued——依赖未完成或活跃槽位已满都会导致排队
  [@ref-replit-tasks-lifecycle-queued]；
- **通知配置**：Agent 音频与移动推送通知、Production Alerts 邮件分别独立设置
  [@ref-replit-config-user-notifications]。

**读路径不是本机落盘机制。** Replit MCP Server 暴露的 `create_app_from_prompt`、
`search_apps`、`resolve_app_by_name` 等工具操作的是 App（按标题、URL 或更新时间检索），
不是会话记录 [@ref-replit-mcp-server-tools]；MCP 工具的暴露与可见性属于 MCP 主题
（`mcp.capabilities`、`mcp.exposure`）。因此**不能因为存在 API 读取路径，就推断本机存在落盘
机制或保留策略**。

**剩余缺口**：会话记录的完整性检查手段；备份与恢复的官方路径；面向用户的导出格式；清理或
恢复失败时的排错指引。