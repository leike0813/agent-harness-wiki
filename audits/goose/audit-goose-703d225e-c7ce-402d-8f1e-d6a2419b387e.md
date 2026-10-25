# goose 巡检维护报告（audit-goose-703d225e）

## 观察到的来源身份

| 来源 | 基线 | 观察值 | 判定 |
| --- | --- | --- | --- |
| `source-goose-repo` | `4617040c7b650b37d599bdaa08d3790572c19ae8` | `4811ae25f736fdf0ede847449c060e96645426b5` | changed（单提交 `chore(GDK): release v0.1.0-alpha.12`，107 个文件） |
| `source-goose-npm` | `1.54.0@sha512-Y7wh…zbJO6yFERwbPDSdj+rrQ==` | 同上 | unchanged |

固定源码工作区：`ws-4811ae25f736-d197f1ee-c486-4929-b89d-ac07a4dc9922`，HEAD 已核对为观察提交，未重新扫描、未复制 checkout 进候选。新增证据的 `content_sha256` 全部由该工作区内 `git show 4811ae25:FILE` 的字节计算。

npm 未变，本轮**不新增任何软件版本映射**：仓库提交不能证明 npm 1.54.0 的发布版行为。

## 范围

`narrow_investigation`：入口限 `custom_providers` 与 `custom_agents` 两个主题的五道固定问题——`providers.protocol`、`providers.responses`、`providers.forwarding`、`agents.invocation`、`agents.limits`。

## 四个被章节引用的文件的逐文件 delta

| 文件 | delta | 触及的已发布机制 |
| --- | --- | --- |
| `crates/goose-providers/src/openai.rs` | +19/−9；两处非流式分支（chat completions 与 responses）新增 request id 提取与错误 annotate，`ProviderUsage` 写入 `request_id` | `providers.responses` |
| `crates/goose/src/agents/subagent_handler.rs` | +176/−70（净 +106）；`from_foreground_subagent_session(session_manager, session, use_login_shell_path)` 改为 `prepare_subagent(agent, session)`；`ForegroundSubagentRunner` 改名 `SubagentRunner` 并改为持有 `Arc<Agent>`；新增 `SubagentEnding`（含 `Drop` 兜底）、`forwarded`、`asks_for_a_decision` | `agents.invocation`、`agents.limits` |
| `crates/goose/src/agents/platform_extensions/summon.rs` | +27/−16；子会话创建时继承父会话 `goose_mode`（父 id 为空才回落 `Auto`）；`handle_foreground_delegate` 更名 `create_subagent`；委派结果文本与 provider 重建失败文案去掉 `foreground` 字样 | `agents.invocation`、`agents.limits` |
| `crates/goose-cli/src/session/mod.rs` | +1/−1；`mod tests` 内一处 `CliSession::new(Arc::new(agent), …)` 改为 `CliSession::new(agent, …)`，跟随 `Agent` 构造返回 `Arc` 的签名变化 | 无（测试代码） |

## 扩展依据

`subagent_handler.rs` 与 `openai.rs` 都显示已发布机制确实改变，因此按契约展开到同一机制的其余实现文件，未再扩大：

* 子代理侧：`crates/goose/src/agents/state_machine/ops_subagent.rs`（由 `ops_foreground_subagent.rs` 重命名，`SubagentOperation` 新增 `forward_tx`/`forwarded` 通道与 `DELEGATED_META_KEY` 常量）、`crates/goose/src/agents/agent.rs`（新增 `stream_subagent_turn` 与 `release_session`，`AgentConfig.is_subagent` 删除，`Agent::new`/`with_config` 返回 `Arc<Agent>`）、`crates/goose/src/agents/tool_confirmation_coordinator.rs`（turn 锁与 release）。
* Provider 侧：`crates/goose-providers/src/openai_compatible.rs`（`annotate_request_id`、流式路径写入 `usage.request_id`）、`crates/goose-providers/src/http_status.rs`（`extract_request_id`、`map_http_error` 增参、`request_id_message_suffix`/`parse_request_id_suffix`）、`crates/goose-providers/src/anthropic.rs`（流式 usage 写入）、`crates/goose-provider-types/src/{errors.rs,conversation/token_usage.rs}`（`details_mut()` 与 `ProviderUsage.request_id`）。

## 逐问题结论

| 固定问题 | 结论 | 依据 |
| --- | --- | --- |
| `providers.protocol` | **unaffected** | `crates/goose/src/config/*`、`crates/goose-providers/src/declarative.rs`、`model.rs`、`formats/`、`openai_compatible/` 子目录在该提交零 diff；openai/openai_compatible 的改动全部落在响应与错误路径，请求构造与端点拼接未动 |
| `providers.responses` | **changed** | 厂商 request id 从响应头（优先 `request-id`，回落 `x-request-id`，上限 128 字符）透传到错误文本（` (provider request id: …)` 后缀）与流式/非流式的 `ProviderUsage.request_id` |
| `providers.forwarding` | **unaffected** | 配置字段到请求的映射链路零 diff；新增的 `request_id` 是响应侧字段，不是配置项 |
| `agents.invocation` | **changed** | 子代理执行宿主从「为子代理新建 Agent」改为共享父 Agent；子代理的工具确认与 elicitation 请求经 `forwarded`/`ActionRequiredManager::forward` 上抛到父会话；子会话继承父会话 `goose_mode`；错误文案变更 |
| `agents.limits` | **changed（部分）** | max turns 解析链（`summon.rs` 的 `resolve_max_turns`、`subagent_task_config.rs`）逐行未变，默认值与优先级不变；新增两条约束：同一子会话同时只能跑一轮（`session already has an active turn`），以及中止时由 `Drop` 兜底执行 SessionEnd + `release_session` |

## 交付

* 新建完整 edition：`goose-cli-custom_agents-v4`、`goose-cli-custom_providers-v4`（v1–v3 全部保留，未原地修改）。
* 新增 17 条 `git_source_file` 引用与配套 snapshot/artifact，全部绑定提交 `4811ae25`，记录 commit + 仓库相对 file + content_sha256，无临时路径。
* `registry/chapter-current.yaml` **未切换指针**：两个 v4 edition 按契约保持 `review_status: pending`，等独立复核通过后由协调者选择。

## 排除

GDK `v0.1.0-alpha.12` 版本号与 `documentation/src/data/gdk-api.json`；各 crate 的 `Cargo.toml`/`CHANGELOG.md` 与 `Cargo.lock`；`ui/desktop/**`（含 i18n 文案与 provider 设置界面）；`crates/goose-agent/src/inference.rs` 与 `crates/goose/src/agents/gen_ai_telemetry.rs` 中 `gen_ai.request.id` 的遥测字段；`crates/goose/src/agents/state_machine/tests/**`、`crates/goose/tests/**`、`live_voice/service/tests.rs` 等测试；`elicitation.rs`、`execution/`、`providers/command_auth.rs`、`acp/`、`sdk` 绑定等非本范围改动。

## 复核

子代理执行宿主由独立 Agent 改为共享父 Agent、并新增跨会话决策请求转发，属于推翻已发布机制的关键调度路径变化；provider 侧的 request id 透传同样是已发布响应/错误机制的变更。两者按契约保持 `review_status: pending`，声明交由**独立 reviewer** 复核（本 worker 不自审替代）。作者侧自检已完成：`pnpm maintenance:candidates check --candidate …/candidates/goose` 通过。

## Blocker

无来源阻塞。