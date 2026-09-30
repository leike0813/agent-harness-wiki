---
schema_version: 3
record_kind: production
edition_id: codex-cli-custom_agents-v1
harness_id: codex
topic: custom_agents
title: "Codex CLI 主题章节：Custom agents"
sections:
  - section_id: agents-entry-format
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-agents-config
      - ref-codex-cli-agents-role-config
      - ref-codex-cli-agents-role-file-source
      - ref-codex-cli-agents-loader-source
      - ref-codex-cli-agents-discovery-source
  - section_id: agents-invocation-roles
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-agents-subagents-doc
      - ref-codex-cli-agents-config
      - ref-codex-cli-agents-subagent-model-config
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-agents-subagent-model-config
      - ref-codex-cli-agents-limits-config
      - ref-codex-cli-agents-role-file-source
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-codex-cli-agents-loader-source
      - ref-codex-cli-agents-discovery-source
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs:
          - ref-codex-cli-agents-config
          - ref-codex-cli-agents-loader-source
          - ref-codex-cli-agents-discovery-source
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-entry-format
        status: answered
        source_refs:
          - ref-codex-cli-agents-role-file-source
          - ref-codex-cli-agents-role-config
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-roles
        status: partial
        source_refs:
          - ref-codex-cli-agents-config
          - ref-codex-cli-agents-subagents-doc
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation-roles
        status: partial
        source_refs:
          - ref-codex-cli-agents-subagents-doc
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs:
          - ref-codex-cli-agents-subagent-model-config
          - ref-codex-cli-agents-role-file-source
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs:
          - ref-codex-cli-agents-limits-config
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-codex-cli-agents-loader-source
          - ref-codex-cli-agents-discovery-source
---

## 定义入口与格式 {#agents-entry-format}

本节的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制，不把源码提交或未标版本的文档当作某个已安装包版本的行为。

**agents.entry**：自定义 agent 角色有两个入口。其一是在 `config.toml` 用 `[agents.NAME]` 声明；其二是放在配置层目录下的 `agents/`（即 `$CODEX_HOME/agents/` 与项目 `.codex/agents/`）中的 TOML 文件。源码用 `collect_agent_role_files` 递归收集 `.toml`，再由 `load_agent_roles` 从低优先级层到高优先级层合并，同一层内出现重名角色会记警告。[@ref-codex-cli-agents-config][@ref-codex-cli-agents-loader-source][@ref-codex-cli-agents-discovery-source]

**agents.format**：`[agents.NAME]` 支持 `description` 与 `config_file`；角色 TOML 文件包含 `name`、`description`、`nickname_candidates`，其余字段被当作该角色的配置层（源码对 `ConfigToml` 做 flatten）。`config_file` 的相对路径从声明它的配置文件所在目录解析。[@ref-codex-cli-agents-role-file-source][@ref-codex-cli-agents-role-config]

## 调用、角色与并发 {#agents-invocation-roles}

**agents.roles**：主线程与派生 agent 共用同一套 `agents` 机制；`agents.enabled` 控制多 agent 工具（默认 `true`）；标量设置名被保留，不能用作自定义角色名。文档侧把委派能力称为 `subagents`，描述为"让 Codex 把聚焦工作委派给专门 agent"。状态 partial：固定来源没有区分"原生角色"与插件或扩展提供的角色实现。[@ref-codex-cli-agents-config][@ref-codex-cli-agents-subagents-doc]

**agents.invocation**：用户以自然语言要求 Codex 委派时触发；主 agent 依据角色的 `description`（文档写明它是"选择与派生该 agent 类型时展示给 Codex 的角色指引"）决定用哪个角色。状态 partial：来源没有给出自动委派的具体触发条件与选择算法。[@ref-codex-cli-agents-subagents-doc]

## 覆盖与并发 {#agents-overrides-limits}

**agents.overrides**：每个角色可用 `config_file` 指向一层 TOML，该层里的模型、provider、工具、权限等键对该角色生效；`agents.default_subagent_model` 与 `default_subagent_reasoning_effort` 提供派生 agent 的默认模型与推理强度，显式 spawn 参数优先。[@ref-codex-cli-agents-subagent-model-config][@ref-codex-cli-agents-role-file-source]

**agents.limits**：`agents.max_concurrent_threads_per_session` 限制并发打开的派生线程数（不含主线程），`max_threads` 是它的旧别名；未设置时由 Codex 选择默认值。[@ref-codex-cli-agents-limits-config]

## 诊断 {#agents-diagnostics}

**agents.diagnostics**：角色加载失败或同层重名会写入启动警告（源码 `push_agent_role_warning`）；角色文件按 `.toml` 扩展名递归收集，因此错误的扩展名不会被加载。状态 partial：固定来源没有给出查看"已加载角色及其来源层"的专门命令，权限或委派失败也只能从运行输出定位。[@ref-codex-cli-agents-loader-source][@ref-codex-cli-agents-discovery-source]
