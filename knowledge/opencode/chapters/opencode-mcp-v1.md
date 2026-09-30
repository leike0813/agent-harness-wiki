---
schema_version: 3
record_kind: production
edition_id: opencode-mcp-v1
harness_id: opencode
topic: mcp
title: OpenCode 的 MCP server 机制
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-config
      - ref-opencode-mcp-local
      - ref-opencode-mcp-remote
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-local
      - ref-opencode-mcp-remote
      - ref-opencode-mcp-auth
  - section_id: mcp-runtime
    surface_ids: [cli]
    source_refs:
      - ref-opencode-mcp-code
      - ref-opencode-mcp-lifecycle
      - ref-opencode-mcp-catalog
      - ref-opencode-mcp-manage
      - ref-opencode-mcp-debug
      - ref-opencode-mcp-auth
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-opencode-mcp-config
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-opencode-mcp-local
          - ref-opencode-mcp-remote
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs:
          - ref-opencode-mcp-local
          - ref-opencode-mcp-remote
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs:
          - ref-opencode-mcp-auth
          - ref-opencode-mcp-remote
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-runtime
        status: partial
        source_refs:
          - ref-opencode-mcp-code
          - ref-opencode-mcp-lifecycle
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-runtime
        status: answered
        source_refs:
          - ref-opencode-mcp-code
          - ref-opencode-mcp-catalog
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-runtime
        status: answered
        source_refs:
          - ref-opencode-mcp-manage
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-runtime
        status: partial
        source_refs:
          - ref-opencode-mcp-debug
          - ref-opencode-mcp-auth
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下字段、超时与命令属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。

## 配置与定义 {#mcp-entry}

**mcp.entry**：MCP server 在配置文件的 `mcp` 对象下定义，键名即服务器名，可在提示中按名引用。作用域沿用配置文件本身的加载顺序：组织默认来自 `.well-known/opencode`，随后是全局、自定义、项目与受管配置；本地条目可以覆盖组织默认（例如把默认停用的服务器改为 `enabled: true`）。把 `enabled` 设为 `false` 可不删除条目而暂时停用。 [@ref-opencode-mcp-config]

**mcp.definition**：条目用 `type` 区分两种形态。`local` 需要 `command`（可执行与参数数组），可选 `cwd`（相对 workspace 解析）、`environment`、`enabled`、`timeout`（拉取工具超时，默认 5000ms）。`remote` 需要 `url`，可选 `enabled`、`headers`、`oauth`、`timeout`。两种形态的变量可写 `{env:...}` 占位，由配置层替换。 [@ref-opencode-mcp-local] [@ref-opencode-mcp-remote]

## 传输与认证 {#mcp-transport}

**mcp.transport**：支持本地进程与远程 HTTP 两类，均用 `type` 选择：本地以 `command` 启动子进程，远程以 `url` 加可选 `headers` 连接。文档给出的本地示例用 `npx -y` 或 `bun x` 启动命令，远程示例是标准 HTTP 端点。文档没有区分 SSE 与 Streamable HTTP 的字段差异，本项以文档所述两种传输为准。 [@ref-opencode-mcp-local] [@ref-opencode-mcp-remote]

**mcp.auth**：远程服务器返回 401 时，OpenCode 自动进入 OAuth 流程，支持 RFC 7591 动态客户端注册，并把令牌存到 `~/.local/share/opencode/mcp-auth.json`。可在 `oauth` 中提供 `clientId`、`clientSecret`、`scope` 走预注册，或设 `oauth: false` 改用 `headers` 里的静态 token。命令行为 `opencode mcp auth`、`opencode mcp list`、`opencode mcp logout`。 [@ref-opencode-mcp-auth] [@ref-opencode-mcp-remote]

## 生命周期、能力与诊断 {#mcp-runtime}

**mcp.lifecycle**：启动时对每个启用条目建立连接，`connectTransport` 使用 `timeout`（源码默认 30s）超时；`enabled: false` 直接返回停用结果，不连接。连接关闭时 `onclose` 清空该服务器的客户端、工具与指令缓存并把状态置为 `failed: Connection closed`，同时发布 `ToolsChanged`；服务器发出 `ToolListChanged` 通知时会重新拉取工具列表。源码未实现自动重连循环，本项对“重连”标 partial。 [@ref-opencode-mcp-code] [@ref-opencode-mcp-lifecycle]

**mcp.capabilities**：注册到 Agent 的只有工具。创建路径仅在服务器声明 `tools` 能力时拉取工具（`getServerCapabilities()?.tools` 为假则列表为空），`i.e.` resources 与 prompts 不会被自动注册为可用能力。源码另有 `prompts`、`resources`、`resourceTemplates` 拉取函数，并在服务 API 暴露 `prompts()` 与 `resources()`，但它们不参与本地工具创建路径。因此 tools、resources、prompts 必须分别判断，不能用其一代表全部。 [@ref-opencode-mcp-code] [@ref-opencode-mcp-catalog]

**mcp.exposure**：MCP 工具以“服务器名加下划线”为前缀注册，因此可以用 `tools` 的通配规则管理可见性：全局 `"my-mcp*": false` 关闭一组，或在 `agent` 对应条目的 `tools` 内单独启用。`permission` 的键同样按工具名通配匹配。文档未描述交互式批准流程的细节，批准语义需要按权限键推断。 [@ref-opencode-mcp-manage]

**mcp.diagnostics**：认证问题用 `opencode mcp auth list` 看状态、`opencode mcp debug my-oauth-server` 测 HTTP 连通与 OAuth 发现，`opencode mcp list` 列出服务器与认证状态。要区分“配置已读、已连接、工具可见、调用成功”四个层次，文档只提供了认证与连接两层的命令，工具可见性需回到 agent 工具集或日志确认，调用成功则无专用入口，故本项标 partial。 [@ref-opencode-mcp-debug] [@ref-opencode-mcp-auth]
