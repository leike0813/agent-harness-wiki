# 架构

```text
Git：Harness / Source / Artifact / Snapshot + 章节 Markdown / 来源引用 / 版本映射 / 当前选择
  → 领域 schema 与跨记录校验
  → 单一规范化章节投影
  → knowledge.json + knowledge.sqlite + docs/ + manifest.json
  → staging 完整性验证 → 不可变 release → 当前指针
```

新章节模型在 `src/domain/chapter.ts`，输入校验在 `src/validation/chapters.ts`，离线编译和校验在 `src/compiler/chapter-release.ts`。来源与原件身份沿用现有 Harness、Source、Artifact、Snapshot。固定问题以 `docs/topic-questions.md` 为准；每章记录自己的问题状态、小节和引用。软件版本映射独立于固定来源章节，精确包版本必须有同包快照与逐小节证据。当前章节选择独立于章节文件，所以历史章节不可变，映射变化也无需重写章节。

JSON、SQLite 和生成页面从同一规范化数据集生成。发布验证检查产物清单及 SHA-256、数据库完整性和外键、JSON/SQLite 行、Markdown 内容；SQLite 采用无必需 WAL 边文件的封闭文件。归档文档与 npm 原件留在 Git 忽略目录，查询发布只保留元数据和可展示短摘录。查询不联网、不执行来源或 harness，也不调用 LLM。

此 change 先用独立的虚构 fixture 数据集验证新格式发布。现有 `src/query`、CLI、MCP 和 VitePress 仍读取 M0 Claim 格式；`m1-reader-guides` 负责将公共阅读接口迁往章节格式并完成真实章节。新 fixture 在隔离根目录构建，不切换生产 `releases/current.json`。旧发布格式不作为新读取契约。
