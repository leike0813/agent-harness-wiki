# Kilo Code 上游审阅报告 · 2026-10-03

## 给维护者的结论

本轮仓库从 `0b1e0140` 前进到 `76bcfd40`，覆盖 357 个文件，其中 207 个属于 VS Code 与 JetBrains 扩展。Kilo Code 本产品只登记了 CLI 一个界面，所以绝大部分改动落在范围之外。逐主题核对下来，只有 `custom_providers` 有一处读者可见的变化：Claude 系模型在四个一方协议包上请求输出上限时，不再套用共享的 32000 封顶，而是直接用模型的完整 `limit.output`。其余六个主题的机制文件一个都没动，章节版本全部保留。

值得单独提一句的是官方文档没跟上。`custom-models.md` 的 `limit` 表在新提交上仍然写着 "Capped at 32,000 by default"，这个例外只存在于 CLI 运行时源码和 7.8.2 的变更日志里。两者不冲突——文档讲的是共享默认值，源码讲的是四个协议包加 Claude 系模型的窄例外——但按文档估算自定义 provider 的输出上限会算错，所以 v3 把两条并排列出来并写清各自边界。

## 变化的意义与证据边界

### Claude 系一方路由的输出上限例外

新提交给 `KiloLLM.outputTokens` 加了一层判断：先照旧算出 `min(limit.output, 32000)` 作为基准值，然后在五个条件同时满足时改用 `max(基准值, limit.output)`。条件是协议包属于 `@kilocode/kilo-gateway`、`@ai-sdk/anthropic`、`@ai-sdk/amazon-bedrock`、`@ai-sdk/google-vertex/anthropic`，模型 `family` 以 `claude` 开头或 `api.id` 含 `claude`，没有设 `KILO_EXPERIMENTAL_OUTPUT_TOKEN_MAX`，不是内部小请求，且 `options` 里没有显式的 `thinking.budgetTokens` 或 `reasoningConfig.budgetTokens`。`[@ref-kilo-code-providers-output-claude]` `[@ref-kilo-code-providers-output-routes]`

动机写在源码注释里：Claude 把思考 token 算进 `max_tokens`，自适应思考下没有 SDK 额外叠加的独立预算，32000 可能先被思考吃光，正文和工具调用还来不及写。`[@ref-kilo-code-providers-output-rationale]` 变更日志把它记成"Claude Sonnet、Opus 及 Claude 系别名的回复在长推理时会提前结束"的修复。`[@ref-kilo-code-providers-output-changelog]`

影响 `providers.models`、`providers.metadata`、`providers.forwarding` 三题，落在 `custom-providers-models` 与 `custom-providers-forwarding` 两节。转发一节还补上了完整链路：调用点在 `src/session/llm/request.ts`，真正发给协议包前还要过一次 `maxOutputTokensForRequest`，后者对 `@ai-sdk/cerebras` 在已显式指定 `max_completion_tokens` 时不覆盖。`[@ref-kilo-code-providers-output-request]` `[@ref-kilo-code-providers-output-final]` `[@ref-kilo-code-providers-output-cerebras]` 状态维持原样——`providers.forwarding` 与 `providers.responses` 本来就是 `partial`，因为"哪些配置项只影响界面、哪些确实映射到请求"的完整清单在固定来源里仍然缺失。

### 六个无变化主题的核查范围

CLI 相关的改动集中在 `packages/opencode`（43 个文件）与 `packages/tui`（14 个文件），但没有落在配置 schema、Skill 加载、MCP 连接、插件加载这些模块上。既有引用做了逐条核对：涉及的 24 个源码文件里只有 `src/tool/task.ts` 变化，唯一 hunk 在第 480 行，而引用 `ref-kilo-code-agents-src-task` 定位的 123–165 行与上一轮逐字节一致；文档侧 `platforms/cli.md` 未变，另两页的改动都在 VSCode 标签内。

`custom_agents` 有三处行为不变或表述调整值得一提：Agent Manager 的 worktree 校验消息加长、`.kilo/worktrees/` 改为按需创建、Task 工具取消文案从 "Task cancelled" 改成 "Task cancelled by the user"。另外 `src/session/tools.ts` 把 Goal 策略从构建期剔除工具改成执行期抛错——Goal 不是七类主题的已发布机制，现有章节没有收录，因此不构成读者可见变化。

`src/kilocode/tool/registry.ts` 里 `semantic_search` 的同意门控只对 `KILO_PLATFORM=vscode` 生效，`linkPr` 经 `pr-link.ts` 的 `enabled()`（`Flag.KILO_CLIENT === "cli"`）在 CLI 侧保持启用，CLI 的工具暴露面没有变化。

### npm 观察

registry 观察到 `7.8.3@sha512-3OBkmFrAi01YNrV7yZli7H3J3SR4X9e3dKey5sd9CVwVKXq85ZenbV/btp2xeDObWbRsdux4OYyfLuRR0ZA5xw==`，与固定提交里 `packages/opencode/package.json` 的 `version: 7.8.3` 一致。按维护契约，npm 版本变化本身不构成章节变化或源码到包的映射，本轮不新建任何 `mappings/` 记录，也不更新 `artifact-kilo-code-npm`——受管包更新属 `harness-binary`，`delivery=pr` 轮次不执行。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | `kilo-code-cli-custom_providers-v3` | providers.models：answered；providers.metadata：answered；providers.forwarding：partial；providers.responses：partial | 交付新版本 v3，建议选为当前版本 |
| configuration | `kilo-code-cli-configuration-v2` | 全部维持原状态 | 保留旧版本，无读者可见变化 |
| custom_agents | `kilo-code-cli-custom_agents-v2` | 全部维持原状态 | 保留旧版本，无读者可见变化 |
| skills | `kilo-code-cli-skills-v1` | 全部维持原状态 | 保留旧版本，无读者可见变化 |
| mcp | `kilo-code-cli-mcp-v1` | 全部维持原状态 | 保留旧版本，无读者可见变化 |
| hooks | `kilo-code-cli-hooks-v1` | 全部维持原状态 | 保留旧版本，无读者可见变化 |
| native_plugins | `kilo-code-cli-native_plugins-v1` | 全部维持原状态 | 保留旧版本，无读者可见变化 |

**发布：** 未执行——本轮 `delivery=pr`，只交付知识与审计，不运行 `pnpm chapters:update` / `pnpm ahw publish`，不切换任何发布指针。 `registry/chapter-current.yaml` 未修改，聚合阶段请把 `custom_providers` 选为 `kilo-code-cli-custom_providers-v3`。 **受管二进制：** 未触发——`delivery=pr` 轮次不调用 `harness-binary`。

## 待处理与独立复核

**审计记录：** [`audit-kilo-code-74d82f10-ccb1-41d3-9e59-4c2e7eb349c4.yaml`](audit-kilo-code-74d82f10-ccb1-41d3-9e59-4c2e7eb349c4.yaml)，`status: changed`，`review_status: reviewed`，`pending_question_ids: []`。 **待处理旧审计：** 无（`pending_audit_refs: []`）。 **待复核问题：** 无。本轮未触发三类高影响情况：文档与源码的分歧可按 provider 协议包与模型族条件解释，没有已发布的配置步骤被推翻（"默认封顶 32000" 得到条件化补充而非反转），也没有跨主题的关键加载机制变化。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-kilo-code-repo` | `0b1e01409a2f2255eff7e1c47c6dc894eaed5288` → `76bcfd40be616a72f4697b3041565f322245b462` | changed；`refs/heads/main`。357 个文件变化，CLI 相关改动集中在 provider 输出上限、TUI 键位、PR 会话链接、snapshot 回滚与存储初始化 |
| `source-kilo-code-npm` | 无基线记录 → `7.8.3@sha512-3OBkmFrAi01YNrV7yZli7H3J3SR4X9e3dKey5sd9CVwVKXq85ZenbV/btp2xeDObWbRsdux4OYyfLuRR0ZA5xw==` | changed；与固定提交的 `packages/opencode/package.json` 版本号一致 |

## 验证与差异入口

`pnpm knowledge:validate` 通过，输出 `Validated 505 chapter editions.`，无 error；剩余 `COVERAGE_INCOMPLETE` 警告全部属于 codex、omp、opencode、pi 等其他产品，未改动。`pnpm sources:audit-log` 退出码 0，无 error/warning。`git diff --check` 无输出（退出码 0）。`git status --short --untracked-files=all -- knowledge/kilo-code audits/kilo-code` 只列出本轮 19 个新文件，无对其他产品的改动。

本轮新增：`knowledge/kilo-code/chapters/kilo-code-cli-custom_providers-v3.md`；`knowledge/kilo-code/references/ref-kilo-code-providers-output-{base,cerebras,claude,changelog,final,rationale,request,routes}.yaml`；`knowledge/kilo-code/snapshots/snapshot-kilo-code-{output-tokens,llm-request,llm-native,provider-transform,changelog}-20261003.yaml`；对应的五个 `git_source_file` artifact。

```sh
git status --short --untracked-files=all -- knowledge/kilo-code audits/kilo-code
git diff --no-index /dev/null knowledge/kilo-code/chapters/kilo-code-cli-custom_providers-v3.md
```
