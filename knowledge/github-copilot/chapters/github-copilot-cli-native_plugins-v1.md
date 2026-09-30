---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-native_plugins-v1
harness_id: github-copilot
topic: native_plugins
title: "GitHub Copilot CLI 的原生插件：包格式、安装、发现与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-github-copilot-pluginsconc-what, ref-github-copilot-pluginsconc-contain, ref-github-copilot-pluginsconc-where, ref-github-copilot-pluginsconc-compare, ref-github-copilot-cmp-plugins]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-github-copilot-pluginref-pluginjson, ref-github-copilot-pluginref-manifest, ref-github-copilot-pluginref-components, ref-github-copilot-pluginref-example, ref-github-copilot-pluginref-legacy, ref-github-copilot-pluginref-legacy-components, ref-github-copilot-pluginref-legacy-mcp, ref-github-copilot-pluginref-lsp, ref-github-copilot-pluginref-marketplace, ref-github-copilot-pluginref-marketplace-fields, ref-github-copilot-pluginref-source-types, ref-github-copilot-pluginsconc-structure, ref-github-copilot-pluginsconc-structure-ap1, ref-github-copilot-pluginsconc-structure-legacy, ref-github-copilot-pluginsconc-formats, ref-github-copilot-plugins-structure, ref-github-copilot-plugins-creating, ref-github-copilot-plugins-distributing, ref-github-copilot-plugins-market-create]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-github-copilot-pluginref-cli, ref-github-copilot-pluginref-install-spec, ref-github-copilot-pluginref-source-types, ref-github-copilot-plugins-find, ref-github-copilot-plugins-install, ref-github-copilot-plugins-manage, ref-github-copilot-plugins-market-add, ref-github-copilot-plugins-market-remove, ref-github-copilot-plugins-creating, ref-github-copilot-pluginsconc-where, ref-github-copilot-cmdref-plugins, ref-github-copilot-cmdref-commands, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-config]
  - section_id: plugins-discovery-lifecycle
    surface_ids: [cli]
    source_refs: [ref-github-copilot-pluginref-locations, ref-github-copilot-pluginref-loading, ref-github-copilot-pluginref-cli, ref-github-copilot-plugins-creating, ref-github-copilot-cfgdir-overview, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-mdm-keys, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-env]
  - section_id: plugins-api-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-pluginref-components, ref-github-copilot-pluginref-legacy-components, ref-github-copilot-pluginref-legacy-mcp, ref-github-copilot-pluginref-lsp, ref-github-copilot-pluginref-loading, ref-github-copilot-pluginref-cli, ref-github-copilot-pluginref-pluginjson, ref-github-copilot-plugins-manage, ref-github-copilot-cmdref-slash, ref-github-copilot-cfgdir-overview, ref-github-copilot-cfgdir-mdm-keys, ref-github-copilot-best-repo]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-github-copilot-pluginsconc-what, ref-github-copilot-pluginsconc-contain, ref-github-copilot-cmp-plugins]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-github-copilot-pluginref-pluginjson, ref-github-copilot-pluginref-manifest, ref-github-copilot-pluginref-components, ref-github-copilot-pluginref-legacy, ref-github-copilot-pluginref-legacy-components, ref-github-copilot-pluginref-lsp, ref-github-copilot-pluginref-marketplace-fields, ref-github-copilot-pluginref-source-types]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-github-copilot-pluginref-cli, ref-github-copilot-pluginref-install-spec, ref-github-copilot-plugins-install, ref-github-copilot-plugins-manage, ref-github-copilot-plugins-market-add, ref-github-copilot-plugins-market-remove, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-lifecycle
        status: answered
        source_refs: [ref-github-copilot-pluginref-locations, ref-github-copilot-pluginref-loading, ref-github-copilot-cfgdir-overview, ref-github-copilot-cfgdir-repo-settings]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-diagnostics
        status: partial
        source_refs: [ref-github-copilot-pluginref-components, ref-github-copilot-pluginref-legacy-components, ref-github-copilot-pluginref-lsp, ref-github-copilot-pluginref-legacy-mcp]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery-lifecycle
        status: partial
        source_refs: [ref-github-copilot-pluginref-cli, ref-github-copilot-pluginref-locations, ref-github-copilot-plugins-creating, ref-github-copilot-cfgdir-mdm-keys]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-api-diagnostics
        status: partial
        source_refs: [ref-github-copilot-pluginref-cli, ref-github-copilot-pluginref-pluginjson, ref-github-copilot-plugins-manage, ref-github-copilot-cmdref-slash, ref-github-copilot-cfgdir-overview]
---

## 插件模型：什么是原生插件 {#plugins-model}

本章的固定来源是官方文档站 `docs.github.com` 关于 Copilot CLI 插件、插件市场、配置目录与命令参考的 markdown 快照，以及公开仓库 `github.com/github/copilot-cli` 的 `README.md`/`changelog.md`。Copilot CLI 本体闭源，插件运行时实现不可读，因此全章是来源级知识：凡是文档没有写明的加载细节，都按 `partial`/`unknown` 处理，不绑定任何已发布的 npm 版本。

**plugins.model**：在 Copilot 语境中，插件（plugin）是"可安装的包"——一个可分发单元，用来给 Copilot 增加可复用的 agents、skills、hooks 与集成 [@ref-github-copilot-pluginsconc-what]。官方把它定义为"扩展 Copilot 功能的可分发包"，即"把一组组件打包成单一可安装单元" [@ref-github-copilot-pluginsconc-what]。与单体配置相比，插件本身不是一种新的能力类型，而是同一批组件（自定义 agent、skill、hook、MCP server 配置、LSP server 配置）的**分发与安装载体** [@ref-github-copilot-pluginsconc-contain][@ref-github-copilot-cmp-plugins]。

因此插件与题面中其它四类机制的关系是"容器 vs 内容"：

- 插件**可以包含** skills、hooks、自定义 agents、MCP server 配置、LSP server 配置 [@ref-github-copilot-pluginsconc-contain]。
- 插件**不是** skill、MCP server 或 hook 脚本本身；后三者也可脱离插件、被手工配置进 Copilot [@ref-github-copilot-pluginsconc-compare]。
- 插件**不是**普通 npm 包：npm 包由包管理器安装，插件由 `copilot plugin` 或配置里的 `enabledPlugins` 安装与激活 [@ref-github-copilot-pluginsconc-where]。

官方给出的使用理由是：跨项目复用、团队标准化 Copilot 配置、分享领域专长（例如 Rails 或 Kubernetes 专家）、把复杂的 MCP server 搭建封装起来 [@ref-github-copilot-pluginsconc-contain]。相对"在仓库里手工配置"，插件的差别集中在四点——作用域从"单仓库"变为"任意项目"，共享从"手工复制粘贴"变为"安装命令或 `enabledPlugins` 条目"，版本管理从"git 历史"变为"市场版本"，发现途径从"翻仓库"变为"浏览市场" [@ref-github-copilot-pluginsconc-compare]。

**来源边界**：本章只覆盖 Copilot CLI 这一界面。插件概念页同时提到 Copilot cloud agent 与 GitHub Copilot app 的安装方式，但那是其它界面，本章不展开；CLI 侧的行为以插件参考与配置目录参考为准 [@ref-github-copilot-pluginsconc-where]。

## 插件包：清单、格式与组件 {#plugins-package}

**plugins.package**：插件是一个目录，目录内必须有一个名为 `plugin.json` 的清单（manifest）文件；清单给出插件名与元数据，并按格式指向组件 [@ref-github-copilot-pluginsconc-structure]。Copilot CLI 同时支持两种格式：声明了 Agent Plugins `$schema` 的**Agent Plugins 1.0**，以及不声明该 `$schema` 的**legacy 插件** [@ref-github-copilot-pluginsconc-formats]。向既有清单加 `$schema` 会改变 Copilot 解释清单与发现组件的方式；不带 `$schema` 的插件继续按 legacy 加载 [@ref-github-copilot-pluginsconc-formats]。

清单位置有一条硬规则：Agent Plugins 要求清单位于插件根目录；根目录的、指向 Agent Plugins 的 `plugin.json` 按规范 §5.1 优先于 `.plugin/plugin.json` 与 `.claude-plugin/plugin.json` [@ref-github-copilot-pluginref-pluginjson]。CLI 识别 Agent Plugins（Open Plugin Spec）v1.0.0 与 v1.1.0 的规范 `$schema` 值；若插件声明了 CLI 不支持的 Agent Plugins 版本，CLI **拒绝**该插件，而不是静默回退到 legacy——被拒绝的插件不贡献任何 hooks、LSP servers、MCP servers、skills、commands、agents、rules 或扩展目录 [@ref-github-copilot-pluginref-pluginjson]。

**Agent Plugins 1.0 清单字段**（封闭 schema）[@ref-github-copilot-pluginref-manifest]：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `$schema` | string | 是 | 必须是 CLI 识别的 Agent Plugins `$schema`（v1.0.0 或 v1.1.0） |
| `name` | string | 是 | 插件名，受名称约束 |
| `version` | string | 否 | 版本串，建议语义化版本 |
| `description` | string | 否 | 简短描述 |
| `author` | object | 否 | 可选 `name`、`email`、`url` |
| `homepage` | string | 否 | 主页或文档地址 |
| `repository` | string | 否 | 源码仓库 |
| `license` | string | 否 | 许可证标识，建议 SPDX |
| `keywords` | string[] | 否 | 搜索与发现关键词 |
| `extensions` | object | 否 | 以反域名命名空间为键的客户端专有数据 |

未知的顶层字段会被**报告并忽略**；`agents`、`skills`、`hooks`、`mcpServers`、`lspServers` 这类组件路径字段**不是** Agent Plugins 1.0 清单字段 [@ref-github-copilot-pluginref-manifest]。名称约束：长度 1–64，仅小写 ASCII 字母、数字、连字符与句点，首尾必须是字母或数字，且不得包含 `--` 或 `..` [@ref-github-copilot-pluginref-manifest]。

**Agent Plugins 1.0 组件**只有两类可移植组件：`skills/` 的**直接子目录**中含 `SKILL.md` 的 skill，以及根目录 `mcp.json` 中的 MCP servers；这两个位置固定，不能在 `plugin.json` 里配置；skill 只从 `skills/` 加载，没有根 `SKILL.md` 回退（legacy 插件在没有 `skills/` 目录时才回退到根 `SKILL.md`）[@ref-github-copilot-pluginref-components]。根 `mcp.json` 必须声明一个被识别的 Agent Plugins `$schema`（与 `plugin.json` 同版本）；顶层信封封闭，每个 server 条目按传输 schema 单独校验，非法条目被逐条跳过而合法条目仍加载；CLI 接受 `stdio`、`streamable-http`、`sse` 三种传输名 [@ref-github-copilot-pluginref-components]。对 `stdio` server，CLI 在子进程环境里提供 `PLUGIN_ROOT` 与 `PLUGIN_DATA`，并在 `args`、`env` 值与 `cwd` 中展开 `${PLUGIN_ROOT}`、`${PLUGIN_DATA}`（以及 `CLAUDE_PLUGIN_DATA`、`COPILOT_PLUGIN_DATA` 别名）；远程 `http`/`sse`/`streamable-http` 配置值原样传递，不做占位符或环境变量展开 [@ref-github-copilot-pluginref-components]。

Agent Plugins 1.0 不定义可移植的 agents、hooks、commands、rules、LSP servers，这些保持客户端专有；客户端专有清单数据放在 `extensions`，客户端专有文件放在同名顶层目录；Copilot CLI 从 `com.github.copilot` 目录读取自己的组件 [@ref-github-copilot-pluginref-components]：

| 组件 | 位置 |
| --- | --- |
| 自定义 agents | `com.github.copilot/agents/` |
| 斜杠命令 | `com.github.copilot/commands/` |
| 规则 | `com.github.copilot/rules/` |
| Hooks | `com.github.copilot/hooks/hooks.json` |
| LSP servers | `com.github.copilot/lsp.json` |

下面是最小的 Agent Plugins 1.0 清单，逐字段对照上表，来自插件参考的示例 [@ref-github-copilot-pluginref-example]：

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-dev-tools",
  "description": "React development utilities",
  "version": "1.2.0",
  "author": {
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "license": "MIT",
  "keywords": ["react", "frontend"]
}
```

**legacy 清单**：必填字段只有 `name`（kebab-case，字母/数字/连字符，最长 64）；可选元数据含 `description`（≤1024 字符）、`version`、`author`、`homepage`、`repository`、`license`、`keywords`、`category`、`tags` [@ref-github-copilot-pluginref-legacy]。组件路径字段全部可选，省略时走默认约定 [@ref-github-copilot-pluginref-legacy-components]：

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `agents` | string \| string[] | `agents/` | agent 目录（`*.agent.md`） |
| `skills` | string \| string[] | `skills/` | skill 目录（`SKILL.md`） |
| `commands` | string \| string[] | — | 命令目录 |
| `hooks` | string \| object | — | hooks 配置文件路径或内联对象 |
| `extensions` | string \| string[] \| object | — | 扩展目录；`{ paths: [...], exclusive: true }` 可抑制内置扩展 |
| `mcpServers` | string \| object | — | MCP 配置文件路径或内联定义 |
| `lspServers` | string \| object | — | LSP 配置文件路径或内联定义 |

legacy 插件里，插件内部的 agent 可以在自己的 frontmatter 里声明 `mcp-servers`，把某个 MCP server 只作用于该 agent；该块内 `${PLUGIN_ROOT}`（及别名）展开为插件根目录，因此 `command`/`args` 可指向插件自带脚本——这种替换只作用于插件内 agent frontmatter 的 `mcp-servers`，不延伸到 `${PLUGIN_DATA}` 或 server 的环境变量 [@ref-github-copilot-pluginref-legacy-mcp]。LSP server 可放在插件目录的 `lsp-config/servers.json`，或用 `plugin.json` 的 `lspServers` 指定路径/内联对象；每个 server 至少需要 `command`、`bash`、`powershell` 之一，`bash` 与 `powershell` 同时给出时按平台自动选择；`fileExtensions` 必填 [@ref-github-copilot-pluginref-lsp]：

```json
{
  "lspServers": {
    "my-lsp": {
      "command": "my-language-server",
      "fileExtensions": { ".myext": "mylang" }
    }
  }
}
```

`marketplace.json` 提供市场元数据并列出插件；每个 `plugins` 条目描述一个插件，`source` 是插件目录相对仓库根的路径（`./plugins/x` 与 `plugins/x` 等价）[@ref-github-copilot-pluginref-marketplace]。顶层字段为 `name`（必填，kebab-case，≤64）、`owner`（必填，`{ name, email? }`）、`plugins`（必填，数组）、`metadata`（可选，`{ description?, version?, pluginRoot? }`）[@ref-github-copilot-pluginref-marketplace-fields]。插件条目除 `name`/`source` 外，还可带 `description`、`version`、`author`、`homepage`、`repository`、`license`、`keywords`、`category`、`tags`，以及 `commands`/`agents`/`skills`/`hooks`/`mcpServers`/`lspServers` 与 `strict`（默认 `true`；置 `false` 放宽校验，便于直接安装或 legacy 插件）[@ref-github-copilot-pluginref-marketplace-fields]。`source` 也可以是一个对象，描述 `github` 或 `url` 来源；两者都接受可选的 `sha`（完整 40 位 commit SHA），与 `ref` 并用或替代 `ref`，用于可复现、免受 force-push 或 tag/branch 移动影响的安装 [@ref-github-copilot-pluginref-source-types]：

```json
{
  "source": {
    "source": "github",
    "repo": "owner/repo",
    "sha": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
    "path": "plugins/my-plugin"
  }
}
```

两种格式的目录形状（占位符是普通文本）分别来自概念页 [@ref-github-copilot-pluginsconc-structure-ap1][@ref-github-copilot-pluginsconc-structure-legacy]，创建步骤与结构描述来自创建指南 [@ref-github-copilot-plugins-structure][@ref-github-copilot-plugins-creating]：

```text
# Agent Plugins 1.0
my-plugin/
├── plugin.json
├── skills/deploy/SKILL.md
├── mcp.json
└── com.github.copilot/
    ├── agents/helper.agent.md
    ├── commands/
    ├── rules/
    ├── hooks/hooks.json
    └── lsp.json

# legacy
my-plugin/
├── plugin.json
├── agents/helper.agent.md
├── skills/deploy/SKILL.md
├── hooks.json
├── .mcp.json
└── lsp.json
```

创建流程（来自创建指南）：建目录 → 在根写 `plugin.json`（Agent Plugins 1.0 带 `$schema`，legacy 省略 `$schema` 并用组件路径字段）→ 加组件（AP1 的 `skills/` 直接子目录与根 `mcp.json` 位置固定，Copilot 专有组件放 `com.github.copilot`；legacy 用默认位置或清单里的路径）→ 本地 `copilot plugin install ./my-plugin` 试装 → `copilot plugin list` 与 `/agent`、`/skills list` 验证 → 迭代 → `copilot plugin uninstall NAME` 卸载（用 `name` 字段，不是目录路径）[@ref-github-copilot-plugins-creating]。发布方式是把插件加入市场 [@ref-github-copilot-plugins-distributing]；市场本身只要求一个 `marketplace.json`，放进仓库的 `.github/plugin/` 目录即可（CLI 也会找 `.claude-plugin/`），示例与字段见 [@ref-github-copilot-plugins-market-create]。

## 安装、启用与卸载 {#plugins-install}

**plugins.install**：安装入口分命令式与声明式两类 [@ref-github-copilot-pluginsconc-where]。命令式走 `copilot plugin` 子命令或交互会话里的 `/plugin` 斜杠命令 [@ref-github-copilot-pluginsconc-where][@ref-github-copilot-pluginref-cli]；声明式则把插件写进 `enabledPlugins` [@ref-github-copilot-pluginsconc-where]。

`copilot plugin` 的命令集（`copilot plugins` 复数形式是 legacy 别名，两者等价）[@ref-github-copilot-pluginref-cli]：

| 命令 | 说明 |
| --- | --- |
| `copilot plugin install SPEC`（别名 `add`） | 安装插件 |
| `copilot plugin uninstall NAME`（别名 `remove`、`rm`） | 卸载 |
| `copilot plugin list` | 列出已安装插件 |
| `copilot plugin update NAME` | 更新指定插件；`--all` 更新全部 |
| `copilot plugin enable NAME` | 重新启用先前禁用的插件，改动落配置并对后续会话生效 |
| `copilot plugin disable NAME` | 禁用但不卸载；`--plugin-dir` 挂载是只读的，没有可改的持久激活状态 |
| `copilot plugin marketplace add SPEC` | 注册市场，注册键取市场 `marketplace.json` 里的名字，不能自定义本地名 |
| `copilot plugin marketplace list` | 列出已注册市场 |
| `copilot plugin marketplace browse NAME` | 浏览市场内插件 |
| `copilot plugin marketplace update [NAME]`（别名 `refresh`） | 重新拉取一个或全部市场的目录 |
| `copilot plugin marketplace remove NAME` | 注销市场；仍有插件装自该市场时拒绝，`--force` 连插件一起卸载 |

`install` 接受五类来源 [@ref-github-copilot-pluginref-install-spec]：

| 形式 | 示例 | 说明 |
| --- | --- | --- |
| Marketplace | `plugin@marketplace` | 已注册市场中的插件 |
| GitHub | `OWNER/REPO` | 仓库根 |
| GitHub 子目录 | `OWNER/REPO:PATH/TO/PLUGIN` | 仓库内子目录 |
| Git URL | `https://github.com/o/r.git` | 任意 Git URL |
| 本地路径 | `./my-plugin` 或 `/abs/path` | 本地目录 |

操作示例来自安装指南：先 `copilot plugin marketplace list` 看已注册市场，再用 `copilot plugin marketplace browse MARKETPLACE-NAME` 浏览；安装用 `copilot plugin install PLUGIN-NAME@MARKETPLACE-NAME`（交互式等价 `/plugin install ...`）[@ref-github-copilot-plugins-find][@ref-github-copilot-plugins-install]。管理侧是 `copilot plugin list`/`update`/`uninstall`/`disable`/`enable` [@ref-github-copilot-plugins-manage]。加市场用 `copilot plugin marketplace add OWNER/REPO`（本地目录用路径、非 GitHub 托管用 Git URL），删市场用 `copilot plugin marketplace remove MARKETPLACE-NAME`；删除时引用的是**市场名**（注册时的名字），添加时引用的是 `OWNER/REPO` [@ref-github-copilot-plugins-market-add][@ref-github-copilot-plugins-market-remove]。命令参考把这一能力概括为"`copilot plugin` 管理插件与市场"，并在"非交互管理插件"一节指向插件参考 [@ref-github-copilot-cmdref-commands][@ref-github-copilot-cmdref-plugins]。

**声明式安装**：`enabledPlugins` 的键是插件 spec，值是 `true`（启用）或 `false`（禁用），默认 `{}` [@ref-github-copilot-cfgdir-user-settings]。用户级写在 `~/.copilot/settings.json`，仓库级写在 `.github/copilot/settings.json`；仓库级同一键**合并**且仓库覆盖用户的同名键 [@ref-github-copilot-cfgdir-repo-settings]。只通过仓库 `enabledPlugins` 启用的插件被限定在该仓库：在声明它的仓库里自动安装并激活，全局保持禁用，因此不会在无关项目里激活；离开仓库或仓库禁用它，会为该会话拆除其 MCP server 并停用其 agents 与 skills [@ref-github-copilot-cfgdir-repo-settings]。由 `copilot plugin install` 安装的插件会记入 `config.json` 的 `installedPlugins` [@ref-github-copilot-cfgdir-config]。根据字段说明可写出的最小声明式片段（依据用户设置字段表）：

```json
{
  "enabledPlugins": {
    "frontend-design@my-marketplace": true,
    "security-checks": false
  }
}
```

插件在本地开发时的缓存规则：安装后组件被缓存，后续会话读缓存；改动本地插件要**重新安装**才能生效（`copilot plugin install ./my-plugin`）[@ref-github-copilot-plugins-creating]。文档还提到，`--plugin-dir` 挂载的插件是只读的，`disable` 无法改动其持久激活状态 [@ref-github-copilot-pluginref-cli]。

**版本固定**：市场条目里可用 `ref` 或完整 40 位 `sha` 固定安装来源，以抵御 force-push 或 tag/branch 移动 [@ref-github-copilot-pluginref-source-types]。文档没有给出 `copilot plugin install` 命令行层面的版本选择语法（例如 `@version` 形式），这一点按 `partial` 阅读。

## 发现、位置与生命周期 {#plugins-discovery-lifecycle}

**plugins.discovery**：插件文件位置是确定的 [@ref-github-copilot-pluginref-locations]——市场安装的落在 `~/.copilot/installed-plugins/MARKETPLACE/PLUGIN-NAME`，直接安装的落在 `~/.copilot/installed-plugins/_direct/SOURCE-ID/`；市场缓存按平台放在 `~/.cache/copilot/marketplaces/`（Linux）或 `~/Library/Caches/copilot/marketplaces/`（macOS），可用 `COPILOT_CACHE_HOME` 覆盖 [@ref-github-copilot-pluginref-locations]。清单发现顺序：Agent Plugins 用插件根 `plugin.json`；legacy 按 `.plugin/plugin.json`、`plugin.json`、`.github/plugin/plugin.json`、`.claude-plugin/plugin.json` 的顺序检查；市场清单按 `marketplace.json`、`.plugin/marketplace.json`、`.github/plugin/marketplace.json`、`.claude-plugin/marketplace.json` 的顺序检查 [@ref-github-copilot-pluginref-locations]。配置目录参考补充：`installed-plugins/` 存已安装插件文件，`plugin-data/` 存插件持久数据（由插件自己管理，不应手工编辑），两者都在 `~/.copilot` 下，且 `installed-plugins/` 只有装过第一个插件后才出现 [@ref-github-copilot-cfgdir-overview]。

**加载顺序与优先级**（**plugins.discovery** 的冲突处理）[@ref-github-copilot-pluginref-loading]：

- **agents 与 skills 先到先用（first-found-wins）**：项目级同名 agent/skill 会让插件里的那个被静默忽略；agent 按 ID 去重（文件名去掉后缀，如 `reviewer.agent.md` → `reviewer`），skill 按 `SKILL.md` 内的 `name` 去重 [@ref-github-copilot-pluginref-loading]。
- **MCP servers 后到覆盖（last-wins）**：插件定义的 MCP server 覆盖已存在的同名 server；`--additional-mcp-config` 可覆盖插件安装的同名 server；两个以上插件声明同名 server 时，用最后加载的那个并给出警告 [@ref-github-copilot-pluginref-loading]。
- **内置 tools/agents 始终存在**，不可被用户定义覆盖 [@ref-github-copilot-pluginref-loading]。

命令参考里的 skill 位置表与 agent 位置表给出更细的分层：插件贡献的 skill 在 `~/.copilot/skills/` 等用户层与内置层之后参与同名优先级；插件贡献的 agent 位于插件目录下的 `agents/`（位置表中记作 `PLUGIN`），优先级低于用户、项目与 `--add-dir` 根 [@ref-github-copilot-pluginref-loading]。两个插件提供同名 skill 时，两者以插件限定调用名共存（如 `/my-plugin/search`），裸名路由到更高优先级的插件；这只适用于 skill，commands 仍按层级去重、高优先级者胜 [@ref-github-copilot-pluginref-loading]。文档还说明内置市场（`copilot-plugins`、`awesome-copilot`）由运行时自带、不能移除 [@ref-github-copilot-pluginref-cli]。

**plugins.lifecycle**：可观察到的状态区分如下。

- **已安装**：出现在 `copilot plugin list`（`--json` 数组，每行形如 `{ name, marketplace?, version?, enabled, source, installedFrom? }`）与 `/plugin` 面板 [@ref-github-copilot-pluginref-cli]。
- **已启用/已禁用**：`copilot plugin enable|disable NAME` 切换，落配置并对后续会话生效；`--plugin-dir` 挂载无持久激活状态可改 [@ref-github-copilot-pluginref-cli]。
- **已加载**：插件组件进入会话上下文后由 `/agent`、`/skills list` 等验证 [@ref-github-copilot-plugins-creating]；`/env` 显示已加载的 instructions、MCP servers、skills、agents、hooks、plugins、LSPs、extensions [@ref-github-copilot-cmdref-slash]。
- **激活**：仓库级 `enabledPlugins` 启用的插件在该仓库自动安装并激活，离开仓库触发拆除 [@ref-github-copilot-cfgdir-repo-settings]。
- **健康/更新**：`/plugin` 在上游有新版本时标记已安装的插件或市场，并提供 **Update** 动作 [@ref-github-copilot-pluginref-cli]。

**自动更新**：第一方插件（装自内置 `copilot-plugins` 与 `awesome-copilot` 市场）在受信工作目录的每个会话开始时自动更新；用 `autoUpdate` 设置（`false`）或 `COPILOT_AUTO_UPDATE=false` 关闭，CI 里默认跳过 [@ref-github-copilot-pluginref-cli]。自己添加的市场可在 `extraKnownMarketplaces` 条目上设 `autoUpdate: true` 加入同类会话开始自动更新；该 opt-in 仅对交互式与 `-p` 会话有效，SDK 与 server 会话不自动更新 [@ref-github-copilot-pluginref-cli]。同名冲突时，内置第一方市场胜出，然后是被管理条目，最后是用户自己的条目 [@ref-github-copilot-pluginref-cli][@ref-github-copilot-cfgdir-mdm-keys]。`--plugin-dir=DIRECTORY` 可从本地目录加载插件（可多次使用），相对路径按会话工作目录解析，`--plugin-dir` 插件贡献的 agents 在 `--server`、交互式与 `-p` 会话中均可用 [@ref-github-copilot-cmdref-options]。

**生效条件**：`PLUGINS_DASHBOARD=false` 会禁用裸 `/plugin`/`/mcp`/`/skills` 打开的插件面板，并禁用非交互式的 `copilot plugin`/`copilot plugins` 命令 [@ref-github-copilot-cmdref-env]。被组织或 MDM 托管策略（`enabledPlugins`、`extraKnownMarketplaces`）钉住的插件/市场不能本地重新启用、禁用或改指向——托管值对该条目胜出，`/plugin` 面板给这些行打 `Managed` 徽章并拒绝冲突切换 [@ref-github-copilot-pluginref-cli][@ref-github-copilot-cfgdir-mdm-keys]。当一个插件的激活当前由当前仓库的 `enabledPlugins` 覆盖层决定时，`copilot plugin enable`/`disable` 会**拒绝**，而不是静默写一个在该仓库无效的全局值，错误里会给出真正控制它的设置文件 [@ref-github-copilot-pluginref-cli]。托管设置里 `enabledPlugins` 与 `extraKnownMarketplaces` 是例外：托管层与本地条目**逐条合并**，锁按条目而非整键生效 [@ref-github-copilot-cfgdir-mdm-keys]。

**缺口**：文档没有把"已安装 / 已启用 / 已加载 / 已激活 / 健康"拆成一套独立的插件状态查询命令或状态枚举，状态只能从 `plugin list` 的 `enabled`、`/plugin` 面板、`/env` 与更新标记间接观察；加载顺序图给出的是组件级优先级，没有给出"插件整体加载失败"时的逐阶段状态。按 `partial` 阅读。

## 扩展点、权限边界与诊断 {#plugins-api-diagnostics}

**plugins.api**：一个插件能注册的能力即它携带的组件集合——Agent Plugins 1.0 里可移植的是 skills（`skills/` 直接子目录 + `SKILL.md`）与 MCP servers（根 `mcp.json`），Copilot 专有的 agents/commands/rules/hooks/LSP 从 `com.github.copilot` 目录读取 [@ref-github-copilot-pluginref-components]。legacy 插件的能力面更宽：agents、skills、commands、hooks、MCP servers、LSP servers 与扩展目录都可经清单的组件路径字段声明，默认位置与可配置路径见组件路径表 [@ref-github-copilot-pluginref-legacy-components]。LSP server 是一个明确的注册点，含 `command`/`bash`/`powershell`、`cwd`、`args`、`env`、`fileExtensions`、`rootUri`、`initializationOptions` 等字段 [@ref-github-copilot-pluginref-lsp]。插件内 agent 还能用 frontmatter 的 `mcp-servers` 把 MCP server 限定到该 agent，并在该块内用 `${PLUGIN_ROOT}` 定位插件自带脚本 [@ref-github-copilot-pluginref-legacy-mcp]。

**插件来源不改变优先级语义**：无论组件来自插件还是别处，agents/skills 仍是先到先用、MCP servers 仍是后到覆盖，内置 tools/agents 不可覆盖——所以"插件能注册什么"与"注册后谁生效"是两回事，后者由加载顺序决定 [@ref-github-copilot-pluginref-loading]。

**权限与宿主 API 边界**：这是文档最薄的一环。可确认的只有策略面的约束——托管 `enabledPlugins`/`extraKnownMarketplaces` 可以按条目钉住插件或市场，本地不可改向 [@ref-github-copilot-pluginref-cli][@ref-github-copilot-cfgdir-mdm-keys]。文档**没有**给出一套面向插件作者的宿主 API/权限声明（例如插件级权限清单、能力白名单、沙箱粒度）说明，也没有给插件进程可调用的宿主接口清单。CLI 闭源，公开仓库只有 README/changelog/install.sh，无法从实现补齐。此项状态 `partial`。

**plugins.diagnostics**：可用诊断入口如下。

- `copilot plugin list --json`：输出扁平 JSON 数组，每行 `{ name, marketplace?, version?, enabled, source, installedFrom? }` [@ref-github-copilot-pluginref-cli]。
- `/plugin` 面板：`Installed`、`Online`、`Marketplace` 三个视图，选中插件按 Enter 进入详情并执行 enable/disable/update/uninstall；面板**只显示插件**（MCP 用 `/mcp`，skills 用 `/skills`）[@ref-github-copilot-cmdref-slash]。
- `/env`：显示已加载的 instructions、MCP servers、skills、agents、hooks、plugins、LSPs、extensions [@ref-github-copilot-cmdref-slash]。
- `copilot plugin marketplace browse NAME`：查看某市场提供的插件 [@ref-github-copilot-plugins-manage]。
- 拒绝与冲突信号：声明了不支持的 Agent Plugins 版本时插件被拒绝、不贡献任何组件 [@ref-github-copilot-pluginref-pluginjson]；删除仍有插件的市场会失败并列出这些插件（`--force` 才继续）[@ref-github-copilot-pluginref-cli]；插件定义的同名组件按 agents/skills 静默忽略、MCP 后到覆盖并给警告 [@ref-github-copilot-pluginref-loading]。

配置目录参考给出目录级定位：`installed-plugins/` 存插件文件，`plugin-data/` 存插件持久数据 [@ref-github-copilot-cfgdir-overview]。`copilot plugin list` 的 `--config-dir` 选项已弃用，改用 `COPILOT_HOME` [@ref-github-copilot-pluginref-cli]。

**缺口**：文档没有单独的"为什么这个插件没加载"诊断命令，也没有把"清单解析失败 / 组件发现失败 / 加载失败 / 运行失败"拆成独立输出；错误主要靠 `install`/`update` 的报错、`/plugin` 面板的标记与 `list --json` 的 `enabled`/`source` 字段间接推断。建议以 `best-repo` 的"推荐仓库配置"思路，把团队约定写进 `.github/copilot-instructions.md`（构建与测试命令、代码风格、提交前检查、架构决策）并作为插件使用的配套约定，但该页并未专门描述插件诊断 [@ref-github-copilot-best-repo]。综合以上，`plugins.diagnostics` 状态为 `partial`。
