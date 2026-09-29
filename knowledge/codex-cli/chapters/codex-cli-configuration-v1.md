---
schema_version: 2
record_kind: production
edition_id: codex-cli-configuration-v1
harness_id: codex-cli
topic: configuration
title: "Codex CLI 主题章节：配置机制"
sections:
  - section_id: config-sources-overrides
    source_refs:
      - ref-codex-cli-config-user-doc
      - ref-codex-cli-config-precedence-source
      - ref-codex-cli-config-merge-source
      - ref-codex-cli-config-blocked-doc
  - section_id: config-runtime-trust
    source_refs:
      - ref-codex-cli-config-profiles-doc
      - ref-codex-cli-config-trust-doc
      - ref-codex-cli-config-user-doc
  - section_id: config-defaults-migration-diagnostics
    source_refs:
      - ref-codex-cli-config-schema-doc
      - ref-codex-cli-config-user-doc
      - ref-codex-cli-config-requirements-doc
      - ref-codex-cli-config-migration-doc
      - ref-codex-cli-config-deprecation-doc
questions:
  - question_id: config.sources
    section_id: config-sources-overrides
    status: answered
    source_refs:
      - ref-codex-cli-config-user-doc
      - ref-codex-cli-config-precedence-source
  - question_id: config.overrides
    section_id: config-sources-overrides
    status: answered
    source_refs:
      - ref-codex-cli-config-precedence-source
      - ref-codex-cli-config-merge-source
      - ref-codex-cli-config-blocked-doc
  - question_id: config.runtime
    section_id: config-runtime-trust
    status: answered
    source_refs:
      - ref-codex-cli-config-profiles-doc
      - ref-codex-cli-config-trust-doc
  - question_id: config.trust
    section_id: config-runtime-trust
    status: answered
    source_refs:
      - ref-codex-cli-config-trust-doc
      - ref-codex-cli-config-user-doc
  - question_id: config.defaults
    section_id: config-defaults-migration-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-config-requirements-doc
      - ref-codex-cli-config-user-doc
  - question_id: config.migration
    section_id: config-defaults-migration-diagnostics
    status: answered
    source_refs:
      - ref-codex-cli-config-migration-doc
      - ref-codex-cli-config-deprecation-doc
  - question_id: config.diagnostics
    section_id: config-defaults-migration-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-config-schema-doc
      - ref-codex-cli-config-requirements-doc
---

## 配置来源与覆盖 {#config-sources-overrides}

本节的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制，不把源码提交或未标版本的文档当作某个已安装包版本的行为。

**config.sources**：用户级配置在 `~/.codex/config.toml`，项目级在 `.codex/config.toml`，后者只在信任项目时加载。源码的配置层枚举还包括随包默认值、MDM、系统级文件、企业云托管、当前会话覆盖与旧版托管来源。[@ref-codex-cli-config-user-doc][@ref-codex-cli-config-precedence-source]

**config.overrides**：源码给每一层一个优先级数值：随包默认 -10、MDM 0、System 10、企业托管 15、User 20（选中 profile 时为 21）、Project 25、会话覆盖 30、旧版托管文件 40、旧版托管 MDM 50；数值高的层覆盖数值低的层。TOML 合并按 key 递归，overlay 优先。项目级 `.codex/config.toml` 不能覆盖 provider、认证、通知、profile 选择与遥测路由等键，写在项目层会被忽略。[@ref-codex-cli-config-precedence-source][@ref-codex-cli-config-merge-source][@ref-codex-cli-config-blocked-doc]

## 运行时与信任 {#config-runtime-trust}

**config.runtime**：`--profile NAME` 选择 `$CODEX_HOME/profile-name.config.toml`，profile 文件与 `config.toml` 同级；CLI 参数以会话层（优先级 30）叠加在文件配置之上。项目信任是运行时门槛：未信任项目会跳过项目级 `.codex/` 层。[@ref-codex-cli-config-profiles-doc][@ref-codex-cli-config-trust-doc]

**config.trust**：`projects.PATH.trust_level` 取 `trusted` 或 `untrusted`；未信任项目跳过项目级 `.codex/` 层，包括项目配置、hooks 与 rules。该键写在用户级 `~/.codex/config.toml`，与"项目配置只在信任时加载"是同一机制的两面。[@ref-codex-cli-config-trust-doc][@ref-codex-cli-config-user-doc]

## 默认值、迁移与诊断 {#config-defaults-migration-diagnostics}

**config.defaults**：状态 partial。文档在具体键上给出默认值（例如 MCP 超时与 skills 预算），`requirements.toml` 可强制某些安全键；固定来源没有集中列出默认值来源、功能开关与平台差异的完整清单。[@ref-codex-cli-config-requirements-doc][@ref-codex-cli-config-user-doc]

**config.migration**：`approval_policy = "untrusted"` 已不再支持（项目层 `trust_level = "untrusted"` 仍支持）；`experimental_instructions_file` 改名为 `model_instructions_file`，旧键被弃用。[@ref-codex-cli-config-migration-doc][@ref-codex-cli-config-deprecation-doc]

**config.diagnostics**：状态 partial。可用的手段是把 `#:schema` 指向 `config-schema.json` 让编辑器校验键；`requirements.toml` 说明与 config 冲突时 `deny` 优先。固定来源没有给出"文件已写但未生效"的专门诊断入口（例如打印有效合并结果）。[@ref-codex-cli-config-schema-doc][@ref-codex-cli-config-requirements-doc]
