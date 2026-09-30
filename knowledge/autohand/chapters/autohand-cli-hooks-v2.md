---
schema_version: 3
record_kind: production
edition_id: autohand-cli-hooks-v2
harness_id: autohand
topic: hooks
title: "Autohand Code CLI 的 Hook 事件、输入输出与执行顺序"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-events, ref-autohand-docs-hooksr-events, ref-autohand-docs-hooks-categories, ref-autohand-hooks-manage, ref-autohand-docs-extapi-surfaces, ref-autohand-hooks-legacy]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-hooks-config, ref-autohand-hooks-props, ref-autohand-config-hooks, ref-autohand-docs-hooks-options, ref-autohand-hooks-matcher, ref-autohand-config-overlays, ref-autohand-hooks-workspace-trust, ref-autohand-hooks-legacy, ref-autohand-docs-hooks-what, ref-autohand-hooks-config]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-env, ref-autohand-docs-hooksr-events, ref-autohand-hooks-json, ref-autohand-docs-hooks-vars, ref-autohand-hooks-legacy, ref-autohand-docs-hooksr-debug]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-control, ref-autohand-hooks-exit, ref-autohand-config-hooks, ref-autohand-src-hook-order, ref-autohand-docs-hooksr-advanced, ref-autohand-hooks-props, ref-autohand-hooks-workspace-trust, ref-autohand-src-workspace-trust, ref-autohand-docs-extapi-runtime, ref-autohand-config-multiagent, ref-autohand-docs-hooksr-exit]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-manage, ref-autohand-docs-hooksr-debug, ref-autohand-hooks-builtin]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-autohand-hooks-events, ref-autohand-docs-hooksr-events, ref-autohand-docs-hooks-categories, ref-autohand-hooks-legacy]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-autohand-docs-hooks-config, ref-autohand-hooks-props, ref-autohand-config-hooks, ref-autohand-config-overlays, ref-autohand-hooks-workspace-trust, ref-autohand-docs-hooks-what, ref-autohand-hooks-config]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-autohand-hooks-env, ref-autohand-hooks-json, ref-autohand-docs-hooks-vars]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-autohand-hooks-control, ref-autohand-hooks-exit, ref-autohand-config-hooks, ref-autohand-docs-hooksr-exit]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-autohand-src-hook-order, ref-autohand-docs-hooksr-advanced, ref-autohand-hooks-props]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-autohand-config-hooks, ref-autohand-hooks-workspace-trust, ref-autohand-src-workspace-trust, ref-autohand-docs-extapi-runtime, ref-autohand-config-multiagent]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-autohand-hooks-manage, ref-autohand-docs-hooksr-debug, ref-autohand-hooks-builtin]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的 hooks 文档与 `src/core/HookManager.ts` 源码，以及官方文档站 Hooks and Events 与 Hooks Reference 页面。固定问题只针对 `cli` 界面回答。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 第一方事件 {#hooks-events}

Hook 在事件触发时执行 shell 命令；事件覆盖会话、提示与回合、工具、文件、权限与通知、限流与错误、auto-mode、auto-research、子代理与团队、review、模式与上下文等生命周期。仓库文档给出完整事件表，例如 `pre-tool`（工具执行前）、`post-tool`（工具完成后）、`file-modified`（文件创建/修改/删除）、`pre-prompt`、`stop`（回合结束，`post-response` 为其兼容别名）、`session-start`、`session-end`、`pre-clear`、`session-error`、`rate-limit`、`permission-request`、`permission-denied`、`notification`、`subagent-start`/`subagent-stop`、`automode:*`、`autoresearch:*`、`team-created`/`teammate-spawned`/`task-assigned`/`task-completed`/`team-shutdown`、`review:*`、`mode-change`、`context:*`。[@ref-autohand-hooks-events][@ref-autohand-docs-hooksr-events]

官方文档站按类别汇总常见事件并链接到完整目录（Hooks Reference 的 Hook events 小节）。[@ref-autohand-docs-hooks-categories][@ref-autohand-docs-hooksr-events]

同名事件的另一来源：**运行时扩展**通过 `api.hooks.on(event, handler)` 注册生命周期处理器，`/hooks` 浏览器会列出这些处理器并标明所属扩展；因此同一事件可能同时有配置式 hook 与扩展 hook。[@ref-autohand-hooks-manage][@ref-autohand-docs-extapi-surfaces]

旧命名仍受支持并会被改写到新事件上：`on_session_start`、`before_tool_call`、`after_tool_call`、`on_file_change`、`on_user_message`、`on_agent_response`、`on_error` 等映射到对应事件，其中部分旧名只在满足条件时触发（如 `on_session_resume` 仅 session type 为 `resume`，`on_tool_error` 仅工具失败）。[@ref-autohand-hooks-legacy]

## 配置入口与字段 {#hooks-entry}

Hook 定义在配置文件的 `hooks.hooks` 数组，每个定义至少含 `event` 与 `command`：[@ref-autohand-docs-hooks-config]

```json
{
  "hooks": {
    "enabled": true,
    "hooks": [
      {
        "event": "file-modified",
        "command": "eslint {{file}} --fix && prettier --write {{file}}",
        "description": "Lint and format changed files",
        "enabled": true,
        "timeout": 5000,
        "async": false,
        "filter": { "path": ["**/*.ts", "**/*.tsx"] }
      }
    ]
  }
}
```

| 字段 | 必填 | 默认 | 说明 |
| --- | --- | --- | --- |
| `event` | 是 | — | 事件名 |
| `command` | 是 | — | 要执行的 shell 命令 |
| `description` | 否 | — | `/hooks` 展示用 |
| `enabled` | 否 | `true` | 单条开关 |
| `timeout` | 否 | `5000` | 毫秒 |
| `async` | 否 | `false` | 后台执行，不阻塞 |
| `matcher` | 否 | — | 正则；匹配对象随事件而异（工具名、session type、通知类型等） |
| `filter` | 否 | — | `tool`（工具名数组）与 `path`（glob 数组） |
| `importedFrom` | 否 | — | 导入功能写入的来源元数据，用于适配与去重 |

[@ref-autohand-hooks-props][@ref-autohand-config-hooks][@ref-autohand-docs-hooks-options][@ref-autohand-hooks-matcher]

执行链（官方 Hooks and Events 的描述）：事件触发时，agent 选出 `filter` 或 `matcher` 命中的定义，替换模板变量，设置 `$HOOK_*` 环境变量，把事件上下文写到 stdin，然后运行命令；同步 hook 阻塞至完成，标记 `async` 的在后台运行。[@ref-autohand-docs-hooks-what]

同一结构在仓库参考里以 Basic Structure 给出（`hooks.enabled` 加 `hooks` 数组），可与上表逐字段对照。[@ref-autohand-hooks-config]

作用域与叠加：用户级在 `~/.autohand/config.json`；项目级可写在 `项目根/.autohand/config.json`（可提交）或 `项目根/.autohand/settings.local.json`（个人），项目 hook 追加到全局列表，与全局同身份（同一脚本文件名，或同事件加 description/command）时替换全局项，`settings.local.json` 优先于共享项目文件；项目文件里的 `hooks.enabled` 会覆盖全局开关。[@ref-autohand-config-overlays][@ref-autohand-hooks-workspace-trust]

其他注册路径：Autohand AI 的 `set_lifecycle_hook` 工具可用自然语言写 hook，写入 `project`（项目共享 config）、`local`（settings.local.json）或 `user`（全局 config）级别，写前展示事件、命令、级别与文件并请求批准；`create_hook` 用于单条命令无法表达、需要生成脚本的场景；旧的事件键控写法（`"on_file_change": ["eslint {{file}} --fix"]`）与数组式可混用，`/hooks` 保存时会统一写成数组式。[@ref-autohand-hooks-workspace-trust][@ref-autohand-hooks-legacy]

## 输入：环境变量与 stdin {#hooks-input}

执行时，命令可获得 `$HOOK_*` 环境变量与 stdin 上的 JSON 上下文。常用变量（随事件不同而出现）：`HOOK_EVENT`、`HOOK_WORKSPACE`、`HOOK_SESSION_ID`、`HOOK_TOOL`、`HOOK_ARGS`（JSON 编码的工具参数）、`HOOK_SUCCESS`、`HOOK_OUTPUT`、`HOOK_DURATION`、`HOOK_PATH`、`HOOK_CHANGE_TYPE`、`HOOK_INSTRUCTION`、`HOOK_TOKENS`、`HOOK_ERROR`、`HOOK_ERROR_CODE`、`HOOK_RETRY_AFTER_MS`、`HOOK_SESSION_TYPE`、`HOOK_SESSION_END_REASON`、`HOOK_PREVIOUS_MODE`/`HOOK_MODE`、`HOOK_SUBAGENT_*`、`HOOK_PERMISSION_TYPE`、`HOOK_TEAM*` 等。[@ref-autohand-hooks-env][@ref-autohand-docs-hooksr-events]

stdin 上的 JSON 是固定的扁平结构，含 `session_id`、`cwd`、`hook_event_name`、`tool_name`、`tool_input`、`tool_response`、`file_path`、`change_type`、`instruction`、`tokens_used`、`error`、`session_type`、`subagent_*`、`permission_type`、`automode_*`、`review_*`、`team_*` 等字段，未提供的为 `null`。[@ref-autohand-hooks-json]

模板变量 `{{file}}`、`{{tool}}`、`{{command}}`、`{{session_id}}`、`{{duration}}`、`{{exit_code}}`、`{{error}}`、`{{timestamp}}` 等在命令运行前替换；不是单个普通词的取值会被单引号包裹（因此含空格的路径安全），未知变量替换为空串。同一上下文同时以环境变量与 JSON 提供。[@ref-autohand-docs-hooks-vars][@ref-autohand-hooks-legacy]

敏感内容：文档建议把密钥与 URL 通过 `$` 前缀的环境变量引用，而不是把值直接写进配置；hook 输入应视为不可信数据。[@ref-autohand-docs-hooks-vars][@ref-autohand-docs-hooksr-debug]

## 输出、顺序与失败处理 {#hooks-order-conditions}

输出协议：命令可返回 JSON，字段为 `decision`（`allow`/`deny`/`ask`/`block`）、`reason`、`continue`（布尔）、`stopReason`、`updatedInput`（改写工具输入）、`additionalContext`（追加到对话的上下文）；`deny`/`block` 或在 `pre-prompt` 上用 `continue: false` 可阻止后续模型工作。退出码 `0` 表示成功并解析可能的 JSON，`2` 表示阻断性错误（以 stderr 信息停止执行），其他非零为记日志但不阻断的错误；官方参考页给出同一套退出码语义与「阻断危险命令」的完整示例。[@ref-autohand-hooks-control][@ref-autohand-hooks-exit][@ref-autohand-config-hooks][@ref-autohand-docs-hooksr-exit]

顺序与并发（源码 `executeHooks`）：扩展注册的运行时 hook 先执行，其中任一返回 `continue: false` 则不再继续；随后按事件取出配置 hook，按 `filter` 与 `matcher` 过滤；**同步 hook 串行执行并阻塞至完成，遇 `continue: false` 立即停止后续同步 hook**；异步 hook 用 `Promise.all` 并行执行、不阻塞，因此不应返回控制流决策。[@ref-autohand-src-hook-order][@ref-autohand-docs-hooksr-advanced]

超时与失败：每条 hook 的 `timeout` 默认 5000 ms，超时按超时错误处理；快速日志用 1000–2000 ms，网络调用通常 10000–30000 ms，更久应改异步。文档没有给出重复触发去重规则。[@ref-autohand-hooks-props][@ref-autohand-docs-hooksr-advanced]

条件：
- `hooks.enabled` 为假时全部 hook 停用，`isEnabled()` 为假直接返回空结果。[@ref-autohand-config-hooks][@ref-autohand-src-hook-order]
- 项目 hook 受工作区信任门控：不受信时项目文件的 `hooks` 段整体被忽略（含其 `enabled`），指纹变化会重新询问；使用 `set_lifecycle_hook` 批准的项目/本地 hook 会把该工作区写入信任条目。[@ref-autohand-hooks-workspace-trust][@ref-autohand-src-workspace-trust]
- 运行时扩展 hook 需要扩展已安装且受信；其权限贡献只能追加策略，不能替换会话模式、决策缓存或不可变安全黑名单。[@ref-autohand-docs-extapi-runtime]
- 团队成员的工具调用由 lead 会话当前的工具能力、权限规则与 hook 授权，无头 teammate 不会静默批准未解决的交互式请求。[@ref-autohand-config-multiagent]

## 诊断 {#hooks-diagnostics}

- 浏览与列表：`/hooks` 打开交互式事件浏览器，显示每个事件的 installed/active 计数与每条 hook 的来源；`/hooks list` 在无 TTY 时也可打印同一张表——installed 大于 0 而 active 为 0 表示被单条或全局开关停用。[@ref-autohand-hooks-manage][@ref-autohand-docs-hooksr-debug]
- 管理：`/hooks manage` 可开关、删除、手动添加 hook，并用样例上下文试跑某条 hook（会有副作用，需自行确认）。[@ref-autohand-hooks-manage]
- 手工验证：在 Autohand 之外设置同样的 `$HOOK_*` 变量、把样例 JSON 通过 stdin 传入并检查退出码与 stdout，是官方推荐的排查方式；常见问题与最佳实践（保持 hook 快速、慎重使用控制流、把 hook 输入当不可信）另见参考页。[@ref-autohand-docs-hooksr-debug]
- 内置 hook：CLI 自带一组内置 hook（日志、声音提醒、自动格式化、Slack 通知、Git 自动暂存、安全守卫、智能提交），其启用方式见 Built-in Hooks 小节。[@ref-autohand-hooks-builtin]

**未证实项**：固定来源没有说明配置式 hook 文件改动后的热重载时机（只有 `set_lifecycle_hook` 明确「运行中的会话立即采用」），也没有 hook 执行历史/失败日志的固定路径。检查过的入口：`/hooks`、`/hooks list`、`/hooks manage`、Debugging hooks 小节。
