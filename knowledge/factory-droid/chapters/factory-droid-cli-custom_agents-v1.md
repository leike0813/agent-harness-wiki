---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-custom_agents-v1
harness_id: factory-droid
topic: custom_agents
title: "Droid CLI 的子代理：droids 定义、调用、工具与模型覆盖"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-fd-agents-where, ref-fd-agents-create, ref-fd-agents-builtin, ref-fd-agents-import, ref-fd-agents-vs-skills]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-fd-agents-config, ref-fd-agents-tools]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-fd-agents-invoke, ref-fd-agents-bg, ref-fd-agents-parallel, ref-fd-agents-mcp-servers]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-fd-agents-autonomy, ref-fd-agents-model, ref-fd-agents-enterprise, ref-fd-settings-subagent-autonomy, ref-fd-settings-subagent-model, ref-fd-settings-infra, ref-fd-autonomy-levels]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-agents-ui, ref-fd-agents-mcp-servers, ref-fd-agents-create, ref-fd-agents-import, ref-fd-agents-where]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-fd-agents-where, ref-fd-agents-create]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-fd-agents-config, ref-fd-agents-tools]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-fd-agents-builtin, ref-fd-agents-where, ref-fd-agents-vs-skills]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-fd-agents-invoke, ref-fd-agents-bg, ref-fd-agents-parallel]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-fd-agents-model, ref-fd-agents-autonomy, ref-fd-settings-subagent-model]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-fd-agents-autonomy, ref-fd-agents-enterprise, ref-fd-settings-infra]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-fd-agents-ui, ref-fd-agents-import, ref-fd-agents-where, ref-fd-agents-create]
---

## 定义位置与角色类型 {#agents-entry}

本章的固定来源是官方文档站 `harness/subagents` 页面快照（https://docs.factory.com/harness/subagents.md）与 `droid-cli/settings` 页面快照。产品只有一个界面 `cli`，整章按 source_only 阅读。

Droid 里的「子代理」由主代理通过 **Task** 工具启动，每个子代理拥有独立的上下文窗口、会话、系统提示、工具策略、模型与自主级别，结束时只向父代理返回一条最终消息。子代理分两类 [@ref-fd-agents-vs-skills]：

- **内置子代理**：`worker`（全部工具，默认复杂度 `medium`）与 `explorer`（只读，默认 `light`），无需任何配置即可用 `subagent_type` 调用。[@ref-fd-agents-builtin]
- **自定义 droid**：用户自己写的 Markdown 文件，放在项目 `.factory/droids/` 或用户主目录 `~/.factory/droids/`，CLI 只扫描这两个目录的**顶层**文件，逐个校验后把合法的定义暴露为 Task 工具的 `subagent_type` 目标。[@ref-fd-agents-where]

同名时项目定义覆盖个人定义。自定义 droid 默认开启，可在 `/settings` 的 Experimental 分区关闭。[@ref-fd-agents-where]

同一套机制也覆盖 Mission 场景的额外内置 droid：`scrutiny-feature-reviewer`、`user-testing-flow-validator` 等会被写入 `~/.factory/droids/`，只用于 Missions 校验，不面向一般委派。原生实现与「扩展提供的实现」在这里没有单独机制——插件分发的 droid 同样是 `.md` 定义，进入同一 `droids/` 目录约定后按同一路径加载。[@ref-fd-agents-builtin]

创建入口有三条：`/droids` 的 **Create a new Droid** 向导（选项目/个人位置、写描述、生成或手写系统提示、确认标识符/模型/工具，保存时文件名会规范化为小写连字符）；内置 `GenerateDroid` 工具按一句描述直接生成完整 droid 文件，默认写到 `project` 位置，可用 `location: personal` 改到用户目录；以及从 Claude Code 导入——`/droids` 的导入流程扫描仓库 `.claude/agents/` 与 `~/.claude/agents/`，把名称、描述、指令映射为对应字段，把 `sonnet`/`haiku`/`opus` 映射到该家族首个可用模型，未匹配的模型名回落到 `inherit`，工具名映射失败会给出 `Invalid tools` 警告。[@ref-fd-agents-create][@ref-fd-agents-import]

## 文件格式与字段 {#agents-format}

每个 droid 是一个 Markdown 文件：YAML frontmatter 加系统提示正文，正文不能为空。[@ref-fd-agents-config]

```markdown
---
name: code-reviewer
description: Focused reviewer that checks diffs for correctness risks
model: inherit
tools: read-only
---

You are the team's senior reviewer. Examine the diff the parent agent shares and
flag correctness, security, and migration risks.
```

字段与约束 [@ref-fd-agents-config]：

| 字段 | 说明 |
| :-- | :-- |
| `name` | 必填，匹配 `^[a-z0-9-_]+$`；决定 `subagent_type` 值与文件名 |
| `description` | 可选但推荐，显示在 `/droids` 列表；超过 500 字符会产生校验警告 |
| `model` | 默认 `inherit`；也可填公开模型 ID，或用 `custom:` 加 BYOK 配置里的 `model` 字段（不是显示名） |
| `reasoningEffort` | 可选，`low`/`medium`/`high`，仅在模型支持时生效；`model: inherit` 时被忽略 |
| `tools` | 省略即允许全部工具；可写类别字符串（如 `read-only`）或工具 ID 数组，大小写敏感 |
| `mcpServers` | 可选，MCP server 名数组，列出后只暴露这些 server 的工具 |

`DroidValidator` 在文件加载时报错或告警：错误包括非法名称、未知模型、未知或禁止的工具；告警包括缺少描述、重复工具。三条加载期工具规则 [@ref-fd-agents-config]：

- `TodoWrite` 与 `Skill` 对所有 droid 强制包含，不需要在 `tools` 里列出，也不计入工具数。
- `ExitSpecMode` 与 `GenerateDroid` 不能被自定义 droid 启用，列出其中之一即为校验错误。
- 字面量 `tools: all` 被拒绝，要放开全部工具必须省略 `tools` 字段。

工具类别到具体工具 ID 的对照（数组里的 ID 必须来自该表或确切的 MCP 工具 ID，未知 ID 会报错）[@ref-fd-agents-tools]：

| 类别 | 工具 ID | 用途 |
| :-- | :-- | :-- |
| `read-only` | `Read`、`LS`、`Grep`、`Glob` | 分析与文件探查 |
| `edit` | `Create`、`Edit`、`ApplyPatch` | 代码生成与修改 |
| `execute` | `Execute` | 命令执行 |
| `web` | `WebSearch`、`FetchUrl` | 联网检索 |
| `mcp` | 动态填充 | MCP 工具 |

在 OpenAI 模型下启用 `Edit` 会自动带上 `ApplyPatch`；`model: inherit` 时两者都会启用，以覆盖运行期才确定的提供方。[@ref-fd-agents-tools]

## 调用、前后台与 MCP 范围 {#agents-invocation}

父代理用 Task 工具调用，也可以由用户直接指定：「Use the subagent `security-sweeper` on the files I changed.」Task 工具接受 `subagent_type`（必填）、`description`（必填，UI 短标签）、`prompt`（必填）、`image_paths`（可选，仅本地路径）、`complexity`（可选，`light`/`medium`/`heavy`，决定复杂度到模型的路由）、`run_in_background`（可选）、`resume`（可选，传入先前的 `task_id`）。子代理非交互运行：`AskUser` 对它禁用，它也**不能**再启动自己的子代理（拿不到 Task 工具）。[@ref-fd-agents-invoke]

前台是默认行为：父代理等待结束，Task 工具边跑边流式显示工具调用、结果与 TodoWrite 更新，最后返回子代理的最终消息。后台用 `run_in_background: true`，立即返回 `task_id` 并继续独立运行；父代理用 `TaskOutput`（`block=true` 等待完成，`block=false` 轮询状态）取回结果，用 `TaskStop` 停止（先 SIGTERM，必要时 SIGKILL）。[@ref-fd-agents-bg]

并行有两种做法：在同一个回合里发起多个 Task 调用，或用 `run_in_background: true` 启动多个再用 `TaskOutput` 收集。`resume` 传入旧的 `task_id` 可以让已有子代理带着完整上下文接着说，自主级别会在新一轮重新对齐到父会话当前级别。[@ref-fd-agents-parallel]

用 `mcpServers` 限定子代理可用的 MCP server：名单里的 server 其工具会加上 `tools` 中声明的工具一起暴露，未列出的已配置 server 被排除；省略该字段表示沿用父会话的 MCP 可用性，写成空数组则排除全部（包括全局配置的）；被企业 MCP 策略拒绝的 server 即使列出也不可用。`/droids` 详情页会显示已选中的 MCP server 以便确认配置已保存。[@ref-fd-agents-mcp-servers]

```markdown
---
name: issue-researcher
description: Researches issues using repository context and tracker data
model: inherit
tools: ["Read", "Grep"]
mcpServers: ["linear", "github"]
---

Investigate the issue referenced in the prompt using the codebase and the
selected MCP servers, then summarize findings and propose next steps.
```

上例同样来自官方 `harness/subagents` 页面的 Selecting MCP servers 小节。[@ref-fd-agents-mcp-servers]

## 自主级别、模型与企业上限 {#agents-limits}

自主级别用 `/settings` 的 **Subagents** 里的 Subagent autonomy level 控制，取值 `inherit`（默认，跟随父会话）、`off`、`low`、`medium`、`high`；解析后的级别总会被压到组织的 Maximum Autonomy Level 之下。父会话处于 Spec Mode 时子代理被限制为只读操作与低风险 shell 命令，文件编辑与创建被禁用；`resume` 时按父会话当前级别重新对齐。[@ref-fd-agents-autonomy]

这五个取值复用主会话的 Autonomy Level 语义：风险级别不高于当前档位时自动运行，`Off` 只放行读取类工具与命令策略允许的命令，`Low` 加文件编辑与低风险命令/MCP 工具，`Medium` 加可逆工作区变更，`High` 加高风险动作；级别控制的是批准而不是工具是否可用。[@ref-fd-autonomy-levels]

模型解析顺序 [@ref-fd-agents-model]：

1. droid frontmatter 里的 `model` 优先；`inherit` 表示交给父会话。
2. 当 droid 是 `inherit` 且父代理传了 `complexity` 时，按 `/settings` → **Subagents** 里配置的复杂度到模型路由（Light/Medium/Heavy 三个档位各可指定模型与可选 reasoning effort，也可指向 Auto router 或保持 Inherit）。
3. 都没有时用父会话当前模型与推理档位。
4. 校验回落：droid 指定的模型不被允许（被 org 策略阻止，或 BYOK 模型未配置）时回落到父会话模型而不是失败。

设置文件里的对应键是 `subagentAutonomyLevel`（`inherit`/`off`/`low`/`medium`/`high`，默认 `inherit`）与 `subagentModelSettings.lightModel`/`mediumModel`/`heavyModel` 及其 `*ReasoningEffort`（默认 `inherit`）；内置 `worker` 走 `medium`、`explorer` 走 `light` 档。Mission worker 不使用 `subagentAutonomyLevel`。[@ref-fd-settings-subagent-autonomy][@ref-fd-settings-subagent-model]

企业侧由组织托管设置统一治理：`subagentAutonomyLevel` 为所有 Task 子代理钉死级别，`maxAutonomyLevel` 给所有会话与子代理设上限（用户或项目设置无法越过），`subagentModelSettings` 按档位钉死模型，被 org 策略阻止的模型会回落到父模型；Droid 工具策略与企业 MCP 策略同样对子代理生效。[@ref-fd-agents-enterprise]

子代理的活跃度上限是设置里的 `subagentInactivityTimeout`（毫秒，默认由产品决定），超时后 Droid 视该 worker 为停滞。[@ref-fd-settings-infra]

## 管理与诊断 {#agents-diagnostics}

- `/droids` 打开管理弹窗，列出每个 droid 的名称、括号中的模型、描述预览、Project/Personal 位置徽章与工具摘要（如 All tools 或选中数量），并提供 **Reload** 在手工改文件后刷新列表。[@ref-fd-agents-ui]
- 详情页显示解析后的工具列表与已选 MCP server，用来确认 `tools`/`mcpServers` 是否真的落盘生效。[@ref-fd-agents-ui][@ref-fd-agents-mcp-servers]
- 文件改动在**下一次打开菜单或下一次 Task 调用**时被拾取；不重启也可以验证。[@ref-fd-agents-create]
- 定义校验失败（非法名称、未知模型、未知或禁止的工具）由 `DroidValidator` 在加载时报出，出现在 `Invalid tools: [...]` 这类导入报告中；修法是删掉未映射的工具、改成等价工具，或整体省略 `tools` 字段以允许全部工具。[@ref-fd-agents-import]
- 委派失败时的定位顺序：`/droids` 确认名字确实存在且来源（项目/个人）符合预期，项目同名会覆盖个人定义；再确认 droid 的 `tools` 是否禁掉了当前会话可用的工具、`mcpServers` 是否把需要的 server 排除。[@ref-fd-agents-where][@ref-fd-agents-mcp-servers]
