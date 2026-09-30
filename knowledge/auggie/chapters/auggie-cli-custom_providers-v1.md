---
schema_version: 3
record_kind: production
edition_id: auggie-cli-custom_providers-v1
harness_id: auggie
topic: custom_providers
title: "Auggie CLI 无自定义 Provider：固定来源证据与凭据边界"
sections:
  - section_id: providers-absence
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-models-current, ref-auggie-docs-reference-models, ref-auggie-docs-index-cli, ref-auggie-docs-models-choose, ref-auggie-docs-agents-models, ref-auggie-docs-models-compat, ref-auggie-docs-config-options, ref-auggie-docs-reference-flags]
  - section_id: providers-auth-model
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-auth-about, ref-auggie-docs-auth-revoke, ref-auggie-docs-auth-session, ref-auggie-docs-auth-using, ref-auggie-docs-svc-create, ref-auggie-docs-svc-session]
  - section_id: providers-checks
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-index-cli, ref-auggie-docs-reference-flags, ref-auggie-docs-config-options, ref-auggie-docs-plugins-components, ref-auggie-repo-readme-quickstart]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-docs-index-cli, ref-auggie-docs-reference-flags, ref-auggie-docs-config-options]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth-model
        status: not_applicable
        source_refs: [ref-auggie-docs-auth-about, ref-auggie-docs-auth-using, ref-auggie-docs-svc-session]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-docs-reference-flags, ref-auggie-docs-index-cli]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-docs-models-current, ref-auggie-docs-reference-models]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-docs-models-current, ref-auggie-docs-config-options]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-docs-reference-flags, ref-auggie-docs-config-options]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-absence
        status: not_applicable
        source_refs: [ref-auggie-docs-models-current, ref-auggie-docs-index-cli]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-checks
        status: not_applicable
        source_refs: [ref-auggie-docs-reference-flags, ref-auggie-docs-index-cli]
---

## 机制不存在：模型由 Augment 托管 {#providers-absence}

固定来源是官方文档站 `docs.augmentcode.com` 的 CLI 页面、CLI 参考页、模型页与文档索引，以及官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff`。结论：Auggie 的 CLI 文档中不存在自定义 provider／自带模型后端（BYOK、base URL、第三方 API key）的机制，模型目录由 Augment 提供，CLI 只做选择。[@ref-auggie-docs-models-current][@ref-auggie-docs-reference-models][@ref-auggie-docs-index-cli]

- 模型选择入口只有两个：交互模式的 `/model`，或启动时的 `--model "name"`，取值是 “available models” 列表中的长名或短名；列表本身通过 `auggie models list`（可选 `--json`、`--full-info`）查看。[@ref-auggie-docs-models-choose][@ref-auggie-docs-reference-models]
- 可用模型清单由官方文档给出，全部是 Augment 提供并托管的模型（Anthropic、OpenAI、Google、xAI、Moonshot、Zhipu，以及 Augment 自有的 Prism 组合模型）；文档没有提供新增模型或指向自建端点的途径。[@ref-auggie-docs-models-current]
- 模型选择是会话级／组织级行为：不选择时使用上次选择或组织设定的默认值；可用性随订阅与组织设置变化。[@ref-auggie-docs-models-choose][@ref-auggie-docs-agents-models]

模型元数据由 Augment 侧维护，可在本地观察但不可自定义：`auggie models list --full-info` 输出的结构化 JSON 包含显示名、描述、成本档位、effort 级别与账号默认模型；文档的能力说明只声明“所有列出的模型都支持核心能力”（上下文引擎、工具调用、文件编辑、多步规划），并提示不同模型在措辞或风格上可能有细微差异。Prism 组合模型由 Augment 按任务与上下文在受控模型族内路由，用户侧没有可写的路由参数。[@ref-auggie-docs-reference-models][@ref-auggie-docs-models-compat][@ref-auggie-docs-models-choose]

因此本主题 8 道题中，除凭据相关两题外都记 `not_applicable`：宿主没有暴露 provider 定义、协议、模型元数据或请求转发的配置面。[@ref-auggie-docs-index-cli][@ref-auggie-docs-config-options][@ref-auggie-docs-reference-flags]

## 凭据面：Augment 账号会话而非 provider 凭据 {#providers-auth-model}

Auggie 的凭据只有一条线：Augment 账号会话。

- 交互式登录 `auggie login` 在本地保存 token；`auggie logout` 移除本地 token；`auggie token revoke` 撤销该用户全部 token。[@ref-auggie-docs-auth-about][@ref-auggie-docs-auth-revoke]
- 自动化场景不交互登录：`auggie token print` 打印 session JSON，再通过环境变量 `AUGMENT_SESSION_AUTH` 或 `--augment-session-json` 传入；文档提示 token 是敏感凭据、按用户而非团队绑定。[@ref-auggie-docs-auth-session][@ref-auggie-docs-auth-using]
- 服务账号场景：把 `~/.augment/session.json` 替换为服务账号内容，字段为 `accessToken`、`tenantURL`、`scopes`，`tenantURL` 取组织管理界面显示的值。[@ref-auggie-docs-svc-create][@ref-auggie-docs-svc-session]

这属于对 Augment 服务的认证，不是第三方模型 provider 的 key、base URL 或环境变量约定，因此 `providers.auth` 记为 `not_applicable`：不存在“把凭据交给自定义 provider”的配置面。[@ref-auggie-docs-auth-about][@ref-auggie-docs-auth-using]

## 检查过的入口与剩余缺口 {#providers-checks}

为确认机制缺失，逐项检查了官方来源中所有可能承载 provider 配置的入口：

| 入口 | 检查结果 |
| :-- | :-- |
| 文档索引 `llms.txt` 的 CLI 页面清单 | 有 Skills、Subagents、MCP、Hooks、Plugins、Permissions、Rules、Config、Reference、Models 等页面，没有 provider／BYOK 页面 [@ref-auggie-docs-index-cli] |
| CLI 参考页全部 flag 与子命令 | 只有 `--model` 选择模型、`auggie models list` 列举模型，没有端点或密钥参数 [@ref-auggie-docs-reference-flags] |
| 配置向导所列设置项 | shell、startup script、chat input completions、auto-update、theme、notifications，没有 provider 相关键 [@ref-auggie-docs-config-options] |
| 插件与 MCP 的扩展面 | 插件可提供 commands／agents／rules／hooks／skills／MCP servers；MCP 面向外部工具与数据源，不是模型后端 [@ref-auggie-docs-plugins-components][@ref-auggie-docs-index-cli] |

**剩余缺口**：若组织自建 LLM 网关，CLI 文档没有描述相关设置；仓库也不含实现代码，无法从源码确认是否存在未文档化的 provider 面。以上结论只对固定来源成立。[@ref-auggie-docs-index-cli][@ref-auggie-repo-readme-quickstart]
