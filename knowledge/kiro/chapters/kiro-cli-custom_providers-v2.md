---
schema_version: 3
record_kind: production
edition_id: kiro-cli-custom_providers-v2
harness_id: kiro
topic: custom_providers
title: "Kiro CLI 的模型后端与凭据边界"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-kiro-config-intro, ref-kiro-config-paths, ref-kiro-config-supports, ref-kiro-agentref-fields, ref-kiro-models-regions, ref-kiro-agentref-model, ref-kiro-auth-providers, ref-kiro-auth-apikey, ref-kiro-auth-precedence, ref-kiro-mcpfile-oauth]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-kiro-models-comparison, ref-kiro-models-switch, ref-kiro-agentref-model, ref-kiro-models-effort, ref-kiro-models-availability, ref-kiro-settings-chat, ref-kiro-modelgov-enable, ref-kiro-modelgov-considerations]
  - section_id: providers-requests
    surface_ids: [cli]
    source_refs: [ref-kiro-models-regions, ref-kiro-harness-turn, ref-kiro-settings-api, ref-kiro-headless-flags]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-models-switch, ref-kiro-modelgov-considerations, ref-kiro-settings-access, ref-kiro-settings-chat, ref-kiro-config-inspect, ref-kiro-clicmd-diagnostic, ref-kiro-clicmd-doctor, ref-kiro-auth-precedence, ref-kiro-exitcodes]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-scope
        status: not_applicable
        source_refs: [ref-kiro-config-intro, ref-kiro-config-paths, ref-kiro-agentref-fields]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-scope
        status: partial
        source_refs: [ref-kiro-auth-precedence, ref-kiro-auth-apikey]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-requests
        status: not_applicable
        source_refs: [ref-kiro-models-regions, ref-kiro-harness-turn]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-kiro-models-switch, ref-kiro-agentref-model, ref-kiro-models-comparison]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-kiro-models-comparison, ref-kiro-models-effort]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-requests
        status: not_applicable
        source_refs: [ref-kiro-settings-api, ref-kiro-harness-turn]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-requests
        status: partial
        source_refs: [ref-kiro-settings-api, ref-kiro-headless-flags]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-kiro-models-switch, ref-kiro-clicmd-diagnostic]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 模型后端入口与凭据 {#providers-scope}

**结论：这批固定来源中不存在"自定义 Provider（自带 LLM 端点/兼容层）"的配置面。** 判定依据是三个可直接复核的入口：

1. `/docs/configuration.md` 自称 "complete reference of all configurable features"，其 "File paths" 表与 "What each scope supports" 表逐项列出 CLI 可配置的 MCP、Permissions、Custom agents、Steering、Skills、Hooks、Powers、Specs、Workflows、Settings——**没有任何 provider、base URL、模型 API key 的条目**。[@ref-kiro-config-intro][@ref-kiro-config-paths][@ref-kiro-config-supports]
2. Agent 配置参考逐字段列出全部可写段（`name`、`description`、`prompt`、`mcpServers`、`tools`、`toolAliases`、`allowedTools`、`permissions`、`toolsSettings`、`resources`、`hooks`、`includeMcpJson`、`model`、`keyboardShortcut`、`welcomeMessage`），与模型后端相关的只有 `model`（选模型 ID）一项。[@ref-kiro-agentref-fields]
3. 模型页说明 Kiro 通过 Amazon Bedrock 提供 OpenAI/Anthropic 等模型，模型由 Kiro 的模型服务下发，**没有**让用户指定后端地址或协议的入口。[@ref-kiro-models-regions][@ref-kiro-agentref-model]

**凭据**：CLI 只有两条获得模型访问权的路径——浏览器登录与会话 API key，二者都是 Kiro 账户凭据而非 provider 凭据：[@ref-kiro-auth-providers][@ref-kiro-auth-apikey]

- 浏览器登录支持 GitHub、Google、AWS Builder ID、AWS IAM Identity Center 与外部身份提供方，登录完成后在浏览器里把 Kiro 应用（GitHub 上显示为 **kirodotdev**）授权；远端机器（SSH/SSM/容器）用 device flow，CLI 显示 URL 与一次性代码。
- `KIRO_API_KEY`（形如 `ksk_...`）用于 CI/CD 与非交互运行；仅 Kiro Pro、Pro+、Pro Max、Power 订阅可用，管理员可在控制台关闭该能力。

**认证优先级**（官方明确）：1）来自 `kiro-cli login` 的活动浏览器会话 → 2）`KIRO_API_KEY` 环境变量 → 3）无凭据，CLI 提示登录。用 `kiro-cli whoami` 查看当前生效的认证方式。[@ref-kiro-auth-precedence]

官方 "Authentication" 表的 CLI 列显示：GitHub、Google、AWS Builder ID、AWS IAM Identity Center、外部身份提供方都可用于 CLI；表格中 **API key（CI/headless）一行只有 CLI 列打勾**——这是 CLI 独有的认证方式。[@ref-kiro-auth-providers]

MCP 配置里的 `headers`/`oauth` 是 **MCP server** 的凭据，不是模型 provider 的配置，详见 MCP 章节。[@ref-kiro-mcpfile-oauth]

**缺口**：`not_applicable` 的判定建立在"官方列举式参考文档未出现该机制"之上，而不是文档显式声明"不支持自定义 provider"。固定来源没有关于是否存在未公开环境变量或隐藏端点的说明，这一点保持未验证。

## 模型清单、选择与元数据 {#providers-models}

**模型 ID 与元数据清单**：模型页给出可用模型清单，字段为上下文窗口、相对 credit 倍数（以 Auto 为 1.0x 基准）、可用区域与订阅档位。摘录几行（官方 "Quick comparison" 表）：[@ref-kiro-models-comparison]

| 模型 | 上下文 | Cost | Regions |
| :-- | :--: | :--: | :-- |
| GPT-5.6 Sol / Terra / Luna | 1M | 4.4x / 2.2x / 1.1x | US, EU |
| Claude Opus 5.5 / 5 / 4.8 | 1M | 2.0x / 2.2x / 2.2x | US, EU |
| Claude Sonnet 5 | 1M | 1.3x | US, EU |
| Auto | — | 1.0x | US, EU |
| Claude Haiku 4.5 | 200K | 0.4x | US, EU |
| Qwen3 Coder Next | 256K | 0.05x | US, EU |

文档同时注明：**模型可用性会随国家或地区变化**，Kiro 的模型供给需对齐各提供方的使用与地理要求。[@ref-kiro-models-availability]

**切换**：

CLI 的切换方式：[@ref-kiro-models-switch]

- 在终端 UI 打开 `/model` 切换模型并配置所选模型的 thinking 与 effort；
- 命令行设默认模型：`kiro-cli settings chat.defaultModel claude-opus-4.8`；
- 会话内 `/model set-current-as-default` 把当前模型存为全局默认（写入 `~/.kiro/settings/cli.json`）。

**agent 级指定**：agent 配置的 `model` 字段指定该 agent 使用的模型 ID；该 ID 必须匹配 Kiro 模型服务返回的可用模型，否则回退到默认模型并给出警告；可用模型用会话内 `/model` 查看。V3 在会话启动时校验 agent 的 `model`，不可用则改用已保存的默认模型，否则用服务默认。[@ref-kiro-agentref-model]

**元数据**：上下文窗口、可用区域、credit 倍数等元数据由 Kiro 随模型清单提供（"Quick comparison" 表）；用户不能为模型定义或覆盖这些元数据，只能**选择**模型。[@ref-kiro-models-comparison]

**推理强度（effort）**：支持的模型可调 reasoning effort，用 `/model` 的 Effort 面板、`/effort LEVEL` 或 CLI 启动参数 `--effort` 设置；`/model` 里选的 effort 对该模型持久化，`/effort` 直接改只影响当前会话（需再 `/effort set-current-as-default` 才保存），V3 的 `--effort` 仅对本次会话有效；每模型的 effort 默认值存在 `chat.modelDefaults`。[@ref-kiro-models-effort][@ref-kiro-settings-chat]

**企业白名单**：管理员可在 Kiro 控制台开启 model access management，勾选允许的模型并设组织默认模型；开启后新模型不会自动对客户端可见，需要管理员加入白名单；名单改动需客户端重启会话或重新登录才加载。[@ref-kiro-modelgov-enable][@ref-kiro-modelgov-considerations]

`providers.metadata` 的已知部分就是上述上下文窗口/effort/区域元数据，**缺口**是：固定来源没有说明这些元数据如何被客户端消费（例如是否影响自动压缩阈值、如何映射到请求参数），也没有任何"用户自定义模型元数据"的入口。

## 请求、端点与响应处理 {#providers-requests}

Kiro 不暴露请求协议、端点形态或参数映射的配置，因此本小节的结论建立在"配置面为空"与"运行时固定"两点上：

- **端点与区域**：推理由 Amazon Bedrock 承载，使用跨区域推理在某个地理区（US 或 EU）内的多个 AWS Region 分发请求；请求由哪个地理区服务取决于**所选模型**与**Kiro profile 的区域**（GPT-5.6 系列一律由 US 服务，Claude Fable 5.1 仅 US East）。用户侧没有自定义 base URL 或 endpoint 参数。[@ref-kiro-models-regions]
- **请求的介入点**：官方 "Anatomy of a turn" 描述 harness 的请求循环是"装配上下文 → 模型规划 → 校验每个工具调用 → 执行工具 → 结果回灌 → 必要时压缩"，其中没有任何"用户可写的请求参数映射"环节。[@ref-kiro-harness-turn]
- **可配置的请求相关参数只有超时**：`api.timeout`（流式响应总超时，默认 3600 秒）、`api.streamIdleSoftTimeout`（流静止多久显示停滞警告，默认 60 秒）、`api.streamIdleHardTimeout`（流静止多久取消请求，默认 300 秒）、`api.subagentTimeout`（子 agent 空闲超时，默认 3600 秒）；这些都作用在客户端等待行为上，不是请求体字段。[@ref-kiro-settings-api]
- **响应侧**：无头模式下可用 `--output-format stream-json` 把运行事件以 JSON Lines 输出到 stdout（仅 V2/V3）；瞬时请求失败——限流、5xx、连接断开（含流中断）——由客户端自动按退避重试，无需配置。[@ref-kiro-headless-flags][@ref-kiro-settings-api]

**状态判定**：`providers.protocol` 与 `providers.forwarding` 记为 `not_applicable`——固定来源没有任何请求协议/端点/参数映射的配置入口，判定依据同上（列举式配置参考无相关条目）。`providers.responses` 记为 `partial`：流式输出、重试行为与超时有明确来源，但**工具调用协议、错误分类、以及"宿主对后端的约定"没有文档**——这是因为后端不由用户提供，官方只对 MCP/ACP 这类开放协议给出约定，对模型后端不给公开契约。

## 诊断 {#providers-diagnostics}

- **模型可选性**：会话内 `/model` 列出当前账号/组织可用的模型并切换；若某模型未出现，文档建议重启 Kiro CLI（企业白名单改动需重启会话或重新登录）。[@ref-kiro-models-switch][@ref-kiro-modelgov-considerations]
- **默认值与 effort**：`kiro-cli settings chat.defaultModel`、`chat.modelDefaults`、`chat.defaultAgent` 可用 `kiro-cli settings list --all` 与 `kiro-cli settings KEY` 读取。[@ref-kiro-settings-access][@ref-kiro-settings-chat]
- **配置可读性**：`/config` 在 V3 会话里给出生效配置与来源标签；`kiro-cli diagnostic` 生成诊断报告，`kiro-cli doctor` 做常见问题体检。[@ref-kiro-config-inspect][@ref-kiro-clicmd-diagnostic][@ref-kiro-clicmd-doctor]
- **凭据是否生效**：`kiro-cli whoami` 报告当前认证方式；无头运行缺凭据会直接失败，可用退出码（0 成功、1 一般失败、3 MCP 启动失败）在脚本里区分。[@ref-kiro-auth-precedence][@ref-kiro-exitcodes]
- **退出码**（脚本判定请求是否成功的依据）：`0` 成功、`1` 一般失败（认证错误、参数非法、操作失败）、`3` MCP 启动失败。[@ref-kiro-exitcodes]
- **缺口**：固定来源没有提供"请求实际发往哪个区域/端点""模型是否可用"之外的运行期诊断入口（例如请求日志、后端健康检查或错误码到 provider 的映射）。这些点保持未验证。
