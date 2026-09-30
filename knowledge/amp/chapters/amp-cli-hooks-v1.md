---
schema_version: 3
record_kind: production
edition_id: amp-cli-hooks-v1
harness_id: amp
topic: hooks
title: "Amp CLI 的 Hook：插件事件、输入输出与生效条件"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-overview, ref-amp-docs-index-pages, ref-amp-plugins-events, ref-amp-pluginapi-events, ref-amp-plugins-session-start, ref-amp-pluginapi-on]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-amp-pluginapi-on, ref-amp-settings-keys, ref-amp-plugins-locations, ref-amp-plugins-adding]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-amp-pluginapi-context, ref-amp-pluginapi-system, ref-amp-pluginapi-events]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-amp-pluginapi-toolcall-result, ref-amp-pluginapi-events, ref-amp-plugins-tool-call, ref-amp-plugins-tool-result, ref-amp-plugins-agent-start, ref-amp-plugins-changes-prompt, ref-amp-plugins-agent-end, ref-amp-pluginapi-ondispose, ref-amp-pluginapi-createwebhook-doc]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-activation, ref-amp-plugins-overview, ref-amp-plugins-reload, ref-amp-execute-plugin-ready, ref-amp-tools-permissions]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amp-plugins-reload, ref-amp-pluginapi-context, ref-amp-execute-plugin-ready]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-amp-pluginapi-events, ref-amp-plugins-events, ref-amp-plugins-session-start]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-amp-pluginapi-on, ref-amp-plugins-locations, ref-amp-settings-keys]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: partial
        source_refs: [ref-amp-pluginapi-context, ref-amp-pluginapi-events]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-amp-pluginapi-toolcall-result, ref-amp-pluginapi-events, ref-amp-plugins-tool-call, ref-amp-plugins-tool-result, ref-amp-plugins-agent-end]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: partial
        source_refs: [ref-amp-pluginapi-on, ref-amp-pluginapi-events]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: partial
        source_refs: [ref-amp-plugins-activation, ref-amp-execute-plugin-ready, ref-amp-plugins-overview]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-amp-plugins-reload, ref-amp-pluginapi-context]
---

## 第一方事件与触发时点 {#hooks-events}

固定来源是官方文档站快照：`/docs/customize/plugins`、`/docs/plugin-api`、`/docs/cli/execute-mode`、`/docs/tools`。Amp CLI 闭源，全部结论为来源级知识（`version_applicability: unknown`）。[@ref-amp-plugins-overview][@ref-amp-docs-index-pages]

Amp 的 hook 机制就是**插件事件**：插件用 `amp.on(...)` 监听工具调用、工具结果与 agent 生命周期事件。除此之外没有第二套同名事件来源——「Hook 脚本」这个概念在固定来源里不存在，唯一的注册入口是插件。[@ref-amp-plugins-overview]

事件按**线程会话**的 agent 生命周期排列 [@ref-amp-plugins-events]：

```
╭───────────────╮    ╭─────────────╮    ╭───────────╮    ╭─────────────╮    ╭───────────╮
│ session.start │───▶│ agent.start │───▶│ tool.call │───▶│ tool.result │───▶│ agent.end │
╰───────────────╯    ╰─────────────╯    ╰───────────╯    ╰─────────────╯    ╰───────────╯
                                              ▲                 │
                                              ╰──── per tool ───╯
```

`PluginEventMap` 里恰好六个事件 [@ref-amp-pluginapi-events]：

| 事件 | 触发时点 | 是否需要返回值 |
| :-- | :-- | :-- |
| `session.start` | Amp 启动一个线程会话时，例如用户在新线程里发出第一条消息，或打开/切到已有线程 | 否（fire-and-forget） |
| `agent.start` | 用户提交提示时（首条或回复），在 agent 开始工作前 | 是（`AgentStartResult`） |
| `tool.call` | 工具真正运行**之前** | 是（`ToolCallResult`） |
| `tool.result` | 工具结束之后、结果发回模型之前，每个工具各一次 | 是（`ToolResultResult`） |
| `changes.prompt` | 客户端准备 Ship / Push to Branch 按钮背后的提示时，在用户看到之前 | 是（`ChangesPromptResult`） |
| `agent.end` | agent 结束一轮时 | 是（`AgentEndResult`） |

**没有 `session.end`**：`session.start` 只在启动会话时发出，插件加载初始化应直接写在导出函数体里。同一个 Amp CLI 里可以同时启动并运行多条线程。[@ref-amp-plugins-session-start]

**顺序与并发**：事件本身按上面的生命周期顺序发生，`agent.start → tool.call → tool.result → agent.end` 构成一轮，工具段按每个工具重复。但**多个插件监听同一事件时，各插件处理器的执行顺序未定义**（类型参考原文）。唯一的例外是 `changes.prompt`：每个插件的 `append` 都会被追加，顺序是**插件加载顺序**。[@ref-amp-pluginapi-on][@ref-amp-pluginapi-events]

## 注册入口：只有插件 {#hooks-entry}

固定来源里**没有** hook 的声明式配置（没有 `.amp/hooks.json` 之类的文件，也没有 `hooks` 设置键）：注册方式是在插件里调用 `amp.on(event, handler)`，返回一个可 `unsubscribe()` 的 `Subscription`。[@ref-amp-pluginapi-on][@ref-amp-settings-keys]

因此「hook 在哪里配置」等价于「插件在哪里放」，位置与优先级如下（同名取 project、system、personal、workspace）[@ref-amp-plugins-locations]：

- `.amp/plugins/`（项目根，随项目走，运行 Amp 时生效）
- `$XDG_CONFIG_HOME/amp/plugins/`，未设置时 `~/.config/amp/plugins/`（macOS/Linux）或 `%USERPROFILE%\.config\amp\plugins\`（Windows）
- personal 插件与 workspace 插件（托管在全局插件仓库里，见「原生插件」一章）

**没有 matcher**：`amp.on` 的第一个参数只是事件名，类型参考的签名为 `on(event, handler)`，不接受过滤表达式；筛选只能在处理器内部用事件字段自己做（例如判断 `event.tool` 是不是某个工具名）。插件也无法在配置里开关单个事件处理器，只能整体重载/禁用插件。[@ref-amp-pluginapi-on]

安装与发布入口：`amp plugins add URL` 安装机器本地的 system 插件，加 `--target workspace` 装进当前项目的 `.amp/plugins/`。[@ref-amp-plugins-adding]

## 回调收到什么 {#hooks-input}

所有插件事件都是**线程作用域**的。处理器的第二个参数是 类型参考里的 `PluginEventContext`：事件上下文基类再并上 `thread`。[@ref-amp-pluginapi-context]

`PluginEventContextBase` 提供 [@ref-amp-pluginapi-context]：

| 成员 | 作用 |
| :-- | :-- |
| `logger` | 该插件的 scoped logger；日志会追加到本次处理器调用的 trace span 事件里 |
| `$` | tagged-template 形式的 shell 运行器，绑定到本次 hook 调用 |
| `ui` | 平台 UI 能力（`notify` / `input` / `select` / `confirm`） |
| `ai` | AI 能力 |
| `system` | 系统能力与信息 |
| `span` | 本次处理器调用的 trace span ID（启用 tracing 时存在） |

**工作目录**：`ctx.$` 执行命令，`ctx.system.workspaceRoot` 给出当前打开的 workspace/仓库根的**文件 URI**；它是插件进程生命周期内稳定的，workspace 变化会导致插件重载。要在 workspace 相对路径下跑 shell 命令，必须先用 `amp.helpers.filePathFromURI` 把 URI 转成本地路径。[@ref-amp-pluginapi-context][@ref-amp-pluginapi-system]

各事件携带的 payload [@ref-amp-pluginapi-events]：

- `session.start`：`thread: { id }`。
- `tool.call`：`toolUseID`、`tool`（工具名）、`input`（将传给工具的输入对象）、`thread`。
- `tool.result`：`toolUseID`、`tool`、`input`、`status`（`done` / `error` / `cancelled`）、`error?`、`output?`、`thread`。
- `agent.start`：`thread`、`message`（用户提示文本）、`id`、`changesWorkflow?`（客户端 Ship 按钮为 `ship`、Push to Branch 为 `push_branch`；用户自己输入的提示没有该字段——用它来反应工作流而不是匹配提示文本）。
- `agent.end`：`thread`、`message`（发起本轮的用户提示）、`id`、`status`（`done` / `error` / `cancelled`）、`messages`（自 `agent.start` 以来的所有消息，含发起本轮的用户消息）。
- `changes.prompt`：`thread`、`workflow`（`ship` 或 `push_branch`）。

**敏感内容**：固定来源没有描述密钥、凭据或用户私有内容的脱敏规则，也没有说明 hook 输入是否可被其他插件读到；只说明 `agent.start` 返回的追加消息默认隐藏（`display` 默认 `false`）。这一项保持未验证。[@ref-amp-pluginapi-events]

## 返回值如何继续、修改或阻断 {#hooks-output}

各事件允许的返回值（类型参考原文）[@ref-amp-pluginapi-toolcall-result][@ref-amp-pluginapi-events]：

**`tool.call`**——决定工具怎么跑 [@ref-amp-plugins-tool-call]：

| 返回 | 效果 |
| :-- | :-- |
| `{ action: 'allow' }` | 用原始输入运行工具 |
| `{ action: 'reject-and-continue', message }` | 阻断本次调用，让 agent 继续做别的 |
| `{ action: 'modify', input }` | 改掉传给工具的输入后再运行 |
| `{ action: 'synthesize', result: { output, exitCode? } }` | 不给工具跑，直接提供结果 |
| `{ action: 'error', message }` | 插件自身出错：停止线程 worker 并显示一个短时错误 |

**`tool.result`**——返回空则保留原结果；返回替换用的 `status` 与 `output`/`error` 则改写结果，可选值只有 `done` / `error` / `cancelled` 三种 `status`。[@ref-amp-plugins-tool-result]

**`agent.start`**——返回 `message: { content, display? }` 会在用户消息内容之后追加一段；`display` 为 `true` 时在 UI 里显示，默认隐藏。[@ref-amp-plugins-agent-start]

**`changes.prompt`**——返回 `{ append }` 在提示之后追加指令。Ship 对话框会显示拼装后的完整提示，用户可以在发送前编辑或删掉插件加的内容。[@ref-amp-plugins-changes-prompt]

**`agent.end`**——返回 `{ action: 'continue', userMessage, maxContinuations? }` 会追加一条后续用户消息并开始新一轮。必须自带标记或其他守卫，否则会无限循环；作为兜底，Amp 在**连续五条**插件 `continue` 消息之后停止链式调用，用户下一条消息会重置计数。需要长时间推进的插件可以显式提高 `maxContinuations`。[@ref-amp-plugins-agent-end][@ref-amp-pluginapi-events]

**退出码 / 异常**：固定来源没有为事件处理器定义退出码语义；处理器抛错在 `tool.call` 里对应 `action: 'error'`（停止 thread worker）。并发、handler 超时与失败重试在固定来源里**没有**为插件事件定义（文档只为插件 `onDispose` 清理定义了「所有清理回调合计约 3 秒」的预算，以及为 webhook 处理器定义了 30 秒与退避重试）。这一项保持未验证。[@ref-amp-pluginapi-ondispose][@ref-amp-pluginapi-createwebhook-doc][@ref-amp-pluginapi-events]

## 生效条件：插件状态、信任与运行环境 {#hooks-conditions}

- **激活设置**：「插件激活设置同时作用于交互式 `amp` 会话与 `amp --execute` 运行。」[@ref-amp-plugins-activation]
- **信任**：插件是会在你的环境里运行代码的 TypeScript/JavaScript 模块，官方反复要求「只加载你信任的插件」，因为插件能读你的文件、跑命令。插件没有签名或沙箱机制的描述。[@ref-amp-plugins-overview]
- **重载条件**：改动插件后要显式重载（让 Amp 重载，或命令面板 `plugins: reload`），见诊断一节。[@ref-amp-plugins-reload]
- **execute 模式的就绪等待**：`agent.start` / `agent.end` 依赖插件已加载。用 `-x` 时加 `--plugin-ready-timeout` 让 execute 模式等插件就绪再跑这一轮；不加则该轮可能在插件加载完成前开始，事件被跳过。裸 flag 最多等 10 秒，也可以给秒数，上限 300，`0` 表示不等。[@ref-amp-execute-plugin-ready]
- **工具权限**：Amp 默认在运行工具前**不**请求批准；要按条件阻断工具，就写一个自定义插件（例如官方给出的「危险的 git 操作前先确认」插件示例），由工作区管理员作为 global workspace 插件分发。[@ref-amp-tools-permissions]

固定来源没有描述 hook 的沙箱、权限授予或企业策略强制（例如由管理员禁用某类插件），这部分未验证。

## 诊断：确认被发现、匹配与执行 {#hooks-diagnostics}

| 想确认 | 入口 | 来源 |
| :-- | :-- | :-- |
| 插件是否加载、来源、注册的事件/命令/工具 | `amp plugins list`（shell 里运行） | [@ref-amp-plugins-reload] |
| 交互式地列出插件 | 命令面板（`Ctrl+O`）→ `plugins: list` | [@ref-amp-plugins-reload] |
| 让改动生效 | 命令面板 `plugins: reload`，或直接让 Amp 重载插件 | [@ref-amp-plugins-reload] |
| 某个处理器是否执行过 | `ctx.logger` / `amp.logger` 的输出会追加到该处理器调用的 trace span 事件里；`ctx.span` 是启用 tracing 时的 span ID | [@ref-amp-pluginapi-context] |
| execute 模式里事件是否被跳过 | 检查是否给了 `--plugin-ready-timeout` | [@ref-amp-execute-plugin-ready] |

**生效时机**：插件改动不会自动进入正在运行的环境——用 `plugins: reload` 重载插件；托管在 personal/workspace 仓库里的插件要 push 发布后由**新线程**自动加载，已有线程不会自动重载。[@ref-amp-plugins-reload]

固定来源没有提供「hook 匹配失败」或「hook 被策略拒绝」这类逐条错误入口，也没有插件运行日志的独立查看命令；`amp plugins list` 只能确认注册面，不能确认某次调用的结果。这部分是明确缺口。[@ref-amp-plugins-reload]
