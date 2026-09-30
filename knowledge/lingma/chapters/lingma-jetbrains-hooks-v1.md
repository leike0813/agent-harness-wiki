---
schema_version: 3
record_kind: production
edition_id: lingma-jetbrains-hooks-v1
harness_id: lingma
topic: hooks
title: "Lingma（Qoder CN）JetBrains 插件的 Hooks：事件、配置、输入输出与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-product-rename, ref-lingma-hooks-events]
  - section_id: hooks-events-entry
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-events, ref-lingma-hooks-config-files, ref-lingma-hooks-matcher, ref-lingma-hooks-config-format, ref-lingma-hooks-events-ref]
  - section_id: hooks-io
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-input, ref-lingma-hooks-output, ref-lingma-hooks-toolnames, ref-lingma-hooks-events-ref]
  - section_id: hooks-order-conditions
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-config-files, ref-lingma-hooks-workflow, ref-lingma-hooks-faq]
  - section_id: hooks-diagnostics
    surface_ids: [jetbrains]
    source_refs: [ref-lingma-hooks-faq, ref-lingma-hooks-quickstart]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-lingma-hooks-events]
  - question_id: hooks.entry
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-lingma-hooks-config-files, ref-lingma-hooks-config-format, ref-lingma-hooks-matcher]
  - question_id: hooks.input
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-io
        status: answered
        source_refs: [ref-lingma-hooks-input, ref-lingma-hooks-events-ref]
  - question_id: hooks.output
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-io
        status: answered
        source_refs: [ref-lingma-hooks-output]
  - question_id: hooks.order
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-lingma-hooks-faq, ref-lingma-hooks-config-files]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-lingma-hooks-config-files, ref-lingma-hooks-workflow]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [jetbrains]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-lingma-hooks-faq, ref-lingma-hooks-quickstart]
---

## 固定来源与界面 {#hooks-scope}

本章依据官方文档站点 docs.qoder.cn 的 Qoder CN 用户指南“Hooks”页，界面口径为 catalog 唯一登记的 `jetbrains`（JetBrains IDE 插件，kind `ide`）；产品自 2026-05-20 起由通义灵码更名为 Qoder CN 系列，相关进程与目录仍为 `.lingma` / `Lingma.exe`。[@ref-lingma-product-rename]

Hooks 让用户在 Qoder CN IDE 执行的关键节点插入自定义逻辑，无需修改任何代码：编辑 JSON 配置即可实现工具执行前拦截危险操作、写文件后自动跑 lint、任务完成时弹出桌面通知等。与 Prompt 指令不同，Hooks 是确定性的——事件触发时脚本一定执行，不受模型理解偏差影响。[@ref-lingma-hooks-events]

## 事件与配置入口 {#hooks-events-entry}

**五个第一方事件** [@ref-lingma-hooks-events]：

| 事件名称 | 触发时机 | 可阻断 |
| :-- | :-- | :-- |
| UserPromptSubmit | 用户提交 Prompt 后、Agent 处理前 | 是 |
| PreToolUse | 工具调用执行前 | 是 |
| PostToolUse | 工具调用成功后 | 否 |
| PostToolUseFailure | 工具调用失败后 | 否 |
| Stop | Agent 完成响应时 | 否 |

**配置文件与优先级**（从低到高，多级合并执行）[@ref-lingma-hooks-config-files]：

| 位置 | 作用域 | 优先级 | 可共享 | 说明 |
| :-- | :-- | :-- | :-- | :-- |
| `~/.lingma/settings.json` | 用户级 | 1（最低） | 否 | 用户个人配置，对所有项目生效 |
| `.lingma/settings.json` | 项目级 | 2 | 是 | 可提交到 Git，团队共享 |
| `.lingma/settings.local.json` | 项目级（本地） | 3 | 否 | 建议加入 .gitignore，个人开发配置 |

**配置格式** [@ref-lingma-hooks-config-format]：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.lingma/hooks/block-rm.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `type` | 是 | 固定为 `command` |
| `command` | 是 | 要执行的 shell 命令或脚本路径 |
| `timeout` | 否 | 超时时间（秒），默认 30 |
| `matcher` | 否 | 匹配条件，不填则匹配该事件的所有触发 |

一个事件下可配置多个 matcher 分组，每个分组可包含多个 Hook 命令 [@ref-lingma-hooks-config-format]。

**matcher 匹配规则**（不同事件匹配不同字段，见事件参考）[@ref-lingma-hooks-matcher]：

| 写法 | 含义 | 示例 |
| :-- | :-- | :-- |
| 不填或 `"*"` | 匹配所有 | 所有工具都会触发 |
| 精确值 | 精确匹配 | `"Bash"` 只在 Bash 工具时触发 |
| 竖线分隔 | 匹配多个值 | `"Write | Edit"` 在 Write 或 Edit 时触发 |
| 正则表达式 | 正则匹配 | `"mcp__.*"` 匹配所有 MCP 工具 |

**事件参考的匹配字段** [@ref-lingma-hooks-events-ref]：`UserPromptSubmit` 无匹配字段（匹配所有）；`PreToolUse`、`PostToolUse`、`PostToolUseFailure` 按 `tool_name` 匹配；`Stop` 无匹配字段。

## Hook 的输入、输出与工具名映射 {#hooks-io}

**输入**：Hook 脚本通过 stdin 接收 JSON 格式的事件上下文。所有事件通用字段为 `session_id`、`cwd`、`hook_event_name`、`transcript_path`（会话上下文 JSON 文件路径）[@ref-lingma-hooks-input]。各事件的额外字段 [@ref-lingma-hooks-events-ref]：

| 事件 | 额外字段 |
| :-- | :-- |
| UserPromptSubmit | `prompt`（用户输入的原始文本） |
| PreToolUse | `tool_name`、`tool_input` |
| PostToolUse | `tool_name`、`tool_input`、`tool_response` |
| PostToolUseFailure | `tool_name`、`tool_input`、`error` |
| Stop | `stop_hook_active`、`last_assistant_message` |

**输出**：Hook 通过 exit code 与 stdout 控制行为 [@ref-lingma-hooks-output]：

| Exit Code | 含义 | 行为 |
| :-- | :-- | :-- |
| 0 | 成功 | 继续执行，尝试解析 stdout JSON |
| 2 | 阻断 | 停止操作，stderr 内容注入对话（仅对支持阻断的事件） |
| 其他值 | 错误 | 继续执行，stderr 内容仅展示给用户 |

仅 exit 0 时生效的 stdout JSON 可提供更精细的控制 [@ref-lingma-hooks-output]：

```json
{
  "continue": true,
  "stopReason": "",
  "suppressOutput": false,
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow | deny | ask",
    "permissionDecisionReason": "说明原因"
  }
}
```

**工具名映射**：Qoder CN 支持原生工具名与兼容工具名两套，配置 Hook 时可用任意一套，运行时会统一映射后执行匹配（例如 `matcher: "Bash"` 与 `matcher: "run_in_terminal"` 等价）[@ref-lingma-hooks-toolnames]：

| 原生名 | 兼容名 | 说明 |
| :-- | :-- | :-- |
| run_in_terminal | Bash | 执行 shell 命令 |
| read_file | Read | 读取文件内容 |
| create_file | Write | 创建 / 写入文件 |
| search_replace | Edit | 编辑文件 |
| delete_file | - | 删除文件 |
| grep_code | Grep | 搜索文件内容 |
| search_file | Glob | 文件名匹配 |
| list_dir | LS | 列出目录 |
| task | Task | 启动子任务 / 子代理 |
| mcp__{server}__{tool} | 同左 | MCP 工具 |

## 顺序、超时与生效条件 {#hooks-order-conditions}

**顺序与超时**：同一事件下按配置声明顺序执行；跨配置文件时按“用户级 → 项目级 → 项目本地”优先级从低到高依次执行。默认 30 秒超时，超时视为错误（继续执行，stderr 展示给用户）[@ref-lingma-hooks-faq][@ref-lingma-hooks-config-files]。

**执行环境**：Hook 在当前项目根目录（cwd）下以当前用户身份执行，继承 IDE 进程的环境变量 [@ref-lingma-hooks-faq]。

**生效条件与生效时机** [@ref-lingma-hooks-config-files][@ref-lingma-hooks-workflow]：

- IDE 在**启动时**加载所有 Hook 配置。
- 当前版本**不支持热加载**，修改配置文件后需要重启 IDE 才能生效。
- 前置条件：示例脚本依赖 `jq` 解析 JSON；所有 Hook 脚本需有可执行权限（`chmod +x`）。
- Agent 运行到事件节点时，遍历该事件下所有 Hook 分组，用 matcher 匹配当前上下文，匹配成功的 Hook 按顺序执行脚本；脚本通过 stdin 接收 JSON、通过 exit code 与 stdout 返回决策，IDE 据此决定放行或阻断。

缺口：文档未说明 Hook 的启用开关、按用户/项目禁用单项 Hook 的机制、沙箱或权限限制、以及被阻断事件与失败的重复触发语义（例如超时后是否重试）。

## 诊断 {#hooks-diagnostics}

[@ref-lingma-hooks-quickstart][@ref-lingma-hooks-faq]

- **本地管道测试**：用终端直接回放事件 JSON，例如
  `echo '{"tool_name":"Bash","tool_input":{"command":"rm -rf /"},"hook_event_name":"PreToolUse"}' | ~/.lingma/hooks/block-rm.sh`，再查看退出码；检查 stderr 时追加 `2>&1`。
- **端到端验证**：重启 IDE 后，让 Agent 执行被拦截的操作（例如含 `rm -rf` 的命令），确认 Hook 阻止执行并把错误信息反馈给 Agent。
- **日志**：Hook 的 stderr 会反馈给 Agent 或用户；详细调用日志可在 Qoder CN 运行时日志中查找 `[hook]` 前缀的条目。
- **配置未生效**：确认是否已重启 IDE（当前版本不支持热加载）。
- **超时**：确认脚本是否超过默认 30 秒。

缺口：没有独立命令或面板用于列出“已加载并生效的 Hook”，也没有查看某次事件实际命中哪些 matcher 分组的入口。
