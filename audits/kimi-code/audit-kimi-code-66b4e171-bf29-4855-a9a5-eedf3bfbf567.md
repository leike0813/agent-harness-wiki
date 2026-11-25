# kimi-code 维护报告（2026-11-25）

- 审计：`audit-kimi-code-66b4e171-bf29-4855-a9a5-eedf3bfbf567`
- 观察：`source-kimi-code-repo` `9a82686b0e91c532f4d49da0bc088a0eac9bdede` → `48cdb62bed2f2464d2234607b179132f8aad363d`（changed）；`source-kimi-code-legacy-repo` 与 `source-kimi-code-npm` 均 unchanged。上一轮 `5535c3dc` 的 legacy-repo TLS 阻塞已由复扫判为 unchanged，作为 historical pending 保留。
- 写入范围：kimi-code candidate（`knowledge/`、`registry/chapter-current.yaml`、`audits/`）。
- 方法：只取 `/tmp/git-intersect-1125.json` 列出的 4 个文件的 diff 片段；固定源码按 commit `48cdb62` 从 raw.githubusercontent 读取核对，未重扫来源、未打开工作区。

## 逐文件 triage

| 文件 | 实质变化 | 结论 |
| --- | --- | --- |
| `apps/kimi-code/src/tui/kimi-tui.ts` | 仅 prompt prediction controller 生命周期：`handlePlanToggle` 不再通知 plan mode，新增 `handlePromptPredictionIdle`，reset 时补 `resetLoopLifecycle`，队列/编辑器替换不再通知 controller | 无已发布答案变化；hooks-v3 的引用固定在 c9f01f07 的 1055-1060、1096-1106 行，不在本 hunk 内 |
| `docs/en/customization/mcp.md` | 新增同名 deferred 工具 schema 替换段落：一次公告旧移除+新加入，须重新 `select_tools`，重载前调用被拒绝；Kimi Chat Completions 依次发送旧声明、unload、新声明；inline 工具不受影响 | 细化既有的 delta 通知机制，未推翻 mcp-capabilities 已发布表述 → 不新建 mcp edition |
| `packages/agent-core-v2/docs/wire-manifest.d.ts` | `TurnEndedPayload` 新增可选 `loopEnd`（`outcome: 'drained' \| 'idle'`） | 知识变化：v3 逐项枚举 turn.ended 可选字段的答案不完整 → 新 edition |
| `packages/agent-core-v2/test/session/subagent/forkParity.test.ts` | `createDirectChild` 显式 `start()` 子 loop | 测试启动时序设置，不计知识变化 |

## 结论与章节

- `local_transcripts` → 新 edition `kimi-code-local_transcripts-v4`
  - `transcripts.schema`：`TurnEndedPayload` 可选字段补入 `loopEnd`（`drained`/`idle`）；写入条件与两者差异未在固定摘录解释，列入 schema 缺口；该题保持 partial。
  - 其余小节与结论沿用 v3，未改写。

## 排除项

同提交未列入 intersecting 清单的文件、纯重构与测试改动均按 no-op 处理；`mcp`、`custom_agents`、`hooks`、`configuration`、`custom_providers`、`native_plugins`、`skills` 无已发布答案变化。

## 证据与自检

- 新增 `artifact-kimi-code-wire-manifest-48cdb62`（`content_sha256` `68ea1fd3548e339c20a579b50dc8c5c1b73d206600f608d6f1d3b5b832804d64`）、对应 snapshot 与 `ref-kimi-code-lt-src-turn-ended-loop-end-48cdb62`（963-965 行）；旧 artifacts/references/editions 未修改。
- 候选校验：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-12/candidates/kimi-code` 通过。
- 未发布、未切换本地指针、未执行 managed binary。

## 复核

本次为 schema 字段增量（可选字段，未推翻已发布步骤），按普通更新由候选作者/协调者自检结案，`review_status: reviewed`；无独立复核要求。
