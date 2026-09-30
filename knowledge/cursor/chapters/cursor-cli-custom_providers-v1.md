---
schema_version: 3
record_kind: production
edition_id: cursor-cli-custom_providers-v1
harness_id: cursor
topic: custom_providers
title: Cursor 的模型 Provider：目录、凭据、BYOK、Bedrock、路由与诊断
sections:
  - section_id: custom_providers-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-pricing-faq-hosting
      - ref-cur-custom_providers-sdk-local-not-model
      - ref-cur-custom_providers-byok-key-storage
      - ref-cur-custom_providers-bedrock-intro
  - section_id: custom_providers-entry
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-cli-config-location
      - ref-cur-custom_providers-cli-config-model-fields
      - ref-cur-custom_providers-cli-params-commands
      - ref-cur-custom_providers-changelog-bedrock
      - ref-cur-custom_providers-slash-bedrock
      - ref-cur-custom_providers-byok-add
      - ref-cur-custom_providers-bedrock-dashboard
      - ref-cur-custom_providers-bedrock-ide-toggle
      - ref-cur-custom_providers-ent-model-access
      - ref-cur-custom_providers-ent-access-combine
      - ref-cur-custom_providers-ent-rollout
  - section_id: custom_providers-auth
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-cli-auth-browser
      - ref-cur-custom_providers-cli-auth-apikey
      - ref-cur-custom_providers-cli-auth-status
      - ref-cur-custom_providers-cli-config-proxy
      - ref-cur-custom_providers-cli-params-auth-headers
      - ref-cur-custom_providers-sdk-auth
      - ref-cur-custom_providers-byok-providers
      - ref-cur-custom_providers-byok-key-storage
      - ref-cur-custom_providers-byok-zdr
      - ref-cur-custom_providers-bedrock-access-keys
  - section_id: custom_providers-byok
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-byok-overview
      - ref-cur-custom_providers-byok-add
      - ref-cur-custom_providers-byok-providers
      - ref-cur-custom_providers-byok-included-usage
      - ref-cur-custom_providers-byok-ondemand
      - ref-cur-custom_providers-pricing-token-rate
      - ref-cur-custom_providers-pricing-usage-pools
      - ref-cur-custom_providers-bedrock-usage-reporting
  - section_id: custom_providers-bedrock
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-bedrock-intro
      - ref-cur-custom_providers-bedrock-iam-role
      - ref-cur-custom_providers-bedrock-trust-policy
      - ref-cur-custom_providers-bedrock-permissions
      - ref-cur-custom_providers-bedrock-enable-models
      - ref-cur-custom_providers-bedrock-dashboard
      - ref-cur-custom_providers-bedrock-dashboard-fields
      - ref-cur-custom_providers-bedrock-external-id
      - ref-cur-custom_providers-bedrock-ide-toggle
      - ref-cur-custom_providers-bedrock-routing
      - ref-cur-custom_providers-bedrock-access-keys
  - section_id: custom_providers-protocol
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-sdk-local-not-model
      - ref-cur-custom_providers-sdk-router
      - ref-cur-custom_providers-byok-key-storage
      - ref-cur-custom_providers-bedrock-routing
      - ref-cur-custom_providers-cli-config-http1
      - ref-cur-custom_providers-cli-params-header
      - ref-cur-custom_providers-acp-transport
      - ref-cur-custom_providers-acp-integration
      - ref-cur-custom_providers-acp-request-flow
  - section_id: custom_providers-models
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-cli-params-commands
      - ref-cur-custom_providers-cli-params-model
      - ref-cur-custom_providers-cli-config-models
      - ref-cur-custom_providers-changelog-catalog-refresh
      - ref-cur-custom_providers-changelog-auto-default
      - ref-cur-custom_providers-sdk-models-list
      - ref-cur-custom_providers-sdk-model-params
      - ref-cur-custom_providers-sdk-router-ids
      - ref-cur-custom_providers-pricing-usage-pools
      - ref-cur-custom_providers-byok-add
      - ref-cur-custom_providers-bedrock-ide-toggle
  - section_id: custom_providers-router
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-router-how
      - ref-cur-custom_providers-router-access
      - ref-cur-custom_providers-router-modes
      - ref-cur-custom_providers-router-team-settings
      - ref-cur-custom_providers-router-team-prefs
      - ref-cur-custom_providers-sdk-router
      - ref-cur-custom_providers-sdk-router-ids
      - ref-cur-custom_providers-pricing-auto-modes
  - section_id: custom_providers-metadata
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-index-model-columns
      - ref-cur-custom_providers-index-model-composer
      - ref-cur-custom_providers-pricing-max-mode
      - ref-cur-custom_providers-sdk-models-list
      - ref-cur-custom_providers-sdk-model-params
      - ref-cur-custom_providers-sdk-params-best-practices
      - ref-cur-custom_providers-cli-config-model-fields
      - ref-cur-custom_providers-byok-add
  - section_id: custom_providers-forwarding
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-cli-params-model
      - ref-cur-custom_providers-cli-params-header
      - ref-cur-custom_providers-cli-config-http1
      - ref-cur-custom_providers-cli-config-model-fields
      - ref-cur-custom_providers-sdk-model-params
      - ref-cur-custom_providers-sdk-per-run-override
      - ref-cur-custom_providers-router-team-prefs
      - ref-cur-custom_providers-router-access
      - ref-cur-custom_providers-ent-model-access
      - ref-cur-custom_providers-byok-providers
      - ref-cur-custom_providers-bedrock-routing
  - section_id: custom_providers-responses
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-headless-stream
      - ref-cur-custom_providers-headless-tool-events
      - ref-cur-custom_providers-cli-config-http1
      - ref-cur-custom_providers-changelog-retries
      - ref-cur-custom_providers-sdk-retries
      - ref-cur-custom_providers-sdk-local-not-model
      - ref-cur-custom_providers-sdk-router
      - ref-cur-custom_providers-byok-add
  - section_id: custom_providers-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-custom_providers-cli-auth-status
      - ref-cur-custom_providers-cli-params-commands
      - ref-cur-custom_providers-sdk-models-list
      - ref-cur-custom_providers-changelog-catalog-refresh
      - ref-cur-custom_providers-sdk-router-troubleshooting
      - ref-cur-custom_providers-router-access
      - ref-cur-custom_providers-changelog-usage
      - ref-cur-custom_providers-cli-config-troubleshooting
      - ref-cur-custom_providers-ent-model-access
      - ref-cur-custom_providers-bedrock-troubleshooting
      - ref-cur-custom_providers-bedrock-usage-reporting
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-entry
        status: partial
        source_refs:
          - ref-cur-custom_providers-cli-config-location
          - ref-cur-custom_providers-cli-config-model-fields
          - ref-cur-custom_providers-cli-params-commands
          - ref-cur-custom_providers-changelog-bedrock
          - ref-cur-custom_providers-slash-bedrock
      - surface_ids: [cursor]
        section_id: custom_providers-entry
        status: partial
        source_refs:
          - ref-cur-custom_providers-byok-add
          - ref-cur-custom_providers-bedrock-dashboard
          - ref-cur-custom_providers-bedrock-ide-toggle
          - ref-cur-custom_providers-ent-model-access
          - ref-cur-custom_providers-ent-access-combine
          - ref-cur-custom_providers-ent-rollout
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-auth
        status: partial
        source_refs:
          - ref-cur-custom_providers-cli-auth-browser
          - ref-cur-custom_providers-cli-auth-apikey
          - ref-cur-custom_providers-cli-auth-status
          - ref-cur-custom_providers-cli-config-proxy
          - ref-cur-custom_providers-cli-params-auth-headers
          - ref-cur-custom_providers-sdk-auth
          - ref-cur-custom_providers-byok-key-storage
      - surface_ids: [cursor]
        section_id: custom_providers-auth
        status: partial
        source_refs:
          - ref-cur-custom_providers-byok-providers
          - ref-cur-custom_providers-byok-key-storage
          - ref-cur-custom_providers-byok-zdr
          - ref-cur-custom_providers-bedrock-access-keys
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-protocol
        status: partial
        source_refs:
          - ref-cur-custom_providers-sdk-local-not-model
          - ref-cur-custom_providers-sdk-router
          - ref-cur-custom_providers-byok-key-storage
          - ref-cur-custom_providers-cli-config-http1
          - ref-cur-custom_providers-cli-params-header
          - ref-cur-custom_providers-acp-transport
          - ref-cur-custom_providers-acp-integration
          - ref-cur-custom_providers-acp-request-flow
      - surface_ids: [cursor]
        section_id: custom_providers-protocol
        status: partial
        source_refs:
          - ref-cur-custom_providers-byok-key-storage
          - ref-cur-custom_providers-bedrock-routing
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-models
        status: answered
        source_refs:
          - ref-cur-custom_providers-cli-params-commands
          - ref-cur-custom_providers-cli-params-model
          - ref-cur-custom_providers-cli-config-models
          - ref-cur-custom_providers-changelog-catalog-refresh
          - ref-cur-custom_providers-changelog-auto-default
          - ref-cur-custom_providers-sdk-models-list
          - ref-cur-custom_providers-sdk-model-params
          - ref-cur-custom_providers-sdk-router-ids
          - ref-cur-custom_providers-pricing-usage-pools
      - surface_ids: [cursor]
        section_id: custom_providers-models
        status: partial
        source_refs:
          - ref-cur-custom_providers-pricing-usage-pools
          - ref-cur-custom_providers-byok-add
          - ref-cur-custom_providers-bedrock-ide-toggle
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-metadata
        status: partial
        source_refs:
          - ref-cur-custom_providers-index-model-columns
          - ref-cur-custom_providers-index-model-composer
          - ref-cur-custom_providers-pricing-max-mode
          - ref-cur-custom_providers-sdk-models-list
          - ref-cur-custom_providers-sdk-model-params
          - ref-cur-custom_providers-sdk-params-best-practices
          - ref-cur-custom_providers-cli-config-model-fields
      - surface_ids: [cursor]
        section_id: custom_providers-metadata
        status: partial
        source_refs:
          - ref-cur-custom_providers-index-model-columns
          - ref-cur-custom_providers-index-model-composer
          - ref-cur-custom_providers-byok-add
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-forwarding
        status: partial
        source_refs:
          - ref-cur-custom_providers-cli-params-model
          - ref-cur-custom_providers-cli-params-header
          - ref-cur-custom_providers-cli-config-http1
          - ref-cur-custom_providers-cli-config-model-fields
          - ref-cur-custom_providers-sdk-model-params
          - ref-cur-custom_providers-sdk-per-run-override
      - surface_ids: [cursor]
        section_id: custom_providers-forwarding
        status: partial
        source_refs:
          - ref-cur-custom_providers-router-team-prefs
          - ref-cur-custom_providers-router-access
          - ref-cur-custom_providers-ent-model-access
          - ref-cur-custom_providers-byok-providers
          - ref-cur-custom_providers-bedrock-routing
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-responses
        status: partial
        source_refs:
          - ref-cur-custom_providers-headless-stream
          - ref-cur-custom_providers-headless-tool-events
          - ref-cur-custom_providers-cli-config-http1
          - ref-cur-custom_providers-changelog-retries
          - ref-cur-custom_providers-sdk-retries
          - ref-cur-custom_providers-sdk-local-not-model
          - ref-cur-custom_providers-sdk-router
      - surface_ids: [cursor]
        section_id: custom_providers-responses
        status: partial
        source_refs:
          - ref-cur-custom_providers-byok-add
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: custom_providers-diagnostics
        status: partial
        source_refs:
          - ref-cur-custom_providers-cli-auth-status
          - ref-cur-custom_providers-cli-params-commands
          - ref-cur-custom_providers-sdk-models-list
          - ref-cur-custom_providers-changelog-catalog-refresh
          - ref-cur-custom_providers-sdk-router-troubleshooting
          - ref-cur-custom_providers-router-access
          - ref-cur-custom_providers-changelog-usage
          - ref-cur-custom_providers-cli-config-troubleshooting
      - surface_ids: [cursor]
        section_id: custom_providers-diagnostics
        status: partial
        source_refs:
          - ref-cur-custom_providers-ent-model-access
          - ref-cur-custom_providers-bedrock-troubleshooting
          - ref-cur-custom_providers-bedrock-usage-reporting
---

## 固定来源与「Provider 可配置到哪一步」 {#custom_providers-scope}

本章的固定来源是 2026-09-30 采集的 Cursor 官方文档快照：`models-and-pricing.md`、`cursor-router.md`、`enterprise/model-and-integration-management.md`、`cli/reference/{configuration,authentication,parameters,slash-commands}.md`、`cli/{changelog,headless,acp}.md`、`sdk/typescript.md`、`index.md`，以及两页第一方凭据文档 `help/models-and-usage/api-keys.md`（Bring your own API key）与 `customizing/aws-bedrock.md`（AWS Bedrock）。`cli` 与 `cursor`（Cursor IDE）共用同一套模型目录与平台侧设置，机制相同处合并叙述，只有一侧有来源时单独标注。

关于「能不能接自定义 provider」的准确说法是：

- **可以自带凭据（BYOK）**：官方支持在 Cursor Settings > Models 为 OpenAI、Anthropic、Google、Azure OpenAI、AWS Bedrock 粘贴自己的 API key，并由该 provider 直接向你计费 [@ref-cur-custom_providers-byok-key-storage]；AWS Bedrock 还可以改走团队自己的 AWS 账号 [@ref-cur-custom_providers-bedrock-intro]。
- **不能自定义端点**：固定来源没有提供填写任意 base URL、自建 OpenAI/Anthropic 兼容端点或第三方后端的入口；请求仍要经过 Cursor 的服务器做最终 prompt 构建，key 随每次请求发往 Cursor 后端（不落库、不持久化）[@ref-cur-custom_providers-byok-key-storage]。协议与端点形态由 Cursor 侧决定，模型托管方是模型厂商、可信伙伴或 Cursor [@ref-cur-custom_providers-pricing-faq-hosting]，SDK 侧同样声明推理经由 Cursor 托管的模型 [@ref-cur-custom_providers-sdk-local-not-model]。

因此本章 8 道题回答的是：模型目录与模型选择、CLI/IDE 凭据入口、BYOK 与 Bedrock 的作用域与计费、能力元数据、参数转发、路由器与企业模型访问，以及诊断；「写一个自定义 provider 定义」这一含义下的字段与文件，固定来源仍然没有对应内容。

## Provider 与凭据的定义入口 {#custom_providers-entry}

结论：Cursor 侧没有 provider 注册文件，也没有把模型指向自定义端点的字段；能改的是「用哪家厂商的凭据」「选哪个模型 id」以及企业侧的可用集合。

| 层 | 位置 | 能改什么 |
| :-- | :-- | :-- |
| CLI 模型选择 | `/model [filter]`、`--model`、`agent models`、全局配置的 `model` 字段 | 选哪个模型 id、该模型的参数、Max Mode 偏好 |
| CLI Bedrock 凭据 | `agent bedrock`、`/bedrock` | 用你自己的 AWS access key 或团队 IAM role 走 Bedrock |
| IDE 厂商凭据（BYOK） | Cursor Settings > Models，为每个 provider 粘贴 API key | 该 provider 的模型进入模型选择器 |
| IDE Bedrock 开关 | Cursor Settings > Models 的 AWS Bedrock 开关 | 是否把请求路由到团队配置的 Bedrock |
| Bedrock IAM 角色 | Cursor dashboard > Settings > Bedrock IAM Role | 团队级 IAM 角色、区域与连通性校验 |
| 企业模型与集成管理 | Team Settings → Models 的 Model Providers 段（Enterprise） | providers、models、defaults、个人 API key（BYOK）控制 |

CLI 配置的作用域很小：全局配置在 macOS/Linux 是 `~/.cursor/cli-config.json`（Windows 是 `$env:USERPROFILE\.cursor\cli-config.json`）[@ref-cur-custom_providers-cli-config-location]；项目级只有 `{project}/.cursor/cli.json`，而且**项目级只能配置权限**，其他设置必须写在全局 [@ref-cur-custom_providers-cli-config-location]。全局配置里与「选中哪个模型」有关的字段是 `model`（object，官方描述只有 "Selected model configuration"）、`maxMode`（boolean）与 `hasChangedDefaultModel`（boolean）[@ref-cur-custom_providers-cli-config-model-fields]。`agent models` 是「列出该账号可用模型」的命令入口 [@ref-cur-custom_providers-cli-params-commands]。

CLI 上的 Bedrock 凭据入口是两个命令面 [@ref-cur-custom_providers-changelog-bedrock][@ref-cur-custom_providers-slash-bedrock]：`agent bedrock` 配置 access key 或团队 IAM role，`/bedrock [subcommand]` 是交互式等价入口，并且只在「Bedrock 特性启用」时可用。

`cursor` 界面侧的两条链：

- **BYOK**：Cursor Settings > Models → 找到 provider（OpenAI、Anthropic、Google、Azure、AWS Bedrock）→ 粘贴 key → Save；保存后 Cursor 用你的 key 调该 provider 的模型 [@ref-cur-custom_providers-byok-add]。
- **Bedrock IAM 角色**：只能通过 Cursor dashboard（Settings > Bedrock IAM Role）配置，IDE 设置里没有这一段 [@ref-cur-custom_providers-bedrock-dashboard]；校验角色本身不会改变路由，每个用户还要在自己的客户端把 Cursor Settings > Models 里的 AWS Bedrock 开关打开——默认对每个人都是关的 [@ref-cur-custom_providers-bedrock-ide-toggle]。

企业侧的可选集合由两层决定，团队是基线：Team Settings → Models → Model Providers（Enterprise）管理 providers、models、defaults 与 BYOK 控制；Organization → Groups → 组 → Models 只用于给特定人群**加宽**访问 [@ref-cur-custom_providers-ent-model-access]。两层按「最宽松（并集）」合并 [@ref-cur-custom_providers-ent-access-combine]。新模型不会自动下发给企业，Enterprise 团队需要显式 opt in [@ref-cur-custom_providers-ent-rollout]。

缺口（cli）：`cli-config.json` 的 `model` 对象结构；`agent bedrock` 的参数、凭据落盘位置与作用域（团队级还是用户级）；CLI 是否读取 IDE Settings > Models 里粘贴的 BYOK key（固定来源未说明两者共享）。
缺口（cursor）：是否存在 provider 级的本地配置文件或 base URL 字段（固定来源只描述了 Settings > Models 的 key 输入框与 Bedrock 开关）；用户在非 Enterprise 计划下「移除某 provider」的语义（只有「更换或移除 key」这一说法）。

## 凭据、环境变量与 ZDR 边界 {#custom_providers-auth}

CLI 自身有两条认证路径 [@ref-cur-custom_providers-cli-auth-browser][@ref-cur-custom_providers-cli-auth-apikey]：浏览器登录（`agent login` / `agent logout`，`NO_OPEN_BROWSER=1` 时只打印 URL）与 API key（Dashboard → API Keys 生成 user key，然后设 `CURSOR_API_KEY` 或传 `--api-key`）。示例只用占位值：

```bash
export CURSOR_API_KEY={your-api-key}
agent "implement user authentication"
```

`--api-key` 是全局选项，官方说明明确「也可以用 `CURSOR_API_KEY` 环境变量」[@ref-cur-custom_providers-cli-params-auth-headers]。SDK 使用同一套凭据模型，并说明两类 key 的运行范围：user API key 与 service account API key 都可用于 local 与 cloud 运行，Team Admin API key 尚不支持 [@ref-cur-custom_providers-sdk-auth]。来源只区分「支持哪类运行」，没有说明两类 key 各自绑定的账号/团队作用域，这一差异见下方缺口。

base URL：`agent status` 会显示账号信息与「Current endpoint configuration」，说明 CLI 存在端点配置这一概念，但固定来源没有给出改写 base URL 的用户入口 [@ref-cur-custom_providers-cli-auth-status]。网络侧能配置的是代理与 CA，而不是模型端点 [@ref-cur-custom_providers-cli-config-proxy]：

```bash
export HTTP_PROXY=http://your-proxy:port
export HTTPS_PROXY=http://your-proxy:port
export NODE_USE_ENV_PROXY=1
export NODE_EXTRA_CA_CERTS=/path/to/corporate-ca-cert.pem
```

自带厂商凭据的边界（BYOK）：

- **支持的 provider 与被限制的能力**：OpenAI（标准、非 reasoning 的 chat 模型，选择器显示哪些可用）、Anthropic（Anthropic API 上的全部 Claude 模型）、Google（Google AI API 的 Gemini 模型）、Azure OpenAI（你 Azure 实例中已部署的模型）、AWS Bedrock（IDE 里用 AWS access key/secret，或经 dashboard 配 IAM role，可用模型取决于你的 Bedrock 配置）[@ref-cur-custom_providers-byok-providers]。**自定义 key 只作用于 chat 模型，Tab 补全仍用 Cursor 内置模型** [@ref-cur-custom_providers-byok-providers]。
- **key 的存放与传输**：key 不存放在 Cursor 服务器上；每次请求都会连同请求发到 Cursor 后端（因为所有请求都经 Cursor 服务器做最终 prompt 构建），经加密连接传输，请求完成后不保留 [@ref-cur-custom_providers-byok-key-storage]。
- **ZDR 例外**：使用自带 key 时 Cursor 的 Zero Data Retention 策略**不适用**，数据按你所选 provider 的隐私政策处理；依赖 ZDR 的团队应改用 Cursor 内置模型 [@ref-cur-custom_providers-byok-zdr]。
- **Bedrock 的替代写法**：不用 IAM role 时，可以在 IDE 的 Cursor Settings > Models 里直接填 AWS Access Key ID 与 Secret Access Key，更简单但安全性更低 [@ref-cur-custom_providers-bedrock-access-keys]。

缺口（cli）：base URL/自建网关的覆盖方式；CLI 的 `--api-key`（Cursor 账号 key）与 BYOK 厂商 key 之间是否存在优先级或互斥关系；user key 与 service account key 的作用域差异（来源只说两者都可用于 local 与 cloud，未说明各自绑定个人账号还是团队）。
缺口（cursor）：key 在客户端本地的存储位置/加密方式；同一 provider 多把 key 或团队策略与个人 key 的优先级；`agent bedrock` 配置的凭据与 IDE 填写的 access key 是否共用。

## BYOK：模型可见性、用量与计费 {#custom_providers-byok}

处理链（`cursor` 界面，也是全网最完整的一版描述）：打开 Cursor Settings > Models → 选 provider → 粘贴 key → Save，之后 Cursor 用你的 key 调该 provider 的模型，**这些模型出现在模型选择器里**；key 无效或被 provider 拒绝时，使用该 provider 的请求会失败，直到你更换或移除 key [@ref-cur-custom_providers-byok-add]。厂商向你直接收取模型费用，Cursor 不代收模型费 [@ref-cur-custom_providers-byok-overview]（见下）。

计费与用量池的关系：

- 个人计划（Pro、Pro+、Ultra）：不计入 included usage，由 provider 向你收费 [@ref-cur-custom_providers-byok-overview]。
- Teams / Enterprise：你的 provider 仍收模型费，Cursor 不再收模型费，但**每个第三方模型请求都要付 Cursor Token Rate**（$0.25/M tokens，含 input、output 与缓存），自有 key 的请求同样适用；这笔费用记在 Spending 页的 Other Models 名下，并从未被该额度扣减——扣的是 Cursor Token Rate，而不是你付给 provider 的模型费，因此不会重复计费 [@ref-cur-custom_providers-byok-included-usage]。这与平台侧的 Cursor Token Rate 说明一致，且 First-party 模型（Grok、Composer）豁免 [@ref-cur-custom_providers-pricing-token-rate]。
- 额度耗尽后：Teams/Enterprise 的 Other Models 额度用尽时，开启 on-demand usage 则自有 key 的请求继续可用（按 Cursor Token Rate 记为 on-demand），关闭则请求停止到下一个计费周期 [@ref-cur-custom_providers-byok-ondemand]。
- Bedrock 也按同一口径记账：Bedrock 路由的请求仍出现在 dashboard usage 与 Admin API 中，事件的 `kind` 记为 User API Key 类目（视为自带凭据用量）、模型成本接近 0（推理记在你的 AWS 账号），在带 Cursor Token Rate 的计划上费率仍适用并出现在 `cursorTokenFee` 字段里 [@ref-cur-custom_providers-bedrock-usage-reporting]。

模型进入选择器的前提：BYOK 只影响 chat 模型（Tab 补全仍走内置模型）[@ref-cur-custom_providers-byok-providers]；两个用量池（Cursor Models / Other Models）各自随计费周期重置，第三方模型从 Other Models 池按 API 价计费 [@ref-cur-custom_providers-pricing-usage-pools]。

缺口：BYOK 模型在选择器里如何标注（是否显示 provider 来源）、是否与 Cursor 目录中的同名模型去重；个人计划上「unlimited AI messages」的具体限额表述；Cursor Token Rate 对缓存 token 的计量口径在帮助页与平台页之间是否完全一致（两处都写了 $0.25/M，但帮助页额外点明 input、output 与 cached）。

## AWS Bedrock 接入链 {#custom_providers-bedrock}

目的：把 AI 请求路由到你自己的 AWS Bedrock 账号，从而使用既有 AWS 额度并把请求留在自己的 AWS 基础设施内 [@ref-cur-custom_providers-bedrock-intro]。推荐路径是 IAM role：新建一个授予 Cursor 代表你调用 Bedrock 模型权限的角色 [@ref-cur-custom_providers-bedrock-iam-role]。

1. **信任策略**（Step 1）：信任 Cursor 的跨账号主体 `arn:aws:iam::289469326074:role/roleAssumer`，并要求 `sts:AssumeRole` 带 External ID 条件。官方给出的策略骨架（占位符用 `{your-external-id}` 表示；原文写作尖括号形式，逐字内容见引用）[@ref-cur-custom_providers-bedrock-trust-policy]：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::289469326074:role/roleAssumer" },
      "Action": "sts:AssumeRole",
      "Condition": { "StringEquals": { "sts:ExternalId": "{your-external-id}" } }
    }
  ]
}
```

2. **权限策略**（Step 2）：授予 `bedrock:InvokeModel` 与 `bedrock:InvokeModelWithResponseStream`，资源 ARN 按你要开放的模型与区域调整（官方示例用 `arn:aws:bedrock:*::foundation-model/anthropic.*` 与 `us.anthropic.*`）[@ref-cur-custom_providers-bedrock-permissions]。
3. **在 Bedrock 侧启用模型**（Step 3）：在 Amazon Bedrock 控制台的 Model access（新版本控制台已改为 Model catalog）里选择并启用模型；新控制台下打开模型并使用有 AWS Marketplace 权限的账号调用一次（例如 Open in Playground），即可账号级激活 [@ref-cur-custom_providers-bedrock-enable-models]。
4. **在 dashboard 配置**（Step 4）：IAM role 只能通过 Cursor dashboard（Settings > Bedrock IAM Role）配置，IDE 设置里没有 [@ref-cur-custom_providers-bedrock-dashboard]。需要填 AWS IAM Role ARN、AWS Region 与 Test Model ID 三项，然后点 Validate & Save 校验连通性 [@ref-cur-custom_providers-bedrock-dashboard-fields]。校验通过后 Cursor 才会生成 External ID，需要把它加进信任策略的 `Condition` 里，用于防止 confused deputy、阻止未授权访问你的 AWS 资源 [@ref-cur-custom_providers-bedrock-external-id]。
5. **在 IDE 启用**（Step 5）：校验 IAM role 本身不改变路由；每个用户要在自己的 Cursor 客户端 Cursor Settings > Models 里把 AWS Bedrock 开关打开（默认关闭，即使团队角色已校验）[@ref-cur-custom_providers-bedrock-ide-toggle]。打开后 Bedrock 模型以原始 Bedrock ID 出现在选择器里（例如 `us.anthropic.claude-sonnet-5`；非美国区域用 `eu.`、`apac.`、`ca.` 前缀），必须显式选中这些条目才会走 Bedrock [@ref-cur-custom_providers-bedrock-ide-toggle][@ref-cur-custom_providers-bedrock-routing]。
6. **备选凭据**：不用 IAM role 时可在 IDE 的 Cursor Settings > Models 直接填 AWS Access Key ID 与 Secret Access Key [@ref-cur-custom_providers-bedrock-access-keys]。

生效条件的关键细节：标准模型名（例如 "Claude Sonnet 5"）与 Auto 仍然走 Cursor 的模型 provider，只有显式选中的 Bedrock 模型 ID 才走你的 Bedrock 账号；开关打开时选择不能作为 Bedrock ID 的模型可能以 "not supported by bedrock" 之类的错误失败，关掉开关即可回到 Cursor 托管模型 [@ref-cur-custom_providers-bedrock-routing]。

缺口：`agent bedrock` 与 IDE/dashboard 的 Bedrock 配置是否共享同一份 IAM 角色（changelog 只说它可在交互、headless 与编辑器会话生效）；Bedrock 与 Router/Auto 的交互（Auto 是否会路由到 Bedrock 模型）；Bedrock 上是否支持非 Anthropic 模型族在固定来源中没有示例。

## 请求协议与端点形态 {#custom_providers-protocol}

可证实的形态（`cli` 与 `cursor` 共用同一条推理通道）：

1. **没有用户自定义端点。** 固定来源里没有任何「填 base URL、指向自建 OpenAI/Anthropic 兼容服务、或指定第三方后端」的配置。自带 key 时请求依然经 Cursor 服务器做最终 prompt 构建，key 随请求加密传输且不持久化 [@ref-cur-custom_providers-byok-key-storage]；推理侧要么是 Cursor 托管的模型 [@ref-cur-custom_providers-sdk-local-not-model]，要么是按显式 Bedrock 模型 ID 路由到你的 AWS 账号 [@ref-cur-custom_providers-bedrock-routing]。
2. **Bedrock 是一种受支持的接入路径，但形态固定。** 它通过团队 IAM 角色（或 access key）与 dashboard 校验建立信任，再用原始 Bedrock 模型 ID 选择路由；不支持任意端点或协议改写 [@ref-cur-custom_providers-bedrock-routing]。
3. **托管侧没有裸推理端点。** SDK「是 agent SDK，不是独立的 model-inference 或 chat-completions API」，Cursor 也没有公开可用于任意模型调用的裸 Router 端点 [@ref-cur-custom_providers-sdk-router]。
4. **CLI 到 agent 后端的传输可切 HTTP/1.1 + SSE。** 默认 HTTP/2；企业代理不支持 HTTP/2 双向流时用 `network.useHttp1ForAgent` 切到 HTTP/1.1 与 Server-Sent Events [@ref-cur-custom_providers-cli-config-http1]；`-H/--header` 可给 agent 请求附加自定义 header（`Name: Value`，可重复）[@ref-cur-custom_providers-cli-params-header]。
5. **CLI 自身可作为 ACP server。** 编辑器可用 `agent acp` 连接：stdio 传输、JSON-RPC 2.0 信封、换行分隔 JSON [@ref-cur-custom_providers-acp-transport]；会话流为 initialize → authenticate（`cursor_login`）→ session/new → session/prompt [@ref-cur-custom_providers-acp-request-flow]，流式输出走 `session/update` 通知，工具审批走 `session/request_permission` [@ref-cur-custom_providers-acp-integration]。这是编辑器集成协议，不是模型 provider 协议。

缺口：与 Cursor 后端交互的端点路径、请求/响应结构、鉴权 header 名称未文档化；BYOK 场景下 Cursor 侧把请求转发给厂商时使用的协议与鉴权形式也没有描述；AWS 侧的调用是否就是标准 Bedrock InvokeModel（权限策略里出现 `InvokeModel`/`InvokeModelWithResponseStream`，但来源没有描述请求映射细节）。

## 模型 ID、别名、列表与刷新 {#custom_providers-models}

列表与选择（`cli`）：

- `agent models` 列出该账号可用模型 [@ref-cur-custom_providers-cli-params-commands]；`--model` 指定模型、`--list-models` 列出全部可用模型 [@ref-cur-custom_providers-cli-params-model]。
- 交互式用 `/model [filter]` 选择，官方示例串包括 `auto`、`gpt-5`、`sonnet-4-thinking` [@ref-cur-custom_providers-cli-config-models]。
- 家族快捷键：`/opus`、`/composer` 直接跳到某模型并记住上次选择，`/fast` 在当前模型支持时切换 Fast；新装 CLI 默认使用 Auto 路由 [@ref-cur-custom_providers-changelog-auto-default]。
- 用量池决定「选这个模型会从哪扣」：Cursor Models 与 Other Models 两个池各自随计费周期重置；直接选择具体第三方模型时用 Other Models 池 [@ref-cur-custom_providers-pricing-usage-pools]。

目录契约（SDK/程序化，账号与团队维度）：`Cursor.models.list()` 返回 `ModelListItem[]`，字段为 `id`、`displayName`、`description?`、`aliases?`、`parameters?`、`variants?`——**别名以 `aliases` 数组出现在目录里**，但固定来源没有说明 CLI 的 `--model`/`/model` 是否接受别名字符串 [@ref-cur-custom_providers-sdk-models-list]。参数随模型而变，用目录发现 [@ref-cur-custom_providers-sdk-model-params]。Router 在目录中是 `auto-smart` 加 `optimize_for`；`{ id: "auto" }` 是服务端选择的 Auto 回退；省略 `optimize_for` 或传 `default` 不受支持 [@ref-cur-custom_providers-sdk-router-ids]。

BYOK 与 Bedrock 改变的是**哪些 id 会出现在选择器里**：粘贴厂商 key 后该 provider 的模型进入选择器 [@ref-cur-custom_providers-byok-add]；Bedrock 打开开关后以原始 Bedrock ID（`us.anthropic.claude-sonnet-5`，非美国区域为 `eu.`/`apac.`/`ca.` 前缀）出现，而标准模型名与 Auto 仍在 Cursor 侧 [@ref-cur-custom_providers-bedrock-ide-toggle]。

刷新（`cli`）：CLI 每 10 分钟在后台重取模型目录，新模型无需重启即可出现；刷新失败保留当前目录并在下个间隔重试 [@ref-cur-custom_providers-changelog-catalog-refresh]。

缺口（cli）：`agent models`/`--list-models` 的输出格式、别名清单、CLI 接受别名的规则；BYOK 模型是否也会在 CLI 的目录刷新中出现（固定来源只说明它们出现在 IDE 模型选择器里）。
缺口（cursor）：BYOK 模型与内置同名模型的去重/命名（选择器显示哪些 OpenAI/Claude/Gemini 模型由 provider 侧决定）；Bedrock 模型条目的排序与分组规则。

## Cursor Router：Auto 背后的路由 {#custom_providers-router}

何时生效（Teams/Enterprise）：选中 Auto 且优化模式为 Balance 或 Intelligence 时，Router 对每个 agent 请求跑一次分类器，按任务类型与复杂度路由，选择「仍能产出可比质量」的最省成本模型 [@ref-cur-custom_providers-router-how]。Cost 模式沿用旧的 Auto 路由逻辑；Balance/Intelligence 更快消耗用量上限，可随时切换 [@ref-cur-custom_providers-router-modes]。路由完全由 Cursor 数据驱动管理，不能手选具体模型，模型池随新模型发布变化 [@ref-cur-custom_providers-router-how]。所有 Auto 模式按被路由到的模型列表价计费 [@ref-cur-custom_providers-pricing-auto-modes]。

企业限制与团队配置：

- Router 遵守团队模型访问控制，被封锁的模型会改路由到允许的模型；封锁过多会降低路由质量甚至禁用 Router，另外启用 Grok 4.6 是 Router 可用的前提 [@ref-cur-custom_providers-router-access]。
- Enable Cursor Router：Enterprise 默认关闭，必须手动开启，并可按组织组配置 [@ref-cur-custom_providers-router-team-settings]。
- Routing preferences：限制成员可选的优化模式，最多禁用 2 个；Underlying model：是否在回答开头显示 Auto 路由到的模型，默认隐藏，仅适用 Balance/Intelligence；Impose Auto：Soft 只把新会话默认设为 Auto，Hard 锁定模型选择器 [@ref-cur-custom_providers-router-team-prefs]。

程序化接入：Router 即模型 id `auto-smart` 加参数 `optimize_for`，团队未启用时 `auto-smart` 不出现在目录中，应先用 `Cursor.models.list()` 确认再硬编码 [@ref-cur-custom_providers-sdk-router]；`auto`、`default` 与 `auto-smart` 的区别见前述模型 id 契约 [@ref-cur-custom_providers-sdk-router-ids]。

缺口：分类器模型、路由候选池的组成、Cost 模式与「Router 关闭」时的具体差异；Router 与 BYOK/Bedrock 的关系（Auto 是否会路由到自带 key 的模型或 Bedrock 模型）未文档化。

## 能力元数据：上下文窗口、能力标签与模型参数 {#custom_providers-metadata}

官方用文档表格表达模型元数据，列固定为 `Provider`、`Default context`、`Max context`、`Capabilities` 与 `Notes` [@ref-cur-custom_providers-index-model-columns]；例如 Composer 2.5 行的能力标签是 `Agent, Thinking, Images` [@ref-cur-custom_providers-index-model-composer]。这些数值由官方文档随模型发布维护，**不是用户可写的 provider 定义字段**。

参数与变体（程序化读取）：目录以 `parameters`（`{id, displayName?, values:[{value, displayName?}]}`）与 `variants`（含 `params`、`isDefault?` 的预设组合）表达模型可调项 [@ref-cur-custom_providers-sdk-models-list]；`model.params` 传入每个模型的选项（例如推理强度），参数 id 与取值随模型变化 [@ref-cur-custom_providers-sdk-model-params]。**如果模型是参数化的而你没有显式传参，运行会使用每个参数的第一个允许值** [@ref-cur-custom_providers-sdk-params-best-practices]。

Max Mode 与上下文上限：Max Mode 只在 legacy request-based plans 上可用，把模型的上下文窗口扩展到默认上限之外，按模型 API 价加 20% 计费 [@ref-cur-custom_providers-pricing-max-mode]；SDK 在选中模型需要时自动启用 Max Mode [@ref-cur-custom_providers-sdk-model-params]；CLI 侧把这一偏好持久化在 `maxMode` 字段 [@ref-cur-custom_providers-cli-config-model-fields]。

BYOK 与元数据的关系：选择器只列出该 provider 侧可用的模型 [@ref-cur-custom_providers-byok-add]（例如 OpenAI 仅标准、非 reasoning 的 chat 模型），因此能力/上下文仍由厂商模型自身决定，Cursor 的文档表只覆盖 Cursor 目录中的模型。

缺口：输出 token 上限、工具/视觉能力、推理强度的逐模型字段名与取值枚举都没有逐项列表；BYOK 模型在 Cursor 里是否也带有与内置模型一致的元数据（能力标签、上下文上限）未文档化；`Default context`/`Max context` 的单位与空值含义只能按表格字面理解。

## 参数如何进入请求，哪些只影响界面或路由 {#custom_providers-forwarding}

- **模型与参数**：`--model` 选定模型 [@ref-cur-custom_providers-cli-params-model]，`model.params` 随模型一起提交 [@ref-cur-custom_providers-sdk-model-params]；per-run override 覆盖当前 run 的模型并且是**粘性**的——后续 send 不传覆盖会继续使用新选择 [@ref-cur-custom_providers-sdk-per-run-override]。
- **自定义 header**：`-H/--header` 的值以 `Name: Value` 加入 agent 请求 [@ref-cur-custom_providers-cli-params-header]。这是固定来源里唯一被文档化的「把自定义值写进请求」的通道。
- **传输开关**：`network.useHttp1ForAgent` 只改变连接形态（HTTP/1.1 + SSE），不改变模型或参数 [@ref-cur-custom_providers-cli-config-http1]。
- **本地选择状态**：`maxMode` 与 `hasChangedDefaultModel` 是本地偏好与覆盖标志，不构成额外的模型/端点配置 [@ref-cur-custom_providers-cli-config-model-fields]。
- **哪些 provider/模型会被真正使用（`cursor`）**：自定义 key 只对 chat 模型生效，Tab 补全固定用 Cursor 内置模型 [@ref-cur-custom_providers-byok-providers]；Bedrock 开关打开时，标准名与 Auto 仍走 Cursor，只有显式选中的 Bedrock ID 走你的账号，选到非 Bedrock ID 可能报 "not supported by bedrock" [@ref-cur-custom_providers-bedrock-routing]。
- **只影响策略/界面的项**：Router 的 Underlying model（是否显示路由结果）与 Impose Auto（默认值与锁定）[@ref-cur-custom_providers-router-team-prefs]；团队模型访问决定可用集合（封锁会改变 Router 实际路由）[@ref-cur-custom_providers-router-access]；团队与组织组按并集决定可用模型 [@ref-cur-custom_providers-ent-model-access]。

缺口：从这些参数到实际 HTTP 请求体/header 的映射未文档化；BYOK 请求里 Cursor 如何把厂商 key 与模型选择拼装成对厂商的调用（以及是否有额外字段）没有描述；CLI 转发自定义 header 时的过滤规则也没有说明。

## 流式、工具调用、错误与重试 {#custom_providers-responses}

- **输出形态**：`--output-format stream-json` 提供消息级进度，`--stream-partial-output` 按增量流式输出文本 delta [@ref-cur-custom_providers-headless-stream]；该页示例脚本逐行解析 JSON，事件带 `type`/`subtype`，`system`/`init` 事件里带 `model`，`assistant` 增量以 `timestamp_ms` 与 `model_call_id` 的有无来识别 [@ref-cur-custom_providers-headless-stream]；`tool_call` 事件按 `writeToolCall`/`readToolCall` 区分写入与读取并带 `args.path` [@ref-cur-custom_providers-headless-tool-events]。
- **传输**：HTTP/1.1 回退使用 SSE，用于不支持 HTTP/2 双向流的企业代理 [@ref-cur-custom_providers-cli-config-http1]。
- **重试**：CLI 默认对掉线/卡住的流自动重试（所有模式），分类后的服务端错误（如限流）按真实消息呈现 [@ref-cur-custom_providers-changelog-retries]；SDK 侧对应 `enableAgentRetries`（默认 `true`，设为 `false` 时首次失败即暴露传输错误）[@ref-cur-custom_providers-sdk-retries]。
- **BYOK 的错误行为**：key 无效或被 provider 拒绝时，使用该 provider 的请求会失败，直到更换或移除 key——即失败按 provider 维度生效，不是全局停机 [@ref-cur-custom_providers-byok-add]。
- **后端约定**：Cursor 不为用户自建后端提供接入契约——推理由 Cursor 托管 [@ref-cur-custom_providers-sdk-local-not-model]，且没有公开的裸 Router 端点 [@ref-cur-custom_providers-sdk-router]；BYOK 只替换凭据，不改变响应/工具调用约定。

缺口：SSE 事件名与载荷 schema、错误分类表、重试次数与退避策略、BYOK 失败时错误文案与重试语义（是否重试后自动回退到 Cursor 模型）都没有文档。

## 诊断：配置可读、模型可选、请求已发出与后端可用 {#custom_providers-diagnostics}

- **认证与端点**：`agent status` 显示是否已认证、账号信息与当前端点配置 [@ref-cur-custom_providers-cli-auth-status]。
- **目录与模型可选**：`agent models` 列出该账号可用模型 [@ref-cur-custom_providers-cli-params-commands]；`Cursor.models.list()` 返回 id、参数与变体（账号/团队相关）[@ref-cur-custom_providers-sdk-models-list]；目录每 10 分钟刷新，可用其变化判断目录是否真的更新 [@ref-cur-custom_providers-changelog-catalog-refresh]。
- **团队策略导致的「选不了」**：`cursor` 侧的团队/组织组模型访问设置是判定入口 [@ref-cur-custom_providers-ent-model-access]；Router 场景下 `auto-smart` 缺席或模式被拒时，按官方顺序查目录、`auto-smart` 是否存在、`optimize_for` 取值、团队是否启用 Router、多团队时 key 的团队上下文、团队模型访问策略 [@ref-cur-custom_providers-sdk-router-troubleshooting]；依赖模型被封锁会让路由退化或失效 [@ref-cur-custom_providers-router-access]。
- **Bedrock 专项排查**：校验失败并被拒时检查 IAM role ARN、信任策略是否包含 Cursor 的跨账号 ARN `arn:aws:iam::289469326074:role/roleAssumer`、External ID 是否完全一致、测试模型是否已在 Bedrock 启用；模型找不到时检查 Bedrock 侧是否启用、模型 ID 的区域前缀、IAM 策略是否包含该模型 ARN [@ref-cur-custom_providers-bedrock-troubleshooting]。
- **请求是否真的发出并被计费**：`/usage` 显示 included-usage 表、Auto 与 API 拆分、on-demand 花费、计划名与计费周期重置日 [@ref-cur-custom_providers-changelog-usage]；Bedrock 事件在 dashboard usage 与 Admin API 中可见，`kind` 记为 User API Key 类目、模型成本近 0、`cursorTokenFee` 在带费率的计划上出现，可用 `chargedCents` 求和与 `/teams/spend` 对账（AWS 侧推理成本需查 AWS 账单）[@ref-cur-custom_providers-bedrock-usage-reporting]。
- **配置本身**：CLI 对损坏配置的处理是把文件备份为 `.bad` 并重建，缺字段会自修复；排查「文件写了但不生效」时要确认 JSON 合法、有写权限，并注意部分字段由 CLI 托管会被覆盖 [@ref-cur-custom_providers-cli-config-troubleshooting]。

缺口：没有针对 provider/端点的连通性探针（Bedrock 有一条 dashboard 的 Validate & Save 通道，但其他 provider 只有「请求失败」这一反馈）；CLI 到后端的连接失败只以错误与自动重试呈现，没有区分「请求已发送但后端失败」与「根本没有发出」的专门输出；`agent models` 的机器可读输出未文档化。
