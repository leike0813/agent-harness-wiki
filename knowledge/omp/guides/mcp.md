---
schema_version: 1
record_kind: production
guide_id: guide-omp-mcp
coverage_ref: coverage-omp-mcp
claim_refs: []
title: OMP 的 MCP 管理器
---

MCP 在此包中有完整的可追入口，而不只是一个名称：`src/mcp/config.ts` 与 `settings.ts` 处理配置，`loader.ts` / `manager.ts` 管理 server，`transports/stdio.ts`、`http.ts`、`sse.ts` 分别实现传输；`src/discovery/mcp-json.ts` 是另一条文件发现路径。调查时必须先查清**目标配置走哪条 loader**，否则读到某个传输类并不能证明该设置会调用它。

本轮未记录一份被解析的 server 配置，更没有启动、握手、工具列举或健康状态；暂无已接受的字段或传输 Claim。补证宜用无外部网络的最小 stdio server，逐步记录配置源、manager 状态、工具列举及断开后的诊断。材料属于 精确 npm 包快照（`snapshot-omp-npm`）；Coverage `partial` 是调查未闭合，不表示仅有部分 MCP 功能。
