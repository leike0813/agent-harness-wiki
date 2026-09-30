---
schema_version: 3
record_kind: production
edition_id: crush-cli-custom_agents-v1
harness_id: crush
topic: custom_agents
title: "Crush 的内置 Agent：coder/plan/task 的角色、调用与边界"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-crush-code-agent-struct, ref-crush-code-agent-setup, ref-crush-code-config-struct]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-crush-code-config-struct, ref-crush-code-agent-setup, ref-crush-schema-root, ref-crush-code-coordinator-agents, ref-crush-code-task-tool, ref-crush-configdoc-cmdref, ref-crush-code-skill-dirs]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-crush-code-agent-struct, ref-crush-code-agent-setup, ref-crush-code-config-defaults]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-crush-code-agent-setup, ref-crush-code-tool-names, ref-crush-code-agent-tool-sets, ref-crush-code-agent-prompts, ref-crush-code-template-coder, ref-crush-code-template-plan, ref-crush-code-task-template, ref-crush-code-prompt-skills, ref-crush-code-agent-struct]
  - section_id: agents-invocation-limits
    surface_ids: [cli]
    source_refs: [ref-crush-code-mode-switch, ref-crush-code-set-main-agent-backend, ref-crush-code-set-main-agent, ref-crush-code-task-tool, ref-crush-code-task-template, ref-crush-code-run-subagent, ref-crush-code-agent-setup, ref-crush-code-build-tools, ref-crush-code-agent-tool-sets]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-crush-code-agent-setup, ref-crush-code-agent-models, ref-crush-code-option-specs, ref-crush-code-permissions-builtin, ref-crush-code-build-tools, ref-crush-code-permission-service, ref-crush-code-cli-flags, ref-crush-code-store-overrides, ref-crush-code-agent-struct]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-mode-switch, ref-crush-code-set-main-agent-backend, ref-crush-code-info-tool, ref-crush-code-task-tool, ref-crush-code-run-subagent, ref-crush-readme-logging, ref-crush-code-agent-setup]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: not_applicable
        source_refs: [ref-crush-code-config-struct, ref-crush-code-agent-setup, ref-crush-schema-root, ref-crush-code-coordinator-agents, ref-crush-configdoc-cmdref]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: not_applicable
        source_refs: [ref-crush-code-agent-struct, ref-crush-code-agent-setup]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-crush-code-agent-setup, ref-crush-code-tool-names, ref-crush-code-agent-tool-sets, ref-crush-code-agent-prompts, ref-crush-code-task-template]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-limits
        status: answered
        source_refs: [ref-crush-code-mode-switch, ref-crush-code-set-main-agent-backend, ref-crush-code-task-tool, ref-crush-code-run-subagent]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-crush-code-agent-struct, ref-crush-code-agent-models, ref-crush-code-option-specs, ref-crush-code-permission-service, ref-crush-code-cli-flags]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-limits
        status: partial
        source_refs: [ref-crush-code-agent-setup, ref-crush-code-agent-tool-sets, ref-crush-code-build-tools, ref-crush-code-run-subagent, ref-crush-code-task-tool]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-crush-code-mode-switch, ref-crush-code-info-tool, ref-crush-code-task-tool, ref-crush-readme-logging]
---

## 固定来源与界面 {#agents-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出，引用以下文件与位置 [@ref-crush-code-agent-struct][@ref-crush-code-agent-setup]：

- `internal/config/config.go`：`Agent` 结构与 `SetupAgents`（三个内置 agent 的定义来源）。
- `internal/agent/coordinator.go`：agent 构建、主 agent 切换、工具集装配、子代理运行。
- `internal/agent/agent_tool.go`：`agent` 任务工具（子代理入口）。
- `internal/agent/prompts.go` 与 `internal/agent/templates/`：三份系统提示模板。
- `internal/backend/agent.go` 与 `internal/ui/model/ui.go`：code/plan 模式切换。

README 没有专门的“自定义 agent”章节；界面口径为 catalog 唯一登记的 `cli`。

结论先写：**固定来源里没有用户可定义的自定义 Agent**。[@ref-crush-code-config-struct]

## 定义入口是否存在 {#agents-entry}

`Config` 结构里确实有 `Agents map[string]Agent`，但它带 `json:"-"` 标签，意味着它**不从任何配置文件读写**；`SetupAgents` 在每次加载与重载后用代码常量硬编码出三个 agent：`coder`、`plan`、`task`。config 目录、数据目录、技能目录里都没有 agent 定义文件，配置 schema 的顶层键里也没有 `agents`。[@ref-crush-code-config-struct][@ref-crush-code-agent-setup][@ref-crush-schema-root]

因此 `agents.entry` 的结论是 `not_applicable`：Crush 不提供用户级或项目级的 agent 定义入口，三个内置 agent 是编译期固定的。[@ref-crush-code-config-struct][@ref-crush-code-agent-setup]

本轮检查过的入口，按“会不会藏着 agent 定义”逐项排除：

- `Config` 结构的全部字段与 JSON 标签：只有 `Agents` 带 `json:"-"`，其余是 models、providers、mcp、lsp、options、permissions、tools、hooks、env。[@ref-crush-code-config-struct]
- `schema.json` 的顶层键与 `$defs`：没有 `agents`/`subagents` 一类的定义 [@ref-crush-schema-root]。
- agent 的装配路径：`NewCoordinator` 只从配置里取 `coder` 与 `plan` 两个条目，`agent` 工具只取 `task` 条目；取不到就分别报 `errCoderAgentNotConfigured`、`errPlanAgentNotConfigured`、`task agent not configured`，说明这三个键是必需常量而不是可枚举的用户集合。[@ref-crush-code-coordinator-agents][@ref-crush-code-task-tool]
- 配置命令清单与技能目录：`crushrc` 的七组内建命令与技能目录里都没有 agent 相关项。[@ref-crush-configdoc-cmdref][@ref-crush-code-skill-dirs]

## 定义字段（内部结构） {#agents-format}

虽然没有用户入口，固定来源仍完整给出了 agent 的内部字段，读者可据此理解内置角色的差异；下面每一项都取自 `Agent` 结构定义 [@ref-crush-code-agent-struct]：

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `ID` / `Name` / `Description` | string | 标识、展示名与一句话描述 |
| `Disabled` | bool | 结构里有该字段，内置三个 agent 都未置位 |
| `Model` | `large` / `small` | 要使用的模型槽位；`SetupAgents` 把三个 agent 都设为 `large` |
| `AllowedTools` | string[] | 该 agent 可用的宿主工具名白名单；nil 表示全给 |
| `AllowedMCP` | map（server 名到工具名列表） | MCP 工具授权表；为 nil 表示不限制，空 map 表示一个都不给，列出 server 时其值为空列表表示该 server 的全部工具 |
| `ContextPaths` | string[] | 该 agent 注入的上下文文件列表 |

`agents.format` 因此记为 `not_applicable`（就“用户可写的定义文件或配置字段”而言）：上面的字段只出现在 Go 结构里，没有任何文件或配置键能设置它们；唯一用户可控的是全局的上下文路径与工具开关，它们会被折算进这些字段。已知的内部形态与已检查的缺口就是这张表本身——如果后续版本把 `Agents` 的 `json:"-"` 去掉，本章需要重新调查。[@ref-crush-code-agent-struct][@ref-crush-code-agent-setup]

这些字段的实际取值全部由全局配置折算而来，关系是单向的 [@ref-crush-code-agent-setup][@ref-crush-code-config-defaults]：

- `ContextPaths` 直接取 `options.context_paths`（默认值加上用户配置里追加的路径）。
- `AllowedTools` 先取全部工具名，再扣掉 `options.disabled_tools`。
- `AllowedMCP` 由代码写死：coder 不限制，plan 与 task 为空 map。
- `Model` 由代码写死为 `large` 槽位，不读取 `models` 里除槽位选择之外的任何东西。

## 三个内置角色 {#agents-roles}

| 角色 | agent id | 定位 | 模型槽位 | 工具集 | MCP 工具 | 上下文 |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Coder | `coder` | 主 agent，默认 | large | 全部宿主工具（扣掉 `options.disabled_tools`） | 不限制（`AllowedMCP` 为 nil） | `options.context_paths` |
| Plan | `plan` | 只读分析、出方案 | large | `agent`、`glob`、`grep`、`ls`、`lsp_call_hierarchy`、`lsp_definition`、`lsp_symbols`、`question`、`sourcegraph`、`view` | 空 map，一个都不给 | 同左 |
| Task | `task` | 子代理（被 `agent` 工具调用） | large | 只读集合：`glob`、`grep`、`ls`、`lsp_call_hierarchy`、`lsp_definition`、`lsp_symbols`、`sourcegraph`、`view` | 空 map，一个都不给 | 同左 |

依据：`SetupAgents` 里的三份定义，以及三个工具集合函数 [@ref-crush-code-agent-setup][@ref-crush-code-tool-names][@ref-crush-code-agent-tool-sets]：

- `allToolNames` 是全部宿主工具名（含 `agent`、`agentic_fetch`、`bash`、`view`、`edit`、LSP 系列、`question`、`todos` 等）。
- `resolveReadOnlyTools` 从给定集合里只保留只读工具（`glob`、`grep`、`ls`、LSP 查询系列、`sourcegraph`、`view`），task agent 用这个。
- `resolvePlanTools` 在只读集合之外补上 `agent` 与 `question`，plan agent 用这个。

三者的系统提示词同样不来自用户文件，而是编译进二进制的模板 [@ref-crush-code-agent-prompts][@ref-crush-code-template-coder][@ref-crush-code-template-plan][@ref-crush-code-task-template][@ref-crush-code-prompt-skills]：

- 入口函数：`coderPrompt`、`planPrompt`、`taskPrompt` 各自加载对应模板。
- 注入内容：工作目录、平台、日期、git 状态与最近提交、上下文文件内容、可用技能列表等运行期数据。
- 模板文件：`coder.md.tpl`、`plan.md.tpl`、`task.md.tpl`。
- 用户可控的部分：被注入的**上下文文件内容**，不是模板本身。[@ref-crush-code-agent-prompts][@ref-crush-code-template-coder][@ref-crush-code-template-plan][@ref-crush-code-task-template][@ref-crush-code-prompt-skills]

原生实现与扩展实现的区分：三者都是原生实现，不存在“扩展提供的 agent”。`agents.roles` 的答案因此是：主代理（coder，以及可被切换为主代理的 plan）与子代理（task）共用同一套 `Agent` 机制，只是工具集、MCP 白名单与提示词不同。[@ref-crush-code-agent-struct][@ref-crush-code-agent-setup]

三个角色在能力上的差异可以直接按“有没有这个工具”读出来 [@ref-crush-code-agent-tool-sets][@ref-crush-code-tool-names]：

- 只有 coder 能写：`edit`、`multiedit`、`write`、`bash`、`download`、`fetch`、`agentic_fetch`、`todos`、`job_*`、`agent`、`question`、LSP 改名类工具都在 coder 的集合里。
- plan 与 task 都没有写文件类工具，`resolveReadOnlyTools` 只保留 `glob`、`grep`、`ls`、LSP 查询系列、`sourcegraph`、`view`。
- plan 比 task 多 `agent` 与 `question`：能再派生子代理、也能向用户提问；task 两者都没有。

## 调用方式与边界 {#agents-invocation-limits}

invocation 与 limits 两个问题都以本节为答案段落，因此这里同时给出入口与边界。

**用户显式调用**：TUI 的输入模式在 code 与 plan 之间切换，切换时会请求后端把当前工作区的主 agent 设成 `coder` 或 `plan`；切换在 agent 正忙时被拒绝（后端返回 busy 错误），以免把排队中的提示留在旧 agent 上。切换是 HTTP 往返，成功后才更新界面模式，因此界面显示的模式与服务端实际生效的 agent 始终一致。[@ref-crush-code-mode-switch][@ref-crush-code-set-main-agent-backend][@ref-crush-code-set-main-agent]

**主代理自动委派**：coder 的工具集里包含 `agent` 工具（描述来自内嵌模板，参数只有一个 `prompt`），它是一个并行 agent 工具；模型调用它时，宿主用 `task` agent 的配置与提示词构建子代理。[@ref-crush-code-task-tool][@ref-crush-code-task-template]

子代理的运行形态（`runSubAgent`）[@ref-crush-code-run-subagent]：

- 先派生一个**子会话**（子会话 id 由父消息 id 与工具调用 id 拼出，标题固定为“New Agent Session”），再在这个会话里跑一轮。
- 这一轮以非交互方式运行（`NonInteractive: true`），参数（最大输出、temperature、top-p/top-k、频率与存在惩罚）取自 `task` agent 的模型槽位配置；provider 必须在配置里存在，否则报 `errModelProviderNotConfigured`。
- 工具调用是并行型（`fantasy.NewParallelAgentTool`），因此一次响应里可以并发发起多个子任务调用，各自开自己的子会话。

**边界** [@ref-crush-code-agent-setup][@ref-crush-code-task-tool][@ref-crush-code-build-tools]：

- 子代理默认拿不到 MCP 工具（`AllowedMCP` 是空 map）。
- `question` 工具只在“非子代理且交互模式”下加入工具集，因此子代理无法向用户提问。
- Hook 不在子代理内部触发（每个工具调用只在顶层被包装）。
- 子任务的工具集与 coder 不同（只读），因此委派本身也构成一层能力收窄。
- 没有文档化的并发上限、递归深度限制或超时：能否再委派取决于该子代理的工具集里是否含 `agent`，`task` 的工具集不含，所以 `task` 不能再派生子代理；plan 的工具集含 `agent`，可以委派。[@ref-crush-code-agent-tool-sets]

缺口：并发、运行时长、上下文预算这些边界在固定来源里没有成文约束；代码里也没有递归计数，能否形成多层委派完全由各 agent 的工具集决定。子会话在会话列表里的可见性/清理规则也没有文档化。[@ref-crush-code-agent-tool-sets][@ref-crush-code-run-subagent]

## 能否按 agent 覆盖模型、provider、工具与权限 {#agents-overrides}

- **模型**：三个 agent 都写死为 `large` 槽位；构建模型时读取的是全局的 `models.large`/`models.small`，代码里留有 TODO 说明“支持多 agent 时需要让模型配置按 agent 区分”。因此当前无法给单个 agent 指定不同模型或 provider。[@ref-crush-code-agent-setup][@ref-crush-code-agent-models]
- **工具**：`AllowedTools` 是 agent 级的静态清单，用户能间接影响的只有 `options.disabled_tools`（全局禁用工具，先扣掉再分给各 agent）与 `permissions allow/deny`（`deny` 也写进 `disabled_tools`）。没有任何配置键能单独改某个 agent 的工具集。[@ref-crush-code-agent-setup][@ref-crush-code-option-specs][@ref-crush-code-permissions-builtin]
- **MCP 授权**：由 `AllowedMCP` 表达，同样是静态的；coder 不限、plan 与 task 全禁。[@ref-crush-code-build-tools]
- **权限与沙箱**：权限服务是工作区级的（`permissions.allowed_tools` 与 `--yolo`），不按 agent 区分；没有 per-agent 沙箱配置。`--yolo` 是运行时覆盖，不写回配置文件。[@ref-crush-code-permission-service][@ref-crush-code-cli-flags][@ref-crush-code-store-overrides]
- **继承/覆盖关系**：不存在父子继承链，三个 agent 的定义是并列写死的；共享的部分（上下文路径、技能、模型槽位）来自全局配置。[@ref-crush-code-agent-setup]

`agents.overrides` 记为 `partial`：机制层面“每个 agent 有自己的模型槽位、工具白名单、MCP 授权与上下文路径”是成立的，但没有任何用户可写的覆盖入口，且模型槽位目前对三者都是 `large`。[@ref-crush-code-agent-struct][@ref-crush-code-agent-models]

## 诊断 {#agents-diagnostics}

- 当前主 agent 可从界面模式读出：code 模式对应 `coder`，plan 模式对应 `plan`；切换失败时界面不会改口径，因为模式在切换成功后才生效 [@ref-crush-code-mode-switch][@ref-crush-code-set-main-agent-backend]。
- `crush_info` 的 `[model]` 小节打印 `large`/`small` 两个槽位当前指向的模型与 provider；由于三个 agent 共用这些槽位，它同时说明了各 agent 正在用的模型 [@ref-crush-code-info-tool]。
- 委派失败的直接信号是工具返回的错误文本：`agent` 工具在 `prompt` 为空时返回“prompt is required”，找不到 `task` agent 配置时构建阶段报“task agent not configured”，provider 缺失时报“模型 provider 未配置”。[@ref-crush-code-task-tool][@ref-crush-code-run-subagent]
- 子代理会产生真实子会话，因此可以通过会话列表/日志观察它们的出现与标题（固定标题为“New Agent Session”）[@ref-crush-code-run-subagent]。
- 日志：agent 构建、工具集装配、技能发现等都会写日志（`crush logs --follow` 或 `--debug`）[@ref-crush-readme-logging]。

缺口：没有一条命令或界面能列出“当前定义了哪些 agent、各自的工具白名单与 MCP 授权”，也没有单独的权限/委派失败汇总；`crush_info` 不包含 agent 小节，只能靠模型槽位、界面模式、子会话与日志推断。[@ref-crush-code-info-tool][@ref-crush-code-agent-setup]
