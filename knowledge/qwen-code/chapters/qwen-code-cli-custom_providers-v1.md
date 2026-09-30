---
schema_version: 3
record_kind: production
edition_id: qwen-code-cli-custom_providers-v1
harness_id: qwen-code
topic: custom_providers
title: "Qwen Code CLI 的模型 Provider：入口、认证、协议、模型、元数据、转发、响应与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-readme-acknowledgments]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-overview, ref-qwen-model-providers-supported-auth-types, ref-qwen-model-providers-custom-provider-ids-providerprotocol, ref-qwen-auth-step-1-configure-models-and-providers-in-qwen-settings-j, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-model-providers-resolution-layers-and-atomicity, ref-qwen-settings-settings-files, ref-qwen-settings-configuration-layers]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-qwen-auth-step-2-set-environment-variables, ref-qwen-auth-supported-protocols, ref-qwen-model-providers-resolution-layers-and-atomicity, ref-qwen-auth-recommended-one-file-setup-via-settings-json, ref-qwen-model-providers-setup, ref-qwen-model-providers-api-key-storage, ref-qwen-model-providers-regions, ref-qwen-auth-option-3-alibaba-cloud-token-plan, ref-qwen-auth-security-notes]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-supported-auth-types, ref-qwen-model-providers-transports-used-for-api-requests, ref-qwen-model-providers-openai-compatible-providers-openai, ref-qwen-model-providers-openai-responses-api-openai-responses, ref-qwen-model-providers-anthropic-anthropic, ref-qwen-model-providers-google-gemini-gemini, ref-qwen-model-providers-local-self-hosted-models-via-openai-compatible-api, ref-qwen-auth-supported-protocols]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-overview, ref-qwen-auth-step-3-switch-models-with-model, ref-qwen-model-providers-provider-models-vs-runtime-models, ref-qwen-model-providers-provider-model, ref-qwen-model-providers-runtime-model, ref-qwen-model-providers-runtimemodelsnapshot-lifecycle, ref-qwen-model-providers-key-differences, ref-qwen-model-providers-when-to-use-each, ref-qwen-settings-modelfallbacks, ref-qwen-model-providers-selection-persistence-and-recommendations]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-openai-compatible-providers-openai, ref-qwen-settings-model, ref-qwen-model-providers-override-reasoning-capabilities, ref-qwen-model-providers-reasoning-thinking-configuration, ref-qwen-model-providers-per-provider-behavior, ref-qwen-model-providers-reasoning-false, ref-qwen-model-providers-budget-tokens, ref-qwen-model-providers-image-generation-routes, ref-qwen-model-providers-live-voice-routes, ref-qwen-settings-fastmodel, ref-qwen-settings-advisormodel, ref-qwen-settings-visionmodel, ref-qwen-settings-compactionmodel, ref-qwen-settings-imagemodel, ref-qwen-settings-voicemodel]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-generation-config-layering-the-impermeable-provider-laye, ref-qwen-model-providers-how-it-works, ref-qwen-model-providers-per-field-precedence-for-generationconfig, ref-qwen-model-providers-atomic-field-treatment, ref-qwen-model-providers-example, ref-qwen-model-providers-dynamic-values-in-customheaders, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-model-providers-interaction-with-samplingparams-openai-compatible-only]
  - section_id: providers-responses
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-openai-compatible-providers-openai, ref-qwen-settings-model, ref-qwen-settings-modelfallbacks, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-model-providers-openai-responses-api-openai-responses]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-qwen-model-providers-supported-auth-types, ref-qwen-model-providers-overview, ref-qwen-model-providers-dynamic-values-in-customheaders, ref-qwen-model-providers-resolution-layers-and-atomicity, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-auth-step-3-switch-models-with-model, ref-qwen-settings-model, ref-qwen-auth-removed-qwen-auth-cli-command, ref-qwen-settings-modelfallbacks]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-qwen-model-providers-overview, ref-qwen-model-providers-supported-auth-types, ref-qwen-model-providers-custom-provider-ids-providerprotocol, ref-qwen-auth-step-1-configure-models-and-providers-in-qwen-settings-j, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-model-providers-resolution-layers-and-atomicity, ref-qwen-settings-settings-files, ref-qwen-settings-configuration-layers]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-qwen-auth-step-2-set-environment-variables, ref-qwen-auth-supported-protocols, ref-qwen-model-providers-resolution-layers-and-atomicity, ref-qwen-auth-recommended-one-file-setup-via-settings-json, ref-qwen-model-providers-api-key-storage, ref-qwen-auth-option-3-alibaba-cloud-token-plan, ref-qwen-auth-security-notes]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-qwen-model-providers-supported-auth-types, ref-qwen-model-providers-transports-used-for-api-requests, ref-qwen-model-providers-openai-compatible-providers-openai, ref-qwen-model-providers-openai-responses-api-openai-responses, ref-qwen-model-providers-local-self-hosted-models-via-openai-compatible-api, ref-qwen-auth-supported-protocols]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-qwen-model-providers-overview, ref-qwen-auth-step-3-switch-models-with-model, ref-qwen-model-providers-provider-models-vs-runtime-models, ref-qwen-model-providers-runtimemodelsnapshot-lifecycle, ref-qwen-settings-modelfallbacks, ref-qwen-model-providers-selection-persistence-and-recommendations]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-qwen-settings-model, ref-qwen-model-providers-override-reasoning-capabilities, ref-qwen-model-providers-reasoning-thinking-configuration, ref-qwen-model-providers-per-provider-behavior, ref-qwen-model-providers-reasoning-false, ref-qwen-model-providers-budget-tokens, ref-qwen-model-providers-image-generation-routes, ref-qwen-model-providers-live-voice-routes, ref-qwen-settings-visionmodel, ref-qwen-settings-imagemodel, ref-qwen-settings-fastmodel]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-qwen-model-providers-generation-config-layering-the-impermeable-provider-laye, ref-qwen-model-providers-how-it-works, ref-qwen-model-providers-per-field-precedence-for-generationconfig, ref-qwen-model-providers-atomic-field-treatment, ref-qwen-model-providers-example, ref-qwen-model-providers-dynamic-values-in-customheaders, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-model-providers-interaction-with-samplingparams-openai-compatible-only]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-responses
        status: partial
        source_refs: [ref-qwen-model-providers-openai-compatible-providers-openai, ref-qwen-settings-model, ref-qwen-settings-modelfallbacks, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-model-providers-openai-responses-api-openai-responses]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-qwen-model-providers-supported-auth-types, ref-qwen-model-providers-overview, ref-qwen-model-providers-dynamic-values-in-customheaders, ref-qwen-model-providers-resolution-layers-and-atomicity, ref-qwen-model-providers-selecting-the-openai-api, ref-qwen-auth-step-3-switch-models-with-model, ref-qwen-settings-model, ref-qwen-auth-removed-qwen-auth-cli-command, ref-qwen-settings-modelfallbacks]
---

## 固定来源与范围 {#providers-scope}

本章固定来源为 QwenLM/qwen-code 仓库在提交 `e767e223c5c1d6fe13217d95faf365721e6e3437` 的文档快照，主要依赖以下文件：

- `docs/users/configuration/model-providers.md`：Provider 声明、协议与传输、`generationConfig` 分层、推理配置、Provider/Runtime 模型、解析层与原子性。
- `docs/users/configuration/auth.md`：`/auth` 流程、环境变量与 base URL、Alibaba Cloud Coding Plan/Token Plan、API Key 配置。
- `docs/users/configuration/settings.md`：`model`、`fastModel`、`advisorModel`、`visionModel`、`compactionModel`、`imageModel`、`voiceModel`、`modelFallbacks`、`modelPricing` 等分组。

Qwen Code 最初基于 Google Gemini CLI v0.8.2，自 v0.1 起停止与上游同步并独立发展，因此本章以该固定提交的文档为准描述当前行为 [@ref-qwen-readme-acknowledgments]。文中出现的兼容或映射，只按来源明确写出的方式陈述，不推断继承自 Gemini 的行为。

## Provider 与模型的声明入口 {#providers-entry}

Provider 与模型在 `settings.json` 的 `modelProviders` 中声明：每个键是一个 **provider id**，值是 **模型定义数组**（`ModelConfig[]`），`/model` 选择器据此切换；每个模型条目至少需要 `id`，`envKey` 为可选且推荐（省略时回退到该鉴权类型的默认环境变量名，如 `openai` 的 `OPENAI_API_KEY`），另可带 `name`、`description`、`baseUrl`、`generationConfig`，凭据本身永不写入 settings [@ref-qwen-model-providers-overview]。

内置 provider id 会被自动路由到对应 SDK 协议：`openai`、`anthropic`、`gemini`、`vertex-ai`、`qwen-oauth`；要使用自定义 id（例如把多个 OpenAI 兼容端点归到一个友好名称下），需在顶层 `providerProtocol` 中把它映射到某个内置协议，否则整个条目的模型都不会出现在 `/model` 中并只给出一条警告 [@ref-qwen-model-providers-supported-auth-types] [@ref-qwen-model-providers-custom-provider-ids-providerprotocol]。

```json
{
  "modelProviders": {
    "idealab": [
      { "id": "my-model", "envKey": "IDEALAB_API_KEY", "baseUrl": "https://idealab.example.com/v1" }
    ]
  },
  "providerProtocol": { "idealab": "openai" }
}
```

（示例取自“Custom provider ids”一节 [@ref-qwen-model-providers-custom-provider-ids-providerprotocol]。）

`ModelConfig` 的第一方字段在鉴权文档中列全：`id`（必填，发送给 API 的模型 ID）、`wireApi`（`chat-completions` 或 `responses`，省略即继承 provider 协议）、`name`、`envKey`、`baseUrl`、`generationConfig` [@ref-qwen-auth-step-1-configure-models-and-providers-in-qwen-settings-j]。`wireApi` 同时是 OpenAI 兼容协议的请求格式选择：把它放在 `openai` 模型的 `id`、`envKey`、`baseUrl` 旁即可选用 Responses API，其它取值或把它放到 Anthropic/Gemini/Vertex/Qwen OAuth 模型上都是配置错误 [@ref-qwen-model-providers-selecting-the-openai-api]。

鉴权类型的选定：`security.auth.selectedType` 指出启动时使用的协议；CLI 可用 `--auth-type`（与 `--model` 组合可直接指向某个 provider 条目），这些 CLI 标志先于其它层运行；未配置时回退到 `AuthType.QWEN_OAUTH`。有效 auth/model/credential 按字段各自“第一个存在者胜出”解析，优先级从高到低为：程序化覆盖（`/auth`）、模型 provider 选择、CLI 参数、环境变量、`settings.json`、默认值 [@ref-qwen-model-providers-resolution-layers-and-atomicity]。

`settings.json` 有多作用域；`modelProviders` 本身的合并策略是 **REPLACE**：项目设置中的整个 `modelProviders` 会覆盖用户设置对应部分，而不是与之合并。`/model` 与 `/auth` 会把 `model.name` 和 `security.auth.selectedType` 写回“已定义 `modelProviders` 的最近可写作用域”，否则回退到用户作用域；文档建议把 provider 目录定义在用户级 `~/.qwen/settings.json` [@ref-qwen-settings-settings-files] [@ref-qwen-settings-configuration-layers]。

生效时机：`modelProviders` 的编辑可被运行中的交互会话免重启拾取（文件监听去抖约 300ms，重开 `/model` 可见新条目，当前选择保留）；但 `providerProtocol` 只在启动时读取一次，**需要重启**；改动当前模型的 `wireApi` 会形成不同路由，需显式选择该路由或重启 [@ref-qwen-model-providers-overview]。

## 凭据与 base URL 的提供方式 {#providers-auth}

`envKey` 指定的是 **环境变量名**而非密钥值；凭据不持久化到 settings。密钥按以下优先级（高→低）提供：CLI 标志 `--openai-api-key`、系统环境（`export`/内联）、`.env` 文件、`settings.json` 的 `env` 字段（最低回退，仅在系统环境与 `.env` 都未设置时应用）。`.env` 只加载找到的第一个文件，变量不在多文件间合并 [@ref-qwen-auth-step-2-set-environment-variables]。

协议与环境变量对应关系 [@ref-qwen-auth-supported-protocols]：

| 协议 | `modelProviders` 键 | 环境变量 |
| --- | --- | --- |
| OpenAI 兼容 | `openai` | `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`OPENAI_MODEL`（别名 `QWEN_MODEL`） |
| Anthropic | `anthropic` | `ANTHROPIC_API_KEY`、`ANTHROPIC_BASE_URL`、`ANTHROPIC_MODEL` |
| Google GenAI | `gemini` | `GEMINI_API_KEY`、`GEMINI_MODEL` |
| Vertex AI | `vertex-ai` | `GOOGLE_API_KEY` + `GOOGLE_MODEL`，或无密钥 ADC 的 `GOOGLE_CLOUD_PROJECT` + `GOOGLE_MODEL` |

API Key 的解析层级中，`apiKey` 为：`env[modelProvider.envKey]`（provider 选择层）→ `--openai-api-key`（CLI）→ 协议专属环境变量 → 已弃用的 `security.auth.apiKey`；`baseUrl` 依次取 `modelProvider.baseUrl`、`--openai-base-url`、`OPENAI_BASE_URL` 等协议映射、已弃用的 `security.auth.baseUrl` [@ref-qwen-model-providers-resolution-layers-and-atomicity]。

一次性单文件配置（全部放在 `~/.qwen/settings.json`）的推荐形式是同时给出 `modelProviders`、`env`、`security.auth.selectedType` 与 `model.name` [@ref-qwen-auth-recommended-one-file-setup-via-settings-json]：

```json
{
  "modelProviders": {
    "openai": [
      { "id": "qwen3-coder-plus", "name": "qwen3-coder-plus",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "description": "Qwen3-Coder via Dashscope", "envKey": "DASHSCOPE_API_KEY" }
    ]
  },
  "env": { "DASHSCOPE_API_KEY": "sk-your-token-here" },
  "security": { "auth": { "selectedType": "openai" } },
  "model": { "name": "qwen3-coder-plus" }
}
```

Alibaba Cloud Coding Plan：通过 `/auth` → **Alibaba ModelStudio** → **Coding Plan** 选择区域并输入 `sk-sp-...` 密钥，模型会被自动配置进 `/model` [@ref-qwen-model-providers-setup]。密钥以保留变量名 `BAILIAN_CODING_PLAN_API_KEY` 存储在 `settings.json` 的 `env` 字段，文档建议改放到 `.env` [@ref-qwen-model-providers-api-key-storage]。区域端点：中国 `https://coding.dashscope.aliyuncs.com/v1`，国际 `https://coding-intl.dashscope.aliyuncs.com/v1` [@ref-qwen-model-providers-regions]。

Token Plan（用量计费）则是 `/auth` → Alibaba ModelStudio → **Token Plan**，密钥变量为 `BAILIAN_TOKEN_PLAN_API_KEY`，使用区域专属 `*.maas.aliyuncs.com` 端点，且该 provider 专属密钥需先存在 `settings.json` 中把它声明为 `envKey` 的条目才生效 [@ref-qwen-auth-option-3-alibaba-cloud-token-plan]。安全建议：不要提交密钥，优先使用 `.qwen/.env`，终端若打印凭据视为敏感信息 [@ref-qwen-auth-security-notes]。

## 请求协议、传输与兼容层 {#providers-protocol}

支持的请求协议（effective protocol）包括 `openai`、`anthropic`、`gemini`、`qwen-oauth`、`vertex-ai`；其中 `openai` 默认走 Chat Completions，把模型的 `wireApi` 设为 `responses` 即改用 Responses API，`vertex-ai` 复用 `gemini` 协议与 `@google/genai` 的 Vertex 模式（选择它会设置 `GOOGLE_GENAI_USE_VERTEXAI=true`）[@ref-qwen-model-providers-supported-auth-types]。

有效协议决定传输 [@ref-qwen-model-providers-transports-used-for-api-requests]：

| 有效协议 | 传输 |
| --- | --- |
| `openai` | 官方 `openai` Node.js SDK |
| `openai-responses` | 直接 HTTP/SSE 调 `/v1/responses`（无 SDK）；embeddings 仍用 `openai` |
| `anthropic` | `@anthropic-ai/sdk` |
| `gemini` | `@google/genai` |
| `qwen-oauth` | `openai`（DashScope 兼容的自定义 provider） |

因此配置的 `baseUrl` 必须与对应传输期望的 API 格式兼容；指向托管网关时应写 API 的 `/v1` 根，而非完整 `/v1/chat/completions` 路径，请求路径由 SDK 自行拼接 [@ref-qwen-model-providers-openai-compatible-providers-openai]。Responses 端点若返回带可见思维文本的加密推理，会在跨轮次与 `--resume` 时通过 `reasoning.encrypted_content` 重放；能流式返回 `response.reasoning_text.delta` 的兼容端点也会显示其推理，但没有 `encrypted_content` 的端点无法重放不透明推理状态 [@ref-qwen-model-providers-openai-responses-api-openai-responses]。

Anthropic 与 Gemini 各自使用官方 SDK 形式（`https://api.anthropic.com/v1` / `https://generativelanguage.googleapis.com`），`reasoning` 字段被两方转换器始终遵守 [@ref-qwen-model-providers-anthropic-anthropic] [@ref-qwen-model-providers-google-gemini-gemini]。本地自托管（Ollama、vLLM、LM Studio 等）只要提供 OpenAI 兼容端点，就用 `openai` 鉴权类型加本地 `baseUrl` 配置（如 `http://localhost:11434/v1`、`http://localhost:8000/v1`、`http://localhost:1234/v1`）；无需鉴权的服务器可用任意占位密钥值 [@ref-qwen-model-providers-local-self-hosted-models-via-openai-compatible-api]。

环境变量层面的协议映射（`OPENAI_*`/`ANTHROPIC_*`/`GEMINI_*`/`GOOGLE_*`）见“凭据与 base URL”一节 [@ref-qwen-auth-supported-protocols]。

## 模型 ID、选择与 Provider/Runtime 模型 {#providers-models}

模型以“发起请求的 API 协议 + `id` + 配置的 `baseUrl`”三者共同标识；同一模型与 URL 可分别用 `wireApi: "chat-completions"` 和 `wireApi: "responses"` 定义，若三项全同则第一条生效、后续重复被跳过并给出警告 [@ref-qwen-model-providers-overview]。

选择：启动后用 `/model` 在已配置模型间切换，选择器按协议分组（如 `openai`、`anthropic`、`gemini`），选择跨会话保留；也可用 `qwen --model MODEL_ID` 直接指定 [@ref-qwen-auth-step-3-switch-models-with-model]。

Provider Model 与 Runtime Model 的区别：Provider Model 定义于 `modelProviders`，是完整、原子的配置包，选中时作为不可渗透层应用，并在 `/model` 中带完整元数据显示；Runtime Model 由原始模型 ID（`--model`）、环境变量或 settings 动态创建，不定义于 `modelProviders`，各字段按层独立解析 [@ref-qwen-model-providers-provider-models-vs-runtime-models] [@ref-qwen-model-providers-provider-model] [@ref-qwen-model-providers-runtime-model]。

当不使用 `modelProviders` 配置出一个完整配置时，会自动生成 `RuntimeModelSnapshot` 保存模型 ID、API Key、base URL 与生成配置；其 ID 形如 `$runtime|openai|my-custom-model`，可在 `/model` 列表中作为 runtime 选项切换 [@ref-qwen-model-providers-runtimemodelsnapshot-lifecycle]。两者在配置来源、原子性、可复用性、团队共享与凭据存储上不同：Provider Model 仅以 `envKey` 引用凭据，Runtime Model 可能在快照中捕获实际密钥 [@ref-qwen-model-providers-key-differences]。使用场景上，团队/多模型工作流用 Provider Model，快速试测或临时凭据用 Runtime Model [@ref-qwen-model-providers-when-to-use-each]。

回退：`modelFallbacks` 是逗号分隔、最多 3 个的模型 ID 有序列表，在主动模型遇到容量错误（429/503/529）时依次尝试，也可用 `--fallback-model`，改动需重启 [@ref-qwen-settings-modelfallbacks]。

所选 provider 目录的持久化：`/model` 与 `/auth` 会把选择写回最近已定义 `modelProviders` 的可写作用域，否则回退用户作用域；建议把目录定义在用户级设置以避免作用域覆盖冲突 [@ref-qwen-model-providers-selection-persistence-and-recommendations]。

## 能力元数据与推理配置 {#providers-metadata}

模型条目的 `generationConfig` 承载能力与请求控制元数据：`timeout`、`maxRetries`、`retryInitialDelayMs`、`retryMaxDelayMs`、`enableCacheControl`、`contextWindowSize`（模型假定的最大上下文容量，非单请求上限）、`modalities`（如 `{ "image": true }`）、`customHeaders`、`extra_body`、`samplingParams`，以及 `capabilities`（如 `vision`、`agent`、`reasoning`） [@ref-qwen-model-providers-openai-compatible-providers-openai] [@ref-qwen-settings-model]。

推理（reasoning/thinking）在 `generationConfig.reasoning` 下按 provider 表达。可用 `capabilities.reasoning` 覆盖已知模型的推理格式、可选档位与默认档：已知模型从所选端点的 provider 目录继承省略字段，未知别名则需声明 `profile`、`efforts`、`defaultEffort` 三者；各协议复用已有 profile（Chat 接受 `openai-effort`、`openai-reasoning`、`deepseek-openai`、`dashscope-effort`、`dashscope-thinking`、`qwen-chat-template`；Responses 接受 `openai-reasoning`；Anthropic 接受 `anthropic-manual`、`anthropic-adaptive`、`deepseek-anthropic`；Gemini/Vertex 用 `gemini`）[@ref-qwen-model-providers-override-reasoning-capabilities]。

`reasoning` 的 wire 形态按 provider 不同 [@ref-qwen-model-providers-reasoning-thinking-configuration] [@ref-qwen-model-providers-per-provider-behavior]：OpenAI/DashScope 的 `qwen3.8-max` 家族发扁平 `reasoning_effort`（`max` 被钳到 `xhigh`）；DeepSeek 主机把嵌套 `reasoning.effort` 改写为扁平字段并做档位归一；OpenAI Responses 走 `reasoning: { effort, summary: "auto" }` 且各档位原样透传。`reasoning: false`（布尔字面量）在支持的模型上显式关闭思考，并在请求层通过 `request.config.thinkingConfig.includeThoughts: false` 对一次性调用生效；强制思考的模型会拒绝关闭 [@ref-qwen-model-providers-reasoning-false]。`budget_tokens` 可与 `effort` 并用钉住思考 token 预算（Anthropic 变为 `thinking.budget_tokens`；OpenAI/DeepSeek 保留但当前被服务端忽略） [@ref-qwen-model-providers-budget-tokens]。

视觉/图像/语音路由通过模型条目的能力标志与对应设置表达：`supportsImageGeneration: true` 标记该路由可被内置 `image_gen` 工具使用，`imageOnly: true` 表示专用图像路由并不出现在普通选择器（也隐含图像生成能力） [@ref-qwen-model-providers-image-generation-routes]；`realtimeOnly: true` 标记 DashScope Realtime 语音路由，只能经 `experimental.liveVoice.model` 选作 Live Voice [@ref-qwen-model-providers-live-voice-routes]。

侧模型路由由下列设置驱动，留空时回退主模型：`fastModel`（建议/推测执行）、`advisorModel`（`/advisor` 二次意见）、`visionModel`（视觉桥，显式设置会授权跨 provider 调用）、`compactionModel`（压缩）、`imageModel`（`image_gen` 工具，需所选路由声明 HTTPS `baseUrl` 与 `envKey`）、`voiceModel`（语音转写） [@ref-qwen-settings-fastmodel] [@ref-qwen-settings-advisormodel] [@ref-qwen-settings-visionmodel] [@ref-qwen-settings-compactionmodel] [@ref-qwen-settings-imagemodel] [@ref-qwen-settings-voicemodel]。

生效时机：推理改动在下一次用户提示前生效，其请求、重试与子代理共享捕获的推理配置；无效更新保留旧配置并记录模型/字段错误；`capabilities.reasoning` 不改变端点、凭据或图像模型生命周期 [@ref-qwen-model-providers-override-reasoning-capabilities]。

## 参数分层与请求映射 {#providers-forwarding}

模型配置解析遵循严格分层，关键规则是 **modelProvider 层不可渗透**。当从 `modelProviders` 选中一个模型时，其整个 `generationConfig` 被 **原子应用**，下层（CLI/env/settings）完全不参与 `generationConfig` 解析；provider 未定义的字段被置为 `undefined`（不从 settings 继承），形成自包含的“密封包”。因此若模型列于 `modelProviders`，必须把该模型的特定生成设置放进对应 provider 条目，顶层 `model.generationConfig`（含 `contextWindowSize`、`modalities`、`customHeaders`、`extra_body`）会被忽略 [@ref-qwen-model-providers-generation-config-layering-the-impermeable-provider-laye] [@ref-qwen-model-providers-how-it-works]。

逐字段优先级：程序化覆盖（运行时 `/model`、`/auth`）> `modelProviders[authType][].generationConfig`（不可渗透层，完全替换所有 generationConfig 字段）> `settings.model.generationConfig`（仅 Runtime Model 使用）> 内容生成器默认值（仅 Runtime Model） [@ref-qwen-model-providers-per-field-precedence-for-generationconfig]。

`samplingParams`、`customHeaders`、`extra_body` 被当作 **原子对象**：provider 值整体替换，不做合并 [@ref-qwen-model-providers-atomic-field-treatment]。举例：当 `gpt-4o` 从 `modelProviders` 选中时，`timeout` 取 provider 的 60000，`samplingParams.temperature` 取 provider 的 0.2，而 provider 未定义的 `samplingParams.max_tokens` 为 `undefined`（不继承 settings 的 1000）；若改用 `--model gpt-4` 走 Runtime Model，则全部取自 settings [@ref-qwen-model-providers-example]。

`customHeaders` 的值可含占位符 `${session_id}`，按请求展开为当前会话 ID；但它只有同时开启 `outboundCorrelation.allowDynamicHeaderValues` 才会真正发送，否则含占位符的值被丢弃并在启动时告警，绝不会以字面量发送 [@ref-qwen-model-providers-dynamic-values-in-customheaders]。注意 `wireApi` 只是本地路由元数据，不属于 `generationConfig`/`extra_body`，不会进入请求体 [@ref-qwen-model-providers-selecting-the-openai-api]。

OpenAI 兼容下 `samplingParams` 与 `reasoning` 存在交互：除已知 GPT 模型与带显式推理能力的模型外，一旦设置 `generationConfig.samplingParams`，这些键会原样发往 wire 并跳过单独的 `reasoning` 注入，可能静默丢弃 `reasoning`；Anthropic 与 Gemini 转换器不受影响，始终直接读 `reasoning.effort` [@ref-qwen-model-providers-interaction-with-samplingparams-openai-compatible-only]。

## 流式、工具调用、错误与重试 {#providers-responses}

固定来源对这段只建立了一部分行为。可确认的部分：OpenAI 兼容条目的 `generationConfig` 支持 `maxRetries`、`retryInitialDelayMs`、`retryMaxDelayMs`，并可为本地慢速服务设置 `streamIdleTimeoutMs` 控制流式分块间静默时长（默认由 `QWEN_STREAM_IDLE_TIMEOUT_MS` 决定，`0` 关闭空闲守卫），另有 15 分钟流生命期上限 `QWEN_STREAM_MAX_LIFETIME_MS` [@ref-qwen-model-providers-openai-compatible-providers-openai] [@ref-qwen-settings-model]。容量错误（429/503/529）可用 `modelFallbacks` 依序回退 [@ref-qwen-settings-modelfallbacks]。

文档明确写到，当 API 请求失败时 **不做端点探测或自动回退**：`selectedType: "openai"` 启动时可在无匹配 Chat 路由时解析一个 `wireApi: "responses"` 的模型，但请求失败不会自动切换；模型选择器与会话记录保留有效协议以便两条路由独立选择与恢复 [@ref-qwen-model-providers-selecting-the-openai-api]。Responses 端点在返回加密推理时跨轮次与 `--resume` 重放，但无 `encrypted_content` 的端点无法重放不透明推理状态 [@ref-qwen-model-providers-openai-responses-api-openai-responses]。

缺口（因此本题记为 partial）：固定文档未描述工具调用在流式响应中的具体解析或失败处理、SSE/HTTP 错误码、错误重试的上限与退避实现细节，也未规定宿主对后端“必须满足”的流式约定；这些问题需要在源码或运行行为中进一步确认，本页不编造。

## 诊断：配置可读、可选、已发送与后端可用 {#providers-diagnostics}

可观察到的一致性检查分层如下。**配置可读**：启动/加载期会给出警告——自定义 provider id 未映射 `providerProtocol` 时整条目被跳过、重复模型条目被跳过并告警、含占位符但未开启动态头的 header 被丢弃并告警 [@ref-qwen-model-providers-supported-auth-types] [@ref-qwen-model-providers-overview] [@ref-qwen-model-providers-dynamic-values-in-customheaders]。解析本身按层可归因：文档建议定义 provider 目录以便切换“atomic、source-attributed、debuggable”，无目录时解析器混用层生成 Runtime Model [@ref-qwen-model-providers-resolution-layers-and-atomicity]。

**模型可选**：`/model` 选择器按协议分组列出已配置模型，若某 provider 条目被跳过其模型不会出现；`/auth` 可查看/切换鉴权类型 [@ref-qwen-model-providers-selecting-the-openai-api] [@ref-qwen-auth-step-3-switch-models-with-model]。

**请求已发送**：可开启 `model.enableOpenAILogging` 把 OpenAI API 调用请求与响应写为 JSON 文件，`model.openAILoggingDir` 指定目录（默认 `logs/openai`），`model.openAILogRetentionDays` 控制保留天数 [@ref-qwen-settings-model]。

**后端实际可用**：固定来源明确提供的入口是 `/doctor`（用于检查当前鉴权）以及容量错误时的 `modelFallbacks` 回退 [@ref-qwen-auth-removed-qwen-auth-cli-command] [@ref-qwen-settings-modelfallbacks]。缺口（因此本题记为 partial）：文档未给出对“后端是否真正可达/健康”的内置探测或连通性检查命令，也未描述请求级错误触发时的诊断输出格式；这些需在源码或运行行为中确认，本页不编造。
