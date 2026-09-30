---
schema_version: 3
record_kind: production
edition_id: auggie-cli-configuration-v1
harness_id: auggie
topic: configuration
title: "Auggie CLI 的设置层级、合并优先级与诊断"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-reference-config, ref-auggie-repo-changelog, ref-auggie-docs-workspace-context, ref-auggie-docs-config-example, ref-auggie-docs-rules-supported, ref-auggie-docs-rules-flag]
  - section_id: config-overrides
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-perms-types, ref-auggie-docs-perms-files, ref-auggie-docs-perms-legacy, ref-auggie-repo-changelog, ref-auggie-docs-perms-basic]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-reference-tools, ref-auggie-docs-reference-config, ref-auggie-docs-reference-mcp, ref-auggie-docs-reference-env, ref-auggie-docs-config-options]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-hooks-locations, ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-perms-enforced, ref-auggie-docs-plugins-settings]
  - section_id: config-defaults
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-options, ref-auggie-docs-config-example, ref-auggie-docs-plugins-settings, ref-auggie-docs-hooks-scripts, ref-auggie-docs-config-hierarchy, ref-auggie-docs-autoupgrade-how]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-config-wizard, ref-auggie-docs-config-options, ref-auggie-docs-interactive-common, ref-auggie-docs-interactive-additional, ref-auggie-docs-reference-rules, ref-auggie-docs-reference-tools, ref-auggie-docs-reference-mcp, ref-auggie-docs-reference-models, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-docs-config-hierarchy, ref-auggie-docs-config-manual]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-workspace-context, ref-auggie-docs-reference-config]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: answered
        source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-perms-types, ref-auggie-docs-perms-files, ref-auggie-docs-perms-legacy, ref-auggie-repo-changelog]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-auggie-docs-reference-tools, ref-auggie-docs-reference-config, ref-auggie-docs-reference-mcp, ref-auggie-docs-reference-env, ref-auggie-docs-config-options]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: partial
        source_refs: [ref-auggie-docs-config-hierarchy, ref-auggie-docs-hooks-locations, ref-auggie-docs-plugins-autoupdate, ref-auggie-docs-perms-enforced, ref-auggie-docs-plugins-settings]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults
        status: answered
        source_refs: [ref-auggie-docs-config-options, ref-auggie-docs-config-example, ref-auggie-docs-plugins-settings, ref-auggie-docs-hooks-scripts, ref-auggie-docs-config-hierarchy, ref-auggie-docs-autoupgrade-how]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-overrides
        status: partial
        source_refs: [ref-auggie-docs-perms-legacy, ref-auggie-repo-changelog, ref-auggie-docs-perms-basic]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-auggie-docs-config-wizard, ref-auggie-docs-config-options, ref-auggie-docs-interactive-common, ref-auggie-docs-interactive-additional, ref-auggie-docs-reference-rules, ref-auggie-docs-reference-tools, ref-auggie-docs-reference-mcp, ref-auggie-docs-reference-models, ref-auggie-docs-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-docs-config-hierarchy, ref-auggie-docs-config-manual]
---

## 配置来源与路径 {#config-sources}

固定来源是官方文档站 “Configuration Wizard” 页、CLI 参考页、Workspace context 页与 Automatic Updates 页，以及官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff`。[@ref-auggie-docs-config-hierarchy][@ref-auggie-docs-reference-config][@ref-auggie-repo-changelog]

Auggie 的设置文件分五层，文档给出的优先级从高到低：[@ref-auggie-docs-config-hierarchy]

| 层 | 路径 | 说明 |
| :-- | :-- | :-- |
| 受管设置（只读） | `/etc/augment/settings.json`（macOS／Linux）、`C:\ProgramData\augment\settings.json`（Windows） | 组织管理员设置，用户不可覆盖；锁定项显示但不可改 |
| 本地项目设置 | 工作区根的 `.augment/settings.local.json` | 个人项目覆盖，自动加入 `.gitignore`，不应提交；设置类命令加 `--local` 写入 |
| 项目设置 | 工作区根的 `.augment/settings.json` | 团队共享，应提交到版本库；设置类命令加 `--project` 写入 |
| 用户设置 | home 目录的 `.augment/settings.json`（Windows 为 `C:\Users\<用户名>\.augment\settings.json`） | 跨项目个人默认值，也是不传 `--project`／`--local` 时的默认写入目标 |

工作区根由启动参数决定：在 git 目录运行 `auggie` 时自动索引该仓库，非 git 目录用当前工作目录；`--workspace-root` 可显式指定，`--add-workspace` 可追加索引其它目录。[@ref-auggie-docs-workspace-context][@ref-auggie-docs-reference-config]

文件格式是 JSON，且支持 JSONC（允许注释与尾逗号）。若存在多个可写设置文件，`/config` 会提示保存到哪一层。[@ref-auggie-docs-config-hierarchy]

文档给出的设置文件示例（键名与取值均来自该页）：[@ref-auggie-docs-config-example]

```json
{
  "shell": "zsh",
  "startupScript": "source ~/.augment/startup.sh",
  "enableChatInputCompletions": true,
  "autoUpdate": true,
  "notificationMode": "desktop_notification",
  "autoUpdateMarketplaces": true,
  "theme": "default-dark"
}
```

除设置文件外，规则文件也是一条独立的配置输入通道，Auggie 按固定顺序查找：`--rules` 指定的自定义规则文件、`CLAUDE.md`、`AGENTS.md`、工作区根的 `.augment-guidelines`、工作区根的 `.augment/rules/`（递归查找 .md 文件）、用户目录的 `.augment/rules/`；`--rules` 的内容会追加到自动加载的工作区准则之后。[@ref-auggie-docs-rules-supported][@ref-auggie-docs-rules-flag]

## 合并、优先级与历史兼容 {#config-overrides}

合并规则（文档 “Hierarchical Settings File” 的展开说明）：[@ref-auggie-docs-config-hierarchy]

| 内容 | 规则 |
| :-- | :-- |
| 简单值 | 高优先级文件覆盖低优先级文件 |
| 对象与列表 | 跨层合并 |
| MCP server 与插件条目 | **整体替换，不深合并**：同名 server 由高优先级文件的完整配置胜出，`args`、`env` 等属性不跨文件合并 |
| 工具权限规则 | 各层规则**拼接**，高优先级规则先参与匹配，按 first-match 生效 |
| `removedTools`、`indexingAllowDirs` 等列表 | 各层取并集并去重，只增不减——无法移除高优先级文件贡献的值 |
| `verbose`、`vimMode` 等个人设置 | 只从用户设置读取，写进项目或受管文件无效 |

工具权限的两级优先级：单个策略内自上而下匹配、先命中者生效；跨策略取**最严格**者，顺序为 `deny` > `webhook-policy` > `script-policy` > `allow`。命令行 `--permission` 形成独立策略，因此 `--permission` 的 deny 一定会生效，即使设置文件里是 allow。[@ref-auggie-docs-perms-types]

权限规则还受作用域影响：CLI 只从 `~/.augment/settings.json` 与项目 `.augment/settings.json` 读取 `toolPermissions`（文档 “Configuration Files” 只列了这两个文件），把策略提交到仓库是推荐的组织强制方式。[@ref-auggie-docs-perms-files]

**历史兼容**：旧的工具名仍可用，被别名到当前名（`launch-process`→`terminal`、`view`→`read`、`str-replace-editor`→`edit`、`save-file`→`write`）。CHANGELOG 记录术语更名（知识库与 CLI 中的 “skills” 更名为 “prompt modules”），以及权限规则中裸字符串 `permission` 会被丢弃并在启动时告警——这些是唯一可引用的迁移相关记录，固定来源没有提供版本化的配置迁移工具或弃用清单。[@ref-auggie-docs-perms-legacy][@ref-auggie-repo-changelog][@ref-auggie-docs-perms-basic]

## 运行时覆盖：CLI 参数与环境变量 {#config-runtime}

CLI 参数在进程启动时介入并覆盖文件配置。可影响工具与权限的：`--permission`、`--remove-tool` 加工具名（可重复，命令行优先于设置）、`--shell`、`--startup-script`／`--startup-script-file`、`--mcp-config`（最后应用并覆盖设置中的同名 MCP 条目）。可影响工作区与模型的：`--workspace-root`、`--add-workspace`、`--model`、`--persona`、`--rules`、`--augment-cache-dir`、`--retry-timeout`、`--print --max-turns`。[@ref-auggie-docs-reference-tools][@ref-auggie-docs-reference-config][@ref-auggie-docs-reference-mcp]

环境变量：`AUGMENT_SESSION_AUTH`（会话 JSON）、`GITHUB_API_TOKEN`（GitHub API token）、`AUGMENT_DISABLE_AUTO_UPDATE`（置 `1` 关闭自动更新）。shell 命令环境里还有 `AUGMENT_AGENT=1`，脚本可用它判断自己是否由 agent 执行。[@ref-auggie-docs-reference-env]

**缺口（partial）**：固定来源没有 profile 概念，也没有“环境变量覆盖设置文件”的通用映射表；除上表列出的变量外，没有可引用的环境变量清单。[@ref-auggie-docs-reference-env][@ref-auggie-docs-config-options]

## 信任与组织策略 {#config-trust}

- 受管设置（`/etc/augment/settings.json`、Windows 的 `C:\ProgramData\Augment\settings.json`）优先级最高且**不可被任何其它来源覆盖**；锁定设置对用户可见但不可修改。[@ref-auggie-docs-config-hierarchy][@ref-auggie-docs-hooks-locations]
- 组织管理设置文件时，插件市场的自动更新开关可能显示 `(locked)` 并被接管。[@ref-auggie-docs-plugins-autoupdate]
- `toolPermissions` 由 Auggie CLI 与 Cosmos 云 agent 共同遵守（在 agent 启动时加载并作用于每次工具调用），但 Augment 代码扩展不强制执行。[@ref-auggie-docs-perms-enforced]
- 项目设置随仓库对所有贡献者生效，文档建议用项目 `.augment/settings.json` 来实施组织策略（例如阻断 `git merge`）。Hooks 页也把项目级设置列为让仓库自带 hook 自动生效的方式。[@ref-auggie-docs-plugins-settings][@ref-auggie-docs-hooks-locations]

**缺口（partial）**：CLI 文档没有描述“工作区信任”提示、首次打开仓库时的确认流程或按仓库拒绝配置的机制；能确认的只有文件层级与只读层级。[@ref-auggie-docs-config-hierarchy]

## 默认值与平台差异 {#config-defaults}

文档可确认的默认值、开关与平台差异：[@ref-auggie-docs-config-options][@ref-auggie-docs-config-example][@ref-auggie-docs-plugins-settings]

| 项 | 默认 | 来源 |
| :-- | :-- | :-- |
| `theme` | `default-dark`（true color），可选 `ansi` | 配置页 |
| `autoUpdate` | `true`（交互模式自动更新；print 模式完全禁用自动更新） | 配置页、自动更新页 |
| `autoUpdateMarketplaces` | `true` | 插件页 |
| `enableToolSearch` | `false` | MCP 页 |
| `recommendedMarketplaces`／`dismissedMarketplaces`／`enabledPlugins` | `[]`／`[]`／`{}` | 插件页 |
| hook `timeout` | 60000 毫秒 | Hooks 页 |
| hook `matcher` | `".*"`（仅工具事件） | Hooks 页 |
| 权限规则 `eventType` | `tool-call` | 权限页 |
| `--log-level` | `info`（可选 `error`、`warn`、`debug`） | CLI 参考页 |
| 通知方式 | `/config` 可选 Off／Bell／Desktop Notification | 配置页 |

平台差异集中在路径：受管设置与用户设置目录 macOS／Linux 与 Windows 不同；hook 脚本扩展名按平台分派（`.sh` 走 Unix 直接执行，`.ps1`／`.bat`／`.cmd` 走 Windows 的 PowerShell 与 cmd）。[@ref-auggie-docs-hooks-scripts][@ref-auggie-docs-config-hierarchy]

自动更新的生效条件也属于默认行为的一部分：只在交互模式生效，非交互（print）模式完全禁用，以便自动化脚本固定版本。[@ref-auggie-docs-autoupgrade-how]

## 诊断与重载 {#config-diagnostics}

| 要查的事 | 入口 |
| :-- | :-- |
| 当前设置项（向导视图） | 交互模式 `/config`（shell、startup script、chat input completions、auto-update、notifications） [@ref-auggie-docs-config-wizard][@ref-auggie-docs-config-options] |
| 系统状态、MCP servers 与 rules | `/status`；账号信息 `/account`；系统与环境 `/about` [@ref-auggie-docs-interactive-common][@ref-auggie-docs-interactive-additional] |
| 规则是否被识别 | `auggie rules list`（列出当前工作区检测到的规则与准则）；交互模式 `/rules` 查看已加载规则及附加状态 [@ref-auggie-docs-reference-rules][@ref-auggie-docs-interactive-common] |
| 工具实际可用性 | `auggie tools list`（含状态）、`auggie tools schemas` [@ref-auggie-docs-reference-tools] |
| MCP 与模型清单 | `auggie mcp list --json`、`auggie models list --json` [@ref-auggie-docs-reference-mcp][@ref-auggie-docs-reference-models] |
| 日志 | `--log-file` 加路径（`-` 表示输出到 stderr）、`--log-level debug`；日志文件默认在系统临时目录（macOS：`$TMPDIR/augment-log.txt`，Windows：`%TEMP%\augment-log.txt`） [@ref-auggie-docs-reference-diagnostics][@ref-auggie-docs-logs-path] |

**“文件已写但不生效”的排查顺序**：确认写到了哪一层（默认是用户设置，`--project`／`--local` 才写项目层，多个可写文件时 `/config` 会询问）；确认该键是否属于“只从用户设置读取”的个人设置、或是否被更高优先级文件整体替换（MCP 与插件条目）；最后按文档要求**重启 Auggie**——手动修改设置文件后需要重启才生效。[@ref-auggie-docs-config-hierarchy][@ref-auggie-docs-config-manual]
