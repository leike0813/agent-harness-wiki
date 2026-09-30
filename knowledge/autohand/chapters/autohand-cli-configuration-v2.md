---
schema_version: 3
record_kind: production
edition_id: autohand-cli-configuration-v2
harness_id: autohand
topic: configuration
title: "Autohand Code CLI 的配置来源、优先级与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-config-files, ref-autohand-config-locations, ref-autohand-config-overlays, ref-autohand-docs-config-overlay]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-autohand-config-profiles, ref-autohand-src-config-merge, ref-autohand-config-overlays, ref-autohand-docs-config-precedence]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-autohand-config-env-v2, ref-autohand-docs-config-keys, ref-autohand-docs-config-runtime, ref-autohand-config-profiles]
  - section_id: config-trust-defaults
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-workspace-trust, ref-autohand-src-workspace-trust, ref-autohand-config-doctor, ref-autohand-config-permissions, ref-autohand-docs-config-keys, ref-autohand-docs-config-features-v2, ref-autohand-model-catalog]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-legacy, ref-autohand-config-permissions, ref-autohand-config-providers, ref-autohand-docs-config-keys, ref-autohand-config-hooks]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-config-doctor, ref-autohand-docs-config-keys, ref-autohand-docs-config-features-v2, ref-autohand-config-multiagent, ref-autohand-docs-config-files, ref-autohand-config-overlays, ref-autohand-config-profiles, ref-autohand-hooks-workspace-trust]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-autohand-docs-config-files, ref-autohand-config-locations, ref-autohand-config-overlays]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-autohand-config-profiles, ref-autohand-src-config-merge, ref-autohand-config-overlays, ref-autohand-docs-config-precedence]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-autohand-config-env-v2, ref-autohand-docs-config-runtime, ref-autohand-config-profiles]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults
        status: answered
        source_refs: [ref-autohand-hooks-workspace-trust, ref-autohand-src-workspace-trust, ref-autohand-config-permissions, ref-autohand-config-doctor]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-trust-defaults
        status: answered
        source_refs: [ref-autohand-docs-config-features-v2, ref-autohand-docs-config-keys, ref-autohand-model-catalog]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs: [ref-autohand-hooks-legacy, ref-autohand-config-permissions, ref-autohand-config-providers, ref-autohand-config-hooks]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-autohand-config-doctor, ref-autohand-docs-config-keys, ref-autohand-docs-config-files, ref-autohand-config-overlays, ref-autohand-hooks-workspace-trust]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的配置参考与 `src/config.ts` 源码，以及官方文档站 Configuration 页面。固定问题只针对 `cli` 界面回答。

## 配置来源与路径确定 {#config-sources}

Autohand 只选**一个**用户配置文件，按以下顺序取第一个命中者：[@ref-autohand-docs-config-files][@ref-autohand-config-locations]

1. 显式 `--config 路径`
2. `AUTOHAND_CONFIG` 环境变量
3. `$AUTOHAND_HOME/config.toml`
4. `$AUTOHAND_HOME/config.yaml`
5. `$AUTOHAND_HOME/config.yml`
6. `$AUTOHAND_HOME/config.json`

`AUTOHAND_HOME` 默认 `~/.autohand`，改变了所有 Autohand 数据（配置、扩展、agent、skills、会话、记忆、缓存）的基准目录。该目录下**只保留四种标准配置文件之一**：多种格式同时存在会被拒绝（不合并）。首次运行且无文件时以安全默认值创建 JSON。[@ref-autohand-config-locations][@ref-autohand-docs-config-files]

官方配置文档特别提醒「使用当前文件名」：Autohand **没有**全局 `settings.json`，用户配置就是 `config.toml`/`config.yaml`/`config.yml`/`config.json` 四者之一，而 `.autohand/settings.local.json` 只是一层很窄的本地覆盖，不是第二份完整配置。[@ref-autohand-docs-config-files]

项目层两个文件（都是 JSON/TOML/YAML 同名族，见下）：`项目根/.autohand/config.*` 是**可提交的共享项目配置**，只读取其中的 `hooks` 与 `mcp` 两段；`项目根/.autohand/settings.local.json` 是个人本地覆盖，支持 `hooks`、`mcp`、`permissions`、`agent`、`network`、`telemetry`、`provider`、`model`。共享文件里的 permissions、telemetry、provider 等其余段落被忽略，克隆来的仓库无法借此切换 unrestricted 模式或改写 provider。[@ref-autohand-config-overlays][@ref-autohand-docs-config-overlay]

## 作用域优先级与合并规则 {#config-overrides}

持久化配置的优先级（低到高）：用户配置文件 → 工作区 `.autohand` 两个覆盖层（共享项目文件在前、`settings.local.json` 在后）→ 支持的环境变量 → `--profile` → `--set`。代理/网关发出的 `--profile` 与 `--set` 仅对本次运行有效，不写入配置文件；运行期由 `/model`、`/theme` 等触发的保存会恢复文件自身的值，除非该设置在本次运行中被改动过。`--profile` 与 `--set` 都不能改 `auth` 与 `profiles`；未知的 profile 名会在启动时报错并列出已定义 profile。[@ref-autohand-config-profiles]

合并语义按段落区分：

| 段落 | 合并行为 |
| --- | --- |
| 工作区覆盖（对象） | 深度合并并覆盖全局同名键（`mergeWorkspaceSettings`） |
| `hooks` | 追加；与全局同身份（脚本名，或事件加 description/command）的项目项替换全局项 |
| `mcp.servers` | 追加到全局列表；同名 server 由项目项替换 |
| 共享项目文件的其余段落 | 被忽略，不参与合并 |

[@ref-autohand-src-config-merge][@ref-autohand-config-overlays][@ref-autohand-docs-config-precedence]

**未证实项**：没有发现数组的「空值删除标记」约定，也没有除 hooks/mcp 之外的数组合并规则说明。检查过的入口：`src/config.ts` 的 `loadConfig`/`mergeWorkspaceSettings`、docs Configuration 的 Effective precedence、config-reference 的 Project config overlays。

## 环境变量、CLI 参数与 profile 的介入时机 {#config-runtime}

环境变量在文件与覆盖层之后、profile 之前生效，主要分三类：[@ref-autohand-config-env-v2][@ref-autohand-docs-config-keys]

- 路径与文件：`AUTOHAND_HOME`、`AUTOHAND_CONFIG`、`AUTOHAND_MODELS_CATALOG`。
- 服务与凭据：`AUTOHAND_API_URL`、`AUTOHAND_AUTH_URL`、`AUTOHAND_SECRET`、`AUTOHAND_API_KEY`、`AUTOHAND_PROVIDER`，以及各 provider 的密钥变量。
- 运行控制：`AUTOHAND_NON_INTERACTIVE`、`AUTOHAND_YES`、`AUTOHAND_NO_BANNER`、`AUTOHAND_DEBUG`、`AUTOHAND_THINKING_LEVEL`、`AUTOHAND_STREAM_TOOL_OUTPUT`、`AUTOHAND_CODE_SIMPLE`、`AUTOHAND_SKIP_UPDATE_CHECK`。

CLI 参数只在进程内覆盖：`--model` 只改本会话的模型；`--profile`/`--set` 是运行时分层（见上）；`--bare`、`--offline`、`--no-idle-logout`、`--browser`/`--no-browser` 这类功能性开关**最后**生效且刻意不持久化；`--output-format stream-json` 与 `--json local|stream` 控制结构化输出，且要求一次性 prompt（`stream-json` 不能与 `--json local` 同用）。[@ref-autohand-docs-config-runtime][@ref-autohand-config-profiles]

`--bare` 是另一类运行时开关：文档列出它会关闭环境型 hooks、LSP、插件同步/加载、attribution、auto-memory、后台预取、keychain/浏览器登录回退、AGENTS.md 发现、遥测/上报/同步与斜杠命令；而显式传入的扩展、MCP 配置、agents、插件目录、system prompt 与额外目录仍按其显式入口可用。[@ref-autohand-docs-config-runtime]

**未证实项**：`--offline` 被描述为「抑制启动网络刷新、保留本地/缓存状态」，但固定来源未逐项列出被抑制的请求清单。检查过的入口：Runtime-only controls 表、Environment variables 表。

## 信任、策略与默认值 {#config-trust-defaults}

**信任**：项目文件里声明的 hooks 与 MCP server 只在受信工作区生效。首次启动会列出每个项目 hook 命令与每个项目 MCP server 的启动方式，要求选择 Trust this workspace 或 Not now；决定存在 `~/.autohand/trusted-workspaces.json`，值是对「声明的 hooks 与 servers」取指纹，任一声明变化会重新询问；保存到 `settings.local.json` 的权限批准**不**改变指纹。不受信时项目文件的 `hooks` 与 `mcp` 段整体被忽略（含其 `enabled` 开关），无法弹窗的运行（`-p`、auto mode、patch mode、RPC、ACP）跳过并向 stderr 提示。`autohand doctor` 的 `--path`/`--config` 可检查别的工作区或配置文件。[@ref-autohand-hooks-workspace-trust][@ref-autohand-src-workspace-trust][@ref-autohand-config-doctor]

不可变安全边界在可配置策略之前运行：配置可以收窄或批准受支持的动作，但不能覆盖不可变黑名单；`permissions.mode` 取 `interactive`/`unrestricted`/`restricted`，`allowList`/`denyList`（旧别名 `whitelist`/`blacklist`）、`rules`、`rememberSession`（默认 `true`）等字段参与决策。[@ref-autohand-config-permissions][@ref-autohand-docs-config-keys]

**默认值与开关**：各段落默认值由配置文件参考逐项给出（例如 `ui.theme` 默认 `dark`、`agent.maxIterations` 默认 100、`agent.parallelToolConcurrency` 默认 5、`network.maxRetries` 默认 3、`permissions.rememberSession` 默认 true）。功能开关通过 `features` 配置键或本地实验命令改变，官方文档站给出一张对照表：`mcp.enabled`、`hooks.enabled`、`teams.enabled`、`communitySkills.enabled`、`ui.promptSuggestions`、`agent.enableRequestQueue`、`agent.toolSelectionCache` 等默认开；`features.usageV2`、`features.slashGoal`、`features.tokenUsageStatus`、`features.experimentalFork/Clone/Handoff` 默认关；`features.awsBedrockProvider` 默认开但改后需重启；`telemetry.enabled` 默认关。受服务端控制的远程开关可以用 `features.remoteOverrides` 本地关闭，但本地配置不能把服务端禁用的远程开关强行打开。[@ref-autohand-docs-config-features-v2][@ref-autohand-docs-config-keys]

平台差异：MLX 本地推理仅 Apple Silicon macOS；Windows 上本地 peer 通信当前不可用；部分本地 server 各自占用默认端口（Ollama 11434、llama.cpp/MLX/Autohand AI Local 8080）。模型目录是另一处动态默认值来源：`~/.autohand/models.json` / `AUTOHAND_MODELS_CATALOG` → 上次成功下载的 `~/.autohand/model-catalog/models.json` → 随 CLI 打包的目录，按 provider 与模型 ID 合并，本地覆盖权威。[@ref-autohand-docs-config-keys][@ref-autohand-model-catalog]

## 迁移、弃用与旧格式导入 {#config-migration}

已确立的兼容与迁移行为：

- hooks：最早的事件键控写法、`on_*`/`before_*`/`after_*` 旧事件名与 `{{variable}}` 占位符仍然有效，会被改写到当前生命周期事件上；`/hooks` 再次保存时会统一改写成数组式。[@ref-autohand-hooks-legacy]
- permissions：`whitelist`/`blacklist` 是 `allowList`/`denyList` 的**弃用兼容别名**。[@ref-autohand-config-permissions]
- provider：保存过的 `https://api.autohand.ai/v1` 会自动迁移到 `https://inference.autohand.ai/v1`（私有网关不动）；云端配置里已退役的模型 ID 会在发请求前自动迁移到 `fantail`（当前云端只接受目录中的 `fantail` 与 `moa`）。[@ref-autohand-config-providers]
- UI：`ui.useInkRenderer` 已弃用并被忽略（Ink 7 + React 19 是当前交互渲染器）；浏览器集成的配置键仍保留历史名 `chrome`，公开命令已改为 `/browser`。[@ref-autohand-docs-config-keys]
- 从其他 agent 导入：`autohand import claude|codex|cursor|grok --categories hooks` 会写入 `importedFrom` 元数据（`id`、`source`、`event`、`configPath`、可选的 `workspaceRoot`/`workingDirectory`），编辑这些定义时应保留该元数据以维持来源适配、项目作用域与去重。[@ref-autohand-config-hooks]

**未证实项（partial）**：固定来源没有给出通用的配置键迁移框架（版本号、迁移脚本、破坏性变更清单），只有上面几处逐项说明的兼容行为。检查过的入口：config-reference 的 Permissions Settings 与 MCP/Hooks Settings、Providers 的 Autohand AI 小节、Configuration 的 Runtime-only controls 与 Top-level keys。

## 诊断与「文件已写但未生效」 {#config-diagnostics}

- 一次性检查：`autohand doctor` 检查运行时版本与可执行文件、配置文件与当前 provider（含自定义与扩展 provider）、工具、工作区、终端、账号、每个 MCP server 与扩展诊断；每项标 ok/warning/failure，任一失败退出码为 1；`--json`、`--skip-mcp`、`--path`、`--config` 分别用于结构化输出、跳过 MCP 连接与检查别的工作区/配置。[@ref-autohand-config-doctor]
- 会话内查看：`/settings` 覆盖 UI、agent、会话、权限、网络、遥测、auto-mode、团队与搜索等常用项；`/permissions`（或 `autohand --permissions`）显示当前模式、workspace 与配置文件路径及全部已批准/已拒绝模式；`/experiments`（或 `autohand experiments list|status|enable|disable|refresh`）显示生效的功能开关状态。[@ref-autohand-docs-config-keys][@ref-autohand-docs-config-features-v2][@ref-autohand-config-multiagent]
- 非交互式写入：`autohand config set 键 值`（例如 `autohand config set ui.promptSuggestions false`）。[@ref-autohand-docs-config-features-v2]

「文件已写但没生效」的常见原因可直接由上面的规则判断：目录里同时存在多种 `config.*` 格式会被整体拒绝；`AUTOHAND_CONFIG`/`--config` 指向了别的文件；`AUTOHAND_HOME` 被改到其他基准目录；写在了共享项目 `config.*` 的非 hooks/mcp 段落（被忽略）；被 `--profile`/`--set` 或某次运行期的保存恢复了文件值；项目 hooks/mcp 因工作区不受信而被整体忽略。[@ref-autohand-docs-config-files][@ref-autohand-config-overlays][@ref-autohand-config-profiles][@ref-autohand-hooks-workspace-trust]

**未证实项**：没有单独的「显示每个键的最终来源」命令（`autohand doctor` 只报告配置文件与 provider）。检查过的入口：Doctor 小节、`/settings`、`/permissions`、`/experiments`、`autohand config set`。
