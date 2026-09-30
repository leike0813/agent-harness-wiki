---
schema_version: 3
record_kind: production
edition_id: goose-cli-mcp-v1
harness_id: goose
topic: mcp
title: "Goose CLI 的 MCP 扩展：配置、定义、传输、认证、生命周期与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-container, ref-goose-mcp-doc-deeplink, ref-goose-mcp-doc-midsession, ref-goose-mcp-doc-session-ext, ref-goose-mcp-src-entry, ref-goose-mcp-src-name-key, ref-goose-plugin-src-mcp-naming]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-extensions, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-oauth-client, ref-goose-mcp-src-availability, ref-goose-mcp-src-default-timeout, ref-goose-mcp-src-env-alias, ref-goose-mcp-src-resolve, ref-goose-mcp-src-stdio-fields, ref-goose-plugin-src-mcp-naming]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-extensions, ref-goose-mcp-doc-add, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-oauth-client, ref-goose-mcp-doc-oauth-port, ref-goose-mcp-src-sse]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-goose-allowlist-doc, ref-goose-mcp-cli-doc, ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-enable, ref-goose-mcp-doc-midsession, ref-goose-mcp-doc-platform, ref-goose-mcp-doc-toggle, ref-goose-mcp-src-flags]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-goose-allowlist-doc, ref-goose-config-doc-toolfilter, ref-goose-hooks-doc-tool-keys, ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-roots, ref-goose-perms-doc-modes, ref-goose-perms-doc-tool]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-config-cli-doc, ref-goose-config-doc-toolfilter, ref-goose-mcp-cli-doc, ref-goose-mcp-doc-session-ext, ref-goose-mcp-src-sse, ref-goose-perms-doc-modes, ref-goose-perms-doc-tool]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-container, ref-goose-mcp-doc-deeplink, ref-goose-mcp-doc-midsession, ref-goose-mcp-doc-session-ext, ref-goose-mcp-src-entry, ref-goose-mcp-src-name-key, ref-goose-plugin-src-mcp-naming]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-goose-config-doc-extensions, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-oauth-client, ref-goose-mcp-src-availability, ref-goose-mcp-src-default-timeout, ref-goose-mcp-src-env-alias, ref-goose-mcp-src-resolve, ref-goose-mcp-src-stdio-fields, ref-goose-plugin-src-mcp-naming]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-goose-config-doc-extensions, ref-goose-mcp-doc-add, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-oauth-client, ref-goose-mcp-doc-oauth-port, ref-goose-mcp-src-sse]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-goose-config-doc-extensions, ref-goose-mcp-doc-add, ref-goose-mcp-doc-config-entry, ref-goose-mcp-doc-oauth-client, ref-goose-mcp-doc-oauth-port, ref-goose-mcp-src-sse]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-goose-allowlist-doc, ref-goose-mcp-cli-doc, ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-enable, ref-goose-mcp-doc-midsession, ref-goose-mcp-doc-platform, ref-goose-mcp-doc-toggle, ref-goose-mcp-src-flags]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-goose-allowlist-doc, ref-goose-config-doc-toolfilter, ref-goose-hooks-doc-tool-keys, ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-roots, ref-goose-perms-doc-modes, ref-goose-perms-doc-tool]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-goose-allowlist-doc, ref-goose-config-doc-toolfilter, ref-goose-hooks-doc-tool-keys, ref-goose-mcp-doc-add, ref-goose-mcp-doc-auto, ref-goose-mcp-doc-roots, ref-goose-perms-doc-modes, ref-goose-perms-doc-tool]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-goose-config-cli-doc, ref-goose-config-doc-toolfilter, ref-goose-mcp-cli-doc, ref-goose-mcp-doc-session-ext, ref-goose-mcp-src-sse, ref-goose-perms-doc-modes, ref-goose-perms-doc-tool]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938` 的官方文档与 Rust 源码快照。goose 把 MCP server 称为「扩展」（extension）：扩展基于 MCP，可以连接任意 MCP server，也包含随发行版打包的内置扩展 [@ref-goose-mcp-doc-add]。文档快照不含适用软件版本号，源码为来源级知识。

## 配置入口与作用域 {#mcp-entry}

一个扩展写在配置文件 `~/.config/goose/config.yaml`（Windows 为 `%APPDATA%\Block\goose\config\config.yaml`）的 `extensions` 键下，键是扩展名，值是「条目字段 + 类型化配置」的扁平结构 [@ref-goose-mcp-doc-config-entry]。源码里对应的类型是 `ExtensionEntry { enabled, #[serde(flatten)] config }`，配置键常量是 `extensions`；条目缺 `name` 字段时会用映射键补上，字段写错的条目不阻塞其余条目，只记一条 info 日志并跳过 [@ref-goose-mcp-src-entry]。扩展名到配置键的归一化规则是：只保留 ASCII 字母数字与 `_`、`-`，丢弃空白，其它字符换成 `_`，最后转小写 [@ref-goose-mcp-src-name-key]。

官方文档给出的最小文件示例（stdio 与远程各一，凭据为占位值）[@ref-goose-mcp-doc-config-entry]：

```yaml
extensions:
  github:
    name: GitHub
    cmd: npx
    args: [-y @modelcontextprotocol/server-github]
    enabled: true
    envs: { "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN" }
    type: stdio
    timeout: 300

  remote-example:
    name: Remote Example
    type: streamable_http
    uri: https://example.com/mcp
    enabled: true
    timeout: 300
```

除手工编辑外共有五个入口，作用域各不相同：

| 入口 | 作用范围 | 说明 |
| --- | --- | --- |
| `config.yaml` 的 `extensions` | 所有新会话的默认值 | 直接编辑，改动对新会话生效 [@ref-goose-mcp-doc-config-entry] |
| `goose configure` → Add / Toggle / Remove Extension | 同上，写回配置文件 | 交互式，可加内置、命令行（stdio）与 Streamable HTTP 三类 [@ref-goose-mcp-doc-add] |
| 深链 `goose://extension?...` | 同上（安装/注册） | stdio 用 `cmd`/`arg`/`id`/`name`/`description`/`timeout`；远程用 `url`/`type=streamable_http`；所有参数需 URL 编码 [@ref-goose-mcp-doc-deeplink] |
| 会话语启动参数 | 仅当前会话 | `--with-extension`（stdio 命令）、`--with-streamable-http-extension`（URL，可带 `timeout=N`）、`--with-builtin`（逗号分隔）；文档强调此时扩展**不会被安装**，只在本次会话启用 [@ref-goose-mcp-doc-session-ext] |
| 插件目录 | 插件启用范围 | 插件可用 `.mcp.json` 或清单 `mcpServers` 提供 server，转成 `ExtensionConfig::Stdio`，名为 `PLUGIN:SERVER` 并展开 `${PLUGIN_ROOT}` [@ref-goose-plugin-src-mcp-naming] |

会话中途也能增删：交互式会话用 `/extension 命令` 加 stdio 扩展、`/builtin 名字` 加内置扩展，改动只影响当前会话，不改默认列表 [@ref-goose-mcp-doc-midsession]。另有 `--container` 在 Docker/devcontainer 工作流里把扩展跑进容器 [@ref-goose-mcp-doc-container]。

作用域差异：配置文件与 `goose configure` 是持久的用户级默认；会话参数、斜杠命令、自动推荐启用的扩展都是**会话级**，会话结束即失效 [@ref-goose-mcp-doc-session-ext] [@ref-goose-mcp-doc-auto]。

## Server 定义字段与解析规则 {#mcp-definition}

文档列出的条目字段与其用途 [@ref-goose-config-doc-extensions]：

| 字段 | 类型 | 用途 |
| --- | --- | --- |
| `type` | string | `builtin`、`platform`、`stdio`、`streamable_http`（SSE 不支持） |
| `name` | string | 内部名；缺省用映射键回填 |
| `display_name` | string? | 展示名 |
| `enabled` | bool | 是否启用 |
| `bundled` | bool | 是否随 goose 附带 |
| `timeout` | number | 单次工具调用等待秒数，默认 300 |
| `available_tools` | array | 只加载列出的工具；留空（默认）加载全部 |

按类型的专有字段：stdio 用 `cmd`、`args`、`envs`、`env_keys`、`cwd`；streamable_http 用 `uri`、`headers`、`envs`、`env_keys`；builtin 只带 `name`/`display_name`/`timeout`/`bundled`/`available_tools`；platform 没有 `timeout` [@ref-goose-config-doc-extensions] [@ref-goose-mcp-src-stdio-fields]。

解析细节（源码可核对）：默认超时是常量 `DEFAULT_EXTENSION_TIMEOUT = 300` 秒 [@ref-goose-mcp-src-default-timeout]；stdio 条目接受 `env:` 作为 `envs:` 的别名，值进入同一环境变量表 [@ref-goose-mcp-src-env-alias]；`Platform` 类型的扩展只有当 `name_to_key(name)` 命中宿主已知的平台扩展表时才可用，未命中会在解析时被静默丢弃，而 builtin/stdio/streamable_http 一律保留 [@ref-goose-mcp-src-availability]；配置被读取为「新会话可用扩展」时会再做一次同样的可用性过滤 [@ref-goose-mcp-src-resolve]。

变量展开：插件来源的 server 会把 `command`、`args`、`env` 值、`cwd` 里的字面量 `${PLUGIN_ROOT}` 替换为插件根路径，并注入同名环境变量 [@ref-goose-plugin-src-mcp-naming]。文档另外说明远程扩展的 `client_id` 支持 `$VAR`/`${VAR}` 替换 [@ref-goose-mcp-doc-oauth-client]；通用 `${VAR}` 展开的实现不在本次签出范围，因此除上述两处外不给出语法示例。

`env_keys` 与 `envs` 的分工：`env_keys` 只写环境变量**名字**，goose 在扩展启动时解析其值——先取同名环境变量，再取 goose 的密钥存储（系统钥匙串，或钥匙串禁用时的 `secrets.yaml`）；`envs` 则把键值直接写进配置 [@ref-goose-mcp-doc-config-entry]。密钥值不要写进共享的配置文件。

## 传输与认证 {#mcp-transport}

支持的传输形态由 `type` 决定 [@ref-goose-config-doc-extensions]：

| 类型 | 形态 | 关键字段 | 备注 |
| --- | --- | --- | --- |
| `stdio` | 本地进程，标准输入输出 | `cmd`、`args`、`envs`/`env_keys`、`cwd` | CLI 里显示为「Command-line Extension」 |
| `streamable_http` | 远程主机 | `uri`、`headers` | CLI 里显示为「Remote Extension (Streamable HTTP)」 |
| `builtin` | 随 goose 附带的内置扩展 | `name`、`display_name` | 文档强调这些内置扩展本身就是 MCP server，可给别的 agent 用 |
| `platform` | 在 agent 进程内运行的平台扩展 | `name`、`display_name` | 无 `timeout` |

配置入口把三类写在交互菜单里：内置、命令行、远程 Streamable HTTP [@ref-goose-mcp-doc-add]。**SSE 不受支持**：宿主对 `type: sse` 的条目发出一条警告 `'KEY': SSE is unsupported, migrate to streamable_http`，文档同样要求把旧的 SSE 配置迁移到 `streamable_http` [@ref-goose-mcp-src-sse]。

认证有三条路径：

* **自定义 HTTP 头**：远程 server 需要 API key 或 bearer token 时写在 `headers` 里 [@ref-goose-mcp-doc-config-entry]。
* **OAuth（自动）**：支持 Client ID Metadata Documents 或动态客户端注册（DCR）的授权服务器无需额外配置 [@ref-goose-mcp-doc-oauth-client]。
* **OAuth（预注册客户端）**：服务器两种都不支持时，在扩展上设置 `client_id`（优先级高于 CIDM 与 DCR，支持 `$VAR`/`${VAR}` 替换）、可选的 `client_secret_key`（该值只放**键名**，指向 `envs`/`env_keys` 或 goose 密钥存储，机密本身永不写进配置），以及 `scopes`（省略时按服务器元数据选择，可能比实际需要更宽）[@ref-goose-mcp-doc-oauth-client]。

OAuth 回调在 `127.0.0.1` 上用临时端口；若授权服务器只允许固定端口的预注册 redirect URI，用环境变量 `GOOSE_OAUTH_CALLBACK_PORT` 指定固定端口 [@ref-goose-mcp-doc-oauth-port] [@ref-goose-mcp-doc-oauth-client]。

远程扩展的认证状态属于运行时行为（令牌如何缓存与刷新在本次签出范围内没有实现文件可读），本章只写配置面。凭据一律只写占位值。

## 生命周期：启用、加载与会话边界 {#mcp-lifecycle}

* 默认启停由配置里的 `enabled` 决定；`goose configure` 的 Toggle Extensions 会把选择写回默认列表，只影响**后续会话**，不会改变正在运行的会话 [@ref-goose-mcp-doc-enable]。
* 会话中途的改动（斜杠命令、自动推荐启用）只对当前会话生效，且保留当前对话，不重开会话 [@ref-goose-mcp-doc-midsession]。
* 自动推荐：goose 会在任务需要时搜索并建议/启用扩展，界面上会弹出批准提示（CLI 里显示「goose would like to enable the following extension, do you approve?」）；文档明确「任何动态启用的扩展只在当前会话有效」，要跨会话保留须改默认列表 [@ref-goose-mcp-doc-auto]。
* 内置扩展可以直接用 `goose mcp NAME` 启动 [@ref-goose-mcp-cli-doc]；平台扩展（如 analyze、extension manager、skills、summon、todo、top of mind 等）可以按需开关 [@ref-goose-mcp-doc-toggle] [@ref-goose-mcp-doc-platform]。
* 安全前置检查：goose 在激活外部扩展前会检查已知恶意包，命中则阻止扩展并给出错误 [@ref-goose-mcp-doc-add]；管理员可用 `GOOSE_ALLOWLIST` 指向的 YAML 允许清单限制可安装的扩展命令 [@ref-goose-allowlist-doc]。
* `--no-profile` 让本次运行不加载默认扩展，只用命令行指定的扩展（源码里的会话参数定义）[@ref-goose-mcp-src-flags]。

缺口：连接建立时机、重连/重试/超时后的行为、工具列表缓存与失效规则，在本次签出范围内没有对应实现文件，未验证；文档也没有描述这些细节。

## 能力与可见性（exposure） {#mcp-capabilities}

能力面：

* **Tools**：核心能力。扩展的工具名多数形如 `{extension}__{tool}`，而 `developer`、`analyze`、`summon`、`code_execution` 这几个扩展的工具不带前缀 [@ref-goose-hooks-doc-tool-keys]。
* **Roots**：文档说明 goose 支持 MCP Roots，让感知 roots 的扩展自动看到会话的当前工作目录 [@ref-goose-mcp-doc-roots]。
* **Resources / Prompts**：本次固定来源没有说明 goose 是否把 MCP resources 与 prompts 暴露给模型；不以此代表 tools 的情况 [@ref-goose-mcp-doc-add]。

可见性与批准：

| 机制 | 作用 | 来源 |
| --- | --- | --- |
| `available_tools` | 只加载列出的工具名；留空加载全部，可用于降低 token 开销 | [@ref-goose-config-doc-toolfilter] |
| 工具权限等级 | 每个工具可设 Always Allow / Ask Before / Never Allow；在手动或智能批准模式下配置 | [@ref-goose-perms-doc-tool] |
| 权限模式 | auto / approve / chat / smart_approve；默认 auto（自主）——此时工具无需批准即可执行 | [@ref-goose-perms-doc-modes] |
| 自动启用的批准 | 动态启用扩展时需要用户批准 | [@ref-goose-mcp-doc-auto] |
| 允许清单 | `GOOSE_ALLOWLIST` 指向的 YAML 列出允许的扩展命令；未设置则不加限制 | [@ref-goose-allowlist-doc] |

文档还建议「全部启用扩展的工具总数少于 25 个」以获得最佳表现，并把该建议作为工具权限管理的理由之一 [@ref-goose-perms-doc-tool]。

## 诊断 {#mcp-diagnostics}

分层排查入口：

* **配置被读到**：`goose info -v` 显示详细配置（含配置文件内容）与已启用扩展；`goose info` 不带参数只显示版本、配置路径、会话存储与日志位置 [@ref-goose-mcp-cli-doc] [@ref-goose-config-cli-doc]。`type: sse` 的条目会出现在配置警告里 [@ref-goose-mcp-src-sse]。
* **扩展能启动**：`goose mcp NAME` 直接运行一个已启用的 MCP server [@ref-goose-mcp-cli-doc]；内置扩展可用 `--with-builtin` 临时启用做对照 [@ref-goose-mcp-doc-session-ext]。
* **工具是否可见**：用 `goose configure` 的 Toggle/Tool Permission 流程查看扩展与工具清单；`available_tools` 配错会直接表现为工具缺失 [@ref-goose-config-doc-toolfilter] [@ref-goose-perms-doc-tool]。
* **权限拒绝**：批准对话框与 allow/deny 结果来自权限模式与工具权限；`permission.yaml` 由 `goose configure` 写入 [@ref-goose-perms-doc-modes] [@ref-goose-perms-doc-tool]。

缺口：固定来源没有给出「连接已建立」「工具调用成功」的独立观察命令（事件级日志、连接状态面板等）；本次签出范围内也没有扩展管理器与连接实现的源码文件，因此这一层只能用上述入口间接判断。
