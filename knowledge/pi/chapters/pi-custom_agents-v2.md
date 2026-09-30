---
schema_version: 3
record_kind: production
edition_id: pi-custom_agents-v2
harness_id: pi
topic: custom_agents
title: Pi 自定义 Agent：核心缺失与示例扩展（固定源码 781152f）
sections:
  - section_id: agents-core
    surface_ids: [cli]
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-subagent-agents
      - ref-pi-subagent-security
  - section_id: agents-definition
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-agents
      - ref-pi-subagent-code
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-modes
      - ref-pi-subagent-security
      - ref-pi-subagent-agents
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-modes
      - ref-pi-subagent-limits
      - ref-pi-subagent-security
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-subagent-limits
      - ref-pi-subagent-security
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-core
        status: answered
        source_refs:
          - ref-pi-readme-philosophy
          - ref-pi-subagent-agents
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-definition
        status: answered
        source_refs:
          - ref-pi-subagent-agents
          - ref-pi-subagent-code
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-core
        status: partial
        source_refs:
          - ref-pi-readme-philosophy
          - ref-pi-subagent-security
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-pi-subagent-modes
          - ref-pi-subagent-security
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs:
          - ref-pi-subagent-agents
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs:
          - ref-pi-subagent-modes
          - ref-pi-subagent-limits
          - ref-pi-subagent-security
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: partial
        source_refs:
          - ref-pi-subagent-limits
          - ref-pi-subagent-security
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档、源码与仓库自带示例）。Pi 核心不内置 sub-agents；本章后半描述的是一份随仓库提供的示例扩展，它不在核心范围内，也不据此断言某个 npm 安装版本已具备相同行为。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 核心没有自定义 Agent {#agents-core}

README 写 No sub-agents，并给出三条替代：用 tmux 派生 pi 实例、用扩展自建，或安装第三方包。[@ref-pi-readme-philosophy] 因此核心没有自定义 Agent 的定义文件，也没有主代理与子代理的分层。[@ref-pi-readme-philosophy] 官方仓库附带一个示例扩展（`packages/coding-agent/examples/extensions/subagent`），它把 subagent 实现为独立 pi 子进程，拥有隔离的上下文窗口与自己的提示和工具配置。[@ref-pi-subagent-agents][@ref-pi-subagent-security] 阅读本章时要注意：这是示例扩展提供的能力，不随核心提供。前提是该扩展被安装并启用；固定来源没有说明它是否随 npm 包分发，这一点是本地缺口。

## Agent 定义文件 {#agents-definition}

示例扩展用带 YAML frontmatter 的 markdown 定义 Agent，frontmatter 缺 name 或 description 的条目直接跳过。[@ref-pi-subagent-agents][@ref-pi-subagent-code] 位置有用户级 `~/.pi/agent/agents/`（默认加载）与项目级 `.pi/agents/`（需显式开启）。[@ref-pi-subagent-agents] 把一个 Agent 保存为 `~/.pi/agent/agents/my-agent.md`：

```markdown
---
name: my-agent
description: What this agent does
tools: read, grep, find, ls
model: claude-haiku-4-5
---

System prompt for the agent goes here.
```

字段作用：`name` 与 `description` 必填，缺失即跳过；`tools` 是逗号分隔的工具列表；`model` 指定该 Agent 使用的模型；frontmatter 之后的正文是该 Agent 的 system prompt。[@ref-pi-subagent-agents][@ref-pi-subagent-code] 生效结果是该 Agent 进入可调用集合；项目级 Agent 只有在 `agentScope` 设为 `project` 或 `both` 时才载入。[@ref-pi-subagent-agents] 检查方式见诊断小节。

## 调用与覆盖 {#agents-invocation}

示例通过一个工具调用触发，模式有 Single（agent 与 task）、Parallel（tasks）、Chain（chain，支持 previous 占位）。[@ref-pi-subagent-modes] 模型可按用户指令选择 Agent；项目级 Agent 在交互模式下运行前会请求确认。[@ref-pi-subagent-security] 每个 Agent 在 frontmatter 里指定 `tools` 与 `model`；`agentScope` 为 both 时，同名项目 Agent 覆盖用户 Agent。[@ref-pi-subagent-agents] 更通用的继承规则文档未展开，属本地缺口。

## 并发与边界 {#agents-limits}

并行模式最多 8 个任务、4 个并发；每个子代理是独立 pi 进程，Ctrl+C 会终止子进程；chain 模式在首个失败步骤停止。[@ref-pi-subagent-modes][@ref-pi-subagent-limits] 递归嵌套调用自身时的深度限制未见说明，属本地缺口。[@ref-pi-subagent-security]

## 诊断 {#agents-diagnostics}

示例在每次调用时重新发现 Agent，因此可以在会话中编辑定义；错误以退出码或 stopReason 传播，chain 会报告失败步骤。[@ref-pi-subagent-limits] 没有列出已发现 Agent 或权限来源的专用命令；`agentScope` 未开启时项目 Agent 不加载，这是“文件没生效”的常见原因。[@ref-pi-subagent-security]
