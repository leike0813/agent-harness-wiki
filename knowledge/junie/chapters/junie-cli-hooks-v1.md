---
schema_version: 3
record_kind: production
edition_id: junie-cli-hooks-v1
harness_id: junie
topic: hooks
title: "Junie CLI 的 Hooks：事件、matcher、输入输出、顺序与失败处理"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-config, ref-junie-quickstart-overview]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-config, ref-junie-hooks-fields, ref-junie-hooks-matcher, ref-junie-config-fields, ref-junie-config-hooks-safety, ref-junie-hooks-extension, ref-junie-hooks-merge]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-events, ref-junie-hooks-stop, ref-junie-hooks-permissionrequest, ref-junie-hooks-stopfailure, ref-junie-hooks-limits]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-input, ref-junie-hooks-pretooluse, ref-junie-hooks-stop, ref-junie-hooks-retries, ref-junie-hooks-stopfailure]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-merge, ref-junie-hooks-fields, ref-junie-hooks-async, ref-junie-hooks-failure, ref-junie-hooks-retries, ref-junie-hooks-limits, ref-junie-hooks-extension]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-failure, ref-junie-hooks-limits, ref-junie-hooks-async, ref-junie-hooks-extension, ref-junie-quickstart-transcript]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-junie-hooks-events, ref-junie-hooks-stop, ref-junie-hooks-permissionrequest, ref-junie-hooks-stopfailure]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-junie-hooks-config, ref-junie-hooks-fields, ref-junie-hooks-matcher, ref-junie-config-fields]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-junie-hooks-input, ref-junie-hooks-stop, ref-junie-hooks-pretooluse, ref-junie-hooks-stopfailure]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-junie-hooks-pretooluse, ref-junie-hooks-stop, ref-junie-hooks-retries]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-junie-hooks-merge, ref-junie-hooks-fields, ref-junie-hooks-async, ref-junie-hooks-failure, ref-junie-hooks-retries]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-junie-config-hooks-safety, ref-junie-hooks-extension, ref-junie-hooks-merge, ref-junie-hooks-config]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-junie-hooks-failure, ref-junie-hooks-limits, ref-junie-hooks-async, ref-junie-hooks-extension]
---

## 固定来源与适用范围 {#hooks-scope}

本章依据 Junie 官方文档站 `junie.jetbrains.com/docs` 的 `junie-cli-hooks.html`、
`junie-cli-configuration.html` 与 `junie-cli.html` 快照，未标注适用构建号，属来源级知识。Hooks
让 Junie CLI 在会话定义好的时点自动运行 shell 命令：会话开始（`SessionStart`）、提示提交前
（`UserPromptSubmit`）、工具调用前（`PreToolUse`）、任务提交前（`Stop`）、因 LLM/API
错误结束（`StopFailure`）、权限对话框出现时（`PermissionRequest`）与会话结束
（`SessionEnd`）[@ref-junie-hooks-config][@ref-junie-quickstart-overview]。

## 配置入口与字段 {#hooks-entry}

**hooks.entry**。把 `hooks` 对象写进用户级 `~/.junie/config.json`，或写进用 `--config-location`
显式传入的文件。每个事件下是一个条目数组，条目含 `matcher` 与要运行的 `hooks` 列表
[@ref-junie-hooks-config]。`hooks` 也是 `config.json` 的受支持顶层字段之一
[@ref-junie-config-fields]。

条目字段 [@ref-junie-hooks-matcher]：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `matcher` | 否 | 正则，匹配事件专有值；省略时对每个值都运行。`UserPromptSubmit` 与 `Stop` 不支持 matcher，条目每次都运行。 |
| `hooks` | 是 | 匹配时运行的 hook 命令列表。 |

命中条目里的命令字段 [@ref-junie-hooks-fields]：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `type` | 是 | 目前仅支持 `command`。 |
| `command` | 是 | 要运行的 shell 命令；macOS/Linux 用 `sh -c`，Windows 用 `cmd /c`。 |
| `timeout` | 否 | 单条命令的最大执行秒数，按事件取默认值。 |
| `blockOnError` | 否 | 仅 `Stop` 事件，`true` 时把非零退出（除已具阻断语义的 `2`）升级为带重试的阻断。 |
| `async` | 否 | `true` 时后台运行，无法阻断或影响触发动作。 |

**hooks.conditions**。安全与信任决定 Hook 是否生效：默认项目配置 `<项目根>/.junie/config.json`
里的 `hooks` 被忽略（项目文件受仓库控制，Junie 不会自动执行其中的 shell 命令），要运行需用
`--config-location` 显式传入；个人 hooks 放在 `~/.junie/config.json`
[@ref-junie-config-hooks-safety]。扩展可以随包携带 hook，但只有在通过 `/extensions` 以用户或项目
作用域安装后才激活，且不会从未受信任的项目本地 `config.json` 加载
[@ref-junie-hooks-extension]。多个来源合并时，用户配置、显式 `--config-location` 文件与已安装扩展
的 `hooks/hooks.json` 是同级的受信任来源
[@ref-junie-hooks-merge]。

## 触发事件 {#hooks-events}

**hooks.events**。七个事件与其时点 [@ref-junie-hooks-events]：

- `SessionStart`：每个会话触发一次，`source` 取 `startup`（全新会话）、`resume`（同进程内恢复）、
  `clear`（同进程内 `/new` 等新会话）、`compact`（任务内历史压缩触发的合成会话）。
- `UserPromptSubmit`：交互式 TUI 里每次提交提示、发送给模型之前触发，无 `source`/`reason`，不支持
  matcher。
- `PreToolUse`：每次工具调用前、动作请求解析之后、工具执行之前触发。
- `Stop`：任务即将成功提交前同步触发，可放行、带文字原因阻断并重试、或硬中止
  [@ref-junie-hooks-stop]。
- `PermissionRequest`：即将弹出敏感动作权限对话框时触发，hook 可自动放行或拒绝以抑制对话框
  [@ref-junie-hooks-permissionrequest]。
- `StopFailure`：某个 agent 回合底层的 LLM/API 调用以可分类失败结束时触发一次；只有可观测用途，
  不能阻断、重试或中止 [@ref-junie-hooks-stopfailure]。
- `SessionEnd`：会话终止时触发，`reason` 取 `prompt_input_exit`、`other` 或 `logout`。

宿主覆盖范围有限：互动 TUI 宿主触发全部七个事件，批处理宿主触发除 `UserPromptSubmit` 外的六个；
ACP 与 server 宿主暂不触发任何 hook [@ref-junie-hooks-events][@ref-junie-hooks-limits]。

## 输入与输出 {#hooks-io}

**hooks.input**。每个 hook 从标准输入收到一行 JSON，字段随事件变化
[@ref-junie-hooks-input]：

```json
{"hook_event_name":"SessionStart","session_id":"…","cwd":"/path/to/working/dir","project_path":"/path/to/project","source":"startup"}
{"hook_event_name":"PreToolUse","tool_name":"Bash","tool_input":{"command":"sleep 60","run_in_background":false,"timeout":30}}
{"hook_event_name":"SessionEnd","reason":"prompt_input_exit"}
{"hook_event_name":"Stop","stop_hook_active":false,"last_assistant_message":"…"}
{"hook_event_name":"PermissionRequest","tool_name":"Bash","tool_input":{},"permission_reason":"…"}
{"hook_event_name":"StopFailure","error":"rate_limit","error_details":"429 Too Many Requests"}
```

`SessionStart`/`UserPromptSubmit` 载荷另带 `cwd`，并在会话提供时带 `session_id` 与
`project_path`；`UserPromptSubmit` 额外带 `prompt` 文本 [@ref-junie-hooks-input]。`StopFailure`
的字段名沿用 Claude Code 的 `StopFailure` 协议，便于复用同款 hook 脚本
[@ref-junie-hooks-stopfailure]。

**hooks.output**。`PreToolUse` 可在标准输出返回 JSON 影响后续动作：`decision` 取
`allow`（或省略）、`ask`（暂停并请用户确认）、`block`/`deny`（不执行并把 `reason` 作为错误返回给
模型）；`updatedInput` 替换工具输入，`additionalContext` 为该回合注入模型上下文；退出码 `2`
无条件阻断工具，其它非零码仅记警告并放行工具。输出不是合法 JSON 时，原始 stdout 当作
`additionalContext` [@ref-junie-hooks-pretooluse]。

`Stop` 的继续/阻断规则 [@ref-junie-hooks-stop][@ref-junie-hooks-retries]：

- 退出码 `2`：stderr 作为阻断原因回喂给 agent（stderr 为空时用通用文案）。
- 成功退出并打印 `{"decision":"block","reason":"…"}`：`reason` 作为观察者消息迫使 agent 重试。
- 设置 `blockOnError: true` 并非零退出：stderr 作为阻断原因。
- 打印 `{"continue":false,"stopReason":"…"}`：硬中止，任务以失败退出状态结束，`continue: false`
  优先于 `decision: "block"`。
- 成功退出并打印 `additionalContext`：作为非错误观察者反馈继续对话；只发 `additionalContext`
  而不阻断时，agent 会带上下文再走一步后提交。
- 防死循环：同一任务内连续阻断 8 次后停止派发 Stop hook，可用 `JUNIE_STOP_HOOK_BLOCK_CAP` 覆盖
  （设为 `0` 关闭上限）。

## 顺序、超时、失败与异步 {#hooks-order}

**hooks.order**。同一事件在多个文件里定义时，所有条目**串联**而非覆盖：高优先级文件不替换低优先级
文件，而是追加条目；合并顺序是“配置文件 hooks 在前，扩展 hooks 在后（按扩展启用顺序）”
[@ref-junie-hooks-merge]。重试与阻断也有统一计数：Stop 阻断采用同一套规则，同一任务内连续阻断的
上限由 `JUNIE_STOP_HOOK_BLOCK_CAP` 控制 [@ref-junie-hooks-retries]。同一条目内的多条命令
**顺序执行**，不支持并行 [@ref-junie-hooks-limits]。

超时按事件取默认值：`SessionStart`、`UserPromptSubmit`、`PermissionRequest` 默认 10 秒，`Stop`
600 秒，`StopFailure` 60 秒，`SessionEnd` 2 秒；`SessionEnd` 的总派发预算为所有命中条目合计 10
秒，`StopFailure` 为 60 秒，单条命令的超时会被总预算限制
[@ref-junie-hooks-fields]。`async: true` 时触发动作立即继续：`decision`、`permissionDecision`、
`continue` 失效并被记录忽略，`systemMessage` 完成后在 TUI 显示但不送给 agent，`additionalContext`
排队到下一次用户提交前注入；hook 超时或非零退出会以 TUI 通知报出，并非静默
[@ref-junie-hooks-async]。

失败处理不阻断启动：stdout/stderr 以 debug 级记录（不写入会话历史），非零退出码记警告并在 TUI
提示，超时则强制结束进程并提示，非法配置（不支持的 `type`、非法 `matcher`、非正 `timeout`）也以
TUI 错误提示，Junie 继续启动 [@ref-junie-hooks-failure]。扩展 hooks 使用同一 schema，可用
`${CLAUDE_PLUGIN_ROOT}` 或 `${JUNIE_EXTENSION_ROOT}` 引用扩展内文件，二者都展开为扩展缓存路径
[@ref-junie-hooks-extension]。

## 诊断 {#hooks-diagnostics}

**hooks.diagnostics**：hook 的 stdout/stderr 以 debug 级记录；失败时输出可出现在 TUI 错误详情里，
但不进入会话历史。非零退出码记警告并在 TUI 提示，超时被强制结束后同样提示，非法配置（`type`、
`matcher`、`timeout` 不合法）以 TUI 错误提示；Junie 不会因 hook 失败中止启动
[@ref-junie-hooks-failure]。异步 hook 的超时或非零退出会发布 TUI 通知
[@ref-junie-hooks-async]。`SessionEnd` 的输出被丢弃，`PreToolUse` 的 `additionalContext` 与
`updatedInput` 才会影响该次调用 [@ref-junie-hooks-limits]。扩展 hooks 只在扩展通过 `/extensions`
安装后激活，扩展缓存路径即 `${JUNIE_EXTENSION_ROOT}` 的展开目标，可据此核对文件是否解析正确
[@ref-junie-hooks-extension]。会话记录可用于比对 hook 前后的行为：`Ctrl+O` 打开会话目录下的
`transcript.md`（子代理记录在会话的 `subagents` 文件夹）[@ref-junie-quickstart-transcript]。固定
来源没有提供“列出已注册 hook”或“重新加载 hook 配置”的专门命令，配置改动随新进程/新会话生效，因此
本项按 partial 阅读。
