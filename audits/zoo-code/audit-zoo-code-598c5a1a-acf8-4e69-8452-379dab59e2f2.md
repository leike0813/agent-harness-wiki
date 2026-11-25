# zoo-code 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:08:17.203Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 local_transcripts、native_plugins 主题的 2 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（167 个文件）。已发布引用落在 packages/types/src/history.ts 的行定位不再命中：historyItemSchema 新增可选 title 字段（用户自定义显示名，task 保留原始 prompt），src/core/task/Task.ts 相应改写启动元数据，src/core/webview/ClineProvider.ts 新增 renameTaskWithId，webviewMessageHandler.ts 新增 renameTaskWithId 消息分支。

README.md 与 src/package.json 改写为 v3.92.0 发布说明与版本，属发布身份层。

本轮派发 transcripts.schema（历史记录结构新增字段）与 plugins.install（发布说明中的 MCP marketplace 新增 AnySearch、Mailtea、Tradehand 三个连接源）。

### 派发问题与证据入口

- `transcripts.schema`：cited source file changed at the published locator；packages/types/src/history.ts (packages/types/src/history.ts:28-40)
- `plugins.install`：cited source file changed at the published locator；README.md (README.md:1-3)

## 待处理与独立复核

**审计记录：** `audits/zoo-code/audit-zoo-code-598c5a1a-acf8-4e69-8452-379dab59e2f2.yaml`。**待处理旧审计：** audit-zoo-code-f9720bc5-ced6-4b53-8895-f2f811b13824、audit-zoo-code-583abb97-bedb-4196-abc0-054e4fe26037、audit-zoo-code-fb456d07-a446-4740-9ea5-9bb298d13e00、audit-zoo-code-35f606aa-c413-4130-9154-24ab3bdd00e3、audit-zoo-code-ecb2d7bc-6539-4912-b9e0-f23e6722fb17。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-zoo-code-repo` | 05d01f33d03a → e879f8de4e9e | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
