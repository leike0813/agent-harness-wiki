---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-mcp-v3
harness_id: mistral-vibe
topic: mcp
title: "Mistral Vibe CLI 的 MCP：server 定义、两种鉴权、工具暴露与连接管理"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-mv-301-mcp-entry, ref-mv-301-mcp-cli, ref-mv-301-stdio-runtime-required]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-mv-301-mcp-base, ref-mv-301-mcp-stdio, ref-mv-301-mcp-http-fields]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-mv-301-mcp-auth-static, ref-mv-301-mcp-auth-oauth, ref-mv-301-mcp-oauth-errors]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-mv-301-mcp-registry, ref-mv-301-mcp-pool]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-mv-301-mcp-capabilities, ref-mv-301-mcp-tools-publish]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-mcp-registry, ref-mv-301-mcp-oauth-errors]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-mv-301-mcp-entry, ref-mv-301-mcp-cli]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-mv-301-mcp-base, ref-mv-301-mcp-stdio]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-mv-301-mcp-http-fields, ref-mv-301-mcp-stdio]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-mv-301-mcp-auth-static, ref-mv-301-mcp-auth-oauth, ref-mv-301-mcp-oauth-errors]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-mv-301-mcp-registry, ref-mv-301-mcp-pool]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-mv-301-mcp-capabilities]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-mv-301-mcp-tools-publish]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-mv-301-mcp-registry, ref-mv-301-mcp-oauth-errors]
---

固定来源是官方仓库提交 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志 3.0.1），界面为 `cli`。MCP 在仓库里有两段实现：`vibe/core/tools/mcp/` 是 Unified 之前就存在的发现、描述符缓存与代理工具构造代码，仍被工具管理器、插件 MCP 目录与 app-server 运行时引用；Unified harness 的 MCP 运行时在 `harness/runtimes/python/`。本提交把 Unified runtime 定为必需运行时：缺失或不兼容时启动直接报错，并没有 `--legacy-harness` 之类的回退开关——该字符串在本提交里只出现在旧变更日志和"错误消息不得包含它"的测试断言中。两者共享同一份 `[[mcp_servers]]` 配置与同一命名规则，差别在于连接由谁持有。[@ref-mv-301-stdio-runtime-required]

## 配置入口与作用域 {#mcp-entry}

MCP server 写在 `config.toml` 的 `[[mcp_servers]]` 数组表里。该字段按 `name` 做并集合并并校验名字唯一，因此同名 server 在不同层是**叠加字段**而不是整条替换。[@ref-mv-301-mcp-entry] 作用域规则就是配置章节那套：用户 `$VIBE_HOME/config.toml`、受信任项目的 `.vibe/config.toml`、组织 admin 层。

命令行提供不改文件的入口：[@ref-mv-301-mcp-cli]

```bash
# 远程 server，静态鉴权
vibe mcp add mistralai --url https://api.mistral.ai/mcp \
  --transport streamable-http --api-key-env MISTRAL_API_KEY

# 远程 server，OAuth（默认启动浏览器登录）
vibe mcp add linear --url https://mcp.linear.app/mcp

# 本地 stdio server
vibe mcp add my-tools --transport stdio --command "uvx mcp-server-fetch" \
  --arg=-y --env DEBUG=1

vibe mcp remove mistralai
```

`vibe mcp add` 在给了 `--api-key-env` 或 `--header` 时按静态鉴权写配置，否则写 OAuth 并在默认情况下立即登录；`--no-login` 只落配置不登录。`--transport` 接受 `streamable-http`（默认）、`http` 与 `stdio`；两种传输都可以用 `--startup-timeout-sec` 与 `--tool-timeout-sec` 覆盖超时。`vibe mcp remove NAME` 从用户配置里删除该 server，并在可用时清除已存储的 OAuth 凭据；它是 shell 子命令而不是斜杠命令。[@ref-mv-301-mcp-cli]

会话内还有 `/mcp add` 快捷方式，它只支持 OAuth：写入 `auth.type = "oauth"`（可带 scopes），默认 `streamable-http`，同样支持 `--transport http` 与 `--no-login`。另外两个全局开关会影响实际可用范围：`enable_connectors` 与 `enable_mcp`，后者可由管理员下发以阻断所有面向用户的 MCP 操作。[@ref-mv-301-mcp-entry]

## Server 定义与三种传输 {#mcp-definition}

所有传输共享一组基础字段：[@ref-mv-301-mcp-base]

| 字段 | 默认 | 作用 |
| :-- | :-- | :-- |
| `name` | 必填 | 短别名，用作工具名前缀；会被规范化，且必须含字母或数字 |
| `prompt` | 无 | 追加到该 server 工具描述里的用法提示 |
| `startup_timeout_sec` | 10 | 启动并完成初始化的超时 |
| `tool_timeout_sec` | 60 | 单次工具执行超时 |
| `sampling_enabled` | 真 | 是否允许该 server 通过 sampling/createMessage 反向请求补全 |
| `disabled` | 假 | 隐藏该 server 的全部工具（仍然发现） |
| `disabled_tools` | 空 | 按不含前缀的工具名隐藏单个工具 |

HTTP 家族（`transport = "http"` 与 `"streamable-http"`）在此之上加 `url` 与 `auth`，`auth` 缺省是静态鉴权。[@ref-mv-301-mcp-http-fields]

stdio 传输使用 `command`（字符串或字符串列表）、`args`、`env` 与 `cwd`；字符串形式的 `command` 会被按 shell 词法切分后与 `args` 拼接成 argv，Windows 上反斜杠按路径分隔符处理而不是转义符，因此含空格的路径要用引号包住。[@ref-mv-301-mcp-stdio]

```toml
[[mcp_servers]]
name = "fetch_server"
transport = "stdio"
command = "uvx"
args = ["mcp-server-fetch"]
env = { "DEBUG" = "1" }
cwd = "/home/me/work"

[[mcp_servers]]
name = "my_http_server"
transport = "streamable-http"
url = "https://example.com/mcp"

[mcp_servers.auth]
type = "static"
api_key_env = "MY_HTTP_TOKEN"
```

变量展开方面没有 `${VAR}` 规则：HTTP 用 `api_key_env` 指环境变量名，stdio 的 `env` 是直接写入的键值表；插件格式才文档化 `${PLUGIN_ROOT}` / `${PLUGIN_DATA}`。

## 鉴权：静态头与 OAuth {#mcp-auth}

HTTP 类 server 的 `auth` 是带判别字段的联合：

- `type = "static"`：`headers`（附加头，重名与非法头名会被拒）、`api_key_env`（token 所在环境变量）、`api_key_header`（默认 `Authorization`）、`api_key_format`（默认 `Bearer {token}`，只允许引用 `token`）。设置了 header/format 却没有 `api_key_env` 时记一条"这些字段被忽略"的警告；真正发请求时，环境变量存在就按格式串拼进头，已显式给出的同名头优先。[@ref-mv-301-mcp-auth-static]
- `type = "oauth"`：`scopes`（空列表表示接受授权服务器默认值）、`client_id`（预注册的 PKCE 公开客户端）或 `client_metadata_url`（RFC 9728 客户端元数据文档，二者互斥）、`redirect_port`（回环回调端口，默认 47823）。[@ref-mv-301-mcp-auth-oauth]

OAuth 的失败形态都有明确文案，便于按症状处理：[@ref-mv-301-mcp-oauth-errors]

| 症状 | 文案给出的处理 |
| :-- | :-- |
| 回环端口被占用 | 在 `auth.redirect_port` 指定一个空闲端口后重试 |
| 浏览器回调超时（上限 600 秒） | 端口已释放，重新登录并完成浏览器授权 |
| 没有可用的 OS 钥匙串 | 改用 `auth.type = "static"` + `api_key_env`（无头/CI） |
| refresh 失败（invalid grant） | 执行 `/mcp login 别名` 重新认证 |

旧写法兼容：顶层 `headers` / `api_key_env` / `api_key_header` / `api_key_format` 会被提升为 `auth = { type = "static", ... }`；与显式 `[auth]` 混用直接报错并提示搬迁。[@ref-mv-301-mcp-http-fields]

凭据落点：OAuth token 存在操作系统钥匙串（无则按上表失败），静态 token 只存在于环境变量或 TOML 头里，宿主不写回凭据值。

## 生命周期：发现、缓存与连接 {#mcp-lifecycle}

旧引擎侧，`MCPRegistry` 是 host 级发现器，带内存缓存与可选的持久描述符缓存（TTL 默认 86400 秒），并维护"需要鉴权""失败原因""描述符 revision"三组状态；工具清单不会在会话内每条消息重连 server 去问一遍。[@ref-mv-301-mcp-registry]

stdio 连接的实际持有者在 harness：每个连接一个后台 worker，请求经队列串行化（同一 server 的调用不会交错，对有状态 server 友好），传输断开时关闭连接并**重试一次**重新拉起；启动超时与工具超时分别取 `startup_timeout_sec` 与 `tool_timeout_sec`。[@ref-mv-301-mcp-pool]

禁用与隐藏是可见性开关，不影响发现：`disabled = true` 隐藏该 server 的全部工具，`disabled_tools` 按工具名粒度隐藏。[@ref-mv-301-mcp-base]

## 能力暴露：只有工具 {#mcp-exposure}

暴露给模型的能力面只有 **tools**：两套实现都只调用 MCP 的 `list_tools`（及调用工具），代码里没有 resources 或 prompts 的列出/读取入口。因此 resources 与 prompts 在本提交里是明确的"不适用"面，而不是尚未调查。[@ref-mv-301-mcp-capabilities]

工具名按 `别名_远端工具名` 发布：HTTP 传输的别名缺省由 URL 主机名推导（点换成下划线，带端口时追加端口），stdio 传输的别名由可执行文件名加命令摘要推导；描述里会带上 `[别名]` 前缀与可选的 `prompt` 提示。[@ref-mv-301-mcp-tools-publish]

权限与过滤复用内置工具的两条路：`[tools.工具名]` 的 `permission`（`always`/`ask`），以及全局 `enabled_tools` / `disabled_tools` 的模式过滤（精确名、fnmatch 通配、`re:` 正则）。MCP 工具名用下划线，所以写 `serena_*` 而不是 `serena.*`。

## 诊断 {#mcp-diagnostics}

按四步排查：

1. **配置被读到**：`/mcp`（别名 `/connectors`）列出已配置 server 与工具；列表为空通常是作用域或信任问题，也可能是 `enable_mcp` / `enable_connectors` 被关或由管理员阻断。
2. **server 连上了没**：旧引擎把需要鉴权的 server 记进 `_needs_auth`、把失败原因记进 `_failed` 并保留描述符 revision；这三组状态就是"发现成功 / 需要登录 / 失败"的分界。[@ref-mv-301-mcp-registry]
3. **为什么登录失败**：OAuth 的四类错误各有专属文案（端口占用、回调超时、无钥匙串、refresh invalid grant），按文案直接处置即可。[@ref-mv-301-mcp-oauth-errors]
4. **工具可见但调用失败**：stdio 传输死亡只会自动重连一次，之后错误如实返回；检查 `disabled`、`disabled_tools` 与全局工具过滤是否把它挡住。
