# kimi-code 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:05:40.886Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 local_transcripts 主题的 3 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（256 个文件）、1 个 npm 来源版本自 2.3.0 前进到 2.3.1。已发布引用落在 packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts 与 packages/agent-core-v2/src/persistence/interface/sessionLock.ts 的行定位不再命中：新增 CLIENT_DISPLAY_NAMES（kimi_code_cli、kimi_code_desktop、kimi_code_vscode）与 clientDisplayName 字段，会话占用错误文案改为按客户端显示名区分。

docs/en/configuration/env-vars.md 新增 KIMI_CODE_REGION_MARKER，并把 KIMI_CODE_BACKGROUND_MAX_RUNNING_TASKS 的优先级改写为同时覆盖 Tower workers 与 reviewers；packages/agent-core-v2/src/agent/profile/profileService.ts 新增 planModeAvailable。

本轮派发 transcripts.location、transcripts.naming、transcripts.diagnostics：会话锁的持有方标识、位置与诊断结论直接依赖这些字段。

### 派发问题与证据入口

- `transcripts.location`：cited source file changed at the published locator；packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts (packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts:203-231)
- `transcripts.naming`：cited source file changed at the published locator；packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts (packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts:203-231)
- `transcripts.diagnostics`：cited source file changed at the published locator；packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts (packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts:203-231)

## 待处理与独立复核

**审计记录：** `audits/kimi-code/audit-kimi-code-6ffd2394-2b51-4aa4-b26f-6f6fc788bdd8.yaml`。**待处理旧审计：** audit-kimi-code-93eb5dc0-e41b-49b6-a3db-662389fc6dbf、audit-kimi-code-0e5dd3dc-24fa-419e-bba5-d44fdeb0a493、audit-kimi-code-a3703458-eda9-4a88-844e-e224b1c75e40。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-kimi-code-repo` | 759958afdfeb → 7ccac2b45b8a | changed |
| `source-kimi-code-npm` | 2.3.0@sha512 → 2.3.1@sha512 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
