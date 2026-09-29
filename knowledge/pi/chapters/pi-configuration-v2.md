---
schema_version: 2
record_kind: production
edition_id: pi-configuration-v2
harness_id: pi
topic: configuration
title: Pi 配置机制：文件、覆盖、运行时与迁移（固定源码 781152f）
sections:
  - section_id: config-files
    source_refs:
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-providers-auth
      - ref-pi-models-json
  - section_id: config-defaults
    source_refs:
      - ref-pi-settings-defaults
      - ref-pi-settings-resources
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
  - section_id: config-diagnostics
    source_refs:
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-models-reload
      - ref-pi-ext-reload
questions:
  - question_id: config.sources
    section_id: config-files
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
    section_id: config-defaults
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
    section_id: config-diagnostics
    status: partial
    source_refs:
      - ref-pi-settings-overview
      - ref-pi-settings-resources
      - ref-pi-models-reload
      - ref-pi-ext-reload
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。Pi 的配置分成全局与项目两个 JSON 文件，另有独立的 auth.json 与 models.json。以下机制来自该固定来源的文档与源码，未做隔离运行观察，也未与任何精确 npm 版本建立映射，按 source_only 阅读。

## 配置文件与作用域 {#config-files}

Pi 用 JSON 设置文件，项目设置覆盖全局设置：全局是 `~/.pi/agent/settings.json`，项目是 `.pi/settings.json`（以当前目录为准）。[@ref-pi-settings-overview] 另有独立的 `~/.pi/agent/auth.json` 存凭据，`~/.pi/agent/models.json` 存 provider 与模型。[@ref-pi-providers-auth][@ref-pi-models-json] 资源路径字段（packages、extensions、skills、prompts、themes）见下方默认值表。[@ref-pi-settings-resources] 固定来源没有组织级或工作区级配置入口，这一点是本地缺口。

## 默认值与平台差异 {#config-defaults}

默认值随设置表给出，例如 `defaultThinkingLevel` 取 off 到 xhigh，资源数组默认空。[@ref-pi-settings-defaults][@ref-pi-settings-resources] 一个最小全局配置只写需要改的键：

```json
{
  "defaultProvider": "anthropic",
  "defaultModel": "claude-sonnet-4-20250514",
  "defaultThinkingLevel": "medium"
}
```

`defaultProvider` 与 `defaultModel` 设定默认 provider 与模型，`defaultThinkingLevel` 取 off、minimal、low、medium、high、xhigh。[@ref-pi-settings-defaults] 写入 `~/.pi/agent/settings.json` 对所有项目生效，写入 `.pi/settings.json` 只对该项目生效并覆盖全局。[@ref-pi-settings-overview] 平台差异写在 Shell 段，例如 Windows 的 shellPath 与 npmCommand，后者首项为 bun 时改用别的模块位置查询。[@ref-pi-settings-shell] 缺口：文档未给出全部设置项按平台的默认差异表。

## 覆盖与合并 {#config-overrides}

项目设置覆盖全局设置，嵌套对象逐键合并。固定来源给的例子是：全局 `compaction.reserveTokens` 为 16384、项目为 8192，合并后该键取 8192，其它键保留。[@ref-pi-settings-overrides] 写成两个文件如下。块一写入 `~/.pi/agent/settings.json`：

```json
{
  "theme": "dark",
  "compaction": { "enabled": true, "reserveTokens": 16384 }
}
```

块二写入 `.pi/settings.json`：

```json
{
  "compaction": { "reserveTokens": 8192 }
}
```

两文件合并的结果是 `theme` 取 `dark`、`compaction.enabled` 取 `true`、`compaction.reserveTokens` 取 `8192`；原因就是嵌套对象逐键合并，项目文件只覆盖它写出的键。[@ref-pi-settings-overrides] 资源组另有规则：全局与项目同名包以项目条目胜出，数组支持 glob 与 `!pattern`、`+path`、`-path`。[@ref-pi-packages-dedupe][@ref-pi-settings-resources] 缺口：数组、空值与删除标记的精确合并语义文档未逐键说明。

## 运行时与信任 {#config-runtime}

已明确的介入顺序有：凭据为 `--api-key`，其次 auth.json，其次环境变量，最后 models.json；会话目录为 `--session-dir`，其次 `PI_CODING_AGENT_SESSION_DIR`，最后 settings 的 sessionDir。[@ref-pi-providers-resolution][@ref-pi-settings-sessions] 会话目录在设置文件里的最小写法（全局或项目文件均可，相对路径按所选文件解析）：

```json
{ "sessionDir": ".pi/sessions" }
```

`--offline` 或 `PI_OFFLINE=1` 关闭启动网络行为，`PI_SKIP_VERSION_CHECK=1` 只关版本检查。[@ref-pi-settings-offline]

```bash
export PI_SKIP_VERSION_CHECK=1
export PI_OFFLINE=1
```

信任方面，核心没有项目信任提示，也没有允许、拒绝清单（README 写 No permission popups），项目配置与项目资源默认照常读取。[@ref-pi-readme-philosophy] 目前唯一可见的信任来自扩展自建策略：示例 subagent 默认只加载用户级 Agent，项目级需显式设置 agentScope 并在交互模式确认。[@ref-pi-subagent-security] 缺口：其余多数设置项的 CLI、环境与文件三方优先级没有统一说明。

## 键迁移 {#config-migration}

设置加载时做键迁移：queueMode 到 steeringMode、旧 websockets 布尔到 transport 枚举、旧 skills 对象到数组（保留 enableSkillCommands）。[@ref-pi-settings-migration] 另有一次性的凭据迁移，把 oauth.json 与 settings 里的 apiKeys 合入 auth.json。[@ref-pi-migrations-code] 缺口：文档未公布迁移的弃用时间表或回滚方式。

## 诊断与重载 {#config-diagnostics}

`/settings` 用于交互式查看与修改常见项，也可直接编辑 JSON；models.json 在打开 `/model` 时重载，扩展资源可用 `/reload`。[@ref-pi-settings-overview][@ref-pi-models-reload][@ref-pi-ext-reload] “文件写了没生效”的一个常见原因是路径解析基准不同：全局文件里的相对路径相对 `~/.pi/agent`，项目文件里的相对路径相对 `.pi`。[@ref-pi-settings-resources] 缺口：没有打印某键最终生效值与来源的命令。
