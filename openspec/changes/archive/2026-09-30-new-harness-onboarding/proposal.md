# Proposal

## Why

新 CLI 产品的接入与上游维护目前共用一个 Skill，缺少专用入口：七类主题、53 个固定问题、分段发布，以及发布后是否接入受管二进制，都没有清晰边界。受管二进制也缺少可被其它 Skill 触达的模型调用入口，publisher 与二进制的职责需要拆开。

## What Changes

- 新增用户调用的 `harness-investigation`：为新 CLI 登记产品身份与官方来源（有 npm 包时登记 `npm_registry` 身份），直接固定来源身份，按 53 个固定问题采写七类主题章节，自检（高影响时另一 Agent 复核）后先构建再切换本地发布，发布成功后询问维护者是否继续接入受管二进制。首次接入不运行 `pnpm sources:scan`，也不写审计 YAML。
- 现有 `harness-investigation` 的上游维护说明与报告模板迁移为用户调用的 `harness-maintenance`：ID 模式对每个请求 ID 额外调用一次受管二进制 Skill，即使来源未变化；定向模式只在明确要求时调用。
- 新增模型调用的 `harness-binary`：受管二进制首次接入与最新更新统一走 `pnpm managed:packages update <id>`；缺少已核对官方 npm 来源或非 npm 分发报告 unsupported，二进制结果不阻断知识发布。
- **BREAKING**：publisher（`pnpm chapters:update`）只发布知识；`--stage` 生成不可变 release 后由 `pnpm ahw publish --release-id <id>` 切换，不再触发受管二进制刷新。

## Capabilities

### New Capabilities

- harness-onboarding: 新 CLI 从登记来源到七章发布、再到询问受管二进制接入的端到端契约。
- harness-binary: 受管二进制首次接入与最新更新的 Skill 契约。

### Modified Capabilities

- manual-investigation-skill: 上游维护职责、ID 模式的受管二进制核对，以及只发布知识的 publisher。
- managed-artifact-startup: 首次接入与更新统一由模型调用的 Skill 通过 `managed:packages update <id>` 完成，publisher 只发布知识。
- chapter-update-workflow: ID 模式每轮逐产品核对受管二进制，定向模式只按明确要求核对，二进制结果独立报告。

## Impact

涉及 `.agents/skills/harness-investigation`、`.agents/skills/harness-maintenance`、`.agents/skills/harness-binary`、`.gitignore`、AGENTS.md、docs、research/package-set/README.md 与本 change 的 delta。publisher 的知识专用行为已实现于 `scripts/publish-chapter-update.ts`。本 change 不实际接入真实产品或运行包更新器。
