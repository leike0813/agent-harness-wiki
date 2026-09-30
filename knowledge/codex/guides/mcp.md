---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-mcp
coverage_ref: coverage-codex-cli-mcp
claim_refs: []
title: Codex CLI 的 MCP 配置边界
---

归档官方 MCP 页的具体调查入口是 `codex mcp add` / `list` / `login`、TUI 的 `/mcp`，以及 `config.toml` 中的 `[mcp_servers.{name}]` 表。页面分开写了 stdio 和 Streamable HTTP server；配置参考还列 `command`、`args`、`url`、`enabled`、超时及工具过滤字段。它们可帮助定位应核对的解析器和诊断入口，但网页没有承诺这些字段属于 `@openai/codex@0.157.1`。

这个 npm 包的 README 未建立网页与二进制版本的对应，调查也没有启动隔离 server。要补成可用配方，先确认发行构建身份，再用本地最小 stdio server 分别检查配置读取、进程启动、握手和工具列举；`list` 中出现名称仍不能证明连接健康。见 MCP 页面快照（`snapshot-codex-cli-mcp-doc`）和 包快照（`snapshot-codex-cli-npm`）。本主题 `partial` 表示证据不全，不表示 MCP 功能只完成一部分。
