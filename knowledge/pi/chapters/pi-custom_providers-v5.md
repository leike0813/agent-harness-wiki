---
schema_version: 3
record_kind: production
edition_id: pi-custom_providers-v5
harness_id: pi
topic: custom_providers
title: Pi 自定义 provider：入口、模型与凭据（固定源码 83692682、20038712 与 6fb2e781）
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs:
      - ref-pi-cp-doc-registration
      - ref-pi-cp-doc-model-replacement
      - ref-pi-providers-azure-id
      - ref-pi-providers-azure-deployment-map
      - ref-pi-providers-azure-custom-model
  - section_id: providers-models
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-models-entry
      - ref-pi-providers-api-types
      - ref-pi-providers-sampling-fields
      - ref-pi-providers-sampling-types
      - ref-pi-providers-sampling-scope
      - ref-pi-providers-sampling-merge
      - ref-pi-providers-sampling-overrides
      - ref-pi-providers-compat-schema-source
      - ref-pi-providers-compat-schema-published
      - ref-pi-config-schema-generation-paths
      - ref-pi-providers-classifier-models-doc
      - ref-pi-providers-classifier-api-types
      - ref-pi-providers-classifier-context-images
      - ref-pi-providers-classifier-images-doc
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-auth-order
  - section_id: providers-behavior
    surface_ids: [cli]
    source_refs:
      - ref-pi-cp-doc-registration
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs:
          - ref-pi-cp-doc-registration
          - ref-pi-providers-azure-id
          - ref-pi-providers-azure-deployment-map
          - ref-pi-providers-azure-custom-model
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs:
          - ref-pi-providers-auth-order
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-pi-providers-api-types
          - ref-pi-providers-sampling-scope
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-pi-providers-models-entry
          - ref-pi-providers-sampling-fields
          - ref-pi-providers-sampling-types
          - ref-pi-providers-sampling-scope
          - ref-pi-providers-sampling-merge
          - ref-pi-providers-sampling-overrides
          - ref-pi-providers-classifier-models-doc
          - ref-pi-providers-classifier-images-doc
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs:
          - ref-pi-providers-models-entry
          - ref-pi-providers-compat-schema-source
          - ref-pi-providers-compat-schema-published
          - ref-pi-providers-classifier-api-types
          - ref-pi-providers-classifier-context-images
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-behavior
        status: partial
        source_refs:
          - ref-pi-cp-doc-registration
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-behavior
        status: partial
        source_refs:
          - ref-pi-cp-doc-registration
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-behavior
        status: partial
        source_refs:
          - ref-pi-cp-doc-registration
---
固定来源分三段。注册入口、凭据顺序与 `models.json` 的基本字段按 pi 仓库提交 83692682；模型条目上的按思考级别采样参数按提交 20038712；Azure provider 标识与改名、classifier 模型清单、兼容元数据类型的搬迁改按提交 6fb2e781（`packages/coding-agent/docs/providers.md`、`packages/coding-agent/docs/models.md`、`packages/ai/src/types.ts`、`packages/ai/src/providers/compat-schema.ts`、`packages/ai/src/providers/model-schema.ts`、`packages/coding-agent/schemas/models.schema.json`、`packages/coding-agent/scripts/generate-schemas.ts`）。相对 pi-custom_providers-v4 的实质变化有三处：Azure 的 provider ID 由 `azure-openai-responses` 改名为 `azure` 并扩展到 Foundry 模型；classifier 模型清单新增 OpenAI 的 `gpt-6-luna`；`types.ts` 里 413 行改动是把兼容与模型元数据类型搬到 独立 schema 模块并由此生成 `models.schema.json`，字段集合逐个比对没有增减。v4 中未被本章重写的结论仍按 83692682 阅读。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 注册 provider {#providers-entry}

`pi.registerProvider()` 从扩展工厂调用，Pi 会等待异步工厂完成再继续启动，因此在工厂里注册的 provider 可用于启动期模型选择与 `pi --list-models`。[@ref-pi-cp-doc-registration] 当前来源给出两种注册形态：注册来自 `@earendil-works/pi-ai` 的完整 `Provider`（具备原生鉴权、过滤、发现、刷新与流式行为），或按旧配置形态注册 provider 名称加 `ProviderConfig`；文档建议新的集成优先用完整 provider，Pi 会把 `models.json` 的覆盖合成到已注册的原生 provider 之上。[@ref-pi-cp-doc-registration] 相对 v2，provider 扩展的类型导入包名同样随项目改名为 `@earendil-works/pi-ai`。

只为既有 provider 填 `baseUrl` 或 `headers` 会保留它的内置模型；在旧配置形态里给出 `models` 则替换该 provider 在 chat、image 与 classifier 操作上的全部模型。`type` 省略时按 `"chat"` 处理，image 与 classifier 模型需要显式判别字段，并通过 `images`／`classifiers` 字段以各自 `api` 值为键给出实现。[@ref-pi-cp-doc-model-replacement]

内置 Azure provider 的 ID 已改名。文档写明 provider ID 是 `azure`（formerly `azure-openai-responses`），并且要作为 `auth.json`、`models.json`、`settings.json` 里的键，以及模型引用（如 `--model azure/gpt-5.4`）里的前缀。[@ref-pi-providers-azure-id] 与改名同时扩了服务面：`azure` 用 Responses API 服务 OpenAI 模型，用 Chat Completions 服务 Microsoft Foundry 模型，例如 `azure/deepseek-v4-pro`。类型侧的 `KnownApi` 仍保留 `azure-openai-responses` 作为 api id——改名的是 provider 标识，不是 api 标识；`KnownProvider` 里的 `azure` 项在上一固定来源已经存在，本轮未变。

凭据仍是 `AZURE_OPENAI_API_KEY` 加 `AZURE_OPENAI_BASE_URL` 或 `AZURE_OPENAI_RESOURCE_NAME`；`ai.azure.com`、`cognitiveservices.azure.com`、`openai.azure.com` 下的资源根 URL 会被规范化到 OpenAI API 路径，`AZURE_OPENAI_API_VERSION` 覆盖 OpenAI 模型的 API 版本（默认 `v1`）。部署名与模型 ID 不一致时用 `AZURE_OPENAI_DEPLOYMENT_NAME_MAP` 做映射，例如 `gpt-5.4=my-gpt-deployment,deepseek-v4-pro=my-deepseek`——Pi 默认把模型 ID 直接当部署名发出去。[@ref-pi-providers-azure-deployment-map]

要把 Pi 未收录的 Foundry 模型加进来，需要在 `models.json` 的 `azure` 下写条目并指定 `api: "openai-completions"`；自定义模型要求 `baseUrl`，而 `AZURE_OPENAI_BASE_URL` 与 `AZURE_OPENAI_RESOURCE_NAME` 在设置时优先于该 `baseUrl`。[@ref-pi-providers-azure-custom-model] 这条同时说明：同一 provider 下模型可以按条目走不同 api，内置条目走 Responses API、自定义 Foundry 条目走 Chat Completions。

## models.json 与 API 判据 {#providers-models}

兼容已知 API 的服务直接写 `models.json`：

```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434/v1",
      "api": "openai-completions",
      "apiKey": "ollama",
      "models": [{ "id": "qwen2.5-coder:7b" }]
    }
  }
}
```

示例里的占位 key 只是让模型出现在 Pi 里，服务端可以忽略。需要真实鉴权时 `apiKey` 与 header 值支持 `$NAME`／`${NAME}` 插值、字面值或以 `!command` 开头的命令；`models.json` 里的命令在请求时执行，Pi 不缓存其结果。[@ref-pi-providers-models-entry] 打开 `/model` 会重载该文件：`models` 条目按 id 新增或替换该 provider 上的模型，`modelOverrides` 则在“不替换 provider 模型列表”的前提下改写已有内置或扩展模型的元数据。[@ref-pi-providers-models-entry]

已知 API 取值取自类型定义，共十项：[@ref-pi-providers-api-types]

```text
openai-completions        mistral-conversations     openai-responses
azure-openai-responses    openai-codex-responses    anthropic-messages
bedrock-converse-stream   google-generative-ai     google-vertex
pi-messages
```

`Api` 允许这些已知值之外的任意字符串（`(string & {})`），因此自定义协议用新 `api` 值加自己的实现。[@ref-pi-providers-api-types] 相对 v2 记录的一览，`pi-messages` 是新增项；当前来源把这份清单放在类型定义而不是 provider 文档里。

模型条目上还有一组按思考级别分档的采样参数。`samplingParams` 是自由形式的键值对，没有固定字段名；`samplingParamsByThinkingLevel` 按 Pi 自己的思考级别给出覆盖，键取 `off`、`minimal`、`low`、`medium`、`high`、`xhigh`、`max`，不是 `thinkingLevelMap` 映射出来的 provider 值。[@ref-pi-providers-sampling-fields] 类型定义与之一致：两组都声明为值任意的自由记录，不校验具体键名，级别键取自 `ModelThinkingLevel`，也就是 `off` 加上 `ThinkingLevel` 的六档。[@ref-pi-providers-sampling-types]

```json
{
  "id": "qwen-thinking-model",
  "reasoning": true,
  "samplingParams": { "temperature": 1.0, "top_p": 0.95 },
  "samplingParamsByThinkingLevel": {
    "off": { "temperature": 0.7, "top_p": 0.8 },
    "high": { "top_k": 20 }
  }
}
```

取值按固定顺序合成：Pi 先把请求的思考级别 clamp 到模型支持的档位，再依次合并模型 `samplingParams`、clamp 后生效级别的覆盖、请求级 `samplingParams`，后出现的值按键覆盖先出现的；没有给出覆盖的级别直接继承模型默认值。[@ref-pi-providers-sampling-scope] 实现是同一个顺序：`resolveSamplingParams` 先按模型算出生效级别并取出该级别的条目，再按模型默认值 → 级别覆盖 → 请求参数展开；三者都不存在时返回 `undefined`。[@ref-pi-providers-sampling-merge]

`modelOverrides` 另走一条路径：它在不替换 provider 模型列表的前提下，对七个级别逐档检查，把该档的条目按键合并到基础模型的同名档位上；覆盖没写的级别保持基础模型原值。[@ref-pi-providers-sampling-overrides] [@ref-pi-providers-sampling-scope]

这组字段只对 `openai-completions`、`openai-responses` 和 `azure-openai-responses` 生效，其余 API 直接忽略。[@ref-pi-providers-sampling-scope] 也就是说，采样参数不是所有协议都会送出去的通用字段，provider 的 `api` 取值决定这条配置会不会被读取——换到其他协议时，配置合法但不产生效果。

兼容元数据的定义位置变了，字段没有变。`types.ts` 的 413 行改动是把 provider 兼容与模型元数据类型整体搬到 `packages/ai/src/providers/compat-schema.ts` 与 `packages/ai/src/providers/model-schema.ts`，两处都用 TypeBox 定义，再从 `types.ts` 以 `export type` 原样转出，因此对外的导入路径保持不变。逐个接口比对 `OpenAICompletionsCompat`、`OpenAIResponsesCompat`、`AnthropicMessagesCompat`、`BedrockCompat`、`MistralConversationsCompat` 的字段集合与上一固定来源一致：没有新增字段，也没有删除字段，只有模式自身多了 `description` 与 `additionalProperties: true`（后者意味着未列出的兼容键仍被接受）。[@ref-pi-providers-compat-schema-source] 同一模块的 `ProviderCompatSchema` 是各协议兼容片段的合并模式，描述为「Provider and model compatibility overrides」，并同样开放额外属性。[@ref-pi-providers-compat-schema-source]

这份类型现在是机器可读的：`packages/coding-agent/schemas/models.schema.json` 由 `ModelsConfigSchema` 生成，其 `$defs` 带出 `ModelCost`、`ModelInputLimits`、`ModelPromptCache`、`ProviderCompat`、`ThinkingLevelMap`，其中 `ProviderCompat` 的定义就是上面那组 `supports*` / `requires*` 布尔键。[@ref-pi-providers-compat-schema-published] [@ref-pi-config-schema-generation-paths] 这一层解决的是「`models.json` 里这段 JSON 该不该被接受」，不改变各字段的运行时语义。

classifier 模型这一类在 `models.json` 之外还有一份清单，且本轮新增一项。文档列出六行来源：`typesafe` 的 `jev-latest`、`openrouter` 的 `typesafe/jev-1.13` 与 `~typesafe/jev-latest`、`cloudflare-workers-ai` 的 `typesafe/jev` 与两个 Clef 模型、`vercel-ai-gateway` 的 `typesafe-ai/jev`、`opencode` 的 `jev-1.13` 与 `jev-1.13-free`，以及本轮新增的 `openai` / `gpt-6-luna`，凭据是 `OPENAI_API_KEY`。[@ref-pi-providers-classifier-models-doc] 对应地，`KnownClassifierApi` 新增一项 `openai-decisions`（原三项为 `typesafe-system-one`、`cloudflare-workers-ai-system-one`、`llama-cpp-classify`）。[@ref-pi-providers-classifier-api-types] 能力元数据也扩了一项：`ClassifierContext` 新增可选 `images`，只有 `input` 含 `image` 的模型接受，其他模型返回错误结果；GPT-6 Luna 会判 `images`，其余 classifier 模型对它们报错。[@ref-pi-providers-classifier-context-images] 一条认证上的坑：`openai` 通过 `/login` 登录（ChatGPT 凭据）时 `gpt-6-luna` 不会出现在可用列表里，即使设了 `OPENAI_API_KEY`；要用 key 得先从 `openai` 登出。[@ref-pi-providers-classifier-images-doc] classifier 模型不出现在 `/model`，只能经 `codemode` 工具的 `models.getAvailableOfType("classifier")` 取得——这一条沿用上一固定来源，本轮未改。

## 凭据解析顺序 {#providers-auth}

多个凭据来源同时存在时，Pi 先用运行时的 `--api-key`，其次是 `auth.json` 中已存的凭据，再次是 `models.json` 里的 `apiKey`，最后才是 provider 的环境变量或环境中的云凭据；provider 扩展可自定义鉴权行为。[@ref-pi-providers-auth-order] v2 把环境变量排在 `models.json` 之前，该顺序在当前来源下不成立。

## 未覆盖的维度 {#providers-behavior}

请求转发、响应处理与诊断的具体扩展点（含 `stream`／`streamSimple` 的取舍标准）在本固定来源下未逐条登记，本章按 `partial` 记录，不给配置步骤；需要时应读 `docs/custom-provider.md` 与 `packages/ai/src/api` 的实现。`pi.registerProvider()` 仍在扩展工厂里注册，并在工厂阶段等待完成。[@ref-pi-cp-doc-registration]
