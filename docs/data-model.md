# 数据模型

当前事实源是 Git 中的 YAML 记录，Zod 契约位于 `src/domain/schema.ts`，JSON Schema 由 `pnpm schema:export` 生成到 `schemas/`。`loadAndValidateDataset` 位于 `src/validation/dataset.ts`，只在校验成功时返回类型化数据集。编译器据此生成固定的 JSON、SQLite 与 Markdown 发布物。

## 已实现记录

| 记录 | 主键 | 作用 |
|---|---|---|
| HarnessDefinition | `harness_id` | 名称、别名、应用表面与来源引用 |
| SourceDefinition | `source_id` | 数据集内来源文件及其实际 SHA-256；当前只支持 `fixture_file` |
| SnapshotManifest | `snapshot_id` | 捕获时间、来源及完整 Target |
| Claim | `claim_id` | `fact_key`、主题、强类型断言、条件、支持状态及精确版本 |
| Evidence | `evidence_id` | Claim 与 Snapshot 引用、定位、摘录、立场和观察方式 |
| Assessment | `assessment_id` | 复核人、事实验证时间、状态、证据及理由 |
| CoverageRecord | `coverage_id` | 某完整 Target 与主题的调查覆盖状态 |

所有记录都有 `schema_version: 1` 与 `record_kind: fixture | production`，拒绝未知字段。`publishedKnowledgeSchema` 定义发布 JSON，manifest 记录构建器版本、输入摘要、产物 hash 和显式发布时间。`queryRequestSchema` 定义完整 Target scope、版本策略、主题、事实键及有限条件；`queryResultSchema` 定义能力查询的状态、已选 Target、覆盖及事实。

## Target、版本与条件

完整 Target 包括 harness、`surface`、distribution、OS、架构、执行方式及 `version_identity`。版本身份为 `release` 或 `commit`，只按精确值匹配。Claim 存 Target 的前六项和 `version_applicability: { kind: exact, versions: [一个版本] }`，不会把一个版本的结论外推到下个版本。Linux 与 Windows、CLI 与桌面、WSL 与 Windows native 分别记录。

条件是有限的 `all_of` 列表，包含工作区信任、环境变量、功能开关、配置值、启动参数、profile 和扩展安装状态。配置路径由语义基准与片段组成，不展开为当前机器的真实路径。

## 状态、证据与覆盖

Claim 的 `support.availability` 为 `supported | unsupported | not_applicable`；`delivery` 独立区分 `native | bundled | external_extension | workaround`。没有 Claim 时可以由 Coverage 表达 `unknown`，不可把它改写为 unsupported。Coverage 为 `not_started | partial | complete | blocked`；调查未完成会产生警告，仍可保留数据。

Evidence 的立场为 `supports | refutes | qualifies`，观察基础为 `documented | source_inspected | runtime_observed`。Assessment 为 `draft | accepted | disputed | rejected`。已接受的实质性 Claim 必须有匹配 Target 的证据和复核；相反证据同时存在时需要 `disputed`，不得默认选第一条。`source_fetched_at` 与 `fact_verified_at` 是不同时间。

虚构数据位于 `tests/fixtures/datasets/basic/`，使用 `record_kind: fixture`；以 production profile 校验会拒绝。正式知识将放在根目录 `registry/` 与 `knowledge/`，当前还没有真实产品记录。

## 发布投影

编译器只把有 `accepted` 或 `disputed` Assessment 的 Claim 放入查询数据，连同对应 Assessment 所引用的 Evidence。已校验的 Snapshot 和 Source 元数据全部保留，以表达发现了但尚未验证的版本；原始来源内容不发布。`draft`、`rejected` 的断言不进入发布事实；Coverage 全部保留，以表达尚未调查或部分调查。JSON、SQLite 与生成页面使用同一投影。有争议 Claim 保留争议状态；SQLite 的 `review_status` 不根据其支持状态推断。

`releases/<release-id>/` 不可变，包含 `knowledge.json`、`knowledge.sqlite`、`docs/` 和 `manifest.json`。`releases/current.json` 只存当前 release ID。发布检验比较产物 hash、JSON 与数据库行、生成页面、SQLite 完整性和外键。发布目录可重建，不是事实真源。

QueryService 只读取一个经检验的发布物。精确版本不回退；`latest_verified` 从当前 scope/主题已接受的 Claim 选择一个版本，`latest_upstream` 从 Snapshot 选择一个已发现版本并给出 `source_fetched_at`。只有纯数字点分 release 可比较先后，其他多版本候选返回 ambiguous。条件缺失返回 ambiguous，完整覆盖而缺事实返回 unknown，未调查版本返回 not_verified；这些都不等于 unsupported。
