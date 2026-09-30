---
schema_version: 3
record_kind: production
edition_id: qoder-qoder-mcp-v1
harness_id: qoder
topic: mcp
title: "Qoder IDE 的 MCP 接入机制"
sections:
  - section_id: mcp-overview
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-mcp-transport, ref-qoder-ide-mcp-square]
  - section_id: mcp-configuration
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-mcp-open, ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-square, ref-qoder-cli-mcp-scope, ref-qoder-cli-mcp-fields]
  - section_id: mcp-transports
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-mcp-transport, ref-qoder-ide-mcp-own, ref-qoder-cli-mcp-transports, ref-qoder-cli-mcp-fields, ref-qoder-ide-mcp-square, ref-qoder-cli-mcp-optional]
  - section_id: mcp-lifecycle
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-square, ref-qoder-cli-mcp-manage, ref-qoder-cli-mcp-lazy]
  - section_id: mcp-access
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-use, ref-qoder-ide-mcp-trouble-llm, ref-qoder-cli-mcp-optional, ref-qoder-ide-mcp-trouble-params]
  - section_id: mcp-diagnostics
    surface_ids: [qoder]
    source_refs: [ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-use, ref-qoder-ide-mcp-trouble-llm, ref-qoder-ide-mcp-trouble-npx, ref-qoder-ide-mcp-trouble-init, ref-qoder-ide-mcp-trouble-params]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [qoder]
        section_id: mcp-configuration
        status: partial
        source_refs: [ref-qoder-ide-mcp-open, ref-qoder-ide-mcp-own, ref-qoder-cli-mcp-scope]
  - question_id: mcp.definition
    answers:
      - surface_ids: [qoder]
        section_id: mcp-configuration
        status: partial
        source_refs: [ref-qoder-ide-mcp-own, ref-qoder-cli-mcp-fields]
  - question_id: mcp.transport
    answers:
      - surface_ids: [qoder]
        section_id: mcp-transports
        status: answered
        source_refs: [ref-qoder-ide-mcp-transport, ref-qoder-ide-mcp-own, ref-qoder-cli-mcp-transports]
  - question_id: mcp.auth
    answers:
      - surface_ids: [qoder]
        section_id: mcp-transports
        status: partial
        source_refs: [ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-square, ref-qoder-cli-mcp-optional]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [qoder]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-square, ref-qoder-cli-mcp-manage, ref-qoder-cli-mcp-lazy]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [qoder]
        section_id: mcp-access
        status: partial
        source_refs: [ref-qoder-ide-mcp-own, ref-qoder-ide-mcp-use]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [qoder]
        section_id: mcp-access
        status: partial
        source_refs: [ref-qoder-ide-mcp-use, ref-qoder-ide-mcp-trouble-llm, ref-qoder-cli-mcp-optional]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [qoder]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-qoder-ide-mcp-trouble-npx, ref-qoder-ide-mcp-trouble-init, ref-qoder-ide-mcp-trouble-params, ref-qoder-ide-mcp-trouble-llm, ref-qoder-ide-mcp-use]
---

## 固定来源与机制边界 {#mcp-overview}

本章按 Qoder IDE（catalog 的 `qoder` 界面）采写，固定来源是官方文档站的 Markdown 快照：IDE 的 MCP 页、MCP 常见问题页与 CLI 的 MCP reference / MCP Servers 页。Qoder 是闭源产品，没有可固定的官方源码仓库；因此本章全部是来源级知识，不绑定某个发行版本。所有来源都取自 `docs.qoder.com`（`qoder.com` 指向的官方文档站）；`docs.qoder.cn` 是另一条国内产品线（通义灵码 / Lingma）的文档，本章不引用。

结论：MCP（Model Context Protocol）是 Qoder IDE 连接外部系统与数据源的扩展通道。官方描述处理链为：MCP server 通过协议暴露自己的能力（函数、数据访问），Qoder IDE 根据用户输入与工具元数据发现并调用这些能力。[@ref-qoder-ide-mcp-transport]

IDE 侧支持的远程连接除了 SSE 还包含 Streamable HTTP——配置方式与 SSE 相同，IDE 会自动识别并使用；此外还有从 MCP Square 一键安装的入口。[@ref-qoder-ide-mcp-transport][@ref-qoder-ide-mcp-square]

## 配置入口与作用域 {#mcp-configuration}

IDE 的配置入口是图形界面：打开 Qoder IDE 设置（右上角用户图标，或快捷键 `⌘` `⇧` `,` / `Ctrl` `Shift` `,`），在左侧导航点 **MCP**，进入 **My Servers** 标签后点右上角 **+ Add**，在出现的 JSON 文件里填 server 名称、传输类型（STDIO、SSE）、命令与参数（STDIO）或端点 URL（SSE / Streamable HTTP），关闭文件后在提示中保存。[@ref-qoder-ide-mcp-open][@ref-qoder-ide-mcp-own]

官方给出的最小 STDIO 示例（原样抄录，凭据用占位符替代）：[@ref-qoder-ide-mcp-own]

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

远程 SSE 示例（原样抄录端点形状）：[@ref-qoder-ide-mcp-own]

```json
{
  "mcpServers": {
    "fetch": {
      "type": "sse",
      "url": "https://mcp.api-inference.modelscope.net/XXXXXX/sse"
    }
  }
}
```

第二条入口是 **MCP Square** 标签：浏览列表并点 **Install**。官方提示部分 server 需要额外的环境变量（例如 `API_KEY` 或 `ACCESS_TOKEN`），必须手工配置。[@ref-qoder-ide-mcp-square]

**作用域缺口（`mcp.entry`）**：IDE 页面只描述"在设置里编辑 JSON"，没有写出该 JSON 落盘的文件路径、项目级与用户级作用域，也没有说明变量展开规则；字段级清单见下一节。CLI 的 MCP reference 记录了同一产品的文件级作用域：user 级 `~/.qoder/settings.json` 的 `mcpServers`；project 级 `项目根目录/.qoder/settings.json` 与 `项目根目录/.mcp.json`（需审批）；local 级 `项目根目录/.qoder/settings.local.json`；插件目录内的 `.mcp.json` / `mcp.json`；以及会话级 `--mcp-config` 参数。同名 server 按 user → project settings.json → project .mcp.json → local → CLI 参数依次覆盖。**但 IDE 页面并未声明它读取同一批文件**，因此 IDE 侧的文件作用域仍属未证实，读者应以设置界面为准。[@ref-qoder-cli-mcp-scope] 配置字段的逐项说明（stdio 的 `command` / `args` / `env` / `cwd`，远程的 `url` / `type` / `headers` 等）同样来自 CLI 的 reference 页，IDE 页未逐项列出。[@ref-qoder-cli-mcp-fields]

## 传输方式与字段 {#mcp-transports}

IDE 页面给出的两种标准传输：[@ref-qoder-ide-mcp-transport]

| 传输 | 通信方式 | 官方建议 |
| :-- | :-- | :-- |
| STDIO | 通过 stdin/stdout 与本地子进程通信 | 适合本地工具与命令行集成，需要本地环境 |
| SSE | HTTP POST 上行、事件流下行 | 托管在远端，配置简单；同时支持 Streamable HTTP |

字段层面，IDE 页面按类型列出：STDIO 需要命令与参数；SSE / Streamable HTTP 需要端点 URL（官方注明 Streamable HTTP 按 SSE 的方式配置，由 IDE 自动识别）。[@ref-qoder-ide-mcp-own]

CLI 的 MCP reference 给了同一产品更完整的字段表与传输集合（含 `ws` 与内置 `sdk`）：`command` / `args` / `env` / `cwd`（stdio）；`url` / `type` / `headers`（sse、http/streamable-http）；`tcp` / `type`（ws）。这份表属于 CLI 页面的声明，IDE 页面只确认了其中 STDIO 与 SSE/Streamable HTTP 三种形态与 `command`、`args`、`env`、`url`、`type` 等字段。[@ref-qoder-cli-mcp-transports][@ref-qoder-cli-mcp-fields]

### 凭据与鉴权

已确证的做法只有两种：STDIO server 通过 `env` 传入凭据（官方示例用 `GITHUB_PERSONAL_ACCESS_TOKEN`）；远程 server 用 `url` 指向带凭据的端点（官方示例用带 `XXXXXX` 段落的 SSE URL，MCP Square 页提示 `API_KEY` / `ACCESS_TOKEN` 需手工配置）。[@ref-qoder-ide-mcp-own][@ref-qoder-ide-mcp-square]

**缺口**：IDE 页面没有记录 HTTP `headers`、OAuth 登录流程或凭据刷新。CLI 的 reference 记录了 `headers` 对象与 `oauth` 配置项（`enabled`、`clientId`、`clientSecret`、`authorizationUrl`、`tokenUrl`、`scopes`、`callbackPort` 等），以及 Qoder 托管网关 `qoder_url` 使用当前登录凭据、上游需要授权时打开安全授权 URL 并在授权成功后重连。这些是 CLI 侧声明，本章不据此断言 IDE 支持同样的 OAuth 流程。[@ref-qoder-cli-mcp-optional]

## 生命周期、上限与懒加载 {#mcp-lifecycle}

- 保存配置后新 server 出现在列表，**链图标**表示连接成功；展开条目可查看可用工具列表。[@ref-qoder-ide-mcp-own]
- 每个 server 详情里可用 **Request Timeout** 下拉设置单次请求超时；超过该值 IDE 会中止调用并在聊天中显示超时消息。[@ref-qoder-ide-mcp-own]
- 因缺少依赖启动失败时，界面提供 **Quick Fix**；问题持续则按 MCP 常见问题页手工安装依赖。[@ref-qoder-ide-mcp-square]
- CLI 侧记录了可复用的生命周期控制：`/mcp` 查看连接状态、`/mcp reload`（别名 `/mcp refresh`）重新发现 server 与工具、`qoder mcp add/list/remove` 做非交互管理；`mcp.lazyLoad: true` 或环境变量 `QODER_MCP_LAZY=1` 打开懒加载，只暴露 `mcp_list` / `mcp_get` / `mcp_call` 三个 Meta Tool，按需加载真实工具以节省首轮 token。IDE 页面未声明这些命令与环境变量在 IDE 内可用。[@ref-qoder-cli-mcp-manage][@ref-qoder-cli-mcp-lazy]

**缺口**：IDE 页面没有给出禁用单个 server、重连重试次数、连接超时缺省值或缓存策略，只有"保存即连接、链图标表示成功、失败可 Quick Fix / 重试"这一层描述。[@ref-qoder-ide-mcp-own]

## 能力暴露与批准 {#mcp-access}

- 可见性：连接成功后展开 server 条目可看到工具列表；Qoder IDE 依据"你的输入提示"与"工具名称和描述"自动挑选合适的 MCP 工具。[@ref-qoder-ide-mcp-own]
- 批准流程：调用 MCP 工具前会弹出确认；在该确认里可以选择"自动运行后续 MCP server"以避免每次确认。执行后结果出现在聊天中，可展开查看详细输入输出。[@ref-qoder-ide-mcp-use]
- 模式门槛：MCP 工具只能在 **Agent 模式**下调用。官方明确：没有打开项目目录时 IDE 默认处于 Ask 模式，Ask 模式不支持 MCP 工具调用；这是"server 已连接但工具不生效"的已知原因之一。[@ref-qoder-ide-mcp-trouble-llm]
- CLI 侧另有更细的过滤与信任控制：`trust`（跳过确认）、`includeTools` / `excludeTools`（注册或排除指定工具）、`disabled`、`alwaysAllow`，加上权限系统的 `allow` / `deny` 规则与 `mcp.allowed` / `mcp.excluded` 名单。这些字段的说明在 CLI reference 页面，IDE 页面未确认等价能力。[@ref-qoder-cli-mcp-optional]
- 官方最佳实践：避免把 server 名与工具名取得过于相似（例如两个 server 都提供 `fetchText`），否则调用时容易歧义。[@ref-qoder-ide-mcp-trouble-params]

**能力缺口（`mcp.capabilities`）**：固定来源只记录了 **tools** 的发现与调用；没有记录 IDE 对 MCP resources、prompts 或 sampling 的发现与使用，也没有"以工具代表全部能力"的依据，故本项按部分回答。[@ref-qoder-ide-mcp-use]

## 诊断 {#mcp-diagnostics}

- 配置是否被读取 / server 是否连接：设置页 MCP → My Servers 看条目与**链图标**；展开看工具列表；失败用 **Quick Fix**。[@ref-qoder-ide-mcp-own]
- 工具可见但调用失败：确认处于 Agent 模式并已打开项目目录；server 断开时点 **重试** 图标让系统自动重启 server。[@ref-qoder-ide-mcp-trouble-llm]
- 环境缺失：`failed to start command: exec: "npx": executable file not found in $PATH` → 安装 Node.js V18 或更高（含 NPM V8+）；`uvx` 缺失 → 安装 `uv`。页面给出 Windows/macOS 安装命令与 `node -v`、`npx -v`、`uv --version` 验证方式。[@ref-qoder-ide-mcp-trouble-npx]
- 初始化超时：`failed to initialize MCP client: context deadline exceeded` → 先在界面点 **Copy complete command**，在终端里直接运行拿到完整错误，再据此判断是参数错误（如 Redis 连接串）还是企业安全软件拦截 Node.js。[@ref-qoder-ide-mcp-trouble-init]
- 工具参数错误：官方建议在设置 MCP → 编辑目标 server → 检查 **Arguments** 中的 `API_KEY` / `TOKEN` 等值，改正后重连再试。[@ref-qoder-ide-mcp-trouble-params]
- 调用成功：结果出现在聊天流中，展开该响应可查看详细输入与输出。[@ref-qoder-ide-mcp-use]
