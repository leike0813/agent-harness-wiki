---
schema_version: 3
record_kind: production
edition_id: grok-cli-mcp-v1
harness_id: grok
topic: mcp
title: "Grok Build CLI 的 MCP：配置入口、传输、认证、生命周期与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-grok-mcp-guide-config-entry, ref-grok-mcp-ref-scopes, ref-grok-mcp-guide-cli-scope, ref-grok-docs-mcp-adding, ref-grok-mcp-guide-project, ref-grok-docs-mcp-project, ref-grok-mcp-toml-layers, ref-grok-mcp-config-mcp-servers, ref-grok-mcp-guide-compat, ref-grok-docs-mcp-compat, ref-grok-mcp-config-compat, ref-grok-mcp-ref-compat, ref-grok-mcp-list-merge, ref-grok-mcp-src-origin, ref-grok-mcp-json-order, ref-grok-mcp-session-merge]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-grok-mcp-ref-mcp-servers, ref-grok-mcp-cfg-known-fields, ref-grok-mcp-cfg-fields, ref-grok-mcp-cfg-transport-enum, ref-grok-mcp-guide-stdio, ref-grok-mcp-guide-expansion, ref-grok-docs-mcp-adding, ref-grok-mcp-cfg-expand, ref-grok-mcp-guide-example-stdio, ref-grok-mcp-guide-windows-command]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-grok-mcp-details-transport, ref-grok-mcp-guide-stdio, ref-grok-mcp-guide-http, ref-grok-mcp-guide-streamable, ref-grok-mcp-cfg-sse-detect, ref-grok-mcp-cfg-resolve-transport, ref-grok-mcp-guide-expansion, ref-grok-docs-mcp-adding, ref-grok-mcp-guide-oauth, ref-grok-mcp-guide-credentials, ref-grok-mcp-cfg-oauth-settings, ref-grok-mcp-guide-bearer-token-file, ref-grok-mcp-bearer-meta, ref-grok-mcp-bearer-parse, ref-grok-mcp-cfg-bearer-env]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-grok-mcp-guide-toggle, ref-grok-docs-mcp-tui, ref-grok-mcp-cfg-fields, ref-grok-mcp-guide-cli-scope, ref-grok-mcp-guide-startup-timeout, ref-grok-mcp-ref-features-mcp, ref-grok-mcp-ref-managed-mcps, ref-grok-mcp-guide-output-cap, ref-grok-mcp-session-merge, ref-grok-mcp-headless-status, ref-grok-mcp-headless-init-rpc, ref-grok-mcp-headless-init-status]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-grok-mcp-ref-mcp-servers, ref-grok-mcp-guide-tool-naming, ref-grok-mcp-guide-tool-discovery, ref-grok-mcp-server-info, ref-grok-mcp-ref-disabled-servers, ref-grok-mcp-ref-disabled-tools, ref-grok-mcp-details-skip, ref-grok-mcp-perm-rules, ref-grok-mcp-policy-deny, ref-grok-mcp-policy-apply, ref-grok-mcp-plugin-trust, ref-grok-mcp-guide-subagents, ref-grok-mcp-subagent-inheritance, ref-grok-mcp-guide-tool-missing]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-grok-mcp-guide-cli-list, ref-grok-mcp-guide-inspect, ref-grok-mcp-guide-stderr-log, ref-grok-mcp-headless-status, ref-grok-mcp-guide-policy, ref-grok-mcp-guide-debug-logging, ref-grok-mcp-guide-tool-missing, ref-grok-docs-mcp-troubleshooting]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-grok-mcp-guide-config-entry, ref-grok-mcp-guide-project, ref-grok-mcp-guide-cli-scope, ref-grok-mcp-guide-compat, ref-grok-mcp-config-mcp-servers, ref-grok-mcp-ref-scopes, ref-grok-mcp-toml-layers, ref-grok-mcp-list-merge, ref-grok-docs-mcp-adding, ref-grok-docs-mcp-project, ref-grok-docs-mcp-compat]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-grok-mcp-ref-mcp-servers, ref-grok-mcp-cfg-known-fields, ref-grok-mcp-cfg-fields, ref-grok-mcp-cfg-transport-enum, ref-grok-mcp-guide-stdio, ref-grok-mcp-guide-expansion, ref-grok-mcp-cfg-expand, ref-grok-mcp-guide-example-stdio, ref-grok-mcp-guide-windows-command, ref-grok-docs-mcp-adding]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-grok-mcp-details-transport, ref-grok-mcp-guide-stdio, ref-grok-mcp-guide-http, ref-grok-mcp-guide-streamable, ref-grok-mcp-cfg-sse-detect, ref-grok-mcp-cfg-resolve-transport]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-grok-mcp-guide-oauth, ref-grok-mcp-guide-credentials, ref-grok-mcp-cfg-oauth-settings, ref-grok-mcp-guide-bearer-token-file, ref-grok-mcp-bearer-meta, ref-grok-mcp-bearer-parse, ref-grok-mcp-cfg-bearer-env, ref-grok-mcp-guide-expansion]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-grok-mcp-guide-toggle, ref-grok-docs-mcp-tui, ref-grok-mcp-cfg-fields, ref-grok-mcp-guide-startup-timeout, ref-grok-mcp-ref-features-mcp, ref-grok-mcp-ref-managed-mcps, ref-grok-mcp-guide-output-cap, ref-grok-mcp-session-merge, ref-grok-mcp-headless-status, ref-grok-mcp-guide-cli-scope, ref-grok-mcp-headless-init-rpc, ref-grok-mcp-headless-init-status]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: partial
        source_refs: [ref-grok-mcp-ref-mcp-servers, ref-grok-mcp-guide-tool-naming, ref-grok-mcp-guide-tool-discovery, ref-grok-mcp-server-info]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-grok-mcp-guide-tool-naming, ref-grok-mcp-ref-disabled-servers, ref-grok-mcp-ref-disabled-tools, ref-grok-mcp-details-skip, ref-grok-mcp-perm-rules, ref-grok-mcp-policy-deny, ref-grok-mcp-policy-apply, ref-grok-mcp-plugin-trust, ref-grok-mcp-guide-subagents, ref-grok-mcp-subagent-inheritance, ref-grok-mcp-guide-tool-missing]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-grok-mcp-guide-cli-list, ref-grok-mcp-guide-inspect, ref-grok-mcp-guide-stderr-log, ref-grok-mcp-headless-status, ref-grok-mcp-guide-policy, ref-grok-mcp-guide-debug-logging, ref-grok-mcp-guide-tool-missing, ref-grok-docs-mcp-troubleshooting]
---

## 配置入口与来源合并 {#mcp-entry}

本章的固定来源是官方文档站 `features/mcp-servers.md` 快照，以及官方仓库提交 `2bdd1d6` 的用户指南、配置参考和 `xai-grok-config`、`xai-grok-workspace` 源码。产品只有一个界面 `cli`，因此整章按 CLI 阅读。

原生入口是用户级 `~/.grok/config.toml` 里的 `[mcp_servers.{name}]` 段 [@ref-grok-mcp-guide-config-entry]；`$GROK_HOME` 决定这个目录（默认 `~/.grok`）[@ref-grok-mcp-ref-scopes]。命令行也能写入：`grok mcp add` 默认落到用户 scope（等价 `--scope user`），`--scope project` 则写当前目录的 `.grok/config.toml`，方便随仓库提交给团队 [@ref-grok-mcp-guide-cli-scope][@ref-grok-docs-mcp-adding]。

项目级配置从当前目录向上走到 git 仓库根，逐层读取 `.grok/config.toml` [@ref-grok-mcp-guide-project][@ref-grok-docs-mcp-project]：

| 位置 | 作用域 | 优先级 |
| :-- | :-- | :-- |
| `~/.grok/config.toml` | 所有项目 | 最低 |
| `{repo-root}/.grok/config.toml` | 本仓库 | 中 |
| `{cwd}/.grok/config.toml` | 当前目录 | 最高 |

同名时项目版本**整体替换**用户版本，字段不做合并 [@ref-grok-mcp-guide-project]。代码里的实现与之一致：先用用户配置建表，再按「越靠近当前目录的项目文件越晚插入」的顺序覆盖 [@ref-grok-mcp-toml-layers]。项目文件只贡献 `[mcp_servers]`、`[plugins]`、`[permission]` 和 `[mcp] max_output_bytes`，其它段只从用户配置读取 [@ref-grok-mcp-ref-scopes][@ref-grok-mcp-config-mcp-servers]。

`grok mcp list` 同时展示两个 scope，项目级标 `(project)`、禁用标 `(disabled)`；`grok mcp remove` 搜索两个 scope，重名时退出码 1 并要求显式 `--scope` [@ref-grok-mcp-guide-cli-scope]。

### 兼容来源

除原生 TOML 外，Grok 还加载 Claude、Cursor 与标准 `.mcp.json`，并按低于 `config.toml` 的优先级合并 [@ref-grok-mcp-guide-compat][@ref-grok-docs-mcp-compat]：

| 来源 | 格式 | 位置 | 开关 |
| :-- | :-- | :-- | :-- |
| `config.toml` | Grok 原生 | `~/.grok/config.toml`、`.grok/config.toml` | 始终开启 |
| `.claude.json` | Claude Code | `~/.claude.json` | `[compat.claude] mcps` |
| `.cursor/mcp.json` | Cursor | `~/.cursor/mcp.json`、`{project}/.cursor/mcp.json` | `[compat.cursor] mcps` |
| `.mcp.json` | MCP 标准 | 项目根（cwd 到 git 根） | 除非已导入/忽略过 Claude 导入提示 |

优先级为 `config.toml` > Claude > Cursor > `.mcp.json`，高优先级来源在同名冲突中取胜 [@ref-grok-mcp-guide-compat]。两个兼容开关默认 `true`，可写 `[compat.claude] mcps = false` / `[compat.cursor] mcps = false`，或用 `GROK_CLAUDE_MCPS_ENABLED`、`GROK_CURSOR_MCPS_ENABLED` [@ref-grok-mcp-config-compat][@ref-grok-mcp-ref-compat]。

代码侧的合并顺序与此吻合：先 TOML（用户建表、项目覆盖），再按 Claude、Cursor、`.mcp.json` 依次用 `or_insert` 只填补尚未占用的名字 [@ref-grok-mcp-list-merge]。插件来源与客户端转发的 server 也参与同一张表，每项带来源标签 [@ref-grok-mcp-src-origin]。Claude 的 `projects.{cwd}.mcpServers` 优先于顶层 `mcpServers`，Cursor 的 `{cwd}/.cursor/mcp.json` 优先于 `~/.cursor/mcp.json` [@ref-grok-mcp-json-order]。合并结果按名字分成原生（Native）与外部（Foreign）两级，只有定义完全相同的外部项才会保留原生层级，从而让无变化的重载不重启 MCP [@ref-grok-mcp-session-merge]。

## Server 定义字段与变量展开 {#mcp-definition}

一个 server 由 `[mcp_servers.{name}]` 下的传输字段加通用字段组成。第一方字段清单（取自配置参考与源码里的已知字段表）[@ref-grok-mcp-ref-mcp-servers][@ref-grok-mcp-cfg-known-fields]：

| 字段 | 类型 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| `command` | string | — | stdio server 可执行文件（必填） |
| `args` | string[] | `[]` | 传给可执行文件的参数 |
| `env` | table | 无 | 注入子进程的环境变量 |
| `cwd` | string | 无 | 子进程工作目录 |
| `url` | string | — | HTTP/SSE server 地址（与 `command` 二选一） |
| `type` | string | 无 | 远程传输类型，`sse` 时走 SSE |
| `headers` | table | 无 | 远程请求附加的 HTTP 头 |
| `bearer_token_env_var` | string | 无 | 从这个环境变量取 token 拼 `Authorization` |
| `bearer_token_file` | string | 无 | 指向 token 文件，每次请求重读 |
| `enabled` | boolean | `true` | 是否启用该 server |
| `startup_timeout_sec` | number | `30` | 启动/握手超时（秒） |
| `tool_timeout_sec` | number | `6000` | 单次工具调用兜底超时（秒） |
| `tool_timeouts` | table | 无 | 按工具名的超时覆盖 |
| `expose_image_base64` | boolean | 无 | 图像结果以 base64 暴露 |
| `oauth` | table | 无 | OAuth 客户端块（见认证一节） |
| `oauth_client_id` / `oauth_client_secret_env_var` / `oauth_scopes` | string / string / string[] | 无 | HTTP 内联 OAuth 设置 |
| `setup` | table | 无 | 安装时向用户收集字段的交互配置 |

字段在源码里以一个 untagged 的传输枚举加通用字段表达；`enabled` 默认 `true`，其余可选字段缺省即 `None` [@ref-grok-mcp-cfg-fields]。stdio 与远程两种形态的字段集合不同，来自同一个枚举定义 [@ref-grok-mcp-cfg-transport-enum]。

stdin/stdout 形态的最小定义 [@ref-grok-mcp-guide-stdio]：

```toml
[mcp_servers.my-server]
command = "/path/to/server"
args = ["--flag", "value"]
env = { API_KEY = "sk-..." }
enabled = true
startup_timeout_sec = 30
tool_timeout_sec = 6000
tool_timeouts = { slow_op = 120 }
```

### 变量展开

`url`、`command`、`args`、`env` 的值、`headers` 的值以及 `bearer_token_file` 都会在加载时做 `${VAR}`（和 `${VAR:-default}`）展开，所以密钥可以留在环境里而不写进配置文件 [@ref-grok-mcp-guide-expansion][@ref-grok-docs-mcp-adding]。源码把可替换字段收在同一个遍历里，`${VAR}` 展开与 `setup` 模板共用这份清单，避免两遍处理不一致 [@ref-grok-mcp-cfg-expand]。

一个带环境变量与显式超时的 stdio 例子（字段方框里的写法由此而来）[@ref-grok-mcp-guide-example-stdio]：

```toml
[mcp_servers.my-tools]
command = "/usr/local/bin/my-mcp-server"
args = ["--config", "/etc/my-mcp.json"]
startup_timeout_sec = 30
tool_timeout_sec = 120
tool_timeouts = { slow_analysis = 300, quick_lookup = 10 }
```

Windows 上 npm 会把 `npx`、`npm`、`pnpm`、`yarn` 装成 `.cmd` 批处理垫片；Grok 会把裸 `command`（如 `npx`）按 `PATHEXT` 解析到真实启动器再 spawn，绝对路径或含路径分隔符的 `command` 则原样使用 [@ref-grok-mcp-guide-windows-command]。

## 传输方式与认证 {#mcp-transport}

源码里的传输只有三类：`Stdio`、`Http`、`Sse` [@ref-grok-mcp-details-transport]。`stdio` 由 Grok 拉起本地进程、经 stdin/stdout 通信 [@ref-grok-mcp-guide-stdio]；远程 server 写 `url` 加可选 `headers` [@ref-grok-mcp-guide-http]。带会话 ID 的 Streamable HTTP 也走 `url`，用 header 传会话 [@ref-grok-mcp-guide-streamable]：

```toml
[mcp_servers.my-streamable-server]
url = "https://mcp.example.com/api/mcp"
headers = { "x-mcp-session-id" = "{{session_id}}" }
```

配置层用同一个 `url` 承载 HTTP 与 SSE，靠 `type` 或 URL 后缀区分：`type` 忽略大小写等于 `sse`，或 `url` 以 `/sse` 结尾时走 SSE，否则视为 HTTP [@ref-grok-mcp-cfg-sse-detect][@ref-grok-mcp-cfg-resolve-transport]。`bearer_token_env_var` 有值时会被追加成 `Authorization` 头，位置在配置头之后（即最后一个同名头），见认证小节 [@ref-grok-mcp-cfg-resolve-transport]。第一方来源没有提到 WebSocket 传输，内部枚举也没有对应变体，因此这里只确认 stdio 与 HTTP/SSE 三类 [@ref-grok-mcp-details-transport]。

远程调用默认带 `User-Agent: grok-cli/{version}`；`headers` 里的合法 `User-Agent` 会覆盖它，非法的会被解析丢弃并回退默认值。Figma server（名字为 `figma`、旧管理名 `grok_com_figma`，或主机属 `figma.com`，均忽略大小写）默认只发不带版本的 `grok-cli`，除非配置显式给出 `User-Agent` [@ref-grok-mcp-guide-http]。

### 认证

静态凭据直接用 `headers`，或用 `${VAR}` 引用环境变量以避免入库 [@ref-grok-mcp-guide-expansion][@ref-grok-docs-mcp-adding]。需要 OAuth 的 server 由 Grok 自动处理：server 索取凭据时打开浏览器授权流程，并把令牌存下来复用；令牌落在 `~/.grok/mcp_credentials.json`，是本地明文、属主可读（Unix 上 `0600`）[@ref-grok-mcp-guide-oauth][@ref-grok-mcp-guide-credentials]。

OAuth 客户端设置两种写法，源码明确 HTTP 内联字段优先于 `oauth` 块，且两者都必须给出 client id 才生效 [@ref-grok-mcp-cfg-oauth-settings]：

```toml
[mcp_servers.internal-tools]
url = "https://mcp.internal.example.com/mcp"
enabled = true
headers = { "Authorization" = "Bearer ${INTERNAL_MCP_TOKEN}" }
oauth_client_id = "my-client"
oauth_scopes = ["read"]
```

当 token 由外部进程写进文件时，用 `bearer_token_file` 指向它。Grok 每次请求都重读该文件并按 `Authorization: Bearer {contents}` 发送（去掉首尾空白），因此轮换 token 无需重启或重连 [@ref-grok-mcp-guide-bearer-token-file]。路径必须绝对或以 `~/` 开头，也可含 `${VAR}`；其它路径会让该 server 报错。它适用于 HTTP 与 SSE，并会取代 `Authorization` 头或 `bearer_token_env_var`，此时跳过 OAuth 发现；文件缺失、为空、超过 16 KiB、非 UTF-8 或含非法头字符时请求报错并指出路径。替换文件要原子写入（同目录临时文件再 rename），原地截断重写会与请求竞争 [@ref-grok-mcp-guide-bearer-token-file]。

`bearer_token_file` 在 ACP 的 server 定义里没有对应字段，配置侧把它写进 `_meta` 的 `x.ai/mcp/bearerTokenFile`，server 启动时再解析，坏路径会让该 server 带原因失败而不是悄悄改变认证方式 [@ref-grok-mcp-bearer-meta][@ref-grok-mcp-bearer-parse]。若改用 `bearer_token_env_var`，Grok 直接读进程环境拼出 `Authorization`；该变量未设置时记一条警告并继续 [@ref-grok-mcp-cfg-bearer-env]。

## 生命周期与开关 {#mcp-lifecycle}

`enabled` 默认 `true`，可在配置里置 `false`，也可在运行期切换：TUI 的 `/mcps`（或 `Ctrl+L` 后切到 MCP Servers 标签）里用 `Space` 启停、`r` 在改完 `config.toml` 后刷新列表、`i` 认证 OAuth server、`a`/`x` 增删 [@ref-grok-mcp-guide-toggle][@ref-grok-docs-mcp-tui]。配置项本身是一个布尔，缺省为真 [@ref-grok-mcp-cfg-fields]。CLI 侧对应 `grok mcp enable|disable`，会持久化个人开关到用户 `~/.grok/config.toml` [@ref-grok-mcp-guide-cli-scope]。

超时：`startup_timeout_sec` 默认 30 秒，可用全局环境变量 `MCP_TIMEOUT`（毫秒，兼容 Claude Code）或 `GROK_MCP_STARTUP_TIMEOUT_SECS`（秒）改默认值，单 server 的 `startup_timeout_sec` 优先于两者；首次下载包冷启动的 `npx`/`uvx` server 常需要调大 [@ref-grok-mcp-guide-startup-timeout]。每次工具调用用 `tool_timeout_sec`（默认 6000 秒）兜底，`tool_timeouts` 可按工具名覆盖 [@ref-grok-mcp-cfg-fields]。

重连与健康：`features.mcp_auto_restart` 让 stdio server 在传输失败后自动重启，`features.mcp_liveness_watchers` 轮询传输并推送 `server_status`，`features.mcp_push_server_status` 让 pager 订阅该推送，`features.mcp_recursive_config_watch` 监视 `{cwd}/` 与 `{cwd}/.grok/` 的项目 MCP 配置改动（名字有误导，实际是非递归监视）；这些都是可关的布尔开关，默认开 [@ref-grok-mcp-ref-features-mcp]。管理端可在启动时拉取托管 MCP 配置（`managed_mcps.enabled`，`pin`）并暴露网关工具（`managed_mcps.gateway_tools_enabled`）[@ref-grok-mcp-ref-managed-mcps]。

热重载：仓库级 `.grok/config.toml` 的改动会通过配置热重载作用于该目录里正在运行的会话 [@ref-grok-mcp-guide-output-cap]。合并结果按名字与定义相等性决定是否重启：定义不变的重载保持等价、不重启 MCP [@ref-grok-mcp-session-merge]。

Headless 模式下，`streaming-messages-json` 输出会给出每个 server 的状态快照，取值有 `connected`、`failed`、`needs-auth`、`pending`、`disabled`；仍在握手的 server 是 `pending`，`disabled` 只在会话报告 `sessionMcpResolved` 后打上 [@ref-grok-mcp-headless-status]。

Headless（Messages/ACP）模式的启动阶段另有源码确证：`headless/mcp_init.rs` 在 `init` 阶段只做一次带界的 `x.ai/mcp/list` RPC（`MCP_LIST_RPC_TIMEOUT` 为 1 秒），把快照填进 Messages 的 `init.mcp_servers`，并在模块注释里说明 shell 的阻塞式启动宽限在这之后才随首轮提示发生，因此这里不会再加第二次等待 [@ref-grok-mcp-headless-init-rpc]。该初始化把显示状态映射成 wire token：`Ready` 记 `connected`，`NeedsAuth` 与 `SetupRequired` 记 `needs-auth`，`Initializing` 记 `pending`；`disabled` 必须等会话报告 `sessionMcpResolved` 才成立，因为列表的 `enabled` 在 init 之前为空 [@ref-grok-mcp-headless-init-status]。

**缺口**：交互式 TUI 会话里 server 相对首轮提示的拉起时点与阻塞宽限仍未在源码层确证，只能从上面的 `pending` 与启动宽限文字推断；已检查的入口是 `07-mcp-servers.md`、`14-headless-mode.md`、`headless/mcp_init.rs` 及其测试 [@ref-grok-mcp-headless-status]。

## 能力与暴露 {#mcp-exposure}

**已确证的能力面只有 tools。** 固定来源反复描述工具发现与调用，但全篇没有给出 resources 或 prompts 的发现、读取或暴露机制，也没有对应的配置字段；因此本章只能对 tools 给出 `answered`，resources/prompts 保持未确证。检查过的入口是 07-mcp-servers 全文、05-configuration 的 MCP 段与 26-config-reference 的 `mcp_servers` 字段表 [@ref-grok-mcp-ref-mcp-servers]。

工具在目录里以 `{server}__{tool}` 命名空间化（两个下划线），例如 `filesystem__read_file`、`github__create_issue` [@ref-grok-mcp-guide-tool-naming]。Grok 只在满足全部条件时接纳一个工具：server 名以字母或下划线开头、其后仅 ASCII 字母数字下划线连字符；工具名非空、仅 `[A-Za-z0-9_-]`（可数字开头）；恰好一个 `__` 分隔符；目录键 `server__tool` 不超过 256 字符。被拒的工具有一条 `Skipping MCP tool` 日志，同一 server 的其余工具照常加载。64 字符上限只作用于 `search_tool`/`use_tool` 这两个元工具的**函数名**，不限制目录键 [@ref-grok-mcp-guide-tool-naming]。

模型侧通过两个内置元工具使用 MCP：`search_tool` 按名字或描述检索所有启用 server 的工具，`use_tool` 用完整合格名（如 `github__create_issue`）调用 [@ref-grok-mcp-guide-tool-discovery]。TUI 里每个 server 会显示其工具数与（展开后）工具名，这个展示结构在类型里由 `tool_count` 和 `tools` 两个字段承载 [@ref-grok-mcp-server-info]。

过滤与批准：
- `disabled_mcp_servers`（string[]）按名字跳过 server 但不删其配置块；`disabled_mcp_tools`（map，按 server 名为键）列出该 server 的禁用工具 [@ref-grok-mcp-ref-disabled-servers][@ref-grok-mcp-ref-disabled-tools]。
- 解析层会把被跳过的 server 带原因记账，原因包括 `DisabledInConfig`、`ListedInDisabledMcpServers`、`VendorMcpsOff`、`SetupRequired`、`InvalidSetup`、`InvalidEntry` [@ref-grok-mcp-details-skip]。
- 权限规则用 `MCPTool(...)` 匹配完整的 `server__tool` 名并支持 glob（`MCPTool(linear__*)` 匹配该 server 全部工具）；Claude 风格的 `mcp__{server}` / `mcp__{server}__{tool}` 也会被改写到同一匹配器。Grok 工具名本身不带 `mcp__` 前缀 [@ref-grok-mcp-perm-rules]。
- 组织策略：原生 TOML 与 Claude `managed-settings.json` 的 `allowedMcpServers`/`deniedMcpServers` 在合并后生效，deny 优先；存在 allow 列表时未列出的 server 全被拦，`allowManagedMcpServersOnly` 是锁定项，被拦的 server 从会话中丢弃并记 `MCP server blocked by managed settings policy` [@ref-grok-mcp-policy-deny][@ref-grok-mcp-policy-apply]。
- 插件提供的 MCP server 在插件被信任前不激活 [@ref-grok-mcp-plugin-trust]。

子代理默认继承父会话**已连接**的 server（含 stdio/HTTP 与插件来源），并同样用 `search_tool`/`use_tool` 访问；用 frontmatter `mcpInheritance`（`all`/`none`/`named`/`except`，省略时 `all`）限制。`agent.md` 的 `mcpServers` 覆盖磁盘/客户端合并中同名项；插件代理不允许自带 `mcpServers` [@ref-grok-mcp-guide-subagents][@ref-grok-mcp-subagent-inheritance]。

工具已连接却不出现在目录时，按此顺序排查：父会话是否真的连上、`mcpInheritance` 是否把 server 排掉、插件代理的限制 [@ref-grok-mcp-guide-tool-missing]。

## 诊断：配置、连接、可见性与调用 {#mcp-diagnostics}

四个层次各有入口：

1. **配置是否被读取**：`grok mcp list` 列出配置中的 server，`--json` 给机器可读输出；`grok inspect`（可加 `--json`）显示每个已加载 server 及其来源标签（`[cursor]`、`[claude]` 等）与 scope [@ref-grok-mcp-guide-cli-list][@ref-grok-mcp-guide-inspect]。
2. **server 是否连上**：`grok mcp doctor [name]` 检查配置与连通性，`--json` 给机器可读输出；stdio server 启动失败时，Grok 把它的 stderr 捕获到 `~/.grok/logs/mcp/{server}.stderr.log`（每次启动截断）[@ref-grok-mcp-guide-cli-list][@ref-grok-mcp-guide-stderr-log]。Headless 的 `streaming-messages-json` 会给出 `connected`/`failed`/`needs-auth`/`pending`/`disabled` 状态快照 [@ref-grok-mcp-headless-status]。
3. **被策略拦下**：若受管理策略拒绝，启动日志出现 `MCP server blocked by managed settings policy`，`grok inspect` 会打印 allow/deny 列表、锁定范围与每个存留 server [@ref-grok-mcp-guide-policy]。
4. **调用与工具发现**：用 `RUST_LOG=debug` 加 `GROK_LOG_FILE`（如 `GROK_LOG_FILE=/tmp/grok.log`）开启调试日志，过滤含 `mcp` 的行即可追踪 server 启动、工具发现与工具调用；被跳过工具的行是 `Skipping MCP tool` 并带具体原因 [@ref-grok-mcp-guide-debug-logging][@ref-grok-mcp-guide-tool-missing]。

文档站的故障排查页把 `grok mcp doctor` 列为第一入口，并同样指出 stderr 日志路径与冷启动 `npx` 可能需要更大的 `startup_timeout_sec` [@ref-grok-docs-mcp-troubleshooting]。
