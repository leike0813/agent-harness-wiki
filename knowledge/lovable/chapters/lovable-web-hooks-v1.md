---
schema_version: 3
record_kind: production
edition_id: lovable-web-hooks-v1
harness_id: lovable
topic: hooks
title: "Lovable Web 的 Hook 机制：不适用，以及相邻的事件与自动化面"
sections:
  - section_id: hooks-events
    surface_ids: [web]
    source_refs: [ref-lovable-index-header, ref-lovable-index-listing, ref-lovable-connectors-faq, ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-appconn-approve, ref-lovable-agentint-tools, ref-lovable-lvapi-what, ref-lovable-mcpsrv-what, ref-lovable-agentint-how]
  - section_id: hooks-entry-io
    surface_ids: [web]
    source_refs: [ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-appconn-approve, ref-lovable-priv-data, ref-lovable-agentint-tools]
  - section_id: hooks-order-conditions
    surface_ids: [web]
    source_refs: [ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-adminconn-use, ref-lovable-projset-general, ref-lovable-priv-abandoned]
  - section_id: hooks-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-wsadmin-security, ref-lovable-mcpsrv-troubleshoot, ref-lovable-priv-mcpconn]
questions:
  - question_id: hooks.events
    answers:
      - surface_ids: [web]
        section_id: hooks-events
        status: not_applicable
        source_refs: [ref-lovable-index-header, ref-lovable-index-listing, ref-lovable-connectors-faq, ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-appconn-approve, ref-lovable-agentint-tools, ref-lovable-lvapi-what, ref-lovable-mcpsrv-what, ref-lovable-agentint-how]
  - question_id: hooks.entry
    answers:
      - surface_ids: [web]
        section_id: hooks-entry-io
        status: not_applicable
        source_refs: [ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-appconn-approve, ref-lovable-priv-data, ref-lovable-agentint-tools]
  - question_id: hooks.input
    answers:
      - surface_ids: [web]
        section_id: hooks-entry-io
        status: not_applicable
        source_refs: [ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-appconn-approve, ref-lovable-priv-data, ref-lovable-agentint-tools]
  - question_id: hooks.output
    answers:
      - surface_ids: [web]
        section_id: hooks-entry-io
        status: not_applicable
        source_refs: [ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-appconn-approve, ref-lovable-priv-data, ref-lovable-agentint-tools]
  - question_id: hooks.order
    answers:
      - surface_ids: [web]
        section_id: hooks-order-conditions
        status: not_applicable
        source_refs: [ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-adminconn-use, ref-lovable-projset-general, ref-lovable-priv-abandoned]
  - question_id: hooks.conditions
    answers:
      - surface_ids: [web]
        section_id: hooks-order-conditions
        status: not_applicable
        source_refs: [ref-lovable-priv-mcpconn, ref-lovable-adminconn-chat, ref-lovable-adminconn-use, ref-lovable-projset-general, ref-lovable-priv-abandoned]
  - question_id: hooks.diagnostics
    answers:
      - surface_ids: [web]
        section_id: hooks-diagnostics
        status: not_applicable
        source_refs: [ref-lovable-payments-webhooks, ref-lovable-projset-general, ref-lovable-priv-autofix, ref-lovable-priv-abandoned, ref-lovable-wsadmin-security, ref-lovable-mcpsrv-troubleshoot, ref-lovable-priv-mcpconn]
---

## 固定来源与"是否存在 Hook"的判定 {#hooks-events}

**结论：不适用（not applicable）。** Lovable 没有面向用户的第一方 hook / 回调扩展机制——没有可注册的事件清单，没有"在操作前/后运行命令"的接口，没有 hook 配置文件，也没有把工具调用或文件改动拦下来交给用户脚本的扩展点。本章固定来源是官方文档站 2026-10-01 抓取的已登记页面（`features/privacy-and-security-settings.md`、`features/projects/settings.md`、`features/workspace-admin-settings.md`、`features/payments.md`、`integrations/app-connectors.md`、`integrations/admin-controls.md`、`features/agent-integrations.md`、`integrations/lovable-mcp-server.md`）以及官方**全量页面索引**。

判定依据有三条，都可复核：

1. 官方文档站的全量页面索引 `https://docs.lovable.dev/llms.txt` 逐条列出全部页面的标题、URL 与摘要（本快照共 254 条）[@ref-lovable-index-header][@ref-lovable-index-listing]，其中**没有任何 hooks 页面**；
2. 官方在 connectors 概览里枚举"目录之外还能怎么扩展"时只给出三条：自定义 connector、直接集成任意 API、自定义 MCP server [@ref-lovable-connectors-faq]——没有第四条；
3. Lovable 的自动化都写成"平台自身按日程或按事件执行"，配置面只有开关与作用域，没有用户可写的回调。

容易被误认为 hook 的机制列在下表，它们都不给用户回调入口：

| 机制 | 触发时点 | 用户能配置的部分 | 依据 |
| :-- | :-- | :-- | :-- |
| **Payments 的 webhook 端点** | 支付 provider 事件到达时 | 无——端点在 provider 账号上由 Lovable 注册 | [@ref-lovable-payments-webhooks] |
| **Project monitoring** | 每日/每周日程 | 项目设置里开关与频率 | [@ref-lovable-projset-general] |
| **Auto-fix security issues** | 每次成员在项目聊天发出构建请求时 | 工作区默认作用域 + 项目级开关 | [@ref-lovable-priv-autofix] |
| **Abandoned projects** | 按活动信号超期判定，可再经宽限期自动删除 | 阈值与自动删除开关 | [@ref-lovable-priv-abandoned] |
| **Connector 写操作审批** | Lovable 准备通过连接执行写操作时 | 人机审批偏好（Allow once / Always allow / Skip） | [@ref-lovable-appconn-approve] |
| **Agent integration 工具状态** | 发布时 | 无——状态由发布决定 | [@ref-lovable-agentint-tools] |

**没有 hooks 时，"让外部事件驱动 Lovable"的四条真实路径**（都要靠外部系统自己驱动，平台不回调）：

| 需求 | 替代做法 | 依据 |
| :-- | :-- | :-- |
| 从外部脚本发布/管理项目 | **Lovable API**（`Lovable-API-Key` + `Lovable-Version`，REST，Business/Enterprise），自己定时轮询或按需调用 | [@ref-lovable-lvapi-what] |
| 让外部 AI 客户端直接建项目、发消息、发布 | **Lovable MCP server**（`https://mcp.lovable.dev`），由客户端在需要时调用 tool | [@ref-lovable-mcpsrv-what] |
| 在聊天工具里发起构建 | Slack / Telegram 中的 `@Lovable`，由人触发 | [@ref-lovable-connectors-faq] |
| 让已有产品能力被助手调用 | **Agent integrations**：把已发布 app 变成 MCP server，由终端用户的助手调用 tool | [@ref-lovable-agentint-how] |

注意这四条都是**拉取式或人驱动**：Lovable 不会在你的系统发生变化时主动回调。

**缺口**：没有任何一句官方原文直说"我们不提供 hooks"；本节结论来自"全量页面索引 + 全部已登记页面中不存在该机制"。若日后官方新增 hooks 页面，需要重查本节。

## 注册入口、回调输入与输出 {#hooks-entry-io}

**不适用。** 既然不存在 hook 注册位置，也就不存在 matcher、过滤规则、回调输入（环境变量、工作目录、stdin/JSON、事件 payload）与返回值语义（继续/修改/阻断）可写。为了读者能对上号，下表说明"看起来像事件"的机制各自的真实入口与形态：

| 机制 | 真实入口 | 形态 |
| :-- | :-- | :-- |
| Payments 端点 | 在支付 provider 后台可见；Lovable 为每个环境（test / live）注册**两个**端点 [@ref-lovable-payments-webhooks] | 一个是你 app 的 handler（URL 指向 app 后端，结尾 `?env=sandbox` / `?env=live`，例如 `https://PROJECT-REF.supabase.co/functions/v1/payments-webhook?env=sandbox` 或 `https://project--PROJECT-ID-dev.lovable.app/api/public/payments/webhook?env=sandbox`）；另一个是 `https://api.lovable.dev/projects/PROJECT-ID/payments-webhook/ENVIRONMENT`，**只收不发**，从不把事件转发给你的 app，用于 Lovable 侧监控投递是否正常 |
| Project monitoring | `Project settings → General → Project monitoring` [@ref-lovable-projset-general] | 关/开 + daily/weekly 频率；告警出现在编辑器内并发送邮件 |
| Auto-fix | `Workspace settings → Security → Privacy & security → Auto-fix security issues`，项目级在 `Project settings → Auto-fix security issues` [@ref-lovable-priv-autofix] | 四档作用域：Selected project（默认，等于关）/ Externally published projects / All published projects / All projects；工作区锁定时项目级不可改 |
| Abandoned projects | `Privacy & security → Abandoned projects` [@ref-lovable-priv-abandoned] | "Mark as abandoned after"（默认 60 天）与"Delete abandoned projects after"（7/14/30 天宽限）两组配置 |
| 连接审批 | 连接设置里的 **Agent approval for this connection**，或 `Account settings → Preferences → Agent permissions` [@ref-lovable-appconn-approve] | 三选一的**交互式**偏好；只读请求不弹审批 |

**"输入/输出"的边界**：上述机制的输入（事件 payload、活动信号）由 provider 或 Lovable 定义，**不暴露给用户**；用户能做的只有开关与作用域。因此问题里问的"回调收到什么输入、环境变量、工作目录、敏感内容如何处理"在 Lovable 上没有对应机制——敏感内容的处理是另一条独立策略（`Privacy & security → Sensitive data scanning` 与其 chat send protection 四档），针对的是聊天消息与附件，不是 hook 输入 [@ref-lovable-priv-data]。

**与"人机审批"的区分**：connector 的写操作会弹审批卡，看起来像"操作前拦截"，但它是**交互式审批**而非可编程 hook——用户不能自定义拦截条件、不能写脚本、也不能从审批结果里拿到结构化回调 [@ref-lovable-appconn-approve]。同理 agent integration 的 tool 有 `Active` / `Not published` / `Inactive` 状态，但没有调用前/后的钩子 [@ref-lovable-agentint-tools]。

## 顺序、并发、重复触发与生效条件 {#hooks-order-conditions}

**不适用。** 没有多个 hook 需要排序、去重、超时或失败处理；也没有"启用状态 / 信任 / 沙箱决定 hook 是否生效"的规则。为了完整覆盖问题面，这里列出**真实存在的、最接近的条件性行为**——它们决定的是"某个能力能不能被调用"，而不是 hook 的执行语义：

* **工具可见性由工作区分层开关决定**：`Privacy & security → Remote MCP connectors`（所有计划，默认开）是 chat connector 的总闸；`Local desktop MCP servers`（所有计划，Enterprise 默认关）必须在总闸开启时才有效；`Connectors → Admin settings → Chat connectors`（Business/Enterprise）再逐条开关，外加 **Custom MCP** 一行按组管控 [@ref-lovable-priv-mcpconn][@ref-lovable-adminconn-chat]；
* **连接的可用范围**由创建者在 **Sharing** 里设定（Private 默认 / 指定成员邮件 / 整个工作区），并且"连接级访问在发布之后不再强制" [@ref-lovable-adminconn-use]；
* **Chats 中的额外规则**：他人连接的"个人账号"（Gmail、Google Drive、Outlook、GitHub、Linear 等）不会被复用，连接列表标注 `Personal connection, restricted in chats`；共享的工作区工具（Slack、Notion、HubSpot、Salesforce）与 **Managed by Lovable** 连接在每位成员的 Chats 里都可用 [@ref-lovable-adminconn-use]；
* **并发与重复触发**在 Lovable 侧没有用户可见的语义：日程类任务（monitoring、abandoned 判定）由平台串行执行，来源没有给出并发窗口、重复触发去重或超时值 [@ref-lovable-projset-general][@ref-lovable-priv-abandoned]。

**缺口**：以上开关的"变更何时对进行中的会话生效"没有说明；`Privacy & security` 页整体要求改完点 **Update** [@ref-lovable-priv-mcpconn]，但没有逐项说明生效延迟。

## 诊断、生效与观测入口 {#hooks-diagnostics}

**不适用**——没有 hook 就没有"hook 是否被发现 / 被匹配 / 执行失败"的诊断可做。可对照的、真实存在的观测入口如下：

| 想确认的事 | 真实入口 | 依据 |
| :-- | :-- | :-- |
| payments 事件有没有投递到你的 app | **Payments tab** 的分析不依赖监控端点；监控端点只用于 Lovable 侧确认投递正常，**不转发**任何事件 | [@ref-lovable-payments-webhooks] |
| 项目监测是否在跑、告警去哪 | `Project settings → General → Project monitoring`（编辑器内 + 邮件告警） | [@ref-lovable-projset-general] |
| 自动修复是否生效 | 工作区默认作用域 + 项目级开关；开启后每次构建请求都会尝试修复最新关键发现 | [@ref-lovable-priv-autofix] |
| 项目是否被判为 abandoned、是否将被删除 | 删除前 5 天与 1 天的预警邮件 + 项目内横幅；可点 **Keep it** 或在横幅/邮件之外通过编辑项目取消；删除后最长保留 60 天，需联系 support 恢复 | [@ref-lovable-priv-abandoned] |
| 谁改了工作区配置 | Enterprise 的 **Audit logs**，可按成员、动作、资源、时间范围筛选并展开事件详情；经 Lovable API 触发的事件会归属到发起请求的 access token（展开 JSON 里有 `api_key_id`） | [@ref-lovable-wsadmin-security] |
| 外部客户端调用 Lovable MCP server 失败 | 客户端侧 `tools/list`、Claude Code 的 `/mcp`；`401` + `WWW-Authenticate: Bearer error="invalid_token"` 表示 SSO 会话过期 | [@ref-lovable-mcpsrv-troubleshoot] |

**改动生效**：这些机制都是"改完即生效 / 下次日程生效"，来源没有重载或重启的概念；`Privacy & security` 页统一要求改完点 **Update** 应用大部分更改 [@ref-lovable-priv-mcpconn]。

**缺口**：来源未说明日程任务的时区、失败重试与跳过策略；也未提供 payments 监控端点的自助查询界面（只有 Payments tab 的投递分析）。已检查登记来源中的 `features/`（privacy/security、project settings、workspace admin settings、payments、agent integrations）与 `integrations/`（app-connectors、admin-controls、lovable-mcp-server）页面，以及官方全量页面索引。
