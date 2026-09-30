---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-mcp-v1
harness_id: codebuddy
topic: mcp
title: "CodeBuddy Code（CLI）MCP 接入机制"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-codebuddy-mcp-scope, ref-codebuddy-mcp-locations, ref-codebuddy-mcp-approval, ref-codebuddy-settings-keys, ref-codebuddy-mcp-format]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-codebuddy-mcp-format, ref-codebuddy-mcp-structure, ref-codebuddy-mcp-transport, ref-codebuddy-mcp-envexpand]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-codebuddy-mcp-structure, ref-codebuddy-mcp-troubleshoot, ref-codebuddy-mcp-cli, ref-codebuddy-env-auth, ref-codebuddy-marketplaces-runtime]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-codebuddy-env-mcp, ref-codebuddy-mcp-defer, ref-codebuddy-mcpstatus-tldr, ref-codebuddy-mcpstatus-schema, ref-codebuddy-env-tools]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-codebuddy-mcp-permissions, ref-codebuddy-mcp-prompts, ref-codebuddy-mcpapps-core, ref-codebuddy-mcpapps-scope, ref-codebuddy-mcp-large]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-codebuddy-mcp-permissions, ref-codebuddy-perms-rules, ref-codebuddy-mcp-approval]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-mcp-cli, ref-codebuddy-mcp-troubleshoot, ref-codebuddy-mcp-envexpand]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-codebuddy-mcp-scope, ref-codebuddy-mcp-locations, ref-codebuddy-mcp-approval, ref-codebuddy-settings-keys]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-codebuddy-mcp-format, ref-codebuddy-mcp-structure, ref-codebuddy-mcp-envexpand]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-codebuddy-mcp-transport, ref-codebuddy-mcp-structure]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs: [ref-codebuddy-mcp-structure, ref-codebuddy-mcp-troubleshoot, ref-codebuddy-mcp-cli]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-codebuddy-env-mcp, ref-codebuddy-mcp-defer, ref-codebuddy-mcpstatus-tldr]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-codebuddy-mcp-prompts, ref-codebuddy-mcpapps-core, ref-codebuddy-mcp-large]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-codebuddy-mcp-permissions, ref-codebuddy-perms-rules]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-codebuddy-mcp-cli, ref-codebuddy-mcp-troubleshoot, ref-codebuddy-mcp-envexpand]
---

本章固定来源为 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 `docs/mcp.md`、`docs/mcp-apps.md`、`docs/mcp-first-run-status.md`、`docs/settings.md`、`docs/env-vars.md`、`docs/permissions.md`、`docs/tool-defer-overlay.md` 引用面。CodeBuddy Code（CLI）无公开源码，本章按来源级知识记录，不绑定具体版本。

机制边界：MCP 是外部工具/数据源的接入层，配置是 JSON（支持 JSONC 注释），工具命名与权限规则、连接生命周期、诊断入口分属不同小节。

## 配置入口与作用域 {#mcp-entry}

MCP server 分三个作用域：`user`（全局用户配置，应用于所有项目）、`project`（项目级）、`local`（仅当前会话或工作区）。同名服务生效优先级为 `local > project > user`。[@ref-codebuddy-mcp-scope]

配置文件按优先级顺序查找第一个存在的文件读取，写入时若存在则写第一个、都不存在则创建最高优先级文件：USER 为 `~/.codebuddy/.mcp.json`（推荐）＞ `~/.codebuddy/mcp.json`（已废弃）＞ `~/.codebuddy.json`（旧版）；PROJECT 为 `<项目根>/.mcp.json`（推荐）＞ `<项目根>/mcp.json`（已废弃）。同一作用域不会合并多个文件，只用第一个存在的。[@ref-codebuddy-mcp-locations]

LOCAL 作用域的配置实际保存在 user 作用域文件里，用 `projects` 字段按 `~/.codebuddy.json#/projects/〈workspace_path〉`（JSON Pointer）区分项目。[@ref-codebuddy-mcp-locations]

项目作用域的 server 首次连接需要用户审批。非交互（`-p/--print`）无法走 UI 审批，需预先用 `--settings` 放行：`{"enableAllProjectMcpServers": true}` 批准全部，或 `{"enabledMcpjsonServers": ["server-name"]}` 逐项批准。[@ref-codebuddy-mcp-approval] `settings.json` 也有对应的 `enableAllProjectMcpServers`、`enabledMcpjsonServers`、`disabledMcpjsonServers` 三个键。[@ref-codebuddy-settings-keys]

配置文件的顶层键是 `mcpServers`，另有 `disabledMcpServers` 列表；`type` 字段可省略，系统按内容推断（有 `command` 推断 stdio，有 `url` 推断 http），但建议显式声明。[@ref-codebuddy-mcp-format]

## Server 定义与传输 {#mcp-definition}

基础形态是 `mcpServers` 对象下每个 server 一组字段：`type`、`command`、`args`、`env`、`url`、`headers`、`description`。文档给的最小示例（STDIO）：

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/workspace"],
      "env": { "DEBUG": "true" }
    }
  }
}
```

该片段取自 `docs/mcp.md`「配置文件格式」。[@ref-codebuddy-mcp-format]

三种传输的字段表（来自「配置结构详解」）：STDIO 需要 `type` 与 `command`，可选 `args`、`env`、`defer_loading`、`tools`；SSE 与 HTTP 需要 `type` 与 `url`，可选 `headers`、`defer_loading`、`tools`。[@ref-codebuddy-mcp-structure] 传输类型为 STDIO（标准输入输出本地进程）、SSE（Server-Sent Events 远程服务）、HTTP（HTTP 流式远程服务）。[@ref-codebuddy-mcp-transport]

环境变量扩展：`${VAR_NAME}` 与 `${VAR_NAME:-default}`，变量名须匹配 `[A-Z_]` 开头、后接 `[A-Z0-9_]*`（小写、混合大小写、数字开头不展开）。可展开字段：STDIO 的 `command`、`args` 每项、`env` 的值；SSE/HTTP 的 `url`、`headers` 的值（键不展开）。未设置且无默认值时保留占位符并报 WARNING，不会让配置失败。[@ref-codebuddy-mcp-envexpand]

## 认证与凭据 {#mcp-auth}

远程 server 的鉴权通过 `headers` 传：HTTP 示例用 `"Authorization": "Bearer your-token"`，SSE 示例用 `X-API-Key`。[@ref-codebuddy-mcp-structure] 官方安全建议明确不要把敏感信息写进配置文件，改用环境变量扩展（`${API_TOKEN}` 或 `${API_TOKEN:-default}`）管理 API 密钥与令牌；OAuth 授权 URL 在打开前会做安全校验，仅支持 http/https 协议。[@ref-codebuddy-mcp-troubleshoot]

`codebuddy mcp add` 支持 `--header "Name: Value"` 形式注入请求头（官方给 TAPD 示例 `--header "X-Tapd-Access-Token: TAPD_ACCESS_TOKEN"`）。[@ref-codebuddy-mcp-cli] 本地模型侧的 `CODEBUDDY_API_KEY` 等凭据是另一条链路，与 MCP server 认证无关。[@ref-codebuddy-env-auth] 缺口（`partial`）：文档没有描述 MCP 专用 OAuth 登录流程或 token 刷新机制，只提到授权 URL 会被校验；插件携带的 MCP 服务器另有 OAuth 凭证由 marketplace 移除时清理的说明。[@ref-codebuddy-marketplaces-runtime]

## 生命周期与加载 {#mcp-lifecycle}

连接超时由 `MCP_TIMEOUT` 控制，工具执行超时由 `MCP_TOOL_TIMEOUT` 控制，响应 token 上限由 `MAX_MCP_OUTPUT_TOKENS`（默认 20000）控制。[@ref-codebuddy-env-mcp]

工具延迟加载：`defer_loading: true` 的工具不在初始请求时进入模型上下文，模型先通过 `ToolSearch` 搜索、搜索到的工具被激活并在会话内保持；可在 server 级或 `tools` 单工具级覆盖，继承规则是「工具级覆盖服务器级」。会话/代理级还可用 `--tools "default,Defer(mcp__github__*)"` 或 `NoDefer(...)` 修饰符临时改变，修饰符优先级高于静态配置、`NoDefer` 胜过 `Defer`。[@ref-codebuddy-mcp-defer]

stdio 常驻模式下首轮 prompt 的 MCP 加载状态可通过 stdout 的 `system/mcp_status` 事件观察：`start` 带阻塞集合、`server` 汇报单个 server 状态过渡、`finish` 汇总异常；预等待超时由 `prewait` 相关配置调大。[@ref-codebuddy-mcpstatus-tldr] 事件字段见该文档的事件 schema 一节。[@ref-codebuddy-mcpstatus-schema]

环境变量开关：`CODEBUDDY_DEFER_TOOL_LOADING` 关闭延迟加载，`CODEBUDDY_WAIT_FOR_MCP_SERVERS_ENABLED` 控制 WaitForMcpServers 工具，`CODEBUDDY_DEFERRED_TOOLS_MCP_READY_WAIT_MS` 控制首轮等待就绪的最长时间（默认 2500ms）。[@ref-codebuddy-env-tools]

## 能力面：工具、Prompts、Apps {#mcp-capabilities}

MCP server 提供工具、资源与提示。工具进入工具包后按上文命名规则暴露。[@ref-codebuddy-mcp-permissions] Prompts 会自动转换为斜杠命令，命名格式为 `/服务器名:prompt名称`，支持动态参数并通过交互式界面收集输入，执行时调用 `prompts/get` 获取内容，且会实时监听配置变更更新命令列表。[@ref-codebuddy-mcp-prompts]

MCP Apps 是在不改主协议前提下、用 UI Resource + App Tool + sandbox iframe + AppBridge/postMessage 渲染可交互界面的扩展；`mcp.json` 中挂载后由宿主渲染管线承载。[@ref-codebuddy-mcpapps-core] 该文档「适用范围」一节说明它面向支持 MCP Apps 的宿主与 server。[@ref-codebuddy-mcpapps-scope]

超大响应的处理：超过 `MAX_MCP_OUTPUT_TOKENS` 时默认把完整响应落盘到当前会话的 `tool-results/` 目录并返回读取指引，模型可用 Read 的 `offset`/`limit` 分段读取或 `jq` 结构化查询；响应含图片块、无会话上下文、落盘失败或设置了 `CODEBUDDY_DISABLE_MCP_LARGE_OUTPUT_FILES=1` 时改为直接截断到 `MAX_MCP_OUTPUT_TOKENS * 4` 字符并追加截断标记。[@ref-codebuddy-mcp-large]

## 可见性与权限 {#mcp-exposure}

MCP 工具名格式为 `mcp__服务器名__工具名`（双下划线分段）。规则三种写法：服务器级 `mcp__服务器名`（等价 `mcp__服务器名__*`）、工具级 `mcp__服务器名__工具名`、全部 `mcp__*`（只在 `deny`/`ask` 里有效，放进 `allow` 等于没写）。规则不区分大小写，连字符与点号按下划线处理；`*` 只能整段替换最后一节，`mcp__git*` 这类写法匹配不到任何工具且不报错；裸 `*` 对 MCP 工具无效。[@ref-codebuddy-mcp-permissions]

权限规则类型按优先级为 deny > ask > allow。[@ref-codebuddy-perms-rules] 示例：`{"permissions":{"allow":["mcp__github"]}}` 放行整个 server，`{"permissions":{"deny":["mcp__filesystem"]}}` 拒绝整个 server，`{"permissions":{"deny":["mcp__*"]}}` 拒绝所有 MCP 工具。[@ref-codebuddy-mcp-permissions] 项目作用域 server 的首次连接审批是另一道闸门，见 `mcp.entry`。[@ref-codebuddy-mcp-approval]

## 诊断 {#mcp-diagnostics}

命令行：`codebuddy mcp list` 列出所有作用域的 server，`codebuddy mcp get 〈name〉` 查看详情，`codebuddy mcp remove 〈name〉 [--scope user]` 移除。[@ref-codebuddy-mcp-cli] 会话内用 `/mcp` 管理连接并查看 server 配置与诊断信息（含缺失环境变量列表）。[@ref-codebuddy-mcp-troubleshoot]

「配置不生效」的官方排查顺序是：检查配置文件语法 → 确认作用域优先级 → 重启 CodeBuddy 应用（文档明确把重启列为生效条件）。[@ref-codebuddy-mcp-troubleshoot] 环境变量未设置且无默认值时会打印 WARNING 并在 `/mcp` 诊断里列出缺失变量名。[@ref-codebuddy-mcp-envexpand] 连接失败时检查命令路径、参数与环境变量、网络连通性并查看 server 日志输出；工具不可用时确认 server 已连接、权限设置与工具兼容性。[@ref-codebuddy-mcp-troubleshoot]
