# OpenSpec 实施路线

[PRD](PRD.md) 定义目标产品语义，[项目路线](roadmap.md)定义阶段；以下 change 提供可逐项验收的增量。旧 M0 和已归档 M1/M2 change 留作实施历史，其 Claim/Coverage、人审门禁与旧 MCP 语义不约束新契约。

## 六个 change

| 顺序 | Change | 主要改动与完成门槛 |
|---|---|---|
| 1 | [m1-chapter-model-release](../openspec/changes/m1-chapter-model-release/proposal.md) | 新章节、问题/小节/来源引用、发行版映射及当前/历史索引；fixture 新格式可校验、重复构建，失败不切换当前发布 |
| 2 | [m1-reader-guides](../openspec/changes/m1-reader-guides/proposal.md) | **改写现有未完成 change**；35 篇真实章节、产品 × 主题 Wiki 页、CLI 与新五工具 MCP；逐题内容和真实 stdio/站点验收后切换生产当前发布 |
| 3 | [m1-offline-hybrid-search](../openspec/changes/m1-offline-hybrid-search/proposal.md) | 当前章节小节的精确/全文/本地 embedding 检索；固定模型离线补词法漏检，缺模型降级不算 M1 完成 |
| 4 | [m1-managed-artifact-startup](../openspec/changes/m1-managed-artifact-startup/proposal.md) | 官方 latest 候选、锁定包集、直接入口、Linux bwrap 最小启动；失败保留旧可用环境，独立于知识发布 |
| 5 | [m2-chapter-updates](../openspec/changes/m2-chapter-updates/proposal.md) | 手动来源观察、逐题/小节影响定位、Agent 复核及完成内容的自动本地发布；审计记录阻塞和无变化 |
| 6 | [new-harness-onboarding](../openspec/changes/new-harness-onboarding/proposal.md) | 新 CLI 七章知识接入、上游维护 Skill 的受管二进制核对、模型调用的受管二进制 Skill；发布器只发布知识，非 npm 报告不支持 |

1 → 2 → 3 是知识链；4 与知识链独立，M1 总验收在 1–4 均完成后。5 依赖章节读取/发布与受管环境入口，6 依赖章节读取/发布与受管环境入口并可与 5 并行。六项规划可以同时存在，实施应依赖已归档主规格逐项推进；后续 change 的同名 delta 以其前置 change 同步后的主规格为基线核对。没有新生产 release 与验收记录，不把规划工件标成已实施。

## 执行与验收

每项依次完成 proposal、specs、design、tasks，实施后运行最小相关测试、真实用户可见入口及 openspec validate --strict。归档前检查 delta 与当时主规格的一致性；在后续 change 起草时已预见的主规格变更若导致场景重叠，应在该 change 实施前按已归档规格调整 delta。旧格式 release 可作为本地调查材料，新接口不需要读取。现有未提交代码与 35 篇正文在实施中逐项迁移，不通过清理旧发布来伪造完成状态。

PRD、项目 AGENTS.md、README、架构/数据模型/开发/知识工作流文档随对应 change 更新到真实实现。测试重点是章节来源、版本选择、发布原子性、真实 MCP、离线搜索及隔离启动边界；不以字段数、任务框或页面构建成功代替内容验收。
