# Codebuff 上游巡检报告 · 2026-10-04

- 审计记录：`audit-codebuff-20261004t061205z`（status `changed`，review_status `reviewed`）
- 本轮观察：12 个登记来源，其中 11 个非 unchanged
- 协调者语义 triage：限定调查（narrow_investigation）
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-codebuff-repo` | git_repository | changed | `9fbc44c4446470323357edb91dc59fd32bd541e2` | `14684822511b17b750d10ed3f964d122ff2b7563` |
| `source-codebuff-docs-skills` | official_documentation | changed | `d45ce92d4d91551097df7e32471181944326ad190dbb…` | `6ab245fefe150a11681ecfaf4a8de8d9b186fd63081d…` |
| `source-codebuff-docs-mcp` | official_documentation | changed | `12b5be5453521399dafda18d0f6fdcc93f5fa754019b…` | `ad6f5da2f1d8eeb385fa23e9248800b3e057875ef2a4…` |
| `source-codebuff-docs-agent-reference` | official_documentation | changed | `7fb375ea69df7b3ba0c85f8b1f194a63083c72a12d31…` | `9bd6051d9438d99d2543353ece2177ae5d7d3db3679c…` |
| `source-codebuff-docs-agents` | official_documentation | changed | `532338c4443f3ca6ced29c5433516ea80522816b9cd8…` | `cdc4479cee2b21f843d5f8a8b2c7cb5b4604281de903…` |
| `source-codebuff-docs-knowledge` | official_documentation | changed | `1f96e6869bfe348b7e2caeb1ce0174d0393d7b542362…` | `a9bd2bf3962a47fd2fd77cb7bbd3a5ce86330e59d0f1…` |
| `source-codebuff-docs-troubleshooting` | official_documentation | changed | `f84f5b618b2ac2ae312779c4dcbcce215ad81e86b485…` | `544add95cd3f4b973f6a6c15784cd0dee6528d8dcfd5…` |
| `source-codebuff-docs-agent-troubleshooting` | official_documentation | changed | `47fd0879e2e5e540eef0541bf0856d77ab8f55322154…` | `6e0c6cda30e588757a027b2bbd7a2ee68c40d397a1e7…` |
| `source-codebuff-docs-how` | official_documentation | changed | `ededcb82d33054577ce3bbdf810c1053056e6e8e43f6…` | `657089647c49a66890ace161c1a196ef71353a63932a…` |
| `source-codebuff-docs-quickstart` | official_documentation | changed | `31241ebff01dbacdc9e1911ef5033f6ac30dda3d81be…` | `ff25dd92e963e0cbd9dc78e40e9e6ba6cb045586a502…` |
| `source-codebuff-docs-sdk` | official_documentation | changed | `75da610a27d612486eb943b26c7d70ec476ebc8f01ba…` | `bc419cbc75e6bb1e3394e39f2ad49cede33a2ba78e25…` |

## 语义 triage 与理由

### skills

受影响固定问题：`skills.roots`、`skills.discovery`、`skills.collision`、`skills.format`、`skills.extensions`、`skills.loading`、`skills.invocation`、`skills.conditions`、`skills.diagnostics`

关联小节：`skills-roots-format`、`skills-discovery-collision`、`skills-loading-invocation`、`skills-conditions-diagnostics`

同步提交新增 `cli/src/utils/skill-registry.ts` 的载入状态标志（`skillsLoaded` / `isSkillRegistryLoaded()`）。**复查结论：已排除，不影响本章任何答案。** 见下文「调查记录」。

### hooks

受影响固定问题：`hooks.events`、`hooks.entry`、`hooks.input`、`hooks.output`、`hooks.order`、`hooks.conditions`、`hooks.diagnostics`

关联小节：`hooks-model`、`hooks-entry-io-order`、`hooks-diagnostics`

`cli/src/hooks/` 下 `send-message.ts`、`use-gravity-ad.ts`、`use-message-queue.ts` 有改动，需确认是 CLI 内部 React hooks 还是对外钩子机制。**复查结论：是 CLI 自身界面的 React hooks，不是产品钩子机制，已排除。** 见下文「调查记录」。

## 调查记录

- 本轮协调者语义 triage 结论：narrow_investigation。已交回隔离候选做定向维护。
- 本轮 codebuff 由 9fbc44c4 前进到 1468482251，提交为「Sync public snapshot from freebuff-private」，53 个变化路径且提交无描述，无法据提交判断影响面，故按影响面不确定扩大复查。
- 10 份官方文档哈希变化本轮未逐份 diff（协调者已排除该范围）；本轮未新增或改写任何引用，未新抓取文档原件。
- **协调者待判断点已回答**：`cli/src/hooks/` 不是 Codebuff 产品的钩子机制，而是 CLI 自身界面的 React hooks。目录下文件 `import { useCallback, useEffect, useRef, useState } from 'react'`，测试为 `.test.tsx`，本轮三处改动全部是广告遥测（COD-757 的 `noteAdTurnFailure` / `noteAdQueuedCount` / `armAdAdoptionWatch` / `timedAdFetch`）。产品侧钩子只体现为 `run_file_change_hooks` 工具契约，位于 `common/src/tools/`、`packages/agent-runtime/`、`sdk/src/`，本轮全部未变。
- **skills 复查**：`skill-registry.ts` 新增的是进程内载入状态标志。`initializeSkillRegistry()` 的 SDK 调用、入参与失败降级未变；`getLoadedSkills()` / `getSkillByName()` / `getSkillCount()` 语义未变；`getLoadedSkillsMessage()` 在 `cli/` 下仍无调用点（章节把它记为「无用户可见清单入口」依然成立）。新导出 `isSkillRegistryLoaded()` 的唯一消费者是 `cli/src/ads/ad-client-context.ts:886` 的 `liveWork()`，用它把广告遥测上下文的 `skills` 字段区分「0 个 skill」与「尚未载入」。这是 CLI 自身广告遥测，不是技能发现、加载或配置面，用户可观察行为未变。
- **复查方法**：从两章 frontmatter 的 `source_refs` 展开出 25 个唯一 `git_source_file` 定位，与本轮 53 个变化路径求交，仅 `cli/src/utils/skill-registry.ts` 命中（24 个未变且在 HEAD 仍存在）；再在 `1468482` 处逐条复核承重断言：四个搜索目录顺序与 `includeHomeSkills` 默认 `false`、`gray-matter` 解析且名称须等于目录名、`isValidSkillName` 与 1–64 / 1024 上限、`available_skills` 的 XML 转义与 `disable-model-invocation` 过滤、SDK 两处 not-supported 文案、根 agent `toolNames` 仍含 `skill` 且不含 `run_file_change_hooks`。全部与现选章节一致。
- **结论与章节处置**：skills 9 题、hooks 7 题共 16 个固定问题的答案与状态均未变化，按维护契约不新建 edition，保留 `codebuff-cli-skills-v1` 与 `codebuff-cli-hooks-v1` 及其 `registry/chapter-current.yaml` 选择。
- **来源边界**：两章固定来源仍为 `639e3f3c`。本轮源码工作区是浅克隆（仅 grafted 基线 `9fbc44c4` 与 `1468482`），无法机器复核 `639e3f3c → 9fbc44c4` 那一段，故改为在 `1468482` 直接按内容复核承重断言作为补偿。`source-codebuff-npm` 本轮 unchanged；HEAD 不代表任何已发布包版本行为，两章继续按来源级知识读取，不做版本映射。

## 候选与复核

本产品已交回隔离候选做定向维护；候选只允许编辑本产品的 `knowledge/`、`audits/` 与本产品来源登记，逐产品 `check` 通过后由协调者生成合并计划。高影响结论按维护契约另行独立复核。

本轮定向调查已结案：16 个固定问题全部完成复查，**无知识影响**，`pending_question_ids` 清空。本结论属普通更新（未推翻已发布配置步骤、无来源冲突、跨主题加载机制未变），未触发高影响独立复核条件，按契约由作者自检后标记 `review_status: reviewed`。`status` 仍为 `changed`，因为登记来源本身确实前进（由 checks 派生，不可改写）。本轮未发布、未切换指针、未运行受管二进制。
