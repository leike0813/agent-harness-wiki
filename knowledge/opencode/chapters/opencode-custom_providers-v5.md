---
schema_version: 3
record_kind: production
edition_id: opencode-custom_providers-v5
harness_id: opencode
topic: custom_providers
title: OpenCode 的 Provider 与模型机制
sections:
  - section_id: providers-definition
    surface_ids: [cli]
    source_refs:
      - ref-opencode-providers-entry
      - ref-opencode-providers-custom
      - ref-opencode-providers-auth
      - ref-opencode-providers-protocol
      - ref-opencode-providers-xai-image-mime
  - section_id: providers-models
    surface_ids: [cli]
    source_refs:
      - ref-opencode-providers-models
      - ref-opencode-providers-metadata
      - ref-opencode-providers-forwarding
      - ref-opencode-providers-custom
      - ref-opencode-providers-trouble
      - ref-opencode-providers-timeout-fetch
      - ref-opencode-providers-timeout-combine
      - ref-opencode-providers-aigateway-timeout
      - ref-opencode-providers-session-headers
      - ref-opencode-providers-gemini-efforts
      - ref-opencode-providers-gemini-defaults
      - ref-opencode-providers-tool-result-media-support
      - ref-opencode-providers-tool-result-media
      - ref-opencode-providers-xai-image-mime
      - ref-opencode-providers-xai-attachment-filter
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-opencode-providers-trouble
      - ref-opencode-providers-auth
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-definition
        status: answered
        source_refs:
          - ref-opencode-providers-entry
          - ref-opencode-providers-custom
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-definition
        status: answered
        source_refs:
          - ref-opencode-providers-auth
          - ref-opencode-providers-custom
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-definition
        status: answered
        source_refs:
          - ref-opencode-providers-protocol
          - ref-opencode-providers-custom
          - ref-opencode-providers-xai-image-mime
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-opencode-providers-models
          - ref-opencode-providers-custom
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs:
          - ref-opencode-providers-metadata
          - ref-opencode-providers-custom
          - ref-opencode-providers-gemini-efforts
          - ref-opencode-providers-gemini-defaults
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-opencode-providers-forwarding
          - ref-opencode-providers-timeout-fetch
          - ref-opencode-providers-timeout-combine
          - ref-opencode-providers-aigateway-timeout
          - ref-opencode-providers-session-headers
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs:
          - ref-opencode-providers-forwarding
          - ref-opencode-providers-trouble
          - ref-opencode-providers-timeout-fetch
          - ref-opencode-providers-timeout-combine
          - ref-opencode-providers-tool-result-media-support
          - ref-opencode-providers-tool-result-media
          - ref-opencode-providers-xai-attachment-filter
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs:
          - ref-opencode-providers-trouble
          - ref-opencode-providers-auth
---
本章依据固定源码提交 907b3bc 的官方文档与实现，工具结果附件一段补充自提交 3884062 的 packages/opencode/src/session/message-v2.ts。这些提交都不等于 npm 包 opencode-ai 的运行时行为；以下字段属于固定源码知识，对已发布二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 定义 Provider 与接入协议 {#providers-definition}

Provider 在配置文件的 provider 段定义，项目级写在项目根 opencode.json，用户级写在 ~/.config/opencode/opencode.json；键名是 provider id，例如 anthropic，内置的 75 个以上 provider 直接用其 id 配置。任何 provider 都可用 options.baseURL 覆盖端点，下面的例子把内置 provider 指到代理：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": { "baseURL": "https://api.anthropic.com/v1" }
    }
  }
}
```

前提是 provider id 拼写正确。生效结果是该 provider 的请求改走这里指定的端点。检查方式是发起一次调用看是否命中端点，或对照诊断一节的命令。 [@ref-opencode-providers-entry]

不在内置列表内的 OpenAI 兼容服务走自定义流程：先用 /connect 选 Other 存入凭据，再在 opencode.json 的 provider 段按自定义 id 声明 npm、name、options.baseURL 与 models。下面是一个最小完整示例，apiKey 用环境变量占位：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "My AI Provider Display Name",
      "options": {
        "baseURL": "https://api.myprovider.com/v1",
        "apiKey": "{env:MYPROVIDER_API_KEY}"
      },
      "models": {
        "my-model-name": { "name": "My Model Display Name" }
      }
    }
  }
}
```

字段含义：npm 是使用的 AI SDK 包，OpenAI 兼容走 /v1/chat/completions 时用 @ai-sdk/openai-compatible，模型走 /v1/responses 时改用 @ai-sdk/openai，混用场景可在 provider.npm 按模型覆盖；name 是界面显示名；models 声明可用模型；options.baseURL 是端点，options.apiKey 可选（不写则用凭据存储），options.headers 可选。前提是 /connect 使用的 provider id 与这里一致。生效结果是该 provider 与模型出现在 /models 选择列表里。 [@ref-opencode-providers-custom] [@ref-opencode-providers-auth] [@ref-opencode-providers-protocol]

请求经 AI SDK 与 Models.dev 元数据发出，支持内置 provider 与本地模型；自定义 provider 的协议由上面选择的 npm 包决定，因此选错包是常见故障源。

npm 包的选择还决定了宿主在发请求前如何加工消息内容，其中最直接的一处是 xAI 的图片格式限制：走 @ai-sdk/xai 时，宿主只保留 image/png、image/jpeg、image/webp 三种图片，其余 image/* 类型（例如 GIF）在进入请求前被丢弃。这条限制写死在按 npm 包分派的代码里，不是可配置项；换用同样指向 xAI 端点但 npm 不同的自定义 provider 时不生效。 [@ref-opencode-providers-xai-image-mime]

## 模型、能力与转发参数 {#providers-models}

模型在 provider 条目下的 models 中声明（自定义 provider），标准 provider 的模型由 models.dev 提供。blacklist 从 /models 选择器移除指定模型，whitelist 只保留列出的模型，两者都按模型 ID 匹配，可以先 whitelist 收窄再用 blacklist 删除。small_model 为标题生成等轻量任务单独指定模型：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5"
}
```

前提是这些模型 id 在对应 provider 中可用。生效结果是默认模型与轻量任务模型分别固定。检查方式是打开 /models 看列表与当前选择。 [@ref-opencode-providers-models] [@ref-opencode-providers-custom]

能力元数据用模型下的 limit 表达：limit.context 是模型接受的最大输入 token，limit.output 是最大生成 token，OpenCode 用它们判断剩余上下文；标准 provider 的值自动取自 models.dev，自定义 provider 需要手写：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "models": {
        "my-model-name": {
          "name": "My Model Display Name",
          "limit": { "context": 200000, "output": 65536 }
        }
      }
    }
  }
}
```

前提是数值与后端实际能力相符，写小了会过早触发压缩，写大了会让宿主高估可用上下文。固定来源只明确记录 context、output 与显示名 name，视觉、推理强度等其它能力元数据未在配置层定义，故本项保持 partial。 [@ref-opencode-providers-metadata] [@ref-opencode-providers-custom]

推理强度在配置层没有对应字段，而是宿主按模型 id 推断后写进请求，Google 系模型的可用档位按 id 形态分档：

| 模型 id 形态 | 可选推理档位 |
|---|---|
| 含 gemma | `minimal`、`high`（minimal 关闭思考，high 开启） |
| 旧式命名（gemini-1、gemini-2、gemini-flash-1、gemini-pro-2 等） | `low`、`high` |
| 含 flash-image | `minimal`、`high` |
| 含 pro-image | `high` |
| 其余含 flash 的 | `minimal`、`low`、`medium`、`high` |
| 其它 | `low`、`medium`、`high` |

判定用两条正则：gemini-2.5 系列单独识别，旧式命名按 gemini 加 1 或 2 的编号识别，其余按上面的关键词逐条匹配。 [@ref-opencode-providers-gemini-efforts]

自动写入的默认值也随之分档：走 @ai-sdk/google 或 @ai-sdk/google-vertex 且模型具备推理能力时，宿主写入 thinkingConfig.includeThoughts，并对非旧式命名的模型再写 thinkingLevel 为 high；旧式命名的 Gemini 不写 thinkingLevel。同一条判定也用于 OpenRouter 侧的 reasoning.effort：id 含 gemini 且不是旧式命名时才写 effort 为 high。 [@ref-opencode-providers-gemini-defaults]

也就是说，Gemini 1.x 与 2.0 之前的旧式模型 id 拿不到宿主自动设置的 high 档位，需要在配置里按上表显式指定。这只影响宿主生成的请求参数，不改变模型本身的能力声明。

provider.options 里的转发参数直接作用于请求。可写 timeout（请求超时，默认 300000 毫秒，设 false 关闭）、headerTimeout（等待响应头，默认 300000 毫秒，收到头后停止计时且不限制响应体）、chunkTimeout（流式分块间隔超时，超时即中止）、setCacheKey：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": { "timeout": 600000, "chunkTimeout": 30000, "setCacheKey": true }
    }
  }
}
```

前提是这些键写在 options 层而不是模型层。生效结果是请求按这些超时被约束。baseURL 与 headers 同属这一层。 [@ref-opencode-providers-forwarding]

三个超时不是各自独立发请求，而是在 fetch 层合成一个取消信号：请求自身的 signal、SSE 空闲计时器、响应头计时器与整体 timeout 先收进同一个数组，再由 AbortSignal.any 合成一个，任一触发即整体中止；只有一个信号时直接用它本身。 [@ref-opencode-providers-timeout-fetch] [@ref-opencode-providers-timeout-combine]

发请求时宿主强制把底层 fetch 的 timeout 置为 false，避免与合成的取消信号重复计时，并在拿到响应后清掉响应头计时器；配置了 chunkTimeout 时响应还要再经一层 SSE 包装，超时即中止。 [@ref-opencode-providers-timeout-combine]

各键的启用条件是：headerTimeout 只有写成 false 时才完全关闭，写成数字就照数字计时；chunkTimeout 只有在是大于 0 的数字时才启用空闲计时。若同时配置了 options.fetch，宿主在它外面再包一层，取消信号会同时传给自定义 fetch。 [@ref-opencode-providers-timeout-fetch]

这条规则对自建 loader 有例外。Cloudflare AI Gateway 的加载器不走通用 SDK 路径，而是自己建客户端，因此宿主改为给它单独构造一个带超时的 fetch，并把请求改走该 fetch 发送，使 AI Gateway 路径与其它 provider 的超时语义一致。 [@ref-opencode-providers-aigateway-timeout]

请求头也在客户端加工。每次模型请求都会附带 x-opencode-session-id；请求来自子会话时另加 x-opencode-parent-session-id。这两个头对所有 provider 生效，不限于 opencode 自家的 provider——后面那组带项目、会话、用户、客户端与 User-Agent 的头仍然只对 provider id 以 opencode 开头的请求附加：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "myprovider": {
      "options": {
        "headers": { "X-Request-Source": "opencode" }
      }
    }
  }
}
```

前提是后端或网关不把这些头当作未知字段拒绝。生效结果是自有网关可以按会话 id 做路由、限流或计费归集；用第三方端点时它们属于额外负载，通常无害但不可关闭。 [@ref-opencode-providers-session-headers]

工具结果里的附件也在客户端加工，且这一步同样按 npm 包分派。宿主先判断该 SDK 是否允许在工具结果里直接带媒体：@ai-sdk/anthropic、@ai-sdk/openai、@ai-sdk/amazon-bedrock/mantle 与 @ai-sdk/google-vertex/anthropic 一律允许；@ai-sdk/amazon-bedrock 只允许图片并进一步按模型 id 收窄到 anthropic.、nova、llama4、llama-4；@ai-sdk/xai 只允许 image/*；@ai-sdk/google 只允许 id 含 gemini-3 且不含 gemini-2 的模型。不允许的媒体（图片与 PDF）会被抽出，改由一条独立用户消息发送；附件只在工具结果里出现时才走这条路。 [@ref-opencode-providers-tool-result-media-support] [@ref-opencode-providers-tool-result-media]

xAI 还有一层更窄的限制：即使格式属于 image/*，只要不是 png、jpeg 或 webp，宿主就在抽取之前直接把该附件从工具结果里去掉。源码注释给出的原因是 xAI 对其它图片格式（例如 GIF）返回 invalid_image，会让整次请求失败。 [@ref-opencode-providers-xai-image-mime] [@ref-opencode-providers-xai-attachment-filter]

这个过滤只作用于工具结果的附件，不作用于用户在输入里附的文件——用户消息里的 file part 按原 mime 透传，宿主不会替 xAI 删减格式。被丢掉的图片不会以独立用户消息的形式补发（过滤发生在媒体抽取之前），因此在 xAI 下用它拍出来的截图类内容会静默消失，不会看到错误提示。

流式响应受 header 与 chunk 超时约束，超时即中止请求；常见错误来自 provider id 不一致、npm 包选错或 baseURL 写错。文档未给出重试语义，故本项对“重试”标 partial。 [@ref-opencode-providers-forwarding] [@ref-opencode-providers-trouble]

## 诊断 {#providers-diagnostics}

opencode auth list 检查凭据是否加入。自定义 provider 再核对 /connect 使用的 provider id 与配置 id 是否一致、npm 包是否正确、options.baseURL 是否指向正确端点。要在配置可读、模型可选、请求已发送、后端可用四层之间区分，文档只覆盖配置与端点核对，模型选择由 /models 确认，请求与后端两层没有专用命令，需看实际调用结果，故本项标 partial。 [@ref-opencode-providers-trouble] [@ref-opencode-providers-auth]

排查超时问题时，先确认超时键写在 options 层，再按被中断的阶段区分：headerTimeout 触发说明后端迟迟不回响应头，chunkTimeout 触发说明流已经开始但中途停住，timeout 触发则多半是整体耗时超限。三者合成的取消信号不会告诉你是哪一个，需要靠这段时间的表现区分。
