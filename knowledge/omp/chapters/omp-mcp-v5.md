---
schema_version: 3
record_kind: production
edition_id: omp-mcp-v5
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
      - ref-omp-mcp5-lifecycle-interactive-startup-doc
      - ref-omp-mcp6-exposure-readonly-hint-code
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-omp-mcp-health-doc-69e8
      - ref-omp-mcp5-lifecycle-interactive-startup-doc
      - ref-omp-mcp6-diagnostics-plugin-timeout-doc
      - ref-omp-mcp6-diagnostics-progress-doc
      - ref-omp-mcp6-diagnostics-cancel-doc
      - ref-omp-mcp6-diagnostics-nonretryable-doc
      - ref-omp-mcp6-diagnostics-retry-boundary-doc
      - ref-omp-mcp6-diagnostics-progress-code
      - ref-omp-mcp6-diagnostics-discovery-warnings-code
      - ref-omp-mcp6-diagnostics-lost-after-send-code
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
          - ref-omp-mcp5-lifecycle-interactive-startup-doc
          - ref-omp-mcp6-exposure-readonly-hint-code
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs:
          - ref-omp-mcp-health-doc-69e8
          - ref-omp-mcp5-lifecycle-interactive-startup-doc
          - ref-omp-mcp6-diagnostics-plugin-timeout-doc
          - ref-omp-mcp6-diagnostics-progress-doc
          - ref-omp-mcp6-diagnostics-cancel-doc
          - ref-omp-mcp6-diagnostics-nonretryable-doc
          - ref-omp-mcp6-diagnostics-retry-boundary-doc
          - ref-omp-mcp6-diagnostics-progress-code
          - ref-omp-mcp6-diagnostics-discovery-warnings-code
          - ref-omp-mcp6-diagnostics-lost-after-send-code
---
本章的材料来自源码修订 69e8c9e 的官方文档 `docs/mcp-config.md`、`docs/mcp-protocol-transports.md` 与 `docs/mcp-runtime-lifecycle.md`；上一版引用的 npm 包内 `src/mcp/types.ts` 不在本轮取证范围内。配置位置、文件形状、传输选择、OAuth 字段、启动门与重连行为都取自该修订的文档正文。相对上一版的变化是实质性的：跨 provider 去重新增了“等价传输/端点/认证也算重复”的规则，启动门新增后台续接与工具缓存，工具名新增长度上限与哈希后缀。本轮没有启动任何 MCP server，也没有执行登录或工具调用，因此连接握手、能力发现和调用成功只按文档描述，未做运行观察。相对上一版的实质变化只有一处，来自源码修订 `4b5e4fb7ea8ec2d37b8b6b138ea01125fe0a17dc` 的 `docs/mcp-config.md`（新增引用前缀 `ref-omp-mcp5-`）：交互式与 `--mode rpc-ui` 会话首轮最多等 1.5 秒 MCP 启动，因此首轮系统提示里可能已经包含当时连上的 server。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证；凭据一律写成占位符或环境变量名。 [@ref-omp-mcp-config-locations-doc-69e8]

本版再按 `0b5c27ab24719c86a5986b95ee55f4e75bc1aaa0` 复核（新增引用前缀 `ref-omp-mcp6-`）。该 commit 对本章两道固定问题都有实质变化：工具暴露一侧，server 在 `annotations.readOnlyHint` 里声明的只读性只用于 prewalk 判定，批准级别仍是 `write`，批准弹窗改用参数格式化器；诊断一侧新增请求进度上报、`notifications/cancelled` 的尽力发送、以及“请求可能已到达 server 后不再自动重放”的错误分类，发现期警告也会写进日志。工具名规范化、跨 provider 去重、首轮 1.5 秒启动门与重连阶梯在该区间未变。

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

`4b5e4fb7` 补上了“首轮能看到哪些 server 工具”的时间条件：在交互式与 `--mode rpc-ui` 会话中，MCP server 是后台连接的，首轮会为 MCP 启动最多等 1.5 秒，使该轮系统提示包含到那时已连上的 server；更慢的 server 随后注册，并改变下一轮的系统提示 [@ref-omp-mcp5-lifecycle-interactive-startup-doc]。这解释了为什么同一个 server 在首轮缺席、下一轮出现——它此时才连上，而不是被工具策略过滤掉。

本轮（`0b5c27ab`）补齐了“server 自己声明的能力提示如何参与暴露”这一层：`MCPTool` 与 `DeferredMCPTool` 现在读 `tool.annotations?.readOnlyHint` 并存成 `mcpReadOnlyHint`，注释写明它**只供 prewalk 使用、批准仍保持保守**——工具的 `approval` 依旧是常量 `"write"` [@ref-omp-mcp6-exposure-readonly-hint-code]。也就是说 server 自称只读不会让 OMP 跳过批准或把它降成读类工具：注解不改变权限，只影响预走（prewalk）路径的判定。

批准界面同时改用统一的参数格式化器（`formatApprovalDetails = formatApprovalArguments`），MCP 调用的参数按与内置工具相同的形态呈现 [@ref-omp-mcp6-exposure-readonly-hint-code]。这不改变谁能调用什么，但改变了批准提示里显示的内容。

## 诊断缺口 {#mcp-diagnostics}

可确证的隔离边界是：一个 server 失败不会移除健康 server 的工具，连接与列举失败按 server 隔离，陈旧工具可能在重连期间仍然可见、调用时报 MCP 错误；工具缓存、resource/prompt 加载、订阅与后台更新都是尽力而为。本轮没有启动任何 server，因此这些结论都来自文档描述而非运行观察。 [@ref-omp-mcp-health-doc-69e8]

排查“工具没出现”时，交互式与 `--mode rpc-ui` 会话要先排除时序因素而不是立刻怀疑配置：首轮只等最多 1.5 秒的 MCP 启动，更慢的 server 会改变下一轮的系统提示而不是被丢弃 [@ref-omp-mcp5-lifecycle-interactive-startup-doc]。

本轮（`0b5c27ab`）给“调用是否成功”的判定加了几个可观察信号，并明确了配置读取期的警告去向。

**请求进度**。`MCPRequestOptions.onProgress` 让请求进入 MCP 进度上报：传输把本次尝试的 JSON-RPC request id 作为 `_meta.progressToken` 写进参数（保留其它 record 型 `_meta` 键、不改工具 `arguments`），重试与重连各拿新 token；stdio、旧 SSE 与 Streamable HTTP 分别从各自的响应流路由 `notifications/progress`，token 不做类型强转（数字 `0` 与字符串 `"0"` 不同）[@ref-omp-mcp6-diagnostics-progress-doc]。工具侧把它变成部分结果更新：存在更新回调时，`details.progress` 带最新进度并另有一行文本；同样文本合并且不重复发出，两次更新至少间隔 50 ms，调用结算时仍在等待的合并更新被丢弃 [@ref-omp-mcp6-diagnostics-progress-code]。因此“调用在跑但还没结果”现在有中间态可看，进度也不会延长请求的绝对期限 [@ref-omp-mcp6-diagnostics-progress-doc]。

**取消只是本地的**。stdio 上，已写入子进程且仍在飞的请求在调用方 abort 或硬期限到期时，先结算本地等待者，再发一次尽力而为的 `notifications/cancelled`（保留原 request id 的数字/字符串类型，固定原因不暴露调用方的 abort 原因）；写取消通知从不被 await，失败或背压不会延迟结算 [@ref-omp-mcp6-diagnostics-cancel-doc]。`initialize`、预先已 abort、尚未写出、已结算与已断开的请求都不发取消，取消一个请求也不会关掉共享 server；server 可能忽略或早已完成，所以**请求结局仍是未知** [@ref-omp-mcp6-diagnostics-cancel-doc]。

**“可能已经执行”成了独立分类**。一旦请求可能到达 server——stdio 帧已写入 stdin、Streamable HTTP 或旧 SSE 的 POST 建连后连接被重置或关闭（响应前后都算）、收到 Streamable HTTP 的 2xx、旧 SSE 的 POST 已被接受——失败一律标为非可重试且不自动重放；只有证明请求从未离开 OMP 的失败（`Transport not connected`、连接被拒）才进入重连+重试 [@ref-omp-mcp6-diagnostics-nonretryable-doc][@ref-omp-mcp6-diagnostics-retry-boundary-doc]。`MCP failure` 报告对这类错误给出专门的 next-step 文案：连接在请求发出后断开，可能已经执行，重试前先核对该操作的效果 [@ref-omp-mcp6-diagnostics-lost-after-send-code]。

**配置读取期的警告不再随结果对象蒸发**。`loadAllMCPConfigs()` 把发现阶段的 `result.warnings` 逐条写进日志，注释举的例子正是 Claude 插件清单里低于 Claude Code 1000 ms 下限的 timeout [@ref-omp-mcp6-diagnostics-discovery-warnings-code]；同一条规则在配置文档里写明：Claude marketplace 插件的 `.mcp.json` 值是毫秒，低于 `1000` 的值被忽略并给一条发现警告，随后走 OMP 正常超时回退，且不影响 OMP 原生配置里 `0` 关闭超时的语义 [@ref-omp-mcp6-diagnostics-plugin-timeout-doc]。所以“我设了 800 ms 超时却没生效”的第一顺位解释是这个下限，第二顺位才是 `OMP_MCP_TIMEOUT_MS` 或 server 值。
