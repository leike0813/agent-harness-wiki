---
schema_version: 3
record_kind: production
edition_id: warp-desktop-mcp-v1
harness_id: warp
topic: mcp
title: "Warp 桌面端的 MCP：设置条目、文件型 server 与批准闸门"
sections:
  - section_id: mcp-entry
    surface_ids: [desktop]
    source_refs: [ref-warp-mcp-access, ref-warp-mcp-add, ref-warp-mcp-add-multiple, ref-warp-mcp-file-based, ref-warp-mcp-providers, ref-warp-mcp-agent-add]
  - section_id: mcp-transport-auth
    surface_ids: [desktop]
    source_refs: [ref-warp-mcp-add, ref-warp-mcp-add-multiple, ref-warp-mcp-auth, ref-warp-mcp-file-based, ref-warp-mcp-debug]
  - section_id: mcp-lifecycle
    surface_ids: [desktop]
    source_refs: [ref-warp-mcp-managing, ref-warp-mcp-access, ref-warp-mcp-autospawn, ref-warp-mcp-security, ref-warp-mcp-sharing, ref-warp-profiles-mcp]
  - section_id: mcp-exposure
    surface_ids: [desktop]
    source_refs: [ref-warp-profiles-mcp, ref-warp-profiles-denylist, ref-warp-mcp-managing, ref-warp-mcp-debug]
  - section_id: mcp-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-mcp-debug, ref-warp-mcp-logs]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [desktop]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-warp-mcp-access, ref-warp-mcp-file-based, ref-warp-mcp-providers]
  - question_id: mcp.definition
    answers:
      - surface_ids: [desktop]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-warp-mcp-add, ref-warp-mcp-add-multiple, ref-warp-mcp-agent-add]
  - question_id: mcp.transport
    answers:
      - surface_ids: [desktop]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-warp-mcp-add, ref-warp-mcp-add-multiple]
  - question_id: mcp.auth
    answers:
      - surface_ids: [desktop]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-warp-mcp-auth, ref-warp-mcp-file-based]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [desktop]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-warp-mcp-access, ref-warp-mcp-autospawn, ref-warp-mcp-managing, ref-warp-mcp-security]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [desktop]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-warp-mcp-managing]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [desktop]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-warp-profiles-mcp, ref-warp-profiles-denylist, ref-warp-mcp-managing]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-warp-mcp-debug, ref-warp-mcp-logs]
---

## 配置入口与 server 定义 {#mcp-entry}

固定来源是 Warp 官方文档站的 Markdown 快照（MCP、Profiles、Settings 等页）。Warp 是闭源产品，本章为 source-level 知识，`version_applicability` 保持 unknown。

MCP server 有两类配置入口：**Warp 设置里的条目**和**文件里的定义**。Warp 应用内可从 Settings（`warp://settings/mcp`）> Agents > MCP servers、Warp Drive 的 Personal > MCP Servers、命令面板的 `Open MCP Servers`，以及 Settings > Agents > Warp Agent > Manage MCP servers 进入；列表会显示哪些 server 正在运行 [@ref-warp-mcp-access]。手工添加时点 **+ Add**，可以直接粘贴大多数 MCP 客户端的配置 [@ref-warp-mcp-add]。

可添加两种 server 类型，字段如下（来自 MCP 页面「Adding an MCP Server」，第一方字段原样）[@ref-warp-mcp-add]：

| 类型 | 字段 | 必填 | 含义 |
| :-- | :-- | :-- | :-- |
| CLI Server（命令） | `command` | 是 | 要启动的可执行文件（如 `npx`） |
| | `args` | 是 | 传给 `command` 的参数数组 |
| | `env` | 否 | 环境变量键值对（如 API Token） |
| | `working_directory` | 否 | 命令的工作目录，用于解析相对路径 |
| Streamable HTTP / SSE Server（URL） | `url` | 是 | 通过 SSE 连接的 HTTP 端点 |
| | `headers` | 否 | 请求头键值对（如 Authorization） |

文档特别提醒：当命令或参数里含相对路径时**必须显式设置 `working_directory`**，否则不同机器与不同会话行为不一致 [@ref-warp-mcp-add]。

一次添加多个 server 时，粘贴以 `mcpServers` 为顶层键的 JSON，每个条目以唯一名称为键，文档示例同时含 CLI 与 URL 两类 [@ref-warp-mcp-add-multiple]：

```json
{
  "mcpServers": {
    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"] },
    "externalDocs": { "url": "http://localhost:4000/mcp/stream", "headers": { "my-header": "my-header-value" } }
  }
}
```

**文件型 server** 由 Warp 检测配置文件并自动 spawn，额外好处是可用内置 `/agent-add-mcp` skill 让 Agent 自己写入定义，并且定义可跨 provider 与仓库继承 [@ref-warp-mcp-file-based]。Warp 读取的 provider 与路径（来自「Supported providers」表）[@ref-warp-mcp-providers]：

| Provider | 全局配置 | 项目级配置 | 自动 spawn |
| :-- | :-- | :-- | :-- |
| Warp | `~/.warp/.mcp.json` | 项目根 `.warp/.mcp.json` | 默认开 |
| Claude Code | `~/.claude.json` | 项目根 `.mcp.json` | 需开关 |
| Codex | `~/.codex/config.toml` | 项目根 `.codex/config.toml` | 需开关 |
| 其他 agents | `~/.agents/.mcp.json` | 项目根 `.agents/.mcp.json` | 需开关 |

`/agent-add-mcp` 让 Agent 创建或更新文件型定义，选择保存到全局 `~/.warp/.mcp.json` 还是 `{repo_root}/.warp/.mcp.json` [@ref-warp-mcp-agent-add]。作用域语义：全局 Warp server 默认自动 spawn；其他 provider 的全局 server 只有打开 **Auto-spawn servers from third-party agents** 才自动 spawn；任何 provider 的项目级 server 都要逐个显式批准 [@ref-warp-mcp-providers]。

## 传输与认证 {#mcp-transport-auth}

传输有两种，都通过同一个 `+ Add` 流程配置 [@ref-warp-mcp-add]：

- **本地 CLI（stdio 风格）**：给 `command` + `args`（+ `env`、`working_directory`），Warp 启动该命令并在退出时关闭它 [@ref-warp-mcp-add]。官方示例里 `npx -y mcp-remote https://mcp.sentry.dev/mcp` 就是用本地进程代理远端 HTTP MCP [@ref-warp-mcp-add-multiple]。
- **远端 URL**：给 `url`（Streamable HTTP 或 SSE）+ 可选 `headers`，连接一个已经在运行的 server [@ref-warp-mcp-add]。

认证有三种方式（来自「Authentication in MCP servers」）[@ref-warp-mcp-auth]：

1. **环境变量**：把 API key / access token 放进 server 的 `env`。
2. **OAuth 一键安装**：Warp 用浏览器完成授权，凭据存在本机并对后续会话复用；换新机器需要重新认证；启动缺凭据的 server 会自动拉起浏览器流程；凭据可随时在 MCP Servers 面板撤销。
3. **自定义 Header**：通过 `headers` 传 Bearer token。

需要 OAuth 的**文件型** server 首次 spawn 时弹出认证对话框，凭据保存方式与手工配置的 server 相同 [@ref-warp-mcp-file-based]。文档还提示：不少基于 SSE 的 server 直接把 URL 当密码用，可无额外认证 [@ref-warp-mcp-debug]。

## 生命周期、能力与安全闸门 {#mcp-lifecycle}

- **启动/停止**：注册后可在 MCP servers 页面 Start / Stop；每个运行中的 server 会列出可用 tools 与 resources [@ref-warp-mcp-managing]。
- **跨重启的持久性**：关闭 Warp 时正在运行的 server，下次启动 Warp 会再次运行；已停止的 server 下次启动保持停止 [@ref-warp-mcp-access]。
- **自动 spawn**：全局 Warp server 默认自动 spawn；第三方 agent 的全局 server 需要先在 Settings > Agents > MCP servers 打开 **Auto-spawn servers from third-party agents**；任何 provider 的项目级 server 必须手动逐个打开，且是**会话级**——重启 Warp 后要重新批准 [@ref-warp-mcp-autospawn]。
- **能力**：文档只写明运行中的 server 会列出 tools 与 resources [@ref-warp-mcp-managing]。MCP 的 prompts 能力在固定来源中没有出现，不能按 tools/resources 一并断言，按缺口处理 [@ref-warp-mcp-managing]。
- **安全闸门**：MCP 配置文件能启动本地命令并外发数据，Warp 因此设了两道闸——对 MCP 配置文件的编辑必须显式批准；项目级 server 永不自启，克隆下来的仓库不会自动跑起任意命令 [@ref-warp-mcp-security]。可见性还受 Agent Profile 的 MCP allowlist / denylist / “Agent decides” 控制 [@ref-warp-profiles-mcp]。
- **共享**：可把 server 分享给队友，分享时 `env` 里的敏感值会被替换为变量，队友安装时会提示补录；Warp 也提供官方预置 server 的 Shared 区 [@ref-warp-mcp-sharing]。

## Agent 实际可调用的能力范围 {#mcp-exposure}

单个 MCP server 是否已连接、以及它暴露哪些工具，由 MCP servers 页面显示 [@ref-warp-mcp-managing]；而**哪些 server 能被 Agent 调用**由 Agent Profile 的权限设置决定：MCP allowlist 允许免询问调用指定 server，MCP denylist 要求先批准（即使同时在 allowlist 中），或交给 Agent 自行判断 [@ref-warp-profiles-mcp]。同一 Profiles 页面还说明命令 denylist 的优先级高于 allowlist 与 `Agent decides`，可用来理解批准路径 [@ref-warp-profiles-denylist]。

文档还提示不同模型调用 MCP 的效果差异较大，调用失败时可换模型重试 [@ref-warp-mcp-debug]。固定来源没有描述单个工具级别（而非 server 级别）的重命名、过滤或改名冲突处理，按缺口处理 [@ref-warp-profiles-mcp]。

## 诊断 {#mcp-diagnostics}

- **看日志**：在 MCP servers 页面对某个 server 点 **View Logs** 查看错误与消息 [@ref-warp-mcp-debug]。
- **日志文件位置**：macOS `$HOME/Library/Group Containers/2BBY89MBSN.dev.warp/Library/Application Support/dev.warp.Warp-Stable/mcp`；Windows `%LOCALAPPDATA%\warp\Warp\data\logs\mcp`；Linux `${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/mcp` [@ref-warp-mcp-logs]。
- **认证问题**：删除本地 MCP 认证文件 `rm -rf ~/.mcp-auth` 后重新登录（会清掉全部本地 MCP token）；仍不行则改用 CLI 型配置、把 token 放进环境变量 [@ref-warp-mcp-debug]。
- **分享日志前**要去掉敏感信息，日志可能含 API key [@ref-warp-mcp-debug]。

未能验证的部分：MCP 连接的请求超时、重连与重试策略，缓存行为，以及 prompts 能力是否可用，固定来源均未描述 [@ref-warp-mcp-debug]。
