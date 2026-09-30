---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-custom_providers-v1
harness_id: kimi-code
topic: custom_providers
title: "Kimi Code CLI 的自定义 Provider：凭据、协议、模型元数据与请求映射"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-kimi-code-config-providers, ref-kimi-code-overrides-priority, ref-kimi-code-config-location, ref-kimi-code-slash-account, ref-kimi-code-cmd-provider, ref-kimi-code-providers-doc]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-kimi-code-overrides-credentials, ref-kimi-code-env-keys, ref-kimi-code-src-provider-endpoints, ref-kimi-code-providers-oauth, ref-kimi-code-cmd-provider]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-kimi-code-providers-types, ref-kimi-code-src-protocols, ref-kimi-code-src-provider-endpoints, ref-kimi-code-config-models]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-kimi-code-config-models, ref-kimi-code-providers-types, ref-kimi-code-mcp-deferred, ref-kimi-code-config-location, ref-kimi-code-providers-doc, ref-kimi-code-cmd-provider, ref-kimi-code-config-secondary, ref-kimi-code-env-model]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-kimi-code-config-models, ref-kimi-code-config-providers, ref-kimi-code-env-switches, ref-kimi-code-config-thinking, ref-kimi-code-providers-types, ref-kimi-code-env-proxy, ref-kimi-code-config-loop-control, ref-kimi-code-overrides-priority]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-slash-account, ref-kimi-code-cmd-provider, ref-kimi-code-slash-info, ref-kimi-code-config-models, ref-kimi-code-env-logs]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-kimi-code-config-providers, ref-kimi-code-overrides-priority, ref-kimi-code-config-location, ref-kimi-code-slash-account, ref-kimi-code-cmd-provider, ref-kimi-code-providers-doc]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-kimi-code-overrides-credentials, ref-kimi-code-env-keys, ref-kimi-code-src-provider-endpoints, ref-kimi-code-providers-oauth, ref-kimi-code-cmd-provider]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-kimi-code-providers-types, ref-kimi-code-src-protocols, ref-kimi-code-src-provider-endpoints, ref-kimi-code-config-models]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-kimi-code-config-models, ref-kimi-code-providers-types, ref-kimi-code-mcp-deferred, ref-kimi-code-config-location, ref-kimi-code-providers-doc, ref-kimi-code-cmd-provider, ref-kimi-code-config-secondary, ref-kimi-code-env-model]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-kimi-code-config-models, ref-kimi-code-providers-types, ref-kimi-code-mcp-deferred, ref-kimi-code-config-location, ref-kimi-code-providers-doc, ref-kimi-code-cmd-provider, ref-kimi-code-config-secondary, ref-kimi-code-env-model]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-kimi-code-config-models, ref-kimi-code-config-providers, ref-kimi-code-env-switches, ref-kimi-code-config-thinking, ref-kimi-code-providers-types, ref-kimi-code-env-proxy, ref-kimi-code-config-loop-control, ref-kimi-code-overrides-priority]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-kimi-code-config-models, ref-kimi-code-config-providers, ref-kimi-code-env-switches, ref-kimi-code-config-thinking, ref-kimi-code-providers-types, ref-kimi-code-env-proxy, ref-kimi-code-config-loop-control, ref-kimi-code-overrides-priority]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-kimi-code-cmd-doctor, ref-kimi-code-slash-account, ref-kimi-code-cmd-provider, ref-kimi-code-slash-info, ref-kimi-code-config-models, ref-kimi-code-env-logs]
---

Provider 决定用哪种协议与哪个端点通信，模型别名建立在 provider 之上并声明自己的上下文长度与能力。一个会话可以同时连接多个平台：Kimi Code 托管服务 OAuth 登录、Anthropic API key、OpenAI 兼容的第三方推理服务等 [@ref-kimi-code-providers-doc]。本章固定来源是固定 commit 上的 `docs/en/configuration/providers.md`、`config-files.md`、`overrides.md`、`env-vars.md`、`docs/en/reference/kimi-command.md` 与 `packages/agent-core-v2/src/llm-adapter`。

## 定义位置与作用域 {#providers-entry}

`providers` 与 `models` 是用户级配置 `config.toml` 里的两张表，键分别是 provider 名与模型别名；CLI 目前只读一个用户级配置文件，没有项目级配置文件机制，需要按项目隔离时用不同的 `KIMI_CODE_HOME` [@ref-kimi-code-config-providers] [@ref-kimi-code-overrides-priority]。

```toml
# 依据 configuration/providers.md 的 kimi 一节
[providers.kimi]
type = "kimi"
base_url = "https://api.moonshot.ai/v1"
api_key = "sk-xxxxx"
```

- 配置文件路径由数据根决定：`$KIMI_CODE_HOME/config.toml`，默认 `~/.kimi-code/config.toml`，首次运行自动创建；`KIMI_CODE_HOME` 会把配置、会话、日志、OAuth 凭据一并迁移 [@ref-kimi-code-config-location]。
- 交互入口：TUI 里的 `/provider` 打开 provider 管理器（按来源分组列出条目，`d` 删除，`[ Add New Platform ]` 新增），`/login`、`/logout` 管理 OAuth 托管账号；托管账号不会出现在 `/provider` 中 [@ref-kimi-code-slash-account]。
- 非交互环境使用 shell 子命令完成同样的操作，例如 `kimi provider add URL` 从自定义注册表（api.json）批量导入 provider 与模型条目，`kimi provider remove/list/catalog` 管理已有条目 [@ref-kimi-code-cmd-provider]。
- provider 的 `type` 决定协议实现：`kimi`、`anthropic`、`openai`、`openai_responses`、`google-genai`、`vertexai`。`/login` 写入的托管条目是一个普通的 `type = "kimi"` provider，只是名字带 `managed:` 前缀、凭据用 `oauth` 引用而不是明文 `api_key` [@ref-kimi-code-config-providers]：

```toml
# 依据 configuration/config-files.md 的 Complete example（托管条目由 /login 写入）
[providers."managed:kimi-code"]
type = "kimi"
base_url = "https://api.kimi.com/coding/v1"
api_key = ""

[models."kimi-code/k3"]
provider = "managed:kimi-code"
model = "k3"
max_context_size = 1048576
capabilities = [ "thinking", "always_thinking", "image_in", "video_in", "tool_use" ]
```

- `/provider` 面板导航：↑/↓ 移动光标、←/→ 翻页、`d` 删除当前 provider（带 `[y/N]` 确认）、在 `[ Add New Platform ]` 行按 Enter 新增；新增有两条路径——已知第三方 provider（从 models.dev 取目录，选 provider → 填 API key → 选默认模型）与自定义注册表（粘贴 registry URL，私有注册表再填 Bearer token）[@ref-kimi-code-providers-doc]。
- 托管账号与普通 provider 分开管理：`/login` 登录的 Kimi Code OAuth 托管账号不出现在 `/provider` 中，需用 `/login`、`/logout` 管理 [@ref-kimi-code-providers-doc] [@ref-kimi-code-slash-account]。

## 凭据与 base URL {#providers-auth}

单个 provider 的凭据按固定顺序解析 [@ref-kimi-code-overrides-credentials]：

1. `[providers.名称].api_key`（直接写在配置文件里）
2. `[providers.名称].api_key_env`（写环境变量名，每次请求重新读取）
3. `[providers.名称.env]` 子表中的约定键名（仅当前两项都不存在时查阅）
4. 三者都缺失时启动失败并报错说明缺凭据

- `api_key` 与 `api_key_env` 是二选一而非优先级链：同时设置会被判为配置冲突；`api_key_env` 与 `oauth` 也不能同时设置 [@ref-kimi-code-overrides-credentials]。
- `api_key_env` 是「凭据不读 shell 环境变量」这一总规则的两个例外之一（另一个是 `KIMI_MODEL_*` 家族）：它在每次请求时从进程环境重读，因此不会把密文落到 `config.toml`，但变量未设置或为空时会快速失败并指明 provider 与变量名，不会静默回退 [@ref-kimi-code-overrides-credentials]。
- `base_url` 的解析同样是「先直接字段、后 `env` 子表」；`[providers.名称.env]` 只是配置文件里的 TOML 段，不会写入 shell 环境，只在对应的直接字段为空时生效 [@ref-kimi-code-overrides-credentials]。
- 约定键名按 provider 类型固定：`KIMI_API_KEY`/`KIMI_BASE_URL`、`ANTHROPIC_API_KEY`/`ANTHROPIC_BASE_URL`、`OPENAI_API_KEY`/`OPENAI_BASE_URL`（`openai` 与 `openai_responses`）、`GOOGLE_API_KEY`、`VERTEXAI_API_KEY`、`GOOGLE_CLOUD_PROJECT`、`GOOGLE_CLOUD_LOCATION`；`GOOGLE_APPLICATION_CREDENTIALS` 是唯一走系统环境变量机制的例外，由 Google SDK 直接按 ADC 流程读取 [@ref-kimi-code-env-keys]。
- 源码里这些键名以 `apiKeyEnv` / `baseUrlEnv` 常量声明在 provider 定义中，Kimi 的默认 base URL 也定义在同一处 [@ref-kimi-code-src-provider-endpoints]。
- OAuth：Kimi Code 托管服务用 OAuth 而非静态 API key，`/login` 后内置认证链自动写入并刷新凭据，无需手写 `config.toml` [@ref-kimi-code-providers-oauth]。
- 写示例时凭据一律用占位值（如 sk-YOUR-TOKEN），并且不要把密钥写进 `[providers.名称.env]` 之外的任何共享文件；`kimi provider add` 从注册表导入时，注册表声明的 `env` 字段只作为提示打印，是否采用由用户显式设置 `api_key_env` 决定——注册表不决定读哪个密钥 [@ref-kimi-code-cmd-provider]。

## 协议与端点形态 {#providers-protocol}

| `type` | 协议 | 典型用途 | 默认 base URL / 凭据键 |
| --- | --- | --- | --- |
| `kimi` | OpenAI 兼容 | Kimi Code 托管服务、Kimi 平台 API key | `https://api.moonshot.ai/v1`；`KIMI_API_KEY`、`KIMI_BASE_URL` |
| `anthropic` | Anthropic Messages | Claude 系列 | 跟随 Anthropic SDK 默认；`ANTHROPIC_API_KEY`、`ANTHROPIC_BASE_URL` |
| `openai` | OpenAI Chat Completions | OpenAI 及兼容服务（DeepSeek、Qwen 等） | `https://api.openai.com/v1`；`OPENAI_API_KEY`、`OPENAI_BASE_URL` |
| `openai_responses` | OpenAI Responses API | OpenAI 新版 Responses 接口 | 同上 |
| `google-genai` | Google GenAI | Gemini API | SDK 默认 `https://generativelanguage.googleapis.com`；`GOOGLE_API_KEY` |
| `vertexai` | Vertex 上的 Google GenAI | Google Cloud Vertex AI | 区域化 `*-aiplatform.googleapis.com`；`VERTEXAI_API_KEY` 等 |

上表依据 `configuration/providers.md` 的 Supported provider types 与各 provider 小节 [@ref-kimi-code-providers-types]。要点：

- 协议层只实现四种：`anthropic`、`openai`、`openai_responses`、`google-genai`；`kimi` 走 OpenAI 兼容协议，`vertexai` 复用 `google-genai` 实现并在 `protocol` 层带 `vertexai` 标记 [@ref-kimi-code-src-protocols] [@ref-kimi-code-src-provider-endpoints]。
- `google-genai` 与 `vertexai` 的 `base_url` 只给 host 根：SDK 自己追加 API 版本与路径（如 `/v1beta/models/...:generateContent`），写成带 `/v1beta` 的地址会产生重复路径；可用 `GOOGLE_GEMINI_BASE_URL` / `GOOGLE_VERTEX_BASE_URL` 环境变量覆盖 [@ref-kimi-code-providers-types]。
- `vertexai` 的项目 ID 与区域必须写在 `[providers.vertexai.env]` 子表里，shell 里的 `export GOOGLE_CLOUD_PROJECT` 不会被读取 [@ref-kimi-code-providers-types]。

```toml
# 依据 configuration/providers.md 的 vertexai 一节
[providers.vertexai]
type = "vertexai"

[providers.vertexai.env]
GOOGLE_CLOUD_PROJECT = "my-gcp-project"
GOOGLE_CLOUD_LOCATION = "us-central1"
```

- 兼容层与原生接入的分工：第三方服务只要实现 OpenAI Chat Completions 就能用 `openai` 类型接入，客户端自动处理 `reasoning_content` 字段与 `reasoning_effort` 注入；网关返回非标准推理字段名时用模型别名的 `reasoning_key` 覆盖 [@ref-kimi-code-providers-types] [@ref-kimi-code-config-models]。

## 模型别名与能力元数据 {#providers-models}

每个 `[models.别名]` 条目定义一个别名（用于 `default_model` 或 `-m` 的值）[@ref-kimi-code-config-models]：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `provider` | 是 | 引用的 provider 名，必须在 `providers` 中已定义 |
| `model` | 是 | 请求时发给服务端的模型标识 |
| `max_context_size` | 是 | 最大上下文长度（token），至少为 1 |
| `max_input_size` | 否 | 声明的单请求输入上限；压缩、溢出检查与用量比例优先用它 |
| `max_output_size` | 否 | 单请求输出上限（映射为 `max_tokens`），目前只有 `anthropic` provider 读取 |
| `capabilities` | 否 | 能力标签：`thinking`、`always_thinking`、`image_in`、`video_in`、`audio_in`、`tool_use`、`dynamically_loaded_tools`；只做加法，不会移除自动探测到的能力 |
| `support_efforts` | 否 | 模型接受的思考强度列表；不在列表内的取值回退到 `default_effort` |
| `default_effort` | 否 | 该模型的默认思考强度 |
| `off_effort` | 否 | 关闭思考时发送到线上的取值（如某些模型的 `none`） |
| `base_url` | 否 | 逐模型端点覆盖，优先级高于 provider 的 `base_url`，且只在同时写了 `protocol` 时生效 |
| `display_name` | 否 | UI 显示名，未设时回退 `model` |
| `reasoning_key` | 否 | 仅 `openai` provider，用于指定非标准推理字段名 |
| `adaptive_thinking` | 否 | 仅 `anthropic` provider，强制开启/关闭自适应思考 |

- 能力匹配默认按模型名前缀自动完成，多数情况下不需要手写 `capabilities`；只有自定义或未覆盖的模型需要显式声明 [@ref-kimi-code-providers-types]。
- `dynamically_loaded_tools` 是 MCP 按需加载（`deferred`）的前置条件之一：官方模型自动声明，其他模型需要手动加入 `capabilities` [@ref-kimi-code-mcp-deferred]。
- 别名含 `.` 时必须加引号（`[models."gpt-4.1"]`），否则 TOML 会把它当嵌套表分隔符 [@ref-kimi-code-config-location]。
- 需要让用户覆盖在 provider 模型刷新后仍然保留时，写在 `[models.别名.overrides]` 子表：它接受 `max_context_size`、`max_input_size`、`max_output_size`、`capabilities`、`display_name`、`reasoning_key`、`adaptive_thinking`、`support_efforts`、`default_effort`、`off_effort`，不接受 `provider`、`model`、`protocol`、`beta_api`、`base_url` 这类身份/路由字段 [@ref-kimi-code-config-models]。
- 模型列表与发现：`/provider` 的「已知第三方 provider」路径会从 models.dev 拉取模型目录（离线或网络受限时回退到内置快照），厂商未声明协议的条目按 OpenAI 兼容导入并标注「guessed」，专有协议（Amazon Bedrock、Cohere）与无法识别的显式协议会被拒绝，废弃与 alpha 状态的模型不进导入列表；自定义注册表（api.json）路径会按条目自动创建 `providers`/`models` 条目，并在后续启动时从同一注册表 URL 一起刷新 [@ref-kimi-code-providers-doc] [@ref-kimi-code-cmd-provider]。
- 子 Agent 的模型池只引用已配置的别名：provider 被删除或登出、或刷新后的模型列表不再包含某别名时，会话启动会以配置错误失败并指明坏掉的别名 [@ref-kimi-code-config-secondary]。
- 不想改配置文件时可用 `KIMI_MODEL_*` 家族在内存中合成一个临时 provider 与别名（`KIMI_MODEL_NAME` 同时是启用开关），不写回配置；这些变量优先于 `default_model`，但启动参数 `-m` 仍然最高 [@ref-kimi-code-env-model]。

## 请求参数映射与响应处理 {#providers-forwarding}

- 明确生效的请求侧参数：`max_output_size` 映射为 `max_tokens`（`anthropic`）、`reasoning_key` 改写推理字段名（`openai`）、`base_url`（逐模型）与 provider 的 `base_url` 决定端点、`custom_headers` 附加到每个请求 [@ref-kimi-code-config-models] [@ref-kimi-code-config-providers]。
- 全局 request 级调优（仅 `kimi` provider）：`KIMI_MODEL_MAX_COMPLETION_TOKENS`（每步硬上限）、`KIMI_MODEL_TEMPERATURE`、`KIMI_MODEL_TOP_P`、`KIMI_MODEL_THINKING_EFFORT`（绕过模型的 `support_efforts`）、`KIMI_MODEL_THINKING_KEEP` [@ref-kimi-code-env-switches]。
- 思考强度与保留：`[thinking] enabled`（默认 `true`）、`effort`（`low`/`medium`/`high`/`xhigh`/`max`，不在模型支持列表内时回退模型默认值）、`keep`（默认 `"all"`；`kimi` 协议发 `thinking.keep`，`anthropic` 转成 beta Messages API 的 `clear_thinking_20251015` 编辑，off 值可关闭，`KIMI_MODEL_THINKING_KEEP` 覆盖它），且只在思考开启时注入 [@ref-kimi-code-config-thinking]。
- 传输层：所有 provider 默认以流式方式与模型通信 [@ref-kimi-code-providers-types]。出站流量遵守标准代理变量（`HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`/`NO_PROXY`，支持 socks5 等 scheme；回环地址总是绕过代理）[@ref-kimi-code-env-proxy]。
- 重试：`[loop_control] max_attempts_per_step` 默认 `10`（含首次尝试），可用 `KIMI_LOOP_MAX_ATTEMPTS_PER_STEP` 覆盖；重试只针对瞬时故障——连接错误、超时、HTTP 429 限流与 5xx；因配额耗尽或余额不足导致的 429 不重试，立即失败。`KIMI_CODE_INFINITE_RETRY` 可开启无限重试（指数退避、上限 32 秒、遵守 `Retry-After`）[@ref-kimi-code-config-loop-control] [@ref-kimi-code-env-switches]。
- 优先级对照：普通运行参数是「命令行 > 用户配置文件」两级；少数环境变量显式覆盖对应字段，并在字段说明里标注 [@ref-kimi-code-overrides-priority]。
- 固定来源没有逐条说明每种协议对 tool call、错误对象与流式分片的错误映射；协议适配层的错误分类只体现在模型别名相关字段与重试规则上，逐协议的失败语义不属于已证实结论 [@ref-kimi-code-config-loop-control]。

## 诊断 {#providers-diagnostics}

- 配置是否可读：`kimi doctor`（以及 `kimi doctor config [path]`）在不启动 TUI、不修改文件的前提下校验 `config.toml`（`tui.toml` 同理）；文件合法或被跳过时退出码 `0`，请求的文件缺失或非法时退出码 `1` [@ref-kimi-code-cmd-doctor]。
- 模型是否可选：`/model` 在当前会话切换模型，`/provider` 查看已配置 provider 分组列表，`kimi provider list` 与 `kimi provider catalog list [providerId]` 在 shell 中列出 provider 与目录项 [@ref-kimi-code-slash-account] [@ref-kimi-code-cmd-provider]。
- 请求与用量：`/usage` 显示 token 用量、上下文消耗与配额信息，`/status` 显示版本、模型、工作目录、权限模式等运行时状态；随请求失败返回的错误（如 `api_key_env` 未设置、模型别名未配置）会直接指出字段与变量名 [@ref-kimi-code-slash-info] [@ref-kimi-code-config-models]。
- 日志：`KIMI_LOG_LEVEL`（`off`/`error`/`warn`/`info`/`debug`，默认 `info`）与文件滚动参数在进程启动时读取一次；全局日志位于 `~/.kimi-code/logs/kimi-code.log` [@ref-kimi-code-env-logs]。
- 缺口：「后端实际可用」没有专门的健康检查命令——固定来源只描述在真实请求中暴露失败（认证、限流、配额），以及 `/usage` 的配额视图；没有可离线判定上游可用性的入口 [@ref-kimi-code-slash-info]。
