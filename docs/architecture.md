# 架构

```text
Git 中的结构化知识（fixture 与 production 分离）
  → Domain schema + 跨记录校验
  → 离线编译与统一发布投影
  → knowledge.json / knowledge.sqlite / docs/ / manifest.json
  → 完整性校验与不可变 releases/<id>/
  ├→ 固定 release 的只读 QueryService → CLI / MCP stdio
  └→ 生成的 Markdown → VitePress 文档站
```

Git 中的结构化知识是事实真源。SQLite、JSON、Markdown 和 HTML 都是可重建产物。编译器先在 staging 写入并验证 hash、JSON、数据库和页面一致性，再发布；失败不会覆盖已有 release。M0 fixture 与正式知识隔离。当前正式记录只有 Codex CLI 来源和快照，没有真实能力结论；忽略的原件归档由单独离线审计检查，不进入查询发布。

依赖方向为 `domain ← validation/compiler ← query ← CLI/MCP`。`src/query/schema.ts` 承载共享查询契约，QueryService 负责版本、Target、条件、覆盖、冲突和分页语义。CLI 与 MCP 只解析输入、调用服务和呈现结果。MCP 进程启动时校验并固定一个 release；工具调用无法切换发布，也不访问网络、执行 harness 或写事实源。VitePress 从已验证发布的 Markdown 渲染事实页，站点另附一页通用状态说明；不从页面反向提取事实。

查询不调用 LLM：已复核并发布的知识应在离线状态下可重复查询，模型生成的临时回答不能替代版本与证据判断。M1 的本地 embedding 只计划用于搜索召回，不用于改变事实状态。
