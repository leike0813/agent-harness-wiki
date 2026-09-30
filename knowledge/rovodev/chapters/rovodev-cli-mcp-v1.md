---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-mcp-v1
harness_id: rovodev
topic: mcp
title: "Rovo Dev CLI 的 MCP：配置、传输与能力暴露"
sections:
  - section_id: mcp-entry
    surface_ids: [cli]
    source_refs: [ref-rovodev-mcp-file, ref-rovodev-mcp-interactive, ref-rovodev-config-mcp, ref-rovodev-mcp-disable, ref-rovodev-commands-cli]
  - section_id: mcp-definition
    surface_ids: [cli]
    source_refs: [ref-rovodev-mcp-structure, ref-rovodev-mcp-instructions]
  - section_id: mcp-transport
    surface_ids: [cli]
    source_refs: [ref-rovodev-mcp-transports, ref-rovodev-mcp-structure]
  - section_id: mcp-auth
    surface_ids: [cli]
    source_refs: [ref-rovodev-mcp-atlassian, ref-rovodev-mcp-approval, ref-rovodev-mcp-structure, ref-rovodev-mcp-governance]
  - section_id: mcp-capabilities
    surface_ids: [cli]
    source_refs: [ref-rovodev-mcp-interactive, ref-rovodev-mcp-instructions, ref-rovodev-tools-levels, ref-rovodev-tools-interactive, ref-rovodev-tools-yolo, ref-rovodev-config-mcp]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-mcp-interactive, ref-rovodev-commands-cli, ref-rovodev-mcp-governance, ref-rovodev-config-logging, ref-rovodev-help-interactive]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: conflict
        source_refs: [ref-rovodev-mcp-file, ref-rovodev-config-mcp]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-rovodev-mcp-structure, ref-rovodev-mcp-instructions]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport
        status: answered
        source_refs: [ref-rovodev-mcp-transports, ref-rovodev-mcp-structure]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-auth
        status: partial
        source_refs: [ref-rovodev-mcp-atlassian, ref-rovodev-mcp-approval, ref-rovodev-mcp-structure]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry
        status: partial
        source_refs: [ref-rovodev-mcp-disable, ref-rovodev-mcp-interactive]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-rovodev-mcp-interactive, ref-rovodev-mcp-instructions]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-capabilities
        status: partial
        source_refs: [ref-rovodev-mcp-instructions, ref-rovodev-tools-levels, ref-rovodev-tools-interactive]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: partial
        source_refs: [ref-rovodev-mcp-interactive, ref-rovodev-commands-cli, ref-rovodev-config-logging]
---

固定来源范围：本章依据 Atlassian 官方支持文档《Connect to an MCP server in Rovo Dev CLI》《Rovo Dev and Model Context Protocol (MCP)》《Manage Rovo Dev CLI settings》《Rovo Dev CLI commands》《Use tools in Rovo Dev CLI》《Get help in Rovo Dev CLI》的固定快照。Rovo Dev CLI 为闭源产品，`surface_id: cli`；官方页面未标注适用的软件版本，本章为来源级知识。

## 配置入口与作用域 {#mcp-entry}

MCP server 在 Rovo Dev CLI 中只有一个用户级配置文件：`~/.rovodev/mcp.json`，可用 `acli rovodev mcp` 打开默认编辑器编辑。[@ref-rovodev-mcp-file] 命令行入口与配置文件入口并列在官方命令表中（`acli rovodev mcp` 的描述即「在默认编辑器中打开 MCP server 配置文件」）。[@ref-rovodev-commands-cli]

交互模式下用 `/mcp` 打开管理界面，可以查看 server、状态与可用工具，并启用或禁用单个 server。[@ref-rovodev-mcp-interactive]

主配置文件 `~/.rovodev/config.yml` 中的 `mcp` 段控制 MCP 的文件位置与名单：`mcpConfigPath` 指定 MCP 配置文件路径，`allowedMcpServers` 是允许的 MCP server 名列表，`disabledMcpServers` 是全局禁用的 MCP server 签名列表。[@ref-rovodev-config-mcp]

**默认路径冲突（两份官方页面不一致）**：

- 设置页面的 `mcp` 示例把 `mcpConfigPath` 的默认值写作 `~/.rovodev/mcp_config.json`（下划线）；[@ref-rovodev-config-mcp]
- MCP 连接页说「Rovo Dev CLI stores MCP server configurations in `~/.rovodev/mcp.json`」，禁用小节的示例又把 `mcpConfigPath` 写成 `~/.rovodev/mcp.json`。[@ref-rovodev-mcp-file][@ref-rovodev-mcp-disable]

两处都是 Atlassian 官方页面，无法判断哪一个是最新默认值。可靠的做法是以显式配置 `mcp.mcpConfigPath` 为准，并用 `acli rovodev mcp`（直接打开生效文件）确认实际路径。

**作用域边界**：固定来源没有描述项目级、工作区级或组织级的 MCP 文件作用域，也没有说明多个文件存在时如何合并——只有一个用户级文件被文档提到，项目级的 `.rovodev/` 目录只用于 skill、子代理、memory 与 worktree。这些保持未验证。

## Server 定义与字段 {#mcp-definition}

`mcp.json` 是 JSON，顶层键为 `mcpServers`，每个键是一个 server 名，值为该 server 的定义：[@ref-rovodev-mcp-structure]

```json
{
  "mcpServers": {
    "server-name": {
      "command": "command-to-run",
      "args": ["arg1", "arg2"],
      "env": { "ENV_VAR": "value" },
      "transport": "stdio"
    },
    "http-server": {
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" },
      "transport": "http",
      "enable_instructions": true
    },
    "sse-server": {
      "url": "https://example.com/mcp/sse",
      "transport": "sse"
    }
  }
}
```

从官方示例可以读出的字段分工：[@ref-rovodev-mcp-structure]

| 键 | 出现于 | 含义 |
| --- | --- | --- |
| `command` | 本地 server | 启动 server 的可执行命令 |
| `args` | 本地 server | 传给命令的参数数组 |
| `env` | 本地 server | 注入 server 进程的环境变量键值对 |
| `url` | 远程 server | server 的 HTTP/SSE 端点 |
| `headers` | 远程 server | 请求头（示例用 `Authorization: Bearer ...` 传凭据） |
| `transport` | 两者 | 传输类型：`stdio`、`http` 或 `sse` |
| `enable_instructions` | 远程 server | 是否把该 server 的 `instructions` 注入 agent 系统提示 |

`enable_instructions` 的语义在文档中有独立小节：MCP 协议允许 server 在初始化响应里返回可选的服务器级 `instructions`，用于帮助 agent 正确使用该 server 的工具（例如先读配置资源、每会话调用一次 setup 工具、遵循特定工作流）。默认行为是**注入** agent 的系统提示；字段缺省或为 `true` 时注入，设为 `false` 时不注入。它是**逐 server** 配置的，因此可以信任一个 server 的 instructions 而关闭另一个。[@ref-rovodev-mcp-instructions]

固定来源没有给出变量展开规则（如 `${VAR}`）、工作目录字段、超时字段、server 名字符集或长度限制，也没有说明 `transport` 缺省时如何推断；这些保持未验证。

## 传输类型 {#mcp-transport}

官方列出三种传输：[@ref-rovodev-mcp-transports]

- **stdio**：通过标准输入输出通信，最常用；
- **http**：通过 HTTP 请求通信；
- **sse**：通过 Server-Sent Events 通信。

传输由定义里的 `transport` 字段判别，而不是由存在哪个字段推断：官方示例中 stdio server 也显式写了 `"transport": "stdio"`，HTTP 与 SSE server 分别写 `"transport": "http"`、`"transport": "sse"`。三种定义的字段组合可以对照看出差别：stdio 用 `command`/`args`/`env`，http 与 sse 用 `url`（http 示例额外带 `headers`）。[@ref-rovodev-mcp-structure]

固定来源没有说明 `transport` 缺省时的推断规则、每种传输的启动命令差异（stdio 与远程启动条件不同）、HTTP 与 SSE 的连接时长或重连策略，也没有给出对 SSE 的适用条件说明（仅注为 "Communication via Server-Sent Events"）。这部分保持未验证。

## 认证与凭据 {#mcp-auth}

**Atlassian MCP（内置）**：Rovo Dev CLI 会**自动连接 Atlassian MCP server**，无需在 `mcp.json` 中配置；用户另外可以选择通过 MCP 连接第三方数据源。[@ref-rovodev-mcp-atlassian]

**第三方 MCP 的审批**：当提示可能把数据发往站点之外时，Rovo Dev 会先弹出提示，让用户审阅并批准或拒绝要使用的第三方工具；官方明确「没有用户显式批准就不会把数据传输给第三方来源」，并提醒数据出站后不再适用 Atlassian 条款。[@ref-rovodev-mcp-approval]

**Header 凭据**：远程 server 用 `headers` 传递，官方示例是 `"Authorization": "Bearer YOUR_API_KEY"` 这类形式；因此凭据写在 server 定义的 `headers`（或本地 server 的 `env`）里，而不是命令行参数中。示例中的密钥是占位值，实际使用时应由用户自行注入。 [@ref-rovodev-mcp-structure]

**组织与站点治理**：Rovo Dev 功能（含 CLI）可被组织级与站点级关闭；MCP 页面给出的路径是 Atlassian Administration 的 Apps > AI settings > AI-enabled apps，选择 Rovo Dev 页后切换开关；站点级需 Rovo Dev 应用管理员在 Settings 中操作。[@ref-rovodev-mcp-governance]

固定来源没有描述 OAuth 登录流程、token 刷新、凭据缓存位置、环境变量注入，或 `headers` 值是否支持变量展开；也没有说明内置 Atlassian MCP server 的名称与工具清单——这些保持未验证。

## 能力与暴露范围 {#mcp-capabilities}

`/mcp` 面板显示每个 server 的状态与**可用工具**，并可逐个启用/禁用 server，这是文档里唯一明确列出的 MCP 能力视图。[@ref-rovodev-mcp-interactive]

- **Tools**：可用，在 `/mcp` 中可查看。
- **Server instructions**：服务器级 `instructions` 默认注入 agent 系统提示，会影响 agent 对该 server 工具的使用方式；用 `enable_instructions: false` 可逐 server 关闭。文档给出的用途是「让 agent 知道如何正确使用该 server 的工具」，也把它当作对不可信或行为异常 server 的缓解手段。[@ref-rovodev-mcp-instructions]
- **Resources / prompts**：官方 CLI 文档没有把 resources 或 prompts 列为可发现、可选择的能力，也没有给出对应的 CLI 入口；据此不能断言它们在 CLI 可用。

**权限与审批**：MCP 工具调用沿用工具权限体系——`toolPermissions` 中每个工具的取值是 `allow`（直接执行）、`ask`（执行前询问，多数工具默认）、`deny`（禁止执行）。[@ref-rovodev-tools-levels] 交互模式下首次使用工具时会询问，可选项有「Once（仅本次）」「Session（本会话）」「Always（写入配置文件，对后续所有会话生效）」；拒绝时可以附加说明理由给 agent。[@ref-rovodev-tools-interactive]

YOLO 模式（`--yolo` 或 `/yolo`）会跳过文件与 shell 类工具的确认，但官方特别说明 **MCP 工具与其他集成仍按其配置的权限执行**，不会因为 YOLO 而被放行。[@ref-rovodev-tools-yolo]

`allowedMcpServers` / `disabledMcpServers` 两个名单同样决定可见性：前者列出允许的 server 名，后者列出「全局禁用的 server 签名」。固定来源没有解释「签名」的构造方式（是否等于 server 名），也没有说明名单为空时是「全部允许」还是「全部禁止」。[@ref-rovodev-config-mcp]

## 诊断 {#mcp-diagnostics}

- `/mcp`：查看 server 列表、状态与可用工具，并可直接启用/禁用，是「配置被读取、server 已连接、工具可见」三个环节的直接观察点。[@ref-rovodev-mcp-interactive]
- `acli rovodev mcp`：用默认编辑器打开 MCP 配置文件，可确认当前生效文件的实际内容与路径。[@ref-rovodev-commands-cli]
- 组织或站点关闭 Rovo Dev 后，MCP 能力随功能一起不可用。[@ref-rovodev-mcp-governance]
- 通用日志：配置文件 `logging.path` 的默认值是 `~/.rovodev/logs/rovodev.log`，可作为观察运行期错误的落点，但固定来源没有说明日志中是否包含 MCP 连接细节。[@ref-rovodev-config-logging]
- `/help` 后接查询词，或具体命令的 `help` 子命令，可查询用法（例如 `/mcp help`）。[@ref-rovodev-help-interactive]

**缺口**：server 的启动时机、失败重试与退避、连接超时、配置热重载，以及工具调用错误的定位手段，固定来源均未建立；`mcpConfigPath` 默认值在两份官方页面间存在冲突（见「配置入口与作用域」）。
