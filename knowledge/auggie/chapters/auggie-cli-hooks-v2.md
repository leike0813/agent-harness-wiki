---
schema_version: 3
record_kind: production
edition_id: auggie-cli-hooks-v2
harness_id: auggie
topic: hooks
title: "Auggie CLI 的 Hook 事件、输入输出与执行细节"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-overview, ref-auggie-repo-plugin-hooks, ref-auggie-repo-changelog, ref-auggie-docs-hooks-pretooluse, ref-auggie-docs-hooks-posttooluse, ref-auggie-docs-hooks-stop, ref-auggie-docs-hooks-sessionstart, ref-auggie-docs-hooks-sessionend, ref-auggie-docs-hooks-common, ref-auggie-docs-plugins-components]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-locations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-scripts]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-input, ref-auggie-docs-hooks-common, ref-auggie-docs-hooks-event-fields, ref-auggie-docs-hooks-envvars, ref-auggie-docs-hooks-metadata-options, ref-auggie-docs-hooks-security, ref-auggie-repo-plugin-hooks]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-matrix, ref-auggie-docs-hooks-json, ref-auggie-docs-hooks-event-json, ref-auggie-docs-hooks-limitations]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-hooks-execution, ref-auggie-docs-hooks-limitations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-matrix, ref-auggie-docs-hooks-troubleshooting]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-interactive-additional, ref-auggie-docs-hooks-logs, ref-auggie-docs-hooks-debug, ref-auggie-docs-hooks-testing, ref-auggie-docs-hooks-troubleshooting, ref-auggie-docs-config-manual]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-auggie-docs-hooks-pretooluse, ref-auggie-docs-hooks-posttooluse, ref-auggie-docs-hooks-stop, ref-auggie-docs-hooks-sessionstart, ref-auggie-docs-hooks-sessionend, ref-auggie-docs-hooks-common, ref-auggie-repo-plugin-hooks]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-auggie-docs-hooks-locations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-scripts]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-auggie-docs-hooks-input, ref-auggie-docs-hooks-common, ref-auggie-docs-hooks-event-fields, ref-auggie-docs-hooks-envvars, ref-auggie-docs-hooks-metadata-options, ref-auggie-docs-hooks-security]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-auggie-docs-hooks-matrix, ref-auggie-docs-hooks-json, ref-auggie-docs-hooks-event-json, ref-auggie-docs-hooks-limitations]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs: [ref-auggie-docs-hooks-execution, ref-auggie-docs-hooks-limitations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-troubleshooting]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-auggie-docs-hooks-locations, ref-auggie-docs-hooks-structure, ref-auggie-docs-hooks-scripts]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-auggie-docs-interactive-additional, ref-auggie-docs-hooks-logs, ref-auggie-docs-hooks-debug, ref-auggie-docs-hooks-testing, ref-auggie-docs-hooks-troubleshooting, ref-auggie-docs-config-manual]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 事件与触发时点 {#hooks-events}

固定来源是官方文档站 “Hooks” 与 “Hooks Examples” 页、官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff` 中的官方市场插件（含真实 hook 配置），以及 CHANGELOG。[@ref-auggie-docs-hooks-overview][@ref-auggie-repo-plugin-hooks][@ref-auggie-repo-changelog]

文档逐事件说明了以下时点：[@ref-auggie-docs-hooks-pretooluse][@ref-auggie-docs-hooks-posttooluse][@ref-auggie-docs-hooks-stop][@ref-auggie-docs-hooks-sessionstart][@ref-auggie-docs-hooks-sessionend]

| 事件 | 触发时点 | 能否阻断 |
| :-- | :-- | :-- |
| `PreToolUse` | 工具执行**之前** | 可以（退出码 2 或 JSON `permissionDecision: "deny"`） |
| `PostToolUse` | 工具**完成后**立即 | 不能阻断工具，只能给 agent 追加反馈 |
| `Stop` | agent 停止响应时（正常结束或用户中断，字段 `agent_stop_cause` 说明原因） | 可以（`decision: "block"` 阻止结束） |
| `SessionStart` | Auggie 开始新会话时 | 可向 agent 注入上下文 |
| `SessionEnd` | 会话结束时 | 不能 |

`hook_event_name` 的取值枚举里还包含 `Notification`；仓库官方市场的 `warp` 插件在 `hooks/hooks.json` 中实际注册了 `SessionStart`、`Stop`、`Notification`、`PostToolUse`、`PreToolUse`、`PromptSubmit` 六类事件，其中 `PromptSubmit` 与 `Notification` 在文档的事件小节里没有单独展开说明——这是仓库示例可见、文档未展开的事件名。[@ref-auggie-docs-hooks-common][@ref-auggie-repo-plugin-hooks]

同名事件在插件中是同一来源：插件用相同的 `hooks.json` 结构与相同事件名声明 hook，并可用插件根变量拼接脚本路径。[@ref-auggie-docs-plugins-components]

CHANGELOG 记录 `PreToolUse` 与 `PostToolUse` hook 现在也在 sub-agent 会话中运行。[@ref-auggie-repo-changelog]

## 注册位置与字段 {#hooks-entry}

hook 配置写在 settings 文件中，位置按优先级从高到低：受管设置 `/etc/augment/settings.json`（Windows 为 `C:\ProgramData\Augment\settings.json`）→ 工作区根的 `.augment/settings.local.json` → 工作区根的 `.augment/settings.json` → 用户目录的 `.augment/settings.json`。受管设置不可被其它来源覆盖；项目设置随仓库对所有贡献者生效。[@ref-auggie-docs-hooks-locations]

结构：`hooks` 对象按事件类型分数组，每个元素含 `matcher`（可选）、`hooks` 数组与 `metadata`（可选）。[@ref-auggie-docs-hooks-structure]

| 字段 | 说明 |
| :-- | :-- |
| `matcher` | 匹配工具名，大小写敏感，支持正则；`PreToolUse`／`PostToolUse` 可省略（默认 `".*"` 匹配全部工具）；会话事件 `SessionStart`／`SessionEnd`／`Stop` 不使用 |
| `hooks` | 命中后依次执行的 handler 数组 |
| `type` | 目前只支持 `"command"` |
| `command` | 脚本路径，必须以 `.ps1`、`.cmd`、`.bat` 或 `.sh` 结尾 |
| `timeout` | 可选，毫秒；默认 60000 |
| `metadata` | 可选，控制注入哪些附加字段（见输入一节） |

matcher 示例：`launch-process`（单个工具）、`str-replace-editor|save-file`（正则或）、`.*`（全部）。[@ref-auggie-docs-hooks-structure]

**生效条件**：受管设置只读；项目级设置可以让仓库自带 hook 配置并对所有贡献者自动生效（文档建议用它做安全审计或策略强制，用 `.augment/settings.local.json` 放个人覆盖）；`PreToolUse`、`PostToolUse`、`Stop` 同步运行，agent 会等待它们完成，因此超时要设置得当。[@ref-auggie-docs-hooks-locations][@ref-auggie-docs-hooks-structure]

脚本要求：扩展名必须是四种之一；Unix 的 `.sh` 直接执行并由 shebang 选择解释器（因此可以用 python3／node 写），`.ps1` 在 Windows 一律交给 `powershell.exe -Command`，`.bat`／`.cmd` 交给 `cmd.exe /c`，shebang 对后两类无效；`.sh` 需要可执行权限。[@ref-auggie-docs-hooks-scripts]

一个最小的 Python hook（`.sh` 扩展名 + shebang，由 Unix 直接执行；文档示例）：[@ref-auggie-docs-hooks-scripts]

```bash
#!/usr/bin/env python3
import sys, json
event_data = json.load(sys.stdin)
# ... your Python code
```

## 输入 {#hooks-input}

hook 通过 **stdin** 收到一个 JSON 事件对象。所有事件共有的字段是 `hook_event_name`、`conversation_id`、`workspace_roots`（字符串数组，通常一个路径）。[@ref-auggie-docs-hooks-input][@ref-auggie-docs-hooks-common]

工具事件（`PreToolUse`／`PostToolUse`）附加字段：`tool_name`（如 `launch-process`）、`tool_input`（工具入参对象，安全 hook 的关键）、`is_mcp_tool`；`PostToolUse` 还有 `tool_output`、`tool_error`，以及对 `save-file`／`str-replace-editor`／`remove-files` 的 `file_changes`（含 `path`、`changeType`、`content`、`oldContent`）。[@ref-auggie-docs-hooks-event-fields]

环境变量：`AUGMENT_PROJECT_DIR`（第一个工作区根，为空时取当前目录）、`AUGMENT_CONVERSATION_ID`、`AUGMENT_HOOK_EVENT`、`AUGMENT_TOOL_NAME`（仅工具事件）。[@ref-auggie-docs-hooks-envvars]

元数据开关在 **配置** 里声明，默认全部关闭，属于显式选择加入：[@ref-auggie-docs-hooks-metadata-options]

| 元数据开关 | 注入字段 | 可用事件 | 默认 |
| :-- | :-- | :-- | :-- |
| `includeUserContext` | `context`：`userEmail`、`modelName`、`timestamp` | 全部事件 | `false` |
| `includeMCPMetadata` | `mcp_metadata`：`mcpDecision`、`mcpTotalToolsCount`、`mcpExecutedToolName`、`mcpExecutedToolServerName` 等 | 仅工具事件 | `false` |
| `includeConversationData` | `conversation`：`userPrompt`、`agentTextResponse`、`agentCodeResponse`（`path`／`changeType`／`content`） | 仅 `Stop` | `false` |

敏感内容处理：文档把这三项描述为隐私优先的 opt-in 模型，`includeConversationData` 默认排除会话数据；安全注意事项一节另给出不要把凭据写入 hook 输出、限制 hook 权限等要求。`Stop` 事件的会话数据示例可在仓库官方市场 `warp` 插件的 `hooks.json` 中看到（该插件把 `includeConversationData` 设为 `true`）。[@ref-auggie-docs-hooks-metadata-options][@ref-auggie-docs-hooks-security][@ref-auggie-repo-plugin-hooks]

## 输出、退出码与阻断 {#hooks-output}

退出码语义：`0` 成功、继续执行；`2` 阻断错误（**仅 `PreToolUse`** 会阻止工具执行）；其它退出码为非阻断错误，记录日志后继续。[@ref-auggie-docs-hooks-matrix][@ref-auggie-docs-hooks-json]

通信矩阵（输出去向）：`PreToolUse` 退出码 2 的 stderr 给 agent（说明被阻断原因）；退出码 0 时 stdout／stderr 是给用户的消息；`SessionStart` 退出码 0 的 stdout 会作为上下文注入给 agent；`SessionEnd` 的 stdout 给用户看完成消息；其它退出码的 stderr 记日志。[@ref-auggie-docs-hooks-matrix]

JSON 输出（仅退出码 0 时读取）可含公共字段 `continue`、`stopReason`、`suppressOutput`、`systemMessage`，以及 `hookSpecificOutput`。各事件可用字段：[@ref-auggie-docs-hooks-json][@ref-auggie-docs-hooks-event-json]

| 事件 | `hookSpecificOutput` 字段 | 效果 |
| :-- | :-- | :-- |
| `PreToolUse` | `permissionDecision: "deny"`＋`permissionDecisionReason` | 阻断工具，理由发给 agent 与用户；文档注明 `"allow"` 与 `"ask"` 尚未实现 |
| `PostToolUse` | `decision: "block"`＋`reason`、`additionalContext` | 不能改工具输出，只能给 agent 追加上下文或带理由阻断 agent |
| `Stop` | `decision: "block"`＋`reason` | 阻止 agent 结束（例如要求先跑测试） |
| `SessionStart` | `additionalContext` | 会话开始时注入上下文 |

文档明确的两条限制：hook 目前只能阻断工具、不能修改工具入参（`updatedInput` 未实现）；`PostToolUse` 不能修改工具输出。[@ref-auggie-docs-hooks-limitations]

## 顺序、超时与失败处理 {#hooks-order}

- 执行顺序就是配置里定义的顺序；hook 之间**顺序执行、不并行**。[@ref-auggie-docs-hooks-execution][@ref-auggie-docs-hooks-limitations]
- 默认超时 60 秒，可按 hook 用 `timeout` 覆盖；文档说明存在最长超时限制以防无限阻塞，并建议把慢操作放到后台。[@ref-auggie-docs-hooks-execution][@ref-auggie-docs-hooks-structure]
- 同步等待：`PreToolUse`、`PostToolUse`、`Stop` 运行期间 agent 等待它们完成。[@ref-auggie-docs-hooks-structure]
- 失败处理：非 0／2 退出码只记录并继续；JSON 解析错误等属于同一类非阻断故障（故障排查一节列出 JSON 语法、引号、尾逗号、特殊字符四类常见问题）。[@ref-auggie-docs-hooks-matrix][@ref-auggie-docs-hooks-troubleshooting]
- 重复触发：文档没有描述同一事件多次触发的去重规则。[@ref-auggie-docs-hooks-execution]
- 运行环境：在当前目录、使用 Auggie 的环境变量执行；输入为 stdin JSON。[@ref-auggie-docs-hooks-execution]

## 诊断 {#hooks-diagnostics}

- `/hooks` 查看已配置 hooks 与支持的事件类型（交互模式附加命令）。[@ref-auggie-docs-interactive-additional]
- 日志：`auggie --log-level debug "your prompt here"`，在日志里查找 `[HookExecutor]`（执行细节）、`[HookManager]`（匹配与路由）、`[hook-output-router]`（输出路由决策）。[@ref-auggie-docs-hooks-logs][@ref-auggie-docs-hooks-debug]
- 本地测试：构造一个事件 JSON 文件，用管道喂给脚本并检查退出码，再用 `jq` 校验输出。文档给出的测试事件包含 `hook_event_name`、`conversation_id`、`workspace_roots`、`tool_name`、`tool_input` 字段。[@ref-auggie-docs-hooks-testing]
- 未触发时的排查顺序（文档原文顺序）：检查 matcher 正则、事件类型、设置文件位置（项目／用户／系统）、脚本路径、可执行权限。[@ref-auggie-docs-hooks-troubleshooting]
- 配置改动生效时机：hook 配置属于设置文件，手动修改后需要重启 Auggie（设置页的通用要求）。[@ref-auggie-docs-config-manual]
