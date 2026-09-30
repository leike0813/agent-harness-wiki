---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-mcp-v1
harness_id: roo-code
topic: mcp
title: "Roo Code 的 MCP 机制：配置文件、server 定义字段、传输与认证、生命周期、能力面与批准"
sections:
  - section_id: mcp-entry
    surface_ids: [vscode]
    source_refs: [ref-roo-mcp-code-global-path, ref-roo-mcp-code-project-path, ref-roo-mcp-code-webview-msgs, ref-roo-mcp-code-precedence, ref-roo-mcp-code-watch-project, ref-roo-mcp-doc-config, ref-roo-mcp-doc-install, ref-roo-mcp-code-schema-types]
  - section_id: mcp-definition
    surface_ids: [vscode]
    source_refs: [ref-roo-mcp-code-schema-base, ref-roo-mcp-code-schema-types, ref-roo-mcp-code-inject, ref-roo-mcp-doc-env, ref-roo-mcp-code-validate]
  - section_id: mcp-transport
    surface_ids: [vscode]
    source_refs: [ref-roo-mcp-code-schema-types, ref-roo-mcp-code-stdio, ref-roo-mcp-code-http, ref-roo-mcp-code-validate, ref-roo-mcp-doc-stdio, ref-roo-mcp-doc-streamable, ref-roo-mcp-code-inject]
  - section_id: mcp-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-roo-mcp-code-manager, ref-roo-mcp-code-init, ref-roo-mcp-code-hub-wait, ref-roo-mcp-code-update, ref-roo-mcp-code-watchpaths, ref-roo-mcp-code-restart, ref-roo-mcp-code-connect-start, ref-roo-mcp-code-errors, ref-roo-mcp-code-http, ref-roo-mcp-code-precedence, ref-roo-mcp-code-enabled-change]
  - section_id: mcp-capabilities
    surface_ids: [vscode]
    source_refs: [ref-roo-mcp-code-tools-list, ref-roo-mcp-code-tool-defs, ref-roo-mcp-code-naming, ref-roo-mcp-code-resources, ref-roo-mcp-code-toolgroup, ref-roo-mcp-code-connect-start]
  - section_id: mcp-exposure
    surface_ids: [vscode]
    source_refs: [ref-roo-mcp-code-toolgroup, ref-roo-mcp-code-tools-list, ref-roo-mcp-code-enabled-change, ref-roo-mcp-doc-toggles, ref-roo-mcp-code-count, ref-roo-mcp-code-approval, ref-roo-mcp-code-tool-approval, ref-roo-mcp-doc-autoapprove, ref-roo-mcp-code-webview-msgs, ref-roo-mcp-code-errors, ref-roo-mcp-doc-troubleshoot, ref-roo-mcp-doc-timeout]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [vscode]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-roo-mcp-code-global-path, ref-roo-mcp-code-project-path, ref-roo-mcp-code-precedence]
  - question_id: mcp.definition
    answers:
      - surface_ids: [vscode]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-roo-mcp-code-schema-base, ref-roo-mcp-code-schema-types, ref-roo-mcp-code-inject]
  - question_id: mcp.transport
    answers:
      - surface_ids: [vscode]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-roo-mcp-code-schema-types, ref-roo-mcp-code-validate, ref-roo-mcp-code-stdio, ref-roo-mcp-code-http]
  - question_id: mcp.auth
    answers:
      - surface_ids: [vscode]
        section_id: mcp-transport
        status: partial
        source_refs: [ref-roo-mcp-code-http, ref-roo-mcp-code-inject]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-roo-mcp-code-init, ref-roo-mcp-code-update, ref-roo-mcp-code-watchpaths, ref-roo-mcp-code-restart]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [vscode]
        section_id: mcp-capabilities
        status: answered
        source_refs: [ref-roo-mcp-code-tools-list, ref-roo-mcp-code-resources, ref-roo-mcp-code-tool-defs]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [vscode]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-roo-mcp-code-toolgroup, ref-roo-mcp-code-count, ref-roo-mcp-code-approval]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-roo-mcp-code-webview-msgs, ref-roo-mcp-code-errors, ref-roo-mcp-doc-troubleshoot]
---

## MCP server 的配置文件与作用域 {#mcp-entry}

固定来源是官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`（扩展清单 `src/package.json`），本章只描述 `vscode` 界面。MCP server 的定义只有两个 JSON 文件：[@ref-roo-mcp-code-global-path][@ref-roo-mcp-code-project-path]

| 作用域 | 路径 | 计算方式 |
| :-- | :-- | :-- |
| 全局 | `SETTINGS_DIR/mcp_settings.json` | `SETTINGS_DIR` = `ensureSettingsDirectoryExists()`，即 `globalStorageUri.fsPath`（可被 `roo-cline.customStoragePath` 改写）下的 `settings/` 子目录 |
| 项目 | `项目根/.roo/mcp.json` | 当前工作区路径（`provider.cwd`，否则第一个工作区文件夹）下的 `.roo/mcp.json`；文件不存在时返回 `null`，不报错 |

两个文件都由 McpHub 直接读写：全局文件缺失时会被创建为 `{ "mcpServers": {} }`；项目文件不会自动创建，除非用户从 MCP 视图点 "Edit Project MCP"（该动作会补建 `{ mcpServers: {} }`）。[@ref-roo-mcp-code-global-path][@ref-roo-mcp-code-webview-msgs]

同名 server 的优先级：**项目覆盖全局**。`getServers()` 先过滤掉 `disabled`，再按名字去重，遇到同名时保留 `source === "project"` 的那一条；`findConnection()` 也是先找项目再找全局。项目文件被删除时，该文件定义的所有 server 连接会被清理。[@ref-roo-mcp-code-precedence][@ref-roo-mcp-code-watch-project]

两个文件各有 `FileSystemWatcher`：全局文件直接监视文件本身，项目文件用 `RelativePattern(项目根/.roo/mcp.json)` 监视；工作区文件夹变化时也会重读项目配置。[@ref-roo-mcp-code-watch-project]

编辑入口在 MCP 视图底部：`Edit Global MCP` 打开全局文件，`Edit Project MCP` 打开（必要时创建）项目文件。文档还描述了一个 "Roo Code Marketplace" 的一键安装流程（把 MCP 写入 `.roo/mcp.json` 或 `mcp_settings.json`）；在固定提交的扩展源码里没有找到对应实现——`webview-ui/src/components/` 下没有 marketplace 组件，`src/` 里也没有相关消息类型，因此本文只按文件编辑路径描述安装。[@ref-roo-mcp-doc-config][@ref-roo-mcp-doc-install]

最小全局配置（示例来自文档 "Configuring MCP Servers" 与 schema 字段，命令占位的 `command`/`args` 就是实际写入的子进程参数）[@ref-roo-mcp-doc-config][@ref-roo-mcp-code-schema-types]：

```json
{
  "mcpServers": {
    "local-server": {
      "command": "node",
      "args": ["server.js"],
      "env": { "API_KEY": "your-token" },
      "alwaysAllow": ["tool1"],
      "disabled": false
    },
    "remote-server": {
      "type": "streamable-http",
      "url": "https://your-server.example/mcp",
      "headers": { "Authorization": "Bearer your-token" }
    }
  }
}
```

## Server 定义字段与默认值 {#mcp-definition}

所有 transport 共用的基础字段（Zod `BaseConfigSchema`）：[@ref-roo-mcp-code-schema-base]

| 字段 | 类型 / 默认 | 作用 |
| :-- | :-- | :-- |
| `disabled` | boolean，可选 | 置真时不启动进程，只保留一条 `disconnected` 占位连接 |
| `timeout` | number，1–3600 秒，默认 `60` | 每次工具调用的等待上限（校验 `timeout*1000` 传给 SDK 请求） |
| `alwaysAllow` | `string[]`，默认 `[]` | 免批准的工具名列表，`"*"` 表示该 server 全部工具 |
| `watchPaths` | `string[]`，可选 | 这些文件变化时自动重启该 server |
| `disabledTools` | `string[]`，默认 `[]` | 从提示与调用中排除的工具名 |

三个 transport 分支的专属字段、以及"URL 型配置必须显式写 `type`"的规则见下一节。`env`、`headers` 都只接受字符串值；`args` 是字符串数组。[@ref-roo-mcp-code-schema-types]

连接前的变量展开：`injectVariables(config, { env: process.env, workspaceFolder: workspaceFolders[0].fsPath })` 会把配置里的 `${env:NAME}` 替换为宿主进程的同名环境变量、`${workspaceFolder}` 替换为第一个工作区路径，然后才交给 transport。[@ref-roo-mcp-code-inject] 文档给出的 `args` 用法示例（把宿主环境变量透传给 Docker 里的 server）与此一致，并强调变量必须已在系统环境中存在。[@ref-roo-mcp-doc-env]

`cwd` 只在 stdio 分支存在，默认取第一个工作区文件夹的路径，取不到时用 `process.cwd()`。[@ref-roo-mcp-code-schema-types]

字段组合错误不会被静默忽略：`validateServerConfig` 会拒绝"既给 `command` 又给 `url`"、"URL 型缺 type"、"stdio 型给了 `url`"、"既无 command 也无 url"等情况，并把 Zod 的错误包上 server 名后抛出。[@ref-roo-mcp-code-validate]

## 传输类型、连接方式与认证 {#mcp-transport}

支持三种 transport，全部来自 `@modelcontextprotocol/sdk` 的客户端实现：[@ref-roo-mcp-code-schema-types][@ref-roo-mcp-code-stdio][@ref-roo-mcp-code-http]

- **stdio**：`command`（必填、非空）+ `args` + `env` + `cwd`。默认 transport：只要给了 `command` 且没写 `type`，`validateServerConfig` 会把它补成 `"stdio"`。连接时把默认环境变量与配置里的 `env` 合并后交给 `StdioClientTransport`；Windows 上除非 `command` 已是 `cmd`/`cmd.exe`，会被包成 `cmd.exe /c ...`。[@ref-roo-mcp-code-validate][@ref-roo-mcp-code-stdio]
- **streamable-http**：`type: "streamable-http"` + `url`（必须是合法 URL），可选 `headers`；headers 作为 `requestInit.headers` 传给 `StreamableHTTPClientTransport`。[@ref-roo-mcp-code-http]
- **sse**（旧式）：`type: "sse"` + `url` + 可选 `headers`；headers 会合进一个自定义 `fetch`，并且在存在 `Authorization` 头时开启 `withCredentials: true`；该 transport 使用带重连的 EventSource（`max_retry_time: 5000`）。[@ref-roo-mcp-code-http]

URL 型配置**不写 `type` 会立即报错**，因为只有 stdio 能从字段推断；三种 transport 的参数含义与示例在文档里有对应小节。[@ref-roo-mcp-code-validate][@ref-roo-mcp-doc-stdio][@ref-roo-mcp-doc-streamable]

**认证**：这批固定来源里没有 OAuth 或登录流程——`src/services/mcp/` 下没有 OAuth 客户端、token 刷新或回调逻辑，远程 server 只能用静态 `headers`（含 `Authorization`）或 stdio 的 `env` 传凭据。因此把凭据放进 `headers` 时要配合 `${env:...}` 或项目外的私有文件，避免直接写进 `mcp.json` 并提交。[@ref-roo-mcp-code-http][@ref-roo-mcp-code-inject]

## 生命周期：连接、重连、超时与错误 {#mcp-lifecycle}

- **何时连接**：McpHub 是单例（`McpServerManager.getInstance()`），在 `ClineProvider` 构造时创建，构造里同时启动两个作用域的加载，所以**非 disabled 的 server 在扩展启动时就连接**，不是懒加载；`Task` 在构建系统提示前最多等 10 秒让 hub 结束 `isConnecting`，超时就带着当前状态继续。[@ref-roo-mcp-code-manager][@ref-roo-mcp-code-init][@ref-roo-mcp-code-hub-wait]
- **配置变更**：文件监听与配置解析之间有 500ms 去抖；解析后 `updateServerConnections` 与现有连接做 `deepEqual` 比较——删除消失的、连接新增的、对变化的重连；非法配置对用户弹错误并跳过该 server，不影响其它 server。[@ref-roo-mcp-code-update]
- **自动重启**：`watchPaths` 用 chokidar 监视，命中变化即调用 `restartConnection`；stdio server 的启动参数里若含 `build/index.js` 这类产物路径，也会被纳入监视。[@ref-roo-mcp-code-watchpaths]
- **手动重启**：`restartConnection` 先提示、把状态置为 `connecting`、延迟 500ms 再断开重连；`refreshAllConnections` 会拆掉全部连接并重新初始化两个作用域。[@ref-roo-mcp-code-restart]
- **超时**：`timeout`（默认 60 秒）只在**工具调用**上生效——`callTool` 把 `timeout*1000` 传给 SDK 请求。`waitUntilReady` 的注释声称"每个 server 自己处理超时"，但 `connectToServer` 没有独立的连接超时，握手时长由 SDK 默认值决定；这是固定来源里的一处缺口。[@ref-roo-mcp-code-connect-start][@ref-roo-mcp-code-restart]
- **错误与重试**：stdio 与 streamable-http 只把连接错误记到该 server 的 `error`/`errorHistory`（单条截断到 1000 字符、最多保留 100 条）并把状态置为 `disconnected`，没有自动退避重试；只有 SSE 走 EventSource 自带的重连。[@ref-roo-mcp-code-errors][@ref-roo-mcp-code-http]
- **禁用**：`disabled: true` 的 server 不启动子进程，只保留占位连接并出现在 UI 里；全局 `mcpEnabled` 开关（默认开启）关闭时会断开所有 server，重新打开再全部重连。[@ref-roo-mcp-code-precedence][@ref-roo-mcp-code-enabled-change]

## 能力面：tools、resources、prompts {#mcp-capabilities}

- **tools**：连接后调用 `tools/list` 取回并缓存到连接对象，每个工具带 `alwaysAllow` 与 `enabledForPrompt` 两个标记。[@ref-roo-mcp-code-tools-list] 工具以**原生函数调用**形式进提示，名字格式为 `mcp--SERVER--TOOL`（分隔符 `--`，前缀 `mcp`，总长截断到 64 字符，server/tool 名先做字符清洗）；重名工具先出现者胜。[@ref-roo-mcp-code-tool-defs][@ref-roo-mcp-code-naming]
- **resources**：连接后调用 `resources/list` 与 `resources/templates/list`；读取用 `resources/read`，对外暴露为 `access_mcp_resource` 工具。没有任何 server 提供资源时，该工具会从提示里被过滤掉。[@ref-roo-mcp-code-resources][@ref-roo-mcp-code-toolgroup]
- **tools 也可以走通用入口**：除动态的 `mcp--...` 名称外，`use_mcp_tool` 仍然存在，负责参数校验、按名字模糊匹配工具、请求批准并调用；动态名称的调用会在解析阶段被改写成等价的 `use_mcp_tool` 块。[@ref-roo-mcp-code-tool-defs]
- **prompts：不支持**。固定提交里没有任何 `prompts/list` 调用，MCP server 的 prompts 能力不会进入提示或工具列表。[@ref-roo-mcp-code-resources]
- **server 自述的 instructions 被读取但未使用**：连接时把 SDK 返回的 `instructions` 存进连接对象，但源码里没有把它拼进系统提示。[@ref-roo-mcp-code-connect-start]

## 可见性、批准与诊断 {#mcp-exposure}

**暴露规则**：[@ref-roo-mcp-code-toolgroup][@ref-roo-mcp-code-tools-list]

- 模式决定 MCP 工具是否可用：只有包含 `mcp` 工具组的模式才会拿到 `use_mcp_tool`/`access_mcp_resource`（以及动态的 `mcp--...` 名称）；`ask`、`architect` 等只读模式属于含 `mcp` 组的模式，而自定义模式若删掉该组就完全看不到 MCP 工具。
- `disabledTools` 里的工具名被标为 `enabledForPrompt = false`：既不出现在提示里，直接调用也会被拒绝。
- 全局开关 `mcpEnabled`（默认 `true`）关闭时会移除全部 MCP 相关定义与工具；文档说明这会降低 token 占用，`use_mcp_tool` 与 `access_mcp_resource` 将不可用。[@ref-roo-mcp-code-enabled-change][@ref-roo-mcp-doc-toggles]
- 工具数量阈值 `MAX_MCP_TOOLS_THRESHOLD = 60`：启用中的 MCP 工具超过该值会在界面上提示工具过多。[@ref-roo-mcp-code-count]

**批准**：MCP 调用默认要用户确认。自动批准需要两个条件同时满足：全局"Use MCP servers"自动批准开关（`alwaysAllowMcp`）为真，且该工具名在 server 的 `alwaysAllow` 里（或 `alwaysAllow` 含 `"*"`）；`access_mcp_resource` 只要求前者。文档同样强调全局开关优先于单工具勾选。[@ref-roo-mcp-code-approval][@ref-roo-mcp-code-tool-approval][@ref-roo-mcp-doc-autoapprove]

**逐层诊断**：[@ref-roo-mcp-code-webview-msgs][@ref-roo-mcp-code-errors][@ref-roo-mcp-code-tools-list][@ref-roo-mcp-doc-troubleshoot]

1. **配置是否被读到**：MCP 视图里能看到 server 卡片即说明文件被解析；同名 server 只显示项目那份时，说明项目作用域覆盖生效。
2. **是否连上**：卡片状态点在 `connecting`/`connected`/`disconnected` 之间变化；`disconnected` 时卡片上会显示最近错误，历史错误最多 100 条。
3. **工具是否可见**：每张 server 卡片下列出工具及其 `Always allow` 勾选与启用开关；某个工具被 `disabledTools` 排掉就不会出现。
4. **调用是否成功**：工具调用会以 `mcpExecutionStatus` 形式把执行状态流式写进任务时间线；失败信息同时进该 server 的错误记录。文档排障清单把"server 无响应 → 检查进程与网络""工具不可用 → 检查是否被禁用""性能慢 → 调 timeout"作为标准排查项。[@ref-roo-mcp-doc-timeout]
5. **重载手段**：单 server 重启、全部刷新、开关单个 server、改超时、删除 server 都是 MCP 视图里的按钮/消息；固定来源里**没有**命令面板里的 MCP 重启命令。[@ref-roo-mcp-code-webview-msgs]
