---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-custom_providers-v1
harness_id: roo-code
topic: custom_providers
title: "Roo Code 的自定义 Provider：配置档案与凭据、协议与端点形态、模型元数据、参数转发与诊断"
sections:
  - section_id: providers-entry
    surface_ids: [vscode]
    source_refs: [ref-roo-prov-code-names, ref-roo-prov-code-modelkeys, ref-roo-prov-code-profiles, ref-roo-prov-code-secrets, ref-roo-prov-code-modeapiconfigs, ref-roo-prov-doc-export, ref-roo-prov-doc-security, ref-roo-prov-code-openai]
  - section_id: providers-auth
    surface_ids: [vscode]
    source_refs: [ref-roo-prov-code-secretkeys, ref-roo-prov-code-openai-handler, ref-roo-prov-code-openrouter-body, ref-roo-prov-code-ollama, ref-roo-prov-code-lmstudio, ref-roo-prov-code-litellm, ref-roo-prov-doc-security, ref-roo-prov-code-azure-default]
  - section_id: providers-protocol
    surface_ids: [vscode]
    source_refs: [ref-roo-prov-code-names, ref-roo-prov-code-retired, ref-roo-prov-code-factory, ref-roo-prov-code-openai-handler, ref-roo-prov-code-compat-base, ref-roo-prov-doc-native-tools, ref-roo-prov-code-responses]
  - section_id: providers-models
    surface_ids: [vscode]
    source_refs: [ref-roo-prov-code-modelkeys, ref-roo-prov-code-static-models, ref-roo-prov-code-cache-get, ref-roo-prov-code-cache-ttl, ref-roo-prov-code-cache-init, ref-roo-prov-code-cache-refresh, ref-roo-prov-code-model-migrations]
  - section_id: providers-parameters
    surface_ids: [vscode]
    source_refs: [ref-roo-prov-code-modelinfo, ref-roo-prov-code-cache-get, ref-roo-prov-code-azure-default, ref-roo-prov-code-params, ref-roo-prov-code-openai-handler, ref-roo-prov-code-maxoutput]
  - section_id: providers-runtime
    surface_ids: [vscode]
    source_refs: [ref-roo-prov-code-stream, ref-roo-prov-code-handler-iface, ref-roo-prov-code-error, ref-roo-prov-code-backoff, ref-roo-prov-code-validate, ref-roo-prov-code-checkkey, ref-roo-prov-code-cache-get, ref-roo-prov-doc-security]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [vscode]
        section_id: providers-entry
        status: answered
        source_refs: [ref-roo-prov-code-profiles, ref-roo-prov-code-secrets, ref-roo-prov-code-modeapiconfigs]
  - question_id: providers.auth
    answers:
      - surface_ids: [vscode]
        section_id: providers-auth
        status: answered
        source_refs: [ref-roo-prov-code-secretkeys, ref-roo-prov-code-openai-handler, ref-roo-prov-code-ollama]
  - question_id: providers.protocol
    answers:
      - surface_ids: [vscode]
        section_id: providers-protocol
        status: partial
        source_refs: [ref-roo-prov-code-names, ref-roo-prov-code-factory, ref-roo-prov-code-compat-base]
  - question_id: providers.models
    answers:
      - surface_ids: [vscode]
        section_id: providers-models
        status: answered
        source_refs: [ref-roo-prov-code-modelkeys, ref-roo-prov-code-static-models, ref-roo-prov-code-cache-get, ref-roo-prov-code-cache-refresh]
  - question_id: providers.metadata
    answers:
      - surface_ids: [vscode]
        section_id: providers-parameters
        status: answered
        source_refs: [ref-roo-prov-code-modelinfo, ref-roo-prov-code-maxoutput]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [vscode]
        section_id: providers-parameters
        status: answered
        source_refs: [ref-roo-prov-code-params, ref-roo-prov-code-openai-handler]
  - question_id: providers.responses
    answers:
      - surface_ids: [vscode]
        section_id: providers-runtime
        status: answered
        source_refs: [ref-roo-prov-code-stream, ref-roo-prov-code-error, ref-roo-prov-code-backoff]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: providers-runtime
        status: answered
        source_refs: [ref-roo-prov-code-validate, ref-roo-prov-code-checkkey, ref-roo-prov-code-error]
---

## Provider 的选择与配置档案 {#providers-entry}

固定来源是官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`，本章针对 `vscode` 界面。Roo Code 里"接一个 provider"不是在文件里写条目，而是在设置里选一个 provider id 并填该 provider 的字段；一批这样的设置叫一个 **API 配置档案（profile）**。

- 选择入口：设置页 Providers 分页的 provider 下拉（对应字段 `apiProvider`），以及模型下拉（字段 `apiModelId`，键名按 provider 不同，见 `modelIdKeysByProvider`）。[@ref-roo-prov-code-names][@ref-roo-prov-code-modelkeys]
- 档案结构：`providerProfilesSchema = { currentApiConfigName, apiConfigs, modeApiConfigs?, migrations? }`。`apiConfigs` 是"档案名 → 该档案全部设置"的字典，`modeApiConfigs` 是"模式 slug → 档案 id"的映射。[@ref-roo-prov-code-profiles]
- 存储位置：整份档案字典序列化成一条 JSON 字符串，存在 VS Code 的 **SecretStorage** 里，键名由 `SCOPE_PREFIX = "roo_cline_config_"` 加 `api_config` 拼成（`roo_cline_config_api_config`）。因此没有"provider 配置文件"可以手工编辑，改配置只能通过界面或导入导出。[@ref-roo-prov-code-secrets]
- 每模式绑定：`modeApiConfigs` 把模式 slug 指向某个档案 id；老安装升级时若没有这张表，会用当前档案给所有模式播种一份。[@ref-roo-prov-code-modeapiconfigs] 切换模式时由 `handleModeSwitch` 读取并激活对应档案。[@ref-roo-prov-code-profiles]
- 导入导出：设置页导出的是 `{ providerProfiles, globalSettings }` 形状的 JSON（默认文件名 `roo-code-settings.json`），导入按合并语义应用；因为 API key 属于 `providerProfiles`，导出的文件里**含明文密钥**。[@ref-roo-prov-doc-export][@ref-roo-prov-doc-security]

一个仅本地可用、不需要真实密钥的配置示例（字段名取自 `openAiSchema` 的 `openAiBaseUrl`/`openAiApiKey`/`openAiModelId`，这是"OpenAI Compatible"路径的写法）[@ref-roo-prov-code-openai]：

```json
{
  "providerProfiles": {
    "currentApiConfigName": "local",
    "apiConfigs": {
      "local": {
        "id": "local",
        "apiProvider": "openai",
        "openAiBaseUrl": "http://127.0.0.1:8080/v1",
        "openAiApiKey": "your-token",
        "openAiModelId": "my-model",
        "openAiStreamingEnabled": true
      }
    }
  }
}
```

该示例只演示字段名与形状；要真正生效仍需通过设置面板或 Import 写入，直接编辑文件不会被读取。

## 凭据、环境变量与 base URL {#providers-auth}

- **凭据来源**：所有 provider 的 API key 都是 `SECRET_STATE_KEYS` 里的键（例如 `apiKey`、`openRouterApiKey`、`openAiApiKey`、`litellmApiKey`、`ollamaApiKey`、`bedrock` 的 `awsAccessKey`/`awsSecretKey` 等），由 `ContextProxy` 读写 `context.secrets`。[@ref-roo-prov-code-secretkeys]
- **没有环境变量回退**：固定来源里不存在"从 `OPENAI_API_KEY` 之类的环境变量读 key"的路径；全局设置里也没有对应的键。工具层面的唯一环境变量用法是 MCP 配置里的 `${env:NAME}` 展开（见 MCP 章）。[@ref-roo-prov-code-secretkeys]
- **base URL 与默认值**（字段名 → 默认值）：[@ref-roo-prov-code-openai-handler][@ref-roo-prov-code-openrouter-body][@ref-roo-prov-code-ollama][@ref-roo-prov-code-lmstudio][@ref-roo-prov-code-litellm]

| Provider | 字段 | 默认值 |
| :-- | :-- | :-- |
| OpenAI（自定义/兼容） | `openAiBaseUrl` | `https://api.openai.com/v1`；`openAiApiKey` 缺省时字面量 `not-provided` |
| OpenRouter | `openRouterBaseUrl` | `https://openrouter.ai/api/v1` |
| Ollama（原生） | `ollamaBaseUrl` | `http://localhost:11434`，可选 `ollamaApiKey` 变成 `Authorization: Bearer` |
| LM Studio | `lmStudioBaseUrl` | `http://localhost:1234`（代码再拼 `/v1`），apiKey 固定 `noop` |
| LiteLLM | `litellmBaseUrl` | `http://localhost:4000`，`litellmApiKey` 缺省时用 `dummy-key` |
| Ollama / LM Studio / LiteLLM | 模型 id | `ollamaModelId` / `lmStudioModelId` / `litellmModelId` |

- **凭据写法建议**：因为 key 只存在于 SecretStorage 与导出文件里，示例中一律写占位值（`your-token`）；团队共享配置时用导入导出流程而不是提交含密钥的文件，文档也把导出文件称为"高度敏感"。[@ref-roo-prov-doc-security]
- **自托管场景**：本地 provider（Ollama、LM Studio）接受空 key；LiteLLM 的 `dummy-key` 与 LM Studio 的 `noop` 说明这些端点默认不做鉴权。[@ref-roo-prov-code-litellm][@ref-roo-prov-code-lmstudio]
- **Azure/企业分支**：`openai`（自定义）在 host 为 `azure.com`、以 `.azure.com` 结尾，或 `openAiUseAzure` 为真时走 Azure 形态；`packages/types/src/providers/openai.ts` 的常量 `azureOpenAiDefaultApiVersion` 是 `2024-08-01-preview`，而 handler 里 Azure AI Inference 分支的 `api-version` 查询参数缺省是 `2024-05-01-preview`，两者不是同一个默认值。[@ref-roo-prov-code-openai-handler][@ref-roo-prov-code-azure-default]

## 协议、端点形态与兼容层 {#providers-protocol}

固定提交里可选的 provider id 由 `providerNames` 定义（动态、本地、内部、自定义、faux 五组加显式 id，共 27 个），另有 9 个已退役 id：`cerebras`、`chutes`、`deepinfra`、`doubao`、`featherless`、`groq`、`huggingface`、`io-intelligence`、`roo`。选中已退役 id 时构建请求会直接抛错，而不是静默降级。[@ref-roo-prov-code-names][@ref-roo-prov-code-retired]

分组含义：[@ref-roo-prov-code-names]

- 动态（从远端拉模型列表）：`openrouter`、`vercel-ai-gateway`、`litellm`、`requesty`、`unbound`、`poe`。
- 本地：`ollama`、`lmstudio`。
- 内部：`vscode-lm`（用 VS Code Language Model API，模型由其它扩展提供）。
- 自定义/兼容：`openai`（自填 base URL 走 OpenAI 协议）。
- 显式 id（各自原生实现）：`anthropic`、`bedrock`、`baseten`、`deepseek`、`fireworks`、`gemini`、`gemini-cli`、`mistral`、`moonshot`、`minimax`、`openai-codex`、`openai-native`、`qwen-code`、`sambanova`、`vertex`、`xai`、`zai`。

请求构造走一个按 `apiProvider` 分派的工厂 `buildApiHandler`：每个分支实例化对应 handler 类，工厂没有对应分支时抛"不受支持/已退役"的错误；`vertex` 还会按模型名在 Anthropic 与 Google 两条实现间分流。[@ref-roo-prov-code-factory]

已知缺口：`gemini-cli` 出现在 `providerNames` 里，但 `buildApiHandler` 没有它的分支，因此会落到默认的 Anthropic handler；这是固定提交里的不一致。[@ref-roo-prov-code-factory]

**"OpenAI Compatible" 有两套实现**：[@ref-roo-prov-code-openai-handler][@ref-roo-prov-code-compat-base]

- `openai` handler（用户可见的 OpenAI Compatible）用 OpenAI SDK，可改 base URL、headers，支持 Azure 分支。
- `src/api/providers/openai-compatible.ts` 是基于 Vercel AI SDK 的 `createOpenAICompatible` 基类（`OpenAICompatibleConfig`：providerName/baseURL/apiKey/modelId/modelInfo/headers/useMaxTokens/modelMaxTokens/temperature），在本提交里只有 Moonshot handler 继承它。

**工具协议只有一种**：文档明确 Roo Code 只支持原生 tool calling，没有 XML 回退；工具定义按 OpenAI 的 tools schema 发送，模型必须支持函数调用，否则无法使用。[@ref-roo-prov-doc-native-tools] 响应端点形态按 provider 不同：`openai-native` 对所有模型走 Responses API；多数兼容 provider 走 chat completions。[@ref-roo-prov-code-responses]

## 模型 ID、默认模型与发现 {#providers-models}

- **模型 id 字段**：每个 provider 有自己的键（如 `openAiModelId`、`openRouterModelId`、`ollamaModelId`、`litellmModelId`、`vsCodeLmModelSelector` 复合对象），由 `modelIdKeysByProvider` 与 `getModelId()` 统一读取。[@ref-roo-prov-code-modelkeys]
- **默认模型**：静态表放在 `packages/types/src/providers/*.ts`，经 `providers/index.ts` 汇总，`getProviderDefaultModelId()` 按 provider 取默认 id；例如 `openRouterDefaultModelId`、`openAiNativeDefaultModelId`、`litellmDefaultModelId`。[@ref-roo-prov-code-static-models]
- **发现与缓存**：`getModels()` 先查内存缓存，未命中才按 provider 分发到各自的 fetcher（OpenRouter `/models`、LiteLLM `/v1/model/info`、Ollama `/api/tags` + `/api/show`、LM Studio `/v1/models` 等），只有拿到非空结果才写缓存。[@ref-roo-prov-code-cache-get] 内存缓存 TTL 为 5 分钟，磁盘上按 provider 存 `PROVIDER_models.json` 并在读取时用 Zod 校验。[@ref-roo-prov-code-cache-ttl]
- **刷新时机**：扩展激活后 2 秒对公开 provider（`openrouter`、`vercel-ai-gateway`）做一次后台刷新；界面上的刷新动作走 `flushModels(..., true)`；刷新时若结果为空或报错会保留旧缓存，并对并发刷新做去重。[@ref-roo-prov-code-cache-init][@ref-roo-prov-code-cache-refresh]
- **别名与迁移**：`MODEL_MIGRATIONS` 在固定提交里是空对象，即没有活动的模型重命名表；因此"旧模型 id 自动映射到新 id"这类行为不存在，模型选错只会得到后端的 404/400。[@ref-roo-prov-code-model-migrations]

## 能力元数据与参数转发 {#providers-parameters}

模型能力由 `ModelInfo` 表达（`modelInfoSchema`），关键字段：`maxTokens`、`maxThinkingTokens`、`contextWindow`、`supportsImages`、`supportsPromptCache`、`supportsReasoningBudget`/`supportsReasoningEffort`/`requiredReasoningBudget`、`supportsVerbosity`、`supportsTemperature`/`defaultTemperature`、`inputPrice`/`outputPrice`/`cacheWritesPrice`/`cacheReadsPrice`、`tiers`、`excludedTools`/`includedTools`。[@ref-roo-prov-code-modelinfo]

静态 provider 的能力写在上面的静态表里；动态 provider 来自 fetcher 返回（如 OpenRouter 的模型元数据），本地 provider 在 fetcher 拿不到时退回静态默认（如 `openAiModelInfoSaneDefaults`、`ollamaDefaultModelInfo`）。[@ref-roo-prov-code-cache-get][@ref-roo-prov-code-azure-default]

**哪些配置会被写进请求**（`getModelParams`）：[@ref-roo-prov-code-params]

| 设置字段 | 转发结果 |
| :-- | :-- |
| `modelMaxTokens` | 计算出的 `maxTokens`（并受 `getModelMaxOutputTokens` 的上下文比例约束） |
| `modelTemperature` | `temperature`（推理预算型模型会被强制为 1.0） |
| `reasoningEffort` + `enableReasoningEffort` | 由 `shouldUseReasoningBudget`/`shouldUseReasoningEffort` 决定走 `reasoning.budget_tokens` 还是 `reasoning.effort`；预算会被夹到 `maxTokens` 的 80% 以内 |
| `verbosity` | 仅当模型元数据 `supportsVerbosity === true` 时转发，默认 `medium` |
| `modelMaxThinkingTokens` | Anthropic 系列的 thinking 预算 |

**只影响界面或客户端行为、不进请求体的字段**：`includeMaxTokens`（只是开关）、`rateLimitSeconds`、`consecutiveMistakeLimit`、`todoListEnabled`（只影响提示里的环境信息）、`openAiStreamingEnabled`、`openAiUseAzure`/`azureApiVersion`（决定端点形态）、`openRouterSpecificProvider`（选择上游端点）、`openAiHeaders`、`anthropicBeta1MContext`（转为 beta 头）等。[@ref-roo-prov-code-params][@ref-roo-prov-code-openai-handler]

缺省与门控逻辑集中在 `src/shared/api.ts`：`getModelMaxOutputTokens` 负责把输出上限夹到上下文窗口的比例内，并在 Anthropic 下用固定兜底值。[@ref-roo-prov-code-maxoutput]

## 流式响应、错误与诊断 {#providers-runtime}

- **流式契约**：所有 handler 的 `createMessage` 返回 `ApiStream = AsyncGenerator of ApiStreamChunk`，chunk 类型包括 `text`、`reasoning`、`usage`、`tool_call`（`tool_call_start`/`delta`/`end`/`partial`）、`grounding`、`thinking_complete` 与 `error`；工具参数是增量流出的，所以调用可以在参数生成过程中开始执行。[@ref-roo-prov-code-stream][@ref-roo-prov-code-handler-iface]
- **错误处理**：`handleProviderError` 把底层错误统一包成 `PROVIDER completion error: MESSAGE`，保留 status、errorDetails、code 等字段供上层与界面判断；界面对 400/401/402/403/429 有各自的提示文案。[@ref-roo-prov-code-error]
- **重试与退避**：首块错误、流中错误与空响应都会触发共享的指数退避，上限 `MAX_EXPONENTIAL_BACKOFF_SECONDS = 600` 秒，并按限流信息调整下限；这不是 provider 级别的重试策略，而是任务级的重试循环。[@ref-roo-prov-code-backoff]
- **分层诊断**：[@ref-roo-prov-code-validate][@ref-roo-prov-code-checkkey][@ref-roo-prov-code-cache-get][@ref-roo-prov-code-error]
  1. **配置是否可读**：`validateApiConfiguration` 按 provider 检查必填项（缺 key、缺 model id、缺 region、缺模型选择器会给出对应文案）。
  2. **是否已配置**：`checkExistKey` 判断"有没有可用的凭据"，`fake-ai`、`openai-codex`、`qwen-code` 被视为始终配置好。
  3. **模型是否可选**：模型列表来自缓存或 fetcher；列表为空且缓存为空时说明该 provider 的 fetcher 失败或未配置 base URL。
  4. **请求是否发出并可用**：失败会以 `api_failure` 形式显示在聊天里，带 HTTP 状态与包装后的消息；排查网络层可用 VS Code 设置 `roo-cline.debugProxy.*` 把请求导向本地代理。
  5. **注意**：导出文件包含明文 API key，诊断时不要直接把它贴出来。[@ref-roo-prov-doc-security]
