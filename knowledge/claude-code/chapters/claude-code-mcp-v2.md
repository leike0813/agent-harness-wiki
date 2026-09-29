---
schema_version: 2
record_kind: production
edition_id: claude-code-mcp-v2
harness_id: claude-code
topic: mcp
title: Claude Code 的 MCP 配置、连接、能力与诊断
sections:
  - section_id: mcp-entry
    source_refs:
      - ref-cc-mcp-scopes
      - ref-cc-mcp-precedence
      - ref-cc-mcp-managed
  - section_id: mcp-definition
    source_refs:
      - ref-cc-mcp-envexpansion
      - ref-cc-mcp-credential
      - ref-cc-mcp-stdio
      - ref-cc-mcp-transports
  - section_id: mcp-auth-lifecycle
    source_refs:
      - ref-cc-mcp-auth
      - ref-cc-mcp-headershelper
      - ref-cc-mcp-connectors
      - ref-cc-mcp-reconnect
      - ref-cc-mcp-disable
      - ref-cc-mcp-statusdetail
      - ref-cc-mcp-runtimes
      - ref-cc-mcp-toolsearch
  - section_id: mcp-capabilities
    source_refs:
      - ref-cc-mcp-toolavailability
      - ref-cc-mcp-resources
      - ref-cc-mcp-prompts
      - ref-cc-mcp-limits
      - ref-cc-mcp-dynamic
      - ref-cc-mcp-approvals
      - ref-cc-mcp-toolapproval
      - ref-cc-mcp-orgcontrols
      - ref-cc-mcp-pluginservers
      - ref-cc-mcp-toolsearch
  - section_id: mcp-diagnostics
    source_refs:
      - ref-cc-mcp-status
      - ref-cc-mcp-statusdetail
      - ref-cc-mcp-warnings
      - ref-cc-npm-readme
questions:
  - question_id: mcp.entry
    section_id: mcp-entry
    status: answered
    source_refs:
      - ref-cc-mcp-scopes
      - ref-cc-mcp-precedence
      - ref-cc-mcp-managed
  - question_id: mcp.definition
    section_id: mcp-definition
    status: answered
    source_refs:
      - ref-cc-mcp-envexpansion
      - ref-cc-mcp-credential
      - ref-cc-mcp-stdio
  - question_id: mcp.transport
    section_id: mcp-definition
    status: answered
    source_refs:
      - ref-cc-mcp-transports
      - ref-cc-mcp-stdio
  - question_id: mcp.auth
    section_id: mcp-auth-lifecycle
    status: answered
    source_refs:
      - ref-cc-mcp-auth
      - ref-cc-mcp-headershelper
      - ref-cc-mcp-connectors
  - question_id: mcp.lifecycle
    section_id: mcp-auth-lifecycle
    status: answered
    source_refs:
      - ref-cc-mcp-reconnect
      - ref-cc-mcp-disable
      - ref-cc-mcp-statusdetail
      - ref-cc-mcp-runtimes
      - ref-cc-mcp-toolsearch
  - question_id: mcp.capabilities
    section_id: mcp-capabilities
    status: answered
    source_refs:
      - ref-cc-mcp-toolavailability
      - ref-cc-mcp-resources
      - ref-cc-mcp-prompts
      - ref-cc-mcp-limits
      - ref-cc-mcp-dynamic
  - question_id: mcp.exposure
    section_id: mcp-capabilities
    status: answered
    source_refs:
      - ref-cc-mcp-approvals
      - ref-cc-mcp-toolapproval
      - ref-cc-mcp-orgcontrols
      - ref-cc-mcp-pluginservers
      - ref-cc-mcp-toolsearch
  - question_id: mcp.diagnostics
    section_id: mcp-diagnostics
    status: answered
    source_refs:
      - ref-cc-mcp-status
      - ref-cc-mcp-statusdetail
      - ref-cc-mcp-warnings
      - ref-cc-npm-readme
---

Claude Code 通过 MCP 连接外部工具与数据源。一个 server 的定义可以写在项目文件、用户配置或组织下发的配置里，用本地 stdio 进程或远程 HTTP、SSE、WebSocket 传输接入，连上后它的 tools、resources、prompts 分别成为可调用的能力。下面按“写在哪里、怎么写、怎么连、连上后有什么、怎么排查”五段展开；固定来源为官方 MCP 页，本章末尾说明它与已选定 npm 包快照的版本关系。

## 配置入口与作用域 {#mcp-entry}

MCP server 可以配置在三个作用域。作用域决定它在哪些项目加载、配置是否与团队共享。 [@ref-cc-mcp-scopes]

| 作用域 | 加载范围 | 是否与团队共享 | 存放位置 |
| --- | --- | --- | --- |
| local | 仅当前项目 | 否 | `~/.claude.json` |
| project | 仅当前项目 | 是，通过版本控制 | 项目根的 `.mcp.json` |
| user | 你所有项目 | 否 | `~/.claude.json` |

local 是默认作用域：运行 `claude mcp add --transport http stripe https://mcp.stripe.com` 会把它写进 `~/.claude.json` 里当前项目的条目。从 `/path/to/your/project` 运行时结果是：

```json
{
  "projects": {
    "/path/to/your/project": {
      "mcpServers": {
        "stripe": {
          "type": "http",
          "url": "https://mcp.stripe.com"
        }
      }
    }
  }
}
```

project 作用域把配置写在项目根的 `.mcp.json`，提交后团队共享。运行 `claude mcp add --transport http shared-server --scope project https://example.com/mcp` 会生成或更新这个文件，格式如下：

```json
{
  "mcpServers": {
    "shared-server": {
      "type": "http",
      "url": "https://example.com/mcp"
    }
  }
}
```

user 作用域同样写在 `~/.claude.json`，但跨项目生效，例如 `claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic`。组织还能用 `managed-mcp.json` 下发一组固定 server，用 `managedMcpServers` 向每个用户提供 server，用 `allowedMcpServers` 与 `deniedMcpServers` 限制。 [@ref-cc-mcp-scopes] [@ref-cc-mcp-managed]

同名 server 出现在多处时，Claude Code 只连接一次，取优先级最高来源的整条定义，字段不跨作用域合并。顺序是 local、project、user、插件提供的 server、claude.ai connector；组织通过 `managedMcpServers` 提供的 server 高于全部。作用域之间按名字匹配，插件与 connector 按端点匹配：只差 scheme 或 host 大小写、默认端口（如 https 的 443）、末尾斜杠的两种 URL 写法算同一端点，路径、查询串、userinfo 或非默认端口不同则算两个。 [@ref-cc-mcp-precedence]

## Server 定义、变量展开与传输 {#mcp-definition}

一个 server 条目由 `type` 决定解析方式。带 `url` 却没有 `type` 是配置错误，因为缺省按 stdio 处理，Claude Code 会跳过该 server 并报告。stdio 使用 `command`、`args`、`env`；`http`、`sse`、`ws` 使用 `url`、`headers`、`headersHelper`、`timeout`、`alwaysLoad` 与 `oauth`。`type` 取值包括 `stdio`、`http`、`sse`、`ws` 与 `sdk`；在 `.mcp.json`、`~/.claude.json` 或 `claude mcp add-json` 中，`streamable-http` 是 `http` 的别名。`type` 为 `sdk` 的进程内 server 只能由 Agent SDK 或桌面应用这类宿主注册，写在配置里会被跳过。 [@ref-cc-mcp-transports]

变量展开支持两种语法：`${VAR}` 展开为环境变量的值，`${VAR:-default}` 在变量未设置时使用默认值。可展开的位置是 `command`、`args`、`env`、`url` 与 `headers`。下面的 `.mcp.json` 条目用基址变量与凭据变量拼出 HTTP server：

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

引用的变量未设置又没有默认值时，配置仍会加载，Claude Code 在 `claude mcp list` 输出与 `/mcp` 里按变量名报警，并以未展开的原文使用。 [@ref-cc-mcp-envexpansion]

有一批凭据变量例外：在远程 server 的 `url` 与 `headers` 里，Claude Code 把它们按空值处理而不展开，`:-default` 也会被忽略，以免项目 `.mcp.json` 或插件把你的 Claude Code 或云厂商凭据发往它指定的 server。被覆盖的名字包括 `ANTHROPIC_API_KEY`、`ANTHROPIC_AUTH_TOKEN`、`AWS_BEARER_TOKEN_BEDROCK`、`HTTPS_PROXY`、`NPM_TOKEN` 等。若写 `Bearer ${ANTHROPIC_AUTH_TOKEN}`，server 收到的是没有凭据的头部，通常返回 401，Claude Code 记为连接失败。要给 server 这类凭据，需先把它复制到一个自定义名字的变量再引用。`ANTHROPIC_BASE_URL` 这类基址变量仍会展开，但值本身若内嵌凭据（如用户名密码）则不行。把一个已设置且被覆盖的变量用在远程 `url` 或 `headers` 时，`claude --debug-file` 日志里会出现一行提示。 [@ref-cc-mcp-credential]

本地 stdio server 用 `command` 加 `args` 启动；stdio 参数要放在 `--` 之后，`--` 前的旗标归 Claude Code，`--` 后的原样传给 server。环境变量用 `-e` 或 `--env` 传入，可写多组键值，且要在 `--env` 与 server 名之间至少放一个其他选项。Claude Code 在启动的 server 环境里注入 `CLAUDE_PROJECT_DIR`，指向会话项目根，供 server 解析项目相对路径；这个变量设在 server 的环境里，所以在项目 `.mcp.json` 里用 `${CLAUDE_PROJECT_DIR}` 引用时要写成带默认值的形式。下面是一条完整的 stdio 添加命令：

```bash
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server
```

[@ref-cc-mcp-stdio]

远程传输方面，HTTP 是连接远程 server 的推荐方式，也是云服务支持最广的传输。SSE 已废弃，但 Claude Code 会先试 HTTP、在 server 不接受时自动切换到 SSE；也可显式用 `claude mcp add --transport sse`。WebSocket 适合服务端主动推送，只支持 header 认证，且不能用 `--transport` 添加，只能写在 `.mcp.json` 或通过 `add-json`，例如：

```bash
claude mcp add-json events-server '{"type":"ws","url":"wss://mcp.example.com/socket","headers":{"Authorization":"Bearer YOUR_TOKEN"}}'
```

一条完整的远程 HTTP 添加命令是 `claude mcp add --transport http notion https://mcp.notion.com/mcp`；需要 Bearer token 时追加 `--header "Authorization: Bearer your-token"`。 [@ref-cc-mcp-transports]

## 认证与连接生命周期 {#mcp-auth-lifecycle}

远程 server 常用 OAuth 2.0。server 以 401 或 403 响应时被标记为需要认证，可用会话内的 `/mcp` 或命令行的 `claude mcp login 名字` 完成登录，`claude mcp logout 名字` 清除凭据。若 server 要求预先注册回调端口或预配置凭据，可在 `oauth` 对象里固定 `callbackPort`，并用 `--client-id`、`--client-secret` 提供；也可用 `oauth.scopes` 把授权范围收窄成一个空格分隔的字符串，它优先于 `authServerMetadataUrl` 与 server 自动发现的范围，未设置时由 server 决定。下面这个 `.mcp.json` 条目把 Slack server 钉到一组 scope 上：

```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://mcp.slack.com/mcp",
      "oauth": {
        "scopes": "channels:read chat:write search:read"
      }
    }
  }
}
```

客户端密钥存放在系统钥匙串或凭据文件，不写入配置。 [@ref-cc-mcp-auth]

除 OAuth 外，可用 `headersHelper` 在连接时生成请求头，适用于 Kerberos、短期 token 或内部 SSO。Claude Code 以 shell 运行该命令，把输出并入连接头，命令必须在 10 秒内把一组字符串键值对以 JSON 写到 stdout，且每次连接与重连都重新运行、不缓存结果。提供 `Authorization` 头时，它被当作该 server 的凭据，不再回退到 OAuth。示例：

```json
{
  "mcpServers": {
    "internal-api": {
      "type": "http",
      "url": "https://mcp.internal.example.com",
      "headersHelper": "/opt/bin/get-mcp-auth-headers.sh"
    }
  }
}
```

运行前需先信任声明该 server 的项目目录：父目录的信任不算，`claude -p` 或 SDK 会话对设置文件里 hooks 的自动信任也不算；未信任前 Claude Code 只带静态 `headers` 连接，并在 `-p` 或 SDK 会话里向 stderr 打印一行提示。 [@ref-cc-mcp-headershelper]

以 claude.ai 账号登录后，你在 claude.ai 添加的 connectors 会自动出现在 Claude Code；它们只在当前认证方式是 claude.ai 订阅登录时获取，`ANTHROPIC_API_KEY`、`ANTHROPIC_AUTH_TOKEN`、`apiKeyHelper` 或第三方 provider 生效时不加载。若 `/mcp` 里看不到已添加的 connector，可用 `/status` 确认生效的认证方式。 [@ref-cc-mcp-connectors]

连接生命周期：会话启动时连接已启用的 server；曾连接过的远程 HTTP 或 SSE server 在开启发现缓存时可显示 `cached` 状态，例如 `cached 2h ago · connects on first use · 5 tools`，表示工具表来自上次会话的发现缓存，首次调用该 server 的工具时才连接。掉线的远程 server 以指数退避重连，最多五次、从 1 秒起翻倍；HTTP 或 SSE 的首次连接遇瞬时错误时最多重试三次；`tools/list` 等能力发现请求在瞬时网络或服务器错误后最多重试三次。stdio 是本机进程，不会自动重连。 [@ref-cc-mcp-reconnect] [@ref-cc-mcp-statusdetail]

不想删除配置只想停用，可在 `/mcp` 面板里 toggle 关闭，Claude Code 仍会列出该 server 并标记为 disabled；这个选择按项目记录在 `~/.claude.json` 的两个互斥列表里，用户配置的 server 等用 `disabledMcpServers`，默认关闭的内置 server 用 `enabledMcpServers`。 [@ref-cc-mcp-disable]

连接走两套客户端运行时：v1 基于 MCP TypeScript SDK 1.x，v2 基于 SDK 2.0 并支持协议修订 2026-07-28。会话启动时选定并在退出前保持；拉取特性开关的会话在 2.1.232 及以上用 v2，不拉取时在 2.1.274 及以上默认 v2，也可用 `MCP_SDK_GENERATION` 指定。工具默认走 tool search 延迟加载，会话开始时只把工具名与 server 说明放进上下文。 [@ref-cc-mcp-runtimes] [@ref-cc-mcp-toolsearch]

## 能力、暴露与工具规模 {#mcp-capabilities}

tools、resources、prompts 是三类彼此独立的能力，不能用其中一项代表全部。`/mcp` 面板在每个已连接 server 旁显示工具数，并标出声明了 tools 能力却没有暴露任何工具的 server；server 可发 `list_changed` 通知动态更新这三类能力，刷新失败时保留上一次已发现的工具、提示词与资源。 [@ref-cc-mcp-toolavailability] [@ref-cc-mcp-dynamic]

resources 用输入框里的 `@` 引用，格式为 `@server:协议路径`，例如 `@github:issue:/123`，被引用时自动抓取并作为附件注入；prompts 则变成 `/servername:promptname` 命令，不带参数时直接运行，带参数时把空格分隔的若干 token 传给它。同名的保留 server 名会抑制 prompts 命令，但工具仍可用。 [@ref-cc-mcp-resources] [@ref-cc-mcp-prompts]

工具输出有上限：超过 10000 token 时显示警告，默认限制在 25000 token，超出部分落盘并以文件路径替换，警告阈值固定，可用 `MAX_MCP_OUTPUT_TOKENS` 提高上限。工具描述与 server 说明默认各截断到 2048 字符，可用 `CLAUDE_CODE_MAX_MCP_DESCRIPTION_LENGTH` 调整。 [@ref-cc-mcp-limits]

暴露与批准方面，project 作用域的 `.mcp.json` server 在交互会话里需要批准，未信任工作区时对该文件批准被忽略；`disabledMcpjsonServers` 可拒绝某 server，`--strict-mcp-config` 只使用 `--mcp-config` 传入的 server。组织可对 claude.ai connector 的工具设 `ask` 或 `blocked`。server 作者可在 `tools/list` 里把某工具标为每次调用都需人工批准：

```json
{
  "name": "grant_access",
  "description": "Requests access to a protected resource",
  "_meta": {
    "anthropic/requiresUserInteraction": true
  }
}
```

该值必须是 JSON 布尔 `true`，且标出的工具不会被匹配的 allow 规则跳过。 [@ref-cc-mcp-approvals] [@ref-cc-mcp-toolapproval] [@ref-cc-mcp-orgcontrols]

插件打包的 server 以 `mcp__plugin`、插件名、server key 与工具名组成的全限定名注册。例如插件 `my-plugin` 里 `database-tools` server 的 `query` 工具，可调用名为 `mcp__plugin_my-plugin_database-tools__query`；在权限规则、Skill 的 `allowed-tools`、子代理的 `tools` 字段或 hook matcher 里引用时要写全名，用裸 server key 写的 matcher 不会命中。server 本身以 `plugin:插件名:server名` 注册。 [@ref-cc-mcp-pluginservers]

tool search 默认开启，工具定义延迟到需要时才加载；想让某个 server 的工具始终可见，可在条目里设 `alwaysLoad` 为 `true`：

```json
{
  "mcpServers": {
    "core-tools": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "alwaysLoad": true
    }
  }
}
```

`alwaysLoad` 对所有 server 类型可用，也会让启动等待该 server 的工具（上限 5 秒连接超时）；server 也可在单个工具的 `_meta` 里写 `anthropic/alwaysLoad` 为 `true` 达到同样效果。 [@ref-cc-mcp-toolsearch]

## 诊断与版本边界 {#mcp-diagnostics}

`claude mcp add` 打印 `Added` 只表示配置已写入；`claude mcp list` 在每行旁显示健康状态，如 `Connected`、`Needs authentication`、`Failed to connect`，失败时 `claude mcp get 名字` 在 `Issue:` 行给出 HTTP 状态或错误码与 server 返回文本。有些状态只报告配置决定、不发起连接，例如 project server 尚未批准时的 `Pending approval`、被 `disabledMcpjsonServers` 拒绝、以及被项目 `disabledMcpServers` 列表停用。WebSocket server 不出现在 `claude mcp list`，要用 `claude mcp get` 或 `/mcp` 查看。 [@ref-cc-mcp-status]

`/mcp` 面板显示工具数、来源与缓存状态，并可 reconnect 或 clear authentication。曾用过的远程 HTTP 或 SSE server 可显示形如 `cached 2h ago`、`connects on first use`、`5 tools` 的缓存状态，表示工具表来自上次会话的发现缓存，首次调用该 server 的工具时才连接。 [@ref-cc-mcp-statusdetail]

配置层警告覆盖四类：值里带隐藏空白（检查 `command`、`url`、每个 `args` 条目以及 `env`、`headers` 下的值与键名，不回显值）；同名 server 在多个作用域定义了不同端点（OAuth 登录按端点存储，需要各自登录）；使用保留 server 名（如 workspace、claude-ai、computer-use 等，加载时被跳过）；`${VAR}` 引用了未设置且无默认值的变量。 [@ref-cc-mcp-warnings]

关于版本：本章所引官方 MCP 页未标注适用版本，`version_applicability` 为 unknown，正文出现的多处 2.1.x 门槛也是页面级说明。选定的 npm 包快照记录 `@anthropic-ai/claude-code` 版本为 2.1.283，但包内 README 只指向在线文档，不能据此把上述机制固定到该精确版本。 [@ref-cc-npm-readme]
