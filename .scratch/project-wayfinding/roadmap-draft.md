# agent-harness-wiki 实施路线草案

本草案以 `docs/PRD.md` 的知识语义和 `AGENTS.md` 的 M0 工程要求为基线。当前仓库只有工具链和文档占位；这里规划工作，不实施功能，也不把虚构数据视为真实知识。

## 产品主线

Git 跟踪结构化知识、证据、复核与覆盖记录。离线构建器将同一批已审核输入转为固定 KnowledgeRelease；文档、CLI 和只读 MCP 通过共享 QueryService 查询该 release。查询不联网、不调用模型、不执行 harness。研究侧可以获取来源并手动调查，但不能直接改变已发布事实。

六类主题为 Skills、MCP、自定义 agents、自定义 providers、Hooks、原生插件；横切配置机制单独建模。所有结论绑定 Target 的版本、分发、平台与条件；`unknown`、`unsupported`、`partial`、`disputed` 与 `not_verified` 保持不同语义。

## 阶段与验收

| 阶段 | 核心交付 | 完成时必须能验证 |
|---|---|---|
| M0 可运行初始化 | TypeScript/pnpm 工作区；两个明显虚构 harness 与六类强类型 fixture；Schema、引用与发布校验；可重复的 JSON/SQLite/Markdown 构建；共享 QueryService；五类 CLI 查询与五个只读 MCP 工具；文档站 | `pnpm verify` 串起类型、lint、测试、构建与实际 MCP stdio 客户端 smoke；fixture 无法混入正式发布；同输入规范化产物一致；未验证版本不回退，条件/未知/冲突不被抹平。 |
| M1 真实知识 MVP | 核验 Codex CLI、OMP、Claude Code 的官方来源；为当前平台各选精确版本与分发身份；Git submodule 固定官方源码 commit，其他适合公开的结构化知识和调查材料入 Git；原始包、二进制与完整日志在本地持久归档；人工复核后生成固定本地 release | 三个对象均有六类主题与横切配置的覆盖记录，先深入 Skills、MCP、配置优先级；事实可追到 Evidence 和 Assessment；文档/CLI/MCP 读取同一 release；受管真实制品至少完成一次独立环境启动 smoke，记录精确 Artifact 与环境；每个被称为“可运行”的目标都有实际启动记录。 |
| M2 手动增量维护 | 用户手动发起源码 commit、官方文档、新版本检查；差异映射到待复核主题和 Claim；`.agents/skills/` 内的项目调查 Skill 供用户调用现有 agent 生成候选 Claim/Evidence/Coverage 与证据缺口；人工复核并重建固定 release | 源码和文档变化各有一次可检查的发现与影响清单；扫描不移动 submodule 指针或改动已接受事实；新版本保持未验证直到新 Assessment；未变化内容的复用留下复核记录；调查失败保留候选与阻塞原因；旧 release 可继续查询。 |

依赖顺序：M0 的事实模型与发布/查询链路先成形；M1 接入真实来源、制品与人工复核，不在各入口重建查询语义；M2 基于 M1 的 Evidence 定位与 SourceDefinition 做变化发现，不建立自动调用模型的 worker。

## M1 二进制能力的边界

二进制是辅助调查的真实可执行制品，不是展示性附件。官方发布制品与从固定官方源码构建的制品分别记录身份、版本、平台、hash、入口和运行依赖。原始包及可执行目录在仓库内的本地持久 artifact 区域，不进入公开 Git，也不覆盖系统安装。

当前 Linux 机器优先用已通过最小启动检查的 `bwrap` 做隔离：临时 HOME/配置与工作目录、只读制品、默认无外网、受控子进程及资源边界。真实 harness 上的隔离承诺仍需 M1 实测。若强隔离最终只能靠容器实现，允许明确标为较弱的环境变量隔离，不宣称它能阻止宿主文件或网络访问。

建议的运行覆盖政策：M1 对首批三个可执行目标都尝试建立可运行环境；能否运行作为独立状态记录，不与知识调查覆盖混用。M1 至少有一个精确制品完成真实启动验收；其余目标若受客观条件阻塞，保留具体原因，不宣称已经可运行。后续接入的可执行目标同样逐个达到可运行或明确阻塞。查询和文档构建永远不触发执行。

行为实验只在某项知识问题确需运行观察时设计。一般事实可由官方文档或与目标可靠绑定的源码支持；启动 smoke 本身不证明 Skills、MCP 等具体能力。

## 拟修改的文件与目录

| 阶段 | 文件或目录 | 变化 |
|---|---|---|
| M0 | `package.json`、`pnpm-workspace.yaml`、`pnpm-lock.yaml`、`tsconfig.json`、Node 版本文件、`site/` | 固定可安装的 TS/ESM 工具链与两个工作区。 |
| M0 | `src/domain/`、`src/validation/`、`schemas/`、`tests/fixtures/datasets/` | 建立实际使用的模型、fixture 与校验。 |
| M0 | `src/compiler/`、`src/query/`、`src/cli/`、`src/mcp/`、`tests/` | 实现离线发布、共享查询、CLI/MCP 和必要的行为验收。 |
| M0 | `README.md`、`docs/architecture.md`、`docs/data-model.md`、`docs/development.md`、`docs/decisions/` | 用实际命令、模型和验证结果替换占位说明。 |
| M1 | `registry/`、`knowledge/`、上游源码 submodule、`.gitmodules` | 固定真实 Target/来源及证据、复核、覆盖。 |
| M1 | `src/sources/`、受管制品与本地运行入口、`.gitignore`、本地 artifact 区域 | 接入并隔离运行精确制品；只在 Git 中保留可公开元数据。具体文件在实现时按最小边界创建。 |
| M2 | 变化检查入口、`knowledge/`、`.agents/skills/<项目调查 Skill>/SKILL.md`、`.gitignore` | 手动发现变化与影响，项目 Skill 产生候选；只豁免该 Skill 子目录。 |
| 路线确认后 | `docs/PRD.md`、`AGENTS.md`、`README.md` | 对齐新的阶段、验收和工程边界；在实际实现中保持文档与代码一致。 |

## PRD 修订清单

- §4、§21：明确 M0–M2；M1 纳入受管制品可运行，首批目标为三个；移除原 M3 的跨平台运行与远程 MCP 验收。M1 的本地 diff 人工复核可替代强制 PR。
- §9、§10、§16、§17、§20：将自动 ResearchRunner、worker、定时轮询、任务租约/预算/重试队列改为手动来源扫描、用户调用现有 agent 的项目 Skill 和可审阅候选。只描述实际会实现的命令与目录。
- §11、§18、§19：保留运行隔离、证据与安全底线；具体行为实验按需，不提前建设通用探针体系。补充持久本地 artifact 与 Git submodule 策略。
- §12–§15：保留不可变本地 release、统一查询、五个只读 MCP 工具和搜索边界；本项目不规划远程查询部署。
- §23 与 README：移走已定事项，记录真正未决事项和当前阶段；README 不再声称路线包含独立 M3。

## 范围外与实施后再细化

跨平台运行验证、远程 MCP、自动模型 worker、通用探针框架、自动发布及全部版本覆盖不进入当前路线。首批原始制品出现后确定备份/恢复细则；具体行为实验、手动全量复核频率和真实运行后端的细节由实际需要推动。
