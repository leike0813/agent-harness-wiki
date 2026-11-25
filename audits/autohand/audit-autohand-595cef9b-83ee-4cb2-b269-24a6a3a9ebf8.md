# autohand 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:04:11.373Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 configuration、local_transcripts 主题的 6 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（370 个文件）。已发布引用的行定位落在本轮提交上不再命中：src/config.ts（新增 ui.repositoryReadiness 默认值与校验）、src/commands/settings.ts、src/commands/clear.ts（/clear 改为会话压缩交接）、src/startup/resumeCommand.ts、src/permissions/PermissionManager.ts。

docs/config-reference.md 新增 Foreground Mode 一节（--no-daemon 跳过 trace-daemon 对账、设置同步、pings、账户轮询等后台服务），docs/hooks.md 新增 program-status 事件，src/core/HookManager.ts 新增 scopedRuntimeHooks 与 100 条上限。

config.defaults、config.diagnostics、config.migration 与 transcripts.cleanup/diagnostics/lifecycle 六道题的直接证据均已移动，需按新提交重新定位并核对。

### 派发问题与证据入口

- `config.defaults`：cited source file changed at the published locator；src/config.ts (src/config.ts#validateConfig)
- `config.diagnostics`：cited source file changed at the published locator；src/commands/settings.ts (src/commands/settings.ts#SETTINGS_REGISTRY)；src/config.ts (src/config.ts#validateConfig)
- `config.migration`：cited source file changed at the published locator；src/permissions/PermissionManager.ts (src/permissions/PermissionManager.ts#normalizeSettings)
- `transcripts.cleanup`：cited source file changed at the published locator；src/commands/clear.ts (src/commands/clear.ts:57-67)
- `transcripts.diagnostics`：cited source file changed at the published locator；src/startup/resumeCommand.ts (src/startup/resumeCommand.ts#resolveStartupSession)
- `transcripts.lifecycle`：cited source file changed at the published locator；src/commands/clear.ts (src/commands/clear.ts:57-67)；src/startup/resumeCommand.ts (src/startup/resumeCommand.ts#registerResumeOptions)；src/startup/resumeCommand.ts (src/startup/resumeCommand.ts#resolveStartupSession)；src/startup/resumeCommand.ts (src/startup/resumeCommand.ts#validateSessionOptions)

## 待处理与独立复核

**审计记录：** `audits/autohand/audit-autohand-595cef9b-83ee-4cb2-b269-24a6a3a9ebf8.yaml`。**待处理旧审计：** audit-autohand-6f377dcd-9544-4955-a7a9-b5c1daa4eb3d、audit-autohand-5a5fd799-4c81-4f91-ad1e-42569a9351e0。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-autohand-repo` | fcd92ec12f30 → c20c96e39bc2 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
