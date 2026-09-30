---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-hooks-v1
harness_id: github-copilot
topic: hooks
title: "GitHub Copilot CLI 的 Hooks：入口、事件、输入输出、决策控制与诊断"
sections:
  - section_id: hooks-scope
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmp-hooks, ref-github-copilot-hooksconc-perf, ref-github-copilot-hooksconc-security, ref-github-copilot-hooksconc-what]
  - section_id: hooks-entry-events
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-hooks, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-hooks-repo, ref-github-copilot-hooks-user, ref-github-copilot-hooksconc-format, ref-github-copilot-hooksconc-types, ref-github-copilot-hooksref-command, ref-github-copilot-hooksref-events, ref-github-copilot-hooksref-format, ref-github-copilot-hooksref-inputs, ref-github-copilot-hooksref-locations, ref-github-copilot-hooksref-policy]
  - section_id: hooks-input-output
    surface_ids: [cli]
    source_refs: [ref-github-copilot-hooks-debug, ref-github-copilot-hooksconc-example, ref-github-copilot-hooksconc-security, ref-github-copilot-hooksref-agentstop, ref-github-copilot-hooksref-agentstop-decide, ref-github-copilot-hooksref-command, ref-github-copilot-hooksref-exit, ref-github-copilot-hooksref-http, ref-github-copilot-hooksref-inputs, ref-github-copilot-hooksref-permission, ref-github-copilot-hooksref-posttool-output, ref-github-copilot-hooksref-pretool, ref-github-copilot-hooksref-pretool-decide, ref-github-copilot-hooksref-progress, ref-github-copilot-hooksref-prompt]
  - section_id: hooks-order-conditions
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cmdref-env, ref-github-copilot-conc-sandbox, ref-github-copilot-conc-trust, ref-github-copilot-hooksconc-perf, ref-github-copilot-hooksref-agentstop-decide, ref-github-copilot-hooksref-disable, ref-github-copilot-hooksref-exit, ref-github-copilot-hooksref-inputs, ref-github-copilot-hooksref-matcher, ref-github-copilot-hooksref-pretool, ref-github-copilot-hooksref-toolnames]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-hooks, ref-github-copilot-cmdref-slash, ref-github-copilot-hooks-debug, ref-github-copilot-hooks-troubleshoot, ref-github-copilot-hooks-user]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-events
        status: answered
        source_refs: [ref-github-copilot-hooksref-events, ref-github-copilot-hooksconc-types, ref-github-copilot-hooksref-format, ref-github-copilot-hooksconc-format, ref-github-copilot-hooksref-inputs, ref-github-copilot-hooksref-locations]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-events
        status: answered
        source_refs: [ref-github-copilot-hooksref-locations, ref-github-copilot-hooksref-policy, ref-github-copilot-hooks-repo, ref-github-copilot-hooks-user, ref-github-copilot-cfgdir-hooks, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-hooksref-format, ref-github-copilot-hooksref-command]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input-output
        status: partial
        source_refs: [ref-github-copilot-hooksref-inputs, ref-github-copilot-hooksref-pretool, ref-github-copilot-hooksref-agentstop, ref-github-copilot-hooks-debug, ref-github-copilot-hooksref-command, ref-github-copilot-hooksconc-security]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-input-output
        status: answered
        source_refs: [ref-github-copilot-hooksref-command, ref-github-copilot-hooksref-http, ref-github-copilot-hooksref-prompt, ref-github-copilot-hooksref-exit, ref-github-copilot-hooksref-pretool-decide, ref-github-copilot-hooksref-agentstop-decide, ref-github-copilot-hooksref-posttool-output, ref-github-copilot-hooksref-permission, ref-github-copilot-hooksref-progress, ref-github-copilot-hooksconc-example]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: answered
        source_refs: [ref-github-copilot-hooksref-exit, ref-github-copilot-hooksref-pretool, ref-github-copilot-hooksref-agentstop-decide, ref-github-copilot-hooksref-matcher, ref-github-copilot-hooksconc-perf]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-order-conditions
        status: partial
        source_refs: [ref-github-copilot-hooksref-disable, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cmdref-env, ref-github-copilot-conc-trust, ref-github-copilot-conc-sandbox]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-github-copilot-hooks-troubleshoot, ref-github-copilot-hooks-debug, ref-github-copilot-cmdref-slash, ref-github-copilot-cfgdir-hooks, ref-github-copilot-hooks-user]
---

## 固定来源与 Hook 的定位 {#hooks-scope}

本章只覆盖 **GitHub Copilot CLI**（`copilot` 二进制，npm 包 `@github/copilot`）这一 `cli` 界面。固定来源是 docs.github.com 上与本主题相关的归档页面及其小节：概念页 `concepts/agents/hooks.md`、how-to 页 `how-tos/copilot-cli/customize-copilot/use-hooks.md`、参考页 `reference/hooks-reference.md`，以及 CLI 命令参考（`environment variables`、命令与会话小节）和配置目录参考。CLI 为闭源产品，官方文档是唯一证据，因此凡文档未写明的默认值、路径或时序，本章按 `partial` 标注并说明核对过的入口。

Hook 的定义是：在 agent 工作流的特定时点执行一段外部命令。官方把它归入"可编程管控与可观测性"，与 Skills／自定义指令的分工是——后两者通过提示词引导模型行为，Hook 则**保证**在某时点一定执行指定操作，例如在工具运行前阻断它、在会话结束时记录活动 [@ref-github-copilot-cmp-hooks]。它接收 JSON 输入，因此可以做上下文相关的自动化，官方列出的典型用途包括：以编程方式批准或拒绝工具执行、用密钥扫描一类内置安全能力阻止凭据泄漏、实现自定义校验与合规审计日志 [@ref-github-copilot-hooksconc-what]。需要新增外部能力时用 MCP server 而不是 Hook；只有当"需要比技能或指令更强的控制"时才用 Hook [@ref-github-copilot-cmp-hooks]。

两条关键约束决定了后面所有小节。其一，**Hook 同步执行并阻塞 agent**，官方建议单个 Hook 尽量控制在 5 秒以内，用追加写文件代替同步 I/O，昂贵操作用后台处理并缓存结果 [@ref-github-copilot-hooksconc-perf]。其二，Hook 会以你的身份执行任意命令，官方要求：始终校验并清洗 Hook 处理的输入、构造命令时做正确的 shell 转义、绝不在日志里记录 token 或密码、给脚本与日志设置合适的权限、谨慎对待发起外部网络调用的 Hook、设置合理超时以免长时间阻塞 agent [@ref-github-copilot-hooksconc-security]。

## 入口、作用域与事件清单 {#hooks-entry-events}

**hooks.entry**：CLI 的 Hook 配置来自多个来源，官方给出的加载顺序是"策略（policy）→ 用户（user）→ 项目（project）→ 插件（plugins）"，然后**合并**；同一事件在多个来源出现时，所有来源的条目都会运行（不是覆盖）[@ref-github-copilot-hooksref-locations]。具体位置：

- 仓库级文件：仓库根目录 `.github/hooks/*.json` [@ref-github-copilot-hooksref-locations][@ref-github-copilot-hooks-repo]。
- 用户级文件：用户 Hook 目录下的 `*.json`，默认 `~/.copilot/hooks/`（macOS／Linux）或 `%USERPROFILE%\.copilot\hooks\`（Windows）；设置了 `COPILOT_HOME` 时改为 `$COPILOT_HOME/hooks/` [@ref-github-copilot-hooksref-locations][@ref-github-copilot-hooks-user]。配置目录参考同样把 `hooks/` 列为"用户级 hook 脚本"存放处，并说明仓库级 Hook 与用户级 Hook 一起加载 [@ref-github-copilot-cfgdir-hooks]。
- 内联 `hooks` 块：仓库 `.github/copilot/settings.json`（提交进仓库）或 `.github/copilot/settings.local.json`（通常被 gitignore 的个人覆盖）顶层的 `hooks` 字段；跨工具的 `.claude/settings.json`、`.claude/settings.local.json` 也会被读取 [@ref-github-copilot-hooksref-locations]。用户配置 `~/.copilot/settings.json` 也可用顶层 `hooks` 键内联定义，schema 与 `.github/hooks/*.json` 相同 [@ref-github-copilot-cfgdir-user-settings]。
- 仓库级 settings 中 `hooks` 的合并规则是"合并——同一键以仓库覆盖用户"；仓库级 `disableAllHooks` 是"仓库优先" [@ref-github-copilot-cfgdir-repo-settings]。
- 插件贡献的 Hook：由插件在其安装目录内的 `hooks.json`（或 `hooks/hooks.json`）声明 [@ref-github-copilot-hooksref-locations]。

**策略 Hook** 是机器级、由管理员安装的 Hook，先于其他所有 Hook 加载，且**不受 `disableAllHooks` 关闭**、无论目录信任状态如何都可用 [@ref-github-copilot-hooksref-locations]。它们来自两处：Linux／macOS 的 `/etc/github-copilot/policy.d/*.json`（按字母序）与 Windows 的 `C:\ProgramData\GitHub\Copilot\policy.d\*.json`，以及 Windows 注册表 `HKLM\Software\Policies\GitHub\Copilot` 下的 `Policy` 值；在 POSIX 系统上策略文件必须由 root 拥有且不可被组或其他用户写入 [@ref-github-copilot-hooksref-policy]。

**配置格式**：Hook 文件是 JSON，必须含 `version` 字段且值为 `1`，以及一个 `hooks` 对象，其每个键是事件名、值是该事件的 Hook 定义数组 [@ref-github-copilot-hooksconc-format]。加载时若某个条目格式错误，**只丢弃该条目并记录日志**，同文件内合法的兄弟 Hook 仍然加载；但结构性错误（JSON 非法、`version` 错误、事件列表不是数组）会整文件拒绝；而内联在 `settings.json` 里的 Hook 是严格模式，任一条目校验失败即整段 `hooks` 字段被拒 [@ref-github-copilot-hooksref-format]。命令型 Hook 的字段包括 `type`（默认 `"command"`）、`bash`／`powershell`／`command`（三者之一，`command` 是跨平台回退，会被复制到缺失的 `bash`／`powershell`）、`exec`＋`args`（CLI 专有，直接运行可执行文件、不经 shell，不能与 `bash`／`powershell`／`command` 混用）、`cwd`、`env`、`timeoutSec`（默认 `30`，`timeout` 是其别名）[@ref-github-copilot-hooksref-command]。

一个最小仓库级示例（来自 CLI 的 how-to 页，在 `.github/hooks/` 下新建 `NAME.json`）[@ref-github-copilot-hooks-repo]：

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [
      {
        "type": "command",
        "bash": "echo \"Session started: $(date)\" >> logs/session.log",
        "powershell": "Add-Content -Path logs/session.log -Value \"Session started: $(Get-Date)\"",
        "cwd": ".",
        "timeoutSec": 10
      }
    ]
  }
}
```

**hooks.events**：官方参考表列出全部受支持事件及其触发时点 [@ref-github-copilot-hooksref-events]；概念页用一组用途描述与之一致 [@ref-github-copilot-hooksconc-types]。CLI 支持参考页描述的**全部**事件 [@ref-github-copilot-hooksref-locations]。

| 事件 | 触发时点 |
|---|---|
| `sessionStart` | 新建或恢复会话开始时 |
| `sessionEnd` | 会话终止时 |
| `userPromptSubmitted` | 用户提交提示词时 |
| `preToolUse` | 每个工具执行之前 |
| `postToolUse` | 工具成功完成后 |
| `postToolUseFailure` | 工具以失败结束后 |
| `agentStop` | 主 agent 完成一轮回复时 |
| `subagentStart` | 子 agent 被创建、运行之前 |
| `subagentStop` | 子 agent 完成、把结果返回父级之前 |
| `errorOccurred` | 执行期间发生错误时 |
| `preCompact` | 上下文压缩（手动或自动）即将开始时 |
| `userPromptTransformed` | 运行时把提交的提示词转换为面向模型的内容后、写回会话历史之前 |
| `notification` | CLI 发出系统通知时（异步、不阻塞） |
| `permissionRequest` | 权限服务运行之前（CLI 专有） |

其中 `notification`、`permissionRequest`、`preCompact` 等既可在事件表中看到触发条件，也可在各自小节读到细节 [@ref-github-copilot-hooksref-events]。事件名有两种写法：camelCase（如 `sessionStart`）与 PascalCase（如 `SessionStart`）；后者使用 VS Code 兼容的 snake_case 负载，并启用 Claude 风格的 matcher 语义 [@ref-github-copilot-hooksref-inputs][@ref-github-copilot-hooksref-events]。

## 输入、输出与决策控制 {#hooks-input-output}

**hooks.input**：每个事件向 Hook 处理器投递一个 JSON 负载。事件名决定负载格式——camelCase 事件用 camelCase 字段，PascalCase 事件用 snake_case 字段以匹配 VS Code Copilot 扩展格式 [@ref-github-copilot-hooksref-inputs]。以 `preToolUse` 为例，camelCase 负载含 `sessionId`、`timestamp`、`cwd`、`toolName`、`toolArgs`；PascalCase 形式则含 `hook_event_name`、`session_id`、`timestamp`（ISO 8601 字符串）、`cwd`、`tool_name`、`tool_input` [@ref-github-copilot-hooksref-pretool]。`agentStop` 负载含 `sessionId`、`timestamp`、`cwd`、`transcriptPath`、`stopReason`、`stop_hook_active`（该值表明本轮是否已被此前一次 `block` 决策强制继续过）[@ref-github-copilot-hooksref-agentstop]。

命令型 Hook 从标准输入读取负载：官方调试示例把测试 JSON 用管道喂给脚本（`echo '{"timestamp":...,"cwd":...,"toolName":...,"toolArgs":...}' | ./my-hook.sh`），脚本内用 `INPUT=$(cat)` 读取 [@ref-github-copilot-hooks-debug]。每个负载都携带 `cwd` 字段；Hook 条目自身还可声明 `cwd` 与 `env`，其中 `env` 会在现有环境之上合并 [@ref-github-copilot-hooksref-command]。**敏感内容如何处理**这一点，固定来源只给出"绝不在日志记录 token 或密码"这类安全要求，未描述任何自动脱敏或字段裁剪机制 [@ref-github-copilot-hooksconc-security]；因此 `hooks.input` 的敏感信息处理按 **partial** 阅读，核对过的入口是 `hooksref-inputs`、`hooksref-command` 与概念页安全小节，缺口是：负载是否包含原始工具参数的全部内容、宿主流上是否有任何内置遮蔽，文档均未写明。

**hooks.output**：Hook 分三种类型，其输出方式不同 [@ref-github-copilot-hooksref-command]。

- `type: "command"`：运行脚本或可执行文件，所有事件均支持 [@ref-github-copilot-hooksref-command]。
- `type: "http"`：把输入负载作为 JSON `POST` 发到 URL，默认只允许 `https://`（例外见下）；`preToolUse` 与 `permissionRequest` 因响应可授予工具权限，必须用 `https://` [@ref-github-copilot-hooksref-http]。
- `type: "prompt"`：把文本当作"用户输入"自动提交，仅支持 `sessionStart`；且**只在新的交互式会话触发**，恢复会话与非交互的 `-p` 模式都不触发 [@ref-github-copilot-hooksref-prompt]。

命令型 Hook 可通过 stdout 输出 JSON 影响后续流程；其**退出码**语义为：`0` 成功，有 stdout 就按 Hook 输出 JSON 解析；`2` 默认按警告处理（stderr 呈现给用户、流程继续），但对 `permissionRequest` 与 `preToolUse` 视为拒绝；其他非零退出记为失败、默认 fail-open，**但 `preToolUse` 例外，是 fail-closed**；超时则一律 fail-open [@ref-github-copilot-hooksref-exit]。

决策控制字段：

- `preToolUse`：stdout JSON 可含 `permissionDecision`（`allow`／`deny`／`ask`）、`permissionDecisionReason`（`deny` 时必填）、`modifiedArgs`（替换工具参数）[@ref-github-copilot-hooksref-pretool-decide]。当 CLI 能显示 Hook 权限提示时，用户拒绝时可附反馈，反馈会追加进 agent 收到的消息 [@ref-github-copilot-hooksref-pretool-decide]。
- `agentStop`／`subagentStop`：可含 `decision`（`block`／`allow`）、`reason`（`block` 时下一轮的提示词）、`modifiedResponse`（仅 `subagentStop`，替换返回父级的响应）；`block` 决策优先于 `modifiedResponse`，且多次重写不叠加、最后返回者胜出；连续 `block` 8 次后 CLI 会强制结束本轮以防死循环 [@ref-github-copilot-hooksref-agentstop-decide]。
- `postToolUse`：可含 `modifiedResult`（`resultType: "success"`）与 `additionalContext`（追加到 `textResultForLlm` 供模型看到）；多个 Hook 的 `additionalContext` 用双换行拼接、上限 10 KB [@ref-github-copilot-hooksref-posttool-output]。
- `permissionRequest`（CLI 专有）：在权限服务运行**之前**触发，返回 `behavior: "allow"`／`"deny"` 即短路正常权限流程，返回空则回落到常规处理；`message` 是拒绝时反馈给 LLM 的原因，`interrupt: true` 配合 `deny` 可整体停止 agent；命令型 Hook 退出码 `2` 视为拒绝 [@ref-github-copilot-hooksref-permission]。对请求逃出沙箱的调用（`requestSandboxBypass: true`），Hook 的 `allow` 不会预先批准，只有 `deny` 仍能传播 [@ref-github-copilot-hooksref-permission]。

此外，命令型 Hook 可在执行期间向 CLI 时间线发**进度消息**：向 stdout 写 `{"type": "progress", "message": "..."}`，加 `"temporary": true` 则为短暂状态行；只有整行是单个合法 JSON 且 `"type": "progress"` 的行会被当作进度并从输出流中剔除，其余行原样保留，退出时把保留内容拼接、trim 后做一次 `JSON.parse` 作为最终输出 [@ref-github-copilot-hooksref-progress]。HTTP Hook 的本地回环例外：仅 `http://localhost`、`http://127.*`、`http://[::1]` 在设置 `COPILOT_HOOK_ALLOW_LOCALHOST=1` 时被允许 [@ref-github-copilot-hooksref-http]。

一个完整示例配置（来自概念页），展示命令型 Hook 的字段与多 Hook 数组 [@ref-github-copilot-hooksconc-example]：

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": "./scripts/security-check.sh",
        "powershell": "./scripts/security-check.ps1",
        "cwd": "scripts",
        "timeoutSec": 15
      },
      {
        "type": "command",
        "bash": "./scripts/log-tool-use.sh",
        "powershell": "./scripts/log-tool-use.ps1",
        "cwd": "scripts"
      }
    ]
  }
}
```

## 顺序、匹配与生效条件 {#hooks-order-conditions}

**hooks.order**：同一事件若配置了多个 Hook，它们**按顺序执行**；对 `preToolUse`，只要任一 Hook 返回 `"deny"` 即阻断该工具 [@ref-github-copilot-hooksref-exit]。多数事件上，Hook 失败（非 2 的非零退出、或超时）会被记录并跳过、agent 继续执行；**但命令型 `preToolUse` 对退出 2 与崩溃等非超时错误 fail-closed**，即使其 stdout JSON 声称 `permissionDecision: "allow"` 也会拒绝该次工具调用 [@ref-github-copilot-hooksref-exit]。**超时对所有事件一律 fail-open，包括 `preToolUse` 和管理员下发的策略 Hook**：会给出警告，并让工具调用走常规权限流程 [@ref-github-copilot-hooksref-exit]。HTTP 型 `preToolUse` 则是 fail-open（网络错误、超时或非 2xx 都回落到默认权限流程）[@ref-github-copilot-hooksref-pretool]。`agentStop`／`subagentStop` 有连续 8 次 `block` 的失控保护 [@ref-github-copilot-hooksref-agentstop-decide]。命令型 Hook 超时被 kill 后记录的消息含超时命令（脚本文本或 `program arg1 arg2 …`），截断到 80 字符 [@ref-github-copilot-hooksref-exit]。同步阻塞带来的时延是这一节的性能背景 [@ref-github-copilot-hooksconc-perf]。

**matcher 过滤**：若某个事件支持可选 `matcher` 正则，它编译为 `^(?:PATTERN)$` 并与整个值匹配（不是子串）；非法正则会让该条目被跳过、永不触发。支持 matcher 的事件及其匹配对象为：`notification`→`notification_type`、`permissionRequest`→`toolName`、`postToolUse`→`toolName`、`preCompact`→`trigger`、`preToolUse`→`toolName`、`subagentStart`→`agentName` [@ref-github-copilot-hooksref-matcher]。可用 matcher 匹配的工具名清单为：`ask_user`、`bash`、`create`、`edit`、`glob`、`grep`、`powershell`、`task`、`view`、`web_fetch` [@ref-github-copilot-hooksref-toolnames]。当事件用 PascalCase（如 `PreToolUse`）配置时，改用 Claude 的 matcher 语义（`*`、`**` 或空表示全部；字面名或 `|` 分隔的任一命中；否则按大小写敏感、锚定的正则匹配 Claude 工具名），并以 Claude 工具名（如 `Bash`）上报 `tool_name` [@ref-github-copilot-hooksref-inputs]。

**hooks.conditions**：生效与否受多重开关与信任状态影响。

- `disableAllHooks`：在单个 `.github/hooks/*.json` 里设为 `true`，只跳过该文件内的 Hook（CLI 与 cloud agent 都认）；在仓库 `settings.json` 顶层设为 `true`（CLI 专有），则跳过该仓库会话里来自所有来源的 Hook（仓库文件、用户文件、插件、内联块），但**策略 Hook 不受影响**、继续运行 [@ref-github-copilot-hooksref-disable][@ref-github-copilot-cfgdir-repo-settings]。
- 信任与自动批准：把 `COPILOT_ALLOW_ALL` 设为恰好 `true` 会连带信任工作目录，从而加载该目录的 skills、plugins、MCP servers 和**hooks（包括运行 shell 命令的 Hook）**；其他真值写法只自动批准工具 [@ref-github-copilot-cmdref-env]。仓库 Hook 默认不在非交互 `-p` 模式加载，设 `GITHUB_COPILOT_PROMPT_MODE_REPO_HOOKS=true` 可开启；文件夹已受信或设置了 `COPILOT_ALLOW_ALL` 时也会自动加载 [@ref-github-copilot-cmdref-env]。
- 信任目录：Hook 会以你的身份执行命令，而信任目录控制 CLI 能读、改、执行哪些文件，官方建议只在可信目录启动 CLI [@ref-github-copilot-conc-trust]。
- 沙箱：本地沙箱在会话内用 `/sandbox enable` 开启，限制文件系统、网络与系统能力；云沙箱用 `copilot --cloud` 启动 [@ref-github-copilot-conc-sandbox]。**但固定来源未说明 Hook 在沙箱内的执行语义**（命令是否在沙箱边界内运行、`requestSandboxBypass` 与 Hook 的关系细节等），故此问题按 **partial** 阅读，核对过的入口是 `conc-sandbox`、`hooksref-permission` 与 `hooksref-disable`，缺口是沙箱对 Hook 进程的具体约束。

## 诊断与实测 {#hooks-diagnostics}

**配置何时生效**：Hook 配置的改动**在 CLI 启动时加载**；新建或修改用户级 Hook 后需要启动或重启 Copilot CLI 才会生效，删除 Hook 文件即可移除这些 Hook [@ref-github-copilot-hooks-user]。CLI 配置目录参考把 `hooks/` 记为存放用户级 Hook 脚本的位置 [@ref-github-copilot-cfgdir-hooks]。

**查看已加载内容**：交互界面里 `/env` 命令显示已加载的环境细节，其中就包含 hooks（以及 instructions、MCP servers、skills、agents、plugins、LSPs、extensions）[@ref-github-copilot-cmdref-slash]。固定来源**没有**提供专门的 `/hooks` 检查命令，也没有描述 Hook 的"被发现／匹配／执行／失败"逐项诊断入口；因此 `hooks.diagnostics` 按 **partial** 阅读，核对过的入口是 `cmdref-slash`、`hooks-troubleshoot`、`hooks-debug` 与 `hooks-user`，缺口是无专用列出或回放某次 Hook 调用的命令。

**调试方法**（来自 CLI 的 how-to 页）[@ref-github-copilot-hooks-debug]：在脚本里开启详细日志以查看输入并追踪执行——bash 用 `set -x`，把收到的输入写到 stderr：

```bash
#!/bin/bash
set -x
INPUT=$(cat)
echo "DEBUG: Received input" >&2
echo "$INPUT" >&2
```

也可以把测试输入用管道喂给 Hook 本地验证：

```bash
echo '{"timestamp":1704614400000,"cwd":"/tmp","toolName":"bash","toolArgs":"{\"command\":\"ls\"}"}' | ./my-hook.sh
echo $?          # 查看退出码
./my-hook.sh | jq .   # 校验输出是合法 JSON
```

**排障清单**（how-to 页的 Troubleshooting 表）：Hook 不执行时，确认 JSON 文件确实位于 `.github/hooks/`、用 `jq .` 一类工具检查 JSON 语法、确保 `version: 1`、确认被调用的脚本可执行（`chmod +x script.sh`）、脚本有正确的 shebang（如 `#!/bin/bash`）；Hook 超时时，默认超时为 30 秒，需要时增大 `timeoutSec` 并精简脚本；输出 JSON 非法时，确保输出在**单行**上，Unix 用 `jq -c` 压缩校验、Windows 用 `ConvertTo-Json -Compress` [@ref-github-copilot-hooks-troubleshoot]。这些检查点与"改动在 CLI 启动时加载"共同构成目前官方给出的全部诊断路径 [@ref-github-copilot-hooks-user]。
