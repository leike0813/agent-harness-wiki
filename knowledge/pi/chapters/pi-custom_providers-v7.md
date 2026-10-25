---
schema_version: 3
record_kind: production
edition_id: pi-custom_providers-v7
harness_id: pi
topic: custom_providers
title: Pi 自定义 provider：入口、模型、元数据与请求转发（固定源码 be14d973）
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs:
      - ref-pi-cp-doc-registration
      - ref-pi-providers-entry-redirect
      - ref-pi-providers-entry-compatible
      - ref-pi-providers-config-provider
      - ref-pi-providers-models-proxy
      - ref-pi-providers-azure-id
      - ref-pi-providers-azure-deployment-map
      - ref-pi-providers-azure-custom-model
  - section_id: providers-models
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-models-entry
      - ref-pi-providers-models-proxy
      - ref-pi-providers-config-models
      - ref-pi-providers-config-model-defaults
      - ref-pi-providers-metadata-defaults
      - ref-pi-providers-protocol-api-lists
      - ref-pi-providers-sampling-fields
      - ref-pi-providers-sampling-types
      - ref-pi-providers-sampling-scope
      - ref-pi-providers-sampling-merge
      - ref-pi-providers-sampling-overrides
      - ref-pi-providers-classifier-list-current
      - ref-pi-providers-classifier-images-current
      - ref-pi-providers-openrouter-auth
      - ref-pi-providers-openrouter-refresh
      - ref-pi-providers-openrouter-regional
      - ref-pi-providers-openrouter-code
      - ref-pi-providers-personalized-catalog
      - ref-pi-providers-openrouter-changelog
      - ref-pi-providers-models-schema-url
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-config-models
      - ref-pi-providers-config-model-defaults
      - ref-pi-providers-config-systemone
      - ref-pi-providers-metadata-systemone-compat
      - ref-pi-providers-metadata-classifier-compat
      - ref-pi-providers-metadata-defaults
      - ref-pi-providers-classifier-context-images
      - ref-pi-providers-compat-schema-published
      - ref-pi-config-schema-generation-paths
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-protocol-api-lists
      - ref-pi-providers-protocol-compat-map
      - ref-pi-providers-protocol-stream-reuse
      - ref-pi-providers-sampling-scope
      - ref-pi-providers-azure-id
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-models-proxy
      - ref-pi-providers-forwarding-header-order
      - ref-pi-providers-forwarding-identity
      - ref-pi-providers-forwarding-attribution
      - ref-pi-providers-forwarding-user-agent
      - ref-pi-providers-forwarding-hooks
      - ref-pi-providers-sampling-scope
      - ref-pi-providers-config-systemone
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-auth-order
  - section_id: providers-behavior
    surface_ids: [cli]
    source_refs:
      - ref-pi-cp-doc-registration
      - ref-pi-providers-protocol-stream-reuse
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs:
          - ref-pi-cp-doc-registration
          - ref-pi-providers-entry-redirect
          - ref-pi-providers-entry-compatible
          - ref-pi-providers-config-provider
          - ref-pi-providers-models-proxy
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-pi-providers-models-entry
          - ref-pi-providers-models-proxy
          - ref-pi-providers-config-models
          - ref-pi-providers-config-model-defaults
          - ref-pi-providers-metadata-defaults
          - ref-pi-providers-protocol-api-lists
          - ref-pi-providers-sampling-fields
          - ref-pi-providers-sampling-types
          - ref-pi-providers-sampling-scope
          - ref-pi-providers-sampling-merge
          - ref-pi-providers-sampling-overrides
          - ref-pi-providers-classifier-list-current
          - ref-pi-providers-classifier-images-current
          - ref-pi-providers-openrouter-auth
          - ref-pi-providers-openrouter-refresh
          - ref-pi-providers-openrouter-regional
          - ref-pi-providers-openrouter-code
          - ref-pi-providers-personalized-catalog
          - ref-pi-providers-openrouter-changelog
          - ref-pi-providers-models-schema-url
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs:
          - ref-pi-providers-config-models
          - ref-pi-providers-config-model-defaults
          - ref-pi-providers-config-systemone
          - ref-pi-providers-metadata-systemone-compat
          - ref-pi-providers-metadata-classifier-compat
          - ref-pi-providers-metadata-defaults
          - ref-pi-providers-classifier-context-images
          - ref-pi-providers-compat-schema-published
          - ref-pi-config-schema-generation-paths
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs:
          - ref-pi-providers-protocol-api-lists
          - ref-pi-providers-protocol-compat-map
          - ref-pi-providers-protocol-stream-reuse
          - ref-pi-providers-sampling-scope
          - ref-pi-providers-azure-id
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs:
          - ref-pi-providers-models-proxy
          - ref-pi-providers-forwarding-header-order
          - ref-pi-providers-forwarding-identity
          - ref-pi-providers-forwarding-attribution
          - ref-pi-providers-forwarding-user-agent
          - ref-pi-providers-forwarding-hooks
          - ref-pi-providers-sampling-scope
          - ref-pi-providers-config-systemone
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs:
          - ref-pi-providers-auth-order
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-behavior
        status: partial
        source_refs:
          - ref-pi-cp-doc-registration
          - ref-pi-providers-protocol-stream-reuse
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-behavior
        status: partial
        source_refs:
          - ref-pi-cp-doc-registration
---
固定来源以 pi 仓库提交 be14d973 为准（基线 b45e0ebc）。注册入口、`models.json` 字段、采样参数与 Azure 标识中未变的部分仍按提交 83692682、20038712、6fb2e781 与 7bd01fb9 的定位阅读；本轮机制变化集中在五处：自定义 provider 文档把「只改端点」与「自带模型目录」拆成两种写法；`models.json` 的模型条目补上了 `contextWindow`、`maxTokens`、`input` 与 `reasoning` 的默认值，并承认 `$$`／`$!` 转义；兼容层新增 System One 分类器协议的两个字段，且 provider 级 `compat` 开始作用于分类器模型；`CompatSchemasByApi` 从内部常量变为导出映射，并把 Azure、Codex Responses 与两个 System One API 纳入；请求身份改由 pi-ai 的 client identity 统一生成 `User-Agent` 与归因头。相对 pi-custom_providers-v6，本章据此重写了模型清单、元数据与转发三节，旧 edition 保留。

## 注册 provider {#providers-entry}

`pi.registerProvider()` 从扩展工厂调用，Pi 会等待异步工厂完成再继续启动，因此在工厂里注册的 provider 可用于启动期模型选择与 `pi --list-models`。[@ref-pi-cp-doc-registration] 当前来源给出两种注册形态：注册来自 `@earendil-works/pi-ai` 的完整 `Provider`（具备原生鉴权、过滤、发现、刷新与流式行为），或按旧配置形态注册 provider 名称加 `ProviderConfig`；新的集成只在确实需要自定义行为时才写完整 provider，Pi 会把 `models.json` 的覆盖合成到已注册的原生 provider 之上。[@ref-pi-cp-doc-registration]

只改端点的写法被单独列为「Redirect an existing provider」：注册时只给要变的字段，内置模型目录、鉴权、API 实现与兼容设置全部保留，因此代理或网关不应把内置模型清单抄进扩展，否则一次小改动会变成会漂移的目录替换。[@ref-pi-providers-entry-redirect] 反过来，服务实现受支持的协议但有自己的模型目录时，注册端点并只列出该服务实际提供的模型；没有运行期发现、自定义鉴权或共享代码需求时优先用 `models.json`。[@ref-pi-providers-entry-compatible] 旧配置形态里给出 `models` 会替换该 provider 在 chat、image 与 classifier 操作上的全部模型；`type` 省略按 `"chat"` 处理，image 与 classifier 模型需要显式判别字段，并通过 `images`／`classifiers` 以各自 `api` 值为键给出实现。[@ref-pi-cp-doc-registration]

`models.json` 是同一机制的配置入口：`providers` 下的键若是内置 provider ID，就改写该 provider；其他 ID 则新增 provider，并要求在 provider 或模型级给出 `baseUrl` 与 `api`。[@ref-pi-providers-config-provider] 把内置 provider 指向代理只需写它的 `baseUrl`，模型与鉴权保持原样；`model` 级 `baseUrl` 优先于 provider 端点。[@ref-pi-providers-models-proxy]

内置 Azure provider 的 ID 是 `azure`（formerly `azure-openai-responses`），要作为 `auth.json`、`models.json`、`settings.json` 里的键，以及模型引用（如 `--model azure/gpt-5.4`）的前缀。[@ref-pi-providers-azure-id] `azure` 用 Responses API 服务 OpenAI 模型，用 Chat Completions 服务 Microsoft Foundry 模型，例如 `azure/deepseek-v4-pro`；改名的是 provider 标识，不是 api 标识。凭据仍是 `AZURE_OPENAI_API_KEY` 加 `AZURE_OPENAI_BASE_URL` 或 `AZURE_OPENAI_RESOURCE_NAME`，`AZURE_OPENAI_API_VERSION` 覆盖 OpenAI 模型的 API 版本（默认 `v1`）。部署名与模型 ID 不一致时用 `AZURE_OPENAI_DEPLOYMENT_NAME_MAP` 做映射，例如 `gpt-5.4=my-gpt-deployment,deepseek-v4-pro=my-deepseek`——Pi 默认把模型 ID 直接当部署名发出去。[@ref-pi-providers-azure-deployment-map]

要把 Pi 未收录的 Foundry 模型加进来，需要在 `models.json` 的 `azure` 下写条目并指定 `api: "openai-completions"`；自定义模型要求 `baseUrl`，而 `AZURE_OPENAI_BASE_URL` 与 `AZURE_OPENAI_RESOURCE_NAME` 在设置时优先于该 `baseUrl`。[@ref-pi-providers-azure-custom-model]

## models.json 与模型清单 {#providers-models}

兼容已知 API 的服务直接写 `models.json`：[@ref-pi-providers-models-entry]

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

示例里的占位 key 只是让模型出现在 Pi 里，服务端可以忽略。需要真实鉴权时 `apiKey` 与 header 值支持 `$NAME`／`${NAME}` 插值、字面值或以 `!command` 开头的命令；`$$` 与 `$!` 分别产生字面 `$` 与 `!`。`models.json` 里的命令在请求时执行，Pi 不缓存其结果。[@ref-pi-providers-models-proxy] 打开 `/model` 会重载该文件：`models` 条目按 id 新增或替换该 provider 上的模型，`modelOverrides` 则在“不替换 provider 模型列表”的前提下改写已有内置或扩展模型的元数据，未知的覆盖 ID 被忽略。[@ref-pi-providers-models-proxy]

`models` 条目与 `modelOverrides` 共用一组字段，但默认值只作用于 `models` 条目：`input` 默认 `["text"]`，`contextWindow` 默认 `128000`，`maxTokens` 默认 `16384`，`reasoning` 默认 `false`。[@ref-pi-providers-config-models] [@ref-pi-providers-config-model-defaults] 生成模式把这些默认值写进模型定义，因此编辑器补全与实际生效值一致。[@ref-pi-providers-metadata-defaults] `modelOverrides` 的字段表不写默认值，未写的字段保留原模型值。

每个模型条目的 `id` 是发给 API 的模型 ID，`name` 是显示名（也参与 `--model` 匹配），`api` 与 `baseUrl` 可覆盖 provider 级值；provider 级与模型级的 `headers` 都用与 `apiKey` 相同的展开规则。[@ref-pi-providers-config-models]

已知 chat API 取自有类型定义：[@ref-pi-providers-protocol-api-lists]

```text
openai-completions        mistral-conversations     openai-responses
azure-openai-responses    openai-codex-responses    anthropic-messages
bedrock-converse-stream   google-generative-ai      google-vertex
pi-messages
```

`Api` 允许这些已知值之外的任意字符串；image 与 classifier 各自另有 API 联合类型，因此自定义协议用新 `api` 值加自己的实现。[@ref-pi-providers-protocol-api-lists] 相对 v6 记录的一览，`pi-messages` 与 OpenRouter 图片 API 仍在，协议清单本身未增删；本轮变化在兼容模式的映射，见下一节。

模型条目上还有一组按思考级别分档的采样参数。`samplingParams` 是自由形式的键值对，没有固定字段名；`samplingParamsByThinkingLevel` 按 Pi 自己的思考级别给出覆盖，键取 `off`、`minimal`、`low`、`medium`、`high`、`xhigh`、`max`，不是 `thinkingLevelMap` 映射出来的 provider 值。[@ref-pi-providers-sampling-fields] 类型定义与之一致：两组都声明为值任意的自由记录，级别键取自 `ModelThinkingLevel`。[@ref-pi-providers-sampling-types]

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

取值按固定顺序合成：Pi 先把请求的思考级别 clamp 到模型支持的档位，再依次合并模型 `samplingParams`、clamp 后生效级别的覆盖、请求级 `samplingParams`，后出现的值按键覆盖先出现的；没有给出覆盖的级别直接继承模型默认值。[@ref-pi-providers-sampling-scope] 实现是同一个顺序：`resolveSamplingParams` 先按模型算出生效级别并取出该级别的条目，再按模型默认值 → 级别覆盖 → 请求参数展开；三者都不存在时返回 `undefined`。[@ref-pi-providers-sampling-merge] `modelOverrides` 另走一条路径：它在不替换 provider 模型列表的前提下，对七个级别逐档检查，把该档的条目按键合并到基础模型的同名档位上。[@ref-pi-providers-sampling-overrides] 这组字段只对 `openai-completions`、`openai-responses` 和 `azure-openai-responses` 生效，其余 API 直接忽略。[@ref-pi-providers-sampling-scope]

classifier 模型这一类在 `models.json` 之外还有一份清单。文档列出六行来源：`typesafe` 的 `jev-latest`、`openrouter` 的 `typesafe/jev-1.13`、`typesafe/jev-1.14`、`~typesafe/jev-latest` 与 `cloudflare/clef`、`cloudflare/clef-flash`、`cloudflare/clef-omni`、`cloudflare-workers-ai` 的 `typesafe/jev`、`typesafe/jev-1.14.0`、`@cf/cloudflare/clef`、`@cf/cloudflare/clef-flash`、`@cf/cloudflare/clef-omni`、`vercel-ai-gateway` 的 `typesafe-ai/jev`、`opencode` 的 `jev-1.13` 与 `jev-1.13-free`，以及 `openai` 的 `gpt-6-luna`。[@ref-pi-providers-classifier-list-current] 相对 v6，OpenRouter 行新增 Jev 1.14 与三个 Clef 模型，Workers AI 行新增 Jev 1.14.0 与 Clef Omni；`openai` 的 GPT-6 Luna 仍走 Decisions API。分类器模型不出现在 `/model`，经 codemode 的 `models.classify()` 使用。

分类器也能读图，前提是模型的 `input` 含 `"image"`，其他分类器模型对传图报错。GPT-6 Luna、`typesafe` 与 `cloudflare-workers-ai` 的 Jev、Workers AI 的 Clef，以及目录声明图片输入的 OpenRouter 模型支持该能力；Jev 收 PNG 与 JPEG，TypeSafe 自家 API 的图片输入仍是实验性，Clef 收 PNG、JPEG 与 WebP，每次最多四张，`vercel-ai-gateway` 与 `opencode` 的 Jev 只收文本。[@ref-pi-providers-classifier-images-current] 图片请求格式由每个 System One 服务自己的 `compat.imageInput` 决定，内置模型已设置，只改 provider `baseUrl` 不会丢；代理别的服务分类器的自定义 provider 要在 provider 级 `compat` 里写它。[@ref-pi-providers-classifier-images-current]

OpenRouter 的 chat 模型列表不是固定清单。用 `/login openrouter` 或 `OPENROUTER_API_KEY` 认证后，Pi 只列出这把 key 可用的 OpenRouter chat 模型，context size、最大输出与价格都取自该 key 的口径；数据来自 OpenRouter 的 `/models/user` 端点，因此会反映 OpenRouter 侧的护栏与 provider 限制，而 image 与 classifier 模型不参与过滤。[@ref-pi-providers-openrouter-auth] 实现注释与文档一致：`GET /models/user` 缺失的 limit 保留目录值，请求使用 provider 已配置的 base URL，因此把 `models.json` 的 `baseUrl` 设成区域端点就会按该区域过滤；端点拒绝 key（401/403）或没有这个端点（404）时，目录原样返回，即列出全部 OpenRouter 模型。[@ref-pi-providers-openrouter-code]

刷新时机有四个：交互模式启动时后台刷新、打开 `/model` 时、`/login` 之后、以及 `pi update --models`。最后一次清单会被保存，离线时以及 `pi -p` 与 RPC 模式都用这份保存值；在 `/login` 之外换 key，旧的清单会保留到下一次刷新为止。[@ref-pi-providers-openrouter-refresh] 保存值替换的是整份目录（含离线），空清单回落到内置模型，这一点由 `withPersonalizedCatalog` 的文档注释说明。[@ref-pi-providers-personalized-catalog] 区域端点的写法是 `models.json` 里给 `openrouter` 配 `baseUrl`：

```json
{
  "providers": {
    "openrouter": { "baseUrl": "https://us.openrouter.ai/api/v1" }
  }
}
```

[@ref-pi-providers-openrouter-regional] `CHANGELOG` 把这项能力记为新增：按 key 的 OpenRouter 模型清单，包含 key 的限制与价格、以及在 `models.json` 里设为 base URL 的区域端点，清单会被保存并离线使用。[@ref-pi-providers-openrouter-changelog]

`models.schema.json` 的 `$id` 是 `https://pi.dev/schemas/models.schema.json`（settings、keybindings、theme 三份同基址），`docs/models.md` 的兼容端点示例因此在文件里加了 `"$schema"` 键。[@ref-pi-providers-models-schema-url]

## 模型能力元数据 {#providers-metadata}

`models.json` 的模型元数据覆盖读者判断“这个模型能干什么”的字段：`contextWindow`、`maxTokens`、`input`、`reasoning`、`thinkingLevelMap`、`inputLimits`、`cost`、`promptCache`、`headers` 与 `compat`；`models` 条目与 `modelOverrides` 共享这些元数据字段，但 `models` 条目另有 `id`、`api` 与 `baseUrl`，而 `modelOverrides` 不提供默认值。[@ref-pi-providers-config-models] 对 `models` 条目，`contextWindow` 缺省为 128000、`maxTokens` 缺省为 16384、`input` 缺省为 `["text"]`、`reasoning` 缺省为 false。[@ref-pi-providers-config-model-defaults] 生成模式把这些默认值写进 `models.schema.json`，因此编辑器提示与实际回退一致。[@ref-pi-providers-metadata-defaults]

`input` 只有 `text` 与 `image` 两档。对话模型带 `"image"` 才会在请求里接收图片输入；分类器模型带 `"image"` 才能判图，其他分类器模型对 `images` 报错。[@ref-pi-providers-classifier-context-images] 视觉不是独立开关，而是 `input` 列表的一项。`reasoning` 表示模型是否支持思考；`thinkingLevelMap` 给出每个思考级别要发给 provider 的值，`null` 标记该级别不受支持，模型没映射的级别使用 provider 默认值直到 `high`，`xhigh` 与 `max` 视为不支持。[@ref-pi-providers-config-models] `promptCache` 用 `short`／`long` 两个 tier 的秒数描述缓存寿命，缺少某个 tier 时 Pi 不对该 tier 做缓存预热。[@ref-pi-providers-config-model-defaults]

字段清单里没有逐模型的 tools 能力项——工具调用由所选 `api` 的实现与 `compat` 开关决定，例如 `supportsStrictMode` 控制工具定义里的 strict 字段，而不是由模型元数据声明。这一点从模型字段表可以直接读出：能力元数据只描述上下文、输出、输入模态、思考、成本、缓存与兼容差异。[@ref-pi-providers-config-models]

`compat` 是这套元数据里的协议差异层。模型级值按字段覆盖 provider 级值，生效的字段取决于模型的 `api`；provider 级 `compat` 现在也作用于 classifier 模型，而 `models` 与 `modelOverrides` 条目里的 `compat` 只作用于 chat 模型。[@ref-pi-providers-config-systemone] 类型定义把这一点写进 `ClassifierModel`：只有 `typesafe-system-one` 与 `cloudflare-workers-ai-system-one` 的模型接受 `SystemOneCompat`，未设置时按 provider、`baseUrl` 与模型 ID 自动探测。[@ref-pi-providers-metadata-classifier-compat]

System One 的兼容字段有两个。`imageInput` 取 `assets`、`images` 或 `state-image-urls`，分别对应 TypeSafe/Workers AI 的 assets 映射、Clef 的 data-URL 列表（PNG/JPEG/WebP，最多四张）与 OpenRouter 的 `image_url` 前置格式；`sendImageOptInHeader` 控制是否发 `TypeSafe-Danger-Zone-Images: true`，`typesafe-system-one` 默认开启，检测为 OpenRouter 时关闭。[@ref-pi-providers-metadata-systemone-compat] 文档把同一组字段的适用边界写得更直白：分类器只读 provider 级 `compat`，模型与 `modelOverrides` 条目只对 chat 模型生效，且 `imageInput` 会从 provider、`baseUrl` 与模型 ID 自动探测。[@ref-pi-providers-config-systemone]

这份类型是机器可读的：`models.schema.json` 由 `ModelsConfigSchema` 生成，`$defs` 带出 `ModelCost`、`ModelInputLimits`、`ModelPromptCache`、`ProviderCompat`、`ThinkingLevelMap`，其中 `ProviderCompat` 是各协议兼容片段的合并模式。[@ref-pi-providers-compat-schema-published] [@ref-pi-config-schema-generation-paths] 这一层解决的是“`models.json` 里这段 JSON 该不该被接受”，不改变各字段的运行时语义。`ModelPromptCache` 的描述限定为 `short` 与 `long` 两个 retention tier，并明确只预热已知寿命的 tier。[@ref-pi-providers-metadata-defaults]

## 协议与兼容模式 {#providers-protocol}

Pi 的协议分成三族。chat API 有十项，`Api` 允许任意字符串；image API 目前是 `openrouter-images`；classifier API 是 `typesafe-system-one`、`cloudflare-workers-ai-system-one`、`llama-cpp-classify` 与 `openai-decisions`，同样允许自定义字符串。[@ref-pi-providers-protocol-api-lists] provider 扩展不需要重写整个协议：Anthropic Messages、OpenAI Chat Completions 与 Responses、Google Generative AI 与 Vertex、Azure OpenAI Responses、Mistral Conversations、Bedrock Converse 都有可复用的实现，provider 只在鉴权、base URL、header、模型过滤与发现上做差异。[@ref-pi-providers-protocol-stream-reuse] 只有现有实现无法表达服务协议时才写 `stream`／`streamSimple`。

兼容模式按 API 分组，`CompatSchemasByApi` 是这张表的权威映射：`openai-completions` 用 `OpenAICompletionsCompatSchema`，`openai-responses`、`azure-openai-responses` 与 `openai-codex-responses` 共用 `OpenAIResponsesCompatSchema`，`anthropic-messages`、`bedrock-converse-stream`、`mistral-conversations` 各一份，`typesafe-system-one` 与 `cloudflare-workers-ai-system-one` 共用 `SystemOneCompatSchema`。[@ref-pi-providers-protocol-compat-map] 相对 v6，这张映射从内部常量变为导出值，并补上了此前缺失的 Azure、Codex Responses 与两个 System One 分类器 API；`ProviderCompat` 仍由各模式属性合并而来，去重后开放额外属性。

Azure 的 provider 标识与 api 标识不同：provider 是 `azure`，api 仍是 `azure-openai-responses`，两者不要混用。[@ref-pi-providers-azure-id] 采样参数只对三个 OpenAI 兼容 API 生效，其他协议即使配置了 `samplingParams` 也不会读取——协议选择直接决定这组字段有没有效果。[@ref-pi-providers-sampling-scope]

## 配置到请求的转发 {#providers-forwarding}

配置值先经过展开，再按层合并。`apiKey` 与 header 值支持 `$NAME`／`${NAME}` 环境插值、字面值、`!command` 命令输出，以及 `$$`／`$!` 转义；命令在请求时执行且不缓存。[@ref-pi-providers-models-proxy] 展开后的 header 与身份头按固定顺序合并：client identity 提供的 `User-Agent` 与归因头位于最底层，其上是模型、provider 与请求级 header，因此配置的 header 覆盖身份头，请求级 header 设为 `null` 可以移除同名默认头。[@ref-pi-providers-forwarding-header-order]

client identity 默认发详细 `User-Agent`（`pi/{version} ({platform}; {runtime}/{runtime version}; {arch})`，非 Node/Bun 环境为 `pi/{version} (browser)`），默认不带归因头。[@ref-pi-providers-forwarding-user-agent] coding agent 显式传入详细 UA 与自己的版本，并且只在安装遥测开启时把归因设为 pi；关闭时归因为 `null`，不发送 provider 归因头。[@ref-pi-providers-forwarding-identity] 归因按目标服务映射：OpenRouter 收 `HTTP-Referer`、`X-OpenRouter-Title` 与可选的 `X-OpenRouter-Categories`，NVIDIA NIM 收首字母大写的 `X-BILLING-INVOKE-ORIGIN`，OpenCode 收 `x-opencode-client`；其他目标不加归因头。[@ref-pi-providers-forwarding-attribution]

配置参数对请求的影响可以按用途分开。`samplingParams` 与 `samplingParamsByThinkingLevel` 只对 OpenAI 兼容 API 合并进请求体，其他协议忽略。[@ref-pi-providers-sampling-scope] `compat` 按所选 API 改变请求或响应的序列化方式；System One 分类器的 `imageInput` 就是一个直接例子，它决定图片放在 assets、images 列表还是 state 前的 `image_url` 部分。[@ref-pi-providers-config-systemone] `name` 只影响显示与 `--model` 匹配，`baseUrl`、`api` 与 `oauth` 影响路由与实现选择，`cost` 只参与计费，`promptCache` 只参与缓存预热，它们都不直接改写请求体。

自定义流式实现必须把请求检查钩子透传下去：发送前调用 `options.onPayload` 并采用它返回的替换 payload，收到响应后调用 `options.onResponse`，每个解析出的 provider 事件在归一化前 `await options.onProviderStreamEvent?.(providerEvent, model)`，同时透传 abort signal 与 provider 作用域环境。[@ref-pi-providers-forwarding-hooks] 这些钩子承载扩展的请求检查、响应头事件与 provider 流观察；漏掉它们会让 provider 的行为与内置实现不一致。

## 凭据解析顺序 {#providers-auth}

多个凭据来源同时存在时，Pi 先用运行时的 `--api-key`，其次是 `auth.json` 中已存的凭据，再次是 `models.json` 里的 `apiKey`，最后才是 provider 的环境变量或环境中的云凭据；provider 扩展可自定义鉴权行为。[@ref-pi-providers-auth-order] v2 把环境变量排在 `models.json` 之前，该顺序在当前来源下不成立。

## 未覆盖的维度 {#providers-behavior}

响应处理与诊断的具体扩展点（错误归一化、重试分类、如何区分配置可读／模型可选／请求已发送）在本固定来源下未逐条登记，本章按 `partial` 记录，不给配置步骤；自定义流式实现的终止事件与 usage 约定见 `docs/custom-provider.md` 的流式契约。[@ref-pi-providers-protocol-stream-reuse] `pi.registerProvider()` 仍在扩展工厂里注册，并在工厂阶段等待完成。[@ref-pi-cp-doc-registration]
