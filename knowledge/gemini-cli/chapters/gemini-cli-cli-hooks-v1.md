---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-hooks-v1
harness_id: gemini-cli
topic: hooks
title: "Gemini CLI 的 hooks：事件、配置、输入输出、执行顺序与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-hooks-doc-what, ref-gemini-cli-hooks-best-perf, ref-gemini-cli-hooks-ref-mechanics]
  - section_id: hooks-events-entry
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-hooks-doc-events, ref-gemini-cli-plugins-ref-hooks, ref-gemini-cli-hooks-ref-definition, ref-gemini-cli-hooks-doc-schema, ref-gemini-cli-hooks-doc-config, ref-gemini-cli-hooks-registry-sources, ref-gemini-cli-hooks-doc-fields, ref-gemini-cli-settings-hooksconfig, ref-gemini-cli-settings-hooks, ref-gemini-cli-settings-doc-hooksconfig]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-hooks-ref-mechanics, ref-gemini-cli-hooks-ref-input, ref-gemini-cli-hooks-ref-toolhooks, ref-gemini-cli-hooks-ref-agenthooks, ref-gemini-cli-hooks-ref-modelhooks, ref-gemini-cli-hooks-ref-lifecycle, ref-gemini-cli-hooks-runner-env, ref-gemini-cli-hooks-doc-envvars, ref-gemini-cli-config-doc-redaction, ref-gemini-cli-hooks-doc-exitcodes, ref-gemini-cli-hooks-runner-defaults, ref-gemini-cli-hooks-runner-outcome, ref-gemini-cli-hooks-ref-output, ref-gemini-cli-hooks-ref-beforetool, ref-gemini-cli-hooks-ref-aftertool, ref-gemini-cli-hooks-ref-beforeagent, ref-gemini-cli-hooks-ref-afteragent, ref-gemini-cli-hooks-ref-beforemodel, ref-gemini-cli-hooks-ref-beforetoolselection, ref-gemini-cli-hooks-doc-json, ref-gemini-cli-hooks-ref-sessionstart, ref-gemini-cli-hooks-ref-sessionend, ref-gemini-cli-hooks-ref-notification, ref-gemini-cli-hooks-ref-precompress, ref-gemini-cli-hooks-ref-modelapi]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-hooks-registry-priority, ref-gemini-cli-hooks-planner-plan, ref-gemini-cli-hooks-planner-dedupe, ref-gemini-cli-hooks-planner-match, ref-gemini-cli-hooks-runner-defaults, ref-gemini-cli-hooks-runner-timeout, ref-gemini-cli-hooks-ref-beforetoolselection, ref-gemini-cli-settings-hooksconfig, ref-gemini-cli-hooks-registry-trust, ref-gemini-cli-config-trusted-dialog, ref-gemini-cli-hooks-doc-security]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-cmd-hooks, ref-gemini-cli-hooks-doc-manage, ref-gemini-cli-hooks-best-panel, ref-gemini-cli-hooks-best-telemetry, ref-gemini-cli-hooks-best-debug, ref-gemini-cli-hooks-doc-json, ref-gemini-cli-hooks-best-exitcodes, ref-gemini-cli-settings-hooksconfig, ref-gemini-cli-hooks-planner-plan]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-gemini-cli-hooks-doc-events, ref-gemini-cli-plugins-ref-hooks]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-events-entry
        status: answered
        source_refs: [ref-gemini-cli-hooks-ref-definition, ref-gemini-cli-hooks-doc-schema, ref-gemini-cli-hooks-doc-config, ref-gemini-cli-hooks-registry-sources, ref-gemini-cli-hooks-doc-fields, ref-gemini-cli-settings-hooksconfig, ref-gemini-cli-settings-hooks, ref-gemini-cli-settings-doc-hooksconfig]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-gemini-cli-hooks-ref-input, ref-gemini-cli-hooks-ref-toolhooks, ref-gemini-cli-hooks-ref-agenthooks, ref-gemini-cli-hooks-ref-modelhooks, ref-gemini-cli-hooks-ref-lifecycle, ref-gemini-cli-hooks-runner-env, ref-gemini-cli-hooks-doc-envvars, ref-gemini-cli-config-doc-redaction]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-gemini-cli-hooks-doc-exitcodes, ref-gemini-cli-hooks-ref-mechanics, ref-gemini-cli-hooks-runner-defaults, ref-gemini-cli-hooks-runner-outcome, ref-gemini-cli-hooks-ref-output, ref-gemini-cli-hooks-ref-beforetool, ref-gemini-cli-hooks-ref-aftertool, ref-gemini-cli-hooks-ref-beforeagent, ref-gemini-cli-hooks-ref-afteragent, ref-gemini-cli-hooks-ref-beforemodel, ref-gemini-cli-hooks-ref-beforetoolselection, ref-gemini-cli-hooks-doc-json, ref-gemini-cli-hooks-ref-sessionstart, ref-gemini-cli-hooks-ref-sessionend, ref-gemini-cli-hooks-ref-notification, ref-gemini-cli-hooks-ref-precompress, ref-gemini-cli-hooks-ref-modelapi]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-gemini-cli-hooks-registry-priority, ref-gemini-cli-hooks-planner-plan, ref-gemini-cli-hooks-planner-dedupe, ref-gemini-cli-hooks-planner-match, ref-gemini-cli-hooks-runner-defaults, ref-gemini-cli-hooks-runner-timeout, ref-gemini-cli-hooks-ref-beforetoolselection]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-gemini-cli-settings-hooksconfig, ref-gemini-cli-hooks-registry-trust, ref-gemini-cli-config-trusted-dialog, ref-gemini-cli-hooks-doc-security]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-cmd-hooks, ref-gemini-cli-hooks-doc-manage, ref-gemini-cli-hooks-best-panel, ref-gemini-cli-hooks-best-telemetry, ref-gemini-cli-hooks-best-debug, ref-gemini-cli-hooks-doc-json, ref-gemini-cli-hooks-best-exitcodes, ref-gemini-cli-settings-hooksconfig, ref-gemini-cli-hooks-planner-plan]
---

## 固定来源与适用范围 {#hooks-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 提交
`38700b4b38bf387dafded6c97c3f190d084b49e9` 的
`docs/hooks/index.md`、`docs/hooks/reference.md`、`docs/hooks/best-practices.md`、`docs/reference/configuration.md`（`hooks`、`hooksConfig`
段）与 `packages/core/src/hooks/*` 源码。固定来源未注明适用软件版本，本章是来源级知识。

Hooks 是"在 agent 循环的固定时点执行的脚本或程序"，运行方式为同步：事件触发后 CLI 等待所有匹配的 hook 完成才继续
[@ref-gemini-cli-hooks-doc-what][@ref-gemini-cli-hooks-best-perf]。通信约定是 stdin 传
JSON 输入、stdout 只输出一个 JSON 对象、stderr 用于日志 [@ref-gemini-cli-hooks-ref-mechanics]。

## 事件、配置入口与字段 {#hooks-events-entry}

**hooks.events**：第一方事件共 11 个，文档表格给出触发时点与用途 [@ref-gemini-cli-hooks-doc-events]：

| 事件 | 触发时点 | 影响 |
| :-- | :-- | :-- |
| `SessionStart` | 会话开始（启动、恢复、`/clear`） | 注入上下文 |
| `SessionEnd` | 会话结束（退出、清除） | 仅提示 |
| `BeforeAgent` | 用户提交提示后、规划前 | 阻断本轮或注入上下文 |
| `AfterAgent` | agent 循环结束时 | 强制重试或停止 |
| `BeforeModel` | 请求发给模型前 | 阻断本轮或伪造响应 |
| `AfterModel` | 收到模型响应（流式下每个 chunk） | 阻断本轮或改写内容 |
| `BeforeToolSelection` | 模型选择工具前 | 过滤工具集 |
| `BeforeTool` | 工具执行前 | 阻断或改写参数 |
| `AfterTool` | 工具执行后 | 阻断结果或注入上下文 |
| `PreCompress` | 上下文压缩前 | 仅提示 |
| `Notification` | 系统通知发生时 | 仅提示 |

同名事件在扩展里的来源是扩展目录下的 `hooks/hooks.json`（不在 `gemini-extension.json`
清单里定义）[@ref-gemini-cli-plugins-ref-hooks]。

**hooks.entry**：hook 配置写在 `settings.json` 的 `hooks` 对象里，键是事件名，值是"匹配组"数组；每个匹配组含
`matcher`、`sequential` 与必填的 `hooks` 数组，数组元素是具体 hook 定义
[@ref-gemini-cli-hooks-ref-definition][@ref-gemini-cli-hooks-doc-schema]。合并顺序（文档）：项目
`项目根/.gemini/settings.json` > 用户 `~/.gemini/settings.json` > 系统
`/etc/gemini-cli/settings.json`（路径按平台） > 扩展提供的 hook
[@ref-gemini-cli-hooks-doc-config]；源码里的排序键与之吻合：runtime(0) → project(1) → user(2)
→ system(3) → extensions(4) [@ref-gemini-cli-hooks-registry-sources]。

字段表 [@ref-gemini-cli-hooks-doc-fields][@ref-gemini-cli-hooks-ref-definition]：

| 层 | 字段 | 必填 | 说明 |
| :-- | :-- | :-- | :-- |
| 匹配组 | `matcher` | 否 | 工具事件按正则匹配工具名（如 `write_.*`）；生命周期事件按精确字符串（如 `startup`）；`*` 或空串匹配全部 |
| 匹配组 | `sequential` | 否 | true 时该组内 hook 串行执行，false 并行 |
| 匹配组 | `hooks` | 是 | hook 定义数组 |
| hook | `type` | 是 | 执行引擎，目前仅支持 `command` |
| hook | `command` | 是 | 要执行的 shell 命令 |
| hook | `name` | 否 | 用于日志与管理命令识别 |
| hook | `timeout` | 否 | 毫秒，默认 60000 |
| hook | `description` | 否 | 用途说明 |

最小示例（来自官方 hooks 索引页）[@ref-gemini-cli-hooks-doc-schema]：

```json
{
  "hooks": {
    "BeforeTool": [
      {
        "matcher": "write_file|replace",
        "hooks": [
          {
            "name": "security-check",
            "type": "command",
            "command": "$GEMINI_PROJECT_DIR/.gemini/hooks/security.sh",
            "timeout": 5000
          }
        ]
      }
    ]
  }
}
```

`settings.json` 里还有三个与 hook 系统整体相关的设置：`hooksConfig.enabled`（默认 true，需重启，false
时不执行任何 hook）、`hooksConfig.disabled`（按 hook
名的禁用清单）、`hooksConfig.notifications`（默认
true，执行时显示提示）[@ref-gemini-cli-settings-hooksconfig][@ref-gemini-cli-settings-hooks][@ref-gemini-cli-settings-doc-hooksconfig]。

## 输入、环境与输出语义 {#hooks-io}

**hooks.input**：所有 hook 都会收到一组公共字段：`session_id`、`transcript_path`（会话记录 JSON
的绝对路径）、`cwd`、`hook_event_name`、`timestamp`
[@ref-gemini-cli-hooks-ref-input]。事件专属输入按事件给：`BeforeTool`/`AfterTool` 收到
`tool_name`、`tool_input`、可选的 `mcp_context` 与 `original_request_name`；`AfterTool`
还收到 `tool_response`（含 `llmContent`、`returnDisplay`、可选
`error`）；`BeforeAgent`/`AfterAgent` 收到 `prompt`（后者还有
`prompt_response`、`stop_hook_active`）；`BeforeModel`/`BeforeToolSelection`/`AfterModel`
收到 `llm_request`/`llm_response`，且 `BeforeModel` 使用与 SDK
无关的稳定结构（`model`、`messages`、`config`、`toolConfig`）；`SessionStart` 收到
`source`（`startup`/`resume`/`clear`），`SessionEnd` 收到 `reason`，`Notification` 收到
`notification_type` 与 `message`，`PreCompress` 收到 `trigger`
[@ref-gemini-cli-hooks-ref-toolhooks][@ref-gemini-cli-hooks-ref-agenthooks][@ref-gemini-cli-hooks-ref-modelhooks][@ref-gemini-cli-hooks-ref-lifecycle]。

执行环境：子进程环境由"净化后的宿主环境"叠加专用变量组成——`GEMINI_PROJECT_DIR`（项目根）、`GEMINI_PLANS_DIR`、`GEMINI_CWD`、`GEMINI_SESSION_ID`、`CLAUDE_PROJECT_DIR`（兼容别名），再叠加
hook 定义里的 `env`
[@ref-gemini-cli-hooks-runner-env][@ref-gemini-cli-hooks-doc-envvars]。敏感内容处理：走的是通用的环境净化器（与
MCP 子进程同一套脱敏配置），命中
`*TOKEN*`、`*SECRET*`、`*PASSWORD*`、`*KEY*`、`*AUTH*`、`*CREDENTIAL*` 等名字或值模式的变量不会传给
hook [@ref-gemini-cli-config-doc-redaction][@ref-gemini-cli-hooks-runner-env]。

**hooks.output**：两个维度。其一，退出码决定高层结果——`0` 表示成功并解析 stdout 的 JSON（包括有意的
`decision: deny`）；`2` 表示系统级阻断，stderr 作为拒绝理由；其它值是非致命失败，仅提示并继续用原始参数
[@ref-gemini-cli-hooks-doc-exitcodes][@ref-gemini-cli-hooks-ref-mechanics]。源码里只特判
`0` 与 `1`（`1` 视作非阻塞错误），其余非零码走警告路径
[@ref-gemini-cli-hooks-runner-defaults][@ref-gemini-cli-hooks-runner-outcome]。其二，stdout
JSON 的公共字段：`systemMessage`（立即展示给用户）、`suppressOutput`、`continue`（false 立即终止整个
agent 循环）、`stopReason`、`decision`（`allow`/`deny`，`block` 是别名）、`reason`（deny
时的反馈） [@ref-gemini-cli-hooks-ref-output]。事件专属输出写在 `hookSpecificOutput`
下：`BeforeTool` 可用 `tool_input` 覆盖模型参数；`AfterTool` 可用 `additionalContext` 追加内容、用
`tailToolCallRequest` 让另一个工具的结果替换原响应；`BeforeAgent`/`SessionStart` 用
`additionalContext` 注入上下文；`AfterAgent` 可用 `clearContext` 清空历史；`BeforeModel` 可覆盖
`llm_request` 或直接给出 `llm_response` 跳过模型调用；`BeforeToolSelection` 可用
`toolConfig.mode`（`AUTO`/`ANY`/`NONE`）与 `allowedFunctionNames` 过滤工具，多个 hook
的白名单取并集，且该事件不支持 `decision`/`continue`/`systemMessage`
[@ref-gemini-cli-hooks-ref-beforetool][@ref-gemini-cli-hooks-ref-aftertool][@ref-gemini-cli-hooks-ref-beforeagent][@ref-gemini-cli-hooks-ref-afteragent][@ref-gemini-cli-hooks-ref-beforemodel][@ref-gemini-cli-hooks-ref-beforetoolselection]。

必须在 stdout 只打印最终 JSON：出现任何额外文本会导致解析失败，此时 CLI 退化为"允许"并把整段输出当作 systemMessage
[@ref-gemini-cli-hooks-doc-json]。生命周期类 hook 的输出被部分忽略：`SessionStart` 忽略
`continue`/`decision`，`SessionEnd` 不等待完成且忽略所有流程控制字段，`Notification` 与
`PreCompress` 仅可提示
[@ref-gemini-cli-hooks-ref-sessionstart][@ref-gemini-cli-hooks-ref-sessionend][@ref-gemini-cli-hooks-ref-notification][@ref-gemini-cli-hooks-ref-precompress]。模型
hook 操作的是稳定结构 `LLMRequest`/`LLMResponse`，文本以外的 part 在进入 hook 前被过滤
[@ref-gemini-cli-hooks-ref-modelapi]。

## 顺序、并发与生效条件 {#hooks-order-conditions}

**hooks.order**：每个事件取该事件的已启用 hook，按来源优先级排序，再做去重（配置内容相同者只保留一个），然后生成执行计划：只要组内任一
hook 定义写了 `sequential: true`，整组串行，否则并行
[@ref-gemini-cli-hooks-registry-priority][@ref-gemini-cli-hooks-planner-plan][@ref-gemini-cli-hooks-planner-dedupe]。匹配规则：工具事件把
`matcher` 当正则测试工具名（正则非法时退回精确比较），生命周期事件按精确字符串比较 trigger，空串与 `*` 视为全匹配；无 `matcher`
时匹配全部 [@ref-gemini-cli-hooks-planner-match]。超时：默认 60000 毫秒，超时后终结子进程（Windows 用
`taskkill`，其它平台先 SIGTERM、5 秒后 SIGKILL），该次执行以超时错误结束
[@ref-gemini-cli-hooks-runner-defaults][@ref-gemini-cli-hooks-runner-timeout]。文档没有给出多
hook 结果冲突时的合并总则（除 `BeforeToolSelection` 的并集规则与"`NONE` 胜过其它 hook"），这一点按 partial
阅读 [@ref-gemini-cli-hooks-ref-beforetoolselection]。

**hooks.conditions**：四个条件。其一，`hooksConfig.enabled` 为 false 时不执行任何
hook；`hooksConfig.disabled` 按名禁用单个 hook
[@ref-gemini-cli-settings-hooksconfig]。其二，文件夹信任：源码在初始化时对项目级 hook 做受信检查，未受信时跳过项目
hook 并记录 "Project hooks disabled because the folder is not trusted."
[@ref-gemini-cli-hooks-registry-trust]；信任开关与判定见配置章节
[@ref-gemini-cli-config-trusted-dialog]。其三，项目 hook 指纹：CLI 会给项目 hook 打指纹，hook 的
name 或 command 变化（例如 `git pull` 之后）会被当作"新的未受信 hook"并在执行前警告，未确认的 hook 会被列出
[@ref-gemini-cli-hooks-doc-security][@ref-gemini-cli-hooks-registry-trust]。其四，hook
以用户权限执行任意命令，文档对此给出明确风险警告 [@ref-gemini-cli-hooks-doc-security]。缺口：登记来源没有描述 hook
与沙箱（`sandbox`/`tools.sandbox`）以及策略引擎的交互——hook 是否在沙箱内运行、策略能否拦截 hook 命令均无说明；这两点状态
partial（已检查 hooks 三篇文档与 `hooksConfig`、`security` 两组设置）。

## 诊断 {#hooks-diagnostics}

可用入口。`/hooks list`（别名 `show`、`panel`）列出所有已注册 hook
及其状态，`/hooks enable NAME`、`/hooks disable NAME`、`/hooks enable-all`、`/hooks disable-all`
逐个或整体切换
[@ref-gemini-cli-cmd-hooks][@ref-gemini-cli-hooks-doc-manage]；`/hooks panel`
会展示执行次数、最近成功/失败、错误消息与耗时，best practices 把它列为首选排查入口
[@ref-gemini-cli-hooks-best-panel]。日志侧：hook 执行在 `telemetry.logPrompts` 开启时被记录
[@ref-gemini-cli-hooks-best-telemetry]；文档推荐把调试信息写进 stderr 或专用日志文件，因为 stdout 只允许
JSON，污染 stdout 是最常见的失败原因
[@ref-gemini-cli-hooks-best-debug][@ref-gemini-cli-hooks-doc-json]。退出码语义可对照排查：`0`
成功、`2` 阻断（工具事件只阻断该工具，agent 事件中止本轮，`AfterAgent` 触发重试）、其它值为警告
[@ref-gemini-cli-hooks-best-exitcodes]。配置修改何时生效：`hooksConfig.*` 标记需要重启，而
`/hooks` 的启停是即时状态
[@ref-gemini-cli-settings-hooksconfig][@ref-gemini-cli-cmd-hooks]。另有一个可离线使用的验证方式：把样例
JSON 用管道喂给 hook 脚本并检查退出码 [@ref-gemini-cli-hooks-best-debug]。缺口：没有把"hook 被发现 / 匹配
/ 执行 / 失败"拆成四条独立输出的诊断通道，也没有说明 `matcher` 不匹配时的可见提示（源码只在 debug
日志里记录去重与计划信息）。partial [@ref-gemini-cli-hooks-planner-plan]。
