---
schema_version: 3
record_kind: production
edition_id: goose-cli-custom_agents-v4
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
    source_refs: [ref-goose-agents-doc-external, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-params, ref-goose-agents-doc-recipe-subrecipes, ref-goose-agents-doc-subagents, ref-goose-agents-doc-when, ref-goose-agents-src-task-config-20261009, ref-goose-agents-src-platform-ext-list-20261009, ref-goose-agents-src-gdk-subagent-20261022, ref-goose-agents-src-subagent-operation-20261022, ref-goose-agents-src-ops-subagent-runner-20261022, ref-goose-agents-src-subagent-meta-strip-20261022, ref-goose-agents-src-subagent-meta-strip-call-20261022, ref-goose-agents-src-delegate-resume-20261022, ref-goose-agents-src-max-concurrent-subagents-20261022, ref-goose-agents-doc-default-settings-20261022, ref-goose-agents-doc-max-concurrent-20261022]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-delegate, ref-goose-agents-doc-faq, ref-goose-agents-doc-list, ref-goose-agents-doc-load, ref-goose-agents-doc-subagents, ref-goose-agents-doc-use, ref-goose-agents-doc-summon-sync-delegate-20261009]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-allowed, ref-goose-agents-doc-defaults, ref-goose-agents-doc-env-subagent-max-turns-20261009, ref-goose-agents-doc-extension-control, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-settings, ref-goose-agents-doc-restricted, ref-goose-agents-doc-return-mode, ref-goose-agents-doc-security, ref-goose-agents-src-build-task-config-20261009, ref-goose-agents-src-delegate-schema-20261009, ref-goose-agents-src-max-turns, ref-goose-agents-src-resolve-max-turns-20261009, ref-goose-agents-src-settings, ref-goose-agents-src-subagent-config-20261009, ref-goose-agents-src-subagent-config-resolve, ref-goose-agents-src-foreground-provider-gate, ref-goose-agents-src-resolve-max-turns-20261022, ref-goose-agents-src-new-session-extensions-20261022, ref-goose-agents-doc-default-settings-20261022, ref-goose-agents-doc-max-concurrent-20261022, ref-goose-agents-src-max-concurrent-subagents-20261022]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-list, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-location, ref-goose-agents-doc-subagents, ref-goose-agents-src-subagent-cancelled-outcome, ref-goose-agents-src-subagent-cancelled-message, ref-goose-agents-src-cli-drain-stopped-run, ref-goose-agents-src-cli-stop-breaks-stream, ref-goose-agents-src-extension-selection-unique, ref-goose-agents-src-lease-start-on-demand, ref-goose-agents-src-subagent-session-extension-state, ref-goose-agents-src-foreground-delegate-unique, ref-goose-agents-src-ops-subagent-notices-20261022, ref-goose-agents-src-subagent-messages-20261022, ref-goose-agents-src-gdk-subagent-20261022, ref-goose-agents-src-delegate-resume-20261022, ref-goose-agents-src-resume-validation-20261022, ref-goose-agents-src-subagent-cancelled-20261022, ref-goose-agents-src-ops-subagent-finished-notice-20261022]
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
        source_refs: [ref-goose-agents-doc-external, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-params, ref-goose-agents-doc-recipe-subrecipes, ref-goose-agents-doc-subagents, ref-goose-agents-doc-when, ref-goose-agents-src-task-config-20261009, ref-goose-agents-src-platform-ext-list-20261009, ref-goose-agents-src-gdk-subagent-20261022, ref-goose-agents-src-subagent-operation-20261022, ref-goose-agents-src-ops-subagent-runner-20261022, ref-goose-agents-src-subagent-meta-strip-20261022, ref-goose-agents-src-subagent-meta-strip-call-20261022, ref-goose-agents-src-delegate-resume-20261022, ref-goose-agents-src-max-concurrent-subagents-20261022, ref-goose-agents-doc-default-settings-20261022, ref-goose-agents-doc-max-concurrent-20261022]
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
        source_refs: [ref-goose-agents-doc-create, ref-goose-agents-doc-list, ref-goose-agents-doc-monitor, ref-goose-agents-doc-recipe-extensions, ref-goose-agents-doc-recipe-location, ref-goose-agents-doc-subagents, ref-goose-agents-src-subagent-cancelled-outcome, ref-goose-agents-src-subagent-cancelled-message, ref-goose-agents-src-cli-drain-stopped-run, ref-goose-agents-src-cli-stop-breaks-stream, ref-goose-agents-src-extension-selection-unique, ref-goose-agents-src-lease-start-on-demand, ref-goose-agents-src-subagent-session-extension-state, ref-goose-agents-src-foreground-delegate-unique, ref-goose-agents-src-ops-subagent-notices-20261022, ref-goose-agents-src-subagent-messages-20261022, ref-goose-agents-src-gdk-subagent-20261022, ref-goose-agents-src-delegate-resume-20261022, ref-goose-agents-src-resume-validation-20261022, ref-goose-agents-src-subagent-cancelled-20261022, ref-goose-agents-src-ops-subagent-finished-notice-20261022]
---

本节固定来源：仓库 `block/goose` 提交 `6835dd45` 的官方文档（Custom Agents、Subagents、Recipe Reference、Summon MCP、环境变量表）与 Rust 源码快照，其中包含本轮新增的 `crates/goose-agent`（GDK）子代理模块。上一版 `goose-cli-custom_agents-v3` 固定在提交 `3bd85200`；本版按本轮提交（基线 `9686d674`）改写受影响的角色与诊断判断，其余段落沿用 v3 的引用与结论。文档快照不含适用软件版本号。

## 自定义 Agent 的定义位置与发现 {#agents-entry}

自定义 agent 是带 YAML frontmatter 的 Markdown 文件 [@ref-goose-agents-doc-create]。`summon` 平台扩展的 `discover_filesystem_sources` 明确列出被扫描的目录与顺序 [@ref-goose-agents-src-agent-dirs-20261009]。

| 顺序 | 作用域 | 目录（相对 `working_dir` / home / 配置目录） |
| --- | --- | --- |
| 先扫 | 项目 | `WORKDIR/.goose/agents`、`WORKDIR/.claude/agents`、`WORKDIR/.agents/agents` |
| 后扫 | 全局 | `~/.goose/agents`、`~/.agents/agents`、`CONFIG_DIR/agents`、`~/.claude/agents` |

扫描顺序是「当前工作目录下的 recipe → 项目 agent 目录 → 全局 recipe 目录 → 全局 agent 目录」[@ref-goose-agents-src-agent-dirs-20261009]，因此同名时**先命中的项目级定义胜出**。每个 agent 目录按名字保留首个解析成功的条目（`seen` 集合去重），只接受 `.md` 文件 [@ref-goose-agents-src-agent-dirs-20261009]。目录不存在、无法 `canonicalize` 或读取失败时静默跳过 [@ref-goose-agents-src-agent-dirs-20261009]。v3 固定提交（`3bd85200`）与该引用快照之间该函数逐行未变；本轮提交也没有改动它，发现规则不变。

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

其中真正由宿主原生实现的隔离执行体是 **subagent**：文档说明内部 subagent 会“spawn goose 实例”，使用当前会话的上下文与扩展，有两种配置方式——直接提示词与 recipe [@ref-goose-agents-doc-subagents]。子代理仍是「独立会话 + 独立 provider 实例 + 独立扩展集」：旧版本用 `TaskConfig` 的 `provider`、`model_config`、扩展列表与可选 `max_turns` 描述这组参数 [@ref-goose-agents-src-task-config-20261009]，而不是主会话里的一段提示。

**本轮变化（执行机制的归属）**：子代理的调度逻辑已从 `crates/goose` 抽到 GDK crate `goose-agent`，成为可复用的编排模块。`SubagentOperation` 持有一个 `SubagentRunner`，按父会话里出现过的委派记录算出待执行子代理，并把每一步执行表示成 `SubagentUpdate`：`ToParent(Message)` 表示要转发给父会话的消息，`Finished(SubagentOutcome)` 表示结束，结局只有 `Completed(输出)`、`Failed(原因)`、`Cancelled` 三种 [@ref-goose-agents-src-gdk-subagent-20261022] [@ref-goose-agents-src-subagent-operation-20261022]。goose CLI 侧的实现位于 `ops_subagent.rs`：`ForegroundSubagentRunner` 为 `SubagentRunner`（泛型参数为 `Session`）实现三个入口——从消息里认出被委派的子会话、按需加载并启动子会话、以及在结束时发通知 [@ref-goose-agents-src-ops-subagent-runner-20261022]。相比 v3 的「runner 直接返回一个最终结局」，现在的契约是一条流：中间消息（例如“开始运行”的提示）可以在子代理结束前就到达父会话。

**委派标记只来自平台扩展**：子代理请求靠父会话工具结果里的元数据识别——`foreground_subagent: true` 加 `subagent_session_id` [@ref-goose-agents-src-ops-subagent-runner-20261022]。本轮在扩展工具返回处加了清洗：非平台扩展的结果会先被剥掉 `ExtensionMutation` 与 `subagent_session_id`，平台扩展不受影响 [@ref-goose-agents-src-subagent-meta-strip-20261022] [@ref-goose-agents-src-subagent-meta-strip-call-20261022]。也就是说 MCP server 无法伪造一次委派——只有 `summon` 这类平台扩展能产生委派标记。这也是「原生实现」与「扩展提供的实现」在角色层面的分界：`delegate`/`load` 由 `summon` 平台扩展提供，外部 subagent 则通过 MCP server 引入（文档示例用 `codex` 作为 stdio 扩展起 subagent server）[@ref-goose-agents-doc-external]。

**被取消或被失败的子代理可以续跑**：`delegate` 新增 `resume` 参数，取值为一个失败或已取消子代理的会话 ID；只有当子代理属于当前会话、且尚未产出最终结果时才允许续跑，否则报 `Subagent NAME does not belong to this session` 或 `Subagent NAME already completed` [@ref-goose-agents-src-delegate-resume-20261022]。续跑不重新建立会话，而是把一条用户消息追加进该子代理的会话：`instructions` 有值时用该文本，省略时用固定指令 `Continue the task from where you left off.` [@ref-goose-agents-src-delegate-resume-20261022]。成功时工具结果与新建委派一致，带同一组元数据，文本为 `Resumed subagent NAME`，因此后续由同一个 subagent 操作接续执行。

**并行由宿主调度**：多个已记录但未结束的子代理会被并发启动，同时运行的数量由 `SubagentOperation::with_max_concurrency` 限制，超出的保持 pending 直到有槽位释放 [@ref-goose-agents-src-subagent-operation-20261022]；CLI 在构建状态机时读取 `GOOSE_MAX_CONCURRENT_SUBAGENTS`，缺省为 `5` [@ref-goose-agents-src-max-concurrent-subagents-20261022]。官方环境变量表与 Subagents 文档的默认设置表给出同一结论（默认 5、按父会话计、超出的任务等待）[@ref-goose-agents-doc-max-concurrent-20261022] [@ref-goose-agents-doc-default-settings-20261022]。因此「顺序 / 并行」既是模型按措辞发起多个 `delegate` 调用的结果，也受宿主侧这个上限约束。

recipe 作为可复用的「角色 + 设置 + 扩展」包装，还提供两件与角色分工相关的能力：`parameters` 用 Jinja 风格 `{{name}}` 占位符与 `input_type`（`string`/`number`/`boolean`/`date`/`file`/`select`）、`requirement`（`required`/`optional`/`user_prompt`）声明参数并在运行前替换到 `instructions`、`prompt`、`activities` 中 [@ref-goose-agents-doc-recipe-params]；`sub_recipes` 让主 recipe 按名字调用子 recipe（字段 `name`、`path`、可选 `values`、`sequential_when_repeated`、`description`），用于固定的多步编排 [@ref-goose-agents-doc-recipe-subrecipes]。

扩展提供的委派能力来自 `summon` 平台扩展：它提供 `delegate` 与 `load` 两个工具，且当 recipe 显式写了 `extensions` 块时，默认平台扩展不会自动包含，需要显式加 `summon`（有 `sub_recipes` 的 recipe 会被自动注入 `summon`）[@ref-goose-agents-doc-recipe-extensions]。本轮提交的宿主平台扩展清单里仍有 `summon`，已无更早提交中的 `orchestrator` 模块 [@ref-goose-agents-src-platform-ext-list-20261009]。

## 调用方式与自动委派条件 {#agents-invocation}

自定义 agent 的三种用法 [@ref-goose-agents-doc-use]：

* 列出可用来源：在会话里让 goose「list available sources」（这是提示词不是终端命令），goose 会把可发现的 agent 与 recipe/subrecipe 一起列出 [@ref-goose-agents-doc-list]。
* 按名调用：`@code-reviewer review the current diff`，或在有提及选择器的界面里输入 `@` 选择 [@ref-goose-agents-doc-use]。
* 委派（delegate）：让 goose「Delegate to NAME: …」，委派的 agent 在**独立会话**中运行，可带自己的模型设置，部分界面还允许在委派时覆盖模型、provider、temperature、max turns [@ref-goose-agents-doc-delegate]。
* 加载（load）：让 goose「Load the NAME agent」把该 agent 的指令并入当前对话上下文，不另开会话；文档把 load（加进当前上下文）与 delegate（独立运行并返回结果）明确区分 [@ref-goose-agents-doc-load]。

Subagent 的触发由自然语言驱动：文档说 goose 会自行判断是否 spawn，并行任务用「parallel / simultaneously / concurrently」之类措辞触发，顺序任务用「first…then / after」[@ref-goose-agents-doc-subagents]。**条件**：subagent 只在自主（auto）权限模式下可用，手动批准、智能批准与纯聊天模式下 subagent 被禁用 [@ref-goose-agents-doc-subagents]——这条是文档约束，本次快照没有对应源码可核对。

`delegate` 工具的可见参数是 `instructions`、`source`、`parameters`、`extensions`、`provider`、`model`、`temperature`、`max_turns`、`context`、`working_dir`，本轮新增 `resume` [@ref-goose-agents-src-delegate-schema-20261009]；官方 Summon 文档明确写出「`delegate` 等待子代理结束并返回结果」[@ref-goose-agents-doc-summon-sync-delegate-20261009]。更早提交中的后台任务模式（`delegate(async: true)` 返回任务 id、再用 `load(source: 任务 id)` 取结果）已从文档与工具参数中移除，随后又删掉了对应的后台执行实现——`delegate` 只有一条前台路径。子代理会话里 `list_tools` 只返回 `load`，不返回 `delegate`；直接调用也会被 `Delegated tasks cannot spawn further delegations` 拒绝 [@ref-goose-agents-src-delegate-resume-20261022]。`resume` 只接受 `instructions` 与之组合，传 `source`、`model`、`max_turns` 等会得到 `'resume' only accepts 'instructions'; remove …`。

自定义 agent 与其他能力的边界（文档 FAQ）：agent 文件本身**不定义** MCP server 列表，只能用当前会话已启用的扩展；agent 可以被调度吗——不能，需要包成 recipe 再调度；agent 不含工作流，需要步骤/参数/扩展时用 recipe [@ref-goose-agents-doc-faq]。

## 覆盖、隔离与上限 {#agents-overrides}

**子代理层面**（有源码常量与文档双重证据）：

| 参数 | 默认 | 覆盖方式 | 证据 |
| --- | --- | --- | --- |
| max turns | `GOOSE_SUBAGENT_MAX_TURNS`，未设置时取 `GOOSE_MAX_TURNS`，都没有则 `1000` | `delegate` 工具的 `max_turns` 参数、recipe `settings.max_turns`、`GOOSE_SUBAGENT_MAX_TURNS`（环境变量或配置文件） | [@ref-goose-agents-src-resolve-max-turns-20261022] [@ref-goose-agents-src-delegate-schema-20261009] [@ref-goose-agents-doc-default-settings-20261022] |
| 并发 | `5` 个同时运行，其余等待 | `GOOSE_MAX_CONCURRENT_SUBAGENTS`（正整数，按父会话计） | [@ref-goose-agents-src-max-concurrent-subagents-20261022] [@ref-goose-agents-doc-max-concurrent-20261022] |
| 超时 | 5 分钟 | 在提示词里要求更长时间 | [@ref-goose-agents-doc-defaults] |
| 扩展 | 子 recipe 声明了 `extensions` 时用 recipe 的列表，否则继承父会话 | `delegate` 的 `extensions` 数组（作为按名过滤，省略=按上面的顺序取，空数组=不启用） | [@ref-goose-agents-src-new-session-extensions-20261022] [@ref-goose-agents-src-delegate-schema-20261009] |
| provider / model | 继承会话 | `delegate` 的 `provider`/`model` 参数，`GOOSE_SUBAGENT_PROVIDER`、`GOOSE_SUBAGENT_MODEL`，或 recipe `settings` | [@ref-goose-agents-src-delegate-schema-20261009] [@ref-goose-agents-doc-defaults] |

**max turns 的解析顺序（源码，本轮合并为一个函数）**：`SummonClient::resolve_max_turns(params, recipe, config)` 依次取 `delegate` 的 `params.max_turns` → recipe 的 `settings.max_turns` → `config.get_param("GOOSE_SUBAGENT_MAX_TURNS")`（该读取统一覆盖环境变量与配置文件层）→ `config.default_max_turns()`，后者是 `GOOSE_MAX_TURNS`，未设置时 `1000` [@ref-goose-agents-src-resolve-max-turns-20261022]。v3 记载的三段式拆解——`delegate`/recipe 先取值、再走 `resolve_max_turns` 读会话 recipe 与环境变量、最后回落到常量 `DEFAULT_SUBAGENT_MAX_TURNS = 25`——已不再成立 [@ref-goose-agents-src-subagent-config-20261009] [@ref-goose-agents-src-resolve-max-turns-20261009] [@ref-goose-agents-src-max-turns]；该常量本身也已从源码删除。解析结果仍必须落在 `1..=u32::MAX`，否则 `delegate` 直接报错 `max_turns must be between 1 and ...` [@ref-goose-agents-src-subagent-config-resolve]。

**构造方式的变化（影响旧结论）**：v3 之前的版本记载「`TaskConfig::new` 先读 `GOOSE_SUBAGENT_MAX_TURNS`、取不到用常量 25」[@ref-goose-agents-src-max-turns]，随后又记载「构造改由 `build_task_config` 直接实例化，provider 按名字从 registry 创建、失败时回落到会话自身的 provider」[@ref-goose-agents-src-build-task-config-20261009]。`build_task_config` 已被整体删除，`TaskConfig` 只剩数据结构与 `Debug` 实现、不再被任何代码构造 [@ref-goose-agents-src-task-config-20261009]。链路是：`resolve_subagent_config` 先算出 `provider_name`、`model_config`、`extensions`、`working_dir`、`max_turns` [@ref-goose-agents-src-subagent-config-resolve]，然后 `delegate` **只**用 `provider_name` 去注册表确认该 provider 可被重建，失败即报 `Provider 'NAME' cannot be reconstructed for a foreground subagent`；确认通过后把 recipe、`provider_name`、`model_config` 与扩展选择写进子会话的持久状态，由子会话自己恢复 provider 实例 [@ref-goose-agents-src-foreground-provider-gate]。也就是说「回落到会话自身的 provider」这条旧路径**已不存在**——委派到会话自带但注册表无法重建的 provider 现在会失败，而不是复用父会话的实例。

**扩展选择的本轮变化**：`resolve_subagent_config` 现在用 `resolve_extensions_for_new_session(recipe.extensions, 父会话的已启用扩展)` 决定子会话的扩展集：子 recipe 自己声明了 `extensions` 就用它的列表，否则才用父会话的已启用扩展，两者都会被 `is_extension_available` 过滤 [@ref-goose-agents-src-new-session-extensions-20261022]。`delegate` 的 `extensions` 参数随后作为按名过滤应用在结果之上；传入的名字哪些可用仍记录在同一条日志里 [@ref-goose-agents-src-delegate-schema-20261009]。因此「省略即继承父会话全部」只对没有声明 `extensions` 的子 recipe 成立。

优先级（文档，由高到低）：subagent 工具调用覆盖 > 子 recipe `settings.max_turns` > `GOOSE_SUBAGENT_MAX_TURNS` > `GOOSE_MAX_TURNS` > 默认 1000 [@ref-goose-agents-doc-default-settings-20261022]；对 subagent，recipe `settings` 里的 `goose_provider`/`goose_model` 优先于 `GOOSE_SUBAGENT_PROVIDER`/`GOOSE_SUBAGENT_MODEL` [@ref-goose-agents-doc-recipe-settings]。recipe 的 `settings` 结构在源码里就是 `goose_provider`、`goose_model`、`temperature`、`max_turns` 四个可选字段 [@ref-goose-agents-src-settings]。文档还提到可用 `subagent_system.md` 提示模板改变子代理行为 [@ref-goose-agents-doc-defaults]。

**并发与后台执行**：固定来源里没有后台子代理机制——`GOOSE_MAX_BACKGROUND_TASKS` 这一行已从官方环境变量表删除，`delegate` 是唯一的等待式调用（等待期间宿主可以并发跑多个子代理）[@ref-goose-agents-doc-env-subagent-max-turns-20261009]。本轮首次出现宿主侧的并发上限：`GOOSE_MAX_CONCURRENT_SUBAGENTS`，默认 5，按父会话计，超出的任务排队 [@ref-goose-agents-doc-max-concurrent-20261022] [@ref-goose-agents-src-max-concurrent-subagents-20261022]。这取代了 v3 的结论「固定来源里没有可用于限制并发子代理数量的第一方配置项」。

限制与边界：文档建议「扩展控制」——默认继承父会话的全部扩展，可按安全/聚焦/性能需要限制 [@ref-goose-agents-doc-extension-control]；子代理之间有并行与顺序两种执行，单个子代理失败不影响其他成功的结果 [@ref-goose-agents-doc-monitor]。返回详略也可控：默认「Full Details」把工具执行与推理步骤全部带回主会话，也可以要求「Summary Only」只返回最终结果 [@ref-goose-agents-doc-return-mode]。

子代理的安全约束是**递归上限的直接证据**：允许的操作是扩展发现、已启用扩展的资源读取与列目录、以及 recipe 指定或从父会话继承的扩展工具；被明确阻止的操作包括（1）再次派生 subagent（原文理由即「防止无限递归」）、（2）启用/禁用/修改扩展（避免与主会话冲突）、（3）创建/修改/删除计划任务（避免干扰父工作流）[@ref-goose-agents-doc-allowed] [@ref-goose-agents-doc-restricted] [@ref-goose-agents-doc-security]。源码侧与之一致：`delegate` 工具只在非 SubAgent 会话里被列出，子代理会话只拿到 `load` [@ref-goose-agents-src-delegate-resume-20261022]。也就是说「子代理不能再派生子代理」有固定来源，而并发度的数值上限现在是 5（可配置），不再缺失。

## 诊断 {#agents-diagnostics}

* 列出：会话内「list available sources」，在来源加载可用时列出可发现的 agent（与 recipe、subrecipe 一起）[@ref-goose-agents-doc-list]。
* 观察执行：子代理的工具调用在会话里实时显示——文档用类似 `[subagent:16] text_editor | developer` 的行标出子代理标识、工具名与提供该工具的扩展 [@ref-goose-agents-doc-monitor]。
* 子代理失败或超时（默认 5 分钟）时**不会**返回任何输出；并行执行时只拿到成功子任务的结果 [@ref-goose-agents-doc-monitor]。
* 生命周期与清理：子代理是临时实例，任务结束即结束，无需手工清理 [@ref-goose-agents-doc-subagents]。

**本轮新增的可见状态行（比 v3 更早出现）**。子代理开始运行时，宿主先往父会话发一条内联通知 `Running subagent ID (任务摘要)`：摘要取子会话 recipe 的 `prompt`，空白折叠成单行并截断到 160 字符，没有 `prompt` 时只有 ID [@ref-goose-agents-src-ops-subagent-notices-20261022]。结束时再发一条完成通知 [@ref-goose-agents-src-ops-subagent-finished-notice-20261022]：

* `Completed`：`Subagent ID completed`；当仍有其它待交付的子代理（`remaining > 0`）或本轮已被取消时，再附上可读输出——输出是只含 `summary` 字段的 JSON 对象时只显示该字段，否则原样显示。
* `Failed`：`Subagent ID failed: 原因首行`。
* `Cancelled`：不发通知。

这些通知都是 `InlineMessage` 类型的系统通知，出现在助手消息流里，可直接用来确认「子代理是否真的启动了」「失败原因是什么」[@ref-goose-agents-src-ops-subagent-notices-20261022] [@ref-goose-agents-src-ops-subagent-finished-notice-20261022]。

**结束结果的落账方式（本轮重写）**。结局消息由 GDK 的 `SubagentOperation` 生成，统一写成对用户不可见、对模型可见的用户消息（`visibility(false, true)`）：

* `Completed` → `Subagent ID completed: 输出`；`Failed` → `Subagent ID failed: 原因`。两者都在消息元数据里记 `delivered: ID`，表示这个子代理已交付，不会再被排入待执行集合 [@ref-goose-agents-src-subagent-messages-20261022] [@ref-goose-agents-src-gdk-subagent-20261022]。
* 取消 → 每个未交付的子代理一行 `Subagent ID was cancelled before it finished.`，元数据记 `cancelled: [ID…]` [@ref-goose-agents-src-subagent-cancelled-20261022] [@ref-goose-agents-src-subagent-messages-20261022]。v3 记录的措辞「…and will not run again」已不再出现。
* 流在没有 `Finished` 的情况下结束（例如 runner 提前断开）视为失败，原因为 `it ended without an outcome`；子代理任务 panic 也被报告为 `Failed(panic 信息)` [@ref-goose-agents-src-gdk-subagent-20261022] [@ref-goose-agents-src-ops-subagent-finished-notice-20261022]。

已跑完的子代理结果照常交付；停止（Stop）时仍在运行的子代理被中止，并按上面的取消消息逐条记账。

**停止（Stop）后的会话内容**。状态机侧，收尾时仍在运行的子代理会被中止，未交付者写下取消消息 [@ref-goose-agents-src-subagent-cancelled-outcome] [@ref-goose-agents-src-subagent-cancelled-message]；CLI 侧收到 Ctrl-C 后调用 `drain_stopped_run` 把停止前已产生的事件收干：普通消息追加进会话、`HistoryReplaced` 覆盖会话、`Usage` 更新用量，工具确认与 elicitation 请求被跳过；再次 Ctrl-C 会立即返回。之后才 `drop(stream)` 并走 `handle_interrupted_messages` [@ref-goose-agents-src-cli-drain-stopped-run] [@ref-goose-agents-src-cli-stop-breaks-stream]。取消工具调用时也先收干再补写 `Tool call cancelled by user`，并且只在会话里确实还没有该 `tool_call_id` 的响应时才补写。

**续跑的诊断串**：`resume` 指向不存在、不属于本会话或已完成的子代理时，分别报 `Failed to load subagent ID: …`、`Subagent ID does not belong to this session`、`Subagent ID already completed`；在子代理会话里发起委派或续跑都报 `Delegated tasks cannot spawn further delegations`；与 `resume` 同时传其它参数时报 `'resume' only accepts 'instructions'; remove <参数名>`（多个用逗号连接）[@ref-goose-agents-src-delegate-resume-20261022] [@ref-goose-agents-src-resume-validation-20261022]。

排查建议（按固定来源可确认的部分）：确认 agent 文件在文档列出的目录之一、frontmatter 里 `name` 存在、正文非空（否则不会作为可用来源出现）[@ref-goose-agents-doc-create]；确认扫描顺序——同名时项目目录（`.goose/agents` → `.claude/agents` → `.agents/agents`）先于全局目录被采纳 [@ref-goose-agents-src-agent-dirs-20261009]；确认 recipe 放在当前目录或 `GOOSE_RECIPE_PATH`（`GOOSE_RECIPE_GITHUB_REPO` 走 GitHub，需要 `gh` 已登录），因为 recipe 形式的子代理按同样路径查找 [@ref-goose-agents-doc-recipe-location]；子代理不出现时先确认会话是自主模式 [@ref-goose-agents-doc-subagents]；需要委派工具时确认 `summon` 扩展在启用列表中 [@ref-goose-agents-doc-recipe-extensions]；委派报“无法重建 provider”时确认目标 provider 名在注册表里可解析 [@ref-goose-agents-src-foreground-provider-gate]；扩展加载失败按扩展名逐个报告（`ExtensionLoadResult` 带 `name` 与 `error`）[@ref-goose-agents-src-lease-start-on-demand]。

**扩展选择与加载**：

* 扩展集合按会话租用（lease）。选择被唯一性检查保护——同一会话的扩展选择里出现重复 key 时报 `extension 'NAME' appears twice in the selection` [@ref-goose-agents-src-extension-selection-unique]；`delegate` 保存子代理扩展选择失败时前缀为 `Failed to save delegate extensions:` [@ref-goose-agents-src-foreground-delegate-unique]。
* 扩展**首次使用时才启动**（按需启动）：租约持有的是槽位，工具目录在首次构建时才把所有槽位启动起来，单个扩展的客户端也在第一次用到它时才启动 [@ref-goose-agents-src-lease-start-on-demand]。显式的 `lease.start()` 仍然一次性启动全部槽位并逐个返回 `ExtensionLoadResult`，这是 CLI 后台加载器与切会话时使用的入口 [@ref-goose-agents-src-lease-start-on-demand]。
* 子代理会话恢复时不再逐个 `add_extension`，而是要求扩展选择已经持久化在会话里（缺失即报 `Subagent ID has no saved extension selection`）[@ref-goose-agents-src-subagent-session-extension-state]，再由租约按需启动。

缺口：agent 文件解析失败、重名告警、权限拒绝等更细的诊断输出未在固定来源中记录；subagent 超时的实现位置仍未确立——5 分钟只由文档给出，源码侧没有 timeout 相关代码。子代理工具调用如何在 CLI 实时显示，本轮仍只有文档证据 [@ref-goose-agents-doc-monitor]，源码链路未重新确立（该显示路径的推送函数在更早提交中随后台委派一起删除）。
