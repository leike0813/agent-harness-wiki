---
schema_version: 3
record_kind: production
edition_id: command-code-cli-hooks-v1
harness_id: command-code
topic: hooks
title: "Command Code CLI 的 Hooks：事件、配置字段、stdin/stdout 契约与阻断语义"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-cc-hooks-events, ref-cc-hooks-tools, ref-cc-hooks-definition, ref-cc-mods-rule, ref-cc-mods-events, ref-cc-hooks-when]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-cc-hooks-config, ref-cc-settings-hooks, ref-cc-hooks-schema, ref-cc-hooks-entry]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-cc-hooks-input, ref-cc-hooks-toolinput, ref-cc-hooks-events, ref-cc-hooks-env]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-cc-hooks-output, ref-cc-hooks-exit, ref-cc-hooks-matrix]
  - section_id: hooks-ordering
    surface_ids: [cli]
    source_refs: [ref-cc-hooks-ordering, ref-cc-hooks-exec, ref-cc-hooks-modes, ref-cc-mods-trust, ref-cc-mods-toggle, ref-cc-hooks-config]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-hooks-debug, ref-cc-hooks-entry, ref-cc-trouble-reload, ref-cc-hooks-failures]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-cc-hooks-events, ref-cc-hooks-tools, ref-cc-mods-rule, ref-cc-mods-events]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-cc-hooks-config, ref-cc-settings-hooks, ref-cc-hooks-schema]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-cc-hooks-input, ref-cc-hooks-toolinput, ref-cc-hooks-env]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-cc-hooks-output, ref-cc-hooks-exit, ref-cc-hooks-matrix]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-ordering
        status: answered
        source_refs: [ref-cc-hooks-ordering, ref-cc-hooks-exec]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-ordering
        status: answered
        source_refs: [ref-cc-hooks-modes, ref-cc-mods-trust, ref-cc-mods-toggle]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-cc-hooks-debug, ref-cc-hooks-failures]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/hooks`、`/docs/settings`、`/docs/mods`、`/docs/troubleshooting/common-issues`），抓取于 2026-10-01（各 snapshot 的 `source_fetched_at` 记录 UTC 时间戳 2026-09-30T17:08Z）；文档站只有 HTML，引用按文档小节标题定位、摘录取自页面正文。Command Code 闭源，整章为来源级知识。

Command Code 的 **Hook** 是宿主在工具调用前后自动运行的 shell 脚本：配置写在 `settings.json` 的 `hooks` 键下 → 事件触发时宿主把工具详情以 JSON 写到脚本 stdin → 脚本用 stdout 的 JSON 与退出码回答 allow / deny / halt / 注入上下文。它与 Mod 的 hook 是两套不同机制（见下）。

## 事件、匹配工具与触发时点 {#hooks-events}

只识别四个事件：[@ref-cc-hooks-events]

| 事件 | 触发时点 | 能否阻断 |
| :-- | :-- | :-- |
| `PreToolUse` | 工具运行之前 | 能（拒绝该工具） |
| `PostToolUse` | 工具返回之后 | 不能（仅建议性重试信号） |
| `Stop` | 助手结束一个回合时 | 能（强制修订，最多 3 次重试） |
| `SessionStart` | 会话开始时（startup / resume / clear） | 不能（只注入上下文） |

`matcher` 只能匹配工具事件，可用的字面量有四个：`shell`（shell 命令）、`read`（文件读取）、`write`（创建或整体覆盖）、`edit`（就地编辑）。`Stop` 与 `SessionStart` 不带工具，写 `matcher` 会让 hook **永不触发**，应省略。[@ref-cc-hooks-tools][@ref-cc-hooks-definition]

**同名机制的另一来源**：Mod 也有一套按名注册的生命周期钩子（`onStop` 对应 Stop、`onSessionStart`/`onSessionEnd`、`beforeToolCall`/`afterToolCall` 对应工具前/后），并额外提供 `transformInput`（用户提示提交，即 UserPromptSubmit）、`appendSystemPrompt`、`transformContext`、`shouldStopAfterTurn`、`prepareNextTurn`、`onRunEnd` 等。两者不是同一来源：用户 Hook 是 `settings.json` 里的外部脚本，Mod hook 是 TypeScript 包内的函数；Mod 页明确说需要更广的生命周期反应时“That's what mods are for”。[@ref-cc-mods-rule][@ref-cc-mods-events] 官方也给出取舍表：Hook 用于“模型之外的确定性执行”（拦截破坏性操作、审计、注入模型必须看到的上下文、按信号暂停会话），Mod 用于扩展 Command Code 本身。[@ref-cc-hooks-when]

## 配置位置、字段与匹配规则 {#hooks-entry}

Hook 配置在 `settings.json` 的 `hooks` 键下，作用域两级：用户 `~/.commandcode/settings.json`（不提交）、项目 `.commandcode/settings.json`（提交）。**优先级：项目 > 用户**；当完全相同的命令字符串出现在多个作用域时，高优先级来源获胜。[@ref-cc-hooks-config][@ref-cc-settings-hooks]

结构是两层嵌套：`HookDefinition` 用 `matcher` 决定作用于哪些工具，`HookEntry` 是实际运行的处理器；一个 `HookDefinition` 可拥有多个 `HookEntry`。[@ref-cc-hooks-schema]

| 层 | 字段 | 必需 | 说明 |
| :-- | :-- | :--: | :-- |
| 外层 | `matcher` | 否 | 省略即匹配所有工具；示例 `"shell"`、`"write|edit"`；只对工具事件有意义 |
| 外层 | `hooks` | 是 | 处理器数组，按列出顺序运行 |
| 内层 | `type` | 是 | 处理器类型，目前只支持 `command` |
| 内层 | `command` | `type: "command"` 时必需 | 要执行的 shell 命令 |
| 内层 | `timeout` | 否 | 秒，默认 `30`，最大 `600` |

官方完整示例（来源：`/docs/hooks` 的 Example settings.json）：[@ref-cc-hooks-schema]

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "shell|write", "hooks": [ { "type": "command", "command": "./.commandcode/hooks/guard-tools.sh", "timeout": 10 } ] }
    ],
    "PostToolUse": [
      { "hooks": [ { "type": "command", "command": "./.commandcode/hooks/audit.sh" } ] }
    ]
  }
}
```

快速起步示例（同样来自 `/docs/hooks`）：把下面片段放进项目根 `.commandcode/settings.json`，重启 `cmd` 后运行 shell 工具就会看到 `PreToolUse: hook fired`。[@ref-cc-hooks-entry]

```json
{ "hooks": { "PreToolUse": [ { "matcher": "shell", "hooks": [ { "type": "command", "command": "echo '{\"systemMessage\":\"hook fired\"}'" } ] } ] } }
```

## 回调输入与环境变量 {#hooks-input}

宿主在 hook 运行前向其 stdin 写**一个 JSON 对象**。所有事件都有公共字段：`session_id`、`transcript_path`（本会话 transcript 的 JSONL 绝对路径）、`cwd`、`hook_event_name`、`permission_mode`（`default`/`auto-accept`/`plan`/`bypass`/`dont-ask`/空串）。[@ref-cc-hooks-input]

工具类事件额外带 `tool_use_id?`、`tool_name`（规范 id，如 `shell_command`、`read_file`、`write_file`、`edit_file`）、`tool_display_name`（`SHELL`/`READ`/`WRITE`/`EDIT`，即 `matcher` 匹配的值）、`tool_input`（模型发出的参数）。`tool_input` 的形状随工具而变：[@ref-cc-hooks-toolinput]

| 工具 | 字段 |
| :-- | :-- |
| `shell_command` | `command`、`args?`、`directory?`、`timeout?` |
| `read_file` | `absolute_path`、`offset?`、`limit?` |
| `write_file` | `file_path`、`content` |
| `edit_file` | `file_path`、`old_value`、`new_value`、`replacement_count?`、`replace_all?` |

事件特有字段：`PostToolUse` 带 `tool_response`（工具输出，与模型看到的一致）；`Stop` 只带公共字段加 `stop_hook_active`（本次触发是否由上次 Stop 返回 `decision: "block"` 或 exit 2 引起的重试）；`SessionStart` 带 `source`（`startup`/`resume`/`clear`）。[@ref-cc-hooks-events]

宿主还向每个 hook 进程注入四个环境变量：`COMMANDCODE_PROJECT_DIR`（项目绝对路径，与 `cwd` 相同）、`COMMANDCODE_SESSION_ID`、`COMMANDCODE_HOOK_EVENT`、`COMMANDCODE_CWD`（与 `COMMANDCODE_PROJECT_DIR` 同值）。你的环境变量会转发给 hook 进程，但**敏感变量会被剥离**。[@ref-cc-hooks-env]

## 输出、退出码与阻断语义 {#hooks-output}

脚本向 stdout 写一个 JSON 对象，所有字段可选；exit 0 且 stdout 为空表示“无意见、放行”。公共输出字段：`continue`（`false` 在当前工具批次后暂停会话）、`stopReason`（`continue: false` 时给用户看的消息，不发模型）、`suppressOutput`（`true` 时审计日志省略该 hook 的解析输出）、`systemMessage`（TUI 里的自由文本提示，不发模型）。[@ref-cc-hooks-output]

各事件的 `hookSpecificOutput`：`PreToolUse` 有 `permissionDecision`（`"allow"`/`"deny"`）、`permissionDecisionReason`（拒绝时给模型看）、`additionalContext`；`PostToolUse` 用顶层 `decision: "block"` + `reason` 作建议性重试信号，`hookSpecificOutput.additionalContext` 追加到工具结果；`Stop` 只用顶层 `decision`/`reason`（无 `hookSpecificOutput`）；`SessionStart` 只有 `hookSpecificOutput.additionalContext`（注入到会话第一条用户消息），多个 SessionStart hook 的 `additionalContext` 会被连接后一起注入。[@ref-cc-hooks-output]

退出码是快路径：[@ref-cc-hooks-exit]

| 退出码 | stdout 处理 | 对工具 | 对会话 |
| :-- | :-- | :-- | :-- |
| `0` | 按 JSON 解析 | 由输出决定 | 继续（除非 `continue: false`） |
| `2` | 忽略 | `PreToolUse` 阻断；`PostToolUse` 建议性重试；`Stop`/`SessionStart` 不适用 | `Stop` 重试该回合；其余继续 |
| 其它 | 有则解析 | 工具照常运行，记录非阻断错误 | 继续 |

exit 2 时发给模型的文本按以下顺序解析：`hookSpecificOutput.permissionDecisionReason` → 顶层 `reason`（仅 PostToolUse）→ stderr 裁剪后的首行 → 命名该 hook 与退出码的通用兜底。`Stop` 的 `decision: "block"` 会阻止助手结束，agent 循环再跑一轮，**每回合最多 3 次重试**，之后以 `Stop hook retry cap reached (3)` 结束并点名该脚本；防死循环的规范写法是检查 `stop_hook_active` 后 `exit 0`。[@ref-cc-hooks-exit][@ref-cc-hooks-output]

**SessionStart 是非阻断的**：exit 2、`decision`、`continue: false` 都被忽略为控制信号，只有 `additionalContext`（注入首轮）与 `systemMessage`（给用户看）会被消费。任何 hook 设 `continue: false` 时，当前批次的每个 hook 仍会跑完，会话在之后暂停。[@ref-cc-hooks-matrix]

`Stop` 的两种重试触发都会把文本喂给模型：`decision: "block"` + `reason` 会被包上“Stop hook 要求你修订……”的框架作为对上一响应的修订反馈；`exit 2` + stderr 则**原样**喂入（截断但保留多行），模型把它当工具输出直接处理。机器风格诊断用 exit 2 + stderr，自然语言修订指导用 Stop 的 `reason`。[@ref-cc-hooks-output]

## 顺序、并发、超时与生效条件 {#hooks-ordering}

- **顺序**：同一事件内按 `settings.json` 中的出现顺序触发（项目在前、用户在后）。`PreToolUse` **顺序**执行，一旦有一个阻断，同一调用的后续 `PreToolUse` hook 被跳过；`PostToolUse` **并行**执行（工具已经结束），一个崩溃不会取消另一个，返回结果按 settings 顺序而非完成顺序排列；`Stop` 与 `SessionStart` 同样并行，且它们的 `matcher` 被静默忽略。[@ref-cc-hooks-ordering][@ref-cc-hooks-exec]
- **超时**：默认 30 秒，按 hook 用 `timeout` 覆盖（秒，上限 600）。超时后引擎发 `SIGTERM`；捕获 `SIGTERM` 的 hook 有 5 秒宽限，随后 `SIGKILL`。[@ref-cc-hooks-exec]
- **隔离**：每个 hook 各自进程、各自 stdin 副本，互相读不到对方的 stdout/stderr，也不能在彼此之间传递信息。[@ref-cc-hooks-exec]
- **执行方式**：每个 hook 命令都通过系统 shell 启动，JSON 输入从 stdin 管道送入。[@ref-cc-hooks-exec]
- **生效条件（权限模式）**：stdin 的 `permission_mode` 是会话当前模式。**plan 模式下 hook 被完全跳过**（plan 是只读设计，不需要 PreToolUse 守卫，也不会有 PostToolUse 审计）；`default` 每次工具都请求许可；`auto-accept` 自动接受提示；`bypass` 跳过提示但一般安全检查仍生效；`dont-ask` 从不提示，需要提示的一律拒绝。[@ref-cc-hooks-modes]
- **信任与项目读取时机**：项目 mod（以及项目 Skill）在通过工作区信任提示后才加载，用户级不受该门控。[@ref-cc-mods-trust] Mods 页另写明“项目设置只在该项目里跑过 Command Code 之后才会被读取，与项目 mod 同一道门”，而 Hook 配置正位于项目 `.commandcode/settings.json`，因此遵循同一读取时机。[@ref-cc-mods-toggle][@ref-cc-hooks-config]

## 诊断 {#hooks-diagnostics}

- **日志**：用 `cmd --debug` 启动，并在另一个终端 `tail -f ~/.commandcode/logs/command.log`。日志记录每次 hook 评估：信任检查、配置加载、matcher 决策、stdin/stdout 载荷与非零退出码。该日志只在 `--debug` 期间存在，跨会话追加，太吵时先清空。[@ref-cc-hooks-debug]
- **修改何时生效**：hook 在启动时初始化，因此改完配置要**重启 `cmd`**；快速起步一节明确写“Hooks initialize on startup. Restart Command Code with `cmd`”。新增/修改 mod 或 skill 时官方给的是 `/reload`（重启并恢复会话）。[@ref-cc-hooks-entry][@ref-cc-trouble-reload]
- **常见症状对照**：hook 从不运行 → 会话在 plan 模式（hook 被跳过）、`matcher` 正则没匹配上 `SHELL`/`READ`/`WRITE`/`EDIT` 任一显示名、或脚本没有可执行位（`chmod +x`）；写了 `"deny"` 工具仍运行 → `permissionDecision` 拼错或缺 `hookSpecificOutput`；超时错误 → hook 超过 `timeout`；hook 静默崩溃 → exit 0 时 stdout 不是合法 JSON；`jq: command not found` → 机器上没装 `jq`。[@ref-cc-hooks-failures]
