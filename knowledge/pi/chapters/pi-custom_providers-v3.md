---
schema_version: 3
record_kind: production
edition_id: pi-custom_providers-v3
harness_id: pi
topic: custom_providers
title: Pi 自定义 provider：入口、模型与凭据（固定源码 8369268）
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs:
      - ref-pi-cp-doc-registration
      - ref-pi-cp-doc-model-replacement
  - section_id: providers-models
    surface_ids: [cli]
    source_refs:
      - ref-pi-providers-models-entry
      - ref-pi-providers-api-types
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
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs:
          - ref-pi-providers-models-entry
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs:
          - ref-pi-providers-models-entry
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
固定来源为 pi 仓库提交 83692682 的 Pi coding agent 包与 `packages/ai` 类型定义（`packages/coding-agent/docs/custom-provider.md`、`docs/models.md`、`packages/ai/src/types.ts`）。相对 pi-custom_providers-v2 更正一处：provider 凭据的优先级顺序里，`models.json` 的 `apiKey` 已排在环境变量之前。本章取代 v2 的对应结论；v2 中未被本章重写的内容仍按其固定来源范围阅读。本库未为 Pi 建立软件版本映射，按 source_only 阅读。

## 注册 provider {#providers-entry}

`pi.registerProvider()` 从扩展工厂调用，Pi 会等待异步工厂完成再继续启动，因此在工厂里注册的 provider 可用于启动期模型选择与 `pi --list-models`。[@ref-pi-cp-doc-registration] 当前来源给出两种注册形态：注册来自 `@earendil-works/pi-ai` 的完整 `Provider`（具备原生鉴权、过滤、发现、刷新与流式行为），或按旧配置形态注册 provider 名称加 `ProviderConfig`；文档建议新的集成优先用完整 provider，Pi 会把 `models.json` 的覆盖合成到已注册的原生 provider 之上。[@ref-pi-cp-doc-registration] 相对 v2，provider 扩展的类型导入包名同样随项目改名为 `@earendil-works/pi-ai`。

只为既有 provider 填 `baseUrl` 或 `headers` 会保留它的内置模型；在旧配置形态里给出 `models` 则替换该 provider 在 chat、image 与 classifier 操作上的全部模型。`type` 省略时按 `"chat"` 处理，image 与 classifier 模型需要显式判别字段，并通过 `images`／`classifiers` 字段以各自 `api` 值为键给出实现。[@ref-pi-cp-doc-model-replacement]

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

## 凭据解析顺序 {#providers-auth}

多个凭据来源同时存在时，Pi 先用运行时的 `--api-key`，其次是 `auth.json` 中已存的凭据，再次是 `models.json` 里的 `apiKey`，最后才是 provider 的环境变量或环境中的云凭据；provider 扩展可自定义鉴权行为。[@ref-pi-providers-auth-order] v2 把环境变量排在 `models.json` 之前，该顺序在当前来源下不成立。

## 未覆盖的维度 {#providers-behavior}

请求转发、响应处理与诊断的具体扩展点（含 `stream`／`streamSimple` 的取舍标准）在本固定来源下未逐条登记，本章按 `partial` 记录，不给配置步骤；需要时应读 `docs/custom-provider.md` 与 `packages/ai/src/api` 的实现。`pi.registerProvider()` 仍在扩展工厂里注册，并在工厂阶段等待完成。[@ref-pi-cp-doc-registration]
