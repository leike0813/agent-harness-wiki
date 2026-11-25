---
schema_version: 3
record_kind: production
edition_id: auggie-cli-configuration-v2
harness_id: auggie
topic: configuration
title: "Auggie CLI 的设置层级、菜单、合并优先级与诊断（1.x 文档线）"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-reference-config, ref-auggie-repo-changelog, ref-auggie-docs-workspace-context, ref-auggie-docs-config-example, ref-auggie-docs-rules-supported, ref-auggie-docs-rules-flag, ref-auggie-1x-settings-files, ref-auggie-1x-settings-menu, ref-auggie-1x-settings-keybindings, ref-auggie-1x-settings-jsonc-restart, ref-auggie-1x-rules-locations, ref-auggie-1x-rules-types, ref-auggie-1x-rules-manual, ref-auggie-1x-rules-system, ref-auggie-1x-reference-workspace]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-perms-types, ref-auggie-docs-perms-files, ref-auggie-docs-perms-legacy, ref-auggie-repo-changelog, ref-auggie-docs-perms-basic, ref-auggie-1x-perms-types, ref-auggie-1x-perms-files, ref-auggie-1x-perms-legacy, ref-auggie-1x-perms-basic, ref-auggie-1x-settings-files, ref-auggie-1x-reference-tools, ref-auggie-1x-settings-common, ref-auggie-1x-settings-themes]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-reference-tools, ref-auggie-docs-reference-config, ref-auggie-docs-reference-mcp, ref-auggie-docs-reference-env, ref-auggie-docs-config-options, ref-auggie-1x-reference-tools, ref-auggie-1x-reference-workspace, ref-auggie-1x-reference-models, ref-auggie-1x-reference-env, ref-auggie-1x-reference-mcp, ref-auggie-1x-reference-skills, ref-auggie-1x-reference-diagnostics]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-hooks-locations, ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-perms-enforced, ref-auggie-docs-plugins-settings, ref-auggie-1x-settings-files, ref-auggie-1x-perms-files, ref-auggie-1x-hooks-locations]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-options, ref-auggie-docs-config-example, ref-auggie-docs-plugins-settings, ref-auggie-docs-hooks-scripts, ref-auggie-docs-config-hierarchy, ref-auggie-docs-autoupgrade-how, ref-auggie-1x-settings-common, ref-auggie-1x-settings-themes, ref-auggie-1x-settings-example, ref-auggie-1x-settings-options, ref-auggie-1x-settings-files, ref-auggie-1x-autoupgrade-work, ref-auggie-1x-autoupgrade-disable, ref-auggie-1x-changelog-breaking, ref-auggie-1x-changelog-staying, ref-auggie-1x-guide-channels, ref-auggie-1x-overview-channels, ref-auggie-1x-plugins-settings]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-wizard, ref-auggie-docs-config-options, ref-auggie-docs-interactive-common, ref-auggie-docs-interactive-additional, ref-auggie-docs-reference-rules, ref-auggie-docs-reference-tools, ref-auggie-docs-reference-mcp, ref-auggie-docs-reference-models, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-docs-config-hierarchy, ref-auggie-docs-config-manual, ref-auggie-1x-settings-menu, ref-auggie-1x-settings-options, ref-auggie-1x-settings-files, ref-auggie-1x-settings-keybindings, ref-auggie-1x-perms-files, ref-auggie-1x-interactive-slash, ref-auggie-1x-interactive-shortcuts, ref-auggie-1x-reference-diagnostics, ref-auggie-1x-reference-models]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-auggie-1x-settings-files, ref-auggie-1x-settings-menu, ref-auggie-docs-workspace-context, ref-auggie-1x-rules-locations, ref-auggie-1x-rules-system]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-1x-perms-types, ref-auggie-1x-perms-files, ref-auggie-1x-settings-files, ref-auggie-1x-perms-legacy]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-auggie-1x-reference-tools, ref-auggie-1x-reference-workspace, ref-auggie-1x-reference-models, ref-auggie-1x-reference-env, ref-auggie-1x-reference-mcp, ref-auggie-1x-reference-skills, ref-auggie-1x-reference-diagnostics]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-auggie-1x-settings-files, ref-auggie-docs-hooks-locations, ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-perms-enforced, ref-auggie-1x-perms-files]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-auggie-1x-settings-common, ref-auggie-1x-settings-themes, ref-auggie-1x-settings-options, ref-auggie-1x-settings-example, ref-auggie-1x-autoupgrade-work, ref-auggie-docs-plugins-settings]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-auggie-docs-perms-legacy, ref-auggie-repo-changelog, ref-auggie-1x-perms-legacy, ref-auggie-1x-settings-common, ref-auggie-1x-settings-themes]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-auggie-1x-settings-menu, ref-auggie-1x-settings-files, ref-auggie-1x-settings-keybindings, ref-auggie-1x-interactive-slash, ref-auggie-1x-reference-diagnostics, ref-auggie-docs-logs-path]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档站页面（每页顶部标注 “You're viewing docs for **Auggie 1.x.x** (prerelease)” 并提供 `/cli/v0/` 旧版链接）与官方仓库提交 `8bd7186ea04e77d11f63e5850482643c8767666b` 的 `CHANGELOG.md` 与 `docs/1.x-preview-guide.md`。这些页面描述 **Auggie 1.x 文档线**，不等于 npm 上 0.x 发行版的行为；快照的 `version_applicability` 仍为 `unknown`，本章不构成对某个具体 npm 版本的映射。0.x 结论保留在本章对应位置的版本线说明里，不覆盖旧章节与旧引用。

## 配置来源与路径 {#config-sources}

1.x 的固定来源是官方文档站的 “Settings” 页（旧地址 `/cli/config.md` 现在解析到 `/cli/settings.md`）、CLI 参考页、Workspace context 页与 Rules 页，以及官方仓库提交 `8bd7186e…`。[@ref-auggie-1x-settings-files][@ref-auggie-1x-settings-menu][@ref-auggie-docs-workspace-context]

设置文件仍是四层，优先级从高到低：[@ref-auggie-1x-settings-files]

| 层 | 路径 | 说明 |
| :-- | :-- | :-- |
| 受管设置（只读） | `/etc/augment/settings.json`（macOS／Linux）、`C:\ProgramData\augment\settings.json`（Windows） | 组织管理员设置，用户不可覆盖 |
| 本地项目设置 | 工作区根的 `.augment/settings.local.json` | 个人项目覆盖，不应提交 |
| 项目设置 | 工作区根的 `.augment/settings.json` | 团队共享，应提交到版本库 |
| 用户设置 | home 目录的 `.augment/settings.json` | 跨项目个人默认值；`/settings` 的写入目标 |

1.x 的 `/settings` 菜单**总是**把改动写入用户设置 `~/.augment/settings.json`（Windows 为 `C:\Users\USERNAME\.augment\settings.json`），**不再询问保存到哪一层**；要改项目或本地设置，需要直接编辑对应文件，或用仍支持作用域的 CLI 命令（例如 `auggie mcp add --project`／`--local`）。0.x 的 `/config` 会在存在多个可写文件时提示保存位置，这一点在 1.x 已不成立。[@ref-auggie-1x-settings-menu][@ref-auggie-1x-settings-files]

文件格式是 JSON，并支持 JSONC（注释与尾逗号）。手动修改后需要重启 Auggie 才生效。[@ref-auggie-1x-settings-files][@ref-auggie-1x-settings-jsonc-restart][@ref-auggie-1x-settings-keybindings]

工作区根由启动参数决定：在 git 目录运行 `auggie` 时自动索引该仓库，非 git 目录用当前工作目录；`--workspace-root`（`-w`）可显式指定，`--add-workspace` 可追加索引其它目录，`--discover-workspaces[=depth]` 在非 git 根下发现 git 仓库，`--augment-cache-dir` 迁移 `~/.augment` 配置与缓存目录。[@ref-auggie-1x-reference-workspace]

规则文件是独立的配置输入通道。1.x 的加载位置依次是：`--rule` 指定的文件或目录、工作区根的 `.augment/rules/`（递归 `.md` 与 `.mdc`）、用户目录的 `~/.augment/rules/`（递归 `.md` 与 `.mdc`）、从当前目录向上直到各父目录的 `AGENTS.md`（同一目录内优先）或 `CLAUDE.md`、工作区根的 `.augment-guidelines`；`--no-rules` 关闭发现，`/rules` 查看已加载规则与类型。另有 `.augment/SYSTEM.md`（替换默认 system prompt）与 `.augment/APPEND_SYSTEM.md`（追加），项目文件存在时优先于用户文件。[@ref-auggie-1x-rules-locations][@ref-auggie-1x-rules-system]

工作区规则可用 frontmatter 的 `type` 控制生效方式：`always_apply`（默认，每次用户请求都附带）、`agent_requested`（按 `description` 自动判断并附加）、`manual`（仅在消息中用 `$rule-name` 引用时附加；子目录规则写作 `$folder/name`，含空格的名字加引号，例如 `$"my rule"`）。用户目录 `~/.augment/rules/` 的规则始终按 `always_apply` 处理。[@ref-auggie-1x-rules-types][@ref-auggie-1x-rules-manual]

## 合并、优先级与历史兼容 {#config-overrides}

1.x 页面明确：高优先级文件覆盖低优先级文件，所有文件的工具权限规则合并。0.x 页面还给出更细的合并说明（MCP 与插件条目整体替换、`removedTools`／`indexingAllowDirs` 之类列表取并集、`verbose`／`vimMode` 只从用户设置读取）——这些细则是 0.x 快照的记载，1.x 页面没有重申，因此只能作为 0.x 结论保留，不能当作 1.x 已验证行为。[@ref-auggie-1x-settings-files][@ref-auggie-docs-config-hierarchy]

1.x 的工具权限有五类：`allow`、`deny`、`ask-user`（无交互界面时按拒绝处理）、`webhook-policy`、`script-policy`。单个策略内自上而下匹配、先命中者生效；跨策略取**最严格**者，顺序为 `deny` > `webhook-policy` > `script-policy` > `ask-user` > `allow`。命令行 `--permission`（例如 `--permission bash:ask-user`）形成独立策略，因此 `--permission` 的 deny 一定生效。[@ref-auggie-1x-perms-types][@ref-auggie-1x-reference-tools]

1.x 的工具权限配置文件有四个：受管 `/etc/augment/settings.json`（Windows 为 `C:\ProgramData\augment\settings.json`）、`.augment/settings.local.json`、`.augment/settings.json`、`~/.augment/settings.json`。交互模式用 `/permissions` 查看并增删改所有来源的规则。0.x 只列用户与项目两个文件，这一点在 1.x 已扩展。[@ref-auggie-1x-perms-files]

**历史兼容（1.x）**：1.x 把工具名统一成短动词，权限规则只识别旧名表中列出的名字：`launch-process`／`shell`→`bash`、`view`→`read`、`str-replace-editor`／`str_replace_editor`→`edit`、`save-file`／`save_file`→`write`、`grep-search`→`grep`。0.x 的 `terminal` 不在该表中，因此用 `terminal` 写的权限规则在 1.x 不会被匹配，必须改写为 `bash`；其它旧名（如 `read_file`、`launch_process`、`file_search`）同样不生效。裸字符串 `permission` 的处理在 1.x “Basic Rule Structure” 中仍有原文：`permission` 必须是带 `type` 字段的对象，裸字符串规则会被丢弃，并在启动时告警。[@ref-auggie-1x-perms-legacy][@ref-auggie-1x-perms-basic][@ref-auggie-docs-perms-legacy][@ref-auggie-repo-changelog]

1.x 的显式迁移说明集中在仓库 `CHANGELOG.md` 1.2.0 的 Breaking Changes 与 `docs/1.x-preview-guide.md`：`/persona` 由自定义 agent／rules／`/permissions` 取代；Shift+Tab 改为切换 reasoning effort；Option/Alt+Enter 改为排队 follow-up（换行用 Shift+Enter，任何终端可用 Ctrl+J）；工具名与 hook payload 变化见 Hooks 章节；行内输入补全与 Gist 会话分享被移除。设置侧，`shell`（0.x 名）仍可用、新名为 `shellPath`；`startupScript`（0.x 名）仍可用、新名为 `shellCommandPrefix`；旧的 `default-dark` 主题按 `dark` 处理；`chatInputCompletions` 设置被忽略。官方没有给出配置迁移工具或完整弃用清单，因此 `config.migration` 仍是 partial。[@ref-auggie-1x-settings-common][@ref-auggie-1x-settings-themes]

## 运行时覆盖：CLI 参数与环境变量 {#config-runtime}

1.x 的 CLI 参数（官方参考页）与配置相关的部分：[@ref-auggie-1x-reference-workspace][@ref-auggie-1x-reference-models][@ref-auggie-1x-reference-tools][@ref-auggie-1x-reference-skills][@ref-auggie-1x-reference-mcp][@ref-auggie-1x-reference-diagnostics]

| 类别 | 1.x 参数 |
| :-- | :-- |
| 工作区 | `--workspace-root`／`-w`、`--add-workspace`、`--discover-workspaces[=depth]`、`--no-discover-workspaces`、`--worktree [slug]`、`--allow-indexing`、`--wait-for-indexing`、`--augment-cache-dir` |
| 模型与思考 | `--model "name"`（可写 `name:effort`）、`--thinking EFFORT`、`--models PATTERNS`、`auggie model list [search] --json` |
| 规则、Skill 与资源 | `--rule`、`--no-rules`、`--skill`、`--no-skills`、`--prompt-template`、`--theme` |
| 工具与权限 | `--tools read,bash,edit,write`、`--no-tools`、`--remove-tool TOOL`、`--permission TOOL:DECISION`、`--enable-tool-search` |
| MCP | `--mcp-config JSON_OR_PATH`（最后应用并覆盖设置中的同名项）、`auggie mcp add --project`／`--local` |
| 诊断与运行 | `--log-file PATH`、`--log-level error|warn|info|debug`（默认 info）、`--verbose`、`--offline`、`--check-startup`、`--print --mode stream|json`、`--show-cost` |

环境变量在 1.x 参考页只列两个：`AUGMENT_SESSION_AUTH`（认证 JSON）与 `AUGMENT_DISABLE_AUTO_UPDATE`（关闭自动更新）。0.x 页面列出的 `GITHUB_API_TOKEN`、`AUGMENT_AGENT=1` 以及 `--github-api-token` 在 1.x 参考页与 automation 页中都不再出现，因此本章不再把它们当作 1.x 的配置面。[@ref-auggie-1x-reference-env]

**缺口（partial）**：固定来源没有 profile 概念，也没有“环境变量覆盖设置文件”的通用映射表；除上述两个变量外，1.x 页面没有给出可引用的环境变量清单。[@ref-auggie-1x-reference-env][@ref-auggie-1x-reference-diagnostics]

## 信任与组织策略 {#config-trust}

- 受管设置（`/etc/augment/settings.json`、Windows 的 `C:\ProgramData\augment\settings.json`）优先级最高且**不可被任何其它来源覆盖**。[@ref-auggie-1x-settings-files][@ref-auggie-docs-hooks-locations]
- 组织管理设置文件时，插件市场的自动更新开关可能显示 `(locked)` 并被接管；这是 0.x 插件页的记载，1.x 插件页不再描述自动市场更新，见“原生插件”章节。[@ref-auggie-docs-plugins-autoupdate]
- `toolPermissions` 由 Auggie CLI 与 Cosmos 云 agent 共同遵守（在 agent 启动时加载并作用于每次工具调用），但 Augment 代码扩展不强制执行；1.x 权限页页首仍保留这一边界。[@ref-auggie-docs-perms-enforced][@ref-auggie-1x-perms-files]
- 项目设置随仓库对所有贡献者生效，文档仍建议用项目 `.augment/settings.json` 实施组织策略（例如阻断 `git merge`）；Hooks 页也把项目级设置列为让仓库自带 hook 自动生效的方式。[@ref-auggie-docs-plugins-settings][@ref-auggie-1x-hooks-locations]

**缺口（partial）**：CLI 文档没有描述“工作区信任”提示、首次打开仓库时的确认流程或按仓库拒绝配置的机制；能确认的只有文件层级与只读层级。[@ref-auggie-1x-settings-files]

## 默认值与平台差异 {#config-defaults}

1.x 可确认的设置项与默认值：[@ref-auggie-1x-settings-common][@ref-auggie-1x-settings-options][@ref-auggie-1x-settings-themes][@ref-auggie-1x-settings-example]

| 项 | 1.x 说明 |
| :-- | :-- |
| `theme` | 内置 `dark`、`light`、`ansi`，或自定义主题；0.x 的 `default-dark` 按 `dark` 处理。1.x 页面没有逐项写明默认主题 |
| `autoUpdate` | 交互模式自动更新；print 模式完全禁用，以固定版本 |
| `compaction.enabled` | 自动压缩（上下文将满时摘要会话） |
| `steeringMode`／`followUpMode` | `one-at-a-time` 或 `all` |
| `doubleEscapeAction` | `tree`、`fork` 或 `none` |
| `enableSkillCommands` | 把 Skill 注册为 `/skill:NAME` 命令，默认开启（可设 `false` 关闭） |
| `disableToolSearch` | 关闭自动 MCP 工具发现；只在自动发现可用时出现 |
| `defaultThinkingLevel` | `off`、`minimal`、`low`、`medium`、`high`、`xhigh` |
| `notificationMode` | `off`、`bell`、`desktop_notification` |
| `enabledPlugins` | 插件 ID 到布尔值的映射，默认 `{}` [@ref-auggie-docs-plugins-settings] |
| `recommendedMarketplaces`／`dismissedMarketplaces`／`autoUpdateMarketplaces` | 1.x 插件页不再列出这些键；0.x 页面记载的默认值分别是 `[]`／`[]`／`true` [@ref-auggie-1x-plugins-settings] |
| hook `timeout` | 60000 毫秒 |
| hook `matcher` | `".*"`（仅工具事件；1.x 改为大小写不敏感） |
| `--log-level` | `info`（可选 `error`、`warn`、`debug`） |

平台差异集中在路径：受管设置与用户设置目录 macOS／Linux 与 Windows 不同；hook 的 `command` 在 Unix 走 `/bin/sh`、Windows 走 `cmd.exe`，1.x 不再要求脚本扩展名。[@ref-auggie-docs-hooks-scripts][@ref-auggie-1x-settings-files]

自动更新的生效条件：只在交互模式生效，非交互（print）模式完全禁用；1.x 还写明 prerelease 安装只更新到更新的 1.x prerelease、stable 安装从 `latest` 更新，并且**不会跨大版本自动升级**（例如 0.x → 1.x 只显示提示）。`autoUpdate: false` 或 `AUGMENT_DISABLE_AUTO_UPDATE=1` 可关闭。[@ref-auggie-1x-autoupgrade-work][@ref-auggie-1x-autoupgrade-disable]

**来源冲突（保留边界）**：仓库 `CHANGELOG.md` 的 1.2.0 条目说 1.2.0 是 1.x 首个稳定版、`npm install -g @augmentcode/auggie` 现在安装 1.x，并说 0.x 在开启自动更新时会自动升到 1.x；`docs/1.x-preview-guide.md`（同一提交）的发布渠道表仍写 `latest`=0.x、`preview`=1.x；文档页顶部仍标注 1.x 为 prerelease，Overview 页说 1.x 发布在 `prerelease` 标签、0.x 在 `v0-release` 标签。这些说法无法仅凭固定来源判定哪个是当前渠道事实，本章保留各自原文与适用版本线，不合并成单一结论；要固定 0.x 需安装 `@augmentcode/auggie@v0-release` 并关闭自动更新。[@ref-auggie-1x-changelog-breaking][@ref-auggie-1x-changelog-staying][@ref-auggie-1x-guide-channels][@ref-auggie-1x-overview-channels]

## 诊断与重载 {#config-diagnostics}

| 要查的事 | 1.x 入口 |
| :-- | :-- |
| 当前设置项（菜单） | 交互模式 `/settings`（General／Display 分组；不是 0.x 的 `/config`） [@ref-auggie-1x-settings-menu][@ref-auggie-1x-settings-options] |
| 快捷键 | `/hotkeys` 查看全部；`~/.augment/keybindings.json` 自定义，`/reload` 应用 [@ref-auggie-1x-settings-keybindings][@ref-auggie-1x-interactive-shortcuts] |
| 权限规则 | `/permissions` 查看并增删改所有来源的规则；`--permission TOOL:DECISION` 单次覆盖 [@ref-auggie-1x-interactive-slash][@ref-auggie-1x-perms-files] |
| 系统、MCP 与规则 | `/status`；`/mcp`（含 `/restart-mcp`）；`/rules`；`/about` [@ref-auggie-1x-interactive-slash] |
| 模型清单 | `auggie model list --json`；`/model`；`/effort` 或 Shift+Tab 调 reasoning effort [@ref-auggie-1x-reference-models] |
| 日志 | `--log-file PATH`（默认临时目录；macOS `$TMPDIR/augment-log.txt`，Windows `%TEMP%\augment-log.txt`）、`--log-level debug`、`--check-startup` [@ref-auggie-1x-reference-diagnostics][@ref-auggie-docs-logs-path] |

**“文件已写但不生效”的排查顺序**：确认写到了哪一层（`/settings` 只写用户设置；项目／本地要直接编辑或加 `--project`／`--local`）；确认该键是否被更高优先级文件覆盖，或是否属于 1.x 已移除／忽略的键（如 `chatInputCompletions`）；最后按文档要求**重启 Auggie**——手动修改设置文件后需要重启。`/reload` 重载的是 keybindings、extensions、skills、prompts 与 themes，不是设置文件本身。[@ref-auggie-1x-settings-files][@ref-auggie-1x-interactive-slash][@ref-auggie-1x-settings-keybindings]

**版本边界**：0.x 章节与引用记录的 `/config` 向导、保存位置提示、`enableChatInputCompletions`、`autoUpdateMarketplaces` 等仍是 0.x 文档的事实；本章不把它们删除或改写，只在 1.x 结论处标注差异。[@ref-auggie-docs-config-wizard][@ref-auggie-docs-config-options][@ref-auggie-docs-config-manual]
