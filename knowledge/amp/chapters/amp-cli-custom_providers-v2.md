---
schema_version: 3
record_kind: production
edition_id: amp-cli-custom_providers-v2
harness_id: amp
topic: custom_providers
title: "Amp CLI 的自定义 Provider：连接、凭据、协议与路由"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-amp-routing-connections-kinds, ref-amp-routing-connections-platforms, ref-amp-routing-enterprise-connections, ref-amp-routing-connections, ref-amp-docs-index-pages, ref-amp-routing-precedence]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-amp-modes-fable-byok, ref-amp-dial-chatgpt-signin, ref-amp-dial-chatgpt-preset, ref-amp-dial-chatgpt-pins, ref-amp-routing-custom-url]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-amp-routing-custom-url]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-amp-routing-mappings, ref-amp-dial-auto, ref-amp-dial-system-models, ref-amp-routing-painter, ref-amp-routing-painter-routing]
  - section_id: providers-routing
    surface_ids: [cli]
    source_refs: [ref-amp-routing-precedence, ref-amp-routing-activate, ref-amp-routing-custom-url]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-amp-routing-precedence, ref-amp-routing-check-access, ref-amp-routing-mappings, ref-amp-routing-custom-url, ref-amp-routing-activate, ref-amp-modes-fable-byok]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-amp-routing-connections-kinds, ref-amp-routing-connections-platforms, ref-amp-routing-enterprise-connections, ref-amp-routing-precedence]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-amp-routing-custom-url, ref-amp-dial-chatgpt-signin, ref-amp-dial-chatgpt-preset, ref-amp-dial-chatgpt-pins, ref-amp-modes-fable-byok]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-amp-routing-custom-url]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-amp-routing-mappings, ref-amp-routing-painter, ref-amp-routing-painter-routing, ref-amp-dial-system-models]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-amp-routing-mappings, ref-amp-dial-auto]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-routing
        status: answered
        source_refs: [ref-amp-routing-custom-url, ref-amp-routing-precedence, ref-amp-routing-activate]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-routing
        status: partial
        source_refs: [ref-amp-routing-custom-url]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-amp-routing-check-access, ref-amp-routing-precedence, ref-amp-routing-mappings, ref-amp-routing-custom-url]
---

## Provider 在哪里定义 {#providers-entry}

固定来源是官方文档站快照：`/docs/customize/model-routing` 与 `/docs/the-dial`（均为 2026-10-03 快照）、`/docs/models-and-subagents`、`/docs/cli/settings`。Amp CLI 闭源，全部结论为来源级知识（`version_applicability: unknown`）。[@ref-amp-routing-connections-kinds][@ref-amp-docs-index-pages]

Amp 的 provider 概念叫 **connection（连接）**：「一个凭据加上它的设置」。默认情况下 Amp 自己服务每个模型并从你的 Amp 额度计费；加一条 connection 就能让部分或全部模型改走你自己的 API key、订阅、云平台或网关，由你的 provider 直接向你计费。[@ref-amp-routing-connections-kinds]

**配置入口有三个，管理同一份数据** [@ref-amp-routing-connections]：

| 入口 | 作用范围 |
| :-- | :-- |
| Personal Settings → Model Routing | 只作用于你自己的线程 |
| Workspace Settings → Workspace Model Routing | 作用于每个成员的线程（工作区管理员管理） |
| CLI `amp config model-providers …` | 与上面同样的操作：list、add、test、reorder（set-priority）、edit |
| Puck | 可以按要求列出、添加、测试、重排与编辑你的 connection |

文档强烈建议让 Amp 或 Puck 代替你配置 model routing，因为它们能在紧凑的循环里试配置、测试并修正。[@ref-amp-routing-connections]

**四种 connection 类型** [@ref-amp-routing-connections-kinds][@ref-amp-routing-connections-platforms]：

- **API key**：绑定单个 provider，文档列举 Anthropic、Google AI Studio、Meta AI、OpenAI、xAI。用量记在你与该 provider 的账户上。
- **订阅**：例如 ChatGPT 或 X Premium+/SuperGrok。通过在浏览器里登录，用量计入该套餐额度。用 ChatGPT 登录同时也登录 Amp，因此**一个 ChatGPT 账户只能连接一个 Amp 账户**；要在多个 Amp 账户上用同一个 ChatGPT 账户，每个账户都改选 **Connect Through Codex**。
- **云平台**：例如 Amazon Bedrock 与 Google Cloud Agent Platform（Vertex）。用量记在你的云账户上，按各自的官方指南配置。
- **AI model router / gateway**：例如 OpenRouter、Vercel AI Gateway、Cloudflare AI Gateway、Ollama Cloud、OpenCode Go，以及任何通过 **Custom URL** connection 接入的 OpenAI 或 Anthropic 兼容端点。一个凭据可以服务多个 provider 的模型，对所有档位用户可用。

Enterprise 工作区管理员可以**禁止 personal connection**，让只有工作区的 connection 生效。[@ref-amp-routing-enterprise-connections]

**路由顺序**（决定「谁来服务这个模型」）[@ref-amp-routing-precedence]：

1. 你的 personal connection，按 Model Routing 里从上到下的顺序；
2. 你所属工作区的 connection，按从上到下；
3. Amp。

对每个模型，Amp 按顺序试，用**第一个「激活」且其 model mapping 包含该模型**的 connection；没有任何 connection 服务的模型由 Amp 提供。[@ref-amp-routing-precedence]

## 凭据、base URL 与 header {#providers-auth}

- **API key 型**：每个 provider 一条 key。Anthropic 有一个额外前提——使用自己的 Anthropic API key 跑 Claude Fable 模型时，key 所属工作区必须**开启 data retention**：在 Claude Console 以组织管理员登录，创建或选择一个工作区，在 Manage → Privacy controls 里打开 data retention 并确认，再把需要 Fable 的用户分配到该工作区，最后在该工作区里创建 API key。零数据保留工作区的凭据**没有** Claude Fable 权限。企业若用 Workload Identity Federation 代替 API key，要为同一个开启了 data retention 的工作区配置。[@ref-amp-modes-fable-byok]
- **订阅型**：在浏览器里登录；usage 计入套餐额度。ChatGPT 这一条现在是「**sign in with ChatGPT 并允许 token sharing**」，登录动作同时登录了 Amp，所以一个 ChatGPT 账户只能连一个 Amp 账户。[@ref-amp-dial-chatgpt-signin][@ref-amp-routing-connections-kinds] CLI 侧用 `amp config model-providers add-chatgpt-subscription`（简写 `amp add-chatgpt-sub`）打开同一个浏览器登录流程；已有的旧版 ChatGPT connection 继续可用，不需要重连。[@ref-amp-dial-chatgpt-signin]
- **订阅型与模型的关系**：登录订阅本身不改变各模式用哪些模型；Amp 会提示一键应用 **ChatGPT Only** preset，把 `low`/`medium`/`high` 的各个角色钉到 OpenAI 模型上。[@ref-amp-dial-chatgpt-preset] 2026-09-28 之前登录的订阅，Amp 已经替你保存了这些 pin（你自己或工作区已 pin 过的角色除外）；停用或删除订阅时，Amp 会提示把它服务过的角色退回 Auto，重新跟随 Amp 的默认模型。[@ref-amp-dial-chatgpt-pins]
- **Custom URL 型**：key 放在 connection 的 API key 字段里——**不要**放进线程设置或自定义 header。Amp 发送方式为 [@ref-amp-routing-custom-url]：
  - OpenAI 与 Anthropic 格式：`Authorization: Bearer KEY`；
  - Google Generative AI 格式：默认 `x-goog-api-key`；如果要在 API key 字段里填 `Bearer TOKEN`，Amp 就只发 `Authorization: Bearer TOKEN`，不再发 API-key header。
  - 需要额外 header 时用 connection 的 **Headers** 设置或 CLI 的 `--headers`。
  - **Query Parameters** 只对除 Google Generative AI 之外的格式可用。
  - Custom URL connection **不会刷新 OAuth token**：token 过期必须自己替换。

固定来源没有提供把凭据放进环境变量的写法（例如「从 `$ENV` 读 key」），也没有描述凭据的本地存储位置或加密方式；示例中的 key 只在 UI 的 API key 字段里出现。这是缺口。[@ref-amp-routing-custom-url]

## 协议与端点形态 {#providers-protocol}

Custom URL connection 支持**四种 API 格式**，填入 base URL 后由 Amp 追加各格式的 API 路径 [@ref-amp-routing-custom-url]：

| 格式 | 追加路径 |
| :-- | :-- |
| `chat-completions`（OpenAI Chat Completions，默认） | `BASE/chat/completions` |
| `responses`（OpenAI Responses） | `BASE/responses` |
| `anthropic-messages`（Anthropic Messages） | `BASE/v1/messages`（base URL 已以 `/v1` 结尾时不重复追加） |
| `google-genai`（Google Generative AI，原生 Gemini 请求） | `BASE/models/MODEL:streamGenerateContent?alt=sse`；AI Studio key 用 `https://generativelanguage.googleapis.com/v1beta` |

Google 格式有两个要点：Vertex 的 API key 用 `https://aiplatform.googleapis.com/v1`，Amp 会把请求发到 `BASE/publishers/google/models/MODEL:streamGenerateContent?alt=sse`；该格式**默认只路由 Gemini 模型**。Google Cloud Agent Platform 仍然使用 workload identity 而不是 API key，并且也能服务 Claude 模型。[@ref-amp-routing-custom-url]

私有 Vertex 端点用映射补齐资源路径：选 `google-genai`，base URL 含 API 版本，再把 Gemini 模型映射到完整 endpoint 资源，例如 `google-vertex/gemini-3-flash-preview -> projects/your-project/locations/us-east5/endpoints/123`；以 `projects/` 或 `publishers/` 开头的完整资源路径会被原样保留。自定义 HTTPS 主机也可以，只要 Amp 能访问且实现同样的 Gemini API。[@ref-amp-routing-custom-url]

connection 表单在你输入时会显示最终请求 URL，并在 base URL 已包含 API 路径时给出告警。[@ref-amp-routing-custom-url]

固定来源没有描述兼容层/插件的实现细节、也没有第 4 种以上协议的接入方式（其它协议必须伪装成这四种之一）；这一层保持未验证。

## 模型 ID、别名与映射 {#providers-models}

**model mapping 决定一条 connection 服务哪些模型**，以及对 router 与 Custom URL 型 connection，provider 实际收到什么模型 ID。留空则用该类型默认值——多数类型是「provider 支持的所有模型」，但 Google Cloud Agent Platform 与 Amazon Bedrock 在选模型之前**不服务任何模型**。[@ref-amp-routing-mappings]

每行一条模式，使用 Amp 的规范模型 ID（`provider/model` 形式）；表单里的 **Models** 选择器可以搜索目录并插入 ID [@ref-amp-routing-mappings]：

```text
*/*                                   # include every model
-anthropic/*                          # then exclude all Anthropic models
anthropic/claude-fable-5              # but re-include this one
moonshotai/kimi-k3 -> kimi-k3-turbo   # include, and send kimi-k3-turbo to the provider
```

规则 [@ref-amp-routing-mappings]：

- `#` 开始注释，空行忽略；
- `*` 只允许出现在模式的开头或结尾：`openai/*`、`*-mini`、`*/*`；
- 行首 `-` 表示排除；
- **最后一条匹配的行获胜**；没有任何行匹配的模型不被该 connection 服务；
- 只有精确 include 行可以带 `-> providerModelID` 覆盖发给 provider 的模型 ID，该行仍参与匹配；通配与排除行不允许箭头；不带箭头时用该 connection 类型的默认 provider model ID。

Amazon Bedrock 的特殊性：只有当 Amp 知道该模型的 Bedrock ID 时通配匹配才生效，否则 Amp 跳过该 connection 并继续路由顺序（可能落到别的 provider 或 Amp 额度）；精确选择但 Bedrock ID 未知时直接报错，可以用 `model -> bedrock-model-or-inference-profile-id` 自己给出 ID。一旦 Amp 加上某模型的 Bedrock ID，通配就会自动把它路由到 Bedrock。[@ref-amp-routing-mappings]

CLI 用 `--model-mapping` 传同样的模式（逗号或换行分隔），`--clear-model-mapping` 回到默认 [@ref-amp-routing-mappings]：

```shell-session
amp config model-providers edit-router CONNECTION_ID --model-mapping "*/*,-openai/gpt-5.4"
amp config model-providers edit-key CONNECTION_ID --model-mapping "anthropic/claude-opus-4-6"
```

**能力元数据（上下文窗口、输出上限、工具/视觉支持、reasoning effort）在 connection 配置里没有对应字段**——固定来源没有描述在 provider 侧覆盖这些元数据的入口。能影响 effort 的只有 Tune Modes 里按角色固定模型的 reasoning effort（「只提供受支持的 effort 等级，没有 effort 控制的模型没有可调等级」），而 model mapping 只决定「哪个模型 ID 走哪家」。[@ref-amp-routing-mappings][@ref-amp-dial-auto]

表单与 `show` 会对 mapping 给出**非阻塞告警**，例如某行写了一个该 provider 不提供的模型，或该 provider 对它需要某个选项；告警不会阻止保存或使用。[@ref-amp-routing-mappings]

**图像模型例外：走不走 Gemini 由 Painter 决定**。账号启用 Google Painter 后，个人 Model Routing 设置里的 **Painter** 段可以把图像模型从 **Amp (Default)** 换成 **Gemini 3.1 Flash Image (Nano Banana 2)**，该选择对 web 与 CLI 线程都生效并立即保存，Amp 仍是默认并使用 Amp 额度。Gemini 需要一条启用的 **Google AI Studio** API key connection，图像生成由 Google 计到该 API project，ChatGPT 或 Gemini 消费订阅不提供这项 API 访问。[@ref-amp-routing-painter] 被服务的模型 ID 是 `google/gemini-3.1-flash-image`；最终由哪条 connection 服务仍由 connection 顺序、model mapping 与工作区策略决定，被选中的 connection 不是 AI Studio 或请求失败时，Painter 直接报错而不回落到 Amp 额度。[@ref-amp-routing-painter-routing] 图像生成属于 supporting system model，在 Tune Modes 里固定主 agent、Oracle 与子代理都改不了它。[@ref-amp-dial-system-models]

## 路由参数、激活与响应 {#providers-routing}

**priority 就是列表顺序**：`0` 最先试。拖动 connection 的把手换位，或直接设 priority：

```shell-session
amp config model-providers list
amp config model-providers set-priority CONNECTION_ID 0
```

设置一个已被占用的 priority 会把该 connection 及其后的 connection 各下移一位，所以 `0` 始终表示「最先试这条」；`list` 与 `list --json` 显示当前 priority。两条 connection 常覆盖同一模型（例如 ChatGPT 订阅与包含 `openai/gpt-5.6-sol` 的 OpenRouter router），**列表里靠上的胜出**；只想把部分模型交给靠下的 connection 时，应在上面的 connection 的 model mapping 里排除它们，而不是重排。列表下方的路由图会显示每个模型最终由谁服务。[@ref-amp-routing-precedence]

**激活/停用**：停用的 connection 在路由时被跳过但保留设置。展开 connection 用 **Activate**/**Deactivate**，或 [@ref-amp-routing-activate]：

```shell-session
amp config model-providers activate CONNECTION_ID
amp config model-providers deactivate CONNECTION_ID
```

同一 provider 可以同时激活多把 API key，由 model mapping 与 priority 决定哪把服务哪个模型；AI router 与 Custom URL connection 也可以同时激活。**订阅每种类型每个用户只允许一条激活**（激活一个 ChatGPT 订阅会停用你其它激活的 ChatGPT 订阅，但不影响 OpenAI API key）。停用订阅可能比省下的更贵，因为那些模型会回到用 Amp 额度服务，所以 CLI 会要求 `--yes`。[@ref-amp-routing-activate]

**参数如何映射到请求**（可写字段的归属）[@ref-amp-routing-custom-url]：base URL 与 API 格式共同决定端点；API key 字段决定认证 header（见「凭据」一节）；Headers 与 Query Parameters 作为额外请求参数送出；`->` 映射改写发给 provider 的模型 ID。表单里显示的「最终请求 URL」只是 UI 预览，真正生效的是保存后的格式 + base URL + 映射。

**响应与重试**：Custom URL 的 `google-genai` 路径带 `alt=sse`，说明 Gemini 请求使用 SSE 流式响应；固定来源对不同格式的流式、工具调用与重试策略没有成文描述。已知的响应处理细节只有两条：Check Access 对 Custom URL connection 在映射较宽时会**列出 provider 的模型**，映射恰好指定一个模型时发送一次单 token 请求（Google Generative AI 则直接发一次单 token Gemini 请求而不列模型）；对「用 HTTP 200 + body 里的 error 表示无效 key」的 provider，Amp 会报告为失败并带上 provider 的消息。[@ref-amp-routing-custom-url]

固定来源没有描述流式分块解析失败、工具调用不支持、请求重试或超时行为，这部分未验证。[@ref-amp-routing-custom-url]

## 诊断：可读、可选、已发送、真可用 {#providers-diagnostics}

| 想确认 | 入口 | 来源 |
| :-- | :-- | :-- |
| connection 列表与 priority | `amp config model-providers list`（或 `list --json`） | [@ref-amp-routing-precedence] |
| 凭据是否有效 | UI 的 **Check Access** 按钮；CLI `amp config model-providers test CONNECTION_ID` | [@ref-amp-routing-check-access] |
| 实际是哪条 connection 服务的 | `amp config model-providers check-access --provider-model provider/model`：跑一次短推理并报告真正服务它的 connection | [@ref-amp-routing-check-access] |
| 图像模型由谁服务 | Painter 段的模型选择，加上 connection 顺序与 model mapping；选中的 connection 不是 AI Studio 或请求失败会直接报错 | [@ref-amp-routing-painter-routing] |
| 每个模型最终由谁服务 | Model Routing 里 connection 列表下方的路由图 | [@ref-amp-routing-precedence] |
| mapping 是否写了 provider 不支持的模型 | 表单与 `show` 的非阻塞告警 | [@ref-amp-routing-mappings] |
| Custom URL 的实际请求地址 | connection 表单在输入 base URL 时显示的最终请求 URL，以及「base URL 已包含 API 路径」的告警 | [@ref-amp-routing-custom-url] |
| 为什么某模型没走我的 key | 逐条核对：该 connection 是否激活、其 model mapping 是否包含该模型、priority 是否被更高的 connection 抢先 | [@ref-amp-routing-precedence][@ref-amp-routing-activate] |
| Fable 缺少 data retention | Anthropic 侧工作区的 data retention 设置，以及该 key 所属工作区 | [@ref-amp-modes-fable-byok] |

`test` 与 `check-access` 的差别就是「配置可读/凭据有效」与「请求真的发出去且被某条 connection 服务」的分界：前者只验证凭据，后者跑一次真实推理并报告服务方。[@ref-amp-routing-check-access]

固定来源没有提供请求级日志或错误码清单，也没有说明 `amp config model-providers` 是否支持 `show`/`edit-*` 之外的全部子命令；只列出了文档出现的这几个子命令（list、set-priority、activate、deactivate、test、check-access、edit-router、edit-key）。这是缺口。[@ref-amp-routing-mappings]
