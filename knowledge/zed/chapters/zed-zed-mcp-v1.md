---
schema_version: 3
record_kind: production
edition_id: zed-zed-mcp-v1
harness_id: zed
topic: mcp
title: "Zed 的 MCP 上下文服务器：配置入口、传输、OAuth、生命周期与工具可见性"
sections:
  - section_id: mcp-entry
    surface_ids: [zed]
    source_refs: [ref-zed-mcp-settings-struct, ref-zed-mcp-settings-enum, ref-zed-mcp-doc-custom, ref-zed-config-session-trust, ref-zed-mcp-repo-doc-agent-path]
  - section_id: mcp-definition-transport
    surface_ids: [zed]
    source_refs: [ref-zed-mcp-command, ref-zed-mcp-settings-struct, ref-zed-mcp-timeout-global, ref-zed-mcp-timeout-default, ref-zed-mcp-doc-custom, ref-zed-mcp-max-timeout, ref-zed-mcp-timeout-use, ref-zed-mcp-ext-manifest, ref-zed-plugins-context-entry, ref-zed-mcp-repo-doc-extension]
  - section_id: mcp-auth
    surface_ids: [zed]
    source_refs: [ref-zed-mcp-doc-custom, ref-zed-mcp-oauth-flow, ref-zed-mcp-oauth-session, ref-zed-mcp-settings-struct, ref-zed-mcp-status]
  - section_id: mcp-lifecycle
    surface_ids: [zed]
    source_refs: [ref-zed-mcp-status, ref-zed-mcp-settings-struct, ref-zed-mcp-doc-status, ref-zed-mcp-capabilities, ref-zed-mcp-reload, ref-zed-mcp-timeout-use, ref-zed-mcp-max-timeout]
  - section_id: mcp-capabilities-exposure
    surface_ids: [zed]
    source_refs: [ref-zed-mcp-doc-features, ref-zed-mcp-capabilities, ref-zed-mcp-tool-id, ref-zed-mcp-repo-doc-permissions, ref-zed-mcp-tool-permissions, ref-zed-agents-profile-content, ref-zed-mcp-doc-permissions]
  - section_id: mcp-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-mcp-settings-enum, ref-zed-mcp-doc-status, ref-zed-mcp-status, ref-zed-mcp-capabilities, ref-zed-mcp-reload, ref-zed-mcp-doc-errors, ref-zed-agents-doc-debug, ref-zed-mcp-repo-doc-agent-path]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [zed]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-zed-mcp-settings-struct, ref-zed-mcp-settings-enum, ref-zed-mcp-doc-custom, ref-zed-config-session-trust]
  - question_id: mcp.definition
    answers:
      - surface_ids: [zed]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-zed-mcp-command, ref-zed-mcp-settings-struct, ref-zed-mcp-timeout-default, ref-zed-mcp-timeout-global]
  - question_id: mcp.transport
    answers:
      - surface_ids: [zed]
        section_id: mcp-definition-transport
        status: answered
        source_refs: [ref-zed-mcp-settings-struct, ref-zed-mcp-command, ref-zed-mcp-doc-custom]
  - question_id: mcp.auth
    answers:
      - surface_ids: [zed]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-zed-mcp-oauth-flow, ref-zed-mcp-oauth-session, ref-zed-mcp-doc-custom]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [zed]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-zed-mcp-status, ref-zed-mcp-reload, ref-zed-mcp-max-timeout]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [zed]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-zed-mcp-doc-features, ref-zed-mcp-capabilities]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [zed]
        section_id: mcp-capabilities-exposure
        status: answered
        source_refs: [ref-zed-mcp-tool-id, ref-zed-mcp-tool-permissions, ref-zed-agents-profile-content, ref-zed-mcp-repo-doc-permissions]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-zed-mcp-doc-status, ref-zed-mcp-status, ref-zed-mcp-doc-errors]
---

本章固定来源：官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 的 `crates/settings_content/src/project.rs`、`crates/project/src/context_server_store.rs`、`crates/project/src/project_settings.rs`、`crates/agent/src/tools/context_server_registry.rs`、`crates/context_server/src/oauth.rs`、`crates/extension/src/extension_manifest.rs`，以及官方文档站的 `docs/ai/mcp.md` 快照。文档快照不含适用软件版本号，本章按来源级知识阅读。

## 配置入口与作用域 {#mcp-entry}

MCP server 写在设置文件的 `context_servers` 映射里，键是 server id、值是 server 定义。[@ref-zed-mcp-settings-struct] 键与定义的载体是 `ProjectSettings`：`context_servers` 是一个以 server id 为键、`ContextServerSettings` 为值的映射，因此它跟项目设置一样走「默认 → 用户 → 项目」的层叠，用户级写在用户设置目录的 `settings.json`，项目级写在 worktree 根的 `.zed/settings.json`。[@ref-zed-mcp-settings-enum]

三个来源变体由 `ContextServerSettingsContent` 决定（设置内容层用 `untagged`，因此用户只写字段、不写判别标签）：`Stdio`、`Http`、`Extension`。[@ref-zed-mcp-settings-struct] `Extension` 变体中 `settings` 是扩展自定义的 JSON，具体支持的键由提供该 server 的扩展决定。[@ref-zed-mcp-settings-struct]

官方文档从界面角度给出同样入口：**Settings → AI → MCP Servers** 里 `Add Server` 可选 `Add Local Server`、`Add Remote Server`、`Install from Extensions`，写出的就是 `context_servers` 条目。[@ref-zed-mcp-doc-custom]

作用域的差别不只是路径：未信任 worktree 时 Zed 处于 Restricted Mode，项目设置（`.zed/settings.json`）不会被解析，因此项目里定义的 MCP server 不会被安装或启动；全局 MCP server 与全局语言服务器不受此限制，照常启动。[@ref-zed-config-session-trust] 换句话说，项目级 MCP 的生效前提是 worktree 已获信任。[@ref-zed-mcp-repo-doc-agent-path] 文档另有一张「Agent path」表说明边界：Zed Agent 直接使用 Zed 配置的 MCP server；External Agents 可以由 Zed 通过 ACP 转发，也可能自行读取原生 MCP 配置；Terminal Threads 里的 CLI 用它们自己的配置。[@ref-zed-mcp-repo-doc-agent-path]

## Server 定义、传输与超时 {#mcp-definition-transport}

两个传输对应两个变体。**stdio**：字段是 `command`（必填，落到 `path: PathBuf`）、`args`（字符串数组，默认空）、`env`（可选映射）、`timeout`（可选，秒），外加 `enabled`（默认 `true`）与 `remote`（默认 `false`，为 `true` 时在远端开发环境里跑在远端）。[@ref-zed-mcp-command][@ref-zed-mcp-settings-struct] **HTTP**：字段是 `url`、`headers`（可选映射）、`timeout`（可选，秒）、`oauth`（可选，`client_id`/`client_secret`），以及 `enabled`。[@ref-zed-mcp-settings-struct][@ref-zed-mcp-command]

字段语义与默认值（取自设置内容层的文档注释与运行时常量）：

| 字段 | 适用 | 默认 / 规则 |
| :-- | :-- | :-- |
| `command` | stdio | 必填；序列化名仍是 `command` [@ref-zed-mcp-command] |
| `args` | stdio | 默认空数组 [@ref-zed-mcp-command] |
| `env` | stdio | 可选；`Option` 缺省即不注入额外变量 [@ref-zed-mcp-command] |
| `timeout` | 两者 | stdio 未配置时按 60 秒；HTTP 未配置时取全局 `context_server_timeout` [@ref-zed-mcp-command][@ref-zed-mcp-timeout-global] |
| 全局 `context_server_timeout` | 项目设置 | 解析时 `unwrap_or(60)`，即默认 60 秒 [@ref-zed-mcp-timeout-default] |
| `enabled` | 两者 | 默认 `true` [@ref-zed-mcp-settings-struct] |
| `remote` | stdio / extension | 默认 `false` [@ref-zed-mcp-settings-struct] |
| `headers` | HTTP | 可选；空映射不序列化 [@ref-zed-mcp-settings-struct] |
| `oauth.client_id` / `client_secret` | HTTP | 可选，用于需要预注册 client 的授权服务器 [@ref-zed-mcp-settings-struct] |

文档给出的自定义 server 示例（与上述字段一一对应，凭据用占位值）：[@ref-zed-mcp-doc-custom]

```json
{
  "context_servers": {
    "local-mcp-server": {
      "command": "some-command",
      "args": ["arg-1", "arg-2"],
      "env": {}
    },
    "remote-mcp-server": {
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_TOKEN_HERE" }
    }
  }
}
```

超时上限：`ContextServerStore` 用常量 `MAX_TIMEOUT_SECS = 600`（10 分钟）截断过大的超时值，配置里的值最终会与这个上限比较后使用。[@ref-zed-mcp-max-timeout][@ref-zed-mcp-timeout-use]

扩展提供的 server 走另一条路：`extension.toml` 里声明 `context_servers` 表下以 id 为键的条目（清单字段是 清单字段 `context_servers` 是以 id 为键、`ContextServerManifestEntry` 为值的映射，该条目结构为空），启动命令由扩展的 `context_server_command` 返回；文档说明这条路只用于以二进制或 npm 分发的本地 server，远程 server 走原生 UI。[@ref-zed-mcp-ext-manifest][@ref-zed-plugins-context-entry][@ref-zed-mcp-repo-doc-extension]

## 认证：Header、OAuth 与凭据存放 {#mcp-auth}

两条路径：

1. **静态 header**。HTTP server 直接写 `headers`，典型是 `Authorization: Bearer …`。[@ref-zed-mcp-doc-custom] 文档明确：远程 server 没有配置 `Authorization` header 时，Zed 会走标准 MCP OAuth 流程提示授权。[@ref-zed-mcp-doc-custom]
2. **OAuth**。`crates/context_server/src/oauth.rs` 顶部说明实现的是 MCP 规范 OAuth profile 的 PKCE 流程：回调服务器先绑定一个临时端口，令牌等会话材料持久化到 **keychain**，下次启动用已存会话恢复可刷新的 provider。[@ref-zed-mcp-oauth-flow] 会话结构 `OAuthSession` 记录 token endpoint、客户端信息与 `OAuthTokens`（access token 必填、refresh token 可选），并特意只保留恢复所需的元数据以适配 keychain 条目大小；`OAuthTokens` 的 `Debug` 实现把 token 值打码。[@ref-zed-mcp-oauth-session] 授权端点必须使用 TLS，只有在 loopback 等受限情形下才允许明文 HTTP。[@ref-zed-mcp-oauth-flow]

需要预注册 client 的授权服务器可以写 `oauth.client_id`；只有 client id 没有 secret 时，运行状态会停在 `ClientSecretRequired` 并要求补全。[@ref-zed-mcp-settings-struct][@ref-zed-mcp-status] 文档与源码都强调凭据不应直接写进设置文件之外的位置；示例中的 token 只作占位。[@ref-zed-mcp-doc-custom]

## 连接生命周期与状态 {#mcp-lifecycle}

`ContextServerStore` 为每个 server 维护一个状态机，对外暴露的状态枚举是：`Starting`、`Running`、`Stopped`、`Error`（携带错误文本）、`AuthRequired`、`ClientSecretRequired`、`Authenticating`。[@ref-zed-mcp-status] `Running` 状态额外持有一个 transport watch 任务：传输因认证挑战而关闭时由它发起 OAuth 流程，任何状态迁移都会取消它。[@ref-zed-mcp-status] 配置里 `enabled: false` 的 server 不会启动；文档侧的对应入口是 MCP Servers 页里每行的启用开关与 `Uninstall`。[@ref-zed-mcp-settings-struct][@ref-zed-mcp-doc-status]

重启入口是 `context_server::Restart` action（存储层声明的动作），UI 与测试都用它重新拉起 server。[@ref-zed-mcp-settings-struct] 工具列表的重载是事件驱动的：注册表订阅 store 事件，并在 server 支持 tools 能力时订阅 `notifications/tools/list_changed`，收到通知只重载该 server 的工具与 prompts，不需要重启 server。[@ref-zed-mcp-capabilities][@ref-zed-mcp-reload]

超时与重试：单次请求超时会带上 server 的 `timeout`（受 600 秒上限约束）；固定来源中的重试策略位于 `context_server` 传输实现内部，本次快照未包含该文件，因此重试次数与退避行为未能确证。[@ref-zed-mcp-timeout-use][@ref-zed-mcp-max-timeout]

## 能力面：tools、prompts 与 Agent 可见性 {#mcp-capabilities-exposure}

**支持的能力**。文档明确：Zed 目前支持 MCP 的 Tools 与 Prompts，并额外处理 `notifications/tools/list_changed`，server 运行时增删改工具会自动重载工具列表；Resources、Sampling、Elicitation 等待完善。[@ref-zed-mcp-doc-features] 源码侧一致：注册表只在 `client.capable(ServerCapability::Tools)` 时才注册工具与订阅工具变更通知，prompts 有独立的加载任务与 `PromptsChanged` 事件。[@ref-zed-mcp-capabilities]

**工具命名**。MCP 工具在 Zed 内被拼成 `mcp:` 加 server id 再加 `:` 再加工具名，函数注释说明这样是为了避免与内置工具重名。[@ref-zed-mcp-tool-id] 文档给出同样的格式与用途：`mcp:github:create_issue`。[@ref-zed-mcp-repo-doc-permissions]

**过滤与批准**。两层：

1. **profile 决定工具是否存在**。Agent profile 能开关内置工具，并用 `enable_all_context_servers` 与 `context_servers` 下该 server 的 `tools` 映射 逐项控制 MCP 工具是否可用；未在 profile 中启用的工具，Zed Agent 无法调用。[@ref-zed-mcp-tool-permissions][@ref-zed-agents-profile-content]
2. **工具权限决定是否要批准**。`agent.tool_permissions` 的键既接受内置工具名，也接受 `mcp:server_name:tool_name` 形式的 MCP 工具名；文档补充 MCP 工具应以 `default` 键为主，因为按输入匹配的正则规则对 MCP 工具匹配的是空串，大多数 pattern 匹配不到。[@ref-zed-mcp-tool-permissions][@ref-zed-mcp-repo-doc-permissions] 文档同时给出全局默认：`confirm`（默认）/`allow`/`deny`，作用于包括 MCP 调用在内的工具动作。[@ref-zed-mcp-doc-permissions]

文档推荐用「只开该 server 工具、关掉内置工具」的 profile 来保证某个 server 一定被使用，并给出 `container-use` 的完整示例（`tools` 布尔映射、`enable_all_context_servers: false`、`context_servers` 下该 server 的 `tools` 映射）。[@ref-zed-mcp-doc-permissions] 与源码结构一致：profile 的 `tools` 是 工具名到布尔的 `IndexMap`，`context_servers` 是 server id 到「工具名到布尔的映射」的 `IndexMap`。[@ref-zed-agents-profile-content]

## 诊断：配置被读取、server 已连接、工具可见、调用成功 {#mcp-diagnostics}

四个观察点分别有独立入口：

| 想问的问题 | 可观察证据 |
| :-- | :-- |
| 配置被读取了吗 | MCP Servers 页是否列出该 server；列表由 `context_servers` 决定 [@ref-zed-mcp-settings-enum] |
| server 连上了吗 | 每行前的指示点：绿色且 tooltip 为「Server is active」表示运行正常；其它颜色与文案表示 `Starting`/`Stopped`/`Error`/需要认证等状态 [@ref-zed-mcp-doc-status][@ref-zed-mcp-status] |
| 工具可见吗 | 工具列表在 server 报告 tools 能力后才注册；`list_changed` 通知会触发重载，可据此判断工具集是否已同步 [@ref-zed-mcp-capabilities][@ref-zed-mcp-reload] |
| 调用成功了吗 | 失败时 server 返回的错误文本会直接交给 agent，作为该次工具调用的结果呈现；需要看 server 自身日志时按 server 文档排查 [@ref-zed-mcp-doc-errors] |

对 External Agents，Zed 提供 `dev::OpenAcpLogs` 动作查看 Zed 与 agent 之间的消息，可用于确认 MCP 转发是否发生；文档还提示，若某个 MCP 工具在 External Agent 里不出现，需要同时检查 Zed 侧配置与该 agent 的原生 MCP 配置。[@ref-zed-agents-doc-debug][@ref-zed-mcp-repo-doc-agent-path]

**缺口**：固定来源没有给出 MCP server 自身日志的落盘位置或 Zed 侧日志文件路径；`context_server` 的传输实现（stdio/http 的启动、关闭与重连细节）不在本次签出的文件集中，因此「server 何时被回收、失败后是否重连」只按状态机与文档描述记录，未逐行验证。
