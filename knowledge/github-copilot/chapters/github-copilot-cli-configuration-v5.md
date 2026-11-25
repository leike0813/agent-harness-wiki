---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-configuration-v5
harness_id: github-copilot
topic: configuration
title: "GitHub Copilot CLI 配置机制：来源与优先级、运行时覆盖、信任与默认值、迁移与诊断"
sections:
  - section_id: configuration-scope
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-overview, ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-config, ref-github-copilot-cfgdir-permissions, ref-github-copilot-cfgdir-providers, ref-github-copilot-conc-customize, ref-github-copilot-cmdref-configsettings]
  - section_id: configuration-sources-precedence
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-settings-overview, ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-local-settings, ref-github-copilot-cfgdir-models-allowlist, ref-github-copilot-cfgdir-mdm, ref-github-copilot-cfgdir-mdm-sources, ref-github-copilot-cfgdir-mdm-keys, ref-github-copilot-cfgdir-permissions-location, ref-github-copilot-cfgdir-config-internal-state, ref-github-copilot-cfgdir-config-command-tip, ref-github-copilot-cmdref-config-command, ref-github-copilot-cmdref-config-command-options, ref-github-copilot-cfgdir-providers, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-configsettings, ref-github-copilot-cfgdir-managed-restrictions-20261124, ref-github-copilot-plugins-strict-managed-20261124, ref-github-copilot-cfgdir-force-refresh-20261124]
  - section_id: configuration-runtime
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-settings-overview, ref-github-copilot-cfgdir-move, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-env, ref-github-copilot-cmdref-allowall, ref-github-copilot-cmdref-sandbox-floor, ref-github-copilot-cmdref-toolpatterns, ref-github-copilot-cmdref-plan, ref-github-copilot-cmdref-sandboxca-configdir, ref-github-copilot-cfgdir-providers, ref-github-copilot-conc-models, ref-github-copilot-conc-byok, ref-github-copilot-best-model, ref-github-copilot-auth-envvars, ref-github-copilot-auth-storage, ref-github-copilot-settings-restart, ref-github-copilot-settings-not-cli, ref-github-copilot-cmdref-host-20261124, ref-github-copilot-cmdref-env-host-20261124, ref-github-copilot-cmdref-assisted-20261124, ref-github-copilot-cmdref-env-assist-20261124, ref-github-copilot-configure-assisted-20261124, ref-github-copilot-cfgdir-default-permission-20261124, ref-github-copilot-cmdref-remote-flag-20261124, ref-github-copilot-cmdref-sync-session-20261124, ref-github-copilot-cfgdir-remote-sessions-20261124, ref-github-copilot-cfgdir-remote-export-20261124, ref-github-copilot-cmdref-no-auto-update-20261124, ref-github-copilot-cmdref-env-auto-update-20261124, ref-github-copilot-cmdref-autopilot-20261124, ref-github-copilot-cmdref-telemetry-20261124, ref-github-copilot-configure-mcp-tool-20261124]
  - section_id: configuration-trust-defaults
    surface_ids: [cli]
    source_refs: [ref-github-copilot-config-trust, ref-github-copilot-config-trust-edit, ref-github-copilot-config-approval, ref-github-copilot-config-tool-select, ref-github-copilot-config-limits, ref-github-copilot-config-paths, ref-github-copilot-config-urls, ref-github-copilot-config-allow-all, ref-github-copilot-config-restrict, ref-github-copilot-config-shell, ref-github-copilot-config-write, ref-github-copilot-config-mcp-tools, ref-github-copilot-tools-persisted, ref-github-copilot-tools-layers, ref-github-copilot-tools-restrict, ref-github-copilot-tools-reset, ref-github-copilot-cfgdir-permissions-schema, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-conc-trust, ref-github-copilot-conc-exclusion, ref-github-copilot-conc-sandbox, ref-github-copilot-conc-tools, ref-github-copilot-conc-tools-approval, ref-github-copilot-conc-tools-combine, ref-github-copilot-cmdref-sandbox-floor, ref-github-copilot-cmdref-sandboxca, ref-github-copilot-cmdref-sandboxca-subcommands, ref-github-copilot-cmdref-sandboxca-configdir, ref-github-copilot-cfgdir-mdm-permissions, ref-github-copilot-admin-exclusion, ref-github-copilot-admin-notapply, ref-github-copilot-settings-not-cli, ref-github-copilot-cfgdir-bypass-20261124, ref-github-copilot-cmdref-bypass-section-20261124, ref-github-copilot-cmdref-assisted-20261124, ref-github-copilot-cfgdir-default-permission-20261124, ref-github-copilot-cfgdir-default-mode-20261124, ref-github-copilot-cfgdir-sandbox-outbound-20261124, ref-github-copilot-cfgdir-sandbox-filesystem-20261124, ref-github-copilot-cmdref-parent-url-20261124, ref-github-copilot-cmdref-session-approvals-20261124]
  - section_id: configuration-migration-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-settings-configjson-ignored, ref-github-copilot-cfgdir-settings-invalid-no-merge, ref-github-copilot-cfgdir-config-internal-state, ref-github-copilot-lt-changelog-settings-ignored, ref-github-copilot-cmdref-config-command, ref-github-copilot-cmdref-config-command-options, ref-github-copilot-cmdref-config-command-values, ref-github-copilot-cfgdir-mdm, ref-github-copilot-cfgdir-permissions-location, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-configsettings, ref-github-copilot-cmdref-init, ref-github-copilot-settings-open, ref-github-copilot-settings-inline, ref-github-copilot-settings-values, ref-github-copilot-settings-get, ref-github-copilot-settings-restart, ref-github-copilot-settings-not-cli, ref-github-copilot-settings-common, ref-github-copilot-admin-why, ref-github-copilot-best-help, ref-github-copilot-cmdref-remote-flag-20261124, ref-github-copilot-cmdref-sync-session-20261124, ref-github-copilot-cfgdir-settings-inline-20261124, ref-github-copilot-cfgdir-force-refresh-20261124]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: configuration-sources-precedence
        status: answered
        source_refs: [ref-github-copilot-cfgdir-settings-overview, ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-local-settings, ref-github-copilot-cfgdir-mdm, ref-github-copilot-cfgdir-mdm-sources, ref-github-copilot-cfgdir-permissions-location, ref-github-copilot-cfgdir-config-internal-state, ref-github-copilot-cfgdir-config-command-tip, ref-github-copilot-cmdref-config-command, ref-github-copilot-cmdref-config-command-options, ref-github-copilot-cfgdir-providers, ref-github-copilot-cmdref-options, ref-github-copilot-cfgdir-managed-restrictions-20261124, ref-github-copilot-plugins-strict-managed-20261124, ref-github-copilot-cfgdir-force-refresh-20261124]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: configuration-sources-precedence
        status: answered
        source_refs: [ref-github-copilot-cfgdir-settings-overview, ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cfgdir-local-settings, ref-github-copilot-cfgdir-models-allowlist, ref-github-copilot-cfgdir-mdm, ref-github-copilot-cfgdir-mdm-keys, ref-github-copilot-cfgdir-managed-restrictions-20261124, ref-github-copilot-plugins-strict-managed-20261124]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: configuration-runtime
        status: partial
        source_refs: [ref-github-copilot-cfgdir-settings-overview, ref-github-copilot-cfgdir-move, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-env, ref-github-copilot-cmdref-allowall, ref-github-copilot-cmdref-sandbox-floor, ref-github-copilot-cmdref-toolpatterns, ref-github-copilot-cmdref-plan, ref-github-copilot-cmdref-sandboxca-configdir, ref-github-copilot-cfgdir-providers, ref-github-copilot-conc-models, ref-github-copilot-conc-byok, ref-github-copilot-best-model, ref-github-copilot-auth-envvars, ref-github-copilot-auth-storage, ref-github-copilot-settings-restart, ref-github-copilot-cmdref-host-20261124, ref-github-copilot-cmdref-env-host-20261124, ref-github-copilot-cmdref-assisted-20261124, ref-github-copilot-cmdref-env-assist-20261124, ref-github-copilot-configure-assisted-20261124, ref-github-copilot-cfgdir-default-permission-20261124, ref-github-copilot-cmdref-remote-flag-20261124, ref-github-copilot-cmdref-sync-session-20261124, ref-github-copilot-cfgdir-remote-sessions-20261124, ref-github-copilot-cfgdir-remote-export-20261124, ref-github-copilot-cmdref-no-auto-update-20261124, ref-github-copilot-cmdref-env-auto-update-20261124, ref-github-copilot-cmdref-autopilot-20261124, ref-github-copilot-cmdref-telemetry-20261124, ref-github-copilot-configure-mcp-tool-20261124]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: configuration-trust-defaults
        status: answered
        source_refs: [ref-github-copilot-config-trust, ref-github-copilot-config-trust-edit, ref-github-copilot-config-paths, ref-github-copilot-config-urls, ref-github-copilot-tools-layers, ref-github-copilot-conc-trust, ref-github-copilot-conc-exclusion, ref-github-copilot-admin-exclusion, ref-github-copilot-admin-notapply, ref-github-copilot-cfgdir-mdm-permissions, ref-github-copilot-cmdref-sandbox-floor, ref-github-copilot-cmdref-sandboxca, ref-github-copilot-cmdref-sandboxca-subcommands, ref-github-copilot-cmdref-sandboxca-configdir, ref-github-copilot-cfgdir-bypass-20261124, ref-github-copilot-cmdref-bypass-section-20261124, ref-github-copilot-cfgdir-sandbox-outbound-20261124, ref-github-copilot-cfgdir-sandbox-filesystem-20261124, ref-github-copilot-cmdref-parent-url-20261124, ref-github-copilot-cmdref-session-approvals-20261124]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: configuration-trust-defaults
        status: partial
        source_refs: [ref-github-copilot-cfgdir-user-settings, ref-github-copilot-config-paths, ref-github-copilot-config-urls, ref-github-copilot-conc-tools, ref-github-copilot-conc-sandbox, ref-github-copilot-conc-tools-approval, ref-github-copilot-settings-not-cli, ref-github-copilot-cfgdir-default-permission-20261124, ref-github-copilot-cfgdir-default-mode-20261124, ref-github-copilot-cfgdir-sandbox-outbound-20261124, ref-github-copilot-cfgdir-sandbox-filesystem-20261124, ref-github-copilot-cmdref-assisted-20261124]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: configuration-migration-diagnostics
        status: answered
        source_refs: [ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-settings-configjson-ignored, ref-github-copilot-cfgdir-config-internal-state, ref-github-copilot-lt-changelog-settings-ignored, ref-github-copilot-cfgdir-mdm, ref-github-copilot-cfgdir-permissions-location, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-configsettings, ref-github-copilot-cmdref-remote-flag-20261124, ref-github-copilot-cmdref-sync-session-20261124, ref-github-copilot-cfgdir-settings-inline-20261124]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: configuration-migration-diagnostics
        status: answered
        source_refs: [ref-github-copilot-cfgdir-settings, ref-github-copilot-cfgdir-settings-invalid-no-merge, ref-github-copilot-cmdref-config-command, ref-github-copilot-cmdref-config-command-options, ref-github-copilot-cmdref-config-command-values, ref-github-copilot-settings-open, ref-github-copilot-settings-inline, ref-github-copilot-settings-values, ref-github-copilot-settings-get, ref-github-copilot-settings-restart, ref-github-copilot-settings-not-cli, ref-github-copilot-settings-common, ref-github-copilot-admin-why, ref-github-copilot-best-help, ref-github-copilot-cmdref-init, ref-github-copilot-cfgdir-settings-inline-20261124, ref-github-copilot-cfgdir-force-refresh-20261124]
---

GitHub Copilot CLI 是闭源发行包（npm 包 `@github/copilot`），本章的事实来源只有官方文档站点归档页与公开仓库内的 `README.md`、`changelog.md`、`install.sh`。配置目录结构、文件清单与合并顺序来自配置目录参考页 [@ref-github-copilot-cfgdir-overview]；命令行为、环境变量与标志来自命令参考页。凡是文档没有明说的默认值或合并细节，本章标为 `partial`，不补造。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 配置范围与章节分工 {#configuration-scope}

Copilot CLI 把配置、会话历史、日志和自定义项集中在一个目录里，默认是 `~/.copilot`（即 `$HOME/.copilot`）。目录顶层包含 `settings.json`、`config.json`、`permissions-config.json`、`providers.json`、`mcp-config.json`、`lsp-config.json`，以及 `agents/`、`skills/`、`hooks/`、`instructions/`、`extensions/` 等子目录 [@ref-github-copilot-cfgdir-overview]。其中 `settings.json` 是主配置文件，`config.json` 是 CLI 自动管理的应用状态（认证、已安装插件等），`permissions-config.json` 保存每个项目位置的工具与目录审批，`providers.json` 是 BYOK provider/model 注册表 [@ref-github-copilot-cfgdir-settings] [@ref-github-copilot-cfgdir-config] [@ref-github-copilot-cfgdir-permissions] [@ref-github-copilot-cfgdir-providers]。

本章只讲跨机制的配置来源、优先级、运行时覆盖、信任与默认值、迁移与诊断。具体机制的文件格式与解析留在各自章节：

- Skill 目录、`SKILL.md` frontmatter、发现与禁用见 Skills 章节；
- MCP server 的文件格式、传输、信任级别与企业 allowlist 见 MCP 章节；
- Hook 的事件、输入载荷与决策控制见 Hooks 章节；
- 自定义 agent 与插件清单见 Custom agents、Plugins 章节；
- 自定义指令文件位置与 `@path` 导入的完整字段见 Custom instructions 章节。

CLI 自身的自定义入口把这些机制并列列出（自定义指令、MCP、自定义 agent、hooks、skills、Copilot Memory）[@ref-github-copilot-conc-customize]；命令参考页的“Configuration file settings”只是把设置清单指回配置目录参考页，不重复内容 [@ref-github-copilot-cmdref-configsettings]。

## 配置来源与优先级 {#configuration-sources-precedence}

文档给出固定的生效顺序，后者覆盖前者 [@ref-github-copilot-cfgdir-settings-overview]：

1. 内置默认值；
2. MDM 托管设置；
3. 用户设置 `~/.copilot/settings.json`；
4. 仓库设置 `.github/copilot/settings.json`；
5. 本地设置 `.github/copilot/settings.local.json`；
6. 环境变量；
7. 命令行标志。

三个文件作用域的分工：用户级是所有仓库的全局默认，路径可用 `COPILOT_HOME` 改变；仓库级是提交进仓库、全体协作者共享的配置；本地级是个人覆盖，需要加入 `.gitignore` [@ref-github-copilot-cfgdir-settings-overview]。CLI 还会读取 `.claude/settings.json` 与 `.claude/settings.local.json`，只为跨工具共享的仓库设置子集生效，例如 `companyAnnouncements`、`disableAllHooks`、`enabledPlugins`、`extraKnownMarketplaces` 和 `hooks` [@ref-github-copilot-cfgdir-settings-overview]。

`settings.json` 支持带注释的 JSON（JSONC）[@ref-github-copilot-cfgdir-settings]。用户级设置有完整的键、类型与默认值表，例如 `autoUpdate`（`true`）、`theme`（`"github"`）、`askUser`（`true`）、`defaultMode`（`"interactive"`）、`defaultPermissionMode`（随环境，`manual`／`assisted`／`allow-all`）、`effortLevel`（模型相关，通常 `"medium"`）、`remoteSessions`（`false`）、`remoteExport`（`true`）、`subagents.maxDepth`（`6`）等 [@ref-github-copilot-cfgdir-user-settings]。

仓库级**只支持表中列出的键**，其余键（包括在用户文件里合法的键）被静默忽略。每个支持的键带一个方向性合并策略 [@ref-github-copilot-cfgdir-repo-settings]：

| 键 | 合并行为 |
| --- | --- |
| `companyAnnouncements`、`contextTier`、`effortLevel`、`mergeStrategy`、`model` | 替换，仓库优先 |
| `deniedUrls`、`disabledMcpServers`、`disabledSkills` | 并集，仓库只能追加不能删除 |
| `enabledPlugins`、`extraKnownMarketplaces`、`hooks` | 逐键合并，同名时仓库覆盖用户 |
| `respectGitignore` | 只能收紧（仓库可启用，不能禁用） |

`model`、`effortLevel`、`contextTier` 的仓库覆盖只在工作目录被信任时生效 [@ref-github-copilot-cfgdir-repo-settings]。本地设置 `.github/copilot/settings.local.json` 用与仓库设置相同的 schema，并优先于它 [@ref-github-copilot-cfgdir-local-settings]。仓库还可以用纯文本 `.github/allowed_models.txt` 限制内置模型，用 glob 匹配模型 ID，并用 `fallback: MODEL-ID` 指定回退模型；该列表只管内置模型，管不到 BYOK 自定义模型 [@ref-github-copilot-cfgdir-models-allowlist]。

MDM 托管设置在启动时加载，作为策略基线与用户设置合并；多数键用户可覆盖，但 `permissions.disableBypassPermissionsMode` 的 `"disable"` 永远胜出，`sandbox.*` 则是不可放松的下限 [@ref-github-copilot-cfgdir-settings-overview]。设备（MDM）与服务端托管设置**按 key 解析**：MDM 设过的键以 MDM 为准，服务端只填充 MDM 未设的键 [@ref-github-copilot-cfgdir-mdm]。MDM 来源随平台不同 [@ref-github-copilot-cfgdir-mdm-sources]：

| 平台 | 来源类型 | 位置 |
| --- | --- | --- |
| macOS | MDM plist | `com.github.copilot` |
| macOS | 文件 | `/Library/Application Support/GitHubCopilot/managed-settings.json` |
| Windows | MDM 注册表 | `HKLM\SOFTWARE\Policies\GitHubCopilot` |
| Windows | 文件 | `%ProgramFiles%\GitHubCopilot\managed-settings.json` |
| Linux | 文件 | `/etc/github-copilot/managed-settings.json` |

MDM 支持的键包括 `model`、`permissions`、`sandbox`、`allowedMcpServers`、`deniedMcpServers`、`enabledPlugins`、`extraKnownMarketplaces`、`forceLoginOrgs`、`forceRemoteSettingsRefresh`、`policyHelper`、`remoteControl`、`shellShortcut`、`strictKnownMarketplaces`、`strictPluginOnlyCustomization`、`allowManagedHooksOnly`、`telemetry` 等；多数托管键锁整行（本地修改会在下次加载时被静默覆盖），只有 `enabledPlugins` 与 `extraKnownMarketplaces` 按条目合并 [@ref-github-copilot-cfgdir-mdm-keys]。

托管设置适用于所有会话承载模式——交互式、`-p`、`--acp`、`--ahp-host` 与 `--server`——因此企业 MCP、权限与插件策略不能靠换一个启动入口绕过 [@ref-github-copilot-cfgdir-managed-restrictions-20261124]。`strictPluginOnlyCustomization` 的限制跨原生 MDM、管理员部署的 `managed-settings.json`、服务端托管设置与 policy-helper 设置合并：任一来源限制的类别保持限制，另一个来源写 `false` 或更窄的数组都不能解除 [@ref-github-copilot-cfgdir-managed-restrictions-20261124] [@ref-github-copilot-plugins-strict-managed-20261124]。长会话会**每小时重新获取并重新应用**托管设置，所以组织新开 `permissions.disableBypassPermissionsMode` 一类策略无需重启会话即可生效 [@ref-github-copilot-cfgdir-managed-restrictions-20261124]。`forceRemoteSettingsRefresh` 则要求启动时必须成功拉取一次新的服务端托管设置，缓存策略不能满足新鲜度要求；拉取失败时受影响操作保持受限，直到确认当前策略，设备（MDM）值优先于缓存的服务端值 [@ref-github-copilot-cfgdir-force-refresh-20261124]。

`permissions-config.json` 的定位按固定优先级取第一个命中项，且不会回退加载低优先级位置的文件 [@ref-github-copilot-cfgdir-permissions-location]：

| 优先级 | 来源 | 使用的文件 |
| --- | --- | --- |
| 1 | `--config-dir=DIRECTORY` | `DIRECTORY/permissions-config.json` |
| 2 | `COPILOT_HOME` | `$COPILOT_HOME/permissions-config.json` |
| 3 | 默认 | `~/.copilot/permissions-config.json` |

`--config-dir` 是遗留选项，文档建议改用 `COPILOT_HOME` [@ref-github-copilot-cfgdir-permissions-location] [@ref-github-copilot-cmdref-options]。`config.json` 只保存 CLI 自动管理的内部状态（认证数据、已安装插件元数据、已信任文件夹等运行时信息）；用户可编辑设置**只**从 `settings.json` 读取，留在 `config.json` 里的用户设置键会被忽略 [@ref-github-copilot-cfgdir-config-internal-state]。

会话之外还可以用 `copilot config` 在命令行读写设置，这是 `/settings`（或 `/config`）斜杠命令的非交互对应物。默认目标是用户设置文件（`~/.copilot/settings.json`，设置了 `COPILOT_HOME` 时为该目录下的同一文件）；`--repo` 与 `--local` 分别把目标切换到仓库的 `.github/copilot/settings.json` 与 `.github/copilot/settings.local.json`，且只接受仓库可覆盖的设置 [@ref-github-copilot-cfgdir-config-command-tip] [@ref-github-copilot-cmdref-config-command] [@ref-github-copilot-cmdref-config-command-options]。`providers.json` 一旦声明了任何 provider 或 model，就优先于遗留的 `COPILOT_PROVIDER_*` 环境变量 [@ref-github-copilot-cfgdir-providers]。完整的设置清单与级联规则，命令参考页直接指回配置目录参考页 [@ref-github-copilot-cmdref-configsettings]。

## 运行时覆盖：环境变量与命令行标志 {#configuration-runtime}

在文件配置之上，环境变量（第 6 层）和命令行标志（第 7 层）依次介入 [@ref-github-copilot-cfgdir-settings-overview]。与配置目录相关的两个入口是 `COPILOT_HOME`（覆盖整个配置与状态目录，默认 `$HOME/.copilot`）[@ref-github-copilot-cfgdir-move] 与遗留的 `--config-dir=DIRECTORY`，后者优先级更高但已弃用 [@ref-github-copilot-cmdref-options]。`copilot sandbox ca` 的子命令同样用 `--config-dir`（或 `COPILOT_HOME`）指向非默认的 Copilot CLI home 目录，与 CLI 其余部分一致；该命令组保留的约束只有身份要求 [@ref-github-copilot-cmdref-sandboxca-configdir]。

命令参考页列出的环境变量中，与配置行为直接相关的有 [@ref-github-copilot-cmdref-env]：

| 变量 | 作用 |
| --- | --- |
| `COPILOT_HOME` | 覆盖配置与状态目录，默认 `$HOME/.copilot` |
| `COPILOT_CACHE_HOME` | 单独覆盖缓存目录（市场缓存、自动更新包等） |
| `COPILOT_ALLOW_ALL` | 等价于 `--allow-all`；设为 `true` 还会直接信任工作目录并加载其 skills/plugins/MCP/hooks，其他真值拼写只自动批准工具 |
| `COPILOT_MODEL` | 设置 AI 模型 |
| `COPILOT_PROVIDERS_CONFIG` | BYOK provider/model 注册表文件路径，默认取 `COPILOT_HOME` 下的 `providers.json`，声明内容后优先于 `COPILOT_PROVIDER_*` |
| `COPILOT_CUSTOM_INSTRUCTIONS_DIRS` | 追加的自定义指令目录 |
| `COPILOT_SKILLS_DIRS` | 追加的 skill 目录 |
| `COPILOT_PLAN_THEN_AUTOPILOT` | 等价于 `--plan --mode autopilot`，供只能注入环境变量的宿主使用 |
| `GITHUB_COPILOT_PROMPT_MODE_REPO_HOOKS` / `..._WORKSPACE_MCP` / `..._EXTENSIONS` | 在 `-p` 模式下分别允许加载仓库 hooks、工作区 MCP 源、项目扩展，默认关闭以避免在无交互信任时运行仓库控制的代码 |

GitHub 主机名的默认链是 `COPILOT_GH_HOST` → `GH_HOST` → `https://github.com`：`COPILOT_GH_HOST` 只作用于 Copilot CLI，并覆盖 `GH_HOST`，用于 `GH_HOST` 指向 GitHub Enterprise Server、而 Copilot 需要登录 GitHub.com 或 GitHub Enterprise Cloud 的场景 [@ref-github-copilot-cmdref-env-host-20261124]；`copilot login --host` 未显式指定时也按这一顺序取默认值，可指向使用数据驻留的 GHEC 实例（如 `https://example.ghe.com`）[@ref-github-copilot-cmdref-host-20261124]。

`providers.json` 与 `COPILOT_PROVIDERS_CONFIG` 指向同一个注册表结构（含 `providers` 与 `models` 两个键），文件声明内容优先于遗留环境变量 [@ref-github-copilot-cfgdir-providers]。BYOK 也可完全用环境变量配置，例如 `COPILOT_PROVIDER_BASE_URL`、`COPILOT_PROVIDER_TYPE`（`openai`、`azure` 或 `anthropic`）、`COPILOT_PROVIDER_API_KEY` 与 `COPILOT_MODEL`；配置 BYOK 后这些变量用于模型请求，与 GitHub 登录状态无关 [@ref-github-copilot-conc-byok] [@ref-github-copilot-auth-storage]。

认证令牌的运行时来源有固定优先级：`COPILOT_GITHUB_TOKEN` → `GH_TOKEN` → `GITHUB_TOKEN` → 系统 keychain 中的 OAuth token → GitHub CLI（`gh auth token`）回退；环境变量会静默覆盖已存储的 OAuth token [@ref-github-copilot-auth-envvars] [@ref-github-copilot-auth-storage]。

辅助权限是介于全手动与 allow-all 之间的运行时模式：交互会话里 `/permissions assisted` 让模型审查符合条件的权限请求并自动批准它判断为安全者，`/permissions manual` 回到手动，`/permissions show` 查看当前模式；已有权限与企业规则仍然生效，仍需你批准者照常弹出 [@ref-github-copilot-configure-assisted-20261124]。用户设置 `defaultPermissionMode: "assisted"` 可把它设为新交互会话的默认（没有托管默认时）；非交互运行用 `--assisted-approval` 或 `COPILOT_ASSISTED_APPROVAL=true`，且 `--assisted-approval` 只对 `-p`／`--prompt` 或无终端的非交互运行有效 [@ref-github-copilot-cmdref-assisted-20261124] [@ref-github-copilot-cmdref-env-assist-20261124] [@ref-github-copilot-cfgdir-default-permission-20261124]。成功启用辅助权限后，它优先于 `--allow-all-tools`，但不影响 `--allow-all-paths` 或 `--allow-all-urls` [@ref-github-copilot-cmdref-assisted-20261124]。

模型与推理强度可用 `--model=MODEL`、`--context TIER` 覆盖已持久化的设置；`effortLevel` 与 `contextTier` 也可在设置文件中给默认值 [@ref-github-copilot-conc-models] [@ref-github-copilot-best-model]。工具权限模式在标志里写作 `Kind(argument)`，支持 `memory`、`read`、`shell`、`url`、`write` 与 MCP server 名，`shell(git:*)` 的 `:*` 后缀匹配命令前缀 [@ref-github-copilot-cmdref-toolpatterns]。MCP server 的工具用 `'MCP_SERVER_NAME(TOOL_NAME)'` 精确允许或拒绝，例如 `--deny-tool='My-MCP-Server(tool_name)'`；只写 server 名会匹配该 server 的全部工具，server 名可在交互模式用 `/mcp` 查到 [@ref-github-copilot-configure-mcp-tool-20261124]。企业策略可以在运行时抬高沙箱下限或屏蔽全部 allow-all 标志 [@ref-github-copilot-cmdref-sandbox-floor] [@ref-github-copilot-cmdref-allowall]；`-p` 模式的计划-自动驾驶切换可用环境变量注入，显式标志优先并伴随忽略警告 [@ref-github-copilot-cmdref-plan]。

远程控制与会话同步是两个独立开关。`remoteSessions`（默认 `false`）为交互会话默认开启远程控制，可用 `/remote on`／`/remote off` 在会话内切换；`remoteExport`（默认 `true`）在会话同步可用时把会话历史同步到账号，设为 `false` 可默认退出，而开启 `remoteSessions: true` 会连带开启导出，但导出本身不会开启远程控制 [@ref-github-copilot-cfgdir-remote-sessions-20261124] [@ref-github-copilot-cfgdir-remote-export-20261124]。`--sync-session[=on|off]` 覆盖单次运行的**只读**会话历史同步：不带值表示开启，不开启远程控制，未指定时沿用设置与默认行为；组织的云会话存储策略关闭或无法确定时拒绝同步 [@ref-github-copilot-cmdref-sync-session-20261124]。`--remote` 已不支持交互式启动或 `-p`，交互会话应改用 `/remote on`，该标志只在遗留 SDK server 启动（`--server`／`--headless`）时保留；`--no-remote` 已移除，`--remote-export` 与 `--no-remote-export` 分别改名为 `--sync-session=on` 与 `--sync-session=off` [@ref-github-copilot-cmdref-remote-flag-20261124]。

`--no-auto-update` 或 `COPILOT_AUTO_UPDATE=false` 关闭 CLI 与第一方插件的自动更新，并阻止更新的缓存版本替代已安装版本 [@ref-github-copilot-cmdref-no-auto-update-20261124] [@ref-github-copilot-cmdref-env-auto-update-20261124]。`--disable-client-telemetry` 只关闭 CLI 发送的客户端遥测，不影响服务端遥测 [@ref-github-copilot-cmdref-telemetry-20261124]。`--max-autopilot-continues=COUNT` 设置 autopilot 目标之外的最大自动续跑次数，默认 `5`，必须是非负整数，`NaN`、负数、小数与科学计数法都会被拒绝 [@ref-github-copilot-cmdref-autopilot-20261124]。

部分设置改动需要重启才完全生效（例如 `experimental` 与代理设置）[@ref-github-copilot-settings-restart]；安全敏感设置、列表与结构化设置不能用单行方式修改，需要打开编辑器编辑 [@ref-github-copilot-settings-not-cli]。

关于“profile”：归档文档没有出现独立的 profile 概念，覆盖入口只有文件、环境变量与命令行标志三层。运行时覆盖的缺口记录在 `config.runtime` 问题中。

## 信任、默认值与策略下限 {#configuration-trust-defaults}

启动会话时会要求确认信任启动目录及其子目录；可选只信任本次会话，或信任本次及以后所有会话。永久信任的目录保存在自动管理的 `config.json` 的 `trustedFolders` 数组里 [@ref-github-copilot-config-trust] [@ref-github-copilot-config-trust-edit]。权限作用域是启发式的，文档明确不保证信任目录之外的所有文件都受保护 [@ref-github-copilot-conc-trust]。

**模式默认值**：`defaultMode` 选择新交互会话的 agent 模式（`interactive`／`plan`／`autopilot`，默认 `interactive`）；`--mode`、`--autopilot`、`--plan` 优先，恢复会话保留自己的模式，`-p`／`--prompt`、`--server`、`--acp` 运行忽略该设置 [@ref-github-copilot-cfgdir-default-mode-20261124]。`defaultPermissionMode` 选择新交互会话的权限模式（`manual`／`assisted`／`allow-all`，默认随环境）；托管 `permissions.defaultMode` 优先于它；若两个默认都未设置，会话可能以 manual 或 assisted 启动；`allow-all` 等价于 `--allow-all`，但 deny 规则与企业限制仍然生效 [@ref-github-copilot-cfgdir-default-permission-20261124]。

默认访问范围：CLI 默认可访问当前工作目录、其子目录以及系统临时目录，`--allow-all-paths` 可关闭路径校验，`--disallow-temp-dir` 可禁止临时目录 [@ref-github-copilot-config-paths]。URL 默认全部需要审批，`--allow-all-urls` 可关闭校验，也可用 `--allow-url=DOMAIN` 预批准、`--deny-url=DOMAIN` 拒绝 [@ref-github-copilot-config-urls]。

工具默认策略：只读操作（搜索、读文件、只读 shell 命令）自动放行，可能修改系统的工具（破坏性 shell 命令、写文件、访问 URL）需要显式批准，批准可选“仅这次”或“本次会话内” [@ref-github-copilot-conc-tools] [@ref-github-copilot-config-approval]。控制分两层：`--available-tools` / `--excluded-tools` 决定模型“看得见”的工具集合，`--allow-tool` / `--deny-tool` 决定具体工具的许可；两者同用时 allowlist 生效、denylist 被忽略 [@ref-github-copilot-tools-layers] [@ref-github-copilot-config-limits] [@ref-github-copilot-tools-restrict]。`--deny-tool` 的模式先于 `--allow-all-tools` 与 `--allow-tool`，且拒绝规则永远优先于允许规则和已保存的审批 [@ref-github-copilot-config-tool-select]。工具类型可细分为 shell 命令、`'write'` 工具、MCP server 工具 [@ref-github-copilot-config-shell] [@ref-github-copilot-config-write] [@ref-github-copilot-config-mcp-tools]。`--allow-all` 或 `--yolo` 等价于同时放开 tools、paths、urls [@ref-github-copilot-config-allow-all]，文档警告只在隔离环境使用 [@ref-github-copilot-conc-tools-approval]；组合审批选项可以只放行一部分 [@ref-github-copilot-conc-tools-combine]。

**禁用 allow-all 绕过**：`permissions.disableBypassPermissionsMode: "disable"` 会让所有授予全部权限的选项失效——`--allow-all-tools`、`--allow-all-paths`、`--allow-all-urls`、`--allow-all` 与 `--yolo`；限制在交互会话中同样生效，相关 slash 命令仍可见但会被拒绝并说明原因。它**不**阻止辅助权限，后者由 `defaultPermissionMode`／`--assisted-approval` 单独控制 [@ref-github-copilot-cmdref-assisted-20261124]；其他取值被当作 `"disable"` 的别名并向日志写警告 [@ref-github-copilot-cfgdir-bypass-20261124]。该设置可由用户设置、服务端托管设置与 MDM 三层提供；MDM 设备策略不因切换账号而解除，策略无法确认时 CLI 也可能阻止权限升级并要求显式批准 [@ref-github-copilot-cmdref-bypass-section-20261124]。

审批的持久化：在当前位置批准工具会把决定写入 `permissions-config.json`，按位置（Git 仓库根，或非仓库时的规范化工作目录）区分；URL 的永久批准写进 `settings.json` 的 `allowedUrls`，对所有会话生效 [@ref-github-copilot-tools-persisted] [@ref-github-copilot-cfgdir-permissions-schema]。`/reset-allowed-tools` 撤销本次会话的所有许可，并清空当前位置的已保存审批，回到默认或启动标志定义的状态 [@ref-github-copilot-tools-reset]。**URL 父域批准**：URL 批准提示可提供 `https://*.example.com` 形式的父域范围，批准注册域的所有子域；该范围只对当前会话有效、从不写入设置，scheme 与非默认端口必须匹配，`s3.amazonaws.com` 这类独立拥有的后缀不被 `*.amazonaws.com` 覆盖，IP、`localhost` 这类单标签主机与 `github.io` 这类公共后缀不提供该选项 [@ref-github-copilot-cmdref-parent-url-20261124]。

**恢复会话时的批准**：`copilot --resume` 会恢复你在该会话内授予的 commands、tools、URLs、父域范围与文件路径批准，也会恢复会话级拒绝，因此覆盖到的请求不再提示；目录批准、由安全审查或策略自动授予的批准不会恢复，当前托管策略仍然生效 [@ref-github-copilot-cmdref-session-approvals-20261124]。

放宽权限后可用本地或云沙箱限制影响范围 [@ref-github-copilot-config-restrict] [@ref-github-copilot-conc-sandbox]。沙箱的网络代理带自己的证书颁发机构（CA），它是否被操作系统信任属于信任链的一部分，可从交互会话之外用 `copilot sandbox ca` 管理，用于没有 TTY 的受管设备初始化等场景；该命令镜像 `/sandbox ca` 斜杠命令（`create`、`trust`、`rotate`、`remove`），并多一个 `status` 检查 [@ref-github-copilot-cmdref-sandboxca]。子命令的分工是：`status` 只报告信任状态不改任何东西，`create` 按需创建 CA 但不信任它，`trust [CA.PEM]` 把 CA（缺省为自己的）加入系统信任，`rotate` 替换 CA 并保留其当前信任状态，`remove` 从系统信任中移除 CA，bundle 方式的路径仍可继续工作 [@ref-github-copilot-cmdref-sandboxca-subcommands]。

```bash
copilot sandbox ca status
copilot sandbox ca trust
```

这些命令必须以运行 Copilot CLI 的那个普通用户身份执行，不能提权、不能以 `SYSTEM` 或 `root` 运行，因为 CA 存放在该用户的 Copilot CLI home 目录里；无人值守的安装细节见 `copilot sandbox ca trust --help` [@ref-github-copilot-cmdref-sandboxca-configdir]。

默认值与平台差异（取自用户设置表，未列出的键没有文档化默认值）[@ref-github-copilot-cfgdir-user-settings]：

| 键 | 默认 | 平台差异 |
| --- | --- | --- |
| `copyOnSelect` | `true`（macOS）、`false`（其他） | macOS 与其他平台不同 |
| `powershellFlags` | `["-NoProfile", "-NoLogo"]` | 仅 Windows |
| `subagents.maxConcurrency` | plan-based | 只对按量计费用户生效，上限 `32` |
| `autoUpdate` | `true` | — |
| `defaultMode` | `"interactive"` | — |
| `defaultPermissionMode` | varies（`manual`／`assisted`／`allow-all`，随环境） | — |
| `effortLevel` | 模型相关，通常 `"medium"`；有效值 `none`／`minimal`／`low`／`medium`／`high`／`xhigh`／`max`，未设置时用模型自身默认 | 可用级别取决于模型 |
| `remoteSessions` | `false` | — |
| `remoteExport` | `true` | — |
| `sandbox.userPolicy.network.allowOutbound` | `true` | host-local 访问另由 `allowLocalNetwork` 控制 |
| `sandbox.userPolicy.filesystem.readonlyPaths` | `[]` | — |
| `sandbox.userPolicy.filesystem.readwritePaths` | `[]` | — |

**沙箱用户策略默认值**：`sandbox.userPolicy.network.allowOutbound` 默认 `true`，允许连接公网与私网（仍受主机规则约束）；host-local 访问由 `allowLocalNetwork` 单独控制，CIDR 授权不能覆盖这些控制 [@ref-github-copilot-cfgdir-sandbox-outbound-20261124]。`sandbox.userPolicy.filesystem.readonlyPaths` 与 `sandbox.userPolicy.filesystem.readwritePaths` 默认都是空数组，分别追加沙箱命令可读但不可改、以及可读可改的文件或目录路径 [@ref-github-copilot-cfgdir-sandbox-filesystem-20261124]。托管 `sandbox` 值构成不可放松的下限，`sandbox.failIfUnavailable` 只能由管理员设置 [@ref-github-copilot-cmdref-sandbox-floor]。

组织与企业策略会覆盖用户配置：内容排除策略在企业、组织和仓库级生效，被排除的文件不进入上下文 [@ref-github-copilot-conc-exclusion] [@ref-github-copilot-admin-exclusion]；企业策略只覆盖文档列出的那几类控制，其余（尤其 IDE 专属策略）不作用于 CLI [@ref-github-copilot-admin-notapply]。托管层还可用 `permissions` 下的 `deny`、`ask`、`allow` 规则列表强制权限策略，合并规则是 deny 永远胜出，其次 ask，最后 allow；`deny` 与 `ask` 跨来源取并集，`allow` 取交集（每个声明了 allow 的来源都必须放行）[@ref-github-copilot-cfgdir-mdm-permissions]。托管 `sandbox` 值构成不可放松的下限，`sandbox.failIfUnavailable` 只能由管理员设置 [@ref-github-copilot-cmdref-sandbox-floor]；被仓库或组织管理的设置会显示出来但会覆盖个人值，在用户设置里改动无效 [@ref-github-copilot-settings-not-cli]。

默认值与策略的缺口：`config.defaults` 标为 `partial`——文档只给出设置表里的默认值，闭源实现可能存在未文档化的平台或构建差异，未在表中出现的键无法确证默认值。

## 迁移与诊断 {#configuration-migration-diagnostics}

配置迁移规则（均可在归档页确认）：

- 用户可编辑设置原先存在 `config.json`，现在只存放在 `settings.json`。**这一行为变更首次见于 1.0.93 的 changelog 记录**（“Read user settings only from ~/.copilot/settings.json; user-setting keys in ~/.copilot/config.json are ignored.”）[@ref-github-copilot-lt-changelog-settings-ignored]；配套的官方文档页按来源级证据记录当前语义：`config.json` 中残留的用户设置**被忽略，不再在启动时自动迁入** `settings.json`，该文件只保存内部状态（如已安装插件与已信任文件夹）[@ref-github-copilot-cfgdir-settings-configjson-ignored] [@ref-github-copilot-cfgdir-config-internal-state]。在 1.0.93 之前的发行版上，文档记录的是旧语义（启动时自动迁移），因此判断某个版本的实际行为需以其 changelog 为准。升级到 1.0.93 后若发现设置“丢失”，应检查 `config.json` 中是否还留有旧的用户设置键——它们不再被读取，需要手工改写到 `settings.json`。
- `permissions-config.json` 早期叫无扩展名的 `permissions-config`；若新文件不存在而旧文件存在，CLI 仍会认旧文件，但新编辑应使用 `permissions-config.json`。此前基于 XDG 的配置位置会在未设置 `COPILOT_HOME` 时于启动迁移到 `~/.copilot` [@ref-github-copilot-cfgdir-permissions-location]。
- 遗留的 `--config-dir` 已被弃用，迁移到 `COPILOT_HOME` [@ref-github-copilot-cmdref-options]。
- 托管设置里 `model` 是顶层键；旧配置把它嵌套为 `permissions.model` 仍可用（顶层 `model` 缺失时回退到该位置），新配置应写顶层 [@ref-github-copilot-cfgdir-mdm]。
- 远程控制与会话同步的标志发生过迁移：`--no-remote` 已移除（交互会话用 `/remote off` 结束远程连接）；`--remote-export` 与 `--no-remote-export` 分别改名为 `--sync-session=on` 与 `--sync-session=off`；`--remote` 不再支持交互式启动或 `-p`，只在遗留 SDK server 启动时保留 [@ref-github-copilot-cmdref-remote-flag-20261124] [@ref-github-copilot-cmdref-sync-session-20261124]。

诊断“文件已写但不生效”的入口：

- `/settings` 无参数打开可搜索的编辑器，逐项显示当前值；`/settings KEY VALUE` 直接改一个值，`/settings show KEY` 查看当前值，`/settings KEY`（不给值）查看合法取值 [@ref-github-copilot-settings-open] [@ref-github-copilot-settings-inline] [@ref-github-copilot-settings-get] [@ref-github-copilot-settings-values]。这些改动写入个人设置文件（默认 `~/.copilot/settings.json`）并在会话间保留 [@ref-github-copilot-settings-open]。
- 若 `settings.json` 读取、解析或校验失败，CLI 只忽略该文件中的无效值（同样自 1.0.93 起不再回落到 `config.json`），并在时间线显示启动告警，指向 `/settings` 的 **Problems** 标签页；顶层无法识别的键（例如拼写错误）只在 Problems 标签页列出，其标签会显示计数（如 `Problems (2)`）；`$schema` 被容忍且从不报告 [@ref-github-copilot-cfgdir-settings] [@ref-github-copilot-cfgdir-settings-invalid-no-merge]。
- 需要重启的设置在改动时会提示，可能由 CLI 代为重启会话 [@ref-github-copilot-settings-restart]；安全敏感、列表与结构化、以及被仓库/组织管理的设置不能用单行方式修改，CLI 会说明原因并指向正确位置 [@ref-github-copilot-settings-not-cli]。具体地，只有带公开描述的设置能用 `/settings KEY VALUE` 修改；数组、记录与 `statusLine.command` 等安全敏感键必须通过对话框或直接编辑 `settings.json` [@ref-github-copilot-cfgdir-settings-inline-20261124]。
- 常用可调设置包括 `autoUpdate`、`theme`、`renderMarkdown`、`banner`、`beep`、`includeCoAuthoredBy`、`footer.showBranch` [@ref-github-copilot-settings-common]。
- 终端快速参考：`copilot help config` 给出设置的速查，`copilot help TOPIC` 的 TOPIC 可取 `config`、`commands`、`environment`、`logging`、`permissions` [@ref-github-copilot-cfgdir-settings] [@ref-github-copilot-best-help]。
- 非交互场景的排查与改写用 `copilot config`：`copilot config KEY` 打印单个设置（未设置的键以状态码 `1` 退出），`--list` 列出 `key=value`、加 `--json` 输出 JSON，`--rm KEY [VALUE]` 删除键或列表中的一项；值必须匹配设置类型（布尔用 `on`/`off` 或 `true`/`false`，枚举用可接受取值），秘密值在输出中被遮蔽 [@ref-github-copilot-cmdref-config-command-values]。加 `--repo`／`--local` 时读写的是仓库作用域文件，且只接受仓库可覆盖的设置 [@ref-github-copilot-cmdref-config-command] [@ref-github-copilot-cmdref-config-command-options]。
- `copilot init` 或交互式 `/init` 会分析代码库并写入/更新 `.github/copilot-instructions.md`，`/init suppress` 可永久隐藏当前仓库的启动提示 [@ref-github-copilot-cmdref-init]。
- 命令参考页对配置设置的说明只做指针，实际清单回到配置目录参考页 [@ref-github-copilot-cmdref-configsettings]。
- 若托管设置“已下发但不生效”，检查是否需要新鲜策略：`forceRemoteSettingsRefresh` 要求启动时成功拉取新的服务端托管设置，缓存策略不能满足要求；拉取失败时受影响操作保持受限，直到确认当前策略，设备（MDM）值优先于缓存的服务端值 [@ref-github-copilot-cfgdir-force-refresh-20261124]。
- 若开发者无法使用 CLI，检查顺序为：有效 seat、企业级策略（“Enabled everywhere / Disabled everywhere”覆盖组织级）、以及授予许可的组织是否启用了 CLI [@ref-github-copilot-admin-why]。
