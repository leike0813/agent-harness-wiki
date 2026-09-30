---
schema_version: 3
record_kind: production
edition_id: grok-cli-native_plugins-v1
harness_id: grok
topic: native_plugins
title: "Grok Build CLI 的原生插件：包格式、安装、发现、API 与诊断"
sections:
  - section_id: plugins-model
    surface_ids: [cli]
    source_refs: [ref-grok-plugins-install-use, ref-grok-plugins-mod-doc, ref-grok-plugins-what-contains, ref-grok-docs-plugins-section]
  - section_id: plugins-package
    surface_ids: [cli]
    source_refs: [ref-grok-plugins-dto-unknown, ref-grok-plugins-env-vars, ref-grok-plugins-index, ref-grok-plugins-manifest-components, ref-grok-plugins-manifest-fields, ref-grok-plugins-manifest-header, ref-grok-plugins-manifest-name, ref-grok-plugins-manifest-path-resolve, ref-grok-plugins-manifest-paths, ref-grok-plugins-manifest-paths-escape, ref-grok-plugins-what-contains]
  - section_id: plugins-install
    surface_ids: [cli]
    source_refs: [ref-grok-docs-plugins-marketplaces, ref-grok-plugins-cfg-ref-plugins, ref-grok-plugins-cli-manage, ref-grok-plugins-config-toggle, ref-grok-plugins-install-dir, ref-grok-plugins-install-source, ref-grok-plugins-install-use, ref-grok-plugins-installkind, ref-grok-plugins-instrepo, ref-grok-plugins-marketplace-add, ref-grok-plugins-pin-gate, ref-grok-plugins-refresh, ref-grok-plugins-repo-key, ref-grok-plugins-require-sha, ref-grok-plugins-rollout, ref-grok-plugins-update, ref-grok-plugins-where-looks]
  - section_id: plugins-discovery
    surface_ids: [cli]
    source_refs: [ref-grok-plugins-cfg-lsp, ref-grok-plugins-cfg-priority, ref-grok-plugins-conflicts, ref-grok-plugins-discover-head, ref-grok-plugins-discovered, ref-grok-plugins-enabled-logic, ref-grok-plugins-id, ref-grok-plugins-manifest-fields, ref-grok-plugins-origin, ref-grok-plugins-scope, ref-grok-plugins-trust, ref-grok-plugins-trust-auto, ref-grok-plugins-trust-doc, ref-grok-plugins-user-dirs, ref-grok-plugins-where-looks]
  - section_id: plugins-api
    surface_ids: [cli]
    source_refs: [ref-grok-plugins-acp-header, ref-grok-plugins-action, ref-grok-plugins-cfg-lsp, ref-grok-plugins-component-category, ref-grok-plugins-components, ref-grok-plugins-components-inventory, ref-grok-plugins-dto-scope, ref-grok-plugins-dto-unknown, ref-grok-plugins-env-vars, ref-grok-plugins-outcome-status, ref-grok-plugins-plugin-info-core, ref-grok-plugins-plugin-info-status, ref-grok-plugins-trust, ref-grok-plugins-what-contains]
  - section_id: plugins-lifecycle
    surface_ids: [cli]
    source_refs: [ref-grok-docs-plugins-modes-cmds, ref-grok-plugins-cfg-ref-marketplace, ref-grok-plugins-cli-manage, ref-grok-plugins-dto-hookstatus, ref-grok-plugins-dto-mcpstatus, ref-grok-plugins-enabled-logic, ref-grok-plugins-index, ref-grok-plugins-install-use, ref-grok-plugins-loaded, ref-grok-plugins-outcome-status, ref-grok-plugins-plugin-info-core, ref-grok-plugins-plugin-info-status, ref-grok-plugins-refresh-local, ref-grok-plugins-reload, ref-grok-plugins-require-sha, ref-grok-plugins-rollout, ref-grok-plugins-troubleshoot, ref-grok-plugins-ui-manage]
questions:
  - question_id: plugins.model
    answers:
      - surface_ids: [cli]
        section_id: plugins-model
        status: answered
        source_refs: [ref-grok-plugins-mod-doc, ref-grok-plugins-what-contains, ref-grok-docs-plugins-section]
  - question_id: plugins.package
    answers:
      - surface_ids: [cli]
        section_id: plugins-package
        status: answered
        source_refs: [ref-grok-plugins-manifest-header, ref-grok-plugins-manifest-paths, ref-grok-plugins-manifest-fields, ref-grok-plugins-manifest-components, ref-grok-plugins-manifest-name, ref-grok-plugins-index, ref-grok-plugins-what-contains]
  - question_id: plugins.install
    answers:
      - surface_ids: [cli]
        section_id: plugins-install
        status: conflict
        source_refs: [ref-grok-plugins-marketplace-add, ref-grok-plugins-install-use, ref-grok-plugins-install-source, ref-grok-plugins-pin-gate, ref-grok-plugins-require-sha, ref-grok-plugins-update, ref-grok-plugins-install-dir, ref-grok-plugins-instrepo, ref-grok-plugins-refresh, ref-grok-plugins-config-toggle, ref-grok-plugins-cfg-ref-plugins, ref-grok-plugins-cli-manage, ref-grok-plugins-rollout, ref-grok-docs-plugins-marketplaces]
  - question_id: plugins.discovery
    answers:
      - surface_ids: [cli]
        section_id: plugins-discovery
        status: answered
        source_refs: [ref-grok-plugins-scope, ref-grok-plugins-origin, ref-grok-plugins-id, ref-grok-plugins-discovered, ref-grok-plugins-user-dirs, ref-grok-plugins-discover-head, ref-grok-plugins-conflicts, ref-grok-plugins-where-looks, ref-grok-plugins-enabled-logic, ref-grok-plugins-trust-doc, ref-grok-plugins-trust-auto, ref-grok-plugins-cfg-priority, ref-grok-plugins-manifest-fields, ref-grok-plugins-cfg-lsp]
  - question_id: plugins.api
    answers:
      - surface_ids: [cli]
        section_id: plugins-api
        status: answered
        source_refs: [ref-grok-plugins-acp-header, ref-grok-plugins-plugin-info-core, ref-grok-plugins-plugin-info-status, ref-grok-plugins-dto-scope, ref-grok-plugins-dto-unknown, ref-grok-plugins-action, ref-grok-plugins-component-category, ref-grok-plugins-components-inventory, ref-grok-plugins-components, ref-grok-plugins-outcome-status, ref-grok-plugins-trust, ref-grok-plugins-cfg-lsp, ref-grok-plugins-env-vars]
  - question_id: plugins.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-grok-plugins-loaded, ref-grok-plugins-enabled-logic, ref-grok-plugins-dto-hookstatus, ref-grok-plugins-dto-mcpstatus, ref-grok-plugins-plugin-info-core, ref-grok-plugins-plugin-info-status, ref-grok-plugins-reload, ref-grok-plugins-refresh-local, ref-grok-plugins-install-use, ref-grok-plugins-ui-manage, ref-grok-plugins-cli-manage, ref-grok-plugins-troubleshoot, ref-grok-plugins-outcome-status]
  - question_id: plugins.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: plugins-lifecycle
        status: partial
        source_refs: [ref-grok-plugins-troubleshoot, ref-grok-plugins-cli-manage, ref-grok-plugins-ui-manage, ref-grok-plugins-cfg-ref-marketplace, ref-grok-plugins-dto-hookstatus, ref-grok-plugins-dto-mcpstatus, ref-grok-docs-plugins-modes-cmds, ref-grok-plugins-index, ref-grok-plugins-require-sha, ref-grok-plugins-rollout]
---


## 原生插件是什么：与 Skill、MCP、Hook、普通包的关系 {#plugins-model}

Grok 的**原生插件**（native plugin）是一个「自包含目录」：它把 skills、slash commands、agents、hooks、MCP servers 打包成一个可安装单元，安装后由宿主按目录约定加载 [@ref-grok-plugins-what-contains][@ref-grok-plugins-mod-doc]。官方文档站的表述一致：插件为 Grok 增加额外的 skills、agents、hooks、MCP servers 与 LSP servers，宿主从 `.grok/plugins/`、`~/.grok/plugins/`、`--plugin-dir` 等位置加载它们 [@ref-grok-docs-plugins-section]。

判定「算不算原生插件」的边界，按它与相邻机制的差别看：

| 机制 | 是不是插件 | 与插件的关系 |
| :-- | :-- | :-- |
| Skill | 不是 | 一个含 `SKILL.md` 的目录；插件可以在自己的 `skills/` 目录里**携带**若干 skill |
| Slash command | 不是 | 普通命令来自 skill 目录或 `commands/` 目录；插件可携带 `commands/` |
| MCP server | 不是 | 普通 MCP 是可独立配置的条目；插件可用 `.mcp.json` 或内联 `mcpServers` 顺带提供 |
| Hook 脚本 | 不是 | 普通 hook 来自 hook 目录/配置；插件可用 `hooks/hooks.json` 或内联 `hooks` 提供 |
| 普通软件包 | 不是 | 插件**只投递文件**：它不会把程序、运行时或原生二进制装到机器上，脚本所依赖的运行时须另行部署 |

上述六类可贡献项（skills、commands、agents、hooks、MCP servers、LSP servers）由同一份插件目录结构承载；「插件 vs 普通包」的区别（插件不安装程序、不投递运行时）也写在同一小节 [@ref-grok-plugins-what-contains]。`mod.rs` 把插件定义为「把 skills、agents、MCP server 配置与 hooks 打包成一个带命名空间的单元」的自包含目录，并列出 `~/.grok/plugins/`、`.grok/plugins/` 与 `--plugin-dir` 三种来源 [@ref-grok-plugins-mod-doc]。

插件的命名空间体现在斜杠命令上：当 skill 短名有歧义时，Grok 显示带插件名前缀的限定形式（例如 `/deploy-tools:release`）[@ref-grok-plugins-install-use]。

## 插件包结构、清单与元数据 {#plugins-package}

一个插件目录可包含任意组合：`skills/`、`commands/`、`agents/`、`hooks/hooks.json`、`.mcp.json`、`.lsp.json`，以及**可选**的 `plugin.json` 清单 [@ref-grok-plugins-what-contains]。没有清单时，宿主仍按约定目录发现组件，插件名取自目录名 [@ref-grok-plugins-manifest-header]。

清单查找顺序（同一插件目录内，先命中者胜，均按 JSON 解析）[@ref-grok-plugins-manifest-paths]：

| 顺序 | 清单路径 |
| :-- | :-- |
| 1 | `plugin.json`（插件根，规范位置） |
| 2 | `.grok-plugin/plugin.json` |
| 3 | `.claude-plugin/plugin.json` |

清单整体用 `camelCase` 字段；`PluginManifest` 的元数据字段如下（`name` 必填，其余可选）[@ref-grok-plugins-manifest-fields]：

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `name` | 字符串 | 必填。用户可见命名空间，kebab-case |
| `version` | 字符串 | semver 版本串 |
| `description` | 字符串 | 描述 |
| `author` | 对象 | `{ name, email, url }` |
| `homepage` / `repository` / `license` | 字符串 | 元数据 |
| `keywords` | 字符串数组 | 关键字 |

组件覆盖字段（补充约定目录）：`skills`、`commands`、`agents` 为「单字符串或字符串数组」；`hooks`、`mcp_servers`、`lsp_servers` 为「路径或内联对象」[@ref-grok-plugins-manifest-components]。未给字段时的默认文件是 `hooks/hooks.json`、`.mcp.json`、`.lsp.json` [@ref-grok-plugins-what-contains]。

`name` 的校验规则：非空、长度不超过 64、只允许小写字母/数字/连字符、首尾不能是连字符 [@ref-grok-plugins-manifest-name]。清单里声明的组件路径会被**包含性检查**：逃出插件根（例如用 `..`）的路径被判为非法、打印 warning 并从结果中剔除，因此不加载 [@ref-grok-plugins-manifest-path-resolve][@ref-grok-plugins-manifest-paths-escape]。

**兼容性**：清单解析刻意前向兼容——代码未设 `#[serde(deny_unknown_fields)]`，意味着**未知字段被静默忽略**，为更新版本编写的清单仍能加载；同时支持 `.claude-plugin/` 下的同名清单变体 [@ref-grok-plugins-manifest-header][@ref-grok-plugins-manifest-paths]。管理协议层还有第二重前向兼容：ACP 枚举对更新版本新增的来源/作用域变体用 `#[serde(other)] Unknown` 兜底，让较新的 shell 不会让较旧的 pager 整个列表反序列化失败 [@ref-grok-plugins-dto-unknown]。

**分发用的 marketplace 索引**：市场仓库用 `.grok-plugin/marketplace.json` 列出插件（也接受 `.grok-plugin/plugin.json` 与 `.claude-plugin/` 等价物），每个插件条目可带 `version`、`author`、`homepage`、`tags`、`keywords`，并可声明版本固定用的 `sha`；可选目录文件 `plugin-index.json` 仅用于浏览展示，安装不依赖它 [@ref-grok-plugins-index]。

清单与正文可使用插件令牌：`${GROK_PLUGIN_ROOT}`、`${GROK_PLUGIN_DATA}`（及 `CLAUDE_` 别名）会被替换为插件的安装目录与可写数据目录 [@ref-grok-plugins-env-vars]。

**诚实的缺口**：固定来源里**没有**独立的清单 schema 版本号字段或「兼容声明」字段；能称为兼容声明的只有 `version`（semver）加上述前向兼容解析。ACP 侧的 `#[serde(other)] Unknown` 属于管理协议的兼容，不是插件清单的版本声明 [@ref-grok-plugins-dto-unknown]。

## 来源、安装、版本固定与启停 {#plugins-install}

### 来源与安装入口

市场（marketplace）是插件目录清单；添加它只让 Grok 能展示其插件，**不会**自动安装，需要再逐个安装所需插件。来源可以是 GitHub 仓库、任意 git URL，或本地文件夹 [@ref-grok-plugins-marketplace-add]：

```
grok plugin marketplace add {github-shorthand}
grok plugin marketplace add https://gitlab.com/acme/plugins.git
grok plugin marketplace add ./my-marketplace
```

也可在配置里声明常驻来源：`config.toml` 里 `[[marketplace.sources]]` 需要 `name` 加上 `git`（可选 `branch`）或本地 `path`；`settings.json` 里用 `extraKnownMarketplaces`（键为名字，`source` 取 `git`/`github`/`local`）[@ref-grok-plugins-marketplace-add]。

安装来源接受多种书写：`owner/repo`、`owner/repo@{ref}`、`owner/repo@{commit-sha}`、`owner/repo#{subdir}`，完整 git URL 或 SSH，或本地路径 [@ref-grok-plugins-install-use]。解析实现把这些归一为 `InstallSource::Git { url, git_ref, git_sha, subdir }` 或 `InstallSource::Local { path, subdir }` [@ref-grok-plugins-install-source]。不带 `--trust` 时，安装命令会展示来源、警告「安装将激活该插件的 hooks、MCP servers 与 skills」，然后中止；加 `--trust` 才继续 [@ref-grok-plugins-install-use]。

CLI 侧另有：`grok plugin list [--json] [--available]`、`uninstall {name} [--confirm] [--keep-data]`（别名 `rm`/`remove`）、`update [{name}]`、`enable {name}`、`disable {name}`、`details {name}` [@ref-grok-plugins-cli-manage]。注意 `--available` 需要搭配 `--json` [@ref-grok-plugins-cli-manage]。

### 装到哪、怎样固定版本

安装结果落在**受管快照目录**而非活动的符号链接：默认 `~/.grok/installed-plugins/`，可被 `[plugins].install_dir` 覆盖（解析顺序：有效配置里的 `[plugins].install_dir`，否则默认目录）[@ref-grok-plugins-install-dir]。安装登记表持久化为该目录下的 `registry.json` [@ref-grok-plugins-instrepo]；git 安装记录 `InstallKind::Git { url, git_ref, commit, subdir }`，本地安装记录 `InstallKind::Local { source_path, subdir }` [@ref-grok-plugins-installkind]。仓库键格式为 `{basename}-{hash8}`，取归一化来源串哈希的前 8 位十六进制 [@ref-grok-plugins-repo-key]。

版本固定的规则：

- 安装来源里写 `owner/repo@{commit-sha}` 可钉到精确提交 [@ref-grok-plugins-install-use]。
- 策略键 `[marketplace] require_sha = true` 或环境变量 `GROK_MARKETPLACE_REQUIRE_SHA=1` 会**拒绝**任何未钉到完整提交 sha 的远程安装/更新；两者只收紧、不能反向关闭 [@ref-grok-plugins-require-sha]。
- 代码里的 `ensure_pinned` 门禁：策略开启且没有完整十六进制 sha 时返回拒绝；本地目录安装豁免（本地磁盘由操作者掌控，不发生 fetch）[@ref-grok-plugins-pin-gate]。

更新语义（`update_repo`）：本地安装是空操作；git 安装中，ref 看起来像提交哈希或 `v`+点的版本标签时视为已钉住、不自动更新；其余走 `git pull --ff-only` 前向快进并重新发现插件 [@ref-grok-plugins-update]。本地快照在**会话启动**时做「未变化则跳过」的再拷贝，在显式 `/plugins reload` 时强制整份重拷 [@ref-grok-plugins-refresh]。

### 启用/禁用与作用域

`[plugins]` 三个键在配置参考中列出：`plugins.disabled`（发现但不加载的插件 ID/名）、`plugins.enabled`（启用；项目插件默认关，需显式列出）、`plugins.paths`（额外插件目录，项目文件在目录受信任时可设置）[@ref-grok-plugins-cfg-ref-plugins]。用户配置示例 [@ref-grok-plugins-config-toggle]：

```toml
[plugins]
paths = ["~/my-plugins/custom-tools"]        # extra plugin directories
disabled = ["user/a1b2c3d4/noisy-plugin"]    # names or IDs to skip
enabled = ["project/9f8e7d6c/team-tools"]    # names or IDs to force on
```

插件默认关闭；要打开就列进 `enabled`，要「发现但跳过加载」就列进 `disabled`。每个条目可以是裸插件名或完整 ID `{scope}/{hash}/{name}`。要整体隐藏插件与 hooks 界面，在 `~/.grok/pager.toml` 设 `disable_plugins = true` [@ref-grok-plugins-config-toggle]。

**作用域**：命令行安装（marketplace/git/local）落在用户级 `~/.grok/installed-plugins/`（可用 `[plugins].install_dir` 重定向），属于用户级安装 [@ref-grok-plugins-install-dir]。项目级不是「安装」出来的，而是把插件目录放进仓库的 `.grok/plugins/` 由发现链扫描 [@ref-grok-plugins-where-looks]。要让所有人都自动装上，可把插件文件放到自动发现且自动信任的 `~/.grok/plugins/`，或用 `[plugins].paths` 指向设备管理工具托管的目录，再用 `[plugins].enabled` 启用 [@ref-grok-plugins-rollout]。

### 一处来源冲突：marketplace 安装根目录

两个固定来源对 marketplace 安装落点的说法不同：

1. 仓库 `install_registry.rs` 把安装目录解析为 `~/.grok/installed-plugins/`，`MarketplaceProvenance` 只记录来源、显示名与插件子目录 [@ref-grok-plugins-install-dir][@ref-grok-plugins-instrepo]。
2. 文档站快照把「Marketplace installs」写在 `~/.grok/plugins/marketplaces/` 之下 [@ref-grok-docs-plugins-marketplaces]。

二者根不同，无法仅凭固定来源判定 CLI 实际读取哪一个。稳妥的检查方式是 `grok plugin list` / `grok inspect`（见诊断小节），或用 `[plugins].install_dir` 显式指定 [@ref-grok-plugins-cli-manage]。

## 发现、校验、加载顺序与命名冲突 {#plugins-discovery}

### 查找位置与优先级

用户指南给出的发现位置按优先级排列（同名时高优先级者胜），`.claude/plugins/` 等价目录同样生效 [@ref-grok-plugins-where-looks]：

| 位置 | 作用域 | 信任 |
| :-- | :-- | :-- |
| `_meta.pluginDirs`（`session/new` / `session/load`） | 会话，仅该会话 | 自动信任 |
| `--plugin-dir`（`grok agent … stdio` 标志） | 进程，仅该 agent 进程 | 自动信任 |
| `.grok/plugins/` | 项目，随版本控制共享 | 需要信任 |
| `~/.grok/plugins/` | 用户，所有项目 | 自动信任 |
| `[plugins].paths`（配置） | 自加的目录 | 取决于位置 |

`_meta.pluginDirs` 由调用方提供，故自动信任且会话结束后不持久；`--plugin-dir` 可重复，是进程级等价物，且在 leader 模式下被忽略（共享 leader 自己发现插件）[@ref-grok-plugins-where-looks]。

`discovery.rs` 的扫描顺序与上表一致，但内部作用域枚举只有 4 个变体：`CliOverride = 0`、`Project = 1`、`User = 2`、`ConfigPath = 3`，序数越小优先级越高 [@ref-grok-plugins-scope]。会话级 `_meta.pluginDirs` 以 `CliOverride` 的信任级别并入 [@ref-grok-plugins-discover-head]。每个插件还记录更细的**来源** `PluginOrigin`（`CliOverride`、`ProjectGrok`、`ProjectClaude`、`UserGrok`、`UserClaude`、`ClaudeMarketplace`、`ClaudeInstalled`、`MarketplaceInstall`、`ConfigPath`），扫描时固定下来供消费者使用 [@ref-grok-plugins-origin]。

项目级插件从当前目录沿目录链一直走到 git worktree 根，同时检查 `.grok/plugins` 与 `.claude/plugins`；不在 git 仓库内时只检查当前目录 [@ref-grok-plugins-discover-head]。用户级目录按 `$GROK_HOME/plugins` 然后 `~/.claude/plugins` 的顺序取 [@ref-grok-plugins-user-dirs]。

`[plugins]` 的配置优先级：`.grok/config.toml`（当前目录）→ 仓库根 `.grok/config.toml` → `~/.grok/config.toml` [@ref-grok-plugins-cfg-priority]。

### 去重、命名冲突与默认启停

发现阶段按**规范化路径**去重，并解析同名冲突 [@ref-grok-plugins-discover-head]。冲突规则：同一名字的一组候选中只保留优先级最高的一个（作用域序数最小者），被丢弃者写 warning 日志，胜者记录一条 `conflict` 消息（形如 `Name collision: shadowing "…" from {path}`）[@ref-grok-plugins-conflicts]。每个插件的稳定内部身份是 `PluginId`，格式 `{scope}/{hex8}/{name}`，`hex8` 取规范化插件根路径 SHA-256 的前 8 位十六进制 [@ref-grok-plugins-id]。

`DiscoveredPlugin` 携带解析后的清单、id、根路径、规范化根、作用域、来源、是否受信任，以及解析出的 skill/command/agent 目录与 hooks/MCP/LSP 配置路径 [@ref-grok-plugins-discovered]。

**启停默认值**：Auto-enabled 作用域（`CliOverride`、`ConfigPath`）进 `enabled`；`User` 与 `Project` 进 `disabled`——因此用户级与项目级插件默认关闭，需显式启用 [@ref-grok-plugins-discover-head]。`PluginRegistry::from_discovered` 随后按 `enabled`/`disabled` 列表过滤：同时出现在两处时 `disabled` 胜；两处都没有时告警并按禁用处理 [@ref-grok-plugins-enabled-logic]。被禁用的插件**仍留在注册表里**，只是其组件不加载进会话 [@ref-grok-plugins-enabled-logic]。

### 信任闸门

信任粒度是**每个插件根**而非整个工作树；信任键是插件根目录的规范化绝对路径，存放在 `~/.grok/trusted-plugins`（每行一个规范化路径）。不受信任时：skills 与 agents 仍被发现并列出（仅元数据）；hooks、MCP servers 与本应执行的脚本被**阻断** [@ref-grok-plugins-trust-doc]。`[plugins].paths` 条目若规范化后位于用户 home 之下则自动信任，否则需要显式信任 [@ref-grok-plugins-trust-auto]。用户指南的对照说法是：`~/.grok/plugins/` 自动信任，项目 `.grok/plugins/` 需要信任，`--trust` 用于授予 [@ref-grok-plugins-trust]。

### 依赖与加载顺序（缺口）

固定来源**没有**插件之间的依赖声明机制——`PluginManifest` 里没有任何 depends/requires 字段 [@ref-grok-plugins-manifest-fields]；除「作用域优先级 + canonical 路径去重」外也没有通用加载顺序描述 [@ref-grok-plugins-discover-head]。已知与顺序有关的规则只有：LSP server 冲突时按「项目 → 用户 → 插件」解析，插件内部先文件 `.lsp.json` 后内联 `lspServers`，并按插件加载顺序处理 [@ref-grok-plugins-cfg-lsp]；以及同名插件按作用域序数淘汰 [@ref-grok-plugins-conflicts]。已检查的入口是 `manifest.rs` 的结构体、`discovery.rs` 的扫描与冲突函数，以及用户指南的 "Where Grok looks for plugins" 一表；专项的依赖解析仍属缺口。

## 扩展点与宿主 API 边界 {#plugins-api}

### 插件能注册什么

插件可贡献六类组件，构成固定的扩展点集合：skills、commands、agents、hooks、MCP servers、LSP servers [@ref-grok-plugins-what-contains]。宿主侧把这六类写成稳定分类枚举 `ComponentCategory`，其 `categories()` 是「有哪些字段、显示顺序如何」的单一事实来源 [@ref-grok-plugins-component-category]：

| 分类 | 载体 | 说明 |
| :-- | :-- | :-- |
| Skills | `skills/` 目录或 `skills` 字段 | 每个 `SKILL.md` 一个 skill |
| Commands | `commands/` 目录或 `commands` 字段 | 斜杠命令 |
| Agents | `agents/` 目录或 `agents` 字段 | 子代理/人格 |
| Hooks | `hooks/hooks.json` 或内联 `hooks` | hook 事件处理器 |
| MCP servers | `.mcp.json` 或内联 `mcpServers` | MCP server 定义 |
| LSP servers | `.lsp.json` 或内联 `lspServers` | 语言服务器定义 |

宿主把整套组件盘点建模为 `PluginComponents`（六个字段与上表一一对应），并支持由 marketplace 的 `plugin-index.json` 目录文件提供同一结构 [@ref-grok-plugins-components-inventory]。用于终端展示时会做**净化**：剥离控制字符与双向控制字符、按字符截断、每类截为 `MAX_COMPONENTS_PER_CATEGORY = 50` 条；因为 catalog 反序列化会绕过构造函数，渲染方必须在摄入点调用 `sanitize()`，以防御来自 catalog 字符串的终端转义注入 [@ref-grok-plugins-components]。

### 宿主 API 边界

宿主对插件的管理协议是 ACP 扩展方法，wire 格式由一个只依赖 `serde` 的独立 crate 定义，同时供 shell 与 pager 使用，方法族为 `x.ai/plugins/*` 与 `x.ai/hooks/*`（另有 `x.ai/mcp/list`）[@ref-grok-plugins-acp-header]：

| 方法 | 用途 |
| :-- | :-- |
| `x.ai/plugins/list` | 返回 `PluginsListResponse { plugins: [PluginInfo] }` |
| `x.ai/plugins/action` | 执行 `PluginsAction` 管理动作 |
| `x.ai/hooks/list` / `x.ai/hooks/action` | hooks 的列举与动作 |
| `x.ai/mcp/list` | MCP server 列表（pager 消费） |

[@ref-grok-plugins-acp-header]

`PluginInfo` 的字段：`name`、`id`（`{scope}/{hex8}/{name}`）、`root`、`scope`、`enabled`、`version`、`description`，以及 `trusted`——后者已标注为**废弃、恒为 true**，信任/取消信任已被启用/禁用取代 [@ref-grok-plugins-plugin-info-core]；其余展示字段为 `skill_count`/`skill_names`、`agent_count`/`agent_names`、`hook_status`/`hook_count`、`mcp_server_count`/`mcp_status`、`marketplace_source`、`origin`、`conflict` [@ref-grok-plugins-plugin-info-status]。

`PluginScope` 在 DTO 侧只暴露四个值：`cli`、`project`、`user`、`config` [@ref-grok-plugins-dto-scope]；`PluginOrigin` 对更新版本新增的变体用 `#[serde(other)] Unknown` 兜底 [@ref-grok-plugins-dto-unknown]。

`PluginsAction` 枚举即宿主公开的插件管理动作 [@ref-grok-plugins-action]：

| 动作 | 参数 | 语义 |
| :-- | :-- | :-- |
| `Reload` | — | 重新加载 |
| `Install` | `source` | 从来源安装 |
| `Uninstall` | `plugin_id`、`confirmed` | 卸载；`confirmed` 跳过「多插件仓库」二次确认 |
| `Update` | `plugin_id`（可空） | 更新一个或全部 |
| `Add` | `path` | 添加路径 |
| `Remove` | `path` | 移除路径 |
| `Enable` / `Disable` | `plugin_id` | 启用/禁用（写配置列表） |

动作返回共享结构 `ActionOutcome { status, message, requires_reload, requires_restart }`，其中 `status` 为 `OutcomeStatus`（`success`/`validation_error`/`confirmation_required`/`not_found`/`internal_error`/`unsupported`）[@ref-grok-plugins-outcome-status]。这同时说明：管理动作是否立即生效由 `requires_reload`/`requires_restart` 两个布尔告知调用方。

**权限边界**：插件本身没有可供调用的宿主函数 API——它是纯声明式文件包，唯一可执行面是 hooks（命令/HTTP 处理器）与 MCP/LSP server 进程，而它们都要先过信任闸门 [@ref-grok-plugins-trust][@ref-grok-plugins-what-contains]。对插件自带的 **agent** 还有额外限制：插件 agent 的 frontmatter **不能**声明 `mcpServers` 或 hooks，也不能设 `permissionMode: bypassPermissions` [@ref-grok-plugins-trust]。插件 hooks 额外收到 `GROK_PLUGIN_ROOT`（安装目录绝对路径）与 `GROK_PLUGIN_DATA`（可写数据目录绝对路径，用于状态/缓存/日志）[@ref-grok-plugins-env-vars]。插件提供的 LSP server 也只在插件受信任后才加载 [@ref-grok-plugins-cfg-lsp]。

## 生命周期状态与诊断入口 {#plugins-lifecycle}

### 可观察的状态

| 状态 | 含义 | 可观察入口 |
| :-- | :-- | :-- |
| 已安装 | 受管快照/登记表里有该仓库与插件 | `~/.grok/installed-plugins/registry.json`、`grok plugin list` |
| 已启用/已禁用 | 被 `[plugins].enabled`/`disabled` 过滤 | `PluginInfo.enabled`、Plugins 标签页 `Space` |
| 已发现 | 扫描命中并进入注册表（可能被同名高优先级者遮蔽） | `DiscoveredPlugin`、`PluginInfo.conflict` |
| 已信任/未信任 | 是否允许加载 hooks/MCP/LSP | `hook_status`/`mcp_status` 为 `blocked` 即未信任 |
| 已加载/活动 | 组件解析完成、hook 规格已解析、MCP 归属已登记 | 仅当同时 `enabled && trusted` |
| 组件健康 | hooks/MCP 的细分状态 | 见下方枚举 |

来源：注册表构造时「已启用且已受信任」才解析 hook 规格并登记 MCP 归属 [@ref-grok-plugins-loaded][@ref-grok-plugins-enabled-logic]。每个插件的 hooks/MCP 状态是派生枚举 [@ref-grok-plugins-dto-hookstatus][@ref-grok-plugins-dto-mcpstatus]：

| 枚举 | 取值 | 含义 |
| :-- | :-- | :-- |
| `HookStatus` | `active` | 已信任且生效（文件式 hooks） |
| | `active_inline` | 已信任且生效（仅内联 hooks） |
| | `blocked` | 未信任——存在 hooks 但被阻断 |
| | `none` | 未配置 hooks |
| `McpStatus` | `active` / `active_inline` / `blocked` / `none` | 同上语义，对应 MCP servers |

注意清单里的 `trusted` 字段「已废弃、恒为 true」，因此**不要用 `trusted` 判断实际信任**，要看 `hook_status`/`mcp_status` 是否为 `blocked` [@ref-grok-plugins-plugin-info-core]。

### 重载时机与会话语义

`PluginRegistry` 是「本会话加载了哪些插件」的单一事实来源，在 `MvpAgent` 初始化时构建一次，可由 `/plugins reload` 重建；每个会话拿到一份快照 [@ref-grok-plugins-loaded]。重建时：显式 `/plugins reload` 传 `force=true`（强制重拷本地快照），会话启动与顺带重建传 `false`（跳过未变化者）；新的会话从最新快照克隆，**运行中的会话保留自己的快照** [@ref-grok-plugins-reload][@ref-grok-plugins-refresh-local]。安装新插件后要生效，可在 Plugins 标签页按 `r`，或开新会话 [@ref-grok-plugins-install-use]。管理动作若要求重启，会通过 `ActionOutcome.requires_restart` 告知 [@ref-grok-plugins-outcome-status]。

### 诊断入口

TUI：用 `Ctrl+L`（VS Code 系除外）或 `/plugins` 打开插件模态；它有六个标签页 Hooks、Plugins、Marketplace、Skills、Workflows、MCP Servers，用 `Tab`/`Shift+Tab` 切换 [@ref-grok-plugins-ui-manage]。`/hooks`、`/marketplace`、`/skills`、`/workflows`、`/mcps` 打开同一模态的对应标签页 [@ref-grok-plugins-ui-manage][@ref-grok-docs-plugins-modes-cmds]。在 Plugins 标签页按 `Enter` 展开可看到名称、版本、作用域（`cli`/`project`/`user`/`custom path` 或 marketplace 来源名）、skills、agents、hooks、MCP servers（未信任时显示 `blocked`）、描述与路径；`r` 重载全部插件，`a` 添加，`Space` 启停，`x` 卸载，`f` 按状态过滤，`/` 搜索 [@ref-grok-plugins-ui-manage]。

CLI：`grok plugin list [--json] [--available]`、`grok plugin details {name}`（显示组件清单）、`grok plugin validate [{path}]`、`grok plugin tag [{path}] [--push]`，以及 `uninstall`/`update`/`enable`/`disable` [@ref-grok-plugins-cli-manage][@ref-grok-plugins-index]。`grok plugin list` 是查版本与状态的入口，`details` 给出组件盘点 [@ref-grok-plugins-cli-manage]。

`grok inspect`：列出每个被发现插件及其提供的 skills、agents、hooks、MCP servers，并标注 `plugin: {name}` 来源 [@ref-grok-plugins-troubleshoot]；`grok inspect --json` 给机器可读输出 [@ref-grok-plugins-cfg-ref-marketplace]。它还能显示已加载的 MCP/marketplace 列表、策略下收紧的 pin，以及 `allowManagedMcpServersOnly` 的 `off`/`advisory`/`enforced` 状态——这与组织策略下的安装/勾选诊断直接相关 [@ref-grok-plugins-require-sha][@ref-grok-plugins-rollout]。

常见「不生效」的定位顺序（来自官方 Troubleshooting）[@ref-grok-plugins-troubleshoot]：

1. 装了却不显示 → 插件默认关闭。`grok plugin list` 查看，再把名字/ID 加进 `[plugins].enabled`，或在 Plugins 标签页按 `Space`，然后按 `r` 或开新会话。
2. skills/hooks/MCP 不加载 → 未信任。用 `--trust` 重装，或把插件放到 `~/.grok/plugins/`（自动信任）。
3. marketplace 来的 skill/MCP 缺失 → `grok plugin marketplace update` 刷新来源，确认已安装且启用，再确认组织策略未封锁该来源。
4. 已配置却从不启动的 MCP server → 可能被组织策略拦截；`grok inspect` 会列出允许/拒绝列表、锁定的策略文件与每个 server 的来源。

**诚实的缺口**：`grok plugin …` 与 `grok inspect` 这些子命令的**实现代码不在本提交的 checkout 内**（该仓库只含 agent/config/hooks/pager/workspace 等 crate，CLI shell 与命令实现未随提交提供），因此上述 CLI 行为描述完全来自官方用户指南与文档站快照，无法在本提交里核对实现细节。此外，「健康」不是独立的一等状态——可观察的只有 `hook_status`/`mcp_status` 与注册表中的计数；没有任何字段表达「插件进程存活」，因为插件本身不运行进程 [@ref-grok-plugins-dto-hookstatus][@ref-grok-plugins-plugin-info-status]。
