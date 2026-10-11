---
schema_version: 3
record_kind: production
edition_id: goose-cli-custom_agents-v3
harness_id: goose
topic: custom_agents
title: "Goose CLI 自定义 Agent 与子代理：定义、角色、调用、覆盖与诊断"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create, ref-goose-agents-src-agent-dirs-20261009]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-recipe-schema, ref-goose-agents-src-recipe]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-external, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-params, ref-goose-agents-doc-recipe-subrecipes, ref-goose-agents-doc-subagents, ref-goose-agents-doc-when, ref-goose-agents-src-task-config-20261009, ref-goose-agents-src-platform-ext-list-20261009]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-delegate, ref-goose-agents-doc-faq, ref-goose-agents-doc-list, ref-goose-agents-doc-load, ref-goose-agents-doc-subagents, ref-goose-agents-doc-use, ref-goose-agents-doc-summon-sync-delegate-20261009]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-env-subagent-max-turns-20261009, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-build-task-config-20261009, ref-goose-agents-src-delegate-schema-20261009, ref-goose-agents-src-max-turns, ref-goose-agents-src-resolve-max-turns-20261009, ref-goose-agents-src-settings, ref-goose-agents-src-subagent-config-20261009, ref-goose-agents-src-subagent-config-resolve, ref-goose-agents-src-foreground-provider-gate]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-list, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-location, ref-goose-agents-doc-subagents, ref-goose-agents-src-subagent-cancelled-outcome, ref-goose-agents-src-subagent-cancelled-message, ref-goose-agents-src-cli-drain-stopped-run, ref-goose-agents-src-cli-stop-breaks-stream, ref-goose-agents-src-extension-selection-unique, ref-goose-agents-src-lease-start-on-demand, ref-goose-agents-src-subagent-session-extension-state, ref-goose-agents-src-foreground-delegate-unique]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-goose-agents-doc-create, ref-goose-agents-src-agent-dirs-20261009]
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
        source_refs: [ref-goose-agents-doc-external, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-params, ref-goose-agents-doc-recipe-subrecipes, ref-goose-agents-doc-subagents, ref-goose-agents-doc-when, ref-goose-agents-src-task-config-20261009, ref-goose-agents-src-platform-ext-list-20261009]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-goose-agents-doc-delegate, ref-goose-agents-doc-faq, ref-goose-agents-doc-list, ref-goose-agents-doc-load, ref-goose-agents-doc-subagents, ref-goose-agents-doc-use, ref-goose-agents-doc-summon-sync-delegate-20261009]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-env-subagent-max-turns-20261009, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-build-task-config-20261009, ref-goose-agents-src-delegate-schema-20261009, ref-goose-agents-src-max-turns, ref-goose-agents-src-resolve-max-turns-20261009, ref-goose-agents-src-settings, ref-goose-agents-src-subagent-config-20261009, ref-goose-agents-src-subagent-config-resolve, ref-goose-agents-src-foreground-provider-gate]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-env-subagent-max-turns-20261009, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-build-task-config-20261009, ref-goose-agents-src-delegate-schema-20261009, ref-goose-agents-src-max-turns, ref-goose-agents-src-resolve-max-turns-20261009, ref-goose-agents-src-settings, ref-goose-agents-src-subagent-config-20261009, ref-goose-agents-src-subagent-config-resolve, ref-goose-agents-src-foreground-provider-gate]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-list, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-location, ref-goose-agents-doc-subagents, ref-goose-agents-src-subagent-cancelled-outcome, ref-goose-agents-src-subagent-cancelled-message, ref-goose-agents-src-cli-drain-stopped-run, ref-goose-agents-src-cli-stop-breaks-stream, ref-goose-agents-src-extension-selection-unique, ref-goose-agents-src-lease-start-on-demand, ref-goose-agents-src-subagent-session-extension-state, ref-goose-agents-src-foreground-delegate-unique]
---

本节固定来源：仓库 `block/goose` 提交 `3bd85200` 的官方文档（Custom Agents、Subagents、Recipe Reference、Summon MCP、环境变量表）与 Rust 源码快照。上一版 `goose-cli-custom_agents-v2` 固定在提交 `a4189ec8`；本版按本轮提交（基线 `a4189ec8`）改写受影响的判断，未变动的段落沿用 v2 的引用与结论。文档快照不含适用软件版本号。

## 自定义 Agent 的定义位置与发现 {#agents-entry}

自定义 agent 是带 YAML frontmatter 的 Markdown 文件 [@ref-goose-agents-doc-create]。`summon` 平台扩展的 `discover_filesystem_sources` 明确列出被扫描的目录与顺序 [@ref-goose-agents-src-agent-dirs-20261009]。

| 顺序 | 作用域 | 目录（相对 `working_dir` / home / 配置目录） |
| --- | --- | --- |
| 先扫 | 项目 | `WORKDIR/.goose/agents`、`WORKDIR/.claude/agents`、`WORKDIR/.agents/agents` |
| 后扫 | 全局 | `~/.goose/agents`、`~/.agents/agents`、`CONFIG_DIR/agents`、`~/.claude/agents` |

扫描顺序是「当前工作目录下的 recipe → 项目 agent 目录 → 全局 recipe 目录 → 全局 agent 目录」[@ref-goose-agents-src-agent-dirs-20261009]，因此同名时**先命中的项目级定义胜出**。每个 agent 目录按名字保留首个解析成功的条目（`seen` 集合去重），只接受 `.md` 文件 [@ref-goose-agents-src-agent-dirs-20261009]。目录不存在、无法 `canonicalize` 或读取失败时静默跳过 [@ref-goose-agents-src-agent-dirs-20261009]。本轮该函数在 `a4189ec8..3bd85200` 区间逐行未变，发现规则不变。

文档侧同样把 `~/.agents/agents/` 与 `PROJECT/.agents/agents/` 作为推荐写法，并列出 `.goose/agents/`、`.claude/agents/` 等兼容路径 [@ref-goose-agents-doc-create]；目录不存在时需要自己创建 [@ref-goose-agents-doc-create]。两者一致，本轮不再有「发现规则未知」的缺口。

## 定义文件格式 {#agents-format}

frontmatter 字段只有三个 [@ref-goose-agents-doc-create]：

| 字段 | 必需 | 说明 |
| --- | --- | --- |
| `name` | 是 | 用于列出、加载、`@` 提及与委派的名字，也是同名去重的键 |
| `description` | 否 | 列出时的简介；缺省时源码拼成 `Agent` 并附模型名 |
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

其中真正由宿主原生实现的隔离执行体是 **subagent**：文档说明内部 subagent 会“spawn goose 实例”，使用当前会话的上下文与扩展，有两种配置方式——直接提示词与 recipe [@ref-goose-agents-doc-subagents]。源码侧可核对的参数结构 `TaskConfig` 持有 `provider`、`model_config`、扩展列表与可选的 `max_turns` [@ref-goose-agents-src-task-config-20261009]，因此 subagent 是一个独立 provider 实例 + 独立扩展集，而不是主会话里的一段提示。**本轮变化**：`TaskConfig` 在 `3bd85200` 仍然存在且字段不变，但已没有任何构造点——上一版据以说明「由 `build_task_config` 装配」的代码路径连同 `run_subagent_task`/`SubagentRunParams` 一并删除；subagent 的隔离执行现在只经由状态机的 `ForegroundSubagentOperation` + `ForegroundSubagentRunner` 一条路径（见「覆盖与上限」）。

recipe 作为可复用的「角色 + 设置 + 扩展」包装，还提供两件与角色分工相关的能力：`parameters` 用 Jinja 风格 `{{name}}` 占位符与 `input_type`（`string`/`number`/`boolean`/`date`/`file`/`select`）、`requirement`（`required`/`optional`/`user_prompt`）声明参数并在运行前替换到 `instructions`、`prompt`、`activities` 中 [@ref-goose-agents-doc-recipe-params]；`sub_recipes` 让主 recipe 按名字调用子 recipe（字段 `name`、`path`、可选 `values`、`sequential_when_repeated`、`description`），用于固定的多步编排 [@ref-goose-agents-doc-recipe-subrecipes]。

外部 subagent 则通过 MCP server 引入（文档示例用 `codex` 作为 stdio 扩展起 subagent server）[@ref-goose-agents-doc-external]。扩展提供的委派能力来自 `summon` 平台扩展：它提供 `delegate` 与 `load` 两个工具，且当 recipe 显式写了 `extensions` 块时，默认平台扩展不会自动包含，需要显式加 `summon`（有 `sub_recipes` 的 recipe 会被自动注入 `summon`）[@ref-goose-agents-doc-recipe-extensions]。本轮提交的宿主平台扩展清单里仍有 `summon`，已无上一提交中的 `orchestrator` 模块 [@ref-goose-agents-src-platform-ext-list-20261009]——见下文「覆盖与上限」对并行委派的影响。

## 调用方式与自动委派条件 {#agents-invocation}

自定义 agent 的三种用法 [@ref-goose-agents-doc-use]：

* 列出可用来源：在会话里让 goose「list available sources」（这是提示词不是终端命令），goose 会把可发现的 agent 与 recipe/subrecipe 一起列出 [@ref-goose-agents-doc-list]。
* 按名调用：`@code-reviewer review the current diff`，或在有提及选择器的界面里输入 `@` 选择 [@ref-goose-agents-doc-use]。
* 委派（delegate）：让 goose「Delegate to NAME: …」，委派的 agent 在**独立会话**中运行，可带自己的模型设置，部分界面还允许在委派时覆盖模型、provider、temperature、max turns [@ref-goose-agents-doc-delegate]。
* 加载（load）：让 goose「Load the NAME agent」把该 agent 的指令并入当前对话上下文，不另开会话；文档把 load（加进当前上下文）与 delegate（独立运行并返回结果）明确区分 [@ref-goose-agents-doc-load]。

Subagent 的触发由自然语言驱动：文档说 goose 会自行判断是否 spawn，并行任务用「parallel / simultaneously / concurrently」之类措辞触发，顺序任务用「first…then / after」[@ref-goose-agents-doc-subagents]。**条件**：subagent 只在自主（auto）权限模式下可用，手动批准、智能批准与纯聊天模式下 subagent 被禁用 [@ref-goose-agents-doc-subagents]——这条是文档约束，本次快照没有对应源码可核对。

`delegate` 工具的可见参数在本轮提交里仍是 `instructions`、`source`、`parameters`、`extensions`、`provider`、`model`、`temperature`、`max_turns`、`context`、`working_dir` [@ref-goose-agents-src-delegate-schema-20261009]；官方 Summon 文档明确写出「`delegate` 等待子代理结束并返回结果」[@ref-goose-agents-doc-summon-sync-delegate-20261009]。上一提交中的后台任务模式（`delegate(async: true)` 返回任务 id、再用 `load(source: 任务 id)` 取结果）已从文档与工具参数中移除，本轮提交进一步删掉了对应的后台执行实现——`delegate` 现在只有一条前台路径。

自定义 agent 与其他能力的边界（文档 FAQ）：agent 文件本身**不定义** MCP server 列表，只能用当前会话已启用的扩展；agent 可以被调度吗——不能，需要包成 recipe 再调度；agent 不含工作流，需要步骤/参数/扩展时用 recipe [@ref-goose-agents-doc-faq]。

## 覆盖、隔离与上限 {#agents-overrides}

**子代理层面**（有源码常量与文档双重证据）：

| 参数 | 默认 | 覆盖方式 | 证据 |
| --- | --- | --- | --- |
| max turns | `25`（常量 `DEFAULT_SUBAGENT_MAX_TURNS`，位于 `subagent_task_config.rs`） | `delegate` 工具的 `max_turns` 参数、recipe `settings.max_turns`、`GOOSE_SUBAGENT_MAX_TURNS` | [@ref-goose-agents-src-task-config-20261009] [@ref-goose-agents-src-delegate-schema-20261009] [@ref-goose-agents-doc-env-subagent-max-turns-20261009] |
| 超时 | 5 分钟 | 在提示词里要求更长时间 | [@ref-goose-agents-doc-defaults] |
| 扩展 | 继承父会话 | `delegate` 的 `extensions` 数组（省略=继承全部，空数组=不启用） | [@ref-goose-agents-src-delegate-schema-20261009] |
| provider / model | 继承会话 | `delegate` 的 `provider`/`model` 参数，`GOOSE_SUBAGENT_PROVIDER`、`GOOSE_SUBAGENT_MODEL`，或 recipe `settings` | [@ref-goose-agents-src-delegate-schema-20261009] [@ref-goose-agents-doc-defaults] |

**max turns 的解析顺序（源码）**：先取 `delegate` 工具调用的 `params.max_turns`，其次 recipe 的 `settings.max_turns`，两者都没有才走 `resolve_max_turns` [@ref-goose-agents-src-subagent-config-20261009]；`resolve_max_turns` 自身依次读会话 recipe 的 `settings.max_turns`、进程环境变量 `GOOSE_SUBAGENT_MAX_TURNS`、`Config::global().get_param("GOOSE_SUBAGENT_MAX_TURNS")`（即配置文件层），最后回落到常量 `DEFAULT_SUBAGENT_MAX_TURNS = 25` [@ref-goose-agents-src-resolve-max-turns-20261009]。解析结果必须落在 `1..=u32::MAX`，否则 `delegate` 直接报错 `max_turns must be between 1 and ...` [@ref-goose-agents-src-subagent-config-resolve]。本轮这三处的取值顺序与默认值逐行未变。

**构造方式的变化（影响旧结论）**：上一版记载「`TaskConfig::new` 先读 `GOOSE_SUBAGENT_MAX_TURNS`、取不到用常量 25」[@ref-goose-agents-src-max-turns]，随后又记载「构造改由 `build_task_config` 直接实例化，provider 按名字从 registry 创建、失败时回落到会话自身的 provider」[@ref-goose-agents-src-build-task-config-20261009]。本轮提交把 `build_task_config` 整体删除，`TaskConfig` 只剩数据结构与 `Debug` 实现、不再被任何代码构造 [@ref-goose-agents-src-task-config-20261009]。现在的链路是：`resolve_subagent_config` 先算出 `provider_name`、`model_config`、`extensions`、`working_dir`、`max_turns` [@ref-goose-agents-src-subagent-config-resolve]，然后 `delegate` **只**用 `provider_name` 去注册表确认该 provider 可被重建，失败即报 `Provider 'NAME' cannot be reconstructed for a foreground subagent`；确认通过后把 recipe、`provider_name`、`model_config` 与扩展选择写进子会话的持久状态，由子会话自己恢复 provider 实例。也就是说「回落到会话自身的 provider」这条旧路径**已不存在**——委派到会话自带但注册表无法重建的 provider 现在会失败，而不是复用父会话的实例 [@ref-goose-agents-src-foreground-provider-gate]。**用户可配置的键、默认值与优先级顺序仍未变**，变的是装配位置与失败方式。

优先级（文档，由高到低）：subagent 工具调用覆盖 > recipe `settings.max_turns` > `GOOSE_SUBAGENT_MAX_TURNS` > 默认值（主 recipe 1000，subagent 25）[@ref-goose-agents-doc-recipe-settings] [@ref-goose-agents-doc-env-subagent-max-turns-20261009]；对 subagent，recipe `settings` 里的 `goose_provider`/`goose_model` 优先于 `GOOSE_SUBAGENT_PROVIDER`/`GOOSE_SUBAGENT_MODEL` [@ref-goose-agents-doc-recipe-settings]。recipe 的 `settings` 结构在源码里就是 `goose_provider`、`goose_model`、`temperature`、`max_turns` 四个可选字段 [@ref-goose-agents-src-settings]。文档还提到可用 `subagent_system.md` 提示模板改变子代理行为 [@ref-goose-agents-doc-defaults]。

**并发与后台执行**：固定来源里仍没有后台子代理机制——`GOOSE_MAX_BACKGROUND_TASKS` 这一行已从官方环境变量表删除（该表在本轮只剩 `GOOSE_MAX_TURNS`、`GOOSE_GATEWAY_MAX_TURNS`、`GOOSE_SUBAGENT_MAX_TURNS` 三条会话类上限）[@ref-goose-agents-doc-env-subagent-max-turns-20261009]，本轮提交又删除了后台执行代码本身，`delegate` 是唯一的等待式调用 [@ref-goose-agents-doc-summon-sync-delegate-20261009]。因此固定来源里**没有**可用于限制并发子代理数量的第一方配置项；文档描述的「顺序 / 并行」是模型按措辞发起多个 `delegate` 调用的结果，不是宿主侧的可配置并发上限 [@ref-goose-agents-doc-subagents]。宿主侧的平台扩展清单中上一提交的 `orchestrator` 模块也已不在 [@ref-goose-agents-src-platform-ext-list-20261009]。

限制与边界：文档建议「扩展控制」——默认继承父会话的全部扩展，可按安全/聚焦/性能需要限制 [@ref-goose-agents-doc-extension-control]；子代理之间有并行与顺序两种执行，单个子代理失败不影响其他成功的结果 [@ref-goose-agents-doc-monitor]。返回详略也可控：默认「Full Details」把工具执行与推理步骤全部带回主会话，也可以要求「Summary Only」只返回最终结果 [@ref-goose-agents-doc-return-mode]。

子代理的安全约束是**递归上限的直接证据**：允许的操作是扩展发现、已启用扩展的资源读取与列目录、以及 recipe 指定或从父会话继承的扩展工具；被明确阻止的操作包括（1）再次派生 subagent（原文理由即「防止无限递归」）、（2）启用/禁用/修改扩展（避免与主会话冲突）、（3）创建/修改/删除计划任务（避免干扰父工作流）[@ref-goose-agents-doc-allowed] [@ref-goose-agents-doc-restricted] [@ref-goose-agents-doc-security]。本轮源码侧与之一致：`delegate` 工具只在非 SubAgent 会话里被列出，子代理会话只拿到 `load`。也就是说「子代理不能再派生子代理」有固定来源，而并发度的数值上限经本轮核对确认在固定来源中不存在。

## 诊断 {#agents-diagnostics}

* 列出：会话内「list available sources」，在来源加载可用时列出可发现的 agent（与 recipe、subrecipe 一起）[@ref-goose-agents-doc-list]。
* 观察执行：子代理的工具调用在会话里实时显示——CLI 用类似 `[subagent:16] text_editor | developer` 的行标出子代理标识、工具名与提供该工具的扩展 [@ref-goose-agents-doc-monitor]。
* 子代理失败或超时（默认 5 分钟）时**不会**返回任何输出；并行执行时只拿到成功子任务的结果 [@ref-goose-agents-doc-monitor]。
* 生命周期与清理：子代理是临时实例，任务结束即结束，无需手工清理 [@ref-goose-agents-doc-subagents]。
* 本轮新增的可观察失败点：`delegate` 的 `max_turns` 超出 `1..=u32::MAX` 时工具调用直接失败并给出 `max_turns must be between 1 and ...` [@ref-goose-agents-src-subagent-config-resolve]；委派目标 provider 无法从注册表重建时给出 `Provider 'NAME' cannot be reconstructed for a foreground subagent` [@ref-goose-agents-src-foreground-provider-gate]（替代了上一版记录的 `build_task_config` 失败路径）。

**停止（Stop）后的会话内容（本轮新增的用户可见行为）**。上一版记录子代理失败/超时不返回输出；本轮提交进一步规定「Stop 及时结束本轮并保存已产生的内容」，行为分两侧：

* 状态机侧，子代理运行的结果新增第三种结局 `Cancelled`（此前只有 `Completed` 与 `Failed`）；`Cancelled` 不产生任何交付消息——`subagent_result_message` 对它直接返回 `None`，不发通知也不写入“completed/failed”文本 [@ref-goose-agents-src-subagent-cancelled-outcome]。收尾时仍在运行的子代理被中止，并为每个未交付的子代理追加一条隐藏（对用户不可见、对 agent 可见）消息 `Subagent ID was cancelled before it finished and will not run again.` [@ref-goose-agents-src-subagent-cancelled-message]。已经跑完的子代理结果照常交付。
* CLI 侧，收到 Ctrl-C 后不再直接丢弃事件流，而是调用 `drain_stopped_run` 把停止前已产生的事件收干：普通消息追加进会话、`HistoryReplaced` 覆盖会话、`Usage` 更新用量，工具确认与 elicitation 请求被跳过；再次 Ctrl-C 会立即返回。之后才 `drop(stream)` 并走 `handle_interrupted_messages` [@ref-goose-agents-src-cli-drain-stopped-run] [@ref-goose-agents-src-cli-stop-breaks-stream]。取消工具调用时也先收干再补写 `Tool call cancelled by user`，并且只在会话里确实还没有该 `tool_call_id` 的响应时才补写。

排查建议（按固定来源可确认的部分）：确认 agent 文件在文档列出的目录之一、frontmatter 里 `name` 存在、正文非空（否则不会作为可用来源出现）[@ref-goose-agents-doc-create]；确认扫描顺序——同名时项目目录（`.goose/agents` → `.claude/agents` → `.agents/agents`）先于全局目录被采纳 [@ref-goose-agents-src-agent-dirs-20261009]；确认 recipe 放在当前目录或 `GOOSE_RECIPE_PATH`（`GOOSE_RECIPE_GITHUB_REPO` 走 GitHub，需要 `gh` 已登录），因为 recipe 形式的子代理按同样路径查找 [@ref-goose-agents-doc-recipe-location]；子代理不出现时先确认会话是自主模式 [@ref-goose-agents-doc-subagents]；需要委派工具时确认 `summon` 扩展在启用列表中 [@ref-goose-agents-doc-recipe-extensions]；委派报“无法重建 provider”时确认目标 provider 名在注册表里可解析 [@ref-goose-agents-src-foreground-provider-gate]；扩展加载失败按扩展名逐个报告（`ExtensionLoadResult` 带 `name` 与 `error`）[@ref-goose-agents-src-lease-start-on-demand]。

**扩展选择与加载（本轮新增的可观察约束）**：

* 扩展集合按会话租用（lease）。选择被唯一性检查保护——同一会话的扩展选择里出现重复 key 时报 `extension 'NAME' appears twice in the selection` [@ref-goose-agents-src-extension-selection-unique]；`delegate` 保存子代理扩展选择失败时前缀为 `Failed to save delegate extensions:` [@ref-goose-agents-src-foreground-delegate-unique]。
* 扩展改为**首次使用时才启动**（按需启动）：租约持有的是槽位，工具目录在首次构建时才把所有槽位启动起来，单个扩展的客户端也在第一次用到它时才启动 [@ref-goose-agents-src-lease-start-on-demand]。显式的 `lease.start()` 仍然一次性启动全部槽位并逐个返回 `ExtensionLoadResult`，这是 CLI 后台加载器与切会话时使用的入口 [@ref-goose-agents-src-lease-start-on-demand]。
* 子代理会话恢复时不再逐个 `add_extension`，而是要求扩展选择已经持久化在会话里（缺失即报 `Subagent ID has no saved extension selection`）[@ref-goose-agents-src-subagent-session-extension-state]，再由租约按需启动。

缺口：agent 文件解析失败、重名告警、权限拒绝等更细的诊断输出未在固定来源中记录；除 `TaskConfig`、recipe 结构、`summon` 发现链与 max turns 解析链外的源码证据仍缺失（例如 subagent 超时的实现位置——`subagent_handler.rs` 中没有 timeout 相关代码，5 分钟只由文档给出）。本轮删除的旧后台委派路径曾向会话推送 `subagent_tool_request` 日志通知；该推送函数已随路径一起删除，而 CLI 与 ACP 消费这类通知的代码仍在，因此「子代理工具调用如何在 CLI 实时显示」在本轮只剩文档证据 [@ref-goose-agents-doc-monitor]，源码链路未重新确立。
