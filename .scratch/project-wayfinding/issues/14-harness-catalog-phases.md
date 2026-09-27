Type: grilling
Status: resolved

## Question

如何把 harness catalog 的三期范围纳入现有 M0–M2 路线？第一期纳入 Codex CLI、Claude Code、OpenCode、Pi、OMP；第二期扩至 Orca 支持的 agent；第三期再扩至 OpenSpec 支持的工具。各期的名单边界、catalog 条目的完成标准，以及与真实知识调查和受管运行验收的关系是什么？

## Comments

- 用户确定第一期的完成标准：五个对象先建立身份、官方来源、精确 Target 与六类主题的覆盖状态；有证据时再写事实，允许保留 `unknown`。里程碑对应关系和第二、三期的名单边界待确认。
- 用户确定阶段关系：M1 的首批 catalog 扩为五个对象；Orca 和 OpenSpec 范围作为后续独立扩容波次，M2 保持手动增量维护职责。
- 用户确定第二、三期只收录相应官方具名名单中可独立运行的 CLI；不把 Orca 的“任何 CLI agent”开放承诺或 OpenSpec 的 IDE 专用、共享 `.agents` 目标计作新 harness。跨名单重叠对象只接入一次。
- 用户确定 M1 对首批五个对象都深入调查 Skills、MCP 和配置优先级；其余主题仍按 catalog 标准建立覆盖状态，有证据才写事实。
- 用户确定 M1 对首批五个可执行对象都尝试在独立环境启动；每个精确制品的可运行状态仍单独记录，只有实际启动成功才能标为可运行。
- 用户确定后两期沿用第一期的 catalog 完成标准。

## Answer

Harness catalog 分三期扩充，与既有 M0–M2 能力里程碑分开表达：

1. **第一期（M1）**：Codex CLI、Claude Code、OpenCode、Pi、OMP。五个对象分别核验官方身份与来源，固定精确 Target，建立六类核心主题及横切配置的覆盖记录。每个对象深入调查 Skills、MCP 与配置优先级；有证据和复核记录的事实才能进入正式知识，证据不足处保留 `unknown`、`partial` 或 `blocked`。M1 对五个精确可执行制品都尝试独立环境启动，至少一个启动成功；每个对象的运行状态独立于知识覆盖，未成功者记录具体原因，不称为可运行。
2. **第二期（独立扩容波次）**：纳入 Orca 官方具名支持名单中可独立运行的 CLI，扣除第一期已有对象。
3. **第三期（独立扩容波次）**：纳入 OpenSpec 官方支持工具名单中可独立运行的 CLI，扣除前两期已有对象。

后两期沿用第一期的 catalog 准入标准：产品身份、官方来源、精确 Target、六类主题和横切配置覆盖状态齐全；事实按证据补充，允许诚实的未知与阻塞。后续可执行目标仍按既有运行覆盖政策逐一验证或记录具体阻塞。M2 保持手动变化发现与复核流程的职责，扩容波次不重命名为 M2/M3，也不改变 M0 的虚构数据闭环。

每个扩容波次启动时固定 Orca 或 OpenSpec 官方清单的源码 revision 与核验日期，据此形成可复核的增量名单。Orca 的“任何 CLI agent”开放承诺不计入“全部”验收；OpenSpec 的 IDE 专用集成、共享 `.agents` 目标不作为独立 harness。兼有 CLI 与 IDE 形态的产品只以 CLI Target 进入这三期。两个名单都只提供收录线索，不能作为各产品 Skills/MCP 等能力事实的证据；Pi 与 OMP 分别建身份，产品关系不继承事实。

官方名单：[Orca Supported Agents](https://github.com/stablyai/orca/blob/main/README.md)、[OpenSpec Supported Tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)。具体增量名单在对应波次开始时按固定 revision 盘点，不在当前规划中冒称未来名单不会变化。
