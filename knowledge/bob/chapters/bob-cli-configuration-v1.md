---
schema_version: 3
record_kind: production
edition_id: bob-cli-configuration-v1
harness_id: bob
topic: configuration
title: "Bob Shell 的配置机制：来源、优先级、信任与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-bob-config-files, ref-bob-ts-settings, ref-bob-modes-project-yaml, ref-bob-mcp-levels, ref-bob-config-context]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-bob-ts-settings, ref-bob-config-files, ref-bob-mcp-levels, ref-bob-modes-project-yaml, ref-bob-rules-priority]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-bob-run-options, ref-bob-chat-options, ref-bob-install-apikey, ref-bob-acp-auth, ref-bob-run-listtasks]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-bob-trust-enable, ref-bob-trust-behavior, ref-bob-trust-levels, ref-bob-trust-impact]
  - section_id: config-defaults-schema
    surface_ids: [cli]
    source_refs: [ref-bob-config-schema-json, ref-bob-config-schema, ref-bob-telemetry-toggle, ref-bob-approval-schema, ref-bob-changelog-locale, ref-bob-changelog-fetch]
  - section_id: config-migration-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-changelog-settings, ref-bob-install-upgrade, ref-bob-changelog-flags, ref-bob-changelog-oob-config, ref-bob-ts-debug, ref-bob-config-logs, ref-bob-ts-settings, ref-bob-ts-instructions, ref-bob-ts-workspace, ref-bob-changelog-root]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-bob-config-files, ref-bob-ts-settings, ref-bob-mcp-levels]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-bob-ts-settings, ref-bob-config-files, ref-bob-mcp-levels]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-bob-run-options, ref-bob-chat-options, ref-bob-install-apikey]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-bob-trust-enable, ref-bob-trust-behavior, ref-bob-trust-impact]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-schema
        status: answered
        source_refs: [ref-bob-config-schema, ref-bob-config-schema-json]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration-diagnostics
        status: partial
        source_refs: [ref-bob-changelog-settings, ref-bob-install-upgrade]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-migration-diagnostics
        status: answered
        source_refs: [ref-bob-ts-debug, ref-bob-config-logs, ref-bob-ts-instructions, ref-bob-ts-workspace]
---

## 配置来源与路径 {#config-sources}

Bob Shell 的主要设置文件有两个作用域：

| 作用域 | 文件 |
| :-- | :-- |
| 用户（所有工作区） | `~/.bob/settings/settings.json` |
| 项目（当前工作区） | 项目根下的 `.bob/settings.json` |

CLI 参数对当前会话总是覆盖文件值，也可以在 `bob chat` 内用 `/settings` 交互式修改。[@ref-bob-config-files] Troubleshooting 页把同样两个作用域写成 `~/.bob/settings.json` 与 `.bob/settings.json`，与 Configuring 页的 `~/.bob/settings/settings.json` 不一致；以 Configuring 页与 changelog 2.0.0 的 “Settings are now stored at ~/.bob/settings/settings.json” 为准。[@ref-bob-ts-settings][@ref-bob-config-files]

除主设置文件外，同族配置分散在各自的机制里，路径与作用域互相独立：

- 自定义模式：全局 `~/.bob/custom_modes.yaml`，项目 `.bob/custom_modes.yaml`。[@ref-bob-modes-project-yaml]
- MCP server：全局 `$HOME/.bob/mcp_settings.json`，项目 `.bob/mcp.json`。[@ref-bob-mcp-levels]
- 上下文文件：全局 `~/.bob/AGENTS.md`，项目根及父目录的 `AGENTS.md`，子目录中的 `AGENTS.md` 作为局部上下文。[@ref-bob-config-context]

OAuth 令牌单独存放于 `~/.bob/settings/auth-secrets.json`；`~/.bob/settings/` 下还保存加密的 secret（`/manage-secrets`）；信任决定存放在 `~/.bob/trustedFolders.json`；日志在 `~/.bob/logs/shell/`。[@ref-bob-config-files]

## 优先级与合并 {#config-overrides}

Troubleshooting 页给出的完整优先级顺序是：命令行参数 > 环境变量 > 项目设置 > 用户设置 > 系统默认值。[@ref-bob-ts-settings] Configuring 页只强调 “CLI flags always override file values for the current session”。[@ref-bob-config-files]

各机制自己的合并规则按机制计算，与主设置文件分开：MCP server 同名时项目 `.bob/mcp.json` 覆盖全局 `mcp_settings.json`；自定义模式按 命令行 > 项目 > 用户 > 系统 的顺序应用；自定义规则先全局（`~/.bob/rules/`）后工作区（`.bob/rules/`），工作区可覆盖全局。[@ref-bob-mcp-levels][@ref-bob-modes-project-yaml][@ref-bob-rules-priority]

对象/数组的深合并、空值与删除标记的处理方式，公开文档没有说明；这是本章的显式缺口。

## 运行时覆盖（CLI 与环境变量） {#config-runtime}

`bob run` 的选项（逐字取自 Non-interactive 页 “Options” 表的一部分）：`--format`、`--mode`、`--max-cost`、`--max-turns`、`--disable-mcp`、`--disable-subagents`、`--disable-tool-groups`、`--workspace`、`--log-level`、`--resume`、`--team-id`、`--trust`、`--accept-license`。[@ref-bob-run-options] 交互式 `bob chat` 侧对应 `--instance-id`、`--resume`、`--mode`、`--log-level`、`--auto-approve`、`--trust`、`--team-id`。[@ref-bob-chat-options]

环境变量：`BOB_API_KEY` 提供推理用 API key（`general` 类型时还需 `--team-id`）；`BOB_LOG_LEVEL` 与 `--log-level` 等价，可打开详细日志。[@ref-bob-install-apikey] ACP 场景另用 `BOBSHELL_API_KEY`。[@ref-bob-acp-auth]

`bob --list-tasks`、`bob --version`、`bob --show-license` 是直接挂在 `bob` 上的工具型参数，不属于会话配置。[@ref-bob-run-listtasks]

## 信任策略对配置读取的限制 {#config-trust}

Trusted folders 默认关闭，需要在 `/settings` 里把 Folder Trust 置为 true，重启后生效。[@ref-bob-trust-enable] 启用后，Bob Shell 在加载任何项目级内容之前先评估工作目录的信任级别：[@ref-bob-trust-behavior]

- 未决（`~/.bob/trustedFolders.json` 中没有条目）按受信任处理。
- `TRUST_FOLDER` 或 `TRUST_PARENT` 为受信任，功能完整；`TRUST_PARENT` 覆盖其下所有子目录。
- `DONT_TRUST` 时 Bob Shell 直接报错不运行，提示传 `--trust` 或交互式选择信任级别。

这三种级别逐条保存在 `~/.bob/trustedFolders.json` 里，每个文件夹一条。[@ref-bob-trust-levels]

不可信目录的后果是整片项目配置被屏蔽：`.bob/settings.json` 不加载、工具自动批准被降级为逐次询问、MCP server 不连接、项目自定义模式不可用、项目 Skill 不加载、项目 subagent 不可用、`AGENTS.md` 等项目指令不读取。[@ref-bob-trust-impact] `--trust` 在交互模式下会把信任写入 `trustedFolders.json`，在非交互模式下只对本次运行生效；`--auto-approve` 在不可信目录中被静默抑制。[@ref-bob-trust-impact]

## 默认值、schema 与开关 {#config-defaults-schema}

设置文件的完整示例给出了默认值（逐字来自 Configuring 页 “Settings schema”）：[@ref-bob-config-schema-json]

```json
{
  "session": {
    "maxTurns": 100,
    "defaultMode": "agent",
    "mcp": true,
    "subagents": true
  },
  "logging": {
    "logLevel": "warn"
  },
  "tasks": {
    "retentionDays": 30
  },
  "telemetry": {
    "enabled": true
  }
}
```

字段默认值与说明：[@ref-bob-config-schema]

| 键 | 类型 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| `session.maxTurns` | number | 100 | 每次会话最大 agentic 轮数，0 为不限 |
| `session.defaultMode` | string | `agent` | 起始模式 |
| `session.mcp` | boolean | true | 默认启用 MCP server |
| `session.subagents` | boolean | true | 默认允许派生 subagent |
| `logging.logLevel` | string | `warn` | 日志详细度：error/warn/info/debug/trace |
| `tasks.retentionDays` | number | 30 | 任务历史保留天数，0 关闭自动清理 |
| `telemetry.enabled` | boolean | true | 是否发送使用遥测 |
| `telemetry.excludePayload` | boolean | — | 排除对话负载（仅 IBM 用户，敏感项目才开启） |

`tasks.retentionDays` 有版本条件：只有 2.0.1 及以后才能设为 0，更早版本设为 0 会删除未固定的任务及其历史。[@ref-bob-config-schema] 遥测也可以在 `/settings` 里切换到 `Enable Usage Metrics` 开关，并选择保存到全局或用户级。[@ref-bob-telemetry-toggle]

审批配置写在同一个 settings 文件的 `approval` 键下，由 `allowed_permissions`（工具权限组）、`permissionOptions`（目前支持 `read` 组的 `enableOutsideWorkspace`）、`allowedExecutors`（目前仅 `execute_command` 的 `approvedCommands`/`deniedCommands`）组成；该文件与 IDE 共享，改动在下次启动 Bob Shell 会话时生效。[@ref-bob-approval-schema]

changelog 还记录了两个 2.0.5 新增的设置项：`locale` 用于独立于系统区域设置选择显示语言，以及一个控制 Bob 是否允许直接抓取外部 URL 的开关；两者只在 changelog 中列出，正文页未给出键名与取值。[@ref-bob-changelog-locale][@ref-bob-changelog-fetch]

## 迁移与诊断 {#config-migration-diagnostics}

迁移：2.0.0 重新设计了 settings schema 并把设置迁到 `~/.bob/settings/settings.json`。[@ref-bob-changelog-settings] 从 1.0.x 升级需要全新安装（没有自动化升级路径，现有设置与配置在安装时保留）。[@ref-bob-install-upgrade] 2.0.0 移除的 `--list-sessions` 与 `--limit` 在 2.0.1 恢复为 `--list-tasks` 的静默别名。[@ref-bob-changelog-flags] 另外，对 `.bob/settings.json` 与 `~/.bob/settings/` 下的写入始终需要一次性显式批准，自动批准不能绕过；对 `~/.bob/` 的写入也不再被自动批准。[@ref-bob-changelog-oob-config]

诊断：

- 日志：`--log-level debug` 或 `BOB_LOG_LEVEL=debug`；日志写在 `~/.bob/logs/shell/`，滚动保留最多 10 个、每个上限 5 MB，`/logs` 可直接打开最新文件。[@ref-bob-ts-debug] 持久化日志级别可写 `logging.logLevel`。[@ref-bob-config-logs]
- “文件已写但没生效”的排查点（Troubleshooting 页）：确认文件位置、校验 JSON 语法、按优先级顺序核对是否被更高优先级来源覆盖、重启 Bob Shell。[@ref-bob-ts-settings]
- 上下文/指令未加载时：确认 `.bob/rules/` 与 `.bob/rules-{modeSlug}/` 位置、扩展名是否为 `.md`/`.txt`/`.xml`，并用 `/memory refresh` 重新加载、`/memory show` 查看当前上下文。[@ref-bob-ts-instructions]
- 工作区根解析影响所有项目级配置的归属：从当前目录向上找 `.git` 或 `.bob`，第一个命中即根；都没有则用当前目录；2.0.1 起 `.git` 优先于 `.bob`。[@ref-bob-ts-workspace][@ref-bob-changelog-root]

文档没有提供“列出实际生效配置来源”的命令，也没有说明配置热重载是否支持；这一项是公开文档中的缺口。
