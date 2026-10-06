---
schema_version: 3
record_kind: production
edition_id: antigravity-cli-custom_agents-v3
harness_id: antigravity
topic: custom_agents
title: Antigravity CLI 的自定义 Agent：入口、角色、调用与覆盖
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-agents-subagents-discovery
      - ref-agy-custom-agents-plugins-agents
      - ref-agy-custom-agents-changelog-projectfix
      - ref-agy-custom-agents-changelog-custom-md
      - ref-agy-custom-agents-md-custom
      - ref-agy-custom-agents-frontmatter
      - ref-agy-custom-agents-body
      - ref-agy-custom-agents-changelog-agents-list
      - ref-agy-custom-agents-changelog-rules-key
      - ref-agy-custom-agents-changelog-desktop-project-paths
      - ref-agy-custom-agents-changelog-exclude-default
      - ref-agy-custom-agents-changelog-exclude
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-agents-builtin
      - ref-agy-custom-agents-md-custom
      - ref-agy-custom-agents-orchestrators
      - ref-agy-custom-agents-slash-catalog
      - ref-agy-custom-agents-plugins-agents
      - ref-agy-custom-agents-changelog-image-subagent
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-agents-invoke
      - ref-agy-custom-agents-agents-panel
      - ref-agy-custom-agents-changelog-invoke-guidance
      - ref-agy-custom-agents-changelog-invoke-syntax
      - ref-agy-custom-agents-changelog-subagent-false
      - ref-agy-custom-agents-changelog-agent-flag
      - ref-agy-custom-agents-frontmatter
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-agents-frontmatter
      - ref-agy-custom-agents-inheritance
      - ref-agy-custom-agents-changelog-enable-mcp
      - ref-agy-custom-agents-changelog-model-inherit
      - ref-agy-custom-agents-changelog-inherit-customizations
      - ref-agy-custom-agents-changelog-inherit
      - ref-agy-custom-agents-changelog-inherit-user
      - ref-agy-custom-agents-changelog-tools-baseline
      - ref-agy-custom-agents-sandbox-cli
      - ref-agy-custom-agents-perm-cli
      - ref-agy-custom-agents-models
      - ref-agy-custom-agents-changelog-denial-respect
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-agents-nesting
      - ref-agy-custom-agents-invoke
      - ref-agy-custom-agents-lifecycle
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-agents-agents-panel
      - ref-agy-custom-agents-lifecycle
      - ref-agy-custom-agents-tasks
      - ref-agy-custom-agents-keyboard
      - ref-agy-custom-agents-changelog-projectfix
      - ref-agy-custom-agents-inheritance
      - ref-agy-custom-agents-changelog-agent-flag
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs:
          - ref-agy-custom-agents-subagents-discovery
          - ref-agy-custom-agents-plugins-agents
          - ref-agy-custom-agents-changelog-projectfix
          - ref-agy-custom-agents-changelog-custom-md
          - ref-agy-custom-agents-md-custom
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: partial
        source_refs:
          - ref-agy-custom-agents-frontmatter
          - ref-agy-custom-agents-body
          - ref-agy-custom-agents-changelog-agents-list
          - ref-agy-custom-agents-changelog-rules-key
          - ref-agy-custom-agents-changelog-exclude-default
          - ref-agy-custom-agents-changelog-exclude
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs:
          - ref-agy-custom-agents-builtin
          - ref-agy-custom-agents-md-custom
          - ref-agy-custom-agents-orchestrators
          - ref-agy-custom-agents-slash-catalog
          - ref-agy-custom-agents-changelog-image-subagent
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-agy-custom-agents-invoke
          - ref-agy-custom-agents-agents-panel
          - ref-agy-custom-agents-changelog-invoke-guidance
          - ref-agy-custom-agents-changelog-invoke-syntax
          - ref-agy-custom-agents-changelog-subagent-false
          - ref-agy-custom-agents-changelog-agent-flag
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs:
          - ref-agy-custom-agents-frontmatter
          - ref-agy-custom-agents-inheritance
          - ref-agy-custom-agents-changelog-enable-mcp
          - ref-agy-custom-agents-changelog-model-inherit
          - ref-agy-custom-agents-changelog-inherit-customizations
          - ref-agy-custom-agents-changelog-inherit
          - ref-agy-custom-agents-changelog-inherit-user
          - ref-agy-custom-agents-changelog-tools-baseline
          - ref-agy-custom-agents-sandbox-cli
          - ref-agy-custom-agents-perm-cli
          - ref-agy-custom-agents-models
          - ref-agy-custom-agents-changelog-denial-respect
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs:
          - ref-agy-custom-agents-nesting
          - ref-agy-custom-agents-invoke
          - ref-agy-custom-agents-lifecycle
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-agy-custom-agents-agents-panel
          - ref-agy-custom-agents-lifecycle
          - ref-agy-custom-agents-tasks
          - ref-agy-custom-agents-keyboard
          - ref-agy-custom-agents-changelog-projectfix
          - ref-agy-custom-agents-inheritance
---

Antigravity CLI 把“Agent”当作可被复用和委派的工作单位：既有预打包的内置子代理，也有用户在工作区或全局目录、以及插件里用 Markdown 定义的自定义 Agent，还有以斜杠命令形式启动的多代理编排器。本章只使用固定来源：官方文档快照（取于 2026-09-30，页面未注明适用软件版本），以及官方仓库提交 77b1aad 的登记文档、CHANGELOG 与示例；本产品没有官方 npm 包，也没有版本映射，整章按 source_only 阅读。官方文档站页面是多形态共享页，同一页内含 Antigravity 2.0、Antigravity CLI 与 Antigravity IDE 三个 tab 区块；本章只把标注为 CLI 的机制当作 Antigravity CLI 的机制，其余形态的内容不作为 CLI 结论。子代理相关正文在多形态间基本共用，若某处只描述了别的形态，会在行文中说明。

本版新增的两条 CHANGELOG 条目（1.2.15、1.2.16）固定在提交 `65a3c69`；上一版固定来源（文档快照 2026-09-30、提交 `77b1aad`）继续作为其余小节的依据。

## 入口、发现与 frontmatter 字段 {#agents-entry}

自定义子代理以 Markdown 文件（`.md`）定义，带 YAML frontmatter；同一机制也被插件和工作区目录复用。Antigravity 会在三个位置自动发现这些文件：工作区的「工作区根目录/.agents/agents/名称.md」，或同目录下的「名称/agent.md」形式（作用域为工作区/仓库根）；全局的「~/.gemini/config/agents/名称.md」，或「.../agents/名称/agent.md」形式（作用域为本机所有项目）；以及插件包内的 `plugins/插件名/agents/`（随插件打包）。 [@ref-agy-custom-agents-subagents-discovery] 插件页把 `agents/` 列为插件可携带的组件之一，说明它承载“自定义子代理与 persona 配置”的 markdown 文件，与该插件同时携带的 skills、rules、MCP 配置和 hooks 并列。 [@ref-agy-custom-agents-plugins-agents]

CHANGELOG 记录了一处发现链路的修复：此前在 Desktop App 创建的工作区、已信任的工作区、以 `--agent` 启动、headless（`-p` / `--prompt`）运行以及在 `/agents` 面板中，`.agents/agents/` 里的项目自定义代理可能找不到或不可选，现已修复。 [@ref-agy-custom-agents-changelog-projectfix] 同一个发现机制在 1.1.6 版本随“Custom Agents (Markdown Format)”一并加入，并说明动态定义的子代理（`define_subagent`）也改写为 Markdown 格式，以便在外部构建中正确解析。 [@ref-agy-custom-agents-changelog-custom-md] 子代理页在“Custom Agents (Markdown Format)”一节再次确认：工作区代理位于「工作区根目录/.agents/agents/名称.md」或「名称/agent.md」，全局代理位于 `~/.gemini/config/agents/`。 [@ref-agy-custom-agents-md-custom]

Desktop App 创建的项目还有一层路径形态导致的识别失败：1.3.0 之前，项目路径含空格、`#`、`%` 或其它特殊字符、或位于 Windows 盘符上时，project-scoped custom agents 无法识别在 Antigravity 桌面应用中于此类目录创建的项目；该版本修复了这一点。 [@ref-agy-custom-agents-changelog-desktop-project-paths] 因此“`.agents/agents/` 里的代理明明存在却不被发现”这一类失败，除上一段列举的四种场景（Desktop App 创建、已信任工作区、`--agent` 启动、headless 运行与 `/agents` 面板）之外，还应把**项目路径本身的字符形态**纳入排查；同一条修复同时覆盖了 workspace trust、`@` 文件提及、`/codesearch` 结果与 agent 响应中的文件链接，详见配置章「信任、权限与沙箱对配置的约束」。

frontmatter 字段：子代理页的 Frontmatter Configuration 表列出以下字段及其类型、默认值与用途；`name` 与 `description` 为必填，`description` 供 planner 判断何时把任务委派给该代理。 [@ref-agy-custom-agents-frontmatter]

| 字段 | 类型 | 默认值 | 用途 |
| :-- | :-- | :-- | :-- |
| `name` | string | 必填 | 自定义代理的唯一标识。 |
| `description` | string | 必填 | 供 planner 决定何时委派任务给该代理的详细描述。 |
| `tools` | string[] | `[]` | 该子代理允许使用的工具显式列表（例如 `view_file`、`replace_file_content`、`grep_search`、`run_command`）。 |
| `mainAgent` | boolean | `true` | 为 `true` 时允许在聊天界面被选为主代理。 |
| `subagent` | boolean | `true` | 为 `true` 时允许通过 `invoke_subagent` 工具被调用。 |
| `model` | string | `inherit` | 被调用时使用的模型档位（`inherit`、`flash` 或 `pro`）。 |
| `commandExecutionPolicy` | string | `sandbox` | shell 命令的自动执行策略（`off`、`auto`、`eager`、`sandbox`）。 |
| `mcpServers` | object[] | `[]` | 为该子代理配置的自定义 MCP server。 |
| `skills` / `plugins` | string[] | `[]` | Skill 路径（例如 `skills/my-helper-skill`）或插件依赖。 |

页面同时给出一条已知问题：在 `tools` 列表中写了未映射或拼错的工具名，可能导致子代理进程在执行时挂起；应核对精确的工具名（如 `view_file`、`run_command`），并称增强的 schema 校验与修复会在后续更新中发布。 [@ref-agy-custom-agents-frontmatter]

frontmatter 之外的正文即系统提示：YAML `---` 分隔符之后的内容定义该子代理的 system prompt，可用标准 Markdown 一级标题（如 `# System Prompt`、`# Review Guidelines`）组织指令。 [@ref-agy-custom-agents-body] 页面给出的完整示例（`code-auditor.md`）把两者合在一起，可直接作为最小可用定义的参照：

```
---
name: code-auditor
description: Specialized subagent for security audits, static analysis, and code quality reviews.
tools:
  - view_file
  - grep_search
  - run_command
subagent: true
mainAgent: false
model: pro
commandExecutionPolicy: sandbox
skills:
  - skills/security-checklist
---

# System Prompt
You are an expert security auditor and code reviewer. Your primary objective is to inspect source code for security vulnerabilities, memory leaks, and anti-patterns.

# Review Guidelines
1. Perform thorough static analysis without altering files unless explicitly asked.
2. Flag potential injection flaws, unvalidated inputs, or hardcoded secrets.
3. Provide concise, actionable remediation steps for each finding.
```

除上表字段外，CHANGELOG 还登记了若干未出现在该页表格中的 frontmatter 键：`hidden`、`inheritMcp`（与 `mainAgent`、`subagent`、`commandExecutionPolicy` 一同在 1.1.6 引入）； [@ref-agy-custom-agents-changelog-custom-md] `agents`（声明该代理依赖的子代理，路径规则与 `skills` 相同，支持工作区相对、绝对与代理相对）； [@ref-agy-custom-agents-changelog-agents-list] `rules:`（直接点名规则文件，被点名的规则总是生效，取代继承整棵规则树）； [@ref-agy-custom-agents-changelog-rules-key] `excludeDefaultComponents: true`（让自定义代理退出默认提示段与内置工具，同时保留调用后钩子）； [@ref-agy-custom-agents-changelog-exclude-default] 以及 `exclude`（逐项过滤技能，运行时技能过滤不应丢弃它）。 [@ref-agy-custom-agents-changelog-exclude] 这些键的确切类型、默认值与是否存在其他必填约束，固定页面未给出，属于缺口；因此 `agents.format` 标注为 partial：核心字段可确证，扩展字段只有 CHANGELOG 的条目级证据。

## 角色：内置、Markdown 自定义与编排器 {#agents-roles}

角色可分三类，走不同机制。第一类是内置子代理，随产品预打包：`research`（面向代码库研究、文件导航与结构探索）、`browser`（操作沙箱浏览器做交互式浏览器测试，仅经 `/browser` 斜杠命令调用）、`self`（调用方代理的直接克隆，共享同一套系统指令与工具集）。 [@ref-agy-custom-agents-builtin] 第二类是用户或插件提供的 Markdown 自定义代理：当 `subagent: true` 时主代理可经 `invoke_subagent` 调用它，也可以直接在 `/agents` 面板中把它选为主代理；因此自定义定义同时覆盖“主代理”和“子代理”两种角色。 [@ref-agy-custom-agents-md-custom] 第三类是多代理编排器，由斜杠命令启动而非某个定义文件：`/boost` 启动三层推理层级（Orchestrator 到 DeepCoder / DeepInvestigator 协调者，再到隔离的执行 worker），`/teamwork-preview` 协调面向大规模项目的代理团队。 [@ref-agy-custom-agents-orchestrators] 斜杠命令目录把二者归入 Reasoning 类别，并注明均需付费计划（`/boost` 为 Paid plans，`/teamwork-preview` 同理）。 [@ref-agy-custom-agents-slash-catalog]

原生实现与扩展提供的实现的区分方式在来源中只有间接证据：内置子代理由产品预打包，插件携带的 `agents/` 组件则随插件安装与启用，其文件同样落在发现路径 `plugins/插件名/agents/` 下。 [@ref-agy-custom-agents-plugins-agents] [@ref-agy-custom-agents-md-custom] 来源没有给出插件内代理命名空间或与手动定义代理同名时的消解规则，属于缺口。

内置子代理名册会随版本增加，文档页不是最新来源：1.2.16 把图片生成改为交给内置的 `image-generator` 子代理——它自己写提示词、最多重试三次检查结果，并把图片存进会话的工件，于是图片生成在对话里表现为一次子代理运行 [@ref-agy-custom-agents-changelog-image-subagent]。因此上文来自 2026-09-30 文档页的 `research` / `browser` / `self` 三项，应理解为该快照时点的名册，而不是当前版本的完整清单。

## 调用与委派 {#agents-invocation}

主代理通过 `invoke_subagent` 工具生成一个新的并发会话，带上专门角色与初始提示。可选项包括工作区策略（沿用父代理工作区 `inherit`、创建隔离 Git worktree `branch`、或共享目录存储 `share`）；上下文隔离方面，子代理不继承父代理已有的对话历史（上下文窗口），以干净状态起步；一旦被调用即立刻开始执行，父代理可并发调用多个子代理。 [@ref-agy-custom-agents-invoke] 用户侧的显式入口是 `/agents` 交互面板，可从中切换自定义代理或 fork 对话；面板把代理按 Identifier、Role、State、Step 列出。 [@ref-agy-custom-agents-agents-panel]

自动委派的触发条件来自定义本身：`description` 供 planner 判断何时把任务委派给该代理， [@ref-agy-custom-agents-frontmatter] 并且当 Markdown 自定义代理在 `tools` 里列出 `invoke_subagent` 时，它会在系统提示中收到可用子代理名册与用法说明，从而真正能委派它声明的子代理。 [@ref-agy-custom-agents-changelog-invoke-guidance] 已经开始的子代理也可以直接对话：提示框支持「@子代理名称 消息」语法把消息发给某个子代理会话，自动补全会列出运行中和已完成的子代理。 [@ref-agy-custom-agents-changelog-invoke-syntax]

`subagent: false` 的自定义代理不应出现在可用子代理列表中、也不应可被当作子代理调用（这是被修正过的行为）。 [@ref-agy-custom-agents-changelog-subagent-false] 启动期还提供 `--agent` 标志与 `agent/agents` 子命令，用于在启动时选定自定义代理并列出可用代理。 [@ref-agy-custom-agents-changelog-agent-flag]

## 模型、工具、权限与沙箱的覆盖与继承 {#agents-overrides}

单个代理可在 frontmatter 里指定执行策略：`model` 选择被调用时的模型档位（`inherit` 沿用父代理模型，或 `flash` / `pro`），`commandExecutionPolicy` 设定 shell 命令的自动执行策略（`off`、`auto`、`eager`、`sandbox`），`tools` 显式限定允许的工具集，`mcpServers` 为该子代理单独配置 MCP server，`skills` / `plugins` 声明依赖。 [@ref-agy-custom-agents-frontmatter] 模型档位与产品中的模型族一致（例如 Flash 与 Pro 系列）。 [@ref-agy-custom-agents-models] 当定义把 `model` 留作 `inherit` 而父代理自身没有选定模型时，曾会出现子代理无法启动；现已回退到默认的 fast 档位。 [@ref-agy-custom-agents-changelog-model-inherit]

权限与沙箱的继承是显式约定的：子代理自动继承父代理允许的终端命令前缀、文件读写目录范围与沙箱设置；父代理对其子代理的工作区（含隔离 Git worktree）保留完整访问权；若子代理遇到需要用户授权的工具执行，请求会自动冒泡到主 UI/Subagent 面板。 [@ref-agy-custom-agents-inheritance] 沙箱本身在 CLI 侧由 `~/.gemini/antigravity-cli/settings.json` 中的 `enableTerminalSandbox` 与 `toolPermission`（如 `proceed-in-sandbox`）控制，也可经 `/config` 或启动标志启用； [@ref-agy-custom-agents-sandbox-cli] 更细的读写/命令/MCP 授权由全局设置里的 `allow`、`ask`、`deny` 三张表分层决定。 [@ref-agy-custom-agents-perm-cli]

自定义代理对“环境定制”的继承经过两次调整，顺序与版本有关：1.1.14 先引入单一的 `inheritCustomizations` 开关，统一决定是否采纳 skills、rules、plugins、subagents 与 MCP server，取代此前互相打架的分项默认； [@ref-agy-custom-agents-changelog-inherit-customizations] 1.1.25 又把 Markdown 自定义代理的默认改为继承环境中的 skills、rules 与 subagents，与默认代理一致； [@ref-agy-custom-agents-changelog-inherit] 另有 `inherit_user: false` 只用于退出个人定制，不应连带隐藏 CLI 自带的内置 skills、rules 与 plugins。 [@ref-agy-custom-agents-changelog-inherit-user] MCP 方面，`enable_mcp_tools: true` 创建的自定义子代理曾收到空的 MCP server 列表，而非继承父代理已配置的 MCP server（已修复）。 [@ref-agy-custom-agents-changelog-enable-mcp] 工具基线也变过：默认代理与子代理的默认工具集移除了遗留的 `find_by_name`、`grep_search`、`list_dir`，但显式在 `tools` 中列出的自定义代理仍可用它们。 [@ref-agy-custom-agents-changelog-tools-baseline]

仍未确证的点（故本节标注 partial）：frontmatter 中没有出现第一方的 provider 字段（models 页也未描述按代理切换 provider 的机制）；`commandExecutionPolicy` 与全局沙箱/权限预设之间的优先级顺序、以及自定义代理能否真正收窄（而非仅扩展）父级的权限，页面都没有说明；这些需要运行观察或未登记的源码才能判定。 [@ref-agy-custom-agents-frontmatter] [@ref-agy-custom-agents-inheritance]

权限被拒之后的行为也有明确约定：遇到未被批准的权限请求时——典型情况是子代理自己无法向你提问——agent 会尊重这次拒绝，不再改用其它命令、脚本或工具绕开它 [@ref-agy-custom-agents-changelog-denial-respect]。这与上文的冒泡审批是同一条链的两端：请求先冒泡给你，未获批准就到此为止。

## 边界：并发、嵌套、上下文 {#agents-limits}

嵌套深度有明确上限：子代理相对主代理的最大嵌套深度为 10 层，用于防止失控递归或资源耗尽；代理之间以唯一的 agent conversation ID 通信，可与父代理、子代理或已知 ID 的 peer 代理互发消息，向空闲子代理发消息会自动把它唤醒处理新指令。 [@ref-agy-custom-agents-nesting] 并发方面，父代理可并发调用多个子代理，且子代理不继承父代理既有对话历史、以干净上下文起步。 [@ref-agy-custom-agents-invoke] 生命周期上子代理异步运行，处于 Running、Idle、Killed 三态之一；Running 可被取消（面板中的 Stop Subagent，或 CLI 中按 `k`）或被父代理打断/终止，Idle 收到消息会自动回到 Running 并保留此前上下文，Killed 为永久终止且不可再次唤醒。 [@ref-agy-custom-agents-lifecycle] 但每个子代理可运行的最长持续时间、总并发子代理数量上限、以及单会话内的其他资源配额，固定来源没有给出数字，故本节标注 partial。

## 诊断：确认发现、可调用与定位失败 {#agents-diagnostics}

确认定义被发现并可用：`/agents` 面板实时列出所有活动、完成、被终止或失败的后台代理，逐项给出 Identifier、Role、State（running/done/killed/error）与当前执行的 Step；可在面板中用上下键高亮目标并在 Detail View 中查看完整推理日志。 [@ref-agy-custom-agents-agents-panel] 启动期可用 `agent/agents` 子命令列出可用代理，或用 `--agent` 在启动时指定。 [@ref-agy-custom-agents-changelog-agent-flag] 如果项目自定义代理在特定工作区/运行方式下找不到，1.2.11 的修复条目（`--agent`、headless、`/agents` 面板等场景）就是对应的已知失败模式与检查线索。 [@ref-agy-custom-agents-changelog-projectfix]

定位权限或委派失败：当子代理遇到需要授权的工具执行时，请求会冒泡到主 UI/子代理面板； [@ref-agy-custom-agents-inheritance] 此时状态栏闪烁提示，可在主提示框内按 Alt+J“传送”到下一个等待审批的子代理 Detail View，确认或拒绝后按 Esc 返回主线程。 [@ref-agy-custom-agents-keyboard] 代理状态本身由生命周期三态呈现（Running / Idle / Killed），可据此判断某子代理是仍在执行、已完成待唤醒，还是已被终止。 [@ref-agy-custom-agents-lifecycle] 非代理型的后台操作（直接 shell 命令、测试套件、经 `/btw` 发起的后台查询）改用 `/tasks` 命令跟踪，可查看其 stdout 日志并终止跑飞的终端进程。 [@ref-agy-custom-agents-tasks]

剩余缺口使本节标注 partial：来源没有给出专门针对“定义文件解析失败”“工具名拼错导致挂起”“MCP server 未继承”等错误面的诊断命令或日志位置；上文所列入口（`/agents` 面板、`/tasks`、Alt+J）是已知可行的检查面，但不构成完整的失败定位参考。
