---
name: harness-monitor
description: 按共享队列维护已登记 harness 的来源变化，隔离候选并交付滚动 PR；用于周日自动化领取任务或维护者显式恢复巡检。
---

# 目标

在专用监控工作树中消费一次已领取的周度任务：只 triage `start` 返回的产品，按固定证据更新知识或记录阻塞，完成必要复核与聚合验证，更新滚动 PR，并用原项目 Git 审计结算每个结果。每周最多 5 个产品，同产品同周至多一个 writer。

## 非目标

不接入新产品，不刷新本地发布或受管二进制，不自动合并 PR，不重扫已领取范围外的来源，不把历史 pending 或 unknown 自动重开。

## 角色、输入和输出

调度先运行纯脚本 `precheck`，再在可启动窗口启动 coordinator。coordinator 的输入是 runtime 目录、原项目根、长期存活 owner PID 与 `start` 交接单：

```text
worktree, branch, branchAction, branchReason, commitsAheadOfMain, pull?
session{id, tempRoot, reportPath, ownerPid}
checksPath, tasks[{task_id, session_id, harness_id, week, created_at, audit, outcome, reason, audit_id}]
documentDirectory, observation, reportPath, skill
```

`checksPath` 只含已领取产品。coordinator 输出每个产品的 triage、审计、候选结果、复核、集成与验证状态，以及最终 PR、阻塞、清理和结果登记。worker 只输出自己产品的 `changed`、`completed`、`blocked`、`selection`、`audit`、`review`、`workspaceIDs` 和停止确认。

运行时命令通过构建出的绝对路径调用；开发环境可用 `pnpm -s monitor:run`。两者都接受全局 `--root <original-worktree>`，部署态还要传 `--observation-urls <runtime-dir>/observation-urls.json`：

```sh
node <runtime-dir>/monitor.mjs --root <original-worktree> \
  --observation-urls <runtime-dir>/observation-urls.json start --owner-pid "$PPID"
node <runtime-dir>/monitor.mjs --root <original-worktree> \
  --observation-urls <runtime-dir>/observation-urls.json record --result <result.json>
node <runtime-dir>/monitor.mjs --root <original-worktree> finish <session-id>
```

`status` 只读台账，可查看队列、周预算和最近 20 个任务：

```sh
node <runtime-dir>/monitor.mjs --root <original-worktree> status
```

## 约束

- 每周最多领取 5 个产品；领取即占额度。窄查、blocked 和 failed 都消耗该产品本周的尝试，同一产品同周不启动第二个 writer。高影响独立 reviewer 不计第二个 writer。
- coordinator 与 worker/reviewer 使用项目既定模型 `minimax-code-cn/MiniMax-M3.1-Flash-Preview`，每次原生委派显式设置模型参数。模型不可用时报阻塞，不换模型。
- 只处理交接单 `tasks`；不运行 `sources:scan` 或 `sources:check`，不读取未领取队列，不把新观察补进本轮。
- 每个产品独立 candidate，只有 coordinator 合并共享 catalog、来源、选章与审计。所有 worker/reviewer 明确停止后才可集成、清理或结束 session；timeout 不是停止证据。
- 普通 npm 版本前移由台账自动结案；没有知识影响线索时记 `reviewed_no_impact`。Git 只有 HEAD 变化时不生成 impacts，已知路径只提示精确引用文件。
- 历史 pending、unknown 和缺失主题只在相关证据入口或维护者显式重开时恢复。旧审计不能被新审计间接标 reviewed。
- `delivery=pr` 不发布知识、不切换本地指针、不刷新 binary；合并后由既有 CI 发布。

## 执行流程

### 1. 验证领取与交接单

确认 `start` 的 `branchAction` 不是 `blocked`，session owner PID 是长期 coordinator，`tasks` 非空且不超过 5 个。若调度因为 `delivery_blocked`、工作日、零队列或过期 precheck 启动，立即停止，不启动 worker。

`start` 前专用 worktree 必须干净。完成 `start` 后只接纳本轮登记的候选与审计；发现其他未提交内容时保留并报阻塞，不混入提交。

交接单中的 `observation.products` 和 `observation.blocked` 只概述已领取任务；来源失败仍按产品决定是否可限定调查。完整观察只读 `checksPath`，不打印进对话。

### 2. 只 triage 已领取任务

逐产品核对冻结审计、当前章节、固定问题、来源引用、映射和 `pending_audit_refs`。先读最小来源入口，再按证据扩展；不能仅凭 `changed`、文件名或版本号派发。

分类：

- `maintain`：有证据表明固定问题或答案可能变化，且存在可调查入口。
- `narrow_investigation`：变化实质存在但范围未知，只交最小入口和问题。
- `reviewed_no_impact`：只涉及普通 npm 元数据、无关代码、排版或等价表达；写明核对范围与理由，不改章节。
- `blocked`：来源失败且没有可执行修复或替代入口；保留旧基线和 pending，不重复相同探查。

初步审计先落到原项目 `audits/<harness-id>/<audit-id>.yaml`，记录来源范围、问题、理由和当前 blocker。候选失败也需要可在原项目解析的阻塞审计，再结算。

### 3. 固定证据与隔离候选

只有 `maintain`／`narrow_investigation` 进入候选。需要读取 Git 时，由 coordinator 在原项目根打开 pinned workspace：

```sh
pnpm -s sources:workspace open --source-id <source-id> --commit <SHA> --baseline <上次处理SHA> --owner-pid <coordinator-pid>
```

记录 workspace ID，保留到复核结束；worker 不重新 open 或 scan。baseline 不可取得时省略该参数，从最小入口判断。官方文档读取 `documentDirectory/<observed-sha256>.txt` 与处理基线对应原件；`observation-urls.json` 只登记抓取入口，不能替代原件。新原件用于知识证据时按来源契约归档。引用按其固定快照核验，旧 snapshot/reference 不因上游等价链接或行号移动改写。

候选工具：

```sh
pnpm maintenance:candidates prepare --root <original-root> --out <new-temp-batch> <harness-id>...
pnpm maintenance:candidates check --candidate <candidate-root>
pnpm maintenance:candidates plan --batch <batch> --out <new-temp-merge> <completed-id>...
```

`prepare` 后每产品只派一个 maintenance worker，传冻结 observation、workspace IDs、问题范围、pending 子集、candidate root、原项目根与 runtime 中的当前 [harness-maintenance](../harness-maintenance/SKILL.md)。worker 不 rescan、不越界写入、不集成或发布。

### 4. 复核、检查与 stale-safe 集成

每个候选先跑 `maintenance:candidates check`。只让对应 writer 修复单产品校验错误，其他产品继续。

来源冲突无法由版本／分发／条件解释、新证据推翻已发布配置步骤、或跨主题关键加载机制改变时，coordinator 另派独立 reviewer，使用同一固定证据和候选 diff。reviewer 不写候选。`changes_requested` 回到原 writer；未批准问题保持旧当前选章与来源范围，其他完成主题可继续。

全部 writer/reviewer 停止后，生成一次 merge plan。核对 accepted、逐产品 rejected 与完整 before/after；基线变化或全局 ID 冲突只拒绝该产品。任何 before 已改变都重新生成，不从过期 plan 挑文件应用。用内置编辑工具集成，随后读完整 diff。

### 5. 聚合验证与滚动 PR

集成后按顺序运行一次：

```sh
pnpm knowledge:validate
pnpm sources:audit-log
git diff --check
pnpm verify
```

全过后，仅提交本轮已验证内容，再从该提交的干净 production 输入构建并验证在线产物：

```sh
pnpm online:build --dataset-root . --profile production --commit <本轮完整 SHA> \
  --published-at <固定 ISO 时间> --base /agent-harness-wiki/ --out-dir <tempRoot>/online
pnpm online:verify <tempRoot>/online
```

任何闸门失败都不推送，保留本地提交、候选与诊断。滚动 PR 继续同一分支，普通 merge `origin/main`；同一产品 × topic 只保留一个未发布候选，不 force push、不 rebase 已推分支、不改写 main。PR 描述列出领取范围、triage、候选、复核、阻塞和实际验证结果。

### 6. 结算每个任务

每个产品写结果文件：

```json
{
  "task_id": "<领取的 UUID>",
  "harness_id": "<product-id>",
  "audit_id": "audit-<product>-<uuid>",
  "outcome": "completed",
  "reason": "具体结论与验证范围"
}
```

`outcome` 只能是：

- `completed`：知识或审计已集成并通过适用验证。
- `reviewed_no_impact`：已核对且无需知识更新。
- `blocked`：需要新证据、人工决策或修复入口。
- `failed`：任务执行失败，保留可见原因。
- `waiting_for_integration`：候选已备但尚未交付；可先结束会话，之后以同一任务改记 `completed`。

`record` 读取原项目审计并校验产品、审计 ID 与冻结来源。`completed`／`reviewed_no_impact` 还要求审计为 `reviewed` 或带 `reviewed_by`／`reviewed_at`，`pending_question_ids` 为空，checks 无 blocked；否则拒绝推进 processed。完成前必须有实际自检、必要复核与集成验证。不得把 waiting、blocked 或 failed 写成完成。

### 7. 停止、清理与 finish

核对每个任务都已结算。按本轮登记的 workspace ID 关闭来源工作区；只关原项目和 owner PID 名下、已确认停止使用的对象。官方文档原件、章节、来源、审计与报告保留，不扫目录删除归档或本地发布。

将 session、branch/PR、任务结果、验证、阻塞、保留资源和停止确认写入 `reportPath`。然后：

```sh
node <runtime-dir>/monitor.mjs --root <original-worktree> finish <session-id>
```

`finish` 会拒绝仍有未登记结果的任务；只释放本轮临时目录和锁，台账、文档缓存与 Git 审计保留。若收尾失败，逐项报告，不伪报清理成功。

## LLM 与脚本职责

LLM 判断来源变化是否影响固定问题，写 triage、章节、审计和复核结论，选择维护范围并评估 stale 候选。脚本负责 precheck、共享锁、任务领取、workspace 生命周期、候选投影与校验、before/after plan、schema/audit gate、在线构建、结果存储和 session 清理。不能用 `requires_triage`、`impacts` 或字符串规则取代语义判断。

## 禁止事项

- **禁止**启动工作日或未通过 fresh precheck 的轮次，禁止绕过 `delivery_blocked`。
- **禁止** rescan、triage 未领取产品，或在同产品同周再造 writer。
- **禁止** worker 写共享真源、集成 plan、发布知识或刷新 binary。
- **禁止** 在 worker/reviewer 未确认停止时合并或清理。
- **禁止** 将普通 npm 版本、HEAD-only 变化或宽泛文件名自动扩写成知识结论。
- **禁止** 用新审计关闭未解决的旧审计，或把历史 unknown 当成本轮任务。
- **禁止** stale 产品覆盖基线、失败时推送、force push、rebase 已推分支或改写 main。

## 成功标准

只消费交接单任务；每个产品有可追溯 triage、固定证据、必要复核和审计；候选隔离且 stale-safe；聚合与在线闸门按顺序通过；滚动 PR 内容完整；所有任务用审计结算，停止与清理状态真实，session 正常结束。

## 参考

- [harness-maintenance](../harness-maintenance/SKILL.md)：章节、引用、审计与复核契约。
- [每日自动化](../../../docs/automations.md)：调度、运行副本、台账和退出码。
- [数据模型](../../../docs/data-model.md)：监控身份与来源字段。
- [ADR 0012](../../../docs/decisions/0012-daily-harness-monitor.md)：周度预算、队列和部署边界。
