---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-local_transcripts-v1
harness_id: sourcecraft-code-assistant
topic: local_transcripts
title: "SourceCraft Code Assistant（VS Code）本地 Transcript：记录范围、辅助 Git 仓库与清理边界"
sections:
  - section_id: transcripts-sources
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-lt-chat-vscode-only, ref-sc-ca-lt-cp-vscode-only, ref-sc-ca-lt-qa-continuous-internet]
  - section_id: transcripts-scope
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-chatui-components, ref-sc-ca-lt-tools-loop, ref-sc-ca-checkpoints-how, ref-sc-ca-lt-cp-exclusions, ref-sc-ca-lt-cp-caignore, ref-sc-ca-lt-ignore-upload, ref-sc-ca-checkpoints-config]
  - section_id: transcripts-storage-layout
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-lt-cp-architecture, ref-sc-ca-lt-cp-exclusions, ref-sc-ca-lt-cp-storage-type, ref-sc-ca-lt-tools-workflow-table, ref-sc-ca-lt-modes-persist, ref-sc-ca-lt-profiles-mode-memory, ref-sc-ca-lt-profiles-secret-storage, ref-sc-ca-checkpoints-how, ref-sc-ca-chatui-components]
  - section_id: transcripts-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-lt-cp-chat-history, ref-sc-ca-checkpoints-how, ref-sc-ca-lt-cp-restoring, ref-sc-ca-lt-cp-restore-options, ref-sc-ca-lt-chat-new-task, ref-sc-ca-checkpoints-parallel, ref-sc-ca-checkpoints-nested, ref-sc-ca-lt-cp-vscode-only]
  - section_id: transcripts-records
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-lt-cp-architecture, ref-sc-ca-lt-cp-restoring, ref-sc-ca-lt-cp-storage-type, ref-sc-ca-checkpoints-how, ref-sc-ca-lt-tools-workflow-table]
  - section_id: transcripts-archive-cleanup
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-lt-cp-restore-options, ref-sc-ca-lt-index-uninstall, ref-sc-ca-lt-cp-architecture, ref-sc-ca-lt-cp-storage-type, ref-sc-ca-checkpoints-nested, ref-sc-ca-lt-cp-exclusions, ref-sc-ca-logs]
  - section_id: transcripts-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-logs, ref-sc-ca-lt-cp-chat-history, ref-sc-ca-lt-cp-restore-options, ref-sc-ca-lt-cp-restoring, ref-sc-ca-checkpoints-nested, ref-sc-ca-checkpoints-config]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-sc-ca-chatui-components, ref-sc-ca-lt-tools-loop, ref-sc-ca-checkpoints-how, ref-sc-ca-lt-cp-exclusions, ref-sc-ca-lt-cp-caignore, ref-sc-ca-checkpoints-config]
  - question_id: transcripts.location
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-sc-ca-lt-cp-architecture, ref-sc-ca-lt-cp-exclusions, ref-sc-ca-lt-profiles-secret-storage]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-sc-ca-lt-cp-storage-type, ref-sc-ca-lt-tools-workflow-table]
  - question_id: transcripts.format
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-sc-ca-checkpoints-how, ref-sc-ca-lt-cp-architecture]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-sc-ca-lt-cp-chat-history, ref-sc-ca-checkpoints-how, ref-sc-ca-lt-cp-restoring, ref-sc-ca-lt-cp-restore-options, ref-sc-ca-lt-chat-new-task, ref-sc-ca-checkpoints-parallel, ref-sc-ca-checkpoints-nested]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-records
        status: unknown
        source_refs: [ref-sc-ca-lt-cp-storage-type, ref-sc-ca-checkpoints-how, ref-sc-ca-lt-tools-workflow-table]
  - question_id: transcripts.database
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-records
        status: unknown
        source_refs: [ref-sc-ca-lt-cp-architecture, ref-sc-ca-lt-cp-restoring]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-archive-cleanup
        status: unknown
        source_refs: [ref-sc-ca-lt-cp-restore-options, ref-sc-ca-logs]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-archive-cleanup
        status: partial
        source_refs: [ref-sc-ca-lt-cp-restore-options, ref-sc-ca-lt-index-uninstall, ref-sc-ca-lt-cp-architecture, ref-sc-ca-lt-cp-storage-type, ref-sc-ca-checkpoints-nested, ref-sc-ca-lt-cp-exclusions]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-sc-ca-logs, ref-sc-ca-lt-cp-chat-history, ref-sc-ca-lt-cp-restore-options, ref-sc-ca-lt-cp-restoring, ref-sc-ca-checkpoints-nested, ref-sc-ca-checkpoints-config]
---

## 固定来源与适用范围 {#transcripts-sources}

本章只用本轮归档的九份 SourceCraft 官方文档页面作为固定来源：checkpoints（抓取于
2026-09-30T17:06:51Z）、chat-interface（17:06:45Z）、how-tools-work（17:06:46Z）、
chat-prompts（17:09:54Z）、api-configuration-profiles（17:06:44Z）、codeassistantignore
（17:06:48Z）、qa（17:07:00Z）、index（17:06:31Z）与 get-logs（17:06:56Z）。九份快照的
`version_applicability` 都是 `unknown`，页面没有标注适用的插件构建号，因此本章是来源级知识，
不能把任何结论绑定到某个已安装版本。该产品在 registry 中没有登记 git 仓库来源，本章也没有源码级
证据。

界面范围：catalog 为本产品登记 `vscode`、`jetbrains`、`cli`、`web`、`zed` 五个界面。本轮固定
来源里的会话页面自述为 Visual Studio Code 页面，JetBrains 的 chat 页面另在别处
[@ref-sc-ca-lt-chat-vscode-only]；checkpoint 页面带"此功能仅在 Visual Studio Code 可用"的说明
[@ref-sc-ca-lt-cp-vscode-only]，而该 JetBrains 页面并不在本轮归档集合内。因此本章只在 `vscode`
界面作答，其余四个界面由查询派生为 `not_investigated`。

还有一条边界要先讲清：官方 FAQ 明确 Code Assistant 不能脱网工作、需要持续联网
[@ref-sc-ca-lt-qa-continuous-internet]。本章讨论的"记录"只指 IDE 侧能被固定来源核实的本机痕迹；
本轮文档没有描述服务端会话历史，本章也不把任何云端行为当作本机记录机制。

## 记录范围与不落盘的内容 {#transcripts-scope}

**transcripts.scope**。可核实的本机记录分两层。

对话层：chat history 展示"你与 Code Assistant 之间的交流历史"，其中包含你的请求、Code Assistant
的回应，以及你采取过的动作，例如编辑文件或运行命令 [@ref-sc-ca-chatui-components]。工具调用本身
也是可核实的记录面：Code Assistant 按"选工具 → 给出工具与参数待批准 → 执行并展示结果 → 循环直到
任务完成"的节奏推进 [@ref-sc-ca-lt-tools-loop]，因此每轮工具提议、批准与结果都落在同一个对话区域里。

文件状态层：checkpoint 用一个与项目主版本控制系统相互独立的辅助 Git 仓库保存项目快照，checkpoint
在任务开始时和每次文件修改前自动创建，运行命令前不自动创建；该仓库以 Git commit 形式记录文件
内容变化、新增、删除、重命名与二进制变更 [@ref-sc-ca-checkpoints-how]。

明确不落盘的内容有一组内建排除规则：构建产物与依赖目录、媒体与二进制文件、缓存与临时文件、含
机密信息的配置文件、大型数据文件，以及数据库文件与日志；这些模式在初始化时被写入辅助仓库的
`.git/info/exclude` [@ref-sc-ca-lt-cp-exclusions]。`.codeassistantignore` 管的是 AI 可访问性而不是
版本跟踪，被它排除但未被 `.gitignore` 排除的文件仍会被 checkpoint 跟踪
[@ref-sc-ca-lt-cp-caignore]——"AI 访问不到"不等于"本地不记录"。

记录开关：本轮来源只给出一个与记录相关的开关，即设置面板里 Checkpoints 的 **Enable automatic
checkpoints** [@ref-sc-ca-checkpoints-config]；没有找到关闭对话历史记录本身的开关。

这一题的剩余缺口：文档没有说明对话内容在本机以什么形式保留，也没有说明服务端是否另存会话历史、
哪些内容会离开本机。可对照的旁证是 `.codeassistantignore` 会被持续监视并自动上传
[@ref-sc-ca-lt-ignore-upload]，但那句话描述的是访问规则的同步，不是对话记录的存放位置。已查入口是
本轮 26 份归档页面全文检索 transcript、history、session、storage、jsonl、sqlite、retention、
delete、export。

## 存储位置、命名与格式 {#transcripts-storage-layout}

**transcripts.location**。本轮来源能确定的本机存储只有一个：checkpoint 的"系统辅助 Git 仓库"，
它是专门为跟踪 checkpoint 而创建的独立仓库，作为 checkpoint 状态的持久存储
[@ref-sc-ca-lt-cp-architecture]。该仓库内部有 `.git/info/exclude` 承载内建排除模式
[@ref-sc-ca-lt-cp-exclusions]，但文档从未给出这个辅助仓库在磁盘上的路径，也没有说明它随操作系统、
宿主配置或工作区路径如何变化；本章因此不给出路径模板。

另有两处同样落盘的状态，需要与记录分开看：模型配置 profile 的 API key 存在 VSCode Secret Storage
中，不以明文暴露 [@ref-sc-ca-lt-profiles-secret-storage]；所选模式跨会话保留
[@ref-sc-ca-lt-modes-persist]，系统还会自动记住每个模式上次使用的 profile
[@ref-sc-ca-lt-profiles-mode-memory]。它们是宿主侧偏好状态而非会话记录，删掉它们不等于删掉记录。

**transcripts.naming**。checkpoint 与任务绑定、是任务专属的 [@ref-sc-ca-lt-cp-storage-type]，但
文档没有给出任务 ID 的形态，也没有给出 checkpoint 目录或提交在磁盘上的命名规则。父子关系只见
一处：工具表里的 `new_task` "以指定的起始模式创建一个新的子任务"
[@ref-sc-ca-lt-tools-workflow-table]。缺口包括任务标识的生成方式、辅助仓库的目录名，以及是否存在
会话分支或分叉——本轮来源都没有给出。

**transcripts.format**。已证实的格式只有一种：辅助仓库里的 Git commit，捕获文件级变化而非对话
事件 [@ref-sc-ca-checkpoints-how]，其使用者是一个负责初始化仓库、创建与保存 checkpoint、计算差异
和恢复状态的 checkpoint 服务 [@ref-sc-ca-lt-cp-architecture]。对话历史在本轮来源里始终是界面区域
[@ref-sc-ca-chatui-components]，没有任何页面给出它的磁盘格式、编码、追加或覆盖语义、分片与压缩规则。

## 会话生命周期与恢复 {#transcripts-lifecycle}

**transcripts.lifecycle**。可核实的生命周期由创建与恢复两类动作界定。

创建：任务开始时创建 Initial Checkpoint，之后在每次文件修改前创建当前 checkpoint，运行命令前不
自动创建 [@ref-sc-ca-checkpoints-how]；这些 checkpoint 直接显示在 chat history 里
[@ref-sc-ca-lt-cp-chat-history]。恢复：Code Assistant 对指定 checkpoint commit 执行 hard reset，
把辅助仓库里的全部文件复制回工作区，并更新内部的 checkpoint 跟踪状态
[@ref-sc-ca-lt-cp-restoring]。恢复粒度由用户选择——**Restore files** 只还原工作区文件、保持对话
历史不变，**Restore Files & Task** 同时删除此后的全部对话消息
[@ref-sc-ca-lt-cp-restore-options]。

新任务与重置：chat 顶栏的 **New Task** 按钮打开一个新的 chat 标签页，用途包括重置会话、开始新任务
或清空当前任务 [@ref-sc-ca-lt-chat-new-task]。checkpoint 页面自述只在 Visual Studio Code 可用
[@ref-sc-ca-lt-cp-vscode-only]，以上结论因此不外推到 JetBrains 界面。

并发与前置条件：一个扩展保证在一次流式操作内不会重复创建 checkpoint，Git 操作没有专门的队列
[@ref-sc-ca-checkpoints-parallel]；工作区存在嵌套 Git 仓库时 checkpoint 会被整体禁用，要启用需删除
或移走嵌套仓库 [@ref-sc-ca-checkpoints-nested]。

缺口：文档没有说明创建时的刷盘时机、关闭时的落盘收尾、IDE 重启后能否重新打开旧 chat 标签页，也
没有上下文压缩或交给子代理后记录如何延续的说法——`new_task` 只说明创建子任务
[@ref-sc-ca-lt-tools-workflow-table]，未描述子任务的记录如何与父任务关联。

## 记录形态与存储依赖 {#transcripts-records}

**transcripts.schema**。官方文档描述了记录"保存什么"，没有公开记录"长什么样"。可核实的只有：
辅助仓库以 Git commit 保存文件级变化 [@ref-sc-ca-checkpoints-how]，checkpoint 与任务绑定
[@ref-sc-ca-lt-cp-storage-type]，以及工作流类工具的名称与职责 [@ref-sc-ca-lt-tools-workflow-table]。
没有任何页面给出记录类型枚举、字段、必填项、关系或版本迁移规则，本章不提供编造的示例。

已查入口同上（本轮 26 份归档页面全文检索）。仍缺的具体 schema 缺口包括：chat 标签页是否对应磁盘
实体、对话事件的字段结构、记录是否引用附件或大对象、以及脱敏后的最小完整示例。

**transcripts.database**。本轮来源没有出现任何数据库、索引或辅助表。可核实的分工是：项目当前状态
在宿主工作区文件里，任务相关的历史文件状态在辅助 Git 仓库 [@ref-sc-ca-lt-cp-architecture]，
"内部 checkpoint 跟踪状态"由 checkpoint 服务在恢复时更新 [@ref-sc-ca-lt-cp-restoring]，其存放位置
未公开。因此以下问题保持未知，且不能读作"不使用数据库"：哪些文件或提交是恢复一个任务所必需的、
能否只凭辅助仓库重建对话历史、删掉其中一部分会发生什么。

## 归档、删除与保留 {#transcripts-archive-cleanup}

**transcripts.archive**。固定来源没有记载任何原生归档开关，也没有对话历史的导出、复制、移动或外部
备份入口。与"把状态带走"最近的两条通道都不是归档：**Restore files** 是同一工作区内切换项目状态、
保留对话历史的对比手段 [@ref-sc-ca-lt-cp-restore-options]；**Export Logs** 导出的是交给支持团队的
IDE 日志归档，而不是对话记录 [@ref-sc-ca-logs]。因此归档依赖哪些必要文件、恢复后在路径与可移植性
上损失什么、控制台导出能否重建记录，本轮都无从证实，不作断言。

**transcripts.cleanup**。本轮来源中唯一明确的会话内容删除是 **Restore Files & Task**：它删除此后
的全部对话消息，需要弹窗确认且不可撤销 [@ref-sc-ca-lt-cp-restore-options]。官方移除入口只有插件
卸载，页面也只给出卸载步骤 [@ref-sc-ca-lt-index-uninstall]，没有说明卸载是否带走对话历史、
checkpoint 或辅助仓库。

保留机制方面，checkpoint 被描述为 checkpoint 状态的持久存储
[@ref-sc-ca-lt-cp-architecture]，且与任务绑定 [@ref-sc-ca-lt-cp-storage-type]，但没有保留期限、没有
自动清理策略，也没有手动删除文件或数据库的操作指引。文档中出现的其它删除动作都指向别处：移走
嵌套 Git 仓库以启用 checkpoint [@ref-sc-ca-checkpoints-nested]，以及 checkpoint 内建排除会跳过
数据库文件与日志这类目标 [@ref-sc-ca-lt-cp-exclusions]。因此以下问题保持未知，也不能当作"可以
安全删除"：手动删除辅助仓库或其中提交的后果、删除前必须先停止哪些写入者、级联删除与孤儿记录如何
处理。

## 定位、完整性与排错 {#transcripts-diagnostics}

**transcripts.diagnostics**。可核实的排错入口有三类。

取日志：Visual Studio Code 中点击插件状态图标并选择 **Export Logs**，会打开一个包含 `logs.zip` 的
资源管理器窗口，把该归档附到支持工单 [@ref-sc-ca-logs]。这是本轮唯一被文档化的"从插件导出本机
数据"动作。

核对与回退：checkpoint 直接显示在 chat history 中 [@ref-sc-ca-lt-cp-chat-history]，可先用 **View
Diff** 比较当前状态与上一个 checkpoint 的差异，再用 **Restore files** 回到该状态而不动对话历史
[@ref-sc-ca-lt-cp-restore-options]；恢复动作实际执行的是 hard reset、文件复制与内部跟踪状态更新
[@ref-sc-ca-lt-cp-restoring]。

先排除前置条件：工作区存在嵌套 Git 仓库时 checkpoint 会被整体禁用，此时看不到 checkpoint 应先按
文档要求移走嵌套仓库 [@ref-sc-ca-checkpoints-nested]；另外确认 Checkpoints 面板中的自动 checkpoint
开关 [@ref-sc-ca-checkpoints-config]。

边界：本轮来源没有提供记录完整性校验工具、检查命令或修复流程，也没有说明辅助仓库损坏时的表现；
由于辅助仓库路径未被文档化，本章不提供"到哪里找记录文件"的定位步骤。