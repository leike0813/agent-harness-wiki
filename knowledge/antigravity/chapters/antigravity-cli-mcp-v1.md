---
schema_version: 3
record_kind: production
edition_id: antigravity-cli-mcp-v1
harness_id: antigravity
topic: mcp
title: Antigravity CLI 的 MCP 配置、传输、认证、能力与诊断
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-entry-locations
      - ref-agy-mcp-structure
      - ref-agy-mcp-interactive
      - ref-agy-mcp-changelog-subcommands
      - ref-agy-mcp-plugin-components
      - ref-agy-mcp-plugin-dir
      - ref-agy-mcp-plugin-locations
      - ref-agy-mcp-changelog-namespacing
      - ref-agy-mcp-settings-custom
      - ref-agy-mcp-subagent-field
      - ref-agy-mcp-changelog-subagent-mcp
      - ref-agy-mcp-changelog-plugin-config
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-properties
      - ref-agy-mcp-structure
      - ref-agy-mcp-changelog-parsing
      - ref-agy-mcp-changelog-bom
      - ref-agy-mcp-changelog-malformed
      - ref-agy-mcp-changelog-schema
      - ref-agy-mcp-changelog-schema-alt
      - ref-agy-mcp-changelog-panel-fields
      - ref-agy-mcp-changelog-url
      - ref-agy-mcp-entry-remote-note
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-entry-locations
      - ref-agy-mcp-entry-remote-note
      - ref-agy-mcp-properties
      - ref-agy-mcp-changelog-subcommands
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-google
      - ref-agy-mcp-oauth
      - ref-agy-mcp-oauth-tokens
      - ref-agy-mcp-headers
      - ref-agy-mcp-properties
      - ref-agy-mcp-changelog-oauth-code
      - ref-agy-mcp-changelog-oauth-spec
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-interactive
      - ref-agy-mcp-properties
      - ref-agy-mcp-changelog-background-load
      - ref-agy-mcp-changelog-timeout-connect
      - ref-agy-mcp-changelog-timeout-launch
      - ref-agy-mcp-changelog-timeout-bounded
      - ref-agy-mcp-changelog-reconnect
      - ref-agy-mcp-changelog-plugin-startup
      - ref-agy-mcp-changelog-plugin-cwd
      - ref-agy-mcp-changelog-process-leak
      - ref-agy-mcp-changelog-disable-path
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-concept
      - ref-agy-mcp-custom-tools
      - ref-agy-mcp-changelog-progress
      - ref-agy-mcp-changelog-background-tool
      - ref-agy-mcp-changelog-read-resource
      - ref-agy-mcp-changelog-resource-embedded
      - ref-agy-mcp-changelog-schema
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-permissions
      - ref-agy-mcp-perms-file
      - ref-agy-mcp-perms-actions
      - ref-agy-mcp-perms-wildcard
      - ref-agy-mcp-properties
      - ref-agy-mcp-changelog-namespacing
      - ref-agy-mcp-changelog-admin
      - ref-agy-mcp-changelog-tool-summary
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-agy-mcp-interactive
      - ref-agy-mcp-slash-command
      - ref-agy-mcp-changelog-subcommands
      - ref-agy-mcp-changelog-malformed
      - ref-agy-mcp-changelog-disable-path
      - ref-agy-mcp-settings-custom
      - ref-agy-mcp-troubleshooting-quickref
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs:
          - ref-agy-mcp-entry-locations
          - ref-agy-mcp-structure
          - ref-agy-mcp-interactive
          - ref-agy-mcp-changelog-subcommands
          - ref-agy-mcp-plugin-components
          - ref-agy-mcp-plugin-dir
          - ref-agy-mcp-plugin-locations
          - ref-agy-mcp-changelog-namespacing
          - ref-agy-mcp-settings-custom
          - ref-agy-mcp-subagent-field
          - ref-agy-mcp-changelog-subagent-mcp
          - ref-agy-mcp-changelog-plugin-config
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: conflict
        source_refs:
          - ref-agy-mcp-properties
          - ref-agy-mcp-structure
          - ref-agy-mcp-changelog-parsing
          - ref-agy-mcp-changelog-bom
          - ref-agy-mcp-changelog-malformed
          - ref-agy-mcp-changelog-schema
          - ref-agy-mcp-changelog-schema-alt
          - ref-agy-mcp-changelog-panel-fields
          - ref-agy-mcp-changelog-url
          - ref-agy-mcp-entry-remote-note
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs:
          - ref-agy-mcp-entry-locations
          - ref-agy-mcp-entry-remote-note
          - ref-agy-mcp-properties
          - ref-agy-mcp-changelog-subcommands
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs:
          - ref-agy-mcp-google
          - ref-agy-mcp-oauth
          - ref-agy-mcp-oauth-tokens
          - ref-agy-mcp-headers
          - ref-agy-mcp-properties
          - ref-agy-mcp-changelog-oauth-code
          - ref-agy-mcp-changelog-oauth-spec
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs:
          - ref-agy-mcp-interactive
          - ref-agy-mcp-properties
          - ref-agy-mcp-changelog-background-load
          - ref-agy-mcp-changelog-timeout-connect
          - ref-agy-mcp-changelog-timeout-launch
          - ref-agy-mcp-changelog-timeout-bounded
          - ref-agy-mcp-changelog-reconnect
          - ref-agy-mcp-changelog-plugin-startup
          - ref-agy-mcp-changelog-plugin-cwd
          - ref-agy-mcp-changelog-process-leak
          - ref-agy-mcp-changelog-disable-path
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs:
          - ref-agy-mcp-concept
          - ref-agy-mcp-custom-tools
          - ref-agy-mcp-changelog-progress
          - ref-agy-mcp-changelog-background-tool
          - ref-agy-mcp-changelog-read-resource
          - ref-agy-mcp-changelog-resource-embedded
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs:
          - ref-agy-mcp-permissions
          - ref-agy-mcp-perms-file
          - ref-agy-mcp-perms-actions
          - ref-agy-mcp-perms-wildcard
          - ref-agy-mcp-properties
          - ref-agy-mcp-changelog-namespacing
          - ref-agy-mcp-changelog-admin
          - ref-agy-mcp-changelog-tool-summary
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs:
          - ref-agy-mcp-interactive
          - ref-agy-mcp-slash-command
          - ref-agy-mcp-changelog-subcommands
          - ref-agy-mcp-changelog-malformed
          - ref-agy-mcp-changelog-disable-path
          - ref-agy-mcp-settings-custom
          - ref-agy-mcp-troubleshooting-quickref
---

本章的固定来源是官方文档快照与官方仓库快照：文档取于 2026-09-30，不含适用软件版本号；仓库固定在提交 77b1aad，只含登记文档、CHANGELOG 与示例，没有产品源码。Antigravity CLI 没有官方 npm 包，因此本章不含版本映射，按 source_only 阅读。官方 MCP 页是多形态共享页，同一页里 Antigravity 2.0、Antigravity CLI、Antigravity IDE 各有一块 tab 内容；本章只把 CLI tab 描述的机制写成 CLI 的机制，2.0 的设置界面与 IDE 的 MCP Store 只作为对照说明，不作为 CLI 能力。

## 配置入口与作用域 {#mcp-entry}

Antigravity CLI 支持本地 stdio 进程与远程主机两类 MCP server。最直接的入口是在提示面板输入 `/mcp` 回车，打开交互式 MCP Manager Overlay：可查看 server 的状态环、手动重载配置、查看实时连接日志 [@ref-agy-mcp-interactive]。配置本身分成「sparse」的全局与工作区文件：全局在 `~/.gemini/config/mcp_config.json`，工作区在项目下的 `.agents/mcp_config.json`，两者都只放一个 `mcpServers` 对象 [@ref-agy-mcp-entry-locations] [@ref-agy-mcp-structure]。

除手工编辑外，CHANGELOG 记录 CLI 提供 `agy mcp` 子命令 `add`、`remove`、`list`、`enable`、`disable`，用于改用户级 `mcp_config.json` 而不必手写；stdio 与 HTTP 两类 server 分别走 `--type`、`--env`、`--header` [@ref-agy-mcp-changelog-subcommands]。设置面板里确实有一个管理入口，但它属于 Antigravity 2.0：那里的全局设置把 MCP server、自定义 Skill 与插件归在「Customizations」分类下；CLI 没有这套图形面板，CLI 侧用的是 `agy mcp` 子命令与 `/mcp` 面板。[@ref-agy-mcp-settings-custom]

| 来源 | 位置 / 入口 | 生效范围 |
| --- | --- | --- |
| 全局文件 | `~/.gemini/config/mcp_config.json` | 该工作站所有工作区 |
| 工作区文件 | 当前项目 `.agents/mcp_config.json` | 仅该项目 |
| `/mcp` 管理器 | 交互 TUI 面板 | 当前会话 |
| `agy mcp` 子命令 | 命令行 | 用户级 `mcp_config.json` |
| 插件携带 | 插件目录内可选 `mcp_config.json` | 插件启用范围 |
| 子代理 | 定义文件 frontmatter `mcpServers` | 该子代理 |

插件是第三个来源：一个插件目录可含可选的 `mcp_config.json` 来声明外部工具 server [@ref-agy-mcp-plugin-components]，目录结构与 `plugin.json`、`hooks.json`、`skills/`、`agents/`、`rules/` 同级出现 [@ref-agy-mcp-plugin-dir]。手工安装时插件放工作区 `.agents/plugins/`（仅该项目生效）或全局 `~/.gemini/config/plugins/`（所有工作区生效）[@ref-agy-mcp-plugin-locations]。插件自带的 server 与用户或其它插件的 server 同名时会冲突，宿主已用 `{PLUGIN}_{SERVER}` 形式给插件 server 加命名空间 [@ref-agy-mcp-changelog-namespacing]；插件 server 还会先保持禁用，直到你显式启用——这一点在仓库 CHANGELOG 中针对放在 `~/.gemini/config/plugins` 且需要配置变量的插件记录过 [@ref-agy-mcp-changelog-plugin-config]。子代理也能带自己的 server：Markdown 定义文件的 frontmatter 有 `mcpServers`（`object[]`，默认空）字段 [@ref-agy-mcp-subagent-field]；用 `enable_mcp_tools: true` 创建的子代理会继承父代理已配置的 MCP server [@ref-agy-mcp-changelog-subagent-mcp]。

缺口：固定来源没有给出全局文件与工作区文件同名 server 的优先级、合并或覆盖规则，也没有说明同一 server 在多个作用域同时出现时如何取舍；这需要运行观察。本节只列可见入口，不推断优先级。

## Server 定义、字段与变量展开 {#mcp-definition}

一个 server 条目写在 `mcpServers` 对象下，键是 server 名，值是该 server 的字段集合 [@ref-agy-mcp-structure]。官方 MCP 页给出完整字段表 [@ref-agy-mcp-properties]：

| 字段 | 类型 | 必需 | 用途与生效条件 |
| --- | --- | --- | --- |
| `command` | string | 传输二选一 | stdio 传输下可执行文件路径 |
| `serverUrl` | string | 传输二选一 | 远程 Streamable HTTP 或 SSE server 的 URL |
| `args` | string[] | 否 | stdio 传输的命令行参数 |
| `env` | object | 否 | stdio server 进程的环境变量 |
| `cwd` | string | 否 | stdio server 的工作目录 |
| `headers` | object | 否 | 远程 server 的自定义 HTTP 头 |
| `authProviderType` | string | 否 | 认证提供方，支持 `google_credentials`（Google ADC） |
| `oauth` | object | 否 | OAuth 客户端凭据 `clientId`、`clientSecret` |
| `disabled` | boolean | 否 | 临时禁用该 server 而不删配置 |
| `disabledTools` | string[] | 否 | 对模型隐藏的工具名 |

同一文件里 stdio 与远程 server 可以并存，下面这段官方示例同时放了一个 stdio 的 `sqlite-explorer`（用 `command`/`args`/`env`）与一个远程的 `my-remote-server`（用 `serverUrl`/`headers`）[@ref-agy-mcp-structure]：

```json
{
  "mcpServers": {
    "sqlite-explorer": {
      "command": "node",
      "args": ["/usr/local/bin/sqlite-mcp-server.js"],
      "env": {
        "SQLITE_DB_PATH": "/var/data/app.db"
      }
    },
    "my-remote-server": {
      "serverUrl": "https://api.example.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_API_TOKEN"
      }
    }
  }
}
```

这段示例里的凭据一律是占位值；实际使用请换成你自己的 token，且不要把真实凭据写进共享文件。

解析行为由多处来源共同描述。配置文件允许单行 `//` 注释、多行 `/* */` 注释与尾随逗号，CHANGELOG 记录过解析失败随后修复 [@ref-agy-mcp-changelog-parsing]；Windows 上以 UTF-8 BOM 保存的 MCP JSON 也能解析 [@ref-agy-mcp-changelog-bom]；一条畸形条目不会拖垮其余 server，而是记日志并跳过 [@ref-agy-mcp-changelog-malformed]。工具入参 schema 的校验会保留开放对象 schema，不因为 schema 允许额外字段就拒绝未声明参数 [@ref-agy-mcp-changelog-schema]，第三方 server 的 schema 省略 `additionalProperties` 时也会通过 [@ref-agy-mcp-changelog-schema-alt]。`/mcp` 面板在切换 server 开关时会原样保留它不认识的字段（例如 `enabledTools`、`timeoutSeconds`、`url`、`tools.eager`），因此较新客户端写入的配置不会被旧面板改写掉 [@ref-agy-mcp-changelog-panel-fields]。这也说明 `mcp_config.json` 的实际字段集比官方页的表格更宽，存在第一方未在 MCP 页登记但被面板保留的键。

冲突：官方 MCP 页明确写远程连接必须用 `serverUrl`，`url` 与 `httpUrl` 等旧字段不受支持 [@ref-agy-mcp-entry-remote-note]；而仓库 CHANGELOG 记录过「为 `mcp_config.json` 增加 `url` 支持，用于直接按 URL 配置 MCP server」[@ref-agy-mcp-changelog-url]，并且在更晚的条目里继续保留 `url` 字段不被面板丢弃 [@ref-agy-mcp-changelog-panel-fields]。两者说法不一致：文档页认为 `url` 不受支持，CHANGELOG 认为 `url` 曾作为一等字段被加入并被面板保留。可能的原因是二者针对不同版本或不同解析路径（旧别名兼容层 vs 现行 schema），仅凭固定文本无法判定哪个对当前构建生效，需要运行观察：写一个只用 `url` 的远程条目，看 `/mcp` 是否连接成功。

变量展开：官方 MCP 页没有说明 CLI 是否支持在 `command`、`args`、`env`、`cwd`、`serverUrl` 等字段里写环境变量占位符或做变量展开，也没有给语法；固定来源内没有该机制的可靠语法，因此不给出示例，保留为缺口。

## 传输 {#mcp-transport}

CLI 同时支持本地 `stdio` 进程与远程主机 MCP 配置 [@ref-agy-mcp-entry-locations]。本地传输用 `command` 指定可执行文件、`args` 传参、`env` 注入环境变量、`cwd` 指定工作目录；远程传输用 `serverUrl` 指向远端 server，并用 `headers` 附加 HTTP 头 [@ref-agy-mcp-properties]。远程连接必须用 `serverUrl`，官方页的 Note 写明声明远程 SSE、Streamable HTTP 或 websocket 连接时必须定义该字段，旧的 `url`、`httpUrl` 不受支持 [@ref-agy-mcp-entry-remote-note]。命令行侧，`agy mcp` 子命令通过 `--type` 同时覆盖 stdio 与 HTTP 两类 server [@ref-agy-mcp-changelog-subcommands]。

远程传输的口径在固定来源内部略有出入：官方页的字段表把 `serverUrl` 描述为「remote `Streamable HTTP` or `SSE` servers」，只列这两种；同一页紧邻的 Note 又把远程连接写成「remote SSE, Streamable HTTP, or websocket-based」[@ref-agy-mcp-properties] [@ref-agy-mcp-entry-remote-note]。两条都来自同一页，websocket 只在 Note 出现，字段表未单列其取值方式，因此 websocket 具体怎么配（是否仍只是 `serverUrl`）在固定来源中不足以写全。本地 stdio 与远程 HTTP/SSE 的配置方式则有可直接套用的示例（见上一节的 stdio 与 remote 双示例）。

## 认证 {#mcp-auth}

远程 server 的认证有三条路径：内置 Google 凭据、自动 OAuth、自定义 HTTP 头 [@ref-agy-mcp-headers]。Google 凭据通过把 `authProviderType` 设为 `"google_credentials"` 启用，使用 Google Application Default Credentials（ADC）[@ref-agy-mcp-google]；前提是本机已配置 ADC，需要先执行 `gcloud auth application-default login`，已登录过的还要用 `gcloud auth application-default set-quota-project QUOTA_PROJECT` 设置配额项目 [@ref-agy-mcp-google]。`headers` 用于需要 API key 或 bearer token 的远程 server，把 `Authorization` 之类的头写进 `headers` 对象 [@ref-agy-mcp-headers] [@ref-agy-mcp-properties]。

OAuth 分两种情形。支持动态客户端注册（DCR）的 server，Antigravity 会自动处理 OAuth，无需额外配置 [@ref-agy-mcp-oauth]；不支持 DCR 时，在 `oauth` 里手填 `clientId` 与 `clientSecret`，并把 `https://antigravity.google/oauth-callback` 注册为该 OAuth 提供方的 redirect URI [@ref-agy-mcp-oauth]。固定来源给出的授权交互是桌面端流程：打开 Agent Settings 的 Customizations 标签，点 server 旁的 Authenticate 按钮，在浏览器完成认证后把授权码粘回面板提交，认证成功后 server 会自动重连；该小节没有标注适用形态，CLI 也没有这一图形入口，因此这里只能把它当作「共享页记录的 OAuth 流程」，CLI 实际怎么触发授权尚未查明 [@ref-agy-mcp-oauth] [@ref-agy-mcp-oauth-tokens]。同一小节说访问令牌存放在 `~/.gemini/antigravity/mcp_oauth_tokens.json`，过期自动刷新、失效则移除；路径里的 `~/.gemini/antigravity` 按 hooks 页的映射属于 Antigravity 2.0（CLI 的 app data 是 `~/.gemini/antigravity-cli`），CLI 是否使用同一文件需要运行观察 [@ref-agy-mcp-oauth-tokens]。

仓库 CHANGELOG 补了 OAuth 的两处兼容细节：授权服务器返回超过 1024 字符的授权码时曾认证失败，后已修复 [@ref-agy-mcp-changelog-oauth-code]；对不严格遵循规范的提供方（如 Salesforce、Atlassian），宿主放宽了 issuer 校验并纳入 `refresh_token` grant [@ref-agy-mcp-changelog-oauth-spec]。凭据一律只写占位值，别把真实 client secret 或 token 写进仓库内文件。

## 生命周期：启动、禁用、超时与重连 {#mcp-lifecycle}

启动时机随运行模式而变：交互式会话在后台加载 MCP server，慢或卡住的 server 不再阻塞第一个 Agent 回合；无头（headless）与一次性运行仍保持阻塞加载，好让它们那一次脚本化回合能看到完整工具集 [@ref-agy-mcp-changelog-background-load]。server 可以通过 `disabled` 布尔字段临时禁用而不删除配置 [@ref-agy-mcp-properties]。启用、禁用与重载可在 `/mcp` 面板里手动完成，面板还显示 active、disconnected、loading 三种状态与实时连接日志 [@ref-agy-mcp-interactive]。

超时有三个可观察的证据点：CHANGELOG 记录连接超时被提到 60 秒以适配启动慢的自定义 server [@ref-agy-mcp-changelog-timeout-connect]；启动 MCP server 的超时可配置，设为 `-1` 可完全关闭超时 [@ref-agy-mcp-changelog-timeout-launch]；连接、工具列举与单次工具调用三处尝试都加了上界，避免 server 永不响应时把 Agent 挂死 [@ref-agy-mcp-changelog-timeout-bounded]。重连方面，连接意外断开后强制完整重新认证的问题已修复 [@ref-agy-mcp-changelog-reconnect]，连接掉线导致 MCP 进程泄漏的问题也已修复 [@ref-agy-mcp-changelog-process-leak]。

插件携带的 server 有额外的生命周期细节：全局安装插件里的 server 曾在 CLI 启动时初始化失败、或在插件启用/禁用时状态不更新，后已修复 [@ref-agy-mcp-changelog-plugin-startup]；插件 server 的相对或未设置工作目录曾对错位置解析，现改为相对插件自身目录解析，使插件内置脚本能正确运行 [@ref-agy-mcp-changelog-plugin-cwd]。此外，从 TUI 禁用自定义 server 曾把写操作落到旧 `mcp_config.json` 路径而不是迁移后的 `config/mcp_config.json` 路径，导致禁用不生效，后已修复 [@ref-agy-mcp-changelog-disable-path]。

缺口：固定来源没有说明 server 的缓存策略（例如工具清单是否缓存、何时失效），也没有给出重试次数与退避规则；这些需要运行观察。

## 能力：Tools、Resources、Prompts {#mcp-capabilities}

MCP 让 Agent 直接取用结构化上下文或代为执行安全动作，而不必把数据库 schema、日志、API 规格手动粘进对话 [@ref-agy-mcp-concept]；其中的自定义工具是连接 server 声明的具体安全动作 [@ref-agy-mcp-custom-tools]。四类能力在固定来源里的覆盖并不一致，下面分别说明。

Tools 是文档最完整的一类：server 声明的工具可被发现与调用，长任务会回传进度回调（曾因回调被丢弃而修复，现在长时间工具调用能再次上报进度）[@ref-agy-mcp-changelog-progress]；被 server 标记为总在后台运行的工具曾作为阻塞调用执行并卡住回合，后已修复 [@ref-agy-mcp-changelog-background-tool]。工具的入参 schema 校验会保留开放对象 schema（见「Server 定义」节）[@ref-agy-mcp-changelog-schema]。

Resources 也有实际支持，但只体现在 CHANGELOG：存在 `read_resource` 读取路径，且过去会丢弃非图片的二进制资源，后来改为把所有 blob 卸到磁盘、只内联小文本与小图片，使大 PDF、音频等二进制资源可用 [@ref-agy-mcp-changelog-read-resource]；工具结果里嵌入的资源过去被静默丢弃，现已浮现到对话中 [@ref-agy-mcp-changelog-resource-embedded]。也就是说 resources 可被读取，但官方 MCP 页没有为它写配置或调用语法。

Prompts 在固定来源中没有任何记载：登记过的官方 MCP 页、CLI reference、plugins、subagents、settings、permissions 页面以及 CHANGELOG 都没有提到 MCP prompts 的发现或调用入口。因此不能断言 CLI 支持或不支持 prompts，这里保留为 unknown，读者若需要该能力应自行运行验证。结论：不能以 Tools 的支持情况代表 Resources 或 Prompts——前者有完整文档，中者有 CHANGELOG 佐证，后者无据。

## 可见性、过滤与权限 {#mcp-exposure}

默认情况下，未配置的 MCP 工具运行在 Ask 模式，需要你批准后才执行；可在策略里放行具体工具或整个 server [@ref-agy-mcp-permissions]。目标格式是 `mcp(server/tool)`（某 server 上的具体工具）、`mcp(server/*)`（某 server 的全部工具）、`mcp(*)`（所有已连 server 的任意工具），且对本地与远程 server 一视同仁 [@ref-agy-mcp-permissions]。

CLI 的细粒度权限写在全局 `~/.gemini/antigravity-cli/settings.json` 的三份清单里：`deny` 立即阻断、`ask` 暂停等你批准、`allow` 直接放行，冲突时按 Deny 大于 Ask 大于 Allow 的优先级判定 [@ref-agy-mcp-perms-file]。`mcp` action 的目标格式与匹配行为同上，默认回退为 Ask [@ref-agy-mcp-perms-actions]；通配符 `*` 在该命名空间内匹配全部目标 [@ref-agy-mcp-perms-wildcard]。除权限外，`disabledTools` 字段直接对模型隐藏指定工具名，是配置层的过滤而非权限层 [@ref-agy-mcp-properties]。

影响 Agent 实际可见与可调用能力的还有几处命名与管控细节：插件 server 用 `{PLUGIN}_{SERVER}` 命名空间，避免与用户或其它插件的同名 server 冲突，因此模型看到的工具名会带上插件前缀 [@ref-agy-mcp-changelog-namespacing]；管理员管控（admin controls）会在启动时对 MCP server 生效，过去因在认证前抓取而缓存了「admin controls not applicable」并放行全部 server 五分钟，后已修复，且内置的 Chrome DevTools MCP server 曾被误拦也已修复 [@ref-agy-mcp-changelog-admin]；每次原生与 MCP 工具调用都会带一段人类可读的短描述，同一描述也用于后台任务、子代理与权限提示中的措辞 [@ref-agy-mcp-changelog-tool-summary]。

## 诊断 {#mcp-diagnostics}

分四层检查。其一，配置是否被读取：`agy mcp list` 会列出当前 MCP server [@ref-agy-mcp-changelog-subcommands]；Antigravity 2.0 的 Customizations 面板也能看到已配置的 server，但那不是 CLI 的入口 [@ref-agy-mcp-settings-custom]。其二，server 是否连接：在提示面板输入 `/mcp`（slash 命令，Open the Model Context Protocol (MCP) server manager）打开 MCP Manager Overlay [@ref-agy-mcp-slash-command]，面板显示 active、disconnected、loading 三种状态环，并可查看实时连接日志、手动重载配置 [@ref-agy-mcp-interactive]。其三，单条配置是否被接受：一条畸形条目会被记日志并跳过，其余 server 照常加载，所以「某个 server 不见了」的处理方式是查日志里被跳过的那条 [@ref-agy-mcp-changelog-malformed]。其四，启用/禁用是否真的落盘：过去 TUI 禁用会写到旧路径 `mcp_config.json` 而非迁移后的 `config/mcp_config.json`，导致操作不生效，排查禁用无效时要确认写入的是迁移后的路径 [@ref-agy-mcp-changelog-disable-path]。

调用成功的直接证据是面板的连接日志与工具调用进度反馈（见「能力」节的长任务进度回调）。固定来源没有提供独立的状态查询子命令（如逐 server 的 `status`），也没有给出日志文件路径；官方 troubleshooting 页登记的异常条目只覆盖 PATH、keyring、剪贴板转发与自更新锁，没有 MCP 专用症状 [@ref-agy-mcp-troubleshooting-quickref]，因此 MCP 排障以 `/mcp` 面板与 CHANGELOG 的已知修复项为准。
