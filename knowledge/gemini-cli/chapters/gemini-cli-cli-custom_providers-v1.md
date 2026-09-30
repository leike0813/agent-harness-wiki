---
schema_version: 3
record_kind: production
edition_id: gemini-cli-cli-custom_providers-v1
harness_id: gemini-cli
topic: custom_providers
title: "Gemini CLI 的后端与模型接入：认证、模型配置、参数映射与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-providers-auth-methods, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-providers-gemma-schema]
  - section_id: providers-entry-auth
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-providers-auth-methods, ref-gemini-cli-settings-security-auth, ref-gemini-cli-settings-model, ref-gemini-cli-providers-routing-precedence, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-experimental-dynamic, ref-gemini-cli-config-doc-files, ref-gemini-cli-providers-auth-apikey, ref-gemini-cli-providers-auth-vertex, ref-gemini-cli-providers-auth-google, ref-gemini-cli-config-doc-envfiles, ref-gemini-cli-providers-auth-persist, ref-gemini-cli-providers-auth-headless, ref-gemini-cli-config-doc-redaction, ref-gemini-cli-config-envload]
  - section_id: providers-protocol-models
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-providers-auth-vertex, ref-gemini-cli-providers-gemma-config, ref-gemini-cli-providers-gemma-schema, ref-gemini-cli-providers-routing-precedence, ref-gemini-cli-cli-models, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-modeldefs, ref-gemini-cli-providers-default-model-configs, ref-gemini-cli-providers-models, ref-gemini-cli-cmd-model]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-providers-default-model-configs, ref-gemini-cli-providers-routing-precedence, ref-gemini-cli-providers-routing-how, ref-gemini-cli-settings-general, ref-gemini-cli-providers-gemma-how, ref-gemini-cli-hooks-ref-aftermodel]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-gemini-cli-config-validation, ref-gemini-cli-cmd-settings, ref-gemini-cli-cmd-model, ref-gemini-cli-cmd-stats, ref-gemini-cli-cli-options, ref-gemini-cli-mcp-doc-debug, ref-gemini-cli-cmd-chat-debug, ref-gemini-cli-cmd-auth, ref-gemini-cli-providers-gemma-commands]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-auth
        status: answered
        source_refs: [ref-gemini-cli-providers-auth-methods, ref-gemini-cli-settings-security-auth, ref-gemini-cli-settings-model, ref-gemini-cli-providers-routing-precedence, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-experimental-dynamic, ref-gemini-cli-config-doc-files]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-entry-auth
        status: answered
        source_refs: [ref-gemini-cli-providers-auth-apikey, ref-gemini-cli-providers-auth-vertex, ref-gemini-cli-providers-auth-google, ref-gemini-cli-config-doc-envfiles, ref-gemini-cli-providers-auth-persist, ref-gemini-cli-providers-auth-headless, ref-gemini-cli-config-doc-redaction, ref-gemini-cli-config-envload]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: partial
        source_refs: [ref-gemini-cli-providers-auth-vertex, ref-gemini-cli-providers-gemma-config, ref-gemini-cli-providers-gemma-schema]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: partial
        source_refs: [ref-gemini-cli-providers-routing-precedence, ref-gemini-cli-cli-models, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-modeldefs, ref-gemini-cli-providers-default-model-configs, ref-gemini-cli-providers-models, ref-gemini-cli-cmd-model]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-models
        status: partial
        source_refs: [ref-gemini-cli-settings-modeldefs, ref-gemini-cli-providers-models, ref-gemini-cli-providers-default-model-configs]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-providers-default-model-configs, ref-gemini-cli-providers-routing-precedence]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-gemini-cli-providers-routing-how, ref-gemini-cli-settings-modelconfigs-custom, ref-gemini-cli-settings-general, ref-gemini-cli-providers-gemma-how, ref-gemini-cli-hooks-ref-aftermodel]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-gemini-cli-config-validation, ref-gemini-cli-cmd-settings, ref-gemini-cli-cmd-model, ref-gemini-cli-cmd-stats, ref-gemini-cli-cli-options, ref-gemini-cli-mcp-doc-debug, ref-gemini-cli-cmd-chat-debug, ref-gemini-cli-cmd-auth, ref-gemini-cli-providers-gemma-commands]
---

## 固定来源与适用范围 {#providers-scope}

本章的固定来源是官方仓库 `google-gemini/gemini-cli` 提交
`38700b4b38bf387dafded6c97c3f190d084b49e9` 的
`docs/get-started/authentication.mdx`、`docs/reference/configuration.md`（`model`、`modelConfigs`、`experimental.gemmaModelRouter`
段）、`docs/cli/model-routing.md`、`docs/core/local-model-routing.md`、`docs/core/gemma-setup.md`
与
`packages/core/src/config/models.ts`、`defaultModelConfigs.ts`。固定来源未注明适用软件版本，本章是来源级知识。

一个重要的边界：**登记来源里没有"第三方自定义 provider 插件"机制**。后端由第一方认证方式 + 模型配置决定，可调整的部分是认证方式、base
URL、模型配置（别名/覆盖/定义/链）与一个实验性的本地 Gemma 路由端点
[@ref-gemini-cli-providers-auth-methods][@ref-gemini-cli-settings-modelconfigs-custom][@ref-gemini-cli-providers-gemma-schema]。因此本章按"第一方后端如何选择与改写"来写，而不是按"如何接入任意
OpenAI 兼容 provider"来写。

## 入口与凭据 {#providers-entry-auth}

**providers.entry**：三个入口。其一，认证方式：首次启动时选择**Sign in with Google**、**Use Gemini API
key** 或 **Vertex AI**，选择结果落在 `security.auth.selectedType`；企业可用
`security.auth.enforcedType` 强制要求某一种，两者不匹配时提示重新认证，`security.auth.useExternal`
控制是否走外部认证流程
[@ref-gemini-cli-providers-auth-methods][@ref-gemini-cli-settings-security-auth]。其二，模型入口：`model.name`
指定会话模型，另有 `--model` 与 `GEMINI_MODEL` 覆盖
[@ref-gemini-cli-settings-model][@ref-gemini-cli-providers-routing-precedence]。其三，模型配置入口：`modelConfigs`
一族（`aliases`、`customAliases`、`overrides`、`customOverrides`、`modelDefinitions`、`modelIdResolutions`、`modelChains`），其中
definitions/resolutions/chains 需要 `experimental.dynamicModelConfiguration` 打开
[@ref-gemini-cli-settings-modelconfigs-custom][@ref-gemini-cli-settings-experimental-dynamic]。settings
里的字符串支持 `$VAR`、`${VAR}`、`${VAR:-默认值}` 形式的变量展开
[@ref-gemini-cli-config-doc-files]。

**providers.auth**：凭据来自环境变量与本地缓存，不写进示例。Gemini API key 路径用 `GEMINI_API_KEY`（或
`GOOGLE_API_KEY`）；Vertex AI 路径需 `GOOGLE_CLOUD_PROJECT` 与
`GOOGLE_CLOUD_LOCATION`，凭据可用 ADC（`gcloud`）、服务账号
JSON（`GOOGLE_APPLICATION_CREDENTIALS`）或 Cloud API key
[@ref-gemini-cli-providers-auth-apikey][@ref-gemini-cli-providers-auth-vertex]。Sign
in with Google 的凭据缓存在本地供后续会话复用 [@ref-gemini-cli-providers-auth-google]。base URL
可用 `GOOGLE_GEMINI_BASE_URL`（`gemini-api-key` 认证时）与
`GOOGLE_VERTEX_BASE_URL`（`vertex-ai` 认证时）改写到代理，二者必须是合法 URL，且除指向
localhost/127.0.0.1/[::1] 外必须用 HTTPS [@ref-gemini-cli-config-doc-envfiles]。API
版本可用 `GOOGLE_GENAI_API_VERSION` 指定，Code Assist 端点可用 `CODE_ASSIST_ENDPOINT`
[@ref-gemini-cli-config-doc-envfiles]。持久化方式（shell profile、`.env`、Cloud
Shell、headless）在认证文档里单列
[@ref-gemini-cli-providers-auth-persist][@ref-gemini-cli-providers-auth-headless]。示例只出现占位值，来自官方环境变量段
[@ref-gemini-cli-config-doc-envfiles]：

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
export GOOGLE_GEMINI_BASE_URL="https://my-proxy.com"
```

安全边界：`.env`
中即使显式写了变量，子进程执行时仍会按名/值模式脱敏，`security.environmentVariableRedaction.allowed`
可放行、`blocked` 可强制脱敏 [@ref-gemini-cli-config-doc-redaction]。工作区不受信任时，项目 `.env` 只有
`GEMINI_API_KEY`、`GOOGLE_API_KEY`、`GOOGLE_CLOUD_PROJECT`、`GOOGLE_CLOUD_LOCATION`
四个变量会被加载，且值被清洗 [@ref-gemini-cli-config-envload]。

## 协议、模型与元数据 {#providers-protocol-models}

**providers.protocol**：登记来源描述的是第一方后端而非通用协议适配层。云侧有 Gemini API（`gemini-api-key`
认证）与 Vertex AI（`vertex-ai` 认证）两条路径，以及可选的 Code Assist 端点；本地侧有一个实验性端点：LiteRT-LM
在本机 `http://localhost:9379` 上以 Gemini API 形态提供 Gemma 模型（模型名
`gemma3-1b-gpu-custom`），CLI 通过 `experimental.gemmaModelRouter` 指向它
[@ref-gemini-cli-providers-auth-vertex][@ref-gemini-cli-providers-gemma-config][@ref-gemini-cli-providers-gemma-schema]。缺口：登记来源没有描述自定义
provider 插件接口、没有 OpenAI 兼容层、也没有给出请求体/端点的完整契约；因此"支持哪些第三方协议"这一项在固定来源内无法确立，状态
partial（已检查 `authentication.mdx`、`configuration.md` 的 model/modelConfigs
段、本地路由两页）。

**providers.models**：模型选择优先级（文档给出的顺序）：`--model` 命令行 > `GEMINI_MODEL` 环境变量 >
`model.name` 设置 > 本地 Gemma 路由（实验性）> 默认模型 `auto`
[@ref-gemini-cli-providers-routing-precedence]。内置别名（`auto`、`pro`、`flash`、`flash-lite`）映射到具体模型，随
preview 访问权限变化 [@ref-gemini-cli-cli-models]。可配置面：`modelConfigs.aliases`
是内置预设（`base`、`chat-base`、`chat-base-2.5`、`chat-base-3` 及各 `gemini-*` 条目，用
`extends` 继承父预设），`customAliases` 与内置别名合并并覆盖同名项，`overrides`/`customOverrides`
按匹配追加覆盖，`modelIdResolutions` 与 `classifierIdResolutions` 定义条件化的模型 ID 解析（条件如
`hasAccessToPreview`、`useLatestFlash`、`useCustomTools`），`modelChains` 定义可用性回退链
[@ref-gemini-cli-settings-modelconfigs-custom][@ref-gemini-cli-settings-modeldefs]。源码侧确认默认预设就在
`DEFAULT_MODEL_CONFIGS` 里以同样的 `extends` 结构定义，别名最终把 `modelConfig.model` 指向具体模型 ID
[@ref-gemini-cli-providers-default-model-configs]；模型常量（`DEFAULT_GEMINI_MODEL = 'gemini-2.5-pro'`、preview
模型等）定义在 `models.ts`
[@ref-gemini-cli-providers-models]。缺口：登记来源没有描述模型列表的网络发现或刷新命令（`/model` 只有
`manage` 与 `set` 两个子命令 [@ref-gemini-cli-cmd-model]），也没有说明 `modelIdResolutions`
的全部条件键。partial。

**providers.metadata**：能力元数据写在 `modelConfigs.modelDefinitions` 里，每个模型 ID 一项，字段为
`tier`（如 `pro`/`flash`/`flash-lite`）、`family`（如
`gemini-3`）、`isPreview`、`isVisible`（是否出现在选择器里）与
`features.{thinking,multimodalToolUse}`
[@ref-gemini-cli-settings-modeldefs]；源码里的 `getModelDefinition`
返回同一组字段（`tier`、`family`、`isPreview`、`displayName`、`features.thinking`、`features.multimodalToolUse`），并被能力判断（如
`getExperimentalDynamicModelConfiguration()`、preview 访问权）读取
[@ref-gemini-cli-providers-models]。缺口：没有上下文窗口、最大输出
token、推理强度档位等字段（`thinkingConfig` 中的 `thinkingLevel`/`thinkingBudget`
属于请求参数，写在别名预设里
[@ref-gemini-cli-providers-default-model-configs]），因此"上下文窗口/输出上限如何声明"在固定来源内不成立。partial。

## 参数映射与响应处理 {#providers-forwarding-responses}

**providers.forwarding**：可写的生成参数位于
`modelConfig.generateContentConfig`，官方默认预设里出现的有 `temperature`、`topP`、`topK` 与
`thinkingConfig.includeThoughts`/`thinkingBudget`/`thinkingLevel`
[@ref-gemini-cli-settings-modelconfigs-custom][@ref-gemini-cli-providers-default-model-configs]。别名用
`extends` 继承父项后再叠加自身字段；`overrides` 按匹配（文档称为"最具体者胜"）在解析后叠加
[@ref-gemini-cli-settings-modelconfigs-custom]。选择层（`--model`/`GEMINI_MODEL`/`model.name`/本地路由）只影响用哪个模型或哪条预设，不改变参数本身
[@ref-gemini-cli-providers-routing-precedence]。缺口：登记来源没有把每个设置字段映射到具体请求字段的对照表，也没有说明哪些字段仅影响界面（例如
`modelDefinitions.isVisible` 只影响选择器可见性），因此"哪些参数会被原样转发、哪些被客户端改写"只能部分确认。partial。

**providers.responses**：失败处理有两条机制。模型路由：`ModelAvailabilityService`
监控模型可用性，当前模型因配额或服务错误失败时按策略回退，默认会先征求用户同意再切换；少数内部工具调用（提示补全、分类）走静默回退链
`gemini-2.5-flash-lite` → `gemini-2.5-flash` → `gemini-2.5-pro`，不提示也不改配置
[@ref-gemini-cli-providers-routing-how]；回退链本身可在 `modelChains` 里声明，且该项需要重启生效
[@ref-gemini-cli-settings-modelconfigs-custom]。重试：`general.maxAttempts`（默认 10，上限
10）控制对主聊天模型的请求尝试次数，`general.retryFetchErrors`（默认 true）针对 fetch 失败重试
[@ref-gemini-cli-settings-general]。本地路由的服务端失败是静默降级：本地 server 不可用时回落到云端分类器，不报错
[@ref-gemini-cli-providers-gemma-how]。缺口：登记来源没有描述流式响应的分块约定、工具调用往返格式或错误码到用户可见行为的完整映射（hooks
文档里的 `AfterModel` 说明模型响应按 chunk 到达，可据此推断存在流式通道
[@ref-gemini-cli-hooks-ref-aftermodel]，但这属于 hooks
主题的证据），因此"后端必须满足什么约定"无法完整给出。partial。

## 诊断 {#providers-diagnostics}

四个可分别观察的层次。配置可读性：settings 校验失败会在启动时给出警告并列出文件路径，`/settings` 提供带校验的编辑界面
[@ref-gemini-cli-config-validation][@ref-gemini-cli-cmd-settings]；环境变量是否生效可用
`/settings` 面板对照。模型可选性：`/model set MODEL_NAME [--persist]` 直接切换，`/model manage`
打开配置对话框，`--model` 会话级指定，`/stats model` 查看 token 与配额统计
[@ref-gemini-cli-cmd-model][@ref-gemini-cli-cmd-stats][@ref-gemini-cli-cli-options]。请求是否发出：`--debug`
打开详细日志（交互模式 F12 打开调试台）[@ref-gemini-cli-mcp-doc-debug]；`/chat debug` 可导出最近一次 API
请求的 JSON（文档标注为 nightly 构建）[@ref-gemini-cli-cmd-chat-debug]。后端是否可用：认证方式可用 `/auth`
对话框切换 [@ref-gemini-cli-cmd-auth]；本地 Gemma 路由有
`gemini gemma status`（健康检查）、`gemini gemma logs`（跟随服务日志）与
`gemini gemma start|stop`，会话内 `/gemma` 显示状态面板
[@ref-gemini-cli-providers-gemma-commands]。缺口：没有区分"模型 ID 拼错"与"后端拒绝请求"的专用诊断入口，只能从
`/stats model`、API 错误消息与 debug 日志推断。partial。
