---
schema_version: 3
record_kind: production
edition_id: bob-cli-mcp-v2
harness_id: bob
topic: mcp
title: "Bob Shell 的 MCP：入口、传输、认证、能力与生命周期"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-global-path, ref-bob-mcp-oauth-scope, ref-bob-changelog-mcpcli, ref-bob-slash-builtin]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-props-transport, ref-bob-mcp-sse-removed, ref-bob-mcp-oauth-scope, ref-bob-mcp-security-warning, ref-bob-slash-secrets]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-stdio, ref-bob-mcp-sse-removed, ref-bob-mcp-http, ref-bob-mcp-versions, ref-bob-mcp-transports-removed, ref-bob-mcp-transports-lifecycle, ref-bob-mcp-transports-remote-http, ref-bob-mcp-transports-compare-http]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-oauth-flow-steps, ref-bob-mcp-oauth-props-object, ref-bob-mcp-oauth-auth-header, ref-bob-mcp-oauth-idp, ref-bob-slash-secrets]
  - section_id: mcp-capabilities-exposure
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-understanding, ref-bob-mcp-caps, ref-bob-tools-mcp, ref-bob-approval-groups, ref-bob-changelog-alwaysallow, ref-bob-slash-approval, ref-bob-chat-mcpres]
  - section_id: mcp-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-config-schema, ref-bob-tools-disable, ref-bob-mcp-props-transport, ref-bob-trust-impact, ref-bob-slash-builtin, ref-bob-changelog-mcpcli, ref-bob-changelog-truncated, ref-bob-mcp-oauth-troubleshoot-steps, ref-bob-mcp-sse-removed]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: conflict
        source_refs: [ref-bob-mcp-global-path, ref-bob-mcp-oauth-scope, ref-bob-changelog-mcpcli]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: conflict
        source_refs: [ref-bob-mcp-props-transport, ref-bob-mcp-sse-removed, ref-bob-mcp-oauth-scope, ref-bob-slash-secrets, ref-bob-mcp-security-warning]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-bob-mcp-stdio, ref-bob-mcp-sse-removed, ref-bob-mcp-http, ref-bob-mcp-transports-removed, ref-bob-mcp-versions]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-bob-mcp-oauth-flow-steps, ref-bob-mcp-oauth-props-object, ref-bob-mcp-oauth-auth-header, ref-bob-mcp-oauth-idp]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-bob-mcp-props-transport, ref-bob-trust-impact, ref-bob-changelog-mcpcli]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: partial
        source_refs: [ref-bob-mcp-caps, ref-bob-tools-mcp, ref-bob-chat-mcpres]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-bob-approval-groups, ref-bob-changelog-alwaysallow, ref-bob-slash-approval]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-bob-slash-builtin, ref-bob-changelog-mcpcli, ref-bob-mcp-oauth-troubleshoot-steps, ref-bob-mcp-sse-removed]
---

## 配置入口与作用域 {#mcp-entry}

MCP server 定义写在两个 JSON 文件里，作用域与覆盖关系明确：同名 server 同时存在于两处时项目级配置优先。[@ref-bob-mcp-global-path] 但两个官方页面对**全局文件路径**给出了不同答案，本轮调查无法用版本或条件解释，因此该问题的状态是 `conflict`：

| 来源页 | 全局配置文件 | 项目配置文件 |
| :-- | :-- | :-- |
| MCP（Configuring MCP servers） | `~/.bob/settings/mcp.json` [@ref-bob-mcp-global-path] | `.bob/mcp.json` |
| MCP OAuth authentication | `~/.bob/mcp_settings.json` [@ref-bob-mcp-oauth-scope] | `.bob/mcp.json` |

边界判断（不是官方结论）：MCP 页的路径与 changelog 2.0.0 记录的 “Settings are now stored at ~/.bob/settings/settings.json” 属于同一套新目录布局，OAuth 页的 `~/.bob/mcp_settings.json` 则是 2.0.0 之前的旧位置；OAuth 页同一节仍在示例里使用已被移除的 `url` 键 [@ref-bob-mcp-oauth-scope]，而 MCP 页明确写 `url` 不再被识别 [@ref-bob-mcp-sse-removed]，两处迹象一致指向 OAuth 页未随 2.0.0 更新。写入配置前应以本机 `bob mcp list` 的实际读取结果核对，不要把任一路径当成唯一事实。

2.0.0 起可用 CLI 管理 server：`bob mcp add`、`bob mcp add-json`、`bob mcp remove`、`bob mcp list`，支持全局与工作区两种作用域；该条 changelog 记录当时列出 stdio、SSE、HTTP 三种传输，是 2.0.0 的历史事实，SSE 传输其后被移除（见 “传输” 一节）。[@ref-bob-changelog-mcpcli] 交互会话里另有 `/mcp` 斜杠命令用于管理已配置的 MCP server。[@ref-bob-slash-builtin]

## Server 定义字段 {#mcp-definition}

MCP 页 “Configuration properties” 现在只列两个必选键：`command`（Stdio 传输的可执行文件路径）与 `httpURL`（Streamable HTTP 端点）；`url` 已从该表中删除。[@ref-bob-mcp-props-transport] 可选字段如下：[@ref-bob-mcp-props-transport]

| 字段 | 类型 | 默认 | 用途 |
| :-- | :-- | :-- | :-- |
| `command` | string | 无 | Stdio 传输的可执行文件路径 |
| `httpURL` | string | 无 | Streamable HTTP 端点 |
| `args` | string[] | 无 | Stdio 的参数 |
| `env` | object | 无 | server 进程的环境变量 |
| `cwd` | string | 无 | Stdio 的工作目录 |
| `headers` | object | 无 | Streamable HTTP 的自定义请求头 |
| `timeout` | number | 600000（10 分钟） | 请求超时，单位毫秒 |
| `alwaysAllow` | string[] | 无 | 自动批准的工具名列表 |
| `disabled` | boolean | false | 置 true 时不启动该 server |

同一节里存在一个未解决的分歧：OAuth 页的最小示例仍用 `url` 指定远程端点 [@ref-bob-mcp-oauth-scope]，而 MCP 页写明 `url` 属性不再被识别、只能改用 `httpURL` 或 `command` [@ref-bob-mcp-sse-removed]。本字段表按 MCP 页给出，OAuth 示例在官方文档修订前不能作为可用配置。

文档的 stdio 最小示例（逐字来自 MCP 页 “Editing MCP settings files”）：[@ref-bob-mcp-props-transport]

```json
{
  "mcpServers": {
    "server1": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {
        "API_KEY": "your_api_key"
      },
      "alwaysAllow": ["tool1", "tool2"],
      "disabled": false
    }
  }
}
```

凭据不应硬编码：文档的安全警告要求不要把 API key、token 直接写进 MCP 配置文件，应改用环境变量或凭据库，并确保带密钥的配置文件不进入版本控制。[@ref-bob-mcp-security-warning] Bob Shell 另提供 `~/.bob/settings/` 下加密保存的 secret，可用 `${KEY}` 语法在 MCP server 配置中引用；`/manage-secrets set KEY VALUE`、`list`、`rm KEY` 分别用于写入、列出与删除。[@ref-bob-slash-secrets]

## 传输 {#mcp-transport}

当前只支持两种传输：Stdio（`command` 启动本地子进程）与 Streamable HTTP（`httpURL`）。独立的 HTTP+SSE 传输已被移除——MCP 页写明 “The url property is not recognised”，只使用 HTTP+SSE 的 server 无法连接 Bob。[@ref-bob-mcp-sse-removed] 传输页给出同一结论并补充了边界：Streamable HTTP 连接内部作为响应通道的 SSE 仍然支持，被移除的只是带独立 `/events` 与 `/message` 端点的旧传输。[@ref-bob-mcp-transports-removed] 迁移路径是把 server 改为单一 MCP 端点的 Streamable HTTP，或在同机运行的前提下改为 Stdio。[@ref-bob-mcp-transports-removed]

本地 stdio 的完整示例（逐字来自 MCP 页 “Stdio transport”）：[@ref-bob-mcp-stdio]

```json
{
  "mcpServers": {
    "local-server": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "/path/to/project",
      "env": {
        "API_KEY": "your_api_key"
      },
      "alwaysAllow": ["tool1", "tool2"]
    }
  }
}
```

远程示例（逐字来自 MCP 页 “Streamable HTTP transport”，`httpURL` 是唯一的远程必填键）：[@ref-bob-mcp-http]

```json
{
  "mcpServers": {
    "remote-server": {
      "httpURL": "https://your-server-url.com/mcp"
    }
  }
}
```

选择传输的后果文档也写明：stdio 是机器本地进程，随 Bob Shell 启动与停止，单客户端、低延迟、无网络暴露；远程 Streamable HTTP 可集中部署、多客户端共享，但依赖网络与显式安全措施。[@ref-bob-mcp-transports-lifecycle][@ref-bob-mcp-transports-remote-http] 对比表现在只有 STDIO 与 Streamable HTTP 两列。[@ref-bob-mcp-transports-compare-http]

协议版本：Bob Shell 支持 2025-11-25、2025-06-18、2025-03-26、2024-11-05、2024-10-07 五个 MCP 规范版本，连接时协商双方共同支持的最高版本；2026-07-28 规范版本尚不支持。[@ref-bob-mcp-versions]

## 认证 {#mcp-auth}

需要用户级授权的 server 使用 OAuth 2.1，Bob Shell 自动完成整个流程：连接时识别 server 的授权要求，在默认浏览器打开授权窗口，用户同意后安全保存令牌，并在过期前自动刷新。[@ref-bob-mcp-oauth-flow-steps] 身份提供方要求预注册客户端时，用 `oauth` 对象传入参数：[@ref-bob-mcp-oauth-props-object]

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `oauth.enabled` | boolean | 置 false 关闭 OAuth，置 true 强制 OAuth；没有 Authorization 头时默认开启 |
| `oauth.clientId` | string | 身份提供方签发的预注册客户端 ID |
| `oauth.clientSecret` | string | 机密客户端需要的客户端密钥 |
| `oauth.scope` | string | 以空格分隔的 scope 列表 |

注册时的客户端参数：应用类型为 Public / Native / Loopback（Authorization Code with PKCE），回调地址 `http://127.0.0.1:33418/callback`，端口 33418 被占用时可追加注册 33419–33427，grant types 为 authorization_code 与 refresh_token；签发的 client ID 填入 `oauth.clientId`。[@ref-bob-mcp-oauth-idp]

一个重要的互斥条件：给 server 加静态 `Authorization` 头会关闭 OAuth，Bob 不会发起 OAuth 流程；反过来 OAuth 生效时 Bob 会在发请求前移除静态 `Authorization` 头。每个 server 只能选一种认证方式。[@ref-bob-mcp-oauth-auth-header] 静态凭据仍走 `headers`（如 Bearer token）或 `env`（如 API key），适合服务账号或长期 token；OAuth 适合需要访问用户名下资源、签发短时 token 的场景。OAuth 之外的敏感值也可以用 secrets store 的 `${KEY}` 引用，避免明文写入配置文件。[@ref-bob-slash-secrets]

## 能力暴露与批准 {#mcp-capabilities-exposure}

MCP 是 client-server 结构，Bob 是 client，消息走 JSON-RPC 2.0；server 向 Bob 提供三类能力：工具发现（名称、描述、参数）、工具调用（传参并取得结构化响应）与资源读取。[@ref-bob-mcp-understanding][@ref-bob-mcp-caps] 工具以 `use_mcp_tool` 形式进入 Bob 的工具集，属于 `mcp` 工具分组。[@ref-bob-tools-mcp]

批准与可见性由三层控制：

- `mcp` 权限组是全局开关，允许对该组自动批准。[@ref-bob-approval-groups]
- server 定义里的 `alwaysAllow` 列出自动批准的工具名；2.0.1 起 Bob Shell 在任务开始时就读取 `.bob/mcp.json` 里的 `alwaysAllow`，列出的工具不再弹批准提示。[@ref-bob-changelog-alwaysallow]
- 交互式批准对话框对 MCP 工具不显示 “Approve group tools for task” 选项，只能逐个批准或在 `alwaysAllow` 中登记。[@ref-bob-slash-approval]

文档未说明 MCP prompts 能力如何暴露；资源则以 `server:resource-name` 形式在提示词里引用，例如 `@my-server:schema.json`。[@ref-bob-chat-mcpres]

## 生命周期与诊断 {#mcp-lifecycle-diagnostics}

生命周期与开关：

- `session.mcp`（默认 `true`）决定默认是否启用 MCP server；命令行 `--disable-mcp` 可对单次运行整体关闭。[@ref-bob-config-schema][@ref-bob-tools-disable]
- server 级 `disabled: true` 保留定义但不启动。[@ref-bob-mcp-props-transport]
- 请求超时由 `timeout` 控制，默认 600000 毫秒。[@ref-bob-mcp-props-transport]
- 文件夹不可信时 Bob Shell 不会尝试连接任何 MCP server，且项目 `.bob/mcp.json` 不加载。[@ref-bob-trust-impact]

诊断入口：

- `/mcp` 打开 MCP 管理界面，查看与操作已配置 server；server 连接或断开时列表会自动刷新。[@ref-bob-slash-builtin]
- `bob mcp list` 从命令行列出 server（2.0.0 起）。[@ref-bob-changelog-mcpcli]
- 工具输出超过上下文上限时，完整输出会被写入磁盘并在截断消息里给出文件路径，可用 `read_file` 按范围查看。[@ref-bob-changelog-truncated]
- “配置里有远程 server 但连不上”应先看传输：仍在使用 `url` 或独立 HTTP+SSE 的 server 已不在支持范围内。[@ref-bob-mcp-sse-removed]
- OAuth 常见故障有专门清单：授权页不出现时先确认 server 未被 disabled、配置里没有静态 `Authorization` 头，再重启 Bob Shell，并检查浏览器或防火墙是否拦截 `127.0.0.1` 回环连接；身份提供方报 redirect URI 不匹配时，核对客户端注册是否包含 `http://127.0.0.1:33418/callback`，端口被占用则追加注册 33419–33427。[@ref-bob-mcp-oauth-troubleshoot-steps]

文档没有给出 MCP 连接重试/退避策略、缓存行为，也没有专门展示 “配置已读取但 server 未连接” 的日志字段；这部分在公开文档中未建立。
