---
schema_version: 1
record_kind: production
guide_id: guide-opencode-custom-agents
coverage_ref: coverage-opencode-custom-agents
claim_refs: []
title: OpenCode 的 agent 类型与定义
---

固定源码 `agents.mdx:16–41` 区分 primary agent 与 subagent；`:142–219` 分别示范 JSON 和 Markdown 定义，后者列出项目 `.opencode/agents/`。这两种定义入口不能简单相加：还要看同名项如何合并，以及 subagent 是否允许被任务调用。配置实现入口是 `packages/core/src/config/agent.ts`。

当前 源码快照（`snapshot-opencode-repo`）尚未映射到 `opencode-ai@1.18.32` Linux 二进制，故这些只是源码版本的调查线索，不是 npm Target 的已接受 agent 路径。下一轮先固定构建输入，再用不同名称的两个最小定义分别检查发现、模式和一次调用；重名覆盖需另测。没有实际加载观察时，本章不提供保证可用的 agent 模板。
