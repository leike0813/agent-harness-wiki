---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-hooks-v1
harness_id: kimi-code
topic: hooks
title: "Kimi Code CLI 的 Hook：事件、配置、输入输出、并发与诊断"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-kimi-code-hooks-how, ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-schema, ref-kimi-code-hooks-doc, ref-kimi-code-plugins-hooks]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-kimi-code-hooks-events, ref-kimi-code-src-hooks-events, ref-kimi-code-hooks-return]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-kimi-code-hooks-input, ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-match, ref-kimi-code-hooks-return, ref-kimi-code-hooks-doc, ref-kimi-code-config-permission]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-match, ref-kimi-code-plugins-hooks]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-kimi-code-plugins-hooks, ref-kimi-code-hooks-doc, ref-kimi-code-plugins-security, ref-kimi-code-config-permission, ref-kimi-code-hooks-events]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-hooks-config, ref-kimi-code-slash-info, ref-kimi-code-hooks-return, ref-kimi-code-config-watch, ref-kimi-code-slash-session, ref-kimi-code-env-logs, ref-kimi-code-src-hooks-match, ref-kimi-code-hooks-events, ref-kimi-code-config-permission]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-kimi-code-hooks-events, ref-kimi-code-src-hooks-events, ref-kimi-code-hooks-return]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-kimi-code-hooks-how, ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-schema, ref-kimi-code-hooks-doc, ref-kimi-code-plugins-hooks]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-kimi-code-hooks-input, ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-match, ref-kimi-code-hooks-return, ref-kimi-code-hooks-doc, ref-kimi-code-config-permission]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-kimi-code-hooks-input, ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-match, ref-kimi-code-hooks-return, ref-kimi-code-hooks-doc, ref-kimi-code-config-permission]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-kimi-code-hooks-config, ref-kimi-code-src-hooks-match, ref-kimi-code-plugins-hooks]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-kimi-code-plugins-hooks, ref-kimi-code-hooks-doc, ref-kimi-code-plugins-security, ref-kimi-code-config-permission, ref-kimi-code-hooks-events]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-hooks-config, ref-kimi-code-slash-info, ref-kimi-code-hooks-return, ref-kimi-code-config-watch, ref-kimi-code-slash-session, ref-kimi-code-env-logs, ref-kimi-code-src-hooks-match, ref-kimi-code-hooks-events, ref-kimi-code-config-permission]
---

Hook 是「当 X 发生时运行这个脚本」的自动触发机制：脚本在本机运行，你可以在里面写任意逻辑。典型用途是安全拦截（在执行 shell 命令前检查危险操作并阻止）、桌面通知（后台任务完成时提醒）、以及自动补充上下文（每次用户提交消息时附加当前 Git 分支等信息）[@ref-kimi-code-hooks-doc]。本章固定来源是固定 commit 上的 `docs/en/customization/hooks.md`、`config-files.md`、`plugins.md` 与 `packages/agent-core-v2/src/features/externalHooks`。

## 配置位置与字段 {#hooks-entry}

配置一条规则要说明三件事——在哪个事件触发、匹配哪些目标、运行哪个脚本；触发时 CLI 把事件细节打包成 JSON 从标准输入交给脚本，脚本读到信息后决定如何响应，响应由退出码与标准输出共同表达 [@ref-kimi-code-hooks-how]。

所有 hook 规则写在 `~/.kimi-code/config.toml`（或 `$KIMI_CODE_HOME/config.toml`）的 `[[hooks]]` 数组里，每个条目是一条规则 [@ref-kimi-code-hooks-config]：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `event` | string | 是 | 触发事件名，必须是事件参考表中列出的值之一 |
| `matcher` | string | 否 | 过滤事件目标的正则表达式；省略则匹配全部 |
| `command` | string | 是 | 触发时运行的 shell 命令 |
| `timeout` | integer | 否 | 超时秒数，范围 1–600，默认 30 秒 |

- `[[hooks]]` 只允许这四个字段，多写字段会导致整个配置文件加载失败 [@ref-kimi-code-hooks-config]。源码用严格（strict）schema 校验同一组字段与取值范围（`timeout` 为 1–600 的整数）[@ref-kimi-code-src-hooks-schema]。
- 最小示例（来自 `docs/en/customization/hooks.md` 的 Quick Start）：后台任务状态变化时在终端标题栏闪一条通知 [@ref-kimi-code-hooks-doc]。

```toml
# 依据 customization/hooks.md 的 Quick Start: A Minimal Hook
[[hooks]]
event = "Notification"
matcher = "task\\.completed"
command = "terminal-notifier -title Kimi -message 'Task done'"
```

- 插件也能声明 hook：清单 `hooks` 数组使用与 `[[hooks]]` 相同的字段，在该插件启用期间生效；禁用插件即停止其 hook。插件 hook 的工作目录是插件根目录，因此 `command` 可以用插件内的相对路径，并且进程会多拿到 `KIMI_CODE_HOME` 与 `KIMI_PLUGIN_ROOT` 两个环境变量。安装插件本身不会运行 hook，只有匹配事件在插件启用时发生才触发 [@ref-kimi-code-plugins-hooks]。
- 因此「同名事件」有两种来源：全局 `[[hooks]]` 规则与启用插件的清单 hook，二者走同一套执行机制 [@ref-kimi-code-plugins-hooks]。

## 事件与时点 {#hooks-events}

第一方事件共 20 个，触发时点如下（`matcher` 匹配的对象也一并列出）[@ref-kimi-code-hooks-events]：

| 事件 | matcher 匹配 | 可阻断 | 时点 |
| --- | --- | --- | --- |
| `UserPromptSubmit` | 用户提交的文本 | 是 | 用户发消息时；返回文本追加进上下文，阻断则跳过本回合的模型调用 |
| `UserPromptQueued` | 排队中的提示文本 | — | 回合仍在运行时排队新消息；载荷含 `prompt_id`、`prompt`、`queue_length` |
| `PreToolUse` | 工具名 | 是 | 工具调用前（权限检查之前）；阻断则不执行该工具 |
| `Stop` | 空串 | 是 | 模型即将结束回合时；阻断可追加消息让模型继续 |
| `TurnStarted` | 回合来源种类（`user`、`task`、`system_trigger` 等） | — | 新回合开始时；载荷含 `turn_id`、`origin_kind`、`origin_name`、`prompt` |
| `PostToolUse` | 工具名 | — | 工具成功执行后 |
| `PostToolUseFailure` | 工具名 | — | 工具失败或被阻断后 |
| `PermissionRequest` | 工具名 | — | 等待用户批准之前 |
| `PermissionResult` | 工具名 | — | 批准流程结束后 |
| `SessionStart` | `startup` 或 `resume` | — | 会话启动或恢复后；载荷含 `source`、`model`、`profile` |
| `SessionEnd` | `exit` 或 `archive` | — | 会话关闭后；`archive` 表示被归档而不是退出 |
| `SessionHeartbeat` | 空串 | — | 会话存活期间每 60 秒一次；只有配置了该事件才会启动计时器；载荷含 `uptime_ms` |
| `SubagentStart` / `SubagentStop` | 子 Agent 名 | — | 子 Agent 开始运行前 / 成功完成后 |
| `TaskStarted` | 任务种类（`agent`、`process`、`question`） | — | 后台任务开始时；载荷含 `task_id`、`description`、`detached` |
| `StopFailure` | 错误类型 | — | 当前回合因错误失败后 |
| `Interrupt` | 空串 | — | 用户打断回合时（如按 Esc）；超时或程序化中止不触发；替代 `Stop` 触发；载荷含 `reason` |
| `PreCompact` / `PostCompact` | `manual` 或 `auto` | — | 上下文压缩开始前 / 完成后；`PreCompact` 的返回值被完全忽略 |
| `Notification` | 通知类型（如 `task.completed`） | — | 后台任务状态变化时 |

源码中的事件枚举与上表一致，作为该列表在固定 commit 上的实现依据 [@ref-kimi-code-src-hooks-events]。只有**可阻断事件**（`PreToolUse`、`Stop`、`UserPromptSubmit`）的返回值会影响主流程，其余都是观察型事件：触发后即返回，脚本返回什么都影响不到主流程 [@ref-kimi-code-hooks-return]。

## 输入与输出 {#hooks-io}

每次触发时，CLI 把事件细节打包成 JSON 通过 **stdin** 交给脚本；基础字段如下（字段名一律 snake_case）[@ref-kimi-code-hooks-input]：

```json
{
  "hook_event_name": "PreToolUse",
  "session_id": "session_abc",
  "session_title": "Fix the login page",
  "client_type": "kimi_code_cli",
  "cwd": "/path/to/project"
}
```

- 具体事件会附加额外字段（例如工具名与命令内容）；工作目录是当前会话的项目目录 [@ref-kimi-code-hooks-input] [@ref-kimi-code-hooks-config]。
- 实现上，事件参数与基础字段在发送前统一转成 snake_case 键名，脚本看到的键名与实际事件字段一一对应 [@ref-kimi-code-src-hooks-match]。
- 关于敏感内容：固定来源没有为 hook 载荷单独规定脱敏规则，文档只在会话记录一节提醒 prompt、命令输出、路径与凭据痕迹都需要在分享前处理；hook 脚本会把同样的信息读进自己的进程，因此敏感数据由脚本自行处理 [@ref-kimi-code-hooks-input]。
- 返回值由两件事决定 [@ref-kimi-code-hooks-return]：

| 退出码 | 含义 | CLI 行为 |
| --- | --- | --- |
| `0` | 正常退出，允许 | 继续执行；stdout 内容（如有）可能追加进上下文 |
| `2` | 有意阻断 | 停止当前操作；stderr（脚本用 `console.error` 输出）作为阻断原因 |
| 其他非零 | 脚本出错 | 默认允许（fail-open） |
| 超时或崩溃 | 脚本异常 | 默认允许（fail-open） |

- 脚本也可以往 stdout 写 JSON 对象来阻断：`hookSpecificOutput.permissionDecision` 取 `deny`，并用 `permissionDecisionReason` 给出理由；只有可阻断事件的返回值会影响主流程 [@ref-kimi-code-hooks-return]。
- 脚本报错或超时都不会中断你的工作，这种「失败即允许」的设计叫 fail-open。正因如此，hook 适合做提醒与轻量拦截，不应作为唯一的安全屏障；高风险操作仍应依赖权限审批与人工确认 [@ref-kimi-code-hooks-doc] [@ref-kimi-code-config-permission]。
- 阻断后，CLI 会把阻断原因写回上下文，模型据此选择更安全的替代方案 [@ref-kimi-code-hooks-return]。

一条完整的阻断示例（配置来自 `customization/hooks.md` 的示例小节，脚本按同一节的返回值规则编写——读到 `tool_input.command`，命中危险命令时往 stderr 写明原因并以退出码 2 阻断）：

```toml
# 依据 customization/hooks.md 的 Example: Blocking Dangerous Shell Commands
[[hooks]]
event = "PreToolUse"
matcher = "Bash"
command = "node ~/.kimi-code/hooks/block-dangerous-bash.mjs"
timeout = 5
```

```js
// block-dangerous-bash.mjs
let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  const payload = JSON.parse(input);
  const command = payload.tool_input?.command ?? '';
  if (command.includes('rm -rf')) {
    console.error('Dangerous command detected, blocked');
    process.exit(2);
  }
});
```

该示例只演示阻断机制，不是生产级安全解析器；真实场景更适合白名单或专用 shell 解析器（处理引号、变量展开与多命令串联）[@ref-kimi-code-hooks-return] [@ref-kimi-code-hooks-doc]。

## 多规则顺序、并发与超时 {#hooks-order}

- 同一事件有多个规则匹配时，所有匹配的 hook **并行**运行；`command` 完全相同的多条规则只运行一次 [@ref-kimi-code-hooks-config]。
- 实现上的匹配与去重：先按事件取候选规则，再用 `matcher` 作为正则测试事件目标（正则非法或不匹配即跳过），然后按「工作目录 + 命令」去重，最后用并发调度把命中的 hook 一起执行 [@ref-kimi-code-src-hooks-match]。
- 阻断语义是「任一命中即阻断，取第一个阻断结果的 reason 作为原因」，没有提前终止其他并发脚本的文档化行为 [@ref-kimi-code-src-hooks-match]。
- 超时：默认 30 秒（`DEFAULT_HOOK_TIMEOUT_SECONDS`），单条规则可用 `timeout` 在 1–600 秒内调整；超时先发信号给进程组让脚本清理，再强制终止（非 Windows 平台 hook 在独立进程组中运行）[@ref-kimi-code-src-hooks-match] [@ref-kimi-code-hooks-config]。
- 重复触发与缓存：固定来源没有描述 hook 结果的缓存或去重窗口（同一次事件内按命令去重是唯一被证实的去重规则）[@ref-kimi-code-hooks-config]。
- hook 命令的工作目录是当前会话的项目目录；插件 hook 的工作目录是插件根目录 [@ref-kimi-code-hooks-config] [@ref-kimi-code-plugins-hooks]。

## 生效条件 {#hooks-conditions}

- 全局 `[[hooks]]` 在配置文件加载后生效；插件 hook 只在插件处于启用状态时生效，禁用插件即停止其 hook [@ref-kimi-code-plugins-hooks]。
- hook 是「有副作用的本机脚本执行」，因此不受工作区信任提示的保护范围约束；固定来源在安全说明中把它与权限审批并列比较，明确 hook 不应作为唯一屏障 [@ref-kimi-code-hooks-doc]。
- 插件 hook 的作用域被限制在插件根目录：清单里 `command` 与 `cwd` 必须落在插件根内，否则该 server/条目被忽略，这类问题会出现在插件诊断里 [@ref-kimi-code-plugins-security]。
- 权限与沙箱：固定来源没有给出针对 hook 进程的权限、沙箱或信任开关；`[permission]` 的 `dangerous_command_guard` 等开关作用于 Agent 的工具调用，而不是 hook 脚本 [@ref-kimi-code-config-permission]。
- 事件级条件：`SessionHeartbeat` 只有在配置了该事件时才启动 60 秒计时器，未配置就完全不触发 [@ref-kimi-code-hooks-events]。

## 诊断与重载 {#hooks-diagnostics}

- 配置是否合法：`kimi doctor`（或 `kimi doctor config [path]`）在不启动 TUI、不修改文件的前提下校验 `config.toml`；`[[hooks]]` 写了这四个之外的字段会导致配置加载失败，因此这类错误会在启动与 doctor 检查中暴露。文件合法或被跳过时退出码 `0`，缺失或非法时退出码 `1` [@ref-kimi-code-cmd-doctor] [@ref-kimi-code-hooks-config]。
- 执行是否发生：可观察的直接效果是脚本自身的副作用（终端通知、文件写入等）。固定来源没有提供「列出已注册 hook 与最近触发记录」的命令，hook 触发与结果不进入 `/mcp`、`/status` 这类会话状态视图 [@ref-kimi-code-slash-info]。
- 失败处理与可见性：脚本非零退出、超时或崩溃都按 fail-open 处理（默认允许），阻断时把 stderr 文本或 JSON 的 `permissionDecisionReason` 作为原因写回上下文，因此「hook 有没有生效」通常通过上下文中的阻断原因或脚本副作用来确认 [@ref-kimi-code-hooks-return]。
- 配置修改何时生效：`watch`（默认开启）会监视 `config.toml` 等文件；`/reload` 重新加载当前会话并应用最新的 `config.toml` 与 `tui.toml`，`/new` 新建会话同样会重读配置。把 `watch` 设为 `false` 后，改动要到重启才生效 [@ref-kimi-code-config-watch] [@ref-kimi-code-slash-session]。
- 日志：全局诊断日志为 `~/.kimi-code/logs/kimi-code.log`，日志级别与滚动由 `KIMI_LOG_LEVEL` 等在进程启动时读取一次 [@ref-kimi-code-env-logs]。
- 缺口：固定来源没有描述 hook 专属的调试入口（例如列出匹配到的规则、显示脚本 stdout/stderr 历史或超时统计）；需要排查时只能依赖脚本自身输出、阻断原因回写与日志文件 [@ref-kimi-code-hooks-return]。
- 排查顺序建议：① 用 `kimi doctor` 确认 `config.toml` 能被解析（多余字段会让整个文件加载失败）→ ② 确认 `event` 拼写落在事件参考表内、`matcher` 是合法正则（非法正则按不匹配处理）→ ③ 确认命令在本机可直接运行、路径与实际工作目录一致 → ④ 用退出码与 stderr 验证是否命中阻断分支 → ⑤ 需要重载时用 `/reload` 或 `/new` [@ref-kimi-code-cmd-doctor] [@ref-kimi-code-src-hooks-match] [@ref-kimi-code-hooks-return] [@ref-kimi-code-slash-session]。
- 与其它机制的分工：需要「一定阻止」的操作应由权限审批与人工确认保证；hook 阻断发生在 `PreToolUse`（权限检查之前），适合提醒与轻量拦截 [@ref-kimi-code-hooks-events] [@ref-kimi-code-config-permission]。
