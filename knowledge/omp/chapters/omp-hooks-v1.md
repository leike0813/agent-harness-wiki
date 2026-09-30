---
schema_version: 3
record_kind: production
edition_id: omp-hooks-v1
harness_id: omp
topic: hooks
title: OMP Hook 机制
sections:
  - section_id: hooks-model
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-events-code
  - section_id: hooks-config
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-discovery-doc
      - ref-omp-hooks-status-doc
  - section_id: hooks-exec
    surface_ids: [cli]
    source_refs:
      - ref-omp-hooks-module-doc
      - ref-omp-hooks-runner-code
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [cli]
        section_id: hooks-model
        status: answered
        source_refs:
          - ref-omp-hooks-events-code
  - question_id: hooks.entry
    answers:
      - surface_ids: [cli]
        section_id: hooks-config
        status: answered
        source_refs:
          - ref-omp-hooks-discovery-doc
  - question_id: hooks.input
    answers:
      - surface_ids: [cli]
        section_id: hooks-exec
        status: partial
        source_refs:
          - ref-omp-hooks-module-doc
  - question_id: hooks.output
    answers:
      - surface_ids: [cli]
        section_id: hooks-exec
        status: partial
        source_refs:
          - ref-omp-hooks-runner-code
  - question_id: hooks.order
    answers:
      - surface_ids: [cli]
        section_id: hooks-exec
        status: answered
        source_refs:
          - ref-omp-hooks-runner-code
  - question_id: hooks.conditions
    answers:
      - surface_ids: [cli]
        section_id: hooks-config
        status: answered
        source_refs:
          - ref-omp-hooks-status-doc
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: hooks-exec
        status: partial
        source_refs:
          - ref-omp-hooks-runner-code
---
## Hook 事件 {#hooks-model}

**hooks.events**：`HookEvent` 联合了会话事件（session 前缀）、context、before_agent_start、agent_start 与 agent_end、turn_start 与 turn_end、自动压缩、自动重试、tool_call 与 tool_result 等事件；订阅方式是 `pi.on(event, handler)`。同名事件是否另有插件来源本章未区分。 [@ref-omp-hooks-events-code]

## Hook 入口与条件 {#hooks-config}

**hooks.entry**：原生发现只扫描每个配置根的 hooks/pre 与 hooks/post 子目录（项目 `.omp/hooks/pre`、`.omp/hooks/post`，用户 agentDir 下同名目录）；直接放在 hooks 根的工厂不会被发现，也不报错。 [@ref-omp-hooks-discovery-doc]

**hooks.conditions**：当前 CLI 运行时走扩展运行器路径：--hook 是 --extension 的别名，经 hookCapability 发现的 JS/TS 工厂作为扩展模块加载，其 pi.on 绑定到运行事件总线。因此扩展启用状态与信任会改变生效范围。 [@ref-omp-hooks-status-doc]

## Hook 执行与诊断 {#hooks-exec}

**hooks.input**：工厂用 `pi.on(event, handler)` 收到事件对象与上下文；运行时动作包括 pi.exec、pi.sendMessage、pi.appendEntry、pi.registerCommand、pi.registerMessageRenderer。各事件的字段形状与敏感内容处理本章未逐项列出，属部分结论。 [@ref-omp-hooks-module-doc]

**hooks.output**：`runner.emit` 捕获 handler 返回值；对 session before_* 事件，返回结果可携带取消（result.cancel 为真时立即返回），tool_result 与 session.compacting 的结果也被捕获。 [@ref-omp-hooks-runner-code]

**hooks.order**：同一事件按 hook 顺序、hook 内 handler 顺序依次 await；每个 handler 在 try/catch 中执行，抛错经 emitError 上报而不中断其余 handler。超时设置本章未取证。 [@ref-omp-hooks-runner-code]

**hooks.diagnostics**：错误经 emitError 分发给错误监听器，可按 hook 路径与事件名定位。配置改动何时生效、发现失败如何查询未在源码中取证，属明确缺口。 [@ref-omp-hooks-runner-code]
