---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-mcp-v1
harness_id: kilo-code
topic: mcp
title: "Kilo Code CLI — MCP 配置、传输、认证与生命周期"
sections:
  - section_id: mcp-configuration
    surface_ids: [cli]
    source_refs: [ref-kilo-code-mcp-entry, ref-kilo-code-mcp-format, ref-kilo-code-mcp-env, ref-kilo-code-config-src-global, ref-kilo-code-config-src-project, ref-kilo-code-config-src-variable, ref-kilo-code-mcp-src-sanitize]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-kilo-code-mcp-format, ref-kilo-code-mcp-local, ref-kilo-code-mcp-remote, ref-kilo-code-mcp-transports, ref-kilo-code-mcp-src-local, ref-kilo-code-mcp-src-remote]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-kilo-code-runtime-mcp-oauth, ref-kilo-code-runtime-auth, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-src-remote, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-src-api]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kilo-code-runtime-entries, ref-kilo-code-mcp-src-timeout, ref-kilo-code-mcp-src-connect-timeout, ref-kilo-code-mcp-src-status, ref-kilo-code-cli-mcp-cmd]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-kilo-code-mcp-src-api, ref-kilo-code-mcp-permissions, ref-kilo-code-mcp-manage, ref-kilo-code-cli-slash]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-mcp-cmd, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-manage, ref-kilo-code-mcp-src-status, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-permissions]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-configuration
        status: answered
        source_refs: [ref-kilo-code-mcp-entry, ref-kilo-code-mcp-format, ref-kilo-code-mcp-env, ref-kilo-code-config-src-project, ref-kilo-code-config-src-variable, ref-kilo-code-mcp-src-sanitize]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-kilo-code-mcp-format, ref-kilo-code-mcp-local, ref-kilo-code-mcp-remote, ref-kilo-code-mcp-transports]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-kilo-code-mcp-transports, ref-kilo-code-mcp-local, ref-kilo-code-mcp-remote, ref-kilo-code-mcp-src-local, ref-kilo-code-mcp-src-remote]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-kilo-code-runtime-mcp-oauth, ref-kilo-code-runtime-auth, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-src-remote, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-src-api]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: conflict
        source_refs: [ref-kilo-code-runtime-entries, ref-kilo-code-mcp-src-timeout, ref-kilo-code-mcp-src-connect-timeout, ref-kilo-code-mcp-src-status, ref-kilo-code-cli-mcp-cmd]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kilo-code-mcp-src-api, ref-kilo-code-mcp-permissions, ref-kilo-code-mcp-manage, ref-kilo-code-cli-slash]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-kilo-code-mcp-permissions, ref-kilo-code-mcp-src-api]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-kilo-code-cli-mcp-cmd, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-manage, ref-kilo-code-mcp-src-status, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-permissions]
---

本章固定来源为仓库提交 `0b1e01409a2f2255eff7e1c47c6dc894eaed5288`：CLI 文档页 `packages/kilo-docs/pages/automate/mcp/using-in-cli.md`、`packages/kilo-docs/pages/automate/mcp/server-transports.md`，架构页 `packages/kilo-docs/pages/contributing/architecture/cli-runtime.md`，以及 CLI 运行时源码 `packages/opencode/src/mcp/**` 与 `packages/opencode/src/config/**`。本章只描述 CLI 界面（`kilo` / `kilocode` 二进制）行为；只对 VS Code 扩展成立的描述不在此列。

## 配置入口与作用域 {#mcp-configuration}

MCP server 统一配置在配置文件顶层的 `mcp` 键下，键下每个成员是一个具名 server，名称在提示里用来引用该 server。[@ref-kilo-code-mcp-format]

CLI 接受多个配置文件名，推荐 `kilo.json`：全局作用域为 `~/.config/kilo/kilo.json`（同时支持 `kilo.jsonc`、`config.json`），项目作用域为 `./kilo.json` 或 `./.kilo/kilo.json`（同时支持 `kilo.jsonc`）。项目级配置优先于全局配置。[@ref-kilo-code-mcp-entry]

最小可用配置（依据 using-in-cli 的 Configuration Format 示例）[@ref-kilo-code-mcp-format]：

```json
{
  "mcp": {
    "my-server": {
      "type": "local",
      "command": ["npx", "-y", "my-mcp-command"],
      "enabled": true
    }
  }
}
```

字段读取与覆盖由 CLI 配置层完成（`packages/opencode/src/config/config.ts`）：先加载全局配置目录，随后是显式路径 `KILO_CONFIG`，再是项目配置；后加载者覆盖先加载者，`KILO_DISABLE_PROJECT_CONFIG` 可关闭项目配置 [@ref-kilo-code-config-src-global] [@ref-kilo-code-config-src-project]。项目配置被当作不受信任来源处理 [@ref-kilo-code-config-src-project]。

变量展开：配置文本支持 `{env:VARIABLE_NAME}` 语法引用环境变量，例如把远端 server 的鉴权头写成 `"Authorization": "Bearer {env:MY_API_KEY}"`。[@ref-kilo-code-mcp-env]

不受信任的项目配置对 `{env:}` 有额外限制（`packages/opencode/src/config/variable.ts`）：未受信任配置里的 `{env:...}` 会被直接拒绝并报 `environment references are not allowed in project config` [@ref-kilo-code-config-src-variable]。对 `mcp` 还有更早的一道闸门：`packages/opencode/src/kilocode/config/mcp-headers.ts` 的 `sanitizeProjectMcpHeaders` 会在通用替换前把 `headers` 中含 `{env:}` 或 `{file:}` 变量的 server 整个删除并给出 warning（消息形如 `Skipped MCP "name": variable references are not allowed in project MCP headers`）[@ref-kilo-code-mcp-src-sanitize]。因此依赖环境变量展开的 MCP 条目应放在全局配置里，而不是项目配置。

## Server 定义与传输 {#mcp-transport}

每个 server 用 `type` 区分本地与远程两种定义。[@ref-kilo-code-mcp-format]

本地 server（`type: "local"`）在本机运行，通过标准输入输出通信。[@ref-kilo-code-mcp-local]

```json
{
  "mcp": {
    "my-local-server": {
      "type": "local",
      "command": ["npx", "-y", "my-mcp-command"],
      "enabled": true,
      "environment": {
        "API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

本地 server 字段（依据 using-in-cli 的 Local Server Options 表）[@ref-kilo-code-mcp-local]：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `type` | String | 是 | 必须为 `"local"` |
| `command` | Array | 是 | 启动命令及参数 |
| `environment` | Object | 否 | 运行 server 时设置的环境变量 |
| `enabled` | Boolean | 否 | 启动时启用 / 停用 |
| `timeout` | Number | 否 | 拉取工具的毫秒超时；文档写默认 5000（见生命周期一节冲突） |

运行时实现 `packages/opencode/src/mcp/index.ts` 的 `connectLocal` 还读取文档表未列出的字段 `cwd`：相对当前本地实例目录解析，缺省即实例目录。`command` 数组首元素是命令、其余是参数；若命令是 `docker` 或 `podman` 且带 `run` 子命令，`ensureDockerRm` 会自动补 `--rm`。子进程环境为 `modelEnv({ ...(cmd === "opencode" ? { BUN_BE_BUN: "1" } : {}), ...mcp.environment })`，即本地 MCP 不继承后端凭据，只带上配置里声明的环境变量。[@ref-kilo-code-mcp-src-local]

远程 server（`type: "remote"`）通过 HTTP/HTTPS 访问。[@ref-kilo-code-mcp-remote]

```json
{
  "mcp": {
    "my-remote-server": {
      "type": "remote",
      "url": "https://my-mcp-server.com/mcp",
      "enabled": true,
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

远程 server 字段（依据 using-in-cli 的 Remote Server Options 表）[@ref-kilo-code-mcp-remote]：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `type` | String | 是 | 必须为 `"remote"` |
| `url` | String | 是 | 远端 MCP server 地址 |
| `enabled` | Boolean | 否 | 启动时启用 / 停用 |
| `headers` | Object | 否 | 随请求发送的 HTTP 头 |
| `timeout` | Number | 否 | 拉取工具的毫秒超时；文档写默认 5000 |

传输层：官方 transport 文档描述 STDIO（本地子进程、JSON-RPC 2.0、消息按行分隔）与 SSE（HTTP GET 建事件流加 POST 发消息两个通道）两类。[@ref-kilo-code-mcp-transports]

源码里本地只用 STDIO（`StdioClientTransport`）；远程会依次尝试 **StreamableHTTP** 再 SSE 两种传输，二者都在存在 `headers` 时带 `requestInit`，并带可选的 `authProvider`。[@ref-kilo-code-mcp-src-remote] 也就是说文档只讲 STDIO 与 SSE，而 CLI 运行时对远端优先使用 StreamableHTTP。[@ref-kilo-code-mcp-transports]

## 认证、凭据与 OAuth {#mcp-auth}

三类凭据边界互相独立：本地 `kilo serve` 访问、出站 provider 认证、远端 MCP OAuth。远端 MCP OAuth 归 CLI MCP 运行时所有，负责浏览器授权与凭据。[@ref-kilo-code-runtime-auth]

静态 header 仍受支持；对 OAuth server，CLI 自行完成浏览器授权并把凭据保存在受保护的本地状态里，编辑器客户端调用 CLI 的授权流程而不自己保存 MCP 凭据。[@ref-kilo-code-runtime-mcp-oauth]

凭据落盘位置在 `packages/opencode/src/mcp/auth.ts`：`path.join(Global.Path.data, "mcp-auth.json")`。`Global.Path.data` 是 XDG data 目录下的 `kilo`（通常是 `~/.local/share/kilo`，见 `packages/core/src/global.ts`），所以凭据文件通常是 `~/.local/share/kilo/mcp-auth.json`，文件里按 server 名保存 access token、refresh token、过期时间与 client 信息。[@ref-kilo-code-mcp-src-auth]

远程 server 的 OAuth 由 `connectRemote` 控制：`mcp.oauth === false` 时不做 OAuth；`mcp.oauth` 为对象时读取其中的 `clientId`、`clientSecret`、`scope`、`callbackPort`、`redirectUri` 传给 provider。鉴权失败区分两种状态：服务器不支持动态客户端注册时置 `needs_client_registration` 并提示 `Add clientId to your config`；其余需要登录时置 `needs_auth` 并提示运行 `kilo mcp auth`（带 server 名）。[@ref-kilo-code-mcp-src-remote]

MCP 服务接口暴露 OAuth 相关方法：`startAuth`、`authenticate`、`finishAuth`、`removeAuth`、`supportsOAuth`、`hasStoredTokens`、`getAuthStatus`，供 CLI 命令与 TUI 使用。[@ref-kilo-code-mcp-src-api]

CLI 命令（依据 CLI reference）[@ref-kilo-code-cli-mcp-auth-cmd]：

- `kilo mcp auth [name]` 对启用了 OAuth 的 MCP server 发起认证；
- `kilo mcp auth list`（别名 `ls`）列出支持 OAuth 的 server 及其认证状态；
- `kilo mcp logout [name]` 删除某个 server 的 OAuth 凭据。

`kilo mcp auth` 及子命令均带 `--help`、`--version` 选项，`name` 是位置参数。[@ref-kilo-code-cli-mcp-auth-cmd]

## 生命周期、超时与状态 {#mcp-lifecycle}

CLI 运行时在建立本地实例状态时读取配置并连接每个 server。[@ref-kilo-code-runtime-entries] 交互 TUI（`kilo`）优先连接本地 daemon，否则启动 Bun worker；`kilo run` 先用 daemon、再回退内嵌 server；`kilo run --attach` 指向显式的 `kilo serve`。MCP 连接运行在这些进程内。[@ref-kilo-code-runtime-entries]

连接超时：源码里 `DEFAULT_TIMEOUT = 30_000`（毫秒），本地与远程都用 `const connectTimeout = mcp.timeout ?? DEFAULT_TIMEOUT`，即未配置 `timeout` 时实际用 30000ms。[@ref-kilo-code-mcp-src-timeout][@ref-kilo-code-mcp-src-connect-timeout]

> 冲突（如实保留）：`using-in-cli.md` 的 Local 与 Remote Server Options 表把 `timeout` 默认值写成 **5000** 毫秒 [@ref-kilo-code-mcp-local][@ref-kilo-code-mcp-remote]，而 CLI 运行时源码 `packages/opencode/src/mcp/index.ts` 的 `DEFAULT_TIMEOUT` 为 **30000** 毫秒且被 `mcp.timeout ?? DEFAULT_TIMEOUT` 直接采用 [@ref-kilo-code-mcp-src-timeout][@ref-kilo-code-mcp-src-connect-timeout]。两处定位冲突、默认值不一致：以运行时源码为准可确定实际默认 30000ms，但官方 CLI 文档仍写 5000，读者不应假定文档数字就是运行时行为。

`enabled: false` 的 server 不连接：`create` 在连接前判断 `mcp.enabled === false` 并直接返回 `disabled` 状态。[@ref-kilo-code-mcp-src-status]

状态联合类型 `Status`（`packages/opencode/src/mcp/index.ts`）[@ref-kilo-code-mcp-src-status]：

| status | 含义 |
|---|---|
| `connected` | 已连接 |
| `disabled` | 配置里被停用 |
| `failed` | 连接失败，附 `error` 文本 |
| `needs_auth` | 需要 OAuth 登录 |
| `needs_client_registration` | 服务器不支持动态注册，需在配置里给 `clientId`，附 `error` |

连接后运行时注册 `onclose` 回调：连接关闭会把该 server 状态改为 `failed`（error 为 `Connection closed`）、清掉对应 client / 工具定义 / 指令并发布工具变化事件；服务器发 `ToolListChanged` 通知时用 `mcp.timeout` 重新拉取工具列表（`packages/opencode/src/mcp/index.ts` 的 `watch`）。断线不会自动无限重连，需要重新建立状态或走重连入口。[@ref-kilo-code-mcp-src-status]

命令行入口 `kilo mcp` 的子命令列出 add / list / auth / logout / debug，其中 `kilo mcp list`（别名 `ls`）输出 server 与其状态。[@ref-kilo-code-cli-mcp-cmd]

## 能力发现与暴露面 {#mcp-capabilities}

MCP 服务接口分别暴露不同能力，不能互相代表 [@ref-kilo-code-mcp-src-api]：

- `tools()`：返回 `McpTool` 映射；每个 `McpTool` 含共享缓存定义 `def`、所属 client、归属 server 名 `clientName` 与可选 `timeout`。
- `resources(clientName?)` 与 `resourceTemplates(clientName?)`：资源与参数化资源模板。
- `prompts()`、`getPrompt()`、`readResource()`：提示与资源读取。
- `instructions()`：返回 `ServerInstructions`（`name`、`instructions`、`tools`），即 server 附加给模型上下文的使用说明。

只有 server 声明了 tools 能力时才拉取工具定义，否则不注册工具；指令文本在连接后由 `client.getInstructions()` 取回。[@ref-kilo-code-mcp-src-api]

暴露与权限：MCP 工具与内置工具共用同一套权限系统（`allow` / `ask` / `deny`），权限键是命名空间名 `{server}_{tool}`（例如 `github_create_pull_request`），并支持 `github_*` 这类 glob 规则。[@ref-kilo-code-mcp-permissions]

已连接的 server 还能把使用说明加进模型上下文，并暴露资源（含参数化资源模板）。[@ref-kilo-code-mcp-permissions]

在交互 TUI 内用 `/mcps` 斜杠命令开关各个 MCP server [@ref-kilo-code-mcp-manage][@ref-kilo-code-cli-slash]；CLI 侧还可用 `kilo mcp list` 查看已配置 server。[@ref-kilo-code-mcp-manage]

## 诊断 {#mcp-diagnostics}

按四层检查：

1. 配置是否被读取并列出 server：`kilo mcp list`（别名 `ls`）列出所有已配置 server 及其状态。[@ref-kilo-code-cli-mcp-cmd][@ref-kilo-code-mcp-manage]
2. server 是否连上：`kilo mcp list` 的状态列即 `Status` 联合（`connected` / `disabled` / `failed` / `needs_auth` / `needs_client_registration`）；`failed` 带错误文本。[@ref-kilo-code-mcp-src-status]
3. OAuth 状态：`kilo mcp auth list` 列出支持 OAuth 的 server 及认证状态；`kilo mcp debug`（带 server 名） 调试某个 server 的 OAuth 连接；`kilo mcp logout`（带 server 名） 清除凭据。[@ref-kilo-code-cli-mcp-auth-cmd] 存储的 token 是否过期由 `hasStoredTokens` / `getAuthStatus` 判定，`mcp-auth.json` 是落盘位置。[@ref-kilo-code-mcp-src-auth]
4. 工具是否可见、调用是否成功：工具按 `{server}_{tool}` 命名并受 `allow` / `ask` / `deny` 与 glob 规则约束，`ask` / `deny` 会在调用处拦截；TUI 里 `/mcps` 可开关 server 以隔离问题。[@ref-kilo-code-mcp-permissions]

`kilo mcp debug`（带 server 名） 是 OAuth 连接专用的诊断入口 [@ref-kilo-code-cli-mcp-auth-cmd]，其余连接与工具问题可从 `kilo mcp list` 的 status 以及声明的权限规则定位。[@ref-kilo-code-cli-mcp-cmd]
