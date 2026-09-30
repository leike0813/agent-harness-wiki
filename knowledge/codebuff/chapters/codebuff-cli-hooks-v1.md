---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-hooks-v1
harness_id: codebuff
topic: hooks
title: "Codebuff 的 Hooks：本提交里不存在的生命周期钩子机制"
sections:
  - section_id: hooks-model
    surface_ids: [cli]
    source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-tools-list, ref-codebuff-hooks-runtime, ref-codebuff-hooks-sdk-noop, ref-codebuff-hooks-sdk-run, ref-codebuff-root-toolnames]
  - section_id: hooks-entry-io-order
    surface_ids: [cli]
    source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-hooks-runtime, ref-codebuff-hooks-sdk-noop, ref-codebuff-agentdir-trust, ref-codebuff-cli-flags, ref-codebuff-agent-tools, ref-codebuff-root-toolnames]
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-hooks-sdk-run, ref-codebuff-hooks-sdk-noop, ref-codebuff-cli-logs, ref-codebuff-agentdir-trust-doc]
  - section_id: hooks-alternatives
    surface_ids: [cli]
    source_refs: [ref-codebuff-run-overrides, ref-codebuff-hooks-output-schema, ref-codebuff-agent-tools, ref-codebuff-doc-knowledge-verify, ref-codebuff-knowledge-select, ref-codebuff-hooks-sdk-run, ref-codebuff-hooks-sdk-noop]
  - section_id: hooks-host-callbacks
    surface_ids: [cli]
    source_refs: [ref-codebuff-sdk-host-callbacks, ref-codebuff-cli-steering, ref-codebuff-hooks-tool-params]
  - section_id: hooks-implementation-points
    surface_ids: [cli]
    source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-hooks-output-schema, ref-codebuff-tools-list, ref-codebuff-hooks-runtime, ref-codebuff-hooks-sdk-noop, ref-codebuff-hooks-sdk-run, ref-codebuff-run-overrides]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-model
        status: not_applicable
        source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-hooks-sdk-run]
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-io-order
        status: not_applicable
        source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-agentdir-trust, ref-codebuff-cli-flags]
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-io-order
        status: not_applicable
        source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-hooks-sdk-noop]
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-io-order
        status: not_applicable
        source_refs: [ref-codebuff-hooks-tool-params, ref-codebuff-hooks-runtime]
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-io-order
        status: not_applicable
        source_refs: [ref-codebuff-hooks-tool-params]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry-io-order
        status: not_applicable
        source_refs: [ref-codebuff-agentdir-trust, ref-codebuff-root-toolnames, ref-codebuff-agent-tools]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs: [ref-codebuff-hooks-sdk-run, ref-codebuff-hooks-sdk-noop, ref-codebuff-cli-logs, ref-codebuff-agentdir-trust-doc]
---

## 固定来源与"钩子"在本产品里的实际形态 {#hooks-model}

本章固定来源是仓库 `CodebuffAI/codebuff` @ `639e3f3c7a96658035d008e935398417843067fc` 的
工具定义与 SDK 实现，以及文档站快照。检索范围包括 `common/src/tools/`（工具参数定义与工具名清
单）、`packages/agent-runtime/src/tools/handlers/`（运行时处理函数）、`sdk/src/tools/`、
`sdk/src/run.ts`（SDK 的工具分发）与 `cli/src/`（CLI 侧实现）。结论是：**本提交没有第一方生命
周期 Hook 机制**——没有可配置的事件列表、没有 hook 注册文件（如 `hooks.json`）、没有 matcher、
退出码语义或超时约定。与 "hook" 有关的只有下面这一个工具契约。

**hooks.events**：固定来源里没有"事件"清单可供配置。唯一带 hook 语义的对象是
`run_file_change_hooks` 工具：它在工具参数里被描述为"后端请求客户端运行其配置的 file change
hooks（测试、lint、类型检查），客户端只运行 `filePattern` 命中这些文件的 hook"
[@ref-codebuff-hooks-tool-params]。该工具出现在工具名清单里 [@ref-codebuff-tools-list]，运行时的处理函数
只是把整次工具调用转交给宿主 client 的 `requestClientToolCall` [@ref-codebuff-hooks-runtime]。

SDK 侧的实现是显式 no-op：返回"File change hooks are not supported in the SDK environment"
的错误消息 [@ref-codebuff-hooks-sdk-noop]；`sdk/src/run.ts` 的工具分发对
`run_file_change_hooks` 返回"File change hooks are not supported in SDK mode"
[@ref-codebuff-hooks-sdk-run]。在 `cli/src` 中检索 `run_file_change_hooks`、`hookName` 与
`hooks.json` 均无实现；主线根 agent（`base2` 一族）的 `toolNames` 里也没有这个工具
[@ref-codebuff-root-toolnames]。因此这一条按 not_applicable 阅读：机制不存在，来源给出的只是工具契约
[@ref-codebuff-hooks-tool-params][@ref-codebuff-hooks-sdk-run]。

## 配置入口、输入输出与顺序 {#hooks-entry-io-order}

**hooks.entry**：没有配置入口。固定来源中没有任何文件、字段或 CLI 参数用于注册 hook；仓库内的
`.agents` 信任门与 `--trust-agents`/`CODEBUFF_TRUST_AGENT_DIRS=1` 只作用于 agent 定义文件与
`mcp.json`，与 hook 无关 [@ref-codebuff-agentdir-trust][@ref-codebuff-cli-flags]。按 not_applicable 阅读
[@ref-codebuff-hooks-tool-params]。

**hooks.input / hooks.output**：既然没有可注册的 hook，也就没有回调输入、环境变量、工作目录或
退出码约定。固定来源能确认的只有工具契约的一端：模型调用该工具时提交
`{"files": [...]}` 形式的文件路径数组，期望返回一个数组，元素要么是带 `hookName` 的终端命令输出，
要么是 `errorMessage` [@ref-codebuff-hooks-tool-params]。这条契约的"执行方"（客户端 hook 运行器）
在 SDK 中不存在 [@ref-codebuff-hooks-sdk-noop]。两条都按 not_applicable 阅读
[@ref-codebuff-hooks-tool-params][@ref-codebuff-hooks-runtime]。

**hooks.order / hooks.conditions**：没有 hook 列表，也就没有顺序、并发、重复触发、超时或失败
处理规则；没有启用状态、权限或沙箱开关作用于 hook [@ref-codebuff-hooks-tool-params]
[@ref-codebuff-agentdir-trust]。工具本身能不能被模型调用，取决于该 agent 的 `toolNames` 是否包含
`run_file_change_hooks`——它是一份普通工具而非可配置机制，内置根 agent 并未启用它
[@ref-codebuff-root-toolnames][@ref-codebuff-agent-tools]。这两条按 not_applicable 阅读。

## 可观察结果与生效时机 {#hooks-diagnostics}

**hooks.diagnostics**：因为没有 hook 可被发现、匹配或执行，能观察到的只有工具被调用时的返回：
SDK 路径回答"File change hooks are not supported in SDK mode"（`sdk/src/run.ts`）或
"File change hooks are not supported in the SDK environment"（`sdk/src/tools/`）
[@ref-codebuff-hooks-sdk-run][@ref-codebuff-hooks-sdk-noop]。工具调用与其它工具一样会写进每会话日志
（项目 `debug/` 与每会话目录下的 `log.jsonl`，`--clear-logs` 可清理）
[@ref-codebuff-cli-logs]。仓库 `.agents` 内容（agent 文件、`mcp.json`）的生效时机是"下次启动且通过
信任门"，非交互运行则跳过，这条规则同样适用于任何未来的 hook 实现所在目录
[@ref-codebuff-agentdir-trust-doc]。缺口：没有"hook 是否被发现/匹配/执行"的独立诊断输出，也没有
配置热重载入口。按 partial 阅读 [@ref-codebuff-hooks-sdk-run]。

## 与其它扩展机制的边界 {#hooks-alternatives}

想把"改完文件自动跑校验"接进 Codebuff 的读者，本产品里现成的做法是别的机制，而不是钩子。
文档站建议把校验命令写进项目知识文件（"Post-Change Verification" 一节给出
`npm run typecheck`、`npm test` 这类示例），由 Codebuff 在改动后运行
[@ref-codebuff-doc-knowledge-verify]；项目知识文件按目录挑选一份注入每轮上下文
[@ref-codebuff-knowledge-select]；真正执行命令的是 agent 的 `run_terminal_command` 工具，它是普通
工具而非钩子 [@ref-codebuff-agent-tools]。

框架层面，"由宿主实现的工具"是这个代码库里的常规做法：SDK 的 `CodebuffClient`/`run()` 接受
`overrideTools`（按工具名替换实现）与 `customToolDefinitions`（宿主自定义工具）
[@ref-codebuff-run-overrides]。`run_file_change_hooks` 的工具契约本来就是为这种宿主实现留的口子——
输出模式是"终端命令输出 + `hookName`"或"`errorMessage`"组成的数组
[@ref-codebuff-hooks-output-schema]——但本提交的 SDK 与 CLI 都没有把它接上，所以对 CLI 用户而言它
仍不可用 [@ref-codebuff-hooks-sdk-run][@ref-codebuff-hooks-sdk-noop]。想做这件事只能自建宿主，或改用
上面的知识文件 + 终端命令组合 [@ref-codebuff-doc-knowledge-verify]。

## SDK 层的宿主回调（不是用户可配置的 Hook） {#hooks-host-callbacks}

需要区分"Hook"与"宿主回调"：SDK 的 `run()` 接受若干由宿主程序传入的回调，它们在固定时点被调用，
但只能由写代码的嵌入方提供，没有配置文件、作用域、matcher 或过滤规则。可确证的有：
`drainSteeringMessages` 在每个 agent 步骤边界被排空，返回的消息会作为用户消息追加进对话（用于向
正在运行的 agent 注入指令），`onStateSnapshot` 在 run 开始时以及运行期间周期性收到可持久化的
RunState 快照（进程被杀时不丢当前回合）[@ref-codebuff-sdk-host-callbacks]。CLI 自己就是这些回调的
使用者：它用一个进程内缓冲实现 steering 排空，在每步边界把用户中途输入交给运行中的 agent
[@ref-codebuff-cli-steering]。把它当成"钩子机制"会误导读者——它们既不能在配置里声明，也不面向文件
变更事件，更不提供退出码或阻断语义 [@ref-codebuff-sdk-host-callbacks][@ref-codebuff-hooks-tool-params]。

## 若要自己把它接起来：实现点清单 {#hooks-implementation-points}

本章把工具契约的每个实现点落到文件与符号，便于读者核对"到底缺哪一环"：

- 工具名与参数：`common/src/tools/params/tool/run-file-change-hooks.ts` 定义 `toolName`、
  `endsAgentStep: true`、输入 `files: string[]` 与输出联合类型
  [@ref-codebuff-hooks-tool-params][@ref-codebuff-hooks-output-schema]。
- 工具注册：`common/src/tools/list.ts` 把该参数对象放进工具表，运行时
  `packages/agent-runtime/src/tools/handlers/list.ts` 把它映射到
  `handleRunFileChangeHooks` [@ref-codebuff-tools-list][@ref-codebuff-hooks-runtime]。
- 运行时行为：处理函数只做一件事——把整次调用转交宿主的 `requestClientToolCall`
  [@ref-codebuff-hooks-runtime]。
- SDK 默认实现：显式返回"不支持"的 `errorMessage`，两条路径各有一处
  [@ref-codebuff-hooks-sdk-noop][@ref-codebuff-hooks-sdk-run]。
- 宿主替代实现：SDK 的 `overrideTools` 是按工具名替换实现的官方口子，可以实现这个工具；本提交的 CLI
  没有使用它，因此对 CLI 用户不可用 [@ref-codebuff-run-overrides][@ref-codebuff-hooks-sdk-run]。

读者据此可以判断：缺的不是工具定义，而是客户端侧的 hook 配置模型（文件、matcher、执行与结果约定）
[@ref-codebuff-hooks-tool-params]。
