---
schema_version: 3
record_kind: production
edition_id: autohand-cli-configuration-v3
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
    source_refs: [ref-autohand-config-env-v2, ref-autohand-docs-config-keys, ref-autohand-docs-config-runtime, ref-autohand-config-profiles, ref-autohand-m61-config-interaction-mode-default, ref-autohand-m61-config-runtime-flags, ref-autohand-m61-config-zit-flag]
  - section_id: config-trust-defaults
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-workspace-trust, ref-autohand-src-workspace-trust, ref-autohand-config-doctor, ref-autohand-config-permissions, ref-autohand-docs-config-keys, ref-autohand-docs-config-features-v2, ref-autohand-model-catalog, ref-autohand-m61-config-ui-validated-keys, ref-autohand-m61-config-ui-keys-table, ref-autohand-m61-config-statusbar-validation, ref-autohand-m61-config-orchestration-default]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-autohand-hooks-legacy, ref-autohand-config-permissions, ref-autohand-config-providers, ref-autohand-docs-config-keys, ref-autohand-config-hooks, ref-autohand-m61-config-permission-aliases, ref-autohand-m61-config-permission-alias-resolution]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-config-doctor, ref-autohand-docs-config-keys, ref-autohand-docs-config-features-v2, ref-autohand-config-multiagent, ref-autohand-docs-config-files, ref-autohand-config-overlays, ref-autohand-config-profiles, ref-autohand-hooks-workspace-trust, ref-autohand-m61-config-statusbar-validation]
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
        source_refs: [ref-autohand-config-env-v2, ref-autohand-docs-config-runtime, ref-autohand-config-profiles, ref-autohand-m61-config-interaction-mode-default, ref-autohand-m61-config-runtime-flags, ref-autohand-m61-config-zit-flag]
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
        source_refs: [ref-autohand-docs-config-features-v2, ref-autohand-docs-config-keys, ref-autohand-model-catalog, ref-autohand-m61-config-ui-validated-keys, ref-autohand-m61-config-ui-keys-table, ref-autohand-m61-config-statusbar-validation, ref-autohand-m61-config-orchestration-default]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs: [ref-autohand-hooks-legacy, ref-autohand-config-permissions, ref-autohand-config-providers, ref-autohand-config-hooks, ref-autohand-m61-config-permission-aliases, ref-autohand-m61-config-permission-alias-resolution]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-autohand-config-doctor, ref-autohand-docs-config-keys, ref-autohand-docs-config-files, ref-autohand-config-overlays, ref-autohand-hooks-workspace-trust, ref-autohand-m61-config-statusbar-validation]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的配置参考与 `src/config.ts` 源码，以及官方文档站 Configuration 页面；本版按 commit `8e62478053e907977636a7a726ac0ddba2179276` 的 `docs/config-reference.md`、`src/config.ts` 与 `src/permissions/PermissionManager.ts` 复核并更新了默认值、迁移与运行时介入部分。固定问题只针对 `cli` 界面回答。

配置参考的多语言副本（`_cs`/`_de`/`_es`/`_fr`/`_hi` 等）在本版不逐份引用：它们与英文参考共享同一设置语义（同一 `ui.toolOutput`、`ui.defaultInteractionMode`、`permissions.allowList`/`denyList` 命名与弃用别名规则），字段名与取值集合相同，因此每条结论只引英文原件；需要其他语言原文时按同一小节定位到对应副本。

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

`--timeout` 现在是一个**回退窗口**而不只是超时上限：`--yolo` 之前生效的权限设置被保留，窗口结束时原样恢复、正常审批流程继续，因此「auto 批准多久」与「之后回到什么状态」由同一个参数决定。[@ref-autohand-m61-config-runtime-flags]

`--zit [intent]` 是 `--worktree` 的对照形态：会话运行在仓库当前 Zit 状态的一次性副本里，退出时把改动记录为一个 Zit change；它要求 git 仓库与 `zit` CLI，且不能与 `--worktree`、`--tmux`、`--patch`、`--mode rpc|acp` 或独立的 `--auto-mode` 循环同用。[@ref-autohand-m61-config-zit-flag]

`ui.defaultInteractionMode`（默认 `automode`）决定交互式终端会话**启动时**的模式，但显式命令行开关与受限权限模式优先：`--plan`、`--yolo`、`--restricted`、`--dry-run`、`--unrestricted`、`--yes`，以及 `restricted` 或 `external` 的 `permissions.mode` 都会压过该设置；command、RPC 与 ACP 运行永远不会被切到 auto 模式。因此「文件写了没生效」在这一项上是预期行为而非故障。[@ref-autohand-m61-config-interaction-mode-default]

**未证实项**：`--offline` 被描述为「抑制启动网络刷新、保留本地/缓存状态」，但固定来源未逐项列出被抑制的请求清单。检查过的入口：Runtime-only controls 表、Environment variables 表。

## 信任、策略与默认值 {#config-trust-defaults}

**信任**：项目文件里声明的 hooks 与 MCP server 只在受信工作区生效。首次启动会列出每个项目 hook 命令与每个项目 MCP server 的启动方式，要求选择 Trust this workspace 或 Not now；决定存在 `~/.autohand/trusted-workspaces.json`，值是对「声明的 hooks 与 servers」取指纹，任一声明变化会重新询问；保存到 `settings.local.json` 的权限批准**不**改变指纹。不受信时项目文件的 `hooks` 与 `mcp` 段整体被忽略（含其 `enabled` 开关），无法弹窗的运行（`-p`、auto mode、patch mode、RPC、ACP）跳过并向 stderr 提示。`autohand doctor` 的 `--path`/`--config` 可检查别的工作区或配置文件。[@ref-autohand-hooks-workspace-trust][@ref-autohand-src-workspace-trust][@ref-autohand-config-doctor]

不可变安全边界在可配置策略之前运行：配置可以收窄或批准受支持的动作，但不能覆盖不可变黑名单；`permissions.mode` 取 `interactive`/`unrestricted`/`restricted`，`allowList`/`denyList`（旧别名 `whitelist`/`blacklist`）、`rules`、`rememberSession`（默认 `true`）等字段参与决策。[@ref-autohand-config-permissions][@ref-autohand-docs-config-keys]

**默认值来自哪里、怎样被校验**：`ui` 段的取值不是自由文本，而是启动时逐项校验的枚举；取值非法时 `src/config.ts` 的 `validateConfig` 直接抛错并指出配置文件路径，例如 `ui.toolOutput` 只接受 `compact` 或 `full`，`ui.defaultInteractionMode` 只接受 `default`/`plan`/`automode`/`yolo`，`ui.keybindingProfile` 只接受已注册的 profile id，`ui.statusBar` 交给专门的 `validateStatusBarConfig` 检查。也就是说这一段不存在「写了但被静默忽略」的中间态：要么生效，要么启动失败并指名键名与文件。[@ref-autohand-m61-config-ui-validated-keys][@ref-autohand-m61-config-statusbar-validation]

本版新增/修订的 `ui` 默认值：

| 键 | 取值 | 默认 | 作用与生效条件 |
| --- | --- | --- | --- |
| `ui.toolOutput` | `compact` / `full` | `compact` | 只改变交互式 transcript 里工具结果的呈现：`compact` 显示前 3 行（失败时末 5 行）加 `+ N lines (ctrl+o to expand)`，diff 走预览；模型、hooks、RPC 与 ACP 客户端始终拿到完整输出，`--prompt` 运行也始终完整打印。[@ref-autohand-m61-config-ui-keys-table] |
| `ui.defaultInteractionMode` | `default` / `plan` / `automode` / `yolo` | `automode` | 交互式终端会话的启动模式；被显式 CLI 开关或受限 `permissions.mode` 压过时以那些为准。[@ref-autohand-m61-config-interaction-mode-default] |
| `ui.statusBar` | `classic` / `two-line` + `sections[]` | 未配置即沿用既有显示 | 分区式状态栏：`sections` 每项含 `id`、`line`（1 身份行 / 2 状态行）、可选 `enabled`、`priority`、`color`；无数据的分区自动隐藏，既有配置在写入 `ui.statusBar` 前保持原样，`/statusline` 继续可用。[@ref-autohand-m61-config-statusbar-validation] |

`ui.statusLine` 在类型注释与文档里被标为遗留的固定状态行显示项（迁移到 `statusBar`），但仍是 `ui.statusBar` 之外并存的第二组键，工作状态、取消提示与队列信息仍由 `ui.statusLine` 控制。

**账号相关的默认值**：`autohandai.orchestration` 对 Autohand AI Cloud 默认开启——Moa 领新开的账号会话、Fantail 承担只读研究 worker，线程上限默认 4（lead 加 3 worker）；显式写 `features.multi_agent_v2.max_concurrent_threads_per_session` 会覆盖它。关闭方式是 `autohandai.orchestration: false` 或 `/agents orchestration off`，后者同时停掉 Moa 的 checkpoint 复查。[@ref-autohand-m61-config-orchestration-default]

**默认值与开关**：各段落默认值由配置文件参考逐项给出（例如 `ui.theme` 默认 `dark`、`agent.maxIterations` 默认 100、`agent.parallelToolConcurrency` 默认 5、`network.maxRetries` 默认 3、`permissions.rememberSession` 默认 true）。功能开关通过 `features` 配置键或本地实验命令改变，官方文档站给出一张对照表：`mcp.enabled`、`hooks.enabled`、`teams.enabled`、`communitySkills.enabled`、`ui.promptSuggestions`、`agent.enableRequestQueue`、`agent.toolSelectionCache` 等默认开；`features.usageV2`、`features.slashGoal`、`features.tokenUsageStatus`、`features.experimentalFork/Clone/Handoff` 默认关；`features.awsBedrockProvider` 默认开但改后需重启；`telemetry.enabled` 默认关。受服务端控制的远程开关可以用 `features.remoteOverrides` 本地关闭，但本地配置不能把服务端禁用的远程开关强行打开。[@ref-autohand-docs-config-features-v2][@ref-autohand-docs-config-keys]

平台差异：MLX 本地推理仅 Apple Silicon macOS；Windows 上本地 peer 通信当前不可用；部分本地 server 各自占用默认端口（Ollama 11434、llama.cpp/MLX/Autohand AI Local 8080）。模型目录是另一处动态默认值来源：`~/.autohand/models.json` / `AUTOHAND_MODELS_CATALOG` → 上次成功下载的 `~/.autohand/model-catalog/models.json` → 随 CLI 打包的目录，按 provider 与模型 ID 合并，本地覆盖权威。[@ref-autohand-docs-config-keys][@ref-autohand-model-catalog]

## 迁移、弃用与旧格式导入 {#config-migration}

已确立的兼容与迁移行为：

- hooks：最早的事件键控写法、`on_*`/`before_*`/`after_*` 旧事件名与 `{{variable}}` 占位符仍然有效，会被改写到当前生命周期事件上；`/hooks` 再次保存时会统一改写成数组式。[@ref-autohand-hooks-legacy]
- permissions：`whitelist`/`blacklist` 是 `allowList`/`denyList` 的**弃用别名**。本版配置参考已把两段正式改名为 `### allowList` 与 `### denyList`，并给出确定的优先级规则：旧别名**只在对应的新键缺失时**才被读取，因此同时写了新旧两套键的配置会用 `allowList`/`denyList` 并忽略旧键——这不是合并，而是新键优先。[@ref-autohand-config-permissions] 源码侧与此一致，`PermissionManager.normalizeSettings` 用 `settings.allowList ?? settings.whitelist` 与 `settings.denyList ?? settings.blacklist` 归一化，新键即使写成空数组也会赢过非空的旧键。[@ref-autohand-m61-config-permission-aliases][@ref-autohand-m61-config-permission-alias-resolution]
- UI：`ui.useInkRenderer` 已弃用并被忽略（Ink 7 + React 19 是当前交互渲染器）；`ui.statusLine` 被标为遗留的固定状态行项，新的分区式状态栏写在 `ui.statusBar`，两者并存而非自动替换；浏览器集成的配置键仍保留历史名 `chrome`，公开命令已改为 `/browser`。[@ref-autohand-docs-config-keys][@ref-autohand-m61-config-statusbar-validation]
- provider：保存过的 `https://api.autohand.ai/v1` 会自动迁移到 `https://inference.autohand.ai/v1`（私有网关不动）；云端配置里已退役的模型 ID 会在发请求前自动迁移到 `fantail`（当前云端只接受目录中的 `fantail` 与 `moa`）。[@ref-autohand-config-providers]
- 从其他 agent 导入：`autohand import claude|codex|cursor|grok --categories hooks` 会写入 `importedFrom` 元数据（`id`、`source`、`event`、`configPath`、可选的 `workspaceRoot`/`workingDirectory`），编辑这些定义时应保留该元数据以维持来源适配、项目作用域与去重。[@ref-autohand-config-hooks]

**未证实项（partial）**：固定来源没有给出通用的配置键迁移框架（版本号、迁移脚本、破坏性变更清单），只有上面几处逐项说明的兼容行为。检查过的入口：config-reference 的 Permissions Settings 与 MCP/Hooks Settings、Providers 的 Autohand AI 小节、Configuration 的 Runtime-only controls 与 Top-level keys。

## 诊断与「文件已写但未生效」 {#config-diagnostics}

- 一次性检查：`autohand doctor` 检查运行时版本与可执行文件、配置文件与当前 provider（含自定义与扩展 provider）、工具、工作区、终端、账号、每个 MCP server 与扩展诊断；每项标 ok/warning/failure，任一失败退出码为 1；`--json`、`--skip-mcp`、`--path`、`--config` 分别用于结构化输出、跳过 MCP 连接与检查别的工作区/配置。[@ref-autohand-config-doctor]
- 会话内查看：`/settings` 覆盖 UI、agent、会话、权限、网络、遥测、auto-mode、团队与搜索等常用项；`/permissions`（或 `autohand --permissions`）显示当前模式、workspace 与配置文件路径及全部已批准（`allowList`）/已拒绝（`denyList`）模式；`/statusbar` 选择 classic 或 two-line 布局并逐个开关分区（方向键导航、空格切换、在 Done 上回车，离开主菜单时保存），这是确认分区式状态栏是否真被读取的最直接入口；`/experiments`（或 `autohand experiments list|status|enable|disable|refresh`）显示生效的功能开关状态。[@ref-autohand-docs-config-keys][@ref-autohand-docs-config-features-v2][@ref-autohand-config-multiagent][@ref-autohand-m61-config-statusbar-validation]
- 非交互式写入：`autohand config set 键 值`（例如 `autohand config set ui.promptSuggestions false`）。[@ref-autohand-docs-config-features-v2]

「文件已写但没生效」的常见原因可直接由上面的规则判断：目录里同时存在多种 `config.*` 格式会被整体拒绝；`AUTOHAND_CONFIG`/`--config` 指向了别的文件；`AUTOHAND_HOME` 被改到其他基准目录；写在了共享项目 `config.*` 的非 hooks/mcp 段落（被忽略）；被 `--profile`/`--set` 或某次运行期的保存恢复了文件值；项目 hooks/mcp 因工作区不受信而被整体忽略。[@ref-autohand-docs-config-files][@ref-autohand-config-overlays][@ref-autohand-config-profiles][@ref-autohand-hooks-workspace-trust]

**未证实项**：没有单独的「显示每个键的最终来源」命令（`autohand doctor` 只报告配置文件与 provider）。检查过的入口：Doctor 小节、`/settings`、`/permissions`、`/experiments`、`autohand config set`。
