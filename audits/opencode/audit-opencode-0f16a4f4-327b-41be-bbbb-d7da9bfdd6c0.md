# OpenCode 上游审阅报告 · 2026-10-09

## 给维护者的结论

本轮固定来源只前进一个提交（`3f393d7` → `3884062`，105 个文件），其中与 opencode 产品知识相关的只有一处：`packages/opencode/src/session/message-v2.ts` 新增 `rejectedByProvider`。走 `@ai-sdk/xai` 时，工具结果附件里凡不属于 `image/png`、`image/jpeg`、`image/webp` 的图片会被在组装请求前丢弃。源码注释写明原因是 xAI 对其它图片格式（例如 GIF）返回 `invalid_image`，会让整次请求失败。

这处改动落在 custom_providers：请求内容如何被加工由 provider 声明的 npm 包分派，读者配置自定义 provider 时选包就会改变结果。已发布的两条答案受影响——`providers.protocol`（兼容层按 npm 包分派行为）与 `providers.responses`（工具结果附件处理链与后端约定）。`providers.forwarding` 已复核但未变：新增过滤不是 `provider.options` 的可配置参数。

其余变更为 `packages/web` 多语言文档与 `patches/` 目录改名，属文档站与依赖补丁，不在本轮范围。npm 上观察到 `opencode-ai` 1.18.35，只作身份记录，没有据此造版本映射。

## 变化的意义与证据边界

### xAI 图片格式过滤（custom_providers）

`toModelMessagesEffect` 在 `model.api.npm === "@ai-sdk/xai"` 且附件 mime 以 `image/` 开头、又不属于 png/jpeg/webp 三者之一时判定该附件被后端拒绝。过滤发生在工具结果附件列表上，位于媒体抽取之前，因此被丢掉的图片不会再以独立用户消息补发；用户消息里的 `file` part 不受影响，宿主对那条路径不做格式删减。 [@ref-opencode-providers-xai-image-mime] [@ref-opencode-providers-xai-attachment-filter]

同时把同一函数里既有的 `supportsMediaInToolResult` 分派表补进章节：anthropic、openai、amazon-bedrock/mantle、google-vertex/anthropic 全允许；amazon-bedrock 只允许图片并按模型 id 收窄；xAI 只允许 `image/*`；google 只允许 id 含 gemini-3 且不含 gemini-2 的模型；不允许的媒体被抽出改由独立用户消息发送。这段代码在两个提交之间未变，本轮只是把它与新增过滤写成同一条处理链。 [@ref-opencode-providers-tool-result-media-support] [@ref-opencode-providers-tool-result-media]

### 已复核但未变（custom_providers）

`providers.forwarding` 的答案只覆盖 `provider.options` 的转发参数（timeout、headerTimeout、chunkTimeout、setCacheKey、fetch、headers）与 Gemini 推理档位。新增过滤由 `model.api.npm` 硬编码分派，配置层没有对应键，因此该问题的答案、状态与引用保持不变，只在受影响的两题上补充。 [@ref-opencode-providers-forwarding]

## 本次交付与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_providers | opencode-custom_providers-v5 | providers.protocol：answered；providers.responses：partial | 已交付，候选内选为当前版本 |
| custom_providers | opencode-custom_providers-v4 | — | 保留未改 |

**发布：** delivery=pr，未运行 `ahw publish`、`chapters:update` 或 `managed:packages`；候选 `registry/chapter-current.yaml` 已把 opencode 的 custom_providers 指向 v5，集成时随 diff 一并应用。 **受管二进制：** 本轮未核对，delivery=pr 不进入受管二进制流程。

新增来源记录：`knowledge/opencode/artifacts/artifact-opencode-20261009-packages-opencode-src-session-message-v2.yaml`、`knowledge/opencode/snapshots/snapshot-opencode-packages-opencode-src-session-message-v2-20261009.yaml`，以及 4 条引用（providers-xai-image-mime、providers-xai-attachment-filter、providers-tool-result-media、providers-tool-result-media-support）。四者固定 commit `388406238bd5ca15564a762840a2362c3a45bd9c`，`content_sha256` 为 `b55648c3…`，源码 checkout 未复制进候选。

## 待处理与独立复核

**审计记录：** [audit-opencode-0f16a4f4](../../audits/opencode/audit-opencode-0f16a4f4-327b-41be-bbbb-d7da9bfdd6c0.yaml) **待处理旧审计：** 无。 **待复核问题：** 无。三项高影响触发条件都不成立：来源之间无冲突；新增行为不推翻任何已发布配置步骤（配置层没有对应键）；无跨主题关键加载机制变化。审计 `review_status` 保持 `pending`，由协调者在本轮聚合阶段决定是否直接结案。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-opencode-repo | `3f393d78bfc3f0826b2c7080e57964c235704695` → `388406238bd5ca15564a762840a2362c3a45bd9c`（refs/heads/dev） | changed。105 个文件，命中已登记引用的只有 `message-v2.ts`（+10/-1），其余为 `packages/web` 文档与 `patches/` 改名 |
| source-opencode-npm | `1.18.34@sha512-9WUS2T…` → `1.18.35@sha512-tDQKTh…` | changed。仅版本与 integrity 变化，未据此制造章节变化或版本映射 |

两个来源都成功观察，无失败。源码读自项目外 pinned workspace `ws-388406238bd5-2468108e-266b-4de4-a5f0-10bd44d79349`，未在候选中保留 checkout。

## 验证入口

`pnpm maintenance:candidates check --candidate var/harness-monitor/run-20261009t020000z/batch/candidates/opencode` 通过。

```sh
git diff -- knowledge/opencode audits/opencode registry/chapter-current.yaml
```