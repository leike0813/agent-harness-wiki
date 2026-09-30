---
schema_version: 3
record_kind: production
edition_id: kilo-code-cli-custom_providers-v1
harness_id: kilo-code
topic: custom_providers
title: "Kilo Code CLI — 自定义 Provider：配置入口、鉴权、协议、模型与转发"
sections:
  - section_id: custom-providers-entry
    surface_ids: [cli]
    source_refs: [ref-kilo-code-providers-general, ref-kilo-code-providers-define, ref-kilo-code-cli-key-options, ref-kilo-code-providers-src-models, ref-kilo-code-cli-env]
  - section_id: custom-providers-auth
    surface_ids: [cli]
    source_refs: [ref-kilo-code-providers-options, ref-kilo-code-cli-env, ref-kilo-code-cli-env-overrides, ref-kilo-code-runtime-provider-auth, ref-kilo-code-providers-src-auth, ref-kilo-code-runtime-auth]
  - section_id: custom-providers-protocol
    surface_ids: [cli]
    source_refs: [ref-kilo-code-providers-general, ref-kilo-code-providers-url, ref-kilo-code-providers-http-troubleshoot]
  - section_id: custom-providers-models
    surface_ids: [cli]
    source_refs: [ref-kilo-code-providers-define, ref-kilo-code-providers-fields, ref-kilo-code-providers-limits, ref-kilo-code-providers-modalities, ref-kilo-code-providers-filter, ref-kilo-code-providers-priority, ref-kilo-code-providers-detect]
  - section_id: custom-providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-kilo-code-providers-fields, ref-kilo-code-providers-limits, ref-kilo-code-providers-http-troubleshoot, ref-kilo-code-providers-options, ref-kilo-code-providers-troubleshoot]
  - section_id: custom-providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kilo-code-providers-troubleshoot, ref-kilo-code-providers-options, ref-kilo-code-runtime-provider-auth, ref-kilo-code-cli-env-overrides]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-entry
        status: answered
        source_refs: [ref-kilo-code-providers-general, ref-kilo-code-providers-define, ref-kilo-code-cli-key-options, ref-kilo-code-providers-src-models]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-auth
        status: answered
        source_refs: [ref-kilo-code-providers-options, ref-kilo-code-cli-env, ref-kilo-code-cli-env-overrides, ref-kilo-code-runtime-provider-auth, ref-kilo-code-providers-src-auth]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-protocol
        status: answered
        source_refs: [ref-kilo-code-providers-general, ref-kilo-code-providers-url, ref-kilo-code-providers-http-troubleshoot]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-models
        status: answered
        source_refs: [ref-kilo-code-providers-define, ref-kilo-code-providers-fields, ref-kilo-code-providers-priority, ref-kilo-code-providers-detect]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-models
        status: answered
        source_refs: [ref-kilo-code-providers-fields, ref-kilo-code-providers-limits, ref-kilo-code-providers-modalities]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-forwarding
        status: partial
        source_refs: [ref-kilo-code-providers-fields, ref-kilo-code-providers-limits, ref-kilo-code-providers-options]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-forwarding
        status: partial
        source_refs: [ref-kilo-code-providers-options, ref-kilo-code-providers-troubleshoot]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: custom-providers-diagnostics
        status: answered
        source_refs: [ref-kilo-code-providers-troubleshoot, ref-kilo-code-runtime-provider-auth, ref-kilo-code-cli-env-overrides]
---

## 固定来源与配置入口 {#custom-providers-entry}

本章的固定来源是官方仓库提交 `0b1e01409a2f2255eff7e1c47c6dc894eaed5288`：官方文档页 `packages/kilo-docs/pages/ai-providers/openai-compatible.md`、`packages/kilo-docs/pages/code-with-ai/agents/custom-models.md`、`packages/kilo-docs/pages/code-with-ai/platforms/cli.md`，以及 CLI 运行时源码 `packages/opencode/src/provider/`。本界面是 CLI；文档页用 `{% tab label="CLI" %}` 标出的段落才算 CLI 行为，只写在 VSCode 标签下、CLI 标签未复述的描述不写入本小节。[@ref-kilo-code-providers-general]

Provider 定义在 `kilo.json`/`kilo.jsonc` 的 `provider` 对象里，键名就是 provider ID：全局文件 `~/.config/kilo/kilo.jsonc`，项目文件 `./kilo.jsonc`。[@ref-kilo-code-providers-define] 顶层 `model` 用 `provider_id/model_id` 选择默认模型，同一份文件里 `provider.ID` 承载该 provider 的 API 密钥、Base URL 与自定义模型列表。[@ref-kilo-code-cli-key-options]

一个 CLI 自定义 provider 的最小结构（依据 openai-compatible 页的 CLI 标签）：provider 键是自选标识符，`npm` 选协议包，`models` 至少给一个模型，`options.baseURL` 指向端点，`options.apiKey` 给密钥；无不鉴权要求时可给任意非空字符串。[@ref-kilo-code-providers-general]

```jsonc
{
  "$schema": "https://app.kilo.ai/config.json",
  "provider": {
    "vllm": {
      "npm": "@ai-sdk/openai-compatible",
      "models": {
        "qwen35": {
          "name": "Qwen 3.5",
          "limit": { "context": 262144, "output": 16384 },
        },
      },
      "options": {
        "apiKey": "none",
        "baseURL": "http://my.url:8000/v1",
      },
    },
  },
}
```

第一方字段：`npm` 协议包（默认 `@ai-sdk/openai-compatible`）、`models` 模型映射、`options` provider 级选项、`env` 读取密钥的环境变量名数组，以及 `whitelist`/`blacklist` 模型过滤。[@ref-kilo-code-providers-general][@ref-kilo-code-cli-key-options]

哪些 provider 会被加载由两个顶层键控制。运行时 `ModelsDev.get` 读取 `cfg.enabled_providers` 与 `cfg.disabled_providers`：`disabled` 是拒绝集合，`enabled` 存在时只有列为允许的 provider 才通过，判定式为“（未设置 enabled 或列入 enabled）且不在 disabled 中”。[@ref-kilo-code-providers-src-models] CLI 文档把这两个键列为控制 provider 可用性的配置项。[@ref-kilo-code-cli-key-options]

作用域与信任：全局配置位于 `~/.config/kilo`，可用 `KILO_CONFIG` / `KILO_CONFIG_CONTENT` 另行传入；仓库里提交的项目级 `kilo.json` / `opencode.json` 视为不可信来源，只影响变量解析（见下一节）。[@ref-kilo-code-cli-env]

## 凭据、环境变量与鉴权记录 {#custom-providers-auth}

Provider 级 `options` 对旗下所有模型生效，字段为：`apiKey`（字符串，受信任配置中支持 `{env:VAR}` 与 `{file:...}`）、`baseURL`（覆盖 Base URL）、`timeout`（毫秒，默认 `300000`，覆盖等待响应头与首字节的两段等待，可设 `false` 关闭）、`chunkTimeout`（流式分块之间的超时毫秒数，超时则请求中止并重试）。[@ref-kilo-code-providers-options]

```jsonc
{
  "provider": {
    "openai": {
      "options": {
        "apiKey": "{env:OPENAI_API_KEY}",
        "baseURL": "https://my-proxy.example.com/v1",
      },
    },
  },
}
```

`{env:VAR}` 与 `{file:...}` **只在受信任配置中解析**：全局配置（`~/.config/kilo`）、经 `KILO_CONFIG` / `KILO_CONFIG_CONTENT` 传入的配置、组织或 MDM 托管的配置。提交进仓库的项目级 `kilo.json` / `opencode.json` 不能解析 `{env:VAR}`——引用被忽略并记录一条警告，因此在项目配置里这样写的 provider 无法完成鉴权；这样可防止恶意仓库借打开动作把凭据外泄到攻击者控制的 `baseURL`。`{file:...}` 在项目配置中仍可用，但只能引用项目根目录内的文件，越出根目录（根外绝对路径、`../` 穿越、符号链接逃逸）会被拒绝。[@ref-kilo-code-cli-env]

除 `options.apiKey` 外，provider 还可声明 `env` 数组，列出用于读取密钥的环境变量名，密钥不必写进配置文件。[@ref-kilo-code-providers-general]

CLI 支持用环境变量覆盖配置值：`KILO_PROVIDER` 覆盖当前 provider ID；对 `kilocode` provider 用 `KILOCODE_FIELD_NAME` 形态（如 `KILOCODE_MODEL` → `kilocodeModel`）；对其他 provider 用 `KILO_FIELD_NAME` 形态（如 `KILO_API_KEY` → `apiKey`）。[@ref-kilo-code-cli-env-overrides]

鉴权记录落在 `${Global.Path.data}/auth.json`，以 `0600` 写入，记录有 `api`、`oauth`、`wellknown` 三种变体；`KILO_AUTH_CONTENT` 可提供进程内的 auth JSON，另有面向多账号的 v2 鉴权存储。[@ref-kilo-code-runtime-provider-auth] 每个 provider 的登录方式按 schema 声明为 `oauth` 或 `api`（带 `label` 与可选 `prompts`），这就是交互式登录与直接填密钥两条路径。[@ref-kilo-code-providers-src-auth]

凭据边界分三层，排查改动时要分开看：本地 `kilo serve` 访问、出站 provider 鉴权、远程 MCP OAuth。它们分别由 CLI 本地服务、provider 路由/鉴权存储、MCP 运行时负责。provider 配置与 `auth.json` 记录属于“出站 provider 鉴权”这一层。[@ref-kilo-code-runtime-auth]

CLI 的凭据管理命令是 `kilo auth list` / `kilo auth login` / `kilo auth logout`（位于固定快照的 CLI 参考页），操作的就是上面这些鉴权记录；本章允许的引用只覆盖记录位置与格式，命令表面未逐条绑定引用，故该关联按记录位置为准。[@ref-kilo-code-runtime-provider-auth]

凭据示例一律写占位符，如 `{env:MY_PROVIDER_API_KEY}` 或 `apiKey: "none"`（仅限无需鉴权的本地服务），不要把真实密钥写进仓库。[@ref-kilo-code-cli-env]

## 协议与端点形态 {#custom-providers-protocol}

请求协议由 provider 的 `npm` 字段选择：`@ai-sdk/openai-compatible` 对应 OpenAI Chat Completions 兼容端点（省略时的默认值），`@ai-sdk/openai` 对应 OpenAI Responses 端点，`@ai-sdk/anthropic` 对应 Anthropic Messages 端点。[@ref-kilo-code-providers-general]

`options.baseURL` 既可以是标准 Base URL，也可以是完整端点 URL。标准形态如 `https://api.provider.com/v1`；完整形态直接给到 chat completions 路径，如 `https://api.provider.com/v1/chat/completions` 或 `https://custom-endpoint.provider.com/api/v2/models/chat`。后者用于非标准端点结构、自建网关/代理、企业或自托管部署；写完整 URL 时要确认它确实指向该 provider 的 chat completions 端点。[@ref-kilo-code-providers-url]

兼容层由所选 `npm` 包承担。有一个明确例外：Azure OpenAI GPT-5 部署必须用原生 `azure` provider，而不是通用 OpenAI 兼容 provider——后者发送 `max_tokens`，而 Azure GPT-5 期望 `max_completion_tokens`，会直接拒绝。[@ref-kilo-code-providers-http-troubleshoot]

## 自定义模型与能力元数据 {#custom-providers-models}

自定义模型写在 `provider.PROVIDER_ID.models` 下，键名即模型 ID，`model` 字段用 `provider_id/model_id` 引用它。[@ref-kilo-code-providers-define]

模型字段全部可选；若模型 ID 命中内置目录，你的值叠加在默认值之上，只需写要覆盖的部分。[@ref-kilo-code-providers-fields]

| 字段 | 类型 | 说明 |
|---|---|---|
| `name` | string | 模型选择器里的显示名 |
| `id` | string | 发给 provider 的实际模型 ID，默认取配置键 |
| `tool_call` | boolean | 是否支持工具/函数调用 |
| `reasoning` | boolean | 是否支持扩展思考 |
| `temperature` | boolean | 是否支持 temperature 参数 |
| `attachment` | boolean | 是否支持文件附件 |
| `modalities` | object | 输入/输出内容类型 `{ input, output }` |
| `limit` | object | Token 上限 `{ context, output, input? }` |
| `cost` | object | 每百万 token 价格 |
| `options` | object | 任意 provider 专属模型选项 |
| `headers` | object | 请求附带的 HTTP 头 |
| `provider` | object | 覆盖 `{ npm, api }` |
| `variants` | object | 具名变体配置 |

`id` 用于“配置键 ≠ provider 期望名”的映射：选择器里显示并使用配置键，发往 API 的是 `id`。Azure 部署名与模型键不同时就用 `id` 指定部署名。[@ref-kilo-code-providers-fields]

Token 上限 `limit` 以 token 计：`context` 是总上下文窗口（用于判断何时压缩历史），`output` 是单次最大生成量（作为 `max_tokens` 或等价参数发送，默认封顶 32000），`input` 是可选更严格的输入上限（设置后压缩按它触发）。解析顺序为：配置里的值 → 内置目录（models.dev 快照，每小时刷新）→ 回退 `0`。两个值都为 `0` 时压缩检测被跳过、输出回退到内部默认 32000（可用 `KILO_EXPERIMENTAL_OUTPUT_TOKEN_MAX` 调整）、上下文用量统计被跳过。[@ref-kilo-code-providers-limits]

`modalities` 声明模型能接收和产生的内容类型，可选；一旦给出，`input` 与 `output` 两个数组都必填，取值可为 `text`、`image`、`audio`、`video`、`pdf`。省略时命中目录用目录值，无目录匹配则回退纯文本；发送文件类附件时需同时设 `attachment: true`。[@ref-kilo-code-providers-modalities]

模型过滤用 provider 级 `whitelist`（只有列出的模型 ID 可用）与 `blacklist`（列出的一律隐藏）。[@ref-kilo-code-providers-filter]

模型的选取优先级：启动时依次取 `--model`/`-m` 命令行标志 → 配置文件的 `model` 键 → 上次会话最后使用的模型 → 按内部优先级取第一个可用模型；各处格式都是 `provider_id/model_id`。[@ref-kilo-code-providers-priority]

模型发现：文档描述的“输入 Base URL + API Key 后自动查询 `/v1/models` 并弹出可选列表”只写在 VSCode 标签下，CLI 标签要求手工在 `models` 里声明模型（自动检测失败时也允许手填 ID）。因此 CLI 侧不提供该自动探测，自定义/本地模型都靠 `models` 显式登记。[@ref-kilo-code-providers-detect]

## 参数转发、流式与错误处理 {#custom-providers-forwarding}

模型级 `options`、`headers`、`variants` 与 `provider` 会随请求下发给后端：`options` 承载任意 provider 专属参数，`headers` 附加 HTTP 头，`variants` 是具名变体，选中该变体时其字段被合并进请求，`provider` 可覆盖该模型的 `{ npm, api }`。具体字段由 provider 决定，不保证所有键都有对应转发。[@ref-kilo-code-providers-fields]

`limit.output` 会作为 `max_tokens`（或该协议的等价参数）发送；Azure GPT-5 是例外，它会拒绝 `max_tokens`，必须改用原生 `azure` provider。[@ref-kilo-code-providers-limits][@ref-kilo-code-providers-http-troubleshoot]

超时与流式行为：provider 级 `timeout` 同时覆盖“等待响应头”和“等待响应体首字节”两段；数据一旦开始到达，该超时不再适用，因此慢速流式响应不会被截断。流式内部的分块空档由 `chunkTimeout` 看护——在窗口内没有新分块就中止请求并重试，用于捕获“TCP 仍连着但 SSE 停止”的静默掉线，流式不稳的 provider 建议设 15000–30000 毫秒。[@ref-kilo-code-providers-options]

后端需满足的约定是提供所选 `npm` 协议对应的端点（默认 OpenAI Chat Completions 兼容），并返回标准的流式/工具调用应答；工具调用能力须由模型元数据 `tool_call: true` 声明，否则 Agent 不会用工具。[@ref-kilo-code-providers-fields][@ref-kilo-code-providers-troubleshoot]

哪些配置项只影响界面、哪些确实映射到请求，固定来源没有逐一列全（例如 `cost` 只影响用量展示，但完整清单缺失），故本小节按部分结论记录。[@ref-kilo-code-providers-fields]

## 诊断与排错 {#custom-providers-diagnostics}

按“配置可读 → 模型可选 → 请求发出 → 后端可用”四层排查：

1. **配置可读**：确认 provider 出现在 `provider` 下且未被 `enabled_providers` / `disabled_providers` 排除；两个键的判定见首节。[@ref-kilo-code-cli-env-overrides]
2. **模型可选**：跑 `kilo models` 列出全部可用模型，确认目标 provider 处于活动状态；模型不出现时检查凭据是否配好（API key 或本地服务在跑）、`models` 键是否与 `"model": "provider/model-key"` 一致。[@ref-kilo-code-providers-troubleshoot]
3. **请求已发出**：报 “Invalid API Key” 查密钥、报 “Model Not Found” 查模型 ID、报连接错误查 Base URL 与端点可达性。[@ref-kilo-code-providers-troubleshoot]
4. **后端实际可用**：本地模型要确认推理服务在配置 URL 上运行；流式静默中断由 `chunkTimeout` 触发重试。[@ref-kilo-code-providers-troubleshoot][@ref-kilo-code-providers-options]

鉴权侧可直接核对 `${Global.Path.data}/auth.json`（`0600`）是否存在目标 provider 的记录，或在受信环境下用 `KILO_AUTH_CONTENT` 提供进程内凭据；两者的记录结构与变体见“凭据”一节。[@ref-kilo-code-runtime-provider-auth]

切换 provider 无需改文件时可用 `KILO_PROVIDER` 覆盖当前 provider ID 来快速验证是配置问题还是后端问题。[@ref-kilo-code-cli-env-overrides]

常见误配：会话无限增长通常是 `limit.context` 为 `0`（未设置）；需要工具就设 `tool_call: true`；不确定输出上限就显式设 `limit.context` / `limit.output`。[@ref-kilo-code-providers-troubleshoot]
