# zed 巡检维护报告：audit-zed-df9eea77-3ccc-416d-b90e-8b2e5d137597

- harness: `zed`（catalog 唯一界面 `zed`，kind `ide`）
- 检查时间：2026-10-08T18:04:24.870Z
- 上一轮审计：`audit-zed-20261006t134000z`
- 状态：`changed`；复核状态：`pending`

## 1. 来源身份变化

| 来源 | 类型 | 基线 | 观察值 | 结论 |
| :-- | :-- | :-- | :-- | :-- |
| `source-zed-repo` | git_repository | `0418cb5b60e89278e95af1a7b73382343e122ba8` | `b47a4ca595d3a3fba116b9e78ef01a46e2e43f3e` | changed，162 个文件 |
| `source-zed-docs-{skills,mcp,agents,providers,hooks,plugins,config}` | official_documentation | 与观察值一致 | 同左 | unchanged |

HEAD 提交的说明是 git_ui 的分支选择器文案澄清，但那只是末次提交的信息，不代表本轮 162 个文件的全量语义；本轮按 triage 要求对重点文件逐个 diff 判定。

固定源码读取自 coordinator 提供的 pinned workspace `ws-b47a4ca595d3-4db04aca-01e3-4408-96e4-b25ca0d17880`（commit `b47a4ca`，baseline `0418cb5`）。worker 未运行 `pnpm sources:scan`、未打开新 workspace、未联网。

## 2. 重点文件的语义 triage

### 2.1 `crates/agent/src/agent.rs`（+361）— 有实质变化

绝大多数新增行是测试与 ACP v1→v2 的类型重命名（`acp::` → `acp_v2::`，不改变可观察行为）。唯一改变运行时语义的是新增的保存抑制机制：

- `Session` 增加 `last_streaming_save_key: Option<StreamingSaveKey>` 与 `last_draft_prompt_revision: Option<usize>` 两个字段（238-239）。
- 新增 `can_skip_save_while_streaming`（259-268）：当线程存在进行中的消息、且 `StreamingSaveKey` 与上次入队时完全相同、且 ACP 线程草稿修订号未变时返回 `true`。
- `save_thread`（1824-1834）在该判定为真时直接返回，不发起保存。
- `enqueue_save`（1854-1855）在真正入队时把当时的 key 与草稿修订号记为下一次比较的基准。

这改变了「线程状态一变就写库」这一既有描述：流式期间观察回调的高频 notify 不再产生磁盘写入。

### 2.2 `crates/agent/src/thread.rs`（+68）— 有实质变化

- 新增 `StreamingSaveKey` 结构（1273-1287），显式把 token 用量与滚动位置排除在比较之外，注释说明原因是二者会随每个流式分片或每次滚动变化。
- 新增 `is_streaming_message()`（1981-1983，判据是 `pending_message.is_some()`）与 `streaming_save_key()`（1985-1998）。
- `flush_pending_message`（4114-4124）在待写消息内容为空时改为 `cx.notify()`，注释明确这是为了在被抑制的保存之外把期间累积的 token 用量落盘。
- `to_db` 上方新增契约注释（1945-1947）：新增字段必须同步进 `StreamingSaveKey`，除非可以等流式结束。
- 其余为 `acp_v1`→`acp_v2` 类型迁移、`ToolInput::recv` 循环改写、compaction summary 类型改为 `MessageContent`。`Message` 枚举与 `CompactionInfo` 定义与基线逐行一致。

### 2.3 `crates/agent/src/db.rs`（+12）— 明确排除

全部新增行是 `#[cfg(test)]` 的 `save_count` 计数器及其读取方法（660-663）。`DbThread` 字段集合、`Message` 枚举、写入版本号 `0.3.0` 与 `save_thread` 的公开行为均未变化，因此 `transcripts.schema` 的结论不变。

### 2.4 `crates/agent_ui/src/*` — 显示层，排除

- `thread_metadata_store.rs`：`worktree_info_from_thread_paths` 调用 `linked_worktree_short_name` 时显式传入 `PathStyle::local()`（386-388）。该函数签名新增 `PathStyle` 参数（`git_store.rs`），默认走本机风格；本调用点传入本机风格，行为与基线一致，只是把隐式默认显式化。短名只用于显示，不进入持久化记录。
- `threads_archive_view.rs`：仅新增 `.base_bg(cx.theme().colors().panel_background)`，纯配色。
- `agent_panel.rs`：仅测试代码里的 `acp_v2::AuthMethod` 签名迁移。

### 2.5 `crates/project/src/context_server_store.rs` — 超出本轮范围

新增 `RemoteStdioLauncher` 与 `launcher` 字段，属于 context server（MCP 主题）在远程环境下的 stdio 启动路径。本轮 scope 为 `custom_agents` 与 `local_transcripts`，未展开调查；该文件不命中 local_transcripts 已登记的会话存储小节，也不命中 custom_agents 的定义入口小节。

## 3. 问题结论

| 问题 | 结论 | 依据 |
| :-- | :-- | :-- |
| `transcripts.lifecycle` | 有变化，已维护 | `can_skip_save_while_streaming`、`StreamingSaveKey`、入队基准记录、空内容 `notify` |
| `transcripts.schema` | 无变化，已排查 | `db.rs` 仅 `#[cfg(test)]` 计数器；`Message`/`CompactionInfo`/`version 0.3.0` 与基线一致 |
| `transcripts.archive` | 显示层细化，已维护 | worktree 短名推导显式固定 `PathStyle::local()`；归档开关与删除路径未变 |
| `transcripts.location` | 无变化，已排查 | `crates/util/src/paths.rs` 的改动属 `PathWithPosition` 解析，与数据目录/`threads.db`/`db.sqlite` 路径解析无关 |
| `agents.entry` | 无变化，已排查 | `crates/settings_content/src/agent.rs`、`crates/agent_servers/src/{custom.rs,agent_servers.rs}` 未出现在 162 个变更文件中 |
| `agents.limits` | 无变化，已排查 | `crates/agent/src/tools/spawn_agent_tool.rs` 未改动；`thread.rs` 变更中无常量变化，`max_idle_retained_threads` 保持默认 5 |

## 4. 候选变更

- 新建章节 `zed-local_transcripts-v2`（基于当前选中的 `v1` 修订，`v1` 原文件保留），更新 `transcripts-lifecycle` 与 `transcripts-record-schema`、`transcripts-archive-restore-cleanup` 三节。
- 新增 9 条 `git_source_file` 证据引用，固定 commit `b47a4ca595d3a3fba116b9e78ef01a46e2e43f3e`、仓库相对路径与 `content_sha256`；配套 6 条 snapshot 与 artifact 记录。未把任何 checkout 复制进候选。
- `registry/chapter-current.yaml` 的 `local_transcripts` 选章切到 `v2`。
- 自定义 agent 章节 `zed-zed-custom_agents-v1` 未改动：本轮无证据支持变更。

## 5. 版本映射

本轮未新增软件版本映射。源码 commit 只证明源码树；该产品的官方文档来源本轮 unchanged 且无版本号，不足以支撑发行包映射。

## 6. 复核与阻塞

- 复核状态保持 `pending`：本审计仍 `pending_audit_refs` 引用四条 `review_status=pending` 的旧审计，未写 `reviewed_by`/`reviewed_at`。
- 本轮变更不涉及来源冲突、已发布配置步骤的推翻或跨主题关键加载机制改变，因此不需要高影响独立复核。
- 无 blocked 问题：`pending_question_ids` 为空。
