---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-custom_providers-v1
harness_id: rovodev
topic: custom_providers
title: "Rovo Dev CLI 的模型与凭据：不提供自定义 Provider"
sections:
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-rovodev-models-switch, ref-rovodev-models-credits, ref-rovodev-config-agent]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-rovodev-install-req, ref-rovodev-install-acli, ref-rovodev-install-auth, ref-rovodev-install-token, ref-rovodev-config-billing]
  - section_id: providers-no-custom
    surface_ids: [cli]
    source_refs: [ref-rovodev-config-options, ref-rovodev-config-agent, ref-rovodev-commands-interactive, ref-rovodev-mcp-atlassian]
  - section_id: providers-runtime
    surface_ids: [cli]
    source_refs: [ref-rovodev-config-agent, ref-rovodev-config-options]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-models-switch, ref-rovodev-commands-interactive, ref-rovodev-help-interactive, ref-rovodev-config-logging]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-no-custom
        status: not_applicable
        source_refs: [ref-rovodev-config-options, ref-rovodev-config-agent]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: partial
        source_refs: [ref-rovodev-install-auth, ref-rovodev-install-token, ref-rovodev-config-billing]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-no-custom
        status: not_applicable
        source_refs: [ref-rovodev-config-options, ref-rovodev-mcp-atlassian]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-rovodev-models-switch, ref-rovodev-config-agent]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-rovodev-models-credits, ref-rovodev-config-agent]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-runtime
        status: partial
        source_refs: [ref-rovodev-config-agent]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-no-custom
        status: unknown
        source_refs: []
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-rovodev-help-interactive, ref-rovodev-commands-interactive]
---

固定来源范围：本章依据 Atlassian 官方支持文档《Switch between large language models in Rovo Dev CLI》《Manage Rovo Dev CLI settings》《Install and run Rovo Dev CLI on your device》《Rovo Dev and Model Context Protocol (MCP)》《Rovo Dev CLI commands》《Get help in Rovo Dev CLI》的固定快照。Rovo Dev CLI 为闭源产品，`surface_id: cli`；官方页面未标注适用的软件版本，本章为来源级知识。

结论先行：固定来源中**不存在用户自定义 provider（模型供应商/端点）的机制**。Rovo Dev CLI 的模型由 Atlassian 侧提供，用户在官方列出的模型之间切换，配置里只有单个模型 ID 选项；没有 base URL、API key、请求协议、模型列表发现规则等第一方字段。

逐题结论一览：

| 固定问题 | 状态 | 结论 |
| --- | --- | --- |
| `providers.entry` | not_applicable | 配置中没有 provider/端点字段；模型固定由宿主提供 |
| `providers.auth` | partial | 凭据来自 Atlassian 账号与 scoped API token；存放/刷新未文档化 |
| `providers.protocol` | not_applicable | 无用户可写的请求协议或兼容层配置 |
| `providers.models` | partial | 只有 `modelId`（默认 `auto`）与 `/models` 清单，无自定义模型规则 |
| `providers.metadata` | partial | 只有 credit multiplier 在界面显示；无上下文窗口等元数据字段 |
| `providers.forwarding` | partial | 只有 `streaming`/`temperature`/`modelId`/`enableDeepPlanTool` 可写 |
| `providers.responses` | unknown | 流式、工具调用、错误与重试的后端约定未文档化 |
| `providers.diagnostics` | partial | `/models`、`/status`、`/usage` 可观察；无请求级诊断 |

## 模型选择 {#providers-models}

Rovo Dev CLI 提供若干大语言模型（LLM），在交互模式下用 `/models` 切换。[@ref-rovodev-models-switch] 配置文件 `agent` 段中的 `modelId` 用于指定「agent 使用的模型 ID」，默认值为 `"auto"`：[@ref-rovodev-config-agent]

```yaml
agent:
  # Model ID to use for the agent (default: "auto")
  modelId: "auto"
```

也就是说可配置的粒度是「选哪个已有模型」，而不是「定义一个新模型或新后端」。每个模型带有自己的 Rovo Dev credit multiplier（按复杂度、速度和推理深度区分，例如 1.5x 表示比默认模型多用 50% 额度），乘数在 `/models` 中显示。[@ref-rovodev-models-credits]

元数据边界：固定来源只提供「模型名 + credit multiplier」这一层信息；上下文窗口、输出上限、视觉能力、工具调用能力或推理强度等元数据字段**在配置与文档中都不存在**，也没有模型清单的发现或刷新规则。[@ref-rovodev-models-credits]

固定来源也没有给出模型 ID 的完整取值清单、别名规则、自定义模型 ID 的支持情况，以及 `modelId` 与 `/models` 交互选择之间的覆盖关系（谁是持久化的、谁只作用于当前会话）——`/models` 菜单是查看可用清单的实际入口。[@ref-rovodev-models-switch]

## 凭据与计费 {#providers-auth}

**前置条件**：使用 Rovo Dev CLI 需要某个站点已激活 Rovo Dev，并拥有 Rovo Dev credits 配额（额度所在站点可在启动 Rovo Dev CLI 时指定）。[@ref-rovodev-install-req]

**安装与授权**：Rovo Dev CLI 是 Atlassian Command Line Interface (ACLI) 的扩展，先安装/升级 ACLI，再创建 scoped API token，然后用 Atlassian 账号授权并启动：[@ref-rovodev-install-acli]

```bash
# 1) 用 scoped API token 授权（token 在 Atlassian 个人资料页面创建）
acli rovodev auth login

# 2) 打开交互模式
acli rovodev run
```

token 通过 Atlassian 个人资料页面的 "Create API token with scopes" 创建，需选择 Rovo Dev 应用及一组作用域（如 `chat:rovodev`、`manage:jira-project`、`read:analytics:rovodev`、`read:jira-work`、`read:rovodev:limits`、`search:rovo:mcp`、`write:page:confluence` 等）；凭据只通过 `acli rovodev auth login` 的账号授权流程与 token 提供，不写进配置文件，示例中只应出现占位值。[@ref-rovodev-install-auth][@ref-rovodev-install-token]

**计费站点**：配置文件中的 `atlassianBillingSite` 指定消耗哪个站点的额度：[@ref-rovodev-config-billing]

```yaml
atlassianBillingSite:
  siteUrl: "https://yoursite.atlassian.net"
  cloudId: "your-cloud-id"
```

固定来源没有说明 token 的本地存放位置与刷新方式、`auth login` 是否支持无浏览器/CI 场景、额度耗尽时的错误表现，也没有给出不同作用域组合的差异说明。本章不对未文档化的凭据存储作断言。

## 无自定义 provider 的边界 {#providers-no-custom}

配置文件被明确描述为「YAML 层级结构，所有参数可选，未指定时使用合理默认值」。[@ref-rovodev-config-options] 官方列出的顶层配置段为 `agent`、`sessions`、`atlassianConnections`、`console`、`logging`、`mcp`、`toolPermissions`、`atlassianBillingSite`：其中没有任何 provider、endpoint、apiKey、baseUrl 或协议相关段；与请求相关的可写项只有 `agent` 段的 `streaming`、`temperature`、`modelId`、`enableDeepPlanTool`（以及标注为 internal users 的两个 `experimental` 开关）。[@ref-rovodev-config-agent]

命令层面同样没有 provider 或凭据管理命令：官方命令表列出的与模型相关的入口只有 `/models`（切换模型）、`/usage`（查看 credit 用量）、`/usage site`（切换额度站点）与 `/status`（显示账号、版本与模型），没有 `provider add`、端点配置或自定义模型注册命令。[@ref-rovodev-commands-interactive]

外部能力是通过 MCP 接入的，而不是通过自定义模型后端：Rovo Dev CLI 自动连接 Atlassian MCP server，用户也可连接第三方 MCP server 扩展数据源与工具。[@ref-rovodev-mcp-atlassian]

因此：

- 不存在用户可定义的 provider 条目、作用域或字段；
- 不存在用户可写的请求协议/兼容层配置，接入第三方能力的原生路径是 MCP，而不是换一个模型后端；
- 模型 ID 只能选宿主提供的清单（`/models`），没有自定义模型 ID 的发现或刷新规则。

## 运行期可写的请求级选项 {#providers-runtime}

配置里能影响单次模型请求的字段只有 `agent` 段的四个：`streaming`（默认 `true`，是否流式返回响应）、`temperature`（默认 `0.3`，范围 0.0–1.0）、`modelId`（默认 `"auto"`）与 `enableDeepPlanTool`（默认 `false`，是否启用深度规划工具）。[@ref-rovodev-config-agent]

官方没有说明这些值如何映射到后端请求（例如 `streaming: false` 是否改写请求体、`temperature` 是否原样透传）、哪些只影响界面呈现（例如 `console.outputFormat`、`console.showToolResults` 属于纯显示层），也没有提供自定义 HTTP 头、超时或重试参数。[@ref-rovodev-config-options]

因此 `providers.forwarding` 只能确认「配置中可写哪些参数」，不能确认「它们如何映射到请求」。

## 诊断 {#providers-diagnostics}

- `/models`：查看并切换可用模型，同时显示每个模型的 credit multiplier，是「模型可选」的直接观察点。[@ref-rovodev-models-switch]
- `/status`：显示 CLI 状态、版本、账号信息与当前模型；`/usage` 显示 credit 用量，`/usage site` 切换额度站点。[@ref-rovodev-commands-interactive]
- `/help` 后接查询词、或具体命令的 `help` 子命令：查询具体命令的用法。[@ref-rovodev-help-interactive]
- 通用日志：`logging.path` 默认 `~/.rovodev/logs/rovodev.log`，可作为运行期错误的观察落点，但固定来源未说明其中是否包含模型请求信息。[@ref-rovodev-config-logging]

**缺口**：固定来源没有提供后端请求级诊断（如「请求已发出」「后端返回错误」的区分）、错误重试策略、流式响应与工具调用的后端约定，也没有给出模型清单的刷新方式。这些点在 CLI 上只能通过会话输出与 `/status` 间接观察，本章不作断言。
