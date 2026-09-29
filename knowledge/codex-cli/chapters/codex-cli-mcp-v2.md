---
schema_version: 2
record_kind: production
edition_id: codex-cli-mcp-v2
harness_id: codex-cli
topic: mcp
title: "Codex CLI 主题章节：MCP"
sections:
  - section_id: mcp-entry
    source_refs:
      - ref-codex-cli-mcp-host-doc
      - ref-codex-cli-mcp-cli-doc
  - section_id: mcp-server-definition
    source_refs:
      - ref-codex-cli-mcp-keys-config
      - ref-codex-cli-mcp-env-config
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - section_id: mcp-transports
    source_refs:
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - section_id: mcp-auth
    source_refs:
      - ref-codex-cli-mcp-oauth-doc
      - ref-codex-cli-mcp-http-doc
  - section_id: mcp-lifecycle-exposure
    source_refs:
      - ref-codex-cli-mcp-options-doc
      - ref-codex-cli-mcp-grace-config
      - ref-codex-cli-mcp-required-config
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-exposure-config
  - section_id: mcp-diagnostics
    source_refs:
      - ref-codex-cli-mcp-cli-doc
      - ref-codex-cli-mcp-options-doc
questions:
  - question_id: mcp.entry
    section_id: mcp-entry
    status: answered
    source_refs:
      - ref-codex-cli-mcp-host-doc
      - ref-codex-cli-mcp-cli-doc
  - question_id: mcp.definition
    section_id: mcp-server-definition
    status: partial
    source_refs:
      - ref-codex-cli-mcp-keys-config
      - ref-codex-cli-mcp-env-config
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - question_id: mcp.transport
    section_id: mcp-transports
    status: answered
    source_refs:
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-stdio-doc
      - ref-codex-cli-mcp-http-doc
  - question_id: mcp.auth
    section_id: mcp-auth
    status: answered
    source_refs:
      - ref-codex-cli-mcp-oauth-doc
      - ref-codex-cli-mcp-http-doc
  - question_id: mcp.lifecycle
    section_id: mcp-lifecycle-exposure
    status: answered
    source_refs:
      - ref-codex-cli-mcp-options-doc
      - ref-codex-cli-mcp-grace-config
      - ref-codex-cli-mcp-required-config
  - question_id: mcp.capabilities
    section_id: mcp-lifecycle-exposure
    status: partial
    source_refs:
      - ref-codex-cli-mcp-transport-doc
      - ref-codex-cli-mcp-exposure-config
  - question_id: mcp.exposure
    section_id: mcp-lifecycle-exposure
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

本主题的固定来源是官方 MCP 文档快照（snapshot-codex-cli-mcp-doc，抓取于 2026-09-27，resolved_url 为 learn.chatgpt.com/docs/extend/mcp.md?surface=cli）与配置参考快照（snapshot-codex-cli-configuration-doc）。两者都没有把内容绑定到具体的 npm 包版本，因此下文区分文档描述的机制与某个已安装 CLI 版本的行为。

## 配置入口与作用域 {#mcp-entry}

MCP 配置写在 `config.toml`，默认位置是 `~/.codex/config.toml`；也可以把 server 限定到某个项目，用项目根下的 `.codex/config.toml`，但只对受信任项目加载。ChatGPT 桌面应用、Codex CLI 与 IDE 扩展共享同一 host 的这份配置。[@ref-codex-cli-mcp-host-doc][@ref-codex-cli-mcp-cli-doc]

也可以直接用 CLI 写入。下面把 Context7 加为一个本地 stdio server：

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

前提是 `npx` 已安装并可用，且这条命令会从 registry 获取第三方包 `@upstash/context7-mcp`。执行成功只表示配置已写入，不代表 server 已连接或工具可调用。`codex mcp list` 查看已配置 server，`codex mcp --help` 列出全部 MCP 命令，TUI 内用 `/mcp` 查看当前活动的 server。[@ref-codex-cli-mcp-cli-doc]

## Server 定义与字段 {#mcp-server-definition}

每个 server 是 `[mcp_servers.NAME]` 表，NAME 是 server 名。STDIO 字段有 `command`（必需）、`args`、`env`、`env_vars`、`cwd`、`experimental_environment`；HTTP 字段有 `url`（必需）、`auth`、`bearer_token_env_var`、`http_headers`、`env_http_headers`、`http_headers_helper`。[@ref-codex-cli-mcp-keys-config][@ref-codex-cli-mcp-http-doc]

`env_vars` 是一个数组，元素既可以是纯变量名，也可以是带 `name` 与 `source` 的对象，`source` 取 `"local"` 或 `"remote"`，例如 `env_vars = ["LOCAL_TOKEN", { name = "REMOTE_TOKEN", source = "remote" }]`；字符串条目默认按 `"local"` 处理，`"remote"` 只在远端执行器下的 stdio 使用，并从远端环境读取变量。[@ref-codex-cli-mcp-env-config][@ref-codex-cli-mcp-stdio-doc] 未验证：固定来源没有描述 `env_vars` 之外的通用变量展开规则，也没有说明 `cwd` 用相对路径时的解析基准。

## STDIO 与 Streamable HTTP 服务器 {#mcp-transports}

支持两类第一方传输。STDIO 是本地进程，由 `command` 启动并支持环境变量；Streamable HTTP 以 `url` 访问，支持 Bearer token、OAuth（含 Client ID Metadata Documents 与 Dynamic Client Registration），以及对受信第一方 origin 的 ChatGPT 会话认证。服务器在初始化返回的 `instructions` 字段会被读取，作为 server 级引导。[@ref-codex-cli-mcp-transport-doc][@ref-codex-cli-mcp-stdio-doc][@ref-codex-cli-mcp-http-doc]

STDIO 的一个完整最小块，写入 `~/.codex/config.toml`：

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
```

字段与检查：`command` 是要执行的命令，`args` 传给命令。需要转发本地环境变量时另加 `env_vars`（白名单），需要直接为该进程设置变量时另加 `env`；两者按需添加，不在最小块内。前提是 `command` 在本机可执行（这里还要求 `npx` 可用并能取到第三方包）。结果是 Codex 能启动这个本地 server 并把它的工具放进当前会话；检查分两步观察，`codex mcp list` 里出现 `context7` 只说明配置被读入，是否连接成功、工具是否可见要看会话中的 MCP 状态与工具列表。[@ref-codex-cli-mcp-stdio-doc]

Streamable HTTP 的一个完整最小块，取自官方文档里的 Figma 示例：

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
```

字段与检查：`url` 是端点；`bearer_token_env_var` 给出提供 `Authorization` 的 Bearer 环境变量名。需要时还可加 `http_headers`（随每次请求发送的静态 header）与 `env_http_headers`（header 值取自环境变量）。前提是目标服务真实存在，且环境里已有该凭据；固定来源没有把这份示例绑定到具体 npm 包版本，实际连通与授权结果未验证。结果是 Codex 以 HTTP 连接该 server。注意：在文件里列出一个 server 只表示配置存在，`codex mcp list` 也只能证实配置列表；工具是否可见、以及一次工具调用是否成功，需要分别观察。[@ref-codex-cli-mcp-http-doc]

## 认证与 OAuth {#mcp-auth}

HTTP server 的凭据来源按 `bearer_token_env_var`、静态 `http_headers`、取自环境变量的 `env_http_headers`、`http_headers_helper`（本地命令打印 JSON header 对象）的顺序尝试。helper header 会被缓存；同源 POST 返回 401 或 403 后刷新一次，只有 helper 返回变化值时才重试；显式 bearer 与 OAuth 凭据优先于 helper 提供的 `Authorization`；OAuth 返回 403 且报 scope 不足时不触发刷新。[@ref-codex-cli-mcp-oauth-doc][@ref-codex-cli-mcp-http-doc]

OAuth 登录用 `codex mcp login SERVER`：

```bash
codex mcp login figma
```

没有可用凭据来源时，Codex 仍可匿名连接。需要自定义回调路径或远程 Devbox ingress 时设 `mcp_oauth_callback_url`；需要固定全局监听端口时设 `mcp_oauth_callback_port`。[@ref-codex-cli-mcp-oauth-doc]

## 生命周期、能力与工具暴露 {#mcp-lifecycle-exposure}

`startup_timeout_sec` 默认 10 秒，`tool_timeout_sec` 默认 60 秒；`enabled = false` 禁用但保留配置；`required = true` 时该 server 初始化失败会使 startup 或 resume 失败。顶层 `mcp_optional_startup_grace_ms` 默认 1000 毫秒，控制构建初始工具目录时等待可选 server 的时长，设为 0 则退化为各 server 自己的 `startup_timeout_sec`。[@ref-codex-cli-mcp-options-doc][@ref-codex-cli-mcp-grace-config][@ref-codex-cli-mcp-required-config]

工具暴露与审批：`enabled_tools` 是允许列表，`disabled_tools` 在其之后应用；`default_tools_approval_mode` 取 `auto`、`prompt`、`writes`、`approve`，其中 `writes` 对未标只读的工具提示；`tools.TOOL.approval_mode` 覆盖单个工具，`tools.TOOL.output_token_limit` 覆盖该工具的输出预算。下面是一个把超时、允许列表、审批与单工具覆盖写在一起的完整块。[@ref-codex-cli-mcp-exposure-config][@ref-codex-cli-mcp-options-doc]

```toml
[mcp_servers.chrome_devtools]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
disabled_tools = ["screenshot"]
default_tools_approval_mode = "prompt"
startup_timeout_sec = 20
tool_timeout_sec = 45
enabled = true

[mcp_servers.chrome_devtools.tools.open]
approval_mode = "approve"
output_token_limit = 30000
```

字段与检查：`url` 是本地 HTTP 端点，`enabled_tools` 与 `disabled_tools` 共同决定可用工具（`disabled_tools` 后应用，示例里最终不暴露 `screenshot`），`default_tools_approval_mode` 决定默认审批，`startup_timeout_sec` 与 `tool_timeout_sec` 覆盖默认超时，`tools.open` 的两项只对 `open` 生效。前提是 `url` 指向可连接的 server；结果是列出的工具按这套过滤与审批规则暴露。[@ref-codex-cli-mcp-exposure-config]

插件提供的 MCP server 在 `plugins.PLUGIN.mcp_servers.SERVER` 下接受同样的开关与策略，不必改插件清单：

```toml
[plugins."sample@test".mcp_servers.sample]
enabled = true
default_tools_approval_mode = "prompt"
enabled_tools = ["read", "search"]

[plugins."sample@test".mcp_servers.sample.tools.search]
approval_mode = "approve"
```

字段与检查：这几行只覆盖每个 server 的开关与工具策略，server 本身仍由插件清单启动；前提是插件已安装并启用，且 server 名与清单里声明的一致。结果是不改插件清单即可调整它的工具策略。[@ref-codex-cli-mcp-exposure-config]

能力项状态 partial：固定来源确认 tools 可被发现和调用，`instructions` 会参与 server 级引导；resources 与 prompts 能否被发现和使用，来源未作说明，因此不能用 tools 的能力代表全部。[@ref-codex-cli-mcp-transport-doc][@ref-codex-cli-mcp-exposure-config]

## 诊断 {#mcp-diagnostics}

`codex mcp list` 查看已配置 server，`codex mcp --help` 列出全部 MCP 命令，TUI 内用 `/mcp` 查看当前活动的 server。[@ref-codex-cli-mcp-cli-doc] 状态 partial：固定来源没有把"配置已读取 / server 已连接 / 工具可见 / 调用成功"拆成各自独立的诊断入口，目前只能从这几个命令的合并输出判断。[@ref-codex-cli-mcp-options-doc]
