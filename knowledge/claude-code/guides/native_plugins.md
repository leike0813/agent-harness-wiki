---
schema_version: 1
record_kind: production
guide_id: guide-claude-code-native-plugins
coverage_ref: coverage-claude-code-native-plugins
claim_refs: []
title: Claude Code 的插件状态
---

归档 MCP 页有插件提供 server 的单独章节，说明这类 server 随已启用插件而来，并可在 `/mcp` 中识别来源；设置页讨论 `enabledPlugins`、项目信任与配置范围。这意味着排查插件 MCP 时要先问插件是否被安装、项目是否允许、插件是否启用，然后才看 server 连接；一个失败的 MCP 状态也不能直接归因于插件未安装。

这些网页没有精确绑定 `@anthropic-ai/claude-code@2.1.283`，本轮隔离包主入口还是提示桩，未安装插件或记录健康状态。下一轮先建立可运行制品，再对固定插件分别收集安装清单、信任/启用状态、插件资源发现与 `/mcp` 连接状态。当前本章不能声称原生插件可用或某个 server healthy。来源见 MCP 页面快照（`snapshot-claude-code-mcp-doc`）与 设置页快照（`snapshot-claude-code-configuration-doc`）。
