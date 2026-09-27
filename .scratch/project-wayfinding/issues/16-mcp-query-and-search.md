Type: grilling
Status: resolved

## Question

本项目的只读 MCP 如何绑定本地 KnowledgeRelease、调用共享 QueryService、处理发布切换与分页，并具体暴露哪些 tools、resources 或 prompts？五个既定查询工具是否足够；检索何时仅用精确匹配、别名和 SQLite FTS5，何种可观测问题才值得引入 embedding，以及模型与索引如何保持离线、发布绑定和证据边界？

## Comments

- 用户确定首版只暴露既定五个只读工具，不增加 Resources 或 Prompts。
- 用户确定本地 MCP stdio 进程启动时固定一个已校验的 KnowledgeRelease；切换 release 时重启进程。
- 用户要求现在规划本地 embedding；不采用云端 embedding。具体进入哪个里程碑、如何结合结构化筛选和词法检索仍需定案。
- 用户确定本地 embedding 是 M1 必须验收的能力；M0 保持既定的精确匹配、别名与 FTS5 fixture 闭环。
- 用户确定 embedding 在 `search_knowledge` 中只补充语义候选召回，与别名、精确匹配和 FTS5 合并；Target、版本、平台、条件仍是硬过滤，语义得分不代表事实可信度。

## Answer

### MCP 进程与工具

- M0 使用官方 TypeScript SDK 实现本地 stdio。启动时用显式 release ID，或只解析一次本地当前发布指针；验证 manifest 与索引后以只读方式打开一个 KnowledgeRelease，并让同一 QueryService 服务 CLI 与 MCP。进程不监听发布切换；切换到新 release 时重启。MCP 工具输入不含 `knowledge_release`，不接受任意文件路径或 SQL；CLI 查询可在启动时选择 release。
- 工具列表固定为 `list_harnesses`、`get_capability`、`compare_capabilities`、`search_knowledge`、`get_evidence`，不随 harness 增长；首版不暴露 Resources 或 Prompts。`get_evidence` 只读发布中可展示的证据与短摘录，不读取 `archive/` 原件。
- 五个工具各有严格输入与输出 schema。MCP adapter 只把参数交给 QueryService 并转换结果；返回 `structuredContent` 和同内容的简短文本。每个响应标识固定 release；事实类结果保留适用的 Target、业务状态、条件/覆盖、证据引用及必要警告。`unknown`、`not_verified`、`ambiguous`、`conflict` 属正常业务结果；非法输入或索引故障用明确技术错误。
- 标注只读提示，但实际由只读索引、无写入 handler 和无来源访问保证。stdout 只承载协议，诊断写 stderr。列表、搜索与比较设置输入数量、摘录和响应大小上限；分页 cursor 绑定 release、规范化查询参数及排序版本，参数或发布不匹配时拒绝，不静默续查其他 release。

### 检索与本地 embedding

- M0 只实现产品/主题别名、结构化过滤、配置键与路径精确匹配、SQLite FTS5；保持虚构 fixture 的离线闭环。M1 把本地 embedding 纳入验收，在首批五个真实 harness 的已发布知识上构建索引，并让 `search_knowledge` 使用混合检索。embedding 的目标是补充自然语言召回，不预设它能降低查询延迟。
- 构建器只对通过发布校验的 Claim 搜索文本及必要说明生成向量。原始上游文档、未审核候选、完整日志和本地归档不进入查询索引。查询先按 release、Target、版本、平台与明确条件筛选，再合并精确、FTS5 和语义候选，按稳定规则去重与排序；精确键仍优先。条件缺失时保留条件化或 ambiguous 结果，不当成无条件事实。语义相似度只决定候选相关性，不生成事实、不推断支持状态，也不提升证据等级。
- 本地模型及推理所需文件保存在被 Git 忽略的 `archive/models/<model-id>/`，单独获取、固定 revision/hash 与许可；不在构建或查询时自动下载。M1 用真实中英双语及配置术语查询选定能在项目 Node 运行时离线执行的模型和库，锁定版本。官方 [Transformers.js 本地模型设置](https://huggingface.co/docs/transformers.js/custom_usage)说明可指定本地模型与 WASM 路径并关闭远程模型加载；具体模型不在缺少真实语料时臆定。
- 向量作为可重建发布索引放入同一 `knowledge.sqlite`，manifest 记录模型/分词器身份、向量维度、规范化规则、输入与索引 hash。保留旧 release 时持续保留其精确模型与推理文件，查询启动时核对身份和 hash。M1 可以对经硬过滤后的少量向量做精确相似度扫描；记录语料量、冷启动、查询延迟、召回表现与索引体积。只有实际规模或延迟说明有必要时再评估 SQLite 向量扩展；不引入独立向量数据库。更换模型必须重建索引，不混用向量空间。
- 模型或索引缺失/不匹配时，其他四个工具与词法搜索仍可用；搜索明确标记语义检索不可用，不把降级伪装成完整混合结果。M1 验收必须在模型和索引齐全的离线环境中实际调用 `search_knowledge`，验证语义候选能补足代表性词法漏检，且版本、平台、条件、证据、发布和分页边界不被突破。CLI 与 MCP 走同一 QueryService。

截至 2026-09-27，官方 [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) 的 v2 为稳定发布线，支持输入/输出 schema 与结构化结果；实际实施时仍需核验、锁定具体版本并用真实 stdio 客户端测试。[SQLite FTS5](https://www.sqlite.org/fts5.html)提供全文索引和 BM25 排序，短词与配置键继续走精确路径。`readOnlyHint` 只是客户端可见的提示，不代替实现中的只读边界。
