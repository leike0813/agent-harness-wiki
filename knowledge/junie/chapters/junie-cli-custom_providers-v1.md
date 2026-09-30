---
schema_version: 3
record_kind: production
edition_id: junie-cli-custom_providers-v1
harness_id: junie
topic: custom_providers
title: "Junie CLI 的模型提供方：BYOK、自定义档案、代理端点与凭据"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-junie-models-providers, ref-junie-quickstart-overview]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-junie-byok-overview, ref-junie-byok-providers, ref-junie-env-byok, ref-junie-env-model, ref-junie-params-core, ref-junie-config-fields, ref-junie-models-autodetect, ref-junie-models-aliases, ref-junie-custom-models-usage, ref-junie-custom-models-location]
  - section_id: providers-profiles
    surface_ids: [cli]
    source_refs: [ref-junie-custom-models-structure, ref-junie-custom-models-toplevel, ref-junie-custom-models-roles, ref-junie-custom-models-merge, ref-junie-custom-models-apitypes, ref-junie-custom-models-extrabody, ref-junie-custom-models-temperature, ref-junie-custom-models-example, ref-junie-ollama, ref-junie-litellm, ref-junie-models-internal]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-junie-custom-models-env, ref-junie-env-byok, ref-junie-byok-copilot, ref-junie-byok-overview]
  - section_id: providers-proxies
    surface_ids: [cli]
    source_refs: [ref-junie-proxies-ingrazzio, ref-junie-proxies-config, ref-junie-proxies-fields, ref-junie-proxies-select, ref-junie-proxies-kinds, ref-junie-proxies-bedrock, ref-junie-proxies-merge, ref-junie-proxies-limits, ref-junie-proxies-envvar]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-models-aliases, ref-junie-custom-models-env, ref-junie-custom-models-location, ref-junie-quickstart-auth]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-junie-byok-overview, ref-junie-byok-providers, ref-junie-env-byok, ref-junie-env-model, ref-junie-params-core, ref-junie-config-fields]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-junie-custom-models-env, ref-junie-env-byok, ref-junie-byok-copilot, ref-junie-byok-overview]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-profiles
        status: answered
        source_refs: [ref-junie-custom-models-apitypes, ref-junie-custom-models-toplevel, ref-junie-ollama, ref-junie-litellm]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-junie-models-aliases, ref-junie-models-autodetect, ref-junie-custom-models-location, ref-junie-custom-models-usage, ref-junie-env-model]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-profiles
        status: partial
        source_refs: [ref-junie-custom-models-toplevel, ref-junie-custom-models-roles, ref-junie-custom-models-structure, ref-junie-models-internal]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-profiles
        status: answered
        source_refs: [ref-junie-custom-models-extrabody, ref-junie-custom-models-merge, ref-junie-custom-models-temperature, ref-junie-custom-models-roles]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-profiles
        status: unknown
        source_refs: [ref-junie-custom-models-apitypes, ref-junie-custom-models-toplevel]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-junie-models-aliases, ref-junie-custom-models-env, ref-junie-custom-models-location]
---

## 固定来源与适用范围 {#providers-scope}

本章依据 Junie 官方文档站 `junie.jetbrains.com/docs` 的 `custom-llm-models.html`、
`junie-cli-model-selection.html`、`byok.html`、`byok-github-copilot.html`、`custom-proxies.html`、
`custom-llm-litellm.html`、`custom-llm-ollama.html`、`environment-variables.html`、
`parameters.html` 与 `junie-cli-configuration.html` 快照，未标注适用构建号，属来源级知识。Junie
把模型提供方分四类：Junie（JetBrains AI 订阅）、BYOK（自带密钥的第三方）、Custom（自定义 JSON
档案）与 Proxy（`config.json` 里的自定义代理端点）；同一模型在多处可用时默认优先 Junie 提供方，用
`--provider` 可覆盖 [@ref-junie-models-providers][@ref-junie-quickstart-overview]。

## 提供方入口与选择 {#providers-entry}

**providers.entry**。BYOK 在交互式会话里通过 `/account`（或欢迎页的 Use your own API key）添加：
选择提供方并粘贴 API 密钥即可，之后用 `/model` 查看与切换模型；支持的提供方为 OpenAI、Anthropic、
Google、xAI、OpenRouter（均为 API key）与 GitHub Copilot（OAuth token）
[@ref-junie-byok-overview][@ref-junie-byok-providers]。非交互场景用 CLI 标志或环境变量注入密钥，
例如 `JUNIE_ANTHROPIC_API_KEY`/`--anthropic-api-key`、`JUNIE_OPENAI_API_KEY`/`--openai-api-key`、
`JUNIE_GOOGLE_API_KEY`/`--google-api-key`、`JUNIE_GROK_API_KEY`/`--grok-api-key`、
`JUNIE_META_API_KEY`/`--meta-api-key`、`JUNIE_OPENROUTER_API_KEY`/`--openrouter-api-key`，以及
LiteLLM 的 `JUNIE_LITELLM_URL`/`--litellm-url` 与 `JUNIE_LITELLM_API_KEY`/`--litellm-api-key`
[@ref-junie-env-byok]。

`--provider`（或 `JUNIE_LLM_PROVIDER`）可取 `openai`、`anthropic`、`google`、`xai`、
`openrouter`、`copilot`、`litellm`；未设置时使用 Junie 或 Custom 提供方
[@ref-junie-env-model][@ref-junie-params-core]。`config.json` 里对应的顶层字段是 `provider`、`model`
与 `byok` [@ref-junie-config-fields]。

**providers.models**：指定 `--model` 而不指定 `--provider` 时，Junie 先解析提供方——若 Junie 提供方
可用（已登录或已配 API key）则优先使用；否则在已连接的 BYOK 提供方里选出第一个提供该模型的提供方
[@ref-junie-models-autodetect]。内置模型别名（`sonnet`、`opus`、`gpt`、`gpt-codex`、`gemini-pro`、
`gemini-flash`、`grok`）由 JetBrains 映射到具体模型版本，可能随新模型发布而变化
[@ref-junie-models-aliases]。自定义档案以文件名作为档案 ID，通过 `/model` 或
`--model custom:档案ID` 选择 [@ref-junie-custom-models-usage]；自定义模型默认从
`$JUNIE_HOME/models/*.json`（用户）与 `.junie/models/*.json`（项目）发现，文件名（去 `.json`）即
档案标识 [@ref-junie-custom-models-location]。

## 自定义模型档案与协议映射 {#providers-profiles}

**providers.protocol**：自定义档案用 `apiType` 指定请求协议，取值 `OpenAICompletion`
（`/v1/chat/completions`）、`OpenAIResponses`（`/v1/responses`）、`Google`（Gemini API 格式）、
`Anthropic`（Messages API 格式）[@ref-junie-custom-models-apitypes]。档案由顶层默认值与两个可选
模型角色组成：`primaryModel` 负责主推理与代码生成，`fasterModel` 负责摘要上下文、任务分类等内部
helper 工作；未显式定义角色时继承顶层属性
[@ref-junie-custom-models-structure][@ref-junie-custom-models-roles]。顶层 `id`（API 期望的模型
标识）与 `baseUrl`（完整端点 URL）为必填，`apiType` 亦为必填
[@ref-junie-custom-models-toplevel]。官方给出两个本地/代理提供方的交互接入方式：Ollama 默认
`http://localhost:11434`，LiteLLM 默认 `http://localhost:4000`，均可让 Junie 探测端点并把发现的
模型加入选择列表 [@ref-junie-ollama][@ref-junie-litellm]。官方示例档案 `local-ollama.json`（来自
自定义 LLM 文档）[@ref-junie-custom-models-example]：

```json
{
  "baseUrl": "http://localhost:11434/v1/chat/completions",
  "id": "qwen3-coder:latest",
  "apiType": "OpenAICompletion",
  "extraHeaders": { "X-Custom-Source": "Junie" },
  "fasterModel": { "id": "qwen2.5-coder:1.5b" }
}
```

**providers.forwarding**：`extraHeaders`（键值附加请求头）与 `extraBody`（并入每次请求体的 JSON
对象）可在顶层设置并按角色覆盖；`extraBody` 的键与 Junie 已设置的字段（如 `model`、`messages`）
冲突时，`extraBody` 值优先 [@ref-junie-custom-models-extrabody]。`temperature` 默认不发送，
由提供方决定，可在顶层设置或按角色覆盖 [@ref-junie-custom-models-temperature]。合并规则：简单字段
（`id`、`baseUrl`、`apiKey`、`apiType`、`temperature`、`maxContextLength`）被覆盖值替换，
`extraHeaders` 合并（同名角色级优先），`extraBody` 递归合并
[@ref-junie-custom-models-merge][@ref-junie-custom-models-roles]。

**providers.metadata**：可表达的模型元数据是 `displayName`（显示名，默认取文件名）、
`providerName`（模型名旁的提供方标签，不参与列表分组）与 `maxContextLength`（最大上下文 token 数）
[@ref-junie-custom-models-toplevel]。文档没有给出上下文窗口以外的能力元数据（视觉、工具、推理强度
等）表达方式；推理强度由用户侧 `/effort`/`--effort` 与子代理 `reasoningLevel` 传入，并由 Junie
映射到提供方的专有字段 [@ref-junie-custom-models-roles]。另外 Junie 会自动为摘要、分类路由、
记忆抽取等内部任务选用同一提供方的另一个模型，因此可能出现用户未显式选择的模型调用
[@ref-junie-models-internal]。本项按 partial 阅读：元数据字段有限，能力面未完整确立。

**providers.responses**：固定来源没有描述流式输出、工具调用、错误处理与重试的具体约定，也没有说明
后端必须满足的接口契约，只给出 `apiType` 的协议形态与 `baseUrl` 端点要求
[@ref-junie-custom-models-apitypes][@ref-junie-custom-models-toplevel]。因此本项按 unknown 阅读：
已检查 `custom-llm-models.html` 的协议与字段小节、`junie-cli-model-selection.html` 的提供方小节，
缺少关于流式、工具调用、错误与重试的机制描述。

## 凭据与环境变量 {#providers-auth}

**providers.auth**：三种凭据来源——交互相应里粘贴的密钥、CLI 标志/环境变量（BYOK 与 LiteLLM），
以及自定义档案里的 `apiKey` 与 `extraHeaders`。为避免把密钥写进仓库，档案的 `apiKey` 与
`extraHeaders` 值支持 `${VAR_NAME}` 语法，Junie 在加载档案时对照环境变量解析；引用格式必须为
`${NAME}`（NAME 以字母或下划线开头，仅含字母、数字、下划线）；被引用的环境变量未设置时档案加载失败
并报出缺失变量名 [@ref-junie-custom-models-env]。BYOK 密钥可用环境变量提供
[@ref-junie-env-byok]。GitHub Copilot 不用 API key，而是复用本机 GitHub Copilot CLI 的登录：
要求 Copilot CLI 版本 1.0.65 或更高、已用具备有效 Copilot 订阅的账号登录，且所需模型已在 GitHub
Copilot 设置里显式启用 [@ref-junie-byok-copilot]。BYOK 可与 JetBrains 账号/API key 并存；同一模型
两处都可用时 BYOK 优先并直接计费到你的提供方 [@ref-junie-byok-overview]。

## 代理端点 {#providers-proxies}

**providers.entry（代理部分）**：`config.json` 的 `proxies` 数组定义命名代理端点，字段为 `name`
（必填，唯一名，供 `provider` 引用）、`kind`（协议类型，缺省 `Ingrazzio`）、`api-url`（必填，端点
基址）与 `headers`（附加请求头列表，形如 `Header-Name: Header-Value`）
[@ref-junie-proxies-config][@ref-junie-proxies-fields]。Ingrazzio 是 JetBrains 内部代理协议，生产
端点为 `https://ingrazzio-cloud-prod.labs.jb.gg`，其基址下分派 LLM 对话、`/search` 网页搜索、
`/extract` URL 提取与 `/auth/test`、`/auth/reset` 认证子端点
[@ref-junie-proxies-ingrazzio]。选用代理时把 `provider` 设为代理名，或用 `--provider` 运行期覆盖；
使用代理会绕过 JetBrains AI 认证，所需凭据必须由 `headers` 提供
[@ref-junie-proxies-select]。

支持的 `kind` 为 `Ingrazzio`、`Bedrock`、`OpenAI`、`Google`、`Anthropic`；`JetBrainsAI` 与
`OpenRouter` 保留未支持，选为活动提供方会失败 [@ref-junie-proxies-kinds]。`Bedrock` 走 AWS
Bedrock 兼容网关，请求发往 api-url 基址下的 `/model/` 加 provider 侧模型 id 再加 `/invoke`，并额外要求 `available-models`
列出该代理暴露的 JetBrains 模型 id（至少一个）[@ref-junie-proxies-bedrock]。多文件定义代理时按
`name` 合并：同名字段逐字段以高优先级文件覆盖，`headers` 合并去重，不同名的代理全部保留
[@ref-junie-proxies-merge]。代理配置只能写在 `config.json`，没有专用 CLI 标志
[@ref-junie-proxies-limits]。旧机制 `INGRAZZIO_URL` 环境变量会生成一个名为 `ingrazzio-env` 的隐式
Ingrazzio 代理；若 `config.json` 已声明任何 Ingrazzio 代理，则该环境变量被完全忽略
[@ref-junie-proxies-envvar]。

## 诊断 {#providers-diagnostics}

**providers.diagnostics**：区分四个层次——配置可读、模型可选、请求已发送、后端可用。查看模型列表：
`junie --help` 或交互式 `/model`；别名到具体模型版本的映射见官方表格，随版本变化
[@ref-junie-models-aliases]。自定义档案是否可读：档案从 `$JUNIE_HOME/models/` 与
`.junie/models/` 发现，文件名即档案 ID，环境变量引用缺失会导致加载失败并报出变量名，可据此定位
[@ref-junie-custom-models-location][@ref-junie-custom-models-env]。认证状态：`/account` 管理凭据与
API key，欢迎页与 `/account` 的选项可反映当前认证方式 [@ref-junie-quickstart-auth]。文档没有提供
“请求已发送/后端可用”的专门诊断入口（如请求日志命令），因此本项按 partial 阅读。
