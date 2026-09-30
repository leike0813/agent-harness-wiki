---
schema_version: 3
record_kind: production
edition_id: trae-trae-mcp-v1
harness_id: trae
topic: mcp
title: "Trae IDE 的 MCP：配置入口、传输、可见性与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [trae]
    source_refs: [ref-trae-mcp-overview, ref-trae-mcp-features]
  - section_id: mcp-entry
    surface_ids: [trae]
    source_refs: [ref-trae-mcp-market, ref-trae-mcp-manual, ref-trae-mcp-project-file, ref-trae-mcp-install-link]
  - section_id: mcp-definition
    surface_ids: [trae]
    source_refs: [ref-trae-mcp-types, ref-trae-mcp-stdio, ref-trae-mcp-http, ref-trae-mcp-vars]
  - section_id: mcp-exposure
    surface_ids: [trae]
    source_refs: [ref-trae-mcp-agent-builtin, ref-trae-mcp-agent-custom, ref-trae-mcp-budget]
  - section_id: mcp-lifecycle-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-mcp-timeout, ref-trae-mcp-project-file, ref-trae-mcp-logs-list, ref-trae-mcp-logs-panel, ref-trae-mcp-trim, ref-trae-mcp-budget]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [trae]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-trae-mcp-market, ref-trae-mcp-manual, ref-trae-mcp-project-file, ref-trae-mcp-install-link]
  - question_id: mcp.definition
    answers:
      - surface_ids: [trae]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-trae-mcp-stdio, ref-trae-mcp-http, ref-trae-mcp-vars]
  - question_id: mcp.transport
    answers:
      - surface_ids: [trae]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-trae-mcp-types, ref-trae-mcp-stdio, ref-trae-mcp-http]
  - question_id: mcp.auth
    answers:
      - surface_ids: [trae]
        section_id: mcp-definition
        status: partial
        source_refs: [ref-trae-mcp-stdio, ref-trae-mcp-http]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [trae]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-trae-mcp-timeout, ref-trae-mcp-project-file]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [trae]
        section_id: mcp-scope
        status: partial
        source_refs: [ref-trae-mcp-features]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [trae]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-trae-mcp-agent-builtin, ref-trae-mcp-agent-custom, ref-trae-mcp-budget]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: mcp-lifecycle-diagnostics
        status: answered
        source_refs: [ref-trae-mcp-logs-list, ref-trae-mcp-logs-panel, ref-trae-mcp-trim]
---

## 固定来源与协议边界 {#mcp-scope}

本章来源为 Trae 官方文档站 `docs.trae.ai` 的 IDE 分册 MCP 系列页面快照：`/ide/model-context-protocol`（概览与协议能力）、`/ide/add-mcp-servers`（配置）、`/ide/mcp-server-install-links`（安装链接）、`/ide/use-mcp-servers-in-agents`（在智能体中使用）、`/ide/check-mcp-server-logs`、`/ide/troubleshoot-mcp-server-related-issues`（诊断）。Trae 闭源、无官方 npm 包，整章为来源级知识。

角色划分：TraeCode 里的**智能体是 MCP 客户端**，向 MCP server 发起请求使用其提供的工具——"In TraeCode, agents act as MCP clients and can make requests to MCP servers to utilize the tools they provide."。[@ref-trae-mcp-overview]

官方同时明确免责：MCP server 由第三方构建与维护，TraeCode "does not review or endorse these servers and is not responsible for their behaviour"。[@ref-trae-mcp-overview]

协议能力方面，文档逐类列出 TraeCode 支持的消息、生命周期（Timeouts）、三种 transport、工具发现与调用（`tools/list`、`tools/call`、`listChanged` 通知）以及 Logging 工具；工具数据类只写了 **Tool definition（name/title/description/inputSchema/outputSchema）** 与 **Text Content / Structured Content** 两类执行结果。[@ref-trae-mcp-features]

**缺口（`mcp.capabilities`）**：该能力表里没有出现 MCP 的 Resources、Prompts、Sampling 等类别，官方也未在任何页面说明它们可用或不可用，因此只能确认 Tools 与 Logging 有明确落点，Resources/Prompts 保持未验证。[@ref-trae-mcp-features]

## 配置入口与作用域 {#mcp-entry}

用户级配置通过设置面板完成，项目级配置落在文件里，两条路径并存。

**从市场添加**（`Settings > MCP`，右上角 `Add > Add from Marketplace`）：在 TraeCode 的 MCP 市场里点 `+`，弹出的窗口里填该 server 的 JSON 配置再 `Confirm`。官方提示：标为 "Local" 的 server 需要本机已安装 NPX 或 UVX，"Replace the env information (such as API key, token, and access key) with the real information."。[@ref-trae-mcp-market]

**手动添加**（`Add > Add Manually`）：直接填 JSON；如果已经用 `Raw Config (JSON)` 按钮打开 `mcp.json`，可以把别处 IDE 的 `mcpServers` 配置整段粘进去，解析后自动进入列表。官方建议优先用 NPX 或 UVX 配置。[@ref-trae-mcp-manual]

**项目级**：在项目根目录的 `.trae/` 下建 `mcp.json`，声明一个或多个 server；"When the corresponding capabilities are needed, TraeCode will automatically load the relevant MCP server configuration from this file."。启用方式是 `Settings > MCP` 里把项目级开关打开并在弹窗里确认。[@ref-trae-mcp-project-file]

**安装链接（schema link）**是第三条入口，格式为 `trae://trae.ai-ide/mcp-import?type=${TYPE}&name=${NAME}&config=${BASE64_ENCODED_CONFIG}`，其中 `type` 取值 `stdio`/`http`，`config` 是 JSON 配置经 `JSON.stringify()` 后 Base64 编码再 URL 编码的字符串；浏览器打开链接会拉起 TraeCode 的 Configure Manually 窗口供确认导入。[@ref-trae-mcp-install-link]

固定来源只区分"用户配置（设置面板 / `mcp.json`）"与"项目级 `.trae/mcp.json`"，没有描述组织级策略或云端同步的配置入口。

## Server 定义与传输 {#mcp-definition}

TraeCode 支持两类 MCP server，共三种传输：[@ref-trae-mcp-types]

| Type | Transport | Execution Environment |
| :-- | :-- | :-- |
| stdio | stdio | Local |
| HTTP | SSE | Local / Remote |
| HTTP | Streamable HTTP | Local / Remote |

**stdio 配置字段**只有三个：`command`（必填，必须在 PATH 中或写全路径，且"must not contain spaces, otherwise parsing errors will occur"）、`args`（可选，字符串数组）、`env`（可选，值必须是字符串）。官方示例（原样抄录）：[@ref-trae-mcp-stdio]

```json
{
  "mcpServers": {
    "mcp_name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "API_Key": "value"
      }
    }
  }
}
```

**HTTP 配置字段**只有两个：`url`（必填，合法的 HTTP/HTTPS 地址）与 `headers`（可选，自定义请求头，用来携带认证信息）。官方示例用 `Authorization: Bearer` 头携带凭据；TraeCode 没有提供独立的 OAuth 登录流程或凭据刷新机制的描述，凭据写法就是自填 header 或 env，属于**缺口（`mcp.auth`）**。[@ref-trae-mcp-http]

**变量展开**目前只支持 `${workspaceFolder}`，server 启动时替换为当前项目根目录路径，可用在 `args` 里构造与项目相关的命令或文件路径；没有其它变量或 `.env` 展开的说明。[@ref-trae-mcp-vars]

## 工具可见性、审批与容量上限 {#mcp-exposure}

**内置 Agent 自动获得全部已配置 server**："All configured MCP servers are automatically added to this agent. You can enable or disable MCP servers for it on its edit page."。[@ref-trae-mcp-agent-builtin]

**自定义智能体需要显式勾选**：在 Create Agent 面板的 `Tools - MCP` 区域选择 server 以及这些 server 里的具体工具，只有被选中的能力才会被该智能体自动调用。[@ref-trae-mcp-agent-custom]

**可见性有硬上限**：TraeCode 只保留固定大小的上下文空间来传输 MCP server 与工具的描述，官方列出两条限制——所有 MCP server 描述的最大字符数 **8,000**，所有 MCP server 工具的最大数量 **40**；超过任一限制时，"TraeCode will discard tool description information for tools that cannot be accommodated"。官方给出的缓解方式是在智能体配置面板里取消勾选当前任务不需要的 server 与工具、精简描述、把工具过多的 server 拆成更聚焦的多个 server。[@ref-trae-mcp-budget]

**审批**由权限体系决定（`mcpToolApproval` 场景规则与 `mcpRules`），详见配置机制一章；本节的固定来源只覆盖"哪些 server/工具进入某个智能体的可见集合"。[@ref-trae-mcp-agent-custom]

## 生命周期与诊断 {#mcp-lifecycle-diagnostics}

**启动与超时**：stdio server 通过 `env` 配置超时，HTTP server 通过 `headers` 配置同样的键——`START_MCP_TIMEOUT_MS`（启动超时，毫秒）与 `RUN_MCP_TIMEOUT_MS`（调用工具超时，毫秒），文档示例值均为 `"60000"`。这两个键同时出现在 `env` 与 `headers` 里，说明超时是按 server 声明的，而不是全局设置。[@ref-trae-mcp-timeout]

**连接时机**：项目级 `mcp.json` 的措辞是"when the corresponding capabilities are needed, TraeCode will automatically load the relevant MCP server configuration from this file"，即按需加载；首次连接外部 MCP server 需要用户显式授权（该结论在自动运行文档中给出，见配置机制一章）。固定来源没有描述断线重连、失败重试或连接缓存策略。[@ref-trae-mcp-project-file]

**日志有两个入口**：[@ref-trae-mcp-logs-list][@ref-trae-mcp-logs-panel]

- MCP server 列表里点目标 server 右侧齿轮 → `Logs`，TraeCode 打开 Output 面板显示该 server 的日志；server 报错时也可在悬停出现的错误信息面板里点 `Logs`；
- 直接用快捷键打开 Output 面板（macOS `Command + Shift + U`，Windows `Ctrl + Shift + U`），在右上角下拉里选 `MCP Server Host`。

**工具被读取失败的判定**：如果模型完全无法调用或识别某个 MCP 工具，先按上一节的 8,000 字符 / 40 工具上限排查，再在智能体面板里裁剪 server 与工具。[@ref-trae-mcp-budget]

**响应被裁剪**：MCP server 执行成功但模型读不到完整响应，是上下文窗口裁剪的结果——"TraeCode dynamically trims the response content from the MCP server"，可用空间受模型上下文窗口、当前对话已引入的上下文（`#File`、`#Doc`、`#Folder`）以及历史工具调用累积量影响，空间不足时**优先裁剪更早的工具调用响应**；官方建议开新对话、减少上下文引用，或让 server 侧精简返回结构。[@ref-trae-mcp-trim]
