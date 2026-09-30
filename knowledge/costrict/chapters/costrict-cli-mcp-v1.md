---
schema_version: 3
record_kind: production
edition_id: costrict-cli-mcp-v1
harness_id: costrict
topic: mcp
title: "CoStrict CLI（CSC）的 MCP 集成"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-costrict-mcp-intro, ref-costrict-mcp-channels, ref-costrict-mcp-scopes, ref-costrict-mcp-local, ref-costrict-dir-mcp, ref-costrict-mcp-precedence, ref-costrict-mcp-managed, ref-costrict-mcp-managed-lists]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-costrict-mcp-add, ref-costrict-mcp-oauth, ref-costrict-mcp-env, ref-costrict-mcp-plugin, ref-costrict-pluginref-envvars, ref-costrict-mcp-manage]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-costrict-mcp-auth, ref-costrict-mcp-oauth, ref-costrict-mcp-headers]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-costrict-mcp-scopes, ref-costrict-settings-mcpkeys, ref-costrict-mcp-notify, ref-costrict-mcp-plugin, ref-costrict-mcp-manage]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-costrict-mcp-caps, ref-costrict-mcp-prompts, ref-costrict-mcp-toolsearch, ref-costrict-mcp-output, ref-costrict-settings-mcpkeys, ref-costrict-settings-keys, ref-costrict-mcp-elicit]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-mcp-manage, ref-costrict-mcp-oauth, ref-costrict-cmd-mcp, ref-costrict-mcp-headers, ref-costrict-mcp-output, ref-costrict-mcp-toolsearch, ref-costrict-mcp-serve]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-costrict-mcp-intro, ref-costrict-mcp-channels, ref-costrict-mcp-scopes, ref-costrict-mcp-local, ref-costrict-dir-mcp, ref-costrict-mcp-precedence, ref-costrict-mcp-managed, ref-costrict-mcp-managed-lists]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-costrict-mcp-add, ref-costrict-mcp-oauth, ref-costrict-mcp-env, ref-costrict-mcp-plugin, ref-costrict-pluginref-envvars, ref-costrict-mcp-manage]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-costrict-mcp-add, ref-costrict-mcp-oauth, ref-costrict-mcp-env, ref-costrict-mcp-plugin, ref-costrict-pluginref-envvars, ref-costrict-mcp-manage]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-costrict-mcp-auth, ref-costrict-mcp-oauth, ref-costrict-mcp-headers]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-costrict-mcp-scopes, ref-costrict-settings-mcpkeys, ref-costrict-mcp-notify, ref-costrict-mcp-plugin, ref-costrict-mcp-manage]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-costrict-mcp-caps, ref-costrict-mcp-prompts, ref-costrict-mcp-toolsearch, ref-costrict-mcp-output, ref-costrict-settings-mcpkeys, ref-costrict-settings-keys, ref-costrict-mcp-elicit]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-costrict-mcp-caps, ref-costrict-mcp-prompts, ref-costrict-mcp-toolsearch, ref-costrict-mcp-output, ref-costrict-settings-mcpkeys, ref-costrict-settings-keys, ref-costrict-mcp-elicit]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-costrict-mcp-manage, ref-costrict-mcp-oauth, ref-costrict-cmd-mcp, ref-costrict-mcp-headers, ref-costrict-mcp-output, ref-costrict-mcp-toolsearch, ref-costrict-mcp-serve]
---

## 固定来源与 MCP 入口 {#mcp-entry}

本章的固定来源是 CSC 官方文档页 `/csc/tools-and-plugins/mcp`、`/csc/configuration/settings`、`/csc/getting-started/costrict-directory` 与 `/csc/reference/plugins-reference` 的快照；命令名 `csc`、配置文件名与字段均取自这些页面。文档没有绑定具体发行版本，因此保持来源级知识（`version_applicability: unknown`）。

CSC 可以通过模型上下文协议（MCP）连接到外部工具与数据源，服务器使 CSC 能访问你的工具、数据库与 API。[@ref-costrict-mcp-intro] MCP 服务器还可以直接把消息推送到你的会话中，使 CSC 能响应 CI 结果、监控告警或聊天消息等外部事件（需要服务器声明 `claude/channel` 能力并在启动时用 `--channels` 选择启用）。[@ref-costrict-mcp-channels]

**三个配置作用域**（官方安装作用域表）：[@ref-costrict-mcp-scopes]

| 作用域 | 加载范围 | 与团队共享 | 存储位置 |
| :-- | :-- | :-- | :-- |
| Local（默认） | 仅当前项目 | 否 | `~/.costrict.json` 中该项目路径下 |
| Project | 仅当前项目 | 是，通过版本控制 | 项目根目录的 `.mcp.json` |
| User | 所有项目 | 否 | `~/.costrict.json` |

Local 作用域的服务器只在你添加它的项目里加载；CSC 把它写进 `~/.costrict.json` 中该项目的条目（示例结构为 `{"projects": {"/path/to/your/project": {"mcpServers": {...}}}}`）。该页特别提示：MCP 的 "local 作用域" 与一般本地设置不是一回事——一般本地设置在项目目录的 `.costrict/settings.local.json`。[@ref-costrict-mcp-local]

`.mcp.json` 由 `csc mcp add --scope project` 自动创建/更新，设计为提交到版本控制；出于安全原因，CSC 在**使用**其中的 Project 作用域服务器前会先请求批准，可用 `csc mcp reset-project-choices` 重置这些批准选择。[@ref-costrict-dir-mcp]

**同名优先级**（同一服务器在多个地方定义时只连接一次，取最高优先级来源）：Local > Project > User > Plugins 提供的服务器 > costrict.ai 连接器。三个作用域按名称匹配重复项；Plugins 与连接器按端点匹配，指向相同 URL 或命令即视为重复。[@ref-costrict-mcp-precedence]

**组织级控制**有两种互不排斥的做法：部署 `managed-mcp.json`（该文件对所有 MCP 服务器拥有独占控制权，用户无法通过 `csc mcp add` 或配置文件添加服务器；文件格式与 `.mcp.json` 相同），或在托管设置里用 `allowedMcpServers` / `deniedMcpServers` 基于策略过滤，允许用户自行添加但只放行名单内的服务器。允许/拒绝列表条目按 `serverName`、`serverCommand`（命令数组必须完全匹配）或 `serverUrl`（支持 `*` 通配符）三者之一限制，拒绝列表具有绝对优先权。[@ref-costrict-mcp-managed][@ref-costrict-mcp-managed-lists]

## Server 定义、传输与变量展开 {#mcp-definition}

三种添加方式（`csc mcp add`）：[@ref-costrict-mcp-add]

```bash
# 远程 HTTP（推荐用于云服务）
csc mcp add --transport http notion https://mcp.notion.com/mcp
# 带认证头
csc mcp add --transport http secure-api https://api.example.com/mcp --header "Authorization: Bearer 〔your-token〕"
# 远程 SSE（已弃用，仅在必要时使用）
csc mcp add --transport sse asana https://mcp.asana.com/sse
# 本地 stdio
csc mcp add --transport stdio --env AIRTABLE_API_KEY=〔your-key〕 airtable -- npx -y airtable-mcp-server
```

要点：所有选项（`--transport`、`--env`、`--scope`、`--header`）必须放在服务器名称**之前**，`--` 把服务器名与传给 MCP 服务器的命令/参数分开；`--scope` 取 `local`（默认，旧版本叫 `project`）、`project`、`user`（旧版本叫 `global`）。原生 Windows 上用 `npx` 的本地服务器需要 `cmd /c` 包装（如 `-- cmd /c npx -y @some/package`），否则会报 "Connection closed"。[@ref-costrict-mcp-add]

也可以直接给 JSON：`csc mcp add-json 〔name〕 '{"type":"http","url":"...","headers":{...}}'`，支持 `stdio` 与 `http` 两类条目以及 `oauth` 对象；`--scope user` 可写入用户配置。[@ref-costrict-mcp-oauth]

**`.mcp.json` 的环境变量展开**支持 `${VAR}` 与 `${VAR:-default}`，展开位置为 `command`、`args`、`env`、`url`、`headers`；变量缺失且无默认值时 CSC 无法解析该配置。示例（来自该页）：`"url": "${API_BASE_URL:-https://api.example.com}/mcp"`，`"Authorization": "Bearer ${API_KEY}"`。[@ref-costrict-mcp-env]

**Plugins 附带的服务器**定义在插件根目录的 `.mcp.json` 或 `plugin.json` 内联的 `mcpServers` 中，启用插件时自动启动，与手动配置的服务器一同出现在 `/mcp` 列表中（带有来源标记）；服务器通过插件安装管理而非 `/mcp` 命令。配置时用 `${CLAUDE_PLUGIN_ROOT}` 引用插件内文件、`${CLAUDE_PLUGIN_DATA}` 引用更新后仍保留的持久状态；支持 stdio、SSE 与 HTTP。[@ref-costrict-mcp-plugin] 这两个变量在插件内容、钩子命令以及 MCP/LSP 服务器配置中出现时会被内联替换，并作为环境变量导出到对应子进程。[@ref-costrict-pluginref-envvars]

常用管理命令：`csc mcp list`、`csc mcp get 〔name〕`、`csc mcp remove 〔name〕`，会话内用 `/mcp` 查看状态。[@ref-costrict-mcp-manage]

## 认证：OAuth、凭据与动态头部 {#mcp-auth}

许多云 MCP 服务器需要认证，CSC 支持 OAuth 2.0：先用 `csc mcp add --transport http ...` 添加，再在会话内运行 `/mcp` 按浏览器步骤登录；令牌安全存储并自动刷新，`/mcp` 菜单中的 "Clear authentication" 可撤销访问；浏览器未自动打开时可复制 URL 手动打开，重定向失败时把完整回调 URL 粘贴回 CSC 的提示中。OAuth 仅适用于 HTTP 服务器。[@ref-costrict-mcp-auth]

**固定回调端口与预配置凭据**：默认回调端口随机，用 `--callback-port` 固定以匹配预注册的 `http://localhost:PORT/callback`；当服务器不支持动态客户端注册（报错 "Incompatible auth server: does not support dynamic client registration"）时，用 `--client-id`（必要时 `--client-secret`，该标志会遮蔽输入）提供凭据，或以 `csc mcp add-json` 携带 `oauth.clientId`/`oauth.callbackPort`。CSC 也支持客户端 ID 元数据文档（CIMD）并会自动发现。客户端密钥存在系统钥匙链（macOS）或凭据文件中，而不是配置里；CI 中可用 `MCP_CLIENT_SECRET` 环境变量跳过交互提示；这些标志对 stdio 服务器无效。[@ref-costrict-mcp-oauth]

**自定义认证头**：对 OAuth 以外的方案（Kerberos、短期令牌、内部 SSO）用 `headersHelper`——CSC 运行该命令并把 stdout 的 JSON 对象合并进连接头；命令在 shell 中运行、超时 10 秒，动态头覆盖同名静态 `headers`，且每次连接（会话启动与重连）都会重跑、不做缓存。执行辅助程序时 CSC 设置 `CLAUDE_CODE_MCP_SERVER_NAME` 与 `CLAUDE_CODE_MCP_SERVER_URL`。注意该字段会执行任意 shell 命令：在项目或本地作用域中定义时，只有在你接受工作区信任对话框之后才会运行。[@ref-costrict-mcp-headers]

## 生命周期：启动、刷新与超时 {#mcp-lifecycle}

- 会话启动时连接服务器；`.mcp.json` 中的 Project 作用域服务器需要**先批准**才使用，`enableAllProjectMcpServers`/`enabledMcpjsonServers` 可以预批准，`disabledMcpjsonServers` 可拒绝特定条目。[@ref-costrict-mcp-scopes][@ref-costrict-settings-mcpkeys]
- **动态工具更新**：CSC 支持 MCP `list_changed` 通知，服务器可动态更新工具、提示与资源而无需断开重连，收到通知后 CSC 自动刷新该服务器的可用功能。[@ref-costrict-mcp-notify]
- **插件服务器**：已启用插件的服务器在会话启动时自动连接；会话期间启用或禁用插件要运行 `/reload-plugins` 来连接或断开其 MCP 服务器。[@ref-costrict-mcp-plugin]
- **超时**：用 `MCP_TIMEOUT` 环境变量配置 MCP 服务器启动超时（例如 `MCP_TIMEOUT=10000 csc` 为 10 秒）。固定来源没有给出重连、重试与连接缓存的规则。[@ref-costrict-mcp-manage]

**缺口（`mcp.lifecycle`）**：文档确认了启动时机、`list_changed` 刷新、插件服务器随 `/reload-plugins` 启停与启动超时变量，但没有说明失败后的重连/退避策略、单次工具调用的超时与缓存规则，也没有给出非交互模式（`-p`）下的连接行为；这些点保持未验证。

## 能力、暴露与输出限制 {#mcp-capabilities}

**资源**：服务器可暴露资源，用 `@` 提及引用（如 `@server:protocol://resource/path`），引用时会自动获取并作为附件包含，支持模糊搜索；服务器支持时 CSC 会提供列出与读取资源的工具。[@ref-costrict-mcp-caps]

**提示**：服务器暴露的提示在 CSC 中作为命令使用，格式为 `/mcp__servername__promptname`，参数以空格分隔传递；服务器与提示名会规范化（空格变下划线）。[@ref-costrict-mcp-prompts]

**工具搜索（延迟加载）**：工具搜索默认启用——会话启动只加载工具名称，模型在需要时用搜索工具发现并使用工具，只有实际用到的工具进入上下文。`ENABLE_TOOL_SEARCH` 控制行为：未设置时全部延迟（当 `ANTHROPIC_BASE_URL` 指向非第一方主机时回退为预加载）、`true`（始终延迟，包括代理）、`auto`（工具占上下文 10% 以内则预加载）、`auto:〔N〕`（自定义百分比）、`false`（全部预加载）；也可在 `settings.json` 的 `env` 中设置，或用 `permissions.deny: ["ToolSearch"]` 单独禁用该工具。[@ref-costrict-mcp-toolsearch]

**输出上限**：任一 MCP 工具输出超过 10,000 token 时 CSC 显示警告；`MAX_MCP_OUTPUT_TOKENS` 调整上限（默认 25,000）。服务器可在 `tools/list` 条目里用 `_meta["anthropic/maxResultSizeChars"]` 为单个工具提高阈值（上限 500,000 字符，仅对文本内容生效，返回图像的工具仍受 token 限制）；未声明注解时超过阈值的结果会持久化到磁盘并以文件引用代替。[@ref-costrict-mcp-output]

**暴露与批准**：除作用域优先级与托管允许/拒绝列表外，还有 `disabledMcpjsonServers`、`enableAllProjectMcpServers`、`enabledMcpjsonServers` 三个设置控制 `.mcp.json` 中服务器的批准。[@ref-costrict-settings-mcpkeys] `allowManagedMcpServersOnly` 只在托管设置中生效，`deniedMcpServers` 仍从所有来源合并、用户仍可添加服务器但只应用管理员白名单。[@ref-costrict-settings-keys]

**服务器主动请求输入**：MCP 服务器可在任务中途以表单模式或 URL 模式请求结构化输入，对话框自动出现、无需配置；要自动响应而不显示对话框可使用 Elicitation Hooks。[@ref-costrict-mcp-elicit]

## 诊断：配置、连接与调用 {#mcp-diagnostics}

按三个层次排查：[@ref-costrict-mcp-manage]

1. **配置是否写入**：`csc mcp list` 列出所有已配置服务器，`csc mcp get 〔name〕` 看某个服务器的详情（该页也用它确认服务器是否配置了 OAuth 凭据），`csc mcp remove 〔name〕` 移除；Project 作用域的批准选择用 `csc mcp reset-project-choices` 重置。[@ref-costrict-mcp-manage][@ref-costrict-mcp-oauth]
2. **连接与认证是否成功**：会话内运行 `/mcp`（命令参考描述为“管理 MCP 服务器连接和 OAuth 认证”）检查服务器状态并完成登录；[@ref-costrict-cmd-mcp] 插件服务器在列表中带有来源标记。若 `headersHelper` 相关认证异常，注意它每次连接都会重新执行且不缓存。[@ref-costrict-mcp-manage][@ref-costrict-mcp-headers]
3. **工具可见与调用是否正常**：输出警告阈值与上限可用 `MAX_MCP_OUTPUT_TOKENS` 调整；若代理未转发 `tool_reference` 块，可显式设置 `ENABLE_TOOL_SEARCH` 改变延迟策略。[@ref-costrict-mcp-output][@ref-costrict-mcp-toolsearch]

**把 CSC 自身作为 MCP 服务器**：`csc mcp serve` 以 stdio 方式启动，可被其他 MCP 客户端连接（示例给出 Claude Desktop 的配置片段），暴露 CSC 的工具（View、Edit、LS 等）；`command` 必须是 CSC 可执行文件的完整路径（可用 `which csc` 查找），否则会出现 `spawn csc ENOENT`。该服务器的用户确认由客户端实现。[@ref-costrict-mcp-serve]
