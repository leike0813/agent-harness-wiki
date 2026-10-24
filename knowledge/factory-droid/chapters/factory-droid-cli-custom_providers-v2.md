---
schema_version: 3
record_kind: production
edition_id: factory-droid-cli-custom_providers-v2
harness_id: factory-droid
topic: custom_providers
title: "Droid CLI 的自定义 Provider：customModels、凭据、协议与转发"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-fd-byok-config, ref-fd-byok-usage-20261022, ref-fd-byok-personal-models-20261022, ref-fd-models-custom, ref-fd-settings-where, ref-fd-org-models-20261022, ref-fd-byok-legacy-config-20261022]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-fd-byok-config, ref-fd-byok-fields-20261022, ref-fd-byok-credentials-20261022, ref-fd-byok-helper, ref-fd-byok-helper-scope-20261022, ref-fd-byok-org-static-key-20261022, ref-fd-byok-bearer, ref-fd-byok-extraheaders, ref-fd-org-extraheaders-20261022, ref-fd-byok-bedrock-auth-20261022, ref-fd-org-models-20261022, ref-fd-org-model-policy-20261022, ref-fd-settings-enterprise]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-fd-byok-providers-20261022, ref-fd-byok-provider-types-20261022, ref-fd-byok-provider-ref, ref-fd-byok-local, ref-fd-byok-bedrock-20261022, ref-fd-org-provider-values-20261022]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-fd-byok-fields-20261022, ref-fd-byok-context-limit-20261022, ref-fd-byok-capabilities-20261022, ref-fd-byok-reasoning-20261022, ref-fd-byok-use-in-router-20261022, ref-fd-org-models-20261022, ref-fd-org-model-policy-20261022, ref-fd-byok-bedrock-fields-20261022, ref-fd-byok-bedrock-auth-20261022, ref-fd-byok-request-meta, ref-fd-byok-usage-20261022, ref-fd-models-custom]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-fd-byok-extraargs, ref-fd-byok-extraheaders, ref-fd-byok-env, ref-fd-byok-region, ref-fd-byok-caching, ref-fd-byok-troubleshooting-20261022]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-byok-troubleshooting-20261022, ref-fd-byok-usage-20261022, ref-fd-byok-helper-scope-20261022, ref-fd-byok-provider-types-20261022, ref-fd-byok-legacy-config-20261022, ref-fd-org-provider-values-20261022, ref-fd-byok-local, ref-fd-settings-enterprise, ref-fd-cli-model-ids]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-fd-byok-config, ref-fd-byok-usage-20261022, ref-fd-org-models-20261022, ref-fd-byok-legacy-config-20261022]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-fd-byok-fields-20261022, ref-fd-byok-credentials-20261022, ref-fd-byok-helper-scope-20261022, ref-fd-byok-org-static-key-20261022, ref-fd-byok-bedrock-auth-20261022]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-fd-byok-providers-20261022, ref-fd-byok-provider-types-20261022, ref-fd-byok-provider-ref, ref-fd-byok-local, ref-fd-byok-bedrock-20261022]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs: [ref-fd-byok-usage-20261022, ref-fd-models-custom, ref-fd-byok-config]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-fd-byok-fields-20261022, ref-fd-byok-context-limit-20261022, ref-fd-byok-capabilities-20261022, ref-fd-byok-reasoning-20261022, ref-fd-org-models-20261022]
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
        source_refs: [ref-fd-byok-caching, ref-fd-byok-troubleshooting-20261022]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-fd-byok-troubleshooting-20261022, ref-fd-byok-usage-20261022, ref-fd-settings-enterprise, ref-fd-cli-model-ids]
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

旧的 `~/.factory/config.json`（snake_case 字段名 `custom_models`、`base_url` 等）不作为持续合并的第二份配置：Droid 启动时把其中的自定义模型**复制**进 `settings.json`，原文件保持不变；此后对已复制模型的改动会被忽略，后续编辑应直接写 `settings.json`。[@ref-fd-byok-legacy-config-20261022]

官方页面列出三个编辑入口：CLI 里 `/settings` → **Custom models**（或 `/model` → **Manage custom models**）、桌面应用的 **Settings** > **Custom Models**，以及直接写 `~/.factory/settings.json`。两个编辑器都只写 `~/.factory/settings.json`，且只列出个人模型，不含组织与项目模型；保存后模型出现在 `/model` 下方的 **Custom Models** 区段，显示名取自 `displayName`。[@ref-fd-byok-usage-20261022][@ref-fd-models-custom]

自定义模型只在 Droid CLI 与读取本机 `settings.json` 的桌面应用中可用，不会出现在 Factory 的网页与移动端。[@ref-fd-byok-personal-models-20261022]

组织侧也可以在托管设置里下发 `customModels`，而且每个条目接受 BYOK「Supported fields」里的**全部字段**（包括 `apiKeyHelper`、`reasoningEffort`、`baseModelId` 与 `useInRouter`）。组织侧常见字段大多是可选的：`id` 若提供必须以 `custom:` 开头，`index`、`displayName`、`noImageSupport` 均可省略，`baseUrl` 只在模型没有 `bedrock` 块时才必填。[@ref-fd-org-models-20261022]

## 凭据、base URL 与运行时凭证 {#providers-auth}

`apiKey` 在 `settings.json`/`settings.local.json` 支持 `"${VAR_NAME}"` 形式的环境变量引用，例如 `"apiKey": "${PROVIDER_API_KEY}"`；HTTP 自定义模型可以**完全省略** `apiKey`（keyless 网关）或用 `apiKeyHelper` 在请求时铸造短期 token；部分 OpenAI 兼容服务要求非空 `apiKey` 即使它忽略其值，此时填任意占位值即可。`baseUrl` 对非 Bedrock 模型仍然必填，带 `bedrock` 块的模型可以不写。[@ref-fd-byok-fields-20261022][@ref-fd-byok-config]

`apiKeyHelper` 用命令的 stdout 作为凭据，在请求时解析、按 TTL 缓存并在 `401` 后刷新一次，优先于静态 `apiKey`。TTL 解析顺序是环境变量 `FACTORY_API_KEY_HELPER_TTL_MS`、每模型 `apiKeyHelperTtlMs`、默认 5 分钟；命令失败会进入短暂冷却并快速失败，token、命令输出与命令文本都不会被记录。[@ref-fd-byok-helper]

`apiKeyHelper` 会执行 shell 命令，因此只在**个人设置**（`~/.factory/settings.json`）与 **org 托管设置**中生效，会从 project 与 folder 级设置中被剥离，避免不受信任的仓库在你机器上执行命令。[@ref-fd-byok-helper-scope-20261022][@ref-fd-byok-credentials-20261022]

`provider: "anthropic"` 默认把凭据放在 `x-api-key`；需要 `Authorization: Bearer` 的 Anthropic Messages 兼容网关把 `authMode` 设为 `bearer`（只对非 Bedrock 的 anthropic 模型有效）。`extraHeaders` 用来追加任意请求头，例如自定义鉴权头。[@ref-fd-byok-bearer][@ref-fd-byok-extraheaders]

组织托管层对静态密钥的限制按**条目变更**判断：新增或修改的自定义模型不能用静态 `apiKey`，只能用 `${VAR_NAME}` 引用、`apiKeyHelper`、keyless 端点或 Bedrock；未改动的既有静态密钥模型继续可用，但要改它（包括轮换密钥）就必须先换成上述形式之一。[@ref-fd-byok-org-static-key-20261022][@ref-fd-org-models-20261022]

组织托管模型对请求头也有约束：名字像凭据的请求头以及 `Cookie` 必须整体写成 `${VAR_NAME}` 引用，字面值看起来像密钥的会被拒绝。[@ref-fd-org-extraheaders-20261022]

Bedrock 凭据由模型里的 `bedrock.authMethod` 选择：`aws-credentials` 走标准 AWS 凭据链（环境变量、`~/.aws` 文件、SSO 或 `awsProfile`，可配 `awsAuthRefresh`）；`credentials-command` 要求 `awsCredentialExport` 打印带 `AccessKeyId`/`SecretAccessKey`（临时凭据再加 `SessionToken`）的 `Credentials` JSON，`export` 行会被拒绝；`environment-api-key` 读 `AWS_BEARER_TOKEN_BEDROCK`。省略 `authMethod` 时按 `AWS_BEARER_TOKEN_BEDROCK` → AWS 凭据链 → `awsCredentialExport` → `awsAuthRefresh` 的顺序尝试。这些命令与 `apiKeyHelper` 一样只在个人与 org 托管设置中生效，org 下发的模型条目不携带凭据，每台使用它的机器都要自行配置认证方式与区域。[@ref-fd-byok-bedrock-auth-20261022]

组织可以在 `modelPolicy` 里用 `allowCustomModels` 控制是否允许自定义模型、用 `allowedBaseUrls` 限定可用的 base URL（Bedrock 模型按 `bedrock.bedrockBaseUrl` 或 `https://bedrock-runtime.` 加区域名加 `.amazonaws.com` 匹配，仅靠 AWS profile 取得区域的模型不被允许），从而限制成员能把密钥发往何处。[@ref-fd-org-model-policy-20261022][@ref-fd-settings-enterprise]

## 协议与端点形态 {#providers-protocol}

`provider` 字段决定 API 兼容方式，个人 BYOK 自定义模型有四种取值 [@ref-fd-byok-providers-20261022][@ref-fd-byok-provider-types-20261022]：

| `provider` | API 形态 | 适用 |
| :-- | :-- | :-- |
| `anthropic` | Anthropic Messages API（v1/messages） | Anthropic 官方 API 或兼容代理 |
| `openai` | OpenAI Responses API | OpenAI 官方 API 或兼容代理；GPT-5 等新模型必须用它 |
| `generic-chat-completion-api` | OpenAI Chat Completions API | OpenRouter、Fireworks、Together AI、Ollama、vLLM 等大多数开源提供方 |
| `bedrock-converse` | AWS Bedrock Converse API | 走 Converse API 的 Bedrock 模型；需要 `bedrock` 块 |

这四种取值属于**个人 BYOK 自定义模型**这条路径；组织托管设置下发的 `customModels` 条目除它们之外还接受第一方 provider 取值 `factory`、`google`、`xai`、`voyage`（共八种），两条路径的取值清单不能互相套用。[@ref-fd-org-provider-values-20261022]

官方页面给出常见提供方的 `baseUrl` 与示例 `model`（OpenAI 官方 `https://api.openai.com/v1`、Anthropic 官方 `https://api.anthropic.com`、OpenRouter、Fireworks、DeepInfra、Groq、Baseten、Hugging Face、Google Gemini 等），除官方 OpenAI/Anthropic 外一律用 `generic-chat-completion-api`。[@ref-fd-byok-provider-ref]

本地模型走同一机制：Ollama 把 `baseUrl` 指向 `http://localhost:11434/v1`（可以不带 `apiKey`，部分构建需要占位值），并把上下文窗口调到至少 32k；LM Studio 指向 `http://localhost:1234/v1` 并启动本地 server。文档建议 agentic 编码使用 30B 以上参数的模型。[@ref-fd-byok-local]

AWS Bedrock 通过模型配置里的 `bedrock` 对象路由自定义模型，并把 `provider` 设成匹配的 Bedrock API 形态：`anthropic` 走 Bedrock Runtime 的 InvokeModel 或 Bedrock Mantle 的 Messages，`bedrock-converse` 走 Converse，`openai` 走 Bedrock 的 OpenAI 兼容端点；Bedrock 模型不使用 `apiKey` 与 `baseUrl`。[@ref-fd-byok-bedrock-20261022]

## 能力与元数据 {#providers-metadata}

`customModels` 条目里影响能力与显示的字段 [@ref-fd-byok-fields-20261022]：

- `model`：发送给 API 的模型标识，决定请求里的模型名。
- `displayName`：模型选择器里显示的名字。
- `maxOutputTokens`：响应输出的最大 token 数。
- `maxContextLimit`：模型上下文窗口（输入 token）。Droid 用它把会话压进窗口并拒绝发送超窗口的消息；但它不会让压缩更晚发生——压缩阈值仍由 compaction 限制决定（默认 250,000），可用 `compactionTokenLimit`/`compactionTokenLimitPerModel` 调整，并应保持低于 `maxContextLimit`；省略且 Droid 不认识该模型时，按 250,000 与你的 compaction 限制中较大者估算。[@ref-fd-byok-context-limit-20261022]
- `noImageSupport`：`anthropic`、`openai`、`bedrock-converse` 默认 `false`，`generic-chat-completion-api` 默认 `true`；显式设为 `true` 关闭该模型的图像输入。[@ref-fd-byok-capabilities-20261022]
- `reasoningEffort`：为 Droid 不认识的模型设默认推理档位，设了之后选择器提供 `off`/`low`/`medium`/`high`；`enableThinking` 与 `thinkingMaxTokens` 只对 `anthropic` 与 `bedrock-converse` 生效，分别开启扩展思考与限制思考阶段 token。[@ref-fd-byok-reasoning-20261022]
- `baseModelId`：该条目实际服务的 Factory 内置模型 ID，命中内置模型时其推理档位与默认值覆盖本条目的 `reasoningEffort`；`useInRouter: true` 还允许 Auto Model 用它替代该内置模型，前提是组织允许 BYOK 进入 Auto Model（`modelPolicy.allowFactoryRouterByok`）。[@ref-fd-byok-reasoning-20261022][@ref-fd-byok-use-in-router-20261022]
- `extraArgs` / `extraHeaders`：追加到请求的参数与请求头。
- `bedrock`：Bedrock 路由选项。

组织托管设置里的自定义模型条目接受同一套字段（同样包括 `apiKeyHelper`、`reasoningEffort`、`baseModelId`、`useInRouter`），并同样提供 `maxContextLimit`、`enableThinking`、`thinkingMaxTokens`、`maxOutputTokens`；在那里 `displayName` 与 `noImageSupport` 是可选的。[@ref-fd-org-models-20261022]

组织还能在 `modelPolicy` 里收窄元数据的可用范围：`allowedBaseUrls` 限制 base URL（含 Bedrock 端点的匹配规则），`allowFactoryRouterByok`/`factoryRouterByokOnly` 决定 BYOK 模型能否进入 Auto Model 路由。[@ref-fd-org-model-policy-20261022]

Bedrock 字段包含 `authMethod`、`awsRegion`、`awsProfile`、`bedrockBaseUrl`、`awsAuthRefresh`、`awsCredentialExport` 与 `requestMetadata`；`authMethod` 如何取得凭据见上一节。[@ref-fd-byok-bedrock-fields-20261022][@ref-fd-byok-bedrock-auth-20261022]

`requestMetadata` 是键值对，会随该模型每次 Bedrock 推理调用一起发送，用于在 AWS 模型调用日志与成本报表里归属 Droid 的 Bedrock 花费；字段按 Bedrock 线格式不同而不同（`anthropic` 走 `X-Amzn-Bedrock-Request-Metadata` 头并计入 SigV4 签名，`bedrock-converse` 放进请求体，`openai` 形态不发送）。AWS 限制为最多 16 条、键 1–256 字符、值不超过 256 字符，字符集限字母数字、空白与 `: _ @ $ # = / + , . -`；超限只让该模型失败并指名违规键。这是归属数据而不是访问控制，不要放密钥。[@ref-fd-byok-request-meta]

`model` 是发给提供方的模型标识，`displayName` 只影响选择器显示；可用模型由你写入的 `customModels` 数组与 Factory 自带模型表共同决定，固定来源没有描述向提供方拉取模型清单的发现机制。[@ref-fd-byok-usage-20261022][@ref-fd-models-custom]

## 参数转发与环境解析 {#providers-forwarding}

`extraArgs` 把提供方专有参数（例如 `temperature`、`top_p`）加入 API 请求；`extraHeaders` 追加 HTTP 头。[@ref-fd-byok-extraargs][@ref-fd-byok-extraheaders]

`${VAR_NAME}` 插值作用于 `apiKey`、`awsRegion`、`awsProfile`、`bedrockBaseUrl` 与 `requestMetadata` 的键和值，在解析时按工作区展开；引用的变量缺失时 Droid 会快速失败并指名缺失变量，而不是把字面量发给 AWS。`awsAuthRefresh` 与 `awsCredentialExport` **不**由设置解析器展开，它们通过 shell 运行，`${VAR}` 由子进程环境的 shell 替换。[@ref-fd-byok-env]

省略 `awsRegion` 时按 AWS 默认链解析：`AWS_REGION`、`AWS_DEFAULT_REGION`、`~/.aws/config` 中已解析 profile 的 `region`；都没有则快速失败，不会静默选一个区域。[@ref-fd-byok-region]

缓存与成本相关行为：官方 `anthropic`/`openai` 提供方会尝试提示缓存，通用提供方是否支持不可保证；用 `/cost` 查看成本分解与缓存命中率来验证。[@ref-fd-byok-caching]

**缺口**：`providers.responses` 要求的流式响应、工具调用与重试约定，固定来源只覆盖了提示缓存、`401` 后的凭据刷新与限流排错，没有描述客户端的流式协议、工具调用映射或通用重试策略；这些点保持未验证。[@ref-fd-byok-caching][@ref-fd-byok-troubleshooting-20261022]

## 诊断 {#providers-diagnostics}

官方排错清单把症状与入口对应起来 [@ref-fd-byok-troubleshooting-20261022]：

- 模型没出现在选择器：检查 `settings.json` 的 JSON 语法与必填字段；旧 `config.json` 里的模型在启动时已复制进 `settings.json`，之后只改前者无效；设置改动由文件监听自动检测。[@ref-fd-byok-legacy-config-20261022]
- `Invalid provider`：个人 BYOK 条目的 `provider` 必须是受支持的取值之一——`anthropic`、`openai`、`generic-chat-completion-api` 或 `bedrock-converse`——注意大小写；组织托管条目另有 `factory`、`google`、`xai`、`voyage` 可用。[@ref-fd-byok-provider-types-20261022][@ref-fd-org-provider-values-20261022]
- 认证错误：核对密钥有效性、权限与 `baseUrl` 是否与提供方文档一致；用 `apiKeyHelper` 时先在你的主目录下手动运行该命令，确认退出码为 0 且 stdout 是有效 token，并记住它在 project 与 folder 设置中会被忽略。[@ref-fd-byok-helper-scope-20261022]
- 本地模型连不上：确认本地 server 已运行、`baseUrl` 正确（必要时带 `/v1/` 后缀）、模型已拉取。[@ref-fd-byok-local]
- 限流或配额错误：查看提供方的限额并在其控制台监控用量。

区分「配置可读」「模型可选」「请求已发送」「后端可用」的观察点：设置被解析后模型会出现在 `/model` 的 Custom models 区段；`/cost` 能给出实际调用与缓存数据；`Invalid provider` 与认证错误分别对应配置层与请求层失败。组织的 `modelPolicy` 会先决定哪些模型可选，之后再谈请求是否成功。[@ref-fd-byok-usage-20261022][@ref-fd-settings-enterprise][@ref-fd-cli-model-ids]
