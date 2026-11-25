# deepseek-harness 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:05:03.036Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 configuration、custom_agents、mcp、native_plugins、local_transcripts 主题的 15 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（6360 个文件，基线 687f282e8625 前进到 22ddee379240）。已发布引用的行定位落在 docs/config-catalog.md、docs/subsystems/persistence.md、docs/persistence-catalog.md、docs/subsystems/tools.md、apps/cli/reference/README.md、packages/boot/plugin-manager/README.md、packages/util/package-manifest/src/types.ts、packages/session-query/session-log-export/README.md、packages/bundle/sdk-minimal/cordis.patch.yml、packages/bundle/headless/src/index.ts 等文件上不再命中。

本产品的配置目录、会话持久化、插件管理、会话日志导出与工具说明都以上述文件为已发布证据，属跨主题的关键机制。

本轮派发这十五道题。该产品此前没有 pending 审计记录，本轮是其首次以固定问题范围进入维护。

### 派发问题与证据入口

- `config.defaults`：cited source file changed at the published locator；docs/config-catalog.md (docs/config-catalog.md:1-6)
- `config.migration`：cited source file changed at the published locator；packages/bundle/sdk-minimal/cordis.patch.yml (packages/bundle/sdk-minimal/cordis.patch.yml:1-3)
- `agents.diagnostics`：cited source file changed at the published locator；packages/client/ui-agent-preset/README.md (packages/client/ui-agent-preset/README.md:28-28)
- `agents.limits`：cited source file changed at the published locator；packages/subagent/subagent/src/index.ts (packages/subagent/subagent/src/index.ts:190-202)
- `hooks.events`：cited source file changed at the published locator；packages/bundle/sdk-minimal/cordis.patch.yml (packages/bundle/sdk-minimal/cordis.patch.yml:1-3)
- `mcp.exposure`：cited source file changed at the published locator；apps/cli/reference/README.md (apps/cli/reference/README.md:133-133)；docs/subsystems/tools.md (docs/subsystems/tools.md:680-680)
- `plugins.api`：cited source file changed at the published locator；packages/boot/plugin-manager/README.md (packages/boot/plugin-manager/README.md:31-31)
- `plugins.lifecycle`：cited source file changed at the published locator；packages/boot/plugin-manager/README.md (packages/boot/plugin-manager/README.md:42-42)
- `plugins.package`：cited source file changed at the published locator；packages/util/package-manifest/src/types.ts (packages/util/package-manifest/src/types.ts:68-78)
- `transcripts.archive`：cited source file changed at the published locator；packages/session-query/session-log-export/README.md (packages/session-query/session-log-export/README.md:53-57)
- `transcripts.database`：cited source file changed at the published locator；packages/bundle/web-app/cordis.patch.yml (packages/bundle/web-app/cordis.patch.yml:21-29)
- `transcripts.diagnostics`：cited source file changed at the published locator；docs/subsystems/persistence.md (docs/subsystems/persistence.md:118-118)
- `transcripts.lifecycle`：cited source file changed at the published locator；packages/bundle/headless/src/index.ts (packages/bundle/headless/src/index.ts:253-264)
- `transcripts.naming`：cited source file changed at the published locator；docs/subsystems/persistence.md (docs/subsystems/persistence.md:158-168)
- `transcripts.schema`：cited source file changed at the published locator；docs/subsystems/persistence.md (docs/subsystems/persistence.md:158-168)；docs/persistence-catalog.md (docs/persistence-catalog.md:8700-8712)

## 待处理与独立复核

**审计记录：** `audits/deepseek-harness/audit-deepseek-harness-a0af6040-ea81-44d7-a302-5b9e6217a961.yaml`。**待处理旧审计：** audit-deepseek-harness-5ab74160-9971-489f-994f-f30dccc91e5c、audit-deepseek-harness-c748b1d3-cf0d-4d94-819c-572a6a3843de。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-deepseek-harness-repo` | 687f282e8625 → 22ddee379240 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
