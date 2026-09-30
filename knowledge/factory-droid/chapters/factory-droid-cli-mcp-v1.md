---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-mcp-v1
harness_id: factory-droid
topic: mcp
title: "Droid CLI 的 MCP：配置分层、传输、OAuth、能力暴露与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-fd-mcp-config, ref-fd-mcp-registry, ref-fd-mcp-interactive, ref-fd-cli-mcp-ref, ref-fd-mcp-cli-manage, ref-fd-mcp-schema, ref-fd-mcp-policy, ref-fd-settings-available]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-fd-mcp-cli-add, ref-fd-mcp-schema, ref-fd-mcp-tool-filter, ref-fd-mcp-expansion, ref-fd-mcp-timeouts]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-fd-mcp-cli-add, ref-fd-mcp-schema]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-fd-mcp-oauth, ref-fd-mcp-cli-add, ref-fd-mcp-config, ref-fd-mcp-permissions, ref-fd-mcp-expansion]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-fd-mcp-tool-filter, ref-fd-mcp-interactive, ref-fd-hooks-structure, ref-fd-mcp-per-droid, ref-fd-mcp-policy, ref-fd-mcp-policy-host, ref-fd-mcp-policy-stdio, ref-fd-mcp-schema, ref-fd-org-mcp]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-mcp-cli-manage, ref-fd-mcp-interactive, ref-fd-mcp-config, ref-fd-mcp-permissions, ref-fd-mcp-policy, ref-fd-mcp-expansion, ref-fd-settings-available, ref-fd-mcp-timeouts]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-fd-mcp-config, ref-fd-mcp-registry, ref-fd-mcp-interactive, ref-fd-cli-mcp-ref]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-fd-mcp-cli-add, ref-fd-mcp-schema, ref-fd-mcp-expansion, ref-fd-mcp-tool-filter]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-fd-mcp-cli-add, ref-fd-mcp-schema]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-fd-mcp-oauth, ref-fd-mcp-config, ref-fd-mcp-permissions, ref-fd-mcp-cli-add, ref-fd-mcp-expansion]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-fd-mcp-config, ref-fd-mcp-schema, ref-fd-mcp-policy, ref-fd-settings-available, ref-fd-mcp-cli-manage]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: partial
        source_refs: [ref-fd-mcp-tool-filter, ref-fd-mcp-interactive, ref-fd-mcp-schema]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-fd-mcp-policy, ref-fd-mcp-policy-host, ref-fd-mcp-policy-stdio, ref-fd-mcp-per-droid, ref-fd-hooks-structure]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-fd-mcp-cli-manage, ref-fd-mcp-interactive, ref-fd-mcp-permissions, ref-fd-mcp-expansion, ref-fd-mcp-policy, ref-fd-settings-available, ref-fd-mcp-timeouts]
---

## 配置入口、作用域与生命周期 {#mcp-entry}

本章的固定来源是官方文档站 `harness/mcp` 页面快照（https://docs.factory.com/harness/mcp.md）、`droid-cli/settings` 与 `droid-cli/cli-reference` 页面快照；产品 CLI 不开源，整章按 source_only 阅读。

MCP server 配置放在各作用域的 `mcp.json` 中，三层的用途分别是：User 在 `~/.factory/mcp.json`，对该机所有项目生效；Folder 在项目任意祖先目录的 `.factory/mcp.json`，供共同父目录下的嵌套项目共享；Project 在项目根的 `.factory/mcp.json`，随仓库提交给团队。[@ref-fd-mcp-config]

几条会直接影响操作的规则 [@ref-fd-mcp-config]：

- 用 `droid mcp add` 或注册表添加的 server 一律写入 **user** 配置。
- **项目级 server 不能用 CLI 或 `/mcp` 界面删除**，要删只能直接改 `.factory/mcp.json`。
- 对项目级 server 做启用/禁用时，Droid 把带新状态的副本写进你的 user 配置，项目文件保持不变，队友不受影响。
- 同一名字在多级出现时只加载一个定义；org 托管 server 与 MCP policy 总是优先；`/mcp` 管理器会显示每个 server 来自哪个文件。
- `mcp.json` 改动后 Droid 自动重载，新 server 立即可用。

`/mcp` 打开交互管理器，可以浏览 server 与连接状态、查看每个 server 提供的工具、启停 server、完成 OAuth 授权、清除凭据、从注册表一键添加、删除用户级 server；`/mcp off` 关闭当前会话中所有可配置的 server，org 托管 server 不受影响。注册表内置 40 多个预配置 server（linear、sentry、notion、figma、stripe、supabase、vercel、playwright 等），选中后按需完成浏览器授权即可使用。[@ref-fd-mcp-interactive][@ref-fd-mcp-registry]

非交互场景用 CLI 子命令：`droid mcp add`、`droid mcp remove`、`droid mcp list`、`droid mcp permissions`；`/mcp` 与这些命令操作的是同一份配置。[@ref-fd-cli-mcp-ref][@ref-fd-mcp-cli-manage]

生命周期相关条件：`disabled: true` 只是暂时停用而不删除；被 org `mcpPolicy` 拒绝的 server 仍留在 `mcp.json` 并会被读入配置，但会被过滤掉、不运行也不出现在 `/mcp` 中；`blockOnMcpLoad` 设为 `true` 时 Droid 会等 MCP server 加载完成才开始 agent 回合。[@ref-fd-mcp-schema][@ref-fd-mcp-policy][@ref-fd-settings-available]

## Server 定义与字段 {#mcp-definition}

CLI 添加语法由 transport 标志决定后续参数的解析方式 [@ref-fd-mcp-cli-add]：

```bash
droid mcp add SERVER_NAME URL_OR_COMMAND --type stdio
droid mcp add airtable "npx -y airtable-mcp-server" --env AIRTABLE_API_KEY=your_key
droid mcp add linear https://mcp.linear.app/mcp --type http
droid mcp add example-sse https://mcp.example.com/sse --type sse --header "Authorization: Bearer YOUR_TOKEN"
```

第一行的占位符在官方页面写作尖括号形式：`SERVER_NAME` 是 server 名，`URL_OR_COMMAND` 是 URL 或带引号的命令，`--type` 取 `stdio`、`http`、`sse` 之一。[@ref-fd-mcp-cli-add]

- `--type` 省略时默认 `stdio`。
- `--env KEY=VALUE` 只对 stdio 生效，可重复。
- `--header "KEY: VALUE"` 只对 http/sse 生效，可重复。
- `--no-oauth` 关闭远程 server 的 OAuth 尝试，并在配置中写入 `oauth: false`。

文件里的共同字段与默认值 [@ref-fd-mcp-schema]：

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `type` | `"stdio"`、`"http"`、`"sse"` | 传输方式；stdio 可省略，默认即 stdio |
| `disabled` | boolean | 暂时停用，默认 `false` |
| `disabledTools` | string[] | 该 server 中不加载的工具名清单；被排除的工具不会注册给模型，也不占上下文 |
| `timeout` | number | 单次工具调用的超时（毫秒），只约束调用本身而非首次连接；省略时回落到内置默认 |
| `connectTimeout` | number | 首次握手连接超时（毫秒）；省略时 http/sse 默认 10 秒，stdio 默认 30 秒 |

transport 专有字段：stdio 用 `command`、`args`（数组）、`env`（对象）；http 与 sse 用 `url`、`headers`（对象）、`oauth`（覆盖对象或 `false`）。[@ref-fd-mcp-schema]

工具裁剪在文件里用 `disabledTools` 持久化，其余工具照常加载；用 `/mcp` 可以看到 server 暴露的准确工具名再回填。[@ref-fd-mcp-tool-filter]

变量展开：Droid 在连接 server 时把 `mcp.json` 中的 `${NAME}` 按当前 shell 环境展开，用来把密钥留在文件外；只支持 `${NAME}`，没有默认值语法。原始文件不会被改写，展开只发生在内存中。若引用的变量未设置，Droid 会保留占位符并在 server 下次启动时给出警告。[@ref-fd-mcp-expansion]

超时的解析：per-server 的 `timeout` 与 `connectTimeout` 覆盖内置默认值，**没有全局超时设置**；调大超时只改变 Droid 等待的时间，不会延长 MCP server 或其上游的限制。[@ref-fd-mcp-timeouts]

## 传输方式 {#mcp-transport}

Droid 支持三种传输 [@ref-fd-mcp-cli-add]：

| 传输 | 形态 | 何时使用 |
| :-- | :-- | :-- |
| `stdio` | 本地进程，通过标准输入输出通信 | 需要直接访问本机系统或工具的场景；`--env` 传环境变量 |
| `http` | Streamable HTTP，当前 MCP 标准，内部用 SSE 流式返回 | 连接云端服务与 API 的推荐方式；`--header` 传认证头 |
| `sse` | 旧的独立 HTTP+SSE 传输 | 只有旧式独立 SSE 端点的 server，仅在此情况下才选它 |

配置形态与默认值：`type` 省略即 stdio；`command` 是 stdio 的可执行文件，含空格时要加引号；http/sse 用 `url` 指向端点。[@ref-fd-mcp-schema][@ref-fd-mcp-cli-add]

首次连接的超时按 transport 区分，http/sse 默认 10000 毫秒、stdio 默认 30000 毫秒，可用 `connectTimeout` 覆盖。[@ref-fd-mcp-schema]

## 认证与凭据 {#mcp-auth}

远程 server 的 OAuth 默认零配置：Droid 自动发现授权服务器、通过 Dynamic Client Registration 注册客户端，并在 server 支持 Client ID Metadata Documents 时使用 Factory 发布的客户端元数据。只有在提供方需要自定义信任或兼容策略时才写 `oauth` 覆盖。[@ref-fd-mcp-oauth]

`oauth` 对象（http/sse）常用字段：`clientId`、`clientSecret`、`authorizationServerIssuer`（使用前两者时必填）、`clientMetadataUrl`（自定义 CIMD 文档的 HTTPS 地址）、`tokenEndpointAuthMethod`（`none`、`client_secret_basic`、`client_secret_post`）、`callbackPort`；设为 `false` 则完全关闭该 server 的 OAuth。用 header 或 API key 认证的 server 可以在添加时用 `--no-oauth` 直接写入这个关闭值。[@ref-fd-mcp-oauth][@ref-fd-mcp-cli-add]

OAuth token 存在系统 keyring（或回落文件）中，**不按项目隔离**：在某个项目完成授权后，所有配置了该 server 的地方都已授权；需要清除时用 `/mcp` 的 Clear Auth。[@ref-fd-mcp-config]

批准过的 MCP 工具可以被记住并跨会话持久化，每条批准绑定 server 传输配置的稳定指纹（stdio 的命令与参数，或 http/sse 的 URL）；如果同名 server 之后被指向不同的命令或 URL，旧批准不再适用，必须重新批准。用 `droid mcp permissions list`、`revoke`、`clear --confirm` 管理这些批准。[@ref-fd-mcp-permissions]

项目级 `.factory/mcp.json` 会提交进仓库，因此不要把 header token、`oauth.clientSecret` 或 API key 写进去；把它们放在 user 配置、环境变量（配合 `${NAME}` 展开）或 keyring 里。[@ref-fd-mcp-config][@ref-fd-mcp-expansion]

## 能力暴露与权限 {#mcp-exposure}

- 工具是文档明确描述的能力面：`disabledTools` 在加载期就把工具排除，被排除的工具不会注册给模型，也不占上下文；`/mcp` 展示每个 server 实际暴露的工具清单，便于把准确名字回填到过滤列表。[@ref-fd-mcp-tool-filter][@ref-fd-mcp-interactive]
- MCP 工具在 Droid 内部按 `mcp__server__tool` 命名（例如 `mcp__memory__create_entities`），因此 hook 与工具策略可以用 `mcp__.*` 这类模式匹配整个 server。[@ref-fd-hooks-structure]
- 自定义 droid 用 frontmatter 的 `mcpServers` 限定可用 server；`mcpServers: []` 排除全部 MCP server；更细的控制可以在 `tools` 里写确切的 MCP 工具 ID。[@ref-fd-mcp-per-droid]
- 组织的 MCP 访问是 allowlist-only：`mcpPolicy` 默认不启用（`enabled` 缺省即 `false`），启用后每个 server 必须匹配至少一条 allowlist 条目才能运行，空或缺省的 allowlist 会阻断所有 server（即使项目或用户配置了它们），并且**没有** MCP blocklist；它通过托管设置强制，用户不能覆盖。[@ref-fd-org-mcp]
- 企业 `mcpPolicy.enabled` 为 `true` 时启用 allowlist：匹配的是远程 server 的主机名或 stdio 的命令与参数，**不是**配置里的 server 名；启用且 allowlist 为空或缺省时**所有** server 都被阻断。被拒绝的 server 仍在配置里，但从运行与 `/mcp` 中过滤掉，用户无法覆盖。[@ref-fd-mcp-policy]
- 远程主机名按主机名匹配：可以用裸主机名或 HTTP/HTTPS URL（URL 只取其主机名），scheme、端口、凭据、路径、查询串与片段都不构成限制；`*` 匹配零个或多个字符（含点），可跨多级子域；不含通配符的条目同时匹配主机名本身与其子域。[@ref-fd-mcp-policy-host]
- stdio 条目按命令与参数的子串匹配（先小写并只保留 ASCII 字母数字）；`*` 在归一化中被移除而非展开，因此 `fig*mcp` 变成 `figmcp`，空匹配符（裸 `*`）无法通过。允许 `npx` 这类启动器比允许包名宽得多，且这只是子串判断，不做包身份或完整性校验。[@ref-fd-mcp-policy-stdio]

**缺口**：8 个固定问题中 `mcp.capabilities` 要求分别说明 tools、resources、prompts 能否被发现和使用，而官方 MCP 页面只描述 tools（以及「额外的工具和上下文」），没有给出 resources 或 prompts 的发现与使用方式；因此该题只记录已证实的 tools 部分，resources/prompts 保持未验证。[@ref-fd-mcp-schema][@ref-fd-mcp-interactive]

## 诊断 {#mcp-diagnostics}

- `droid mcp list` 列出每个已配置 server 及其连接与认证状态：`connected`、`connecting`、`needs authentication`、`failed`；需要 OAuth 的 server 在完成 `/mcp` 登录前一直显示 `needs authentication`。[@ref-fd-mcp-cli-manage]
- `/mcp` 管理器显示连接状态、每个 server 暴露的工具、以及 server 来自哪个配置文件；org 托管 server 与 policy 的优先级也在这里可见。[@ref-fd-mcp-interactive][@ref-fd-mcp-config]
- 调用层面的批准记录用 `droid mcp permissions list` 查询，`revoke` 可按 server 或单个工具撤销，server 传输配置指纹改变会导致旧批准失效。[@ref-fd-mcp-permissions]
- 配置被读取但 server 未出现时，先确认是否被 `mcpPolicy` 过滤、是否在错误的层（`droid mcp add` 只写 user 层）、以及 `${NAME}` 引用的环境变量是否已设置。[@ref-fd-mcp-policy][@ref-fd-mcp-expansion]
- `blockOnMcpLoad` 为 `false`（默认）时 agent 回合不会等待 server 加载完成，MCP 工具可能晚于首轮出现；需要严格顺序时在设置中打开它。[@ref-fd-settings-available]
- MCP 工具调用超时只有 per-server 的 `timeout` 可调，回落到内置默认；把超时调到很大也不会延长 server 自身或上游的超时。[@ref-fd-mcp-timeouts]
