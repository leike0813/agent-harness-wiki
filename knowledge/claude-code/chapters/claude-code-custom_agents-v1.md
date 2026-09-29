---
schema_version: 2
record_kind: production
edition_id: claude-code-custom_agents-v1
harness_id: claude-code
topic: custom_agents
title: Claude Code 的自定义 agent 定义、角色与覆盖
sections:
  - section_id: agents-entry
    source_refs:
      - ref-cc-skills-adddir
      - ref-cc-agents-helper
      - ref-cc-agents-trust
  - section_id: agents-roles
    source_refs:
      - ref-cc-skills-subagent
      - ref-cc-agents-plugin
      - ref-cc-mcp-pluginservers
  - section_id: agents-overrides
    source_refs:
      - ref-cc-skills-subagent
      - ref-cc-skills-livechange
      - ref-cc-npm-readme
questions:
  - question_id: agents.entry
    section_id: agents-entry
    status: partial
    source_refs:
      - ref-cc-skills-adddir
      - ref-cc-agents-helper
      - ref-cc-agents-trust
  - question_id: agents.format
    section_id: agents-entry
    status: partial
    source_refs:
      - ref-cc-agents-helper
  - question_id: agents.roles
    section_id: agents-roles
    status: partial
    source_refs:
      - ref-cc-skills-subagent
      - ref-cc-agents-plugin
  - question_id: agents.invocation
    section_id: agents-roles
    status: partial
    source_refs:
      - ref-cc-skills-subagent
      - ref-cc-mcp-pluginservers
  - question_id: agents.overrides
    section_id: agents-overrides
    status: partial
    source_refs:
      - ref-cc-skills-subagent
      - ref-cc-skills-livechange
  - question_id: agents.limits
    section_id: agents-overrides
    status: unknown
    source_refs: []
  - question_id: agents.diagnostics
    section_id: agents-overrides
    status: unknown
    source_refs: []
---

## Agent 定义入口与格式 {#agents-entry}

固定来源中没有独立的 subagent 页面，agent 相关结论来自 Skills 与 MCP 两页的旁述，因此本章整体标记为 partial。

**agents.entry**：可确认的入口有三处。项目目录 `.claude/agents/` 与会话用 `--add-dir` 加入目录中的 `.claude/agents/`，因为加入目录会一并加载其 `.claude/commands/` 与 `.claude/agents/`；用户级 `~/.claude/agents/`；以及通过 `--agents` 传入或在 managed settings 中提供的 agent。插件也能携带 agents。这些位置来自对 MCP inline server 来源与加载范围的说明，而非单独的 agent 页面，检查到的直接入口即上述几处。 [@ref-cc-skills-adddir] [@ref-cc-agents-helper] [@ref-cc-agents-trust]

**agents.format**：来源只间接给出字段线索：agent 文件可以是 Markdown，可包含 name 与 description 之类的标识，可内联声明 MCP server，并可用 `tools` 字段限制工具、用 `skills` 字段预加载技能、用模型覆盖选择模型。完整的 frontmatter 字段表、必填项与解析规则在所引快照中没有出现，属于明确缺口。 [@ref-cc-agents-helper]

## 角色与调用 {#agents-roles}

**agents.roles**：内置 Explore、Plan、general-purpose 与用户自定义 subagent 走同一套 `agent` 选择机制；技能通过 `context: fork` 让指定 agent 类型隔离执行，`agent` 字段既可以填内置类型，也可以填 `.claude/agents/` 下的自定义 agent。插件可携带 agents，与 Skill、Hook、MCP server 并列作为插件组件。 [@ref-cc-skills-subagent] [@ref-cc-agents-plugin]

**agents.invocation**：Skill 的 `context: fork` 会把技能正文作为子代理任务并默认在后台运行，结果返回主对话；子代理还能以自身的 `skills` 字段预加载技能，或在被主代理委派时接收一条委派消息。插件携带的 server/agent 以插件名做命名空间。主代理何时自动委派、并发与选择规则在所引快照中没有展开。 [@ref-cc-skills-subagent] [@ref-cc-mcp-pluginservers]

## 覆盖、限制与诊断 {#agents-overrides}

**agents.overrides**：模型覆盖方面，agent 的模型取值遵循与 `/model` 相同的可选值集合，并且受组织 `availableModels` 白名单约束；工具方面，子代理可通过 `tools` 字段限定可用工具，插件携带的 MCP 工具名要在权限规则或子代理 `tools` 字段里写全限定名。agent 文件本身随插件组件更新时需 `/reload-plugins` 生效。provider、权限与沙箱的继承或覆盖规则没有在所引来源中出现。 [@ref-cc-skills-subagent] [@ref-cc-skills-livechange]

**agents.limits**：所引固定来源没有给出 subagent 的并发数、递归或嵌套深度、持续时间和上下文边界。已检查的直接入口是 Skills 页的 `context: fork` 与预加载说明、MCP 页的 agent 内联 server 信任说明，均未描述这些上限；补齐需要 subagent 官方页或精确包运行观察。

**agents.diagnostics**：所引固定来源没有描述如何确认 agent 定义被发现、可调用，或如何定位委派与权限失败，也没有出现对应的诊断命令或页面。已检查入口同上；这是明确缺口，不能用 Skills 或 MCP 的诊断入口替代。

关于版本：本章所引两页均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录版本 2.1.283，包内 README 只指向在线文档，不能据此把上述定义与字段固定到该精确版本。 [@ref-cc-npm-readme]

