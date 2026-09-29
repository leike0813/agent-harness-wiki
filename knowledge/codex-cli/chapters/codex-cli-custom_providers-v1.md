---
schema_version: 2
record_kind: production
edition_id: codex-cli-custom_providers-v1
harness_id: codex-cli
topic: custom_providers
title: "Codex CLI 主题章节：Custom providers"
sections:
  - section_id: providers-entry-auth
    source_refs:
      - ref-codex-cli-providers-config
      - ref-codex-cli-providers-blocked-config
      - ref-codex-cli-providers-auth-command-config
      - ref-codex-cli-providers-oss-config
  - section_id: providers-protocol-models
    source_refs:
      - ref-codex-cli-providers-wire-config
      - ref-codex-cli-providers-oss-config
      - ref-codex-cli-providers-model-config
      - ref-codex-cli-providers-headers-config
      - ref-codex-cli-providers-config
  - section_id: providers-responses-diagnostics
    source_refs:
      - ref-codex-cli-providers-retries-config
      - ref-codex-cli-providers-config
questions:
  - question_id: providers.entry
    section_id: providers-entry-auth
    status: answered
    source_refs:
      - ref-codex-cli-providers-config
      - ref-codex-cli-providers-blocked-config
  - question_id: providers.auth
    section_id: providers-entry-auth
    status: answered
    source_refs:
      - ref-codex-cli-providers-auth-command-config
      - ref-codex-cli-providers-config
  - question_id: providers.protocol
    section_id: providers-protocol-models
    status: answered
    source_refs:
      - ref-codex-cli-providers-wire-config
  - question_id: providers.models
    section_id: providers-protocol-models
    status: partial
    source_refs:
      - ref-codex-cli-providers-model-config
      - ref-codex-cli-providers-oss-config
  - question_id: providers.metadata
    section_id: providers-protocol-models
    status: partial
    source_refs:
      - ref-codex-cli-providers-config
  - question_id: providers.forwarding
    section_id: providers-protocol-models
    status: answered
    source_refs:
      - ref-codex-cli-providers-headers-config
      - ref-codex-cli-providers-config
  - question_id: providers.responses
    section_id: providers-responses-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-providers-retries-config
      - ref-codex-cli-providers-config
  - question_id: providers.diagnostics
    section_id: providers-responses-diagnostics
    status: partial
    source_refs:
      - ref-codex-cli-providers-config
---

## Provider 定义与认证 {#providers-entry-auth}

本节的固定来源是官方文档快照与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制，不把源码提交或未标版本的文档当作某个已安装包版本的行为。

**providers.entry**：自定义 provider 在 `config.toml` 用 `[model_providers.ID]` 定义；内置 ID `openai`、`ollama`、`lmstudio` 保留且不可覆盖。项目级 `.codex/config.toml` 不能覆盖 `model_provider` 与 `model_providers`，这些键只能放用户级配置，写在项目层会被忽略。`oss_provider` 选择 `--oss` 时使用的本地 provider。[@ref-codex-cli-providers-config][@ref-codex-cli-providers-blocked-config]

**providers.auth**：API key 优先用 `env_key` 指定环境变量；`experimental_bearer_token` 可直接写 token（文档不鼓励）；`requires_openai_auth` 表示沿用 OpenAI 认证。命令行取 token 的 `auth` 表可设 `auth.command`（必须把 token 打印到 stdout）、`auth.args`、`auth.timeout_ms`、`auth.refresh_interval_ms`、`auth.cwd`，且不得与 `env_key`、`experimental_bearer_token`、`requires_openai_auth` 同时使用。[@ref-codex-cli-providers-auth-command-config][@ref-codex-cli-providers-config]

## 协议与模型 {#providers-protocol-models}

**providers.protocol**：`wire_api` 只支持 `responses`，省略时也是该值；即自定义 provider 需提供 Responses 形态的端点。[@ref-codex-cli-providers-wire-config]

**providers.models**：`model` 选默认模型，`model_provider` 选 provider id（默认 `openai`），`model_catalog_json` 可指向启动时加载的 JSON 模型目录，`oss_provider`（`lmstudio` 或 `ollama`）选本地 provider。状态 partial：固定来源没有说明模型 ID 与别名的定义规则，也没有说明模型列表如何刷新。[@ref-codex-cli-providers-model-config][@ref-codex-cli-providers-oss-config]

**providers.metadata**：config 侧可写的能力键包括 `model_context_window`、`model_auto_compact_token_limit`；provider 表里另有 `supports_websockets` 与 `supports_standalone_web_search` 等能力开关。状态 partial：固定来源没有集中说明上下文窗口、输出上限、视觉与推理强度等元数据项如何表达并生效。[@ref-codex-cli-providers-config]

**providers.forwarding**：可写的转发参数为 `query_params`（附加 query）、`http_headers`（静态 header）、`env_http_headers`（header 值取自环境变量）。[@ref-codex-cli-providers-headers-config][@ref-codex-cli-providers-config]

## 响应处理与诊断 {#providers-responses-diagnostics}

**providers.responses**：`request_max_retries` 默认 4，`stream_max_retries` 默认 5，`stream_idle_timeout_ms` 默认 300000（毫秒）。状态 partial：固定来源没有描述工具调用与流式错误的语义、以及重试发生的具体条件。[@ref-codex-cli-providers-retries-config][@ref-codex-cli-providers-config]

**providers.diagnostics**：状态 partial。当前可观察面是把 `#:schema` 指向 `config-schema.json` 做键校验；固定来源没有把"配置可读 / 模型可选 / 请求已发送 / 后端可用"分成各自可判定的步骤，因此无法在来源内确定请求失败的具体环节。[@ref-codex-cli-providers-config]
