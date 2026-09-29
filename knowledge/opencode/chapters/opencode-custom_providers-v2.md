---
schema_version: 2
record_kind: production
edition_id: opencode-custom_providers-v2
harness_id: opencode
topic: custom_providers
title: OpenCode 的 Provider 与模型机制
sections:
  - section_id: providers-definition
    source_refs:
      - ref-opencode-providers-entry
      - ref-opencode-providers-custom
      - ref-opencode-providers-auth
      - ref-opencode-providers-protocol
  - section_id: providers-models
    source_refs:
      - ref-opencode-providers-models
      - ref-opencode-providers-metadata
      - ref-opencode-providers-forwarding
      - ref-opencode-providers-custom
      - ref-opencode-providers-trouble
  - section_id: providers-diagnostics
    source_refs:
      - ref-opencode-providers-trouble
      - ref-opencode-providers-auth
questions:
  - question_id: providers.entry
    section_id: providers-definition
    status: answered
    source_refs:
      - ref-opencode-providers-entry
      - ref-opencode-providers-custom
  - question_id: providers.auth
    section_id: providers-definition
    status: answered
    source_refs:
      - ref-opencode-providers-auth
      - ref-opencode-providers-custom
  - question_id: providers.protocol
    section_id: providers-definition
    status: answered
    source_refs:
      - ref-opencode-providers-protocol
      - ref-opencode-providers-custom
  - question_id: providers.models
    section_id: providers-models
    status: answered
    source_refs:
      - ref-opencode-providers-models
      - ref-opencode-providers-custom
  - question_id: providers.metadata
    section_id: providers-models
    status: partial
    source_refs:
      - ref-opencode-providers-metadata
      - ref-opencode-providers-custom
  - question_id: providers.forwarding
    section_id: providers-models
    status: answered
    source_refs:
      - ref-opencode-providers-forwarding
  - question_id: providers.responses
    section_id: providers-models
    status: partial
    source_refs:
      - ref-opencode-providers-forwarding
      - ref-opencode-providers-trouble
  - question_id: providers.diagnostics
    section_id: providers-diagnostics
    status: partial
    source_refs:
      - ref-opencode-providers-trouble
      - ref-opencode-providers-auth
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下字段属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。示例中的凭据一律写成占位符。

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

前提是数值与后端实际能力相符，写小了会过早触发压缩，写大了会让宿主高估可用上下文。固定来源只明确记录 context、output 与显示名 name，视觉、推理强度等其它能力元数据未在此页定义，故本项标 partial。 [@ref-opencode-providers-metadata] [@ref-opencode-providers-custom]

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

流式响应受 header 与 chunk 超时约束，超时即中止请求；常见错误来自 provider id 不一致、npm 包选错或 baseURL 写错。文档未给出重试语义，故本项对“重试”标 partial。 [@ref-opencode-providers-forwarding] [@ref-opencode-providers-trouble]

## 诊断 {#providers-diagnostics}

opencode auth list 检查凭据是否加入。自定义 provider 再核对 /connect 使用的 provider id 与配置 id 是否一致、npm 包是否正确、options.baseURL 是否指向正确端点。要在配置可读、模型可选、请求已发送、后端可用四层之间区分，文档只覆盖配置与端点核对，模型选择由 /models 确认，请求与后端两层没有专用命令，需看实际调用结果，故本项标 partial。 [@ref-opencode-providers-trouble] [@ref-opencode-providers-auth]
