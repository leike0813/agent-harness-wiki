---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-custom_agents-v1
harness_id: rovodev
topic: custom_agents
title: "Rovo Dev CLI 的子代理：定义、调用与配置"
sections:
  - section_id: agents-locations
    surface_ids: [cli]
    source_refs: [ref-rovodev-subagents-locations, ref-rovodev-subagents-intro]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-rovodev-subagents-format, ref-rovodev-subagents-locations]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-rovodev-subagents-intro, ref-rovodev-commands-interactive, ref-rovodev-commands-productivity, ref-rovodev-config-agent]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-rovodev-subagents-invoke, ref-rovodev-subagents-intro]
  - section_id: agents-config
    surface_ids: [cli]
    source_refs: [ref-rovodev-subagents-create, ref-rovodev-subagents-format, ref-rovodev-memory-paths, ref-rovodev-memory-priority, ref-rovodev-memory-commands, ref-rovodev-config-agent]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-subagents-manage, ref-rovodev-config-agent, ref-rovodev-help-interactive, ref-rovodev-commands-interactive]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-locations
        status: answered
        source_refs: [ref-rovodev-subagents-locations]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-rovodev-subagents-format, ref-rovodev-subagents-locations]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: partial
        source_refs: [ref-rovodev-subagents-intro, ref-rovodev-commands-interactive, ref-rovodev-config-agent]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-rovodev-subagents-invoke, ref-rovodev-subagents-intro]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-config
        status: partial
        source_refs: [ref-rovodev-subagents-create, ref-rovodev-memory-paths, ref-rovodev-config-agent]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: unknown
        source_refs: []
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-rovodev-subagents-manage, ref-rovodev-help-interactive]
---

固定来源范围：本章依据 Atlassian 官方支持文档《Use subagents in Rovo Dev CLI》《Rovo Dev CLI commands》《Manage Rovo Dev CLI settings》《Use memory in Rovo Dev CLI》《Get help in Rovo Dev CLI》的固定快照。Rovo Dev CLI 为闭源产品，`surface_id: cli`；官方页面未标注适用的软件版本，本章为来源级知识。

## 定义位置与发现 {#agents-locations}

Rovo Dev 的自定义 agent 机制是**子代理（subagent）**：主代理把特定任务委派给带专用能力、系统提示和工具配置的子代理。子代理以 markdown 文件（含 YAML frontmatter）保存，有两个目录：[@ref-rovodev-subagents-locations]

| 作用域 | 路径 | 生效范围 |
| --- | --- | --- |
| 用户级 | `~/.rovodev/subagents/` | 所有项目 |
| 项目级 | `.rovodev/subagents/` | 仅当前项目 |

一个文件对应一个子代理；用户级以 home 为根，项目级以当前工作目录（仓库根）为根，两者都不依赖环境变量。示例中把文件 `code-reviewer.md` 与 `name: code-reviewer` 对应，但官方没有把「文件名必须等于 name」写成硬约束。[@ref-rovodev-subagents-locations]

子代理与主代理的职责划分：子代理只使用 Rovo Dev 提供给它的上下文，以保持聚焦并减少主代理的上下文体积。[@ref-rovodev-subagents-intro]

官方没有说明两个作用域中同名文件的合并或覆盖规则（对比 skill 的「内置 > 用户 > 项目」是明确写出的，子代理没有对应表述），也没有列出除这两个目录外的其他发现位置（例如插件或组织级目录）。这部分保持未验证。

## 定义文件格式 {#agents-format}

子代理文件是 markdown + YAML frontmatter，格式为：[@ref-rovodev-subagents-format]

```markdown
---
name: [name]
description: [one-line-description]
tools:
  - [tool1]
  - [tool2]
  - [tool3]
---
[System prompt]
```

官方给出的完整示例是项目级 `.rovodev/subagents/code-reviewer.md`：[@ref-rovodev-subagents-format]

```markdown
---
name: code-reviewer
description: Reviews code and suggests improvements
tools:
  - open_files
  - expand_code_chunks
  - grep
  - bash
---
You are an expert code reviewer focused on identifying potential issues and suggesting improvements.
```

字段：frontmatter 中出现 `name`、`description`、`tools` 三个键，`tools` 是工具名列表；frontmatter 之后的全部内容即系统提示（System prompt）。文档强调子代理的能力由「系统提示 + 可访问工具」共同定义，并建议在系统提示里写清角色与专长、要执行的具体任务、处理问题的方式、以及期望的输出格式或风格。[@ref-rovodev-subagents-format]

文件位置与作用域一致：用户级放在 `~/.rovodev/subagents/`，项目级放在 `.rovodev/subagents/`；因此「文件放哪里」同时决定谁可以使用。[@ref-rovodev-subagents-locations]

固定来源没有给出 frontmatter 的字段类型约束（如 `tools` 是否必须是非空数组、是否接受通配）、未知字段的处理、`description` 与提示正文的长度上限、`name` 的字符集限制，也没有说明子代理能否定义自己的模型或权限字段（模型通过创建向导选择，见「模型、工具、技能与继承」）。

## 角色与原生/扩展边界 {#agents-roles}

子代理由 Rovo Dev 原生实现：它们通过内置的 `invoke_subagent` 工具对主代理可见。子代理只使用宿主提供的上下文。[@ref-rovodev-subagents-intro]

官方命令表里与 agent 相关的原生入口：[@ref-rovodev-commands-interactive]

| 命令 | 说明 |
| --- | --- |
| `/subagents` | 管理子代理配置（标注为 "when enabled"） |
| `/mode` | 显示并选择可用的 agent 模式 |
| `/ask` | 以只读（ask）模式发送一次提示，不永久切换模式 |
| `/plan` | 切到 plan 模式，先产出实现计划再改动 |

其中 `/research` 被描述为「使用领域聚焦的子代理进行深度研究」，`/full-context` 使用 `full-context-mode` skill，说明宿主自带预设的子代理与 skill。[@ref-rovodev-commands-productivity]

配置文件中另有 `agent.experimental.enableDelegationTool`（默认 `false`，文档标注为 "internal users only"），它是与本机制直接相关、但面向内部用户的委派开关；同一 `experimental` 段还有 `disableBuiltinAtlassianMcp`。公开部署下这些开关是否启用未在文档中说明。[@ref-rovodev-config-agent]

固定来源没有说明「原生实现」与「扩展提供」的区分方式（例如子代理是否可由插件或 MCP 提供），也没有列出内置子代理的名称清单。

## 调用方式 {#agents-invocation}

调用只需要在提示里点名：例如 `Use the code-reviewer subagent to conduct a code review of the latest commit`。[@ref-rovodev-subagents-invoke]

选择规则：文档建议**显式**要求 Rovo Dev 调用子代理最可靠，但主代理在没有被要求时也可能自行把相关任务委派给子代理；`/research` 这类命令则由宿主自己决定使用子代理。[@ref-rovodev-subagents-intro]

也就是说委派是「主代理按提示语义决定」，固定来源没有给出去重规则、优先级、描述匹配算法或每个子代理的自动触发条件，也没有说明子代理不可用时的回退行为。

## 模型、工具、技能与继承 {#agents-config}

创建子代理时（推荐用交互模式）的可配置项：[@ref-rovodev-subagents-create]

1. 运行 `/subagents`，选 **Create a subagent**；
2. 选择作用域（user-level 或 project-level）；
3. 输入名称与描述，**选择一个 AI 模型**；
4. 选择要加载的标准 memory 文件，或指定一个额外的 memory 文件；
5. 输入系统提示作为指令，并指定该子代理可用的工具；
6. 选择该子代理可以使用的 skill。

因此每个子代理可以独立指定模型、工具集合、skill 集合与 memory 文件；手工配置时 `tools` 列表对应同一件事。向导提供的是「用户级 / 项目级」两种作用域，与目录作用域一致。[@ref-rovodev-subagents-format]

memory 文件的选取遵循宿主的优先级：用户 memory 文件在 `~/.rovodev`（即 `~/.rovodev/AGENTS.md`），其次是当前工作目录的项目 memory 文件（`AGENTS.md`、`AGENTS.local.md`），再次是父目录的项目 memory 文件（越接近工作目录优先级越高）。[@ref-rovodev-memory-paths][@ref-rovodev-memory-priority]

memory 文件本身用 `/memory`（当前目录）、`/memory user`（用户级）、`/memory init`（按项目生成）、`/memory reflect`（从会话提炼）维护，属于子代理可选加载的上下文来源。[@ref-rovodev-memory-commands]

**大纲级配置**：`agent` 段中的 `additionalSystemPrompt`、`streaming`、`temperature`、`modelId`、`enableDeepPlanTool` 属于整个 agent 的默认行为，文档没有说明它们与「子代理级模型/提示」的继承或覆盖关系。[@ref-rovodev-config-agent]

固定来源没有给出子代理的权限/沙箱字段（是否可为子代理单独设置 `toolPermissions`、YOLO 例外或 `allowedExternalPaths`），这部分未验证。

## 边界与诊断 {#agents-diagnostics}

**边界（未建立）**：官方文档没有给出子代理的并发上限、递归/嵌套深度限制、单次委派的超时或持续时间限制、上下文预算，以及子代理能否再次调用子代理。相关入口只有 `/subagents`（管理界面）与 `agent.experimental.enableDelegationTool`（内部用户的委派开关）；要确认这些行为需要实测或查看发行说明，本章不据此断言。[@ref-rovodev-subagents-manage][@ref-rovodev-config-agent]

**诊断**：`/subagents` 打开交互界面，可查看并编辑已有子代理，是确认「定义是否被发现」的主要入口。[@ref-rovodev-subagents-manage] `/help` 后接查询词、或使用具体命令的 `help` 子命令，可查询具体命令的用法。[@ref-rovodev-help-interactive] 固定来源没有提供子代理调用失败的独立日志、权限错误信息或委派链路的追踪入口；`/subagents` 被标注为 "when enabled"，若该命令不可用说明当前构建或开关未启用。[@ref-rovodev-commands-interactive]
