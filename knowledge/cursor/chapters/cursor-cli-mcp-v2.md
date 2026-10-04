---
schema_version: 3
record_kind: production
edition_id: cursor-cli-mcp-v2
harness_id: cursor
topic: mcp
title: Cursor CLI 的 MCP：入口、传输、认证、审批、管控与诊断
sections:
  - section_id: mcp-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-transports
      - ref-cur-mcp-locations
      - ref-cur-mcp-cli-using
      - ref-cur-mcp-cli-parameters
      - ref-cur-mcp-cli-acp
      - ref-cur-mcp-ent-trust
      - ref-cur-mcp-cl-mgmt
  - section_id: mcp-entry
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-locations
      - ref-cur-mcp-cli-using
      - ref-cur-mcp-cli-parameters
      - ref-cur-mcp-cli-slash
      - ref-cur-mcp-cli-acp
      - ref-cur-mcp-plugins-manage
      - ref-cur-mcp-plugins-deeplink
      - ref-cur-mcp-team-dist
      - ref-cur-mcp-cl-dupe
      - ref-cur-mcp-extension-api
  - section_id: mcp-definition
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-json-servers
      - ref-cur-mcp-stdio-fields
      - ref-cur-mcp-stdio-envfile
      - ref-cur-mcp-interp
      - ref-cur-mcp-interp-examples
      - ref-cur-mcp-cl-interp
      - ref-cur-mcp-plugins-standard
      - ref-cur-mcp-ent-command
      - ref-cur-mcp-ent-command-wildcards
  - section_id: mcp-transport
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-transports
      - ref-cur-mcp-json-servers
      - ref-cur-mcp-stdio-envfile
      - ref-cur-mcp-cli-acp
      - ref-cur-mcp-cli-acp-session
  - section_id: mcp-auth
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-auth
      - ref-cur-mcp-json-servers
      - ref-cur-mcp-static-oauth
      - ref-cur-mcp-oauth-fields
      - ref-cur-mcp-redirect
      - ref-cur-mcp-cli-parameters
      - ref-cur-mcp-cl-mgmt
      - ref-cur-mcp-cl-interp
      - ref-cur-mcp-cl-oauth-ssh
      - ref-cur-mcp-sdk-cloud-auth-reuse
      - ref-cur-mcp-security
  - section_id: mcp-lifecycle
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-cl-startup
      - ref-cur-mcp-cl-mgmt
      - ref-cur-mcp-cli-parameters-manage
      - ref-cur-mcp-cli-approve-flag
      - ref-cur-mcp-cl-global-approve
      - ref-cur-mcp-cl-dupe
      - ref-cur-mcp-faq-disable
      - ref-cur-mcp-faq-crash
      - ref-cur-mcp-faq-update
      - ref-cur-mcp-cl-acp-trust
  - section_id: mcp-capabilities
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-protocol-support
      - ref-cur-mcp-apps
      - ref-cur-mcp-chat
      - ref-cur-mcp-cli-parameters
      - ref-cur-mcp-cli-using
      - ref-cur-mcp-safety-context
  - section_id: mcp-exposure
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-tool-approval
      - ref-cur-mcp-runmode
      - ref-cur-mcp-runmodes
      - ref-cur-mcp-runmodes-autoreview
      - ref-cur-mcp-cli-permissions
      - ref-cur-mcp-cl-permissions-json
      - ref-cur-mcp-cl-auto-review
      - ref-cur-mcp-cl-governance
  - section_id: mcp-admin
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-allowlist
      - ref-cur-mcp-ent-allowlist
      - ref-cur-mcp-ent-allowlist-syntax
      - ref-cur-mcp-ent-order
      - ref-cur-mcp-ent-command
      - ref-cur-mcp-ent-command-wildcards
      - ref-cur-mcp-ent-url
      - ref-cur-mcp-ent-tool-controls
      - ref-cur-mcp-ent-network-controls
      - ref-cur-mcp-user-ext
  - section_id: mcp-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-mcp-faq-debug
      - ref-cur-mcp-faq-crash
      - ref-cur-mcp-faq-update
      - ref-cur-mcp-cli-parameters
      - ref-cur-mcp-cl-scope
      - ref-cur-mcp-cl-false-disc
      - ref-cur-mcp-cl-refresh
      - ref-cur-mcp-cl-acp-trust
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-cur-mcp-locations
          - ref-cur-mcp-cli-using
          - ref-cur-mcp-cli-parameters
          - ref-cur-mcp-cli-slash
          - ref-cur-mcp-cli-acp
      - surface_ids: [cursor]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-cur-mcp-locations
          - ref-cur-mcp-plugins-manage
          - ref-cur-mcp-plugins-deeplink
          - ref-cur-mcp-team-dist
          - ref-cur-mcp-extension-api
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs:
          - ref-cur-mcp-json-servers
          - ref-cur-mcp-stdio-fields
          - ref-cur-mcp-stdio-envfile
          - ref-cur-mcp-interp
          - ref-cur-mcp-cl-interp
      - surface_ids: [cursor]
        section_id: mcp-definition
        status: answered
        source_refs:
          - ref-cur-mcp-json-servers
          - ref-cur-mcp-stdio-fields
          - ref-cur-mcp-interp
          - ref-cur-mcp-interp-examples
          - ref-cur-mcp-plugins-standard
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs:
          - ref-cur-mcp-transports
          - ref-cur-mcp-json-servers
          - ref-cur-mcp-stdio-envfile
          - ref-cur-mcp-cli-acp
          - ref-cur-mcp-cli-acp-session
      - surface_ids: [cursor]
        section_id: mcp-transport
        status: answered
        source_refs:
          - ref-cur-mcp-transports
          - ref-cur-mcp-json-servers
          - ref-cur-mcp-stdio-envfile
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs:
          - ref-cur-mcp-auth
          - ref-cur-mcp-cli-parameters
          - ref-cur-mcp-cl-mgmt
          - ref-cur-mcp-cl-interp
          - ref-cur-mcp-cl-oauth-ssh
      - surface_ids: [cursor]
        section_id: mcp-auth
        status: partial
        source_refs:
          - ref-cur-mcp-auth
          - ref-cur-mcp-static-oauth
          - ref-cur-mcp-oauth-fields
          - ref-cur-mcp-redirect
          - ref-cur-mcp-sdk-cloud-auth-reuse
          - ref-cur-mcp-security
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs:
          - ref-cur-mcp-cl-startup
          - ref-cur-mcp-cl-mgmt
          - ref-cur-mcp-cli-parameters-manage
          - ref-cur-mcp-cli-approve-flag
          - ref-cur-mcp-cl-global-approve
          - ref-cur-mcp-cl-dupe
          - ref-cur-mcp-faq-crash
          - ref-cur-mcp-cl-acp-trust
      - surface_ids: [cursor]
        section_id: mcp-lifecycle
        status: partial
        source_refs:
          - ref-cur-mcp-faq-disable
          - ref-cur-mcp-faq-crash
          - ref-cur-mcp-faq-update
          - ref-cur-mcp-cl-global-approve
          - ref-cur-mcp-cl-dupe
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs:
          - ref-cur-mcp-protocol-support
          - ref-cur-mcp-chat
          - ref-cur-mcp-cli-parameters
          - ref-cur-mcp-cli-using
      - surface_ids: [cursor]
        section_id: mcp-capabilities
        status: answered
        source_refs:
          - ref-cur-mcp-protocol-support
          - ref-cur-mcp-apps
          - ref-cur-mcp-chat
          - ref-cur-mcp-safety-context
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs:
          - ref-cur-mcp-runmode
          - ref-cur-mcp-runmodes
          - ref-cur-mcp-runmodes-autoreview
          - ref-cur-mcp-cli-permissions
          - ref-cur-mcp-cl-permissions-json
          - ref-cur-mcp-cl-auto-review
          - ref-cur-mcp-cl-governance
      - surface_ids: [cursor]
        section_id: mcp-exposure
        status: answered
        source_refs:
          - ref-cur-mcp-tool-approval
          - ref-cur-mcp-runmode
          - ref-cur-mcp-runmodes
          - ref-cur-mcp-cl-governance
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs:
          - ref-cur-mcp-cli-parameters
          - ref-cur-mcp-cl-scope
          - ref-cur-mcp-cl-false-disc
          - ref-cur-mcp-cl-refresh
          - ref-cur-mcp-faq-crash
          - ref-cur-mcp-cl-acp-trust
      - surface_ids: [cursor]
        section_id: mcp-diagnostics
        status: answered
        source_refs:
          - ref-cur-mcp-faq-debug
          - ref-cur-mcp-faq-crash
          - ref-cur-mcp-faq-update
---

## 固定来源与共页边界 {#mcp-scope}

本章的固定来源是 2026-09-30 抓取的 Cursor 官方文档快照（2026-10-03 巡检另按 `sdk/typescript.md` 快照 `snapshot-source-cur-sdk-typescript-doc-20261003` 与 `enterprise/model-and-integration-management.md` 快照 `snapshot-source-cur-ent-model-management-doc-20261003` 复核受影响小节）：MCP 主页面 `mcp.md`、CLI 侧 `cli/using.md`、`cli/reference/parameters.md`、`cli/acp.md`、`cli/reference/slash-commands.md`、`cli/reference/permissions.md`、`cli/changelog.md` [@ref-cur-mcp-cli-using][@ref-cur-mcp-cli-parameters][@ref-cur-mcp-cli-acp] 与企业侧 `enterprise/model-and-integration-management.md` [@ref-cur-mcp-ent-trust]，以及 `plugins.md` 与 `agent/security/run-modes.md`。登记来源没有给出适用软件版本号，本章按来源级知识阅读，不做软件版本映射。

两个界面共享同一套配置文件：`mcp.md` 定义 `mcp.json` 的格式、字段与插值 [@ref-cur-mcp-locations][@ref-cur-mcp-transports]，`cli/using.md` 明确 CLI「会自动检测并遵循你的 `mcp.json` 配置，启用与编辑器相同的 MCP server 与工具」[@ref-cur-mcp-cli-using]。因此配置格式、字段、插值规则按共享机制写一次，入口、审批、诊断与管控的交互路径按界面分别记录。`mcp.md` 是多形态共享页：其中的 Customize 侧栏、Output 面板、桌面端 OAuth 回调等属于 `cursor`（IDE/桌面）界面，`cli/using.md`、`cli/reference/parameters.md`、`cli/acp.md` 与 `cli/changelog.md` 描述 `cli`（Cursor CLI）界面的 `/mcp` 与 `agent mcp` 行为 [@ref-cur-mcp-cl-mgmt]。

## MCP 的配置入口与作用域 {#mcp-entry}

Cursor 有四个互不替代的入口：配置文件（`mcp.json`）、应用内管理页（Customize）、程序化注册（Extension API）与团队/企业分发。

**配置文件。** 项目级写在项目里的 `.cursor/mcp.json`（只对该项目生效），全局级写在 `~/.cursor/mcp.json`（对你的所有项目生效）[@ref-cur-mcp-locations]。CLI 读取同一个文件 [@ref-cur-mcp-cli-using]；`agent mcp` 的子命令针对的正是「`.cursor/mcp.json` 或 `~/.cursor/mcp.json` 中配置的 server」[@ref-cur-mcp-cli-parameters]。IDE 侧不写文件也可以安装：在 Customize 侧栏（Marketplace 条目「Add to Cursor」）一次安装或开关个人与团队分发的 server [@ref-cur-mcp-plugins-manage]。

**CLI 会话内入口。** 交互式会话里用 `/mcp [list|list-tools] [identifier]` 管理 server 与列工具 [@ref-cur-mcp-cli-slash]；同一份配置也有等价的命令行形式 `agent mcp list` / `list-tools` / `enable` / `disable` / `login` [@ref-cur-mcp-cli-parameters]。ACP 模式下，客户端使用项目级或用户级 `.cursor/mcp.json`：从项目目录启动 `agent` 并审批要使用的 server；由 Cursor dashboard 配置的团队级 MCP server 在 ACP 模式**不支持** [@ref-cur-mcp-cli-acp]。

**分发入口（团队/企业）。** 管理员在 Dashboard 的 Plugins & MCPs 维护 Team MCP server，并把已有 server「Add to Team Marketplace」链接到 Default team marketplace，使 Agent Window、IDE 与 CLI 的成员可以安装和配置；链接本身不会为任何人安装或启用，成员仍需自行安装并认证 [@ref-cur-mcp-team-dist]。此外插件可以携带自己的 `mcp.json`（Agent Plugin 用根 `plugin.json`，Cursor Plugin 用 `.cursor-plugin/plugin.json`），也可以用 MCP Apps deeplink 分享配置：`cursor://anysphere.cursor-deeplink/mcp/install?name=$NAME&config=$BASE64_ENCODED_CONFIG` [@ref-cur-mcp-plugins-deeplink]。

**程序化注册。** 企业或自动化场景可用扩展 API `vscode.cursor.mcp.registerServer()` 动态注册 MCP server，不改写 `mcp.json` [@ref-cur-mcp-extension-api]。

**同名的 scope 选择。** 项目配置覆盖用户配置；当同一个远程 server 同时出现在多个 scope（如 `~/.cursor/mcp.json` 与项目的 `.cursor/mcp.json`）时，CLI 只运行一个实例，并在 `/mcp` 的 server 详情里的 **Configure Scope** 标签页选择哪个 scope 的配置生效，该选择按项目保存 [@ref-cur-mcp-cl-dupe]。

**缺口与已检查入口。** 登记来源只给出「项目」与「全局」两层，没有第三层「工作区级」`mcp.json`，也没有可用环境变量改写配置目录的说明；项目信任（workspace trust）对 MCP server 加载的影响只在 CLI changelog 里以「全局 server 免审批、项目级仍需审批」的形式出现，见「生命周期」一节。已检查 `mcp.md` 的 Configuration locations、`cli/using.md`、`cli/reference/parameters.md`、`cli/acp.md`、`plugins.md` 与 `cli/changelog.md`。

## Server 定义：第一方字段与变量插值 {#mcp-definition}

`mcp.json` 的顶层是一个 `mcpServers` 对象，键是 server 名，值是 server 定义。官方给的最小 stdio 与远程示例如下 [@ref-cur-mcp-json-servers]：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "mcp-server"],
      "env": {
        "API_KEY": "value"
      }
    }
  }
}
```

```json
{
  "mcpServers": {
    "server-name": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "API_KEY": "value"
      }
    }
  }
}
```

STDIO server 的字段表（官方逐字给出）[@ref-cur-mcp-stdio-fields]：

| 字段      | 必填 | 说明                                                 | 示例                                      |
| :-------- | :--- | :--------------------------------------------------- | :---------------------------------------- |
| `type`    | 是   | 连接类型                                             | `"stdio"`                                 |
| `command` | 是   | 启动 server 的命令；必须在系统 PATH 上，或写完整路径 | `"npx"`、`"node"`、`"python"`、`"docker"` |
| `args`    | 否   | 传给命令的参数数组                                   | `["server.py", "--port", "3000"]`         |
| `env`     | 否   | server 的环境变量                                    | `{"API_KEY": "${env:api-key}"}`           |
| `envFile` | 否   | 额外加载的环境变量文件路径                           | `".env"`、`"${workspaceFolder}/.env"`     |

`envFile` 只对 STDIO server 有效，远程（HTTP/SSE）server 不支持 `envFile`，要用插值从 shell/系统环境取变量 [@ref-cur-mcp-stdio-envfile]。远程 server 使用 `url`（与可选的 `headers`）[@ref-cur-mcp-json-servers]。

**变量插值。** Cursor 在 `command`、`args`、`env`、`url`、`headers` 五个字段上解析变量，支持的语法为 [@ref-cur-mcp-interp]：

- `${env:NAME}` —— 环境变量
- `${userHome}` —— 用户主目录
- `${workspaceFolder}` —— 项目根目录（含 `.cursor/mcp.json` 的目录）
- `${workspaceFolderBasename}` —— 项目根目录名
- `${pathSeparator}` 与 `${/}` —— 操作系统路径分隔符

例如（依据官方示例）[@ref-cur-mcp-interp-examples]：

```json
{
  "mcpServers": {
    "remote-server": {
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:MY_SERVICE_TOKEN}"
      }
    }
  }
}
```

CLI 侧另有记录说明 `${VAR}` 形式的占位符在 MCP 配置中各处都会展开 [@ref-cur-mcp-cl-interp]。插件里的 `mcp.json` 不展开 Agent Plugins 标准的 `${PLUGIN_ROOT}` 与 `${PLUGIN_DATA}`，要用 `${CURSOR_PLUGIN_ROOT}` 表示插件根目录 [@ref-cur-mcp-plugins-standard]。企业允许清单在做匹配时，把本地 server 的 `command` 与全部 `args` 用空格连接成完整命令串 [@ref-cur-mcp-ent-command]（详见「企业允许清单与工具/网络管控」一节，其中给出通配写法 [@ref-cur-mcp-ent-command-wildcards]）。

**缺口。** 官方 STDIO 字段表把 `type` 列为必填，但同页所有 stdio JSON 示例都没有写 `type`，来源没有解释这种省略是否合法；远程 server 如何显式区分 SSE 与 Streamable HTTP 也没有字段说明（见「传输」一节）。`envFile` 的相对路径基准（相对项目根还是相对配置文件）未记录，`${workspaceFolder}` 在全局 `~/.cursor/mcp.json` 中如何取值也未说明。

## 传输：stdio、SSE 与 Streamable HTTP {#mcp-transport}

官方把传输能力归纳为三种 [@ref-cur-mcp-transports]：

| 传输              | 执行环境  | 部署              | 使用者 | 输入          | 认证  |
| :---------------- | :-------- | :---------------- | :----- | :------------ | :---- |
| `stdio`           | 本地      | Cursor 管理       | 单用户 | shell 命令    | 手动  |
| `SSE`             | 本地/远程 | 自己部署为 server | 多用户 | SSE 端点 URL  | OAuth |
| `Streamable HTTP` | 本地/远程 | 自己部署为 server | 多用户 | HTTP 端点 URL | OAuth |

配置形态对应两种：本地 server 用 `command` + `args`（+ `env`/`envFile`），远程 server 用 `url` + `headers` [@ref-cur-mcp-json-servers]。`envFile` 只对 STDIO 有效 [@ref-cur-mcp-stdio-envfile]。ACP 模式下，server 仍由项目级或用户级 `.cursor/mcp.json` 定义、从项目目录启动 `agent` 并审批 [@ref-cur-mcp-cli-acp]；ACP 客户端在 `session/new` 请求里通过 `mcpServers` 数组传入 server（官方最小客户端示例传的是空数组）[@ref-cur-mcp-cli-acp-session]。

**缺口。** 来源没有给出「显式声明某种远程传输」的字段或取值：示例只写 `url`，未说明 SSE 与 Streamable HTTP 是由 URL 形状推断还是有 `type` 字段可选；也没有代理、TLS、自签证书或超时的传输层说明。已检查 `mcp.md` 的 How it works / Using `mcp.json` / STDIO server configuration 与 `cli/acp.md`。

## 认证与凭据 {#mcp-auth}

手动认证通过环境变量与 header 完成：MCP server 用环境变量传 API key 与 token，Cursor 对有需要的 server 支持 OAuth [@ref-cur-mcp-auth]。最小 header 写法 [@ref-cur-mcp-json-servers]：

```json
{
  "mcpServers": {
    "remote-server": {
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:MY_SERVICE_TOKEN}"
      }
    }
  }
}
```

**静态 OAuth（远程 server）。** 当 provider 给你固定的 Client ID（可能还有 Client Secret）、要求预先登记 redirect URL（如 Figma、Linear），或不支持 OAuth 2.0 动态客户端注册时，在带 `url` 的条目上加 `auth` 对象 [@ref-cur-mcp-static-oauth]：

```json
{
  "mcpServers": {
    "oauth-server": {
      "url": "https://api.example.com/mcp",
      "auth": {
        "CLIENT_ID": "${env:MCP_CLIENT_ID}",
        "CLIENT_SECRET": "${env:MCP_CLIENT_SECRET}",
        "scopes": ["read", "write"]
      }
    }
  }
}
```

字段语义 [@ref-cur-mcp-oauth-fields]：`CLIENT_ID` 必填；`CLIENT_SECRET` 可选（provider 使用机密客户端时）；`scopes` 可选，省略时 Cursor 用 `/.well-known/oauth-authorization-server` 发现 `scopes_supported`。`auth` 的值支持与其他字段相同的插值，官方建议 Client ID/Secret 用环境变量而不是硬编码 [@ref-cur-mcp-cl-interp]。

**固定回调地址。** Cursor 使用固定的 OAuth redirect URL，需要按用户实际认证的界面在 provider 侧登记 [@ref-cur-mcp-redirect]：

- Web 与 Cursor Agents：`https://www.cursor.com/agents/mcp/oauth/callback`
- 桌面应用：`http://localhost:8787/callback`

server 通过 OAuth `state` 参数识别，因此这两条回调对所有 MCP server 通用 [@ref-cur-mcp-redirect]。

**CLI 登录流程。** `agent mcp login {identifier}` 对配置在 `.cursor/mcp.json` 或 `~/.cursor/mcp.json` 中的 server 发起认证 [@ref-cur-mcp-cli-parameters]；会话内 `/mcp` 的 server 详情可以登录、登出（登出会清除已保存的 OAuth 凭据）、启用与禁用 [@ref-cur-mcp-cl-mgmt]。从 SSH 会话认证远程 server 时，CLI 会显示端口转发指引 [@ref-cur-mcp-cl-oauth-ssh]。

**安全实践。** 用环境变量放密钥、不要把密钥写进文件；对敏感 server 优先本地 `stdio`；API key 只给最小必要权限 [@ref-cur-mcp-security]。

**SDK 云端运行的凭据复用有一条明确规则**：如果内联 server 定义没带 `auth` 或 `headers`，而该 server URL 此前已在 `cursor.com/agents` 授权过，那么用**个人 API token** 认证的运行会自动复用那些 OAuth token；但 **service account API key 不能回退到用户认证**，因为它不关联到具体用户。[@ref-cur-mcp-sdk-cloud-auth-reuse] 这解释了为什么同一份内联 MCP 定义在不同凭据类型下表现不同——差异在凭据是否绑定用户，而不是 server 定义本身。

**缺口。** 来源没有描述 OAuth token 的刷新时机、过期后行为、凭据在桌面/CLI 的存储位置与清理方式（只提到登出会清掉已存凭据）。CLI 侧的静态 OAuth `auth` 字段是否同样生效，来源未单独说明（该字段只在 `mcp.md` 出现，而 `mcp.json` 被两个界面共享）。已检查 `mcp.md` 的 Authentication / Static OAuth / Static redirect URL、`cli/reference/parameters.md` 的 MCP 小节、`sdk/typescript.md` 的 MCP servers 小节与 `cli/changelog.md`。

## 生命周期：启动、审批、禁用与失败处理 {#mcp-lifecycle}

**启动。** CLI 已把 MCP 加载移出首屏路径，server 配置与模型在多次运行之间缓存，因此启动不阻塞在 MCP 上 [@ref-cur-mcp-cl-startup]；headless（`-p`）运行会等待较慢的 stdio server，避免启动竞态导致工具缺失 [@ref-cur-mcp-cl-mgmt]。

**审批。** 使用 MCP 工具默认需要批准（见「可见性、审批与权限」）。CLI 提供全局选项 `--approve-mcps` 自动批准所有 MCP server [@ref-cur-mcp-cli-approve-flag]；按来源，来自 `~/.cursor/mcp.json` 的全局 server 免去每工作区提示，项目级 server 仍需批准 [@ref-cur-mcp-cl-global-approve]。

**启用与禁用。** CLI 用 `agent mcp enable {identifier}` 把 server 加入本地批准清单，用 `agent mcp disable {identifier}` 使其既不加载也不再提示审批 [@ref-cur-mcp-cli-parameters-manage]；IDE 侧在 Customize 里用开关切换，被禁用的 server 不会加载也不会出现在 chat 中 [@ref-cur-mcp-faq-disable]。

**同名 scope 去重。** 同一远程 server 出现在用户与项目配置中时只运行一个实例，冲突方由 `/mcp` 的 Configure Scope 按项目选定 [@ref-cur-mcp-cl-dupe]。

**崩溃与超时。** 某个 server 失败时：chat 显示错误、该工具调用标记为失败、可以重试或查日志，其它 MCP server 继续工作（Cursor 隔离 server 故障，避免一个 server 影响其他 server）[@ref-cur-mcp-faq-crash]。

**更新。** npm 类 server 的更新路径是：先从 Customize 移除、执行 `npm cache clean --force`、再重新添加以获得最新版本；自定义 server 则更新本地文件并重启 Cursor [@ref-cur-mcp-faq-update]。

**ACP 传入的 server。** 编辑器通过 Agent Client Protocol 传入的 MCP server 会被信任并加载，而不是被静默丢弃 [@ref-cur-mcp-cl-acp-trust]。

**缺口。** 来源没有给出连接超时数值、失败重连/退避策略、缓存有效期，也没有说明「禁用」状态存放在哪个文件里（只描述效果）。已检查 `mcp.md` 的三条 FAQ、`cli/reference/parameters.md` 的 MCP 小节与 `cli/changelog.md` 的 MCP 条目。

## 能力：tools、resources、prompts 与扩展 {#mcp-capabilities}

Cursor 声明支持的协议能力与扩展如下（官方逐字给出）[@ref-cur-mcp-protocol-support]：

| 能力         | 支持 | 说明                               |
| :----------- | :--- | :--------------------------------- |
| Tools        | 支持 | 供模型执行的函数                   |
| Prompts      | 支持 | 面向用户的模板消息与工作流         |
| Resources    | 支持 | 可读取与引用的结构化数据源         |
| Roots        | 支持 | server 发起的 URI/文件系统边界询问 |
| Elicitation  | 支持 | server 发起的、向用户索取补充信息  |
| Apps（扩展） | 支持 | MCP 工具返回的交互式 UI 视图       |

MCP Apps 遵循渐进增强：宿主不能渲染 app UI 时，同一个工具仍通过普通 MCP 响应工作 [@ref-cur-mcp-apps]。在 chat 中，Cursor 在相关时自动使用 **Available Tools** 里列出的 MCP 工具（包括 Plan Mode），也可以点名要某个工具；server 的启用/禁用决定它是否出现在 chat [@ref-cur-mcp-chat]。CLI 复用同一批 server 与工具 [@ref-cur-mcp-cli-using]，并用 `agent mcp list-tools {identifier}` 列出某个 server 的工具及其参数名 [@ref-cur-mcp-cli-parameters]。企业安全页把 MCP 定位为上下文富化：它把公司文档、内部 API、知识库带进 agent 上下文，但不像 hooks 那样承担策略执行 [@ref-cur-mcp-safety-context]。

**缺口。** 来源只说明能力「被支持」，没有描述 CLI 中 prompts、resources、roots、elicitation 的呈现与调用方式（`list-tools` 只覆盖 tools），也没有说明 resources/prompts 如何注入上下文；因此 CLI 界面此题为 partial。已检查 `mcp.md` 的 Protocol and extension support / MCP apps / Using MCP in chat、`cli/reference/parameters.md` 与 `cli/using.md`。

## 可见性、审批与权限 {#mcp-exposure}

**默认审批。** Cursor 默认在使用 MCP 工具之前请求批准，点击工具名旁的箭头可以查看参数 [@ref-cur-mcp-tool-approval]。

**Run Modes。** MCP 跟随与终端命令相同的 Run Modes：例如在 **Auto-review** 模式下，允许清单内的 MCP 工具直接运行，其余交给分类器 [@ref-cur-mcp-runmode]。Run Modes 决定 agent 对 shell 命令、MCP 工具与 Fetch 调用的自主程度，官方推荐的默认做法是 Auto-review：它执行已知安全的调用、能沙箱化时把 shell 命令放进沙箱、其余交给分类器复核 [@ref-cur-mcp-runmodes]。Auto-review 对每个调用按顺序检查：允许清单内的立即执行、能沙箱化的进沙箱、其余交给分类器；分类器可以放行、要求 agent 换做法，或让你批准 [@ref-cur-mcp-runmodes-autoreview]。

**CLI 权限令牌。** CLI 用 `Mcp(server:tool)` 形式的令牌控制可运行的 MCP 工具，`server` 取自 `mcp.json`，支持 `*` 通配；写入 CLI 配置（全局 `~/.cursor/cli-config.json` 或项目 `{project}/.cursor/cli.json`）的 `permissions.allow` / `permissions.deny` [@ref-cur-mcp-cli-permissions]：

```json
{
  "permissions": {
    "allow": ["Mcp(datadog:*)", "Mcp(*:search)"]
  }
}
```

（两个 allow 项都取自官方示例：`Mcp(datadog:*)` 允许某个 server 的全部工具，`Mcp(*:search)` 允许任意 server 上名为 `search` 的工具；`deny` 按同一格式书写，官方示例只演示了 `allow`。）

**允许清单文件。** CLI 读取与 IDE 相同的 `permissions.json` 允许清单文件 [@ref-cur-mcp-cl-permissions-json]；Auto-review 分类器可以用该文件里的 `allow` / `block` 指令引导 [@ref-cur-mcp-cl-auto-review]。

**运行时治理。** 管理员对 MCP server 与工具的 "Allow User Extension" 开关会在运行时强制执行 [@ref-cur-mcp-cl-governance]。企业侧的允许清单、每 server 工具控制与网络策略见下一节。

**相关但属其他主题。** `beforeMCPExecution` / `afterMCPExecution` 等 hook 能在 MCP 工具执行前后做权限决策或改写入参/输出，这属于 Hooks 主题，请见该章节。

**缺口。** 来源没有给出工具在 chat 中展示名与 `server:tool` 令牌名的对应规则，也没有说明 CLI 中逐个工具批准后写入哪份文件。

## 企业允许清单与工具/网络管控 {#mcp-admin}

**允许清单（MCP Allowlist）。** 企业管理员在 Dashboard 的 Team Settings → MCP Configuration 配置团队可运行的 server 与工具；允许清单只做「批准」，不会分发或安装 server [@ref-cur-mcp-allowlist]。条目有三类：命令条目按命令模式批准本地 `stdio` server、URL 条目按 URL 模式批准远程 HTTP/SSE server、工具允许清单限制某个已批准 server 中可自动运行的工具（留空表示允许该 server 的全部工具）[@ref-cur-mcp-allowlist]。管理员还可以用 MDM 分发 `~/.cursor/permissions.json` 设置每用户的 MCP 自动运行允许清单，其 `mcpAllowlist` 是 `server:tool` 形式的字符串数组 [@ref-cur-mcp-ent-allowlist][@ref-cur-mcp-ent-allowlist-syntax]：

| 条目          | 含义                         |
| :------------ | :--------------------------- |
| `server:tool` | 某个 MCP server 上的某个工具 |
| `server:*`    | 某个 MCP server 的全部工具   |
| `*:tool`      | 任意 server 上的同名工具     |
| `*:*`         | 全部 MCP 工具                |

**生效顺序。** Cursor 按以下顺序解析有效允许清单：1) 团队 dashboard 或其他管理员控制的设置；2) `~/.cursor/permissions.json`；3) 编辑器设置中的 MCP 允许清单与审批弹窗里的内联 **Add to allowlist**。高优先级来源**替换**低优先级来源，不合并；允许清单生效时，只有匹配条目的 server 才能运行，不匹配的被阻止 [@ref-cur-mcp-ent-order]。

**匹配语义。** stdio server 匹配 `command` 与全部 `args` 以空格连接后的完整命令串（shell 通常会把 `npx` 解析成完整路径，所以实际串里带安装路径）[@ref-cur-mcp-ent-command]；条目支持 `*` 通配，例如 `*npx -y @acme/*` 匹配任意路径下、任意 `@acme` 作用域的包 [@ref-cur-mcp-ent-command-wildcards]。远程 server 按完整 URL 匹配，例如 `https://*.acme.com/*` [@ref-cur-mcp-ent-url]。

**工具与网络控制。** 工具控制按 server 设置，列在该 server 的 Tools 字段里，留空即允许该 server 的全部工具 [@ref-cur-mcp-ent-tool-controls]。网络策略按 server 设置：远程（URL）server 被限制在其 URL 条目模式内；本地命令（stdio）server 有 Allow all / Allowlist / Deny all / No sandbox 四种网络模式 [@ref-cur-mcp-ent-network-controls]。对于管理员模式之外的「用户自带 MCP」，User MCP Network Denylist 可以按目的地阻断其网络访问 [@ref-cur-mcp-user-ext]。

**缺口。** CLI 没有等价的允许清单配置命令，来源只描述 dashboard、`permissions.json` 与编辑器设置三处；CLI 如何展示被团队策略阻止的 server 未见记载。已检查 `mcp.md` 的 Enterprise admin controls 三个子节、`enterprise/model-and-integration-management.md` 的 MCP server trust management 全部子节与 `cli/changelog.md`。

## 诊断：确认配置、连接、工具与调用 {#mcp-diagnostics}

**IDE。** 打开 Output 面板（Cmd+Shift+U），在下拉里选 **MCP Logs**，可以看到连接错误、认证问题、server 崩溃，以及 server 初始化、工具调用与错误消息 [@ref-cur-mcp-faq-debug]。server 失败时 chat 会显示错误、调用标记为失败且其它 server 不受影响 [@ref-cur-mcp-faq-crash]；自定义 server 改完本地文件要重启 Cursor 才生效 [@ref-cur-mcp-faq-update]。

**CLI。** 用 `agent mcp list` 查看配置的 server 及其状态 [@ref-cur-mcp-cli-parameters]；`/mcp` 视图按 User / Project / Team 分组，失败的 server 显示真实错误 [@ref-cur-mcp-cl-scope]；CLI 修过「有工具或说明却显示未连接」的假断连，因此状态显示以工具/说明是否可用为准 [@ref-cur-mcp-cl-false-disc]；从 `/mcp` 登录、启用或禁用 server 后，agent 可用工具会立即刷新 [@ref-cur-mcp-cl-refresh]；插件重载后 MCP lease 会刷新，工具不再卡在未连接 [@ref-cur-mcp-cl-acp-trust]。

**建议的检查顺序。** 1) `agent mcp list`（或 `/mcp`）确认配置被读取且状态正常；2) 看错误文本定位认证或启动失败；3) `agent mcp list-tools {identifier}` 确认工具已可见；4) 触发一次调用，在 chat/审批弹窗里确认参数并按需批准。

**缺口。** CLI 侧没有记载 MCP 专属日志文件的位置（CLI 有 `/logs`，但来源没有把 MCP 输出绑定到它）；也没有记录工具调用失败后的重试次数或错误码约定。已检查 `mcp.md` 的 MCP Logs FAQ 与 `cli/changelog.md` 中与 `/mcp` 相关的条目。
