---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-mcp-v3
harness_id: prime-agent
topic: mcp
title: "Prime Agent CLI 的 MCP 配置、传输、生命周期与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mcp-connecting, ref-prime-agent-mcp-generic, ref-prime-agent-settings-globalonly, ref-prime-agent-providers-authfile]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mcp-generic, ref-prime-agent-mcp-call]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mcp-generic, ref-prime-agent-mcp-states, ref-prime-agent-mcp-connecting, ref-prime-agent-mcp-caveats, ref-prime-agent-acp-session-new-rust, ref-prime-agent-acp-mcp-wire-rust, ref-prime-agent-acp-request-timeout-rust, ref-prime-agent-acp-admission-validation-rust, ref-prime-agent-acp-wire-request-call-rust, ref-prime-agent-acp-request-wiring-rust, ref-prime-agent-acp-wire-constraints-rust]
  - section_id: mcp-capabilities-exposure
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mcp-call, ref-prime-agent-mcp-inventory, ref-prime-agent-mcp-generic, ref-prime-agent-mcp-migration, ref-prime-agent-usage-principles]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mcp-connecting, ref-prime-agent-mcp-generic, ref-prime-agent-mcp-states, ref-prime-agent-mcp-caveats]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-prime-agent-mcp-connecting, ref-prime-agent-mcp-generic, ref-prime-agent-settings-globalonly]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-prime-agent-mcp-generic]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-prime-agent-mcp-generic, ref-prime-agent-mcp-call]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-prime-agent-mcp-connecting, ref-prime-agent-mcp-generic, ref-prime-agent-providers-authfile]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-prime-agent-mcp-generic, ref-prime-agent-mcp-states, ref-prime-agent-mcp-connecting, ref-prime-agent-acp-session-new-rust, ref-prime-agent-acp-mcp-wire-rust, ref-prime-agent-acp-request-timeout-rust, ref-prime-agent-acp-admission-validation-rust, ref-prime-agent-acp-wire-request-call-rust, ref-prime-agent-acp-request-wiring-rust, ref-prime-agent-acp-wire-constraints-rust]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: partial
        source_refs: [ref-prime-agent-mcp-call, ref-prime-agent-mcp-migration]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-prime-agent-mcp-call, ref-prime-agent-mcp-inventory, ref-prime-agent-mcp-generic, ref-prime-agent-usage-principles]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-prime-agent-mcp-connecting, ref-prime-agent-mcp-generic, ref-prime-agent-mcp-states, ref-prime-agent-mcp-caveats]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 配置入口与作用域 {#mcp-entry}

Prime Agent 的 MCP 有两层入口。第一层是**服务目录集成**（Linear、Notion 等）：`/plugins` 与裸 `/mcp` 打开同一个可搜索的外部服务界面，回车在浏览器里完成 OAuth，凭据本地存放于 `~/.prime/agent/auth.json` 里以 `mcp:` 为前缀的键下（例如 `mcp:notion`），产品不经手代理转发；连接记录写在 `~/.prime/agent/mcp-connections.json`，保存 `connectionId`（派发 id 与凭据键）、目录 `serviceId`、绑定的 endpoint 与最近一次校验结果。多个账号使用不同 connectionId，名字相近也不会合并授权。[@ref-prime-agent-mcp-connecting]

第二层是**通用 MCP server**：从命令行（不启动 agent 即退出）或 TUI 的 `/mcp` 子命令管理，两个界面都只改 `~/.prime/agent/settings.json`。[@ref-prime-agent-mcp-generic]

```bash
prime-agent mcp add remote --url https://mcp.example.com/mcp --bearer-token-env-var EXAMPLE_TOKEN
prime-agent mcp add local --cwd /absolute/path --env TOKEN=EXAMPLE_TOKEN -- node server.js --stdio
prime-agent mcp list
prime-agent mcp get remote
prime-agent mcp remove remote
```

作用域与冲突规则（这几条决定了“为什么我在项目里写的 server 没生效”）[@ref-prime-agent-mcp-generic]：

- 带 `--oauth` 添加的 server 走既有 OAuth 登录流程，之后用 `/mcp login NAME` 登录；`--force` 覆盖已有完整条目；
- **项目 `.prime/agent/settings.json` 里的 `mcpServers` 条目在执行时被忽略**，即仓库不能启动本地进程，也不能遮蔽用户级 server；实现层由只读 global 的取用函数保证，注释写明“MCP execution is intentionally restricted to user/global settings”；[@ref-prime-agent-settings-globalonly]
- 内置集成名（`linear`、`notion`）是保留名：`mcp add` 拒绝它们，手写的同名 `mcpServers` 条目被忽略而不是重配内置服务；目录后续新增的服务 id，如果用户先声明了同名 server，则用户条目继续生效并占用该 id。

凭据提供方式取决于传输：HTTP server 可以匿名、用静态 `headers`、用 `bearerTokenEnvVar` 指向的 token，或 `oauth: true` 走登录流程；stdio 的 `env` 只接受对既有环境变量的**带标签引用**，不接受字面量密钥。静态密钥值一律不入设置文件，集成服务的凭据落在 `auth.json`（0600 权限，`{"type":"api_key","key":...}` 或 OAuth 记录）。[@ref-prime-agent-mcp-generic][@ref-prime-agent-mcp-connecting][@ref-prime-agent-providers-authfile]

## Server 定义字段与传输 {#mcp-definition}

运行期字段可以手写进用户设置（文档给出的完整形状）[@ref-prime-agent-mcp-generic]：

```jsonc
{
  "mcpServers": {
    "remote": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "bearerTokenEnvVar": "EXAMPLE_TOKEN",
      "enabledTools": ["search"],
      "disabledTools": ["delete"]
    },
    "local": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/server.js", "--stdio"],
      "cwd": "/absolute/path",
      "env": { "TOKEN": { "env": "EXAMPLE_TOKEN" } },
      "startupTimeoutMs": 20000,
      "callTimeoutMs": 60000
    }
  }
}
```

- **传输只有两种**：`http`（远程，带 URL）与 `stdio`（本地子进程）。stdio 的 `command` 与 `args` 直接执行，不经 shell；`env` 只接受 `{"env": "VAR"}` 形式的既有环境变量引用，运行期传入一小撮环境变量加上这些引用。[@ref-prime-agent-mcp-generic]
- 过滤：`enabledTools` 先应用、`disabledTools` 后应用，发现与派发两个阶段都生效；`enabled: false` 停用整个 server。[@ref-prime-agent-mcp-generic]
- 命名透传：server 名与工具名原样传给 Python，`await mcp.call_tool("remote", "search", {"query": "example"})` 中的名字不做改写。[@ref-prime-agent-mcp-generic][@ref-prime-agent-mcp-call]
- HTTP 认证是四选一：匿名、静态 `headers`、`bearerTokenEnvVar` 指定的 token、或复用既有 OAuth 登录（`oauth: true`，配合 `/mcp login`）。工具集由 **server** 定义，产品不预设名字或参数，因此必须先发现再调用。[@ref-prime-agent-mcp-generic][@ref-prime-agent-mcp-call]

## 连接生命周期 {#mcp-lifecycle}

MCP server 的准入有三条互不相同的路径，先分清是哪一条再排查：通用 HTTP/stdio 连接、目录集成服务的状态机，以及 ACP 会话在 `session/new` 时整批送入 worker 的会话级准入。

- 通用 HTTP/stdio 连接**在第一次使用时**初始化并发现工具，之后由该内核复用；设置变化会在下一次调用时替换连接，`await mcp.reload()` 立即关闭当前全部连接。启动与调用各有独立的超时上限（`startupTimeoutMs`、`callTimeoutMs`），内核关闭时关闭 HTTP 会话并终止 stdio 子进程。[@ref-prime-agent-mcp-generic]
- 目录集成服务的状态机：**Connected** 要求真实完成一次 MCP 握手（initialize + `tools/list`），仅存在 token 永远不算 Connected；握手未成功时状态停在 **Verifying / pending**（连接可用，派发时做实时握手）；凭据被拒（过期且无 refresh token，或绑定到别的 endpoint）为 **Reconnect / error**，重新连接即可修复，失败的校验不会删除已有授权；需要手工准备（developer app、API key、tenant URL、stdio adapter）的卡片显示 **Requires setup**；设置里 `enabled: false` 的服务显示 **Disabled**。[@ref-prime-agent-mcp-states][@ref-prime-agent-mcp-connecting]
- 首次连接成功后，连接在当前会话内即可使用，不需要重启；面板会显示发现的工具数量。[@ref-prime-agent-mcp-connecting]
- 通用 MCP 连接是**内核本地**的：同一个用户设置被两个 Prime Agent 会话引用时，各自持有独立连接。[@ref-prime-agent-mcp-caveats]

**ACP 会话的整批准入**是第三条路径，语义与上面两条都不同：server 列表不是逐个连接的，而是随 `session/new` 一次性送进 worker，之后由这个会话独占。

- 顺序是先校验后准入，而且校验排在任何状态变更之前。列表先过解析与校验，失败按“无效参数”返回并带上具体原因；工具名推导失败则按内部错误返回——两种失败都会把会话状态重置为初始值，请求不会留下半个会话。[@ref-prime-agent-acp-admission-validation-rust] 校验通过后，整张列表连同该会话自己的 owner id 被打包成一次 `ReplaceAcpMcpServers` 命令交给 worker，而不是由本地管理器持有。[@ref-prime-agent-acp-wire-request-call-rust]
- 这次替换走会话级的请求通道：整张列表经 `link.request` 发出[@ref-prime-agent-acp-wire-request-call-rust]，而 `request` 对每个命令施加会话级响应超时[@ref-prime-agent-acp-request-wiring-rust]，该超时固定为 30 秒[@ref-prime-agent-acp-request-timeout-rust]。**替换失败或超时都会进入同一条清理路径**：如果请求带的列表非空，就再发一次“替换为空”的请求把这个 owner 名下的 server 清掉，然后重置会话状态并返回内部错误。清理是尽力而为的——worker 可能已经应用了配置、只是确认丢了，所以先前已应用的 server 不会因为客户端没收到确认而留在准入状态里[@ref-prime-agent-acp-session-new-rust]。
- worker 侧还有两道约束：真正的 agent 引擎持有该会话的 MCP 存储（脚本化的测试引擎退回 worker 级存储），所以准入和 prompt 门控看的是同一份列表；agent 正在跑的时候拒绝替换（不允许在一个 turn 中途换掉 MCP 工具列表）。[@ref-prime-agent-acp-wire-constraints-rust] 同 owner 且列表完全相同时是成功的空操作；被拒绝的替换会先用同一 owner 做一次清空来回滚已部分应用的配置，再把失败上报[@ref-prime-agent-acp-mcp-wire-rust]。
- 释放走同一条“替换为空”的路径：`session/close` 与连接拆除都会在会话确实准入过 server 时发一次，属于会话级收尾而不是复用通用连接那套关闭逻辑。

## 能力面与模型可见范围 {#mcp-capabilities-exposure}

与“单工具设计”一致，MCP 集成**不作为新的 agent 工具暴露**：所有服务都通过内核里预导入的同一个 Python `mcp` 模块访问[@ref-prime-agent-mcp-call][@ref-prime-agent-usage-principles]：

```python
tools = await mcp.list_tools("linear")
result = await mcp.call_tool("linear", "list_issues", {"team": "Engineering"})
```

- 每次调用都是 `async`，必须 `await`；返回已是解析好的 Python 值（结构化输出是 `dict`，文本是字符串，其余是内容块列表）；缺凭据时给出提示用户运行 `/plugins` 的显式错误，工具自身报错则抛 `McpToolError`。[@ref-prime-agent-mcp-call]
- 配置**每次调用重新读取**；`mcp.reload()` 立即关闭所有当前连接。[@ref-prime-agent-mcp-call]
- 模型侧清单按需查询：内核可向宿主索取“支持但未连接”的服务与用户实际连接（`mcp.list_plugins`、`mcp.search_plugins`、`mcp.list_connections`）；完整目录从不注入提示词。推荐“去连接某服务”不会自行安装或开浏览器，连接始终是用户在 `/plugins` 里的显式动作。[@ref-prime-agent-mcp-inventory]
- 可见性控制只有 `enabled`、`enabledTools`、`disabledTools`；固定来源没有描述按工具名的权限审批或信任提示流程（工具名与参数模式的唯一把关点是 server 自己声明的 schema）。[@ref-prime-agent-mcp-generic][@ref-prime-agent-mcp-call]
- 早先按服务发布的 Python 包装包（`import linear`、`import notion`）与 `rlm.McpIntegration` 授权 API 已移除：现在每个服务都走同一条通用 `mcp` 路由，新增服务属于目录数据而不是代码；旧凭据 `mcp:linear`、`mcp:notion` 继续可用。[@ref-prime-agent-mcp-migration]

**缺口**：固定来源只说明 tools 的发现与调用；对 MCP 的 resources、prompts、sampling、roots 等能力没有任何说明或配置字段，因此这三类能力是否可用未获证实，不能由 tools 的结论外推。[@ref-prime-agent-mcp-call]

## 诊断 {#mcp-diagnostics}

分层排查顺序（对应“配置是否被读取 → 是否连上 → 工具是否可见 → 调用是否成功”）[@ref-prime-agent-mcp-connecting][@ref-prime-agent-mcp-generic][@ref-prime-agent-mcp-states]：

1. **配置被读取**：`prime-agent mcp list` / `prime-agent mcp get NAME` 显示用户设置里的 server 条目；目录服务的记录在 `~/.prime/agent/mcp-connections.json`，可直接查看 connectionId 与绑定 endpoint。
2. **连接已建立**：`/plugins` 或裸 `/mcp` 的卡片给出状态（Connect / Connected / Reconnect / Verifying / Requires setup / Disabled）；只有真实握手通过才会显示 Connected，卡片上的工具数量是握手结果。`/mcp login NAME` 与 `/mcp logout NAME` 用于目录连接的登录与登出。
3. **工具可见**：`await mcp.list_tools("NAME")` 打印名称与描述——工具集由 server 决定，必须以这次发现为准，不要凭服务文档猜测名字或参数。
4. **调用成功**：`await mcp.call_tool("NAME", "TOOL", { ... })`；工具自己返回错误会抛 `McpToolError`，缺凭据的错误信息会提示去 `/plugins` 连接。

其它已知限制[@ref-prime-agent-mcp-caveats]：token 存在不等于连接就绪；通用连接按内核隔离，多会话不共享；自定义 `PRIME_AGENT_KERNEL_PYTHON` 的解释器必须自带当前 `prime-agent-runtime` 依赖，否则内核起不来，MCP 也无从连接。
