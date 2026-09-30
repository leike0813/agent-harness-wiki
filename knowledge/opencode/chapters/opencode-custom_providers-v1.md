---
schema_version: 3
record_kind: production
edition_id: opencode-custom_providers-v1
harness_id: opencode
topic: custom_providers
title: OpenCode 的 Provider 与模型机制
sections:
  - section_id: providers-definition
    surface_ids: [cli]
    source_refs:
      - ref-opencode-providers-protocol
      - ref-opencode-providers-entry
      - ref-opencode-providers-auth
      - ref-opencode-providers-custom
  - section_id: providers-models
    surface_ids: [cli]
    source_refs:
      - ref-opencode-providers-models
      - ref-opencode-providers-metadata
      - ref-opencode-providers-forwarding
      - ref-opencode-providers-custom
      - ref-opencode-providers-trouble
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
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-opencode-providers-forwarding
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs:
          - ref-opencode-providers-forwarding
          - ref-opencode-providers-trouble
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs:
          - ref-opencode-providers-trouble
          - ref-opencode-providers-auth
---
本章依据固定源码提交 545f51d 的官方文档与实现。该提交不等于 npm 包 opencode-ai@1.18.32 的运行时行为；以下字段属于固定源码知识，对 1.18.32 二进制的适用性尚未建立映射。

## 定义与接入 {#providers-definition}

**providers.entry**：Provider 在配置文件的 `provider` 段定义，键名是 provider id（如 `anthropic`）；内置的 75+ provider 直接用其 id 配置。不在内置列表内的 OpenAI 兼容服务走自定义流程：先用 `/connect` 选 Other 存入凭据，再在 `opencode.json` 的 `provider` 段按 provider id 声明 `npm`、`name`、`options.baseURL` 与 `models`。任何 provider 都可用 `options.baseURL` 覆盖端点。 [@ref-opencode-providers-entry] [@ref-opencode-providers-custom]

**providers.auth**：API key 通过 `/connect` 命令写入 `~/.local/share/opencode/auth.json`，或由配置里的 `{env:VARIABLE}` 从环境变量取值，也可在 `options.apiKey` 直接写。文档示例统一用 `{env:ANTHROPIC_API_KEY}` 这类变量，避免把凭据写进配置文件。 [@ref-opencode-providers-auth] [@ref-opencode-providers-custom]

**providers.protocol**：请求经 AI SDK 与 Models.dev 元数据发出，支持 75+ provider 与本地模型。自定义 provider 用 `npm` 指定 SDK 包：`@ai-sdk/openai-compatible` 走 `/v1/chat/completions`，若模型用 `/v1/responses` 则改用 `@ai-sdk/openai`，混用场景可在 `provider.npm` 按模型覆盖；`options.baseURL` 指定端点。 [@ref-opencode-providers-protocol] [@ref-opencode-providers-custom]

## 模型、元数据与转发 {#providers-models}

**providers.models**：模型在 provider 条目下的 `models` 中声明（自定义 provider），标准 provider 的模型由 models.dev 提供。`blacklist` 从 `/models` 选择器移除指定模型，`whitelist` 只保留列出的模型，两者都按模型 ID 匹配，可先用 `whitelist` 收窄再用 `blacklist` 删除。`small_model` 为标题生成等轻量任务单独指定模型。 [@ref-opencode-providers-models] [@ref-opencode-providers-custom]

**providers.metadata**：模型的上下文与输出上限由该模型的 `limit.context` 与 `limit.output` 表达，OpenCode 用它们判断剩余上下文；标准 provider 的这两个值自动取自 models.dev，自定义 provider 需手写。固定来源只明确记录了 context、output 与显示名 `name`，视觉、推理强度等其他能力元数据未在此页定义，故本项标 partial。 [@ref-opencode-providers-metadata] [@ref-opencode-providers-custom]

**providers.forwarding**：`provider.options` 中可写 `timeout`（请求超时，默认 300000ms，设 `false` 关闭）、`headerTimeout`（等待响应头，默认 300000ms，收到头后停止计时且不限制响应体）、`chunkTimeout`（流式分块间隔超时，默认 300000ms，超时即中止）、`setCacheKey`。`baseURL` 与 `headers` 同属这一层，文档把 options 描述为直接作用于请求的 provider 选项。 [@ref-opencode-providers-forwarding]

**providers.responses**：流式响应受 header 与 chunk 超时约束，超时即中止请求；常见错误来自 provider id 不一致、`npm` 包选错或 `baseURL` 写错。文档未给出重试语义，故本项对“重试”标 partial。 [@ref-opencode-providers-forwarding] [@ref-opencode-providers-trouble]

## 诊断 {#providers-diagnostics}

**providers.diagnostics**：`opencode auth list` 检查凭据是否加入；自定义 provider 再核对 `/connect` 使用的 provider id 与配置 id 是否一致、`npm` 包是否正确、`options.baseURL` 是否指向正确端点。要区分“配置可读、模型可选、请求已发送、后端可用”四层，文档只覆盖配置与端点核对，模型选择由 `/models` 确认，请求与后端两层没有专用命令，需看实际调用结果，故本项标 partial。 [@ref-opencode-providers-trouble] [@ref-opencode-providers-auth]
