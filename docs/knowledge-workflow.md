# 一条知识怎样从调查走到查询结果

这个项目收集 Codex CLI、Claude Code、OpenCode、Pi、OMP 等 agent harness 的配置与扩展知识。使用者最终通过 CLI、MCP 或文档站查询；维护者则在仓库里调查来源、复核具体结论、构建发布。中间有几道关，目的是让查询结果说清楚**适用于哪个版本和环境、证据是什么、还有什么没查明**。

## 先分清三件事

| 问题                   | 仓库用什么记录                         | 它回答什么                               |
| ---------------------- | -------------------------------------- | ---------------------------------------- |
| 这个主题查到哪里了？   | `coverage/` 中的 Coverage              | 查过哪些材料、发现了什么、还缺什么。     |
| 某个具体说法可信吗？   | `claims/`、`evidence/`、`assessments/` | 说法是什么、出处在哪里、维护者是否接受。 |
| 使用者现在能查到什么？ | 一个固定的 KnowledgeRelease            | 某次构建时已发布的事实和调查状态。       |

例如，“OMP 的 Custom agents 调查尚未结束”和“OMP 某版本的用户 agent 目录是 `~/.omp/agent/agents/*.md`”分别属于前两行。前一句描述调查进度；后一句是可以逐字审查的具体说法。两者可以同时成立。

## 从来源到发布

```text
登记官方来源 → 固定所查版本和材料 → 记录主题调查进度
                                     └→ 提出具体说法和证据 → 人工复核
                                                               ↓
                                                   校验、构建固定发布
                                                               ↓
                                                   CLI / MCP / 文档站查询
```

**1. 确定在查什么。**`registry/` 登记产品和官方来源，例如 npm 包、源码仓库、官方文档。来源地址可能变化，因此 `knowledge/<harness-id>/artifacts/` 和 `snapshots/` 还会记录固定安装包、源码 commit 或文档内容的身份。一个查询目标（Target）包括产品、CLI 等产品形态、分发方式、操作系统、架构、执行方式和精确版本。查过 Linux 上的 npm `18.3.4`，不能据此回答 Windows 或下一版本。源码 commit 也不能自动证明某个 npm 包的行为；没有标注适用版本的网页只能提供线索，不能单独证明精确安装包的能力。

**2. 记录调查进度。**每个 Target 的每个主题有一条 Coverage。首批五个产品各查七类主题：Skills、MCP、Custom agents、Custom providers、Hooks、原生插件、横切配置机制。Coverage 写明检查的固定材料、做过的核对，以及下一步所缺的证明。它不直接宣称“支持”或“不支持”。

**3. 提出能够单独审核的说法。**若材料足以支持某个具体结论，就写 Claim，例如“该版本从某个用户目录查找 Skills”。Claim 指明精确 Target、主题、条件、可用性（`supported`、`unsupported` 等）和交付方式（原生、外部扩展等）。Evidence 给出固定材料、文件行号或章节、短摘录，以及依据是文档、源码还是运行观察。Assessment 记录审核状态、审核人、时间和理由。没有足够证据时保留 Coverage 的缺口，不凭“没找到”写出 `unsupported`。

**4. 人工复核具体说法。**研究者先把 Assessment 留为 `draft`。维护者检查证据是否真的支持原话、版本和环境是否对得上、条件是否写全、有没有相反证据，以及“源码里有这段逻辑”是否被说成了“运行中已经成功”。审核后可以接受、要求修改、保留争议或拒绝，并在 Assessment 留下决定和理由。接受一条很窄的源码或文档结论，不一定要求先做运行实验；若要声称“实际加载、激活、健康”，就需要相应的观察。

**5. 校验并发布。**结构化 YAML 是仓库中的知识真源。校验器检查格式、记录之间的引用、Target、证据和审核关系。构建器把已接受或明确保留争议的 Claim 连同相应 Evidence、Assessment，及所有 Coverage，写入不可变的 `releases/<release-id>/`；`draft` 和 `rejected` Claim 不作为发布事实。构建出的 JSON、SQLite 和页面是同一份数据的不同呈现。CLI 与 MCP 只读选定的发布，不直接读取正在编辑的 YAML。修改或接受 YAML 后，使用者不会立刻看到变化：还要校验、构建新发布，并让查询进程选用它。

## `partial` 到底表示什么

Coverage 的状态只回答调查进度：

| 状态          | 人话解释                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| `not_started` | 对这个精确 Target 和主题还没有做有效调查。                                 |
| `partial`     | 查过一部分固定资料，也记下了发现；既定问题仍有具体缺口。                   |
| `complete`    | 既定调查范围和证据复核已做完；不等于“所有能力都支持”，也不保证有肯定结论。 |
| `blocked`     | 已明确遇到无法继续的来源或环境障碍，并记录了原因。                         |

`partial` 不是“功能只支持一半”，也不是可信度分数。例如，[OMP Custom agents 的 Coverage](../knowledge/omp/coverage/coverage-omp-custom-agents.yaml)写明：调查者看过 `18.3.4` 安装包中的目录发现和 agent 定义代码，但没有实际放入一个 agent 并观察其加载运行。因此这个主题仍是 `partial`。其中一条范围较窄的路径说法可以单独进入复核。

“可用性”又是另一回事：`supported` 需要对应证据；`unsupported` 也需要足够明确的反面证据。没有已接受 Claim 时，通常应回答未知或未验证，不能因为没有结果就说“不支持”。同理，`native` 和 `external_extension` 不能混为一谈。

查询结果还有自己的整体状态。它会同时给出符合精确 Target 的 Coverage 和已发布事实：有已接受事实、但主题仍在调查时，结果仍可标为 `partial`，同时列出那条事实；调查尚未开始且没有事实时，可能是 `not_verified`。版本或条件不匹配时，系统不会拿另一版本、另一平台的结论悄悄补上。

## 用两条真实记录看区别

**Pi：一条已接受的窄事实。**[Claim](../knowledge/pi/claims/claim-pi-user-skills-path.yaml)说，Linux x64 上的 Pi npm `0.73.1` 使用用户 Skills 目录 `~/.pi/agent/skills/`。[Evidence](../knowledge/pi/evidence/evidence-pi-user-skills-path.yaml)指向该版本包内 `docs/skills.md` 的具体行；[Assessment](../knowledge/pi/assessments/assessment-pi-user-skills-path.yaml)经人工复核为 `accepted`。它已经进入当前本地发布。但 [Pi Skills 的 Coverage](../knowledge/pi/coverage/coverage-pi-skills.yaml)仍是 `partial`：其他发现规则和运行行为还有缺口。实际查询会同时返回这条事实和整体 `partial` 状态。

**OMP：一条已接受的 agent 路径结论。**[Claim](../knowledge/omp/claims/claim-omp-user-agents-path.yaml)说，Linux x64 上的 OMP npm `18.3.4` 会从 `~/.omp/agent/agents/*.md` 发现用户级 OMP agent 定义。[Evidence](../knowledge/omp/evidence/evidence-omp-user-agents-path.yaml)与[发现调用证据](../knowledge/omp/evidence/evidence-omp-user-agents-discovery.yaml)引用该版本包中的源码；[Assessment](../knowledge/omp/assessments/assessment-omp-user-agents-path.yaml)已获维护者接受并进入当前发布。它只证明发现路径；若要声称 agent 实际加载或可用，仍需相应运行证据。

这也解释了目录差异：OMP 和 Pi 有具体 Claim，才有 `claims/`、`evidence/`、`assessments/`。Codex CLI、Claude Code、OpenCode 目前没有相应的能力 Claim，目录无需为了对齐而建空文件夹。各产品都有 `coverage/`；目录数量不是调查质量或产品能力的评分。

## 上游更新时怎么维护

维护者按需调用项目的 `harness-investigation` Skill，检查 registry 登记的 npm、Git 和官方文档来源。扫描会在根目录 `audits/<harness-id>/` 留下机器可校验的 YAML；需要人工判断时，同目录的 Markdown 报告解释变化意义、知识影响和建议。调查者再核对固定原件，按需更新 Coverage 或起草新的 Claim、Evidence、Assessment。

审计记录的 `reviewed` 只表示**这次上游变化已被处理**，不表示某个能力 Claim 自动变成 `accepted`。例如，[Codex CLI 增量审阅报告](../audits/codex-cli/audit-codex-cli-079462d0-b4be-4793-aa9a-ee283e0ac4fe.md)结清的是文档扫描地址和两处源码日志变化；它没有证明 Codex 的七类能力已经调查完成，也没有切换查询发布。

## 截至 2026-09-28 的项目状态

这一节是当时的进度快照；以后以工作区中的 YAML、审阅记录和 `releases/current.json` 为准。

- 工作区里五个产品各有七条首轮 Coverage，共 35 条，**全部为 `partial`**。维护者已接受其调查范围、发现与缺口；[五产品复核清单](../openspec/changes/archive/2026-09-28-m1-five-harness-knowledge/full-review.md)保留每项结果。接受调查进度不表示七类能力已获确认。
- 当前本地发布是 `five-harness-reviewed-20260928`。其中三条已接受事实分别是 Pi Skills 用户目录、Pi 核心内置 MCP client 的缺失、OMP 原生用户 agent 发现目录。另有七条 Codex 源码 commit 的 `source-tree` Coverage；全发布共 42 条 `partial`，与首轮 35 项分开计数。
- 首批五个精确制品的独立启动尝试和本地 embedding 混合检索仍未交付；**M1 整体验收尚未完成**。已归档的[五产品知识 change](../openspec/changes/archive/2026-09-28-m1-five-harness-knowledge/tasks.md)只完成调查、复核和发布范围。
- 一些调查文件仍在 Git 工作区，尚未提交。仓库中的 YAML 是设计上的事实真源；当前发布是本地生成的固定快照，不会因工作区文件变化而自行更新。

需要查字段定义时看[数据模型](data-model.md)；需要看维护与查询的边界时看[架构](architecture.md)；一期最终验收口径在[路线图](roadmap.md)和[PRD](PRD.md)。
