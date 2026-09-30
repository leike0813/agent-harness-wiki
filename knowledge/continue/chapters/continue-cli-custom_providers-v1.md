---
schema_version: 3
record_kind: production
edition_id: continue-cli-custom_providers-v1
harness_id: continue
topic: custom_providers
title: "Continue CLI 的自定义 Provider：models 配置、协议、转发与诊断"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-continue-doc-customproviders-naming, ref-continue-doc-ref-models, ref-continue-src-model-fields, ref-continue-src-configservice-blocks, ref-continue-src-common-options, ref-continue-src-auth-stub, ref-continue-src-hub-throws, ref-continue-src-unroll-inject, ref-continue-src-yamlupdater]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-continue-src-model-fields, ref-continue-src-configloader-local, ref-continue-doc-cli-config-secrets, ref-continue-src-createllm, ref-continue-src-adapters-compat]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-continue-src-createllm, ref-continue-src-adapters-switch, ref-continue-src-adapters-compat, ref-continue-src-getllmapi, ref-continue-src-llmclasses, ref-continue-src-llmfromdesc]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-continue-src-model-fields, ref-continue-src-modelservice-chat, ref-continue-doc-cli-tui-slash, ref-continue-src-modelservice-switch, ref-continue-src-tokenizer, ref-continue-src-streamoptions, ref-continue-src-model-roles, ref-continue-doc-cap-manual, ref-continue-doc-ref-models, ref-continue-src-createllm, ref-continue-src-modelcap, ref-continue-src-toolsupport, ref-continue-src-llminfo-types]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-continue-src-streamoptions, ref-continue-src-streamrequest, ref-continue-src-model-completion, ref-continue-src-tokenizer, ref-continue-src-createllm, ref-continue-src-model-requestoptions, ref-continue-src-model-fields, ref-continue-doc-migration-models, ref-continue-doc-config-legacy, ref-continue-src-streambackoff, ref-continue-src-responsesmodel, ref-continue-src-backoff]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-getllmapi, ref-continue-src-adapters-switch, ref-continue-src-modelservice-chat, ref-continue-doc-cli-tui-slash, ref-continue-src-streamrequest, ref-continue-src-backoff, ref-continue-src-logger, ref-continue-src-streambackoff]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-continue-doc-customproviders-naming, ref-continue-doc-ref-models, ref-continue-src-model-fields, ref-continue-src-configservice-blocks, ref-continue-src-common-options, ref-continue-src-auth-stub, ref-continue-src-hub-throws, ref-continue-src-unroll-inject, ref-continue-src-yamlupdater]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-continue-src-model-fields, ref-continue-src-configloader-local, ref-continue-doc-cli-config-secrets, ref-continue-src-createllm, ref-continue-src-adapters-compat]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-continue-src-createllm, ref-continue-src-adapters-switch, ref-continue-src-adapters-compat, ref-continue-src-getllmapi, ref-continue-src-llmclasses, ref-continue-src-llmfromdesc]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-continue-src-model-fields, ref-continue-src-modelservice-chat, ref-continue-doc-cli-tui-slash, ref-continue-src-modelservice-switch, ref-continue-src-tokenizer, ref-continue-src-streamoptions, ref-continue-src-model-roles, ref-continue-doc-cap-manual, ref-continue-doc-ref-models, ref-continue-src-createllm, ref-continue-src-modelcap, ref-continue-src-toolsupport, ref-continue-src-llminfo-types]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: conflict
        source_refs: [ref-continue-src-model-fields, ref-continue-src-modelservice-chat, ref-continue-doc-cli-tui-slash, ref-continue-src-modelservice-switch, ref-continue-src-tokenizer, ref-continue-src-streamoptions, ref-continue-src-model-roles, ref-continue-doc-cap-manual, ref-continue-doc-ref-models, ref-continue-src-createllm, ref-continue-src-modelcap, ref-continue-src-toolsupport, ref-continue-src-llminfo-types]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-continue-src-streamoptions, ref-continue-src-streamrequest, ref-continue-src-model-completion, ref-continue-src-tokenizer, ref-continue-src-createllm, ref-continue-src-model-requestoptions, ref-continue-src-model-fields, ref-continue-doc-migration-models, ref-continue-doc-config-legacy, ref-continue-src-streambackoff, ref-continue-src-responsesmodel, ref-continue-src-backoff]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-continue-src-streamoptions, ref-continue-src-streamrequest, ref-continue-src-model-completion, ref-continue-src-tokenizer, ref-continue-src-createllm, ref-continue-src-model-requestoptions, ref-continue-src-model-fields, ref-continue-doc-migration-models, ref-continue-doc-config-legacy, ref-continue-src-streambackoff, ref-continue-src-responsesmodel, ref-continue-src-backoff]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-continue-src-getllmapi, ref-continue-src-adapters-switch, ref-continue-src-modelservice-chat, ref-continue-doc-cli-tui-slash, ref-continue-src-streamrequest, ref-continue-src-backoff, ref-continue-src-logger, ref-continue-src-streambackoff]
---

## 命名边界与配置入口 {#providers-entry}

先澄清一处命名冲突：本站另一条线（IDE 文档）里 `docs/customize/custom-providers.mdx` 讲的是 **context provider**（`@File`、`@Code` 这类 `@` 引用），不是本章要写的 LLM provider。本章按固定问题集的语义，只写「模型后端/供应商」这件事。[@ref-continue-doc-customproviders-naming]

对 CLI 来说，provider 的唯一配置位置是**被加载那份配置的 `models` 数组**。`models` 是 config.yaml 的顶层键，每个条目至少要有 `name`、`provider`、`model` 三个字段，其余字段可选。[@ref-continue-doc-ref-models][@ref-continue-src-model-fields]

```yaml
models:
  - name: My Model - OpenAI-Compatible
    provider: openai
    apiBase: https://my-endpoint.example/v1
    model: my-custom-model
    apiKey: ${{ secrets.MY_API_KEY }}
    roles:
      - chat
      - edit
```

上面这个形状直接来自 `### models` 参考页的字段表与示例；`apiBase` 覆盖 provider 默认地址、`apiKey` 支持密钥引用、`roles` 决定模型被用在哪些角色上。[@ref-continue-doc-ref-models][@ref-continue-src-model-fields]

除文件外还有两条入口：

- `--model {slug}`（可重复）：把一个 hub 模型作为附加配置注入本次会话，与配置文件里的模型合并。[@ref-continue-src-configservice-blocks][@ref-continue-src-common-options] 需要注意：本提交里 CLI 的认证层是空实现（`AuthConfig` 恒为 `null`），而同目录的 hub 载入工具已明确移除本地 hub 拉取，因此 slug 形式能否匿名解析未在固定来源中证实，确定性更高的是直接在 `models` 里写显式配置。[@ref-continue-src-auth-stub][@ref-continue-src-hub-throws][@ref-continue-src-unroll-inject]
- 首次运行引导：CLI 会把一份托管 Anthropic 模型写进配置文件（provider `anthropic`、`roles: [chat, edit, apply]`、`defaultCompletionOptions`、`capabilities`），这是唯一由 CLI 自己写模型的路径。[@ref-continue-src-yamlupdater]

## 凭据、环境变量与 base URL {#providers-auth}

**凭据**有三种写法，按可信度递增：

1. 明文 `apiKey`：字段属于模型级字段，直接写字符串。[@ref-continue-src-model-fields]
2. 密钥引用 `${{ secrets.NAME }}`：配置在展开（unroll）阶段以 `renderSecrets: true` 渲染，本地 YAML 与平台 assistant 两条路径都开着这个开关；官方文档明确给出这个写法与「把密钥放环境变量」的建议。[@ref-continue-src-configloader-local][@ref-continue-doc-cli-config-secrets]
3. 环境变量：`env` 字段是一个 `字符串|布尔|数字` 的映射，随模型配置一起交给适配器（例如 Bedrock 系的区域/凭据就是这样传进去的）。[@ref-continue-src-createllm][@ref-continue-src-model-fields]

**base URL**：`apiBase` 是可选字符串。对 OpenAI 兼容族，适配器用 `config.apiBase ?? 默认地址`——写了就整体替换默认地址，没写才用内置地址。[@ref-continue-src-adapters-compat] 有一个特例：`ollama` 会在已有 `apiBase` 末尾补 `/v1`（缺了才补），因为 CLI 走的是 OpenAI 兼容通道而不是 core 里的原生 Ollama 实现。[@ref-continue-src-adapters-compat]

**示例（可写入配置文件，凭据只用占位符）**：

```yaml
models:
  - name: Local Ollama
    provider: ollama
    model: qwen2.5-coder:7b
    apiBase: http://127.0.0.1:11434
    roles:
      - chat
```

## 支持的协议与端点形态 {#providers-protocol}

CLI 不经过 `core/llm/llms` 那一套 provider 实现，而是走 `@continuedev/openai-adapters` 的 `constructLlmApi`：`createLlmApi(model)` 只取 `provider`、`model`、`apiKey`、`apiBase`、`requestOptions`、`env` 六个字段构造 `LLMConfig`，然后由 `constructLlmApi` 按 `provider` 字符串分派。[@ref-continue-src-createllm][@ref-continue-src-adapters-switch]

分派分两类：[@ref-continue-src-adapters-switch][@ref-continue-src-adapters-compat]

| 形态 | provider 举例 | 行为 |
| :-- | :-- | :-- |
| 原生 SDK 适配器 | `openai`、`anthropic`、`gemini`、`azure`、`bedrock`、`cohere`、`deepseek`、`moonshot`、`vertexai`、`watsonx`、`llamastack`、`minimax`、`openrouter`、`askSage`、`cometapi`、`jina`、`inception`、`relace`、`clawrouter` | 各自独立的请求与响应实现 |
| OpenAI 兼容层 | `xAI`、`zAI`、`voyage`、`mistral`、`deepinfra`、`vllm`、`groq`、`sambanova`、`text-gen-webui`、`cerebras`、`kindo`、`msty`、`nvidia`、`ovhcloud`、`scaleway`、`fireworks`、`together`、`ncompass`、`novita`、`nebius`、`function-network`、`tensorix`、`llama.cpp`、`llamafile`、`lmstudio`、`ollama` | 用 `OpenAIApi` 打到内置 base URL，可被 `apiBase` 覆盖 |
| 特殊 | `huggingface-inference-api` | `apiBase` 看起来是 OpenAI 兼容路由时按兼容层处理，否则返回 `undefined` |
| 其它 | `ai-sdk` | 走 Vercel AI SDK 适配器；`CONTINUE_USE_AI_SDK=1` 时 `openai`/`anthropic` 也会被改道到这里 |

**未知 provider 的行为**：`constructLlmApi` 落到 `default:` 返回 `undefined`，`createLlmApi` 于是返回 `null`，`getLlmApi` 抛出「Failed to initialize LLM. Please check your configuration.」。也就是说 provider 字符串写错会在会话启动时就暴露，而不是等到第一次请求。[@ref-continue-src-adapters-switch][@ref-continue-src-createllm][@ref-continue-src-getllmapi]

**核心侧另有一套 provider 实现**（`core/llm/llms/index.ts` 的 `LLMClasses` 与 `llmFromDescription`，覆盖 80 余个 provider 类），那是 IDE 扩展的路径；CLI 的固定源码只在个别地方引用 core（消息类型、token 计算），不经过 `llmFromDescription`。两套 provider 名单不完全一致，读者按 CLI 行为排查时要以 `constructLlmApi` 为准。[@ref-continue-src-llmclasses][@ref-continue-src-llmfromdesc][@ref-continue-src-createllm]

## 模型 ID、别名与能力元数据 {#providers-models}

**模型标识**：`model` 是自由字符串，直接原样发给后端；CLI **不做远端模型发现**（没有 `/models` 拉取，也不处理 `AUTODETECT` 这类特殊值）。可选模型列表就是配置里 `models` 数组本身，`/model` 选择器只列出 `roles` 含 `chat`（或未写 `roles`）的条目，显示名优先取 `name`，回退 `model`。[@ref-continue-src-model-fields][@ref-continue-src-modelservice-chat][@ref-continue-doc-cli-tui-slash]

**别名**：`name` 就是显示别名，用来在 `/model` 里区分同 provider 的不同条目；模型切换同时按名字与 provider 匹配。[@ref-continue-src-modelservice-switch]

**上下文与输出上限**：CLI 只认 `defaultCompletionOptions` 里的两个数——`contextLength`（未写时默认 200000）和 `maxTokens`（未写时取 `min(contextLength * 0.35, 64000)`）。它们决定上下文占用显示、自动压缩阈值与请求里的输出上限。[@ref-continue-src-tokenizer][@ref-continue-src-streamoptions]

**能力元数据是一处明确缺口**：schema 里有 `capabilities`（`tool_use`/`image_input`/`next_edit`，并允许未知字符串以保持前向兼容），参考页说它「会覆盖自动探测」，另一页则说「不能覆盖，只能追加」。**而 CLI 根本不读这个字段**：`createLlmApi` 只把六个字段交给适配器，`capabilities` 不在其中；CLI 里唯一与「模型能力」相关的判断是 `utils/modelCapability.ts` 里对 provider/模型名做的正则匹配（`gemini`/`claude`/`gpt`/`o\d`/`kimi`/`qwen`/`llama`/`nemotron`/`grok`/`mistral`），只用来决定用 `Edit` 还是 `MultiEdit` 工具。[@ref-continue-src-model-roles][@ref-continue-doc-cap-manual][@ref-continue-doc-ref-models][@ref-continue-src-createllm][@ref-continue-src-modelcap]

同一件事在两个来源里说法冲突，这里同时保留：

- `docs/reference.mdx` 的 `models` 小节：`capabilities` 是「会覆盖 Continue 基于 provider 和模型名的自动探测」的数组。[@ref-continue-doc-ref-models]
- `docs/customize/deep-dives/model-capabilities.mdx`：明确写「你不能覆盖自动探测——只能追加能力」，并解释空数组不会关掉探测。[@ref-continue-doc-cap-manual]

**工具与图像能力的真实来源**：仓库里另有两套探测实现——`core/llm/toolSupport.ts` 的 `PROVIDER_TOOL_SUPPORT`（按 provider + 模型名正则判断是否支持工具）与 `@continuedev/llm-info` 的模型目录（`contextLength`、`maxCompletionTokens`、`mediaTypes` 等元数据）。二者都由 IDE 侧的 core 使用；本轮固定的 CLI 源码里**没有**引用它们。[@ref-continue-src-toolsupport][@ref-continue-src-llminfo-types][@ref-continue-src-createllm]

## 参数转发、流式与重试 {#providers-forwarding}

**`defaultCompletionOptions` 的转发是白名单映射**。CLI 在发请求前把它翻译成请求体字段，只映射五个键：

| 配置里的键 | 请求体字段 |
| :-- | :-- |
| `maxTokens` | `max_tokens` |
| `temperature` | `temperature` |
| `frequencyPenalty` | `frequency_penalty` |
| `presencePenalty` | `presence_penalty` |
| `topP` | `top_p` |

[@ref-continue-src-streamoptions][@ref-continue-src-streamrequest]

其余 `defaultCompletionOptions` 键（`topK`、`minP`、`stop`、`n`、`reasoning`、`reasoningBudgetTokens`、`promptCaching`、`stream`、`keepAlive`）以及 `contextLength` 不进请求体：`contextLength` 只用于本地 token 预算计算。[@ref-continue-src-model-completion][@ref-continue-src-tokenizer]

**`requestOptions`** 整体交给适配器（`timeout`、`verifySsl`、`caBundlePath`、`proxy`、`noProxy`、`headers`、`extraBodyProperties`、`clientCertificate`），由各适配器自己决定如何应用；`env` 同样原样透传。[@ref-continue-src-createllm][@ref-continue-src-model-requestoptions]

**在同一份 schema 里存在、但 CLI 不消费**的模型字段：`capabilities`、`cacheBehavior`、`embedOptions`、`promptTemplates`、`autocompleteOptions`、`maxStopWords`、`useLegacyCompletionsEndpoint`、`useResponsesApi`。它们能写、能通过校验，但不会改变 CLI 的请求；`embeddingsProvider`/`reranker`/`tabAutocompleteModel` 这些旧格式键属于 `config.json` 时代，CLI 只读 YAML 的 `models`。[@ref-continue-src-model-fields][@ref-continue-doc-migration-models][@ref-continue-doc-config-legacy]

**流式**：请求固定带 `stream: true`，走 `llmApi.chatCompletionStream`；仅当适配器暴露 `responsesStream` 且模型名匹配 `/^(?:gpt-5|gpt-5-codex|o[0-9])/i` 时改走 `responsesStream`。是否走 Responses API 由**模型名正则**判定，配置文件里的 `useResponsesApi` 不参与这个判定。[@ref-continue-src-streambackoff][@ref-continue-src-responsesmodel][@ref-continue-src-streamrequest]

**重试**：外层 `withExponentialBackoff` 包住整个流，内层 `chatCompletionStreamWithBackoff` 处理建流失败。默认参数是最大 10 次重试、初始延迟 1000ms、倍率 1.6、上限 30s、带 50%–100% 抖动的 jitter，前 2 次重试不向用户提示。[@ref-continue-src-backoff][@ref-continue-src-streambackoff]

- 可重试：网络错误码（`ECONNRESET`/`ENOTFOUND`/`ETIMEDOUT`/`EPIPE`/`ECONNREFUSED`）、HTTP 429/502/503/504、错误类型 `server_error`/`rate_limit_exceeded`、以及消息里含 `premature close`/`socket hang up`/`overloaded` 等连接类文案的错误。[@ref-continue-src-backoff]
- 不可重试：上下文超限错误（Anthropic/OpenAI/Mistral 各自的超限文案与 `context_length_exceeded`），由 `isContextLengthError` 识别；也包含用户主动 abort 的情况。非可重试错误会带完整状态码与消息写进错误日志后直接抛出。[@ref-continue-src-backoff][@ref-continue-src-streambackoff]

**对后端的要求**：必须实现 OpenAI 形状的流式 chunk（或对应 provider 的原生协议，由适配器转换），并且错误要带可识别的 `status`/`type`/`message`——重试判定完全依赖这三者，只返回一个笼统 500 且没有 message 的自建网关会失去大部分重试与诊断能力。[@ref-continue-src-backoff][@ref-continue-src-streamrequest]

## 诊断：区分「配置可读」「模型可选」「请求已发出」「后端可用」 {#providers-diagnostics}

- **配置可读**：会话启动即失败是最强的信号。`getLlmApi` 在找不到模型时抛「No models found in the configured assistant」，找不到 chat 角色时抛「No models with the chat role found in the configured assistant」，provider 不认识时抛「Failed to initialize LLM. Please check your configuration.」。三者把「配置没读到 / 没选到 / provider 写错」区分开。[@ref-continue-src-getllmapi][@ref-continue-src-adapters-switch]
- **模型可选**：`/model` 打开选择器，列表就是配置里的 chat 模型；`/info` 显示当前会话信息（含用量与成本）。列表为空说明配置里没有 `roles` 含 `chat` 的条目。[@ref-continue-src-modelservice-chat][@ref-continue-doc-cli-tui-slash]
- **请求已发出**：debug 日志会打印正在构造的流（模型、消息数、工具数）与每个 chunk 的到达；重试从第 3 次起会以 warn 形式打印「第几次重试、延迟多久、错误是什么」。日志文件在 `{continueHome}/logs/cn.log`，`--verbose` 提高终端级别。[@ref-continue-src-streamrequest][@ref-continue-src-backoff][@ref-continue-src-logger]
- **后端实际可用**：只有真正拿到 chunk 才算通。非可重试错误会带完整细节写入日志；上下文超限还会触发压缩/重试链路的显式分支。[@ref-continue-src-streambackoff][@ref-continue-src-backoff]

**缺口**：固定来源里没有「探测某个 provider 的可用模型」「列出 provider 支持的能力」这类命令，`apiKey` 有效性也没有独立的校验子命令；可用的验证方式只有「起一个会话并观察请求日志/响应」。[@ref-continue-src-modelservice-chat][@ref-continue-src-backoff]
