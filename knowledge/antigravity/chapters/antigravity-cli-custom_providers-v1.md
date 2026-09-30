---
schema_version: 3
record_kind: production
edition_id: antigravity-cli-custom_providers-v1
harness_id: antigravity
topic: custom_providers
title: Antigravity CLI 的 provider 入口、鉴权、模型与请求前向
sections:
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-modelprovider
      - ref-agy-custom-providers-keygating
      - ref-agy-custom-providers-settingsfile
      - ref-agy-custom-providers-revert
      - ref-agy-custom-providers-keyroute
      - ref-agy-custom-providers-reference-keys
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-keygating
      - ref-agy-custom-providers-baseurl
      - ref-agy-custom-providers-baseurl-changelog
      - ref-agy-custom-providers-troubleshoot
      - ref-agy-custom-providers-keyroute
      - ref-agy-custom-providers-reference-keys
  - section_id: providers-models
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-model-catalog
      - ref-agy-custom-providers-additional-models
      - ref-agy-custom-providers-catalog-changelog
      - ref-agy-custom-providers-modelscmd
      - ref-agy-custom-providers-printmodel
      - ref-agy-custom-providers-audit
      - ref-agy-custom-providers-models-list-output
      - ref-agy-custom-providers-slash-model
  - section_id: providers-metadata
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-modelfeatures
      - ref-agy-custom-providers-effort
      - ref-agy-custom-providers-effort-flag
      - ref-agy-custom-providers-context
      - ref-agy-custom-providers-model-catalog
      - ref-agy-custom-providers-additional-models
  - section_id: providers-protocol
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-baseurl
      - ref-agy-custom-providers-baseurl-changelog
      - ref-agy-custom-providers-keyroute
      - ref-agy-custom-providers-cli-overrides
      - ref-agy-custom-providers-schema
      - ref-agy-custom-providers-effort-ignored
  - section_id: providers-responses
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-error
      - ref-agy-custom-providers-quota
      - ref-agy-custom-providers-thinking
      - ref-agy-custom-providers-headless
      - ref-agy-custom-providers-apikey-parity
      - ref-agy-custom-providers-troubleshoot
      - ref-agy-custom-providers-keyroute
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-agy-custom-providers-audit
      - ref-agy-custom-providers-models-list-output
      - ref-agy-custom-providers-modelprovider
      - ref-agy-custom-providers-troubleshoot
      - ref-agy-custom-providers-printmodel
      - ref-agy-custom-providers-keyroute
      - ref-agy-custom-providers-settingsfile
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: partial
        source_refs:
          - ref-agy-custom-providers-modelprovider
          - ref-agy-custom-providers-keygating
          - ref-agy-custom-providers-settingsfile
          - ref-agy-custom-providers-revert
          - ref-agy-custom-providers-keyroute
          - ref-agy-custom-providers-reference-keys
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs:
          - ref-agy-custom-providers-keygating
          - ref-agy-custom-providers-baseurl
          - ref-agy-custom-providers-baseurl-changelog
          - ref-agy-custom-providers-troubleshoot
          - ref-agy-custom-providers-keyroute
          - ref-agy-custom-providers-reference-keys
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-models
        status: partial
        source_refs:
          - ref-agy-custom-providers-model-catalog
          - ref-agy-custom-providers-additional-models
          - ref-agy-custom-providers-catalog-changelog
          - ref-agy-custom-providers-modelscmd
          - ref-agy-custom-providers-printmodel
          - ref-agy-custom-providers-audit
          - ref-agy-custom-providers-models-list-output
          - ref-agy-custom-providers-slash-model
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-metadata
        status: partial
        source_refs:
          - ref-agy-custom-providers-modelfeatures
          - ref-agy-custom-providers-effort
          - ref-agy-custom-providers-effort-flag
          - ref-agy-custom-providers-context
          - ref-agy-custom-providers-model-catalog
          - ref-agy-custom-providers-additional-models
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: partial
        source_refs:
          - ref-agy-custom-providers-baseurl
          - ref-agy-custom-providers-baseurl-changelog
          - ref-agy-custom-providers-keyroute
          - ref-agy-custom-providers-schema
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol
        status: partial
        source_refs:
          - ref-agy-custom-providers-cli-overrides
          - ref-agy-custom-providers-effort-ignored
          - ref-agy-custom-providers-schema
          - ref-agy-custom-providers-baseurl-changelog
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-responses
        status: partial
        source_refs:
          - ref-agy-custom-providers-error
          - ref-agy-custom-providers-quota
          - ref-agy-custom-providers-thinking
          - ref-agy-custom-providers-headless
          - ref-agy-custom-providers-apikey-parity
          - ref-agy-custom-providers-troubleshoot
          - ref-agy-custom-providers-keyroute
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs:
          - ref-agy-custom-providers-audit
          - ref-agy-custom-providers-models-list-output
          - ref-agy-custom-providers-modelprovider
          - ref-agy-custom-providers-troubleshoot
          - ref-agy-custom-providers-printmodel
          - ref-agy-custom-providers-keyroute
          - ref-agy-custom-providers-settingsfile
---

本章的固定来源范围：官方文档快照取于 2026-09-30，未注明适用软件版本；官方仓库提交 77b1aad 的登记文档、CHANGELOG 与示例。产品没有官方 npm 包，因此不存在软件版本映射，整章按 source_only 阅读。CLI 与 Antigravity 2.0、Antigravity IDE 共用若干官方页面（如 Settings 页以三个 tab 区块承载三个形态），本章只把 CLI tab 与 `/docs/cli/` 下的 CLI 专属页面写成 Antigravity CLI 的机制；属于 GUI 形态的描述会注明是共享目录还是其它形态。

核心结论先说：固定来源里不存在可注册全新 provider 的扩展入口或 provider 清单。唯一的第一方“provider”概念是 CLI 设置文件中的 `modelProvider` 键，它只接受一个取值 `gemini`，并且必须与环境变量 `GEMINI_API_KEY` 同时存在才生效。provider 插件接口、模型元数据 schema 与流式协议细节在来源中没有出现，凡涉及处均按缺口标注，不编造。

## 入口与作用域 {#providers-entry}

在固定来源中，模型 provider 不是一个可注册新协议或新实现的扩展层，而是一个候选项。CLI 侧唯一的 provider 入口是用户设置文件 `~/.gemini/antigravity-cli/settings.json` 中的 `modelProvider` 键；plugins 主题描述的扩展是 Skill、命令一类的能力包，不提供模型 provider 接口（交叉位置见原生插件章）。

启用 Gemini API key 的最小配置来自 install 页，只有一行键值：[@ref-agy-custom-providers-modelprovider]

```json
{
    "modelProvider": "gemini"
}
```

该文件是用户全局作用域，路径固定为 `~/.gemini/antigravity-cli/settings.json`，不随项目变化；CLI 采用 sparse persistence，只把与系统默认值不同的键写盘，因此该文件通常很小。[@ref-agy-custom-providers-settingsfile]

取值与生效条件是第一方行为中最明确的一条：`gemini` 是唯一被接受的值，其它取值会被忽略并照常走账号登录；而 `modelProvider` 与 `GEMINI_API_KEY` 必须成对——只设 `modelProvider` 而不设 `GEMINI_API_KEY` 时 CLI 无法启动（启动即退出并报告 key 未设置），只设 `GEMINI_API_KEY` 也不生效。[@ref-agy-custom-providers-keygating] 生效后 banner 与 `/help` 把凭据显示为 `Gemini API key`，`/logout` 会说明它来自环境而非结束会话。[@ref-agy-custom-providers-keyroute]

回退方式：从 `settings.json` 移除 `modelProvider` 即回到账号登录；但若仍保留 `gemini` 而环境里没有 `GEMINI_API_KEY`，CLI 无法启动。[@ref-agy-custom-providers-revert]

一个值得注意的缺口：CLI 的 `settings.json` 参考表（以及 `/config` 交互面板）只登记了 colorScheme、altScreenMode、toolPermission 等键，未列出 `modelProvider`。[@ref-agy-custom-providers-reference-keys] 也就是说 `modelProvider` 是一个“写在文件里有效、但未在设置参考中登记”的键。除此之外，第一方字段层面没有其它 provider 相关键被文档化；是否存在其它未公开字段无法从固定来源确认。

可观察的检查方式：启动 CLI，若跳过登录界面且头部显示 `Gemini API key`，说明 provider 与凭据都已生效；若照常出现登录界面，通常是 `modelProvider` 取值拼写错误或被忽略。

## 凭据、环境变量与端点 {#providers-auth}

凭据只有一个来源：环境变量 `GEMINI_API_KEY`。文档明确，`GOOGLE_API_KEY`、`.env` 文件都不被读取，CLI 不加载 `.env`；必须把变量 export 到当前 shell 或写进 shell profile。[@ref-agy-custom-providers-troubleshoot]

写示例时只用占位值（来源文档本身用 `your-api-key`），不要把真实密钥落到任何文件或章节里：[@ref-agy-custom-providers-keygating]

```
export GEMINI_API_KEY="your-api-key"
```

端点覆盖同样走环境变量而非配置文件：`GOOGLE_GEMINI_BASE_URL` 用来把模型请求发送到另一个 Gemini 兼容端点。[@ref-agy-custom-providers-baseurl] 配置文件里没有对应的 base URL 键，这一点与 `modelProvider` 不同（CLI 的 settings.json 参考表列出的键中也没有 base URL 项）。[@ref-agy-custom-providers-reference-keys]

base URL 是否连带改变鉴权路径，来源没有正面说明；它只被描述为“把模型请求指向不同端点”。已知一条相关事实：对通过 `GOOGLE_GEMINI_BASE_URL` 设置的自定义端点，客户端会丢弃一个该端点未必支持的会话字段，否则请求会失败。[@ref-agy-custom-providers-baseurl-changelog] 因此“base URL 是否同时改变鉴权/令牌端点”仍需运行观察才能判定，属于剩余缺口。

凭据在界面上的表现：banner 与 `/help` 显示 `Gemini API key`，并且 API key 会话下 `/logout` 无效（因为没有可清除的本地会话）。[@ref-agy-custom-providers-keyroute]

## 模型目录与选择 {#providers-models}

可用推理模型随套餐变化：官方 Models 页用一张表列出各模型在 Free 与 Google AI Plus、Pro、Ultra、Enterprise 下的可用性。[@ref-agy-custom-providers-model-catalog] 需要说明边界：该 Models 页是共享页，表与所述“模型选择器下拉框”并未区分形态，`/docs/models` 也不在 CLI 专属页面目录下；CLI 形态对应的选择入口是 `/model` 命令与 `--model` 参数，下拉框描述属于 GUI 形态。

CLI 的两个直接入口：启动参数 `--model` 设置模型，以及 `models` 子命令列出可用模型。[@ref-agy-custom-providers-modelscmd] `/model` 命令用于选择偏好的推理模型，选择会持久到后续会话。[@ref-agy-custom-providers-slash-model]

解析失败时的行为区分了模式：print 模式下 `--model` 无法解析会硬失败（非零退出并列出可用模型），而交互式会话保留“回退并告警”的行为。[@ref-agy-custom-providers-printmodel] 这给出一条可观察判据：看到列出的可用模型列表即可确认是“名字没解析到”，而不是后端问题。

模型 ID 与别名：来源没有公开的别名表，但有直接证据表明存在解析与替换——CLI 日志会记录“你指定的模型名被解析成了另一个模型”的情形，例如别名解析、`--effort` 变体选择、以及被弃用的已保存模型被替换。[@ref-agy-custom-providers-audit] 自定义模型可写在 `settings.json` 中（见元数据小节），但其 ID/字段语法未在固定文档中给出，属于缺口。

目录的发现与刷新：模型列表由 CLI 提供，可用 `--output-format json` 或 `stream-json` 得到机器可读输出。[@ref-agy-custom-providers-models-list-output] 目录随版本增补，例如以 `GEMINI_API_KEY` 连接时会加入 Gemini 3.8 Flash。[@ref-agy-custom-providers-catalog-changelog]

不可自定义的部分：官方 Models 页说明栈内还有若干“Additional Models”（如用于生成图像的 Nano Banana 2）服务于其它用途，用户不可自定义。[@ref-agy-custom-providers-additional-models]

因此 `providers.models` 判为 partial：选择、列出与解析行为清楚，但自定义模型的 ID 与别名规则未文档化。

## 能力元数据与推理强度 {#providers-metadata}

自定义模型写在 `settings.json` 中，并可用 `modelFeatures` 媒体标志声明对 images、video、PDF、audio 的支持；自定义模型默认接受 PDF。[@ref-agy-custom-providers-modelfeatures] 但这些媒体标志的字段名与取值语法在所引来源中没有展开，无法据此写出可靠的自定义模型配置块，属于明确缺口。

上下文窗口方面，CLI 在压缩对话时按模型的完整 context window 计算摘要与截断预算，而不是用压缩触发阈值。[@ref-agy-custom-providers-context] 这说明模型带有上下文窗口元数据并被客户端使用；但自定义模型如何声明该值、以及输出上限如何表达，来源没有记录，属于 unknown。

推理强度：不同模型按支持度暴露不同的 reasoning effort，可用 `--effort` 启动参数，或在 `/effort`、`/model` 的强度刻度上选择。[@ref-agy-custom-providers-effort][@ref-agy-custom-providers-effort-flag] 支持多档强度的模型在 Models 页以 Low、Medium、High 等形式展示，同一模型家族内可切换。[@ref-agy-custom-providers-model-catalog]

工具能力与视觉能力：除上述媒体标志外，没有把工具、视觉等能力声明为可写元数据的机制记录；栈内辅助模型（含图像生成）不可自定义。[@ref-agy-custom-providers-additional-models] 综合判断，`providers.metadata` 为 partial：媒体能力标志存在但语法未文档化，上下文窗口/输出上限的声明入口未知。

## 协议、前向与路由 {#providers-protocol}

唯一被文档化的接入形态是 Gemini API（原生）：`modelProvider: "gemini"` 让模型请求直接发往 Gemini API，且 base URL 可换成另一个 Gemini 兼容端点。[@ref-agy-custom-providers-baseurl] 固定来源没有描述如何注册别的请求协议、是否存在通用兼容层，或不同端点形态该如何配置；provider 插件层也不存在。因此“支持哪些请求协议”这一问在本库不能声明，判为 partial。

关于兼容层的可观察行为有一条：客户端对自定义端点会主动丢弃一个端点未必支持的会话字段，以避免请求失败。[@ref-agy-custom-providers-baseurl-changelog] 工具 schema 的前向处理也有一条：MCP 与 provider 的工具 schema 校验会保留开放对象 schema（例如声明为对象、或显式 `additionalProperties: true`），不因出现未声明参数就拒绝。[@ref-agy-custom-providers-schema] 这两条说明前向不是逐字节透传，而是会做适配。

配置中可写的参数如何进入请求：`modelProvider`（文件）、`GEMINI_API_KEY` 与 `GOOGLE_GEMINI_BASE_URL`（环境变量）、`--model` 与 `--effort`（命令行）。命令行 flag 临时覆盖持久设置，只对当前会话生效，且 `/config` 面板会为被覆盖项显示 override 警告。[@ref-agy-custom-providers-cli-overrides] 一个历史缺陷记录了顺序要求：flag 必须在模型配置初始化之前生效，否则会被忽略并静默回退到已持久化或默认模型。[@ref-agy-custom-providers-effort-ignored]

哪些只影响界面而非路由：colorScheme、altScreenMode、runningLightSpeed、verbosity 等是显示项，不属于 provider 前向，详见配置机制章，本章不重复。凭据本身只影响登录/鉴权显示（banner 与 `/help`），不改变请求内容。[@ref-agy-custom-providers-keyroute] 综合判断 `providers.forwarding` 为 partial：覆盖层级与适配行为可确认，请求体字段级映射未文档化。

## 响应、错误与重试 {#providers-responses}

流式协议：固定来源没有描述流式响应格式，属于 unknown。

工具调用与响应重建：客户端在重建 Gemini 请求历史时会涉及工具调用 ID 与思考块（thinking blocks）等字段——一条修复记录指出，`GEMINI_API_KEY` 会话此前会在后续用户消息中丢弃前轮的模型思考块，并且未在文本与思考部分传播 thought signature。[@ref-agy-custom-providers-thinking] 另有条目说明该路径持续在“减少与账号登录路径的行为差异”。[@ref-agy-custom-providers-apikey-parity]

错误与重试：API key 会话在遇到当天额度耗尽、项目或计费账户花费上限、预付额度耗尽时会立即停止，而不是花数分钟做不可能成功的重试；短时的每分钟速率限制仍会重试。[@ref-agy-custom-providers-quota] 会话中途出现通用的模型错误，通常意味着 key 无效、被撤销，或没有访问所请求模型的权限；CLI 启动时只检查 key 是否非空，因此不可用的 key 到首次对话才暴露。[@ref-agy-custom-providers-troubleshoot]

headless 场景的错误上报更结构化：当一轮因 agent 或模型 API 失败而终止时，CLI 会在 stderr 打印一行 `AGY_ERROR: {...}` JSON，含 canonical status、HTTP 或 gRPC 错误码、retryability 与 error ID（并对 `GEMINI_API_KEY` SDK 错误做 HTTP 状态映射），退出码为 3 而非 1。[@ref-agy-custom-providers-error] headless 的默认超时也改为无限，除非显式传 `--print-timeout`；API key 的 headless 会话还启用了后台常驻命令。[@ref-agy-custom-providers-headless]

后端约定：必须与 Gemini API 兼容；端点可以不具备完整会话字段支持（客户端会丢弃不适用的字段）。凭据显示与 `/logout` 行为作为该路径的旁证。[@ref-agy-custom-providers-keyroute]

## 诊断 {#providers-diagnostics}

要区分“配置可读”“模型可选”“请求已发送”“后端实际可用”四个状态，可用的入口如下。

配置可读：确认 `~/.gemini/antigravity-cli/settings.json` 存在且内容能被解析，或用 `/config`（别名 `/settings`）打开交互设置面板；该文件采用 sparse persistence，只保存与默认值不同的键。[@ref-agy-custom-providers-settingsfile]

模型可选：用 `/model` 打开选择器，或用 `models` 子命令列目录；`--output-format json` 或 `stream-json` 可得到机器可读列表，便于脚本判断某个模型是否在列。[@ref-agy-custom-providers-models-list-output] print 模式下 `--model` 解析失败会非零退出并列出可用模型，可直接作为“名字未解析到”的判据。[@ref-agy-custom-providers-printmodel]

请求已发送与后端可用：这是最需要区分的一对。启动阶段 CLI 只检查 `GEMINI_API_KEY` 是否非空，因此“已进入主界面且头部显示 `Gemini API key`”只能说明配置与凭据被读到，不能证明后端可用。[@ref-agy-custom-providers-modelprovider][@ref-agy-custom-providers-troubleshoot] 真正的后端可用性要到首次对话才暴露；headless 下则可依赖 `AGY_ERROR` 的结构化错误、retryability 与退出码来区分失败类型。

模型名解析审计：CLI 日志会记录指定模型名被解析为不同模型的场景（别名解析、`--effort` 变体选择、弃用模型替换），用来确认实际选中的模型是否与预期一致。[@ref-agy-custom-providers-audit]

凭据来源确认：banner 与 `/help` 显示 `Gemini API key`，而在该模式下 `/logout` 无效，二者共同说明凭据来自环境变量而非本地会话。[@ref-agy-custom-providers-keyroute]
