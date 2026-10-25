# 0012 — 每日观察与周度巡检

状态：accepted（部署状态见文末）
日期：2026-10-25
对应：PRD `3、`7、`9、`10，OpenSpec `reduce-monitor-cost`

## 背景

来源变化通常不需要每天由模型判断，但错过一次观察会让知识维护延迟数周。原巡检把每日观察、triage、派发和交付塞进同一次 LLM 会话，工作日也为没有调查价值的版本变化付出模型成本，并且临时路径与短期队列无法跨轮可靠保留。

本决定把“今天看到了什么”和“本周实际处理什么”拆开：每日由脚本观察并保存队列，周日才领取有限产品进入现有维护与 PR 交付流程。

## 调度与两阶段执行

同一 Orca 自动化每天 02:00（`Asia/Shanghai`）运行 `precheck`。它只观察来源、保存逐日身份、维护队列和本地运行状态，不启动 LLM、不改 Git、不切换分支、不创建源码 checkout。它与维护会话共用同一把锁，避免并发改写台账。

只有周日 02:00 至 02:59:59 可以启动 Agent，且必须同时满足：fresh precheck 为 `launch: true`、周额度未满、队列有候选、交付工作树是干净的 linked worktree。每周最多调查 5 个产品；窄查与失败都占额度。

`precheck` 正常可启动退出 0，工作日、空队列或额度耗尽等普通跳过退出 2。周日有候选但专用 worktree 不是 linked 或 dirty 时，仍完成观察并落盘，返回 `status: delivery_blocked` 与说明性 `diagnostic`，不启动 Agent，退出 1。`start` 再次要求 clean，且只消费 60 分钟内的 precheck，不重新观察。

## 共享台账

真实 Git worktree 的台账与锁位于 `<git-common-dir>/agent-harness-wiki-monitor/session.sqlite`；独立 dataset 回退到 `<dataset-root>/var/harness-monitor/`。同步已结算审计时使用 `git worktree list`，并显式包含当前 root，避免当前主工作树的别名不在列表里而漏读历史。

台账保存：

- 每个来源的 `observed`（最新观察）、`processed`（最后一次已结算覆盖）和 `attempted`（本周期已领取尝试）；
- 每日观察、待处理时间、任务、周额度与活跃 session；
- 固定文档比较缓存、session 临时目录与报告路径。

普通 npm 版本前移自动记为无需知识调查，并推进该来源的 processed；它不产生版本映射或章节结论。其他每日观察不推进 processed。领取任务写入 attempted；完成或无影响结算才把 processed 推进到审计覆盖的身份。若非 npm 来源观察 A→B→C、实际处理到 C，则一次结算 A→C；结算后出现 D 才重新排队。`waiting_for_integration`、`blocked`、`failed` 保留 attempted，同一身份不自动重派，只有新身份或其他显式重开才进入后续任务。

未领取队列按首次待处理时间和 harness ID 排序，新变化保留原等待年龄，不能长期挤后。`status` 命令只读台账，输出队列、周预算和最近 20 个任务结果，不访问上游。

## 周度领取、评审与结算

`start` 在取得共享锁后返回原交接单、`tasks`、只含已领取产品的 `checksPath` 与 `documentDirectory`。协调者不得重新扫描，不得把未领取产品纳入本轮 triage。领取即占额度，进程崩溃不会把同一产品在同一周换给另一个 writer。

每个产品同周至多一个 writer；高影响变化仍按维护 Skill 的条件交给独立 reviewer。全部 worker/reviewer 确认停止后才集成。候选仍按产品隔离，共享 catalog 与章节选择由协调者合并，滚动 PR 与已有发布边界不变。

每个产品先写原项目 `audits/<harness-id>/<audit-id>.yaml`，再用 `record` 结算。`completed` 与 `reviewed_no_impact` 要求审计为 reviewed，或带 `reviewed_by`／`reviewed_at` 自检记录；`pending_question_ids` 为空，且来源 checks 不含 blocked。否则拒绝推进 processed。候选失败时先留下阻塞审计，再记 blocked/failed。每个领取任务都有结果后才能 `finish`；它只释放本轮临时目录和锁。

手动维护在最终审计集成后同样运行 `record`，省略 `task_id`。这条路径不启动 monitor session、不占自动 5 产品额度；ID 模式的受管二进制、local 与 PR 交付边界保持不变。

## 观察提示与历史状态

`sources:check` 保持纯只读：不写审计、缓存、包字节或 checkout，也不推进监控状态。候选字段为 `requires_triage`，只在当前观察存在 `changed` 时为真；它不直接创建任务。手动 ID 扫描读取 processed 基线，并写入 Git 审计；每日 precheck 读取 observed 身份并更新本地观察。

Git 只有 HEAD 变化时不生成章节 impacts。已知 changed path 仅映射到当前章节精确引用的文件；宽泛的 config／loader 文件名不扩成整题。协调者先读最小入口，再按证据确定问题范围。

历史 pending、unknown、缺失主题保持休眠。只有相关来源产生可执行证据入口，或维护者显式重开后，才恢复调查；无关变化和重复观察不重派。旧审计不能借新审计标 reviewed 被间接关闭，未完成工作继续可见。

已发布引用的定位和摘录按各自固定 snapshot 复核。上游后来移动行号、改用等价链接，或把人工观察入口迁到官方 `/docs/markdown`，都不改写旧 snapshot/reference，也不单独触发章节修订。

## 运行副本与部署

不把实现提交进专用工作树，也不覆盖其中已有审计。使用 `scripts/build-monitor.ts` 从当前工作树构建新目录：

```sh
pnpm -s tsx scripts/build-monitor.ts --out <new-runtime-dir> --dataset-root <original-worktree>
```

输出包含单文件 `monitor.mjs`、当前两个维护 Skill 与必要文档；原生 SQLite 来自已有锁定依赖，不新增安装。该文件没有 shebang，调用使用 `node <runtime-dir>/monitor.mjs`。构建不会修改调度或 worktree。部署前用 `node` 执行 runtime precheck，核对退出码、状态、blocked_sources、precheckPath、hash、Skill 副本与 stateDirectory；通过后才把调度命令换成该 runtime。

## 临时来源工作区与原件保留

Git 来源通过项目外临时 pinned checkout 读取，按原项目根与长期 owner PID 登记，使用精确提交、文件与内容 hash；任务结束并在复核完成后显式关闭。客户端不复用临时路径作为知识来源。

官方文档原件继续留在忽略 `archive/` 并长期保留；章节、来源元数据、审计与报告进入 Git。每轮只清理有匹配归属的临时 checkout、临时构建与备份，不删除已有归档、本地发布或归属不明内容。归档原件与二进制不属于监控清理范围。

## 离线来源审计的状态

离线来源审计对每条记录返回 `verified` 或 `not_retained`。只保留身份元数据的记录报 `not_retained`，它只说明按策略未保留原件，不是原件字节校验通过；应保留原件缺失或 hash 不符仍是错误并中止审计。普通查询与构建不依赖忽略原件。

## 后果

- 工作日不再启动模型；最多延迟数天发现需要语义调查的问题，但来源变化与队列不会丢失。
- 同一份台账跨真实 worktree 共享，崩溃、重复启动与未交付结果不会丢失额度或身份。
- 周度产量有硬上限，旧队列保留等待年龄，新变化不能无限挤占。
- 每个结算都有 Git 审计证据；未完成和失败保持可见，不被“本轮无任务”掩盖。
- 专用 tree 的未提交审计会阻塞周维护交付，日常脚本观察仍可运行；环境阻塞必须保持可见。

## 启用与当前状态

本机 Orca 自动化登记 ID 为 `93f32c61-1d0d-4da3-97ac-3861a74af596`，固定工作树为 `/home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor`。2026-10-25 已将同一自动化切换为每日 02:00 脚本预检并回读确认；仅周日满足条件时才启动维护 Agent。运行副本、调度备份与验收结果见 [自动化操作指南](../automations.md)。

专用工作树当前有上一轮遗留的未跟踪审计，本轮保持原样；周日有候选时预检返回 `delivery_blocked`。启用顺序：

1. 新命令、台账、runtime 构建与测试通过。
2. 构建 runtime，核对 hash、Skill、原生依赖、状态目录和 precheck 退出码。
3. 处理或明确登记未跟踪审计的归属；调度脚本不把它们当成本轮输出。
4. 将现有自动化预检切换为已验证 runtime，回读每日时间、纯脚本入口与既有模型配置。
5. 后续真实周维护结果另行记录；交付阻塞不影响日常观察，任何交付闸门失败都不推送并保留台账。
