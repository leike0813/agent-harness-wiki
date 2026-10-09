---
schema_version: 3
record_kind: production
edition_id: crush-cli-mcp-v4
harness_id: crush
topic: mcp
title: "Crush 的 MCP：配置、传输、认证、生命周期与暴露"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-crush-readme-mcp, ref-crush-configdoc-mcp-add, ref-crush-schema-mcp]
  - section_id: mcp-entry-definition
    surface_ids: [cli]
    source_refs: [ref-crush-schema-mcp, ref-crush-configdoc-mcp-add, ref-crush-code-config-merge, ref-crush-code-mcp-builtin, ref-crush-schema-root, ref-crush-code-mcp-struct, ref-crush-code-mcp-timeout, ref-crush-code-mcp-resolved, ref-crush-readme-mcp, ref-crush-code-store-field, ref-crush-code-mcp-disable, ref-crush-code-scope, ref-crush-code-mcp-local-toggle, ref-crush-code-mcp-override-presence, ref-crush-code-mcp-workspace-toggle, ref-crush-code-mcp-toggle-apply]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-crush-code-mcp-transport, ref-crush-readme-mcp, ref-crush-code-mcp-timeout, ref-crush-code-mcp-client, ref-crush-code-mcp-ping, ref-crush-code-mcp-resolved, ref-crush-readme-mcp-sessionless]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-crush-readme-mcp-oauth, ref-crush-readme-mcp-prereg, ref-crush-code-mcp-oauth, ref-crush-code-mcp-sse-oauth, ref-crush-code-mcp-struct, ref-crush-code-mcp-transport]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-crush-code-mcp-initialize, ref-crush-code-mcp-budget, ref-crush-code-mcp-states, ref-crush-code-mcp-client, ref-crush-code-mcp-ping, ref-crush-code-mcp-reconcile, ref-crush-code-mcp-reinit, ref-crush-code-mcp-local-disabled-init, ref-crush-code-mcp-start-local-disabled, ref-crush-code-mcp-local-toggle, ref-crush-code-mcp-override-presence, ref-crush-code-mcp-workspace-toggle]
  - section_id: mcp-capabilities-exposure
    surface_ids: [cli]
    source_refs: [ref-crush-code-mcp-tool-list, ref-crush-code-mcp-resources, ref-crush-code-mcp-prompts, ref-crush-code-mcp-tool-mount, ref-crush-code-build-tools, ref-crush-code-agent-setup, ref-crush-code-permission-request, ref-crush-code-mcp-struct, ref-crush-code-mcp-states, ref-crush-code-cli-flags]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-mcp-states, ref-crush-code-info-mcp, ref-crush-code-mcp-auth, ref-crush-readme-logging, ref-crush-code-mcp-initialize, ref-crush-code-mcp-ping, ref-crush-code-mcp-client, ref-crush-code-mcp-resources, ref-crush-code-mcp-toggle-status, ref-crush-code-mcp-toggle-item-state, ref-crush-code-mcp-toggle-apply]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-crush-schema-mcp, ref-crush-configdoc-mcp-add, ref-crush-code-config-merge, ref-crush-code-mcp-builtin, ref-crush-code-store-field, ref-crush-code-mcp-disable, ref-crush-code-scope, ref-crush-code-mcp-local-toggle, ref-crush-code-mcp-override-presence, ref-crush-code-mcp-workspace-toggle]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-crush-code-mcp-struct, ref-crush-code-mcp-builtin, ref-crush-code-mcp-resolved, ref-crush-configdoc-mcp-add]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-crush-code-mcp-transport, ref-crush-readme-mcp, ref-crush-code-mcp-timeout, ref-crush-code-mcp-resolved, ref-crush-readme-mcp-sessionless, ref-crush-code-mcp-ping]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs: [ref-crush-readme-mcp-oauth, ref-crush-readme-mcp-prereg, ref-crush-code-mcp-oauth, ref-crush-code-mcp-sse-oauth, ref-crush-code-mcp-struct]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-crush-code-mcp-initialize, ref-crush-code-mcp-budget, ref-crush-code-mcp-states, ref-crush-code-mcp-reconcile, ref-crush-code-mcp-reinit, ref-crush-code-mcp-client, ref-crush-code-mcp-ping, ref-crush-code-mcp-local-disabled-init, ref-crush-code-mcp-start-local-disabled, ref-crush-code-mcp-local-toggle, ref-crush-code-mcp-override-presence, ref-crush-code-mcp-workspace-toggle]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-crush-code-mcp-tool-list, ref-crush-code-mcp-resources, ref-crush-code-mcp-prompts, ref-crush-code-mcp-tool-mount]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-crush-code-mcp-tool-mount, ref-crush-code-build-tools, ref-crush-code-agent-setup, ref-crush-code-permission-request]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-crush-code-mcp-states, ref-crush-code-info-mcp, ref-crush-code-mcp-auth, ref-crush-readme-logging, ref-crush-code-mcp-ping, ref-crush-code-mcp-client, ref-crush-code-mcp-resources, ref-crush-code-mcp-toggle-status, ref-crush-code-mcp-toggle-item-state]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与界面 {#mcp-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出：README 的 MCPs、MCP OAuth 与 Sessionless servers 三节，`docs/config/README.md` 的 `mcp add` 命令参考，`schema.json` 的 `MCPConfig` 定义，以及 `internal/config/config.go`、`internal/config/mcp.go`、`internal/shellconfig/mcp.go`、`internal/agent/tools/mcp*` 的实现。其中 `internal/agent/tools/mcp/init.go` 的十处引用改按 commit `011a9416c0624341420f9dc8787680308f45b994` 定位（只保存 commit、仓库相对路径与内容 hash，不保留 checkout），全局/局部开关与授权流程的新增定位也按该提交；其余文件仍属更早的 commit。界面口径为 catalog 唯一登记的 `cli`。[@ref-crush-readme-mcp][@ref-crush-configdoc-mcp-add][@ref-crush-schema-mcp]

Crush 只说“支持三种传输”：`stdio`、`http`、`sse` [@ref-crush-readme-mcp]。

## 配置入口与 Server 定义字段 {#mcp-entry-definition}

MCP server 定义在普通配置里，因此继承整套合并规则（全局用户配置、项目配置、工作区数据配置按优先级合并）：`crush.json` 的顶层 `mcp` 对象，或在 `crushrc` 里用 `mcp add` 内建命令写入 [@ref-crush-schema-mcp][@ref-crush-configdoc-mcp-add][@ref-crush-code-config-merge]。`mcp add` 后跟 server 名的定义与更新是同一操作，重复调用同名即更新；`mcp remove`/`rm` 删除 [@ref-crush-code-mcp-builtin]。`schema.json` 的顶层键是权威字段表：`mcp` 是名字到 `MCPConfig` 的映射。[@ref-crush-schema-root]

`MCPConfig` 的第一方字段（JSON 名 / `crushrc` 旗标）[@ref-crush-code-mcp-struct][@ref-crush-code-mcp-builtin][@ref-crush-configdoc-mcp-add]：

| 字段 | 类型 | 默认 | 用途与解析 |
| :-- | :-- | :-- | :-- |
| `type` | `stdio`/`sse`/`http` | `stdio` | 传输类型，必填（`crushrc` 未给时写 `stdio`） |
| `command` | string | 无 | `stdio` 的可执行文件；经变量解析后不能为空，否则报 `mcp stdio config requires a non-empty 'command' field` |
| `args` | string[] | 无 | `--args` 可重复；每个元素独立做变量展开，解析失败会带上位置索引报错 |
| `env` | map | 无 | `--env KEY VALUE` 可重复；值展开后拼成 `KEY=VALUE` 传给子进程，**空值保留**（`FOO=` 是合法请求） |
| `url` | string | 无 | `http`/`sse` 的端点，展开后不能为空 |
| `headers` | map | 无 | `--header KEY VALUE` 可重复，仅用于 `http`/`sse`；值在启动时展开，**解析为空串的 header 会被丢弃**，不会发出空 header |
| `disabled` | bool | false | 不删除定义但跳过启动 |
| `disabled_tools` | string[] | 无 | 该 server 内部要隐藏的工具名（按 server 自己的工具名，不带 `mcp_` 前缀） |
| `enabled_tools` | string[] | 无 | 白名单；非空时只保留列出的工具，之后再应用 `disabled_tools` |
| `timeout` | int（秒） | 显式值优先；OAuth 流程 30 秒、其它 10 秒 [@ref-crush-code-mcp-timeout] | 连接与初始化的超时 |
| `sessionless` | bool | 未设置时按 URL 自动判定 | 标记不维护 MCP 会话的 server |
| `oauth` | bool | false | 仅 `http`/`sse` 有效，开启 OAuth 2.1 |
| `oauth_client_id` / `oauth_client_secret` | string | 无 | 预注册客户端凭据，值支持变量展开 |
| `oauth_callback_port` | int | 无 | 固定回调端口 |
| `channel_enabled` | bool | false | 等价于命令行 `--channels` 后跟 server 名，把该 server 当作 channel |

变量展开的边界条件：`env`、`args`、`url`、`headers`、`oauth_client_id`、`oauth_client_secret` 都会展开；任一处解析失败会让该 server 的启动带上明确错误，而不是带着空凭据启动 [@ref-crush-code-mcp-resolved]。

一个 `crushrc` 里的最小 stdio 与 HTTP 两条定义（语法逐字来自 `mcp add` 的旗标表与 README 示例）[@ref-crush-configdoc-mcp-add][@ref-crush-readme-mcp]：

```bash
# 本地 stdio server
mcp add filesystem --command node --args /path/to/mcp-server.js \
  --timeout 10 --env NODE_ENV production

# 远程 HTTP server，token 只出现在环境变量里
mcp add github --type http --url https://api.githubcopilot.com/mcp/ \
  --header Authorization "Bearer $GH_PAT" \
  --disabled-tools create_issue
```

运行期开关有两条作用域，写入位置不同：

- **全局开关**把该 server 条目的 `disabled` 字段写进全局配置文件（键路径是 `mcp` 段下的 server 名再取 `disabled`），写完后触发一次配置变更通知；`SetMCPServerDisabledConfig` 在名字不存在时直接报错，避免写出只有 `disabled` 的空条目。[@ref-crush-code-store-field][@ref-crush-code-mcp-disable][@ref-crush-code-scope]
- **局部（仓库级）开关**写数据库里的仓库覆盖记录，不碰任何配置文件：`MCPSetServerDisabled` 先落覆盖，再把同一状态应用到运行中的 client（`SetLocalDisabled`）。[@ref-crush-code-mcp-workspace-toggle][@ref-crush-code-mcp-local-toggle]

两者的优先级是显式的：只要该 server 存在仓库级覆盖（无论覆盖成启用还是禁用），全局开关就只写配置、不再改动运行态，由 `SetConfigDisabled` 的 `localOverride` 参数短路掉那一步；调用前用 `HasMCPOverride` 查询覆盖是否存在（同时查 disabled 与 enabled 两个列表）。因此“全局改了 disabled 但界面上的启停状态没变”在这个版本里是设计行为，不是失败。[@ref-crush-code-mcp-local-toggle][@ref-crush-code-mcp-override-presence]

## 传输、启动与环境 {#mcp-transport}

`createTransport` 按 `type` 分支构造 [@ref-crush-code-mcp-transport]：

- `stdio`：用 `exec.CommandContext` 启动 `command` + `args`，环境是当前进程环境加上解析后的 `env`；子进程被放进独立进程组，会话结束时整组回收（注释说明：否则子进程的子进程会被孤儿化并累积成僵尸进程）。
- `http`：Go SDK 的 streamable HTTP 客户端指向 `url`；未开 OAuth 时用一个自定义 RoundTripper 注入 `headers`；开了 OAuth 时改为挂载 OAuth handler。
- `sse`：Go SDK 的 SSE 客户端；因为 SSE 传输不原生支持 SDK 的 OAuthHandler，Crush 自己包了一层 RoundTripper 来注入 bearer token 并处理 401 触发的授权流程。
- 其它 `type` 直接报 `unsupported mcp type`。

三种传输的对照（配置字段与适用条件）[@ref-crush-code-mcp-transport][@ref-crush-readme-mcp]：

| 传输 | 必填字段 | 启动方式 | 适用范围 |
| :-- | :-- | :-- | :-- |
| `stdio` | `command`（`args`、`env` 可选） | 宿主启动子进程，用标准输入输出通信 | 本地 server；子进程按进程组回收 |
| `http` | `url`（`headers` 可选） | 宿主作为 HTTP 客户端连接远端 streamable 端点 | 远端服务；支持 OAuth 与会话标记 |
| `sse` | `url`（`headers` 可选） | 宿主建立 SSE 长连接 | 旧式远端服务；OAuth 由宿主自建 RoundTripper 支持 |

会话与超时 [@ref-crush-code-mcp-timeout][@ref-crush-code-mcp-client][@ref-crush-code-mcp-ping]：

- 每个 server 一个 `ClientSession`，第一次需要工具时按需建立。
- 续用前会做一次 ping；判定的不是“ping 有没有报错”，而是“这个 server 是不是真的不可用”——服务端对 `ping` 回 JSON-RPC `MethodNotFound`，被当作“它应答了，只是不实现 ping”，按探测通过处理。探测失败或会话失效则重建连接，重建过程按 server 名加锁、带“代次（generation）”校验，避免并发重建把旧会话写回状态。
- 超时来自 `timeout`（秒）：显式值优先，未设置时 OAuth 流程给 30 秒（留出浏览器授权时间），其它情况 10 秒；`InitWaitBudget` 与它不同，是消息轮次等待初始化的上限 [@ref-crush-code-mcp-timeout]。错误会被改写成带超时上下文的可读信息，stdio 错误另有专门包装，便于区分“命令起不来”和“握手超时”。
- URL 以 `/mcp` 结尾的已知无会话 server（GitHub 的两条 endpoint）会自动标记为 sessionless：Crush 跳过会引发 404 的 list-changed 订阅流，代价是拿不到实时列表变更通知；也可以用 `sessionless` 显式打开或关闭自动判定。[@ref-crush-code-mcp-resolved][@ref-crush-readme-mcp-sessionless]

## 认证与凭据 {#mcp-auth}

三条路径 [@ref-crush-readme-mcp-oauth][@ref-crush-readme-mcp-prereg][@ref-crush-code-mcp-oauth][@ref-crush-code-mcp-sse-oauth]：

1. **静态 header**：`headers` 里放 `Authorization` 之类的值，常见写法是引用环境变量；解析为空串时该 header 不发送，因此“变量没设就不带凭据”是安全默认。
2. **OAuth 2.1（动态注册）**：`oauth: true`（仅 `http`/`sse`）时 Crush 走授权码流程并自动尝试动态客户端注册（RFC 7591 语义，README 点名 Linear、Notion），浏览器完成授权后令牌自动落盘。
3. **OAuth + 预注册客户端**：`oauth_client_id`（配合 `oauth_client_secret`）用于不支持动态注册的服务（GitHub、Slack）；给了 client id 就跳过动态注册；`oauth_callback_port` 用于强制 exact-match 回调地址的服务。

令牌持久化：OAuth handler 每次交换或刷新都会把 token 写回配置里该 server 条目的 `oauth_token` 字段（作用域为全局数据配置），token 同时包含刷新所需的客户端注册信息；失败只记 warning，不影响会话继续 [@ref-crush-code-mcp-oauth]。加载时会清理只含 token、没有 command/url/type 的孤儿条目 [@ref-crush-code-mcp-struct]。SSE 路径用自定义 RoundTripper 注入 bearer token 并在 401 时触发授权；HTTP 路径把 handler 交给 SDK [@ref-crush-code-mcp-sse-oauth][@ref-crush-code-mcp-transport]。

缺口：固定来源没有说明令牌刷新失败后的重试节奏、多进程并发刷新时的冲突处理，也没有给出凭据的加密存储约定（token 就是配置文件里的字段）。[@ref-crush-code-mcp-oauth]

## 生命周期 {#mcp-lifecycle}

启动：`Initialize` 遍历当前配置里的所有 server，先查 `localDisabled`（仓库级禁用覆盖）：命中的直接写 `disabled` 状态并跳过，日志为 `Skipping MCP disabled for this repository`；再查配置里的 `disabled`：命中的同样只写状态并跳过，除非被 `forceStart` 明确要求启动（仓库级“启用覆盖”）；其余并发启动。两个列表都由 `app.New` 在启动时从会话表读出后传入，读失败只记一条 warn 并按“无覆盖”继续启动。[@ref-crush-code-mcp-initialize][@ref-crush-code-mcp-local-disabled-init][@ref-crush-code-mcp-start-local-disabled]启动整体由一个一次性信号收尾，消息轮次最多等 `InitWaitBudget`（10 秒）就继续，未完成的 server 会在后续轮次补上，避免一个卡住的握手把整个应用拖住。[@ref-crush-code-mcp-initialize][@ref-crush-code-mcp-budget]

状态机是 `disabled → starting → connected | error | needs auth`，每个 server 的 `ClientInfo` 记录状态、错误、工具/提示/资源计数、连接时间，以及“上次成功连接时用的配置”和“正在连接中的配置”。[@ref-crush-code-mcp-states]

重连与会话续用：需要某个 server 的工具时先取现成会话并做一次连通性探测，探测通过的现成会话直接返回，不再走重建。探测按“能不能用”判定而不是按“ping 有没有报错”判定：服务端回 JSON-RPC `MethodNotFound` 表示它应答了、只是没实现 `ping`，因此按通过处理，不实现 ping 的 server 不会被判失败，也不会每次取工具都被拆除重建。探测返回其它错误（连接断开、会话已关闭、探测超时）仍判失败，走拆除加重建的路径；重建按 server 名串行化并用代次编号作废旧尝试，避免并发重建把旧会话写回状态。（重复的连接池与缓存策略在固定来源里没有更多约定。）[@ref-crush-code-mcp-client][@ref-crush-code-mcp-ping]

配置变更后会做一次协调：`reconcile` 把运行态和当前配置求差——从配置里消失的整段拆除；被标为 `disabled` 的转入禁用态；配置变了的 `connected` server 重启；`starting` 的 server 只有在其在连配置与最新配置不一致时才重启；新建、报错、待授权、禁用的条目都重新启动（重试失败 server 是期望的恢复路径）。协调是单飞（single-flight）的，过程中到来的写操作只置一个 dirty 标记，本轮跑完再补一次，避免一连串写入引发重复启动。[@ref-crush-code-mcp-reconcile][@ref-crush-code-mcp-reinit]

运行中切换开关：局部开关与全局开关在有覆盖时的行为不同。局部开关总是落到运行态（禁用即拆除连接，启用即强制启动，即使配置里是 `disabled`）；全局开关在没有覆盖时同样落到运行态，有覆盖时只写配置。这段“写配置”与“应用运行态”的拆分由 `SetConfigDisabled` 与新拆出的 `SetLocalDisabled` 两层函数承担，后者注释明确写着“持久化覆盖是调用方的事”。[@ref-crush-code-mcp-local-toggle][@ref-crush-code-mcp-workspace-toggle][@ref-crush-code-mcp-override-presence]

没有自动重连退避：失败会停在 `error` 状态，靠下一次配置写入或显式重试重新启动。[@ref-crush-code-mcp-reconcile]

## 能力发现与对模型的暴露 {#mcp-capabilities-exposure}

三类能力分别处理 [@ref-crush-code-mcp-tool-list][@ref-crush-code-mcp-resources][@ref-crush-code-mcp-prompts]：

- **Tools**：连接后无条件调用 `ListTools`（注释说明 `InitializeResult.Capabilities.Tools` 可能是空对象，不能据此判断“没有工具”）；结果先按 `enabled_tools` 白名单过滤，再按 `disabled_tools` 黑名单过滤，两条都为空时全量保留；过滤后为空则不注册任何工具。
- **Resources**：连接后按 capability 判定后列资源；对不支持该方法的 server（method not found）静默降级；还提供 `list_mcp_resources` 与 `read_mcp_resource` 两个宿主工具用于按需列出与读取。
- **Prompts**：只有在 `Capabilities.Prompts` 非空时才 `ListPrompts`；提示作为命令面板条目出现（`LoadMCPPrompts`），取回时只保留 role 为 user 的文本消息。

暴露给模型的工具名由 `mcp_` 前缀、server 名与 server 侧工具名三段下划线拼成：宿主把每个 MCP 工具包装成一个普通 agent 工具，名字由 server 名与 server 侧工具名拼成，另提供 `MCP()`/`MCPToolName()` 供上层做白名单判断 [@ref-crush-code-mcp-tool-mount][@ref-crush-code-mcp-prompts]。

访问控制叠加在创建 agent 的工具集时 [@ref-crush-code-build-tools][@ref-crush-code-agent-setup]：

- 工作区配置里 `mcp` 为空时，连 `list_mcp_resources`/`read_mcp_resource` 都不加入工具集。
- 每个 agent 有自己的 MCP 白名单：coder 的 `AllowedMCP` 为 nil（不限制，全部 MCP 工具可用），task 与 plan 的 `AllowedMCP` 为空 map（一个 MCP 工具都不给）。
- 普通工具先按 agent 的 `AllowedTools` 过滤，再拼上 MCP 工具；MCP 工具的调用同样要过权限系统（把完整 MCP 工具名加进 `permissions allow` 即可免询问；Docker MCP 的几个工具在代码里有内置免询问白名单）。[@ref-crush-code-permission-request][@ref-crush-code-mcp-tool-mount]

缺口：没有按 server 级别“整体拒绝但保持可见”的中间态；`disabled_tools`/`enabled_tools` 用的是 server 侧工具名，宿主前缀只出现在权限与展示层，命名不一致时容易配错 —— 这一点文档没有提醒。[@ref-crush-code-mcp-tool-list][@ref-crush-code-mcp-tool-mount]

**Channel（把 MCP server 当消息通道）**：一个 server 若声明了 channel 能力，可以通过启动参数 `--channels`（隐藏旗标）或配置里的 `channel_enabled: true` 被 opt-in；此时该 server 的推送会渲染成一条带 channel 语义标签的消息注入会话，其运行态在 `ClientInfo.Channel` 上有标记。配置里还可以用 `channel_reply` 描述“如何把本回合最终回答发回该 channel”：`user` 与 `group` 两条路由分别指定要调用的 server 侧工具名与目标参数名，`message_param` 指定承载回复文本的参数（默认 `message`），`target_meta` 指定从推送元数据里取目标的属性（默认分别是 `sender` 与 `group`），`suppress_tools` 用来声明“模型已经自己发过消息时不要再自动回复”。channel 事件在订阅层被单独隔离，避免跨工作区串消息。[@ref-crush-code-mcp-struct][@ref-crush-code-mcp-states][@ref-crush-code-cli-flags]

## 诊断 {#mcp-diagnostics}

- 运行态：每个 server 的状态与计数保存在进程内的状态表里，`crush_info` 的 `[mcp]` 小节逐条打印 `connected (N tools, M resources) since HH:MM:SS`、`error: ...`、`needs auth`、`starting`、`disabled`；配置里存在但从未启动的 server 落在 `[mcp_configured]`，值为 `not_started` 或 `disabled`。[@ref-crush-code-mcp-states][@ref-crush-code-info-mcp]
- 需要授权的 server 有专门的授权入口：列出待授权 server、拿授权 URL、发起授权并等待完成，成功后状态转为 `connected`；启动阶段的自动授权默认被抑制，交互式授权只在用户主动触发时允许。[@ref-crush-code-mcp-auth]
- 日志：初始化开始/结束（含总耗时）、跳过禁用 server、启动失败、配置变更导致的重新初始化、工具/提示/资源列表刷新失败等都会写日志；`crush logs --follow` 或 `--debug` 可直接看。[@ref-crush-readme-logging][@ref-crush-code-mcp-initialize]
- 一次失败不会留下“半连接”：`updateState` 在非成功状态会清掉工具/资源/提示列表，所以看到 `error` 时工具列表也确实为空，不会出现“状态报错但工具还在用旧会话”的假象。[@ref-crush-code-mcp-states]
- 开关界面显示的语义分两层：局部视角下条目状态由 `localDisabled()` 决定（本地覆盖禁用，或配置禁用且没有仓库级启用覆盖）；全局视角下先看配置的 `disabled` 字段，但只要存在仓库级禁用覆盖就显示 `enabled` —— 注释说明这是因为“活连接反映的是优先级更高的局部覆盖，而全局设置本身仍是启用的”。所以全局列表里的 `enabled` 不等于这个仓库里它正在跑。[@ref-crush-code-mcp-toggle-status][@ref-crush-code-mcp-toggle-item-state]
- 界面提交路径：局部开关直接走 `MCPSetServerDisabled`，全局开关走 `MCPSetServerConfigDisabled`（内部先查覆盖再决定是否应用运行态）；两者成功各回一条信息提示，失败变成错误 toast。局部启用会把条目状态乐观地置为 `starting`，不用等连接状态事件。[@ref-crush-code-mcp-toggle-apply][@ref-crush-code-mcp-workspace-toggle]
- 探测本身不制造假故障：健康探测用的 `ping` 把 JSON-RPC `MethodNotFound` 当作通过，所以一个没实现 ping 的 server 不会仅仅因为被探测就翻成 `error`、也不会连带被清空工具列表。`error` 仍然只来自真实的探测失败与连接失败，与 resources 遇到 method not found 时的静默降级是同一种取舍：不实现的可选方法不算不可用。[@ref-crush-code-mcp-ping][@ref-crush-code-mcp-client][@ref-crush-code-mcp-resources]
