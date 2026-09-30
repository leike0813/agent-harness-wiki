---
schema_version: 3
record_kind: production
edition_id: trae-trae-hooks-v1
harness_id: trae
topic: hooks
title: "Trae IDE 的 Hook：事件、hooks.json、输入输出与执行环境"
sections:
  - section_id: hooks-scope
    surface_ids: [trae]
    source_refs: [ref-trae-hooks-events, ref-trae-hooks-lifecycle, ref-trae-hooks-types, ref-trae-hook-notification]
  - section_id: hooks-entry
    surface_ids: [trae]
    source_refs: [ref-trae-hook-locations, ref-trae-hooks-create, ref-trae-hooks-claude, ref-trae-hook-format, ref-trae-hook-fields]
  - section_id: hooks-io
    surface_ids: [trae]
    source_refs: [ref-trae-hook-io, ref-trae-hook-stdin, ref-trae-hook-stdout, ref-trae-hook-exit, ref-trae-hook-sessionstart, ref-trae-hook-userprompt, ref-trae-hook-pretool, ref-trae-hook-posttool, ref-trae-hook-stop, ref-trae-hook-toolnames]
  - section_id: hooks-order-env
    surface_ids: [trae]
    source_refs: [ref-trae-hook-fields, ref-trae-hook-exit, ref-trae-hook-locations, ref-trae-hook-env, ref-trae-hook-envvars, ref-trae-hook-envfile, ref-trae-hook-cwd]
  - section_id: hooks-conditions-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-hooks-mode, ref-trae-hook-execmode, ref-trae-hooks-create, ref-trae-hooks-logs]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [trae]
        section_id: hooks-scope
        status: answered
        source_refs: [ref-trae-hooks-events, ref-trae-hook-notification]
  - question_id: hooks.entry
    answers:
      - surface_ids: [trae]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-trae-hook-locations, ref-trae-hook-format, ref-trae-hooks-create, ref-trae-hooks-claude]
  - question_id: hooks.input
    answers:
      - surface_ids: [trae]
        section_id: hooks-io
        status: answered
        source_refs: [ref-trae-hook-io, ref-trae-hook-stdin, ref-trae-hook-sessionstart, ref-trae-hook-pretool]
  - question_id: hooks.output
    answers:
      - surface_ids: [trae]
        section_id: hooks-io
        status: answered
        source_refs: [ref-trae-hook-stdout, ref-trae-hook-exit, ref-trae-hook-pretool, ref-trae-hook-stop]
  - question_id: hooks.order
    answers:
      - surface_ids: [trae]
        section_id: hooks-order-env
        status: partial
        source_refs: [ref-trae-hook-fields, ref-trae-hook-locations, ref-trae-hook-exit]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [trae]
        section_id: hooks-conditions-diagnostics
        status: answered
        source_refs: [ref-trae-hooks-mode, ref-trae-hook-execmode, ref-trae-hooks-create]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: hooks-conditions-diagnostics
        status: partial
        source_refs: [ref-trae-hooks-logs, ref-trae-hooks-mode]
---

## 事件、生命周期与 Hook 类型 {#hooks-scope}

本章来源为 `docs.trae.ai` IDE 分册的两页快照：`/ide/automate-actions-with-hooks`（使用与管理）与 `/ide/hook-configuration-reference`（字段、输入输出、执行环境）。Trae 闭源、无官方 npm 包，整章为来源级知识。

Hook 的定义："Hooks are user-defined shell commands that run at specific stages of TraeCode's lifecycle. They give deterministic control over agent's behavior by ensuring certain actions are always executed automatically, instead of relying on the agent to decide whether to run them."。[@ref-trae-hooks-events]

第一方事件共 **6 个**：[@ref-trae-hooks-events]

| 事件 | 触发时点 | 主要用途 |
| :-- | :-- | :-- |
| `SessionStart` | 创建会话之后、发起第一次对话之前 | 初始化环境、注入环境变量、补上下文 |
| `UserPromptSubmit` | 用户提交查询之后、Agent 开始处理之前 | 拦截不允许的请求或附加上下文 |
| `PreToolUse` | Agent 发起工具调用之后、真正执行之前 | 校验/拦截/修改工具参数，或要求用户确认 |
| `PostToolUse` | 工具调用真正执行之后 | 检查执行结果、附加上下文 |
| `Stop` | Agent 完成输出、准备结束本次查询时 | 检查输出是否达标，必要时阻止停止继续执行 |
| `Notification` | 工具执行等待用户确认时，或 Agent 完成任务时 | 向用户发通知；**异步触发，不阻塞主流程** |

处理链是"事件触发 → 满足配置条件 → TraeCode 把该事件的 JSON 上下文交给 hook handler → handler 依据返回值决定附加上下文、拦截请求或继续执行"。[@ref-trae-hooks-lifecycle]

Hook 分全局与项目两类，作用域与推荐用途写在官方表里：全局 hook 对本机当前用户下所有工作区生效（适合通用安全策略、统一上下文注入、跨项目校验），项目 hook 只对当前项目或工作区生效（适合与项目强相关的脚本、测试、格式化流程）。两类的配置文件位置见下一节。[@ref-trae-hooks-types]

`Notification` 事件的匹配对象不是工具名而是**通知类型**，取值共 5 个：`idle_prompt`（任务完成）、`permission_prompt`（工具调用需用户确认）、`document_review`（Plan/Spec 工作流的文档评审）、`ask_user_question`（需要用户补充信息）、`browser_interaction`（浏览器交互等待）。该事件忽略 stdout，任何退出码都按非阻塞处理。[@ref-trae-hook-notification]

## 配置入口、文件位置与字段 {#hooks-entry}

**文件位置**（原文表）：[@ref-trae-hook-locations]

| Hook 类型 | 系统 | 路径 | 作用范围 |
| :-- | :-- | :-- | :-- |
| Global | macOS & Linux | `~/.trae/hooks.json` | 本机当前用户的所有工作区 |
| Global | Windows | `%userprofile%/.trae/hooks.json` | 同上 |
| Project | macOS & Linux | `$PROJECT_FOLDER/.trae/hooks.json`（工作区含多个项目时默认建在第一个项目里） | 当前项目或工作区 |

同一份文档还列出 TraeCode 读取的 **Claude Code hook 位置**：全局 `~/.claude/settings.json`（Windows `%userprofile%/.claude/settings.json`），项目 `$PROJECT_FOLDER/.claude/settings.json` 与 `.claude/settings.local.json`。[@ref-trae-hook-locations]

**多个配置文件共存时合并执行**，不是覆盖：同一工作区有多个项目根目录且各自启用了项目 hook 时逐份读取合并执行；同时启用 Claude Code hook 与 TraeCode hook 时也会读取所有已启用的配置合并执行。[@ref-trae-hook-locations]

**配置文件格式**（原样抄录；`{EventName}`、`{ToolPattern}`、`{shell command}` 是占位符，为普通文本而非标签）：[@ref-trae-hook-format]

```json
{
  "version": 1,
  "hooks": {
    "{EventName}": [
      {
        "matcher": "{ToolPattern}",
        "loop_limit": 5,
        "hooks": [
          {
            "type": "command",
            "command": "{shell command}",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

字段分层说明（原文表）：[@ref-trae-hook-fields]

| 层 | 字段 | 必填 | 说明 |
| :-- | :-- | :-- | :-- |
| 顶层 | `version` | 否 | 模式版本，默认 `1`，当前只支持 `1` |
| 顶层 | `hooks` | 是 | 事件名到 hook 组的映射 |
| 事件层 | `{EventName}` | 是 | 某个事件下的 hook 组列表 |
| hook 组 | `matcher` | 否 | 支持正则（如 `Edit\|Write`、`mcp.`）；空串或省略表示匹配全部；**仅对 `PreToolUse`、`PostToolUse`、`Notification` 有效** |
| hook 组 | `loop_limit` | 否 | 循环次数上限，`loop_count ≥ loop_limit` 时跳过该 hook 组；只接受正整数，未配置或 ≤0 时取默认值 `5`；**仅对 `Stop` 有效** |
| hook 组 | `hooks` | 是 | 该组下要执行的 hook 列表 |
| hook 定义 | `type` | 否 | 默认 `command`，当前只支持 `command` |
| hook 定义 | `command` | 是 | 要执行的 shell 命令 |
| hook 定义 | `timeout` | 否 | 超时秒数，默认 `30` |

**创建方式**：`Settings > Hooks` → 在 Configuration 里选 Global 或 Project → Configured Hooks 里点 `Create` → 阅读并确认安全警告后点 `Enable`，TraeCode 在对应目录创建 `hooks.json` 并默认启用该 hook 配置 → 在文件里按上面的格式写事件与命令并保存。之后可以用齿轮图标打开 `hooks.json` 编辑，或用开关启用/禁用。[@ref-trae-hooks-create]

**导入 Claude Code hook**：同一面板里把 `Import Hook configuration in CLAUDE` 开关打开并确认安全警告。官方明确提醒："The input and output parameters for hook events with the same name may differ between TraeCode and Claude Code."——导入后需要按 TraeCode 的事件规范检查调整。[@ref-trae-hooks-claude]

## 输入、输出与退出码 {#hooks-io}

所有 hook 命令走标准 I/O：**stdin 收 JSON，stdout 与退出码控制 Agent 行为**。[@ref-trae-hook-io]

**通用 stdin 字段**：`session_id`、`cwd`（当前 hook 命令的实际工作目录）、`hook_event_name`、`workspace_roots`（多工作区时为全部根目录）。[@ref-trae-hook-stdin]

**通用 stdout**：可以输出 JSON（结构化控制流程）或纯文本（作为附加上下文交给模型，**仅 `SessionStart` 与 `UserPromptSubmit` 支持纯文本**）。JSON 通用字段是 `continue`（默认 `true`；设为 `false` 时 Agent 停止执行，**优先级高于任何事件专用字段**）与 `stopReason`（`continue` 为 false 时展示给用户的原因）。[@ref-trae-hook-stdout]

**退出码语义**：`0` 正常退出，stdout 按事件类型解析为 JSON 或纯文本；`2` 阻塞错误，stderr 内容作为错误信息进入模型上下文，具体行为因事件而异；其它退出码为非阻塞错误，stdout/stderr 都被忽略，不影响流程。[@ref-trae-hook-exit]

**各事件的专用输入输出**（原文表择要）：[@ref-trae-hook-sessionstart][@ref-trae-hook-userprompt][@ref-trae-hook-pretool][@ref-trae-hook-posttool][@ref-trae-hook-stop]

| 事件 | stdin 专用字段 | stdout 可控行为 | 退出码 2 的语义 |
| :-- | :-- | :-- | :-- |
| `SessionStart` | `source`（当前只支持 `startup`） | 纯文本或 `hookSpecificOutput.additionalContext` 追加上下文；可写 `$TRAE_ENV_FILE` 注入环境变量 | 不影响本次会话流程 |
| `UserPromptSubmit` | `prompt` | `decision: "block"` + `reason` 阻止本次提示；`additionalContext` 追加上下文 | 等价于 `decision: "block"`，并把 stderr 展示给用户 |
| `PreToolUse` | `tool_use_id`、`tool_name`、`llm_tool_name`、`tool_input` | `permissionDecision` 取 `allow`/`deny`/`ask`、`permissionDecisionReason`、`updatedInput`（**整体覆盖**原参数，不是合并）、`additionalContext` | 等价于 `permissionDecision: "deny"`，并把 stderr 作为原因加入模型上下文 |
| `PostToolUse` | 同上外加 `tool_response` | `decision: "block"` + `reason` 向模型发阻塞消息；`additionalContext` | 把 stderr 交给模型（工具已执行，不可撤销） |
| `Stop` | `stop_hook_active`、`loop_count`、`last_assistant_message` | `decision: "block"` + `reason` 阻止停止，`reason` 作为新的用户查询继续执行 | 等价于 `decision: "block"`，stderr 作为新的用户查询 |

`PreToolUse` 的 `permissionDecision` 有两条硬规则：多个 `PreToolUse` hook 并行时只返回一个最终值，优先级从高到低为 `deny` → `ask` → `allow`；返回 `allow` 但工具自身处于手动确认模式时，"the tool's operation mode takes precedence"，仍需用户确认。[@ref-trae-hook-pretool]

`PreToolUse`/`PostToolUse` 的 `matcher` 匹配的是**标准化工具名**：`Read`、`Write`、`Edit`、`Glob`、`Grep`、`LS`、`RunCommand`、`WebSearch`、`WebFetch`、`AskUserQuestion`、`Skill`，以及 MCP 工具的 `mcp__{serverName}__{toolName}` 形式（可用 `mcp__.` 匹配全部 MCP 工具）。[@ref-trae-hook-toolnames]

## 顺序、并发、环境与工作目录 {#hooks-order-env}

**顺序与并发**：固定来源给出的规则有三条。其一，多个配置文件**合并执行**——同一工作区含多个项目根目录且各自启用项目 hook 时逐份读取合并执行，Claude Code hook 与 TraeCode hook 同时启用时同样合并执行。[@ref-trae-hook-locations] 其二，同一事件下多个 `PreToolUse` hook 并行时 `permissionDecision` 只返回一个最终值，优先级 `deny` > `ask` > `allow`。其三，`Stop` 事件的重复触发用 `loop_limit` 约束（`loop_count ≥ loop_limit` 时跳过该 hook 组，默认 5），官方还给出决策控制流程："跳过 → 允许停止 / `decision: block` → 用 reason 作为新查询 / 退出码 2 → 用 stderr 作为新查询 / 其它退出码 → 忽略错误允许停止"。[@ref-trae-hook-fields]

**失败与超时**：hook 定义层的 `timeout` 默认 30 秒；非 0/2 的退出码按非阻塞错误处理，stdout/stderr 被忽略，不改变 Agent 流程。[@ref-trae-hook-fields][@ref-trae-hook-exit]

**执行 Shell**：命令在系统默认 shell 里执行——macOS/Linux 默认 **Bash**，Windows 默认 **PowerShell**。[@ref-trae-hook-env]

**环境变量**：执行时可用 `TRAE_PROJECT_DIR`（当前 hook 命令的工作区目录，与 `stdin.cwd` 一致）与 `CLAUDE_PROJECT_DIR`（Claude Code 兼容变量，含义相同）；`SessionStart` 事件额外注入 `TRAE_ENV_FILE` 与 `CLAUDE_ENV_FILE`，用于把变量写入当前会话的后续执行环境。[@ref-trae-hook-envvars]

**环境变量文件**：`SessionStart` 的 hook 可以把键值对写到 `TRAE_ENV_FILE` 指向的文件，写入的变量对**本次会话后续的 hook 执行与 `RunCommand` 工具调用**生效，但不影响当前这次 `SessionStart` hook 自身；支持 Bash（`export NODE_ENV=production`）、PowerShell（`$env:NODE_ENV=production`）与 dotenv（`NODE_ENV=production`）三种格式。[@ref-trae-hook-envfile]

**工作目录**：全局 hook 命令在单工作区时用该工作区根目录、多工作区时用第一个工作区的根目录；项目 hook 命令用该 hook 配置文件所在项目的根目录。[@ref-trae-hook-cwd]

## 生效条件与诊断 {#hooks-conditions-diagnostics}

**执行模式**决定 hook 命令的实际权限范围，两档可选：`Run in Sandbox`（自动在沙箱内执行，文件与系统权限受沙箱限制）与 `Run Automatically Locally`（始终在沙箱外自动执行，可访问本机环境，"This carries higher security risks"）。第一方字段说明同样写明："The actual permissions and accessible scope of hook commands depend on the execution mode you configure."。[@ref-trae-hooks-mode][@ref-trae-hook-execmode]

**启用条件**：hook 配置需要先在 `Settings > Hooks` 里创建并通过安全警告确认（点 `Enable`），创建时即默认启用；之后可用开关逐项启用/禁用，或打开 `hooks.json` 修改。也就是说"文件存在"不等于"已启用"，面板开关是独立状态。[@ref-trae-hooks-create]

**日志**：`Settings > Hooks` 的 Execution Mode 区域有 `View Logs` 按钮，TraeCode 打开 Output 面板并显示 "Agent Hooks" 日志。官方提示：退出 TraeCode 后当前周期的 hook 执行日志会被清空。[@ref-trae-hooks-logs]

**缺口（`hooks.diagnostics`）**：文档没有给出"配置被读取/事件被匹配/命令被执行"的分段诊断标记，也没有说明改完 `hooks.json` 是否需要重启或重开会话才生效；可观察点只有 Output 面板的 Agent Hooks 日志与面板开关状态。[@ref-trae-hooks-logs]
