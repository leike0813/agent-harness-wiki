# 数据模型

当前事实源是 Git 中的 YAML 记录，Zod 契约位于 `src/domain/schema.ts`，JSON Schema 由 `pnpm schema:export` 生成到 `schemas/`。`loadAndValidateDataset` 位于 `src/validation/dataset.ts`，只在校验成功时返回类型化数据集。编译器据此生成固定的 JSON、SQLite 与 Markdown 发布物。

## 已实现记录

<!-- prettier-ignore -->
| 记录 | 主键 | 作用 |
|---|---|---|
| HarnessDefinition | `harness_id` | 名称、别名、应用表面与来源引用 |
| SourceDefinition | `source_id` | `fixture_file`、官方 Git 仓库、官方文档 URL 或 npm registry 包身份；可变来源本身不带固定内容 hash |
| Artifact | `artifact_id` | 与来源、harness 绑定的 Git checkout、归档文档、受管包或归档 npm 文件及内容身份 |
| SnapshotManifest | `snapshot_id` | fixture 精确 Target、源码 commit Target、精确 npm release Target，或版本适用性未知的文档快照 |
| Claim | `claim_id` | `fact_key`、主题、强类型断言、条件、支持状态及精确版本 |
| Evidence | `evidence_id` | Claim 与 Snapshot 引用、定位、摘录、立场和观察方式 |
| Assessment | `assessment_id` | 复核人、事实验证时间、状态、证据及理由 |
| CoverageRecord | `coverage_id` | 某完整 Target 与主题的调查覆盖状态，可引用固定来源快照 |

所有记录都有 `schema_version: 1` 与 `record_kind: fixture | production`，拒绝未知字段。`publishedKnowledgeSchema` 定义发布 JSON，manifest 记录构建器版本、输入摘要、产物 hash 和显式发布时间。`queryRequestSchema` 定义完整 Target scope、版本策略、主题、事实键及有限条件；`queryResultSchema` 定义能力查询的状态、已选 Target、覆盖及事实。

## Target、版本与条件

完整 Target 包括 harness、`surface`、distribution、OS、架构、执行方式及 `version_identity`。版本身份为 `release` 或 `commit`，只按精确值匹配。Claim 存 Target 的前六项和 `version_applicability: { kind: exact, versions: [一个版本] }`，不会把一个版本的结论外推到下个版本。Linux 与 Windows、CLI 与桌面、WSL 与 Windows native 分别记录。

源码快照的 distribution 是 `source-tree`，版本身份是完整 commit；它不证明发行包行为。npm Target 的 distribution 写作 `npm:<包名>:linux-x64-glibc`，版本身份是精确 release。`managed_package` Artifact 保存包名、版本、锁文件 integrity、安装位置及选定文件 SHA-256；增量调查可用 `archived_package_file` 保存归档 tarball 路径、registry integrity 与选定 tar 条目 hash，二者均须绑定同一 npm Snapshot 的精确版本。Git 候选文件可位于隔离的 `archive/<harness-id>/git/<commit>/checkout`，已固定源码仍位于 submodule。官方文档快照保留请求 URL、最终 URL、抓取时间、原始与提取 hash 和提取器身份。没有明确版本时写 `version_applicability: { kind: unknown }`，没有精确 Target，也不能作为已接受精确 Claim 的证据。

条件是有限的 `all_of` 列表，包含工作区信任、环境变量、功能开关、配置值、启动参数、profile 和扩展安装状态。配置路径由语义基准与片段组成，不展开为当前机器的真实路径。

## 状态、证据与覆盖

Claim 的 `support.availability` 为 `supported | unsupported | not_applicable`；`delivery` 独立区分 `native | bundled | external_extension | workaround`。没有 Claim 时可以由 Coverage 表达 `unknown`，不可把它改写为 unsupported。Coverage 为 `not_started | partial | complete | blocked`；调查未完成会产生警告，仍可保留数据。

Evidence 的立场为 `supports | refutes | qualifies`，观察基础为 `documented | source_inspected | runtime_observed`。Assessment 为 `draft | accepted | disputed | rejected`。已接受的实质性 Claim 必须有匹配 Target 的证据和复核；相反证据同时存在时需要 `disputed`，不得默认选第一条。`source_fetched_at` 与 `fact_verified_at` 是不同时间。

虚构数据位于 `tests/fixtures/datasets/basic/`，使用 `record_kind: fixture`；以 production profile 校验会拒绝。五个真实 CLI 各有一个精确 npm Target、七个主题的 Coverage，共 35 条带固定来源与具体调查说明。当前三条实质性 Claim 已经人工接受：Pi 的 Skills 用户路径与核心内置 MCP 边界、OMP 的原生用户 agent 发现路径；均未观察运行行为。文档原件保存在忽略的 `archive/`，受管包由独立 pnpm 包集管理，源码在固定 commit 的 submodule；普通校验与发布不读取这些原件，显式 `sources:audit` 才在本机检查。

`audits/<harness-id>/<audit-id>.yaml` 是独立于 `Dataset` 和 `KnowledgeRelease` 的 Git 审计资产。需要人工复核时，同目录的 `<audit-id>.md` 解释变化意义、知识影响和维护建议。`upstreamAuditSchema` 记录每次扫描的来源基线、观察身份、状态、时间、候选路径、变化文件、初步影响及待复核旧审计引用。`review_status: pending` 表示变化或阻塞仍待语义调查与人工复核；纯未变化记录为 `not_required`，但仍引用以前未完成的审计。人工标记 `reviewed` 时须写复核人和时间。审计本身不能证明某版本的能力，也不会进入发布投影。用 `pnpm sources:audit-log` 校验 YAML 结构、引用及报告文件的归属；报告内容仍由维护者语义复核。

## 发布投影

编译器只把有 `accepted` 或 `disputed` Assessment 的 Claim 放入查询数据，连同对应 Assessment 所引用的 Evidence。已校验的 Snapshot、Source 和 Artifact 元数据全部保留；原始来源内容不发布。`draft`、`rejected` 的断言不进入发布事实；Coverage 全部保留，以表达尚未调查或部分调查。JSON、SQLite 与生成页面使用同一投影。有争议 Claim 保留争议状态；SQLite 的 `review_status` 不根据其支持状态推断。新版构建器版本为 2，旧版无 Artifact 的版本 1 发布仍可校验和查询。

`releases/<release-id>/` 不可变，包含 `knowledge.json`、`knowledge.sqlite`、`docs/` 和 `manifest.json`。`releases/current.json` 只存当前 release ID。发布检验比较产物 hash、JSON 与数据库行、生成页面、SQLite 完整性和外键。发布目录可重建，不是事实真源。

QueryService 只读取一个经检验的发布物。精确版本不回退；`latest_verified` 从当前 scope/主题已接受的 Claim 选择一个版本，`latest_upstream` 从带完整 Target 的 Snapshot 选择一个已发现版本并给出 `source_fetched_at`。未注明版本的官方文档不参与版本发现。只有纯数字点分 release 可比较先后，其他多版本候选返回 ambiguous。条件缺失返回 ambiguous，完整覆盖而缺事实返回 unknown，未调查版本返回 not_verified；这些都不等于 unsupported。

五类查询的共享输入与输出契约位于 `src/query/schema.ts`，CLI 和 MCP 均调用 QueryService。MCP 的 `get_capability` 可返回完整或摘要事实；摘要保留支持状态、Target、条件、复核状态和证据引用。MCP 每个响应标识固定 release，证据摘录有长度和截断标记；分页 cursor 绑定 release 与规范化查询条件。文档站的 Harness、主题、证据与发布页由同一个发布投影生成；通用状态说明独立于事实源，fixture 页明确标记为虚构。

当前只使用精确版本和有限条件；真实 harness 有来源、覆盖及一条已接受能力事实，尚无本地 embedding 或调查 worker。上游检查仅在维护者显式调用时运行。
