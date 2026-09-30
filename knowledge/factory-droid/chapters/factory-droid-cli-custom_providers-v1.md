---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-custom_providers-v1
harness_id: factory-droid
topic: custom_providers
title: "Droid CLI 的自定义 Provider：customModels、凭据、协议与转发"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-fd-byok-config, ref-fd-byok-usage, ref-fd-models-custom, ref-fd-settings-where, ref-fd-org-models]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-fd-byok-config, ref-fd-byok-fields, ref-fd-byok-helper, ref-fd-byok-bearer, ref-fd-byok-extraheaders, ref-fd-org-models, ref-fd-settings-enterprise]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-fd-byok-providers, ref-fd-byok-provider-ref, ref-fd-byok-local, ref-fd-byok-bedrock]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-fd-byok-fields, ref-fd-org-models, ref-fd-byok-bedrock-fields, ref-fd-byok-request-meta, ref-fd-byok-usage, ref-fd-models-custom]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-fd-byok-extraargs, ref-fd-byok-extraheaders, ref-fd-byok-env, ref-fd-byok-region, ref-fd-byok-caching, ref-fd-byok-troubleshooting]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-byok-troubleshooting, ref-fd-byok-usage, ref-fd-settings-enterprise, ref-fd-cli-model-ids]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-fd-byok-config, ref-fd-byok-usage, ref-fd-models-custom, ref-fd-org-models]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-fd-byok-fields, ref-fd-byok-helper, ref-fd-byok-bearer, ref-fd-org-models]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-fd-byok-providers, ref-fd-byok-provider-ref, ref-fd-byok-local, ref-fd-byok-bedrock]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs: [ref-fd-byok-usage, ref-fd-models-custom, ref-fd-byok-config]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-fd-byok-fields, ref-fd-org-models, ref-fd-byok-bedrock-fields, ref-fd-byok-request-meta]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-fd-byok-extraargs, ref-fd-byok-extraheaders, ref-fd-byok-env, ref-fd-byok-region]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-fd-byok-caching, ref-fd-byok-troubleshooting]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-fd-byok-troubleshooting, ref-fd-byok-usage, ref-fd-settings-enterprise, ref-fd-cli-model-ids]
---

## Provider 定义入口与作用域 {#providers-entry}

本章的固定来源是官方文档站 `model-independence/byok`、`models`、`droid-cli/settings` 与 `enterprise/hierarchical-settings-and-org-control` 页面快照。CLI 本体不开源，整章按 source_only 阅读。

自定义模型（自带密钥，BYOK）定义在 `~/.factory/settings.json` 的 `customModels` 数组里；同一份 `settings.local.json` 与各级 `.factory/settings.json` 也适用同一 schema。[@ref-fd-byok-config][@ref-fd-settings-where]

```json
{
  "customModels": [
    {
      "model": "your-model-id",
      "displayName": "My Custom Model",
      "baseUrl": "https://api.provider.com/v1",
      "apiKey": "${PROVIDER_API_KEY}",
      "provider": "generic-chat-completion-api",
      "maxOutputTokens": 16384
    }
  ]
}
```

上例来自官方 BYOK 页面的「Configuration reference」。[@ref-fd-byok-config]

旧的 `~/.factory/config.json` 用 snake_case 字段名（`custom_models`、`base_url` 等）仍被支持：两个文件都会被加载并合并，`settings.json` 优先；`apiKey` 的环境变量展开**不**作用于旧 `config.json`。[@ref-fd-byok-config]

配置完成后用 `/model` 切换到自定义模型：它们出现在 Factory 提供模型下方的单独「Custom models」区段，显示名取自 `displayName`。自定义模型只在 Droid CLI 与读取本机 `settings.json` 的桌面应用中可用，不会出现在 Factory 的网页与移动端。[@ref-fd-byok-usage][@ref-fd-models-custom]

组织侧也可以在托管设置里下发 `customModels`：那里的每个条目额外要求 `id`（必须以 `custom:` 开头）、`index`、`provider`、`displayName` 与 `noImageSupport`，并且**新模型不允许使用静态 `apiKey`**，只能用 `${VAR_NAME}` 引用、keyless 端点或 Bedrock；已存在的静态密钥模型仍可用并可轮换。[@ref-fd-org-models]

## 凭据、base URL 与运行时凭证 {#providers-auth}

`apiKey` 在 `settings.json`/`settings.local.json` 支持 `"${VAR_NAME}"` 形式的环境变量引用，例如 `"apiKey": "${PROVIDER_API_KEY}"`；HTTP 自定义模型可以**完全省略** `apiKey`（keyless 网关）或用 `apiKeyHelper` 在请求时铸造短期 token；部分 OpenAI 兼容服务要求非空 `apiKey` 即使它忽略其值，此时填任意占位值即可。非 Bedrock 模型仍然必须提供 `baseUrl`。[@ref-fd-byok-fields][@ref-fd-byok-config]

`apiKeyHelper` 用命令的 stdout 作为凭据，在请求时解析、按 TTL 缓存并在 `401` 后刷新一次，优先于静态 `apiKey`。TTL 解析顺序是环境变量 `FACTORY_API_KEY_HELPER_TTL_MS`、每模型 `apiKeyHelperTtlMs`、默认 5 分钟；命令失败会进入短暂冷却并快速失败，token、命令输出与命令文本都不会被记录。[@ref-fd-byok-helper]

`apiKeyHelper` 会执行 shell 命令，因此**只在 org 托管（受信任）设置中生效**，会从 user、project、folder 级设置中被剥离，避免不受信任的仓库在你机器上执行命令。[@ref-fd-byok-helper]

`provider: "anthropic"` 默认把凭据放在 `x-api-key`；需要 `Authorization: Bearer` 的 Anthropic Messages 兼容网关把 `authMode` 设为 `bearer`（只对非 Bedrock 的 anthropic 模型有效）。`extraHeaders` 用来追加任意请求头，例如自定义鉴权头。[@ref-fd-byok-bearer][@ref-fd-byok-extraheaders]

组织托管层下发的自定义模型对静态密钥有额外限制：新模型不能写死 `apiKey`，只能用 `${VAR_NAME}` 引用、keyless 端点或 Bedrock；这条限制与 `apiKeyHelper` 的 org-only 规则叠加，使托管环境更依赖环境变量与短期凭据。[@ref-fd-org-models]

组织可以在 `modelPolicy` 里用 `allowCustomModels` 控制是否允许自定义模型、用 `allowedBaseUrls` 限定可用的 base URL，从而限制成员能把密钥发往何处。[@ref-fd-settings-enterprise]

## 协议与端点形态 {#providers-protocol}

`provider` 字段决定 API 兼容方式，取值与用途 [@ref-fd-byok-providers]：

| `provider` | API 形态 | 适用 |
| :-- | :-- | :-- |
| `anthropic` | Anthropic Messages API（v1/messages） | Anthropic 官方 API 或兼容代理 |
| `openai` | OpenAI Responses API | OpenAI 官方 API 或兼容代理；GPT-5 等新模型必须用它 |
| `generic-chat-completion-api` | OpenAI Chat Completions API | OpenRouter、Fireworks、Together AI、Ollama、vLLM 等大多数开源提供方 |

官方页面给出常见提供方的 `baseUrl` 与示例 `model`（OpenAI 官方 `https://api.openai.com/v1`、Anthropic 官方 `https://api.anthropic.com`、OpenRouter、Fireworks、DeepInfra、Groq、Baseten、Hugging Face、Google Gemini 等），除官方 OpenAI/Anthropic 外一律用 `generic-chat-completion-api`。[@ref-fd-byok-provider-ref]

本地模型走同一机制：Ollama 把 `baseUrl` 指向 `http://localhost:11434/v1`（可以不带 `apiKey`，部分构建需要占位值），并把上下文窗口调到至少 32k；LM Studio 指向 `http://localhost:1234/v1` 并启动本地 server。文档建议 agentic 编码使用 30B 以上参数的模型。[@ref-fd-byok-local]

AWS Bedrock 通过模型配置里的 `bedrock` 对象路由 Anthropic 或 OpenAI 自定义模型，凭据走标准 AWS SDK 提供链（环境变量、共享配置/凭据文件或 SSO/IAM profile）。[@ref-fd-byok-bedrock]

## 能力与元数据 {#providers-metadata}

`customModels` 条目里影响能力与显示的字段 [@ref-fd-byok-fields]：

- `model`：发送给 API 的模型标识（决定请求里的模型名）。
- `displayName`：模型选择器里显示的名字。
- `maxOutputTokens`：响应输出的最大 token 数。
- `noImageSupport`：设为 `true` 关闭该模型的图像输入。
- `extraArgs` / `extraHeaders`：追加到请求的参数与请求头。
- `bedrock`：Bedrock 路由选项。

组织托管设置里的自定义模型额外支持 `maxContextLimit`（上下文窗口上限）、`enableThinking`（开启扩展思考）、`thinkingMaxTokens`（思考阶段 token 上限）。[@ref-fd-org-models]

Bedrock 字段包含 `awsRegion`、`awsProfile`、`bedrockBaseUrl`、`awsAuthRefresh`、`awsCredentialExport` 与 `requestMetadata`。[@ref-fd-byok-bedrock-fields]

`requestMetadata` 是键值对，会随该模型每次 Bedrock 推理调用一起发送，用于在 AWS 模型调用日志与成本报表里归属 Droid 的 Bedrock 花费；字段按 Bedrock 线格式不同而不同（`anthropic` 走 `X-Amzn-Bedrock-Request-Metadata` 头并计入 SigV4 签名，`bedrock-converse` 放进请求体，`openai` 形态不发送）。AWS 限制为最多 16 条、键 1–256 字符、值不超过 256 字符，字符集限字母数字、空白与 `: _ @ $ # = / + , . -`；超限只让该模型失败并指名违规键。这是归属数据而不是访问控制，不要放密钥。[@ref-fd-byok-request-meta]

模型 ID 就是 `model` 字段本身：自定义模型用 `custom:` 前缀加该字段引用（例如 `custom:gpt-4o-mini`），不是 `displayName`。文档没有提供「向提供方拉取模型清单」的发现机制，也没有别名（alias）概念：可用模型由你写入的 `customModels` 数组与 Factory 自带模型表共同决定。[@ref-fd-byok-usage][@ref-fd-models-custom]

## 参数转发与环境解析 {#providers-forwarding}

`extraArgs` 把提供方专有参数（例如 `temperature`、`top_p`）加入 API 请求；`extraHeaders` 追加 HTTP 头。[@ref-fd-byok-extraargs][@ref-fd-byok-extraheaders]

`${VAR_NAME}` 插值作用于 `apiKey`、`awsRegion`、`awsProfile`、`bedrockBaseUrl` 与 `requestMetadata` 的键和值，在解析时按工作区展开；引用的变量缺失时 Droid 会快速失败并指名缺失变量，而不是把字面量发给 AWS。`awsAuthRefresh` 与 `awsCredentialExport` **不**由设置解析器展开，它们通过 shell 运行，`${VAR}` 由子进程环境的 shell 替换。[@ref-fd-byok-env]

省略 `awsRegion` 时按 AWS 默认链解析：`AWS_REGION`、`AWS_DEFAULT_REGION`、`~/.aws/config` 中已解析 profile 的 `region`；都没有则快速失败，不会静默选一个区域。[@ref-fd-byok-region]

缓存与成本相关行为：官方 `anthropic`/`openai` 提供方会尝试提示缓存，通用提供方是否支持不可保证；用 `/cost` 查看成本分解与缓存命中率来验证。[@ref-fd-byok-caching]

**缺口**：`providers.responses` 要求的流式响应、工具调用与重试约定，固定来源只覆盖了提示缓存、`401` 后的凭据刷新与限流排错，没有描述客户端的流式协议、工具调用映射或通用重试策略；这些点保持未验证。[@ref-fd-byok-caching][@ref-fd-byok-troubleshooting]

## 诊断 {#providers-diagnostics}

官方排错清单把症状与入口对应起来 [@ref-fd-byok-troubleshooting]：

- 模型没出现在选择器：检查 `settings.json`（或旧 `config.json`）的 JSON 语法与必填字段；设置改动由文件监听自动检测。
- `Invalid provider`：`provider` 必须正好是 `anthropic`、`openai` 或 `generic-chat-completion-api`，注意大小写。
- 认证错误：核对密钥有效性、权限与 `baseUrl` 是否与提供方文档一致；用 `apiKeyHelper` 时先在命令行手动运行该命令，确认退出码为 0 且 stdout 是有效 token，并记住它只在 org 托管设置中生效。
- 本地模型连不上：确认本地 server 已运行、`baseUrl` 正确（必要时带 `/v1/` 后缀）、模型已拉取。
- 限流或配额错误：查看提供方的限额并在其控制台监控用量。

区分「配置可读」「模型可选」「请求已发送」「后端可用」的观察点：设置被解析后模型会出现在 `/model` 的 Custom models 区段；`/cost` 能给出实际调用与缓存数据；`Invalid provider` 与认证错误分别对应配置层与请求层失败。组织的 `modelPolicy` 会先决定哪些模型可选，之后再谈请求是否成功。[@ref-fd-byok-usage][@ref-fd-settings-enterprise][@ref-fd-cli-model-ids]
