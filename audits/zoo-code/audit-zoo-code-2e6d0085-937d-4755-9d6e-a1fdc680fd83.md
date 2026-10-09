# Zoo Code 巡检维护报告 · audit-zoo-code-2e6d0085

## 给维护者的结论

本轮是**一次窄范围增量维护**：`source-zoo-code-repo` 由 `d7963fc2` 推进到 `2baac5e5`，上游唯一的机制变更是新增档案字段 `openAiStrictToolSchemas`。该字段直接改变发往 OpenAI 兼容网关的请求体形状，命中 `custom_providers` 的 `providers.protocol`、`providers.forwarding`、`providers.responses` 三道固定问题。

已写出新 edition `zoo-code-vscode-custom_providers-v3`（基于当前选中的 v2），并把 `registry/chapter-current.yaml` 的 `custom_providers` 选版切到 v3；v2 字节未动。

## 来源身份

- `source-zoo-code-repo`：`Zoo-Code-Org/Zoo-Code.git`，`refs/heads/main` 由 `d7963fc2db8ff07189e9f22079b15d67ad3a8bfd` 变为 `2baac5e5b76018af2f1569450a70514b077a3748`（`fix(api): add openAiStrictToolSchemas setting for OpenAI-compatible gateways (#1828)`，82 个文件）。
- `source-zoo-code-docs` 与 `source-zoo-code-docs-site` 本轮 `unchanged`，未新建任何文档侧证据。
- 本 worker 只读 coordinator 已 pin 的 workspace `ws-2baac5e5b760-f0f57b3e-824d-49b9-b573-38cfca794649`，没有新建工作区，没有执行扩展或受管二进制。

## 语义 triage

### 纳入

- `packages/types/src/provider-settings/openai.ts`：新增 `DEFAULT_OPEN_AI_STRICT_TOOL_SCHEMAS = true` 常量，以及 `openAiProviderDefinition` schema 里的 `openAiStrictToolSchemas: z.boolean().optional()`。
- `src/api/providers/base-provider.ts`：`convertToolsForOpenAI` 新增 `strict` 形参（默认取该常量），MCP 判定与开关合成 `useStrict = !isMcp && strict`；关闭时 `parameters` 原样透传。同时把 schema 规范化改为对每个属性先克隆再改写，避免严格模式就地改掉调用方持有的工具元数据。
- `src/api/providers/openai.ts`：`createMessage` 与 `completePrompt` 各读一次 `this.options.openAiStrictToolSchemas ?? DEFAULT_OPEN_AI_STRICT_TOOL_SCHEMAS`，并传入流式、非流式共四处请求拼装点。
- `webview-ui/src/components/settings/providers/OpenAICompatible.tsx`：设置面板新增该开关的 Checkbox，默认勾选值与常量一致。

### 排除

- `webview-ui/src/i18n/locales/*` 共 18 个语言包：只新增 `providers.openAiStrictToolSchemas` 与其描述文案，属任务明确排除的 i18n churn。英文文案（"Strict tool schemas (strict: true)" / "Send strict: true with tool schemas…"）已并入 v3 正文，未单独建引用。
- `src/core/webview/WebviewFocusTracker.ts`、`src/activate/resolveChatProvider.ts`、`src/core/webview/ClineProviderFactory.ts`、`src/core/task/run-state/runState.ts`、`src/activate/registerCodeActions.ts`、`src/extension.ts`、`src/extension/api.ts` 及 `packages/types/src/vscode-extension-host.ts`：构成另一组「webview 焦点跟踪 + 运行态子模型 + 代码操作入口」变更，不触及 provider 配置字段或请求体构造，不计入 `custom_providers` 的章节影响。
- 其余为测试文件与 `AGENTS.md`。

### 跨 provider 边界（已核实）

`convertToolsForOpenAI` 是 `BaseProvider` 上的 protected 方法，同一基类的其他 provider 也调用它。固定 commit 上 DeepSeek（`src/api/providers/deepseek.ts:156`）与 Zoo Gateway（`src/api/providers/zoo-gateway.ts:217`）仍是单参数调用，取默认 `true`，因此该开关**只影响 `apiProvider: "openai"` 这一条路径**。正文写明了这个边界，未把结论外推到其它 provider。

## 逐题状态

三道 scoped 问题都有固定源码证据，结论写在 v3 的 `{#providers-protocol}` 与 `{#providers-responses}`：

- `providers.protocol`（answered）—— 协议层多出一个可选请求体形态开关，字段定义、缺省常量、`strict` 形参语义、四处拼装点、UI 入口与 Extra Body 保留键边界。
- `providers.forwarding`（answered）—— 配置项如何经 `OpenAiHandler` 映射到 `tools[].function.strict` 与 `parameters`，以及 `tools`/`tool_choice`/`parallel_tool_calls` 是 Extra Body 保留键、无法绕道调整。
- `providers.responses`（partial，状态沿用 v2）—— 补充了工具 schema 最终形态随该设置变化、MCP 工具恒为非严格，以及严格/非严格两次请求共享元数据时的克隆改写。`partial` 的既有缺口（各 provider 无统一「最大重试次数」常量）本轮未补。

## 证据

新增 15 条引用，全部为 `git_source_file`，`commit` 固定 `2baac5e5b76018af2f1569450a70514b077a3748`，`content_sha256` 由 pinned 工作区该文件真实字节计算，`locator` 为文件行区间：

- `packages/types/src/provider-settings/openai.ts`：常量与注释（9-15）、schema 字段（93-95）、Extra Body 保留键（17-36）
- `src/api/providers/base-provider.ts`：转换函数签名与注释（26-39）、MCP 前缀判定（48-50）、`useStrict` 分支与 `strict`/`parameters` 赋值（52-71）、改写规则注释（77-83）、`additionalProperties: false` 与 `required = allKeys`（92-101）、属性克隆改写（106-118）
- `src/api/providers/openai.ts`：选项读取（96-99）、流式请求体（178-183）、单次补全请求体（420-426）
- `webview-ui/src/components/settings/providers/OpenAICompatible.tsx`：设置项 Checkbox（193-201）
- `src/api/providers/deepseek.ts`（156-158）、`src/api/providers/zoo-gateway.ts`（217-219）：跨 provider 边界

对应 6 对 artifact/snapshot（每文件一对），`content_sha256` 与 pinned 工作区该 commit 下文件真实字节逐一核对一致。

未写 `mappings/`：源码提交不证明 npm 发行包行为。

## 复核状态

`review_status` 保持 `pending`，未写 `reviewed_by` / `reviewed_at`。原因有二：`pending_audit_refs` 仍指向 `review_status: pending` 的 `audit-zoo-code-440f520d`，该审计在其它主题上的 pending 题不在本轮固定范围（topics = `custom_providers`）内；且本候选尚未经过父进程复核。三道 scoped 问题在 `pending_question_ids` 与审计 impact 中同时记录，交付时按未完成处理，不写入已发布指针。

## 未解决项

1. 三道 scoped 问题的结论已有源码证据，但需父进程复核本候选后才能结案。
2. 文档仓库（`source-zoo-code-docs`）本轮未变，因此 `openAiStrictToolSchemas` 目前**没有官方文档侧的对应说明**；正文里关于该设置的表述全部来自源码与 webview 英文文案，未声称文档已收录。
3. 既有边界未变：项目根 `archive/zoo-code/` 在本轮不存在，本轮未新建任何 `archived_document`。
