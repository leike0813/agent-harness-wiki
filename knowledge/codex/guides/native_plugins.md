---
schema_version: 1
record_kind: production
guide_id: guide-codex-cli-native-plugins
coverage_ref: coverage-codex-cli-native-plugins
claim_refs: []
title: Codex CLI 的插件与打包扩展
---

归档 Skills 页把插件列为分发 Skills 的途径；MCP 页另有“Plugin-provided MCP servers”，描述插件 manifest 中携带 server、用户配置按插件名开关。配置参考出现 `plugins.{plugin}.enabled` 与插件 server 工具过滤字段。它们提示插件不只是“复制一个 Skill”，可能同时有安装、信任、启用、server 启动等阶段。

但这些页面都没有给 `@openai/codex@0.157.1` 的版本承诺，包内 README 也未提供对应入口；没有任何插件的运行观察。下一步先核对发行构建是否包含这些 manifest 和加载器，再用固定的最小插件逐段记录发现、启用与实际工具调用。当前不能给该精确包写安装命令或声称某插件 healthy。材料为 Skills（`snapshot-codex-cli-skills-doc`）、MCP（`snapshot-codex-cli-mcp-doc`）与 配置（`snapshot-codex-cli-configuration-doc`）快照。
