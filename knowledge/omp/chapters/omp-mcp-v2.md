---
schema_version: 2
record_kind: production
edition_id: omp-mcp-v2
harness_id: omp
topic: mcp
title: OMP MCP 配置与运行机制
sections:
  - section_id: mcp-config-files
    source_refs:
      - ref-omp-mcp-config-doc
  - section_id: mcp-file-shape
    source_refs:
      - ref-omp-mcp-shape-doc
      - ref-omp-mcp-types-code
  - section_id: mcp-transports
    source_refs:
      - ref-omp-mcp-transport-doc
      - ref-omp-mcp-shape-doc
      - ref-omp-mcp-types-code
      - ref-omp-mcp-config-doc
  - section_id: mcp-secrets
    source_refs:
      - ref-omp-mcp-config-doc
      - ref-omp-mcp-types-code
  - section_id: mcp-auth
    source_refs:
      - ref-omp-mcp-types-code
      - ref-omp-mcp-config-doc
  - section_id: mcp-lifecycle
    source_refs:
      - ref-omp-mcp-lifecycle-doc
  - section_id: mcp-capabilities
    source_refs:
      - ref-omp-mcp-exposure-doc
  - section_id: mcp-diagnostics
    source_refs:
      - ref-omp-mcp-lifecycle-doc
      - ref-omp-mcp-config-doc
questions:
  - question_id: mcp.entry
    section_id: mcp-config-files
    status: answered
    source_refs:
      - ref-omp-mcp-config-doc
  - question_id: mcp.definition
    section_id: mcp-file-shape
    status: answered
    source_refs:
      - ref-omp-mcp-shape-doc
  - question_id: mcp.transport
    section_id: mcp-transports
    status: answered
    source_refs:
      - ref-omp-mcp-transport-doc
  - question_id: mcp.auth
    section_id: mcp-auth
    status: partial
    source_refs:
      - ref-omp-mcp-types-code
  - question_id: mcp.lifecycle
    section_id: mcp-lifecycle
    status: answered
    source_refs:
      - ref-omp-mcp-lifecycle-doc
  - question_id: mcp.capabilities
    section_id: mcp-capabilities
    status: answered
    source_refs:
      - ref-omp-mcp-exposure-doc
  - question_id: mcp.exposure
    section_id: mcp-capabilities
    status: answered
    source_refs:
      - ref-omp-mcp-exposure-doc
  - question_id: mcp.diagnostics
    section_id: mcp-diagnostics
    status: partial
    source_refs:
      - ref-omp-mcp-lifecycle-doc
---
本章的材料来自两处固定来源：源码修订 dff728c 的官方文档，以及 npm 包 `@oh-my-pi/pi-coding-agent` 18.3.4 的包内源码。配置位置、文件形状和命令来自官方文档，字段与类型来自 18.3.4 的 `src/mcp/types.ts`。本轮调查没有启动任何 MCP server，也没有执行登录或工具调用，因此连接握手、能力发现和调用成功只按文档与源码描述，未做运行观察。当前发布没有把任何 npm 版本映射为已验证行为，按精确版本查询会返回未验证；凭据一律写成占位符或环境变量名。 [@ref-omp-mcp-config-doc]

本章的 JSON 代码块是固定文档给出的配置形态，用来说明文件名、作用域和字段含义，不是本轮验证过的可运行配置；示例里的包名、URL、路径和凭据都沿用文档示意或占位，读者需替换成自己的值。

## 配置位置与作用域 {#mcp-config-files}

OMP 的 MCP 配置同时来自多个工具，但读者自己维护时应固定使用 OMP 原生文件。项目作用域是工作目录下的 `.omp/mcp.json`，用户作用域默认是 `~/.omp/agent/mcp.json`。这两个是 OMP 自己创建和改动的主要文件，其余位置只读兼容。 [@ref-omp-mcp-config-doc]

命名 profile 只改变用户作用域。默认 profile 的用户文件是 `~/.omp/agent/mcp.json`；激活名为 NAME 的 profile 后，用户文件变成 `~/.omp/profiles/NAME/agent/mcp.json`，该 profile 只看到自己的用户级 server，不会读到默认 profile 的那一份。项目 `.omp/mcp.json` 跟随工作目录，在哪个 profile 下都生效。 [@ref-omp-mcp-config-doc]

原生 provider 另外读 `.omp/.mcp.json` 与 `~/.omp/agent/.mcp.json` 作为兼容文件，工作目录根的 `mcp.json` 与 `.mcp.json` 作为回退文件。OMP 还会转译 Claude Code、Codex、Gemini CLI、OpenCode、Cursor、Windsurf、VS Code 以及已安装插件的 server 声明；这些来源的加载顺序与是否可写由各自 provider 决定，本章把它们当作只读来源。项目作用域的加载可以用设置 `mcp.enableProjectConfig` 关闭。 [@ref-omp-mcp-config-doc]

检查方式：`/mcp list` 会显示每个 server 来自哪个配置文件，修改文件后用 `/mcp reload` 在当前会话里重新发现并连接。 [@ref-omp-mcp-config-doc]

## 文件形状与最小 stdio 配置 {#mcp-file-shape}

OMP 原生 MCP 文件是 JSON，顶层支持四个键。`$schema` 是给编辑器用的 JSON Schema 地址；`mcpServers` 是名称到 server 配置的映射；`disabledServers` 是当前 profile 用户的拒绝名单，按名字隐藏任意来源的 server，优先级最高；`enabledServers` 是当前 profile 用户的允许名单，可以强制启用某个来源里标记为 `enabled: false` 的同名项，但拒绝名单仍然优先。 [@ref-omp-mcp-shape-doc]

下面是固定文档里最小 stdio 形态的样例，包名与路径沿用文档的 Filesystem 例子：

```json
{
  "$schema": "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/src/config/mcp-schema.json",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/absolute/path/one"]
    }
  }
}
```

`command` 是要启动的可执行文件，必填；`args` 是传给它的参数数组，这里用 `npx -y` 拉起官方 Filesystem server 并给出一个绝对路径，读者应换成自己的目录。这条命令会去取第三方 npm 包，本轮没有运行它，也不保证能下载或启动，配置形态来自固定文档而已。生效结果是 OMP 在会话启动时尝试连接该 server，并把它的工具注册进运行时工具表，工具名字由 `mcp__` 前缀、server 名、下划线和工具名拼成。检查方式是 `/mcp list` 确认它来自哪个文件，再用 `/mcp test filesystem` 单独测试。 [@ref-omp-mcp-shape-doc] [@ref-omp-mcp-types-code]

`disabledServers` 与 `enabledServers` 是跨来源覆盖，不只作用于同一个文件：

```json
{
  "disabledServers": ["github"],
  "enabledServers": ["tool-owned-server"]
}
```

`github` 无论来自哪个来源都会被隐藏；`tool-owned-server` 若在别处被标成 `enabled: false`，这里会把它重新启用。设置 `mcp.enableProjectConfig: false` 则在去重之前排除全部项目级来源，让同名的用户条目得以保留。 [@ref-omp-mcp-shape-doc]

## 传输类型与 stdio／HTTP／SSE 配置 {#mcp-transports}

传输由 server 配置里的 `type` 决定：省略或写 `"stdio"` 走 stdio；`"http"` 走 Streamable HTTP；`"sse"` 走旧的 HTTP+SSE，先 GET 打开事件流再 POST 请求。 [@ref-omp-mcp-transport-doc]

三种传输的字段不同。stdio 的 `command` 必填，`args`、`env`、`cwd` 可选；http 与 sse 的 `type` 和 `url` 必填，`headers` 可选。同一份项目文件里可以放多个不同传输的 server，各自独立成项。 [@ref-omp-mcp-types-code] [@ref-omp-mcp-shape-doc]

stdio 最小块：

```json
{
  "mcpServers": {
    "local-tools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "some-mcp-server"],
      "env": { "SOME_TOKEN": "SOME_TOKEN" }
    }
  }
}
```

`command` 是被启动的可执行文件，`args` 是参数数组，`env` 的值在连接前按下一节规则解析。检查方式：`/mcp list` 看该 server 的配置来源，`/mcp test local-tools` 单独测试它。 [@ref-omp-mcp-config-doc]

HTTP 最小块：

```json
{
  "mcpServers": {
    "hosted-tools": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": { "Authorization": "Bearer ${MCP_TOKEN}" }
    }
  }
}
```

`url` 是远程端点，`headers` 的值同样在下一节解析。检查方式：`/mcp list` 显示它是 http 传输，`/mcp test hosted-tools` 验证连接。 [@ref-omp-mcp-config-doc]

SSE 最小块（旧式）：

```json
{
  "mcpServers": {
    "legacy-remote": {
      "type": "sse",
      "url": "https://example.com/mcp/sse"
    }
  }
}
```

`sse` 与 `http` 的字段相同，区别在传输实现，新 server 一般应写成 `http`，检查方式与 http 相同。 [@ref-omp-mcp-config-doc]

验证规则：stdio 需要 `command`；http 与 sse 需要 `url`；同一个 server 不能同时设置 `command` 和 `url`；未知的 `type` 被拒绝。省略 `type` 等于 stdio，所以把远程配置粘过来却忘了 `"type": "http"`，OMP 会按 stdio 处理并报缺少 `command`。 [@ref-omp-mcp-config-doc]

## 变量与凭据占位 {#mcp-secrets}

发现 OMP 原生文件和回退文件时，OMP 会对字符串值做 `${VAR}` 与 `${VAR:-default}` 展开，覆盖 `command`、`args`、`env`、`cwd`、`url`、`headers`、`auth` 和 `oauth`；没有解析到的占位符保持字面值。连接一个 stdio server 或发起 HTTP/SSE 请求之前，OMP 再解析 `env` 与 `headers` 的值：以 `!` 开头的值会当作 shell 命令执行，10 秒超时，取裁剪后的标准输出并在进程内缓存；命令失败、超时或只输出空白时该条被省略；否则整个值若正好是一个已设置的环境变量名，就用该变量的值，未设置则用字面值。 [@ref-omp-mcp-config-doc] [@ref-omp-mcp-types-code]

需要把真实凭据留在文件之外时，用环境变量名或命令形式，不要写死 token。下面这块用 `${GITHUB_TOKEN}` 而不是真实值：

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": { "Authorization": "Bearer ${GITHUB_TOKEN}" }
    }
  }
}
```

`Bearer ${GITHUB_TOKEN}` 在发现期展开成字面 `Bearer ` 加当前 shell 的 `GITHUB_TOKEN` 值，整段作为请求头的值；这一替换只保证把环境变量的值放进 header，token 本身是否通过鉴权取决于它是否有效，本章不宣称运行成功。也可以把值写成 `"!op read op://dev/github/token"` 这类命令形式，由命令输出提供凭据。 [@ref-omp-mcp-config-doc]

## 认证与 OAuth 元数据 {#mcp-auth}

stdio server 的字段包含 `command`、`args`、`env`，以及 OMP 专有的 `envPolicy: literal` 与 `envLiteralKeys`；`auth` 与 `oauth` 是可选的认证元数据。 [@ref-omp-mcp-types-code]

`oauth` 用于需要显式客户端或回调设置的 server，字段含 `clientId`、`clientSecret`、`redirectUri`、`callbackPort`、`callbackPath`、`prompt`；`auth` 告诉 OMP 到哪里取和刷新存储的凭据。没有写回调设置时，本地监听默认走端口 3000、路径 `/callback`。OAuth 凭据按 profile 与 server URL 绑定存放，所以一份提交到仓库的定义文件即使不写 `auth`，也会解析当前 profile 自己授权得到的凭据。 [@ref-omp-mcp-config-doc]

一个只写占位符的 HTTP 加 OAuth 条目：

```json
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://mcp.slack.com/mcp",
      "oauth": {
        "clientId": "YOUR_CLIENT_ID",
        "clientSecret": "YOUR_CLIENT_SECRET"
      }
    }
  }
}
```

缺口：本轮只读实现，没有执行登录、回调或凭据刷新，所以托管凭据是否真正注入、刷新是否成功没有运行观察，`auth` 与 `oauth` 各字段的实际效果也没有逐一验证。`"apikey"` 虽然是可接受的 `type`，但它不会从 auth 存储里加载或注入 API key，API key 仍要放在 stdio 的 `env` 或远程的 `headers` 里。 [@ref-omp-mcp-config-doc]

## 连接与生命周期 {#mcp-lifecycle}

会话启动时会按来源发现 server，再对每个 server 并行发起连接与 `tools/list`。初始发现最多等待 250 毫秒，较慢的连接在后台继续：有工具缓存时先用缓存构造延迟工具，没有缓存时该 server 在启动阶段不贡献工具，等后台完成后通过回调把工具注册进来。等待窗口可以用设置 `mcp.startupTimeoutMs` 改变，或用环境变量 `OMP_MCP_STARTUP_TIMEOUT_MS` 覆盖；设为 0 表示等待初始连接稳定。 [@ref-omp-mcp-lifecycle-doc]

管理器的状态由多张连接表推导：在连接表里算 connected，在待连接、待工具加载或待重连表里算 connecting，其余算 disconnected。传输断开时 OMP 按 500、1000、2000、4000 毫秒退避自动重连；30 秒内重连超过 5 次会触发熔断，暂停自动重连，直到手动 `/mcp reconnect`。流式调用遇到可重试的连接错误也会重连并重试一次。 [@ref-omp-mcp-lifecycle-doc]

在 print 模式（`-p`、`--mode text|json`）下，OMP 还会在第一轮之前等待所有配置的 server 加载完工具或失败，上限为 `OMP_MCP_TIMEOUT_MS`，默认 30 秒；把该变量设为 0 会关掉这个等待，一个无响应的 server 就可能一直阻塞 print 模式。 [@ref-omp-mcp-lifecycle-doc]

## 能力暴露与命名 {#mcp-capabilities}

连接成功后，server 的工具会在会话启动时转换成 custom tool 并注册进运行时工具表；resources、resource templates、prompts 与可选订阅由管理器在工具加载之后分别尽力刷新，任一项存在不蕴含其余项可用。 [@ref-omp-mcp-exposure-doc]

工具注册名由 `mcp__` 前缀、小写并清理为字母与下划线的 server 名、下划线和工具名组成。若两个不同来源铸出同一个运行名，OMP 会记录冲突，并按原始 server 与工具身份保留一个确定性的赢家，重连顺序不能改变归属。 [@ref-omp-mcp-exposure-doc]

## 诊断与排查 {#mcp-diagnostics}

`/mcp list` 显示每个 server 的配置来源与连接状态，`/mcp test NAME` 测试单个 server，`/mcp reload` 断开全部、重新发现并刷新工具，`/mcp reconnect NAME` 只重连一个 server，`/mcp reauth NAME` 替换托管 OAuth 凭据，`/mcp resources`、`/mcp prompts`、`/mcp notifications` 查看工具之外的能力。 [@ref-omp-mcp-config-doc]

状态模型本身给出连接级诊断：connected、connecting、disconnected 分别由不同的表推导，据此可以区分配置是否被读到、连接是否建立。缺口在于本轮没有启动任何 server，所以配置被读取、连接成功、工具可见、调用成功这四级里，后两级仍缺直接运行证据，本章只能说明它们各自由哪些观察入口回答。 [@ref-omp-mcp-lifecycle-doc]

