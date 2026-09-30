# 架构

```text
Git：Catalog（产品与界面）/ Harness / Source / Artifact / Snapshot + 章节 Markdown / 来源引用 / 版本映射 / 当前选择
  → 领域 schema 与跨记录校验
  → 单一规范化章节投影
  → knowledge.json + knowledge.sqlite + search.json + semantic.json + docs/ + manifest.json
  → staging 完整性验证 → 不可变 release → 当前指针
```

产品与界面身份模型在 `src/domain/catalog.ts`；registry 只登记产品 id 与来源引用，名称、别名和界面的唯一事实源是 `catalog/harnesses.yaml`。新章节模型在 `src/domain/chapter.ts`，输入校验在 `src/validation/chapters.ts`，离线编译和校验在 `src/compiler/chapter-release.ts`。来源与原件身份沿用现有 Harness、Source、Artifact、Snapshot。固定问题以 `docs/topic-questions.md` 为准；每章记录自己的问题状态、小节和引用。软件版本映射独立于固定来源章节，精确包版本必须有同包快照与逐小节证据。当前章节选择独立于章节文件，所以历史章节不可变，映射变化也无需重写章节。

JSON、SQLite 和生成页面从同一规范化数据集生成。发布验证检查产物清单及 SHA-256、数据库完整性和外键、JSON/SQLite 行、Markdown 内容；SQLite 采用无必需 WAL 边文件的封闭文件。当前小节进入 FTS5 与精确索引，段落向量由固定 digest 的本机 Ollama 模型离线生成；历史章节不进入搜索。归档文档与 npm 原件留在 Git 忽略目录，查询发布只保留元数据和可展示短摘录。查询不访问上游网络、不执行来源或 harness，也不调用生成式 LLM；语义搜索只连接本机 Ollama。

`src/query`、CLI、MCP 和 VitePress 读取同一新格式章节发布；查询服务在打开时验证 manifest、JSON、SQLite 和生成文档。发布内嵌 catalog，所以 `--scope catalog` 的列表、候选产品和 catalog 来源引用无需构建树即可读取。fixture 在隔离根目录构建。旧发布格式不属于新读取契约。软件版本解析只依据发布中的显式映射；固定源码或网页不会自动代表安装包版本。
