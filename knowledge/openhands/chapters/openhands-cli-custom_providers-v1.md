---
schema_version: 3
record_kind: production
edition_id: openhands-cli-custom_providers-v1
harness_id: openhands
topic: custom_providers
title: "OpenHands CLI 的自定义 Provider：配置、认证、协议、模型元数据与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-pyproject, ref-openhands-cli-readme-status, ref-openhands-canvas-boundaries]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-readme-config, ref-openhands-cli-locations, ref-openhands-cli-runtime-config, ref-openhands-cli-settings-utils, ref-openhands-sdk-llm-model, ref-openhands-sdk-settings-version, ref-openhands-sdk-settings-agent, ref-openhands-docs-llm-basic, ref-openhands-docs-config-where, ref-openhands-docs-cli-config-files]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-llm-model, ref-openhands-sdk-llm-fields, ref-openhands-cli-env-overrides, ref-openhands-cli-env-flag, ref-openhands-sdk-llm-env, ref-openhands-sdk-llm-profile-store, ref-openhands-docs-llm-profiles, ref-openhands-docs-env-llm]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-llm-proxy, ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-model, ref-openhands-sdk-llm-env, ref-openhands-docs-customllm-how, ref-openhands-docs-customllm-using]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-settings-utils, ref-openhands-sdk-llm-proxy, ref-openhands-sdk-llm-modelinfo, ref-openhands-sdk-settings-migrations, ref-openhands-docs-cli-model]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-llm-modelinfo, ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-reasoning, ref-openhands-sdk-llm-model, ref-openhands-docs-llm-basic]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-fields, ref-openhands-sdk-llm-model, ref-openhands-cli-settings-utils, ref-openhands-docs-llm-switch, ref-openhands-cli-settings-tab]
  - section_id: providers-responses
    surface_ids: [cli]
    source_refs: [ref-openhands-sdk-llm-fields, ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-retry, ref-openhands-sdk-llm-fallback, ref-openhands-sdk-llm-errors, ref-openhands-sdk-llm-modelinfo, ref-openhands-docs-env-llm]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-cli-env-overrides, ref-openhands-cli-entrypoint, ref-openhands-cli-runtime-config, ref-openhands-cli-settings-utils, ref-openhands-cli-settings-tab, ref-openhands-cli-restart-notice, ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-docs-env-naming, ref-openhands-docs-config-vars, ref-openhands-sdk-llm-profile-store, ref-openhands-docs-env-deprecated, ref-openhands-sdk-settings-migrations]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-openhands-cli-readme-config, ref-openhands-cli-locations, ref-openhands-cli-runtime-config, ref-openhands-cli-settings-utils, ref-openhands-sdk-llm-model, ref-openhands-sdk-settings-agent, ref-openhands-docs-config-where]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-openhands-sdk-llm-model, ref-openhands-sdk-llm-fields, ref-openhands-cli-env-overrides, ref-openhands-cli-env-flag, ref-openhands-sdk-llm-profile-store, ref-openhands-docs-llm-profiles, ref-openhands-docs-env-llm]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: answered
        source_refs: [ref-openhands-sdk-llm-proxy, ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-model, ref-openhands-docs-customllm-how]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-openhands-cli-settings-utils, ref-openhands-sdk-llm-proxy, ref-openhands-sdk-llm-modelinfo, ref-openhands-sdk-settings-migrations, ref-openhands-docs-cli-model]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-openhands-sdk-llm-modelinfo, ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-reasoning, ref-openhands-sdk-llm-model]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: answered
        source_refs: [ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-fields, ref-openhands-sdk-llm-model, ref-openhands-cli-settings-utils, ref-openhands-docs-llm-switch]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-responses
        status: answered
        source_refs: [ref-openhands-sdk-llm-fields, ref-openhands-sdk-llm-options, ref-openhands-sdk-llm-retry, ref-openhands-sdk-llm-fallback, ref-openhands-sdk-llm-errors]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-openhands-cli-env-overrides, ref-openhands-cli-runtime-config, ref-openhands-cli-settings-utils, ref-openhands-cli-restart-notice, ref-openhands-cli-locations, ref-openhands-cli-cli-settings, ref-openhands-docs-env-naming, ref-openhands-docs-config-vars]
---

## 固定来源与调查范围 {#providers-scope}

本页只回答 CLI 界面（`surface_id: cli`）。固定来源：CLI 仓库 `OpenHands/OpenHands-CLI@954f2ba`（包 `openhands` 1.16.0，入口 `openhands = openhands_cli.entrypoint:main`）[@ref-openhands-cli-pyproject]，该仓库说明已不再积极维护 [@ref-openhands-cli-readme-status]；模型访问层由 CLI 依赖的 `openhands-sdk==1.28.1` 提供（本目录固定提交 `edaac806`）[@ref-openhands-cli-pyproject]；产品 Web 端位于另一官方仓库 [@ref-openhands-canvas-boundaries]。官方文档站点页面作为文档快照来源，适用软件版本未知；其中 Agent Canvas 或多版本共用的描述会明确标注归属。

## 配置入口与作用域 {#providers-entry}

CLI 只有一个持久模型配置：`{~/.openhands}/agent_settings.json`，内容是序列化后的 Agent（含 `llm` 对象）；状态根可由 `OPENHANDS_PERSISTENCE_DIR` 改写 [@ref-openhands-cli-readme-config] [@ref-openhands-cli-locations]。装载流程是「读取磁盘 → 可选环境变量覆盖 → 运行时配置覆盖」，其中运行时配置（工具、MCP、Agent 上下文、critic）每次都重算，因此磁盘上的工具/MCP 字段不是最终生效值，而 `llm` 字段来自磁盘（或环境覆盖）[@ref-openhands-cli-runtime-config]。

用户改模型的两条路径：

- 交互式设置界面：`/settings` 打开的表单含 provider、model、自定义模型名、base URL、API Key、超时（10–3600 秒）、max tokens、记忆压缩开关与阈值；保存时按 `provider/model` 拼出完整模型名，构造 `LLM(model=..., api_key=..., base_url=..., usage_id="agent", timeout=..., max_input_tokens=...)` 并写回磁盘；压缩器使用同一模型的 `usage_id="condenser"` 副本 [@ref-openhands-cli-settings-utils]。
- 首启引导：磁盘没有配置且未开启环境覆盖时会强制走设置界面，默认模型推荐值形如 `claude-sonnet-4-5-20250929` [@ref-openhands-cli-settings-utils]。

SDK 侧的 `LLM` 字段与默认值（摘录）：`model` 默认 `gpt-5.5`、`api_key` 默认空、`base_url` 默认空、`api_version` 默认空、`extra_headers` 默认空、`usage_id` 默认 `default`、`litellm_extra_body` 默认空、`fallback_strategy` 默认空 [@ref-openhands-sdk-llm-model]。`agent_settings.json` 对应 SDK 的 AgentSettings 模型（`AGENT_SETTINGS_SCHEMA_VERSION = 4`）[@ref-openhands-sdk-settings-version] [@ref-openhands-sdk-settings-agent]。文档里“LLM 设置”页的字段解释（模型名、API Key、base URL）与上述字段对应 [@ref-openhands-docs-llm-basic]；文档说明 V1 的配置落在 `~/.openhands` 下的状态目录 [@ref-openhands-docs-config-where]，CLI 自身的配置文件清单（`agent_settings.json`、`cli_config.json`、`mcp.json`）见命令参考页 [@ref-openhands-docs-cli-config-files]。

## 认证与凭据 {#providers-auth}

- 磁盘配置：`api_key` 与 `base_url` 直接写在 `agent_settings.json` 的 `llm` 中；这些字段属于 SDK 的密钥字段集合（`api_key`、AWS 凭据三项），序列化时有专门的脱敏/加密通道 [@ref-openhands-sdk-llm-model] [@ref-openhands-sdk-llm-fields]。
- 环境变量覆盖：仅在显式传入 `--override-with-envs` 时生效，且只读三个变量 `LLM_API_KEY`、`LLM_MODEL`、`LLM_BASE_URL`；未传该开关时这三个变量被忽略并打印提示 [@ref-openhands-cli-env-overrides] [@ref-openhands-cli-env-flag]。覆盖是部分覆盖：只改 `llm`（及压缩器 LLM）的对应字段，其余 Agent 字段仍来自磁盘 [@ref-openhands-cli-env-overrides]。
- 库级环境变量：SDK 另有 `LLM.load_from_env(prefix="LLM_")`，把 `LLM_<字段名>` 映射成 LLM 字段，可完全脱离文件构造 LLM；CLI 未使用这条路径 [@ref-openhands-sdk-llm-env]。
- 配置档案与脱敏：`LLMProfileStore` 把模型配置存到 `~/.openhands/profiles`（目录受文件锁保护，名称需匹配 `^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$`），保存时默认掩码密钥字段 `api_key`，需要显式开启才写入真实密钥 [@ref-openhands-sdk-llm-profile-store]。文档对档案位置的说明与掩码行为一致 [@ref-openhands-docs-llm-profiles]。
- 环境变量文档：LLM 相关的环境变量在官方参考页中按 `LLM_` 前缀列出，与 CLI 仅支持三个变量不同；跨版本同名变量列在“弃用”小节，迁移时需按该页核对 [@ref-openhands-docs-env-llm]。

## 请求协议与兼容层 {#providers-protocol}

SDK 不自己实现各家协议，而是通过 LiteLLM 发请求；模型串里的 `openhands/` 前缀在调用前被翻译成 `litellm_proxy/`，base URL 缺省时用 `https://llm-proxy.app.all-hands.dev` [@ref-openhands-sdk-llm-proxy]。从磁盘加载 LLM 时会做一次规范化（把指向代理的 `litellm_proxy/<模型>` 改写回 `openhands/<模型>`，避免重复前缀）[@ref-openhands-sdk-llm-proxy]。

同一套模型串可选择两种端点形态：`completion()` 走 chat completions，部分模型（能力表登记的 `gpt-5`、`codex-mini-latest` 等）走 Responses API；两条路径各有参数归一化函数 [@ref-openhands-sdk-llm-options] [@ref-openhands-sdk-llm-model]。OpenRouter 请求头由 `openrouter_site_url` / `openrouter_app_name` 生成；Bedrock 走 IAM 签名时即使填了 `api_key` 也会被忽略，AWS 参数按每次调用传入 [@ref-openhands-sdk-llm-model]。

文档层面：`config.toml` 的多命名 `[llm]` / `[llm.名称]` 配置属于旧版应用路径，不是本 CLI 的存储格式，可作对照但不要直接照抄到 `agent_settings.json` [@ref-openhands-docs-customllm-how] [@ref-openhands-docs-customllm-using]；SDK 侧的环境变量构造路径见 SDK 文档 [@ref-openhands-sdk-llm-env]。

## 模型标识与发现 {#providers-models}

- 模型串是 LiteLLM 的“provider 名/模型名”形式；设置界面在“基础”模式下始终补全 provider 前缀（即使模型名里已含斜杠）[@ref-openhands-cli-settings-utils]。
- 首方代理：`openhands/<模型>` 被翻译为 `litellm_proxy/<模型>` 并把 base URL 指向官方代理，因此同一份配置既可用官方代理也可换自建网关（改 `base_url`）[@ref-openhands-sdk-llm-proxy]。
- 模型清单：设置界面的 provider/model 选项来自 SDK 内置的“已验证模型”表与 LiteLLM 的模型列表；推荐列表是代码中的静态清单 [@ref-openhands-cli-settings-utils]。
- 运行期元数据发现：上下文窗口、最大输出等在构造 LLM 时通过 LiteLLM 的模型信息接口查询（代理场景会访问 `/v1/model/info`，结果按小时缓存）[@ref-openhands-sdk-llm-modelinfo]。
- 迁移：AgentSettings 有 v0→v4 的逐级迁移，其中 v3→v4 会规范化上面提到的代理前缀，避免老配置在升级后指向错误端点 [@ref-openhands-sdk-settings-migrations]。
- 文档的命令参考页给出一条 CLI 侧的模型来源说明（设置界面 / 配置文件 / 环境变量三种改法）[@ref-openhands-docs-cli-model]。

## 能力元数据如何生效 {#providers-metadata}

- 上下文窗口：优先用配置里的 `max_input_tokens`，否则用模型信息查询结果；已知窗口小于 16384 token 会拒绝构造 LLM，除非设置环境变量 `ALLOW_SHORT_CONTEXT_WINDOWS` [@ref-openhands-sdk-llm-modelinfo]。
- 输出上限：优先模型信息；个别模型有硬编码值（如 `claude-sonnet-4`、`kimi-k2-thinking` 为 64000），否则取 `min(模型 max_tokens, 16384)`；这些值最终作为请求参数默认值注入 [@ref-openhands-sdk-llm-modelinfo] [@ref-openhands-sdk-llm-options]。
- 推理与思考：`reasoning_effort` 默认 `high`，可选 `low/medium/high/xhigh/none`；扩展思考模型会按 `extended_thinking_budget`（默认 200000）设置 thinking 预算并附带对应 beta 头 [@ref-openhands-sdk-llm-reasoning]。
- 采样默认：`temperature`、`top_p`、`top_k` 默认未设置，由文生参数归一化决定是否下发（推理型模型默认丢弃 temperature/top_p，Gemini 例外）[@ref-openhands-sdk-llm-model] [@ref-openhands-sdk-llm-options]。
- 能力表：prompt 缓存、Responses API、强制字符串序列化、内联图片等以模型名匹配表实现，含 `!` 前缀的排除规则，匹配按表顺序、后者覆盖前者 [@ref-openhands-sdk-llm-modelinfo]。
- 文档只描述了模型选择与档案切换，未给出这些元数据的计算规则 [@ref-openhands-docs-llm-basic]。

## 配置到请求的映射 {#providers-forwarding}

配置字段→请求参数的链路是：`_prepare_completion_params` → `_finalize_completion_params` → `select_chat_options`/`select_responses_options`；归一化只“填补缺省”，用户显式给出的键优先 [@ref-openhands-sdk-llm-options]。

- 下发控制：`drop_params=True` 与 `modify_params=True` 默认开启，允许 LiteLLM 丢弃/改写后端不支持的参数 [@ref-openhands-sdk-llm-fields]。
- 透传：`extra_headers` 合并进请求头（OpenRouter 专用头在用户未覆盖时补上）；`litellm_extra_body` 原样作为额外请求体下发 [@ref-openhands-sdk-llm-options] [@ref-openhands-sdk-llm-model]。
- 提示缓存：`caching_prompt=True`、`prompt_cache_retention="24h"`，仅在能力表支持时下发；缓存键可选 [@ref-openhands-sdk-llm-model] [@ref-openhands-sdk-llm-options]。
- 仅界面/路由的影响：设置界面里的超时与 max tokens 会进入 LLM 对象并影响请求；而 `usage_id`（`agent`/`condenser`）只用于指标归属与路由，不影响请求参数 [@ref-openhands-cli-settings-utils] [@ref-openhands-sdk-llm-model]。
- 文档所述的“在会话中切换档案”（`/model` 与动态选模）是 Web 端行为；CLI 侧没有对应实现，改模型需回到设置界面或环境覆盖后重开会话 [@ref-openhands-docs-llm-switch] [@ref-openhands-cli-settings-tab]。

## 流式、重试、回退与错误 {#providers-responses}

- 流式：`stream` 默认关闭；开启流式必须提供 `on_token` 回调，否则构造报错；流式请求会附带 usage 统计选项 [@ref-openhands-sdk-llm-fields] [@ref-openhands-sdk-llm-options]。
- 重试：默认 `num_retries=5`，指数退避参数 `retry_multiplier=8.0`、`retry_min_wait=8`、`retry_max_wait=64` 秒，整体超时 `timeout=300` 秒；只对连接错误、限流、服务不可用、超时、内部错误与“无回复”这类可重试异常生效，且最后一次失败会原样抛出 [@ref-openhands-sdk-llm-retry] [@ref-openhands-sdk-llm-fields]。
- 回退：`fallback_strategy` 可配置按顺序尝试的备用档案；成功后把备用模型的指标并入主模型，且禁用嵌套回退 [@ref-openhands-sdk-llm-fallback]。
- 错误映射：供应商异常按“上下文超限 → 历史消息格式错误 → 认证 → 限流 → 超时 → 连接/服务错误 → 请求非法”的顺序映射为 SDK 异常，便于分别处理 [@ref-openhands-sdk-llm-errors]。
- 宿主要求后端满足的约定：模型名可被 LiteLLM 识别、可选地暴露 `/v1/model/info`（否则退回内置模型信息）、支持 json 结构化消息与工具调用；不支持参数可通过 `drop_params`/`modify_params` 规避 [@ref-openhands-sdk-llm-fields] [@ref-openhands-sdk-llm-modelinfo]。
- 文档的环境变量参考页列出了 LLM 相关变量（含代理与密钥），可用于对照自建网关的接入方式 [@ref-openhands-docs-env-llm]。

## 诊断 {#providers-diagnostics}

1. 环境变量是否被忽略：设置了 `LLM_API_KEY`/`LLM_MODEL`/`LLM_BASE_URL` 但没加 `--override-with-envs` 时，CLI 启动会打印“检测到环境变量但将被忽略”的提示 [@ref-openhands-cli-env-overrides]；该开关通过参数解析进入主流程 [@ref-openhands-cli-entrypoint]。
2. 配置是否可读：`agent_settings.json` 解析失败时 CLI 打印“Agent configuration file is corrupted!”，随后按“无配置”处理（可能要求重新初始化）[@ref-openhands-cli-runtime-config]。
3. 保存校验：设置表单会校验超时（10–3600 秒）、max tokens 大于 0、压缩阈值大于 30，失败时返回错误信息而不是静默丢弃 [@ref-openhands-cli-settings-utils]。
4. 写入后是否生效：设置界面帮助文本写“保存后立即生效”，但已有会话会另外提示“请重启 CLI 使更改生效”——以重启提示为准 [@ref-openhands-cli-settings-tab] [@ref-openhands-cli-restart-notice]。
5. 目录不一致（已知坑）：状态根在 `locations.py` 读的是环境变量 `OPENHANDS_PERSISTENCE_DIR`，而 CLI 偏好文件的读取（`cli_config.json`）读的是 `PERSISTENCE_DIR` [@ref-openhands-cli-locations] [@ref-openhands-cli-cli-settings]；官方文档又写作 `OH_PERSISTENCE_DIR` [@ref-openhands-docs-env-naming] [@ref-openhands-docs-config-vars]。三者从未在代码中对齐，设置其中一个只会移动部分状态，表现为“文件写了但读的是另一个目录”；排查时用 `env | grep -i persistence` 与实际文件路径核对。
6. 档案与密钥：`LLMProfileStore` 默认掩码密钥，读取档案时不要把它当作完整凭据来源 [@ref-openhands-sdk-llm-profile-store]；旧版配置键（如 TOML 时代的环境变量）列在文档“Deprecated Variables”小节，升级时需逐项替换 [@ref-openhands-docs-env-deprecated] [@ref-openhands-sdk-settings-migrations]。
