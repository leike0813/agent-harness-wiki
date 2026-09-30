---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-custom_providers-v1
harness_id: codebuddy
topic: custom_providers
title: "CodeBuddy Code（CLI）自定义模型 Provider 机制"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-codebuddy-models-locations, ref-codebuddy-models-priority, ref-codebuddy-models-merge, ref-codebuddy-models-fields, ref-codebuddy-models-urlformat]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-codebuddy-models-envref, ref-codebuddy-iam-auth, ref-codebuddy-env-auth, ref-codebuddy-iam-thirdparty, ref-codebuddy-env-endpoints, ref-codebuddy-iam-details, ref-codebuddy-iam-cred]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-codebuddy-models-fields, ref-codebuddy-models-available, ref-codebuddy-models-related, ref-codebuddy-env-models, ref-codebuddy-settings-keys]
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs: [ref-codebuddy-models-fields, ref-codebuddy-env-perf, ref-codebuddy-settings-keys, ref-codebuddy-env-endpoints]
  - section_id: providers-responses
    surface_ids: [cli]
    source_refs: [ref-codebuddy-env-perf, ref-codebuddy-models-urlformat]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-models-hotreload, ref-codebuddy-models-troubleshoot, ref-codebuddy-settings-configcmds, ref-codebuddy-iam-faq, ref-codebuddy-env-debug]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-codebuddy-models-locations, ref-codebuddy-models-priority, ref-codebuddy-models-merge]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-codebuddy-models-envref, ref-codebuddy-iam-auth, ref-codebuddy-iam-details, ref-codebuddy-iam-cred, ref-codebuddy-env-auth]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-codebuddy-models-fields, ref-codebuddy-models-urlformat]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-codebuddy-models-fields, ref-codebuddy-models-available, ref-codebuddy-models-related]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-codebuddy-models-fields, ref-codebuddy-env-perf]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: answered
        source_refs: [ref-codebuddy-env-perf, ref-codebuddy-env-endpoints, ref-codebuddy-settings-keys]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-responses
        status: answered
        source_refs: [ref-codebuddy-env-perf, ref-codebuddy-models-urlformat]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-codebuddy-models-hotreload, ref-codebuddy-models-troubleshoot, ref-codebuddy-settings-configcmds, ref-codebuddy-iam-faq]
---

本章固定来源为 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 `docs/models.md`、`docs/iam.md`、`docs/env-vars.md`、`docs/settings.md`。CodeBuddy Code（CLI）为闭源，本章按来源级知识记录，不绑定具体版本。

机制边界：CodeBuddy Code 的「自定义 Provider」通过 `models.json` 声明第三方模型端点（目前仅 OpenAI 接口格式），与官方平台凭据（`CODEBUDDY_API_KEY`/`CODEBUDDY_AUTH_TOKEN`）是两条并行链路。

## 定义入口与协议形态 {#providers-entry}

自定义模型列表写在 `models.json`，两个级别：用户级 `~/.codebuddy/models.json`（全局），项目级 `〈project-root〉/.codebuddy/models.json`（项目特定，优先级高于用户级）。[@ref-codebuddy-models-locations]

合并优先级从高到低为项目级 → 用户级 → 内置默认；项目级按 `id` 覆盖用户级的相同模型，`availableModels` 字段则是项目级**完全覆盖**用户级、不合并。整体采用 SmartMerge：相同 `id` 覆盖、不同 `id` 追加，`availableModels` 过滤在所有合并完成后执行。[@ref-codebuddy-models-priority][@ref-codebuddy-models-merge]

协议约束：目前仅支持 OpenAI 接口格式的 API；`url` 必须是接口完整路径，一般以 `/chat/completions` 结尾（正确如 `https://api.openai.com/v1/chat/completions`，错误如只写到 `/v1`）。[@ref-codebuddy-models-fields][@ref-codebuddy-models-urlformat]

官方给的 OpenRouter 平台最小示例（取自 `docs/models.md`）：

```json
{
  "models": [
    {
      "id": "openai/gpt-4o",
      "name": "open-router-model",
      "url": "https://openrouter.ai/api/v1/chat/completions",
      "apiKey": "sk-or-v1-your-openrouter-api-key",
      "maxInputTokens": 128000,
      "maxOutputTokens": 4096,
      "supportsToolCall": true,
      "supportsImages": false
    }
  ]
}
```

示例字段含义：`id` 为唯一标识（必填），`name` 为显示名，`url` 为完整端点，`apiKey` 为密钥，`maxInputTokens`/`maxOutputTokens` 为上下文与输出上限，`supportsToolCall`/`supportsImages` 为能力位。[@ref-codebuddy-models-fields]

## 认证与端点 {#providers-auth}

`models.json` 的 `apiKey` 与 `url` 支持环境变量引用 `${VAR_NAME}`，避免明文落盘；未设置时保留占位符（会导致 API 调用失败）。建议把文件权限设为 `600`，且不要把含真实密钥的配置提交到版本控制。[@ref-codebuddy-models-envref]

官方平台链路：`CODEBUDDY_API_KEY` 作为模型接口密钥（`-p` 非交互下始终使用它），`CODEBUDDY_AUTH_TOKEN` 为平台认证令牌；多用场景优先级为 `CODEBUDDY_AUTH_TOKEN > apiKeyHelper > CODEBUDDY_API_KEY`。[@ref-codebuddy-iam-auth][@ref-codebuddy-env-auth]

第三方模型服务用 API Key 直接指向第三方端点：

```bash
export CODEBUDDY_API_KEY="sk-or-v1-xxx"
export CODEBUDDY_BASE_URL="https://openrouter.ai/api/v1"
codebuddy --model openai/gpt-4
```

片段取自 `docs/iam.md`「第三方模型服务」；该方式无需设置 `CODEBUDDY_INTERNET_ENVIRONMENT`。[@ref-codebuddy-iam-thirdparty][@ref-codebuddy-env-endpoints]

企业 OAuth：`apiKeyHelper` 指定一个在 `/bin/sh` 中执行的脚本生成认证值，作为 `X-Api-Key` 与 `Authorization: Bearer` 发出；脚本产出的 token 默认缓存 5 分钟，可用 `CODEBUDDY_CODE_API_KEY_HELPER_TTL_MS` 调整。凭据存储按平台落在 macOS Keychain / Linux 密钥环 / Windows 凭据管理器。[@ref-codebuddy-iam-details][@ref-codebuddy-iam-cred]

## 模型标识与发现 {#providers-models}

`models[].id` 是匹配与覆盖的键，可在项目级覆盖内置模型的 `url`/`apiKey` 等参数；`availableModels` 控制下拉列表中显示的模型 ID，未配置或空数组时显示全部，配置后只显示列出的 ID（可同时含内置与自定义模型）。通过 `models.json` 添加的模型会自动标记 `custom` 标签。[@ref-codebuddy-models-fields][@ref-codebuddy-models-available]

场景变体通过 `relatedModels` 表达，键为 `lite`/`reasoning`/`vision`/`longContext`/`subagent`，指定该场景使用的模型 id。[@ref-codebuddy-models-related] 运行时可覆盖：`CODEBUDDY_MODEL` 覆盖默认代理模型，`CODEBUDDY_SMALL_FAST_MODEL` 覆盖 `lite` 变体，`CODEBUDDY_BIG_SLOW_MODEL` 覆盖 `reasoning` 变体；对应持久化设置是 `settings.json` 的 `variantModels`，`/model` 与 `/model:lite`、`/model:reasoning` 可交互切换。取消环境变量后恢复低优先级配置，不一定直接回退到主模型。[@ref-codebuddy-env-models][@ref-codebuddy-settings-keys]

## 能力元数据与参数映射 {#providers-metadata}

能力元数据在 `models[]` 中声明：`maxInputTokens`、`maxOutputTokens`、`supportsToolCall`、`supportsImages`、`supportsReasoning`、`temperature`（0–2）。[@ref-codebuddy-models-fields]

请求层的通用参数映射由环境变量与 settings 提供：`CODEBUDDY_CODE_MAX_OUTPUT_TOKENS` 设置大多数请求的最大输出 token，`CODEBUDDY_CODE_FILE_READ_MAX_OUTPUT_TOKENS` 覆盖文件读取的默认 token 限制（默认 20000）；`reasoningEffort` 设置项（`minimal`/`low`/`medium`/`high`/`xhigh`/`max`）控制推理深度，`MAX_THINKING_TOKENS` 启用扩展思考并设预算。[@ref-codebuddy-env-perf][@ref-codebuddy-settings-keys] 代理与自定义 header 走 `HTTP_PROXY`/`HTTPS_PROXY`/`NO_PROXY` 与 `CODEBUDDY_CUSTOM_HEADERS`（`Name: Value`，多个用换行分隔）。[@ref-codebuddy-env-endpoints]

## 流式、超时与重试 {#providers-responses}

流式约束：`CODEBUDDY_STREAM_TIMEOUT_MS` 控制两个数据块之间的最大静默时间（默认 1200000ms），`CODEBUDDY_FIRST_TOKEN_TIMEOUT_MS` 控制等待首个模型输出的最大时间（默认 1200000ms），二者解耦、可各自配置；自动恢复轮另有 `CODEBUDDY_RECOVERY_FIRST_TOKEN_TIMEOUT_MS`（默认 300000ms，且不超过首 token 超时）。[@ref-codebuddy-env-perf]

重试：`CODEBUDDY_MAX_RETRIES` 限制「生成开始前」失败（429/502/503/529/请求超时/锁超时）的退避重试次数（默认 1，上限 15），采用 500ms 起步的指数退避加抖动并尊重 `retry-after`，严格发生在流式内容产出之前、不重发已产出内容；`CODEBUDDY_RETRY_WATCHDOG=1` 打开无人值守/CI 的无限重试（单次退避封顶 5 分钟）。网关错误体带 `retry_policy` 时以网关为准。[@ref-codebuddy-env-perf]

空流处理：`CODEBUDDY_EMPTY_STREAM_RETRY_MAX_ELAPSED_MS` 限制空流自动重试的最长已耗时（默认 300000ms）。`stream-json` 链路另有 `keepalive` 保活（`CODEBUDDY_REASONING_KEEPALIVE_INTERVAL_MS`，默认关闭）。[@ref-codebuddy-env-perf] 后端侧要求：`models.json` 端点必须是 OpenAI 兼容的完整 `/chat/completions` 路径，否则请求会失败。[@ref-codebuddy-models-urlformat]

## 诊断 {#providers-diagnostics}

区分层次：配置文件是否被读取 → `models.json` 支持热重载（文件变更自动检测、1 秒防抖），并监听用户级与项目级两个路径；配置未生效时依次检查 JSON 格式、文件路径、日志中的加载记录、以及 API 密钥环境变量是否已设置。[@ref-codebuddy-models-hotreload][@ref-codebuddy-models-troubleshoot]

模型是否可选：检查模型 ID 是否在 `availableModels` 中列出、`models` 配置是否正确；文档的校验提示写的是「验证必填字段（`id`, `name`, `provider`）」（原文如此，与字段表列出的 `vendor` 存在措辞不一致，属来源本身的表述差异）。[@ref-codebuddy-models-troubleshoot]

实际生效来源：`codebuddy config get 〈key〉` / `codebuddy config list` 查看配置，`/config` 面板交互式修改，`/model`、`/model:lite`、`/model:reasoning` 查看当前模型与来源；认证失败时按版本核对 `CODEBUDDY_INTERNET_ENVIRONMENT`（中国版 `internal`、iOA 版 `ioa`，海外版不设置）。[@ref-codebuddy-settings-configcmds][@ref-codebuddy-iam-faq] 请求是否真正发出、后端是否可用，需要结合 stream-json 输出或调试日志判断（`CODEBUDDY_DEBUG_REQUEST`、`CODEBUDDY_STARTUP_PROFILE`）。[@ref-codebuddy-env-debug]
