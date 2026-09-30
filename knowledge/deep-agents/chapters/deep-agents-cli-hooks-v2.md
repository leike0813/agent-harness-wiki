---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-hooks-v2
harness_id: deep-agents
topic: hooks
title: "Deep Agents Code 的 Hook 机制：hooks.json 作用域与优先级、生命周期事件与 matcher、stdin payload、退出码与 HookWireOutput、并发归约、信任门禁与诊断"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-deep-agents-hooks-config, ref-deep-agents-hooks-plugin, ref-deep-agents-hooks-handlerfields, ref-deep-agents-hooks-hooksmd]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-deep-agents-hooks-events, ref-deep-agents-hooks-capabilities, ref-deep-agents-hooks-matcher]
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs: [ref-deep-agents-hooks-input, ref-deep-agents-hooks-hooksmd, ref-deep-agents-hooks-env, ref-deep-agents-hooks-runner, ref-deep-agents-hooks-plugin]
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs: [ref-deep-agents-hooks-output, ref-deep-agents-hooks-capabilities, ref-deep-agents-hooks-reducer]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-deep-agents-hooks-hooksmd, ref-deep-agents-hooks-engine, ref-deep-agents-hooks-output, ref-deep-agents-hooks-runner]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-deep-agents-hooks-trust, ref-deep-agents-hooks-plugin, ref-deep-agents-hooks-config, ref-deep-agents-hooks-troubleshoot, ref-deep-agents-hooks-debugcmd]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-deep-agents-hooks-events, ref-deep-agents-hooks-capabilities, ref-deep-agents-hooks-matcher]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-deep-agents-hooks-config, ref-deep-agents-hooks-plugin, ref-deep-agents-hooks-handlerfields, ref-deep-agents-hooks-hooksmd]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: answered
        source_refs: [ref-deep-agents-hooks-input, ref-deep-agents-hooks-env, ref-deep-agents-hooks-runner]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: answered
        source_refs: [ref-deep-agents-hooks-output, ref-deep-agents-hooks-capabilities, ref-deep-agents-hooks-reducer]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs: [ref-deep-agents-hooks-hooksmd, ref-deep-agents-hooks-engine, ref-deep-agents-hooks-runner, ref-deep-agents-hooks-output]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-deep-agents-hooks-trust, ref-deep-agents-hooks-plugin, ref-deep-agents-hooks-config]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-deep-agents-hooks-troubleshoot, ref-deep-agents-hooks-debugcmd, ref-deep-agents-hooks-config]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## Hook 的配置入口、作用域与加载优先级 {#hooks-entry}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

Hook 是用户配置的 shell 命令，在 agent 生命周期的固定事件点触发：dcode 找到匹配的 handler，把事件 JSON 从 stdin 发给每个 handler，再用它们的退出码与 stdout 组合出一个决策 [@ref-deep-agents-hooks-config]。Hook 以用户权限运行，本质是可执行代码；`hooks.json` 能写的人就能运行任意命令 [@ref-deep-agents-hooks-hooksmd]。本节讨论的固定来源限于官方文档的 hooks 页与内置仓库 `libs/code` 的 hooks 实现；已废弃的 PyPI 包 `deepagents-cli`（部署工具，提供 `deepagents init/dev/deploy`）不是本 CLI，不在本文范围。

配置有三个作用域，各自对应一个文件或来源 [@ref-deep-agents-hooks-config]：

| 作用域 | 路径 | 加载时机 |
| --- | --- | --- |
| 用户 | `~/.deepagents/hooks.json` | 文件存在时始终加载 |
| 项目 | `{project_root}/.deepagents/hooks.json` | 仅在授予 workspace 信任后 |
| 插件 | 已启用插件内的 `hooks/hooks.json` | 插件被启用时 |

`DEEPAGENTS_HOME` 会整体移动用户资料目录，因此用户级 hooks 实际落到 `{DEEPAGENTS_HOME}/hooks.json`；`dcode config path` 可查看项目级与用户级 hook 文件的实际位置以及工作区信任存储 [@ref-deep-agents-hooks-config]。

配置文档的嵌套是三层的：事件名 → matcher 组 → 该组的 handler 列表 [@ref-deep-agents-hooks-config]：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "~/.deepagents/hooks/block-rm.sh", "timeout": 600 }
        ]
      }
    ]
  }
}
```

该最小结构依据官方 hooks 页的 Setup 示例 [@ref-deep-agents-hooks-config]。

每个 handler 的字段如下 [@ref-deep-agents-hooks-handlerfields]：`type` 必填，当前只支持 `command`；`command` 必填，经 shell 执行，支持管道、重定向、glob 与 `$VAR` 展开，事件 payload 只从 stdin 传入、绝不拼接进参数；可选 `argv` 提供参数列表时改为直接 exec、不再过 shell；可选 `timeout` 覆盖该 handler 的超时（秒）；可选 `statusMessage` 是执行期间显示在界面上的临时文本。把 `type` 配成不支持的值，或写 `"async": true`，会产生可见的配置错误 [@ref-deep-agents-hooks-config]。仓库侧 `HOOKS.md` 给出同样的字段约束，并明确 `async: true` 被拒绝 [@ref-deep-agents-hooks-hooksmd]。

优先级顺序为项目 → 用户 → 插件 [@ref-deep-agents-hooks-hooksmd]。这里的优先级决定的是“谁的答案胜出”，而不是“谁执行”：每个匹配的 handler 都会运行，结果按该顺序归约，第一个停止处理的 handler 决定事件；因此即使高优先级的项目 handler 已经停止事件，低优先级的插件 handler 仍会执行、其副作用依然发生 [@ref-deep-agents-hooks-hooksmd]。

插件 hook 与用户/项目文件结构完全相同，来源可以是插件根下的 `hooks/hooks.json`、`plugin.json` 清单里的 `hooks` 路径，或清单内联的 `hooks` 对象 [@ref-deep-agents-hooks-plugin]。插件 handler 可引用自身路径变量（`${CLAUDE_PLUGIN_ROOT}` 与 `${PLUGIN_ROOT}`、`${CLAUDE_PLUGIN_DATA}` 与 `${PLUGIN_DATA}`、`${CLAUDE_PROJECT_DIR}`）：shell 形式的 `command` 需给这些变量加引号（安装路径可能含空格），`argv` 形式在启动前解析、无需引号 [@ref-deep-agents-hooks-plugin]。

## 第一方生命周期事件、owner 与 matcher 字段 {#hooks-events}

dcode 发出 12 个第一方事件，分属两类 owner。**client 事件**在 CLI 进程内产生；**server 事件**源自 agent 执行路径，再回传到客户端，使命令 handler 在你配置所在的机器上运行 [@ref-deep-agents-hooks-events]。能力登记表为每个事件固定了 owner、matcher 字段、默认超时与退出码/聚合策略 [@ref-deep-agents-hooks-capabilities]。

| 事件 | owner | matcher 字段 | 触发时点 | 退出码 2 的效果 |
| --- | --- | --- | --- | --- |
| `SessionStart` | client | `cause` | 会话开始 | 诊断 |
| `UserPromptSubmit` | client | 无 | 用户提交提示 | 阻断提示 |
| `SessionEnd` | client | `cause` | 会话结束 | 诊断 |
| `PermissionRequest` | client | `tool_name` | 即将弹权限提示 | 拒绝 |
| `Notification` | client | `notification_type` | 客户端生命周期通知 | 诊断 |
| `PreToolUse` | server | `tool_name` | 工具调用执行前 | 拒绝 |
| `PostToolUse` | server | `tool_name` | 工具调用成功后 | 反馈 |
| `PostToolUseFailure` | server | `tool_name` | 工具调用失败后 | 反馈 |
| `PreCompact` | server | `trigger` | 对话压缩前 | 阻断压缩 |
| `Stop` | server | 无 | agent 停止轮次后 | 继续轮次 |
| `SubagentStart` | server | `agent_name` | 子代理启动 | 诊断 |
| `SubagentStop` | server | `agent_name` | 子代理停止 | 追加上下文 |

上表的 owner 与 matcher 字段来自能力登记表，事件语义与触发点来自官方 events 表 [@ref-deep-agents-hooks-capabilities][@ref-deep-agents-hooks-events]。注意两处对同一字段使用了不同标签：官方 events 表把 `SessionStart` 记为 `source`、`SessionEnd` 记为 `reason`、子代理事件记为 `agent_type`，而能力登记表登记为 `cause`、`cause`、`agent_name`；它们指向同一 matcher 字段 [@ref-deep-agents-hooks-events][@ref-deep-agents-hooks-capabilities]。`PreToolUse` 在权限提示之前、工具执行之前运行，是放行或拒绝工具的首选位置；`Stop` 在终态模型回复提交之前运行 [@ref-deep-agents-hooks-events]。registry 里另有 `PostToolUseFailure`，文档 events 表未单列，但能力登记表将其登记为 server 事件、matcher 字段为 `tool_name`、退出码 2 语义为反馈 [@ref-deep-agents-hooks-capabilities]。

matcher 只针对每个事件的单一字段过滤 [@ref-deep-agents-hooks-capabilities]。其编译规则：省略、空串或 `*` 匹配该事件的全部取值；仅由字母、数字、下划线、连字符、空格、`|`、`,` 组成的字符串按精确名匹配（`|` 或 `,` 分隔多个候选，如 `Edit|Write`）；出现其它字符时按不锚定的正则表达式处理（如 `mcp__.*`）[@ref-deep-agents-hooks-matcher]。`UserPromptSubmit` 与 `Stop` 没有 matcher 字段，省略 `matcher` 或写成 `*` 均可，任何其它值在配置加载时被拒绝 [@ref-deep-agents-hooks-events]。正则编译失败会使该 matcher 组整体失效，并在会话运行前产生用户可见的配置诊断 [@ref-deep-agents-hooks-events]。

## 回调收到的 stdin payload、环境与工作目录 {#hooks-input}

每个 handler 都从 stdin 收到一个 JSON 对象，由公共信封加事件专属字段组成 [@ref-deep-agents-hooks-input]。公共字段包括 `session_id`、`transcript_path`、`cwd`、`hook_event_name`、`prompt_id`，以及在有意义时出现的 `permission_mode`（`default`/`plan`/`acceptEdits`/`auto`/`dontAsk`/`bypassPermissions`）、`effort` 对象、`agent_id` 与 `agent_type` [@ref-deep-agents-hooks-input]。`transcript_path` 指向写在 `~/.deepagents/transcripts` 下的 JSONL 会话投影，子代理事件另带 `agent_transcript_path`；两个文件都在匹配 handler 运行前刷新，因此 handler 能读到当前事件之前的对话 [@ref-deep-agents-hooks-input]。

事件专属字段举例如下：`PreToolUse` 带 `tool_name`、`tool_input`、`tool_use_id`；`PostToolUse` 另带 `tool_response` 与可选的 `duration_ms`；`SessionStart` 带 `source`（`startup`/`resume`/`clear`/`compact`）；`PreCompact` 带 `trigger`（`manual`/`auto`）与 `custom_instructions` [@ref-deep-agents-hooks-input]。工具类事件看到的是稳定的公共工具名与参数形状（如 `Bash`、`Write`、`Edit`、`Read`、`Glob`、`Grep`、`LS`），而不是内部工具名；MCP 工具呈现为 `mcp__` 前缀加 server 与 tool 名 [@ref-deep-agents-hooks-input]。仓库侧 matcher 用 wire 名匹配（例如内部 `execute` 暴露为 `Bash`、`write_file` 暴露为 `Write`）[@ref-deep-agents-hooks-hooksmd]。

handler 在 payload 中 `cwd` 所报的工作目录中启动，并继承会话环境，但会剥离“看起来像凭据”的变量：任何名字含 `KEY`、`TOKEN`、`SECRET`、`PASSWORD` 或 `APIKEY` 的变量在启动前被移除 [@ref-deep-agents-hooks-input]。实现侧以 `sanitize_hook_environ` 构造这份净化环境，只保留不含密钥特征名的项 [@ref-deep-agents-hooks-env]；`run_command_handler` 的契约也说明 payload 是“写入 stdin 的已验证 JSON”，并默认使用进程环境的净化副本 [@ref-deep-agents-hooks-runner]。因此需要凭据的 handler 必须从文件或 secret manager 读取，而不能指望继承环境 [@ref-deep-agents-hooks-input]。插件 handler 额外获得前述插件路径变量 [@ref-deep-agents-hooks-plugin]。

其余事件专属字段：`UserPromptSubmit` 带 `prompt`；`SessionEnd` 带 `reason`（`clear`/`resume`/`prompt_input_exit`/`other`）；`PermissionRequest` 带 `tool_name`、`tool_input` 与 `permission_suggestions`（当前为空）；`Notification` 带 `message`、`notification_type` 与可选的 `title`；`Stop` 带 `stop_hook_active`、`last_assistant_message`、`background_tasks`、`session_crons`；`SubagentStop` 带 `stop_hook_active`、`agent_id`、`agent_type`、`agent_transcript_path`、`last_assistant_message`、`background_tasks`、`session_crons` [@ref-deep-agents-hooks-input]。下面是一个 `PreToolUse` payload 示例，依据官方 hooks 页的 Input payload 示例 [@ref-deep-agents-hooks-input]：

```json
{
  "session_id": "abc123",
  "transcript_path": "/Users/you/.deepagents/.../transcript.jsonl",
  "cwd": "/Users/you/my-project",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": { "command": "rm -rf /tmp/build" },
  "tool_use_id": "toolu_01ABC"
}
```

## 退出码、HookWireOutput 与事件级决策 {#hooks-output}

命令 handler 通过退出码、stdout、stderr 通信 [@ref-deep-agents-hooks-output]。退出码 `0` 表示成功，此时 stdout 若是 JSON 会被解析并应用；退出码 `2` 是该事件的“阻断/反馈”路径（具体语义见上一节表格），此时 stdout JSON 被忽略、stderr 是主要反馈通道；其它非零退出是“非阻断错误”，记录诊断后继续 [@ref-deep-agents-hooks-output]。JSON 只在退出 `0` 且为 stdout 唯一内容时处理；`SessionStart` 与 `UserPromptSubmit` 上的非 JSON stdout 会变成给模型的附加上下文，其它事件上则产生诊断。stdout 与 stderr 各保留至多 100000 字节 [@ref-deep-agents-hooks-output]。

任何 handler 都可返回下列顶层通用字段 [@ref-deep-agents-hooks-output]：

```json
{
  "continue": true,
  "stopReason": "当 continue 为 false 时可选的用户可见原因",
  "suppressOutput": false,
  "systemMessage": "可选、展示给用户的消息",
  "terminalSequence": "可选、受限的终端控制序列",
  "hookSpecificOutput": { "hookEventName": "PreToolUse" }
}
```

所有匹配 handler 跑完后才合并结果。返回 `"continue": false` 只是把归约后的决策标为停止，并不阻止其它匹配 handler 运行；`stopReason` 取配置顺序中第一个；`suppressOutput` 只抑制该 handler 自己的 `systemMessage` [@ref-deep-agents-hooks-output]。这些字段映射到 `HookWireOutput` 模型（`continue`/`stopReason`/`suppressOutput`/`systemMessage`/`terminalSequence`/`hookSpecificOutput`）[@ref-deep-agents-hooks-capabilities]。

事件级控制在 `hookSpecificOutput`（工具与权限事件）或顶层 `decision` 与 `reason`（`Stop`）中 [@ref-deep-agents-hooks-output]。`PreToolUse` 返回 `permissionDecision` 可取 `allow`、`deny` 或 `ask`；多个 hook 匹配时按 `deny > ask > allow` 合并，`deny` 在权限提示与执行之前短路并把原因喂给模型，`ask` 强制弹权限提示，`allow` 抑制普通提示但不能覆盖另外的 deny/ask；`additionalContext` 按配置顺序透传 [@ref-deep-agents-hooks-output]。权限合并的实现用一张秩表做“取更强”（`none` 0、`allow` 1、`ask` 2、`deny` 3）[@ref-deep-agents-hooks-reducer]。`PermissionRequest` 用 `hookSpecificOutput.decision.behavior` 为 `allow`/`deny` 代答提示；`Stop` 用 `decision: "block"` 与 `reason` 续跑轮次，为避免死循环需检查 `stop_hook_active`，且 dcode 强制最多 8 次连续续跑 [@ref-deep-agents-hooks-output]。仓库实现把该上限常量化为 `MAX_STOP_CONTINUATIONS = 8`，超过后忽略并给出 `continuation_cap` 诊断 [@ref-deep-agents-hooks-reducer]。部分兼容字段被识别但不生效（如 `PreToolUse.updatedInput`、`PreToolUse.defer`、`SubagentStop` 的 block 等），会记诊断并走普通回退路径 [@ref-deep-agents-hooks-output]。

`PreToolUse` 的拒绝示例与 `Stop` 的续跑示例（均依据官方 hooks 页的 Handler output 示例）[@ref-deep-agents-hooks-output]：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive command blocked by hook"
  }
}
```

```json
{
  "decision": "block",
  "reason": "Tests are still failing; keep working"
}
```

`SessionStart`、`UserPromptSubmit` 与 `SubagentStart` 可通过 `hookSpecificOutput.additionalContext` 为模型注入上下文；`PostToolUse` 与 `SubagentStop` 也能追加 `additionalContext`，但无法撤销已经发生的动作 [@ref-deep-agents-hooks-output]。

## 并发执行、归约顺序与超时/失败语义 {#hooks-order}

同一事件的所有匹配 handler 并发执行，各自有独立超时；结果按稳定的配置顺序归约，与完成先后无关 [@ref-deep-agents-hooks-hooksmd]。执行引擎用一次 `asyncio.gather` 并发启动本事件的全部 handler，把 payload、`cwd` 与事件默认超时传给每个 handler，再统一交给归约器 [@ref-deep-agents-hooks-engine]。这一顺序即“项目 → 用户 → 插件”的归约顺序：第一个停止处理的 handler 决定事件，但更低优先级的 handler 仍会运行、副作用照常发生 [@ref-deep-agents-hooks-hooksmd]。

每个 handler 的超时默认 600 秒，`UserPromptSubmit` 例外，默认 30 秒；`timeout` 是单 handler 覆盖值 [@ref-deep-agents-hooks-output]。超时属于非阻断失败：handler 被终止并记录为超时诊断，不产生成功决策 [@ref-deep-agents-hooks-output]。超过超时时 `run_command_handler` 终止进程并返回结构化失败结果 [@ref-deep-agents-hooks-runner]。其余非零退出同理记诊断、不应用 block 决策 [@ref-deep-agents-hooks-hooksmd]。

## 信任门禁、生效条件与诊断 {#hooks-conditions}

项目级 hook 来自仓库，只有在 workspace 被信任后才加载 [@ref-deep-agents-hooks-config]。交互式会话在未信任且存在 `.deepagents/hooks.json` 时弹提示；选择始终允许会把该规范工作区根记入 `~/.deepagents/.state/hooks_trust.json` [@ref-deep-agents-hooks-trust]。拒绝提示则本次会话跳过项目 hook、只用用户与插件 hook；用 Esc 或 Ctrl+D 取消提示会中止启动 [@ref-deep-agents-hooks-trust]。无头/CI 运行从不弹提示，需传 `--trust-project-hooks` 为本次运行显式开启 [@ref-deep-agents-hooks-trust]。插件 hook 的同意门是“安装并启用插件”本身；workspace 信任只管项目 hook，既不授予也不扣留插件的 hook [@ref-deep-agents-hooks-plugin]。

hook 配置在会话内被快照固定，直到 `/reload` 或新会话；轮次中编辑 `hooks.json` 不会改变当前快照，启用/停用插件同样会改变快照，需 `/reload` 才能拾取其 hook [@ref-deep-agents-hooks-config]。server owner 的事件集在会话启动时固定，因此新启用的插件 hook 要到下次启动或 `/reload` 才生效 [@ref-deep-agents-hooks-plugin]。`dcode config path` 可检查项目/用户 hook 文件位置与信任存储状态 [@ref-deep-agents-hooks-config]。

hook 活动可在会话内观察，而不只在日志里 [@ref-deep-agents-hooks-troubleshoot]：运行中的 handler 显示其 `statusMessage`（未设置时显示“Running EVENT hook”），并发 handler 共用一个状态槽，显示最近一个；`systemMessage` 显示为信息通知；配置错误、非零退出、超时与不支持的输出字段以 `Hook warning` 或 `Hook error` 通知出现，每次调用至多一次；来自 hook 的权限答复会标注归属（例如 `PermissionRequest hook denied Bash`）[@ref-deep-agents-hooks-troubleshoot]。设 `DEEPAGENTS_CODE_DEBUG=1` 可捕获所有诊断，包括从不作为通知显示的 debug 级条目 [@ref-deep-agents-hooks-troubleshoot]。此外，CLI 内置了未列入自动补全的 `/debug` 命令，触发后会打开调试控制台 [@ref-deep-agents-hooks-debugcmd]，可用于查看详细状态。
