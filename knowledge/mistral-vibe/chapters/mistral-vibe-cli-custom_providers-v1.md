---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-custom_providers-v1
harness_id: mistral-vibe
topic: custom_providers
title: "Mistral Vibe CLI 的 provider 与模型预设：字段、协议适配与凭据"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-mv-providers-field, ref-mv-provider-config, ref-mv-default-providers, ref-mv-docs-config-providers, ref-mv-docs-providers-switch]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-mv-api-key-resolution, ref-mv-config-defaults, ref-mv-docs-apikeys-methods, ref-mv-readme-apikeys, ref-mv-provider-config, ref-mv-readme-custom-domains]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-mv-backend-enum, ref-mv-api-adapters, ref-mv-adapter-selection, ref-mv-docs-config-providers]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-mv-model-normalize, ref-mv-model-config, ref-mv-providers-field, ref-mv-docs-config-models, ref-mv-default-models]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-mv-model-config, ref-mv-provider-config]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-provider-config, ref-mv-config-defaults]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-mv-provider-config, ref-mv-providers-field, ref-mv-docs-config-providers]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-mv-api-key-resolution, ref-mv-docs-apikeys-methods, ref-mv-readme-custom-domains]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-mv-backend-enum, ref-mv-api-adapters, ref-mv-adapter-selection]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-mv-model-normalize, ref-mv-model-config, ref-mv-docs-config-models]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: partial
        source_refs: [ref-mv-model-config, ref-mv-provider-config]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-mv-provider-config, ref-mv-model-config]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-mv-provider-config, ref-mv-config-defaults]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-mv-provider-config]
---

固定来源是官方仓库提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab` 与 `docs.mistral.ai` 的 Vibe Code CLI 文档快照。Vibe 的"provider"是配置里的一个预设，不是一个可加载的插件：它只描述"请求发到哪里、用什么鉴权、走哪套协议"，模型则由 `[[models]]` 单独声明并把 `provider` 指回预设名。

## 定义位置与第一方字段 {#providers-entry}

provider 写在 `config.toml` 的 `[[providers]]` 数组表里。schema 上它是"按 `name` 并集"的字段，默认值是内置的两个预设，所以用户层写同名 provider 是**叠加字段**而不是替换整条。[@ref-mv-providers-field]

`ProviderConfig` 的字段与默认值如下。[@ref-mv-provider-config]

| 字段 | 默认 | 作用 |
| :-- | :-- | :-- |
| `name` | 必填 | provider 标识，被 `[[models]]` 的 `provider` 引用，也是并集合并的键 |
| `api_base` | 必填 | 请求基址 |
| `api_key_env_var` | `""` | 承载 API key 的环境变量名；空表示无鉴权 |
| `browser_auth_base_url` / `browser_auth_api_base_url` | 无 | 浏览器登录用的控制台与鉴权 API 基址 |
| `browser_auth_allow_origin_rewrite` | `false` | 分域部署时允许把返回的登录 URL 改写回配置的域，而不是按来源不匹配拒绝 |
| `api_style` | `"openai"` | 选择线上协议适配器 |
| `backend` | `generic` | 选择 Mistral SDK 路径还是通用 HTTP 路径 |
| `reasoning_field_name` | `"reasoning_content"` | 承载推理文本的 JSON 字段名 |
| `emits_finish_reason` | `true` | 该后端是否可靠地在流末尾给出结束原因 |
| `project_id` / `region` | `""` | Vertex 类后端使用 |
| `extra_headers` | `{}` | 每次请求都附加的 HTTP 头 |

内置的两个预设是 `mistral`（`https://api.mistral.ai/v1`，键 `MISTRAL_API_KEY`，backend 为 `mistral`）与 `llamacpp`（`http://127.0.0.1:8080/v1`，无键）。[@ref-mv-default-providers] 官方参考页把用户可写的字段列成一张表，含 `name`、`api_base`、`api_key_env_var`、`api_style`、`backend`、`region` 与 `[providers.extra_headers]` 子表，并注明"密钥必须用 `api_key_env_var` 这种形式"。[@ref-mv-docs-config-providers]

一份最小自定义 provider + 模型（官方文档"Switch between accounts or providers"的示例，走 OpenAI 兼容端点）：[@ref-mv-docs-providers-switch]

```toml
[[providers]]
name = "openrouter"
api_base = "https://openrouter.ai/api/v1"
api_key_env_var = "OPENROUTER_API_KEY"
api_style = "openai"
backend = "generic"

[[models]]
name = "mistralai/devstral-2512:free"
provider = "openrouter"
alias = "devstral-openrouter"
temperature = 0.2
input_price = 0.0
output_price = 0.0

active_model = "devstral-openrouter"
```

## 凭据与 base URL {#providers-auth}

凭据解析只有一个入口，优先级固定：先读 `api_key_env_var` 指定的进程环境变量，读不到再读操作系统钥匙串；结果会带上"来自环境变量还是钥匙串"的来源标记，用于错误文案。[@ref-mv-api-key-resolution] 需要写进配置的只有变量名，密钥本身放在环境里；此外 `$VIBE_HOME/.env` 会在启动时被读入进程环境，且显式非空的环境变量优先。[@ref-mv-config-defaults]

官方文档给用户的三条路径与此一致：交互式 `vibe --setup`（把 key 存到 `~/.vibe/.env`）、环境变量 `MISTRAL_API_KEY`、以及手写 `~/.vibe/.env`；并明确"环境变量优先于 `.env`"。[@ref-mv-docs-apikeys-methods] README 另外说明第一次运行会提示输入密钥并保存到 `~/.vibe/.env`，同时强调 `.env` 只放凭据、通用配置放 `config.toml`。[@ref-mv-readme-apikeys]

浏览器登录是 Mistral 系 provider 专属的向导能力：当 backend 是 `mistral`（或旧式未写 backend 的 `mistral`）并且两个浏览器鉴权 URL 都非空时才可用。[@ref-mv-provider-config] 自定义域名（Mistral 兼容部署）通过 `vibe --setup` 的 "Launch browser → Other" 填入登录域，裸域名会被补上 `https://`，鉴权 API 基址按"域 + /api"推导，覆盖后的 `mistral` provider 会被写进用户配置以便后续复用（README 的 Custom Domains 小节）。[@ref-mv-readme-custom-domains]

凭据绝不应写进示例：`api_key_env_var` 只写变量名，测试用的密钥用占位值或由环境提供。

## 协议：两种后端 × 五种线上风格 {#providers-protocol}

`backend` 只有两个取值：`mistral`（走官方 Mistral SDK）与 `generic`（通用 HTTP 实现）。[@ref-mv-backend-enum] 在 `generic` 下，`api_style` 决定具体协议，注册表里恰好五种。[@ref-mv-api-adapters]

| `api_style` | 端点形态 |
| :-- | :-- |
| `openai`（默认） | OpenAI 兼容的 chat completions |
| `reasoning` | 带推理块的 chat completions 变体 |
| `anthropic` | Anthropic messages 形态 |
| `openai-responses` | OpenAI Responses 形态 |
| `vertex-anthropic` | Vertex 上的 Anthropic 模型端点 |

适配器每次请求即时构造（部分适配器在流式解析中保留状态，共享实例会让并发会话互相看见半成品），未知的 `api_style` 会直接落空并报错。[@ref-mv-adapter-selection]

需要分清职责的是：`backend = "mistral"` 时 `api_style` 被忽略，后端选择先于风格选择生效；鉴权头的形态由风格决定（例如 Anthropic 风格用 `x-api-key` 而不是 `Authorization: Bearer`）。这两个都属于实现细节，官方文档只暴露 `backend` 与 `api_style` 两个键。[@ref-mv-docs-config-providers]

## 模型声明、别名与可选项 {#providers-models}

模型有两种等价写法：`[[models]]` 数组表，或以别名为键的映射；内部统一归一化成"别名 → `ModelConfig`"的映射，因此可以按模型做稀疏覆盖。[@ref-mv-model-normalize] `ModelConfig` 的字段是 `name`（发往 API 的模型 ID）、`provider`（引用 provider 名）、`alias`（本地可选名，缺省时自动取 `name`），以及 `display_name`、`temperature`、价格三元组、`thinking`、`supports_images`、`auto_compact_threshold`。[@ref-mv-model-config]

`active_model` 写的是 **alias**，不是 `name`；`models` 字段在 schema 上被要求非空，也就是至少要留下一个模型。[@ref-mv-providers-field] 官方参考把两列的区别写得很清楚：`name` 是"发给推理 API 的模型 ID"，`alias` 是本地选择器，`display_name` 只影响选择器显示；另有 `allowed_models`，它按**模型名**（不是别名）做精确/通配/`re:` 正则的白名单过滤。[@ref-mv-docs-config-models]

内置模型里 `mistral-vibe-cli-latest` 的别名是 `mistral-medium-3.5`，另有一个本地 `devstral`（别名 `local`）；`llamacpp` 预设正好对应它。[@ref-mv-default-models]

官方文档还给出了一份"Mistral API 上可用的模型 ID"清单（如 `mistral-medium-latest`、`codestral-latest`、`ministral-8b-latest`），并说明把 `-latest` 换成日期后缀即可钉到具体版本。[@ref-mv-docs-config-models]

## 模型元数据与请求映射 {#providers-metadata}

模型侧的元数据就是 `ModelConfig` 那些字段，其中真正影响行为的只有少数几个：

- `temperature` → 请求体里的采样温度。
- `thinking` → 推理强度，取值 `off`/`low`/`medium`/`high`/`max`，会映射成各家后端的推理参数。[@ref-mv-model-config]
- `supports_images` → 是否允许 `@` 引用图片；为假时由 vision 模型兜底（`vision_model` 可跨 provider 指定）。
- `auto_compact_threshold` → 自动压缩的触发阈值，也是界面上"上下文窗口"的数字来源。
- 价格三元组 → 只用于成本显示与程序化模式的预算上限，不进请求。

固定来源里**没有**"上下文窗口长度"这个独立字段（`auto_compact_threshold` 是它的代理），也**没有**"最大输出 token"的每模型字段；输出上限是会话/运行时值，适配器只在未指定时才套用默认值。这是本主题的显式缺口。

真正会写到线上的 provider 字段：`api_base`（拼 URL）、`api_style`（选适配器）、`api_key_env_var`（拼鉴权头）、`extra_headers`（合并进请求头）、`reasoning_field_name`（消息变换）、`project_id`/`region`（Vertex 端点）、`name`（Mistral 专有的流选项）。[@ref-mv-provider-config] 与之相对，`alias`、`display_name`、`supports_images`、`auto_compact_threshold`、价格、`browser_auth_*`、`emits_finish_reason`、`allowed_models` 都只影响界面、选择或路由，不改变请求体。[@ref-mv-model-config]

## 响应、重试与诊断 {#providers-diagnostics}

请求以流式发出；流结束时宿主要求看到结束原因与用量，否则按"不完整流"重试。`emits_finish_reason` 就是给"某些 OpenAI 兼容端点不发送结束原因"这类情况留的开关：置为假后不再因为缺少结束原因而重试。[@ref-mv-provider-config] 重试是**按时间预算**而不是按次数：默认单次请求超时 720 秒、重试总预算 300 秒，另有连接 10 秒、写 30 秒、连接池 10 秒等常量。[@ref-mv-config-defaults]

失败会变成带类型的后端错误，错误文案区分"API key 无效（并注明来自环境变量还是钥匙串）""限流""模型名不存在""上下文超长"等，因此可以据此区分四类问题：

1. **配置能读**：schema 校验失败在启动阶段就报错并列出字段；读文件失败给"无法读/写 Vibe 配置文件"。
2. **模型可选**：`active_model` 不在 `models` 里会报"未在配置中找到该 active model"；`allowed_models` 非空时过滤掉的名字不会被选中。
3. **凭据存在**：`api_key_env_var` 指向的变量与钥匙串都取不到时抛 `MissingAPIKeyError`，此时还没有发出任何请求。
4. **请求已发出/后端可用**：只有这一类错误带 HTTP 状态或明确的网络错误标记。

固定来源里没有专门的 `doctor` 类自检命令。本主题检查过的入口是：启动阶段的 schema 校验错误与缺少密钥错误、`/config` 的逐字段来源列（见配置机制章节）、会话内 `/model` 与 `/config` 的模型切换、以及会话日志；缺少的是"一键列出当前 provider/模型/凭据来源与连通性"的官方入口。
