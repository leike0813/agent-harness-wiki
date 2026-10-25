# Design

## Context

参见 [proposal.md](proposal.md)。现有 `monitor:run start` 同时承担前置检查、来源观察、任务领取和交付准备，因此每日自动化必须启动 LLM 才能判断是否值得调查。来源扫描已经支持只读 `checkHarnesses`，但结果与手动扫描的 Git 审计混在同一基线里，无法区分“今天看到了什么”和“上次真正处理到哪里”。

专用交付 worktree 仍有上一轮未跟踪的审计文件。调度迁移保留这些文件；每日观察可运行，周维护在工作树清理交付前保持阻塞。

## Goals / Non-Goals

**Goals:**

- 把每日观察与周度语义调查分开，日常路径不启动模型。
- 用一份跨 worktree 的本地台账表达观察、队列、尝试、额度和会话锁。
- 让每周领取、失败、阻塞和待集成结果都有确定归宿。
- 保持现有隔离候选、独立复核、滚动 PR、发布和二进制边界。

**Non-Goals:**

- 不改变章节或来源审计 schema、查询发布、在线发布协议或受管包布局；来源登记新增可选的观察 URL。
- 不自动清理旧审计、未跟踪文件、归档或本地发布。
- 不在本次 change 内执行真实 LLM 巡检或创建 PR；调度只在代码和预检验证完成后切换。

## Decisions

### 日检前置与周度启动分成两个状态机

每日 02:00 的自动化只运行 `precheck`。它在同一把共享锁下完成一次观察、更新本地队列、写出预检结果，然后退出；不判断语义影响，不切换分支，也不开源码工作区。只有**周日 02:00 至 02:59:59**、队列非空、周额度未满且预检在 60 分钟内时才允许外部调度启动 Agent。

`precheck` 结果固定包含 `checked_at`、`week`、`due`、`used`、`remaining`、`queued`、`blocked_sources`、`products`、`launch`、`status`、`diagnostic` 与 `precheckPath`。`blocked_sources` 统计未能观察的来源，其余来源与产品照常处理。正常可启动为 `ready` 且退出 0；工作日、空队列或额度耗尽为正常跳过且退出 2。周日有候选但交付 worktree 非 linked 或 dirty 时为 `delivery_blocked`：观察和队列仍落盘，`launch=false`，`diagnostic` 说明阻塞，退出 1。其他技术失败也退出 1。

选择两个状态机而不是让 precheck 直接建 branch，是为了让每日无模型路径可以独立失败，又不会把调度器的环境错误伪装成“无变化”。

### 共享台账以 Git common dir 为运行边界

真实 worktree 的台账和锁位于 `<git-common-dir>/agent-harness-wiki-monitor/session.sqlite`；独立 dataset 回退到 `<root>/var/harness-monitor`。SQLite 保存：

- 每个来源的 `observed`、`processed`、`attempted`、检查时间与首次待处理时间；
- 每次每日观察的不可变本地记录；
- 当前周或历史周的任务、冻结审计、结果与理由；
- 活跃 session、owner PID、临时目录和报告路径。

同一 Git common dir 下的工作树必须共用锁。预检只在持锁期间观察和写状态，因此不会与维护会话互相覆盖；`start` 仍沿用专用 linked worktree、干净工作区和滚动分支前置。

台账放在本地运行状态而非 Git，是因为逐日观察会持续增长，历史和噪声不应进入每个知识 PR。每周真正有结论的审计仍写入原 dataset 的 `audits/`。

### 观察、处理与尝试是三组身份

`observed` 是每日最新看见的来源身份，`processed` 是已经结算覆盖的身份，`attempted` 是最近一次任务领取派遣的身份。普通 npm 版本前移由 `observe` 自动记为无需知识调查并推进该来源的 `processed`，但不产生版本映射或知识结论；其他每日观察只更新 `observed`，不推进 `processed`。领取任务时写入 `attempted`，从而在进程崩溃时仍占用额度。

结算 `completed` 或 `reviewed_no_impact` 时，把 `processed` 推进到任务审计实际覆盖的观察身份；`blocked`、`failed` 和 `waiting_for_integration` 保留已尝试身份而不宣称已处理。这样观察 A→B→C、实际处理到 C 时一次结算 A→C，不会留下 B 的虚假待办；结算之后出现 D 则继续排队。

队列按每个产品最早的待处理时间排序，再按 harness ID 稳定排序；新变化沿用原 `pending_since`。领取即占周额度，避免崩溃后同一产品在同一周被重派。历史待办只有在相关新证据或显式手动重开时才唤醒，不能因为仍然 unknown 就每周重复派发。

### 受审计的结果是唯一结算凭据

`record --result <file>` 读取 `{task_id?, harness_id, audit_id, outcome, reason}`。自动任务必须带 `task_id`；手动维护省略它。审计必须先在原 dataset 的 `audits/<harness-id>/` 中存在、可解析，并与产品及审计 ID 相符。审计本身带来源范围、结论、pending 和复核状态，台账只保存结算结果与快照。`precheck`、`start`、`record`、`finish` 都接受全局 `--root <original-worktree>`，未提供时使用当前目录。

结果枚举为 `completed`、`reviewed_no_impact`、`blocked`、`failed`、`waiting_for_integration`。完成和无影响必须经过实际自检、必要的高影响独立复核及集成验证。审计须为 `review_status: reviewed`，或带有 `reviewed_by` 与 `reviewed_at` 的自检记录；`pending_question_ids` 必须为空，`checks` 不得含 blocked。否则结算拒绝推进 `processed`。候选失败时先写阻塞审计再结算。`waiting_for_integration` 允许先结束会话，稍后以同一任务改记 `completed`。`finish` 只检查本轮领取任务是否都有结果，不把 waiting、blocked 或 failed 当作成功交付。

相比让 `finish` 接受自由文本总结，绑定审计可保证每条结算都有 Git 可追溯证据。

### 源码变化先限定入口，再决定影响

`sources:check` 保持纯只读，只把当前 `changed` 映射为 `requires_triage`。它不写审计、不保留文档、不创建 checkout，也不直接派发。

Git HEAD-only 观察没有逐文件信息，因此不生成章节 impacts。只有已知 changed path 与当前章节引用的固定文件完全相同，才产生引用提示。`config/loader.ts` 之类的宽泛文件名不能自动扩成整个配置主题；coordinator 先读取最小入口，再按证据扩大问题。

已发布引用按自身固定快照检查定位和摘录。上游后来移动行号、把等价相对链接改成绝对链接，或者把人工观察入口迁到官方 `/docs/markdown` 路径，都不改写旧 snapshot/reference；只有固定快照本身不匹配才是错误。

官方文档来源把观察入口与历史身份分开：可选 `observation_url` 只用于扫描当前内容，缺失时回退到 `url`；`url` 继续作为来源身份。快照 `requested_url` 允许 `url` 或 `observation_url`，以同时验证新旧捕获。Amp 保留 `url: https://ampcode.com/manual`，另设 `observation_url: https://ampcode.com/docs/markdown`，避免直接改 `url` 造成旧快照哈希与请求身份不一致。运行副本从 registry 生成 `observation-urls.json`，通过全局 `--observation-urls` 交给 precheck；映射只覆盖已登记 source ID，URL 需通过 HTTPS schema，旧专用树中的 registry 无需改写。

### 保留既有交付与工作区边界

候选仍按产品隔离，每产品同周最多一个 writer；高影响变化仍可追加只读 reviewer。全部 worker/reviewer 明确停止后才集成和清理。滚动 PR 继续普通 merge `origin/main`，每个产品 × topic 保持一个未发布候选。PR 合并后由既有 CI 发布；受管二进制独立。

`finish` 只释放本轮临时目录和会话锁，保留台账、文档比较缓存、Git 审计和 owned source workspace 的既有清理规则。无法确认归属的内容继续保留并报告。

### 本地运行副本避免为部署提交或改写专用树

`pnpm -s tsx scripts/build-monitor.ts --out <new-runtime-dir> --dataset-root <original-worktree>` 从当前工作树构建单个 `monitor.mjs`，并复制当前的 `harness-monitor`、`harness-maintenance` Skill 与必要文档。输出目录必须不存在；构建不修改调度、不切换 worktree、不复制或覆盖专用树里的审计。运行时原生 SQLite 从项目已有锁定依赖解析，不安装依赖。

构建结果给出 runtime、monitor skill、`sha256`、原生依赖位置与 `stateDirectory`。`monitor.mjs` 没有 shebang，部署前用 `node <runtime-dir>/monitor.mjs --root <original-worktree> --observation-urls <runtime-dir>/observation-urls.json precheck` 核对退出码、状态、blocked_sources、precheckPath、skill 副本与 hash；通过后才把调度的开发态 `pnpm monitor:run` 改成该本地已验证 runtime。原项目根仍是专用 worktree，worker/reviewer 读取 runtime 中复制的当前 maintenance 指令。

## Risks / Trade-offs

- [最多延迟六天发现需要语义调查] → 日检仍每天保留来源变化，队列不丢；新变化只影响未来周，不重置年龄。
- [本地台账在重新 clone 后丢失] → `start` 与 `precheck` 从 Git 审计同步已结算历史，并重新观察来源；未交付任务不通过猜测恢复。
- [旧本地历史会被误当成新待办] → 导入的已复核审计直接确认其固定身份；pending、unknown 和缺章保持休眠，只有相关入口或显式重开唤醒。
- [每日观察产生许多本地快照] → SQLite 承担索引与去重，文档比较缓存保留；不将日检本身写入 Git。
- [precheck 与维护同时运行] → 共用同一把锁；冲突按技术结果报告，不覆盖台账。
- [部署前 worktree 有上一轮 untracked audits] → precheck 返回 `delivery_blocked`；维护者先判断归属，部署报告明确列出，本轮不覆盖、不提交。
- [自动化被误报为已上线] → 文档只记录注册 ID、现有周日 02:00 时间和待部署状态；只有父线程完成部署与验收后才更新为已上线。

## Migration Plan

1. 增加或补齐共享台账、precheck、start、record、finish、结果 schema 与 `build-monitor`，并扩充单元／集成测试。
2. 更新 AGENTS、PRD、自动化、数据模型、知识工作流、ADR 0012 与两个维护 Skill，删除“每天启动模型”和“每日重扫”的旧描述。
3. 从当前改动构建新的 runtime 目录，执行只读 precheck 自检并核对 runtime hash、Skill 副本与共享台账路径。
4. 保持现有 Orca 自动化的固定 worktree 和注册身份；当前该树有上一轮 untracked audits，先以 `delivery_blocked` 记录，不处理、不提交、不覆盖。
5. 部署时把调度命令改为已验证 runtime 的绝对路径；回读每日触发、脚本预检和模型配置。后续周日窗口的实际维护结果另行记录；`delivery_blocked` 保持可见，不绕过 clean 检查。

## Open Questions

无。部署后的实际执行结果由父线程记录，不阻塞本 change 的规划。
