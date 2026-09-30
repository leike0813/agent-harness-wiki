---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-mcp-v1
harness_id: zoo-code
topic: mcp
title: "Zoo Code VS Code 扩展的 MCP：配置、传输、能力与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-mcp-config, ref-zoo-code-src-mcp-global-path, ref-zoo-code-src-mcp-project-watch, ref-zoo-code-docs-mcp-enable]
  - section_id: mcp-definition
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-mcp-type-infer, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-src-mcp-stdio, ref-zoo-code-docs-mcp-stdio-params, ref-zoo-code-docs-mcp-http-params, ref-zoo-code-docs-mcp-sse-params, ref-zoo-code-src-mcp-oauth-provider, ref-zoo-code-src-mcp-oauth]
  - section_id: mcp-transport
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-transport-choose, ref-zoo-code-docs-transport-stdio, ref-zoo-code-docs-transport-http, ref-zoo-code-docs-transport-sse, ref-zoo-code-src-mcp-stdio, ref-zoo-code-docs-use-mcp-tool-features]
  - section_id: mcp-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-mcp-disable, ref-zoo-code-src-mcp-global-watch, ref-zoo-code-src-mcp-project-watch, ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-docs-mcp-manage, ref-zoo-code-src-mcp-config-schema]
  - section_id: mcp-capabilities
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-mcp-resources, ref-zoo-code-src-mcp-read-resource, ref-zoo-code-src-mcp-name, ref-zoo-code-src-mcp-tool-name, ref-zoo-code-src-mcp-server-tools, ref-zoo-code-docs-use-mcp-tool, ref-zoo-code-docs-access-mcp-resource, ref-zoo-code-docs-use-mcp-tool-features, ref-zoo-code-docs-access-mcp-features, ref-zoo-code-docs-mcp-mode-limit, ref-zoo-code-src-tool-policy]
  - section_id: mcp-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-mcp-manage, ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-docs-mcp-trouble, ref-zoo-code-src-mcp-const, ref-zoo-code-src-mcp-tool-name, ref-zoo-code-docs-marketplace-trouble]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [vscode]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-zoo-code-docs-mcp-config, ref-zoo-code-src-mcp-global-path, ref-zoo-code-src-mcp-project-watch, ref-zoo-code-docs-mcp-enable]
  - question_id: mcp.definition
    answers:
      - surface_ids: [vscode]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-zoo-code-src-mcp-type-infer, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-src-mcp-stdio, ref-zoo-code-docs-mcp-stdio-params, ref-zoo-code-docs-mcp-http-params, ref-zoo-code-docs-mcp-sse-params, ref-zoo-code-src-mcp-oauth-provider, ref-zoo-code-src-mcp-oauth]
  - question_id: mcp.transport
    answers:
      - surface_ids: [vscode]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-zoo-code-docs-transport-choose, ref-zoo-code-docs-transport-stdio, ref-zoo-code-docs-transport-http, ref-zoo-code-docs-transport-sse, ref-zoo-code-src-mcp-stdio, ref-zoo-code-docs-use-mcp-tool-features]
  - question_id: mcp.auth
    answers:
      - surface_ids: [vscode]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-zoo-code-src-mcp-type-infer, ref-zoo-code-src-mcp-config-schema, ref-zoo-code-src-mcp-stdio, ref-zoo-code-docs-mcp-stdio-params, ref-zoo-code-docs-mcp-http-params, ref-zoo-code-docs-mcp-sse-params, ref-zoo-code-src-mcp-oauth-provider, ref-zoo-code-src-mcp-oauth]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-mcp-disable, ref-zoo-code-src-mcp-global-watch, ref-zoo-code-src-mcp-project-watch, ref-zoo-code-src-mcp-watchpaths, ref-zoo-code-docs-mcp-manage, ref-zoo-code-src-mcp-config-schema]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [vscode]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-mcp-resources, ref-zoo-code-src-mcp-read-resource, ref-zoo-code-src-mcp-name, ref-zoo-code-src-mcp-tool-name, ref-zoo-code-src-mcp-server-tools, ref-zoo-code-docs-use-mcp-tool, ref-zoo-code-docs-access-mcp-resource, ref-zoo-code-docs-use-mcp-tool-features, ref-zoo-code-docs-access-mcp-features, ref-zoo-code-docs-mcp-mode-limit, ref-zoo-code-src-tool-policy]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [vscode]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-src-mcp-resources, ref-zoo-code-src-mcp-read-resource, ref-zoo-code-src-mcp-name, ref-zoo-code-src-mcp-tool-name, ref-zoo-code-src-mcp-server-tools, ref-zoo-code-docs-use-mcp-tool, ref-zoo-code-docs-access-mcp-resource, ref-zoo-code-docs-use-mcp-tool-features, ref-zoo-code-docs-access-mcp-features, ref-zoo-code-docs-mcp-mode-limit, ref-zoo-code-src-tool-policy]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-zoo-code-docs-mcp-manage, ref-zoo-code-src-mcp-init-fetch, ref-zoo-code-docs-mcp-trouble, ref-zoo-code-src-mcp-const, ref-zoo-code-src-mcp-tool-name, ref-zoo-code-docs-marketplace-trouble]
---

本章采写 Zoo Code（VS Code 扩展）的 MCP 接入：配置文件与作用域、server 定义与凭据、三种传输、连接生命周期、能力暴露与诊断。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` 上的 `src/services/mcp/`、`src/utils/mcp-name.ts`、`src/core/prompts/tools/`，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的 `docs/features/mcp/*` 与两个 MCP 工具页。

## 配置入口、作用域与优先级 {#mcp-entry}

MCP server 配置有两级：全局 `mcp_settings.json` 与项目级 `.roo/mcp.json`，同名 server 时项目级配置优先生效 [@ref-zoo-code-docs-mcp-config]。

- 全局文件放在扩展的全局存储目录下的 `settings/` 中：路径由 `provider.ensureSettingsDirectoryExists()` 决定，文件名取自 `GlobalFileNames.mcpSettings`（`mcp_settings.json`）[@ref-zoo-code-src-mcp-global-path]。该文件不存在时，宿主用带文件锁的 `safeWriteJson` 写入 `{ "mcpServers": {} }` 作为初始内容 [@ref-zoo-code-src-mcp-global-path]。
- 项目文件固定是工作区根下的 `.roo/mcp.json`，宿主用 `RelativePattern` 监视它，并在工作区文件夹变化时重建连接；文件被删除时项目级 server 全部移除 [@ref-zoo-code-src-mcp-project-watch]。
- MCP 总开关在 MCP Servers 视图里：关闭后从系统提示词中移除全部 MCP 相关定义，`use_mcp_tool` 与 `access_mcp_resource` 不再出现，也不连接任何 server；默认开启 [@ref-zoo-code-docs-mcp-enable]。
- 编辑入口：MCP 视图底部的 `Edit Global MCP` 与 `Edit Project MCP` 直接打开这两个文件，后者不存在时会被创建 [@ref-zoo-code-docs-mcp-config]。

```json
// 依据 docs/features/mcp/using-mcp-in-roo.mdx 的 Configuring MCP Servers 一节
{
  "mcpServers": {
    "server1": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": { "API_KEY": "your_api_key" },
      "alwaysAllow": ["tool1", "tool2"],
      "disabled": false
    }
  }
}
```

## Server 定义字段与凭据 {#mcp-definition}

两种形态由字段自动判别：含 `command` 的按 stdio 处理，含 `url` 的必须显式给 `type`，否则报错——Zoo Code 不会仅凭 URL 推断传输 [@ref-zoo-code-src-mcp-type-infer]。混合 stdio 与 URL 字段也会被拒绝 [@ref-zoo-code-src-mcp-type-infer]。

共有的第一方字段（依据 `src/services/mcp/McpHub.ts` 的 config schema）[@ref-zoo-code-src-mcp-config-schema]：

| 字段 | 适用 | 说明 |
| --- | --- | --- |
| `command` | stdio | 可执行文件；在 Windows 上会被包一层 `cmd.exe /c` 以兼容以 PowerShell 脚本实现的命令（fnm、nvm-windows、volta）[@ref-zoo-code-src-mcp-stdio] |
| `args` | stdio | 字符串数组；支持 `${env:变量名}` 展开，从系统环境取敏感值，避免把密钥写进配置 [@ref-zoo-code-docs-mcp-stdio-params] |
| `env` | stdio | 追加到 `getDefaultEnvironment()` 之上的环境变量 [@ref-zoo-code-src-mcp-stdio] |
| `cwd` | stdio | 启动 server 的工作目录；省略时用第一个工作区目录或主进程工作目录 [@ref-zoo-code-docs-mcp-stdio-params] |
| `url` | sse / streamable-http | 远端端点 [@ref-zoo-code-docs-mcp-http-params] |
| `headers` | sse / streamable-http | 附加 HTTP 头，常见用途是 API key 或 Bearer token [@ref-zoo-code-docs-mcp-http-params] |
| `timeout` | 全部 | 单 server 超时秒数，1–3600，默认 60 [@ref-zoo-code-src-mcp-config-schema] |
| `alwaysAllow` | 全部 | 自动批准的工具名数组，默认空 [@ref-zoo-code-src-mcp-config-schema] |
| `watchPaths` | 全部 | 需要监视的文件路径，变化时自动重启该 server [@ref-zoo-code-src-mcp-config-schema] |
| `disabledTools` | 全部 | 该 server 上被禁用、不提供给模型也不可调用的工具名，默认空 [@ref-zoo-code-src-mcp-config-schema] |
| `disabled` | 全部 | 置 `true` 时不连接，仅在列表里保留占位 [@ref-zoo-code-src-mcp-config-schema] |

凭据有三种来源，按推荐程度排列：

1. 远端 server 用 `headers` 传 token，例如 `Authorization: Bearer ...`（示例里的值都是占位符）[@ref-zoo-code-docs-mcp-sse-params]。
2. stdio server 用 `env` 或 `${env:...}` 从系统环境注入 [@ref-zoo-code-docs-mcp-stdio-params]。
3. 远端 server 支持 OAuth 时由宿主接管：`McpOAuthClientProvider` 实现 MCP SDK 的 `OAuthClientProvider`，用 VS Code SecretStorage 存取 token、起本地 HTTP 回调服务器接收授权码、打开浏览器完成重定向，并保存 PKCE 校验值 [@ref-zoo-code-src-mcp-oauth-provider]。连接时若发现该 URL 曾被判定为“非 OAuth”且 SecretStorage 里没有 OAuth 数据，就跳过一次发现探测；否则执行 OAuth 元数据发现并在收到 401 后启动授权流程 [@ref-zoo-code-src-mcp-oauth]。token 过期缓冲区为 5 分钟，授权流程超时为 5 分钟 [@ref-zoo-code-src-mcp-oauth]。

## 传输类型 {#mcp-transport}

支持 stdio、streamable-http、sse 三种；新建远端 server 建议用 streamable-http，sse 仅用于兼容旧 server [@ref-zoo-code-docs-transport-choose]。

| 传输 | 配置判定 | 连接方式 |
| --- | --- | --- |
| `stdio` | 有 `command`，`type` 可省略（省略即按 stdio） | 宿主把 server 作为子进程启动，经 stdin/stdout 交换 JSON 消息，逐条以换行分隔 [@ref-zoo-code-docs-transport-stdio] |
| `streamable-http` | 有 `url` 且 `type: "streamable-http"` | 单个 MCP 端点的 HTTP POST/GET，可选 SSE 流 [@ref-zoo-code-docs-transport-http] |
| `sse` | 有 `url` 且 `type: "sse"` | 旧式双端点：GET `/events` 建立事件流，POST `/message` 发请求 [@ref-zoo-code-docs-transport-sse] |

- 三种传输在实现上分别落到 SDK 的 `StdioClientTransport`、`StreamableHTTPClientTransport`、`SSEClientTransport` [@ref-zoo-code-src-mcp-stdio] [@ref-zoo-code-docs-use-mcp-tool-features]。
- stdio 的 Windows 兼容层只在命令不是 `cmd`/`cmd.exe` 时生效，且会把原始参数追加在 `/c` 之后 [@ref-zoo-code-src-mcp-stdio]。

## 连接生命周期 {#mcp-lifecycle}

- 配置读取后立即建立连接：每个未禁用的 server 都会创建客户端，连接成功后拉取工具、资源与资源模板三类清单并写入连接对象 [@ref-zoo-code-src-mcp-init-fetch]。
- 禁用有两条路径：全局总开关（`DisableReason.MCP_DISABLED`）与单个 server 的 `disabled`（`DisableReason.SERVER_DISABLED`），两者都只建占位连接、不真正连接 [@ref-zoo-code-src-mcp-disable]。
- 重新连接由文件变化驱动：全局 `mcp_settings.json` 与项目 `.roo/mcp.json` 都有文件监视器，变化时重新读取配置并更新连接 [@ref-zoo-code-src-mcp-global-watch] [@ref-zoo-code-src-mcp-project-watch]。
- `watchPaths` 用 chokidar 监视自定义路径，命中变化后调用 `restartConnection(name, source)` 重启对应 server [@ref-zoo-code-src-mcp-watchpaths]。
- 也可以在 MCP 视图里手动重启（刷新按钮）、启用/停用（开关）或删除（垃圾桶按钮）单个 server [@ref-zoo-code-docs-mcp-manage]。
- 超时按 server 独立生效：默认 60 秒，可在 1–3600 秒之间调整；该值同时是「工具调用后等待响应的最长时间」[@ref-zoo-code-docs-mcp-manage] [@ref-zoo-code-src-mcp-config-schema]。
- 工具自动批准是两级开关：先打开全局 `Use MCP servers` 自动批准，再在 server 设置里对具体工具勾选 `Always allow`；全局关闭时任何工具都不会被自动批准 [@ref-zoo-code-docs-mcp-manage]。

## 能力暴露与调用 {#mcp-capabilities}

连接后只枚举 tools 与 resources（含资源模板）；固定来源中没有 prompts 的枚举请求，也没有面向 prompts 的工具入口 [@ref-zoo-code-src-mcp-init-fetch] [@ref-zoo-code-src-mcp-resources]。

- 连接成功后依次请求 `tools/list`、`resources/list`、`resources/templates/list`；资源读取走 `resources/read` [@ref-zoo-code-src-mcp-init-fetch] [@ref-zoo-code-src-mcp-read-resource]。
- 工具名会被重写为 `mcp--服务器名--工具名` 的统一函数名：分隔符固定为双连字符，前缀为 `mcp`，服务器名与工具名分别做 API 兼容的净化；模型把连字符写成下划线时（`mcp__server__tool`）会被规范化回 `mcp--...` 形式 [@ref-zoo-code-src-mcp-name] [@ref-zoo-code-src-mcp-tool-name]。
- 动态工具定义由 `getMcpServerTools()` 生成：跳过 `enabledForPrompt === false` 的工具，按净化后的名字去重（先到先得，项目 server 先于全局 server），并在传给模型前把工具的 `inputSchema` 规范化为 JSON Schema 2020-12 兼容形式；没有 schema 时给一个空对象 schema [@ref-zoo-code-src-mcp-server-tools]。
- 调用入口是 `use_mcp_tool`（参数 `server_name`、`tool_name`、`arguments`）与 `access_mcp_resource`（参数 `server_name`、`uri`）；前者执行动作，后者取上下文数据，两者都不能互相替代 [@ref-zoo-code-docs-use-mcp-tool] [@ref-zoo-code-docs-access-mcp-resource]。
- 工具结果可包含文本、图片与资源引用；参数在客户端与服务端各做一次 schema 校验 [@ref-zoo-code-docs-use-mcp-tool-features] [@ref-zoo-code-docs-access-mcp-features]。
- mode 级限制由 `allowedMcpServers` 表达：省略=全部 server 可用，空数组=一个都不可用，列出名字=只允许这些；mode 的 `groups` 里没有 `mcp` 时连工具带资源一起不可用 [@ref-zoo-code-docs-mcp-mode-limit]。
- 限制在执行层也生效：工具策略在生成可用工具集时同时剔除 `disabledTools` 与模型 `excludedTools` 命中的名字，并在允许的 server 实际没有资源或没有可提示工具时分别删除 `access_mcp_resource`、`use_mcp_tool` [@ref-zoo-code-src-tool-policy]。

## 诊断与排查 {#mcp-diagnostics}

- 判定顺序：先确认配置被读取（MCP 视图里是否出现该 server、状态是否 `connected`），再看工具是否列出，最后看调用是否成功 [@ref-zoo-code-docs-mcp-manage] [@ref-zoo-code-src-mcp-init-fetch]。
- 状态对象带 `status: connected | connecting | disconnected`、`error` 与 `errorHistory`，连接失败时状态回落到 `disconnected` 并记录错误 [@ref-zoo-code-src-mcp-init-fetch]。
- 文档给出的四类常见现象与处置：server 无响应（查进程与网络）、权限错误（查 `mcp_settings.json` 或 `.roo/mcp.json` 里的凭据）、工具不可用（确认 server 确实实现该工具且未被禁用）、性能慢（调整该 server 的网络超时）[@ref-zoo-code-docs-mcp-trouble]。
- 工具过多会降低模型选择质量：`MAX_MCP_TOOLS_THRESHOLD = 60` 是提示阈值 [@ref-zoo-code-src-mcp-const]。
- 工具名净化与去重逻辑同时服务于 Gemini 等对函数名有额外限制的 provider [@ref-zoo-code-src-mcp-tool-name]。
- 装载失败时可在 Zoo Code 的输出面板查看错误信息；marketplace 安装项“装了不生效”的排查同样指向该面板 [@ref-zoo-code-docs-marketplace-trouble]。
