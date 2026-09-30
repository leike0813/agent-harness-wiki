---
schema_version: 3
record_kind: production
edition_id: cline-cli-hooks-v2
harness_id: cline
topic: hooks
title: "Cline CLI 的 Hook 事件、文件发现与输入输出契约"
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs: [ref-cline-hooks-doc-stub, ref-cline-hooks-events, ref-cline-hooks-file-names, ref-cline-hooks-example-map, ref-cline-cli-hook-invocation, ref-cline-sdk-plugins-doc-stages, ref-cline-sdk-plugins-doc-what, ref-cline-plugin-hooks-cap, ref-cline-hooks-event-map]
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs: [ref-cline-paths-hooks, ref-cline-hooks-file-ext, ref-cline-hooks-list, ref-cline-hooks-file-names, ref-cline-hooks-file-extension, ref-cline-cli-hooks-dir, ref-cline-cli-hooks-dir-opt, ref-cline-hooks-doc-clineignore-v2, ref-cline-cli-ref-env]
  - section_id: hooks-io
    surface_ids: [cli]
    source_refs: [ref-cline-hooks-spawn, ref-cline-hooks-base-payload, ref-cline-hooks-after-run, ref-cline-cli-hook-payload, ref-cline-cli-hook-audit, ref-cline-hooks-context-cap, ref-cline-hooks-parse-stdout, ref-cline-hooks-output-schema, ref-cline-hooks-blocking, ref-cline-hooks-example-fields]
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs: [ref-cline-hooks-list, ref-cline-hooks-blocking, ref-cline-hooks-merge-control, ref-cline-hooks-layer-merge, ref-cline-hooks-tool-timeout, ref-cline-hooks-sigkill, ref-cline-hooks-detached-const, ref-cline-sdk-plugins-doc-policies, ref-cline-hooks-list-sort]
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs: [ref-cline-cli-run-agent-hooks, ref-cline-cli-hook-yolo, ref-cline-hooks-example-yolo, ref-cline-hooks-file-extension, ref-cline-hook-error-mode, ref-cline-cli-hooks-cmd, ref-cline-cli-hook-invocation, ref-cline-hooks-example-debug, ref-cline-hooks-discovery-ctor]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs: [ref-cline-hooks-events, ref-cline-hooks-file-names, ref-cline-sdk-plugins-doc-stages, ref-cline-hooks-event-map]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: conflict
        source_refs: [ref-cline-paths-hooks, ref-cline-cli-hooks-dir, ref-cline-hooks-doc-clineignore-v2]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-cline-hooks-spawn, ref-cline-hooks-base-payload, ref-cline-cli-hook-audit]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-io
        status: answered
        source_refs: [ref-cline-hooks-output-schema, ref-cline-hooks-parse-stdout, ref-cline-hooks-after-run]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: partial
        source_refs: [ref-cline-hooks-blocking, ref-cline-hooks-merge-control, ref-cline-sdk-plugins-doc-policies]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-cline-cli-hook-yolo, ref-cline-hooks-file-extension, ref-cline-hook-error-mode]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs: [ref-cline-cli-hooks-cmd, ref-cline-cli-hook-invocation, ref-cline-hooks-example-debug]
---

## 事件集合与文件映射 {#hooks-events}

固定来源：仓库提交 `3435f72fcf4cb843bee946b8f9e981683564c9e3` 的 `sdk/packages/shared/src/hooks/events.ts`、`sdk/packages/core/src/hooks/`、`sdk/packages/core/src/services/local-runtime-bootstrap.ts`、`apps/cli/src/utils/hooks.ts`、`apps/cli/src/commands/hook.ts`，以及 `docs/customization/hooks.mdx`、`docs/sdk/plugins.mdx`、`docs/cli/cli-reference.mdx`、`sdk/examples/hooks/README.md`。`docs/customization/hooks.mdx` 本身只有 6 行，正文写着「见 SDK Plugins 页」，机制细节以上面的实现为准。[@ref-cline-hooks-doc-stub]

第一方事件集合就是 `HookEventNameSchema` 的 10 个值：`agent_start`、`agent_resume`、`agent_abort`、`agent_end`、`agent_error`、`tool_call`、`tool_result`、`prompt_submit`、`pre_compact`、`session_shutdown`；它们也是文件 hook 载荷里的 `hookName` 值与 `cline hook` 接受的取值。[@ref-cline-hooks-events]

文件 hook 用**文件名**绑定事件（扩展名会先剥掉、大小写不敏感）：`TaskStart→agent_start`、`TaskResume→agent_resume`、`TaskCancel→agent_abort`、`TaskComplete→agent_end`、`TaskError→agent_error`、`PreToolUse→tool_call`、`PostToolUse→tool_result`、`UserPromptSubmit→prompt_submit`、`SessionShutdown→session_shutdown`；`PreCompact` 在映射表里显式是 `undefined`，即本版本没有可触发的文件 hook。[@ref-cline-hooks-file-names][@ref-cline-hooks-event-map]

示例 README 里的对照表与实现一致（文件 → 事件 → 对应的运行时回调）。[@ref-cline-hooks-example-map]

CLI 自己的运行时 hook 也发射同一批事件名：`beforeRun` 发 `agent_start`/`agent_resume`（`CLINE_HOOK_AGENT_RESUME=1` 时取 resume），`beforeTool` 发 `tool_call`，`afterTool` 发 `tool_result`，`afterRun` 按结果发 `agent_end`/`agent_abort`/`agent_error`。[@ref-cline-cli-hook-invocation]

**同名但不同来源的事件。** 官方文档 `docs/sdk/plugins.mdx` 的「Hook Stages」列的是插件层面的阶段名（`input`、`runtime_event`、`session_start`、`run_start`、`before_agent_start`、`tool_call_before`、…），这些是文档概念名，不是上面那 10 个实现事件名；插件里的 hook 是 `AgentPlugin.hooks` 里的 7 个回调（`beforeRun`/`beforeModel`/`afterModel`/`beforeTool`/`afterTool`/`afterRun`/`onEvent`），声明它们还必须在 manifest 里带 `hooks` 能力。[@ref-cline-sdk-plugins-doc-stages][@ref-cline-sdk-plugins-doc-what][@ref-cline-plugin-hooks-cap]

## 发现位置与注册 {#hooks-entry}

搜索根由 `resolveHooksConfigSearchPaths(workspacePath)` 给出，按顺序去重：`~/Documents/Cline/Hooks`、`~/.cline/hooks`，以及工作区存在时的 `.clinerules/hooks`（废弃目录）与 `.cline/hooks`。[@ref-cline-paths-hooks]

一个文件算不算 hook，只取决于两件事：扩展名在支持集合内（无扩展名、`.sh`、`.bash`、`.zsh`、`.js`、`.mjs`、`.cjs`、`.ts`、`.mts`、`.cts`、`.py`、`.ps1`），且去掉扩展名后的 basename 命中事件名表。**没有 glob、没有模式匹配、没有 matcher 字段**，同名文件在多个根下会各自成为一条命令。[@ref-cline-hooks-file-ext][@ref-cline-hooks-list]

解释器按文件推断：显式 shebang 优先（`env` 会被拆掉；`python3`/`python` 在 win32 上换成 `py -3`）；否则按扩展名取 `bash`/`node`/`bun run`/`python3`/`powershell -File`，无扩展名默认 `bash`。[@ref-cline-hooks-file-names]

注册发生在会话引导阶段：`local-runtime-bootstrap.ts` 在配置扩展里含 `hooks` 时构造 `createHookConfigFileExtension({cwd, workspacePath, rootSessionId, ...})`，把文件 hook 与审计 hook 合并进会话的 `hooks`。[@ref-cline-hooks-file-extension]

**冲突（文档说可以，代码没有消费者）。** CLI 定义了 `--hooks-dir` 参数（帮助文本说默认 `~/.cline/hooks`），`main.ts` 把它写进环境变量 `CLINE_HOOKS_DIR`；但固定提交的 `sdk/` 与 `apps/cli/` 里**没有任何地方读取 `CLINE_HOOKS_DIR`**，`resolveHooksConfigSearchPaths` 也没有它的分支，文档（CLI 参考的 Environment Variables 表与 `.clineignore` 页的 hook 小节）却都声称它会追加一个 hooks 目录。按代码，自定义 hooks 目录目前不会生效。[@ref-cline-cli-hooks-dir][@ref-cline-cli-hooks-dir-opt][@ref-cline-hooks-doc-clineignore-v2][@ref-cline-cli-ref-env]

## 输入与输出契约 {#hooks-io}

**输入**：每个文件 hook 在 stdin 上收到**恰好一个** JSON 载荷，子进程的 `cwd` 取自运行时选项（CLI 传 `config.cwd`），环境变量继承 CLI 进程（只额外补 `CLINE_BUILD_ENV`），所以 hook 能看到 CLI 环境里的 provider 密钥。[@ref-cline-hooks-spawn]

载荷的公共字段包括 `hookName`、`clineVersion`、ISO `timestamp`、`taskId`、`sessionContext.rootSessionId`、`workspaceRoots`、`userId`、`agent_id`、`parent_agent_id`；事件专属字段按事件给出（例如 `tool_call` 带 `tool_call{id,name,input}`，`tool_result` 带输出与耗时，`prompt_submit` 带 prompt，`agent_end` 带输出与状态）。[@ref-cline-hooks-base-payload][@ref-cline-hooks-after-run]

CLI 侧构造载荷的实现与审计入口是同一份：所有经 CLI 派发的载荷都会以一行 JSON 追加到 `CLINE_HOOKS_LOG_PATH`（未设置时是默认 hooks 日志目录下的 `hooks.jsonl`）。载荷本身不做脱敏，只有 hook **注入的上下文**有 50000 字符上限。[@ref-cline-cli-hook-payload][@ref-cline-cli-hook-audit][@ref-cline-hooks-context-cap]

**输出**：控制通道是 stdout 的 JSON，而不是退出码。解析规则：若 stdout 里存在以 `HOOK_CONTROL` 加制表符开头的行，取**最后一行**；否则把整段 trim 后的 stdout 当一个 JSON 对象解析，失败记为 parse error。[@ref-cline-hooks-parse-stdout]

`HookOutputSchema` 接受 `contextModification`、`cancel`、`review`、`errorMessage`、`context`、`overrideInput`（`.passthrough()`）。语义：`cancel: true` 变成 `stop` 并把 `errorMessage`（回退到 context）作为原因；`context`/`contextModification` 在未取消时作为附加上下文注入（截断到 50000 字符）；`overrideInput` 替换 `tool_call` 的工具入参；空对象 `{}` 表示不干预。[@ref-cline-hooks-output-schema]

退出码从不被检查：超时与解析失败只记日志并跳过该命令，其余命令照常合并；非零退出但 JSON 合法仍然生效，零退出但没有 JSON 则被忽略。`agent_start`/`agent_resume` 的文件 hook 默认是 fire-and-forget（detached、stdout/stderr 丢弃），只有宿主显式要求 blocking 才有控制通道；`prompt_submit`、`agent_end`、`agent_error`、`agent_abort`、`session_shutdown` 始终异步，没有控制通道。[@ref-cline-hooks-blocking][@ref-cline-hooks-after-run]

示例 README 给出的输出字段表（`cancel`/`review`/`context`/`errorMessage` 及其适用事件）与实现的方向一致，但注意 `review` 在文件 hook 路径里只被解析、不会映射成任何结果。[@ref-cline-hooks-example-fields]

## 顺序、并发、超时与失败 {#hooks-order}

同一事件的多个文件**全部**会执行，顺序是 `listHookConfigFiles` 返回的路径排序；blocking 路径在数组上**串行** await。[@ref-cline-hooks-list][@ref-cline-hooks-list-sort][@ref-cline-hooks-blocking]

多个命令的控制用 `mergeHookControls` 合并：`cancel`/`review` 取或，`context`/`cancelReason` 用换行拼接，`overrideInput` 后者覆盖前者；一个命令取消并不会阻止同一事件里后续命令继续跑，只有合并结果才决定是否阻断。[@ref-cline-hooks-merge-control]

跨层（配置层、插件层、文件 hook 层）用 `mergeAgentHooks` 顺序合并，附加上下文用空行拼接；若某层返回 `stop: true`，合并立刻返回，后续层不再为该轮执行。[@ref-cline-hooks-layer-merge]

超时：blocking 的 `tool_call`/`tool_result` 默认 120000 毫秒，超时对该子进程发 `SIGKILL` 并丢弃它的控制输出；detached 的 hook 只被观察（默认 30000 毫秒观察窗口），不阻塞主流程。[@ref-cline-hooks-tool-timeout][@ref-cline-hooks-sigkill][@ref-cline-hooks-detached-const]

失败不向 agent 传播：超时、解析失败、spawn 失败都只记 warn 日志，操作继续；hook 只能靠返回 `cancel: true` 阻断，不能靠失败阻断。[@ref-cline-hooks-blocking]

**冲突（文档有字段，代码没有）。** `docs/sdk/plugins.mdx` 的「Hook Policies」列出 `mode`、`timeoutMs`、`retries`、`retryDelayMs`、`failureMode`、`maxConcurrency`、`queueLimit`；固定提交的 hooks 代码里只有 `timeoutMs` 存在，其余键（含 `fail_closed`、`hookPaths`）全无实现，CLI 也没有暴露它们的配置面。[@ref-cline-sdk-plugins-doc-policies]

## 生效条件与诊断 {#hooks-conditions}

yolo 模式关闭 CLI 自己的运行时 hook：`createRuntimeHooks({ yolo: true })` 直接返回空 hooks，CLI 在 `-y/--yolo` 时就走这条分支；示例 README 的提示「Hooks are disabled in --yolo mode」与之一致。[@ref-cline-cli-run-agent-hooks][@ref-cline-cli-hook-yolo][@ref-cline-hooks-example-yolo]

但文件 hook 层由配置扩展种类控制：不传 `configExtensions` 时默认包含 `hooks`，所以 yolo 只关掉 CLI 本地那一层，**不自动关掉子进程文件 hook**——这是文档提示没有说明的细节。[@ref-cline-hooks-file-extension]

没有 hook 级别的信任/权限/白名单机制：发现即执行，hook 子进程不受工具批准约束，也不进沙箱；`hookErrorMode`（默认 `ignore`，可设 `throw`）只影响插件/扩展层在进程内 hook 的错误处理。[@ref-cline-hook-error-mode]

诊断：

- `cline config hooks` 打印 `Hook files:` 与每条「文件名 → 事件（路径）」，或 `No hook files found.`；`--json` 输出 `listHookConfigFiles` 的数组。由于它只扫那四个根，`--hooks-dir` 指定的目录不会出现。[@ref-cline-cli-hooks-cmd]
- `cline --verbose` 会把每次派发打印成 `[hook:事件名] 工具名`；JSON 输出模式下则是 `hook_event` 记录。[@ref-cline-cli-hook-invocation]
- 手工调试：`echo '{"tool_call": {...}}' | .cline/hooks/PreToolUse.sh`，stdout 留给 JSON、stderr 留给日志。[@ref-cline-hooks-example-debug]
- 生效时机：文件 hook 的发现发生在会话引导时（构造函数里同步扫描），没有文件监听；新增/修改/删除 hook 文件在**下一次会话**才生效。[@ref-cline-hooks-discovery-ctor]
