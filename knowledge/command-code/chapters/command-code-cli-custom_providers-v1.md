---
schema_version: 3
record_kind: production
edition_id: command-code-cli-custom_providers-v1
harness_id: command-code
topic: custom_providers
title: "Command Code CLI 的自定义 Provider：BYOK 配置、wire 选择、模型元数据与诊断"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-cc-byok-add, ref-cc-byok-schema, ref-cc-settings-other, ref-cc-byok-faq]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-cc-byok-providerfields, ref-cc-byok-faq, ref-cc-security-apikey]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-cc-byok-providerfields, ref-cc-byok-modelfields, ref-cc-provider-endpoints]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-cc-byok-modelfields, ref-cc-byok-manage, ref-cc-byok-add]
  - section_id: providers-requests
    surface_ids: [cli]
    source_refs: [ref-cc-byok-modelfields, ref-cc-byok-schema, ref-cc-provider-streaming, ref-cc-provider-models, ref-cc-provider-errors, ref-cc-provider-zdr]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-byok-invalid, ref-cc-byok-manage, ref-cc-byok-local, ref-cc-cli-flags, ref-cc-byok-faq]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-cc-byok-add, ref-cc-byok-schema, ref-cc-settings-other, ref-cc-byok-faq]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-cc-byok-providerfields, ref-cc-security-apikey, ref-cc-byok-faq]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-cc-byok-providerfields, ref-cc-byok-modelfields, ref-cc-provider-endpoints]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-cc-byok-modelfields, ref-cc-byok-manage, ref-cc-byok-add]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-cc-byok-modelfields]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-requests
        status: answered
        source_refs: [ref-cc-byok-modelfields, ref-cc-byok-schema]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-requests
        status: partial
        source_refs: [ref-cc-provider-streaming, ref-cc-provider-errors, ref-cc-provider-models, ref-cc-provider-zdr]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-cc-byok-invalid, ref-cc-byok-manage, ref-cc-byok-local, ref-cc-cli-flags]
---

本章的固定来源是 Command Code 官方文档站的页面快照（`/docs/byok`、`/docs/provider`、`/docs/settings`、`/docs/resources/security`、`/docs/reference/cli`），抓取于 2026-10-01（各 snapshot 的 `source_fetched_at` 记录 UTC 时间戳 2026-09-30T17:08Z）；文档站只提供 HTML，引用按文档小节标题定位、摘录取自页面正文。Command Code 闭源，整章为来源级知识；BYOK 页自身标注为 Beta。

“自定义 Provider”在 Command Code 里有两个方向：**BYOK**（把第三方 OpenAI 兼容或 Anthropic 端点接进 CLI）与 **Provider API**（用 OpenAI/Anthropic 兼容客户端调用 Command Code 的模型）。CLI 侧的配置事实源是用户级文件 `~/.commandcode/providers.json`，文档明确 BYOK provider **只能在用户级配置，项目/仓库不能定义自己的 provider**。

## 入口、文件与作用域 {#providers-entry}

- **作用域限制**：BYOK provider 只在用户级配置，配置文件固定在 `~/.commandcode/providers.json`，**项目或仓库不能定义自己的 provider**。[@ref-cc-byok-faq]
- **交互入口**：会话里的 `/connect`，其中 “(BYOK) Add your own provider” 是自定义入口；`/connect` 内置 150+ 已知 provider，端点、wire 与当前模型列表会预填。[@ref-cc-byok-add]
- **配置文件**：`~/.commandcode/providers.json`，属于用户可编辑文件；文档写明“changes apply live（重开 `/connect` 或 `/model` 生效）”。[@ref-cc-byok-schema]
- **相邻文件**：`~/.commandcode/auth.json`（登录、订阅 token 与 `/connect` 里粘贴的自定义 provider key，写入权限 `0600`，由 `/login`、`/logout`、`/connect` 管理）。[@ref-cc-settings-other]

文件顶层是 `provider` 对象，键是 provider id；官方给的最小完整示例：[@ref-cc-byok-schema]

```json
// ~/.commandcode/providers.json
{
  "provider": {
    "novita": {
      "name": "Novita",
      "baseURL": "https://api.novita.ai/v3/openai",
      "apiKey": "$NOVITA_API_KEY",
      "models": {
        "qwen/qwen3.6-27b": {
          "name": "Qwen 3.6 27B",
          "contextWindow": 131072,
          "maxOutput": 16384,
          "reasoningEfforts": ["low", "high"],
          "cost": { "input": 0.4, "output": 1.6 },
          "options": { "temperature": 0.6 }
        }
      }
    },
    "ollama": { "baseURL": "http://localhost:11434/v1", "apiKey": false, "models": { "llama3.3:70b": {} } }
  }
}
```

## 凭据、环境变量与 base URL {#providers-auth}

`apiKey` **只写引用，不写密钥本身**：`"$VAR"` 与 `"{env:VAR}"` 读取环境变量，`"!command"` 执行命令并取其输出，`false` 表示无密钥端点（不发送 auth header）。直接粘贴原始密钥会在解析时被拒绝并给警告（provider 保留，只有该 key 被忽略）。每次请求都以 `User-Agent: command-code/` 加版本号 标识自身，除非在 `headers` 里声明了自己的 `User-Agent`。[@ref-cc-byok-providerfields]

通过 `/connect` 粘贴的密钥存在 `~/.commandcode/auth.json`（写入 `0600`），按 provider id 存放，与 Command Code 登录/订阅 token 并列；**存储的 key 优先于文件里的引用**；登出 Command Code 只会清掉账号字段，provider key 保留，可在 `/connect` 里按 `r` 替换。[@ref-cc-byok-faq] 凭据全部留在本机 `auth.json`，从不发给第三方。[@ref-cc-security-apikey]

`baseURL` 必填（缺失或非法 URL 会跳过该 provider，也可从 `options.baseURL` 读取，顶层优先）；Anthropic 根在 wire 上缺 `/v1` 时会补上，粘贴带路由后缀（如 `…/v1/chat/completions`）的 URL 会被自动裁剪到根并给出说明。`headers` 只接受字符串值，出现一个非字符串值会整对象丢弃并给警告。[@ref-cc-byok-providerfields]

## 协议与端点形态 {#providers-protocol}

`api` 字段选择 wire：`openai-completions`（默认，POST 到 `/chat/completions`，覆盖 Ollama、vLLM、LM Studio 与多数托管 API）、`openai-responses`（POST 到 `{baseURL}/responses`）、`anthropic-messages`（Claude Messages API）。任何其它值会跳过该 provider。`npm` 字段是兼容层：`@ai-sdk/openai-compatible` 与 `@ai-sdk/openai` 映射到 `openai-completions`，`@ai-sdk/anthropic` 映射到 `anthropic-messages`，其它包给警告并按 `openai-completions` 处理；`api` 一旦设置，`npm` 被忽略。[@ref-cc-byok-providerfields]

`api` 与 `baseURL` 都能在**模型级覆写**，默认继承 provider：同一个网关可以让部分模型走 Chat Completions、部分走 Responses API、部分走 Anthropic wire；非法的模型级值只跳过该模型，兄弟模型不受影响。[@ref-cc-byok-modelfields]

反向的 Provider API 用的是 Command Code 自己的端点，形态与上面一一对应，可用于对照理解 wire：`https://api.commandcode.ai/provider/v1/chat/completions`（OpenAI Chat Completions）、`/provider/v1/responses`（OpenAI Responses）、`/provider/v1/messages`（Anthropic Messages）、`/provider/v1/models`（GET 模型列表）、`/provider/v1/systemone`（决策模型）。[@ref-cc-provider-endpoints]

## 模型声明与能力元数据 {#providers-models}

`models` 必需，每个 id 用 `{}` 即可；零个合法模型会跳过该 provider。模型级字段全部可选（官方建议至少写 `contextWindow`）：[@ref-cc-byok-modelfields]

| 字段 | 值 | 说明 |
| :-- | :-- | :-- |
| `name` | string | `/model` 里的显示名 |
| `contextWindow` | number > 0 | token 数；兼容别名 `limit.context`（同时存在时 `contextWindow` 胜出）；默认 200K |
| `maxOutput` | number > 0 | token 数；兼容别名 `limit.output` |
| `reasoning` | boolean | `true` 视为支持 `low`/`medium`/`high`；`false` 声明不支持 |
| `reasoningEfforts` | string[] | 精确集合：`low`、`medium`、`high`、`xhigh`、`max`；未知级别丢弃并给警告 |
| `cost` | object | 每 1M token 的 `input`/`output`/`cacheRead`/`cacheWrite`（也接受 snake_case） |
| `options` | object | 合并进该模型每次调用的请求体参数（`temperature`、`top_p` 等） |
| `api` / `baseURL` | string | 模型级 wire / 端点覆写 |

模型发现：`/connect` 的添加流程会先问端点自己的 `/models` 列表，若为空可以手输 id，或改 `providers.json` 加模型；“Update models”（`u`）会先查注册表、再回落端点的 `/models`，然后更新该 provider 的模型，key 引用、headers 与 wire 不动。已知 provider 的 reasoning efforts 会自动探测；没有自动补上的需要用户手动写在 `reasoningEfforts` 里。[@ref-cc-byok-add][@ref-cc-byok-manage][@ref-cc-byok-modelfields]

## 请求参数映射与响应处理 {#providers-requests}

- **请求参数**：模型级 `options` 会被合并进该模型的每一次请求体（如 `temperature`、`top_p`）；`headers` 是 provider 级额外请求头（仅字符串值）；`baseURL`/`api` 决定请求实际发到哪个根与 wire。文档没有给出“哪些字段只影响界面/路由”的清单，也没有说明 `options` 与客户端内置参数的合并优先级。[@ref-cc-byok-modelfields][@ref-cc-byok-schema]
- **流式**：Provider API 三个端点都支持 `stream: true`，且**每个端点在流末尾都发出 token usage**：Chat Completions 客户端看到最后一个 `usage` chunk，Responses 客户端在终止事件 `response.completed` 上拿到，Anthropic 客户端在 `message_delta` 事件里拿到，无需 opt-in。[@ref-cc-provider-streaming]
- **端点选择约束**：open 模型与 OpenAI 模型在 `/v1/chat/completions` 上回答，多数也在 `/v1/responses` 上；Claude 模型只走 `/v1/messages`；模型列表里每个模型带 `supported_endpoints` 字段说明它由哪些路由服务。发错路由会得到 400。[@ref-cc-provider-models]
- **错误**：OpenAI 客户端看到标准错误信封 `{"error": {"message","type","code","param"}}`（类型有 `invalid_request_error`、`authentication_error`、`permission_error`、`rate_limit_error`、`server_error`），Anthropic 客户端看到 `{"type":"error","error":{...}}`；`429 rate_limit_error` 的官方建议是“Retry with backoff”。[@ref-cc-provider-errors]
- **ZDR 交互**：`x-cmd-zdr: 1`（等价于 CLI 的 `CMD_ZDR=1`）要求只走支持零数据保留的上游；没有 ZDR 上游的模型返回 `422 cmd_zdr_no_providers` 而**不会回落到非 ZDR provider**。决策模型 `typesafe/jev` 没有 ZDR 上游，带该 header 会被同样拒绝。[@ref-cc-provider-zdr]

**缺口（`providers.responses`）**：文档给出了 Provider API 侧的流式 usage、错误信封与 422/429 语义，但没有说明 BYOK 客户端自身在请求失败时的重试策略（次数、退避）、超时、以及流式中断后的恢复行为。这些保持未验证。[@ref-cc-provider-errors][@ref-cc-provider-streaming]

## 诊断与本地化运行 {#providers-diagnostics}

- **坏条目不连坐**：格式错误的条目只跳过自己并给出具体警告，显示在 `/connect` 列表下方与 `--list-models` 上，例如 `provider.work-llm: no baseURL configured — provider skipped`；不可读或无法解析的文件给出 `providers config …: invalid JSON (details redacted)` 警告，本次运行里 provider 全部消失而不是崩溃。`/connect` 的写入器不碰解析不了的文件：对坏 JSON 做添加、刷新模型或删除会拒绝且不写盘。[@ref-cc-byok-invalid]
- **provider 卡片**：在 `/connect` 选中自定义 provider 会打开卡片，显示端点、声明的模型数（带 `config: providers.json` 链接）、key 状态与相应操作（存 key / 换 key / 清 key / 更新模型 / 删除）；key 状态分“已存 key”“文件引用”“无密钥”“尚无 key”四种，菜单行只在“需要 key”时显示 ○。[@ref-cc-byok-manage]
- **删除语义**：`d` 会从 `providers.json` 移除、清除存储的 key、其模型立刻从 `/model` 消失；若它正承载当前模型，会话切回默认模型。[@ref-cc-byok-manage]
- **只读/本地化模式**：`cmd --local-only` 或环境变量 `CMD_LOCAL_ONLY=1`，也可在 `~/.commandcode/config.json` 写 `{ "localOnly": true }`。它保证不发遥测、不做计费读取，并把后端传输换成会抛出 `LocalOnlyError` 的实现；代价是 Command Code 目录（网关）模型、`/share`、`/usage`、服务端代理的 `web_search`/`web_fetch`、`cmd taste push/pull` 与后端 agent 生成不可用，而 BYOK provider 与本地功能照常。[@ref-cc-byok-local][@ref-cc-cli-flags]
- **模型对比观察**：对一个 BYOK 会话模型，压缩/摘要、子代理、标题生成等侧任务默认都用该 BYOK 模型，不会静默回落到 Command Code。[@ref-cc-byok-faq]
