---
schema_version: 3
record_kind: production
edition_id: junie-cli-native_plugins-v1
harness_id: junie
topic: native_plugins
title: "Junie CLI 的原生扩展：组件打包、市场、安装与加载"
sections:
  - section_id: plugins-scope
    surface_ids: [cli]
    source_refs: [ref-junie-extensions-overview, ref-junie-quickstart-overview]
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-junie-extensions-overview, ref-junie-quickstart-extend, ref-junie-skills-locations, ref-junie-hooks-extension, ref-junie-agents-overview, ref-junie-mcp-json]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-junie-extensions-marketplaces, ref-junie-extensions-builtin]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-junie-extensions-install, ref-junie-extensions-remove, ref-junie-extensions-store, ref-junie-env-extensions, ref-junie-params-discovery]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-junie-extensions-marketplaces, ref-junie-extensions-builtin, ref-junie-extensions-install, ref-junie-hooks-merge, ref-junie-hooks-extension, ref-junie-skills-locations]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-extensions-install, ref-junie-extensions-remove, ref-junie-extensions-store, ref-junie-hooks-failure, ref-junie-skills-manage, ref-junie-extensions-overview]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-junie-extensions-overview, ref-junie-quickstart-extend, ref-junie-skills-locations, ref-junie-hooks-extension, ref-junie-agents-overview, ref-junie-mcp-json]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-junie-extensions-marketplaces, ref-junie-extensions-builtin]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-junie-extensions-install, ref-junie-extensions-remove, ref-junie-extensions-store, ref-junie-env-extensions, ref-junie-params-discovery]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: partial
        source_refs: [ref-junie-extensions-marketplaces, ref-junie-extensions-builtin, ref-junie-extensions-install, ref-junie-hooks-merge, ref-junie-hooks-extension, ref-junie-skills-locations]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: partial
        source_refs: [ref-junie-extensions-overview, ref-junie-hooks-extension, ref-junie-skills-locations, ref-junie-agents-overview]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: partial
        source_refs: [ref-junie-extensions-install, ref-junie-extensions-store, ref-junie-extensions-remove]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: partial
        source_refs: [ref-junie-extensions-install, ref-junie-extensions-remove, ref-junie-extensions-store, ref-junie-hooks-failure, ref-junie-skills-manage]
---

## 固定来源与适用范围 {#plugins-scope}

本章依据 Junie 官方文档站 `junie.jetbrains.com/docs` 的 `junie-cli-extensions.html`、
`junie-cli-hooks.html`、`agent-skills.html`、`junie-cli-subagents.html`、
`junie-cli-mcp-configuration.html`、`parameters.html`、`environment-variables.html` 与
`junie-cli.html` 快照，未标注适用构建号，属来源级知识。Junie CLI 的原生扩展机制叫
**extension**，命令行入口为 `/extensions`（别名 `/plugin`、`/plugins`）
[@ref-junie-extensions-overview][@ref-junie-quickstart-overview]。

## 插件模型 {#plugins-model}

**plugins.model**。扩展是可复用的打包单元，用于给 Junie CLI 增加项目或领域相关能力；单个扩展可同时
打包以下任意组合的组件 [@ref-junie-extensions-overview]：

- Agent skills（技能随包提供，安装后并入技能发现范围）[@ref-junie-skills-locations]。
- MCP servers（可用 MCP JSON 配置）[@ref-junie-mcp-json]。
- Subagents（自定义子代理）[@ref-junie-agents-overview]。
- Custom slash commands（自定义斜杠命令）。
- Guidelines（指南）。
- Hooks（hook，见 `hooks/hooks.json`）[@ref-junie-hooks-extension]。

因此扩展与 Skill、MCP server、Hook 脚本不是同一层概念：Skill/MCP/Hook/agents/commands 是可被扩展
打包的组件类型，扩展是分发与安装单位；“普通包”不在该机制内——官方列出的扩展点是 MCP、Agent
skills、Subagents、自定义斜杠命令与 guidelines
[@ref-junie-quickstart-extend][@ref-junie-extensions-overview]。

## 包格式与市场 {#plugins-package}

**plugins.package**。扩展通过 marketplace 分发，marketplace 用一份清单列出可用扩展及其内容托管
位置。支持三种托管方式：git 仓库（GitHub、GitLab、自托管或任意主机）、本机目录，以及直接指向
`marketplace.json` 的 HTTP(S) URL。manifest 支持两种格式（三种托管方式通用）[@ref-junie-extensions-marketplaces]：

- Junie 原生格式：`.junie-extension/marketplace.json`。
- Claude plugin 格式：`.claude-plugin/marketplace.json`（因此任何 Claude 兼容市场都能接入）。

Junie CLI 预注册了官方 JetBrains 市场 `https://github.com/JetBrains/junie-extensions`，内含 Junie
团队维护的扩展（如 Java、Kotlin、Android、Spring Boot、SQL、Redis）。内置市场不可移除
[@ref-junie-extensions-builtin]。固定来源没有给出单个扩展自身的 manifest 字段清单或兼容性声明
字段，因此关于扩展包入口与元数据的细节本项按 partial 阅读。

## 安装、更新与卸载 {#plugins-install}

**plugins.install**。安装流程：运行 `/extensions` 打开扩展界面，浏览已注册市场里的目录或搜索，
选中扩展后选择安装作用域 [@ref-junie-extensions-install]：

- 项目作用域：只在当前项目启用，引用写入项目根 `.junie/extensions.json`（可提交版本库共享）。
- 用户作用域：对本机所有项目启用，引用写入 `~/.junie/extensions/extensions.json`
  （Windows 为 `%USERPROFILE%\.junie\extensions\extensions.json`）。

也可用尾部参数直接执行，如 `/extensions install 扩展名`；新装扩展在当前运行会话内即可用，无需重启
[@ref-junie-extensions-install]。卸载：在 Installed 页选中扩展并 Remove，引用从对应
`extensions.json` 删除，`~/.junie/extensions/` 下的缓存内容在重装时可能被复用
[@ref-junie-extensions-remove]。更新：在 Installed 页选中扩展并 Update，拉取最新版本
[@ref-junie-extensions-remove]。扩展内容（skills、agents、commands、MCP 配置、guidelines、hooks）
统一下载到用户级缓存目录 `~/.junie/extensions/市场名/扩展名/`，跨项目复用
[@ref-junie-extensions-install]。扩展根目录可用 `--extensions-default-location` 或
`JUNIE_EXTENSIONS_DEFAULT_LOCATION` 覆盖（默认 `~/.junie/extensions`）
[@ref-junie-extensions-store][@ref-junie-env-extensions][@ref-junie-params-discovery]。

**plugins.lifecycle**：可观察的状态分为“已注册/已安装/已缓存/已启用”。项目级与用户级的
`extensions.json` 都是“市场标识到已安装扩展列表”的扁平 JSON，并附带类型化的 `source`，使拉取项目
的队友能自动注册市场 [@ref-junie-extensions-store]。缓存内容保存在 `~/.junie/extensions/`，删除引用
后缓存可能留存并在重装时复用；市场注册表与同步状态记在
`~/.junie/extensions/marketplaces.json` [@ref-junie-extensions-remove][@ref-junie-extensions-store]。
固定来源没有“已安装但未激活”等更细状态或版本固定方式的说明，因此本项按 partial 阅读。

## 发现与加载 {#plugins-discovery}

**plugins.discovery**。注册市场时，Junie 依据 spec 类型克隆仓库、探测本机目录或抓取 JSON，然后把它
的扩展列进目录；spec 形式包括 GitHub 仓库、`owner/repo` 简写、`git@github.com:owner/repo`、任意
git 主机 URL、本机路径（相对/绝对/`~/`/`file:///`）与直接指向 `marketplace.json` 的 http(s) URL；
git 或本机来源必须在根目录含 `.junie-extension/marketplace.json` 或
`.claude-plugin/marketplace.json` [@ref-junie-extensions-marketplaces]。内置市场
`JetBrains/junie-extensions` 预注册且不可移除 [@ref-junie-extensions-builtin]。安装后，扩展内容
落在用户级缓存目录，跨项目复用 [@ref-junie-extensions-install]。

加载顺序方面，扩展提供的 hook 与配置文件 hook 在同一事件上串联合并，顺序为“配置文件 hooks 在前，
扩展 hooks 在后（按扩展启用顺序）” [@ref-junie-hooks-merge]；扩展 hook 只能通过 `/extensions` 安装
后激活，且不会从未受信任项目的本地 `config.json` 加载 [@ref-junie-hooks-extension]。扩展提供的技能
会并入技能发现范围 [@ref-junie-skills-locations]。固定来源没有描述依赖解析、命名冲突或校验失败时
的处理，因此本项按 partial 阅读。

**plugins.api**：扩展能贡献的能力就是上述六类组件（skills、MCP servers、subagents、commands、
guidelines、hooks），其中 hook 用 `${CLAUDE_PLUGIN_ROOT}` 或 `${JUNIE_EXTENSION_ROOT}` 引用扩展内
文件以调用随包脚本 [@ref-junie-hooks-extension][@ref-junie-extensions-overview]。文档没有给出可用于
扩展代码的宿主 API、权限边界或沙箱约束，因此本项按 partial 阅读。

## 诊断 {#plugins-diagnostics}

**plugins.diagnostics**：`/extensions` 界面按 tab 组织——Marketplaces 页可添加/移除市场，
Installed 页可卸载与更新扩展，另有目录浏览与搜索 [@ref-junie-extensions-install]
[@ref-junie-extensions-remove]。市场同步状态记录在 `~/.junie/extensions/marketplaces.json`
[@ref-junie-extensions-store]。扩展组件是否生效可分别从各自的诊断入口观察：hook 失败会在 TUI 提示
[@ref-junie-hooks-failure]，技能的发现结果用 `/skills`
[@ref-junie-skills-manage]。固定来源没有提供查询扩展版本或显示加载错误的专门命令，因此本项按
partial 阅读 [@ref-junie-extensions-overview]。
