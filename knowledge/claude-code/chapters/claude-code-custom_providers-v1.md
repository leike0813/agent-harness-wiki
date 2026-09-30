---
schema_version: 3
record_kind: production
edition_id: claude-code-custom_providers-v1
harness_id: claude-code
topic: custom_providers
title: Claude Code 的模型入口、鉴权与前向
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-envpair
      - ref-cc-config-onesession
      - ref-cc-mcp-credential
      - ref-cc-skills-frontmatter
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-exceptions
      - ref-cc-mcp-credential
      - ref-cc-mcp-toolsearch
      - ref-cc-skills-frontmatter
  - section_id: providers-responses
    surface_ids: [cli]
    source_refs:
      - ref-cc-config-envpair
      - ref-cc-config-confirm
      - ref-cc-mcp-toolsearch
      - ref-cc-npm-readme
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs:
          - ref-cc-config-envpair
          - ref-cc-config-onesession
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs:
          - ref-cc-mcp-credential
          - ref-cc-skills-frontmatter
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs:
          - ref-cc-config-envpair
          - ref-cc-skills-frontmatter
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: unknown
        source_refs:
          - ref-cc-mcp-toolsearch
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: unknown
        source_refs: []
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: partial
        source_refs:
          - ref-cc-config-exceptions
          - ref-cc-mcp-credential
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-responses
        status: unknown
        source_refs: []
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-responses
        status: partial
        source_refs:
          - ref-cc-config-confirm
          - ref-cc-mcp-toolsearch
---

## 模型入口、鉴权与模型清单 {#providers-entry}

固定来源没有名为 provider 的第一方注册机制，本节只写模型选择、鉴权与内建第三方 provider 的边界。

**providers.entry**：可配置入口位于模型的“选择”层，而不是 provider 注册层。设置键 `model`、命令行 `--model` 与环境变量 `ANTHROPIC_MODEL` 是三种入口；环境变量不是配置层级里的一档，而是按键成对决定优先级：`ANTHROPIC_MODEL` 覆盖任何文件中的 `model` 键，`ANTHROPIC_DEFAULT_MODEL` 只在没有任何文件设置 `model` 时生效。内建还直接支持 Amazon Bedrock、Google Cloud 的 Agent Platform、Microsoft Foundry 这类第三方 provider，会话的鉴权方式决定是否可用。 [@ref-cc-config-envpair] [@ref-cc-config-onesession]

**providers.auth**：凭据来源包括 `ANTHROPIC_API_KEY`、`ANTHROPIC_AUTH_TOKEN`、`apiKeyHelper` 脚本、`CLAUDE_CODE_OAUTH_TOKEN` 以及 `/login` 保存的登录；`apiKeyHelper` 位于 settings 中并随设置文件热重载。为避免把本机凭据发往被写死的端点，远程 MCP server 的 `url`/`headers` 中一批凭据变量（含 `ANTHROPIC_AUTH_TOKEN`、`AWS_BEARER_TOKEN_BEDROCK`）按空值处理，`:-default` 也无效；`ANTHROPIC_BASE_URL` 这类基址变量仍会展开。 [@ref-cc-mcp-credential] [@ref-cc-skills-frontmatter]

**providers.models**：模型 ID 与别名来自 `/model` 的取值集合，组织可用 `availableModels` 白名单约束 `/model`、`--model` 与文件里的 `model` 键；`fallbackModel` 是有序回退链，`modelPicker` 是有序列表加替换标志，`modelSettings` 按模型逐项解析。技能可用 `model` 与 `effort` 字段在调用期间覆盖会话值，技能里的 `model` 与子代理模型覆盖遵循同一套白名单规则。 [@ref-cc-config-envpair] [@ref-cc-skills-frontmatter]

## 协议、元数据与前向 {#providers-protocol}

**providers.protocol**：所引固定来源没有给出注册全新协议 provider 的契约，也没有自定义端点形态的说明，因此本库不能声明支持的请求协议。可观察的相关事实只有：`ANTHROPIC_BASE_URL` 可指向非第一方代理主机，此时 Claude Code 默认关闭 tool search，因为多数代理不转发 `tool_reference` 块；这一行为不构成一个通用 provider 协议定义。 [@ref-cc-mcp-toolsearch]

**providers.metadata**：所引固定来源没有描述上下文窗口、输出上限、工具能力、视觉或推理强度等模型元数据的声明或刷新机制；出现的 `effortLevel`、`modelSettings` 只是选择与强度设置，不是 provider 能力元数据契约。已检查的直接入口是设置页的模型相关键与技能 frontmatter，均未覆盖该契约。

**providers.forwarding**：可写参数如何进入请求，只明确到配置层：`env` 块按普通设置键遵循层级优先级；环境变量与设置键按键成对决定谁生效；当嵌入宿主设置 `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` 时，宿主提供的模型配置会覆盖所有 managed 来源的 `model`、`fallbackModel`、`modelPicker`、`modelOverrides` 以及 managed `env` 中的 `ANTHROPIC_MODEL` 与 `ANTHROPIC_DEFAULT_*_MODEL` 变量。请求体层如何映射未在所引来源中出现。 [@ref-cc-config-exceptions] [@ref-cc-mcp-credential]

## 响应处理与诊断 {#providers-responses}

**providers.responses**：所引固定来源没有描述流式、工具调用、错误与重试的 provider 约定，也没有后端必须满足的返回格式。已检查入口为设置页的模型与环境变量条目、MCP 页的代理说明，均未覆盖；这是明确缺口。

**providers.diagnostics**：`/status` 可显示当前生效的设置来源行，从而确认鉴权方式来自 `/login` 还是 `ANTHROPIC_API_KEY`、`apiKeyHelper` 等环境变量；当 `/mcp` 缺少某个 connector 时，文档建议用 `/status` 确认生效的鉴权方式。tool search 是否因自定义 `ANTHROPIC_BASE_URL` 被关闭也可作为“配置已读到代理”的旁证。区分“请求已发送”与“后端实际可用”没有专门的入口。 [@ref-cc-config-confirm] [@ref-cc-mcp-toolsearch]

关于版本：本章所引设置页与 MCP 页均未标注适用版本，`version_applicability` 为 unknown。选定的 npm 包快照记录版本 2.1.283，包内 README 只指向在线文档，不能据此把这些入口固定到该精确版本。 [@ref-cc-npm-readme]

