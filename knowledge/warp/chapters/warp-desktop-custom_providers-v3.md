---
schema_version: 3
record_kind: production
edition_id: warp-desktop-custom_providers-v3
harness_id: warp
topic: custom_providers
title: "Warp 桌面端的自定义 Provider：BYOK、OpenAI 兼容端点与自定义路由"
sections:
  - section_id: providers-entry
    surface_ids: [desktop]
    source_refs: [ref-warp-byok-routes-key-endpoint-20261006, ref-warp-byok-routes-byollm-20261006, ref-warp-byok-subscription-routes-20261006, ref-warp-byok-enable, ref-warp-endpoint-enable, ref-warp-routers-create, ref-warp-routers-file, ref-warp-endpoint-managed, ref-warp-allsettings-cloud, ref-warp-allsettings-keys, ref-warp-byok-subscription-faq-20261006, ref-warp-byok-team-managed-20261006]
  - section_id: providers-auth
    surface_ids: [desktop]
    source_refs: [ref-warp-byok-how, ref-warp-endpoint-how, ref-warp-endpoint-network, ref-warp-byok-enable, ref-warp-byok-subscription-routes-20261006]
  - section_id: providers-protocol
    surface_ids: [desktop]
    source_refs: [ref-warp-endpoint-how, ref-warp-byok-how, ref-warp-endpoint-enable, ref-warp-endpoint-features, ref-warp-endpoint-billing]
  - section_id: providers-models
    surface_ids: [desktop]
    source_refs: [ref-warp-models-available-20261004, ref-warp-models-change, ref-warp-models-profile-20261004, ref-warp-routers-how, ref-warp-routers-types, ref-warp-routers-file, ref-warp-routers-credits, ref-warp-models-fallback, ref-warp-models-scope-20261006, ref-warp-models-openai-20261006, ref-warp-models-openai-chatgpt-20261006, ref-warp-models-openai-codex-20261004, ref-warp-models-anthropic-20261006, ref-warp-models-anthropic-thinking-20261006, ref-warp-models-google-20261006, ref-warp-models-fireworks-20261006, ref-warp-models-fireworks-20261004, ref-warp-models-xai-20261006]
  - section_id: providers-privacy
    surface_ids: [desktop]
    source_refs: [ref-warp-models-zdr-20261004, ref-warp-models-fable-20261004, ref-warp-byok-how]
  - section_id: providers-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-allsettings-cloud, ref-warp-endpoint-enable, ref-warp-byok-enable, ref-warp-byok-failover, ref-warp-endpoint-network, ref-warp-routers-credits, ref-warp-allsettings-agents, ref-warp-endpoint-features, ref-warp-models-fireworks-20261006, ref-warp-models-fireworks-20261004, ref-warp-models-openai-chatgpt-20261006, ref-warp-models-zdr-20261004, ref-warp-models-fable-20261004, ref-warp-byok-subscription-routes-20261006]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [desktop]
        section_id: providers-entry
        status: answered
        source_refs: [ref-warp-byok-routes-key-endpoint-20261006, ref-warp-byok-routes-byollm-20261006, ref-warp-byok-subscription-routes-20261006, ref-warp-endpoint-enable, ref-warp-allsettings-cloud, ref-warp-allsettings-keys, ref-warp-byok-team-managed-20261006]
  - question_id: providers.auth
    answers:
      - surface_ids: [desktop]
        section_id: providers-auth
        status: partial
        source_refs: [ref-warp-byok-how, ref-warp-endpoint-how, ref-warp-endpoint-network, ref-warp-byok-subscription-routes-20261006]
  - question_id: providers.protocol
    answers:
      - surface_ids: [desktop]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-warp-endpoint-how, ref-warp-byok-how, ref-warp-endpoint-billing]
  - question_id: providers.models
    answers:
      - surface_ids: [desktop]
        section_id: providers-models
        status: answered
        source_refs: [ref-warp-models-scope-20261006, ref-warp-models-openai-20261006, ref-warp-models-anthropic-20261006, ref-warp-models-google-20261006, ref-warp-models-fireworks-20261006, ref-warp-models-change, ref-warp-routers-file, ref-warp-models-profile-20261004]
  - question_id: providers.metadata
    answers:
      - surface_ids: [desktop]
        section_id: providers-models
        status: partial
        source_refs: [ref-warp-models-available-20261004, ref-warp-routers-types, ref-warp-models-openai-20261006, ref-warp-models-anthropic-20261006, ref-warp-models-anthropic-thinking-20261006]
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
        source_refs: [ref-warp-endpoint-how, ref-warp-byok-how]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-warp-byok-failover, ref-warp-byok-enable, ref-warp-endpoint-network, ref-warp-routers-credits, ref-warp-models-fireworks-20261006, ref-warp-byok-subscription-routes-20261006]
---

## Provider 与推断（inference）入口 {#providers-entry}

固定来源是 Warp 官方文档站的 Markdown 快照（BYOK、custom inference endpoint、custom routers、model choice、all settings 等页）。Warp 是闭源产品，本章为 source-level 知识，`version_applicability` 为 unknown。

Warp 桌面端有五条"自带模型基础设施"的路线，文档明确用一张表区分它们 [@ref-warp-byok-routes-key-endpoint-20261006][@ref-warp-byok-routes-byollm-20261006][@ref-warp-byok-subscription-routes-20261006]：

| 名称 | 含义 | 计划 |
| :-- | :-- | :-- |
| Bring Your Own API Key（BYOK） | 用你自己的 OpenAI / Anthropic / Google API key | Free 与符合条件的所有付费计划 |
| Custom inference endpoint | 接入任何 OpenAI 兼容端点（OpenRouter、LiteLLM、z.ai、内部网关） | Free 与符合条件的所有付费计划 |
| Bring Your Own LLM（BYOLLM） | 企业经云厂商（AWS Bedrock、Gemini Enterprise/Vertex AI；Azure Foundry 即将支持）管理的推断 | 仅 Enterprise |
| SuperGrok 订阅 | 用 xAI 账号的 SuperGrok 订阅跑 Grok 模型，token 存本机 | Free 与符合条件的所有付费计划 |
| ChatGPT 订阅 | 用自己的 ChatGPT plan 在 Warp Agent 里用符合资格的 OpenAI 模型 | 以 Warp pricing 为准 [@ref-warp-byok-subscription-routes-20261006] |

后两条是**订阅**而非 key：订阅路线与 API key 是分别计费的，且可连接的订阅类型是有限定的——SuperGrok（跑 Grok 模型）与 ChatGPT（跑符合资格的 OpenAI 模型）可以像 BYOK 一样接进来，**Claude（Anthropic）消费订阅不能**，要用自己的 Anthropic 账号只能加 API key [@ref-warp-byok-subscription-faq-20261006]。

具体入口：

- **BYOK**：打开 Settings 搜索 `API keys` 跳到配置，为 Anthropic / OpenAI / Google 添加 key；添加后模型选择器里受支持模型旁会出现钥匙图标 [@ref-warp-byok-enable]。
- **Custom inference endpoint**：Settings 搜索 `inference endpoint`，填端点 URL（暴露 `/v1/chat/completions` 的 base URL）、凭据和要路由的模型标识；保存后自定义模型出现在模型选择器里 [@ref-warp-endpoint-enable]。
- **Custom routers**（模型路由，属于"选哪个模型"的配置）：Settings > Agents > Warp Agent 的 **Custom Routers** 区点 **Add router**，或直接写 YAML 文件 [@ref-warp-routers-create][@ref-warp-routers-file]。
- **企业集中管理**：Admin Panel 的 Models 页可下发 team-managed API keys / endpoints / routers；企业端配置同时适用于交互请求与 cloud agent，而用户级 BYOK 与自定义端点只作用于交互请求 [@ref-warp-endpoint-managed]。team-managed keys 的中心化配置面向 **Business 与 Enterprise 团队**，管理员在 Admin Panel 设置共享 key，同样对交互请求与 cloud agent 生效 [@ref-warp-byok-team-managed-20261006]。team-managed 端点与团队 router 由管理员在 `https://app.warp.dev/admin/` 创建 [@ref-warp-routers-create]。

配置文件对象：`[agents] custom_endpoints` 保存非密的端点定义（URL、模型、schema），**凭据不进这个对象**，而存在本机安全存储里；文档要求通过 Settings UI 管理 [@ref-warp-allsettings-cloud]。Bedrock / Gemini 相关的开关在 `[cloud_platform.third_party_api_keys]`：`aws_bedrock_credentials_enabled`（用本地 AWS 凭据）、`aws_bedrock_profile`（默认 `"default"`）、`aws_bedrock_auto_login`、`aws_bedrock_auth_refresh_command`（默认 `"aws login"`）、`gemini_enterprise_credentials_enabled`、`can_use_warp_credits_with_byok` [@ref-warp-allsettings-keys]。

## 凭据与 base URL {#providers-auth}

- **BYOK key**：存储"只在你的设备上"（操作系统钥匙串或等价的安全存储），从不上传到 Warp 服务器；请求时本地客户端把 key 取出并随 prompt 上行 [@ref-warp-byok-how]。
- **自定义端点 URL 与 key**：同样只存本机，key 每次请求随上行、用完即弃，Warp 服务器不保存 [@ref-warp-endpoint-how]。
- **端点可达性**：端点必须能在**公网**上被访问，`localhost`、`127.0.0.1` 及其他私有/本地地址会被拒绝；内网 LiteLLM 代理或本机 Ollama/LM Studio/vLLM/llama.cpp 必须先经隧道暴露为公网 HTTPS URL（文档示例：`ngrok http 11434` 后用 `https://*.ngrok-free.app/v1`）[@ref-warp-endpoint-network]。
- **SuperGrok 订阅**：来源只确认 token 存在本机设备上、订阅经 xAI 账号连接 [@ref-warp-byok-subscription-routes-20261006]。

写示例时凭据只用占位符（例如 `YOUR_ANTHROPIC_API_KEY`、`YOUR_ENDPOINT_API_KEY`），不把真实 key 写进任何文件 [@ref-warp-byok-enable]。

订阅类路线的授权细节本轮**无法确认**：SuperGrok 与 ChatGPT 订阅都指向各自独立的文档页（`https://docs.warp.dev/agents/inference/grok-subscription/`、`https://docs.warp.dev/agents/inference/chatgpt-subscription/`），这两页没有登记为本产品的固定来源，本轮归档集合里也没有它们的原件。BYOK 页此前给出的 SuperGrok 连接步骤（Settings > Agents > Warp Agent 里选连接、浏览器完成授权）已被上游删除，因此不能再引用；ChatGPT 订阅的凭据存放位置、授权步骤与刷新方式在已登记来源中均无记载。`providers.auth` 因此记 **partial**：key 与端点凭据这两半是完整的，订阅类路线的凭据取得方式属于缺口。

## 协议、请求处理与响应 {#providers-protocol}

**自定义端点**的协议约定是：端点实现 **OpenAI Chat Completions API**（`POST /v1/chat/completions`），任何暴露该兼容面的服务都可以作为目标 [@ref-warp-endpoint-how]。

请求链路（BYOK 与自定义端点共用一套 harness）[@ref-warp-byok-how][@ref-warp-endpoint-how]：

1. 本地 Warp 客户端从设备安全存储取出 API key（和端点 URL），随 prompt 一并送到 Warp 后端。
2. 在 Warp 后端运行的 **Warp Agent harness** 组装完整请求（system instructions、会话上下文、tools），在用你的 key 在途调用你的 provider / 端点。
3. provider 的响应经 Warp 后端流回本地客户端。

也就是说，无论 BYOK 还是自定义端点，harness 仍在服务端运行，替换的只是"上游目标 + 凭据" [@ref-warp-endpoint-how]。自定义端点的 key 与 URL 都不会进入 Warp 服务器持久存储 [@ref-warp-endpoint-how]。

**可写参数范围**：文档只给出端点 URL、模型标识与凭据三项配置 [@ref-warp-endpoint-enable]；没有列出可透传的采样参数、额外 header 或请求体改写机制，因此"配置字段到请求的映射"除上述三项外无法断言，按缺口记录 [@ref-warp-endpoint-features]。

**响应与计费**：走自己 key / 端点时推理不计 Warp AI credits，由 provider 或端点提供方直接计费；但 **Auto 模型始终消耗 Warp credits**（自动路由依赖 Warp 基础设施），自定义端点也不能被 custom router 选中，因为 router 目标必须是 Warp 支持的模型 [@ref-warp-endpoint-billing]。

## 模型 ID、别名与能力元数据 {#providers-models}

Warp 维护一份精选模型清单，每个模型有 `model_id`；文档说明这些值可用于 Automation Platform 或 CLI 的模型配置 [@ref-warp-models-scope-20261006]。清单按供应商分组：

- **OpenAI**：GPT-6 Astra、GPT-6.1 Sol、GPT-6 Sol、GPT-6 Luna、GPT-5.6 Sol/Terra/Luna、GPT-5.5、GPT-5.4。文档把 `low`、`medium`、`high`、`xhigh`、`max` 列为递增推理档位的后缀词表 [@ref-warp-models-openai-20261006]，但各家族并不都覆盖到 `max`：只有 GPT-6 Astra、GPT-6.1 Sol、GPT-6 Sol、GPT-6 Luna 带 `-max` 取值，GPT-5.6 三个变体、GPT-5.5 与 GPT-5.4 各行止于 `-xhigh` [@ref-warp-models-openai-chatgpt-20261006]。表格现在止于 GPT-5.4，GPT-5.3 Codex 已不在表内 [@ref-warp-models-openai-chatgpt-20261006]，而 2026-10-04 的快照里它还有 low、medium、high、xhigh 四个取值 [@ref-warp-models-openai-codex-20261004]。
- **Anthropic**：后缀表示 effort 档位，`xhigh-fast` 表示快速模式、`thinking` 表示思考模式，每个家族另有单独标出的默认 `model_id` [@ref-warp-models-anthropic-20261006]。`xhigh-fast` 挂在 claude-5-5-opus、claude-5-opus 与 claude-4-8-opus 上；`-thinking` 仍是 claude-4-5-opus 与 claude-4-5-sonnet 的第二种取值 [@ref-warp-models-anthropic-thinking-20261006]。
- **Google**：`gemini-3.1-pro` 与 `gemini-3.8-flash`、`gemini-3.7-flash`、`gemini-3.6-flash`、`gemini-3.5-flash` [@ref-warp-models-google-20261006]。
- **xAI**：仍保留 `model_id` 与 reasoning level 两列，`grok-4-7-*` 等按 low/medium/high/xhigh 分档 [@ref-warp-models-xai-20261006]。
- **Fireworks AI 托管的开放权重模型**：`glm-5.3-fireworks`、`glm-5.3-flash-fireworks`、`kimi-k3-fireworks`、`minimax-3-fireworks`、`qwen-3.8-max-fireworks`、`deepseek-v4.1-flash-fireworks` [@ref-warp-models-fireworks-20261006]。

这份清单本身是**滚动变化**的：GLM 5.2、Kimi K2.7 Code、Kimi K2.6 与 DeepSeek V4 Pro 已不在当前表内 [@ref-warp-models-fireworks-20261006]，而 2026-10-04 的快照里这四个都还在 [@ref-warp-models-fireworks-20261004]；GLM 5.3 与 DeepSeek V4.1 Flash 方向相反，只出现在当前表里，上一轮的 Fireworks 表中没有 [@ref-warp-models-fireworks-20261006][@ref-warp-models-fireworks-20261004]。新增或下线的 `model_id` 不构成版本映射依据，判断某个具体 `model_id` 当时是否可用要重新核对当前页面。OpenAI 家族还有一个与凭据相关的条件：要用自己的 ChatGPT plan 跑符合资格的 OpenAI 模型，需要先连接 ChatGPT 订阅并在模型选择器里选定具体模型 [@ref-warp-models-openai-chatgpt-20261006]。

模型选择在 prompt 输入框的模型选择器里完成，选择会持久作用于后续 prompt [@ref-warp-models-change]。每个 Agent Profile 也能单独配置 base model，位置在 **Settings > Agents > Profiles**，与该 profile 的自主级别、工具权限并列；同一个 base model 也用于 Planning [@ref-warp-models-profile-20261004]。**能力元数据**在文档中以"推理档位（reasoning level / effort）"的形式编码进 `model_id` 后缀：OpenAI 侧的后缀词表是 `low`…`max`，但清单里只有 GPT-6 系列带 `-max` 取值 [@ref-warp-models-openai-20261006][@ref-warp-models-openai-chatgpt-20261006]，Anthropic 侧另有两个具名变体 `-xhigh-fast`（快速模式）与 `-thinking`（思考模式），并给每个家族标出默认 ID [@ref-warp-models-anthropic-20261006][@ref-warp-models-anthropic-thinking-20261006]。四个 Auto 模型按定位区分：`auto` 选质量最高最快的，`auto-efficient` 偏成本，`auto-genius` 按任务复杂度自适应（文档点名的适用场景是深度调试、架构决策与 `/plan` 会话），`auto-open` 在开放权重模型间路由 [@ref-warp-models-available-20261004]。上下文窗口、输出上限、视觉/工具能力的结构化元数据字段没有在固定来源中出现，按缺口处理 [@ref-warp-models-available-20261004]。

Custom router 是在模型选择器里额外出现的一类"模型"，选择后**每次发送 prompt 解析出一个具体模型**并整段会话沿用（极短的琐碎 prompt 不锁定选择）[@ref-warp-routers-how]。两种路由类型：`complexity` 按任务难度分 easy/medium/hard 映射模型并有必填 `default`；`prompt` 按你写的自然语言分类规则自上而下匹配，第一条命中者胜出，无命中则用必填 `default` [@ref-warp-routers-types]。文件形式存放于 `~/.warp/custom_model_routers/`，一个文件一个 router，Warp 自动加载并在增删改时自动重载（无需重启）；解析失败会显示指明文件名的非阻塞错误并跳过该文件 [@ref-warp-routers-file]。路由目标必须是具体的、Warp 支持的模型，**不能**是 Auto 模型、另一个 router 或自定义端点上的模型 [@ref-warp-routers-file]。

模型可用性回退：目标模型无权限或被组织禁用时回退到 router 的 default；若没有可用模型则回退到内置默认并告知用户；内置模型本身也有 fallback 链，原模型恢复后自动切回 [@ref-warp-routers-credits][@ref-warp-models-fallback]。

## 数据保留与模型可用性的条件边界 {#providers-privacy}

Warp 与 OpenAI、Anthropic、Google、xAI、Fireworks AI 等 provider 签有 **Zero Data Retention（ZDR）** 协议，范围是"默认在所有计划下"：provider 承诺不拿经 Warp 处理的用户数据训练模型，并在生成输出后的固定时限内删除输入与输出 [@ref-warp-models-zdr-20261004]。但 ZDR 只覆盖**受支持的模型**；当 provider 因安全、滥用监控或合规原因要求保留数据时，模型可用性会变 [@ref-warp-models-zdr-20261004]。

已记录的一条例外是 **Claude Fable 5 与 Claude Fable 5.1**：Anthropic 要求为其保留数据，因此这两个模型**在 ZDR 下不可用**；该限制只针对 Fable 系列，不改变其他任何受支持模型的 ZDR 行为。对 Enterprise 团队，这两个模型默认关闭，需工作区管理员显式启用 [@ref-warp-models-fable-20261004]。

这一节的边界要说清：ZDR 协议是 Warp 与其 provider 之间的约定，**不覆盖** BYOK 请求——BYOK 的 prompt 与响应同样经过 Warp 后端，但 provider 侧的保留策略取决于你自己的账号设置，Warp 无法为经自有 API key 发出的请求强制 ZDR [@ref-warp-byok-how]。也就是说，"用了 Warp 托管的模型"与"用了自己的 key"在数据保留上不是同一档保证。

## 诊断 {#providers-diagnostics}

- **配置是否可读**：`[agents] custom_endpoints` 的键存在性可确认端点定义已写入，但文档强调经 UI 管理、凭据不在其中 [@ref-warp-allsettings-cloud]。
- **模型是否可选**：端点配好后"自定义模型会出现在模型选择器里"，BYOK 配好后受支持模型旁出现钥匙图标——这两个界面信号是分界点 [@ref-warp-endpoint-enable][@ref-warp-byok-enable]。
- **请求是否已发送 / 后端是否可用**：key 无效时 Warp 会给出与 AI 请求对应的明确错误并中止请求；命中配额或速率限制时**不会**改用 credits 重试 [@ref-warp-byok-failover]。可选开启 **Warp credit fallback**：BYOK 请求失败时自动改走 Warp 提供的模型（始终优先用你的 key，只在必要时用 credits）[@ref-warp-byok-failover]。
- **端点是否可达**：配置自定义端点时若填 `localhost`/私网地址会被拒绝，这是可直接观察的边界检查 [@ref-warp-endpoint-network]。
- **router 回退可见性**：router 始终选定一个具体模型、"你可以看到实际跑的是哪个模型"；目标不可用时回退并提示 [@ref-warp-routers-credits]。
- **模型在列表里却选不到**：先按 provider 分组核对 `model_id` 是否仍出现在当前清单——模型下线是常规原因，GLM 5.2、Kimi K2.7 Code、Kimi K2.6、DeepSeek V4 Pro 都已从 Fireworks 表中消失 [@ref-warp-models-fireworks-20261006][@ref-warp-models-fireworks-20261004]；再排除条件性禁用：Fable 系列在 ZDR 工作区不可用、Enterprise 下还需管理员启用 [@ref-warp-models-zdr-20261004][@ref-warp-models-fable-20261004]，OpenAI 侧还要看是否已连接 ChatGPT plan 才能用符合资格的 OpenAI 模型 [@ref-warp-models-openai-chatgpt-20261006]。
- **订阅路线是否可用**：SuperGrok 与 ChatGPT 订阅各自有计划条件，ChatGPT 订阅一行明确指向 Warp pricing 作为可用性口径 [@ref-warp-byok-subscription-routes-20261006]。
- **计费核对**：`[agents] usage_display_mode` 可在 credits / cost 之间切换显示，便于分辨是自己的 provider 计费还是 Warp credits [@ref-warp-allsettings-agents]。

未能验证：BYOK/端点的请求重试次数与超时、流式中断后的续传行为，以及端点侧的 tools 调用约定，固定来源均未描述 [@ref-warp-endpoint-features]。
