# factory-droid 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:05:17.453Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 hooks 主题的 2 道固定问题。

## 变化的意义与证据边界

1 个 Git 仓库来源变更（4 个文件）、1 个 npm 来源版本自 0.247.0 前进到 0.249.0。docs/reference/hooks-reference.mdx 新增第 3 条通知来源：Droid 通过 AskUser 工具提问时，notification_type 为 elicitation_dialog；docs/cli/droid-exec/overview.mdx 同步补充 AskUser 工具引用链接。

这是已发布 hooks 章节的事件来源与输入载荷的直接内容变化，需要按新快照核对事件枚举与输入字段。

## 待处理与独立复核

**审计记录：** `audits/factory-droid/audit-factory-droid-5afb4e3f-0bb3-4775-be0c-367061bc0567.yaml`。**待处理旧审计：** audit-factory-droid-a13bddc0-67d0-4107-bb78-be0210f27af2、audit-factory-droid-20261004t061205z、audit-factory-droid-10a55b44-2fba-4400-a413-0e55feb69eec、audit-factory-droid-fc9e95f8-08af-4624-a262-5c9a3da55940、audit-factory-droid-bdec1310-37d4-4bbe-93f4-fee45a4d0c98、audit-factory-droid-d9960210-0249-475b-9615-bc6e45f12833、audit-factory-droid-906a8ab3-2a87-4f2a-8133-da322763cd11。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-factory-droid-docs-models` | 51f38f2d5c3d → 257ed85b03da | changed |
| `source-factory-droid-repo` | db68fa0d6be5 → 892925c655a9 | changed |
| `source-factory-droid-npm` | 0.247.0@sha5 → 0.249.0@sha5 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
