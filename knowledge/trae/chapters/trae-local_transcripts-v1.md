---
schema_version: 3
record_kind: production
edition_id: trae-local_transcripts-v1
harness_id: trae
topic: local_transcripts
title: "Trae IDE 本地 Transcript：会话事件记录、已文档化的存储路径与记录机制缺口"
sections:
  - section_id: transcripts-fixed-sources
    surface_ids: [trae]
    source_refs: []
  - section_id: transcripts-session-records
    surface_ids: [trae]
    source_refs:
      [ref-trae-hooks-events, ref-trae-hooks-lifecycle, ref-trae-hook-stdin, ref-trae-hook-sessionstart, ref-trae-hook-userprompt, ref-trae-hook-posttool, ref-trae-hook-stop]
  - section_id: transcripts-storage-layout
    surface_ids: [trae]
    source_refs: [ref-trae-commands-dirs, ref-trae-rules-dirs, ref-trae-mem-types, ref-trae-perm-global-json]
  - section_id: transcripts-archive-cleanup
    surface_ids: [trae]
    source_refs: [ref-trae-hooks-logs]
  - section_id: transcripts-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-mcp-logs-list, ref-trae-mcp-logs-panel, ref-trae-hooks-logs]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [trae]
        section_id: transcripts-session-records
        status: partial
        source_refs: [ref-trae-hooks-events, ref-trae-hook-stdin, ref-trae-hook-posttool]
  - question_id: transcripts.location
    answers:
      - surface_ids: [trae]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: [ref-trae-commands-dirs, ref-trae-mem-types]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [trae]
        section_id: transcripts-session-records
        status: unknown
        source_refs: [ref-trae-hook-stdin]
  - question_id: transcripts.format
    answers:
      - surface_ids: [trae]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: []
  - question_id: transcripts.schema
    answers:
      - surface_ids: [trae]
        section_id: transcripts-session-records
        status: partial
        source_refs:
          [ref-trae-hook-stdin, ref-trae-hook-sessionstart, ref-trae-hook-posttool, ref-trae-hook-stop]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [trae]
        section_id: transcripts-session-records
        status: partial
        source_refs:
          [ref-trae-hooks-events, ref-trae-hooks-lifecycle, ref-trae-hook-sessionstart, ref-trae-hook-stop]
  - question_id: transcripts.database
    answers:
      - surface_ids: [trae]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: []
  - question_id: transcripts.archive
    answers:
      - surface_ids: [trae]
        section_id: transcripts-archive-cleanup
        status: unknown
        source_refs: []
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [trae]
        section_id: transcripts-archive-cleanup
        status: unknown
        source_refs: [ref-trae-hooks-logs]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-trae-mcp-logs-list, ref-trae-mcp-logs-panel, ref-trae-hooks-logs]
---

## 固定来源与版本边界 {#transcripts-fixed-sources}

本章的固定来源只有一类：Trae 官方文档站 `docs.trae.ai` IDE 分册的已登记快照，全部是 `kind: documentation`，抓取时间集中在 2026-09-30。Trae 没有登记 git 仓库来源，因此本章不含源码级结论：会话记录由哪个模块写盘、用什么数据结构、写到哪个目录，都不能从源码树推断。

所有这些文档快照的 `version_applicability` 都是 `kind: unknown`。它们描述的是抓取当时的文档形态，**不构成对任何已安装版本的断言**。要复核本章，请按各条 reference 的 `snapshot_id` 与 `locator.heading` 打开对应文档小节；文档改版后结论需要重新核对，不要把它当成某个 Trae 版本的既定行为。

Trae 在 catalog 中声明了两个界面：`trae`（Trae IDE）与 `cli`。本章只回答 `trae`。已登记来源全部是 IDE 分册文档，没有一条针对 CLI 界面的会话记录证据，因此 CLI 界面的十题不写答案，由查询派生为 `not_investigated`。这不等于 CLI 不记录会话，只是本轮没有可固定的证据。

本轮的一个额外限制需要如实记录：项目根的 `archive/trae/` 在本工作区不存在，因此无法打开归档原件做逐字摘录复核，也无法就本地 transcript 机制检索新的文档小节。本章因此不新建 `archived_document` 记录，只复用已经登记并校验过的快照与引用。缺少原件这一点限制了覆盖面，下文各节的"剩余缺口"有一部分就来自这里。

## 会话事件、记录字段与生命周期 {#transcripts-session-records}

### 会话与事件边界

Trae 的会话模型在文档里以**事件**的形式暴露。第一方 hook 事件共 6 个，覆盖一次会话从建立到单次查询结束的关键节点：[@ref-trae-hooks-events]

| 事件 | 触发时点 |
| :-- | :-- |
| `SessionStart` | 创建会话之后、发起第一次对话之前 |
| `UserPromptSubmit` | 用户提交查询之后、Agent 开始处理之前 |
| `PreToolUse` | Agent 发起工具调用之后、真正执行之前 |
| `PostToolUse` | 工具调用真正执行之后 |
| `Stop` | Agent 完成输出、准备结束本次查询时 |
| `Notification` | 工具执行等待用户确认时，或 Agent 完成任务时 |

事件的处理链是：事件在会话的特定节点触发并满足配置条件后，TraeCode 把该事件的 JSON 上下文交给 hook handler，由 handler 决定附加上下文、拦截请求还是继续执行。[@ref-trae-hooks-lifecycle]

这套事件面能说明**会话内发生了什么**，但文档没有说这些事件是否被记录、以什么形式记录、由哪个开关控制记录。hook 事件是面向扩展的运行期契约，不是磁盘记录的说明。事件字段的完整清单属于 [hooks.input](https://docs.trae.ai/ide/hook-configuration-reference) 主题的证据，本章只把它当作会话事件面的证据引用。

### 会话事件载荷的字段

每个事件的 stdin JSON 都带一组公共字段，其中 `session_id` 是当前会话的标识：[@ref-trae-hook-stdin]

```JSON
{
  "session_id": "string",
  "cwd": "/path/to/workspace",
  "hook_event_name": "PreToolUse",
  "workspace_roots": ["/path/to/workspace"]
}
```

| 字段 | 类型 | 含义 |
| :-- | :-- | :-- |
| `session_id` | string | 当前会话 ID |
| `cwd` | string | 当前 hook 命令的实际工作目录 |
| `hook_event_name` | string | 当前事件名 |
| `workspace_roots` | string[] | 多工作区时给出全部工作区根目录 |

各事件在此之上追加自己的字段。`SessionStart` 只有 `source`，取值目前只有 `startup`，即新建会话：[@ref-trae-hook-sessionstart]

```JSON
{
  "session_id": "...",
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```

`UserPromptSubmit` 追加 `prompt`，即用户提交的原始文本：[@ref-trae-hook-userprompt]

```JSON
{
  "session_id": "...",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "User prompt"
}
```

`PostToolUse` 追加工具调用的标识、名称与完整输入输出，这是文档里最接近"一次工具调用记录"的结构：[@ref-trae-hook-posttool]

```JSON
{
  "session_id": "...",
  "hook_event_name": "PostToolUse",
  "tool_use_id": "toolcall-id-string",
  "tool_name": "RunCommand",
  "llm_tool_name": "RunCommand",
  "tool_input": { ... },
  "tool_response": { ... }
}
```

`Stop` 追加循环控制与最后一条助手消息：[@ref-trae-hook-stop]

```JSON
{
  "session_id": "...",
  "hook_event_name": "Stop",
  "stop_hook_active": false,
  "loop_count": 0,
  "last_assistant_message": "The final text output by the large language model"
}
```

这套字段是**第一方事件载荷的 schema**，有字段名、类型和脱敏的最小示例。它不等于落盘记录的 schema：文档从未说明磁盘记录与这份事件载荷是否同构、是否同一份数据、还是两份完全不同的东西。因此 schema 题只能记为部分已知。

`tool_input` 与 `tool_response` 在文档里始终是省略号占位，没有给出结构；`last_assistant_message` 只声明为大模型的最终文本输出。消息体、工具参数与工具输出的内部字段类型，属于本主题的明确缺口。

### 会话生命周期

从事件时点可以读出会话与单次查询的生命周期边界：会话创建后触发 `SessionStart`，用户每次提交查询触发 `UserPromptSubmit`，工具调用前后各有一个事件，单次查询以 `Stop` 收尾。`loop_count` 与 `stop_hook_active` 说明一次查询可以被拦下后继续循环，而不是必然结束。[@ref-trae-hook-stop] [@ref-trae-hooks-events]

记录层面的生命周期——何时创建文件、何时追加、何时刷盘、关闭时做什么、能否恢复、分支与子代理如何表达、上下文压缩后如何延续——文档没有任何描述。`SessionStart` 的 `source` 目前只有 `startup` 一个取值，也没有说明会话能否跨进程重启延续。

### 已查入口与剩余缺口

已查入口：hook 事件总览与生命周期两节、hook 配置参考里 `SessionStart`、`UserPromptSubmit`、`PostToolUse`、`Stop` 与公共 stdin 字段各节。这几节是官方文档中唯一直接描述会话标识、消息文本与工具调用输入输出的地方。

剩余缺口：会话/对话记录的文件或数据库路径、命名与编码、写入格式、追加与刷盘规则、恢复与分支机制、上下文压缩后的延续方式，以及 `session_id` 的生成规则与稳定性。这些在已登记的 24 条 IDE 文档来源中都没有出现。

## 已文档化的存储路径与记录形态缺口 {#transcripts-storage-layout}

官方文档给出了若干明确的用户级与项目级路径，可以据此判断文档覆盖了 `~/.trae/` 下的哪些子树。斜杠命令分两级：项目级是项目路径下的 `.trae/commands`，全局是 macOS/Linux 的 `~/.trae/commands` 与 Windows 的 `%userprofile%/.trae/commands`。[@ref-trae-commands-dirs]

规则文件同样两级：全局规则在 macOS/Linux 的 `~/.trae/user_rules`、Windows 的 `%userprofile%/.trae/user_rules`，项目规则在项目路径的 `.trae/rules/`。[@ref-trae-rules-dirs]

记忆文件也给出完整路径，并且区分了两种作用域：[@ref-trae-mem-types]

| 记忆类型 | 作用域 | 存储位置 |
| :-- | :-- | :-- |
| 全局记忆 | 当前用户的全部本地项目 | macOS & Linux：`~/.trae/memory/user_profile.md`；Windows：`%userprofile%/.trae/memory/user_profile.md` |
| 项目记忆 | 仅当前用户的当前本地项目 | macOS & Linux：`~/.trae/memory/projects/{project_path}/project_memory.md`；Windows：`%userprofile%/.trae/memory/projects/{project_path}/project_memory.md` |

权限配置是单个文件：`~/.trae/permission/global.json`，管理资源授权、规则与自定义权限模式；文档还特别说明远程 SSH 或 WSL 场景下每台设备需要单独配置，本地配置不能复用。[@ref-trae-perm-global-json]

把这些路径列出来不是为了推断 transcript 的位置，而是为了说明**文档化的 `~/.trae/` 子树里没有会话记录这一项**。已文档化的用户级子树是 `commands`、`user_rules`、`memory/`、`permission/`，项目级是 `.trae/commands` 与 `.trae/rules/`。会话记录不在其中，也没有出现别的候选路径。这不能证明 Trae 不在本地保存会话，只说明官方文档没有公布它的位置。

由此得到的结论按题面口径记录，而不是当成"不支持"：

- 记录位置（`transcripts.location`）：未知。没有任何文档给出记录文件、数据库、索引或必要附件的路径。
- 记录格式（`transcripts.format`）：未知。文档没有说记录是 JSON、JSONL、数据库还是二进制，也没有编码、追加/覆盖、分片与压缩规则。上面那些路径指向的是配置与记忆文件，其格式说明不适用于会话记录。
- 数据库（`transcripts.database`）：未知。没有文档说明 Trae 是否用数据库保存会话，以及会话文件与数据库、索引、辅助状态如何分工。`~/.trae/` 下这些已知路径全是可读文本文件或目录，没有出现数据库文件。
- 命名（`transcripts.naming`）：未知。`session_id` 只作为事件载荷里的一个字符串字段出现，文档没有给出它的生成规则、长度、时间戳成分，也没有给出目录名、文件名或项目路径的编码方式，更没有父子会话与分支的表达方式。

### 已查入口与剩余缺口

已查入口：斜杠命令目录、规则目录、记忆类型、自定义权限模式与全局配置四节——它们是已登记来源中唯一定义 `~/.trae/` 与 `.trae/` 具体路径的地方。

剩余缺口：记录文件与数据库路径、命名与编码、格式与写入规则、索引与附件。其中"路径怎样随操作系统变化"有一半答案可从相邻文档借用——用户级路径在 macOS/Linux 用 `~/`、Windows 用 `%userprofile%/`，项目级路径在项目目录下——但这只是配置文件的既有惯例，不能当作会话记录的路径规律。

## 归档与清理 {#transcripts-archive-cleanup}

文档里没有会话记录的归档开关，也没有导出、复制、移动或外部备份的说明。已登记来源中没有一节描述如何把一段对话导出成文件或迁移到另一台机器。因此归档题记为未知，而不是"不支持"。

清理与保留方面，文档中唯一与本地记录保留期相关的陈述出现在 hook 日志上：可以在 `Settings > Hooks` 的 Execution Mode 区域点击 View Logs 查看完整的 hook 执行日志，TraeCode 会打开 Output 面板显示 "Agent Hooks" 日志；文档注明**退出 TraeCode 后，当前周期的 hook 执行日志会被清除**。[@ref-trae-hooks-logs]

这条陈述的范围必须说清楚：它讲的是 hook 执行日志，是 hook 自身脚本的运行输出，不是会话记录，也不覆盖对话历史、消息体或工具调用记录。它能说明 Trae 至少有一部分本地日志是运行期存在、退出即清，而不是长期落盘；它不能推及会话记录。

因此清理题同样记为未知：官方是否提供删除或保留会话记录的机制、手动删除文件或数据库的后果、删除前要停止哪些写入者、级联删除与孤儿记录如何处理，文档都没有描述。特别提醒，**没有证据不等于可以安全删除**——在不知道记录位置与写入者的情况下删除 `~/.trae/` 下的内容有破坏会话、记忆、规则与权限配置的风险。

### 已查入口与剩余缺口

已查入口：hook 日志查看一节（唯一的保留期陈述），以及本主题其它各节所列的全部存储路径小节。

剩余缺口：原生归档开关、导出与备份路径、归档依赖哪些必要文件、恢复后的路径与信息损失、官方删除机制、手动删除的后果与写入者停止顺序。

## 定位、读取与排错入口 {#transcripts-diagnostics}

文档记录了两个可操作的诊断入口，都在 IDE 界面内，都针对日志而非会话记录。

MCP 服务器日志有两个入口。一是从服务器列表进入：定位到目标 MCP Server，点击右侧齿轮图标并选择 Logs，TraeCode 打开 Output 面板显示相关日志；服务器报错时，也可以悬停该服务器后点击错误信息面板里的 Logs。[@ref-trae-mcp-logs-list] 二是从 Output 面板进入：macOS 用 `Command + Shift + U`、Windows 用 `Ctrl + Shift + U` 打开 Output 面板，在右上角下拉菜单里选择 MCP Server Host。[@ref-trae-mcp-logs-panel]

hook 执行日志从 `Settings > Hooks` 进入，Execution Mode 区域的 View Logs 按钮会打开 Output 面板显示 "Agent Hooks"。[@ref-trae-hooks-logs]

这些入口的共同点决定了它们对本主题的价值：**它们是运行期面板视图，不是可归档、可复制、可校验的记录文件**。Output 面板里的内容不能用来做备份、恢复或迁移，会话记录的定位、完整性检查与状态判断在文档里没有对应入口。日志面板的用法属于 [mcp.diagnostics](https://docs.trae.ai/ide/check-mcp-server-logs) 与 [hooks.diagnostics](https://docs.trae.ai/ide/automate-actions-with-hooks) 主题，本章引用它们只是为了标出"文档化诊断入口"与"会话记录排错入口"之间的差距。

### 已查入口与剩余缺口

已查入口：MCP 服务器日志的两个入口、hook 日志查看一节。

剩余缺口：会话记录的定位方式、读取方式、完整性或状态检查手段，以及为备份、恢复、清理排错可用的官方入口。读者若要在这台机器上排查，只能自行在 `~/.trae/` 下观察，而文档没有为这种观察提供任何可依赖的约定。