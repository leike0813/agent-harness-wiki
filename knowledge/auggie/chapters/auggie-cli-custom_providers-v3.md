---
schema_version: 3
record_kind: production
edition_id: auggie-cli-custom_providers-v3
harness_id: auggie
topic: custom_providers
title: "Auggie CLI 无自定义 Provider：模型目录、Prism 路由与凭据边界（1.x 文档线）"
sections:
  - section_id: providers-absence
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-models-catalog-20261003, ref-auggie-docs-models-prism-routing, ref-auggie-docs-reference-models, ref-auggie-docs-index-cli-20261003, ref-auggie-docs-models-choose, ref-auggie-docs-agents-models, ref-auggie-docs-models-compat, ref-auggie-docs-config-options, ref-auggie-docs-reference-flags, ref-auggie-1x-models-catalog-20261125, ref-auggie-1x-models-prism, ref-auggie-1x-reference-models, ref-auggie-1x-index-cli, ref-auggie-1x-settings-options, ref-auggie-1x-interactive-slash]
  - section_id: providers-auth-model
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-auth-about, ref-auggie-docs-auth-revoke, ref-auggie-docs-auth-session, ref-auggie-docs-auth-using, ref-auggie-docs-svc-create, ref-auggie-docs-svc-session, ref-auggie-1x-auth-login, ref-auggie-1x-auth-status, ref-auggie-1x-reference-auth, ref-auggie-1x-automation-auth]
  - section_id: providers-checks
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-index-cli-20261003, ref-auggie-docs-reference-flags, ref-auggie-docs-config-options, ref-auggie-docs-plugins-components, ref-auggie-repo-readme-quickstart, ref-auggie-1x-index-cli, ref-auggie-1x-reference-models, ref-auggie-1x-reference-tools, ref-auggie-1x-settings-options, ref-auggie-1x-plugins-components]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-1x-index-cli, ref-auggie-1x-reference-models, ref-auggie-1x-settings-options]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth-model
        status: not_applicable
        source_refs: [ref-auggie-1x-auth-login, ref-auggie-1x-auth-status, ref-auggie-1x-automation-auth]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-1x-reference-models, ref-auggie-1x-index-cli]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-1x-models-catalog-20261125, ref-auggie-1x-reference-models]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-1x-models-catalog-20261125, ref-auggie-1x-models-prism, ref-auggie-docs-models-compat]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-1x-reference-models, ref-auggie-1x-settings-options]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-1x-models-catalog-20261125, ref-auggie-1x-index-cli]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-checks
        status: not_applicable
        source_refs: [ref-auggie-1x-reference-models, ref-auggie-1x-index-cli]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档站模型页、CLI 参考页、Settings 页、Interactive 页与文档索引（页顶标注 1.x 文档线），以及官方仓库提交 `8bd7186ea04e77d11f63e5850482643c8767666b`。文档快照的 `version_applicability` 仍为 `unknown`，不证明任何具体 npm 版本；0.x 结论保留在原 v2 edition 与旧引用中。

## 机制不存在：模型由 Augment 托管 {#providers-absence}

1.x 的固定来源是官方文档站模型页、CLI 参考页、Settings 页、Interactive 页与文档索引。结论没有变化：Auggie 的 CLI 文档中不存在自定义 provider／自带模型后端（BYOK、base URL、第三方 API key）的机制，模型目录由 Augment 提供，CLI 只做选择。[@ref-auggie-1x-models-catalog-20261125][@ref-auggie-1x-reference-models][@ref-auggie-1x-index-cli]

- 1.x 的模型选择入口：交互模式的 `/model`（按 `Tab` 切换 reasoning effort），或启动时的 `--model "name"`（可写 `name:effort`，如 `sonnet:high`）；`--thinking EFFORT` 单独设 reasoning effort，`--models PATTERNS` 设循环的模型模式；列表通过 `auggie model list [search]`（`--json` 输出完整元数据）查看。0.x 的 `auggie models list --full-info` 形式属于旧版。[@ref-auggie-1x-reference-models][@ref-auggie-1x-interactive-slash]
- 可用模型清单由官方文档给出，全部是 Augment 提供并托管的模型，厂商覆盖 Anthropic、OpenAI、Google、xAI、Moonshot、Zhipu，以及 Augment 自有的 Prism 组合模型；文档没有提供新增模型或指向自建端点的途径。1.x 清单新增了 Claude Opus 5.5、Claude Haiku 5.5、DeepSeek V4.1 Flash／1017、Gemini 4 Argon／Neon、GPT-6.1 Terra、GPT-6 Sol／Luna、Grok 4.7 等条目，并移除了 GLM 5.2、Kimi K2.7 Code 等；清单随文档站变动，本章不复制整份清单。[@ref-auggie-1x-models-catalog-20261125]
- 可用性带条件：新模型只对符合条件的账号开放，被新版本取代的型号退到 **More** 菜单（如 Sonnet 5、GPT-6 Sol），部分模型有明确退役日期（Claude Haiku 4.5、Gemini 3.7 Flash），模型可见性还随订阅与组织设置变化。[@ref-auggie-1x-models-catalog-20261125][@ref-auggie-docs-models-choose]
- 模型元数据由 Augment 侧维护，可在本地观察但不可自定义：`auggie model list --json` 输出显示名、描述等结构化信息；文档的能力说明只声明“所有列出的模型都支持核心能力”（上下文引擎、工具调用、文件编辑、多步规划）。[@ref-auggie-1x-reference-models][@ref-auggie-docs-models-compat]

Prism 是目录里唯一带路由语义的条目，1.x 页面与 0.x 页面给出相同的两个选项：Prism（Claude + Gemini）在 Claude Opus 5、Claude Sonnet 5 与 Gemini 3.0 Flash 之间路由，Prism（GPT）在 GPT-5.6 Sol、GPT-5.6 Luna 以及一个 GPT-5.6 Luna solver 层之间路由。路由由 Augment 按任务、上下文与当前系统状况决定，用户侧没有可写的路由参数。[@ref-auggie-1x-models-prism][@ref-auggie-docs-models-prism-routing]

宿主没有暴露 provider 定义、协议、模型元数据或请求转发的配置面，因此本主题 8 道题在 1.x 下仍全部记 `not_applicable`；凭据一题记录的是 Augment 账号会话的边界，见下一节。[@ref-auggie-1x-index-cli][@ref-auggie-1x-settings-options][@ref-auggie-1x-reference-models]

## 凭据面：Augment 账号会话而非 provider 凭据 {#providers-auth-model}

Auggie 的凭据只有一条线：Augment 账号会话。

- 1.x 的登录命令是 `auggie auth login`（无浏览器机器加 `--headless`），登出是 `auggie auth logout`，状态是 `auggie auth status`；交互模式还可用 `/login`／`/logout`，未登录时启动会显示登录界面。[@ref-auggie-1x-auth-login][@ref-auggie-1x-auth-status]
- `auggie token print` 打印 session JSON，`auggie token revoke` 撤销该用户全部 token；自动化场景通过 `AUGMENT_SESSION_AUTH` 或 `--augment-session-json` 传入 session。[@ref-auggie-1x-reference-auth][@ref-auggie-1x-automation-auth]
- 服务账号场景：把 `~/.augment/session.json` 替换为服务账号内容，字段为 `accessToken`、`tenantURL`、`scopes`，`tenantURL` 取组织管理界面显示的值。[@ref-auggie-docs-svc-create][@ref-auggie-docs-svc-session]

这属于对 Augment 服务的认证，不是第三方模型 provider 的 key、base URL 或环境变量约定，因此 `providers.auth` 记为 `not_applicable`：不存在“把凭据交给自定义 provider”的配置面。[@ref-auggie-docs-auth-about][@ref-auggie-docs-auth-using]

**版本线**：0.x 的 `auggie login`／`auggie logout` 在 1.x 改为 `auggie auth login`／`auggie auth logout`；1.x 认证页另有一处自述写成 “In Auggie 1.x, `auggie auth login` and `auggie auth logout` are replaced by `auggie auth login` and `auggie auth logout`”，命令名前后重复，属于页面文案错误，不改变实际命令。[@ref-auggie-1x-auth-login]

## 检查过的入口与剩余缺口 {#providers-checks}

为确认机制缺失，逐项检查了 1.x 官方来源中所有可能承载 provider 配置的入口：

| 入口 | 检查结果 |
| :-- | :-- |
| 文档索引 `llms.txt` 的 CLI 页面清单 | 有 Settings、Subagents、Rules、Skills、Permissions、Plugins、Integrations and MCP、Hooks、Custom Commands、Interactive、Automation、Service Accounts、Cloud、ACP、SDK、CLI Flags 与 v0 旧版目录，没有 provider／BYOK 页面 [@ref-auggie-1x-index-cli] |
| CLI 参考页全部 flag 与子命令 | 模型相关只有 `--model`、`--thinking`、`--models`、`auggie model list`，没有端点或密钥参数 [@ref-auggie-1x-reference-models] |
| Settings 菜单与设置键 | General／Display 选项与 `defaultModel`、`defaultThinkingLevel`、`theme`、`shellPath`、`shellCommandPrefix`、`notificationMode`、`autoUpdate` 等，没有 provider 相关键 [@ref-auggie-1x-settings-options] |
| 工具与扩展面 | `--tools`／`--permission` 只控制内置工具与权限；插件可提供 commands／agents／hooks／skills／MCP servers，MCP 面向外部工具与数据源，不是模型后端 [@ref-auggie-1x-reference-tools][@ref-auggie-1x-plugins-components] |

**剩余缺口**：若组织自建 LLM 网关，CLI 文档没有描述相关设置；仓库也不含实现代码，无法从源码确认是否存在未文档化的 provider 面。以上结论只对固定来源成立。[@ref-auggie-1x-index-cli][@ref-auggie-repo-readme-quickstart]
