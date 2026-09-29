---
schema_version: 2
record_kind: production
edition_id: pi-custom_agents-v1
harness_id: pi
topic: custom_agents
title: Pi 自定义 Agent：核心缺失与示例扩展（固定源码 781152f）
sections:
  - section_id: agents-core
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-subagent-agents
      - ref-pi-subagent-code
      - ref-pi-subagent-security
  - section_id: agents-run
    source_refs:
      - ref-pi-subagent-modes
      - ref-pi-subagent-security
      - ref-pi-subagent-agents
      - ref-pi-subagent-limits
questions:
  - question_id: agents.entry
    section_id: agents-core
    status: answered
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-subagent-agents
  - question_id: agents.format
    section_id: agents-core
    status: answered
    source_refs:
      - ref-pi-subagent-agents
      - ref-pi-subagent-code
  - question_id: agents.roles
    section_id: agents-core
    status: partial
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-subagent-security
  - question_id: agents.invocation
    section_id: agents-run
    status: answered
    source_refs:
      - ref-pi-subagent-modes
      - ref-pi-subagent-security
  - question_id: agents.overrides
    section_id: agents-run
    status: answered
    source_refs:
      - ref-pi-subagent-agents
  - question_id: agents.limits
    section_id: agents-run
    status: answered
    source_refs:
      - ref-pi-subagent-modes
      - ref-pi-subagent-limits
      - ref-pi-subagent-security
  - question_id: agents.diagnostics
    section_id: agents-run
    status: partial
    source_refs:
      - ref-pi-subagent-limits
      - ref-pi-subagent-security
body: |-
  Pi 核心不内置 sub-agents；官方仓库附带一个扩展示例，用 markdown 与 frontmatter 定义 Agent，并在独立 pi 子进程中运行。以下分别标注核心与示例扩展两个范围。

  ## 核心与定义来源 {#agents-core}

  **agents.entry**：核心没有自定义 Agent 定义文件；README 写“No sub-agents”，给出用 tmux 派生 pi 实例、用扩展自建、或安装第三方包三条替代。[@ref-pi-readme-philosophy] 官方示例扩展把定义放在用户级 `~/.pi/agent/agents`（默认加载）与项目级 `.pi/agents`（需显式开启）。[@ref-pi-subagent-agents]

  **agents.format**：示例中 Agent 是带 YAML frontmatter 的 markdown：`name` 与 `description` 必填（缺失即跳过），可选 `tools`（逗号分隔）与 `model`，正文作为该 Agent 的 system prompt。[@ref-pi-subagent-agents][@ref-pi-subagent-code]

  **agents.roles**：核心没有主代理与子代理的分层。[@ref-pi-readme-philosophy] 示例把 subagent 实现为独立 pi 子进程，拥有隔离的上下文窗口与自己的提示和工具配置。[@ref-pi-subagent-security] 因此原生与扩展的边界很清楚：该能力属第三方扩展，不随核心提供。

  ## 调用与边界 {#agents-run}

  **agents.invocation**：示例通过一个工具调用触发，模式有 Single（agent 与 task）、Parallel（tasks）、Chain（chain，支持 previous 占位）。[@ref-pi-subagent-modes] 模型可按用户指令选择 Agent；项目级 Agent 在交互模式下运行前会请求确认。[@ref-pi-subagent-security]

  **agents.overrides**：每个 Agent 在 frontmatter 指定 `tools` 与 `model`；`agentScope` 为 both 时，同名项目 Agent 覆盖用户 Agent。[@ref-pi-subagent-agents] 更通用的继承规则文档未展开，属本地缺口。

  **agents.limits**：并行模式最多 8 个任务、4 个并发；每个子代理是独立 pi 进程，Ctrl+C 会终止子进程；chain 模式在首个失败步骤停止。[@ref-pi-subagent-modes][@ref-pi-subagent-limits] 递归嵌套调用自身时的深度限制未见说明，属本地缺口。[@ref-pi-subagent-security]

  **agents.diagnostics**：示例在每次调用时重新发现 Agent（便于会话中编辑），错误以退出码或 stopReason 传播，chain 会报告失败步骤。[@ref-pi-subagent-limits] 没有列出已发现 Agent 或权限来源的专用命令；`agentScope` 未开启时项目 Agent 不加载，这是“文件没生效”的常见原因。[@ref-pi-subagent-security]

---
Pi 核心不内置 sub-agents；官方仓库附带一个扩展示例，用 markdown 与 frontmatter 定义 Agent，并在独立 pi 子进程中运行。以下分别标注核心与示例扩展两个范围。

## 核心与定义来源 {#agents-core}

**agents.entry**：核心没有自定义 Agent 定义文件；README 写“No sub-agents”，给出用 tmux 派生 pi 实例、用扩展自建、或安装第三方包三条替代。[@ref-pi-readme-philosophy] 官方示例扩展把定义放在用户级 `~/.pi/agent/agents`（默认加载）与项目级 `.pi/agents`（需显式开启）。[@ref-pi-subagent-agents]

**agents.format**：示例中 Agent 是带 YAML frontmatter 的 markdown：`name` 与 `description` 必填（缺失即跳过），可选 `tools`（逗号分隔）与 `model`，正文作为该 Agent 的 system prompt。[@ref-pi-subagent-agents][@ref-pi-subagent-code]

**agents.roles**：核心没有主代理与子代理的分层。[@ref-pi-readme-philosophy] 示例把 subagent 实现为独立 pi 子进程，拥有隔离的上下文窗口与自己的提示和工具配置。[@ref-pi-subagent-security] 因此原生与扩展的边界很清楚：该能力属第三方扩展，不随核心提供。

## 调用与边界 {#agents-run}

**agents.invocation**：示例通过一个工具调用触发，模式有 Single（agent 与 task）、Parallel（tasks）、Chain（chain，支持 previous 占位）。[@ref-pi-subagent-modes] 模型可按用户指令选择 Agent；项目级 Agent 在交互模式下运行前会请求确认。[@ref-pi-subagent-security]

**agents.overrides**：每个 Agent 在 frontmatter 指定 `tools` 与 `model`；`agentScope` 为 both 时，同名项目 Agent 覆盖用户 Agent。[@ref-pi-subagent-agents] 更通用的继承规则文档未展开，属本地缺口。

**agents.limits**：并行模式最多 8 个任务、4 个并发；每个子代理是独立 pi 进程，Ctrl+C 会终止子进程；chain 模式在首个失败步骤停止。[@ref-pi-subagent-modes][@ref-pi-subagent-limits] 递归嵌套调用自身时的深度限制未见说明，属本地缺口。[@ref-pi-subagent-security]

**agents.diagnostics**：示例在每次调用时重新发现 Agent（便于会话中编辑），错误以退出码或 stopReason 传播，chain 会报告失败步骤。[@ref-pi-subagent-limits] 没有列出已发现 Agent 或权限来源的专用命令；`agentScope` 未开启时项目 Agent 不加载，这是“文件没生效”的常见原因。[@ref-pi-subagent-security]


