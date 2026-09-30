---
schema_version: 3
record_kind: production
edition_id: grok-cli-custom_agents-v1
harness_id: grok
topic: custom_agents
title: "Grok Build CLI 的自定义 Agent：定义、角色、委派、覆盖与诊断"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-grok-agents-agents-vs-personas, ref-grok-agents-definition-format, ref-grok-agents-custom-roles, ref-grok-agents-personas, ref-grok-agents-discovery-rules, ref-grok-agents-file-locations, ref-grok-agents-project-scoped, ref-grok-agents-project-dir, ref-grok-docs-subagents-builtin-types, ref-grok-agents-plugin-contents, ref-grok-agents-plugin-paths, ref-grok-agents-plugin-trust, ref-grok-agents-config-agent, ref-grok-agents-builtin-types, ref-grok-agents-builtin-agents]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-grok-agents-definition-format, ref-grok-agents-minimal-example, ref-grok-agents-frontmatter-schema, ref-grok-agents-error-handling, ref-grok-agents-prompt-assembly, ref-grok-agents-full-override, ref-grok-agents-template-vars, ref-grok-agents-custom-roles, ref-grok-agents-persona-fields, ref-grok-agents-io-contracts, ref-grok-agents-plugin-trust]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-grok-agents-default-agent, ref-grok-agents-config-agent, ref-grok-agents-slash-config-agents, ref-grok-agents-slash-personas, ref-grok-agents-headless-flags, ref-grok-agents-headless-tool-filtering, ref-grok-agents-how-subagents-work, ref-grok-agents-spawning, ref-grok-agents-builtin-types, ref-grok-docs-skills-plugins-subagents, ref-grok-docs-subagents-builtin-types, ref-grok-agents-send-messages, ref-grok-agents-agents-vs-personas]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-grok-agents-frontmatter-schema, ref-grok-agents-capability-modes, ref-grok-agents-per-type-toggles, ref-grok-agents-model-selection, ref-grok-agents-config-feature-subagent-model, ref-grok-agents-mcp-inheritance, ref-grok-agents-plugin-trust, ref-grok-agents-persona-resolution, ref-grok-agents-custom-roles, ref-grok-agents-persona-fields, ref-grok-agents-isolation-worktree]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-grok-agents-config-subagents-ref, ref-grok-agents-config-subagents, ref-grok-agents-depth-limits, ref-grok-agents-send-messages, ref-grok-agents-config-feature-active-agent-messages, ref-grok-agents-context-inheritance, ref-grok-agents-disabling, ref-grok-agents-workflow-budget]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-grok-agents-slash-config-agents, ref-grok-agents-slash-personas, ref-grok-agents-tasks-pane, ref-grok-agents-tui-views, ref-grok-docs-modes-core-commands, ref-grok-agents-inspect-rules, ref-grok-docs-project-rules-verification, ref-grok-agents-plugin-inspect, ref-grok-agents-plugin-cli, ref-grok-agents-builtin-types, ref-grok-agents-depth-limits, ref-grok-agents-error-handling, ref-grok-agents-persona-resolution, ref-grok-agents-headless-tool-filtering]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-grok-agents-definition-format, ref-grok-agents-discovery-rules, ref-grok-agents-builtin-agents, ref-grok-agents-builtin-types, ref-grok-agents-agents-vs-personas, ref-grok-agents-config-agent, ref-grok-agents-file-locations, ref-grok-agents-project-scoped, ref-grok-agents-project-dir, ref-grok-agents-plugin-contents, ref-grok-agents-plugin-paths, ref-grok-agents-plugin-trust, ref-grok-agents-custom-roles, ref-grok-agents-personas, ref-grok-docs-subagents-builtin-types]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-grok-agents-definition-format, ref-grok-agents-minimal-example, ref-grok-agents-frontmatter-schema, ref-grok-agents-error-handling, ref-grok-agents-prompt-assembly, ref-grok-agents-full-override, ref-grok-agents-template-vars, ref-grok-agents-custom-roles, ref-grok-agents-persona-fields, ref-grok-agents-io-contracts, ref-grok-agents-plugin-trust]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: partial
        source_refs: [ref-grok-agents-builtin-types, ref-grok-agents-builtin-agents, ref-grok-agents-custom-roles, ref-grok-agents-agents-vs-personas, ref-grok-agents-plugin-trust, ref-grok-docs-subagents-builtin-types]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-grok-agents-default-agent, ref-grok-agents-config-agent, ref-grok-agents-slash-config-agents, ref-grok-agents-slash-personas, ref-grok-agents-headless-flags, ref-grok-agents-headless-tool-filtering, ref-grok-agents-how-subagents-work, ref-grok-agents-spawning, ref-grok-agents-builtin-types, ref-grok-docs-skills-plugins-subagents, ref-grok-docs-subagents-builtin-types, ref-grok-agents-send-messages, ref-grok-agents-agents-vs-personas]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-grok-agents-frontmatter-schema, ref-grok-agents-capability-modes, ref-grok-agents-per-type-toggles, ref-grok-agents-model-selection, ref-grok-agents-config-feature-subagent-model, ref-grok-agents-mcp-inheritance, ref-grok-agents-plugin-trust, ref-grok-agents-persona-resolution, ref-grok-agents-custom-roles, ref-grok-agents-persona-fields, ref-grok-agents-isolation-worktree]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: conflict
        source_refs: [ref-grok-agents-config-subagents-ref, ref-grok-agents-config-subagents, ref-grok-agents-depth-limits, ref-grok-agents-send-messages, ref-grok-agents-config-feature-active-agent-messages, ref-grok-agents-context-inheritance, ref-grok-agents-disabling, ref-grok-agents-workflow-budget]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-grok-agents-slash-config-agents, ref-grok-agents-slash-personas, ref-grok-agents-tasks-pane, ref-grok-agents-tui-views, ref-grok-docs-modes-core-commands, ref-grok-agents-inspect-rules, ref-grok-docs-project-rules-verification, ref-grok-agents-plugin-inspect, ref-grok-agents-plugin-cli, ref-grok-agents-builtin-types, ref-grok-agents-depth-limits, ref-grok-agents-error-handling, ref-grok-agents-persona-resolution, ref-grok-agents-headless-tool-filtering]
---


## 定义来源、发现顺序与实体模型 {#agents-entry}

Grok Build CLI 的“自定义 Agent”由三层实体构成，固定来源分别给出各自的定义入口 [@ref-grok-agents-agents-vs-personas]：

| 实体 | 作用对象 | 定义入口 |
| :-- | :-- | :-- |
| agent 定义 | 整个会话或子会话：模型、工具、prompt 模式、system prompt | `.grok/agents/` 或 `~/.grok/agents/` 下的 Markdown 定义文件 [@ref-grok-agents-definition-format] |
| role | 子代理的能力/模型/prompt 默认值 | `[subagents.roles]` 下按名称声明的角色，或 `.grok/roles/*.toml` [@ref-grok-agents-custom-roles] |
| persona | 叠加在子代理上的行为层（语气、输出格式、输入/输出契约） | `[subagents.personas]` 下按名称声明的 persona，或 `.grok/personas/*.toml`、`~/.grok/personas/*.toml` [@ref-grok-agents-personas] |

**定义的发现顺序与优先级**，从高到低；同名定义由高优先级覆盖 [@ref-grok-agents-discovery-rules]：

1. 项目级 `.grok/agents/*.md`——从 `cwd` 向 git 仓库根遍历，越靠近 `cwd` 的文件优先级越高；
2. 用户级 `~/.grok/agents/*.md`；
3. 兼容路径：用户 home 下启用的其他厂商 agent 目录（最低优先级）；
4. 内置：`default_grok_build()`、`browser_use()`。

用户级与项目级目录同时出现在官方文件位置表中 [@ref-grok-agents-file-locations]；`.grok/agents/` 也被列为项目级配置目录之一 [@ref-grok-agents-project-scoped][@ref-grok-agents-project-dir]。文档站的说法与此一致：在 `.grok/agents/` 或 `~/.grok/agents/` 下新增或覆盖类型 [@ref-grok-docs-subagents-builtin-types]。

**插件提供的 agent**：插件是包含 `skills/`、`commands/`、`agents/`、`hooks/hooks.json`、`.mcp.json` 等标准子目录的目录包 [@ref-grok-agents-plugin-contents]。插件来源按优先级为 `_meta.pluginDirs`（单会话）、`--plugin-dir`（单进程）、`.grok/plugins/`（项目级，需信任）、`~/.grok/plugins/`（用户级，自动信任）、`[plugins].paths` [@ref-grok-agents-plugin-paths]。插件 agent 以 `plugin-name:agent-name` 限定名出现；未信任的插件 agent 仍被列出，但只展示 frontmatter [@ref-grok-agents-plugin-trust]。

**主代理与子代理的分工**：主代理由 `[agent]` 配置选择 [@ref-grok-agents-config-agent]；子代理的内置宿主类型是 `general-purpose`、`explore`、`plan` [@ref-grok-agents-builtin-types]，而主代理的内置定义是 `grok-build`（默认）与 `browser-use` [@ref-grok-agents-builtin-agents]。两者共用同一套 `.grok/agents/` 定义文件机制：项目或用户定义可以按名字新增类型、或遮蔽同名内置类型 [@ref-grok-agents-builtin-types]。role 与 persona 只作用于子代理，在“子代理解析”阶段参与 [@ref-grok-agents-custom-roles][@ref-grok-agents-agents-vs-personas]；文档站也把 persona 定义为仅行为叠加层（tone、focus、contracts）[@ref-grok-docs-subagents-builtin-types]。

缺口：固定来源没有说明主代理是否也能套用 role/persona 层，也没有给出 `.grok/roles/*.toml` 的完整 schema，或它与 `.grok/agents/*.md` 类型定义之间的交叉规则；文档站的对应页面只写“Add or override types under `.grok/agents/` or `~/.grok/agents/`”，未展开发现算法。已检查的入口是仓库 `crates/codegen/xai-grok-agent/README.md` 的 Discovery Rules、`16-subagents.md` 的 Agents vs Personas / Custom Roles and Personas 两节。

## 定义文件格式与第一方字段 {#agents-format}

agent 定义是 **Markdown + YAML frontmatter** 文件：frontmatter 是 YAML 配置，闭合分隔符之后的正文就是 system prompt 内容 [@ref-grok-agents-definition-format]。仓库 README 的最小示例形式如下（开头的三个短横线是 frontmatter 分隔符，这里只展示字段）[@ref-grok-agents-minimal-example]：

```yaml
name: code-reviewer
description: Reviews code for quality and security
tools:
  - read_file
  - grep
  - list_dir
permissionMode: plan
```

frontmatter 字段（仓库 README 的 schema 表，全部使用 camelCase）[@ref-grok-agents-frontmatter-schema]：

| 字段 | 类型 | 必填 | 默认 | 说明 |
| :-- | :-- | :-- | :-- | :-- |
| `name` | string | 是 | — | 唯一 agent ID（小写、连字符）；缺失时报 `MissingField` [@ref-grok-agents-error-handling] |
| `description` | string | 是 | — | 何时/为何使用该 agent |
| `promptMode` | string | 否 | `"extend"` | `"extend"` 或 `"full"` |
| `tools` | string[] | 否 | 继承全部 | 工具 allowlist；省略=全部，空数组=无 |
| `disallowedTools` | string[] | 否 | 空 | 工具 denylist，优先于 `tools` |
| `permissionMode` | string | 否 | `"default"` | `"default"`、`"acceptEdits"`、`"dontAsk"`、`"plan"` |
| `skills` | string[] | 否 | 空 | 预加载的 skill 名称 |
| `agentsMd` | bool | 否 | `true` | 是否发现并注入 AGENTS.md 文件 |
| `outputFormat` | string | 否 | `"default"` | `"default"` 或 `"concise"` |
| `bash` | object | 否 | — | Bash 工具配置覆盖（`timeoutSecs` 默认 120.0、`outputByteLimit` 默认 200000、`cmdPrefix` 默认 null） |
| `toolNameOverrides` / `paramNameOverrides` | map | 否 | 空 | 工具名/参数名映射 |
| `completionRequirement` | object | 否 | null | 结束回合前必须调用的工具（`tool`、`reminder`、可选 `recovery`） |
| `toolConfig` | map | 否 | 空 | 逐工具执行配置（如 `retry`） |

未知 frontmatter 字段被**静默忽略**以保证向前兼容；解析失败的错误类型为 `ParseError`、`MissingField`、`UnknownToolOverride`、`IoError`、`MiniJinjaError` [@ref-grok-agents-error-handling]。

**prompt 装配**：`promptMode: extend`（默认）把基础模板（work policy、格式化规则、user_info、后台任务）与正文拼接；`promptMode: full` 把正文当作完整 system prompt，并用 MiniJinja 的 `${{ }}` / `${% %}` 分隔符渲染 [@ref-grok-agents-prompt-assembly]。可用模板变量包括 `tools.by_kind.read|edit|execute|search|list|plan|skill|web_search`、`os_name`、`shell_path`、`working_directory`、`current_date`，条件块形如 `${%- if tools.by_kind.plan %}…${%- endif %}` 在对应工具种类被禁用时被省略 [@ref-grok-agents-full-override][@ref-grok-agents-template-vars]。

**role 与 persona 的字段**：role 支持 `description`、`default_capability_mode`、`model`、`prompt_file` [@ref-grok-agents-custom-roles]；persona 支持 `instructions`、`instructions_file`（在 spawn 时加载并合并到 `instructions` 之后）、`description`（回退为 `instructions` 首段）、`inputs`/`outputs`、`model`、`reasoning_effort`、`default_isolation` [@ref-grok-agents-persona-fields]；`inputs`/`outputs` 每项含 `name`、`io_type`（默认 `file`）、`required`、`description` [@ref-grok-agents-io-contracts]。

**插件 agent 的字段限制**：出于安全，插件 agent 的 frontmatter 不能声明 `mcpServers` 或 hooks、也不能设置 `permissionMode: bypassPermissions` [@ref-grok-agents-plugin-trust]。

缺口：除 `name`/`description`/`tools`/`mcpInheritance` 等少数键外，完整 frontmatter schema 只出现在仓库内部 README（`crates/codegen/xai-grok-agent/README.md`），面向用户的 `05-configuration.md` 与 `26-config-reference.md` 并未逐条重复；因此这些字段的稳定性与适用版本无法从固定来源完全确认。persona 的 `.toml` 文件除“只发现 `.toml`”与“文件名即 persona 名”外没有更完整的文件级 schema 说明。

## 调用：显式选择与自动委派 {#agents-invocation}

**主代理的显式选择**：交互式 `grok` 在没有 `--plan`、`--ask-user`、`--agent-profile` 时使用 `[agent]` 配置 [@ref-grok-agents-default-agent]：

```toml
[agent]
name = "my-custom-agent"
# definition = "/path/to/agent.md"   # 路径优先于 name
```

`name` 取内置或已发现的 agent；`definition` 直接指向定义文件且优先。若命名的 agent 不存在，依次回退到 `GROK_AGENT` 环境变量、再回退到内置默认 [@ref-grok-agents-config-agent]。TUI 中可用 `/config-agents`（别名 `/agents`）查看并管理定义、设置默认与切换当前 agent；`/personas` 打开 Personas 标签 [@ref-grok-agents-slash-config-agents][@ref-grok-agents-slash-personas]。

**无头/脚本入口**：`grok agent …` 支持 `--agent-profile` 从文件加载 agent profile [@ref-grok-agents-default-agent]；headless 另提供 `--agent`（agent 名或定义文件路径）、`--agents`（内联 JSON 子代理定义）、`--system-prompt-override` [@ref-grok-agents-headless-flags]。`--tools`/`--disallowed-tools` 还接受特殊 `Agent` 条目控制子代理生成：`Agent` 阻断全部生成，`Agent(explore)`、`Agent(explore, plan)` 阻断指定类型 [@ref-grok-agents-headless-tool-filtering]。

**主代理的自动委派**：主代理识别到可委派的工作时，调用 `spawn_subagent` 工具创建子会话；子会话有独立上下文窗口，完成后把摘要返回父会话 [@ref-grok-agents-how-subagents-work]。`spawn_subagent` 的参数包括 `prompt`、`description`、`run_in_background`（默认 `true`）、`isolation`（`none`/`worktree`，默认 `none`）、`resume_from`、`cwd` [@ref-grok-agents-spawning]。

**类型选择规则**：省略 `subagent_type` 时用 `general-purpose`；当存在插件/项目/用户 agent 时，`subagent_type` 是这些 agent 的枚举（例如 `my-plugin:reviewer`），内置名与 xAI 捆绑 agent 不在枚举中；若父代理的 `tools` 用 `Agent(...)` 限制了生成，枚举只显示允许的类型；未知类型会让调用失败并返回有效类型列表 [@ref-grok-agents-builtin-types]。文档站把子代理管理入口归纳为 `/config-agents`（别名 `/agents`）与 `/personas`，类型定义放在 `.grok/agents/` 或 `~/.grok/agents/` [@ref-grok-docs-skills-plugins-subagents][@ref-grok-docs-subagents-builtin-types]。此外 `send_subagent_message`（默认关闭）允许父会话给子代理追加消息 [@ref-grok-agents-send-messages]。

persona **不是** `spawn_subagent` 的参数：Grok 通过子代理解析与 role 应用 persona，主代理生成子代理时不传 persona 名 [@ref-grok-agents-agents-vs-personas]。

缺口：固定来源只说明“主代理识别到可委派工作时”调用工具，没有给出模型侧的自动委派启发式或阈值（何时该委派、如何挑选类型只在 `subagent_type` 级给出规则）。已检查 `16-subagents.md` 的 How Subagents Work、Spawning Subagents 两节与文档站 Subagents 页。

## 模型、工具、权限、隔离与继承 {#agents-overrides}

**定义层覆盖**：`tools`/`disallowedTools` 控制工具集（denylist 优先），`permissionMode` 取 `default`/`acceptEdits`/`dontAsk`/`plan`，`bash` 覆盖 Bash 工具参数，`skills` 预加载 skill，`agentsMd` 控制 AGENTS.md 注入 [@ref-grok-agents-frontmatter-schema]。

**能力模式**：能力模式不是 spawn 参数，子代理的工具来自它的 **agent 类型**与 role/定义默认值；`general-purpose` 不受限（`all`）[@ref-grok-agents-capability-modes]：

| 模式 | 读 | 写 | 执行 | 说明 |
| :-- | :-- | :-- | :-- | :-- |
| `read-only` | 是 | 否 | 否 | 只读、搜索、检查（含 web search 与 LSP），不改文件、不跑 shell |
| `read-write` | 是 | 是 | 否 | 可增删改移文件，不能跑 shell |
| `execute` | 是 | 否 | 是 | 可跑 shell 与后台任务，不改文件 |
| `all` | 是 | 是 | 是 | 无限制，`general-purpose` 的默认 |

**模型覆盖与继承**：`[subagents.toggle]` 可逐类型启停，`[subagents.models]` 可把某类型路由到指定模型；没有覆盖时子代理继承父代理模型 [@ref-grok-agents-per-type-toggles]。`spawn_subagent` 还向模型暴露一个 `model` 参数；当 `[features] subagent_model_inheritance = true`（或 `GROK_SUBAGENT_MODEL_INHERITANCE=1`）且可选模型全为 xAI 模型时，该参数被隐藏、子代理只继承父模型，`[subagents.models]` 固定值、role 与 persona 不受影响；该开关在会话启动时读取，修改需重启 [@ref-grok-agents-model-selection][@ref-grok-agents-config-feature-subagent-model]。

**MCP 继承**：子代理默认继承父会话**已连接**的 MCP server；frontmatter `mcpInheritance` 可改为 `all`（省略时默认）、`none`、`named: [server, …]` 或 `except: [server, …]` [@ref-grok-agents-mcp-inheritance]。插件 agent 以同样方式继承父会话的 MCP，但不能声明自己的 `mcpServers`/hooks，或设置 `permissionMode: bypassPermissions` [@ref-grok-agents-mcp-inheritance][@ref-grok-agents-plugin-trust]。

**persona/role 的解析顺序**（有效模型与 reasoning effort，优先级从高到低）：显式 spawn 时覆盖 → role 默认 → persona 默认 → 父会话 [@ref-grok-agents-persona-resolution]。isolation 按同样顺序解析前三级，但默认 `none`（不建 worktree），而不是继承父会话 [@ref-grok-agents-persona-resolution]。role 的 `default_capability_mode`、`model`、`prompt_file` 是子代理级的默认值 [@ref-grok-agents-custom-roles]；persona 的 `model`、`reasoning_effort`、`default_isolation` 在被使用时生效 [@ref-grok-agents-persona-fields]。

**隔离**：`isolation: worktree` 让子代理在自己的 git worktree 副本里工作，改动在合并前与父会话隔离；Grok 通过 `x.ai/git/worktree/*` 扩展方法管理 worktree，包括把改动合并回主工作目录 [@ref-grok-agents-isolation-worktree]。

缺口：固定来源没有给出任何“逐 agent 的 sandbox 覆盖”字段——沙箱在 `15-agent-mode.md` 中表现为会话/进程级（例如请求非 `off` 的 sandbox profile 时会拒绝 leader 模式），`18-sandbox.md` 与 `[sandbox]` 也按会话组织。因此“每个 Agent 能否单独指定沙箱、如何继承父级沙箱”在固定来源中未确立。已检查 `16-subagents.md` 的 Capability Modes / MCP inheritance / Custom Roles and Personas、`26-config-reference.md` 的 `subagents` 与 `sandbox` 两节。

## 并发、深度、预算与上下文边界 {#agents-limits}

`26-config-reference.md` 的 `subagents` 键 [@ref-grok-agents-config-subagents-ref]：

| 键 | 类型 | 说明 |
| :-- | :-- | :-- |
| `subagents.enabled` | boolean | 子代理 / task 工具总开关，默认 true |
| `subagents.max_concurrent` | integer | 最大并发子代理数 |
| `subagents.max_depth` | integer | 最大子代理嵌套深度（clamp 到 ≥1） |
| `subagents.limit_behavior` | `queue / fail` | 命中并发上限时的行为 |
| `subagents.models` 下的逐类型表项 | string | 逐类型模型覆盖 |
| `subagents.toggle` 下的逐类型表项 | boolean | 逐类型启停；省略的类型默认开启 |

`05-configuration.md` 另给出 `sampling_limit`：单进程内并发的子代理采样调用上限，未设置时默认为 `max_concurrent`（示例注释为 32），可用 `GROK_SUBAGENT_SAMPLING_LIMIT` 覆盖 [@ref-grok-agents-config-subagents]。

**深度的两种说法（冲突）**：配置参考把 `subagents.max_depth` 描述为可配置、clamp 到 ≥1 的“最大嵌套深度” [@ref-grok-agents-config-subagents-ref]；而 `16-subagents.md` 的 Depth Limits 节明确写“只有顶层会话能生成子代理，子代理不能再生子代理，最大嵌套深度为一”，子代理若调用 `spawn_subagent` 会以深度限制错误失败 [@ref-grok-agents-depth-limits]。两者对“嵌套是否可配置”不一致，固定来源不足以判定实际行为，需运行观察。

**消息配额**：子代理消息每“发送者—目标”对最多 4 条在途消息，每次发送尝试最多 32 条出站消息，超限返回 `QuotaExceeded` [@ref-grok-agents-send-messages]。该工具默认关闭，可用 `GROK_ACTIVE_AGENT_MESSAGES` 或 `[features] active_agent_messages` 打开 [@ref-grok-agents-send-messages][@ref-grok-agents-config-feature-active-agent-messages]。

**上下文边界**：每个子代理有独立上下文窗口；`resume_from` 让新子代理继承已完成子代理的 transcript、工具状态与模型（其 system prompt 与工具按当前 agent 定义重新渲染，源子代理必须已完成、属于同一会话、同一 agent 类型）[@ref-grok-agents-context-inheritance]。

**关闭子代理**：优先级从高到低为 CLI 标志 `--no-subagents`、环境变量 `GROK_SUBAGENTS=0`、配置 `[subagents] enabled = false`；三者对交互 TUI、`grok agent stdio` 与 headless 一致。仅显式 `enabled = false` 才关闭，只设置 `max_depth`、`[subagents.models]` 或 `[subagents.toggle]` 会保持开启 [@ref-grok-agents-disabling]。

**工作流预算**：工作流用绝对累计的 `agent_budget` 上限约束逻辑子代理调用（每个 `agent()` 调用与 `parallel()` 面板中的每一项各占一格，schema 纠正重试不占）；默认 128，显式取值 1–1,024，超出剩余预算的面板在子代理启动前即被拒绝；另有宿主配置的默认 32 上限 [@ref-grok-agents-workflow-budget]。

## 诊断与重载 {#agents-diagnostics}

**管理面板**：`/config-agents`（别名 `/agents`）打开 agents 模态，查看/管理 agent 定义、设置默认、切换当前 agent；`/personas` 打开 Personas 标签 [@ref-grok-agents-slash-config-agents][@ref-grok-agents-slash-personas]。命令面板 `Ctrl+P` → Manage Agents 是同一入口；该入口在 minimal 模式下隐藏，可用 `GROK_AGENT_DASHBOARD=0` 或 `[dashboard].enabled = false` 关闭 [@ref-grok-agents-tasks-pane]。

**任务与运行视图**：`Ctrl+G` 切换 tasks pane，按 Subagents 分组列出活动与已完成的子代理、后台命令及其状态；`Ctrl+T` 切换 todo pane [@ref-grok-agents-tasks-pane]。scrollback 里为子代理生成生命周期块（含状态动画与活动后缀），按 `Enter`/`Ctrl+F` 打开该子代理的完整 transcript（fullscreen 框景视图，只读、无法输入）[@ref-grok-agents-tui-views]。`/tasks` 列出后台任务、子代理与定时任务 [@ref-grok-docs-modes-core-commands]。

**配置级检视**：`grok inspect` 列出发现的项目指令文件及其路径与 token 估算 [@ref-grok-agents-inspect-rules]，文档站也把 `grok inspect` 用作“确认加载了什么”的检查入口 [@ref-grok-docs-project-rules-verification]；插件场景下 `grok inspect`（可加 `--json`）列出每个已发现插件及其提供的 skills、agents、hooks、MCP server，并标注插件来源前缀 `plugin:` [@ref-grok-agents-plugin-inspect]，`grok plugin details` 显示某插件的组件清单 [@ref-grok-agents-plugin-cli]。

**失败定位**：未知 `subagent_type` 的调用失败并返回有效类型列表 [@ref-grok-agents-builtin-types]；子代理越界调用 `spawn_subagent` 以深度限制错误失败 [@ref-grok-agents-depth-limits]；定义解析失败给出 `ParseError`/`MissingField`/`UnknownToolOverride` 等错误 [@ref-grok-agents-error-handling]；persona 无法解析（不存在、无 instructions、`instructions_file` 不可读）时 spawn 失败 [@ref-grok-agents-persona-resolution]；`--disallowed-tools "Agent(...)"` 是限制子代理生成的显式开关，便于隔离权限/委派问题 [@ref-grok-agents-headless-tool-filtering]。

缺口：固定来源没有给出一个专门枚举 `.grok/agents/*.md` 定义的 `grok inspect` 小节，也没有说明新增/修改 agent 定义后的热重载语义（Plugins 标签页的 `r` 键重载插件，但 agent 定义本身的重载规则未说明）。已检查 `12-project-rules.md` 的 Inspecting Loaded Rules、`09-plugins.md` 的 Manage plugins / Troubleshooting、`16-subagents.md` 的 TUI 各节。
