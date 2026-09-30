---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-mcp-v1
harness_id: forgecode
topic: mcp
title: "ForgeCode CLI 的 MCP：.mcp.json 作用域、传输、认证、生命周期与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-mcp-cli, ref-forgecode-mcp-manual-doc]
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-forgecode-mcp-cli, ref-forgecode-mcp-config-hash, ref-forgecode-mcp-import-doc, ref-forgecode-mcp-manual-doc, ref-forgecode-mcp-merge, ref-forgecode-mcp-paths, ref-forgecode-mcp-scope-doc, ref-forgecode-mcp-trust]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-forgecode-mcp-config-untagged, ref-forgecode-mcp-disable-doc, ref-forgecode-mcp-http, ref-forgecode-mcp-manual-doc, ref-forgecode-mcp-stdio]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-forgecode-mcp-cli, ref-forgecode-mcp-headers, ref-forgecode-mcp-http, ref-forgecode-mcp-manual-doc, ref-forgecode-mcp-oauth, ref-forgecode-mcp-retry, ref-forgecode-mcp-transports]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-policy-scope-doc, ref-forgecode-mcp-config-hash, ref-forgecode-mcp-failed-servers, ref-forgecode-mcp-lifecycle, ref-forgecode-mcp-toolname, ref-forgecode-mcp-tools-doc, ref-forgecode-mcp-tools-only]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-forgecode-mcp-cli, ref-forgecode-mcp-lifecycle, ref-forgecode-mcp-manual-doc, ref-forgecode-mcp-reload, ref-forgecode-mcp-tools-doc]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-forgecode-mcp-paths, ref-forgecode-mcp-merge, ref-forgecode-mcp-trust, ref-forgecode-mcp-cli]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-forgecode-mcp-config-untagged, ref-forgecode-mcp-stdio, ref-forgecode-mcp-http, ref-forgecode-mcp-disable-doc]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-forgecode-mcp-transports, ref-forgecode-mcp-retry, ref-forgecode-mcp-manual-doc]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-forgecode-mcp-headers, ref-forgecode-mcp-oauth, ref-forgecode-mcp-cli]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-forgecode-mcp-lifecycle, ref-forgecode-mcp-failed-servers, ref-forgecode-mcp-config-hash]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-forgecode-mcp-tools-only, ref-forgecode-mcp-lifecycle]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-forgecode-mcp-toolname, ref-forgecode-mcp-tools-doc, ref-forgecode-config-policy-scope-doc]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-forgecode-mcp-cli, ref-forgecode-mcp-reload, ref-forgecode-mcp-manual-doc]
---

## 固定来源与界面 {#mcp-scope}

本章依据 forgecode.dev 官方文档 `/docs/mcp-integration/` 快照（`.mcp.json`、`forge mcp` 命令参考、作用域与优先级、禁用条目、工具注册流程），以及官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出：`crates/forge_domain/src/mcp.rs`（配置模型与 OAuth 设置）、`crates/forge_domain/src/env.rs`（配置文件路径）、`crates/forge_services/src/mcp/{manager,service}.rs`（合并、信任与生命周期）、`crates/forge_infra/src/mcp_client.rs`（stdio/HTTP 连接、模板与重试）、`crates/forge_main/src/cli.rs`（`forge mcp` 子命令）。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-mcp-cli][@ref-forgecode-mcp-manual-doc]

## 配置入口与作用域 {#mcp-entry}

MCP 配置只有一种文件格式 `.mcp.json`，内容是 `mcpServers` 对象，键为 server 名，与 Claude 的 `.mcp.json` 设计一致 [@ref-forgecode-mcp-config-hash][@ref-forgecode-mcp-manual-doc]。两个作用域由环境对象直接给出 [@ref-forgecode-mcp-paths][@ref-forgecode-mcp-scope-doc]：

| 作用域 | 文件路径 | 说明 |
| :-- | :-- | :-- |
| local（默认） | `{cwd}/.mcp.json` | 当前项目 |
| user | `{base_path}/.mcp.json` | 全局配置目录（默认 `~/forge`，`FORGE_CONFIG` 可改写） |

合并顺序是“先读 user，再读 local”，用 map 覆盖语义合并，因此同名 server 以 local 为准 [@ref-forgecode-mcp-merge][@ref-forgecode-mcp-scope-doc]。文档补充说明可用会话内 `/info` 查看解析后的配置路径 [@ref-forgecode-mcp-scope-doc]。

项目级配置受信任门约束：读到的 local 配置会计算配置哈希并在 `{base_path}/.mcp_trust.json` 中查历史决定；未记录时弹出交互确认，Accept 记入信任库（此后不再提示），Reject 则把该文件视为空配置；user 作用域天然可信。最终只保留“user 与 local 合并后可信集合中仍存在的 server” [@ref-forgecode-mcp-trust]。

写入与维护也可以完全不手工编辑文件：`forge mcp import`（JSON 字符串参数） 支持 `--scope local|user`（默认 local）把 JSON 中的 `mcpServers` 批量写入对应文件，`forge mcp remove` 按同一 scope 语义删除；两者都提供 `--porcelain` 机器可读输出 [@ref-forgecode-mcp-cli][@ref-forgecode-mcp-import-doc]。

## Server 定义与字段 {#mcp-definition}

server 条目是 untagged 枚举，按字段形态落到两种定义之一：命令式（stdio）与 URL 式（HTTP） [@ref-forgecode-mcp-config-untagged]。字段全集如下 [@ref-forgecode-mcp-stdio][@ref-forgecode-mcp-http]：

| 字段 | 适用 | 含义 |
| :-- | :-- | :-- |
| `command` | stdio | 可执行命令；与 `args`、`env` 一起决定子进程启动方式 |
| `args` | stdio | 参数数组，按序传给命令 |
| `env` | stdio | 追加到子进程的环境变量表 |
| `url` | HTTP | 服务地址；序列化名 `url`，反序列化同时接受别名 `serverUrl` |
| `headers` | HTTP | 附加请求头，值支持从进程环境变量做模板替换 |
| `timeout` | 两者 | 单次调用的超时秒数；未设置时按实现默认（注释写明 `FORGE_MCP_TIMEOUT` 或 300 秒） |
| `disable` | 两者 | 临时禁用，条目保留但不加载 |
| `oauth` | HTTP | OAuth 设置：缺省=按 401 自动探测，`false`=明确关闭，对象=显式配置 |

文档的字段说明与代码一致，并额外给出“不删除只禁用”的用法示例（`"disable": true` 时 server 被忽略，`false` 或省略时正常加载） [@ref-forgecode-mcp-disable-doc][@ref-forgecode-mcp-manual-doc]。文档示例还展示了 server 名到 `command`/`args`/`env` 或 `url` 两种等价写法 [@ref-forgecode-mcp-manual-doc]。

命令式与 URL 式的最小配置（依据官方文档 `/docs/mcp-integration/` 的 Manual configuration 一节）[@ref-forgecode-mcp-manual-doc]：

```json
{
  "mcpServers": {
    "browser_automation": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-browser"],
      "env": { "BROWSER_EXECUTABLE": "/usr/bin/chromium-browser" }
    },
    "webhook_server": { "url": "http://localhost:3000/events" }
  }
}
```

## 传输、连接与认证 {#mcp-transport}

stdio 传输用子进程承载：按 `command`、`env`、`args` 构造 `TokioChildProcess`，开启 `kill_on_drop`，并把子进程 stderr 持续读走写日志，避免管道写满阻塞服务端 [@ref-forgecode-mcp-transports]。HTTP 传输用 rmcp 的 streamable HTTP 客户端，URI 取 `url`；连接前先做 HTTP 头模板解析 [@ref-forgecode-mcp-transports][@ref-forgecode-mcp-headers]。

HTTP 连接按 `oauth` 取值分三路：显式关闭时走普通连接；显式配置时直接使用给定 OAuth 参数；缺省时先尝试普通连接，收到 401 再走自动探测（含动态客户端注册与 RFC 8414 元数据发现） [@ref-forgecode-mcp-transports][@ref-forgecode-mcp-oauth]。

工具列举与调用有指数退避重试（`backon` 的 `ExponentialBuilder`），失败后按策略重试 [@ref-forgecode-mcp-retry]。文档只描述“URL-based server”这一种远程形态并给出 `/sse` 风格示例地址，固定来源中没有单独说明 SSE 与 streamable HTTP 的分流规则，该细节属已知缺口 [@ref-forgecode-mcp-manual-doc]。

### 认证与凭据

认证有三条途径 [@ref-forgecode-mcp-http][@ref-forgecode-mcp-headers][@ref-forgecode-mcp-cli]：

- 静态请求头：`headers` 的每个值都作为 Handlebars 模板解析，支持 `{{.env.VAR_NAME}}` 形式从进程环境读取，因此 token 可放在环境变量或 `.env` 中而不写进配置文件 [@ref-forgecode-mcp-headers]。
- 显式 OAuth：`oauth` 对象可写 `client_id`、`client_secret`、`scopes`、`auth_url`、`token_url`、`redirect_uri` 等参数（结构体按 camelCase 序列化）；不写授权/令牌端点时按服务器元数据自动发现。缺省（或 `true`）表示允许按 401 自动探测；`false` 表示只用静态头/无认证 [@ref-forgecode-mcp-oauth][@ref-forgecode-mcp-http]。
- 交互登录：`forge mcp login` 后跟 server 名对 OAuth server 走登录流程，`forge mcp logout` 后跟 server 名清除该 server 的凭据，参数取 `all` 时清除全部 MCP OAuth 凭据；两者均可加 `--porcelain` [@ref-forgecode-mcp-cli]。

文档层面的凭据建议是“把密钥放环境变量而不是内联配置”，与实现的模板机制一致 [@ref-forgecode-mcp-manual-doc]。凭据在会话内被缓存复用（客户端对象持有连接），刷新发生在重新连接时 [@ref-forgecode-mcp-transports]。

## 生命周期、能力与暴露 {#mcp-lifecycle}

初始化是懒加载且带哈希短路：首次需要列举或调用时读取原始配置，与上次的配置哈希比较，相同则直接复用已注册工具；不同才串行重建（清空工具表与失败表，再并行连接所有未禁用 server），连接失败记入 `failed_servers` 错误链而不会中断其他 server [@ref-forgecode-mcp-lifecycle][@ref-forgecode-mcp-failed-servers][@ref-forgecode-mcp-config-hash]。调用时若工具名未命中，会按 Claude Code 的 `mcp__{server}__{tool}` 旧格式回退查找 [@ref-forgecode-mcp-lifecycle]。

能力方面只发现与执行 tools：客户端只调用 `list_tools` 并据此注册工具，未见对 prompts 或 resources 的发现与使用 [@ref-forgecode-mcp-tools-only][@ref-forgecode-mcp-lifecycle]。注册名统一生成为 `mcp_{server}_tool_{tool}`（server 与 tool 名都经过 sanitize） [@ref-forgecode-mcp-toolname]。

暴露规则是“全部 agent 自动可见”：配置加载后工具自动注册，无需按 agent 配置；agent 工具清单可以收窄可见范围，文档建议用 `mcp_` 前缀 glob 覆盖未来新增的 MCP 工具 [@ref-forgecode-mcp-tools-doc]。`permissions.yaml` 不约束 MCP 工具——文档明确写明该策略文件只管内置工具 [@ref-forgecode-config-policy-scope-doc]。

## 诊断与重载 {#mcp-diagnostics}

按“配置已读取 → server 已连接 → 工具可见 → 调用成功”分层排查 [@ref-forgecode-mcp-cli][@ref-forgecode-mcp-tools-doc][@ref-forgecode-mcp-lifecycle]：

- 配置是否被读取：`forge mcp list` 列出已加载 server；`forge mcp show` 后跟 server 名显示单个 server 的最终解析配置（命令或 URL、参数、环境变量、解析结果）。
- 连接与失败：`McpServers.failures` 保存每个失败 server 的完整错误链，经列举接口返回给界面；会话内 `:tools` 可确认当前 agent 实际可见的工具集合。
- 手动改文件后的重载：`forge mcp reload` 清空基础设施缓存、重置配置哈希并清空工具表，下一次使用再惰性重连（重载本身不主动连接，避免触发交互式 OAuth）[@ref-forgecode-mcp-reload]。
- 文档给出的常见失败面：URL/端口、网络可达性、环境变量与凭据、命令路径与运行时依赖、`.mcp.json` 语法、作用域预期、server 是否被 `disable` [@ref-forgecode-mcp-manual-doc]。
