---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-custom_providers-v1
harness_id: prime-agent
topic: custom_providers
title: "Prime Agent CLI 的自定义 Provider：models.json 与 registerProvider"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-prime-agent-models-minimal, ref-prime-agent-cprovider-register, ref-prime-agent-cprovider-override, ref-prime-agent-usage-modelopts, ref-prime-agent-cprovider-configref, ref-prime-agent-mr-provider-schema, ref-prime-agent-mr-register, ref-prime-agent-mr-validateprovider]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-prime-agent-providers-order, ref-prime-agent-providers-keyres, ref-prime-agent-providers-authfile, ref-prime-agent-rcv-cmd, ref-prime-agent-rcv-resolve, ref-prime-agent-models-value, ref-prime-agent-models-headers, ref-prime-agent-cprovider-oauth, ref-prime-agent-cprovider-oauthcallbacks, ref-prime-agent-providers-env, ref-prime-agent-cprovider-authheader, ref-prime-agent-providers-prime]
  - section_id: providers-protocol-models
    surface_ids: [cli]
    source_refs: [ref-prime-agent-cprovider-apis, ref-prime-agent-models-apis, ref-prime-agent-ai-api-types, ref-prime-agent-ai-api-registry, ref-prime-agent-ai-stream-dispatch, ref-prime-agent-mr-validateprovider, ref-prime-agent-mr-model-schema, ref-prime-agent-mr-defaults, ref-prime-agent-models-model, ref-prime-agent-cprovider-modelref, ref-prime-agent-models-override, ref-prime-agent-models-permodel, ref-prime-agent-mr-override, ref-prime-agent-cprovider-register, ref-prime-agent-models-thinking]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-prime-agent-models-openai, ref-prime-agent-models-anthropic, ref-prime-agent-cprovider-configref, ref-prime-agent-models-model, ref-prime-agent-models-value, ref-prime-agent-cprovider-stream, ref-prime-agent-cprovider-testing, ref-prime-agent-settings-retry, ref-prime-agent-settings-waits, ref-prime-agent-retry-policy, ref-prime-agent-retry-defaults, ref-prime-agent-ext-agent-events]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-mr-load, ref-prime-agent-mr-validate, ref-prime-agent-usage-modelopts, ref-prime-agent-models-value, ref-prime-agent-sdk-model, ref-prime-agent-ext-agent-events, ref-prime-agent-settings-retry, ref-prime-agent-cprovider-oauthcallbacks, ref-prime-agent-mr-override]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-prime-agent-models-minimal, ref-prime-agent-cprovider-register, ref-prime-agent-cprovider-override, ref-prime-agent-usage-modelopts, ref-prime-agent-mr-register]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-prime-agent-providers-order, ref-prime-agent-providers-keyres, ref-prime-agent-providers-authfile, ref-prime-agent-rcv-cmd, ref-prime-agent-models-value, ref-prime-agent-cprovider-oauth, ref-prime-agent-cprovider-authheader, ref-prime-agent-providers-prime]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-prime-agent-cprovider-apis, ref-prime-agent-models-apis, ref-prime-agent-ai-api-registry, ref-prime-agent-ai-stream-dispatch, ref-prime-agent-mr-validateprovider]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-prime-agent-mr-model-schema, ref-prime-agent-mr-defaults, ref-prime-agent-models-model, ref-prime-agent-models-override, ref-prime-agent-models-permodel, ref-prime-agent-mr-override]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: answered
        source_refs: [ref-prime-agent-models-thinking, ref-prime-agent-mr-defaults, ref-prime-agent-cprovider-modelref]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: answered
        source_refs: [ref-prime-agent-models-openai, ref-prime-agent-models-anthropic, ref-prime-agent-models-value, ref-prime-agent-ext-agent-events]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: answered
        source_refs: [ref-prime-agent-cprovider-stream, ref-prime-agent-cprovider-testing, ref-prime-agent-settings-retry, ref-prime-agent-settings-waits, ref-prime-agent-retry-defaults]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-prime-agent-mr-load, ref-prime-agent-mr-validate, ref-prime-agent-usage-modelopts, ref-prime-agent-models-value, ref-prime-agent-ext-agent-events]
---

## 定义入口与作用域 {#providers-entry}

自定义 provider 有两条第一方入口，作用域不同[@ref-prime-agent-models-minimal][@ref-prime-agent-cprovider-register][@ref-prime-agent-cprovider-override]：

1. **声明式文件** `~/.prime/agent/models.json`——默认路径是 `join(getAgentDir(), "models.json")`，适合同一个模型目录反复使用；每次打开 `/model` 都会重新读取该文件，因此编辑后无需重启；
2. **扩展 API** `pi.registerProvider(name, config)` 与 `pi.unregisterProvider(name)`——适合需要自定义 API 实现或 OAuth 的接入；扩展工厂里发起的注册在启动阶段排队，等第一次 `bindCore()` 后立即生效，**初始加载阶段之后**再调用也立即生效，不需要 `/reload`。

`settings.json` 里**没有** provider 或自定义模型键：模型清单只有 `models.json` 与扩展两条路径；`--provider`、`--model`、`--api-key` 只是运行期选择与覆盖。[@ref-prime-agent-usage-modelopts]

最小可用写法（Ollama 类本地服务，来自官方《Minimal Example》）[@ref-prime-agent-models-minimal]：

```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434/v1",
      "api": "openai-completions",
      "apiKey": "ollama",
      "models": [
        { "id": "llama3.1:8b" },
        { "id": "qwen2.5-coder:7b" }
      ]
    }
  }
}
```

字段对照[@ref-prime-agent-cprovider-configref][@ref-prime-agent-mr-provider-schema][@ref-prime-agent-mr-register]：

| 字段 | 说明 |
| :-- | :-- |
| `name` | UI（如 `/login`）里显示的名字 |
| `baseUrl` | API 端点；定义 `models` 时必填 |
| `apiKey` | 密钥或环境变量名；定义 `models` 时必填（除非用 `oauth`） |
| `api` | 流式实现类型；自定义 provider 必须在 provider 或 model 级给出 |
| `streamSimple` | 非标准 API 的自定义流式实现 |
| `headers` | 附加请求头，值可以是环境变量名 |
| `authHeader` | 为 `true` 时自动加 `Authorization: Bearer` 头 |
| `models` | 模型数组；给出时**替换**该 provider 的全部现有模型 |
| `oauth` | 供 `/login` 使用的 OAuth provider 定义 |
| `compat` | 兼容开关（`models.json` 的 provider 级 schema 提供；与模型级合并） |
| `modelOverrides` | 仅 `models.json` 支持：对内置模型做逐项覆盖，扩展 API 没有该字段 |

注册校验：模型级必须有 `api`（provider 级可代填），provider 级必须能给出 `baseUrl` 与 `apiKey`/`oauth`，否则注册被拒。[@ref-prime-agent-mr-validateprovider]

## 凭据、环境变量与 base URL {#providers-auth}

普通 provider 的密钥解析顺序是：命令行 `--api-key` → `auth.json` 条目 → 环境变量 → `models.json` 里的自定义键；Prime Inference 的顺序是 `--api-key` → `PRIME_API_KEY` → `auth.json` → `models.json`。[@ref-prime-agent-providers-order]

`auth.json` 位于 `~/.prime/agent/auth.json`（0600 权限），条目形如 `{"type": "api_key", "key": ...}` 或 OAuth 记录；`key` 支持三种写法[@ref-prime-agent-providers-keyres][@ref-prime-agent-providers-authfile][@ref-prime-agent-rcv-cmd][@ref-prime-agent-rcv-resolve]：

```json
{
  "anthropic": { "type": "api_key", "key": "!op read 'op://vault/anthropic/credential'" },
  "openai": { "type": "api_key", "key": "OPENAI_API_KEY" },
  "deepseek": { "type": "api_key", "key": "sk-example-literal" }
}
```

- `"!command"` 执行命令并取 stdout；`models.json` 里的 shell 命令在**请求时**解析，产品不追加 TTL、陈旧复用或恢复逻辑，需要缓存的场景由用户脚本自己实现；
- 环境变量名：取同名环境变量的值；
- 字面量：直接使用。

`models.json` 的 `apiKey` 与 `headers` 支持同样三种格式，`/model` 的可用性检查只看认证是否存在、**不执行** shell 命令。[@ref-prime-agent-models-value][@ref-prime-agent-models-headers]

OAuth 通过扩展注册：`oauth` 块给出 `name`、`login(callbacks)`、`refreshToken(credentials)`、`getApiKey(credentials)` 与可选的 `modifyModels(models, credentials)`；`callbacks` 提供浏览器跳转、设备码、手工输入三种方式；凭据以 `{refresh, access, expires}` 形式持久化到 `auth.json`，之后用户用 `/login NAME` 登录。[@ref-prime-agent-cprovider-oauth][@ref-prime-agent-cprovider-oauthcallbacks]

环境变量与 `auth.json` 键的完整对应表由官方 `providers.md` 维护（Anthropic → `ANTHROPIC_API_KEY`/`anthropic`，OpenAI → `OPENAI_API_KEY`/`openai`，Prime Inference → `PRIME_API_KEY`/`prime-inference` 等）；`authHeader: true` 用于不标准但要求 `Authorization: Bearer` 的接口。[@ref-prime-agent-providers-env][@ref-prime-agent-cprovider-authheader]

Prime Inference 走生产 OpenAI 兼容端点，`PRIME_API_KEY` 优先于已保存的密钥；Agent 的登录、团队选择与登出只影响 Agent 自己的快照，不改动 Prime CLI 配置。[@ref-prime-agent-providers-prime]

## 请求协议、模型与能力表达 {#providers-protocol-models}

`api` 取值即使用的流式实现（官方表）[@ref-prime-agent-cprovider-apis][@ref-prime-agent-models-apis][@ref-prime-agent-ai-api-types]：

| `api` | 适用 |
| :-- | :-- |
| `anthropic-messages` | Anthropic Claude 及兼容接口 |
| `openai-completions` | OpenAI Chat Completions 及兼容接口 |
| `openai-responses` / `azure-openai-responses` / `openai-codex-responses` | OpenAI 与 Azure / Codex 的 Responses 形态 |
| `mistral-conversations` | Mistral Conversations |
| `google-generative-ai` / `google-vertex` | Google Generative AI 与 Vertex |
| `bedrock-converse-stream` | Amazon Bedrock Converse |

`models.json` 只列上述四类中的兼容子集（`openai-completions`、`openai-responses`、`anthropic-messages`、`google-generative-ai`）。注册表按 `api` 字符串索引，派发时找不到实现会在运行期报 `No API provider registered for api: ...`；任意自定义字符串**只有同时提供 `streamSimple`** 才被接受。[@ref-prime-agent-ai-api-registry][@ref-prime-agent-ai-stream-dispatch][@ref-prime-agent-mr-validateprovider]

模型字段与默认值[@ref-prime-agent-mr-model-schema][@ref-prime-agent-mr-defaults][@ref-prime-agent-models-model][@ref-prime-agent-cprovider-modelref]：

| 字段 | 必填 | 默认 | 说明 |
| :-- | :-- | :-- | :-- |
| `id` | 是 | — | 传给 API 的模型标识 |
| `name` | 否 | `id` | 展示名，也参与 `--model` 模式匹配 |
| `api` | 否 | provider 的 `api` | 单模型覆盖 |
| `reasoning` | 否 | `false` | 是否支持扩展思考 |
| `thinkingLevelMap` | 否 | 省略 | 把产品思考级别映射到 provider 取值，`null` 表示该级别不支持 |
| `input` | 否 | `["text"]` | 可为 `["text", "image"]` |
| `contextWindow` | 否 | `128000` | 上下文窗口 |
| `maxTokens` | 否 | `16384` | 最大输出 |
| `cost` | 否 | 全 0 | 每百万 token 的 `input`/`output`/`cacheRead`/`cacheWrite` |
| `headers`、`compat` | 否 | — | 单模型请求头与兼容覆盖 |

与内置 provider 的合并语义（`models.json`）[@ref-prime-agent-models-override][@ref-prime-agent-models-permodel]：只写 `baseUrl` 时内置模型全部保留并改走新端点；写 `models` 时内置模型保留、自定义模型按 `id` upsert——同 `id` 的替换内置条目，新 `id` 追加；`modelOverrides` 用于只改内置模型的若干字段（`name`、`reasoning`、`input`、`cost`、`contextWindow`、`maxTokens`、`headers`、`compat`），未知模型 id 被忽略。扩展 API 的语义不同：给出 `models` 会**替换**该 provider 的全部模型。[@ref-prime-agent-mr-override][@ref-prime-agent-cprovider-register]

`thinkingLevelMap` 的键是产品的七个级别（`off`、`minimal`、`low`、`medium`、`high`、`xhigh`、`max`），值是三态：省略=支持并用 provider 默认映射，字符串=支持并发送该值，`null`=不支持并在 UI 隐藏/跳过/钳制。旧配置的 `compat.reasoningEffortMap` 应迁移到模型级 `thinkingLevelMap`。[@ref-prime-agent-models-thinking]

## 参数转发、流式协议与错误处理 {#providers-forwarding-responses}

- **转发到请求**：provider 级 `compat` 给该 provider 下所有模型设默认值，模型级 `compat` 覆盖之；自定义 `headers` 与 `authHeader` 直接进请求；`openRouterRouting`、`vercelGatewayRouting` 对象原样进入对应网关的请求字段，用于 provider 选择（`only`/`order`/`ignore`/`quantizations` 等）。Anthropic 兼容侧 `supportsEagerToolInputStreaming: false` 会去掉逐工具的 `eager_input_streaming` 并改用旧的 fine-grained streaming beta 头。[@ref-prime-agent-models-openai][@ref-prime-agent-models-anthropic][@ref-prime-agent-cprovider-configref]
- **只看界面或路由的字段**：`name`、`cost`、`contextWindow`、`maxTokens` 参与展示、匹配与用量核算；`modelOverrides` 只作用于内置模型条目。`headers`/`apiKey` 的 shell 命令在请求时才解析，`/model` 检查不执行。[@ref-prime-agent-models-model][@ref-prime-agent-models-value]
- **自定义流式实现**：`streamSimple` 必须返回事件流，按 `start` → 内容事件（`text_start`/`text_delta`/`text_end`、`thinking_*`、`toolcall_start`/`toolcall_delta`/`toolcall_end`）→ `done` 或 `error` 的顺序推送；文本块直接累加，工具调用需累积 JSON 片段并解析；用量写回 `output.usage` 后调用 `calculateCost(model, output.usage)`；异步块内捕获异常时置 `stopReason` 为 `aborted`/`error` 并推 `error` 事件。官方建议先照抄 `packages/ai/src/providers/` 下的实现，并用 `packages/ai/test/` 的测试集（`stream`、`tokens`、`abort`、`empty`、`context-overflow` 等）验证。[@ref-prime-agent-cprovider-stream][@ref-prime-agent-cprovider-testing]
- **重试与错误**：provider SDK 层不发重试，应用层策略由设置驱动——`retry.enabled`（默认 `true`）、`retry.maxRetries`（默认 3）、`retry.baseDelayMs`（默认 2000）、`retry.provider.maxRetryDelayMs`（默认 60000，`0` 关闭上限）、`retry.provider.timeoutMs`；配额耗尽时进入 `retry.provider.waitForUsage` 有界等待循环（默认 1s 起倍增、单次上限 5 分钟、最多 30 次/15 分钟），provider 给出重置时间就直接排到那时；`providerBackupModel` 可把失败的轮次切到备用模型，下一次再探测主模型。[@ref-prime-agent-settings-retry][@ref-prime-agent-settings-waits][@ref-prime-agent-retry-policy][@ref-prime-agent-retry-defaults]
- **请求载荷检查**：扩展可以订阅 `before_provider_request`（可检查或整体替换载荷）与 `after_provider_response`（流尚未消费时拿到状态码与响应头），用于代理与私有后端的排障。[@ref-prime-agent-ext-agent-events]

## 诊断 {#providers-diagnostics}

- **配置可读**：`models.json` 由类型 schema 校验，非法结构会留下可读取的错误信息，并在交互模式里以 `models.json error: ...` 形式显示；文件在每次打开 `/model` 时重新读取。[@ref-prime-agent-mr-load][@ref-prime-agent-mr-validate]
- **模型可选**：`prime-agent model list [search]` 列出模型；`/model` 与 `model list` 都按模型 `id` 列出条目，配置的 `name` 用于匹配与详情显示。可用性判定基于已配置认证，不执行 shell 命令。[@ref-prime-agent-usage-modelopts][@ref-prime-agent-models-value][@ref-prime-agent-sdk-model]
- **请求已发送 / 后端可用**：用 `before_provider_request` 与 `after_provider_response` 两个事件观察实际载荷与响应头；provider 流失败会被分类记录，模型不可用或鉴权失败会在会话里以错误呈现。[@ref-prime-agent-ext-agent-events][@ref-prime-agent-settings-retry]
- **登录类 provider**：`/login` 选择 provider 后，浏览器、设备码或手工输入三种路径都由 OAuth 回调界面完成；失败的 provider 注册会在启动诊断里报告。[@ref-prime-agent-cprovider-oauthcallbacks]

**缺口**：固定来源没有给出 `models.json` 中 provider 级 `compat` 与模型级 `compat` 冲突时的逐字段优先级表，也没有说明 `/model` 面板中“不可用”状态的具体渲染；这些点在实现里可读但未被文档固定，保持未验证。[@ref-prime-agent-mr-override]
