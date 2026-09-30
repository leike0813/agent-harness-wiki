---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-hooks
coverage_ref: coverage-codex-cli-hooks
claim_refs: []
title: Codex CLI 的 Hooks 调查
---

归档配置参考的 `features.hooks` 条目指向 `hooks.json` 或 `config.toml` 内的 `[hooks]`；`hooks.{Event}` 列 `PreToolUse`、`PostToolUse`、`SessionStart` 等事件，handler 说明又把 command/MCP tool 与“解析但跳过”的 prompt/agent 类型分开。可见即使某种 handler 出现在 schema 中，也不能直接推断会执行。

该页面未声明适用于 `@openai/codex@0.157.1`；本轮没有读取精确包的事件派发代码，也未触发 hook。补证应先确认构建版本与开关解析，再用无副作用的命令 hook 观察一个事件、失败返回及重载。当前不列“该版本支持的事件清单”，也不给未经验证的配置模板。来源是 配置页快照（`snapshot-codex-cli-configuration-doc`）约 420、480–510 行；Coverage `partial`。
