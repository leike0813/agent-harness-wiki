---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-custom_providers-v1
harness_id: deepseek-harness
topic: custom_providers
title: "DeepSeek Harness 的自定义 Provider：路由定义、凭据引用、协议、模型与转发边界"
sections:
  - section_id: providers-routes
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-entry-e01, ref-dsh-custom_providers-providers-entry-e02, ref-dsh-custom_providers-providers-entry-e03, ref-dsh-custom_providers-providers-entry-e04]
  - section_id: providers-credentials
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-auth-e01, ref-dsh-custom_providers-providers-auth-e02, ref-dsh-custom_providers-providers-auth-e03, ref-dsh-custom_providers-providers-auth-e04, ref-dsh-custom_providers-providers-auth-e05]
  - section_id: providers-protocols
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-protocol-e01, ref-dsh-custom_providers-providers-protocol-e02, ref-dsh-custom_providers-providers-protocol-e03]
  - section_id: providers-model-catalog
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-models-e01, ref-dsh-custom_providers-providers-models-e02, ref-dsh-custom_providers-providers-models-e04, ref-dsh-custom_providers-providers-models-e05]
  - section_id: providers-capability-metadata
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-metadata-e01, ref-dsh-custom_providers-providers-metadata-e02, ref-dsh-custom_providers-providers-metadata-e03, ref-dsh-custom_providers-providers-metadata-e06]
  - section_id: providers-forwarding
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-forwarding-e01, ref-dsh-custom_providers-providers-forwarding-e04]
  - section_id: providers-streaming-and-retry
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-responses-e01, ref-dsh-custom_providers-providers-responses-e02, ref-dsh-custom_providers-providers-responses-e03, ref-dsh-custom_providers-providers-responses-e04, ref-dsh-custom_providers-providers-responses-e05]
  - section_id: providers-diagnostics
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-dsh-custom_providers-providers-diagnostics-e01, ref-dsh-custom_providers-providers-diagnostics-e02, ref-dsh-custom_providers-providers-diagnostics-e03, ref-dsh-custom_providers-providers-diagnostics-e04]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-routes
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-entry-e01, ref-dsh-custom_providers-providers-entry-e02, ref-dsh-custom_providers-providers-entry-e03, ref-dsh-custom_providers-providers-entry-e04]
  - question_id: providers.auth
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-credentials
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-auth-e01, ref-dsh-custom_providers-providers-auth-e02, ref-dsh-custom_providers-providers-auth-e03, ref-dsh-custom_providers-providers-auth-e04, ref-dsh-custom_providers-providers-auth-e05]
  - question_id: providers.protocol
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-protocols
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-protocol-e01, ref-dsh-custom_providers-providers-protocol-e02, ref-dsh-custom_providers-providers-protocol-e03]
  - question_id: providers.models
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-model-catalog
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-models-e01, ref-dsh-custom_providers-providers-models-e02, ref-dsh-custom_providers-providers-models-e04, ref-dsh-custom_providers-providers-models-e05]
  - question_id: providers.metadata
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-capability-metadata
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-metadata-e01, ref-dsh-custom_providers-providers-metadata-e02, ref-dsh-custom_providers-providers-metadata-e03, ref-dsh-custom_providers-providers-metadata-e06]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-dsh-custom_providers-providers-forwarding-e01, ref-dsh-custom_providers-providers-forwarding-e04]
  - question_id: providers.responses
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-streaming-and-retry
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-responses-e01, ref-dsh-custom_providers-providers-responses-e02, ref-dsh-custom_providers-providers-responses-e03, ref-dsh-custom_providers-providers-responses-e04, ref-dsh-custom_providers-providers-responses-e05]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-dsh-custom_providers-providers-diagnostics-e01, ref-dsh-custom_providers-providers-diagnostics-e02, ref-dsh-custom_providers-providers-diagnostics-e03, ref-dsh-custom_providers-providers-diagnostics-e04]
---

## Provider 路由定义在哪里 {#providers-routes}

一个 provider 路由是 `llm-pi-ai` 插件行里 `providers` 字典的一个键，写进当前 profile 的 `cordis.patch.yml`。字典键**就是**请求用 `GenerateOptions.provider` 选择的路由名。第一方字段由 `packages/llm/llm-pi-ai/src/config.ts` 的 `profile` 对象定义：`apiKeyEnv`、`displayName`、`api`、`baseURL`、`models`、`modelOverrides`、`compat`、`defaultContextWindow`、`defaultMaxTokens`、`defaultInput`、`headers`、`reasoning`、`thinkingBudgets`、`cacheRetention`、`transport`、各项超时、图片预算与 `retryPolicy` [@ref-dsh-custom_providers-providers-entry-e02]。配置层按 bundle 行、profile patch、home 级 patch、`--patch` 覆盖层的顺序生效，而一个 patch 按 id 替换整块 config，所以一次 Cordis 覆盖会换掉整个条目 config [@ref-dsh-custom_providers-providers-entry-e03]。

界面上的入口是 **Settings → Models** 里把卡片切到 **Custom model API**，为中继、公司网关、自建服务器或任何未安装目录中的 provider 填小写 Provider ID、base URL、API 协议、凭据和至少一个模型 [@ref-dsh-custom_providers-providers-entry-e01]。官方 DeepSeek 路由是另一种扁平行：`llm-deepseek-api-key` 与 `llm-deepseek-account` 自己拥有 `baseURL`、`apiKeyEnv`、`models` 与 `deepseek-official` 路由名。插件以零路由挂载，一旦设置分区提供 profile 就注册路由；超出配置的扩展走插件 API `ctx.llm.registerAdapter(providers, adapter)`，路由替换是原子的，重复路由整体失败。

**界面差异**：六个界面是同一运行时的 profile，`dsh-base`（把 `llm-pi-ai` 休眠挂载）是 web、headless、sdk、acp 的共享第一层，Electron 桌面应用带同一份生产运行时并占用保留的 `$DSH_HOME/profiles/desktop`，差别只在 profile 路径；`sdk-minimal` 才是真例外——它不套用 `dsh-base`，只挂 `@deepseek-ai/dsh-llm-deepseek-api-key` 并硬编码 `apiKeyEnv: DEEPSEEK_API_KEY`，根本没有 `llm-pi-ai` 行，因此 `providers` 字典与第三方 OpenAI 兼容网关在该界面上不存在 [@ref-dsh-custom_providers-providers-entry-e04]。

## 凭据与环境变量引用 {#providers-credentials}

**API 密钥不进入 provider 配置。** 路由在 `apiKeyEnv` 里命名一个凭据*引用*（schema 角色 `credential-ref`），`ctx.credentials.resolve(ref)` 每次模型请求调用一次，所以轮换的密钥下一个请求就生效。默认存储是 `dsh-credentials-local`，值放在私有的 `$DSH_HOME/.credentials.yaml`，优先级固定为启动环境、存储文件、项目 `.env`、harness home `.env`；经 UI 保存的值立刻压过更旧的 `.env` 值，空的存储值在任何地方都算缺失 [@ref-dsh-custom_providers-providers-auth-e02]。UI 密钥是只写的——Models 页拿到的是脱敏的 `CredentialInfo` 描述符（`configured`/`source`/`writable`），拿不到字面秘密 [@ref-dsh-custom_providers-providers-auth-e01]。

省略 `apiKeyEnv` 会让路由处于「已配置但无密钥」：在目录路由上这会回落到 pi-ai 的 provider 原生环境发现；解析不到内容的引用会让请求失败并报 `MISSING_CREDENTIAL`，不可用的凭据报 `INVALID_CREDENTIAL` 并指明路由与引用（绝不包含密钥的一部分）[@ref-dsh-custom_providers-providers-auth-e04]。

base URL 是各适配器上的普通配置：pi-ai 路由用 `baseURL`（默认取已安装目录的端点），DeepSeek 路由依次解析显式 `baseURL`、`$DEEPSEEK_BASE_URL`、`https://api.deepseek.com/anthropic`，必须是 HTTP(S) 且不含凭据、查询串与片段，然后追加 `/v1/messages` 与 `/v1/files`（已有精确结尾 `/v1` 则复用）[@ref-dsh-custom_providers-providers-auth-e05]。写示例时避免放凭据：仓库自己的指引在 `cordis.patch.yml` 里只保留引用名（如 `apiKeyEnv: GATEWAY_API_KEY`），pi-ai 的 README 明确警告 `headers` 是纯字符串、脱敏器看不见，凭据应放在 `apiKeyEnv` 引用里 [@ref-dsh-custom_providers-providers-auth-e03]。

## 支持的协议与端点形态 {#providers-protocols}

有两个结构不同的适配器共享宿主。**（一）`dsh-llm-pi-ai`** 通过 pi-ai 库讲三种线协议，`PROTOCOLS` 表把 `openai-completions`、`openai-responses`、`anthropic-messages` 精确映射到对应 API，`supportedProtocols()` 返回这些键，`api` 字段是它们的并集，未知协议在写入处被拒；**一条路由只讲一种协议**，双协议网关需要两个路由键 [@ref-dsh-custom_providers-providers-protocol-e01]。**（二）`dsh-llm-deepseek`** 只讲 Anthropic Messages，没有 `protocol` 字段，写上会让解析报 `protocol is not configurable` [@ref-dsh-custom_providers-providers-protocol-e02]。

端点形态不同：DeepSeek 传输在解析出的根后追加 `/v1/messages` 与 `/v1/files`，pi-ai 则把 `baseURL` 原样交给库。**兼容层是第三个独立关注点**：`compat` 开关（`supportsDeveloperRole`、`maxTokensField`、`thinkingFormat`、`thinkingTokenBudgetField`、`vllmPriority`、`supportsMaxOutputTokens`、`chatTemplateKwargs`/`chatTemplateArgs` 等）重塑请求，适配 pi-ai 无法指纹识别的端点；每个开关只属于声明它的协议，否则被拒。协议**发现**（模型列举）比请求能力窄：只有两种 OpenAI 协议（bearer `GET {baseURL}/models`）与 `anthropic-messages`（`x-api-key` + `anthropic-version` 走原生 `GET /v1/models`）可读，Azure 因 `api-key`/`api-version` 要求被排除，Codex 因 OAuth 被排除 [@ref-dsh-custom_providers-providers-protocol-e03]。

界面差异只是可用协议的跟随：协议可用性取决于挂载了哪个适配器，所以 `sdk-minimal` 只能用 DeepSeek Messages 路由，其余五个界面挂载 `llm-pi-ai`、三种协议都可选。

## 模型 ID、别名与发现 {#providers-model-catalog}

pi-ai 路由的模型列表要么整体继承已安装目录，要么被 `models` 整体替换（每个条目把未设字段从同 id 的已安装模型继承默认值），要么被 `modelOverrides` 按模型 id 局部重塑。`modelOverrides` 与 `models` 列表并存、在手写路由上、或命名目录未描述的模型时都会被拒 [@ref-dsh-custom_providers-providers-models-e02]。`models` 条目字段是 `id`、`name`、`contextWindow`、`maxTokens`、`input`、`reasoningEfforts`、`compat`。

**模型别名不存在**。最接近的等价物只有显示标签 `name`、`modelOverrides` 的键（那是真实的请求模型 id，不是别名），以及一个发现映射键——即使条目命名了另一个规范 id，该键仍是请求 id [@ref-dsh-custom_providers-providers-models-e01]。

发现只盘问已安装目录未提供的路由：`listingUrl()` 对 OpenAI 协议构造 `{baseURL}/models`，对 Anthropic 构造 `{root}/v1/models?limit=1000`（仅为该列举 URL 归一化结尾 `/v1`）；解析器接受标准 `data` 数组或富化的 `models` 映射，并归一化 id、显示名、上下文窗口与输出上限。发现只返回候选元数据，**在界面保存之前什么都不落盘**；Anthropic 发现最多读 1,000 个模型且不遍历 `has_more` [@ref-dsh-custom_providers-providers-models-e05]。DeepSeek 路由上的 `models` 是**建议性**目录：未列出的模型 id 仍会以纯文本路由透传到线上，但 GUI 选择要求有目录条目 [@ref-dsh-custom_providers-providers-models-e04]。

## 能力元数据如何表达并生效 {#providers-capability-metadata}

元数据按模型条目与按路由声明。模型条目带 `name`、`contextWindow`、`maxTokens`、`input`（模态 `text`/`image`）、`reasoningEfforts` 与 `compat`；路由带 `defaultContextWindow`（默认 262,144）、`defaultMaxTokens`（32,768）、`defaultInput`（`[text]`）作为没被任何模型定尺时的回落。继承是显式的：模型自己的非空 `input` 优先，然后是已安装目录的，然后是路由的 `defaultInput`；`reasoningEfforts` 缺失表示「继承目录能力」，而 `false` 是声明一个非推理模型（此时选任何 effort 都会 `UNSUPPORTED_REASONING_EFFORT`）[@ref-dsh-custom_providers-providers-metadata-e02]。

推理级别是一个映射——每个键是 UI 提供的级别，值是在线上以 `reasoning_effort` 发送的拼写，所以 `max: xhigh` 是为自有词汇的网关重命名一个级别；只有 `off` 可以留空，因为对多数端点来说不思考才是默认参数[@ref-dsh-custom_providers-providers-metadata-e03]。真正落到客户端的是输入模态的继承顺序：`input` 只作用于该模型，显式非空选择优先，省略或留空则继承已安装目录、再回落路由的 `defaultInput`（默认 `[text]`）[@ref-dsh-custom_providers-providers-metadata-e01]；推理 effort 另由 `resolveCallConfig()` 校验并物化。

**`contextWindow` 不是请求字段**——它喂给压缩与 token 计费。DeepSeek 路由有自己的元数据：`imagePixelBudget`（正整数或 `low`）、`imageMaxBytes`、`systemPromptUpdate: in-history`、`toolUpdate: addition-only`/`in-history`，加上 `thinking`、`reasoningEffort`（`off`/`low`/`high`/`max`）与每模型的 `contextWindow`/`maxTokens`——后者在主动压缩开启时必须超过 `maxTokens` 加压缩余量。`input` 模态声明与 `compat` 开关都是**对端点的声明而不是探测**：源码只对前者明写了这句——声明了端点不提供的图片不会在这里被抓住，而是由 provider 拒绝请求；`compat` 开关同样从不被探测，但源码没有把这句话写成覆盖所有元数据字段的总规则 [@ref-dsh-custom_providers-providers-metadata-e06]。

## 配置中哪些参数真的到达请求 {#providers-forwarding}

配置是客户端的*能力声明*；请求本身由已记录的 `LlmCallConfig`（`provider`、`model`、`reasoningEffort`、`temperature`、`maxTokens`、`stop`）组装，每个字段 1:1 映射到同名的 `GenerateOptions` 字段。配置参数到达线路只有四条路径：请求字段（`maxTokens` 在请求未指定时由 `resolveCallConfig()` 物化，`reasoningEffort` 被校验并物化，`temperature` 转发，DeepSeek 在 thinking 开启时接受它但在该模式下忽略取值）；`compat` 开关重塑 body（`maxTokensField: max_tokens` vs `max_completion_tokens`、`supportsDeveloperRole: false` 停止发送 `role: "developer"`、`thinkingFormat: deepseek`、`thinkingTokenBudgetField`、`vllmPriority`、`supportsMaxOutputTokens: false` 省略 `max_output_tokens`、`chatTemplate*`）；认证与端点（凭据引用、`baseURL`、`headers`，并受 `requestImageBytes` 上界约束）；以及重试与恢复策略 [@ref-dsh-custom_providers-providers-forwarding-e01]。

**纯描述性或非线路字段**：`displayName`、`models`/`modelOverrides`（目录/UI）、`contextWindow`（压缩与 token 计费压力，永不是请求字段）、`defaultContextWindow`/`defaultMaxTokens`（回落），以及 `reasoningEfforts` 的**键**（UI 菜单，其**值**才到达线路）[@ref-dsh-custom_providers-providers-forwarding-e04]。compat 解析顺序是严格的：模型 `compat` 逐字段压过路由 `compat`，然后是已安装目录的值，然后是 pi-ai 探测；留空值的开关被拒而不是被忽略，路由上没有任何模型能读到的开关也被拒而不是看起来生效了。`GenerateOptions.stop` 在 pi-ai 路径上以 `UNSUPPORTED_OPTION` 被拒，因为 pi-ai 的通用流式 UI 无法跨 provider 保证它。

## 流式、工具调用、错误与重试 {#providers-streaming-and-retry}

适配器把一切归一到一个封闭的 `StreamChunk` 联合：`block-start`、`text-delta`、`reasoning-delta`、带 `argumentsDelta` 的 `tool-call-delta`、`block-end`、`usage`，以及终止的 `finish`（带 `reason` 与可选 `replayState`）[@ref-dsh-custom_providers-providers-responses-e01]。强制顺序与工具规则：`usage` 必须在 `finish` 之前且之后无内容；工具调用的 `arguments` 端到端保持原始 JSON 字符串（pi-ai 的工具参数是解析后的对象，所以适配器解析输入、在输出重新序列化）[@ref-dsh-custom_providers-providers-responses-e02]。只有两条被认可的错误路径——从 `stream()` 抛异常表示传输/协议错误，或以 `finish {kind:'error'|'aborted', failure}` 结束流表示带内 provider 错误——以及一个可序列化的 `LlmFailure`（`message`、`code`、`status`、`providerRetryAfterMs`、`requestId`、`offloadImages`）。空完成是可重试错误而不是静默成功：终止的 `stop` 没有内容块会被两个适配器映射成 `finish {kind:'error'}` 加规范码 `EMPTY_RESPONSE`，`dsh-llm-retry` 默认重试它 [@ref-dsh-custom_providers-providers-responses-e03]。

`dsh-llm-retry` 的 `normal` 模式对 `EMPTY_RESPONSE`、`RATE_LIMIT`、`SERVER`、`TIMEOUT`、`TRANSPORT` 各给五次重试，从 500 ms 到 10 秒的指数退避加 10% 抖动；`always` 模式先问下游恢复，然后对每次模型请求失败无限重试 [@ref-dsh-custom_providers-providers-responses-e04]。每次重试都是持久的：插件先追加一条非表面 `llm/retry` 事件（带重试 id、provider、模式、策略键、失败与计划延迟），在重试开始前立即追加 `llm/retry-started`，等待完成后在同一个打开的轮内、基于同一份持久历史重跑失败步骤 [@ref-dsh-custom_providers-providers-responses-e05]。有效的 `Retry-After` 在符合策略边界时替换本地退避。

**对后端的硬要求**：在流结束标记前发 usage；工具参数保持 JSON 对象（DeepSeek 适配器对畸形历史参数发 `{}`）；正确上报上下文溢出（两个适配器都归类到单一 `CONTEXT_WINDOW_EXCEEDED` 码）；在 pi-ai 路径上，终止的 `stop` 没有内容块会被归一为可重试的 `EMPTY_RESPONSE`。

## 四个必须分开的诊断状态 {#providers-diagnostics}

**（1）配置可读**：profile 能否解析。严格校验用于写入与更新时被改动的 provider，而已存配置的初始加载使用延迟校验，把目录失败保留为可编辑的 provider 诊断而不阻塞，所以一个存坏的路由仍可编辑，修复或删除会清掉诊断；不可服务的 profile（手写路由缺 `api`、`baseURL` 或非空 `models`）在写入处被拒并指明路由与模型 [@ref-dsh-custom_providers-providers-diagnostics-e01]。

**（2）模型可选**：只有可服务的模型保持可选，未解析的模型在**任何网络 I/O 之前**就以 `UNKNOWN_MODEL` 失败；DeepSeek 路由上 GUI 选择要求有目录条目，但已保存的选择在其目录条目消失后仍可能提交请求，未列出的 id 会以纯文本路由透传到线路——目录是建议性的，不是请求白名单。

**（3）请求已发出**：到达请求需要可解析的凭据（`MISSING_CREDENTIAL`/`INVALID_CREDENTIAL`）、已声明的模态（没有声明图片能力的图片在发送前被拒）与选定的 effort（`UNSUPPORTED_REASONING_EFFORT`）；可观察性只到 agent loop 观察到一个流句柄，这并不证明惰性的终端适配器已被构造或已开始 provider I/O。

**（4）后端确实在服务**：客户端**从不**验证。内置 provider 总是从已安装目录作答，即使它的 `baseURL` 指向一个网关也不发网络调用；发现被明确定位为「可能失败或什么都列不出的便利功能」；每个元数据或 compat 字段「是对你端点的声明而不是检查」——声明了端点不提供的图片的模型只能靠 provider 拒绝请求来暴露 [@ref-dsh-custom_providers-providers-diagnostics-e02]。诊断 DTO 是解析后 profile 上的 `catalogError` 字符串加一个 `modelErrors` 映射 [@ref-dsh-custom_providers-providers-diagnostics-e03]。

界面差异只在可观察面：只有挂载 Web 应用的界面（web、desktop）有 Models 页显示 `configured`/可写凭据徽标与获取模型的选择器；`headless`、`acp`、`sdk`、`sdk-minimal` 通过配置文件与错误码表达同样状态。常见错误码的处置在用户指南里直接给出，例如 `MISSING_CREDENTIAL` 去 Models 页存密钥或提供被引用的环境变量，`UNKNOWN_MODEL` 去选一个已配置模型或把缺失模型加进自定义 provider，以及「获取模型返回 401」要去查密钥，因为模型发现调的是 OpenAI 兼容的 `GET /models` 端点 [@ref-dsh-custom_providers-providers-diagnostics-e04]。
