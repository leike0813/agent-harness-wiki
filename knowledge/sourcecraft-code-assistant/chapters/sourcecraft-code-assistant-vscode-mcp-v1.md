---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-mcp-v1
harness_id: sourcecraft-code-assistant
topic: mcp
title: "SourceCraft Code Assistant（VS Code）的 MCP 配置、传输与工具暴露"
sections:
  - section_id: mcp-config
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-editfiles, ref-sc-ca-mcp-intro, ref-sc-ca-mcp-overview, ref-sc-ca-mcp-scopes, ref-sc-ca-mcpservers-marketplace]
  - section_id: mcp-definition
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-editfiles, ref-sc-ca-mcp-env, ref-sc-ca-mcp-examples, ref-sc-ca-mcp-runtimes, ref-sc-ca-mcp-stdio]
  - section_id: mcp-transport
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-http, ref-sc-ca-mcp-sse, ref-sc-ca-mcp-stdio, ref-sc-ca-transport-choose, ref-sc-ca-transport-http, ref-sc-ca-transport-sse, ref-sc-ca-transport-stdio]
  - section_id: mcp-auth
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-env, ref-sc-ca-mcp-http, ref-sc-ca-mcp-sse, ref-sc-ca-mcpservers-table, ref-sc-ca-mcpservers-universal, ref-sc-ca-mcpwork-check]
  - section_id: mcp-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-author, ref-sc-ca-mcp-create, ref-sc-ca-mcp-disable, ref-sc-ca-mcp-manage, ref-sc-ca-mcp-timeout]
  - section_id: mcp-capabilities
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-mcp-disable, ref-sc-ca-mcp-workflow, ref-sc-ca-mcpwork-send]
  - section_id: mcp-exposure
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-aa-mcp, ref-sc-ca-mcp-autoapprove, ref-sc-ca-mcp-disable, ref-sc-ca-mcp-manage]
  - section_id: mcp-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-logs, ref-sc-ca-mcp-manage, ref-sc-ca-mcp-timeout, ref-sc-ca-mcp-troubleshoot, ref-sc-ca-mcpwork-check]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [vscode]
        section_id: mcp-config
        status: answered
        source_refs: [ref-sc-ca-mcp-scopes, ref-sc-ca-mcp-editfiles, ref-sc-ca-mcpservers-marketplace]
  - question_id: mcp.definition
    answers:
      - surface_ids: [vscode]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-sc-ca-mcp-stdio, ref-sc-ca-mcp-env]
  - question_id: mcp.transport
    answers:
      - surface_ids: [vscode]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-sc-ca-mcp-stdio, ref-sc-ca-mcp-http, ref-sc-ca-mcp-sse]
  - question_id: mcp.auth
    answers:
      - surface_ids: [vscode]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-sc-ca-mcp-http, ref-sc-ca-mcpservers-universal, ref-sc-ca-mcpservers-table, ref-sc-ca-mcp-env]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: mcp-lifecycle
        status: answered
        source_refs: [ref-sc-ca-mcp-disable, ref-sc-ca-mcp-manage, ref-sc-ca-mcp-timeout, ref-sc-ca-mcp-create]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [vscode]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-sc-ca-mcp-workflow, ref-sc-ca-mcpwork-send, ref-sc-ca-mcp-disable]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [vscode]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-sc-ca-mcp-autoapprove, ref-sc-ca-aa-mcp]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-sc-ca-mcp-troubleshoot, ref-sc-ca-mcp-manage]
---

## MCP 配置入口与作用域 {#mcp-config}

MCP 在 Code Assistant 插件中标注为**仅 Visual Studio Code 可用**。服务器配置分两层，都是 JSON，顶层键为 `mcpServers`：[@ref-sc-ca-mcp-intro][@ref-sc-ca-mcp-scopes]

- **全局**：存放在 `mcp_settings.json`，通过 VS Code settings 访问，默认对所有工作区生效。
- **项目级**：`.codeassistant/mcp.json`（项目根目录下），可用版本控制共享；Code Assistant 检测到该文件会自动加载。

配置面板入口：点击聊天顶部栏的省略号按钮并选择 **MCP servers**，其中 **Edit Global MCP** 打开 `mcp_settings.json`，**Edit Project MCP** 打开 `.codeassistant/mcp.json`（不存在时自动创建）。[@ref-sc-ca-mcp-editfiles]

官方 Marketplace 也提供一键安装：聊天顶部栏 **Marketplace** 的 **MCP** 标签页选中服务器后点 **Install**，然后选择 **Installation Scope** 为 **Global**（所有工作区）或 **Project**（Git 仓库级）。[@ref-sc-ca-mcpservers-marketplace]

MCP 在本产品中的定位是"把数据库、API、自定义脚本等外部能力以标准化方式接给 Code Assistant"；官方 MCP overview 页面把规范本身与 SourceCraft 提供的服务器清单分开描述。[@ref-sc-ca-mcp-overview]

## Server 定义字段与变量展开 {#mcp-definition}

官方给出的标准结构（两份文件通用）：[@ref-sc-ca-mcp-editfiles]

```json
{
  "mcpServers": {
    "server1": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": { "API_KEY": "your_api_key" },
      "alwaysAllow": ["tool1", "tool2"],
      "disabled": false
    }
  }
}
```

STDIO 服务器字段（官方逐条说明）：[@ref-sc-ca-mcp-stdio]

| 字段 | 必需 | 说明 |
| :-- | :-- | :-- |
| `command` | 是 | 可执行文件，如 `node`、`python`、`npx` 或绝对路径 |
| `args` | 否 | 字符串参数数组；支持 `${env:VARIABLE_NAME}` 语法引用系统环境变量 |
| `cwd` | 否 | 服务器进程的工作目录；未指定时使用工作区第一个文件夹路径或主进程工作目录 |
| `env` | 否 | 启动服务器时设置的环境变量对象 |
| `alwaysAllow` | 否 | 该服务器中自动批准的工具名数组 |
| `disabled` | 否 | 设为 `true` 停用该服务器配置 |

**变量展开**：`${env:VARIABLE_NAME}` 只用于 `args`，运行时替换为系统环境变量的值；官方强调该变量必须在系统中存在（可在 `~/.bashrc`、`~/.zshrc` 或 Windows 环境变量中设置），常用于把 token 交给 Docker 容器、避免把敏感值写进配置文件。[@ref-sc-ca-mcp-env]

平台与运行时的写法差异（官方示例）：macOS/Linux 直接 `npx -y PKG`；Windows 用 `cmd` 加 `/c` 前缀。使用 asdf/mise 等版本管理器时，可让 `command` 指向该管理器（如 `mise x -- node ...`）或直接指向被管理的 node 可执行文件，并用 `env` 固定版本。[@ref-sc-ca-mcp-examples][@ref-sc-ca-mcp-runtimes]

## 传输类型与选择 {#mcp-transport}

官方支持三种传输：STDIO（本地）、Streamable HTTP（新的远程标准）、SSE（旧式远程）。[@ref-sc-ca-mcp-stdio][@ref-sc-ca-mcp-http][@ref-sc-ca-mcp-sse]

**STDIO 示例**（本地子进程，消息以换行分隔、JSON-RPC 2.0）：[@ref-sc-ca-mcp-stdio]

```json
{
  "mcpServers": {
    "local-server": {
      "command": "node",
      "args": ["server.js"],
      "cwd": "/path/to/project/root",
      "env": { "API_KEY": "your_api_key" },
      "alwaysAllow": ["tool1", "tool2"],
      "disabled": false
    }
  }
}
```

**Streamable HTTP 示例**（`type` 必须为 `streamable-http`，`url` 为单一 MCP 端点）：[@ref-sc-ca-mcp-http]

```json
{
  "mcpServers": {
    "modern-remote-server": {
      "type": "streamable-http",
      "url": "https://your-modern-server.com/api/mcp-endpoint",
      "headers": { "X-API-Key": "YOUR_API_KEY" },
      "alwaysAllow": ["newToolA", "newToolB"],
      "disabled": false
    }
  }
}
```

**SSE（旧式）示例**（`type` 为 `sse`，官方称此项可选但推荐显式写出；`url` 为基地址，旧式 SSE 通常使用 `/events` 与 `/message` 两个分离路径）：[@ref-sc-ca-mcp-sse]

```json
{
  "mcpServers": {
    "legacy-remote-server": {
      "type": "sse",
      "url": "https://your-legacy-server-url.com/mcp-base",
      "headers": { "Authorization": "Bearer YOUR_TOKEN" },
      "alwaysAllow": ["oldToolX"],
      "disabled": false
    }
  }
}
```

传输对比表（官方）：STDIO 单客户端、低延迟、无需网络、默认较安全；Streamable HTTP 与 SSE 支持多客户端、需要网络与显式安全措施，Streamable HTTP 是"所有新服务器的现代标准"，SSE 仅用于既有旧服务器。[@ref-sc-ca-transport-choose] 官方还说明 STDIO 客户端（Code Assistant）把服务器作为**子进程**启动，随 Code Assistant 启动/停止；远程传输则部署在服务器侧、集中更新。[@ref-sc-ca-transport-stdio][@ref-sc-ca-transport-http][@ref-sc-ca-transport-sse]

## 认证与凭据 {#mcp-auth}

- **Header 凭据**：远程服务器用 `headers` 传 `Authorization: Bearer ...` 之类的值，token 以环境变量/占位方式提供，不写死在配置文件。[@ref-sc-ca-mcp-http][@ref-sc-ca-mcp-sse]
- **环境变量注入**：STDIO 场景通过 `args` 中的 `${env:VAR}` 把系统环境变量带给服务器（例如 `-e GITHUB_PERSONAL_ACCESS_TOKEN=${env:GITHUB_PERSONAL_ACCESS_TOKEN}`）。[@ref-sc-ca-mcp-env]
- **SourceCraft MCP 免凭据**：仓库托管在 SourceCraft 时，Code Assistant **自动连接** SourceCraft MCP，不需要 PAT 或手工配置；系统 prompt 里还会带上 MCP 用法提示与仓库 slug。[@ref-sc-ca-mcpwork-check] 官方服务器清单同样标注 SourceCraft MCP 在 Code Assistant 中"不需要认证"，外部 agent 才需要 PAT。[@ref-sc-ca-mcpservers-table]
- **外部 agent 的通用接法**：`https://api.sourcecraft.tech/mcp` 需要 PAT；文档警告 PAT 只会让第三方 agent 看到其覆盖的仓库，且**不要把 PAT 及其配置文件提交到版本控制**。[@ref-sc-ca-mcpservers-universal]

**缺口**：固定来源没有描述 Code Assistant 侧的 OAuth 流程、token 刷新或凭据缓存位置；远程服务器的认证只以 `headers` + 环境变量形式记载。

## 加载、启用与生命周期 {#mcp-lifecycle}

- **总开关**：**Enable MCP Servers** 默认开启；关闭会从系统请求中移除所有 MCP 相关逻辑与定义以节省 token，并让 `use_mcp_tool`、`access_mcp_resource` 两个工具不可用。[@ref-sc-ca-mcp-disable]
- **服务器创建开关**：**Enable MCP Server Creation** 默认开启，控制是否把"如何编写 MCP server"的指令放进系统请求；关闭可减少 token，但模型将失去创建服务器的指导。[@ref-sc-ca-mcp-create]
- **单服务器操作**：在 MCP servers 列表中可删除、重启、用开关启用/停用单个服务器；每个服务器有独立配置面板。[@ref-sc-ca-mcp-manage]
- **网络超时**：每个服务器的 **Network Timeout** 默认 `60` 秒，可设 `30`–`300` 秒。[@ref-sc-ca-mcp-timeout]
- **由 Code Assistant 创建服务器**：开启创建开关后，可让模型生成一个（通常 TypeScript 的）服务器项目、实现工具、必要时用 `ask_followup_question` 索取凭据并作为环境变量配置，然后自动把该服务器写入全局 `mcp_settings.json` 或项目 `.codeassistant/mcp.json` 并尝试连接。[@ref-sc-ca-mcp-author]

**缺口**：官方没有给出 Code Assistant 在会话/任务边界上的固定连接时序、重连次数与退避策略，也没有说明服务器进程在会话结束后的回收规则。

## 能力发现：tools 与 resources {#mcp-capabilities}

配置好服务器后，Code Assistant **自动探测**可用工具与资源。交互主流程为：用户提出请求 → Code Assistant 依据工具描述判断是否有合适的 MCP 工具 → 工具调用需用户批准（除非设置自动批准）。[@ref-sc-ca-mcp-workflow]

官方强调工具描述质量决定选择与参数构造的正确性：工具名要有描述性且无歧义，描述需说明用途、前提与结果，参数要点明类型、格式、是否必填，并建议用 custom rules 追加"何时优先/避免使用某工具"的指令。[@ref-sc-ca-mcp-workflow]

SourceCraft MCP 在官方示例中暴露的是平台实体工具，例如 `ListRepositoryIssues`、`GetRepository`、`GetIssue`、`CreatePullRequest`、`AddLinkedPRs`、`CreateIssueComment`、`UpdateIssue`。[@ref-sc-ca-mcpwork-send]

关闭总开关会让 `use_mcp_tool` 与 `access_mcp_resource` 工具不可用——即 tools 与 resources 两类能力同时失效。[@ref-sc-ca-mcp-disable]

**缺口**：固定来源提到 resources，但没有给出 Code Assistant 侧列举/浏览 MCP resources 的界面入口，也没有说明 MCP **prompts**（提示模板）是否被发现和使用；这两个点保持未验证。

## 工具暴露与批准 {#mcp-exposure}

MCP 工具的自动批准是**逐工具**配置的，默认关闭，且需要两步：[@ref-sc-ca-mcp-autoapprove]

1. 在 **Auto-approve** 面板打开 **MCP** 总开关；
2. 展开目标 MCP 服务器，为具体工具选择 **Auto-Run**。

图标为双勾的 **Auto-approve** 面板中的全局 **MCP** 设置优先：若它是关闭的，任何 MCP 工具都不会被自动批准。[@ref-sc-ca-mcp-autoapprove]

该 MCP 总开关的语义是"自动使用已配置 MCP 服务器中的单个工具而不弹批准"，官方把风险标为"中到高，取决于所配工具"。[@ref-sc-ca-aa-mcp]

除批准外，`disabled` 字段与单服务器开关决定服务器是否参与；停用服务器会使其工具从可用集合中消失。[@ref-sc-ca-mcp-manage][@ref-sc-ca-mcp-disable]

## 诊断 {#mcp-diagnostics}

官方给出的常见问题与处理：[@ref-sc-ca-mcp-troubleshoot]

- 服务器无响应：确认进程在运行、检查网络连接；
- 权限错误：核对 `mcp_settings.json`（全局）或 `.codeassistant/mcp.json`（项目）中的 API key 与凭据；
- 工具不可用：确认服务器正确实现该工具且未在设置中停用；
- 性能慢：调整该服务器的 Network Timeout。

检查入口：MCP servers 面板可查看服务器状态并重启，SourceCraft 仓库场景可直接在 **Settings → MCP servers** 里确认 SourceCraft server 是否 active。[@ref-sc-ca-mcp-manage][@ref-sc-ca-mcpwork-check]

插件日志通过 VS Code 底栏插件图标菜单的 **Export Logs** 导出 `logs.zip`。[@ref-sc-ca-logs]

**缺口**：没有独立的 MCP 日志文件路径或工具级健康检查命令；`Network Timeout` 是唯一公开的性能/超时旋钮。[@ref-sc-ca-mcp-timeout]
