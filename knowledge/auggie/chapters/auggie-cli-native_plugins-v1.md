---
schema_version: 3
record_kind: production
edition_id: auggie-cli-native_plugins-v1
harness_id: auggie
topic: native_plugins
title: "Auggie CLI 的插件与市场：清单、安装与生命周期"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-about, ref-auggie-repo-marketplace, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-components, ref-auggie-docs-plugins-compat]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-folder, ref-auggie-docs-plugins-marketplace-manifest, ref-auggie-docs-plugins-creating, ref-auggie-docs-plugins-components, ref-auggie-repo-plugin-manifest, ref-auggie-docs-plugins-envvars, ref-auggie-repo-plugin-hooks]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-cli, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-settings, ref-auggie-docs-plugins-recommended]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-plugins-manual, ref-auggie-docs-plugins-cli, ref-auggie-docs-plugins-settings, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-components, ref-auggie-repo-changelog, ref-auggie-docs-plugins-compat]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-plugins-browser, ref-auggie-docs-plugins-cli, ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-settings, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-auggie-docs-plugins-about, ref-auggie-docs-plugins-components, ref-auggie-docs-plugins-compat]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-auggie-docs-plugins-folder, ref-auggie-docs-plugins-marketplace-manifest, ref-auggie-docs-plugins-creating, ref-auggie-repo-plugin-manifest]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-auggie-docs-plugins-cli, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-settings, ref-auggie-docs-plugins-recommended]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-plugins-settings, ref-auggie-docs-plugins-components, ref-auggie-repo-changelog]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-auggie-docs-plugins-components, ref-auggie-docs-plugins-envvars, ref-auggie-repo-plugin-hooks]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-auggie-docs-plugins-cli, ref-auggie-docs-plugins-settings, ref-auggie-docs-reference-plugins, ref-auggie-docs-plugins-autoupdate]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-auggie-docs-plugins-browser, ref-auggie-docs-plugins-cli, ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path]
---

## 插件的定位与关系 {#plugins-model}

固定来源是官方文档站 “Plugins and Marketplaces” 页、官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff`（其中 `.augment-plugin/marketplace.json` 与 `plugin_marketplace/` 是官方自带的真实市场与两个插件），以及 CLI 参考页与 CHANGELOG。[@ref-auggie-docs-plugins-about][@ref-auggie-repo-marketplace][@ref-auggie-docs-reference-plugins]

插件是 Auggie 的扩展包格式，通过 **marketplace** 分发，而 marketplace 就是“包含一组插件的 Git 仓库”。一个插件可以同时提供六类组件：custom commands、subagents、rules、hooks、skills、MCP server 配置。[@ref-auggie-docs-plugins-about]

因此插件与其它机制的关系是“打包与分发层”，而不是并列的运行时：

| 关系 | 说明 |
| :-- | :-- |
| 与 Skill | 插件的 `skills/` 目录下每个 Skill 仍按 agentskills.io 规范书写，目录名即调用名 [@ref-auggie-docs-plugins-components] |
| 与 MCP server | 插件用 `.mcp.json` 或 `plugin.json` 内的 `mcpServers` 声明 server，连接机制与普通 MCP 相同 [@ref-auggie-docs-plugins-components] |
| 与 Hook | 插件用 `hooks/hooks.json` 注册 hook，事件名与结构同宿主原生配置 [@ref-auggie-docs-plugins-components] |
| 与 Claude Code 插件 | 文档声明兼容 `.claude-plugin`：目录可识别、`plugin.json` schema 兼容、组件目录布局相同，可直接安装 Claude Code 插件市场 [@ref-auggie-docs-plugins-compat] |

官方仓库自己就是一个 marketplace：`.augment-plugin/marketplace.json` 声明市场名 `auggie-marketplace`，列出 `code-review` 与 `warp` 两个插件及其 `source` 相对路径、`category`、`tags`。[@ref-auggie-repo-marketplace]

## 包格式与清单 {#plugins-package}

`.augment-plugin` 是插件与市场的核心配置目录；同时识别 `.claude-plugin` 作为向后兼容。[@ref-auggie-docs-plugins-folder]

| 文件 | 作用 | 关键字段 |
| :-- | :-- | :-- |
| `.augment-plugin/marketplace.json` | 市场清单，列出可用插件 | `name`、`description`、`version`、`author`、`homepage`、`repository`、`plugins[]`（每项含 `name`、`description`、`version`、`source`、`category`、`tags`） [@ref-auggie-docs-plugins-marketplace-manifest] |
| `.augment-plugin/plugin.json` | 单个插件清单 | `name`、`description`、`version`、`author`、`keywords` 等 [@ref-auggie-docs-plugins-creating] |

组件目录布局（文档示例）：`commands/`、`agents/`、`rules/`、`hooks/`（含 `hooks.json`）、`skills/`，以及 `.mcp.json`。[@ref-auggie-docs-plugins-components]

一个完整市场的目录形态（文档 “Creating a Marketplace” 与 “Example: Complete Marketplace Repository”）：[@ref-auggie-docs-plugins-creating]

```text
my-marketplace/
  .augment-plugin/marketplace.json
  plugins/
    hello-commands/  (.augment-plugin/plugin.json + commands/hello.md)
    code-guard/      (.augment-plugin/plugin.json + hooks/hooks.json + hooks/check.py)
    full-example/    (commands/ agents/ rules/ hooks/ .mcp.json)
  README.md
```

仓库中官方插件 `plugin_marketplace/code-review/.augment-plugin/plugin.json` 的完整内容（清单字段实例）：[@ref-auggie-repo-plugin-manifest]

```json
{
  "name": "code-review",
  "description": "Code review commands and agents for local code reviews",
  "version": "1.0.0",
  "author": { "name": "Augment Code" },
  "keywords": ["code-review", "git", "commands", "agents"]
}
```

组件命名与扩展点：`commands/` 下的 markdown 文件名成为命令名，插件命令带命名空间前缀（`hello.md` → `/plugin-name:hello`）；`agents/` 下的 markdown 提供 subagent；`rules/` 下的 markdown 提供规则；`hooks/hooks.json` 注册 hook；`skills/` 提供 Skill；MCP 用 `.mcp.json` 或 `plugin.json`。插件根路径通过环境变量注入：`${AUGMENT_PLUGIN_ROOT}`，别名 `${AUGGIE_PLUGIN_ROOT}` 与 `${CLAUDE_PLUGIN_ROOT}`；文档明确它们支持用在 hook 命令里。[@ref-auggie-docs-plugins-components][@ref-auggie-docs-plugins-envvars]

仓库官方 `warp` 插件的 `hooks/hooks.json` 是这套机制的真实用例：六个事件（`SessionStart`、`Stop`、`Notification`、`PostToolUse`、`PreToolUse`、`PromptSubmit`）各指向 `${AUGMENT_PLUGIN_ROOT}/scripts/` 下的脚本，`Stop` 事件还把 metadata 中的 `includeConversationData` 设为 `true`。[@ref-auggie-repo-plugin-hooks]

## 安装、启停与作用域 {#plugins-install}

命令（文档 “CLI Commands” 与 CLI 参考页一致）：[@ref-auggie-docs-plugins-cli][@ref-auggie-docs-reference-plugins]

```sh
auggie plugin marketplace add owner/repo
auggie plugin marketplace list
auggie plugin marketplace update [marketplace-name]
auggie plugin marketplace remove marketplace-name

auggie plugin list
auggie plugin install plugin-name@marketplace-name
auggie plugin install plugin-name@marketplace-name --disable
auggie plugin install plugin-name@marketplace-name --project
auggie plugin install plugin-name@marketplace-name --local
```

作用域相关的设置项：[@ref-auggie-docs-plugins-settings]

| 设置 | 类型与默认 | 文件与作用 |
| :-- | :-- | :-- |
| `autoUpdateMarketplaces` | 布尔，默认 `true` | 用户级设置文件；控制交互模式启动时后台自动更新市场，可在 `/plugins` 的市场标签页切换 |
| `recommendedMarketplaces` | 字符串数组，默认 `[]` | **仅项目级**（工作区根的 `.augment/settings.json`），用户与本地设置中的值被忽略；格式为 `owner/repo` |
| `dismissedMarketplaces` | 字符串数组，默认 `[]` | 工作区根的 `.augment/settings.local.json`，由 Auggie 自动维护（用户选择跳过后写入） |
| `enabledPlugins` | 字符串到布尔的映射，默认 `{}` | 任意层设置文件，跨层深合并；键形如 `my-plugin@my-marketplace`，值为 `true`／`false` |

开发期可绕过市场用 `--plugin-dir` 从本地目录加载插件（可重复）。插件命令只在账号启用了插件市场功能时可用。[@ref-auggie-docs-reference-plugins]

团队推荐流程：项目在 `.augment/settings.json` 写 `recommendedMarketplaces`，成员打开工作区并完成索引后会看到安装提示；安装推荐的 marketplaces 后，项目 `enabledPlugins` 中列出的插件会自动启用。[@ref-auggie-docs-plugins-recommended]

## 发现、更新与激活 {#plugins-lifecycle}

- **自动更新**：默认在交互模式启动时后台 `git pull` 所有已安装市场，15 秒全局超时保证不拖慢启动；失败只写日志不提示；成功后通知用户；更新后会清理过期插件条目。开关默认开启，组织管理设置文件时可能显示 `(locked)`。[@ref-auggie-docs-plugins-autoupdate]
- **手动更新**：`auggie plugin marketplace update`（全部）或带市场名（单个）。[@ref-auggie-docs-plugins-manual]
- **状态区分**：已安装的市场（`plugin marketplace list`）／市场中的可用插件（`plugin list`）／已启用插件（`enabledPlugins` 与 `/plugins` 的 Enabled Plugins 标签）／被账号功能开关限制（命令可用性）。[@ref-auggie-docs-plugins-cli][@ref-auggie-docs-plugins-settings][@ref-auggie-docs-reference-plugins]
- **加载与冲突（partial）**：文档说明市场更新后清理过期条目、`enabledPlugins` 跨层深合并，以及组件命名用 `plugin-name:` 前缀避免与内置命令冲突；但没有给出插件加载顺序、依赖解析或同名插件的冲突规则。CHANGELOG 记录过“全局 host rebuild 后已移除的 server 可能复现”等修复，说明存在跨插件的状态重建，具体顺序仍无文档。[@ref-auggie-docs-plugins-components][@ref-auggie-repo-changelog]
- **兼容性**：市场可以只包含 Claude Code 格式插件（文档给出 `anthropics/skills` 的例子），安装后按同一套目录结构加载。[@ref-auggie-docs-plugins-compat]

## 诊断 {#plugins-diagnostics}

- `/plugins` 打开插件浏览器，两个标签页：**Marketplaces**（查看／添加／更新／移除市场，切换自动更新，浏览市场内插件）与 **Enabled Plugins**（查看已启用插件及其 commands、agents、rules、hooks、MCP servers）。[@ref-auggie-docs-plugins-browser]
- 命令行查询：`auggie plugin marketplace list`、`auggie plugin list`；自动更新失败是静默的（只写日志），需要靠观察市场内容是否更新来判断。[@ref-auggie-docs-plugins-cli][@ref-auggie-docs-plugins-autoupdate]
- 启停：`auggie plugin install` 加 `--disable` 参数（参数值是 插件名@市场名），或直接改 `enabledPlugins` 的布尔值。[@ref-auggie-docs-reference-plugins][@ref-auggie-docs-plugins-settings]
- **缺口（partial）**：版本查询、依赖缺失、清单解析失败或兼容性错误的专用诊断入口在固定来源中没有描述；可用的通用手段只有 `--log-level debug` 日志（日志文件位置见故障排查页）。[@ref-auggie-docs-reference-diagnostics][@ref-auggie-docs-logs-path]
