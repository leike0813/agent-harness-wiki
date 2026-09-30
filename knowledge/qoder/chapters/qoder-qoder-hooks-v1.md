---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-hooks-v1
harness_id: qoder
topic: hooks
title: "Qoder IDE 的 Hooks 机制"
sections:
  - section_id: hooks-overview
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-hooks-note]
  - section_id: hooks-events
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-hooks-events, ref-qoder-ide-hooks-note]
  - section_id: hooks-config
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-hooks-locations, ref-qoder-ide-hooks-quickstart, ref-qoder-ide-hooks-format, ref-qoder-ide-hooks-matcher, ref-qoder-ide-hooks-toolnames]
  - section_id: hooks-io
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-hooks-input, ref-qoder-ide-hooks-env, ref-qoder-ide-hooks-script, ref-qoder-ide-hooks-output]
  - section_id: hooks-order
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-hooks-how, ref-qoder-ide-hooks-caveats, ref-qoder-ide-hooks-note, ref-qoder-ide-hooks-format]
  - section_id: hooks-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-hooks-script, ref-qoder-ide-hooks-quickstart, ref-qoder-ide-hooks-caveats, ref-qoder-ide-hooks-note]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [qoder]
        section_id: hooks-events
        status: answered
        source_refs: [ref-qoder-ide-hooks-events, ref-qoder-ide-hooks-note]
  - question_id: hooks.entry
    answers:
      - surface_ids: [qoder]
        section_id: hooks-config
        status: answered
        source_refs: [ref-qoder-ide-hooks-locations, ref-qoder-ide-hooks-format, ref-qoder-ide-hooks-quickstart]
  - question_id: hooks.input
    answers:
      - surface_ids: [qoder]
        section_id: hooks-io
        status: answered
        source_refs: [ref-qoder-ide-hooks-input, ref-qoder-ide-hooks-env]
  - question_id: hooks.output
    answers:
      - surface_ids: [qoder]
        section_id: hooks-io
        status: answered
        source_refs: [ref-qoder-ide-hooks-output, ref-qoder-ide-hooks-script]
  - question_id: hooks.order
    answers:
      - surface_ids: [qoder]
        section_id: hooks-order
        status: answered
        source_refs: [ref-qoder-ide-hooks-how, ref-qoder-ide-hooks-caveats]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [qoder]
        section_id: hooks-order
        status: partial
        source_refs: [ref-qoder-ide-hooks-format, ref-qoder-ide-hooks-note, ref-qoder-ide-hooks-caveats]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-qoder-ide-hooks-script, ref-qoder-ide-hooks-quickstart, ref-qoder-ide-hooks-caveats]
---

## 固定来源与机制边界 {#hooks-overview}

本章按 Qoder IDE（catalog 的 `qoder` 界面）采写，固定来源是官方文档站的 Hooks 页面快照（`extensions/hooks.md`）。所有来源都取自 `docs.qoder.com`（`qoder.com` 指向的官方文档站）；`docs.qoder.cn` 是另一条国内产品线（通义灵码 / Lingma）的文档，本章不引用。Qoder 是闭源产品，没有官方源码仓库可固定 commit。

结论：Hooks 让用户在 Agent 执行的关键时点插入自定义逻辑，不需要改源码；做法是编辑一个 JSON 配置文件。官方举出的用途：在工具运行前拦截危险操作、每次写文件后自动 lint、Agent 结束时发桌面通知。与提示词指令不同，Hook 是确定性的——事件触发时脚本就会运行，没有模型解释环节。[@ref-qoder-ide-hooks-note]

**边界（必须与其它入口区分）**：这一页只覆盖 **Qoder IDE / JetBrains 插件**，支持 **12 个事件**、只支持 `command` 与 `http` 两种 handler。Qoder CLI 的 Hooks 与 QoderWork 的 Hooks 是另外的页面、另外的能力集；**配置文件在 IDE 与 CLI 之间共享，但每个入口只运行它自己支持的事件**。[@ref-qoder-ide-hooks-note]

## 第一方事件 {#hooks-events}

IDE / JetBrains 插件当前的 12 个事件原文表：[@ref-qoder-ide-hooks-events]

| 事件 | 触发时点 | 可否阻断 |
| :-- | :-- | :--: |
| SessionStart | 会话开始或恢复时 | 否 |
| UserPromptSubmit | 用户提交提示词之后、Agent 处理之前 | 是 |
| PreToolUse | 工具执行之前 | 是 |
| PermissionRequest | 工具需要用户授权时 | 是 |
| PostToolUse | 工具成功执行之后 | 否 |
| PostToolUseFailure | 工具执行失败之后 | 否 |
| SubagentStart | 子代理启动时 | 否 |
| SubagentStop | 子代理停止时 | 否 |
| Stop | Agent 完成响应时 | 是 |
| SessionEnd | 会话结束时 | 否 |
| PreCompact | 上下文压缩之前 | 否 |
| Notification | 发出面向用户的通知时 | 否 |

同一事件的插件事件是否另有来源：官方页面没有记录"插件事件"的独立命名空间；插件携带的 Hooks 是插件打包的一个组件，随插件加载，事件名仍是上表这一套。[@ref-qoder-ide-hooks-note]

## 配置位置、格式与匹配规则 {#hooks-config}

Hook 配置从三个文件读取；多处定义时**合并**执行，优先级由低到高：[@ref-qoder-ide-hooks-locations]

| 位置 | 作用域 | 优先级 | 可共享 |
| :-- | :-- | :--: | :-- |
| `~/.qoder/settings.json` | 用户级 | 1（最低） | 否 |
| `.qoder/settings.json` | 项目级 | 2 | 是（提交到 Git 与团队共享） |
| `.qoder/settings.local.json` | 项目级（本地） | 3 | 否（应加入 .gitignore） |

官方快速上手示例（原样抄录）：把脚本放到 `~/.qoder/hooks/block-rm.sh` 并 `chmod +x`，然后在 `~/.qoder/settings.json` 里注册：[@ref-qoder-ide-hooks-quickstart]

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.qoder/hooks/block-rm.sh"
          }
        ]
      }
    ]
  }
}
```

配置格式：事件名对应一个数组，数组元素是 matcher 组，组内 `hooks` 再列具体 handler；同一事件下可以定义多个 matcher 组，每组可含多个 hook 命令。字段表原文：[@ref-qoder-ide-hooks-format]

| 字段 | 必需 | 说明 |
| :-- | :--: | :-- |
| `type` | 是 | `"command"` 或 `"http"` |
| `command` | 是 | 要运行的 shell 命令或脚本路径 |
| `timeout` | 否 | 超时秒数，默认 30 |
| `matcher` | 否 | 匹配条件；省略时该事件每次触发都会执行 |
| `if` | 否 | 更细的单 hook 条件，例如 `"ToolName"` 或 `"ToolName(arg_pattern)"` |
| `async` | 否 | 为 `true` 时后台运行，不阻塞当前操作 |
| `asyncRewake` | 否 | 为 `true` 时后台运行，并可用结果唤醒模型（适合长检查） |
| `statusMessage` | 否 | hook 运行时状态行里显示的自定义描述 |

matcher 规则（匹配对象随事件而异）：省略或 `"*"` 匹配全部；精确值只匹配该值；`|` 分隔多个值；也支持正则（例如 `"mcp__.*"` 匹配所有 MCP 工具）。[@ref-qoder-ide-hooks-matcher]

工具名映射：Qoder IDE 同时支持原生工具名与 Claude Code 兼容名，插件内部做映射。例如 `matcher: "Bash"` 等价于 `matcher: "run_in_terminal"`；官方表给出 `run_in_terminal`↔`Bash`、`read_file`↔`Read`、`create_file`↔`Write`、`search_replace`↔`Edit`、`grep_code`↔`Grep`、`search_file`↔`Glob`、`list_dir`↔`LS`、`Agent`↔`Task`、`search_web`↔`WebSearch`、`fetch_content`↔`WebFetch`、`todo_write`↔`TodoWrite`，以及 MCP 工具统一形如 `mcp__server__tool`。[@ref-qoder-ide-hooks-toolnames]

## 输入、环境变量与输出 {#hooks-io}

Hook 脚本从 stdin 收到 JSON 事件上下文。所有事件共有字段：`session_id`、`cwd`、`hook_event_name`、`transcript_path`（恒有），以及可选的 `request_set_id`、`tool_name`、`tool_input`、`tool_response`（PostToolUse，IDE 里当前以字符串传递）、`extra.email`、`extra.repo`、`extra.branch`、`extra.request_time`、`extra.response_time`、`extra.full_diff_text`（仅编辑类工具的 PostToolUse）。官方提醒：即使字段被声明，某条执行路径也可能不填充，应按可选处理。[@ref-qoder-ide-hooks-input]

脚本运行时插件注入的环境变量：`QODER_SESSION_ID`、`QODER_TOOL_NAME`、`QODER_CWD`、`QODER_TRANSCRIPT_PATH`、`QODER_TOOL_INPUT_FILE_PATH`（工具操作的文件路径，如适用）。[@ref-qoder-ide-hooks-env]

输出由退出码决定：`0` 成功继续执行、stdout 的 JSON 会被解析；`2` 阻断该操作，stderr 注入对话（仅对可阻断事件）；其它码为非阻断错误，stderr 展示给用户后继续。官方脚本模板（原样抄录）：[@ref-qoder-ide-hooks-script]

```bash
#!/bin/bash

# 1. Read the JSON input from stdin
input=$(cat)

# 2. Extract the fields you care about with jq
tool_name=$(echo "$input" | jq -r '.tool_name')
tool_input=$(echo "$input" | jq -r '.tool_input')

# 3. Write your logic
if [ "$tool_name" = "Bash" ]; then
  command=$(echo "$input" | jq -r '.tool_input.command')

  if echo "$command" | grep -qE 'rm\s+-rf|DROP\s+TABLE'; then
    echo "Operation denied: $command" >&2
    exit 2
  fi
fi

# 4. Allow
exit 0
```

`exit 0` 时还可以在 stdout 输出 JSON 做更细控制；官方示例（原文）：[@ref-qoder-ide-hooks-output]

```bash
#!/bin/bash
input=$(cat)

echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"This operation is not allowed"}}'
exit 0
```

跨事件的公共 stdout 字段：`systemMessage`（展示给用户的消息）、`continueWithPrompt`（Agent 是否继续）、`decision`（`"block"` 表示一般阻断；权限决定改用 `hookSpecificOutput.permissionDecision`）、`reason`、`updatedToolOutput`（替换工具输出）、`hookSpecificOutput`（事件专属字段容器）。官方特别注明：IDE 对 `exit 0` 与 `exit 2` 的 stdout 都尝试按 JSON 解析，不要假设 exit 2 的 stdout 会被当作纯文本。[@ref-qoder-ide-hooks-output]

## 执行顺序、超时与失败处理 {#hooks-order}

处理链（原文六步）：插件启动时加载全部 hook 配置；Agent 执行中遇到生命周期事件（如 PreToolUse）；插件遍历该事件下每个 matcher 组并与当前上下文求匹配；匹配的组按顺序运行其 shell 脚本；每个脚本通过 stdin 收到事件 JSON，并通过退出码与 stdout 返回决定；插件读取结果后决定继续还是阻断。[@ref-qoder-ide-hooks-how]

顺序与失败语义：[@ref-qoder-ide-hooks-caveats]

- 同一事件在多层配置里都有 hook 时，按**优先级从低到高**依次执行（用户级 → 项目级 → 项目本地级）。
- 任一 hook 阻断（exit 2），该事件后续 hook 被跳过。
- 超时：默认 30 秒，可按 hook 用 `timeout` 覆盖；脚本超时会被杀掉并按"允许（继续）"处理。
- 意外退出码（非 0/2）：错误信息展示给用户，但 Agent 不中断。
- 脚本必须可执行（`chmod +x`）。

生效条件：配置文件在 IDE 与 CLI 之间共享，但每个入口只运行自己支持的事件；**当前不支持热重载——改完 hook 配置必须重启 IDE**。`async` / `asyncRewake` 只改变阻塞行为，不改变事件是否触发。[@ref-qoder-ide-hooks-note][@ref-qoder-ide-hooks-format]

**缺口（`hooks.conditions`）**：固定来源没有记录 IDE 侧的信任状态、沙箱或权限模式如何影响 Hook 生效；可以确定的生效条件只有上表的配置层级与"重启 IDE"一条，其余按部分回答。[@ref-qoder-ide-hooks-note]

## 诊断与调试 {#hooks-diagnostics}

- 手工模拟：直接给脚本喂 JSON，观察退出码与 stderr，官方示例是 `echo '{"tool_name":"Bash","tool_input":{"command":"rm -rf /"}}' | ~/.qoder/hooks/block-rm.sh` 加 `echo "Exit code: $?"`；再带 `2>&1` 看阻断消息。[@ref-qoder-ide-hooks-script]
- 端到端验证：在 IDE 里让 Agent 执行一条会被拦的命令（官方用含 `rm -rf` 的命令），确认 hook 阻断并把错误信息回灌给 Agent。[@ref-qoder-ide-hooks-quickstart]
- 依赖：官方示例脚本依赖 `jq`（macOS `brew install jq`，Linux `apt install jq`）。[@ref-qoder-ide-hooks-caveats]
- 配置改动何时生效：**不支持热重载，改完重启 IDE**。[@ref-qoder-ide-hooks-note]

**缺口**：固定来源没有提供 Hook 的日志文件、执行历史或"配置被读取但未匹配"的可观察输出；已检查的入口是本页的 Quick Start、How It Works 与 Things to Keep in Mind 三节。[@ref-qoder-ide-hooks-caveats]
