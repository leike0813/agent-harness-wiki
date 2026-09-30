---
schema_version: 3
record_kind: production
edition_id: bolt-web-custom_providers-v1
harness_id: bolt
topic: custom_providers
title: "Bolt 的模型 Provider：硬编码的 Anthropic 接入、ANTHROPIC_API_KEY、请求参数与流式续写"
sections:
  - section_id: providers-scope
    surface_ids: [web]
    source_refs: [ref-bolt-repo-model, ref-bolt-docs-index-listing]
  - section_id: providers-entry-auth
    surface_ids: [web]
    source_refs: [ref-bolt-repo-model, ref-bolt-repo-api-key, ref-bolt-repo-worker-config, ref-bolt-repo-contributing-setup, ref-bolt-repo-contributing-scripts, ref-bolt-repo-bindings, ref-bolt-docs-agents-list, ref-bolt-docs-forge-what, ref-bolt-docs-faq-how]
  - section_id: providers-request
    surface_ids: [web]
    source_refs: [ref-bolt-repo-contributing-ai-sdk, ref-bolt-repo-stream-text, ref-bolt-repo-api-chat, ref-bolt-repo-system-prompt, ref-bolt-repo-llm-constants, ref-bolt-docs-account-addons]
  - section_id: providers-models-metadata
    surface_ids: [web]
    source_refs: [ref-bolt-repo-model, ref-bolt-repo-llm-constants, ref-bolt-docs-agents-list, ref-bolt-docs-forge-what, ref-bolt-docs-forge-switch, ref-bolt-docs-llms-how]
  - section_id: providers-responses-diagnostics
    surface_ids: [web]
    source_refs: [ref-bolt-repo-api-chat, ref-bolt-repo-switchable-stream, ref-bolt-repo-llm-constants, ref-bolt-repo-chat-use-chat, ref-bolt-repo-bindings, ref-bolt-repo-model, ref-bolt-repo-fetch, ref-bolt-repo-logger-level, ref-bolt-docs-forge-usage]
questions:
  - question_id: providers.entry
    answers:
      - surface_ids: [web]
        section_id: providers-entry-auth
        status: partial
        source_refs: [ref-bolt-repo-model, ref-bolt-repo-api-key, ref-bolt-repo-worker-config, ref-bolt-docs-agents-list, ref-bolt-docs-forge-what]
  - question_id: providers.auth
    answers:
      - surface_ids: [web]
        section_id: providers-entry-auth
        status: answered
        source_refs: [ref-bolt-repo-api-key, ref-bolt-repo-worker-config, ref-bolt-repo-contributing-setup, ref-bolt-repo-contributing-scripts, ref-bolt-repo-bindings]
  - question_id: providers.protocol
    answers:
      - surface_ids: [web]
        section_id: providers-request
        status: partial
        source_refs: [ref-bolt-repo-contributing-ai-sdk, ref-bolt-repo-stream-text]
  - question_id: providers.models
    answers:
      - surface_ids: [web]
        section_id: providers-models-metadata
        status: partial
        source_refs: [ref-bolt-repo-model, ref-bolt-docs-agents-list, ref-bolt-docs-forge-what, ref-bolt-docs-forge-switch]
  - question_id: providers.metadata
    answers:
      - surface_ids: [web]
        section_id: providers-models-metadata
        status: partial
        source_refs: [ref-bolt-repo-llm-constants, ref-bolt-docs-llms-how]
  - question_id: providers.forwarding
    answers:
      - surface_ids: [web]
        section_id: providers-request
        status: answered
        source_refs: [ref-bolt-repo-stream-text, ref-bolt-repo-system-prompt, ref-bolt-repo-llm-constants, ref-bolt-repo-api-chat]
  - question_id: providers.responses
    answers:
      - surface_ids: [web]
        section_id: providers-responses-diagnostics
        status: answered
        source_refs: [ref-bolt-repo-api-chat, ref-bolt-repo-switchable-stream, ref-bolt-repo-chat-use-chat, ref-bolt-repo-llm-constants]
  - question_id: providers.diagnostics
    answers:
      - surface_ids: [web]
        section_id: providers-responses-diagnostics
        status: partial
        source_refs: [ref-bolt-repo-bindings, ref-bolt-repo-model, ref-bolt-repo-fetch, ref-bolt-repo-logger-level, ref-bolt-docs-forge-usage]
---

## 固定来源与范围 {#providers-scope}

本章的固定来源是开源仓库提交 `eda10b121221b30825a4c16eec5da1fd3eb1eb99` 的
`app/lib/.server/llm/` 与 `app/routes/`（Provider 定义、凭据、请求形态、流式与续写），加上
托管产品的帮助文档（Agent/模型选择、Forge 模型、token）[@ref-bolt-repo-model][@ref-bolt-docs-index-listing]。

两条边界：

- **开源修订只支持一个 Provider（Anthropic），且不可配置**。Provider 由代码硬编码，凭据来自
  环境变量或 Cloudflare 绑定；没有 Provider 配置文件、没有 base URL 字段、没有多 Provider
  注册表 [@ref-bolt-repo-model]。
- **托管产品不允许用户自带 Provider**。Agent 选择器背后是产品托管的模型（Standard/Max，以及
  Forge 的开源模型），文档明确说不存在公开 API/CLI/SDK 从外部控制产品
  [@ref-bolt-docs-faq-how]。Forge 允许在若干开源模型中选择，这不是"自定义 Provider"。

文档快照没有标注适用软件版本，本章是来源级知识。

## Provider 定义与凭据 {#providers-entry-auth}

**providers.entry**：开源修订里 Provider 的定义只有一处代码：`getAnthropicModel(apiKey)` 调用
`createAnthropic({ apiKey })`，返回 `anthropic('claude-3-5-sonnet-20240620')`
[@ref-bolt-repo-model]。没有配置文件、没有作用域层级、没有扩展入口；要换 Provider 只能改代码。
托管产品侧与之对应的是 Agent 选择器：Standard/Max 与 Forge 都是产品内置的，用户选 Agent 而不选
Provider [@ref-bolt-docs-agents-list][@ref-bolt-docs-forge-what]。

**providers.auth**：凭据只有环境变量一条路径，取值顺序写在 `getAPIKey` 里
[@ref-bolt-repo-api-key]：

```ts
export function getAPIKey(cloudflareEnv: Env) {
  return env.ANTHROPIC_API_KEY || cloudflareEnv.ANTHROPIC_API_KEY;
}
```

- 开发时走 Node 的 `process.env`，部署/本地预览时走 Cloudflare 绑定
  [@ref-bolt-repo-api-key]；绑定的类型声明只有 `ANTHROPIC_API_KEY`
  [@ref-bolt-repo-worker-config]。
- 本地最少配置是一个 `.env.local`，`CONTRIBUTING.md` 给出的写法就是
  `ANTHROPIC_API_KEY=XXX`（占位值，真实值自行填写），并注明不要把该文件提交到版本库
  [@ref-bolt-repo-contributing-setup]。
- `pnpm run start` 会用 `bindings.sh` 把 `.env.local` 逐行转成 `--binding NAME=VALUE`
  传给 `wrangler pages dev`，因此本地预览与部署的行为一致 [@ref-bolt-repo-contributing-scripts][@ref-bolt-repo-bindings]。

文档侧的凭据只有产品托管的订阅与 token，没有用户自带 API key 的入口
[@ref-bolt-docs-faq-how]。因此示例里出现的凭据一律写成占位符，不写进任何文件。

## 请求形态与参数转发 {#providers-request}

**providers.protocol**：仓库通过 Vercel AI SDK 的 Anthropic Provider 调用 Anthropic 的模型接口
——`CONTRIBUTING.md` 写明 "Bolt uses the AI SDK to integrate with AI models. At this time,
Bolt supports using Anthropic's Claude Sonnet 3.5" [@ref-bolt-repo-contributing-ai-sdk]。
请求由 `streamText(...)` 组装后直接转发，没有自建兼容层或代理端点
[@ref-bolt-repo-stream-text]。固定来源没有给出 base URL 可配置项，也没有 OpenAI 兼容形态的
描述。

**providers.forwarding**：可写的请求参数就是 `streamText` 的取值，逐项如下
[@ref-bolt-repo-stream-text]：

| 参数 | 取值 | 作用 |
| :-- | :-- | :-- |
| `model` | `getAnthropicModel(getAPIKey(env))` | 唯一 Provider + 硬编码模型 ID |
| `system` | `getSystemPrompt()`，默认工作目录 `/home/project` | 系统提示全文 |
| `maxTokens` | 常量 `MAX_TOKENS = 8192` [@ref-bolt-repo-llm-constants] | 单轮输出上限 |
| `headers` | `anthropic-beta: max-tokens-3-5-sonnet-2024-07-15` | 打开 Anthropic 的该 beta 能力 |
| `messages` | `convertToCoreMessages(messages)` | 会话消息按 AI SDK Core 形态转换 |
| 其余 | `...options` | 路由层传入，如 `toolChoice: 'none'` 与会话回调 |

路由层额外设置 `toolChoice: 'none'`，并且每次续写都复用同一组参数
[@ref-bolt-repo-api-chat]。系统提示里的工作目录来自 `WORK_DIR = /home/project`
[@ref-bolt-repo-system-prompt]。除上述字段外没有用户可写的转发参数；托管产品侧的
"Dynamic reasoning / Image generation" 是账户级加购开关，不是请求参数
[@ref-bolt-docs-account-addons]。

## 模型 ID 与能力元数据 {#providers-models-metadata}

**providers.models**：开源修订里模型 ID 是字面量 `claude-3-5-sonnet-20240620`
[@ref-bolt-repo-model]；没有别名表、没有模型列表发现或刷新机制。托管产品把模型选择藏到 Agent
后面："You choose the agent... and Bolt handles model selection behind the scenes"，模型更新
不需要用户改任何配置 [@ref-bolt-docs-agents-list]。Forge 例外地暴露模型列表——用户在 Forge 下
直接选模型（文档列出的选项包括 GLM 5.3、GLM 5.3 Flash、Kimi K3、DeepSeek v4 Pro）
[@ref-bolt-docs-forge-what][@ref-bolt-docs-forge-switch]。这个列表由产品维护，文档没有给出
"自定义模型 ID"的入口。

**providers.metadata**：固定来源中没有能力元数据（上下文窗口、输出上限、工具、视觉、推理强度）
的声明结构。能确认的只有：单轮输出上限是仓库常量 `MAX_TOKENS = 8192`
[@ref-bolt-repo-llm-constants]；文档把上下文描述为会增长的"短期记忆"，并说明模型把输入切成
token 处理、每次能处理的 token 数有上限 [@ref-bolt-docs-llms-how]。其余能力字段（是否支持工具、
视觉得分、推理强度）在仓库与文档里都没有可配置表达，保持未知。

## 响应、流式与诊断 {#providers-responses-diagnostics}

**providers.responses**：响应处理写成一条明确的链：

1. 路由 `POST /api/chat` 接收消息，创建 `SwitchableStream`，调用 `streamText` 并以
   `toolChoice: 'none'` 取得结果流 [@ref-bolt-repo-api-chat]。
2. `SwitchableStream` 是可切换数据源的 `TransformStream`：`switchSource` 会取消旧读取器、接上
   新流并继续泵送；它记录切换次数 `switches`，`close` 终止控制器
   [@ref-bolt-repo-switchable-stream]。
3. 如果 `finishReason` 是 `length`（被 `MAX_TOKENS` 截断），服务端把已生成内容作为 assistant
   消息、把 `CONTINUE_PROMPT` 作为 user 消息追加，再发起一次 `streamText` 并把新流切换进来；
   切换次数达到 `MAX_RESPONSE_SEGMENTS = 2` 时抛出 "Cannot continue message: Maximum segments
   reached" [@ref-bolt-repo-api-chat][@ref-bolt-repo-llm-constants]。
4. 异常统一被捕获后返回 `500 Internal Server Error`；客户端 `useChat` 的 `onError` 弹出
   "There was an error processing your request"，`onFinish` 记录一条 debug 日志
   [@ref-bolt-repo-api-chat][@ref-bolt-repo-chat-use-chat]。

宿主要求后端满足的约定就是"能按 AI SDK 的 Anthropic Provider 形态返回可流式文本"；续写依赖
`finishReason` 字段和 token 上限语义 [@ref-bolt-repo-api-chat]。

**providers.diagnostics**：四个层次分别可确认到：

| 要区分的事 | 手段 |
| :-- | :-- |
| 配置/凭据可读 | 缺少 `ANTHROPIC_API_KEY` 时请求会因无可用 key 失败；本地用 `.env.local` + `bindings.sh` 注入，部署用 Cloudflare 绑定 [@ref-bolt-repo-bindings] |
| 模型可选 | 仓库里没有选择过程——模型 ID 是常量，能够构造出模型对象即"可选" [@ref-bolt-repo-model] |
| 请求已发送 | 开发模式下 `app/lib/fetch.ts` 会把请求交给 `node-fetch`（并放开证书校验），可用它区分开发/生产路径 [@ref-bolt-repo-fetch] |
| 后端实际可用 | 客户端 toast、浏览器控制台日志，以及 `VITE_LOG_LEVEL` 控制的日志级别（生产环境不允许调到 trace/debug）[@ref-bolt-repo-logger-level] |

托管产品侧的可用性只能看用量：Forge 的用量条在 Subscription & Tokens 页面，用完 Pro 计划会回落到
Standard，Lite 计划用完则无法继续发送 [@ref-bolt-docs-forge-usage]。

**缺口**：固定来源没有描述超时、重试、限流与错误分类；`api.chat.ts` 的 catch 分支只做了一次
`console.log` 并返回 500，重试策略与后端错误码映射没有文档或代码依据。
