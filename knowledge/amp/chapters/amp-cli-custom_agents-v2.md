---
schema_version: 3
record_kind: production
edition_id: amp-cli-custom_agents-v2
harness_id: amp
topic: custom_agents
title: "Amp CLI 的自定义 Agent：插件定义、角色、调用与覆盖"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-amp-modes-custom, ref-amp-docs-index-pages, ref-amp-modes-modes, ref-amp-plugins-locations, ref-amp-agentsmd-files, ref-amp-global-local, ref-amp-plugins-adding]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-agent-mode, ref-amp-pluginapi-agentconfig, ref-amp-pluginapi-definetool]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-amp-modes-modes, ref-amp-modes-subagents, ref-amp-tools-oracle, ref-amp-tools-librarian, ref-amp-modes-system, ref-amp-plugins-agent-mode, ref-amp-plugins-subagent, ref-amp-plugins-builtin-agent, ref-amp-dial-tune, ref-amp-dial-preset-follow]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-amp-dial-first-message, ref-amp-dial-off-dial, ref-amp-dial-custom-modes, ref-amp-dial-build, ref-amp-modes-subagents, ref-amp-plugins-subagent]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-agent-mode, ref-amp-pluginapi-agent-tools, ref-amp-pluginapi-agentconfig, ref-amp-dial-tune, ref-amp-dial-preset-follow, ref-amp-dial-preset-role-override, ref-amp-plugins-subagent]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-agent-mode, ref-amp-plugins-reload, ref-amp-agentsmd-files, ref-amp-dial-plugin-modes, ref-amp-plugins-permissions-example, ref-amp-tools-permissions]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-amp-modes-custom, ref-amp-plugins-locations, ref-amp-agentsmd-files]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-amp-plugins-agent-mode, ref-amp-pluginapi-agentconfig, ref-amp-pluginapi-definetool]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-amp-modes-modes, ref-amp-modes-subagents, ref-amp-modes-system, ref-amp-plugins-agent-mode, ref-amp-plugins-subagent, ref-amp-plugins-builtin-agent, ref-amp-dial-tune, ref-amp-dial-preset-follow]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: partial
        source_refs: [ref-amp-dial-first-message, ref-amp-dial-off-dial, ref-amp-modes-subagents]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: answered
        source_refs: [ref-amp-plugins-agent-mode, ref-amp-pluginapi-agentconfig, ref-amp-dial-tune, ref-amp-dial-preset-follow, ref-amp-dial-preset-role-override]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-amp-pluginapi-agentconfig, ref-amp-plugins-subagent]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-amp-plugins-agent-mode, ref-amp-plugins-reload, ref-amp-agentsmd-files]
---

## 自定义 Agent 在哪里定义 {#agents-entry}

固定来源是官方文档站快照：`/docs/customize/plugins`、`/docs/plugin-api`、`/docs/the-dial`、`/docs/models-and-subagents`、`/docs/tools`、`/docs/customize/agents-md`。Amp CLI 闭源，全部结论为来源级知识（`version_applicability: unknown`）。[@ref-amp-modes-custom][@ref-amp-docs-index-pages]

Amp 里「agent」有两种来源，必须分开看：

1. **内置模式**：`low`、`medium`、`high`、`ultra`。每个模式绑定一套模型、reasoning effort、system prompt、工具与 oracle。[@ref-amp-modes-modes]
2. **自定义 agent**：由**插件**定义。文档一句话概括：「插件可以定义自定义模式和自定义子代理。自定义模式出现在模式选择器里。自定义子代理可以作为主 agent 为某类工作调用的工具暴露出来。」[@ref-amp-modes-custom]

因此自定义 agent 的发现路径就是插件的发现路径。插件从四个位置加载，同名时优先级为 project、system、personal、workspace [@ref-amp-plugins-locations]：

- personal 插件：在 Personal Settings 里管理，处处生效；
- workspace 插件：工作区管理员在 Workspace Settings 里管理，对全体成员生效；
- project 插件：项目根目录的 `.amp/plugins/`，在该项目里运行 Amp 时生效；
- system 插件：设置了 `XDG_CONFIG_HOME` 时是 `$XDG_CONFIG_HOME/amp/plugins/`，否则 macOS/Linux 用 `~/.config/amp/plugins/`、Windows 用 `%USERPROFILE%\.config\amp\plugins\`。

**`AGENTS.md` 不是 agent 定义**，它是指导文件：Amp 在 `AGENTS.md` 里找的是代码库结构、构建/测试命令与约定，而不是一个可调用的 agent。工作区级指导「不适用于子代理、Puck 或 raw custom agents」。[@ref-amp-agentsmd-files]

**插件之外的机器本地位置**（供对照）：`.amp/plugins/`（随项目）、`~/.config/amp/plugins/`（只在本机）。`amp plugins add URL` 默认安装为机器本地的 system 插件，加 `--target workspace` 表示装进当前项目的 `.amp/plugins/`，而不是托管的 Workspace Plugins 仓库。[@ref-amp-global-local][@ref-amp-plugins-adding]

固定来源没有给出「用户级 agent 目录」这种机制：声明式 agent 目录（见下一节）只在 `@ampcode/plugin` 类型参考里以「agent directory」出现，文档站没有描述这类目录的搜索根与作用域。这是明确缺口。

## 定义格式与字段 {#agents-format}

有两种写法。

**写法一：插件运行时注册（命令式）**。用 `amp.createAgent(...)` 造 agent，用 `amp.registerAgentMode(...)` 把它注册成模式。文档给出的完整最小例子 [@ref-amp-plugins-agent-mode]：

```ts
// @amp-agent-mode {"key":"architect","label":"architect"}

import type { PluginAPI } from '@ampcode/plugin'

export default function (amp: PluginAPI) {
	const architect = amp.createAgent({
		name: 'architect',
		model: 'openai/gpt-5.5',
		instructions: [
			'You are an architecture-focused Amp mode.',
			'Before editing code, map the current design, name the tradeoffs,',
			'and prefer small changes that preserve clear module boundaries.',
		].join(' '),
		tools: 'all',
		reasoningEffort: 'high',
		display: { label: 'architect', color: '#7c3aed' },
	})

	amp.registerAgentMode({
		key: 'architect',
		description:
			'Plans and implements changes with extra architecture scrutiny. Use for architecture-sensitive work.',
		agent: architect.definition,
	})
}
```

要点：`name` 是 agent 身份的一部分，Amp 会把 `You are NAME, a custom agent running in Amp.` 写进基础 system prompt，省略 `name` 就不加具名身份；`label` 只控制 UI 里怎么显示。`description` 要同时说明「做什么」和「什么时候用」。外部插件**必须**为每个注册的模式写一条匹配的 `// @amp-agent-mode ...` 元数据注释（包含模式的 `key` 与 `label`），客户端用它做静态发现，运行期注册与注释不一致时会告警；一个插件文件里可以有多条模式注释。模式 key 与 label 必须唯一（忽略大小写）、非空、不超过 24 个字符，且不得与内置模式冲突。[@ref-amp-plugins-agent-mode]

`createAgent` 的其余字段全部列在 `@ampcode/plugin` 类型参考的 `CreateAgentConfig` 里，其中 `instructions` 在未设置 `extends` 时必填。[@ref-amp-pluginapi-agentconfig]

**写法二：声明式 agent 目录**。类型参考描述了「agent directory」：目录里的 `agent.ts` 用 `defineAgent(config)` 声明配置，`instructions.md` 作为 agent 指令追加到所继承模式的 system prompt；目录里的 `tools/NAME.ts` 用 `defineTool(config)` 声明自定义工具，**工具名就是文件名**。`AgentConfig` 被 Amp 静态解析，所以必须是纯字面量对象——不能有 import、变量或计算值；`agent.ts` 在每个 agent 目录里必需，但所有字段都可选，`defineAgent({})` 就是一份完整配置。工具文件里的 `description`、`execution`、`inputSchema` 也必须是直接写在文件里的静态字面量。[@ref-amp-pluginapi-agentconfig][@ref-amp-pluginapi-definetool]

`AgentConfig` 的字段（类型参考原文，全部可选）[@ref-amp-pluginapi-agentconfig]：

| 字段 | 含义 |
| :-- | :-- |
| `label` | 模式选择器与线程标题里的标签，≤24 字符，默认取 agent 目录名 |
| `description` | agent 列表里的说明，≤500 字符，要写明做什么与何时用 |
| `color` | 十六进制 RGB 标签颜色，例如 `#d97706` |
| `extends` | 继承哪个内置模式：`low` / `medium` / `high` / `ultra` |
| `model` | `provider/model` 形式的模型 ID；省略则用默认模型，或 `extends` 所继承模式的首选模型与 effort |
| `serverOnly` | 完全跑在 Amp 的 thread actor 上，不创建也不附加 executor |
| `draft` | 标记为进行中：对 agent 选择器隐藏，但仍可按 key 启动线程，供作者试跑 |
| `tools` | `'all'`、工具名数组（支持 `*` 后缀通配），或 `{ include, add, exclude }` 对象 |
| `reasoningEffort` | 模型支持时的 reasoning effort 覆盖 |
| `oracle` / `subagents` | 分别固定 Oracle 与其他子代理角色的 `{ model, effort }`，字段各自独立覆盖 |
| `features` | 该 agent 创建的线程所需的 feature |
| `mcpServers` | 该 agent 协作的远程 MCP server 的 ID（slug），会写进渲染后的指令让模型知道用 code mode 访问；**不限制**线程实际能访问哪些 server |

## 角色：模式、子代理与系统模型 {#agents-roles}

**内置模式**是四个：`low`、`medium`、`high`、`ultra`，每个组合一个模型、reasoning effort、system prompt、工具与 oracle。[@ref-amp-modes-modes]

**Tune Modes 里的三个角色**是 Main Agent、Oracle 与 Subagents（Subagents 覆盖 Task worker、代码库检索、读线程、Librarian、代码评审检查与媒体分析）；角色上写的模型来源有三种状态：跟随 preset、**Auto**（跟随 Amp 的模型选择）或固定的 pin。[@ref-amp-dial-tune] 应用 preset 的角色**跟随 preset 而不是各自持有一份模型副本**：Amp 换 preset 时它们跟着变，跟随中的角色在 Tune Modes 里显示 preset 的名字。[@ref-amp-dial-preset-follow]

**专门子代理**由 Amp 自己调度，每个子代理有自己的上下文窗口与文件编辑、终端等工具 [@ref-amp-modes-subagents]：

- **Search** 快速检索相关代码；
- **Oracle** 处理困难的推理与规划，主 agent 通过 `oracle` 工具调用，Oracle 以额外高的 reasoning 运行；
- **Librarian** 研究外部代码库与大体量源材料，能搜遍 GitHub 上所有公开代码以及你的私有 GitHub 仓库，只搜默认分支；
- **Read Thread** 读取并总结其他 Amp 线程。

Amp 会自动为合适的任务选择子代理，「多数在 `medium` 模式，偶尔在其他模式」；也可以明确要求主 agent 使用某个子代理，或把独立工作拆给多个子代理。[@ref-amp-modes-subagents][@ref-amp-tools-oracle][@ref-amp-tools-librarian]

**系统模型**处理不需要主 agent 的工作：分析图片、PDF、音频与视频，生成或编辑图片，命名线程，压缩长对话上下文。[@ref-amp-modes-system]

**自定义模式 vs 自定义子代理**是同一套 `createAgent` 的两种暴露方式，区别在注册入口 [@ref-amp-plugins-agent-mode][@ref-amp-plugins-subagent]：

- 注册成**模式**：`registerAgentMode`，出现在支持客户端的模式选择器里，与内置模式并列，且不占 Dial 的槽位。
- 注册成**子代理**：用 `createAgent` 造 agent，再 `registerTool` 暴露一个工具，工具内部调用 `agent.run(request, { parentThreadID: ctx.thread.id, timeoutMs: ... })`——文档例子用 10 分钟。`parentThreadID` 让该次子代理运行保持与调用它的线程相连。

**内置 agent 句柄**是第三条路：`amp.getBuiltinAgent(mode)` 拿到 `low` / `medium` / `high` / `ultra` 中之一的句柄；已弃用的 `smart`、`deep`、`rush` 仍被接受，但会在线程里落到替代模式（`rush` → `low`，`smart`/`deep` → `medium`）。内置与自定义句柄都支持 `run(message, options?)`（一次性）与 `createThread(options?)`（可持续追加消息）。[@ref-amp-plugins-builtin-agent]

## 调用与委派 {#agents-invocation}

**用户显式选择**：

- 模式在**第一条消息发出前**选定，线程会记住它，之后**不能改**——要换模式就开新线程。理由是模型跨模型续写会混乱，且每个模式有自己的 system prompt 与工具定义，中途切换会作废 prompt 缓存。[@ref-amp-dial-first-message]
- CLI：第一条消息前按 `Ctrl+S` 转动 Dial；`Ctrl+O` 打开命令面板输入 `mode`。第一条消息之后 `Ctrl+S` 只显示当前模式与模型，不能改。[@ref-amp-dial-first-message]
- CLI 的模式列表：`Ctrl+S` 打开 Dial 后按 `Tab` 切到「所有模式」列表，Dial 上的模式排在前，其余在后，`↑`/`↓` 选择，再按 `Tab` 回到 Dial。[@ref-amp-dial-off-dial]
- 自定义模式**始终**出现在模式选择器里，无论是否在 Dial 上。[@ref-amp-dial-custom-modes]
- Dial 只能放 2–4 个模式（Build Dial），但任何有权访问的模式都能通过「完整列表」起线程。[@ref-amp-dial-build][@ref-amp-dial-off-dial]

**自动委派**：主 agent 会把适合的任务自动交给专门子代理，多数发生在 `medium` 模式；也可以显式要求。子代理之间彼此隔离：它们之间不能互相通信，用户无法中途指导，它们拿到的是主 agent 给出的指令与上下文而不是完整对话，主 agent 只收到最终总结。[@ref-amp-modes-subagents]

**插件子代理**则是主 agent 通过一个插件工具按需调用，调用条件是模型的工具选择，不由宿主硬编码。[@ref-amp-plugins-subagent]

固定来源没有描述「主 agent 选择哪个自定义模式」的自动规则，也没有多 agent 协作编排的重试/回退规则，这部分未验证。

## 覆盖：模型、工具、权限与边界 {#agents-overrides}

**继承**：`extends` 指向 `low` / `medium` / `high` / `ultra` 时，agent 使用该内置模式的完整 system prompt，把你的 `instructions` 作为额外一段追加；工具列表默认继承该模式的列表；省略 `model` 时继承该模式的模型与 reasoning effort。用 `tools: { add: [...] }` 在其上追加，`tools: { exclude: [...] }` 移除。[@ref-amp-plugins-agent-mode]

**工具选择语义**（类型参考原文）[@ref-amp-pluginapi-agent-tools]：数组或显式 `include` 会**替换**默认工具列表（包括委派工具）；`add` 用来在默认列表上追加；`exclude` 永远优先。显式列表里 `mcp__*` 匹配所有 MCP 工具、`plugin__*` 匹配所有插件工具，要把用户的插件与 MCP 工具保留下来就要写上这类条目。MCP 工具不经独立工具暴露，每个 agent 都有 `tool_search` 与 `code_exec`（除非被 `exclude` 点名），通过它们访问 MCP server。要让 agent 起持久子线程，需要包含 `create_thread`，并按流程需要包含 `list_agent_modes`、`get_thread_status`、`send_thread_message`、`wait_for_threads`；`Task` 跑的是受作用域限制的子代理，不接受按调用的 agent mode。

**角色级覆盖**：`oracle` 与 `subagents` 各自接受 `{ model, effort }`，字段独立覆盖；省略则保留 Amp 的自动路由与默认 effort，模型不可用时在运行期回退到 Amp 的路由。在 Dial 的 Tune Modes 里可以固定内置模式的主 agent、Oracle 与子代理模型；**插件 agent 与其他自带路由的模式只显示作参考，其路由不能在 Tune Modes 里改**——插件 agent 的模型必须在 agent 定义里改。[@ref-amp-pluginapi-agentconfig][@ref-amp-dial-tune]

**preset 跟随与单角色覆盖**：应用 preset 后角色跟随 preset 而不是各自持有一份模型副本，Amp 换 preset 时角色一起变。[@ref-amp-dial-preset-follow] 跟随中的角色仍可单独覆盖**一项**：设置该角色的 model 或 effort 后，它用你的设置、其余部分继续跟随 preset，其它角色不受影响；角色上的 **Preset** 撤销这项设置让它回到跟随，**Auto** 让该角色停止跟随 preset。再按一次底部的 preset 整体停止跟随——没改过的角色回到 Auto，改过的角色保留你的 model 或 effort 作为普通 pin。[@ref-amp-dial-preset-role-override]

**渲染的指令会带上 `mcpServers`**：声明式 agent 的 `mcpServers` 只是把 server 名称写进指令让模型知道用 code mode 访问，**不构成权限限制**。[@ref-amp-pluginapi-agentconfig]

**边界与超时** [@ref-amp-pluginapi-agentconfig][@ref-amp-plugins-subagent]：

- `createAgent` 上的 feature 会被该 agent 创建的所有线程继承，也会被 Oracle、Task、Finder、Read Thread 与 Librarian 调用继承；`agent.createThread(...)` 传入的 feature 追加到该列表。
- `compactionThresholdTokens` 是自动压缩线程的估算输入 token 阈值，必须是正整数；省略时用配置的百分比阈值，**默认 90%**。
- `run(request, { timeoutMs })` 可以给一次性子代理运行设超时；文档示例为 10 分钟。
- 指定 `serverOnly: true` 的 agent 完全不创建 executor。
- `draft: true` 的 agent 对选择器隐藏，但仍可按 key 启动线程。

固定来源没有给出并发上限、递归深度上限或嵌套子代理数量限制，也没有说明这些超时到点后的确切行为，这部分未验证。

## 诊断：确认定义被发现并可用 {#agents-diagnostics}

| 想确认 | 入口 | 来源 |
| :-- | :-- | :-- |
| 插件 agent 可用的模型 ID 与内置工具名 | `amp plugins show-agent-options`（加 `--json` 得到机器可读输出） | [@ref-amp-plugins-agent-mode] |
| 已加载的插件、来源、注册的事件/命令/工具 | `amp plugins list` | [@ref-amp-plugins-reload] |
| 重载插件 | 命令面板 `plugins: reload`，或让 Amp 重载 | [@ref-amp-plugins-reload] |
| 插件列表 | 命令面板 `plugins: list` | [@ref-amp-plugins-reload] |
| 模式是否出现 | 支持客户端的模式选择器；`amp --execute` 与 `amp --no-tui` runner 也能创建插件 agent 线程，活跃 runner 的模式还能出现在 ampcode.com 的模式选择器里 | [@ref-amp-plugins-agent-mode] |
| 当前在用哪些 agent 指导文件 | 命令面板 `agents-md list` | [@ref-amp-agentsmd-files] |
| Dial 上某个模式消失了 | Dial 会跳过它；可用模式少于两个时 Amp 回落到标准 Dial | [@ref-amp-dial-plugin-modes] |

模式注释是排查「注册了但没出现」的第一处线索：客户端按 `// @amp-agent-mode ...` 做静态发现，运行期注册与注释不匹配时会显示告警 toast；缺失注释的既有插件仍能加载并保留模式，但会一直告警直到补上注释并重载。[@ref-amp-plugins-agent-mode]

固定来源没有提供逐个 agent 的「权限或委派失败」诊断入口；工具权限本身由插件（例如自定义 permissions 插件）实现，Amp 默认不在运行工具前请求批准。[@ref-amp-plugins-permissions-example][@ref-amp-tools-permissions]
