---
schema_version: 3
record_kind: production
edition_id: amp-cli-mcp-v1
harness_id: amp
topic: mcp
title: "Amp CLI 的 MCP：配置入口、传输、认证、生命周期与暴露面"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-amp-mcp-config, ref-amp-docs-index-pages, ref-amp-settings-mcp-servers, ref-amp-mcp-remote, ref-amp-mcp-loading, ref-amp-mcp-ids, ref-amp-mcp-trust, ref-amp-settings-enterprise]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-amp-mcp-config, ref-amp-skills-mcp, ref-amp-execute-mode, ref-amp-mcp-remote, ref-amp-mcp-orbs, ref-amp-mcp-id-token]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-amp-mcp-oauth, ref-amp-mcp-remote, ref-amp-mcp-workload]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-amp-skills-mcp, ref-amp-mcp-loading, ref-amp-mcp-ids, ref-amp-mcp-workload, ref-amp-mcp-structured, ref-amp-mcp-best, ref-amp-mcp-orbs]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-amp-pluginapi-agentconfig, ref-amp-stream-json-output, ref-amp-skills-mcp, ref-amp-settings-mcp-permissions, ref-amp-settings-tools-disable, ref-amp-mcp-registry-matching, ref-amp-tools-permissions, ref-amp-mcp-trust]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amp-mcp-trust, ref-amp-mcp-remote, ref-amp-execute-mode, ref-amp-tools-builtin, ref-amp-mcp-ids, ref-amp-mcp-structured]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-amp-mcp-config, ref-amp-mcp-remote, ref-amp-mcp-loading, ref-amp-mcp-trust]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-amp-mcp-config, ref-amp-skills-mcp, ref-amp-mcp-id-token]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: partial
        source_refs: [ref-amp-mcp-config, ref-amp-mcp-remote, ref-amp-mcp-orbs]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-amp-mcp-oauth, ref-amp-mcp-remote, ref-amp-mcp-workload]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-amp-mcp-ids, ref-amp-mcp-loading, ref-amp-skills-mcp]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-amp-pluginapi-agentconfig, ref-amp-stream-json-output, ref-amp-skills-mcp]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-amp-pluginapi-agentconfig, ref-amp-settings-mcp-permissions, ref-amp-settings-tools-disable, ref-amp-mcp-registry-matching, ref-amp-mcp-trust]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-amp-mcp-trust, ref-amp-mcp-remote, ref-amp-execute-mode, ref-amp-tools-builtin]
---

## 配置入口、作用域与信任 {#mcp-entry}

固定来源是官方文档站快照：`/docs/customize/mcp`、`/docs/customize/skills`、`/docs/cli/settings`、`/docs/plugin-api` 与 `/docs/markdown`。Amp CLI 闭源，全部结论为来源级知识，snapshot 的 `version_applicability` 为 `unknown`。[@ref-amp-mcp-config][@ref-amp-docs-index-pages]

Amp 把 MCP server 分成两类配置，这是理解后面所有优先级的前提 [@ref-amp-mcp-config]：

- **本地 MCP 配置**存在 `amp.mcpServers` 里。文档明确说：即使 `url` 指向另一台机器，URL 条目仍算本地配置。
- **远程 MCP 定义**存在 ampcode.com 上，可以在 MCP server 设置界面管理，也可以用 `amp mcp remote` 命令管理。

`amp.mcpServers` 的作用域沿用设置文件的作用域（见配置机制一章）：user 在 `~/.config/amp/settings.json`，workspace 在最近的 `.amp/settings.json`。[@ref-amp-settings-mcp-servers]

远程定义有三个存储作用域，每个 `amp mcp remote` 命令都必须带且只带一个作用域选项（可以放在命令前后）：`--personal`、`--workspace NAME`、`--project NAME`、`--current-project`。`--current-project` 选用与当前仓库匹配的 Amp 项目。[@ref-amp-mcp-remote]

**加载顺序**（同名 server，从高到低）[@ref-amp-mcp-loading]：

1. CLI flag（`--mcp-config`）
2. workspace 配置（`.amp/settings.json` 的 `amp.mcpServers`）
3. user 配置（`~/.config/amp/settings.json` 的 `amp.mcpServers`）
4. skill（`mcp.json` 或 frontmatter `mcpServers`）

远程定义另有一套按 **ID** 的覆盖规则：ID 必须在 personal、各 workspace、各 project 内唯一；跨作用域时 project 覆盖同名 ID 的 workspace，workspace 覆盖同名 ID 的 personal。被禁用的 server 不参与覆盖；工具发现还要求有缓存工具，没有缓存工具的 server 不会遮蔽另一个 server 的工具。**Workload identity server 是例外**：它在取工具之前就优先，因此连接失败不会静默退回更低优先级的 server。[@ref-amp-mcp-ids]

**workspace 级 MCP server 需要显式批准**：放在 `.amp/settings.json` 里的 server 必须先批准才能运行，未批准时 `amp mcp doctor` 显示 `awaiting approval`，用 `amp mcp approve NAME` 批准；CLI 首次检测到 workspace server 时也会提示。user 设置（`~/.config/amp/settings.json`）或 `--mcp-config` 传入的 server 不需要批准。[@ref-amp-mcp-trust]

Enterprise 的 workspace 文档**不能**设置 `amp.mcpServers`——该键由服务端 MCP registry 与托管 MCP server 负责；`amp.mcpTrustedServers` 也被列为「只在本机有效」，不能写进 workspace 文档。[@ref-amp-settings-enterprise]

官方对大多数场景的建议与上面的优先级相反：优先把 MCP server 打包进 skill（工具在 skill 加载前隐藏），只有当 server 必须一直在上下文窗口里时才写进 `amp.mcpServers`。[@ref-amp-mcp-config]

## Server 定义字段与传输形态 {#mcp-definition}

本地配置与 skill 里的 server 使用同一套字段：本地 server 用 `command` / `args` / `env`，远程 server 用 `url` / `headers`。[@ref-amp-mcp-config][@ref-amp-skills-mcp]

文档给出的一整块 `amp.mcpServers` 示例（同时含 stdio 与 URL 两种写法，并演示 `${VAR_NAME}` 变量展开）[@ref-amp-mcp-config]：

```json
"amp.mcpServers": {
    "playwright": {
        "command": "npx",
        "args": ["-y", "@playwright/mcp@latest", "--headless"]
    },
    "linear": {
        "url": "https://mcp.linear.app/sse"
    },
    "sourcegraph": {
        "url": "${SRC_ENDPOINT}/.api/mcp/v1",
        "headers": { "Authorization": "token ${SRC_ACCESS_TOKEN}" }
    }
}
```

在**配置文件**里，环境变量用 `${VAR_NAME}` 语法展开。命令行也可以加一个一次性 server 而不改设置文件 [@ref-amp-execute-mode]：

```shell-session
$ amp mcp add context7 -- npx -y @upstash/context7-mcp
$ amp mcp add linear https://mcp.linear.app/sse
$ amp --mcp-config '{"everything": {"command": "npx", "args": ["-y", "@modelcontextprotocol/server-everything"]}}' -x "What tools are available to you?"
```

写进配置文件的最小形态（键名与 `amp.mcpServers` 一致，来自同页示例的裁剪）[@ref-amp-mcp-config]：

```json
{
  "$schema": "https://ampcode.com/cli-settings.schema.json",
  "amp.mcpServers": {
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@latest", "--headless"] }
  }
}
```

**传输形态**只有两类：本地 stdio（`command` + `args` + `env`）与远程 URL（`url` + `headers`）。示例里出现过 `/sse` 后缀与 `/.api/mcp/v1` 形态的端点，说明文档同时容纳 SSE 与 HTTP 风格的 URL，但不讨论协议协商细节。[@ref-amp-mcp-config]

远程定义还可以用 `amp mcp remote add` 创建，`--auth` 默认自动探测 [@ref-amp-mcp-remote]：

```shell-session
$ amp mcp remote add Public https://mcp.example.com/mcp --auth none --current-project
$ amp mcp remote add Private https://mcp.example.com/mcp --auth bearer --bearer-token-file /path/to/token --workspace acme
$ amp mcp remote add OAuth https://mcp.example.com/mcp --auth oauth --personal
```

**在 orb 里**，orb 在自己的机器上运行 Ampl executor，不读本机的 `~/.config/amp/settings.json`。可用的三种放法：把 server 打包进 skill 的 `mcp.json` 并提交仓库（推荐）、提交到仓库的 `.amp/settings.json`（进 orb 后仍需批准）、或使用远程定义（无需改仓库）。orb 里没有浏览器 OAuth 流程。[@ref-amp-mcp-orbs]

**`${amp:id-token}`** 是 orb 内的专有变量：只允许写在 HTTPS server 的 header 里，用于让远程 server 认证当前线程。Amp 在连接前铸造 token，只发给该 URL 的 HTTPS origin（含非默认端口，不含 path/query），拒绝重定向并在过期前替换；server 返回 401 时连接失败且不重试。Amp 不允许把它用在 URL、本地 server 的 command/args/env 里；orb 之外使用会以 「requires an Amp orb」 失败。[@ref-amp-mcp-id-token]

## 认证：OAuth、Bearer 与 Workload Identity {#mcp-auth}

**本地 URL 条目的 OAuth**：把 URL 条目加进 `amp.mcpServers` 后启动 Amp TUI，对于支持自动客户端注册的 server（文档举 Linear 为例），Amp 会自动在浏览器里开始 OAuth 流程；`amp mcp oauth` 命令管理这份本地 OAuth 状态（`amp mcp oauth login` / `logout NAME`）。[@ref-amp-mcp-oauth]

需要手动注册的 server：先在 server 管理界面创建 OAuth client，**redirect URI 固定为 `http://localhost:8976/oauth/callback`**，然后在 CLI 注册凭据 [@ref-amp-mcp-oauth]：

```shell-session
$ amp mcp add my-server https://example.com/.api/mcp/v1
$ amp mcp oauth login my-server \
  --server-url https://example.com/.api/mcp/v1 \
  --client-id your-client-id \
  --client-secret your-client-secret \
  --scopes "openid,profile,email,user:all"
```

token 存在 Amp 的 secret storage 里并自动刷新；provider 侧 token 失效或被吊销时，用 `amp mcp oauth logout NAME` 清除后让 Amp 重新认证。[@ref-amp-mcp-oauth]

**runner** 上的 OAuth 走另一条路：`amp --no-tui` 的 runner 会在 ampcode.com 上已附加的线程里弹出登录对话框；如果本机浏览器打开登录链接，登录会自行完成，从别的设备打开则会停在一个打不开的 `localhost` 页面，需要把该页完整 URL 粘回对话框。runner 把 token 存在自己的 secret storage 里，所以 MCP server 与其登录 provider 只需对 runner 的网络可达。[@ref-amp-mcp-oauth]

**远程定义的认证类型**：`--auth` 可省略（Amp 自动探测）、`none`、`bearer`、`oauth`，以及需要 Amp 员工授权的 `workload-identity`。bearer token 与 OAuth client secret 只能通过 `--bearer-token-file PATH` / `--oauth-client-secret-file PATH` 提供，路径写 `-` 表示从标准输入读一条 secret；Amp **不接受**把这些 secret 当命令参数传入。OAuth 省略 client 选项时使用 Amp 服务端配置或 provider 的自动客户端注册；若 Amp 服务端把某 provider 标记为不支持，命令会打印其说明并拒绝添加。[@ref-amp-mcp-remote]

**Amp Workload Identity** 只适用于存在 ampcode.com 上的远程定义（不适用于本地 `amp.mcpServers` 或 skill 配置）。Amp 每次发一枚 5 分钟有效期的 RS256 JWT 作 Bearer：issuer 为 `https://ampcode.com/api/workload-identity`，公钥在该 issuer 的 `/jwks.json`，audience 是配置的 MCP URL 规范化后的 HTTPS origin（含非默认端口、去掉 path 与 query），不接受 audience 覆盖，拒绝重定向。token 内含 `user_id`、`thread_id`，以及存在时的 `workspace_id`、`project_id`，还有签发时捕获的协作声明 `thread_visibility`（`private` / `thread_group_shared` / `thread_workspace_shared` / `public_unlisted`）、`thread_multiplayer`、`thread_non_owner_can_influence`，subject 形如 `workspace:ID:project:ID:user:ID:thread:ID`，并带 `token_use: "mcp"` 与唯一 `jti`，不含用户邮箱。身份始终是线程所有者而非最近发言者。server 必须自行校验签名、issuer、精确 audience 与有效期，再按声明授权——签名有效不等于有权限。[@ref-amp-mcp-workload]

## 生命周期：何时连接、禁用与刷新 {#mcp-lifecycle}

**发现时机**：skill 里的 server 在「发现该 skill」时就连接，但它的工具要等 skill 被加载才对模型可见；有同名 server 由 CLI flag 或直接配置提供时，后者优先且工具始终可见。[@ref-amp-skills-mcp]

**本地配置的选取**按上一节的四级顺序在启动/连接时决定。[@ref-amp-mcp-loading]

**远程定义**的运行期行为 [@ref-amp-mcp-ids]：

- 运行中的线程会**在后台刷新远程工具列表**，所以一次改动不会让所有线程同时看到。
- 已经开始的 `code_exec` 调用保留它选中的 server UUID；之后的调用（包括线程 actor 重启后的重试）使用调用开始时的目录。
- 改 ID 不会取消进行中的调用，也不会撤销对先前选中 server 的访问。
- `amp mcp remote --personal update NAME --disabled` 可禁用；被禁用的 server 不参与 ID 覆盖。

**Workload identity server 的优先级**发生在取工具之前，连接失败不会退回更不具体的 server；禁用 server 或撤销授权会阻止新 token，但已签发的 token 最多还能有效 5 分钟。[@ref-amp-mcp-ids][@ref-amp-mcp-workload]

**tool_search / code_exec 的缓存语义**：Amp 把保存的远程 MCP 工具通过 `tool_search` 发现、通过 `code_exec` 调用；调用函数返回 `structuredContent`（存在时），否则返回文本（文本是对象/数组时按 JSON 解析），普通调用在工具报错时抛错；要拿到完整原始结果（含违反 output schema 或 `isError: true`）要用 `.raw(input)`，raw 调用跳过 output schema 校验。`.raw()` 每次都会真正再调用一次工具，不会取回上一次的结果。[@ref-amp-mcp-structured]

**最佳实践**（影响可用工具数量与上下文占用）：宁可把 server 打包进 skill；选暴露少量高层工具的 server；禁用不用的 MCP 工具；或改用 CLI 工具。[@ref-amp-mcp-best]

**orb 里没有浏览器 OAuth**：需要认证的远程 server 要改用 secrets 提供的环境变量填 `headers`、用 `${amp:id-token}`，或使用由 ampcode.com 处理 OAuth 的远程定义（`amp mcp remote login` 会打印 OAuth URL）。[@ref-amp-mcp-orbs]

## 能力与暴露面：工具、资源、权限 {#mcp-capabilities}

**tools**：可以，且只有一种到达模型的方式。插件 API 文档明确写：「MCP 工具不会作为独立工具发给模型」，每个 agent 都拿到 `tool_search` 与 `code_exec`，并通过它们以延迟的 code-mode 模块访问 MCP server，这样庞大的 MCP 目录不会占满上下文窗口；只有当显式排除这两个工具时，选中的 MCP 工具才会直接发给模型。[@ref-amp-pluginapi-agentconfig]

**resources**：文档在 streaming JSON 的 `init` 消息里列出了内置工具集合，其中包含 `read_mcp_resource` 与 `read_web_page`，说明存在读取 MCP resource 的工具；但固定来源没有单独描述 resources 的发现与生命周期。[@ref-amp-stream-json-output]

**prompts**：固定来源（`/docs/customize/mcp`、`/docs/customize/skills`、`/docs/plugin-api`）没有提及 MCP prompts 的发现或调用，保持未知。

**skill 内的工具筛选**：skill 的 `mcp.json` / `mcpServers` 支持 `includeTools`（工具名或 glob 模式），用来决定暴露哪些工具，官方建议给出。[@ref-amp-skills-mcp]

**用户级权限**：`amp.mcpPermissions` 是数组，**按第一条匹配的规则生效**，没有任何规则匹配时默认放行。远程 server 用 `url` 键匹配端点，本地 server 用 `command` 与 `args` 匹配可执行文件与参数；`action` 为 `allow` 或 `reject`。[@ref-amp-settings-mcp-permissions]

```json
"amp.mcpPermissions": [
  { "matches": { "command": "npx", "args": "* @playwright/mcp@*" }, "action": "allow" },
  { "matches": { "url": "https://mcp.trusted.com/mcp" }, "action": "allow" },
  { "matches": { "command": "python", "args": "*bad_command*" }, "action": "reject" },
  { "matches": { "url": "*/malicious.com*" }, "action": "reject" }
]
```

**关掉单个工具**：`amp.tools.disable` 是按名字禁用工具的数组，支持 `*` glob，并可用 `builtin:toolname` 只禁用内置工具而同名 MCP 工具仍可用。[@ref-amp-settings-tools-disable]

**企业侧强制**：Enterprise workspace 管理员可以配置 MCP registry，使只有被批准的 MCP server 对成员可用；registry 不可达时**所有** MCP server 都被封锁。对本地 stdio server，Amp 匹配包名与 registry 类型（不对具体版本），支持的运行器包括 `npx`、`npm exec`、`npm x`、`pnx`、`pnpx`、`pnpm dlx`、`bunx`、`bun x`、`yarn dlx`（npm 包）与 `uvx`、`uv tool run`、`pipx run`（Python 包）；`uvx --from`、`pipx run --spec`、`bunx --package` 这类包源选项在包名与命令名不同时受支持。Amp 会拦截不指向 registry 包的引用、`uvx --with` 这类会追加包的 runner 选项，以及替代 registry/index、shell 执行模式、npm alias、直链 URL、版本控制源、压缩包与本地路径。[@ref-amp-mcp-registry-matching]

**其他工具与审批**：[`/docs/tools`](/docs/tools) 说明 Amp 默认在运行工具前**不**请求批准，控制工具使用要靠自定义插件；workspace MCP server 的审批是上面说过的例外。[@ref-amp-tools-permissions][@ref-amp-mcp-trust]

## 诊断：配置、连接、可见与调用 {#mcp-diagnostics}

| 想确认 | 入口 | 来源 |
| :-- | :-- | :-- |
| 配置是否被读到、server 是否就绪 | `amp mcp doctor`（workspace server 未批准时显示 `awaiting approval`） | [@ref-amp-mcp-trust] |
| workspace server 的批准状态与批准 | `amp mcp approve NAME` | [@ref-amp-mcp-trust] |
| 远程定义列表 | `amp mcp remote --personal list`（任何 `amp mcp remote` 子命令都可加 `--json`） | [@ref-amp-mcp-remote] |
| 远程定义能否连通 | `amp mcp remote --personal check NAME` | [@ref-amp-mcp-remote] |
| 远程 server 暴露了哪些工具 | `amp mcp remote --personal tools NAME --refresh` | [@ref-amp-mcp-remote] |
| 登录/登出状态 | `amp mcp remote --personal login NAME` / `logout NAME` | [@ref-amp-mcp-remote] |
| 删除定义 | `amp mcp remote --personal remove NAME --yes` | [@ref-amp-mcp-remote] |
| 当前线程实际可用的工具 | 让它回答「What tools are available to you?」（`amp --mcp-config ... -x "..."`） | [@ref-amp-execute-mode] |
| 内置工具清单 | `amp tools list` | [@ref-amp-tools-builtin] |

名字匹配规则：`amp mcp remote` 的 update/remove/check/tools/login/logout 可以用 server 名或 UUID，名字在所选作用域内**不区分大小写**；UUID 是 `amp mcp remote list --json` 返回的 `id`，不是 MCP 设置里可编辑的 ID。[@ref-amp-mcp-remote]

工具列表的刷新是后台进行的，所以「改完没生效」可能只是线程尚未刷新；`.raw()` 与普通调用的差异（schema 校验、错误抛出）也要在排查调用失败时区分开。[@ref-amp-mcp-ids][@ref-amp-mcp-structured]

固定来源没有给出 MCP 连接的显式超时、重试次数或本地配置的 reload 命令（只有 runner 提到「reloading MCP」会重载该 runner 的本地配置），这部分保持未验证。[@ref-amp-mcp-ids]
