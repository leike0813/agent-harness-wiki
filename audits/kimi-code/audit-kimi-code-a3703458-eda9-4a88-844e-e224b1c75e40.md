# Kimi Code 上游审阅报告 · 2026-10-22

## 给维护者的结论

`source-kimi-code-repo` 从 `d4b9dc4a` 前进到 `759958af`（474 个文件），其中两处改动落在本轮固定问题范围内，且都是机制级而非措辞级：

- **委派范围变成会随配置变化而变**：主 Agent 的子 Agent 允许列表不再只在会话创建/恢复时算一次，profile catalog 一变就重算；`Agent` 工具展示的工具清单也从静态注册表改成按运行时能力与模型能力过滤。
- **会话记录多了一层跨进程协作**：新增 `$KIMI_CODE_HOME/locks/sessions/{sessionId}.lock` 会话锁，append 日志获得写守卫与关闭丢弃、flush 卡住告警，`wire.jsonl` 新增 `changeNotifier.snapshot` 记录，归档/删除/分叉各自持锁租约，TUI 有占用/接管提示与运行中 `/compact` 排队。

据此新建两份完整章节版本（`kimi-code-cli-custom_agents-v4`、`kimi-code-local_transcripts-v2`），旧版本（v3、v1）原样保留，`kimi-code-cli-custom_agents-v4` / `kimi-code-local_transcripts-v2` 成为候选内的当前选择。**本轮没有关闭任何旧审计**：`review_status` 仍为 `pending`，`pending_audit_refs` 里的 `audit-kimi-code-93eb5dc0`（skills/native_plugins 结论改写待复核）与 `audit-kimi-code-0e5dd3dc`（只读观察轮，未派发维护，无候选产物）都保持未结案；`pending_question_ids` 为空只表示本轮没有新挂起的复核问题，不表示历史复核已完成。

## 变化的意义与证据边界

### 委派允许列表与 `Agent` 工具的相对可见性（custom_agents）

两处实现改动都落在 `packages/agent-core-v2/src/agent/profile/profileService.ts` 与 `.../agent/tools/agent/agentTool.ts`：

- `AgentProfileService` 在 profile catalog 变化时调用与绑定/恢复路径同一份 `refreshBoundSubagentAllowlist()`，把重算后的 `subagents` 写回绑定快照。因此同一会话内新建或删除 agent 文件后，主 Agent 的可委派范围会跟着更新，不必先恢复会话。
- `Agent` 工具展示的工具清单先按工具声明的运行时能力与 `when` 谓词过滤（`isToolAvailable`），用户来源（`source: 'user'`）的条目不被覆盖；`ReadMediaFile` 只在可能的子 Agent 模型支持图像/视频时出现，`SelectTools` 只在工具选择开关打开且子 Agent 模型同时具备 `dynamically_loaded_tools` 与 `tool_use` 时出现。
- 子 Agent 类型卡片的 `Tools:` 行总是逐个列出实际可用工具名，旧版「Tools: all」式的概括写法不再出现。

这两点同时改变了 `agents-invocation` 与 `agents-limits` 两节的结论：委派选择规则从「绑定时刻的快照」变为「会话内可刷新」，能力边界从「注册即可见」变为「同名工具在不同模型或开关组合下可能对子 Agent 不可见」。两问状态仍为 `answered`；`agents.diagnostics` 保持 `partial`——CLI 没有按来源列出 agent 文件的专用命令。

### 会话锁、写入守卫与新的 wire 记录（local_transcripts）

`packages/agent-core-v2/src/persistence/backends/node-fs/sessionLockService.ts` 与 `.../persistence/interface/sessionLock.ts` 引入的锁改变了本主题六个方面的答案：

| 方面 | 变化 |
| --- | --- |
| 位置与命名 | `locks/sessions/{sessionId}.lock`，内容是持有者 JSON（`version`、`token`、`pid`、`hostname`、`startedAt`、`clientIdentity`），锁 0600、目录 0700；认领期短暂出现 `.tmp-{pid}-{uuid}` 与 `.reclaim`。锁不在 `sessions/` 之下 |
| 生命周期 | 回合开始由 run gate `hold`，空闲 3 秒后先 flush 再释放；引用计数式 `hold`/`lease`，`takeover` 直接 evict；同主机按 pid 存活与开机时间判陈旧，跨主机一律视为存活 |
| 格式/写入语义 | append 日志支持写守卫，被拒绝时记录留在内存并告警；关闭时仍被拒的记录被丢弃；flush 超过 30 秒告警 |
| 记录面 | 新增 durable 记录 `changeNotifier.snapshot`，记录 AGENTS.md 哈希与分文件内容、技能清单哈希、可委派子 Agent 名单、模型池 |
| 归档/删除 | `archive()`、`delete()` 全程持锁租约；删除级联顺序不变；官方清理表仍未列出 `locks/sessions/`，删 `sessions/` 会留下孤儿锁；`KIMI_CODE_SESSION_LOCK=0` 可整体关闭 |
| 诊断 | `session.occupied`（带持有者信息，TUI 提供 Retry/Cancel 与重试时的接管）、`session.stale`（外部修改判定，SDK 重载后重试一次）、运行中 `/compact` 排队 |

`transcripts.archive`、`transcripts.schema`、`transcripts.diagnostics` 仍为 `partial`：仍无会话完整性校验命令、无 `session_index.jsonl` 与会话目录的对账步骤、无单锁清理命令；`context.append_loop_event` 等记录的完整字段集未在已引用片段中固定。

### 证据到哪为止

全部结论固定在 commit `759958afdfeb0f8c7d09cb03cbc2cf85b6255e9e` 的源码树（pinned workspace `ws-759958afdfeb-2a0a0fbb-af5e-4223-a1e7-1c98fde80e93`，界面 `cli`，distribution=source-tree，Linux x64）。旧章节的 15 条已发布引用固定在更早的提交（`21406fb4`、`c9f01f07`），其行定位在本轮提交上不再命中，已按新提交逐条重建并新增 23 条 reference，**未删除或改写任何旧 edition/引用**。官方文档类结论取自同一提交内 `docs/` 目录，项目 `archive/kimi-code/` 下没有对应归档原件，因此全部使用 `git_source_file` 证据，没有新建 `archived_document` 记录；原件保留在 pinned workspace，候选内只记 commit、仓库相对路径与 `content_sha256`（14 份 artifact 与 14 份 per-file `source_revision` snapshot）。

本轮未纳入：Web/桌面形态的 `KIMI_CODE_SESSION_IDLE_RECLAIM_MS` 空闲卸载（界面不在 catalog 登记的 `cli` 范围）、`experimental` Tower 多 Agent 协调（不在固定问题范围）。npm `2.2.0 → 2.3.0` 只记录发布身份，来源未标注软件版本，不据此推断行为，`mappings/` 未新增。

## 本次发布与保留

<!-- prettier-ignore -->
| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| custom_agents | kimi-code-cli-custom_agents-v4 | agents.invocation：answered；agents.limits：answered；agents.diagnostics：partial | 新建完整版本并成为候选当前选择；v3 保留 |
| local_transcripts | kimi-code-local_transcripts-v2 | transcripts.scope/location/naming/format/lifecycle/database/cleanup：answered；transcripts.archive/schema/diagnostics：partial | 新建完整版本并成为候选当前选择；v1 保留 |

**发布：** 本轮 `delivery=pr`，没有生成 release、没有运行 `pnpm ahw publish` / `chapters:update` / `managed:packages` / `sources:scan`。候选内 `registry/chapter-current.yaml` 已把两个主题切到 `kimi-code-cli-custom_agents-v4` 与 `kimi-code-local_transcripts-v2`，对读者生效要等合并；其余主题选择未动。**受管二进制：** 未触发，本轮没有 harness-binary 首次接入或版本更新操作，npm `2.3.0` 仅作为来源身份记录。

## 待处理与独立复核

**审计记录：** [audit-kimi-code-a3703458-eda9-4a88-844e-e224b1c75e40.yaml](./audit-kimi-code-a3703458-eda9-4a88-844e-e224b1c75e40.yaml)，`status: changed`、`review_status: pending`、`pending_question_ids: []`。**待处理旧审计：** [audit-kimi-code-93eb5dc0-e41b-49b6-a3db-662389fc6dbf](./audit-kimi-code-93eb5dc0-e41b-49b6-a3db-662389fc6dbf.yaml)（skills 限定名、插件名校验等结论仍待复核，其 `kimi-code-cli-skills-v2` / `kimi-code-cli-native_plugins-v2` 未被选为当前版本）、[audit-kimi-code-0e5dd3dc-24fa-419e-bba5-d44fdeb0a493](./audit-kimi-code-0e5dd3dc-24fa-419e-bba5-d44fdeb0a493.yaml)（只读观察轮，未派发，无候选产物）。本轮没有复核、也没有结案这两份。**待复核问题：** 无新增；但本次两份新版本改写了已发布的机制表述（委派范围可刷新、工具可见性按能力过滤、会话写入受锁守卫、关闭可能丢弃未刷盘记录），属高影响变更，交独立 reviewer 在合并前只读核对。

## 来源核查记录

<!-- prettier-ignore -->
| 来源 | 基线 → 观察 | 扫描结果与实际内容变化 |
| --- | --- | --- |
| source-kimi-code-repo（git_repository，refs/heads/main） | `d4b9dc4a2d6ff72413964feda2563f0adf8e04d2` → `759958afdfeb0f8c7d09cb03cbc2cf85b6255e9e` | changed；474 个改动文件；命中 `profile/profileService.ts`、`agent/tools/agent/agentTool.ts`、`persistence/**/sessionLockService.ts`、`persistence/interface/sessionLock.ts`、`sessionLifecycleService.ts`、`appendLogStore.ts`、`wireService.ts`、`kimi-tui.ts` 等；其余 UI/呈现、遥测、survey、kap-server 业务改动不在两个主题的固定问题内 |
| source-kimi-code-legacy-repo（git_repository，refs/heads/main） | `9ab1286b8fe4e6bcd116949a27ce5e0ac3389c82` → 同值 | unchanged；无内容变化 |
| source-kimi-code-npm（npm_registry） | `2.2.0@sha512-I1w2l6…j6LT0A==` → `2.3.0@sha512-/70t2b…MqAJrA==` | changed；只记录发布身份与 dist 摘要，未解包比对，不据此推断任何行为 |

## 验证与差异入口

- 作者自检（记录于审计 YAML，本轮未重跑）：`pnpm -s maintenance:candidates check --candidate <candidate_root>` 通过；每个新增引用的 `file/start/end` 与 `excerpt` 已在 `759958af` 上逐行核对，章节 `questions/sections` 引用闭包一致。
- 本轮只写本报告，不运行构建、lint 或测试套件；除本文件外候选内无改动。
- 章节与来源差异：
  - `diff -rq batch-20261022/baseline/kimi-code/knowledge/kimi-code/chapters batch-20261022/candidates/kimi-code/knowledge/kimi-code/chapters` → 仅新增 `kimi-code-cli-custom_agents-v4.md`、`kimi-code-local_transcripts-v2.md`。
  - `diff -u batch-20261022/baseline/kimi-code/registry/chapter-current.yaml batch-20261022/candidates/kimi-code/registry/chapter-current.yaml` → 两行 edition_id 切换。
- 新增证据：[kimi-code-cli-custom_agents-v4.md](../../knowledge/kimi-code/chapters/kimi-code-cli-custom_agents-v4.md)、[kimi-code-local_transcripts-v2.md](../../knowledge/kimi-code/chapters/kimi-code-local_transcripts-v2.md)、`knowledge/kimi-code/references/` 下 23 条新引用、`artifacts/` 与 `snapshots/` 各 14 份。
- 本地 diff 与未跟踪文件：`git -C /home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor status --porcelain`，`git -C /home/joshua/orca/workspaces/agent-harness-wiki/harness-monitor diff -- <path>`。
