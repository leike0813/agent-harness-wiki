---
schema_version: 3
record_kind: production
edition_id: lovable-web-custom_providers-v1
harness_id: lovable
topic: custom_providers
title: "Lovable Web 的 Provider：不可自选的模型与可自定义的 connector/API 入口"
sections:
  - section_id: providers-entry
    surface_ids: [web]
    source_refs: [ref-lovable-ai-models, ref-lovable-ai-enable, ref-lovable-connectors-types, ref-lovable-createconn-how, ref-lovable-createconn-security, ref-lovable-appuser-how, ref-lovable-anyapi-direct, ref-lovable-createconn-managing]
  - section_id: providers-auth
    surface_ids: [web]
    source_refs: [ref-lovable-createconn-auth, ref-lovable-createconn-oauth, ref-lovable-createconn-how, ref-lovable-appuser-how, ref-lovable-anyapi-direct, ref-lovable-intsec-domains, ref-lovable-buildsecrets-intro, ref-lovable-buildsecrets-add, ref-lovable-manreg-intro, ref-lovable-apikeys-create, ref-lovable-apikeys-use, ref-lovable-createconn-security]
  - section_id: providers-protocol
    surface_ids: [web]
    source_refs: [ref-lovable-createconn-how, ref-lovable-createconn-oauth, ref-lovable-createconn-knowledge, ref-lovable-createconn-auth, ref-lovable-appuser-how, ref-lovable-connectors-types, ref-lovable-intsec-gateway]
  - section_id: providers-models
    surface_ids: [web]
    source_refs: [ref-lovable-ai-models, ref-lovable-priv-data, ref-lovable-ai-choose]
  - section_id: providers-metadata
    surface_ids: [web]
    source_refs: [ref-lovable-ai-models, ref-lovable-ai-choose, ref-lovable-ai-how]
  - section_id: providers-responses-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-ai-how, ref-lovable-ai-pricing, ref-lovable-ai-debug, ref-lovable-appuser-how, ref-lovable-intsec-gateway, ref-lovable-intsec-ip, ref-lovable-intsec-domains, ref-lovable-createconn-how, ref-lovable-createconn-auth, ref-lovable-createconn-managing, ref-lovable-apikeys-faq]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [web]
        section_id: providers-entry
        status: partial
        source_refs: [ref-lovable-ai-models, ref-lovable-ai-enable, ref-lovable-connectors-types, ref-lovable-createconn-how, ref-lovable-createconn-security, ref-lovable-appuser-how, ref-lovable-anyapi-direct, ref-lovable-createconn-managing]
  - question_id: providers.auth
    answers:
      - surface_ids: [web]
        section_id: providers-auth
        status: answered
        source_refs: [ref-lovable-createconn-auth, ref-lovable-createconn-oauth, ref-lovable-createconn-how, ref-lovable-appuser-how, ref-lovable-anyapi-direct, ref-lovable-intsec-domains, ref-lovable-buildsecrets-intro, ref-lovable-buildsecrets-add, ref-lovable-manreg-intro, ref-lovable-apikeys-create, ref-lovable-apikeys-use, ref-lovable-createconn-security]
  - question_id: providers.protocol
    answers:
      - surface_ids: [web]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-lovable-createconn-how, ref-lovable-createconn-oauth, ref-lovable-createconn-knowledge, ref-lovable-createconn-auth, ref-lovable-appuser-how, ref-lovable-connectors-types, ref-lovable-intsec-gateway]
  - question_id: providers.models
    answers:
      - surface_ids: [web]
        section_id: providers-models
        status: partial
        source_refs: [ref-lovable-ai-models, ref-lovable-priv-data, ref-lovable-ai-choose]
  - question_id: providers.metadata
    answers:
      - surface_ids: [web]
        section_id: providers-metadata
        status: partial
        source_refs: [ref-lovable-ai-models, ref-lovable-ai-choose, ref-lovable-ai-how]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [web]
        section_id: providers-metadata
        status: partial
        source_refs: [ref-lovable-ai-models, ref-lovable-ai-choose, ref-lovable-ai-how]
  - question_id: providers.responses
    answers:
      - surface_ids: [web]
        section_id: providers-responses-diagnostics
        status: answered
        source_refs: [ref-lovable-ai-how, ref-lovable-ai-pricing, ref-lovable-ai-debug, ref-lovable-appuser-how, ref-lovable-intsec-gateway, ref-lovable-intsec-ip, ref-lovable-intsec-domains, ref-lovable-createconn-how, ref-lovable-createconn-auth, ref-lovable-createconn-managing, ref-lovable-apikeys-faq]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [web]
        section_id: providers-responses-diagnostics
        status: answered
        source_refs: [ref-lovable-ai-how, ref-lovable-ai-pricing, ref-lovable-ai-debug, ref-lovable-appuser-how, ref-lovable-intsec-gateway, ref-lovable-intsec-ip, ref-lovable-intsec-domains, ref-lovable-createconn-how, ref-lovable-createconn-auth, ref-lovable-createconn-managing, ref-lovable-apikeys-faq]
---

## Provider 的定义入口：模型 provider 不可自定义，可自定义的是"被调用的 API" {#providers-entry}

先划清边界，这是本章最重要的结论：

* **构建代理（Lovable agent）自己用的模型 provider 不可由用户配置。** `features/ai.md` 明确说明它列出的模型"是给**你构建出来的应用**用的，不是 Lovable 用来写、改、推理代码的模型" [@ref-lovable-ai-models]；AI 功能页开篇也强调内置 AI connector 的价值正是"不需要选 provider、不需要管 key、不需要配 billing" [@ref-lovable-ai-enable]。来源里不存在 `base_url` / `api_key` / provider 列表之类的代理侧配置。
* **用户可以定义的是"你的应用与聊天要调用的外部 API"**，官方给了三种形态 [@ref-lovable-connectors-types][@ref-lovable-createconn-how]：

| 形态 | 定义位置 | 作用域 | 谁来带凭据 |
| :-- | :-- | :-- | :-- |
| **Custom connector**（REST API → app + chat 连接） | `Connectors` → **+** → **Custom connector**，一个表单（Details / Authentication / Agent knowledge） | 单个工作区 | connector gateway 侧加密保存，服务端注入 [@ref-lovable-createconn-security] |
| **App user connector client**（每个终端用户用自己的账号） | `Connectors` → 选 provider → 添加 client | 单个工作区 | 每个用户各自的 token，存于 gateway [@ref-lovable-appuser-how] |
| **直接集成（direct integration）** | 项目聊天里描述 API；密钥存为项目 secret | 单个项目 | 项目自己保存并在服务端读取 [@ref-lovable-anyapi-direct] |

创建 custom connector 需要工作区 **admin/owner** 角色，所有计划可用；连接器只对创建它的工作区可见 [@ref-lovable-createconn-managing][@ref-lovable-createconn-how]。表单第一段就是 **Details**（Display name、Short description、Description、可选 Logo、Category、可选 Documentation URL），内部 ID 由 Display name 派生且**之后不可改** [@ref-lovable-createconn-how]。

**缺口**：来源没有给出 custom connector 的配额或数量上限，也没有说明 connector 定义能否导出/导入到另一个工作区（技能可以那样搬运，connector 未见说明）。已检查 `integrations/create-connector.md`、`integrations/app-user-connectors.md`、`integrations/any-api.md` 与 `features/ai.md`。

## 凭据、环境变量与 base URL {#providers-auth}

**Custom connector 的认证方式**是表单里的固定选项，凭据**值**从不在定义表单里输入 [@ref-lovable-createconn-auth]：

| 方式 | 凭据怎么发 | 定义时配置什么 |
| :-- | :-- | :-- |
| **Bearer token** | `Authorization: Bearer TOKEN` | Credential label |
| **API key in a custom header** | 自定义 header（如 `X-Api-Key`） | Credential label、Header name、可选 Value prefix |
| **API key in a query parameter** | 查询参数（如 `?key=...`） | Credential label、Parameter name |
| **Basic auth** | `Authorization: Basic ...` | 无额外项；用户填用户名与密码 |
| **Advanced** | 多个字段，各自作为 header / query param / basic 部分 | Field key、Label、Send as、Secret 开关；至少一个字段必须标 secret |
| **OAuth 2.0** | 标准授权码流程 | Authorization URL、Token URL、Scopes、Scope separator、Use PKCE [@ref-lovable-createconn-oauth] |

**base URL 与连通性测试**：**API base URL** 必须是 `https://`；**Test request** 由 **Method** 与 **Path** 组成（路径以 `/` 开头，例如 `GET /v1/me`），用来在用户连接时验证凭据 [@ref-lovable-createconn-how]。OAuth 连接器还会显示一个 redirect URL，官方要求原样加入 provider 的 OAuth app 允许回调列表 [@ref-lovable-createconn-oauth]。

**App user connector** 走 provider 自己的 OAuth：先在 provider 侧注册 OAuth 应用并取得批准（如 Salesforce External Client App、Databricks OAuth app、Snowflake security integration、Google consent screen、Microsoft app registration），然后回到 Lovable 添加 **client**（client ID/secret 以及 provider 要求的 account/workspace URL）[@ref-lovable-appuser-how]。注册时必须把 Lovable 的 gateway 回调地址加入允许重定向 URI [@ref-lovable-appuser-how]：

```text
https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback
```

**直接集成**时，密钥以项目 **secret** 形式保存：Lovable 把值写进项目 secrets，服务端代码（新版 TanStack Start 应用为 server function，旧版 React + Vite 为 Cloud Edge Function）读取，浏览器拿不到；provider 专为浏览器设计的 key（如 Google Maps Platform browser key）是例外，放在前端代码里并配合域限制 [@ref-lovable-anyapi-direct][@ref-lovable-intsec-domains]。

**构建期凭据**用另一套机制：**build secrets**（Enterprise，工作区级）在项目**构建时**作为环境变量注入，典型用途是访问私有 npm registry 的 `NPM_TOKEN`；Lovable 会写 `.npmrc` 引用 `${PACKAGES_TOKEN}` 这类变量，但**不会**创建或读取 secret [@ref-lovable-buildsecrets-intro][@ref-lovable-buildsecrets-add]。也可以让 Lovable 自建 registry（**Managed registry**，Enterprise，Beta）[@ref-lovable-manreg-intro]。

**访问 Lovable 自身的 API** 用另一种凭据：workspace **API key / access token**，请求头是 `Lovable-API-Key`，同时需要 `Lovable-Version` 头；key 在创建时选作用域（Projects / Workspace 的 None/Read/Read & write）、有效期（7/30/60/90/180 天、1 年或 Never）与可选月度积分上限 [@ref-lovable-apikeys-create][@ref-lovable-apikeys-use]。

**凭据可见性**：custom connector 的凭据值加密保存，连接创建时输入，之后由 gateway 服务端注入；标为 secret 的字段只显示末几位，非 secret 字段（如 basic auth 用户名）明文可见 [@ref-lovable-createconn-security]。**缺口**：来源没有给出凭据轮换的自动策略（只有 `LOVABLE_API_KEY` 有 **Rotate** 动作，见 `integrations/security.md`），也没有给出 connector 凭据的过期时间。

## 协议与端点形态 {#providers-protocol}

| 层 | 支持的形态 | 依据 |
| :-- | :-- | :-- |
| 传输 | **HTTPS**（base URL 与 OAuth 端点都必须是 `https://`） | [@ref-lovable-createconn-how][@ref-lovable-createconn-oauth] |
| 数据形态 | **REST / JSON**；知识文件里用 `GET /v1/projects` 这类相对路径描述端点，Lovable 负责路由并自动附加凭据 | [@ref-lovable-createconn-knowledge] |
| 认证协议 | Bearer、自定义 header、query 参数、Basic、多字段 Advanced、**OAuth 2.0 授权码流程（含 PKCE）** | [@ref-lovable-createconn-auth][@ref-lovable-createconn-oauth] |
| 用户身份 | App user connector 走 provider 的标准 OAuth consent screen，按 per-user token 隔离 | [@ref-lovable-appuser-how] |
| 工具上下文 | 非 REST 的工具用 **MCP**（chat connector）接入，属于 MCP 主题，不占 connector 定义 | [@ref-lovable-connectors-types] |

**没有兼容层**：来源里不存在 OpenAI-compatible / Anthropic-compatible 之类的代理层配置，也没有允许改写 HTTP 请求的钩子（见 `hooks` 主题）。gateway 只承担"用哪套凭据、发到哪个 base URL、按哪种认证方式注入"三件事 [@ref-lovable-intsec-gateway]。

**缺口**：来源没有说明 gateway 对请求体/响应体的改写范围（例如分页、重试、超时、Header 透传白名单），只在 Integration security 里说明它负责认证、刷新 token、注入凭据与限流。已检查 `integrations/create-connector.md`、`integrations/security.md`、`integrations/any-api.md`。

## 模型 ID、别名与发现 {#providers-models}

**代理侧（构建用模型）**：不可选、不可配置——见本章第一节 [@ref-lovable-ai-models]；唯一的间接开关是工作区级 **Extended-retention models** [@ref-lovable-priv-data]。

**应用侧（Lovable AI，内置 AI connector）** 有一份官方维护的模型表，分七类：Chat、Image、Video、Embedding、Typed decision、Text-to-speech、Speech-to-text；每个模型条目都链到 provider 的官方模型页，部分标注 **(deprecated)**（仍可用但新建功能不会再选它）、**Priority processing** 支持与否、以及能否展示 thinking [@ref-lovable-ai-models]。

**发现与选择规则** [@ref-lovable-ai-choose][@ref-lovable-ai-models]：

* 用户**不写模型 ID**；可以"点名一个受支持的模型"，也可以只描述想要什么、由 Lovable 挑；
* 官方给的是"起步用哪个、什么时候换"的对照表，例如对话类从 `Gemini 3.8 Flash` 起步、需要更深推理或更长上下文时再换；图像从 `GPT Image 2` 起步；向量检索从 `Gemini Embedding 2` 起步；
* 请求已被弃用的模型时，Lovable 会改推一个受支持的模型；
* Enterprise 工作区默认只用零数据保留模型，Claude 系列与 `Gemini Omni 1.1 Flash` 需要管理员开启 extended-retention 后才能在 app 里使用 [@ref-lovable-ai-models]；
* Claude 系列只加到较新（TanStack Start）应用里，旧版 React + Vite 应用使用其他 chat 模型 [@ref-lovable-ai-models]；
* `Connectors → AI` 里，弃用模型带 **Deprecated** 徽标 [@ref-lovable-ai-models]。

**缺口**：模型清单随官方文档更新，本快照的型号名只在本文档抓取时有效；来源也没有给出模型版本的调用标识（API 名称），只有展示名与官方模型页链接。

## 能力元数据与参数转发 {#providers-metadata}

**能力元数据**在登记来源里只有"定性标签"，没有数值字段 [@ref-lovable-ai-models][@ref-lovable-ai-choose]：

| 元数据 | 在文档里的表达 |
| :-- | :-- |
| 输入模态 | 例如 Gemini Flash 系列"accepts text, image, audio, and video input"；Claude 系列"accept text, image, and PDF input" |
| 深度推理 / thinking | "Many models work through a problem before they answer"；`GPT-5.5 Pro`、`GPT-5.4 Pro` 总是先推理，不能用于普通聊天回复 |
| 延迟档位 | **Priority processing** 列（Yes/No），把请求送到 provider 更快的服务档 |
| 生命周期 | `(deprecated)` 标注；弃用模型不再被选用于新功能 |
| 用途推荐 | "Choosing a model" 的"起步 / 何时切换"表 |

**上下文窗口、最大输出 token、工具调用能力、视觉能力的具体数值在登记来源里没有出现**：`features/ai.md` 只给能力描述与官方模型页外链，没有给出参数表。这一项按 `partial` 记录（有定性能力面，缺数值）。

**参数转发**：来源没有给出"哪些参数会透传到 provider、哪些只影响界面或路由"的清单。可确定的两点 [@ref-lovable-ai-how][@ref-lovable-ai-choose]：

* AI 调用经 Lovable 创建的**后端 edge function** 发出，不经浏览器；凭据与 prompt 留在服务端；
* "展示模型 thinking""使用 priority processing""加/减/改名 tool"这类需求是通过**自然语言提示**表达的，Lovable 把它们落成代码，而不是用户在配置文件里写参数。

**缺口**：temperature、max_tokens、top_p 等采样参数的可写性、以及它们在 Lovable 侧的默认值，登记来源均未涉及。已检查 `features/ai.md` 全文、`integrations/create-connector.md` 与 `integrations/any-api.md`。

## 响应、错误、重试与诊断 {#providers-responses-diagnostics}

**响应与流式**：内置 AI connector **默认使用 SSE 流式**，聊天/助手类功能逐 token 返回 [@ref-lovable-ai-how]。用量与列在 `features/ai.md` 的 **Usage and pricing** 一节；应用侧 AI 请求有工作区级速率限制，并有"Recent requests"监控视图 [@ref-lovable-ai-pricing][@ref-lovable-ai-debug]。

**错误与重试**（可确定的部分）：

* App user connector：gateway 在 access token 过期时自动用 refresh token 刷新；refresh token 失效时返回 **401，`type` 为 `credential_refresh_token_expired`**，生成的代码会提示用户重新连接 [@ref-lovable-appuser-how]；
* 走 gateway 的连接有**每 connector、每项目每分钟 1000 次**默认上限，个别连接更低 [@ref-lovable-intsec-gateway]；
* 平台级外呼出口固定：gateway 连接走 IPv4 `185.41.150.0/25` / IPv6 `2a07:8241:fca::/48` [@ref-lovable-intsec-ip]；
* 浏览器侧 key 需要配置域限制，官方给出的域名是 `*.lovable.app/*`、`*.lovable.dev/*`、`*.lovableproject.com/*` 与生产域名 [@ref-lovable-intsec-domains]。

**诊断**，按"配置可读 → 模型可选 → 请求已发出 → 后端可用"分层 [@ref-lovable-createconn-how][@ref-lovable-createconn-auth][@ref-lovable-appuser-how][@ref-lovable-createconn-managing]：

| 层次 | 可观察手段 |
| :-- | :-- |
| 定义可读 | 非 OAuth 认证方式下，表单里的 **What requests to this API will look like** 实时预览最终请求；创建后连接器出现在工作区目录与 admin 的 **Custom connectors** 段 |
| 凭据可用 | 用户连接时 Lovable 调用 **Test request** 校验凭据；OAuth 连接器靠 provider 授权页 |
| 请求已发出 | 每个项目有两个密钥：`LOVABLE_API_KEY` 标识项目与工作区，另一个是不透明 connection key，代表连接的密钥去访问 gateway |
| 后端可用 | 用一句依赖该 API 的提示让 Lovable 实际调用；失败时按 Connectors 页给出的原因排查（admin 关闭、权限不足、共享范围） |
| 改配置的限制 | 不能在 OAuth 2.0 与凭据式认证之间切换；已有 credential field key 锁定；可在单凭据方式之间切换或升到 Advanced [@ref-lovable-createconn-managing] |

**Lovable API 侧**的诊断另有其表：key 在创建时只显示一次，丢失只能重建；作用域与有效期创建后不可改（要换就新建再吊销），吊销不可逆；过期表现是请求开始失败 [@ref-lovable-apikeys-faq]。

**缺口**：来源没有给出 provider 侧错误码到 Lovable 错误的映射表，也没有给出重试次数/退避策略；`features/ai.md` 只提到可取消请求与用量监控。已检查 `features/ai.md`、`integrations/app-user-connectors.md`、`integrations/security.md`、`integrations/create-connector.md`、`features/api-keys.md`。
