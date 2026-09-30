---
schema_version: 3
record_kind: production
edition_id: openhands-cli-native_plugins-v1
harness_id: openhands
topic: native_plugins
title: "OpenHands CLI 的原生插件：定义、包格式、安装、发现、贡献点与生命周期"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-pyproject, ref-openhands-cli-readme-status, ref-openhands-canvas-boundaries]
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-model, ref-openhands-sdk-agents-registry, ref-openhands-docs-plugins-what, ref-openhands-docs-plugins-components, ref-openhands-docs-plugins-vs-skills]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-model, ref-openhands-sdk-plugin-manifest, ref-openhands-sdk-marketplace, ref-openhands-docs-plugins-structure, ref-openhands-docs-plugins-metadata, ref-openhands-docs-agentplugins-pick, ref-openhands-docs-agentplugins-layout, ref-openhands-docs-agentplugins-manifest]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-manager, ref-openhands-sdk-plugin-cache, ref-openhands-sdk-plugin-installed-dir, ref-openhands-sdk-marketplace, ref-openhands-cli-main-flags, ref-openhands-docs-plugins-sources, ref-openhands-docs-plugins-using]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-load-all, ref-openhands-sdk-plugin-loader, ref-openhands-sdk-agents-registry, ref-openhands-cli-setup-conversation, ref-openhands-docs-sdkplugins-structure, ref-openhands-docs-sdkplugins-manifest]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-model, ref-openhands-sdk-agents-registry, ref-openhands-docs-plugins-components, ref-openhands-docs-agentplugins-pick]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-info, ref-openhands-sdk-plugin-states, ref-openhands-sdk-plugin-manager, ref-openhands-docs-sdkplugins-install, ref-openhands-docs-sdkplugins-lifecycle]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-plugin-load-all, ref-openhands-sdk-plugin-manager, ref-openhands-sdk-plugin-cache, ref-openhands-sdk-plugin-info, ref-openhands-cli-main-flags, ref-openhands-docs-agentplugins-invalid, ref-openhands-docs-plugins-using, ref-openhands-docs-agentplugins-pick]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-openhands-sdk-plugin-model, ref-openhands-sdk-agents-registry, ref-openhands-docs-plugins-what, ref-openhands-docs-plugins-vs-skills]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: partial
        source_refs: [ref-openhands-sdk-plugin-model, ref-openhands-sdk-plugin-manifest, ref-openhands-sdk-marketplace, ref-openhands-docs-agentplugins-pick, ref-openhands-docs-agentplugins-layout]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: partial
        source_refs: [ref-openhands-sdk-plugin-manager, ref-openhands-sdk-plugin-cache, ref-openhands-sdk-plugin-installed-dir, ref-openhands-sdk-marketplace, ref-openhands-cli-main-flags, ref-openhands-docs-plugins-using]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-openhands-sdk-plugin-load-all, ref-openhands-sdk-plugin-loader, ref-openhands-cli-setup-conversation, ref-openhands-docs-sdkplugins-structure]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: partial
        source_refs: [ref-openhands-sdk-plugin-model, ref-openhands-sdk-agents-registry, ref-openhands-docs-plugins-components, ref-openhands-docs-agentplugins-pick]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-openhands-sdk-plugin-info, ref-openhands-sdk-plugin-states, ref-openhands-sdk-plugin-manager, ref-openhands-docs-sdkplugins-install, ref-openhands-docs-sdkplugins-lifecycle]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-openhands-sdk-plugin-load-all, ref-openhands-sdk-plugin-manager, ref-openhands-sdk-plugin-cache, ref-openhands-cli-main-flags, ref-openhands-docs-agentplugins-invalid]
---

## 固定来源与调查范围 {#plugins-scope}

本页只回答 CLI 界面（`surface_id: cli`）。固定来源：CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba`（包 `openhands` 1.16.0）[@ref-openhands-cli-pyproject]（该仓库已不再积极维护 [@ref-openhands-cli-readme-status]）；插件实现位于 CLI 依赖的 `openhands-sdk==1.28.1`（本目录固定提交 `edaac806`）[@ref-openhands-cli-pyproject]；产品 Web 端位于另一官方仓库 [@ref-openhands-canvas-boundaries]。官方文档站点页面作为文档快照来源，适用软件版本未知；本页会明确标出文档与固定源码不一致之处。

## 什么算原生插件 {#plugins-model}

原生插件是一个目录包，目录内含清单文件（`.plugin/plugin.json` 或 `.claude-plugin/plugin.json`，后者与 Claude Code 兼容），并可附带若干组件目录：`commands/`、`agents/`、`skills/`、`hooks/hooks.json`、`.mcp.json` [@ref-openhands-sdk-plugin-model]。

与相邻机制的关系：

| 概念 | 关系 |
| --- | --- |
| Skill | 插件是 Skill 的**打包载体**：插件 `skills/` 下的 SKILL.md 会被加载进 Agent 上下文；插件命令也会被转换成关键字触发的 Skill（`/插件名:命令名`）[@ref-openhands-sdk-plugin-model] |
| MCP server | 插件 `.mcp.json` 提供的 server 进入会话的 `mcp_config`（按 server 名深合并）[@ref-openhands-sdk-plugin-model] |
| Hook 脚本 | 插件 `hooks/hooks.json` 提供的事件/匹配器与用户 `hooks.json` 使用同一套模型，加载后在会话初始化时合并 [@ref-openhands-sdk-plugin-model] |
| 自定义 Agent | 插件 `agents/` 下的 Markdown Agent 定义交给子代理注册表，优先级介于程序化注册与项目文件之间 [@ref-openhands-sdk-agents-registry] |
| 普通 npm/Python 包 | 插件不是被 import 的代码包，而是**声明式目录**：宿主读取清单与组件文件，不需要执行插件代码 [@ref-openhands-sdk-plugin-model] |

官方文档的定义与组件清单一致（插件把 skills、hooks、MCP servers、agents、commands 打包在一起）[@ref-openhands-docs-plugins-what] [@ref-openhands-docs-plugins-components]，并把插件与 Skill 的区别单独列表说明（Skill 是单个能力单元，插件是多组件分发单元）[@ref-openhands-docs-plugins-vs-skills]。

## 包格式与清单 {#plugins-package}

目录结构与清单字段 [@ref-openhands-sdk-plugin-model] [@ref-openhands-sdk-plugin-manifest]：

| 项 | 说明 |
| --- | --- |
| 清单位置 | `.plugin/plugin.json` 或 `.claude-plugin/plugin.json`（按此顺序查找，取第一个存在的）[@ref-openhands-sdk-plugin-model] |
| `name` | 必填；缺失清单时退回目录名 [@ref-openhands-sdk-plugin-model] |
| `version` | 默认 `1.0.0` [@ref-openhands-sdk-plugin-manifest] |
| `description` | 默认空串 [@ref-openhands-sdk-plugin-manifest] |
| `author` | 对象（`name`/`email`/`url`）或 `Name (email)` 形式的字符串 [@ref-openhands-sdk-plugin-manifest] |
| `entry_command` | 生成一个斜杠命令 `/<插件名>:<命令名>` [@ref-openhands-sdk-plugin-model] |
| 其他键 | 清单模型允许额外字段（不报错）[@ref-openhands-sdk-plugin-manifest] |

组件文件：`commands/*.md` 的 frontmatter 支持 `description`、`argument-hint`/`argumentHint`、`allowed-tools`/`allowedTools`，正文即指令，命令名取文件名；`hooks/hooks.json` 与用户 Hook 配置同构；`.mcp.json` 与 Skill 级 MCP 配置文件同构 [@ref-openhands-sdk-plugin-model] [@ref-openhands-sdk-plugin-manifest]。

市场清单（marketplace）使用同样的两个目录，文件名是 `marketplace.json`，用于把一组插件集中发布并解析来源（`github:owner/repo` 与 URL 两种）[@ref-openhands-sdk-marketplace]。

文档描述的另一种格式——“Agent Plugins 包”：根目录直接放 `plugin.json`，且**根清单优先**、清单存在但非法时整体判为无效而不回退 [@ref-openhands-docs-agentplugins-pick] [@ref-openhands-docs-agentplugins-layout] [@ref-openhands-docs-agentplugins-manifest]。固定快照的 SDK v1.28.1 只查找 `.plugin/` 与 `.claude-plugin/` 两个目录，没有根 `plugin.json` 分支，因此该格式在本版本不可用（版本差别）[@ref-openhands-sdk-plugin-model]。

文档的“插件结构/元数据”小节与固定源码的目录约定一致 [@ref-openhands-docs-plugins-structure] [@ref-openhands-docs-plugins-metadata]。

## 安装、更新与卸载 {#plugins-install}

SDK 提供的安装面（通用安装管理器）[@ref-openhands-sdk-plugin-manager]：

- 来源：本地路径、`github:owner/repo` 简写、任意 git URL；解析过程会记录解析到的 commit，便于恢复时固定版本 [@ref-openhands-sdk-plugin-cache] [@ref-openhands-sdk-marketplace]。
- 缓存与落地目录：git 缓存 `~/.openhands/cache/plugins`（通用扩展缓存为 `~/.openhands/cache/extensions`），已安装插件放在 `~/.openhands/plugins/installed/` 并在 `.installed.json` 中登记 [@ref-openhands-sdk-plugin-cache] [@ref-openhands-sdk-plugin-installed-dir]。
- 操作：`install`（目标已存在且未强制时抛 `FileExistsError`，强制安装保留原启用状态）、`uninstall`（只允许删除已登记名字）、`enable`/`disable`、`update`（按原来源重新拉取并保留启用状态）[@ref-openhands-sdk-plugin-manager]。
- 版本固定：`PluginSource` 支持 `ref`（分支/标签/commit）；解析后的 `resolved_ref` 会随安装记录保存，方便复现 [@ref-openhands-sdk-marketplace]。

CLI 侧：固定快照的 CLI 没有任何插件代码或命令——`openhands` 的子命令只有 `acp`、`serve`、`web`、`mcp`、`cloud`、`login`、`logout`、`view`，参数表里没有 `--plugin` [@ref-openhands-cli-main-flags]。官方文档给出的 CLI 插件入口（`~/.openhands/config.toml` 的 `[plugins] sources`、`openhands --plugin 路径`）在固定源码中不存在，属文档与源码差别，不能照抄使用 [@ref-openhands-docs-plugins-using]。文档列出的来源形式（本地目录、GitHub 仓库）与 SDK 支持一致 [@ref-openhands-docs-plugins-sources]。

## 发现、解析与合并 {#plugins-discovery}

- 单个插件的加载顺序固定为：清单 → skills → hooks → mcp → agents → commands；目录批量加载遇到失败只记录并跳过该目录 [@ref-openhands-sdk-plugin-load-all]。
- 多插件合并由 `load_plugins()` 完成：Skill 按名字覆盖（后者胜）、MCP server 按名字深合并（后者胜）、Hook 配置做拼接式合并；累计 Skill 数超过上限（默认 100）会直接抛错 [@ref-openhands-sdk-plugin-loader]。
- 插件目录里的 MCP 配置在加载阶段保留 `${VAR}` 占位符，真正的变量展开发生在会话初始化，避免用加载时的环境覆盖用户意图 [@ref-openhands-sdk-plugin-loader]。
- 插件提供的 Agent 与项目/用户 Agent 的先后关系见“自定义 Agent”章节 [@ref-openhands-sdk-agents-registry]。
- 文档的 SDK 侧说明（清单结构、组件加载、合并）与上述实现一致 [@ref-openhands-docs-sdkplugins-structure] [@ref-openhands-docs-sdkplugins-manifest]。

CLI 的现实：CLI 创建会话时不传 `plugins=`，因此即使磁盘上装了插件，CLI 会话也不会加载它们；插件能力只能通过 SDK/服务端调用或 Web 端界面使用 [@ref-openhands-cli-setup-conversation]。

## 插件能注册什么 {#plugins-api}

插件可以向宿主贡献四类内容：Skill（含由命令转换来的关键字 Skill）、Hook、MCP server、子代理定义 [@ref-openhands-sdk-plugin-model]。命令转换规则是：每个 `commands/*.md` 生成一个关键字触发 Skill，触发词为 `/<插件名>:<命令名>`，因此用户在提示中打出该命令即可注入指令 [@ref-openhands-sdk-plugin-model]。子代理注册沿用全局注册表的“先注册者优先”，插件 Agent 的优先级高于项目/用户文件、低于程序化注册 [@ref-openhands-sdk-agents-registry]。

权限与宿主 API 边界：插件不被执行、也没有脚本入口，能做的事就是向 Agent 的上下文/工具集/MCP/Hook 管道注入声明式内容；真正的执行权限仍由 Agent 的工具与确认策略决定 [@ref-openhands-sdk-plugin-model]。文档对组件的说明与之一致 [@ref-openhands-docs-plugins-components]；文档描述的根清单 Agent Plugins 格式因版本差别不可用（见上一节）[@ref-openhands-docs-agentplugins-pick]。

## 生命周期与状态 {#plugins-lifecycle}

状态只有“已安装 / 已启用（`enabled` 布尔）”这一层，没有更细的加载/激活状态机 [@ref-openhands-sdk-plugin-info] [@ref-openhands-sdk-plugin-states]：

- 安装记录字段：`name`、`version`、`description`、`enabled`（默认 `True`）、`source`、`resolved_ref`、`repo_path`、`installed_at`、`install_path` [@ref-openhands-sdk-plugin-info]。
- 启用/禁用只改 `enabled` 标志；`load_installed()` 只返回已启用的插件 [@ref-openhands-sdk-plugin-states]。
- 列表读取会自愈：目录已删除的记录被清理，目录存在但未登记的被当作本地插件补登记 [@ref-openhands-sdk-plugin-states]。
- `update()` 按原来源重装并保留启用状态；`uninstall()` 删除目录与记录 [@ref-openhands-sdk-plugin-manager]。
- 文档描述的生命周期（安装到持久目录、启用/禁用）与实现一致 [@ref-openhands-docs-sdkplugins-install] [@ref-openhands-docs-sdkplugins-lifecycle]。

## 诊断 {#plugins-diagnostics}

- 结构错误：清单存在但 JSON 非法、组件文件解析失败会在加载时抛错；批量加载会记录并跳过出错的插件目录，其余插件继续 [@ref-openhands-sdk-plugin-load-all] [@ref-openhands-sdk-plugin-manager]。
- 来源与版本：拉取失败时抛专用错误；成功时记录解析到的 ref，可与 `~/.openhands/plugins/installed/.installed.json` 中的 `resolved_ref` 对照 [@ref-openhands-sdk-plugin-cache] [@ref-openhands-sdk-plugin-info]。
- 文档提供的校验规则（无效包如何被拒绝、清单字段要求）可用于排查包结构问题 [@ref-openhands-docs-agentplugins-invalid]。
- 运行状态：没有结构化诊断对象，只有 SDK 日志；CLI 侧没有任何查询插件的入口，这是 CLI 界面下的缺口 [@ref-openhands-sdk-plugin-manager] [@ref-openhands-cli-main-flags]。
- 版本边界：文档描述的 CLI 插件入口与根清单格式在本固定快照上都不存在，排查“插件不生效”时先确认这两点 [@ref-openhands-docs-plugins-using] [@ref-openhands-docs-agentplugins-pick]。
