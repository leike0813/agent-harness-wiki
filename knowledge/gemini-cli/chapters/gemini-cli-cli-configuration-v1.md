---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-configuration-v1
harness_id: gemini-cli
topic: configuration
title: "Gemini CLI 的配置机制：来源、合并、运行时覆盖、信任与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-config-doc-layers]
  - section_id: config-sources-overrides
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-config-doc-files, ref-gemini-cli-config-paths, ref-gemini-cli-config-load, ref-gemini-cli-storage-home, ref-gemini-cli-config-doc-geminidir, ref-gemini-cli-config-merge, ref-gemini-cli-config-trust-empty, ref-gemini-cli-config-admin-remote, ref-gemini-cli-settings-admin, ref-gemini-cli-config-validation]
  - section_id: config-runtime-defaults
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-config-doc-envfiles, ref-gemini-cli-config-envfile, ref-gemini-cli-config-envload, ref-gemini-cli-settings-advanced, ref-gemini-cli-config-doc-args, ref-gemini-cli-cli-options, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-experimental-agents, ref-gemini-cli-config-merge, ref-gemini-cli-settings-general, ref-gemini-cli-settings-model, ref-gemini-cli-settings-context, ref-gemini-cli-settings-tools, ref-gemini-cli-settings-experimental-extensions, ref-gemini-cli-settings-experimental-dynamic, ref-gemini-cli-settings-gemmarouter, ref-gemini-cli-settings-security, ref-gemini-cli-config-doc-files, ref-gemini-cli-settings-admin]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-settings-security, ref-gemini-cli-config-trusted-override, ref-gemini-cli-config-trusted-dialog, ref-gemini-cli-storage-runtime-scope, ref-gemini-cli-config-trust-empty, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-agents-registry-sources, ref-gemini-cli-hooks-registry-trust, ref-gemini-cli-config-envload, ref-gemini-cli-mcp-doc-list, ref-gemini-cli-cli-options, ref-gemini-cli-config-doc-envfiles, ref-gemini-cli-cmd-permissions, ref-gemini-cli-config-trusted-impact, ref-gemini-cli-config-trusted-enable, ref-gemini-cli-config-enterprise-system, ref-gemini-cli-config-enterprise-isolation, ref-gemini-cli-settings-admin, ref-gemini-cli-config-policy-locations, ref-gemini-cli-config-policy-tiers, ref-gemini-cli-config-enterprise-tools, ref-gemini-cli-config-enterprise-catalog]
  - section_id: config-migration-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-config-legacy-theme, ref-gemini-cli-settings-deprecated, ref-gemini-cli-cli-options, ref-gemini-cli-cmd-resume, ref-gemini-cli-config-storage-migration, ref-gemini-cli-cmd-settings, ref-gemini-cli-settings-doc-intro, ref-gemini-cli-settings-doc-ui, ref-gemini-cli-settings-doc-security, ref-gemini-cli-settings-doc-skills, ref-gemini-cli-settings-doc-hooksconfig, ref-gemini-cli-config-load, ref-gemini-cli-config-validation, ref-gemini-cli-cmd-memory, ref-gemini-cli-config-doc-context, ref-gemini-cli-config-merge]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources-overrides
        status: answered
        source_refs: [ref-gemini-cli-config-doc-files, ref-gemini-cli-config-paths, ref-gemini-cli-config-load, ref-gemini-cli-storage-home, ref-gemini-cli-config-doc-geminidir]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-sources-overrides
        status: partial
        source_refs: [ref-gemini-cli-config-merge, ref-gemini-cli-config-trust-empty, ref-gemini-cli-config-admin-remote, ref-gemini-cli-settings-admin, ref-gemini-cli-config-load, ref-gemini-cli-config-validation]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime-defaults
        status: partial
        source_refs: [ref-gemini-cli-config-doc-envfiles, ref-gemini-cli-config-envfile, ref-gemini-cli-config-envload, ref-gemini-cli-settings-advanced, ref-gemini-cli-config-doc-args, ref-gemini-cli-cli-options, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-experimental-agents]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-runtime-defaults
        status: answered
        source_refs: [ref-gemini-cli-config-merge, ref-gemini-cli-settings-general, ref-gemini-cli-settings-model, ref-gemini-cli-settings-context, ref-gemini-cli-settings-tools, ref-gemini-cli-settings-experimental-agents, ref-gemini-cli-settings-experimental-extensions, ref-gemini-cli-settings-experimental-dynamic, ref-gemini-cli-settings-gemmarouter, ref-gemini-cli-settings-security, ref-gemini-cli-settings-admin, ref-gemini-cli-config-doc-files, ref-gemini-cli-settings-advanced]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-gemini-cli-settings-security, ref-gemini-cli-config-trusted-override, ref-gemini-cli-config-trusted-dialog, ref-gemini-cli-storage-runtime-scope, ref-gemini-cli-config-trust-empty, ref-gemini-cli-skills-manager-discover, ref-gemini-cli-agents-registry-sources, ref-gemini-cli-hooks-registry-trust, ref-gemini-cli-config-envload, ref-gemini-cli-mcp-doc-list, ref-gemini-cli-cli-options, ref-gemini-cli-config-doc-envfiles, ref-gemini-cli-cmd-permissions, ref-gemini-cli-config-trusted-impact, ref-gemini-cli-config-trusted-enable, ref-gemini-cli-config-enterprise-system, ref-gemini-cli-config-enterprise-isolation, ref-gemini-cli-settings-admin, ref-gemini-cli-config-policy-locations, ref-gemini-cli-config-policy-tiers, ref-gemini-cli-config-enterprise-tools, ref-gemini-cli-config-enterprise-catalog]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-config-legacy-theme, ref-gemini-cli-settings-deprecated, ref-gemini-cli-cli-options, ref-gemini-cli-cmd-resume, ref-gemini-cli-config-storage-migration]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-migration-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-cmd-settings, ref-gemini-cli-settings-doc-intro, ref-gemini-cli-settings-doc-ui, ref-gemini-cli-settings-doc-security, ref-gemini-cli-settings-doc-skills, ref-gemini-cli-settings-doc-hooksconfig, ref-gemini-cli-config-load, ref-gemini-cli-config-validation, ref-gemini-cli-cmd-memory, ref-gemini-cli-config-doc-context, ref-gemini-cli-config-merge, ref-gemini-cli-cli-options]
---

## 固定来源与适用范围 {#config-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 提交
`38700b4b38bf387dafded6c97c3f190d084b49e9` 的
`docs/reference/configuration.md`、`docs/cli/settings.md`、`docs/cli/trusted-folders.md`、`docs/reference/policy-engine.md`、`docs/cli/enterprise.md`
与
`packages/cli/src/config/settings.ts`、`settings-validation.ts`、`packages/core/src/config/storageMigration.ts`
源码。固定来源未注明适用软件版本，本章是来源级知识。

文档把配置手段分为四类：settings 文件、环境变量（含
`.env`）、命令行参数与上下文文件（`GEMINI.md`）[@ref-gemini-cli-config-doc-layers]。优先级从低到高是：内置默认值
→ 系统默认文件 → 用户设置 → 项目设置 → 系统覆盖文件 → 环境变量 → 命令行参数
[@ref-gemini-cli-config-doc-layers]。

## 配置来源与合并规则 {#config-sources-overrides}

**config.sources**：settings 文件有四个位置（文档逐条给出）[@ref-gemini-cli-config-doc-files]：

| 层 | 路径 | 作用域 |
| :-- | :-- | :-- |
| 系统默认文件 | Linux `/etc/gemini-cli/system-defaults.json`；Windows `C:\ProgramData\gemini-cli\system-defaults.json`；macOS `/Library/Application Support/GeminiCli/system-defaults.json`（可用 `GEMINI_CLI_SYSTEM_DEFAULTS_PATH` 改写） | 全系统基线，优先级最低 |
| 用户设置 | `~/.gemini/settings.json` | 当前用户所有会话 |
| 项目设置 | `项目根/.gemini/settings.json` | 仅该项目的会话 |
| 系统覆盖文件 | Linux `/etc/gemini-cli/settings.json`；Windows `C:\ProgramData\gemini-cli\settings.json`；macOS `/Library/Application Support/GeminiCli/settings.json`（可用 `GEMINI_CLI_SYSTEM_SETTINGS_PATH` 改写） | 全系统覆盖，优先级最高 |

源码里的路径来源与上表一致：系统 settings 与系统默认文件由
`getSystemSettingsPath()`/`getSystemDefaultsPath()` 决定（默认文件就是同目录下的
`system-defaults.json`），用户设置是 `Storage.getGlobalSettingsPath()`，项目设置是
`Storage(workspaceDir).getWorkspaceSettingsPath()`
[@ref-gemini-cli-config-paths][@ref-gemini-cli-config-load]。home 由 `homedir()`
决定，可用 `GEMINI_CLI_HOME` 改写，因此所有 `~` 开头的路径都随该变量移动
[@ref-gemini-cli-storage-home]。项目内除 settings 外，`.gemini/` 还可放自定义沙箱 profile（如
`.gemini/sandbox-macos-custom.sb`）[@ref-gemini-cli-config-doc-geminidir]。字符串值支持
`$VAR`、`${VAR}`、`${VAR:-默认值}` 展开 [@ref-gemini-cli-config-doc-files]。

**config.overrides**：合并顺序（源码）是 schema 默认值 → 系统默认文件 → 用户 → 工作区 →
系统覆盖，后者覆盖前者；每个键的合并策略由 settings schema 决定（`mergeStrategy`，或对象的
`additionalProperties.mergeStrategy`），因此不同键可能是深合并、替换或数组合并
[@ref-gemini-cli-config-merge]。工作区不受信任时，工作区设置被整体置空后再参与合并
[@ref-gemini-cli-config-trust-empty]。`admin` 段例外：文件里的 admin 配置被忽略，最终值只等于"admin
默认值 + 远程下发的 admin 设置"
[@ref-gemini-cli-config-admin-remote][@ref-gemini-cli-settings-admin]。settings
文件允许 JSON 注释（解析前剥离），解析后先用 schema 生成的 Zod 校验，校验失败只产生 warning
级错误项，仍以展开环境变量后的原始对象继续运行
[@ref-gemini-cli-config-load][@ref-gemini-cli-config-validation]。

缺口：登记来源与源码都没有逐键列出"数组是追加还是替换、空值或删除标记如何处理"，只能确认合并策略来自 schema
且是可查询的（`getMergeStrategyForPath`），没有给出用户可读的策略表；因此 `config.overrides`
中"对象、数组、空值与删除标记"的完整语义在固定来源内无法确立。partial。

## 运行时介入、默认值与平台差异 {#config-runtime-defaults}

**config.runtime**：环境变量与命令行参数在 settings 之后介入。`.env` 的加载顺序是：当前工作目录的 `.env` →
向上逐级查找直到项目根（以 `.git` 为界）或 home → `~/.env`；受信工作区还会优先读取 `.gemini/.env`
[@ref-gemini-cli-config-doc-envfiles][@ref-gemini-cli-config-envfile]。`DEBUG`、`DEBUG_MODE`、`GEMINI_CLI_IDE_SERVER_STDIO_COMMAND`、`GEMINI_CLI_IDE_SERVER_STDIO_ARGS`
默认从项目 `.env` 排除（可用 `advanced.excludedEnvVars` 调整），项目 `.env`
中已存在的宿主变量不会被覆盖；`advanced.ignoreLocalEnv` 或 `--ignore-env` 可整体忽略项目 `.env`
[@ref-gemini-cli-config-doc-envfiles][@ref-gemini-cli-config-envload][@ref-gemini-cli-settings-advanced]。常用变量：`GEMINI_API_KEY`、`GEMINI_MODEL`（覆盖默认模型）、`GEMINI_CLI_TRUST_WORKSPACE`（临时信任当前工作区）、`GEMINI_CLI_TRUSTED_FOLDERS_PATH`、`GEMINI_CLI_HOME`、`GEMINI_SANDBOX`、`GEMINI_SYSTEM_MD`、`GEMINI_WRITE_SYSTEM_MD`、`SEATBELT_PROFILE`、`NO_COLOR`、遥测一族
`GEMINI_TELEMETRY_*` [@ref-gemini-cli-config-doc-envfiles]。

命令行参数按会话覆盖，常见项：`--model`、`--approval-mode`（`default`/`auto_edit`/`yolo`/`plan`）、`--allowed-tools`（文档标注已弃用，建议改用策略引擎）、`--allowed-mcp-server-names`、`--extensions`/`-e none`、`--include-directories`、`--sandbox`、`--skip-trust`、`--output-format`、`--debug`
[@ref-gemini-cli-config-doc-args][@ref-gemini-cli-cli-options]。子 agent 的模型另有
`modelConfigs.overrides` 的 `match.overrideScope` 入口
[@ref-gemini-cli-settings-modelconfigs-custom]。缺口：登记来源没有把
profile（例如"实验档/企业档"式的命名配置集）作为一种配置入口来描述 —— settings 里只有
`experimental.generalistProfile`、`experimental.powerUserProfile`、`experimental.stressTestProfile`
三个布尔开关，没有可切换的 profile 集合
[@ref-gemini-cli-settings-experimental-agents]；因此"profile
在何时介入"只能用这些开关回答。partial。

**config.defaults**：默认值的事实源是 settings schema，源码从 schema 的 `default`
字段生成默认对象再参与合并（`getDefaultsFromSchema`）[@ref-gemini-cli-config-merge]；文档的
"Default" 列与之一致（例如 `general.defaultApprovalMode` 默认 `default`
[@ref-gemini-cli-settings-general]、`model.compressionThreshold` 默认 0.5
[@ref-gemini-cli-settings-model]、`context.discoveryMaxDirs` 默认 200
[@ref-gemini-cli-settings-context]、`tools.truncateToolOutputThreshold` 默认 40000
[@ref-gemini-cli-settings-tools]）。功能开关集中在 `experimental` 与 `security` 两组：例如
`experimental.enableAgents` 默认 true、`experimental.extensionManagement` 默认
true、`experimental.dynamicModelConfiguration` 默认
false、`experimental.gemmaModelRouter.enabled` 默认 false
[@ref-gemini-cli-settings-experimental-agents][@ref-gemini-cli-settings-experimental-extensions][@ref-gemini-cli-settings-experimental-dynamic][@ref-gemini-cli-settings-gemmarouter]；`security.disableYoloMode`、`security.folderTrust.enabled`、`security.environmentVariableRedaction.enabled`
等 [@ref-gemini-cli-settings-security]。管理面默认值在 `admin`
段：`admin.secureModeEnabled` 默认 false、`admin.extensions.enabled` 默认
true、`admin.mcp.enabled` 默认 true、`admin.skills.enabled` 默认 true
[@ref-gemini-cli-settings-admin]。平台差异体现在系统路径（上表三平台）与 `SEATBELT_PROFILE`（macOS，默认
`permissive-open`）[@ref-gemini-cli-config-doc-files][@ref-gemini-cli-config-doc-envfiles]。改变默认值的方式就是写对应键：用户设置可改绝大多数键，但少数键只读全局用户设置（例如
`advanced.autoConfigureMemory`，因为内存在进程启动时分配）[@ref-gemini-cli-settings-advanced]。

## 信任与组织策略 {#config-trust}

**config.trust**：文件夹信任是项目级配置能不能生效的总开关，由 `security.folderTrust.enabled` 控制（默认
true，需重启），信任记录存在 `trustedFolders.json`（位置可用 `GEMINI_CLI_TRUSTED_FOLDERS_PATH`
改写，默认在运行时目录下）[@ref-gemini-cli-settings-security][@ref-gemini-cli-config-trusted-override]。信任级别有
`TRUST_FOLDER` 与 `TRUST_PARENT`（信任父目录即信任其子目录），判定时取最长匹配的前缀规则
[@ref-gemini-cli-config-trusted-dialog][@ref-gemini-cli-storage-runtime-scope]。不受信任时的可观察后果：工作区
settings 被整体忽略 [@ref-gemini-cli-config-trust-empty]；工作区 skill 不参与发现
[@ref-gemini-cli-skills-manager-discover]；项目级 subagent 被跳过并提示
[@ref-gemini-cli-agents-registry-sources]；项目级 hooks 被禁用
[@ref-gemini-cli-hooks-registry-trust]；项目 `.env` 只剩四个认证变量会被加载并做值清洗
[@ref-gemini-cli-config-envload]；stdio 类型 MCP server 在 `gemini mcp list` 中显示为
Disconnected [@ref-gemini-cli-mcp-doc-list]。绕过方式：`--skip-trust` 或
`GEMINI_CLI_TRUST_WORKSPACE=true` 只对当前会话生效，`/permissions trust` 可交互管理
[@ref-gemini-cli-cli-options][@ref-gemini-cli-config-doc-envfiles][@ref-gemini-cli-cmd-permissions]。文档单列的一节解释不受信任工作区的影响与信任检查流程
[@ref-gemini-cli-config-trusted-impact][@ref-gemini-cli-config-trusted-enable]。

组织策略有三条路径：系统 settings
文件（管理员可强制覆盖用户配置，企业文档给出部署与封装脚本示例）[@ref-gemini-cli-config-enterprise-system][@ref-gemini-cli-config-enterprise-isolation]；远程下发的
`admin`
段（`secureModeEnabled`、`extensions.enabled`、`mcp.enabled`/`config`/`requiredConfig`、`skills.enabled`）[@ref-gemini-cli-settings-admin]；策略引擎的多层
TOML（默认规则、用户/管理员策略、工作区策略、扩展策略各有层级与优先级）[@ref-gemini-cli-config-policy-locations][@ref-gemini-cli-config-policy-tiers]。企业文档另给出
`coreTools` 白名单、MCP 目录与沙箱强制的做法
[@ref-gemini-cli-config-enterprise-tools][@ref-gemini-cli-config-enterprise-catalog]。

## 迁移、弃用与诊断 {#config-migration-diagnostics}

**config.migration**：登记来源里只有零散的兼容处理，没有通用的配置键迁移框架。可确认的项：旧主题名 `VS`、`VS2015`
在读取时被映射为
`DefaultLight`、`DefaultDark`（源码，用户与工作区设置各处理一次）[@ref-gemini-cli-config-legacy-theme]；`experimental.topicUpdateNarration`
被标注为"已弃用，改用 `general.topicUpdateNarration`"
[@ref-gemini-cli-settings-deprecated]；CLI 层 `--yolo` 与 `--allowed-tools` 标注为
deprecated（前者建议改用
`--approval-mode=yolo`，后者建议改用策略引擎）[@ref-gemini-cli-cli-options]；`/resume checkpoints ...`
作为旧写法在迁移期内仍被接受
[@ref-gemini-cli-cmd-resume]。状态与历史数据的迁移确实存在，但对象是存储目录：`StorageMigration.migrateDirectory`
把旧的 hash 命名目录复制到新的 slug 命名目录，仅当新目录不存在或只含 `.project_root` 时才执行
[@ref-gemini-cli-config-storage-migration]。缺口：没有对"旧版本 settings
键的自动重写"或"配置格式版本号"的描述，也没有列出所有已弃用键的清单；这两点 partial。

**config.diagnostics**：四个入口。`/settings` 打开带校验与说明的设置编辑器（等价于手工编辑
`.gemini/settings.json`），部分设置即时生效、部分需重启
[@ref-gemini-cli-cmd-settings][@ref-gemini-cli-settings-doc-intro]；`settings.md`
的表格按 UI 分组列出每个键的标签、默认值与"是否需要重启"
[@ref-gemini-cli-settings-doc-ui][@ref-gemini-cli-settings-doc-security][@ref-gemini-cli-settings-doc-skills][@ref-gemini-cli-settings-doc-hooksconfig]。启动期校验失败会在
`errors` 里给出文件路径与消息（warning 级，仍然继续运行），这是"文件已写但没生效"的第一手线索
[@ref-gemini-cli-config-load][@ref-gemini-cli-config-validation]。上下文文件（`GEMINI.md`
一类的分层记忆）可用 `/memory list`、`/memory show`、`/memory refresh` 查看与重载
[@ref-gemini-cli-cmd-memory][@ref-gemini-cli-config-doc-context]。系统级文件不是普通用户可写，加载前还会做安全校验，不安全时整份跳过并给出
"Security Warning: Skipping ... file" 提示
[@ref-gemini-cli-config-load]。查看实际生效来源：登记来源没有提供"打印合并后配置与其来源链"的命令，只能按层级顺序手工对照；`--debug`
与 settings 编辑器是现有手段。partial
[@ref-gemini-cli-config-merge][@ref-gemini-cli-cli-options]。
