# 自动化

[harness-monitor](../.agents/skills/harness-monitor/SKILL.md) 使用两层节奏：每日由纯脚本观察来源，只有周日窗口按共享队列启动 Agent 调查。本文件记录调度、命令、台账、运行副本和启用边界；调度注册仍由维护者在 Orca 侧完成。

## 调度与每日观察

每日 02:00（`Asia/Shanghai`）运行一次 precheck。它观察登记来源、保存逐日身份、更新队列，并与维护会话共用同一把锁；不启动 LLM、不切换分支、不写 Git，也不创建源码 checkout。工作日正常观察后退出，不启动 Agent。

本机 Orca 自动化当前登记如下：

| 参数 | 当前值 |
| --- | --- |
| 工作树 | `/home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor` |
| 自动化 ID | `93f32c61-1d0d-4da3-97ac-3861a74af596` |
| 宿主 | `omp` |
| 当前调度 | 每日 02:00，`Asia/Shanghai` |
| daily precheck | 已于 2026-10-25 部署并回读确认 |
| 预检时限 | 调度 600 秒；来源观察 540 秒，逐产品保存结果 |
| 下一次运行 | 2026-10-26 02:00 |

调度预检与 Agent 提示已切换为共享目录下的独立运行副本，保留原工作树、模型参数、fresh-session 和 60 分钟宽限。预检非零退出时 Orca 只记录跳过，不启动 Agent。周日真实 LLM 维护尚未在本次变更中运行。

当前运行副本：`<git-common-dir>/agent-harness-wiki-monitor/runtimes/runtime-0326ad83-8550-4bbd-ab5e-0f1aa3b4b71f/`，入口为 `monitor.mjs`；入口 sha256 为 `3245301867ebb56700c1d8a7347707e9ac04dcc591bfb0cf296ea23a87f2bdac`。同目录的 `automation-before.json` 与 `automation-after.json` 保留调度切换证据。原生 SQLite 使用已有锁定安装，更新依赖后应重建运行副本。

本轮验证：194 个单元测试、55 个来源／巡检相关测试、10 个候选隔离测试和 1 个运行副本离线测试通过；55 项中含 9 个已计入单元测试的分支判定用例。类型、lint、格式、schema、编译、673 个生产章节、271 条 Git 审计与 OpenSpec strict 校验通过。修正资源布局后的纯脚本全量观察返回 exit 2、`observed`、`launch: false`，队列 10 个产品、22 个来源失败，没有领取任务或启动 worker；最终运行副本把截止缩为 540 秒，并通过离线回归和调度回读。

开发态命令：

```sh
pnpm -s monitor:run --root <original-worktree> precheck
```

部署后，调度调用构建出的绝对 runtime 路径：

```sh
node <runtime-dir>/monitor.mjs --root <original-worktree> --observation-urls <runtime-dir>/observation-urls.json precheck
```

两种调用的 stdout 都是 JSON：

```json
{
  "checked_at": "<ISO 时间>",
  "week": "YYYY-MM-DD",
  "due": false,
  "used": 0,
  "remaining": 5,
  "queued": 12,
  "blocked_sources": 0,
  "products": [],
  "launch": false,
  "status": "observed",
  "diagnostic": null,
  "precheckPath": "<本地路径>"
}
```

`status` 为 `ready`、`observed`、`empty`、`budget_exhausted` 或 `delivery_blocked`。`blocked_sources` 统计本次未能观察的来源，但不阻止其他来源与产品继续入队。可启动结果退出 0；工作日、空队列、额度耗尽等普通跳过退出 2；技术失败退出 1。周日有候选但专用工作树不是 linked worktree 或有未提交内容时，仍完成并保留观察，但不启动 LLM：结果为 `delivery_blocked`，`diagnostic` 说明原因，退出 1。

precheck 在共享锁内运行；已有维护会话持锁时不会并发改写台账。调度必须先检查 exit code 与 `launch`，两者都满足才启动 Agent，不能只凭 stdout 文本或旧的 precheck 文件。

## 周度领取与结算

只有周日 02:00 至 02:59:59（含 60 分钟宽限）可以启动 Agent。外部调度在启动前运行 precheck；Agent 随后执行：

```sh
pnpm -s monitor:run --root <original-worktree> start --owner-pid "$PPID"
```

`start` 不重新观察，只接受 60 分钟内、`launch: true` 的 precheck 和共享队列；仍要求专用 linked worktree、干净工作区与滚动分支前置。取得锁后返回交接单，原字段之外还包含：

- `tasks`：`task_id`、`session_id`、`harness_id`、`week`、`created_at`、冻结审计、结果字段；
- `checksPath`：只包含这些已领取产品的观察；
- `documentDirectory`：跨日保留的固定文档比较缓存。

领取即写入本周任务并占用额度，崩溃不会换一个产品重派。每周最多 5 个任务；窄查、失败和阻塞都算一次，同一产品同周至多一个 writer。协调者只 triage `tasks` 中的产品，不读取未领取队列，也不运行 `sources:scan` 或重新访问上游。

每个任务先写原项目 `audits/<harness-id>/<audit-id>.yaml`，再提交结果文件：

```json
{
  "task_id": "<自动任务 UUID>",
  "harness_id": "<product-id>",
  "audit_id": "audit-<product>-<uuid>",
  "outcome": "completed",
  "reason": "自检、复核与集成验证结论"
}
```

```sh
pnpm -s monitor:run --root <original-worktree> record --result <result-file>
pnpm -s monitor:run --root <original-worktree> finish <session-id>
```

`outcome` 只能是 `completed`、`reviewed_no_impact`、`blocked`、`failed` 或 `waiting_for_integration`。审计必须位于原项目并解析通过，产品与审计 ID 必须匹配。`completed` 与 `reviewed_no_impact` 还要求审计满足以下全部条件，否则拒绝结算并保持任务未完成：

- `review_status: reviewed`，或同时记录 `reviewed_by` 与 `reviewed_at`；
- `pending_question_ids` 为空；
- `checks` 不含 `blocked`。

只有实际自检、必要的高影响独立复核和集成验证完成后才能记完成或无影响。`waiting_for_integration` 保留待交付状态，可以结束本轮；交付完成后再以同一 `task_id` 记录 `completed`。`blocked`、`failed` 与已完成的同一身份不会自动重派；只有观察到新身份才重新入队。候选失败时先写阻塞审计，再记结果。

每个已领取任务都有结果后才能 `finish`。它只释放本轮临时目录和会话锁；台账、文档比较缓存、Git 审计和既有归档保留。

## 共享台账与队列

真实 Git worktree 使用同一份：

```text
<git-common-dir>/agent-harness-wiki-monitor/session.sqlite
```

独立 dataset 使用 `<dataset-root>/var/harness-monitor/`。台账保存逐日观察、每个来源的 `observed`／`processed`／`attempted` 身份、首次待处理时间、任务、周额度与活跃会话。主工作树和专用巡检工作树因此共享锁和历史；不能把台账写进候选 dataset。

普通 npm 版本前移自动记为无需知识调查，并推进该来源的已处理基线；它不产生版本映射或章节结论。其他每日观察保存当前身份，但不推进已处理基线。若非 npm 来源从 A 观察到 B、再到 C，而上次只处理到 A，下一次任务看到 A→C；结算后处理基线才到 C。结算后出现的新身份继续排队。未领取任务按首次待处理时间、再按 harness ID 排序，新变化不改原等待年龄，因此旧待办不会长期被新变化挤后。

历史 pending、unknown 和缺失主题保持休眠。它们只有出现相关证据入口或被维护者显式重开时才进入候选；无关变化、重复观察和“仍然 unknown”都不构成重派理由，也不能被新审计伪结案。

## 本地运行副本

为了在不提交实现、不改专用工作树内容的前提下安全部署，从当前工作树构建独立运行副本：

```sh
pnpm -s tsx scripts/build-monitor.ts --out <new-runtime-dir> --dataset-root <original-worktree>
```

`--out` 必须是不存在的新目录。构建生成单文件 `monitor.mjs`、来自 registry 中 `observation_url` 的 `observation-urls.json`，并复制当前 `harness-monitor`、`harness-maintenance` 两个 Skill 与必要文档；不改调度或 worktree。原生 SQLite 通过已有锁定依赖解析，不安装新依赖。构建输出给出 runtime、Skill 路径、`sha256`、原生依赖位置和共享台账目录。observation 映射只覆盖已登记且声明了官方文档观察入口的 source ID，URL 必须是 HTTPS。

部署前必须用构建出的绝对路径自行检查：

```sh
node <runtime-dir>/monitor.mjs --root <original-worktree> --observation-urls <runtime-dir>/observation-urls.json precheck
```

核对退出码、`status`、`blocked_sources`、`precheckPath`、运行副本 hash、两个 Skill 与 `stateDirectory`。只有这些结果符合当前环境后，才把调度命令从 `pnpm monitor:run` 换成带 `--observation-urls` 的 runtime 命令。原项目根仍是专用 worktree；worker/reviewer 读取运行时副本中的当前维护 Skill。

只读查看队列、预算和最近 20 个任务结果：

```sh
pnpm -s monitor:run --root <original-worktree> status
```

`status` 只读本地台账，不访问上游、不创建任务，也不推进基线。

当前专用工作树存在上一轮遗留的未跟踪审计文件，本次不覆盖、删除或提交。每日观察仍可运行；周日有候选时 precheck 返回 `delivery_blocked`，维护者先处理这些文件的归属，调度不绕过 clean 检查。

## 手动维护与交付

手动触发仍使用 [harness-maintenance](../.agents/skills/harness-maintenance/SKILL.md)。完成扫描、固定来源、隔离候选和最终审计集成后，coordinator 同样运行 `record`，但省略 `task_id`；这条路径不启动 monitor session，也不占自动周额度。手动 ID 维护仍按既有规则核对受管二进制，local 与 PR 的发布边界不变。

巡检只更新滚动 PR：后续轮次继续同一未合并分支，普通 merge `origin/main`，同一产品 × topic 只保留一个未发布候选；合并前每轮完整闸门只跑一次，失败不推送。合并由维护者完成，合并后既有发布 CI 接管；巡检不切换本地发布指针、不发布知识、不刷新受管二进制。

所有 worker 与 reviewer 明确停止后才能集成、清理或收尾；timeout 不是停止证据。来源临时 checkout 按 owner 和记录 ID 释放，官方文档原件、章节、来源、审计与报告继续保留。

## 启用顺序

1. 新命令和测试已进入实际运行代码，两个 Skill、数据模型和自动化文档一致。
2. 从工作树构建新 runtime，核对输出 hash、Skill 副本、原生 SQLite 路径与共享台账路径。
3. 工作日运行 runtime 的 precheck，确认正常跳过为 exit 2；在模拟的周日条件确认可启动为 exit 0，交付工作树异常为 `delivery_blocked` 和 exit 1。
4. 保留专用工作树中既有未跟踪审计，验证周维护会报告交付阻塞，日常观察仍可运行。
5. 将唯一 Orca 自动化的预检改为已核对的绝对 runtime 路径，每日 02:00 触发；仅脚本返回 0 才启动 Agent。
6. 回读并记录调度配置。后续周日维护的实际结果另行记录；任何交付 gate 失败都不推送并保留台账。
