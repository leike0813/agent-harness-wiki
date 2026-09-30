---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-hooks-v1
harness_id: qwen-code
topic: hooks
title: "Qwen Code CLI 的 Hooks：事件、注册、输入、输出、顺序、条件与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-overview, ref-qwen-readme-acknowledgments]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-hook-events, ref-qwen-hooks-individual-hook-event-details, ref-qwen-hooks-pretooluse, ref-qwen-hooks-posttooluse, ref-qwen-hooks-posttoolusefailure, ref-qwen-hooks-posttoolbatch, ref-qwen-hooks-userpromptsubmit, ref-qwen-hooks-userpromptexpansion, ref-qwen-hooks-sessionstart, ref-qwen-hooks-sessionend, ref-qwen-hooks-sessiondelete, ref-qwen-hooks-messagedisplay, ref-qwen-hooks-stop, ref-qwen-hooks-stopfailure, ref-qwen-hooks-subagentstart, ref-qwen-hooks-subagentstop, ref-qwen-hooks-precompact, ref-qwen-hooks-postcompact, ref-qwen-hooks-notification, ref-qwen-hooks-permissionrequest, ref-qwen-hooks-permissiondenied, ref-qwen-hooks-todocreated, ref-qwen-hooks-todocompleted, ref-qwen-hooks-instructionsloaded, ref-qwen-hooks-browsing-your-hooks]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-hook-configuration, ref-qwen-hooks-hook-types, ref-qwen-hooks-command-hooks, ref-qwen-hooks-http-hooks, ref-qwen-hooks-function-hooks, ref-qwen-hooks-prompt-hooks, ref-qwen-hooks-matcher-patterns, ref-qwen-hooks-agent-frontmatter-scope, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks, ref-qwen-sub-agents-claude-code-compatibility-fields]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-hook-input-structure, ref-qwen-hooks-command-hooks, ref-qwen-hooks-prompt-hooks, ref-qwen-hooks-userpromptsubmit, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-hook-output-structure, ref-qwen-hooks-individual-hook-event-details, ref-qwen-hooks-pretooluse]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-hook-execution, ref-qwen-hooks-parallel-vs-sequential-execution, ref-qwen-hooks-async-hooks, ref-qwen-hooks-command-hooks, ref-qwen-hooks-hook-configuration, ref-qwen-hooks-stop, ref-qwen-hooks-posttoolbatch, ref-qwen-hooks-messagedisplay]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-overview, ref-qwen-hooks-browsing-your-hooks, ref-qwen-hooks-security-model, ref-qwen-hooks-allowing-private-network-hooks-managed-environments-only, ref-qwen-hooks-hook-configuration, ref-qwen-hooks-agent-frontmatter-scope, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-hooks-browsing-your-hooks, ref-qwen-hooks-a-hook-does-not-fire, ref-qwen-hooks-other-checks]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: partial
        source_refs: [ref-qwen-hooks-hook-events, ref-qwen-hooks-individual-hook-event-details, ref-qwen-hooks-pretooluse]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-qwen-hooks-hook-configuration, ref-qwen-hooks-hook-types, ref-qwen-hooks-matcher-patterns, ref-qwen-hooks-command-hooks, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks, ref-qwen-sub-agents-claude-code-compatibility-fields]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-qwen-hooks-hook-input-structure, ref-qwen-hooks-command-hooks, ref-qwen-hooks-prompt-hooks, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-qwen-hooks-hook-output-structure, ref-qwen-hooks-pretooluse, ref-qwen-hooks-individual-hook-event-details]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-qwen-hooks-parallel-vs-sequential-execution, ref-qwen-hooks-hook-execution, ref-qwen-hooks-async-hooks, ref-qwen-hooks-command-hooks, ref-qwen-hooks-stop, ref-qwen-hooks-posttoolbatch, ref-qwen-hooks-messagedisplay]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-qwen-hooks-overview, ref-qwen-hooks-browsing-your-hooks, ref-qwen-hooks-security-model, ref-qwen-hooks-allowing-private-network-hooks-managed-environments-only, ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-qwen-hooks-browsing-your-hooks, ref-qwen-hooks-a-hook-does-not-fire, ref-qwen-hooks-other-checks]
---

## 范围与来源 {#hooks-scope}

本章描述 Qwen Code CLI 的第一方 Hook 系统：它触发的事件、Hook 如何跨作用域配置与注册、输入与输出的 JSON 契约、执行顺序与并发、Hook 被禁用所依据的条件，以及如何诊断。Hook 是用户定义的脚本、HTTP 端点、会话函数或 LLM 提示词，在应用流程的预定义时点自动执行；它们默认启用 [@ref-qwen-hooks-overview] [@ref-qwen-readme-acknowledgments]。

固定来源：QwenLM/qwen-code 仓库固定在提交 `e767e223c5c1d6fe13217d95faf365721e6e3437`。本章的权威文档为 `docs/users/features/hooks.md`（主参考，每个事件一节，外加 matcher、输入/输出、顺序与安全各节）、`docs/users/features/skills.md`（Skill frontmatter 的 `hooks:` 注册）以及 `docs/users/features/sub-agents.md`（agent frontmatter 的 Hook 作用域）。Qwen Code 最初基于 Google Gemini CLI v0.8.2，自 v0.1 起停止与上游同步并独立发展——因此固定提交处本仓库的文档是当前行为的权威 [@ref-qwen-readme-acknowledgments]。当某文档明确表示某字段是为与另一 agent 兼容而接受时（例如 Claude Code 的 agent frontmatter 字段），本章将其记为有文档记载的兼容性，而非 Gemini 继承。

## Hook 事件 {#hooks-events}

Hook 在会话期间的固定时点触发。下表列出本源所枚举的第一方事件——共 **22 个**——以及触发每个事件的操作 [@ref-qwen-hooks-hook-events] [@ref-qwen-hooks-individual-hook-event-details]。

| 事件 | 触发时机 |
| :---- | :---- |
| `PreToolUse` | 工具执行之前 [@ref-qwen-hooks-pretooluse] |
| `PostToolUse` | 工具成功完成之后 [@ref-qwen-hooks-posttooluse] |
| `PostToolUseFailure` | 工具执行失败之后 [@ref-qwen-hooks-posttoolusefailure] |
| `PostToolBatch` | 一批工具调用全部 resolve 之后触发一次 [@ref-qwen-hooks-posttoolbatch] |
| `UserPromptSubmit` | 受支持的模型调用之前；可能出现在续接路径上 [@ref-qwen-hooks-userpromptsubmit] |
| `UserPromptExpansion` | 斜杠命令展开为提示词之后、发送之前 [@ref-qwen-hooks-userpromptexpansion] |
| `SessionStart` | 会话开始或恢复时（`startup`、`resume`、`clear`、`compact`） [@ref-qwen-hooks-sessionstart] |
| `SessionEnd` | 会话结束时 [@ref-qwen-hooks-sessionend] |
| `SessionDelete` | 显式选择的会话被永久删除之后；fire-and-forget [@ref-qwen-hooks-sessiondelete] |
| `MessageDisplay` | 回复流式输出期间反复触发，先于 `Stop` [@ref-qwen-hooks-messagedisplay] |
| `Stop` | 轮次结束之前 [@ref-qwen-hooks-stop] |
| `StopFailure` | API 错误或循环检测结束轮次时，取代 `Stop`；fire-and-forget [@ref-qwen-hooks-stopfailure] |
| `SubagentStart` | 子 agent 启动时 [@ref-qwen-hooks-subagentstart] |
| `SubagentStop` | 子 agent 停止时 [@ref-qwen-hooks-subagentstop] |
| `PreCompact` | 对话压缩之前 [@ref-qwen-hooks-precompact] |
| `PostCompact` | 压缩成功之后 [@ref-qwen-hooks-postcompact] |
| `Notification` | 发送通知时 [@ref-qwen-hooks-notification] |
| `PermissionRequest` | 显示权限对话框时 [@ref-qwen-hooks-permissionrequest] |
| `PermissionDenied` | AUTO 模式分类器拒绝工具调用时 [@ref-qwen-hooks-permissiondenied] |
| `TodoCreated` | `todo_write` 创建待办项时 [@ref-qwen-hooks-todocreated] |
| `TodoCompleted` | 待办项被标记完成时 [@ref-qwen-hooks-todocompleted] |
| `InstructionsLoaded` | 加载上下文文件（`QWEN.md` 或被导入的文件）时 [@ref-qwen-hooks-instructionsloaded] |

matcher 的匹配目标随事件而异（工具 id、agent 类型、source、reason、错误类型、trigger、通知类型或命令名）；`PostToolBatch`、`SessionDelete`、`TodoCreated`、`TodoCompleted`、`MessageDisplay`、`UserPromptSubmit` 与 `Stop` 等事件不声明 matcher，始终触发 [@ref-qwen-hooks-hook-events]。

**缺口（插件事件）。** 扩展/插件能否定义它*自己*的事件名，或以同一批第一方事件名贡献 Hook，本章所引来源均未确立。hooks 文档确实说明扩展提供的 Hook 以 source Extension 加载，且扩展提供的 Skill 不能使用 `hooks:` frontmatter（改用扩展清单自身的 hooks）[@ref-qwen-hooks-browsing-your-hooks] [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]，但扩展清单的事件词表超出本章的来源范围。

## 注册与入口 {#hooks-entry}

Hook 配置在 Qwen Code 的设置中——通常是 `.qwen/settings.json`（项目）或用户配置文件——位于以事件名为键的顶层 `hooks` 对象之下。在同一事件内，来自设置与扩展的串行 Hook 按此顺序运行：Project、User、System、Extension [@ref-qwen-hooks-hook-configuration]。没有 `name` 字段的 Hook 在满足其事件与 matcher 条件时总会执行；只有具名 Hook 才能在运行时被单独启用/禁用 [@ref-qwen-hooks-hook-configuration]。

共有四种执行器类型 [@ref-qwen-hooks-hook-types]：

- **`command`** —— 运行 shell 命令；输入 JSON 经 stdin，输出经 stdout。字段：`command`（必填）、`timeout`（秒，默认 60）、`async`、`env`、`shell`（`bash`/`powershell`）、`name`、`description`、`statusMessage` [@ref-qwen-hooks-command-hooks]。
- **`http`** —— 将输入 JSON POST 到 `url`。字段：`url`（必填）、`headers`、`allowedEnvVars`、`timeout`（秒，默认 600）、`once`（每个会话对每个事件仅运行一次）、`name`、`statusMessage` [@ref-qwen-hooks-http-hooks]。
- **`function`** —— 直接调用已注册的 JS/TS 函数；仅限会话级，由 Skill 系统内部使用，不是公开 API [@ref-qwen-hooks-function-hooks]。
- **`prompt`** —— 将输入替换到 `$ARGUMENTS` 后发送给 LLM（默认：你当前的模型），后者必须返回 `{ok, reason, additionalContext}`。字段：`prompt`（必填）、`model`、`timeout`（秒，默认 30） [@ref-qwen-hooks-prompt-hooks]。

`matcher` 是过滤器。空字符串、`*` 或 `.*` 匹配该类型的所有事件；以 `|` 分隔的列表在任一条目恰好等于该值（或 `*`/`.*`）时匹配，除非 matcher 以 `^` 或 `(` 开头，此时按原样编译为正则表达式；否则它是不锚定的正则 [@ref-qwen-hooks-matcher-patterns]。工具事件匹配运行时工具 id（例如 `run_shell_command`），并为兼容而接受 Claude Code 的显示名别名，如 `Bash`/`Write`；每个别名恰好对应一个工具 [@ref-qwen-hooks-matcher-patterns]。

最小设置注册——此形状逐字见于来源的 Hook Configuration 一节 [@ref-qwen-hooks-hook-configuration]：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^run_shell_command$",
        "sequential": false,
        "hooks": [
          {
            "type": "command",
            "command": "\"$QWEN_PROJECT_DIR/.qwen/hooks/security-check.sh\"",
            "name": "security-check",
            "timeout": 10
          }
        ]
      }
    ]
  }
}
```

Skill 在其 frontmatter 中声明相同的嵌套形状；`$QWEN_SKILL_ROOT` 让命令可以引用随 `SKILL.md` 一同分发的脚本，且必须保留内层引号，因为命令字符串会交给 shell [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。

除设置之外，Hook 还可按作用域注册：

- **Skill frontmatter。** `SKILL.md` 可以声明与设置 Hook 相同形状的 `hooks:`。它们在 Skill 被调用时（模型加载或经由其斜杠命令）注册，并持续到本会话结束；注册是幂等的。`$QWEN_SKILL_ROOT` 被设为 Skill 自身目录。只读取项目、用户与内置 Skill；扩展提供的 Skill 不支持 `hooks:` [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。
- **Agent frontmatter。** agent 的 `hooks` 字段以与设置的 `hooks` 相同形状保存每 agent 定义；键是 Hook 事件名。它们在 agent 运行期间注册，在 agent 停止时移除，且仅作用于该次调用——不作用于父、兄弟或嵌套 agent [@ref-qwen-sub-agents-claude-code-compatibility-fields]。全局设置 Hook 与会话级 skill/function Hook 保持其既有作用域；agent 完成应使用 `SubagentStop`，因为 `Stop` 不会被重映射 [@ref-qwen-hooks-agent-frontmatter-scope]。

## Hook 输入 {#hooks-input}

每个执行器都收到相同的标准化事件输入；只有交付边界不同：`command` 经 stdin 收到 JSON，`http` 收到 JSON POST body，`function` 收到进程内对象，`prompt` 在输入替换 `$ARGUMENTS` 后收到它 [@ref-qwen-hooks-hook-input-structure]。公共字段为 `session_id`、`transcript_path`、`cwd`、`hook_event_name`、`timestamp`、`permission_mode`（`default | plan | auto_edit | auto | yolo`），以及有条件的 `agent_id`、`prompt_id`、`source_type` 与 `source_id`。事件专属字段按事件添加——例如工具事件上的 `tool_name`、`tool_input`、`tool_use_id` 与 `tool_call_id` [@ref-qwen-hooks-hook-input-structure]。该契约可前向扩展：消费者必须忽略未知字段，而拒绝未知属性的严格解码器可能改变安全 Hook 的 fail-open/fail-closed 行为 [@ref-qwen-hooks-hook-input-structure]。

环境与工作目录随执行器而异。命令 Hook 运行在子进程中；`QWEN_PROJECT_DIR`、`CLAUDE_PROJECT_DIR` 与 `GEMINI_PROJECT_DIR` 被设为项目目录。Bash Hook 从环境读取它们（作为 shell 变量要加双引号）；cmd/PowerShell Hook 的该变量在命令运行前被替换。Skill Hook 额外获得 `$QWEN_SKILL_ROOT`，即 Skill 自身目录 [@ref-qwen-hooks-command-hooks] [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。

敏感内容处理：Qwen 无法控制 Hook 进程、端点、回调或模型提供方是否保留或转发其输入，因此必须逐一审查每个执行器的数据处理策略 [@ref-qwen-hooks-hook-input-structure]。prompt Hook 将其事件输入发送给所配置的模型提供方，且当启用基于文件的调试日志时，完全展开的 prompt-hook 请求也会写入会话调试日志——应把 Hook 输入与调试日志视为敏感内容 [@ref-qwen-hooks-prompt-hooks]。`UserPromptSubmit` 携带 `prompt`（legacy，语义依赖执行路径）与可选的 `submitted_prompt`；二者都不是完整的 DLP 检查面，且 `submitted_prompt` 是来源信息，不是身份认证或授权 [@ref-qwen-hooks-userpromptsubmit]。

## Hook 输出与退出码 {#hooks-output}

输出以 JSON 经 stdout（command）或 HTTP 响应体（http）返回。命令 Hook 的退出码决定结果如何处理 [@ref-qwen-hooks-hook-output-structure]：

| 退出码 | 行为 |
| :-------- | :-------- |
| `0` | 成功。stdout 上的 JSON 对象控制行为；其他 stdout 是纯文本：在 `SessionStart`、`UserPromptSubmit`、`UserPromptExpansion` 上加入模型上下文，在其他事件上保留为系统消息。无法解析的类对象文本绝不会加入模型上下文。 |
| `2` | 阻断性错误。忽略 stdout；stderr 作为错误反馈传给模型。 |
| 其他 | 非阻断性错误。stderr 仅在调试模式下显示；执行继续。 |

HTTP Hook 的响应体仅当 `Content-Type: application/json` 时才按 JSON 读取；任何其他非空 body 在每个事件上都会变成 `systemMessage` [@ref-qwen-hooks-hook-output-structure]。结构化输出有三类字段：公共字段（`continue`、`stopReason`、`suppressOutput`、`systemMessage`）、顶层决策（`decision`、`reason`），以及 `hookSpecificOutput` 中的事件专属控制（必须包含 `hookEventName`） [@ref-qwen-hooks-hook-output-structure]。官方 `PreToolUse` 接口期望 `hookSpecificOutput.permissionDecision`（`allow`/`deny`/`ask`）与 `permissionDecisionReason`，以及可选的 `updatedInput` 和 `additionalContext`；`ask` 会暂停以等待 TUI 确认，在无法提示确认的场景中回退为 `deny` [@ref-qwen-hooks-pretooluse]。其他事件各有其选项——例如 `MessageDisplay`、`StopFailure`、`PostCompact`、`PermissionDenied`、`SessionDelete` 与 `InstructionsLoaded` 会忽略输出/退出码（其中一些是 fire-and-forget），而 `PostToolBatch`、`UserPromptExpansion` 与 `TodoCreated` 接受阻断决策 [@ref-qwen-hooks-individual-hook-event-details]。

## 顺序、并发与超时 {#hooks-order}

默认情况下 Hook 为性能而并行执行；Hook 定义上的 `sequential: true` 强制依赖顺序的执行，且串行 Hook 可为链中后续 Hook 修改输入 [@ref-qwen-hooks-parallel-vs-sequential-execution] [@ref-qwen-hooks-hook-execution]。在同一事件内，注册顺序为 Project、User、System、Extension [@ref-qwen-hooks-hook-configuration]。

只有 `command` Hook 通过 `"async": true` 支持异步执行；异步 Hook 不能返回决策控制，其输出尚未交付给用户或模型，且它会占用 10 个并发异步槽位之一直到完成或超时。当 10 个槽位全部占用时，新的异步 Hook 会被跳过 [@ref-qwen-hooks-async-hooks]。超时默认为 60 秒（command；HTTP 默认 600，prompt 默认 30）；命令 Hook 的 `1000` 及以上的 timeout 出于向后兼容仍按毫秒读取 [@ref-qwen-hooks-command-hooks]。重复触发因事件而异：`MessageDisplay` 反复触发（约 200ms 去抖，且最终 `is_final` 载荷绝不会被排在过时交付之后），轮次最多等待 5 秒以完成最终交付 [@ref-qwen-hooks-messagedisplay]；`PostToolBatch` 在其 Hook 失败或超过 15 秒时以结果不变继续 [@ref-qwen-hooks-posttoolbatch]；`Stop` 按提示词累计连续阻断决策，在达到 `stopHookBlockingCap` 次阻断后结束轮次（默认 8，可用 `QWEN_CODE_STOP_HOOK_BLOCK_CAP` 覆盖） [@ref-qwen-hooks-stop]。

## 启用、信任与安全条件 {#hooks-conditions}

Hook 默认启用，并可在全局关闭：设置顶层的 `"disableAllHooks": true` 禁用所有 Hook 而不删除其配置 [@ref-qwen-hooks-overview]。`--safe-mode`（或 `QWEN_CODE_SAFE_MODE`）与 `--bare`（或 `QWEN_CODE_SIMPLE`）也会关闭所有 Hook，包括用户 Hook；当 Hook 被禁用时，`/hooks` 浏览器会在顶部说明 [@ref-qwen-hooks-browsing-your-hooks]。ACP 客户端的 `skipHooks` 同样不注册任何 Hook——Skill 的正文与 `allowedTools` 仍生效，但其 Hook 门禁不生效；bare 模式更进一步，完全不发现任何 Skill [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。

信任取决于作用域。项目 `.qwen/settings.json` 中的 Hook 仅在文件夹受信任时加载，而用户 Hook 无论信任与否都加载；系统设置 Hook 以 source System 加载，且与用户 Hook 一样不受文件夹信任影响 [@ref-qwen-hooks-browsing-your-hooks] [@ref-qwen-hooks-hook-configuration]。项目 agent 的 Hook 在每个事件前都会重新检查提供该 agent 的工作区的信任状态 [@ref-qwen-hooks-agent-frontmatter-scope]。项目 Skill 的 Hook 会运行仓库提供的命令，因此仅在受信任文件夹中注册，且每次 Hook 触发时都会重新读取信任状态 [@ref-qwen-skills-optional-enforce-a-rule-deterministically-hooks]。

安全模型是明确的：Hook 以用户权限在用户环境中运行，项目级 Hook 需要受信任文件夹状态，超时可防止 Hook 挂起 [@ref-qwen-hooks-security-model]。HTTP Hook 还额外应用 URL 白名单、会拦截私有 IP 段（但允许 loopback）的 SSRF 检查以及 DNS 校验；`security.allowPrivateNetworkHooks` 只放宽 private/CGNAT/link-local 段检查，仅从 User/System/SystemDefaults 作用域被采纳（Workspace 中的值被忽略并记录日志），且绝不解除对云元数据端点的封锁 [@ref-qwen-hooks-allowing-private-network-hooks-managed-environments-only]。

**缺口（沙箱）。** 所引来源均未记录 Hook 与工具执行沙箱（`tools.executionSandbox`）之间任何交互；唯一述及的权限声明是 Hook 以用户权限在用户环境中运行 [@ref-qwen-hooks-security-model]。

## 诊断 {#hooks-diagnostics}

使用 `/hooks` 打开会话所运行 Hook 的只读浏览器；它按事件 → matcher → Hook 导航，显示每个 Hook 的类型、来源、启用状态、命令/URL/提示词、超时、状态消息与 HTTP `if` 条件，并列出以 source Session 注册的会话级 Hook。打开它会重新读取会话所用的用户、工作区与系统文件中的 Hook 定义。`/hooks list` 是非交互式的，仅显示当前进程已加载的注册表——它不会重新加载 [@ref-qwen-hooks-browsing-your-hooks]。

当某个 Hook 未触发时，按顺序检查：事件名（必须精确拼写；未知名称会以 `Invalid hook event name` 跳过）；matcher（工具事件匹配运行时工具 id 或可接受的别名）；文件夹信任；Hook 未被禁用；调试日志；以及定义是否在会话期间被编辑 [@ref-qwen-hooks-a-hook-does-not-fire]。调试日志通过 `--debug` 或 `QWEN_DEBUG_LOG_FILE=1` 启用；会话日志位于 `~/.qwen/debug/latest`（当设置了 `$QWEN_RUNTIME_DIR` 时在其下），带有诸如 `[HOOK_REGISTRY]`、`[TRUSTED_HOOKS]`、`[HOOK_MATCHER]`、`[HOOK_TIMEOUT]` 及各运行器命名空间的带命名空间行 [@ref-qwen-hooks-a-hook-does-not-fire]。prompt-hook 的输入可能出现在会话调试日志中，因此应施加适当的访问与保留控制 [@ref-qwen-hooks-a-hook-does-not-fire]。其他检查包括验证脚本权限/可执行性、Hook 输出的 JSON 格式，以及使用具体的 matcher [@ref-qwen-hooks-other-checks]。

**配置变更及其生效时机。** 被编辑的定义在会话启动时读取；编辑后，打开一次交互式 `/hooks` 菜单以重新加载，或重启 Qwen Code。重新加载需要这一显式的打开菜单动作——保存文件或切换分支不会装载新的 Hook 命令。重新加载仅覆盖定义：对 `disableAllHooks`、`stopHookBlockingCap`、`security.allowedHttpHookUrls` 与 `security.allowPrivateNetworkHooks` 的更改仍需重启 [@ref-qwen-hooks-browsing-your-hooks] [@ref-qwen-hooks-a-hook-does-not-fire]。
