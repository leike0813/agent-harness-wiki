---
schema_version: 3
record_kind: production
edition_id: junie-cli-custom_agents-v1
harness_id: junie
topic: custom_agents
title: "Junie CLI 的自定义子代理：定义位置、frontmatter、委派与工具边界"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-junie-agents-overview, ref-junie-quickstart-extend]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-junie-agents-locations, ref-junie-config-fields, ref-junie-env-agents, ref-junie-params-discovery, ref-junie-config-trust]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-junie-agents-format, ref-junie-agents-overview, ref-junie-agents-usage]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-junie-agents-usage, ref-junie-agents-settings]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-junie-agents-tools, ref-junie-agents-format]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-agents-usage, ref-junie-quickstart-transcript, ref-junie-agents-settings]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-junie-agents-locations, ref-junie-config-fields, ref-junie-env-agents, ref-junie-params-discovery, ref-junie-config-trust]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-junie-agents-format, ref-junie-agents-overview]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: partial
        source_refs: [ref-junie-agents-overview, ref-junie-agents-usage]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-junie-agents-usage, ref-junie-agents-settings]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-junie-agents-format, ref-junie-agents-tools]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-junie-agents-format, ref-junie-agents-tools]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-junie-agents-usage, ref-junie-quickstart-transcript, ref-junie-agents-settings]
---

## 固定来源与适用范围 {#agents-scope}

本章依据 Junie 官方文档站 `junie.jetbrains.com/docs` 的 `junie-cli-subagents.html`、
`junie-cli-configuration.html`、`environment-variables.html`、`parameters.html` 与
`junie-cli.html` 快照，未标注适用构建号，属来源级知识。Junie CLI 的“自定义 Agent”就是自定义
子代理（custom subagent）：主代理把匹配到某个子代理的任务委派出去，子代理在独立上下文里工作并把
结果带回主会话 [@ref-junie-agents-overview]。子代理是官方列出的扩展点之一，与 MCP、skills、
自定义斜杠命令、guidelines 并列 [@ref-junie-quickstart-extend]。

## 定义位置与作用域 {#agents-entry}

**agents.entry**。自定义子代理是存放在 `.junie/agents/` 或 `.agents/` 目录下的 Markdown 文件，
按作用域分四处 [@ref-junie-agents-locations]：

- 项目作用域：项目根 `.junie/agents/` 与项目根 `.agents/`。
- 用户作用域：macOS/Linux 的 `~/.junie/agents/` 与 `~/.agents/`，Windows 的
  `%USERPROFILE%\.junie\agents\` 与 `%USERPROFILE%\.agents\`。

发现开关与额外目录：`config.json` 的 `agent-locations`（额外目录）与 `agent-default-locations`
（默认位置开关）；CLI 为 `--agent-location`/`--agent-default-location`，环境变量为
`JUNIE_AGENT_LOCATIONS`/`JUNIE_AGENT_DEFAULT_LOCATIONS`（默认 `true`）
[@ref-junie-config-fields][@ref-junie-env-agents][@ref-junie-params-discovery]。未受信任的项目不会
隐式加载项目级自定义 agent [@ref-junie-config-trust]。

## 文件格式与字段 {#agents-format}

**agents.format**。子代理文件用 YAML frontmatter 存放元数据，其后是 Markdown 正文，正文作为该子
代理的系统提示，并会与主代理委派过来的指令合并 [@ref-junie-agents-overview]。最小示例（取自官方
文档）：

```markdown
---
name: "changelog"
description: "Write a changelog entry for a PR"
---

You are a changelog assistant.

Given the PR title and description, produce a short changelog entry.
```

frontmatter 字段 [@ref-junie-agents-format]：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | String | 否 | 子代理名；缺省时用文件名（去扩展名）。必须匹配 `[a-z][a-z0-9_-]*`。 |
| `description` | String | 是 | 主代理据此判断何时委派。 |
| `tools` | List | 否 | 工具组允许清单，非空时只放行列出项。 |
| `disallowedTools` | List | 否 | 工具组禁止清单，在 `tools` 过滤之后应用。 |
| `mcpServers` | List | 否 | MCP server 允许清单，非空时只暴露列出的 server 的工具。 |
| `model` | String | 否 | 该子代理固定使用的模型。 |
| `permissionMode` | String | 否 | `default`、`acceptEdits`、`dontAsk`、`bypassPermissions`、`plan`，默认 `default`。 |
| `reasoningLevel` | String | 否 | 推理强度覆盖；`effort` 作为别名且优先。 |
| `maxTurns` | Int | 否 | 该子代理的步数上限（正整数），覆盖默认步数限制。 |
| `skills` | List | 否 | 为子代理加载的 agent skill 名称。 |
| `allowPromptArgument` | Boolean | 否 | 为 `true` 时额外暴露 `$prompt` 参数。 |

**agents.roles**：固定来源把机制集中在“主代理 + 子代理”两层，主代理负责发现、选择并委派，子代理
独立执行后回传结果 [@ref-junie-agents-overview][@ref-junie-agents-usage]。文档没有区分原生实现与
扩展提供的实现，也没有描述除主代理/子代理之外的特殊角色，因此本项按 partial 阅读。

## 调用与选择 {#agents-invocation}

**agents.invocation**。Junie 自动调用子代理：主代理发现所有可用子代理，按 `name` 与 `description`
匹配当前任务，把任务作为子任务运行并把结果带回主会话，同时告知用户哪个子代理开始工作
[@ref-junie-agents-usage]。使用策略在 `/settings` → Subagents 里配置，取值
`SameModelOnly`（只用于可并行、能缩短耗时的独立工作，子代理与主代理同模型）或 `Auto`（默认，可在不
拖慢会话时选择更便宜但有能力的模型档位）；该设置保存在 `~/.junie/settings.json`，对新会话生效，
且只在当前环境启用子代理时才出现 [@ref-junie-agents-settings]。固定来源没有描述用户显式点名调用
子代理的命令或语法，因此本项按 partial 阅读。

## 模型、工具与边界 {#agents-limits}

**agents.overrides**：每个子代理可在 frontmatter 里覆盖模型（`model`，部分构建支持 `sonnet`、
`opus`、`grok` 等别名与 `custom:档案ID` 形式）、推理强度
（`reasoningLevel`/`effort`，由 Junie 映射到所选模型的 provider 专有推理字段）、工具与权限
（`tools`/`disallowedTools`/`permissionMode`）、可用的 MCP server（`mcpServers`）以及要加载的
skills（`skills`）[@ref-junie-agents-format]。内置工具组共八类：`Read`、`Bash`、`Glob`、`Grep`、
`Write`、`Edit`、`WebSearch`、`AskUserQuestion`；`tools` 非空时只放行列出组，其余默认禁止，再叠加
`disallowedTools` [@ref-junie-agents-tools]。

**agents.limits**：文档确立的边界是 `maxTurns`（覆盖默认步数上限）与可选工具/MCP/skill 允许清单
[@ref-junie-agents-format]。并发、递归或嵌套深度、持续时间与上下文上限在固定来源中没有描述，因此
本项按 partial 阅读 [@ref-junie-agents-tools]。

## 诊断 {#agents-diagnostics}

**agents.diagnostics**：Junie 在委派时会告知用户哪个子代理接手了任务
[@ref-junie-agents-usage]。会话记录可核对子代理行为：`Ctrl+O` 默认打开会话目录下的
`transcript.md`，子代理的记录放在会话的 `subagents` 文件夹内，查看某个子代理任务时 `Ctrl+O` 打开
对应记录 [@ref-junie-quickstart-transcript]。环境是否启用子代理会影响 `/settings` 里 Subagents 项
是否出现，可据此判断子代理能力是否可用 [@ref-junie-agents-settings]。固定来源没有提供列出子代理或
检查委派失败的专门命令，因此本项按 partial 阅读。
