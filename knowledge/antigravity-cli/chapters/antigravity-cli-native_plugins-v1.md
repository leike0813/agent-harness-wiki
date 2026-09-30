---
schema_version: 2
record_kind: production
edition_id: antigravity-cli-native_plugins-v1
harness_id: antigravity-cli
topic: native_plugins
title: Antigravity CLI 原生插件：清单、安装、发现、能力面与生命周期诊断
sections:
  - section_id: plugins-overview
    source_refs:
      - ref-agy-native-plugins-bundle
      - ref-agy-native-plugins-components
      - ref-agy-native-plugins-skills-locations
      - ref-agy-native-plugins-skills-managing
      - ref-agy-native-plugins-hooks-cli
      - ref-agy-native-plugins-sidecar-config
      - ref-agy-native-plugins-slash-plugin
  - section_id: plugins-manifest
    source_refs:
      - ref-agy-native-plugins-directory
      - ref-agy-native-plugins-manifest
      - ref-agy-native-plugins-fields
      - ref-agy-native-plugins-schema
      - ref-agy-native-plugins-schema-required
      - ref-agy-native-plugins-validation
      - ref-agy-native-plugins-components
      - ref-agy-native-plugins-changelog-rulesjson
      - ref-agy-native-plugins-changelog-scan
      - ref-agy-native-plugins-changelog-copy
  - section_id: plugins-install
    source_refs:
      - ref-agy-native-plugins-manual
      - ref-agy-native-plugins-interactive
      - ref-agy-native-plugins-shell
      - ref-agy-native-plugins-cli-location
      - ref-agy-native-plugins-marketplace-inline
      - ref-agy-native-plugins-marketplace-manage
      - ref-agy-native-plugins-marketplace-browse
      - ref-agy-native-plugins-changelog-install-path
      - ref-agy-native-plugins-changelog-managed-dir
      - ref-agy-native-plugins-changelog-submodule
      - ref-agy-native-plugins-changelog-github-subpath
      - ref-agy-native-plugins-changelog-vars
  - section_id: plugins-discovery
    source_refs:
      - ref-agy-native-plugins-changelog-discovery
      - ref-agy-native-plugins-changelog-scan
      - ref-agy-native-plugins-changelog-copy
      - ref-agy-native-plugins-changelog-collision
      - ref-agy-native-plugins-changelog-skill-prefix
      - ref-agy-native-plugins-changelog-mcp-namespace
      - ref-agy-native-plugins-changelog-agent-dedup
      - ref-agy-native-plugins-changelog-inherit-customizations
      - ref-agy-native-plugins-changelog-inherit-user
      - ref-agy-native-plugins-changelog-global-mcp
      - ref-agy-native-plugins-changelog-cwd
  - section_id: plugins-api
    source_refs:
      - ref-agy-native-plugins-components
      - ref-agy-native-plugins-changelog-rulesjson
      - ref-agy-native-plugins-changelog-hooks-list
      - ref-agy-native-plugins-changelog-hooks-disabled
      - ref-agy-native-plugins-changelog-mcp-panel
      - ref-agy-native-plugins-changelog-tool-limit
      - ref-agy-native-plugins-sidecar-config
  - section_id: plugins-lifecycle
    source_refs:
      - ref-agy-native-plugins-changelog-enablement
      - ref-agy-native-plugins-changelog-mcp-default-disabled
      - ref-agy-native-plugins-changelog-managed-dir
      - ref-agy-native-plugins-changelog-disable-list
      - ref-agy-native-plugins-changelog-hooks-disabled
      - ref-agy-native-plugins-changelog-upgrade-cache
      - ref-agy-native-plugins-sidecar-userconfig
  - section_id: plugins-diagnostics
    source_refs:
      - ref-agy-native-plugins-shell
      - ref-agy-native-plugins-marketplace-discover
      - ref-agy-native-plugins-marketplace-installed
      - ref-agy-native-plugins-changelog-disable-list
      - ref-agy-native-plugins-changelog-mcp-panel
      - ref-agy-native-plugins-changelog-hooks-list
      - ref-agy-native-plugins-changelog-upgrade-cache
      - ref-agy-native-plugins-cli-location
questions:
  - question_id: plugins.model
    section_id: plugins-overview
    status: answered
    source_refs:
      - ref-agy-native-plugins-bundle
      - ref-agy-native-plugins-components
      - ref-agy-native-plugins-skills-locations
      - ref-agy-native-plugins-skills-managing
      - ref-agy-native-plugins-hooks-cli
      - ref-agy-native-plugins-sidecar-config
      - ref-agy-native-plugins-slash-plugin
  - question_id: plugins.package
    section_id: plugins-manifest
    status: partial
    source_refs:
      - ref-agy-native-plugins-directory
      - ref-agy-native-plugins-manifest
      - ref-agy-native-plugins-fields
      - ref-agy-native-plugins-schema
      - ref-agy-native-plugins-schema-required
      - ref-agy-native-plugins-validation
      - ref-agy-native-plugins-components
      - ref-agy-native-plugins-changelog-rulesjson
  - question_id: plugins.install
    section_id: plugins-install
    status: partial
    source_refs:
      - ref-agy-native-plugins-manual
      - ref-agy-native-plugins-interactive
      - ref-agy-native-plugins-shell
      - ref-agy-native-plugins-cli-location
      - ref-agy-native-plugins-marketplace-inline
      - ref-agy-native-plugins-marketplace-manage
      - ref-agy-native-plugins-changelog-install-path
      - ref-agy-native-plugins-changelog-managed-dir
      - ref-agy-native-plugins-changelog-submodule
      - ref-agy-native-plugins-changelog-github-subpath
      - ref-agy-native-plugins-changelog-vars
  - question_id: plugins.discovery
    section_id: plugins-discovery
    status: partial
    source_refs:
      - ref-agy-native-plugins-changelog-discovery
      - ref-agy-native-plugins-changelog-scan
      - ref-agy-native-plugins-changelog-copy
      - ref-agy-native-plugins-changelog-collision
      - ref-agy-native-plugins-changelog-skill-prefix
      - ref-agy-native-plugins-changelog-mcp-namespace
      - ref-agy-native-plugins-changelog-agent-dedup
      - ref-agy-native-plugins-changelog-inherit-customizations
  - question_id: plugins.api
    section_id: plugins-api
    status: partial
    source_refs:
      - ref-agy-native-plugins-components
      - ref-agy-native-plugins-changelog-rulesjson
      - ref-agy-native-plugins-changelog-hooks-list
      - ref-agy-native-plugins-changelog-hooks-disabled
      - ref-agy-native-plugins-changelog-mcp-panel
      - ref-agy-native-plugins-changelog-tool-limit
      - ref-agy-native-plugins-sidecar-config
  - question_id: plugins.lifecycle
    section_id: plugins-lifecycle
    status: partial
    source_refs:
      - ref-agy-native-plugins-changelog-enablement
      - ref-agy-native-plugins-changelog-mcp-default-disabled
      - ref-agy-native-plugins-changelog-managed-dir
      - ref-agy-native-plugins-changelog-disable-list
      - ref-agy-native-plugins-changelog-hooks-disabled
      - ref-agy-native-plugins-changelog-upgrade-cache
      - ref-agy-native-plugins-sidecar-userconfig
  - question_id: plugins.diagnostics
    section_id: plugins-diagnostics
    status: partial
    source_refs:
      - ref-agy-native-plugins-shell
      - ref-agy-native-plugins-marketplace-discover
      - ref-agy-native-plugins-marketplace-installed
      - ref-agy-native-plugins-changelog-disable-list
      - ref-agy-native-plugins-changelog-mcp-panel
      - ref-agy-native-plugins-changelog-hooks-list
      - ref-agy-native-plugins-changelog-upgrade-cache
---

本章只依据已登记的固定来源：官方文档站的文档快照（取于 2026-09-30，未注明适用软件版本）与官方仓库在提交 `77b1aad` 处的登记文档、CHANGELOG 与示例。Antigravity CLI 没有官方 npm 包，也不建立软件版本映射，整章按 source_only 阅读；CHANGELOG 条目按仓库快照行号引用。Antigravity 官方文档站多个页面是多形态共享页（同一页面内分为 Antigravity 2.0、Antigravity CLI、Antigravity IDE 三个 tab 区块），本章只把 CLI tab 描述的机制算作 Antigravity CLI 的机制；涉及其他形态的说法会明确标注归属，不适用于 CLI 的不会写成 CLI 功能。另外，页面上多处路径说法不一致（例如插件暂存目录与共享配置目录），本章并列给出，不替官方择一。

## 插件是什么：与 Skill、MCP、Hook、Subagent 的关系 {#plugins-overview}

在 Antigravity CLI 里，「原生插件」（plugin）是一个可部署资产的打包单位：官方定义是「Plugins package reusable skills, background subagents, linting rules, Model Context Protocol (MCP) servers, and lifecycle hooks into a single deployable asset」，即把可复用技能、后台子代理、lint 规则、MCP 服务器和生命周期钩子打包成一个可部署资产。 [@ref-agy-native-plugins-bundle]

这个包落到磁盘上就是一个目录：根下必需一份 `plugin.json` 清单，其余按类型放可选子目录或文件。插件能携带的组件被逐项列成五类：`skills/`（内含 `SKILL.md` 的技能子目录）、`agents/`（定义自定义子代理与人格的 Markdown 文件）、`rules/`（行为约束或风格指南的 Markdown）、`mcp_config.json`（连接外部工具服务器的声明）、`hooks.json`（在工具调用前后执行 shell 命令的事件处理器）。 [@ref-agy-native-plugins-components]

因此它与四种相邻概念的关系是：

- **与 Skill**：插件不重新定义技能，只是把技能目录一并分发。CLI 的插件提供的技能落在全局配置下的插件目录里，路径形如 `~/.gemini/antigravity-cli/plugins/PLUGIN_NAME/skills/`，与工作区技能、全局技能并列；CLI 还会把每个技能自动转成交互式 TUI 里的斜杠命令。 [@ref-agy-native-plugins-skills-locations] 官方技能页也把「打包进插件、用 `agy plugin` 管理」列为技能的用法之一。 [@ref-agy-native-plugins-skills-managing]
- **与 MCP server**：`mcp_config.json` 只是声明，插件本身不是 MCP server。插件携带的服务器会被宿主并入 MCP 体系，并在命名冲突时被自动命名空间化（见「发现、加载与命名冲突」一节）。
- **与 Hook 脚本**：`hooks.json` 是插件可携带的组件之一，CLI 把它列为 hook 的「插件级」来源，即打包在已安装插件的 `hooks.json` 里；用 `/hooks` 可以查看当前加载并生效的 hook。 [@ref-agy-native-plugins-hooks-cli]
- **与 sidecar**：插件目录下的 `sidecars/` 是 sidecar 的两种来源之一，插件 sidecar 的 ID 形如 `PLUGIN_NAME/SIDECAR_NAME`。 [@ref-agy-native-plugins-sidecar-config]

与「普通包」的区别在于：固定来源里没有包管理器层面的依赖声明、注册表或版本约束的语法与契约（属缺口），插件就是一个目录，分发渠道是 marketplace 或本地/远程路径；CLI 里用 `/plugin`（别名 `/plugins`）打开交互式 Plugins Manager 或执行内联子命令来管理这些包。 [@ref-agy-native-plugins-slash-plugin]

## 插件目录、plugin.json 清单与校验 {#plugins-manifest}

**包格式与入口。** 插件是一个目录，必须包含清单文件 `plugin.json`，并由它把目录标识为插件并定义元数据；除此之外按需放组件目录或文件。 [@ref-agy-native-plugins-directory] [@ref-agy-native-plugins-manifest] 官方给出的目录结构如下（`PLUGIN_NAME` 为插件目录名，`SKILL_NAME`、`AGENT_NAME`、`RULE_NAME` 为各自条目名）：

```text
plugins/PLUGIN_NAME/
├── plugin.json       # Required marker and manifest file
├── mcp_config.json   # Optional MCP server definitions
├── hooks.json        # Optional hooks definition
├── skills/           # Optional skills directory
│   └── SKILL_NAME/
│       └── SKILL.md
├── agents/           # Optional subagent definition templates
│   └── AGENT_NAME.md
└── rules/            # Optional rules directory
    └── RULE_NAME.md
```

**清单第一方字段。** 官方文档只列出两个字段 [@ref-agy-native-plugins-fields]：

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `name` | String | CLI 下**必填**；Antigravity 2.0 与 IDE 中可选 | 机器可读的插件唯一名，匹配 `^[a-zA-Z0-9-_]+$`；通过 Antigravity CLI 命令管理插件时为必填，在 2.0 或 IDE 中省略则取文件夹名 |
| `description` | String | 否 | 人类可读的用途说明，展示在插件列表里 |

最小清单即是文档给出的三键示例：

```json
{
  "$schema": "https://antigravity.google/schemas/v1/plugin.json",
  "name": "my-custom-plugin",
  "description": "A brief description of what my plugin does."
}
```

**Schema 约束。** 官方同时给出完整 JSON Schema：顶层 `type` 为 `object`，`properties` 只含 `name`（`type: string`，`pattern` 为 `^[a-zA-Z0-9-_]+$`）与 `description`（`type: string`），并且 `required` 为 `["name"]`、`additionalProperties` 为 `false`。 [@ref-agy-native-plugins-schema] [@ref-agy-native-plugins-schema-required] 也就是说除 `name` 与 `description` 之外，清单里写入其他键会被 schema 判为不合法；`name` 必须满足该字符集正则。把 `$schema` 指向官方 URL 只是为了让编辑器（VS Code、JetBrains 系）提供自动补全和校验提示，不改变上述约束。 [@ref-agy-native-plugins-validation]

**组件清单。** 可携带的组件仍是那五类：`skills/`、`agents/`、`rules/`、`mcp_config.json`、`hooks.json`。 [@ref-agy-native-plugins-components] 其中规则除目录形式外，还支持插件顶层的 `rules.json`，用来像声明技能那样声明随包分发的规则文件。 [@ref-agy-native-plugins-changelog-rulesjson]

**复制与扫描行为（来自仓库快照）。** 插件导入时会复制整个插件目录，而不是只挑技能相关目录，因此 `shared/` 这类非技能目录会被保留 [@ref-agy-native-plugins-changelog-copy]。`skills.json`、`rules.json`、`agents.json`、`plugins.json` 里的目录条目按「只加载目录直接子项」扫描（与 `.agents/skills/` 一致），不再递归加载其下所有内容；要加载嵌套条目需在 `include_only` 里具名，例如 `{"path": "shared_skills", "include_only": ["category/my-skill"]}` [@ref-agy-native-plugins-changelog-scan]。

**缺口（本节未答部分）。** 官方 Schema 与字段表里都没有版本号、依赖声明或「适用软件版本 / 兼容性」字段，文档也没有说明插件如何声明所兼容的 CLI 版本。因此「兼容声明」这一问在本章无法给出可用语法，状态记为 partial：已知的包格式、入口、清单字段与校验规则如上，版本与兼容性声明无从确认。

## 安装来源、安装位置与管理命令 {#plugins-install}

**两种安装来源。** 一是 marketplace：`/plugin install PLUGIN_NAME@MARKETPLACE_NAME`（文档示例为 `/plugin install firebase@agent-marketplace`，输出 `Successfully installed plugin "firebase" from "agent-marketplace"`）；二是本地目录：`/plugin install LOCAL_PATH`，也可以从 Plugins Manager 的 Discover 页选择「Install from local directory」后输入本地路径。 [@ref-agy-native-plugins-marketplace-inline] [@ref-agy-native-plugins-interactive] 仓库快照补充了一条远程来源：支持直接从 GitHub 子路径安装插件（含分支解析） [@ref-agy-native-plugins-changelog-github-subpath]，并且外部插件安装会自动解析并初始化 Git submodule [@ref-agy-native-plugins-changelog-submodule]。安装后插件内的变量（例如 Gemini CLI 时代遗留的 `${extensionPath}`）会解析到最终的安装目录 [@ref-agy-native-plugins-changelog-vars]。

**交互入口 `/plugin`。** 在交互式 TUI 会话里运行 `/plugin`（别名 `/plugins`）打开 Plugins Manager：Discover 页浏览市场、从本地目录安装；Installed 页启用、禁用、卸载。 [@ref-agy-native-plugins-interactive] 该面板的按键约定是 Tab 切换 Installed / Discover，上下键导航，Enter 展开详情，空格切换启用/禁用，Ctrl+S 安装或卸载，Esc 退出 [@ref-agy-native-plugins-marketplace-manage]；内联子命令覆盖 `install`、`uninstall`、`enable`、`disable`、`list` [@ref-agy-native-plugins-marketplace-inline]。

**shell 入口 `agy plugin`。** 不在交互式 TUI 会话时，用 `agy plugin` 子命令管道管理：

```bash
# 列出所有活动包及其已加载组件
agy plugin list

# 把本地插件包目录暂存到你的 profile
agy plugin install /path/to/local/plugin

# 只切换启用状态、不删除文件
agy plugin disable PLUGIN_NAME
agy plugin enable PLUGIN_NAME

# 删除插件文件并清理配置登记
agy plugin uninstall PLUGIN_NAME
```

其中 `list` 列出「所有活动包及其加载的组件」，`enable`/`disable` 只切换状态而不删文件，`uninstall` 会移除插件文件并清理配置登记。 [@ref-agy-native-plugins-shell]

**卸载与重装的精确语义（仓库快照）。** 重装插件会精确替换其受管目录，源目录里已删除的文件不会再残留；从插件自身已安装目录发起安装会被拒绝以免损坏安装；卸载不再把启用/禁用条目遗留在 `config.json` 里。 [@ref-agy-native-plugins-changelog-managed-dir] 下载安装的落点是共享配置目录 `~/.gemini/config/`，而不是私有应用数据目录，这样插件可被立即发现。 [@ref-agy-native-plugins-changelog-install-path]

**用户级与项目级。** 手动放置时有两个位置：工作区级放在工作区根目录的 `.agents/plugins/`，仅在该项目内激活；全局级放在 `~/.gemini/config/plugins/`，在这台机器的所有工作区激活。 [@ref-agy-native-plugins-manual] 文档另有一处「CLI 文件系统位置」说安装时 CLI 会把插件资产暂存在全局配置目录 `~/.gemini/antigravity-cli/plugins/PLUGIN_NAME/` [@ref-agy-native-plugins-cli-location]。与之相关的还有跨形态同步：在 Antigravity 2.0 中安装的插件会自动同步并出现在 CLI 的 Installed 页 [@ref-agy-native-plugins-marketplace-browse]。

**版本固定 / 更新：缺口。** 文档与仓库快照里唯一出现的版本概念是 Discover / Installed 详情视图展示的「Version」字段，以及安装来源里的 marketplace 名；没有任何「版本约束语法」「锁定到某版本」「指定版本安装」的写法，也没有说明更新检查与升级入口。marketplace 缓存会在启动时清理被取代的插件版本与暂存目录，可间接说明存在版本化的缓存，但不构成用户可用的固定版本手段。因此本节状态记为 partial：安装、启用/禁用、卸载与用户级/项目级区分已可操作，版本固定与升级语义无从确认。此外三处路径说法（`.agents/plugins/`、`~/.gemini/config/plugins/`、`~/.gemini/antigravity-cli/plugins/`）分别来自不同页面，需要运行观察才能判定 CLI 实际从哪一处加载。

## 发现、加载与命名冲突 {#plugins-discovery}

**发现与加载。** 仓库快照给出的机制是「插件发现」：CLI 会自动扫描已安装插件目录，使插件内的自定义技能与专用代理对执行可用。 [@ref-agy-native-plugins-changelog-discovery] 目录条目的扫描规则见上一节（`plugins.json` 等只加载直接子项，非递归，嵌套需 `include_only`） [@ref-agy-native-plugins-changelog-scan]；导入时整目录复制，非技能目录不会丢失 [@ref-agy-native-plugins-changelog-copy]。全局安装的插件所携带的 MCP server 会在 CLI 启动时初始化，并在插件启用/禁用时更新其运行状态 [@ref-agy-native-plugins-changelog-global-mcp]；插件定义的 MCP server 若使用相对或未设置的 working directory，会以插件自身目录为基准解析，从而让随包脚本能正确运行 [@ref-agy-native-plugins-changelog-cwd]。

**命名冲突与命名空间。** 已记录的行为有三处：插件携带的 MCP server 会以「插件名 + 下划线 + 服务器名」（即 `plugin_server` 形态，官方原文写作 `plugin` 与 `server` 用下划线拼接）自动命名空间化，避免与彼此或与 `mcp_config.json` 里的用户自定义服务器重名 [@ref-agy-native-plugins-changelog-mcp-namespace]；插件技能生成的斜杠命令带插件前缀命名空间，当技能 frontmatter 的 `name` 已含插件前缀时曾出现双前缀，多个插件定义同名短技能时会出现遮蔽（均已修） [@ref-agy-native-plugins-changelog-skill-prefix]；同名代理跨多个配置来源或插件被发现时，`/agents` 选择器里只保留一条 [@ref-agy-native-plugins-changelog-agent-dedup]。此外，显式在配置里设置的技能与插件路径在重名时胜出，不会被就近自动发现的定制覆盖 [@ref-agy-native-plugins-changelog-collision]。

**定制继承。** Markdown 定义的代理有一个 `inheritCustomizations` 开关，决定该代理是否采用你的技能、规则、插件、子代理与 MCP 服务器 [@ref-agy-native-plugins-changelog-inherit-customizations]；相关修复表明 `inherit_user` 设为 false 只应放弃个人定制，不应让 CLI 自带的内置技能、规则与插件消失，故内置插件的存在与用户级开关相互独立 [@ref-agy-native-plugins-changelog-inherit-user]。

**缺口。** 文档没有给出插件之间的依赖解析、显式加载顺序、失败隔离或「一个插件加载失败时其余插件是否继续」的规则，也没有说明校验失败时（例如 `plugin.json` 缺失或 `name` 不合法）CLI 的行为。因此本节状态为 partial：发现来源、扫描粒度、复制语义与三类命名冲突处理有据可查，依赖与加载顺序无从确认。

## 插件携带的能力与宿主边界 {#plugins-api}

**可注册的扩展点。** 插件能贡献的能力就是五类组件：`skills/` 提供技能（并自动获得斜杠命令入口）、`agents/` 提供自定义子代理与人格、`rules/` 提供行为约束或风格指南、`mcp_config.json` 提供外部工具服务器声明、`hooks.json` 提供工具调用前后的事件处理器。 [@ref-agy-native-plugins-components] 插件还可用顶层 `rules.json` 声明随包分发的规则文件 [@ref-agy-native-plugins-changelog-rulesjson]，并通过目录下的 `sidecars/` 携带后台 sidecar，其 ID 为 `PLUGIN_NAME/SIDECAR_NAME` [@ref-agy-native-plugins-sidecar-config]。这些能力在 CLI 的检查面板里可见：`/hooks` 会把启用插件内的 `hooks.json` 一并列出 [@ref-agy-native-plugins-changelog-hooks-list]，`/mcp` 面板允许在 MCP server 与插件之间导航并对其执行操作 [@ref-agy-native-plugins-changelog-mcp-panel]。

**启用状态对能力面的约束。** 禁用插件应当同时停止其 hook 与其他定制贡献——快照记录过一个缺陷：被禁用的插件仍在运行 hook 并提供其他定制，可能让坏 hook 继续生效甚至破坏文件编辑工具 [@ref-agy-native-plugins-changelog-hooks-disabled]。工具数量上也存在会话级上限，大量 MCP、插件与技能的组合曾因工具声明过多被拒，后提高了每会话的工具声明上限以为重度组合留出余量 [@ref-agy-native-plugins-changelog-tool-limit]。

**权限与宿主 API 边界：缺口。** 官方固定来源没有定义「插件 API」这一层：没有插件可调用的宿主函数清单、没有插件级权限声明字段、没有插件与沙箱/权限体系交互的说明。插件对外的影响完全通过上述声明式组件（技能文本、规则、hook shell 命令、MCP 声明、sidecar 进程）转达，插件自身不获得一份可编程 API。因此本节状态为 partial：扩展点与启用约束有据，权限模型与宿主 API 边界无从确认。

## 安装、启用、加载与健康状态 {#plugins-lifecycle}

把「已安装」与「已启用」拆开看，是本章能确认的核心区分。

- **已安装**：插件目录存在于发现位置（工作区 `.agents/plugins/`、全局 `~/.gemini/config/plugins/` 或 CLI 暂存目录之一）。重装会精确替换受管目录，因此安装态与源目录内容一致。 [@ref-agy-native-plugins-changelog-managed-dir]
- **已启用**：启用状态只存在于 `~/.gemini/config/config.json`，且在插件首次出现时由其清单一并播种；这条集中化设计意味着清单里后来写的 `"disabled": true` 不会替已经启用的用户关掉插件，发行方改默认值也不会在下次发布时移动所有用户。 [@ref-agy-native-plugins-changelog-enablement] 直接放进 `~/.gemini/config/plugins/` 的插件，若其 MCP server 需要配置变量，会先以禁用状态起步，直到你手动启用，与通过 `/plugin` 安装的插件一致。 [@ref-agy-native-plugins-changelog-mcp-default-disabled]
- **卸载**：卸载会移除插件文件并清掉 `config.json` 里的启用/禁用条目；禁用则不删文件，只改状态。 [@ref-agy-native-plugins-changelog-managed-dir]
- **禁用后仍可见**：被禁用的插件仍会出现在 `/plugin` 列表里（曾出现启用态查询后禁用插件从列表消失的缺陷，已修），因此列表可见性不等于启用。 [@ref-agy-native-plugins-changelog-disable-list]
- **禁用应停用其能力**：期望行为是禁用后其 hook 与其他定制不再贡献 [@ref-agy-native-plugins-changelog-hooks-disabled]。

启用状态的另一处佐证来自 sidecar：sidecar 默认禁用，除非在全局配置 `~/.gemini/config/config.json` 的 `sidecars` 映射里显式 `enabled`，插件 sidecar 也以 `PLUGIN_NAME/SIDECAR_NAME` 作为键出现在同一处。 [@ref-agy-native-plugins-sidecar-userconfig]

**升级与缓存。** marketplace 缓存在启动时清理被取代的插件版本与暂存目录，插件升级也曾遗留过从已删除安装目录继续运行的旧 MCP server 与 sidecar 进程（已修）。 [@ref-agy-native-plugins-changelog-upgrade-cache]

**缺口：加载中 / 已激活 / 健康。** 固定来源里没有独立的「加载中」「已激活」「健康 / 不健康」状态，也没有健康检查入口；能区分的最细粒度是「文件在不在」「`config.json` 里的启用位」「进程是否在跑（MCP server、sidecar）」。因此本节状态为 partial：安装、启用、卸载与升级清理有据可查，激活过程与健康度无从确认。

## 诊断入口与版本查询 {#plugins-diagnostics}

**列出与状态查询。** shell 侧用 `agy plugin list` 列出所有活动包及其已加载组件 [@ref-agy-native-plugins-shell]；TUI 侧 `/plugin` 的 Installed 页列出已安装插件并支持启用/禁用与卸载 [@ref-agy-native-plugins-marketplace-installed]。禁用插件仍会出现在 `/plugin` 列表里，因此列表是「已安装集合」，不是「已启用集合」 [@ref-agy-native-plugins-changelog-disable-list]。插件资产本身落在 CLI 的全局配置目录 `~/.gemini/antigravity-cli/plugins/PLUGIN_NAME/`，这是排查文件缺失时的定位起点 [@ref-agy-native-plugins-cli-location]。

**版本与来源的查询位置。** Discover 页展开插件详情时会显示 Description、包含的组件（MCP server、技能、规则、代理等）、Marketplace 名与 Version [@ref-agy-native-plugins-marketplace-discover]；Installed 页展开详情时会显示 Description、技能、MCP server、规则、代理、Marketplace 名、本地安装路径与 Version [@ref-agy-native-plugins-marketplace-installed]。也就是说插件版本只在这两个详情视图里可见，没有独立的版本查询命令。

**组件级诊断入口。** 插件携带的 hook 会用 `/hooks` 列出（连同启用插件内的 `hooks.json`）[@ref-agy-native-plugins-changelog-hooks-list]；插件携带的 MCP server 在 `/mcp` 面板里与普通 MCP server 并列，可用方向键导航并执行操作 [@ref-agy-native-plugins-changelog-mcp-panel]。升级相关的问题可从缓存清理行为判断：被取代的插件版本与暂存目录会在启动时从 marketplace 缓存清理 [@ref-agy-native-plugins-changelog-upgrade-cache]。

**缺口：错误定位。** 固定来源没有登记任何插件专属的错误日志、加载失败提示或「插件解析失败」诊断入口；troubleshooting 页只覆盖 PATH、keyring、SSH 剪贴板与自更新锁，未涉及插件。因此当插件加载或兼容性出错时，当前能依赖的只有组件级面板（`/hooks`、`/mcp`）与 `agy plugin list` 是否列出该插件，状态记为 partial：版本与运行状态有可观察入口，兼容、依赖与加载错误的定位方式无从确认。
