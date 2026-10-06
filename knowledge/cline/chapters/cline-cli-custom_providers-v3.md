---
schema_version: 3
record_kind: production
edition_id: cline-cli-custom_providers-v3
harness_id: cline
topic: custom_providers
title: "Cline CLI 的 Provider 配置、协议与模型元数据"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-cline-paths-settings, ref-cline-provider-stored, ref-cline-provider-settings-schema, ref-cline-provider-manager, ref-cline-provider-models-file, ref-cline-provider-runtime-config, ref-cline-sdk-providers-doc-config, ref-cline-openai-compatible-doc-general]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-cline-provider-manager, ref-cline-provider-settings-schema, ref-cline-cli-auth, ref-cline-cli-auth-save, ref-cline-provider-builtin-ids, ref-cline-provider-fields, ref-cline-openai-compatible-doc-general, ref-cline-provider-anthropic-endpoint, ref-cline-provider-anthropic-fallback-rule]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-cline-provider-protocol, ref-cline-provider-ids, ref-cline-provider-config-iface, ref-cline-provider-gateway, ref-cline-sdk-providers-doc-openai, ref-cline-openai-compatible-doc-general]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-cline-provider-settings-schema, ref-cline-provider-models-file, ref-cline-provider-model-source, ref-cline-provider-refresh, ref-cline-provider-capabilities, ref-cline-sdk-providers-doc-metadata, ref-cline-provider-max-tokens]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-cline-provider-config-iface, ref-cline-provider-gateway, ref-cline-provider-stream, ref-cline-provider-retry]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cline-provider-errors, ref-cline-openai-compatible-doc-trouble, ref-cline-provider-manager, ref-cline-provider-refresh, ref-cline-provider-capture, ref-cline-cli-doctor]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-cline-paths-settings, ref-cline-provider-stored, ref-cline-provider-models-file]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-cline-provider-settings-schema, ref-cline-cli-auth, ref-cline-provider-builtin-ids, ref-cline-provider-anthropic-endpoint, ref-cline-provider-anthropic-fallback-rule]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-cline-provider-protocol, ref-cline-provider-ids, ref-cline-provider-gateway]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-cline-provider-models-file, ref-cline-provider-model-source, ref-cline-provider-refresh]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-cline-provider-settings-schema, ref-cline-provider-capabilities, ref-cline-provider-max-tokens]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-cline-provider-config-iface, ref-cline-provider-gateway]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-cline-provider-stream, ref-cline-provider-retry]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-cline-provider-errors, ref-cline-provider-capture, ref-cline-cli-doctor]
---

## 定义位置与第一方字段 {#providers-entry}

固定来源：仓库提交 `3435f72fcf4cb843bee946b8f9e981683564c9e3` 的 `sdk/packages/shared/src/storage/paths.ts`、`sdk/packages/core/src/services/storage/provider-settings-manager.ts`、`sdk/packages/core/src/services/llms/provider-settings.ts`、`sdk/packages/core/src/services/providers/`、`sdk/packages/llms/src/providers/`、`apps/cli/src/commands/auth.ts`，以及 `docs/getting-started/config.mdx`、`docs/provider-config/`、`docs/sdk/model-providers.mdx`。官方文档站 `https://docs.cline.bot/getting-started/config.md` 的快照作佐证，软件版本未知。本版只把「Anthropic 直连的端点条件」一条事实前移到 `cd80a20e96481f5f5d413789f6847accf846487b` 的 `sdk/packages/llms/src/providers/url.ts` 与 `sdk/packages/llms/src/providers/routing/provider-option-rules.ts`，其余小节沿用同一批来源。

CLI 的 provider 状态在一个 JSON 信封里：路径是 `CLINE_PROVIDER_SETTINGS_PATH`，否则 `{数据目录}/settings/providers.json`（默认 `~/.cline/data/settings/providers.json`）。外壳形状固定为 `{ version: 1, lastUsedProvider?, modes, repairs?, providers: { 提供方 id: { settings, updatedAt, tokenSource } } }`，`tokenSource` 取 `manual | oauth | migration`。[@ref-cline-paths-settings][@ref-cline-provider-stored]

单个 provider 的 `settings` 字段集合由 `ProviderSettingsSchema` 固定：`provider`（id）、`apiKey`、`auth`、`model`、`protocol`、`client`、`routingProviderId`、`maxTokens`、`contextWindow`、`baseUrl`、`headers`、`timeout`、`reasoning`、`aws`/`gcp`/`azure`/`sap`/`oca`、`region`、`apiLine`、`capabilities`、`modelCatalog`。[@ref-cline-provider-settings-schema]

写入是整文件规范化后原子替换：先校验 schema，再写同目录临时文件并 rename，权限位 `0600`；读取时按需解析，损坏则回退到空状态。[@ref-cline-provider-manager]

用户自建的 OpenAI 兼容提供方与模型目录另存 providers.json 同目录下的 `models.json`，用 `provider` 元数据登记/覆盖自定义 provider、用 `models` 扩展已有 provider 的模型表。[@ref-cline-provider-models-file]

注意区分两条路径：SDK 嵌入方可以直接给一份 `LlmsConfig`（`providers` 数组，来自 `loadLlmsConfigFromFile` 或代码里的 `defineLlmsConfig`），那是 `docs/sdk/model-providers.mdx` 描述的方式；CLI 自己走的是上面那份 `providers.json` + `models.json`。文档站与仓库文档都用 `providerId`/`modelId`/`apiKey`/`baseUrl` 这组名字描述同一个概念。[@ref-cline-provider-runtime-config][@ref-cline-sdk-providers-doc-config]

写一个自定义 OpenAI 兼容 provider 的最小 JSON（字段取自上面的 schema；示例不含任何真实凭据）[@ref-cline-provider-settings-schema][@ref-cline-openai-compatible-doc-general]：

```json
{
  "version": 1,
  "providers": {
    "openai-compatible": {
      "updatedAt": "2026-10-01T00:00:00.000Z",
      "tokenSource": "manual",
      "settings": {
        "provider": "openai-compatible",
        "client": "openai-compatible",
        "protocol": "openai-chat",
        "baseUrl": "https://llm.example.com/v1",
        "apiKey": "{你的 token}",
        "model": "my-model-id"
      }
    }
  }
}
```

## 凭据、环境变量与 base URL {#providers-auth}

凭据落点就是设置文件里的 `apiKey` 或 `auth.accessToken`/`refreshToken`；没有系统钥匙串。写入时 `apiKey` 会被 sanitize（去空白），`auth.accessToken` 优先于 `apiKey`。[@ref-cline-provider-manager][@ref-cline-provider-settings-schema]

CLI 侧的配置入口是 `cline auth`（位置参数或 `-p/--provider` 指定 provider，`-m` 在该子命令里表示 model id）；它把 provider 与密钥写进 `providers.json`。[@ref-cline-cli-auth][@ref-cline-cli-auth-save]

环境变量回退：内置 provider 清单里带 `apiKeyEnv` 白名单（例如 cline 用 `CLINE_API_KEY`、openai 用 `OPENAI_API_KEY`、deepseek 用 `DEEPSEEK_API_KEY`），没有显式密钥时按这个列表取环境变量。[@ref-cline-provider-builtin-ids]

`baseUrl` 必填为合法 URL，`headers`/`timeout` 也在同一个 settings 对象里；CLI 的 TUI 与 `cline auth` 只展示与收集这些字段，不额外发明键。[@ref-cline-provider-settings-schema][@ref-cline-provider-fields]

`baseUrl` 不只影响请求地址：它还决定 provider 选项是否注入。Anthropic 直连的选项规则是 `provider.anthropic.direct`（`phase: "provider"`），`applies` 只看 `request.providerId === "anthropic"`，命中时一律 `suppresses: { genericFanout: true }`；`build` 再按端点分流——`baseUrl` 未设置、或其 origin 恰为 `https://api.anthropic.com` 时返回 `{ anthropic: { fallbacks: "default" } }`（Claude API 官方的服务端拒答回退），其余情况返回 `undefined`，请求体其余部分不变。官方端点由 `isOfficialAnthropicEndpoint` 判定：空值视为 provider 默认端点即官方端点，URL 解析失败按自定义处理，因此畸形 URL 不会误开官方专属选项。[@ref-cline-provider-anthropic-fallback-rule][@ref-cline-provider-anthropic-endpoint]

端点判定刻意放在 `build` 而不是 `applies`：自定义端点（企业网关、Azure AI Foundry 这类严格 schema 的代理）因此保留 fanout 抑制、但拿不到只属于 Claude API 的 `fallbacks`，避免被以 400 拒绝；这是该规则注释给出的理由，属于源码自述的意图而非运行观察。以上是固定提交源码树上的行为，未绑定任何 npm 发布版本。[@ref-cline-provider-anthropic-fallback-rule]

写示例时凭据一律占位；`docs/provider-config/openai-compatible.mdx` 的字段清单（Base URL、API Key、Model ID、可选 Azure 相关字段）与上面的 schema 对应。[@ref-cline-openai-compatible-doc-general]

## 协议、客户端与兼容层 {#providers-protocol}

`protocol` 与 `client` 是两个正交枚举：

- `protocol`：`anthropic`、`gemini`、`openai-chat`、`openai-responses`、`openai-r1`、`ai-sdk`（请求/响应形状）；
- `client`：`anthropic`、`ai-sdk`、`ai-sdk-community`、`openai`、`openai-compatible`、`openai-r1`、`gemini`、`bedrock`、`custom`、`fetch`、`vertex`（用哪条客户端实现）。

两者都可省略，由内置 provider 规格决定默认值。[@ref-cline-provider-protocol]

内置规格与 id 归一：`PROVIDER_ID_ALIASES`、`BUILT_IN_PROVIDER_IDS`、`normalizeProviderId`，以及 `builtins.ts` 里的 `BUILTIN_PROVIDER_*` 集合；用户自建 provider 走 `custom`/`openai-compatible` 这类兼容 client。[@ref-cline-provider-ids]

网关是统一入口：`ProviderConfig` 描述 `providerId`、`baseUrl`、能力与凭据，`createGateway()` 返回 `DefaultGateway`，把会话请求路由到对应协议实现。[@ref-cline-provider-config-iface][@ref-cline-provider-gateway]

「兼容层」在文档里就是 OpenAI Compatible 这一类：同一个 `baseUrl` + `apiKey` + `Model ID`，由 `openai-compatible` client 发送 OpenAI 形状请求；文档给出 v0（Vercel SDK）与直连两种配置形态。[@ref-cline-sdk-providers-doc-openai][@ref-cline-openai-compatible-doc-general]

## 模型 ID、目录、刷新与能力元数据 {#providers-models}

模型 id 有三个来源：设置里的 `model` 字段（当前选择）、`models.json` 里的用户目录（自定义 provider 的模型表，条目含 id 与元数据）、以及内置/在线目录。[@ref-cline-provider-settings-schema][@ref-cline-provider-models-file]

在线刷新：provider 条目可以带 `modelsSourceUrl`，客户端对它发 GET（5 秒超时），从响应里抽取模型 id 列表，并按 provider 的 base URL 重写相对地址；`refreshProviderModelsFromSource` 负责这条链路。[@ref-cline-provider-model-source][@ref-cline-provider-refresh]

能力元数据分两层表达：

- provider 级 `capabilities` 数组，取值限于 `reasoning`、`prompt-cache`、`streaming`、`tools`、`vision`、`computer-use`、`oauth`、`popular`；[@ref-cline-provider-settings-schema]
- 模型级信息，由 llms 包转成网关能力（`toGatewayModelCapabilities`），文档记录的 `ModelInfo` 形状包含上下文窗口、输出上限、是否支持工具/视觉等。[@ref-cline-provider-capabilities][@ref-cline-sdk-providers-doc-metadata]

请求侧的上限来自 settings 的 `maxTokens`/`contextWindow`，网关用 `resolveGatewayRequestMaxTokens` 决定单次请求的 max tokens。[@ref-cline-provider-max-tokens]

## 请求映射、流式与重试 {#providers-forwarding}

可写参数到请求的映射：`settings` 里的 `model`、`maxTokens`、`contextWindow`、`baseUrl`、`headers`、`timeout`、`reasoning` 都进入 `ProviderConfig`（字段名 `providerId`），再由网关按 protocol/client 组装；`capabilities` 只影响能力判断与界面/路由（例如是否允许 reasoning、是否支持 prompt cache），不直接变成请求字段。[@ref-cline-provider-config-iface][@ref-cline-provider-gateway]

流式：网关把后端流翻译成统一的 `ApiStream*Chunk`（文本、媒体、推理、用量、工具调用、done），因此上层不需要按 provider 分支。[@ref-cline-provider-stream]

空响应与网络抖动有专门的重试中间件：默认总尝试次数 3（首试 + 2 次重试），空响应退避 250 毫秒，网络错误退避 2000 毫秒，且会把被丢弃尝试的用量合并进最终 finish。[@ref-cline-provider-retry]

## 错误分类与诊断入口 {#providers-diagnostics}

后端约定：错误由 `classifyProviderError` 分类，`isRetryableProviderError` 决定是否可重试；没有凭据预检，后端返回的 401 才是权威信号，文档的「Troubleshooting」也是这个方向。[@ref-cline-provider-errors][@ref-cline-openai-compatible-doc-trouble]

诊断分四层，可以分别验证：

1. **配置可读**：`providers.json` 解析失败会回退为空状态，`cline auth` 与 `cline config` 展示的是解析后的结果；[@ref-cline-provider-manager]
2. **模型可选**：模型列表来自设置、`models.json` 与在线目录（`modelsSourceUrl`），刷新失败不回滚已有列表；[@ref-cline-provider-refresh]
3. **请求已发送**：设置 `CLINE_CAPTURE_PROVIDER_REQUEST`（可取 `all` 等值）后，原始请求会写到 `CLINE_CAPTURE_DIR` 或数据目录下的 `provider-request-captures/*.provider-request.json`；[@ref-cline-provider-capture]
4. **后端可用**：调用失败的分类与是否可重试由 `classifyProviderError`/`isRetryableProviderError` 给出，最终体现在会话的工具错误里。[@ref-cline-provider-errors]

CLI 里没有单独「测试 provider」的命令：`cline auth` 负责写入，`cline config` 负责展示，`cline doctor` 检查的是本地进程与 hub，不是后端连通性。[@ref-cline-cli-doctor]
