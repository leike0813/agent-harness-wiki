---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-configuration-v1
harness_id: sourcecraft-code-assistant
topic: configuration
title: "SourceCraft Code Assistant（VS Code）的配置来源、合并与默认值"
sections:
  - section_id: config-files
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-cli-setup, ref-sc-ca-ignore-syntax, ref-sc-ca-mcp-scopes, ref-sc-ca-rules-locations, ref-sc-ca-rules-merge, ref-sc-ca-skills-locations, ref-sc-ca-slash-create]
  - section_id: config-merge
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-ignore-excludes, ref-sc-ca-mcp-scopes, ref-sc-ca-rules-locations, ref-sc-ca-rules-merge, ref-sc-ca-skills-priority, ref-sc-ca-slash-using]
  - section_id: config-runtime
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-cli-install, ref-sc-ca-cli-setup, ref-sc-ca-mcp-env, ref-sc-ca-term-inherit, ref-sc-ca-term-manual]
  - section_id: config-defaults
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-permissions, ref-sc-ca-aa-requests, ref-sc-ca-aa-retry, ref-sc-ca-checkpoints-config, ref-sc-ca-concurrent-reads, ref-sc-ca-fast-edits, ref-sc-ca-ignore-ux, ref-sc-ca-index-indicator, ref-sc-ca-mcp-autoapprove, ref-sc-ca-mcp-create, ref-sc-ca-mcp-disable, ref-sc-ca-mcp-intro, ref-sc-ca-mcp-timeout, ref-sc-ca-profiles-create, ref-sc-ca-skills-intro]
  - section_id: config-trust
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-execute, ref-sc-ca-aa-write, ref-sc-ca-ignore-restrictions, ref-sc-ca-ignore-tools]
  - section_id: config-migration
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-index-plugin, ref-sc-ca-roo]
  - section_id: config-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-chatui-status, ref-sc-ca-ignore-ux, ref-sc-ca-logs, ref-sc-ca-mcp-troubleshoot, ref-sc-ca-rules-merge]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [vscode]
        section_id: config-files
        status: answered
        source_refs: [ref-sc-ca-mcp-scopes, ref-sc-ca-rules-locations, ref-sc-ca-skills-locations, ref-sc-ca-slash-create, ref-sc-ca-ignore-syntax, ref-sc-ca-cli-setup]
  - question_id: config.overrides
    answers:
      - surface_ids: [vscode]
        section_id: config-merge
        status: answered
        source_refs: [ref-sc-ca-mcp-scopes, ref-sc-ca-skills-priority, ref-sc-ca-slash-using, ref-sc-ca-rules-merge, ref-sc-ca-ignore-excludes]
  - question_id: config.runtime
    answers:
      - surface_ids: [vscode]
        section_id: config-runtime
        status: answered
        source_refs: [ref-sc-ca-mcp-env, ref-sc-ca-term-inherit, ref-sc-ca-term-manual, ref-sc-ca-cli-setup]
  - question_id: config.trust
    answers:
      - surface_ids: [vscode]
        section_id: config-trust
        status: partial
        source_refs: [ref-sc-ca-ignore-tools, ref-sc-ca-ignore-restrictions, ref-sc-ca-aa-write, ref-sc-ca-aa-execute]
  - question_id: config.defaults
    answers:
      - surface_ids: [vscode]
        section_id: config-defaults
        status: answered
        source_refs: [ref-sc-ca-mcp-disable, ref-sc-ca-mcp-timeout, ref-sc-ca-aa-retry, ref-sc-ca-checkpoints-config, ref-sc-ca-fast-edits, ref-sc-ca-concurrent-reads, ref-sc-ca-profiles-create, ref-sc-ca-ignore-ux]
  - question_id: config.migration
    answers:
      - surface_ids: [vscode]
        section_id: config-migration
        status: unknown
        source_refs: [ref-sc-ca-roo]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-sc-ca-logs, ref-sc-ca-mcp-troubleshoot, ref-sc-ca-ignore-ux, ref-sc-ca-rules-merge]
---

## 配置来源与路径 {#config-files}

VS Code 插件的配置分三层：**VS Code settings / 全局目录**、**项目（工作区）目录**、**工作区根部的约定文件**。

**全局（Code Assistant 专属，跨项目）**：

- `~/.codeassistant/skills/NAME/SKILL.md`、`~/.codeassistant/skills-{modeSlug}/…`（Windows 用 `%USERPROFILE%\.codeassistant\`）。[@ref-sc-ca-skills-locations]
- `~/.codeassistant/rules/`、`~/.codeassistant/rules-{modeSlug}/`；`~/.codeassistant/commands/`。[@ref-sc-ca-rules-locations][@ref-sc-ca-slash-create]
- MCP 全局配置为 `mcp_settings.json`，通过 VS Code settings 打开。[@ref-sc-ca-mcp-scopes]

**跨 agent 共享（全局/项目）**：`~/.agents/skills/…` 与 `.agents/skills/…`（含 `skills-{modeSlug}` 变体）。[@ref-sc-ca-skills-locations]

**项目（工作区）**：

- `.codeassistant/mcp.json`（MCP server），[@ref-sc-ca-mcp-scopes]
- `.codeassistant/rules/`、`.codeassistant/rules-{modeSlug}/`，或单文件 `.codeassistantrules`、`.codeassistantrules-{modeSlug}`，[@ref-sc-ca-rules-locations]
- `.codeassistant/skills/`、`.codeassistant/skills-{modeSlug}/`，[@ref-sc-ca-skills-locations]
- `.codeassistant/commands/`，[@ref-sc-ca-slash-create]
- `.codeassistantignore`（工作区根），[@ref-sc-ca-ignore-syntax]
- 工作区根部的 `AGENTS.md` / `AGENT.md`（作为 agent rules 读入）。[@ref-sc-ca-rules-merge]

**相邻界面的配置（供交叉参考）**：SourceCraft CLI 首次运行做交互式 setup，凭据可存于系统 keyring 或文件系统，会把 `opencode` 安装到 `~/.config/sourcecraft/bin`，并可用 `src init` 重跑 setup、`src update` 触发更新。[@ref-sc-ca-cli-setup]

## 作用域优先级与合并 {#config-merge}

- **MCP**：同名 server 同时出现在全局与项目配置时，**项目级优先**；不同名则叠加。[@ref-sc-ca-mcp-scopes]
- **Skills**：八级优先序（项目 `.codeassistant` 模式专用 → 项目 `.codeassistant` 通用 → 项目 `.agents` 模式专用 → 项目 `.agents` 通用 → 全局 `.codeassistant` 模式专用 → 全局 `.codeassistant` 通用 → 全局 `.agents` 模式专用 → 全局 `.agents` 通用）；项目覆盖同名全局，同层级 `.codeassistant` 覆盖 `.agents`。[@ref-sc-ca-skills-priority]
- **Slash 命令**：项目命令覆盖同名全局命令。[@ref-sc-ca-slash-using]
- **Rules**：全局规则先上传、工作区规则后上传，工作区可覆盖全局；模式专用规则排在通用规则之前。官方明确"系统会读取**所有**适用目录，而不是只读第一个含文件的目录"，目录与单文件 fallback 只在"选择方式"上互斥：仅当通用规则目录没有任何文件时才用 `.codeassistantrules`，模式专用同理由 `rules-{modeSlug}/` 优先于 `.codeassistantrules-{modeSlug}`。[@ref-sc-ca-rules-merge][@ref-sc-ca-rules-locations]
- **忽略规则**：`.codeassistantignore` 语法同 `.gitignore`；其中的 `!` 否定模式**同时作用于 `.gitignore` 与 `.codeassistantignore` 自身**（例如用 `!generated/api/` 把 `.gitignore` 隐藏的目录部分暴露给 Code Assistant）。[@ref-sc-ca-ignore-excludes]

**缺口**：对象/数组/空值/删除标记的通用合并语义没有单独成文；上述规则是各类配置各自的实际行为，`config.overrides` 不能外推成一条统一合并算法。

## 环境变量、CLI 参数与运行时介入 {#config-runtime}

- **MCP 参数展开**：`args` 中可用 `${env:VARIABLE_NAME}` 引用系统环境变量，运行时替换；变量必须在系统中存在（shell 启动文件或 Windows 环境变量中设置）。[@ref-sc-ca-mcp-env]
- **终端环境继承**：Terminal integration 的 **Inherit environment variables** 直接对应 VS Code 全局设置 `terminal.integrated.inheritEnv`。[@ref-sc-ca-term-inherit]
- **Shell 集成**：当 shell 集成不可用时，官方给出**手动 setup** 路径（把集成脚本加入 shell 配置文件），并可查看集成状态；这是运行时环境层面的介入。[@ref-sc-ca-term-manual]
- **CLI 侧**：首次 `src` 启动会做更新检查与交互式 setup；`src init` 重跑 setup，`src auth login` 走 OAuth，`src update` 手动检查更新；无系统密钥存储的环境只提供 Filesystem 凭据、无浏览器环境只提供 PAT。[@ref-sc-ca-cli-setup][@ref-sc-ca-cli-install]

## 默认值与功能开关 {#config-defaults}

官方明确的默认值汇总（均可在设置面板改变）：

| 项 | 默认值 | 来源 |
| :-- | :-- | :-- |
| Enable MCP Servers | 开启 | [@ref-sc-ca-mcp-disable] |
| Enable MCP Server Creation | 开启 | [@ref-sc-ca-mcp-create] |
| 单个 MCP server 的 Network Timeout | `60` 秒（范围 `30`–`300`） | [@ref-sc-ca-mcp-timeout] |
| MCP 工具自动批准 | 关闭（需先开全局 MCP 开关再逐工具 Auto-Run） | [@ref-sc-ca-mcp-autoapprove] |
| Auto-approve 各项权限 | 关闭（含 Read/Write/Execute/Browser/MCP/Mode/Subtasks/Retry） | [@ref-sc-ca-aa-permissions] |
| Max Requests（自动请求上限） | 不设限 | [@ref-sc-ca-aa-requests] |
| Retry 的 Delay before retrying the request | `10` 秒（上限 `600` 秒） | [@ref-sc-ca-aa-retry] |
| Checkpoints | 开启（需安装 Git） | [@ref-sc-ca-checkpoints-config] |
| Suggestion indicator | 开启 | [@ref-sc-ca-index-indicator] |
| Enable editing through diffs / Match precision | 开启 / `100%` | [@ref-sc-ca-fast-edits] |
| 并发文件读取上限 | `100` 个（`1` 表示关闭） | [@ref-sc-ca-concurrent-reads] |
| Rate limit（每个 profile） | `0`（禁用） | [@ref-sc-ca-profiles-create] |
| `showCodeAssistantIgnoredFiles` | `true`（被忽略文件以 🔒 前缀显示） | [@ref-sc-ca-ignore-ux] |

**平台差异与功能开关**：Skills 与 MCP 配置等在官方文档中标注为"仅 Visual Studio Code"。[@ref-sc-ca-skills-intro][@ref-sc-ca-mcp-intro]

## 信任、权限与访问边界 {#config-trust}

- `.codeassistantignore` 是**工具访问边界**而非系统级沙箱：它对 `read_file`、`write_to_file`、`apply_diff`、`insert_content`、`search_and_replace`、`list_code_definition_names` 直接生效，被忽略文件的操作会被阻断并返回 `Access to … is denied by .codeassistantignore`。[@ref-sc-ca-ignore-tools]
- 保护范围有限：`execute_command` 只对预定义的读文件命令（如 `cat`、`grep`）做目标检查，自定义脚本或罕见工具可能绕过；`.codeassistantignore` 规则只作用于工作区根目录下的文件。[@ref-sc-ca-ignore-restrictions]
- 写入保护：`.codeassistantignore` 自身默认始终被忽略，防止 Code Assistant 修改自身访问规则；默认也会忽略 `.gitignore` 中的文件。[@ref-sc-ca-ignore-tools]
- 覆盖保护的两条途径：Write 权限的 **Include protected files** 选项可允许修改受 `.codeassistantignore` 与 `.codeassistant/` 保护的文件及含 Code Assistant 设置的配置文件（`package.json`、`tsconfig.json` 等）；Execute 权限用命令前缀白名单决定哪些命令可自动执行（`*` 表示全部，官方明确不推荐）。[@ref-sc-ca-aa-write][@ref-sc-ca-aa-execute]

**缺口**：固定来源没有描述 VS Code 的 Workspace Trust 如何影响插件配置读取，也没有"组织策略/管理员强制配置"一节；`config.trust` 只覆盖文件忽略与批准两类边界。

## 迁移与兼容 {#config-migration}

- 官方 FAQ 提醒：先前以可下载 ZIP 安装 JetBrains 插件的用户应先卸载再用插件仓库方式重装；JetBrains 归档需以 ZIP 原样安装、不要解压。[@ref-sc-ca-index-plugin]
- 修改文件清单中存在 `packages/Roo-Code/src/core/config/YMigrationsManager.ts` 与 `webview-ui/src/components/settings/YMigrations.tsx`，提示插件内部有迁移管理器与迁移 UI；但官方没有公开迁移的键、版本边界或旧格式导入规则。[@ref-sc-ca-roo]

**结论**：`config.migration` 记为 unknown——没有可定位的配置键弃用/迁移/兼容规则，只有内部实现旁证。

## 诊断：确认实际生效来源 {#config-diagnostics}

- **通用日志**：插件菜单 **Export Logs** 导出 `logs.zip`。[@ref-sc-ca-logs]
- **MCP**：按症状排查——无响应查进程与网络，权限错查 `mcp_settings.json`（全局）或 `.codeassistant/mcp.json`（项目）中的 key，工具不可用查是否停用，性能慢调 Network Timeout。[@ref-sc-ca-mcp-troubleshoot]
- **忽略规则**：被忽略文件在列表/`@directory` 中按 `showCodeAssistantIgnoredFiles` 标记 🔒 或被过滤；直接提及被忽略文件时返回 `File is ignored by .codeassistantignore settings` 而不是内容；被阻断时聊天界面会给出提示。[@ref-sc-ca-ignore-ux]
- **Rules 生效顺序**：官方给出系统 prompt 中 CUSTOM RULES 的模板，明确各来源块的先后（语言 → 全局规则 → 模式专用规则 → `rules-{modeSlug}` → `.codeassistantrules-{modeSlug}` → `.codeassistantignore` → AGENTS.md → `rules/` 目录 → `.codeassistantrules`），可据此判断"文件已写但顺序不对"的问题。[@ref-sc-ca-rules-merge]
- **界面反馈**：聊天界面用加载指示器与红/绿消息区分处理中、失败与成功。[@ref-sc-ca-chatui-status]

**缺口**：没有"打印当前生效配置"的官方命令或面板（对比 CLI 侧也无该入口）；配置改动是否重载需靠各机制自身说明（如 MCP 需重启 server、`.codeassistantignore` 持续监视并自动上传）。
