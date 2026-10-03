---
schema_version: 3
record_kind: production
edition_id: omp-hooks-v3
harness_id: omp
topic: hooks
title: OMP Hook 发现、事件与执行
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-events-surfaces-doc-69e8
      - ref-omp-hooks-agent-events-doc-69e8
      - ref-omp-hooks-tool-doc-69e8
  - section_id: hooks-location
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-discovery-doc-69e8
  - section_id: hooks-module
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-discovery-doc-69e8
      - ref-omp-hooks-status-doc-69e8
      - ref-omp-hooks-tool-doc-69e8
  - section_id: hooks-execution
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-tool-doc-69e8
      - ref-omp-hooks-order-doc-69e8
  - section_id: hooks-conditions
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-status-doc-69e8
      - ref-omp-hooks-discovery-doc-69e8
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-order-doc-69e8
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs:
          - ref-omp-hooks-events-surfaces-doc-69e8
          - ref-omp-hooks-agent-events-doc-69e8
          - ref-omp-hooks-tool-doc-69e8
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-location
        status: answered
        source_refs:
          - ref-omp-hooks-discovery-doc-69e8
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-module
        status: partial
        source_refs:
          - ref-omp-hooks-tool-doc-69e8
          - ref-omp-hooks-discovery-doc-69e8
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-execution
        status: answered
        source_refs:
          - ref-omp-hooks-tool-doc-69e8
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-execution
        status: answered
        source_refs:
          - ref-omp-hooks-order-doc-69e8
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-conditions
        status: answered
        source_refs:
          - ref-omp-hooks-status-doc-69e8
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: partial
        source_refs:
          - ref-omp-hooks-order-doc-69e8
---
本章材料来自源码修订 69e8c9e 的官方文档 `docs/hooks.md`；上一版引用的 npm 包内 `src/extensibility/hooks/types.ts` 与 `src/extensibility/hooks/runner.ts` 不在本轮取证范围内。事件全集、发现位置、工具事件、handler 顺序与运行时状态都取自该修订的文档正文，“Event surfaces” 一节本身就枚举了 session、agent/context 与 tool 三组事件，因此事件清单不再依赖包内类型文件。相对上一版的变化是实质性的：`tool_result` 的合并语义从“后者覆盖”改为按字段合并并新增 `additionalContext`。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有实际放置 Hook 并观察执行，所以本节描述的是文档定义的机制。

## Hook 事件范围 {#hooks-events}

`docs/hooks.md` 的 “Event surfaces” 一节按三组枚举了第一方事件全集，并声明这些事件在 `types.ts` 里是强类型。下面的清单即该节内容，不依赖上一版引用的包内类型文件。 [@ref-omp-hooks-events-surfaces-doc-69e8]

会话事件一组：`session_start`、`session_before_switch`、`session_switch`、`session_before_branch`、`session_branch`、`session_before_compact`、`session.compacting`、`session_compact`、`session_before_tree`、`session_tree`、`session_shutdown`。 [@ref-omp-hooks-events-surfaces-doc-69e8]

Agent/上下文事件一组：`context`、`before_agent_start`、`agent_start`、`agent_end`、`turn_start`、`turn_end`、`auto_compaction_start`、`auto_compaction_end`、`auto_retry_start`、`auto_retry_end`、`ttsr_triggered`、`todo_reminder`。 [@ref-omp-hooks-agent-events-doc-69e8]

事件名本身不说明时点，文档给出的触发时点来自各事件的可返回字段：带 `before_` 前缀的会话事件是取消点（可返回 `cancel`，`session_before_branch` 另可返回 `skipConversationRestore`，`session_before_compact` 另可返回 `compaction`，`session_before_tree` 另可返回 `summary`），对应的不带前缀事件是动作已发生后的通知。 [@ref-omp-hooks-events-surfaces-doc-69e8]

`session_before_branch` 与 `session_branch` 都带 `reason`，它决定 `session_before_branch.entryId` 的含义：`"branch"`（`branch(entryId)`、`/branch`）指被回退的用户消息，它及其后内容都被丢弃；`"fork"`（`AgentSession.fork(entryId)`、带 `entryId` 的 RPC `fork`）与 `"btw"`（`/btw` 提升）指新会话中保留的最后一条 entry。 [@ref-omp-hooks-events-surfaces-doc-69e8]

工具类事件有两条。`tool_call` 是执行前事件，可以返回 `block`、`reason`、`input`（`Record` 键值对象）与 `additionalContext` 四个可选字段。`tool_result` 是执行后事件，可以返回 `{ content?; details?; isError?; additionalContext?: string }`。 [@ref-omp-hooks-tool-doc-69e8]

还有一批宿主桥接调用不产生这两个事件：eval prelude 里的 `browser.open(...)`、直接的 `BrowserTab` helper、`tab.run(...)`、直接的 `computer` helper 以及 `computer.run(fnOrCode, options)` 属于宿主桥调用而不是 AgentTool 调用。 [@ref-omp-hooks-tool-doc-69e8]

## 发现位置 {#hooks-location}

开启 ambient 发现时，会话通过扩展运行器加载由 `hookCapability` 发现的 JS/TS hook 工厂。`discoverExtensionPaths(configuredPaths, cwd, disabledExtensionIds?, options?)` 按序做四件事：只从原生 provider 加载扩展模块；从 hook 能力注册表加载可导入的 `.ts`/`.js` 工厂（除非 `includeAmbientHooks: false`）；追加已启用的插件扩展入口；解析显式配置的文件与目录。路径按绝对路径去重。 [@ref-omp-hooks-discovery-doc-69e8]

原生 provider 在每个配置根只扫描两个子目录：项目作用域的 `.omp/hooks/pre` 与 `.omp/hooks/post`，用户作用域的 `hooks/pre` 与 `hooks/post`（默认 `~/.omp/agent/hooks/...`，随 profile 与 `PI_CODING_AGENT_DIR` 变化）。直接放在 `hooks` 根的工厂不会被发现。 [@ref-omp-hooks-discovery-doc-69e8]

一个能生效与一个不能生效的布局对比：

```text
.omp/hooks/
  pre/
    guard.ts        # discovered
  post/
    audit.ts        # discovered
  guard.ts          # not discovered: needs pre/ or post/
```

目录名与文件基名只提供能力元数据与去重键，不构成自动事件注册——工厂仍必须自己调用 `pi.on(...)`。这与 `.claude/hooks/pre|post/` 一致。 [@ref-omp-hooks-discovery-doc-69e8]

## Hook 模块与输入 {#hooks-module}

当前默认 CLI 运行时走扩展运行器路径，所以被发现的工厂拿到的是 `ExtensionAPI` / `ExtensionContext`，不是 `HookAPI` / `HookContext`。共享的 `pi.on(...)` handler 照常工作，但旧名不会被补齐：扩展里要用 `ctx.hasPendingMessages()`，旧版的 `ctx.hasQueuedMessages()` 没有 shim。 [@ref-omp-hooks-status-doc-69e8]

模块形态也有约束：hook 工厂按 配置的模块解析器解析后导入，且默认导出必须是一个工厂函数，因此一个只导出若干辅助函数的模块会被记为加载失败。 [@ref-omp-hooks-discovery-doc-69e8]

工具事件的输入有一处容易误解的限制：返回的 `input` 不作用于 provider 原生的 `computer` 调用，因为那个事件输入是合成视图而不是执行参数；`edit` 的事件输入还可能带派生的 `path`/`paths` 字段，它们用于策略检查，不一定构成合法的执行参数。 [@ref-omp-hooks-tool-doc-69e8]

在正常的扩展运行器路径里，模型发起的 `tool_call` 发生在参数准备阶段，早于调度、`tool_execution_start` 与审批；替换后的输入会被重新校验，并成为展示、持久化与实际执行的调用，审批也针对修订后的输入评估。这与文档另行描述的独立 `HookToolWrapper` 路径不同。 [@ref-omp-hooks-tool-doc-69e8]

## 执行顺序与输出 {#hooks-execution}

`tool_call` 的行为是：任一 handler 返回 `{ block: true }` 就抛错阻止执行；否则正常执行底层工具，成功时 `tool_result` handler 可以覆写 `{ content, details }` 并附加被动的 `additionalContext`，失败时发出 `tool_result(isError=true)`、投递返回的 `additionalContext`，然后重新抛出原始错误。 [@ref-omp-hooks-tool-doc-69e8]

`HookRunner` 内的顺序由注册序决定，先 hooks 数组顺序，再每个 hook/事件的 handler 注册顺序。冲突行为按事件类型不同，本版逐条写明：`tool_call` 上每个互不相同的非空 `additionalContext` 按 handler 顺序保留（与同一调用中较早 handler 相同的值、以及与同批次较早调用相同的合并上下文会被丢弃），`input` 是后写覆盖，首个 block 短路并丢弃该调用已收集的上下文，handler 互相看不到对方的 input 修订。 [@ref-omp-hooks-order-doc-69e8]

`tool_result` 上 `content`/`details`/`isError` 的覆写按字段跨 handler 合并且不短路：较晚 handler 定义了的字段胜出，未设置的字段保留较早 handler 的值，因此只返回 details、只标记 isError 或只返回上下文都不会抹掉更早的脱敏；每个互不相同的非空 `additionalContext` 同样按顺序保留。其余事件：`context` 串接并把前一 handler 的消息输出交给下一个；`before_agent_start` 保留第一条返回的消息；`session_before_*` 跟踪最新结果且 `cancel: true` 立即短路；`session.compacting` 最新结果胜出。 [@ref-omp-hooks-order-doc-69e8]

命令与渲染器的冲突规则也定了：`getCommand(name)` 返回首个匹配，`getMessageRenderer(customType)` 返回首个匹配，`getRegisteredCommands()` 返回全部命令且不去重。 [@ref-omp-hooks-order-doc-69e8]

## 生效条件 {#hooks-conditions}

当前启动流程里 `--hook` 被当作 `--extension` 的别名，CLI 路径并入 `additionalExtensionPaths`；经 `hookCapability` 发现的 JS/TS 工厂作为扩展模块加载，其 `pi.on(...)` handler 绑定到运行时事件总线；工具由 `ExtensionToolWrapper` 而不是 `HookToolWrapper` 包装，上下文变换与生命周期发出都经过 `ExtensionRunner`。 [@ref-omp-hooks-status-doc-69e8]

发现本身也有开关：`ambient: false` 时跳过原生与已安装发现，但显式配置的包根仍可贡献 hook 工厂。外来的用户级来源需要经 `enabledProviders` 显式开启，项目级来源不受这条用户级门控影响。 [@ref-omp-hooks-discovery-doc-69e8]

## 诊断缺口 {#hooks-diagnostics}

可确证的诊断抓手是合并规则本身：`tool_result` 上的多次脱敏不会互相抹除，而 `tool_call` 上首个 `block: true` 会让该调用已收集的上下文全部作废，因此“上下文没送达”可能来自短路而不是 handler 缺失。上下文与命令冲突也可以按“首个匹配”解释为什么拿到的是另一处注册的实现。 [@ref-omp-hooks-order-doc-69e8]

缺口：错误如何上报、发现失败如何查询、以及配置改动何时生效，本轮没有在文档中取证，属明确缺口。 [@ref-omp-hooks-status-doc-69e8]
