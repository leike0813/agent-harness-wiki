---
schema_version: 3
record_kind: production
edition_id: openhands-cli-custom_agents-v2
harness_id: openhands
topic: custom_agents
title: "OpenHands CLI 的自定义 Agent：定义位置、字段、角色、委派、覆盖与边界"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-pyproject, ref-openhands-cli-readme-status, ref-openhands-canvas-boundaries, ref-openhands-docs-agent-legacy]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-sdk-agents-register, ref-openhands-sdk-agents-load, ref-openhands-sdk-agents-registry, ref-openhands-docs-agent-dirs]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-agents-fields, ref-openhands-sdk-agents-known-fields, ref-openhands-docs-agent-format, ref-openhands-docs-agent-fields]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-cli-default-tools, ref-openhands-docs-agents-codeact, ref-openhands-docs-agent-legacy, ref-openhands-sdk-task-toolset, ref-openhands-sdk-preset-builtins, ref-openhands-docs-agent-builtins, ref-openhands-sdk-agents-registry, ref-openhands-cli-main-flags, ref-openhands-cli-acp-local, ref-openhands-canvas-acp-what]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-task-toolset, ref-openhands-sdk-agents-factory, ref-openhands-cli-default-tools, ref-openhands-docs-agent-delegation, ref-openhands-docs-task-how]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-agents-registry, ref-openhands-sdk-agents-fields, ref-openhands-sdk-llm-profile-store, ref-openhands-sdk-skills-expand, ref-openhands-sdk-task-manager, ref-openhands-docs-agent-fields]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-task-iteration, ref-openhands-sdk-task-manager, ref-openhands-sdk-task-toolset, ref-openhands-sdk-delegate-limits, ref-openhands-sdk-settings-agent, ref-openhands-docs-task-lifecycle, ref-openhands-docs-task-observation, ref-openhands-docs-task-resuming]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-agents-load, ref-openhands-sdk-agents-registry, ref-openhands-sdk-task-toolset, ref-openhands-cli-resources]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-sdk-agents-register, ref-openhands-sdk-agents-load, ref-openhands-docs-agent-dirs]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-openhands-sdk-agents-fields, ref-openhands-sdk-agents-known-fields, ref-openhands-docs-agent-format]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-openhands-cli-default-tools, ref-openhands-docs-agents-codeact, ref-openhands-docs-agent-legacy, ref-openhands-sdk-preset-builtins, ref-openhands-docs-agent-builtins, ref-openhands-cli-main-flags, ref-openhands-cli-acp-local, ref-openhands-canvas-acp-what]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-openhands-sdk-task-toolset, ref-openhands-sdk-agents-factory, ref-openhands-cli-default-tools, ref-openhands-docs-agent-delegation]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-openhands-sdk-agents-registry, ref-openhands-sdk-agents-fields, ref-openhands-sdk-llm-profile-store, ref-openhands-sdk-skills-expand, ref-openhands-sdk-task-manager]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-openhands-sdk-task-iteration, ref-openhands-sdk-task-manager, ref-openhands-sdk-task-toolset, ref-openhands-sdk-delegate-limits, ref-openhands-sdk-settings-agent]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-openhands-sdk-agents-load, ref-openhands-sdk-agents-registry, ref-openhands-sdk-task-toolset, ref-openhands-cli-resources]
---

## 固定来源与调查范围 {#agents-scope}

本页只回答 CLI 界面（`surface_id: cli`）。固定来源：CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba`（包 `openhands` 1.16.0）[@ref-openhands-cli-pyproject]（该仓库已不再积极维护 [@ref-openhands-cli-readme-status]）；子代理机制由 CLI 依赖的 `openhands-sdk==1.28.1` 与 `openhands-tools` 提供（本目录固定提交 `edaac806`）[@ref-openhands-cli-pyproject]；产品 Web 端位于另一官方仓库 [@ref-openhands-canvas-boundaries]。官方文档站点页面作为文档快照来源，适用软件版本未知；其中 `openhands/usage/agents.md` 已被上游改标为旧 Python 单体仓库的归档文档，并指向 SDK 的 Agent Architecture 页 [@ref-openhands-docs-agent-legacy]。

## 自定义 Agent 在哪里定义 {#agents-entry}

CLI 不读取任何“agent 定义列表”配置；它创建本地会话对象，由 SDK 在会话初始化时自动注册可达的 Agent 文件 [@ref-openhands-cli-setup-conversation] [@ref-openhands-sdk-agents-register]。扫描目录（先项目、后用户，均为顶层 `*.md`）[@ref-openhands-sdk-agents-load]：

| 作用域 | 目录 |
| --- | --- |
| 项目 | `{项目根}/.agents/agents/` 与 `{项目根}/.openhands/agents/` |
| 用户 | `~/.agents/agents/` 与 `~/.openhands/agents/` |
| 插件 | 插件包的 `agents/` 目录 |

扫描细节：只看目录顶层的 `*.md`，跳过子目录与 `README.md`，逐个按名字排序解析；单个文件解析失败只记录告警并继续 [@ref-openhands-sdk-agents-load]。注册顺序（先注册者生效，后到同名的被忽略）：程序化 `register_agent()` → 插件提供的 Agent → 项目 `.agents/agents` → 项目 `.openhands/agents` → 用户 `.agents/agents` → 用户 `.openhands/agents` → 内置 Agent [@ref-openhands-sdk-agents-registry]。官方文档给出的目录约定与优先级与之一致 [@ref-openhands-docs-agent-dirs]。

## 定义文件格式与字段 {#agents-format}

一个 Agent 是一个带 YAML frontmatter 的 Markdown 文件，Markdown 正文即系统提示 [@ref-openhands-sdk-agents-fields]。识别的 frontmatter 键为 `name`、`description`、`model`、`color`、`tools`、`skills`、`max_iteration_per_run`、`hooks`、`profile_store_dir`、`mcp_servers`、`permission_mode`；未识别的键不报错，被保留在 `metadata` 中 [@ref-openhands-sdk-agents-known-fields] [@ref-openhands-sdk-agents-fields]。

字段语义与默认值 [@ref-openhands-sdk-agents-fields]：

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `name` | 文件名（去扩展名） | 注册键，也是子代理类型名 |
| `description` | `""` | 面向模型的用途说明；其中的示例标签会被抽取为使用场景 |
| `model` | `inherit` | `inherit` 表示沿用父级 LLM，其他值从 profile store 载入对应档案 |
| `tools` | `[]` | 工具名白名单；支持字符串或列表写法；未注册的工具名会在解析时报错 |
| `skills` | `[]` | Skill 名列表（支持逗号分隔字符串）；名字要在项目/用户 Skill 目录里找得到 |
| `max_iteration_per_run` | 无 | 正整数，仅约束该子代理的单次运行迭代数 |
| `hooks` | 无 | 该子代理子会话使用的 Hook 配置 |
| `profile_store_dir` | 无 | 指定 LLM 档案目录（配合 `model` 非 inherit） |
| `mcp_servers` | 无 | 该子代理专用的 MCP server 映射，支持 `${VAR}` 占位符，运行时才展开 |
| `permission_mode` | 无（继承父级） | 取值 `always_confirm`、`never_confirm`、`confirm_risky`，映射成对应确认策略 |

文档给出的字段表与示例文件（`name`、`description`、`tools`、`model: inherit`）与源码一致 [@ref-openhands-docs-agent-format] [@ref-openhands-docs-agent-fields]。

## 角色：主代理、子代理与 ACP {#agents-roles}

- 主代理：CLI 通过 `AgentStore` 构造一个 OpenHands Agent（默认工具集含终端、文件编辑、任务追踪与委派工具），并把它放进 `Conversation` [@ref-openhands-cli-setup-conversation] [@ref-openhands-cli-default-tools]。一份官方文档把这一类主代理描述为 CodeAct 风格（可对话、可执行 bash/Python），但该页已被上游标注为旧 Python 单体仓库的归档文档，并不描述当前 SDK 代理 [@ref-openhands-docs-agents-codeact] [@ref-openhands-docs-agent-legacy]。
- 子代理：由 SDK 的 TaskToolSet（旧会话为 DelegateTool）按 `subagent_type` 现场创建并运行，属于“原生实现” [@ref-openhands-sdk-task-toolset] [@ref-openhands-cli-default-tools]。
- 内置子代理：`register_builtins_agents()` 从 `openhands-tools` 的 `preset/subagents/*.md` 注册 general-purpose、code-explorer、bash-runner、web-researcher 等；CLI 以 `enable_browser=False` 调用，因此不含依赖浏览器的 web-researcher [@ref-openhands-sdk-preset-builtins]。文档列出同一组内置子代理并说明如何注册 [@ref-openhands-docs-agent-builtins]。
- 旧名兼容：`default`→general-purpose、`explore`→code-explorer、`bash`→bash-runner 等别名仍可用，但会记录弃用告警 [@ref-openhands-sdk-agents-registry]。
- ACP：CLI 还能以 `openhands acp` 形式作为 Agent Client Protocol 服务端运行，由 IDE 通过 ACP 调用同一个本地代理（另一种方向：CLI 作为被调用的 agent，而非托管别人）[@ref-openhands-cli-main-flags] [@ref-openhands-cli-acp-local]。产品另一界面 Agent Canvas 则相反，它可以托管 Claude Code、Codex、Gemini CLI 这类 ACP 代理 [@ref-openhands-canvas-acp-what]。

## 调用与委派 {#agents-invocation}

用户在 CLI 里没有“直接运行某个子代理”的命令；调用由主代理的工具完成：主代理调用任务工具，指定 `subagent_type`，SDK 用注册表里的工厂函数实例化该 Agent，在独立会话中运行并把结果作为观察返回 [@ref-openhands-sdk-task-toolset] [@ref-openhands-sdk-agents-factory]。选择规则：`subagent_type` 为空或为 `default` 时使用 general-purpose；名字找不到时注册表查找失败并报错 [@ref-openhands-sdk-agents-factory]。CLI 默认在工具集里带上任务工具（旧会话按持久化的工具集恢复为 DelegateTool），因此每次会话都能委派 [@ref-openhands-cli-default-tools]。

文档说明：“委派”的入口就是任务工具；文件式 Agent 的用途是被委派调用，而不是被用户直接启动 [@ref-openhands-docs-agent-delegation] [@ref-openhands-docs-task-how]。

## 模型、工具、MCP、Hook 与权限覆盖 {#agents-overrides}

工厂函数 `agent_definition_to_factory()` 把定义翻译成可实例化的 Agent [@ref-openhands-sdk-agents-registry]：

- 工具：`tools` 中的每个名字都要能在工具注册表里解析，否则抛错；因此文件式 Agent 只能使用宿主已注册的工具。
- Skill：`skills` 中的名字从项目与用户 Skill 目录解析，缺失即抛错。
- 提示：定义正文被放进子代理的 `AgentContext.system_message_suffix`。
- 模型：`model: inherit` 沿用父级 LLM；其他取值从 `profile_store_dir`（默认 `~/.openhands/profiles`）加载同名 LLM 档案 [@ref-openhands-sdk-agents-registry] [@ref-openhands-sdk-llm-profile-store]。
- MCP：`mcp_servers` 直接构成子会话的 `mcp_config`，`${VAR}` 占位符在运行时展开 [@ref-openhands-sdk-agents-fields] [@ref-openhands-sdk-skills-expand]。
- Hook：定义里的 `hooks` 作为子会话语义上的 Hook 配置传入（子会话的 Hook 不继承父级）[@ref-openhands-sdk-agents-fields]。
- 权限：`permission_mode` 映射为确认策略；未指定时继承父会话策略 [@ref-openhands-sdk-agents-fields]。
- 指标与流式：子代理的 LLM 以非流式运行并重置指标，运行结束后把用量归到父级的任务键上 [@ref-openhands-sdk-task-manager]。

文档的字段说明（`model` 可为 `inherit`、`tools` 白名单、`skills` 引用）与上述映射一致 [@ref-openhands-docs-agent-fields]。

## 并发、嵌套与边界 {#agents-limits}

- 迭代上限：该子代理定义中的 `max_iteration_per_run` 优先，否则用父会话的 `max_iteration_per_run`（本地会话默认 500）[@ref-openhands-sdk-task-iteration]。
- 串行性：任务工具是阻塞式的——一次只跑一个任务，运行结束后才返回观察；观察里的状态取 `running`/`completed`/`error`，同一次任务可用返回的 task id 继续 [@ref-openhands-sdk-task-manager] [@ref-openhands-sdk-task-toolset]。文档对任务生命周期的描述一致 [@ref-openhands-docs-task-lifecycle] [@ref-openhands-docs-task-observation] [@ref-openhands-docs-task-resuming]。
- 旧委派工具：`DelegateTool` 另有一个子代理数量上限 5，超过即拒绝新建 [@ref-openhands-sdk-delegate-limits]。
- 缺口：固定快照中没有子代理**嵌套深度**上限的实现或说明；也没有并发上限（除旧 DelegateTool 的 5 个），任务工具本身一次一个 [@ref-openhands-sdk-task-manager] [@ref-openhands-sdk-delegate-limits]。工具层面的并发由 Agent 的 `tool_concurrency_limit`（默认 1）控制，与子代理数量无关 [@ref-openhands-sdk-settings-agent]。

## 诊断 {#agents-diagnostics}

1. 是否被发现：加载目录时会逐个解析并记录日志；解析失败（YAML 非法、工具名未注册、Skill 名不存在）只影响该文件 [@ref-openhands-sdk-agents-load] [@ref-openhands-sdk-agents-registry]。
2. 是否被注册：注册表提供查询接口（列出已注册名字与工厂信息），可用 SDK 侧脚本或日志确认实际生效的名字，尤其是项目与内置同名时的“先注册者优先”结果 [@ref-openhands-sdk-agents-registry]。
3. 调用是否成功：任务观察里的状态与错误信息是主要依据，`TaskObservation` 会带上任务 id 便于继续或复跑 [@ref-openhands-sdk-task-toolset]。
4. CLI 内可见性：TUI 的 `/skills` 只列 Skills、Hooks 与 MCP，不列 Agent/子代理 [@ref-openhands-cli-resources]；确认子代理注册情况需要看日志或用 SDK 接口查询，这是当前界面下的缺口 [@ref-openhands-sdk-agents-registry]。
