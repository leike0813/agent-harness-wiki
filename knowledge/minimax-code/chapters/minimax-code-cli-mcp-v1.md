---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-mcp-v1
harness_id: minimax-code
topic: mcp
title: "MiniMax Code CLI 的 MCP：配置入口、传输、认证、生命周期、暴露与诊断"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-minimax-code-mcp-project-file, ref-minimax-code-mcp-merge, ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-project-rules, ref-minimax-code-mcp-project-snapshot, ref-minimax-code-doc-skills-mcp]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-minimax-code-mcp-schema, ref-minimax-code-mcp-project-rules, ref-minimax-code-mcp-store-validate, ref-minimax-code-mcp-expand, ref-minimax-code-mcp-project-doc, ref-minimax-code-examples-mcp]
  - section_id: mcp-transport-auth
    surface_ids: [cli]
    source_refs: [ref-minimax-code-mcp-transport-map, ref-minimax-code-mcp-stdio, ref-minimax-code-mcp-http, ref-minimax-code-mcp-auth-trim, ref-minimax-code-mcp-auth-status, ref-minimax-code-mcp-profile-write]
  - section_id: mcp-lifecycle-caps
    surface_ids: [cli]
    source_refs: [ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-idle, ref-minimax-code-mcp-defaults, ref-minimax-code-mcp-tools-only]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-minimax-code-mcp-naming, ref-minimax-code-mcp-name-registry, ref-minimax-code-mcp-disclosure, ref-minimax-code-mcp-permission, ref-minimax-code-mcp-project-doc]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-mcp-tui-panel, ref-minimax-code-mcp-status, ref-minimax-code-mcp-test, ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-profile-write, ref-minimax-code-doc-config-checks]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-minimax-code-mcp-project-file, ref-minimax-code-mcp-merge, ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-project-rules, ref-minimax-code-mcp-project-snapshot, ref-minimax-code-doc-skills-mcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-minimax-code-mcp-schema, ref-minimax-code-mcp-project-rules, ref-minimax-code-mcp-store-validate, ref-minimax-code-mcp-expand, ref-minimax-code-mcp-project-doc, ref-minimax-code-examples-mcp]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-minimax-code-mcp-transport-map, ref-minimax-code-mcp-stdio, ref-minimax-code-mcp-http, ref-minimax-code-mcp-auth-trim, ref-minimax-code-mcp-auth-status, ref-minimax-code-mcp-profile-write]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-minimax-code-mcp-transport-map, ref-minimax-code-mcp-stdio, ref-minimax-code-mcp-http, ref-minimax-code-mcp-auth-trim, ref-minimax-code-mcp-auth-status, ref-minimax-code-mcp-profile-write]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-caps
        status: answered
        source_refs: [ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-idle, ref-minimax-code-mcp-defaults, ref-minimax-code-mcp-tools-only]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle-caps
        status: answered
        source_refs: [ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-idle, ref-minimax-code-mcp-defaults, ref-minimax-code-mcp-tools-only]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-minimax-code-mcp-naming, ref-minimax-code-mcp-name-registry, ref-minimax-code-mcp-disclosure, ref-minimax-code-mcp-permission, ref-minimax-code-mcp-project-doc]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-minimax-code-mcp-tui-panel, ref-minimax-code-mcp-status, ref-minimax-code-mcp-test, ref-minimax-code-mcp-project-doc, ref-minimax-code-mcp-profile-write, ref-minimax-code-doc-config-checks]
---

MiniMax Code CLI 的 MCP 只有一条能力面——**工具**：宿主连接 MCP server、运行 `tools/list` 与 `tools/call`，不消费 resources 或 prompts [@ref-minimax-code-mcp-tools-only]。配置来源分四层：profile 文件、项目 `.mcp.json`、ACP 会话临时覆盖，以及注入的内置 `matrix` server [@ref-minimax-code-mcp-merge]。本章固定来源是 `MiniMax-AI/MiniMax-Code` 仓库 commit `c8a39a5` 上的 `packages/agent-modules/mcp`、`packages/local-runtime-v2/src/service/mcp`、`packages/agent-modules/permission` 与该目录随附的 `docs/project-mcp.md`，以及官方 CLI 文档 `configuration` 与 `faq` 的快照。

## 配置入口与作用域 {#mcp-entry}

| 作用域 | 位置 | 可写 |
| --- | --- | --- |
| profile（用户） | `<数据目录>/mcp.json`（兼容读取 `<数据目录>/mcp/mcp.json`） | 可写，原子写入且权限 `0600` |
| project（项目） | `<工作区根>/.mcp.json` | 只读，宿主绝不改写仓库文件 [@ref-minimax-code-mcp-project-file] |
| session（ACP 客户端） | 进程内临时覆盖，随会话存在 | 临时 |
| builtin | 注入的 `matrix` server（非文件） | 受管 |

- 合并语义是**整条替换、不逐字段合并**，优先级为 session > project > profile（含内置）[@ref-minimax-code-mcp-merge] [@ref-minimax-code-mcp-project-doc]。
- 被禁用的项目条目仍然会遮蔽同名的 profile 条目，避免悄悄连到另一个目标；内置名（`matrix`、`nd`、`cu` 等）不可被项目配置覆盖 [@ref-minimax-code-mcp-project-doc]。
- 项目文件只加载允许的字段子集，`auth`、`metadata`、`tools`、`configured`、`builtin` 等运行时内部字段不会从项目文件读入 [@ref-minimax-code-mcp-project-rules]。
- 项目配置在每次工具发现或调用前重新读取，快照按「会话 + 规范化的根路径 + 摘要」作键：配置未变则复用，变了就中止旧调用并断开连接 [@ref-minimax-code-mcp-project-snapshot]。
- TUI 侧入口是 `/mcp [filter]`（`reload` 用于重读）[@ref-minimax-code-doc-skills-mcp]；官方文档说明 `/mcp` 检索的是 MCP 配置，可见条目取决于数据目录、项目与宿主 [@ref-minimax-code-doc-skills-mcp]。

## Server 定义与字段 {#mcp-definition}

- 存储与公开 schema：`command`、`args`、`env`、`url`、`type`、`auth`、`enabled`、`configured`、`builtin`、`description`、`timeout`、`metadata`、`headers`、`tools` [@ref-minimax-code-mcp-schema]。
- 类型推断：未写 `type` 时，有 `command` 视为 stdio，否则视为 http；两者都不满足即报「不支持的传输方式」 [@ref-minimax-code-mcp-project-rules]。
- stdio 要求 `command` 展开后非空、`args` 为字符串数组、`env` 为字符串映射；远程要求 `url` 是 http/https 且不得内嵌用户名密码，`headers` 为字符串映射 [@ref-minimax-code-mcp-project-rules]。
- `timeout` 只接受正安全整数（毫秒）；`enabled` 缺省为 true（`enabled: false` 显式禁用） [@ref-minimax-code-mcp-project-rules]。
- profile 文件写入前做更严格的校验：`headers` 要求大小写不敏感的唯一键，`auth`/`metadata` 为记录，布尔与超时字段逐项检查 [@ref-minimax-code-mcp-store-validate]。
- 变量展开**只在项目 `.mcp.json` 实现**：`${VAR}` 与 `${VAR:-默认值}` 会作用于 `command`、`args`、`env`、`url`、`headers`；变量缺失时整条 server 条目报错，错误里带变量名但从不回显取值 [@ref-minimax-code-mcp-expand] [@ref-minimax-code-mcp-project-doc]。
- profile 的 `mcp.json` 没有同样的展开实现，这是两处入口的实际差异 [@ref-minimax-code-mcp-expand]。

```json
{
  "mcpServers": {
    "research": {
      "type": "stdio",
      "command": "node",
      "args": ["${MCP_SERVER_ROOT}/server.js"],
      "env": { "API_KEY": "${RESEARCH_MCP_API_KEY}" }
    }
  }
}
```

示例依据 `docs/examples.md` 与 `packages/local-runtime-v2/docs/project-mcp.md` 描述的项目 `.mcp.json` 结构；密钥只用占位变量 [@ref-minimax-code-examples-mcp]。

## 传输与认证 {#mcp-transport-auth}

- 接受的 `type` 是 `stdio`、`http`、`sse`、`streamable-http`；`streamable-http` 与 `http` 等价，都映射到 Streamable HTTP 传输，`sse` 映射到 SSE 传输 [@ref-minimax-code-mcp-transport-map]。
- 运行时底层只实现 stdio / http / sse 三种传输配置，没有 websocket [@ref-minimax-code-mcp-stdio] [@ref-minimax-code-mcp-http]。
- stdio 子进程的工作目录缺省为 home 目录，stderr 单独管道读取，子进程环境按「宿主环境 + 配置 env + 注入 env」合并，注入值优先 [@ref-minimax-code-mcp-stdio]。
- HTTP 传输开启跨源重定向时的请求头保护：重定向跨源即丢弃已配置的请求头（最多跟随 10 次） [@ref-minimax-code-mcp-http]。
- **没有 OAuth 登录或刷新流程**：运行时明确裁掉了旧守护进程面的 OAuth2 流程；插件声明的 OAuth 字段会被拒绝并报 `MCP_OAUTH_UNSUPPORTED` [@ref-minimax-code-mcp-auth-trim]。
- 远程认证的受支持方式是静态请求头（例如 `Authorization: Bearer`）；项目文件里的 `auth` 字段只用于推断状态标签（`none`/`authenticated`/`pending_auth`/`configured`），没有登录实现 [@ref-minimax-code-mcp-auth-status]。
- 凭据只落在 profile 的 `mcp.json`，写入方式是「临时文件 + fsync + rename」且权限 `0600`；读取时密钥被掩码，列表返回的 `configJson` 只有状态而不含密钥 [@ref-minimax-code-mcp-profile-write]。

## 生命周期与能力面 {#mcp-lifecycle-caps}

- **惰性启动**：读取配置或列出条目都不会连接 server；只有实际工具发现或调用时才连接 [@ref-minimax-code-mcp-project-doc]。
- 每个（server，作用域）保持一条连接，空闲 15 分钟后回收，检查间隔 60 秒；默认超时 120 秒、单 server 并发上限 5 [@ref-minimax-code-mcp-idle] [@ref-minimax-code-mcp-defaults]。
- 没有自动重试循环：只有显式 `reconnect()`，以及传输关闭后下次调用时重新拉起连接 [@ref-minimax-code-mcp-idle]。
- 工具清单在连接上缓存（首次 `tools/list` 后复用），`refreshTools` 会置空缓存 [@ref-minimax-code-mcp-idle]。
- 客户端只声明 **roots** 能力，并以工作区根（或 home）回应 `roots/list`；代码中没有 `resources/list`、`prompts/list`、`listResources`、`listPrompts` 调用 [@ref-minimax-code-mcp-tools-only]。
- 工具结果里出现的 resource / resource_link 内容项只在**工具调用结果内部**被映射展示，不代表宿主向模型暴露了 MCP resources 能力 [@ref-minimax-code-mcp-tools-only]。

## 工具暴露、命名与权限 {#mcp-exposure}

- 运行时工具名投影为 `mcp__` 加 server 段、再加 `__` 与 tool 段，总长上限 80 字符，server 段上限 48 字符 [@ref-minimax-code-mcp-naming]。
- 冲突由持久化的名字注册表解决（`<数据目录>/mcp-runtime-names.json`），只缩短投影名、保留原始身份用于路由 [@ref-minimax-code-mcp-name-registry]。
- 渐进披露：配置来源的工具可被推迟到 `tool_search` + `mcp_invoke` 之后，只有明确启用且模型在允许列表内时才推迟；内置 matrix 工具始终内联 [@ref-minimax-code-mcp-disclosure]。
- 权限规则按工具名匹配：裸的 `mcp__` 加 server 段即可覆盖该 server 的全部工具，匹配在多余分隔符上失败关闭 [@ref-minimax-code-mcp-permission]。
- `.mcp.json` 被列为敏感文件名，禁止工具读取 [@ref-minimax-code-mcp-permission]。
- 没有 MCP 专属的批准流程：连接自动发生，工具权限提示出现在连接**之后** [@ref-minimax-code-mcp-project-doc]。

## 诊断 {#mcp-diagnostics}

- TUI 的 `/mcp` 面板分四组展示：内置（Built-in）、用户配置（User-configured）、项目 `.mcp.json`、客户端会话（Client session），底部提示 `/mcp reload` [@ref-minimax-code-mcp-tui-panel]。
- 状态模型为 `available`、`configured`、`disabled`、`error`、`unavailable`：连接成功后是 `available`，未连接是 `configured`，禁用或无效是 `disabled` 或 `error` [@ref-minimax-code-mcp-status]。
- 连接测试把失败归类为 `MCP_SERVER_DISABLED`、`MCP_CONNECTION_UNAVAILABLE`、`MCP_CONNECTION_TIMEOUT`、`MCP_COMMAND_NOT_FOUND`、`MCP_HANDSHAKE_FAILED`、`MCP_CONNECTION_FAILED` [@ref-minimax-code-mcp-test]。
- 日志走 `local-runtime.mcp` 诊断通道；stdio 子进程的 stderr 按行转发为 日志前缀（通道名加 mcp:server:stderr 与行内容） 形式 [@ref-minimax-code-mcp-project-doc]。
- 公开列表会剥离密钥：列表项只保留状态与可用性信息 [@ref-minimax-code-mcp-profile-write]。
- 官方 FAQ 的插件/MCP 类排查入口是 `mcode plugin marketplace list`、`mcode plugin list --available` 与 `mcode plugin marketplace upgrade`；MCP 侧的可见状态以 TUI `/mcp` 与配置检查为准 [@ref-minimax-code-doc-config-checks]。
