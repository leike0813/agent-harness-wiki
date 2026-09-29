---
schema_version: 2
record_kind: production
edition_id: codex-cli-custom_providers-v2
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
  - section_id: providers-wire-models
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
    section_id: providers-wire-models
    status: answered
    source_refs:
      - ref-codex-cli-providers-wire-config
  - question_id: providers.models
    section_id: providers-wire-models
    status: partial
    source_refs:
      - ref-codex-cli-providers-model-config
      - ref-codex-cli-providers-oss-config
  - question_id: providers.metadata
    section_id: providers-wire-models
    status: partial
    source_refs:
      - ref-codex-cli-providers-config
  - question_id: providers.forwarding
    section_id: providers-wire-models
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

本主题的固定来源是官方配置参考快照（snapshot-codex-cli-configuration-doc）与 openai/codex 源码快照（snapshot-codex-repo，commit 67a7096）。文档快照的 version_applicability 为 unknown，没有证据把它绑定到 npm 包 @openai/codex 0.157.1，因此下文只陈述来源范围内的机制。

## Provider 定义、字段与认证 {#providers-entry-auth}

自定义 provider 在 `config.toml` 用 `[model_providers.ID]` 定义；内置 ID `openai`、`ollama`、`lmstudio` 保留且不可覆盖。项目级 `.codex/config.toml` 不能覆盖 `model_provider` 与 `model_providers`，这些键只能放用户级配置，写在项目层会被忽略。`oss_provider` 选择 `--oss` 时使用的本地 provider。[@ref-codex-cli-providers-config][@ref-codex-cli-providers-blocked-config][@ref-codex-cli-providers-oss-config]

一个只依赖环境变量取 key 的最小 provider，写入 `~/.codex/config.toml`：

```toml
model = "my-model"
model_provider = "my-provider"

[model_providers.my-provider]
name = "My Provider"
base_url = "https://api.example.com/v1"
wire_api = "responses"
env_key = "MY_PROVIDER_API_KEY"
```

字段：`name` 是显示名，`base_url` 是 API 基址，`wire_api` 指定协议，`env_key` 给出提供 API key 的环境变量名。前提是写在用户级配置，且该端点提供 Responses 形态；结果是 Codex 用这个 provider 发起请求。可观察的检查见本页诊断小节。[@ref-codex-cli-providers-config]

认证还有其他来源：`experimental_bearer_token` 可直接写 token（文档不鼓励）；`requires_openai_auth` 表示沿用 OpenAI 认证。若 token 由本地命令产出，用 `auth` 表：`auth.command`（必须把 token 打印到 stdout）、`auth.args`、`auth.timeout_ms`、`auth.refresh_interval_ms`、`auth.cwd`。该表不得与 `env_key`、`experimental_bearer_token`、`requires_openai_auth` 同时使用。[@ref-codex-cli-providers-auth-command-config][@ref-codex-cli-providers-config]

```toml
[model_providers.my-provider]
base_url = "https://api.example.com/v1"
wire_api = "responses"

[model_providers.my-provider.auth]
command = "/usr/local/bin/print-provider-token"
args = ["--profile", "default"]
timeout_ms = 5000
refresh_interval_ms = 300000
```

字段与检查：`command` 是本地命令，必须把 token 打印到 stdout，纯命令名经 `PATH` 解析；`args` 是传给它的参数；`timeout_ms` 是等待命令成功退出的上限；`refresh_interval_ms` 是缓存 token 的最长年龄，设 `0` 表示不主动刷新、只在 401 之后重跑；`cwd` 是运行该命令的工作目录。前提是它与 `env_key`、`experimental_bearer_token`、`requires_openai_auth` 三者互斥。结果是命令产出的 token 作为 bearer 用于该 provider 的请求。

## 协议、模型、能力与转发 {#providers-wire-models}

`wire_api` 只支持 `responses`，省略时也是该值，即自定义 provider 需提供 Responses 形态的端点。[@ref-codex-cli-providers-wire-config]

`model` 选默认模型，`model_provider` 选 provider id（默认 `openai`），`model_catalog_json` 可指向启动时加载的 JSON 模型目录，`oss_provider`（`lmstudio` 或 `ollama`）选本地 provider。本项状态 partial：固定来源没有说明模型 ID 与别名的定义规则，也没有说明模型列表如何刷新。[@ref-codex-cli-providers-model-config][@ref-codex-cli-providers-oss-config]

能力元数据状态 partial：config 侧可写的能力键包括 `model_context_window` 与 `model_auto_compact_token_limit`；provider 表里另有 `supports_websockets` 与 `supports_standalone_web_search` 等能力开关。固定来源没有集中说明上下文窗口、输出上限、视觉与推理强度等元数据项如何表达并生效。[@ref-codex-cli-providers-config]

可写的转发参数是 `query_params`（附加查询参数）、`http_headers`（静态 header）、`env_http_headers`（header 值取自环境变量）。一个只演示转发参数的完整块：[@ref-codex-cli-providers-headers-config][@ref-codex-cli-providers-config]

```toml
[model_providers.my-provider]
base_url = "https://api.example.com/v1"
query_params = { "api-version" = "2025-04-01-preview" }
http_headers = { "X-Example-Region" = "us-east-1" }
env_http_headers = { "X-Example-Token" = "MY_HEADER_TOKEN" }
```

字段与检查：`query_params` 追加到请求 URL，`http_headers` 是随每次请求发送的静态 header，`env_http_headers` 从环境变量取 header 值，变量未设置或为空时不发送该 header。前提是键名与取值符合目标后端的约定。结果是这些内容随每次请求发送。示例里的 `api.example.com` 与 `X-Example-*` 只是语法示意，固定来源不证明任何真实后端可用，无法据此验证连通性或请求成功。[@ref-codex-cli-providers-headers-config]

## 响应处理与诊断 {#providers-responses-diagnostics}

响应与重试状态 partial：`request_max_retries` 默认 4，`stream_max_retries` 默认 5，`stream_idle_timeout_ms` 默认 300000（毫秒）。固定来源没有描述工具调用与流式错误的语义，以及重试发生的具体条件。[@ref-codex-cli-providers-retries-config][@ref-codex-cli-providers-config]

诊断状态 partial：来源内可用的手段是把 `#:schema` 指向 `config-schema.json` 让编辑器校验键；固定来源没有把"配置可读 / 模型可选 / 请求已发送 / 后端可用"分成各自可判定的步骤，因此无法在来源内确定请求失败的具体环节。[@ref-codex-cli-providers-config]
