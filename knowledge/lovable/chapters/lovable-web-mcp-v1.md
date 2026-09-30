---
schema_version: 3
record_kind: production
edition_id: lovable-web-mcp-v1
harness_id: lovable
topic: mcp
title: "Lovable Web 的 MCP：chat connector、自定义 server、注册表与 Lovable MCP server"
sections:
  - section_id: mcp-entry
    surface_ids: [web]
    source_refs: [ref-lovable-chatconn-relate, ref-lovable-agentint-diff, ref-lovable-chatconn-why, ref-lovable-mcpsrv-what, ref-lovable-agentint-how, ref-lovable-connectors-where, ref-lovable-chatconn-manage, ref-lovable-chatconn-how, ref-lovable-priv-mcpserver]
  - section_id: mcp-definition
    surface_ids: [web]
    source_refs: [ref-lovable-custommcp-how, ref-lovable-custommcp-staticip, ref-lovable-desktop-mcp, ref-lovable-desktop-custom-local, ref-lovable-desktop-faq, ref-lovable-mcpreg-add, ref-lovable-mcpreg-what, ref-lovable-mcpreg-faq, ref-lovable-mcpreg-browse]
  - section_id: mcp-auth
    surface_ids: [web]
    source_refs: [ref-lovable-custommcp-how, ref-lovable-mcpreg-browse, ref-lovable-mcpreg-add, ref-lovable-mcpsrv-faq, ref-lovable-mcpsrv-what, ref-lovable-mcpsrv-troubleshoot, ref-lovable-intsec-credentials, ref-lovable-intsec-ip]
  - section_id: mcp-lifecycle
    surface_ids: [web]
    source_refs: [ref-lovable-custommcp-how, ref-lovable-desktop-mcp, ref-lovable-desktop-security, ref-lovable-custommcp-staticip, ref-lovable-custommcp-faq, ref-lovable-mcpreg-faq, ref-lovable-appconn-create, ref-lovable-chatconn-how, ref-lovable-mcpsrv-tools, ref-lovable-agentint-how, ref-lovable-agentint-tools, ref-lovable-intsec-gateway, ref-lovable-mcpsrv-faq]
  - section_id: mcp-exposure
    surface_ids: [web]
    source_refs: [ref-lovable-adminconn-chat, ref-lovable-priv-mcpconn, ref-lovable-priv-mcpserver, ref-lovable-custommcp-manage, ref-lovable-adminconn-use, ref-lovable-appconn-approve, ref-lovable-agentint-tools, ref-lovable-agentint-access]
  - section_id: mcp-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-custommcp-how, ref-lovable-chatconn-faq, ref-lovable-custommcp-faq, ref-lovable-mcpsrv-troubleshoot, ref-lovable-mcpsrv-faq, ref-lovable-chatconn-manage, ref-lovable-mcpsrv-perms]
questions:
  - question_id: mcp.entry
    answers:
      - surface_ids: [web]
        section_id: mcp-entry
        status: answered
        source_refs: [ref-lovable-chatconn-relate, ref-lovable-agentint-diff, ref-lovable-chatconn-why, ref-lovable-mcpsrv-what, ref-lovable-agentint-how, ref-lovable-connectors-where, ref-lovable-chatconn-manage, ref-lovable-chatconn-how, ref-lovable-priv-mcpserver]
  - question_id: mcp.definition
    answers:
      - surface_ids: [web]
        section_id: mcp-definition
        status: partial
        source_refs: [ref-lovable-custommcp-how, ref-lovable-custommcp-staticip, ref-lovable-desktop-mcp, ref-lovable-desktop-custom-local, ref-lovable-desktop-faq, ref-lovable-mcpreg-add, ref-lovable-mcpreg-what, ref-lovable-mcpreg-faq, ref-lovable-mcpreg-browse]
  - question_id: mcp.transport
    answers:
      - surface_ids: [web]
        section_id: mcp-definition
        status: answered
        source_refs: [ref-lovable-custommcp-how, ref-lovable-custommcp-staticip, ref-lovable-desktop-mcp, ref-lovable-desktop-custom-local, ref-lovable-desktop-faq, ref-lovable-mcpreg-add, ref-lovable-mcpreg-what, ref-lovable-mcpreg-faq, ref-lovable-mcpreg-browse]
  - question_id: mcp.auth
    answers:
      - surface_ids: [web]
        section_id: mcp-auth
        status: answered
        source_refs: [ref-lovable-custommcp-how, ref-lovable-mcpreg-browse, ref-lovable-mcpreg-add, ref-lovable-mcpsrv-faq, ref-lovable-mcpsrv-what, ref-lovable-mcpsrv-troubleshoot, ref-lovable-intsec-credentials, ref-lovable-intsec-ip]
  - question_id: mcp.lifecycle
    answers:
      - surface_ids: [web]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-lovable-custommcp-how, ref-lovable-desktop-mcp, ref-lovable-desktop-security, ref-lovable-custommcp-staticip, ref-lovable-custommcp-faq, ref-lovable-mcpreg-faq, ref-lovable-appconn-create, ref-lovable-chatconn-how, ref-lovable-mcpsrv-tools, ref-lovable-agentint-how, ref-lovable-agentint-tools, ref-lovable-intsec-gateway, ref-lovable-mcpsrv-faq]
  - question_id: mcp.capabilities
    answers:
      - surface_ids: [web]
        section_id: mcp-lifecycle
        status: partial
        source_refs: [ref-lovable-custommcp-how, ref-lovable-desktop-mcp, ref-lovable-desktop-security, ref-lovable-custommcp-staticip, ref-lovable-custommcp-faq, ref-lovable-mcpreg-faq, ref-lovable-appconn-create, ref-lovable-chatconn-how, ref-lovable-mcpsrv-tools, ref-lovable-agentint-how, ref-lovable-agentint-tools, ref-lovable-intsec-gateway, ref-lovable-mcpsrv-faq]
  - question_id: mcp.exposure
    answers:
      - surface_ids: [web]
        section_id: mcp-exposure
        status: answered
        source_refs: [ref-lovable-adminconn-chat, ref-lovable-priv-mcpconn, ref-lovable-priv-mcpserver, ref-lovable-custommcp-manage, ref-lovable-adminconn-use, ref-lovable-appconn-approve, ref-lovable-agentint-tools, ref-lovable-agentint-access]
  - question_id: mcp.diagnostics
    answers:
      - surface_ids: [web]
        section_id: mcp-diagnostics
        status: answered
        source_refs: [ref-lovable-custommcp-how, ref-lovable-chatconn-faq, ref-lovable-custommcp-faq, ref-lovable-mcpsrv-troubleshoot, ref-lovable-mcpsrv-faq, ref-lovable-chatconn-manage, ref-lovable-mcpsrv-perms]
---

## MCP 的三个方向与配置入口 {#mcp-entry}

Lovable 用 MCP 做了三件方向不同的事，理解哪一端在消费 MCP 是读本章的前提 [@ref-lovable-chatconn-relate][@ref-lovable-agentint-diff]：

| 方向 | 谁连接谁 | 说明 |
| :-- | :-- | :-- |
| **Chat connectors**（本章主角） | Lovable 连接你的外部工具 | 你在构建时把 Notion、Linear、Miro 等读作上下文 [@ref-lovable-chatconn-why] |
| **Lovable MCP server** | 外部 AI 客户端连接 Lovable | `https://mcp.lovable.dev`，让 ChatGPT/Claude/Cursor/VS Code 管理你的 Lovable 项目 [@ref-lovable-mcpsrv-what] |
| **Agent integrations** | 你的已发布应用成为 MCP server | 终端用户的助手调用你 app 暴露的 tools [@ref-lovable-agentint-how] |

固定来源是官方文档站 2026-10-01 抓取的 markdown 快照：`integrations/chat-connectors.md`、`integrations/custom-mcp.md`、`integrations/mcp-registries.md`、`integrations/lovable-mcp-server.md`、`integrations/admin-controls.md`、`features/agent-integrations.md`、`integrations/introduction.md`、`features/privacy-and-security-settings.md`、`integrations/desktop-app.md`、`integrations/security.md`。**能力面按"chat connector（MCP server）"这一名字组织**，产品里没有独立的 MCP 配置文件。

**配置入口**（都在 Web 产品里，没有本地配置文件）[@ref-lovable-connectors-where][@ref-lovable-chatconn-manage]：

| 入口 | 作用域 | 内容 |
| :-- | :-- | :-- |
| `Connectors`（`lovable.dev/dashboard?connectors`） | 个人连接 + 工作区目录 | 目录浏览、`Add connection`、**+** 菜单（MCP server / Custom connector / MCP registry）、页面底部的 **MCP registries** 区 |
| 项目内 `More → Connectors` | 项目视角 | `Project connections` 与 `MCP connectors`；`All connectors` 回到完整目录 |
| `Connectors → Admin settings → Chat connectors` | 工作区（Business/Enterprise） | 逐个 chat connector 的开关 + 一行 **Custom MCP**（"Allow members to connect their own MCP servers"） |
| `Workspace settings → Security → Privacy & security` | 工作区 | **Remote MCP connectors**（总开关，所有计划）与 **Local desktop MCP servers**（所有计划；Enterprise 默认关） |
| `Workspace settings → Build & deploy → MCP server` | 工作区 | Lovable MCP server 的 URL、客户端设置步骤与 **Manage access** 快捷键 |

`Connectors` 目录可以从仪表盘侧边栏、新项目提示框旁的 **+** 菜单、项目内边栏、以及 Chats 的 **+ → Add context → Connectors** 打开 [@ref-lovable-connectors-where]。连接是**个人级**的：谁连接、谁能用，别人看不见也用不了；这与工作区共享的 app + chat 连接不同 [@ref-lovable-chatconn-how]。

**第三方 MCP 客户端访问 Lovable** 另有独立开关：`Privacy & security → Third-party MCP clients`，Business 默认开、Enterprise 默认关，Free/Pro 恒开不可配置 [@ref-lovable-priv-mcpserver]。

## Server 定义、传输与注册表 {#mcp-definition}

**自定义 MCP server 就是一条远程 server 记录，字段固定四个** [@ref-lovable-custommcp-how]：

| 字段 | 取值 | 说明 |
| :-- | :-- | :-- |
| **Server name** | 自由文本 | 例如 *Internal CRM*、*Analytics API* |
| **Connection** | `Direct connection`（默认）/ `Lovable static IPs` | 仅在工作区有多个可选路由时出现；static IPs 是 Enterprise 且需 Lovable 开通 [@ref-lovable-custommcp-staticip] |
| **Server URL** | `https://` 地址 | 例如 `https://mcp.example.com` |
| **Authentication** | OAuth（默认）/ Bearer token 或 API key / No authentication | 见认证小节 |

来源没有给出 command/args/env/cwd 这类本地进程字段用于**远程** chat connector；**本地**扩展是 desktop app 的独立机制（见下）。也没有任何来源说明配置值里能做 `${VAR}` 之类的变量展开——`features`/`integrations` 相关页面均未出现该语法，这一项按缺口记录。

**传输形态**：

* **远程 HTTP(S)**：chat connector 的主体形态，URL 直连；企业防火墙场景可选 **Lovable static IPs** 路由，出口网段为 IPv4 `185.41.150.0/28`、`185.41.150.16/28`，IPv6 `2a07:8241:fca:1000::/56`，官方特别说明这些是共享出口、不是身份凭证，server 自身仍要保留 bearer/OAuth [@ref-lovable-custommcp-staticip]。
* **本地 stdio / 本地 HTTP**：仅 **Lovable 桌面应用**支持。`Connectors → Local MCP servers` 会列出本机运行、自带 MCP server 的工具（Figma Desktop、Paper），也可以 **Custom MCP** 手动添加：填名称，再填"本地进程的命令与参数"或"本地 HTTP server 的 URL" [@ref-lovable-desktop-mcp][@ref-lovable-desktop-custom-local]。本地 server 只能从本机访问，因此必须先有桌面应用 [@ref-lovable-desktop-faq]。

**MCP registry** 是工作区级的目录，不是 server 本身。字段三个：**Registry URL**（例如 `https://api.example.com/v0/servers`）、**Display name**（可选）、**Bearer token**（仅需要认证的 registry）[@ref-lovable-mcpreg-add]。同一工作区里一个 URL 只能添加一次；Lovable 不提供默认注册表或官方目录，需要自带 [@ref-lovable-mcpreg-what][@ref-lovable-mcpreg-faq]。从 registry 里点 **Connect** 打开的就是同一个 MCP server 表单，只是 URL 已填好，并且**永远走 Direct connection**（不会出现 static IPs 选项）[@ref-lovable-mcpreg-browse][@ref-lovable-mcpreg-faq]。registry 本身的管理入口在工作区设置 `Customization → Connector settings` 或 Connectors 页底部 [@ref-lovable-mcpreg-add]。

## 认证与凭据 {#mcp-auth}

| 场景 | 认证方式 | 备注 |
| :-- | :-- | :-- |
| 自定义 chat connector | **OAuth（默认）**、Bearer token / API key、无认证 | OAuth 走 `Add & authorize`；其余走 `Add server` [@ref-lovable-custommcp-how] |
| 从 registry 连的 server | 同上三种 | 各成员用自己的账号和凭据连接，连接是个人级的 [@ref-lovable-mcpreg-browse] |
| MCP registry 自身 | 仅 **Bearer token** | 官方说明 bearer token 是认证 registry 的唯一方式 [@ref-lovable-mcpreg-add] |
| Lovable MCP server（外部客户端连 Lovable） | **仅 OAuth** | "API key authentication is not currently available"，首次连接时客户端打开浏览器登录 [@ref-lovable-mcpsrv-faq][@ref-lovable-mcpsrv-what] |
| SSO 工作区下的 Lovable MCP server | OAuth + SSO 会话时长 | 会话（24h/48h/7d）过期后 server 返回 `401` 与 `WWW-Authenticate: Bearer error="invalid_token"`，规范客户端会自动重跑 OAuth [@ref-lovable-mcpsrv-troubleshoot] |

**凭据存放位置**：chat connector 的 token 由 Lovable 侧保管，不进入项目；`integrations/security.md` 说明连接凭据加密存储、保存后任何人（含工作区管理员与 Lovable）都不能读回，项目拿到的是 `LOVABLE_API_KEY` 与不透明的 connection key [@ref-lovable-intsec-credentials]。自定义 MCP server **不经过** connector gateway，因此默认出口不固定；只有走 **Lovable static IPs** 时才有固定网段 [@ref-lovable-intsec-ip]。

**缺口**：来源没有说明 chat connector 的 OAuth token 刷新时机与失败后的重连语义（app connector 侧写了 gateway 会刷新、失败返回 `credential_refresh_token_expired`；chat connector 页只写了"OAuth 默认"）。已检查 `integrations/custom-mcp.md`、`integrations/chat-connectors.md`、`integrations/security.md` 与 `integrations/lovable-mcp-server.md`。

## 生命周期与能力面 {#mcp-lifecycle}

**连接何时建立**：连接由人在 `Connectors` 里显式创建（`Add & authorize` / `Add server`），不是启动时扫描配置文件——托管产品没有"启动即拉起 server 进程"的环节 [@ref-lovable-custommcp-how]。本地 MCP server 例外：桌面应用会**自动探测**本机正在运行的 Figma Desktop、Paper 并列出，首次连接需要用户批准，也可以手动 **Custom MCP** 添加 [@ref-lovable-desktop-mcp][@ref-lovable-desktop-security]。

**删除、重连与固定选择** [@ref-lovable-custommcp-staticip][@ref-lovable-custommcp-faq]：

* **Connection** 选项在**创建时固定**；之后即使工作区关闭了 static IPs，已有连接继续可用，但不能新建；要换路由必须**删除 server 再重新添加**；
* 自定义 MCP server 在 Admin settings 里**不逐条列出**，而是由 **Custom MCP** 一行按组管控；
* 删除 registry 不会删除成员已连接的 server，它们退化为独立连接继续工作；重新添加 registry 会重新建立关联 [@ref-lovable-mcpreg-faq]；
* 删除连接即从工作区移除，凭据一并删除，使用它的应用停止工作（app connector 侧的等价描述）[@ref-lovable-appconn-create]。

**能力面**，逐类说明，不能用其中一项代表全部 [@ref-lovable-chatconn-how][@ref-lovable-mcpsrv-tools][@ref-lovable-agentint-how]：

* **chat connector**：以**读取**为主——读文档、工单、白板等结构化内容；在工具支持的前提下可以做有限动作（创建/更新条目）。它只在项目聊天与 Chats 中给 Lovable 提供上下文，**不进入已发布应用**，应用访客无法通过它触达外部工具 [@ref-lovable-chatconn-how]；
* **Lovable MCP server**：对**外部客户端**暴露一组 tools，官方逐项列出 `get_me`、`list_workspaces`、`create_project`、`send_message`、`deploy_project`、`list_files`、`read_file`、`query_database`、`get_workspace_knowledge` / `set_workspace_knowledge`、`create_workspace_skill`、`list_connectors` 等，并给出机器可读版本 `https://mcp.lovable.dev/skill.md`；两个工具只在特定客户端出现（ChatGPT 的 `render_project_widget`、Claude 的 `import-claude-design-from-url`）[@ref-lovable-mcpsrv-tools]；
* **Agent integrations**：由 Lovable 为你的已发布 app 生成 MCP server 并**提议一组 tools**，你可以要求增删改名；每个 tool 带 `Active` / `Not published` / `Inactive` 状态，以及 `Read-only` / `May modify data` 能力标签 [@ref-lovable-agentint-tools]。
* **resources 与 prompts**：登记来源中没有出现 chat connector 或 MCP registry 对 MCP resources/prompts 的支持说明；三处 MCP 页面都只描述 **tools**（以及 chat connector 的"读上下文/有限动作"）。这一项按 `unknown` 记录，已检查 `integrations/chat-connectors.md`、`integrations/custom-mcp.md`、`integrations/mcp-registries.md` 与 `integrations/lovable-mcp-server.md`。

**用量与限流**：走 connector gateway 的连接默认 **每个 connector、每个项目每分钟 1000 次**请求，个别连接更低；每个项目独立计数 [@ref-lovable-intsec-gateway]。Lovable MCP server 侧的 `create_project` 与 `send_message` 消耗标准积分，其余工具不消耗 [@ref-lovable-mcpsrv-faq]。Agent integrations **没有内置限流或消费上限**，官方要求在 app 侧自行限制 [@ref-lovable-agentint-tools]。

**缺口**：来源没有给出超时、重试次数、缓存或心跳语义（三处 MCP 页面都没有）；也没有说明 chat connector 的连接健康检查周期。已检查上述四个 MCP 页面与 `integrations/security.md`。

## 工具暴露、审批与工作区管控 {#mcp-exposure}

**工作区级管控**分三层 [@ref-lovable-adminconn-chat][@ref-lovable-priv-mcpconn][@ref-lovable-priv-mcpserver]：

1. **Remote MCP connectors**（`Privacy & security`，所有计划，默认开）——关掉即**全工作区**禁用 chat connector（含自定义 MCP server），Connectors 页会显示 "chat connectors are disabled"；
2. **Local desktop MCP servers**（`Privacy & security`，所有计划，Enterprise 默认关）——必须在 Remote MCP connectors 也开启时才有效；
3. **Connectors → Admin settings → Chat connectors**（Business/Enterprise）——逐个 catalog connector 开关，外加 **Custom MCP** 一行按组管控成员自建 server；自定义 MCP server 不会出现在 admin 表里 [@ref-lovable-custommcp-manage]。

**逐连接的使用权**由创建者决定（Private / Share with others / Invite entire workspace），与 admin 无关；连接访问权**在发布之后不再强制**（app connector 侧明确说明）。Chats 里另有一条规则：**他人连接的"个人账号"（Gmail、GitHub、Linear 等）不会被复用**，连接列表标注 `Personal connection, restricted in chats`；共享的工作区工具（Slack、Notion、HubSpot、Salesforce）以及 Managed by Lovable 的连接在每位成员的 Chats 里都可用 [@ref-lovable-adminconn-use]。

**审批流程**：连接被 link 到项目后，Lovable 读取不询问；**写操作前弹出审批卡**，提供 **Allow once** / **Always allow** / **Skip** 三个选项，**Always allow** 是针对"你 + 该连接"的偏好，可在连接设置或 `Account settings → Preferences → Agent permissions` 里调整 [@ref-lovable-appconn-approve]。builder access（让 Lovable 用你自己的账号在构建期读 provider 数据）同样默认对可能改数据的操作弹审批 [@ref-lovable-appconn-approve]。

**Agent integrations 的暴露粒度**：由你选择 **Protected with OAuth（默认）** 或 **Public — no login**（必须显式选）；发布到工作区的 app 只能要求登录。每个 tool 的输入、返回字段、权限校验与重试安全性都要在发布前逐项检查，官方建议先用少量只读 tool 起步 [@ref-lovable-agentint-tools][@ref-lovable-agentint-access]。

## 诊断与验证 {#mcp-diagnostics}

**chat connector** 的验证方式最直接：连接完成后，用一句依赖该 server 的提问验证，例如 *Using the Internal CRM connector, list my five most recent customer accounts.* [@ref-lovable-custommcp-how]。失败时的排查顺序按官方 FAQ [@ref-lovable-chatconn-faq][@ref-lovable-custommcp-faq]：

* **连接不上** → 检查工作区 admin 是否禁用了该 connector、**Custom MCP**、或整体 **Remote MCP connectors**；Custom MCP 表单里 **MCP server** 变灰就是被关了；
* **看不到自定义 server 的 admin 条目** → 设计如此，自定义 server 按组管控；
* **看不到 static IPs 选项** → 需要 Enterprise 计划且由 Lovable 为工作区开通，且只能对"按 URL 添加"的 server 使用；
* **把各成员自己的凭据混淆** → chat 连接是个人级的，别人要自己连一次。

**Lovable MCP server（外部客户端一侧）** 的诊断入口 [@ref-lovable-mcpsrv-troubleshoot][@ref-lovable-mcpsrv-faq]：

* 跑 `tools/list` 确认连接；连接为空时按连接方式排查——UI/OAuth 连接的删掉 Lovable 条目重加，配置文件连接的检查 JSON 合法性与 `"lovable"` 是否嵌在既有 `mcpServers` 对象内（重复的 `mcpServers` 块会让文件非法），改完重启客户端；
* Claude Code 用 `/mcp` 查看 `lovable` server 是否存在；
* `list_workspaces` 取有效 workspace_id（省略 `workspace_id` 时若只有一个合格工作区会自动选，多个则返回 `WAITING` 列出候选）；`list_projects` 校正 project_id；`enable_database` 后重试 `query_database`；
* 发布被拒时响应是 `400` + `type: security_critical_findings`，`finding_refs` 指向具体发现；
* SSO 会话过期表现为 `401` + `WWW-Authenticate: Bearer error="invalid_token"`，完成浏览器登录即可恢复工具调用 [@ref-lovable-mcpsrv-troubleshoot]。

**工作区侧的监控入口**：Connectors 页显示每个连接的启用状态与被禁用原因；Lovable MCP server 的 `Workspace settings → Build & deploy → MCP server` 显示 URL、客户端步骤与 **Manage access** 快捷入口 [@ref-lovable-chatconn-manage][@ref-lovable-mcpsrv-perms]。

**缺口**：来源没有提供 server 级别的调用日志、错误码表或连接时延指标；只有客户端侧的报错与工作区侧的开关状态。已检查 `integrations/lovable-mcp-server.md`、`integrations/custom-mcp.md`、`integrations/chat-connectors.md`、`integrations/admin-controls.md` 与登记页面的 FAQ。
