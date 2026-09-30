---
schema_version: 3
record_kind: production
edition_id: goose-cli-custom_providers-v1
harness_id: goose
topic: custom_providers
title: "Goose CLI 自定义 Provider：定义、认证、协议、模型与转发"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-goose-providers-doc-entry, ref-goose-providers-src-config-dir, ref-goose-providers-src-dir, ref-goose-providers-src-engine, ref-goose-providers-src-file-path, ref-goose-providers-src-id, ref-goose-providers-src-init, ref-goose-providers-src-register, ref-goose-providers-src-registry-refresh, ref-goose-providers-src-schema]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-goose-providers-doc-auth-command, ref-goose-providers-doc-config-keys, ref-goose-providers-src-apikey-name, ref-goose-providers-src-auth-exclusive, ref-goose-providers-src-auth-fields, ref-goose-providers-src-auth-switch, ref-goose-providers-src-keyresolver, ref-goose-providers-src-secret-store]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-goose-providers-doc-entry, ref-goose-providers-doc-openai-endpoints, ref-goose-providers-src-engine-dispatch, ref-goose-providers-src-envvars, ref-goose-providers-src-resolve-config]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-goose-providers-doc-custom-config, ref-goose-providers-doc-env-basic, ref-goose-providers-src-capabilities, ref-goose-providers-src-config-keys, ref-goose-providers-src-context-limit, ref-goose-providers-src-dynamic-models, ref-goose-providers-src-envvars-keys, ref-goose-providers-src-known-models, ref-goose-providers-src-metadata, ref-goose-providers-src-modelinfo, ref-goose-providers-src-registry-refresh]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-goose-providers-doc-retries, ref-goose-providers-src-headers, ref-goose-providers-src-metadata, ref-goose-providers-src-request-params, ref-goose-providers-src-schema, ref-goose-providers-src-streaming]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-providers-doc-catalog-link, ref-goose-providers-doc-info, ref-goose-providers-src-cli-info, ref-goose-providers-src-errors, ref-goose-providers-src-loaded-signals]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-goose-providers-doc-entry, ref-goose-providers-src-config-dir, ref-goose-providers-src-dir, ref-goose-providers-src-engine, ref-goose-providers-src-file-path, ref-goose-providers-src-id, ref-goose-providers-src-init, ref-goose-providers-src-register, ref-goose-providers-src-registry-refresh, ref-goose-providers-src-schema]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-goose-providers-doc-auth-command, ref-goose-providers-doc-config-keys, ref-goose-providers-src-apikey-name, ref-goose-providers-src-auth-exclusive, ref-goose-providers-src-auth-fields, ref-goose-providers-src-auth-switch, ref-goose-providers-src-keyresolver, ref-goose-providers-src-secret-store]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: partial
        source_refs: [ref-goose-providers-doc-entry, ref-goose-providers-doc-openai-endpoints, ref-goose-providers-src-engine-dispatch, ref-goose-providers-src-envvars, ref-goose-providers-src-resolve-config]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-goose-providers-doc-custom-config, ref-goose-providers-doc-env-basic, ref-goose-providers-src-capabilities, ref-goose-providers-src-config-keys, ref-goose-providers-src-context-limit, ref-goose-providers-src-dynamic-models, ref-goose-providers-src-envvars-keys, ref-goose-providers-src-known-models, ref-goose-providers-src-metadata, ref-goose-providers-src-modelinfo, ref-goose-providers-src-registry-refresh]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-goose-providers-doc-custom-config, ref-goose-providers-doc-env-basic, ref-goose-providers-src-capabilities, ref-goose-providers-src-config-keys, ref-goose-providers-src-context-limit, ref-goose-providers-src-dynamic-models, ref-goose-providers-src-envvars-keys, ref-goose-providers-src-known-models, ref-goose-providers-src-metadata, ref-goose-providers-src-modelinfo, ref-goose-providers-src-registry-refresh]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-goose-providers-doc-retries, ref-goose-providers-src-headers, ref-goose-providers-src-metadata, ref-goose-providers-src-request-params, ref-goose-providers-src-schema, ref-goose-providers-src-streaming]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-goose-providers-doc-retries, ref-goose-providers-src-headers, ref-goose-providers-src-metadata, ref-goose-providers-src-request-params, ref-goose-providers-src-schema, ref-goose-providers-src-streaming]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-goose-providers-doc-catalog-link, ref-goose-providers-doc-info, ref-goose-providers-src-cli-info, ref-goose-providers-src-errors, ref-goose-providers-src-loaded-signals]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938` 的官方 Providers 文档与 Rust 源码快照。快照包含 `crates/goose` 与 `crates/goose-cli` 的相关文件，但**不含定义配置类型与引擎实现的 `crates/goose-providers` crate**，因此凡涉及字段的 serde 默认值、请求报文形状与重试逻辑，本章只按官方文档记录并明确标注未验证。文档快照不含适用软件版本号。

## 自定义 Provider 的定义入口与字段 {#providers-entry}

自定义 provider 是「一个 provider 一个 JSON 文件」，目录为 `CONFIG_DIR/custom_providers/`：源码里 `custom_providers_dir()` 就是 `Paths::config_dir().join("custom_providers")` [@ref-goose-providers-src-dir]，`config_dir` 由 directories crate 的 app 策略解析（作者与顶层域 `Block`、应用名 `goose`），设置绝对路径的 `GOOSE_PATH_ROOT` 时改为 `GOOSE_PATH_ROOT/config` [@ref-goose-providers-src-config-dir]。文档给出解析后的路径：macOS/Linux 是 `~/.config/goose/custom_providers/`，Windows 是 `%APPDATA%\Block\goose\config\custom_providers\` [@ref-goose-providers-doc-entry]。

文件名必须正好是 `ID.json`；id 含 `/`、`\` 或控制字符时直接拒绝，避免路径穿越 [@ref-goose-providers-src-file-path]。新建时自动生成的 id 形如 `custom_归一化的显示名`，冲突时追加 `_计数` [@ref-goose-providers-src-id]，且新 id 的首字符只允许 `[a-z0-9_]`、其余字符 `[a-z0-9_-]` [@ref-goose-providers-src-id]。

文档给出的最小 JSON 示例（字段名与源码一致）[@ref-goose-providers-doc-entry]：

```json
{
  "name": "custom_corp_api",
  "engine": "openai",
  "display_name": "Corporate API",
  "description": "Custom Corporate API provider",
  "api_key_env": "CUSTOM_CORP_API_API_KEY",
  "base_url": "https://api.company.com/v1/chat/completions",
  "models": [
    { "name": "gpt-4o", "context_limit": 128000 }
  ],
  "headers": {
    "x-origin-client-id": "YOUR_CLIENT_ID"
  },
  "supports_streaming": true,
  "requires_auth": true
}
```

字段全集（以源码里构造 `DeclarativeProviderConfig` 的位置为准，类型按构造值推断）[@ref-goose-providers-src-schema]：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 即 id，取自文件名 |
| `engine` | string | 只接受 `openai`、`anthropic`、`ollama` 三种，穷举匹配、没有兜底分支 [@ref-goose-providers-src-engine] |
| `display_name` | string | 展示名 |
| `description` | string? | 描述；UI 元数据 |
| `api_key_env` | string | 凭据键名；用 `auth` 命令时为空串 |
| `base_url` | string | API 基地址，支持 `${VAR}` 占位 |
| `models` | array | 模型条目数组，见下文 |
| `headers` | object? | 附加 HTTP 头 |
| `session_id_header_override` | string? | 会话头覆盖（用途未在快照内确立） |
| `timeout_seconds` | number? | 超时 |
| `supports_streaming` | bool? | 是否流式 |
| `requires_auth` | bool | 是否需要凭据 |
| `catalog_provider_id` | string? | 关联内置目录 provider 的清单身份 |
| `base_path` | string? | 路径前缀（语义未在快照内确立） |
| `env_vars` | array? | `${NAME}` 占位声明，见「协议与转发」 |
| `auth` | object? | 命令式取凭据，与 `api_key_env` 互斥 |
| `dynamic_models` | bool? | 是否启用模型发现 |
| `skip_canonical_filtering` | bool | 默认 `false` |
| `model_doc_link` | string? | 模型文档链接 |
| `setup_steps` | array | 默认 `[]` |
| `toolshim` | bool | 是否启用工具解释 |
| `preserves_thinking` | bool | 是否保留思考内容 |
| `emit_clear_thinking` | bool | 默认 `false` |
| `setup` | object? | 默认 `null` |

文档给出的 engine 取值与界面标签是 `OpenAI Compatible`（最常见）、`Anthropic Compatible`、`Ollama Compatible`，并明确「自定义 provider 必须使用 OpenAI、Anthropic 或 Ollama 兼容 API 格式」[@ref-goose-providers-doc-entry]。

加载时机：注册表初始化时先注册内置目录 provider（类型 `Declarative`），再逐个注册 `custom_providers/` 下的文件（类型 `Custom`）[@ref-goose-providers-src-register]；加载失败只记 `tracing::warn!` 警告，不中断启动 [@ref-goose-providers-src-init]。`refresh_custom_providers()` 会先移除所有以 `custom_` 开头的条目再从磁盘重载，因此手工命名不以 `custom_` 开头的文件虽然会被注册为 `Custom`，却不会被刷新移除 [@ref-goose-providers-src-registry-refresh]。

## 凭据的提供与刷新 {#providers-auth}

两条互斥路径，同时设置会报 `cannot set both apiKey and auth.command` [@ref-goose-providers-src-auth-exclusive]：

* **静态 API key**：`api_key_env` 指向一个配置键，UI 生成的名字是 `PROVIDER_ID_API_KEY` [@ref-goose-providers-src-apikey-name]。解析顺序是「环境变量（键名大写）→ 系统钥匙串 → 钥匙串禁用或不可用时回落到 `~/.config/goose/secrets.yaml`」[@ref-goose-providers-src-secret-store]；goose 侧通过 `ConfigKeyResolver` 把这个键桥接给声明式配置 [@ref-goose-providers-src-keyresolver]。
* **命令式取凭据**：`auth` 对象含 `command`、`args`、`refresh_interval`、`timeout_seconds`、`cwd` [@ref-goose-providers-src-auth-fields]。文档给出的默认值与语义：`refresh_interval` 默认 `3600` 秒（设为 `0` 关闭主动刷新，改为在 API 返回鉴权错误后被动重跑）、`timeout_seconds` 默认 `10` 秒、`cwd` 默认 goose 当前目录；命令被直接 spawn 不经 shell（裸名走 `PATH`，相对路径按 `cwd` 解析），标准输出去掉首尾空白后作为凭据，必须成功退出且输出非空，否则报错而不是沿用旧凭据 [@ref-goose-providers-doc-auth-command]。

文档给出的互斥示例（`auth` 与 `api_key_env` 二选一，凭据一律用占位值）[@ref-goose-providers-doc-auth-command]：

```json
{
  "name": "custom_corp_api",
  "engine": "openai",
  "display_name": "Corporate API",
  "base_url": "https://api.company.com/v1/chat/completions",
  "models": [{ "name": "gpt-4o", "context_limit": 128000 }],
  "requires_auth": true,
  "auth": {
    "command": "/path/to/get-token.sh",
    "args": [],
    "refresh_interval": 3600,
    "timeout_seconds": 10
  }
}
```

配置里不要写真实凭据：`api_key_env` 只是键名，值进钥匙串或 `secrets.yaml`；文档同时提醒 provider 的 API key 不写在 `config.yaml`（写在里面会被忽略，表现为 `No api key passed in` 之类鉴权失败）[@ref-goose-providers-doc-config-keys]。更新为命令式鉴权时，源码会删除此前按 `ID_API_KEY` 生成的存储项 [@ref-goose-providers-src-auth-switch]。

## 协议与引擎路由 {#providers-protocol}

`engine` 决定由哪个实现服务该配置 [@ref-goose-providers-src-engine-dispatch]：

| engine | 实际实现 | 说明 |
| --- | --- | --- |
| `openai` | 先判断是否命中 `HuggingFaceProvider`，再判断是否命中 `OllamaCloudProvider`，都不是才用通用 OpenAI 实现 | 兼容层/专用实现优先 |
| `ollama` | Ollama 实现 | |
| `anthropic` | Anthropic 实现 | |

`base_url` 原样取自配置，只做 `${VAR}` 展开，展开时机是**provider 实例化时（惰性）**，以便通过 UI 在启动后写入的值能被采纳 [@ref-goose-providers-src-resolve-config]。`${VAR}` 的取值规则：`env_vars` 里声明过的名字从配置密钥库（`secret: true`）或普通参数取，缺失时用 `default`，`required` 且缺失则报 `Required environment variable {} is not set` [@ref-goose-providers-src-envvars]。

未验证项（重要）：具体的请求路径与报文形状（`/v1/chat/completions` 之类的拼接、Anthropic 消息体、Ollama 接口、以及兼容层做的改造）都在本次未签出的 `crates/goose-providers` 里，源码证据不足，只能按文档的「必须使用 OpenAI/Anthropic/Ollama 兼容格式」理解 [@ref-goose-providers-doc-entry]。文档另给出内置 OpenAI provider 指向自定义端点的参数（`OPENAI_HOST`、`OPENAI_BASE_PATH`、`OPENAI_ORGANIZATION`、`OPENAI_PROJECT`、`OPENAI_CUSTOM_HEADERS`、`OPENAI_STORE`）与「一个端点用两种方式只选其一、不要混用」的提醒 [@ref-goose-providers-doc-openai-endpoints]。

## 模型清单与能力元数据 {#providers-models}

`models` 是数组，条目字段为 `name`、`resolved_model`、`context_limit`、`input_token_cost`、`output_token_cost`、`currency`、`supports_cache_control`、`reasoning`、`thinking_preservation_format`、`request_params` [@ref-goose-providers-src-modelinfo]。注册进注册表时，`resolved_model` 强制为 `None`、`supports_cache_control` 缺省补 `false`，模型数组整体成为 `known_models`，第一条模型名成为 `default_model`（数组为空则为空串）[@ref-goose-providers-src-known-models]。

`context_limit` 的优先级：文件里的 `context_limit` 生效；写成 `0` 时回落到各实现里的默认上下文上限常量；显式覆盖（如 `GOOSE_CONTEXT_LIMIT` 或调用处传值）优先于两者 [@ref-goose-providers-src-context-limit]。文档侧对同一个键的描述是「覆盖主模型的最大上下文令牌数，缺省为模型特定值或 128000」[@ref-goose-providers-doc-env-basic]。

模型发现（拉取可用模型列表）是逐配置开关：只有 `dynamic_models` 为真才会把该能力传给注册表，缺省按 `false` 处理 [@ref-goose-providers-src-dynamic-models]；刷新走 `refresh_custom_providers()`（先清 `custom_*` 再重载）[@ref-goose-providers-src-registry-refresh]。文档记述的界面行为是「可用模型是逗号分隔列表」，并且 `goose configure` 不支持输入自定义模型名，要用不在列表里的模型需改 `GOOSE_MODEL` [@ref-goose-providers-doc-custom-config]。

能力元数据只有上表这些：快照里**没有**视觉/图像、嵌入、单独的输出上限，也没有逐模型的流式开关；若存在也在未签出的 crate 里，本章按「未确立」处理，而不是断言不存在 [@ref-goose-providers-src-capabilities]。

`ProviderMetadata` 的合成：带入 `name`、`display_name`、`description`（缺省回落到 `Custom DISPLAY_NAME provider`）、`default_model`、`known_models`、`model_doc_link`（缺省继承基础 provider 的值）、`setup_steps`、`setup`，`deprecated` 恒为 `None` [@ref-goose-providers-src-metadata]。`config_keys` 的合成规则是：`ProviderType::Declarative` 只加入 `api_key_env` 一项（required 取 `requires_auth`、secret=true、primary=true），`api_key_env` 为空时不加；其它类型复制基础 provider 的键，并在关闭鉴权或使用 `auth` 命令时去掉首个 secret 键，或换成 `api_key_env` [@ref-goose-providers-src-config-keys]。`env_vars` 声明会追加为配置键，`primary` 缺省等于 `required`，以便必填项在界面上突出显示 [@ref-goose-providers-src-envvars-keys]。

## 参数转发与响应约定 {#providers-forwarding}

| 配置项 | 去向 | 证据 |
| --- | --- | --- |
| `headers` | 原样交给引擎，用于请求附加头 | [@ref-goose-providers-src-headers] |
| `supports_streaming` | 可被名字以 `_STREAMING` 结尾的 `env_vars` 覆盖（先按字符串与 `"true"` 比较，再按原生布尔，最后用默认值） | [@ref-goose-providers-src-streaming] |
| `models[].request_params` | 每个模型一个 JSON 对象，合并进请求参数；更新 provider 时若模型名不变会保留 | [@ref-goose-providers-src-request-params] |
| `timeout_seconds`、`session_id_header_override`、`base_path` | 仅被携带在配置结构上，消费点在未签出的 crate 内 | [@ref-goose-providers-src-schema] |

仅影响界面/元数据的字段是 `display_name`、`description`、`model_doc_link`、`setup_steps`、`setup`、`catalog_provider_id`：它们在合成 `ProviderMetadata` 时被读取，不参与请求 [@ref-goose-providers-src-metadata]。

响应侧：快照内可确认的只有流式开关一项，**没有任何重试、退避或错误映射代码**；重试与超时常量（`DEFAULT_CONNECT_TIMEOUT_SECS`、`DEFAULT_PROVIDER_TIMEOUT_SECS`）只以重导出形式出现在 `providers/base.rs`，实现不在签出范围 [@ref-goose-providers-src-streaming]。文档给出的重试相关项只针对 AWS Bedrock 与 Databricks 两个内置 provider 的环境变量（如 `BEDROCK_MAX_RETRIES` 默认 6）[@ref-goose-providers-doc-retries]，对自定义 provider 的后端约定没有额外说明。本节据此只写「流式可配」，重试与错误语义记为来源级缺口。

## 诊断 {#providers-diagnostics}

可观测信号：

* 配置校验错误是明确的字符串，例如 `Invalid provider id: ...`、`Provider not found: ID`、`apiKey cannot be empty`、`apiKey is required when auth is enabled and no secret is stored`、`cannot set both apiKey and auth.command` [@ref-goose-providers-src-errors]。
* 已加载与否：`providers()` 返回全部已注册 provider 的元数据与类型（自定义文件显示为 `Custom`），刷新时记一条 `Custom providers refreshed` 日志；按名取不到时报 `Unknown provider: NAME` [@ref-goose-providers-src-loaded-signals]。
* `goose info` 展示配置信息，`-v/--verbose` 显示完整配置、`--check` 测试 provider 连接并显示状态 [@ref-goose-providers-src-cli-info]。文档把 `goose info -v` 描述为「显示全部生效设置及其当前值」[@ref-goose-providers-doc-info]。

区分配置可读、模型可选、请求已发送与后端可用：`providers()` 能证明文件被解析并注册，`goose info --check` 是文档给出的连接测试入口，而「请求已发送」「后端真实可用」在固定来源内没有独立信号；`goose info -v` 的具体打印内容其实现文件不在签出范围 [@ref-goose-providers-src-cli-info]。

缺口汇总：`crates/goose-providers` 未签出，字段 serde 默认值、请求报文、重试与错误映射均未验证；`custom_providers/` 的文件名过滤规则（是否只认 `*.json`）、坏文件处理与是否递归子目录未确立；自定义 provider JSON 的写盘权限（`write_private_file`）未确立；内置目录 JSON 的实际位置只能按文档链接记录 [@ref-goose-providers-doc-catalog-link]。
