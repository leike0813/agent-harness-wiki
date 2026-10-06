# Qwen Code 本地 Transcript 首采报告 · 2026-10-06

- 审计记录：`audit-qwen-code-0cd93675-58bd-4a50-a4da-f9619039fe0c`（status `changed`，review_status `pending`）
- 本轮观察：`source-qwen-code-repo` 从基线 `35616f3b643f6d87cc00112d961a0fbb448aca00` 前进到 `18dc7775e5a2d5d49edda57096ca7265803259cf`；`source-qwen-code-npm` 从 `0.24.7` 前进到 `0.25.0`
- 协调者语义 triage：`local_transcripts` 首采（此前无该主题章节）
- 交付方式：`delivery=pr`，未切换本地发布指针、未更新受管二进制

## 结论

新建章节 `qwen-code-local_transcripts-v1`，覆盖 6 个小节与十个固定问题，其中 7 题 `answered`、3 题 `partial`，没有 `unknown` 与 `not_applicable`，因此未退回 blocked，并在 candidate 的 `registry/chapter-current.yaml` 追加了 local_transcripts selection。

| 问题 | 状态 | 主要证据 |
| --- | --- | --- |
| `transcripts.scope` | partial | `general.chatRecording` 开关、`ChatRecord` 字段与 `subtype` 闭集 |
| `transcripts.location` | answered | `getRuntimeBaseDir` / `getGlobalQwenDir` / `getProjectDir` 拼接与官方 headless 文档一致 |
| `transcripts.naming` | answered | 会话 ID 正则、`sanitizeCwd`、旁挂后缀、`parent_session` 载荷、subagent 目录布局 |
| `transcripts.format` | answered | JSONL 追加 + 每条 fsync，整体覆盖走原子写 |
| `transcripts.schema` | partial | 记录身份、载荷族、压缩与分支检查点载荷；记录本身无版本字段 |
| `transcripts.lifecycle` | answered | `wx` 独占建档、写入队列、`flush()`、压缩追加、分叉新 ID |
| `transcripts.database` | answered | 会话层无数据库；仓库内唯一 SQLite 在 `packages/qwen-live/src/memory/` |
| `transcripts.archive` | answered | `chats/` ↔ `chats/archive/` 移动语义与 409 契约 |
| `transcripts.cleanup` | partial | 删除语义、写入者围栏、无强制解锁；两处来源对 file-history 说法不一致 |
| `transcripts.diagnostics` | answered | `qwen sessions list/ps` 输出、写入失败提示、锁路径诊断 |

## 来源身份与证据边界

固定来源只有 `QwenLM/qwen-code` 的提交 `18dc7775e5a2d5d49edda57096ca7265803259cf`（抓取时间 `2026-10-06T04:34:54.138Z`），在 coordinator 已打开的只读 pinned 工作区中调查，未新建或释放工作区，未把临时路径写入任何记录。新增 14 个 `git_source_file` artifact 与 14 个 `source_revision` snapshot——每个被引用的文件各一个快照，每条 reference 的 `locator.file` 与其 `snapshot_id` 所绑定 artifact 的 `file` 一一对应；新增 45 条 reference，excerpt 均由固定提交原文按声明行区间逐字截取、长度落在 1–800 字符，`content_sha256` 由真实文件字节计算。

npm 侧观察为 `0.25.0`，但源码 commit 不自动证明发行包行为，本轮没有逐小节证据把任何结论对应到发行版本，因此未写 `mappings/`。结论只覆盖 `cli` 界面；catalog 中 `vscode`、`jetbrains` 两个界面本轮无证据，未写答案，由查询侧派生为 `not_investigated`。平台边界：源码对项目标识的大小写折叠只发生在 Windows，本轮只在 Linux 上核对文件内容，未在 Windows 或 macOS 执行，因此不给出这两个平台的实测结论。

## 两处未解决的分歧

两处都发生在同一提交内部，因此不构成"来源冲突"，但会影响读者按章节操作后的结果，均未在正文中择一断言。

**其一：会话目录的注释与代码不一致。** `packages/core/src/services/sessionService.ts` 第 855 行的类注释仍写 `File location: ~/.qwen/tmp/PROJECT_ID/chats/`，而同文件的 `getChatsDir()` 返回 `projects/SANITIZED_CWD/chats`，官方 `docs/users/features/headless.md` 也写 `~/.qwen/projects/SANITIZED_CWD/chats`。章节按可执行代码与官方文档给结论，并把该注释标为过期。判断：注释陈旧，但建议上游修正，以免读者按注释去备份错误路径。

**其二：删除是否连带 file-history，两处来源说法不一致。** `docs/developers/daemon/08-session-lifecycle.md` 描述 `POST /sessions/delete` 时称会"保留 file-history 快照、subagent transcript 与运行期旁挂文件"；而 `SessionService.cleanupRemovedSessionFiles` 显式调用 `removeFileHistoryBackups`，按 `GLOBAL_QWEN_DIR/file-history/SESSION_ID` 递归删除，旁挂清理范围（提示词账本、PR 旁挂、受管资源根）也比文档描述更宽。本轮无法判定哪条描述对应读者实际触发的删除路径——可能分别对应不同调用方，也可能是文档简写——因此 `transcripts.cleanup` 记 `partial`，正文并列陈述两者而不给出"删了会怎样"的确定结论。判断：这是需要上游或下一轮带调用链证据才能收敛的真问题，不应在证据不足时替上游选一个答案。

## 复核与风险

- 独立复核判断：本轮是**新主题首采**，不涉及推翻任何已发布章节结论，也未改动其它七章，因此三项高影响触发条件（推翻已发布配置步骤、跨主题机制变化、来源冲突）逐条核对后均不成立。`transcripts.cleanup` 的分歧是新章节内部的证据缺口，不是与已发布内容冲突。
- 状态偏保守的三处都写明了已查入口：`transcripts.scope` 无法从固定来源穷尽"从不落盘"的清单（遥测与调试日志不在本章逐项审计范围）；`transcripts.schema` 因记录无版本字段且无第一方迁移规则而无法回答版本迁移；`transcripts.cleanup` 因上述分歧无法给出级联副作用的确定结论。
- 已确认不是问题的两点：会话 transcript 不使用数据库（`packages/core` 与 `packages/cli` 无任何 SQLite 依赖）；子代理事件不写入主会话 transcript，而落在 `projects/SANITIZED_CWD/subagents/SESSION_ID/` 下，父会话只保留一条 `parent_session` 记录。
- 未查证项：交互式 CLI 是否有归档／删除入口（本轮在 `packages/cli/src/ui/commands/` 未找到，调用方都在 `qwen serve` 侧）。按状态纪律，"没找到"不等于"不支持"，正文未据此下结论。
- 本轮未运行 `sources:scan`、`publish`、`chapters:update` 或 `managed:packages`，未切换任何发布指针，未执行真实 harness，未读取维护者真实会话文件；写入范围仅限 candidate root。