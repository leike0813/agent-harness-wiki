---
schema_version: 3
record_kind: production
edition_id: bob-cli-native_plugins-v2
harness_id: bob
topic: native_plugins
title: "Bob Shell 的原生插件：公开文档未建立的机制"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-bob-config-schema, ref-bob-config-schema-json, ref-bob-tools-groups, ref-bob-home-caps, ref-bob-home-extensions]
  - section_id: plugins-extension-surfaces
    surface_ids: [cli]
    source_refs: [ref-bob-skills-locations, ref-bob-mcp-global-path, ref-bob-mcp-oauth-scope, ref-bob-slash-custom, ref-bob-modes-project-yaml, ref-bob-hooks-scopes, ref-bob-acp-flow]
  - section_id: plugins-editor-integration
    surface_ids: [cli]
    source_refs: [ref-bob-ts-ide-companion, ref-bob-acp-flow]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-slash-builtin, ref-bob-hooks-manage, ref-bob-ts-debug, ref-bob-slash-custom]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-scope
        status: unknown
        source_refs: [ref-bob-home-caps, ref-bob-home-extensions]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-scope
        status: unknown
        source_refs: [ref-bob-home-extensions, ref-bob-config-schema]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-extension-surfaces
        status: unknown
        source_refs: [ref-bob-skills-locations, ref-bob-mcp-global-path]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-extension-surfaces
        status: unknown
        source_refs: [ref-bob-modes-project-yaml, ref-bob-hooks-scopes]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-scope
        status: unknown
        source_refs: [ref-bob-tools-groups, ref-bob-home-extensions]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-extension-surfaces
        status: unknown
        source_refs: [ref-bob-slash-custom, ref-bob-acp-flow]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: unknown
        source_refs: [ref-bob-slash-builtin, ref-bob-hooks-manage]
---

## 调查结论与检查过的入口 {#plugins-scope}

在 IBM 公开的 Bob Shell 文档中找不到“原生插件”机制：没有插件包格式、清单文件、安装命令、插件 API、加载顺序或插件状态查询的说明。已检查的入口包括：

- 文档导航与站点 sitemap 中 `/docs/shell` 下的全部页面（安装、配置、功能、核心概念、账号、安全、故障排查、changelog）。
- 设置文件 schema 的全部键：只有 `session`、`logging`、`tasks`、`telemetry`，没有 plugins/extensions 段落。[@ref-bob-config-schema][@ref-bob-config-schema-json]
- 工具分组表，它枚举了 Bob Shell 内置的能力面，其中没有插件相关分组。[@ref-bob-tools-groups]
- 文档对扩展能力的正式表述：custom modes、slash commands、MCP、ACP，以及能力清单页列出的命令、工具与自动化。[@ref-bob-home-caps][@ref-bob-home-extensions]

因此本主题七道固定问题均记为 `unknown`：公开文档没有建立该机制，但仅凭文档缺页也无法排除未公开或 IDE 侧的实现。要确证，需要 IBM 提供插件清单格式、加载器或 API 的官方说明。

## 文档定义的扩展面（插件的替代） {#plugins-extension-surfaces}

Bob Shell 把可扩展点分散在若干第一方机制里，它们各有自己的目录、格式与生效方式，而不是统一的插件包：

| 扩展面 | 载体 | 作用域 |
| :-- | :-- | :-- |
| Skills | 项目 `.bob/skills/`、全局 `~/.bob/skills/` 下的 `SKILL.md` | 项目 / 全局 [@ref-bob-skills-locations] |
| MCP server | 项目 `.bob/mcp.json`；全局路径两页不一致，MCP 页写 `~/.bob/settings/mcp.json`、OAuth 页写 `~/.bob/mcp_settings.json` | 全局 / 项目 [@ref-bob-mcp-global-path][@ref-bob-mcp-oauth-scope] |
| 自定义斜杠命令 | 项目 `.bob/commands/`、全局 `~/.bob/commands/` 的 markdown 文件 | 项目 / 全局 [@ref-bob-slash-custom] |
| 自定义模式 | 项目 `.bob/custom_modes.yaml`、全局 `~/.bob/custom_modes.yaml` | 项目 / 全局 [@ref-bob-modes-project-yaml] |
| 生命周期钩子 | settings 的 `hooks` 键，全局与工作区两个 settings 文件 | 全局 / 工作区 [@ref-bob-hooks-scopes] |
| ACP | `bob acp` 把 Bob Shell 暴露为 ACP server 供编辑器连接 | 会话级 [@ref-bob-acp-flow] |

这些机制的“安装”都是往上述路径放文件或写配置项，没有插件注册表、版本锁定或依赖解析的概念。文档也没有定义它们之间的加载顺序（只有各自的作用域优先级）。MCP 全局路径的分歧及其版本边界见 MCP 主题的 “配置入口与作用域”。

## 编辑器侧集成不是插件机制 {#plugins-editor-integration}

容易被误认为“Bob 插件”的是 Bob Shell Companion：Troubleshooting 页把它描述为 IDE 侧的扩展，未安装或未启用时 Bob Shell 报无法连接 IDE，修复方式是安装并启用该扩展、在项目目录下启动 Bob Shell，再运行 `/ide enable`。[@ref-bob-ts-ide-companion] 该扩展由编辑器托管，Bob Shell 只与其建立端口连接，不会把第三方代码加载进自己；这与 ACP 属于同一类“集成方向”，都不是在 Bob Shell 内注册扩展。[@ref-bob-acp-flow]

## 状态与诊断 {#plugins-diagnostics}

没有可供查询的插件版本或插件运行状态；每个扩展面各有自己的诊断入口：

- `/mcp` 查看 MCP server 状态，`/hooks` 查看 hook 的发现与启用状态，`/skills` 插入 Skill 引用。[@ref-bob-slash-builtin][@ref-bob-hooks-manage]
- 全局开关是日志：`--log-level debug` 或 `BOB_LOG_LEVEL=debug` 输出详细日志，可用来观察扩展面是否被读取。[@ref-bob-ts-debug]
- 斜杠命令本身没有列表校验命令；自定义命令目录 `.bob/commands/` 或 `~/.bob/commands/` 中的文件按文件名成为命令名，出错时只能依赖命令菜单是否出现来判断。[@ref-bob-slash-custom]

也没有独立于这些机制之外的“插件健康度”或兼容性检查入口；公开文档未提供。
