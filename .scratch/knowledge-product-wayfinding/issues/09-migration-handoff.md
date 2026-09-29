# 确定现有实现迁移与 OpenSpec 修订边界

Type: grilling
Status: resolved
Assignee: codex
Parent: [重新确定知识库交付与维护契约](../map.md)
Blocked by: [细化七类主题的调查问题与章节内容](04-topic-contract.md), [定义文档站的页面组织与阅读样例](05-site-presentation.md), [确定 MCP 工具参数与返回契约](06-mcp-contract.md), [定义上游变化到新知识发布的细则](07-update-workflow.md), [定义最新二进制与隔离环境的维护方式](08-binary-environment.md), [确定结构化知识的最小模型](10-knowledge-model.md), [确定搜索与本地 embedding 的定位](11-search-policy.md)

## Question

如何把现有 35 篇指南、Claim/Coverage/Assessment、调查 Skill、发布构建、CLI/MCP 与受管制品迁移到新产品契约？哪些旧规格和未完成的 `m1-reader-guides` 任务应替换或撤回，如何划分可验收的 OpenSpec change 并保留历史 release？

## Context

[“定义上游变化到新知识发布的细则”](07-update-workflow.md)已确定 Agent 在一次手动更新中可自行完成调查、按需独立复核、校验并切换本地发布。现有 PRD 与项目调查 Skill 的人工复核门禁及“只交付候选、不发布”规则须在迁移时替换；审计 YAML 和有变化时的可读报告仍保留。

[“定义最新二进制与隔离环境的维护方式”](08-binary-environment.md)要求元数据检查之后才在忽略的 staging 位置取得候选包，核验并在 Linux `bwrap` 中做离线启动检查，成功后切换当前受管版本；Claude Code 和 OpenCode 需绕过 `--ignore-scripts` 留下的占位主命令，直接运行已锁定的平台依赖入口。现有 `sources:scan` 下载候选 tarball、共享包集原地更新和缺少可复用启动入口的实现边界须调整。

[“确定结构化知识的最小模型”](10-knowledge-model.md)已确定以不可变主题章节 Markdown、问题索引、独立来源引用及软件版本映射替换旧 Claim/Coverage/Assessment 真源；需据此调整现有 schema、构建器、发布索引及指南迁移。

[“确定搜索与本地 embedding 的定位”](11-search-policy.md)保留 M1 离线混合检索为必交付项，但检索对象改为当前最新章节的小节与有界语义片段；需替换 Claim FTS 和指南字符串搜索，并保留模型不可用时的显式词法降级。

## 调查记录与待确认建议

- `m1-reader-guides` 当前 1.1、1.2、2.1–2.3、3.2 已勾选，3.1 内容验收与 4.1 总验收未完成；其 proposal、design 和六份 delta spec 仍依赖精确 Target、Coverage 与已接受 Claim。35 篇现有指南和发布 `five-harness-guides-20260928-r6` 是可复用的调查材料，不能直接算作新章节的 53 个问题已回答。
- 主 OpenSpec 的 `knowledge-records`、`dataset-validation`、`knowledge-release`、`knowledge-query`、`query-cli`、`mcp-query`、`knowledge-site`、`five-harness-investigation`、`manual-investigation-skill`、`upstream-incremental-audit` 仍写旧真源、人工接受门禁或旧五工具；`source-provenance` 的固定来源身份应复用。归档 change 和旧 release 保持历史身份，新的主规格需逐项替换冲突要求。
- 现有 `verifyRelease` 只解析 schema version 1 的发布 JSON、SQLite 与 Claim FTS；`QueryService.open` 读取 Claim、Coverage、Assessment，指南经 Coverage 取得 Target。新章节格式不能仅增加可选 `guides` 字段，须有新的发布格式与清楚的旧格式读取边界。
- 迁移素材按来源处理：现有 Source、Artifact、Snapshot 继续提供固定身份；旧 Evidence、3 条已接受 Claim 与 42 条 Coverage 可帮助确定来源和缺口；35 篇指南可作为正文草稿。新章节要逐题填写状态、小节与引用，并核对来源范围和软件版本映射；旧结论不因转换自动升级为适用于最新版本。
- 用户选择继续改写原 `m1-reader-guides`，保留其工作区改动与 35 篇正文作为迁移起点；旧勾选任务需按新契约重新核对，旧 delta spec 不能直接同步为主规格。分项建议为：章节模型与发布；由改写后的 `m1-reader-guides` 承担 35 篇章节及阅读接口；离线混合检索；受管二进制；手动增量更新。先修订 PRD、路线与相应主规格，再按依赖实施。受管二进制与知识发布独立，更新流程依赖新章节发布链。
- 用户确认无须向后兼容旧格式 release；旧结果即使无法通过新查询入口读取、甚至删除，也不影响新契约验收。迁移不写双格式校验、旧查询适配器或旧指南到新章节的动态投影；历史文件可留作参考，但新实现只读取新格式。切换当前发布时仍须确保新发布完整可用。
- 用户确认上述五项划分，并指定继续改写原 `m1-reader-guides`，而非另建替代 change。

## Resolution comment

按五项可验收的 OpenSpec change 迁移；先更新 PRD、实施路线和受影响的主规格，再实施。已归档的旧 change 保留其历史含义，不回写或重新归档。

1. 新建章节模型与发布 change：定义产品 × 主题的不可变章节版本、53 个固定问题的逐题状态、稳定小节 ID、固定来源引用、软件版本映射，以及当前与历史章节索引；修改领域 schema、校验、构建与发布完整性检查。用 fixture 验证新格式可离线构建、引用和版本边界正确、失败不切换当前发布。本项不以旧 Claim/Coverage/Assessment 为新真源，也不提前切换生产发布。
2. **改写现有 `m1-reader-guides`** 的 proposal、design、delta specs 和 tasks，让它承担 35 篇真实主题章节、站点、CLI、共享 QueryService 与新五工具 MCP。旧任务勾选逐项重新核对；旧精确 Target 指南的 `coverage_ref`/`claim_refs` 和旧工具结果不算新验收。现有 35 篇正文作为调查草稿，旧 Source/Artifact/Snapshot、Evidence、3 条已接受 Claim、42 条 Coverage 作为可追溯线索；逐产品、逐主题补齐固定问题状态、正文小节、来源引用及有证据的软件版本映射，内容需真正解释机制、操作、条件、未知与冲突。只有新发布通过校验，站点与真实 MCP 调用均读到相同章节后，才切换当前生产发布。
3. 新建离线混合检索 change：在当前发布的最新章节小节上建立精确、全文与本地 embedding 检索，语义片段归并小节；CLI/MCP 共用查询语义。以真实中英问题验证离线语义召回能补词法漏检、准确返回正文片段与来源范围；缺模型的显式词法降级不算 M1 完成。
4. 新建受管二进制 change：登记五个 npm 产品的 `latest` 候选、精确包集与直接可执行入口，在 Linux `bwrap` 离线完成最小启动检查后才切换受管环境。失败保留旧可用版本与审计记录；此项独立于知识发布和前三项的查询事实。
5. 新建手动增量更新 change：改写来源扫描、审计记录及 `.agents/skills/harness-investigation/`，按新章节问题与小节定位影响；Agent 校验、自检并按需由第二 Agent 复核后发布已完成知识，同次更新尝试独立刷新受管二进制。旧的逐条 Assessment 与人工接受门禁、只交候选不切换发布的规则撤回；阻塞保留旧发布和审计。

受影响的主规格至少包括 `knowledge-records`、`dataset-validation`、`knowledge-release`、`knowledge-query`、`query-cli`、`mcp-query`、`knowledge-site`、`five-harness-investigation`、`manual-investigation-skill` 和 `upstream-incremental-audit`；固定来源身份复用 `source-provenance`，只修改与新引用/映射冲突的条款。PRD、`docs/roadmap.md`、`docs/openspec-implementation-roadmap.md`、`docs/data-model.md`、`docs/architecture.md`、`docs/knowledge-workflow.md`、`docs/development.md`、README 与项目 `AGENTS.md` 中仍写旧真源、五工具或人工门禁的段落应随对应 change 对齐。测试仅验证稳定的发布、版本/来源边界、内容读取、真实 MCP 协议、搜索召回和受管启动行为；不以任务勾选、字段齐全或构建成功代替章节内容验收。

旧格式 release 不承担兼容义务；可留作本地历史材料，但新校验器和查询入口无需读取它们，也不把它们投影成新章节。**新发布内**仍须索引可查询的历史章节版本，供 `get_topic` 的精确、前缀和最近早期版本选择；这与旧格式 release 兼容是两件事。迁移时不删除现有未提交工作或旧 release；以后清理本地产物不影响新契约。
