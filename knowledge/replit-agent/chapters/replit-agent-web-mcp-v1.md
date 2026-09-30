---
schema_version: 3
record_kind: production
edition_id: replit-agent-web-mcp-v1
harness_id: replit-agent
topic: mcp
title: "Replit Agent 的 MCP 与集成：入口、传输、认证、能力与诊断"
sections:
  - section_id: mcp-scope
    surface_ids: [web]
    source_refs: [ref-replit-mcp-list, ref-replit-mcp-connect-prelisted, ref-replit-mcp-server-connect, ref-replit-int-types, ref-replit-conn-scope, ref-replit-mcp-concept-primitives, ref-replit-index-chat]
  - section_id: mcp-entry-definition
    surface_ids: [web]
    source_refs: [ref-replit-mcp-connect-prelisted, ref-replit-conn-custom, ref-replit-conn-scope, ref-replit-mcp-install-link, ref-replit-mcp-connect-custom]
  - section_id: mcp-transport-auth
    surface_ids: [web]
    source_refs: [ref-replit-mcp-connect-custom, ref-replit-mcp-install-link, ref-replit-mcp-server-connect, ref-replit-mcp-auth, ref-replit-conn-props]
  - section_id: mcp-capabilities-exposure
    surface_ids: [web]
    source_refs: [ref-replit-mcp-use-tools, ref-replit-mcp-concept-primitives, ref-replit-mcp-server-tools, ref-replit-mcp-security, ref-replit-conn-props]
  - section_id: mcp-lifecycle-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-mcp-connect-prelisted, ref-replit-mcp-connect-custom, ref-replit-conn-scope, ref-replit-int-reconnect, ref-replit-mcp-use-tools, ref-replit-mcp-security, ref-replit-mcp-server-trouble]
  - section_id: mcp-native-integrations
    surface_ids: [web]
    source_refs: [ref-replit-int-types, ref-replit-int-managed, ref-replit-int-connectors, ref-replit-int-external, ref-replit-int-services, ref-replit-int-custom-create, ref-replit-prov-aiint-overview, ref-replit-mcp-server-connect]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [web]
        section_id: mcp-entry-definition
        status: partial
        source_refs: [ref-replit-mcp-connect-prelisted, ref-replit-conn-custom, ref-replit-conn-scope, ref-replit-mcp-install-link, ref-replit-mcp-connect-custom]
  - question_id: mcp.definition
    answers:
      - surface_ids: [web]
        section_id: mcp-entry-definition
        status: partial
        source_refs: [ref-replit-mcp-connect-prelisted, ref-replit-conn-custom, ref-replit-conn-scope, ref-replit-mcp-install-link, ref-replit-mcp-connect-custom]
  - question_id: mcp.transport
    answers:
      - surface_ids: [web]
        section_id: mcp-transport-auth
        status: partial
        source_refs: [ref-replit-mcp-connect-custom, ref-replit-mcp-install-link, ref-replit-mcp-server-connect, ref-replit-mcp-auth, ref-replit-conn-props]
  - question_id: mcp.auth
    answers:
      - surface_ids: [web]
        section_id: mcp-transport-auth
        status: partial
        source_refs: [ref-replit-mcp-connect-custom, ref-replit-mcp-install-link, ref-replit-mcp-server-connect, ref-replit-mcp-auth, ref-replit-conn-props]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [web]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-replit-mcp-connect-prelisted, ref-replit-mcp-connect-custom, ref-replit-conn-scope, ref-replit-int-reconnect, ref-replit-mcp-use-tools, ref-replit-mcp-security, ref-replit-mcp-server-trouble]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [web]
        section_id: mcp-capabilities-exposure
        status: partial
        source_refs: [ref-replit-mcp-use-tools, ref-replit-mcp-concept-primitives, ref-replit-mcp-server-tools, ref-replit-mcp-security, ref-replit-conn-props]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [web]
        section_id: mcp-capabilities-exposure
        status: partial
        source_refs: [ref-replit-mcp-use-tools, ref-replit-mcp-concept-primitives, ref-replit-mcp-server-tools, ref-replit-mcp-security, ref-replit-conn-props]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [web]
        section_id: mcp-lifecycle-diagnostics
        status: partial
        source_refs: [ref-replit-mcp-connect-prelisted, ref-replit-mcp-connect-custom, ref-replit-conn-scope, ref-replit-int-reconnect, ref-replit-mcp-use-tools, ref-replit-mcp-security, ref-replit-mcp-server-trouble]
---

## 固定来源与适用范围 {#mcp-scope}

本章固定来源是 Replit 官方文档站的 markdown 快照：MCP 服务器参考
[@ref-replit-mcp-list]、连接指南 Connect via MCP
[@ref-replit-mcp-connect-prelisted]、Replit MCP Server
[@ref-replit-mcp-server-connect]、集成总览 [@ref-replit-int-types]、连接器管理
[@ref-replit-conn-scope]、MCP 概念页
[@ref-replit-mcp-concept-primitives]，以及官方文档索引
[@ref-replit-index-chat]。快照未标注软件版本，全章为来源级知识。界面为
`web`：所有配置都在 replit.com 的 Integrations / Workspace Settings 与 Project Editor 的
Connectors 面板中完成，没有本地配置文件。

Replit 里"连接工具"有两条并行的路：**MCP**（把外部 MCP server 的 tools 接给 Agent）和
**原生集成**（Replit managed、Connectors、External integrations、Agent
services）[@ref-replit-int-types]；MCP 客户端也可以是**反向**的——把
ChatGPT、Claude、Codex 等 MCP 客户端接到 Replit MCP Server
[@ref-replit-mcp-server-connect]。

## 配置入口与 server 定义 {#mcp-entry-definition}

**mcp.entry**：有四个可确认的作用域入口。其一，账号/Workspace 级的 **Integrations
面板**：打开 `replit.com/integrations`，在 **MCP Servers for Replit Agent** 区域逐个
**Sign in** 连接预置 server [@ref-replit-mcp-connect-prelisted]。其二，Workspace
管理上下文：在 **Integrations → Your integrations → Add custom** 里，Workspace
管理员可以 **Add workspace MCP server**，普通成员可以 **Add personal MCP
server**；管理员添加 workspace server 时还要选择是"共享一条连接"还是"每个成员各自登录"
[@ref-replit-conn-custom][@ref-replit-conn-scope]。其三，项目级入口：Project Editor 侧栏
**Connectors**，同一菜单里既有集成也有 MCP server 选项
[@ref-replit-conn-custom]。其四，一键安装链接：`https://replit.com/integrations?mcp=`
后接 base64 编码的 JSON payload，任何人点击即安装
[@ref-replit-mcp-install-link]。连接作用域在 Integrations 页用 **Scope**
列区分：Personal、Workspace、Workspace / Personal、Project、Replit-managed
[@ref-replit-conn-scope]。

**mcp.definition**：远程自定义 server 的配置对话框只有三个可写项——**Display
name**（Agent 在聊天日志里引用该 server 的名字）、**MCP Server URL**（server 的 HTTPS
端点）、以及 **Advanced settings** 里的自定义 headers（例如
`X-API-Key`）[@ref-replit-mcp-connect-custom]。安装链接的 payload 同样只包含
`displayName`、`baseUrl`、可选 `headers` 数组 [@ref-replit-mcp-install-link]：

```json
{
  "displayName": "My MCP Server",
  "baseUrl": "https://example.com/mcp",
  "headers": [{ "key": "Authorization", "value": "Bearer YOUR_TOKEN" }]
}
```

（示例取自 [@ref-replit-mcp-install-link]，凭据用占位符。）缺口：文档没有出现
command、args、cwd、env 等本地进程字段——因为 Agent 侧只接远程 HTTP 端点，本界面没有本地
stdio server 的配置入口；也没有变量展开规则（如 `$VAR`）的说明。

## 传输与认证 {#mcp-transport-auth}

**mcp.transport**：Agent 侧登记的形态只有一种——**远程 HTTPS 端点**。添加自定义 server
时要求粘贴其 "HTTPS endpoint" [@ref-replit-mcp-connect-custom]；安装链接字段 `baseUrl`
的说明也写作 "your MCP server's HTTPS endpoint"
[@ref-replit-mcp-install-link]。反向方向（Replit 作为 server）明确为 **Streamable
HTTP**：URL `https://mcp.replit.com/server/mcp`，客户端需支持 Streamable HTTP 与 OAuth
授权 [@ref-replit-mcp-server-connect]。文档没有把 Agent 侧的传输协议逐字写成 "Streamable
HTTP"，也没有 stdio/SSE 的分别说明，因此按 partial 阅读。

**mcp.auth**：文档给出两条认证路径 [@ref-replit-mcp-auth]——（1）**OAuth dynamic client
registration**：server 支持 OAuth DCR 时 Replit 自动检测并注册客户端，多数预置 server
走这条；（2）**Custom headers**：定义一个或多个 header 名/值（如 `X-API-Key`），Replit
在每个 MCP 请求中带上，适用于用静态 token 认证的自定义 server。添加自定义 server 时点
**Test & save**，Replit 会尝试连接并引导完成该 server 要求的 OAuth 流程
[@ref-replit-mcp-connect-custom]。Enterprise 还可以自带 OAuth 客户端（组织自有的 client
id/secret 与 scope）[@ref-replit-conn-props]。反向的 Replit MCP Server **不要**配 bearer
token 或自定义 header，由 Replit 提供 protected-resource 元数据、客户端读取后引导登录
[@ref-replit-mcp-server-connect]。缺口：token
刷新周期、凭据存储与轮换细节未在来源中说明。

## 能力发现与暴露 {#mcp-capabilities-exposure}

**mcp.capabilities**：文档只描述了 **tools** 一面的行为：server 连接后 Agent
自动拉取其工具清单，并把能力在所有项目中可用；在聊天里点名 server 即可使用（例："Use the
Notion MCP server to find the most recent meeting
notes."）[@ref-replit-mcp-use-tools]。MCP 概念页列举了协议原始能力
Resources、Tools、Prompts、Sampling、Transports
[@ref-replit-mcp-concept-primitives]，但登记来源没有说明 Replit Agent 是否消费 resources
或 prompts，因此不能以 tools 代替全部；按 partial 处理。反方向，Replit MCP Server 暴露 8
个工具（`create_app_from_prompt`、`search_apps`、`resolve_app_by_name`、`list_apps`、`ask_question`、`update_app_using_prompt`、`publish_app`、`get_publish_status`），其中
`search_apps` 的 `limit` 为 1–50，`list_apps` 默认 25、上限 50
[@ref-replit-mcp-server-tools]。

**mcp.exposure**：Agent 实际调用受两道闸门约束。其一，**安全扫描器**：所有 MCP 流量经过
Replit 安全扫描，扫描器评估工具定义与计划执行、在运行前阻断可疑或不安全的工具；被拒绝时
Agent 会告知用户
[@ref-replit-mcp-security]。其二，**调用前确认**：工具需要确认时会出现提示，用户批准后才会执行
[@ref-replit-mcp-use-tools]。可见范围上，Workspace 管理员可以让 server 对 Workspace
可见，但"Workspace 可用"并不等于每个成员都能访问外部服务里的每条记录
[@ref-replit-conn-props]。缺口：没有工具名过滤、前缀命名空间或按工具粒度的白名单配置文档。

## 生命周期与诊断 {#mcp-lifecycle-diagnostics}

**mcp.lifecycle**：连接动作是显式的——预置 server 点 **Sign in** 完成 OAuth，连接成功后该
server 的**连接状态**会更新 [@ref-replit-mcp-connect-prelisted]；自定义 server 点 **Test
& save** 时 Replit 先尝试连接（含 OAuth），保存后连接出现在 **MCP Servers** 下并显示状态
[@ref-replit-mcp-connect-custom]。断开/撤销在 Connectors 面板点 **Manage** 处理
[@ref-replit-conn-scope]；集成登录失效或权限变化时 Project Editor
会出现重连提示，点提示即可原地重连 [@ref-replit-int-reconnect]。缺口：server
何时启动/重连、重试策略、超时与缓存**没有**在任何登记来源中写明；已启用/已连接状态之外的运行期生命周期按
unknown 阅读。

**mcp.diagnostics**：可核查的入口分四层——（1）配置是否被读取：Integrations 页的 **MCP
Servers for Replit Agent** 列表与 **Your integrations** 表格，可看到每条连接的 **Default
permission**、**Scope**、**Connected apps**、**Connection status**
[@ref-replit-conn-scope]；（2）连接是否成功：**Test & save** 的即时结果与连接状态
[@ref-replit-mcp-connect-custom]；（3）工具是否可见与调用：在聊天里点名 server，Agent
调用工具时会出现工具调用记录、需要确认时出现提示
[@ref-replit-mcp-use-tools]；（4）调用失败：被安全扫描拒绝时 Agent 主动告知
[@ref-replit-mcp-security]。反向接入的排错表给出三类问题：被要求重新认证、找不到
app（确认有编辑权后用 URL 搜索或 `list_apps`）、create/update/publish
仍在运行（等待，publish 用 `get_publish_status` 查）[@ref-replit-mcp-server-trouble]。

## 与原生集成的区别 {#mcp-native-integrations}

**Agent 工具/集成的完整面**由四类组成 [@ref-replit-int-types]：**Replit
managed**（内置、免配置，如 Database、App Storage、Replit Auth、Replit
Domains）[@ref-replit-int-managed]；**Connectors**（Replit 第一方集成，登录一次后 Agent
可在聊天里直接读写，连接绑定在账号上、跨 app 复用，入口是 Project Editor 侧栏的
Connectors → **Add new integration**）[@ref-replit-int-connectors]；**External
integrations**（可信第三方服务，按需提供 API key，key 存在项目的 **Secrets**
里）[@ref-replit-int-external]；**Agent services**（Replit 代付的第三方付费 API，无需
key，按 provider 公开价计入 Replit credits，例如 Brave Image Search、ElevenLabs、Gemini
图像生成）[@ref-replit-int-services]。

**Custom connectors** 是 Pro/Enterprise 的独立机制，与 custom MCP server 明确区分：在
**Integrations → Add custom → Add custom connector** 里填 Connector
name、Description、Base URL、Agent instructions（上限 500 字符），选认证方式（例如
Bearer token，填 token 时不带 `Bearer` 前缀，Replit 发送时自动补上），可选 **Endpoint
test** 发一次 GET 校验，保存后成为 Workspace 级连接器
[@ref-replit-int-custom-create]。**Replit AI Integrations** 则是给**被构建的
app**用的托管模型凭据（Replit 持有 provider 凭据并按公开价计费，也可自带
key），不要把两者与 Agent 自身的模型路由混为一谈
[@ref-replit-prov-aiint-overview]。缺口：聊天集成（Replit in Slack/ChatGPT/Claude）与
MCP/Connectors 的确切边界只在 Replit MCP Server 页出现
[@ref-replit-mcp-server-connect]，本章不做超出来源的推断。
