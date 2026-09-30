---
schema_version: 3
record_kind: production
edition_id: costrict-cli-hooks-v1
harness_id: costrict
topic: hooks
title: "CoStrict CLI（CSC）的 Hooks 机制"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-costrict-hooks-intro, ref-costrict-hooks-events, ref-costrict-hooks-events2]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-costrict-hooks-locations, ref-costrict-hooks-resolve, ref-costrict-hooks-matcher, ref-costrict-hooksguide-intro, ref-costrict-hooksguide-setup, ref-costrict-hooks-common]
  - section_id: hooks-handler
    surface_ids: [cli]
    source_refs: [ref-costrict-hooks-handlers, ref-costrict-hooks-common, ref-costrict-hooks-prompt, ref-costrict-hooks-agent]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-costrict-hooks-input, ref-costrict-hooks-exit, ref-costrict-hooks-exit2, ref-costrict-hooks-json, ref-costrict-hooks-decision]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-costrict-hooks-parallel, ref-costrict-hooks-async, ref-costrict-hooks-handlers, ref-costrict-settings-hooks, ref-costrict-hooks-security, ref-costrict-mcp-headers, ref-costrict-teams-hooks, ref-costrict-agents-hooks, ref-costrict-hooksguide-trouble]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-hooks-debug, ref-costrict-cmd-debug, ref-costrict-cmd-hooks, ref-costrict-hooks-menu, ref-costrict-hooksguide-trouble, ref-costrict-hooks-common, ref-costrict-hooks-disablehooks]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-costrict-hooks-intro, ref-costrict-hooks-events, ref-costrict-hooks-events2]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-costrict-hooks-locations, ref-costrict-hooks-resolve, ref-costrict-hooks-matcher, ref-costrict-hooksguide-intro, ref-costrict-hooksguide-setup, ref-costrict-hooks-common]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-costrict-hooks-input, ref-costrict-hooks-exit, ref-costrict-hooks-exit2, ref-costrict-hooks-json, ref-costrict-hooks-decision]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-costrict-hooks-input, ref-costrict-hooks-exit, ref-costrict-hooks-exit2, ref-costrict-hooks-json, ref-costrict-hooks-decision]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-costrict-hooks-parallel, ref-costrict-hooks-async, ref-costrict-hooks-handlers, ref-costrict-settings-hooks, ref-costrict-hooks-security, ref-costrict-mcp-headers, ref-costrict-teams-hooks, ref-costrict-agents-hooks, ref-costrict-hooksguide-trouble]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-costrict-hooks-parallel, ref-costrict-hooks-async, ref-costrict-hooks-handlers, ref-costrict-settings-hooks, ref-costrict-hooks-security, ref-costrict-mcp-headers, ref-costrict-teams-hooks, ref-costrict-agents-hooks, ref-costrict-hooksguide-trouble]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-costrict-hooks-debug, ref-costrict-cmd-debug, ref-costrict-cmd-hooks, ref-costrict-hooks-menu, ref-costrict-hooksguide-trouble, ref-costrict-hooks-common, ref-costrict-hooks-disablehooks]
---

## 事件与触发时机 {#hooks-events}

本章的固定来源是 CSC 官方文档页 `/csc/reference/hooks`、`/csc/automation/hooks-guide`、`/csc/configuration/settings` 与 `/csc/agent/sub-agents` 的快照，按来源级知识阅读（`version_applicability: unknown`）。

Hooks 是用户定义的 shell 命令、HTTP 端点或 LLM 提示，在 CSC 生命周期的特定点自动执行，用于以确定的方式强制项目规则、自动化重复任务并接入现有工具；需要判断而非确定规则的场景还有基于提示或基于代理的 Hook。[@ref-costrict-hooks-intro]

事件按触发频率分三档：每会话一次（`SessionStart`、`SessionEnd`）、每轮一次（`UserPromptSubmit`、`Stop`、`StopFailure`）、以及智能体循环中的每次工具调用（`PreToolUse`、`PostToolUse`）。完整事件表（该页原文）包括：[@ref-costrict-hooks-events][@ref-costrict-hooks-events2]

| 事件 | 触发时机 |
| :-- | :-- |
| `SessionStart` / `SessionEnd` | 会话开始或恢复 / 会话终止 |
| `UserPromptSubmit` | 提交提示时，在 CSC 处理之前 |
| `PreToolUse` / `PostToolUse` / `PostToolUseFailure` | 工具调用执行前（可阻止）/ 成功之后 / 失败之后 |
| `PermissionRequest` / `PermissionDenied` | 权限对话框出现时 / 工具调用被自动模式分类器拒绝时（可返回 `{retry: true}`） |
| `Notification` | CSC 发送通知时 |
| `SubagentStart` / `SubagentStop` | 子代理被创建 / 完成时 |
| `TaskCreated` / `TaskCompleted` / `TeammateIdle` | 任务创建、标记完成、队友即将空闲时（Agent teams） |
| `Stop` / `StopFailure` | CSC 完成响应时（可阻止停止）/ 轮次因 API 错误结束时（输出与退出码被忽略） |
| `InstructionsLoaded` | AGENTS.md 或 `.costrict/rules/*.md` 被加载时 |
| `ConfigChange` / `CwdChanged` / `FileChanged` | 配置文件变更 / 工作目录变更 / 受监视文件变更时 |
| `WorktreeCreate` / `WorktreeRemove` | git 工作树创建（可替换默认行为）/ 移除时 |
| `PreCompact` / `PostCompact` | 上下文压缩前 / 后 |
| `Elicitation` / `ElicitationResult` | MCP 服务器请求用户输入时 / 用户响应发送回服务器之前 |

## 配置位置、匹配与执行链 {#hooks-entry}

**位置决定作用范围**：[@ref-costrict-hooks-locations]

| 位置 | 作用范围 | 可共享 |
| :-- | :-- | :-- |
| `~/.costrict/settings.json` | 你的所有项目 | 否 |
| `.costrict/settings.json` | 单个项目 | 是，可提交 |
| `.costrict/settings.local.json` | 单个项目 | 否，被 gitignore |
| 托管策略设置 | 组织范围 | 是，由管理员控制 |
| Plugins 的 `hooks/hooks.json` | 插件启用时 | 是 |
| 技能或代理 frontmatter | 组件处于活动状态时 | 是 |

配置有三层嵌套：hook 事件 → 匹配器组（过滤何时触发）→ 一个或多个 hook 处理程序。[@ref-costrict-hooks-resolve]

**匹配器**：`"*"`、`""` 或省略表示匹配所有；只含字母、数字、`_`、`|` 的值按精确字符串或 `|` 分隔的精确列表比较（如 `Bash`、`Edit|Write`）；含其他字符时按 JavaScript 正则处理（如 `^Notebook`、`mcp__memory__.*`）。工具事件（`PreToolUse`、`PostToolUse`、`PostToolUseFailure`、`PermissionRequest`、`PermissionDenied`）按工具名匹配；MCP 工具按 `mcp__〔server〕__〔tool〕` 命名，匹配某服务器的全部工具要写 `mcp__memory__.*`（`.*` 必需，`mcp__memory` 会被当作精确串而不匹配任何工具）。`UserPromptSubmit`、`Stop`、`TeammateIdle`、`TaskCreated`、`TaskCompleted`、`WorktreeCreate`、`WorktreeRemove`、`CwdChanged` 不支持匹配器，写了会被静默忽略。[@ref-costrict-hooks-matcher]

**最小可用配置**来自官方指南：在设置文件的 `hooks` 块里先写事件名，再写匹配器组与处理程序——指南用 `Notification` 事件演示“当 CSC 等待你的输入时收到桌面通知”，把 `hooks` 块加进 `~/.costrict/settings.json`。[@ref-costrict-hooksguide-intro][@ref-costrict-hooksguide-setup]

`if` 字段以权限规则语法做更细的过滤（如 `"Bash(git *)"`、`"Edit(*.ts)"`），只在五个工具事件上求值，其他事件上设置了 `if` 的处理程序永不运行。[@ref-costrict-hooks-common][@ref-costrict-hooks-matcher]

**执行链示例**（该页的 `PreToolUse` 拦截示例）：事件触发 → 匹配器 `"Bash"` 命中 → `if: "Bash(rm *)"` 命中 → 脚本从 stdin 读 JSON 输入 → 脚本输出决策 JSON（或 `exit 0` 放行）→ CSC 按结果阻断或继续。[@ref-costrict-hooks-resolve]

## 处理程序类型与字段 {#hooks-handler}

四种处理程序（`type`）：[@ref-costrict-hooks-handlers]

| 类型 | 行为 |
| :-- | :-- |
| `command` | 运行 shell 命令；从 stdin 接收事件 JSON，用退出码与 stdout 返回结果 |
| `http` | 把事件 JSON 作为 POST 请求体发到 URL；响应体使用与命令 Hook 相同的 JSON 输出格式 |
| `prompt` | 向 CSC 模型发送提示做单轮评估，模型以 JSON 返回是/否决策 |
| `agent` | 生成可读取文件、搜索代码的子代理（最多 50 轮）来验证条件 |

**通用字段**：`type` 必填；`if`（权限规则语法过滤，仅工具事件）；`timeout`（秒，默认：命令 600、提示 30、代理 60）；`statusMessage`（运行时显示的加载消息）；`once`（`true` 时每会话只运行一次，仅限技能）。命令 Hook 另有 `command`（必填）、`async`（后台运行）、`shell`（`bash` 默认或 `powershell`）。HTTP Hook 另有 `url`（必填）、`headers`（值支持 `$VAR`/`${VAR}` 插值，且只解析 `allowedEnvVars` 中列出的变量）、`allowedEnvVars`（任何插值都必须列在这里）。提示与代理 Hook 另有 `prompt`（必填，`$ARGUMENTS` 作为输入 JSON 的占位符）与 `model`（默认快速模型）。[@ref-costrict-hooks-common]

**路径变量**：`$CLAUDE_PROJECT_DIR`（项目根目录，含空格路径要用引号）、`${CLAUDE_PLUGIN_ROOT}`（插件安装目录，每次更新都会变）、`${CLAUDE_PLUGIN_DATA}`（跨插件更新保留的持久目录）。命令 Hook 有 `$CLAUDE_CODE_REMOTE`（远程 Web 环境中为 `"true"`，本地 CLI 未设置）。[@ref-costrict-hooks-prompt]

**提示 Hook 的响应契约**：模型必须返回 `{"ok": true|false, "reason": "..."}`，`ok` 为 `false` 时 `reason` 必填并向 CSC 显示。代理 Hook 使用相同契约，只是默认超时更长（60 秒）且可多轮调用工具。[@ref-costrict-hooks-prompt][@ref-costrict-hooks-agent]

## 输入、退出码与 JSON 输出 {#hooks-io}

**通用输入字段**（命令 Hook 经 stdin、HTTP Hook 经 POST 体）：`session_id`、`transcript_path`、`cwd`、`permission_mode`（`"default"`/`"plan"`/`"acceptEdits"`/`"auto"`/`"dontAsk"`/`"bypassPermissions"`）、`hook_event_name`；工具事件另有 `tool_name` 与 `tool_input`。在 `--agent` 会话或子代理内部还会包含 `agent_id` 与 `agent_type`。[@ref-costrict-hooks-input]

**退出码**：`0` 成功（CSC 解析 stdout 中的 JSON，JSON 仅在退出码 0 时处理；多数事件的 stdout 只写入调试日志，例外是 `UserPromptSubmit` 与 `SessionStart`，其 stdout 会作为上下文加入）；`2` 阻塞错误（忽略 stdout，stderr 作为错误反馈给 CSC，效果随事件而定）；其他退出码是非阻塞错误，记录中显示 "〔hook name〕 hook error" 加 stderr 第一行。注意退出码 1 不会阻止操作，要强制策略必须用 `exit 2`；`WorktreeCreate` 是例外——任何非零退出码都会中止工作树创建。[@ref-costrict-hooks-exit]

**按事件的退出码 2 行为**（可否阻止）：`PreToolUse` 阻止工具调用、`PermissionRequest` 拒绝权限、`UserPromptSubmit` 阻止并清除提示、`Stop` 阻止 CSC 停止、`SubagentStop` 阻止子代理停止、`TeammateIdle` 阻止队友空闲、`TaskCreated` 回滚创建、`TaskCompleted` 阻止完成、`ConfigChange` 阻止配置变更生效（`policy_settings` 除外）、`Elicitation` 拒绝请求、`ElicitationResult` 阻止响应（变为拒绝）。不可阻止的事件（`PostToolUse`、`PostToolUseFailure`、`Notification`、`SessionStart`、`SessionEnd`、`PreCompact`、`PostCompact`、`CwdChanged`、`FileChanged`、`InstructionsLoaded` 等）只向用户显示 stderr 或忽略输出。[@ref-costrict-hooks-exit2]

**JSON 输出**：必须只选择一种信令方式——要么只用退出码，要么退出码 0 并打印 JSON（退出码 2 时 JSON 被忽略）。通用字段包括 `continue`（默认 `true`，`false` 时 CSC 完全停止处理，优先于事件特定决策）、`stopReason`（向用户显示的消息）、`suppressOutput`、`systemMessage`。事件特定控制：`decision: "block"`+`reason`（`UserPromptSubmit`、`PostToolUse`、`PostToolUseFailure`、`Stop`、`SubagentStop`、`ConfigChange`）；`hookSpecificOutput.permissionDecision`（`allow`/`deny`/`ask`/`defer`）与 `permissionDecisionReason`（`PreToolUse`）；`hookSpecificOutput.decision.behavior`（`PermissionRequest`）；`hookSpecificOutput.retry`（`PermissionDenied`）；`hookSpecificOutput.worktreePath`（`WorktreeCreate`）；`hookSpecificOutput.action`/`content`（`Elicitation`/`ElicitationResult`）。注入上下文中的 Hook 输出（`additionalContext`、`systemMessage` 或纯 stdout）上限为 10,000 字符，超出部分写入文件并以预览加路径替换。[@ref-costrict-hooks-json][@ref-costrict-hooks-decision]

## 顺序、异步与生效条件 {#hooks-order-conditions}

- **并发与去重**：所有匹配的 Hook 并行运行，相同处理程序自动去重（命令按命令字符串、HTTP 按 URL），处理程序在当前目录中以 CSC 的环境运行。[@ref-costrict-hooks-parallel]
- **异步 Hook**：命令 Hook 可设 `"async": true` 在后台运行而不阻塞；异步 Hook 无法阻止操作或返回决策（触发时操作已继续），输出在下一个对话轮次传递，每次触发都创建独立后台进程且不去重；`timeout` 设置后台进程最大时间，未设置时与同步 Hook 相同的 10 分钟默认值。完成通知默认被抑制，可用 `Ctrl+O` 开启详细模式或 `--verbose` 查看。仅 `type: "command"` 支持 `async`。[@ref-costrict-hooks-async]
- **HTTP 错误语义**：非 2xx 响应、连接失败与超时都是非阻塞错误，执行继续；要阻断必须返回 2xx 且响应体带有决策字段。[@ref-costrict-hooks-handlers]
- **企业管控**：`allowManagedHooksOnly`（仅托管设置可配）为 `true` 时只加载托管 Hook、SDK Hook 以及在托管设置 `enabledPlugins` 中强制启用的插件 Hook，其余用户/项目/插件 Hook 全部被阻止；`allowedHttpHookUrls` 与 `httpHookAllowedEnvVars` 限制 HTTP Hook 的目标 URL（支持 `*` 通配）与可插入的环境变量（每个 Hook 的有效列表是自身列表与该设置的交集），二者可在任何设置层配置并跨来源合并；`disableAllHooks` 禁用所有 Hook 与自定义状态行，但托管级别的 Hook 只能由托管设置中的 `disableAllHooks` 禁用。[@ref-costrict-settings-hooks]
- **信任边界**：命令 Hook 以你的系统用户完整权限执行 shell，可以修改、删除或访问你的用户账户可访问的任何文件；官方建议校验输入、引用 shell 变量、阻止路径遍历、使用绝对路径并跳过 `.env`、`.git/` 等敏感文件。[@ref-costrict-hooks-security] MCP 连接头的 `headersHelper` 同样执行任意 shell 命令，在项目或本地作用域中定义时需先接受工作区信任对话框才运行。[@ref-costrict-mcp-headers]
- **Agent teams 质量门**：`TeammateIdle`、`TaskCreated`、`TaskCompleted` 可用退出码 2 发送反馈、阻止创建或阻止完成。[@ref-costrict-teams-hooks]
- **子代理 Hook**：子代理 frontmatter 中的 Hook 仅在该子代理活跃时运行，支持全部事件；项目 `settings.json` 中另有 `SubagentStart`/`SubagentStop`。[@ref-costrict-agents-hooks]

- **与权限模式的相互作用**：`PreToolUse` Hook 在任何权限模式检查**之前**触发，返回 `permissionDecision: "deny"` 的 Hook 即使在使用 `bypassPermissions` 模式或 `--dangerously-skip-permissions` 时也会阻止工具调用；反过来不成立——返回 `"allow"` 的 Hook 不会绕过设置中的拒绝规则。Hook 只能加强限制，不能放宽到超出权限规则允许的范围。多个 `PreToolUse` Hook 用 `updatedInput` 重写同一工具参数时，最后完成的一个生效，顺序不确定。另外 `PermissionRequest` Hook 不在非交互模式（`-p`）中触发，该场景应改用 `PreToolUse`。[@ref-costrict-hooksguide-trouble]

## 诊断 {#hooks-diagnostics}

- Hook 执行详情（哪些 Hook 匹配、退出码、完整 stdout/stderr）写入调试日志：用 `csc --debug-file 〔path〕` 写到已知位置，或运行 `csc --debug` 后读取 `~/.costrict/debug/〔session-id〕.txt`（`--debug` 不打印到终端）；日志形如 `[DEBUG] Executing hooks for PostToolUse:Write`。更细的匹配信息可设 `CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose`。[@ref-costrict-hooks-debug]
- `/debug` 从当前时刻开始捕获日志（可选择描述问题以聚焦分析），适合复现 Hook 行为时配合使用。[@ref-costrict-cmd-debug]
- 会话内用 `/hooks` 打开**只读**的 Hook 浏览器（命令参考对它的描述是“查看工具事件的钩子配置”）：菜单显示每个事件及其已配置 Hook 的计数，可深入查看匹配器与每个处理程序的完整信息（事件、匹配器、类型、来源文件与命令/提示/URL）[@ref-costrict-cmd-hooks]，用于确认 Hook 来自哪个设置文件；菜单本身不能编辑，仍要直接改设置 JSON。`/hooks` 菜单列出的来源包括 User、Project、Local、Plugin、Session 与 Built-in。[@ref-costrict-hooks-menu]
- 常见故障来源：脚本不可执行或缺 shebang（插件 Hook 用 `${CLAUDE_PLUGIN_ROOT}` 引用并 `chmod +x`）、事件名大小写不符、`matcher` 与工具不匹配、Hook 类型拼写错误；设置了 `if` 的事件如果不是工具事件，该处理程序永不运行。[@ref-costrict-hooksguide-trouble][@ref-costrict-hooks-common]

**禁用与生效**：要临时禁用全部 Hook 可在设置文件写 `"disableAllHooks": true`（无法在保留配置的同时只禁用单个 Hook），移除则删除条目；`disableAllHooks` 遵循托管设置层级——用户/项目/本地设置中的 `disableAllHooks` 无法禁用托管策略配置的 Hook，只有托管级别设置的值才能禁用它们。对设置文件的直接编辑通常由文件监视器自动检测。[@ref-costrict-hooks-disablehooks]
