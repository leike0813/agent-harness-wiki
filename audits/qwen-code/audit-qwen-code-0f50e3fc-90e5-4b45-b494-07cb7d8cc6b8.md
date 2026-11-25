# qwen-code 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:06:36.201Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 configuration、mcp、native_plugins、local_transcripts 主题的 6 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（1121 个文件）、1 个 npm 来源版本自 0.26.0 前进到 0.26.1。已发布引用落在 packages/cli/src/config/{settingsUtils,mem0-settings,config,settingsSchema}.ts、packages/core/src/core/coreToolScheduler.ts、packages/core/src/services/chatRecordingService.ts 与 docs/users/extension/mods.md 的行定位不再命中。

settings 系列文件是配置来源与覆盖规则，mem0-settings 是扩展设置入口，coreToolScheduler 是工具暴露与调度，chatRecordingService 是会话记录结构：这些正是已发布 configuration、hooks、mcp、native_plugins、local_transcripts 章节引用的实现位置。

本轮派发这六道题。npm 版本前进属纯发布身份变化。

### 派发问题与证据入口

- `config.overrides`：cited source file changed at the published locator；packages/cli/src/config/settingsUtils.ts (packages/cli/src/config/settingsUtils.ts#WORKSPACE_RESTRICTED_SETTINGS)；packages/cli/src/config/settingsUtils.ts (packages/cli/src/config/settingsUtils.ts:286-289)；packages/cli/src/config/settingsUtils.ts (packages/cli/src/config/settingsUtils.ts:277-292)
- `hooks.entry`：cited source file changed at the published locator；packages/cli/src/config/mem0-settings.ts (packages/cli/src/config/mem0-settings.ts#bundledMem0Hooks)
- `mcp.definition`：cited source file changed at the published locator；packages/cli/src/config/mem0-settings.ts (packages/cli/src/config/mem0-settings.ts#createBundledMem0Server)
- `mcp.exposure`：cited source file changed at the published locator；packages/cli/src/config/mem0-settings.ts (packages/cli/src/config/mem0-settings.ts#createBundledMem0Server)
- `plugins.api`：cited source file changed at the published locator；packages/core/src/core/coreToolScheduler.ts (packages/core/src/core/coreToolScheduler.ts:3744-3759)；docs/users/extension/mods.md (docs/users/extension/mods.md:1-22)；docs/users/extension/mods.md (docs/users/extension/mods.md:155-163)
- `transcripts.schema`：cited source file changed at the published locator；packages/core/src/services/chatRecordingService.ts (packages/core/src/services/chatRecordingService.ts:2531-2562)

## 待处理与独立复核

**审计记录：** `audits/qwen-code/audit-qwen-code-0f50e3fc-90e5-4b45-b494-07cb7d8cc6b8.yaml`。**待处理旧审计：** audit-qwen-code-42d06e9b-b1b5-410a-8c7c-948096791695、audit-qwen-code-888916ad-b2ec-4dba-9e92-2b032d361ba0、audit-qwen-code-09fdd70c-8546-4453-9976-314fe6b62dfd、audit-qwen-code-67a32536-c8ca-43c6-a77f-3a97c7e748df。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-qwen-code-repo` | 9a83f1080e14 → f4f602d60666 | changed |
| `source-qwen-code-npm` | 0.26.0@sha51 → 0.26.1@sha51 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
