---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-custom_providers-v3
harness_id: zoo-code
topic: custom_providers
title: "Zoo Code VS Code 扩展的模型 Provider：档案、协议、模型元数据与诊断"
sections:
  - section_id: providers-entry
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-profiles-create, ref-zoo-code-docs-profiles, ref-zoo-code-src-provider-secrets, ref-zoo-code-src-provider-store, ref-zoo-code-src-provider-profiles, ref-zoo-code-docs-profiles-security]
  - section_id: providers-protocol
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-providers-index, ref-zoo-code-docs-openai-compatible-general, ref-zoo-code-src-openai-compatible, ref-zoo-code-docs-openai-compatible-extra, ref-zoo-code-docs-profiles, ref-zoo-code-src-strict-tool-schemas-default, ref-zoo-code-src-strict-tool-schemas-field, ref-zoo-code-src-strict-tool-schemas-convert-signature, ref-zoo-code-src-strict-tool-schemas-use-strict, ref-zoo-code-src-strict-tool-schemas-schema-clone, ref-zoo-code-src-strict-tool-schemas-option-read, ref-zoo-code-src-strict-tool-schemas-stream-body, ref-zoo-code-src-strict-tool-schemas-completion-body, ref-zoo-code-src-strict-tool-schemas-ui-checkbox, ref-zoo-code-src-strict-tool-schemas-extra-body-reserved, ref-zoo-code-src-strict-tool-schemas-other-providers, ref-zoo-code-src-strict-tool-schemas-zoo-gateway, ref-zoo-code-src-strict-tool-schemas-mcp-prefix, ref-zoo-code-src-strict-tool-schemas-rewrite-rules, ref-zoo-code-src-strict-tool-schemas-required-all]
  - section_id: providers-models
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-provider-settings-base, ref-zoo-code-src-model-cache, ref-zoo-code-src-model-info, ref-zoo-code-src-openai-compatible, ref-zoo-code-docs-openai-compatible-general, ref-zoo-code-src-model-openai-gpt61, ref-zoo-code-src-model-openai-gpt61-pricing, ref-zoo-code-src-model-codex-gpt61, ref-zoo-code-src-model-anthropic-opus55, ref-zoo-code-src-model-opencode-deepseek]
  - section_id: providers-responses
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-openai-compatible-tools, ref-zoo-code-src-openai-compatible, ref-zoo-code-src-error-handler, ref-zoo-code-src-rate-limit, ref-zoo-code-src-codex-retry, ref-zoo-code-src-bedrock-throttle, ref-zoo-code-src-strict-tool-schemas-use-strict, ref-zoo-code-src-strict-tool-schemas-schema-clone]
  - section_id: providers-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-openai-compatible-trouble, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-extension-config, ref-zoo-code-src-error-handler, ref-zoo-code-src-model-cache]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [vscode]
        section_id: providers-entry
        status: answered
        source_refs: [ref-zoo-code-docs-profiles-create, ref-zoo-code-docs-profiles, ref-zoo-code-src-provider-secrets, ref-zoo-code-src-provider-store, ref-zoo-code-src-provider-profiles, ref-zoo-code-docs-profiles-security]
  - question_id: providers.auth
    answers:
      - surface_ids: [vscode]
        section_id: providers-entry
        status: answered
        source_refs: [ref-zoo-code-docs-profiles-create, ref-zoo-code-docs-profiles, ref-zoo-code-src-provider-secrets, ref-zoo-code-src-provider-store, ref-zoo-code-src-provider-profiles, ref-zoo-code-docs-profiles-security]
  - question_id: providers.protocol
    answers:
      - surface_ids: [vscode]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-zoo-code-docs-providers-index, ref-zoo-code-docs-openai-compatible-general, ref-zoo-code-src-openai-compatible, ref-zoo-code-docs-openai-compatible-extra, ref-zoo-code-docs-profiles, ref-zoo-code-src-strict-tool-schemas-default, ref-zoo-code-src-strict-tool-schemas-field, ref-zoo-code-src-strict-tool-schemas-convert-signature, ref-zoo-code-src-strict-tool-schemas-use-strict, ref-zoo-code-src-strict-tool-schemas-schema-clone, ref-zoo-code-src-strict-tool-schemas-option-read, ref-zoo-code-src-strict-tool-schemas-stream-body, ref-zoo-code-src-strict-tool-schemas-completion-body, ref-zoo-code-src-strict-tool-schemas-ui-checkbox, ref-zoo-code-src-strict-tool-schemas-extra-body-reserved]
  - question_id: providers.models
    answers:
      - surface_ids: [vscode]
        section_id: providers-models
        status: answered
        source_refs: [ref-zoo-code-src-provider-settings-base, ref-zoo-code-src-model-cache, ref-zoo-code-src-model-info, ref-zoo-code-src-openai-compatible, ref-zoo-code-docs-openai-compatible-general, ref-zoo-code-src-model-openai-gpt61, ref-zoo-code-src-model-openai-gpt61-pricing, ref-zoo-code-src-model-codex-gpt61, ref-zoo-code-src-model-anthropic-opus55, ref-zoo-code-src-model-opencode-deepseek]
  - question_id: providers.metadata
    answers:
      - surface_ids: [vscode]
        section_id: providers-models
        status: answered
        source_refs: [ref-zoo-code-src-provider-settings-base, ref-zoo-code-src-model-cache, ref-zoo-code-src-model-info, ref-zoo-code-src-openai-compatible, ref-zoo-code-docs-openai-compatible-general, ref-zoo-code-src-model-openai-gpt61, ref-zoo-code-src-model-openai-gpt61-pricing, ref-zoo-code-src-model-codex-gpt61, ref-zoo-code-src-model-anthropic-opus55, ref-zoo-code-src-model-opencode-deepseek]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [vscode]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-zoo-code-docs-providers-index, ref-zoo-code-docs-openai-compatible-general, ref-zoo-code-src-openai-compatible, ref-zoo-code-docs-openai-compatible-extra, ref-zoo-code-docs-profiles, ref-zoo-code-src-strict-tool-schemas-default, ref-zoo-code-src-strict-tool-schemas-field, ref-zoo-code-src-strict-tool-schemas-convert-signature, ref-zoo-code-src-strict-tool-schemas-use-strict, ref-zoo-code-src-strict-tool-schemas-schema-clone, ref-zoo-code-src-strict-tool-schemas-option-read, ref-zoo-code-src-strict-tool-schemas-stream-body, ref-zoo-code-src-strict-tool-schemas-completion-body, ref-zoo-code-src-strict-tool-schemas-ui-checkbox, ref-zoo-code-src-strict-tool-schemas-extra-body-reserved]
  - question_id: providers.responses
    answers:
      - surface_ids: [vscode]
        section_id: providers-responses
        status: partial
        source_refs: [ref-zoo-code-docs-openai-compatible-tools, ref-zoo-code-src-openai-compatible, ref-zoo-code-src-error-handler, ref-zoo-code-src-rate-limit, ref-zoo-code-src-codex-retry, ref-zoo-code-src-bedrock-throttle, ref-zoo-code-src-strict-tool-schemas-use-strict, ref-zoo-code-src-strict-tool-schemas-schema-clone]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-zoo-code-docs-openai-compatible-trouble, ref-zoo-code-docs-settings-vscode, ref-zoo-code-src-extension-config, ref-zoo-code-src-error-handler, ref-zoo-code-src-model-cache]
---

本章采写 Zoo Code 的模型 Provider 接入：配置入口与凭据、协议与请求映射、模型清单与能力元数据、响应处理、诊断。Zoo Code 不通过配置文件声明自定义 provider，而是用「API 配置档案 + 内置 provider 实现」的方式接入；所以本章按产品的真实机制组织小节。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e`，以及引入 `openAiStrictToolSchemas` 设置的 `2baac5e5b76018af2f1569450a70514b077a3748`；两处固定来源中的 `src/core/config/ProviderSettingsManager.ts`、`src/api/providers/`、`packages/types/src/provider-settings/`、`packages/types/src/model.ts`，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的 `docs/features/api-configuration-profiles.mdx`、`docs/providers/openai-compatible.md`、`docs/features/settings-management.md`。内置模型清单的具体条目另外固定在 Zoo-Code 仓库 commit `72143527fd33306e5541116093c2cbf803cce9e0` 的 `packages/types/src/providers/`。

## 配置入口、作用域与凭据 {#providers-entry}

- 入口是 VS Code 内的 Zoo Code 设置面板（齿轮 → Providers），每个「API 配置档案」是一组 provider + key + 模型 + 参数；档案可通过下拉框切换、置顶与排序，可以从聊天界面直接切换 [@ref-zoo-code-docs-profiles-create]。
- 一个档案包含 provider、密钥与认证细节、模型选择、温度、thinking 预算、provider 专有设置、diff 编辑配置与速率限制等；可用项随 provider 与模型而变 [@ref-zoo-code-docs-profiles]。
- 档案数据整体存放在 VS Code 的 SecretStorage 中（键为 `roo_cline_config_api_config`），而不是明文 `settings.json`；因此 API key 不会以明文字段落地 [@ref-zoo-code-src-provider-secrets] [@ref-zoo-code-src-provider-store]。
- 档案结构包含当前档案名 `currentApiConfigName`、档案表 `apiConfigs`、模式到档案的绑定表 `modeApiConfigs`，以及若干迁移标记；每个档案记录自身 `id` 与 provider 设置 [@ref-zoo-code-src-provider-profiles]。
- 文档层面的表述是「API key 存放在 VS Code Secret Storage，绝不明文暴露」；需要注意导出设置会把档案与全局设置写进一个 JSON 文件，官方明确警告该文件包含明文 API key，应按敏感文件处理 [@ref-zoo-code-docs-profiles-security]。
- 速率限制按档案独立配置：默认 0（关闭），其他档案各按自己的值执行 [@ref-zoo-code-docs-profiles-create]。

```json
// 依据 docs/providers/openai-compatible.md 的 General Configuration 一节（值均为占位符）
{
  "apiProvider": "openai-compatible",
  "openAiBaseUrl": "https://your-endpoint.example.com/v1",
  "openAiApiKey": "your_api_key",
  "openAiModelId": "your-model-id"
}
```

## 协议、端点与请求映射 {#providers-protocol}

- 内置 provider 覆盖官方 API（OpenAI、Anthropic、Gemini、Bedrock、Vertex 等）、聚合网关（OpenRouter、Requesty、Vercel AI Gateway 等）、本地运行时（Ollama、LM Studio）与「OpenAI Compatible」通用形态；产品文档按 provider 逐页说明 [@ref-zoo-code-docs-providers-index]。
- 「OpenAI Compatible」是接入自建或第三方 OpenAI 兼容端点的入口：需要填 Base URL、API Key 与模型 ID 三项，Base URL 必须是对方提供的端点而不是 `https://api.openai.com/v1` [@ref-zoo-code-docs-openai-compatible-general]。
- 兼容层的实现是 `BaseOpenAiCompatibleProvider`：构造时用 `baseURL`、`apiKey`、默认请求头与超时创建 OpenAI 客户端；缺少 key 直接抛错 [@ref-zoo-code-src-openai-compatible]。
- 请求参数由客户端统一拼装：`max_tokens` 经 `getModelMaxOutputTokens`（默认按上下文窗口的 20% 封顶）计算，`temperature` 取用户设置、模型默认温度或 provider 默认温度三者中的第一个可用值 [@ref-zoo-code-src-openai-compatible]。
- 额外请求字段走档案里的 **Extra Body**：用户填写的 JSON 对象会被校验后合并进流式、非流式与单次补全请求；它不能覆盖 Zoo Code 自己管理的字段（模型、消息、流式开关、工具、推理设置、响应格式、温度与 token 上限），也不能放密钥，因为档案可以被导出 [@ref-zoo-code-docs-openai-compatible-extra]。
- OpenAI 兼容网关的**工具 schema 严格模式**由档案字段 `openAiStrictToolSchemas` 控制，源码里是可选布尔项，缺省值为常量 `DEFAULT_OPEN_AI_STRICT_TOOL_SCHEMAS = true` [@ref-zoo-code-src-strict-tool-schemas-field] [@ref-zoo-code-src-strict-tool-schemas-default]。
- 该字段只改变发往 `apiProvider: "openai"` 这一条路径的请求体形状，且改变两件事：一是每个非 MCP 工具的 `function.strict` 取值，二是 `function.parameters` 是否被改写成 OpenAI strict 模式的形状。兼容层的转换函数 `convertToolsForOpenAI` 新增了 `strict` 形参，默认取上述常量 [@ref-zoo-code-src-strict-tool-schemas-convert-signature] [@ref-zoo-code-src-strict-tool-schemas-use-strict]。
- 关闭时（`openAiStrictToolSchemas: false`）非 MCP 工具一律以 `strict: false` 发送，并且 `parameters` **原样透传**声明的 schema，保留原有的 `required` 约束；开启时则走 `convertToolSchemaForOpenAI` 的改写路径。MCP 工具（`mcp--` 前缀）在两种情况下都不受该设置影响，始终 `strict: false` 且保留可选参数 [@ref-zoo-code-src-strict-tool-schemas-mcp-prefix] [@ref-zoo-code-src-strict-tool-schemas-use-strict]。
- 改写路径本身会改变 schema 内容：把所有属性塞进 `required`、给对象 schema 补 `additionalProperties: false`、并把 `type: [..., "null"]` 的可空类型收窄成非空类型，并递归处理嵌套对象与数组；这就是「严格模式同时重写 schema」的含义 [@ref-zoo-code-src-strict-tool-schemas-rewrite-rules] [@ref-zoo-code-src-strict-tool-schemas-required-all] [@ref-zoo-code-src-strict-tool-schemas-schema-clone]。
- 生效范围是请求体的四处拼装点：`createMessage` 的流式与非流式分支，以及单次补全 `completePrompt` 的流式与非流式分支，四处都把同一个 `strictToolSchemas` 传给转换函数；`createMessage` 与 `completePrompt` 各自从选项读一次 `this.options.openAiStrictToolSchemas ?? DEFAULT_OPEN_AI_STRICT_TOOL_SCHEMAS` [@ref-zoo-code-src-strict-tool-schemas-option-read] [@ref-zoo-code-src-strict-tool-schemas-stream-body] [@ref-zoo-code-src-strict-tool-schemas-completion-body]。
- 设置开关在 VS Code 设置面板的 OpenAI Compatible 区块里，UI 默认勾选值与常量一致，取消勾选即写入 `openAiStrictToolSchemas: false` [@ref-zoo-code-src-strict-tool-schemas-ui-checkbox]。
- 与 Extra Body 的关系：`tools`、`tool_choice`、`parallel_tool_calls` 等都属保留键，Extra Body 无法改写它们，所以 `strict` 不能通过 Extra Body 间接调整，只能用本设置 [@ref-zoo-code-src-strict-tool-schemas-extra-body-reserved]。
- 该设置挂在 `openai` provider 定义上，只由 `OpenAiHandler` 读取；同一基类上的其他 provider 调用 `convertToolsForOpenAI` 时不传该形参，例如 DeepSeek 与 Zoo Gateway 的请求体仍是单参数调用，因此这些路径固定取默认值 `true`，不受这个开关影响 [@ref-zoo-code-src-strict-tool-schemas-other-providers] [@ref-zoo-code-src-strict-tool-schemas-zoo-gateway]。

```json
// 依据 packages/types/src/provider-settings/openai.ts 在 commit 2baac5e5 的 openAiProviderDefinition schema（值均为占位符）
{
  "apiProvider": "openai",
  "openAiBaseUrl": "https://your-gateway.example.com/v1",
  "openAiApiKey": "your_api_key",
  "openAiModelId": "your-model-id",
  "openAiStrictToolSchemas": false
}
```

- Azure OpenAI 走同一兼容层：Base URL 填资源端点或含 `/openai` 的完整地址（缺失时自动补齐），并额外提供部署名与 API 版本，请求路径形如 `.../openai/deployments/部署名/chat/completions?api-version=版本` [@ref-zoo-code-docs-openai-compatible-general]。
- 只影响界面或本地路由的项：模型选择器展示、档案切换、温度/thinking 等滑块，以及速率限制与成本统计；真正进入请求体的只有上列参数与 Extra Body [@ref-zoo-code-docs-profiles]。

## 模型清单与能力元数据 {#providers-models}

- 模型 ID 由档案里的 provider 专有字段承载（公共形状里是 `apiModelId`，各 provider 可换成自己的键），解析器通过每个 provider 定义的 `getModelId` 访问器读取 [@ref-zoo-code-src-provider-settings-base]。
- 动态模型清单按 provider 分别抓取：OpenRouter、Vercel AI Gateway、Requesty、LiteLLM、Ollama、LM Studio、Poe、DeepSeek、Moonshot、Zoo Gateway、Kimi Code 等各有 fetcher；抓取结果按 provider（含 URL/鉴权维度）分键缓存，内存缓存 TTL 为 5 分钟，抓取超时上限 15 秒 [@ref-zoo-code-src-model-cache]。
- 能力元数据由 `ModelInfo` 表达，关键字段包括 `maxTokens`、`maxThinkingTokens`、`contextWindow`、`supportsImages`、`supportsPromptCache`、`promptCacheRetention`、`supportsVerbosity`、`supportsMaxTokens`、`supportsReasoningBudget`、`supportsReasoningBinary`、`supportsTemperature`、`defaultTemperature`、`requiredReasoningBudget`、`supportsReasoningEffort`、`preserveReasoning`、`requiresResponsesApi` 与 `supportedParameters` [@ref-zoo-code-src-model-info]。
- 这些元数据决定请求怎么发：`supportsTemperature` 与 `defaultTemperature` 决定是否/怎样发送 `temperature`，`contextWindow` 参与输出上限的 20% 封顶计算，`supportsReasoningEffort` 决定可选的推理强度枚举 [@ref-zoo-code-src-model-info] [@ref-zoo-code-src-openai-compatible]。
- 自定义模型能力可由用户在「Model Configuration」里覆盖：Max Output Tokens、Context Window、Image Support、Computer Use、Input/Output Price [@ref-zoo-code-docs-openai-compatible-general]。
- 内置 provider 的模型清单是各 provider 自己的 `ModelInfo` 字面量表，条目会随上游新增而变化。同一模型在不同 provider 路径上的元数据并不相同，选模型时以对应 provider 表为准：例如 `gpt-6.1-sol` 在 OpenAI 原生路径上是 1,050,000 上下文窗口、默认推理强度 `medium`、带价格与长上下文加价规则，而在 OpenAI Codex 订阅路径上是 872,000 上下文窗口、默认推理强度 `low`、价格记 0（由订阅承担）[@ref-zoo-code-src-model-openai-gpt61] [@ref-zoo-code-src-model-openai-gpt61-pricing] [@ref-zoo-code-src-model-codex-gpt61]。
- 能力元数据里还有一类“工具面”字段会直接影响请求：`includedTools` / `excludedTools` 指定该模型只允许走哪套编辑工具（上述 GPT-6.1 Sol 条目只放行 `apply_patch`，排除 `apply_diff` 与 `write_to_file`）[@ref-zoo-code-src-model-openai-gpt61]。
- 长上下文加价由 `longContextPricing` 表达：超过阈值后按倍数调整输入/输出/缓存写入/缓存读取价格，GPT-6.1 Sol 的阈值是 272,000 token，输出按 1.5 倍、其余按 2 倍，并适用于 `default`/`flex`/`priority` 三个服务层级 [@ref-zoo-code-src-model-openai-gpt61-pricing]。
- 推理能力的表达方式按 provider 而不同：Claude Opus 5.5 只保留二元的 `supportsReasoningBinary`、声明固定走 adaptive thinking 并拒收手工 `budget_tokens`，因此其 `maxTokens` 是 128,000 的名义值而不再因关闭推理而下调 [@ref-zoo-code-src-model-anthropic-opus55]。
- OpenCode Go 走独立的模型表，允许把 `reasoningEffort` 关到 `disable`，并用峰值价格近似其分时定价（来源注释说明这是权宜之计，等 `ModelInfo` 能表达时段后再细化）；该表下 DeepSeek V4.1 Flash 是 1,000,000 上下文、384,000 最大输出 [@ref-zoo-code-src-model-opencode-deepseek]。

## 响应处理、工具调用与重试 {#providers-responses}

- Zoo Code 只使用**原生工具调用**：工具定义按 OpenAI 原生 tools schema 发送，工具调用以独立事件流式返回，参数增量到达；没有 XML 回退路径，模型不支持原生工具调用就不能使用 [@ref-zoo-code-docs-openai-compatible-tools]。
- 工具 schema 的最终形态还受上面的 `openAiStrictToolSchemas` 控制：开启时工具定义带 `strict: true` 且 schema 被改写成 strict 模式形状，关闭时带 `strict: false` 并原样发送声明的 schema；MCP 工具两种情况下都是 `strict: false`，以保留 MCP server 声明的可选参数 [@ref-zoo-code-src-strict-tool-schemas-use-strict]。
- 同一批工具元数据可能被「先严格、后非严格」的两次请求共用；本次固定来源为此把 schema 规范化改成对每个属性先克隆再改写，避免严格模式在第一次请求里就地改掉调用方持有的 schema，使后续关闭严格的请求仍能发出声明的可空 schema [@ref-zoo-code-src-strict-tool-schemas-schema-clone]。
- 兼容层的 `createStream` 产出增量流，工具调用参数边生成边下发，减少「决定调用」到「开始执行」之间的延迟 [@ref-zoo-code-src-openai-compatible] [@ref-zoo-code-docs-openai-compatible-tools]。
- 错误统一经 `handleProviderError` 处理：保留 HTTP 状态码、`RetryInfo`（429）等元数据供重试逻辑使用，同时生成面向用户的提示 [@ref-zoo-code-src-error-handler]。
- 速率限制是客户端侧的主动等待：若档案设置了 `rateLimitSeconds` 且距上次请求不足该间隔，请求循环会在发起前等待（仅在首次尝试时展示倒计时），随后才调用 provider [@ref-zoo-code-src-rate-limit]。
- provider 侧的重试策略按实现不同：OpenAI Codex 在授权失败时刷新 token 后重试，且只在 SDK 尚未产出任何响应时才允许重放 [@ref-zoo-code-src-codex-retry]；Bedrock 把节流错误包装成可识别错误，交给 `Task` 里的重试机制处理 [@ref-zoo-code-src-bedrock-throttle]。固定来源没有给出统一的「最大重试次数」常量，重试语义属于各 provider 实现细节。
- 后端约定：必须实现 OpenAI 兼容的函数调用；部分兼容 provider 只实现了子集，遇到工具调用错误应改换模型 [@ref-zoo-code-docs-openai-compatible-tools]。

## 诊断与排查 {#providers-diagnostics}

- 分层排查：确认档案已选中且 provider 字段正确 → 确认 Base URL/密钥/模型 ID 有效 → 观察请求是否发出（VS Code 设置 `apiRequestTimeout`（文档写作 `roo-cline.apiRequestTimeout`）控制等待上限，0 表示不超时）→ 再看后端是否返回可用响应 [@ref-zoo-code-docs-openai-compatible-trouble] [@ref-zoo-code-docs-settings-vscode]。
- 文档列出的四类典型报错：`Invalid API Key`（核对密钥）、`Model Not Found`（模型 ID 不被 provider 接受）、Azure OpenAI 的 `404 Resource not found`（Base URL 或部署名不对）、连接错误（Base URL 不可达），以及工具调用错误（模型不支持原生工具调用）[@ref-zoo-code-docs-openai-compatible-trouble]。
- 文档里的 VS Code 设置键用 `roo-cline.*` 前缀（改名遗留），而固定 commit 的扩展清单声明的是 `zoo-code.*` 前缀；按本文固定来源逐一核对时以清单与文档各自的写法为准 [@ref-zoo-code-docs-settings-vscode] [@ref-zoo-code-src-extension-config]。
- 需要看真实报文时可用调试代理：`debugProxy.enabled` 打开后所有 API 请求经 `debugProxy.serverUrl`（默认 `http://127.0.0.1:8888`）转发，`debugProxy.tlsInsecure` 允许自签名证书（文档写作 `roo-cline.debugProxy.*`） [@ref-zoo-code-docs-settings-vscode]。
- 错误对象会带上状态码与错误详情再抛给上层，用户可见的报错文本由 provider 名加前缀生成，便于区分是哪个 provider 失败 [@ref-zoo-code-src-error-handler]。
- 模型清单的内存缓存 TTL 为 5 分钟、单次抓取上限 15 秒，并且同一 provider 的并发刷新会被合并成一次请求（single-flight），因此刚变更 provider 端点后短时间内可能仍看到旧清单 [@ref-zoo-code-src-model-cache]。
