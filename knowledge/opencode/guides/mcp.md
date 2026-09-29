---
schema_version: 1
record_kind: production
guide_id: guide-opencode-mcp
coverage_ref: coverage-opencode-mcp
claim_refs: []
title: OpenCode 的 MCP server
---

固定源码的 `mcp-servers.mdx:70–126` 把本地 server 写作 `mcp.{name}`，以 `type: "local"` 和命令数组描述进程；`:130–163` 把远程 server 写作 `type: "remote"` 与 URL，并列出 headers、OAuth、timeout 等字段。`:282–295` 又给出鉴权状态与管理入口。排查失败时应区分 JSON 被读取、本地命令能启动、远程端点可访问、MCP 工具真正列出四步。

这些是 固定源码快照（`snapshot-opencode-repo`）里的文档规则。npm Target `1.18.32` 是独立的二进制制品，现有记录未证明它由这份源码构建，也没有 server 握手日志；因此这里不给该包的可复制配置。先建立制品映射，再用隔离 stdio server 和远程测试端点分别验证解析、连接及错误诊断。Coverage `partial`，没有 `unsupported` 结论。
