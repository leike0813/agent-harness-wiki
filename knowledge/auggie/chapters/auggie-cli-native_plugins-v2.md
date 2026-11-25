---
schema_version: 3
record_kind: production
edition_id: auggie-cli-native_plugins-v2
harness_id: auggie
topic: native_plugins
title: "Auggie CLI 的插件与市场：清单、安装与生命周期（1.x 文档线）"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-about, ref-auggie-repo-marketplace, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-components, ref-auggie-docs-plugins-compat, ref-auggie-1x-plugins-components, ref-auggie-1x-plugins-compat, ref-auggie-1x-reference-plugins]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-folder, ref-auggie-docs-plugins-marketplace-manifest, ref-auggie-docs-plugins-creating, ref-auggie-docs-plugins-components, ref-auggie-repo-plugin-manifest, ref-auggie-docs-plugins-envvars, ref-auggie-repo-plugin-hooks, ref-auggie-1x-plugins-components, ref-auggie-1x-plugins-envvars, ref-auggie-1x-hooks-plugin-roots]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-cli, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-settings, ref-auggie-1x-plugins-cli, ref-auggie-1x-plugins-settings, ref-auggie-1x-reference-plugins, ref-auggie-1x-interactive-slash]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-plugins-manual, ref-auggie-docs-plugins-cli, ref-auggie-docs-plugins-settings, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-components, ref-auggie-repo-changelog, ref-auggie-docs-plugins-compat, ref-auggie-1x-plugins-browser, ref-auggie-1x-plugins-cli, ref-auggie-1x-plugins-settings, ref-auggie-1x-plugins-components, ref-auggie-1x-reference-plugins]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-browser, ref-auggie-docs-plugins-cli, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-1x-plugins-browser, ref-auggie-1x-interactive-slash, ref-auggie-1x-reference-plugins]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-auggie-1x-plugins-components, ref-auggie-1x-plugins-compat, ref-auggie-1x-reference-plugins]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-auggie-1x-plugins-components, ref-auggie-docs-plugins-marketplace-manifest, ref-auggie-docs-plugins-creating]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-auggie-1x-plugins-cli, ref-auggie-1x-plugins-settings, ref-auggie-1x-reference-plugins, ref-auggie-1x-interactive-slash]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-auggie-1x-plugins-browser, ref-auggie-1x-plugins-settings, ref-auggie-1x-plugins-components]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-auggie-1x-plugins-components, ref-auggie-1x-plugins-envvars, ref-auggie-repo-plugin-hooks]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-auggie-1x-plugins-browser, ref-auggie-1x-plugins-cli, ref-auggie-1x-reference-plugins]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-auggie-1x-plugins-browser, ref-auggie-1x-reference-plugins, ref-auggie-docs-reference-diagnostics]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档 “Plugins and Marketplaces” 页、CLI 参考页与 Interactive 页（页顶标注 1.x 文档线），以及官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff` 的示例市场。文档快照的 `version_applicability` 仍为 `unknown`，不证明任何具体 npm 版本；0.x 的市场自动更新、推荐市场与 CLI 安装命令保留在原 v1 edition 与旧引用中。

## 插件的定位与关系 {#plugins-model}

1.x 的固定来源是官方文档站 “Plugins and Marketplaces” 页、CLI 参考页与 Interactive 页，以及官方仓库的示例市场。[@ref-auggie-1x-plugins-components]

插件是 Auggie 的扩展包格式，通过 **marketplace** 分发，而 marketplace 就是“包含一组插件的 Git 仓库”。1.x 的插件可提供五类组件：custom commands、subagents、hooks、skills、MCP server 配置。0.x 页面列出的 `rules/` 组件在 1.x 组件清单中不再出现（示例目录已改为 `skills/`）。[@ref-auggie-1x-plugins-components]

因此插件与其它机制的关系是“打包与分发层”，而不是并列的运行时：

| 关系 | 说明 |
| :-- | :-- |
| 与 Skill | 插件的 `skills/` 目录下每个 Skill 仍按 agentskills.io 规范书写 [@ref-auggie-1x-plugins-components] |
| 与 MCP server | 插件用 `.mcp.json` 或 `plugin.json` 内的 `mcpServers` 声明 server，连接机制与普通 MCP 相同 [@ref-auggie-1x-plugins-components] |
| 与 Hook | 插件用 `hooks/hooks.json` 注册 hook，事件名与结构同宿主原生配置；插件根可用 `${PLUGIN_ROOT}`、`${CLAUDE_PLUGIN_ROOT}`、`${AUGMENT_PLUGIN_ROOT}` [@ref-auggie-1x-plugins-components] |
| 与 Claude Code 插件 | 文档声明兼容 `.claude-plugin`：目录可识别、`plugin.json` schema 兼容、组件目录布局相同 [@ref-auggie-1x-plugins-compat] |
| 与 pi 扩展 | 1.x 基于 pi；pi 扩展用 `auggie install` 安装（不是 `pi install`），并可用 `--extension`／`--no-extensions` 单次加载或关闭；扩展是第三方代码，运行在用户权限下 [@ref-auggie-1x-reference-plugins] |

官方仓库自己就是一个 marketplace：`.augment-plugin/marketplace.json` 声明市场名 `auggie-marketplace`，列出 `code-review` 与 `warp` 两个插件及其 `source` 相对路径、`category`、`tags`。[@ref-auggie-repo-marketplace]

## 包格式与清单 {#plugins-package}

`.augment-plugin` 是插件与市场的核心配置目录；同时识别 `.claude-plugin` 作为向后兼容。[@ref-auggie-docs-plugins-folder]

| 文件 | 作用 | 关键字段 |
| :-- | :-- | :-- |
| `.augment-plugin/marketplace.json` | 市场清单，列出可用插件 | `name`、`description`、`version`、`plugins[]`（每项含 `name`、`description`、`version`、`source`、`category`、`tags`） [@ref-auggie-docs-plugins-marketplace-manifest] |
| `.augment-plugin/plugin.json` | 单个插件清单 | `name`、`description`、`version`、`author`、`keywords` 等 [@ref-auggie-docs-plugins-creating] |

组件目录布局（1.x 文档示例）：`commands/`、`agents/`、`skills/`、`hooks/`（含 `hooks.json`），以及 `.mcp.json`。[@ref-auggie-1x-plugins-components]

组件命名：`commands/` 下的 markdown 文件名与插件名、市场名组合成命令名。1.x 文档的例子是 `hello.md` 在 `hello-commands` 插件（来自 `my-marketplace`）中生成 `/hello-commands--my-marketplace:hello`；0.x 的 `/plugin-name:hello` 形式属于旧版。[@ref-auggie-1x-plugins-components]

插件根路径通过环境变量注入。1.x 插件页列出 `${AUGMENT_PLUGIN_ROOT}`（插件根目录）、`${AUGGIE_PLUGIN_ROOT}`（别名）与 `${CLAUDE_PLUGIN_ROOT}`（Claude Code 兼容别名），并说明只支持在 hook 命令中使用；1.x hooks 页另列 `${PLUGIN_ROOT}`、`${CLAUDE_PLUGIN_ROOT}`、`${AUGMENT_PLUGIN_ROOT}`。两页的集合不完全一致（插件页没有 `${PLUGIN_ROOT}`），按各自页面记录。[@ref-auggie-1x-plugins-envvars][@ref-auggie-1x-hooks-plugin-roots]

仓库官方 `warp` 插件的 `hooks/hooks.json` 是真实用例：六个事件（`SessionStart`、`Stop`、`Notification`、`PostToolUse`、`PreToolUse`、`PromptSubmit`）各指向 `${AUGMENT_PLUGIN_ROOT}/scripts/` 下的脚本，`Stop` 事件把 metadata 中的 `includeConversationData` 设为 `true`。[@ref-auggie-repo-plugin-hooks]

## 安装、启停与作用域 {#plugins-install}

1.x 的 CLI 入口只剩两条：[@ref-auggie-1x-plugins-cli]

```sh
# Add a marketplace
auggie plugin marketplace add owner/repo

# Load plugins from a local marketplace directory for one run
auggie --plugin-dir /path/to/marketplace
```

插件的启用、停用与查看在交互模式 `/plugins` 中完成；0.x 的 `auggie plugin list`／`install`／`marketplace list/update/remove` 命令在 1.x 插件页不再出现。[@ref-auggie-1x-plugins-cli][@ref-auggie-1x-interactive-slash]

扩展包（pi 扩展）是另一条线：`auggie install SOURCE [-l]`、`auggie remove SOURCE [-l]`、`auggie update [source]`、`auggie list`、`auggie config`，以及单次运行的 `--extension PATH`（`-e`）与 `--no-extensions`。[@ref-auggie-1x-reference-plugins]

作用域相关的设置项：[@ref-auggie-1x-plugins-settings]

| 设置 | 类型与默认 | 文件与作用 |
| :-- | :-- | :-- |
| `enabledPlugins` | 字符串到布尔的映射，默认 `{}` | 任意设置文件（user、project、local）；键形如 `my-plugin@my-marketplace`，值为 `true`／`false` |

0.x 页面还列出 `autoUpdateMarketplaces`（默认 `true`）、`recommendedMarketplaces`（默认 `[]`，仅项目级）、`dismissedMarketplaces`（默认 `[]`，本地级）；1.x 插件页不再描述这三个键，因此不能把它们当作 1.x 的配置面。旧 v1 edition 保留 0.x 说法。[@ref-auggie-docs-plugins-settings]

## 发现、更新与激活 {#plugins-lifecycle}

- **市场与插件来源**：插件从已安装的 marketplace 中发现；`/plugins` 的 Plugins 标签列出可用插件，Marketplace 标签管理已安装市场。[@ref-auggie-1x-plugins-browser]
- **启停**：在 Plugins 标签按 `Space` 启用/停用插件，按 `Enter` 查看详情（含是否启用与加载问题）；状态写入 `enabledPlugins`。[@ref-auggie-1x-plugins-browser][@ref-auggie-1x-plugins-settings]
- **自动更新**：0.x 文档描述交互模式启动时后台 `git pull` 所有市场（15 秒超时、失败静默、成功后通知、更新后清理过期条目）；1.x 插件页不再描述自动市场更新，也没有对应的开关。这条 0.x 行为不能外推到 1.x。[@ref-auggie-docs-plugins-autoupdate][@ref-auggie-1x-plugins-browser]
- **状态区分**：已安装市场（`/plugins` Marketplace 标签）／市场中的可用插件（Plugins 标签）／已启用插件（`enabledPlugins`）／加载错误（Errors 标签）；0.x 的 `plugin marketplace list`／`plugin list` 命令属于旧版。[@ref-auggie-1x-plugins-browser][@ref-auggie-1x-plugins-cli]
- **加载与冲突（partial）**：文档给出组件命名用插件名与市场名拼接、`enabledPlugins` 可在任意层设置，但没有给出插件加载顺序、依赖解析或同名插件的冲突规则。[@ref-auggie-1x-plugins-components][@ref-auggie-1x-plugins-settings]
- **兼容性**：市场可以只包含 Claude Code 格式插件（文档给出 `anthropics/skills` 的例子），安装后按同一套目录结构加载。[@ref-auggie-1x-plugins-compat]
- **扩展风险**：1.x 文档明确扩展是第三方代码，运行在用户权限下，可读文件、运行命令并发送数据；Augment 不审查或支持第三方扩展。[@ref-auggie-1x-reference-plugins]

**缺口**：版本固定、依赖解析、插件加载顺序与市场更新策略在 1.x 页面中没有描述。[@ref-auggie-1x-plugins-browser][@ref-auggie-repo-changelog]

## 诊断 {#plugins-diagnostics}

- `/plugins` 打开插件浏览器，1.x 有三个标签页：**Plugins**（可用插件，`Space` 启停，`Enter` 查看详情与加载问题）、**Marketplace**（已安装市场，添加市场、浏览插件）、**Errors**（加载市场与插件时发现的问题）。[@ref-auggie-1x-plugins-browser]
- 命令行查询：1.x 插件页只给出 `auggie plugin marketplace add` 与 `--plugin-dir`；插件列表与启停状态以 `/plugins` 为准。[@ref-auggie-1x-plugins-cli][@ref-auggie-1x-interactive-slash]
- 扩展包：`auggie list` 列出已安装扩展，`auggie config` 启停扩展资源。[@ref-auggie-1x-reference-plugins]
- **缺口（partial）**：版本查询、依赖缺失、清单解析失败的专用文本入口在 1.x 页面中没有描述；Errors 标签与通用 `--log-level debug` 日志（日志文件位置见故障排查页）是可用的观察手段。[@ref-auggie-1x-plugins-browser][@ref-auggie-docs-reference-diagnostics][@ref-auggie-docs-logs-path]
