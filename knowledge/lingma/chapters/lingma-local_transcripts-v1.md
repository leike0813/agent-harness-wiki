---
schema_version: 3
record_kind: production
edition_id: lingma-local_transcripts-v1
harness_id: lingma
topic: local_transcripts
title: "Lingma（Qoder CN）本地 Transcript：会话记录范围、存储形态与清理边界"
sections:
  - section_id: transcripts-sources
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename]
  - section_id: transcripts-scope-and-identity
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-lt-hook-input, ref-lingma-lt-hook-events-ref]
  - section_id: transcripts-storage-layout
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-lt-storage-path, ref-lingma-lt-local-machine-storage, ref-lingma-lt-data-migration]
  - section_id: transcripts-lifecycle
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-lt-session-restore, ref-lingma-lt-compaction-subagent, ref-lingma-lt-compaction-active, ref-lingma-lt-cleanup-command, ref-lingma-lt-session-browse]
  - section_id: transcripts-memory-store
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-lt-memory-tools]
  - section_id: transcripts-cleanup-and-diagnostics
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-lt-cleanup-command, ref-lingma-lt-storage-path, ref-lingma-lt-diagnostics, ref-lingma-lt-hook-logs, ref-lingma-lt-hook-input]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-scope-and-identity
        status: partial
        source_refs: [ref-lingma-lt-hook-input, ref-lingma-lt-hook-events-ref]
  - question_id: transcripts.location
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-lingma-lt-storage-path, ref-lingma-lt-local-machine-storage]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-scope-and-identity
        status: unknown
        source_refs: [ref-lingma-lt-hook-input]
  - question_id: transcripts.format
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-scope-and-identity
        status: partial
        source_refs: [ref-lingma-lt-hook-input]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-scope-and-identity
        status: partial
        source_refs: [ref-lingma-lt-hook-input, ref-lingma-lt-hook-events-ref]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-lingma-lt-session-restore, ref-lingma-lt-compaction-subagent, ref-lingma-lt-compaction-active, ref-lingma-lt-cleanup-command, ref-lingma-lt-session-browse]
  - question_id: transcripts.database
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-lingma-lt-storage-path, ref-lingma-lt-local-machine-storage]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-lingma-lt-data-migration]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-cleanup-and-diagnostics
        status: partial
        source_refs: [ref-lingma-lt-cleanup-command, ref-lingma-lt-storage-path]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: transcripts-cleanup-and-diagnostics
        status: partial
        source_refs: [ref-lingma-lt-diagnostics, ref-lingma-lt-cleanup-command, ref-lingma-lt-hook-logs, ref-lingma-lt-hook-input]
---

## 固定来源与适用边界 {#transcripts-sources}

本章只覆盖 `lingma` 在 `catalog/harnesses.yaml` 中登记的 `jetbrains` 界面（Qoder CN JetBrains 插件）[@ref-lingma-product-rename]。该界面是 IDE 插件形态，会话状态由宿主 IDE 与插件进程共同支配；本章不把结论外推到 Qoder CN IDE、Qoder CN CLI 或已停止支持的 VS Code 插件。

固定来源全部是官方文档快照，`version_applicability` 均为 `unknown`，抓取时间 2026-09-30：

| snapshot_id | 文档 | 用途 |
| --- | --- | --- |
| `snapshot-lingma-docs-hooks` | hooks.md | 会话记录的唯一第一方字段说明 |
| `snapshot-lingma-docs-faq` | faq.md | 本地存储路径与缓存清理 |
| `snapshot-lingma-docs-changelog-jetbrains` | changelogs-jetbrains.md | 会话恢复、压缩、清理入口、数据迁移 |
| `snapshot-lingma-docs-tools` | tools.md | 记忆工具与跨会话记忆 |
| `snapshot-lingma-docs-troubleshooting` | troubleshooting-guide.md | 诊断脚本与运行日志 |

因为这些文档没有标注适用版本，本章的每条结论都只表示「该抓取时点的官方文档如此描述」，不能绑定到任何具体已安装插件版本。要确认某个具体版本的实际行为，需要该版本的运行观察或发行包内文档，本轮不具备。

`lingma` 没有登记 git 仓库来源，因此本章不含任何源码级结论：无法说明插件用什么数据结构写盘、按什么顺序刷盘，也没有 `mappings/` 记录。

## 会话记录的字段面与格式 {#transcripts-scope-and-identity}

官方文档中唯一直接描述本机会话记录内容的入口，是 Hook 脚本的 stdin 输入格式（该格式本身属于 `hooks.input`，本章只取其中与记录存储相关的字段）。文档说明 Hook 脚本通过 stdin 接收 JSON 数据，所有事件都包含以下通用字段 [@ref-lingma-lt-hook-input]：

| 字段 | 说明 |
| --- | --- |
| `session_id` | 当前会话 ID |
| `cwd` | 当前工作目录 |
| `hook_event_name` | 触发的事件名称 |
| `transcript_path` | 会话上下文 JSON 文件路径 |

这组字段给出三条可证实的结论。第一，**会话记录在本机以 JSON 文件形式存在**，且由 `transcript_path` 指向一个具体文件——这是文档对记录格式与位置唯一的直接陈述，也是本章 `transcripts.format` 与 `transcripts.location` 的主要依据。第二，**会话有稳定标识**：`session_id` 被作为通用字段注入每个事件，说明会话身份在插件侧是一个可被外部脚本读取的标识，而不是仅存在于界面状态里。第三，**记录至少包含事件与工具调用内容**：各事件在通用字段之上追加自己的字段，例如 `PreToolUse` 追加 `tool_name`、`tool_input`，`PostToolUse` 追加 `tool_name`、`tool_input`、`tool_response` [@ref-lingma-lt-hook-events-ref]。这说明会话记录承载的是消息与工具事件，而不只是输入历史。

由此可以界定的 `transcripts.scope` 边界：会话记录覆盖用户提示、工具调用的名称与入参、工具返回结果；工具名映射表同时给出原生名与兼容名两套写法（例如 `read_file` / `Read`、`create_file` / `Write`）[@ref-lingma-lt-hook-events-ref]。

`transcripts.naming` 只能给 `unknown`。`session_id` 的存在说明有会话 ID，但已归档文档没有给出它的生成规则、编码方式，也没有给出承载它的 JSON 文件如何命名、放在哪个目录、是否按项目路径分目录、父子会话与分支如何表达。把「有会话 ID」推成「文件名形如「时间戳-UUID.json」」属于无来源推断，本章不写。

`transcripts.schema` 只能给 `partial`。已证实的字段是上面五个通用字段加各事件的追加字段；仍缺的具体 schema 缺口照实列出：记录的文件名与目录结构、记录类型枚举（用户消息 / 助手消息 / 工具调用 / 事件各占什么类型）、每个类型的必填项与字段类型、父子会话或子代理记录之间的关联字段、schema 版本与迁移规则，全部没有第一方来源。`task` 工具在文档中被映射为「启动子任务 / 子代理」[@ref-lingma-lt-hook-events-ref]，说明存在子代理执行，但子代理记录如何与父会话记录关联、是否单独落盘，文档没有说明。

## 存储位置与本机数据布局 {#transcripts-storage-layout}

`transcripts.location` 为 `partial`。已证实的部分是本机数据根目录与它的可配置性：

- 插件的本机数据位于 `.lingma` 目录，Windows 路径为 `C:\用户\[用户名].lingma`，macOS 路径为 `~/.lingma`；同目录下的可执行文件位于 `.lingma/bin/x.x.x/CPU架构_64_系统/` [@ref-lingma-lt-storage-path]。
- 根目录可以改。文档给出的配置项是 `Lingma.LocalMachineStoragePath`，位于编辑器的 `settings.json`；若该路径不存在或不可访问会导致启动失败，处理方式是修正为有效路径或直接删除该配置项 [@ref-lingma-lt-local-machine-storage]。同页另一条排查项说明自定义存储路径包含空格等特殊字符时会导致无法启动或登录 [@ref-lingma-lt-local-machine-storage]。

因此 `transcript_path` 指向的会话记录文件，其位置随该存储路径配置项变化：改动 `Lingma.LocalMachineStoragePath` 会改变本机数据根目录。配置项的加载与优先级规则属于 `config.sources`，本章不重复。更新日志中「修复自定义本地存储路径设置后历史数据丢失的问题」从反面印证了历史数据确实存放在该可配置路径下 [@ref-lingma-lt-data-migration]。

必须说明的缺口：文档没有给出 `transcript_path` 相对于 `.lingma` 根目录的具体子路径，也没有说明它是否随操作系统、宿主 IDE 配置或项目作用域变化。本章不构造形如 `.lingma/sessions/{id}.json` 的路径模板——那是没有来源的猜测。读者要定位实际记录，应按上一节的办法从 Hook 输入里读出 `transcript_path` 的真实值，而不是套用推测路径。

`transcripts.database` 为 `unknown`。已归档文档没有出现任何数据库、会话索引表或辅助状态文件的描述，也没有说明会话文件与数据库怎样分工。本章不因 `.lingma` 下存在 `bin/` 子目录就推断存在数据库存储。要确定是否存在 SQLite 之类的索引，需要源码或运行观察，本轮两者都没有。

`transcripts.archive` 为 `unknown`。文档没有提供会话记录的导出、复制、移动或外部备份入口，也没有归档开关。与归档容易混淆的是账号升级时的数据迁移：升级后「历史会话记录、个性化规则、记忆、技能、智能体、代码索引及插件通用设置等均无损迁移」[@ref-lingma-lt-data-migration]。这条描述的是账号体系升级时数据随账号保留，不是用户可触发的归档或备份动作；把它当作「有归档机制」是误读。恢复后会在路径、可移植性或信息完整性上损失什么，文档没有任何说明，因此不写。

## 会话的生命周期：恢复、压缩与分叉 {#transcripts-lifecycle}

`transcripts.lifecycle` 为 `partial`。文档从用户可观察的行为侧描述了几个阶段，但没有给出落盘时序：

- **恢复**：支持按会话记忆模型选择，恢复历史会话时自动恢复上次使用的模型 [@ref-lingma-lt-session-restore]。这说明历史会话可以被重新打开，且会话关联了模型选择状态。
- **上下文压缩**：3.0.0 支持上下文窗口用量展示以及主动压缩能力 [@ref-lingma-lt-compaction-active]；3.1.1 优化长会话压缩体验，压缩中展示状态，完成后可继续在当前会话中提问 [@ref-lingma-lt-compaction-subagent]。压缩后仍能在**当前会话**继续提问，说明压缩是对已有会话记录的改写而非另起新会话。
- **分叉与子代理**：支持子 Agent 嵌套展示，工具面板新增子任务状态汇总、子工具折叠和任务树展示 [@ref-lingma-lt-cleanup-command]。子代理自身的定义与调度属于 `agents.roles` 与 `plugins.model` 范围，本章不重复。
- **长对话读取**：新增长对话的按需加载，向上滚动即可加载更早的历史消息 [@ref-lingma-lt-cleanup-command]；同一版本另有历史会话浏览稳定性与加载性能优化 [@ref-lingma-lt-cleanup-command]，以及会话标题管理优化（用户手动修改的标题不会被 AI 自动生成的标题覆盖）[@ref-lingma-lt-session-browse]。

仍未说明的：记录何时创建与追加、是否每次交互后刷盘、关闭 IDE 时的收尾行为、分支会话与父会话的记录关系、以及压缩具体改写了记录中的哪些内容。文档只描述界面表现，不描述写入时序，这一层需要源码或运行观察。

## 记忆：与会话记录不同的另一类本机状态 {#transcripts-memory-store}

会话记录之外，插件还有一类跨会话的本机状态：记忆。文档说明在智能体模式下，当用户让 Qoder CN 记住某些内容或需要保存重要上下文时，Qoder CN 会创建或更新记忆，并提供 `update_memory`（创建或更新记忆）与 `search_memory`（检索记忆）两个工具；记忆「存储工程相关的信息、偏好或上下文，Qoder CN 会在多个会话中记住」[@ref-lingma-lt-memory-tools]。

把这一节单列，是因为记忆与会话记录不是同一件事：记忆跨会话存活并可被检索工具读取，会话记录服务于当前会话的上下文。更新日志把「历史会话记录」与「记忆」并列为两类可迁移数据 [@ref-lingma-lt-data-migration]，也支持这一区分。记忆的存储路径、文件格式与清理入口在本轮已归档文档中同样没有说明，本章不补写。

## 清理、删除与排错 {#transcripts-cleanup-and-diagnostics}

`transcripts.cleanup` 为 `partial`。已证实的官方清理入口只有一个：

- 插件菜单 `Tools > Qoder > Qoder Cleanup`，一键清理过时的 Qoder 相关文件 [@ref-lingma-lt-cleanup-command]。

必须写清的边界：文档只说它清理「过时的 Qoder 相关文件」，**没有说明它是否触及会话记录、触及哪些文件、也没有说它是否可撤销**。因此不能据此推断「跑一次 Qoder Cleanup 就能安全清掉历史会话」，也不能反过来说它不会删除会话记录。删除或保留的策略、保留期、级联删除与孤儿记录处理，文档均无描述。

文档中另一处涉及删除的操作是删除整个 `.lingma` 目录，官方给出的前置条件是**先结束 Qoder CN 进程**，删除后重新启动 IDE [@ref-lingma-lt-storage-path]。这是排障步骤，不是会话清理功能，但它给出了本节唯一有来源的「删除前必须停止写入者」依据：`.lingma` 下的数据由仍在运行的插件进程写入。相应地，删除整个目录会一并移除该目录下的全部本机数据；官方把它作为故障恢复手段使用，并在同页说明插件会重新生成 `.lingma` 目录。诊断排错指南同样把「尝试删除 `.lingma` 目录重启 IDE，重新生成 `.lingma` 目录」列为进程存在性异常时的处理方式。

需要强调：「没找到官方删除入口」不等于「可以安全手动删除会话记录文件」。本节不给出手动删除单个记录文件的操作建议。

`transcripts.diagnostics` 为 `partial`。可用的排错入口：

- 官方诊断脚本按操作系统下载运行，自动收集系统环境信息、网络配置、服务状态与相关日志；脚本适用于 Windows、macOS、Linux 三个平台，排查建议依脚本生成的日志文件进行 [@ref-lingma-lt-diagnostics]。
- 定位本机会话记录本身，唯一有来源的办法是通过 Hook 输入读出 `transcript_path` [@ref-lingma-lt-hook-input]，再按实际路径打开该 JSON 文件。
- 检查 Hook 自身的执行记录：详细调用日志在 Qoder CN 运行时日志中查找 `[hook]` 前缀条目 [@ref-lingma-lt-hook-logs]。

完整性检查方面，文档没有提供任何针对会话记录文件的校验手段：没有记录条数、文件大小基线、schema 版本字段或一致性检查入口。诊断脚本的用法与日志分析属 `config.diagnostics` 范围。本章不给出「怎样判断记录是否损坏」的操作步骤——这一项在本轮来源下无法回答。
