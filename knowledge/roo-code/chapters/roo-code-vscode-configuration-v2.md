---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-configuration-v2
harness_id: roo-code
topic: configuration
title: "Roo Code 的配置机制：来源与存储、优先级与信任边界、运行时介入、默认值、迁移与诊断"
sections:
  - section_id: config-sources
    surface_ids: [vscode]
    source_refs: [ref-roo-config-code-init, ref-roo-config-code-storagebase, ref-roo-config-doc-vscode, ref-roo-config-code-passthrough, ref-roo-config-code-settingsdir, ref-roo-config-code-roodirs, ref-roo-config-code-rooignore, ref-roo-config-doc-rooignore]
  - section_id: config-overrides
    surface_ids: [vscode]
    source_refs: [ref-roo-config-code-getvalues, ref-roo-config-code-merge-commands, ref-roo-config-code-roodirs, ref-roo-config-doc-rules, ref-roo-config-code-export-schema, ref-roo-config-code-export, ref-roo-config-code-rooignore, ref-roo-prov-doc-security]
  - section_id: config-runtime
    surface_ids: [vscode]
    source_refs: [ref-roo-config-doc-vscode, ref-roo-config-code-manifest, ref-roo-config-doc-commands, ref-roo-config-code-autoimport, ref-roo-config-doc-autoimport, ref-roo-config-code-env]
  - section_id: config-defaults
    surface_ids: [vscode]
    source_refs: [ref-roo-config-code-defaults, ref-roo-config-code-default-consts, ref-roo-config-code-manifest, ref-roo-config-doc-vscode]
  - section_id: config-migration
    surface_ids: [vscode]
    source_refs: [ref-roo-config-code-migrate-files, ref-roo-config-code-migrate-yaml, ref-roo-config-code-migrate-commands, ref-roo-prov-code-model-migrations, ref-roo-config-doc-import, ref-roo-config-doc-reset, ref-roo-config-code-reset]
  - section_id: config-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-roo-config-code-exportfile, ref-roo-config-doc-export, ref-roo-config-code-manifest, ref-roo-config-doc-rules, ref-roo-config-code-rooignore, ref-roo-config-doc-commands, ref-roo-config-doc-import, ref-roo-config-doc-vscode, ref-roo-config-code-env]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [vscode]
        section_id: config-sources
        status: answered
        source_refs: [ref-roo-config-code-init, ref-roo-config-code-settingsdir, ref-roo-config-code-roodirs]
  - question_id: config.overrides
    answers:
      - surface_ids: [vscode]
        section_id: config-overrides
        status: answered
        source_refs: [ref-roo-config-code-getvalues, ref-roo-config-code-merge-commands, ref-roo-config-code-export-schema]
  - question_id: config.runtime
    answers:
      - surface_ids: [vscode]
        section_id: config-runtime
        status: answered
        source_refs: [ref-roo-config-doc-commands, ref-roo-config-code-autoimport, ref-roo-config-code-env]
  - question_id: config.trust
    answers:
      - surface_ids: [vscode]
        section_id: config-overrides
        status: partial
        source_refs: [ref-roo-config-code-merge-commands, ref-roo-config-code-rooignore]
  - question_id: config.defaults
    answers:
      - surface_ids: [vscode]
        section_id: config-defaults
        status: answered
        source_refs: [ref-roo-config-code-defaults, ref-roo-config-code-default-consts, ref-roo-config-code-manifest]
  - question_id: config.migration
    answers:
      - surface_ids: [vscode]
        section_id: config-migration
        status: answered
        source_refs: [ref-roo-config-code-migrate-yaml, ref-roo-config-code-migrate-commands, ref-roo-config-doc-import]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-roo-config-code-exportfile, ref-roo-config-code-manifest, ref-roo-config-doc-export]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 配置来源：VS Code 设置、扩展状态与项目文件 {#config-sources}

固定来源是官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`（扩展清单 `src/package.json`），本章只描述 `vscode` 界面。Roo Code 的设置分四类去处，各自路径与生效方式都不同：[@ref-roo-config-code-init][@ref-roo-config-code-storagebase][@ref-roo-config-doc-vscode]

| 来源 | 位置 | 内容 |
| :-- | :-- | :-- |
| VS Code 设置 | 用户/工作区 `settings.json` 的 `roo-cline.*` 键 | 命令白/黑名单、超时、存储路径、调试开关、`useAgentRules` 等少量键 |
| 扩展 globalState | VS Code 扩展存储（`context.globalState`） | 大部分 UI/行为偏好、`customModes`、`mcpEnabled`、`modeApiConfigs` 等 |
| 扩展 SecretStorage | `context.secrets` | 所有 API key 与 API 配置档案（见 Providers 章） |
| 项目/用户文件 | `项目根/.roo/*`、`~/.roo/*`、`.roomodes` | 模式定义、MCP server、规则、技能、自定义工具、`.rooignore` |

- **globalState 的键集合**由类型派生：`GLOBAL_STATE_KEYS` = 全部全局设置键加 provider 设置键，去掉属于 secret 的键；`initialize()` 在扩展激活时把每个键读进内存缓存，写回走 `globalState.update`。[@ref-roo-config-code-init]
- **例外**：`taskHistory` 被列入 `PASS_THROUGH_STATE_KEYS`，不经过内存缓存而直接读写 `globalState`（任务历史可能很大）。[@ref-roo-config-code-passthrough]
- **设置目录**：`getSettingsDirectoryPath(globalStorageUri.fsPath)` 返回 `globalStorage` 目录下的 `settings`；基路径可被 VS Code 设置 `roo-cline.customStoragePath` 改写（改写后连同任务历史一起迁移到新目录）。[@ref-roo-config-code-settingsdir][@ref-roo-config-code-storagebase] 全局 `mcp_settings.json` 与 `custom_modes.yaml` 就放在这个 `settings/` 目录下（见 MCP 章与自定义模式章）。
- **项目级文件**：`.roo/rules/`、`.roo/skills/`、`.roo/tools/`、`.roo/mcp.json`、`.roomodes`、`.rooignore` 都在工作区根目录；`\.roo` 目录的搜索顺序是"全局 `~/.roo` 在前、项目 `项目根/.roo` 在后"。[@ref-roo-config-code-roodirs]
- **`.rooignore`**：由 `RooIgnoreController` 用 `ignore` 库加载，并监听文件变化（`.rooignore` 自身始终被计入忽略）；除文件读写外，读文件的 shell 命令（`cat`、`grep`、`Get-Content` 等）也会被拦。[@ref-roo-config-code-rooignore][@ref-roo-config-doc-rooignore]

## 优先级、合并与信任边界 {#config-overrides}

- **内存合并**：`ContextProxy.getValues()` 返回 `{ ...globalState, ...secretState }`，键冲突时 **secret 优先**。[@ref-roo-config-code-getvalues]
- **VS Code 设置 vs 扩展状态**：只有少数键同时存在于两处。以命令白名单为例，`mergeCommandLists` 读取 `roo-cline.allowedCommands`（工作区配置）与 globalState 里的同名键，做法是**并集去重**——即工作区设置是补充而不是替换，代码注释明确写着 "Global state takes precedence over workspace configuration"。[@ref-roo-config-code-merge-commands]
- **项目文件 vs 全局文件**：三类文件都是"项目覆盖全局"且**整体覆盖**，不做字段级合并——`.roomodes` 覆盖同名全局模式、`.roo/mcp.json` 覆盖同名全局 MCP server、项目 `.roo/skills` 覆盖同名全局技能。[@ref-roo-config-code-merge-commands][@ref-roo-config-code-roodirs]
- **目录与文件的先后**：规则加载顺序为模式专有 `rules-{slug}/` → 通用 `rules/` → 单文件回退（`.roorules`、`.clinerules`），并且始终是"全局目录内容在前、项目目录内容在后"。[@ref-roo-config-doc-rules]
- **导出格式的过滤**：导出 schema 会去掉 `taskHistory`、`listApiConfigMeta`、`currentApiConfigName` 三个键，并只保留 `source === "global"` 的自定义模式——项目模式不会被写进 `roo-code-settings.json`。[@ref-roo-config-code-export-schema][@ref-roo-config-code-export]
- **信任与权限**：固定来源里没有"工作区信任"判断（没有 `workspace.isTrusted` 相关分支）。真正限制能力的是：模式的工具组与 `fileRegex`、`.rooignore`、命令白/黑名单（`roo-cline.allowedCommands`/`deniedCommands`）、以及自动批准开关。凭据读写的边界是 SecretStorage——key 不会出现在 globalState 或导出之外的设置里。[@ref-roo-config-code-merge-commands][@ref-roo-config-code-rooignore][@ref-roo-prov-doc-security]

## 运行时介入：设置文件、命令与环境变量 {#config-runtime}

- **VS Code `settings.json`**：扩展清单里声明的键都可以在用户或工作区 settings.json 里写，例如 `roo-cline.allowedCommands`（默认 `["git log","git diff","git show"]`）、`roo-cline.deniedCommands`（默认 `[]`）、`roo-cline.commandExecutionTimeout`（默认 `0`，即不超时）、`roo-cline.customStoragePath`（默认空）、`roo-cline.autoImportSettingsPath`（默认空）、`roo-cline.useAgentRules`（默认 `true`）、`roo-cline.apiRequestTimeout`（默认 `600` 秒）、`roo-cline.debug`（默认 `false`）等。[@ref-roo-config-doc-vscode][@ref-roo-config-code-manifest]
- **命令面板命令**：`roo-cline.setCustomStoragePath` 选择自定义存储目录（需重启窗口生效）、`roo-cline.importSettings` 从 JSON 文件导入设置。[@ref-roo-config-doc-commands]
- **启动时自动导入**：`roo-cline.autoImportSettingsPath` 指向一个导出的 JSON 时，每次 VS Code 启动都会自动导入；路径支持绝对路径或相对 home 的 `~` 写法，文件缺失或解析失败只警告、不阻塞激活。[@ref-roo-config-code-autoimport][@ref-roo-config-doc-autoimport]
- **环境变量**：固定来源里，扩展自身只读 `ROO_CODE_IPC_SOCKET_PATH`、`ROO_CLI_RUNTIME`、`ZDOTDIR` 等运行期变量，没有"用环境变量覆盖 API key 或设置"的路径。调试代理开启时会设置 `GLOBAL_AGENT_HTTP_PROXY`、`GLOBAL_AGENT_HTTPS_PROXY`、`GLOBAL_AGENT_NO_PROXY`，并把 `NODE_TLS_REJECT_UNAUTHORIZED` 置为 `0`（仅当 `debugProxy.tlsInsecure`）。[@ref-roo-config-code-env]
- **没有 CLI 参数或 profile 开关**：扩展的配置入口就是上面两类文件加上设置界面，不存在命令行 profile 机制。[@ref-roo-config-code-manifest]

## 默认值、功能开关与平台差异 {#config-defaults}

- **默认值不在文件里**：绝大多数默认值以 `??` 的形式在读取时兜底（例如 `autoCondenseContext ?? true`、`enableCheckpoints ?? true`、`mcpEnabled ?? true`、`mode ?? defaultModeSlug`），因此"清空某个键"等于回到默认，而不是保留上一次的值。[@ref-roo-config-code-defaults]
- **常量型默认值**：`DEFAULT_WRITE_DELAY_MS = 1000`、`DEFAULT_TERMINAL_OUTPUT_PREVIEW_SIZE = "medium"`、检查点超时 `MIN/MAX/DEFAULT = 10/60/15` 秒等定义在 `packages/types/src/global-settings.ts`。[@ref-roo-config-code-default-consts]
- **清单型默认值**：写在 `src/package.json` 的 `contributes.configuration.properties` 里（`default` 字段），设置界面的说明文字也来自这里——这是查看"某个 `roo-cline.*` 键默认值"最直接的入口。[@ref-roo-config-code-manifest]
- **功能开关**：MCP 总开关（`mcpEnabled`，默认开）、自动批准相关开关（`autoApprovalEnabled`、`alwaysAllow*`）、实验特性（`experiments`，例如自定义工具默认关）都在 globalState 里，通过设置界面切换。[@ref-roo-config-code-defaults]
- **平台差异**：固定来源里的平台差异主要出现在路径与 shell 处理（Windows 上 MCP stdio 命令经 `cmd.exe /c` 包装、终端配置项区分 PowerShell/zsh），配置键本身不随平台改变。[@ref-roo-config-doc-vscode]

## 迁移、兼容与重置 {#config-migration}

- **文件改名**：激活时把 `cline_custom_modes.json` 改名为 `custom_modes.json`、`cline_mcp_settings.json` 改名为 `mcp_settings.json`。[@ref-roo-config-code-migrate-files]
- **格式转换**：存在 `custom_modes.json` 且不存在 `custom_modes.yaml` 时，把它转成 YAML，并**保留原 JSON 文件**以便回滚；YAML 已存在则跳过。[@ref-roo-config-code-migrate-yaml]
- **安全迁移**：`migrateDefaultCommands` 把历史默认白名单里的 `npm install`、`npm test`、`tsc` 从 `allowedCommands` 中移除，用 globalState 标记 `defaultCommandsMigrationCompleted` 保证只执行一次。[@ref-roo-config-code-migrate-commands]
- **旧字段兼容**：`openAiHostHeader` 会被迁移为 `openAiHeaders`；已退役的 provider id 被清理；模型 id 迁移表 `MODEL_MIGRATIONS` 在当前提交里为空，即没有活动的模型改名规则。[@ref-roo-prov-code-model-migrations]
- **导入语义（合并而非替换）**：导入不会删除当前已有配置，只新增档案、更新同名档案与全局设置；部分档案无效时导入其余内容并给出警告，全部无效才失败。[@ref-roo-config-doc-import]
- **重置**：设置页的 Reset 会清空 API 档案（含 SecretStorage）、全局设置、自定义模式与任务历史，等于回到全新安装状态；这是不可逆操作。[@ref-roo-config-doc-reset][@ref-roo-config-code-reset]

## 诊断：查看生效值、重载与"写了不生效" {#config-diagnostics}

- **看导出内容**：设置页 Export 写出 `{ providerProfiles, globalSettings }`；导出里的 `globalSettings` 就是当前生效的非敏感设置快照（已剔除任务历史与项目模式），是核对实际值最快的办法。[@ref-roo-config-code-exportfile][@ref-roo-config-doc-export]
- **看默认与说明**：某个键的默认值和解释以 `src/package.json` 的贡献项为准，界面上则显示在设置项的说明文字里。[@ref-roo-config-code-manifest]
- **改文件后何时生效**：
  - `.roo/rules*` 与 `AGENTS.md` 每次生成系统提示时重新读取，改完对新请求生效。[@ref-roo-config-doc-rules]
  - `.rooignore` 有文件监听，改动会立即重新加载并被后续的读写与 shell 命令校验使用。[@ref-roo-config-code-rooignore]
  - `.roomodes`、`mcp_settings.json`、`.roo/mcp.json`、`SKILL.md` 都有各自的文件监听，见各专题章节。
  - VS Code `settings.json` 里的 `roo-cline.*` 键由 VS Code 的配置系统推送；`customStoragePath` 需要重启窗口才生效。[@ref-roo-config-doc-commands]
- **"文件写了但没生效"的排查顺序**：[@ref-roo-config-code-exportfile][@ref-roo-config-doc-import][@ref-roo-config-code-manifest]
  1. 确认写的是**被读取的那个文件**——globalState 里的设置不能通过编辑 JSON 文件修改，只能通过界面或 Import；能手工编辑的只有前面列出的项目/全局文件。
  2. 确认作用域：同名模式的全局定义会被 `.roomodes` 覆盖，项目 MCP 定义会覆盖全局同名 server。
  3. 确认键名与类型：导入会校验 schema，非法档案会被剔除并给警告，界面里看不到就说明没被接受。
  4. 用 Export 对比当前实际值，排除"改的是另一个工作区/另一台机器"。
- **日志入口**：`roo-cline.debug` 打开后会有更详细的调试输出；网络层问题可开 `roo-cline.debugProxy.enabled`（默认 `http://127.0.0.1:8888`）把请求导向本地代理抓包；`roo-cline.debugProxy.tlsInsecure` 用于自签证书场景。[@ref-roo-config-doc-vscode][@ref-roo-config-code-env]
