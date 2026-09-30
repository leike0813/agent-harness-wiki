---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-custom_agents-v1
harness_id: lingma
topic: custom_agents
title: "Lingma（Qoder CN）JetBrains 插件的自定义智能体：定义、调度与边界"
sections:
  - section_id: agents-scope
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename, ref-lingma-changelog-custom-agents, ref-lingma-install-jetbrains]
  - section_id: agents-entry-format
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-agents-create, ref-lingma-agents-tools]
  - section_id: agents-roles-invocation
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-agents-create, ref-lingma-agents-usage, ref-lingma-changelog-custom-agents, ref-lingma-agentmode-plan]
  - section_id: agents-limits-diagnostics
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-agents-create, ref-lingma-agents-tools, ref-lingma-agents-usage, ref-lingma-agentmode-tools]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-lingma-agents-create]
  - question_id: agents.format
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-entry-format
        status: answered
        source_refs: [ref-lingma-agents-create, ref-lingma-agents-tools]
  - question_id: agents.roles
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-roles-invocation
        status: partial
        source_refs: [ref-lingma-agents-create, ref-lingma-changelog-custom-agents]
  - question_id: agents.invocation
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-roles-invocation
        status: answered
        source_refs: [ref-lingma-agents-usage]
  - question_id: agents.overrides
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-entry-format
        status: partial
        source_refs: [ref-lingma-agents-tools]
  - question_id: agents.limits
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-limits-diagnostics
        status: unknown
        source_refs: []
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: agents-limits-diagnostics
        status: partial
        source_refs: [ref-lingma-agents-usage]
---

## 固定来源与界面 {#agents-scope}

本章依据官方文档站点 docs.qoder.cn 的 Qoder CN 用户指南，界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`）。产品自 2026-05-20 起由通义灵码更名为 Qoder CN 系列，JetBrains 插件继续提供，相关进程与目录仍为 `.lingma` / `Lingma.exe`。[@ref-lingma-product-rename]

JetBrains 插件自 2026-08-14 版本起“支持自定义智能体管理，可在插件中创建、配置和调用自定义智能体”，并内置桌面操控（Computer Use）与计划模式（Plan Mode）两个智能体，可在设置中配置运行策略 [@ref-lingma-changelog-custom-agents]。插件兼容 JetBrains IDEs 2020.3 及以上 [@ref-lingma-install-jetbrains]。

自定义智能体（Custom Agent）是专门处理特定任务的子代理，每个智能体拥有独立的上下文窗口、工具权限和系统提示词；文档明确“自定义智能体的调度方式是通过 subagent 的方式进行管理” [@ref-lingma-agents-create]。

## 定义位置与格式 {#agents-entry-format}

**位置**（文档给出固定路径）[@ref-lingma-agents-create]：

| 位置 | 路径 | 作用域 |
| :-- | :-- | :-- |
| 用户级 | `~/.lingma/agents/{agentName}.md` | 所有项目 |
| 项目级 | `${project}/.lingma/agents/{agentName}.md` | 仅当前项目 |

**创建方式** [@ref-lingma-agents-create]：

- 方式 1（推荐）：内置 `create-agent` 技能以交互式引导创建，调用形式为 `/create-agent` 加诉求（例如“代码审查专家”）；它会引导定义名称与描述、选择工具权限、生成系统提示词模板，并把文件保存到正确位置。
- 方式 2：手动在上述路径创建 `.md` 文件。

**文件格式**：frontmatter 定义基本信息，正文为系统提示词 [@ref-lingma-agents-create]：

```markdown
---
name: code-review
description: 代码审查专家，检查代码质量和安全性
tools: Read, Grep, Glob, Bash
---
你是一位资深代码审查员，负责确保代码质量。审查清单：
1. 代码可读性
2. 命名规范
3. 错误处理
4. 安全性检查
5. 测试覆盖
```

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | 自定义智能体的唯一标识名称 |
| `description` | 是 | 简短描述功能和专长，用于模型自动选择 |
| `tools` | 否 | 允许使用的工具列表，用逗号分隔 |

**可用工具**（`tools` 字段的取值集合）[@ref-lingma-agents-tools]：

| 工具名称 | 说明 |
| :-- | :-- |
| Shell | 在您的环境中执行 shell 命令 |
| Edit | 对特定文件进行有针对性的编辑 |
| Write | 创建或覆盖文件 |
| Glob | 检索文件 |
| Grep | 检索文件内容 |
| Read | 读取文件的内容 |
| WebFetch | 从指定的 URL 获取内容 |
| WebSearch | 执行带有域过滤的 Web 搜索 |

缺口：文档未说明 `tools` 不写时的默认值（继承全部还是无工具）、未知工具名的处理、其它可能的 frontmatter 字段（如 model、permission、sandbox）或文件大小限制。

## 角色、调度与调用 {#agents-roles-invocation}

**角色关系**：自定义智能体通过 subagent 方式被管理，即由主智能体（Agent 模式）按需调度执行特定任务 [@ref-lingma-agents-create]。主智能体会针对复杂任务自动生成方案与规划，用户也可用 `/plan` 主动触发规划，确认后按规划执行 [@ref-lingma-agentmode-plan]。插件同时内置 Computer Use 与 Plan Mode 两个智能体，运行策略在设置中配置 [@ref-lingma-changelog-custom-agents]。主智能体本身是智能体模式下的默认 Agent，具备自主决策、环境感知与工具使用能力 [@ref-lingma-agents-create]。

**调用方式** [@ref-lingma-agents-usage]：

- 自动触发：用自然语言描述任务，模型根据 `description` 自动识别意图并选择合适的自定义智能体（例如“帮我审查这个接口的实现”可自动调用 `code-review`）。
- 手动触发：输入 `/agent-name` 手动触发指定智能体（例如 `/code-review`）。

缺口：文档没有说明自动选择时多个候选智能体如何排序与去重、模型决策的触发条件、以及同名用户级与项目级智能体的覆盖规则（技能章节明确了项目级覆盖用户级，智能体章节未写）。

## 边界与诊断 {#agents-limits-diagnostics}

**覆盖与边界**：每个自定义智能体拥有独立的上下文窗口、工具权限与系统提示词 [@ref-lingma-agents-create]；`tools` 字段限定该智能体可用的工具集合 [@ref-lingma-agents-tools]。主智能体在智能体模式下可自主使用工程检索、文件编辑、终端等内置工具，并自动感知和使用 MCP 工具 [@ref-lingma-agentmode-tools]。

**已知缺口（`agents.limits` 记为 unknown）**：并发上限、递归/嵌套深度、单次委派持续时间或上下文边界，官方文档均未给出。已检查的直接入口为自定义智能体文档（`user-guide/custom-agent.md`）、智能体模式文档（`user-guide/agent.md`）与 JetBrains 更新日志；这些来源只说明“通过 subagent 方式管理”，没有并发、递归或超时参数。缺失的证明是一个描述调度限制的官方页面或配置项。

**诊断**：文档给出的人工核对方式是调用本身——用自然语言或 `/agent-name` 触发后观察是否被选中并执行 [@ref-lingma-agents-usage]。缺口：没有独立的“列出已发现智能体”命令、加载失败状态或委派失败的错误说明；添加或修改智能体文件后是否需要重启 IDE 也未在文档中说明（技能与 Hooks 文档均要求重启，但智能体章节未写）。
