---
schema_version: 2
record_kind: production
edition_id: omp-custom_providers-v1
harness_id: omp
topic: custom_providers
title: OMP 自定义 Provider 机制
sections:
  - section_id: providers-config
    source_refs:
      - ref-omp-providers-custom-doc
      - ref-omp-models-file-doc
      - ref-omp-models-validation-doc
      - ref-omp-providers-cred-doc
  - section_id: providers-models
    source_refs:
      - ref-omp-models-fields-doc
      - ref-omp-models-discovery-doc
      - ref-omp-models-checks-doc
  - section_id: providers-runtime
    source_refs:
      - ref-omp-providers-retry-code
      - ref-omp-models-code
questions:
  - question_id: providers.entry
    section_id: providers-config
    status: answered
    source_refs:
      - ref-omp-providers-custom-doc
      - ref-omp-models-file-doc
      - ref-omp-models-validation-doc
  - question_id: providers.auth
    section_id: providers-config
    status: answered
    source_refs:
      - ref-omp-providers-cred-doc
  - question_id: providers.protocol
    section_id: providers-models
    status: answered
    source_refs:
      - ref-omp-models-fields-doc
  - question_id: providers.models
    section_id: providers-models
    status: answered
    source_refs:
      - ref-omp-models-discovery-doc
  - question_id: providers.metadata
    section_id: providers-models
    status: partial
    source_refs:
      - ref-omp-models-checks-doc
  - question_id: providers.forwarding
    section_id: providers-models
    status: partial
    source_refs:
      - ref-omp-models-fields-doc
  - question_id: providers.responses
    section_id: providers-runtime
    status: partial
    source_refs:
      - ref-omp-providers-retry-code
  - question_id: providers.diagnostics
    section_id: providers-runtime
    status: partial
    source_refs:
      - ref-omp-models-code
---
## Provider 配置入口与凭据 {#providers-config}

**providers.entry**：自定义 provider 与 model 写在用户级 `~/.omp/agent/models.yml`（或 models.yaml）的 providers 下，与内置 provider 共用选择、凭据解析与 disabledProviders 规则。默认路径先取 models.yml 再取 models.yaml；若两者都缺失而同目录存在 models.json，则迁移为 models.yml。 [@ref-omp-providers-custom-doc] [@ref-omp-models-file-doc] 完整 provider 必须给出 baseUrl、apiKey（除非 auth 为 none）以及 provider 级或每个 model 的 api。 [@ref-omp-models-validation-doc]

**providers.auth**：解析顺序为运行时覆盖（如 --api-key）优先，其后是 models.yml 中的 apiKey；后者刻意优先于已存 OAuth，以免把上游 OAuth 令牌转发给自定义网关。凭据是否可用仍需一次真实请求确认。 [@ref-omp-providers-cred-doc]

## 协议、模型与元数据 {#providers-models}

**providers.protocol**：provider 的 api 决定请求协议，models.yml 示例使用 openai-completions，其余允许值（openai-responses、anthropic-messages、google-generative-ai 等）列在官方文档。本章只对照字段形态，未发送真实请求。 [@ref-omp-models-fields-doc]

**providers.models**：模型条目必填 id；provider 可选 discovery，其 type 允许 ollama、llama.cpp、lm-studio、openai-models-list、proxy 或 litellm，而 provider 级 discovery 除 proxy 外要求 provider 级 api。模型的刷新时机与缓存本章未取证。 [@ref-omp-models-discovery-doc]

**providers.metadata**：contextWindow 与 maxTokens 若提供必须为正；maxContextWindow 是扩展上下文窗口，须为不小于 contextWindow 的正整数。这里改的是本地上下文预算，是否被端点接受仍需实测。 [@ref-omp-models-checks-doc]

**providers.forwarding**：可写参数（baseUrl、headers、compat、modelOverrides 等）会被合并进请求；transport 设为 pi-native 时该 provider 的全部模型改走 auth-gateway 的流式端点。字段到请求的完整映射未逐项取证，属部分结论。 [@ref-omp-models-fields-doc]

## 响应与诊断 {#providers-runtime}

**providers.responses**：认证失败与配额耗尽走上层 a/b/c 重试策略：先解析、再强制刷新同账号、最后轮换兄弟凭据；无兄弟凭据时停止并交由外层整轮重试。流式与工具调用的逐字节行为本章未验证。 [@ref-omp-providers-retry-code]

**providers.diagnostics**：models-config 校验会在定义模型却缺 baseUrl、缺 apiKey（除非 auth 为 none 或 oauth）或 model 缺 api 时报错，可作为“配置可读”的诊断。区分“模型可选、请求已发送、后端可用”需要运行请求，本轮未做。 [@ref-omp-models-code]
