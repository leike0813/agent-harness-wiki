---
schema_version: 3
record_kind: production
edition_id: codex-cli-hooks-v3
harness_id: codex
topic: hooks
title: "Codex CLI 主题章节：Hooks"
sections:
  - section_id: hooks-events-entry
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-hooks-events-source
      - ref-codex-cli-hooks-events-config
      - ref-codex-cli-hooks-config
      - ref-codex-cli-hooks-state-source
  - section_id: hooks-handlers-input-output
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-hooks-runtime-source
      - ref-codex-cli-hooks-handlers-config
      - ref-codex-cli-hooks-context-attribution-source
      - ref-codex-cli-hooks-append-context-metadata-source
      - ref-codex-cli-hooks-command-runner-metadata-source
      - ref-codex-cli-hooks-harness-fragment-metadata-source
      - ref-codex-cli-hooks-provenance-source
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-hooks-async-config
      - ref-codex-cli-hooks-handlers-config
      - ref-codex-cli-hooks-async-context-metadata-source
      - ref-codex-cli-hooks-runtime-context-type-source
      - ref-codex-cli-hooks-async-sender-source
      - ref-codex-cli-hooks-output-entry-shape-source
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-hooks-feature-config
      - ref-codex-cli-hooks-managed-config
      - ref-codex-cli-hooks-managed-repo-doc
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-hooks-managed-config
      - ref-codex-cli-hooks-state-source
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs:
          - ref-codex-cli-hooks-events-source
          - ref-codex-cli-hooks-events-config
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs:
          - ref-codex-cli-hooks-config
          - ref-codex-cli-hooks-state-source
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-handlers-input-output
        status: partial
        source_refs:
          - ref-codex-cli-hooks-runtime-source
          - ref-codex-cli-hooks-handlers-config
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-handlers-input-output
        status: partial
        source_refs:
          - ref-codex-cli-hooks-handlers-config
          - ref-codex-cli-hooks-context-attribution-source
          - ref-codex-cli-hooks-append-context-metadata-source
          - ref-codex-cli-hooks-command-runner-metadata-source
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs:
          - ref-codex-cli-hooks-async-config
          - ref-codex-cli-hooks-handlers-config
          - ref-codex-cli-hooks-async-context-metadata-source
          - ref-codex-cli-hooks-async-sender-source
          - ref-codex-cli-hooks-output-entry-shape-source
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs:
          - ref-codex-cli-hooks-feature-config
          - ref-codex-cli-hooks-managed-config
          - ref-codex-cli-hooks-managed-repo-doc
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-hooks-managed-config
          - ref-codex-cli-hooks-state-source
---

本主题的固定来源是官方配置参考快照（snapshot-codex-cli-configuration-doc）与 openai/codex 源码快照（snapshot-codex-repo）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 的任何版本，因此下文只陈述来源范围内的机制。本版把 hook 上下文注入的源码证据从 commit 67a7096 更新到 commit 1f7fe9b0afb301f895b2d56ae8c05c2cfb19e440；除"处理器输入输出"与"顺序与后台执行"两节外，其余小节沿用原结论与原来源范围。

## 事件与注册入口 {#hooks-events-entry}

第一方事件共 12 个：`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SessionEnd`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`、`Interrupt`。触发点分别在工具执行前、权限请求、工具执行后、压缩前后、会话开始与结束、子 agent 开始与结束、用户提交提示、停止与中断。源码把这些事件建模为 matcher 组数组（例如 `pre_tool_use`）。[@ref-codex-cli-hooks-events-source][@ref-codex-cli-hooks-events-config] 未验证：来源提到插件事件，但没有列出插件事件清单。

Hook 可内联写在 `config.toml` 的 `[hooks]` 表，也可放在 `hooks.json`（使用同一事件 schema）；结构是"事件名 → matcher 组数组 → hooks 处理器数组"。状态保存在 `state` 表（`enabled`、`trusted_hash`）。[@ref-codex-cli-hooks-config][@ref-codex-cli-hooks-state-source]

内联写在 `~/.codex/config.toml` 的一个完整最小块：

```toml
[[hooks.PreToolUse]]
matcher = "shell"

[[hooks.PreToolUse.hooks]]
type = "command"
command = "/usr/local/bin/log-shell.sh"
timeout = 30
```

字段与检查：`matcher` 过滤工具名（省略则匹配全部），`hooks` 是处理器数组，`type = "command"` 表示 command 处理器，`command` 是要运行的命令，`timeout` 是秒级超时。前提是 `features.hooks` 已开启，见下方生效条件小节。结果是匹配的工具执行前运行该命令。

`hooks.json` 使用同一 schema，例如：

```json
{
  "hooks": {
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "/usr/local/bin/warmup.sh" }] }
    ]
  }
}
```

未验证：固定来源确认文件名是 `hooks.json`，但没有给出它的搜索目录，因此这里不写具体路径。[@ref-codex-cli-hooks-config]

## 处理器类型与输入输出 {#hooks-handlers-input-output}

可用的处理器类型是 command 与 MCP tool（`type = "mcp_tool"`，带 `server`、`tool`、`input`）：

```toml
[[hooks.PostToolUse.hooks]]
type = "mcp_tool"
server = "context7"
tool = "record"
```

`prompt` 与 `agent` 处理器会被解析但跳过。[@ref-codex-cli-hooks-handlers-config]

输入状态 partial：源码 `run_pre_tool_use_hooks` 为 `PreToolUse` 构造请求，包含 `session_id`、`turn_id`、子 agent 上下文、`cwd`、工具名与工具输入；文档说明工具名是序列化到 hook stdin 的规范名。固定来源没有说明敏感内容如何从输入中过滤或脱敏。[@ref-codex-cli-hooks-runtime-source][@ref-codex-cli-hooks-handlers-config]

输出一节本版有实质变化：注入模型的 hook 附加上下文不再是裸字符串，而是带来源归因的结构。`codex_hooks::HookContext` 是由 `text` 字段（String）与 `metadata` 字段（ContentItemMetadata）组成的二元结构；处理器运行时结束时，command 处理器把自己的 `context_metadata` 固定为 `command_hook()` 构造器（定义在 `ContentItemMetadata` 上），这个构造器给出的 provenance 是 `Harness { hook: true }`。`append_additional_context` 接受该 metadata 并原样存进每条 `HookContext`，因此同一次运行里不同处理器产生的上下文可以带不同归因，而不是被统一抹平。[@ref-codex-cli-hooks-context-attribution-source][@ref-codex-cli-hooks-command-runner-metadata-source][@ref-codex-cli-hooks-append-context-metadata-source]

归因的取值范围由 `ContentItemProvenance` 界定：`Harness { hook: bool }` 的文档注释明确写"harness 管理的上下文，command-hook 输出与内置上下文相区分"，`hook` 为 `false` 时表示内置 harness 上下文。MCP tool 处理器走另一条来源，`tool(namespace)` 构造器（同样定义在 `ContentItemMetadata` 上） 记录工具命名空间而非 harness 归因。[@ref-codex-cli-hooks-provenance-source] 未验证：固定来源没有给出这段归因如何影响模型可见内容、工具审批或信任判断，因此这里只陈述归因字段本身的取值与来源，不推断其下游效果。

上下文落到会话时的渲染路径是 `HookAdditionalContext`：它的 role 是 `developer`，`content_kind` 是 `hooks.additional_context`，`content_metadata()` 直接返回 `HookContext` 里携带的 metadata。因此归因在注入时即绑定，而不是从渲染后的文本反推。[@ref-codex-cli-hooks-harness-fragment-metadata-source] 输出状态仍为 partial：除"附加上下文如何注入并带归因"之外，退出码或返回值如何继续、修改或阻断操作的完整语义在 Hooks 指南内，不在本 change 的固定来源内。

## 顺序与后台执行 {#hooks-order}

`async` 让 command hook 在后台运行、不阻塞触发操作（默认 `false`），`SessionEnd` 始终同步；`additionalContextLimit` 默认 `2500`，设为 `0` 时把完整上下文直接交给模型；处理器还可设 `statusMessage` 与 `commandWindows`。[@ref-codex-cli-hooks-async-config][@ref-codex-cli-hooks-handlers-config]

```toml
[[hooks.SessionStart.hooks]]
type = "command"
command = "/usr/local/bin/index-repo.sh"
async = true
additionalContextLimit = 0
```

字段与检查：这条命令在会话开始时运行，`async = true` 表示它在后台运行、不阻塞触发操作，`additionalContextLimit = 0` 表示该 hook 的完整上下文直接交给模型、不落盘截断。前提是 `features.hooks` 已开启；结果是会话开始时后台执行该命令。[@ref-codex-cli-hooks-async-config]

本节有一处需要显式记录的实现事实：`drain_async_hook_results` 从会话的异步结果通道取出条目，只保留 `HookOutputEntryKind::Context` 类别，并在这一步**重新构造** `HookContext`，把 `metadata` 填为 `command_hook()`（定义在 `ContentItemMetadata` 上）。原因是承载结果的 `HookOutputEntry` 只有 `kind` 与 `text` 两个字段，并不携带 metadata，排空时只能重建上下文；因此这一路径必然按 command-hook 归因注入。

这一硬编码不构成归因损失：能进入该通道的只有 `async` 为真的 `command` 处理器——异步调度在匹配到 `mcp_tool` 处理器时直接返回，而以 executor 作用域运行的处理器走另一条调度路径、不会发往该通道；而 command 处理器的运行时归因本就是 `command_hook()`。因此该重建与处理器运行时归因等价。[@ref-codex-cli-hooks-output-entry-shape-source][@ref-codex-cli-hooks-async-sender-source] 未验证：固定来源没有把上述调度分支写成独立说明，本结论由源码调用关系逐段核对得出。[@ref-codex-cli-hooks-async-context-metadata-source] 承载这些上下文的容器类型已同步改为 `HookContext` 的向量。[@ref-codex-cli-hooks-runtime-context-type-source]

本项状态 partial：多个 hook 之间的顺序、并发、重复触发、超时与失败处理未在固定来源中说明。[@ref-codex-cli-hooks-async-config]

## 生效条件 {#hooks-conditions}

`features.hooks` 开关启用从 `hooks.json` 或内联 `[hooks]` 加载的 hook（`features.codex_hooks` 是废弃别名）。[@ref-codex-cli-hooks-feature-config] 管理员可在 `requirements.toml` 设 `allow_managed_hooks_only = true`，忽略用户、项目、会话与插件 hook，只保留 managed hook；该键只在 `requirements.toml` 生效，写在 `config.toml` 不生效，且需要存在 managed hook 目录。[@ref-codex-cli-hooks-managed-config][@ref-codex-cli-hooks-managed-repo-doc]

`requirements.toml` 里的一个完整块（managed hook 目录在 macOS 与 Linux 用 `managed_dir`，Windows 另有 `windows_managed_dir`）：

```toml
allow_managed_hooks_only = true

[hooks]
managed_dir = "/etc/codex/hooks"
```

字段与检查：`allow_managed_hooks_only = true` 只保留 managed hook，`managed_dir` 必须是绝对路径且存在。前提是写在 `requirements.toml`；结果是用户、项目、会话与插件 hook 被忽略，只从该目录加载 managed hook。[@ref-codex-cli-hooks-managed-config]

## 诊断 {#hooks-diagnostics}

状态 partial：managed hook 目录必须是绝对路径且存在，否则不会加载；`state` 表中的 `enabled` 与 `trusted_hash` 可用于判断启用与信任状态。固定来源没有给出查看"哪些 hook 被匹配执行、哪些失败"的专门命令，也没有给出查询上述归因字段的命令行入口。[@ref-codex-cli-hooks-managed-config][@ref-codex-cli-hooks-state-source]
