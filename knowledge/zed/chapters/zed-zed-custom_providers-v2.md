---
schema_version: 3
record_kind: production
edition_id: zed-zed-custom_providers-v2
harness_id: zed
topic: custom_providers
title: "Zed 的自定义 Provider：language_models 兼容端点、凭据、协议与能力元数据"
sections:
  - section_id: providers-entry
    surface_ids: [zed]
    source_refs: [ref-zed-providers-settings-map, ref-zed-providers-openai-compatible, ref-zed-providers-anthropic-compatible, ref-zed-providers-doc-openai-compatible, ref-zed-providers-doc-anthropic-compatible, ref-zed-providers-doc-keys, ref-zed-providers-copilot-settings-default, ref-zed-providers-copilot-settings-type, ref-zed-providers-copilot-lm-block]
  - section_id: providers-auth
    surface_ids: [zed]
    source_refs: [ref-zed-providers-api-key, ref-zed-providers-doc-keys, ref-zed-providers-openai-compatible, ref-zed-providers-anthropic-compatible, ref-zed-providers-doc-headers]
  - section_id: providers-protocol
    surface_ids: [zed]
    source_refs: [ref-zed-providers-openai-capabilities, ref-zed-providers-doc-openai-compatible, ref-zed-providers-doc-anthropic-compatible, ref-zed-providers-anthropic-capabilities, ref-zed-providers-repo-doc-local]
  - section_id: providers-models-metadata
    surface_ids: [zed]
    source_refs: [ref-zed-providers-openai-compatible, ref-zed-providers-anthropic-compatible, ref-zed-providers-openai-model, ref-zed-providers-openai-capabilities, ref-zed-providers-doc-openai-compatible, ref-zed-providers-anthropic-model, ref-zed-providers-repo-doc-local, ref-zed-providers-bedrock-available-model, ref-zed-providers-repo-doc-bedrock-models]
  - section_id: providers-forwarding
    surface_ids: [zed]
    source_refs: [ref-zed-providers-openai-capabilities, ref-zed-providers-doc-openai-compatible, ref-zed-providers-doc-headers, ref-zed-providers-anthropic-capabilities, ref-zed-providers-openai-model, ref-zed-providers-bedrock-available-model, ref-zed-providers-repo-doc-bedrock-models]
  - section_id: providers-responses-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-providers-doc-openai-compatible, ref-zed-providers-openai-capabilities, ref-zed-providers-openai-compatible, ref-zed-providers-api-key, ref-zed-providers-doc-keys]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [zed]
        section_id: providers-entry
        status: answered
        source_refs: [ref-zed-providers-settings-map, ref-zed-providers-openai-compatible, ref-zed-providers-anthropic-compatible, ref-zed-providers-doc-openai-compatible, ref-zed-providers-copilot-settings-default, ref-zed-providers-copilot-settings-type]
  - question_id: providers.auth
    answers:
      - surface_ids: [zed]
        section_id: providers-auth
        status: answered
        source_refs: [ref-zed-providers-api-key, ref-zed-providers-doc-keys, ref-zed-providers-doc-headers]
  - question_id: providers.protocol
    answers:
      - surface_ids: [zed]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-zed-providers-openai-capabilities, ref-zed-providers-anthropic-capabilities, ref-zed-providers-doc-openai-compatible]
  - question_id: providers.models
    answers:
      - surface_ids: [zed]
        section_id: providers-models-metadata
        status: answered
        source_refs: [ref-zed-providers-openai-model, ref-zed-providers-repo-doc-local, ref-zed-providers-bedrock-available-model, ref-zed-providers-repo-doc-bedrock-models]
  - question_id: providers.metadata
    answers:
      - surface_ids: [zed]
        section_id: providers-models-metadata
        status: answered
        source_refs: [ref-zed-providers-openai-capabilities, ref-zed-providers-anthropic-model, ref-zed-providers-openai-model, ref-zed-providers-bedrock-available-model]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [zed]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-zed-providers-doc-headers, ref-zed-providers-doc-openai-compatible, ref-zed-providers-anthropic-capabilities, ref-zed-providers-openai-capabilities, ref-zed-providers-bedrock-available-model]
  - question_id: providers.responses
    answers:
      - surface_ids: [zed]
        section_id: providers-responses-diagnostics
        status: partial
        source_refs: [ref-zed-providers-doc-openai-compatible, ref-zed-providers-openai-capabilities]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: providers-responses-diagnostics
        status: partial
        source_refs: [ref-zed-providers-api-key, ref-zed-providers-doc-keys]
---

本章固定来源：官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 与 `a84689073d296dfd39987bc7dd478e43ef76d83a` 的 `crates/settings_content/src/language_model.rs`、`crates/settings_content/src/settings_content.rs`、`crates/settings/src/settings.rs`、`crates/language_model/src/api_key.rs`、`assets/settings/default.json`，以及官方文档站的 `docs/ai/use-api-access.md`、`docs/ai/use-a-local-model.md` 快照和仓库内的 `docs/src/ai/use-a-gateway.md`。文档快照不含适用软件版本号，本章按来源级知识阅读；默认值只以源码里的 `Default` 实现为准。带日期的结论（Copilot 企业版端点键、Bedrock 自定义模型字段）只在新提交上核实过。

## Provider 的配置入口与作用域 {#providers-entry}

自定义 provider 写在设置文件的 `language_models` 对象里。两类「兼容端点」是映射结构，键由用户自定，因此同一个 Zed 可以并列配置多个不同厂商：[@ref-zed-providers-settings-map]

- `language_models.openai_compatible` 下每个键是一组 `OpenAiCompatibleSettingsContent`：`api_url`（必填）、`available_models`（必填数组）、可选 `custom_headers`。[@ref-zed-providers-openai-compatible]
- `language_models.anthropic_compatible` 下每个键是一组 `AnthropicCompatibleSettingsContent`：字段形状相同（`api_url`、`available_models`、可选 `custom_headers`）。[@ref-zed-providers-anthropic-compatible]

最小示例（字段取自 `OpenAiCompatibleSettingsContent`，示例形态取自官方文档的 «OpenAI-Compatible Endpoints» 一节）：[@ref-zed-providers-doc-openai-compatible]

```json
{
  "language_models": {
    "openai_compatible": {
      "my-provider": {
        "api_url": "https://example.com/v1",
        "available_models": [
          {
            "name": "my-model",
            "display_name": "My Model",
            "max_tokens": 128000
          }
        ]
      }
    }
  }
}
```

设置的作用域沿用设置文件的层叠规则（默认 → 用户 → 项目），因此 provider 既可以只给某个项目配，也可以全局配。官方文档另有一条路径：在 **Settings → AI → LLM Providers** 里用 `Add Provider` 填写 provider 名、API URL、model ID 与上下文窗口，界面会把同样的内容写进设置文件。[@ref-zed-providers-doc-openai-compatible][@ref-zed-providers-doc-anthropic-compatible]

同一节还说明这些设置只作用于 Zed 自己的 AI 功能（Zed Agent、Inline Assistant、提交信息生成、线程摘要等）；External Agents 与 Terminal Threads 各自配置模型访问。[@ref-zed-providers-doc-keys]

**不在 `language_models` 里的 provider 端点**：GitHub Copilot 企业实例的端点写在**顶层** `copilot` 对象下，而不是 `language_models` 里。该对象在默认设置中的注释是「Copilot Chat 与编辑预测共用」，只有一个 `enterprise_uri` 键，默认 `null`；运行时由 `CopilotSettings` 读取，它实现 `Settings` 并从 `SettingsContent.copilot` 取出该值。[@ref-zed-providers-copilot-settings-default][@ref-zed-providers-copilot-settings-type] 这个键改名前一直写在 `edit_predictions.copilot` 下；新提交里那一块保留的是代理与编辑预测自身相关字段（`proxy`、`proxy_no_verify`、`enable_next_edit_suggestions`、`prediction_debounce`），企业端点随顶层对象一起搬走了。[@ref-zed-providers-copilot-lm-block]

这条键位迁移对本章的实践含义是：**指向 provider 端点的键不一定在 `language_models` 下**，按 `language_models` 搜索设置文件会漏掉 Copilot 企业端点。旧键位由 `crates/migrator` 的 `m_2026_09_29` 迁移搬运，作用范围见 configuration 主题的「默认值与迁移」一节，迁移的触发时机在该节标为未验证。

## 凭据：keychain、环境变量与 base URL {#providers-auth}

`ApiKey` 抽象（`crates/language_model/src/api_key.rs`）规定了两条来源：环境变量与系统 keychain。非空的环境变量优先——`load_if_needed` 在环境变量存在时直接采用它，且 `store` 在「键来自环境变量」时会拒绝写入 keychain（源码里把这种情况标为 bug 并只记日志），也就是说从环境变量来的键不会被复制进 keychain。[@ref-zed-providers-api-key]

文档补全了命名规则与不提权的做法：API key 存在系统 keychain 而非设置文件；Zed 也读取各 provider 专属环境变量，且非空环境变量优先于 keychain；对兼容端点，环境变量名由 provider id 生成——转成大写蛇形后加 `_API_KEY`，例如 provider id `my-gateway` 对应 `MY_GATEWAY_API_KEY`；文档明确「不要把 API key 写进 `settings.json`」。[@ref-zed-providers-doc-keys]

base URL 就是配置里的 `api_url`；它没有内置默认值，必须写在 `openai_compatible`/`anthropic_compatible` 的条目里。[@ref-zed-providers-openai-compatible][@ref-zed-providers-anthropic-compatible] 额外的请求头用 provider 级 `custom_headers` 提供，例如给某个 provider 加一个自有鉴权头：[@ref-zed-providers-doc-headers]

```json
{
  "language_models": {
    "openai": {
      "custom_headers": {
        "Fancy-Auth": "Bearer YOUR_FANCY_KEY",
        "X-My-Tag": "zed"
      }
    }
  }
}
```

文档提醒：`custom_headers` 不能覆盖 Zed 自己管理的头（例如 `Authorization`、`Content-Type`、`Accept` 或 provider 专属鉴权头），试图覆盖只会得到一条警告。[@ref-zed-providers-doc-headers]

## 协议与端点形态 {#providers-protocol}

两类兼容端点对应两种线上协议：

- **OpenAI 兼容**：默认走 chat-completions。能力位 `capabilities.chat_completions` 默认 `true`；仅当模型只支持 Responses API 时把它设为 `false`，Zed 改用 Responses 端点。[@ref-zed-providers-openai-capabilities][@ref-zed-providers-doc-openai-compatible]
- **Anthropic 兼容**：面向实现了 Anthropic Messages API（`/v1/messages`）的服务，用户提供自定义 base URL、model ID 与 API key。[@ref-zed-providers-doc-anthropic-compatible]

Anthropic 兼容的能力位默认值是 `tools: true`、`images: false`、`prompt_caching: false`；`prompt_caching` 打开后 Zed 会发送显式的 `cache_control` 断点，若上游拒绝这类请求就应保持关闭。[@ref-zed-providers-anthropic-capabilities] 本地/自托管服务统一走同一条 OpenAI 兼容路径：文档把 llama.cpp、Ollama、LM Studio 列为 Zed 直接支持的第一方 provider，把其它本地服务归到「Local OpenAI-Compatible Servers」。[@ref-zed-providers-repo-doc-local]

## 模型列表与能力元数据 {#providers-models-metadata}

兼容端点的模型在 `available_models` 数组里逐个声明，**没有**「自动发现」的能力位：`OpenAiCompatibleSettingsContent` 与 `AnthropicCompatibleSettingsContent` 只有 `api_url`、`available_models`、`custom_headers` 三个字段。[@ref-zed-providers-openai-compatible][@ref-zed-providers-anthropic-compatible] OpenAI 兼容模型的字段与默认值：

| 字段 | 必需 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | 传给 provider API 的模型 ID [@ref-zed-providers-openai-model] |
| `display_name` | 否 | 选择器里显示的名字 [@ref-zed-providers-openai-model] |
| `max_tokens` | 是 | 上下文窗口大小 [@ref-zed-providers-openai-model] |
| `max_output_tokens` | 否 | 单次输出上限 [@ref-zed-providers-openai-model] |
| `max_completion_tokens` | 否 | OpenAI 风格的补全上限 [@ref-zed-providers-openai-model] |
| `reasoning_effort` | 否 | OpenAI 推理强度枚举 [@ref-zed-providers-openai-model] |
| `capabilities` | 否 | 见下表，缺省时整块取默认值 [@ref-zed-providers-openai-capabilities] |

OpenAI 兼容能力位的默认值（`Default` 实现）：`tools: true`、`images: false`、`parallel_tool_calls: false`、`prompt_cache_key: false`、`chat_completions: true`、`interleaved_reasoning: false`、`max_tokens_parameter: false`。[@ref-zed-providers-openai-capabilities] 文档给出的四条默认与源码一致（tools/images/parallel_tool_calls/prompt_cache_key/chat_completions/interleaved_reasoning/max_tokens_parameter），并解释了各自的开关含义。[@ref-zed-providers-doc-openai-compatible]

Anthropic 兼容模型在 `name`、`display_name`、`max_tokens` 之外还支持 `tool_override`（主模型不支持工具调用时改用的模型名）、`max_output_tokens`、`default_temperature`、`extra_beta_headers`（作为 `anthropic-beta` 头发送）、`mode`（例如 thinking）与 `capabilities`。[@ref-zed-providers-anthropic-model]

不同 provider 的模型字段并不统一：例如第一方 Ollama 等 provider 才有 `auto_discover` 之类的发现开关，而兼容端点没有；文档的本地模型页给出 `auto_discover: false` 加 `available_models` 的手写清单写法，并说明默认是自动发现已拉取的模型。[@ref-zed-providers-repo-doc-local]

**Bedrock 的模型清单自成一套**。`language_models.bedrock.available_models` 的元素是 `BedrockAvailableModel`，必填只有 `name` 与 `max_tokens`（`name` 直接作为发送给 Bedrock 的模型 ID），可选字段里除 `display_name`、`cache_configuration`、`max_output_tokens`、`default_temperature` 外，多出 `supports_tools`、`supports_images` 与 `thinking`；其中 `thinking` 是不带 tag 的枚举，可以是布尔值，也可以是带 `adaptive`、`has_xhigh`、`budget_tokens` 的对象。[@ref-zed-providers-bedrock-available-model] 官方文档为它单列一节 «Custom Bedrock Models»：用 `available_models` 补上尚未内置的模型，`name` 写完整模型 ID（需要特定推理配置档时带地理前缀或写完整 ARN），并对拒绝 `temperature` 字段的模型（如 xAI、MoonshotAI 系）要求不设 `default_temperature`。[@ref-zed-providers-repo-doc-bedrock-models]

这与兼容端点的差异值得单独记住：兼容端点的能力位收在 `capabilities` 子对象里，AWS Bedrock 的能力位是模型条目上的平铺布尔字段，两种写法不能互换。[@ref-zed-providers-bedrock-available-model][@ref-zed-providers-openai-capabilities]

## 配置项到请求的映射 {#providers-forwarding}

| 配置 | 行为 |
| :-- | :-- |
| `capabilities.chat_completions` | `true` 走 chat-completions 端点，`false` 走 Responses 端点 [@ref-zed-providers-openai-capabilities][@ref-zed-providers-doc-openai-compatible] |
| `reasoning_effort` | Zed 按 OpenAI 风格在 chat-completions 请求上发送推理强度；可用值包含 `none`、`minimal`、`low`、`medium`、`high`、`xhigh`、`max` [@ref-zed-providers-doc-openai-compatible] |
| `capabilities.interleaved_reasoning` | 为 `true` 时，先前的思考通过专用 `reasoning_content` 字段回传 [@ref-zed-providers-doc-openai-compatible] |
| `capabilities.max_tokens_parameter` | 为 `true` 时输出上限以 `max_tokens` 发送，否则用 `max_completion_tokens` [@ref-zed-providers-doc-openai-compatible] |
| `custom_headers` | 每个请求追加自定义头；Zed 自己管理的头不可覆盖 [@ref-zed-providers-doc-headers] |
| `capabilities.prompt_caching`（Anthropic 兼容） | 为 `true` 时发送显式 `cache_control` 断点 [@ref-zed-providers-anthropic-capabilities] |
| `available_models[].thinking`（Bedrock） | 布尔或对象；对象里的 `budget_tokens` 给出思考预算，`adaptive` 与 `has_xhigh` 切换自适应与加强推理档位 [@ref-zed-providers-bedrock-available-model][@ref-zed-providers-repo-doc-bedrock-models] |
| `available_models[].supports_tools` / `supports_images`（Bedrock） | 声明该模型是否支持工具调用与图像输入；文档要求为支持的模型显式设置 [@ref-zed-providers-repo-doc-bedrock-models] |

需要提醒的是，`available_models` 里的元数据有一部分只影响 Zed 侧的界面与路由决策（例如 `display_name` 只影响选择器显示），而 `max_tokens`/`max_output_tokens`、能力位则会改变实际请求或可用工具集；固定来源对「哪些字段纯粹是界面元数据」没有单独列表，这里只按注释字面含义区分。[@ref-zed-providers-openai-model][@ref-zed-providers-openai-capabilities]

## 流式、错误处理与诊断 {#providers-responses-diagnostics}

**已确证**：

- 请求形态由协议与能力位决定，流式与工具调用是 Zed 与 provider 之间的常规交互（工具相关能力位控制是否发送工具 schema；`parallel_tool_calls`、`prompt_cache_key` 等影响请求内容）。[@ref-zed-providers-doc-openai-compatible][@ref-zed-providers-openai-capabilities]
- 模型必须在 `available_models` 中声明后才会出现在模型选择器里；文档说明同一模型可能由多个 provider 提供，需要在选择器里确认 provider（按左侧标识区分）。[@ref-zed-providers-openai-compatible]
- 配置可读性的观察点：provider 设置页（键与 provider 是否列出）、`api_url` 与模型列表。凭据是否正确另算——环境变量优先级与 keychain 的取舍会影响「为什么换了 key 没生效」，需要先确认环境变量是否仍在设置。[@ref-zed-providers-api-key][@ref-zed-providers-doc-keys]

**缺口**：固定来源没有给出兼容端点的 HTTP 错误码映射、重试次数与退避策略，也没有列出流式解析失败时的行为；`language_models` 请求实现文件不在本次签出的文件集中，因此「配置可读 → 模型可选 → 请求已发送 → 后端实际可用」这四级只能到前两级加文档描述，后两级留作未验证。[@ref-zed-providers-doc-openai-compatible][@ref-zed-providers-api-key] 同样地，Copilot 企业端点与 Bedrock 自定义模型这两项本轮只核到设置结构与文档说明，没有运行观测，认证握手、模型 ID 拼接与 thinking 参数在真实请求里的最终形态仍未验证。[@ref-zed-providers-copilot-settings-type][@ref-zed-providers-bedrock-available-model]
