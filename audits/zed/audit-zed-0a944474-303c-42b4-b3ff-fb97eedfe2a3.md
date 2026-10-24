# zed 维护报告（audit-zed-0a944474-303c-42b4-b3ff-fb97eedfe2a3）

## 观察与来源身份

- 只读观察：2026-10-22T12:57:21.366Z，会话 `4d765ae2-4466-41a5-951d-ac0df68377b4-alDEns`。
- `source-zed-repo`：`e463c5ab74e016f6a16e02a8b21925b98643f9c7` → `50304070c283519f2f2338b45671af26374025fe`（refs/heads/main，335 个 changed paths）。
- `source-zed-docs-config`：`8ac80db4…` → `f91bb517…`，属 `configuration` 主题，本轮不派发，未处理。
- 其余七个官方文档来源（skills、mcp、agents、providers、hooks、plugins）hash 未变。
- 固定源码 workspace：`ws-50304070c283-68b31bee-f96c-48a7-a22c-c548eb32c44e`（owner 为本轮 coordinator，worker 只读）。

## 语义 triage

changed paths 与被章节引用的文件求交后，逐个读取实际内容：

| 文件 | 结论 |
| :-- | :-- |
| `crates/extension/src/extension_manifest.rs` | 新增 `populate_defaults`，清单的一批字段改由目录布局在编译期派生；`SchemaVersion::CURRENT` 仍为 1。机制级变化。 |
| `crates/extension/src/extension_builder.rs` | `compile_extension` 首步调用 `populate_defaults`（开发扩展安装/rebuild 与 CLI 打包共用）。机制级变化。 |
| `crates/agent/src/agent.rs` | `Session.subagents` 改为 `execution: Option<NativeExecution>`；新增 `NativeRetryAction`（含 `Skill` 分支）、`cancel_session`、`CancellationRequested` 订阅、`prepare_local_turn` 调用点；`skill_body_resolver_for_project` 增加 worktree 信任校验。保存管线（`release_session`/`save_thread`/`enqueue_save`/`run_save_worker`/`quit` 刷盘）逻辑未变、仅行号漂移。 |
| `crates/agent/src/thread.rs` | `StreamingSaveKey` 增加 `retained_history_revision`；`cancel` 的刷盘按 prompt id 设栅栏；新增 `request_cancel`；晚到工具结果回填冻结的所属助手消息；`prepare_local_turn`；手动 `/compact` 标记改走 `upsert_user_message`。 |
| `crates/acp_thread/src/acp_thread.rs` | 父线程以 `subagents` 索引持有子会话（`register_subagent`），属内存归属；ACP v2 投递/本地动作状态重写，未改持久化。 |
| `crates/extension/src/extension_manifest.rs`（v0 分支） | `extension.json` 清单先清空 languages/grammars/themes，再由 `grammars/*.toml` 重建 grammars。 |
| `crates/agent/src/db.rs` | baseline..5030407 无改动：`DbThread` 字段与 `VERSION = "0.3.0"` 不变。 |
| `crates/agent/src/tools/skill_tool.rs`、`crates/agent_skills/*`、`assets/settings/default.json` | 与 skills 主题相关的技能目录/预算/磁盘读取逻辑未变；`default.json` 改动不落在本轮固定问题上。 |

行号漂移（`agent.rs` +2148、`acp_thread.rs` +2336 行）导致大量已发布引用的行定位在新提交上不再命中，但这些引用各自固定在旧 snapshot 上，仍可读、仍支持原结论，因此没有逐个重建。只对“需要描述新机制”的事实新建同文件、同提交 `50304070…` 的 `git_source_file` artifact + `source_revision` snapshot + reference。

## 受影响问题与处理

| 主题 | 问题 | 结论 | 处理 |
| :-- | :-- | :-- | :-- |
| native_plugins | `plugins.package` | changed（`partial` 保持） | 新 edition `zed-zed-native_plugins-v3`，改写 `plugins-package` 一节 |
| skills | `skills.loading` | changed | 新 edition `zed-zed-skills-v2`，改写 `skills-loading-invocation` 一节 |
| local_transcripts | `transcripts.lifecycle` | changed | 新 edition `zed-local_transcripts-v4`，改写 `transcripts-lifecycle` 一节 |
| local_transcripts | `transcripts.scope` | unchanged | 已发布 edition 保留 |
| local_transcripts | `transcripts.schema` | unchanged（仍 `partial`） | 已发布 edition 保留 |
| skills | `skills.extensions` | unchanged | 已发布 edition 保留 |
| skills | `skills.diagnostics` | unchanged | 已发布 edition 保留 |

同一章内未受影响的小节按原样保留在新 edition 中，未改写、未重审。

## 新增证据（全部固定在提交 50304070c283519f2f2338b45671af26374025fe）

`git_source_file` artifacts：`artifact-zed-agent-rs-5030407`、`artifact-zed-agent-thread-rs-5030407`、`artifact-zed-acp-thread-rs-5030407`、`artifact-zed-extension-manifest-rs-5030407`、`artifact-zed-extension-builder-rs-5030407`。

references：

- 插件：`ref-zed-plugins-manifest-populate-defaults`、`ref-zed-plugins-manifest-derived-dirs`、`ref-zed-plugins-manifest-legacy-grammars`、`ref-zed-plugins-manifest-dev-compile`、`ref-zed-plugins-manifest-context-entry`。
- Skill：`ref-zed-skills-body-trust`、`ref-zed-skills-retry-action`、`ref-zed-skills-retry-reexecute`。
- Transcript：`ref-zed-lt-streaming-save-key-rev`、`ref-zed-lt-late-tool-result-owner`、`ref-zed-lt-cancel-prompt-fence`、`ref-zed-lt-cancel-session`、`ref-zed-lt-save-observer-subscriptions`、`ref-zed-lt-prepare-local-turn`、`ref-zed-lt-register-subagent`。

## 自检

- `pnpm -s maintenance:candidates check --candidate <candidate>` 通过。
- 逐节核对新增参考与正文 `[@…]` 标记、answer `source_refs` 与 section `source_refs` 的一致性；确认新 edition 的 options 与正文没有原始 HTML。
- 高影响独立复核：本轮无来源冲突、没有推翻已发布配置步骤、也没有跨主题关键加载机制变更；三个结论都限定在各自主题的机制内，作者自检记录 reviewed_by/reviewed_at。

## 未完成事项

- `config.migration`（见 `audit-zed-89b88422…`、`audit-zed-ef49024f…`）与 `source-zed-docs-config` 的变化不在本轮派发范围，未处理；两条旧审计自身仍为 `review_status: pending`。
- `plugins.package` 仍缺官方文档对 `opt_in_languages` 与目录派生规则的确认；`transcripts.schema` 仍缺沙箱授权结构、初始项目快照与 `request_token_usage` 键形态的逐字段取证。
