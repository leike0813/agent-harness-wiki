---
schema_version: 2
record_kind: production
edition_id: pi-custom_providers-v1
harness_id: pi
topic: custom_providers
title: Pi 自定义 Provider：models.json 与扩展注册（固定源码 781152f）
sections:
  - section_id: providers-entry
    source_refs:
      - ref-pi-models-json
      - ref-pi-cp-quick
      - ref-pi-models-merge
  - section_id: providers-runtime
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-providers-auth
      - ref-pi-cp-auth
      - ref-pi-models-values
      - ref-pi-cp-apis
      - ref-pi-models-config
      - ref-pi-cp-stream
      - ref-pi-models-json
      - ref-pi-cp-quick
      - ref-pi-models-reload
  - section_id: providers-behavior
    source_refs:
      - ref-pi-cp-apis
      - ref-pi-models-merge
      - ref-pi-models-config
      - ref-pi-cp-stream
      - ref-pi-cp-quick
      - ref-pi-providers-resolution
      - ref-pi-models-reload
      - ref-pi-models-values
questions:
  - question_id: providers.entry
    section_id: providers-entry
    status: answered
    source_refs:
      - ref-pi-models-json
      - ref-pi-cp-quick
      - ref-pi-models-merge
  - question_id: providers.auth
    section_id: providers-runtime
    status: answered
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-providers-auth
      - ref-pi-cp-auth
      - ref-pi-models-values
  - question_id: providers.protocol
    section_id: providers-runtime
    status: answered
    source_refs:
      - ref-pi-cp-apis
      - ref-pi-models-config
      - ref-pi-cp-stream
  - question_id: providers.models
    section_id: providers-runtime
    status: answered
    source_refs:
      - ref-pi-models-json
      - ref-pi-cp-quick
      - ref-pi-models-reload
      - ref-pi-models-config
  - question_id: providers.metadata
    section_id: providers-runtime
    status: answered
    source_refs:
      - ref-pi-models-config
      - ref-pi-cp-apis
  - question_id: providers.forwarding
    section_id: providers-behavior
    status: partial
    source_refs:
      - ref-pi-cp-apis
      - ref-pi-models-merge
      - ref-pi-models-config
  - question_id: providers.responses
    section_id: providers-behavior
    status: partial
    source_refs:
      - ref-pi-cp-stream
      - ref-pi-cp-quick
  - question_id: providers.diagnostics
    section_id: providers-behavior
    status: partial
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-models-reload
      - ref-pi-models-values
      - ref-pi-cp-quick
body: |-
  Pi 的 provider 扩展有两层：`~/.pi/agent/models.json` 的声明式配置，以及扩展里的 `pi.registerProvider`。以下机制来自固定来源的文档，未做运行观察，也未与任何精确 npm 版本建立映射。

  ## 入口与合并 {#providers-entry}

  **providers.entry**：两条第一方入口：`~/.pi/agent/models.json` 里的 providers 映射，以及扩展中的 `pi.registerProvider(name, config)`。[@ref-pi-models-json][@ref-pi-cp-quick] models.json 里自定义模型按 id 并入 provider：同名替换内置模型，新 id 追加，内置模型保留。[@ref-pi-models-merge]

  ## 协议、凭据、模型与元数据 {#providers-runtime}

  **providers.auth**：凭据解析顺序为 CLI 的 `--api-key`、`auth.json`（API key 或 OAuth）、环境变量、models.json 的自定义 provider key。[@ref-pi-providers-resolution] `~/.pi/agent/auth.json` 权限为 0600，key 支持 `!command`（执行取 stdout）、环境变量名与字面值三种形式，内置 provider 有对应环境变量表。[@ref-pi-providers-auth] 扩展 provider 可用 `authHeader: true` 自动加 Authorization Bearer 头，或用 `oauth` 接入 `/login`。[@ref-pi-cp-auth] models.json 的 `!command` 在请求时求值，Pi 不内置 TTL 或回退；`/model` 的可用性检查只看是否存在鉴权而不执行命令。[@ref-pi-models-values]

  **providers.protocol**：`api` 字段决定流式实现，可选 anthropic-messages、openai-completions、openai-responses、azure-openai-responses、openai-codex-responses、mistral-conversations、google-generative-ai、google-vertex、bedrock-converse-stream。[@ref-pi-cp-apis] models.json 另列四种可写类型（openai-completions、openai-responses、anthropic-messages、google-generative-ai），可在 provider 或 model 级设置，google-generative-ai 的自定义模型必须给 baseUrl。[@ref-pi-models-config] 非标准 API 需在扩展里实现 `streamSimple`。[@ref-pi-cp-stream]

  **providers.models**：models.json 中每个模型最少只需 id，缺省 name 取 id 并用于匹配与显示。[@ref-pi-models-json][@ref-pi-models-config] 也可用 async 扩展工厂在启动前 fetch 远程列表并注册，结果对 `pi --list-models` 可见。[@ref-pi-cp-quick] 文件在每次打开 `/model` 时重载，可在会话中编辑而无需重启。[@ref-pi-models-reload]

  **providers.metadata**：模型元数据字段含 id、name、api、reasoning、thinkingLevelMap、input、contextWindow、maxTokens、cost、compat；默认值如 contextWindow 128000、maxTokens 16384、input 为 text，模型级 compat 会与 provider 级合并。[@ref-pi-models-config] `thinkingLevelMap` 用 omitted、字符串或 null 表示支持、映射到 provider 值、隐藏该级别；`compat` 覆盖 supportsDeveloperRole、supportsReasoningEffort、maxTokensField 等 provider 怪癖。[@ref-pi-models-config][@ref-pi-cp-apis]

  ## 转发、响应与诊断 {#providers-behavior}

  **providers.forwarding**：可用字段里，`compat` 明确映射到请求行为（developer 与 system 角色、reasoning 相关开关、max_tokens 字段名、thinkingFormat、缓存标记等），`baseUrl`、`headers`、`authHeader` 决定端点与头部。[@ref-pi-cp-apis] models.json 的自定义模型按 id upsert，同名替换内置模型。[@ref-pi-models-merge] `name` 只用于匹配（`--model` 模式）与详情、状态显示，不改请求。[@ref-pi-models-config] 缺口：其它字段（cost、contextWindow）对请求体的具体影响，以及哪些配置只影响界面或路由，文档未逐条映射。

  **providers.responses**：自定义 provider 需按统一流式模式实现 `streamSimple`，返回 AssistantMessageEventStream 并推送 start、内容、done，出错时写 stopReason 与 errorMessage 并推 error 事件。[@ref-pi-cp-stream] 扩展工厂可以是 async，Pi 会等它返回再继续启动。[@ref-pi-cp-quick] 缺口：没有针对某个后端记录请求已发送、流式片段、错误与重试的运行观察，重试行为由 settings 的 retry 段控制而本章未展开。

  **providers.diagnostics**：排查可先用凭据解析顺序确认键来源，再确认模型是否出现在 `/model` 与 `--list-models`；models.json 在打开 `/model` 时重载，扩展 provider 在启动前注册完成。[@ref-pi-providers-resolution][@ref-pi-models-reload][@ref-pi-cp-quick] `/model` 的可用性检查只看配置的鉴权是否存在，不执行 `!command`，因此“命令能跑”与“凭据可用”要分开验证。[@ref-pi-models-values]

---
Pi 的 provider 扩展有两层：`~/.pi/agent/models.json` 的声明式配置，以及扩展里的 `pi.registerProvider`。以下机制来自固定来源的文档，未做运行观察，也未与任何精确 npm 版本建立映射。

## 入口与合并 {#providers-entry}

**providers.entry**：两条第一方入口：`~/.pi/agent/models.json` 里的 providers 映射，以及扩展中的 `pi.registerProvider(name, config)`。[@ref-pi-models-json][@ref-pi-cp-quick] models.json 里自定义模型按 id 并入 provider：同名替换内置模型，新 id 追加，内置模型保留。[@ref-pi-models-merge]

## 协议、凭据、模型与元数据 {#providers-runtime}

**providers.auth**：凭据解析顺序为 CLI 的 `--api-key`、`auth.json`（API key 或 OAuth）、环境变量、models.json 的自定义 provider key。[@ref-pi-providers-resolution] `~/.pi/agent/auth.json` 权限为 0600，key 支持 `!command`（执行取 stdout）、环境变量名与字面值三种形式，内置 provider 有对应环境变量表。[@ref-pi-providers-auth] 扩展 provider 可用 `authHeader: true` 自动加 Authorization Bearer 头，或用 `oauth` 接入 `/login`。[@ref-pi-cp-auth] models.json 的 `!command` 在请求时求值，Pi 不内置 TTL 或回退；`/model` 的可用性检查只看是否存在鉴权而不执行命令。[@ref-pi-models-values]

**providers.protocol**：`api` 字段决定流式实现，可选 anthropic-messages、openai-completions、openai-responses、azure-openai-responses、openai-codex-responses、mistral-conversations、google-generative-ai、google-vertex、bedrock-converse-stream。[@ref-pi-cp-apis] models.json 另列四种可写类型（openai-completions、openai-responses、anthropic-messages、google-generative-ai），可在 provider 或 model 级设置，google-generative-ai 的自定义模型必须给 baseUrl。[@ref-pi-models-config] 非标准 API 需在扩展里实现 `streamSimple`。[@ref-pi-cp-stream]

**providers.models**：models.json 中每个模型最少只需 id，缺省 name 取 id 并用于匹配与显示。[@ref-pi-models-json][@ref-pi-models-config] 也可用 async 扩展工厂在启动前 fetch 远程列表并注册，结果对 `pi --list-models` 可见。[@ref-pi-cp-quick] 文件在每次打开 `/model` 时重载，可在会话中编辑而无需重启。[@ref-pi-models-reload]

**providers.metadata**：模型元数据字段含 id、name、api、reasoning、thinkingLevelMap、input、contextWindow、maxTokens、cost、compat；默认值如 contextWindow 128000、maxTokens 16384、input 为 text，模型级 compat 会与 provider 级合并。[@ref-pi-models-config] `thinkingLevelMap` 用 omitted、字符串或 null 表示支持、映射到 provider 值、隐藏该级别；`compat` 覆盖 supportsDeveloperRole、supportsReasoningEffort、maxTokensField 等 provider 怪癖。[@ref-pi-models-config][@ref-pi-cp-apis]

## 转发、响应与诊断 {#providers-behavior}

**providers.forwarding**：可用字段里，`compat` 明确映射到请求行为（developer 与 system 角色、reasoning 相关开关、max_tokens 字段名、thinkingFormat、缓存标记等），`baseUrl`、`headers`、`authHeader` 决定端点与头部。[@ref-pi-cp-apis] models.json 的自定义模型按 id upsert，同名替换内置模型。[@ref-pi-models-merge] `name` 只用于匹配（`--model` 模式）与详情、状态显示，不改请求。[@ref-pi-models-config] 缺口：其它字段（cost、contextWindow）对请求体的具体影响，以及哪些配置只影响界面或路由，文档未逐条映射。

**providers.responses**：自定义 provider 需按统一流式模式实现 `streamSimple`，返回 AssistantMessageEventStream 并推送 start、内容、done，出错时写 stopReason 与 errorMessage 并推 error 事件。[@ref-pi-cp-stream] 扩展工厂可以是 async，Pi 会等它返回再继续启动。[@ref-pi-cp-quick] 缺口：没有针对某个后端记录请求已发送、流式片段、错误与重试的运行观察，重试行为由 settings 的 retry 段控制而本章未展开。

**providers.diagnostics**：排查可先用凭据解析顺序确认键来源，再确认模型是否出现在 `/model` 与 `--list-models`；models.json 在打开 `/model` 时重载，扩展 provider 在启动前注册完成。[@ref-pi-providers-resolution][@ref-pi-models-reload][@ref-pi-cp-quick] `/model` 的可用性检查只看配置的鉴权是否存在，不执行 `!command`，因此“命令能跑”与“凭据可用”要分开验证。[@ref-pi-models-values]


