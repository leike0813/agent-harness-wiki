---
schema_version: 3
record_kind: production
edition_id: openhands-cli-hooks-v1
harness_id: openhands
topic: hooks
title: "OpenHands CLI 的 Hooks：事件、配置、输入输出、阻断、顺序与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-pyproject, ref-openhands-cli-readme-config, ref-openhands-cli-readme-status, ref-openhands-canvas-boundaries]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-hooks-events, ref-openhands-sdk-hooks-processor, ref-openhands-sdk-hooks-session, ref-openhands-docs-hooks-types, ref-openhands-sdk-hooks-plugin-merge, ref-openhands-sdk-hooks-merge]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-hooks-load, ref-openhands-cli-setup-conversation, ref-openhands-cli-locations, ref-openhands-cli-acp-local, ref-openhands-sdk-hooks-schema, ref-openhands-sdk-hooks-config, ref-openhands-sdk-hooks-matcher, ref-openhands-cli-hooks-example, ref-openhands-cli-hooks-script, ref-openhands-docs-hooks-fields, ref-openhands-docs-hooks-format, ref-openhands-docs-hooks-quickstart, ref-openhands-docs-hooks-matchers]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-hooks-types, ref-openhands-sdk-hooks-executor, ref-openhands-sdk-hooks-eventlog, ref-openhands-docs-hooks-input, ref-openhands-docs-hooks-quickstart]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-hooks-result, ref-openhands-docs-sdk-hooks-exitcodes, ref-openhands-sdk-hooks-processor, ref-openhands-sdk-hooks-session, ref-openhands-cli-hooks-script, ref-openhands-docs-hooks-output]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-hooks-manager, ref-openhands-sdk-hooks-async, ref-openhands-sdk-hooks-result, ref-openhands-sdk-hooks-load, ref-openhands-sdk-hooks-executor, ref-openhands-docs-sdk-hooks-prompt, ref-openhands-docs-sdk-hooks-modes, ref-openhands-docs-sdk-hooks-agent]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-sdk-hooks-load, ref-openhands-sdk-hooks-executor, ref-openhands-cli-acp-local, ref-openhands-cli-readme-modes, ref-openhands-sdk-hooks-merge]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-cli-acp-local, ref-openhands-cli-skills-command, ref-openhands-cli-resources, ref-openhands-docs-hooks-view, ref-openhands-sdk-hooks-eventlog, ref-openhands-sdk-hooks-processor, ref-openhands-docs-hooks-quickstart]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-openhands-sdk-hooks-events, ref-openhands-sdk-hooks-processor, ref-openhands-sdk-hooks-session, ref-openhands-docs-hooks-types, ref-openhands-sdk-hooks-plugin-merge]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-openhands-sdk-hooks-load, ref-openhands-cli-setup-conversation, ref-openhands-sdk-hooks-schema, ref-openhands-sdk-hooks-matcher, ref-openhands-cli-hooks-example, ref-openhands-docs-hooks-fields]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-openhands-sdk-hooks-types, ref-openhands-sdk-hooks-executor, ref-openhands-docs-hooks-input]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-openhands-sdk-hooks-result, ref-openhands-docs-sdk-hooks-exitcodes, ref-openhands-sdk-hooks-processor, ref-openhands-sdk-hooks-session, ref-openhands-cli-hooks-script, ref-openhands-docs-hooks-output]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs: [ref-openhands-sdk-hooks-manager, ref-openhands-sdk-hooks-async, ref-openhands-sdk-hooks-executor, ref-openhands-docs-sdk-hooks-prompt, ref-openhands-docs-sdk-hooks-modes, ref-openhands-docs-sdk-hooks-agent]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-sdk-hooks-load, ref-openhands-sdk-hooks-executor, ref-openhands-cli-acp-local, ref-openhands-cli-readme-modes, ref-openhands-sdk-hooks-merge]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-openhands-cli-setup-conversation, ref-openhands-cli-skills-command, ref-openhands-cli-resources, ref-openhands-docs-hooks-view, ref-openhands-sdk-hooks-eventlog]
---

## 固定来源与调查范围 {#hooks-scope}

本页只回答 CLI 界面（`surface_id: cli`）。固定来源：CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba`（包 `openhands` 1.16.0）[@ref-openhands-cli-pyproject]，其 README 说明了配置文件位置与仓库维护状态 [@ref-openhands-cli-readme-config] [@ref-openhands-cli-readme-status]；Hooks 的执行由 CLI 依赖的 `openhands-sdk==1.28.1`（本目录固定提交 `edaac806`）实现 [@ref-openhands-cli-pyproject]；产品 Web 端位于另一官方仓库 [@ref-openhands-canvas-boundaries]。官方文档站点页面作为文档快照来源，适用软件版本未知。

## 事件类型与触发时点 {#hooks-events}

第一方事件共六个，名字与配置键如下 [@ref-openhands-sdk-hooks-events]：

| 事件名 | `hooks.json` 键 | 触发时点 |
| --- | --- | --- |
| `PreToolUse` | `pre_tool_use` | 工具动作事件产生后、工具真正执行前 [@ref-openhands-sdk-hooks-processor] |
| `PostToolUse` | `post_tool_use` | 观察到对应工具结果时（必须能找到匹配的动作事件）[@ref-openhands-sdk-hooks-processor] |
| `UserPromptSubmit` | `user_prompt_submit` | 用户消息事件进入会话时 [@ref-openhands-sdk-hooks-processor] |
| `SessionStart` | `session_start` | 会话初始化、Hook 处理器建立后执行一次 [@ref-openhands-sdk-hooks-session] |
| `SessionEnd` | `session_end` | 会话关闭时 [@ref-openhands-sdk-hooks-session] |
| `Stop` | `stop` | 智能体准备结束（执行状态变为已完成）时 [@ref-openhands-sdk-hooks-session] |

官方文档给出的事件表（六个事件加“是否可阻断”列）与源码一致 [@ref-openhands-docs-hooks-types]。插件目录里的 `hooks/hooks.json` 会作为额外来源被加载，并在会话初始化时与显式配置合并，因此同名事件可能同时来自用户配置与插件 [@ref-openhands-sdk-hooks-plugin-merge] [@ref-openhands-sdk-hooks-merge]。

## 配置入口与字段 {#hooks-entry}

查找位置：`HookConfig.load(path=None, working_dir=None)` 先看显式路径；否则按顺序查 `{working_dir 或当前目录}/.openhands/hooks.json`、`~/.openhands/hooks.json`，取**第一个存在**的文件（不做两处合并）；都找不到时返回空配置 [@ref-openhands-sdk-hooks-load]。CLI 在建立会话时传入工作目录：`HookConfig.load(working_dir=get_work_dir())`，工作目录默认是当前目录、可由 `OPENHANDS_WORK_DIR` 覆盖，因此“项目级优先于用户级” [@ref-openhands-cli-setup-conversation] [@ref-openhands-cli-locations]。ACP 本地代理同样按工作目录加载；ACP 远程/云模式只加载全局 `~/.openhands/hooks.json`，实际执行在服务端 [@ref-openhands-cli-acp-local]。

配置结构：顶层每个事件键对应 `HookMatcher` 列表；matcher 形如 `{"matcher": "*", "hooks": [{...}]}` [@ref-openhands-sdk-hooks-schema] [@ref-openhands-sdk-hooks-config]。

`HookDefinition` 字段（默认值来自模型）[@ref-openhands-sdk-hooks-schema]：

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `type` | `command` | `command`（子进程）、`prompt`、`agent` 三值 |
| `command` | `""` | command 型必填；prompt/agent 型必须为空 |
| `prompt` / `system_prompt` | 无 | prompt 型使用 |
| `tools` | `[]` | agent 型可用的工具名 |
| `timeout` | `60`（秒） | 超时后进程被终止 |
| `max_iterations` | `3` | agent 型的迭代上限 |
| `async`（别名 `async_`） | `false` | 异步执行，永不阻断；agent 型禁止开启 |

兼容性：顶层 `{"hooks": {...}}` 包装与 PascalCase 事件名（如 `PreToolUse`）会被规范化成蛇形字段，未知的 PascalCase 事件名抛错，同一事件同时出现两种写法也抛错——这一兼容层是为了读取 Claude Code 风格的 hook 文件 [@ref-openhands-sdk-hooks-config]。官方文档给出的字段表与默认值（`type=command`、`timeout=60`、`async=false`）与源码一致 [@ref-openhands-docs-hooks-fields]。

仓库自带一个可直接照抄的最小实例：`.openhands/hooks.json` 给 `stop` 事件挂一个 `matcher: "*"`、`timeout: 300` 的脚本，脚本 `on_stop.sh` 在 pre-commit 失败时输出 `{"decision":"deny","reason":"pre-commit failed","additionalContext":...}` 并以退出码 2 结束 [@ref-openhands-cli-hooks-example] [@ref-openhands-cli-hooks-script]。文档的 `hooks.json` 格式示例与快速开始步骤与之同构 [@ref-openhands-docs-hooks-format] [@ref-openhands-docs-hooks-quickstart]。

匹配规则（只对带工具名的事件生效）：`"*"` 或空串匹配全部；被 `/` 包裹时按正则做全匹配；含正则元字符时自动按正则处理；否则精确相等 [@ref-openhands-sdk-hooks-matcher]。非工具事件（Stop、UserPromptSubmit、SessionStart、SessionEnd）传入的工具名为空，只有 `"*"`/空 matcher 能命中 [@ref-openhands-sdk-hooks-matcher]。文档的 matcher 模式表与之一致 [@ref-openhands-docs-hooks-matchers]。

## 回调输入 {#hooks-input}

command 型 Hook 的进程收到：

- stdin：一条 JSON，字段为 `event_type`、`tool_name`、`tool_input`、`tool_response`、`message`、`session_id`、`working_dir`、`metadata`（默认 `{}`）[@ref-openhands-sdk-hooks-types]。
- 工作目录：Hook 执行器自身的工作目录（默认进程当前目录）[@ref-openhands-sdk-hooks-executor]。
- 环境变量：`OPENHANDS_PROJECT_DIR`、`OPENHANDS_SESSION_ID`、`OPENHANDS_EVENT_TYPE`，以及存在工具名时的 `OPENHANDS_TOOL_NAME`；基础环境是进程环境的副本，其中 `SESSION_API_KEY` 被剥离 [@ref-openhands-sdk-hooks-executor]。
- 敏感内容：固定源码只剥离 `SESSION_API_KEY`，没有对 hook 的 stdout/stderr 做脱敏，也没有对其他密钥做屏蔽，所以脚本自身不要把凭据打印到输出 [@ref-openhands-sdk-hooks-executor] [@ref-openhands-sdk-hooks-eventlog]。

文档的“Input”一节给出的输入契约（事件 JSON 走 stdin、上述环境变量）与源码一致 [@ref-openhands-docs-hooks-input]，并给出“把事件 JSON 手工管道进脚本以便本地验证”的做法 [@ref-openhands-docs-hooks-quickstart]。

## 输出、退出码与阻断 {#hooks-output}

退出码与 stdout 约定 [@ref-openhands-sdk-hooks-result] [@ref-openhands-docs-sdk-hooks-exitcodes]：

| 退出码 | 含义 |
| --- | --- |
| 0 | 成功；stdout 若是 JSON 对象则解析其中的决策字段 |
| 2 | 阻断当前操作 |
| 其他非零 | 非阻断错误：记录失败，操作继续 |

stdout 可解析的 JSON 键：`decision`（`allow`/`deny`，`deny` 等价于阻断）、`reason`、`additionalContext`、`continue`（假值即阻断）[@ref-openhands-sdk-hooks-result]。超时会得到 `success=false`、`exit_code=-1` 与“Hook timed out after N seconds”的错误信息，但不阻断；脚本不存在或其他异常同样是非阻断错误 [@ref-openhands-sdk-hooks-result]。

阻断的实际效果按事件不同 [@ref-openhands-sdk-hooks-processor] [@ref-openhands-sdk-hooks-session]：

- `PreToolUse`：动作被标记为已阻断，工具不会执行，并向会话写入一条“被 Hook 拒绝”的观察结果。
- `UserPromptSubmit`：该用户消息被跳过，会话进入已完成状态；`additionalContext` 会附加到消息内容里。
- `Stop`：不允许结束，执行状态回到运行中，并把反馈以环境消息的形式注入给智能体继续工作。
- `PostToolUse`、`SessionStart`、`SessionEnd`：不参与阻断（阻断开关为关）。

仓库示例正好演示了最后一类：stop 脚本 pre-commit 失败即 `exit 2` 并给出 deny 决策，成功则输出 `{"decision": "allow"}` [@ref-openhands-cli-hooks-script]。文档的“Output”一节列出同样的退出码与决策键 [@ref-openhands-docs-hooks-output]。

## 顺序、并发与失败处理 {#hooks-order}

- 顺序：同一事件内的 matcher 与 hook 按配置书写顺序**串行**执行；命中同一事件的多个 matcher 不去重，同一个脚本被两个 matcher 命中就运行两次 [@ref-openhands-sdk-hooks-manager]。
- 提前停止：`PreToolUse`、`UserPromptSubmit`、`Stop` 在第一个阻断结果后停止后续 hook；其余事件跑完全部 hook [@ref-openhands-sdk-hooks-manager]。
- 超时与清理：`timeout` 到期终止子进程，进程组先 SIGTERM 再 SIGKILL；会话结束时统一清理仍在运行的异步进程 [@ref-openhands-sdk-hooks-async]。
- 异步：`async: true` 的 hook 以 fire-and-forget 方式启动，立即返回成功占位结果，永不阻断；在 `PreToolUse` 上使用会记录告警 [@ref-openhands-sdk-hooks-async]。
- 失败：非零且非 2 的退出码、超时、找不到命令都只记录失败，不阻断；配置 JSON 本身非法会在加载时抛错（CLI 会话建立阶段即失败）[@ref-openhands-sdk-hooks-result] [@ref-openhands-sdk-hooks-load]。
- 执行模式：`command` 已实现；`agent` 型会开一个不带 Hook 的子会话，从最终回复中取第一个 JSON 对象读决策，失败时“默认放行”；`prompt` 型在固定快照中未实现，日志会写“prompt hooks 尚未实现，默认放行”[@ref-openhands-sdk-hooks-executor]。官方文档把 `prompt` 型描述为可用功能，与固定源码不一致，属文档与源码差别 [@ref-openhands-docs-sdk-hooks-prompt] [@ref-openhands-docs-sdk-hooks-modes]；文档对 agent 型 Hook 的描述与实现相符 [@ref-openhands-docs-sdk-hooks-agent]。

## 生效条件与信任边界 {#hooks-conditions}

- 没有信任提示或逐 Hook 的开关：配置非空即生效；要停用就删除、改名或清空 `hooks.json`（CLI 只有在配置非空时才打印“Hooks loaded”并把配置交给会话）[@ref-openhands-cli-setup-conversation] [@ref-openhands-sdk-hooks-load]。
- 执行位置：本地模式在宿主机以 shell 执行，工作目录为会话工作目录，环境是剥离了 `SESSION_API_KEY` 的进程环境；远程/云模式把 Hook 配置随会话请求发给服务端，由服务端执行 [@ref-openhands-sdk-hooks-executor] [@ref-openhands-cli-acp-local]。
- 与权限系统的关系：CLI 的确认策略（`--always-approve`、`--llm-approve` 等）作用于智能体的工具动作，不作用于 Hook；CLI 没有禁用 Hook 的命令行开关 [@ref-openhands-cli-readme-modes] [@ref-openhands-cli-setup-conversation]。
- 插件/项目混合：项目配置与插件配置在会话初始化时合并，显式配置的 hook 排在插件 hook 之前 [@ref-openhands-sdk-hooks-merge]。
- 生效时间：配置只在会话初始化时读取一次，没有文件监听；修改后需要新开会话才生效 [@ref-openhands-cli-setup-conversation]。

## 诊断 {#hooks-diagnostics}

1. 是否被加载：CLI 启动后若配置非空会打印“✓ Hooks loaded”，ACP 本地/远程路径写日志“Hooks loaded from hooks.json” [@ref-openhands-cli-setup-conversation] [@ref-openhands-cli-acp-local]。
2. 加载了哪些：TUI 的 `/skills` 视图在 Hooks 小节按事件列出命令 [@ref-openhands-cli-skills-command] [@ref-openhands-cli-resources]；官方文档的“Viewing Active Hooks”一节描述同一入口 [@ref-openhands-docs-hooks-view]。
3. 每次执行：SDK 把每次 Hook 执行记录成 `HookExecutionEvent`，含事件类型、命令、工具名、成功/阻断标志、退出码、stdout/stderr、reason、additionalContext、错误与关联的动作/消息 ID，长输出在 5 万字符处截断 [@ref-openhands-sdk-hooks-eventlog]。
4. 阻断原因：阻断与拒绝会以警告日志写出（例如“Hook blocked action …”“Stop hook denied stopping”），可据此区分“脚本没跑”与“脚本跑了但拒绝了”[@ref-openhands-sdk-hooks-processor]。
5. 手工验证：官方文档建议直接把事件 JSON 管道给脚本执行，例如 `echo '{"event_type":"Stop"}' | bash .openhands/hooks/on_stop.sh`，可在不启动会话的情况下检查退出码与 JSON 输出 [@ref-openhands-docs-hooks-quickstart]。
