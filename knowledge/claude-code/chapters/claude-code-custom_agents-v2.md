---
schema_version: 2
record_kind: production
edition_id: claude-code-custom_agents-v2
harness_id: claude-code
topic: custom_agents
title: Claude Code 的 Agent 定义、角色与覆盖
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

Claude Code 用“agent”这个单位把一段专门化工作交给子代理执行：内置的 Explore、Plan、general-purpose 与你定义的 subagent 走同一套选择机制，Skill 也可以指定某个 agent 类型在自己的会话里运行。固定快照里没有独立的 subagent 页面，agent 结论散见于 Skills 与 MCP 两页的旁述，所以本章整体标记为 partial，缺失处直接写明缺口。

## Agent 定义入口与文件格式 {#agents-entry}

可以确认的定义入口有四处：项目目录 `.claude/agents/`；用 `--add-dir` 或 `/add-dir` 加入的目录中的 `.claude/agents/`，因为加入目录会一并加载它的 `.claude/commands/` 与 `.claude/agents/`；用户级 `~/.claude/agents/`；以及通过 `--agents` 传入、或在 managed settings 中提供的 agent。插件也能携带 agents，与 Skill、Hook、MCP server 并列作为插件组件。这些结论来自对加载范围与插件组件的说明，而非单独的 agent 页。 [@ref-cc-skills-adddir] [@ref-cc-agents-helper] [@ref-cc-agents-plugin]

agent 文件里的内联 MCP server 受工作区信任约束：Claude Code 按 agent 文件的来源判断，若它来自项目 `.claude/agents/` 或 `--add-dir` 目录，则在信任该目录本身之前不会加载这个 server，helper 也就不会运行；来自 `~/.claude/agents/`、managed settings 或 `--agents` 的内联 server 不在此列。 [@ref-cc-agents-trust]

文件格式方面，来源只给出间接线索：agent 文件可以是 Markdown，可带 name 与 description 之类的标识，可内联声明 MCP server，并可用 `tools` 字段限制工具、用 `skills` 字段预加载技能、用模型覆盖选择模型。完整的 frontmatter 字段表、必填项与解析规则在所引快照中没有出现，属于明确缺口，因此本节不给出可复制的定义文件示例。 [@ref-cc-agents-helper]

## 角色、委派与调用 {#agents-roles}

内置的 Explore、Plan、general-purpose 与用户自定义 subagent 共用一套 agent 选择机制。Skill 通过 `context: fork` 让指定 agent 类型隔离执行，`agent` 字段既可以填内置类型，也可以填 `.claude/agents/` 下的自定义 agent，省略时用 general-purpose。 [@ref-cc-skills-subagent]

插件可以携带 agents；插件组件与 Skill、Hook、MCP server 并列，插件内的 agent 以插件名做命名空间，与手动配置的对应组件并存。 [@ref-cc-agents-plugin]

调用方向上有两条：Skill 用 `context: fork` 时，Claude Code 开一个不共享当前对话历史的新子代理，把 Skill 正文作为它的提示词，并在完成后把结果带回主对话；自定义子代理则可以用自身的 `skills` 字段预加载技能作为参考资料。插件携带的 server 与 agent 以插件名命名空间注册，例如 `plugin:插件名:server名`，其工具在权限规则或子代理 `tools` 字段里要写全限定名。主代理何时自动委派、并发与选择规则在所引快照中没有展开，属于缺口。 [@ref-cc-skills-subagent] [@ref-cc-mcp-pluginservers]

## 覆盖、限制与诊断 {#agents-overrides}

模型覆盖方面，agent 的模型取值遵循与 `/model` 相同的可选值集合，并受组织 `availableModels` 白名单约束。工具方面，子代理可用 `tools` 字段限定可用工具；插件携带的 MCP 工具必须在权限规则或子代理 `tools` 字段里写全限定名才命中。agent 文件本身随插件组件更新时需要 `/reload-plugins` 才生效，而 Skill 文本可热更新。provider、权限与沙箱如何在父子之间继承或覆盖，在所引来源中没有出现，属于缺口。 [@ref-cc-skills-subagent] [@ref-cc-skills-livechange]

并发数、递归或嵌套深度、持续时间和上下文边界：所引固定来源没有给出。已检查的直接入口是 Skills 页的 fork 与预加载说明、MCP 页的 agent 内联 server 信任说明，均未描述这些上限；补齐需要 subagent 官方页或精确包运行观察。 [@ref-cc-agents-helper]

如何确认 agent 定义被发现、可调用，以及如何定位委派与权限失败：所引固定来源没有描述，也没有出现对应的诊断命令或页面。这是明确缺口，不能用 Skill 或 MCP 的诊断入口替代。已检查的入口仍是 Skills 页的 fork 说明与 MCP 页的信任说明。 [@ref-cc-skills-subagent]

关于版本：本章所引页面均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，包内 README 只指向在线文档，不能据此把上述定义与字段固定到该精确版本。 [@ref-cc-npm-readme]
