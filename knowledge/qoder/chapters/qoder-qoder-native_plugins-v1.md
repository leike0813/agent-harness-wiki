---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-native_plugins-v1
harness_id: qoder
topic: native_plugins
title: "Qoder IDE 的原生插件（Plugins）"
sections:
  - section_id: plugins-overview
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-plugins-components, ref-qoder-ide-plugins-use, ref-qoder-ide-plugins-association, ref-qoder-cli-plugin-layout]
  - section_id: plugins-package
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-plugins-create, ref-qoder-cli-plugin-manifest, ref-qoder-cli-plugin-layout]
  - section_id: plugins-install
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-plugins-marketplace, ref-qoder-ide-plugins-install, ref-qoder-ide-plugins-create, ref-qoder-ide-plugins-import]
  - section_id: plugins-lifecycle
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-plugins-manage, ref-qoder-ide-plugins-association, ref-qoder-cli-plugin-manage]
  - section_id: plugins-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-plugins-manage, ref-qoder-ide-plugins-association, ref-qoder-cli-plugin-manage]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [qoder]
        section_id: plugins-overview
        status: answered
        source_refs: [ref-qoder-ide-plugins-components]
  - question_id: plugins.package
    answers:
      - surface_ids: [qoder]
        section_id: plugins-package
        status: partial
        source_refs: [ref-qoder-cli-plugin-manifest, ref-qoder-cli-plugin-layout, ref-qoder-ide-plugins-create]
  - question_id: plugins.install
    answers:
      - surface_ids: [qoder]
        section_id: plugins-install
        status: answered
        source_refs: [ref-qoder-ide-plugins-install, ref-qoder-ide-plugins-marketplace, ref-qoder-ide-plugins-create, ref-qoder-ide-plugins-import]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [qoder]
        section_id: plugins-overview
        status: partial
        source_refs: [ref-qoder-ide-plugins-association, ref-qoder-ide-plugins-use, ref-qoder-cli-plugin-layout]
  - question_id: plugins.api
    answers:
      - surface_ids: [qoder]
        section_id: plugins-overview
        status: answered
        source_refs: [ref-qoder-ide-plugins-components]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [qoder]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-qoder-ide-plugins-manage, ref-qoder-ide-plugins-association, ref-qoder-cli-plugin-manage]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-qoder-ide-plugins-manage, ref-qoder-cli-plugin-manage]
---

## 固定来源与插件模型 {#plugins-overview}

本章按 Qoder IDE（catalog 的 `qoder` 界面）采写，固定来源为官方文档站的 IDE Plugins 页面快照，以及 CLI 的 Plugin Reference 页面（仅在 IDE 页面没有对应说明时用作对照）。所有来源都取自 `docs.qoder.com`（`qoder.com` 指向的官方文档站）；`docs.qoder.cn` 是另一条国内产品线（通义灵码 / Lingma）的文档，本章不引用。Qoder 是闭源产品，没有官方源码仓库可固定 commit。

Qoder IDE 的"原生插件"就是 **Plugins**：把 Skills、MCP Servers、Agents、Commands、Rules、Hooks 的任意组合打成一个包，安装一个插件即可一次性获得一整套协同能力，覆盖从编码、测试到部署的整个开发生命周期。[@ref-qoder-ide-plugins-components]

插件与其它机制的关系：插件不是并列的第四种扩展，而是**分发单位**——它里面装的正是 Skill、MCP server、subagent、Command、Rule、Hook 这些组件；安装后这些能力在 **Editor 与 Quest 中都可调用**，可以自动触发，也可以用 `/plugin-name` 触发，或在插件卡片上点 **Try now** 起一个 Agent 会话试用。[@ref-qoder-ide-plugins-components][@ref-qoder-ide-plugins-use]

发现与归属：属于某个插件的组件会在各自的设置面板里标注 **From Plugin**，由父插件统一管理。[@ref-qoder-ide-plugins-association]

**对照说明（`plugins.discovery`）**：IDE 页面没有描述插件目录的加载顺序或命名冲突规则；CLI 的 Plugin Reference 记录了"未在 manifest 中显式声明时按固定目录约定自动发现组件"（`commands/`、`agents/`、`skills/`、`hooks/hooks.json`、`.mcp.json` 等）。这是 CLI 侧声明，IDE 页面未确认同一布局，故本项按部分回答。[@ref-qoder-cli-plugin-layout]

## 插件包格式与清单 {#plugins-package}

**缺口（`plugins.package`）**：IDE 的 Plugins 页面只说明插件是组件的捆绑包、可从市场安装或自行创建/导入，**没有给出清单文件、入口、元数据字段或兼容声明**。以下内容来自 CLI 的 Plugin Reference，仅作同一产品族的对照，不据此断言 IDE 使用同一格式：[@ref-qoder-ide-plugins-create]

- 清单文件位于 `.qoder-plugin/plugin.json`——官方强调它**不能放在插件根目录**，而要放在 `.qoder-plugin/` 子目录里；该文件可选，省略时按约定目录加载组件并以插件目录名作为插件名。必填字段只有 `name`（kebab-case），可选元数据包括 `version`、`displayName`、`description`、`author`、`homepage`、`repository`、`license`、`keywords`、`dependencies`。[@ref-qoder-cli-plugin-manifest]
- 组件声明字段（`commands`、`agents`、`skills`、`outputStyles`、`workflowsPath(s)`、`hooks`、`mcpServers`、`settings`）用于覆盖约定目录或内联声明；`settings` 当前只支持 `agent` 键。[@ref-qoder-cli-plugin-manifest]
- 约定目录结构：[@ref-qoder-cli-plugin-layout]

```text
plugin-name/
├── .qoder-plugin/
│   └── plugin.json
├── commands/
├── agents/
├── skills/
│   └── skill-name/
│       └── SKILL.md
├── hooks/
│   └── hooks.json
├── output-styles/
├── workflows/
├── bin/
└── .mcp.json
```

CLI 参考页还记录了 marketplace 清单 `marketplace.json`（必填 `name`、`owner`、`plugins`）与插件条目字段（`name`、`source`、`category`、`tags`、`strict`）。这些字段的生效范围是 CLI，IDE 侧是否相同未获证实。[@ref-qoder-cli-plugin-manifest]

## 安装、导入与卸载 {#plugins-install}

市场入口：在 Quest 左侧栏底部点 **Marketplace**，或在 Qoder IDE 设置的 Plugins 面板右上角点 **Marketplace**。插件按分类组织：Featured、Coding、DataBase、Workflow、DevOps、Product Design、Debug & Testing；卡片显示名称、描述、作者、下载量与安装状态，支持关键词搜索、标签与安装状态过滤，点开详情可看到组件列表与插件信息（分类标签、开发者、最近更新、源码链接）。[@ref-qoder-ide-plugins-marketplace]

安装时选择作用域：**User level**（对所有会话生效）或 **Project level**（仅在特定项目生效）。插件**整体安装**——不支持只安装插件中的部分组件。[@ref-qoder-ide-plugins-install]

自定义与导入：在市场右上角点 **+ Create Plugin**，系统会跳到 Chat 区并自动选中内置的 `plugin-creator` Skill，引导用对话方式创建插件；同一入口也可以选择从本地文件夹导入已有插件。[@ref-qoder-ide-plugins-create][@ref-qoder-ide-plugins-import]

**边界**：IDE 页面没有给出版本固定（pin）机制、更新源或卸载流程的命令；这些在 CLI 侧有对应子命令（见下节），IDE 侧以设置面板与市场管理页为准。[@ref-qoder-ide-plugins-install]

## 启用、禁用与状态 {#plugins-lifecycle}

IDE 侧的管理入口有三处：市场右上角的 **Manage**、市场分类列表底部的 **Installed** 过滤、以及 Qoder IDE 设置里的 **Plugins** 面板。Plugins 面板在 Editor 与 Quest 下功能相同，按 **User** / **Project** 标签组织，底部 **Custom** 区有 **Import** 与 **+ New** 按钮，右上角 **Marketplace** 链接直达市场。[@ref-qoder-ide-plugins-manage]

状态语义：**禁用一个插件会一次性禁用它的全部组件**，不需要逐个切换；反过来，属于插件的组件在各自设置面板里标注 **From Plugin**，**不能单独禁用、删除或修改**，必须通过父插件管理。[@ref-qoder-ide-plugins-manage][@ref-qoder-ide-plugins-association]

CLI 侧的状态控制（对照，不据此断言 IDE 具备同一命令集）：交互会话里有 `/plugins`（别名 `/plugin`），支持 `install`/`uninstall`、`enable`/`disable`、`update`、`validate`、`marketplace add|list|remove|update`、`reload`；命令行侧是 `qoder plugins list|install|uninstall|enable|disable|update|validate|marketplace`，其中 `update` 与 `marketplace` 受插件市场功能开关控制。`qoder plugins list --json` 会报告用户级插件登记表中的每次安装，项目级与本地级安装带 `projectPath` 标识所属项目；`enabled` 字段表示该插件 ID 在**当前工作目录**下是否有效启用，并不描述每个已列出项目的设置。[@ref-qoder-cli-plugin-manage]

**缺口**：IDE 页面没有明确区分"已安装 / 已启用 / 已加载 / 已激活 / 健康"这些状态，只给出安装状态、User/Project 归属与禁用语义。[@ref-qoder-ide-plugins-manage]

## 诊断 {#plugins-diagnostics}

- 面板内核对：设置 → Plugins 面板按 User / Project 分标签查看已装插件；市场分类列表底部点 **Installed** 过滤；插件卡片显示安装状态。[@ref-qoder-ide-plugins-manage]
- 组件归属核对：某个 Skill / MCP / Agent 不生效时，先看它在各自设置面板里是否带 **From Plugin** 标记——带标记的组件由父插件管理，改这里无效，要回到插件层面处理。[@ref-qoder-ide-plugins-association]
- CLI 侧可复用的检查手段（对照）：`qoder plugins validate PATH` 校验插件目录或 `plugin.json`；`qoder plugins list --json` 给出登记表与 `enabled`、`projectPath`。[@ref-qoder-cli-plugin-manage]

**缺口（`plugins.diagnostics`）**：固定来源没有提供 IDE 侧的插件版本查询、加载日志或兼容/依赖错误的具体诊断入口；已检查的入口是本页的 Manage plugins、Component association 两节与 CLI 参考页的 Management Commands 一节。[@ref-qoder-ide-plugins-manage]
