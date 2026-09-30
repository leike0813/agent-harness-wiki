---
schema_version: 3
record_kind: production
edition_id: junie-cli-mcp-v1
harness_id: junie
topic: mcp
title: "Junie CLI 的 MCP 集成：mcp.json、传输、认证、生命周期与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [cli]
    source_refs: [ref-junie-mcp-overview, ref-junie-quickstart-overview]
  - section_id: mcp-entry-definition
    surface_ids: [cli]
    source_refs: [ref-junie-mcp-overview, ref-junie-mcp-add, ref-junie-mcp-json, ref-junie-config-fields, ref-junie-env-mcp, ref-junie-params-mcp, ref-junie-config-trust, ref-junie-mcp-assistant]
  - section_id: mcp-transport-auth
    surface_ids: [cli]
    source_refs: [ref-junie-mcp-add, ref-junie-mcp-json, ref-junie-mcp-oauth, ref-junie-mcp-assistant]
  - section_id: mcp-lifecycle
    surface_ids: [cli]
    source_refs: [ref-junie-mcp-list, ref-junie-mcp-enable, ref-junie-mcp-assistant, ref-junie-mcp-overview]
  - section_id: mcp-exposure
    surface_ids: [cli]
    source_refs: [ref-junie-quickstart-approval, ref-junie-allowlist-rules, ref-junie-agents-format]
  - section_id: mcp-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-mcp-list, ref-junie-mcp-oauth, ref-junie-mcp-assistant, ref-junie-quickstart-approval, ref-junie-mcp-overview]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: answered
        source_refs: [ref-junie-mcp-overview, ref-junie-mcp-add, ref-junie-config-fields, ref-junie-env-mcp, ref-junie-params-mcp, ref-junie-config-trust]
  - question_id: mcp.definition
    answers:
      - surface_ids: [cli]
        section_id: mcp-entry-definition
        status: partial
        source_refs: [ref-junie-mcp-json, ref-junie-mcp-assistant]
  - question_id: mcp.transport
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: partial
        source_refs: [ref-junie-mcp-add, ref-junie-mcp-json, ref-junie-mcp-assistant]
  - question_id: mcp.auth
    answers:
      - surface_ids: [cli]
        section_id: mcp-transport-auth
        status: answered
        source_refs: [ref-junie-mcp-oauth, ref-junie-mcp-json, ref-junie-mcp-assistant]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-junie-mcp-list, ref-junie-mcp-enable, ref-junie-mcp-assistant]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [cli]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-junie-mcp-overview, ref-junie-mcp-list]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [cli]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-junie-quickstart-approval, ref-junie-allowlist-rules, ref-junie-agents-format]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-junie-mcp-list, ref-junie-mcp-oauth, ref-junie-mcp-assistant, ref-junie-quickstart-approval, ref-junie-mcp-overview]
---

## 固定来源与适用范围 {#mcp-scope}

本章依据 Junie 官方文档站 `junie.jetbrains.com/docs` 的 `junie-cli-mcp-configuration.html`、
`junie-cli-configuration.html`、`environment-variables.html`、`parameters.html`、
`action-allowlist-junie-cli.html` 与 `junie-cli.html` 快照。文档未标注适用构建号，因此是来源级
知识。Junie CLI 通过 Model Context Protocol（MCP）连接外部工具，与 JetBrains IDE 里的 Junie 使用
同一套 MCP JSON 配置 [@ref-junie-mcp-overview]。通用配置加载顺序见配置机制章节
[@ref-junie-quickstart-overview]。

## 配置入口与 server 定义 {#mcp-entry-definition}

**mcp.entry**。MCP server 写在 `mcp.json` 的 `mcpServers` 对象里，按作用域分两处：

- 项目作用域：项目根下 `.junie/mcp/mcp.json`，可提交版本库供团队共享。
- 用户作用域：`~/.junie/mcp/mcp.json`，对本机所有项目可用且只属于当前用户。

`/mcp` 斜杠命令同时是安装助手与管理界面；手动写入的配置会被导入 server 列表并默认启用
[@ref-junie-mcp-add][@ref-junie-mcp-json][@ref-junie-mcp-overview]。除默认位置外，可用 `--mcp-location` 追加搜索目录、
`--mcp-default-locations false` 关闭默认位置，`config.json` 中对应 `mcp-locations` 与
`mcp-default-locations`，环境变量为 `JUNIE_MCP_LOCATIONS`/`JUNIE_MCP_DEFAULT_LOCATIONS`（默认
`true`）[@ref-junie-config-fields][@ref-junie-env-mcp][@ref-junie-params-mcp]。未受信任的项目不会
隐式加载项目 MCP 配置，会话中新增的 server 写入仓库之外的临时目录并在进程结束时移除
[@ref-junie-config-trust]。

**mcp.definition**。`mcp.json` 的结构是 `{ "mcpServers": { ... } }`，每个键是一个 server 别名。
本地 server 用 `command`（如 `npx`）加 `args` 数组，可选 `env` 键值对；远程 server 用 `url` 加可选
`headers` [@ref-junie-mcp-json]。官方给出的最小示例：

```json
{
  "mcpServers": {
    "Context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": { "ENV_VAR": "value" }
    },
    "RemoteServer": {
      "url": "https://mcp.example.com/v1",
      "headers": { "Authorization": "Bearer token" }
    }
  }
}
```

示例来自官方 MCP 配置文档 [@ref-junie-mcp-json]。安装助手从预配置服务器注册表或官方 MCP
registry 取配置，并提示补全参数、环境变量、密钥或 API token
[@ref-junie-mcp-assistant]。文档没有描述变量展开规则（如 `${VAR}`）、工作目录字段或字段默认值，
这一项按 partial 阅读。

## 传输与认证 {#mcp-transport-auth}

**mcp.transport**。安装助手把连接类型分为两类：Remote（通过 HTTP/HTTPS 连接托管 server）与 Local
（在本机以 Docker、npx 或二进制方式启动 server）[@ref-junie-mcp-add]。JSON 侧对应 `url`（远程）与
`command`（本地）两类字段 [@ref-junie-mcp-json]。文档没有区分 SSE 与 Streamable HTTP 等更细的传输
形态，也没有给出启动超时或重试参数，因此本项按 partial 阅读。

**mcp.auth**。两种凭据形式：其一，静态 `headers`，例如 `Authorization: Bearer token`
[@ref-junie-mcp-json]；其二，OAuth——需要授权的远程 server 先以 “Authorization required” 状态加入
列表，用安装助手选择 `→ Authorize`，在浏览器完成登录后状态变为 Active
[@ref-junie-mcp-oauth]。添加配置时助手会提示输入所需的密钥、环境变量或 API token
[@ref-junie-mcp-assistant]。

## 生命周期、能力与启停 {#mcp-lifecycle}

**mcp.lifecycle**。server 状态取六种之一：Starting、Active、Inactive、Disabled、Failed、
Authorization required；项目/用户作用域与名称一并显示 [@ref-junie-mcp-list]。经安装助手连接或从
`mcp.json` 导入的 server 默认启用，`/mcp` 里对选中项执行 `→ Disable`/`→ Enable` 可切换状态
[@ref-junie-mcp-enable]。安装助手在添加时会“验证 server 启动”
[@ref-junie-mcp-assistant]。文档没有描述重连、退避重试、连接超时或缓存策略，因此本项按 partial
阅读。

**mcp.capabilities**：固定来源只描述了 **tools** 一侧——server 通过 MCP 向 Junie 提供工具，工具调用
属于需要用户批准或进入 Action Allowlist 的敏感动作 [@ref-junie-mcp-overview]。文档没有说明
resources、prompts 或 server 指令（initialize instructions）是否被发现或可用，因此本项按 partial
阅读：工具能力已确立，resources/prompts 未确立。

## 暴露与审批 {#mcp-exposure}

**mcp.exposure**。三层控制：

- 运行期审批：除非显式打开 brave mode，Junie 在执行终端命令、调用 MCP 工具等敏感动作前请求用户
  批准；选择 `→ Always allow` 会写入 Action Allowlist，此后同名命令/模式不再询问
  [@ref-junie-quickstart-approval]。
- Allowlist 规则：`allowlist.json` 的五类动作包含 `mcpTools`，规则按 `prefix` 或 `pattern`（Glob
  语法）匹配，`action` 取 `allow`（自动执行）或 `ask`（继续询问）；规则自上而下、首个匹配生效
  [@ref-junie-allowlist-rules]。
- 子代理可见性：自定义子代理的 frontmatter `mcpServers` 若为非空列表，则只有列出的 MCP server 的
  工具对该子代理可见，其余配置的 server 被隐藏；留空或省略则保持全部可用
  [@ref-junie-agents-format]。

## 诊断 {#mcp-diagnostics}

**mcp.diagnostics**。配置是否被读到：`/mcp` 列出全部已配置 server，含名称、安装作用域与状态
[@ref-junie-mcp-list]。server 是否连上：看状态值（Starting/Active/Inactive/Disabled/Failed/
Authorization required）[@ref-junie-mcp-list]。需要授权时状态显示 “Authorization required”，完成
`→ Authorize` 后应变为 Active，可据此确认认证是否生效 [@ref-junie-mcp-oauth]。添加阶段助手会验证
server 启动 [@ref-junie-mcp-assistant]。调用是否成功：MCP 工具调用走与终端命令相同的审批链路，
审批对话框或 Action Allowlist 行为可反映调用是否被放行 [@ref-junie-quickstart-approval]。ACP
客户端里的 `/mcp` 退化为只读列表（显示本地 server 的运行时状态与来源，以及客户端在会话初始化时
传入的 server），不再提供安装助手或编辑入口 [@ref-junie-mcp-overview]。
