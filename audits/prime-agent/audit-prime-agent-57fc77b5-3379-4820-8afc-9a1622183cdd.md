# prime-agent 维护报告：2026-10-22

- 审计：`audit-prime-agent-57fc77b5-3379-4820-8afc-9a1622183cdd`
- 固定来源：`source-prime-agent-repo` @ `8aac8692456c00c01d4e53e60e6d3347a3506559`（baseline `791ce3d8f93aa863af63271e4646e46e38032a86`），pinned workspace `ws-8aac8692456c-b6a88d9d-4bf3-4f85-9852-0d6d8dceb035`
- 范围：topic `configuration`（`config.defaults`）与 `local_transcripts`（`transcripts.database`、`transcripts.diagnostics`、`transcripts.lifecycle`、`transcripts.schema`）

## 语义 triage

提交区间共 547 个文件变化，其中 24 个被已发布章节引用。机制级变化集中在五处入口：
`crates/pa-core/src/settings/{types,interactive_settings,load,manager}.rs`、
`crates/pa-core/src/session_engine/{engine,compaction,mod}.rs`、
`crates/pa-core/src/session/manager/{append,lifecycle,queries}.rs`、
`crates/pa-daemon/src/session_store/{index,info,info_sidecar,view}.rs`、
`crates/pa-daemon/src/session_catalog.rs`、`crates/pa-daemon/src/rlm_ledger/replay.rs`。
`crates/pa-daemon/src/session_archive.rs` 整个文件被删除。

排除依据：其它被引用文件（`prompts/system_prompt.rs`、`refinement/mod.rs`、`worker/commands.rs` 等）的变化只涉及
提示词装配、refinement 状态保存与 worker 会话/RPC 细节，不改变本轮五个固定问题的答案，未据此改写章节。

## 结论

| 问题 | 结论 | 依据 |
| --- | --- | --- |
| `config.defaults` | 变化：新增 `compaction.thresholdPercent`（默认 95，1–100）、`harnessRefinements`（未设置=true，只读全局） | `settings/types.rs`、`session_engine/compaction.rs`、`settings/interactive_settings.rs` |
| `transcripts.schema` | 变化：新增 `tool_started` / `tool_progress` 两种 entry | `pa-types/src/session.rs`、`session_engine/mod.rs` |
| `transcripts.lifecycle` | 变化：工具行写入、用户行“先准入后重放”、恢复第三步只剩遗留归档兜底 | `session/manager/append.rs`、`session_engine/mod.rs`、`session_catalog.rs` |
| `transcripts.database` | 变化：索引加入父链、显示 transcript 分页、sidecar 版本规则/写者/折叠字段 | `session_store/{index,info,info_sidecar,view}.rs` |
| `transcripts.diagnostics` | 变化：新增 cold-scan 布尔、账本坏行跳过 | `session_store/info.rs`、`rlm_ledger/replay.rs` |

新 edition：

- `prime-agent-cli-configuration-v6`（旧 v5 未改字节）
- `prime-agent-local_transcripts-v4`（旧 v3 未改字节）

新增 15 个 `git_source_file` artifact / `source_revision` snapshot（均为 8aac869）与 24 条引用；无新增 mapping
（来源未标注发行版本）。

## 超出本轮派发范围的记录

`transcripts.archive`（本轮不派发的固定问题）描述的自动归档在本提交被整体移除：模块删除、两个设置键消失，
只剩对更旧版本写入的 `sessions-archive/` 的读取与恢复。为避免新 edition 继续发布已知不实的叙述，
在共享小节里补了一段明确标注的“本轮提交的移除”说明，并注明该问题未重审、需要单独派发；
该问题的答案状态与引用未改动，但已列入审计的 `pending_question_ids` 与 `impacts`，下一轮作为固定问题单独派发。

## 独立复核

`rev2-prime-agent` 于 2026-10-22 返回 `changes_requested`。五个固定问题（`config.defaults`、`transcripts.schema`、
`transcripts.lifecycle`、`transcripts.database`、`transcripts.diagnostics`）全部 upheld，没有 corrected/rejected；
要求修改的都是过程与披露项：审计保持 pending（不写 `reviewed_by`/`reviewed_at`）、披露 `session_usage.rs`
仍保留的相反 sidecar 版本口径、为恢复机制与 `KNOWN_FIELDS` 表补引用、把 `transcripts.archive` 列入
`pending_question_ids`、记录 `cross_topic_links` 的排除理由、把 cf119a 时代的“本轮提交”改为提交哈希、
为阈值 getter 补引用、修正 investigation notes 的路径、补 `harnessRefinements` 的 TUI 未声明面说明、
在例外表加入该键。以上均已应用；复核未结束，两个主题的当前选章回退到已发布版本（v5 / v3），新 edition 留在候选中等待复核。

## 核对边界

已发布引用都钉在更早的 snapshot 提交上，而 pinned workspace 是只含 baseline+HEAD 的浅克隆，
无法在这些提交上逐条复验行定位。本轮未删除或改写任何已发布引用。

## 校验

`pnpm -s maintenance:candidates check --candidate <candidate>` 通过。
