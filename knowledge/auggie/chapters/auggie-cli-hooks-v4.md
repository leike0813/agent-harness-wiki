---
schema_version: 3
record_kind: production
edition_id: auggie-cli-hooks-v4
harness_id: auggie
topic: hooks
title: "Auggie CLI 的 Hook 事件、输入输出与执行细节（1.x 文档线）"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-overview, ref-auggie-repo-plugin-hooks, ref-auggie-repo-changelog, ref-auggie-docs-hooks-pretooluse, ref-auggie-docs-hooks-posttooluse, ref-auggie-docs-hooks-stop, ref-auggie-docs-hooks-sessionstart, ref-auggie-docs-hooks-sessionend, ref-auggie-docs-hooks-common, ref-auggie-docs-plugins-components, ref-auggie-1x-hooks-events-note, ref-auggie-1x-hooks-promptsubmit, ref-auggie-1x-hooks-notification, ref-auggie-1x-hooks-pretooluse, ref-auggie-1x-hooks-sessionstart, ref-auggie-1x-hooks-stop]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-locations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-scripts, ref-auggie-1x-hooks-locations, ref-auggie-1x-hooks-structure, ref-auggie-1x-hooks-scripts]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-input, ref-auggie-docs-hooks-common, ref-auggie-docs-hooks-event-fields, ref-auggie-docs-hooks-envvars, ref-auggie-docs-hooks-metadata-options, ref-auggie-docs-hooks-security, ref-auggie-repo-plugin-hooks, ref-auggie-repo-1x-hooks-tool-names, ref-auggie-repo-1x-hooks-payload, ref-auggie-1x-hooks-common-fields, ref-auggie-1x-hooks-tool-fields, ref-auggie-1x-hooks-stop, ref-auggie-1x-hooks-metadata]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-matrix, ref-auggie-docs-hooks-json, ref-auggie-docs-hooks-event-json, ref-auggie-docs-hooks-limitations, ref-auggie-1x-hooks-output, ref-auggie-1x-hooks-json, ref-auggie-1x-hooks-json-post]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-execution, ref-auggie-docs-hooks-limitations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-matrix, ref-auggie-docs-hooks-troubleshooting, ref-auggie-1x-hooks-locations, ref-auggie-1x-hooks-pretooluse, ref-auggie-1x-hooks-execution]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-interactive-additional, ref-auggie-docs-hooks-logs, ref-auggie-docs-hooks-debug, ref-auggie-docs-hooks-testing, ref-auggie-docs-hooks-troubleshooting, ref-auggie-docs-config-manual, ref-auggie-1x-hooks-debug, ref-auggie-1x-hooks-events-note, ref-auggie-1x-settings-keybindings]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-auggie-1x-hooks-promptsubmit, ref-auggie-1x-hooks-notification, ref-auggie-1x-hooks-pretooluse, ref-auggie-1x-hooks-stop, ref-auggie-1x-hooks-sessionstart, ref-auggie-docs-hooks-posttooluse, ref-auggie-docs-hooks-sessionend, ref-auggie-repo-plugin-hooks, ref-auggie-1x-hooks-events-note]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-auggie-1x-hooks-locations, ref-auggie-1x-hooks-structure, ref-auggie-1x-hooks-scripts]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-auggie-1x-hooks-common-fields, ref-auggie-1x-hooks-tool-fields, ref-auggie-1x-hooks-stop, ref-auggie-1x-hooks-metadata, ref-auggie-repo-1x-hooks-tool-names, ref-auggie-repo-1x-hooks-payload]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-auggie-1x-hooks-output, ref-auggie-1x-hooks-json, ref-auggie-1x-hooks-json-post]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs: [ref-auggie-1x-hooks-locations, ref-auggie-1x-hooks-pretooluse, ref-auggie-1x-hooks-execution]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: partial
        source_refs: [ref-auggie-1x-hooks-locations]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-auggie-1x-hooks-debug, ref-auggie-1x-hooks-events-note, ref-auggie-docs-hooks-testing, ref-auggie-docs-config-manual]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档 “Hooks” 页（页顶标注 1.x 文档线）与官方仓库提交 `8bd7186ea04e77d11f63e5850482643c8767666b` 的 `docs/1.x-preview-guide.md`、`CHANGELOG.md`。文档快照的 `version_applicability` 仍为 `unknown`，这些结论不证明任何具体 npm 版本。0.x 的 hook 行为保留在原 v3 edition 与旧引用中，本章只在差异处标注版本线。

## 事件 {#hooks-events}

1.x 文档列出七类事件：`PreToolUse`、`PostToolUse`、`Stop`、`SessionStart`、`SessionEnd`、`PromptSubmit`、`Notification`。[@ref-auggie-1x-hooks-promptsubmit][@ref-auggie-1x-hooks-notification]

- `PreToolUse` 在工具执行前运行，可以阻断；`PostToolUse` 在工具完成后运行，可给 agent 反馈但不能阻断执行。[@ref-auggie-1x-hooks-pretooluse][@ref-auggie-docs-hooks-posttooluse]
- `Stop` 在 agent 停止响应时运行（正常结束或用户中断），`agent_stop_cause` 说明原因。[@ref-auggie-1x-hooks-stop]
- `SessionStart` 在会话开始时运行；1.x 明确它**在后台运行，输出不会加入 agent 上下文**。`SessionEnd` 在会话结束时运行。[@ref-auggie-1x-hooks-sessionstart][@ref-auggie-docs-hooks-sessionend]
- `PromptSubmit` 在每次提交 prompt、agent 开始工作前运行，`user_prompt` 字段带 prompt；后台运行，不能阻断或修改 prompt。`Notification` 在交互模式显示通知或云 agent 上报事件时运行，字段为 `notification_type` 与 `notification_message`；后台运行，不能阻断任何操作。[@ref-auggie-1x-hooks-promptsubmit][@ref-auggie-1x-hooks-notification]
- 1.x 还接受 Cursor 风格事件名并映射到上述事件：`beforeShellExecution`、`beforeReadFile`、`beforeMCPExecution` 作为 PreToolUse；`afterShellExecution`、`afterFileEdit`、`afterMCPExecution` 作为 PostToolUse；`stop` 作为 Stop。[@ref-auggie-1x-hooks-events-note]

0.x 文档只展开 `PreToolUse`、`PostToolUse`、`Stop`、`SessionStart`、`SessionEnd`；仓库官方 `warp` 插件的 `hooks/hooks.json` 早已注册 `PromptSubmit` 与 `Notification`，但当时文档没有单独说明。1.x 文档补齐了这两个事件，因此这是版本线差异，不是来源冲突。[@ref-auggie-repo-plugin-hooks][@ref-auggie-1x-hooks-promptsubmit]

同名事件在插件中是同一来源：插件用相同的 `hooks.json` 结构与相同事件名声明 hook，并可用插件根变量拼接脚本路径。CHANGELOG 记录 `PreToolUse` 与 `PostToolUse` hook 现在也在 sub-agent 会话中运行。[@ref-auggie-docs-plugins-components][@ref-auggie-repo-changelog]

## 注册位置与字段 {#hooks-entry}

1.x 明确：Auggie 读取下列**全部**文件，并运行**每一个匹配的 hook**；设置文件只决定来源，不是互相覆盖的替代关系。优先级从高到低：受管 `/etc/augment/settings.json`（Windows 为 `C:\ProgramData\Augment\settings.json`）→ `.augment/settings.local.json` → `.augment/settings.json` → `~/.augment/settings.json`。Cosmos 还会从 VFS 中的设置读取 hooks；启用的插件可从 `hooks/hooks.json` 添加 hook。[@ref-auggie-1x-hooks-locations]

结构：`hooks` 对象按事件类型分数组，每个元素含 `matcher`（可选）、`hooks` 数组与 `metadata`（可选）。[@ref-auggie-1x-hooks-structure]

| 字段 | 1.x 说明 |
| :-- | :-- |
| `matcher` | 匹配工具名，**大小写不敏感**，支持正则；`PreToolUse`／`PostToolUse` 可省略（默认 `".*"`）；其它事件不使用 |
| `hooks` | 命中后依次执行的 handler 数组 |
| `type` | 目前只支持 `"command"` |
| `command` | 脚本路径或任意命令行（例如 `python3 ~/.augment/hooks/check.py`），经系统 shell 运行；**没有扩展名要求** |
| `args` | 可选参数数组；设置后 `command` 直接带这些参数运行，不再经 shell |
| `timeout` | 可选，毫秒；默认 60000 |
| `metadata` | 可选，控制注入哪些附加字段 |

matcher 示例：`"bash"`、`"edit|write"`、`".*"`、`"mcp:*"`、`"mcp:.*_my-server$"`。1.x 另有一条 MCP 特例：只有 `".*"`（或不写 matcher）能匹配 MCP 工具；`"bash"` 这类具体名字永远不会匹配 MCP 工具。[@ref-auggie-1x-hooks-structure]

`command` 在 Unix 走 `/bin/sh`、Windows 走 `cmd.exe`；直接指向脚本时按扩展名选择解释器的要求属于 0.x 文档（1.x 不再要求扩展名，`args` 可以显式传解释器与脚本）。[@ref-auggie-1x-hooks-scripts][@ref-auggie-docs-hooks-scripts]

**生效条件**：受管设置只读；项目级设置可以让仓库自带 hook 配置并对所有贡献者自动生效；`PreToolUse` 与 `PostToolUse` **同步**运行，agent 等待其完成；`Stop`、`SessionStart`、`SessionEnd`、`PromptSubmit`、`Notification` **后台**运行，不延迟 agent。只有 `PreToolUse` 能阻断工具。[@ref-auggie-1x-hooks-locations]

## 输入 {#hooks-input}

hook 通过 **stdin** 收到一个 JSON 事件对象。1.x 的公共字段是 `hook_event_name`、`hook_type`（与前者同值）、`cwd`、`conversation_id`、`workspace_roots`。[@ref-auggie-1x-hooks-common-fields]

工具事件（`PreToolUse`／`PostToolUse`）附加：`tool_name`、`tool_input`、`is_mcp_tool`；`PostToolUse` 还有 `tool_output`、`tool_error`、`tool_result`（原始结果块）、`tool_is_error` 与 `file_changes`。`file_changes` 只覆盖 `write` 与 `edit`，字段为 `path`、`changeType`、`content`、`oldContent`；`bash` 或其它工具造成的改动不在其中，需要清单时应查 `git status`／`git diff`。[@ref-auggie-1x-hooks-tool-fields]

**`file_changes` 的版本线**：0.x 文档把“修改文件列表”描述为 shell 执行类 hook 会尝试注入的字段；1.x 预览说明已从 `bash` hooks 移除，1.x 文档则把它限定为 `write`／`edit` 的 PostToolUse 字段。两段说法可以并存：0.x 的 shell 注入行为已退场，1.x 只在文件编辑工具上保留该字段。[@ref-auggie-repo-1x-hooks-payload][@ref-auggie-1x-hooks-tool-fields]

`Stop` 事件带 `agent_stop_cause`：`end_turn`、`interrupted`、`empty_completion` 或 `error`。[@ref-auggie-1x-hooks-stop]

**`tool_name` 的版本线**：0.x 文档以 `launch-process`、`save-file` 一类长名举例；1.x 统一为 `read`、`edit`、`write`、`grep`、`find`、`bash`，并在预览期内把旧名保留为 hook matcher 的兼容别名（`/hooks` 会标出旧名）。只按 0.x 长名判断 `tool_name` 的脚本换到 1.x 会失配，应按规范名书写并容忍旧名。[@ref-auggie-repo-1x-hooks-tool-names][@ref-auggie-1x-hooks-pretooluse]

环境变量：`AUGMENT_PROJECT_DIR`（第一个工作区根，为空时取当前目录）、`AUGMENT_CONVERSATION_ID`、`AUGMENT_HOOK_EVENT`、`AUGMENT_TOOL_NAME`（仅工具事件）。1.x 文档仍列这四个。[@ref-auggie-docs-hooks-envvars]

元数据开关在配置里声明，默认全部关闭：`includeUserContext` 增加 `context`（`userEmail`、`modelName`、`timestamp`），全部事件可用；`includeMCPMetadata` 增加 `mcp_metadata`，仅工具事件；`includeConversationData` 在 `Stop` 增加 `conversation`（`userPrompt`、`agentTextResponse`、`agentCodeResponse`），在 `PreToolUse`／`PostToolUse` 增加 `user_prompt`。1.x 比 0.x 多了工具事件的 `user_prompt` 注入。[@ref-auggie-1x-hooks-metadata]

## 输出、退出码与阻断 {#hooks-output}

退出码语义：`0` 成功并继续；`2` 阻断错误（**仅 `PreToolUse`** 阻止工具执行）；其它退出码记录日志后继续。1.x 明确：`PreToolUse` 超时或崩溃时**工具仍会运行**，只有退出码 2 或 `deny` 决定能阻止它，因此安全 hook 应快速并 fail closed（无法判定时 exit 2）。[@ref-auggie-1x-hooks-output][@ref-auggie-1x-hooks-pretooluse]

通信矩阵（1.x）：[@ref-auggie-1x-hooks-output]

| 退出码 | 事件 | 输出流 | 展示给 | 行为 |
| :-: | :-- | :-- | :-- | :-- |
| 2 | PreToolUse | stderr | Agent | 阻断工具，agent 看到原因 |
| 2 | SessionStart | stderr | 用户 | 启动失败，用户需修配置 |
| 0 | PreToolUse | stderr／stdout | 用户 | 警告／成功消息 |
| 0 | PostToolUse | stderr／stdout | 用户 | 警告／成功消息 |
| 0 | SessionEnd | stdout | 用户 | 完成消息 |
| 其它 | 任意 | stderr | 用户 | 记录错误，继续 |

JSON 输出（仅退出码 0 时读取）：1.x 只把 `systemMessage` 列为所有事件通用的字段；各事件的 `hookSpecificOutput`：`PreToolUse` 支持 `permissionDecision: "deny"`＋`permissionDecisionReason`，以及 **`updatedInput`**（合并进原工具入参：返回的字段替换原值、未返回的保留；多个 hook 按顺序依次应用）；`PostToolUse` 支持 `decision: "block"`＋`reason` 与 `additionalContext`，其中 `block` 只把 `reason` 交给 agent，工具已经执行且不会被撤销，agent 也不会被停止。1.x 的输出参考没有 Stop 小节；0.x 文档中的 `Stop` `decision: "block"` 阻止结束属于 0.x 记录，不能当作 1.x 已验证行为。[@ref-auggie-1x-hooks-json][@ref-auggie-1x-hooks-json-post][@ref-auggie-docs-hooks-json]

1.x 与 0.x 的差异：0.x 文档说 `updatedInput` 未实现、`PostToolUse` 不能改工具输出；1.x 实现了 `updatedInput`（修改的是**输入**，不是输出）。0.x 文档还列出 `continue`、`stopReason`、`suppressOutput` 等公共 JSON 字段；1.x 页面只列 `systemMessage`，本章不再把其余字段当作 1.x 已文档化的契约。[@ref-auggie-1x-hooks-json][@ref-auggie-docs-hooks-limitations]

## 顺序、超时与失败处理 {#hooks-order}

- 执行顺序：`PreToolUse`／`PostToolUse` 的 hook 一次一个、按定义顺序执行；某个 hook 阻断工具时，该调用后续 hook 不再运行。其它事件（`Stop`、`SessionStart`、`SessionEnd`、`PromptSubmit`、`Notification`）的 hook 同时运行。[@ref-auggie-1x-hooks-execution]
- 默认超时 60 秒，可按 hook 用 `timeout` 覆盖。[@ref-auggie-1x-hooks-locations]
- 同步等待：`PreToolUse`、`PostToolUse` 运行期间 agent 等待；其余事件后台运行。[@ref-auggie-1x-hooks-locations]
- 失败处理：非 0／2 退出码只记录并继续；`PreToolUse` 超时或崩溃不阻断工具（fail open），这是 1.x 的新说明。[@ref-auggie-1x-hooks-pretooluse]
- 重复触发：`PreToolUse`／`PostToolUse` 对 subagent 的工具调用也会运行，因此一次父会话可能触发多次；文档没有给出其它去重规则。[@ref-auggie-1x-hooks-locations]
- 运行环境：`command` 经系统 shell 在当前目录执行，输入为 stdin JSON；`args` 设置后不经 shell。[@ref-auggie-1x-hooks-structure]

## 诊断 {#hooks-diagnostics}

- `/hooks` 查看已配置 hooks 与配置问题，并标出使用 0.x 工具名的 matcher。[@ref-auggie-1x-hooks-debug][@ref-auggie-1x-hooks-events-note]
- 日志：`auggie --log-level debug --log-file /tmp/auggie.log "your prompt here"`；0.x 文档给出的 `[HookExecutor]`／`[HookManager]`／`[hook-output-router]` 日志标记属于 0.x 记录。[@ref-auggie-docs-hooks-logs][@ref-auggie-1x-hooks-debug]
- 本地测试：构造事件 JSON 文件，用管道喂给脚本并检查退出码，再用 `jq` 校验输出。[@ref-auggie-docs-hooks-testing]
- 配置改动生效时机：hook 配置属于设置文件，手动修改后需要重启 Auggie；`/reload` 重载的是 keybindings、extensions、skills、prompts 与 themes，不包含 hook 配置。[@ref-auggie-docs-config-manual][@ref-auggie-1x-settings-keybindings]

**生效条件（partial）**：受管设置只读、项目设置自动生效、只有 `PreToolUse` 能阻断，这些已由 1.x 文档确认；工作区信任、沙箱或按 hook 的单独开关在固定来源中没有描述。
