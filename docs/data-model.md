# 数据模型

M1 章节模型的事实源是 Git 中的完整 Markdown 章节版本、来源引用 YAML、软件版本映射 YAML 和当前章节选择 YAML。固定问题清单见 [topic-questions.md](topic-questions.md)。Zod 定义在 `src/domain/chapter.ts`；`pnpm schema:check` 检查导出的 JSON Schema。现有 Claim/Coverage 记录保留为历史调查材料，不是新发布的知识输入。

## 输入

- `registry/harnesses/`、`registry/sources/` 与 `knowledge/<harness-id>/{artifacts,snapshots}/` 保留来源身份和固定快照。归档原件不进入 Git 或查询发布。
- `knowledge/<harness-id>/chapters/<edition-id>.md` 是完整章节版本。Frontmatter 含 `schema_version: 2`、`record_kind`、产品、主题、稳定小节 ID、每道固定问题的状态、主要小节及该问题自己的来源引用；正文含机制说明、问题定位和 `[@reference-id]` 标记。状态为 `answered | partial | unknown | not_applicable | conflict`。缺口和分歧在对应小节明确写出。
- `knowledge/<harness-id>/references/<reference-id>.yaml` 将可展示短摘录、HTTPS 官方链接、文件行号/符号/文档章节定位绑定到一个固定 Snapshot。同一小节引用须属于同一产品；已回答问题须在本问题正文中放置对应标记。
- `knowledge/<harness-id>/mappings/<mapping-id>.yaml` 独立记录精确软件版本、npm Snapshot、章节版本、范围及每个小节的映射证据。只有全部小节有证据时才能声明整章映射。未知道适用包版本的章节保持来源级知识，不制造版本映射。
- `registry/chapter-current.yaml` 选择每个已发布产品 × 主题的当前版本。历史版本仍留在章节目录；切换当前版本不改旧章节字节。所有新记录明确标记 fixture 或 production，正式校验拒绝虚构记录。

固定问题编号以 `docs/topic-questions.md` 为准。校验器要求每章逐题恰好一次，检查章节/小节/问题/来源/映射关系、活动 HTML、定位、快照和跨产品引用；每项诊断含代码、文件、字段、原因和修复提示。未知或部分答案允许发布，但须在对应小节解释。普通校验不读取忽略的原件；显式来源审计独立进行。

## 发布

新建发布使用 `schema_version: 2`、`builder_version: 5`；既有第 4 版构建器发布仍可读取。一个 `releases/<id>/` 包含 `manifest.json`、`knowledge.json`、`knowledge.sqlite`、`search.json`、`docs/`；生产发布还包含 `semantic.json`。JSON 的 `records.current` 是当前章节索引，`records.chapters` 保留历史章节；`search.json` 只含当前小节、固定问法、配置键、路径和别名，SQLite 的 FTS5 与它逐项核对。`semantic.json` 把有界片段的向量绑定到小节；manifest 固定模型 digest、维度、片段数、归一化方式及索引 hash。模型原件由本机 Ollama 保管，不进入 Git 或发布。语义文件或模型缺失时词法查询仍可返回，并标明 `semantic_unavailable`。

SQLite 还对章节、小节、问题、来源引用和软件版本映射建索引，并开启外键。生成 Markdown 与 JSON 同源，来源摘录作为惰性文本展示。发布先在 staging 中验证 hash、JSON、SQLite 和页面；`--stage` 保留旧当前指针，验收后 `ahw publish` 原子切换。新映射可以引用相同章节版本并复用相同 Markdown 字节。

新格式 fixture 发布使用隔离的 `var/chapter-release-fixture/releases/`。旧格式 release 无新格式读取兼容承诺；公共查询、MCP 与站点使用章节发布。fixture 发布不能视为五个真实产品的内容验收。
