---
schema_version: 3
record_kind: production
edition_id: replit-agent-web-custom_providers-v1
harness_id: replit-agent
topic: custom_providers
title: "Replit Agent 的模型与 provider 管理：目录、策略、模型与 Effort"
sections:
  - section_id: providers-scope
    surface_ids: [web]
    source_refs: [ref-replit-prov-intro, ref-replit-prov-approved, ref-replit-prov-selector-manual, ref-replit-prov-auto-enable, ref-replit-prov-aiint-overview, ref-replit-modes-choices, ref-replit-index-enterprise]
  - section_id: providers-entry-catalog
    surface_ids: [web]
    source_refs: [ref-replit-prov-open-settings, ref-replit-prov-intro, ref-replit-prov-approved, ref-replit-prov-policy, ref-replit-prov-workspace-policy]
  - section_id: providers-models-metadata
    surface_ids: [web]
    source_refs: [ref-replit-prov-selector-models, ref-replit-prov-intro, ref-replit-prov-selector-effort, ref-replit-prov-fast, ref-replit-prov-effort-toggle, ref-replit-prov-understand]
  - section_id: providers-auth-forwarding
    surface_ids: [web]
    source_refs: [ref-replit-prov-intro, ref-replit-prov-policy, ref-replit-prov-aiint-overview, ref-replit-prov-aiint-byok, ref-replit-int-external, ref-replit-conn-byok, ref-replit-conn-props, ref-replit-prov-selector-manual, ref-replit-prov-auto-behavior, ref-replit-prov-auto-enable]
  - section_id: providers-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-prov-open-settings, ref-replit-prov-policy, ref-replit-prov-selector-models, ref-replit-prov-limits, ref-replit-config-user-notifications, ref-replit-prov-aiint-plan]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [web]
        section_id: providers-entry-catalog
        status: partial
        source_refs: [ref-replit-prov-open-settings, ref-replit-prov-intro, ref-replit-prov-approved, ref-replit-prov-policy, ref-replit-prov-workspace-policy]
  - question_id: providers.auth
    answers:
      - surface_ids: [web]
        section_id: providers-auth-forwarding
        status: not_applicable
        source_refs: [ref-replit-prov-intro, ref-replit-prov-policy, ref-replit-prov-aiint-overview, ref-replit-prov-aiint-byok, ref-replit-int-external, ref-replit-conn-byok, ref-replit-conn-props, ref-replit-prov-selector-manual, ref-replit-prov-auto-behavior, ref-replit-prov-auto-enable]
  - question_id: providers.protocol
    answers:
      - surface_ids: [web]
        section_id: providers-auth-forwarding
        status: not_applicable
        source_refs: [ref-replit-prov-intro, ref-replit-prov-policy, ref-replit-prov-aiint-overview, ref-replit-prov-aiint-byok, ref-replit-int-external, ref-replit-conn-byok, ref-replit-conn-props, ref-replit-prov-selector-manual, ref-replit-prov-auto-behavior, ref-replit-prov-auto-enable]
  - question_id: providers.models
    answers:
      - surface_ids: [web]
        section_id: providers-entry-catalog
        status: partial
        source_refs: [ref-replit-prov-open-settings, ref-replit-prov-intro, ref-replit-prov-approved, ref-replit-prov-policy, ref-replit-prov-workspace-policy]
  - question_id: providers.metadata
    answers:
      - surface_ids: [web]
        section_id: providers-models-metadata
        status: partial
        source_refs: [ref-replit-prov-selector-models, ref-replit-prov-intro, ref-replit-prov-selector-effort, ref-replit-prov-fast, ref-replit-prov-effort-toggle, ref-replit-prov-understand]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [web]
        section_id: providers-models-metadata
        status: unknown
        source_refs: [ref-replit-prov-selector-models, ref-replit-prov-intro, ref-replit-prov-selector-effort, ref-replit-prov-fast, ref-replit-prov-effort-toggle, ref-replit-prov-understand]
  - question_id: providers.responses
    answers:
      - surface_ids: [web]
        section_id: providers-auth-forwarding
        status: unknown
        source_refs: [ref-replit-prov-intro, ref-replit-prov-policy, ref-replit-prov-aiint-overview, ref-replit-prov-aiint-byok, ref-replit-int-external, ref-replit-conn-byok, ref-replit-conn-props, ref-replit-prov-selector-manual, ref-replit-prov-auto-behavior, ref-replit-prov-auto-enable]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [web]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-replit-prov-open-settings, ref-replit-prov-policy, ref-replit-prov-selector-models, ref-replit-prov-limits, ref-replit-config-user-notifications, ref-replit-prov-aiint-plan]
---

## 固定来源与适用范围 {#providers-scope}

本章固定来源是 Replit 官方文档站的 markdown 快照：Enterprise model controls
[@ref-replit-prov-intro]、Agent modes and
models（Enterprise）[@ref-replit-prov-approved]、Model selector
[@ref-replit-prov-selector-manual]、Auto mode [@ref-replit-prov-auto-enable]、Replit AI
Integrations [@ref-replit-prov-aiint-overview]、Agent Modes
[@ref-replit-modes-choices]，以及官方文档索引 Enterprise 一节
[@ref-replit-index-enterprise]。界面为 `web`，快照未标注软件版本。

结论先行：Replit 是托管产品，**用户不能定义自己的"provider"**——没有 base URL、API
key、协议适配或自定义端点的配置项用于 Agent 自身的推理。可配置的只有：**企业管理员从
Replit 的第一方 provider 目录里挑选哪些 provider/model 对哪些 Workspace
可用**，以及**用户在自己被授权的范围内选模型与 Effort**。

## 入口与可用 provider 目录 {#providers-entry-catalog}

**providers.entry**：唯一的管理入口在**账户级 Advanced 设置**里：**Settings → Account →
Advanced → Agent modes and model providers**（Enterprise
管理员专属，需联系销售启用）[@ref-replit-prov-open-settings][@ref-replit-prov-intro]。provider
列表里出现的是 Replit 自有的第一方目录，文档举例为
**OpenAI、Anthropic、Google、DeepSeek、Kimi、Z.ai**，并明确"可用模型目录会变化，以设置页中列出的模型为准"
[@ref-replit-prov-approved]。每个 provider 有一个 **Account policy**
[@ref-replit-prov-policy]：

| Account policy | 效果 |
| - | - |
| Enable all | 该 provider 的所有模型在每个 Workspace 可用 |
| Enable selected | 逐个 Workspace 选择可用模型 |
| Disabled | 任何 Workspace 都不能使用该 provider 的模型 |

约束：OpenAI、Anthropic、Google **至少各保留一个模型启用**，其它 provider
可以禁用；开源模型 provider 默认禁用，需显式 Enable all / Enable selected
[@ref-replit-prov-policy]。**Workspace 策略**在 Enable selected 下按 Workspace
打开/关闭单个模型，可用 **Copy to all** 把当前选择复制到账户下所有 Workspace
[@ref-replit-prov-workspace-policy]。缺口：没有"新增自定义 provider""填写 endpoint 或
API key"的任何字段，也没有非 Enterprise 用户可用的 provider 配置。

## 模型、别名与能力元数据 {#providers-models-metadata}

**providers.models**：对普通用户，模型目录以 **Model selector** 为准——文档给出 Power 与
Max 两个模式的模型表（GPT-6 Sol / GPT-6 Luna Fast / Claude Sonnet 5 / Claude Sonnet 4.6
属 Power；GPT-6 Astra、Claude Fable 5.1、Claude Opus 5.5/4.8/5、Claude Opus 5 Fast、Kimi
K3 属
Max）[@ref-replit-prov-selector-models]。文档同时写明这是**快照时点的列表**、会随灰度、组织设置与授权变化，"选择器里的列表才是你账户的事实源"，且
Fast 变体需要 Pro/Enterprise
[@ref-replit-prov-selector-models]。模型别名机制没有文档；`/design/explore-with-different-models`
说明 Design 与 Build 各自保存独立的模型选择
[@ref-replit-prov-selector-models]。Enterprise 侧则由管理员按 Workspace 勾选，Auto
只能在被授权的池子里选 [@ref-replit-prov-intro]。

**providers.metadata**：可见的能力元数据有三类。其一，**Effort**——按模型的
Low/Medium/High/Extra High/Max 五档推理强度，每档有适用场景说明，越高越慢越贵，且"更高
Effort 会让 Agent 在真正困难的任务上调用更强的前沿模型"，官方估计最困难任务上成本最高约
2 倍 [@ref-replit-prov-selector-effort]。其二，**Fast 变体与高 Effort 开关**：Enterprise
管理员用 **Fast mode models** 开关控制全账户所有 Workspace 是否可见快模型变体，用
**Extra High and Max Effort** 开关控制成员能否选更高推理档；关闭后成员仍可选
Low/Medium/High，Auto 不受该限制
[@ref-replit-prov-fast][@ref-replit-prov-effort-toggle]。其三，**模式与模型的搭配**：mode
决定工作方式与成本取向，model 是执行模型，effort 控制推理投入
[@ref-replit-prov-understand]。缺口：上下文窗口、输出上限、是否支持工具调用/视觉等元数据没有在登记来源中表达；**providers.forwarding**
因此判 unknown——没有来源说明哪些参数会被映射到请求、哪些只影响界面。

## 凭据、协议与响应 {#providers-auth-forwarding}

**providers.auth**：Agent 自身的 model provider **不需要用户提供凭据**——凭据由 Replit
管理，管理员只做启用/禁用
[@ref-replit-prov-intro][@ref-replit-prov-policy]。用户可见的凭据类机制都属于**其它层**，不要混用：**Replit
AI Integrations** 是给被构建的 app 用的托管模型凭据（Replit 持有 provider 认证并按公开
API 价计费，可选自带
key）[@ref-replit-prov-aiint-overview][@ref-replit-prov-aiint-byok]；**External
integrations** 让 Agent 搭建第三方服务时提示你把 API key 存进项目 Secrets
[@ref-replit-int-external]；**Enterprise 的 Connectors** 支持"自带 OpenAI key"以替代
Replit 默认的 AI 基础设施，并且连接器的 OAuth client/密钥由组织自有
[@ref-replit-conn-byok][@ref-replit-conn-props]。Enterprise 还可以让组织拥有 OAuth
客户端并自定义 scope，成员凭自身授权在日常工作里选模型
[@ref-replit-prov-selector-manual]。因此 **providers.auth 判 not_applicable**（Agent
推理链路没有用户可填的凭据字段），**providers.protocol 判
not_applicable**（没有可配置的请求协议或端点形态），**providers.responses 判
unknown**（流式、工具调用、错误与重试的约定没有登记来源，也没有 Agent
侧的后端契约文档）。

**providers.forwarding**（unknown）：登记来源只描述**界面可见的效果**——Auto
会随任务变化更换模型、Free Mode 固定走智能路由、手动选择在下一条消息生效
[@ref-replit-prov-auto-behavior][@ref-replit-prov-auto-enable]。哪些参数被客户端改写、如何映射到具体
provider 请求，官方文档没有写。

## 诊断与可观察性 {#providers-diagnostics}

**providers.diagnostics**：可区分的四层信号——（1）**配置可读**：Settings → Advanced →
Agent modes and model providers 里能看到 provider 策略与每个 Workspace 的模型开关
[@ref-replit-prov-open-settings][@ref-replit-prov-policy]；（2）**模型可选**：Model
selector 里能选到的模型就是你被授权的集合，"选择器里的列表是事实源"
[@ref-replit-prov-selector-models]；（3）**路由边界**：设定里明确 Intelligent Model
Routing **不会**越过账户或 Workspace 策略，无法选中被禁用的 provider/model
[@ref-replit-prov-limits]；（4）**模型变更通知**：当已发布 app 使用的模型过时时，Replit
会准备一个升级草稿任务并发邮件通知，可通过 Production Alerts 的 Model updates 项接收
[@ref-replit-config-user-notifications]。计划可用性上，Replit AI Integrations（app
侧）在 Starter 禁用、Core 可用、Pro/Enterprise 默认关闭需管理员开启
[@ref-replit-prov-aiint-plan]。缺口：没有"实际请求发往哪个模型/哪个端点"的逐请求日志或诊断输出；也没有配置重载入口（设置变更即时生效，无重载语义）。
