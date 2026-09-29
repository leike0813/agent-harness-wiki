---
schema_version: 2
record_kind: production
edition_id: pi-mcp-v1
harness_id: pi
topic: mcp
title: Pi MCP：核心缺失与扩展路线（固定源码 781152f）
sections:
  - section_id: mcp-core
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-register
  - section_id: mcp-route
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-locations
      - ref-pi-ext-register
questions:
  - question_id: mcp.entry
    section_id: mcp-core
    status: answered
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.definition
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.transport
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.auth
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.lifecycle
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
  - question_id: mcp.capabilities
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-register
  - question_id: mcp.exposure
    section_id: mcp-core
    status: not_applicable
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-register
  - question_id: mcp.diagnostics
    section_id: mcp-route
    status: partial
    source_refs:
      - ref-pi-readme-philosophy
      - ref-pi-ext-locations
      - ref-pi-ext-register
body: |-
  固定来源明确说明 Pi 核心不含 MCP。逐题给出核心范围的状态；任何 MCP 能力只能由扩展或第三方包提供，不在本固定来源的结论内。

  ## 核心范围 {#mcp-core}

  **mcp.entry**：Pi 核心没有 MCP server 配置入口。README 明确写“No MCP”，并给出两条替代路线：把 CLI 工具连同 README 当作 Skill，或写一个扩展来加入 MCP 支持。[@ref-pi-readme-philosophy] 因此核心不存在用户级或项目级的 MCP 配置作用域。

  **mcp.definition**：核心不定义 server 的命令、参数、环境变量或工作目录字段，因此该问题对核心不适用。[@ref-pi-readme-philosophy] 若由扩展实现，字段格式由该扩展决定，不在固定来源的结论内。

  **mcp.transport**：核心不含 stdio 或 HTTP 等传输配置。[@ref-pi-readme-philosophy] 需将其读作“核心不提供传输配置”，而不是“Pi 完全不支持 MCP”：README 只要求通过扩展引入。

  **mcp.auth**：核心没有 MCP 凭据、Header 或 OAuth 配置。[@ref-pi-readme-philosophy] 任何鉴权都由引入 MCP 的扩展负责，属第三方范围。

  **mcp.lifecycle**：核心不启动或连接 MCP server。[@ref-pi-readme-philosophy] 连接、重连、超时与缓存都由扩展实现决定。

  **mcp.capabilities**：核心不暴露 MCP 的 tools、resources 或 prompts。[@ref-pi-readme-philosophy] 若扩展引入 MCP，它需要把能力转成 Pi 工具（`pi.registerTool`）才能被模型调用，注册后立即出现在当前会话。[@ref-pi-ext-register]

  **mcp.exposure**：核心没有 MCP 工具名过滤或批准流程。[@ref-pi-readme-philosophy] 模型实际可见的工具取决于扩展注册的 Pi 工具以及 `setActiveTools` 的启停。[@ref-pi-ext-register]

  ## 如需 MCP 的路径 {#mcp-route}

  **mcp.diagnostics**：固定来源只给出方向——用扩展或第三方包加入 MCP，而不是配置核心。[@ref-pi-readme-philosophy] 扩展放在自动发现目录，或用 settings 的 packages/extensions 引入，可用 `/reload` 热重载，并通过 `pi.registerTool` 暴露能力。[@ref-pi-ext-locations][@ref-pi-ext-register] 缺口：没有固定的 MCP 扩展名称与版本，也没有安装、握手、工具列表与首次调用四步证据，因此本章不给配置示例或验证步骤。

---
固定来源明确说明 Pi 核心不含 MCP。逐题给出核心范围的状态；任何 MCP 能力只能由扩展或第三方包提供，不在本固定来源的结论内。

## 核心范围 {#mcp-core}

**mcp.entry**：Pi 核心没有 MCP server 配置入口。README 明确写“No MCP”，并给出两条替代路线：把 CLI 工具连同 README 当作 Skill，或写一个扩展来加入 MCP 支持。[@ref-pi-readme-philosophy] 因此核心不存在用户级或项目级的 MCP 配置作用域。

**mcp.definition**：核心不定义 server 的命令、参数、环境变量或工作目录字段，因此该问题对核心不适用。[@ref-pi-readme-philosophy] 若由扩展实现，字段格式由该扩展决定，不在固定来源的结论内。

**mcp.transport**：核心不含 stdio 或 HTTP 等传输配置。[@ref-pi-readme-philosophy] 需将其读作“核心不提供传输配置”，而不是“Pi 完全不支持 MCP”：README 只要求通过扩展引入。

**mcp.auth**：核心没有 MCP 凭据、Header 或 OAuth 配置。[@ref-pi-readme-philosophy] 任何鉴权都由引入 MCP 的扩展负责，属第三方范围。

**mcp.lifecycle**：核心不启动或连接 MCP server。[@ref-pi-readme-philosophy] 连接、重连、超时与缓存都由扩展实现决定。

**mcp.capabilities**：核心不暴露 MCP 的 tools、resources 或 prompts。[@ref-pi-readme-philosophy] 若扩展引入 MCP，它需要把能力转成 Pi 工具（`pi.registerTool`）才能被模型调用，注册后立即出现在当前会话。[@ref-pi-ext-register]

**mcp.exposure**：核心没有 MCP 工具名过滤或批准流程。[@ref-pi-readme-philosophy] 模型实际可见的工具取决于扩展注册的 Pi 工具以及 `setActiveTools` 的启停。[@ref-pi-ext-register]

## 如需 MCP 的路径 {#mcp-route}

**mcp.diagnostics**：固定来源只给出方向——用扩展或第三方包加入 MCP，而不是配置核心。[@ref-pi-readme-philosophy] 扩展放在自动发现目录，或用 settings 的 packages/extensions 引入，可用 `/reload` 热重载，并通过 `pi.registerTool` 暴露能力。[@ref-pi-ext-locations][@ref-pi-ext-register] 缺口：没有固定的 MCP 扩展名称与版本，也没有安装、握手、工具列表与首次调用四步证据，因此本章不给配置示例或验证步骤。

