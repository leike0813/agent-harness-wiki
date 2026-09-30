---
schema_version: 3
record_kind: production
edition_id: cline-cli-configuration-v1
harness_id: cline
topic: configuration
title: "Cline CLI 的配置作用域、优先级与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-cline-paths-clinedir, ref-cline-paths-home, ref-cline-paths-settings, ref-cline-paths-datadir, ref-cline-paths-dir-constants, ref-cline-paths-rules, ref-cline-paths-workspace-skills, ref-cline-paths-agents, ref-cline-paths-hooks, ref-cline-paths-plugins, ref-cline-paths-workflows, ref-cline-paths-agent-plugins, ref-cline-cli-enterprise, ref-cline-config-doc-layout, ref-cline-config-doc-whatgoes, ref-cline-cli-ref-files]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-cline-cli-startup-settings, ref-cline-global-settings-write, ref-cline-global-settings-schema, ref-cline-global-settings-stringlist, ref-cline-provider-write, ref-cline-cli-sandbox-env, ref-cline-watcher-records]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-cline-cli-config-prep, ref-cline-cli-sandbox, ref-cline-cli-root-options, ref-cline-cli-hooks-dir, ref-cline-config-doc-env, ref-cline-cli-ref-env, ref-cline-cli-startup-settings]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-cline-cli-safe-tools, ref-cline-cli-ref-options, ref-cline-cli-enterprise-prep, ref-cline-remote-config-schema, ref-cline-config-doc-env, ref-cline-cli-ref-env]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-cline-global-settings-defaults, ref-cline-global-settings-load, ref-cline-global-settings-webtool, ref-cline-global-settings-compaction, ref-cline-cli-precedence, ref-cline-cli-defaults, ref-cline-cli-feature-flags, ref-cline-paths-home, ref-cline-provider-write, ref-cline-hooks-spawn, ref-cline-config-doc-cli, ref-cline-global-settings-schema]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-cline-config-migration-paths, ref-cline-config-migration, ref-cline-provider-manager, ref-cline-paths-dir-constants, ref-cline-cli-config-cmd, ref-cline-cli-config-source-rank, ref-cline-config-doc-cli, ref-cline-watcher-debounce, ref-cline-cli-config-refresh, ref-cline-global-settings-cache, ref-cline-cli-doctor, ref-cline-global-settings-write, ref-cline-global-settings-load, ref-cline-cli-ref-options, ref-cline-cli-config-prep]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-cline-paths-clinedir, ref-cline-paths-settings, ref-cline-config-doc-layout]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-cline-cli-startup-settings, ref-cline-global-settings-write, ref-cline-cli-sandbox-env]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-cline-cli-config-prep, ref-cline-cli-root-options, ref-cline-cli-hooks-dir]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-cline-cli-safe-tools, ref-cline-remote-config-schema, ref-cline-cli-enterprise-prep]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-cline-global-settings-defaults, ref-cline-global-settings-webtool, ref-cline-global-settings-compaction, ref-cline-global-settings-schema]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-cline-config-migration, ref-cline-config-migration-paths, ref-cline-provider-manager]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs: [ref-cline-cli-config-cmd, ref-cline-watcher-debounce, ref-cline-cli-doctor]
---

## 作用域与路径 {#config-sources}

固定来源：仓库提交 `3435f72fcf4cb843bee946b8f9e981683564c9e3` 的 `sdk/packages/shared/src/storage/paths.ts`、`sdk/packages/core/src/services/global-settings.ts`、`sdk/packages/core/src/services/storage/`、`sdk/packages/core/src/extensions/config/`、`apps/cli/src/main.ts`、`apps/cli/src/commands/config.ts`，以及 `docs/getting-started/config.mdx`、`docs/cli/cli-reference.mdx`。官方文档站 `https://docs.cline.bot/getting-started/config.md` 与 `https://docs.cline.bot/cli/cli-reference.md` 的快照作佐证，软件版本未知。

**全局根**由 `resolveClineDir()` 决定，优先级为：进程内 `setClineDir()`（来自 `--config` 的预扫描）→ 环境变量 `CLINE_DIR` → `$HOME/.cline`；其中 home 依次取 `HOME`、`USERPROFILE`、`HOMEDRIVE`+`HOMEPATH`、`os.homedir()`。[@ref-cline-paths-clinedir][@ref-cline-paths-home]

**数据根**由 `resolveClineDataDir()` 决定：`CLINE_DATA_DIR` 优先，否则 `{clineDir}/data`。三个持久化配置文件都在数据根的 `settings/` 下，各自还有单独的环境变量覆盖：

| 文件 | 环境变量覆盖 | 内容 |
| :-- | :-- | :-- |
| `{数据根}/settings/global-settings.json` | `CLINE_GLOBAL_SETTINGS_PATH` | 全局开关（遥测、自动更新、压缩策略、模式、禁用项…） |
| `{数据根}/settings/providers.json` | `CLINE_PROVIDER_SETTINGS_PATH` | provider 凭据与设置 |
| `{数据根}/settings/cline_mcp_settings.json` | `CLINE_MCP_SETTINGS_PATH` | MCP server |

[@ref-cline-paths-settings][@ref-cline-paths-datadir]

**项目作用域**是仓库根的 `.cline/`，按用途分子目录：`rules/`、`skills/`、`hooks/`、`agents/`、`plugins/`、`cron/`；废弃的 `.clinerules/` 与 `.agents/` 仍被读取，工作区根的 `AGENTS.md` 也会作为规则读取。[@ref-cline-paths-dir-constants][@ref-cline-paths-rules][@ref-cline-paths-workspace-skills][@ref-cline-paths-agents][@ref-cline-paths-hooks][@ref-cline-paths-plugins]

**额外的全局搜索位**：`~/Documents/Cline/{Rules,Hooks,Plugins,Workflows}`、`~/Cline/Rules`，以及被 OneDrive 重定向的 Documents 下的同一路径；skill 还会读 `~/.agents/skills`。厂商中立的 Agent Plugin 只从 `~/.agents/plugins` 读，避免仓库自带插件被自动激活。[@ref-cline-paths-rules][@ref-cline-paths-workflows][@ref-cline-paths-agent-plugins]

**组织作用域**：CLI 从 Cline 账号拉取远端配置包，再交给核心的会话准备流程。[@ref-cline-cli-enterprise]

官方文档的目录树与上面一致（`~/.cline/data/settings/` 放三份设置，`~/.cline/` 直接放 rules/hooks/skills/agents/plugins/cron），并说明「全局用于跨应用默认、项目用于随仓库共享的团队行为」。[@ref-cline-config-doc-layout][@ref-cline-config-doc-whatgoes]

CLI 参考里的 `Configuration Files` 树基本对应，但它额外列出的项目根 `.cline/mcp.json` 与 `.cline/agents.yaml` 没有代码读取者（分别见 MCP 章节与自定义 Agent 章节的冲突说明）。[@ref-cline-cli-ref-files]

## 优先级与合并规则 {#config-overrides}

启动期标量的优先级是固定的三层：**显式 CLI 参数 > 已持久化的全局设置 > 内置默认值**，由 `resolveStartupMode`、`resolveStartupToolAutoApprove` 之类的解析函数实现；TUI 设置面板写下的选择因此能跨重启保留。[@ref-cline-cli-startup-settings]

**没有深合并，也没有删除标记**：`global-settings.json` 是单文件，写入时先按同一个 schema 规范化再整文件重写；schema 以 `.strip()` 结尾，未知键在读写两侧都会被静默丢弃。[@ref-cline-global-settings-write][@ref-cline-global-settings-schema]

数组是「规范化」而不是合并：`disabledTools`/`disabledPlugins`/`disabledAgentPlugins` 会过滤非字符串、去空格、去空值、去重并排序，空结果变成「未设置」；传 `null` 或非数组也变成未设置。[@ref-cline-global-settings-stringlist]

布尔键用 `.catch(...)` 兜底：类型不对时静默回退（`telemetryOptOut`/`autoUpdateEnabled` 回到默认，其余布尔变「未设置」）。[@ref-cline-global-settings-schema]

`providers.json` 的写入只替换单个 provider 条目（先展开已有 `providers` 再设置当前 id），同时更新 `lastUsedProvider`，并走临时文件加 rename 的原子替换、权限 `0600`。[@ref-cline-provider-write]

**例外键（绕过常规分层）**：`--config`（改路径）、`--data-dir` 与 `CLINE_SANDBOX`（一次改写 `CLINE_DATA_DIR`、`CLINE_DB_DATA_DIR`、`CLINE_SESSION_DATA_DIR`、`CLINE_TEAM_DATA_DIR`、`CLINE_PROVIDER_SETTINGS_PATH`、`CLINE_HOOKS_LOG_PATH`），以及三个按文件的环境变量；在每个路径解析函数里环境变量都先于文件判断。[@ref-cline-cli-sandbox-env]

指令文件（rules/skills/workflows）走另一套规则：记录按 id 进表，**搜索顺序里靠后的目录覆盖靠前的**，与上面标量分层是三套不同逻辑。[@ref-cline-watcher-records]

## 环境变量、CLI 参数与 profile {#config-runtime}

`--config` 需要两段式处理：CLI 先在原始 argv 里扫出 `--config`（支持 `--config 目录` 与 `--config=目录` 两种拼写）并立刻调用 `setClineDir()`，因为后续任何读配置目录的代码都依赖它；命令的 action 里还会再应用一次以防遗漏。[@ref-cline-cli-config-prep]

`--data-dir` 与 `CLINE_SANDBOX=1` 打开沙箱模式，一次性改写全部存储相关环境变量，使会话落在一个隔离目录里。[@ref-cline-cli-sandbox]

根参数表（`--config`、`--data-dir`、`--hooks-dir`，以及 `-p/--plan`、`--auto-approve`、`-m/--model`、`--thinking`、`--retries` 等）由 commander 定义；其中 `--hooks-dir` 只被写进环境变量 `CLINE_HOOKS_DIR`，固定提交里没有消费者。[@ref-cline-cli-root-options][@ref-cline-cli-hooks-dir]

环境变量在每个解析函数里都先于文件路径生效；文档表列出的 CLI 相关变量包括 `CLINE_DATA_DIR`、`CLINE_HUB_ADDRESS`、`CLINE_SESSION_BACKEND_MODE`、`CLINE_SANDBOX`、`CLINE_SANDBOX_DATA_DIR`、`CLINE_HOOKS_DIR`、`CLINE_COMMAND_PERMISSIONS`，代码里还有 `CLINE_DIR`、`CLINE_LOG_PATH`、以及三个设置文件路径变量。[@ref-cline-config-doc-env][@ref-cline-cli-ref-env]

**没有 profile 概念**：根选项里不存在 `--profile`，全仓检索只命中 AWS CLI profile 与测试夹具，本主题的 profile 部分按「不适用」处理。[@ref-cline-cli-root-options]

运行时标量（`--auto-approve`、`-p/--plan`、压缩策略等）只在启动时解析，会话中途不会重新读取。[@ref-cline-cli-startup-settings]

## 信任、组织策略与权限 {#config-trust}

CLI 里**没有工作区信任机制**：没有 `trustedFolder`/`isTrusted` 之类的开关，也没有加载前的确认门；实际的门是工具自动批准策略与模式。[@ref-cline-cli-safe-tools]

工具批准：`--auto-approve` 默认为 `true`（ACP 模式下文档记默认 `false`），持久化回退是全局设置里的 `toolAutoApprove`；总开关关闭时只有一份固定安全名单保持自动批准，其余工具逐个询问。[@ref-cline-cli-safe-tools][@ref-cline-cli-ref-options]

连接器侧：每个适配器提供 `--no-tools`，为该连接器强制关闭工具并锁住 `/tools` 与 `/yolo`；显式 `--no-tools` 优先于 `--enable-tools`。[@ref-cline-cli-enterprise-prep]

组织策略：远端配置 schema 含 `yoloModeAllowed`、`mcpMarketplaceEnabled`、`allowedMCPServers`、`remoteMCPServers`、`blockPersonalRemoteMCPServers`、`globalRules`、`globalWorkflows`、`openTelemetry*` 等键；CLI 会拉取并校验它，核心会应用遥测、提示上传与物化出来的规则/工作流。**但 yolo/MCP 那几个键在本提交的 CLI 路径上没有读取者**，因此不属于「当前可依赖的限制」。[@ref-cline-remote-config-schema][@ref-cline-cli-enterprise-prep]

`CLINE_COMMAND_PERMISSIONS` 在文档里是三处出现的命令准入策略（`allow`/`deny`/`allowRedirects`，deny 优先、`allowRedirects` 默认 false），但固定提交里没有任何代码读取它——它属于文档先行、实现未落地的部分。[@ref-cline-config-doc-env][@ref-cline-cli-ref-env]

## 默认值、功能开关与平台差异 {#config-defaults}

`GlobalSettingsSchema` 的默认值只有两个：`telemetryOptOut` 默认 `false`、`autoUpdateEnabled` 默认 `true`；其余键都可选。[@ref-cline-global-settings-schema] 文件缺失或解析失败时回退到默认值并把 `loadFailed` 置位。[@ref-cline-global-settings-defaults][@ref-cline-global-settings-load]

一个跟文件健康度绑定的隐式默认：模型工具设置里 `web_search` 的默认启用状态等于 `!loadFailed`——没有或解析不了全局设置文件时它是**启用**的，任何显式的 `tools` 条目都会覆盖它。[@ref-cline-global-settings-webtool]

压缩策略的默认值由调用方补：`readCompactionStrategyGlobally()` 在未设置时返回 `"agentic"`，CLI 另外用启动解析函数处理 `off`/具体策略。[@ref-cline-global-settings-compaction]

CLI 层默认：`defaultToolAutoApprove = true`（ACP 下为 false）[@ref-cline-cli-precedence]；核心默认关闭检查点，CLI 显式打开（`CLI_DEFAULT_CHECKPOINT_CONFIG = { enabled: true }`）[@ref-cline-cli-defaults]。

功能开关是远端控制的：`TELEMETRY_SERVICE_API_KEY` 存在且不是测试环境时用 PostHog provider，否则 NoOp；缓存写在数据目录的 `cache/feature-flags.json`，最长 30 天并在后台刷新。[@ref-cline-cli-feature-flags]

平台差异集中在路径与权限：home 目录按 `HOME`/`USERPROFILE`/`HOMEDRIVE`+`HOMEPATH`/`os.homedir()` 依次回退 [@ref-cline-paths-home]；`providers.json` 写入用 `0600` 权限位（POSIX 有效）[@ref-cline-provider-write]；Windows 上 hook 与插件子进程加隐藏窗口 [@ref-cline-hooks-spawn]。

在用户配置里改默认值的三条路：`cline config` 的 Settings 面板（写回 `global-settings.json`）、直接编辑 `{数据根}/settings/global-settings.json`、或用当次运行的环境变量/参数覆盖。[@ref-cline-config-doc-cli]

## 迁移、弃用与配置诊断 {#config-migration}

旧格式导入：`ProviderSettingsManager` 在能推断出数据目录（或未显式传文件路径）时运行 `migrateLegacyProviderSettings`，源文件是 `{数据根}/globalState.json` 与 `{数据根}/secrets.json`，目标是 `providers.json`。[@ref-cline-config-migration-paths]

规则：**永不覆盖**已存在的 provider 条目，未被它拥有的字段（`modes`、`repairs`）原样保留，迁移来的条目标注 `tokenSource: "migration"`；同时做键改名归一，例如 `awsAuthentication: "credentials"` 变成 `"iam"`、旧的 `openai` 归一成 `openai-compatible`、秒级 `expiresAt` 换算成毫秒。[@ref-cline-config-migration]

用户自建 provider 的模型目录另存 `models.json`；带 `provider` 元数据的条目登记/覆盖自定义 provider，只有 `models` 的条目扩展现有 provider。[@ref-cline-provider-manager]

弃用与兼容在路径层处理：`.clinerules` 与 `.agents` 仍留在每个搜索列表里，`.clineignore` 官方文档已标记为即将移除。[@ref-cline-paths-dir-constants]

诊断入口：

- `cline config` 打开交互视图，`--json` 直接 dump `InteractiveConfigData`；[@ref-cline-cli-config-cmd] 每个条目带 `source`（`global`/`workspace`/`builtin`/`global-plugin`/`workspace-plugin`），视图按 source 排序，这就是「这条配置从哪来」的答案。[@ref-cline-cli-config-source-rank]
- 分域列表：`cline config workflows|rules|skills|agents|plugins|hooks|mcp|tools`，都支持 `--json`；`mcp` 会打印解析出的设置文件路径。[@ref-cline-config-doc-cli]
- 重载：指令文件（rules/skills/workflows）由 `fs.watch` 实时监听，75 毫秒去抖并按内容 SHA-1 指纹去重，交互配置用 `refreshType` 重新拉取；[@ref-cline-watcher-debounce][@ref-cline-cli-config-refresh] 全局设置与 `providers.json` **不**监听——前者按路径+mtime+size 做模块缓存，后者每次调用重读。[@ref-cline-global-settings-cache]
- 日志：`CLINE_LOG_PATH` 指定路径（默认在数据目录的 `logs/` 下），`cline doctor` 检查本地进程与 hub，`cline doctor log` 打开日志文件。[@ref-cline-cli-doctor]

「文件写了但没生效」的可证原因：未知键被 `.strip()` 丢掉；schema 校验失败静默回落到默认值且只置 `loadFailed`（CLI 不告警）；`CLINE_GLOBAL_SETTINGS_PATH` 之类的环境变量把写入引到了别的文件；两个进程共享 `providers.json` 时不刷新彼此的内存状态；指令文件同名 id 按「后目录覆盖」被去重。[@ref-cline-global-settings-write][@ref-cline-global-settings-load]

**两处文档与实现的差异**：`docs/getting-started/config.mdx` 给出的 `cline dev log` 与 CLI 参考里列出的 `dev` 命令在固定提交里没有注册（实际是 `cline doctor log`）；CLI 参考把 `--config` 的默认值写成 `~/.cline/data/settings`，而代码里 `--config` 等于设置 `CLINE_DIR`（即 `~/.cline`），设置目录随之变成 `<该目录>/data/settings`。[@ref-cline-cli-doctor][@ref-cline-cli-ref-options][@ref-cline-cli-config-prep]
