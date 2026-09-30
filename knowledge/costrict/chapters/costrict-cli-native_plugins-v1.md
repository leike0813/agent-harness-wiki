---
schema_version: 3
record_kind: production
edition_id: costrict-cli-native_plugins-v1
harness_id: costrict
topic: native_plugins
title: "CoStrict CLI（CSC）的原生插件机制"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-costrict-pluginref-model, ref-costrict-plugins-why, ref-costrict-pluginref-manifest, ref-costrict-mcp-plugin]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-costrict-plugins-structure, ref-costrict-pluginref-files, ref-costrict-plugins-quickstart, ref-costrict-plugins-manifest, ref-costrict-pluginref-manifest, ref-costrict-pluginref-pathsem, ref-costrict-plugins-settings, ref-costrict-pluginref-userconfig, ref-costrict-pluginref-channels]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-costrict-pluginref-scopes, ref-costrict-pluginref-cli, ref-costrict-plugins-test, ref-costrict-cmd-plugin, ref-costrict-plugins-submit, ref-costrict-plugins-migrate]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-costrict-pluginref-manifest, ref-costrict-pluginref-cache, ref-costrict-pluginref-envvars, ref-costrict-plugins-test, ref-costrict-mcp-plugin]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-costrict-pluginref-cli, ref-costrict-pluginref-version, ref-costrict-env-syncplugin, ref-costrict-agents-pluginlimits, ref-costrict-settings-plugintrust]
  - section_id: plugins-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-pluginref-debug, ref-costrict-pluginref-trouble, ref-costrict-cmd-plugin]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-costrict-pluginref-model, ref-costrict-plugins-why, ref-costrict-pluginref-manifest, ref-costrict-mcp-plugin]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-costrict-plugins-structure, ref-costrict-pluginref-files, ref-costrict-plugins-quickstart, ref-costrict-plugins-manifest, ref-costrict-pluginref-manifest, ref-costrict-pluginref-pathsem, ref-costrict-plugins-settings, ref-costrict-pluginref-userconfig, ref-costrict-pluginref-channels]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: answered
        source_refs: [ref-costrict-pluginref-scopes, ref-costrict-pluginref-cli, ref-costrict-plugins-test, ref-costrict-cmd-plugin, ref-costrict-plugins-submit, ref-costrict-plugins-migrate]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-costrict-pluginref-manifest, ref-costrict-pluginref-cache, ref-costrict-pluginref-envvars, ref-costrict-plugins-test, ref-costrict-mcp-plugin]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-costrict-pluginref-cli, ref-costrict-pluginref-version, ref-costrict-env-syncplugin, ref-costrict-agents-pluginlimits, ref-costrict-settings-plugintrust]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: answered
        source_refs: [ref-costrict-pluginref-cli, ref-costrict-pluginref-version, ref-costrict-env-syncplugin, ref-costrict-agents-pluginlimits, ref-costrict-settings-plugintrust]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-diagnostics
        status: answered
        source_refs: [ref-costrict-pluginref-debug, ref-costrict-pluginref-trouble, ref-costrict-cmd-plugin]
---

## 什么算原生插件 {#plugins-model}

本章的固定来源是 CSC 官方文档页 `/csc/tools-and-plugins/plugins`、`/csc/reference/plugins-reference`、`/csc/tools-and-plugins/mcp`、`/csc/reference/commands` 与 `/csc/configuration/settings` 的快照，按来源级知识阅读（`version_applicability: unknown`）。

**插件（Plugin）是一个自包含的组件目录**，通过自定义功能扩展 CSC；组件包括技能（Skills）、代理（Agents）、钩子（Hooks）、MCP 服务器与 LSP 服务器。[@ref-costrict-pluginref-model]

它与 Skill、MCP 服务器、Hook 脚本的关系，官方用"独立配置 vs 插件"两种方式来描述：[@ref-costrict-plugins-why]

| 维度 | 独立配置（`.costrict/` 目录） | 插件（含 `.claude-plugin/plugin.json` 的目录） |
| :-- | :-- | :-- |
| Skills 名称 | `/hello` | `/〔plugin-name〕:hello` |
| 适用 | 个人工作流、项目特定自定义、快速实验 | 与队友共享、社区分发、版本发布、跨项目复用 |

插件内的 Skills 总是带命名空间前缀（前缀即 `plugin.json` 的 `name`），以避免多个插件出现同名 Skill 时冲突；插件的代理在界面中显示为 `〔plugin-name〕:〔agent-name〕`，插件子代理在 `@` 自动完成中也是同样的限定名。[@ref-costrict-plugins-why][@ref-costrict-pluginref-manifest]

插件提供的 MCP 服务器与用户配置的服务器工作方式相同：启用插件时自动启动，与手动配置的服务器一起显示在 `/mcp` 列表中并带有来源标记，但通过插件安装管理而不是 `/mcp` 命令。[@ref-costrict-mcp-plugin]

## 插件包结构、清单与组件 {#plugins-package}

**标准目录布局**（组件目录必须在插件**根目录**，只有 `plugin.json` 放在 `.claude-plugin/` 内）：[@ref-costrict-plugins-structure][@ref-costrict-pluginref-files]

| 目录/文件 | 位置 | 用途 |
| :-- | :-- | :-- |
| `.claude-plugin/plugin.json` | 插件根 | 清单（可省略，省略时自动发现默认位置并从目录名派生插件名） |
| `skills/` | 插件根 | 形如 `〔name〕/SKILL.md` 的 Skill 目录 |
| `commands/` | 插件根 | 扁平 Markdown 文件形式的 Skill（新插件建议用 `skills/`） |
| `agents/` | 插件根 | 子代理 Markdown 文件 |
| `hooks/hooks.json` | 插件根 | Hook 配置 |
| `.mcp.json` | 插件根 | MCP 服务器定义 |
| `.lsp.json` | 插件根 | LSP 服务器配置 |
| `bin/` | 插件根 | 启用时加入 Bash 工具 PATH 的可执行文件 |
| `settings.json` | 插件根 | 插件启用时应用的默认设置（目前仅支持 `agent` 键） |
| `output-styles/` | 插件根 | 输出样式定义 |

最小可运行插件由一个目录、`.claude-plugin/plugin.json` 清单与 `skills/〔name〕/SKILL.md` 组成；`plugin.json` 的 `name` 同时是 Skill 命名空间前缀（如 `/my-first-plugin:hello`），`description` 显示在插件管理器中，`version` 用语义化版本跟踪发布。[@ref-costrict-plugins-quickstart][@ref-costrict-plugins-manifest]

**清单模式**（`name` 是唯一必填字段）：[@ref-costrict-pluginref-manifest]

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "简要插件描述",
  "author": { "name": "作者姓名" },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["deployment", "ci-cd"],
  "skills": "./custom/skills/",
  "commands": ["./custom/commands/special.md"],
  "agents": "./custom/agents/",
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json"
}
```

组件路径字段的语义不同：`skills`、`commands`、`agents`、`outputStyles` 的**自定义路径会替换默认目录**（要保留默认目录就把它写进数组，如 `"skills": ["./skills/", "./extras/"]`）；`hooks`、`mcpServers`、`lspServers` 支持路径或内联对象；所有路径必须相对于插件根目录并以 `./` 开头。[@ref-costrict-pluginref-pathsem]

**插件默认设置**：插件根目录的 `settings.json` 可在插件启用时应用默认配置，目前只支持 `agent` 键——设置后会激活插件 `agents/` 中的一个自定义代理作为主线程，应用其系统提示、工具限制与模型；`settings.json` 的优先级高于 `plugin.json` 中声明的设置，未知键被静默忽略。[@ref-costrict-plugins-settings]

**用户配置与通道**：`userConfig` 声明插件启用时提示用户输入的值（每项可标 `sensitive`），键名必须是合法标识符；取值在 MCP/LSP 服务器配置、Hook 命令以及（仅非敏感值）Skill 与代理内容中作为 `${user_config.KEY}` 替换，并作为 `CLAUDE_PLUGIN_OPTION_〔KEY〕` 环境变量导出到插件子进程；非敏感值存入 `settings.json` 的 `pluginConfigs[〔plugin-id〕].options`，敏感值存入系统钥匙串（不可用时存入 `~/.costrict/.credentials.json`，与 OAuth 令牌共享约 2 KB 总量限制）。`channels` 声明消息注入通道，每项必须绑定到插件 `mcpServers` 中已存在的服务器键，并可为该通道单独声明 `userConfig`。[@ref-costrict-pluginref-userconfig][@ref-costrict-pluginref-channels]

## 安装、启用与分发 {#plugins-install}

**安装范围**（决定插件写入哪个设置文件）：[@ref-costrict-pluginref-scopes]

| 范围 | 设置文件 | 用途 |
| :-- | :-- | :-- |
| `user` | `~/.costrict/settings.json` | 跨所有项目可用的个人插件（默认） |
| `project` | `.costrict/settings.json` | 经版本控制共享的团队插件 |
| `local` | `.costrict/settings.local.json` | 项目特定插件，被 gitignore |
| `managed` | 托管设置 | 托管插件（只读，仅可更新） |

**非交互 CLI**（适合脚本与自动化）：`csc plugin install 〔plugin〕 @marketplace [-s user|project|local]`、`csc plugin uninstall`（别名 `remove`/`rm`，`--keep-data` 保留持久数据目录）、`csc plugin enable`、`csc plugin disable`、`csc plugin update`（支持 `managed` 范围）。从最后一个范围卸载会删除该插件的 `${CLAUDE_PLUGIN_DATA}` 目录，除非传 `--keep-data`。[@ref-costrict-pluginref-cli]

**本地开发**用 `csc --plugin-dir ./my-plugin`（可多次指定同时加载多个），直接加载而不安装；与已安装的同名市场插件并存时，本地副本在该会话中优先——托管设置强制启用的市场插件是唯一例外，无法被覆盖。会话内用 `/plugin` 管理插件。[@ref-costrict-plugins-test][@ref-costrict-cmd-plugin]

**提交到官方市场**：官方给出两个应用内提交表单（`costrict.ai/settings/plugins/submit` 与 `platform.costrict.ai/plugins/submit`）。[@ref-costrict-plugins-submit]

**从独立配置迁移**：把 `.costrict/commands`、`.costrict/agents`、`.costrict/skills` 复制到插件目录，再把 `settings.json` 中的 `hooks` 对象原样复制进 `my-plugin/hooks/hooks.json`（格式相同），然后用 `csc --plugin-dir ./my-plugin` 验证；迁移后可以从 `.costrict/` 删除原件以避免重复，插件版本在加载时优先。[@ref-costrict-plugins-migrate]

## 发现、加载与缓存 {#plugins-discovery}

- **发现**：清单可省略，此时 CSC 自动发现默认位置中的组件并从目录名派生插件名；启用插件时其 Skills/命令、代理、Hook、MCP 服务器与 LSP 服务器被注册。[@ref-costrict-pluginref-manifest]
- **缓存与文件解析**：出于安全与验证目的，CSC 把市场插件**复制**到本地插件缓存 `~/.costrict/plugins/cache`，而不是就地使用；每个安装版本是缓存中的独立目录，更新或卸载时旧版本目录被标记为孤立并在 **7 天后**自动删除（宽限期让已加载旧版本的并发会话继续运行）。[@ref-costrict-pluginref-cache]
- **路径边界**：已安装插件不能引用其目录之外的文件——`../shared-utils` 之类在安装后失效，因为外部文件不会被复制；需要外部依赖时在插件目录内创建符号链接（符号链接在缓存中保留而不被解引用，运行时解析到目标）。[@ref-costrict-pluginref-cache]
- **内联替换**：`${CLAUDE_PLUGIN_ROOT}`（插件安装目录绝对路径，每次更新都会变）与 `${CLAUDE_PLUGIN_DATA}`（跨更新保留的持久目录，首次引用时自动创建）在 Skill/代理内容、Hook 命令以及 MCP/LSP 服务器配置中出现时被内联替换，并作为环境变量导出到 Hook 进程与服务器子进程。`${CLAUDE_PLUGIN_DATA}` 解析为 `~/.costrict/plugins/data/〔id〕/`，`〔id〕` 中除字母数字与 `_`、`-` 外的字符被替换为 `-`（例如 `formatter@my-marketplace` → `~/.costrict/plugins/data/formatter-my-marketplace/`）。[@ref-costrict-pluginref-envvars]
- **重新加载**：改动后运行 `/reload-plugins` 即可重新加载插件、Skills、代理、Hooks、插件 MCP 服务器与插件 LSP 服务器，无需重启。会话期间启用或禁用插件也要用它来连接或断开对应的 MCP 服务器。[@ref-costrict-plugins-test][@ref-costrict-mcp-plugin]

## 生命周期与安全边界 {#plugins-lifecycle}

- **状态层次**：插件先经安装写入某个范围的 `enabledPlugins`（范围决定可用项目），再在启用时被加载与注册；`csc plugin enable`/`disable` 在**不卸载**的前提下切换启用状态，`csc plugin update` 更新到最新版本（`managed` 范围可更新）。[@ref-costrict-pluginref-cli]
- **版本决定更新**：CSC 用 `plugin.json` 中的版本判断是否需要更新——改了插件代码但没有提升版本时，由于缓存，已有用户看不到变更；若插件在市场目录中，也可以通过 `marketplace.json` 管理版本并从 `plugin.json` 省略 `version`。发布遵循语义化版本（`MAJOR.MINOR.PATCH`），预发布版本如 `2.0.0-beta.1` 可用于测试。[@ref-costrict-pluginref-version]
- **后台安装**：非交互模式（`-p`）下插件默认在后台安装、可能在第一轮不可用；设置 `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1` 可等待安装完成，配合 `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS` 限制等待时间（超时后继续运行但不使用插件并记录错误）。[@ref-costrict-env-syncplugin]
- **暴露的能力**：插件可注册 Skills/命令、子代理、Hooks、MCP 服务器、LSP 服务器、`bin/` 可执行文件与插件级默认设置（`agent`）。**安全边界**：插件子代理不支持 `hooks`、`mcpServers`、`permissionMode` 字段，加载时被忽略（需要这些能力应把代理文件复制到 `.costrict/agents/` 或 `~/.costrict/agents/`；也可以在 `permissions.allow` 中加规则，但那些规则作用于整个会话）。[@ref-costrict-agents-pluginlimits] 托管设置可用 `pluginTrustMessage` 在安装前追加组织自定义的信任警告（如声明内部市场的插件已审核）。[@ref-costrict-settings-plugintrust]

**缺口（`plugins.api`）**：固定来源列出了插件**声明式**的扩展点（组件目录、清单字段、`userConfig`/`channels`、环境变量），但没有公开宿主侧的编程 API（例如插件可调用的 JS/TS 接口、事件订阅或权限清单）；因此"插件能注册哪些能力"可答，"宿主 API 边界"只能答到上文的安全限制。

## 诊断 {#plugins-diagnostics}

- `csc --debug` 查看插件加载详情：正在加载哪些插件、清单中的错误、Skill/代理/Hook 注册与 MCP 服务器初始化。[@ref-costrict-pluginref-debug]
- 校验：`csc plugin validate` 或 `/plugin validate` 检查 `plugin.json`、技能/代理/命令 frontmatter 与 `hooks/hooks.json` 的语法和模式错误。[@ref-costrict-pluginref-trouble]
- 常见问题（原文表）：插件未加载 → 无效的 `plugin.json`；技能未出现 → 目录结构错误（`skills/`、`commands/` 必须在插件根目录，不能在 `.claude-plugin/` 内）；钩子未触发 → 脚本不可执行（`chmod +x`）；MCP 服务器失败 → 缺少 `${CLAUDE_PLUGIN_ROOT}`；路径错误 → 使用了绝对路径（必须相对且以 `./` 开头）；LSP 报 `Executable not found in $PATH` → 语言服务器未安装。[@ref-costrict-pluginref-trouble]
- 典型错误消息：清单 JSON 语法错误、`name: Required`（缺必填字段）、"No commands found in plugin 〔name〕 custom directory"（路径存在但没有有效的命令文件）、"Plugin directory not found at path"（marketplace 条目的 `source` 路径不存在）、"conflicting manifests"（`plugin.json` 与市场条目都定义了组件）。[@ref-costrict-pluginref-trouble]
- 状态查询：会话内 `/plugin` 管理插件（`/plugin` 界面显示各标签页与错误），也可以在 `/plugin` 的错误标签页看到 LSP 可执行文件缺失之类的具体报错。[@ref-costrict-cmd-plugin][@ref-costrict-pluginref-trouble]
