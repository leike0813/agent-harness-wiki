---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-custom-agents
coverage_ref: coverage-claude-code-custom-agents
claim_refs: []
title: Claude Code 的自定义 agent
---

归档 MCP 页约 `1017–1031` 行明确提到来自 `~/.claude/agents/`、项目 `.claude/agents/`、额外目录或 `--agents` 的 agent 文件，并说其中内联 MCP server 受所在目录的信任状态影响。这给出一个有用的边界：agent 定义文件被找到，与它声明的 MCP server 被允许装载，是两件事。设置页的 `settings.json` 又属于整体配置，不等于 agent 定义文件。

这些网页未标明 `@anthropic-ai/claude-code@2.1.283` 的完整 agent frontmatter 或覆盖规则；当前精确包也未运行。下一轮应固定可执行制品，放入一个不带 MCP 的最小 agent，再分别检查发现、调用和带内联 server 时的信任提示。现在不能给本版的可用 agent 模板或 `supported` Claim。来源见 MCP 页面快照（`snapshot-claude-code-mcp-doc`）与 设置页快照（`snapshot-claude-code-configuration-doc`）。
