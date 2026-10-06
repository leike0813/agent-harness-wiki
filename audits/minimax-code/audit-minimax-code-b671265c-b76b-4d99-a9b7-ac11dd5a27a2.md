# MiniMax Code 本地 Transcript 首采报告 · 2026-10-06

## 给维护者的结论

这一轮的实质产出只有一个主题：给 MiniMax Code 补上此前缺失的第八个主题 `local_transcripts`，写出 `minimax-code-cli-local_transcripts-v1`。其余七个主题本轮不改写。

上游本轮确实动了：仓库从 `564e9166` 前进到 `185277170817`（45 个文件），npm 从 0.6.2 到 0.6.3。**这些变更对本地记录机制基本没有影响**——45 个文件里没有一个落在 `packages/local-runtime-v2` 的 `infra/file`、`infra/db` 或 `service/session-system` 存储模块。唯一沾边的是 turn 系统的压缩流程新增了「provider 图片上限拒绝后的恢复路径」，已写进 `transcripts.lifecycle`，它影响的是压缩能否成功，不改变已落盘记录的形状。

结论本身有三点值得记住：

1. **会话记录是「文件 + 库」的组合，不是单一存储。** 会话正文按会话存成 `<数据目录>/v2/sessions/<UTC 日期>/<HH-mm-SSS>-session_<base64url 会话 ID>/messages.jsonl`；会话身份、`history_relative_dir` 绑定、展示用消息行、附件索引、token 用量与 FTS 索引在 `v2/sqlite/runtime-state.sqlite`。恢复一个会话需要两者同时在场，而正文只有一份副本。
2. **没有任何自动保留策略会清理会话文件。** 保留任务明确把已迁移的会话历史排除在外，只裁剪 Turn Diff（7 天）与日志（7 天）。空间回收只能靠产品内的会话删除。
3. **删除的互斥只在进程内成立。** 删除闸门由拥有它的 local-runtime 进程协调，不持久化、不跨进程。手动删文件或删库行之前必须先退出使用同一数据目录的其它 MCode 进程，这一点已写进章节正文。

## 来源身份与证据边界

- 固定来源：`source-minimax-code-repo`，仓库 `https://github.com/MiniMax-AI/MiniMax-Code.git`，commit `185277170817c50e9dd5339c2893e850d610fa1e`，观察时间 2026-10-06。
- 工作区：只读 pinned 工作区 `ws-185277170817-379b6c18-85ea-4a9d-9f33-2651723a14ee`（由 coordinator 打开，本任务未新建工作区，任务结束后不自行释放）。
- 新增证据：57 条 `git_source_file` 引用、26 个文件 artifact、26 个 snapshot，全部由 `var/lt-refs.py` 生成，一个文件一个 artifact 一个 snapshot，`locator.file` 与 artifact 的 `file` 一致，excerpt 为该 commit 下真实行区间。
- **没有使用官方文档原件**：`archive/minimax-code/` 在本工作区不存在，按契约不得新建 `archived_document` 记录，因此本章没有任何文档来源证据。
- **没有写 `mappings/`**：源码 commit 不证明任何已发布 npm 包版本的行为，本轮也没有逐小节核对发行包。
- 版本适用性保持来源级：所有 snapshot 的 `version_identity` 是 commit，不是发行版本。

## Triage：为什么只有本地 Transcript 需要写

扫描器对两个 changed 来源给出的 impacts 覆盖全部八个主题，理由是「shared or unknown impact」。实际比对 `564e9166..185277170817` 的 45 个文件后分类如下：

| 变更位置 | 与八主题的关系 |
| --- | --- |
| `packages/agent-core/src/pi-turn-runner/*`（图片上限、重试、流超时、出站消息归一化） | 属于 `providers.*` 与 `agents.*` 的行为面，不改变会话记录的存储、格式、命名、数据库分工与删除机制 |
| `packages/local-runtime-v2/src/service/turn-system/compaction/*` | 压缩/检查点的**执行**路径变化，影响 `transcripts.lifecycle` 一节，不改变已落盘记录形状 |
| `packages/local-runtime-v2/src/service/model-system/resolution/*` | 模型解析，属 `providers.models` |
| `packages/tui/*`、`packages/config/src/config.ts`、`docs/*` | TUI 渲染与配置默认值，属 `hooks`/`configuration` 等已发布章节，本轮未改写这些章节 |
| `packages/protocol`、`pnpm-lock.yaml`、`release/public-source.json` | 无固定问题落点 |

已发布七章本轮**未改写**：它们的答案在新 commit 下依然成立，且本任务的授权范围只有 `local_transcripts`。如果后续要把压缩恢复路径与模型解析变化并入 `providers` 或 `agents` 章节，需要另开一轮针对那些主题的维护。

## 十题结论

| 题 | 状态 | 关键证据定位 |
| --- | --- | --- |
| `transcripts.scope` | answered | envelope 五字段、`turn_config` 仅挂用户消息、凭据类键落盘前剥离、数据库侧展示消息行与附件索引行、`mavis session messages` 读取入口 |
| `transcripts.location` | answered | `v2/sessions` 四段相对目录解析、`v2/sqlite/runtime-state.sqlite` 常量路径、`--continue` 按 `workspaceDir` 限定 |
| `transcripts.naming` | answered | UTC 日期目录 + `HH-mm-SSS` + `session_<base64url>`、`manifest.json` 身份字段、会话行的 `session_id`/`history_relative_dir`/`session_kind` CHECK |
| `transcripts.format` | answered | UTF-8 JSONL、`appendJsonl` 按会话串行且无跨进程写锁、替换走临时文件 + rename + revision 回读、损坏行按 `JsonlMalformedLine` 上报 |
| `transcripts.schema` | **partial** | envelope / `turn_config` / `history_artifact` / 消息行 / 附件行 / manifest 字段已固定；`message` 的字段级 schema、附件字节实际存放位置、旧记录迁移规则未由本轮来源覆盖（已在章节内逐条列出） |
| `transcripts.lifecycle` | answered | 目录与 manifest 创建并绑定、每轮追加、压缩先发布快照再替换、重启后 `compaction_start` 修正为 `compaction_failed`、`--session`/`--continue`、轮换、fork 父子与 `fork-origin`、子代理会话同库同目录 |
| `transcripts.database` | answered | SQLite 保存状态与索引（`columnar_version = 3` 索引族 + FTS5 `local_runtime_sessions_fts`）、正文只在文件、库可迁移重建而正文不能、迁移期在线备份路径与命名 |
| `transcripts.archive` | **partial** | 已查 `packages/tui/src/cli` 命令注册、内置 `mavis` 工具子命令表、数据库备份模块：未找到用户可见的会话归档开关或导出命令；进程内有只读历史导出投影但未见 CLI/工具暴露。剩余缺口：ACP 或桌面侧导出入口本轮未在 CLI 源码内核实 |
| `transcripts.cleanup` | answered | 官方删除是产品内会话删除并按序级联（画布/产物/diff/沟通/绑定/问卷/权限/goal/折叠/pin）、子会话改挂祖父、删除闸门只在本进程内准入拒绝、保留只覆盖 Turn Diff 与日志、历史目录删除的路径与身份校验、手动删除两侧不一致的后果 |
| `transcripts.diagnostics` | answered | `readCurrentHistoryExport` 只读当前 `messages.jsonl`、`PRAGMA integrity_check` 独立只读校验、`manifest` 身份比对、未绑定会话的 manifest 扫描索引、相对目录安全校验、日志与 `debug` 会被自动清理 |

## 复核结果

按第 4 节自检后结案，未触发第二 Agent 独立复核，理由是：本轮只新增一个主题的首采章节，没有改写任何已发布答案，没有来源互斥，没有新来源推翻既有配置或加载机制。逐条核对项：

- 57 条引用的 `locator.file` 与其 snapshot 绑定 artifact 的 `file` 全部一致；excerpt 逐字命中 pinned 源码并落在 `start`–`end` 内（1–800 字符）；26 个 artifact 的 `content_sha256` 与文件真实字节摘要一致。
- 无孤儿 artifact、无孤儿 snapshot；正文 57 个 `[@ref]` 标记与 57 个引用文件一一对应。
- 十题各一条答案，每条答案的 `source_refs` 都是其所在小节正文内的标记；selection 唯一。
- `pnpm maintenance:candidates check --candidate …/candidates/minimax-code` 通过。
- 既有七章、既有 artifact/snapshot/reference、catalog 均未改动（`knowledge/minimax-code` 下与项目数据集逐文件对比无差异）。

`pending_question_ids` 未新增本地 Transcript 条目（十题均已给出可用答案），其它六个主题遗留的 pending 题按契约保持不动，因此 `review_status` 保持 `pending`，未写 `reviewed_by`/`reviewed_at`。`status` 保持 `changed`，与 scan 写下的 checks 一致。

## 阻塞与剩余风险

- 无阻塞项。
- 剩余缺口已写进章节与本报告：`transcripts.schema` 的三处具体缺口、`transcripts.archive` 的 ACP/桌面导出入口未核实。
- npm 来源观察到 0.6.3，但本轮不做源码到发行包映射；受管包刷新属 `harness-binary` 职责，`delivery=pr` 未运行 `pnpm managed:packages`。
