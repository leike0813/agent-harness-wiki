---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-custom_agents-v1
harness_id: qoder
topic: custom_agents
title: "Qoder IDE 的自定义 Agent 与子代理机制"
sections:
  - section_id: agents-overview
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-overview-workspaces, ref-qoder-ide-chat-modes, ref-qoder-ide-ask-mode, ref-qoder-ide-quest-experts-workflow, ref-qoder-ide-quest-howto, ref-qoder-ide-agent-mode-planning, ref-qoder-ide-agent-mode-commands, ref-qoder-ide-agent-mode-mcp, ref-qoder-ide-tools-search, ref-qoder-ide-tools-edit, ref-qoder-ide-tools-problems]
  - section_id: agents-definition
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-agents-create, ref-qoder-ide-agents-manual, ref-qoder-ide-agents-tools, ref-qoder-ide-agents-mcp, ref-qoder-ide-skills-overview]
  - section_id: agents-invocation
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-agents-invoke, ref-qoder-ide-quest-experts-custom]
  - section_id: agents-customization
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-agents-model, ref-qoder-ide-agents-tools, ref-qoder-ide-agents-mcp, ref-qoder-ide-agents-manual, ref-qoder-ide-quest-experts-custom]
  - section_id: agents-limits
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-quest-experts-list, ref-qoder-ide-quest-agent-best, ref-qoder-ide-quest-agent-revert]
  - section_id: agents-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-agents-invoke, ref-qoder-ide-quest-experts-list, ref-qoder-ide-quest-experts-custom, ref-qoder-ide-plugins-manage, ref-qoder-ide-plugins-association]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [qoder]
        section_id: agents-definition
        status: answered
        source_refs: [ref-qoder-ide-agents-manual, ref-qoder-ide-agents-create]
  - question_id: agents.format
    answers:
      - surface_ids: [qoder]
        section_id: agents-definition
        status: answered
        source_refs: [ref-qoder-ide-agents-manual, ref-qoder-ide-agents-tools]
  - question_id: agents.roles
    answers:
      - surface_ids: [qoder]
        section_id: agents-overview
        status: answered
        source_refs: [ref-qoder-ide-overview-workspaces, ref-qoder-ide-chat-modes, ref-qoder-ide-ask-mode, ref-qoder-ide-quest-experts-workflow]
  - question_id: agents.invocation
    answers:
      - surface_ids: [qoder]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-qoder-ide-agents-invoke, ref-qoder-ide-quest-experts-custom]
  - question_id: agents.overrides
    answers:
      - surface_ids: [qoder]
        section_id: agents-customization
        status: answered
        source_refs: [ref-qoder-ide-agents-model, ref-qoder-ide-agents-tools, ref-qoder-ide-agents-mcp, ref-qoder-ide-quest-experts-custom]
  - question_id: agents.limits
    answers:
      - surface_ids: [qoder]
        section_id: agents-limits
        status: partial
        source_refs: [ref-qoder-ide-quest-experts-list, ref-qoder-ide-quest-agent-best, ref-qoder-ide-quest-agent-revert]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-qoder-ide-agents-invoke, ref-qoder-ide-quest-experts-list, ref-qoder-ide-plugins-manage]
---

## 固定来源与角色划分 {#agents-overview}

本章按 Qoder IDE（catalog 的 `qoder` 界面）采写，固定来源为官方文档站的 IDE 页面快照：IDE 总览、Chat 总览、Ask/Agent 模式页、Quest 总览与 Experts 模式页、Custom Agent 页。Qoder 是闭源产品，没有官方源码仓库可固定 commit，因此本章是来源级知识，不绑定具体发行版本。所有来源都取自 `docs.qoder.com`（`qoder.com` 指向的官方文档站）；`docs.qoder.cn` 是另一条国内产品线（通义灵码 / Lingma）的文档，本章不引用。

Qoder IDE 有两个工作区：**Editor** 把 NEXT、Inline Chat 与 Chat 面板放在代码旁，用于"边写边改"；**Quest** 是自主委派的独立窗口，承接长链路、多步骤任务，带任务板、进度跟踪与产物审阅。两者可以随时切换。[@ref-qoder-ide-overview-workspaces]

Chat 面板里有两种模式：**Ask** 是基于只读理解的问答，不会像 Agent 那样自主改写整个工作区；**Agent** 具备自主决策、环境感知与工具使用能力，可端到端完成编码任务。[@ref-qoder-ide-chat-modes][@ref-qoder-ide-ask-mode]

Quest 内置两种子模式：**Agent 模式**（单个 agent 端到端交付）与 **Experts 模式**（多个 agent 并行协作，适合全栈开发、技术调研与复杂调试）。[@ref-qoder-ide-quest-howto]

Experts 模式由 **Lead Agent** 担任"大脑"：理解目标、拆解任务、全局协调、保证质量，并按需拉入不同领域的专家并行协作，官方列出的内置角色为 Researcher、Full-Stack Engineer、QA、Code Reviewer、UI Operator、Debug Engineer。Lead Agent 会按任务需要动态调度专家子代理；专家之间互不阻塞、并行执行，Lead Agent 实时对齐与整合结果。[@ref-qoder-ide-quest-experts-workflow]

主代理（Editor 的 Agent 模式）自身具备的能力边界：能自主识别意图并为复杂任务生成计划、经用户确认后按计划执行；能自主选择并在终端运行命令（默认需要确认，可在 Qoder IDE Settings 的 Chat 页配置自动执行的允许列表）；使用内置工具完成**检索**（代码库、文件、代码片段、目录、网页与网页内容）、**编辑**（修改与查看文件）、**执行命令**与读取**问题**；并能自动发现与使用 MCP 工具。[@ref-qoder-ide-agent-mode-planning][@ref-qoder-ide-agent-mode-commands][@ref-qoder-ide-agent-mode-mcp][@ref-qoder-ide-tools-search][@ref-qoder-ide-tools-edit][@ref-qoder-ide-tools-problems]

## 自定义 Agent 的定义位置与字段 {#agents-definition}

Qoder IDE 的自定义 Agent 是"处理特定任务的 AI Agent"，每个 agent 有独立的上下文窗口、工具权限与系统提示词；官方明确当前对自定义 agent 的调度方式是 **subagent 机制**。[@ref-qoder-ide-agents-manual]

两个创建入口：内置技能 `/create-agent` 交互式生成（官方推荐，理由是保证格式与必需字段正确）；或手工在下列位置创建 `.md` 文件。[@ref-qoder-ide-agents-create][@ref-qoder-ide-agents-manual]

| 作用域 | 路径 | 可用范围 |
| :-- | :-- | :-- |
| 用户级 | `~/.qoder/agents/{agentName}.md` | 所有项目 |
| 项目级 | 项目根目录 `/.qoder/agents/{agentName}.md` | 仅当前项目 |

文件由 frontmatter 与随后的系统提示词正文组成。官方示例（原样抄录）：[@ref-qoder-ide-agents-manual]

```markdown
---
name: code-review
description: Code review expert, checks code quality and security
tools: Read, Grep, Glob, Bash
model: "[ModelName](modelId)"
skills:
 - {skillName1}
 - {skillName2}
mcpServers:
 - {mcpServerName1}
 - {mcpServerName2}
---

You are a senior code reviewer responsible for ensuring code quality.

Review checklist:
1. Code readability
2. Naming conventions
3. Error handling
4. Security checks
5. Test coverage
```

字段表原文：[@ref-qoder-ide-agents-manual]

| 字段 | 必需 | 说明 |
| :-- | :--: | :-- |
| `name` | 是 | Custom Agent 的唯一标识 |
| `description` | 是 | 功能与专长简介，用于自动选择 |
| `model` | 否 | 指定使用的模型；不设置则跟随会话中的模型选择 |
| `tools` | 否 | 允许的工具列表，逗号分隔 |
| `skills` | 否 | 允许的技能列表 |
| `mcpServers` | 否 | 允许的 MCP server 列表 |

`tools` 可用的官方工具清单：`Bash`（执行 shell 命令）、`Edit`（定点编辑文件）、`Write`（创建或覆盖文件）、`Glob`（按模式找文件）、`Grep`（搜索文件内容）、`Read`（读取文件）、`WebFetch`（抓取 URL 内容）、`WebSearch`（带域名过滤的网页搜索）。[@ref-qoder-ide-agents-tools]

`mcpServers` 字段把 MCP server 关联给该 agent，使其能调用外部工具与服务；`skills` 字段把技能限定给该 agent。[@ref-qoder-ide-agents-mcp][@ref-qoder-ide-agents-manual]

**边界**：固定来源只记录了上述 frontmatter 字段与 `.md` 位置，没有记录字段的继承语义、资源目录（例如 agent 自带的文件）、加载顺序或校验规则；`/create-subagent` 是内置技能入口之一，与 `/create-agent` 并存。[@ref-qoder-ide-skills-overview]

## 调用方式 {#agents-invocation}

两条路径，与 Skill 的调用模型一致：[@ref-qoder-ide-agents-invoke]

- **自动触发**：在 Chat 面板用自然语言描述任务，模型按 `description` 识别意图并选择合适的自定义 agent。官方例子是"Help me review the implementation of this interface"自动选中 `code-review`。
- **手动触发**：用 `/agent-name` 直接调用，例如 `/code-review`。

在 Experts 模式下，自定义子代理可供 Lead Agent 按需调用，Agent 模式与 Experts 模式共用这份定义；内置专家与自定义子代理的差别只在来源。[@ref-qoder-ide-quest-experts-custom]

## 模型、工具、技能与 MCP 的逐 Agent 覆盖 {#agents-customization}

- **模型**：frontmatter 的 `model` 字段按 agent 指定模型；未设置时跟随会话的模型选择。另有一条图形入口：在 Quest 视图进入 **Setting → Agents**，选中目标 agent 后点 **Change Model**，为每个角色分配最合适的模型。[@ref-qoder-ide-agents-model]
- **工具**：`tools` 字段列出允许的工具，按名逗号分隔；官方工具清单见上节。[@ref-qoder-ide-agents-tools]
- **技能**：`skills` 字段把技能限定给该 agent；`mcpServers` 字段把 MCP server 关联给该 agent。[@ref-qoder-ide-agents-mcp][@ref-qoder-ide-agents-manual]
- **内置专家**：Experts 模式允许个性化内置专家——为单个专家覆盖模型（内置专家默认跟随 Experts 聊天里的用户模型选择）、追加 **Additional Prompt**（上限 10,000 字符）以及添加 Skills 与 MCP server。官方明确 **Lead Agent 不支持定制**。[@ref-qoder-ide-quest-experts-custom]

**缺口**：固定来源没有说明子代理是否继承主代理的权限、沙箱、信任状态或 MCP 连接，也没有说明 `tools` 为空时的默认集合，因此"继承与覆盖"只在上表列出的字段范围内成立。[@ref-qoder-ide-agents-manual]

## 并发、递归与时长边界 {#agents-limits}

- Experts 模式的任务在对话底部以实时任务列表呈现，状态为 **Pending / In Progress / Completed**；点击任一任务可查看执行进度、过程与结果。专家之间不像队列那样串行，官方描述为"专家互不阻塞、并行执行"。[@ref-qoder-ide-quest-experts-list]
- 需要人工介入的情况被官方限定为少数：命中终端黑名单或被判定为高风险的操作、**工具调用次数达到上限**、以及其他需要人工处理的异常。除此之外 Lead Agent 自主调度与执行。[@ref-qoder-ide-quest-experts-list]
- Agent 模式支持"无限次迭代"（官方表述为 Agent supports unlimited iterations，可持续多轮加需求）；Experts 模式**不支持 Revert**（回滚），Agent 模式在 Quest 里可用 Revert 把工作区恢复到该轮操作之前。[@ref-qoder-ide-quest-agent-best][@ref-qoder-ide-quest-agent-revert]
- 简化建议：官方建议把复杂任务用自然语言拆成多轮迭代，先要 MVP 再逐步加要求，而不是期望一次交付完整系统。[@ref-qoder-ide-quest-agent-best]

**缺口**：固定来源没有给出并发子代理数量、递归深度（子代理能否再派子代理）、单任务持续时间或上下文上限的具体数值，只有"工具调用次数达到上限会要求人工介入"这一条可观察信号。[@ref-qoder-ide-quest-experts-list]

## 诊断 {#agents-diagnostics}

- 确认定义被发现：在 Chat 描述任务看模型是否自动选中目标 agent，或用 `/agent-name` 手动触发；两者都不成功时应回到 frontmatter 的 `name`/`description` 检查。[@ref-qoder-ide-agents-invoke]
- 配置入口：Quest 的 **Setting → Agents** 可选中目标 agent 并改模型；Experts 模式的 **4. Customize the Expert Team** 面板可对内建专家做模型、附加提示词与 Skills/MCP 调整。[@ref-qoder-ide-quest-experts-custom]
- 运行状态：Experts 模式的任务列表与任务卡片显示每个专家的 Pending / In Progress / Completed 状态，点击可看过程与结果；这是 IDE 侧唯一被记录的"委派是否成功"的可观察入口。[@ref-qoder-ide-quest-experts-list]
- 插件携带的 Agent 在 Plugins 面板下管理：属于插件的组件标注 **From Plugin**，不能单独禁用、删除或修改，只能通过父插件管理。[@ref-qoder-ide-plugins-manage][@ref-qoder-ide-plugins-association]

**缺口**：固定来源没有提供 agent 加载日志、权限失败提示或"为何未选中该 agent"的诊断输出；受限于此，本项按部分回答。[@ref-qoder-ide-agents-invoke]
