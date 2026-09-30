---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-hooks-v1
harness_id: factory-droid
topic: hooks
title: "Droid CLI 的 Hooks：配置作用域、事件、输入输出与执行条件"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-fd-hooks-config, ref-fd-hooks-quickstart, ref-fd-hooks-org, ref-fd-settings-hooks]
  - section_id: hooks-structure
    surface_ids: [cli]
    source_refs: [ref-fd-hooks-structure, ref-fd-repo-hooks-mcpname, ref-fd-hooks-plugin, ref-fd-plugins-hooks]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-fd-hooks-events, ref-fd-hooks-notif]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-fd-hooks-input, ref-fd-hooks-output, ref-fd-hooks-pretool, ref-fd-hooks-control]
  - section_id: hooks-execution
    surface_ids: [cli]
    source_refs: [ref-fd-repo-hooks-exec, ref-fd-repo-hooks-safety, ref-fd-settings-hooks, ref-fd-hooks-org, ref-fd-hooks-plugin, ref-fd-repo-hooks-org]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-hooks-security, ref-fd-repo-hooks-safety, ref-fd-hooks-debug, ref-fd-repo-hooks-exec]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-fd-hooks-events, ref-fd-hooks-notif]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-fd-hooks-config, ref-fd-hooks-quickstart, ref-fd-hooks-org]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-fd-hooks-input]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-fd-hooks-output, ref-fd-hooks-pretool, ref-fd-hooks-control]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-execution
        status: answered
        source_refs: [ref-fd-repo-hooks-exec]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-execution
        status: answered
        source_refs: [ref-fd-settings-hooks, ref-fd-hooks-org, ref-fd-hooks-plugin, ref-fd-repo-hooks-safety]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-fd-hooks-debug, ref-fd-repo-hooks-safety, ref-fd-hooks-security]
---

## 配置入口与作用域 {#hooks-entry}

本章的固定来源是官方文档站 `harness/hooks` 页面快照（https://docs.factory.com/harness/hooks.md）、`droid-cli/settings` 页面快照，以及官方文档仓库 `Factory-AI/factory` 提交 `485a0c3b5d3d11c52d50cd2a8889e1a71e86905a` 中的 `docs/reference/hooks-reference.mdx`。CLI 本体不开源，整章按 source_only 阅读。

Hooks 与 settings 同级存放 [@ref-fd-hooks-config]：

| 作用域 | 文件 | 说明 |
| :-- | :-- | :-- |
| User | `~/.factory/hooks.json` | 对本机所有项目生效 |
| Project | `.factory/hooks.json` | 提交后与队友共享 |
| Enterprise | org 托管设置 | 由 Enterprise Controls 下发 |
| Legacy | `.factory/hooks/hooks.json` | 仍会加载；下一次保存会写到 `.factory/hooks.json` 并把旧文件归档为 `hooks/hooks.migrated.json` |

`hooks.json` 不存在时，Droid 还会从对应 `settings.json` 的顶层 `hooks` 键读取 hook 声明。[@ref-fd-hooks-config]

最小注册流程用 `/hooks`：管理器有 User、Project、Plugins、Effective 四个标签页，User 页写入 `~/.factory/hooks.json`，Project 页写入 `.factory/hooks.json`，Plugins 与 Effective 只读；选择事件、填 matcher、填命令、保存即可。[@ref-fd-hooks-quickstart]

组织可以把权威 hook 写进托管设置：`hooks` 字段按事件名组织，结构与 `hooks.json` 相同；`allowManagedHooksOnly` 为 `true` 时只加载 org 托管 hook 与 org 启用插件的 hook，用户与项目级 hook 被忽略。托管 hook 总是加载（除非 hooks 被全局关闭），低层不能移除它们。[@ref-fd-hooks-org]

`hooksDisabled` 设置提供全局开关：`false`（默认）正常执行，`true` 停用所有 hook 而不删除配置；也可以在 `/hooks` 菜单或 `/settings` 里切换。`showHookOutput` 设为 `true` 时把 hook 的 stdout/stderr 显示到会话记录里便于调试。[@ref-fd-settings-hooks]

## 结构与匹配规则 {#hooks-structure}

独立的 `hooks.json` 直接以事件名为键；写进 `settings.json` 时把同一张事件表包在顶层 `hooks` 键里。[@ref-fd-hooks-structure]

```json
{
  "PreToolUse": [
    {
      "matcher": "Execute",
      "commandRegex": "^git ",
      "hooks": [
        {
          "type": "command",
          "command": "/usr/local/bin/audit-git-command.sh",
          "timeout": 30
        }
      ]
    }
  ]
}
```

上例来自官方 `harness/hooks` 页面的 Structure 小节（独立文件形态）。字段与语义 [@ref-fd-hooks-structure]：

| 字段 | 必填 | 行为 |
| :-- | :-- | :-- |
| `matcher` | 否 | 空、省略或 `*` 匹配一切；精确字符串匹配单个工具或生命周期 matcher；支持正则且大小写敏感 |
| `commandRegex` | 否 | 针对 Execute 命令的附加正则，匹配 Droid 已知的实际 shell 命令串；非法正则被跳过 |
| `hooks` | 是 | 该 matcher 组的命令数组 |
| `type` | 是 | 目前只支持 `"command"` |
| `command` | 是 | 执行的 shell 命令，JSON 输入从 stdin 传入 |
| `timeout` | 否 | 单条命令超时，单位秒，默认 `60` |

常见工具 matcher 有 `Execute`、`Read`、`Edit`、`Create`、`ApplyPatch`、`LS`、`Glob`、`Grep`、`Task`、`FetchUrl`、`WebSearch`；MCP 工具用 `mcp__server__tool` 命名模式，因此 `mcp__.*` 可匹配全部 MCP 工具。[@ref-fd-hooks-structure][@ref-fd-repo-hooks-mcpname]

命令必须写绝对路径：hook 在 Droid 的当前工作目录下执行，该目录可能与仓库根不同；项目内脚本用环境变量 `FACTORY_PROJECT_DIR` 拼绝对路径，全局脚本写完整路径。[@ref-fd-hooks-structure]

插件 hook 放在插件根的 `hooks/hooks.json`，加载时与 user、project、托管 hook 合并；命令里可以用 `${DROID_PLUGIN_ROOT}`、`$DROID_PLUGIN_ROOT`、`${CLAUDE_PLUGIN_ROOT}` 或 `$CLAUDE_PLUGIN_ROOT`，Droid 在加载插件 hook 时把它们展开为已安装插件的缓存路径。插件 hook 与用户 hook 一起参与同一事件的匹配。[@ref-fd-hooks-plugin][@ref-fd-plugins-hooks]

## 事件与触发时点 {#hooks-events}

官方事件表 [@ref-fd-hooks-events]：

| 事件 | 触发时点 | matcher 或关键字段 | 常见用途 |
| :-- | :-- | :-- | :-- |
| `PreToolUse` | Droid 组装完工具参数、工具执行之前 | `tool_name`、`tool_input` | 阻断危险操作、放行安全工具、改写工具输入 |
| `PostToolUse` | 工具完成后立即 | `tool_name`、`tool_input`、`tool_response` | 格式化文件、跑校验、回灌反馈 |
| `UserPromptSubmit` | 用户提交提示词后、Droid 处理之前 | `prompt`、`has_images` | 校验提示词或注入额外上下文 |
| `Notification` | Droid 发出通知时 | `message`、`notification_type` | 桌面提醒、合规日志 |
| `Stop` | 主 Droid 即将结束响应时 | `stop_hook_active`、`tool_execution_count`、`elapsed_time` | 要求最终检查或继续追加指令 |
| `SubagentStop` | Task 启动的子代理结束时 | `task_name`、`task_result`、`task_error`、`stop_hook_active` | 校验子代理产出 |
| `PreCompact` | 手动或自动压缩上下文之前 | `trigger`（`manual`/`auto`）、`custom_instructions`、`message_count`、`estimated_tokens` | 保存上下文或加压缩指引 |
| `SessionStart` | 会话启动、恢复、清空或压缩后启动时 | `source`（`startup`/`resume`/`clear`/`compact`） | 载入本地上下文 |
| `SessionEnd` | 会话结束时 | `reason`（`clear`/`logout`/`prompt_input_exit`/`other`）、`session_duration_ms`、`message_count` | 清理、审计、会话总结 |

`Notification` 的类型有 `permission_prompt`（等待授权）、`idle_prompt`（等待用户输入，包括用户刚取消回合）、`auth_success`、`elicitation_dialog`。用户取消回合时发出的是信息性的 `Notification` 而不是 `Stop`，因此 hook 无法覆盖用户停止回合的决定。[@ref-fd-hooks-notif]

## 输入与输出 {#hooks-io}

每个 hook 从 stdin 收到 JSON，公共字段有 `session_id`、`transcript_path`、`cwd`、`permission_mode`（`off`、`spec`、`auto-low`、`auto-medium`、`auto-high`）、`hook_event_name`，以及可选的 `message_id`；当这些值是可字符串化类型时也会以环境变量暴露。工具类事件另外带 `tool_name`、`tool_input`，`PostToolUse` 还带 `tool_response`，其具体结构取决于工具。[@ref-fd-hooks-input]

输出用退出码、stderr、stdout 与可选 JSON 表达 [@ref-fd-hooks-output]：

| 输出 | 效果 |
| :-- | :-- |
| 退出码 `0` | 成功；`UserPromptSubmit` 与 `SessionStart` 的 stdout 可以加入上下文，其它事件只在 transcript 视图可见 |
| 退出码 `2` | 阻断或纠正反馈：`PreToolUse` 阻断工具调用，`PostToolUse` 与 `Stop` 把 stderr 回灌给 Droid，`UserPromptSubmit` 阻断提示词处理；其它生命周期事件只把 stderr 显示给用户 |
| 其它非零退出 | 非阻断错误，记录 stderr 并在事件允许处继续 |
| JSON `continue: false` | 在 hook 执行后停止后续处理，可用 `stopReason` 说明 |
| JSON `suppressOutput: true` | 在聊天视图中隐藏成功的 hook 输出，详细 transcript 中仍保留 |

`PreToolUse` 用 `hookSpecificOutput.permissionDecision` 控制工具调用：`allow` 可绕过常规授权提示，`deny` 阻断并把原因回给 Droid，`ask` 强制用户确认；`updatedInput` 可以在执行前改写工具参数。[@ref-fd-hooks-pretool]

其余控制面 [@ref-fd-hooks-control]：`PostToolUse` 的 `decision: "block"` 会把 `reason` 回给 Droid，`hookSpecificOutput.additionalContext` 追加上下文；`UserPromptSubmit` 的 `decision: "block"` 阻止提示词处理并把 `reason` 显示给用户，未阻断时 `additionalContext` 被追加；`Stop` 与 `SubagentStop` 的 `decision: "block"` 阻止停止，必须提供 `reason`；`SessionStart` 的 `additionalContext` 追加到新会话上下文；`SessionEnd` 不能阻断会话结束，只用于清理与记录。

## 执行顺序、并发与生效条件 {#hooks-execution}

官方仓库的 hooks 参考文档给出执行细节 [@ref-fd-repo-hooks-exec]：

- **超时**：默认每条命令 60 秒执行上限，可按命令配置；单条命令超时不影响其它命令。
- **并行**：所有匹配的 hook 并行执行。
- **去重**：完全相同的 hook 命令会被自动去重。
- **环境**：在 Droid 的当前目录与环境中运行，`FACTORY_PROJECT_DIR` 是该次启动的项目根绝对路径。
- **输出去向**：`PreToolUse`/`PostToolUse`/`Stop`/`SubagentStop` 的进度显示在 transcript（Ctrl-R）；`Notification`/`SessionEnd` 只写入 `--debug` 日志；`UserPromptSubmit`/`SessionStart` 的 stdout 作为上下文加入。

生效条件 [@ref-fd-repo-hooks-safety]：

1. Droid 在启动时对 hooks 做一次快照。
2. 整个会话使用这份快照。
3. hooks 被外部修改时会给出警告。
4. 要让改动生效，必须在 `/hooks` 菜单里复核确认。

这条快照机制是为了防止恶意 hook 修改影响当前会话；因此「文件已改但行为没变」是设计内行为，不是 bug。

其它条件：`hooksDisabled` 全局关闭所有 hook；`allowManagedHooksOnly` 为 `true` 时只加载 org 托管与 org 启用插件的 hook；org 托管 hook 总是加载且低层不能移除；插件的 hook 只有在插件启用并加载后才参与合并。[@ref-fd-settings-hooks][@ref-fd-hooks-org][@ref-fd-hooks-plugin]

官方仓库的参考文档给出同一套托管 hook 的示例：`allowManagedHooksOnly: true` 加 `hooks.PreToolUse` 的 `Execute` matcher 调用审计脚本，并强调 `hooks` 与 `allowManagedHooksOnly` 都是企业/org 级设置、经托管设置下发，个人用户不能覆盖或削弱。[@ref-fd-repo-hooks-org]

**缺口**：多个来源（user、project、plugin、org）之间的具体先后顺序，以及同一事件内不同 matcher 组的执行次序，固定来源只说明「并行执行」而未给出顺序保证。[@ref-fd-repo-hooks-exec]

## 安全与调试 {#hooks-diagnostics}

- hook 以你的本地环境与凭据自动运行，注册前要逐条审阅命令；输入应视为不可信 JSON，验证并清理路径、提示词与命令串，给 shell 变量加引号，阻断路径穿越与敏感路径（`.env`、`.git/`、凭据、部署密钥），优先把脚本签入 `.factory/hooks/` 而不是写很长的内联单行命令。[@ref-fd-hooks-security]
- Droid 在启动时对 hooks 做快照、在外部修改时告警，并要求在 `/hooks` 界面复核后才采纳改动；调试时先确认 `/hooks` 里确实注册了该 hook。[@ref-fd-repo-hooks-safety]
- 常见症状与排查表 [@ref-fd-hooks-debug]：hook 不执行时确认事件键名、matcher 大小写以及 hooks 是否被关闭；对错误工具执行时注意 matcher 大小写敏感并改用精确名或更窄的正则；找不到脚本时改用绝对路径或 `FACTORY_PROJECT_DIR` 拼接；JSON 解析失败时记得输入来自 stdin，先用样例 JSON 测试；hook 挂起时缩短 `timeout` 并检查外部网络或进程调用。
- `droid --debug` 打印 hook 匹配与执行的详细信息，包括「Executing hooks for …」「Matched … hooks for query …」以及带超时与退出状态的命令执行行，用来区分「没匹配」「匹配了但命令失败」「命令成功但输出没到预期位置」。[@ref-fd-hooks-debug][@ref-fd-repo-hooks-exec]
