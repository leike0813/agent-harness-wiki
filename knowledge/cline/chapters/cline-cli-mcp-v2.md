---
schema_version: 3
record_kind: production
edition_id: cline-cli-mcp-v2
harness_id: cline
topic: mcp
title: "Cline CLI 的 MCP 配置、传输与能力暴露"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-cline-paths-settings, ref-cline-paths-datadir, ref-cline-mcp-default-path, ref-cline-cli-mcp-cmd, ref-cline-cli-mcp-wizard-settings, ref-cline-mcp-runtime-load, ref-cline-plugin-mcp-sync, ref-cline-mcp-doc-add, ref-cline-cli-ref-files, ref-cline-mcp-doc-cli]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-cline-mcp-schema, ref-cline-mcp-transport-union, ref-cline-mcp-legacy, ref-cline-mcp-stdio, ref-cline-mcp-timeout-defaults, ref-cline-mcp-stdio-spawn, ref-cline-mcp-doc-add, ref-cline-cli-mcp-wizard-settings]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-cline-mcp-stdio-spawn, ref-cline-mcp-init, ref-cline-mcp-oauth-metadata, ref-cline-mcp-install, ref-cline-mcp-install-type, ref-cline-mcp-tool-build, ref-cline-mcp-manager-disabled, ref-cline-mcp-connect-budgets, ref-cline-mcp-manager-ctor, ref-cline-mcp-list-tools, ref-cline-mcp-doc-manage]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-cline-mcp-doc-add, ref-cline-mcp-oauth-client, ref-cline-mcp-oauth-state, ref-cline-mcp-oauth-metadata, ref-cline-mcp-oauth-ports, ref-cline-cli-mcp-oauth, ref-cline-cli-mcp-oauth-client-set]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-cline-mcp-tools, ref-cline-mcp-proto, ref-cline-mcp-init, ref-cline-mcp-name-transform, ref-cline-cli-safe-tools, ref-cline-cli-precedence, ref-cline-remote-config-schema, ref-cline-mcp-tool-result-policy, ref-cline-tool-result-cache-store, ref-cline-tool-result-cache-uri, ref-cline-tool-result-cache-session, ref-cline-tool-result-cache-lifetime, ref-cline-tool-result-cache-oversize, ref-cline-tool-result-cache-budget, ref-cline-tool-result-cache-read, ref-cline-mcp-changelog-oversized, ref-cline-tool-result-char-limit, ref-cline-tool-result-char-env]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cline-cli-mcp-cmd, ref-cline-cli-mcp-wizard-settings, ref-cline-mcp-probe, ref-cline-mcp-tool-build, ref-cline-cli-doctor, ref-cline-docs-mcp-troubleshooting, ref-cline-mcp-doc-transports]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: conflict
        source_refs: [ref-cline-paths-settings, ref-cline-mcp-doc-add]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: partial
        source_refs: [ref-cline-mcp-schema, ref-cline-mcp-stdio, ref-cline-mcp-doc-add]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-cline-mcp-stdio-spawn, ref-cline-mcp-init, ref-cline-mcp-oauth-metadata]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-cline-mcp-oauth-client, ref-cline-mcp-oauth-state, ref-cline-cli-mcp-oauth]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-cline-mcp-tool-build, ref-cline-mcp-manager-disabled, ref-cline-mcp-connect-budgets]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-cline-mcp-tools, ref-cline-mcp-proto, ref-cline-mcp-tool-result-policy, ref-cline-tool-result-cache-read, ref-cline-tool-result-cache-uri, ref-cline-tool-result-cache-session]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: partial
        source_refs: [ref-cline-mcp-name-transform, ref-cline-cli-safe-tools, ref-cline-remote-config-schema]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-cline-cli-mcp-cmd, ref-cline-mcp-probe, ref-cline-cli-doctor]
---

## 配置文件与作用域 {#mcp-entry}

固定来源：仓库提交 `39ff2359f7e08231281539696e48a166ce49270c` 的 `sdk/packages/shared/src/storage/paths.ts`、`sdk/packages/core/src/extensions/mcp/`、`sdk/packages/core/src/runtime/orchestration/runtime-builder.ts`、`apps/cli/src/commands/mcp.ts`、`apps/cli/src/wizards/mcp/`，以及 `docs/mcp/mcp-overview.mdx`、`docs/getting-started/config.mdx`、`docs/cli/cli-reference.mdx`。官方文档站 `https://docs.cline.bot/mcp/mcp-overview.md` 的快照作佐证，其软件版本未知。上一版固定在 `3435f72fcf4cb843bee946b8f9e981683564c9e3`；传输、认证与连接时机未变，本版只补工具结果体积超限时的处理。

**只有一个磁盘文件，没有项目级作用域。** 路径解析是 `CLINE_MCP_SETTINGS_PATH`（若设置），否则 `{数据目录}/settings/cline_mcp_settings.json`；数据目录是 `CLINE_DATA_DIR` 或 `resolveClineDir()/data`。默认即 `~/.cline/data/settings/cline_mcp_settings.json`。[@ref-cline-paths-settings][@ref-cline-paths-datadir][@ref-cline-mcp-default-path]

所有 CLI 面都读写同一个路径：`cline config mcp`、`cline mcp` 向导、`cline mcp install/uninstall`、TUI 的 MCP 管理器都调用 `resolveDefaultMcpSettingsPath()`。[@ref-cline-cli-mcp-cmd][@ref-cline-cli-mcp-wizard-settings]

服务在会话构建时注册：`loadConfiguredMcpTools` 读设置文件、把每个条目注册进 manager，再为启用的 server 建 MCP 工具；CLI 不设 `disableMcpSettingsTools`，所以这条路径默认生效。[@ref-cline-mcp-runtime-load]

插件自带的 server 会被同步进同一个文件，并打上 `metadata.source: "plugin"`，因此 CLI 能列出它们但拒绝对它们单独开关；厂商中立的 Agent Plugin 则直接读自己包内的 `mcp.json`，不写这份设置文件。[@ref-cline-plugin-mcp-sync]

**文档冲突（两处）。** `docs/mcp/mcp-overview.mdx` 说 CLI 的 MCP 配置文件是 `~/.cline/mcp.json`；`docs/cli/cli-reference.mdx` 的目录树里还把项目根的 `.cline/mcp.json` 列为 MCP server 配置。固定提交里两者都不存在读取者：唯一的 `mcp.json` 读取点是 Agent Plugin 包根与测试夹具。按代码，配置只在 `~/.cline/data/settings/cline_mcp_settings.json`（或环境变量指定的文件）。[@ref-cline-mcp-doc-add][@ref-cline-cli-ref-files]

`cline mcp` 向导本身提供的动作（列出、新增、编辑、启停、删除）与文档一致，但它写的就是上面那个设置文件。[@ref-cline-mcp-doc-cli]

## 定义格式、字段与变量展开 {#mcp-definition}

文件外壳是 `{ "mcpServers": { "名字": 定义 } }`，根对象是 `.passthrough()`（未知顶层键保留但不用），每个 server 上的未知键被 schema 丢掉。[@ref-cline-mcp-schema]

每个 server 接受两种写法：

1. 嵌套式：`transport`、`disabled`、`timeout`、`metadata`、`oauthClient`、`oauth`；
2. 兼容的扁平式：`type` 或 `transportType` 加上 `command/args/cwd/env` 或 `url/headers`，再加同样的可选字段。

传输类型判别联合只有三个成员：`stdio`、`sse`、`streamableHttp`；兼容层的 `http` 映射为 `streamableHttp`，扁平条目既没有 `type` 也没有 `transportType` 时按旧的 `sse` 处理。[@ref-cline-mcp-transport-union][@ref-cline-mcp-legacy]

stdio 字段：`command`（必填、非空）、`args`（字符串数组）、`cwd`、`env`（字符串到字符串）；远程字段：`url`（必须是合法 URL）与 `headers`（字符串到字符串）。`timeout` 以秒计，预处理时只有有限数字才会被规范化，其余视为未设置；默认 60 秒，钳在 1–3600 秒之间。[@ref-cline-mcp-stdio][@ref-cline-mcp-timeout-defaults]

变量展开只发生在插件侧：Agent Plugin 自身 `mcp.json` 支持 `${PLUGIN_ROOT}`/`${PLUGIN_DATA}`，插件注册的 server 支持 `{fromEnv, value, required}` 形式的 env 解析；**这份设置文件里的 `env` 是字面量**，启动时直接覆盖在 `process.env` 之上，没有 `${VAR}` 展开。[@ref-cline-mcp-stdio-spawn]

**文档冲突。** 官方文档的两段内联配置示例都在 server 条目里写了 `"autoApprove": []`（stdio 与远程各一处），但设置 schema 里没有 `autoApprove`，仓库代码也不读这个键；每个 tool 的批准是另一套工具策略机制。[@ref-cline-mcp-doc-add]

CLI 侧写入示例（来自 `cline mcp` 向导：本地 server 收集 command 与 env，远程收集 URL 与认证方式）等价于：

```json
{
  "mcpServers": {
    "local-tools": {
      "type": "stdio",
      "command": "node",
      "args": ["/abs/path/server.js"],
      "env": { "API_KEY": "{你的 token}" }
    },
    "remote-tools": {
      "type": "streamableHttp",
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer {你的 token}" }
    }
  }
}
```

字段来源：`config-loader.ts` 的 schema 与 `wizards/mcp/index.ts` 的收集流程；示例里没有出现 `autoApprove`，因为它不在这份 schema 里。[@ref-cline-mcp-schema][@ref-cline-cli-mcp-wizard-settings]

## 传输、启动与生命周期 {#mcp-transport}

stdio：CLI 侧自己 spawn，`spawn(command, args, { cwd, env: {...process.env, ...transport.env}, stdio: ["pipe","pipe","pipe"] })`，Windows 上额外加 `shell: true` 与隐藏窗口；JSON-RPC 走 stdin/stdout，initialize 先试换行分帧，失败再试 Content-Length 分帧，随后发 `notifications/initialized`。[@ref-cline-mcp-stdio-spawn][@ref-cline-mcp-init]

远程：`sse` 用 MCP SDK 的 `SSEClientTransport`，`streamableHttp` 用 `StreamableHTTPClientTransport`，`headers` 作为 `requestInit.headers` 传入。[@ref-cline-mcp-oauth-metadata]

兼容改写：形如 `npx -y mcp-remote 某个 https URL` 且没有多余参数/环境变量的条目，会被改写成原生 `streamableHttp`，不再 spawn 代理进程；`cline mcp install` 也把 `--transport http`/`streamable-http` 归一成 `streamableHttp`。[@ref-cline-mcp-install][@ref-cline-mcp-install-type]

连接时机：运行时构建（即会话创建）时注册全部条目，然后对**启用**的 server 调 `createMcpTools()`，其中 `listTools()` 会强制 `connect()`；多个 server 用 `Promise.allSettled` 并行，单个 server 工具加载失败只记日志并跳过，不拖垮会话。[@ref-cline-mcp-tool-build]

`disabled: true` 的 server 永不连接：它们被排除在建工具之外，manager 明确拒绝连接被禁用的 server。[@ref-cline-mcp-manager-disabled]

超时与重试：stdio 的 initialize 预算默认 3000 毫秒，远程连接预算默认 10000 毫秒；普通请求（`tools/list`、`tools/call`）默认 60 秒，由 `timeout` 字段覆盖；显式 `timeout` 同时覆盖连接预算。[@ref-cline-mcp-connect-budgets]

管理面：manager 按 server 串行化操作，工具列表默认缓存 5000 毫秒；没有自动重连/退避，连接失败会断开客户端、记录 `lastError` 并抛错，重连只能靠下次 `ensureConnectedClient` 或重建会话。[@ref-cline-mcp-manager-ctor][@ref-cline-mcp-list-tools]

配置改动（含 TUI 的启停切换）只在会话重建后生效：TUI 对话框检测到变化会重启会话，注册在运行时构建时重新解析。文档里「重启不响应的 server、设置请求超时」对应的就是上面这套启停与 `timeout`。[@ref-cline-mcp-doc-manage]

## 认证与 OAuth {#mcp-auth}

静态认证就是远程条目上的 `headers`（例如 `Authorization: Bearer ...`）；CLI 安装与向导接受 `KEY:VALUE` 形式的 `--header`。[@ref-cline-mcp-doc-add]

OAuth 是每个远程 server 独立的一套状态：`oauthClient { clientId, clientSecret? }`（不填走动态注册）加上持久化的 `oauth` 块（`clientInformation`、`tokens`、`codeVerifier`、`discoveryState`、`redirectUrl`、`lastError`、`lastAuthenticatedAt`、`authorizationRequired`），写回同一份设置文件。[@ref-cline-mcp-oauth-client][@ref-cline-mcp-oauth-state]

刷新语义：客户端元数据声明 `grant_types: ["authorization_code", "refresh_token"]`，正常连接只复用/刷新已存 token，绝不自行发起交互式授权；没有 token 时干脆不提供 authProvider，让 401 以 `UnauthorizedError` 暴露并把该 server 标为 `authorizationRequired`。[@ref-cline-mcp-oauth-metadata]

交互式登录：`cline mcp` 的 Authorize 动作与向导的新增/编辑路径会调用 `authorizeMcpServerOAuth`——在本机 1456/1457/1458 端口、路径 `/mcp/oauth/callback` 起回调服务（5 分钟超时），打开授权 URL，校验 `state`，`finishAuth` 后重试 connect 与 `tools/list`。[@ref-cline-mcp-oauth-ports][@ref-cline-cli-mcp-oauth]

若 server 已配置静态 `Authorization` 头，OAuth 会被拒绝（报「has a static Authorization header」）；更换 `oauthClient` 会清掉已存 token 与 `clientInformation`。[@ref-cline-cli-mcp-oauth-client-set]

凭据来源只有设置文件，没有系统钥匙串；示例里凭据一律用占位符，不要写进仓库。[@ref-cline-mcp-oauth-state]

## 能力暴露、命名与批准 {#mcp-exposure}

**只实现了 tools 能力。** `tools/list` 用来生成工具包装，`tools/call` 用来执行；resources/prompts 没有任何调用点，客户端 initialize 时也不声明能力，协议版本固定为 `2024-11-05`。[@ref-cline-mcp-tools][@ref-cline-mcp-proto][@ref-cline-mcp-init]

工具命名：`serverName__toolName`，非法字符替换成 `_`；名字未变且不超过 64 字符时原样使用，否则截断并追加 8 位十六进制 SHA-1 后缀。[@ref-cline-mcp-name-transform]

过滤与批准：`disabled: true` 的整台 server 不贡献工具；单个工具级别的关闭辅助函数存在但本版本没有调用者。批准走统一的工具策略——CLI 构造 `{ "*": { autoApprove: effectiveToolAutoApprove } }` 传给核心，值为 true 时跳过确认；全局总开关关闭时只有一份固定安全名单保持自动批准，**MCP 工具不在名单里**，因此会逐个询问。[@ref-cline-cli-safe-tools][@ref-cline-cli-precedence]

一个明确的边界：企业远控配置 schema 里有 `mcpMarketplaceEnabled`、`allowedMCPServers`、`remoteMCPServers`、`blockPersonalRemoteMCPServers`，但固定提交的 SDK/CLI 里没有读取者，它们不约束本版本的 CLI 可见或可调用的 MCP 能力。[@ref-cline-remote-config-schema]

**输出太长时不再直接截断丢弃。** 每个 MCP 工具包装都带 `resultPolicy: "cache-oversized"`：工具返回后，如果投进上下文的预览文本超过 `maxToolResultChars`（会话级上限），完整结果会被存进一个**会话私有、纯内存**的缓存，模型拿到的是预览加上一个 URI。[@ref-cline-mcp-tool-result-policy][@ref-cline-tool-result-cache-store] URI 的实际拼法是 `cline://cache/{encodeURIComponent(sessionId)}/{randomUUID()}.result.txt`，同一工具调用再次超限时会先撤掉旧条目再写新的。[@ref-cline-tool-result-cache-uri]

这个 URI 只能由 `read_files` 读回来——文件读取执行器遇到 `cline://` 开头的路径就改从缓存取内容，并支持 `start_line`/`end_line` 窗口，所以模型可以分页读剩下的部分。缓存 `read` 用正则 `^cline://cache/([^/]+)/([a-f0-9-]+)\.result\.txt$` 匹配，URI 里的会话段与当前会话不一致就直接报 "Invalid tool result cache URI for this session"，因此别处的 URI 会被拒绝；条目不存在时提示是「Cache not found. Make a new tool call for the latest result again if needed. DO NOT repeat side-effecting actions to recover output.」——即重跑有副作用的工具不是恢复输出的办法。[@ref-cline-tool-result-cache-read][@ref-cline-tool-result-cache-session][@ref-cline-tool-result-cache-budget]

条目查找不延长寿命（类的注释就写着 "Looking up a URI never extends its lifetime"），闲置 5 个迭代后条目被回收；总量上限 16 MiB，单条超过上限时 `store` 直接 `return undefined`，不给 URI，容量不够时按插入顺序逐出最旧条目。[@ref-cline-tool-result-cache-budget][@ref-cline-tool-result-cache-lifetime][@ref-cline-tool-result-cache-oversize]

触发这个分支的阈值是消息构建器的 `maxToolResultChars`，默认 8000 字符，可用环境变量 `CLINE_MESSAGE_BUILDER_MAX_TOOL_RESULT_CHARS` 调整。阈值调小会让更多工具结果转入缓存，调大则相反。[@ref-cline-tool-result-char-limit][@ref-cline-tool-result-char-env]

这条机制在本提交是**每个 MCP 工具都有**的默认行为，不需要在 `mcp.json` 里配置什么。CLI 变更日志对应的说法是：当 MCP 工具返回超出上下文的输出时，agent 现在能读到剩余部分，拿到预览加上一个可以用 `read_files` 翻页的链接。[@ref-cline-mcp-changelog-oversized]

## 诊断 {#mcp-diagnostics}

- 配置是否读到：`cline config mcp` 打印 `No MCP settings file found at {路径}`、`No MCP servers configured in {路径}` 或 `Configured MCP servers ({路径}):` 加每行 `  名字 [传输类型]（(disabled)）`；`--json` 输出 `{name, transportType, disabled, path}` 数组。它只证明文件解析成功与有哪些 server，**不会连接**。[@ref-cline-cli-mcp-cmd]
- 认证状态：`cline mcp` 的 List servers 会额外打印认证标签（local / oauth authorized / oauth pending / static headers / no auth / oauth error）、`oauth.lastError` 与设置路径；TUI 的 MCP 管理器显示设置路径、传输/认证/超时摘要与 `lastError`。[@ref-cline-cli-mcp-wizard-settings]
- server 是否可连：核心导出 `probeMcpServerConnection`，对远程 server 返回 `{connected, authorizationRequired, error}` 并把 `lastError` 写回设置；它拒绝 stdio，且本版本的 `apps/cli` 没有调用它。[@ref-cline-mcp-probe]
- 工具是否可见/调用成功：CLI 没有列出 MCP 工具名或发测试 `tools/call` 的命令；每台 server 的工具加载失败只在日志里出现（`[mcp] Failed to load tools from MCP server ...`），`cline doctor` 也没有 MCP 检查项。[@ref-cline-mcp-tool-build][@ref-cline-cli-doctor]

文档给出的排查表（连接失败查命令/URL、缺工具查 server 是否起来、认证错误查 token/header、超时调大 timeout）与上面的可观察入口对应：配置读看 `cline config mcp`，连接/认证看 `cline mcp` 列表的认证标签与 `oauth.lastError`，工具可见性只能看会话日志与模型实际能否调用。[@ref-cline-docs-mcp-troubleshooting][@ref-cline-mcp-doc-transports]
