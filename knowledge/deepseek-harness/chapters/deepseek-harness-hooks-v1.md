---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-hooks-v1
harness_id: deepseek-harness
topic: hooks
title: "DeepSeek Harness 的 Hooks：没有第一方 hook API，只有事件监听器与两个兼容桥"
sections:
  - section_id: hooks-event-surface
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-events-e03, ref-dsh-hooks-hooks-events-e04, ref-dsh-hooks-hooks-events-e06, ref-dsh-hooks-hooks-events-e07, ref-dsh-hooks-hooks-events-e08, ref-dsh-hooks-hooks-events-e10]
  - section_id: hooks-registration
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-entry-e01, ref-dsh-hooks-hooks-entry-e03, ref-dsh-hooks-hooks-entry-e05]
  - section_id: hooks-payload
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-input-e01, ref-dsh-hooks-hooks-input-e04, ref-dsh-hooks-hooks-input-e05, ref-dsh-hooks-hooks-input-e06]
  - section_id: hooks-decision
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-output-e02, ref-dsh-hooks-hooks-output-e03, ref-dsh-hooks-hooks-output-e06]
  - section_id: hooks-execution
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-order-e02, ref-dsh-hooks-hooks-order-e06, ref-dsh-hooks-hooks-order-e07]
  - section_id: hooks-gating
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-conditions-e01, ref-dsh-hooks-hooks-conditions-e03, ref-dsh-hooks-hooks-conditions-e04, ref-dsh-hooks-hooks-conditions-e05, ref-dsh-hooks-hooks-conditions-e06, ref-dsh-hooks-hooks-conditions-e08]
  - section_id: hooks-observability
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-hooks-hooks-diagnostics-e01, ref-dsh-hooks-hooks-diagnostics-e03]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-event-surface
        status: answered
        source_refs: [ref-dsh-hooks-hooks-events-e03, ref-dsh-hooks-hooks-events-e04, ref-dsh-hooks-hooks-events-e06, ref-dsh-hooks-hooks-events-e07, ref-dsh-hooks-hooks-events-e08, ref-dsh-hooks-hooks-events-e10]
  - question_id: hooks.entry
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-registration
        status: answered
        source_refs: [ref-dsh-hooks-hooks-entry-e01, ref-dsh-hooks-hooks-entry-e03, ref-dsh-hooks-hooks-entry-e05]
  - question_id: hooks.input
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-payload
        status: answered
        source_refs: [ref-dsh-hooks-hooks-input-e01, ref-dsh-hooks-hooks-input-e04, ref-dsh-hooks-hooks-input-e05, ref-dsh-hooks-hooks-input-e06]
  - question_id: hooks.output
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-decision
        status: answered
        source_refs: [ref-dsh-hooks-hooks-output-e02, ref-dsh-hooks-hooks-output-e03, ref-dsh-hooks-hooks-output-e06]
  - question_id: hooks.order
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-execution
        status: answered
        source_refs: [ref-dsh-hooks-hooks-order-e02, ref-dsh-hooks-hooks-order-e06, ref-dsh-hooks-hooks-order-e07]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-gating
        status: answered
        source_refs: [ref-dsh-hooks-hooks-conditions-e01, ref-dsh-hooks-hooks-conditions-e03, ref-dsh-hooks-hooks-conditions-e04, ref-dsh-hooks-hooks-conditions-e05, ref-dsh-hooks-hooks-conditions-e06, ref-dsh-hooks-hooks-conditions-e08]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: hooks-observability
        status: partial
        source_refs: [ref-dsh-hooks-hooks-diagnostics-e01, ref-dsh-hooks-hooks-diagnostics-e03]
---

## 「第一方 hook 事件」在本产品里的真实含义 {#hooks-event-surface}

先纠正一个容易想当然的说法：**DeepSeek Harness 没有第一方 hook API**。实际存在的是三样机制，任何一句「DSH 支持 hooks」都必须落到其中一样上。

**（一）通用 Cordis 事件监听器**。`agent/created`、`agent/pre-step`、`tools/pre-execute`、`tools/post-execute`、`agent/turn-stopping`、`subagent/start`、`subagent/end` 都是普通 Cordis 事件，任何插件都能用 `ctx.on` 订阅，附带完整宿主 API 写入 [@ref-dsh-hooks-hooks-events-e07]。写这种监听器的原生插件不产生任何 `hook/*` 记录。

**（二）`packages/hooks/` 下的两个兼容桥**。`dsh-hook-protocol` 是共享引擎，`dsh-hooks-claude-code` 与 `dsh-hooks-codex` 是挂载它的两个插件。两者都**不**声明新的 Cordis 事件，而是在已存在的第一方拦截点上注册监听器，再在那些点上发出按配置命名的触发点。Claude Code 方言支持 7 个点：`SessionStart`（来自 `agent/created`）、`UserPromptSubmit` 与 `PreToolUse`（对应 waterfall `agent/pre-step` 与 `tools/pre-execute`）、`PostToolUse`（`tools/post-execute`）、`Stop`（串行监听 `agent/turn-stopping`）、`SubagentStart` / `SubagentStop`（仅 Claude Code 桥）[@ref-dsh-hooks-hooks-events-e03]。Codex 方言支持 5 个，去掉子代理两点 [@ref-dsh-hooks-hooks-events-e04]。协议另声明两个**持久、只记日志**的会话事件 `hook/invoked` 与 `hook/result`，它们不是表面事件、不带 `surfaceOp` [@ref-dsh-hooks-hooks-events-e06]。

**（三）`packages/experimental/claude-code-mods`**，一个独立的实验桥，事件名是 `session.start`、`prompt.submit`、`turn.start`、`tool.call`、`turn.complete`、`command.run`、`ui.render`、`session.end` 以及 `{namespace}.{method}`。这些是 Claude Code **mod** 的名字，不是 `hooks.json` 的名字，也不是 `packages/hooks/` 写的 [@ref-dsh-hooks-hooks-events-e08]。

界面差异只有一处真正影响行为：`sdk-minimal` 是不叠加 `dsh-base` 的独立 insert，而两个桥都 `inject` 了 `shell` 服务、该树里没有任何提供 `shell` 的行 [@ref-dsh-hooks-hooks-events-e10]，所以在那个界面上挂桥行会一直 pending；它也没有 `subagent` 行，两个子代理触发点无法触发。Codex 比 Claude Code 少两点是**方言**差异，在每个界面上都一样。

## Hook 在哪里注册、怎样匹配 {#hooks-registration}

`dsh` 配置里没有 `hooks:` 段。一个 hook 注册在两处：**桥本身作为 Cordis 插件行**挂进 profile 的 patch 链，并用 `configPath` 指向一个外部配置文件（Claude Code 桥接受 `configPath`（必填）、`pluginRoot`、`projectDir`、`defaultTimeoutMs`、`stderrSummaryMaxChars`；Codex 桥接受 `configPath`（必填）、`model`、`defaultTimeoutMs`、`stderrSummaryMaxChars`），两个配置都在 `apply()` 内用 `readFileSync` 读一次；**hook 本身在那个文件里**，用参考工具自己的 JSON 形状——裸的 `{ "{Event}": [ { matcher, hooks: [...] } ] }` 映射，或一个 `hooks` 键持有该映射的设置文件 [@ref-dsh-hooks-hooks-entry-e01]。

每个 hook 条目接受的字段是 `type`（只有 `'command'` 会运行，`http`、`mcp_tool`、`prompt`、`agent` 会被解析后跳过并告警）、`command` 与 `timeout`（秒；Codex 还接受 `timeoutSec` 别名）；每个分组的字段是 `matcher` 与 `hooks` [@ref-dsh-hooks-hooks-entry-e03]。

**作用域是进程级的**：一个进程一个 `configPath`，没有用户／项目／会话／插件分层，没有按会话发现，没有热重载，Codex 的信任控制未实现。**匹配规则**：matcher 缺失、`''` 与 `'*'` 都表示全匹配；`claude-code` 模式下匹配 `/^[A-Za-z0-9_|]+$/` 的模式按 `|` 切分后精确比较，其它模式编译为非锚定正则；`codex` 模式下**每个**模式都是非锚定正则 [@ref-dsh-hooks-hooks-entry-e05]。`UserPromptSubmit` 与 `Stop` 的 matcher 在解析时就被丢弃，因为这两个点没有匹配对象。非法正则在解析期抛 `SyntaxError`，在注册任何监听器之前就拒绝整份配置；运行期的非法正则只是一次不匹配。

## Hook 收到什么 {#hooks-payload}

hook 是一个普通子进程。`runHook` 把事件负载序列化成 JSON 写到 hook 的 **stdin**，并交给 `ctx.shell` 执行 [@ref-dsh-hooks-hooks-input-e01]。负载是方言形状的，由桥构造：Claude Code 基础字段是 `session_id`、`transcript_path`（恒为 `''`）、`cwd`（会话头 cwd，回落 `process.cwd()`）、`hook_event_name`；`SessionStart` 另有 `source`，`UserPromptSubmit` 有 `prompt`，`PreToolUse`/`PostToolUse` 有 `tool_name`、真实的 `tool_input`（即 `exec.arguments`）与 `tool_use_id`，`PostToolUse` 另有把结果内容压平成文本的 `tool_response`。Codex 基础字段加上 `model` 与 `permission_mode: 'default'`，用 `transcript_path: null`、snake_case 的 `turn_id`，并且写 stdin **不带**结尾换行 [@ref-dsh-hooks-hooks-input-e05]。

**环境变量**：只有 Claude Code 桥注入一个 `CLAUDE_PROJECT_DIR`，省略 `projectDir` 时默认取会话工作区，它在执行器的凭据清除**之后**合并；`${CLAUDE_PLUGIN_ROOT}` 与 `${CLAUDE_PROJECT_DIR}` 在解析期做文本替换。Codex 桥不传任何 `env`，也不做替换。**工作目录**：两个桥都传 `cwd: agent.session.header.cwd`，即 `session/new` 给出的会话工作区，所以 `pwd` 与相对路径指向项目而不是启动目录 [@ref-dsh-hooks-hooks-input-e04]。

**敏感内容**要说清楚：hook 起始环境是子进程接缝清除后的父环境，不是宿主完整环境——凭据形状的名字与环境的 `DSH_*` 事实被清掉，调用方显式的 `env` 在清除之后合并 [@ref-dsh-hooks-hooks-input-e06]。负载本身**没有**脱敏：`tool_input` 原样携带真实工具参数。原生 Cordis 插件在同一触发点看到的是同一套带类型的事件参数，完全没有 stdin 封装。

## 输出怎样继续、修改或阻断 {#hooks-decision}

`parseHookOutput(exitCode, stdout, stderr, expectedEventName)` 把输出解成一个中立的 `HookOutput`。**退出码是主通道**：退出码 `2` 置 `decision: 'block'`，stderr 去空白后作为 `reason`；其它非零退出、信号死亡（映射为 `undefined`）或 spawn 失败都是**非阻断错误**，操作继续。退出码 0 可以携带 JSON（仅当 stdout 以 `{` 开头才尝试，格式错误降级为纯文本而不是错误），从两个通道解码：遗留的顶层 `decision` 只接受 `approve`/`block`，以及按 `hookEventName` 索引的 `hookSpecificOutput`，携带 `permissionDecision`（`allow`/`deny`/`ask`，覆盖顶层值）、`permissionDecisionReason`、`additionalContext` 与 `updatedInput`；`hookEventName` 缺失或指向别的事件时，其事件作用域字段被丢弃 [@ref-dsh-hooks-hooks-output-e02]。

**合并**按 rank：`deny`/`block` = 3，`ask` = 2，`approve`/`allow` = 1，无 = 0；保留最高 rank，只在胜出 rank 上用 `\n\n` 连接理由，第一个 `continue: false` 具有粘性，`additionalContext` 与 `systemMessage` 按 hook 顺序累加 [@ref-dsh-hooks-hooks-output-e03]。

映射到操作上按触发点和方言分：Claude Code 的 `PreToolUse` deny → `{ kind: 'deny', reason }`（回退文案 `blocked by PreToolUse hook`），ask → `{ kind: 'ask' }`，否则 `next()`；`PostToolUse` deny → `{ kind: 'block', feedback }`；`UserPromptSubmit` deny → `{ kind: 'reject' }` 且提示被丢弃、无模型可见消息；`Stop` deny → `agent.steer(...)` 强制再一次模型步骤；`SessionStart` 与 `SubagentStart` 只能通过 `agent.inject` 注入上下文。Codex 基本相同，但 `PreToolUse` **完全没有** `ask` 分支（只有 deny 然后 `next()`）、没有子代理点，且干净的纯 stdout 会被提升为 `additionalContext` [@ref-dsh-hooks-hooks-output-e06]。

**改不了的部分**：Claude Code 桥解析 `updatedInput` 但不采纳（只记一条告警并保留原参数），Codex 桥则在解析阶段直接丢弃这个字段，连告警都没有；`systemMessage` 被记录告警但从不呈现；`{"continue": false}` 记进日志但没有运行时后果。

## 顺序、并发、超时与失败 {#hooks-execution}

**同一个触发点内**，匹配是嵌套循环：先按配置顺序遍历 matcher 分组，再按数组顺序遍历 `group.hooks`，每个 hook 都被 `await` 后才轮到下一个——所以命中的 hook **串行、按配置顺序、绝不并发** [@ref-dsh-hooks-hooks-order-e02]。没有去重：同一条命令写两次就跑两次，这一点与 Claude Code 和 Codex（它们把相同处理器并行跑一次）不同。跨**插件**监听器则遵循 Cordis waterfall／串行的注册顺序调度。

**超时**：每个 hook 的 `timeout`（秒）乘 1000 覆盖桥默认值，共享默认是 `DEFAULT_HOOK_TIMEOUT_MS = 600_000`（10 分钟），两个桥的 `defaultTimeoutMs` 默认取它。所有者操作的 `AbortSignal` 会传进 `runHook`，执行器提供进程组取消，所以取消该轮会**杀掉**正在运行的 hook 而不是等它结束。

**重复触发**没有 once 语义：`PreToolUse` 每次命中工具调用触发一次，`PostToolUse` 每个命中结果一次，N 次相同工具调用就触发 N 次；`once`、`if`、`async` 处理器选项明确不生效。**失败处理是容纳而非升级**：`runHook` 捕获执行器拒绝并返回无退出码的输出；运行期非法正则只是一次不匹配；畸形 JSON 保持纯 stdout。

**生命周期**：`SessionStart`（两个桥）与 `SubagentStart`/`SubagentStop`（Claude Code 桥）是**分离执行**的——没有扩展点 await 它们，所以桥用 `createDetachedRuns()` 跟踪每条运行链，并把 `detached.drain()` 注册为 `ctx.effect` disposer [@ref-dsh-hooks-hooks-order-e06]。因此 `fiber.dispose()` 兑现就意味着没有 hook 进程或迟到回调比 fiber 活得久。文档也点出后果：因为 `SessionStart` 分离执行，它注入的上下文可能赶不上第一个请求。CLI 参考给出外层上界：进程关闭给插件树最多五秒 dispose，第二次 `SIGINT`/`SIGTERM` 立即退出 [@ref-dsh-hooks-hooks-order-e07]。

## 启用、批准、信任与沙箱 {#hooks-gating}

**启用**：桥是 Cordis 插件行，声明 `inject = ['shell', 'sessionProjections']`，因此在该 profile 的树里 `shell` provider 与会话投影注册表都存在之前它不会激活 [@ref-dsh-hooks-hooks-conditions-e05]。除此之外没有门：没有功能开关、没有按会话开关、没有 `hooks.enabled` 键。加载器行当然可以被标 `disabled`。

**批准**：`PreToolUse` 是 `tools/pre-execute` waterfall 上的监听器，而流水线图把它标为「hooks, permission, sandbox」并放在单调 guard 与工具体**之前** [@ref-dsh-hooks-hooks-conditions-e01]。hook 的 `deny` 直接短路到 denied 路径，工具体被跳过；hook 的 `ask`（仅 Claude Code 方言）返回 `{ kind: 'ask' }`，由流水线转到 `ctx.approval` 一次性提示。于是 hook 的 `ask` 受会话 `ApprovalPolicy` 约束：在 `ask` 下会咨询组合出的 answerer 链，在 `never` 下服务确定返回 `rejected` 且不分发任何 answerer——**hook 无法把 `never` 策略翻成一次批准** [@ref-dsh-hooks-hooks-conditions-e03]。出厂 base bundle 在 `DSH_PERMISSION_MODE` 为 `danger-full-access` 时把该策略设为 `never`，否则 `ask` [@ref-dsh-hooks-hooks-conditions-e04]。Codex 桥没有 `ask` 路径。

**信任与沙箱**：两个桥都不对 hook 配置或 hook 进程做任何信任检查——没有提示、没有签名校验、没有允许列表，Claude Code 与 Codex 的信任控制层都未实现 [@ref-dsh-hooks-hooks-conditions-e06]。hook 进程也不受宿主沙箱策略约束：它走 `ctx.shell`（受管范围与进程组取消适用），但 `PreToolUse` hook 自己的命令在工具的沙箱判定之前、且在沙箱之外执行。反方向上宿主沙箱也不会被 hook 削弱：`PostToolUse` 只能阻断或补充上下文，绝不能重新授权。要注意一处不对称：`claude-code-mods` 的 hook 是进程内 JavaScript，拥有「进程的完整权限」且明确「不对 mods 应用沙箱」，而 `packages/hooks/` 的桥至少把 hook 限制在带清除环境的子进程里 [@ref-dsh-hooks-hooks-conditions-e08]。

## 诊断与配置生效时机 {#hooks-observability}

**没有第一方 hook 诊断命令**：`apps/cli/reference/README.md` 里根本不出现 "hook"，也没有任何 `*.yml` 默认挂载这两个桥。实际可用的有三层。

**（1）加载期日志告警**：配置读不到或解析不了会记一条 `hooks-claude-code: could not load hook config` 告警（带路径与错误）并且不注册任何东西；每个被跳过的非 command 处理器会记 `skipping unsupported` 告警（带类型与事件名）；每次运行里 hook 设置 `updatedInput` 或 `systemMessage` 会带触发点名告警；分离 inject 抛错记一条带触发点名与错误的 `hook failed` 告警 [@ref-dsh-hooks-hooks-diagnostics-e01]。

**（2）会话日志里的持久逐次记录**：每个轮内 hook 写一条 `hook/invoked` 和一条 `hook/result`，用 `handlerId` 关联，携带 `turn`、`point`、`dialect`（`claude-code` / `codex`）、选中它的 `matcher`（全匹配时无），result 上还有 `decision`、可选 `exitCode`、按 `stderrSummaryMaxChars`（默认 500，超出加省略号）裁剪的 `stderrSummary` 与 `durationMs` [@ref-dsh-hooks-hooks-diagnostics-e03]。它们只记日志、不是表面事件，而且必须落在打开的轮内——`SessionStart` 发生在轮 1 之前，因此**没有** `hook/*` 记录，其效果只能从注入的上下文看到。

**（3）配置内省**：`dsh --profile {name} --dump-config` 打印组合树，能看出桥行是否存在及其 config；`--dump-config-schema` 把它的 `Config` 投影成 JSON Schema。

**配置何时生效**：运行时根本不生效。桥在 `apply()` 内只读一次 `configPath`，所以改 `hooks.json` 必须重启进程；产品里唯一的热重载路径是 `dsh-hmr` 对 profile 与 home `cordis.patch.yml` 层的监听，它能改桥**行**（因而重跑 `apply()`），但改不了已经解析好的 hook 配置。参考工具自己的 `claude plugin validate` / `claude plugin test` 等价物以及 Claude Code 的热重载都明确未实现。
