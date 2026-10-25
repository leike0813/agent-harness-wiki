# Proposal

## Why

每日巡检目前每天启动一个 LLM 会话并重新观察、triage 和派发，但来源变化并不需要每天由模型判断。把每日观察降为纯脚本，只在每周固定窗口按共享队列启动一次调查，同时保留持久待办、一次性领取和结果审计，可以显著减少模型调用和重复调查，又不把未完成工作误结案。

## What Changes

- 每日 02:00（`Asia/Shanghai`）由同一 Orca 自动化运行 `monitor:run precheck`：只观察来源、记录本地快照和共享队列，不启动 LLM、不改 Git、不创建源码 checkout，并与维护会话共用同一把锁。普通跳过以退出码 2 表示，技术失败或 `delivery_blocked` 为 1，可启动为 0；周日有任务但专用工作树不干净或不是 linked worktree 时仍保留观察，但不启动 Agent。
- 仅在周日 02:00 的 60 分钟窗口内，由外部调度依据 precheck 的 `launch` 启动 Agent；每周最多调查 5 个产品，同一产品同周至多一个 writer，窄查和失败都占额度。
- 新增共享 SQLite 台账，放在 Git common dir 的 `agent-harness-wiki-monitor/session.sqlite`；独立 dataset 使用 `var/harness-monitor`。台账保存逐日观察、处理基线、已尝试身份、任务与周额度，真实 worktree 共用同一把锁。
- `start` 只消费 60 分钟内的周维护 precheck 和共享队列，不重新观察；领取任务即占用额度。`record` 以审计为凭据写入结果，`finish` 只释放已结算会话的临时目录。
- 未领取队列保留原有等待年龄；同一身份已完成、阻塞或失败后不自动重派，`waiting_for_integration` 不重复调查且可在交接后改为 `completed`。历史 pending、unknown 和缺失主题只由相关新证据或显式手动重开唤醒。
- `sources:check` 保持纯只读，并把候选提示改为 `requires_triage`：只有当前观察存在 `changed` 时才为真，不写审计、不下载包字节、不创建 clone，也不直接触发派发。
- Git HEAD-only 变化不自动产生章节 impacts；只有已知路径命中已引用的固定文件时才给出引用提示，并先读取最小入口再判断语义，不因宽泛的 `config`、`loader` 文件名扩成整主题调查。
- 已发布引用的定位和摘录按各自固定快照复核。上游后续行号移动或等价链接形式变化不使旧证据失效，也不单独触发章节改写。
- 官方文档来源可把当前观察入口放在可选 `observation_url`，扫描使用 `observation_url ?? url`；`url` 继续保持快照与历史引用身份，Amp 的旧快照和引用不改。
- 保留隔离候选、必要的高影响独立复核、全部 worker/reviewer 停止后集成与清理、滚动 PR，以及既有发布和受管二进制验收边界。

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `harness-monitor`: 每日脚本观察、周度限量调查、共享台账、任务领取与结果结算、队列休眠和滚动交付。
- `upstream-incremental-audit`: 只读扫描的 `requires_triage` 契约、逐日观察与已处理基线的分离，以及历史审计的唤醒条件。
- `source-provenance`: 已发布引用按固定快照复核定位与摘录，不跟随上游后续行号或等价链接变化。
- `manual-investigation-skill`: 手动维护集成审计后的结果登记，以及与自动周额度分离的交付边界。

## Impact

影响 `scripts/monitor-run.ts`、`src/sources/monitor-run.ts`、`src/sources/monitor-state.ts`、`src/sources/monitor-session.ts`、`src/sources/scan.ts`、相关集成与单元测试，以及 `AGENTS.md`、自动化／数据模型／知识工作流文档、ADR 0012 和两个维护 Skill。不新增依赖，不改变知识 schema、查询契约、本地发布命令、受管二进制流程或在线发布协议。
