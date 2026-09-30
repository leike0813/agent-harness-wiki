---
schema_version: 3
record_kind: production
edition_id: amazon-q-cli-configuration-v1
harness_id: amazon-q
topic: configuration
title: "Amazon Q CLI 的配置机制：来源与路径、优先级、运行时覆盖、默认值、迁移与诊断"
sections:
  - section_id: config-scope
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-format-sections, ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-docs-command-line-kiro, ref-amazon-q-repo-readme-status, ref-amazon-q-repo-intro]
  - section_id: config-sources
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-agents-local, ref-amazon-q-repo-agents-global, ref-amazon-q-repo-paths-workspace, ref-amazon-q-repo-paths-global, ref-amazon-q-repo-agent-schema, ref-amazon-q-docs-mcp-config-cli, ref-amazon-q-repo-paths-settings, ref-amazon-q-repo-datadir, ref-amazon-q-repo-env-datadir, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-settings-parse, ref-amazon-q-repo-format-legacymcp, ref-amazon-q-repo-migration-intro]
  - section_id: config-overrides-runtime
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-agents-precedence, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-default-priority, ref-amazon-q-repo-settings-cli, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-env-datadir, ref-amazon-q-repo-mcp-add]
  - section_id: config-defaults-trust
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-paths-workspace, ref-amazon-q-repo-tools-execute-bash, ref-amazon-q-repo-tools-fs-write, ref-amazon-q-repo-tools-use-aws, ref-amazon-q-repo-tools-permissions, ref-amazon-q-repo-experiments-manage, ref-amazon-q-repo-experiments-settings, ref-amazon-q-docs-mcp-security-model, ref-amazon-q-docs-mcp-security-considerations, ref-amazon-q-repo-format-allowedtools]
  - section_id: config-migration
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-migration-intro, ref-amazon-q-repo-paths-global, ref-amazon-q-repo-migration-context, ref-amazon-q-repo-migration-hooks, ref-amazon-q-repo-format-legacymcp]
  - section_id: config-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amazon-q-repo-settings-cli, ref-amazon-q-repo-paths-settings, ref-amazon-q-repo-datadir, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-default-errors, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-cli-verbose]
questions:
  - question_id: config.sources
    answers:
      - surface_ids: [cli]
        section_id: config-sources
        status: answered
        source_refs: [ref-amazon-q-repo-agents-local, ref-amazon-q-repo-agents-global, ref-amazon-q-repo-paths-workspace, ref-amazon-q-repo-paths-global, ref-amazon-q-repo-paths-settings, ref-amazon-q-repo-datadir, ref-amazon-q-repo-env-datadir, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-settings-parse, ref-amazon-q-repo-format-legacymcp, ref-amazon-q-repo-agent-schema]
  - question_id: config.overrides
    answers:
      - surface_ids: [cli]
        section_id: config-overrides-runtime
        status: partial
        source_refs: [ref-amazon-q-repo-agents-precedence, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-default-priority]
  - question_id: config.runtime
    answers:
      - surface_ids: [cli]
        section_id: config-overrides-runtime
        status: partial
        source_refs: [ref-amazon-q-repo-settings-cli, ref-amazon-q-repo-settings-keys, ref-amazon-q-repo-env-datadir, ref-amazon-q-repo-default-priority, ref-amazon-q-repo-mcp-add]
  - question_id: config.trust
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-trust
        status: partial
        source_refs: [ref-amazon-q-docs-mcp-security-model, ref-amazon-q-docs-mcp-security-considerations, ref-amazon-q-repo-format-allowedtools]
  - question_id: config.defaults
    answers:
      - surface_ids: [cli]
        section_id: config-defaults-trust
        status: partial
        source_refs: [ref-amazon-q-repo-default-builtin, ref-amazon-q-repo-tools-execute-bash, ref-amazon-q-repo-tools-fs-write, ref-amazon-q-repo-tools-use-aws, ref-amazon-q-repo-tools-permissions, ref-amazon-q-repo-experiments-manage, ref-amazon-q-repo-experiments-settings]
  - question_id: config.migration
    answers:
      - surface_ids: [cli]
        section_id: config-migration
        status: answered
        source_refs: [ref-amazon-q-repo-migration-intro, ref-amazon-q-repo-migration-context, ref-amazon-q-repo-migration-hooks, ref-amazon-q-repo-format-legacymcp, ref-amazon-q-repo-paths-global]
  - question_id: config.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: config-diagnostics
        status: partial
        source_refs: [ref-amazon-q-repo-settings-cli, ref-amazon-q-repo-paths-settings, ref-amazon-q-repo-agents-conflict, ref-amazon-q-repo-default-errors, ref-amazon-q-repo-slash-commands, ref-amazon-q-repo-root-subcommands, ref-amazon-q-repo-cli-verbose]
---

## 固定来源与适用范围 {#config-scope}

本章的固定来源是官方仓库 `aws/amazon-q-developer-cli`（提交 `15cc8f3cd18c4272925ce1c7053268eedff1ea0a`）的登记文档与源码，以及 AWS 官方用户指南的 CLI/MCP 页面 [@ref-amazon-q-repo-format-sections][@ref-amazon-q-docs-mcp-config-cli]。

AWS 用户指南写明 Q CLI 已变为 Kiro CLI [@ref-amazon-q-docs-command-line-kiro]；仓库 README 写明项目不再积极维护、Q Developer CLI 以闭源 Kiro CLI 继续提供 [@ref-amazon-q-repo-readme-status]；仓库 `docs/` 自述描述开发构建 [@ref-amazon-q-repo-intro]。全章为来源级知识，只覆盖 `cli` 界面。

## 配置来源与路径 {#config-sources}

**config.sources**：CLI 的配置分三处。

其一，**agent 配置文件**（JSON）。工作区级在当前目录的 `.amazonq/cli-agents/`，用户级在 `~/.aws/amazonq/cli-agents/`；文件名（去掉 `.json`）即 agent 名 [@ref-amazon-q-repo-agents-local][@ref-amazon-q-repo-agents-global]。这两个目录在源码里是固定常量 `.amazonq/cli-agents` 与 `.aws/amazonq/cli-agents` [@ref-amazon-q-repo-paths-workspace][@ref-amazon-q-repo-paths-global]。agent 文件的结构由 `schemas/agent-v1.json` 定义 [@ref-amazon-q-repo-agent-schema]。AWS 文档把 CLI 的全局配置位置写作 `~/.aws/amazonq/cli-agents` 目录 [@ref-amazon-q-docs-mcp-config-cli]。

其二，**settings 文件**。源码中的路径是 `dirs::data_local_dir()/amazon-q/settings.json`（Linux 上即 `~/.local/share/amazon-q/settings.json`） [@ref-amazon-q-repo-paths-settings]；同一数据目录由 `dirs::data_local_dir()/amazon-q` 计算，若设置了环境变量 `Q_CLI_DATA_DIR` 则改用该值 [@ref-amazon-q-repo-datadir][@ref-amazon-q-repo-env-datadir]。

设置文件里可写的键在源码中是完整可枚举的，键名映射为：`telemetry.enabled`、`telemetryClientId`、`codeWhisperer.shareCodeWhispererContentWithAWS`、`chat.enableThinking`、`chat.enableKnowledge`、`knowledge.defaultIncludePatterns`、`knowledge.defaultExcludePatterns`、`knowledge.maxFiles`、`knowledge.chunkSize`、`knowledge.chunkOverlap`、`knowledge.indexType`、`chat.skimCommandKey`、`chat.autocompletionKey`、`chat.enableTangentMode`、`chat.tangentModeKey`、`chat.delegateModeKey`、`introspect.tangentMode`、`chat.greeting.enabled`、`api.timeout`、`chat.editMode`、`chat.enableNotifications`、`api.codewhisperer.service`、`api.q.service`、`mcp.initTimeout`、`mcp.noInteractiveTimeout`、`mcp.loadedBefore`、`chat.defaultModel`、`chat.disableMarkdownRendering`、`chat.defaultAgent`、`chat.disableAutoCompaction`、`chat.enableHistoryHints`、`chat.enableTodoList`、`chat.enableCheckpoint`、`chat.enableContextUsageIndicator`、`chat.enableDelegate`、`chat.uiMode` [@ref-amazon-q-repo-settings-keys]。解析表里同为这些键名；注意 `TryFrom` 的解析分支没有收录 `chat.delegateModeKey` 与 `chat.enableDelegate`，与键名映射表略有出入 [@ref-amazon-q-repo-settings-parse]。注册来源只解释了其中一部分键的语义（知识库、MCP 初始化超时、默认 agent、部分实验开关），其余键名可以确定、用途与默认值在登记来源中没有说明，读者不要臆测默认值。

其三，**legacy MCP 配置** `~/.aws/amazonq/mcp.json`（全局）与 `.amazonq/mcp.json`（工作区），当 agent 的 `useLegacyMcpJson` 为 `true` 时一并加载 [@ref-amazon-q-repo-paths-global][@ref-amazon-q-repo-paths-workspace][@ref-amazon-q-repo-format-legacymcp]。

已废弃的第四处是旧 profile 目录 `~/.aws/amazonq/profiles`，其内容在首次启动时迁移到全局 agent 目录 [@ref-amazon-q-repo-paths-global][@ref-amazon-q-repo-migration-intro]。

## 优先级与运行时覆盖 {#config-overrides-runtime}

**config.overrides**：agent 层的顺序是"先本地后全局"，同名本地胜出并打印 `WARNING: Agent conflict for NAME. Using workspace version.` [@ref-amazon-q-repo-agents-precedence][@ref-amazon-q-repo-agents-conflict]。会话开始时 agent 的选择顺序是 `--agent NAME` → 设置 `chat.defaultAgent` → 内置默认 [@ref-amazon-q-repo-default-priority]。缺口：settings 与 agent 配置在重叠语义上的优先级（例如 agent 的 `model` 与设置键 `chat.defaultModel` 谁生效）没有在登记来源中说明，merger/替换规则也没有文档，按 partial 记录。

**config.runtime**：运行时写入设置的方式是 `q settings KEY VALUE`，读取单个键是 `q settings KEY`，删除键用 `--delete`；`q settings open` 打开设置文件，`q settings list --all` 列出全部设置 [@ref-amazon-q-repo-settings-cli][@ref-amazon-q-repo-settings-keys]。环境变量 `Q_CLI_DATA_DIR` 改写数据目录，从而改写 settings 文件位置 [@ref-amazon-q-repo-env-datadir]。会话级参数 `--agent NAME` 覆盖默认 agent 选择 [@ref-amazon-q-repo-default-priority]。`q mcp add` 会根据 `--agent`/`--scope` 决定写入 agent 配置还是 legacy `mcp.json` [@ref-amazon-q-repo-mcp-add]。缺口：登记来源没有给出"命令行参数覆盖设置文件"的一般规则，也没有 profile 与文件配置的关系说明，按 partial 记录。

## 默认值与信任边界 {#config-defaults-trust}

**config.defaults**：内置默认 agent 的配置是固定的——`tools` 为 `["*"]`、`allowedTools` 为 `["fs_read"]`、默认资源为 `file://AmazonQ.md`、`file://AGENTS.md`、`file://README.md`（以及文档版默认 agent 中列出的 `.amazonq/rules/**/*.md`）、`useLegacyMcpJson` 为 true [@ref-amazon-q-repo-default-builtin][@ref-amazon-q-repo-paths-workspace]。工具级默认值写在 built-in tools 文档里：`execute_bash` 的 `allowedCommands`/`deniedCommands` 默认空数组、`autoAllowReadonly` 与 `denyByDefault` 默认 false [@ref-amazon-q-repo-tools-execute-bash]；`fs_write` 的 `allowedPaths`/`deniedPaths` 默认空数组 [@ref-amazon-q-repo-tools-fs-write]；`use_aws` 的 `allowedServices`/`deniedServices` 默认空数组、`autoAllowReadonly` 默认 false [@ref-amazon-q-repo-tools-use-aws]。默认权限行为：`fs_read` 与 `report_issue` 默认受信，`execute_bash`、`fs_write`、`use_aws` 默认每次询问 [@ref-amazon-q-repo-tools-permissions]。实验特性默认关闭，需要 `/experiment` 打开并持久化为设置 [@ref-amazon-q-repo-experiments-manage][@ref-amazon-q-repo-experiments-settings]。缺口：登记来源没有说明各平台的默认路径差异细节（只给出 `dirs::data_local_dir` 与 home 的推导），按 partial 记录。

**config.trust**：与配置生效相关的信任机制是**工具授权**而不是项目信任提示——AWS 官方文档把 MCP 安全模型总结为显式授权、本地执行、每个 server 独立进程、可审计 [@ref-amazon-q-docs-mcp-security-model][@ref-amazon-q-docs-mcp-security-considerations]。工具只有在 `allowedTools` 命中或 `toolsSettings` 放行时才免确认，`allowedTools` 匹配区分大小写、精确匹配优先 [@ref-amazon-q-repo-format-allowedtools]。缺口：登记来源没有给出"项目不受信则忽略项目配置"这一类的信任开关，也没有组织策略下发配置的说明，按 partial 记录。

## 迁移与兼容 {#config-migration}

**config.migration**：旧 profile（`~/.aws/amazonq/profiles/`）在首次启动时自动迁移为全局 agent [@ref-amazon-q-repo-migration-intro][@ref-amazon-q-repo-paths-global]。旧的 `~/.aws/amazonq/global_context.json` 不再受支持，内容需要手工搬进 agent [@ref-amazon-q-repo-migration-intro]。旧 profile 的 `"paths"` 上下文数组迁移为 agent 的 `resources`，格式从普通路径改为 `file://` URI [@ref-amazon-q-repo-migration-context]。hook 触发器改名（`conversation_start` 到 `agentSpawn`、`per_prompt` 到 `userPromptSubmit`），hook 名不再是必填项 [@ref-amazon-q-repo-migration-hooks]。legacy `mcp.json` 通过 `useLegacyMcpJson` 继续兼容 [@ref-amazon-q-repo-format-legacymcp]。

## 诊断 {#config-diagnostics}

**config.diagnostics**：`q settings KEY` 打印该键当前值，`q settings list --all` 列出全部设置项与当前值，`q settings open` 打开设置文件 [@ref-amazon-q-repo-settings-cli]；settings 文件路径可由源码推导为数据目录下的 `amazon-q/settings.json` [@ref-amazon-q-repo-paths-settings][@ref-amazon-q-repo-datadir]；agent 同名冲突会打印 warning [@ref-amazon-q-repo-agents-conflict]，agent 找不到会打印回退错误 [@ref-amazon-q-repo-default-errors]；会话内 `/agent list`、`/context`、`/tools`、`/hooks` 查看当前生效的 agent 与其上下文、工具、hook [@ref-amazon-q-repo-slash-commands]；`q diagnostic` 运行诊断测试 [@ref-amazon-q-repo-root-subcommands]；`q -v` 到 `q -vvv` 提高日志级别 [@ref-amazon-q-repo-cli-verbose]。

缺口：没有"某个键实际来自哪个文件"的专用命令，也没有说明修改设置或 agent 文件后是否需要重启会话才生效；按 partial 记录。
