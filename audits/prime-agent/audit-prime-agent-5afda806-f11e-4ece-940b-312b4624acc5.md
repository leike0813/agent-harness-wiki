# prime-agent 巡检维护报告 audit-prime-agent-5afda806-f11e-4ece-940b-312b4624acc5

- 产品：`prime-agent`；triage 分类：`narrow_investigation`；任务：`monitor-20261013-prime-agent`
- 来源：`source-prime-agent-repo`（Git），`e41c9c4c6ccabf700f1dfdc1653e7ef9c5e96312` → `cf119a7a8c86a2c86d927cae79ed1eec03b07a91`，单提交 `configure session kernel bash shells (#3540)`，276 个文件
- 证据入口：pinned workspace `ws-cf119a7a8c86-71127ed7-e0d5-4de3-9c99-0ace4aa3bcc9`，全部结论用只读 `git diff` 与工作区实际字节核对，**未运行二进制、未重新扫描来源**
- 本轮问题范围：`config.sources`、`config.defaults`、`transcripts.location`、`transcripts.database`、`transcripts.cleanup`

## 逐文件差异（限已引证据文件）

| 文件 | 差异 | 与本轮问题的关系 |
| :-- | :-- | :-- |
| `crates/pa-core/src/settings/types.rs` | 删除 `DecisionApiSettings` 结构与 `Settings.decision_api`；`shell_path` 补注释：内核与用户 bash 共用、须绝对路径、启动时校验、项目设置覆盖全局 | config.defaults 变化 |
| `crates/pa-core/src/settings/manager.rs` | 新增 `pending_global_fields`；`save_global(fields)` 改为在存储锁内重读磁盘文档、只替换待写字段（`null` 删键）；新增 `settings_document()` 对坏 JSON/非对象返回错误；`persist_scope_field` 改走同一解析路径 | config.defaults / config.sources 的写入机制变化 |
| `crates/pa-core/src/settings/interactive_settings.rs` | 20 处全部是给 `save_global_scope` 传入被改字段名 | 无机制变化 |
| `crates/pa-core/src/session_engine/engine.rs` | 会话创建时 `resolve_kernel_bash_shell(settings.shell_path)` 一次性解析（失败即中止创建）；另删除 decision_api 处理、`prompt_guidelines` 改走 `append_system_prompt`、新增 RLM 与 turn-boundary 字段 | 仅 shellPath 一项入范围 |
| `crates/pa-daemon/src/session_store/read.rs` | 四处构造点补 `child_usage_recovery` 字段 + 一处 `clone_from` | 读取语义不变 |
| `crates/pa-daemon/src/session_store/info_sidecar.rs` | `INFO_SIDECAR_VERSION` 1 → 2（该文件唯一改动） | transcripts.database 变化 |
| `crates/pa-daemon/src/session_navigation.rs` | 全部是测试里删除 `decision_child` 字段 | 无 |
| `crates/pa-daemon/src/worker/commands.rs` | RLM progress-note 撤回、`get_messages` 参数化 | 无 |
| `crates/pa-daemon/src/worker/create.rs` | 删除 `decisionChild` 载荷解析与 `core.decision_child` | 无 |
| `crates/pa-core/src/prompts/system_prompt.rs` | 删除 `prompt_guidelines` 选项与 `additional-guidance` 段 | 无 |
| `crates/pa-cli/src/print_runtime.rs` | 模型选择改异步、新增三个 `None` 字段、拆出测试模块 | 无 |

## 四个机制问题的结论

**(a) 用户可见的配置键、默认值与优先级规则** — 有变化，且是可照做的步骤变化。`shellPath` 现在同时决定内核 `bash()` 与用户 bash 命令，取值必须是已存在的可执行文件绝对路径（`shell.rs:15-36`、`231-251`），且在会话创建时一次性校验、坏值让创建失败并点名该设置（`engine.rs:210-219`）。未配置时的默认值被拆成独立的 `default_kernel_bash_shell`（POSIX `/bin/bash`，否则 `/bin/sh`；`shell.rs:194-206`）。项目 `.prime/agent/settings.json` 覆盖全局值这一点由类型注释直接写明（`types.rs:330-338`）。此外 `decisionApi` 配置段被整体删除，加载器已知字段表同步移除该键（`load.rs:30-39`），源码未留迁移或告警。

**(b) 会话文件/记录写在哪里、什么格式** — 无变化。会话仍是每会话一个 `{uuid}.jsonl`，写入路径的追加与整文件重写分支都还在；本提交只是在这两条路径前加了一道“存在未确认归属则拒绝”的闸（`write.rs:29-36`、`107-114`）。`child_usage_attributed` 行的记录格式未变，变的是行的 id 语义（成为重试身份，`child_usage.rs:80-96`）与写入次数（一次且仅一次）。

**(c) 数据库或索引** — 无数据库；索引分工不变，但辅助状态 sidecar 的格式版本从 1 升到 2，动机是被折叠的 `UsageScan` 新增 `attributed_child_ids` 字段且 `retained_entries()` 口径扩大（`session_usage.rs:254-270`）。版本闸语义未变，旧 sidecar 整体退化为冷扫描。归属折叠改为按稳定行 id 只扣一次子用量，aggregate 仍按文件顺序覆盖（`session_usage.rs:288-306`）。

**(d) 删除/保留行为** — 无变化。删除仍走 `delete_saved_session` 的三道闸，归档仍是移动而非删除；本轮 diff 中没有任何归档、清理、保留策略文件出现。

**来源不保证的部分**：`shellPath` 校验只在源码层面取证，未在任一平台实跑；`shellPath` 相对路径只在内核解析里被拒，用户 bash 侧 `get_shell_config` 不检查绝对性；sidecar 升级后“每个会话首次打开变慢一次”是按版本闸语义推出的可观察结果，源码没有对升级做迁移。归档、删除与数据库三项的“不变”结论同样基于差异为空，不是运行时验证。

## 明确排除

`crates/pa-core/src/mcp/**`、`crates/pa-ai/src/oauth/**`、`crates/pa-ai/src/providers/**`：按任务排除条款处理。核对依据是这些路径不在本产品已发布章节的配置键/加载顺序/会话记录引用集合内，且本轮已核对的 `settings/**` 证据未显示它们改动了任何已发布的配置机制。若后续要扩到这些路径，需要新的固定问题，而不是本轮的扩范围。

另读到但未写入章节的两处（登记备查）：`pa-daemon/src/platform/paths.rs` 的 `socket_dir` 在非 Linux 上可能退回 `/tmp`；`state_restore_notice.rs` 的 `[python-state-restored]` 通知新增一行环境重置说明。两者都不属于本轮五个固定问题。

## 候选产物

- `knowledge/prime-agent/chapters/prime-agent-cli-configuration-v5.md`：v5 尚未合入 main，只存在于开放 PR 分支 → 按契约**就地修订**（新增 `shellPath` 段、`decisionApi` 移除说明、设置保存与拒绝回写的两条新证据），其余小节原文沿用。
- `knowledge/prime-agent/chapters/prime-agent-local_transcripts-v3.md`：v2 已合入 main → **新建完整 edition**，v2 保留。
- 新增证据：8 组 artifact/snapshot（钉在 `cf119a7a`，记 commit + 仓库相对 file + content_sha256，无临时路径）+ 14 条 reference。
- `registry/chapter-current.yaml`：`local_transcripts` 指向 v3；`configuration` 仍是 v5（就地修订，edition id 不变）。
- 未写任何 `mappings/`：来源是源码提交而非发行版快照。

## 复核

`review_status: pending`，提请独立复核。理由：`shellPath` 的新校验推翻了用户此前可照做的配置步骤（坏值从“每次 bash 报错”变成“会话创建失败”），设置保存语义与 sidecar 版本也改写了已发布机制，落入 maintenance 契约 §5 的高影响复核范围；本审计 `pending_audit_refs` 的三条旧审计自身仍是 `pending` 且无 `reviewed_by`，不能通过标 `reviewed` 间接关闭。

复核问题：① `shellPath` 的三种失败条件与生效时机表述是否与源码一致；② 设置保存“锁内按字段改写”是否被正确理解为保留并发写入而非整体覆盖；③ sidecar 版本 1→2 的失效后果表述是否越过了源码能保证的范围。

## 阻塞

无来源阻塞、无未完成问题（本轮五个固定问题全部结案）。
