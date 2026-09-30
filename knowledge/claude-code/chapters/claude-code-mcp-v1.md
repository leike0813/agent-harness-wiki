---
schema_version: 3
record_kind: production
edition_id: claude-code-mcp-v1
harness_id: claude-code
topic: mcp
title: Claude Code 的 MCP 配置、连接与暴露
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs:
      - ref-cc-mcp-scopes
      - ref-cc-mcp-precedence
      - ref-cc-mcp-managed
      - ref-cc-mcp-envexpansion
      - ref-cc-mcp-credential
      - ref-cc-mcp-stdio
      - ref-cc-mcp-transports
  - section_id: mcp-auth-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-cc-mcp-auth
      - ref-cc-mcp-headershelper
      - ref-cc-mcp-connectors
      - ref-cc-mcp-reconnect
      - ref-cc-mcp-disable
      - ref-cc-mcp-statusdetail
      - ref-cc-mcp-runtimes
      - ref-cc-mcp-toolsearch
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs:
      - ref-cc-mcp-toolavailability
      - ref-cc-mcp-resources
      - ref-cc-mcp-prompts
      - ref-cc-mcp-limits
      - ref-cc-mcp-dynamic
      - ref-cc-mcp-approvals
      - ref-cc-mcp-toolapproval
      - ref-cc-mcp-orgcontrols
      - ref-cc-mcp-pluginservers
      - ref-cc-mcp-toolsearch
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-mcp-status
      - ref-cc-mcp-statusdetail
      - ref-cc-mcp-warnings
      - ref-cc-npm-readme
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-cc-mcp-scopes
          - ref-cc-mcp-precedence
          - ref-cc-mcp-managed
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-cc-mcp-envexpansion
          - ref-cc-mcp-credential
          - ref-cc-mcp-stdio
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-cc-mcp-transports
          - ref-cc-mcp-stdio
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth-lifecycle
        status: answered
        source_refs:
          - ref-cc-mcp-auth
          - ref-cc-mcp-headershelper
          - ref-cc-mcp-connectors
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth-lifecycle
        status: answered
        source_refs:
          - ref-cc-mcp-reconnect
          - ref-cc-mcp-disable
          - ref-cc-mcp-statusdetail
          - ref-cc-mcp-runtimes
          - ref-cc-mcp-toolsearch
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-cc-mcp-toolavailability
          - ref-cc-mcp-resources
          - ref-cc-mcp-prompts
          - ref-cc-mcp-limits
          - ref-cc-mcp-dynamic
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-cc-mcp-approvals
          - ref-cc-mcp-toolapproval
          - ref-cc-mcp-orgcontrols
          - ref-cc-mcp-pluginservers
          - ref-cc-mcp-toolsearch
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs:
          - ref-cc-mcp-status
          - ref-cc-mcp-statusdetail
          - ref-cc-mcp-warnings
          - ref-cc-npm-readme
---

## 配置入口、作用域与 Server 定义 {#mcp-entry}

**mcp.entry**：MCP server 按三个作用域存储：local 是默认作用域，写在 home 下 `~/.claude.json` 的当前项目条目里，只在该项目生效；project 写在仓库根的 `.mcp.json`，提交后团队共享；user 也写在 `~/.claude.json` 但跨项目生效。组织还可以通过 `managedMcpServers` 与 `managed-mcp.json` 集中下发或限制 server。同名 server 出现在多处时只连接一次，按 local、project、user、插件、claude.ai connector 的顺序取最高优先级的整条定义（字段不跨作用域合并），组织下发的条目再高于全部。 [@ref-cc-mcp-scopes] [@ref-cc-mcp-precedence] [@ref-cc-mcp-managed]

**mcp.definition**：JSON 条目里的 `type` 决定解析方式：缺省时按 stdio 处理，所以带 `url` 却没有 `type` 是配置错误；stdio 使用 `command`、`args`、`env`，远程类型使用 `url`、`headers`、`headersHelper`、`timeout`、`alwaysLoad` 与 `oauth`。变量展开 `${VAR}` 与 `${VAR:-default}` 可用于 `command`、`args`、`env`、`url`、`headers`，但远程 server 的 `url`/`headers` 中一批凭据类变量（如 `ANTHROPIC_AUTH_TOKEN`、`AWS_BEARER_TOKEN_BEDROCK`）一律按空值处理，以避免把凭据发往被写死的 server；`ANTHROPIC_BASE_URL` 之类的基址变量仍会展开。stdio server 启动时宿主向其环境注入 `CLAUDE_PROJECT_DIR`，指向会话项目根。 [@ref-cc-mcp-envexpansion] [@ref-cc-mcp-credential] [@ref-cc-mcp-stdio]

**mcp.transport**：远程推荐 HTTP，SSE 已废弃但仍在 server 拒绝 HTTP 时自动回退，二者都用 `claude mcp add --transport http|sse`；本地用 stdio，参数需放在 `--` 之后；WebSocket 适合服务端主动推送，但只能用 `.mcp.json` 或 `add-json` 配置，且只支持 header 认证。`.mcp.json` 中 `streamable-http` 是 `http` 的别名；`type: sdk` 仅允许 Agent SDK 或桌面应用这类宿主进程内注册。 [@ref-cc-mcp-transports] [@ref-cc-mcp-stdio]

## 认证与生命周期 {#mcp-auth-lifecycle}

**mcp.auth**：远程 server 用 OAuth 2.0，server 以 401 或 403 响应时被标记为需要认证，可用 `/mcp` 或 `claude mcp login NAME` 完成登录，`claude mcp logout` 清除。可固定回调端口、提供预注册的 client id/secret、覆盖 OAuth 元数据发现地址、限制 `oauth.scopes`；logo 存储在系统钥匙串或凭据文件，不写入配置。非 OAuth 方案用 `headersHelper` 在连接时生成 header，宿主以 shell 运行该命令并在 10 秒后放弃。claude.ai 账号登录时，claude.ai 的 connectors 会自动出现在 Claude Code 中，其授权在 claude.ai 侧完成。 [@ref-cc-mcp-auth] [@ref-cc-mcp-headershelper] [@ref-cc-mcp-connectors]

**mcp.lifecycle**：会话启动时连接已启用的 server，远程 server 在曾连接过且启用发现缓存时可显示 cached 状态并推迟到首次调用再连接；server 可被单独 toggle 关闭而不删除配置。掉线重连采用指数退避，最多五次、从 1 秒起翻倍；首次连接与能力发现请求各自有重试。连接使用 v1 或 v2 客户端运行时，v2 基于 MCP TypeScript SDK 2.0 并支持更新的协议修订。工具默认走 tool search 延迟加载，仅工具名与 server 说明在会话开始时进入上下文。 [@ref-cc-mcp-reconnect] [@ref-cc-mcp-disable] [@ref-cc-mcp-statusdetail] [@ref-cc-mcp-runtimes] [@ref-cc-mcp-toolsearch]

## 能力与暴露 {#mcp-capabilities}

**mcp.capabilities**：MCP 的 tools、resources、prompts 是三类独立能力。`/mcp` 会显示每个已连接 server 的工具数，并标出声明了 tools 能力却未暴露任何工具的 server；resources 通过输入 `@` 以 `@server:protocol://path` 形式引用并作为附件注入；prompts 变成 `/servername:promptname` 命令；server 可发 `list_changed` 通知动态更新这三类能力。工具结果有输出上限，超过阈值会落盘并以文件路径替换，可用 `MAX_MCP_OUTPUT_TOKENS` 调整。 [@ref-cc-mcp-toolavailability] [@ref-cc-mcp-resources] [@ref-cc-mcp-prompts] [@ref-cc-mcp-limits] [@ref-cc-mcp-dynamic]

**mcp.exposure**：`.mcp.json` 的 project server 在交互会话中需批准，未信任工作区时该文件的批准被忽略；`disabledMcpjsonServers` 可禁用，单次调用可用 `_meta["anthropic/requiresUserInteraction"]` 强制人工批准。组织可对 claude.ai connector 的工具设 `ask` 或 `blocked`。插件携带的 server 以插件名与 server key 组成的全限定名（`mcp__plugin_` 前缀）命名并随插件启停。tool search 默认延迟工具定义，可用 `alwaysLoad` 让某 server 或某工具始终可见。 [@ref-cc-mcp-approvals] [@ref-cc-mcp-toolapproval] [@ref-cc-mcp-orgcontrols] [@ref-cc-mcp-pluginservers] [@ref-cc-mcp-toolsearch]

## 诊断与来源边界 {#mcp-diagnostics}

**mcp.diagnostics**：`claude mcp list` 与 `claude mcp get NAME` 各自报告配置与健康状态；`claude mcp add` 打印 Added 只代表配置已写入，状态行如 Connected、Needs authentication、Failed to connect 才反映连通性，失败时附上状态码与 server 返回文本。`/mcp` 面板显示工具数、来源与缓存状态，并可 reconnect 或 clear authentication。配置层警告覆盖隐藏空白、跨作用域同名端点冲突、未设置且无默认值的变量以及保留 server 名；读取 `claude --debug-file` 日志可看到凭据变量被抑制的线索。 [@ref-cc-mcp-status] [@ref-cc-mcp-statusdetail] [@ref-cc-mcp-warnings]

关于版本：本章所引官方页面未标注适用版本，`version_applicability` 为 unknown，正文中出现多处 `v2.1.x` 门槛。选定的 npm 包快照记录版本 2.1.283，包内 README 只指向在线文档，不能据此把这些机制固定到该精确版本。 [@ref-cc-npm-readme]
