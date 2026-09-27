# 架构

当前 M0 已实现维护侧的结构化输入、校验和离线发布，以及查询侧的 QueryService 与 CLI：

```text
Git 中的 registry/knowledge YAML
  → Domain schema + 数据集校验
  → 统一发布投影
  → JSON / SQLite / Markdown
  → manifest 完整性验证
  → 不可变 releases/<id>/ + current.json
  → 固定 release 的只读 QueryService
  → ahw CLI
```

虚构输入目前隔离在 `tests/fixtures/datasets/basic/`。Git 中的结构化知识是事实真源；SQLite、JSON 和生成页面均是可重建产物。发布文件之间的 hash、行和页面一致性由编译器验证，旧发布不随新构建被覆盖。

依赖方向为 `domain ← validation/compiler ← query ← CLI`。QueryService 启动时验证并固定一个 KnowledgeRelease，后续 CLI/MCP 均应共享其事实语义。查询不调用 LLM、网络或 harness：已审核并固定的知识必须在离线状态下可复现，查询时不能生成新的未经证实结论。正式 MCP 适配层与文档站仍待实现。
