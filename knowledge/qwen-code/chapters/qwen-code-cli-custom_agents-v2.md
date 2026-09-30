---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-custom_agents-v2
harness_id: qwen-code
topic: custom_agents
title: "Qwen Code CLI 的自定义 Agent：定义、格式、角色、调用、覆盖、边界与诊断"
sections:
  - section_id: agents-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-readme-acknowledgments, ref-qwen-sub-agents-what-are-subagents]
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-storage-locations, ref-qwen-sub-agents-extension-subagents, ref-qwen-introduction-custom-subagents, ref-qwen-getting-started-extensions-adding-a-custom-subagent, ref-qwen-agent-plugins-supported-capabilities, ref-qwen-sub-agents-cli-commands, ref-qwen-sub-agents-management, ref-qwen-sub-agents-quick-start]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-file-format, ref-qwen-sub-agents-basic-structure, ref-qwen-sub-agents-automatic-delegation, ref-qwen-sub-agents-model-selection, ref-qwen-sub-agents-permission-mode, ref-qwen-sub-agents-tool-configuration, ref-qwen-sub-agents-claude-code-compatibility-fields, ref-qwen-introduction-custom-subagents]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-what-are-subagents, ref-qwen-sub-agents-how-fork-differs-from-named-subagents, ref-qwen-sub-agents-fork-subagent, ref-qwen-sub-agents-when-fork-is-used, ref-qwen-sub-agents-prompt-cache-sharing, ref-qwen-sub-agents-reusing-fork-restrictions-with-fork-profile, ref-qwen-settings-permissions, ref-qwen-sub-agents-recursive-delegation-prevention, ref-qwen-sub-agents-claude-code-and-codex-subagents, ref-qwen-sub-agents-model-selection, ref-qwen-sub-agents-extension-subagents, ref-qwen-multi-agent-coordination-enable-agent-team, ref-qwen-multi-agent-coordination-choosing-the-right-multi-agent-mode]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-how-subagents-work, ref-qwen-sub-agents-automatic-delegation, ref-qwen-sub-agents-explicit-invocation, ref-qwen-sub-agents-when-fork-is-used, ref-qwen-multi-agent-coordination-run-a-coordinated-task]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-model-selection, ref-qwen-settings-agents, ref-qwen-sub-agents-permission-mode, ref-qwen-sub-agents-tool-configuration, ref-qwen-sub-agents-claude-code-compatibility-fields, ref-qwen-sub-agents-security-considerations]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-limits, ref-qwen-sub-agents-recursive-delegation-prevention, ref-qwen-sub-agents-current-limitation, ref-qwen-sub-agents-notification-queue, ref-qwen-sub-agents-agent-working-directory, ref-qwen-sub-agents-claude-code-and-codex-subagents]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-sub-agents-management, ref-qwen-sub-agents-extension-subagents, ref-qwen-sub-agents-key-benefits, ref-qwen-sub-agents-security-considerations, ref-qwen-sub-agents-background-agent-continuation, ref-qwen-sub-agents-notification-queue, ref-qwen-commands-1-slash-commands]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-qwen-sub-agents-storage-locations, ref-qwen-sub-agents-cli-commands, ref-qwen-sub-agents-extension-subagents]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-qwen-sub-agents-file-format, ref-qwen-sub-agents-basic-structure, ref-qwen-sub-agents-claude-code-compatibility-fields, ref-qwen-sub-agents-model-selection]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-qwen-sub-agents-what-are-subagents, ref-qwen-sub-agents-how-fork-differs-from-named-subagents, ref-qwen-sub-agents-extension-subagents]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-qwen-sub-agents-automatic-delegation, ref-qwen-sub-agents-explicit-invocation, ref-qwen-sub-agents-how-subagents-work]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-qwen-sub-agents-model-selection, ref-qwen-sub-agents-permission-mode, ref-qwen-sub-agents-tool-configuration, ref-qwen-sub-agents-claude-code-compatibility-fields]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-qwen-sub-agents-limits, ref-qwen-sub-agents-current-limitation, ref-qwen-sub-agents-recursive-delegation-prevention, ref-qwen-sub-agents-notification-queue]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs: [ref-qwen-sub-agents-management, ref-qwen-sub-agents-background-agent-continuation, ref-qwen-sub-agents-notification-queue, ref-qwen-commands-1-slash-commands]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与范围 {#agents-scope}

本章只依据固定源码提交 `e767e223c5c1d6fe13217d95faf365721e6e3437` 的官方文档，主要路径为 `docs/users/features/sub-agents.md`、`docs/users/features/multi-agent-coordination.md`、`docs/users/features/approval-mode.md`、`docs/users/configuration/settings.md` 以及 `docs/users/extension/introduction.md`、`docs/users/extension/agent-plugins.md`。Qwen Code 最初基于 Google Gemini CLI v0.8.2，自 v0.1 起停止与上游同步并独立发展，因此本仓库在固定提交上的文档就是当前行为的依据。[@ref-qwen-readme-acknowledgments]

自定义 Agent 在本产品中的正式名称是 **Subagent（子代理）**：它们是独立的 AI 助手，各自持有专门的系统提示词、受控工具集与独立会话历史，主 Agent 可以把任务委派给它们。[@ref-qwen-sub-agents-what-are-subagents] 本章把「自定义 Agent」理解为这套 Subagent 机制；与具体模型供应商无关，也不涉及 Skills 或 MCP 本身。文中凡涉及 Claude Code 的字段，一律按文档声明的 **Claude Code 兼容字段** 处理，不推断其为 Gemini 继承行为。

## 定义来源与入口 {#agents-entry}

### 存储位置与优先级

Subagent 以 Markdown（或扩展内 YAML）文件存放在多个位置，按如下优先级生效：[@ref-qwen-sub-agents-storage-locations]

- **项目级**：`.qwen/agents/`，优先级最高。
- **用户级**：`~/.qwen/agents/`，作为回退。
- **扩展级**：由已安装扩展提供。

这种分层让你可以同时拥有项目专属 Agent、跨项目个人 Agent，以及扩展补充的 Agent。扩展提供的 Agent 保存在该扩展的 `agents/` 目录，与用户/项目 Agent 使用相同格式；扩展启用时自动被发现，出现在 `/agents manage` 对话框的 “Extension Agents” 分区，且不能被直接编辑（必须改扩展源）。要确认某扩展是否提供 Subagent，检查其 `qwen-extension.json` 中是否有 `agents` 字段。[@ref-qwen-sub-agents-extension-subagents]

扩展的 `agents` 字段是「包含自定义子代理的目录」，默认名为 `agents`，其中的 Subagent 是 `.yaml` 或 `.md` 文件。[@ref-qwen-introduction-custom-subagents] 官方 Getting Started 给出的最小扩展示例是在扩展目录下新建 `agents/refactoring-expert.md`，写入带 frontmatter 的 Markdown，重启 Qwen Code 后即可通过 `/agents manage` 看到。[@ref-qwen-getting-started-extensions-adding-a-custom-subagent]

需要注意：**Agent Plugins v1 包不提供 Subagent**。该包格式明确只支持 `skills/*/SKILL.md` 与 stdio / Streamable HTTP MCP server，`commands`、`agents`、`hooks` 目录会被忽略。[@ref-qwen-agent-plugins-supported-capabilities]

### 创建与管理的命令

文档中记录的入口是 `/agents` 斜杠命令及其子命令，而不是 `qwen agents` CLI 子命令：[@ref-qwen-sub-agents-cli-commands]

- `/agents create`：通过分步向导创建新的 Subagent。
- `/agents manage`：打开交互式管理对话框，查看与管理已有 Subagent。

命令总表中同样把 `/agents` 记为 “Manage subagents”，其子命令为 `/agents manage`、`/agents create`。[@ref-qwen-sub-agents-management] 快速上手流程即「先 `/agents create`，再 `/agents manage`，然后直接让主 AI 处理与某个 Subagent 专长匹配的任务，AI 会自动委派」。[@ref-qwen-sub-agents-quick-start]

> 缺口说明：固定提交的文档未记载任何名为 `qwen agents` 的 CLI 子命令；可确认的入口只有上述 `/agents` 斜杠命令与直接写入 Agent 文件两种。

## 文件格式与第一方字段 {#agents-format}

### 基本结构与字段

Subagent 用「Markdown + YAML frontmatter」配置，`---` 之间的 frontmatter 之后是系统提示词正文，可包含多段。[@ref-qwen-sub-agents-file-format] 基础结构如下，示例来自该文档的 Basic Structure 小节：[@ref-qwen-sub-agents-basic-structure]

```
---
name: agent-name
description: Brief description of when and how to use this agent
model: inherit            # 可选：inherit、fast、modelId 或 authType:modelId
approvalMode: auto-edit   # 可选：default、plan、auto-edit、yolo、bubble
tools:                    # 可选：工具允许清单
  - tool1
  - tool2
disallowedTools:          # 可选：工具阻止清单
  - tool3
---

System prompt content goes here.
Multiple paragraphs are supported.
```

`name` 与 `description` 是识别与委派的核心：主 AI 依据 `description` 判断何时选用该 Agent，因此官方建议在 `description` 中写清使用时机，必要时使用 “use PROACTIVELY”“MUST BE USED” 之类措辞以促成主动委派。[@ref-qwen-sub-agents-automatic-delegation] `name` 是 Agent 的地址名；扩展 Agent 的 `agents/` 目录文件遵循同一格式。[@ref-qwen-introduction-custom-subagents]

### 模型字段

`model` 是可选的模型选择器，取值语义为：[@ref-qwen-sub-agents-model-selection]

- `inherit`：使用主会话相同模型；**省略该字段等同于 `inherit`**。
- `fast`：使用配置的 `fastModel`；若没有有效的 fast model，回退到 `inherit`。
- `glm-5`：直接使用该模型 ID；Qwen Code 先检查主会话的 auth type，若不可用则可能从其他已配置 provider 解析。
- `openai:gpt-4o`：显式指定 provider 与模型 ID，适合让 Subagent 跑在与主会话不同 auth type 的模型上。

当选择器解析到另一个 auth type 时，Qwen Code 会为该 Subagent 请求创建专用 runtime provider，并只把裸模型 ID 发给该 provider。

### 权限模式字段

`approvalMode` 控制 Subagent 的工具调用如何被批准，有效值为：[@ref-qwen-sub-agents-permission-mode]

| 值 | 含义 |
| --- | --- |
| `default` | 工具需要交互式批准（与主会话默认一致） |
| `plan` | 只分析不执行变更 |
| `auto-edit` | 工具自动批准、不弹窗（推荐多数 Agent 使用） |
| `yolo` | 全部自动批准，包括潜在破坏性操作 |
| `bubble` | 后台 Agent 的工具批准冒泡到父会话 |

### 工具字段

`tools` 是允许清单：一旦指定，Subagent 只能使用列出的工具；省略时从父会话继承全部可用工具。`disallowedTools` 是阻止清单，从工具池中移除列出的工具；两者同时存在时**先应用允许清单，再由阻止清单从中剔除**。MCP 工具遵循同样规则：未列 `tools` 时继承父会话全部 MCP 工具，显式列了 `tools` 则只拿到其中显式命名的 MCP 工具。`disallowedTools` 支持 server 级模式，如 `mcp__server__tool_name`（屏蔽单个工具）与 `mcp__server`（屏蔽该 server 的全部工具）。[@ref-qwen-sub-agents-tool-configuration]

### Claude Code 兼容字段

Qwen Code 接受 Claude Code 2.1.168 的下列 frontmatter 字段，以便把 CC 的 Agent 文件直接放入 `.qwen/agents/`；对取值非法的可选项，解析时不报错而是**静默丢弃**，与 CC 的宽松姿态一致。[@ref-qwen-sub-agents-claude-code-compatibility-fields]

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `permissionMode` | enum | `acceptEdits`、`auto`、`bypassPermissions`、`default`、`dontAsk`、`plan`；解析时映射到 `approvalMode`，两者同时存在时显式 `approvalMode` 优先。 |
| `maxTurns` | 正整数 | 限制 Agent 回合预算，运行时接入 `runConfig.max_turns`；同时设置时顶层字段优先，旧的嵌套值会在保存时从磁盘文件裁剪。 |
| `color` | enum | 显示颜色，允许 `red`、`blue`、`green`、`yellow`、`purple`、`orange`、`pink`、`cyan`；旧 qwen 哨兵值 `auto` 为向后兼容保留，其他值解析时静默丢弃。 |
| `mcpServers` | 记录 | 每 Agent 的 MCP server 覆盖；Agent 生成时与会话级 MCP server 合并，键冲突时 Agent 的规格获胜；坏条目按 key 丢弃并告警，不会让整个 Agent 失败。 |
| `hooks` | 记录 | 每 Agent hooks，键为 CC 事件名（`PreToolUse`、`PostToolUse`、`UserPromptSubmit` 等），值为 `{ matcher?, hooks: [...] }` 数组；Agent 运行时注册、停止时移除。 |

其余 CC 字段 `effort`、`skills`、`initialPrompt`、`memory`、`isolation` 目前只在声明式 Agent 设计文档中描述，需等前提基础设施就绪后才会在后续 PR 落地（例如 `effort` 需要模型层参数、`memory` 需要作用域内存子系统）。Agent frontmatter 里的 hooks 只对该次 Agent 调用生效，不会收到父级、同级或嵌套子 Agent 的事件。[@ref-qwen-sub-agents-claude-code-compatibility-fields]

## 角色：命名子代理、fork 与团队 {#agents-roles}

Subagent 是拥有独立上下文的独立助手。[@ref-qwen-sub-agents-what-are-subagents] 它们与主会话共享同一套委派机制，但角色不同：**命名的常规 Subagent** 从零开始、用自己的系统提示词；**fork 子代理** 继承父会话上下文并用父级的精确系统提示词。[@ref-qwen-sub-agents-how-fork-differs-from-named-subagents]

Fork 通过显式指定 `subagent_type: "fork"` 选择；**省略 `subagent_type` 不会 fork**，而是启动通用（general-purpose）子代理。fork 继承父会话完整历史，通常以独立后台方式运行。[@ref-qwen-sub-agents-fork-subagent] fork 与命名 Subagent 的差异可概括为：上下文（fresh vs 继承/`fork_turns` 有界窗口）、系统提示词（自有 vs 父级精确提示词）、工具（配置声明集 vs 父级派生声明集）、执行方式（默认后台 vs 始终 detached）。[@ref-qwen-sub-agents-how-fork-differs-from-named-subagents]

主 AI 在需要并行研究、后台工作或「需要理解当前会话上下文」的委派时会自动使用 fork。[@ref-qwen-sub-agents-when-fork-is-used] fork 的出发点是缓存共享：所有 fork 共享父级完全相同的 API 请求前缀（系统提示词、工具、会话历史），可命中 DashScope 提示缓存；3 个 fork 并行时共享前缀只缓存一次，相比独立 Subagent 节省 80% 以上 token 成本。[@ref-qwen-sub-agents-prompt-cache-sharing]

委派通过 Agent 工具发起；工具参数形如 `agent(description=..., prompt=..., subagent_type="fork", fork_profile=...)`。[@ref-qwen-sub-agents-reusing-fork-restrictions-with-fork-profile] 在权限别名表中，`Agent` 这个别名对应规范工具名 `task`，即底层委派工具记为 `task`。[@ref-qwen-settings-permissions] 与 fork 相关的还有：fork 子级不能再 spawn 任何子代理，运行时强制。[@ref-qwen-sub-agents-recursive-delegation-prevention]

除自定义 Agent 外，产品内置了两类特殊角色：

- 内置 `claude-code` 与 `codex` Agent，委派给单独安装的原生工具（分别经 `claude-agent-acp` 适配器与 `codex` 可执行文件）；它们使用自身原生模型与认证，Qwen Code 在可执行文件缺失时不会回退到自己的模型。自定义 Codex Agent 通过 `executor` frontmatter 声明。[@ref-qwen-sub-agents-claude-code-and-codex-subagents]
- 内置 Explore Agent，其模型默认继承主会话，可用 `agents.builtin.exploreModel` 单独覆盖。[@ref-qwen-sub-agents-model-selection]

**原生实现与扩展提供的实现如何区分**：扩展 Agent 由扩展的 `agents/` 目录提供，在 `/agents manage` 中单列 “Extension Agents” 分区且不可直接编辑；用户/项目 Agent 直接落在 `.qwen/agents/` 与 `~/.qwen/agents/`。两者共用同一配置格式与发现机制。[@ref-qwen-sub-agents-extension-subagents]

### Agent 团队（多代理协作）

Qwen Code 还能用实验性的 Agent Team runtime 协调多个 teammate：它们接收各自任务、共享任务列表、互相发消息，并出现在既有 Agent View 标签中。[@ref-qwen-multi-agent-coordination-enable-agent-team] 该能力默认关闭，需把 `experimental.agentTeam` 设为 `true` 后重启，或以 `QWEN_CODE_ENABLE_AGENT_TEAM=1` 启动。[@ref-qwen-multi-agent-coordination-enable-agent-team] 多代理模式的选择对照见文档表格：`/coordinate` + Agent Team（共享任务与 teammate 消息、强制只读 worker、可选单个 worktree writer）、Subagents（worker 只向父级汇报）、Arena（多模型竞争、互不协作、隔离 worktree）、Herdr（跨 CLI 产品协调）。[@ref-qwen-multi-agent-coordination-choosing-the-right-multi-agent-mode]

## 调用：自动委派与显式调用 {#agents-invocation}

处理链为：配置定义 → 主 AI 委派 → Subagent 独立执行 → 后台结果经完成通知回到主会话（前台常规 Subagent 则内联返回）→ 主 AI 可用 `list_agents` 找到后台 Agent、用 `send_message` 继续运行中/暂停/已完成的 Agent。[@ref-qwen-sub-agents-how-subagents-work]

**自动委派**依据：用户请求中的任务描述、各 Subagent 配置的 `description` 字段、当前上下文与可用工具。要让委派更主动，可在 `description` 中使用 “use PROACTIVELY” 或 “MUST BE USED” 等措辞。[@ref-qwen-sub-agents-automatic-delegation]

**显式调用**由用户在命令中直接点名进行，例如 “Let the testing-expert Subagents create unit tests for the payment module”“Have the documentation-writer Subagents update the API reference”“Get the react-specialist Subagents to optimize this component's performance”。[@ref-qwen-sub-agents-explicit-invocation]

fork 的触发点同上：当需要并行研究、后台处理或依赖当前会话上下文时主 AI 自动使用 fork。[@ref-qwen-sub-agents-when-fork-is-used] 团队模式下，用户以目标驱动 `/coordinate`：leader 建队并分配最多三个独立工作流，再通过团队工具传递消息与任务状态。[@ref-qwen-multi-agent-coordination-run-a-coordinated-task]

> 缺口说明：文档给出了自动委派的参考因素与显式点名的句式，但没有记录一个确定的「选择规则」算法（例如打分或优先级公式）；该决策被描述为由模型结合 `description` 与上下文作出。

## 覆盖与继承 {#agents-overrides}

### 模型

每个 Agent 可用 `model` 选择器覆盖模型（`inherit`/`fast`/模型 ID/`authType:modelId`），`fast` 复用 `settings.json` 的 `fastModel`（也可通过 `/model --fast` 设置）。内置 Explore Agent 用 `agents.builtin.exploreModel` 覆盖，且只在该内置定义解析时生效——同名 Explore 的会话/项目/用户/扩展 Agent 保留自身 `model`。[@ref-qwen-sub-agents-model-selection] 另外，`agents.modelGrades` 把语义 grade 名映射到模型选择器，`agents.allowedGrades` 可作为白名单限制 Agent 工具可用的 grade；自定义 Agent 的显式模型仍优先于 grade。[@ref-qwen-settings-agents]

### 权限模式与继承

若省略 `approvalMode`，权限模式按父会话自动决定：父会话处于 **yolo/auto-edit** 时子代理继承之；父会话处于 **plan** 时子代理保持 plan；父会话处于 **default**（可信文件夹）时子代理获得 **auto-edit** 以便自主工作。设置了 `approvalMode` 时，父会话的宽松模式仍然优先——例如父会话为 yolo，则即使子代理写 `approvalMode: plan` 也会以 yolo 运行。[@ref-qwen-sub-agents-permission-mode]

### 工具

`tools` 允许清单与 `disallowedTools` 阻止清单按「先允许、后阻止」的顺序生效；省略 `tools` 时继承父会话全部工具（含全部 MCP 工具）。允许清单同时约束直接声明的工具与经 `tool_search`/`tool_call` 延迟工具桥调用的目标；`disallowedTools` 与 `permissions.deny` 是额外的阻止清单。Code Mode（`tools.codeModeOnly`）下 `tool_call` 不可用。[@ref-qwen-sub-agents-tool-configuration]

### Claude Code 兼容字段的覆盖语义

`permissionMode` 映射到 `approvalMode` 时显式 `approvalMode` 胜出；`maxTurns` 接入 `runConfig.max_turns` 时顶层字段胜出；`mcpServers` 在 Agent 生成时与会话级合并，键冲突时 Agent 规格胜出；`hooks` 在 Agent 运行期间注册、停止时移除。[@ref-qwen-sub-agents-claude-code-compatibility-fields]

### 继承与安全边界

Subagent 默认继承父级的权限模式；plan 会话不能通过委派 Agent 升级到 auto-edit；特权模式（auto-edit、yolo）在不可信文件夹被阻止。用 `model: authType:modelId`（或 `fast` 解析到其他 auth type）时，该 Subagent 的模型请求会发往所选 provider，需确保该 provider 适合其任务与数据。工具执行沿用与直接调用相同的安全模型。[@ref-qwen-sub-agents-security-considerations]

> 缺口说明：文档未记载 Subagent 继承父级 `sandbox` 设置或其它沙箱字段的具体行为；`Sandbox` 一节描述的是整体沙箱，未说明子代理粒度的继承/覆盖。

## 边界与限制 {#agents-limits}

### 配置软警告（无硬限制）

文档明确：以下只是软警告，**不强制任何硬限制**——`description` 超过 1,000 字符会提示，系统提示词超过 10,000 字符会提示。[@ref-qwen-sub-agents-limits]

### 递归

fork 子级不能 spawn 任何进一步子代理，运行时强制：若 fork 调用 Agent 工具会收到错误，要求它直接执行任务。[@ref-qwen-sub-agents-recursive-delegation-prevention]

### fork 的当前限制

**无 worktree 隔离**：fork 共享父级工作目录，多个 fork 并发修改文件可能冲突。[@ref-qwen-sub-agents-current-limitation]

### 通知队列上限

交互式 TUI 与 ACP 会话中，后台 Agent、shells、monitors、workflows 的完成通知共用一个队列，**最多 20 条**；第 21 条到达时先驱逐一个临时 monitor pulse，否则驱逐最旧的通知；Agent 结果、workflow 结果与计划提示在交互式 TUI 中永不驱逐（宁可丢弃会发生挤占的新通知）。headless CLI 的本地队列不受此上限约束。[@ref-qwen-sub-agents-notification-queue]

### 工作目录

`working_dir` 把命名常规子代理钉到当前仓库一个已注册的 git linked worktree；不能与 `subagent_type: "fork"` 组合。无主 caller-owned `working_dir` 启动为前台（由 Qwen Code 不拥有其生命周期），显式 `run_in_background: true` 会被拒绝。[@ref-qwen-sub-agents-agent-working-directory]

### 外部执行器

对 `claude-code`/`codex` 这类外部执行器：Qwen 模型覆盖、工具列表、subagent hooks、`maxTurns`、fork 历史、teams、workflows 均不受支持。Codex 任务的 `runConfig.max_time_minutes` 可限定执行时长；Codex 任务不能收消息或恢复，需新建任务。[@ref-qwen-sub-agents-claude-code-and-codex-subagents]

> 缺口说明：固定文档**未**给出命名常规 Subagent 的并发上限、最大嵌套深度（除 fork 禁止再委派外）或每 Subagent 的上下文/回合上限（`maxTurns` 是调用方/定义方可选的回合上限，不是固定边界）。

## 诊断与可见性 {#agents-diagnostics}

- **确认定义被发现**：`/agents manage` 打开交互式管理对话框，可查看与管理已有 Subagent；扩展提供的 Agent 单列在 “Extension Agents” 分区。[@ref-qwen-sub-agents-management] 扩展 Agent 只有在扩展启用时才自动被发现并出现在该对话框。[@ref-qwen-sub-agents-extension-subagents]
- **查看进度与审计**：文档把「Progress Visibility」列为关键收益——可实时看到 Subagent 的进度、工具使用与执行统计；所有 Subagent 动作都被记录并实时可见（Audit Trail）。[@ref-qwen-sub-agents-key-benefits] [@ref-qwen-sub-agents-security-considerations]
- **确认可调用与续用**：`list_agents` 返回当前会话可寻址的后台 Agent（含随恢复会话还原的兼容 Agent），每条含 `task_id`、状态，以及是否可接收消息；`send_message` 用该 `task_id` 给运行中的 Agent 排队消息、恢复暂停的 Agent，或继续已完成的 Agent。任务可见但不可继续时，`list_agents` 会给出原因。[@ref-qwen-sub-agents-background-agent-continuation]
- **定位溢出/丢失的通知**：丢弃通知会显式报告而非静默丢弃，摘要指向 `/tasks` 与任务输出文件；ACP 还会把摘要前缀到该回合的模型输入。[@ref-qwen-sub-agents-notification-queue]
- **命令入口**：`/agents` 及其 `/agents manage`、`/agents create` 子命令是文档记录的查看/创建入口。[@ref-qwen-commands-1-slash-commands]

> 缺口说明：文档没有给出一个「为何某个任务未被委派给某 Agent」的专用诊断命令或日志定位；可依据的只是 `description` 驱动自动委派、`/agents manage` 查看发现结果，以及 `list_agents`/通知队列确认调用与结果状态。
