---
schema_version: 3
record_kind: production
edition_id: bob-cli-hooks-v1
harness_id: bob
topic: hooks
title: "Bob Shell 的 Lifecycle Hooks：事件、配置、输入输出与诊断"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-bob-hooks-events, ref-bob-changelog-hooks]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-bob-hooks-scopes, ref-bob-hooks-trust, ref-bob-trust-hooks, ref-bob-changelog-enforced]
  - section_id: hooks-schema-fields
    surface_ids: [cli]
    source_refs: [ref-bob-hooks-schema, ref-bob-hooks-fields]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-bob-hooks-payloads, ref-bob-hooks-exit, ref-bob-hooks-command, ref-bob-hooks-limits]
  - section_id: hooks-order-limits
    surface_ids: [cli]
    source_refs: [ref-bob-hooks-command, ref-bob-hooks-limits, ref-bob-hooks-manage]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-hooks-manage, ref-bob-hooks-command, ref-bob-config-logs, ref-bob-changelog-hooks]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-bob-hooks-events, ref-bob-changelog-hooks]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-bob-hooks-scopes, ref-bob-hooks-trust]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-bob-hooks-payloads, ref-bob-hooks-command]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-bob-hooks-payloads, ref-bob-hooks-exit]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-limits
        status: partial
        source_refs: [ref-bob-hooks-command, ref-bob-hooks-limits]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-bob-hooks-trust, ref-bob-trust-hooks, ref-bob-changelog-enforced]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-bob-hooks-manage, ref-bob-config-logs]
---

## 事件与时点 {#hooks-events}

Lifecycle hooks 让你在会话的特定时点运行 shell 命令，用来记录活动、向模型注入上下文、拦截动作或启动后续自动化，而不必改动 Bob Shell 本身。文档给出的第一方事件如下。[@ref-bob-hooks-events]

| 事件 | 触发时点 | 可否阻断 | stdout 处理 |
| :-- | :-- | :-- | :-- |
| `SessionStart` | 会话开始一次 | 否 | 作为上下文注入 |
| `UserPromptSubmit` | 每次提交提示词 | 是（退出码 2） | 作为上下文注入 |
| `PreToolUse` | 匹配的工具运行前 | 是（退出码 2） | 忽略 |
| `PostToolUse` | 匹配的工具完成后 | 否 | 忽略 |
| `PreCompact` | 上下文压缩开始前 | 是（退出码 2） | 忽略 |
| `PostCompact` | 上下文压缩完成后 | 否 | 忽略 |
| `Stop` | agent 停止时 | 否 | 忽略 |

压缩相关的两个事件来自 2.0.3 的变更说明，`PreCompact` 用于在不满足条件时阻止压缩，`PostCompact` 用于压缩完成后收尾。[@ref-bob-changelog-hooks] 文档没有记录除这七个之外的插件事件来源。

## 配置入口与作用域 {#hooks-entry}

Hook 定义在 settings 的 `hooks` 键下，Bob Shell 合并两处来源：全局 `~/.bob/settings/settings.json`（对所有工作区生效）、工作区 `.bob/settings.json`（只对当前项目生效）。全局 hook 总会运行，工作区 hook 叠加在全局之上。[@ref-bob-hooks-scopes]

信任条件会改变生效范围：工作区 hook 只在受信任文件夹里运行，文件夹不可信时 `.bob/settings.json` 不加载，工作区级 hook 被静默跳过；全局 settings 里的 hook 不受文件夹信任影响。[@ref-bob-hooks-trust] 在 headless（`bob run`）场景下，只要文件夹不是显式 `DONT_TRUST`，全局 hook 都会执行，工作区 hook 在受信任或未决（unresolved）文件夹里同样加载。[@ref-bob-trust-hooks]

企业侧还有一个上游来源：管理员可用 `EnforcedHooks` 策略注入 hook，它们在用户自定义 hook 之前执行，且不能被用户覆盖或关闭。[@ref-bob-changelog-enforced]

## Schema 与字段 {#hooks-schema-fields}

Hook 配置结构（逐字来自 Lifecycle hooks 页 “Hook schema”）：[@ref-bob-hooks-schema]

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^write_file$",
        "hooks": [
          {
            "type": "command",
            "command": "sh .bob/hooks/check.sh",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

各字段含义与默认值：[@ref-bob-hooks-fields]

| 字段 | 类型 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| `type` | `command` 或 `https` | 无 | 必填，handler 类型 |
| `command` | string | 无 | `type` 为 `command` 时必填；macOS/Linux 用 `sh -c` 执行，Windows 用 `cmd /c` |
| `url` | string | 无 | `type` 为 `https` 时必填，事件负载发往该 HTTPS 地址 |
| `matcher` | string | 无 | 可选正则，仅 `PreToolUse`、`PostToolUse` 用于匹配工具名；省略即匹配所有工具 |
| `timeout` | number | 10 秒 | hook 被停止前的秒数，设 0 关闭超时 |

## 输入、输出与退出码 {#hooks-io}

每个事件通过 stdin 收到 JSON：`SessionStart`、`PreCompact`、`PostCompact`、`Stop` 只有 `event` 与 `session_id`；`UserPromptSubmit` 额外带 `prompt`；`PreToolUse` 带 `tool` 与 `input`；`PostToolUse` 再带 `output`。[@ref-bob-hooks-payloads] 文档给出的 `PreToolUse` 负载示例：[@ref-bob-hooks-payloads]

```json
{
  "event": "PreToolUse",
  "session_id": "ses_01abc123",
  "tool": "write_file",
  "input": {
    "path": "src/index.ts",
    "content": "..."
  }
}
```

输出与阻断规则：`SessionStart` 的 stdout 作为会话上下文注入模型，`UserPromptSubmit` 的 stdout 与提示词一起进入上下文；`PreToolUse`、`PostToolUse`、`PreCompact`、`PostCompact`、`Stop` 的 stdout 被忽略。[@ref-bob-hooks-payloads] 退出码语义为：0 成功；2 阻断当前动作（仅对 `UserPromptSubmit`、`PreToolUse`、`PreCompact` 有效）；其它非零值按非阻断失败处理，记录后忽略。[@ref-bob-hooks-exit]

执行环境：命令的工作目录即任务工作目录（Bob Shell 正在处理的文件夹）；stderr 写入 Bob Shell 日志但不影响 hook 结果；hook 以你的完整用户权限运行，没有沙箱隔离。[@ref-bob-hooks-command][@ref-bob-hooks-limits]

## 顺序、超时与当前限制 {#hooks-order-limits}

文档没有定义多个匹配 hook 之间的执行顺序、是否并发、是否去重，也没有给出失败重试策略；可以确定的只有每个 hook 的 `timeout`（默认 10 秒，0 为不限）以及非零退出码的“记录并忽略”行为。[@ref-bob-hooks-command][@ref-bob-hooks-limits] 这一点是本章的显式缺口。

官方列出的尚未支持能力包括：除 `command` 与 `https` 之外的 handler 类型（function hook、内联脚本等）；按定时器或外部事件触发的 scheduled hook；在提示词或工具输入抵达模型前改写它们；hook 的沙箱化运行；独立的 hook 遥测；以及从非阻断事件（`SessionStart`、`PostToolUse`、`PostCompact`、`Stop`）返回退出码 2 来阻断。[@ref-bob-hooks-limits]

管理入口：`/hooks` 打开对话框，列出所有全局与工作区 hook 的事件类型、matcher、作用域、状态与命令，并可逐个开关；磁盘上的 hook 设置变化时列表会自动刷新。[@ref-bob-hooks-manage]

## 诊断 {#hooks-diagnostics}

- `/hooks` 是查看“是否被发现、是否启用、匹配什么”的主入口，并显示每条 hook 的作用域与命令。[@ref-bob-hooks-manage]
- 想知道 hook 实际收到什么，可以写一个把所有 stdin 追加到文件的通用脚本；文档给出的做法是在脚本里先写入时间戳，再 `cat` 追加输入内容。[@ref-bob-hooks-manage]
- 执行失败与 stderr 都在日志里：stderr 写入 Bob Shell 日志但不影响 hook 结果，日志文件位于 `~/.bob/logs/shell/`（滚动保留最多 10 个文件、每个上限 5 MB）。[@ref-bob-hooks-command][@ref-bob-config-logs]
- 事件与配置同时在变化的场景有版本证据：2.0.3 引入 `PreCompact`/`PostCompact` 与 HTTPS handler。[@ref-bob-changelog-hooks]

配置修改的生效时机文档没有明确说明；`/hooks` 对话框会自动刷新说明读取是动态的，但是否需要重启会话未被验证。
