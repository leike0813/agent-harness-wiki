---
schema_version: 2
record_kind: production
edition_id: claude-code-configuration-v1
harness_id: claude-code
topic: configuration
title: Claude Code 的配置来源、优先级与诊断
sections:
  - section_id: config-sources
    source_refs:
      - ref-cc-config-files
      - ref-cc-config-find
      - ref-cc-config-home
      - ref-cc-config-cloud
      - ref-cc-config-local
  - section_id: config-overrides
    source_refs:
      - ref-cc-config-precedence
      - ref-cc-config-envpair
      - ref-cc-config-lists
      - ref-cc-config-exceptions
      - ref-cc-config-onesession
      - ref-cc-config-troubleshoot
      - ref-cc-config-local
  - section_id: config-diagnostics
    source_refs:
      - ref-cc-config-confirm
      - ref-cc-config-reload
      - ref-cc-config-broken
      - ref-cc-npm-readme
questions:
  - question_id: config.sources
    section_id: config-sources
    status: answered
    source_refs:
      - ref-cc-config-files
      - ref-cc-config-home
      - ref-cc-config-cloud
  - question_id: config.defaults
    section_id: config-sources
    status: partial
    source_refs:
      - ref-cc-config-find
      - ref-cc-config-local
  - question_id: config.migration
    section_id: config-sources
    status: partial
    source_refs:
      - ref-cc-config-local
  - question_id: config.overrides
    section_id: config-overrides
    status: answered
    source_refs:
      - ref-cc-config-precedence
      - ref-cc-config-lists
      - ref-cc-config-exceptions
  - question_id: config.runtime
    section_id: config-overrides
    status: answered
    source_refs:
      - ref-cc-config-envpair
      - ref-cc-config-onesession
  - question_id: config.trust
    section_id: config-overrides
    status: answered
    source_refs:
      - ref-cc-config-troubleshoot
  - question_id: config.diagnostics
    section_id: config-diagnostics
    status: answered
    source_refs:
      - ref-cc-config-confirm
      - ref-cc-config-reload
      - ref-cc-config-broken
---

## 配置来源 {#config-sources}

**config.sources**：CLI 读取四个 settings 文件：用户 `~/.claude/settings.json`（该机器所有项目）、共享项目 `.claude/settings.json`（该目录下所有人，可提交）、项目本地 `.claude/settings.local.json`（仅本人该项目）、托管 `managed-settings.json` 等（组织下发）。另有宿主自写的第五个文件 `~/.claude.json`，存放登录会话、MCP 配置、信任决策与 global config 键。`CLAUDE_CONFIG_DIR` 会把 home 下的配置、会话历史与插件一并搬走。云会话是例外：只读仓库里的 `.claude/settings.json` 与 server-managed settings，不读用户与项目本地文件。 [@ref-cc-config-files] [@ref-cc-config-home] [@ref-cc-config-cloud]

**config.defaults**：安装 Claude Code 不会创建任何 settings 文件；文件由用户创建，或在 `/config` 改动选项、在权限提示里选择“Yes, and don't ask again”时由宿主写入（多数选项写用户文件，Show tips 等写项目本地文件，global config 键写 `~/.claude.json`）。平台差异方面，Windows 的 `~/.claude` 指 `%USERPROFILE%\.claude`。具体默认值与功能开关的完整表在未纳入快照的 settings reference，因此这里只给可确认的默认行为。 [@ref-cc-config-find] [@ref-cc-config-local]

**config.migration**：settings 页没有专门的键迁移或弃用章节，因此没有通用迁移规则可引用。可确认的只有：自 v2.1.211 起项目本地文件固定在仓库根，宿主仍会读取旧版本留在启动目录里的同名文件，两处同键时根文件优先而权限规则两边都生效。 [@ref-cc-config-local]

## 优先级、运行时与信任 {#config-overrides}

**config.overrides**：同一键出现在多处时取最高层级的值，顺序为托管设置、命令行参数、项目本地、共享项目、用户设置。特殊规则有三类：列表键（如 `permissions.allow`）跨文件合并而非覆盖；模型相关键例外，`fallbackModel` 取最高层级的整条值、`modelPicker` 只从托管、`--settings`、用户设置三者中取整条且忽略项目文件、`availableModels` 在托管层生效时不合并；少数限制性键（如 `disableClaudeAiConnectors`、`isolatePeerMachines`）会采纳更严格的低层级值以覆盖托管设置。 [@ref-cc-config-precedence] [@ref-cc-config-lists] [@ref-cc-config-exceptions]

**config.runtime**：命令行与环境变量在运行时介入。`--settings` 可传 JSON 或文件，位于用户、项目、本地之上、托管之下；部分键有专属旗标，如 `--model` 对应 `model`。环境变量不是层级，而是按“键对”决定：`ANTHROPIC_MODEL` 覆盖任何文件的 `model`，`ANTHROPIC_DEFAULT_MODEL` 只在无文件设置 `model` 时生效；文件内的 `env` 块是普通键，仍按层级生效。会话内 `/config`、`/model` 的改动部分会写回用户文件。 [@ref-cc-config-envpair] [@ref-cc-config-onesession]

**config.trust**：项目文件里的部分键要等信任后才生效：`permissions.allow` 规则、`permissions.additionalDirectories`、`extraKnownMarketplaces` 以及多数 `env` 值在队友信任该目录前不生效，`deny` 与 `ask` 规则则立即生效。项目本地文件若未被 git 跟踪，其 allow 规则无需信任步骤即可生效；一旦被跟踪，就要走信任流程。 [@ref-cc-config-troubleshoot]

## 诊断与来源边界 {#config-diagnostics}

**config.diagnostics**：`/status` 的 Setting sources 行列出本次会话加载了哪些文件，但它只说明读过哪些文件，不指出每个键来自哪个文件；`claude doctor` 列出被拒绝的条目，`/config` 打开同一对话框的另一个标签。文件保存后宿主会热重载，并对每次检测到的设置变更运行 `ConfigChange` hook。JSON 非法或值被 schema 拒绝时整份文件报 Settings Error，单项失败（如未知 hook 事件名）只报 Settings Warning 并跳过该项；`~/.claude.json` 无法解析时报 Configuration error 并把损坏文件备份到 `~/.claude/backups/`。 [@ref-cc-config-confirm] [@ref-cc-config-reload] [@ref-cc-config-broken]

关于版本：本章所引设置页未标注适用版本，`version_applicability` 为 unknown，正文涉及多处 `v2.1.x` 门槛。选定的 npm 包快照记录版本 2.1.283，包内 README 只指向在线文档，不能据此把上述规则固定到该精确版本。 [@ref-cc-npm-readme]

