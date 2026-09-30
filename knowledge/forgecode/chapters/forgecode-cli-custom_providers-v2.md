---
schema_version: 3
record_kind: production
edition_id: forgecode-cli-custom_providers-v2
harness_id: forgecode
topic: custom_providers
title: "ForgeCode CLI 的自定义 Provider：入口字段、认证、协议、模型与重试"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-forgecode-providers-entry, ref-forgecode-providers-entry-doc]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-forgecode-providers-entry, ref-forgecode-providers-entry-doc, ref-forgecode-providers-fields-doc, ref-forgecode-providers-json-schema, ref-forgecode-providers-merge, ref-forgecode-providers-registry]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-proxy-doc, ref-forgecode-providers-adc-doc, ref-forgecode-providers-auth, ref-forgecode-providers-credentials, ref-forgecode-providers-entry, ref-forgecode-providers-env-fallback, ref-forgecode-providers-headers-doc, ref-forgecode-providers-login, ref-forgecode-providers-oauth, ref-forgecode-providers-readme, ref-forgecode-providers-types, ref-forgecode-providers-urlvars-doc]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-forgecode-providers-dto-transforms, ref-forgecode-providers-entry, ref-forgecode-providers-fields-doc, ref-forgecode-providers-types]
  - section_id: providers-models-metadata
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-defaults, ref-forgecode-providers-entry, ref-forgecode-providers-fields-doc, ref-forgecode-providers-model-cache, ref-forgecode-providers-models-doc, ref-forgecode-providers-session-doc, ref-forgecode-providers-session-model]
  - section_id: providers-forwarding-responses-diagnostics
    surface_ids: [cli]
    source_refs: [ref-forgecode-config-defaults, ref-forgecode-config-proxy-doc, ref-forgecode-list-commands, ref-forgecode-providers-cli, ref-forgecode-providers-dto-transforms, ref-forgecode-providers-entry, ref-forgecode-providers-model-cache, ref-forgecode-providers-retry, ref-forgecode-providers-session-model, ref-forgecode-providers-verify-doc]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: conflict
        source_refs: [ref-forgecode-providers-entry, ref-forgecode-providers-entry-doc, ref-forgecode-providers-json-schema]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-forgecode-providers-auth, ref-forgecode-providers-credentials, ref-forgecode-providers-oauth]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-forgecode-providers-types, ref-forgecode-providers-dto-transforms]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models-metadata
        status: answered
        source_refs: [ref-forgecode-providers-models-doc, ref-forgecode-providers-model-cache]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models-metadata
        status: answered
        source_refs: [ref-forgecode-providers-models-doc, ref-forgecode-providers-entry]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses-diagnostics
        status: answered
        source_refs: [ref-forgecode-config-defaults, ref-forgecode-providers-entry, ref-forgecode-providers-session-model]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses-diagnostics
        status: answered
        source_refs: [ref-forgecode-providers-retry, ref-forgecode-providers-dto-transforms]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses-diagnostics
        status: answered
        source_refs: [ref-forgecode-providers-verify-doc, ref-forgecode-providers-cli, ref-forgecode-providers-model-cache]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与界面 {#providers-scope}

本章依据 forgecode.dev 官方文档 `/docs/custom-providers/`（`[[providers]]` 写法、字段表、静态模型表、URL 模板变量、自定义头、Google ADC、验证方式）与 `/docs/forge-config/` 快照，以及官方仓库 `tailcallhq/forgecode` 固定 commit `571a28902b9c562594c02fd089fc58bf8595108f` 的检出：`crates/forge_config/src/config.rs`（`ProviderEntry` 与协议枚举）、`forge.schema.json`（发布的配置 schema）、`crates/forge_repo/src/provider/{provider_repo.rs,provider.json,chat.rs,retry.rs}`（内置 provider 注册表、合并、模型缓存与错误重试）、`crates/forge_repo/src/provider/openai.rs` 与 `crates/forge_app/src/dto/openai/transformers/mod.rs`（请求/响应变换）、`crates/forge_main/src/cli.rs`（`forge provider` 与 `forge list model`）。界面口径为 catalog 唯一登记的 `cli`。[@ref-forgecode-providers-entry][@ref-forgecode-providers-entry-doc]

## 配置入口与第一方字段 {#providers-entry}

Provider 有两条配置面，作用域不同 [@ref-forgecode-providers-entry][@ref-forgecode-providers-json-schema]：

| 入口 | 位置 | 格式与用途 |
| :-- | :-- | :-- |
| 内联条目 | 全局 `.forge.toml` 的 `[[providers]]` 数组 | 反序列化为 `ProviderEntry`，与内置 provider 表合并 |
| provider 覆盖文件 | `{base_path}/provider.json` | 内置注册表使用的 JSON 形态，支持 `auth_methods` 里的 OAuth 对象；该文件可被用户覆盖 |

内联条目的字段定义在 `ProviderEntry`，发布 schema 中同名可见 [@ref-forgecode-providers-entry]：

| 字段 | 必填 | 含义 |
| :-- | :-- | :-- |
| `id` | 是 | provider 标识，也用于模型路径与 `:provider` 选择 |
| `url` | 是 | chat completions 完整端点；可含 `{{VAR}}` 占位符 |
| `api_key_var` | 否 | 存放 API key 的环境变量名 |
| `models` | 否 | 模型来源：URL 模板字符串，或内联模型对象数组 |
| `response_type` | 否 | 线路协议：`OpenAI`、`OpenAIResponses`、`Anthropic`、`Bedrock`、`Google`、`OpenCode` |
| `url_param_vars` | 否 | 参与 `{{VAR}}` 替换的环境变量声明；条目为含 `name`/`options`/`optional` 的表 |
| `custom_headers` | 否 | 每次请求附加的 HTTP 头 |
| `provider_type` | 否 | `llm`（默认）或 `context_engine` |
| `auth_methods` | 否 | 默认 `["api_key"]`；Google ADC 用 `["google_adc"]` |

合并规则是“同 id 覆盖、异 id 追加”：与内置 provider 同名时按字段覆盖该内置条目，新 id 则追加进列表，并可像内置 provider 一样被 `:model`/`:provider` 选择 [@ref-forgecode-providers-entry][@ref-forgecode-providers-merge]。

**来源冲突（键名）**：官方文档的 `.forge.toml` 示例写作 `api_key_vars = "MY_PROVIDER_API_KEY"` 且 `url_param_vars = ["OPENAI_URL"]`（字符串数组），而固定 commit 的 `ProviderEntry` 与发布 schema 只接受 `api_key_var`（单数）与数组表形式的 `url_param_vars`；字符串数组成立于 `{base_path}/provider.json` 的内置注册表形态（其反序列化器对每个条目接受“纯字符串或带选项对象”两种写法）。文档示例直接搬进 `.forge.toml` 时未必能解析，读者应以 schema / `ProviderEntry` 为准，或改用 `provider.json`。[@ref-forgecode-providers-entry-doc][@ref-forgecode-providers-entry][@ref-forgecode-providers-json-schema]

内置 provider 清单随二进制发布：`crates/forge_repo/src/provider/provider.json` 收录 48 个条目（forge、deepseek、github_copilot、open_router、requesty 等），字段即上面 `provider.json` 形态 [@ref-forgecode-providers-registry]。文档给出的字段表（`id`、`url`、`api_key_vars`、`auth_methods`、`custom_headers`、`models`、`provider_type`、`response_type`、`url_param_vars`）与代码字段一一对应，差异仅在键名 [@ref-forgecode-providers-fields-doc]。

## 认证、凭据与 base URL {#providers-auth}

API key 由环境变量提供：`api_key_var` 只写变量名，运行时从进程环境取值；变量缺失时报 `env_var_not_found` 并给出 provider 与变量名 [@ref-forgecode-providers-entry][@ref-forgecode-providers-auth]。`url` 与 `models` 中的 `{{VAR}}` 由 `url_param_vars` 声明并做环境变量替换——需要动态 base URL 时（如自建网关）把主机部分写成占位符，没有动态段时按文档写空列表 [@ref-forgecode-providers-urlvars-doc][@ref-forgecode-providers-auth]。

凭据的持久化位置是 `{base_path}/.credentials.json`，由 `Environment::credentials_path()` 给出 [@ref-forgecode-providers-credentials]。推荐入口是交互登录：`forge provider login`/`logout`/`list`，README 记录首跑时会把环境变量里的凭据自动迁移到文件存储，并标注 `.env` 方式是 deprecated [@ref-forgecode-providers-login][@ref-forgecode-providers-readme]。

除 API key 外还有两类认证 [@ref-forgecode-providers-types][@ref-forgecode-providers-oauth]：

- Google ADC：`auth_methods = ["google_adc"]`，文档示范用于 Vertex 端点，并说明需要先 `gcloud auth login` [@ref-forgecode-providers-adc-doc]。
- OAuth 设备流：内置注册表条目可直接内嵌 OAuth 参数（`github_copilot` 条目含 `oauth_device` 的 `auth_url`/`token_url`/`client_id`/`scopes` 等），这也是 `ProviderEntry` 注释所指“需要 OAuth 的 provider 必须走文件覆盖”的原因 [@ref-forgecode-providers-oauth][@ref-forgecode-providers-entry]。

Ollama 一类本地服务存在同名环境变量的历史改名，实现保留了新名到旧名的回退表（如 `OLLAMA_HOST` ← `OLLAMA_URL`），并在迁移时为 `*_SSL_SCHEME` 提供默认值 [@ref-forgecode-providers-env-fallback]。自定义 CA 与代理走 `[http]` 段与标准代理变量，文档与 `.forge.toml` 参考一致 [@ref-forgecode-providers-headers-doc][@ref-forgecode-config-proxy-doc]。

## 协议与端点形态 {#providers-protocol}

`response_type` 决定用哪套线路协议处理请求与响应：`OpenAI`、`OpenAIResponses`、`Anthropic`、`Bedrock`、`Google`、`OpenCode`；`url` 必须是完整的 chat completions 端点（文档注明“may contain `{{VAR}}` placeholders”） [@ref-forgecode-providers-types][@ref-forgecode-providers-fields-doc]。`provider_type` 区分 LLM 与 `context_engine`（代码索引/语义搜索用的服务端点） [@ref-forgecode-providers-entry]。

兼容层由请求/响应的 pipeline 承担：OpenAI 家族在发出前会经过一串 transformer（`make_openai_compat`、`make_xai_compat`、`make_cerebras_compat`、`normalize_tool_schema`、`set_reasoning_effort`、`strip_thought_signature` 等），由 pipeline 按 provider/模型条件选择执行 [@ref-forgecode-providers-dto-transforms]。因此“配置里能写什么”与“实际发出什么”之间隔了一层显式变换，字段被忽略时应先查该 pipeline。

## 模型列表与能力元数据 {#providers-models-metadata}

`models` 支持两种形态：URL 模板（运行时拉取列表，可含 `{{VAR}}`）或内联模型对象数组；文档给出的内联字段为 `id`、`name`、`description`、`context_length`、`tools_supported`、`supports_parallel_tool_calls`、`supports_reasoning`、`input_modalities` [@ref-forgecode-providers-models-doc][@ref-forgecode-providers-entry]。这些元数据直接决定该模型在会话中的能力判断（工具调用、并行工具、推理、图像输入）。

拉取到的模型列表带缓存，TTL 取 `.forge.toml` 的 `model_cache_ttl_secs`（默认 604800 秒，即 7 天），缓存实现在 provider 聊天客户端构造处 [@ref-forgecode-providers-model-cache][@ref-forgecode-config-defaults]。默认模型与 provider 由 `[session]` 段的 `provider_id`/`model_id` 指定，`commit`、`suggest` 两段各自独立；三者在代码中统一为 `ModelConfig { provider_id, model_id }` [@ref-forgecode-providers-session-doc][@ref-forgecode-providers-session-model]。

文档示例（依据 `/docs/custom-providers/` 的 Static Model List 一节）[@ref-forgecode-providers-models-doc]：

```toml
[[providers]]
id             = "openai"
url_param_vars = []
response_type  = "OpenAI"
url            = "https://api.openai.com/v1/chat/completions"
auth_methods   = ["api_key"]

[[providers.models]]
id             = "o1"
name           = "O1"
context_length = 200000
tools_supported = true
supports_reasoning = true
input_modalities = ["text"]
```

注意上文键名冲突：同一页面在 `.forge.toml` 示例里使用 `api_key_vars`/字符串 `url_param_vars`，固定 commit 的 `ProviderEntry` 使用 `api_key_var`/表数组 [@ref-forgecode-providers-fields-doc][@ref-forgecode-providers-entry]。

## 参数转发、响应处理与诊断 {#providers-forwarding-responses-diagnostics}

转发面由三处构成：`.forge.toml` 全局采样参数（`temperature`、`top_k`、`top_p`、`max_tokens`、`reasoning` 等）注入所有 agent 的请求；agent frontmatter 可按 agent 覆盖；provider 级 `custom_headers` 与 `{{VAR}}` URL 替换影响每次出站请求 [@ref-forgecode-config-defaults][@ref-forgecode-providers-entry]。`[session]`/`commit`/`suggest` 只是“选哪组 provider+model”，不改写请求体本身 [@ref-forgecode-providers-session-model]。

响应侧的错误与重试有独立分类：`into_retry` 把 HTTP 状态码（与 `[retry].status_codes` 比对）、传输层错误码（`ECONNRESET`、`ETIMEDOUT` 等）、Anthropic 的 `overloaded_error` 与 OpenAI 的 `server_is_overloaded`/`server_error` 统一标记为可重试，重试次数与退避来自 `[retry]` 段（默认最多 8 次、初始 200 ms、倍率 2、最小间隔 1000 ms） [@ref-forgecode-providers-retry][@ref-forgecode-config-defaults]。流式响应以事件流形式进入请求/响应 pipeline（即前文列出的 transformer 链），Anthropic 的过载错误就是作为 SSE 事件负载被识别的 [@ref-forgecode-providers-retry][@ref-forgecode-providers-dto-transforms]。

诊断按“配置可读 → 模型可选 → 请求已发送 → 后端可用”分层 [@ref-forgecode-providers-verify-doc][@ref-forgecode-providers-cli][@ref-forgecode-providers-model-cache]：

- 配置可读：`:config-edit` 打开当前配置文件；`forge info` 打印配置、活动模型与环境状态；语法或键名错误会在启动读取阶段报错。
- 模型可选：`forge list model` 列出当前 provider 可见模型（受列表缓存影响，刷新需等 TTL 或重启）[@ref-forgecode-list-commands]。
- 请求已发出/后端可用：用 `:provider` 切换自定义 provider 后发起一次请求；文档说明连接失败会直接以连接错误呈现，据此检查 `url` 可达性与 `.credentials.json` 中的凭据 [@ref-forgecode-providers-verify-doc]。
- 上游网关排障：`[http]` 段的 `root_cert_paths` 与标准代理变量可解释 TLS/代理类失败 [@ref-forgecode-config-proxy-doc]。
