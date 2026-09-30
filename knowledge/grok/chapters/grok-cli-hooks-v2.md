---
schema_version: 3
record_kind: production
edition_id: grok-cli-hooks-v2
harness_id: grok
topic: hooks
title: "Grok Build CLI 的 Hooks：事件、注册、输入输出、顺序与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-grok-hooks-custom-locations, ref-grok-hooks-guide-locations]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-grok-docs-hooks-events, ref-grok-hooks-guide-cursor, ref-grok-hooks-guide-events, ref-grok-hooks-types-event-enum]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-grok-docs-hooks-config, ref-grok-docs-plugins-hooks, ref-grok-hooks-adapter-head, ref-grok-hooks-config-compat, ref-grok-hooks-config-hooks, ref-grok-hooks-custom-env, ref-grok-hooks-custom-http, ref-grok-hooks-custom-notexpanded, ref-grok-hooks-custom-subst, ref-grok-hooks-discovery-hookspath, ref-grok-hooks-global-filefilter, ref-grok-hooks-global-hookspaths, ref-grok-hooks-global-sources, ref-grok-hooks-guide-aliases, ref-grok-hooks-guide-config-files, ref-grok-hooks-guide-http, ref-grok-hooks-guide-json-format, ref-grok-hooks-guide-key-fields, ref-grok-hooks-guide-locations, ref-grok-hooks-guide-plugin-env, ref-grok-hooks-manifest-hookspath, ref-grok-hooks-types-hookinfo]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-grok-docs-hooks-contract, ref-grok-hooks-custom-env, ref-grok-hooks-custom-input, ref-grok-hooks-examples-contract, ref-grok-hooks-guide-input, ref-grok-hooks-guide-key-fields, ref-grok-hooks-guide-plugin-env, ref-grok-hooks-guide-postoutput, ref-grok-hooks-guide-runner-env, ref-grok-hooks-guide-security, ref-grok-hooks-guide-user-env]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-grok-docs-hooks-contract, ref-grok-hooks-examples-contract, ref-grok-hooks-examples-format, ref-grok-hooks-guide-exit-codes, ref-grok-hooks-guide-output, ref-grok-hooks-guide-passive, ref-grok-hooks-guide-postoutput, ref-grok-hooks-guide-resolves, ref-grok-hooks-guide-stop, ref-grok-hooks-perms-hook]
  - section_id: hooks-runtime
    surface_ids: [cli]
    source_refs: [ref-grok-docs-plugins-hooks, ref-grok-hooks-custom-tui, ref-grok-hooks-guide-config-files, ref-grok-hooks-guide-enforced, ref-grok-hooks-guide-key-fields, ref-grok-hooks-guide-locations, ref-grok-hooks-guide-managed-only, ref-grok-hooks-guide-perhook, ref-grok-hooks-guide-reload, ref-grok-hooks-guide-resolves, ref-grok-hooks-guide-status, ref-grok-hooks-guide-stop, ref-grok-hooks-guide-trouble, ref-grok-hooks-guide-tui-tab, ref-grok-hooks-plugins-tab, ref-grok-hooks-sandbox-writedeny, ref-grok-hooks-types-actions]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-grok-hooks-guide-events, ref-grok-hooks-types-event-enum, ref-grok-hooks-guide-cursor, ref-grok-docs-hooks-events]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-grok-hooks-guide-locations, ref-grok-hooks-guide-json-format, ref-grok-hooks-guide-key-fields, ref-grok-hooks-guide-aliases, ref-grok-hooks-guide-config-files, ref-grok-hooks-global-sources, ref-grok-hooks-global-hookspaths, ref-grok-hooks-global-filefilter, ref-grok-hooks-adapter-head, ref-grok-hooks-discovery-hookspath, ref-grok-hooks-manifest-hookspath, ref-grok-hooks-config-compat, ref-grok-hooks-config-hooks, ref-grok-hooks-custom-subst, ref-grok-hooks-custom-notexpanded, ref-grok-hooks-custom-env, ref-grok-hooks-guide-plugin-env, ref-grok-hooks-guide-http, ref-grok-hooks-custom-http, ref-grok-hooks-types-hookinfo, ref-grok-docs-hooks-config, ref-grok-docs-plugins-hooks]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: partial
        source_refs: [ref-grok-hooks-guide-input, ref-grok-hooks-custom-input, ref-grok-hooks-guide-runner-env, ref-grok-hooks-guide-plugin-env, ref-grok-hooks-guide-user-env, ref-grok-hooks-custom-env, ref-grok-hooks-guide-key-fields, ref-grok-hooks-guide-security, ref-grok-hooks-guide-postoutput, ref-grok-hooks-examples-contract, ref-grok-docs-hooks-contract]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-grok-hooks-guide-output, ref-grok-hooks-guide-postoutput, ref-grok-hooks-guide-stop, ref-grok-hooks-guide-exit-codes, ref-grok-hooks-guide-resolves, ref-grok-hooks-guide-passive, ref-grok-hooks-perms-hook, ref-grok-hooks-examples-format, ref-grok-hooks-examples-contract, ref-grok-docs-hooks-contract]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-runtime
        status: answered
        source_refs: [ref-grok-hooks-guide-resolves, ref-grok-hooks-guide-config-files, ref-grok-hooks-guide-key-fields, ref-grok-hooks-guide-stop]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-runtime
        status: answered
        source_refs: [ref-grok-hooks-guide-locations, ref-grok-hooks-guide-enforced, ref-grok-hooks-guide-managed-only, ref-grok-hooks-sandbox-writedeny]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-runtime
        status: answered
        source_refs: [ref-grok-hooks-guide-tui-tab, ref-grok-hooks-guide-perhook, ref-grok-hooks-guide-reload, ref-grok-hooks-guide-status, ref-grok-hooks-guide-trouble, ref-grok-hooks-custom-tui, ref-grok-hooks-plugins-tab, ref-grok-hooks-types-actions]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与共页边界 {#hooks-scope}

本章覆盖单一界面 `cli`，主题为 Grok Build CLI 的 Hooks 机制：它在哪些时点触发、在哪里注册、回调收到什么、输出怎样阻断或放行、以及生效条件与排查入口。

固定来源两组：其一是官方文档站的 `hooks` 页快照（取于归档目录的 `artifact-grok-docs-hooks/raw.md`），其二是官方文档站 `skills-plugins` 页快照，其三是官方仓库提交 `2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8` 中的 `xai-grok-pager` 用户指南与 `xai-grok-hooks` 示例说明 [@ref-grok-hooks-guide-locations][@ref-grok-hooks-custom-locations]。

一个必须提前说明的来源缺口：该 checkout **只包含** `crates/codegen/xai-grok-hooks/examples/`（一份 `README.md`），这个 crate 的 `src/`（事件名定义、解析器、调度引擎）不在磁盘上，因此无法直接引用其 `HookEventName` 定义。本文的权威事件清单改用同仓库、磁盘上存在的 `crates/codegen/xai-hooks-plugins-types/src/lib.rs` 中的 `HookEvent` 枚举，并在正文中标注该出处；与文档站表格不一致的地方按文档与枚举的差异如实写出。

## 第一方事件及其触发时点 {#hooks-events}

事件按三种节奏触发：每会话一次、每轮一次、以及在轮内每次工具调用时。仓库侧权威清单是 `xai-hooks-plugins-types` 的 `HookEvent` 枚举，共 15 个具名变体加一个 `Unknown`（`Unknown` 用于容纳未知事件名）[@ref-grok-hooks-types-event-enum]。下表按用户指南与文档站快照列举时点 [@ref-grok-hooks-guide-events][@ref-grok-docs-hooks-events]：

| 事件 | 触发时点 | 是否可阻断 |
|---|---|---|
| `SessionStart` | 会话开始；子代理自己的会话不触发 | 否 |
| `SessionEnd` | 会话结束；携带 `subagentType` 以区分子会话 | 否 |
| `UserPromptSubmit` | 你提交提示词时 | 是：可拒绝提示词 |
| `PreToolUse` | 工具即将执行 | 是：可拒绝 |
| `PostToolUse` | 工具执行完成（含内建逻辑错误，如 `run_terminal_command` 非零退出） | 否，但可向模型反馈并替换模型看到的输出 |
| `PostToolUseFailure` | 工具派发失败，或 MCP 工具返回错误结果 | 否，只能投递 `additionalContext` |
| `PermissionDenied` | 权限系统拒绝了某次工具调用 | 否 |
| `Stop` | 一轮真正完成时 | 是：可阻止停止 |
| `StopFailure` | 轮次因 API 错误结束 | 否 |
| `StopCancelled` | 轮次未完成即结束（用户中断、拒绝权限、`--max-turns`、无进展退出） | 否 |
| `Notification` | 用户注意类事件（`idle_prompt`、`permission_prompt`、`task_complete` 等） | 否 |
| `SubagentStart` | 子代理开始 | 否 |
| `SubagentStop` | 子代理轮次结束（在子代理内触发一次，具备停止决定权） | 是：可阻止停止 |
| `PreCompact` | 对话压缩即将运行 | 否 |
| `PostCompact` | 对话压缩完成 | 否 |

`SubagentEnd` 被接受为 `SubagentStop` 的别名；在类型枚举转换时 `SubagentEnd` 折叠为 `SubagentStop` [@ref-grok-hooks-types-event-enum][@ref-grok-hooks-guide-events]。

文档站的 `Events` 表比仓库枚举少列 `StopCancelled`，并把 `PostToolUseFailure`、`StopFailure` 与主事件合写 [@ref-grok-docs-hooks-events]；这不是矛盾，而是文档站表格较粗。除 `PreToolUse`、`UserPromptSubmit`、`Stop`/`SubagentStop`、`PostToolUse` 之外，其余事件都是被动的：其输出被记录但不改变控制流。

**Cursor 兼容的事件名**：`~/.cursor/hooks.json` 可原样加载，Grok 接受 Cursor 的 camelCase 事件名并映射到上表事件，例如 `sessionStart`/`sessionEnd` 映射到 `SessionStart`/`SessionEnd`，`beforeShellExecution`、`beforeMCPExecution`、`beforeReadFile`、`afterShellExecution`、`afterMCPExecution`、`afterFileEdit`、`afterAgentResponse`、`afterAgentThought` 都落入通用的 `PreToolUse`/`PostToolUse`，`beforeSubmitPrompt` 映射到 `UserPromptSubmit` [@ref-grok-hooks-guide-cursor]。这些「按操作细分」的 Cursor 事件被抹平成通用工具事件，脚本改为从 JSON 输入里读工具名，或用 `matcher` 过滤。

## 注册位置、作用域与字段 {#hooks-entry}

Hook 来自多个位置，全部会被合并 [@ref-grok-hooks-guide-locations]：

| 作用域 | 路径 | 是否可信 | 说明 |
|---|---|---|---|
| 全局 | `~/.grok/hooks/*.json` | 始终 | 个人 Hook |
| 全局 | `~/.claude/settings.json`（及 `settings.local.json`） | 始终 | Claude Code 兼容（可配置） |
| 全局 | `~/.cursor/hooks.json` | 始终 | Cursor 兼容（可配置） |
| 项目 | `{project}/.grok/hooks/*.json` | 需信任 | 每个仓库的自动化 |
| 项目 | `{project}/.claude/settings.json`（及 `settings.local.json`） | 需信任 | Claude 兼容（可配置） |
| 项目 | `{project}/.cursor/hooks.json` | 需信任 | Cursor 兼容（可配置） |
| 配置 | `~/.grok/config.toml` | 始终 | 与其余配置同文件 |
| 配置 | `managed_config.toml`（`$GROK_HOME` 与 `/etc/grok`） | 始终 | 组织分发 |
| 配置 | `requirements.toml`（签名缓存与 `/etc/grok`） | 始终 | 组织强制 |
| 插件 | 已安装插件内的 `hooks/hooks.json` | 按插件 | 团队共享 |

文档站的 `Hooks` 小节给出的发现来源与上表一致，并额外点明「额外根目录经 `~/.grok/hooks-paths` 提供」[@ref-grok-docs-plugins-hooks]。仓库侧把这三种全局来源固化成一个枚举：`$GROK_HOME/hooks/`（目录，被扫描并被保护）、`$GROK_HOME/hooks-paths`（注册表文件，受保护但**从不**被当作 Hook JSON 加载）、以及注册表里列出的绝对路径目标 `ConfiguredSource` [@ref-grok-hooks-global-sources]。`hooks-paths` 逐行读取，空行跳过、相对路径行被忽略、只认绝对目标；含符号链接组件的目标会在解析时报错 [@ref-grok-hooks-global-hookspaths]。发现层只接受以 `.json` 结尾、非隐藏、非编辑器临时文件（`~`、`.swp`、`.swo` 结尾）的直接子项 [@ref-grok-hooks-global-filefilter]。

**插件 Hook 路径**：插件目录下的约定路径是 `hooks/hooks.json`；若插件清单声明了组件路径则用清单值，否则回退到该默认 [@ref-grok-hooks-discovery-hookspath][@ref-grok-hooks-manifest-hookspath]。插件 Hook 在插件被启用且受信任后才会解析进注册表 [@ref-grok-hooks-adapter-head]。

**JSON 文件格式**：一个文件可定义多个事件的 Hook，每个事件是一个 matcher 分组数组，分组内的 `hooks` 数组是处理器 [@ref-grok-hooks-guide-json-format]：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "bin/safety-check.sh", "timeout": 10 }
        ]
      }
    ]
  }
}
```

**字段** [@ref-grok-hooks-guide-key-fields]：

| 字段 | 含义 |
|---|---|
| 事件名（顶层键） | `Hook Events` 中任一事件；无法识别的事件名被跳过，使共享的 Claude/Cursor 设置文件仍可加载 |
| `matcher` | 可选正则，选取哪些调用触发该 Hook；匹配对象随事件而定（工具事件为工具名，`Notification` 为通知类型，`SubagentStart`/`SubagentStop` 为子代理类型，`SessionStart` 为启动来源，`SessionEnd` 为结束原因，`PreCompact`/`PostCompact` 为压缩触发源 `manual`/`auto`，`StopFailure` 为错误类型，`StopCancelled` 为原因）；空或省略即匹配全部 |
| `type` | `"command"`（运行脚本或 shell 单行）或 `"http"`（把事件 POST 到 URL） |
| `command` | 可执行文件路径（相对 JSON 文件）或内联 shell 命令 |
| `timeout` | 秒数（默认 5，`Stop`/`SubagentStop`/`PostToolUse` 门为 600） |
| `url` | HTTP Hook 的端点 |
| `env` | 逐个处理器附加的环境变量映射 |

仓库类型层把清单里的每个 Hook 暴露为 `HookInfo`，字段为 `name`（含作用域前缀）、事件、`matcher`、`command`/`url`、`timeout_ms`、`source_dir`、`enabled` [@ref-grok-hooks-types-hookinfo]。

**工具名别名**：`matcher` 中 Claude 风格工具名被映射到 Grok 自身名字，`Bash`→`run_terminal_command`、`Read`→`read_file`、`Edit`/`Write`/`MultiEdit`→`search_replace`、`Grep`→`grep`、`Glob`/`ListDir`→`list_dir`、`WebSearch`→`web_search`、`Task`→`spawn_subagent`；`matcher` 保留原名，故 `Bash` 同时匹配 `Bash` 与 `run_terminal_command` [@ref-grok-hooks-guide-aliases]。

**配置文件内的 Hook**：JSON 的 `hooks` 对象同样可从三个 TOML 读取，结构一致，每个 matcher 分组是 `[[hooks.{Event}]]` [@ref-grok-hooks-guide-config-files]。配置参考确认 `hooks.{event}` 为「matcher 分组表数组」，处理器支持 `command`/`type`，且 `command` 里的 `$VAR` 不在加载期展开 [@ref-grok-hooks-config-hooks]。

**变量展开**：`command` 与 `url` 支持 `$VAR`/`${VAR}`，查找顺序为处理器 `env` 映射 → 当前进程环境；两者都未设则原样保留。`matcher` 是正则，**永不**做环境展开；参数展开形式（如 `${VAR:-default}`）留到运行时 `sh -c` 处理 [@ref-grok-hooks-custom-subst][@ref-grok-hooks-custom-notexpanded]。`env` 映射的值按字面存储，不做展开；插件 Hook 的 `GROK_PLUGIN_ROOT`/`GROK_PLUGIN_DATA` 由适配器强制注入，压过用户在 `env` 里声明的同名值 [@ref-grok-hooks-custom-env][@ref-grok-hooks-guide-plugin-env]。

**HTTP Hook**：`{ "type": "http", "url": "https://hooks.example.com/grok-event", "timeout": 15 }`，完整事件信封以 JSON POST 出去 [@ref-grok-hooks-guide-http][@ref-grok-hooks-custom-http]。

**厂商兼容开关**：兼容来源默认被扫描；要停用某厂商，在 `~/.grok/config.toml` 设 `[compat.{vendor}] hooks = false`，对应环境变量分别为 `GROK_CLAUDE_HOOKS_ENABLED`、`GROK_CURSOR_HOOKS_ENABLED`，另有 `compat.codex.hooks`（默认均为 `yes`）[@ref-grok-hooks-guide-locations][@ref-grok-hooks-config-compat]。文档站 `Configuration` 小节给出同一 JSON 格式与 `matcher`/`type`/`timeout` 的说明 [@ref-grok-docs-hooks-config]。

## 回调输入、环境变量与工作目录 {#hooks-input}

事件以 JSON 从 **stdin** 送入处理器 [@ref-grok-hooks-guide-input]。一个 `PreToolUse` 事件的示例（用户指南与示例说明均给出）[@ref-grok-hooks-guide-input][@ref-grok-hooks-custom-input][@ref-grok-hooks-examples-contract]：

```json
{
  "hookEventName": "pre_tool_use",
  "hook_event_name": "PreToolUse",
  "sessionId": "abc-123",
  "cwd": "/Users/you/project",
  "workspaceRoot": "/Users/you/project",
  "permissionMode": "default",
  "toolName": "run_terminal_command",
  "toolInput": { "command": "npm test" },
  "timestamp": "2026-04-14T12:00:00Z"
}
```

所有事件共有字段：`hookEventName`、`sessionId`、`cwd`、`workspaceRoot`、`timestamp`、`permissionMode`（`default`、`auto`、`plan`、`bypassPermissions`）、`promptId`（事件所属轮次，会话级事件缺失），以及各事件专有字段如 `toolName`。两个看似重复的键是刻意的：`hook_event_name`（snake_case 键）承载 Claude 的 PascalCase 值，`hookEventName`（camelCase 键）承载 grok 的 snake_case 值 [@ref-grok-hooks-guide-input]。工具事件载荷还总是带 `toolUseId` 和 `toolInputTruncated`；`PostToolUse` 侧有对应的 `toolResult`/`toolResultTruncated` 等（超长载荷以普通字符串到达，无法原样回传）[@ref-grok-hooks-guide-input]。

**环境变量**：每个 Hook 进程都会收到 runner 注入的变量 [@ref-grok-hooks-guide-runner-env]：

| 变量 | 含义 |
|---|---|
| `GROK_HOOK_EVENT` | 触发事件名（如 `pre_tool_use`、`session_start`、`post_tool_use`、`session_end`、`stop`、`notification`） |
| `GROK_HOOK_NAME` | 该 Hook 的配置名（插件 Hook 带插件前缀） |
| `GROK_SESSION_ID` | 当前会话标识 |
| `GROK_WORKSPACE_ROOT` | 工作区根的绝对路径 |
| `CLAUDE_PROJECT_DIR` | `GROK_WORKSPACE_ROOT` 的 Claude 兼容别名，对每个 Hook 都设置 |

这些名字是**保留的**：你在 Hook JSON 的 `env` 里对它们赋值会在加载期被剥掉并记一条警告，runner 在 spawn 时注入真值 [@ref-grok-hooks-guide-runner-env]。插件 Hook 额外获得 `GROK_PLUGIN_ROOT`（插件安装目录）与 `GROK_PLUGIN_DATA`（插件可写数据目录）[@ref-grok-hooks-guide-plugin-env]。用户自定义变量走 `env` 字段（值必须是字符串；JSON 数字与布尔当前解析失败）[@ref-grok-hooks-guide-user-env][@ref-grok-hooks-custom-env]。工作目录：`cwd` 与 `workspaceRoot` 在载荷里都给出；`command` 为相对路径时以 JSON 文件所在目录为基准 [@ref-grok-hooks-guide-input][@ref-grok-hooks-guide-key-fields]。文档站在 `The script contract` 中确认 stdin JSON 至少包含 `hookEventName`、`sessionId`、`cwd`、`workspaceRoot`（工具事件另含 `toolName`、`toolInput`），并列出 `GROK_HOOK_EVENT`、`GROK_HOOK_NAME`、`GROK_SESSION_ID`、`GROK_WORKSPACE_ROOT` [@ref-grok-docs-hooks-contract]。

**敏感内容如何处理——部分可见**。文档给出的相关规则集中在输出侧与安全说明，而非对输入做统一的脱敏：HTTP Hook 会把会话数据发送出去，只应指向可信端点 [@ref-grok-hooks-guide-security]；Hook 发出的任何文本（备注、阻断理由、替换）都会被转义，无法闭合提醒标签冒充系统或用户指令 [@ref-grok-hooks-guide-postoutput]。至于回调 stdin 里是否对密钥、凭据等字段做过滤或遮蔽，固定来源没有说明；已查看的入口是用户指南的 `Input`/`Environment Variables`/`Security Notes`、示例说明的 `Script Contract` 与文档站 `The script contract`，均未给出输入侧脱敏规则，故此项按缺口处理。

## 输出、退出码与阻断/放行 {#hooks-output}

事件触发后按四步解析：选取匹配分组 → 按配置顺序运行处理器（同一事件各来源合并、完全相同的处理器去重）→ 应用决定 → 失败放行（fail-open）[@ref-grok-hooks-guide-resolves]。

**`PreToolUse` 写 JSON 到 stdout** [@ref-grok-hooks-guide-output]：

- 允许：`{"decision": "allow"}`
- 拒绝：`{"decision": "deny", "reason": "Unsafe command detected"}`
- 请求用户确认：`{"decision": "ask", "reason": "Confirm this deploy"}`
- 不表态：`{"decision": "defer"}`
- 改写工具输入：`{"hookSpecificOutput": {"hookEventName": "PreToolUse", "updatedInput": {"command": "npm test"}}}`
- 告知模型：`{"hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": "..."}}`

决定可写在顶层 `decision` 或 `hookSpecificOutput.permissionDecision`，取值 `allow`/`deny`/`ask`/`defer`（旧拼写 `approve`/`block` 也可）；`permissionDecision` 存在时优先。`allow` 只表示「未被阻断」，不会自动批准本应询问的调用。`updatedInput` 静默替换工具输入（模型不会被告知），须是 JSON 对象且通过该工具的 schema，否则调用被当作 Hook 拒绝而阻断。SDK 注册的 `PreToolUse` Hook 只能 allow/deny，`ask`/`defer`/`additionalContext` 会被丢弃 [@ref-grok-hooks-guide-output]。

**`PostToolUse` 写 stdout**（工具已运行，阻断不了）[@ref-grok-hooks-guide-postoutput]：`decision: "block"` + `reason` 把理由随结果交给模型；`additionalContext` 追加笔记；`updatedToolOutput` 替换模型看到的结果（通用键，须匹配工具自身的输出形状），`updatedMCPToolOutput` 是 MCP 专用别名。替换只改写模型副本，scrollback、transcript 与遥测保留原文；备注与理由按 Hook 运行顺序全部投递，只有替换是「最后写入者胜出」。`block` 理由与 `additionalContext` 截断在 10000 字符，替换为 64K 字符。

**`Stop`/`SubagentStop` 写 stdout**（Claude Code 兼容）[@ref-grok-hooks-guide-stop]：`{"decision": "block", "reason": "..."}` 让代理再跑一轮；`{"hookSpecificOutput": {"hookEventName": "Stop", "additionalContext": "..."}}` 以非错误反馈继续；`{"continue": false, "stopReason": "..."}` 强制结束；退出码 0 且无输出即允许停止。退出码 2 也阻断停止，stderr 作为反馈。连续 8 次 continuation 后内建上限强制结束。

**退出码** [@ref-grok-hooks-guide-exit-codes]：

| 退出码 | 含义 |
|---|---|
| `0` | 成功 / 允许（对阻断型 Hook） |
| `2` | 显式拒绝（`PreToolUse`）、以 stderr 为反馈阻断停止（`Stop`/`SubagentStop`）、或把反馈交给模型（`PostToolUse`） |
| 其它 | fail-open：失败被记录但什么都不阻断；`PreToolUse` 下 stdout 里的 `deny` 决定不受退出码影响 |

`PostToolUse` 退出 2 是一处行为变更：它现在会把 stderr 交给模型，所以以 `run_checker; exit $?` 结尾的日志 Hook 会在检查器退出 2 时把输出喂给模型，需要显式 `exit 0` 保持静默 [@ref-grok-hooks-guide-exit-codes]。被动事件（`SessionStart`、`Notification` 等）的 stdout 被忽略，成功退出 0 即可 [@ref-grok-hooks-guide-passive]。示例说明给出同一契约的最小响应形态 [@ref-grok-hooks-examples-contract]。

**与权限系统的关系**：Hook 在权限系统之前求值；Hook 的 `deny` 终止调用，Hook 的 `allow` 落到正常权限检查（你的 `deny` 规则仍然生效）[@ref-grok-hooks-perms-hook]。文档站 `The script contract` 概括为「退出 0 允许、退出 2 拒绝，其余（超时、崩溃、格式错误）fail-open，仅显式 `deny` 才阻断」[@ref-grok-docs-hooks-contract]。示例说明补充了自定义 Hook 只支持 command 的字段面 [@ref-grok-hooks-examples-format]。

## 顺序、生效条件与诊断 {#hooks-runtime}

**顺序、并发与去重**。四步解析中处理器按配置顺序运行，每个都收到模型原始工具输入，直到有处理器返回 `deny` 终止链；不同来源（global、project、plugin、config）的处理器被合并，完全相同的处理器去重 [@ref-grok-hooks-guide-resolves]。配置层是**叠加**的：每一层都会运行，低优先层只增加 Hook，绝不替换另一层的阻断；跨层完全相同的 Hook 去重时保留最高权限的副本，`/hooks` 以 `managed:`、`requirements/signed:`、`requirements/user:`、`user:` 等来源标签区分 [@ref-grok-hooks-guide-config-files]。`PreToolUse` 的 `updatedInput` 在所有处理器结束后才应用，故一个处理器看不到另一个的改写（最后改写者胜出）[@ref-grok-hooks-guide-resolves]。

**超时与失败**。默认超时 5 秒；`Stop`/`SubagentStop`/`PostToolUse` 门默认 600 秒，因为常跑构建或测试；`SessionEnd` Hook 默认 1.5 秒，可用 `GROK_SESSION_END_HOOKS_TIMEOUT_MS`（毫秒，上限 60 秒）调整；所有失败（超时、崩溃、输出格式错误、缺失必需环境变量）都是 fail-open，只有 `PreToolUse` 的 `updatedInput` 未过 schema 例外——该调用被阻断并报为无效输入 [@ref-grok-hooks-guide-key-fields]。轮次结束的三类事件共用一个 worker，慢 Hook 只延迟下一个报告，不延迟它所属的轮次；中断正在运行的 `Stop` Hook 会杀死该 Hook 并使轮次报 `StopCancelled` [@ref-grok-hooks-guide-stop]。

**信任条件**。项目 Hook 首次打开需先信任，否则被静默跳过；用 `/hooks-trust`（或 `--trust`）授权，决定记录在 `~/.grok/trusted_folders.toml`，与仓库级 MCP/LSP 同一道门；`~/.grok/hooks/` 的全局 Hook 始终可信、无需登记 [@ref-grok-hooks-guide-locations]。`--trust`/`/hooks-trust` 授予的是整个文件夹在 MCP、LSP、hooks、项目指令与项目 skill 上的一揽子信任，覆盖同一仓库的子目录；该文件夹下嵌套的独立 git checkout 视为另一工作区、不受覆盖。停用文件夹信任（`GROK_FOLDER_TRUST=0` 或 `[folder_trust] enabled = false`）会一起解除这些面 [@ref-grok-hooks-guide-locations]。

**组织强制与仅托管模式**。来自组织控制配置层的 Hook 是「强制」的：在 `/hooks` 带 `[policy]` 徽章、`Space` 拒绝停用、`~/.grok/disabled-hooks` 条目不跳过、来源不可移除；两类合格——root 所有的 `/etc/grok/requirements.toml` 与 `/etc/grok/managed_config.toml`，以及签名字节匹配服务端策略时的 `~/.grok/requirements.toml` [@ref-grok-hooks-guide-enforced]。在 `requirements.toml` 设 `allow_managed_hooks_only = true` 后，只有强制 Hook（以及嵌入客户端经 ACP 注册的 Hook）会运行，其余在派发时被跳过并在 `/hooks` 显示 `[disabled]`；这是「只收紧」的策略钉，读一次于启动时生效，`grok inspect` 会指名设置它的文件 [@ref-grok-hooks-guide-managed-only]。

**沙箱条件**。在 `workspace`、`read-only`、`strict` 等 profile（及其扩展）下，内核**写拒绝** Grok 自有的全局 Hook 路径：`~/.grok/hooks/`、`~/.grok/hooks-paths` 及其中列出的绝对目标；首次启动会创建真实的空 `hooks/` 目录与空 `hooks-paths` 文件（绝不建符号链接）；符号链接的 `$GROK_HOME` 或带符号链接组件的 `hooks-paths` 条目在沙箱启动时被拒绝；Claude/Cursor 全局设置不受此写拒绝覆盖，其发现仍由兼容开关单独控制 [@ref-grok-hooks-sandbox-writedeny]。

**启用/停用与生效时机**。可在运行时用 Hooks 标签页对单个 Hook 切换启用状态，改动立即生效、无需重启 [@ref-grok-hooks-guide-perhook]；`r` 键从磁盘重载**全部** Hook 来源，从而拾取会话期间对 Hook 文件的改动 [@ref-grok-hooks-guide-reload]。插件面板同样有 reload [@ref-grok-hooks-plugins-tab]。类型的 `HooksAction` 暴露 `Reload` 与 `Trust` 两个动作，即界面这两类操作的后端 [@ref-grok-hooks-types-actions]。策略钉例外：`allow_managed_hooks_only` 在启动时读取，会话中途新增要到下次启动才生效，`/hooks` 的 Reload 也不行 [@ref-grok-hooks-guide-managed-only]。

**如何检查发现、匹配、执行与失败**。`/hooks` 打开扩展模态的 Hooks 标签页（非 VS Code 系终端按 `Ctrl+L`），按来源分为 Global、Project、Plugin、Custom，每个 Hook 显示事件、命令或 URL、超时、启用状态 [@ref-grok-hooks-guide-tui-tab][@ref-grok-hooks-plugins-tab]。状态行与 scrollback 只在 Hook 拖住轮次或改变走向时出声：批次运行约 300 ms 后显示如 `Running pre_tool_use hook…`；拒绝/阻断/继续各留一行带理由的注记；失败留一行 `{event} hook ({name}) failed, ignored: {reason}`，其中「ignored」是字面意义的 fail-open [@ref-grok-hooks-guide-status]。故障排查入口：项目 Hook 不跑多为文件夹未受信任（`/hooks-trust`）；脚本找不到检查路径是否相对 JSON 且可执行；用 `RUST_LOG=debug GROK_LOG_FILE=/tmp/grok.log grok` 启动再查日志；自定义 Hook 指南另指 `~/.grok/logs` [@ref-grok-hooks-guide-trouble][@ref-grok-hooks-custom-tui]。

**一处需并列的文档冲突（标签页按键）**：三份仓库文档对 Hooks 标签页的按键不一致——用户指南写 `r` 重载、`a` 添加、`x` 移除、`Space` 启停、`f` 循环状态筛选 [@ref-grok-hooks-guide-tui-tab]；`custom-hooks.md` 写 `l` 重载、`a` 添加、`e` 启停、`r` 移除、`Space` 展开 [@ref-grok-hooks-custom-tui]；`hooks-and-plugins.md` 写 `l` 重载、`a` 添加、`r` 移除、`e` 启停、`Space` 展开 [@ref-grok-hooks-plugins-tab]。`l` 与 `r` 在「重载」与「移除」上的语义互相颠倒，只有实际运行 TUI 才能判定 CLI 当前采用哪套。斜杠命令方面，用户指南列出 `/hooks-list`、`/hooks-trust`、`/hooks-add`、`/hooks-remove`、`/hooks-untrust`，但注明在 TUI pager 中这些 `/hooks-*` 不出现于斜杠命令列表，`/hooks` 模态覆盖列举、添加、移除与启停，项目信任由 `/hooks-trust`（或模态的 Trust 动作）写入统一文件夹信任库 [@ref-grok-hooks-guide-tui-tab]。改动何时生效的完整结论：单 Hook 启停与 `r` 重载即时生效；文件改动在会话（重）启动或手动重载后生效；策略钉与 `allow_managed_hooks_only` 只在下一次启动生效 [@ref-grok-hooks-guide-reload][@ref-grok-hooks-guide-perhook][@ref-grok-hooks-guide-managed-only]。插件 Hook 的环境变量契约见 `skills-plugins` 快照 [@ref-grok-docs-plugins-hooks]。
