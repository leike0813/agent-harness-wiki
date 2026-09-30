---
schema_version: 3
record_kind: production
edition_id: devin-cli-hooks-v1
harness_id: devin
topic: hooks
title: "Devin CLI 的 Hooks：事件、入口、输入输出、顺序与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-devin-hooks-what, ref-devin-ext-how, ref-devin-controls-enterprise]
  - section_id: hooks-events-format
    surface_ids: [cli]
    source_refs: [ref-devin-hooks-events, ref-devin-plug-format, ref-devin-hooks-locations, ref-devin-config-projectvsuser, ref-devin-hooks-format, ref-devin-hooks-example, ref-devin-hookl-matcher]
  - section_id: hooks-input-output
    surface_ids: [cli]
    source_refs: [ref-devin-hooks-command, ref-devin-hookl-pretool, ref-devin-hookl-posttool, ref-devin-hookl-perm, ref-devin-hookl-prompt, ref-devin-hookl-stop, ref-devin-hookl-start, ref-devin-hookl-end, ref-devin-tr-net, ref-devin-hooks-output, ref-devin-hooks-exit, ref-devin-hookl-tools]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-devin-precedence-merge, ref-devin-hookl-matcher, ref-devin-hooks-format, ref-devin-hookl-stop, ref-devin-hooks-locations, ref-devin-import-disable, ref-devin-plug-format, ref-devin-cmd-flags]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-hooks-verify, ref-devin-cmd-ext, ref-devin-import-how]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-format
        status: answered
        source_refs: [ref-devin-hooks-events, ref-devin-plug-format, ref-devin-hooks-locations, ref-devin-config-projectvsuser, ref-devin-hooks-format, ref-devin-hooks-example, ref-devin-hookl-matcher]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-format
        status: answered
        source_refs: [ref-devin-hooks-events, ref-devin-plug-format, ref-devin-hooks-locations, ref-devin-config-projectvsuser, ref-devin-hooks-format, ref-devin-hooks-example, ref-devin-hookl-matcher]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input-output
        status: partial
        source_refs: [ref-devin-hooks-command, ref-devin-hookl-pretool, ref-devin-hookl-posttool, ref-devin-hookl-perm, ref-devin-hookl-prompt, ref-devin-hookl-stop, ref-devin-hookl-start, ref-devin-hookl-end, ref-devin-tr-net, ref-devin-hooks-output, ref-devin-hooks-exit, ref-devin-hookl-tools]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-input-output
        status: answered
        source_refs: [ref-devin-hooks-command, ref-devin-hookl-pretool, ref-devin-hookl-posttool, ref-devin-hookl-perm, ref-devin-hookl-prompt, ref-devin-hookl-stop, ref-devin-hookl-start, ref-devin-hookl-end, ref-devin-tr-net, ref-devin-hooks-output, ref-devin-hooks-exit, ref-devin-hookl-tools]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-devin-precedence-merge, ref-devin-hookl-matcher, ref-devin-hooks-format, ref-devin-hookl-stop, ref-devin-hooks-locations, ref-devin-import-disable, ref-devin-plug-format, ref-devin-cmd-flags]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-devin-precedence-merge, ref-devin-hookl-matcher, ref-devin-hooks-format, ref-devin-hookl-stop, ref-devin-hooks-locations, ref-devin-import-disable, ref-devin-plug-format, ref-devin-cmd-flags]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-devin-hooks-verify, ref-devin-cmd-ext, ref-devin-import-how]
---

## 固定来源与范围 {#hooks-scope}

固定来源是官方文档站 `docs.devin.ai` 的 Devin CLI markdown 快照：`cli/extensibility/hooks/overview.md`、`cli/extensibility/hooks/lifecycle-hooks.md`、`cli/extensibility/configuration.md`、`cli/reference/configuration/global-vs-local.md`、`cli/reference/configuration/read-config-from.md`、`cli/extensibility/plugins/overview.md`、`cli/enterprise/controls.md`、`cli/reference/commands.md`、`cli/troubleshooting.md`。文档未标注软件版本，全章为来源级知识。

Hook 用来在 agent 生命周期的关键点运行自定义逻辑（shell 命令或 LLM prompt），可用于强制策略、注入上下文、记录动作、动态改权限或对接外部系统 [@ref-devin-hooks-what]。它与 rules、skills、subagents、MCP、plugins 并列 [@ref-devin-ext-how]。在 Cascade 的旧控制项被新机制替代的语境里，hook 与 permissions、team settings 一起被列为 Devin CLI 更灵活的替代方案 [@ref-devin-controls-enterprise]。

## 事件与配置入口 {#hooks-events-format}

**hooks.events**：第一方事件共 8 个 [@ref-devin-hooks-events]：

| 事件 | 触发时点 |
| - | - |
| `PreToolUse` | 工具执行**前**（可阻断、改写、注入） |
| `PostToolUse` | 工具执行**后**（可记录、校验、触发后续） |
| `PermissionRequest` | 需要权限决策时（可实现自定义批准逻辑） |
| `UserPromptSubmit` | 用户提交消息时 |
| `Stop` | agent 想结束 turn 时（可阻止过早停止） |
| `PostCompaction` | 上下文压缩成功完成后 |
| `SessionStart` | 会话开始时 |
| `SessionEnd` | 会话结束时 |

插件另有自己的 hook 来源：插件根的 `hooks.json`，在安装该插件的本地会话（CLI 与 Devin Desktop）注册，目前是 **best effort 且 fail open**——加载或执行失败时会话继续，因此暂不适合承担关键护栏 [@ref-devin-plug-format]。

**hooks.entry**：hook 用 JSON 配置，位置分项目级与用户级 [@ref-devin-hooks-locations]：

| 层级 | 位置 | 说明 |
| - | - | - |
| 项目 | `.devin/hooks.v1.json` | 推荐；hooks 对象就是整个文件，没有外层键 |
| 项目 | `.devin/config.json` / `.devin/config.local.json` | 配置文件里的 `"hooks"` 键 |
| 项目 | `.claude/settings.json` / `.claude/settings.local.json` | Claude Code 格式的 `"hooks"` 键 |
| 用户 | `~/.config/devin/config.json`（Windows `%APPDATA%\devin\config.json`） | `"hooks"` 键 |
| 用户 | `~/.claude.json`、`~/.claude/settings.json`、`~/.claude/settings.local.json` | Claude Code 格式 |

项目级 hook 文件从工作目录向其祖先目录一直发现到仓库根，与 skills、rules 的加载方式一致 [@ref-devin-hooks-locations]。项目配置文件只支持 `permissions`、`read_config_from`、`hooks` 三类设置 [@ref-devin-config-projectvsuser]。每个 hook 条目的字段是 [@ref-devin-hooks-format]：

| 字段 | 说明 |
| - | - |
| `matcher` | **正则**，匹配事件的 `tool_name`；空串或省略匹配所有工具 |
| `type` | `"command"`（跑 shell 命令）或 `"prompt"`（求值 LLM prompt） |
| `command` | command 类型要跑的命令 |
| `prompt` | prompt 类型要求值的提示 |
| `timeout` | 超时秒数（可选） |

最小可用示例（来自官方 Quick Example）[@ref-devin-hooks-example]：

```json
// .devin/hooks.v1.json
{
  "PreToolUse": [
    {
      "matcher": "exec",
      "hooks": [
        { "type": "command", "command": "./scripts/check-command.sh" }
      ]
    }
  ]
}
```

同一份 hooks 文件可为多个事件定义 hook（例如同时挂 `PreToolUse` 与 `PostToolUse`）[@ref-devin-hookl-matcher]。

## 输入与输出 {#hooks-input-output}

**hooks.input**：command hook 在 **stdin** 收到 JSON，字段随事件不同；所有 payload 都带两个相关性 id——`session_id`（整个会话稳定，用于关联一次会话内的所有 hook 调用）与 `prompt_id`（每个用户 prompt 轮换，同一 turn 内所有 hook 共享一个；第一轮用户输入之前的事件如 `SessionStart` 没有该字段）[@ref-devin-hooks-command]。环境变量 `DEVIN_PROJECT_DIR` 自动设为项目根目录 [@ref-devin-hooks-command]。各事件的 stdin 数据 [@ref-devin-hookl-pretool][@ref-devin-hookl-posttool][@ref-devin-hookl-perm][@ref-devin-hookl-prompt][@ref-devin-hookl-stop][@ref-devin-hookl-start][@ref-devin-hookl-end]：

| 事件 | stdin 字段 |
| - | - |
| `PreToolUse` | `tool_name`、`tool_input`（工具参数，如 `{ "command": "rm -rf /" }`） |
| `PostToolUse` | `tool_name`、`tool_input`、`tool_response`（含 `success` 布尔、`output` 字符串、`error` 字符串或 null） |
| `PermissionRequest` | `tool_name`、`tool_input` |
| `UserPromptSubmit` | `prompt`（用户消息文本） |
| `Stop` | `stop_hook_active`（是否已有 stop hook 处于活动） |
| `PostCompaction` | `summary`（压缩器产出的摘要，可能为 null） |
| `SessionStart` | `source`（会话如何启动） |
| `SessionEnd` | `reason`（会话为何结束） |

敏感内容处理没有专门说明；文档另处警告 trace 级日志可能含 `Authorization` 头与 token，需要清洗后才分享 [@ref-devin-tr-net]，hook 侧没有等价提示，partial。

**hooks.output**：command hook 可向 stdout 打印 JSON 控制结果 [@ref-devin-hooks-output]：

| 输出字段 | 作用 |
| - | - |
| `decision` | `"approve"` 放行、`"block"` 拒绝 |
| `reason` | 展示给 agent 的解释 |
| `hookSpecificOutput.hookEventName` | 该输出对应的 JSON 事件（`UserPromptSubmit`、`SessionStart`、`PreToolUse`、`PostToolUse`） |
| `hookSpecificOutput.additionalContext` | 注入 agent 上下文的文本（`UserPromptSubmit`、`SessionStart`、`PostToolUse`） |
| `hookSpecificOutput.updatedInput` | 合并进工具参数的对象，仅在 `PreToolUse` 生效（可只改一个子集，如只改 `command`） |

退出码语义 [@ref-devin-hooks-exit]：`0` 正常继续；`2` 阻断该动作；其它非零只记录为错误、不阻断。`updatedInput` 是透明改写——合并后的参数成为实际执行内容，agent 执行的是改写后的命令而不是原命令 [@ref-devin-hookl-pretool]。`additionalContext` 的注入发生在**每个**匹配事件上（示例里 `UserPromptSubmit` 的空 matcher hook 每轮都注入一句提醒）[@ref-devin-hookl-prompt]。可匹配的工具名按类别给出 [@ref-devin-hookl-tools]：

| 类别 | 工具名 |
| - | - |
| 文件操作 | `read`、`write`、`edit`、`apply_patch`、`notebook_read`、`notebook_edit` |
| 搜索 | `grep`、`glob` |
| Shell | `exec`、`get_output`、`write_to_process`、`kill_shell` |
| Web | `webfetch` |
| 计划与任务 | `todo_write`、`exit_plan_mode` |
| Skills | `skill` |
| Subagents | `run_subagent`、`read_subagent` |
| 权限 | `request_scope` |
| MCP 管理 | `mcp_list_servers`、`mcp_list_tools`、`mcp_call_tool`、`mcp_read_resource` |

MCP server 工具以 `mcp__SERVER__TOOL` 出现；可用工具集合会随 CLI 模式、模型与启用的集成变化，文档建议临时挂一个 `matcher: ""` 的 `PostToolUse` hook 把 stdin 记下来以确认当前会话的完整清单 [@ref-devin-hookl-tools]。

## 顺序、重复触发与生效条件 {#hooks-order-conditions}

**hooks.order**：hook 从所有来源**收集**并**全部运行**，彼此不覆盖——用户配置里的 hook 与项目配置里的 hook 并行生效 [@ref-devin-precedence-merge]。`matcher` 是正则而非权限 glob：权限里的 `mcp__github__*` 在 hook 里要写成 `mcp__github__.*` [@ref-devin-hookl-matcher]。同一事件下多个 matcher/条目之间的先后顺序、是否并发、重复触发的去重，来源均未说明；只有单个 hook 的 `timeout`（秒）字段可配 [@ref-devin-hooks-format]。`Stop` 事件阻断型 hook 有循环风险：文档显式警告，若阻断条件始终不满足，agent 会反复被拦停 [@ref-devin-hookl-stop]。因此 order 按 partial 阅读。

**hooks.conditions**：可确认的条件有三个。其一，`.claude/` 下的 hook 受 `read_config_from.claude` 开关控制（默认开，可在用户配置里关掉；该页同时说明 `.claude/` 的规则、skills、commands、MCP 也由同一开关控制）[@ref-devin-hooks-locations][@ref-devin-import-disable]。用户级 `.claude` 路径（`~/.claude.json`、`~/.claude/settings.json` 等）同样属于导入面 [@ref-devin-hooks-locations]。其二，插件 hook 只在安装了该插件的本地会话注册、且 fail open [@ref-devin-plug-format]。其三，权限与信任层面：hook 运行 shell 命令，受操作系统与工作区信任影响；`--respect-workspace-trust` 默认 `true`，非交互 `--print` 模式无法弹信任提示、在不受信目录会失败，脚本/CI 里要显式传 `--respect-workspace-trust false` [@ref-devin-cmd-flags]。沙箱（`--sandbox`）与团队强制策略是否限制 hook 进程、以及 hook 是否需要逐文件授权，来源没有说明；partial。

## 诊断 {#hooks-diagnostics}

`/hooks` 斜杠命令列出**当前已加载**的所有 hook 及其 ID、事件类型与来源文件 [@ref-devin-hooks-verify]。命令参考把它归在 Extensibility 一类，与 `/mcp` 并列 [@ref-devin-cmd-ext]。这是"hook 被发现了吗、来自哪个文件"最直接的答案。缺口：没有 hook 执行历史、匹配计数或失败明细的查看入口；配置改动何时生效（是否要重启会话）未在来源中写明，只有 `read_config_from` 这类导入开关明确在会话启动时读取 [@ref-devin-import-how]。partial。
