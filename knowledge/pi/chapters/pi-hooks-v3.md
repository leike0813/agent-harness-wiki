---
schema_version: 3
record_kind: production
edition_id: pi-hooks-v3
harness_id: pi
topic: hooks
title: Pi 扩展事件：注册、输入输出与顺序（固定源码 8369268）
sections:
  - section_id: hooks-events
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-doc-events
      - ref-pi-ext-doc-run-phases
      - ref-pi-ext-doc-run-order
  - section_id: hooks-entry
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-doc-example
      - ref-pi-ext-doc-lifecycle
      - ref-pi-ext-doc-project-trust-event
      - ref-pi-config-trust-protected
  - section_id: hooks-input
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-doc-transform-events
      - ref-pi-ext-doc-user-bash
  - section_id: hooks-output
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-doc-transform-events
      - ref-pi-ext-doc-errors
  - section_id: hooks-order
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-doc-events
  - section_id: hooks-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-ext-doc-errors
      - ref-pi-ext-doc-lifecycle
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-events
        status: answered
        source_refs:
          - ref-pi-ext-doc-events
          - ref-pi-ext-doc-run-phases
          - ref-pi-ext-doc-run-order
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs:
          - ref-pi-ext-doc-example
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-input
        status: partial
        source_refs:
          - ref-pi-ext-doc-transform-events
          - ref-pi-ext-doc-user-bash
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-output
        status: partial
        source_refs:
          - ref-pi-ext-doc-transform-events
          - ref-pi-ext-doc-errors
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-order
        status: answered
        source_refs:
          - ref-pi-ext-doc-events
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-entry
        status: answered
        source_refs:
          - ref-pi-ext-doc-project-trust-event
          - ref-pi-config-trust-protected
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-diagnostics
        status: answered
        source_refs:
          - ref-pi-ext-doc-errors
          - ref-pi-ext-doc-lifecycle
---
固定来源为 pi 仓库提交 83692682 的 Pi coding agent 包（`packages/coding-agent/docs/extensions.md`）。相对 pi-hooks-v2 有两处更正：示例代码的包名已从 `@mariozechner/pi-coding-agent` 改为 `@earendil-works/pi-coding-agent`，且项目信任已存在，扩展可以在信任判定阶段参与。本章取代 v2 的对应结论；v2 中未被本章重写的逐事件字段清单仍按其固定来源范围阅读。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 第一方事件 {#hooks-events}

Pi 只有扩展这一条事件来源。处理器按扩展加载与注册顺序运行，`pi.on()` 返回一个取消该次注册的函数，事件类别覆盖资源发现、会话、agent 与消息生命周期、provider、工具和原始输入。[@ref-pi-ext-doc-events] 一次运行的走向是：输入与 `before_agent_start`，经过模型、消息与工具事件，到 `agent_end`；自动重试、恢复、压缩或排队工作可以在此后继续。[@ref-pi-ext-doc-run-phases] `agent_before_settle` 是最后一个可动作边界，可以追加条目并请求一次续跑，`agent_settled` 是终态且仅通知。[@ref-pi-ext-doc-run-order] v2 记录的事件序列在当前来源下仍成立，`agent_before_settle`、`agent_settled` 是新增的可判定收尾点。

## 注册扩展与启用条件 {#hooks-entry}

扩展导出接收 `ExtensionAPI` 的工厂并在工厂里注册回调；当前固定来源的类型导入包名已变：

```typescript
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerCommand("hello", {
    description: "Show a greeting",
    handler: async (name, ctx) => {
      ctx.ui.notify(`Hello, ${name || "world"}!`, "info");
    },
  });
}
```

[@ref-pi-ext-doc-example] 自动发现位置与 settings 引入方式见 v2，仍按其固定来源范围阅读。生命周期上，工厂可以同步也可以异步，Pi 会等待异步工厂完成再继续启动；不要在工厂里启动进程、套接字、watcher 或定时器，因为有些调用只加载扩展而不启动会话，长期资源应从 `session_start` 或需要它的命令／工具启动，会话级资源在幂等的 `session_shutdown` 里关闭。[@ref-pi-ext-doc-lifecycle] 相对 v2 记录的“核心没有权限弹窗”不再成立：项目信任存在，且 `project_trust` 事件在项目扩展加载之前运行，只有个人级与显式命令行扩展能参与。[@ref-pi-ext-doc-project-trust-event][@ref-pi-config-trust-protected] `/reload` 会替换扩展运行时，`await ctx.reload()` 之后的代码不能复用旧运行时状态。[@ref-pi-ext-doc-project-trust-event]

## 回调输入 {#hooks-input}

`message_end` 的处理器可以替换已定稿的消息并保留其角色，`tool_call` 可以改写输入或阻断执行，`tool_result` 的处理器按链组合、每个处理器都看到前一个的改动。[@ref-pi-ext-doc-transform-events] `user_bash` 处理器返回 `undefined` 时命令交给下一个处理器，都不处理才落到本地执行；返回 `operations` 或 `result` 停止传播，处理器失败则阻断命令而不回落到本地执行。[@ref-pi-ext-doc-user-bash] 逐事件的完整字段契约需读文档导出的事件声明，本章未逐一登记。[@ref-pi-ext-doc-events]

## 返回值与作用 {#hooks-output}

返回值的语义因事件而异，应按各事件声明的返回类型使用，而不是假定每个返回值都有效。[@ref-pi-ext-doc-events] `tool_call` 处理器失败会作为 fail-safe 阻断该工具，工具执行失败则变成给模型的错误结果。[@ref-pi-ext-doc-errors] `before_agent_start` 应尽量改提示片段、工具选择或指南，让 Pi 追加一段 transcript delta；返回 `systemPrompt` 或设置 `forceSystemPrompt` 会替换整段提示，但 transcript 仍按结构化片段记录。[@ref-pi-ext-doc-transform-events] 最小阻断示例：

```typescript
pi.on("tool_call", async (event) => {
  if (event.toolName === "bash") {
    return { block: true, reason: "blocked by policy" };
  }
});
```

## 顺序与并发 {#hooks-order}

处理器按扩展加载与注册顺序运行，取消注册不影响已在进行的一次派发。[@ref-pi-ext-doc-events] 本固定来源未给出同名事件是否重复触发或统一超时的说明，仍是缺口。

## 诊断与清理 {#hooks-diagnostics}

Pi 报告处理器错误并尽可能继续。[@ref-pi-ext-doc-errors] 即使正常流程已经尝试过清理，也要在 `session_shutdown` 里释放资源。[@ref-pi-ext-doc-lifecycle] 扩展警告的展示位置与单独重载入口，本固定来源未统一说明，仍按 v2 范围阅读。
