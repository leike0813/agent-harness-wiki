---
schema_version: 3
record_kind: production
edition_id: trae-trae-custom_providers-v1
harness_id: trae
topic: custom_providers
title: "Trae IDE 的模型来源：内置模型、自定义 Provider 与能力元数据"
sections:
  - section_id: providers-scope
    surface_ids: [trae]
    source_refs: [ref-trae-models-builtin, ref-trae-models-switch, ref-trae-models-pricing, ref-trae-subagents-models]
  - section_id: providers-entry
    surface_ids: [trae]
    source_refs: [ref-trae-models-add]
  - section_id: providers-protocol
    surface_ids: [trae]
    source_refs: [ref-trae-models-add]
  - section_id: providers-metadata
    surface_ids: [trae]
    source_refs: [ref-trae-models-add, ref-trae-models-series]
  - section_id: providers-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-models-add, ref-trae-models-manage]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [trae]
        section_id: providers-entry
        status: answered
        source_refs: [ref-trae-models-add]
  - question_id: providers.auth
    answers:
      - surface_ids: [trae]
        section_id: providers-entry
        status: partial
        source_refs: [ref-trae-models-add]
  - question_id: providers.protocol
    answers:
      - surface_ids: [trae]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-trae-models-add]
  - question_id: providers.models
    answers:
      - surface_ids: [trae]
        section_id: providers-scope
        status: answered
        source_refs: [ref-trae-models-builtin, ref-trae-models-switch, ref-trae-subagents-models]
  - question_id: providers.metadata
    answers:
      - surface_ids: [trae]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-trae-models-add, ref-trae-models-series]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [trae]
        section_id: providers-metadata
        status: partial
        source_refs: [ref-trae-models-add, ref-trae-models-series]
  - question_id: providers.responses
    answers:
      - surface_ids: [trae]
        section_id: providers-protocol
        status: unknown
        source_refs: [ref-trae-models-add]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-trae-models-add, ref-trae-models-manage]
---

## 固定来源与模型清单 {#providers-scope}

本章来源为 `docs.trae.ai` 的 `/ide/models`（Built-in models & custom models）页面快照，并以 `/ide/subagents` 的模型字段表作为交叉验证。Trae 闭源、无官方 npm 包，整章为来源级知识；模型清单、价格与上下文窗口随版本变动，文档快照未标注适用的客户端版本。

TraeCode 同时提供**内置模型**与**自定义模型**两条来源。内置模型由文档固定列出 19 项（Seed-2.1-Turbo、GPT-6-Astra、GPT-6-Sol、GPT-6-Luna、GPT-5.6-Sol、GPT-5.6-Terra、GPT-5.6-Luna、GPT-5.5、GPT-5.4、GPT-5.2、GLM-5.2、DeepSeek-V4-Flash、Kimi-K3、Kimi-K2.7-Code、Kimi-K2.5、Gemini-3.1-Pro-Preview、Gemini-3-Flash-Preview、MiniMax-M3、MiniMax-M2.7），部分模型需要升级套餐后可用，Seed/MiniMax/GLM 系列对美国地区用户不可用。[@ref-trae-models-builtin]

切换模型在聊天输入框右下角点当前模型名打开列表选择；每个模型能力不同，"You can hover your mouse over the model name to view the capabilities supported by that model."。[@ref-trae-models-switch]

官方按百万 token 公布各模型的 Input / Cache Read / Cache Write / Output 单价，并对部分模型按 `<=272k` 与 `>272k` 分段计价（Gemini/MiniMax 系列按 `<=200k` 分段）；价格表按模型逐行给出，是判断"某模型实测可用"之外的计费依据。[@ref-trae-models-pricing]

subagent 的 `model` 字段只能填内置模型，可填值与上表不同名——文档另给了 10 个取值（`gpt-5.4`、`gpt-5.2`、`Dola-Seed-2.0-Code`、`minimax-m3`、`minimax-m2.7`、`kimi-k2.5`、`deepseek-v3.2`、`gemini-3.1-pro`、`gemini-3-flash-solo`、`gemini_2.5_flash`），说明用户可见的模型名与配置里可写的模型 ID 不是同一套字符串。[@ref-trae-subagents-models]

## 自定义 Provider 的入口与字段 {#providers-entry}

入口是 `Settings > Models` → `Add Model`，随后在弹窗里二选一：**TraeCode 预设的模型提供方** 或 **Custom Model**。[@ref-trae-models-add]

**预设提供方路径**需要填：[@ref-trae-models-add]

| 参数 | 说明 |
| :-- | :-- |
| Provider | 上一步选中的提供方，可切换 |
| Config Type | 部分提供方需选择计费/资源方式：`Pay-as-you-go`、`Coding Plan`、`Agent Plan` |
| Model | 从预设模型里选；要换版本时点 `Other Models` 手填模型 ID |
| API Key | 调用模型所需的密钥，输入框右上角有 `Get API key` 跳转到提供方平台 |

**Custom Model 路径**需要填 `API Format`、`Custom Request URL`、`Model ID`、`Display Name`、`API Key`。[@ref-trae-models-add]

**凭据**只有 API Key 一种形式，通过界面输入并保存，文档没有描述环境变量读取、凭据轮换或多密钥管理，因此 `providers.auth` 只覆盖"在某处录入 key + 提供方 base URL/完整 URL"这一层；文档也没有说明 key 的落盘位置与加密方式。[@ref-trae-models-add]

## 请求协议与端点形态 {#providers-protocol}

`API Format` 只有两个取值：[@ref-trae-models-add]

- `OpenAI Chat Completions`——兼容 OpenAI 的 `/v1/chat/completions` 规范，适用于大多数 OpenAI 兼容服务（OpenAI、DeepSeek、OpenRouter、部分 Ollama/OpenAI 兼容代理等）；
- `Anthropic Messages`——兼容 Anthropic 的 `/v1/messages` 规范，适用于 Claude 系列及兼容服务。

`Custom Request URL` 有两种填法：打开 `Full URL` 开关时填完整 URL（如 `https://api.openai.com/v1/chat/completions` 或 `https://api.anthropic.com/v1/messages`）；关闭开关时填 base URL（如 `https://api.openai.com/v1` 或 `https://api.anthropic.com`），"TraeCode appends the request path based on the selected API format"——即路径由所选的协议决定，用户只提供前缀。[@ref-trae-models-add]

**缺口（`providers.responses`）**：固定来源没有描述自定义模型接入后的流式返回、工具调用、错误重试与后端契约（例如是否需要支持 function calling、SSE 格式要求），也没有说明请求失败时的重试策略；已检查的入口是 `/ide/models` 的 Add a custom model 与 Reference 两节，缺失的是协议行为描述。[@ref-trae-models-add]

## 能力元数据与参数映射 {#providers-metadata}

`Advanced Settings` 里的字段决定了模型能力在客户端侧的声明方式与请求参数：[@ref-trae-models-add]

| 字段 | 作用与条件 |
| :-- | :-- |
| Model Series | 仅 Custom Model 可用；选中 GPT-5 / Gemini-3 / Deepseek-4 系列后启用该系列的协议适配与推荐超参 |
| Context Window (Token) | 单次请求最大输入 token 与单次响应最大输出 token；留空则用内置最优默认值，默认值随模型不同 |
| Tool Call Rounds | 单个任务内允许的最大工具调用轮数；留空用默认值 |
| Image Input Support | 打开后模型可接收图文混合输入，前提是模型本身支持视觉 |
| Thinking Mode | 是否先推理再回答；`Follow model default` 时用提供方默认 |
| Hyperparameters | 采样参数 `Temperature`（[0,2]）、`Top P`（[0,1]）、`Top K`；留空用提供方默认 |

**Model Series 的实际效果**已按系列写明（这是参数如何映射到请求的唯一描述）：GPT-5 系列会自动把 `MaxTokens` 协议字段转换为 GPT-5 要求的 `MaxCompletionTokens`，并把 Temperature 固定为 1、TopP 置 0、TopK 置 50，输入上限提升到 240,000 token；Gemini-3 系列会按 `thought_signature` 解析推理内容（默认配置用 `reasoning_content`），并把 Temperature 置 0.1、TopP 置 0.9、TopK 置 50；Deepseek-4 系列默认开启思考模式，超参取 0.1/0.9/50，输入上限从默认 112,000 提升到 616,000 token、输出上限从 16,000 提升到 384,000 token。[@ref-trae-models-series]

**缺口（`providers.forwarding`）**：除上述三处联动外，文档没有给出完整的"配置字段 → 请求体字段"映射表（例如 UI 里的超参是原样透传还是被改写），也没有说明哪些设置只影响界面展示。

## 保存、启停与诊断 {#providers-diagnostics}

添加时点 `Add Model` 会立即校验："TraeCode will call the provider's API to check whether the API key is valid"——连接成功模型进入列表，失败时窗口显示提供方返回的错误信息与日志，可直接用于排查。这构成"配置可读 → 请求已发出 → 后端可用"三段中最完整的一条可观察链路。[@ref-trae-models-add]

添加后可编辑、删除、启用/禁用：启用后自定义模型出现在聊天输入框的模型列表里，禁用后仍留在模型管理面板但不出现在列表中；删除后从列表移除且不可再用。[@ref-trae-models-manage]

**缺口（`providers.diagnostics`）**：文档没有给出区分"模型可选但请求未发出"与"请求已发出但后端不可用"的独立检查入口（例如请求日志或连通性测试按钮）；已检查入口是 `Settings > Models` 的添加校验与模型列表状态。[@ref-trae-models-manage]
