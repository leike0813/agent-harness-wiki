---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-custom_agents-v1
harness_id: codebuddy
topic: custom_agents
title: "CodeBuddy Code（CLI）自定义子代理机制"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-codebuddy-agents-locations, ref-codebuddy-agents-plugin, ref-codebuddy-pluginsref-components, ref-codebuddy-agents-cli]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-codebuddy-agents-format, ref-codebuddy-cli-agents]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-codebuddy-settings-keys, ref-codebuddy-agents-builtin, ref-codebuddy-env-tools, ref-codebuddy-teams-vs, ref-codebuddy-teams-limits]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-codebuddy-agents-advanced, ref-codebuddy-agents-manage, ref-codebuddy-agents-resume, ref-codebuddy-agents-background]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-codebuddy-agents-model, ref-codebuddy-settings-subagents, ref-codebuddy-agents-tools, ref-codebuddy-agents-mcp, ref-codebuddy-settings-permissions]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-codebuddy-agents-limits, ref-codebuddy-agents-background]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-agents-manage, ref-codebuddy-cli-commands, ref-codebuddy-agents-resume, ref-codebuddy-plugins-troubleshoot, ref-codebuddy-agents-limits]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-codebuddy-agents-locations, ref-codebuddy-agents-plugin, ref-codebuddy-agents-cli]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-codebuddy-agents-format, ref-codebuddy-cli-agents]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-codebuddy-agents-builtin, ref-codebuddy-teams-vs]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-codebuddy-agents-advanced, ref-codebuddy-agents-manage, ref-codebuddy-agents-background]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-codebuddy-agents-model, ref-codebuddy-settings-subagents, ref-codebuddy-agents-tools, ref-codebuddy-agents-mcp, ref-codebuddy-settings-permissions]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-codebuddy-agents-limits, ref-codebuddy-agents-background]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-codebuddy-agents-manage, ref-codebuddy-cli-commands]
---

本章固定来源为 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 `docs/sub-agents.md`、`docs/settings.md`、`docs/cli-reference.md`、`docs/agent-teams.md`、`docs/plugins-reference.md`、`docs/env-vars.md`。CodeBuddy Code（CLI）为闭源，本章按来源级知识记录。

机制边界：自定义 Agent（子代理）是「按任务预配置的 AI 人格」，与主代理共享同一套 Markdown + YAML frontmatter 定义方式；Agent Teams 是不同的多实例协作机制。原生内置代理与插件代理的来源可区分。

## 定义来源与发现 {#agents-entry}

子代理是带 YAML frontmatter 的 Markdown 文件，两个位置：项目子代理 `.codebuddy/agents/`（当前项目可用，优先级最高）、用户子代理 `~/.codebuddy/agents/`（所有项目可用，优先级较低）。名称冲突时项目级优先。[@ref-codebuddy-agents-locations]

插件可提供代理：插件在其 `agents/` 目录（或清单指定的自定义路径）包含代理，插件代理与用户定义代理一样出现在 `/agents` 中，可显式调用也可被自动调用。[@ref-codebuddy-agents-plugin] 出于安全考虑，插件代理支持 `name`、`description`、`model`、`effort`、`maxTurns`、`tools`、`disallowedTools`、`skills`、`memory`、`background`、`isolation`，但**不支持** `hooks`、`mcpServers` 和 `permissionMode`。[@ref-codebuddy-pluginsref-components]

第三种来源是 CLI：`--agents` 接一个 JSON 对象动态定义子代理，优先级低于项目级、高于用户级，适合会话专用或脚本场景。[@ref-codebuddy-agents-cli]

## 文件格式与字段 {#agents-format}

文件格式为 frontmatter + 系统提示正文，官方示例结构：

```markdown
---
name: your-sub-agent-name
description: 描述何时应该调用此子代理
tools: tool1, tool2, tool3
model: gpt-5.1-codex
permissionMode: default
skills: skill1, skill2
---

在这里编写子代理的系统提示。
```

片段取自 `docs/sub-agents.md`「文件格式」。[@ref-codebuddy-agents-format]

字段清单（同节表格）：`name`（必需，小写字母与连字符）、`description`（必需）、`tools`（可省略则继承主线程全部工具，支持 `Defer(X)`/`NoDefer(X)`）、`model`、`permissionMode`（`default`/`acceptEdits`/`bypassPermissions`/`plan`/`ignore`）、`skills`（启动时自动加载的技能）、`mcpServers`、`disallowedTools`、`effort`（`minimal`/`low`/`medium`/`high`/`xhigh`/`max`）、`maxTurns`、`background`、`initialPrompt`、`memory`（`user`/`project`/`local`）。[@ref-codebuddy-agents-format]

`--agents` 的 JSON 字段集与之一致但略少：必需 `description` 与 `prompt`，可选 `tools`、`disallowedTools`、`model`、`effort`、`maxTurns`、`background`、`initialPrompt`、`memory`。[@ref-codebuddy-cli-agents]

## 角色与实现来源 {#agents-roles}

主代理与子代理使用同一机制：`--agent` 或 settings 的 `agent` 键可把某个（内置或自定义）agent 设为主线程，应用其 system prompt、工具限制与模型配置。[@ref-codebuddy-settings-keys]

内置子代理开箱即用：`General-Purpose`（可读写文件、执行命令，可使用全部工具）、`Plan`（计划模式专用，使用 Read/Glob/Grep/Bash 收集上下文）、`Explore`（严格只读，工具限于 Glob/Grep/Read 与只读 Bash，按 quick/medium/very thorough 彻底程度调用）。[@ref-codebuddy-agents-builtin] 环境变量 `CODEBUDDY_DISABLE_BUILTIN_SUBAGENTS=1` 可屏蔽内置子代理（`general-purpose`/`fork`/`Explore`/`Plan`/`statusline-setup`），不影响自定义、插件与 Teams。[@ref-codebuddy-env-tools]

Agent Teams 与子代理不同：子代理在单一会话内运行、只能把结果报告给主代理；Team 成员拥有完全独立的上下文窗口、成员间可直接通信、通过共享任务列表自主认领任务，Token 消耗显著更高且已有已知限制。[@ref-codebuddy-teams-vs][@ref-codebuddy-teams-limits]

## 调用与委派 {#agents-invocation}

显式调用是自然语言提到子代理名（如「使用 code-reviewer 子代理检查我最近的更改」）；自动委派由主代理按任务与 `description` 匹配决定。[@ref-codebuddy-agents-advanced] `/agents` 提供交互式管理界面：查看全部（内置、用户、项目）、查看内置子代理生效路由值与来源、`Edit Model` 设置模型或 `lite`/`reasoning` 场景变体、`View Definition` 查看内置定义、引导式创建新子代理。[@ref-codebuddy-agents-manage]

高级能力：子代理可被链接（先 A 后 B 的顺序委派）、可恢复（每次执行分配 `agentId`，对话存于父 session 的 `subagents/agent-{agentId}.jsonl`，通过 `resume` 参数续跑）、可后台运行（`run_in_background: true`，用 `TaskOutput` 取状态与结果，工具调用自动处理权限而无需用户交互）。[@ref-codebuddy-agents-resume][@ref-codebuddy-agents-background]

## 覆盖：模型、工具、MCP、权限 {#agents-overrides}

模型解析链：`model` 可填模型 ID/名称/别名、场景变体 `lite`/`reasoning`，或 `inherit`/`default`（省略同义）。省略或 inherit 时按「环境变量 → 单次调用入参 → 按子代理设置 → 内置声明 → 主对话模型」的顺序解析。[@ref-codebuddy-agents-model] 内置子代理的模型可在 settings 的 `subagents.agents.<名称>.model` 中逐项配置，`variantModels` 把 `lite`/`reasoning` 映射到具体模型；两者均按名合并、支持用户全局与项目两种范围。[@ref-codebuddy-settings-subagents]

工具覆盖：省略 `tools` 继承主线程全部工具（含 MCP 工具），或给出逗号分隔白名单；`disallowedTools` 与 session 级同名设置取并集。[@ref-codebuddy-agents-tools] 子代理专属 MCP 有两种写法——引用已连接的全局 server（名称字符串），或声明 inline server（对象，含 `type`/`command`/`args`/`defer_loading`）。inline server 只在子代理 session 内创建、结束即关闭；安全策略上用户子代理允许 inline MCP，项目子代理需要项目本地批准（写入 `.codebuddy/settings.local.json` 的 `enabledMcpjsonServers`），插件代理直接忽略 `mcpServers`。[@ref-codebuddy-agents-mcp]

权限模式：`permissionMode` 控制子代理如何处理权限请求；settings 的 `permissions.subagentPermissionMode` 可覆盖所有 subagent 的默认模式，但 Agent 工具的 `mode` 入参优先级更高，且主会话处于 `auto`/`dontAsk` 时子代理仍受父会话权限上限约束。[@ref-codebuddy-settings-permissions]

## 边界：并发、嵌套、预算 {#agents-limits}

嵌套深度封顶 5 层（主会话为第 0 层，不可配置），超限时 Agent 工具报错；默认情况下子代理不持有 Agent 工具，只有定义里显式列出 `tools: Agent` 的 agent 才能继续嵌套。每个根会话树默认最多同时执行 20 个子代理（`CODEBUDDY_CODE_MAX_CONCURRENT_SUBAGENTS`），同步/后台/Team member/Skill/Workflow 的 AgentTask 共享该上限。每会话 spawn 预算默认 200 次（`CODEBUDDY_CODE_MAX_SUBAGENTS_PER_SESSION`），嵌套共享同一预算，`/clear` 后重置。同步前台调用默认不限时，只有设置正整数毫秒的 `CODEBUDDY_SUBAGENT_TIMEOUT_MS` 才启用墙钟超时。[@ref-codebuddy-agents-limits]

后台任务的 `TaskOutput` 参数：`task_id`（必需）、`block`（默认 `true`）、`timeout`（默认 60000，范围 0–600000，超时返回当前快照而非失败）；状态取值为 `pending`/`running`/`completed`/`failed`/`cancelled`/`killed`。[@ref-codebuddy-agents-background]

## 诊断 {#agents-diagnostics}

`/agents` 界面查看全部子代理及内置子代理的生效路由值与来源。[@ref-codebuddy-agents-manage] 命令行 `codebuddy agents [--json]` 按来源分组列出全部已配置子代理。[@ref-codebuddy-cli-commands] 子代理的运行数据落在 `~/.codebuddy/projects/{projectDir}/{parentSessionId}/subagents/`（对话 `agent-{agentId}.jsonl` 与 `tool-results/`）。[@ref-codebuddy-agents-resume] 插件代理的排查用 `--debug` 查看加载日志，并用 `/plugin-validate 〈path〉` 校验插件目录与 manifest。[@ref-codebuddy-plugins-troubleshoot] 委派失败的可观察入口是 Agent 工具的错误返回（如嵌套超限）与 `/agents` 中的定义展示。[@ref-codebuddy-agents-limits]
