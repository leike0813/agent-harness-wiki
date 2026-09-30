---
schema_version: 3
record_kind: production
edition_id: crush-cli-custom_providers-v1
harness_id: crush
topic: custom_providers
title: "Crush 的自定义 Provider：定义、凭据、模型发现与请求映射"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-crush-readme-providers, ref-crush-configdoc-provider-add, ref-crush-schema-provider]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-crush-schema-provider, ref-crush-code-provider-builtin, ref-crush-configdoc-provider-add, ref-crush-code-config-merge, ref-crush-code-provider-struct, ref-crush-code-provider-resolve, ref-crush-code-provider-custom]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-crush-readme-providers-openai, ref-crush-configdoc-provider-add, ref-crush-readme-apikeys, ref-crush-code-provider-resolve, ref-crush-code-provider-struct, ref-crush-code-provider-update, ref-crush-code-apply-env, ref-crush-readme-env, ref-crush-readme-providers-anthropic]
  - section_id: providers-protocol-models
    surface_ids: [cli]
    source_refs: [ref-crush-code-schema-cmd, ref-crush-code-provider-custom, ref-crush-readme-providers, ref-crush-readme-providers-openai, ref-crush-readme-local-models, ref-crush-configdoc-model-add, ref-crush-configdoc-model-slots, ref-crush-code-model-builtin, ref-crush-code-model-slots-builtin, ref-crush-code-discover-models, ref-crush-readme-manual-models, ref-crush-code-model-fallback, ref-crush-code-config-defaults, ref-crush-code-models-cmd]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-crush-code-selected-model, ref-crush-configdoc-model-add, ref-crush-code-context-threshold, ref-crush-code-context-threshold-use, ref-crush-configdoc-model-slots]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-crush-code-provider-struct, ref-crush-code-provider-build, ref-crush-code-openai-compat, ref-crush-code-selected-model, ref-crush-readme-providers-anthropic, ref-crush-code-retry-401, ref-crush-code-request-timeout, ref-crush-code-request-timeout-error, ref-crush-code-options]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-models-cmd, ref-crush-code-info-tool, ref-crush-readme-logging, ref-crush-code-provider-custom, ref-crush-code-provider-struct, ref-crush-readme-auto-update, ref-crush-readme-auto-update-off, ref-crush-code-provider-update, ref-crush-code-provider-cache, ref-crush-code-provider-list]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-crush-schema-provider, ref-crush-code-provider-builtin, ref-crush-configdoc-provider-add, ref-crush-code-provider-struct, ref-crush-code-provider-resolve, ref-crush-code-provider-custom, ref-crush-code-config-merge]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-crush-readme-apikeys, ref-crush-code-provider-resolve, ref-crush-code-provider-struct, ref-crush-configdoc-provider-add, ref-crush-code-apply-env, ref-crush-readme-env]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-crush-code-provider-custom, ref-crush-code-schema-cmd, ref-crush-readme-providers, ref-crush-readme-providers-openai, ref-crush-readme-local-models]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-crush-configdoc-model-add, ref-crush-configdoc-model-slots, ref-crush-code-discover-models, ref-crush-readme-manual-models, ref-crush-readme-local-models, ref-crush-code-model-fallback]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: partial
        source_refs: [ref-crush-code-selected-model, ref-crush-configdoc-model-add, ref-crush-configdoc-model-slots, ref-crush-code-context-threshold, ref-crush-code-context-threshold-use]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: answered
        source_refs: [ref-crush-code-provider-struct, ref-crush-code-selected-model, ref-crush-code-provider-build, ref-crush-code-openai-compat, ref-crush-readme-providers-anthropic]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-crush-code-request-timeout, ref-crush-code-request-timeout-error, ref-crush-code-options, ref-crush-code-retry-401, ref-crush-readme-providers-anthropic]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-crush-code-models-cmd, ref-crush-code-info-tool, ref-crush-readme-logging, ref-crush-readme-auto-update, ref-crush-code-provider-update, ref-crush-code-provider-cache]
---

## 固定来源与界面 {#providers-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出：README 的 Custom Providers、Local Models、Amazon Bedrock、Vertex AI Platform、API Keys 与 Provider Auto-Updates 各节，`docs/config/README.md` 的 `provider`/`model` 命令参考，`schema.json` 的 `ProviderConfig` 与 `SelectedModel` 定义，以及 `internal/config/`、`internal/shellconfig/provider.go`、`internal/discover/`、`internal/agent/coordinator.go` 的实现。界面口径为 catalog 唯一登记的 `cli`。[@ref-crush-readme-providers][@ref-crush-configdoc-provider-add][@ref-crush-schema-provider]

## 定义入口与第一方字段 {#providers-entry}

Provider 定义在普通配置的 `providers` 映射里；`crushrc` 用 `provider add` 内建命令写入，重复同名即更新，`provider remove`/`rm` 删除（连同它的自定义模型）[@ref-crush-schema-provider][@ref-crush-code-provider-builtin][@ref-crush-configdoc-provider-add]。因为走的是同一套配置合并，作用域遵循全局/项目/工作区数据配置的优先级 [@ref-crush-code-config-merge]。

`ProviderConfig` 字段（JSON 名 / `crushrc` 旗标）[@ref-crush-code-provider-struct][@ref-crush-code-provider-builtin]：

| 字段 | 旗标 | 说明 |
| :-- | :-- | :-- |
| `id` | 位置参数 | provider 标识，也是模型引用（provider 斜杠模型 id）的前半段 |
| `name` | `--name` | 展示名；未设置时回退为 id |
| `type` | `--type` | API 形态；未设置时按 `openai` 处理 |
| `base_url` | `--base-url` | API 端点；自定义 provider 缺它就整条跳过 |
| `api_key` | `--api-key` | 凭据模板，加载时解析 |
| `disable` | `--disable` | 保留定义但不启用 |
| `flat_rate` | `--flat-rate` | 订阅制计费，不累计成本 |
| `discover_models` | `--discover-models` | 是否调用 /models 发现模型 |
| `system_prompt_prefix` | `--system-prompt-prefix` | 追加在该 provider 系统提示前的前缀 |
| `extra_headers` | `--extra-header K V` | 附加请求头，可重复；值支持变量展开 |
| `extra_body` | `--extra-body JSON` | 原样并入请求体的 JSON 对象 |
| `provider_options` | `--provider-options JSON` | provider 专有选项对象 |
| `models` | （由 `model add` 写入） | 自定义模型列表 |
| `aws_auth_refresh` | 仅 JSON | AWS 凭据失效时执行的刷新命令（Bedrock） |
| `oauth` / `chatgpt_models` | 内部 | OAuth 令牌与 ChatGPT 订阅模型目录 |

两类 provider 的处理链不同 [@ref-crush-code-provider-resolve][@ref-crush-code-provider-custom]：

- **内置（known）provider**：来自 Catwalk 目录（或内嵌副本）。用户配置里同名的 `base_url`、`api_key`、`models` 会覆盖目录里的对应值，模型列表做“用户先、目录后”的合并去重；目录里的默认 header 与用户 `extra_headers` 合并。内置 provider 缺凭据时会被从运行配置里删掉（并在配置里保留原条目以便补上），其中 Vertex、Bedrock、Hyper、Azure 各有自己的凭据判定分支。
- **自定义 provider**：校验顺序是类型必须已知（Catwalk 类型集合、`hyper`，或本地发现类如 `ollama`/`omlx`/`lmstudio`/`llamacpp`/`litellm`），`disable` 为真直接删掉，`base_url` 解析后为空删掉，没有模型（且发现失败）也删掉；`api_key` 为空只记 warning，因为本地 provider 不需要。

`options.disable_default_providers` 打开后完全跳过内置目录，用户必须自己把 provider 写全（`base_url`、`models`、`api_key`）；此时若一个 provider 都没有，加载会直接报错。[@ref-crush-code-provider-resolve][@ref-crush-code-provider-custom]

## 凭据、环境变量与 base URL {#providers-auth}

- **显式凭据**：`api_key` 是模板，支持 `$VAR` 与 `$(cmd)`；文档示例统一用环境变量引用，例如 `provider add deepseek --type openai-compat --base-url ... --api-key "$DEEPSEEK_API_KEY"`。[@ref-crush-readme-providers-openai][@ref-crush-configdoc-provider-add]
- **环境变量直供**：README 列出了每个内置 provider 对应的环境变量（`ANTHROPIC_API_KEY`、`OPENAI_API_KEY`、`GEMINI_API_KEY`、`OPENROUTER_API_KEY`、`HYPER_API_KEY`、`VERTEXAI_PROJECT`/`VERTEXAI_LOCATION`、`AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`/`AWS_REGION`/`AWS_PROFILE`/`AWS_BEARER_TOKEN_BEDROCK`、`AZURE_OPENAI_API_ENDPOINT`/`AZURE_OPENAI_API_KEY`/`AZURE_OPENAI_API_VERSION` 等）。[@ref-crush-readme-apikeys]
- **provider 专有分支**：Vertex 需要 `VERTEXAI_PROJECT` 与 `VERTEXAI_LOCATION` 两个变量齐备，并把它们写进 `ExtraParams`；Azure 用 `AZURE_OPENAI_API_ENDPOINT` 解析出的地址与 `AZURE_OPENAI_API_VERSION`；Bedrock 用 AWS 凭据链或 `AWS_BEARER_TOKEN_BEDROCK`；Hyper 优先取环境变量 `HYPER_API_KEY`，没有再解析配置里的模板。[@ref-crush-code-provider-resolve]
- **附加请求头**：`extra_headers` 的值在加载时展开；解析失败会让 provider 加载直接失败，解析为空串则该 header 被删除（不发空值）。文档给出的例子是“组织 ID 变量没设就不发这个 header”。[@ref-crush-code-provider-struct][@ref-crush-configdoc-provider-add]
- **base URL**：内置 provider 的 `base_url` 覆盖目录里的端点，自定义 provider 必须有 `base_url`；`CATWALK_URL` 可改 provider 目录的来源，`Hyper` 另有自己的目录端点。[@ref-crush-code-provider-resolve][@ref-crush-code-provider-update]
- **环境变量注入**：配置顶层的 `env` 映射在启动时（provider 配置之前）被写进进程环境，值同样支持 `$VAR` 与 `$(cmd)`，用来让 AWS SDK 之类的凭据链看到 `AWS_PROFILE` 等变量。[@ref-crush-code-apply-env][@ref-crush-readme-env]

示例（逐字取自 README 的两个 Custom Providers 小节，凭据只用环境变量占位）[@ref-crush-readme-providers-openai][@ref-crush-readme-providers-anthropic]：

```bash
provider add deepseek --type openai-compat \
  --base-url "https://api.deepseek.com/v1" \
  --api-key "$DEEPSEEK_API_KEY"

provider add custom-anthropic --type anthropic \
  --base-url "https://api.anthropic.com/v1" \
  --api-key "$ANTHROPIC_API_KEY" \
  --extra-header anthropic-version 2023-06-01
```

## 协议形态与模型发现 {#providers-protocol-models}

**协议/类型**：`type` 的合法取值不是手写枚举，而是运行时拼出来的：Catwalk 的已知类型集合、`hyper`，以及本地发现类 provider 自注册的类型。`crush schema` 会把这份动态集合写进 schema 的 `ProviderConfig.type` 枚举里。[@ref-crush-code-schema-cmd][@ref-crush-code-provider-custom] 文档层面强调两种 OpenAI 形态的区别：`openai` 用于经过 OpenAI 本身的路由/代理，`openai-compat` 用于第三方 OpenAI 兼容 API；Anthropic 兼容用 `anthropic`；另有 `google-vertex`、`azure`、`bedrock`、本地推理类（`ollama`、`llamacpp`、`omlx`、`lmstudio`、`litellm`）。[@ref-crush-readme-providers][@ref-crush-readme-providers-openai][@ref-crush-readme-local-models]

**模型定义**：`model add` 后跟 provider 名、斜杠与模型 id 即可注册自定义模型，`model remove` 删除；`model large`/`model small` 设置或打印两个模型槽位（不带参数即打印当前选择）。模型引用就是 `crush models` 打印的 provider 名加斜杠加模型 id 的形式。[@ref-crush-configdoc-model-add][@ref-crush-configdoc-model-slots][@ref-crush-code-model-builtin][@ref-crush-code-model-slots-builtin]

**模型发现**：自定义 provider 在 `models` 为空时会自动调用 `GET /models` 发现模型（`openai-compat` 类型空列表也触发）；`discover_models: true` 时总是合并发现结果。发现请求使用解析后的 `base_url`、`api_key` 与 `extra_headers`，带 3 秒上下文预算，失败只记 warning。合并规则是“用户显式写的模型优先，发现结果补齐缺失项”，所以手工配置的字段不会被覆盖。本地类 provider 还有各自的 enricher 补全元数据。[@ref-crush-code-discover-models][@ref-crush-code-provider-custom][@ref-crush-readme-manual-models][@ref-crush-readme-local-models]

大/小模型槽位的选择有兜底规则：未显式设置时按内置目录挑选默认模型；若小模型未配置且 provider 不在已知目录里（自定义 provider 的情形），宿主会直接用大模型充当小模型并记一条 warning，避免“自定义 provider 只配了大模型”直接不可用。[@ref-crush-code-model-fallback][@ref-crush-code-config-defaults]

本地 provider 的发现对照（`type` 取值与端点约定来自 README 的 Local Models 一节，发现请求走 `GET /models`）[@ref-crush-readme-local-models][@ref-crush-code-discover-models][@ref-crush-code-provider-custom]：

| `type` | 典型端点 | 说明 |
| :-- | :-- | :-- |
| `ollama` | `http://localhost:11434/v1/` | 留空模型列表时自动发现 |
| `llamacpp` | `http://localhost:2222` | 指向 `llama-server` 的地址 |
| `lmstudio`、`omlx`、`litellm` | 各自的本地地址 | 同样支持自动发现 |

`crush models` 列出已知 provider 的模型，未配置的 provider 会标注未配置，并支持按关键字过滤 [@ref-crush-code-models-cmd]。

## 能力元数据 {#providers-metadata}

模型的元数据有两层，分别来自 provider 目录/自定义模型定义与用户选的模型槽位 [@ref-crush-code-selected-model][@ref-crush-configdoc-model-add]：

| 位置 | 字段 | 用途 |
| :-- | :-- | :-- |
| 模型定义（`catwalk.Model`，`model add` 的旗标） | `name`、`context_window`、`default_max_tokens`、`can_reason`、`supports_images`、`cost_per_1m_in`/`out`/`cache_create`/`cache_hit`、`reasoning_levels`、`default_reasoning_effort` | 决定上下文窗口预算、默认输出上限、是否显示思考开关、是否允许图片输入、成本统计与推理档位 |
| 模型槽位 `models.large`/`models.small` | `provider`、`model`（必填）、`max_tokens`、`temperature`、`top_p`、`top_k`、`frequency_penalty`、`presence_penalty`、`reasoning_effort`、`think`、`provider_options` | 覆盖该槽位的采样与输出参数；`reasoning_effort` 只接受 low/medium/high，Anthropic 类用 `think` 开关思考模式 |
| provider 级 | `system_prompt_prefix`、`provider_options`、`extra_params` | 提示前缀与 provider 专有参数（如 Vertex 的 project/location、Azure 的 apiVersion） |

元数据里至少有两条是“真的会在运行期被用到”的 [@ref-crush-code-context-threshold][@ref-crush-code-context-threshold-use]：

- 上下文窗口：自动摘要的阈值由大模型的 `ContextWindow` 推出——窗口超过 20 万 token 时阈值取“窗口 - 2 万”，否则取窗口的 20%；也就是说把 context window 填错会直接改变摘要触发的时机。
- 输出上限：槽位里的 `max_tokens` 优先于模型定义里的 `default_max_tokens`，子代理运行时也用同一套规则解析。

缺口：其余元数据（价格字段如何累计成本与展示、`supports_images` 在哪些链路生效、`reasoning_levels` 与 `default_reasoning_effort` 如何映射到具体请求参数）在固定来源里没有逐项说明；`can_reason` 与 `reasoning_effort` 的联动只有取值校验可查。[@ref-crush-code-selected-model][@ref-crush-code-context-threshold-use]

`model large`/`model small` 的旗标与上面的槽位字段一一对应（`--think`、`--reasoning-effort`、`--max-tokens`、`--temperature`、`--top-p`、`--top-k`、`--frequency-penalty`、`--presence-penalty`、`--provider-options`）[@ref-crush-configdoc-model-slots]。`reasoning_effort` 的取值有校验，非法值会被拒绝 [@ref-crush-code-selected-model]。

## 参数如何映射到请求，以及响应与重试 {#providers-forwarding-responses}

- **`extra_body`**：注释里写明它**原样**并入 OpenAI 兼容请求体，**不做**变量展开——这是刻意的设计，好让数字、嵌套对象、布尔值等扩展字段无损往返；需要环境变量驱动的值应放进 `extra_headers`、`api_key`、`base_url`（这些会展开）。[@ref-crush-code-provider-struct]
- **`extra_headers`**：解析后注入每个请求；空值 header 被丢弃 [@ref-crush-code-provider-struct]。
- **按 type 选择客户端**：构建阶段按 provider 的 `type` 选择底层客户端（anthropic、openai、openrouter、vercel、openai-compat、azure、bedrock、google、google-vertex 各有分支），`openai-compat` 分支会把 `extra_body` 与 `provider_options` 一并带进请求。[@ref-crush-code-provider-build][@ref-crush-code-openai-compat]
- **`provider_options`**：作为 provider 专有选项合并进请求（与模型的 `provider_options` 叠加）[@ref-crush-code-provider-struct][@ref-crush-code-selected-model]。
- **`system_prompt_prefix`**：追加到该 provider 的系统提示之前 [@ref-crush-code-provider-struct]。
- **`flat_rate`**：只影响成本统计，订阅制下不累计花费 [@ref-crush-code-provider-struct]。
- **`aws_auth_refresh`**：Bedrock 返回凭据错误时执行该命令，然后**就地重试**同一个请求（不产生重复消息、无需手动重启）[@ref-crush-readme-providers-anthropic][@ref-crush-code-retry-401]。
- **401 重试链**：收到 401 时按情形处理——有 OAuth token 就刷新（刷新令牌被吊销时触发交互式重新认证并阻塞等待）；Bedrock 走 `aws_auth_refresh`；`api_key` 模板里含 `$` 就重新解析模板（例如从 keyring 里重新取值）再重试；都没有则把原始错误抛回。这是凭据“过期-刷新-重试”的主路径。[@ref-crush-code-retry-401][@ref-crush-code-provider-struct]
- **超时**：`options.request_timeout`（`option request-timeout`，单位秒，缺省 2 分钟）是每次 LLM 请求的上限；对**流式**响应它是空闲超时，只有整段时间没有任何数据才终止，慢但在持续输出的流不会被杀掉；设为 0 表示不设超时。超时错误带有给用户看的提示文案（如何调大或关闭），流式超时另有专门的“长时间未收到数据”表述。[@ref-crush-code-request-timeout][@ref-crush-code-request-timeout-error][@ref-crush-code-options]
- **连接自测**：`ProviderConfig.TestConnection` 用解析后的凭据与 base URL 发起一次探测请求，可用来区分“配置可读”与“后端真的可用” [@ref-crush-code-provider-struct]。

官方没有承诺流式协议的细节（SSE 字段、工具调用增量合并、限流退避策略），因此这些记为缺口：`providers.responses` 只对上面这些可观察行为给结论，重试次数/退避曲线在固定来源里没有定义。[@ref-crush-code-retry-401]

## 诊断 {#providers-diagnostics}

- 区分层次：`crush models` 与带关键字过滤的 `crush models` 告诉你 provider 是否已配置、有哪些模型 ID；`crush_info` 的 `[providers]` 小节列出生效 provider 及其模型数量，`[model]` 小节给出两个槽位当前指向的模型与 provider；`crush logs --follow` 里有“跳过缺少 API key 的 provider”“发现到 N 个模型”“模型发现失败”等日志。[@ref-crush-code-models-cmd][@ref-crush-code-info-tool][@ref-crush-readme-logging]
- 配置可读 vs 后端可用：`api_key` 为空只会 warning（本地 provider 合法），`base_url` 为空或不支持的 `type` 会整条跳过；想确认后端可用用 `TestConnection` 这条路径或直接发一次请求。[@ref-crush-code-provider-custom][@ref-crush-code-provider-struct]
- 目录层面的诊断：`crush update-providers`（可带 URL 或本地文件，或 `embedded` 回到内置副本）、`CATWALK_URL`、`CRUSH_DISABLE_PROVIDER_AUTO_UPDATE` 三个入口分别对应“手动更新”“换源”“关掉自动更新”。[@ref-crush-readme-auto-update][@ref-crush-readme-auto-update-off][@ref-crush-code-provider-update]
- 缓存位置：provider 目录与 Hyper 目录各自缓存在数据目录下的 JSON 文件里（原子写入，避免多个实例同时刷新时读到半截文件），失败会回退到缓存或内嵌副本。[@ref-crush-code-provider-cache][@ref-crush-code-provider-list]

缺口：没有“测试这个 provider 是否能通”的 CLI 子命令（`crush models` 只反映配置），也没有把凭据解析失败与网络失败区分开的统一诊断输出；prompt 与响应内容都不打日志。[@ref-crush-code-models-cmd][@ref-crush-code-provider-struct]
