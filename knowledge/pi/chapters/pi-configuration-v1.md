---
schema_version: 2
record_kind: production
edition_id: pi-configuration-v1
harness_id: pi
topic: configuration
title: Pi 配置机制：文件、覆盖与迁移（固定源码 781152f）
sections:
  - section_id: config-sources
    source_refs:
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-providers-auth
      - ref-pi-models-json
      - ref-pi-settings-defaults
      - ref-pi-settings-shell
  - section_id: config-overrides
    source_refs:
      - ref-pi-settings-overrides
      - ref-pi-packages-dedupe
      - ref-pi-settings-resources
  - section_id: config-runtime
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-settings-sessions
      - ref-pi-settings-offline
      - ref-pi-readme-philosophy
      - ref-pi-subagent-security
  - section_id: config-migration
    source_refs:
      - ref-pi-settings-migration
      - ref-pi-migrations-code
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-models-reload
      - ref-pi-ext-reload
questions:
  - question_id: config.sources
    section_id: config-sources
    status: answered
    source_refs:
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-providers-auth
      - ref-pi-models-json
  - question_id: config.overrides
    section_id: config-overrides
    status: answered
    source_refs:
      - ref-pi-settings-overrides
      - ref-pi-packages-dedupe
      - ref-pi-settings-resources
  - question_id: config.runtime
    section_id: config-runtime
    status: partial
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-settings-sessions
      - ref-pi-settings-offline
  - question_id: config.trust
    section_id: config-runtime
    status: partial
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-subagent-security
  - question_id: config.defaults
    section_id: config-sources
    status: answered
    source_refs:
      - ref-pi-settings-defaults
      - ref-pi-settings-resources
      - ref-pi-settings-shell
  - question_id: config.migration
    section_id: config-migration
    status: answered
    source_refs:
      - ref-pi-settings-migration
      - ref-pi-migrations-code
  - question_id: config.diagnostics
    section_id: config-migration
    status: partial
    source_refs:
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-models-reload
      - ref-pi-ext-reload
body: |-
  固定来源把 Pi 配置分成全局与项目两个 JSON 文件，另有独立的 auth.json 与 models.json。以下机制来自文档与固定源码，未做隔离运行观察。

  ## 配置入口 {#config-sources}

  **config.sources**：文件配置分两层：全局 `~/.pi/agent/settings.json` 与项目 `.pi/settings.json`（以当前目录为准）。[@ref-pi-settings-overview] 独立的 `~/.pi/agent/auth.json` 存凭据，`~/.pi/agent/models.json` 存 provider 与模型；资源路径字段见 Resources 段。[@ref-pi-providers-auth][@ref-pi-models-json][@ref-pi-settings-resources] 固定来源没有组织级或工作区级配置入口，这一点是本地缺口。

  **config.defaults**：默认值随设置表给出（如 theme 默认 dark、retry.enabled 默认 true、compaction.enabled 默认 true、defaultThinkingLevel 取 off 到 xhigh），资源数组默认空。[@ref-pi-settings-defaults][@ref-pi-settings-resources] 平台差异写在 Shell 段，例如 Windows 的 shellPath 与 npmCommand，后者首项为 bun 时改用别的模块位置查询。[@ref-pi-settings-shell] 缺口：文档未给出全部设置项按平台的默认差异表。

  ## 作用域覆盖 {#config-overrides}

  **config.overrides**：项目设置覆盖全局设置，嵌套对象做合并（文档示例：全局 compaction.reserveTokens 为 16384、项目为 8192，结果为 8192，其它键保留）。[@ref-pi-settings-overrides] 资源组另有规则：全局与项目同名包以项目条目胜出，数组支持 glob 与 `!pattern`、`+path`、`-path`。[@ref-pi-packages-dedupe][@ref-pi-settings-resources] 缺口：数组、空值与删除标记的精确合并语义文档未逐键说明。

  ## 运行时与信任 {#config-runtime}

  **config.runtime**：已明确的介入顺序有：凭据为 `--api-key`，其次 auth.json，其次环境变量，最后 models.json；会话目录为 `--session-dir`，其次 `PI_CODING_AGENT_SESSION_DIR`，最后 settings 的 sessionDir。[@ref-pi-providers-resolution][@ref-pi-settings-sessions] `--offline` 或 `PI_OFFLINE=1` 关闭启动网络行为，`PI_SKIP_VERSION_CHECK=1` 只关版本检查。[@ref-pi-settings-offline] 缺口：其余多数设置项的 CLI、环境与文件三方优先级没有统一说明。

  **config.trust**：核心没有项目信任提示或允许、拒绝清单（README 写“No permission popups”），项目配置与项目资源默认照常读取。[@ref-pi-readme-philosophy] 目前唯一可见的信任来自扩展自建策略：示例 subagent 默认只加载用户级 Agent，项目级需显式设置 agentScope 并在交互模式下确认。[@ref-pi-subagent-security] 这属第三方扩展，不是宿主级信任机制。

  ## 迁移与诊断 {#config-migration}

  **config.migration**：设置加载时做键迁移：queueMode 到 steeringMode、旧 websockets 布尔到 transport 枚举、旧 skills 对象到数组（保留 enableSkillCommands）。[@ref-pi-settings-migration] 另有一次性的凭据迁移，把 oauth.json 与 settings 里的 apiKeys 合入 auth.json。[@ref-pi-migrations-code] 缺口：文档未公布迁移的弃用时间表或回滚方式。

  **config.diagnostics**：`/settings` 用于交互式查看与修改常见项，也可直接编辑 JSON；models.json 在打开 `/model` 时重载，扩展资源可用 `/reload`。[@ref-pi-settings-overview][@ref-pi-models-reload][@ref-pi-ext-reload] “文件写了没生效”的一个常见原因是路径解析基准不同：全局文件里的相对路径相对 `~/.pi/agent`，项目文件里的相对 `.pi`。[@ref-pi-settings-resources] 缺口：没有打印某键最终生效值与来源的命令。

---
固定来源把 Pi 配置分成全局与项目两个 JSON 文件，另有独立的 auth.json 与 models.json。以下机制来自文档与固定源码，未做隔离运行观察。

## 配置入口 {#config-sources}

**config.sources**：文件配置分两层：全局 `~/.pi/agent/settings.json` 与项目 `.pi/settings.json`（以当前目录为准）。[@ref-pi-settings-overview] 独立的 `~/.pi/agent/auth.json` 存凭据，`~/.pi/agent/models.json` 存 provider 与模型；资源路径字段见 Resources 段。[@ref-pi-providers-auth][@ref-pi-models-json][@ref-pi-settings-resources] 固定来源没有组织级或工作区级配置入口，这一点是本地缺口。

**config.defaults**：默认值随设置表给出（如 theme 默认 dark、retry.enabled 默认 true、compaction.enabled 默认 true、defaultThinkingLevel 取 off 到 xhigh），资源数组默认空。[@ref-pi-settings-defaults][@ref-pi-settings-resources] 平台差异写在 Shell 段，例如 Windows 的 shellPath 与 npmCommand，后者首项为 bun 时改用别的模块位置查询。[@ref-pi-settings-shell] 缺口：文档未给出全部设置项按平台的默认差异表。

## 作用域覆盖 {#config-overrides}

**config.overrides**：项目设置覆盖全局设置，嵌套对象做合并（文档示例：全局 compaction.reserveTokens 为 16384、项目为 8192，结果为 8192，其它键保留）。[@ref-pi-settings-overrides] 资源组另有规则：全局与项目同名包以项目条目胜出，数组支持 glob 与 `!pattern`、`+path`、`-path`。[@ref-pi-packages-dedupe][@ref-pi-settings-resources] 缺口：数组、空值与删除标记的精确合并语义文档未逐键说明。

## 运行时与信任 {#config-runtime}

**config.runtime**：已明确的介入顺序有：凭据为 `--api-key`，其次 auth.json，其次环境变量，最后 models.json；会话目录为 `--session-dir`，其次 `PI_CODING_AGENT_SESSION_DIR`，最后 settings 的 sessionDir。[@ref-pi-providers-resolution][@ref-pi-settings-sessions] `--offline` 或 `PI_OFFLINE=1` 关闭启动网络行为，`PI_SKIP_VERSION_CHECK=1` 只关版本检查。[@ref-pi-settings-offline] 缺口：其余多数设置项的 CLI、环境与文件三方优先级没有统一说明。

**config.trust**：核心没有项目信任提示或允许、拒绝清单（README 写“No permission popups”），项目配置与项目资源默认照常读取。[@ref-pi-readme-philosophy] 目前唯一可见的信任来自扩展自建策略：示例 subagent 默认只加载用户级 Agent，项目级需显式设置 agentScope 并在交互模式下确认。[@ref-pi-subagent-security] 这属第三方扩展，不是宿主级信任机制。

## 迁移与诊断 {#config-migration}

**config.migration**：设置加载时做键迁移：queueMode 到 steeringMode、旧 websockets 布尔到 transport 枚举、旧 skills 对象到数组（保留 enableSkillCommands）。[@ref-pi-settings-migration] 另有一次性的凭据迁移，把 oauth.json 与 settings 里的 apiKeys 合入 auth.json。[@ref-pi-migrations-code] 缺口：文档未公布迁移的弃用时间表或回滚方式。

**config.diagnostics**：`/settings` 用于交互式查看与修改常见项，也可直接编辑 JSON；models.json 在打开 `/model` 时重载，扩展资源可用 `/reload`。[@ref-pi-settings-overview][@ref-pi-models-reload][@ref-pi-ext-reload] “文件写了没生效”的一个常见原因是路径解析基准不同：全局文件里的相对路径相对 `~/.pi/agent`，项目文件里的相对 `.pi`。[@ref-pi-settings-resources] 缺口：没有打印某键最终生效值与来源的命令。

