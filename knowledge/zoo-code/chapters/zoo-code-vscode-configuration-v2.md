---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-configuration-v2
harness_id: zoo-code
topic: configuration
title: "Zoo Code VS Code 扩展的配置机制：来源、优先级、迁移与诊断"
sections:
  - section_id: config-sources
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-extension-config, ref-zoo-code-src-context-proxy, ref-zoo-code-src-provider-secrets, ref-zoo-code-src-storage-paths, ref-zoo-code-src-package-identity, ref-zoo-code-src-mcp-global-path, ref-zoo-code-src-global-file-names, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-rules-global, ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-docs-mcp-config, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-activation, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-blanket-deny-schema, ref-zoo-code-src-auto-deny-ui, ref-zoo-code-src-blanket-deny-schema, ref-zoo-code-src-auto-deny-ui]
  - section_id: config-overrides
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-modes-precedence, ref-zoo-code-docs-mcp-config, ref-zoo-code-docs-rules-combined, ref-zoo-code-docs-rules-global, ref-zoo-code-docs-rules-notes, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-agents-md, ref-zoo-code-src-extension-config, ref-zoo-code-src-mdm, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-src-marketplace-install]
  - section_id: config-runtime
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-profiles-modes, ref-zoo-code-docs-settings-commands, ref-zoo-code-src-extension-config, ref-zoo-code-docs-settings-autoimport, ref-zoo-code-docs-mcp-config, ref-zoo-code-src-package-identity, ref-zoo-code-src-extension-activation, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-blanket-deny-schema, ref-zoo-code-src-blanket-deny-default, ref-zoo-code-src-auto-deny-blanket-branch, ref-zoo-code-src-auto-deny-detail, ref-zoo-code-src-blanket-deny-schema, ref-zoo-code-src-blanket-deny-default, ref-zoo-code-src-auto-deny-blanket-branch, ref-zoo-code-src-auto-deny-detail]
  - section_id: config-defaults
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-extension-config, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-experiments, ref-zoo-code-src-provider-profiles, ref-zoo-code-docs-settings-reset, ref-zoo-code-src-context-proxy, ref-zoo-code-src-blanket-deny-default, ref-zoo-code-src-auto-deny-ui, ref-zoo-code-src-blanket-deny-default, ref-zoo-code-src-auto-deny-ui]
  - section_id: config-migration
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-modes-migration, ref-zoo-code-src-modes-parse, ref-zoo-code-src-provider-profiles, ref-zoo-code-src-router-removal, ref-zoo-code-src-roo-history-import, ref-zoo-code-docs-settings-import]
  - section_id: config-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-storage-paths, ref-zoo-code-src-context-proxy, ref-zoo-code-docs-settings-commands, ref-zoo-code-docs-settings-autoimport, ref-zoo-code-docs-modes-trouble, ref-zoo-code-src-mcp-global-watch, ref-zoo-code-docs-settings-export, ref-zoo-code-docs-settings-import, ref-zoo-code-src-modes-parse, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-src-auto-deny-reasons, ref-zoo-code-src-auto-deny-guard-unavailable, ref-zoo-code-src-auto-deny-reasons, ref-zoo-code-src-auto-deny-guard-unavailable]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [vscode]
        section_id: config-sources
        status: answered
        source_refs: [ref-zoo-code-src-extension-config, ref-zoo-code-src-context-proxy, ref-zoo-code-src-provider-secrets, ref-zoo-code-src-storage-paths, ref-zoo-code-src-package-identity, ref-zoo-code-src-mcp-global-path, ref-zoo-code-src-global-file-names, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-rules-global, ref-zoo-code-docs-custom-tools-dirs, ref-zoo-code-docs-mcp-config, ref-zoo-code-src-mdm, ref-zoo-code-src-extension-activation, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-blanket-deny-schema, ref-zoo-code-src-auto-deny-ui]
  - question_id: config.overrides
    answers:
      - surface_ids: [vscode]
        section_id: config-overrides
        status: answered
        source_refs: [ref-zoo-code-docs-modes-precedence, ref-zoo-code-docs-mcp-config, ref-zoo-code-docs-rules-combined, ref-zoo-code-docs-rules-global, ref-zoo-code-docs-rules-notes, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-agents-md, ref-zoo-code-src-extension-config, ref-zoo-code-src-mdm, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-src-marketplace-install]
  - question_id: config.runtime
    answers:
      - surface_ids: [vscode]
        section_id: config-runtime
        status: partial
        source_refs: [ref-zoo-code-docs-profiles-modes, ref-zoo-code-docs-settings-commands, ref-zoo-code-src-extension-config, ref-zoo-code-docs-settings-autoimport, ref-zoo-code-docs-mcp-config, ref-zoo-code-src-package-identity, ref-zoo-code-src-extension-activation, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-blanket-deny-schema, ref-zoo-code-src-blanket-deny-default, ref-zoo-code-src-auto-deny-blanket-branch, ref-zoo-code-src-auto-deny-detail]
  - question_id: config.trust
    answers:
      - surface_ids: [vscode]
        section_id: config-overrides
        status: partial
        source_refs: [ref-zoo-code-docs-modes-precedence, ref-zoo-code-docs-mcp-config, ref-zoo-code-docs-rules-combined, ref-zoo-code-docs-rules-global, ref-zoo-code-docs-rules-notes, ref-zoo-code-docs-modes-instructions, ref-zoo-code-docs-agents-md, ref-zoo-code-src-extension-config, ref-zoo-code-src-mdm, ref-zoo-code-docs-auto-approve, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-src-marketplace-install]
  - question_id: config.defaults
    answers:
      - surface_ids: [vscode]
        section_id: config-defaults
        status: partial
        source_refs: [ref-zoo-code-src-extension-config, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-experiments, ref-zoo-code-src-provider-profiles, ref-zoo-code-docs-settings-reset, ref-zoo-code-src-context-proxy, ref-zoo-code-src-blanket-deny-default, ref-zoo-code-src-auto-deny-ui]
  - question_id: config.migration
    answers:
      - surface_ids: [vscode]
        section_id: config-migration
        status: answered
        source_refs: [ref-zoo-code-docs-modes-migration, ref-zoo-code-src-modes-parse, ref-zoo-code-src-provider-profiles, ref-zoo-code-src-router-removal, ref-zoo-code-src-roo-history-import, ref-zoo-code-docs-settings-import]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: config-diagnostics
        status: answered
        source_refs: [ref-zoo-code-src-storage-paths, ref-zoo-code-src-context-proxy, ref-zoo-code-docs-settings-commands, ref-zoo-code-docs-settings-autoimport, ref-zoo-code-docs-modes-trouble, ref-zoo-code-src-mcp-global-watch, ref-zoo-code-docs-settings-export, ref-zoo-code-docs-settings-import, ref-zoo-code-src-modes-parse, ref-zoo-code-docs-marketplace-trouble, ref-zoo-code-src-auto-deny-reasons, ref-zoo-code-src-auto-deny-guard-unavailable]
---

本章采写 Zoo Code 的配置机制：配置从哪些入口读取、作用域之间如何取舍、运行时如何介入、默认值从哪来、旧格式如何迁移，以及“文件写了却不生效”怎么查。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` 上的 `src/package.json`、`src/core/config/`、`src/utils/storage.ts`、`src/services/mdm/`、`src/shared/`，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的 `docs/features/settings-management.md`、`docs/features/custom-instructions.md` 与 `docs/features/custom-modes.mdx`。命令自动批准相关的结论另外固定在 Zoo-Code 仓库 commit `72143527fd33306e5541116093c2cbf803cce9e0` 的 `packages/types/src/global-settings.ts`、`src/core/auto-approval/` 与 `webview-ui/src/components/settings/AutoApproveSettings.tsx`。

## 配置来源与位置 {#config-sources}

Zoo Code 同时使用四类存储，各自负责不同的配置维度：

| 来源 | 内容 | 位置 |
| --- | --- | --- |
| VS Code 设置 | 命令白名单/黑名单、超时、存储路径、索引、调试代理等开关 | 用户或工作区 `settings.json`，键前缀在扩展清单里是 `zoo-code.*` [@ref-zoo-code-src-extension-config] |
| 扩展 globalState | 界面与全局偏好（由 `ContextProxy` 统一读写并缓存）；包括只定义在类型 schema 里、不进扩展清单 `contributes.configuration` 的全局开关，例如 `alwaysDenyUnapprovedCommands` | VS Code 扩展的 globalState [@ref-zoo-code-src-context-proxy] [@ref-zoo-code-src-blanket-deny-schema] |
| VS Code SecretStorage | API 配置档案（含密钥） | 键 `roo_cline_config_api_config` [@ref-zoo-code-src-provider-secrets] |
| 文件系统 | 模式、MCP、规则、技能、工具等可版本控制的配置 | 扩展存储目录 `settings/` 与工作区 `.roo/`、`.roomodes` 等 [@ref-zoo-code-src-storage-paths] |

- 扩展存储根目录默认是 VS Code 的扩展全局存储路径，可用清单里的 `zoo-code.customStoragePath`（官方文档写作 `roo-cline.customStoragePath`）改成任意目录；读取时用的是扩展自身的配置段名，`settings/`、`tasks/`、`cache/` 都建在这个根目录下 [@ref-zoo-code-src-storage-paths] [@ref-zoo-code-src-package-identity] [@ref-zoo-code-src-extension-config]。全局的 `mcp_settings.json` 与 `custom_modes.yaml` 就放在 `settings/` 里 [@ref-zoo-code-src-mcp-global-path] [@ref-zoo-code-src-global-file-names]。
- 工作区侧的项目文件：`.roomodes`（模式）、`.roo/mcp.json`（MCP）、`.roo/rules/` 与 `.roo/rules-{slug}/`（规则）、`.roo/skills[-{mode}]/`（技能）、`.roo/tools/`（自定义工具）、根目录 `.roorules` / `.roorules-{slug}`（单文件回退）、`AGENTS.md` [@ref-zoo-code-docs-modes-instructions] [@ref-zoo-code-docs-rules-global] [@ref-zoo-code-docs-custom-tools-dirs] [@ref-zoo-code-docs-mcp-config]。
- 组织级策略来自 MDM 配置文件：Linux 为 `/etc/roo-code/mdm.json`，macOS 为 `/Library/Application Support/RooCode/mdm.json`，Windows 为 `%ProgramData%\RooCode\mdm.json`（非生产构建读 `mdm.dev.json`）[@ref-zoo-code-src-mdm]。
- 扩展在 `onStartupFinished` 时激活，上述文件型配置在激活后加载 [@ref-zoo-code-src-extension-activation]。
- 判断某个开关属于哪一层，先看它是否出现在扩展清单的 `contributes.configuration` 里：不在清单里的全局开关（如 `alwaysDenyUnapprovedCommands`）只定义在 `globalSettingsSchema` 中，只能经设置界面写入 globalState，往 `settings.json` 里加同名字段不会有任何效果 [@ref-zoo-code-src-blanket-deny-schema] [@ref-zoo-code-src-auto-deny-ui]。

键名前缀存在来源分歧：官方文档的 VS Code 设置一节仍以 `roo-cline.*` 书写（改名遗留），而固定 commit 的扩展清单声明的是 `zoo-code.*` [@ref-zoo-code-docs-settings-vscode] [@ref-zoo-code-src-extension-config]。按本文固定来源，实际生效的键名以扩展清单为准；文档键名可视为旧命名，遇到“搜索不到该设置项”时以清单中的键名为准。

## 作用域优先级、合并规则与信任边界 {#config-overrides}

- 模式配置：项目 `.roomodes` 完全覆盖同名 slug 的全局模式，不合并字段；全局内部 `custom_modes.yaml` 优先于 `custom_modes.json`，两者都没有才用内置默认 [@ref-zoo-code-docs-modes-precedence]。
- MCP 配置：同名 server 由项目 `.roo/mcp.json` 覆盖全局 `mcp_settings.json` [@ref-zoo-code-docs-mcp-config]。
- 规则文本不是“谁赢谁生效”，而是**全量聚合**：全局与工作区的规则目录都会被读取，模式专属规则先于通用规则，工作区规则在与全局冲突时优先 [@ref-zoo-code-docs-rules-combined] [@ref-zoo-code-docs-rules-global]。
- 目录/文件回退规则：`.roo/rules-{slug}/` 目录存在且非空时忽略根目录的 `.roorules-{slug}`；通用规则同理（`.roo/rules/` 优先于 `.roorules`）[@ref-zoo-code-docs-rules-notes] [@ref-zoo-code-docs-modes-instructions]。
- AGENTS.md 按 `useAgentRules`（默认开启）自动加载，位于工作区根，位置在模式专属规则与 `.rooignore` 之后、通用规则之前 [@ref-zoo-code-docs-agents-md]。
- 对象型配置（如设置里的 `vsCodeLmModelSelector`、`debugProxy` 子项）由 VS Code 自身的设置机制按键合并，本产品不额外定义数组/空值合并语义；固定来源没有给出“删除标记”类语法 [@ref-zoo-code-src-extension-config]。

- 组织策略经 MDM 文件施加，字段只有两个：`requireCloudAuth`（是否要求登录云端）与 `organizationId`（限制到某个组织）；合规检查在未登录/组织不匹配时给出不合规原因 [@ref-zoo-code-src-mdm]。
- MDM 配置是只读的部署侧文件，不通过 VS Code 设置暴露，用户配置无法覆盖它；它约束的是“必须登录受管组织”而不是限制具体配置键 [@ref-zoo-code-src-mdm]。
- 安全相关的用户侧开关集中在自动批准：这些设置跳过确认提示，直接给模型文件系统与命令访问权限，官方要求只对完全信任的操作开启 [@ref-zoo-code-docs-auto-approve]。
- 写配置文件时的保护：marketplace 安装/卸载在目标配置存在语法错误时会拒绝改写，避免覆盖用户内容 [@ref-zoo-code-docs-marketplace-trouble] [@ref-zoo-code-src-marketplace-install]。
- VS Code 工作区信任（Workspace Trust）对上述文件型配置读取的影响，固定来源没有说明；本文只确认了 MDM 这一条组织策略路径 [@ref-zoo-code-src-mdm]。

## 运行时介入方式 {#config-runtime}

- 命令行参数与 profile：Zoo Code 作为 VS Code 扩展没有自己的 CLI 参数；接近 “profile” 的概念是 **API 配置档案**，它由设置面板管理并可按模式绑定，属于运行时选择而非文件覆盖 [@ref-zoo-code-docs-profiles-modes]。
- 命令面板命令是运行时改配置的主要入口：`setCustomStoragePath`（修改存储目录，需重启 VS Code 生效）与 `importSettings`（从 JSON 导入设置），两者等价于设置页上的按钮；文档以 `roo-cline.` 前缀书写这两个命令，固定 commit 的清单里命令 id 前缀是 `zoo-code.` [@ref-zoo-code-docs-settings-commands] [@ref-zoo-code-src-extension-config]。
- 启动时自动导入：`autoImportSettingsPath` 指向一个 JSON 配置，每次启动自动导入；非绝对路径按 home 解析 [@ref-zoo-code-docs-settings-autoimport]。
- 环境变量的作用面很窄：MCP server 的 `args` 支持 `${env:变量名}` 展开，用于把系统环境里的密钥传进 server 进程 [@ref-zoo-code-docs-mcp-config]；打包阶段 `PKG_NAME`、`PKG_VERSION`、`PKG_OUTPUT_CHANNEL`、`PKG_RELEASE_CHANNEL` 可以在构建时覆盖清单值，但那是构建期而非运行期配置 [@ref-zoo-code-src-package-identity]。
- 固定来源没有提供“用环境变量覆盖任意配置项”的机制，也没有 Zoo Code 自己的 CLI 子命令 [@ref-zoo-code-src-extension-activation] [@ref-zoo-code-docs-settings-vscode]。
- 命令自动批准在运行时可以完全不再打断会话：全局开关 `alwaysDenyUnapprovedCommands` 打开后，凡是没有被显式自动批准的命令都不再弹确认框，而是直接判定为拒绝 [@ref-zoo-code-src-blanket-deny-schema] [@ref-zoo-code-src-auto-deny-blanket-branch]。该开关只在命令自动批准已经生效（`autoApprovalEnabled` 与 `alwaysAllowExecute` 都开）时才起作用，单独打开它不会改变任何行为 [@ref-zoo-code-src-blanket-deny-default]。
- 打开后被拒绝的命令会带着结构化原因回到模型侧，原因是分类枚举而不是一句泛化文案：命中拒绝前缀、未在白名单、含 shell 展开、shell 语法错误、DCG 拦截，以及守卫未给出结论 [@ref-zoo-code-src-auto-deny-detail] [@ref-zoo-code-src-auto-deny-blanket-branch]。

## 默认值、功能开关与重置 {#config-defaults}

- VS Code 设置的默认值来自扩展清单的 `contributes.configuration`：例如 `allowedCommands` 默认 `["git log", "git diff", "git show"]`、`deniedCommands` 空数组、`commandExecutionTimeout` 0（不超时）、`apiRequestTimeout` 600 秒、`enableCodeActions` 与 `useAgentRules` 为 true、`customStoragePath` 与 `autoImportSettingsPath` 为空串、`debugProxy.enabled` 为 false、`workspace.rootResolution` 默认 `activeEditor` 且作用域是 `machine` [@ref-zoo-code-src-extension-config] [@ref-zoo-code-docs-settings-vscode]。
- 实验开关默认全部关闭：`preventFocusDisruption`、`imageGeneration`、`runSlashCommand`、`customTools`、`parallelToolExecution` 的初始 enabled 都是 false，需要在设置里显式打开 [@ref-zoo-code-src-experiments]。
- 全新安装时的档案默认值：当前档案名为 `default`，包含一个默认档案 id，并把各模式都绑定到该默认档案；迁移标记在全新安装时直接置为已完成 [@ref-zoo-code-src-provider-profiles]。
- Reset 会把所有 API 配置档案（含 SecretStorage 中的密钥）、全局设置、自定义模式与任务历史恢复到初始状态，操作不可撤销 [@ref-zoo-code-docs-settings-reset]。
- 固定来源没有集中列出扩展 globalState 里所有全局设置的默认值（它们定义在类型 schema 中，而非清单里）；需要精确默认值时应以 Reset 后的运行时表现为准 [@ref-zoo-code-src-context-proxy] [@ref-zoo-code-docs-settings-reset]。较新的全局开关在类型层显式给出默认值，例如 `DEFAULT_ALWAYS_DENY_UNAPPROVED_COMMANDS = false`，即默认仍弹确认、不自动拒绝 [@ref-zoo-code-src-blanket-deny-default]。
- 命令自动批准一节的界面里，`alwaysDenyUnapprovedCommands` 是一个独立复选框，来源注释说明它在 Destructive Command Guard 的两种模式下都可见，用于在手不离开键盘的场景里取代隐藏的命令白/黑名单 [@ref-zoo-code-src-auto-deny-ui]。

## 迁移与兼容 {#config-migration}

- 全局模式文件：启动时若只有 `custom_modes.json`，会转成 `custom_modes.yaml` 并保留原文件以便回滚；`.roomodes` 不自动迁移，只在通过 UI 编辑时写成 YAML [@ref-zoo-code-docs-modes-migration]。
- 配置文件解析格式：`.roomodes` 先按 YAML 解析，失败再按 JSON 解析；解析失败会报错并保留原文件内容 [@ref-zoo-code-src-modes-parse]。
- provider 档案带一组迁移标记（速率限制、OpenAI 头、连续错误上限、todo 开关、Claude Code 旧设置、router provider 等）；已迁移的标记在全新安装时直接置位，避免重复迁移 [@ref-zoo-code-src-provider-profiles]。
- 被移除的旧服务：Roo Code Router provider 已下线，导入这种档案时会被降级并提示需要重新配置 [@ref-zoo-code-src-router-removal]。
- 从 Roo Code 迁移：宿主可以导入 Roo 扩展（域 `RooVeterinaryInc.roo-cline`）的历史任务，把 `history_item.json`、`ui_messages.json`、`api_conversation_history.json`、`task_metadata.json` 复制到 Zoo 的存储目录 [@ref-zoo-code-src-roo-history-import]。
- 设置导入是合并语义：新增档案、更新同名档案与全局设置，但不删除文件中缺失的现有配置；部分档案无效时导入其余并报告警告，只有全部无效才失败 [@ref-zoo-code-docs-settings-import]。

## 诊断：文件写了为什么不生效 {#config-diagnostics}

- 先确认配置属于哪一层：VS Code 设置（`settings.json`）、扩展 globalState/SecretStorage、扩展存储目录下的 `settings/`，还是工作区 `.roo/` 文件；不同层的生效方式不同 [@ref-zoo-code-src-storage-paths] [@ref-zoo-code-src-context-proxy]。
- 自定义存储目录不可用时会有明确提示并回退到默认路径，因此“配置写到旧目录”是被支持的行为而不是静默失败 [@ref-zoo-code-src-storage-paths]；修改存储目录需要重启 VS Code 才生效 [@ref-zoo-code-docs-settings-commands]。
- 自动导入失败只给警告、不阻塞启动，扩展继续使用上次的设置 [@ref-zoo-code-docs-settings-autoimport]。
- 文件型配置大多有监视器即时重载：MCP 的全局/项目配置与技能目录都是如此；模式配置另有监视器处理 `.roomodes` 的增删改，模式未出现在选择器时才需要重载窗口 [@ref-zoo-code-docs-modes-trouble] [@ref-zoo-code-src-mcp-global-watch]。
- 需要审计“到底有哪些设置”时，用设置页的 Export 导出 JSON：它包含全部 API 档案与全局设置（含明文密钥），可用来比对实际值；Import 则按合并语义回灌 [@ref-zoo-code-docs-settings-export] [@ref-zoo-code-docs-settings-import]。
- 报错定位：模式文件解析失败会弹出带行号的 YAML 错误，且不会覆盖原文件；marketplace 也会在配置损坏时拒绝写入 [@ref-zoo-code-src-modes-parse] [@ref-zoo-code-docs-marketplace-trouble]。
- “命令为什么被自动拒绝”与配置是否生效是两件事：这类拒绝会带回具体的分类原因文本，例如指明匹配到的拒绝前缀，或说明命令含永不自动批准的 shell 展开 [@ref-zoo-code-src-auto-deny-reasons]。
- 开了 Destructive Command Guard 却看到拒绝、且原因文本说明守卫没有给出任何结论时，那是守卫状态不一致而不是策略判定；来源明确把这种情况标为可重试，并说明它不会中止本轮其余工具调用 [@ref-zoo-code-src-auto-deny-guard-unavailable]。这类情况在导出设置里表现为 `destructiveCommandGuardEnabled` 为开而命令未落入任何列表。
