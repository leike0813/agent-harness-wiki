---
schema_version: 3
record_kind: production
edition_id: autohand-cli-custom_providers-v1
harness_id: autohand
topic: custom_providers
title: "Autohand Code CLI 的 Provider 定义、模型目录与请求处理"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-autohand-config-providers, ref-autohand-docs-config-keys, ref-autohand-config-locations, ref-autohand-config-overlays, ref-autohand-config-custom-providers, ref-autohand-providers-custom]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-autohand-providers-env, ref-autohand-config-env, ref-autohand-config-custom-providers, ref-autohand-providers-custom, ref-autohand-config-providers, ref-autohand-docs-extapi-runtime]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-autohand-config-custom-providers, ref-autohand-src-custom-provider-id, ref-autohand-docs-providers-overview, ref-autohand-docs-extapi-runtime, ref-autohand-docs-config-keys]
  - section_id: providers-models-metadata
    surface_ids: [cli]
    source_refs: [ref-autohand-config-custom-providers, ref-autohand-model-catalog]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-autohand-providers-custom, ref-autohand-src-custom-provider-id, ref-autohand-providers-network, ref-autohand-providers-troubleshooting, ref-autohand-config-providers]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-config-doctor, ref-autohand-providers-switching, ref-autohand-providers-troubleshooting, ref-autohand-docs-providers-switching]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-autohand-config-providers, ref-autohand-docs-config-keys, ref-autohand-config-custom-providers, ref-autohand-providers-custom]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-autohand-providers-env, ref-autohand-config-env, ref-autohand-config-custom-providers]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-autohand-config-custom-providers, ref-autohand-docs-providers-overview, ref-autohand-docs-extapi-runtime]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models-metadata
        status: answered
        source_refs: [ref-autohand-config-custom-providers, ref-autohand-model-catalog]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models-metadata
        status: answered
        source_refs: [ref-autohand-config-custom-providers, ref-autohand-model-catalog]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-autohand-providers-custom, ref-autohand-src-custom-provider-id]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-autohand-providers-network, ref-autohand-providers-troubleshooting, ref-autohand-config-providers, ref-autohand-src-custom-provider-id]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-autohand-config-doctor, ref-autohand-providers-switching, ref-autohand-providers-troubleshooting, ref-autohand-docs-providers-switching]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的 provider 文档、配置参考与 `src/providers/` 源码，以及官方文档站 AI Model Providers 页面。固定问题只针对 `cli` 界面回答。

## Provider 定义入口与作用域 {#providers-entry}

顶层 `provider` 选择当前 provider，取值分三类：内置 provider 键（`openrouter`、`anthropic`、`openai`、`ollama`、`llamacpp`、`mlx`、`llmgateway`、`deepseek`、`bedrock`、`zai`、`sakana`、`azure`、`vertexai`、`xai`、`cerebras`、`nvidia`，以及默认隐藏的 `autohandai`）；`custom:` 前缀指向用户自定义的 OpenAI 兼容端点；`extension:` 前缀指向受信运行时扩展注册的 provider。[@ref-autohand-config-providers][@ref-autohand-docs-config-keys]

配置位置与作用域同 CLI 全局配置：用户文件 `~/.autohand/config.{json,toml,yaml,yml}`（或 `--config`、`AUTOHAND_CONFIG`），外加项目覆盖；provider 相关字段在 `settings.local.json` 中受支持，而共享的项目 `config.*` 只被读取 `hooks` 与 `mcp`，因此项目共享文件不能切换 provider。[@ref-autohand-config-locations][@ref-autohand-config-overlays]

自定义 OpenAI 兼容端点的最小定义（字段与结构取自配置文件参考）：[@ref-autohand-config-custom-providers]

```json
{
  "provider": "custom:company-gateway",
  "customProviders": {
    "company-gateway": {
      "id": "company-gateway",
      "displayName": "Company Gateway",
      "apiFormat": "openai-compatible",
      "baseUrl": "https://models.example.com/v1",
      "apiKey": "your-api-key",
      "apiKeyRequired": true,
      "model": "company-code",
      "contextWindow": 131072,
      "reasoningEffort": "high"
    }
  }
}
```

对象键与 `id` 必须一致；`disabled` 为真可在保留设置的同时隐藏该 provider。[@ref-autohand-docs-config-keys][@ref-autohand-config-custom-providers]

图形入口：TUI 里运行 `/model` 并选择 **New provider...**，依次填写显示名、base URL、是否需要 API key、模型 id，以及可选的上下文窗口与推理强度；保存前 Autohand 会经 OpenAI 兼容的 `/models` 端点校验 base URL、认证与所选模型。[@ref-autohand-providers-custom]

**未证实项**：除用户级与项目级外，未发现组织级 provider 配置入口。检查过的入口：Top-level keys 表、Provider Settings 小节、`src/providers/customProviders.ts`。

## 凭据与 base URL {#providers-auth}

- 内置 provider 的凭据写在各自配置块（`apiKey`）或从环境变量读取，例如 `OPENROUTER_API_KEY`、`OPENAI_API_KEY`、`LLM_GATEWAY_API_KEY`，以及 Azure 与 Bedrock 的专属变量（`AZURE_OPENAI_KEY`、`AZURE_TENANT_ID`、`AWS_REGION` 等）。环境变量在支持范围内优先于对应配置字段。[@ref-autohand-providers-env][@ref-autohand-config-env]
- `AUTOHAND_PROVIDER` 可为本进程强制选择 provider，覆盖全局与工作区选择；Autohand AI 另有 `AUTOHAND_AI_API_KEY`、`AUTOHAND_AI_BASE_URL`、`AUTOHAND_AI_PLAN`。[@ref-autohand-config-env]
- 自定义端点：`apiKeyRequired` 默认 `true`，为真时 `apiKey` 必填；本地或已鉴权的网关把 `apiKeyRequired` 设为 `false` 并省略 `apiKey`。[@ref-autohand-config-custom-providers][@ref-autohand-providers-custom]
- base URL：内置 provider 用 `baseUrl`（本地 provider 亦可用 `port` 作替代，`baseUrl` 优先）；自定义端点用 `baseUrl` 作为根，Autohand 在其中验证 `/models` 并调用 `/chat/completions`。[@ref-autohand-config-providers][@ref-autohand-config-custom-providers]
- 示例中凭据一律写占位值（如 `your-api-key`、`your-token`），真实密钥走本地密钥管理或环境变量；扩展 provider 的凭据也应放在用户配置或环境变量中，而不是扩展包内。[@ref-autohand-config-custom-providers][@ref-autohand-docs-extapi-runtime]

## 协议与端点形态 {#providers-protocol}

- 自定义 provider 的 `apiFormat` 目前只有 `openai-compatible` 一种取值；Autohand 用 `/models` 校验（若该端点返回模型 ID，所选模型必须在其列表内），实际补全走 `/chat/completions`。[@ref-autohand-config-custom-providers]
- `custom:` 前缀的 provider 名在内部被规范化为小写、以连字符替换非法字符的 id，再拼回固定前缀；`disabled` 为真的条目在查找时返回 `undefined`，即该 provider 不可用。[@ref-autohand-src-custom-provider-id]
- 内置 provider 走各自原生 HTTP 集成（Anthropic Messages、OpenAI、Bedrock、Vertex、Ollama、llama.cpp、MLX 等），由 `src/providers/` 下独立实现承担；官方文档站把它们归为 cloud providers 与 local providers 两类。[@ref-autohand-docs-providers-overview]
- 扩展 provider 由受信运行时扩展通过 `api.providers.register` 注册，provider id 使用 `extension:` 命名空间，设置放在 `extensionProviders` 下且必须提供非空 `model`；实现方必须满足 Autohand 的 provider 契约（接收命名的扩展设置与完整根配置），扩展未安装/未启用/未受信时该 provider 不可用。[@ref-autohand-docs-extapi-runtime][@ref-autohand-docs-config-keys]

## 模型列表、发现与能力元数据 {#providers-models-metadata}

- 活动模型：provider 块中的 `model`；自定义 provider 还可用 `models` 数组提供选择器条目，每项含 `id`、`label`，以及可选的 `contextWindow` 与 `reasoningEffort`。[@ref-autohand-config-custom-providers]
- 模型目录：CLI 自带目录，并可按层叠加更新。解析顺序（后者在前者之下）为：`~/.autohand/models.json`（或 `AUTOHAND_MODELS_CATALOG` 指定的文件）→ 上次成功下载的 `~/.autohand/model-catalog/models.json` → 随 CLI 打包的目录；条目按 provider 与模型 ID 合并，本地覆盖权威。[@ref-autohand-model-catalog]
- 远程目录形态：以 provider 为第一层键、模型 ID 为第二层键，每个模型自带 `id`、`name`、`api`、`provider`、`baseUrl`、`reasoning`、`input`、`cost`（input/output/cacheRead/cacheWrite）、`contextWindow`、`maxTokens`；发布端点为 `https://code.autohand.ai/cli/models.json`，可通过 `AUTOHAND_MODELS_URL` 改指向。[@ref-autohand-model-catalog]
- 能力元数据的生效方式：`contextWindow` 用于 token 预算、状态行、遥测与同步元数据；`reasoningEffort` 可选 `none`/`low`/`medium`/`high`/`xhigh`，并按下方映射发送；目录条目中的 `cliSupported: false` 表示该产品契约非 chat 形式，CLI 无法执行，模型仍可见但会被模型选择器、团队指派、ACP 与 RPC 发现排除。[@ref-autohand-config-custom-providers][@ref-autohand-model-catalog]

## 参数转发与响应处理 {#providers-forwarding-responses}

- 已确立的转发：自定义 provider 设了 `reasoningEffort` 时，Autohand 以 `reasoning_effort` 发送给该端点；`contextWindow` 不发给后端，只用于本地预算/展示/元数据；`apiKey` 以 Bearer 形式用于鉴权，且**不会**进入遥测与会话同步（同步只带 provider id、显示名、api format、模型 id、reasoning effort 与 context window）。[@ref-autohand-providers-custom]
- 自定义 provider 的客户端能力：源码中 `getCapabilities()` 返回 `{ nativeToolCalling: true }`。[@ref-autohand-src-custom-provider-id]
- 网络与重试：`network.maxRetries`（默认 3，上限 5）、`network.timeout`（默认 30000 ms）、`network.retryDelay`（默认 1000 ms）作用于全部云 provider，退避为 `retryDelay * 2^attempt`；Autohand AI 的请求/分钟限流会按其有界 `Retry-After` 在配置的尝试预算内重试，而长时间窗口的配额（5 小时/日/周/月）立即结束当前回合。[@ref-autohand-providers-network][@ref-autohand-providers-troubleshooting]
- Autohand AI 的补全为流式（首 token 在生成过程中出现）。[@ref-autohand-config-providers]
- **未证实项（partial）**：固定来源没有给出自定义/扩展 provider 必须实现的流式分块格式、工具调用消息格式、错误码语义或取消/超时约定；也没有列出除 `reasoning_effort` 外还有哪些客户端参数会被转发。检查过的入口：Custom OpenAI-Compatible Providers 小节、Network Configuration、`src/providers/CustomOpenAICompatibleProvider.ts`、扩展 Runtime provider 小节。

## 诊断 {#providers-diagnostics}

- 切换方式（官方文档站）：命令行用 `autohand --provider provider-id --model model-id`（例如 `--provider ollama --model codellama:13b`）；把默认写进 `~/.autohand/config.json` 的顶层 `provider` 与 `model`；会话内用 `/model 模型或 provider/模型` 即时切换，`/model bedrock` 这类形式还能交互式补齐企业 provider 的细节。[@ref-autohand-docs-providers-switching]
- 安装级检查：`autohand doctor` 一次检查运行时版本与可执行文件、配置文件与 provider（**包含自定义与扩展 provider**）、必需与可选工具、工作区、终端支持、账号状态、每个已配置 MCP server 与扩展诊断；每项标 ok/warning/failure，任一失败退出码为 1，`--json` 给结构化报告。[@ref-autohand-config-doctor]
- 会话内：`/model` 列出可用模型并可切换，`/usage` 显示计划额度与项目 token 活动，`--debug`（或 `agent.debug`）打开详细内部日志。[@ref-autohand-providers-switching][@ref-autohand-providers-troubleshooting]
- 症状定位：仓库文档把失败分为认证错误（检查 apiKey、过期、额度）、连接错误（网络、base URL、本地 server 未启动、防火墙）、模型不存在（拼写、访问权限、本地模型未下载）与限流四类，各自给出处理步骤。[@ref-autohand-providers-troubleshooting]

**未证实项**：没有 provider 级别的连通性自检子命令（如 `provider test`）；判断「请求已发送但后端不可用」只能依赖 doctor、`/usage` 与日志。检查过的入口：`autohand doctor` 说明、Troubleshooting 小节、`/model` 与 `/usage` 命令表。
