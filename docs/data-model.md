# 数据模型

当前事实源是 Git 中的 YAML 记录，Zod 契约位于 `src/domain/schema.ts`，JSON Schema 由 `pnpm schema:export` 生成到 `schemas/`。`loadAndValidateDataset` 位于 `src/validation/dataset.ts`，只在校验成功时返回类型化数据集。JSON、SQLite、Markdown 发布物属于后续 M0 change。

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

所有记录都有 `schema_version: 1` 与 `record_kind: fixture | production`，拒绝未知字段。当前另外定义了发布 manifest 和最小查询请求/结果的 schema，供后续 change 使用；尚无发布器或 QueryService。

## Target、版本与条件

完整 Target 包括 harness、`surface`、distribution、OS、架构、执行方式及 `version_identity`。版本身份为 `release` 或 `commit`，只按精确值匹配。Claim 存 Target 的前六项和 `version_applicability: { kind: exact, versions: [一个版本] }`，不会把一个版本的结论外推到下个版本。Linux 与 Windows、CLI 与桌面、WSL 与 Windows native 分别记录。

条件是有限的 `all_of` 列表，包含工作区信任、环境变量、功能开关、配置值、启动参数、profile 和扩展安装状态。配置路径由语义基准与片段组成，不展开为当前机器的真实路径。

## 状态、证据与覆盖

Claim 的 `support.availability` 为 `supported | unsupported | not_applicable`；`delivery` 独立区分 `native | bundled | external_extension | workaround`。没有 Claim 时可以由 Coverage 表达 `unknown`，不可把它改写为 unsupported。Coverage 为 `not_started | partial | complete | blocked`；调查未完成会产生警告，仍可保留数据。

Evidence 的立场为 `supports | refutes | qualifies`，观察基础为 `documented | source_inspected | runtime_observed`。Assessment 为 `draft | accepted | disputed | rejected`。已接受的实质性 Claim 必须有匹配 Target 的证据和复核；相反证据同时存在时需要 `disputed`，不得默认选第一条。`source_fetched_at` 与 `fact_verified_at` 是不同时间。

虚构数据位于 `tests/fixtures/datasets/basic/`，使用 `record_kind: fixture`；以 production profile 校验会拒绝。正式知识将放在根目录 `registry/` 与 `knowledge/`，当前还没有真实产品记录。
