---
schema_version: 3
record_kind: production
edition_id: continue-cli-mcp-v2
harness_id: continue
topic: mcp
title: "Continue CLI 的 MCP：配置入口、传输、连接生命周期与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-continue-src-configloader-precedence, ref-continue-src-configloader-local, ref-continue-doc-cli-config-precedence, ref-continue-doc-ref-mcp, ref-continue-doc-mcp-works, ref-continue-src-configservice-mcp, ref-continue-src-common-options, ref-continue-src-agentfile-tools, ref-continue-src-agentfile-init, ref-continue-doc-mcp-quickstart, ref-continue-src-configservice-blocks]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-continue-src-mcp-schema, ref-continue-doc-ref-mcp, ref-continue-doc-mcp-properties, ref-continue-src-mcp-stdio, ref-continue-src-mcp-transports, ref-continue-doc-mcp-transports, ref-continue-src-mcp-client, ref-continue-src-mcp-connect, ref-continue-doc-mcp-secrets]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-continue-src-mcp-transports, ref-continue-src-mcp-schema, ref-continue-doc-ref-mcp, ref-continue-src-mcp-connect, ref-continue-src-mcp-client, ref-continue-src-auth-stub]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-continue-src-mcp-init, ref-continue-src-mcpselector, ref-continue-src-mcp-connect, ref-continue-src-mcp-caps, ref-continue-src-mcp-restart, ref-continue-src-mcpselector-actions, ref-continue-src-tools-assemble, ref-continue-src-mcp-client, ref-continue-src-mcp-schema, ref-continue-src-backoff]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-continue-src-mcp-caps, ref-continue-src-tools-mcpconvert, ref-continue-src-tools-assemble, ref-continue-src-mcp-capabilities-find, ref-continue-src-perms-default, ref-continue-doc-cli-perms-defaults, ref-continue-src-agent-toolgate, ref-continue-src-agentfile-tools]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-mcpselector, ref-continue-src-mcp-status, ref-continue-src-mcp-connect, ref-continue-src-mcp-stdio, ref-continue-src-mcp-init, ref-continue-src-logger, ref-continue-src-common-options, ref-continue-src-mcp-capabilities-find]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: partial
        source_refs: [ref-continue-src-configloader-precedence, ref-continue-src-configloader-local, ref-continue-doc-cli-config-precedence, ref-continue-doc-ref-mcp, ref-continue-doc-mcp-works, ref-continue-src-configservice-mcp, ref-continue-src-common-options, ref-continue-src-agentfile-tools, ref-continue-src-agentfile-init, ref-continue-doc-mcp-quickstart, ref-continue-src-configservice-blocks]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-continue-src-mcp-schema, ref-continue-doc-ref-mcp, ref-continue-doc-mcp-properties, ref-continue-src-mcp-stdio, ref-continue-src-mcp-transports, ref-continue-doc-mcp-transports, ref-continue-src-mcp-client, ref-continue-src-mcp-connect, ref-continue-doc-mcp-secrets]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-continue-src-mcp-schema, ref-continue-doc-ref-mcp, ref-continue-doc-mcp-properties, ref-continue-src-mcp-stdio, ref-continue-src-mcp-transports, ref-continue-doc-mcp-transports, ref-continue-src-mcp-client, ref-continue-src-mcp-connect, ref-continue-doc-mcp-secrets]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs: [ref-continue-src-mcp-transports, ref-continue-src-mcp-schema, ref-continue-doc-ref-mcp, ref-continue-src-mcp-connect, ref-continue-src-mcp-client, ref-continue-src-auth-stub]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-continue-src-mcp-init, ref-continue-src-mcpselector, ref-continue-src-mcp-connect, ref-continue-src-mcp-caps, ref-continue-src-mcp-restart, ref-continue-src-mcpselector-actions, ref-continue-src-tools-assemble, ref-continue-src-mcp-client, ref-continue-src-mcp-schema, ref-continue-src-backoff]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-continue-src-mcp-caps, ref-continue-src-tools-mcpconvert, ref-continue-src-tools-assemble, ref-continue-src-mcp-capabilities-find, ref-continue-src-perms-default, ref-continue-doc-cli-perms-defaults, ref-continue-src-agent-toolgate, ref-continue-src-agentfile-tools]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-continue-src-mcp-caps, ref-continue-src-tools-mcpconvert, ref-continue-src-tools-assemble, ref-continue-src-mcp-capabilities-find, ref-continue-src-perms-default, ref-continue-doc-cli-perms-defaults, ref-continue-src-agent-toolgate, ref-continue-src-agentfile-tools]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-continue-src-mcpselector, ref-continue-src-mcp-status, ref-continue-src-mcp-connect, ref-continue-src-mcp-stdio, ref-continue-src-mcp-init, ref-continue-src-logger, ref-continue-src-common-options, ref-continue-src-mcp-capabilities-find]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## MCP 的配置入口与作用域 {#mcp-entry}

CLI 的 MCP server 只来自**被选中的那份配置**。配置来源按固定优先级解析：`--config {path}` 指定的文件 → 已保存的配置 URI（`file://` 或 `slug://`）→ 默认解析（存在 `~/.continue/config.yaml` 就用它，否则回退到平台上的 `continuedev/default-cli-config`）。因此 `mcpServers` 必须写在最终被加载的那个 YAML 里，最常见就是 `~/.continue/config.yaml`。[@ref-continue-src-configloader-precedence][@ref-continue-src-configloader-local][@ref-continue-doc-cli-config-precedence]

`mcpServers` 是 config.yaml 的顶层键，条目是数组，官方给出的最小形式是 `name` 加 `command`（本地）或 `name` 加 `url`（远程）。[@ref-continue-doc-ref-mcp][@ref-continue-doc-mcp-works]

除配置文件外还有三条把 MCP server 注入本次会话的路径，它们都发生在配置载入之后、由 `ConfigService` 合并进「隐藏的附加配置」：

1. `--mcp {slug-or-url}`（可重复）。值看起来是 URL 时，CLI 直接构造一个 `{name: URL 的 hostname, url: 原 URL}` 的条目；否则当作 hub 包标识符交给 registry 解析。[@ref-continue-src-configservice-mcp][@ref-continue-src-common-options]
2. agent 文件 frontmatter 的 `tools:` 里出现的 `owner/package` 或 `owner/package:tool_name` 会被解析成 MCP server 引用并同样注入。[@ref-continue-src-agentfile-tools][@ref-continue-src-agentfile-init]
3. 平台上的 assistant（`--config owner/package` 或保存的 `slug://`）本身可以带 `mcpServers`，其内容随 assistant 一起载入。[@ref-continue-src-configloader-precedence]

**作用域**：CLI 只有「本次会话实际加载的那份配置」这一个作用域，没有 workspace 级 MCP 覆盖层。文档 `How to Configure MCP Servers` 里描述的 `.continue/mcpServers/` 目录协议属于共享配置系统（IDE 侧由 `core/config` 扫描该目录与其中的 JSON 文件）；本轮固定的 CLI 源码里没有任何对 `.continue/mcpServers` 的扫描代码，`ConfigService`/`configLoader` 只处理配置文件本身与 `--mcp` 注入。[@ref-continue-doc-mcp-quickstart][@ref-continue-src-configservice-blocks][@ref-continue-src-configloader-precedence] 这是文档与 CLI 实现之间的**明确缺口**：把 server 定义放进工作区 `.continue/mcpServers/*.yaml` 在 CLI 里不会生效，必须写进被加载的 `config.yaml` 或用 `--mcp` 注入。

## Server 定义字段与三种传输 {#mcp-definition}

定义 schema 是一个联合类型，按有无 `command` 分成 stdio 与远程两支，公共字段相同：[@ref-continue-src-mcp-schema]

| 字段 | 适用 | 必填 | 说明 |
| :-- | :-- | :-- | :-- |
| `name` | 全部 | 是 | 会话内的 server 名；连接表以它为键，重名会互相覆盖 |
| `type` | 全部 | 否 | `stdio` / `sse` / `streamable-http`；stdio 支的 `type` 只能是 `stdio` |
| `command` | stdio | 是 | 要执行的命令（如 `npx`、`uvx`） |
| `args` | stdio | 否 | 字符串数组 |
| `env` | stdio | 否 | 环境变量表；实测合并规则见下 |
| `cwd` | stdio | 否 | 子进程工作目录 |
| `url` | 远程 | 是 | sse / streamable-http 的地址 |
| `apiKey` | 远程 | 否 | 连接时变成 `Authorization: Bearer ...` 头 |
| `requestOptions` | 远程 | 否 | 与模型同构的请求选项（headers、verifySsl 等） |
| `connectionTimeout` | 全部 | 否 | schema 里存在，但 CLI 连接路径没有使用它（见生命周期小节） |
| `serverName`、`faviconUrl`、`sourceFile`、`sourceSlug` | 全部 | 否 | 由加载过程补充的元数据，用于来源追踪与界面展示 |

[@ref-continue-src-mcp-schema][@ref-continue-doc-ref-mcp][@ref-continue-doc-mcp-properties]

**stdio**：`stdout` 用来承载 MCP 协议帧，`stderr` 被 CLI 接管成告警源——每读到一段非空 stderr 就 push 进该连接的 `warnings`，连接失败时这些告警会被拼进错误信息。子进程环境变量是「进程环境 + 配置里的 `env`」的合并，配置里的同名键优先。[@ref-continue-src-mcp-stdio]

**sse 与 streamable-http**：两者都基于 `@modelcontextprotocol/sdk` 的客户端传输，CLI 先构造一个 `headers` 对象（先 `requestOptions.headers`，再叠加 `apiKey` 派生的 `Authorization`），把它同时交给 SSE 的 `eventSourceInit.fetch` 与 `requestInit`，或交给 Streamable HTTP 的 `requestInit`；`requestOptions.verifySsl === false` 时改用 `rejectUnauthorized: false` 的 HTTPS agent。[@ref-continue-src-mcp-transports] 文档给出的三种写法与之一致：`type: stdio` 配 `command`/`args`，`type: sse` 或 `type: streamable-http` 配 `url`。[@ref-continue-doc-mcp-transports]

**type 缺省时的探测**：server 没有 `command` 且没有显式 `type` 时，CLI 先按 streamable-http 连接，失败且错误**不是**鉴权错误时再按 sse 重试一次；是鉴权错误则直接走鉴权回退（见下一节）。[@ref-continue-src-mcp-client]

**最小示例（stdio，来自 `docs/reference.mdx` 的 `mcpServers` 小节，字段拼装按同一来源的字段表）：**

```yaml
mcpServers:
  - name: My MCP Server
    command: uvx
    args:
      - mcp-server-sqlite
      - --db-path
      - ./test.db
    env:
      NODE_ENV: production
```

**最小示例（sse，来自 `docs/customize/deep-dives/mcp.mdx` 的传输小节）：**

```yaml
mcpServers:
  - name: Name
    type: sse
    url: https://example.invalid/mcp
```

**密钥展开**：`args`、`env`、`url` 等字符串里可以写 `${{ secrets.NAME }}`；CLI 连接前用 `getTemplateVariables` 找出所有 `secrets.*` 变量并 `decodeFQSN` 还原成密钥名。[@ref-continue-src-mcp-connect][@ref-continue-doc-mcp-secrets]

## 凭据、HTTP 头与登录回退 {#mcp-auth}

远程 server 的凭据有两种写法，最终都落到同一组请求头上：

1. `apiKey`：连接时被放进 `Authorization: Bearer {apiKey}`，与 `requestOptions.headers` 合并（显式 headers 先写，`apiKey` 覆盖同名键）。[@ref-continue-src-mcp-transports]
2. `requestOptions.headers`：手工写任意头，例如 bearer token 之外的自定义鉴权头；字段与模型级 `requestOptions` 同构。[@ref-continue-src-mcp-schema][@ref-continue-doc-ref-mcp]

本地 server 的凭据走 `env`：密钥写在 `env` 或 `args` 里，通过 `${{ secrets.NAME }}` 展开，展开值是**密钥名**而不是明文。存在未解析的 secret 时，非 headless 会话把一条告警挂到该连接上并继续尝试连接，headless 会话直接抛错终止——错误信息会提示去 hub 设置密钥或把密钥传进 CLI 环境。[@ref-continue-src-mcp-connect]

**未登录/401 回退**：远程连接抛出的错误被判定为鉴权错误且当前**不是** headless 时，CLI 会用一个 stdio server 顶替原远程 server——执行 `npx -y mcp-remote {url}`，让 `mcp-remote` 走它自己的 OAuth 流程（URL 属于 `mcp.supabase.com` 时额外注入一组固定的 `--static-oauth-client-metadata` scope）。这条路径会启动一个外部进程，且只在交互式会话里启用；headless 下 401 直接失败。[@ref-continue-src-mcp-client]

**缺口**：CLI 侧没有 token 刷新。`withTokenRefresh` 是空壳（对 stdio 直接调用，对远程也是直接调用，注释写明「No auth/token refresh available」），`apiKeyCache` 只在连接时写入一次，`requestOptions.clientCertificate` 这类字段虽然在与模型共享的 schema 里存在，但 MCP 传输构造里只用到 `headers` 与 `verifySsl`。[@ref-continue-src-mcp-client][@ref-continue-src-mcp-transports] 另有一个更大的背景：本提交里 CLI 的认证层已被整体替换为空实现（`AuthConfig` 恒为 `null`，`loadAuthConfig`/`getAccessToken` 恒返回 `null`），因此 `${{ secrets.* }}` 能否真正渲染、hub 密钥能否取到，取决于平台客户端在无凭据下的行为，固定来源没有给出结论——这条只能运行验证。[@ref-continue-src-auth-stub][@ref-continue-src-mcp-connect]

## 连接、重启与关闭 {#mcp-lifecycle}

**连接时机**：`MCPService.doInitialize` 在服务容器初始化阶段被调用，先关闭所有旧连接，再对配置里的每个 server 并发调用 `connectServer`。[@ref-continue-src-mcp-init]

- **headless 会话或存在 agent 文件时**：等待全部连接完成；headless 下只要有一个 server 处于 `error`，就把所有失败 server 的「名字 + 错误」拼成一条异常抛出，会话直接失败。[@ref-continue-src-mcp-init]
- **普通 TUI 会话**：不等待，连接在后台推进，界面通过 `updateState()` 逐步刷新状态。[@ref-continue-src-mcp-init][@ref-continue-src-mcpselector]

**单个 server 的连接过程**：建连接记录（`status: "connecting"`）→ 检查未解析 secret → 构造传输并握手 → 标记 `connected` → 按 server 自报的 capabilities 拉取 prompts 与 tools（任一失败只记 warning，不影响连接状态）。任何一步抛错则把该连接置为 `error` 并记录错误文本。[@ref-continue-src-mcp-connect][@ref-continue-src-mcp-caps]

**重启/停止**：`restartServer(name)` 会先关掉同名连接再重连；`restartAllServers()` 关掉全部再按当前配置重连。`/mcp` 选择器直接暴露「Restart all servers」「Stop all servers」「Restart server」「Stop server」四个动作，停止后该 server 的工具会从工具集中消失。[@ref-continue-src-mcp-restart][@ref-continue-src-mcpselector-actions][@ref-continue-src-tools-assemble]

**关闭**：进程的 `exit`、`SIGINT`、`SIGTERM` 都注册了 `cleanup()`，会把所有连接 `close()` 掉并把状态归零（`idle`、清空 tools/prompts/warnings）。[@ref-continue-src-mcp-init]

**超时与重试**：固定来源里 CLI 的 `client.connect(transport, {})` 没有传任何连接超时；schema 里声明的 `connectionTimeout` 只在 IDE 的 `core/config/yaml/yamlToContinueConfig.ts` 里被映射。除了手工 Restart，CLI 没有自动重连或指数退避逻辑（指数退避只用在模型请求上）。[@ref-continue-src-mcp-client][@ref-continue-src-mcp-schema][@ref-continue-src-backoff]

## 能力发现与暴露给模型的工具 {#mcp-capabilities}

**能力发现**：握手后 CLI 读取 `client.getServerCapabilities()`，**只在声明了对应能力时**才去调 `listPrompts()` 与 `listTools()`。两者各自 try/catch：失败时把错误文本塞进 `warnings` 并保持连接为 `connected`。[@ref-continue-src-mcp-caps]

- **Tools**：可用。发现的每个 tool 会通过 `convertMcpToolToContinueTool` 变成 CLI 工具——名字就是 MCP 侧的原始工具名，描述取 `description`，参数 schema 取 `inputSchema.properties` 与 `inputSchema.required`，然后整体 push 进 `getAllAvailableTools()` 的结果。[@ref-continue-src-tools-mcpconvert][@ref-continue-src-tools-assemble]
- **Prompts**：会被列出并保存在连接状态里，但固定的 CLI 源码里没有把它们变成斜杠命令或工具；`MCPServiceState` 的消费方只有工具。状态记为 partial。[@ref-continue-src-mcp-caps]
- **Resources**：`connectServer` 只检查 `capabilities.prompts` 与 `capabilities.tools`，没有 `resources` 分支，也没有 `readResource` 调用。[@ref-continue-src-mcp-caps]

**工具调用**：`runTool(name, args)` 按连接迭代，在 `status === "connected"` 且工具名匹配的连接上调用 `client.callTool`；找不到抛 `Tool not found`。也就是说**不同 server 的同名工具，先被迭代到的那个胜出**，CLI 不做命名空间前缀或冲突提示。[@ref-continue-src-mcp-capabilities-find][@ref-continue-src-mcp-caps]

**权限与可见性**：MCP 工具没有专属权限规则，落到内置策略的最后一条 `{tool: "*", permission: "ask"}`（TUI）或 `{tool: "*", permission: "allow"}`（headless）。所以：TUI 下每次调用 MCP 工具都要批准，headless 下默认放行；`--exclude` 可以直接按工具名屏蔽某个 MCP 工具。[@ref-continue-src-perms-default][@ref-continue-doc-cli-perms-defaults]

**用 agent 文件收窄**：agent 文件 `tools:` 里写 `owner/package` 表示放行该 server 的全部工具，`owner/package:tool_name` 只放行单个工具；一旦写了 `tools:` 且没有 `built_in`，未列出的内置工具会被批量 `exclude`。这是 CLI 侧唯一能按 server 粒度控制工具可见性的机制。[@ref-continue-src-agent-toolgate][@ref-continue-src-agentfile-tools]

## 诊断：连接状态、告警与日志 {#mcp-diagnostics}

可观察的入口有四个：

1. **`/mcp` 选择器**：列出全部 server 及其状态。状态文案由连接状态派生——`connecting`、`error`（红，附带错误文本）、`connected`、`connected (with warnings)`（已连接但有告警）；服务级还有 `getOverallStatus()` 汇总 `idle / connecting / connected / error` 与 `hasWarnings`。[@ref-continue-src-mcpselector][@ref-continue-src-mcp-status]
2. **错误与告警字段**：连接失败时 `error` 保存错误文本；stdio server 的 stderr 与 prompts/tools 拉取失败都会进 `warnings`。连接失败的那一刻，已有的 warnings 会被折叠进 `error`（形如「原始错误 + Server stderr: ...」），不再单独显示。[@ref-continue-src-mcp-connect][@ref-continue-src-mcp-stdio]
3. **启动期失败**：headless 或带 agent 文件时会等待连接并把失败 server 列成异常抛出，这是「配置被读到但 server 起不来」最直接的信号。[@ref-continue-src-mcp-init]
4. **日志**：所有连接与工具调用通过 CLI 的 logger 写入 `{continueHome}/logs/cn.log`（debug 级），`--verbose` 提高终端日志级别。[@ref-continue-src-logger][@ref-continue-src-common-options]

**区分四种「不可用」**：配置没被读到 → 加载的那份 config.yaml 里根本没有该 server，`/mcp` 列表为空或缺失；server 未连上 → 列表里出现 `error` 并带错误文本；连上但工具不可见 → `connected (with warnings)`，说明 `listTools` 失败；工具可见但调用失败 → 错误从 `runTool`/`callTool` 冒泡到模型侧的工具结果。这四种现象分别对应上面四个入口。[@ref-continue-src-mcp-connect][@ref-continue-src-mcp-capabilities-find]
