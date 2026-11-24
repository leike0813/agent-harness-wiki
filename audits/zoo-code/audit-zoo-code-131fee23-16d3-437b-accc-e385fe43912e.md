# zoo-code 维护报告（2026-11-24）

- 审计：`audit-zoo-code-131fee23-16d3-437b-accc-e385fe43912e`
- 观察：2026-11-23T18:03:17.824Z；`source-zoo-code-repo` `410e5ad3d54889147f317abdf265aa59fe087509` → `050c49ef82693b02a1626a08cf8609a6f7c00223`（5 个提交 / 82 个文件）；`source-zoo-code-docs` 与 `source-zoo-code-docs-site` 均 unchanged。
- 交付方式：worker 只写隔离候选 `/tmp/ahw-batch-4/candidates/zoo-code`，不发布、不切指针、不跑二进制。

## 逐文件 triage（只覆盖被章节引用且本轮变更的文件）

| 文件 | 机制变化 | 结论 |
| --- | --- | --- |
| `src/api/transform/reasoning.ts` | `getGeminiReasoning`：`GEMINI_THINKING_LEVELS` 增加 `xhigh`；`supportsReasoningEffort` 缺失时早退；选择值改用 `isGeminiThinkingLevel` 过滤；能力数组外退回模型默认值 | **知识变化** → custom_providers edition v7（`providers.metadata`） |
| `src/core/task/Task.ts` | `Task.ask` 调用 `checkAutoApproval` 时多传 `autoApprovalContext?.fileTargets`（第 2015 行） | 无答案变化：属审批判定输入修正，已发布章节未声明该判定读哪些路径 |
| `src/core/webview/ClineProvider.ts` | `latestAnnouncementId` 改为 `nov-2026-v3.98.2-pass-gemini-responses-fixes`（第 424 行） | 无答案变化：公告与发布身份层 |
| `README.md` | 「What is new」换成 v3.98.2（第 49-55 行） | 无答案变化：`ref-zoo-code-readme` 固定第 1-3 行徽章，release notes 未被章节引用 |

## 处理的固定问题

| topic | question | 结论 |
| --- | --- | --- |
| custom_providers | providers.metadata | **改写** → edition v7：Gemini 推理强度的能力门控、`xhigh` 等级与退回默认值的规则 |

其余主题的已发布引用文件未在本范围变更，本轮不产生 impact。

## 证据与候选

- 新快照：`snapshot-zoo-code-src-src-api-transform-reasoning-050` + `artifact-zoo-code-src-src-api-transform-reasoning-050`（`src/api/transform/reasoning.ts` @ commit `050c49ef82693b02a1626a08cf8609a6f7c00223`，sha256 `f52fc1cd509e9a71ad37dcc591e758e51c03abbba6851682b06f8d2a5dd769c4`，取自 `raw.githubusercontent.com` 的同一提交字节）。
- 新引用逐条核对在范围内（摘录与行区间包含关系已验证）：`ref-zoo-code-src-gemini-thinking-levels-050`（36-39）、`ref-zoo-code-src-gemini-effort-gating-050`（190-204）、`ref-zoo-code-src-gemini-effort-fallback-050`（206-219）。
- 新章节：`zoo-code-vscode-custom_providers-v7`；旧版 v6 字节未动，`registry/chapter-current.yaml` 已切到 v7。

## 行定位漂移

被引用的 `src/api/transform/reasoning.ts`、`src/core/task/Task.ts` 在新提交上存在行号漂移（本轮在文件靠前处插入），但已发布引用各自绑定固定快照（1d37994、05d01f3 等），摘录与其自身 commit 一致，因此保持原引用不动；只有支撑本轮新事实的定位使用新 id 并固定到 `050c49ef`。

## 未处理（超出本轮固定问题）

- README/CHANGELOG 声称的「Responses API 支持 OpenAI Compatible」在本范围只有文案，未见对应实现文件；Gemini 4 模型表变更落在未被章节引用的 `packages/types/src/providers/gemini.ts`、`vertex.ts`、`vercel-ai-gateway.ts`。两者都未推翻现有结论，留给后续相关来源变更的轮次。
- `pending_audit_refs` 中的旧审计仍未解决，本轮未派发其未完成问题，也不因本审计标记 reviewed 而视为已解决。

## 阻塞

无。
