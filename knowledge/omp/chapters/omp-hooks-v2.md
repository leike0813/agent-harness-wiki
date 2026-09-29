---
schema_version: 2
record_kind: production
edition_id: omp-hooks-v2
harness_id: omp
topic: hooks
title: OMP Hook 发现、事件与执行
sections:
  - section_id: hooks-events
    source_refs:
      - ref-omp-hooks-events-code
  - section_id: hooks-location
    source_refs:
      - ref-omp-hooks-discovery-doc
  - section_id: hooks-module
    source_refs:
      - ref-omp-hooks-module-doc
  - section_id: hooks-execution
    source_refs:
      - ref-omp-hooks-runner-code
  - section_id: hooks-conditions
    source_refs:
      - ref-omp-hooks-status-doc
  - section_id: hooks-diagnostics
    source_refs:
      - ref-omp-hooks-runner-code
questions:
  - question_id: hooks.events
    section_id: hooks-events
    status: answered
    source_refs:
      - ref-omp-hooks-events-code
  - question_id: hooks.entry
    section_id: hooks-location
    status: answered
    source_refs:
      - ref-omp-hooks-discovery-doc
  - question_id: hooks.input
    section_id: hooks-module
    status: partial
    source_refs:
      - ref-omp-hooks-module-doc
  - question_id: hooks.output
    section_id: hooks-execution
    status: partial
    source_refs:
      - ref-omp-hooks-runner-code
  - question_id: hooks.order
    section_id: hooks-execution
    status: answered
    source_refs:
      - ref-omp-hooks-runner-code
  - question_id: hooks.conditions
    section_id: hooks-conditions
    status: answered
    source_refs:
      - ref-omp-hooks-status-doc
  - question_id: hooks.diagnostics
    section_id: hooks-diagnostics
    status: partial
    source_refs:
      - ref-omp-hooks-runner-code
---
本章材料来自源码修订 dff728c 的官方文档 `docs/hooks.md` 与 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内类型与运行器 `src/extensibility/hooks/types.ts` 与 `src/extensibility/hooks/runner.ts`。发现位置、模块形态与运行时状态来自文档，事件联合与派发实现来自包内代码。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证。本轮没有实际放置 Hook 并观察执行，所以本节描述的是文档与源码定义的机制。

## Hook 事件范围 {#hooks-events}

`HookEvent` 把多类事件并成一个联合类型。会话类事件带 `session` 前缀，另有 `context`、`before_agent_start`、`agent_start` 与 `agent_end`、`turn_start` 与 `turn_end`、自动压缩的开始与结束、自动重试的开始与结束、`ttsr_triggered`、`todo_reminder`，以及工具相关的 `tool_call` 与 `tool_result`。订阅方式是在工厂里调用 `pi.on(event, handler)`。 [@ref-omp-hooks-events-code]

同名事件是否另有插件来源，本章未区分；完整事件列表以该类型定义为准。 [@ref-omp-hooks-events-code]

## 发现位置 {#hooks-location}

原生 provider 在每个配置根只扫描两个子目录：项目作用域的 `.omp/hooks/pre` 与 `.omp/hooks/post`，用户作用域的 `hooks/pre` 与 `hooks/post`（默认 `~/.omp/agent/hooks/...`，随 profile 与 `PI_CODING_AGENT_DIR` 变化）。直接放在 `hooks` 根的工厂不会被发现，也不会报错。 [@ref-omp-hooks-discovery-doc]

一个能生效与一个不能生效的布局对比：

```text
.omp/hooks/
  pre/
    guard.ts        # discovered
  post/
    audit.ts        # discovered
  guard.ts          # not discovered: needs pre/ or post/
```

这意味着把工厂文件放错一层就完全不生效，且没有提示；排查时先确认它在 `pre` 或 `post` 子目录里，且扩展名是 `.ts` 或 `.js`。 [@ref-omp-hooks-discovery-doc]

## Hook 模块与输入 {#hooks-module}

Hook 模块默认导出一个工厂函数，工厂里注册事件处理并可使用 `pi.sendMessage`、`pi.appendEntry`、`pi.registerCommand`、`pi.registerMessageRenderer` 与 `pi.exec`。handler 收到事件对象与上下文。 [@ref-omp-hooks-module-doc]

项目作用域的一个阻断示例 `.omp/hooks/pre/guard.ts`：

```ts
import type { HookAPI } from "@oh-my-pi/pi-coding-agent/extensibility/hooks";

export default function hook(pi: HookAPI): void {
  pi.on("tool_call", async (event) => {
    if (
      event.toolName === "bash" &&
      String(event.input.command ?? "").includes("rm -rf")
    ) {
      return { block: true, reason: "blocked by policy" };
    }
  });
}
```

工厂必须默认导出，否则该文件被记为加载错误而跳过。前提是路径落在发现位置；生效结果是该 `tool_call` handler 在每次工具调用前被调用，返回 `block: true` 会阻止本次执行。检查方式是触发一次被匹配的工具调用并观察是否被拦下。 [@ref-omp-hooks-module-doc]

缺口：各事件的字段形状与敏感内容处理本章未逐项列出，属部分结论。 [@ref-omp-hooks-module-doc]

## 执行顺序与输出 {#hooks-execution}

派发按 hook 顺序、hook 内 handler 注册顺序依次 await 每个 handler；每个 handler 都在 try/catch 中执行，抛出的错误经 `emitError` 上报而不会中断其余 handler。 [@ref-omp-hooks-runner-code]

`runner.emit` 会捕获 handler 的返回值。对 `session` 里 `before_` 前缀的事件，返回结果可以携带取消，`result.cancel` 为真时立即停止处理后续 hook；`tool_result` 与 `session.compacting` 的结果也被捕获。 [@ref-omp-hooks-runner-code]

缺口：超时设置、并发行为与「handler 抛出后该工具调用如何收尾」本章未取证，属部分结论。 [@ref-omp-hooks-runner-code]

## 生效条件 {#hooks-conditions}

当前 CLI 运行时走扩展运行器路径：`--hook` 是 `--extension` 的别名，CLI 路径会并入扩展路径；经 `hookCapability` 发现的 JS/TS 工厂作为扩展模块加载，其 `pi.on` 绑定到运行事件总线。因此扩展的启用状态与信任会改变哪些 Hook 真正生效。 [@ref-omp-hooks-status-doc]

## 诊断缺口 {#hooks-diagnostics}

错误经 `emitError` 分发给错误监听器，可按 hook 路径与事件名定位。配置改动何时生效、发现失败如何查询，未在源码中取证，属明确缺口。 [@ref-omp-hooks-runner-code]

