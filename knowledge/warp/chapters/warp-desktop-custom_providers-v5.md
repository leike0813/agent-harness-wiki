---
schema_version: 3
record_kind: production
edition_id: warp-desktop-custom_providers-v5
harness_id: warp
topic: custom_providers
title: "Warp 桌面端的自定义 Provider：BYOK、OpenAI 兼容端点与自定义路由"
sections:
  - section_id: providers-entry
    surface_ids: [desktop]
    source_refs: [ref-warp-byok-routes-20261012, ref-warp-byok-routes-subscription-20261012, ref-warp-endpoint-routes-20261012, ref-warp-byok-enable, ref-warp-endpoint-enable, ref-warp-routers-create, ref-warp-routers-file, ref-warp-endpoint-managed-20261012, ref-warp-byok-team-managed-20261012, ref-warp-byok-local-scope-20261012, ref-warp-byok-platform-charges-20261012, ref-warp-byok-claude-subscription-20261012, ref-warp-allsettings-cloud, ref-warp-allsettings-keys]
  - section_id: providers-auth
    surface_ids: [desktop]
    source_refs: [ref-warp-byok-local-scope-20261012, ref-warp-endpoint-transit-20261012, ref-warp-endpoint-network, ref-warp-byok-enable, ref-warp-byok-team-managed-20261012, ref-warp-routers-team-keys-20261012]
  - section_id: providers-protocol
    surface_ids: [desktop]
    source_refs: [ref-warp-endpoint-transit-20261012, ref-warp-byok-local-scope-20261012, ref-warp-endpoint-enable, ref-warp-endpoint-features, ref-warp-endpoint-billing-20261012, ref-warp-byok-billing-20261012, ref-warp-byok-inference-usage-20261012]
  - section_id: providers-models
    surface_ids: [desktop]
    source_refs: [ref-warp-models-available-20261004, ref-warp-models-change, ref-warp-models-profile-20261004, ref-warp-routers-how, ref-warp-routers-types, ref-warp-routers-file, ref-warp-routers-usage-20261012, ref-warp-routers-team-keys-20261012, ref-warp-models-fallback, ref-warp-models-scope-20261006, ref-warp-models-openai-20261006, ref-warp-models-openai-chatgpt-20261006, ref-warp-models-openai-codex-20261004, ref-warp-models-anthropic-20261006, ref-warp-models-anthropic-thinking-20261006, ref-warp-models-google-20261006, ref-warp-models-fireworks-20261006, ref-warp-models-fireworks-20261004, ref-warp-models-xai-20261006, ref-warp-models-haiku-20261008, ref-warp-models-anthropic-default-wording-20261008, ref-warp-models-auto-20261012, ref-warp-models-xai-wording-20261012]
  - section_id: providers-privacy
    surface_ids: [desktop]
    source_refs: [ref-warp-models-zdr-20261004, ref-warp-models-fable-20261004, ref-warp-byok-local-scope-20261012]
  - section_id: providers-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-allsettings-cloud, ref-warp-endpoint-enable, ref-warp-byok-enable, ref-warp-byok-fallback-20261012, ref-warp-endpoint-network, ref-warp-routers-usage-20261012, ref-warp-allsettings-agents, ref-warp-endpoint-features, ref-warp-models-fireworks-20261006, ref-warp-models-fireworks-20261004, ref-warp-models-openai-chatgpt-20261006, ref-warp-models-zdr-20261004, ref-warp-models-fable-20261004]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [desktop]
        section_id: providers-entry
        status: answered
        source_refs: [ref-warp-byok-routes-20261012, ref-warp-byok-routes-subscription-20261012, ref-warp-endpoint-routes-20261012, ref-warp-endpoint-enable, ref-warp-endpoint-managed-20261012, ref-warp-byok-team-managed-20261012, ref-warp-byok-local-scope-20261012, ref-warp-allsettings-cloud, ref-warp-allsettings-keys]
  - question_id: providers.auth
    answers:
      - surface_ids: [desktop]
        section_id: providers-auth
        status: partial
        source_refs: [ref-warp-byok-local-scope-20261012, ref-warp-endpoint-transit-20261012, ref-warp-endpoint-network, ref-warp-byok-team-managed-20261012, ref-warp-routers-team-keys-20261012]
  - question_id: providers.protocol
    answers:
      - surface_ids: [desktop]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-warp-endpoint-transit-20261012, ref-warp-byok-local-scope-20261012, ref-warp-endpoint-billing-20261012, ref-warp-byok-billing-20261012, ref-warp-byok-inference-usage-20261012]
  - question_id: providers.models
    answers:
      - surface_ids: [desktop]
        section_id: providers-models
        status: answered
        source_refs: [ref-warp-models-scope-20261006, ref-warp-models-openai-20261006, ref-warp-models-anthropic-20261006, ref-warp-models-haiku-20261008, ref-warp-models-anthropic-default-wording-20261008, ref-warp-models-google-20261006, ref-warp-models-fireworks-20261006, ref-warp-models-change, ref-warp-routers-file, ref-warp-models-profile-20261004, ref-warp-routers-usage-20261012, ref-warp-routers-team-keys-20261012, ref-warp-models-auto-20261012, ref-warp-models-xai-wording-20261012]
  - question_id: providers.metadata
    answers:
      - surface_ids: [desktop]
        section_id: providers-models
        status: partial
        source_refs: [ref-warp-models-available-20261004, ref-warp-routers-types, ref-warp-models-openai-20261006, ref-warp-models-anthropic-20261006, ref-warp-models-anthropic-thinking-20261006, ref-warp-models-haiku-20261008, ref-warp-models-anthropic-default-wording-20261008, ref-warp-models-auto-20261012]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [desktop]
        section_id: providers-protocol
        status: partial
        source_refs: [ref-warp-endpoint-enable, ref-warp-endpoint-features]
  - question_id: providers.responses
    answers:
      - surface_ids: [desktop]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-warp-endpoint-transit-20261012, ref-warp-byok-local-scope-20261012]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-warp-byok-fallback-20261012, ref-warp-byok-enable, ref-warp-endpoint-network, ref-warp-routers-usage-20261012, ref-warp-models-fireworks-20261006]
---

## Provider 与推断（inference）入口 {#providers-entry}

固定来源是 Warp 官方文档站的 Markdown 快照（BYOK、custom inference endpoint、custom routers、model choice、all settings 等页）。BYOK、custom inference endpoint、custom routers 与 model choice 四页的最新固定快照是 2026-10-12 观察到的 `0c54da58cad7`、`4dc8f334566c`、`dd8c9d2e53ac` 与 `3d98a6b4f0a9`；模型清单里的 Claude Haiku 5.5 行与默认 ID 措辞来自更早的 2026-10-08 快照 `e4af09cf3df4`。Warp 是闭源产品，本章为 source-level 知识，`version_applicability` 为 unknown。

Warp 桌面端有六条"自带模型基础设施"的路线，文档明确用一张表区分它们 [@ref-warp-byok-routes-20261012][@ref-warp-byok-routes-subscription-20261012][@ref-warp-endpoint-routes-20261012]：

| 名称 | 含义 | 计划 |
| :-- | :-- | :-- |
| Personal BYOK | 用你自己的 OpenAI / Anthropic / Google API key 跑**本地 Warp Agent**，key 存本机 | Free 与符合条件的所有付费计划 |
| Personal custom inference endpoint | 把**本地 Warp Agent** 接到任何 OpenAI 兼容端点（OpenRouter、LiteLLM、z.ai、内部网关） | Free 与符合条件的所有付费计划 |
| Team-managed API keys and endpoints | 管理员下发共享 provider key 或端点，覆盖**本地与 cloud 运行** | Business 与 Enterprise |
| Bring Your Own LLM（BYOLLM） | 经组织自己的 AWS Bedrock 或 Gemini Enterprise（Vertex AI）账号路由推断 | 仅 Enterprise |
| SuperGrok 订阅 | 用 xAI 账号的 SuperGrok 订阅跑 Grok 模型，token 存本机 | Free 与符合条件的所有付费计划 |
| ChatGPT 订阅 | 用自己的 ChatGPT plan 在 Warp app 的 Warp Agent 里用符合资格的 OpenAI 模型 | 以 Warp pricing 为准 |

这张表最关键的一列是**作用域**：前两条被上游明确改名为 personal 并限定为 local Warp Agent runs，第三条 Team-managed 是新出现的独立一行，作用域是 local **与** cloud、计划是 Business 与 Enterprise [@ref-warp-byok-local-scope-20261012][@ref-warp-endpoint-managed-20261012]。BYOK 页把这条边界写在 Caution 里：personal key 不适用于 cloud runs；想要本地与云端都能用的共享 key 要走 team-managed [@ref-warp-byok-local-scope-20261012]。custom endpoint 页给出同样的边界，并补一句 cloud 推断下"applicable compute 与 platform charges 仍然存在" [@ref-warp-endpoint-transit-20261012]。计费侧的完整口径是：cloud 运行按可计费的 agent 时间收 platform charges，Business 与 Enterprise 上使用客户自带推断的本地运行也收 platform charges（费用速率与合约条款见 platform usage 页）[@ref-warp-byok-platform-charges-20261012]。

后两条是**订阅**而非 key：订阅路线与 API key 是分别计费的，且可连接的订阅类型是有限定的——SuperGrok（跑 Grok 模型）与 ChatGPT（跑符合资格的 OpenAI 模型）可以像 BYOK 一样接进来，**Claude（Anthropic）消费订阅不能**，要用自己的 Anthropic 账号只能加 API key（Anthropic 的 API 用量与订阅分别计费）[@ref-warp-byok-claude-subscription-20261012]。

具体入口：

- **BYOK**：打开 Settings 搜索 `API keys` 跳到配置，为 Anthropic / OpenAI / Google 添加 key；添加后模型选择器里受支持模型旁会出现钥匙图标 [@ref-warp-byok-enable]。
- **Custom inference endpoint**：Settings 搜索 `inference endpoint`，填端点 URL（暴露 `/v1/chat/completions` 的 base URL）、凭据和要路由的模型标识；保存后自定义模型出现在模型选择器里 [@ref-warp-endpoint-enable]。
- **Custom routers**（模型路由，属于"选哪个模型"的配置）：Settings > Agents > Warp Agent 的 **Custom Routers** 区点 **Add router**，或直接写 YAML 文件 [@ref-warp-routers-create][@ref-warp-routers-file]。
- **企业集中管理**：personal key / personal endpoint 配在**每个成员自己的设备**上，只服务本地 Warp Agent 运行（app 与 CLI），不服务 cloud agent [@ref-warp-byok-team-managed-20261012][@ref-warp-endpoint-managed-20261012]。要在本地与 cloud 两侧都生效，必须由 **Business 与 Enterprise 的管理员**在 Admin Panel 配置 team-managed API keys 与 endpoints；这些共享 key 由 Warp 安全保存，供本地与 cloud 推断使用 [@ref-warp-byok-local-scope-20261012][@ref-warp-byok-team-managed-20261012]。team-managed endpoint 与团队 router 由管理员在 Admin Panel 创建 [@ref-warp-routers-create]。

配置文件对象：`[agents] custom_endpoints` 保存非密的端点定义（URL、模型、schema），**凭据不进这个对象**，而存在本机安全存储里；文档要求通过 Settings UI 管理 [@ref-warp-allsettings-cloud]。Bedrock / Gemini 相关的开关在 `[cloud_platform.third_party_api_keys]`：`aws_bedrock_credentials_enabled`（用本地 AWS 凭据）、`aws_bedrock_profile`（默认 `"default"`）、`aws_bedrock_auto_login`、`aws_bedrock_auth_refresh_command`（默认 `"aws login"`）、`gemini_enterprise_credentials_enabled`、`can_use_warp_credits_with_byok` [@ref-warp-allsettings-keys]。

## 凭据与 base URL {#providers-auth}

- **BYOK key**：存放在设备的安全存储里；选中带钥匙图标的 provider 模型时，你的 prompt、上下文与 key 会经过 Warp 的服务器发往该 provider，而 **Warp 不保留你的 personal API key** [@ref-warp-byok-local-scope-20261012]。注意措辞：文档说的是 key 不被**保留**，而不是"从不上传"——它确实随每次请求经过 Warp 服务器。
- **自定义端点 URL 与 key**：personal endpoint 配置存在本机、key 在安全存储里；选中端点模型时 prompt、上下文、端点 URL 与 key 同样经过 Warp 服务器，Warp 不保留 personal endpoint 的 API key [@ref-warp-endpoint-transit-20261012]。
- **端点可达性**：请求要经 Warp 的服务器发出，因此端点必须能在**公网**上被访问，`localhost`、`127.0.0.1` 及其他私有/本地地址会被拒绝；内网 LiteLLM 代理或本机 Ollama/LM Studio/vLLM/llama.cpp 必须先经隧道暴露为公网 HTTPS URL（文档示例：`ngrok http 11434` 后用 `https://*.ngrok-free.app/v1`）[@ref-warp-endpoint-network]。
- **Team-managed 凭据**：与上面两条相反，Business 与 Enterprise 管理员配置的共享 key / endpoint 由 **Warp 安全保存**，作用域是本地与 cloud 推断 [@ref-warp-byok-local-scope-20261012][@ref-warp-byok-team-managed-20261012]。custom router 上，成员自己对某个 provider 配的 key **优先于**团队 key [@ref-warp-routers-team-keys-20261012]。
- **SuperGrok 订阅**：来源只确认 token 存在本机设备上、订阅经 xAI 账号连接 [@ref-warp-byok-subscription-routes-20261006]。

写示例时凭据只用占位符（例如 `YOUR_ANTHROPIC_API_KEY`、`YOUR_ENDPOINT_API_KEY`），不把真实 key 写进任何文件 [@ref-warp-byok-enable]。

订阅类路线的授权细节本轮**无法确认**：SuperGrok 与 ChatGPT 订阅都指向各自独立的文档页（`https://docs.warp.dev/agents/inference/grok-subscription/`、`https://docs.warp.dev/agents/inference/chatgpt-subscription/`），这两页没有登记为本产品的固定来源，本轮归档集合里也没有它们的原件。BYOK 页此前给出的 SuperGrok 连接步骤（Settings > Agents > Warp Agent 里选连接、浏览器完成授权）已被上游删除，因此不能再引用；ChatGPT 订阅的凭据存放位置、授权步骤与刷新方式在已登记来源中均无记载。`providers.auth` 因此记 **partial**：key 与端点凭据这两半是完整的，订阅类路线的凭据取得方式属于缺口。

## 协议、请求处理与响应 {#providers-protocol}

**自定义端点**的协议约定是：端点必须实现 **OpenAI Chat Completions API**（`POST /v1/chat/completions`）；文档点名 OpenRouter、LiteLLM、z.ai 以及暴露在公网上的内部网关作为兼容面 [@ref-warp-endpoint-transit-20261012]。

请求链路在两页上都是同一句：personal 配置存在本机、key 在安全存储里；选中带钥匙图标或端点的模型后，你的 prompt、上下文以及凭据（端点还包括 URL）**经过 Warp 的服务器**到达你的 provider 或端点，Warp 不保留 personal key [@ref-warp-byok-local-scope-20261012][@ref-warp-endpoint-transit-20261012]。端点页把这条要求写成硬约束："your prompt, context, endpoint URL, and key pass through Warp's servers"，这正是端点必须公网可达的原因 [@ref-warp-endpoint-network]。

上一版本章曾写"**Warp Agent harness 在 Warp 后端运行并组装完整请求**（system instructions、会话上下文、tools）"。该三步描述已被上游从 BYOK 页与 custom endpoint 页**整段删除**，当前固定来源里已无任何页面给出它（只有更早的归档快照里有），因此这一层实现细节现在记为**缺口**，不再作为结论；能保留的只有"prompt 与上下文会离开本机、经过 Warp 服务器"这一层。

**可写参数范围**：文档只给出端点 URL、模型标识与凭据三项配置 [@ref-warp-endpoint-enable]；没有列出可透传的采样参数、额外 header 或请求体改写机制，因此"配置字段到请求的映射"除上述三项外无法断言，按缺口记录 [@ref-warp-endpoint-features]。

**响应与计费**（当前口径 [@ref-warp-endpoint-billing-20261012][@ref-warp-byok-billing-20261012][@ref-warp-byok-inference-usage-20261012][@ref-warp-byok-platform-charges-20261012]）：

- 端点路由的推断由**端点提供方按其定价直接计费**，不从 Warp 的 usage 余额里扣；选带钥匙图标的 provider 模型同理，推理经你的 provider 账号计费。
- **平台费用仍然存在**：Business 与 Enterprise 上跑本地端点路由的运行仍会产生 platform charges，且"外部推理账单并不完整反映在 Warp 的用量统计里"；BYOK 页给出同一边界——cloud 运行按可计费的 agent 时间收 platform charges，Business 与 Enterprise 上使用客户自带推断的本地运行也收 platform charges。
- **Auto 模型用 Warp 提供的推断**，即使已配置自己的 key 或端点也会消耗可用的 Warp 用量；要用自己的 key / 端点，必须在模型选择器里直接选具体的 provider 模型或端点路由模型。
- custom router **不能**选中自定义端点上的模型（路由目标必须是 Warp 支持的模型），但 router 解析出模型之后会照常套用你的 BYOK provider key。

## 模型 ID、别名与能力元数据 {#providers-models}

Warp 维护一份精选模型清单，每个模型有 `model_id`；文档说明这些值可用于 Automation Platform 或 CLI 的模型配置 [@ref-warp-models-scope-20261006]。清单按供应商分组：

- **OpenAI**：GPT-6 Astra、GPT-6.1 Sol、GPT-6 Sol、GPT-6 Luna、GPT-5.6 Sol/Terra/Luna、GPT-5.5、GPT-5.4。文档把 `low`、`medium`、`high`、`xhigh`、`max` 列为递增推理档位的后缀词表 [@ref-warp-models-openai-20261006]，但各家族并不都覆盖到 `max`：只有 GPT-6 Astra、GPT-6.1 Sol、GPT-6 Sol、GPT-6 Luna 带 `-max` 取值，GPT-5.6 三个变体、GPT-5.5 与 GPT-5.4 各行止于 `-xhigh` [@ref-warp-models-openai-chatgpt-20261006]。表格现在止于 GPT-5.4，GPT-5.3 Codex 已不在表内 [@ref-warp-models-openai-chatgpt-20261006]，而 2026-10-04 的快照里它还有 low、medium、high、xhigh 四个取值 [@ref-warp-models-openai-codex-20261004]。
- **Anthropic**：后缀表示 effort 档位，`xhigh-fast` 表示快速模式、`thinking` 表示思考模式，文档的措辞是"每个家族**在存在时**单独列出默认 `model_id`" [@ref-warp-models-anthropic-default-wording-20261008]。`xhigh-fast` 挂在 claude-5-5-opus、claude-5-opus 与 claude-4-8-opus 上；`-thinking` 仍是 claude-4-5-opus 与 claude-4-5-sonnet 的第二种取值 [@ref-warp-models-anthropic-thinking-20261006]。清单新增 **Claude Haiku 5.5** 一行，取值为 `claude-5-5-haiku-low`、`-medium`、`-high`、`-xhigh`、`-max` 五个 effort 专属 ID，而默认 `model_id` 列是 `—`：文档明确说明该系列**没有固定默认 `model_id`，必须从这些 effort 专属 ID 中选一个** [@ref-warp-models-haiku-20261008]。这与 Haiku 4.5（单值 `claude-4-5-haiku`，默认值相同）不同 [@ref-warp-models-haiku-20261008]。
- **Google**：`gemini-3.1-pro` 与 `gemini-3.8-flash`、`gemini-3.7-flash`、`gemini-3.6-flash`、`gemini-3.5-flash` [@ref-warp-models-google-20261006]。
- **xAI**：仍保留 `model_id` 与 reasoning level 两列，`grok-4-7-*` 等按 low/medium/high/xhigh 分档 [@ref-warp-models-xai-20261006]。
- **Fireworks AI 托管的开放权重模型**：`glm-5.3-fireworks`、`glm-5.3-flash-fireworks`、`kimi-k3-fireworks`、`minimax-3-fireworks`、`qwen-3.8-max-fireworks`、`deepseek-v4.1-flash-fireworks` [@ref-warp-models-fireworks-20261006]。

这份清单本身是**滚动变化**的：GLM 5.2、Kimi K2.7 Code、Kimi K2.6 与 DeepSeek V4 Pro 已不在当前表内 [@ref-warp-models-fireworks-20261006]，而 2026-10-04 的快照里这四个都还在 [@ref-warp-models-fireworks-20261004]；GLM 5.3 与 DeepSeek V4.1 Flash 方向相反，只出现在当前表里，上一轮的 Fireworks 表中没有 [@ref-warp-models-fireworks-20261006][@ref-warp-models-fireworks-20261004]。新增或下线的 `model_id` 不构成版本映射依据，判断某个具体 `model_id` 当时是否可用要重新核对当前页面。OpenAI 家族还有一个与凭据相关的条件：要用自己的 ChatGPT plan 跑符合资格的 OpenAI 模型，需要先连接 ChatGPT 订阅并在模型选择器里选定具体模型 [@ref-warp-models-openai-chatgpt-20261006]。xAI 一侧则把 SuperGrok 的说法改成"不用 Warp 提供的推断费用即可跑符合条件的 Grok 模型"，并提示设置步骤与其它适用费用另见订阅页 [@ref-warp-models-xai-wording-20261012]。

模型选择在 prompt 输入框的模型选择器里完成，选择会持久作用于后续 prompt [@ref-warp-models-change]。每个 Agent Profile 也能单独配置 base model，位置在 **Settings > Agents > Profiles**，与该 profile 的自主级别、工具权限并列；同一个 base model 也用于 Planning [@ref-warp-models-profile-20261004]。**能力元数据**在文档中以"推理档位（reasoning level / effort）"的形式编码进 `model_id` 后缀：OpenAI 侧的后缀词表是 `low`…`max`，但清单里只有 GPT-6 系列带 `-max` 取值 [@ref-warp-models-openai-20261006][@ref-warp-models-openai-chatgpt-20261006]，Anthropic 侧另有两个具名变体 `-xhigh-fast`（快速模式）与 `-thinking`（思考模式），并且默认 ID **不是每族都有**——Claude Haiku 5.5 那一行的默认列是空的，文档要求自行指定一个 effort 专属 ID [@ref-warp-models-anthropic-20261006][@ref-warp-models-anthropic-thinking-20261006][@ref-warp-models-haiku-20261008][@ref-warp-models-anthropic-default-wording-20261008]。四个 Auto 模型按定位区分：`auto` 选质量最高最快的（文档的措辞是"可以比省成本的选项更贵"），`auto-efficient` 为降低**推断成本**而优化并保持输出质量，`auto-genius` 按任务复杂度自适应（文档点名的适用场景是深度调试、架构决策与 `/plan` 会话），`auto-open` 在开放权重模型间路由 [@ref-warp-models-auto-20261012][@ref-warp-models-available-20261004]。上游这一轮把 Auto 两行的描述从"消耗多少 credits"改写成了"花多少推断成本"，可读出的机制差别是：Auto 的成本口径不再写成 credits，而是 Warp 提供的推断用量。上下文窗口、输出上限、视觉/工具能力的结构化元数据字段没有在固定来源中出现，按缺口处理 [@ref-warp-models-available-20261004]。

Custom router 是在模型选择器里额外出现的一类"模型"，选择后**每次发送 prompt 解析出一个具体模型**并整段会话沿用（极短的琐碎 prompt 不锁定选择）[@ref-warp-routers-how]。两种路由类型：`complexity` 按任务难度分 easy/medium/hard 映射模型并有必填 `default`；`prompt` 按你写的自然语言分类规则自上而下匹配，第一条命中者胜出，无命中则用必填 `default` [@ref-warp-routers-types]。文件形式存放于 `~/.warp/custom_model_routers/`，一个文件一个 router，Warp 自动加载并在增删改时自动重载（无需重启）；解析失败会显示指明文件名的非阻塞错误并跳过该文件 [@ref-warp-routers-file]。路由目标必须是具体的、Warp 支持的模型，**不能**是 Auto 模型、另一个 router 或自定义端点上的模型 [@ref-warp-routers-file]。

**Usage and model availability**（该小节上游已从 `Credits and model availability` 改名）：router 的推断用量跟随它选中的模型；router 解析出模型后 Warp 照常套用你的 API key——命中 key 的由你的 provider 计费，没有匹配 key 的走 Warp 提供的推断，**platform charges 仍适用于符合条件的运行**；要让 router 完全跑在自己的 key 上，必须给 router 引用的每个模型都配 key [@ref-warp-routers-usage-20261012]。新增的一条是 team-managed key：Business 与 Enterprise 的团队 key 对 custom router 的作用方式相同，且**成员自己对某 provider 的 key 优先于团队 key** [@ref-warp-routers-team-keys-20261012]。Auto 模型即使配置了 BYOK 也仍用 Warp 提供的推断 [@ref-warp-routers-team-keys-20261012]。

模型可用性回退：目标模型无权限或被组织禁用时回退到 router 的 default；若没有可用模型则回退到内置默认并告知用户；内置模型本身也有 fallback 链，原模型恢复后自动切回 [@ref-warp-models-fallback]。

## 数据保留与模型可用性的条件边界 {#providers-privacy}

Warp 与 OpenAI、Anthropic、Google、xAI、Fireworks AI 等 provider 签有 **Zero Data Retention（ZDR）** 协议，范围是"默认在所有计划下"：provider 承诺不拿经 Warp 处理的用户数据训练模型，并在生成输出后的固定时限内删除输入与输出 [@ref-warp-models-zdr-20261004]。但 ZDR 只覆盖**受支持的模型**；当 provider 因安全、滥用监控或合规原因要求保留数据时，模型可用性会变 [@ref-warp-models-zdr-20261004]。

已记录的一条例外是 **Claude Fable 5 与 Claude Fable 5.1**：Anthropic 要求为其保留数据，因此这两个模型**在 ZDR 下不可用**；该限制只针对 Fable 系列，不改变其他任何受支持模型的 ZDR 行为。对 Enterprise 团队，这两个模型默认关闭，需工作区管理员显式启用 [@ref-warp-models-fable-20261004]。

这一节的边界要说清：ZDR 协议是 Warp 与其 provider 之间的约定，**不覆盖** BYOK 请求——BYOK 的 prompt 与响应同样经过 Warp 后端，但 provider 侧的保留策略取决于你自己的账号设置，Warp 无法为经自有 API key 发出的请求强制 ZDR [@ref-warp-byok-local-scope-20261012]。也就是说，"用了 Warp 托管的模型"与"用了自己的 key"在数据保留上不是同一档保证。

## 诊断 {#providers-diagnostics}

- **配置是否可读**：`[agents] custom_endpoints` 的键存在性可确认端点定义已写入，但文档强调经 UI 管理、凭据不在其中 [@ref-warp-allsettings-cloud]。
- **模型是否可选**：端点配好后"自定义模型会出现在模型选择器里"，BYOK 配好后受支持模型旁出现钥匙图标——这两个界面信号是分界点 [@ref-warp-endpoint-enable][@ref-warp-byok-enable]。
- **请求是否已发送 / 后端是否可用**：key 无效时 Warp 会给出与 AI 请求对应的明确错误并中止请求；命中用量或速率限制时**不会**改用 Warp 提供的推断重试，除非打开了 fallback [@ref-warp-byok-fallback-20261012]。**Warp credit fallback** 默认关闭，打开后失败的 BYOK 请求会用 Warp 提供的推断重试，这类回退请求消耗可用的 Warp 用量 [@ref-warp-byok-fallback-20261012]。
- **端点是否可达**：配置自定义端点时若填 `localhost`/私网地址会被拒绝，这是可直接观察的边界检查 [@ref-warp-endpoint-network]。
- **router 回退可见性**：router 始终选定一个具体模型、"你可以看到实际跑的是哪个模型"；目标不可用时回退并提示 [@ref-warp-routers-usage-20261012]。
- **模型在列表里却选不到**：先按 provider 分组核对 `model_id` 是否仍出现在当前清单——模型下线是常规原因，GLM 5.2、Kimi K2.7 Code、Kimi K2.6、DeepSeek V4 Pro 都已从 Fireworks 表中消失 [@ref-warp-models-fireworks-20261006][@ref-warp-models-fireworks-20261004]；再排除条件性禁用：Fable 系列在 ZDR 工作区不可用、Enterprise 下还需管理员启用 [@ref-warp-models-zdr-20261004][@ref-warp-models-fable-20261004]，OpenAI 侧还要看是否已连接 ChatGPT plan 才能用符合资格的 OpenAI 模型 [@ref-warp-models-openai-chatgpt-20261006]。
- **订阅路线是否可用**：SuperGrok 与 ChatGPT 订阅各自有计划条件，ChatGPT 订阅一行明确指向 Warp pricing 作为可用性口径 [@ref-warp-byok-subscription-routes-20261006]。
- **计费核对**：`[agents] usage_display_mode` 可在 credits / cost 之间切换显示，便于分辨是自己的 provider 计费还是 Warp credits [@ref-warp-allsettings-agents]。

未能验证：BYOK/端点的请求重试次数与超时、流式中断后的续传行为，以及端点侧的 tools 调用约定，固定来源均未描述 [@ref-warp-endpoint-features]。
