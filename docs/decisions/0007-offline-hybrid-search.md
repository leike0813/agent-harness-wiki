# 0007 — 本地 Ollama 章节检索模型

状态：accepted  
日期：2026-09-29  
对应：PRD §6，OpenSpec `m1-offline-hybrid-search`

适用范围限于仓库本地完整发布与本地混合检索；在线分发只提供独立身份的纯词法检索，其身份、有限历史、倒排预算与页面边界见 [ADR 0009](0009-online-knowledge-distribution.md)。

当前发布的 35 篇章节提供 174 个小节。问题编号与问法来自 `docs/topic-questions.md`；索引只提取发布中选为当前版的小节、标题、正文、配置键与路径。历史版仍可用 `get_topic` 回读，但不参加搜索。

本机可用的离线 embedding 模型只有用户指定的 Ollama `qwen3-embedding:4b`；项目没有已安装的 Node embedding 推理包，改用包会增加依赖和模型副本。以对应主题过滤后，中文“怎样让代理调用外部工具？”与英文“How are task recipes surfaced?”在新发布的词法入口均返回零项，语义入口分别召回 MCP 与 Skills 小节；`mcpServers` 则是可测的精确配置键命中。本机模型对中文、英文和配置键输入均已返回 2560 维向量。`registry/search-model.json` 固定本机 Ollama manifest digest `df5bd2e3c74cd8d069d21dc038f1b359fcdc9458fce1c99bd43c9eb1518ff907`、GGUF blob digest `2b0cf8f17b4c723c27303015383c27ec4bf2d8314bb677d05e920dd70bb0f16b` 和 2560 维。量化格式为本机查询到的 Q4_K_M；模型上游采用 [Apache-2.0 许可](https://huggingface.co/Qwen/Qwen3-Embedding-4B)。推理使用 Node 原生 `fetch` 调用 [Ollama 本地 `/api/embed`](https://docs.ollama.com/api/embed)，请求设 `truncate: false`，没有安装新依赖或下载模型。

构建前从本地 `/api/tags` 和 `/api/show` 核对两个 digest。编译器把小节按段落切成最多 400 字符的片段，向量做 L2 归一化，并在不可变发布中记录模型身份、片段数和索引文件 hash。查询再次核对 digest；模型或语义索引不可用时返回 `semantic_unavailable` 并继续词法检索。精确问题编号、配置键和路径优先；相关性排序不改变章节来源或软件版本判断。

同一发布固定 174 个小节和 485 个片段的身份及向量。对首批 8 个片段重新推理时，部分向量坐标出现最大约 0.0041 的数值差异；发布以已固定的向量文件为查询依据，不承诺重新构建后的向量字节相同。两条固定中英问法各连续检索三次，返回的前 20 个小节顺序一致。

2026-09-30 的 catalog 与界面迁移没有改变小节标题或正文。完整重新推理在本机 CPU 上遇到请求超时，因此构建器复用 current 发布中已固定的向量：先校验旧发布完整性，要求模型锁完全相同、小节标题与正文完全相同、向量维度与归一化有效，再沿用对应片段。新增或改写内容重新推理。复用只读取已验证的发布，不修改其文件，也不改变新发布的来源、界面和版本判断。
