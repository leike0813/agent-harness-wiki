# 架构

```text
Git：Catalog（产品与界面）/ Harness / Source / Artifact / Snapshot + 章节 Markdown / 来源引用 / 版本映射 / 当前选择
  → 领域 schema 与跨记录校验
  → 单一规范化章节投影
  → knowledge.json + knowledge.sqlite + search.json + semantic.jsonl + docs/ + manifest.json
  → staging 完整性验证 → 不可变 release → 当前指针
```

产品与界面身份模型在 `src/domain/catalog.ts`；registry 只登记产品 id 与来源引用，名称、别名和界面的唯一事实源是 `catalog/harnesses.yaml`。新章节模型在 `src/domain/chapter.ts`，输入校验在 `src/validation/chapters.ts`，离线编译和校验在 `src/compiler/chapter-release.ts`。来源与原件身份沿用现有 Harness、Source、Artifact、Snapshot。固定问题以 `docs/topic-questions.md` 为准；每章记录自己的问题状态、小节和引用。软件版本映射独立于固定来源章节，精确包版本必须有同包快照与逐小节证据。当前章节选择独立于章节文件，所以历史章节不可变，映射变化也无需重写章节。

JSON、SQLite 和生成页面从同一规范化数据集生成。发布验证检查产物清单及 SHA-256、数据库完整性和外键、JSON/SQLite 行、Markdown 内容；SQLite 采用无必需 WAL 边文件的封闭文件。当前小节进入 FTS5 与精确索引，段落向量由固定 digest 的本机 Ollama 模型离线生成；历史章节不进入搜索。归档文档与 npm 原件留在 Git 忽略目录，查询发布只保留元数据和可展示短摘录。查询不访问上游网络、不执行来源或 harness，也不调用生成式 LLM；语义搜索只连接本机 Ollama。

`src/query`、CLI、MCP 和 VitePress 读取同一新格式章节发布；查询服务在打开时验证 manifest、JSON、SQLite 和生成文档。发布内嵌 catalog，所以 `--scope catalog` 的列表、候选产品和 catalog 来源引用无需构建树即可读取。fixture 在隔离根目录构建。旧发布格式不属于新读取契约。软件版本解析只依据发布中的显式映射；固定源码或网页不会自动代表安装包版本。

## 在线投影

在线发布与本地发布是两条独立能力线。本地线保留完整章节历史、`knowledge.json`、`knowledge.sqlite`、生成 Markdown 和本机语义索引，按 [ADR 0007](decisions/0007-offline-hybrid-search.md) 验收混合检索。在线线只交付静态 `data/v1/` 资源与同发布页面：每个产品 × 主题保留当前章与最近一个历史版，其余章节退为裁剪标记，检索只有词法入口。两条线共用一个已校验的结构化真源和领域 schema，但产物契约、身份和验证器分别成立；本地 JSON／SQLite／semantic 的整库契约不用于在线发布。

在线构建的输入是干净 checkout 里的 catalog、registry、结构化知识、固定问题与锁定工具，加指定 Git commit 的完整 first-parent 历史。它不依赖本地 `releases/`、`archive/` 原件、SQLite 或语义模型，不访问上游、不执行 harness、不读用户配置，生产输出拒绝 fixture。构建先用与本地相同的章节校验核对完整真源，再按 [ADR 0009](decisions/0009-online-knowledge-distribution.md) 选择在线历史：当前版取 `registry/chapter-current.yaml` 的显式选择，最近历史版按各 edition 在该 commit first-parent 树中首次进入的先后排序，同次引入按稳定 edition ID 打破平局；Git 历史只提供排序，只有需要区分多个非 current 版本时缺少历史才失败，正文、来源与映射仍来自完整输入。在线身份为 `web-v1-<完整 SHA>`，协议分区为 `data/v1/`。

在线编译先写 staging，再对全部投影关系做完整验证：引用、章节选择、软件映射、目录覆盖、来源摘要、搜索导航、页面链接与 fixture 隔离都要与已验证输入一致，页面与数据必须标识同一 release。公开 `manifest.json` 保持精简，只描述读取入口；构建侧 `integrity.json` 单独保存输入摘要、工具身份及全部数据与页面的文件 inventory 和 SHA-256，排除自身，不要求客户端预下载。验证通过后才接受候选输出，失败保留既有 accepted 输出与指针。部署目录容量按解包后的全部普通文件字节计，含静态资源与保留的旧协议资源，上限 768 MiB。消费者只校验实际读取的资源结构与绑定身份，不重跑整库验证。

## 消费者在线查询

公开消费者包与本地维护者读取共享同一套产品、界面、选版与章节答案语义，但依赖闭包不同。纯逻辑位于共享领域模块，在线闭环另加：

- `src/domain/consumer.ts`：消费者结果元数据（`release_id`、`knowledge_published_at`、`access_mode`、在线历史范围）与结构化技术错误 schema；依据见 [ADR 0010](decisions/0010-online-consumer.md)。
- `src/query/chapter-query.ts`：本地与在线共用的产品解析、选版、界面答案投影与比较纯逻辑，导入不触及 SQLite、Ollama、MCP 或网络。
- `src/query/online-client.ts`：`OnlineClient.open()` 在一个操作上下文中确认 `current`、校验清单与产品目录并固定发布，提供有界读取、取消、每进程并发上限与协作期限。
- `src/query/online-error.ts`：`OnlineError` 与统一序列化；codes 固定，CLI JSON 与 MCP `isError` 共用。
- `src/consumer/index.ts`：消费者 CLI 与 MCP 入口，编译进消费者包 `dist/consumer/index.js`；本地 `src/cli` 与 `src/mcp` 入口保持独立。

在线客户端复用 `src/query/lexical.ts` 的 `queryOnlineSearch` 做词法读取，不引入 better-sqlite3 或 Ollama。缓存分内存与文件两层，文件层按规范化入口、协议、发布与相对路径原子安装并重校验。CLI 与 MCP 只做参数解析、协议转换和错误适配，不重新实现选版或支持状态。

## 公开发布

`src/publication/` 属于维护侧：`state.ts` 定义台账与保留政策，`github.ts` 用 CAS 持久化到独立 `publication-state` 分支并保存不可变 Release，`archive.ts` 验证归档，`operations.ts` 执行准备、部署意图、结案与核对。`assembleOnlineDeployment` 从目标归档取得页面，只并入受保护发布的数据，重新核对完整性与 768 MiB 容量；原归档保持不变。

`readback.ts` 用真实在线查询服务与有界 HTTP 核对公开数据和页面，部署成功与验证成功分别记录。`program.ts` 管理独立 npm 候选，`consumer-verification.ts` 从公开 registry 安装精确包后验收 CLI／SDK stdio。两个生产工作流共用串行并发组；消费者运行时不导入发布模块。状态与恢复规则见 [ADR 0011](decisions/0011-public-publication.md)。
