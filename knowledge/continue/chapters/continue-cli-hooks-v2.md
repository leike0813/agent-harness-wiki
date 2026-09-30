---
schema_version: 3
record_kind: production
edition_id: continue-cli-hooks-v2
harness_id: continue
topic: hooks
title: "Continue CLI 的 Hooks：事件、配置、输入输出与执行语义"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-continue-src-hooks-events, ref-continue-src-hooks-firehook, ref-continue-src-hooks-input]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-continue-src-hooks-paths, ref-continue-src-hooks-merge, ref-continue-src-hooks-load, ref-continue-src-hooks-settings, ref-continue-src-hooks-matchers, ref-continue-src-hooks-match, ref-continue-src-hooks-handlers, ref-continue-src-hooks-timeouts, ref-continue-src-hooks-unimpl, ref-continue-src-hookservice-init, ref-continue-src-hookservice-fire]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-continue-src-hooks-input, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hooks-output, ref-continue-src-hooks-aggregate]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-continue-src-hooks-run, ref-continue-src-hooks-aggregate, ref-continue-src-hooks-handlers, ref-continue-src-hooks-timeouts, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hookservice-fire, ref-continue-src-hookservice-init]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-hookservice-init, ref-continue-src-logger, ref-continue-src-hookservice-reload, ref-continue-src-slash-handlers, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hooks-unimpl, ref-continue-src-hooks-match, ref-continue-src-hooks-firehook, ref-continue-src-hookservice-fire]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: partial
        source_refs: [ref-continue-src-hooks-events, ref-continue-src-hooks-firehook, ref-continue-src-hooks-input]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-continue-src-hooks-paths, ref-continue-src-hooks-merge, ref-continue-src-hooks-load, ref-continue-src-hooks-settings, ref-continue-src-hooks-matchers, ref-continue-src-hooks-match, ref-continue-src-hooks-handlers, ref-continue-src-hooks-timeouts, ref-continue-src-hooks-unimpl, ref-continue-src-hookservice-init, ref-continue-src-hookservice-fire]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-continue-src-hooks-input, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hooks-output, ref-continue-src-hooks-aggregate]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-continue-src-hooks-input, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hooks-output, ref-continue-src-hooks-aggregate]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-continue-src-hooks-run, ref-continue-src-hooks-aggregate, ref-continue-src-hooks-handlers, ref-continue-src-hooks-timeouts, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hookservice-fire, ref-continue-src-hookservice-init]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs: [ref-continue-src-hooks-paths, ref-continue-src-hooks-merge, ref-continue-src-hooks-load, ref-continue-src-hooks-settings, ref-continue-src-hooks-matchers, ref-continue-src-hooks-match, ref-continue-src-hooks-handlers, ref-continue-src-hooks-timeouts, ref-continue-src-hooks-unimpl, ref-continue-src-hookservice-init, ref-continue-src-hookservice-fire]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-continue-src-hookservice-init, ref-continue-src-logger, ref-continue-src-hookservice-reload, ref-continue-src-slash-handlers, ref-continue-src-hooks-exec, ref-continue-src-hooks-http, ref-continue-src-hooks-unimpl, ref-continue-src-hooks-match, ref-continue-src-hooks-firehook, ref-continue-src-hookservice-fire]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与总体结论 {#hooks-events}

CLI 有一套**照搬 Claude Code 语义**的 hooks 系统：类型定义文件开篇就写明「These types match the exact schemas from Claude Code so that any hook written for `claude` works with `cn` out of the box」。[@ref-continue-src-hooks-events]

本轮固定来源能证实三件事：事件与负载的完整契约、配置文件的查找与合并、命令/HTTP 两类回调的执行与结果聚合都已在源码中实现；但**没有任何 CLI 集成点调用这些事件**——`fireHook.ts` 导出的 `firePreToolUse`、`firePostToolUse`、`fireUserPromptSubmit`、`fireSessionStart`、`fireStop`、`firePreCompact` 等函数，在本提交的 CLI 源码里除了定义文件自身与测试之外没有调用方。因此本章各题的实现细节都是「已实现的机制」，而「事件在何时真正触发」目前没有可观察的运行证据。这是 hooks 主题整体按 partial 记录的原因。[@ref-continue-src-hooks-firehook]

事件名是固定枚举，共 17 个：`PreToolUse`、`PostToolUse`、`PostToolUseFailure`、`PermissionRequest`、`UserPromptSubmit`、`SessionStart`、`SessionEnd`、`Stop`、`Notification`、`SubagentStart`、`SubagentStop`、`PreCompact`、`ConfigChange`、`TeammateIdle`、`TaskCompleted`、`WorktreeCreate`、`WorktreeRemove`。[@ref-continue-src-hooks-events]

每个事件的负载类型（`PreToolUseInput`、`SessionStartInput` 等）在同一文件里逐一定义，因此「在操作的哪个时点触发」可以从负载字段推断，例如 `SessionStart` 带 `source`（`startup`/`resume`/`clear`/`compact`），`SessionEnd` 带 `reason`（`clear`/`logout`/`prompt_input_exit`/`other`/`bypass_permissions_disabled`），`PreCompact` 带 `trigger`（`manual`/`auto`）。[@ref-continue-src-hooks-input][@ref-continue-src-hooks-events]

## 配置位置、字段、matcher 与生效条件 {#hooks-entry}

**文件位置**（按从低到高的覆盖顺序，全部是 JSON 文件，只读其中的 `hooks` 部分）：[@ref-continue-src-hooks-paths]

1. `~/.claude/settings.json`
2. `{continueHome}/settings.json`（`continueHome` 受 `CONTINUE_GLOBAL_DIR` 影响，默认 `~/.continue`）
3. `{cwd}/.claude/settings.json`
4. `{cwd}/.continue/settings.json`
5. `{cwd}/.claude/settings.local.json`
6. `{cwd}/.continue/settings.local.json`

**合并规则是「追加而不是覆盖」**：同名事件的 matcher 组按文件顺序依次拼接，所有来源的 hook 都会运行——源码注释明确说这是照 Claude Code 的行为。[@ref-continue-src-hooks-merge] 文件不存在或 JSON 解析失败只记一条 warn 并跳过该文件。[@ref-continue-src-hooks-load]

**配置结构**：`hooks` 是「事件名 → matcher 组数组」，每个组是 `{matcher?, hooks: [...]}`。`disableAllHooks` 是与 `hooks` 平级的布尔字段，任一份设置文件把它设为 `true`，整个 hooks 系统停用；`description` 是插件级描述字段。[@ref-continue-src-hooks-settings]

**matcher** 是正则字符串，匹配对象由事件决定：`PreToolUse`/`PostToolUse`/`PostToolUseFailure`/`PermissionRequest` 匹配 `tool_name`，`SessionStart` 匹配 `source`，`SessionEnd` 匹配 `reason`，`Notification` 匹配 `notification_type`，`SubagentStart`/`SubagentStop` 匹配 `agent_type`，`PreCompact` 匹配 `trigger`，`ConfigChange` 匹配 `source`；`UserPromptSubmit`、`Stop`、`TeammateIdle`、`TaskCompleted`、`WorktreeCreate`、`WorktreeRemove` 不支持 matcher，永远全量触发。[@ref-continue-src-hooks-matchers]

匹配逻辑：`matcher` 省略、空串或 `*` 视为全匹配；否则用 `new RegExp(matcher)` 去 test 对应字段；正则非法时记 warn 并当作**不匹配**（不会因此让整条链路失败）。[@ref-continue-src-hooks-match]

**四种回调类型**：[@ref-continue-src-hooks-handlers]

| 类型 | 必填字段 | 可选字段 | 超时默认值 | 当前实现状态 |
| :-- | :-- | :-- | :-- | :-- |
| `command` | `command` | `args`（无）、`async`、`timeout`、`statusMessage`、`once` | 600 秒 | 已实现 |
| `http` | `url` | `headers`、`allowedEnvVars`、`timeout`、`statusMessage`、`once` | 30 秒 | 已实现 |
| `prompt` | `prompt` | `model`、`timeout`（文档标注默认 30 秒） | 标注 30 秒 | **未实现**：执行器直接跳过并记一条 debug 日志 |
| `agent` | `prompt` | `model`、`timeout`（标注默认 60 秒） | 标注 60 秒 | **未实现**：同 `prompt` |

类型定义里 `timeout` 的注释给出「command 600 / http、prompt 30 / agent 60」的默认值；源码常量只固化了 `command=600` 与 `http=30` 两个。[@ref-continue-src-hooks-handlers][@ref-continue-src-hooks-timeouts][@ref-continue-src-hooks-unimpl]

**最小可用配置**（结构与字段来自 `HookSettingsFile`/`HookMatcherGroup` 与路径表；写入任一份上面列出的 settings 文件即可）：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "./scripts/check-bash.sh", "timeout": 30 }
        ]
      }
    ]
  }
}
```

**生效条件**：`HookService` 在服务容器启动时初始化，读取并合并全部设置文件，把结果缓存在服务状态里；`fireEvent` 在「已停用」或「配置为空」时立即返回空结果（不执行任何回调）。回调本身抛错也被吞掉（记 warn 后返回空结果），设计上不让 hook 失败打断主流程。[@ref-continue-src-hookservice-init][@ref-continue-src-hookservice-fire]

**缺口**：固定来源没有任何项目信任、权限或沙箱判定参与 hook 的加载与执行——只要设置文件里写了、且没被 `disableAllHooks` 关掉，就会被加载。是否存在「首次运行需要批准」的交互不在本轮证据范围内。[@ref-continue-src-hookservice-init]

## 回调收到什么、能返回什么 {#hooks-io}

**输入**：每次事件构造一个 JSON 对象，公共字段是 `session_id`、`transcript_path`、`cwd`、可选的 `permission_mode`，再加上该事件特有的字段。命令类 hook 从 **stdin** 收到这份 JSON（写完即关闭 stdin）；HTTP 类 hook 收到的是同构 JSON 作为 **POST body**。[@ref-continue-src-hooks-input][@ref-continue-src-hooks-exec][@ref-continue-src-hooks-http]

各组输入字段举例：`PreToolUse` 有 `tool_name`、`tool_input`、`tool_use_id`；`PostToolUse` 额外有 `tool_response`；`PostToolUseFailure` 有 `error` 与可选 `is_interrupt`；`UserPromptSubmit` 有 `prompt`；`SessionStart` 有 `source`、可选 `agent_type`、`model`。[@ref-continue-src-hooks-input]

**环境与工作目录**：命令类 hook 用系统 shell 执行（POSIX 下 `/bin/sh -c`，Windows 下 `cmd.exe /c`），工作目录固定为 CLI 的 cwd，环境变量是进程环境再加两个变量：`CLAUDE_PROJECT_DIR` 与 `CONTINUE_PROJECT_DIR`，都等于 cwd。stdout/stderr 的捕获上限是 10MB。[@ref-continue-src-hooks-exec]

**敏感内容**：HTTP 类 hook 的 header 值支持 `${VAR}` / `$VAR` 形式的插值，但只有出现在 `allowedEnvVars` 白名单里的变量才会被替换，未列出的变量一律替换成空串——这是一条显式的防泄漏设计。命令类 hook 则直接继承进程环境。[@ref-continue-src-hooks-http][@ref-continue-src-hooks-exec]

**输出与阻断**：命令类 hook 的 stdout 只要以 `{` 开头就尝试按 JSON 解析成 `HookOutput`；其余情况当作纯文本。判定是否阻断有三条独立路径：[@ref-continue-src-hooks-exec][@ref-continue-src-hooks-output][@ref-continue-src-hooks-aggregate]

| 输出 | 结果 |
| :-- | :-- |
| 退出码 `2` | `blocked = true`，阻断原因取 stderr 文本（空则用 `Blocked by hook`） |
| JSON `decision: "block"` | `blocked = true`，原因取 `output.reason`，回退 stderr |
| `hookSpecificOutput.permissionDecision: "deny"`（`PreToolUse`） | `blocked = true`，原因取 `permissionDecisionReason` |
| `hookSpecificOutput.decision.behavior: "deny"`（`PermissionRequest`） | `blocked = true`，原因取 `decision.message` |
| 其它 | 不阻断，只可能追加上下文 |

`HookOutput` 的完整字段还有 `continue`、`suppressOutput`、`stopReason`、`systemMessage`、`reason`。[@ref-continue-src-hooks-output]

**可修改操作的能力**：`PreToolUse` 的输出可以带 `permissionDecision`（`allow`/`deny`/`ask`）、`permissionDecisionReason` 与 `updatedInput`（改写工具入参）；`PostToolUse` 可以带 `updatedMCPToolOutput`（改写 MCP 工具结果）；`UserPromptSubmit`、`SessionStart`、`PostToolUseFailure`、`Notification`、`SubagentStart` 可以带 `additionalContext`。[@ref-continue-src-hooks-output]

**上下文的注入方式**：所有 hook 的 `additionalContext` 按执行完成顺序拼接（用换行连接）成为事件结果的一个字段；对于 `UserPromptSubmit` 与 `SessionStart`，退出码为 0 且没有 JSON 输出时，stdout 的纯文本本身也会被当作上下文。HTTP 返回非 2xx、连接失败或超时都被视为**非阻断错误**（等价于退出码 1），不会阻断操作。[@ref-continue-src-hooks-aggregate][@ref-continue-src-hooks-http]

## 顺序、并发、去重与失败处理 {#hooks-order}

- **去重**：所有匹配到的 handler 先按「类型 + 关键字段」去重——command 用 `command`、http 用 `url`、prompt/agent 用 `prompt` 文本。同一事件下配置重复写同一条 hook 只会执行一次。[@ref-continue-src-hooks-run]
- **并发**：同步 handler 用 `Promise.all` **并行**执行，不是串行；因此多个 hook 之间没有先后顺序保证，`additionalContext` 的拼接顺序等于实际完成顺序。[@ref-continue-src-hooks-run][@ref-continue-src-hooks-aggregate]
- **异步 hook**：只有 `type: "command"` 且 `async: true` 的 handler 会被当作「发射即忘」，不等待结果、不参与阻断聚合，失败只写一条 warn。[@ref-continue-src-hooks-run][@ref-continue-src-hooks-handlers]
- **阻断判定**：任意一个同步 hook 阻断，事件结果即为阻断，`blockReason` 取**第一个**被遍历到的阻断原因（并行场景下即结果数组里靠前的那个）。[@ref-continue-src-hooks-aggregate]
- **超时**：命令类按 `handler.timeout ?? 600` 秒、HTTP 类按 `handler.timeout ?? 30` 秒。命令类超时由 `execFile` 的 `timeout` 触发（进程被杀，走 error 分支记一条 warn）；HTTP 类用 `AbortController` 中止，超时与连接失败一样按非阻断处理。[@ref-continue-src-hooks-timeouts][@ref-continue-src-hooks-exec][@ref-continue-src-hooks-http]
- **失败处理**：单个 hook 出错不影响其它 hook；`fireEvent` 外层再包一层 try/catch，异常时返回空结果并记 warn。[@ref-continue-src-hookservice-fire]
- **`once` 字段**：类型定义里存在（注释写「runs only once per session then is removed (skills only)」），`HookServiceState` 里也留了 `onceKeys` 集合，但固定源码的执行路径没有消费它——即当前 `once` 不生效。[@ref-continue-src-hooks-handlers][@ref-continue-src-hookservice-init]

## 诊断与重载 {#hooks-diagnostics}

- **启动期确认**：`HookService.doInitialize` 会统计加载到的 handler 数与事件类型数，非空时写一条 debug 日志「Hooks loaded: N handler(s) across M event type(s)」，日志落在 `{continueHome}/logs/cn.log`。这是「hook 配置是否被读到」最直接的入口。[@ref-continue-src-hookservice-init][@ref-continue-src-logger]
- **重载**：`HookService.reloadConfig()` 重新读盘并替换状态，但固定源码里没有调用它的地方，也没有 `/hooks` 之类的斜杠命令；可用的重载方式只有重启会话。[@ref-continue-src-hookservice-reload][@ref-continue-src-slash-handlers]
- **执行期排查**：命令类 hook 的 stdout/stderr 都被捕获进执行结果对象（`stdout`、`stderr`、`exitCode`、`blocked`、`blockReason`），HTTP 类把状态码写进 `stderr` 字段；这些结果只存在于内存中的聚合对象里，源码没有把它们打到日志，因此**没有官方的方式观察某次 hook 的实际输出**。[@ref-continue-src-hooks-exec][@ref-continue-src-hooks-http]
- **类型错误**：未知 handler 类型记一条 warn 后被跳过；`prompt`/`agent` 类型固定跳过。[@ref-continue-src-hooks-unimpl]
- **matcher 写错**：非法正则会以 warn 形式记录 matcher 文本与事件名，且该组永不匹配。[@ref-continue-src-hooks-match]

**缺口（本条是本主题最大的不确定项）**：`fireHook.ts` 提供了一整套发射函数（工具前后、提示提交、会话起止、停止、通知、压缩前等），`HookService.fireEvent` 也把配置、匹配、执行、聚合串好了，但**本提交的 CLI 没有调用它们**：在 `extensions/cli/src` 内检索这些函数名，命中只出现在 `hooks/fireHook.ts` 自身与测试文件里。因此「写一条 PreToolUse hook 会不会真的在工具调用前跑」在本轮固定来源上无法证实，需要在运行期验证；这是 `hooks.events`、`hooks.conditions`、`hooks.diagnostics` 记为 partial 的直接原因。[@ref-continue-src-hooks-firehook][@ref-continue-src-hookservice-fire]
