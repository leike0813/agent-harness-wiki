---
schema_version: 3
record_kind: production
edition_id: crush-cli-custom_providers-v2
harness_id: crush
topic: custom_providers
title: "Crush 的自定义 Provider：定义、凭据、模型发现与请求映射"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-crush-readme-providers, ref-crush-configdoc-provider-add, ref-crush-schema-provider, ref-crush-code-grok-models-field]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-crush-schema-provider, ref-crush-code-provider-builtin, ref-crush-configdoc-provider-add, ref-crush-code-config-merge, ref-crush-code-provider-struct, ref-crush-code-provider-resolve, ref-crush-code-provider-custom, ref-crush-code-grok-models-field]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-crush-readme-providers-openai, ref-crush-configdoc-provider-add, ref-crush-readme-apikeys, ref-crush-code-provider-resolve, ref-crush-code-provider-struct, ref-crush-code-provider-update, ref-crush-code-apply-env, ref-crush-readme-env, ref-crush-readme-providers-anthropic, ref-crush-code-grok-login-cmd, ref-crush-code-grok-login-flow, ref-crush-code-grok-callback-path, ref-crush-code-grok-device-flow, ref-crush-code-grok-logout-cmd, ref-crush-code-grok-credential-exclusive, ref-crush-code-grok-credential-fields, ref-crush-code-login-platforms, ref-crush-code-login-cli]
  - section_id: providers-protocol-models
    surface_ids: [cli]
    source_refs: [ref-crush-code-schema-cmd, ref-crush-code-provider-custom, ref-crush-readme-providers, ref-crush-readme-providers-openai, ref-crush-readme-local-models, ref-crush-configdoc-model-add, ref-crush-configdoc-model-slots, ref-crush-code-model-builtin, ref-crush-code-model-slots-builtin, ref-crush-code-discover-models, ref-crush-readme-manual-models, ref-crush-code-model-fallback, ref-crush-code-config-defaults, ref-crush-code-models-cmd, ref-crush-code-grok-models-cmd, ref-crush-code-model-availability, ref-crush-code-get-model, ref-crush-code-agent-model-resolve, ref-crush-code-grok-models-fetch, ref-crush-code-grok-store-refetch]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-crush-code-selected-model, ref-crush-configdoc-model-add, ref-crush-code-context-threshold, ref-crush-code-context-threshold-use, ref-crush-configdoc-model-slots, ref-crush-code-subscription-small-model, ref-crush-code-grok-small-model]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-crush-code-provider-struct, ref-crush-code-provider-build, ref-crush-code-openai-compat, ref-crush-code-selected-model, ref-crush-readme-providers-anthropic, ref-crush-code-retry-401, ref-crush-code-request-timeout, ref-crush-code-request-timeout-error, ref-crush-code-options]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-models-cmd, ref-crush-code-info-tool, ref-crush-readme-logging, ref-crush-code-provider-custom, ref-crush-code-provider-struct, ref-crush-readme-auto-update, ref-crush-readme-auto-update-off, ref-crush-code-provider-update, ref-crush-code-provider-cache, ref-crush-code-provider-list, ref-crush-code-grok-store-lazy, ref-crush-code-load-subscription-refetch, ref-crush-code-agent-model-refetch]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-crush-schema-provider, ref-crush-code-provider-builtin, ref-crush-configdoc-provider-add, ref-crush-code-provider-struct, ref-crush-code-provider-resolve, ref-crush-code-provider-custom, ref-crush-code-config-merge, ref-crush-code-grok-models-field]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-crush-readme-apikeys, ref-crush-code-provider-resolve, ref-crush-code-provider-struct, ref-crush-configdoc-provider-add, ref-crush-code-apply-env, ref-crush-readme-env, ref-crush-code-grok-login-cmd, ref-crush-code-grok-login-flow, ref-crush-code-grok-callback-path, ref-crush-code-grok-device-flow, ref-crush-code-grok-logout-cmd, ref-crush-code-grok-credential-exclusive, ref-crush-code-grok-credential-fields, ref-crush-code-login-platforms, ref-crush-code-login-cli]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-crush-code-provider-custom, ref-crush-code-schema-cmd, ref-crush-readme-providers, ref-crush-readme-providers-openai, ref-crush-readme-local-models, ref-crush-code-get-model]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-crush-configdoc-model-add, ref-crush-configdoc-model-slots, ref-crush-code-discover-models, ref-crush-readme-manual-models, ref-crush-readme-local-models, ref-crush-code-model-fallback, ref-crush-code-grok-models-cmd, ref-crush-code-model-availability, ref-crush-code-get-model, ref-crush-code-agent-model-resolve, ref-crush-code-grok-models-fetch, ref-crush-code-grok-store-refetch]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: partial
        source_refs: [ref-crush-code-selected-model, ref-crush-configdoc-model-add, ref-crush-configdoc-model-slots, ref-crush-code-context-threshold, ref-crush-code-context-threshold-use, ref-crush-code-subscription-small-model, ref-crush-code-grok-small-model]
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
        source_refs: [ref-crush-code-models-cmd, ref-crush-code-info-tool, ref-crush-readme-logging, ref-crush-readme-auto-update, ref-crush-code-provider-update, ref-crush-code-provider-cache, ref-crush-code-grok-store-lazy, ref-crush-code-load-subscription-refetch, ref-crush-code-agent-model-refetch]
---

## 固定来源与界面 {#providers-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `bdcf796cb1ff241b0eb18139071d46a84dc1ee91` 的检出：README 的 Custom Providers、Local Models、Amazon Bedrock、Vertex AI Platform、API Keys 与 Provider Auto-Updates 各节，`docs/config/README.md` 的 `provider`/`model` 命令参考，`schema.json` 的 `ProviderConfig` 与 `SelectedModel` 定义，以及 `internal/config/`、`internal/shellconfig/provider.go`、`internal/discover/`、`internal/login/`、`internal/oauth/grok/`、`internal/agent/coordinator.go` 的实现。界面口径为 catalog 唯一登记的 `cli`。[@ref-crush-readme-providers][@ref-crush-configdoc-provider-add][@ref-crush-schema-provider][@ref-crush-code-grok-models-field]

本版相对上一版的实质变化：内置 provider 列表新增了 xAI 的**订阅账号登录**（`crush login grok`），随之多出 `providers.xai.grok_models` 目录字段与两条新的凭据互斥/清理规则；同时模型“是否存在/是否可用”的判定从只查 API-key 目录改为跨 API-key 与订阅目录。这些结论只对上述固定 commit 成立，npm 上更高或更低的版本号不作为版本映射依据。

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
| `oauth` / `chatgpt_models` / `grok_models` | 内部 | OAuth 令牌与订阅账号被授予的模型目录 |

后三个字段带 `jsonschema:"-"`，因此不出现在 `crush schema` 生成的 schema 里，不能靠 `crushrc` 或手写 JSON 直接配置——它们由登录流程写入。`chatgpt_models` 与 `grok_models` 的语义相同：账号订阅生效时，该 provider 的**全部**可用模型就是这份订阅目录，`models` 里的 API-key 模型不再被该订阅服务 [@ref-crush-code-grok-models-field]。

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

### 订阅账号登录（xAI / Grok）

固定 commit 起 `crush login` 新增 `grok`（等价别名 `xai`）平台；已登录时直接提示已登录并退出，`-f/--force` 强制重新认证。取到的令牌按全局数据配置写进 `providers.xai.oauth`，写完即视为登录成功 [@ref-crush-code-grok-login-cmd]。

授权有两条可切换的路径 [@ref-crush-code-grok-login-flow]：

1. **浏览器授权码 + loopback 回调（默认）**：起一个本机回调监听器，浏览器完成授权后由它接回授权码并换成令牌。回调路径必须恰是 `/callback`；因为 xAI 按路径注册共享客户端的 loopback 重定向 URI，端口可以由操作系统分配（RFC 8252 豁免端口）[@ref-crush-code-grok-callback-path]。用户拒绝浏览器授权时，可以把授权页上的码粘回完成同一条流程。
2. **设备码流程（回退）**：loopback 监听器起不来时（远程机器、没有空闲端口）改走 RFC 8628 设备授权，用户在 `accounts.x.ai` 输入用户码；这条路径没有可粘回的码 [@ref-crush-code-grok-device-flow]。

非交互环境（stdin 不是终端）走同一套流程的无 TUI 版本：打印起始提示、用户码（若有）与授权 URL，并仍然尝试打开默认浏览器；浏览器打不开时只是把 URL 再打印一遍 [@ref-crush-code-login-platforms][@ref-crush-code-login-cli]。

**凭据互斥**：xAI 的 API key 与 OAuth 令牌只能二选一。给 `xai` 写入 `api_key` 时，内存里的 `OAuthToken` 与 `GrokModels` 会被清空，同时从配置文件里删掉 `providers.xai.oauth` 与 `providers.xai.grok_models`——理由是登录态的刷新会把 API key 再覆盖回去 [@ref-crush-code-grok-credential-exclusive][@ref-crush-code-grok-credential-fields]。

**登出**：`crush logout grok`（或 `xai`）清掉 `providers.xai.oauth`、`providers.xai.grok_models` 与 `providers.xai.api_key` 三个字段；不带参数时会话列出已登录平台，其中也包含 xAI [@ref-crush-code-grok-logout-cmd]。这与“API key 与 OAuth 互斥”不同：登出把两种凭据一起清掉。

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

**订阅目录**：登录成功后，宿主用 OAuth 令牌向 xAI 的 `https://api.x.ai/v1/models`（ChatGPT 与其它 provider 各有自己的等价入口）拉取该订阅被授予的模型目录；只保留文本生成类条目，列表里的图像/视频生成模型不是 chat 模型而被过滤掉；请求前若令牌已过期会先刷新（该端点对过期令牌回 401）。拉到的目录写进 `providers.xai.grok_models`，失败只记 warning、保留原有目录、登录仍算成功 [@ref-crush-code-grok-models-fetch][@ref-crush-code-grok-store-refetch]。

本地 provider 的发现对照（`type` 取值与端点约定来自 README 的 Local Models 一节，发现请求走 `GET /models`）[@ref-crush-readme-local-models][@ref-crush-code-discover-models][@ref-crush-code-provider-custom]：

| `type` | 典型端点 | 说明 |
| :-- | :-- | :-- |
| `ollama` | `http://localhost:11434/v1/` | 留空模型列表时自动发现 |
| `llamacpp` | `http://localhost:2222` | 指向 `llama-server` 的地址 |
| `lmstudio`、`omlx`、`litellm` | 各自的本地地址 | 同样支持自动发现 |

`crush models` 列出已知 provider 的模型，未配置的 provider 会标注未配置，并支持按关键字过滤。OpenAI 与 xAI 各自只有一份凭据：账号订阅登录时只列订阅目录（`chatgpt_models` / `grok_models`），用 API key 时才列常规 `models` 目录 [@ref-crush-code-models-cmd][@ref-crush-code-grok-models-cmd]。

**模型存在性与可用性的判定**跨三份目录：`GetModel(provider, model)` 依次查 API-key 的 `models`、`chatgpt_models`、`grok_models`；`IsModelAvailable` 同样三份都查，只额外拒绝被 `disable` 的 provider [@ref-crush-code-get-model][@ref-crush-code-model-availability]。选中模型的实际解析（构建大/小模型）改用 `GetModel`，因此只被订阅目录公布、Catwalk 目录里没有的模型不再被当成“找不到模型” [@ref-crush-code-agent-model-resolve]。固定 commit 之前，订阅目录里的模型在可用性判定与选中模型解析中是不可见的。

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

**订阅认证下的小模型默认值**：为 provider 挑默认小模型时，订阅认证的 provider 必须从订阅目录里挑，否则会挑到订阅并不提供的模型。OpenAI 走 ChatGPT 目录，xAI 走 Grok 目录，两条分支共用同一段“挑不到就退回大模型”的兜底 [@ref-crush-code-subscription-small-model]。Grok 目录的挑选规则是先找 id 里含 `fast` 或 `mini` 的条目，都没有就取目录最后一项（目录按重模型在前排序），目录为空则返回空 [@ref-crush-code-grok-small-model]。

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

订阅目录的排障路径 [@ref-crush-code-grok-store-lazy][@ref-crush-code-load-subscription-refetch][@ref-crush-code-agent-model-refetch]：

- **登录后目录为空**：登录时的拉取失败、或凭据早于该功能，都会留下“已登录但没有目录”的状态。更新模型时会惰性补一次（ChatGPT 与 Grok 各一次），已有目录则直接跳过，因此可以对这条路径反复调用。
- **启动时刷新**：当本轮启动刷新过 Catwalk 目录时，也会顺带在 30 秒上下文里刷新 ChatGPT 与 Grok 两份订阅目录（订阅目录本来只在登录时取一次，否则会随发行版冻结）。两次拉取都是 best effort：失败只记 warning，保留配置里已有的目录。
- **令牌过期**：拉目录前若 `IsExpired()` 会先刷新；刷新失败也继续用旧令牌请求，失败后同样只是 warning。
- **清理凭据**：`crush logout grok` 是把 OAuth 令牌、订阅目录与 API key 一起清掉的官方入口。

缺口：没有“测试这个 provider 是否能通”的 CLI 子命令（`crush models` 只反映配置），也没有把凭据解析失败与网络失败区分开的统一诊断输出；prompt 与响应内容都不打日志。[@ref-crush-code-models-cmd][@ref-crush-code-provider-struct]
