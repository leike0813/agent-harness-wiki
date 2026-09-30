---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-custom-agents
coverage_ref: coverage-codex-cli-custom-agents
claim_refs: []
title: Codex CLI 的自定义 agent 定义
---

归档配置参考的 `agents` 段列 `agents.enabled`、并发数、默认子代理模型，以及 `agents.{name}.description` 和 `agents.{name}.config_file`。这说明网页上的“自定义角色”是 TOML 配置入口，而 `approvals_reviewer` 的 reviewer subagent 是审批机制，不应被误读成任意自定义 agent 的定义格式。参考中的 `AGENTS.md` 又是项目指令文件，含义不同。

这些网页条目未绑定 `@openai/codex@0.157.1` 原生二进制。本库尚未确认该包识别 `agents.{name}`、如何读取角色配置文件、何时实际 spawn，因此不给用户 agent 模板或 `supported` Claim。补证要从精确构建的配置解析器出发，再在隔离环境声明一个名称唯一的角色，检查列表/调用与错误诊断。材料见 配置页快照（`snapshot-codex-cli-configuration-doc`）；当前 Coverage `partial`。
