---
schema_version: 2
record_kind: production
edition_id: codex-cli-hooks-v1
harness_id: codex-cli
topic: hooks
title: "Codex CLI 主题章节：Hooks"
sections:
  - section_id: hooks-events-entry
    source_refs:
      - ref-codex-cli-hooks-events-source
      - ref-codex-cli-hooks-events-config
      - ref-codex-cli-hooks-config
      - ref-codex-cli-hooks-state-source
      - ref-codex-cli-hooks-feature-config
  - section_id: hooks-input-output-order
    source_refs:
      - ref-codex-cli-hooks-handlers-config
      - ref-codex-cli-hooks-async-config
      - ref-codex-cli-hooks-runtime-source
  - section_id: hooks-conditions-diagnostics
    source_refs:
      - ref-codex-cli-hooks-feature-config
      - ref-codex-cli-hooks-managed-config
      - ref-codex-cli-hooks-managed-repo-doc
      - ref-codex-cli-hooks-state-source
questions:
  - question_id: hooks.events
    section_id: hooks-events-entry
    status: answered
    source_refs:
      - ref-codex-cli-hooks-events-source
      - ref-codex-cli-hooks-events-config
  - question_id: hooks.entry
    section_id: hooks-events-entry
    status: answered
    source_refs:
      - ref-codex-cli-hooks-config
      - ref-codex-cli-hooks-state-source
  - question_id: hooks.input
    section_id: hooks-input-output-order
    status: partial
    source_refs:
      - ref-codex-cli-hooks-runtime-source
      - ref-codex-cli-hooks-handlers-config
  - question_id: hooks.output
    section_id: hooks-input-output-order
    status: partial
    source_refs:
      - ref-codex-cli-hooks-handlers-config
  - question_id: hooks.order
    section_id: hooks-input-output-order
    status: partial
    source_refs:
      - ref-codex-cli-hooks-async-config
      - ref-codex-cli-hooks-handlers-config
  - question_id: hooks.conditions
    section_id: hooks-conditions-diagnostics
    status: answered
    source_refs:
      - ref-codex-cli-hooks-feature-config
      - ref-codex-cli-hooks-managed-config
      - ref-codex-cli-hooks-managed-repo-doc
  - question_id: hooks.diagnostics
    section_id: hooks-conditions-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-hooks-managed-config
      - ref-codex-cli-hooks-state-source
---

## 事件与注册入口 {#hooks-events-entry}

本节的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制，不把源码提交或未标版本的文档当作某个已安装包版本的行为。

**hooks.events**：第一方事件共 12 个：`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SessionStart`、`SessionEnd`、`SubagentStart`、`SubagentStop`、`UserPromptSubmit`、`Stop`、`Interrupt`。触发点分别在工具执行前、权限请求、工具执行后、压缩前后、会话开始与结束、子 agent 开始与结束、用户提交提示、停止与中断。未验证项：固定来源提到插件事件，但没有列出插件事件清单。[@ref-codex-cli-hooks-events-source][@ref-codex-cli-hooks-events-config]

**hooks.entry**：Hook 可内联写在 `config.toml` 的 `[hooks]` 表中，也可放在 `hooks.json`；结构是"事件名 → matcher 组数组 → hooks 处理器数组"。状态保存在 `state` 表（`enabled`、`trusted_hash`）。[@ref-codex-cli-hooks-config][@ref-codex-cli-hooks-state-source]

## 输入、输出与顺序 {#hooks-input-output-order}

**hooks.input**：源码 `run_pre_tool_use_hooks` 为 `PreToolUse` 构造请求，包含 `session_id`、`turn_id`、子 agent 上下文、`cwd`、工具名与工具输入；文档说明工具名是序列化到 hook stdin 的规范名。状态 partial：固定来源没有说明敏感内容如何从输入中过滤或脱敏。[@ref-codex-cli-hooks-runtime-source][@ref-codex-cli-hooks-handlers-config]

**hooks.output**：可用的处理器类型是 command 与 MCP tool；`prompt` 与 `agent` 处理器会被解析但跳过。状态 partial：导出、退出码或返回值如何继续、修改或阻断操作，细节在 Hooks 指南，不在本 change 的固定来源内，故只确认到处理器类型与跳过行为。[@ref-codex-cli-hooks-handlers-config]

**hooks.order**：`async` 让 command hook 在后台运行、不阻塞触发操作（默认 `false`），`SessionEnd` 始终同步；`additionalContextLimit` 默认 `2500`，设为 `0` 时把完整上下文直接交给模型。状态 partial：多个 hook 之间的顺序、并发、重复触发、超时与失败处理未在固定来源中说明。[@ref-codex-cli-hooks-async-config][@ref-codex-cli-hooks-handlers-config]

## 生效条件与诊断 {#hooks-conditions-diagnostics}

**hooks.conditions**：`features.hooks` 开关启用从 `hooks.json` 或内联 `[hooks]` 加载的 hook（`features.codex_hooks` 是废弃别名）。管理员可在 `requirements.toml` 设 `allow_managed_hooks_only = true`，忽略用户、项目、会话与插件 hook，只保留 managed hook；该键只在 `requirements.toml` 生效，写在 `config.toml` 不生效，且需要存在 managed hook 目录。[@ref-codex-cli-hooks-feature-config][@ref-codex-cli-hooks-managed-config][@ref-codex-cli-hooks-managed-repo-doc]

**hooks.diagnostics**：状态 partial。可观察项是 managed hook 目录必须是绝对路径且存在，否则不会加载；`state` 表中的 `enabled` 与 `trusted_hash` 可用于判断启用与信任状态。固定来源没有给出查看"哪些 hook 被匹配执行、哪些失败"的专门命令。[@ref-codex-cli-hooks-managed-config][@ref-codex-cli-hooks-state-source]
