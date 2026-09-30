---
schema_version: 3
record_kind: production
edition_id: cursor-cli-native_plugins-v1
harness_id: cursor
topic: native_plugins
title: "Cursor 原生插件：格式、安装、团队市场、发现、能力边界与诊断"
sections:
  - section_id: native_plugins-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-overview
      - ref-cur-native_plugins-customize-components
      - ref-cur-native_plugins-mcp-oneclick
      - ref-cur-native_plugins-skills-viewing
      - ref-cur-native_plugins-customize-scope
  - section_id: native_plugins-model
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-overview
      - ref-cur-native_plugins-customize-components
      - ref-cur-native_plugins-doc-contains
      - ref-cur-native_plugins-skills-viewing
      - ref-cur-native_plugins-sdk-setting-sources
      - ref-cur-native_plugins-changelog-plugin-hooks
      - ref-cur-native_plugins-doc-standard
      - ref-cur-native_plugins-doc-marketplace
      - ref-cur-native_plugins-doc-canvases
  - section_id: native_plugins-package
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-create-agent
      - ref-cur-native_plugins-doc-create-cursor
      - ref-cur-native_plugins-doc-standard
      - ref-cur-native_plugins-doc-local-test
      - ref-cur-native_plugins-doc-local-imports
      - ref-cur-native_plugins-doc-local-publish
      - ref-cur-native_plugins-skills-repo
  - section_id: native_plugins-install
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-installing
      - ref-cur-native_plugins-doc-install-modes
      - ref-cur-native_plugins-doc-marketplace
      - ref-cur-native_plugins-doc-find-team-marketplace
      - ref-cur-native_plugins-changelog-arrived
      - ref-cur-native_plugins-cli-slash-plugin
      - ref-cur-native_plugins-cli-param-plugin-dir
      - ref-cur-native_plugins-changelog-settings-local
      - ref-cur-native_plugins-changelog-marketplace-cli
      - ref-cur-native_plugins-changelog-marketplace-slash
      - ref-cur-native_plugins-changelog-git-url
  - section_id: native_plugins-update
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-refresh
      - ref-cur-native_plugins-doc-refresh-manifest
      - ref-cur-native_plugins-doc-add-marketplace
      - ref-cur-native_plugins-doc-manage
      - ref-cur-native_plugins-doc-manage-mcp
      - ref-cur-native_plugins-doc-install-modes
      - ref-cur-native_plugins-changelog-settings-local
  - section_id: native_plugins-team
    surface_ids: [cursor]
    source_refs:
      - ref-cur-native_plugins-doc-team-marketplaces
      - ref-cur-native_plugins-doc-team-admin
      - ref-cur-native_plugins-doc-default-marketplace
      - ref-cur-native_plugins-doc-add-marketplace
      - ref-cur-native_plugins-doc-marketplace-access
      - ref-cur-native_plugins-doc-scim
      - ref-cur-native_plugins-doc-allow-publish
      - ref-cur-native_plugins-doc-publish-skill
      - ref-cur-native_plugins-doc-publish-after
      - ref-cur-native_plugins-doc-serve-from-cursor
      - ref-cur-native_plugins-doc-install-modes
  - section_id: native_plugins-discovery
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-installing
      - ref-cur-native_plugins-doc-local-test
      - ref-cur-native_plugins-doc-local-imports
      - ref-cur-native_plugins-doc-workspace-open
      - ref-cur-native_plugins-cli-param-plugin-dir
      - ref-cur-native_plugins-hooks-workspace-open
      - ref-cur-native_plugins-hooks-plugin-paths
      - ref-cur-native_plugins-sdk-mcp-precedence
      - ref-cur-native_plugins-changelog-startup
      - ref-cur-native_plugins-changelog-arrived
      - ref-cur-native_plugins-changelog-marketplace-slash
      - ref-cur-native_plugins-changelog-reload
  - section_id: native_plugins-api
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-contains
      - ref-cur-native_plugins-doc-standard
      - ref-cur-native_plugins-doc-manage-mcp
      - ref-cur-native_plugins-doc-manage-skills
      - ref-cur-native_plugins-mcp-team-distribution
      - ref-cur-native_plugins-mcp-allowlist
      - ref-cur-native_plugins-ent-allowlist
      - ref-cur-native_plugins-ent-distribute
      - ref-cur-native_plugins-sdk-mcp-precedence
      - ref-cur-native_plugins-changelog-plugin-hooks
  - section_id: native_plugins-lifecycle
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-install-modes
      - ref-cur-native_plugins-doc-manage
      - ref-cur-native_plugins-doc-manage-mcp
      - ref-cur-native_plugins-mcp-oneclick
      - ref-cur-native_plugins-changelog-reload
      - ref-cur-native_plugins-changelog-mcp-reload
      - ref-cur-native_plugins-changelog-startup
      - ref-cur-native_plugins-changelog-plugin-hooks
      - ref-cur-native_plugins-changelog-arrived
  - section_id: native_plugins-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-native_plugins-doc-manage
      - ref-cur-native_plugins-doc-manage-mcp
      - ref-cur-native_plugins-changelog-plugins-pager
      - ref-cur-native_plugins-cli-slash-plugin
      - ref-cur-native_plugins-changelog-marketplace-cli
      - ref-cur-native_plugins-changelog-settings-local
      - ref-cur-native_plugins-doc-local-test
      - ref-cur-native_plugins-changelog-reload
      - ref-cur-native_plugins-changelog-mcp-reload
      - ref-cur-native_plugins-changelog-arrived
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli, cursor]
        section_id: native_plugins-model
        status: answered
        source_refs:
          - ref-cur-native_plugins-doc-contains
          - ref-cur-native_plugins-doc-standard
          - ref-cur-native_plugins-doc-canvases
          - ref-cur-native_plugins-customize-components
          - ref-cur-native_plugins-sdk-setting-sources
          - ref-cur-native_plugins-doc-marketplace
          - ref-cur-native_plugins-doc-overview
  - question_id: plugins.package
    answers:
      - surface_ids: [cli, cursor]
        section_id: native_plugins-package
        status: partial
        source_refs:
          - ref-cur-native_plugins-doc-create-agent
          - ref-cur-native_plugins-doc-create-cursor
          - ref-cur-native_plugins-doc-standard
          - ref-cur-native_plugins-doc-local-test
          - ref-cur-native_plugins-doc-local-imports
          - ref-cur-native_plugins-doc-local-publish
          - ref-cur-native_plugins-skills-repo
  - question_id: plugins.install
    answers:
      - surface_ids: [cursor]
        section_id: native_plugins-install
        status: partial
        source_refs:
          - ref-cur-native_plugins-doc-installing
          - ref-cur-native_plugins-doc-install-modes
          - ref-cur-native_plugins-doc-marketplace
          - ref-cur-native_plugins-doc-find-team-marketplace
      - surface_ids: [cli]
        section_id: native_plugins-install
        status: partial
        source_refs:
          - ref-cur-native_plugins-changelog-arrived
          - ref-cur-native_plugins-cli-slash-plugin
          - ref-cur-native_plugins-cli-param-plugin-dir
          - ref-cur-native_plugins-changelog-settings-local
          - ref-cur-native_plugins-changelog-marketplace-cli
          - ref-cur-native_plugins-changelog-marketplace-slash
          - ref-cur-native_plugins-changelog-git-url
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli, cursor]
        section_id: native_plugins-discovery
        status: partial
        source_refs:
          - ref-cur-native_plugins-doc-installing
          - ref-cur-native_plugins-doc-local-test
          - ref-cur-native_plugins-doc-local-imports
          - ref-cur-native_plugins-doc-workspace-open
          - ref-cur-native_plugins-hooks-workspace-open
          - ref-cur-native_plugins-hooks-plugin-paths
          - ref-cur-native_plugins-sdk-mcp-precedence
          - ref-cur-native_plugins-cli-param-plugin-dir
          - ref-cur-native_plugins-changelog-startup
          - ref-cur-native_plugins-changelog-arrived
  - question_id: plugins.api
    answers:
      - surface_ids: [cli, cursor]
        section_id: native_plugins-api
        status: partial
        source_refs:
          - ref-cur-native_plugins-doc-contains
          - ref-cur-native_plugins-doc-standard
          - ref-cur-native_plugins-doc-manage-mcp
          - ref-cur-native_plugins-mcp-allowlist
          - ref-cur-native_plugins-ent-allowlist
          - ref-cur-native_plugins-ent-distribute
          - ref-cur-native_plugins-sdk-mcp-precedence
          - ref-cur-native_plugins-changelog-plugin-hooks
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli, cursor]
        section_id: native_plugins-lifecycle
        status: partial
        source_refs:
          - ref-cur-native_plugins-doc-install-modes
          - ref-cur-native_plugins-doc-manage
          - ref-cur-native_plugins-doc-manage-mcp
          - ref-cur-native_plugins-mcp-oneclick
          - ref-cur-native_plugins-changelog-reload
          - ref-cur-native_plugins-changelog-mcp-reload
          - ref-cur-native_plugins-changelog-startup
          - ref-cur-native_plugins-changelog-plugin-hooks
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli, cursor]
        section_id: native_plugins-diagnostics
        status: partial
        source_refs:
          - ref-cur-native_plugins-doc-manage
          - ref-cur-native_plugins-doc-manage-mcp
          - ref-cur-native_plugins-changelog-plugins-pager
          - ref-cur-native_plugins-cli-slash-plugin
          - ref-cur-native_plugins-changelog-marketplace-cli
          - ref-cur-native_plugins-changelog-settings-local
          - ref-cur-native_plugins-doc-local-test
          - ref-cur-native_plugins-changelog-reload
          - ref-cur-native_plugins-changelog-mcp-reload
---

## 固定来源与共页边界 {#native_plugins-scope}

本章的固定来源是 Cursor 官方文档站在 2026-09-30 抓取的一组页面快照：主来源 `plugins.md`，以及 `customize-cursor.md`、`skills.md`、`mcp.md`、`hooks.md`、`enterprise/model-and-integration-management.md`、`cli/changelog.md`、`cli/reference/parameters.md`、`cli/reference/slash-commands.md`、`sdk/typescript.md`。所有快照的 `version_applicability` 都是 `unknown`，没有证据把它们绑定到某个 CLI 或 IDE 版本，因此本章按 source-only 阅读，不声明适用版本。[@ref-cur-native_plugins-doc-overview]

`plugins.md` 是一页跨形态文档：它的操作入口（Customize 页、仪表盘）主要面向 Cursor 应用本身，但它同时描述了 Agent Window、IDE 与 CLI 共同的插件安装与分发流程，并把 CLI 交给 `cli/changelog.md` 记录。本章把这类归属在正文中逐处标注，避免把仪表盘侧的管理动作写成 CLI 命令。[@ref-cur-native_plugins-customize-components][@ref-cur-native_plugins-mcp-oneclick]

**缺口（已检查的入口）**：`plugins.md` 多处链接到 `cursor.com/docs/reference/plugins.md`（完整清单 schema、组件格式、提交检查表），该页不在本轮固定来源内，因此清单字段全集、组件文件格式细节与提交要求在本章保持未证实；社区市场目录 `cursor.directory` 也没有纳入固定来源。已检查 `plugins.md`、`customize-cursor.md`、`skills.md`、`mcp.md`、`hooks.md` 与 `cli/changelog.md`。[@ref-cur-native_plugins-doc-overview][@ref-cur-native_plugins-skills-viewing]

两个界面的操作入口因此常常重叠：Customize 页既负责一键浏览与安装市场条目、按 user / workspace / team 作用域筛选已安装内容，也负责打开插件携带的 canvas 模板，所以本章在涉及它的结论里同时标注 IDE 与 CLI 界面，只有明确区分时才拆开作答。[@ref-cur-native_plugins-customize-scope]

## 插件模型：什么算原生插件 {#native_plugins-model}

Cursor 的插件是**分发单元**，而不是新的运行时：它把已有组件打包成一个可安装的整体。`plugins.md` 的开篇定义是「Plugins package rules, skills, agents, commands, MCP servers, and hooks into distributable bundles」，`customize-cursor.md` 对插件的描述与之一致。[@ref-cur-native_plugins-doc-overview][@ref-cur-native_plugins-customize-components]

一个插件可包含下列组件的任意组合，但两种格式能携带的组件不同 [@ref-cur-native_plugins-doc-contains]：

| 组件 | 可用格式 | 说明 |
| :-- | :-- | :-- |
| Rules | 仅 Cursor Plugins | 持久化的 AI 指导与代码规范（`.mdc` 文件） |
| Skills | 两种格式 | 面向复杂任务的专项能力 |
| Agents | 仅 Cursor Plugins | 自定义 agent 配置与提示 |
| Commands | 仅 Cursor Plugins | agent 可执行的命令文件 |
| MCP Servers | 两种格式 | Model Context Protocol 集成 |
| Hooks | 仅 Cursor Plugins | 由事件触发的自动化脚本 |

与相邻概念的关系：

- **Skill**：Skill 是单个能力的编写格式，插件是把它交付给他人的打包方式。因此固定来源明确说「Skills aren't imported on their own」，要把一个仓库里的 skill 带进 Cursor，必须把它包成插件再经市场分发。插件提供的 skill 会与项目 skill 一起出现在 Customize 的 **Agent Decides** 区。[@ref-cur-native_plugins-skills-viewing]
- **MCP server**：MCP server 既可以由用户在 `mcp.json` 里独立配置，也可以由插件携带。SDK 侧把这条边界写得最清楚：磁盘设置层里有一层叫 `"plugins"`，含义是「Plugin-provided settings」，只有本地 agent 的 `local.settingSources` 显式包含 `"plugins"` 时才会加载这层；云 agent 则始终加载 `project` / `team` / `plugins`。[@ref-cur-native_plugins-sdk-setting-sources]
- **Hook 脚本**：hook 既可以在 `.cursor/hooks.json` 里注册，也可以由已安装插件携带；CLI 记录过「插件定义的 hooks（含 `--plugin-dir` 加载的插件）会执行并在插件重载时刷新」。[@ref-cur-native_plugins-changelog-plugin-hooks]
- **普通包 / Git 仓库**：官方市场里的插件以 Git 仓库形态分发、由 Cursor 团队提交，且每个插件上架前都经过人工审核 [@ref-cur-native_plugins-doc-marketplace]；另一类是开放标准 **Agent Plugins**（`agent-plugins.org` [@ref-cur-native_plugins-doc-overview]），它只规定可移植的 skills 与 MCP servers 打包方式。Cursor 同时支持标准插件与自有格式 Cursor Plugins，标准插件直接可用，自有格式额外提供 rules、agents、commands、hooks 与 variables。[@ref-cur-native_plugins-doc-standard]
- **Canvas**：插件还可以携带预置的 **canvas**（共享搭建模板），目前文档列举 Hex Canvas 与 Atlassian Canvas，入口是 Customize 中已安装插件的 canvas 打开项。[@ref-cur-native_plugins-doc-canvases]

**缺口（partial）**：固定来源没有说明 canvas 在清单中如何声明、是否属于某个组件类型，也没有说明插件能否携带除上表之外的组件；已检查 `plugins.md` 的「What plugins contain」「Cursor Plugin canvases」与 `customize-cursor.md` 的「Extension components」。

## 插件包格式、清单与本地测试 {#native_plugins-package}

两种格式的差别只在清单位置与可携带组件，目录布局则由清单所在位置决定。

**Agent Plugin（标准）**：清单是插件根目录的 `plugin.json`，必须带标准 schema 标识；组件放在默认目录（如 `skills/`）与 `mcp.json`。[@ref-cur-native_plugins-doc-create-agent]

```
{plugin-root}/
  plugin.json
  skills/
    {skill-name}/
      SKILL.md
  mcp.json
```

**Cursor Plugin（自有格式）**：清单是 `.cursor-plugin/plugin.json`，文档只要求一个 `name` 字段；组件从默认目录发现，也可以在清单里指定自定义路径。示例目录含 `rules/`、`skills/`、`mcp.json`。[@ref-cur-native_plugins-doc-create-cursor]

```
{plugin-root}/
  .cursor-plugin/
    plugin.json
  rules/
    coding-standards.mdc
  skills/
    {skill-name}/
      SKILL.md
  mcp.json
```

两个最小清单，均来自官方文档示例：

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-plugin",
  "description": "Portable code review tools",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

上面是 Agent Plugin 的根 `plugin.json`：`$schema` 指向标准的 1.0.0 schema，`name`/`version`/`author` 标识插件。前提是文件位于插件根且名为 `plugin.json`；结果是宿主识别它为规范内的 Agent Plugin。[@ref-cur-native_plugins-doc-create-agent]

```json
{
  "name": "my-plugin",
  "description": "Custom development tools",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

上面是 Cursor Plugin 的 `.cursor-plugin/plugin.json`：文档只把 `name` 列为必需，`description`/`version`/`author` 出现在官方示例中但未被声明为必需；组件走默认目录或清单中的自定义路径。前提是文件位于 `.cursor-plugin/` 下。[@ref-cur-native_plugins-doc-create-cursor]

**变量展开**：Cursor 不展开 Agent Plugins 标准里的 `${PLUGIN_ROOT}` 与 `${PLUGIN_DATA}`；在 `mcp.json` 中要用 `${CURSOR_PLUGIN_ROOT}` 表示插件根。这一条同时是「格式兼容但不完全等价」的证据，也是撰写 `mcp.json` 时最容易出错的地方。[@ref-cur-native_plugins-doc-standard]

**本地测试**：把任一格式放进 `~/.cursor/plugins/local/{plugin-name}`，重启 Cursor 或运行 **Developer: Reload Window**，再到 Customize 确认期望的组件（rules、skills、MCP servers 等）出现。本地发现的前提是「local plugin imports 被允许」：在 Teams/Enterprise 上由 **Dashboard -> Settings -> Security & Identity -> Marketplace and Plugins** 的 **Allow Local Plugin Imports** 控制，Enterprise 默认关闭；同名 marketplace 插件已安装时，marketplace 安装优先于本地副本。`~/.cursor/plugins/local` 中的符号链接只有在目标解析到该目录内部时才会加载，指向别处的插件仓库会被跳过。[@ref-cur-native_plugins-doc-local-test][@ref-cur-native_plugins-doc-local-imports]

**提交与多插件仓库**：插件经 `cursor.com/marketplace/publish` 提交审核；Cursor Plugins 可用 `.cursor-plugin/marketplace.json` 组织多插件仓库。[@ref-cur-native_plugins-doc-local-publish]

**缺口（partial）**：`plugins.md` 把完整清单 schema、组件文件格式与兼容声明交给未纳入固定来源的 `docs/reference/plugins.md`，因此 Cursor Plugin 清单的字段全集（`version` 是否必需、兼容性字段是否存在）在本章未证实；来源只说明组件可从默认目录发现、也可在清单中指定自定义路径，但未给出具体键名与语法；已检查 `plugins.md` 的「Creating plugins」「Agent Plugin」「Cursor Plugin」「Test plugins locally」与 `skills.md` 的「Installing skills from a repository」（该页确认 skill 必须随插件分发，且仓库需要 `.cursor-plugin/marketplace.json` 才能以「From GitHub Repository」导入）。[@ref-cur-native_plugins-skills-repo][@ref-cur-native_plugins-doc-local-publish]

## 安装来源与作用域 {#native_plugins-install}

**安装来源**：官方市场（Cursor Marketplace，插件以 Git 仓库分发、提交经 Cursor 团队、每个插件人工审核后才上架）、团队市场（见下一小节）、社区目录 `cursor.directory`、以及本地目录。市场里也能一键安装 MCP server 并完成 OAuth 认证。[@ref-cur-native_plugins-doc-marketplace][@ref-cur-native_plugins-doc-find-team-marketplace]

**IDE 侧（`cursor` 界面）流程**：打开侧栏 **Customize** → 找到插件 → 选择 **Install** 并选择 project 或 user 作用域；Cursor 从清单位置自动识别格式，所以 Agent Plugins 与 Cursor Plugins 的安装流程相同。团队市场插件同样从 Customize 面板出现：Default Off 由开发者自行安装，Default On 自动安装但可退出，Required 自动安装且不可卸载。[@ref-cur-native_plugins-doc-installing][@ref-cur-native_plugins-doc-find-team-marketplace][@ref-cur-native_plugins-doc-install-modes]

**CLI 侧（`cli` 界面）入口**：`/plugin [subcommand]` 用于管理插件与市场，并可按用户或项目作用域安装/卸载；`/plugin marketplace add` 用 git URL 添加市场；也可以把仓库 URL 直接粘进插件搜索安装。[@ref-cur-native_plugins-cli-slash-plugin][@ref-cur-native_plugins-changelog-arrived][@ref-cur-native_plugins-changelog-marketplace-slash][@ref-cur-native_plugins-changelog-git-url]

无交互场景可用 shell 命令管理市场（可用 `--git-ref` 固定分支、标签或提交，`list` 打印每个市场的名称、作用域与 git URL，`--format json` 便于脚本，`update` 重新索引，`remove` 删除用户作用域的市场）：

```bash
agent plugin marketplace add {git-url} --git-ref {branch-or-tag-or-commit}
agent plugin marketplace list --format json
agent plugin marketplace update {marketplace-name}
agent plugin marketplace remove {marketplace-name}
```

字段与前提：`{git-url}` 是市场仓库地址，`--git-ref` 把市场固定到分支、标签或提交；`remove` 只删除用户作用域的市场。结果是该市场内的插件可被 `list` 列出并被安装。[@ref-cur-native_plugins-changelog-marketplace-cli]

本地插件目录也可以直接喂给 CLI：启动参数 `--plugin-dir {path}` 可重复指定以加载本地插件目录；`cli/changelog.md` 还记录过用 `~/.cursor/settings.json` 的 `enabled_plugins` 键把本地插件目录接入，无需市场。[@ref-cur-native_plugins-cli-param-plugin-dir][@ref-cur-native_plugins-changelog-settings-local]

## 更新、禁用与卸载 {#native_plugins-update}

**更新**：市场在首次导入仓库时索引插件。GitHub 导入的市场可打开 **Enable Auto Refresh**，在跟踪分支有新提交时更新（需要在该仓库安装 Cursor GitHub App；Cursor 对市场的重新索引频率上限是每 10 分钟一次，会把密集推送合并到最新提交）；也可以手动点 **Refresh**。用 “Import from Repo” 建的市场在每次推送时重读完整清单，因此新增插件会被自动纳入；而逐个添加过插件的市场，Auto Refresh 只更新已有插件，要拾取新增插件需重新导入仓库 URL。[@ref-cur-native_plugins-doc-refresh][@ref-cur-native_plugins-doc-refresh-manifest][@ref-cur-native_plugins-doc-add-marketplace]

**禁用与卸载**：安装后的组件在 Customize 中统一管理，可按 user / workspace / team 作用域筛选；MCP server 有开关，Disabled 的 server 不会加载也不会出现在 chat 中。安装模式 Required 的插件无法卸载。[@ref-cur-native_plugins-doc-manage][@ref-cur-native_plugins-doc-manage-mcp][@ref-cur-native_plugins-doc-install-modes]

**版本固定的缺口（partial）**：固定来源只提供 Git ref 级固定（`--git-ref`、市场跟踪的分支），没有给出按插件版本号选择、回滚或锁定的机制；插件清单里的 `version` 字段是否参与安装选择也没有说明。已检查 `plugins.md` 的「The marketplace」「Keep plugins up to date」「Installing plugins」与 `cli/changelog.md` 的插件相关条目。此外 `cli/changelog.md` 提到本地插件可用 `~/.cursor/settings.json` 的 `enabled_plugins` 键指向本地插件目录（无需市场），但该键的值类型与文件 schema 未在固定来源中给出，本章不据此编造示例。[@ref-cur-native_plugins-changelog-settings-local]

## 团队市场、发布与访问控制 {#native_plugins-team}

团队市场只在 Teams 与 Enterprise 计划提供，用于分发 Agent Plugins 与 Cursor Plugins：Teams 最多 1 个团队市场，Enterprise 不限。管理入口是 **Dashboard -> Plugins & MCPs**；在 Enterprise 计划上只有管理员能添加团队市场。[@ref-cur-native_plugins-doc-team-marketplaces][@ref-cur-native_plugins-doc-team-admin]

**Default 市场**：`Default` 团队市场把共享插件与 MCP server 连到一起。管理员可以把已经对 Cloud Agents 可用的 Team MCP server 加进来，让团队成员在 Agent Window、IDE 与 CLI 中自行安装和配置。把 Team MCP server 加入 Default 市场**不会**为所有开发者安装或启用它：访问范围与插件的安装模式仍由管理员控制，每个开发者可能还需要向 MCP 提供方认证。[@ref-cur-native_plugins-doc-default-marketplace]

**新增市场**：**Dashboard -> Plugins & MCPs** → **Team Marketplaces** → **Add Marketplace**；可从零创建，或用 **Import from Repo** 粘贴 GitHub / GitLab / Bitbucket / Azure DevOps 的仓库 URL，随后用 “Add to Marketplace” 添加并审查插件，最后在 **Marketplace Settings** 设置访问范围、按需开启 Auto Refresh 并保存。[@ref-cur-native_plugins-doc-add-marketplace]

**访问控制**：团队市场默认对团队内所有人可用；**Marketplace Settings -> Marketplace Access** 可把市场限制到选定的 Organization Groups，只有属于该市场所在团队且属于所选组的成员能访问，团队管理员保留访问权。Organization Groups 的成员可由身份提供方通过 SCIM 同步；已经使用团队级 SCIM 目录组的市场保留原配置，Cursor 不会自动迁移这些分配，没有 Organization Groups 的组织继续使用 SCIM 目录组。[@ref-cur-native_plugins-doc-marketplace-access][@ref-cur-native_plugins-doc-scim]

**安装模式**：设置访问范围后，管理员按受众为每个插件选择分发方式 —— Default Off（开发者自行决定是否安装）、Default On（默认安装，可退出）、Required（始终安装且不可卸载）。[@ref-cur-native_plugins-doc-install-modes]

**成员发布**：在 `Default` 市场上，管理员用 **Marketplace Settings** 里的 **Allow Members to Publish** 控制成员能否发布个人 skill，默认开启；关闭后只有团队管理员能发布新 skill，已发布的 skill 仍可用，其作者仍可更新或取消发布。Teams/Enterprise 成员可从 `~/.cursor/skills/` 把个人 skill 发布到团队 Default 市场：Cursor 把 skill 打包成同名插件、在团队托管仓库中存一份副本并加入 Default 市场，之后该 skill 就从插件加载而不是本地目录。发布后：安装是 opt-in（作者自己自动获得，其他人需自行安装）、作者可用 **Sync changes** 推送更新或用 **Unpublish** 收回、一个 skill 对应一个插件且不会连带打包它引用的其它 skill。[@ref-cur-native_plugins-doc-allow-publish][@ref-cur-native_plugins-doc-publish-skill][@ref-cur-native_plugins-doc-publish-after]

**由 Cursor 托管市场**：对 GitHub 导入的团队市场，管理员可在 **Marketplace Settings** 打开 **Serve marketplace from Cursor**，Cursor 保存一份同步副本并从它提供插件，成员无需 GitHub 访问源仓库即可使用市场；首次同步进行时该设置显示 **Syncing** 并锁定，若同步失败则继续从 GitHub 提供访问。该设置只适用于 GitHub 导入，GitLab / Bitbucket / Azure DevOps 的导入仍从源仓库提供。[@ref-cur-native_plugins-doc-serve-from-cursor]

**风险提示**：把已链接的 MCP 插件从市场移除或删除市场，可能连带删除 Team MCP server，从而同时影响本地用户与 Cloud Agents（文档要求在确认弹窗中复核）。[@ref-cur-native_plugins-doc-default-marketplace]

## 发现、解析、校验与命名冲突 {#native_plugins-discovery}

**发现时机**。IDE 侧没有热扫描语义的说明：本地插件放进 `~/.cursor/plugins/local` 后需要重启 Cursor 或 **Developer: Reload Window**，重载后 Cursor 才会发现该目录里的插件（前提是本地导入被允许）。CLI 侧在启动阶段构建插件列表，`cli/changelog.md` 记录「慢的插件列表会回退为无插件会话而不是拖住启动」，说明插件列表是启动路径的一部分但失败不阻塞会话。插件重载会刷新其斜杠命令与命令面板。[@ref-cur-native_plugins-doc-local-test][@ref-cur-native_plugins-changelog-startup][@ref-cur-native_plugins-changelog-reload]

**发现范围**（固定来源可直接支持的入口）：

| 入口 | 形态 | 依据 |
| :-- | :-- | :-- |
| 市场安装的插件 | 由市场索引与安装流程产生 | 安装与刷新流程 [@ref-cur-native_plugins-changelog-arrived] |
| `~/.cursor/plugins/local/{name}` | 本地开发目录；符号链接仅在目标位于该目录内时加载 | 本地测试流程 [@ref-cur-native_plugins-doc-local-test][@ref-cur-native_plugins-doc-local-imports] |
| `--plugin-dir {path}` | CLI 启动参数，可重复 | 参数表 [@ref-cur-native_plugins-cli-param-plugin-dir] |
| `workspaceOpen` hook 返回的 `pluginPaths` | 绝对路径列表，工作区打开与文件夹变更时返回 | Hook 规范 [@ref-cur-native_plugins-doc-workspace-open][@ref-cur-native_plugins-hooks-plugin-paths] |

`workspaceOpen` 属于应用生命周期 hook，在任何 agent 会话之外触发：它在 Cursor 打开工作区时触发一次，并在每次工作区文件夹变化时再次触发；窗口没有任何工作区文件夹时跳过；在 Cursor 桌面应用与 CLI 中都运行。它的输出字段 `pluginPaths` 是「要为当前工作区加载的插件目录绝对路径」列表，因此「按工作区决定加载哪些插件」是通过 hook 而不是配置文件完成的。[@ref-cur-native_plugins-hooks-workspace-open][@ref-cur-native_plugins-hooks-plugin-paths]

**解析与校验**：安装与本地加载都按清单位置判别格式（根 `plugin.json` = Agent Plugin，`.cursor-plugin/plugin.json` = Cursor Plugin），组件按默认目录或清单自定义路径解析；本地测试流程要求回到 Customize 人工确认期望组件是否出现，这就是固定来源给出的唯一显式校验动作。[@ref-cur-native_plugins-doc-local-test][@ref-cur-native_plugins-doc-installing]

**加载顺序与冲突**：

1. 同名时 marketplace 安装优先于 `~/.cursor/plugins/local` 里的本地副本。[@ref-cur-native_plugins-doc-local-imports]
2. 插件提供的 MCP server 处在设置层的中段：SDK 的解析顺序是「`agent.send()` 的 `mcpServers` > `Agent.create()` 的 `mcpServers` > 插件服务器（需 `local.settingSources` 含 `"plugins"`）> 项目的 `.cursor/mcp.json` > 用户的 `~/.cursor/mcp.json`」。[@ref-cur-native_plugins-sdk-mcp-precedence]
3. CLI 还接受从 Claude Code 导入的插件，它们与原生插件并存，文档未说明二者冲突时的取舍。[@ref-cur-native_plugins-changelog-marketplace-slash]

**缺口（partial）**：固定来源没有给出插件依赖声明与解析机制（是否存在依赖字段、如何报缺失依赖）、没有插件加载顺序的通用说明、也没有命名冲突的通用消解规则（是否按插件名加前缀、同名 skill/command 谁遮蔽谁）。已检查 `plugins.md` 的「Installing plugins」「Test plugins locally」「Creating plugins」、`hooks.md` 的 `workspaceOpen` 规范、`sdk/typescript.md` 的 MCP 服务器顺序与 `cli/changelog.md` 的插件条目。

## 插件能注册的能力与权限边界 {#native_plugins-api}

**注册的能力就是组件目录本身**：插件通过清单与默认目录声明 rules（`.mdc`）、skills、agents、commands、MCP servers 与 hooks；Cursor Plugins 额外支持 variables（通过 `docs/reference/plugins.md#variables`，该页不在固定来源内，因此 variables 语法未证实）。标准格式只允许 skills 与 MCP servers，自有格式才允许 rules、agents、commands、hooks 与 variables。插件提供的 skill 与 rules 一样列在 Customize 的 **Agent Decides** 区，可用 `/skill-name` 手动调用。[@ref-cur-native_plugins-doc-contains][@ref-cur-native_plugins-doc-standard][@ref-cur-native_plugins-doc-manage-skills]

**唯一的可执行扩展点是 hooks**：插件可以携带在 agent 循环事件上运行的脚本；CLI 记录过「已安装插件（含 `--plugin-dir` 加载的插件）定义的 hooks 会执行，并在插件重载时刷新」，也记录过插件配置表单会对凭据类字段与 secret 类型字段做掩码。[@ref-cur-native_plugins-changelog-plugin-hooks]

**权限边界**：

- **MCP server 的批准与分发是两件事**。Enterprise 管理员可以用 MCP Allowlist 控制团队成员允许运行哪些 MCP server：command 条目按命令模式批准本地 stdio server，URL 条目按 URL 模式批准远程 HTTP/SSE server，tool allowlist 限制已批准 server 中哪些工具可自动运行（留空表示允许全部）。允许清单生效时，只有匹配条目的 server 能运行，不匹配的被阻止；但把 server 加进允许清单不会推送到用户机器，团队成员仍需自行配置。[@ref-cur-native_plugins-mcp-allowlist][@ref-cur-native_plugins-ent-allowlist][@ref-cur-native_plugins-ent-distribute]
- **分发要走团队市场**：要让已批准的 server 到达成员，需要把它加入团队市场；管理员可以把独立的 Team MCP server 链接到 Default 市场，让成员在 Agent Window、IDE 与 CLI 中安装和配置。团队市场分发的 server 会与个人、工作区 server 并列出现在 Customize 里。[@ref-cur-native_plugins-ent-distribute][@ref-cur-native_plugins-mcp-team-distribution]
- **加载开关**：MCP server 可以在 Customize 里按条目开关，Disabled 的 server 不会加载也不会出现在 chat；在 SDK 场景下，插件提供的服务器只有在 `local.settingSources` 包含 `"plugins"` 时才进入本地 agent 的服务器集合。[@ref-cur-native_plugins-doc-manage-mcp][@ref-cur-native_plugins-sdk-mcp-precedence]

**缺口（partial）**：固定来源没有描述插件的程序化宿主 API 或运行时沙箱边界（例如 hook 之外的插件代码能力、插件读取工作区/凭据的限制）；能确定的是插件以声明式组件加 hook 脚本两种形态生效。已检查 `plugins.md` 的「What plugins contain」「The Agent Plugins standard」「Rules and skills」「MCP servers」、`mcp.md` 与 `enterprise/model-and-integration-management.md` 的 MCP Allowlist 小节、`sdk/typescript.md` 的 MCP 顺序与 `cli/changelog.md` 的插件条目。

## 生命周期状态：安装、启用、发现、加载与健康 {#native_plugins-lifecycle}

固定来源没有给出官方的状态机，但可以把可观察证据分成五层；其中「健康」层证据最弱。

| 状态 | 可观察依据 | 状态 |
| :-- | :-- | :-- |
| 已安装 | 市场安装后出现在 Customize；团队安装模式决定是否默认安装、能否卸载 | 有依据 [@ref-cur-native_plugins-doc-install-modes][@ref-cur-native_plugins-mcp-oneclick] |
| 已启用/已禁用 | Customize 中按条目 toggle；Disabled 的 MCP server 不加载、不出现在 chat | 有依据 [@ref-cur-native_plugins-doc-manage-mcp] |
| 已发现/已加载 | 本地目录在重启或 **Developer: Reload Window** 后才被发现；Customize 列出已安装插件、MCP server、rules 与 skills | 有依据 [@ref-cur-native_plugins-doc-manage][@ref-cur-native_plugins-mcp-oneclick] |
| 已激活/已生效 | 会话内：CLI 侧插件的 skills、斜杠命令、subagents 与 MCP servers 载入会话；插件重载刷新其斜杠命令与命令面板 | 有依据 [@ref-cur-native_plugins-changelog-arrived][@ref-cur-native_plugins-changelog-reload] |
| 健康 | 只有间接信号：插件重载会刷新 MCP lease，使工具不再卡在 “Not connected”；启动时插件列表过慢会回退为无插件会话 | 间接 [@ref-cur-native_plugins-changelog-mcp-reload][@ref-cur-native_plugins-changelog-startup] |

补充语义：插件携带的 hook 在插件重载时刷新（即 hook 注册跟着插件生命周期走）；MCP server 的启停在 session 内即时生效（在 `/mcp` 里登录、启用或禁用会立即更新 agent 可用工具，见诊断小节）。[@ref-cur-native_plugins-changelog-plugin-hooks][@ref-cur-native_plugins-changelog-reload]

**缺口（partial）**：固定来源没有定义「激活」与「加载」的边界（哪些组件可热重载、哪些必须重启），也没有单独的健康状态、版本-运行状态字段或失败分类。已检查 `plugins.md` 的「Managing installed plugins」「Plugin installation modes」、`mcp.md` 的安装小节与 `cli/changelog.md` 的插件相关条目。

## 诊断入口：确认安装位置、状态与错误 {#native_plugins-diagnostics}

**IDE 侧（`cursor` 界面）**：**Customize** 是统一入口，可按 user / workspace / team 作用域筛选，查看已安装的 Agent Plugins、Cursor Plugins、MCP servers、rules 与 skills；MCP server 条目的开关本身就是启用状态的可观察位。修改本地插件后需要重启或 **Developer: Reload Window**，再回 Customize 确认预期组件出现——这是文档给出的排错动作。[@ref-cur-native_plugins-doc-manage][@ref-cur-native_plugins-doc-manage-mcp][@ref-cur-native_plugins-doc-local-test]

**CLI 侧（`cli` 界面）**：

| 入口 | 能看到什么 | 依据 |
| :-- | :-- | :-- |
| `/plugin [subcommand]` | 管理插件与市场；按用户或项目作用域安装/卸载 | [@ref-cur-native_plugins-cli-slash-plugin][@ref-cur-native_plugins-changelog-arrived] |
| `/plugins` | 插件详情页；每个插件的 MCP servers 已链接进 `/mcp` 管理 | [@ref-cur-native_plugins-changelog-plugins-pager] |
| `/mcp` | server 的登录、启用/禁用与工具列表；变更在 session 内即时生效 | [@ref-cur-native_plugins-changelog-mcp-reload] |
| `agent plugin marketplace list --format json` | 每个市场的名称、作用域与 git URL，便于脚本核对 | [@ref-cur-native_plugins-changelog-marketplace-cli] |
| `~/.cursor/settings.json` 的 `enabled_plugins` | 本地插件目录来源（无市场安装场景） | [@ref-cur-native_plugins-changelog-settings-local] |

**常见失败与定位**：

1. 本地插件不出现 → 先确认本地导入被允许：Teams/Enterprise 由 **Dashboard -> Settings -> Security & Identity -> Marketplace and Plugins** 的 **Allow Local Plugin Imports** 控制（Enterprise 默认关闭），并且同名 marketplace 插件已安装时会覆盖本地副本。[@ref-cur-native_plugins-doc-local-test]
2. 插件里的 MCP 工具不可用 → 检查该插件是否被重载过（插件重载会刷新 MCP lease），以及团队允许清单是否阻止了该 server。[@ref-cur-native_plugins-changelog-mcp-reload]
3. 本地插件的斜杠命令/面板未更新 → 重载插件会刷新其斜杠命令与命令面板。[@ref-cur-native_plugins-changelog-reload]

**缺口（partial）**：固定来源没有提供查询单个插件版本或运行健康状态的专用命令（`/plugins` 只被描述为插件详情页），也没有插件加载失败日志、`doctor` 类命令或错误码说明。已检查 `plugins.md` 的「Managing installed plugins」「Test plugins locally」、`cli/reference/slash-commands.md` 的命令表与 `cli/changelog.md` 的插件相关条目。
