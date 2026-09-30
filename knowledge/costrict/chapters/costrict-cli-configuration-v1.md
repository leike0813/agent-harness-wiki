---
schema_version: 3
record_kind: production
edition_id: costrict-cli-configuration-v1
harness_id: costrict
topic: configuration
title: "CoStrict CLI（CSC）的配置来源与优先级"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-scopes, ref-costrict-settings-features, ref-costrict-settings-files, ref-costrict-settings-managed, ref-costrict-settings-other, ref-costrict-settings-schema, ref-costrict-dir-agents, ref-costrict-dir-rules, ref-costrict-dir-user, ref-costrict-dir-global, ref-costrict-dir-intro, ref-costrict-dir-fileref, ref-costrict-mcp-scopes, ref-costrict-env-configdir]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-priority, ref-costrict-dir-overrides, ref-costrict-perm-rules]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-env, ref-costrict-settings-priority, ref-costrict-dir-overrides, ref-costrict-cmd-config, ref-costrict-settings-thinkkeys, ref-costrict-settings-cleanup]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-costrict-perm-managed, ref-costrict-perm-modes, ref-costrict-cmd-permissions, ref-costrict-perm-system, ref-costrict-sandbox-overview, ref-costrict-sandbox-config, ref-costrict-mcp-scopes, ref-costrict-settings-plugintrust]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-cleanup, ref-costrict-settings-updates, ref-costrict-settings-worktree, ref-costrict-hooks-common, ref-costrict-hooksguide-trouble, ref-costrict-agents-fielddefaults, ref-costrict-settings-ignorepatterns, ref-costrict-settings-gitkeys, ref-costrict-settings-managed, ref-costrict-pluginref-version]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-validate, ref-costrict-cmd-status, ref-costrict-cmd-doctor, ref-costrict-cmd-intro, ref-costrict-cmd-config, ref-costrict-cli-debug, ref-costrict-settings-priority, ref-costrict-perm-managed, ref-costrict-pluginref-version, ref-costrict-hooks-disablehooks]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-costrict-settings-scopes, ref-costrict-settings-features, ref-costrict-settings-files, ref-costrict-settings-managed, ref-costrict-settings-other, ref-costrict-settings-schema, ref-costrict-dir-agents, ref-costrict-dir-rules, ref-costrict-dir-user, ref-costrict-dir-global, ref-costrict-dir-intro, ref-costrict-dir-fileref, ref-costrict-mcp-scopes, ref-costrict-env-configdir]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-costrict-settings-priority, ref-costrict-dir-overrides, ref-costrict-perm-rules]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-costrict-settings-env, ref-costrict-settings-priority, ref-costrict-dir-overrides, ref-costrict-cmd-config, ref-costrict-settings-thinkkeys, ref-costrict-settings-cleanup]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-costrict-perm-managed, ref-costrict-perm-modes, ref-costrict-cmd-permissions, ref-costrict-perm-system, ref-costrict-sandbox-overview, ref-costrict-sandbox-config, ref-costrict-mcp-scopes, ref-costrict-settings-plugintrust]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-costrict-settings-cleanup, ref-costrict-settings-updates, ref-costrict-settings-worktree, ref-costrict-hooks-common, ref-costrict-hooksguide-trouble, ref-costrict-agents-fielddefaults, ref-costrict-settings-ignorepatterns, ref-costrict-settings-gitkeys, ref-costrict-settings-managed, ref-costrict-pluginref-version]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-costrict-settings-cleanup, ref-costrict-settings-updates, ref-costrict-settings-worktree, ref-costrict-hooks-common, ref-costrict-hooksguide-trouble, ref-costrict-agents-fielddefaults, ref-costrict-settings-ignorepatterns, ref-costrict-settings-gitkeys, ref-costrict-settings-managed, ref-costrict-pluginref-version]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-costrict-settings-validate, ref-costrict-cmd-status, ref-costrict-cmd-doctor, ref-costrict-cmd-intro, ref-costrict-cmd-config, ref-costrict-cli-debug, ref-costrict-settings-priority, ref-costrict-perm-managed, ref-costrict-pluginref-version, ref-costrict-hooks-disablehooks]
---

## 配置来源与作用域 {#config-sources}

本章的固定来源是 CSC 官方文档页 `/csc/configuration/settings`、`/csc/getting-started/costrict-directory`、`/csc/configuration/permissions`、`/csc/configuration/sandboxing`、`/csc/reference/env-vars`、`/csc/reference/commands` 与 `/csc/tools-and-plugins/mcp` 的快照，按来源级知识阅读（`version_applicability: unknown`）。

**四个作用域**（由官方范围表给出）：[@ref-costrict-settings-scopes]

| 作用域 | 位置 | 影响对象 | 与团队共享 |
| :-- | :-- | :-- | :-- |
| 托管 | 服务器交付、plist/注册表或系统级 `managed-settings.json` | 机器上的所有用户 | 是（由 IT 部署） |
| 用户 | `~/.costrict/` 目录 | 你，跨所有项目 | 否 |
| 项目 | 仓库中的 `.costrict/` | 此仓库的所有协作者 | 是（提交到 git） |
| 本地 | `.costrict/settings.local.json` | 你，仅在此仓库中 | 否（gitignored） |

各功能落到哪个文件（官方"哪些功能使用范围"表）：设置 → `~/.costrict/settings.json` / `.costrict/settings.json` / `.costrict/settings.local.json`；子代理 → `~/.costrict/agents/` 与 `.costrict/agents/`；MCP 服务器 → 项目用 `.mcp.json`；插件 → 三个 `settings.json`；`AGENTS.md` → `~/.costrict/AGENTS.md`、项目根 `AGENTS.md` 或 `.costrict/AGENTS.md`、以及私有的 `AGENTS.local.md`。[@ref-costrict-settings-features]

**设置文件**有三种：用户设置 `~/.costrict/settings.json` 适用于所有项目；项目设置 `.costrict/settings.json`（签入版本控制）与 `.costrict/settings.local.json`（不签入、创建时会自动配置 git 忽略）。[@ref-costrict-settings-files]

**托管设置**的交付机制（同一 JSON 格式，用户与项目设置无法覆盖）：[@ref-costrict-settings-managed]

- 服务器管理设置：通过 costrict.ai 管理控制台交付；
- MDM/OS 级别策略：macOS 的 `com.anthropic.claudecode` 托管偏好域（Jamf、Kandji 等），Windows 的 `HKLM\SOFTWARE\Policies\CoStrict` 注册表键（`Settings` 值），以及 Windows 用户级 `HKCU\SOFTWARE\Policies\CoStrict`（最低策略优先级）；
- 基于文件：`/Library/Application Support/CoStrict/`（macOS）、`/etc/claude-code/`（Linux 与 WSL）、`C:\Program Files\CoStrict\`（Windows）下的 `managed-settings.json` 与 `managed-mcp.json`；自 v2.1.75 起旧版 Windows 路径 `C:\ProgramData\CoStrict\managed-settings.json` 不再受支持；
- 放置目录 `managed-settings.d/`：遵循 systemd 约定，先合并 `managed-settings.json` 再按字母序合并目录内所有 `*.json`（标量后者覆盖、数组连接去重、对象深度合并，隐藏文件忽略），可用数字前缀控制顺序（如 `10-telemetry.json`、`20-security.json`）。

**其他状态文件**：`~/.claude.json` 保存偏好（主题、通知、编辑器模式）、OAuth 会话、用户与本地范围的 MCP 服务器配置、按项目状态（允许的工具、信任设置）与缓存；项目范围 MCP 服务器单独放在 `.mcp.json`。CSC 会自动为配置文件创建时间戳备份并保留最近五个。[@ref-costrict-settings-other] 官方示例把 `$schema` 指向 CSC 设置的 JSON schema（在支持 JSON schema 的编辑器里启用自动补全与内联校验）。[@ref-costrict-settings-schema]

**指令文件**：`AGENTS.md` 是 CSC 每次会话都会读取的项目指令（建议控制在 200 行以内，加载时机为会话开始）；`.costrict/AGENTS.md` 是等效位置。`.costrict/rules/` 把项目指令拆成按主题的文件——没有 `paths:` frontmatter 的规则在会话开始时加载，有 `paths:` 的规则只在 CSC 读取匹配文件时加载；规则是 CSC 读取的指导，不是强制配置。全局与项目两侧都可以放这些文件（全局位于 `~/.costrict/`）。[@ref-costrict-dir-agents][@ref-costrict-dir-rules][@ref-costrict-dir-user]

**全局级文件**位于主目录（`~/`）：目录页把 `~/.claude.json` 标为"仅本地、应用状态与 UI 偏好"，会话开始时读取偏好与 MCP 服务器。[@ref-costrict-dir-global] 目录页的总览还说明 CSC 从项目与 `~/.costrict` 读取 AGENTS.md、settings.json、hooks、skills、commands、subagents、rules 与自动记忆，并给出逐文件的作用表（`AGENTS.md`、`rules/*.md`、`settings.json`、`settings.local.json`、`.mcp.json`、`.worktreeinclude`、`skills/〔name〕/SKILL.md`、`commands/*.md`、`output-styles/*.md`、`agents/*.md` 等，标注各自的提交状态）。[@ref-costrict-dir-intro][@ref-costrict-dir-fileref]

**注意一处官方页面间的不一致**：设置页把 MCP 的用户/本地作用域存储写成 `~/.claude.json`，而 MCP 页写的是 `~/.costrict.json`（"MCP Local 作用域的服务器存储在 `~/.costrict.json`"）。两页同属官方文档但文件名不同，本库照录两个来源，实际文件名以 `csc mcp add` 生成的结果为准。[@ref-costrict-settings-features][@ref-costrict-mcp-scopes]

**配置目录重定向**：`CLAUDE_CONFIG_DIR` 覆盖配置目录（默认 `~/.costrict`），所有设置、凭据、会话历史与插件都存于其下——目录页说明此变量生效后，页面上的每个 `~/.costrict` 路径都位于该目录下。[@ref-costrict-env-configdir]

## 优先级与合并规则 {#config-overrides}

官方优先级从高到低：**托管设置**（不能被任何其他级别覆盖，包括命令行参数）→ **命令行参数**（会话级临时覆盖）→ **本地项目设置** → **共享项目设置** → **用户设置**。托管层级内部优先序为：服务器管理 > MDM/OS 级别策略 > 基于文件的（`managed-settings.d/*.json` 加 `managed-settings.json`）> HKCU 注册表（仅 Windows），且只使用一个托管来源、来源之间不跨层合（基于文件层内部仍会合并）。无论从 CLI、VS Code 扩展还是 JetBrains IDE 运行 CSC，该顺序都相同。[@ref-costrict-settings-priority]

**数组合并**：同名数组设置（如 `sandbox.filesystem.allowWrite`、`permissions.allow`）跨范围**连接并去重**，而不是替换——低优先级范围可以追加条目而不覆盖高优先级的条目，反之亦然；官方示例：托管设置 `allowWrite: ["/opt/company-tools"]` 加上用户的 `["~/.kube"]`，最终两个路径都包含。[@ref-costrict-settings-priority]

目录页用更简洁的说法复述了同一规则：组织部署的托管设置优先于一切；`--permission-mode` 或 `--settings` 之类的 CLI 标志覆盖该会话的 `settings.json`；某些环境变量优先于其等效设置，但"因情况而异"，需逐个查阅环境变量参考。[@ref-costrict-dir-overrides]

权限的判定顺序是另一套规则：`deny -> ask -> allow`，第一个匹配的规则生效，因此 `deny` 始终优先；规则格式为 `Tool` 或 `Tool(specifier)`（如 `Bash(npm run build)`）。[@ref-costrict-perm-rules]

## 运行时介入：环境变量、CLI 标志与会话内修改 {#config-runtime}

- **环境变量**：任何 CSC 环境变量都可以在 `settings.json` 的 `env` 键下配置，以应用于每个会话或向团队推出。[@ref-costrict-settings-env]
- **CLI 标志**：`--permission-mode`、`--settings` 等标志覆盖该会话的 `settings.json`（优先级表中"命令行参数"高于本地、项目与用户设置）。[@ref-costrict-settings-priority][@ref-costrict-dir-overrides]
- **会话内命令**：`/config` 打开设置界面以调整主题、模型、输出样式与其他偏好（别名 `/settings`），多数改动的持久化位置依设置而定（例如 `autoMemoryDirectory` 只在策略、本地与用户设置中接受，项目设置被拒绝以防共享仓库把记忆写向敏感位置）。[@ref-costrict-cmd-config][@ref-costrict-settings-thinkkeys]
- **平台相关的 shell 选择**：`defaultShell` 接受 `bash`（默认）或 `powershell`，后者会把输入框的 `!` 命令路由到 PowerShell，并且需要 `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`。[@ref-costrict-settings-cleanup]

## 信任、策略与权限边界 {#config-trust}

- **仅托管设置可配的策略**：`allowManagedPermissionRulesOnly`（阻止用户与项目设置定义 allow/ask/deny 规则，只应用托管规则）、`allowManagedMcpServersOnly`、`allowManagedHooksOnly`、`allowedChannelPlugins`、`blockedMarketplaces`、`strictKnownMarketplaces`、`forceRemoteSettingsRefresh` 等只从托管设置读取，放进用户或项目文件没有效果。[@ref-costrict-perm-managed]
- **权限模式**（`defaultMode`）：`default`、`acceptEdits`、`plan`、`auto`、`dontAsk`、`bypassPermissions`；`bypassPermissions` 跳过权限提示，但写入 `.git`、`.costrict` 等受保护目录时仍会提示（`.costrict/commands`、`.costrict/agents`、`.costrict/skills` 除外）。[@ref-costrict-perm-modes]
- **权限规则**：`deny` 优先于 `ask` 优先于 `allow`；`/permissions` 列出所有规则及其来源的 `settings.json`；[@ref-costrict-cmd-permissions] Read 工具的 deny 规则不能阻止 Bash 中的等价操作，需要分别限制。[@ref-costrict-perm-system]
- **沙箱**：CSC 具备原生沙箱化能力，用操作系统级原语执行文件系统与网络隔离，减少权限提示；官方强调文件系统与网络隔离**必须同时具备**，否则受损的 agent 可能窃取密钥或后门访问网络。[@ref-costrict-sandbox-overview] 相关设置包括 `sandbox.filesystem.allowWrite`（沙箱化时自动批准 bash 命令，默认 `true`）、`denyWrite`、`denyRead`、可访问的 Unix 套接字与 macOS XPC/Mach 服务，这些路径数组同样跨设置范围合并。[@ref-costrict-sandbox-config]
- **MCP 与插件的信任点**：`.mcp.json` 中的 Project 作用域服务器在使用前需要批准（`csc mcp reset-project-choices` 重置）；`managed-mcp.json` 存在时对 MCP 服务器拥有独占控制，否则可用 `allowedMcpServers`/`deniedMcpServers` 过滤；插件方面可用 `pluginTrustMessage` 追加组织自定义的安装前警告。[@ref-costrict-mcp-scopes][@ref-costrict-settings-plugintrust]

## 默认值与迁移 {#config-defaults}

**默认值示例（均有来源）**：[@ref-costrict-settings-cleanup][@ref-costrict-settings-updates]

| 设置 | 默认/行为 |
| :-- | :-- |
| `cleanupPeriodDays` | 30 天（最小值 1，设为 `0` 会被验证拒绝），同时控制孤立子代理工作树的清理年龄 |
| `autoUpdatesChannel` | `"latest"`（默认，另有 `"stable"`） |
| `defaultShell` | `"bash"` |
| `attribution` | 取代已弃用的 `includeCoAuthoredBy`；后者默认 `true`，控制 git 提交与 PR 中的 CSC 署名 |
| `includeGitInstructions` | 默认 `true`（关闭后移除内置 git 指令与状态快照，环境变量 `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` 优先于该设置） |
| `pluginTrustMessage` / `strictKnownMarketplaces` / `blockedMarketplaces` | 仅托管设置 |
| `worktree.symlinkDirectories` | 默认不符号链接任何目录；`worktree.sparsePaths` 用 sparse-checkout 只检出列出的路径 |

上表中的工作树设置用 `%` 前缀写 `worktree.symlinkDirectories` 与 `worktree.sparsePaths`，用于减少大型 monorepo 的磁盘占用与启动时间（默认不符号链接任何目录）。[@ref-costrict-settings-worktree]

Hook 侧默认值：命令 Hook 超时 600 秒、提示 Hook 30 秒、代理 Hook 60 秒（`timeout` 以秒为单位），异步 Hook 未指定时使用同样的 10 分钟默认上限；子代理侧 `background` 默认 `false`、`effort` 默认继承会话（`isolation: worktree` 时在临时 git worktree 中运行）。[@ref-costrict-hooks-common][@ref-costrict-hooksguide-trouble][@ref-costrict-agents-fielddefaults]

**迁移与弃用**：[@ref-costrict-settings-ignorepatterns][@ref-costrict-settings-gitkeys][@ref-costrict-settings-managed]

- `ignorePatterns` 已弃用，改用 `permissions.deny`（如 `Read(./.env)`、`Read(./secrets/**)`），匹配的文件从文件发现与搜索结果中排除且读取被拒绝；
- `includeCoAuthoredBy` 已弃用，改用 `attribution`；
- 旧版 Windows 托管设置路径 `C:\ProgramData\CoStrict\managed-settings.json` 自 v2.1.75 起不再受支持，需迁移到 `C:\Program Files\CoStrict\managed-settings.json`；
- 插件更新依赖 `plugin.json` 中的版本号：改了代码但没有提升版本时，由于缓存，已有用户看不到变更（详见插件章节）。[@ref-costrict-pluginref-version]

## 诊断：查看实际生效来源 {#config-diagnostics}

- `/status` 打开设置界面的状态选项卡，显示版本、模型、账户与连接状态；官方给出的用途之一是**查看哪些设置源处于活动状态以及它们来自哪里**，输出会标出每一层（托管、用户、项目）及其来源，例如 `Enterprise managed settings (remote)`、`(plist)`、`(HKLM)`、`(file)`；设置文件含错误时 `/status` 会报告问题。[@ref-costrict-settings-validate][@ref-costrict-cmd-status]
- `/doctor` 诊断并验证 CSC 安装与设置；命令参考同时是第一方命令与捆绑 Skill 的总表，输入 `/` 可查看当前可用命令（可用性取决于平台、计划与环境）。[@ref-costrict-cmd-doctor][@ref-costrict-cmd-intro]
- `/config` 打开设置界面调整偏好；`--debug` / `--debug-file` 把调试日志写到已知位置（`--debug` 不打印到终端，日志位于 `~/.costrict/debug/〔session-id〕.txt`）。[@ref-costrict-cmd-config][@ref-costrict-cli-debug]
- **"文件已写但没有生效"的常见原因**（都有来源）：被更高优先级作用域覆盖（托管 > CLI 标志 > 本地 > 项目 > 用户）；数组设置是合并而非替换，看起来"没有替换"是预期行为；环境变量优先于其等效设置，但逐个变量规则不同；某些键只从托管设置读取（放进用户/项目文件无效果）；插件因缓存按版本判断更新，未提升版本就不会更新；托管 Hook 只能由托管级别的 `disableAllHooks` 禁用。[@ref-costrict-settings-priority][@ref-costrict-perm-managed][@ref-costrict-pluginref-version][@ref-costrict-hooks-disablehooks]
