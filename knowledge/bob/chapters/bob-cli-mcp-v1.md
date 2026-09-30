---
schema_version: 3
record_kind: production
edition_id: bob-cli-mcp-v1
harness_id: bob
topic: mcp
title: "Bob Shell 的 MCP：入口、传输、认证、能力与生命周期"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-levels, ref-bob-changelog-mcpcli, ref-bob-slash-builtin]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-props, ref-bob-mcp-security-warning, ref-bob-slash-secrets]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-stdio, ref-bob-mcp-sse, ref-bob-mcp-http, ref-bob-mcp-transports-lifecycle, ref-bob-mcp-transports-remote, ref-bob-mcp-transports-compare]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-oauth-flow, ref-bob-mcp-oauth-props, ref-bob-mcp-oauth-conflict, ref-bob-slash-secrets]
  - section_id: mcp-capabilities-exposure
    surface_ids: [cli]
    source_refs: [ref-bob-mcp-understanding, ref-bob-mcp-caps, ref-bob-tools-mcp, ref-bob-approval-groups, ref-bob-changelog-alwaysallow, ref-bob-slash-approval, ref-bob-chat-mcpres]
  - section_id: mcp-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-config-schema, ref-bob-tools-disable, ref-bob-mcp-props, ref-bob-trust-impact, ref-bob-slash-builtin, ref-bob-changelog-mcpcli, ref-bob-changelog-truncated, ref-bob-mcp-oauth-trouble]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-bob-mcp-levels, ref-bob-changelog-mcpcli]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-bob-mcp-props, ref-bob-slash-secrets, ref-bob-mcp-security-warning]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-bob-mcp-stdio, ref-bob-mcp-sse, ref-bob-mcp-http, ref-bob-mcp-transports-compare]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-bob-mcp-oauth-flow, ref-bob-mcp-oauth-props, ref-bob-mcp-oauth-conflict]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-bob-mcp-props, ref-bob-trust-impact, ref-bob-changelog-mcpcli]
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
        source_refs: [ref-bob-slash-builtin, ref-bob-changelog-mcpcli, ref-bob-mcp-oauth-trouble]
---

## 配置入口与作用域 {#mcp-entry}

Bob Shell 的 MCP server 定义放在两个 JSON 文件里，文档明确写出了作用域与覆盖关系：全局配置 `$HOME/.bob/mcp_settings.json` 对所有工作区生效，项目级配置 `.bob/mcp.json` 只对当前项目生效；同名 server 同时存在于两处时项目级配置优先。[@ref-bob-mcp-levels]

2.0.0 起还可以直接用 CLI 管理 server：`bob mcp add`、`bob mcp add-json`、`bob mcp remove`、`bob mcp list`，支持全局与工作区两种作用域，以及 stdio、SSE、HTTP 三种传输。[@ref-bob-changelog-mcpcli] 交互会话里另有 `/mcp` 斜杠命令用于管理已配置的 MCP server。[@ref-bob-slash-builtin]

两级文件的确切路径（逐字来自这两页的配置说明）：[@ref-bob-mcp-levels]

```text
$HOME/.bob/mcp_settings.json            # 全局
.bob/mcp.json                           # 项目级
```

## Server 定义字段 {#mcp-definition}

每个 server 必须有 `command`、`url`、`httpURL` 三者之一（分别对应 stdio、SSE、Streamable HTTP），可选字段如文档所列。[@ref-bob-mcp-props]

| 字段 | 类型 | 默认 | 用途 |
| :-- | :-- | :-- | :-- |
| `command` | string | 无 | stdio 传输的可执行文件路径 |
| `args` | string[] | 无 | stdio 的参数 |
| `env` | object | 无 | server 进程的环境变量 |
| `cwd` | string | 无 | stdio 的工作目录 |
| `url` | string | 无 | 远程 server 的 SSE 端点 |
| `httpURL` | string | 无 | Streamable HTTP 端点 |
| `headers` | object | 无 | SSE 传输的自定义 HTTP 头 |
| `timeout` | number | 600000（10 分钟） | 请求超时，单位毫秒 |
| `alwaysAllow` | string[] | 无 | 自动批准的工具名列表 |
| `disabled` | boolean | false | 置 true 时不启动该 server |

文档的 stdio 最小示例（逐字来自 MCP 页 “Editing MCP settings files”）：[@ref-bob-mcp-props]

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

文档列出三种传输并列明各自的配置键：stdio 用 `command` 启动本地子进程，SSE 用 `url` 连接远端，Streamable HTTP 用 `httpURL`。[@ref-bob-mcp-stdio][@ref-bob-mcp-sse][@ref-bob-mcp-http] 本地 stdio 的完整示例（逐字来自 MCP 页 “Stdio transport”）：[@ref-bob-mcp-stdio]

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

远程示例（逐字来自 MCP 页 “Streamable HTTP transport”，`httpURL` 是唯一的必填键）：[@ref-bob-mcp-http]

```json
{
  "mcpServers": {
    "remote-server": {
      "httpURL": "https://your-server-url.com/mcp"
    }
  }
}
```

选择传输的后果文档也写明：stdio 是机器本地进程，随 Bob Shell 启动与停止，单客户端、低延迟、无网络暴露；远程传输（Streamable HTTP 或 SSE）可集中部署、多客户端共享，但依赖网络与显式安全措施。[@ref-bob-mcp-transports-lifecycle][@ref-bob-mcp-transports-remote] 文档的对比表进一步区分了两者在位置、客户端数、部署与更新方式上的差异。[@ref-bob-mcp-transports-compare] SSE 被文档标记为 legacy，新远程 server 推荐 Streamable HTTP。[@ref-bob-mcp-sse]

## 认证 {#mcp-auth}

需要用户级授权的 server 使用 OAuth 2.1，Bob Shell 自动完成整个流程：连接时识别 server 的授权元数据，在浏览器打开授权页，用户同意后保存 access/refresh token，并在过期前自动刷新。[@ref-bob-mcp-oauth-flow] 大多数情况下配置里只需要 `url`，无需 headers 或 env 凭据；可选 OAuth 字段为 `oauth`（false 关闭 / true 显式开启）、`clientId`、`clientSecret`、`scope`。[@ref-bob-mcp-oauth-props]

一个重要的互斥条件：给 OAuth server 加静态 `Authorization` 头会完全关闭自动 OAuth，Bob 不会尝试 OAuth 流程；反过来 OAuth 生效时 Bob 会在发请求前移除静态 `Authorization` 头。两种方式只能选一种。[@ref-bob-mcp-oauth-conflict]

静态凭据仍走 `headers`（如 Bearer token）或 `env`（如 API key），适合服务账号或长期 token；OAuth 适合需要访问用户名下资源、签发短时 token 的场景。[@ref-bob-mcp-oauth-flow] OAuth 之外的敏感值也可以用 secrets store 的 `${KEY}` 引用，避免明文写入配置文件。[@ref-bob-slash-secrets]

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
- server 级 `disabled: true` 保留定义但不启动。[@ref-bob-mcp-props]
- 请求超时由 `timeout` 控制，默认 600000 毫秒。[@ref-bob-mcp-props]
- 文件夹不可信时 Bob Shell 不会尝试连接任何 MCP server，且项目 `.bob/mcp.json` 不加载。[@ref-bob-trust-impact]

诊断入口：
- `/mcp` 打开 MCP 管理界面，查看与操作已配置 server；server 连接或断开时列表会自动刷新。[@ref-bob-slash-builtin]
- `bob mcp list` 从命令行列出 server（2.0.0 起）。[@ref-bob-changelog-mcpcli]
- 工具输出超过上下文上限时，完整输出会被写入磁盘并在截断消息里给出文件路径，可用 `read_file` 按范围查看。[@ref-bob-changelog-truncated]
- OAuth 常见故障有专门清单：授权页不出现时先确认 server 未被 disabled 并重启 Bob Shell，再检查浏览器是否拦截授权页；认证成功但连接失败时核对 URL 与授权范围；token 频繁过期时确认授权服务器是否支持 refresh token 并检查系统时钟。[@ref-bob-mcp-oauth-trouble]

文档没有给出 MCP 连接重试/退避策略、缓存行为，也没有专门展示 “配置已读取但 server 未连接” 的日志字段；这部分在公开文档中未建立。
