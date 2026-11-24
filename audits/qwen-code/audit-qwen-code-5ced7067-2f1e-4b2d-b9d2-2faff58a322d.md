# qwen-code 上游审阅报告 · 2026-11-24

## 给维护者的结论

本轮 triage 分类为 maintain。观察窗口 `source-qwen-code-repo` `2ad81c6eb9d262e0f11da287cfd0c7c24e68dbd5` → `c134a03e5adf7631069269bb96a65cbf5c90f01a`（25 个提交、592 个文件）；`source-qwen-code-npm` 无新观察。四个已引用文件发生变化，派发 `config.defaults` 与 `plugins.api` 两道固定问题；其余引用文件的变化经函数级核对排除。

## 变化的意义与证据边界

- `docs/users/configuration/settings.md`：仅 `tools.useBuiltinRipgrep` 与 `experimental.eventBusAgentLoop` 两行表格描述变化，与同提交 `settingsSchema.ts` 一字不差。
- `packages/cli/src/config/settingsSchema.ts`：`tools.useBuiltinRipgrep` 的 `default` 仍为 `true`，但 `true` 的含义从“使用随包二进制”改为“优先使用健康的系统 `rg`，PATH `rg` 缺失或无法运行时才回退内置”；`experimental.eventBusAgentLoop` 的 `default: false` 改为 `default: undefined` 并新增 `unsetToggleValue: true`，未设置时 headless 走事件总线内核、其余共享循环入口走过程路径。后者与既有的 `experimental.unifiedAgentLoop` 三态机制一致。
- `docs/users/extension/mods.md`：新增“Example: show the model's output in Chinese”一节，固定了 Mod 的渲染期注册面：`ui.render` 以 `component: ['AssistantMessage', 'Thinking']` 改写 Ink/OpenTUI/Web Shell 的行，回调可调用 `$.model.complete`（`model: 'haiku'` 映射会话快速模型，另有 `system`/`prompt`/`maxTokens`/`timeoutMs`/`signal`），并有 30 秒行渲染与 25 秒模型调用边界。基线提交的该文件已覆盖 ACP/Web Shell 运行面，故本轮不声称运行面扩展。
- `packages/core/src/core/coreToolScheduler.ts`：取消路径改为保留 `keptWhenCancelled` 的执行结果（`cancelAfterPostProcessing` 直接返回原结果、`observeProducerOutput` 不再按 producer 输出收尾），并在 `setPromoteAbortControllerCallback` 清除 promote controller 时一并清空 `pid`；配套的 shell 后台提升在 `packages/cli/src/acp-integration/session/Session.ts` 以 `movedToBackground` 跳过 abort early-error。属于执行/取消语义，不改变 hooks 事件清单或顺序、MCP 工具发现/暴露/鉴权，也不改变 transcript 格式与路径，因此 mcp、hooks、local_transcripts 不作答案变更。

## 派发问题与证据入口

- `config.defaults`：`packages/cli/src/config/settingsSchema.ts:3486-3493`（`useBuiltinRipgrep` 默认值与新语义）、`packages/cli/src/config/settingsSchema.ts:4665-4668`（`eventBusAgentLoop` 的三态默认与逐面覆盖）。
- `plugins.api`：`docs/users/extension/mods.md:1296-1302`（示例覆盖的运行面与原文保留边界）、`docs/users/extension/mods.md:1347-1362`（`ui.render` 过滤器与 `$.model.complete` 请求形态）、`docs/users/extension/mods.md:1393-1400`（30 秒渲染/25 秒模型调用边界）。

## 候选产物

- 新 editions：`qwen-code-cli-configuration-v7`（只改 `config-defaults`）、`qwen-code-cli-native_plugins-v4`（只改 `plugins-api` 的 Mod 运行时一段）。
- 新 snapshots/artifacts：`snapshot-qwen-code-c134a03e-cli-settings-schema`、`snapshot-qwen-code-c134a03e-doc-mods` 及其 `git_source_file`（commit + file + `content_sha256`）。
- 旧 artifacts、references 与 editions 未改动；`registry/chapter-current.yaml` 仅切换这两个 topic 的 edition。

## 待处理与独立复核

**审计记录：** `audits/qwen-code/audit-qwen-code-5ced7067-2f1e-4b2d-b9d2-2faff58a322d.yaml`。**待处理旧审计：** audit-qwen-code-42d06e9b-b1b5-410a-8c7c-948096791695、audit-qwen-code-888916ad-b2ec-4dba-9e92-2b032d361ba0（保留在 `pending_audit_refs`）。**独立复核：** 本轮未推翻已发布配置步骤，也未出现来源冲突，不触发高影响复核。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-qwen-code-repo` | 2ad81c6e → c134a03e | changed（25 提交 / 592 文件，4 个已引用文件） |
| `source-qwen-code-npm` | 0.25.1 未变 | unchanged |

## 验证入口

`pnpm maintenance:candidates check --candidate /tmp/ahw-batch-4/candidates/qwen-code` 通过（exit 0）。引用行的 `content_sha256` 由 `raw.githubusercontent.com/QwenLM/qwen-code/<commit>/<path>` 下载后计算。
