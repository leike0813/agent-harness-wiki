---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-mcp-v4
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
    source_refs: [ref-kilo-code-runtime-mcp-oauth, ref-kilo-code-runtime-auth, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-src-remote, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-src-api, ref-kilo-code-mcp-src-auth-issuer, ref-kilo-code-mcp-src-oauth-issuer, ref-kilo-code-mcp-src-oauth-provider-issuer]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kilo-code-runtime-entries, ref-kilo-code-mcp-src-timeout, ref-kilo-code-mcp-src-connect-timeout, ref-kilo-code-mcp-src-status, ref-kilo-code-cli-mcp-cmd, ref-kilo-code-mcp-src-finalizer, ref-kilo-code-mcp-src-instance-ttl, ref-kilo-code-mcp-src-instance-cache, ref-kilo-code-mcp-src-cleanup-doc, ref-kilo-code-mcp-src-cleanup-body, ref-kilo-code-mcp-src-remote-fetch, ref-kilo-code-mcp-src-refresh, ref-kilo-code-mcp-src-refresh-attempt, ref-kilo-code-mcp-src-refresh-request, ref-kilo-code-mcp-src-oauth-guard, ref-kilo-code-mcp-src-invalidate, ref-kilo-code-mcp-src-invalidation, ref-kilo-code-mcp-src-oauth-invalidate]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-kilo-code-mcp-src-api, ref-kilo-code-mcp-permissions, ref-kilo-code-mcp-manage, ref-kilo-code-cli-slash]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-cli-mcp-cmd, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-manage, ref-kilo-code-mcp-src-status, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-permissions, ref-kilo-code-mcp-src-auth-issuer, ref-kilo-code-mcp-src-finalizer, ref-kilo-code-mcp-src-instance-cache, ref-kilo-code-mcp-src-refresh, ref-kilo-code-mcp-src-refresh-request, ref-kilo-code-mcp-src-oauth-invalidate, ref-kilo-code-mcp-src-invalidate]
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
        source_refs: [ref-kilo-code-runtime-mcp-oauth, ref-kilo-code-runtime-auth, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-src-remote, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-src-api, ref-kilo-code-mcp-src-auth-issuer, ref-kilo-code-mcp-src-oauth-issuer, ref-kilo-code-mcp-src-oauth-provider-issuer]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: conflict
        source_refs: [ref-kilo-code-runtime-entries, ref-kilo-code-mcp-src-timeout, ref-kilo-code-mcp-src-connect-timeout, ref-kilo-code-mcp-src-status, ref-kilo-code-cli-mcp-cmd, ref-kilo-code-mcp-src-finalizer, ref-kilo-code-mcp-src-instance-ttl, ref-kilo-code-mcp-src-instance-cache, ref-kilo-code-mcp-src-cleanup-doc, ref-kilo-code-mcp-src-cleanup-body, ref-kilo-code-mcp-src-remote-fetch, ref-kilo-code-mcp-src-refresh, ref-kilo-code-mcp-src-refresh-attempt, ref-kilo-code-mcp-src-refresh-request, ref-kilo-code-mcp-src-oauth-guard, ref-kilo-code-mcp-src-invalidate, ref-kilo-code-mcp-src-invalidation, ref-kilo-code-mcp-src-oauth-invalidate]
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
        source_refs: [ref-kilo-code-cli-mcp-cmd, ref-kilo-code-cli-mcp-auth-cmd, ref-kilo-code-mcp-manage, ref-kilo-code-mcp-src-status, ref-kilo-code-mcp-src-auth, ref-kilo-code-mcp-permissions, ref-kilo-code-mcp-src-auth-issuer, ref-kilo-code-mcp-src-finalizer, ref-kilo-code-mcp-src-instance-cache, ref-kilo-code-mcp-src-refresh, ref-kilo-code-mcp-src-refresh-request, ref-kilo-code-mcp-src-oauth-invalidate, ref-kilo-code-mcp-src-invalidate]
---

本章固定来源为仓库提交 `0b1e01409a2f2255eff7e1c47c6dc894eaed5288`，其中“启动被中断时的清理”与诊断第 4 条两段（标注 `fb7e96e` 的引用）取自更新的仓库提交 `fb7e96eda5409517a05948b9efaf01c53997bf6e`：CLI 文档页 `packages/kilo-docs/pages/automate/mcp/using-in-cli.md`、`packages/kilo-docs/pages/automate/mcp/server-transports.md`，架构页 `packages/kilo-docs/pages/contributing/architecture/cli-runtime.md`，以及 CLI 运行时源码 `packages/opencode/src/mcp/**` 与 `packages/opencode/src/config/**`；本版的 OAuth 凭据绑定证据（标注 `9747234` 的引用）取自仓库提交 `974723450caa7c91f140b128e2f2e3b4a932ade8`。本版新增的“连接前的过期令牌刷新”“远端 fetch 包装”“条件式自动失效”三段及其诊断条目（标注 `e08cc` 的引用）取自仓库提交 `e08cc5429ae10c2e9ee106c1274edf627e02644d`，其余定位仍属上述更早提交。本章只描述 CLI 界面（`kilo` / `kilocode` 二进制）行为；只对 VS Code 扩展成立的描述不在此列。

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

凭据记录新增可选 `issuer` 字段：`packages/opencode/src/mcp/auth.ts` 的 `Tokens` 与 `ClientInfo` 各多一个 `Schema.optional(Schema.String)` 的 `issuer`，源码注释写明它是 MCP SDK 记录“这些凭据绑定的授权服务器” [@ref-kilo-code-mcp-src-auth-issuer]。它带来的实际行为是：SDK 会忽略绑定了其它服务器的凭据；预注册凭据（配置里给了 `clientId`）**不再把 client secret 写盘**，只存 client ID 与 issuer 绑定，当 MCP server 换到另一个授权服务器时 SDK 会到新服务器重新注册，而不是拿配置里的 secret 去用 [@ref-kilo-code-mcp-src-oauth-issuer]。`clientInformation()` 读盘时按该绑定还原：`clientId` 与配置一致就直接带上已存 issuer；尚无绑定（`issuer == null`）则用配置的 secret；已绑定的注册若 secret 已过期则返回 `undefined` 触发重新注册 [@ref-kilo-code-mcp-src-oauth-provider-issuer]。所以看到 `mcp-auth.json` 里只有 `clientId` + `issuer` 而没有 `clientSecret`，是当前实现而非凭据丢失。

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

**连接前的过期令牌刷新（`e08cc` 新增）。** 远端 server 启用 OAuth 时，`connectRemote` 在建立传输之前先调用 `refreshExpired`，并用同一个 `mcp.timeout ?? 30000` 作为整个刷新的上限，因此一个卡住的授权服务器不会拖住 MCP 启动 [@ref-kilo-code-mcp-src-remote-fetch]。是否刷新由存储的凭据决定：必须有 refresh token 与 clientInfo，且 `expiresAt` 已过期或将在 30 秒内过期（`SKEW_MS = 30_000`，覆盖时钟偏差与慢连接）；刷新针对凭据绑定的 issuer，而不是资源 URL 的来源，缺少 issuer 时不做刷新 [@ref-kilo-code-mcp-src-refresh-attempt]。刷新请求本身用同一个超时构造 `AbortSignal`，成功后把新的 access token、轮换后的 refresh token、`expiresAt`、scope 与 issuer 写回 `mcp-auth.json`，并记一条 `refreshed expired MCP token` 日志 [@ref-kilo-code-mcp-src-refresh-request]。

刷新失败与超时都不会抛出：失败时保留原凭据，交给随后的连接路径判定为 `needs_auth` [@ref-kilo-code-mcp-src-refresh]。同一 server URL 的刷新是单飞（single-flight）：多个目录实例共享一份 `mcp-auth.json`，而 refresh token 会轮换，两次并发刷新不能提交同一个 token，后到的调用直接等待同一个进行中的 promise [@ref-kilo-code-mcp-src-refresh]。

动机写在这段实现的注释里：部分 server 对过期 access token 返回 403 而不是 401，SDK 只在 401 上按认证失败重试，于是“可刷新的过期令牌”被误判为需要重新登录；连接前刷新让这类 server 静默重连，而不是把用户送去 `kilo mcp auth` [@ref-kilo-code-mcp-src-remote-fetch]。

**远端 fetch 包装（`e08cc` 变更）。** 两个远程传输现在共用同一个 `remoteFetch`：有 OAuth provider 时是 `oauthGuard(probe(fetch, url.href), ...)`，否则只是 `probe(fetch, url.href)`；SSE 传输此前没有这层包装，现在也带上 [@ref-kilo-code-mcp-src-remote-fetch]。`oauthGuard` 只观察发往令牌端点的 `refresh_token` grant POST，并在响应为 `invalid_grant`、`invalid_client` 或 `unauthorized_client` 时，把该请求实际出示的凭据指纹记录到 provider 上，供随后的自动失效使用；其它请求原样透传 [@ref-kilo-code-mcp-src-oauth-guard]。

**自动失效是条件式的（`e08cc` 变更）。** SDK 在刷新被拒后调用 `invalidateCredentials`，但它不说明被拒的是哪一份凭据。当前实现只清除“仍与失败请求出示的凭据一致”的条目：`McpAuth.invalidate` 在读改写流程内比较 `serverUrl`，以及已固定的 `clientId`、`issuer`、`refreshToken`，一致才清对应字段并返回 `cleared`；条目已被并发轮换替换则返回 `superseded` 且不删除；条目不存在返回 `missing` [@ref-kilo-code-mcp-src-invalidate] [@ref-kilo-code-mcp-src-invalidation]。按类型区分：`tokens` 在没有记录指纹时直接保留（refresh token 会轮换，盲目删除会抹掉并发轮换的结果）；`client` 与 `all` 在没有指纹时回退为按 serverUrl 清除 client 绑定，但保留 tokens，避免过期 secret 被无限重试 [@ref-kilo-code-mcp-src-oauth-invalidate]。

`enabled: false` 的 server 不连接：`create` 在连接前判断 `mcp.enabled === false` 并直接返回 `disabled` 状态。[@ref-kilo-code-mcp-src-status]

状态联合类型 `Status`（`packages/opencode/src/mcp/index.ts`）[@ref-kilo-code-mcp-src-status]：

| status | 含义 |
|---|---|
| `connected` | 已连接 |
| `disabled` | 配置里被停用 |
| `failed` | 连接失败，附 `error` 文本 |
| `needs_auth` | 需要 OAuth 登录 |
| `needs_client_registration` | 服务器不支持动态注册，需在配置里给 `clientId`，附 `error` |

**启动被中断时的清理（`fb7e96e` 新增）。** MCP 状态由 `InstanceState` 缓存，而 `InstanceState` 的 lookup 跑在**第一个调用者的 fiber** 上；如果第一个调用者是一个被客户端放弃的 HTTP 请求，lookup 会被中断。现在被打断的 lookup 结果**立即过期**（`timeToLive` 为 `Duration.zero`），下一个调用者会关掉那个被遗弃的 scope（连带执行它注册过的 finalizer）并重建状态；真实的成功值与失败仍照常缓存，只有“被中断”这一种退出被当作不是结果 [@ref-kilo-code-mcp-src-instance-ttl] [@ref-kilo-code-mcp-src-instance-cache]。

配套地，MCP 的 client finalizer 现在**在连接任何 server 之前**就注册（`packages/opencode/src/mcp/index.ts` 里紧跟 `instructions: {}` 初始化之后的一行 `Effect.addFinalizer`）[@ref-kilo-code-mcp-src-finalizer]。因此在“连到一半被中断”的窗口里，已经起来的 stdio server 也会被关闭，而不会留在后台 —— lookup 正常完成时上游 finalizer 先执行并清空 `clients`，此时这个提前注册的 finalizer 就是空操作 [@ref-kilo-code-mcp-src-cleanup-doc]。`packages/opencode/src/kilocode/mcp/cleanup.ts` 的 `release` 对每个已连接的 client：先在 transport 上取 `pid`（只有 stdio transport 有服务端进程），对该 pid 的每个子进程发 `SIGTERM`，再 `close()` 客户端；异常一律忽略，已退出的子进程不会让清理失败 [@ref-kilo-code-mcp-src-cleanup-body]。

这条变化修掉的是一个可见症状。下一段记的“断线不会自动无限重连”仍然成立，但在此之前，**启动期间**被取消的请求会把后续 MCP 调用卡在 499，直到后端重启；现在这类请求的下一个调用者会重新启动 MCP 并正常重试。

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

按六层检查：

1. 配置是否被读取并列出 server：`kilo mcp list`（别名 `ls`）列出所有已配置 server 及其状态。[@ref-kilo-code-cli-mcp-cmd][@ref-kilo-code-mcp-manage]
2. server 是否连上：`kilo mcp list` 的状态列即 `Status` 联合（`connected` / `disabled` / `failed` / `needs_auth` / `needs_client_registration`）；`failed` 带错误文本。[@ref-kilo-code-mcp-src-status]
3. OAuth 状态：`kilo mcp auth list` 列出支持 OAuth 的 server 及认证状态；`kilo mcp debug`（带 server 名） 调试某个 server 的 OAuth 连接；`kilo mcp logout`（带 server 名） 清除凭据。[@ref-kilo-code-cli-mcp-auth-cmd] 存储的 token 是否过期由 `hasStoredTokens` / `getAuthStatus` 判定，`mcp-auth.json` 是落盘位置 [@ref-kilo-code-mcp-src-auth]；记录里还带可选的 `issuer` 绑定字段，凭据与授权服务器不匹配时不会被采用，因此“换了授权服务器后 `kilo mcp auth list` 仍显示已认证但调用失败”这一组合应先看 `issuer` [@ref-kilo-code-mcp-src-auth-issuer]。
4. 令牌刷新与失效（`e08cc` 新增，需 `--print-logs` 打开日志）。刷新成功打印 `refreshed expired MCP token`（带 server 与 issuer）[@ref-kilo-code-mcp-src-refresh-request]；刷新失败或超时打印 `expired MCP token could not be refreshed`，日志组件名 `mcp.oauth-refresh` [@ref-kilo-code-mcp-src-refresh]。自动失效打印 `MCP OAuth automatic invalidation`（info 级，字段 server、type、scope、binding、outcome）：`binding=request` 表示指纹来自失败请求本身，`binding=url` 表示按 serverUrl 回退；`outcome=cleared` 表示被拒的就是存储中的凭据，`superseded` 表示并发轮换已写入更新凭据、本次没有删除，`missing` 表示条目已不存在 [@ref-kilo-code-mcp-src-oauth-invalidate] [@ref-kilo-code-mcp-src-invalidate]。
5. 请求在 MCP **启动期间**被取消后持续 499：这一路径不再需要重启后端 —— 被中断的实例状态 lookup 立即过期，下一个请求会关闭被遗弃的 scope（含已连上的 stdio server 子进程）并重建 MCP [@ref-kilo-code-mcp-src-instance-cache] [@ref-kilo-code-mcp-src-finalizer]。若仍复现，说明问题不在启动中断这一层，应回到第 2 步看 `Status` 与 `failed` 的错误文本。
6. 工具是否可见、调用是否成功：工具按 `{server}_{tool}` 命名并受 `allow` / `ask` / `deny` 与 glob 规则约束，`ask` / `deny` 会在调用处拦截；TUI 里 `/mcps` 可开关 server 以隔离问题。[@ref-kilo-code-mcp-permissions]

`kilo mcp debug`（带 server 名） 是 OAuth 连接专用的诊断入口 [@ref-kilo-code-cli-mcp-auth-cmd]，其余连接与工具问题可从 `kilo mcp list` 的 status 以及声明的权限规则定位。[@ref-kilo-code-cli-mcp-cmd]
