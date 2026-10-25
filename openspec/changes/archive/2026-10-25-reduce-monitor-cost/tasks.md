# Tasks

## 1. 监控台账与命令

- [x] 1.1 实现共享 SQLite 台账、跨 worktree 身份、逐日观察、observed／processed／attempted、队列年龄、周额度与 session 锁；验证同 Git common dir 的两个 worktree 共用状态和锁。
- [x] 1.2 实现 `precheck` 的脚本观察、共享锁、`blocked_sources`、普通 npm 元数据自动结案、状态与退出码；验证工作日 exit 2、可启动 exit 0、dirty／非 linked Sunday exit 1 且不启动 Agent。
- [x] 1.3 实现 `start` 只消费 60 分钟内 precheck 与共享队列、领取即占额度、返回 frozen tasks／checksPath／documentDirectory；验证五次领取后的第六个产品延期。
- [x] 1.4 实现只读 `status` 与 `record`／`finish` 结算：队列、预算、最近 20 任务；审计存在性、身份、reviewed 自检、pending 与 blocked checks 门禁；验证 waiting 可结束会话并在交付后改记 completed。
- [x] 1.5 接通手动 ID scan 的 processed 基线、runtime `--observation-urls` 覆盖和 source schema 的 `observation_url`；验证 Amp 旧 snapshot/reference 不变、旧和新 `requested_url` 均可验证。
- [x] 1.6 实现 `build-monitor` 的独立 `monitor.mjs`、`observation-urls.json`、Skill 与文档副本；验证新目录输出、hash、原生 SQLite 解析和 `node <runtime>/monitor.mjs --help`。

## 2. 观察与交付语义

- [x] 2.1 让 `sources:check` 保持纯只读并只以当前 changed 产生 `requires_triage`；验证不写审计、缓存、checkout 或基线，也不直接创建任务。
- [x] 2.2 限制 Git HEAD-only 无 impacts、已知路径仅映射精确引用，并落实历史 pending／unknown／缺失主题休眠；验证相关新证据与显式重开两种恢复路径。
- [x] 2.3 保留候选隔离、高影响独立复核、全部停止后集成、聚合 gate、在线验证和滚动 PR；验证同产品 × topic 只有一个未发布候选。

## 3. Skill 与文档

- [x] 3.1 将 `harness-monitor` 改写为只消费周度领取任务，包含 precheck 状态、共享台账、status、record 门禁、运行副本与滚动 PR；人工检查命令、枚举和停止条件与实现一致。
- [x] 3.2 更新 `harness-maintenance` 的 processed 扫描、`observation_url`、固定快照引用复核、历史休眠与手动结果登记；人工检查 worker 不重扫、不登记。
- [x] 3.3 更新 AGENTS、PRD、automations、data-model、knowledge-workflow 与 ADR 0012；人工检查未把当前调度写成已部署，deployment 命令包含 `node` 与 `--observation-urls`。

## 4. 验收

- [x] 4.1 运行监控相关单元与集成测试，确认 precheck 状态、共享锁、队列、预算、结果门禁和 runtime 构建通过；记录实际命令与通过数。
- [x] 4.2 构建新 runtime，在非 LLM 条件下执行 `--help` 与工作日 precheck，核对 exit 2、`observed`、`blocked_sources`、precheckPath、stateDirectory 与 Skill 副本；不运行真实周日 LLM 巡检。
- [x] 4.3 确认专用工作树中的上一轮 untracked audits 未被覆盖或提交，验证 dirty 周维护会被预检拒绝；日常观察和调度可部署，保留交付阻塞。
- [x] 4.4 完成真实调度切换并回读每日时间、运行副本、预检和既有模型配置，更新 automations／ADR 的部署状态；本轮不启动真实 LLM 维护。

## Workflow follow-up

- 部署与本轮验收已记录在 docs/automations.md；后续真实周维护的结果另行记录，本 change 不归档。
