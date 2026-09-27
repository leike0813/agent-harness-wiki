# agent-harness-wiki 实施路线

本路线按 `docs/PRD.md` 的产品契约和 `AGENTS.md` 的工程边界，列出 M0–M2 实施顺序及 harness catalog 扩容波次。M0 的虚构数据、发布、查询、MCP 与站点闭环已落地；后续阶段仍以真实知识与可复核证据为目标，不把虚构数据视为真实知识。

## 产品主线

Git 跟踪结构化知识、证据、复核与覆盖记录。离线构建器将同一批已审核输入转为固定 KnowledgeRelease；文档、CLI 和只读 MCP 通过共享 QueryService 查询该 release。查询不联网、不调用生成式模型、不执行 harness；M1 的知识搜索使用固定的本地 embedding 模型补充召回。研究侧可以获取来源并手动调查，但不能直接改变已发布事实。

六类主题为 Skills、MCP、自定义 agents、自定义 providers、Hooks、原生插件；横切配置机制单独建模。所有结论绑定 Target 的版本、分发、平台与条件；`unknown`、`unsupported`、`partial`、`disputed` 与 `not_verified` 保持不同语义。

## 阶段与验收

| 阶段 | 核心交付 | 完成时必须能验证 |
|---|---|---|
| M0 可运行初始化 | TypeScript/pnpm 工作区；两个明显虚构 harness 与六类强类型 fixture；Schema、引用与发布校验；可重复的 JSON/SQLite/Markdown 构建；共享 QueryService；五类 CLI 查询与五个只读 MCP 工具；文档站 | `pnpm verify` 串起类型、lint、测试、构建与实际 MCP stdio 客户端 smoke；fixture 无法混入正式发布；同输入规范化产物一致；未验证版本不回退，条件/未知/冲突不被抹平。 |
| M1 真实知识 MVP、catalog 第一期 | 核验 Codex CLI、Claude Code、OpenCode、Pi、OMP 的官方来源；为当前平台各选精确版本与分发身份；Git submodule 固定官方源码 commit，其他适合公开的结构化知识和调查材料入 Git；文档与完整日志在本地归档，npm 可执行包用独立 pnpm 包集只保留当前选定版本；人工复核后生成固定本地 release 与本地 embedding 索引 | 五个对象均有六类主题与横切配置的覆盖记录；全部 35 个 Target × 主题分别留下调查范围、固定来源、查证过程及结果或具体阻塞原因，并供人工复核；事实可追到 Evidence 和 Assessment，证据不足处保持未知；文档/CLI/MCP 读取同一 release，`search_knowledge` 的混合检索在离线环境通过语义召回与边界验证；五个精确制品均尝试独立环境启动，至少一个成功，每个被称为“可运行”的目标都有实际启动记录。 |
| M2 手动增量维护 | 用户以 registry harness ID 调用调查 Skill；按需检查登记的源码、文档和 npm 新版本，写 `audits/` 审计资产；差异映射到待复核主题和 Claim，生成候选与缺口；人工复核后另行发布 | 每次调用包括未变化均有审计记录；源码和文档变化各有可检查的发现与影响清单；扫描不移动 submodule 指针或改动已接受事实；新版本保持未验证直到新 Assessment；失败保留候选与阻塞原因。 |

依赖顺序：M0 的事实模型与发布/查询链路先成形；M1 接入真实来源、制品与人工复核，不在各入口重建查询语义；M2 基于 M1 的 Evidence 定位与 SourceDefinition 做变化发现，不建立自动调用模型的 worker。

## MCP 与检索机制

M0 的 MCP 只经 stdio 暴露 `list_harnesses`、`get_capability`、`compare_capabilities`、`search_knowledge`、`get_evidence` 五个只读工具；不增加 Resources 或 Prompts。启动时通过显式 ID 或本地当前发布指针选择一个已校验的 KnowledgeRelease，整个进程固定读取它；切换发布需重启。工具输入不包含 `knowledge_release`，CLI 查询可在启动时选择 release。所有 handler 调用共享 QueryService，输入和输出采用严格 schema，返回结构化结果及同内容的简短文本。只读提示供客户端参考，实际只读由索引访问和 handler 保证；`get_evidence` 不读取 `archive/`。

每个响应标识 release ID；事实类结果保留适用的 Target、业务状态、覆盖、条件与证据引用。正常的 `unknown`、`not_verified`、`ambiguous` 和 `conflict` 不当成协议故障。分页 cursor 绑定 release、筛选条件、查询和排序版本；不同发布或条件不能续页。参数、摘录、比较对象数和响应体均有上限，stdio 的 stdout 仅用于协议。M0 用别名、精确匹配和 SQLite FTS5 完成离线检索。

M1 在通过发布校验的 Claim 搜索文本与必要说明上建立本地 embedding，作为 `search_knowledge` 的语义候选来源；原始文档、未审核候选和完整日志不进入查询索引。QueryService 先处理 release、版本、平台、Target 与明确条件，再合并精确、FTS5 和语义候选，稳定去重与排序；条件缺失时保留条件化或 ambiguous 结果。语义分数只表示相关性，不改变支持状态或证据结论。模型与推理文件放在忽略的 `archive/models/<model-id>/`，独立获取、固定 revision/hash 与许可；查询和构建不得临时下载。向量写入同一 release 的 `knowledge.sqlite`，manifest 记录模型、规范化和索引身份。M1 用真实中英双语及配置术语查询选定能在 Node 中离线执行的模型，并测量语义召回、冷启动、延迟、索引体积；先对过滤后的少量向量精确扫描，出现实际规模或延迟问题时再评估 SQLite 向量扩展。

保留旧 release 时持续保留其精确模型与推理文件，启动时按 manifest 核对身份和 hash；模型或索引不可用时，词法查询仍工作并明确报告语义检索缺失。M1 验收必须另行证明完整混合路径可离线运行，补足代表性词法漏检，同时不突破版本、条件、证据、发布和分页边界。具体模型与依赖版本在有真实语料后核验并锁定。参考：[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)、[SQLite FTS5](https://www.sqlite.org/fts5.html)、[Transformers.js 本地模型设置](https://huggingface.co/docs/transformers.js/custom_usage)。

## Harness catalog 扩容波次

Catalog 收录与知识调查深度、制品可运行状态分别记录。各期对新增对象使用同一收录标准：核验产品身份和官方来源，固定精确 Target，为六类核心主题及横切配置建立覆盖记录；仅把有证据并经复核的事实写入正式知识，允许 `unknown`、`partial` 和 `blocked`。产品之间的派生或包装关系不自动继承事实。

| 波次 | 新增范围 | 与里程碑的关系 |
|---|---|---|
| 第一期 | Codex CLI、Claude Code、OpenCode、Pi、OMP，Pi 与 OMP 分别建身份 | 纳入 M1；五个对象均深查 Skills、MCP 和配置优先级，均尝试独立环境启动。 |
| 第二期 | [Orca 官方具名支持名单](https://github.com/stablyai/orca/blob/main/README.md)中可独立运行的 CLI，扣除第一期已有对象 | M1 之后的独立扩容波次。 |
| 第三期 | [OpenSpec 官方支持工具名单](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)中可独立运行的 CLI，扣除前两期已有对象 | 第二期之后的独立扩容波次。 |

每个扩容波次开始时固定对应官方名单的源码 revision 和核验日期，再形成该波次的具体增量清单。Orca 的“任何 CLI agent”开放承诺不构成无限收录义务；OpenSpec 的 IDE 专用集成与共享 `.agents` 目标不算独立 harness。兼有 CLI 与 IDE 形态的产品只收录 CLI Target。名单是收录线索，不能证明各产品的配置与扩展能力；后续可执行目标仍逐个记录实际启动成功或具体阻塞。M2 继续承担手动增量维护流程，不作为第二期的别名。

## 仓库内物件路径

以下是实施时采用的路径边界。M0 的虚构数据继续位于 `tests/fixtures/datasets/`；真实数据接入时才创建对应 harness 的目录。

| 路径 | 放置内容 | Git 状态 |
|---|---|---|
| `upstream/<harness-id>/` | 可取得的官方源码仓库，以 submodule 固定 commit；来源定义记录仓库身份与路径 | 跟踪 gitlink 和 `.gitmodules` |
| `registry/harnesses/<harness-id>.yaml`、`registry/sources/<source-id>.yaml` | 产品身份与官方来源定义 | 跟踪 |
| `knowledge/<harness-id>/{claims,evidence,snapshots,assessments,coverage}/` | 按产品审阅的结构化事实、证据、快照元数据、复核及覆盖；每条仍带全局唯一 ID 和明确 Target | 跟踪 |
| `audits/<harness-id>/<audit-id>.yaml` | 每次上游检查的基线、观察、影响、失败和人工待复核引用；独立于发布数据 | 跟踪 |
| `archive/<harness-id>/<artifact-id>/` | 原始文档、完整日志及需保留的提取全文 | 整个目录忽略，作为持久本地归档 |
| `archive/<harness-id>/{npm,git}/` | 新 npm tarball 与隔离 Git commit 候选；固定完整性与精确身份后供调查 | 忽略，不能直接发布 |
| `research/package-set/`、`archive/pnpm-store/` | 跟踪精确 npm 包清单与锁文件；专属 store 和安装目录忽略，只保留当前选定的可执行包 | 清单与锁文件跟踪，包字节忽略 |
| `archive/models/<model-id>/` | M1 离线 embedding 模型与推理文件，记录固定身份、hash 和许可 | 忽略，作为持久本地归档 |
| `docs/`、`site/` | 本项目手写说明，以及文档站配置与模板 | 跟踪手写内容 |
| `releases/<release-id>/` | 同一知识发布的 manifest、JSON、SQLite 和生成的 `docs/` | 忽略、不可变、可重建 |
| `var/` | 临时下载、运行工作目录与任务状态，不保存唯一原件 | 忽略、可清理 |

上游网页或文档的原件与需复核的完整提取文本默认留在 `archive/`；URL、抓取时间、原始及提取 hash、提取器版本与定位信息进入 `knowledge/<harness-id>/snapshots/`，经审核的短摘录进入 Evidence。确有必要且适合公开的小型文档快照可作为对应 snapshot 的附件进入同一 Git 目录。完整提取文本本身不成为已接受知识。`docs/` 保存本项目手写说明；确需编写的 harness 指南置于 `knowledge/<harness-id>/guides/` 并引用结构化事实。面向查询者的事实页面由结构化知识生成到 `releases/<release-id>/docs/`，文档站构建产物在 `site/.vitepress/dist/`。未取得官方源码仓库的产品不创建空 submodule；已有 submodule 的源码不默认重复归档。

`archive/` 中的文档原件与模型按各自规则保留；只有项目专属 pnpm store 在新包集验证后清理旧包。`var/` 留给临时状态。此布局与 PRD §6、§12、§18 一致。

## M1 二进制能力的边界

二进制是辅助调查的真实可执行制品。官方发布制品与从固定官方源码构建的制品分别记录身份、版本、平台、hash、入口和运行依赖。首批官方 npm 包由项目专属 pnpm 包集管理，安装脚本关闭；只保留当前选定版本的包字节，不进入公开 Git，也不覆盖系统安装。旧版本的已发布事实和来源元数据保留，旧原件需重新取得才能审计。

当前 Linux 机器优先用已通过最小启动检查的 `bwrap` 做隔离：临时 HOME/配置与工作目录、只读制品、默认无外网、受控子进程及资源边界。真实 harness 上的隔离承诺仍需 M1 实测。若强隔离最终只能靠容器实现，允许明确标为较弱的环境变量隔离，不宣称它能阻止宿主文件或网络访问。

运行覆盖政策：M1 对首批五个可执行目标都尝试建立可运行环境；能否运行作为独立状态记录，不与知识调查覆盖混用。M1 至少有一个精确制品完成真实启动验收；其余目标若受客观条件阻塞，保留具体原因，不宣称已经可运行。后续接入的可执行目标同样逐个达到可运行或明确阻塞。查询和文档构建永远不触发执行。

行为实验只在某项知识问题确需运行观察时设计。一般事实可由官方文档或与目标可靠绑定的源码支持；启动 smoke 本身不证明 Skills、MCP 等具体能力。

## 拟修改的文件与目录

| 阶段 | 文件或目录 | 变化 |
|---|---|---|
| M0 | `package.json`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`、`tsconfig.json`、Node 版本文件、`site/` | 固定可安装的 TS/ESM 工具链与两个工作区。 |
| M0 | `src/domain/`、`src/validation/`、`schemas/`、`tests/fixtures/datasets/` | 建立实际使用的模型、fixture 与校验。 |
| M0 | `src/compiler/`、`src/query/`、`src/cli/`、`src/mcp/`、`tests/` | 实现离线发布、共享查询、CLI/MCP 和必要的行为验收。 |
| M0 | `README.md`、`docs/architecture.md`、`docs/data-model.md`、`docs/development.md`、`docs/decisions/` | 用实际命令、模型和验证结果替换占位说明。 |
| M1 | `registry/harnesses/`、`registry/sources/`、`knowledge/<harness-id>/`、`upstream/<harness-id>/`、`.gitmodules` | 固定真实产品、来源、Target、证据、复核与覆盖；官方源码通过 submodule 固定。 |
| M1 | `src/sources/`、`research/package-set/`、受管制品与本地运行入口、`archive/`、`var/` | 接入并隔离运行精确制品；文档原件保留，当前受管 npm 包用独立 store 管理，运行临时状态另存。 |
| M1 | `src/query/`、`src/compiler/`、`archive/models/`、`releases/<release-id>/knowledge.sqlite` | 本地模型离线建索引和查询，混合检索仍走共享 QueryService；发布绑定索引与模型身份。 |
| M2 | `src/sources/scan.ts`、`audits/`、`knowledge/`、`.agents/skills/harness-investigation/SKILL.md` | 手动发现变化、维护 Git 审计资产和待审候选。 |
| 实施时 | `.gitignore`、旧 `knowledge/` 占位目录 | 忽略持久 `archive/`，只豁免本项目调查 Skill；按新布局迁移占位目录。 |

## 文档与实施交接

PRD 的阶段、目录、调查、发布、MCP、检索和验收条款，以及根目录 `AGENTS.md` 的相应工程边界，已按本路线对齐。进入实现时以 PRD 的产品契约和 `AGENTS.md` 的 M0 工程验收为准；若代码要求改变版本、证据或查询语义，先更新契约。

## 范围外与实施后再细化

跨平台运行验证、远程 MCP、自动模型 worker、通用探针框架、自动发布及全部版本覆盖不进入当前路线。首批原始制品出现后确定备份/恢复细则；具体行为实验、手动全量复核频率和真实运行后端的细节由实际需要推动。
