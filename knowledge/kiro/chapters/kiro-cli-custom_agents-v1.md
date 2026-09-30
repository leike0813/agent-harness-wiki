---
schema_version: 3
record_kind: production
edition_id: kiro-cli-custom_agents-v1
harness_id: kiro
topic: custom_agents
title: "Kiro CLI 的自定义 Agent：定义、调用与子代理"
sections:
  - section_id: agents-overview
    surface_ids: [cli]
    source_refs: [ref-kiro-agents-intro, ref-kiro-builtin-agents, ref-kiro-builtin-default, ref-kiro-builtin-spec, ref-kiro-builtin-plan, ref-kiro-builtin-guide, ref-kiro-subagents-how, ref-kiro-agents-mcp, ref-kiro-harness-surfaces]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-kiro-agents-locations, ref-kiro-agents-precedence, ref-kiro-agents-fileloc, ref-kiro-config-paths, ref-kiro-config-intro, ref-kiro-agents-formats, ref-kiro-agents-create, ref-kiro-agents-options, ref-kiro-agents-dirvalues, ref-kiro-clicmd-agent]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-kiro-agentref-fields, ref-kiro-v3agent-fields, ref-kiro-v3agent-tags, ref-kiro-agentref-tools, ref-kiro-agentref-allowed, ref-kiro-agentref-security, ref-kiro-agentref-permissions, ref-kiro-agentref-resources, ref-kiro-agentref-prompt, ref-kiro-agentref-mcpservers, ref-kiro-agentref-includemcp, ref-kiro-agentref-model, ref-kiro-agentref-keyboard, ref-kiro-agentref-hooks]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-kiro-agents-using, ref-kiro-builtin-switch, ref-kiro-slash-agent, ref-kiro-settings-chat, ref-kiro-headless-agent, ref-kiro-subagents-how, ref-kiro-subagents-builtin, ref-kiro-subagents-tools]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-kiro-v3agent-fields, ref-kiro-agentref-inherit, ref-kiro-subagents-inherit, ref-kiro-permissions-capabilities, ref-kiro-subagents-parallel, ref-kiro-subagents-dag, ref-kiro-subagents-review, ref-kiro-subagents-runtime, ref-kiro-subagents-access, ref-kiro-settings-api, ref-kiro-agents-surface]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-agentstrouble-testing, ref-kiro-clicmd-agent, ref-kiro-agentstrouble-loading, ref-kiro-agentstrouble-perm, ref-kiro-agentref-upgrade, ref-kiro-slash-config]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-kiro-agents-locations, ref-kiro-agents-precedence, ref-kiro-clicmd-agent]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-kiro-agentref-fields, ref-kiro-v3agent-fields]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-overview
        status: answered
        source_refs: [ref-kiro-builtin-agents, ref-kiro-subagents-how]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-kiro-builtin-switch, ref-kiro-headless-agent, ref-kiro-subagents-how]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-kiro-agentref-inherit, ref-kiro-subagents-inherit, ref-kiro-permissions-capabilities]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-kiro-subagents-dag, ref-kiro-subagents-review, ref-kiro-settings-api, ref-kiro-subagents-runtime]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-kiro-agentstrouble-testing, ref-kiro-agentstrouble-loading]
---

## Agent 模型与角色 {#agents-overview}

Kiro 的 agent 是"一套配置"：每个自定义 agent 由一个配置文件定义它能看到哪些工具、有哪些权限、启动时加载哪些上下文。官方文档开头的能力表（CLI 列）确认项目级 agent（`.kiro/agents/`）、全局 agent（`~/.kiro/agents/`）、UI 内切换 agent、修改 agent 设置四项在 CLI 都可用。[@ref-kiro-agents-intro]

**主 agent、内置 agent 与子 agent 用同一套机制**：内置 agent 也是用同一 agent 框架预配置并随产品维护的，可以在会话中切换或通过专用命令调用。CLI 内置 agent 的用途表：[@ref-kiro-builtin-agents]

| Agent | 用途 |
| :-- | :-- |
| Default | 通用编码助手（会话默认起点） |
| Spec / Quick Spec / Bug Fix | 结构化特性开发 / 免审批门的快速 spec / 结构化缺陷排查 |
| Plan | 执行前的只读规划 |
| Guide | CLI 专用：基于随安装版本索引的文档回答 Kiro 自身问题（终端 UI） |
| Help | CLI 专用：同上的 classic 界面版本 |

Default agent 拥有全部内置工具、MCP 与工作区上下文，任何会话都从它开始。[@ref-kiro-builtin-default] Spec 系列把需求/设计/任务写入 `.kiro/specs/`，CLI 用 `/spec new|run|NAME` 驱动。[@ref-kiro-builtin-spec] Plan agent 只读，可读文件、代码智能、搜索与 web search，但不能写文件、执行命令或调用 MCP 工具，批准后交给默认 agent 执行。[@ref-kiro-builtin-plan] Guide/Help agent 用内置 `introspect` 工具做文档检索（语义 + BM25 混合），回答与已安装版本对齐。[@ref-kiro-builtin-guide]

子 agent 不是另一套格式：任何自定义 agent 都可以被当作子 agent 调用，主 agent 按它们的 `description` 选择，或由用户显式指名。[@ref-kiro-subagents-how]

自定义 agent 与内置工具/MCP 的关系：`tools` 字段决定内置工具与 `@server` 形式 MCP 工具的可见集合，`toolAliases` 用来消解不同 MCP server 之间的同名冲突。[@ref-kiro-agents-mcp] 所有 surface 共享同一个统一 agent harness，配置一次即对 CLI/IDE/Web 生效（各 surface 能读到的范围不同）。[@ref-kiro-harness-surfaces]

## 定义位置、发现与创建 {#agents-entry}

**存储位置**（两种格式、两个作用域）：[@ref-kiro-agents-locations]

- 工作区：`.kiro/agents/NAME.json` 或 `.kiro/agents/NAME.md`，随版本控制共享，只在工作区被信任时加载；
- 全局：`~/.kiro/agents/NAME.json` 或 `~/.kiro/agents/NAME.md`，对所有项目可用。

支持嵌套目录，**agent 名是相对 agents 目录的路径去掉扩展名**，例如 `~/.kiro/agents/team/planner.md` 的名字是 `team/planner`。[@ref-kiro-agents-locations]

**优先级**：同名时工作区 agent 覆盖全局 agent，并给出警告。[@ref-kiro-agents-precedence] 创建指南再次确认查找顺序是"先 `.kiro/agents/`，再 `~/.kiro/agents/`；同名本地优先并告警"。[@ref-kiro-agents-fileloc]

配置作用域参考页把 agent 目录列在 "File paths" 表的全局/项目两列（`.kiro/agents/` 与 `~/.kiro/agents/`），并注明 agent scope 是第三种作用域（`.kiro/agents/` 或 `~/.kiro/agents/`）。[@ref-kiro-config-paths][@ref-kiro-config-intro]

**两种等价格式**：JSON（适合程序生成）与 Markdown（YAML frontmatter 放配置、正文作 system prompt），字段完全一致。[@ref-kiro-agents-formats]

**创建入口**：

- CLI 内斜杠命令 `/agent create`（AI 辅助，默认）或 `/agent create NAME --manual`（编辑器手写）；`--from AGENT` 以既有 agent 为模板；`--directory` 取 `workspace`、`global`（默认）或自定义路径；`--description`、`--mcp-server` 仅在 AI 辅助模式下可用；`/agent generate` 是 `/agent create` 的别名。[@ref-kiro-agents-create][@ref-kiro-agents-options][@ref-kiro-agents-dirvalues]
- 终端命令：`kiro-cli agent create NAME`、`kiro-cli agent edit [name]`、`kiro-cli agent list`、`kiro-cli agent validate PATH`、`kiro-cli agent migrate`、`kiro-cli agent set-default NAME`。[@ref-kiro-clicmd-agent]

最小 Markdown agent（来自官方 "Quick start"，字段名原样）：[@ref-kiro-agents-create]

```markdown
---
name: backend-dev
description: Backend development specialist
model: claude-sonnet-4
tools: ["read", "write", "shell"]
permissions:
  rules:
    - capability: shell
      match: ["npm *", "git *"]
      effect: allow
---

You are a backend engineer focused on Node.js and TypeScript.
Always use async/await. All database queries must be parameterized.
```

## 配置字段 {#agents-format}

官方配置参考列出全部可写段：`name`、`description`、`prompt`、`mcpServers`、`tools`、`toolAliases`、`allowedTools`、`permissions`、`toolsSettings`（已弃用）、`resources`、`hooks`、`includeMcpJson`、`model`、`keyboardShortcut`、`welcomeMessage`。[@ref-kiro-agentref-fields]

CLI 3.0 相对 2.x 的新增/变更字段（官方 "New fields reference"）：`excludedTools`（即使 `tools` 允许也排除）、`includeMcpJson`、`includePowers`、`resources`（支持 `file://`、`skill://`）、`permissions`、`welcomeMessage`、`hooks`（仅 CLI，内联 hook 定义，与 `.kiro/hooks/` 同 schema）；`toolsSettings` 在 V3 移除。[@ref-kiro-v3agent-fields]

**tools 标签体系**（V3 起用短标签代替具体工具名，新工具进入同类目时自动生效）：[@ref-kiro-v3agent-tags]

| 标签 | 包含 |
| :-- | :-- |
| `read` | read_file、read_files、list_directory、file_search、grep_search、code |
| `write` | fs_write、str_replace、delete_file |
| `shell` | execute_bash、control_bash_process |
| `web` | web_fetch、web_search |
| `subagent` / `knowledge` / `todo_list` | 对应类目 |
| `@mcp` / `@builtin` / `*` | 全部 MCP 工具 / 全部内置工具 / 全部工具 |

参考页另有一张更宽的标签表（含 `read` 覆盖文件读取、目录列举、搜索；`write` 覆盖写入、编辑、删除），并说明 `tools` 里的 MCP 工具写作 `@server_name` 或 `@server_name/tool_name`。[@ref-kiro-agentref-tools]

**allowedTools**：免提示即可使用的工具集合，支持 `*`、`?` 通配与 `@server/*` 模式，精确匹配优先于模式，大小写敏感；它**不支持** `"*"` 通配来放行全部工具。官方同时警告：放行写工具后 agent 与你的账号同权限，可读写整个 `~/.kiro`（含 skills、steering、mcp.json、其它 agent 配置）。[@ref-kiro-agentref-allowed][@ref-kiro-agentref-security]

**permissions**：agent 作用域的内联策略规则，字段为 `capability`（`fs_read`/`fs_write`/`shell`/`web_fetch`/`web_search`/`mcp`/`subagent`/`all` 等）、`match`（glob）、`effect`（`allow`/`ask`/`deny`）、可选 `exclude`；deny-overrides 生效。[@ref-kiro-agentref-permissions]

**resources**：`file://` 资源在 agent 启动时直接读入上下文；`skill://` 只加载元数据、正文按需加载；两者都支持具体路径、glob 与绝对/相对路径。还支持对象形式的知识库资源（`type: knowledgeBase`、`source`、`name`、可选 `description`/`indexType`/`autoUpdate`）。[@ref-kiro-agentref-resources]

**prompt** 支持内联文本或 `file://` URI，相对路径按 agent 配置文件所在目录解析，绝对路径原样使用。[@ref-kiro-agentref-prompt]

**mcpServers / includeMcpJson**：agent 内联 server 定义（本地 `command`+`args`+`env`+`timeout`，远程 `url`+`headers`+`oauth`+`oauthScopes`）；`includeMcpJson: true` 时叠加工作区/用户 `mcp.json`。[@ref-kiro-agentref-mcpservers][@ref-kiro-agentref-includemcp]

**model**：模型 ID 必须匹配 Kiro 模型服务返回的可用模型；不可用时回退默认模型并给出警告。可用模型用 `/model` 查看。[@ref-kiro-agentref-model]

**keyboardShortcut**：形如 `ctrl+a`/`shift+b`，同一快捷键被多个 agent 使用时记录警告并禁用，改用 `/agent swap`。[@ref-kiro-agentref-keyboard]

**hooks**（仅 CLI）：内联 hook 定义，触发器为 `agentSpawn`/`userPromptSubmit`/`preToolUse`/`postToolUse`/`stop`（此为文档示例中列出的内置触发器），每条含 `command` 与可选 `matcher`。[@ref-kiro-agentref-hooks]

## 调用与委派 {#agents-invocation}

- **启动时指定**：`kiro-cli --agent my-agent` 用指定 agent 开启会话。[@ref-kiro-agents-using]
- **会话中切换**：`/agent swap`（交互选择）或 `/agent swap my-agent`（按名直切）；切换后 agent 的工具、权限、prompt 从下一条消息生效。CLI 上的 agent picker 会在 `kiro-cli agent list`/`/agent list` 中列出可选 agent。[@ref-kiro-builtin-switch][@ref-kiro-slash-agent]
- **启动器默认**：`kiro-cli settings chat.defaultAgent NAME` 设置默认 agent。[@ref-kiro-settings-chat]
- **非交互/无头**：`--agent NAME` 指定运行 agent；未指定时新 V3 运行取 `chat.defaultAgent`，再退回内置默认；被恢复的会话沿用创建时的 agent 与模型。[@ref-kiro-headless-agent]
- **子 agent 委派**：主 agent 根据 `description` 自动选择，或用户显式指名（"Use the code-reviewer agent to analyze ..."）。子 agent 用独立上下文窗口运行，完成后把结果交回主 agent。Kiro 还内置两个内部子 agent（Context gathering、General purpose），无需配置。[@ref-kiro-subagents-how][@ref-kiro-subagents-builtin]
- **编排 agent 需要 subagent 工具**：自定义 agent 若要用 `invoke_sub_agent` 委派，必须在自己的 `tools` 数组里包含 `subagent`（或用 `@builtin`）。子 agent 可用工具由**子 agent 自己的配置**决定，不在父 agent 里限制。[@ref-kiro-subagents-tools]
- **workflow 开启时的差异**：当主会话启用 workflows，主 agent 不调用 `invoke_sub_agent`，而是通过 `run_workflow(agent://NAME)` 启动后台委派；workflow 内的自定义 agent 仍可在其工具允许时调用子 agent。[@ref-kiro-subagents-how]

## 覆盖、继承与边界 {#agents-overrides}

**声明式覆盖**：agent 可指定 `model`、`tools`/`excludedTools`、`allowedTools`、`permissions`、`mcpServers`、`resources`、`hooks` 等，覆盖默认行为。`excludedTools` 从 `tools` 允许的集合中再剔除。[@ref-kiro-v3agent-fields]

**默认资源继承**：默认情况下自定义 agent 会继承默认资源（steering、skills、`AGENTS.md`）；用 `kiro-cli settings chat.disableInheritingDefaultResources true` 可关闭（也可 `--workspace` 限定作用域），关闭后内置 agent 仍照常继承。[@ref-kiro-agentref-inherit]

**子 agent 继承什么**：steering、MCP server、工作区文件访问、permissions 配置与主 agent 共享；对话历史、上下文窗口、spec 状态、hook 触发是每个子 agent 隔离的。[@ref-kiro-subagents-inherit] 权限按 deny-wins 交集继承：父会话的 allow/deny/ask 全部适用，任一更严格的一方生效。[@ref-kiro-permissions-capabilities]

**并发与图结构**：子 agent 并行运行；任务图（DAG）在执行前一次性规划且执行中不可修改——先并行独立任务，再等依赖完成后启动后续任务。[@ref-kiro-subagents-parallel][@ref-kiro-subagents-dag] 审查回环用 `target`/`trigger`/`max_iterations`（1–10）表达，禁止自我回环与 A→B→A 互环，触发词至少 4 个字符。[@ref-kiro-subagents-review]

**非交互子 agent 的审批**：工作目录内的 `fs_read` 自动放行，目录外仍提示；`is_interactive` 为 false 的子 agent 若遇到需要审批的工具会快速失败，官方建议把这类 agent 加入 `toolsSettings.subagent.trustedAgents`。[@ref-kiro-subagents-runtime][@ref-kiro-subagents-access]

**空闲超时**：`api.subagentTimeout` 控制子 agent 空闲多久后超时（默认 `3600` 秒），避免拖住父轮次。[@ref-kiro-settings-api]

**surface 差异**：IDE 与 CLI 可以把自定义 agent 选为主会话 agent；Web 能用提交到 `.kiro/agents/` 的项目级 agent 做子 agent 委派，但不能选为主会话 agent；Mobile 只用内置 agent。[@ref-kiro-agents-surface]

## 诊断与迁移 {#agents-diagnostics}

- `/agent list` 查看可选 agent；`/agent schema` 校验配置结构；`kiro-cli agent validate PATH` 校验某个配置文件；`kiro-cli agent list` 列出可用 agent。[@ref-kiro-agentstrouble-testing][@ref-kiro-clicmd-agent]
- 常见失败：JSON 语法错误会导致 agent 不出现或回退默认 agent；字段名/类型错误用 `/agent schema` 对照；agent 不出现时检查文件位置（`.kiro/agents/` 或 `~/.kiro/agents/`）、可读权限、文件名与要用的名字是否一致。[@ref-kiro-agentstrouble-loading]
- 工具不可用或意外提示：确认 `tools` 与 `allowedTools` 里的名字拼写一致、MCP 工具用 `@server/tool` 全名、`toolAliases` 正确应用；`/tools` 列表为空多半是 `tools` 为空或名字拼错。[@ref-kiro-agentstrouble-perm]
- 系统化测试顺序（官方）：校验 JSON → `/agent schema` → `/agent list` → `/agent swap NAME` → 逐个工具验证权限 → 验证 resources 与 hooks 提供的上下文 → 跑常见工作流。[@ref-kiro-agentstrouble-testing]
- 迁移：`/upgrade-agent` 扫描工作区与全局 agent，备份原件（`.json.bak`）并就地转换受支持字段（`toolsSettings.shell.allowedCommands` → `permissions.rules`、对象形式 hooks → V3 数组形式等）；`/upgrade-agent diagnostics` 复查已升级项与转换警告。`kiro-cli agent migrate` 也可把 v2 配置迁移到 V3 格式。[@ref-kiro-agentref-upgrade][@ref-kiro-clicmd-agent]
- `/config` 在 V3 会话里给出 agents、MCP、Powers、Steering、Skills、Hooks 的配置总览，并能从 Agents 分类打开 agent picker。[@ref-kiro-slash-config]
