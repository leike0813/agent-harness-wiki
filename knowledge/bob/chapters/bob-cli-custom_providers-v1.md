---
schema_version: 3
record_kind: production
edition_id: bob-cli-custom_providers-v1
harness_id: bob
topic: custom_providers
title: "Bob Shell 的模型供应商：公开文档边界与凭据入口"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-bob-config-schema, ref-bob-config-schema-json, ref-bob-home-caps, ref-bob-changelog-idp, ref-bob-acp-flow]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-bob-install-sso, ref-bob-install-apikey, ref-bob-apikeys-types, ref-bob-apikeys-scope, ref-bob-acp-auth, ref-bob-slash-secrets]
  - section_id: providers-instances
    surface_ids: [cli]
    source_refs: [ref-bob-team-selection, ref-bob-team-persist, ref-bob-team-table, ref-bob-run-options, ref-bob-chat-options]
  - section_id: providers-protocol-models
    surface_ids: [cli]
    source_refs: [ref-bob-acp-flow, ref-bob-context-limits]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-bob-ts-debug, ref-bob-run-json, ref-bob-slash-builtin]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-scope
        status: unknown
        source_refs: [ref-bob-config-schema, ref-bob-home-caps]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: partial
        source_refs: [ref-bob-install-apikey, ref-bob-apikeys-types, ref-bob-acp-auth]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: unknown
        source_refs: [ref-bob-acp-flow]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-scope
        status: unknown
        source_refs: [ref-bob-changelog-idp]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: unknown
        source_refs: [ref-bob-context-limits]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-scope
        status: unknown
        source_refs: [ref-bob-config-schema-json]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: unknown
        source_refs: [ref-bob-acp-flow]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-bob-ts-debug, ref-bob-run-json]
---

## 供应商定义的调查范围与缺口 {#providers-scope}

Bob Shell 是 IBM Bob 的订阅式客户端：模型访问由 Bob 服务端提供，客户端文档没有描述“自定义模型供应商”这一机制。已检查的直接入口与结论如下。

- 设置文件的完整 schema 只有 `session`、`logging`、`tasks`、`telemetry` 四组键，没有 provider、base URL、模型端点或模型列表字段。[@ref-bob-config-schema][@ref-bob-config-schema-json]
- 能力清单页把可扩展面限定为命令、工具、MCP 与模式，未出现自建模型接入。[@ref-bob-home-caps]
- changelog 中唯一以 “provider” 命名的新特性是 custom identity provider（IdP），属于组织认证方式，不是模型供应商。[@ref-bob-changelog-idp]
- ACP 让 Bob 作为 agent 被编辑器连接，方向与“给 Bob 接第三方模型”相反。[@ref-bob-acp-flow]

因此本主题的多数问题只能记为 `unknown`：公开文档没有给出任何供应商定义格式、模型元数据字段或请求转发规则。要证明存在该机制，缺少的是官方文档中的 provider 配置 schema、模型清单命令与端点约定。

## Bob 自身凭据的提供方式 {#providers-auth}

Bob Shell 自身的鉴权有两种，都不属于自定义供应商，但决定了客户端如何拿到推理访问权：

- SSO / IBMid（默认）：首次运行或会话过期时在浏览器打开 `bob.ibm.com/login`，组织配置了 SSO 时跳转到企业登录页，否则走 IBMid；认证完成后回到终端即建立会话。[@ref-bob-install-sso]
- API key：适合自动化与 CI/CD。在 Bob 门户创建 `Inference` 作用域的 key，通过 `BOB_API_KEY` 环境变量提供；若使用 `general` 类型的 key，还必须额外传 `--team-id`。[@ref-bob-install-apikey][@ref-bob-apikeys-types]

API key 同时绑定用户与订阅实例，个人可自行创建/列出/吊销，实例管理员可管理本实例全部用户的 key。[@ref-bob-apikeys-scope] ACP 会话在初始化时鉴权：环境里存在 `BOBSHELL_API_KEY` 时直接使用，否则由编辑器触发一次 SSO 浏览器流程并复用保存的令牌。[@ref-bob-acp-auth] 另有 `~/.bob/settings/` 下加密保存的 secret，可用 `${KEY}` 在配置中引用，避免把凭据写进文件。[@ref-bob-slash-secrets]

## 订阅实例与团队的选择 {#providers-instances}

Bob Shell 没有自定义供应商，但确实存在“用哪个后端实例”的选择，由 `/team` 完成：它打开交互式对话框，列出可用实例与团队，可据此切换 IBM 实例、企业用户选择实例内的团队，并查看每个实例或团队的预算上限与当前用量；该选择跨会话保留。[@ref-bob-team-selection] 首次配置必须先选定实例才能使用 Bob Shell，此时 Esc 不可用；确认后鉴权自动刷新。[@ref-bob-team-persist]

选择界面的列（逐字取自 Team command 页 “Understanding the instance table”）：[@ref-bob-team-table]

| 列 | 含义 |
| :-- | :-- |
| INSTANCE | IBM 实例名 |
| PLAN | 订阅计划类型 |
| TEAM | 团队名（仅企业用户） |
| BUDGET | 预算上限：数字、∞（不限）或 n/a |
| USAGE | 当前用量，保留 2 位小数 |

命令行侧对应 `--team-id`（使用 `general` 类型 API key 时必填）与 `--instance-id`（`bob chat` 附加到指定的命名实例）。[@ref-bob-run-options][@ref-bob-chat-options]

## 协议、模型与请求形态 {#providers-protocol-models}

客户端文档没有公开推理请求的端点形态、协议约定、模型 ID 或模型别名规则，也没有模型列表的刷新方式；这些内容由服务端决定，未在 Bob Shell 文档中出现。

可确认的边界只有两条：一是 ACP 时编辑器作为 client、Bob 提供 runtime（模型访问、工具、MCP、shell 执行），协议为 JSON-RPC，走 stdin/stdout。[@ref-bob-acp-flow] 二是模型侧的能力常量在客户端可见的部分是上下文窗口：会话上限 270,000 token，约 190,000 token 时开始自动压缩。[@ref-bob-context-limits] 除此之外模型元数据（输出上限、视觉、推理强度等）在公开文档中未建立。

## 诊断入口 {#providers-diagnostics}

把“配置可读、模型可选、请求已发出、后端可用”分开观察，官方文档只覆盖后两者一部分：

- 日志：`--log-level debug` 或 `BOB_LOG_LEVEL=debug` 可打开详细输出，日志写到 `~/.bob/logs/shell/`。[@ref-bob-ts-debug]
- 非交互运行的 `--format json` 会在会话结束时给出 `stats`（总 token、输入/输出 token、缓存读写与命中率、耗时、花费、工具调用数）与 `status`（`success` / `error`），可据此判断请求是否真正完成。[@ref-bob-run-json]
- 交互会话里 `/status`（别名 `/info`）查看会话状态、用量与版本，`/logs` 打开最新日志。[@ref-bob-slash-builtin]

缺少的入口：没有可查询“当前使用哪个模型/哪个供应商”的命令，也没有把模型请求失败与配置错误区分的诊断说明；模型选择是否可由组织限制的问题只出现在 FAQ 的目录标题中，公开文档没有给出答案正文。
