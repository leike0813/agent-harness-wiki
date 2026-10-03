---
schema_version: 3
record_kind: production
edition_id: codebuff-cli-custom-providers-v2
harness_id: codebuff
topic: custom_providers
title: "Codebuff 的 BYOK Provider：入口、凭据、协议、转发与诊断"
sections:
  - section_id: providers-scope
    surface_ids: [cli]
    source_refs: [ref-codebuff-byok-schema, ref-codebuff-byok-transform, ref-codebuff-provider-settings, ref-codebuff-byok-url]
  - section_id: providers-entry
    surface_ids: [cli]
    source_refs: [ref-codebuff-byok-schema, ref-codebuff-byok-secrets, ref-codebuff-byok-usage, ref-codebuff-byok-command-reference, ref-codebuff-settings-byok, ref-codebuff-byok-openrouter-env]
  - section_id: providers-auth
    surface_ids: [cli]
    source_refs: [ref-codebuff-byok-schema, ref-codebuff-byok-secrets, ref-codebuff-cli-byok, ref-codebuff-byok-url]
  - section_id: providers-protocol-metadata
    surface_ids: [cli]
    source_refs: [ref-codebuff-byok-url, ref-codebuff-provider-settings, ref-codebuff-byok-model, ref-codebuff-byok-discovery, ref-codebuff-byok-defaults, ref-codebuff-byok-effective, ref-codebuff-byok-schema]
  - section_id: providers-forwarding-responses
    surface_ids: [cli]
    source_refs: [ref-codebuff-byok-transform, ref-codebuff-byok-efforts, ref-codebuff-byok-dialect, ref-codebuff-byok-model, ref-codebuff-byok-messages, ref-codebuff-byok-turn-spend-limit, ref-codebuff-provider-retry-after, ref-codebuff-provider-tool-call-index]
  - section_id: providers-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-byok-validate, ref-codebuff-byok-validate-result, ref-codebuff-byok-model-list-note, ref-codebuff-byok-credential-messages, ref-codebuff-byok-schema, ref-codebuff-byok-secrets, ref-codebuff-byok-model, ref-codebuff-byok-usage, ref-codebuff-cli-logs]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [cli]
        section_id: providers-entry
        status: answered
        source_refs: [ref-codebuff-byok-schema, ref-codebuff-byok-secrets, ref-codebuff-byok-usage, ref-codebuff-byok-command-reference, ref-codebuff-settings-byok, ref-codebuff-byok-openrouter-env]
  - question_id: providers.auth
    answers:
      - surface_ids: [cli]
        section_id: providers-auth
        status: answered
        source_refs: [ref-codebuff-byok-schema, ref-codebuff-byok-secrets, ref-codebuff-cli-byok, ref-codebuff-byok-url]
  - question_id: providers.protocol
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-metadata
        status: answered
        source_refs: [ref-codebuff-byok-url, ref-codebuff-provider-settings]
  - question_id: providers.models
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-metadata
        status: answered
        source_refs: [ref-codebuff-byok-model, ref-codebuff-byok-discovery]
  - question_id: providers.metadata
    answers:
      - surface_ids: [cli]
        section_id: providers-protocol-metadata
        status: partial
        source_refs: [ref-codebuff-byok-defaults, ref-codebuff-byok-effective, ref-codebuff-byok-discovery, ref-codebuff-byok-schema]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: answered
        source_refs: [ref-codebuff-byok-transform, ref-codebuff-byok-efforts, ref-codebuff-byok-dialect]
  - question_id: providers.responses
    answers:
      - surface_ids: [cli]
        section_id: providers-forwarding-responses
        status: partial
        source_refs: [ref-codebuff-byok-model, ref-codebuff-byok-messages, ref-codebuff-byok-transform, ref-codebuff-byok-turn-spend-limit, ref-codebuff-provider-retry-after, ref-codebuff-provider-tool-call-index]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: providers-diagnostics
        status: partial
        source_refs: [ref-codebuff-byok-validate, ref-codebuff-byok-validate-result, ref-codebuff-byok-model-list-note, ref-codebuff-byok-credential-messages, ref-codebuff-byok-schema, ref-codebuff-byok-secrets, ref-codebuff-byok-model, ref-codebuff-byok-usage, ref-codebuff-cli-logs]
---

## 固定来源与适用范围 {#providers-scope}

Provider 主题的证据集中在 `sdk/src/byok.ts`（连接元数据、凭据引用、base URL 规范化、上下文窗口
发现）、`sdk/src/impl/byok-request.ts`（请求体改写与推理档）、`sdk/src/impl/model-provider.ts`
（构造模型、错误消息）、`cli/src/utils/byok.ts` 与 `cli/src/commands/byok.ts`（CLI 入口与选择），
以及内嵌的 OpenAI 兼容 provider 包 [@ref-codebuff-byok-schema][@ref-codebuff-byok-transform]
[@ref-codebuff-provider-settings]。这里的 "Provider" 指 BYOK（自带密钥）连接：Codebuff 自身走托管
后端，BYOK 让你直接用 OpenRouter 或任意 OpenAI 兼容端点 [@ref-codebuff-byok-url]。

## 定义入口与作用域 {#providers-entry}

**providers.entry**：BYOK 连接不是配置文件里的手写块，而是由连接存储管理的一条记录，字段为
`id`、`revision`、`name`、`provider`（`openrouter` | `openai-compatible`）、`model`、可选
`baseUrl`、可选 `contextWindow`、可选 `maxOutputTokens`、`credentialRef`、`createdAt`/`updatedAt`
[@ref-codebuff-byok-schema]。元数据默认写在 `~/.config/freebuff/byok/connections.json`（可用
`FREEBUFF_BYOK_CONFIG_DIR` 改写；目录权限 0700、文件 0600，并用 `connections.lock` 做跨进程
互斥），密钥单独放 OS 凭据库 [@ref-codebuff-byok-secrets]。

CLI 的入口是 `/byok` 一组子命令：`list`；`add`（依次给出连接名、provider、
模型名、环境变量名，可选 base URL 与 `--context-window`、`--max-output-tokens`）；`update`、
`validate`、`select`、`effort`（`default|low|medium|high`）、`remove`、`off` [@ref-codebuff-byok-command-reference]。
本提交的 `update` 多了第四个位置参数 `ENV_VAR`，即「`/byok update` 接连接名、模型名、可选 base URL、
可选环境变量名」[@ref-codebuff-byok-command-reference]，
用于把连接换成另一个端点时显式指定新端点读哪个环境变量——注释说明这是为了让换端点这件事在确认
提示里显式带上变量名，而不是把旧连接的密钥悄悄送到新地址 [@ref-codebuff-byok-command-reference]。
`/byok help` 也从一段说明改成分步向导：先在终端里导出密钥（Bash/Zsh、Fish、PowerShell 三种写法），
再 `add`，再 `validate`，最后 `select` 开新对话 [@ref-codebuff-byok-command-reference]。设置里只保存被选中的连接
（`id`、`revision`、provider、model）与推理档，凭据不入设置文件 [@ref-codebuff-byok-usage]
[@ref-codebuff-settings-byok]。切换到另一条连接会新开一段对话（避免把上一家 provider 的消息格式
历史带到下一家）[@ref-codebuff-byok-usage]。

另有一条与托管后端并行的旁路：`CODEBUFF_BYOK_OPENROUTER` 环境变量会被当作
`x-openrouter-api-key` 请求头发给 Codebuff 后端，供后端用你自己的 OpenRouter 额度转发
[@ref-codebuff-byok-openrouter-env]。

## 凭据与 base URL {#providers-auth}

**providers.auth**：凭据只有两种引用形式。`env:NAME` 指向环境变量（CLI 命令只接受环境变量名，
永远不接受把密钥粘进命令里），或宿主自有的 connection 引用（形如 `connection:` 加连接 id 与 revision）指向 OS 凭据库
[@ref-codebuff-byok-schema][@ref-codebuff-cli-byok]。用 `env:` 时密钥由
`createEnvironmentByokSecretStore` 读取，该存储只读、不写不删 [@ref-codebuff-byok-secrets]。密钥在
解析阶段挂在非可枚举属性上，写注释也强调它不会进入会话状态、日志或凭据引用之外的元数据
[@ref-codebuff-cli-byok][@ref-codebuff-byok-secrets]。`cleanInput` 会校验密钥非空、无换行、长度不超过
4096，并禁止同时给 `apiKey` 与 `credentialRef` [@ref-codebuff-byok-schema]。

base URL 规则按 provider 固定：`openrouter` 恒为 `https://openrouter.ai/api/v1`，不接受自定义；
`openai-compatible` 必须自己提供 URL，且必须是 HTTPS（仅 loopback 主机允许 HTTP），URL 中不得
含凭据、查询串或片段 [@ref-codebuff-byok-url]。改动端点或 provider 时若不显式重新提供凭据会报错，
每次更新会把凭据轮换成新 revision 的引用，旧引用删除失败则回滚 [@ref-codebuff-byok-schema]。

## 协议、模型发现与元数据 {#providers-protocol-metadata}

**providers.protocol**：BYOK 一律讲 Chat Completions，请求打到
`<规范化 baseUrl>/chat/completions`；不带 BYOK 时同一套内嵌 OpenAI 兼容 provider 打到
Codebuff 后端的 `/api/v1` [@ref-codebuff-byok-url][@ref-codebuff-provider-settings]。因此后端要满足的
约定就是 OpenAI 风格：`/models` 可列出模型、`/chat/completions` 接受流式请求，工具与结构化输出
由 provider 选项 `includeUsage`、`supportsStructuredOutputs` 打开 [@ref-codebuff-provider-settings]。

**providers.models**：`model` 是连接上的自由文本，不做目录校验；模型清单只在两处被读取——
连接校验（GET `/key` 或 `/models`）和上下文窗口发现 [@ref-codebuff-byok-model][@ref-codebuff-byok-discovery]。
发现逻辑读 `/models` 返回里的 `context_length`、`context_window`、`max_model_len`、
`max_context_length`、`loaded_context_length` 或 `top_provider.context_length`，OpenRouter 的
`vendor/model:free` 形态会回退到基础 id；命中缓存 6 小时、未命中缓存 10 分钟，超时 4 秒，失败
静默返回 undefined [@ref-codebuff-byok-discovery]。

**providers.metadata**：连接上的 `contextWindow` 默认 32768、合法区间 4096–2000000；
`maxOutputTokens` 默认 4096 且必须小于 `contextWindow`；压缩用的 `maxContextLength` 取
`floor((contextWindow - maxOutputTokens) * 0.9)` [@ref-codebuff-byok-defaults]。如果两个上限还停留在
默认值（视为"没配"），运行时会把 provider 报告的窗口替换进来，上限 400000；远端端点取不到时用
131072，loopback 服务保持配置值；用户显式填过的值不会被替换 [@ref-codebuff-byok-effective]。缺口：
固定来源没有"工具/视觉/推理能力"这类元数据字段，能力只由模型 id 与 provider 实际行为决定。
这一条按 partial 阅读 [@ref-codebuff-byok-schema]。

## 请求转发与响应处理 {#providers-forwarding-responses}

**providers.forwarding**：可写参数经一层 `transformRequestBody` 改写后发出 [@ref-codebuff-byok-transform]。
推理档只有 `low`、`medium`、`high` 三档，缺省表示不发任何推理字段（用 provider 自己的默认）
[@ref-codebuff-byok-efforts]。档位按端点方言落到不同字段：OpenRouter 用 `reasoning.effort`；
`api.anthropic.com` 用 `thinking.budget_tokens`（2048/8192/16384）并把预算加到 `max_tokens` 上；
其余（OpenAI、Gemini 兼容口、DeepSeek、xAI、本地服务）用 `reasoning_effort`
[@ref-codebuff-byok-dialect]。另外三项专门处理：DeepSeek 的思考模式要求在最后一个 user 之后的每个带
tool_calls 的 assistant 消息补 `reasoning_content`（空串可接受）；直连 OpenAI 的
`gpt-5.6-luna` 需要把 `max_tokens` 换成 `max_completion_tokens`、去掉 `stop`，且带工具时强制
`reasoning_effort: none`；经 OpenRouter 的 OpenAI 模型会附加匿名的 `user` 与
`safety_identifier`（密钥的域分隔哈希）[@ref-codebuff-byok-transform]。

**providers.responses**：流式响应在 `fetch` 包装层被逐块清洗，把密钥替换成占位再交给上层，避免
跨块的密钥泄漏 [@ref-codebuff-byok-model]。错误被映射成固定的可操作文案：401 密钥被拒、403 无权
访问该模型、402 需要充值、404 模型或端点不存在、429 限流、5xx 暂时不可用；正文不回显 provider
的原始错误体（网关常在错误里回显密钥片段），只有"模型 id 不认"这一种分类会被写进消息
[@ref-codebuff-byok-messages]。当 400/422 的报错指名推理字段时，会去掉该字段重试一次，并对该
连接 revision 记住"以后不再发"，编辑连接（新 revision）后重新尝试 [@ref-codebuff-byok-transform]。
重试有两处本提交写明的边界。其一，"本轮花费已封顶"（HTTP 429 且响应体是
`{ error: 'turn_spend_limit' }`）被显式改写成**不可重试**的 `APICallError`：这一轮的花只会继续涨，
同一 run id 重试多少次都会被拒，交给默认退避只会得到"Failed after 4 attempts"这种看不出原因的结果；
直接抛出并带上响应体，运行时才能把服务端自己的文案和 `turn_spend_limit` 代码原样交给客户端
[@ref-codebuff-byok-turn-spend-limit]。其二，失败响应只保留 `retry-after`、`retry-after-ms` 这两个
纯数字的调度头，其余 provider 头一律不复制 [@ref-codebuff-provider-retry-after]。

流式工具调用也补了兼容处理：不少 OpenAI 兼容服务与代理在流里不发 `index`，过去这类分片会被 schema
判失败并丢掉整次调用（表现为模型说"Writing the file."却没有写入）；现在按 `id` 归位、没有 `id` 就
并入正在流式输出的那次调用，必要时才开新槽位 [@ref-codebuff-provider-tool-call-index]。缺口：固定来源
没有暴露重试次数、退避策略或请求超时的用户可配项（网络瞬时错误被标成可重试、由内嵌 AI SDK 的默认
退避吸收）。这一条按 partial 阅读 [@ref-codebuff-byok-model]。

## 诊断 {#providers-diagnostics}

**providers.diagnostics**：`/byok validate` 指定连接名后走连接存储的 `validate`：重新解析凭据、执行
`assertCurrent`（按当前 revision 复查连接是否仍然存在），再对 provider 发一次轻量请求——
OpenRouter 打 `/key`，OpenAI 兼容端点打 `/models`，超时 10 秒；成功返回 ok，失败返回带 HTTP
状态码的固定文案，异常统一成"无法安全地访问 provider" [@ref-codebuff-byok-validate]。

本提交给成功结果补了三个字段：端点检查的 `statusCode`、OpenAI 兼容端点的 `modelListed`（配置里的
模型 id 是否出现在 `/models` 返回里），以及未命中时回传的被列出的 id `availableModels`；类型注释写明
`modelListed: false` 只是警告而不是检查失败，因为代理可能路由它并不列出的 id
[@ref-codebuff-byok-validate-result]。CLI 把它变成一条带清单的提示：模型不在列表里时给出端点实际列出
的 id（最多 20 个，多余的只给计数），并建议用 `/byok update` 换模型，同时提醒"除非这个代理会路由
它没列出的 id" [@ref-codebuff-byok-model-list-note]。凭据类错误也细分成两句：环境变量在本进程里没设
时提示设好并从同一个终端重启，被 provider 拒绝（401）时点名是哪个变量、说它已经设上了、该检查它装的
是不是这个端点要的密钥 [@ref-codebuff-byok-credential-messages]。

三段可区分状态：配置可读——`connections.json` 损坏或版本不一致会在读取时报
"BYOK connection metadata is corrupt" 而不是静默回退 [@ref-codebuff-byok-schema]；凭据可用——解析
时若 OS 凭据库不可解锁会报"Could not unlock the BYOK credential store"，`env:` 引用则直接读环境
变量 [@ref-codebuff-byok-secrets]；请求确已发出——每次 provider 调用前都会重新执行
`assertCurrent`，连接被删或改版会立刻停止后续推理 [@ref-codebuff-byok-model]。CLI 侧还有
`/byok list` 查看连接、`/byok select` 切换、`/byok off` 关掉，以及日志（项目 `debug/` 与每会话
目录）[@ref-codebuff-byok-usage][@ref-codebuff-cli-logs]。缺口：没有把"配置可读 / 凭据可读 /
模型可选 / 请求已发"拆开输出的单一诊断命令；`/byok validate` 是最接近的入口，但它同时覆盖凭据与
连通性两件事。按 partial 阅读 [@ref-codebuff-byok-validate]。
