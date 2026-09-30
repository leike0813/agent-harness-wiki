---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-mcp-v1
harness_id: mistral-vibe
topic: mcp
title: "Mistral Vibe CLI 的 MCP：server 定义、静态与 OAuth 鉴权、工具暴露"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-mv-mcp-servers-field, ref-mv-mcp-cli-add, ref-mv-readme-mcp, ref-mv-docs-mcp-browse]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-mv-mcp-base, ref-mv-mcp-http-fields, ref-mv-mcp-stdio, ref-mv-docs-config-mcp, ref-mv-docs-mcp-add]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-mv-mcp-static-auth, ref-mv-mcp-static-auth-headers, ref-mv-mcp-oauth, ref-mv-mcp-oauth-headless, ref-mv-mcp-oauth-token, ref-mv-mcp-http-fields, ref-mv-docs-mcp-oauth-limitation, ref-mv-readme-mcp]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-mv-mcp-integrate, ref-mv-mcp-cache-ttl, ref-mv-mcp-pool, ref-mv-mcp-base]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-mv-mcp-capabilities, ref-mv-mcp-tool-publish, ref-mv-docs-mcp-naming, ref-mv-docs-config-tools]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-docs-mcp-browse, ref-mv-mcp-registry, ref-mv-mcp-base, ref-mv-mcp-pool, ref-mv-readme-mcp]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-mv-mcp-servers-field, ref-mv-mcp-cli-add, ref-mv-readme-mcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-mv-mcp-base, ref-mv-mcp-stdio, ref-mv-docs-config-mcp]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-mv-mcp-http-fields, ref-mv-mcp-stdio, ref-mv-docs-mcp-add]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-mv-mcp-static-auth, ref-mv-mcp-oauth, ref-mv-mcp-oauth-token]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-mv-mcp-integrate, ref-mv-mcp-cache-ttl, ref-mv-mcp-pool]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-mv-mcp-capabilities, ref-mv-mcp-tool-publish]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-mv-mcp-tool-publish, ref-mv-docs-mcp-naming, ref-mv-docs-config-tools]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-mv-docs-mcp-browse, ref-mv-mcp-registry, ref-mv-mcp-pool]
---

固定来源是官方仓库提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab` 与 `docs.mistral.ai` 的 Vibe Code CLI 文档快照。一个先说清楚的限制：仓库里 MCP 有两套实现路径，`vibe/core/tools/mcp/` 是旧 harness（"legacy"）路径，Unified Harness 走另一套目录/授权桥接；本章描述的行为以旧路径的实现与两处官方文档为准，二者冲突处会点明。

## 配置入口与作用域 {#mcp-entry}

MCP server 写在 `config.toml` 的 `[[mcp_servers]]` 数组表里，字段在 schema 上声明为"按 `name` 并集"的合并字段，因此用户层与项目层写同名 server 是叠加字段而不是整体替换。[@ref-mv-mcp-servers-field] 这也意味着作用域规则就是配置章节那套：用户 `$VIBE_HOME/config.toml`、受信任项目的 `.vibe/config.toml`、以及组织下发的 admin 层。

命令行提供了不改文件的入口：`vibe mcp add` / `vibe mcp remove`，子命令参数包含 `--transport`（可选 `http`、`streamable-http`、`stdio`，默认 `streamable-http`）、`--url`、`--command`、以及一组鉴权与超时参数；这些子命令明确写的是**用户配置**。[@ref-mv-mcp-cli-add] README 补充了用法与选择规则：`vibe mcp add` 在给了 `--api-key-env` 或 `--header` 时按静态鉴权处理，否则默认按 OAuth 并启动浏览器登录；`vibe mcp remove NAME` 从用户配置移除，移除 OAuth server 时还会清掉存储的 token、client 信息与配置指纹。README 同时记录了会话内的 `/mcp add` 快捷方式，它是 OAuth-only 的。[@ref-mv-readme-mcp]

需要与 Connectors 区分：官方文档明确 MCP server 是"用户自行配置"的，组织托管的集成走 Connectors。[@ref-mv-docs-mcp-browse]

## Server 定义：字段与三种传输 {#mcp-definition}

所有传输共享一组基础字段：`name`（短别名，用于工具名前缀）、`prompt`（可选，追加到工具描述里的用法提示）、`startup_timeout_sec`（默认 10 秒）、`tool_timeout_sec`（默认 60 秒）、`sampling_enabled`（默认真，允许 server 通过 sampling 请求补全）、`disabled`（默认假，仍然发现但隐藏全部工具）、`disabled_tools`（按不含前缀的工具名禁用）。`name` 会被规范化：非字母数字下划线连字符的字符替换为下划线，首尾修剪，长度上限 256。[@ref-mv-mcp-base]

HTTP 家族（`http` 与 `streamable-http`）在基础字段之外加 `url` 与 `auth`；`auth` 缺省是静态鉴权。[@ref-mv-mcp-http-fields] stdio 传输使用另一组字段：`command`（字符串或字符串列表）、`args`、`env`（传给子进程的环境变量）、`cwd`（工作目录）。当 `command` 是字符串时会按 shell 词法切分（`shlex.split`），再与 `args` 拼接成最终 argv。[@ref-mv-mcp-stdio]

官方参考把三种传输与字段列成同一张表，并给出三份最小示例。[@ref-mv-docs-config-mcp] 最常用的一份（来自官方文档 "Add an MCP server" 的例子，HTTP + 静态 token 与 stdio 各一）：

```toml
[[mcp_servers]]
name = "my_http_server"
transport = "http"
url = "http://localhost:8000"
headers = { "Authorization" = "Bearer my_token" }
api_key_env = "MY_API_KEY_ENV_VAR"
api_key_header = "Authorization"
api_key_format = "Bearer {token}"

[[mcp_servers]]
name = "fetch_server"
transport = "stdio"
command = "uvx"
args = ["mcp-server-fetch"]
env = { "DEBUG" = "1", "LOG_LEVEL" = "info" }
```

这三份示例的字段与取值都来自官方文档页。[@ref-mv-docs-mcp-add] 变量展开方面有一个需要注意的缺口：固定来源没有为 `config.toml` 里的 MCP 定义提供 `${VAR}` 之类的展开规则；插件格式（见 Native plugins 章节）才文档化了 `${PLUGIN_ROOT}` / `${PLUGIN_DATA}` 展开。stdio 的 `env` 是直接写入的键值，不是从宿主环境抄一份。

## 鉴权：静态头与 OAuth {#mcp-auth}

HTTP 类 server 的鉴权用一个带判别字段的 `auth` 块，两种形态：

- `type = "static"`：可写 `headers`（附加 HTTP 头）、`api_key_env`（放 token 的环境变量名）、`api_key_header`（默认 `Authorization`）、`api_key_format`（默认 `Bearer {token}`，只允许引用 `token` 这一个占位符）。头名与格式串都有校验；当设置了 `api_key_header`/`api_key_format` 却没有 `api_key_env` 时会记录一条"这些字段被忽略"的警告。[@ref-mv-mcp-static-auth] 真正发请求时，`api_key_env` 指向的环境变量若存在，就按格式串拼进对应头；已显式给出的同名头优先，不会被覆盖。[@ref-mv-mcp-static-auth-headers]
- `type = "oauth"`：可写 `scopes`（空列表表示接受授权服务器的默认值）、`client_id`（预注册的 PKCE 公开客户端）或 `client_metadata_url`（RFC 9728 客户端元数据文档，二者互斥）、`redirect_port`（回环回调端口，默认 47823）。[@ref-mv-mcp-oauth]

OAuth 的凭据存放在操作系统钥匙串里；固定来源明确写了无钥匙串时的失败方式：报"没有可用的 OS 钥匙串后端，无法为该 MCP server 存储 OAuth token"，并建议改用 `auth.type = "static"` 加 `api_key_env`（无头/CI 环境）。[@ref-mv-mcp-oauth-headless] 读写走 `_kr_get` / `_kr_set` / `_kr_delete` 三个包装（用户名按服务名与别名拼装），另有 `Fingerprint` 用于检测配置漂移。[@ref-mv-mcp-oauth-token]

官方文档在 README 里给出的 OAuth 形态示例（`auth` 块与静态鉴权互斥）：[@ref-mv-readme-mcp]

```toml
[[mcp_servers]]
name = "linear"
transport = "streamable-http"
url = "https://mcp.linear.app/mcp"

[mcp_servers.auth]
type = "oauth"
scopes = []
```

兼容旧写法：顶层 `headers` / `api_key_env` / `api_key_header` / `api_key_format` 会被提升成 `auth = { type = "static", ... }`；如果同时写了显式 `[auth]` 块则直接报错，提示把这些键搬进 `[auth]`。[@ref-mv-mcp-http-fields]

这里有一处来源冲突，读者需要知道适用边界：仓库实现与 README 都详述并支持 OAuth（钥匙串、回环回调、刷新），而官方文档站在 MCP 页顶部写"已知限制：CLI 尚不支持需要 OAuth 认证的 MCP server，请使用 stdio 或 http 传输配 API key"。[@ref-mv-docs-mcp-oauth-limitation] 也就是说文档站描述的是更保守的当前支持面，而仓库代码与 README 描述的是已实现的完整能力。以文档站为准部署会得到"OAuth 不可用"的预期，以仓库提交为准则会发现 OAuth 代码路径存在；两者版本边界不同，本知识库按来源级知识记录，不对某个发布版本作保证。

## 生命周期：发现、缓存与连接 {#mcp-lifecycle}

MCP 工具的集成是会话级一次性动作：`ToolManager.integrate_mcp()` 幂等地发现并注册工具，若配置里没有 MCP server 就直接返回；异步实现是真正的发现入口。[@ref-mv-mcp-integrate] 发现由 `MCPRegistry` 完成，它同时维护一份内存缓存（每个 server 别名的工具类）和一份可选的持久化描述符缓存，缓存 TTL 默认 86400 秒；超过 TTL 的条目按 key 丢弃并重新发现。[@ref-mv-mcp-cache-ttl] 也就是说，工具清单在会话内不会每条消息都重连 server 去问一遍。

stdio 连接由连接池管理：`stdio_client` / `ClientSession` 的任务组绑定在进入它们的任务上，所以池里用**单个工作任务**持有会话直至其生命周期结束；工作任务是串行的，同一 server 的调用不会被交错（对有状态 server 友好）；传输层死亡时丢弃会话并**重试一次**（重新拉起）后再把调用放出去。[@ref-mv-mcp-pool] 启动与工具执行各有超时，默认分别是 10 秒与 60 秒，可以按 server 覆盖。[@ref-mv-mcp-base]

禁用与隐藏：`disabled = true` 会让该 server 的所有工具仍然被发现但被隐藏；`disabled_tools` 按"不含 server 前缀"的工具名粒度隐藏。两者是生命周期之外的可见性开关，不影响发现本身。[@ref-mv-mcp-base]

## 能力暴露：只有工具，以及命名与权限 {#mcp-exposure}

暴露给模型的能力面只有 **tools**。`MCPRegistry` 只从传输层引入 `list_tools_http` / `list_tools_stdio` 这两个列表函数（以及代理工具类与授权相关的类型），枚举里没有 resources 或 prompts 的列表/读取入口。[@ref-mv-mcp-capabilities] 因此 MCP 的 resources 与 prompts 在本提交里既不能被列出也不能被调用——这是一个明确的"不适用"面，而不是尚未调查。

工具名按 `{server_alias}_{remote_tool_name}` 发布：别名缺省时由 URL 主机名推导（点替换成下划线，带端口时追加端口），发布名就是"别名_远端工具名"。[@ref-mv-mcp-tool-publish] 官方文档对用户的表述完全一致："MCP 工具以 `{server_name}_{tool_name}` 模式暴露"，并给出 `[tools.fetch_server_get] permission = "always"` 的权限写法。[@ref-mv-docs-mcp-naming]

权限与过滤走与内置工具相同的两条路：

- 逐工具权限块 `[tools.工具名]`，其中 `permission` 取 `always` 或 `ask`；`allow`/`deny` 只对 shell 工具有意义。[@ref-mv-docs-config-tools]
- 全局 `enabled_tools` / `disabled_tools` 模式过滤，支持精确名、fnmatch 通配与 `re:` 正则；注意 MCP 工具名用下划线，所以写 `serena_*` 而不是 `serena.*`。[@ref-mv-docs-mcp-naming]

## 诊断 {#mcp-diagnostics}

按"配置被读到 / server 已连接 / 工具可见 / 调用成功"四步排查：

1. **配置被读到**：在会话内打开 `/mcp`（别名 `/connectors`）浏览已配置的 server 与工具；带 server 名可以列出该 server 的工具。列表为空说明配置没进层栈（多半是作用域或信任问题，见配置章节）。[@ref-mv-docs-mcp-browse]
2. **server 已连接**：`MCPRegistry` 会把需要鉴权的 server 记进 `_needs_auth`、把失败的记进 `_failed`，并维护描述符 revision；这些状态是"连接/鉴权失败"与"发现成功"的分界。[@ref-mv-mcp-registry]
3. **工具可见**：检查该 server 是否 `disabled`、工具是否在 `disabled_tools`、以及全局 `enabled_tools`/`disabled_tools` 是否把它过滤掉了。[@ref-mv-mcp-base]
4. **调用成功**：调用失败时注意 stdio 池的语义——传输死亡只会自动重试**一次**，之后错误会如实返回。[@ref-mv-mcp-pool]

OAuth server 的登录/登出与移除由 CLI 侧命令处理：`vibe mcp remove` 会连带清理存储的令牌与配置指纹。[@ref-mv-readme-mcp]
