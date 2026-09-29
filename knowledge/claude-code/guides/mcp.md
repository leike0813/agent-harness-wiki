---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-mcp
coverage_ref: coverage-claude-code-mcp
claim_refs: []
title: Claude Code 的 MCP 范围
---

归档 MCP 页把安装范围分成 local（`~/.claude.json` 中的当前项目项）、project（仓库 `.mcp.json`）和 user（`~/.claude.json`）；还分别写了 `claude mcp add --transport http|sse|stdio`、`list`、`get` 与 `/mcp`。其中 project server 另有交互式批准步骤。页面对“Added”与“Connected/Needs authentication/Failed to connect”的区分很重要：写入配置不等于握手成功。

页面也包含按特定版本引入的传输和状态细节，不能不加筛选地归给 `2.1.283`。目前精确包主入口未在隔离集里启动，没有 server 连接记录，也没有已接受的范围/传输 Claim。下一轮先修复隔离制品启动条件，再以本地无副作用 stdio server 分别记录添加、批准、握手和列举；SSE/HTTP 需另测。见 MCP 页面快照（`snapshot-claude-code-mcp-doc`）及 npm 包快照（`snapshot-claude-code-npm`）。
