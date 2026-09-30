---
schema_version: 3
record_kind: production
edition_id: kiro-cli-configuration-v1
harness_id: kiro
topic: configuration
title: "Kiro CLI 的配置作用域、优先级与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-kiro-config-intro, ref-kiro-config-scopes, ref-kiro-config-paths, ref-kiro-harness-setup]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-kiro-config-conflicts, ref-kiro-permissions-scopes, ref-kiro-config-supports, ref-kiro-agents-precedence, ref-kiro-mcpfile-priority]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-kiro-config-scopes, ref-kiro-auth-apikey, ref-kiro-cli-debug, ref-kiro-cli-proxy, ref-kiro-firewalls-proxy, ref-kiro-update-precedence, ref-kiro-settings-toggle, ref-kiro-toolsearch-how, ref-kiro-clicmd-global, ref-kiro-headless-flags, ref-kiro-session-persist, ref-kiro-session-settings, ref-kiro-models-regions, ref-kiro-clicmd-agent]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-kiro-v3-trust, ref-kiro-agents-locations, ref-kiro-permissions-scopes, ref-kiro-permissions-defaults, ref-kiro-admin-policy, ref-kiro-admin-validation, ref-kiro-mcpregistry-hidden]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-kiro-permissions-defaults, ref-kiro-settings-api, ref-kiro-settings-toggle, ref-kiro-settings-mcp, ref-kiro-settings-chat, ref-kiro-headless-agent, ref-kiro-agentref-inherit, ref-kiro-permissions-manage, ref-kiro-agentref-upgrade, ref-kiro-v3-breaking]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-config-inspect, ref-kiro-settings-access, ref-kiro-cli-debug, ref-kiro-clicmd-diagnostic, ref-kiro-clicmd-doctor, ref-kiro-mcpfile-hotreload, ref-kiro-session-persist, ref-kiro-session-settings, ref-kiro-permissions-defaults, ref-kiro-v3-trust, ref-kiro-admin-validation]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-kiro-config-intro, ref-kiro-config-paths, ref-kiro-config-scopes]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-kiro-config-conflicts, ref-kiro-permissions-scopes]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs: [ref-kiro-clicmd-global, ref-kiro-headless-flags, ref-kiro-update-precedence]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-kiro-v3-trust, ref-kiro-permissions-scopes, ref-kiro-admin-policy]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-kiro-permissions-defaults, ref-kiro-settings-api, ref-kiro-headless-agent]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs: [ref-kiro-agentref-upgrade, ref-kiro-v3-breaking]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-kiro-config-inspect, ref-kiro-settings-access, ref-kiro-cli-debug]
---

## 配置来源与作用域 {#config-sources}

Kiro 的配置是分层的，共三种作用域，越接近当前上下文的配置优先级越高：[@ref-kiro-config-intro]

1. **Global** — 对所有项目生效，存放于 `~/.kiro/`；
2. **Project** — 只对某个工作区生效，存放于 `<项目根>/.kiro/`；
3. **Agent** — 每个 agent 单独定义，位于 `~/.kiro/agents/`（全局）或 `.kiro/agents/`（项目）。

设置 `KIRO_HOME` 环境变量可以把全局的 `~/.kiro` 重定向到别处；Agents、Skills、Steering、Settings、Sessions 都会随 `KIRO_HOME` 解析，官方用途是在同一台机器上保留多套 Kiro 配置。[@ref-kiro-config-scopes]

各配置项的准确路径（官方 "File paths" 表，CLI 相关部分）：[@ref-kiro-config-paths]

| 配置 | 全局 | 项目 |
| :-- | :-- | :-- |
| MCP server | `~/.kiro/settings/mcp.json` | `.kiro/settings/mcp.json` |
| Permissions | `~/.kiro/settings/permissions.yaml` | `~/.kiro/workspace-roots/` 下的按工作区哈希命名目录（每用户、在仓库之外） |
| 自定义 agent | `~/.kiro/agents/` | `.kiro/agents/` |
| Steering | `~/.kiro/steering/` | `.kiro/steering/` |
| Skills | `~/.kiro/skills/` | `.kiro/skills/` |
| Hooks | `~/.kiro/hooks/` | `.kiro/hooks/` |
| Powers | `~/.kiro/powers/` | 无 |
| Settings (CLI) | `~/.kiro/settings/cli.json` | 无 |

三者的"随谁走"由架构页说明：Project 配置随仓库走（队友和任何打开该仓库的 surface 都拿到同样的 steering、specs、agents、hooks、MCP server）；User 配置在 `~/.kiro/` 随本机；**工作区信任**单独放在 `~/.kiro/workspace-roots/`，只属于本机，仓库无法给自己授予信任。[@ref-kiro-harness-setup]

## 优先级与合并规则 {#config-overrides}

作用域冲突时的总原则是"最接近当前上下文的作用域胜出"，但**不同配置项规则不同**（官方 "Resolving conflicts" 表）：[@ref-kiro-config-conflicts]

| 配置 | 优先级（高 → 低） |
| :-- | :-- |
| MCP server | Agent > Project > Global |
| Permissions | deny 无视作用域恒胜（deny-overrides） |
| Custom agents | Project > Global（同名时项目胜出并告警） |
| Steering | 所有作用域**合并**，不覆盖 |
| Skills | 所有作用域**合并** |
| Hooks | 所有作用域**合并** |
| Workflows | Project > Global > 同步的账户配方 > 内置配方 |

权限的 deny-overrides 定义见权限页：作用域为 Kiro（硬编码不变量）、administration（企业策略）、user（`permissions.yaml`）、workspace（`~/.kiro/workspace-roots/`）、agent（agent 配置内联）、session（会话内决定）；规则按 deny > ask > allow 判定，**作用域之间没有先后**，最严格的效果胜出。[@ref-kiro-permissions-scopes]

各作用域"能定义什么"由官方 "What each scope supports" 表给出：Global 支持 MCP、Permissions、Custom agents、Steering、Skills、Hooks、Powers、Workflows、Settings；Project 支持除 Powers 与 Settings 外的同类项加上 Specs；Agent scope 支持 MCP（`mcpServers` 或 `includeMcpJson`）、Permissions、Steering/Skills（`resources`）、Hooks（仅 CLI 的 `hooks` 字段）、Powers（`includePowers`）。[@ref-kiro-config-supports]

具体到几个常被问到的项：同名 agent 由项目覆盖全局并告警；MCP server 由 agent 配置整体覆盖工作区/全局；MCP 的加载细节见 MCP 章节。[@ref-kiro-agents-precedence][@ref-kiro-mcpfile-priority]

## 运行时介入：环境变量、CLI 参数与 profile {#config-runtime}

**环境变量**（固定来源中明确提到的 CLI 相关变量）：

| 变量 | 作用 | 来源 |
| :-- | :-- | :-- |
| `KIRO_HOME` | 重定向全局 `~/.kiro` | [@ref-kiro-config-scopes] |
| `KIRO_API_KEY` | 无头/非交互认证凭据 | [@ref-kiro-auth-apikey] |
| `KIRO_CHAT_LOG_FILE` | 覆盖聊天日志路径 | [@ref-kiro-cli-debug] |
| `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` | CLI 与 IDE 的应用流量代理（v1.8.0+） | [@ref-kiro-cli-proxy][@ref-kiro-firewalls-proxy] |
| `KIRO_DESKTOP_RELEASE_URL` | 覆盖更新基址（无强制策略时优先于策略值） | [@ref-kiro-update-precedence] |
| `KIRO_ASCII_MODE=1` | 强制 ASCII 模式 | [@ref-kiro-settings-toggle] |
| `KIRO_CLI_TOOL_SEARCH_MATCHING_THRESHOLD` | Tool Search 关键词匹配阈值（默认 1.5） | [@ref-kiro-toolsearch-how] |
| `KIRO_SKIP_BINARY_PINNING=1` | 跳过会话级二进制拷贝（仅在二进制路径固定的环境使用） | [@ref-kiro-cli-debug] |

**CLI 全局参数**（任意命令可用）：`--verbose`/`-v`（可叠加）、`--agent`（指定自定义 agent 开启会话）、`--v3`/`--v2`（当次调用选择 agent harness，二者不可同用，根级 `--v2` 还与 `--legacy-ui` 冲突）、`--help`/`-h`、`--version`/`-V`、`--help-all`。文档说明 `--v2` 会覆盖保存的 `chat.agentEngine` 但不改动它。[@ref-kiro-clicmd-global]

**无头/非交互参数**：`--no-interactive`（指令来自位置参数或管道 stdin，二者不能同时用）、`--trust-all-tools`、`--trust-tools=CATEGORIES`、`--require-mcp-startup`、`--output-format stream-json`（仅 V2/V3）、`--agent-engine v1|v2|v3`。[@ref-kiro-headless-flags]

**会话内设置**：`/settings` 的改动持久化到 `~/.kiro/settings/cli.json`（主题存到 `kiro_cli_theme.json`），多数立即生效；`chat.showThinking` 是**仅启动时**读取，改后下一次会话生效；`/settings features` 的 Workflows 开关要重启 CLI 进程。[@ref-kiro-session-persist][@ref-kiro-session-settings]

**profile 的含义**：在 Kiro 里 "Kiro profile" 是企业侧概念——profile 的所在区域决定模型推理的数据地理（US 或 EU），Free Tier 与个人订阅一律由 US 服务；CLI 2.x 的旧 "profiles" 已迁移为 agents（`kiro-cli agent migrate`，文档注明该操作对既有 agents 可能具破坏性）。[@ref-kiro-models-regions][@ref-kiro-clicmd-agent]

**受管更新的优先级**（示例：策略值与环境变量的先后）：存在被强制（enforced）的 `update.baseUrl` 策略时，解析顺序为 策略值 → `KIRO_DESKTOP_RELEASE_URL` → 内置默认；否则为 环境变量 → 策略值 → 默认。[@ref-kiro-update-precedence]

## 信任与策略限制 {#config-trust}

- **工作区信任**：CLI 首次打开工作区时会提示信任；在不受信任的工作区里 agent 能力受限（无 shell、写入受限），直到显式信任。文档还把"工作区 agent 只在工作区被信任时加载"写进 agent 存储位置说明。[@ref-kiro-v3-trust][@ref-kiro-agents-locations]
- **权限文件放在仓库之外**：工作区级权限保存在 `~/.kiro/workspace-roots/` 下按工作区根哈希命名的目录，是每用户、仓库外的位置——克隆下来的仓库**无法**注入权限规则，信任只能由你本机配置。[@ref-kiro-permissions-scopes]
- **Kiro 作用域的硬编码不变量**（不可被配置更改）：写入 `~/.kiro/settings/`、`.kiro/settings/`、`~/.kiro/workspace-roots/` **始终 deny**（防止 agent 改自己的信任边界）；写入 `.git/**`、`.kiro/agents/**`、`.kiro/hooks/**`、`.kiroignore` **始终 ask**。[@ref-kiro-permissions-defaults]
- **企业管理员策略**：在 OS 保护的路径放置 `managed-settings.json`（macOS `/Library/Application Support/Kiro/`，Windows `C:\ProgramData\Kiro\`，Linux `/etc/kiro/`），管理员规则只能用 `deny` 或 `ask`，不能 `allow`；与用户规则冲突时更严格者胜。策略文件在 Kiro 启动时校验：JSON 非法或用 `allow` 会**整份拒绝并 fail closed**（所有工具调用被拒），未知 capability 跳过并告警，未知字段导致整份拒绝。[@ref-kiro-admin-policy][@ref-kiro-admin-validation]
- **MCP 治理**：registry 模式下不在名单中的 server 被隐藏、从不启动；组织禁用 MCP 时 `/mcp` 显示相应提示并在治理 API 不可达时 fail closed。[@ref-kiro-mcpregistry-hidden]

## 默认值与迁移 {#config-defaults}

**默认权限（未写 `permissions.yaml` 时）**：`fs_read` 对 `./**` 静默允许；常见只读 git 命令（`git status`、`git log`、`git diff` 等）与系统信息命令（`pwd`、`whoami`、`uname`）允许；实用工具类允许；其余一律提示审批。写 `permissions.yaml` 是**追加**到这些默认之上，而不是替换。[@ref-kiro-permissions-defaults]

**CLI 设置的默认值**来自设置参考页，例如 `toolSearch.enabled` 默认 `false`、`toolSearch.minPct` 默认 `5`、`toolSearch.minTokens` 默认 `50000`、`api.timeout` 默认 `3600` 秒、`api.streamIdleSoftTimeout` 默认 `60`、`api.streamIdleHardTimeout` 默认 `300`、`api.subagentTimeout` 默认 `3600`、`mcp.initTimeout` 默认 `5000`、`mcp.noInteractiveTimeout` 默认 `30000`、`chat.historyMode` 默认 `session`、`chat.showThinking` 默认 `true`、`app.disableAutoupdates` 默认不关闭自动更新。[@ref-kiro-settings-api][@ref-kiro-settings-toggle][@ref-kiro-settings-mcp][@ref-kiro-settings-chat]

**默认 agent / 模型解析**：无 `--agent` 的新 V3 运行取 `chat.defaultAgent`，再退回内置 default agent；无显式模型时取 `chat.defaultModel`，被选中 agent 自己声明的 `model` 可覆盖；被恢复的会话沿用创建时的 agent 与模型。[@ref-kiro-headless-agent]

**默认资源继承**：自定义 agent 默认继承 steering、skills、`AGENTS.md`（`chat.disableInheritingDefaultResources` 默认 `false`）；设为 `true` 后内置 agent 仍照常继承。[@ref-kiro-agentref-inherit]

**兼容与弃用**：

- CLI 2.x 的 `--trust-all-tools`/`--trust-tools` 与 `/tools` 命令在 3.0 仍可用作 **session 作用域的覆盖**，但官方推荐改用 `permissions.yaml`。[@ref-kiro-permissions-manage]
- agent 配置的 `toolsSettings` 在 V3 弃用，改用 `permissions.rules`；`/upgrade-agent` 可以把 `toolsSettings.shell.allowedCommands`/`deniedCommands`、`toolsSettings.write.allowedPaths`、`allowedTools` 条目、对象形式 hooks 等转换成新形式，并把原件备份为 `<文件名>.json.bak`。[@ref-kiro-agentref-upgrade]
- **格式迁移的破坏性**：CLI 3.0 的会话格式从 v2 变为 v3 且**不向后兼容**（升级前应备份 `~/.kiro/sessions/`）；hook 由 agent 内联改为独立文件；触发器名由 camelCase 改为 PascalCase；`agentSpawn` → `SessionStart` 等。V3 会话不能在 V2 恢复，切回 V2 时先前的 V3 会话不可用。[@ref-kiro-v3-breaking]
- 旧配置的加载兼容：`/upgrade-agent` 扫描 `.kiro/agents/` 与 `~/.kiro/agents/` 并只列出需要升级的项；旧 CLI 2.x profile 在 V3 的 `/agent` 选择器中仍可见可选。[@ref-kiro-agentref-upgrade]

## 诊断：查看实际生效来源 {#config-diagnostics}

- **会话内总览**：V3 本地或云会话中 `/config` 打开配置总览，覆盖 agents、MCP servers、Powers、Steering、Skills、Hooks；可用 `/config steering` 直接进入分类。当 Kiro 有来源信息时，**Source** 列标注 `local`、`cloud` 或 `local + cloud`；本地会话若没有任何来源信息则省略该列而不是猜测；云会话显示为 cloud 来源。`/config` 本身不上传或同步文件。[@ref-kiro-config-inspect]
- **CLI 设置查询**：`kiro-cli settings list`、`list --all`（带说明）、`settings KEY` 读单个值、`settings --delete KEY` 删除、`settings open` 用编辑器打开 `cli.json`；`--format json|json-pretty` 输出。[@ref-kiro-settings-access]
- **配置体检**：`kiro-cli doctor` 识别并修复常见问题；`kiro-cli diagnostic` 生成诊断报告（支持 JSON 与精简输出）。日志路径按平台不同（macOS `$TMPDIR/kiro-log/kiro-chat.log`，Linux `$XDG_RUNTIME_DIR/kiro-log/kiro-chat.log`，Windows `%TEMP%\kiro-log\logs\kiro-chat.log`），可用 `KIRO_CHAT_LOG_FILE` 覆盖。[@ref-kiro-cli-debug][@ref-kiro-clicmd-diagnostic][@ref-kiro-clicmd-doctor]
- **"改了但没生效"的常见原因**（都有来源）：
  - 只有 **agent 配置与 `mcp.json`** 由文件监视器热重载（在下一个空闲边界协调）；Steering/Skills 在**新会话**发现；`chat.showThinking` 与 `/settings features` 的 Workflows 需重启进程/新会话。[@ref-kiro-mcpfile-hotreload][@ref-kiro-session-persist][@ref-kiro-session-settings]
  - 工作区不受信任时 agent 能力被限制，写工具可能被硬编码规则或管理员策略拦截（`always ask`/`deny`），实际效果与文件内容不符。[@ref-kiro-permissions-defaults][@ref-kiro-v3-trust]
  - 管理员策略校验失败会 fail closed，表现为"所有工具被拒"。[@ref-kiro-admin-validation]
