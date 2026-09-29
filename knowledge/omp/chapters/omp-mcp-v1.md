---
schema_version: 2
record_kind: production
edition_id: omp-mcp-v1
harness_id: omp
topic: mcp
title: OMP MCP 机制
sections:
  - section_id: mcp-config
    source_refs:
      - ref-omp-mcp-config-doc
      - ref-omp-mcp-shape-doc
      - ref-omp-mcp-types-code
  - section_id: mcp-transport
    source_refs:
      - ref-omp-mcp-transport-doc
      - ref-omp-mcp-lifecycle-doc
  - section_id: mcp-use
    source_refs:
      - ref-omp-mcp-exposure-doc
      - ref-omp-mcp-lifecycle-doc
questions:
  - question_id: mcp.entry
    section_id: mcp-config
    status: answered
    source_refs:
      - ref-omp-mcp-config-doc
  - question_id: mcp.definition
    section_id: mcp-config
    status: answered
    source_refs:
      - ref-omp-mcp-shape-doc
  - question_id: mcp.auth
    section_id: mcp-config
    status: partial
    source_refs:
      - ref-omp-mcp-types-code
  - question_id: mcp.transport
    section_id: mcp-transport
    status: answered
    source_refs:
      - ref-omp-mcp-transport-doc
  - question_id: mcp.lifecycle
    section_id: mcp-transport
    status: answered
    source_refs:
      - ref-omp-mcp-lifecycle-doc
  - question_id: mcp.capabilities
    section_id: mcp-use
    status: answered
    source_refs:
      - ref-omp-mcp-exposure-doc
  - question_id: mcp.exposure
    section_id: mcp-use
    status: answered
    source_refs:
      - ref-omp-mcp-exposure-doc
  - question_id: mcp.diagnostics
    section_id: mcp-use
    status: partial
    source_refs:
      - ref-omp-mcp-lifecycle-doc
---
## MCP 配置与定义 {#mcp-config}

**mcp.entry**：OMP 原生配置位于项目 `.omp/mcp.json` 与用户 `~/.omp/agent/mcp.json`；命名 profile 时用户级改为 profiles 下的 agent 目录。原生 provider 还兼容读取 `.omp/.mcp.json`，并接受项目根的 mcp.json / .mcp.json 作为回退。 [@ref-omp-mcp-config-doc]

**mcp.definition**：顶层键有 mcpServers（名称到 server 配置）、disabledServers（用户级 denylist，优先级最高）与 enabledServers（用户级 allowlist，可强制启用被源标记 enabled 为 false 的同名项，但 denylist 仍胜出）。 [@ref-omp-mcp-shape-doc]

**mcp.auth**：stdio server 的字段含 command、args、env，以及 OMP 专有的 envPolicy: literal 与 envLiteralKeys；auth 与 oauth 为可选认证元数据。本轮只读实现，未实际执行登录或凭据刷新，凭据是否真正生效仍为缺口。 [@ref-omp-mcp-types-code]

## 传输与生命周期 {#mcp-transport}

**mcp.transport**：`createTransport()` 按 type 选择：省略或 stdio 取 stdio 传输，http 取 Streamable HTTP，sse 取旧式 HTTP+SSE（先 GET 打开流，读 endpoint 事件后再 POST 请求）。 [@ref-omp-mcp-transport-doc]

**mcp.lifecycle**：`MCPManager` 用连接表、待连接表、待工具加载表与重连表分别记录状态；`getConnectionStatus()` 由其推导 connected、connecting、disconnected。初始发现默认只等待 250 毫秒（`mcp.startupTimeoutMs`），较慢连接在后台继续。 [@ref-omp-mcp-lifecycle-doc]

## 能力、暴露与诊断 {#mcp-use}

**mcp.capabilities**：工具会在会话启动时被转换为 custom tool 并注册进工具表，resources 与 prompts 由管理器分别刷新。任一项存在不蕴含其余项可用。 [@ref-omp-mcp-exposure-doc]

**mcp.exposure**：注册名形如 mcp 前缀加服务名与工具名（两段小写并清理为字母与下划线）；若两个来源铸出同名，会记录冲突并保留一个由原始身份决定的确定性赢家。 [@ref-omp-mcp-exposure-doc]

**mcp.diagnostics**：管理器状态模型给出连接级诊断，`/mcp reload` 会断开全部、重新发现并刷新工具。本轮没有启动任何 server，故“配置被读取、连接成功、工具可见、调用成功”的逐级观察仍缺直接证据。 [@ref-omp-mcp-lifecycle-doc]
