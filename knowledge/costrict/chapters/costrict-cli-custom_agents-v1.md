---
schema_version: 3
record_kind: production
edition_id: costrict-cli-custom_agents-v1
harness_id: costrict
topic: custom_agents
title: "CoStrict CLI（CSC）的自定义子代理机制"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-costrict-agents-overview, ref-costrict-agents-builtin, ref-costrict-teams-overview, ref-costrict-agents-scopes, ref-costrict-agents-flag, ref-costrict-agents-managed, ref-costrict-agents-ui, ref-costrict-cli-agents, ref-costrict-settings-dirs]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-costrict-agents-file, ref-costrict-agents-fields, ref-costrict-agents-fields2, ref-costrict-agents-skills, ref-costrict-agents-mcpscope, ref-costrict-agents-memory, ref-costrict-agents-hooks]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-costrict-agents-invoke, ref-costrict-agents-explicit, ref-costrict-agents-session, ref-costrict-teams-subagents]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-costrict-agents-tools, ref-costrict-agents-agenttool, ref-costrict-agents-permmode, ref-costrict-agents-model, ref-costrict-agents-deny]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-costrict-agents-nest, ref-costrict-agents-bg, ref-costrict-teams-enable, ref-costrict-teams-storage, ref-costrict-teams-permissions, ref-costrict-teams-overview, ref-costrict-agents-records]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-agents-ui, ref-costrict-cli-agents, ref-costrict-cmd-agents, ref-costrict-agents-records, ref-costrict-agents-scopes, ref-costrict-agents-deny, ref-costrict-agents-permmode]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-costrict-agents-overview, ref-costrict-agents-builtin, ref-costrict-teams-overview, ref-costrict-agents-scopes, ref-costrict-agents-flag, ref-costrict-agents-managed, ref-costrict-agents-ui, ref-costrict-cli-agents, ref-costrict-settings-dirs]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-costrict-agents-file, ref-costrict-agents-fields, ref-costrict-agents-fields2, ref-costrict-agents-skills, ref-costrict-agents-mcpscope, ref-costrict-agents-memory, ref-costrict-agents-hooks]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-costrict-agents-overview, ref-costrict-agents-builtin, ref-costrict-teams-overview, ref-costrict-agents-scopes, ref-costrict-agents-flag, ref-costrict-agents-managed, ref-costrict-agents-ui, ref-costrict-cli-agents, ref-costrict-settings-dirs]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-costrict-agents-invoke, ref-costrict-agents-explicit, ref-costrict-agents-session, ref-costrict-teams-subagents]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-costrict-agents-tools, ref-costrict-agents-agenttool, ref-costrict-agents-permmode, ref-costrict-agents-model, ref-costrict-agents-deny]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-costrict-agents-nest, ref-costrict-agents-bg, ref-costrict-teams-enable, ref-costrict-teams-storage, ref-costrict-teams-permissions, ref-costrict-teams-overview, ref-costrict-agents-records]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-costrict-agents-ui, ref-costrict-cli-agents, ref-costrict-cmd-agents, ref-costrict-agents-records, ref-costrict-agents-scopes, ref-costrict-agents-deny, ref-costrict-agents-permmode]
---

## 定义位置、来源与优先级 {#agents-entry}

本章的固定来源是 CSC 官方文档页 `/csc/agent/sub-agents`、`/csc/agent/agent-teams`、`/csc/configuration/settings`、`/csc/reference/cli-reference` 的快照，按来源级知识阅读（`version_applicability: unknown`）。文档中的版本号（如 "在版本 2.1.63 中，Task 工具已重命名为 Agent"）只在引用处说明。

Subagents（子代理）是处理特定任务的专门 AI 助手：每个在自己的上下文窗口中运行，带自定义系统提示、工具访问与独立权限；当任务会产生大量搜索结果、日志或不再引用的文件内容时，CSC 会把工作委托给子代理，只把摘要带回主对话。[@ref-costrict-agents-overview]

**内置子代理**（继承父对话权限并附加工具限制）：[@ref-costrict-agents-builtin]

| 内置代理 | 模型 | 工具 | 用途 |
| :-- | :-- | :-- | :-- |
| `Explore` | — | 只读（禁用 Write/Edit） | 文件发现、代码搜索、代码库探索；调用时 CSC 指定 `quick`/`medium`/`very thorough` |
| `Plan` | 继承主对话 | 只读 | 计划模式中呈现计划前的代码库研究 |
| `general-purpose` | 继承主对话 | 全部工具 | 复杂研究、多步骤操作、代码修改 |

它们与 Agent teams 不同：子代理在单个会话内运行、只向主代理汇报；Agent teams 跨独立会话，队友之间可以直接通信并共享任务列表。[@ref-costrict-teams-overview]

**定义来源与优先级**（同名时高优先级位置胜出）：[@ref-costrict-agents-scopes]

| 位置 | 作用域 | 优先级 | 创建方式 |
| :-- | :-- | :-- | :-- |
| 托管设置 | 组织范围 | 1（最高） | 由管理员部署 |
| `--agents` CLI 标志 | 当前会话 | 2 | 启动时传 JSON |
| `.costrict/agents/` | 当前项目 | 3 | 交互式或手动 |
| `~/.costrict/agents/` | 你的所有项目 | 4 | 交互式或手动 |
| Plugins 的 `agents/` 目录 | 启用 Plugins 的位置 | 5（最低） | 随 Plugins 安装 |

项目子代理通过**从当前工作目录向上遍历**发现；用 `--add-dir` 添加的目录只授予文件访问权限，**不会**被扫描子代理；要跨项目共享请用 `~/.costrict/agents/` 或 Plugins。[@ref-costrict-agents-scopes] CLI 定义的子代理作为 JSON 在启动时传入，仅在该会话存在、不落盘，适合快速测试或自动化脚本，字段与文件形式相同。[@ref-costrict-agents-flag]

托管子代理放在托管设置目录内的 `.costrict/agents/`，使用与项目和用户子代理相同的 frontmatter 格式，并优先于同名项目和用户定义；插件子代理出现在 `/agents` 中，但出于安全原因**不支持** `hooks`、`mcpServers` 或 `permissionMode` 字段，这些字段在加载时被忽略。[@ref-costrict-agents-managed]

**管理入口**：`/agents` 打开标签式界面——`Running` 页显示正在运行的子代理并可打开或停止，`Library` 页查看全部（内置、用户、项目、Plugins）、创建、编辑、删除，并在重复时显示哪个定义生效；创建时可选 Personal（`~/.costrict/agents/`），并在向导中配置工具、模型、颜色与记忆范围。非交互环境下用 `csc agents` 列出所有已配置代理（按来源分组并标出被覆盖的定义）。[@ref-costrict-agents-ui][@ref-costrict-cli-agents]

**目录约定**与设置页一致：用户子代理 `~/.costrict/agents/`，项目子代理 `.costrict/agents/`。[@ref-costrict-settings-dirs]

## 文件格式与字段 {#agents-format}

子代理是带 YAML frontmatter 的 Markdown 文件，frontmatter 后是 Markdown 正文，正文成为该子代理的系统提示（子代理只收到这个系统提示加上基本环境信息，而不是完整的 CSC 系统提示）。子代理在主对话当前工作目录中启动，其中的 `cd` 不会在 Bash/PowerShell 调用之间持久化，也不影响主对话的工作目录。[@ref-costrict-agents-file]

只有 `name` 和 `description` 必需；其余字段如下：[@ref-costrict-agents-fields]

| 字段 | 说明 |
| :-- | :-- |
| `description` | CSC 据此决定何时委托 |
| `tools` / `disallowedTools` | 工具允许列表 / 拒绝列表，省略则继承全部工具 |
| `model` | `sonnet`、`opus`、`haiku`、完整模型 ID 或 `inherit`（默认 `inherit`） |
| `permissionMode` | `default`、`acceptEdits`、`auto`、`dontAsk`、`bypassPermissions`、`plan` |
| `maxTurns` | 子代理停止前的最大代理轮次 |
| `skills` | 启动时预加载到子代理上下文的 Skill（注入完整内容） |
| `mcpServers` | 该子代理可用的 MCP 服务器（名称引用或内联定义） |
| `hooks` | 限定在该子代理生命周期的钩子 |
| `memory` | 持久记忆作用域：`user`、`project`、`local` |
| `background` | `true` 时始终作为后台任务运行（默认 `false`） |
| `effort` | 努力级别 `low`/`medium`/`high`/`max`（`max` 仅 Opus 4.6） |
| `isolation` | `worktree` 时在临时 git worktree 中运行 |
| `color` | 任务列表与记录中的显示颜色 |

`initialPrompt` 在代理作为主会话代理运行时（`--agent` 或 `agent` 设置）自动成为第一个用户轮次，命令与 Skill 会被处理。[@ref-costrict-agents-fields2]

**Skill 与 MCP 的两种协同方式**：在子代理中用 `skills` 列表预加载（完整内容注入，且**不继承**父对话的 Skill），或在 Skill 中用 `context: fork` 反向指定代理类型。[@ref-costrict-agents-skills] `mcpServers` 中内联定义的服务器在子代理启动时连接、完成时断开；字符串条目复用父会话中已配置的同名服务器；内联定义使用与 `.mcp.json` 相同的 schema（`stdio`、`http`、`sse`、`ws`），可以只给子代理而不让父对话看到这些工具。[@ref-costrict-agents-mcpscope]

**记忆**：`memory: user` → `~/.costrict/agent-memory/〔name〕/`，`project` → `.costrict/agent-memory/〔name〕/`（可提交共享），`local` → `.costrict/agent-memory-local/〔name〕/`（不提交）。启用后系统提示含读写记忆目录的指令，并附带 `MEMORY.md` 的前 200 行或 25KB（以先到为准）；Read/Write/Edit 工具会自动启用。[@ref-costrict-agents-memory]

**钩子**：子代理 frontmatter 中的 `hooks` 仅在该子代理活跃时运行并随其结束清理，支持全部 Hook 事件（常用 `PreToolUse`、`PostToolUse`、`Stop`，其中 `Stop` 在运行时转换为 `SubagentStop`）。项目级 `settings.json` 中另有 `SubagentStart`/`SubagentStop` 两个事件，可按代理类型名匹配。[@ref-costrict-agents-hooks]

## 调用与委派 {#agents-invocation}

**自动委托**：CSC 依据请求中的任务描述、子代理的 `description` 字段与当前上下文决定是否委托；在 description 中写 "use proactively" 之类的短语可以鼓励主动委托。[@ref-costrict-agents-invoke]

**显式调用**分三档：[@ref-costrict-agents-explicit]

- 自然语言：在提示中点名子代理，由 CSC 决定是否委托；
- `@` 提及：输入 `@` 从自动完成中选择（保证该子代理运行一个任务）；也可手写 `@agent-〔name〕`，插件子代理为 `@agent-〔plugin-name〕:〔agent-name〕`；插件提供的子代理在自动完成中显示为 `〔plugin-name〕:〔agent-name〕`；
- 会话级：`csc --agent 〔name〕` 让主线程本身采用该子代理的系统提示、工具限制与模型（系统提示完全替换默认提示，AGENTS.md 与项目记忆仍正常加载），插件子代理传限定名。

会话级选择可持久化为项目默认：在 `.costrict/settings.json` 写 `{"agent": "code-reviewer"}`，CLI 标志优先于设置。[@ref-costrict-agents-session]

**作为队友复用**：生成 Agent teams 队友时可以引用任何来源的子代理类型（项目、用户、Plugins、CLI 定义）；队友遵循该定义的 `tools` 白名单与 `model`，定义正文作为额外指令附加到队友的系统提示，而不是替换它；团队协调与任务管理工具始终在队友中可用。注意子代理定义中的 `skills` 与 `mcpServers` 字段在作为队友运行时**不生效**——队友按常规会话加载项目与用户设置中的 Skill 和 MCP。[@ref-costrict-teams-subagents]

## 工具、权限与模型覆盖 {#agents-overrides}

**可用工具**：默认继承主对话的全部工具（含 MCP 工具）；`tools` 是允许列表，`disallowedTools` 是拒绝列表，两者同时设置时先应用拒绝列表、再在剩余池中解析允许列表，同时出现在两者中的工具被移除。[@ref-costrict-agents-tools]

**限制可生成的代理**：当代理以 `csc --agent` 作为主线程运行时，可用 `tools` 中的 `Agent(agent_type)` 语法做白名单（如 `Agent(worker, researcher)`）；`Agent`（不带括号）允许生成任意类型；完全省略 `Agent` 则不能生成任何子代理。该限制只对 `--agent` 主线程生效——子代理本身不能生成子代理。[@ref-costrict-agents-agenttool]

**权限模式**（`permissionMode`）：`default` 标准提示；`acceptEdits` 自动接受工作目录或 `additionalDirectories` 中路径的文件编辑与常见文件系统命令；`auto` 由后台分类器审查命令与受保护目录写入；`dontAsk` 自动拒绝权限提示（预先批准的工具仍有效）；`bypassPermissions` 跳过提示；`plan` 只读探索。父级的 `bypassPermissions` 优先且不可覆盖；父级使用自动模式时子代理继承自动模式，其 frontmatter 中的 `permissionMode` 被忽略。[@ref-costrict-agents-permmode]

**模型解析顺序**（子代理被调用时）：`CLAUDE_CODE_SUBAGENT_MODEL` 环境变量 → 每次调用的 `model` 参数 → 子代理定义的 `model` frontmatter → 主对话的模型。[@ref-costrict-agents-model]

**禁用特定子代理**：在设置的 `deny` 数组里用 `Agent(〔subagent-name〕)` 阻止（对内置与自定义都有效），或用 `csc --disallowedTools "Agent(Explore)"`。[@ref-costrict-agents-deny]

## 边界与运行规模 {#agents-limits}

- **不能嵌套**：子代理不能生成其他子代理；需要嵌套委托时改用 Skill 或从主对话链式调用子代理。官方把 `Plan` 子代理单独列出正是为了避免无限嵌套。[@ref-costrict-agents-nest]
- **前台与后台**：前台子代理阻塞主对话直到完成，权限提示与澄清问题传给你；后台子代理并发运行，启动前 CSC 会先取得它需要的工具权限，运行后继承这些权限并自动拒绝未预先批准的内容；后台子代理的澄清问题会失败但继续运行。可用 `Ctrl+B` 把运行中的任务转入后台，用 `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` 禁用后台任务。[@ref-costrict-agents-bg]
- **Agent teams 的启用与状态**：Agent teams 默认禁用，需在 shell 环境或 `settings.json` 的 `env` 中把 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` 设为 `1`；团队配置与任务列表分别存放在 `~/.costrict/teams/〔team-name〕/config.json` 与 `~/.costrict/tasks/〔team-name〕/`，由 CSC 自动生成维护（含会话 ID 与 tmux 窗格 ID），不要手写——项目目录中的同名文件不会被识别为配置。[@ref-costrict-teams-enable][@ref-costrict-teams-storage]
- **Agent teams 的规模与成本**：队友以负责人的权限设置启动（负责人用 `--dangerously-skip-permissions` 时队友也是如此），生成后可以逐个调整模式但不能在生成时指定；每个队友有自己的上下文窗口，token 消耗随队友数量增长，官方建议大多数工作流从 3–5 个队友开始。[@ref-costrict-teams-permissions][@ref-costrict-teams-overview]
- **记录与清理**：子代理记录独立于主对话持久化（主对话压缩不影响它们，恢复同一会话即可恢复子代理），记录按 `cleanupPeriodDays`（默认 30 天）清理；单条记录存储为 `agent-〔agentId〕.jsonl`。固定来源没有给出并发上限或单个子代理的持续时间上限。[@ref-costrict-agents-records]

**缺口（`agents.limits`）**：文档写明不能嵌套、`maxTurns` 字段、前后台语义、记录清理周期与 Agent teams 的经验规模，但没有给出同时运行的子代理数量上限、`maxTurns` 的默认值、单次调用持续时间上限或上下文预算的判定规则。

## 诊断 {#agents-diagnostics}

- `/agents` 的 `Running` 页列出正在运行的子代理并允许打开或停止；`Library` 页在存在重复定义时显示哪个定义处于活动状态（优先级见上文）。[@ref-costrict-agents-ui]
- 非交互环境用 `csc agents` 列出所有已配置代理，输出按来源分组并标出被更高优先级定义覆盖的项。[@ref-costrict-cli-agents] 会话内的 `/agents` 是官方推荐的代理配置管理入口（“管理代理配置”）。[@ref-costrict-cmd-agents]
- 记录与恢复：`~/.costrict/projects/〔project〕/〔sessionId〕/subagents/` 下的 `agent-〔agentId〕.jsonl` 保存子代理记录，可用于取得代理 ID；已停止的子代理在收到 `SendMessage` 时会自动恢复。`SendMessage` 工具仅在 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 启用 Agent teams 时可用。[@ref-costrict-agents-records]
- 权限或委派失败时，可核对：子代理文件是否在四个可发现位置之一（`--add-dir` 目录不扫描）、是否被 `deny: ["Agent(〔name〕)"]` 阻止、`tools`/`disallowedTools` 是否移除所需工具、父级权限模式是否覆盖了子代理设置。[@ref-costrict-agents-scopes][@ref-costrict-agents-deny][@ref-costrict-agents-permmode]
