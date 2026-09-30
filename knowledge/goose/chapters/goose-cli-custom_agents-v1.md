---
schema_version: 3
record_kind: production
edition_id: goose-cli-custom_agents-v1
harness_id: goose
topic: custom_agents
title: "Goose CLI 自定义 Agent 与子代理：定义、角色、调用、覆盖与诊断"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-recipe-schema, ref-goose-agents-src-recipe]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-external, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-params, ref-goose-agents-doc-recipe-subrecipes, ref-goose-agents-doc-subagents, ref-goose-agents-doc-when, ref-goose-agents-src-task-config]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-delegate, ref-goose-agents-doc-faq, ref-goose-agents-doc-list, ref-goose-agents-doc-load, ref-goose-agents-doc-subagents, ref-goose-agents-doc-use]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-max-turns, ref-goose-agents-src-settings]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-list, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-location, ref-goose-agents-doc-subagents]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: partial
        source_refs: [ref-goose-agents-doc-create]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-recipe-schema, ref-goose-agents-src-recipe]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: partial
        source_refs: [ref-goose-agents-doc-external, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-params, ref-goose-agents-doc-recipe-subrecipes, ref-goose-agents-doc-subagents, ref-goose-agents-doc-when, ref-goose-agents-src-task-config]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-goose-agents-doc-delegate, ref-goose-agents-doc-faq, ref-goose-agents-doc-list, ref-goose-agents-doc-load, ref-goose-agents-doc-subagents, ref-goose-agents-doc-use]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-max-turns, ref-goose-agents-src-settings]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-max-turns, ref-goose-agents-src-settings]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-list, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-location, ref-goose-agents-doc-subagents]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938` 的官方文档（Custom Agents、Subagents、Recipe Reference）与 Rust 源码快照。文档快照不含适用软件版本号；自定义 agent 的“定义文件”这一层只有文档证据，会话内真正被大规模使用的隔离执行体是 **subagent**，其参数有源码常量可核对（见下文标注）。

## 自定义 Agent 的定义位置与发现 {#agents-entry}

自定义 agent 是带 YAML frontmatter 的 Markdown 文件 [@ref-goose-agents-doc-create]：

| 作用域 | 目录 | 生效条件 |
| --- | --- | --- |
| 全局 | `~/.agents/agents/` | 所有会话可用 |
| 项目 | `PROJECT/.agents/agents/` | goose 在该项目工作时可用（按当前工作目录发现） |

文档还列出兼容发现路径：`.goose/agents/`、`.claude/agents/`、`~/.goose/agents/`、`~/.claude/agents/`、goose 的平台相关配置 agents 目录，以及项目本地 `.agents/agents/`；新写的 agent 建议使用 `.agents/agents/`（项目）或 `~/.agents/agents/`（全局）[@ref-goose-agents-doc-create]。目录不存在时需要自己创建 [@ref-goose-agents-doc-create]。

缺口：本次快照未包含 agent 文件发现与解析的实现文件，因此「发现深度、是否递归、同名冲突如何处理、重名时哪个作用域优先」在源码侧未确立；文档只说项目 agent 从当前工作目录发现、全局 agent 从 home/config 目录发现 [@ref-goose-agents-doc-create]。

## 定义文件格式 {#agents-format}

frontmatter 字段只有三个 [@ref-goose-agents-doc-create]：

| 字段 | 必需 | 说明 |
| --- | --- | --- |
| `name` | 是 | 用于列出、加载、`@` 提及与委派的名字 |
| `description` | 否 | 列出时的简介 |
| `model` | 否 | 该 agent 偏好的模型 |

Markdown 正文就是 agent 的指令，文档建议不要留空，否则该 agent 不会作为可用来源出现 [@ref-goose-agents-doc-create]。文档给出的最小示例（占位模型名按文档原样保留）[@ref-goose-agents-doc-create]：

```markdown
---
name: code-reviewer
description: Reviews code for correctness, maintainability, and risk
model: gpt-5.5
---

You are a senior code reviewer. Review changes for correctness, maintainability, security, and test coverage. Be direct, prioritize issues by severity, and suggest concrete fixes.
```

注意这一层与食谱（recipe）不是同一格式：recipe 是 YAML/JSON 文件，含 `title`、`description`、`instructions` 或 `prompt` 至少其一、以及可选的 `extensions`、`parameters`、`response`、`retry`、`settings`、`sub_recipes`；源码里 `Recipe` 结构的字段与文档一致 [@ref-goose-agents-src-recipe] [@ref-goose-agents-doc-recipe-schema]。

## 角色：主代理、子代理与扩展提供的实现 {#agents-roles}

文档把这一族机制分成四类，并明确各自定位 [@ref-goose-agents-doc-when]：

| 需求 | 机制 |
| --- | --- |
| 改变 goose 的角色、语气或指令 | 自定义 agent（定义“goose 应该是谁”） |
| 让 goose 按需加载某套工作流 | Skill |
| 打包可重复任务（提示、设置、扩展、参数） | Recipe |
| 把工作交给另一个隔离实例 | Subagent |

其中真正由宿主原生实现的隔离执行体是 **subagent**：文档说明内部 subagent 会“spawn goose 实例”，使用当前会话的上下文与扩展，有两种配置方式——直接提示词与 recipe [@ref-goose-agents-doc-subagents]。源码侧可核对的参数结构 `TaskConfig` 持有 `provider`、`model_config`、扩展列表与可选的 `max_turns` [@ref-goose-agents-src-task-config]，因此 subagent 是一个独立 provider 实例 + 独立扩展集，而不是主会话里的一段提示。

recipe 作为可复用的「角色 + 设置 + 扩展」包装，还提供两件与角色分工相关的能力：`parameters` 用 Jinja 风格 `{{name}}` 占位符与 `input_type`（`string`/`number`/`boolean`/`date`/`file`/`select`）、`requirement`（`required`/`optional`/`user_prompt`）声明参数并在运行前替换到 `instructions`、`prompt`、`activities` 中 [@ref-goose-agents-doc-recipe-params]；`sub_recipes` 让主 recipe 按名字调用子 recipe（字段 `name`、`path`、可选 `values`、`sequential_when_repeated`、`description`），用于固定的多步编排 [@ref-goose-agents-doc-recipe-subrecipes]。

外部 subagent 则通过 MCP server 引入（文档示例用 `codex` 作为 stdio 扩展起 subagent server）[@ref-goose-agents-doc-external]。扩展提供的委派能力来自 `summon` 平台扩展：它提供 `delegate` 与 `load` 两个工具，且当 recipe 显式写了 `extensions` 块时，默认平台扩展不会自动包含，需要显式加 `summon`（有 `sub_recipes` 的 recipe 会被自动注入 `summon`）[@ref-goose-agents-doc-recipe-extensions]。

## 调用方式与自动委派条件 {#agents-invocation}

自定义 agent 的三种用法 [@ref-goose-agents-doc-use]：

* 列出可用来源：在会话里让 goose「list available sources」（这是提示词不是终端命令），goose 会把可发现的 agent 与 recipe/subrecipe 一起列出 [@ref-goose-agents-doc-list]。
* 按名调用：`@code-reviewer review the current diff`，或在有提及选择器的界面里输入 `@` 选择 [@ref-goose-agents-doc-use]。
* 委派（delegate）：让 goose「Delegate to NAME: …」，委派的 agent 在**独立会话**中运行，可带自己的模型设置，部分界面还允许在委派时覆盖模型、provider、temperature、max turns [@ref-goose-agents-doc-delegate]。
* 加载（load）：让 goose「Load the NAME agent」把该 agent 的指令并入当前对话上下文，不另开会话；文档把 load（加进当前上下文）与 delegate（独立运行并返回结果）明确区分 [@ref-goose-agents-doc-load]。

Subagent 的触发与并发由自然语言驱动：文档说 goose 会自行判断是否 spawn，并行任务用「parallel / simultaneously / concurrently」之类措辞触发，顺序任务用「first…then / after」[@ref-goose-agents-doc-subagents]。**条件**：subagent 只在自主（auto）权限模式下可用，手动批准、智能批准与纯聊天模式下 subagent 被禁用 [@ref-goose-agents-doc-subagents]——这条是文档约束，本次快照没有对应源码可核对。

自定义 agent 与其他能力的边界（文档 FAQ）：agent 文件本身**不定义** MCP server 列表，只能用当前会话已启用的扩展；agent 可以被调度吗——不能，需要包成 recipe 再调度；agent 不含工作流，需要步骤/参数/扩展时用 recipe [@ref-goose-agents-doc-faq]。

## 覆盖、隔离与上限 {#agents-overrides}

**子代理层面**（有源码常量与文档双重证据）：

| 参数 | 默认 | 覆盖方式 | 证据 |
| --- | --- | --- | --- |
| max turns | `25`（常量 `DEFAULT_SUBAGENT_MAX_TURNS`） | 自然语言指定、`GOOSE_SUBAGENT_MAX_TURNS` 环境变量、recipe `settings.max_turns` 或 subagent 工具调用 | [@ref-goose-agents-src-max-turns] [@ref-goose-agents-doc-defaults] |
| 超时 | 5 分钟 | 在提示词里要求更长时间 | [@ref-goose-agents-doc-defaults] |
| 扩展 | 继承父会话 | 提示词里指定要用的扩展 | [@ref-goose-agents-doc-defaults] |
| provider / model | 继承会话 | `GOOSE_SUBAGENT_PROVIDER`、`GOOSE_SUBAGENT_MODEL`，或 recipe `settings` | [@ref-goose-agents-doc-defaults] |

优先级（文档，由高到低）：subagent 工具调用覆盖 > recipe `settings.max_turns` > `GOOSE_SUBAGENT_MAX_TURNS` > 默认值（主 recipe 1000，subagent 25）[@ref-goose-agents-doc-recipe-settings]；对 subagent，recipe `settings` 里的 `goose_provider`/`goose_model` 优先于 `GOOSE_SUBAGENT_PROVIDER`/`GOOSE_SUBAGENT_MODEL` [@ref-goose-agents-doc-recipe-settings]。recipe 的 `settings` 结构在源码里就是 `goose_provider`、`goose_model`、`temperature`、`max_turns` 四个可选字段 [@ref-goose-agents-src-settings]。

源码侧 `TaskConfig::new` 的构造顺序是：先读 `GOOSE_SUBAGENT_MAX_TURNS`，取不到就用常量 25 [@ref-goose-agents-src-max-turns]。文档还提到可用 `subagent_system.md` 提示模板改变子代理行为 [@ref-goose-agents-doc-defaults]。

限制与边界：文档建议「扩展控制」——默认继承父会话的全部扩展，可按安全/聚焦/性能需要限制 [@ref-goose-agents-doc-extension-control]；子代理之间有并行与顺序两种执行，单个子代理失败不影响其他成功的结果 [@ref-goose-agents-doc-monitor]。返回详略也可控：默认「Full Details」把工具执行与推理步骤全部带回主会话，也可以要求「Summary Only」只返回最终结果 [@ref-goose-agents-doc-return-mode]。

子代理的安全约束是**递归上限的直接证据**：允许的操作是扩展发现、已启用扩展的资源读取与列目录、以及 recipe 指定或从父会话继承的扩展工具；被明确阻止的操作包括（1）再次派生 subagent（原文理由即「防止无限递归」）、（2）启用/禁用/修改扩展（避免与主会话冲突）、（3）创建/修改/删除计划任务（避免干扰父工作流）[@ref-goose-agents-doc-allowed] [@ref-goose-agents-doc-restricted] [@ref-goose-agents-doc-security]。也就是说「子代理不能再派生子代理」有固定来源，而并发度与嵌套深度的数值上限没有记录。

## 诊断 {#agents-diagnostics}

* 列出：会话内「list available sources」，在来源加载可用时列出可发现的 agent（与 recipe、subrecipe 一起）[@ref-goose-agents-doc-list]。
* 观察执行：子代理的工具调用在会话里实时显示——CLI 用类似 `[subagent:16] text_editor | developer` 的行标出子代理标识、工具名与提供该工具的扩展 [@ref-goose-agents-doc-monitor]。
* 子代理失败或超时（默认 5 分钟）时**不会**返回任何输出；并行执行时只拿到成功子任务的结果 [@ref-goose-agents-doc-monitor]。
* 生命周期与清理：子代理是临时实例，任务结束即结束，无需手工清理 [@ref-goose-agents-doc-subagents]。

排查建议（按固定来源可确认的部分）：确认 agent 文件在文档列出的目录之一、frontmatter 里 `name` 存在、正文非空（否则不会作为可用来源出现）[@ref-goose-agents-doc-create]；确认 recipe 放在当前目录或 `GOOSE_RECIPE_PATH`（`GOOSE_RECIPE_GITHUB_REPO` 走 GitHub，需要 `gh` 已登录），因为 recipe 形式的子代理按同样路径查找 [@ref-goose-agents-doc-recipe-location]；子代理不出现时先确认会话是自主模式 [@ref-goose-agents-doc-subagents]；需要委派工具时确认 `summon` 扩展在启用列表中 [@ref-goose-agents-doc-recipe-extensions]。

缺口：agent 文件本身的解析错误、重名、权限拒绝等诊断入口未在固定来源中记录；本次快照未包含 agent 定义加载与委派工具的实现文件，除 `TaskConfig` 与 recipe 结构外的源码证据缺失。
