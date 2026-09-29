---
schema_version: 2
record_kind: production
edition_id: codex-cli-mcp-v1
harness_id: codex-cli
topic: mcp
title: "Codex CLI 主题章节：MCP"
sections:
  - section_id: mcp-entry-definition
    source_refs:
      - ref-codex-cli-mcp-host-doc
      - ref-codex-cli-mcp-cli-doc
      - ref-codex-cli-mcp-keys-config
      - ref-codex-cli-mcp-env-config
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - section_id: mcp-transport-auth
    source_refs:
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
      - ref-codex-cli-mcp-oauth-doc
      - ref-codex-cli-mcp-plugin-doc
  - section_id: mcp-lifecycle-capabilities
    source_refs:
      - ref-codex-cli-mcp-options-doc
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-grace-config
      - ref-codex-cli-mcp-required-config
      - ref-codex-cli-mcp-exposure-config
  - section_id: mcp-diagnostics
    source_refs:
      - ref-codex-cli-mcp-cli-doc
      - ref-codex-cli-mcp-options-doc
questions:
  - question_id: mcp.entry
    section_id: mcp-entry-definition
    status: answered
    source_refs:
      - ref-codex-cli-mcp-host-doc
      - ref-codex-cli-mcp-cli-doc
  - question_id: mcp.definition
    section_id: mcp-entry-definition
    status: partial
    source_refs:
      - ref-codex-cli-mcp-keys-config
      - ref-codex-cli-mcp-env-config
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - question_id: mcp.transport
    section_id: mcp-transport-auth
    status: answered
    source_refs:
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - question_id: mcp.auth
    section_id: mcp-transport-auth
    status: answered
    source_refs:
      - ref-codex-cli-mcp-oauth-doc
      - ref-codex-cli-mcp-http-doc
  - question_id: mcp.lifecycle
    section_id: mcp-lifecycle-capabilities
    status: answered
    source_refs:
      - ref-codex-cli-mcp-options-doc
      - ref-codex-cli-mcp-grace-config
      - ref-codex-cli-mcp-required-config
  - question_id: mcp.capabilities
    section_id: mcp-lifecycle-capabilities
    status: partial
    source_refs:
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-exposure-config
  - question_id: mcp.exposure
    section_id: mcp-lifecycle-capabilities
    status: answered
    source_refs:
      - ref-codex-cli-mcp-exposure-config
      - ref-codex-cli-mcp-options-doc
  - question_id: mcp.diagnostics
    section_id: mcp-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-mcp-cli-doc
      - ref-codex-cli-mcp-options-doc
---

## 入口与 Server 定义 {#mcp-entry-definition}

固定来源为官方 MCP 文档快照（snapshot-codex-cli-mcp-doc，resolved_url 为 learn.chatgpt.com/docs/extend/mcp.md?surface=cli）与配置参考快照（snapshot-codex-cli-configuration-doc）。两者都未把内容绑定到具体的 npm 包版本。

**mcp.entry**：MCP 配置写在 `config.toml`，默认是 `~/.codex/config.toml`；项目级 `.codex/config.toml` 可限定 server，但只对受信任项目加载。ChatGPT 桌面应用、Codex CLI 与 IDE 扩展共享同一 host 的这份配置；也可以用 `codex mcp add` 通过 CLI 写入。[@ref-codex-cli-mcp-host-doc][@ref-codex-cli-mcp-cli-doc]

**mcp.definition**：每个 server 是 `[mcp_servers.NAME]` 表。stdio 服务器字段为 `command`（必需）、`args`、`env`、`env_vars`、`cwd`、`experimental_environment`；`env_vars` 可写纯变量名或 `{ name, source = "local" | "remote" }` 对象，字符串条目默认 `local`。HTTP 服务器字段为 `url`、`auth`、`bearer_token_env_var`、`http_headers`、`env_http_headers`、`http_headers_helper`。本项为 partial：固定来源没有描述通用的 `变量展开` 规则（除 `env_vars` 的 source 机制外），也没有说明 `cwd` 用相对路径时的解析基准。[@ref-codex-cli-mcp-keys-config][@ref-codex-cli-mcp-env-config][@ref-codex-cli-mcp-stdio-doc][@ref-codex-cli-mcp-http-doc]

## 传输与认证 {#mcp-transport-auth}

**mcp.transport**：支持两类第一方传输。STDIO：本地进程，由 `command` 启动，支持环境变量。Streamable HTTP：以 `url` 访问，支持 Bearer token、OAuth（含 Client ID Metadata Documents 与 Dynamic Client Registration），以及对受信第一方 origin 的 ChatGPT 会话认证。服务器在初始化返回的 `instructions` 字段会被读取并作为 server 级引导。[@ref-codex-cli-mcp-transport-doc][@ref-codex-cli-mcp-stdio-doc][@ref-codex-cli-mcp-http-doc]

**mcp.auth**：HTTP server 的凭据来源包括 `bearer_token_env_var`、静态 `http_headers`、来自环境变量的 `env_http_headers`，以及 `http_headers_helper`（本地命令打印 JSON header）。helper header 会被缓存；同源 POST 返回 401 或 403 后刷新一次，仅在 helper 返回变化值时才重试；显式 bearer 与 OAuth 凭据优先于 helper 的 `Authorization`。OAuth 登录用 `codex mcp login NAME`；没有凭据来源时 Codex 仍可匿名连接。[@ref-codex-cli-mcp-oauth-doc][@ref-codex-cli-mcp-http-doc]

## 生命周期与能力暴露 {#mcp-lifecycle-capabilities}

**mcp.lifecycle**：`startup_timeout_sec` 默认 10 秒，`tool_timeout_sec` 默认 60 秒；`enabled = false` 禁用而保留配置；`required = true` 时该 server 初始化失败会使 startup 或 resume 失败。顶层 `mcp_optional_startup_grace_ms` 默认 1000 毫秒，控制构建初始工具目录时等待可选 server 的时长，设为 0 则退化为各 server 自己的 `startup_timeout_sec`。[@ref-codex-cli-mcp-options-doc][@ref-codex-cli-mcp-grace-config][@ref-codex-cli-mcp-required-config]

**mcp.capabilities**：固定来源确认 tools 可被发现和调用，服务器 `instructions` 会参与 server 级引导。状态 partial：resources 与 prompts 能否被发现和使用，来源未作说明，因此不能用 tools 的能力代替全部。[@ref-codex-cli-mcp-transport-doc][@ref-codex-cli-mcp-exposure-config]

**mcp.exposure**：`enabled_tools` 是工具允许列表，`disabled_tools` 在其之后应用；`default_tools_approval_mode` 取 `auto`、`prompt`、`writes`、`approve`，其中 `writes` 会对未标只读的工具提示；`tools.TOOL.approval_mode` 覆盖单个工具，`tools.TOOL.output_token_limit` 覆盖该工具的输出预算。插件提供的 MCP server 可在 `plugins.PLUGIN.mcp_servers.SERVER` 下接受同样的开关与策略。[@ref-codex-cli-mcp-exposure-config][@ref-codex-cli-mcp-options-doc]

## 诊断 {#mcp-diagnostics}

**mcp.diagnostics**：`codex mcp list` 查看已配置 server，`codex mcp --help` 列出全部 MCP 命令，TUI 内用 `/mcp` 查看当前活动的 server。状态 partial：固定来源没有把"配置已读取 / server 已连接 / 工具可见 / 调用成功"拆成各自独立的诊断入口，因此现在只能从这几个命令的合并输出判断。[@ref-codex-cli-mcp-cli-doc][@ref-codex-cli-mcp-options-doc]
