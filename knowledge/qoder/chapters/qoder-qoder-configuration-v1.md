---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-configuration-v1
harness_id: qoder
topic: configuration
title: "Qoder IDE 的配置来源与合并机制"
sections:
  - section_id: config-sources
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-indexing-config, ref-qoder-ide-rules-configure, ref-qoder-ide-rules-storage, ref-qoder-ide-rules-how, ref-qoder-ide-rules-types, ref-qoder-ide-commands-scope, ref-qoder-ide-skills-paths, ref-qoder-ide-agents-manual, ref-qoder-cli-configdir, ref-qoder-ide-hooks-locations, ref-qoder-cli-settings-locations]
  - section_id: config-overrides
    surface_ids: [qoder]
    source_refs: [ref-qoder-cli-settings-precedence, ref-qoder-ide-hooks-locations, ref-qoder-cli-settings-merge, ref-qoder-cli-settings-trust]
  - section_id: config-runtime
    surface_ids: [qoder]
    source_refs: [ref-qoder-cli-settings-format, ref-qoder-cli-envvars, ref-qoder-cli-settings-precedence]
  - section_id: config-defaults
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-rules-limits, ref-qoder-ide-indexing-config, ref-qoder-ide-indexing-ignore, ref-qoder-ide-commands-create, ref-qoder-ide-hooks-format]
  - section_id: config-migration
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-rules-agentsmd]
  - section_id: config-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-diagnose-script, ref-qoder-ide-diagnose-common, ref-qoder-ide-mcp-trouble-params, ref-qoder-ide-hooks-caveats, ref-qoder-ide-indexing-ignore]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [qoder]
        section_id: config-sources
        status: partial
        source_refs: [ref-qoder-ide-hooks-locations, ref-qoder-cli-settings-locations, ref-qoder-cli-configdir, ref-qoder-ide-rules-storage, ref-qoder-ide-commands-scope, ref-qoder-ide-skills-paths, ref-qoder-ide-agents-manual]
  - question_id: config.overrides
    answers:
      - surface_ids: [qoder]
        section_id: config-overrides
        status: answered
        source_refs: [ref-qoder-cli-settings-precedence, ref-qoder-ide-hooks-locations, ref-qoder-cli-settings-merge]
  - question_id: config.runtime
    answers:
      - surface_ids: [qoder]
        section_id: config-runtime
        status: partial
        source_refs: [ref-qoder-cli-envvars, ref-qoder-cli-settings-format, ref-qoder-cli-settings-precedence]
  - question_id: config.trust
    answers:
      - surface_ids: [qoder]
        section_id: config-overrides
        status: partial
        source_refs: [ref-qoder-cli-settings-trust, ref-qoder-ide-hooks-locations]
  - question_id: config.defaults
    answers:
      - surface_ids: [qoder]
        section_id: config-defaults
        status: partial
        source_refs: [ref-qoder-ide-rules-limits, ref-qoder-ide-indexing-config, ref-qoder-ide-commands-create, ref-qoder-ide-hooks-format]
  - question_id: config.migration
    answers:
      - surface_ids: [qoder]
        section_id: config-migration
        status: partial
        source_refs: [ref-qoder-ide-rules-agentsmd]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-qoder-ide-diagnose-script, ref-qoder-ide-diagnose-common, ref-qoder-ide-mcp-trouble-params, ref-qoder-ide-hooks-caveats]
---

## 固定来源与配置入口 {#config-sources}

本章按 Qoder IDE（catalog 的 `qoder` 界面）采写，固定来源为官方文档站的 IDE 页面快照：Hooks（给出 IDE/CLI 共享的 `settings.json` 三档）、Rules、Commands、Indexing、Skills、Custom Agent，以及 CLI 的 Configuration Scope / Configuration Files and Application Order（用于补足文件级合并规则，均在正文标注来源面）。所有来源都取自 `docs.qoder.com`（`qoder.com` 指向的官方文档站）；`docs.qoder.cn` 是另一条国内产品线（通义灵码 / Lingma）的文档，本章不引用。

Qoder IDE 有两条配置入口，互不覆盖：

1. **图形设置**：Qoder IDE Settings（右上角用户图标，或 `⌘` `⇧` `,` / `Ctrl` `Shift` `,`），左侧导航按主题分页——Rules、MCP、Models、Indexing、Commands、Plugins 等。[@ref-qoder-ide-indexing-config][@ref-qoder-ide-rules-configure]
2. **磁盘文件**：`.qoder/` 目录约定加 `settings.json` 分层。

`.qoder/` 与用户配置目录的内容按机制分列：规则文件放在 `.qoder/rules/`（随项目目录、可随版本控制共享）；用户级命令放在 `~/.qoder/commands/`（macOS/Linux）或 `C:\Users\用户名\.qoder\commands\`（Windows），项目级命令放在项目根目录 `.qoder/commands/`，都支持在 `commands/` 下用子目录分类；Skill 放在 `~/.qoder/skills/{skill-name}/SKILL.md` 与 `.qoder/skills/{skill-name}/SKILL.md`；自定义 Agent 放在 `~/.qoder/agents/{agentName}.md` 与 项目根目录 `/.qoder/agents/{agentName}.md`。[@ref-qoder-ide-rules-storage][@ref-qoder-ide-commands-scope][@ref-qoder-ide-skills-paths][@ref-qoder-ide-agents-manual]

用户配置目录默认是 `~/.qoder`，可用环境变量 `QODER_CONFIG_DIR` 改写；项目级 `.qoder/` 始终位于项目根目录。CLI 的 Configuration Scope 页列出的 `.qoder/` 常见内容为：`settings.json`（项目级，可提交）、`settings.local.json`（本地，不提交）、`rules/`、`skills/`、`worktrees/`、`scheduled_tasks.json`。[@ref-qoder-cli-configdir]

`settings.json` 由三个层级提供，Hooks 页面记录这三个文件是 IDE 与 CLI **共享**的：`~/.qoder/settings.json`（用户级）、`.qoder/settings.json`（项目级，可提交共享）、`.qoder/settings.local.json`（项目级本地，应加入 .gitignore）。[@ref-qoder-ide-hooks-locations]

CLI 的配置页把同一组路径写成"三层配置文件"，并补充说明默认配置目录 `~/.qoder` 可由 `QODER_CONFIG_DIR` 改写。[@ref-qoder-cli-settings-locations]

**缺口（`config.sources`）**：固定来源没有记录组织级（企业/管理员下发）配置入口，也没有说明 IDE 自身的 UI 偏好是否与 `settings.json` 同源；可以确定的只有上表路径、三档 `settings.json` 与 `QODER_CONFIG_DIR`。本项按部分回答。[@ref-qoder-cli-settings-locations]

### 项目规则（instructions）的类型与生效方式

规则存放在项目目录的 `.qoder/rules/`，随项目、可经 Git 共享；不想共享时把该目录加入 `.gitignore`。它的作用是把预定义上下文注入提示词，让模型输出更贴合项目规范。[@ref-qoder-ide-rules-storage][@ref-qoder-ide-rules-how]

规则按生效方式分四类（原文表）：**Apply Manually**（在 Chat 面板或内联聊天用 `@rule` 手动应用）、**Model Decision**（由 AI 在 Agent 模式下按规则描述自行判断是否应用）、**Always Apply**（对所有 Chat 与 Inline Chat 请求生效）、**Specific Files**（对匹配通配符的文件生效，例如 `*.md`、`src/*.java`）。[@ref-qoder-ide-rules-types]

## 合并与优先级 {#config-overrides}

优先级（由低到高）：内置默认值（Schema defaults）→ 用户级 `~/.qoder/settings.json` → 项目级 `.qoder/settings.json` → 本地级 `.qoder/settings.local.json` → 命令行 `--settings`（最高）。即本地覆盖项目、项目覆盖用户、命令行覆盖所有文件。[@ref-qoder-cli-settings-precedence]

IDE 的 Hooks 页面给出与之吻合的 Hook 方向：三个文件里的 hook 配置**合并执行**，顺序为用户级（最低）→ 项目级 → 项目本地级（最高）。[@ref-qoder-ide-hooks-locations]

合并语义（CLI 配置页原文要点）：[@ref-qoder-cli-settings-merge]

- **对象**：递归逐字段合并，只覆盖出现的字段，其余保留低优先级的值；
- **单值（字符串、数字、布尔）**：直接被高优先级覆盖；
- **数组**：部分配置项（如 disable 列表、exclude 列表）采用并集合并去重，其它数组默认整体覆盖。

因此项目级只需要写要覆盖的字段，不必复制整份用户配置。[@ref-qoder-cli-settings-merge]

### 信任对配置生效的影响

项目级与本地级配置**只有在当前工作目录被信任时才会应用**；目录不受信任时只加载用户级配置，忽略项目内的 `settings.json` 与 `settings.local.json`。该门由 `security.folderTrust.enabled` 控制（默认启用）。这条规则写在 CLI 的配置页；IDE 页面没有单独记录信任门，但在同一产品的 Hooks 页确认了配置文件层级的共享。[@ref-qoder-cli-settings-trust]

**缺口**：固定来源没有说明 IDE 侧是否存在等价的目录信任提示或"不受信任"时的用户可见状态。[@ref-qoder-cli-settings-trust]

## 环境变量与运行时介入 {#config-runtime}

- 配置文件是 JSON，**支持 `//` 注释**（解析时忽略）；值中可以引用环境变量，运行时解析替换。[@ref-qoder-cli-settings-format]
- Qoder 相关环境变量（CLI 参考页原文，节选）：`QODER_CONFIG_DIR`（用户配置目录，默认 `~/.qoder`）、`QODER_PERSONAL_ACCESS_TOKEN`、`QODER_MODEL`、`QODER_WORKING_DIR`、`QODER_SESSION_ID`、`QODER_PERMISSION_MODE`、`QODER_APPEND_SYSTEM_PROMPT`、`QODER_MCP_LAZY`、`QODER_SUBAGENT_MODEL`、`QODER_MEMORY` 等；代理类为 `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` 及其小写别名、`NODE_EXTRA_CA_CERTS`、`SSL_CERT_FILE`。[@ref-qoder-cli-envvars]
- 命令行介入：`--settings` 指定的配置优先级最高，覆盖全部文件。[@ref-qoder-cli-settings-precedence]

**缺口（`config.runtime`）**：上述环境变量与 `--settings` 都来自 CLI 参考页；固定来源没有记录 IDE 进程是否读取同一批变量（唯一的 IDE 侧环境变量记录在 Hooks 页：脚本运行时注入的 `QODER_SESSION_ID` 等），也没有记录 IDE 侧的 profile 概念。本项按部分回答。[@ref-qoder-cli-envvars]

## 默认值与上限 {#config-defaults}

以下默认值/上限都有明确来源，且都是读者能直接观察到的行为：

- **规则总量**：所有生效规则文件合计最多 100,000 个字符，超出部分会被截断；规则只支持自然语言，不支持图片或链接。[@ref-qoder-ide-rules-limits]
- **代码库索引**：支持最多 100,000 个文件；少于 10,000 个文件的项目默认开启自动索引，更大的代码库需要手工开启。默认索引除 `.gitignore` 与 `.qoderignore` 列出的内容之外的所有项目文件；Ignore Files 面板可追加自定义模式，并支持 `!app/` 这类取反排除。[@ref-qoder-ide-indexing-config][@ref-qoder-ide-indexing-ignore]
- **自定义命令**：命令名只允许小写字母、数字、连字符与下划线，不能为空，建议 100 字符以内，同一作用域内不能重名；正文为空或只有默认占位内容时该命令不会出现在可用列表里。[@ref-qoder-ide-commands-create]
- **Hook 超时**：默认 30 秒，可按 hook 用 `timeout` 覆盖；超时脚本被杀掉并按"允许（继续）"处理。[@ref-qoder-ide-hooks-format]

**缺口**：固定来源没有记录 IDE 侧功能开关（feature flag）的清单、平台差异（Windows/macOS/Linux）对默认值的影响，或这些默认值在用户配置里的键名；本节列出的默认值都是行为层面的观察，不是可改写的配置键。[@ref-qoder-ide-rules-limits]

## 旧格式与兼容 {#config-migration}

唯一被记录的兼容机制是 **AGENTS.md**：把 `AGENTS.md` 文件复制到项目目录，Agent 会自动识别并使用其中的规则，**无需额外配置**。官方明确冲突时的优先级：**AGENTS.md 与规则内容冲突时，以规则内容为准**。[@ref-qoder-ide-rules-agentsmd]

**缺口（`config.migration`）**：固定来源没有记录配置键的迁移、弃用、版本兼容或旧格式导入规则（例如旧版本设置文件如何升级、被移除的键如何处理）；已检查的入口是本页与 CLI 的配置页，均无相关说明。本项按部分回答。[@ref-qoder-ide-rules-agentsmd]

## 诊断 {#config-diagnostics}

- **官方诊断脚本**：Qoder IDE 提供诊断脚本，运行后自动收集系统信息、网络设置、服务状态与日志，生成 `qoder-diagnosis_YYYYMMDD_HHMMSS.zip`，其中主日志名为 `Qoder_Log_YYYYMMDD_HHMMSS.txt`；官方文档给出的 Windows 用法要求管理员权限、下载 `windows_Qoder.bat` 并以 `.bat` 运行，安装目录默认为 `C:\Users\用户名\.qoder`（官方原文用尖括号占位符表示用户名，此处按无尖括号写法转述）。[@ref-qoder-ide-diagnose-script]
- **常见问题表**：脚本会检查代理是否启用（查看 `[Network Settings 0x0 means proxy is disabled]` 段），检查 `Qoder.exe` 是否存在，跑版本与启动测试；登录失败但进程在运行时可把可执行文件加入 Windows 防火墙白名单后重试；日志分析部分包含 `qoder.log` 最后 80 行与 `.qoder` 目录结构与文件大小。[@ref-qoder-ide-diagnose-common]
- **"文件写了但没生效"的定向检查**：MCP 场景下官方给出的做法是在设置 MCP → 编辑目标 server → 核对 **Arguments** 参数值，改正后重连再试。[@ref-qoder-ide-mcp-trouble-params]
- **重载时机**：Hook 配置**不支持热重载**，改完必须重启 IDE；这条同样适用于共享同一批 `settings.json` 的其它配置项。[@ref-qoder-ide-hooks-caveats]
- **忽略规则自检**：可用 `git check-ignore -v FILE` 确认某个文件是否被忽略。[@ref-qoder-ide-indexing-ignore]

**缺口**：固定来源没有提供 IDE 内"查看实际生效配置来源"的命令或面板（CLI 另有 `/settings` 面板与配置文件说明，但那是另一个入口），也没有针对"某个 `settings.json` 键未被读取"的直接诊断；可用的只有诊断脚本、上述常见问题表与按机制分列的设置页面。[@ref-qoder-ide-diagnose-common]
