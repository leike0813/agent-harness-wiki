Label: wayfinder:map

## Destination

形成覆盖当前 agent-harness-wiki 项目的分阶段实施规格：从虚构数据的 M0 可运行闭环，到 M1 真实知识与隔离运行能力、M2 手动增量维护，并为 harness catalog 的后续扩容划定边界。规格明确各阶段的依赖、边界和验收，供后续实施与 PRD 修订使用。

## Notes

- 本地图只做规划。以 [PRD](../../docs/PRD.md) 定义的产品语义和 [AGENTS.md](../../AGENTS.md) 的工程边界为基线；当前仓库仍只有 M0 占位文件。
- **M0 已有可实施顺序**：工具链 → 虚构 Registry/Claim/Evidence/Assessment/Coverage → 校验及可重复 JSON/SQLite/Markdown 构建 → QueryService → CLI/MCP → 文档站 → 完整离线验收。按 PRD 和 AGENTS.md 执行，无需把明确的实施项伪装成待决问题。
- **M1 重点**：首批五个真实 CLI 的来源、目标与覆盖接入，证据复核、本地固定知识快照与离线混合检索；五个目标均尝试独立环境启动。具体知识问题需要运行观察时，再设计对应实验。
- **M2 重点**：手动发起的变化发现、影响分析和项目级调查 Skill；由现有 agent 产出候选记录。
- **Catalog 后续扩容**：Orca、OpenSpec 的官方具名名单中可独立运行的 CLI 依次作为第二、三期，均按固定清单版本与同一收录标准接入；与 M2 的维护流程分开。
- 已确认的实施路线见 [docs/roadmap.md](../../docs/roadmap.md)；PRD 和 AGENTS.md 已对齐，各阶段功能尚未实施。
- 知识库是主体；二进制运行是辅助调查能力。运行观察只适用于精确 Target 与条件；研究侧可执行和查询侧只读始终分开。
- 每次处理议题时使用 `grilling` 与 `domain-modeling`，必要时查阅官方资料；遵循项目文件修改边界。

## Decisions so far

- [确定真实二进制运行进入哪个里程碑](issues/01-runtime-milestone.md)：M1 引入真实制品的隔离运行能力，行为探针按需触发。
- [确定 M1 首批真实目标](issues/02-m1-first-targets.md)：原定 Codex CLI、OMP、Claude Code；当前平台运行、六类主题建覆盖，首批范围由后续 catalog 决策扩为五个。
- [确定 M1 证据与发布流程](issues/03-m1-evidence-release.md)：公开 Git 跟踪源码 submodule 与适合公开的衍生知识；原始包、二进制及完整日志留在本地持久归档，查询使用固定本地快照。
- [确定 M2 上游变化与复核策略](issues/04-m2-change-policy.md)：手动检查源码、文档与新版本；变化只生成复核候选，跨 Target 复用需新 Assessment。
- [确定项目级调查 Skill](issues/05-m2-research-runner.md)：用户调用现有 agent，项目 Skill 产出结构化候选与证据缺口；不建设自动模型 worker。
- [定义独立环境的最低隔离承诺](issues/07-isolation-promise.md)：M1 优先采用已通过最小启动检查的本机进程沙箱；若强隔离必须依赖容器，允许明确标识的环境变量隔离降级。
- [确定真实二进制探针权限](issues/08-probe-authority.md)：用户或受托调查 agent 手动触发；仅准入身份固定的官方发布或官方源码自建制品，扩权逐次授权，结论仍人工复核。
- [确定可执行制品归档与运行绑定](issues/09-executable-artifact.md)：原始包与可执行目录持久留在本地，运行绑定精确 Artifact 与依赖；正式证据引用的制品持续保留，未引用物人工清理。
- [确定可执行目标的运行覆盖政策](issues/11-runtime-coverage-policy.md)：逐目标记录可运行或阻塞；M1 首批均尝试、至少一个真实启动成功，未验证目标不得称为可运行。
- [整合 M0–M2 项目实施路线](issues/12-roadmap-handoff.md)：交付 [项目实施路线](../../docs/roadmap.md)，明确阶段、依赖、验收、文件计划和 PRD 修订点。
- [界定 harness catalog 的分期与完成标准](issues/14-harness-catalog-phases.md)：M1 首批扩为五个 CLI 并深查三项、逐一尝试启动；后两期按 Orca、OpenSpec 的具名 CLI 清单增量扩容，沿用同一 catalog 收录标准。
- [确定源码、制品与知识的仓库路径](issues/15-storage-layout.md)：官方源码置于 `upstream/` submodule，持久原件置于独立 `archive/`，真实知识按 harness 组织；`var/` 留给临时状态，发布文档从知识生成。
- [确定 MCP 查询机制与本地混合检索](issues/16-mcp-query-and-search.md)：stdio 进程固定 release，只暴露五个只读工具；M0 用词法检索，M1 验收本地 embedding 补充语义召回，索引与发布绑定。

## Not yet specified

- 首批本地原始制品出现后，细化未提交 artifact 的备份、恢复与保留期限。
- 隔离承诺与首批平台确定后，核验可用运行后端及其实际隔离能力。
- M2 的维护成本明确后，细化手动全量复核的时机和任务容量。

## Out of scope

- 在本地图中实施 M0–M2、执行真实二进制或发布知识；本地图的终点是可交付的实施规格。
- 通用 agent harness、自动修改用户配置、查询侧任意命令执行与无审核自动发布。
- 对全部 harness、版本和平台作完整覆盖承诺。
- [通用探针配方与执行证据框架](issues/10-probe-evidence.md)：当前只需可运行制品与现有证据语义；具体实验随真实知识问题设计。
- [M3 跨平台运行验证](issues/13-m3-platform-validation.md)：用户要求当前平台即可；跨平台运行验证不属于本次项目规划。
- [远程只读 MCP 部署](issues/06-m3-remote-query.md)：用户只需当前机器查询；保留本地 CLI、文档和 MCP stdio。
