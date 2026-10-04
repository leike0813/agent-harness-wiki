---
schema_version: 3
record_kind: production
edition_id: cline-cli-custom_providers-v2
harness_id: cline
topic: custom_providers
title: "Cline CLI 的 Provider 配置、协议与模型元数据"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-cline-paths-settings, ref-cline-provider-stored, ref-cline-provider-settings-schema, ref-cline-provider-manager, ref-cline-provider-models-file, ref-cline-provider-runtime-config, ref-cline-sdk-providers-doc-config, ref-cline-openai-compatible-doc-general, ref-cline-provider-catalog-queue, ref-cline-provider-catalog-rollback, ref-cline-provider-catalog-rollback-error, ref-cline-provider-gateway-bridge]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-cline-provider-manager, ref-cline-provider-settings-schema, ref-cline-cli-auth, ref-cline-cli-auth-save, ref-cline-provider-builtin-ids, ref-cline-provider-fields, ref-cline-openai-compatible-doc-general, ref-cline-provider-local-cli-auth, ref-cline-provider-credential-refresh, ref-cline-provider-credential-discovery-optional, ref-cline-provider-model-source-auth]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-cline-provider-protocol, ref-cline-provider-ids, ref-cline-provider-config-iface, ref-cline-provider-gateway, ref-cline-sdk-providers-doc-openai, ref-cline-openai-compatible-doc-general, ref-cline-provider-gateway-registration, ref-cline-provider-gateway-bridge]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-cline-provider-settings-schema, ref-cline-provider-models-file, ref-cline-provider-model-source, ref-cline-provider-refresh, ref-cline-provider-capabilities, ref-cline-sdk-providers-doc-metadata, ref-cline-provider-max-tokens, ref-cline-provider-discovered-ids, ref-cline-provider-model-ownership, ref-cline-provider-discovery-errors, ref-cline-provider-model-cache-key, ref-cline-provider-model-cache-private, ref-cline-provider-model-cache-fingerprint, ref-cline-provider-model-cache-source, ref-cline-provider-model-source-auth, ref-cline-provider-list-auth, ref-cline-provider-id-case]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-cline-provider-config-iface, ref-cline-provider-gateway, ref-cline-provider-stream, ref-cline-provider-retry, ref-cline-provider-request-headers-session, ref-cline-provider-request-headers-task, ref-cline-provider-request-headers-codex, ref-cline-provider-request-headers-opencode]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cline-provider-errors, ref-cline-openai-compatible-doc-trouble, ref-cline-provider-manager, ref-cline-provider-refresh, ref-cline-provider-capture, ref-cline-cli-doctor, ref-cline-provider-discovery-errors, ref-cline-provider-credential-refresh, ref-cline-provider-list-auth, ref-cline-provider-changelog-fixes, ref-cline-provider-catalog-rollback]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-cline-paths-settings, ref-cline-provider-stored, ref-cline-provider-models-file, ref-cline-provider-catalog-queue, ref-cline-provider-catalog-rollback-error]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-cline-provider-settings-schema, ref-cline-cli-auth, ref-cline-provider-builtin-ids, ref-cline-provider-local-cli-auth, ref-cline-provider-credential-refresh, ref-cline-provider-credential-discovery-optional]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-cline-provider-protocol, ref-cline-provider-ids, ref-cline-provider-gateway, ref-cline-provider-gateway-registration, ref-cline-provider-gateway-bridge]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-cline-provider-models-file, ref-cline-provider-model-source, ref-cline-provider-refresh, ref-cline-provider-discovered-ids, ref-cline-provider-model-ownership, ref-cline-provider-model-source-auth, ref-cline-provider-id-case, ref-cline-provider-model-cache-private, ref-cline-provider-model-cache-source]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-cline-provider-settings-schema, ref-cline-provider-capabilities, ref-cline-provider-max-tokens, ref-cline-provider-model-ownership, ref-cline-provider-list-auth]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-cline-provider-config-iface, ref-cline-provider-gateway, ref-cline-provider-request-headers-session, ref-cline-provider-request-headers-task, ref-cline-provider-request-headers-opencode]
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
        source_refs: [ref-cline-provider-errors, ref-cline-provider-capture, ref-cline-cli-doctor, ref-cline-provider-discovery-errors, ref-cline-provider-catalog-rollback, ref-cline-provider-changelog-fixes]
---

## 定义位置与第一方字段 {#providers-entry}

固定来源：仓库提交 `39ff2359f7e08231281539696e48a166ce49270c` 的 `sdk/packages/shared/src/storage/paths.ts`、`sdk/packages/core/src/services/storage/provider-settings-manager.ts`、`sdk/packages/core/src/services/llms/provider-settings.ts`、`sdk/packages/core/src/services/providers/`、`sdk/packages/llms/src/providers/`、`apps/cli/src/commands/auth.ts`，以及 `docs/getting-started/config.mdx`、`docs/provider-config/`、`docs/sdk/model-providers.mdx`。官方文档站 `https://docs.cline.bot/getting-started/config.md` 的快照作佐证，软件版本未知。上一版固定在 `3435f72fcf4cb843bee946b8f9e981683564c9e3`；本版除下述改动外沿用同一批来源。

CLI 的 provider 状态在一个 JSON 信封里：路径是 `CLINE_PROVIDER_SETTINGS_PATH`，否则 `{数据目录}/settings/providers.json`（默认 `~/.cline/data/settings/providers.json`）。外壳形状固定为 `{ version: 1, lastUsedProvider?, modes, repairs?, providers: { 提供方 id: { settings, updatedAt, tokenSource } } }`，`tokenSource` 取 `manual | oauth | migration`。[@ref-cline-paths-settings][@ref-cline-provider-stored]

单个 provider 的 `settings` 字段集合由 `ProviderSettingsSchema` 固定：`provider`（id）、`apiKey`、`auth`、`model`、`protocol`、`client`、`routingProviderId`、`maxTokens`、`contextWindow`、`baseUrl`、`headers`、`timeout`、`reasoning`、`aws`/`gcp`/`azure`/`sap`/`oca`、`region`、`apiLine`、`capabilities`、`modelCatalog`。[@ref-cline-provider-settings-schema]

写入是整文件规范化后原子替换：先校验 schema，再写同目录临时文件并 rename，权限位 `0600`；读取时按需解析，损坏则回退到空状态。[@ref-cline-provider-manager]

用户自建的 OpenAI 兼容提供方与模型目录另存 providers.json 同目录下的 `models.json`，用 `provider` 元数据登记/覆盖自定义 provider、用 `models` 扩展已有 provider 的模型表。[@ref-cline-provider-models-file]

**一次改动跨两个文件，必须成对看待。** provider 目录的写入要同时落 `providers.json` 与 `models.json`，本提交把这条路径拆成「准备」与「落盘」两步，并给每个 models 文件一把跨 manager 实例共享的串行队列：锁的键是 models 文件的绝对路径而不是 provider id，因为按 provider 加锁仍会丢掉其它 provider 对同一目录的编辑。[@ref-cline-provider-catalog-queue]

落盘顺序是**先设置、后目录**：先 `saveProviderSettings` 写 `providers.json`，再 `writeModelsFile`。目录写失败时回滚，但只在确认磁盘上的当前条目仍等于本次写入内容（比较真正写下去的 JSON 表示，因为解析出来的对象里可能带 JSON 会省略的可选属性）时才回滚，绝不回滚别人更晚的保存或删除；回滚本身也失败时抛 `AggregateError`，把两个错误都收进 `errors` 数组，消息是 "Provider catalog persistence failed and prior settings could not be restored"，而目录写失败但回滚成功时原错误继续向上抛。[@ref-cline-provider-catalog-rollback][@ref-cline-provider-catalog-rollback-error]

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

**借本机 CLI 凭据的 provider。** 目录里可以用 `metadata.localCliCommand` 声明一个本机可执行文件（`codex`、`claude` 之类）作为凭据来源，宿主解析出的形状是 `{ command, docsUrl? }`；`ProviderAuthInfo` 把 `providerId`、`capabilities` 与这个 `localCli` 打包成可序列化的认证事实。本提交把这段解析从 `llms` 包搬到 `shared`，并且**入参从 provider id 改成 provider 描述符**——查目录是调用方的事，解析函数只负责读声明好的 CLI 元数据。provider 没声明、或声明的不是非空字符串时返回 `undefined`，包括凭据来自宿主探测不到的地方的 `local-auth` provider。[@ref-cline-provider-local-cli-auth]

**保存凭据会顺带刷新模型目录，且是尽力而为。** 凭据表单（`apiKey`/`headers`/`baseUrl` 任一变化）走的是 `saveLocalProviderSettings` 而不是 `updateLocalProvider`；如果该 provider 配了 `modelsSourceUrl`，代码会尝试重算目录，但源码注释写明：离线端点或无效密钥**不得**阻止用户保存设置。重算失败时只吞掉 `ModelDiscoveryError` 一类（其它错误照抛），对应注释就是 "Discovery is optional; persistence and validation are not."。[@ref-cline-provider-credential-refresh][@ref-cline-provider-credential-discovery-optional]

写示例时凭据一律占位；`docs/provider-config/openai-compatible.mdx` 的字段清单（Base URL、API Key、Model ID、可选 Azure 相关字段）与上面的 schema 对应。[@ref-cline-openai-compatible-doc-general]

## 协议、客户端与兼容层 {#providers-protocol}

`protocol` 与 `client` 是两个正交枚举：

- `protocol`：`anthropic`、`gemini`、`openai-chat`、`openai-responses`、`openai-r1`、`ai-sdk`（请求/响应形状）；
- `client`：`anthropic`、`ai-sdk`、`ai-sdk-community`、`openai`、`openai-compatible`、`openai-r1`、`gemini`、`bedrock`、`custom`、`fetch`、`vertex`（用哪条客户端实现）。

两者都可省略，由内置 provider 规格决定默认值。[@ref-cline-provider-protocol]

内置规格与 id 归一：`PROVIDER_ID_ALIASES`、`BUILT_IN_PROVIDER_IDS`、`normalizeProviderId`，以及 `builtins.ts` 里的 `BUILTIN_PROVIDER_*` 集合；用户自建 provider 走 `custom`/`openai-compatible` 这类兼容 client。[@ref-cline-provider-ids]

网关是统一入口：`ProviderConfig` 描述 `providerId`、`baseUrl`、能力与凭据，`createGateway()` 返回 `DefaultGateway`，把会话请求路由到对应协议实现。[@ref-cline-provider-config-iface][@ref-cline-provider-gateway]

**网关默认只认内置 provider，自定义 provider 需要显式桥接。** `resolveGatewayProviderRegistration`（及同步版 `resolveGatewayProviderRegistrationSync`）负责把目录里的 provider 翻译成网关能执行的 `GatewayProviderRegistration`：来源包括以自定义 id 路由的内置 provider、`providers.json`/`models.json` 的登记、以及宿主的 `registerProvider` 调用。网关已经认识的内置 id、以及目录里根本不存在的 id 都返回 `undefined`，此时由网关自己的解析与报错接管。[@ref-cline-provider-gateway-registration]

本提交把这一步补到了 **agent model 路径**上：`createAgentModelFromConfig` 建好网关后，会用同一个同步解析把 provider 桥接进来，源码注释说明理由是让「picker 合法提供的 id」不再以 `Unknown or disabled provider` 失败。此前只有旧的 `ApiHandler` 路径做了这件事，agent loop 这条路径没有。[@ref-cline-provider-gateway-bridge] 这条修复在 CLI 变更日志里对用户可见：「Custom providers defined in `providers.json`/`models.json` now work when you run a task.」[@ref-cline-provider-changelog-fixes]

「兼容层」在文档里就是 OpenAI Compatible 这一类：同一个 `baseUrl` + `apiKey` + `Model ID`，由 `openai-compatible` client 发送 OpenAI 形状请求；文档给出 v0（Vercel SDK）与直连两种配置形态。[@ref-cline-sdk-providers-doc-openai][@ref-cline-openai-compatible-doc-general]

## 模型 ID、目录、刷新与能力元数据 {#providers-models}

模型 id 有三个来源：设置里的 `model` 字段（当前选择）、`models.json` 里的用户目录（自定义 provider 的模型表，条目含 id 与元数据）、以及内置/在线目录。[@ref-cline-provider-settings-schema][@ref-cline-provider-models-file]

在线刷新：provider 条目可以带 `modelsSourceUrl`，客户端对它发 GET（5 秒超时），从响应里抽取模型 id 列表，并按 provider 的 base URL 重写相对地址；`refreshProviderModelsFromSource` 负责这条链路。[@ref-cline-provider-model-source][@ref-cline-provider-refresh]

**凭据只发给同源的目录。** 目录地址可以指向第三方公开清单，所以取模型列表时可带 `{ baseUrl, apiKey, headers }`，但只有当目录 URL 的 origin 与 provider `baseUrl` 的 origin 相同时才发送凭据（`Authorization: Bearer` 加自定义头）；baseUrl 非法时视为无法建立信任，但**不**因此阻止独立公开目录在无凭据的情况下加载。一旦真的附加了任何头，请求就带 `redirect: "error"`，即不跟随带凭据的重定向。[@ref-cline-provider-model-source-auth]

**发现出来的模型与手工加的模型分开记账。** 目录条目新增可选字段 `discoveredModelIds`，源码注释是「Models owned solely by discovery; all other entries are user-managed」：只有被 `modelsSourceUrl` 发现的 id 记在里面，其余条目算用户所有，刷新因此可以剪掉来源不再列出的模型而保住手工添加的。对于本提交之前写入、没有这个字段的条目，若该 provider 配了 `modelsSourceUrl`，它的全部模型按「已发现」处理，好让刷新能收敛。[@ref-cline-provider-discovered-ids]

相应地，**模型条目不再复制 provider 能力**。以前刷新会按 provider 的 `capabilities` 给每个模型写 `supportsVision`/`supportsAttachments`/`supportsReasoning`；现在 `buildProviderModels` 只持久化模型级覆盖（把已有条目摊开），源码注释说明能力在登记时继承，刷新默认值不能覆盖用户改动。[@ref-cline-provider-model-ownership]

**两类失败要分开。** `ModelDiscoveryError` 表示取目录失败，`EmptyModelCatalogError`（它的子类，消息 "at least one model is required (manual or via modelsSourceUrl)"）表示发现过程成功但来源一个模型都没列。更新路径上，来源为空时若请求本身没有显式给 `models`（即凭据保存这类路径）也算发现结果，而显式清空模型列表是校验错误。[@ref-cline-provider-discovery-errors]

还有一个容易踩的细节：更新 provider 时 id 只 `trim()`，**不再 `toLowerCase()`**。用大小写不同的 id 去更新不会命中既有条目，而是新建一个。[@ref-cline-provider-id-case]

在线模型列表有进程内缓存，缓存键是三段拼接：provider 私有键、`config.headers` 的 JSON 指纹、来源 URL。私有键本身又是 `providerId`、归一化 `baseUrl` 与**凭据指纹**三段——凭据指纹取自 `resolveAuthToken(config) ?? ""`，也就是 `apiKey` 优先、其次 `accessToken` 的 `fingerprint()` 值；这个 `fingerprint` 是一段 32 位哈希（`hash >>> 0` 后转十六进制），缓存键里留下的是哈希而不是凭据原文。换密钥、换请求头或换目录地址都会落到不同的缓存条目。[@ref-cline-provider-model-cache-private][@ref-cline-provider-model-cache-fingerprint][@ref-cline-provider-model-cache-key][@ref-cline-provider-model-cache-source]

能力元数据分两层表达：

- provider 级 `capabilities` 数组，取值限于 `reasoning`、`prompt-cache`、`streaming`、`tools`、`vision`、`computer-use`、`oauth`、`popular`；[@ref-cline-provider-settings-schema]
- 模型级信息，由 llms 包转成网关能力（`toGatewayModelCapabilities`），文档记录的 `ModelInfo` 形状包含上下文窗口、输出上限、是否支持工具/视觉等。[@ref-cline-provider-capabilities][@ref-cline-sdk-providers-doc-metadata]

列出 provider 时，代码还会按目录给出的能力过滤出该 provider 提供的模型级工具（`MODEL_TOOL_NAMES` 逐个问 `providerOffersModelTool`），与上面的 `auth` 一起构成界面看到的 provider 摘要。[@ref-cline-provider-list-auth]

请求侧的上限来自 settings 的 `maxTokens`/`contextWindow`，网关用 `resolveGatewayRequestMaxTokens` 决定单次请求的 max tokens。[@ref-cline-provider-max-tokens]

## 请求映射、流式与重试 {#providers-forwarding}

可写参数到请求的映射：`settings` 里的 `model`、`maxTokens`、`contextWindow`、`baseUrl`、`headers`、`timeout`、`reasoning` 都进入 `ProviderConfig`（字段名 `providerId`），再由网关按 protocol/client 组装；`capabilities` 只影响能力判断与界面/路由（例如是否允许 reasoning、是否支持 prompt cache），不直接变成请求字段。[@ref-cline-provider-config-iface][@ref-cline-provider-gateway]

**会话 id 头改成「有才发」。** 解析请求头时 `sessionId` 变为可选：Cline 计费 provider 的头对象里用 `...(sessionId ? { "X-Task-ID": sessionId } : {})` 展开，OpenAI Codex 用同样的展开写 `session_id`，`opencode-go` 那一支写 `x-opencode-session`；三处都先经过 `trimNonEmpty`，空白与缺省一律不发。[@ref-cline-provider-request-headers-task][@ref-cline-provider-request-headers-codex][@ref-cline-provider-request-headers-opencode] 改动的原因是并非每个请求都属于某个会话——独立的一次性工具调用（例如 VS Code 的提交信息生成）没有任务 id。缺省或空白时这些头**整个不出现**，而不是像改造前那样发一个空值；源码注释特别说明没有 Cline 界面依赖这里有一个有意义的 id。[@ref-cline-provider-request-headers-session]

流式：网关把后端流翻译成统一的 `ApiStream*Chunk`（文本、媒体、推理、用量、工具调用、done），因此上层不需要按 provider 分支。[@ref-cline-provider-stream]

空响应与网络抖动有专门的重试中间件：默认总尝试次数 3（首试 + 2 次重试），空响应退避 250 毫秒，网络错误退避 2000 毫秒，且会把被丢弃尝试的用量合并进最终 finish。[@ref-cline-provider-retry]

## 错误分类与诊断入口 {#providers-diagnostics}

后端约定：错误由 `classifyProviderError` 分类，`isRetryableProviderError` 决定是否可重试；没有凭据预检，后端返回的 401 才是权威信号，文档的「Troubleshooting」也是这个方向。[@ref-cline-provider-errors][@ref-cline-openai-compatible-doc-trouble]

诊断分四层，可以分别验证：

1. **配置可读**：`providers.json` 解析失败会回退为空状态，`cline auth` 与 `cline config` 展示的是解析后的结果；[@ref-cline-provider-manager]
2. **模型可选**：模型列表来自设置、`models.json` 与在线目录（`modelsSourceUrl`），刷新失败不回滚已有列表；[@ref-cline-provider-refresh]
3. **请求已发送**：设置 `CLINE_CAPTURE_PROVIDER_REQUEST`（可取 `all` 等值）后，原始请求会写到 `CLINE_CAPTURE_DIR` 或数据目录下的 `provider-request-captures/*.provider-request.json`；[@ref-cline-provider-capture]
4. **后端可用**：调用失败的分类与是否可重试由 `classifyProviderError`/`isRetryableProviderError` 给出，最终体现在会话的工具错误里。[@ref-cline-provider-errors]

**读错误时先分清是哪一层的失败。** 目录发现失败是 `ModelDiscoveryError`、发现到空目录是 `EmptyModelCatalogError`，两者都在保存凭据时被吞掉，所以「密钥保存成功但模型列表没变」是预期行为而不是静默 bug；只有 `AggregateError` 才表示 `providers.json` 与 `models.json` 不一致且回滚也没成功，这时目录里那个 provider 条目的可信度要单独核对。[@ref-cline-provider-discovery-errors][@ref-cline-provider-catalog-rollback]

用户可见的另一半来自 CLI 变更日志：这一版之前，onboarding 或 provider 设置对话框里保存凭据失败会**静默失败**，修复后错误就地显示。[@ref-cline-provider-changelog-fixes]

CLI 里没有单独「测试 provider」的命令：`cline auth` 负责写入，`cline config` 负责展示，`cline doctor` 检查的是本地进程与 hub，不是后端连通性。[@ref-cline-cli-doctor]
