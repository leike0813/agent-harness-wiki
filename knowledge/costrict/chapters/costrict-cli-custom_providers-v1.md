---
schema_version: 3
record_kind: production
edition_id: costrict-cli-custom_providers-v1
harness_id: costrict
topic: custom_providers
title: "CoStrict CLI（CSC）的模型服务商接入"
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-costrict-api-terms, ref-costrict-api-csc, ref-costrict-api-mapping]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-costrict-env-oauth, ref-costrict-api-keystore, ref-costrict-api-keynames, ref-costrict-settings-env, ref-costrict-settings-keys, ref-costrict-env-configdir]
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs: [ref-costrict-api-terms, ref-costrict-settings-modelkeys, ref-costrict-api-csc, ref-costrict-api-errors2, ref-costrict-env-baseurl, ref-costrict-env-cloud, ref-costrict-settings-keys]
  - section_id: providers-models
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-modelkeys, ref-costrict-settings-availablemodels, ref-costrict-agents-model, ref-costrict-api-csc, ref-costrict-env-fallback]
  - section_id: providers-forwarding
    surface_ids: [cli]
    source_refs: [ref-costrict-settings-envfield, ref-costrict-settings-modelkeys, ref-costrict-env-fallback, ref-costrict-env-cloud]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-api-verify, ref-costrict-api-errors, ref-costrict-api-errors2, ref-costrict-cmd-status, ref-costrict-cmd-config, ref-costrict-api-feedback]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-costrict-api-terms, ref-costrict-api-csc, ref-costrict-api-mapping]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-costrict-env-oauth, ref-costrict-api-keystore, ref-costrict-api-keynames, ref-costrict-settings-env, ref-costrict-settings-keys, ref-costrict-env-configdir]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: partial
        source_refs: [ref-costrict-api-terms, ref-costrict-settings-modelkeys, ref-costrict-api-csc, ref-costrict-api-errors2, ref-costrict-env-baseurl, ref-costrict-env-cloud, ref-costrict-settings-keys]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: answered
        source_refs: [ref-costrict-settings-modelkeys, ref-costrict-settings-availablemodels, ref-costrict-agents-model, ref-costrict-api-csc, ref-costrict-env-fallback]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs: [ref-costrict-settings-modelkeys, ref-costrict-settings-availablemodels, ref-costrict-agents-model, ref-costrict-api-csc, ref-costrict-env-fallback]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-costrict-settings-envfield, ref-costrict-settings-modelkeys, ref-costrict-env-fallback, ref-costrict-env-cloud]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding
        status: partial
        source_refs: [ref-costrict-settings-envfield, ref-costrict-settings-modelkeys, ref-costrict-env-fallback, ref-costrict-env-cloud]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: answered
        source_refs: [ref-costrict-api-verify, ref-costrict-api-errors, ref-costrict-api-errors2, ref-costrict-cmd-status, ref-costrict-cmd-config, ref-costrict-api-feedback]
---

## 配置入口与协议 {#providers-entry}

本章的固定来源是 CoStrict 官方 API 接入页 `/plugin/guide/api-integration`（该页明确同时覆盖 CoStrict VS Code 插件与 CoStrict CLI，并把后者简称 CSC）以及 CSC 文档页 `/csc/configuration/settings`、`/csc/reference/env-vars`、`/csc/agent/sub-agents` 的快照，按来源级知识阅读（`version_applicability: unknown`；页面中出现过 "CSC 4.2.38" 这样的版本陈述，只在该处引用）。

官方把接入拆成四个要素：**服务商**（签发 API Key 的平台）、**模型**（实际执行任务的模型）、**接口协议**（决定 CoStrict 以什么方式向平台发送请求，常见类型为 OpenAI 兼容接口、Anthropic 兼容接口与 Google Gemini API）以及配套的 Base URL、API Key 与模型 ID；一个服务商可能提供多种协议，每种协议的地址可能不同。[@ref-costrict-api-terms]

**CLI 侧的配置命令**是会话内的 `/login`：进入项目目录启动 `csc`，输入 `/login`，选择与服务商文档一致的协议（OpenAI 兼容、Anthropic 兼容或 Gemini API），按顺序填写 Base URL、API Key 以及 Haiku、Sonnet、Opus 三个模型配置项（每项按 Enter 进入下一项，最后一项按 Enter 保存），然后用 `/model` 确认当前使用的模型并发送测试消息。[@ref-costrict-api-csc]

**三个模型映射位置**是 CSC 内部的模型槽位：接入第三方服务时填写该服务商的实际模型 ID，不需要购买三个不同厂商的模型；只用一个模型时三个位置填同一个有效 ID 即可。模型 ID、额度与能力以服务商为准；Gemini 配置要求三个模型位置都填写。[@ref-costrict-api-mapping]

**缺口（`providers.protocol`）**：固定来源给的是会话式 `/login` 表单与协议名称，没有给出可写的配置文件字段名或 schema（例如把第三方接入写成 `settings.json` 结构性配置），也没有列出各协议对应的端点路径与请求形态。要通过文件方式配置，只能依赖下文列出的环境变量与用户级 `settings.json` 的 `env` 键。

## 凭据来源与存储 {#providers-auth}

- **账号登录（costrict.ai）**：`csc auth login` 使用 OAuth；自动化环境可用 `CLAUDE_CODE_OAUTH_TOKEN`（`/login` 的替代，优先于钥匙串凭据，用 `csc setup-token` 生成）或 `CLAUDE_CODE_OAUTH_REFRESH_TOKEN`（配合 `CLAUDE_CODE_OAUTH_SCOPES` 直接交换令牌而不打开浏览器）。[@ref-costrict-env-oauth]
- **第三方 API Key（`/login` 表单填写的）**：在 CSC 4.2.38 中会写入**用户级** `settings.json` 的 `env` 配置，以可读文本保存（macOS `~/.costrict/settings.json`，Windows `%USERPROFILE%\.costrict\settings.json`；设置了自定义配置目录时位置随之变化），与 CoStrict 账号登录凭据的存储不是同一条路径。[@ref-costrict-api-keystore]
- **对应的 Key 名称**（按协议）：OpenAI 兼容 → `OPENAI_API_KEY`，Anthropic 兼容 → `ANTHROPIC_AUTH_TOKEN`，Gemini API → `GEMINI_API_KEY`。清理本地保存值时应退出 CSC 后只移除用户级 `settings.json` 中 `env` 对象里的对应项并保持 JSON 合法；`/logout` **不能**视为清除所有第三方 Key，清空 Key 输入框后再保存也不是删除旧 Key 的方法。若同一枚 Key 还在系统环境变量或终端启动配置中设置过，也要一并清理。彻底失效仍需到签发平台撤销。[@ref-costrict-api-keynames]
- **环境变量方式**：任何 CSC 环境变量也可以在 `settings.json` 的 `env` 键下配置，以应用于每个会话或向团队推出；该字段用于注入凭据时同样以明文保存在配置文件里。[@ref-costrict-settings-env]
- **凭据脚本**：`apiKeyHelper` 指定一个在 `/bin/sh` 中执行、用于生成认证值的脚本，其返回值作为模型请求的 `X-Api-Key` 与 `Authorization: Bearer` 头发送；凭据刷新间隔用 `CLAUDE_CODE_API_KEY_HELPER_TTL_MS`（毫秒）控制。[@ref-costrict-settings-keys]
- **自定义配置目录**：`CLAUDE_CONFIG_DIR` 覆盖配置目录（默认 `~/.costrict`），所有设置、凭据、会话历史与插件都存放其下，便于并行运行多个账户。[@ref-costrict-env-configdir]

**安全提示（原文要点）**：Key 只粘贴到对应配置输入框，不发送到聊天、群聊、Issue 或公开文档；录屏与截图前遮挡整枚 Key；把 Key 配到不可信地址可能导致泄露；怀疑泄露时先到签发平台撤销旧 Key——仅在 CoStrict 中删除配置不能使泄露的 Key 失效。Base URL 应来自可信服务商或公司管理员（公司统一网关应使用管理员给的地址，不要替换成模型原厂地址）。[@ref-costrict-api-keystore]

## 协议、端点与云厂商接入 {#providers-protocol}

固定来源中与本主题相关的可配置项：[@ref-costrict-api-terms][@ref-costrict-settings-modelkeys]

| 项目 | 说明 | 来源 |
| :-- | :-- | :-- |
| 协议选择 | `/login` 时在 OpenAI 兼容、Anthropic 兼容、Gemini API 之间选择 | [@ref-costrict-api-csc] |
| Base URL | 按协议填写服务商提供的基础地址（不是控制台网址，也不要填完整 `/chat/completions` 请求地址） | [@ref-costrict-api-errors2] |
| `ANTHROPIC_BASE_URL` | 影响 MCP 工具搜索的默认策略：指向非第一方主机时，工具搜索默认禁用并回退为预加载（因为多数代理不转发 `tool_reference` 块），可用 `ENABLE_TOOL_SEARCH` 显式覆盖 | [@ref-costrict-env-baseurl] |
| `CLAUDE_CODE_USE_BEDROCK` / `_VERTEX` / `_FOUNDRY` / `_MANTLE` | 切换到相应云厂商端点；`CLAUDE_CODE_SKIP_BEDROCK_AUTH`、`CLAUDE_CODE_SKIP_VERTEX_AUTH`、`CLAUDE_CODE_SKIP_FOUNDRY_AUTH` 等可跳过厂商认证（例如经 LLM 网关时） | [@ref-costrict-env-cloud] |
| `modelOverrides` | 把 CoStrict 模型 ID 映射到提供商特定 ID（如 Bedrock 推理配置文件 ARN），每个模型选择器条目在调用提供商 API 时使用映射值 | [@ref-costrict-settings-modelkeys] |
| `awsAuthRefresh` / `awsCredentialExport` | 修改 `.aws` 目录的脚本 / 输出 AWS 凭证 JSON 的脚本（高级凭证配置） | [@ref-costrict-settings-keys] |

**缺口（`providers.protocol`）**：文档给出协议名称、Base URL 的填写要求以及云厂商开关，但没有给出 CSC 对各协议实际请求的端点路径、兼容层范围（例如哪些 OpenAI 特性可用）或 Gemini 的端点形态；这些只能由服务商文档与实测确认。

## 模型选择与限制 {#providers-models}

- **默认模型**：`model` 设置覆盖 CSC 使用的默认模型（示例值 `"claude-sonnet-4-6"`）。[@ref-costrict-settings-modelkeys]
- **可选项限制**：`availableModels` 限制用户可通过 `/model`、`--model`、配置工具或 `ANTHROPIC_MODEL` 选择的模型（不影响默认选项）。[@ref-costrict-settings-availablemodels]
- **ID 映射**：`modelOverrides` 把 CoStrict 模型 ID 映射到提供商特定 ID，逐条目生效于实际 API 调用。[@ref-costrict-settings-modelkeys]
- **子代理模型解析顺序**：`CLAUDE_CODE_SUBAGENT_MODEL` 环境变量 → 每次调用的 `model` 参数 → 子代理 frontmatter 的 `model` → 主对话模型。[@ref-costrict-agents-model]
- **交互确认**：会话内 `/model` 用于确认或切换当前模型，官方验证流程要求在配置后用它确认目标模型再发测试消息。[@ref-costrict-api-csc]
- **回退**：`FALLBACK_FOR_ALL_PRIMARY_MODELS` 设为任意非空值时，任何主模型出现重复过载错误后都会触发回退到 `--fallback-model`（默认只有 Opus 模型触发回退）。[@ref-costrict-env-fallback]

**缺口（`providers.metadata`）**：`availableModels`、`model`、`modelOverrides` 之外，固定来源没有给出 CSC 侧描述模型上下文窗口、最大输出、图像支持或推理强度等能力元数据的字段；官方页面只在 **VS Code 插件**的设置流程里提到可按模型官方规格填写上下文窗口、最大输出 Token 数与图像支持。因此 CLI 侧的能力元数据保持未验证。

## 参数转发与响应处理 {#providers-forwarding}

固定来源能确认的转发路径只有两处：`settings.json` 的 `env` 键会把变量注入每个会话（凭据、代理与开关都走这条路径），以及 `modelOverrides` 在**调用提供商 API 时**替换模型 ID。[@ref-costrict-settings-envfield][@ref-costrict-settings-modelkeys]

响应侧的可观察行为：出现重复过载错误时按 `FALLBACK_FOR_ALL_PRIMARY_MODELS` 与 `--fallback-model` 触发回退；网络与流式异常可用 `HTTP_PROXY`/`HTTPS_PROXY` 配置代理、用 `CLAUDE_ENABLE_STREAM_WATCHDOG=1` 中止停滞 90 秒无数据的响应流（默认不中止，停滞的流可能无限期挂起会话）。[@ref-costrict-env-fallback][@ref-costrict-env-cloud]

**缺口（`providers.forwarding`/`providers.responses`）**：固定来源没有列出可透传到后端请求体的参数（温度、top_p、工具调用格式等），也没有描述流式事件格式、工具调用的请求/响应约定或重试策略；可见的错误面来自接入页的报错表（见下节）。这些点保持未验证。

## 诊断：从配置到实际调用 {#providers-diagnostics}

**官方验证流程（两步，缺一不可）**：[@ref-costrict-api-verify]

1. **基本对话**：确认当前配置与模型后新建对话，发送"请只回复'连接成功'，不要读取文件或执行命令"，能正常收到回复且无鉴权/权限/额度错误即调用成功；
2. **项目读取**：在不含敏感信息的演示项目放一份 `README.md`，要求 CSC 读取并用两句话概括（不改文件、不执行命令），确认文件读取与工具调用正常——基本对话成功但读取失败说明还需要检查模型工具调用兼容性或本地权限。

官方还提醒：模型列表能加载或"保存"不报错只说明完成了部分配置检查；不要用模型自我描述判断实际调用来源，可用服务商的调用记录（可能有延迟）核对。[@ref-costrict-api-verify]

**错误对照（原文摘要）**：401/Authentication failed/Invalid API Key → Key 错误、失效或与接口不匹配；403/Permission denied → 无模型或项目权限；402/额度不足 → 余额或订阅问题。[@ref-costrict-api-errors] 404/Model not found → 地址路径或模型 ID 错误（也可能无该模型权限），不要将控制台网址或完整 `/chat/completions` 请求地址当作 Base URL；400/422 → 协议不匹配、参数或能力配置不符；429 → 限流，部分平台也用它表示额度限制；5xx → 服务商或网关暂时异常；Timeout/Connection/DNS/证书错误 → 网络或代理问题（不要通过关闭证书校验解决）；Context length exceeded → 超出模型上下文，可新建对话减少输入；"模型列表为空但 Key 看起来正确" → 服务未开放模型列表、权限不足或地址错误；"能聊天但读取文件等工具操作失败" → 模型工具调用不兼容或本地权限未允许。[@ref-costrict-api-errors2]

**CSC 自身的状态检查**：`/status` 打开设置界面的状态选项卡，显示版本、模型、账户与连接状态（CSC 响应过程中也可用）；`/config` 打开设置界面以调整模型与其他偏好。[@ref-costrict-cmd-status][@ref-costrict-cmd-config] 官方要求反馈问题时提供操作系统、VS Code 与插件版本或 CSC 版本、服务商名称、服务类型、协议、模型 ID、出错时间、操作步骤、脱敏报错以及服务商请求 ID（如有）；公开反馈时应遮挡公司内部域名与账号信息，不要发送 API Key。[@ref-costrict-api-feedback]
