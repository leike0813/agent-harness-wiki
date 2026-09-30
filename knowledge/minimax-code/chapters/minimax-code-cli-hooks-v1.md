---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-hooks-v1
harness_id: minimax-code
topic: hooks
title: "MiniMax Code CLI 的 Hooks：事件、配置入口、输入输出契约、调度与诊断"
sections:
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-minimax-code-hooks-events, ref-minimax-code-hooks-documents, ref-minimax-code-hooks-doc-schema, ref-minimax-code-hooks-handler-fields, ref-minimax-code-hooks-matcher-run, ref-minimax-code-hooks-matcher-validate]
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-minimax-code-hooks-coordinator-order, ref-minimax-code-hooks-events, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-stop-limit, ref-minimax-code-hooks-doc-events]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-minimax-code-hooks-input, ref-minimax-code-hooks-env, ref-minimax-code-hooks-output-keys, ref-minimax-code-hooks-exit2, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-doc-schema]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-minimax-code-hooks-order, ref-minimax-code-hooks-timeouts, ref-minimax-code-hooks-failopen, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-enabled-plugins, ref-minimax-code-hooks-snapshot-immutable, ref-minimax-code-hooks-autoapproval, ref-minimax-code-hooks-internal]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-hooks-parser-limits, ref-minimax-code-hooks-failopen, ref-minimax-code-hooks-warnings, ref-minimax-code-hooks-doc-schema, ref-minimax-code-hooks-snapshot-immutable]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-minimax-code-hooks-coordinator-order, ref-minimax-code-hooks-events, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-stop-limit, ref-minimax-code-hooks-doc-events]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs: [ref-minimax-code-hooks-events, ref-minimax-code-hooks-documents, ref-minimax-code-hooks-doc-schema, ref-minimax-code-hooks-handler-fields, ref-minimax-code-hooks-matcher-run, ref-minimax-code-hooks-matcher-validate]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-minimax-code-hooks-input, ref-minimax-code-hooks-env, ref-minimax-code-hooks-output-keys, ref-minimax-code-hooks-exit2, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-doc-schema]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-minimax-code-hooks-input, ref-minimax-code-hooks-env, ref-minimax-code-hooks-output-keys, ref-minimax-code-hooks-exit2, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-doc-schema]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-minimax-code-hooks-order, ref-minimax-code-hooks-timeouts, ref-minimax-code-hooks-failopen, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-enabled-plugins, ref-minimax-code-hooks-snapshot-immutable, ref-minimax-code-hooks-autoapproval, ref-minimax-code-hooks-internal]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-minimax-code-hooks-order, ref-minimax-code-hooks-timeouts, ref-minimax-code-hooks-failopen, ref-minimax-code-hooks-output-semantics, ref-minimax-code-hooks-enabled-plugins, ref-minimax-code-hooks-snapshot-immutable, ref-minimax-code-hooks-autoapproval, ref-minimax-code-hooks-internal]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs: [ref-minimax-code-hooks-parser-limits, ref-minimax-code-hooks-failopen, ref-minimax-code-hooks-warnings, ref-minimax-code-hooks-doc-schema, ref-minimax-code-hooks-snapshot-immutable]
---

MiniMax Code CLI 面向用户的 Hook 是**插件 Hook**：命令型处理器在插件清单里声明，作为子进程运行，通过 stdin/stdout 交换 JSON [@ref-minimax-code-hooks-doc-schema]。另有两条不面向用户的面：产品内部仅处理 PreToolUse/PostToolUse 的进程内注册表（只运行代码注册的内置处理器，不读文件系统、不跑命令）[@ref-minimax-code-hooks-internal]，以及只存在于协议类型里、本仓库没有运行时消费者的 Hook 契约。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5` 上的 `packages/agent-modules/plugin-hooks`、`packages/local-runtime-v2/src/service/plugin-system`、`packages/local-runtime-v2/src/service/turn-system` 与 `docs/hooks.md`。

## 事件与配置入口 {#hooks-entry}

- 规范事件共 11 个：`SessionStart`、`SessionEnd`、`UserPromptSubmit`、`PreToolUse`、`PermissionRequest`、`PostToolUse`、`SubagentStart`、`SubagentStop`、`Stop`、`PreCompact`、`PostCompact` [@ref-minimax-code-hooks-events]。
- **Hook 不写在用户设置文件里**：它由插件清单声明。MiniMax 格式插件的 `hooks` 是路径数组；Claude/Codex 兼容格式插件用同一字段，并在未声明时回落到默认路径 `hooks/hooks.json` [@ref-minimax-code-hooks-documents] [@ref-minimax-code-hooks-doc-schema]。
- 文档发现规则：`declared` 若是内联对象，该对象就是注册文档；若是字符串、`{path}` 或数组，则逐个读取；重复文件按解析后的路径去重 [@ref-minimax-code-hooks-documents]。
- 注册文档接受两种形态：直接的事件映射，或外层包一个 `hooks` 键；每个事件对应一个 `matcher` 加 `hooks` 数组，数组元素声明 `type: "command"`、`command`、`timeout`、可选的 `args`、`shell` 与 `if` [@ref-minimax-code-hooks-doc-schema]。

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "node \"${PLUGIN_ROOT}/scripts/notice.cjs\"",
        "timeout": 5
      }]
    }]
  }
}
```

示例依据 `docs/hooks.md`；命令依赖 Hook 进程 PATH 上有 Node.js [@ref-minimax-code-hooks-doc-schema]。

- 处理器字段：`kind` 固定为 command，另有来源格式（`MINIMAX`/`CLAUDE`/`CODEX`）、插件名与插件根目录、来源文件路径、事件、可选 matcher、命令、可选 args、shell（`bash`/`powershell`）、条件、超时与声明顺序 [@ref-minimax-code-hooks-handler-fields]。
- matcher 语义：`UserPromptSubmit` 与 `Stop` 完全忽略 matcher；matcher 缺省、为 `*` 或空串即匹配全部；其余情况按工具名做受控的正则/通配匹配，超长（上限 256）或不安全的正则（先行断言、命名组、嵌套量词）会被拒绝 [@ref-minimax-code-hooks-matcher-run] [@ref-minimax-code-hooks-matcher-validate]。
- `if` 条件只在 `PreToolUse`、`PermissionRequest`、`PostToolUse` 上有效，形式是工具谓词，按 bash 权限规则语义求值 [@ref-minimax-code-hooks-matcher-validate]。

## 触发时点 {#hooks-events}

- `SessionStart` 在一次 turn 准入时先于 `UserPromptSubmit` 触发，来源区分 `startup`/`resume`/`clear`/`compact`/`fork`/`plugin_activation` [@ref-minimax-code-hooks-coordinator-order]。
- `PreToolUse` 在工具调用执行前触发，`PermissionRequest` 在工具调用到达权限闸时触发，`PostToolUse` 在工具产生结果后触发 [@ref-minimax-code-hooks-events] [@ref-minimax-code-hooks-output-semantics]。
- `SubagentStart` 在子代理创建时触发；`SubagentStop` 在存在父会话的 turn 结束时触发，否则走 `Stop` [@ref-minimax-code-hooks-coordinator-order]。
- `Stop` 在 turn 的最终助手消息之后触发；同一 turn 的重复 Stop 受 `stopHookActive` 保护，且连续续跑次数上限为 8 [@ref-minimax-code-hooks-stop-limit]。
- `PreCompact`/`PostCompact` 围绕压缩执行触发；自动压缩后会再触发一次来源为 `compact` 的 `SessionStart` [@ref-minimax-code-hooks-coordinator-order]。
- `SessionEnd` 在会话结束时尽力发送，原因包括 `archive`、`clear`、`logout`、`resume_other`、`idle_timeout`，其中空闲计时为 30 分钟 [@ref-minimax-code-hooks-coordinator-order]。
- 面向 TUI 的通知只覆盖已分类事件：SessionStart/UserPromptSubmit、PreToolUse、PermissionRequest、PostToolUse、SubagentStart/SubagentStop 与自动 PostCompact；PreCompact 与手动 PostCompact 不产生这类通知，SessionEnd 的投递是尽力而为，Claude 兼容适配器还会丢弃 PreCompact/PostCompact/SessionEnd 的 `systemMessage` [@ref-minimax-code-hooks-doc-events]。

## 输入与输出契约 {#hooks-io}

- 输入是**一个 JSON 对象写到 stdin**：事件载荷字段之上再叠加 `hook_event_name`、`session_id`、可选 `turn_id`/`prompt_id`、`transcript_path`、`cwd`、`model`、`permission_mode`、`effort`；整包上限 1 MB [@ref-minimax-code-hooks-input]。
- 事件要求的必有字段不同（例如 PreToolUse 需要 `tool_name`、`tool_input`、`tool_use_id`，PostToolUse 另加 `tool_result`）[@ref-minimax-code-hooks-input]。
- 子进程工作目录取输入里的 `cwd`，并注入 `MINIMAX_PROJECT_DIR`/`CLAUDE_PROJECT_DIR`/`CODEX_PROJECT_DIR` [@ref-minimax-code-hooks-input]。
- 环境变量是**白名单**：只继承 PATH、HOME、LANG、TERM、SHELL、USER、TMPDIR 等系统项，再叠加插件根目录、插件数据目录与项目目录变量；provider 密钥一类机密不会继承 [@ref-minimax-code-hooks-env]。
- 载荷本身不做凭据脱敏：`prompt`、`tool_input`、`tool_result` 原样转发，敏感内容隔离主要靠环境白名单 [@ref-minimax-code-hooks-env]。
- 输出解析：stdout 看起来是结构化 JSON 时按 JSON 解析；空白或纯文本只在 SessionStart/UserPromptSubmit（以及 Codex 的 SubagentStart）上作为 `additionalContext` [@ref-minimax-code-hooks-output-keys]。
- 退出码语义：退出 2 在 UserPromptSubmit/PreToolUse 上表示拒绝，PermissionRequest 上表示拒绝（Codex），PostToolUse 上转为上下文或反馈，Stop/SubagentStop 上转为继续提示，Claude 的 PreCompact 上转为 defer；退出 0 且有 JSON 时按决策解析；其他非零退出记为 `HOOK_PROCESS_EXITED` 诊断 [@ref-minimax-code-hooks-exit2]。
- 输出键按事件白名单校验，未知键会让整份输出失效：通用键有 `continue`、`stopReason`、`suppressOutput`、`systemMessage`；UserPromptSubmit/PreToolUse/PostToolUse 另加 `decision`、`reason`、`hookSpecificOutput` [@ref-minimax-code-hooks-output-keys]。
- 语义：`continue:false` 停止当前 agent 运行；`decision:'block'`/`'deny'` 阻断；`additionalContext` 注入模型可见内容；`updatedInput` 改写工具入参；`updatedResult` 替换模型可见的工具结果（审计保留原始值）；`toolPermissionDecision` 可自动批准/询问/拒绝；`postToolFeedback` 作为错误标记的反馈；`systemMessage` 只影响界面 [@ref-minimax-code-hooks-output-semantics] [@ref-minimax-code-hooks-doc-schema]。
- 什么都没返回时的默认决策是允许；PermissionRequest 与 PreToolUse 额外返回 `abstain` [@ref-minimax-code-hooks-output-semantics]。

## 顺序、并发与失败处理 {#hooks-order-conditions}

- 处理器先按事件、来源格式支持、matcher 与条件过滤，再按「插件名 → 来源路径 → 声明顺序」排序，顺序确定 [@ref-minimax-code-hooks-order]。
- 并发上限 8；每个处理器有自己的 `timeout`（缺省 5000 毫秒，接受 1 到 10 秒），事件级预算为普通事件 15000 毫秒、SessionEnd 3000 毫秒；超时的处理器记 `HOOK_TIMEOUT` [@ref-minimax-code-hooks-timeouts]。
- **失败开放**：每个诊断都会记录（日志文案为插件 Hook 命令失败开放），事件继续执行 [@ref-minimax-code-hooks-failopen]。
- 多处理器结果合并：更强的决策胜出，强度序为 allow、ask、defer、deny；`additionalContext`、`systemMessage`、`postToolFeedback` 按新结果排在后面拼接；`updatedInput` 取最后一个非 MINIMAX 的完成结果，若最终判定为拒绝则丢弃；`continue:false` 具有粘性 [@ref-minimax-code-hooks-output-semantics]。
- 生效条件：只有**已启用**的插件才贡献 Hook；处理器集合是每个 turn 的不可变快照，turn 中途不重读插件状态，变更在下次 turn 准入时生效 [@ref-minimax-code-hooks-enabled-plugins] [@ref-minimax-code-hooks-snapshot-immutable]。
- 权限边界：Hook 只能代替普通兜底审批自动放行，`hookAutoApprovalEligible` 对显式 ask 规则与产品安全提示不置位，因此 Hook 输出无法绕过这些提示 [@ref-minimax-code-hooks-autoapproval]。
- trust 以包身份表达：激活键等于包内容摘要，符号链接或不可变包校验失败会导致 `HOOK_MATERIALIZATION_FAILED` [@ref-minimax-code-hooks-enabled-plugins]。
- Hook 以宿主机子进程运行、不受沙箱约束；唯一与沙箱的关联是 SessionEnd 需要在沙箱仍存活时执行 [@ref-minimax-code-hooks-internal]。

## 诊断 {#hooks-diagnostics}

- 解析期诊断码包括 `HOOK_SCHEMA_INVALID`、`HOOK_EVENT_UNSUPPORTED`、`HOOK_HANDLER_UNSUPPORTED`、`HOOK_HANDLER_LIMIT_EXCEEDED`，可执行处理器上限 64 [@ref-minimax-code-hooks-parser-limits]。
- 运行期诊断码包括 `HOOK_ABORTED`、`INVALID_INPUT`、`INVALID_OUTPUT`、`PROCESS_ERROR`、`PROCESS_EXITED`、`TIMEOUT`，逐条写入日志 [@ref-minimax-code-hooks-failopen]。
- 面向用户的出口是把诊断、`systemMessage` 与终端序列转成 `runtime_warning` 事件（来源标记为 plugin-hook）在 TUI 渲染；每条事件的告警上限为 8，同一 `systemMessage` 文案允许重复出现 [@ref-minimax-code-hooks-warnings]。
- Stop 通知在正常完成后显示为 `Hook · Stop`，持久化在会话展示历史中并在重开会话时恢复，重复回放不会重复添加；`systemMessage` 文本不进入规范模型历史、压缩输入、最终回答复制与默认 Markdown 导出 [@ref-minimax-code-hooks-doc-schema]。
- 变更生效时机：插件 Hook 没有设置文件热重载；只有插件激活/重装（内容摘要变化）才会改变处理器，且在下一次 turn 准入时被采用 [@ref-minimax-code-hooks-snapshot-immutable]。
- 手工验证路径（源码构建）：用独立 `MINIMAX_DATA_DIR` 与已启用测试插件，先确认 Stop 通知出现一次、重复提问后仍各自出现，再切走并重开会话确认通知保留且不重复，最后用 `/copy` 与 `/export` 确认通知文本不在其中 [@ref-minimax-code-hooks-doc-schema]。
