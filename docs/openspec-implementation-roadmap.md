# OpenSpec 实施路线

本路线把 [PRD](PRD.md)和[项目实施路线](roadmap.md)中已确定的决策转成一组可逐项实施的 OpenSpec change。当前只有工具链占位和 `openspec/config.yaml`，尚无活动 change 或已落地的产品 spec。本文件是实施顺序，不代表这些 change 已创建或功能已完成。

## 使用方式

- 每个 change 遵循当前 `spec-driven` 流程：`proposal → specs → design → tasks`。`proposal` 说明边界与依赖；`specs` 写稳定、可观察的行为及反例；`design` 只记录确有取舍的实现决策；`tasks` 写按依赖排序的文件改动与验证命令。
- 按下表顺序逐个创建并实施 change。先验证、归档前一个 change，再让后一个 change 依赖其主 spec。M1 的知识调查与运行验收分别记录，最终以同一 M1 验收门槛收束。
- 领域规则写入 OpenSpec spec，避免按 `src/` 目录逐个复制需求。PRD 保留产品目标，OpenSpec 记录已选择的增量行为，代码和测试验证它。每个 change 的验收只标记实际运行过的检查。
- 已有 wayfinder 地图完成了规划决策；这里不再为已确定的实施项创建决策票。具体依赖版本、模型和真实 Target 要在对应 change 实施时核验并固定。

## M0：虚构数据的可运行闭环

| 顺序与 change 名 | 范围及主要文件 | 可独立验收的结果 |
|---|---|---|
| 1. `m0-domain-and-fixtures` | 固定 Node/pnpm/TS/测试工具链；在 `src/domain/`、`src/validation/`、`schemas/` 和 `tests/fixtures/datasets/` 建立精确 Target、强类型 Claim、Evidence、Assessment、Coverage、有限条件与两个明显虚构 harness；调整 `package.json`、锁文件和 Node 版本文件。 | 可安装、类型检查；schema 可导出；合法 fixture 通过校验，缺引用、重复 ID、条件错误及 fixture 混入正式数据被拒绝。 |
| 2. `m0-reproducible-release` | 在 `src/compiler/` 实现离线读取、发布校验和 staging 发布；生成 `knowledge.json`、`knowledge.sqlite`、`docs/`、`manifest.json`；加入发布完整性检查。 | 同输入生成相同规范化 JSON/Markdown 与 SQLite 逻辑内容；失败不替换旧发布；查询文件不依赖 WAL；无临时路径或秘密 canary。 |
| 3. `m0-query-and-cli` | 在 `src/query/` 实现固定 release 的五类查询、精确版本/条件/覆盖/冲突解析、别名与 FTS5；在 `src/cli/` 接入 `validate`、`compile`、五类 `query` 子命令。 | CLI 从真实 fixture release 查询；未验证版本不回退；`unknown`、`partial`、`ambiguous`、`conflict` 和 `external_extension` 保持原意；分页与发布绑定。 |
| 4. `m0-mcp-site-and-verification` | 在 `src/mcp/` 接入五个只读 stdio 工具；`site/` 只呈现发布中生成的事实页；补齐 `README.md`、`docs/architecture.md`、`docs/data-model.md`、`docs/development.md` 和 `pnpm verify`。 | SDK 客户端真实连接并调用全部五个工具，非法输入受 schema 拦截；文档站可构建；`pnpm verify` 覆盖类型、lint、测试、构建与 MCP smoke。 |

依赖链为 **1 → 2 → 3 → 4**。第一项先确认 MCP SDK 的最小 stdio 客户端/服务端连接可行，第四项再完成五工具协议验收。四项完成并通过 [M0 验收](PRD.md#211-m0-验收)后，才称 M0 完成。M0 不接入真实 harness、模型或自动调查。

## M1：真实知识、受管运行与离线混合检索

| 顺序与 change 名 | 依赖及主要文件 | 可独立验收的结果 |
|---|---|---|
| 5. `m1-source-and-artifact-boundary` | 依赖 M0；扩充 `src/domain/`、`src/validation/`、`src/sources/`，建立真实 Source、Snapshot、Artifact 身份与归档引用；按需建立 `registry/`、`knowledge/<harness-id>/`、`upstream/`，修正 `.gitignore` 中 `archive/` 与旧占位布局。 | 固定来源、hash、Target 和制品身份可追溯；本地原件与临时 `var/` 分离；未经审核的材料不能进入已接受发布。 |
| 6. `m1-five-harness-knowledge` | 依赖 5；接入 Codex CLI、Claude Code、OpenCode、Pi、OMP 的精确 Target、来源、六类主题与横切配置的覆盖记录；深入调查 Skills、MCP、配置优先级；扩充校验、发布及查询所需 schema。 | 每个对象有调查范围与结果或具体证据缺口；实质性接受结论有 Evidence/Assessment；人工复核后可构建正式 release；不把来源名单或未知状态当作能力证明。 |
| 7. `m1-managed-artifact-startup` | 依赖 5、6；建立研究侧受管运行入口及必要的运行记录，涉及 `src/sources/` 或独立运行模块、`archive/` 和测试。 | 五个精确制品各有启动尝试与成功或阻塞记录；至少一个真实启动成功；运行绑定 Artifact、hash、Target 与隔离模式；查询侧永不触发执行。 |
| 8. `m1-offline-hybrid-search` | 依赖 6；为已发布 Claim 选择并固定本地模型，在 `src/compiler/`、`src/query/` 和 SQLite 发布索引中加入向量候选，模型原件放 `archive/models/`。 | CLI/MCP 在离线环境中共用混合搜索，补足代表性词法漏检；Target/版本/条件仍硬过滤；缺模型时明确降级；旧 release 绑定其模型身份。 |

M1 的总验收在 **6、7、8 全部完成后**进行，并以 [PRD §21.3](PRD.md#213-m1-验收)为准。来源与知识结论、制品能否启动、搜索相关性分别记录；不能用其中一项的成功代替另一项。具体模型、SDK 和真实版本只在实施时依据官方来源和实际语料锁定，不在路线中猜测。

## M2：手动增量维护

| 顺序与 change 名 | 依赖及主要文件 | 可独立验收的结果 |
|---|---|---|
| 9. `m2-manual-source-scan` | 依赖 M1 的 Source/Evidence 定位；在 `src/sources/`、CLI 和测试中增加用户手动触发的源码、官方文档与新版本变化检查。 | 变化映射到待复核 Claim/主题；扫描不移动 submodule、不改已接受事实或当前 release；新版本保持未验证。 |
| 10. `m2-investigation-skill` | 依赖 9；只跟踪 `.agents/skills/` 中本项目专用调查 Skill，并为候选 Claim/Evidence/Coverage 提供现有 schema 校验入口。 | 用户调用现有 agent 得到可审阅候选、证据缺口或阻塞记录；候选不能自行变成 accepted 或切换 release。 |

M2 按 [PRD §21.4](PRD.md#214-m2-验收)验收。Orca 和 OpenSpec 具名 CLI 清单扩容是 **M1 后的两个独立 catalog change**，不并入 M2：每波开始时固定官方名单 revision、核验日期、扣除已收录对象，再依据同一 Target、证据和覆盖标准制定该波具体 tasks。

## 每个 change 的完成门槛

1. `openspec validate <change-name> --strict` 通过；spec 中的事实边界与 PRD 一致。
2. 按该 change 的 tasks 实施，并运行能验证其稳定行为的最小测试；失败、未运行和环境阻塞分别记录。
3. 检查 CLI、MCP、文档是否仍共享发布与 QueryService 语义；涉及它们的 change 必须实际调用对应入口。
4. 完成实现核对后，再同步/归档 delta spec；下一 change 以归档后的主 spec 和当前代码为基线。不得仅因任务框被勾选就宣称里程碑完成。

执行从 `m0-domain-and-fixtures` 开始；当前不预建后续 change 的空目录或未被真实调用的接口。
