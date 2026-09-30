---
schema_version: 3
record_kind: production
edition_id: devin-cli-mcp-v1
harness_id: devin
topic: mcp
title: "Devin CLI 的 MCP：配置入口、传输、认证、能力与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-devin-mcpc-file, ref-devin-mcp-how, ref-devin-ext-how]
  - section_id: mcp-entry-definition
    surface_ids: [cli]
    source_refs: [ref-devin-mcpc-file, ref-devin-configfile-locations, ref-devin-precedence-root, ref-devin-precedence-merge, ref-devin-mcpc-cli, ref-devin-cmd-mcp, ref-devin-mcpc-options, ref-devin-mcp-example, ref-devin-mcpc-examples, ref-devin-mcpc-prereg, ref-devin-mcpc-secrets]
  - section_id: mcp-transport-auth
    surface_ids: [cli]
    source_refs: [ref-devin-mcpc-options, ref-devin-mcpc-trouble, ref-devin-mcpc-auth, ref-devin-mcpc-prereg, ref-devin-mcpc-resource, ref-devin-mcp-auth, ref-devin-import-cursor, ref-devin-import-opencode, ref-devin-import-zed]
  - section_id: mcp-lifecycle-capabilities
    surface_ids: [cli]
    source_refs: [ref-devin-mcp-how, ref-devin-mcp-prompts, ref-devin-mcpc-disable, ref-devin-mcp-disable, ref-devin-mcpc-auth, ref-devin-mcpc-prompts, ref-devin-hookl-tools]
  - section_id: mcp-exposure-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-mcp-perms, ref-devin-perm-mcp, ref-devin-mcpc-perms, ref-devin-mcpc-trouble, ref-devin-ts-mcp, ref-devin-ts-registry, ref-devin-mcpc-org, ref-devin-cmd-mcp, ref-devin-mcpc-cli, ref-devin-cmd-ext, ref-devin-tr-mcp, ref-devin-tr-net]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-devin-mcpc-file, ref-devin-configfile-locations, ref-devin-precedence-root, ref-devin-precedence-merge, ref-devin-mcpc-cli, ref-devin-cmd-mcp, ref-devin-mcpc-options, ref-devin-mcp-example, ref-devin-mcpc-examples, ref-devin-mcpc-prereg, ref-devin-mcpc-secrets]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-devin-mcpc-file, ref-devin-configfile-locations, ref-devin-precedence-root, ref-devin-precedence-merge, ref-devin-mcpc-cli, ref-devin-cmd-mcp, ref-devin-mcpc-options, ref-devin-mcp-example, ref-devin-mcpc-examples, ref-devin-mcpc-prereg, ref-devin-mcpc-secrets]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-devin-mcpc-options, ref-devin-mcpc-trouble, ref-devin-mcpc-auth, ref-devin-mcpc-prereg, ref-devin-mcpc-resource, ref-devin-mcp-auth, ref-devin-import-cursor, ref-devin-import-opencode, ref-devin-import-zed]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-devin-mcpc-options, ref-devin-mcpc-trouble, ref-devin-mcpc-auth, ref-devin-mcpc-prereg, ref-devin-mcpc-resource, ref-devin-mcp-auth, ref-devin-import-cursor, ref-devin-import-opencode, ref-devin-import-zed]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-capabilities
        status: partial
        source_refs: [ref-devin-mcp-how, ref-devin-mcp-prompts, ref-devin-mcpc-disable, ref-devin-mcp-disable, ref-devin-mcpc-auth, ref-devin-mcpc-prompts, ref-devin-hookl-tools]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-capabilities
        status: partial
        source_refs: [ref-devin-mcp-how, ref-devin-mcp-prompts, ref-devin-mcpc-disable, ref-devin-mcp-disable, ref-devin-mcpc-auth, ref-devin-mcpc-prompts, ref-devin-hookl-tools]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure-diagnostics
        status: answered
        source_refs: [ref-devin-mcp-perms, ref-devin-perm-mcp, ref-devin-mcpc-perms, ref-devin-mcpc-trouble, ref-devin-ts-mcp, ref-devin-ts-registry, ref-devin-mcpc-org, ref-devin-cmd-mcp, ref-devin-mcpc-cli, ref-devin-cmd-ext, ref-devin-tr-mcp, ref-devin-tr-net]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure-diagnostics
        status: partial
        source_refs: [ref-devin-mcp-perms, ref-devin-perm-mcp, ref-devin-mcpc-perms, ref-devin-mcpc-trouble, ref-devin-ts-mcp, ref-devin-ts-registry, ref-devin-mcpc-org, ref-devin-cmd-mcp, ref-devin-mcpc-cli, ref-devin-cmd-ext, ref-devin-tr-mcp, ref-devin-tr-net]
---

## 固定来源与范围 {#mcp-scope}

固定来源是官方文档站 `docs.devin.ai` 的 Devin CLI markdown 快照：`cli/extensibility/mcp/overview.md`、`cli/extensibility/mcp/configuration.md`、`cli/extensibility/configuration.md`、`cli/reference/configuration/config-file.md`、`cli/reference/configuration/global-vs-local.md`、`cli/reference/configuration/read-config-from.md`、`cli/reference/commands.md`、`cli/reference/permissions.md`、`cli/enterprise/team-settings.md`、`cli/extensibility/hooks/lifecycle-hooks.md`、`cli/troubleshooting.md`。页面未标注软件版本，只在 MCP 文件位置处区分 v3000.3（Local 3.6）前后 [@ref-devin-mcpc-file]；全章为来源级知识。

MCP（Model Context Protocol）把外部工具服务器接进 CLI：配置好的 server，其工具对 agent 而言与内置工具同等可用，agent 能发现有哪些工具并按需调用 [@ref-devin-mcp-how]。整体处理链是"配置 server → 需要时启动 server 进程 → 发现工具 → agent 调用并回流结果" [@ref-devin-mcp-how]。它与 rules、skills、subagents、hooks、plugins 并列，属于扩展面的一类 [@ref-devin-ext-how]。

## 配置入口与 server 定义 {#mcp-entry-definition}

**mcp.entry**：自 v3000.3（Local 3.6）起，MCP server 存在专用文件里，分三个层级 [@ref-devin-mcpc-file][@ref-devin-configfile-locations]：

| 层级 | 文件 | 共享性 |
| - | - | - |
| 用户 | `~/.config/devin/mcp_config.json`（Windows `%APPDATA%\devin\mcp_config.json`） | 否，跨所有项目 |
| 项目 | `.devin/mcp_config.json` | 是（提交，随版本库共享） |
| 项目本地 | `.devin/mcp_config.local.json` | 否（自动 gitignore，放个人密钥） |

v3000.3 之前 `mcpServers` 写在主配置文件（`~/.config/devin/config.json`、`.devin/config.json`、`.devin/config.local.json`）里；新版本启动时会把找到的 `mcpServers` 条目自动迁移到专用文件 [@ref-devin-mcpc-file]。项目文件从项目根加载，项目根由向上查找 `.git` 或 `.jj` 目录确定；monorepo 里嵌套的 `.devin/` 以后者优先 [@ref-devin-precedence-root]。多层级同名 server 按名字合并，高优先级覆盖低优先级 [@ref-devin-precedence-merge]。

命令行是另一条入口，`devin mcp add NAME` 默认写 **local** 作用域（`.devin/mcp_config.local.json`，gitignored），`-s/--scope local|project|user` 改变落点 [@ref-devin-mcpc-cli][@ref-devin-cmd-mcp]：

```bash
devin mcp add github -- npx -y @modelcontextprotocol/server-github   # stdio：-- 之后是命令
devin mcp add -s project notion https://mcp.notion.com/mcp           # HTTP：位置参数给 URL
devin mcp add -s project sentry https://mcp.sentry.dev/mcp
devin mcp add -e GITHUB_TOKEN=ghp_xxx github -- npx -y @modelcontextprotocol/server-github
```

`devin mcp add` 的完整选项：`-t/--transport stdio|http`、`-s/--scope`、`--url URL`、`--command CMD`、`-e/--env KEY=VALUE`（可重复）、`-H/--header "HEADER: VALUE"`（可重复）、`--scopes SCOPE,SCOPE`、`--oauth-resource RESOURCE` [@ref-devin-cmd-mcp]。

**mcp.definition**：server 定义分两类 [@ref-devin-mcpc-options]：

| stdio（本地命令） | 类型 | 必需 | 说明 |
| - | - | - | - |
| `command` | string | 是 | 要运行的可执行文件 |
| `args` | string[] | 否 | 命令行参数 |
| `env` | object | 否 | 注入的环境变量 |
| `disabled` | boolean | 否 | `true` 时跳过该 server |

| 远程（Streamable HTTP） | 类型 | 必需 | 说明 |
| - | - | - | - |
| `url` | string | 是 | MCP 端点 URL |
| `transport` | string | 否 | `"http"`（URL 类 server 的默认）或 `"sse"`；为 `"http"` 或省略时先试 Streamable HTTP，遇非认证类 4xx 回退 SSE |
| `headers` | object | 否 | 自定义请求头 |
| `oauthClientId` | string | 否 | 预注册 OAuth client ID（不支持 DCR 的服务商，如 GitHub） |
| `oauthClientSecret` | string | 否 | OAuth client secret（机密客户端），与 `oauthClientId` 配对 |
| `oauthResource` | string | 否 | 覆盖 RFC 8707 `resource` 参数（默认 server URL；空串 `""` 表示省略） |
| `disabled` | boolean | 否 | 跳过该 server |

项目级最小示例（stdio，来自官方 overview 的 GitHub 例子）[@ref-devin-mcp-example]：

```json
// .devin/mcp_config.local.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_xxx" }
    }
  }
}
```

HTTP + OAuth 的写法在官方配置页给出的形状是 `{"url": "https://mcp.notion.com/mcp", "transport": "http"}`，加好后运行 `devin mcp login notion` [@ref-devin-mcpc-examples]。变量展开：OAuth 字段支持 `${env:VAR}` 与 `${file:/path}`，官方建议密钥用 `${env:VAR}` 或放进 gitignored 的 `.devin/mcp_config.local.json` [@ref-devin-mcpc-prereg][@ref-devin-mcpc-secrets]。`command`/`args`/`env` 是否同样支持 `${...}` 展开，来源没有写；partial。

## 传输与认证 {#mcp-transport-auth}

**mcp.transport**：两类传输。**stdio** 由 CLI 启动本地进程（`command` + `args`） [@ref-devin-mcpc-options]。**远程**默认走 Streamable HTTP（给 URL 即推断为 HTTP），若服务端返回非认证类 4xx（如 404/405）会在**同一 URL** 上回退到旧式 SSE；401 或带 `WWW-Authenticate` 的权限不足 403 不触发回退而是直接报出以便认证；连接错误、超时与 5xx 也不回退 [@ref-devin-mcpc-options][@ref-devin-mcpc-trouble]。若 SSE 端点在别的路径（如 `/sse`），显式设 `"transport": "sse"` 直连，避免先试 HTTP [@ref-devin-mcpc-trouble]。两种传输都失败时，错误信息会带上两次尝试的细节 [@ref-devin-mcpc-trouble]。

**mcp.auth**：远程 OAuth server 的流程是 `devin mcp login NAME` 打开浏览器授权，token 本地保存并自动刷新；`devin mcp logout NAME` 删除已存令牌 [@ref-devin-mcpc-auth]。登录时可请求指定 scope：`devin mcp login notion --scopes read,write` [@ref-devin-mcpc-auth]。多数 server 支持动态客户端注册（DCR），CLI 自动注册自己；不支持 DCR 的（如 GitHub）需提供 `oauthClientId`，机密客户端再加 `oauthClientSecret`（例如 `"oauthClientSecret": "${env:MY_MCP_CLIENT_SECRET}"`），设置 `oauthClientId` 后会跳过 DCR [@ref-devin-mcpc-prereg]。`oauthResource` 有三种行为：不设 → 用 server URL；非空 → 替换为给定值（如某个 application ID URI）；空串 `""` → 在授权 URL 与 token 交换里完全省略 `resource` 参数（给拒绝该参数的服务商）[@ref-devin-mcpc-resource]。OAuth 客户端凭据**不是**每请求凭据——若服务端要静态 token，用 HTTP 的 `headers` 或 stdio 的 `env` [@ref-devin-mcpc-prereg]。每个 MCP 客户端各自认证：Windsurf 或 Claude Code 里的 token 不与 Devin CLI 共享，必须单独 `devin mcp login` [@ref-devin-mcp-auth]。凭据过期或被管理员吊销后 server 进入 auth-required，其工具与 prompt 都不可用，恢复办法是 `devin mcp logout NAME && devin mcp login NAME`；改了 `oauthClientId`/`oauthClientSecret`/`oauthResource` 后同理（旧凭据不会被复用）[@ref-devin-mcpc-auth]。若 server 支持 OAuth，首次使用时也会被提示自动认证 [@ref-devin-mcpc-auth]。编辑器集成（ACP）会暴露同样的 auth-required 状态并提供重新认证动作，等价于 `logout` + `login` [@ref-devin-mcpc-auth]。

导入也会带来 server 定义：Cursor 的 `.cursor/mcp.json` [@ref-devin-import-cursor]、OpenCode 的 `opencode.json`（用 `environment` 键、`enabled` 标志与标准格式相反，导入时自动转换）[@ref-devin-import-opencode]、Zed 的 `.zed/settings.json`（用 `context_servers` 键）[@ref-devin-import-zed]。

## 生命周期与能力 {#mcp-lifecycle-capabilities}

**mcp.lifecycle**：配置好的 server 在需要时由 CLI 启动进程 [@ref-devin-mcp-how]。启动时会后台预热连接：只有已连接的 server 才会贡献它发布的斜杠命令，但命令调用是惰性解析的——即使没被广播过，输入 `/mcp__SERVER__PROMPT` 也会按需连上该 server [@ref-devin-mcp-prompts]。`disabled: true`（或 `devin mcp disable NAME`）的 server 在工具发现时被跳过，**不启动**其进程，配置、环境变量与 OAuth 凭据都保留，便于临时降启动开销或隔离问题 [@ref-devin-mcpc-disable][@ref-devin-mcp-disable]。OAuth token 由 CLI 自动刷新 [@ref-devin-mcpc-auth]。缺口：连接超时、失败重连/重试次数、工具列表缓存时长与 server 崩溃后的行为均未记载；partial。

**mcp.capabilities**：逐项看。

- **tools**：可用。agent 像用内置工具一样发现并调用，外部服务的结果回流到会话 [@ref-devin-mcp-how]。
- **prompts**：可用。声明了 MCP `prompts` 能力的 server 把每个 prompt 暴露成 `/mcp__SERVER__PROMPT` 斜杠命令；命令名内嵌 server 名，因此在 `mcpServers` 里改名会同步改名其 prompt 命令；命令出现在命令面板的 **MCP** 分类下，用 server 发布的标题/描述与参数提示展示（必填参数用尖括号形式、可选参数用方括号形式）[@ref-devin-mcp-prompts][@ref-devin-mcpc-prompts]。参数按**位置**映射：第一个词给第一个声明参数，依此类推，**最后一个**声明参数吃掉剩余整串文本，因此自由文本尾部不会丢；prompt 未声明任何参数时，用户输入整体追加到展开结果后 [@ref-devin-mcp-prompts]。发送命令后 CLI 从 server 取回 prompt 并用其返回的消息替换本轮用户消息 [@ref-devin-mcp-prompts]。prompt 展开发生在 agent 侧而非终端 UI，因此 ACP 宿主（Zed、JetBrains）也能列出这些命令 [@ref-devin-mcp-prompts]。
- **resources**：文档没有发现/使用说明；只有 hook 可匹配的工具名清单里出现 MCP 管理类工具 `mcp_list_servers`、`mcp_list_tools`、`mcp_call_tool`、`mcp_read_resource` [@ref-devin-hookl-tools]。resources 是否能被 agent 发现、以什么形式暴露，未记载。因此 capabilities 整体按 partial 阅读。

## 暴露、权限与诊断 {#mcp-exposure-diagnostics}

**mcp.exposure**：MCP 工具以 `mcp__SERVER__TOOL` 命名空间出现（例如 `github` server 的 `create_issue` 变成 `mcp__github__create_issue`），受与内置工具相同的权限系统约束 [@ref-devin-mcp-perms][@ref-devin-perm-mcp]。权限匹配有三种粒度 [@ref-devin-mcpc-perms]：

| 模式 | 匹配 |
| - | - |
| `mcp__server__tool` | 某 server 上的某个具体工具 |
| `mcp__server__*` | 某 server 上的所有工具 |
| `mcp__*` | 所有 MCP 工具 |

默认 MCP 工具需要批准，加入 `permissions.allow` 才免提示 [@ref-devin-mcpc-trouble]。交互授权时，针对某个 MCP 工具的提示还会给出更宽的 server 级选项（本会话允许此工具 / 永久允许此工具 / 本会话允许该 server 所有工具 / 永久允许该 server 所有工具）[@ref-devin-mcpc-perms]。企业侧两层：Team Settings 可整体开关 MCP、设 allowlist；更推荐用 **MCP registry**——可配多个 registry URL，server 出现在**任意一个**里即被允许（取并集），开启强制后用户只能连 registry 里的 server，不在其中的 server 不连接、工具不出现 [@ref-devin-ts-mcp][@ref-devin-ts-registry][@ref-devin-mcpc-org]。

**mcp.diagnostics**：分层入口。

- **配置被读取 / server 状态**：`devin mcp list` 列出所有已配 server，`devin mcp get NAME` 看细节，`devin mcp enable/disable` 改启用状态，`devin mcp remove NAME` 删除 [@ref-devin-cmd-mcp][@ref-devin-mcpc-cli]。会话内 `/mcp` 列出已配 server 及其状态（命令参考的 Extensibility 一类）[@ref-devin-cmd-ext]。
- **server 起不来**：离开 CLI 直接跑命令验证（如 `npx -y @modelcontextprotocol/server-github`），并检查所需环境变量是否齐 [@ref-devin-mcpc-trouble][@ref-devin-tr-mcp]。
- **工具不出现**：等 server 初始化、确认配置正确、确认企业允许 MCP [@ref-devin-tr-mcp]；也可以让 agent 去列 MCP server 与工具 [@ref-devin-mcpc-trouble]。
- **认证失败**：出现 `Auth required`/`AuthRequired` 时跑 `devin mcp login NAME`；怀疑凭据时先 `logout` 再 `login` [@ref-devin-mcpc-trouble]。
- **OAuth resource 报错**：服务商拒绝 `resource` 参数时设 `"oauthResource": ""` 再重新认证 [@ref-devin-mcpc-trouble]。
- **权限被拒**：改 permissions 配置，把工具加进 `allow` [@ref-devin-mcpc-trouble]。
- **请求层**：全局日志（含 HTTP 请求生命周期）用 `RUST_LOG`/`CHISEL_LOG_STDOUT` 打开，日志文件在 `~/.local/share/devin/cli/logs/`（Windows `%APPDATA%\devin\cli\logs\`）[@ref-devin-tr-net]。

缺口：没有把"配置已读取 / 已连接 / 工具可见 / 调用成功"拆成四个独立输出的命令；`devin mcp get` 与 `/mcp` 的输出字段文档未展开。partial。
