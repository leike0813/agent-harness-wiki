---
schema_version: 3
record_kind: production
edition_id: grok-cli-custom_providers-v1
harness_id: grok
topic: custom_providers
title: "Grok Build CLI 的自定义 Provider：入口、凭据、协议、模型与诊断"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-grok-providers-config-entry, ref-grok-providers-ref-model, ref-grok-providers-ref-model-providers, ref-grok-providers-ref-models, ref-grok-providers-ref-endpoints, ref-grok-providers-ref-auth-provider, ref-grok-providers-config-scope, ref-grok-providers-project-scope, ref-grok-providers-precedence, ref-grok-providers-overlay, ref-grok-providers-code-overlay, ref-grok-providers-code-patch-strip, ref-grok-providers-enterprise, ref-grok-providers-request-size]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-grok-providers-credential-resolution, ref-grok-providers-auth-precedence, ref-grok-providers-auth-apikey, ref-grok-providers-auth-provider, ref-grok-providers-auth-provider-config, ref-grok-providers-ref-auth-provider, ref-grok-providers-endpoint-env, ref-grok-providers-endpoint-alternative, ref-grok-providers-endpoint-auth, ref-grok-providers-code-env-defaults, ref-grok-providers-env-headers, ref-grok-providers-config-entry]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-grok-providers-backends, ref-grok-providers-endpoint-env, ref-grok-providers-endpoint-alternative, ref-grok-providers-code-models-url, ref-grok-providers-code-inference-url, ref-grok-providers-code-resolve-inference, ref-grok-providers-code-resolve-list, ref-grok-providers-ref-endpoints]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-grok-docs-overview-custom-models, ref-grok-providers-default-models, ref-grok-providers-selecting, ref-grok-providers-ref-models, ref-grok-providers-ref-model, ref-grok-providers-fleet-allowlist, ref-grok-providers-overriding, ref-grok-providers-priority, ref-grok-providers-slash-model, ref-grok-providers-context-window, ref-grok-providers-request-size, ref-grok-providers-global-defaults, ref-grok-providers-notice, ref-grok-providers-web-search-model, ref-grok-providers-custom-config]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-grok-providers-global-headers, ref-grok-providers-global-defaults, ref-grok-providers-query-params, ref-grok-providers-env-headers, ref-grok-providers-request-size, ref-grok-providers-ref-model, ref-grok-providers-backends, ref-grok-providers-auth-refresh, ref-grok-providers-web-search-model, ref-grok-providers-notice]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-grok-providers-check-effective, ref-grok-providers-refused, ref-grok-providers-troubleshooting, ref-grok-providers-debug-logging, ref-grok-providers-default-models, ref-grok-providers-selecting, ref-grok-providers-slash-model, ref-grok-providers-slash-effort, ref-grok-providers-slash-context-window, ref-grok-docs-overview-custom-models, ref-grok-providers-fleet-allowlist]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs: [ref-grok-providers-config-entry, ref-grok-providers-ref-model, ref-grok-providers-ref-model-providers, ref-grok-providers-ref-models, ref-grok-providers-ref-endpoints, ref-grok-providers-config-scope]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-grok-providers-credential-resolution, ref-grok-providers-auth-precedence, ref-grok-providers-auth-apikey, ref-grok-providers-auth-provider-config, ref-grok-providers-endpoint-auth, ref-grok-providers-endpoint-env]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: partial
        source_refs: [ref-grok-providers-backends, ref-grok-providers-endpoint-env, ref-grok-providers-code-inference-url]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-grok-providers-default-models, ref-grok-providers-selecting, ref-grok-providers-ref-models, ref-grok-providers-fleet-allowlist]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-grok-providers-context-window, ref-grok-providers-request-size, ref-grok-providers-global-defaults, ref-grok-providers-ref-model]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-grok-providers-global-headers, ref-grok-providers-query-params, ref-grok-providers-env-headers, ref-grok-providers-global-defaults, ref-grok-providers-notice, ref-grok-providers-request-size]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-grok-providers-backends, ref-grok-providers-global-defaults, ref-grok-providers-request-size, ref-grok-providers-auth-refresh]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-grok-providers-troubleshooting, ref-grok-providers-debug-logging, ref-grok-providers-check-effective, ref-grok-providers-refused, ref-grok-providers-slash-model]
---


## 配置入口与作用域 {#providers-entry}

Grok Build（`grok` CLI）没有独立的“provider 配置文件”，也不提供插件式 provider 注册表；模型与提供方都写成 TOML 表，放在用户配置 `~/.grok/config.toml`（Windows 为 `%USERPROFILE%\.grok\config.toml`）里 [@ref-grok-providers-config-scope]。文件缺失时 Grok 用内置默认值，因此只需写要覆盖的键 [@ref-grok-providers-config-scope]。

与提供方相关的第一方表如下；一个模型选择“用哪个提供方”靠 `model_provider` 指向命名 provider，而 provider 自身只是一张共享字段块：

| 表 | 类型 | 作用 | 主要子键 |
| :-- | :-- | :-- | :-- |
| `[model.{id}]` | `table` | 每个模型的 BYOK 定义或对内置模型的字段覆盖 | `model`、`base_url`、`api_key`、`env_key`、`api_backend`、`context_window`、`model_provider`、`extra_headers`、`query_params`、`env_http_headers`、`max_request_bytes` 等 [@ref-grok-providers-ref-model] |
| `[model_providers.{name}]` | `table` | 命名自定义 provider 定义，被若干 `[model.{id}]` 用 `model_provider` 引用 | `base_url`、`api_backend`、`max_request_bytes`、`extra_headers`、`query_params`、`env_http_headers` [@ref-grok-providers-ref-model-providers][@ref-grok-providers-request-size] |
| `[models]` | `table` | 全局模型设置：默认模型、选择器白名单、全局请求头与全局采样默认值 | `default`、`allowed_models`、`extra_headers`、`temperature`、`max_retries` 等 [@ref-grok-providers-ref-models] |
| `[endpoints]` | `table` | 自定义推理 host 与模型目录 URL | `models_base_url`、`models_list_url`（别名 `models_endpoint`）[@ref-grok-providers-ref-endpoints] |
| `[auth_provider.{name}]` | `table` | 命名凭据助手，被 `[model.{id}] auth_provider` 引用 | `command`、`token_ttl_secs` [@ref-grok-providers-ref-auth-provider] |

最小定义（语法取自该页示例，字段含义见下节表）：

```toml
[model.my-model]
model = "model-id"                        # 发送给 API 的模型标识
base_url = "https://api.example.com/v1"   # OpenAI 兼容端点
name = "Display Name"                     # 选择器里显示的名字
env_key = "XAI_API_KEY"                   # 存放 API key 的环境变量名（字符串或数组）
```

[@ref-grok-providers-config-entry]

**作用域**：项目级 `.grok/config.toml` 只贡献 `[mcp_servers]`、`[plugins]` 与 `[permission]` 三类规则；除此之外的段（包括 `[model.*]`、`[model_providers.*]`、`[models]`、`[endpoints]`、`[auth_provider.*]`）只从 `~/.grok/config.toml` 加载 [@ref-grok-providers-project-scope]。因此 provider 定义实际只有用户级一层（外加下方被托管的 fleet 层），没有“项目里放一份 provider 就能生效”的机制。

**层级与覆盖**：CLI 参数 > 环境变量 > `requirements.toml`/MDM > `GROK_CONFIG`/`GROK_CONFIG_PATH` 叠加层 > `config.toml` > `managed_config.toml` > 内置默认 [@ref-grok-providers-precedence]。`GROK_CONFIG`/`GROK_CONFIG_PATH` 是深合并的配置叠加层，被限制在一份 fail-closed 白名单内；白名单含 `models`（全局块，不含每条 `[model.{id}]`），而 `[model_providers.*]` 与 `[auth_provider.*]` 被显式剔除，所以无法经叠加层注入 provider 命令表 [@ref-grok-providers-overlay][@ref-grok-providers-code-overlay][@ref-grok-providers-code-patch-strip]。

企业部署示例把 `[models] default`、`[model.company-grok]`、`[auth] auth_provider_command` 写在同一个 `config.toml` 中 [@ref-grok-providers-enterprise]。

**缺口（partial）**：登记来源列出的是各表可用的第一方键，但 `[model_providers.{name}]` 在配置参考中只登记了表本身，其完整子键集合只从 11-custom-models 的继承说明间接得到，没有独立的 provider 级字段表；`auth_provider` 表也只列到表级。已检查入口：26-config-reference 的 `model`/`model_providers`/`models`/`endpoints`/`auth_provider` 表、11-custom-models 全文。

## 凭据来源与 base URL {#providers-auth}

凭据解析分两条路径，都按固定优先级。

**单模型凭据顺序**（`[model.{id}]`）：`api_key` 字段 → `env_key` 指定的环境变量（单个字符串或数组，取第一个“已设置且非空”的值）→ 已登录会话 token（来自 `grok login`）→ 全局兜底环境变量 `XAI_API_KEY`（并兼容 `GROK_CODE_XAI_API_KEY`）[@ref-grok-providers-credential-resolution]。认证总览页给出同样的层级：每条模型的 `api_key`/`env_key` > 活动会话 token > `XAI_API_KEY`；若已交互登录，存储的会话 token 优先，要回落到 API key 需 `grok logout` 或删除 `~/.grok/auth.json` [@ref-grok-providers-auth-precedence][@ref-grok-providers-auth-apikey]。

**外部凭据助手**：`[auth_provider.{name}]` 用 `command` 打印 token 到 stdout，`token_ttl_secs` 声明裸 token 的有效期 [@ref-grok-providers-ref-auth-provider]；配置也可写成 `[auth] auth_provider_command` / `auth_provider_label` / `auth_token_ttl` 或对应环境变量 [@ref-grok-providers-auth-provider-config]。助手通过 `sh -c` 执行，stdout 只放 token，stderr 给人看 [@ref-grok-providers-auth-provider]。声明了 `auth_provider_command` 且未设 `XAI_API_KEY` 时，模型列表请求会改用 provider 的 token [@ref-grok-providers-endpoint-auth]。

**base URL 与凭据来源**：
- 每条模型用 `[model.{id}] base_url` 指向 OpenAI 兼容端点 [@ref-grok-providers-config-entry]。
- 全局改用自定义推理 host 用 `[endpoints] models_base_url`，对应环境变量 `GROK_MODELS_BASE_URL`；模型列表 URL 默认 `{base_url}/models`，可用 `GROK_MODELS_LIST_URL` 覆盖 [@ref-grok-providers-endpoint-env]。`[endpoints]` 与局部模型覆盖同用时，`[model.*]` 从 endpoints 继承 `base_url`，不必逐条重写 [@ref-grok-providers-endpoint-alternative]。
- 代码侧 `EndpointsConfig` 从 `GROK_MODELS_BASE_URL`、`GROK_MODELS_LIST_URL` 读入 `models_base_url`/`models_list_url`，并保留 `xai_api_base_url` 的默认值 `https://api.x.ai/v1` [@ref-grok-providers-code-env-defaults]。

**凭据不要写进示例/共享仓库**：把密钥放在 `env_key` 指向的环境变量，或 `env_http_headers` 映射的变量里，值只在建客户端时读取、请求头里出现、从不落盘；对应的变量未设置或为空时该头被跳过 [@ref-grok-providers-env-headers]。

**缺口（partial）**：来源未说明 `env_key` 数组在“第一个非空”之外是否做进一步回退、也未说明 provider 级（`[model_providers.{name}]`）是否可自带凭据字段——继承说明里只点了 `base_url`/`api_backend`/`max_request_bytes`/`extra_headers`/`query_params`/`env_http_headers`，没有 `api_key`/`env_key`。已检查入口：11-custom-models 的 Credential Resolution、Auth Behavior、Environment-Variable Headers，02-authentication 的 Auth Precedence/API Key，26 的 `auth`、`auth_provider` 表。

## 协议与端点形态 {#providers-protocol}

Grok 只通过三种 HTTP wire protocol 访问模型，用 `[model.{id}] api_backend` 选择；省略时默认 `chat_completions`：

| `api_backend` | 对应 API | 路径 | 默认 |
| :-- | :-- | :-- | :-- |
| `"chat_completions"` | OpenAI Chat Completions | `/v1/chat/completions` | 是 |
| `"responses"` | OpenAI Responses | `/v1/responses` | |
| `"messages"` | Anthropic Messages | `/v1/messages` | |

[@ref-grok-providers-backends]

`base_url` 就是端点根（示例一律带 `/v1`）。provider 专有的鉴权/版本头通过 `extra_headers` 原样随每个请求发出（例如 Anthropic 用 `x-api-key` 而非 `Authorization: Bearer`）[@ref-grok-providers-backends]。

自定义模型目录走 `[endpoints]` 或其环境变量：`GROK_MODELS_BASE_URL` 是推理 base URL，Grok 从 `{base_url}/models` 取模型列表，`GROK_MODELS_LIST_URL` 可覆盖该列表 URL [@ref-grok-providers-endpoint-env][@ref-grok-providers-endpoint-alternative]。

代码侧印证端点选择：`has_custom_endpoint()` 在 `models_base_url` 或 `models_list_url` 任一被设置时为真，并从有效配置（含 managed/requirements 覆盖）构建 [@ref-grok-providers-code-inference-url]；`resolve_inference_base_url()` 优先 `models_base_url`，否则回落到 proxy URL [@ref-grok-providers-code-resolve-inference]；`resolve_models_list_url()` 在无覆盖时拼成 `{base}/models` [@ref-grok-providers-code-resolve-list]；`models_base_url` 与 `models_list_url` 是 `[endpoints]` 的字段，后者别名 `models_endpoint` [@ref-grok-providers-code-models-url][@ref-grok-providers-ref-endpoints]。`[endpoints]` 同时承载其它辅助服务（feedback、trace、managed config、telemetry），这些仍解析到 cli-chat-proxy，只有 API-key 推理走 `xai_api_base_url` [@ref-grok-providers-ref-endpoints]。

**缺口（partial）**：固定来源**没有**描述任何“插件式/原生模型协议层”——没有插件能注册新的 wire protocol，扩展（MCP）提供的是工具而非模型协议。已检查入口：11-custom-models 全文、26-config-reference 的 `endpoints`/`model_providers` 表、09-plugins 概览；这些来源里模型侧协议只出现上面三种 HTTP backend。

## 模型 ID、别名、目录与能力元数据 {#providers-models}

**ID 与入口**：`[model.{id}]` 的段名是目录键，`model` 字段才是发给 API 的模型标识；覆盖内置模型时用内置模型名做段键，只写要改的字段，其余从默认配置（含正确 `base_url`）继承 [@ref-grok-providers-ref-model][@ref-grok-providers-overriding]。选择器显示的别名来自 `name`，描述来自 `description` [@ref-grok-providers-ref-model]。

**选择方式**：CLI 用 `grok -p "Hello" -m my-model`；TUI 内用 `/model`；`Ctrl+M` 打开模型选择器（列表含内置与自定义）[@ref-grok-providers-selecting]。默认模型由 `[models] default` 设定，也可用 `GROK_DEFAULT_MODEL`/`--model`/`-m` 覆盖；内置默认会话模型是 `grok-4.5` [@ref-grok-providers-ref-models][@ref-grok-providers-default-models]。`/model` 接受模型 ID 或显示名（大小写不敏感），并可在其后追加 context window 与 reasoning effort；别名 `/m` [@ref-grok-providers-slash-model]。

**目录与刷新**：`grok models` 列出全部可用模型（含自定义）[@ref-grok-providers-default-models]。目录优先级从高到低为：用户 `[model.*]` → 从远端 `/v1/models` 预取的模型 → 硬编码默认 [@ref-grok-providers-priority]。选择面还受 `[models] allowed_models`（对目录键或模型 ID 的 glob 白名单）、`hidden_models`、`disabled_models` 控制 [@ref-grok-providers-ref-models]。企业可用签名 `requirements.toml` 把 `allowed_models` 钉成“替换而非并集”，且只匹配模型 ID、不能用本地 `[model.{name}]` 拓宽 [@ref-grok-providers-fleet-allowlist]。

文档站用同构示例给出最小闭环：`[model.my-model]` + `[models] default`，随后 `grok inspect`、`grok -p "Hello" -m my-model`、`/model {name}` [@ref-grok-docs-overview-custom-models]。

**能力元数据**（键名逐一取自配置参考与 11-custom-models）：

| 键 | 含义 | 默认/生效条件 |
| :-- | :-- | :-- |
| `context_window` | 总上下文（token），驱动 auto-compact 时机 | 覆盖已知模型时继承其窗口；定义新模型且省略时默认 200,000 [@ref-grok-providers-context-window][@ref-grok-providers-ref-model] |
| `max_completion_tokens` | 每次响应最大 token | 模型省略时取 `[models]` 全局默认 [@ref-grok-providers-ref-model][@ref-grok-providers-global-defaults] |
| `max_request_bytes` | 端点请求体上限，超限时驱逐较早内联图片 | 省略时先继承所属 `[model_providers.{id}]`，再取 backend 默认：`messages` 30 MB，其余 50 MiB [@ref-grok-providers-request-size][@ref-grok-providers-ref-model] |
| `reasoning_efforts` / `reasoning_effort` | 允许的推理强度取值（后者已弃用） | 省略时菜单来自端点 `/v1/models` 行的 `reasoning_efforts` 或 `capabilities.reasoning_effort` [@ref-grok-providers-ref-model] |
| `reasoning_summary` | Responses API 的 `reasoning.summary` | `none`/`auto`/`concise`/`detailed`，默认 `concise`；`none` 用于拒绝该字段的端点 [@ref-grok-providers-ref-model] |
| `supports_backend_search` | 端点是否支持 Grok 托管的服务端搜索 | 与 `api_backend` 无关；置 true 才启用服务端搜索 [@ref-grok-providers-web-search-model] |
| `model_family` | 用于 compaction 与能力分组的家族 id | 配置参考给出用途，未给默认 [@ref-grok-providers-ref-model] |
| `hidden` / `supported_in_api` / `use_concise` / `show_model_fingerprint` / `notice` | 选择器可见性、是否作为公开 API 模型、精简工具描述包、显示指纹、提示横幅 | `hidden` 仍可用 `-m` 选择；`notice` 见下节 [@ref-grok-providers-ref-model][@ref-grok-providers-notice] |

全局默认：一小批环境级旋钮（`temperature`、`top_p`、`max_completion_tokens`、`max_retries`、`rate_limit_retry_threshold`、`inference_idle_timeout_secs`、`subagent_rate_limit_max_attempts`、`stream_tool_calls`）可写在 `[models]` 下作为每个模型的默认；每条模型的同名键总是优先。标识具体模型的字段（`model`、`base_url`、`api_key`、`context_window` 等）不能用这种方式设默认 [@ref-grok-providers-global-defaults]。视觉相关键只有 `[models] image_description`（转录用户图片所用的视觉模型），没有逐模型的能力布尔开关 [@ref-grok-providers-ref-models]。

`web_search` 工具用另一条配置：`[models] web_search` 或 `GROK_WEB_SEARCH_MODEL`；指向自定义模型时还需一条 `[model.*]` 让 Grok 能触达它 [@ref-grok-providers-web-search-model]。05-configuration 也给出 `[model.my-model]` 的字段示例（`model`、`base_url`、`name`、`description`、`api_key`、`env_key`、`temperature`、`top_p`、`max_completion_tokens`、`context_window`、`query_params`、`env_http_headers`）[@ref-grok-providers-custom-config]。

**缺口（partial）**：能力元数据只覆盖上下文窗口、输出上限、推理强度/摘要、后端搜索与若干 UI/分组标志；固定来源**没有**逐模型的工具能力、视觉能力、多模态输入等显式开关（视觉只间接通过 `image_description` 体现）。已检查入口：26 的 `model`/`models` 表、11-custom-models 的 Context Window / Request Size Limit / Global Default Values / Model Notice / Provider Examples。

## 参数映射、请求形态与失败处理 {#providers-forwarding}

配置里可写的字段分成“进入请求”和“只影响界面/路由”两类。

**进入请求**：
- `extra_headers`（每条模型与全局 `[models]`）：全局表作为基底，每条模型的同名键按键名、大小写不敏感地覆盖，全局独有的键仍被继承；它们只随该模型的推理请求发出，不用于图像/视频生成等独立服务 [@ref-grok-providers-global-headers]。
- `query_params`：附加到每个请求 URL 的百分号编码查询参数；与 `base_url` 查询串冲突时后者被覆盖（last value wins），且参数会存进会话，所以不要放密钥 [@ref-grok-providers-query-params]。
- `env_http_headers`：把某个请求头映射到环境变量名，值在建客户端时读取、只进请求头、不落盘；变量未设置或为空则跳过该头，解析出的值覆盖同名 `extra_headers` [@ref-grok-providers-env-headers]。
- `temperature`、`top_p`、`max_completion_tokens`、`max_retries` 等：每条模型值优先，`[models]` 全局值只在模型未设时填充 [@ref-grok-providers-global-defaults]。
- `max_request_bytes`：端点级上限，超限时驱逐较早的内联图片以让请求成功；模型级值覆盖 provider 级值 [@ref-grok-providers-request-size]。
- `stream_tool_calls`：影响**请求形态**而非仅采样；某些 BYOK 端点要求不设置它，此时用 `[model.{id}] stream_tool_calls = false` 单独退出 [@ref-grok-providers-global-defaults]。
- `reasoning_summary`：改变 Responses API 请求里的 `reasoning.summary` 字段（`none` 即省略）[@ref-grok-providers-ref-model]。
- `api_backend` 决定发送到哪个路径与协议 [@ref-grok-providers-backends]。

**只影响界面/路由**：`name`、`description`、`hidden` 是选择器展示与筛选；`notice` 在模型被选中期间于提示框上方显示横幅（`severity` 取 `info`/`warning`/`critical`，默认 `info`，`text` 必填，不可手动关闭，切换模型即消失；空 `text` 可清除内置/远端模型自带的 notice）[@ref-grok-providers-ref-model][@ref-grok-providers-notice]。`supports_backend_search` 则是路由性质：只有它为 true（且构建启用后端搜索）时服务端搜索才运行 [@ref-grok-providers-web-search-model]。

**失败与重试**：`max_retries` 控制推理重试，可用 `[models]` 全局默认 [@ref-grok-providers-global-defaults]。`rate_limit_retry_threshold` 设定限流请求的总尝试上限（受解析后的 `max_retries` 封顶），一旦配置就由 sampler 接管这些重试并关闭独立的子代理 429 等待循环；`subagent_rate_limit_max_attempts` 仅在未设 sampler 阈值时生效（默认 8、最大 32、`0` 禁用等待循环）[@ref-grok-providers-global-defaults]。服务端返回 401 时 Grok 刷新凭据并重试请求；带 `expires_in` 或 `auth_token_ttl` 的凭据会在到期前约 5 分钟被重新签发 [@ref-grok-providers-auth-refresh]。

**缺口（partial）**：固定来源没有给出流式响应在协议层的契约（分块格式、工具调用增量、错误体 schema），只说 `stream_tool_calls` 改变请求形态、某些端点要它不被设置；也没有逐 provider 的 tool-call 兼容矩阵或重试退避算法描述。已检查入口：11-custom-models 的 Supported API Backends / Request Query Parameters / Environment-Variable Headers / Global Default Values，02-authentication 的 Automatic Credential Refresh。

## 诊断 {#providers-diagnostics}

四个问题（配置是否被读到、模型是否可选、请求是否发出、后端是否真的可用）各有不同入口：

- **配置来源**：`grok inspect` 列出每个贡献了配置的文件（含 requirements 与 managed 层），策略没生效时一条命令就能看见 [@ref-grok-providers-check-effective]；被 pin 的键会以管理层取值生效，`grok inspect` 会列出贡献该 pin 的 requirements 文件 [@ref-grok-providers-refused]。文档站也建议改完 `~/.grok/config.toml` 后先 `grok inspect` 看当前目录发现了什么（配置来源、instructions、skills、plugins、hooks、MCP servers）[@ref-grok-docs-overview-custom-models]。
- **模型可选**：`grok models` 列出全部可用模型（含自定义）；查不到时先看 `[model.*]` 段名是否拼错 [@ref-grok-providers-default-models][@ref-grok-providers-troubleshooting]。选择用 `grok -p "Hello" -m my-model` 或 TUI 内 `/model` [@ref-grok-providers-selecting][@ref-grok-providers-slash-model]。`/effort {level}` 在当前模型上设推理强度（`low`/`medium`/`high`/`xhigh`，仅在模型支持时有效），`/context-window {size}` 在当前模型上设窗口（仅当模型支持多个尺寸时出现，选择持续整个会话）[@ref-grok-providers-slash-effort][@ref-grok-providers-slash-context-window]。企业 pin 下 `allowed_models` 会决定选择器与 `-m` 能提供哪些模型 [@ref-grok-providers-fleet-allowlist]。
- **请求是否发出 / 后端可用**：连接错误时先用 `curl -s https://api.example.com/v1/models -H "Authorization: Bearer $XAI_API_KEY"` 验证端点可达 [@ref-grok-providers-troubleshooting]。开调试日志：`RUST_LOG=debug GROK_LOG_FILE=/tmp/grok.log grok`，然后在日志里找含 `model` 或 `sampling` 的条目来追踪模型选择与 API 调用 [@ref-grok-providers-debug-logging]。

**缺口（partial）**：没有一条独立的命令能证明“请求已到达后端并成功”，只能靠调试日志条目与手写 `curl` 推断；来源也未描述对某条 `[model.*]` 解析失败时在 `/model` 或 `grok models` 里的标记方式。已检查入口：11-custom-models 的 Troubleshooting / Debug Logging，26-config-reference 的 Check what is in effect / What happens when a setting is refused，文档站 overview 的 Custom models 段。
