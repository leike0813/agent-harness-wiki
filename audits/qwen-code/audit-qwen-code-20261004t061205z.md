# Qwen Code 上游巡检报告 · 2026-10-04

- 审计记录：`audit-qwen-code-20261004t061205z`（status `changed`，review_status `pending`）
- 本轮观察：2 个登记来源，其中 1 个非 unchanged
- 协调者语义 triage：定向维护（maintain）
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-qwen-code-repo` | git_repository | changed | `2c591ecc08a6fa080342f9b1b9f7f43215178cbb` | `35616f3b643f6d87cc00112d961a0fbb448aca00` |

## 语义 triage 与理由

### custom_agents

候选固定问题：`agents.entry`、`agents.roles`、`agents.limits`

候选关联小节：`agents-entry`、`agents-roles`、`agents-limits`

packages/core/src/agents/workspace-agents/ 在提交 35616f3b 有实质改动：host-lease.ts（+66/-5）、run-lifecycle.ts（+13/-1）、store.ts（+14）、types.ts（+6），配套测试新增约 345 行；提交说明为「distinguish accepted Host results from terminal runs」，即区分被 Host 接受的运行与终态运行。

### 定向核实结论：三个固定问题的已发布答案不变，不新建 edition

改动的实际语义是 Host 结果提交的幂等判定，不是 agent 形态的变化：

- `ThreadRun` 新增 `hostResultReceipt`（`attempt` / `leaseId` / 结果内容 sha256），与终态结算一起持久化。
- 只有与回执**完全一致**的重发才返回 `alreadyApplied`；此前仅凭租约身份一致即判为已应用。
- 结算改写了上报状态的结果（run 已处于 `cancelling` 而 Host 上报 `completed`）被接收并结算为 `cancelled`，但不写回执，因此一致重发返回 `stale_lease`。
- 已被恢复或取消先行结算的迟到结果返回 `stale_lease`，且不再把 token 计入 `usageByRound`——终态 attempt 不再具备影响预算的写权限。

逐题判断：

- `agents.entry`：不变。`workspace-agents` 承载的是协作线程在已注册 Qwen Host 上的**执行位置**，不是用户可定义或可配置的 agent 形态。用户态 Subagent 定义与 frontmatter 解析位于 `packages/core/src/agents/runtime/`，本提交未触及；`.qwen/agents/`、`~/.qwen/agents/`、扩展 `agents/` 目录与 `/agents create`、`/agents manage` 入口均无变化。
- `agents.roles`：不变。命名常规子代理与 fork 的区分、内置 `claude-code`/`codex`/Explore 角色、Agent Team 协作模式均未被本提交触及；Host 是执行位置而非角色。
- `agents.limits`：不变。软警告阈值（`description` 1,000 字符、系统提示词 10,000 字符）、fork 禁止再委派、通知队列 20 条上限、`working_dir` 约束、外部执行器限制均无变化；design 文档的 Limits 一节本提交未改。

新增状态无对外暴露面：`alreadyApplied` 与 `stale_lease` 的唯一非测试消费方是内部 serve 协议（`packages/cli/src/serve/routes/agent-hosts.ts` 返回、`packages/cli/src/serve/agent-host-client.ts` 处理）；`hostResultReceipt` 只写入 `workspace-agents` 内部持久化的 `ThreadRun`，未进入任何 CLI 命令、配置项或用户可见的 agent 状态枚举。

本提交未改动任何 `docs/users/` 用户文档；`docs/design/2026-09-11-agent-project-host-entry.md` 及其 `.zh-CN.md` 各改 1 行，仅重述结果提交幂等语义。

证据限于固定提交 `35616f3b` 的源码树与设计文档，不代表任何已发布包版本的行为；本轮未建立版本映射，保留来源级知识。

## 调查记录

- 本轮协调者语义 triage 结论：maintain。已交回隔离候选做定向维护。
- 本轮 qwen-code 由 2c591ecc 前进到 35616f3b；同批还有 docs/design/2026-09-11-agent-project-host-entry.md 的 1 行改动与若干 hosted-harness serve 内部改动。
- 定向核实已按 `docs/topic-questions.md` 的固定问题口径逐题核对 `agents.entry`、`agents.roles`、`agents.limits`，而非按目录名推断；三个问题均判定无需改章节，`pending_question_ids` 清空。
- 同批的 `packages/cli/src/serve/hosted-harness-*`、`hosted-runtime-recovery.ts`、`packages/sdk-java/managed-agent-server/**` 与 `docs/design/2026-10-0*` 等路径不在本轮范围内，未评估；其语义涉及托管 harness 会话与 Java 端 managed agent server，若后续判定构成 `custom_agents` 知识影响需单独交回。

## 候选与复核

本产品候选只更新了本产品审计记录，未改动任何章节、选择或来源登记。`impacts` 按契约保持与已发布章节 `qwen-code-cli-custom_agents-v2` 一致；本轮无高影响结论，无需独立复核，逐产品 `check` 通过后由协调者生成合并计划。
