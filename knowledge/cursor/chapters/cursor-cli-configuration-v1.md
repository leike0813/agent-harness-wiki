---
schema_version: 3
record_kind: production
edition_id: cursor-cli-configuration-v1
harness_id: cursor
topic: configuration
title: "Cursor CLI 的配置机制：来源、优先级、运行时覆盖、信任、默认值与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-locations
      - ref-cur-configuration-cli-config-required
      - ref-cur-configuration-permissions-location
      - ref-cur-configuration-runmodes-permissions-json-locations
      - ref-cur-configuration-runmodes-sandbox-json-locations
      - ref-cur-configuration-hooks-config-sources
      - ref-cur-configuration-worktrees-setup-path
  - section_id: config-sources
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-locations
      - ref-cur-configuration-cli-config-project-scope
      - ref-cur-configuration-permissions-location
      - ref-cur-configuration-permissions-config
      - ref-cur-configuration-params-mcp-scope
      - ref-cur-configuration-runmodes-permissions-json-locations
      - ref-cur-configuration-runmodes-sandbox-json-locations
      - ref-cur-configuration-hooks-config-paths
      - ref-cur-configuration-hooks-mdm-paths
      - ref-cur-configuration-hooks-config-sources
      - ref-cur-configuration-hooks-cloud-distribution
      - ref-cur-configuration-worktrees-setup-path
      - ref-cur-configuration-changelog-settings-json-plugins
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-project-scope
      - ref-cur-configuration-permissions-precedence
      - ref-cur-configuration-runmodes-permissions-json-merge
      - ref-cur-configuration-runmodes-sandbox-merge
      - ref-cur-configuration-runmodes-team-controls
      - ref-cur-configuration-ent-mcp-allowlist-precedence
      - ref-cur-configuration-ent-model-merge
      - ref-cur-configuration-hooks-config-merge
      - ref-cur-configuration-hooks-config-paths
      - ref-cur-configuration-changelog-permissions-json
      - ref-cur-configuration-worktrees-options
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-locations
      - ref-cur-configuration-cli-config-proxy-env
      - ref-cur-configuration-cli-config-http1
      - ref-cur-configuration-params-global-auth
      - ref-cur-configuration-params-global-model-mode
      - ref-cur-configuration-params-global-approval
      - ref-cur-configuration-params-sandbox-subcommands
      - ref-cur-configuration-params-sandbox-run-options
      - ref-cur-configuration-params-worker-options
      - ref-cur-configuration-runmodes-env-a
      - ref-cur-configuration-runmodes-env-b
      - ref-cur-configuration-terminal-colorfgbg
      - ref-cur-configuration-terminal-vim-settings
      - ref-cur-configuration-changelog-auto-accept-web-search
      - ref-cur-configuration-changelog-credential-store
  - section_id: config-trust
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-security-workspace-trust
      - ref-cur-configuration-security-config-approval
      - ref-cur-configuration-runmodes-team-controls
      - ref-cur-configuration-runmodes-protections
      - ref-cur-configuration-hooks-trust-project
      - ref-cur-configuration-hooks-cloud-distribution
      - ref-cur-configuration-ent-model-access
      - ref-cur-configuration-ent-byok
      - ref-cur-configuration-ent-mcp-allowlist
      - ref-cur-configuration-ent-git-blocklist
      - ref-cur-configuration-changelog-worktree-trust
      - ref-cur-configuration-changelog-headless-trust
      - ref-cur-configuration-changelog-trust-interactive
      - ref-cur-configuration-changelog-admin-denylist
      - ref-cur-configuration-changelog-disable-headless
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-required
      - ref-cur-configuration-cli-config-optional-core
      - ref-cur-configuration-cli-config-optional-ui
      - ref-cur-configuration-cli-config-optional-display
      - ref-cur-configuration-cli-config-optional-modes
      - ref-cur-configuration-runmodes-sandbox-defaults-a
      - ref-cur-configuration-runmodes-sandbox-defaults-b
      - ref-cur-configuration-runmodes-network-modes
      - ref-cur-configuration-runmodes-default-auto-review
      - ref-cur-configuration-runmodes-linux-platform
      - ref-cur-configuration-runmodes-apparmor-cli
      - ref-cur-configuration-worktrees-options
      - ref-cur-configuration-worktrees-cleanup
      - ref-cur-configuration-hooks-script-options-a
      - ref-cur-configuration-changelog-new-installs-auto
      - ref-cur-configuration-changelog-rewind-default
  - section_id: config-migration
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-notes
      - ref-cur-configuration-cli-config-required
      - ref-cur-configuration-cli-config-troubleshooting
      - ref-cur-configuration-hooks-global-options
      - ref-cur-configuration-changelog-claude-hooks-merged
      - ref-cur-configuration-changelog-mode-alignment
      - ref-cur-configuration-changelog-channel-switching
      - ref-cur-configuration-changelog-config-corruption-atomic
      - ref-cur-configuration-changelog-sandbox-policy-files
      - ref-cur-configuration-changelog-disable-auto-update
      - ref-cur-configuration-changelog-permissions-json
      - ref-cur-configuration-runmodes-deprecation-3-5
      - ref-cur-configuration-worktrees-discovery-flag
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cur-configuration-cli-config-troubleshooting
      - ref-cur-configuration-cli-config-notes
      - ref-cur-configuration-slash-config-command
      - ref-cur-configuration-params-status-format
      - ref-cur-configuration-params-sandbox-subcommands
      - ref-cur-configuration-params-sandbox-debug
      - ref-cur-configuration-params-worker-options
      - ref-cur-configuration-runmodes-env-c
      - ref-cur-configuration-runmodes-apparmor-cli
      - ref-cur-configuration-worktrees-debug
      - ref-cur-configuration-changelog-interactive-config
      - ref-cur-configuration-changelog-restricted-network
      - ref-cur-configuration-changelog-logs
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs:
          - ref-cur-configuration-cli-config-locations
          - ref-cur-configuration-cli-config-project-scope
          - ref-cur-configuration-permissions-location
          - ref-cur-configuration-permissions-config
          - ref-cur-configuration-params-mcp-scope
          - ref-cur-configuration-runmodes-permissions-json-locations
          - ref-cur-configuration-runmodes-sandbox-json-locations
          - ref-cur-configuration-hooks-config-paths
          - ref-cur-configuration-hooks-mdm-paths
          - ref-cur-configuration-hooks-config-sources
          - ref-cur-configuration-hooks-cloud-distribution
          - ref-cur-configuration-worktrees-setup-path
          - ref-cur-configuration-changelog-settings-json-plugins
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs:
          - ref-cur-configuration-cli-config-project-scope
          - ref-cur-configuration-permissions-precedence
          - ref-cur-configuration-runmodes-permissions-json-merge
          - ref-cur-configuration-runmodes-sandbox-merge
          - ref-cur-configuration-runmodes-team-controls
          - ref-cur-configuration-ent-mcp-allowlist-precedence
          - ref-cur-configuration-ent-model-merge
          - ref-cur-configuration-hooks-config-merge
          - ref-cur-configuration-hooks-config-paths
          - ref-cur-configuration-changelog-permissions-json
          - ref-cur-configuration-worktrees-options
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: answered
        source_refs:
          - ref-cur-configuration-cli-config-locations
          - ref-cur-configuration-cli-config-proxy-env
          - ref-cur-configuration-cli-config-http1
          - ref-cur-configuration-params-global-auth
          - ref-cur-configuration-params-global-model-mode
          - ref-cur-configuration-params-global-approval
          - ref-cur-configuration-params-sandbox-subcommands
          - ref-cur-configuration-params-sandbox-run-options
          - ref-cur-configuration-params-worker-options
          - ref-cur-configuration-runmodes-env-a
          - ref-cur-configuration-runmodes-env-b
          - ref-cur-configuration-terminal-colorfgbg
          - ref-cur-configuration-terminal-vim-settings
          - ref-cur-configuration-changelog-auto-accept-web-search
          - ref-cur-configuration-changelog-credential-store
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs:
          - ref-cur-configuration-security-workspace-trust
          - ref-cur-configuration-security-config-approval
          - ref-cur-configuration-runmodes-team-controls
          - ref-cur-configuration-runmodes-protections
          - ref-cur-configuration-hooks-trust-project
          - ref-cur-configuration-hooks-cloud-distribution
          - ref-cur-configuration-ent-model-access
          - ref-cur-configuration-ent-byok
          - ref-cur-configuration-ent-mcp-allowlist
          - ref-cur-configuration-ent-git-blocklist
          - ref-cur-configuration-changelog-worktree-trust
          - ref-cur-configuration-changelog-headless-trust
          - ref-cur-configuration-changelog-trust-interactive
          - ref-cur-configuration-changelog-admin-denylist
          - ref-cur-configuration-changelog-disable-headless
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: partial
        source_refs:
          - ref-cur-configuration-cli-config-required
          - ref-cur-configuration-cli-config-optional-core
          - ref-cur-configuration-cli-config-optional-ui
          - ref-cur-configuration-cli-config-optional-display
          - ref-cur-configuration-cli-config-optional-modes
          - ref-cur-configuration-runmodes-sandbox-defaults-a
          - ref-cur-configuration-runmodes-sandbox-defaults-b
          - ref-cur-configuration-runmodes-network-modes
          - ref-cur-configuration-runmodes-default-auto-review
          - ref-cur-configuration-runmodes-linux-platform
          - ref-cur-configuration-runmodes-apparmor-cli
          - ref-cur-configuration-worktrees-options
          - ref-cur-configuration-worktrees-cleanup
          - ref-cur-configuration-hooks-script-options-a
          - ref-cur-configuration-changelog-new-installs-auto
          - ref-cur-configuration-changelog-rewind-default
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: partial
        source_refs:
          - ref-cur-configuration-cli-config-notes
          - ref-cur-configuration-cli-config-required
          - ref-cur-configuration-cli-config-troubleshooting
          - ref-cur-configuration-hooks-global-options
          - ref-cur-configuration-changelog-claude-hooks-merged
          - ref-cur-configuration-changelog-mode-alignment
          - ref-cur-configuration-changelog-channel-switching
          - ref-cur-configuration-changelog-config-corruption-atomic
          - ref-cur-configuration-changelog-sandbox-policy-files
          - ref-cur-configuration-changelog-disable-auto-update
          - ref-cur-configuration-changelog-permissions-json
          - ref-cur-configuration-runmodes-deprecation-3-5
          - ref-cur-configuration-worktrees-discovery-flag
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs:
          - ref-cur-configuration-cli-config-troubleshooting
          - ref-cur-configuration-cli-config-notes
          - ref-cur-configuration-slash-config-command
          - ref-cur-configuration-params-status-format
          - ref-cur-configuration-params-sandbox-subcommands
          - ref-cur-configuration-params-sandbox-debug
          - ref-cur-configuration-params-worker-options
          - ref-cur-configuration-runmodes-env-c
          - ref-cur-configuration-runmodes-apparmor-cli
          - ref-cur-configuration-worktrees-debug
          - ref-cur-configuration-changelog-interactive-config
          - ref-cur-configuration-changelog-restricted-network
          - ref-cur-configuration-changelog-logs
---

## 固定来源与共页边界 {#config-scope}

本章的固定来源是 Cursor 官方文档站在 2026-09-30 抓取的已登记页面快照：CLI 参考页 `cli/reference/configuration.md`、`cli/reference/parameters.md`、`cli/reference/permissions.md`、`cli/reference/terminal-setup.md`、`cli/reference/slash-commands.md`，机制页 `agent/security/run-modes.md`、`agent/security.md`、`hooks.md`，企业与组织页 `enterprise/model-and-integration-management.md`，以及 `configuration/worktrees.md`、`cli/changelog.md`。本章只给 `cli` 界面（Cursor CLI）的答案；产品同时登记的 `cursor` 界面（Cursor IDE）本轮不在此展开。

CLI 的主配置文件是 `cli-config.json`。配置页给出全局与项目两级位置，并注明**项目级只能写权限**，其余设置必须在全局文件里改 [@ref-cur-configuration-cli-config-locations][@ref-cur-configuration-cli-config-required]。权限页把权限对象同时绑定到全局 `cli-config.json` 和项目级 `{project}/.cursor/cli.json` [@ref-cur-configuration-permissions-location]。

除主配置文件外，还有若干旁路文件各管一段：Auto-review 的 `permissions.json`、沙箱的 `sandbox.json`、hooks 的 `hooks.json`，它们的作用域与合并规则**不在** `cli-config.json` 里，而是分别由 Run Modes 页、hooks 页记录 [@ref-cur-configuration-runmodes-permissions-json-locations][@ref-cur-configuration-runmodes-sandbox-json-locations][@ref-cur-configuration-hooks-config-sources]。工作区里另有 worktree setup 用的 `.cursor/worktrees.json` [@ref-cur-configuration-worktrees-setup-path]。

共页边界需要留意两处：`hooks.md` 与 `agent/security/run-modes.md` 是跨形态页面（IDE、云 Agent、CLI 混排），本章只在文字明确覆盖 CLI 时把结论算作 CLI 行为，否则在正文里标注该入口属于哪一侧；`configuration/worktrees.md` 的 UI 入口属于 Agents Window 与 IDE，本章只取其被 CLI 明确复用的部分（`.cursor/worktrees.json`、清理设置）。登记来源里没有官方 npm 包版本对应关系，整章按来源级知识阅读。

## 配置从哪些入口读取 {#config-sources}

CLI 自己读写的配置文件（`cli-config.json`）位置固定，平台差异只有 Windows 的 home 写法 [@ref-cur-configuration-cli-config-locations]：

| 作用域 | 平台 | 路径 |
| :-- | :-- | :-- |
| 全局 | macOS / Linux | `~/.cursor/cli-config.json` |
| 全局 | Windows | `$env:USERPROFILE\.cursor\cli-config.json` |
| 项目 | 全部 | `{project}/.cursor/cli.json`（只允许 `permissions`） |

路径还受两个环境变量影响：`CURSOR_CONFIG_DIR` 指向自定义配置目录；Linux/BSD 上设置 `XDG_CONFIG_HOME` 时改用 `$XDG_CONFIG_HOME/cursor/cli-config.json` [@ref-cur-configuration-cli-config-locations]。项目级文件只接受权限对象，全局文件承载其余键 [@ref-cur-configuration-cli-config-project-scope]。权限对象本身可以同时写在全局和项目文件里 [@ref-cur-configuration-permissions-config][@ref-cur-configuration-permissions-location]。

旁路文件按各自主题落在不同位置：

| 文件 | 位置 | 作用 |
| :-- | :-- | :-- |
| `permissions.json` | `~/.cursor/permissions.json`、`{project}/.cursor/permissions.json` | Auto-review 的 allow / block 自然语言指令 [@ref-cur-configuration-runmodes-permissions-json-locations] |
| `sandbox.json` | `~/.cursor/sandbox.json`、`{project}/.cursor/sandbox.json` | 沙箱的网络策略、额外可读可写路径、临时目录与共享构建缓存 [@ref-cur-configuration-runmodes-sandbox-json-locations] |
| `hooks.json` | 企业 `/Library/Application Support/Cursor/hooks.json`（macOS）、`/etc/cursor/hooks.json`（Linux/WSL）、`C:\ProgramData\Cursor\hooks.json`（Windows）；团队（云端下发）；`{project}/.cursor/hooks.json`；`~/.cursor/hooks.json` | Hook 脚本注册 [@ref-cur-configuration-hooks-config-paths][@ref-cur-configuration-hooks-mdm-paths] |
| `.cursor/worktrees.json` | 先查 worktree 路径，再查项目根 | worktree setup 命令或脚本 [@ref-cur-configuration-worktrees-setup-path] |
| `mcp.json` | `.cursor/mcp.json`、`~/.cursor/mcp.json` | MCP server 由 `agent mcp` 子命令读取和管理 [@ref-cur-configuration-params-mcp-scope] |

组织侧入口不在文件系统里：企业/团队策略在 Web 仪表盘配置后下发到客户端；hooks 的团队与企业两级既可由云分发同步，也可由 MDM 直接把 `hooks.json` 与脚本放进上面的系统目录，用户级分发则写 `~/.cursor/hooks.json` 与 `~/.cursor/hooks/` [@ref-cur-configuration-hooks-cloud-distribution][@ref-cur-configuration-hooks-mdm-paths]。

云 Agent 的配置读取范围更窄：云虚拟机读项目 `hooks.json`、团队与企业托管 hooks，**不读**用户 home 下的 `~/.cursor/hooks.json` [@ref-cur-configuration-hooks-config-sources]。

另外还有一处只在 CHANGELOG 出现、文档正文未收录的配置入口：`~/.cursor/settings.json` 的 `enabled_plugins` 键可指向本地插件目录，无需市场 [@ref-cur-configuration-changelog-settings-json-plugins]。

**缺口**：配置页没有写 `CURSOR_CONFIG_DIR` 与 `XDG_CONFIG_HOME` 同时设置时谁优先，也没有写 `CURSOR_CONFIG_DIR` 是替换 `~/.cursor` 整体还是只替换配置文件所在目录；`~/.cursor/settings.json` 只有 CHANGELOG 一条记录，没有正式字段表；CLI 是否复用 IDE 的 user `settings.json`（`security.workspace.trust.enabled` 就写在那里）没有说明。以上已检查 `cli/reference/configuration.md`、`cli/reference/permissions.md`、`agent/security/run-modes.md`、`hooks.md` 与 `cli/changelog.md`。

## 作用域优先级与合并规则 {#config-overrides}

Cursor CLI 的配置不是"单文件覆盖"，而是**按文件类型各有一套规则**，读者需要逐个文件确认。

**主配置文件里，全局与项目不是同一套键**：项目级 `{project}/.cursor/cli.json` 只能承载 `permissions`，其他 CLI 设置"必须在全局设置" [@ref-cur-configuration-cli-config-project-scope]。登记来源没有写全局 `cli-config.json` 与项目 `cli.json` 的权限对象是合并还是项目覆盖，这属于缺口（见本节末）。

**权限对象内部**：`deny` 优先于 `allow`；glob 支持 `**`、`*`、`?`；相对路径以当前工作区为根，绝对路径可指向项目之外 [@ref-cur-configuration-permissions-precedence]。

**`permissions.json`（Auto-review 指令）**：用户级与项目级两份**都被读取并合并**，个人指令与项目指令同时生效；一旦团队在仪表盘定义了全局 Auto-review 配置，**团队配置优先，两份本地文件被忽略** [@ref-cur-configuration-runmodes-permissions-json-merge]。

**`sandbox.json`**：两份也合并，但**项目级优先**；团队管理员策略与 Cursor 内置的硬性安全规则再叠在上面，本地文件无法削弱这些保护 [@ref-cur-configuration-runmodes-sandbox-merge]。

**团队与个人/项目**：Run Modes 页明确"团队设置优先于个人与项目配置"，管理员可以决定成员可用的模式并配置沙箱网络规则 [@ref-cur-configuration-runmodes-team-controls]。

**MCP 工具 allowlist** 有一个显式顺序：团队仪表盘/管理员设置 → `~/.cursor/permissions.json` → 编辑器设置与内联 "Add to allowlist"；并且特别说明**高优先级来源是替换而非合并**，allowlist 生效时只有命中条目的 server 能以允许的粒度运行 [@ref-cur-configuration-ent-mcp-allowlist-precedence]。

**模型访问**走另一套方向：团队基线与 Organization Group 用**最宽松（并集）**方式合并——某个模型只要有团队或任一组织组允许就可使用，组只能放宽不能收紧 [@ref-cur-configuration-ent-model-merge]。这与权限、allowlist 的"高优先级替换"方向相反，配置时不要混用直觉。

**hooks.json**：所有来源的匹配 hook **都会运行**，响应按 `deny` > `ask` > `allow` 合并（与来源无关），`user_message` / `agent_message` 拼接，其他字段的合并优先级从高到低为 Enterprise → Team → Project → User；对 `followup_message` 这类字段，低优先级来源覆盖高优先级来源；工作目录也随来源变化（项目 hook 从项目根运行，用户 hook 从 `~/.cursor/` 运行） [@ref-cur-configuration-hooks-config-merge][@ref-cur-configuration-hooks-config-paths]。

**`.cursor/worktrees.json`**：文件按 worktree 路径、项目根的顺序查找；`setup-worktree-unix` / `setup-worktree-windows` 分别优先于通用 `setup-worktree` [@ref-cur-configuration-worktrees-options]。

**CLI 与 IDE 共用一份常驻契约**：CLI 读的 `permissions.json` 与 IDE 是同一个终端/MCP allowlist 文件 [@ref-cur-configuration-changelog-permissions-json]。

**缺口**：全局 `cli-config.json` 与项目 `cli.json` 的权限对象如何合并（覆盖还是并集）、去掉某个权限条目需要"空值还是删除键"、以及数组类键（`allow` / `deny`）替换还是追加，登记来源都没有说明；已检查配置页、权限页与 Run Modes 页。

## 运行时覆盖：环境变量、CLI 参数与斜杠命令 {#config-runtime}

文件配置之外有三级运行时入口：CLI 参数、环境变量、会话内斜杠命令。

**CLI 参数**（全局选项表节选；完整清单见 `cli/reference/parameters.md`）：

| 参数 | 作用 |
| :-- | :-- |
| `--api-key {key}` | 认证密钥，等价于 `CURSOR_API_KEY` 环境变量 [@ref-cur-configuration-params-global-auth] |
| `--model {model}` / `--mode {mode}` / `--plan` | 单次运行的模型与模式（`plan` / `ask`，缺省即 agent） [@ref-cur-configuration-params-global-model-mode] |
| `-f, --force`（别名 `--yolo`） | 除非显式 deny 否则放行命令 |
| `--sandbox {mode}` | 沙箱开关（`enabled` / `disabled`） |
| `--approve-mcps` | 自动批准全部 MCP server |
| `--trust` | 免交互信任工作区（参数页注为 headless 专用，CHANGELOG 已扩展为交互式也生效，见信任小节） [@ref-cur-configuration-params-global-approval] |

沙箱还有一组子命令：`agent sandbox enable | disable | reset | run`，其中 `run` 接受 `--allow-paths`、`--readonly-paths`、`--blocked-patterns`、`--network`、`--sb-debug` [@ref-cur-configuration-params-sandbox-subcommands][@ref-cur-configuration-params-sandbox-run-options]。自托管 worker 的参数（`--worker-dir`、`--label`、`--labels-file`、`--idle-release-timeout`、`--pool` 等）只能由命令行给出，其中 labels 文件也可用 `CURSOR_WORKER_LABELS_FILE` 指定 [@ref-cur-configuration-params-worker-options]。

**环境变量**：

| 变量 | 作用 |
| :-- | :-- |
| `CURSOR_CONFIG_DIR` / `XDG_CONFIG_HOME` | 改写 `cli-config.json` 位置 [@ref-cur-configuration-cli-config-locations] |
| `CURSOR_API_KEY` | 等同 `--api-key` [@ref-cur-configuration-params-global-auth] |
| `HTTP_PROXY` / `HTTPS_PROXY` / `NODE_USE_ENV_PROXY` / `NODE_EXTRA_CA_CERTS` | 代理与自签 CA；`NODE_USE_ENV_PROXY=1` 让 Node 走代理 [@ref-cur-configuration-cli-config-proxy-env] |
| `COLORFGBG` | 强制深浅主题，例如 `15;0` / `0;15` [@ref-cur-configuration-terminal-colorfgbg] |
| `AGENT_CLI_CREDENTIAL_STORE=file` | 无 macOS Keychain 的环境下把凭据存到 owner-only 文件 [@ref-cur-configuration-changelog-credential-store] |
| `CURSOR_SANDBOX`、`CURSOR_ORIG_UID`、`CURSOR_ORIG_GID` | 沙箱注入给子进程：标记沙箱类型（`seatbelt` / `native`），并给出沙箱改写身份前的真实 UID/GID [@ref-cur-configuration-runmodes-env-a][@ref-cur-configuration-runmodes-env-b] |

代理场景还有一个"文件 + 环境变量"配合的开关：企业代理不支持 HTTP/2 双向流时，在 `cli-config.json` 写 `network.useHttp1ForAgent: true` 切到 HTTP/1.1 + SSE [@ref-cur-configuration-cli-config-http1]。

**会话内斜杠命令**同样能改状态并持久化：`/vim` 在会话内切换 Vim 模式并把偏好保存回 `~/.cursor/cli-config.json`（同一键也可直接写文件） [@ref-cur-configuration-terminal-vim-settings]；`/config` 提供交互式设置界面；`/sandbox` 配置沙箱与网络；`/auto-review` 打开 Auto-review 模式。CHANGELOG 另记录一个只在该页出现的键：`autoAcceptWebSearch` 可在 `cli-config.json` 打开自动接受网页搜索（默认关），效果覆盖交互、headless、子代理与 ACP 运行 [@ref-cur-configuration-changelog-auto-accept-web-search]。

**缺口**：登记来源没有 profile（配置文件片段/命名配置集）机制，`/config`、`/save-workspace` 之类的会话内入口不是磁盘上的 profile 文件；`--auto-review` 只出现在 CHANGELOG，参数页的全局选项表里没有登记；`CURSOR_CONFIG_DIR` 与 `XDG_CONFIG_HOME` 的优先关系未知（见来源小节）。已检查 `cli/reference/parameters.md`、`cli/reference/configuration.md`、`agent/security/run-modes.md`、`cli/reference/terminal-setup.md` 与 `cli/changelog.md`。

## 信任、组织策略与权限边界 {#config-trust}

**工作区信任默认关闭**。Cursor 支持 workspace trust，但默认不启用；启用后新工作区会询问进入普通模式还是受限模式，受限模式会破坏 AI 功能，官方对不可信仓库的建议是改用普通文本编辑器。启用方式是在用户 `settings.json` 里写 `"security.workspace.trust.enabled": true`，组织可以通过 MDM 强制该设置 [@ref-cur-configuration-security-workspace-trust]。这条配置项本身是 IDE 侧入口（写 user settings.json），CLI 侧的等价控制是 `--trust`：非交互运行在未信任工作区会直接失败并给出指引，除非传入 `--trust`（或 `--force`） [@ref-cur-configuration-changelog-headless-trust]；CHANGELOG 又记录 `--trust` 现在在交互式会话也生效，会"记录与信任对话框接受时相同的已保存信任决策" [@ref-cur-configuration-changelog-trust-interactive]。

信任状态直接决定两件事能否执行：项目 `hooks.json` 只在受信任工作区运行 [@ref-cur-configuration-hooks-trust-project]；`.cursor/worktrees.json` 的 setup 命令也只在工作区受信任后才跑，未信任时跳过并给出提示 [@ref-cur-configuration-changelog-worktree-trust]。

**默认审批边界**：默认情况下终端命令需要批准；Agent 可以不经批准修改工作区文件，但**配置文件（如工作区设置）除外** [@ref-cur-configuration-security-config-approval]。Run Modes 与沙箱之外还有独立保护项——Browser Protection、File-Deletion Protection、External-File Protection——即使模式会自动运行，这些动作仍可能需要批准 [@ref-cur-configuration-runmodes-protections]。

**组织/团队策略**限制本地配置能做什么：

| 策略 | 位置 | 效果 |
| :-- | :-- | :-- |
| Run Modes 可用性与沙箱网络 | 团队仪表盘 | 覆盖个人与项目配置 [@ref-cur-configuration-runmodes-team-controls] |
| 模型访问控制 | 团队仪表盘 / Organization Group / Admin API | 决定可用模型；挡住 Auto-review 需要的分类器模型会让该模式不可用 [@ref-cur-configuration-ent-model-access] |
| 个人 API key（BYOK）限制 | 团队仪表盘 | 禁止成员使用自有第三方 key，全部走 Cursor 池 [@ref-cur-configuration-ent-byok] |
| MCP server allowlist | 团队仪表盘 / `~/.cursor/permissions.json`（MDM 下发） | allowlist 生效时只有命中条目允许运行 [@ref-cur-configuration-ent-mcp-allowlist] |
| 仓库 blocklist | 团队仪表盘 | Cursor 拒绝索引或使用被挡仓库 [@ref-cur-configuration-ent-git-blocklist] |
| 命令 denylist、MDM 登录策略、禁用 headless | 管理员/CHANGELOG | 本地 shell 执行被管理员 denylist 拦截并每次请求刷新；登录强制组织/团队/邮箱/域名 allowlist；团队设置可整体禁用非交互用法 [@ref-cur-configuration-changelog-admin-denylist][@ref-cur-configuration-changelog-disable-headless] |

团队策略还可以经云分发下发 hooks（每三十分钟同步，可按操作系统定向） [@ref-cur-configuration-hooks-cloud-distribution]。

**缺口**：登记来源没有写 CLI 把"已信任工作区"记录在哪个文件（`--trust` 说明只是"记录同样的信任决策"），也没有说明信任是否会阻止读取 `.cursor/cli.json`——文档只把信任与 hooks、worktree setup 的执行绑定；MDM 强制 `security.workspace.trust.enabled` 的具体策略键名也未给出。

## 默认值、功能开关与平台差异 {#config-defaults}

**`cli-config.json` 的必填字段与已知默认** [@ref-cur-configuration-cli-config-required]：

| 字段 | 类型 | 默认/取值 |
| :-- | :-- | :-- |
| `version` | number | 当前 `1`（schema 版本，必填） |
| `editor.vimMode` | boolean | `false` |
| `permissions.allow` / `permissions.deny` | string[] | 无（必填字段，示例中给空数组） |

**可选字段按官方表逐项列出**（默认值只在文档写明时给出）：

| 字段 | 类型 | 文档写明的默认 |
| :-- | :-- | :-- |
| `channel` | string | 未写；发布通道选择 [@ref-cur-configuration-cli-config-optional-core] |
| `model`、`maxMode`、`hasChangedDefaultModel` | object / boolean | 未写；模型选择与 CLI 托管的模型覆盖标记 [@ref-cur-configuration-cli-config-optional-core] |
| `notifications`、`hints`、`rewind`、`suggestNextPrompt` | boolean | 未写；终止通知、提示、`/rewind`、每轮结束的后续提示 [@ref-cur-configuration-cli-config-optional-ui] |
| `display.showLineNumbers`、`display.showThinkingBlocks`、`display.showStatusIndicators`、`display.showStatusLineRunningTime` | boolean | 未写；渲染与状态行开关 [@ref-cur-configuration-cli-config-optional-display] |
| `approvalMode` | string | 未写；取值 `allowlist`、`auto-review`、`unrestricted` [@ref-cur-configuration-cli-config-optional-modes] |
| `sandbox.mode`、`sandbox.networkAccess` | string | 未写；沙箱模式与网络访问覆盖 [@ref-cur-configuration-cli-config-optional-modes] |
| `network.useHttp1ForAgent` | boolean | `false` [@ref-cur-configuration-cli-config-optional-modes] |
| `attribution.attributeCommitsToAgent`、`attribution.attributePRsToAgent` | boolean | 均为 `true` [@ref-cur-configuration-cli-config-optional-modes] |

**沙箱默认行为**（终端命令）：工作区内可读写（`.cursorignore` 可对 Agent 隐藏文件）；`.git/config`、`.git/hooks`、`.vscode`、`.cursorignore` 与敏感 Cursor 配置文件属于受保护路径；网络默认阻断；`/tmp` 与平台临时目录默认可写 [@ref-cur-configuration-runmodes-sandbox-defaults-a][@ref-cur-configuration-runmodes-sandbox-defaults-b]。网络打开后的默认模式是 **"sandbox.json + Defaults"**：用户 allowlist 加上 Cursor 内置的包管理与语言工具域名；另有 "sandbox.json Only" 与 "Allow All" 两种可选模式 [@ref-cur-configuration-runmodes-network-modes]。

**模式默认**：Auto-review 自 3.6 起是推荐默认（允许清单直接跑、可沙箱的 shell 进沙箱、其余交分类器） [@ref-cur-configuration-runmodes-default-auto-review]。

**平台差异**：

- macOS 用 Seatbelt（`sandbox-exec`），要求 Cursor v2.0 或更高，无需额外安装。
- Linux 用 Landlock + seccomp，要求内核 6.2 以上且启用 Landlock v3（`CONFIG_SECURITY_LANDLOCK=y`）与无特权 user namespaces；不满足时回退为"运行前询问批准" [@ref-cur-configuration-runmodes-linux-platform]。
- 远端环境与独立 CLI 不自带 AppArmor profile，若因 user namespace 权限失败需要安装发行版对应的 `cursor-sandbox-apparmor` 包，安装后重启 Cursor 或 CLI 会话 [@ref-cur-configuration-runmodes-apparmor-cli]。

**其它默认**：worktree setup 的键允许命令数组或脚本路径，未写的键不执行 [@ref-cur-configuration-worktrees-options]；worktree 清理按机器上限自动进行，`cursor.worktreeCleanupIntervalHours` / `cursor.worktreeMaxCount` 可调，默认上限 25 个 [@ref-cur-configuration-worktrees-cleanup]；hooks 脚本的 `type` 默认 `"command"`，`command` 必填，超时按平台默认 [@ref-cur-configuration-hooks-script-options-a]。CLI 侧的模型默认也在变：新装默认 Auto 路由 [@ref-cur-configuration-changelog-new-installs-auto]；`/rewind` 已改为默认开启 [@ref-cur-configuration-changelog-rewind-default]。

**缺口**：可选字段中相当一部分只有名字没有默认值（`channel`、`notifications`、`hints`、`rewind`、`suggestNextPrompt`、`display.*`、`sandbox.*`），`/rewind`、`autoAcceptWebSearch` 之类开关的默认值只能从 CHANGELOG 单点推断，配置页没有集中列出；`sandbox.json` 的完整 schema 由另一页（`reference/sandbox.md`）承载，本轮未登记该页。

## 版本、迁移与弃用 {#config-migration}

**schema 版本**：`cli-config.json` 的 `version` 就是配置 schema 版本，当前值为 `1`，属于必填字段 [@ref-cur-configuration-cli-config-required]。`hooks.json` 也有一个 `version`，官方要求是正整数并"使用 `1`" [@ref-cur-configuration-hooks-global-options]。

**自动修复与损坏处理**：CLI 会对缺失字段做 self-repair；损坏的文件会被备份为 `.bad` 并重建；文件是纯 JSON（不支持注释）；权限条目是比较用的精确字符串 [@ref-cur-configuration-cli-config-notes]。排查时官方的做法就是把文件移走再重启：

```bash
mv ~/.cursor/cli-config.json ~/.cursor/cli-config.json.bad
```

同时提醒"改动不持久"通常意味着 JSON 不合法、缺少写权限，或该字段由 CLI 托管、会被覆盖 [@ref-cur-configuration-cli-config-troubleshooting]。并发写曾经会互相穿插导致配置损坏与启动阻塞，现在每次写入先落到各自的临时文件再原子改名 [@ref-cur-configuration-changelog-config-corruption-atomic]。

**弃用与改名**（按登记页与 CHANGELOG）：

| 旧形态 | 现状 | 来源 |
| :-- | :-- | :-- |
| Ask Every Time 模式 | 3.5 起弃用，新用户不可选；等价做法是"空 allowlist 的 Allowlist" | [@ref-cur-configuration-runmodes-deprecation-3-5] |
| Run in Sandbox | 并入"启用沙箱的 Allowlist" | [@ref-cur-configuration-runmodes-deprecation-3-5] |
| Auto-run | 统一改名为 Run Everything；斜杠命令为 `/run-everything`，`/auto-run` 保留为别名 | [@ref-cur-configuration-changelog-mode-alignment] |
| PowerShell 更新输出 | Windows 原生更新不再绘制 PowerShell 进度条 | [@ref-cur-configuration-changelog-mode-alignment] |

**对外兼容与导入**：

- CLI 读 IDE 同一份终端/MCP allowlist（`permissions.json`） [@ref-cur-configuration-changelog-permissions-json]。
- Claude Code 格式的 `settings.json` hooks 会被读取并与 Cursor 的 hooks 合并，团队托管 hooks 的优先级是 enterprise > team > project > user [@ref-cur-configuration-changelog-claude-hooks-merged]。
- 沙箱策略文件 `~/.cursor/sandbox.json` 与 `.cursor/sandbox.json` 在 CLI（含 SSH 场景）被正式承认；沙箱开启但不可用时 CLI 快速失败并给出原因 [@ref-cur-configuration-changelog-sandbox-policy-files]。
- 发布通道可以切换，切换会在第一次尝试就生效并立即拉取目标通道的构建 [@ref-cur-configuration-changelog-channel-switching]；后台自动更新可用 `--disable-auto-update` 关掉 [@ref-cur-configuration-changelog-disable-auto-update]。
- worktree 发现不再依赖旧的 `worktree.discoveryComplete` 标记，改为对机器 worktree 根与各工作区子目录保存修改时间检查点 [@ref-cur-configuration-worktrees-discovery-flag]。

**缺口**：登记来源没有提供键名迁移表，也没有写 `version` 从旧值升到 `1` 时的兼容行为（只声明"current: 1"与 self-repair）；旧配置文件是否支持自动改写、以及被 CLI 托管的字段集合清单都未列出。已检查配置页（Schema / Notes / Troubleshooting）、hooks 页与 CHANGELOG 的相关条目。

## 诊断：查看生效来源、重载与排查 {#config-diagnostics}

**"文件写了但没生效"的首查入口**是配置页的排查小节：把 `~/.cursor/cli-config.json` 移走再重启，让 CLI 重建；若改动不持久，检查 JSON 是否合法、文件是否可写，以及该字段是否由 CLI 托管会被覆盖 [@ref-cur-configuration-cli-config-troubleshooting]。文件是纯 JSON（不支持注释），损坏文件按 `.bad` 备份 [@ref-cur-configuration-cli-config-notes]。**登记来源没有提供"打印当前生效配置及其来源"的命令**，也没有配置热重载说明，这是本节最大的缺口。

可用的观察入口：

| 入口 | 能确认什么 | 来源 |
| :-- | :-- | :-- |
| `/config` | 交互式设置编辑器（含版本与账户页），替代手改 JSON | [@ref-cur-configuration-slash-config-command][@ref-cur-configuration-changelog-interactive-config] |
| `/logs` | 每个会话都会写调试日志，该命令显示路径并复制到剪贴板；多用户主机按用户分目录写 | [@ref-cur-configuration-changelog-logs] |
| `agent status` / `agent about` 加 `--format json` | 认证状态、版本、系统与账户信息，结构化输出便于脚本判断 | [@ref-cur-configuration-params-status-format] |
| `agent sandbox enable/disable/reset`（子命令） | 沙箱模式的当前开关与重置 | [@ref-cur-configuration-params-sandbox-subcommands] |
| `agent sandbox run --sb-debug` | 把沙箱调试日志写到临时目录并打印路径 | [@ref-cur-configuration-params-sandbox-debug] |
| `CURSOR_SANDBOX_LANDLOCK_STATUS` | 沙箱实际后端：`fully_enforced`（Landlock）或 `bubblewrap`（回退） | [@ref-cur-configuration-runmodes-env-c] |
| `agent worker debug --json` | 自托管 worker 的认证、隐私与路由预检报告 | [@ref-cur-configuration-params-worker-options] |
| 编辑器 Output 面板的 `Worktrees Setup` | worktree setup 的执行日志——**这是 IDE 侧入口**，登记来源没有给 CLI 的等价输出通道 | [@ref-cur-configuration-worktrees-debug] |

沙箱创建失败时也有明确信号：`AppArmor` 缺失导致的 user-namespace 权限错误需要安装对应发行版的 `cursor-sandbox-apparmor` 包并重启会话 [@ref-cur-configuration-runmodes-apparmor-cli]。团队配置服务不可达时（例如企业防火墙挡住配置服务），CLI 会退回特性默认值而不是启动失败 [@ref-cur-configuration-changelog-restricted-network]。

**缺口**：没有"列出每个键的实际取值与来源文件"的命令；配置改动何时需要重启会话、何时即时生效，只有零散 CHANGELOG 条目（例如插件重载会刷新其 hooks 与斜杠命令、模型目录每 10 分钟后台刷新），配置页未写明统一规则；worktree setup 的调试视图只有 IDE 入口。已检查 `cli/reference/configuration.md`（Troubleshooting / Notes）、`cli/reference/slash-commands.md`、`cli/reference/parameters.md`、`agent/security/run-modes.md`、`configuration/worktrees.md` 与 `cli/changelog.md`。
