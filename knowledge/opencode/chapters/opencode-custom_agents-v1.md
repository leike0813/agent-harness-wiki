---
schema_version: 3
record_kind: production
edition_id: opencode-custom_agents-v1
harness_id: opencode
topic: custom_agents
title: OpenCode 的自定义 Agent 机制
sections:
  - section_id: agents-definition
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-json
      - ref-opencode-agents-markdown
      - ref-opencode-agents-types
      - ref-opencode-agents-options
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-invocation
      - ref-opencode-agents-json
      - ref-opencode-agents-permissions
      - ref-opencode-agents-options
      - ref-opencode-agents-taskperm
      - ref-opencode-agents-depth
      - ref-opencode-agents-hidden
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-agents-create
      - ref-opencode-agents-taskperm
      - ref-opencode-agents-hidden
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-opencode-agents-json
          - ref-opencode-agents-markdown
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-opencode-agents-options
          - ref-opencode-agents-json
          - ref-opencode-agents-markdown
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-opencode-agents-types
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-opencode-agents-invocation
          - ref-opencode-agents-json
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-opencode-agents-permissions
          - ref-opencode-agents-options
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-opencode-agents-depth
          - ref-opencode-agents-taskperm
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-opencode-agents-create
          - ref-opencode-agents-taskperm
          - ref-opencode-agents-hidden
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下字段属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。

## 定义与角色 {#agents-definition}

**agents.entry**：自定义 Agent 有两个定义入口。其一是 `opencode.json` 的 `agent` 对象；其二是 markdown 文件，放在全局 `~/.config/opencode/agents/` 或项目 `.opencode/agents/`，文件名即 agent 名（`review.md` 生成 `review`）。目录加载沿用配置合并：项目覆盖全局，agent 段覆盖全局默认，`.opencode` 目录里的 agents 也并入同一 `agent` 映射。 [@ref-opencode-agents-json] [@ref-opencode-agents-markdown]

**agents.format**：必填字段只有 `description`。常用字段包括 `mode`（`primary`、`subagent`、`all`，默认 `all`）、`model`（形如 `provider/model-id`）、`temperature`、`top_p`、`prompt`（相对配置文件路径，可用 `{file:...}` 引用文件）、`permission`、已弃用的 `tools`、`steps`（旧名 `maxSteps` 已弃用）、`color`、`disable`、`hidden`。markdown 定义把同名字段放进 frontmatter，正文作为该 Agent 的系统提示。 [@ref-opencode-agents-options] [@ref-opencode-agents-json] [@ref-opencode-agents-markdown]

**agents.roles**：内置 primary 是 build 与 plan，另有隐藏系统 Agent（compaction、title、summary）不可在界面选择；内置 subagent 是 general、explore、scout。primary 与 subagent 使用同一套配置机制，区别只由 `mode` 决定。本题未在固定来源中发现由扩展提供的独立 Agent 机制，故按原生实现作答。 [@ref-opencode-agents-types]

## 调用、覆盖与边界 {#agents-invocation}

**agents.invocation**：primary 用 Tab 键或 `switch_agent` 键位切换；subagent 可由 primary 依据其 description 自动委派，或由用户在消息中 `@` 提及（如 `@general`）。`default_agent` 指定默认 primary，若指向不存在或 subagent，会回退到 build 并给告警。 [@ref-opencode-agents-invocation] [@ref-opencode-agents-json]

**agents.overrides**：每个 Agent 可覆盖 `model`、`prompt`、`temperature`、`top_p`，以及 `permission` 和已弃用的 `tools`。`permission` 的键（如 read、edit、glob、grep、list、bash、task、external_directory、lsp、skill）取值 allow/ask/deny，其中 edit、bash 等还接受按路径或命令的 glob 对象做细粒度控制。未为 subagent 指定 model 时，它继承发起调用的 primary 所用模型。 [@ref-opencode-agents-permissions] [@ref-opencode-agents-options]

**agents.limits**：`steps` 限制单个 Agent 的迭代次数，达到上限后转入总结；`subagent_depth` 默认 1，设为 0 禁止派发 subagent，设为 2 允许再嵌套一层。`permission.task` 用 glob 决定可调用的 subagent，规则按顺序求值、最后匹配者生效，`deny` 会把该 subagent 从 Task 工具描述移除。 [@ref-opencode-agents-depth] [@ref-opencode-agents-taskperm]

## 诊断 {#agents-diagnostics}

**agents.diagnostics**：可用 `opencode agent create` 交互式生成定义，过程中会选定写入位置（全局或项目）与允许的权限，借此确认定义落点。调用或委派失败时，先查 `permission.task` 是否 deny、Agent 是否 `hidden: true`（只影响 `@` 菜单，不影响模型经 Task 调用）、以及 `default_agent` 是否指向 primary。文档没有“列出已发现 Agent”的专用命令，也没有单独的委派失败诊断入口，故本项标 partial。 [@ref-opencode-agents-create] [@ref-opencode-agents-taskperm] [@ref-opencode-agents-hidden]
