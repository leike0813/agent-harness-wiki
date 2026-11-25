# warp 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:08:06.800Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 custom_providers 主题的 3 道固定问题。

## 变化的意义与证据边界

11 个官方文档来源变更。已发布引用 ref-warp-models-anthropic-20261006、ref-warp-models-fireworks-20261004、ref-warp-models-openai-codex-20261004 的摘录已不在新页面中：摘录在自身快照字节中存在、在本轮新字节中消失，属本轮可归因的引用失效。

这三个引用支撑模型清单、模型元数据与诊断入口，正是已发布 custom_providers 章节的答案依据。

### 派发问题与证据入口

- `providers.models`：published excerpt left the source；ref-warp-models-anthropic-20261006；ref-warp-models-fireworks-20261004；ref-warp-models-openai-codex-20261004
- `providers.metadata`：published excerpt left the source；ref-warp-models-anthropic-20261006；ref-warp-models-fireworks-20261004；ref-warp-models-openai-codex-20261004
- `providers.diagnostics`：published excerpt left the source；ref-warp-models-fireworks-20261004

## 待处理与独立复核

**审计记录：** `audits/warp/audit-warp-e8a44348-7072-4ca7-98ed-bd02f2db9c8f.yaml`。**待处理旧审计：** 无。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-warp-docs-agent-notifications` | a92039b4d5c8 → 66559081e2c0 | changed |
| `source-warp-docs-agent-profiles` | f3549a42e940 → 142549398fce | changed |
| `source-warp-docs-byok` | 296375515c50 → 89ce9e9f72f5 | changed |
| `source-warp-docs-env-vars` | d4de973e3b1d → 324e053c3e39 | changed |
| `source-warp-docs-integrations` | 605699de5a14 → a20369e2689c | changed |
| `source-warp-docs-mcp` | 8e2452e0989b → 4c363a4f9175 | changed |
| `source-warp-docs-model-choice` | 03f20d99de1c → 29c89e5f7a66 | changed |
| `source-warp-docs-rules` | c4ee1179d950 → 7bed32599263 | changed |
| `source-warp-docs-slash-commands` | bb6333aca4b6 → 15a3c215e7fd | changed |
| `source-warp-docs-ssh-extension` | f040a78d4ba7 → d7798ce0a305 | changed |
| `source-warp-docs-warp-drive` | 05dbf198d7cd → d9d4c56bf561 | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
