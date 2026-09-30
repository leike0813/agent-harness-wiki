---
schema_version: 3
record_kind: production
edition_id: deep-agents-cli-mcp-v1
harness_id: deep-agents
topic: mcp
title: "Deep Agents CLI 的 MCP：配置入口、传输与 OAuth、信任门控、工具暴露与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-deep-agents-mcp-entry-paths, ref-deep-agents-mcp-entry-discovery, ref-deep-agents-mcp-definition-fields, ref-deep-agents-mcp-definition-env, ref-deep-agents-mcp-transport-build, ref-deep-agents-mcp-doc-discovery, ref-deep-agents-mcp-doc-format, ref-deep-agents-mcp-doc-flags, ref-deep-agents-mcp-doc-home]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-deep-agents-mcp-transport-resolve, ref-deep-agents-mcp-transport-build, ref-deep-agents-mcp-auth-store, ref-deep-agents-mcp-doc-oauth, ref-deep-agents-mcp-doc-format]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-deep-agents-mcp-lifecycle-preflight, ref-deep-agents-mcp-lifecycle-status, ref-deep-agents-mcp-lifecycle-status-invariant, ref-deep-agents-mcp-lifecycle-disabled, ref-deep-agents-mcp-lifecycle-trust, ref-deep-agents-mcp-lifecycle-retry, ref-deep-agents-mcp-doc-trust, ref-deep-agents-mcp-doc-status, ref-deep-agents-mcp-doc-home]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-deep-agents-mcp-capability-tools, ref-deep-agents-mcp-exposure-naming, ref-deep-agents-mcp-exposure-filter, ref-deep-agents-mcp-exposure-readonly, ref-deep-agents-mcp-exposure-middleware, ref-deep-agents-mcp-exposure-normalize, ref-deep-agents-mcp-diag-timeout, ref-deep-agents-mcp-doc-filter]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-deep-agents-mcp-diag-cli, ref-deep-agents-mcp-doc-cmds, ref-deep-agents-mcp-doc-status, ref-deep-agents-mcp-doc-flags]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-deep-agents-mcp-entry-paths, ref-deep-agents-mcp-entry-discovery, ref-deep-agents-mcp-doc-discovery, ref-deep-agents-mcp-doc-flags, ref-deep-agents-mcp-doc-home]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-deep-agents-mcp-definition-fields, ref-deep-agents-mcp-definition-env, ref-deep-agents-mcp-transport-build, ref-deep-agents-mcp-doc-format]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-deep-agents-mcp-transport-resolve, ref-deep-agents-mcp-transport-build, ref-deep-agents-mcp-doc-format]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-deep-agents-mcp-auth-store, ref-deep-agents-mcp-doc-oauth]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-deep-agents-mcp-lifecycle-preflight, ref-deep-agents-mcp-lifecycle-status, ref-deep-agents-mcp-lifecycle-status-invariant, ref-deep-agents-mcp-lifecycle-disabled, ref-deep-agents-mcp-lifecycle-trust, ref-deep-agents-mcp-lifecycle-retry, ref-deep-agents-mcp-doc-trust, ref-deep-agents-mcp-doc-status]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: partial
        source_refs: [ref-deep-agents-mcp-capability-tools]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-deep-agents-mcp-exposure-naming, ref-deep-agents-mcp-exposure-filter, ref-deep-agents-mcp-exposure-readonly, ref-deep-agents-mcp-exposure-middleware, ref-deep-agents-mcp-exposure-normalize, ref-deep-agents-mcp-diag-timeout, ref-deep-agents-mcp-doc-filter]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-deep-agents-mcp-diag-cli, ref-deep-agents-mcp-doc-cmds, ref-deep-agents-mcp-doc-status, ref-deep-agents-mcp-doc-flags]
---

## 配置入口、发现顺序与 Server 定义 {#mcp-entry}

注：catalog 为该 surface 登记的参考页是 Deep Agents overview（`https://docs.langchain.com/oss/python/deepagents/overview`），该页描述 Python SDK 的 `create_deep_agent`，不描述 CLI；本页因此改用官方 CLI 文档树与固定提交的 `libs/code` 源码作为固定来源。

MCP server 定义写在 JSON 文件顶层的 `mcpServers` 对象里：每个键是 server 名，值是该 server 的定义对象 [@ref-deep-agents-mcp-doc-format]。dcode 启动时会自动发现配置文件，不需要任何 flag [@ref-deep-agents-mcp-doc-discovery]。

自动发现按优先级从低到高三处，恰好对应代码里的发现路径常量 `MCP_CONFIG_DISCOVERY_PATHS` [@ref-deep-agents-mcp-entry-paths]：

| 优先级 | 路径 | 作用域 |
|---|---|---|
| 1（最低） | `~/.deepagents/.mcp.json` | 用户级，对机器上所有项目生效 |
| 2 | `项目根/.deepagents/.mcp.json` | 项目级，放在隐藏子目录 |
| 3（最高） | `项目根/.mcp.json` | 项目级，仓库根，兼容 Claude Code |

用户级路径由不可变的 profile 根决定：`DEEPAGENTS_HOME` 改变时整个用户 profile（含 `.mcp.json`）随之移动，因此它必须来自继承的 shell 环境，不能由项目 `.env` 设置 [@ref-deep-agents-mcp-doc-home]。

项目根取最近的包含 `.git` 的父目录，找不到则回退到当前工作目录 [@ref-deep-agents-mcp-doc-discovery]。三类条目在代码里被分别标记为用户作用域或项目作用域（`MCPConfigScope`），这个来源标记决定后面是否需要项目信任 [@ref-deep-agents-mcp-entry-paths]。

`discover_mcp_config_sources` 逐个 `stat` 候选文件，只保留存在的，并返回 `DiscoveredMCPConfig(path, scope, project_root)` [@ref-deep-agents-mcp-entry-discovery]。同一文件被两个来源同时发现时（例如 `DEEPAGENTS_HOME` 指到项目内），它会被降级为项目作用域，从而不再享受用户级信任；无法判定两个路径是否是同一文件时也会保守降级 [@ref-deep-agents-mcp-entry-discovery]。

多份配置按 server 名合并：不同名的 server 都保留；同名时高优先级文件的定义**整对象替换**低优先级的定义，不做字段级深合并 [@ref-deep-agents-mcp-doc-discovery]。因此可以在项目里整体覆盖用户级的同名 server（例如固定另一个版本），而不影响其他项目 [@ref-deep-agents-mcp-doc-discovery]。

运行期叠加与关闭由两个互斥的启动开关控制：`--mcp-config PATH` 把指定文件作为最高优先级来源合并到自动发现结果之上；`--no-mcp` 则完全不加载任何 MCP server [@ref-deep-agents-mcp-doc-flags]。

**定义的第一方字段。** stdio（默认）条目必填 `command`，可选 `args`（字符串列表）与 `env`（对象）；远程条目必填 `url`，`type` 取 `sse` 或 `http`，可选 `headers`（对象）[@ref-deep-agents-mcp-doc-format]。两条路径互斥：远程条目不得再声明 `command`，stdio 条目不得声明 `url` [@ref-deep-agents-mcp-definition-fields]。stdio 的工作目录 `cwd` 由 FastMCP 的 stdio 模型接受，条目未配置时回落到会话目录 [@ref-deep-agents-mcp-transport-build]。

**校验规则。** server 名必须匹配 `^[A-Za-z0-9_-]+$`，因为它会被当作 OAuth token 文件名的一部分 [@ref-deep-agents-mcp-definition-fields]。`args` 必须是列表，`env` 必须是对象且值必须是字符串，`headers` 必须是字符串到字符串的对象 [@ref-deep-agents-mcp-definition-fields]。`auth` 只允许字面量 `"oauth"`，只对 http/sse 有效，且不能与 `Authorization` 头并用 [@ref-deep-agents-mcp-definition-fields]。`allowedTools` 与 `disabledTools` 不能同时出现，也不能是空列表 [@ref-deep-agents-mcp-definition-fields]。

**变量展开。** `command`、`args`、`env`、`url`、`headers` 里的字符串支持 `${VAR}` 与 `${VAR:-default}` 两种引用；`:-` 形式在变量未设置**或为空**时取默认值（POSIX `:-` 语义）[@ref-deep-agents-mcp-definition-env][@ref-deep-agents-mcp-doc-format]。裸 `$VAR` 与单独的 `$` 不展开，不成的 `${` 会被判为畸形引用并报错 [@ref-deep-agents-mcp-definition-env]。

展开发生在 server **激活时**而不是加载时，所以一个未设置的变量只会让它自己的 server 失败，不会隐藏同文件里的其他条目 [@ref-deep-agents-mcp-definition-fields]。字符串以外的字段（布尔、数字、列表元素类型）由加载期校验负责 [@ref-deep-agents-mcp-definition-fields]。

下面这段最小配置依据官方文档 `mcp-tools.md` 的 “Configuration format” 小节：用户级文件对所有项目生效，`env`、`args`、`headers` 里的引用按上面的规则展开 [@ref-deep-agents-mcp-doc-format]：

```json title="~/.deepagents/.mcp.json"
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "env": { "LOG_LEVEL": "${MCP_LOG_LEVEL:-info}" }
    },
    "remote-api": {
      "type": "http",
      "url": "https://api.example.com/mcp",
      "headers": { "Authorization": "Bearer $EXAMPLE_MCP_TOKEN" }
    }
  }
}
```

## 传输、凭据与 OAuth 登录 {#mcp-transport}

支持三种传输 [@ref-deep-agents-mcp-transport-resolve][@ref-deep-agents-mcp-doc-format]：

| 传输 | 连接方式 | 必填字段 | 适用条件 |
|---|---|---|---|
| `stdio` | 作为子进程启动，走 stdin/stdout | `command` | 本地可执行文件；默认类型 |
| `sse` | Server-Sent Events | `type: "sse"`、`url` | 远程端点 |
| `http` | streamable HTTP | `type: "http"`、`url` | 远程端点 |

传输类型可写 `type` 或 `transport` 两个键；`streamable_http`、`streamable-http` 是 `http` 的别名，便于从上游文档直接粘贴 [@ref-deep-agents-mcp-transport-resolve]。未显式写类型时：条目带 `url` 就当作远程（默认 `http`），没有 `url` 就当作 stdio [@ref-deep-agents-mcp-transport-resolve]。

dcode 把条目交给 FastMCP 自己的 server 模型（`StdioMCPServer`/`RemoteMCPServer`）校验并调用 `to_transport()` 生成传输 [@ref-deep-agents-mcp-transport-build]。只有在配置里显式写了 `type`/`transport` 时才固定传输类，否则交由 FastMCP 从 URL 推断——这正是裸 `url` 指向 SSE 端点也能连上的原因 [@ref-deep-agents-mcp-transport-build]。

stdio 传输的 `keep_alive` 决定子进程是否跨工具调用复用：有常驻会话管理器时复用，无状态加载时每次调用新建 [@ref-deep-agents-mcp-transport-build]。`cwd` 是 stdio 条目由 FastMCP 模型接受的字段；条目未配置时，已信任项目或显式 `--mcp-config` 提供的 server 会回落到会话目录 [@ref-deep-agents-mcp-transport-build]。

**Header 与静态凭据。** 远程条目用 `headers` 传认证信息，值同样支持 `${VAR}` 展开，可避免把密钥写进仓库 [@ref-deep-agents-mcp-doc-format]。静态 `Authorization` 头优先级高于已存盘的 OAuth token：只要配置写了 `Authorization`，存储的 OAuth 凭据就不会被使用 [@ref-deep-agents-mcp-doc-oauth]。`auth: "oauth"` 与同一条目上的 `Authorization` 头互斥，且不能用于 stdio [@ref-deep-agents-mcp-doc-oauth]。

**OAuth 登录流程。** 对需要 OAuth 的远程 server 写 `"auth": "oauth"`，再执行一次 `dcode mcp login` 即可，token 存盘后自动刷新 [@ref-deep-agents-mcp-doc-oauth]。`dcode mcp login` 不带 server 名时只列出已配置 OAuth 但尚无 token 的 server（不检查是否过期）；带名字时执行该 server 的登录流程 [@ref-deep-agents-mcp-doc-oauth]。

**Token 存储。** 凭据落到 `~/.deepagents/.state/mcp-tokens/{server}-{sha256-16(url)}.json`，目录权限 `0700`、文件 `0600`，内容含 access token、refresh token 与动态注册的 client 信息，采用带版本号的原子写入（写临时文件再 rename）[@ref-deep-agents-mcp-auth-store][@ref-deep-agents-mcp-doc-oauth]。文件名里的 URL 哈希是 server URL 前 16 位十六进制 SHA-256，所以同名 server 指向不同 URL 时各自持有独立 token 文件，不会互相覆盖 [@ref-deep-agents-mcp-auth-store][@ref-deep-agents-mcp-doc-oauth]。

**不同宿主的流程差异**（由内置 provider 分派）[@ref-deep-agents-mcp-doc-oauth]：

| 宿主 | 流程 |
|---|---|
| 合规 server（默认） | Dynamic Client Registration + Authorization Code + PKCE，浏览器打开后把重定向 URL 粘回终端 |
| Slack（`slack.com`、`*.slack.com`） | 同一粘贴回填流程，预置 Slack 公共 client，并询问可选团队 ID |
| GitHub（`api.githubcopilot.com`） | RFC 8628 设备授权：打印验证 URL 与用户码，轮询完成 |

刷新失败时 server 被标记为 `unauthenticated` 而不是让 agent 崩溃；重新运行 `dcode mcp login SERVER_NAME` 即可刷新凭据而无需重启会话 [@ref-deep-agents-mcp-doc-oauth]。

## 启动时机、信任门控与生命周期 {#mcp-lifecycle}

MCP 连接发生在**启动时**：会话启动后自动发现配置、连接每个 server、发现其工具，并把工具并入内置工具集 [@ref-deep-agents-mcp-doc-status]。

连接前有逐 server 的 preflight [@ref-deep-agents-mcp-lifecycle-preflight]：

- stdio：用 `shutil.which` 确认 `command` 在 PATH 上存在；找不到即记为该 server 的 `error`。
- 远程：发一个 2 秒超时的 HEAD 请求探测连通性；连接类异常或 5xx 视为不可用。

preflight 失败只被记为该 server 的 `error`，不会中止整体加载 [@ref-deep-agents-mcp-lifecycle-preflight]。

**项目级信任（default-deny）。** 项目级配置可能含会执行本地命令的 stdio 条目、以及可通过 `${VAR}` 头外泄环境变量的远程条目，因此默认不信任 [@ref-deep-agents-mcp-doc-trust]。

交互模式下启动前会弹出批准提示，展示每条 stdio 命令与远程 URL，可选 `Allow once`（本次会话生效）或 `Allow for this project — until changed`（本次会话生效，并选择要保存的批准）[@ref-deep-agents-mcp-doc-trust]。

非交互模式（`-n`）下，没有匹配的已保存或环境批准的项目 server 会被静默跳过，除非传入 `--trust-project-mcp`；显式 deny 仍然优先 [@ref-deep-agents-mcp-doc-trust]。用户级 `~/.deepagents/.mcp.json` 始终被信任，和 `config.toml`、`hooks.json` 同属一个信任模型 [@ref-deep-agents-mcp-doc-trust][@ref-deep-agents-mcp-doc-home]。

保存的批准写在 `~/.deepagents/config.toml` 的 `[mcp] enabled_project_server_approvals`，每条按解析后的项目根、server 名和该定义的 SHA-256 指纹绑定；定义（命令、URL、headers 等）一变就重新提示 [@ref-deep-agents-mcp-doc-trust]。要撤销某条批准，从该列表中删除对应条目即可 [@ref-deep-agents-mcp-doc-trust]。

代码里 `filter_trusted_project_servers` 是唯一的判定点：先无条件剔除 `disabled` 名单里的名字，其余仅在整份配置被信任、或用户作用域的批准/环境允许时才保留；运行时加载与 `dcode mcp login` 共用这一处规则，避免拒绝优先级在两处漂移 [@ref-deep-agents-mcp-lifecycle-trust]。

信任策略读不出来时 fail-closed：不再授予整份配置信任；若托管（managed）禁用名单不可读，则把所有 server 都当作被禁 [@ref-deep-agents-mcp-lifecycle-trust][@ref-deep-agents-mcp-lifecycle-disabled]。

**禁用持久化。** `/mcp` 查看器里用 F2 关闭的 server 记录在 `~/.deepagents/config.toml` 的 `[mcp].disabled_servers`，按 server **名**生效：合并配置时即被剔除，不尝试连接、不加载工具，但条目仍显示在查看器里供重新启用 [@ref-deep-agents-mcp-lifecycle-disabled]。按名生效意味着两个配置里同名的 server 会被同一条记录一起禁用 [@ref-deep-agents-mcp-lifecycle-disabled]。

**状态机。** 每个 server 最终落入五种状态之一 [@ref-deep-agents-mcp-lifecycle-status][@ref-deep-agents-mcp-doc-status]：

| 状态 | 含义 |
|---|---|
| `ok` | 已连接，工具已加载并可用 |
| `unauthenticated` | 需要 OAuth 登录，或刷新失败 |
| `awaiting_reconnect` | 仅 UI 用的过渡态：登录成功但 LangGraph server 尚未重启加载新工具 |
| `error` | preflight、发现或传输建立失败，附带错误信息 |
| `disabled` | 用户关闭，未尝试连接 |

非 `ok` 状态必须带错误原因且不携带工具，`ok` 才带权威工具列表 [@ref-deep-agents-mcp-lifecycle-status-invariant]。单个 server 失败不再中止启动：会话用成功启动的 server 继续运行，欢迎横幅分别显示未认证与出错 server 的数量 [@ref-deep-agents-mcp-doc-status]。

**重连与重试。** proxy 边界的 `MCPBackendMiddleware` 会拦截工具调用失败：仅当异常是连接类失败（或会话已结束、或需要重新 OAuth）时才重建会话，并且**不重放**可能已经完成的调用，而是返回一条 error 结果提示“操作可能已完成且未重试，请先核实结果” [@ref-deep-agents-mcp-lifecycle-retry]。需要重新认证时，登录错误被原样返回给用户 [@ref-deep-agents-mcp-lifecycle-retry]。

刷新失败时 server 标记为 `unauthenticated`，横幅显示需登录计数，`/mcp` 给出每个 server 的原因；重新运行 `dcode mcp login SERVER_NAME` 即可刷新凭据而无需重启会话 [@ref-deep-agents-mcp-doc-status]。

## 能力发现、工具暴露与审批 {#mcp-exposure}

**能力种类。** 连接建立后 dcode 只对每个 backend 调用 `list_tools()`，把发现的工具聚合、挂载到路由上 [@ref-deep-agents-mcp-capability-tools]。固定来源中没有任何 `list_resources`、`list_prompts` 调用路径，因此就本 CLI 而言，MCP 的 tools 可被发现并使用，而 resources、prompts 的发现与使用在源码里得不到支持证据（缺口即在此：`mcp_tools.py` 的连接与发现路径只走 tools）[@ref-deep-agents-mcp-capability-tools]。

**导出名。** 工具导出前被规范化为 `{server}_{tool}`，非 `[A-Za-z0-9_-]` 字符替换为 `_`，超过 64 字符上限时改用截断名加 12 位 SHA-256 摘要后缀 [@ref-deep-agents-mcp-exposure-naming]。多个 server 产生同名导出名时，按稳定顺序追加 `_1`、`_2` 去重，保证导出名与 provider 限制无关且可复现 [@ref-deep-agents-mcp-exposure-naming]。

**过滤。** 每个 server 可用 `allowedTools`（只保留列出项）或 `disabledTools`（剔除列出项）收窄暴露给 agent 的工具集，二者互斥且都不能为空列表 [@ref-deep-agents-mcp-doc-filter]。每项是字面工具名或含 `*`、`?`、`[` 的 `fnmatch` 通配；匹配时同时尝试裸工具名与 `{server}_{tool}` 前缀名，所以两种写法都可用 [@ref-deep-agents-mcp-exposure-filter][@ref-deep-agents-mcp-doc-filter]。匹配不到任何已加载工具的项只记 warning、不视为错误，以免 server 版本演进时使配置失效 [@ref-deep-agents-mcp-exposure-filter][@ref-deep-agents-mcp-doc-filter]。

**审批（Auto 模式）。** MCP server 可在通告工具时附带标准 `ToolAnnotations`；只有满足下面全部条件时，该工具才在 Auto 模式跳过分类器复核 [@ref-deep-agents-mcp-exposure-readonly][@ref-deep-agents-mcp-doc-filter]：

- `readOnlyHint` 为字面量 `true`；
- `destructiveHint` 缺失、`null` 或 `false`；
- 所有提供的标准提示（`readOnlyHint`、`destructiveHint`、`idempotentHint`、`openWorldHint`）都是布尔或 `null`，而不是字符串等其他类型。

不满足者进入 Auto 的分类器批次、Manual 走常规审批 UI，而在没有审批 UI 的无头运行中直接拒绝 [@ref-deep-agents-mcp-exposure-readonly][@ref-deep-agents-mcp-doc-filter]。这些注释是 server 的自述断言，dcode 不做独立核验 [@ref-deep-agents-mcp-exposure-readonly][@ref-deep-agents-mcp-doc-filter]。

**超时与调用中间件。** 每次 MCP 工具调用受墙钟超时约束，默认 120 秒，可经 `[mcp].tool_timeout` 或对应环境变量覆盖，取值范围 1–900 秒，超时返回一条 error `ToolMessage` [@ref-deep-agents-mcp-exposure-middleware][@ref-deep-agents-mcp-diag-timeout]。同一中间件还会把可选字符串参数里模型误填的空串 `""` 规范化为“未提供”，必填字段原样透传 [@ref-deep-agents-mcp-exposure-normalize]。

## 诊断与状态查看 {#mcp-diagnostics}

**查配置是否被读取。** `dcode mcp config` 按优先级打印三处发现路径并标记哪一处存在；它只做 `stat`、不打开文件，因此不会触发信任提示，退出码恒为 0 [@ref-deep-agents-mcp-diag-cli][@ref-deep-agents-mcp-doc-cmds]。

**查登录与连接。** `dcode mcp login` 不带名字时列出已配置 OAuth 但尚无 token 的 server，带名字时执行该 server 的登录流程；两者都可用 `--mcp-config PATH` 指定文件，默认使用与运行时相同的自动发现配置并受项目信任门控约束 [@ref-deep-agents-mcp-diag-cli][@ref-deep-agents-mcp-doc-cmds]。交互会话中打开 `/mcp` 可看到逐 server 的状态、传输类型、已加载工具列表以及非 `ok` 条目的失败原因，视图随 server 连接实时更新，并支持 `tab`/`shift+tab` 导航 [@ref-deep-agents-mcp-doc-status]。

**查工具是否可见、是否可用。** `/tools` 把内置工具与来自各 MCP server 的工具分组列出，无法使用的 MCP server 进入单独表格（例如 `needs login`）[@ref-deep-agents-mcp-doc-cmds]。改动 MCP 配置后用 `/reload` 重新读取并重新发现，再用 `/tools` 验证生效的工具集 [@ref-deep-agents-mcp-doc-cmds]。无头等价命令是 `dcode tools list [--json]`，它同样接受 `--no-mcp`、`--mcp-config`、`--trust-project-mcp` 这些顶层开关，且需放在 `tools list` 之前 [@ref-deep-agents-mcp-doc-cmds][@ref-deep-agents-mcp-doc-flags]。

**定位失败。** `--mcp-config` 或自动发现配置的预检失败会给出单行原因（如 server 名不合法、stdio 上写了 `auth: oauth`、同一条目同时有 `command` 与 `url`、header 值非字符串），而不是多页子进程堆栈 [@ref-deep-agents-mcp-doc-status]。

启动横幅与 `/mcp` 会分别给出 `unauthenticated` 与 `error` server 的计数 [@ref-deep-agents-mcp-doc-status]。`dcode doctor` 可在不启动会话的情况下汇总安装方式、依赖版本、更新状态、tracing 配置与数据目录健康状态，用于判断某个 server 连不上是配置问题还是环境问题 [@ref-deep-agents-mcp-doc-status][@ref-deep-agents-mcp-doc-cmds]。
