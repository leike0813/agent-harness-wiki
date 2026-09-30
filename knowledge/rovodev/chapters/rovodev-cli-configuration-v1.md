---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-configuration-v1
harness_id: rovodev
topic: configuration
title: "Rovo Dev CLI 的配置：来源、字段与组织策略"
sections:
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-rovodev-overview-scope, ref-rovodev-config-file, ref-rovodev-config-options, ref-rovodev-commands-cli, ref-rovodev-commands-interactive, ref-rovodev-tools-interactive]
  - section_id: config-keys
    surface_ids: [cli]
    source_refs: [ref-rovodev-config-options, ref-rovodev-config-agent, ref-rovodev-config-sessions, ref-rovodev-config-console, ref-rovodev-config-logging, ref-rovodev-config-mcp, ref-rovodev-config-tools, ref-rovodev-config-atlassian, ref-rovodev-config-billing, ref-rovodev-tools-levels, ref-rovodev-tools-bash, ref-rovodev-tools-compound, ref-rovodev-tools-external]
  - section_id: config-runtime
    surface_ids: [cli]
    source_refs: [ref-rovodev-commands-run, ref-rovodev-config-newfile, ref-rovodev-tools-yolo, ref-rovodev-memory-legacy]
  - section_id: config-trust
    surface_ids: [cli]
    source_refs: [ref-rovodev-overview-plan, ref-rovodev-features-org, ref-rovodev-features-site, ref-rovodev-mcp-governance]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-commands-interactive, ref-rovodev-config-file, ref-rovodev-help-interactive, ref-rovodev-help-cli, ref-rovodev-tools-levels, ref-rovodev-config-logging]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-rovodev-config-file, ref-rovodev-commands-cli, ref-rovodev-tools-interactive]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-rovodev-config-newfile, ref-rovodev-tools-yolo]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: partial
        source_refs: [ref-rovodev-config-newfile, ref-rovodev-commands-run]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-trust
        status: answered
        source_refs: [ref-rovodev-features-org, ref-rovodev-features-site]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-keys
        status: answered
        source_refs: [ref-rovodev-config-options, ref-rovodev-config-agent, ref-rovodev-tools-levels]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-runtime
        status: unknown
        source_refs: []
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-rovodev-config-file, ref-rovodev-commands-interactive, ref-rovodev-help-interactive]
---

固定来源范围：本章依据 Atlassian 官方支持文档《Manage Rovo Dev CLI settings》《Rovo Dev CLI commands》《Use tools in Rovo Dev CLI》《Use memory in Rovo Dev CLI》《Get help in Rovo Dev CLI》《Turn Rovo Dev features on and off》《Rovo Dev and Model Context Protocol (MCP)》的固定快照。Rovo Dev CLI 为闭源产品，`surface_id: cli`；官方页面未标注适用的软件版本，本章为来源级知识。

## 配置来源与作用域 {#config-sources}

Rovo Dev CLI 把 AI 能力带进终端，并集成 Atlassian 应用（可用于处理 Jira 工作项、创建 Confluence 内容）；它的配置面因此分为「本地行为配置」与「Atlassian 连接配置」两部分。[@ref-rovodev-overview-scope]

主配置文件默认位于 `~/.rovodev/config.yml`，用 `acli rovodev config` 在默认编辑器中打开；文件为 YAML 层级结构，所有参数可选，未指定时使用合理默认值。[@ref-rovodev-config-file][@ref-rovodev-config-options]

配置入口共有三类：

| 入口 | 形式 | 说明 |
| --- | --- | --- |
| 命令行 | `acli rovodev config` | 打开默认配置文件 |
| 命令行 | `acli rovodev run --config-file 路径` | 用另一份配置文件运行，不存在时会创建 |
| 命令行 | `acli rovodev mcp` | 打开 MCP 配置文件（由 `mcp.mcpConfigPath` 指向） |
| 交互式 | `/config` | 查看并编辑 Rovo Dev 配置 |

前三条与交互式入口见官方命令表与设置页。[@ref-rovodev-commands-cli][@ref-rovodev-commands-interactive]

配置文件还会被**宿主写入**：交互模式首次使用某个工具时会询问权限，选择 "Always" 即「把该权限写入配置文件并对后续所有会话生效」，因此用户不必手工编辑也能改变 `toolPermissions`。[@ref-rovodev-tools-interactive]

固定来源只描述了**一个用户级配置文件**：没有项目级、工作区级、组织级配置文件的路径或合并规则。与项目相关的机制（skill、子代理、memory）各自使用 `.rovodev/` 目录下的文件，而不是通用配置文件；哪些键能在哪一层写，官方未作说明。组织级与站点级只有功能开关（见「组织与站点策略」），没有可编辑的配置键。

## 配置项清单与默认值 {#config-keys}

顶层段与主要字段（括号内为文档写明的默认值；未指定的参数由 Rovo Dev 使用合理默认值[@ref-rovodev-config-options]）：[@ref-rovodev-config-agent][@ref-rovodev-config-sessions][@ref-rovodev-config-console][@ref-rovodev-config-logging][@ref-rovodev-config-mcp][@ref-rovodev-config-tools][@ref-rovodev-config-atlassian][@ref-rovodev-config-billing]

**agent（Rovo Dev 行为）**

| 键 | 默认 | 用途 |
| --- | --- | --- |
| `additionalSystemPrompt` | 无 | 追加到 agent 默认系统提示之后的额外系统提示 |
| `streaming` | `true` | 是否流式返回模型响应 |
| `temperature` | `0.3` | 温度，范围 0.0–1.0 |
| `modelId` | `"auto"` | agent 使用的模型 ID |
| `enableDeepPlanTool` | `false` | 是否启用深度规划工具 |
| `experimental.enableDelegationTool` | `false` | 允许把任务委派给子代理（internal users only） |
| `experimental.disableBuiltinAtlassianMcp` | `false` | 关闭内置 Atlassian MCP server（internal users only） |

**sessions**：`persistenceDir`（会话数据目录，示例值 `~/.rovodev/sessions`）、`enableWorkspaceStateSync`（实验性：恢复/切换会话时提示把工作区 git 状态切到会话检查点）。[@ref-rovodev-config-sessions]

**atlassianConnections**：`jiraProjects`（`url`/`key`/`name` 列表）、`localOverridePath`（本地覆盖目录）、`enabled`（默认 `true`）。[@ref-rovodev-config-atlassian]

**console**：`outputFormat`（markdown/simple/raw）、`showToolResults`、`toolResultVisibility`（逐工具显示开关，示例覆盖 bash、powershell、open_files、create_file、delete_file、move_file、expand_code_chunks、find_and_replace_code、grep、expand_folder、update_allowed_external_paths）、`editingMode`（如 `EMACS`）、`customCommandPrompt`、`theme`、`maxOutputWidth`（或 `fill`）、`enableStartupAnimations`、`copyOnSelect`、`terminalTitle.isEnabled` 与 `terminalTitle.displayValue`（模板变量 `{cwd}`、`{project}`、`{branch}`、`{session}`、`{model}`）。[@ref-rovodev-config-console]

**logging**：`path`（默认 `~/.rovodev/logs/rovodev.log`）、`enablePromptCollection`（internal users only）。[@ref-rovodev-config-logging]

**mcp**：`mcpConfigPath`（MCP 配置文件路径）、`allowedMcpServers`（允许的 server 名列表）、`disabledMcpServers`（全局禁用的 server 签名列表）。注意该段示例把 `mcpConfigPath` 默认值写成 `~/.rovodev/mcp_config.json`，与 MCP 页面写的 `~/.rovodev/mcp.json` 不一致。[@ref-rovodev-config-mcp]

**atlassianBillingSite**：`siteUrl` 与 `cloudId`，用于指定消耗 Rovo Dev 额度的站点。[@ref-rovodev-config-billing]

**toolPermissions（工具授权）**：`default` 是未列出的工具默认权限（默认 `"ask"`）；`tools` 为逐工具取值 `allow`/`ask`/`deny`；`bash.default` 与 `bash.commands` 用正则匹配 bash 命令并给出权限；`bash.runInSandbox`（macOS only, internal users）；`allowedExternalPaths` 列出工作区外允许访问的文件/目录。[@ref-rovodev-config-tools]

三个权限级别的语义：`allow` 直接执行、`ask` 执行前询问（多数工具默认）、`deny` 禁止执行。[@ref-rovodev-tools-levels]

bash 命令的匹配规则：`"pwd"` 精确匹配；`"ls.*"` 匹配 `ls` 带任意参数；`"git.*"` 按首词匹配所有 `git` 命令。[@ref-rovodev-tools-bash] 复合命令（用 `&&`、`||` 或 `;` 连接）会被拆成子命令分别判定：`ls -la && cat file.txt && npm install` 拆成三条，任一条需要授权就会逐条询问。[@ref-rovodev-tools-compound]

工作区外访问默认被禁止，需在 `toolPermissions.allowedExternalPaths` 中列出路径（也可用交互式 `/directories` 管理）。[@ref-rovodev-tools-external]

固定来源没有给出 YAML 未知键的处理方式（报错、忽略还是警告），也没有给出各键的类型校验规则与取值范围校验（如 `temperature` 越界时的行为）。

## 运行期覆盖与先后顺序 {#config-runtime}

运行期开关一览（来自官方命令表的 `run` 小节）：[@ref-rovodev-commands-run]

| 开关 | 作用 |
| --- | --- |
| `--worktree [name]` | 在 Git worktree 中运行，未给名字时按时间戳生成 |
| `--web` | 使用 web UI 而不是终端 UI |
| `--restore [session ID]` | 恢复当前工作区的上次会话，或指定会话 |
| `--yolo` | 跳过工具使用确认（谨慎使用） |
| `--config-file 路径` | 使用另一份配置文件运行，文件不存在时创建它 |

其中 `--config-file` 是文档中唯一的「配置来源替换」方式：官方措辞是「新建配置并使用其设置」，倾向替换而非与默认文件合并，但来源没有明确说明二者是否叠加。[@ref-rovodev-config-newfile]

**会话内覆盖**：YOLO 模式通过 `--yolo` 或交互式 `/yolo` 开启，**只作用于当前会话，不影响配置文件**，是文档明确写出的运行期覆盖语义。[@ref-rovodev-tools-yolo]

**优先级的缺口**：固定来源没有说明环境变量、profile 或 CLI 参数覆盖文件配置的通用规则，也没有给出「同一键在多处出现」的判定顺序；除 `--config-file` 与 `/yolo` 外，其余开关都不改写配置文件。

**迁移**：官方没有描述配置键的迁移、弃用、兼容或旧格式导入规则。记忆机制有明确的一次性迁移路径（旧格式如 `CLAUDE.md`、`CLAUDE.local.md`、`codex.md`、`.cursor/rules/*.mdc`、`rules.md`、`.agent.md` 等可由 `/memory init` 迁移到 AGENTS.md 格式），但那是 memory 文件而非 `config.yml`，不能据此推断配置键迁移行为。[@ref-rovodev-memory-legacy]

## 组织与站点策略 {#config-trust}

Rovo Dev 的整套功能（含 CLI）受两级开关约束，必须在组织级和站点级同时开启：[@ref-rovodev-features-org]

- 组织级：组织管理员在 Atlassian Administration 的 Rovo > Rovo Settings > Rovo Dev 中逐项开关；
- 站点级：Rovo Dev 应用管理员在应用侧边栏的 Settings 中逐项开关。[@ref-rovodev-features-site]

订阅层面还有一层限制：Rovo Dev CLI 在 Rovo Dev Standard 试用期内不可用，需要付费的 Rovo Dev Standard 订阅（可提前结束试用并开始付费订阅）。[@ref-rovodev-overview-plan]

MCP 页面给出的是同一控制点的另一条路径（Apps > AI settings > AI-enabled apps > Rovo Dev），并明确该功能「可被组织级和站点级禁用」。[@ref-rovodev-mcp-governance]

固定来源没有说明 CLI 是否还有额外的项目信任提示（例如首次在某目录运行时的确认），也没有说明策略关闭时 CLI 的报错文案；关闭后 CLI 请求应会失败，但具体错误信息未在来源中出现。

## 诊断 {#config-diagnostics}

- `/config`：查看并编辑当前生效的 Rovo Dev 配置，是「文件已写但没生效」的首个观察点。[@ref-rovodev-commands-interactive]
- `acli rovodev config`：直接用默认编辑器打开配置文件，确认实际读取的路径与内容。[@ref-rovodev-config-file]
- `/help` 后接查询词、或具体命令的 `help` 子命令：查询具体命令与功能用法；`acli rovodev --help` 与子命令的 `--help` 给出命令行层面的帮助。[@ref-rovodev-help-interactive][@ref-rovodev-help-cli]
- 具体机制还有各自的运行时视图，例如 `/directories` 查看工作区外允许的目录（对应 `toolPermissions.allowedExternalPaths`），`/mcp` 查看 MCP server 状态；工具权限的当前取值以配置文件为准。[@ref-rovodev-tools-levels]
- 运行期错误可查 `logging.path`（默认 `~/.rovodev/logs/rovodev.log`）。[@ref-rovodev-config-logging]

**缺口**：固定来源没有给出「显示配置合并结果/生效来源」的命令（例如区分未设置与默认值），没有配置重载命令或热重载说明，也没有配置校验错误的位置提示。修改 `config.yml` 是否需要重启会话未在来源中建立。
