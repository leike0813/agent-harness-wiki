---
schema_version: 2
record_kind: production
edition_id: codex-cli-custom_agents-v2
harness_id: codex-cli
topic: custom_agents
title: "Codex CLI 主题章节：Custom agents"
sections:
  - section_id: agents-entry
    source_refs:
      - ref-codex-cli-agents-config
      - ref-codex-cli-agents-loader-source
      - ref-codex-cli-agents-discovery-source
  - section_id: agents-role-file
    source_refs:
      - ref-codex-cli-agents-role-file-source
      - ref-codex-cli-agents-role-config
  - section_id: agents-invocation
    source_refs:
      - ref-codex-cli-agents-config
      - ref-codex-cli-agents-subagents-doc
  - section_id: agents-overrides-limits
    source_refs:
      - ref-codex-cli-agents-subagent-model-config
      - ref-codex-cli-agents-role-file-source
      - ref-codex-cli-agents-limits-config
  - section_id: agents-diagnostics
    source_refs:
      - ref-codex-cli-agents-loader-source
      - ref-codex-cli-agents-discovery-source
questions:
  - question_id: agents.entry
    section_id: agents-entry
    status: answered
    source_refs:
      - ref-codex-cli-agents-config
      - ref-codex-cli-agents-loader-source
      - ref-codex-cli-agents-discovery-source
  - question_id: agents.format
    section_id: agents-role-file
    status: answered
    source_refs:
      - ref-codex-cli-agents-role-file-source
      - ref-codex-cli-agents-role-config
  - question_id: agents.roles
    section_id: agents-invocation
    status: partial
    source_refs:
      - ref-codex-cli-agents-config
      - ref-codex-cli-agents-subagents-doc
  - question_id: agents.invocation
    section_id: agents-invocation
    status: partial
    source_refs:
      - ref-codex-cli-agents-subagents-doc
  - question_id: agents.overrides
    section_id: agents-overrides-limits
    status: answered
    source_refs:
      - ref-codex-cli-agents-subagent-model-config
      - ref-codex-cli-agents-role-file-source
  - question_id: agents.limits
    section_id: agents-overrides-limits
    status: answered
    source_refs:
      - ref-codex-cli-agents-limits-config
  - question_id: agents.diagnostics
    section_id: agents-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-agents-loader-source
      - ref-codex-cli-agents-discovery-source
---

本主题的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制，不把源码提交或未标版本的文档当作某个已安装包版本的行为。

## 定义入口与发现 {#agents-entry}

自定义 agent 角色有两个入口。其一是 `config.toml` 里的 `[agents.NAME]` 声明；其二是配置层目录下的 `agents/`（即 `$CODEX_HOME/agents/` 与项目 `.codex/agents/`）中的 TOML 文件。源码用 `collect_agent_role_files` 递归收集扩展名为 `toml` 的文件，再由 `load_agent_roles` 从低优先级层到高优先级层合并，同一层内出现重名角色会记警告。[@ref-codex-cli-agents-config][@ref-codex-cli-agents-loader-source][@ref-codex-cli-agents-discovery-source]

两个入口对应的位置可以并排看：

```text
$CODEX_HOME/agents/reviewer.toml
project/.codex/agents/reviewer.toml
```

前提是这些目录分别位于用户层与项目层配置目录下；结果是其中的 `.toml` 被递归收集为角色候选，用户层与项目层再按优先级合并。

## 角色声明与角色文件 {#agents-role-file}

`[agents.NAME]` 这一层支持 `description` 与 `config_file`；角色 TOML 文件（源码 `RawAgentRoleFileToml`）包含 `name`、`description`、`nickname_candidates`，其余字段被当作该角色的配置层（源码对 `ConfigToml` 做 flatten）。`config_file` 的相对路径从声明它的配置文件所在目录解析。[@ref-codex-cli-agents-role-file-source][@ref-codex-cli-agents-role-config]

在 `~/.codex/config.toml` 里直接声明一个角色，并指向它的角色文件：

```toml
[agents.reviewer]
description = "Review diffs for correctness before a commit."
config_file = "./agents/reviewer.toml"
nickname_candidates = ["reviewer", "auditor"]
```

对应的角色文件 `~/.codex/agents/reviewer.toml` 则承载该角色自己的配置层：

```toml
name = "reviewer"
description = "Review diffs for correctness before a commit."
nickname_candidates = ["reviewer", "auditor"]

model = "gpt-5-codex"
```

`description` 可写在 `[agents.NAME]` 或角色文件里，两者取其一即可。前提是角色文件位于配置层目录下的 `agents/` 且扩展名为 `.toml`；结果是该角色进入可被选择与派生的集合，`config_file` 指向的那一层里的键只对这个角色生效。

## 调用与角色选择 {#agents-invocation}

主线程与派生 agent 共用同一套 `agents` 机制；`agents.enabled` 控制多 agent 工具（默认 `true`）。文档侧把委派能力称为 `subagents`，描述为"让 Codex 把聚焦工作委派给专门 agent"。[@ref-codex-cli-agents-config][@ref-codex-cli-agents-subagents-doc] 用户以自然语言要求 Codex 委派时触发，主 agent 依据角色的 `description` 决定用哪个角色，文档写明它是"选择与派生该 agent 类型时展示给 Codex 的角色指引"。[@ref-codex-cli-agents-subagents-doc] 本项状态 partial：固定来源没有区分"原生角色"与插件或扩展提供的角色实现，也没有给出自动委派的具体触发条件与选择算法。

## 覆盖与并发 {#agents-overrides-limits}

每个角色可用 `config_file` 指向一层 TOML，该层里的模型、provider、工具、权限等键对该角色生效；`agents.default_subagent_model` 与 `agents.default_subagent_reasoning_effort` 提供派生 agent 的默认模型与推理强度，显式 spawn 参数优先。[@ref-codex-cli-agents-subagent-model-config][@ref-codex-cli-agents-role-file-source] `agents.max_concurrent_threads_per_session` 限制并发打开的派生线程数（不含主线程），`max_threads` 是它的旧别名；未设置时由 Codex 选择默认值。[@ref-codex-cli-agents-limits-config]

一个同时设定开关与默认并发数的完整块：

```toml
[agents]
enabled = true
max_concurrent_threads_per_session = 4
default_subagent_model = "gpt-5-codex"
```

字段与检查：`enabled` 开关多 agent 工具，`max_concurrent_threads_per_session` 限制同时在开的派生线程数（不含主线程），`default_subagent_model` 给未显式指定模型的派生 agent 一个默认值。前提是写入用户级或项目级 `config.toml`；结果是并发的派生线程不会超过该上限。[@ref-codex-cli-agents-limits-config]

## 诊断 {#agents-diagnostics}

角色加载失败或同层重名会写入启动警告（源码 `push_agent_role_warning`）；角色文件按 `.toml` 扩展名递归收集，因此错误的扩展名不会被加载。[@ref-codex-cli-agents-loader-source][@ref-codex-cli-agents-discovery-source] 状态 partial：固定来源没有给出查看"已加载角色及其来源层"的专门命令，权限或委派失败也只能从运行输出定位。
