---
schema_version: 3
record_kind: production
edition_id: trae-trae-custom_agents-v1
harness_id: trae
topic: custom_agents
title: "Trae IDE 的自定义智能体与子智能体：入口、格式、委派与覆盖"
sections:
  - section_id: agents-scope
    surface_ids: [trae]
    source_refs: [ref-trae-agents-builtin-list, ref-trae-agent-primary, ref-trae-agents-overview]
  - section_id: agents-entry-format
    surface_ids: [trae]
    source_refs: [ref-trae-agents-create, ref-trae-agents-manual, ref-trae-subagents-types, ref-trae-subagents-enable, ref-trae-subagents-format]
  - section_id: agents-roles-invocation
    surface_ids: [trae]
    source_refs: [ref-trae-agents-use, ref-trae-subagents-invoke, ref-trae-agent-subagents, ref-trae-subagents-override]
  - section_id: agents-overrides-limits
    surface_ids: [trae]
    source_refs: [ref-trae-subagents-models, ref-trae-subagents-tools, ref-trae-agent-edit, ref-trae-subagents-format, ref-trae-agent-subagents]
  - section_id: agents-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-agents-share, ref-trae-agents-import, ref-trae-subagents-debug, ref-trae-subagents-enable]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [trae]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-trae-agents-create, ref-trae-subagents-types, ref-trae-subagents-enable]
  - question_id: agents.format
    answers:
      - surface_ids: [trae]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-trae-subagents-format, ref-trae-agents-manual]
  - question_id: agents.roles
    answers:
      - surface_ids: [trae]
        section_id: agents-scope
        status: answered
        source_refs: [ref-trae-agents-builtin-list, ref-trae-agent-primary]
  - question_id: agents.invocation
    answers:
      - surface_ids: [trae]
        section_id: agents-roles-invocation
        status: answered
        source_refs: [ref-trae-agents-use, ref-trae-subagents-invoke, ref-trae-agent-subagents]
  - question_id: agents.overrides
    answers:
      - surface_ids: [trae]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-trae-subagents-models, ref-trae-subagents-tools, ref-trae-agent-edit]
  - question_id: agents.limits
    answers:
      - surface_ids: [trae]
        section_id: agents-overrides-limits
        status: partial
        source_refs: [ref-trae-subagents-format, ref-trae-agent-subagents]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-trae-subagents-debug, ref-trae-subagents-enable]
---

## 固定来源与智能体分层 {#agents-scope}

本章来源为 `docs.trae.ai` IDE 分册的智能体系列页面快照：`/ide/agent-overview`、`/ide/agent`（创建与管理自定义智能体）、`/ide/built-in-agent`（内置 Agent）、`/ide/subagents`（子智能体）。Trae 闭源、无官方 npm 包，整章为来源级知识。

TraeCode 的智能体分成三层，机制不同：

| 层 | 定义方式 | 说明 |
| :-- | :-- | :-- |
| 内置会话型智能体 `Chat` | 客户端内置 | 回答技术问题与排查 |
| 内置开发型智能体 `Agent` | 客户端内置 | 自动开发主智能体，见下 |
| 自定义智能体 | 设置面板创建，或 Markdown 文件定义 | 可被 `Agent` 当作 subagent 调用 |

内置智能体列表原文只有两个：`Chat` 与 `Agent`；"Agent" 是 TraeCode 内置的自动化开发智能体，能处理需求拆解、方案设计、代码实现、项目重构与问题修复等多步任务，与只回答问题的会话型智能体不同——它先生成可执行的计划再由用户确认后逐步开发。[@ref-trae-agents-builtin-list]

`Agent` 被官方定位为项目开发的**主智能体**：即使没有任何 subagent，它也能独立完成检索、分析、开发与验证；更复杂的任务可以主动调用工具、MCP server 或 subagent。它的主流程是 "analyze requirements > generate the PRD and technical solution > generate code > preview the result"，期间按任务复杂度追加读取文件、确认改动范围、整理 to-do、调用 subagent、检查运行结果、请用户确认关键决策等步骤。[@ref-trae-agent-primary]

智能体的共同能力定义（自主探索代码库、完整工具访问、上下文理解、多步规划）在工作流上表现为从需求分析到交付验收的五段式流程。[@ref-trae-agents-overview]

## 自定义智能体的入口与定义格式 {#agents-entry-format}

自定义智能体有**两套定义入口**，面向不同层次的使用者。

**入口一：设置面板（可视化）。** 在 AI 聊天输入框输入 `@`，点浮层底部的 `Create Agent` 进入 Create Agent 面板；支持"智能生成"与"手动创建"两种方式。两条路径的可配置参数相同：`Avatar`（可选）、`Name`、`Prompt`、`Callable by other agents`（开关 + `English Identifier` 标识符 + `When to Call` 描述）、`Tools`。`Tools` 分两类：MCP servers（可加多个）与内置工具 `Read`/`Edit`/`Terminal`/`Preview`/`Web search`。[@ref-trae-agents-create][@ref-trae-agents-manual]

`Callable by other agents` 打开后该智能体可被其它智能体调用以获得模块化能力，被调用时**拥有独立上下文**；官方写明"Currently, only the built in 'Agent' can call custom agents"。[@ref-trae-agents-manual]

**入口二：Markdown 文件（subagent）。** 子智能体就是"a specialized agent defined through a Markdown file"，由内置 `Agent` 在识别到合适任务时自动调用，并且有独立上下文窗口。[@ref-trae-subagents-types]

文件位置与作用域（原文口径）：[@ref-trae-subagents-types]

| 类型 | 作用域 | 配置文件路径 |
| :-- | :-- | :-- |
| User subagents | 当前设备上的所有项目 | macOS/Linux：`~/.trae-cn/agents/{my_agent}.md`；Windows：`%userprofile%/.trae-cn/agents/{my_agent}.md` |
| Project subagents | 仅当前项目 | `{project_folder}/.trae/agents/{my_agent}.md` |

> 注意：国际站英文页面把用户级路径写成 `~/.trae-cn/agents/`，与同一套文档其它页面统一使用的 `~/.trae/`（hooks、skills、rules、commands、memories）不一致。这里按原文记录；实际生效路径需要以本机安装版本为准，固定来源无法判定哪一个才是客户端真实读取的路径。[@ref-trae-subagents-types]

subagent 文件由 **YAML frontmatter** 加**系统提示词**两部分组成，官方结构如下：[@ref-trae-subagents-format]

```markdown
---
name: {my-agent}
description: {Describe when "Agent" should invoke this Subagent}
model: {modelName}
tools: {toolName}, {toolName}, {toolName}
disallowedTools: {toolName}, {toolName}, {toolName}
mcpServers:
    - {mcpServerName}
    - {mcpServerName}
---

{systemPrompt}
```

字段语义（原文表）：`name` 必填，必须以字母开头、只含字母数字与连字符、以字母或数字结尾、最长 50 字符；`description` 必填，写清 `Agent` 何时该调用它；`model` 可选，**只支持 TraeCode 内置模型**（列表见下节）；`tools` 可选，逗号分隔，不配置时默认加载全部可用工具，设为 `""` 表示禁止使用任何工具；`disallowedTools` 可选，同名冲突时它优先于 `tools`；`mcpServers` 可选，列出允许调用的 MCP server 名，前置条件是这些 server 已在 IDE 中配置并启用。[@ref-trae-subagents-format]

**前置开关**：subagent 机制默认不开，需要在 `Settings > Beta` 的 Subagents 下打开 `Enable Subagents Directory`。[@ref-trae-subagents-enable]

## 角色、调用与同名覆盖 {#agents-roles-invocation}

**显式调用**：在输入框输入 `@` 或点 `@Agent`，从可用智能体列表里选择。[@ref-trae-agents-use]

**自动委派**由 `Agent` 完成，流程是：收到用户消息 → 判定任务类型 → 把用户意图与所有可用 subagent 的 `description` 匹配 → 相关性高则自动委派 → subagent 在自己的上下文窗口内用允许的工具与 MCP server 执行 → 结果返回 `Agent`，由 `Agent` 汇总后呈现给用户。[@ref-trae-subagents-invoke]

`Agent` 默认带一个内置 subagent `Search`，用于检索与查看文件，帮助它快速定位项目结构、相关代码、配置与文档；用户也可以在提示词里点名指定，例如 "Use the security review agent to check the risks in this change"。[@ref-trae-agent-subagents]

**同名覆盖规则**（原文）：[@ref-trae-subagents-override]

- 项目级 subagent 覆盖同名的用户级 subagent；
- 同一层级出现多个同名 subagent 时，**只有第一个被加载的生效，后面的被忽略**。

第二条规则意味着用户级目录内的同名文件之间没有"后写覆盖"语义，也没有版本号或命名空间机制。

## 模型、工具与父级设置的继承覆盖 {#agents-overrides-limits}

**可指定的模型**只有内置模型：`gpt-5.4`、`gpt-5.2`、`Dola-Seed-2.0-Code`、`minimax-m3`、`minimax-m2.7`、`kimi-k2.5`、`deepseek-v3.2`、`gemini-3.1-pro`、`gemini-3-flash-solo`、`gemini_2.5_flash`（表列 10 项）。文档明确 "Custom models are not supported."；未配置 `model` 时，subagent 使用 IDE 聊天输入框里为 `Agent` 选择的模型。[@ref-trae-subagents-models]

**可用工具白名单**同样是固定表：`Bash`、`Edit`、`Glob`、`Grep`、`Read`、`Skill`、`TodoWrite`、`WebFetch`、`WebSearch`、`Write`、`LSP`，以及形如 `mcp__{server_name}__{tool_name}` 的单工具粒度写法（占位符为普通文本，例如 `mcp__github__get_issue`），后者要与 `mcpServers` 字段配合使用。[@ref-trae-subagents-tools]

**内置 `Agent` 自身的工具/子智能体配置**在 `Settings > Agent` 的 Built-In Agents 里，点 `Agent` 最右侧的 View Details 进入配置面板，勾选它能调用的 tools、MCP servers 与 subagents；官方提示"configure only the capabilities required for the current task, to avoid unclear execution flows caused by too many tools"。[@ref-trae-agent-edit]

**缺口（`agents.limits`）**：固定来源没有给出 subagent 的并发数、嵌套深度、递归调用限制或运行时长上限；只有两条间接边界——subagent 拥有独立上下文窗口（因此不污染 `Agent` 的对话历史），以及 Markdown subagent 的 `name` 长度上限 50 字符。自定义智能体的权限/沙箱继承关系也未描述（它继承的是全局权限体系，见配置机制一章）。[@ref-trae-subagents-format][@ref-trae-agent-subagents]

## 管理、诊断与失败定位 {#agents-diagnostics}

**管理与分发**：自定义智能体可以修改配置、通过 TraeCode 分享到 X 或复制链接分发、删除；分享前官方建议清掉提示词和 MCP 配置里的敏感信息。收到别人分享的链接时，点击链接 → 按提示打开 TraeCode → 在弹窗里 `Get Now` → TraeCode 导入该智能体并跳到它的编辑面板。[@ref-trae-agents-share][@ref-trae-agents-import]

**subagent 没被调用时的排查表**（原文要点）：[@ref-trae-subagents-debug]

| 检查项 | 处理 |
| :-- | :-- |
| 功能开关 | `Settings > Beta > Subagents` 的 `Enable Subagents Directory` 是否打开 |
| 文件路径 | 确认用户级/项目级目录是否正确 |
| `name` 合法性 | 以字母开头、只含字母数字与连字符、以字母或数字结尾、≤50 字符 |
| `description` 是否存在 | 缺少 `description` 字段的文件无法被正确解析 |
| frontmatter 格式 | 必须是标准 YAML：以 `---` 起止且不含 BOM |
| description 匹配质量 | 用 `description` 里的关键词试一次，看能否触发 |

同一页还列出"被调用了但行为不对"的检查项：`tools` 给多或给少（按最小权限原则调整）、提示词在任务边界/输出格式/禁止行为上含糊、同名 subagent 覆盖、缺少项目背景与技术栈、`mcpServers` 里的名字与 IDE 中已启用 server 名不一致。[@ref-trae-subagents-debug]

**缺口（`agents.diagnostics`）**：文档没有提供"当前实际加载了哪些 subagent 及其来源文件"的清单或日志入口，也没有解析失败的报错文案；可观察点只有设置面板与是否触发调用。[@ref-trae-subagents-enable]
