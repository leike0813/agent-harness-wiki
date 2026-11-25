# prime-agent 上游审阅报告 · 2026-11-24

## 给维护者的结论

本轮 triage 分类为 maintain。观察时间 2026-11-23T18:02:35.995Z，来源 `source-prime-agent-repo` 由 `783acb5d72a9b23f97fa4a793a67d421b3ec402d` 前进到 `798d97032a3ec6d70142cc75c0420cb2b260f194`（15 提交 / 163 文件）。协调者给出的 10 个被登记引用文件中，三组产生知识变化：settings 的三个文件（新键与默认值）、session engine / rlm ledger（Decision API 子 Agent 与账本字段）、以及支撑配置的 session engine 新模块。据此新建 3 个完整 edition（configuration v7、custom_agents v5、local_transcripts v5）并切换选章。

另有一个**来源冲突**（本轮 diff 未引入、观测时确认）：已发布 mcp v3 把 `/mcp login NAME` 写成登录步骤，但观测提交的 `/mcp` 已是纯菜单命令，typed 子命令被刻意移除，登录由 `/mcp` 连接视图选择服务后内部触发；本轮 `.changes` 与 OAuth 错误文案也统一指向 `/mcp` 视图。按高影响规则本轮**不**新建 mcp edition、不切换选章，mcp 保持 v3 并把 `mcp.entry`、`mcp.auth` 留在 pending，等待独立复核。因此本审计 `review_status` 仍为 `pending`。

## 变化的意义与证据边界

固定来源全部用该提交的 `raw.githubusercontent.com` 文件核对 SHA-256，再写入 `git_source_file` artifact（仅 commit/file/content_sha256，不保留 checkout）：

| 文件 | 变化 | 结论 |
| --- | --- | --- |
| `crates/pa-core/src/settings/types.rs` | 新增 `Settings.decision_model`；`AgentInboxSettings.idle_debounce_ms` / `success_hold_ms` 与两个默认常量 | configuration v7 |
| `crates/pa-core/src/settings/load.rs` | `KNOWN_FIELDS` 新增 `decisionModel` | configuration v7 |
| `crates/pa-core/src/settings/manager.rs` | 两个 `agentInbox` getter，均只读 global | configuration v7 |
| `crates/pa-core/src/session_engine/decision_api.rs`（新） | `decisionModel` 是唯一模型来源；请求带 `model` 被拒；引擎启动时解析一次 | configuration v7 + custom_agents v5 |
| `crates/pa-core/src/session_engine/rlm_host.rs` | `RlmSpawnKind`，`kind="decision"` 与 `model` 同时出现被拒 | custom_agents v5 |
| `crates/pa-core/src/prompts/layers/core.md` | `rlm.spawn` 签名与 `kind="decision"` 行为说明 | custom_agents v5 |
| `crates/pa-daemon/src/rlm_ledger.rs` / `rlm_ledger/replay.rs` | spawn 记录新增可选 `decisionChild` | local_transcripts v5 |
| `crates/pa-daemon/src/worker/inbox_router.rs`（新调用点） | `wake_delay` 取两个 `agentInbox` 计时、每次新读设置 | configuration v7（生效路径） |
| `crates/pa-core/src/packages/mod.rs` | `get_bundled_skills_dir` 仅提升可见性 + `#[must_use]` | 无（内部启动装配） |
| `crates/pa-core/src/prompts/system_prompt.rs` | agent inbox 提示句改写 | 无（无章节引述该句） |
| `crates/pa-core/src/session_engine/mod.rs` | 仅 `pub mod decision_api;` | 无（已登记引用落点未变） |
| `crates/pa-daemon/src/acp/daemon.rs` | StopSession 命令新增 `timeout_ms: None` | 无（ACP 仍用 30 s 响应超时） |
| `crates/pa-daemon/src/saved_session_commands.rs` | 测试夹具补 `decision_child: false` | 无 |

证据边界：`decisionModel` 的配置语义来自 types/load/decision_api；`agentInbox` 两个键只取证到默认值与作用域，固定来源没有为它们给出环境变量或命令行覆盖，章节按此写明。Decision API 子 Agent 的完整实现（引擎、worker 路由）不在已登记引用内，章节只写 core 提示层与 host/ledger 能证的部分。

## 章节候选

- `prime-agent-cli-configuration-v7`：`config.defaults` 增加 `decisionModel`（未设置即关闭）、`agentInbox.idleDebounceMs`/`successHoldMs`（5000/30000 ms、只读全局），并把 `decisionApi` 移除说明补成“扁平键回归、未恢复旧对象段”；含最小 JSON 示例。
- `prime-agent-cli-custom_agents-v5`：`agents.roles` 增加 `kind="decision"` 特殊子 Agent 角色（收件箱回复、唤醒合并、agents 视图不显示但 list_subagents/账本仍列出）；`agents.overrides` 记录 decision 子 Agent 不接受 `model`。
- `prime-agent-local_transcripts-v5`：`transcripts.schema` 增补 RLM 账本 spawn 行的可选 `decisionChild` 字段（旧行读 false，v 仍为 1）。

## 待处理与独立复核

- mcp：`/mcp login NAME`、`/mcp logout` 在观测提交上已不是可用的 slash 子命令（`session_ui/auth.rs` 写明 `/mcp` 是菜单命令、typed 子命令被移除，登录由 `/mcp` 连接视图内部触发；本轮 `mcp_login.rs` 只删除 logout 钩子，`oauth.rs` 与 `.changes` 把指引改成 `/mcp` 视图选择服务）。已发布 mcp v3 的第 93、129 行仍写旧步骤。**本轮未改写该章、未切换选章**，pending question：`mcp.entry`、`mcp.auth`。需要独立 reviewer 后再生成 mcp edition。
- `pending_audit_refs` 保持此前 7 条未结审计，未借本轮标记关闭。

## 来源核查记录

| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| `source-prime-agent-repo` | `783acb5d72a9` → `798d97032a3e` | changed（10 个被登记引用文件逐一核对，见上表） |

## 验证与差异入口

作者自检：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-4/candidates/prime-agent` 通过（exit 0）。新增 artifact/snapshot/reference 与 3 个 edition 均由该检查校验路径、归属、快照绑定与章节引用；mcp 主题保持原选章，未进入候选正文。
