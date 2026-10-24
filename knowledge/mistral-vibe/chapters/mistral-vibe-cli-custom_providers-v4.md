---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-custom_providers-v4
harness_id: mistral-vibe
topic: custom_providers
title: "Mistral Vibe CLI 的自定义 Provider：字段、backend 与 api_style、模型元数据"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-mv-301-provider-config, ref-mv-301-provider-defaults]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-mv-301-provider-api-key, ref-mv-301-provider-config]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-mv-301-provider-factory, ref-mv-301-api-adapters, ref-mv-301-model-config, ref-mv-301-provider-retries, ref-mv-301-provider-config]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-mv-301-model-config, ref-mv-301-model-resolution]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-mv-301-model-config, ref-mv-301-provider-defaults]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-provider-api-key, ref-mv-301-provider-probe, ref-mv-301-provider-missing-key]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-mv-301-provider-config, ref-mv-301-provider-defaults]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-mv-301-provider-api-key, ref-mv-301-provider-config]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-mv-301-provider-factory, ref-mv-301-api-adapters]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-mv-301-model-config, ref-mv-301-model-resolution]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-mv-301-model-config]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-mv-301-model-config, ref-mv-301-provider-config]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-mv-301-provider-retries, ref-mv-301-provider-factory]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-mv-301-provider-api-key, ref-mv-301-provider-probe, ref-mv-301-provider-missing-key]
---

固定来源是官方仓库提交 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志 3.0.1），界面为 `cli`。Provider 是配置里的一个普通数组表条目，没有独立的插件或 REST 注册入口；自定义 provider 的全部能力都由 `ProviderConfig` 与它的模型条目表达。

## 定义位置与字段 {#providers-entry}

Provider 写在 `config.toml` 的 `[[providers]]` 里，按 `name` 做并集合并：用户层与项目层写同名 provider 是**叠加字段**，不是整条替换。`ProviderConfig` 的第一方字段是：[@ref-mv-301-provider-config]

| 字段 | 默认 | 用途 |
| :-- | :-- | :-- |
| `name` | 必填 | provider 标识，也是模型条目 `provider` 指向的目标 |
| `api_base` | 必填 | 请求基址（含版本段，如 `/v1`） |
| `api_key_env_var` | 空 | 凭据环境变量名；空表示无鉴权 |
| `browser_auth_base_url` / `browser_auth_api_base_url` | 仅 `mistral` 有默认 | 浏览器登录（console）用的地址 |
| `browser_auth_allow_origin_rewrite` | 假 | 分域部署时允许把返回的登录/轮询 URL 改写到上面的基址 |
| `api_style` | `openai` | generic 后端的线格式 |
| `backend` | `generic` | `mistral` 或 `generic` 两族实现 |
| `reasoning_field_name` | `reasoning_content` | 从响应里读推理文本的字段名 |
| `emits_finish_reason` | 真 | 为假时允许流在没有 finish reason 时正常结束 |
| `project_id` / `region` | 空 | Vertex 一类部署需要的位置信息 |
| `extra_headers` | 空 | 附加到每个请求的头 |

内置两个 provider：`mistral`（`https://api.mistral.ai/v1`、`MISTRAL_API_KEY`、`backend = mistral`、带浏览器登录基址）与 `llamacpp`（`http://127.0.0.1:8080/v1`、无凭据、generic 后端）。[@ref-mv-301-provider-defaults]

```toml
[[providers]]
name = "local-openai"
api_base = "http://127.0.0.1:11434/v1"
api_key_env_var = "MY_LOCAL_KEY"
api_style = "openai"
backend = "generic"

[[models]]
name = "local-model-id"
provider = "local-openai"
alias = "local"
```

兼容规则：名字为 `mistral` 但没有显式写 `backend` 的旧配置，仍按 mistral 后端处理（代码用 `model_fields_set` 判断"用户是否显式写过"），因此升级不会把旧的 mistral provider 误切到 generic。[@ref-mv-301-provider-config]

## 凭据与环境变量 {#providers-auth}

每个 provider 通过 `api_key_env_var` 声明自己的凭据环境变量名；该变量为空表示不建议凭据。解析顺序是唯一且共享的：本次会话显式提供的凭据 → 进程环境变量 → 操作系统钥匙串；环境变量只要非空就胜过钥匙串，解析结果同时带回"值来自哪里"（会话、环境或钥匙串）。[@ref-mv-301-provider-api-key]

- 会话凭据（例如嵌入方注入）不会写进进程环境，日志在上下文存续期间对其脱敏。
- 只有在环境里没有值时才读取钥匙串，读失败会给出"无法从系统钥匙串读取，请批准钥匙串提示或设置该环境变量"的错误。
- `mistral` 另支持浏览器登录：provider 上的 `browser_auth_base_url` 与 `browser_auth_api_base_url` 决定登录与轮询地址；`browser_auth_allow_origin_rewrite` 用于console 位于服务器不认识的虚拟主机时改写返回 URL。[@ref-mv-301-provider-config]

写配置时凭据只写环境变量名，不写值；示例里的 token 一律用占位。

## 协议：backend、api_style 与请求形态 {#providers-protocol}

后端由 `backend` 字段分派：`mistral` 走 Mistral SDK 实现，`generic` 走 OpenAI 兼容实现；`create_backend` 按枚举取工厂，并把连接、写入、连接池超时只传给 mistral 实现。[@ref-mv-301-provider-factory]

generic 后端再按 `api_style` 选择线格式适配器，固定来源里注册的取值包括 `openai`、`reasoning`、`anthropic`、`openai-responses` 与 `vertex-anthropic`。适配器按请求构造，因为部分适配器在解析流式响应时会缓冲状态，共享实例会让并发会话互相看见对方的半成品状态。[@ref-mv-301-api-adapters]

配置字段如何进入请求（forwarding）：

- 模型条目的 `temperature`、`top_p`、`max_output_tokens`、`thinking` 是请求参数；源码注释明确 `top_p` 与 `max_output_tokens` 只被 Unified harness 运行时读取，旧 agent loop 不发送它们。[@ref-mv-301-model-config]
- provider 的 `extra_headers` 附加到每个请求，`reasoning_field_name` 决定从响应里取哪段作为推理文本，`emits_finish_reason` 决定"流结束却没有 finish reason"是否算不完整。[@ref-mv-301-provider-config]
- 纯界面/路由用途、不进入请求的字段包括价格三件套（只用于计费展示与统计）、`display_name`、`alias`。

错误与重试约定（responses）：[@ref-mv-301-provider-retries]

- 429、5xx 与网络/超时错误按**时间预算**重试，而不是固定次数：预算用尽才失败，默认 300 秒；重试前会通知观察者，并对 429 施加自适应节流。
- 单请求超时默认 720 秒（`api_timeout`），连接/写入/池超时分别默认 10/30/10 秒；流式响应的空闲超时默认关闭（`api_stream_idle_timeout = 0`），因为 Mistral 会在工具调用完整生成后一次性发送，较大的工具调用与卡死的流无法用固定上限区分。[@ref-mv-301-provider-factory]
- 后端必须满足的约定：返回 OpenAI 兼容或所声明 `api_style` 的响应形状、在 `reasoning_field_name` 指定的字段里放推理内容、流式响应以 finish reason 收尾（或把 `emits_finish_reason` 设为假）。

## 模型：ID、别名与默认选择 {#providers-models}

模型写在 `[[models]]` 数组里，内部以 `alias` 为键的映射承载并按别名深合并，因此不同层可以只改一个模型的若干字段。必需字段是 `name`（发送给推理 API 的真实模型名）、`provider`（引用上面某个 provider 名）与 `alias`（本地选择器里用的名字）。[@ref-mv-301-model-config]

默认模型的选择是一条固定链：`active_model` 为空（未固定）时，先用实验路由的默认模型，其次用模型目录推荐的模型，再次用内置默认别名 `mistral-medium-3.5`，最后取可用集合里的第一个；`allowed_models` 一旦非空，可用集合就只剩匹配的条目（支持 glob 与 `re:` 前缀的正则）。[@ref-mv-301-model-resolution]

模型目录（`experimental_enable_model_catalog`）是运行时的一个只读配置层，位于内置默认值之上、GrowthBook 与其他所有用户层之下；它只提供 `name`、`provider`、`alias`、`display_name`、`supports_images`、`max_context_length`、`temperature`、`thinking_levels`、`thinking` 这些字段，用户配置仍可覆盖单个模型的设置。[@ref-mv-301-model-resolution]

## 能力元数据 {#providers-metadata}

模型条目同时承载能力元数据，它们在运行时的作用如下：[@ref-mv-301-model-config]

| 字段 | 影响 |
| :-- | :-- |
| `max_context_length` | 声明上下文窗口；请求的输出上限会被裁剪到输入剩余空间再减 4096 token 的预留，压缩阈值也按窗口比例推导 |
| `max_output_tokens` | 单请求输出上限；会话自己的 `max_tokens` 限制优先 |
| `supports_images` | 是否把图片直接发给模型；不支持时由 vision 模型转述 |
| `thinking` / `thinking_levels` | 推理强度与可选档位；档位列表决定选择器渲染与"存储值不在集合内"时的回落（有 `high` 用 `high`，否则用最后一项） |
| `temperature` / `top_p` | 采样参数 |
| `input_price` / `output_price` / `cached_input_price` | 每百万 token 价格；缓存输入价为空时按输入价计费 |
| `auto_compact_threshold` | 模型自己的压缩阈值；未设置时按窗口的 80% 推导 |

内置默认模型 `mistral-medium-3.5` 就带有完整的元数据样例：262144 窗口、`thinking_levels = ["off", "high"]`、默认 `high`、支持图片、价格 1.5/7.5/0.15。[@ref-mv-301-provider-defaults]

## 诊断：区分"配置可读""模型可选""请求已发出""后端可用" {#providers-diagnostics}

1. **配置可读**：provider 与模型都是普通配置字段，形状冲突或键名写错会在配置构建阶段报错并指出字段与层；`[[mcp_servers]]` 式的表写法错误另有专门提示。
2. **凭据来自哪里**：`/status` 展示当前生效的凭据来源以及被遮蔽的来源，其判定与解析共用同一条 `active_api_key` 规则，因此"看到的环境变量"与"实际使用的值"不会不一致。[@ref-mv-301-provider-api-key]
3. **模型可选**：模型集合受 `allowed_models` 过滤，管理员允许集合与本机模型完全不相交时构建直接报错，而不是让用户看到一个空列表。
4. **后端是否真的可用**：会话打开时会做一次模型可用性探测，结果按"端点 + 模型 + 凭据"缓存：可用结论保留 7 天，不可用结论保留 1 小时，无结论时 10 分钟后才重试，整次检查最多 2 秒。[@ref-mv-301-provider-probe]
5. **缺少凭据**：错误文本直接写明缺少哪个环境变量、属于哪个 provider；钥匙串读取失败时另给"批准钥匙串提示或设置环境变量"的指引。[@ref-mv-301-provider-missing-key]
