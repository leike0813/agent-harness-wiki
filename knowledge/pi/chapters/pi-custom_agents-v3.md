---
schema_version: 3
record_kind: production
edition_id: pi-custom_agents-v3
harness_id: pi
topic: custom_agents
title: Pi 子 agent：核心缺省与扩展实现（固定源码 8369268）
sections:
  - section_id: agents-core
    surface_ids: [cli]
    source_refs:
      - ref-pi-readme-skips-features
      - ref-pi-readme-philosophy
  - section_id: agents-definition
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-code-tool-list
      - ref-pi-subagent-readme-inherit
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-readme-inherit
      - ref-pi-subagent-readme-trust
      - ref-pi-config-trust-protected
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-readme-inherit
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-readme-trust
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-core
        status: answered
        source_refs:
          - ref-pi-readme-skips-features
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: partial
        source_refs:
          - ref-pi-subagent-code-tool-list
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-core
        status: not_applicable
        source_refs:
          - ref-pi-readme-skips-features
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-pi-subagent-readme-inherit
          - ref-pi-subagent-readme-trust
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs:
          - ref-pi-subagent-readme-inherit
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs:
          - ref-pi-subagent-readme-inherit
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-pi-subagent-readme-trust
---
固定来源为 pi 仓库提交 83692682 的根 README 与 Pi coding agent 包（`packages/coding-agent/examples/extensions/subagent/`）。核心仍不内置子 agent，本章在这一点上与 pi-custom_agents-v2 一致；相对 v2 的变化是项目级 agent 的确认条件改为与项目信任挂钩，模型继承规则也写得更明确。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 核心不提供子 agent {#agents-core}

根 README 写明 Pi 以强默认值起步，但跳过 sub-agents 与 plan mode 这类能力。[@ref-pi-readme-skips-features] 因此核心没有 agent 定义文件加载器、角色（system prompt）配置入口或委派调用，v2 的结论在当前来源下继续成立。[@ref-pi-readme-skips-features] 相关问法按“核心不适用、需自行实现”记录。版本边界：这条“核心不做子 agent”的依据来自本轮固定提交 83692682 的根 README。[@ref-pi-readme-skips-features] 上一版引用的包内 README“**No sub-agents.**”段落绑定的是旧快照 781152fc；[@ref-pi-readme-philosophy] 该旧快照同段还写着“**No MCP.**”，在新提交下已失效，所以本节改用根 README 重新取证，不再依赖旧快照。

## agent 定义 {#agents-definition}

子 agent 由官方示例扩展实现，以带 frontmatter 的 Markdown 表达。其中 `tools` 字段既接受字符串（按逗号切分）也接受字符串数组，切分后去空白、丢弃空项，全空则视为未设置。[@ref-pi-subagent-code-tool-list] `model` 省略时，子 agent 继承发起调度的那次会话当前使用的模型与思考档位。[@ref-pi-subagent-readme-inherit] 相对 v2，这里把“未指定模型”的默认行为写成了明确的继承语义。

## 位置与调用 {#agents-invocation}

用户级 agent 在 `~/.pi/agent/agents/*.md`，始终加载；项目级在 `.pi/agents/*.md`，只有设置了 `agentScope: "project"` 或 `"both"` 才加载。[@ref-pi-subagent-readme-inherit] 交互式运行下，工具在未受信项目中执行项目级 agent 前会请求确认，受信项目跳过该额外确认，`confirmProjectAgents: false` 可关闭确认。[@ref-pi-subagent-readme-trust] 这条相对 v2 是实质变化：判断依据从“扩展自建策略”变成与核心项目信任联动，项目 `.agents/skills` 同属受保护资源。[@ref-pi-config-trust-protected]

## 覆盖与限制 {#agents-limits}

模型与思考档位可由每个 agent 声明覆盖，省略则继承会话当前值。[@ref-pi-subagent-readme-inherit] 并行执行的输出截断、上下文隔离深度等限制在当前固定来源下未逐条复核，本章按 `partial` 记录，不给具体阈值。

## 诊断 {#agents-diagnostics}

可用于定位的信号是项目级 agent 的确认提示与 `agentScope` 取值。[@ref-pi-subagent-readme-trust] 缺口：当前来源没有列出“已加载 agent 及其来源”的命令，验证加载结果需要另做运行观察。
