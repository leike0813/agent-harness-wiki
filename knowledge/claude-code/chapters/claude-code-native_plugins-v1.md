---
schema_version: 2
record_kind: production
edition_id: claude-code-native_plugins-v1
harness_id: claude-code
topic: native_plugins
title: Claude Code 的原生插件模型与生命周期
sections:
  - section_id: plugins-model
    source_refs:
      - ref-cc-skills-locations
      - ref-cc-agents-plugin
      - ref-cc-mcp-pluginservers
      - ref-cc-plugins-marketplace
  - section_id: plugins-install
    source_refs:
      - ref-cc-config-cloud
      - ref-cc-config-troubleshoot
      - ref-cc-plugins-marketplace
      - ref-cc-plugins-uninstall
      - ref-cc-skills-livechange
  - section_id: plugins-api
    source_refs:
      - ref-cc-mcp-pluginservers
      - ref-cc-skills-livechange
      - ref-cc-skills-diagnostics
      - ref-cc-plugins-eval
      - ref-cc-npm-readme
questions:
  - question_id: plugins.model
    section_id: plugins-model
    status: partial
    source_refs:
      - ref-cc-skills-locations
      - ref-cc-agents-plugin
      - ref-cc-mcp-pluginservers
  - question_id: plugins.package
    section_id: plugins-model
    status: partial
    source_refs:
      - ref-cc-agents-plugin
      - ref-cc-plugins-marketplace
  - question_id: plugins.install
    section_id: plugins-install
    status: partial
    source_refs:
      - ref-cc-config-cloud
      - ref-cc-config-troubleshoot
      - ref-cc-plugins-marketplace
      - ref-cc-plugins-uninstall
  - question_id: plugins.discovery
    section_id: plugins-install
    status: partial
    source_refs:
      - ref-cc-skills-livechange
  - question_id: plugins.api
    section_id: plugins-api
    status: partial
    source_refs:
      - ref-cc-mcp-pluginservers
  - question_id: plugins.lifecycle
    section_id: plugins-api
    status: partial
    source_refs:
      - ref-cc-mcp-pluginservers
      - ref-cc-skills-livechange
  - question_id: plugins.diagnostics
    section_id: plugins-api
    status: partial
    source_refs:
      - ref-cc-skills-diagnostics
      - ref-cc-plugins-eval
---

## 插件模型与包格式 {#plugins-model}

固定来源没有插件专页，插件结论来自 Skills、MCP 与设置三页的旁述，故本章标记为 partial。

**plugins.model**：插件是宿主原生的扩展单位，一个插件可以打包 skills、agents、hooks 与 MCP servers；给一个技能目录加上 `.claude-plugin/plugin.json` 就能让它作为插件加载，并因此能携带 agents、hooks 和 MCP servers。它与 Skill 的关系是包含关系（插件内的 skill 是组件之一），与 MCP server、Hook 脚本的关系是“插件可携带这些组件”。 [@ref-cc-skills-locations] [@ref-cc-agents-plugin] [@ref-cc-mcp-pluginservers]

**plugins.package**：插件清单是 `.claude-plugin/plugin.json`，插件根或清单内联处也可写 MCP server 定义；插件来自 marketplace，以 name@marketplace 形式标识与安装。清单的完整第一方字段、入口点与兼容声明在所引来源中没有给出字段表，属于缺口。 [@ref-cc-agents-plugin] [@ref-cc-plugins-marketplace]

## 安装与发现 {#plugins-install}

**plugins.install**：安装与卸载通过 `/plugin install NAME@MARKETPLACE`、`/plugin marketplace add ...`、`/plugin uninstall NAME@MARKETPLACE` 完成；启用状态记录在设置键 `enabledPlugins`，marketplace 来源记录在 `extraKnownMarketplaces`。这两个键在项目文件中声明的 marketplace 与插件要等信任后才生效，且云会话不加载仓库声明的 marketplace 与插件。 [@ref-cc-config-cloud] [@ref-cc-config-troubleshoot] [@ref-cc-plugins-marketplace] [@ref-cc-plugins-uninstall]

**plugins.discovery**：插件组件的装载由 `/reload-plugins` 触发；对“技能目录同时作为插件”的情形，`hooks/`、`.mcp.json`、`agents/`、`output-styles/` 的改动需要 `/reload-plugins` 才生效，而 SKILL.md 文本可热更新。插件自身的发现、依赖与命名冲突处理规则位于未纳入快照的插件加载页，属于缺口。 [@ref-cc-skills-livechange]

## 扩展点与生命周期 {#plugins-api}

**plugins.api**：插件能注册的能力包括 skills、agents、hooks 与 MCP servers；路径占位符 `${CLAUDE_PLUGIN_ROOT}`、`${CLAUDE_PLUGIN_DATA}`、`${CLAUDE_PROJECT_DIR}` 可按声明的组件替换。插件携带的 MCP 工具以插件名与 server key 组成全限定名（mcp__plugin_ 前缀），server 本身以 plugin:插件名:server名 注册。宿主对插件的 API 与权限边界没有在所引来源中出现。 [@ref-cc-mcp-pluginservers]

**plugins.lifecycle**：需要区分已安装、已启用、已加载几种状态。启用插件时其 MCP server 自动随会话启动连接，启用或禁用后按生效时机连接或断开；曾有连接的远程插件 server 可显示 cached 状态并在首次调用时连接。插件内组件变更需 `/reload-plugins` 或在下次会话生效。插件是否“健康”没有独立的观察入口，只能借助其 server 的 `/mcp` 状态间接判断。 [@ref-cc-mcp-pluginservers] [@ref-cc-skills-livechange]

**plugins.diagnostics**：`/plugin` 管理器提供安装与 Stats 视图；`claude plugin validate` 可校验技能目录（含项目与个人技能目录）；插件技能的触发率可用 `claude plugin eval` 在隔离会话中度量。插件版本与运行状态、依赖或加载错误的专门查询入口未在所引来源中出现。 [@ref-cc-skills-diagnostics] [@ref-cc-plugins-eval]

关于版本：本章所引官方页面均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录版本 2.1.283，包内 README 只指向在线文档，不能据此把上述插件行为固定到该精确版本。 [@ref-cc-npm-readme]
