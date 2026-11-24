# cursor 上游审阅报告 · 2026-10-25

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-10-24T18:04:53.511Z，会话 057702b2-d935-4f35-a685-ca2fd5b75e89。本轮派发 hooks、mcp、skills、configuration、custom_agents、custom_providers、native_plugins、local_transcripts 主题的 22 道固定问题。

## 变化的意义与证据边界

6 个官方文档来源变更（cli-changelog、ent-organizations、hooks、mcp、rules、skills）。

这些页面的变更与已发布章节的对应关系是本轮的核心：hooks、mcp、skills 三页是本产品已发布章节直接引用的文档，rules 与 ent-organizations 是配置与组织模型的证据页，cli-changelog 记录发布身份变化。

本轮派发八类主题的受影响固定问题，由 worker 逐页按新快照重新定位并判断结论是否变化；上一轮已记录的 custom_providers-byok 与用量池口径差异仍按该轮结论保持，不在本轮重复处理。

## 待处理与独立复核

**审计记录：** `audits/cursor/audit-cursor-661c3c03-6c8d-4627-9181-bdd44b8aca37.yaml`。**待处理旧审计：** audit-cursor-607611f4-277b-4201-9fd4-c772f4593f02、audit-cursor-3bba47fe-58f7-4773-a3bb-ae2ef03bd063、audit-cursor-ad14c23c-f6c6-434b-8a5f-f042cbb6d44d。**待复核问题：** 本轮派发范围为增量核对，是否构成高影响由协调者按来源冲突、推翻已发布配置步骤、跨主题加载机制三项判据决定。。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-cur-cli-changelog-doc` | 70d57616d76d → de106fcb00a9 | changed |
| `source-cur-ent-organizations-doc` | 5ba4e2021ef5 → f1f623e167ac | changed |
| `source-cur-hooks-doc` | 8436af768468 → a5f76c8eab2c | changed |
| `source-cur-mcp-doc` | dd0286ad6a5f → 33c58ca4e1a2 | changed |
| `source-cur-rules-doc` | 884c67ca1611 → dae9d3ecd7e3 | changed |
| `source-cur-skills-doc` | f50d0128510a → a642fa96776c | changed |

## 验证与差异入口

本轮由协调者完成观察级验证：逐来源核对新字节与发布快照、逐文件核对 diff 与已发布行定位。章节级结论由维护 worker 在隔离候选中完成并经 `pnpm maintenance:candidates check` 校验。
