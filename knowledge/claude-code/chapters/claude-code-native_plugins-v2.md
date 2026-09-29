---
schema_version: 2
record_kind: production
edition_id: claude-code-native_plugins-v2
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
  - section_id: plugins-lifecycle
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
    section_id: plugins-lifecycle
    status: partial
    source_refs:
      - ref-cc-mcp-pluginservers
  - question_id: plugins.lifecycle
    section_id: plugins-lifecycle
    status: partial
    source_refs:
      - ref-cc-mcp-pluginservers
      - ref-cc-skills-livechange
  - question_id: plugins.diagnostics
    section_id: plugins-lifecycle
    status: partial
    source_refs:
      - ref-cc-skills-diagnostics
      - ref-cc-plugins-eval
---

插件是 Claude Code 的原生扩展单位：一个插件可以打包 skills、agents、hooks 与 MCP servers，从 marketplace 以 `名字@marketplace` 安装。固定快照里没有插件专页，插件结论来自 Skills、MCP 与设置三页的旁述，因此本章整体标记为 partial，清单字段表与插件自身的加载规则只写成缺口。

## 插件模型与包格式 {#plugins-model}

插件是宿主原生的扩展单位，与 Skill 是包含关系：插件内的 skill 是组件之一；它也携带 agents、hooks 与 MCP servers。最直接的判定方式是给一个技能目录加上 `.claude-plugin/plugin.json`，它就会被当作插件加载，插件名形如 `名字@skills-dir`，并因此能带上 agents、hooks 与 MCP servers。 [@ref-cc-skills-locations] [@ref-cc-agents-plugin]

插件包以 marketplace 分发，以 `名字@marketplace` 标识与安装；清单是插件根或技能目录下的 `.claude-plugin/plugin.json`。 [@ref-cc-agents-plugin] [@ref-cc-plugins-marketplace]

插件的 MCP server 有两种写法：在插件根的 `.mcp.json` 里，或在 `plugin.json` 内联。以下取自官方 MCP 页的两个示例，分别演示这两种形态：

```json
{
  "mcpServers": {
    "database-tools": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_URL": "${DB_URL}"
      }
    }
  }
}
```

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"]
    }
  }
}
```

两个文件都放在插件内，字段含义与手写 MCP server 相同：`command` 是可执行文件路径，`args` 是参数数组，`env` 是注入 server 的环境变量。不同之处在于路径占位符：`${CLAUDE_PLUGIN_ROOT}` 解析为插件的安装目录，`${CLAUDE_PLUGIN_DATA}` 解析为插件的持久数据目录，`${CLAUDE_PROJECT_DIR}` 解析为稳定的项目根；替换作用在 stdio 的 `command`、`args`、`env`，以及 http、sse、ws 的 `url`、`headers`、`headersHelper`。启用插件后 Claude Code 自动启动它的 MCP server，插件 server 与手动配置的 server 行为一致。 [@ref-cc-mcp-pluginservers]

清单的完整第一方字段、入口点与兼容声明，在所引来源中没有给出字段表，属于缺口。

## 安装、启用与发现 {#plugins-install}

安装与卸载通过会话命令完成：用 `/plugin marketplace add anthropics/claude-plugins-official` 添加 marketplace，用 `/plugin install 名称@marketplace` 安装，用 `/plugin uninstall 名称@marketplace` 卸载。安装失败时，官方建议按提示区分：marketplace 未找到就先用 `/plugin marketplace add` 添加再重试，插件未找到则检查插件名。 [@ref-cc-plugins-marketplace] [@ref-cc-plugins-uninstall]

启用状态记录在设置键 `enabledPlugins`，marketplace 来源记录在 `extraKnownMarketplaces`。这两个键在项目文件里声明时，要等队友信任该目录后才生效，在信任之前他们看不到该文件声明的 marketplace 插件。 [@ref-cc-config-troubleshoot]

云会话不加载仓库声明的 marketplace 与插件，因此依赖项目插件的配置不会在云会话里生效。 [@ref-cc-config-cloud]

发现与装载方面，插件组件的改动由 `/reload-plugins` 触发：对“技能目录同时作为插件”的情形，`hooks/`、`.mcp.json`、`agents/`、`output-styles/` 的改动需要 `/reload-plugins` 才生效，而 `SKILL.md` 文本可热更新。插件自身的发现、依赖与命名冲突处理规则位于未纳入快照的插件加载页，属于缺口。 [@ref-cc-skills-livechange]

## 扩展点、生命周期与诊断 {#plugins-lifecycle}

插件能注册的能力包括 skills、agents、hooks 与 MCP servers。插件携带的 MCP 工具以插件名与 server key 组成全限定名，完整形式是 `mcp__plugin`、插件名、server 名与工具名，任何在 `A-Z`、`a-z`、`0-9`、下划线与连字符之外的字符都替换为下划线；server 本身以 `plugin:插件名:server名` 注册。在权限规则、Skill 的 `allowed-tools`、子代理的 `tools` 字段或 hook matcher 里引用时要写全名，用裸 server key 写的 matcher 不会命中。 [@ref-cc-mcp-pluginservers]

生命周期上要区分已安装、已启用与已加载。启用插件时其 MCP server 随会话自动启动连接，启用或禁用后按生效时机连接或断开；曾有连接的远程插件 server 可显示 `cached` 状态并在首次调用时连接；重载会保留配置未变的插件 server 的既有连接。插件内组件变更需 `/reload-plugins` 或在下次会话生效。插件是否“健康”没有独立的观察入口，只能借助其 server 在 `/mcp` 的状态间接判断。 [@ref-cc-mcp-pluginservers] [@ref-cc-skills-livechange]

诊断入口方面，`/plugin` 管理器提供安装与 Stats 视图；`claude plugin validate` 可校验技能目录（含项目与个人技能目录），例如 `claude plugin validate .claude/skills`；插件技能的触发率可用 `claude plugin eval` 在隔离会话中度量，它对每个提示在启用与不启用插件两种情况下运行并按你定义或它代写的 grader 打分，低于阈值时以非零退出码结束，便于接入 CI。插件版本与运行状态、依赖或加载错误的专门查询入口未在所引来源中出现，属于缺口。 [@ref-cc-skills-diagnostics] [@ref-cc-plugins-eval]

关于版本：本章所引官方页面均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，包内 README 只指向在线文档，不能据此把上述插件行为固定到该精确版本。 [@ref-cc-npm-readme]
