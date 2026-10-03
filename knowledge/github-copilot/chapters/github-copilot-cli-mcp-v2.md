---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-mcp-v2
harness_id: github-copilot
topic: mcp
title: "GitHub Copilot CLI 的 MCP 服务器：配置入口、传输与鉴权、能力暴露与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-github-copilot-mcpconc-overview, ref-github-copilot-mcpconc-availability, ref-github-copilot-mcpconc-github, ref-github-copilot-mcpconc-registry, ref-github-copilot-mcpconc-security, ref-github-copilot-invoke-mcp, ref-github-copilot-cmdref-mcp, ref-github-copilot-cmp-mcp]
  - section_id: mcp-entry-definition
    surface_ids: [cli]
    source_refs: [ref-github-copilot-mcp-add, ref-github-copilot-mcp-add-cmd, ref-github-copilot-mcp-add-cli, ref-github-copilot-mcp-configfile, ref-github-copilot-mcp-perrepo, ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-sub, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-priority, ref-github-copilot-cmdref-mcp-migrate, ref-github-copilot-cmdref-options, ref-github-copilot-cfgdir-mcp, ref-github-copilot-cfgdir-overview, ref-github-copilot-agentsref-mcp, ref-github-copilot-agentsref-mcp-type, ref-github-copilot-agentsref-mcp-env, ref-github-copilot-pluginref-legacy-mcp]
  - section_id: mcp-transport-auth
    surface_ids: [cli]
    source_refs: [ref-github-copilot-mcp-add-cmd, ref-github-copilot-mcp-add-cli, ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-transport, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-cmdref-mcp-oauth, ref-github-copilot-cfgdir-overview, ref-github-copilot-agentsref-mcp-env, ref-github-copilot-repochangelog-mcp-github-auth]
  - section_id: mcp-capabilities-exposure
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-cmdref-mcp-trust, ref-github-copilot-cmdref-mcp-allowlist, ref-github-copilot-cmdref-mcp-sub, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-toolpatterns, ref-github-copilot-config-mcp-tools, ref-github-copilot-conc-tools-approval, ref-github-copilot-mcp-manage, ref-github-copilot-mcp-use, ref-github-copilot-mcpconc-github, ref-github-copilot-admin-mcp]
  - section_id: mcp-lifecycle-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-sub, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-cmdref-mcp-priority, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-env, ref-github-copilot-cmdref-options, ref-github-copilot-mcp-add-cmd, ref-github-copilot-mcp-manage, ref-github-copilot-mcp-perrepo, ref-github-copilot-cfgdir-mcp]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-github-copilot-mcp-add, ref-github-copilot-mcp-add-cmd, ref-github-copilot-mcp-add-cli, ref-github-copilot-mcp-configfile, ref-github-copilot-mcp-perrepo, ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-sub, ref-github-copilot-cmdref-mcp-priority, ref-github-copilot-cmdref-options, ref-github-copilot-cfgdir-mcp, ref-github-copilot-pluginref-legacy-mcp, ref-github-copilot-agentsref-mcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-mcp-configfile, ref-github-copilot-cfgdir-mcp, ref-github-copilot-cfgdir-overview, ref-github-copilot-agentsref-mcp, ref-github-copilot-agentsref-mcp-type, ref-github-copilot-agentsref-mcp-env]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-github-copilot-cmdref-mcp-transport, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-mcp-add-cmd, ref-github-copilot-mcp-add-cli, ref-github-copilot-cmdref-mcp]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: partial
        source_refs: [ref-github-copilot-cmdref-mcp-oauth, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-cfgdir-overview, ref-github-copilot-agentsref-mcp-env, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-repochangelog-mcp-github-auth]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-cmdref-mcp-priority, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-env, ref-github-copilot-mcp-add-cmd, ref-github-copilot-mcp-manage, ref-github-copilot-mcp-perrepo, ref-github-copilot-cmdref-mcp-sub]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: partial
        source_refs: [ref-github-copilot-mcp-use, ref-github-copilot-cmdref-mcp, ref-github-copilot-mcpconc-github, ref-github-copilot-mcp-manage]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-local, ref-github-copilot-cmdref-mcp-remote, ref-github-copilot-cmdref-mcp-trust, ref-github-copilot-cmdref-mcp-allowlist, ref-github-copilot-cmdref-mcp-sub, ref-github-copilot-cmdref-options, ref-github-copilot-cmdref-toolpatterns, ref-github-copilot-config-mcp-tools, ref-github-copilot-conc-tools-approval, ref-github-copilot-admin-mcp]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-diagnostics
        status: answered
        source_refs: [ref-github-copilot-cmdref-mcp, ref-github-copilot-cmdref-mcp-sub, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-env, ref-github-copilot-mcp-manage]
---

## 来源与适用范围 {#mcp-scope}

本章只覆盖 GitHub Copilot CLI（`copilot` 二进制，npm 包 `@github/copilot`）这一 surface 的 MCP（Model Context Protocol）支持。软件闭源，因此证据只有官方文档站 `docs.github.com` 的 markdown 归档页与公开仓库 `github/copilot-cli`；全章是来源级知识，不绑定任何已发布版本。

MCP 是"应用如何向 LLM 共享上下文"的开放标准；GitHub 用它把 Copilot 接到外部数据源与工具，横跨 IDE、CLI、GitHub Copilot app 与 GitHub.com 上的云 agent [@ref-github-copilot-mcpconc-overview]。在 CLI 上，本地与远程 MCP server 都支持，且 **GitHub MCP server 内置、无需额外配置即可使用** [@ref-github-copilot-mcpconc-availability]。企业/组织可以用 **MCP servers in Copilot** 策略决定成员能否使用 MCP，该策略默认关闭，且只对有 Copilot Business / Copilot Enterprise 订阅的成员生效 [@ref-github-copilot-mcpconc-overview]。GitHub MCP server 由 GitHub 提供与维护，用来自动化代码相关任务、让第三方工具接入 GitHub 上下文，并调用 GitHub 侧工具（如 Copilot cloud agent、code scanning）；其 toolset 可裁剪以改善工具选择与安全性 [@ref-github-copilot-mcpconc-github]。对公开仓库以及纳入 GitHub Advanced Security 的私有仓库，与 GitHub MCP server 的交互受 push protection 保护，阻断 AI 生成响应中的密钥 [@ref-github-copilot-mcpconc-security]。GitHub MCP Registry 是伙伴与社区 MCP server 的策展清单，处于 public preview [@ref-github-copilot-mcpconc-registry]。

CLI 的这些 MCP server 是内置的、开箱可用 [@ref-github-copilot-invoke-mcp]：

| Server | 用途 |
| --- | --- |
| `github-mcp-server` | GitHub API 集成：issue、pull request、label、commit、code search、GitHub Actions |
| `playwright` | 浏览器自动化：导航、点击、输入、截图、表单 |
| `fetch` | 通过 `fetch` 工具发 HTTP 请求 |
| `time` | 时间工具：`get_current_time`、`convert_time` |

`github-mcp-server` 暴露 `get_file_contents`、`search_code`、`list_issues`、`issue_read`、`search_issues`、`get_pull_request`、`list_pull_requests`、`get_pull_request_files`、`list_commits`、`get_commit`、`list_workflow_runs`、`get_workflow_run_logs`、`get_label`、`list_label`、`label_write` 等工具 [@ref-github-copilot-cmdref-mcp]。从 CLI 的视角看，MCP server 就是"内置工具不够用时"向外部系统补充工具的方式 [@ref-github-copilot-cmp-mcp]。

## 配置入口与定义格式 {#mcp-entry-definition}

CLI 提供四条配置入口：交互式 `/mcp add`、终端 `copilot mcp add`、直接编辑配置文件、以及仓库级文件；此外还支持 plugin 自带与 `--additional-mcp-config` 会话级注入 [@ref-github-copilot-mcp-add]。持久化 server 定义写在 `~/.copilot/mcp-config.json` [@ref-github-copilot-cmdref-mcp]，该文件是用户级 MCP 定义，对所有会话生效，且被项目级定义在重名时覆盖 [@ref-github-copilot-cfgdir-mcp]。

`/mcp add` 打开一个配置表单（Tab 切换字段）：填 **Server Name**，选 **Server Type**，再按类型填写其余字段，最后 Ctrl+S 保存；保存后 server 立即可用、无需重启 CLI [@ref-github-copilot-mcp-add-cmd]。终端侧等价的 `copilot mcp add` 把 server 写入 `~/.copilot/mcp-config.json`：本地 server 在 `--` 之后给出命令，远程 server 用 `--transport http SERVER-NAME URL`；可用选项包括 `--env KEY=VALUE`、`--header "HEADER: VALUE"`、`--transport`（`stdio`/`http`/`sse`，默认 `stdio`）、`--tools`、`--timeout MS` [@ref-github-copilot-mcp-add-cli]。`copilot mcp add` 是 `copilot mcp` 子命令族的一员，该族还包含 `list`、`get`、`enable`/`disable`、`remove` [@ref-github-copilot-cmdref-mcp-sub]。

直接编辑 `~/.copilot/mcp-config.json` 适合分享配置或一次加入多个 server。文档给出的最小示例如下（来源：Editing the configuration file 一节的 JSON 示例）[@ref-github-copilot-mcp-configfile]：

```json
{
  "mcpServers": {
    "playwright": {
      "type": "local",
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {},
      "tools": ["*"]
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": { "CONTEXT7_API_KEY": "YOUR-API-KEY" },
      "tools": ["*"]
    }
  }
}
```

**项目级配置**：CLI 在 Git 仓库内从当前工作目录向上走到仓库根，沿途加载 `.mcp.json`（本地/每 checkout，通常放项目根）与 `.github/mcp.json`（提交进仓库的共享配置）；同目录两者并存时 `.mcp.json` 优先；重名时越接近工作目录的定义越优先；项目级定义整体优先于 `~/.copilot/mcp-config.json` [@ref-github-copilot-mcp-perrepo]。项目级文件既可用 `mcpServers` 顶层对象，也可用"每个键就是一个 server 名"的裸顶层格式；下面的裸格式示例来自同一节 [@ref-github-copilot-mcp-perrepo]：

```json
{
  "playwright": {
    "type": "local",
    "command": "npx",
    "args": ["@playwright/mcp@latest"]
  }
}
```

交互式表单里的 Environment Variables 字段接受逗号分隔的 `KEY=VALUE` 或 JSON 对象（例如 `{"API_KEY":"secret"}`），`$PATH` 默认已包含、无需列出 [@ref-github-copilot-mcp-add-cmd]。命令行 `copilot mcp add --show-secrets` 会把环境变量与 header 的完整值打印出来，文档明确警告只在可信环境使用 [@ref-github-copilot-cmdref-mcp-sub]。**加载优先级**（高到低）为：`--additional-mcp-config` > plugin 提供的 server > 工作区 server（`.mcp.json`/`.github/mcp.json`，需目录受信）> `~/.copilot/mcp-config.json` [@ref-github-copilot-cmdref-mcp-priority]；`--additional-mcp-config=JSON` 可用 JSON 字符串或 `@文件路径` 给出，仅对本次会话生效，并覆盖同名已安装 server [@ref-github-copilot-cmdref-options]。

**字段**：本地 server 的配置字段（该表为定义格式的权威来源）——`command`（必填）、`args`（必填，数组）、`tools`（必填，`["*"]` 或具体工具名列表）、`env`（可选，环境变量）、`cwd`（可选，工作目录）、`timeout`（可选，工具发现与调用的毫秒超时，默认 `30000`）、`type`（可选，`local`/`stdio`，默认 `local`）、`deferTools`、`disableToolCache`、`slowConnectionThresholdMs` [@ref-github-copilot-cmdref-mcp-local]。用户级配置文件本身与 `COPILOT_HOME` 的关系见配置目录参考（默认 `~/.copilot`，可用 `COPILOT_HOME` 改写）[@ref-github-copilot-cfgdir-overview]。除 CLI 专属格式外，自定义 agent profile 用 YAML 的 `mcp-servers` 属性表达同一套配置，是"仓库 JSON 格式的 YAML 表示"；其 `stdio` 类型被映射为 `local`，且支持 `${{ secrets.X }}`、`${{ vars.X }}` 等密文/变量替换语法 [@ref-github-copilot-agentsref-mcp][@ref-github-copilot-agentsref-mcp-type][@ref-github-copilot-agentsref-mcp-env]。plugin 也能携带 server 定义，agent 包内的 `mcp-servers` 只作用于该 agent [@ref-github-copilot-pluginref-legacy-mcp]。

从 VS Code 的 `.vscode/mcp.json` 迁移时，CLI 不读取该文件（其顶层键 `servers` 不受支持）；迁移即把 `servers` 重映射为 `mcpServers`，文档给出 `jq '{mcpServers: .servers}' .vscode/mcp.json > .mcp.json` 与等价 PowerShell 命令 [@ref-github-copilot-cmdref-mcp-migrate]。

## 传输与鉴权 {#mcp-transport-auth}

**传输类型**有三种：`local`/`stdio`（本地进程，经 stdin/stdout 通信，必填 `command`、`args`）、`http`（远程 streamable HTTP，别名 `streamable-http` 会被归一化为 `http`，必填 `url`）、`sse`（远程 Server-Sent Events，必填 `url`）[@ref-github-copilot-cmdref-mcp-transport]。交互式 `/mcp add` 表单里对应的是 **Local/STDIO** 与 **HTTP/SSE** 两组；选本地时填 Command（例如 `npx @playwright/mcp@latest`）与 Environment Variables，选远程时填 URL 与 HTTP Headers [@ref-github-copilot-mcp-add-cmd]。`copilot mcp add` 用 `--transport stdio|http|sse` 指定，默认 `stdio` [@ref-github-copilot-mcp-add-cli]。

远程 server 的字段（权威表）在 `type`、`url`、`tools` 之外还有 `headers`（可选，支持变量展开）、`oauthClientId`、`oauthScopes`、`oauthPublicClient`、`oauthGrantType`、`oidc`、`timeout`、`deferTools`、`slowConnectionThresholdMs` [@ref-github-copilot-cmdref-mcp-remote]。其中 `oauthClientId` 是静态 client ID，用于跳过动态注册；`oauthScopes` 是非空的 scope 数组、必须搭配 `oauthClientId`，但 server 的 `WWW-Authenticate` 挑战里给出的非空 scope 优先级更高，否则才覆盖发现到的 `scopes_supported`；`oauthPublicClient` 默认 `true`，机密客户端需设为 `false` 并存放 secret；`oidc` 打开 OIDC token 注入，本地 server 会为 `env` 里引用的 `GITHUB_COPILOT_OIDC_MCP_TOKEN` 系变量注入 token，远程 server 则把 token 作为 `Bearer` `Authorization` 头发送 [@ref-github-copilot-cmdref-mcp-remote]。

带鉴权 header 的远程 server 示例（来源：`copilot mcp add` 子命令一节）[@ref-github-copilot-mcp-add-cli]：

```shell
copilot mcp add --transport http \
  --header "Authorization: Bearer YOUR-TOKEN" \
  stripe https://mcp.stripe.com
```

本地与远程的 `env`/`headers` 都支持 `$VAR`、`${VAR}`、`${VAR:-default}` 形式的变量展开 [@ref-github-copilot-cmdref-mcp-local][@ref-github-copilot-cmdref-mcp-remote]。agent YAML 侧额外支持 `${{ secrets.X }}` 与 `${{ vars.X }}` [@ref-github-copilot-agentsref-mcp-env]。

**OAuth**：使用 OAuth 的远程 server 在 token 过期或需要换账号时会显示 `needs-auth` 状态，用 `/mcp auth SERVER-NAME` 触发新的 OAuth 流程（打开浏览器登录/切换账号），完成后 server 自动重连；Windows 上受 Microsoft Entra ID 保护的 server 走 OS 认证代理（Web Account Manager），`--device-code` 可绕过代理强制 device code 流程 [@ref-github-copilot-cmdref-mcp-oauth]。**Headless OAuth**：`oauthGrantType: "client_credentials"` 面向无浏览器的 CI/cron，要求 `oauthClientId`、`oauthPublicClient: false`，以及存放在系统 keychain 的 `client_secret`（可经 `/mcp` UI 一次性写入 OAuth 凭据存储）；配置后 CLI 跳过浏览器、callback、PKCE 与动态注册，每次 401 直接向发现的 token 端点 POST `grant_type=client_credentials` [@ref-github-copilot-cmdref-mcp-remote]。文档给出的 headless 示例（来源：Headless OAuth 一节）[@ref-github-copilot-cmdref-mcp-remote]：

```json
{
  "mcpServers": {
    "headless-api": {
      "type": "http",
      "url": "https://api.example.com/mcp",
      "tools": ["*"],
      "oauthClientId": "YOUR-CLIENT-ID",
      "oauthPublicClient": false,
      "oauthGrantType": "client_credentials"
    }
  }
}
```

凭据落盘：当 keychain 不可用时，OAuth token、注册与 PKCE 回退文件写入 `~/.copilot/mcp-oauth-config/`，MCP secret 占位符的回退文件与索引写入 `~/.copilot/mcp-secrets/`，两者均由 CLI 自动管理 [@ref-github-copilot-cfgdir-overview]。

stdio 传输把 stdout 独占给按行分隔的 JSON-RPC 帧：CLI 在交给协议解析器前会过滤非 JSON 行（纯文本日志、异常栈、纯空白行），因此 server 的诊断输出必须写 stderr；超过 1 MB 的行跳过结构检查直接转发，以免丢弃合法的大 `tools/list` 响应 [@ref-github-copilot-cmdref-mcp]。

**GitHub 账号鉴权的来源范围**：仓库 `changelog.md` 记录 1.0.90 新增 `--mcp-github-auth`，用于把 GitHub 账号鉴权限定到已批准的 MCP server origin [@ref-github-copilot-repochangelog-mcp-github-auth]。这仍是发布说明级别的证据——本轮登记的官方文档页（命令参考、MCP 概念与 how-to、配置目录参考）都还没有描述这个标志的取值、默认值和适用传输，因此 `mcp.auth` 的完整语义在已固定来源范围内属于未覆盖，不在此给出配置写法。

## 能力发现与暴露面 {#mcp-capabilities-exposure}

**能力与使用**：CLI 把 MCP server 提供的工具纳入可用工具集，Copilot 会在相关时自动使用，也可在提示里直接点名 server 与具体工具以确保使用 [@ref-github-copilot-mcp-use]。`/mcp show SERVER-NAME` 会列出该 server 提供的工具 [@ref-github-copilot-mcp-manage]。

关于 **resources / prompts**：登记来源里没有建立 CLI 对 MCP resources 与 prompts 的发现或使用机制——`/mcp show`、`copilot mcp get` 展示的都是"工具"，别名 `Resource discovery` 指的是实验性的远程目录检索（用内置 `discover-resources` skill 找 public MCP server/skill），并非 MCP 协议的资源项 [@ref-github-copilot-cmdref-mcp]。唯一相关表述来自 GitHub MCP server 的 toolset，称 toolset "在适用时也包含相关的 MCP resources 与 prompts"，这是对该 server 的通用描述而非 CLI 行为 [@ref-github-copilot-mcpconc-github]。因此 `mcp.capabilities` 中 tools 已确立，resources/prompts 在 CLI 上按 unknown 处理。

**工具过滤**：每个 server 的 `tools` 字段是必填项，`["*"]` 表示全部、或给出具体工具名列表 [@ref-github-copilot-cmdref-mcp-local][@ref-github-copilot-cmdref-mcp-remote]；`copilot mcp add --tools` 接受 `"*"`、逗号分隔列表或 `""`（表示不启用任何工具）[@ref-github-copilot-cmdref-mcp-sub]。`deferTools`（`auto` 默认 / `never`）控制工具搜索开启时该 server 的工具是否始终可见 [@ref-github-copilot-cmdref-mcp-local]。`filterMapping` 控制工具输出的后处理，取值为 `none`、`markdown`、`hidden_characters`（默认）[@ref-github-copilot-cmdref-mcp]。另有 server **initialization instructions**：默认只有 allowlist 内 server 的初始化指令会放进系统提示，其余按需检索；`--allow-all-mcp-server-instructions` 可改为全部前置 [@ref-github-copilot-cmdref-options]。

**命名与净化**：server 名可以是任意可打印字符（含空格、Unicode、标点），但控制字符（U+0000–U+001F、U+007F）与右花括号 `}` 不允许；server 名是工具名的前缀 [@ref-github-copilot-cmdref-mcp]。发给模型前，server 名与工具名中凡不属于 `a-z`、`A-Z`、`0-9`、`-`、`_` 的字符替换为 `-`，Unicode 走 Punycode 编码，`@` 也替换为 `-`；`serverName-toolName` 总长上限 64 字符，截断导致冲突时追加数字后缀保证唯一 [@ref-github-copilot-cmdref-mcp]。

**信任与批准**：server 按来源分级——内置（High）、仓库 `.github/mcp.json`（Medium）、工作区 `.mcp.json`（Medium）、用户配置（User-defined）、远程 server（Low）；所有 MCP 工具调用都要求显式许可，即便对外部服务的只读操作也一样 [@ref-github-copilot-cmdref-mcp-trust]。`--allow-tool`/`--deny-tool` 接受 `Kind(argument)` 形式的权限模式，其中一种 Kind 就是 SERVER-NAME（如 `MyMCP(create_issue)`、`MyMCP`），deny 恒优先于 allow [@ref-github-copilot-cmdref-toolpatterns]。用 `MCP_SERVER_NAME` 允许/拒绝某 server 的工具，工具名放在括号里，省略工具名即覆盖该 server 全部工具，例如 `copilot --deny-tool='My-MCP-Server(tool_name)'` [@ref-github-copilot-config-mcp-tools]；`--allow-all-tools`、`--allow-tool`、`--deny-tool` 三者与交互式批准提示共同构成批准面 [@ref-github-copilot-conc-tools-approval]。

**企业 allowlist**：GitHub Enterprise 可对非默认 server 强制 allowlist。CLI 检测到企业 registry 策略（或启用 `MCP_ENTERPRISE_ALLOWLIST` 实验特性）后，按 command、args、远程 URL 计算指纹，发给企业 allowlist 评估端点，只放行获批的 server，其余以指明企业的消息阻断；该检查 fail-closed——端点不可达或报错时非默认 server 一律阻断 [@ref-github-copilot-cmdref-mcp-allowlist]。企业与组织的 MCP 策略适用于 CLI：可配置 registry URL 供开发者发现获批 server，并用 allowlist 限制哪些 server 可运行 [@ref-github-copilot-admin-mcp]。内置默认 server 始终豁免 allowlist [@ref-github-copilot-cmdref-mcp-allowlist]。

## 生命周期与诊断 {#mcp-lifecycle-diagnostics}

**启动与生效**：持久 server 定义在 `~/.copilot/mcp-config.json`，会话级 server 经 `--additional-mcp-config` 注入 [@ref-github-copilot-cmdref-mcp]。交互式新加的 server 保存后立即可用、无需重启 CLI [@ref-github-copilot-mcp-add-cmd]。工作区 server（`.mcp.json`/`.github/mcp.json`）只有在目录受信时才加载：交互式首启需确认目录信任，未受信目录里会被静默跳过；prompt 模式（`copilot -p`）下若目录未受信默认跳过，可用 `GITHUB_COPILOT_PROMPT_MODE_WORKSPACE_MCP=true` 强制加载 [@ref-github-copilot-mcp-perrepo]。工作区配置中某条 server 条目非法时只跳过该条并打印形如 `Warning: workspace MCP config "PATH": MESSAGE` 的警告，文件整体损坏（JSON 非法或顶层结构非法）才整份跳过 [@ref-github-copilot-cmdref-mcp-priority]。

**禁用/启用与重启**：`/mcp disable SERVER-NAME` 让 server 保持配置但不再被使用，设置在会话间持久；`/mcp enable` 恢复 [@ref-github-copilot-mcp-manage]。`copilot mcp enable/disable` 写入用户配置并作用于后续会话 [@ref-github-copilot-cmdref-mcp-sub]。`--disable-mcp-server=SERVER-NAME` 与 `--enable-mcp-server=SERVER-NAME` 只作用于本次会话、不落盘；`--disable-builtin-mcps` 关闭所有内置 server [@ref-github-copilot-cmdref-options]。

**编辑与删除的作用域**：`/mcp edit NAME` 会拒绝工作区来源的 server（定义在某仓库 `.mcp.json` 里的那个），不会打开用户层向导，理由是保存会悄悄造出一个同名用户条目、而工作区条目仍然遮蔽它；错误信息直接指出该编辑哪个文件，`/mcp delete NAME` 同样会报告该文件 [@ref-github-copilot-cmdref-mcp]。`copilot mcp remove NAME` 只删除用户级 server，工作区 server 必须直接改其配置文件 [@ref-github-copilot-cmdref-mcp-sub]。

**私有 npm registry**：`args` 数组里可用 `--registry` 从私有 npm registry（如 Artifactory 或 GitHub Packages）拉包；`--registry` 以及其它 npm 配置项（`--userconfig`、`--globalconfig`、`--prefix`、`--cache`、`--node-options`、`--workspace`、`-w`）在计算 server 身份指纹时被视为"消费取值的参数"，以保证企业 allowlist 检查与 registry 校验在包名之前出现这些选项时仍正确 [@ref-github-copilot-cmdref-mcp]。

**超时与缓存**：工具发现与工具调用的 `timeout` 默认 `30000` ms；`slowConnectionThresholdMs`（默认 `10000`）只决定何时打印"连接较慢"的警告，不改变连接预算——实际连接预算以 `timeout` 为准且下限为 `60000` ms，二者相互独立 [@ref-github-copilot-cmdref-mcp-local][@ref-github-copilot-cmdref-mcp-remote]。本地 server 的工具列表快照会被持久化，使启动时工具立即可用、实时发现随后在后台替换；`disableToolCache: true` 只对该 server 强制实时发现，`COPILOT_MCP_TOOL_CACHE=false` 则对整个进程关闭快照加载与持久化，两者都不动已有缓存文件 [@ref-github-copilot-cmdref-mcp][@ref-github-copilot-cmdref-env]。在沙箱内启动的本地 stdio server 状态显示为 `connected (sandboxed)`（实验特性）；切换 `/sandbox` 只重启本地 server，远程 HTTP/SSE server 保持连接 [@ref-github-copilot-cmdref-mcp]。

**诊断入口**：`/mcp` 打开插件仪表盘并固定到 MCP server 列表，`/mcp list` 打印同样的纯文本列表（含连接状态与实时状态），`/mcp show SERVER-NAME` 打开单个 server 详情与其工具，可选启用/禁用；`/mcp` 还有 `reload` 子命令 [@ref-github-copilot-cmdref-slash]。`copilot mcp list [--json]` 按来源分组列出所有 server（含 plugin 提供者），`copilot mcp get SERVER-NAME [--json]` 显示类型、状态与可用工具，plugin 提供的 server 还显示来源 plugin 名与版本 [@ref-github-copilot-cmdref-mcp-sub]。文本输出里被禁用的 server 带 `(disabled)` 后缀，`--json` 里为 `"enabled": false`，`copilot mcp get` 显示 `Status: Enabled`/`Disabled` 行 [@ref-github-copilot-cmdref-mcp]。`/env` 会列出已加载的 MCP server 等环境细节，是排查"配置有没有被读到"的入口 [@ref-github-copilot-cmdref-slash]。stdio server 若把日志写到 stdout 会触发解析错误反馈并卡住初始化握手，CLI 的非 JSON 行过滤会静默丢弃这类帧，是排查"连不上"的一条线索 [@ref-github-copilot-cmdref-mcp]。用户配置文件位置由 `COPILOT_HOME` 控制 [@ref-github-copilot-cfgdir-mcp]。

缺口：登记来源没有描述连接失败后的重试/退避策略、健康检查周期、或"工具调用成功/失败"的独立诊断输出，因此"何时启动或连接、重连、重试"只能确认到"会话加载 + sandbox 切换重启 + OAuth 完成后自动重连"这几点，`mcp.lifecycle` 按 partial 处理；已查入口为 `copilot mcp` 子命令、`/mcp` 与 `cmdref` 的 MCP server configuration 一节，均未给出重试语义 [@ref-github-copilot-cmdref-mcp][@ref-github-copilot-cmdref-mcp-sub]。
