---
schema_version: 2
record_kind: production
edition_id: pi-custom_providers-v2
harness_id: pi
topic: custom_providers
title: Pi 自定义 Provider：models.json 与扩展注册（固定源码 781152f）
sections:
  - section_id: providers-entry
    source_refs:
      - ref-pi-models-json
      - ref-pi-cp-quick
      - ref-pi-models-merge
      - ref-pi-ext-locations
  - section_id: providers-models
    source_refs:
      - ref-pi-models-json
      - ref-pi-models-config
      - ref-pi-models-reload
      - ref-pi-cp-quick
      - ref-pi-cp-apis
      - ref-pi-cp-stream
  - section_id: providers-auth
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-providers-auth
      - ref-pi-providers-auth-file
      - ref-pi-cp-auth
      - ref-pi-models-values
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
    section_id: providers-auth
    status: answered
    source_refs:
      - ref-pi-providers-resolution
      - ref-pi-providers-auth
      - ref-pi-providers-auth-file
      - ref-pi-cp-auth
      - ref-pi-models-values
  - question_id: providers.protocol
    section_id: providers-models
    status: answered
    source_refs:
      - ref-pi-cp-apis
      - ref-pi-models-config
      - ref-pi-cp-stream
  - question_id: providers.models
    section_id: providers-models
    status: answered
    source_refs:
      - ref-pi-models-json
      - ref-pi-cp-quick
      - ref-pi-models-reload
      - ref-pi-models-config
  - question_id: providers.metadata
    section_id: providers-models
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
---
固定来源为 pi-mono 仓库提交 781152fc 的 Pi coding agent 包（包内文档与源码）。Pi 的 provider 扩展有两条入口：`~/.pi/agent/models.json` 的声明式配置，以及扩展里的 `pi.registerProvider`。本章机制来自该固定来源的文档，未做运行观察，也未与任何精确 npm 版本建立映射，按 source_only 阅读；示例中的凭据只用占位值或环境变量名。

## 两条入口 {#providers-entry}

第一方入口有两条：`~/.pi/agent/models.json` 里的 providers 映射，以及扩展中的 `pi.registerProvider(name, config)`。[@ref-pi-models-json][@ref-pi-cp-quick] models.json 里自定义模型按 id 并入 provider：同名替换内置模型，新 id 追加，内置模型保留。[@ref-pi-models-merge]

扩展方式适合需要自定义端点、凭据或 OAuth 的 provider。下面这段代码写在扩展文件里，扩展从 `~/.pi/agent/extensions/` 或 `.pi/extensions/` 自动发现：[@ref-pi-ext-locations][@ref-pi-cp-quick]

```typescript
pi.registerProvider("my-provider", {
  name: "My Provider",
  baseUrl: "https://api.example.com",
  apiKey: "MY_API_KEY",
  api: "openai-completions",
  models: [
    { id: "my-model", name: "My Model", contextWindow: 128000, maxTokens: 4096 }
  ]
});
```

字段作用：`baseUrl` 是端点，`apiKey` 写凭据变量名（也可用字面值或 `!command`），`api` 是协议，`models` 是模型数组。[@ref-pi-cp-quick] 生效结果是该 provider 在启动前注册完成，可在 `/model` 与 `pi --list-models` 中看到它的模型。[@ref-pi-cp-quick]

## models.json：模型、协议与元数据 {#providers-models}

声明式配置写在 `~/.pi/agent/models.json`。对本地模型（Ollama、LM Studio、vLLM），每个模型最少只需 id；下面这份文件把 Ollama 作为 provider 加入，`apiKey` 必填但 Ollama 会忽略，任意值即可。[@ref-pi-models-json]

```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434/v1",
      "api": "openai-completions",
      "apiKey": "ollama",
      "models": [
        { "id": "llama3.1:8b" },
        { "id": "qwen2.5-coder:7b" }
      ]
    }
  }
}
```

`baseUrl` 是端点，`api` 决定该 provider 的流式实现，`models` 是模型数组；每个模型缺省 `name` 取 id，并用于匹配与显示。[@ref-pi-models-json][@ref-pi-models-config] `api` 可选值如下。[@ref-pi-cp-apis] models.json 另列四种可写类型（`openai-completions`、`openai-responses`、`anthropic-messages`、`google-generative-ai`），可在 provider 或 model 级设置；非标准 API 需在扩展里实现 `streamSimple`。[@ref-pi-models-config][@ref-pi-cp-stream]

| api | 用途 |
|---|---|
| `anthropic-messages` | Anthropic Claude 及兼容 |
| `openai-completions` | OpenAI Chat Completions 及兼容 |
| `openai-responses` | OpenAI Responses |
| `azure-openai-responses` | Azure OpenAI Responses |
| `openai-codex-responses` | OpenAI Codex Responses |
| `mistral-conversations` | Mistral Conversations / Chat 流式 |
| `google-generative-ai` | Google Generative AI |
| `google-vertex` | Google Vertex AI |
| `bedrock-converse-stream` | Amazon Bedrock Converse |

模型元数据字段列全如下，缺省值随表给出；模型级 `compat` 会与 provider 级合并。[@ref-pi-models-config]

| 字段 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `id` | 是 | — | 传给 API 的模型标识 |
| `name` | 否 | id | 显示名，用于 `--model` 匹配与状态显示 |
| `api` | 否 | provider 的 api | 覆盖该模型的协议 |
| `reasoning` | 否 | false | 是否支持扩展思考 |
| `thinkingLevelMap` | 否 | 省略 | 把 pi 思考级别映射到 provider 取值并标记不支持项 |
| `input` | 否 | text | 输入类型：text 或 text 与 image |
| `contextWindow` | 否 | 128000 | 上下文窗口 token 数 |
| `maxTokens` | 否 | 16384 | 最大输出 token 数 |

models.json 在每次打开 `/model` 时重载，可在会话中编辑而无需重启。[@ref-pi-models-reload] 也可用 async 扩展工厂在启动前 fetch 远程列表并注册，结果对 `pi --list-models` 可见。[@ref-pi-cp-quick]

## 凭据解析 {#providers-auth}

凭据解析顺序是 CLI 的 `--api-key`、`auth.json`（API key 或 OAuth）、环境变量、models.json 的自定义 provider key。[@ref-pi-providers-resolution] 只用环境变量时，按内置 provider 的对应变量名导出：

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

每个内置 provider 有固定的环境变量名与 `auth.json` 键名，例如 Anthropic 是 `ANTHROPIC_API_KEY` 与 `anthropic`，OpenAI 是 `OPENAI_API_KEY` 与 `openai`。[@ref-pi-providers-auth] `~/.pi/agent/auth.json` 权限为 0600，其 key 支持 `!command`（执行取 stdout，并在进程生命周期缓存）、环境变量名与字面值三种形式。[@ref-pi-providers-auth-file] models.json 的 `!command` 在请求时求值，Pi 不内置 TTL 或回退；`/model` 的可用性检查只看是否存在鉴权而不执行命令。[@ref-pi-models-values] 扩展 provider 可用 `authHeader: true` 自动加 Authorization Bearer 头，或用 `oauth` 接入 `/login`。[@ref-pi-cp-auth]

## 转发、流式与诊断 {#providers-behavior}

可写字段里，`compat` 明确映射到请求行为（developer 与 system 角色、reasoning 相关开关、max_tokens 字段名、thinkingFormat、缓存标记等），`baseUrl`、`headers`、`authHeader` 决定端点与头部。[@ref-pi-cp-apis] models.json 的自定义模型按 id upsert，同名替换内置模型。[@ref-pi-models-merge] `name` 只用于匹配（`--model` 模式）与详情、状态显示，不改请求。[@ref-pi-models-config] 缺口：其它字段（cost、contextWindow）对请求体的具体影响，以及哪些配置只影响界面或路由，文档未逐条映射。

自定义 provider 需按统一流式模式实现 `streamSimple`，返回 AssistantMessageEventStream 并推送 start、内容、done，出错时写 stopReason 与 errorMessage 并推 error 事件。[@ref-pi-cp-stream] 扩展工厂可以是 async，Pi 会等它返回再继续启动。[@ref-pi-cp-quick] 缺口：没有针对某个后端记录请求已发送、流式片段、错误与重试的运行观察，重试行为由 settings 的 retry 段控制而本章未展开。

排查时先用凭据解析顺序确认键来源，再确认模型是否出现在 `/model` 与 `--list-models`；models.json 在打开 `/model` 时重载，扩展 provider 在启动前注册完成。[@ref-pi-providers-resolution][@ref-pi-models-reload][@ref-pi-cp-quick] `/model` 的可用性检查只看配置的鉴权是否存在，不执行 `!command`，因此“命令能跑”与“凭据可用”要分开验证。[@ref-pi-models-values]
