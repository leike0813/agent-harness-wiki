---
schema_version: 3
record_kind: production
edition_id: omp-mcp-v3
harness_id: omp
topic: mcp
title: OMP MCP 配置与运行机制
sections:
  - section_id: mcp-config-files
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-config-locations-doc-69e8
      - ref-omp-mcp-imported-doc-69e8
      - ref-omp-mcp-precedence-doc-69e8
  - section_id: mcp-file-shape
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-shape-doc-69e8
      - ref-omp-mcp-overrides-doc-69e8
  - section_id: mcp-transports
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-transport-doc-69e8
      - ref-omp-mcp-requestid-doc-69e8
      - ref-omp-mcp-protocol-doc-69e8
  - section_id: mcp-secrets
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-shape-doc-69e8
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-oauth-doc-69e8
      - ref-omp-mcp-protocol-doc-69e8
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-startup-doc-69e8
      - ref-omp-mcp-health-doc-69e8
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-exposure-doc-69e8
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-health-doc-69e8
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-config-files
        status: answered
        source_refs:
          - ref-omp-mcp-config-locations-doc-69e8
          - ref-omp-mcp-precedence-doc-69e8
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-file-shape
        status: answered
        source_refs:
          - ref-omp-mcp-shape-doc-69e8
          - ref-omp-mcp-overrides-doc-69e8
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transports
        status: answered
        source_refs:
          - ref-omp-mcp-transport-doc-69e8
          - ref-omp-mcp-requestid-doc-69e8
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs:
          - ref-omp-mcp-oauth-doc-69e8
          - ref-omp-mcp-protocol-doc-69e8
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs:
          - ref-omp-mcp-startup-doc-69e8
          - ref-omp-mcp-health-doc-69e8
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-omp-mcp-exposure-doc-69e8
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-omp-mcp-exposure-doc-69e8
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs:
          - ref-omp-mcp-health-doc-69e8
---
本章的材料来自源码修订 69e8c9e 的官方文档 `docs/mcp-config.md`、`docs/mcp-protocol-transports.md` 与 `docs/mcp-runtime-lifecycle.md`；上一版引用的 npm 包内 `src/mcp/types.ts` 不在本轮取证范围内。配置位置、文件形状、传输选择、OAuth 字段、启动门与重连行为都取自该修订的文档正文。相对上一版的变化是实质性的：跨 provider 去重新增了“等价传输/端点/认证也算重复”的规则，启动门新增后台续接与工具缓存，工具名新增长度上限与哈希后缀。本轮没有启动任何 MCP server，也没有执行登录或工具调用，因此连接握手、能力发现和调用成功只按文档描述，未做运行观察。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证；凭据一律写成占位符或环境变量名。 [@ref-omp-mcp-config-locations-doc-69e8]

本章的 JSON 代码块是固定文档给出的配置形态，用来说明文件名、作用域和字段含义，不是本轮验证过的可运行配置；示例里的包名、URL、路径和凭据都沿用文档示意或占位，读者需替换成自己的值。

## 配置位置与作用域 {#mcp-config-files}

OMP 原生 MCP 配置建议固定用两个文件：项目作用域的 `.omp/mcp.json`，用户作用域默认 `~/.omp/agent/mcp.json`（命名 profile 激活时为该 profile 的 agent 目录）。原生 provider 另外读 `.omp/.mcp.json` 与用户 agent 目录的 `.mcp.json` 作兼容，工作目录根的 `mcp.json` 与 `.mcp.json` 作可移植回退。 [@ref-omp-mcp-config-locations-doc-69e8]

用户级路径是默认值而非硬编码：`PI_CONFIG_DIR` 改写 home 配置根，`PI_CODING_AGENT_DIR` 可以覆盖默认 profile 的 agent 目录，但命名 profile 各自推导自己的 agent 目录、不继承该覆盖。项目配置始终留在 `.omp/`。 [@ref-omp-mcp-config-locations-doc-69e8]

导入的第三方来源本版列得更完整：Claude Code（`~/.claude.json`、`~/.claude/mcp.json`、项目 `.claude/.mcp.json` 与 `.claude/mcp.json`）、Codex（`~/.codex/config.toml` 与 `.codex/config.toml` 的 `[mcp_servers.*]`）、Gemini CLI、OpenCode（`~/.config/opencode/`、项目根与项目 `.opencode/` 下的 `mcp` map，`.json`/`.jsonc`）、Cursor、Windsurf、仅项目级的 VS Code（用 `mcp.servers`），以及已安装的 Claude marketplace 插件、OMP 扩展包和可移植 Agent Plugins（`plugin.json` 加根 `mcp.json`）。 [@ref-omp-mcp-imported-doc-69e8]

跨 provider 的去重规则本版写得更严格：按优先级降序加载，第一个定义胜出，重名不合并；但名字不同而传输、端点或命令输入、认证与 request-id 模式等价的定义，同样会被更高优先级的定义遮蔽。原生配置内部的顺序是项目 `.omp/mcp.json`、项目 `.omp/.mcp.json`、激活 profile 的用户 `mcp.json` 与 `.mcp.json`。 [@ref-omp-mcp-precedence-doc-69e8]

## 文件形状与最小 stdio 配置 {#mcp-file-shape}

原生 MCP 文件是 JSON，顶层四个键：`$schema`（可选的 JSON Schema 地址）、`mcpServers`（名称到 server 配置的映射）、`disabledServers`（激活 profile 的用户级拒绝名单，按名字隐藏任意来源的 server）、`enabledServers`（允许名单，强制启用某个来源里 `enabled: false` 的同名项，但压不过拒绝名单）。 [@ref-omp-mcp-shape-doc-69e8] [@ref-omp-mcp-overrides-doc-69e8]

下面是固定文档里最小 stdio 形态的样例：

```json
{
  "$schema": "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/src/config/mcp-schema.json",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/absolute/path/one"]
    }
  }
}
```

`command` 是要启动的可执行文件，必填；`args` 是传给它的参数数组。这条命令会去取第三方 npm 包，本轮没有运行它，也不保证能下载或启动。 `/mcp list` 会显示每个 server 来自哪个配置文件，修改文件后用 `/mcp reload` 在当前会话里重新发现并连接。 [@ref-omp-mcp-shape-doc-69e8]

对不属于 OMP 自有可写文件的来源，`/mcp enable` 与 `/mcp disable` 不会去改那个工具的配置，而是维护用户级的允许名单或拒绝名单，并移除冲突的过期覆盖项。 [@ref-omp-mcp-overrides-doc-69e8]

## 传输与协议 {#mcp-transports}

`client.ts:createTransport()` 按 `type` 选传输：省略或 `stdio` 走 `createStdioTransport`，`http` 走 `createHttpTransport`，`sse` 走旧的 HTTP+SSE 传输——它用 GET 打开配置 URL，读 `endpoint` 事件的纯文本 URL/路径，把 JSON-RPC 请求 POST 到该端点，并在流上收响应。 [@ref-omp-mcp-transport-doc-69e8]

请求 ID 由每个传输自己的 `RequestIdAllocator` 拥有：出站默认是自 1 起单调递增的整数，server 配置可设 `requestIdFormat: "string"` 换成抗碰撞的 `Snowflake.next()` 字符串。ID 只是传输本地的关联令牌。 [@ref-omp-mcp-requestid-doc-69e8]

本版新增了一条握手规则：连接建立后要记录 server 协商出的协议版本，并在任何后续会话流量之前发出 `notifications/initialized`；传输可用 `setProtocolVersion(version)` 让后续请求带上协商结果。 [@ref-omp-mcp-protocol-doc-69e8]

## 凭据与变量 {#mcp-secrets}

凭据字段属于 server 条目本身，OMP 会做发现期与连接前两阶段的 `${...}` 展开与 env/header 解析。本轮未取证这两阶段的完整规则与变量名表，因此凭据的具体写法按无证据处理，不在正文给出示例值；读者应参考固定文档的 Secrets 一节，并优先用环境变量名而不是明文。 [@ref-omp-mcp-shape-doc-69e8]

## 认证 {#mcp-auth}

`oauth` 用于 server 需要显式 OAuth client、scope 或回调设置的场景，字段包括 `clientId`、`clientSecret`、`scope`、`redirectUri`、`callbackPort`、`callbackPath` 与 `prompt`。回调监听默认端口 `3000`、路径 `/callback`；HTTP loopback 的 `redirectUri` 自带端口与路径，除非显式覆盖；HTTPS loopback 重定向需要在 TLS 终结器后面另设一个不同的 `callbackPort`。 [@ref-omp-mcp-oauth-doc-69e8]

`prompt` 控制 OAuth 的 `prompt` 授权参数。OMP 默认省略它，例外是请求了 `offline_access` scope 时默认 `"consent"`，以便服务端签发可刷新的访问令牌；可显式设成 `"consent"`、`"select_account"` 等服务端支持的值，或设成空串强制省略。 [@ref-omp-mcp-oauth-doc-69e8]

凭据刷新在传输层接线：HTTP 类传输在有可解析的受管 OAuth 凭据时，`MCPManager` 会为 401/403 接一次 auth-refresh 重试；Streamable HTTP 把它用在请求、server 请求的响应与续传 GET 上，不用于普通通知，旧 SSE 用在 POST 上（含通知）。 [@ref-omp-mcp-protocol-doc-69e8]

缺口：本轮没有实际完成一次 OAuth 授权，也没有验证 token 刷新与 `offline_access` 的服务端行为，属部分结论。 [@ref-omp-mcp-oauth-doc-69e8]

## 生命周期与启动门 {#mcp-lifecycle}

`connectServers()` 等的是一个竞速：一边是所有连接与工具加载任务落定，另一边是 `resolveMCPStartupTimeoutMs()`（`OMP_MCP_STARTUP_TIMEOUT_MS` 环境变量优先，其次 `mcp.startupTimeoutMs`，再其次 250 毫秒；设成 `0` 则一直等到初次加载全部落定）。 [@ref-omp-mcp-startup-doc-69e8]

启动窗口之后，已完成的任务变成活的 `MCPTool`，失败的任务产生按 server 的错误，仍在飞的任务若有 `MCPToolCache` 里的缓存工具定义就先用它建 `DeferredMCPTool`，否则启动时不贡献任何工具；它们保持飞行，连接与列举完成后由后台续接通过 `#onToolsChanged` 注册工具——慢 server 不再阻塞启动（issue #2100）。 [@ref-omp-mcp-startup-doc-69e8]

运行期的健康与重连由连接事件驱动，没有自主轮询的健康监视器。自动重连挂在 `transport.onClose` 上，按 500、1000、2000、4000 毫秒退避重试并在成功后通知消费者；一个 server 在 30 秒内重连尝试超过 5 次会触发崩溃风暴熔断并暂停自动重连，手动 `/mcp reconnect` 会重置这段历史。 [@ref-omp-mcp-health-doc-69e8]

本版新增了远程恢复探针：曾经连上过的 HTTP/SSE server 在重试阶梯用尽后仍不可用时，静默的定时探针会在 15 秒后开始、逐步翻倍到最多 5 分钟，直到恢复、显式断开或重新配置；探针只做一次完整连接尝试，并发的重连调用共享它。从未连上的 stdio 与远程 server 停在阶梯处不进入该机制。 [@ref-omp-mcp-health-doc-69e8]

## 工具暴露与命名 {#mcp-capabilities}

`discoverAndLoadMCPTools()` 把 manager 工具转成 `LoadedCustomTool[]` 并装饰路径（已知时写 `mcp:server via providerName`）；`createAgentSession()` 把它们推进 `customTools`，包装后以 `mcp__server_tool` 这样的名字加入运行时工具表。 [@ref-omp-mcp-exposure-doc-69e8]

本版明确了命名规则与冲突处理：server 与工具名分量转小写并只保留字母、数字和下划线，重复或边缘下划线被折叠与裁剪，工具名上冗余的 server 前缀被剥掉；超过 64 字符的名字用确定性哈希后缀截断；两个不同来源撞同一个运行时名时 OMP 记录冲突并按原始 server/tool 身份选出确定性赢家，使重连顺序不能改变归属。 [@ref-omp-mcp-exposure-doc-69e8]

展示形式与注册身份是两件事：已连接的 manager 工具立即启用，但呈现要与会话当前的工具策略调和——工具可能以 `xd://` 挂载而不是暴露为顶层函数定义，Code Mode 可以把它们路由经 Eval 桥；无论呈现如何，注册身份与原始 server/tool 归属保持不变。 [@ref-omp-mcp-exposure-doc-69e8]

## 诊断缺口 {#mcp-diagnostics}

可确证的隔离边界是：一个 server 失败不会移除健康 server 的工具，连接与列举失败按 server 隔离，陈旧工具可能在重连期间仍然可见、调用时报 MCP 错误；工具缓存、resource/prompt 加载、订阅与后台更新都是尽力而为。本轮没有启动任何 server，因此这些结论都来自文档描述而非运行观察。 [@ref-omp-mcp-health-doc-69e8]
