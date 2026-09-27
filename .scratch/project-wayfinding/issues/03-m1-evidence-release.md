Type: grilling
Status: resolved

## Question

M1 的真实来源、源码与发布包快照、Evidence、Assessment 和覆盖记录应如何进入 Git 知识真源并经人工审核发布？原始制品与第三方材料哪些能公开，哪些只保存引用或受限归档？

## Comments

- 用户希望上游源码仓库由 Git submodule 固定 revision，其他衍生资料直接保存在本项目仓库内。
- 用户说明项目主要自用，不需要对外发布。仍需区分对外公开与供本地 CLI/MCP 一致查询的固定知识快照。
- 当前 GitHub 仓库为 PUBLIC；`AGENTS.md` 禁止提交下载的原始包和二进制。若衍生资料包含这类制品，需明确仓库可见性和提交范围，并在最终规格中同步修改约束。
- 用户确认仓库保持公开，项目主要自用，不需要围绕对外发布设计额外流程。

## Answer

- 用 Git submodule 在本仓库固定上游源码仓库的精确 commit。submodule 引用记录版本身份；需要取回该源码时仍依赖对应上游对象可访问。
- `registry/`、`knowledge/` 中的结构化事实、Evidence、Assessment、Coverage、来源定位、hash，以及自行编写的调查记录和适合公开的短摘录，由本仓库 Git 跟踪。可公开且确有必要的小型文档快照也可入仓库。
- 下载的原始包与二进制、未脱敏的完整日志留在仓库工作目录内的持久本地 artifact 区域，不提交到公开 Git；Git 中保留其来源、精确版本、hash 和本地归档引用。该区域不作为可随意清理的临时缓存。备份与恢复策略在实际出现首批制品后再细化。
- 候选事实经结构校验和人工语义复核，接受或争议状态写入 Assessment。自用阶段可通过本地 Git diff 复核，无需把 GitHub PR 或对外发布当作每次更新的门槛。
- CLI、MCP 与文档仍从同一固定的本地 KnowledgeRelease 构建产物读取；这里的“发布”指切换可查询知识快照，不意味着向外部服务或 npm 发布。
