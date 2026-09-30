---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-mcp-v1
harness_id: qwen-code
topic: mcp
title: "Qwen Code CLI 的 MCP：入口、定义、传输、认证、生命周期、能力、暴露与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-what-you-can-do-with-mcp, ref-qwen-readme-acknowledgments]
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-quick-start, ref-qwen-mcp-configure-via-settings-json-vs-qwen-mcp-add, ref-qwen-mcp-where-configuration-is-stored-scopes, ref-qwen-settings-configuration-layers, ref-qwen-introduction-qwen-extension-json, ref-qwen-settings-mcp]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-qwen-settings-mcpservers, ref-qwen-mcp-server-specific-configuration-mcpservers, ref-qwen-mcp-stdio-server-local-process, ref-qwen-mcp-troubleshooting, ref-qwen-introduction-variables]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-choose-a-transport, ref-qwen-mcp-stdio-server-local-process, ref-qwen-mcp-http-server-remote-streamable-http, ref-qwen-mcp-sse-server-remote-server-sent-events, ref-qwen-mcp-automatic-stdio-negotiation, ref-qwen-mcp-rolling-back-progressive-mcp]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-http-server-remote-streamable-http, ref-qwen-mcp-basic-usage, ref-qwen-mcp-adding-a-server-qwen-mcp-add, ref-qwen-mcp-important-redirect-uri-configuration, ref-qwen-mcp-manual-configuration-via-settings-json, ref-qwen-mcp-token-management]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-progressive-availability-and-discovery-timeouts, ref-qwen-mcp-per-server-discoverytimeoutms, ref-qwen-mcp-trust-skip-confirmations, ref-qwen-mcp-connection-loss-replay, ref-qwen-introduction-the-interactive-extension-manager, ref-qwen-settings-mcp]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-using-mcp-prompts-and-resources, ref-qwen-mcp-prompts-slash-commands, ref-qwen-mcp-resources, ref-qwen-mcp-mcp-app-resource-limits]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-tool-filtering-allow-deny-tools-per-server, ref-qwen-settings-mcpservers, ref-qwen-mcp-adding-a-server-qwen-mcp-add, ref-qwen-mcp-global-allow-deny-lists, ref-qwen-settings-mcp, ref-qwen-mcp-trust-skip-confirmations, ref-qwen-approval-mode-permission-modes-comparison, ref-qwen-mcp-connection-loss-replay]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-mcp-configure-via-settings-json-vs-qwen-mcp-add, ref-qwen-mcp-quick-start, ref-qwen-mcp-troubleshooting, ref-qwen-mcp-progressive-availability-and-discovery-timeouts, ref-qwen-mcp-resources, ref-qwen-mcp-prompts-slash-commands, ref-qwen-settings-mcp, ref-qwen-settings-ui, ref-qwen-mcp-adding-a-server-qwen-mcp-add, ref-qwen-mcp-removing-a-server-qwen-mcp-remove]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-qwen-mcp-quick-start, ref-qwen-mcp-where-configuration-is-stored-scopes, ref-qwen-settings-mcp, ref-qwen-introduction-qwen-extension-json]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-qwen-settings-mcpservers, ref-qwen-mcp-server-specific-configuration-mcpservers]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-qwen-mcp-choose-a-transport, ref-qwen-mcp-stdio-server-local-process, ref-qwen-mcp-http-server-remote-streamable-http, ref-qwen-mcp-sse-server-remote-server-sent-events, ref-qwen-mcp-automatic-stdio-negotiation]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-qwen-mcp-basic-usage, ref-qwen-mcp-important-redirect-uri-configuration, ref-qwen-mcp-manual-configuration-via-settings-json, ref-qwen-mcp-token-management]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-qwen-mcp-progressive-availability-and-discovery-timeouts, ref-qwen-mcp-per-server-discoverytimeoutms, ref-qwen-mcp-trust-skip-confirmations, ref-qwen-mcp-connection-loss-replay, ref-qwen-introduction-the-interactive-extension-manager]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-qwen-mcp-using-mcp-prompts-and-resources, ref-qwen-mcp-prompts-slash-commands, ref-qwen-mcp-resources, ref-qwen-mcp-mcp-app-resource-limits]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-qwen-mcp-tool-filtering-allow-deny-tools-per-server, ref-qwen-mcp-global-allow-deny-lists, ref-qwen-mcp-trust-skip-confirmations, ref-qwen-approval-mode-permission-modes-comparison]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-qwen-mcp-troubleshooting, ref-qwen-mcp-progressive-availability-and-discovery-timeouts, ref-qwen-mcp-resources, ref-qwen-mcp-adding-a-server-qwen-mcp-add, ref-qwen-mcp-removing-a-server-qwen-mcp-remove]
---

## Scope {#mcp-scope}

本章固定源为 Qwen Code 仓库 `https://github.com/QwenLM/qwen-code.git`、commit `e767e223c5c1d6fe13217d95faf365721e6e3437`（源树检出）。MCP 行为主要依据 `docs/users/features/mcp.md`，配置字段与全局开关依据 `docs/users/configuration/settings.md`（`mcp` 与 `mcpServers` 两节），信任/批准语境依据 `docs/users/features/approval-mode.md`，扩展内置 MCP server 依据 `docs/users/extension/introduction.md`。所有示例与默认值均取自上述文件在该 commit 的内容。

MCP（Model Context Protocol）让 Qwen Code 连接外部工具与数据源，使模型可以读写文件仓库、查询数据库、包装内部 API、执行可复用工作流 [@ref-qwen-mcp-what-you-can-do-with-mcp]。

需要说明版本谱系：Qwen Code 最初基于 Google Gemini CLI v0.8.2，自 v0.1 起不再与上游同步、独立演进，因此本仓在该 commit 的文档是当前行为的权威来源 [@ref-qwen-readme-acknowledgments]。文档中明确记载与其他 agent 的兼容性（如 Claude Code 兼容字段、Claude Code 市场）时，本章按“文档化的兼容性”叙述，不主张任何来源未声明的 Gemini 继承行为。

## Where MCP servers are configured {#mcp-entry}

Qwen Code 从 `settings.json` 的 `mcpServers` 对象加载 MCP server，有两种等价入口：直接编辑 `settings.json`，或使用 `qwen mcp` 命令；两者产生相同的 `mcpServers` 条目 [@ref-qwen-mcp-quick-start][@ref-qwen-mcp-configure-via-settings-json-vs-qwen-mcp-add]。

作用域（scopes）：

- **用户作用域（默认）**：`~/.qwen/settings.json`，对机器上所有项目生效。`qwen mcp add` 默认写入此作用域，也可显式 `qwen mcp add --scope user ...` [@ref-qwen-mcp-where-configuration-is-stored-scopes]。
- **项目作用域**：项目根目录的 `.qwen/settings.json`，仅对该项目生效 [@ref-qwen-mcp-where-configuration-is-stored-scopes]。

除这两个作用域外，`settings.json` 还存在系统默认/系统设置等更上层配置与优先级规则，mcp.md 让读者转到设置文档了解 [@ref-qwen-mcp-where-configuration-is-stored-scopes]；这些层级决定同名条目的覆盖关系（`mcpServers` 按来源整体替换同名 server 对象而非逐字段合并）[@ref-qwen-settings-configuration-layers]。

扩展也可以携带 MCP server：`qwen-extension.json` 的 `mcpServers` 映射会在启动时像 `settings.json` 中的 server 一样加载；若扩展与 `settings.json` 配置了同名 server，`settings.json` 中的定义优先 [@ref-qwen-introduction-qwen-extension-json]。扩展配置支持除 `trust` 之外的所有 MCP server 选项 [@ref-qwen-introduction-qwen-extension-json]。

全局级开关位于 `settings.json` 的 `mcp` 对象：`mcp.serverCommand`、`mcp.allowed`、`mcp.excluded`、`mcp.toolIdleTimeoutMs`；其中 `mcp.allowed`/`mcp.excluded` 在设置了 `--allowed-mcp-server-names` 命令行参数时会被忽略 [@ref-qwen-settings-mcp]。

## Server definition and first-party fields {#mcp-definition}

`mcpServers` 的键是 server 名（别名）。必须至少提供 `command`、`url`、`httpUrl` 之一；若同时提供，优先级为 `httpUrl` > `url` > `command` [@ref-qwen-settings-mcpservers]。每个 server 定义支持的字段如下 [@ref-qwen-mcp-server-specific-configuration-mcpservers]：

| 字段 | 类型/默认 | 含义 |
| --- | --- | --- |
| `command` | string | Stdio 传输要执行的可执行文件 |
| `args` | array | Stdio 命令的参数 |
| `env` | object | server 进程环境变量 |
| `cwd` | string | Stdio 工作目录 |
| `url` | string | SSE 端点 URL |
| `httpUrl` | string | streamable HTTP 端点 URL |
| `headers` | object | 发送到 `url`/`httpUrl` 的自定义 HTTP 头 |
| `timeout` | number，默认 600000 | 请求超时（毫秒），即每次 `tools/call` 的工具调用超时，默认 10 分钟 |
| `trust` | boolean，默认 false | 在受信工作区中跳过该 server 的工具调用确认 |
| `includeTools` / `excludeTools` | array | 工具白/黑名单，`excludeTools` 优先 |
| `description` | string | 展示用描述 |

Stdio 示例（`.qwen/settings.json`）[@ref-qwen-mcp-stdio-server-local-process]：

```json
{
  "mcpServers": {
    "pythonTools": {
      "command": "python",
      "args": ["-m", "my_mcp_server", "--port", "8080"],
      "cwd": "./mcp-servers/python",
      "env": { "DATABASE_URL": "$DB_CONNECTION_STRING", "API_KEY": "${EXTERNAL_API_KEY}" },
      "timeout": 15000
    }
  }
}
```

变量展开：`env` 的值可用 `$VAR_NAME` 或 `${VAR_NAME}` 引用运行环境中的变量 [@ref-qwen-mcp-server-specific-configuration-mcpservers]。官方文档未声明这些占位符可引用同文件其他字段；若变量不解析，先确认它存在于 Qwen Code 运行的环境（shell 与 GUI 应用环境可能不同）[@ref-qwen-mcp-troubleshooting]。

工具命名与冲突：多个 server 暴露同名工具时，工具名会加上 server 别名前缀（形如 `serverAlias__actualToolName`）以避免冲突；系统为兼容性可能剥离 MCP 工具定义中的某些 schema 属性 [@ref-qwen-settings-mcpservers]。

扩展还提供 `qwen-extension.json` 级的变量替换（例如用 `cwd` 指向扩展路径），属于扩展机制而非 `mcpServers` 字段 [@ref-qwen-introduction-variables]。

## Transports {#mcp-transport}

三种传输及适用条件 [@ref-qwen-mcp-choose-a-transport]：

| 传输 | 适用 | JSON 字段 |
| --- | --- | --- |
| `http` | 推荐用于远程服务（云 MCP） | `httpUrl`（+ 可选 `headers`） |
| `sse` | 仅支持 Server-Sent Events 的旧/弃用 server | `url`（+ 可选 `headers`） |
| `stdio` | 本机本地进程（脚本、CLI、Docker） | `command`、`args`（+ 可选 `cwd`、`env`） |

若 server 两者都支持，文档建议优先 HTTP 而非 SSE [@ref-qwen-mcp-choose-a-transport]。

Stdio（本地进程）[@ref-qwen-mcp-stdio-server-local-process]：

```json
{ "mcpServers": { "pythonTools": {
  "command": "python", "args": ["-m", "my_mcp_server", "--port", "8080"],
  "cwd": "./mcp-servers/python", "env": { "API_KEY": "${EXTERNAL_API_KEY}" }, "timeout": 15000 } } }
```

HTTP（远程 streamable HTTP）[@ref-qwen-mcp-http-server-remote-streamable-http]：

```json
{ "mcpServers": { "httpServerWithAuth": {
  "httpUrl": "http://localhost:3000/mcp",
  "headers": { "Authorization": "Bearer your-api-token" }, "timeout": 5000 } } }
```

SSE（远程 Server-Sent Events）[@ref-qwen-mcp-sse-server-remote-server-sent-events]：

```json
{ "mcpServers": { "sseServer": { "url": "http://localhost:8080/sse", "timeout": 30000 } } }
```

自动 stdio 协商：Stdio server 默认使用单进程 legacy initialize 流程；要连接仅支持新协议的 stdio server，设置 `versionNegotiation: "auto"`（默认 `"legacy"`）。`auto` 会在启动会话进程前运行一个短命副本，最多占用发现预算 5 秒 [@ref-qwen-mcp-automatic-stdio-negotiation]。对具有非幂等启动副作用、单所有者锁或 PID 文件、或 initialize 较慢的 server，应保持 legacy 默认 [@ref-qwen-mcp-automatic-stdio-negotiation]。

回退渐进式 MCP：环境变量 `QWEN_CODE_LEGACY_MCP_BLOCKING=1` 恢复旧的同步行为（CLI 等待所有 MCP server 完成握手后才显示 UI），作为至少保留一个 release 的逃生开关 [@ref-qwen-mcp-rolling-back-progressive-mcp]。

## Authentication {#mcp-auth}

HTTP Header：`httpUrl`/`url` 传输可配 `headers`（如 `Authorization: Bearer ...`）[@ref-qwen-mcp-http-server-remote-streamable-http]。凭据不能写进仓库时，用变量展开或 OAuth。

OAuth 2.0 由 Qwen Code 自动处理授权流程。CLI 方式 [@ref-qwen-mcp-basic-usage]：

```bash
qwen mcp add --transport sse oauth-server https://api.example.com/sse/ \
  --oauth-client-id your-client-id \
  --oauth-redirect-uri https://your-server.com/oauth/callback \
  --oauth-authorization-url https://provider.example.com/authorize \
  --oauth-token-url https://provider.example.com/token
```

`--oauth-*` 标志仅适用于 `--transport sse` 与 `--transport http`，与 `--transport stdio` 组合会被拒绝 [@ref-qwen-mcp-adding-a-server-qwen-mcp-add]。

Redirect URI：本地默认使用 `http://localhost:7777/oauth/callback`；远程/云部署下默认 localhost 不可用，需用 `--oauth-redirect-uri` 配置以 `/oauth/callback` 结尾的公网 URL，并把该路径反向代理到运行 Qwen Code 机器上的 `http://127.0.0.1:7777/oauth/callback`（Qwen Code 不终止 TLS，代理负责）[@ref-qwen-mcp-important-redirect-uri-configuration]。

手动 `settings.json` 配置 [@ref-qwen-mcp-manual-configuration-via-settings-json]：

```json
{ "mcpServers": { "oauthServer": {
  "url": "https://api.example.com/sse/",
  "oauth": {
    "enabled": true, "clientId": "your-client-id", "clientSecret": "your-client-secret",
    "authorizationUrl": "https://provider.example.com/authorize",
    "tokenUrl": "https://provider.example.com/token",
    "redirectUri": "https://your-server.com/oauth/callback",
    "scopes": ["read", "write"] } } } }
```

OAuth 属性：`enabled`；`clientId`（动态注册时可省略）；`clientSecret`（公共客户端可省略）；`authorizationUrl`/`tokenUrl`（省略则自动发现）；`scopes`；`redirectUri`（默认 `http://localhost:7777/oauth/callback`）；`tokenParamName`；`audiences` [@ref-qwen-mcp-manual-configuration-via-settings-json]。

Token 管理：默认明文存于 `~/.qwen/mcp-oauth-tokens.json`（mode 0600）；设置 `QWEN_CODE_FORCE_ENCRYPTED_FILE_STORAGE=true` 时改用可用的 keychain 存储，或使用 AES-256-GCM 加密的 `~/.qwen/mcp-oauth-tokens-v2.json`。Token 在过期时自动刷新（若有 refresh token），并在每次连接前校验 [@ref-qwen-mcp-token-management]。可用 `/mcp` 对话框交互查看 server 与管理认证 [@ref-qwen-mcp-token-management]。

## Lifecycle {#mcp-lifecycle}

连接时机：Qwen Code 在 UI 已可交互后于后台发现 MCP server，因此即使某个 server 需要数秒（或永不响应），首个提示也能在几百毫秒内出现；每个 server 完成握手后约 16 ms 内模型工具列表更新 [@ref-qwen-mcp-progressive-availability-and-discovery-timeouts]。

- **交互模式**：UI 立即出现，右下角状态胶囊显示 `N/M MCP servers ready`；在 MCP 就绪前发送提示，模型只看当下已就绪的工具 [@ref-qwen-mcp-progressive-availability-and-discovery-timeouts]。
- **非交互模式**（`--prompt`、stream-json、ACP）：CLI 仍会等待 MCP 发现完成再发送首个提示，脚本/管道调用看到与旧同步行为相同的完整工具集 [@ref-qwen-mcp-progressive-availability-and-discovery-timeouts]。

发现超时：每个 server 有仅用于发现的超时 `discoveryTimeoutMs`，限定初始握手（`connect` + `tools/list` + `prompts/list` + `resources/list`）时长；默认 stdio 30 秒、远程 HTTP/SSE 5 秒，可按 server 覆盖 [@ref-qwen-mcp-per-server-discoverytimeoutms]。该字段不影响 `timeout`（工具调用超时，默认 10 分钟）[@ref-qwen-mcp-per-server-discoverytimeoutms]。

信任与确认：`trust: true` 仅在受信工作区中跳过该 server 的确认提示，文档建议谨慎使用 [@ref-qwen-mcp-trust-skip-confirmations]。

连接丢失重放：仅当 server `trust: true`、工作区受信、且工具显式声明 `idempotentHint: true` 或一致的只读注解时，Qwen Code 才重连并重放当前调用；只读注解与 `destructiveHint: true` 或 `idempotentHint: false` 冲突则不重放 [@ref-qwen-mcp-connection-loss-replay]。缺少注解、注解冲突、server 不受信或工作区不受信时，连接失败后不重放，并提示结果可能未知（server 可能已完成操作）[@ref-qwen-mcp-connection-loss-replay]。

启用/禁用：交互式扩展管理器会在父扩展下嵌套显示扩展自带的 MCP server 及其实时连接状态，并允许逐个启用或禁用 [@ref-qwen-introduction-the-interactive-extension-manager]。文档未记载 `settings.json` 配置的 server 有对应的逐 server 启用/禁用字段，也未记载显式的重试策略或连接结果缓存——这是本章确认到的缺口；可用 `mcp.allowed`/`mcp.excluded` 在全局层面选择不连接某些 server [@ref-qwen-settings-mcp]。

## Capabilities {#mcp-capabilities}

MCP 的三种原语在 Qwen Code 中被分别发现与呈现，不能相互替代 [@ref-qwen-mcp-using-mcp-prompts-and-resources]。

**Prompts → slash 命令**：server 通过 `prompts/list` 广告的任何 prompt 都会变成可执行 slash 命令，`/` 列表中标注 `MCP: SERVER`；`/my_prompt --arg1="value"` 或位置形式 `/my_prompt "value"` 均可，`/my_prompt help` 显示参数 [@ref-qwen-mcp-prompts-slash-commands]。prompt 的消息会发送给模型由其执行。发现对 `prompts` 能力声明较宽容：即使 server 在 `initialize` 能力中省略 `prompts`，Qwen Code 仍会尝试 `prompts/list`；真正无 prompt 的 server 回 `Method not found` 并被忽略 [@ref-qwen-mcp-prompts-slash-commands]。

**Resources**：server 通过 `resources/list` 广告的资源按 server 发现。`/mcp` 对话框选中 server 可见其 Resources 计数，选择 View resources 浏览 URI，选中后显示描述、MIME 类型以及可粘贴的 `@server:uri` 引用 [@ref-qwen-mcp-resources]。在消息中用 `@server:uri` 注入资源内容：`@` 后接 server 名、冒号、资源 URI；提交时资源被读取并把内容追加到消息（文本内联、二进制作为附件），`@server:uri` 引用保留在提示中 [@ref-qwen-mcp-resources]。`server` 前缀必须匹配已配置的 MCP server，否则按普通文件路径处理，故既有 `@path/to/file` 不受影响；不可信文件夹中资源读取被禁用 [@ref-qwen-mcp-resources]。

**Tools**：由 server 通过 `tools/list` 暴露，受发现超时与过滤控制，详见曝光与诊断两节。

**MCP App 资源限制**：MCP App 可返回超过默认 1 MiB 或加载超过默认 10 秒的打包 HTML，可只对需要的 server 配置 `appResourceMaxBytes` 与 `appResourceTimeoutMs` [@ref-qwen-mcp-mcp-app-resource-limits]。`appResourceMaxBytes` 为解码后 HTML 的 UTF-8 字节上限，默认 1048576，被钳制在 1–4194304 字节；`appResourceTimeoutMs` 为资源读取截止时间，钳制在 100–120000 ms，未覆盖时为通用 `timeout` 与 10000 ms 的较小者 [@ref-qwen-mcp-mcp-app-resource-limits]。尺寸检查发生在 SDK 读完响应之后，不限制网络传输或峰值内存；App HTML 仅在 daemon 支持的 WebShell 会话与录制回放中挂载，终端与无头会话渲染回退文本 [@ref-qwen-mcp-mcp-app-resource-limits]。

## Exposure: filtering, trust, and approval {#mcp-exposure}

每 server 工具过滤：`includeTools`（指定后仅列出的工具可用，白名单语义；未指定则全部启用）与 `excludeTools`（列出的工具即使 server 暴露也不对模型可用）；`excludeTools` 优先于 `includeTools`，同时出现在两表则被排除 [@ref-qwen-mcp-tool-filtering-allow-deny-tools-per-server][@ref-qwen-settings-mcpservers]。CLI 对应 `--include-tools`/`--exclude-tools`（逗号分隔） [@ref-qwen-mcp-adding-a-server-qwen-mcp-add]。

全局允许/拒绝：`settings.json` 的 `mcp` 对象中，`mcp.allowed` 是 server 名的白名单，`mcp.excluded` 是黑名单；两者支持 glob（`*` 任意序列、`?` 单字符），无 glob 字符则精确匹配；同时匹配两表时 `mcp.excluded` 优先 [@ref-qwen-mcp-global-allow-deny-lists]。这两项在设置了 `--allowed-mcp-server-names` 时被忽略 [@ref-qwen-settings-mcp]。注意它们按 server 名过滤，不按工具名 [@ref-qwen-mcp-global-allow-deny-lists]。

命名与冲突：同名工具以 `serverAlias__actualToolName` 前缀消歧，说明工具名本身携带 server 来源 [@ref-qwen-settings-mcpservers]。

信任与批准：`trust: true` 仅在受信工作区中跳过该 server 的确认 [@ref-qwen-mcp-trust-skip-confirmations]。批准模式（Plan、Ask Permissions、Auto Edits、Auto、YOLO）决定工具调用是否需要人工确认，其比较见批准文档 [@ref-qwen-approval-mode-permission-modes-comparison]。注解（`idempotentHint`、`destructiveHint`、只读注解）是 server 提供的行为提示，不是权限或授权边界；应仅对受控且已核对注解的 server 设 `trust: true` [@ref-qwen-mcp-connection-loss-replay]。

## Diagnostics {#mcp-diagnostics}

分层判断“配置被读取 / 已连接 / 工具可见 / 调用成功”：

- **配置被读取**：条目位于 `mcpServers`（用户 `~/.qwen/settings.json` 或项目 `.qwen/settings.json`）；`qwen mcp add` 与手改 `settings.json` 产生相同条目 [@ref-qwen-mcp-configure-via-settings-json-vs-qwen-mcp-add]。若 Qwen Code 在添加前已运行，需在同一项目重启后模型才使用该 server 的工具 [@ref-qwen-mcp-quick-start]。
- **已连接**：`qwen mcp list` 可查看连接状态；显示 “Disconnected” 时核对 URL/命令并增大 `timeout` [@ref-qwen-mcp-troubleshooting]。交互模式右下角胶囊显示 `N/M MCP servers ready` [@ref-qwen-mcp-progressive-availability-and-discovery-timeouts]；`/mcp` 对话框查看与管理 server [@ref-qwen-mcp-quick-start]。
- **工具/资源/提示可见**：`/mcp` 选 server 可看其 tools、prompts 与 Resources 计数，View resources 浏览 `@server:uri` 引用 [@ref-qwen-mcp-resources]；slash 命令列表中出现标注 `MCP: SERVER` 的 prompt [@ref-qwen-mcp-prompts-slash-commands]。
- **调用成功**：工具调用超时由 `timeout`（默认 10 分钟）与 `mcp.toolIdleTimeoutMs`（默认 300000 ms，范围 10000–3600000，可被 `QWEN_CODE_MCP_TOOL_IDLE_TIMEOUT_MS` 覆盖）控制 [@ref-qwen-settings-mcp]；可开 `ui.showToolCallArgs` 渲染完整调用参数以调试 MCP 集成 [@ref-qwen-settings-ui]。

管理命令：`qwen mcp add [options] NAME COMMAND_OR_URL [args...]`（支持 `--scope`、`--transport`、`--env`、`--header`、`--timeout`、`--trust`、`--description`、`--include-tools`、`--exclude-tools`、`--oauth-*`）[@ref-qwen-mcp-adding-a-server-qwen-mcp-add]；`qwen mcp remove NAME` [@ref-qwen-mcp-removing-a-server-qwen-mcp-remove]；`qwen mcp list` 已在排障中提及 [@ref-qwen-mcp-troubleshooting]。

明确缺口：固定文档只记载了 `add`、`remove`、`list` 三个子命令，未记载 `qwen mcp get`（或 `status`）等用于单独查看某 server 定义/状态的子命令；因此“调用成功”的判定主要依赖运行时工具反馈与超时/参数渲染选项，而没有逐 server 的调用级诊断子命令可引。排障条目另外给出：stdio 启动失败时使用绝对 `command` 路径并核对 `cwd`/`env`；JSON 中环境变量不解析时确认其在运行环境中存在 [@ref-qwen-mcp-troubleshooting]。
