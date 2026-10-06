# codex 审计报告 — local_transcripts 首采

- audit_id: `audit-codex-1d2b16ca-6d47-4dbe-873f-533a8c9297ab`
- checked_at: 2026-10-06T04:36:29Z
- status: changed（由 checks 决定，未改写）
- review_status: pending（其它主题仍有 pending 题，本轮不改）
- 本轮交付：产品 `codex`、`surface_id: cli` 的 `local_transcripts` 首采章节 `codex-local_transcripts-v1`

## 来源身份

- `source-codex-repo`（`https://github.com/openai/codex.git`）：baseline `b8dceb0d4f29e49e73daa08f57fcf5181186f354` → observed `822e58cc3d666166c7446c5b1ea2e52f5d09594c`，status `changed`，`remote_ref: refs/heads/main`。本轮调查在新 commit 上进行，新写快照 `snapshot-codex-repo-822e58cc`。
- `source-codex-cli-configuration-doc-learn`（`https://learn.chatgpt.com/docs/config-file/config-reference.md`）：`unchanged`，`73242945d789…`。`version_applicability: unknown`。
- `source-codex-cli-npm`：`0.160.0` → `0.160.1`，status `changed`。本轮**未**据此写任何 release 结论。
- `source-codex-cli-doc-learn`、`source-codex-cli-mcp-doc-learn`、`source-codex-cli-skills-doc-learn`：均 `unchanged`。

只读工作区：`/tmp/ahw-source-workspaces/ws-822e58cc3d66-9929b175-7eeb-4d67-9f99-7e5ef68ea817`（coordinator 打开）。

## Triage 理由

`source-codex-repo` 的 check 是 `changed`，但本轮不是既有章节的维护，而是 `local_transcripts` 主题的首采，因此不存在"旧结论是否被推翻"的问题。仍然逐入口核对了与既有七章共享的配置边界：`sqlite_home`、`history.persistence`、`history.max_bytes` 三个键同时出现在官方配置参考与既有 `configuration` 章节覆盖的键空间里，本轮只从 transcript 视角引用它们，合并与加载顺序仍归 `config.*`。

`source-codex-cli-npm` 的 `changed` 与本章节无证据关系：源码 commit 不能证明发行包行为，`snapshot-codex-cli-configuration-doc-learn` 的 `version_applicability` 为 `unknown`。因此未写 `mappings/`，npm 目标在 coverage 里记 `not_started` 并写明缺口。

## 受影响的题

十题全部给出可用答案，均归入新章节的七个 section：

- `answered`：`transcripts.scope`、`transcripts.location`、`transcripts.naming`、`transcripts.format`
- `partial`：`transcripts.schema`、`transcripts.lifecycle`、`transcripts.database`、`transcripts.archive`、`transcripts.cleanup`、`transcripts.diagnostics`

排除的题：无（十题都是本主题的必答题）。排除的界面：`vscode`、`desktop`、`cloud` 未调查，由查询层派生 `not_investigated`。

## 未消解的分歧

官方配置参考把 `history.persistence` 描述为 "Control whether Codex saves session transcripts to history.jsonl."，而源码 `codex-rs/message-history/src/lib.rs` 的模块文档把 `history.jsonl` 定义为 `{"session_id":…,"ts":…,"text":…}` 的全局用户输入历史，`codex-rs/config/src/types.rs` 的 `History` 结构注释也写作 "Settings that govern if and what will be written to `~/.codex/history.jsonl`"。

两者不是同一层的冲突：文档句是面向读者的概括，源码给出的是三字段 schema。章节按状态纪律以源码为准，并在 `transcripts-recording-scope` 里显式写出这个措辞差异，不判定任一方错误，也不据此推断 rollout 是否受 `history.persistence` 影响（源码里两者是不同的写入路径）。

## 证据与复核

- 46 条新 reference 全部通过自检：27 个 `git_source_file` artifact 的 `content_sha256` 由 pinned workspace 真实内容重算一致；每条 reference 的 `excerpt` 与原件/源码按行区间逐字比对一致，长度均在 1–800 字符。
- 正文 46 个 `[@reference-id]` 标记全部有对应 reference 文件，且全部落在某个 section 声明的 `source_refs` 内。
- `pnpm maintenance:candidates check --candidate <candidate root>` 通过（退出码 0）。
- 本轮为章节首采、状态全部可用、无来源失败，无需独立复核即可合入；`review_status` 保持 `pending` 是因为其它主题的 pending 题未清理，不是对本次首采的保留意见。

## 复核后修正：reference 与 snapshot 的绑定

coordinator 复核指出首轮把全部源码 reference 绑到同一个 `snapshot-codex-repo-822e58cc`（该快照固定的是 `codex-rs/rollout/src/lib.rs`），使多数 `locator.file` 与其快照实际固定的 artifact 文件不一致，读者按快照打不开定位的文件。已修正：

- 为 27 个被引用到的源码文件各建一个 `kind: source_revision` 快照，命名 `snapshot-codex-repo-822e58cc-<artifact slug>`，各自绑定该文件自己的 `git_source_file` artifact；`commit` 全部沿用 `822e58cc3d666166c7446c5b1ea2e52f5d09594c`，`content_sha256` 直接沿用已算好的真实值，未重算。
- 43 条源码 reference 的 `snapshot_id` 重绑到各自 `locator.file` 对应的快照；3 条 config-reference 文档 reference 继续绑定 `snapshot-codex-cli-configuration-doc-learn`。
- `reference_id`、`locator`（`file`/`start`/`end`）、`official_url`、`excerpt`、正文标记、section `source_refs` 与 impact `source_refs` 全部未改动。
- 孤儿 artifact 清理结果：0。27 个 artifact 全部仍被至少一条 reference 引用，没有需要删除的孤儿 artifact；既有 artifact 与既有 snapshot 未触碰。
- 仓库级 `snapshot-codex-repo-822e58cc` 保留，作为 `coverage-codex-repo-822e58cc-local-transcripts` 的 `snapshot_refs` 锚点。
- 修正后逐条自检：`locator.file` == 其 snapshot 绑定 artifact 的 `file`（43/43 一致）；`excerpt` 在 pinned 源码该文件原文逐字命中且落在 `start`–`end` 区间内（46/46）；artifact `content_sha256` == 该文件真实字节 sha256（27/27）；无孤儿 artifact。`pnpm maintenance:candidates check` 再次退出码 0。

## Blocker

无阻塞项。已知缺口（已写入对应小节，不构成阻塞）：

1. `ResponseItem` 与被保留 `EventMsg` 各变体的字段级 schema 未逐变体核对；`CompactedItem`、`HistoryPosition`、`ThreadHistoryMode` 的完整字段未核对。官方文档没有 rollout JSONL 的 schema 文档可对照。
2. 进程退出时最后一次刷盘的确切触发点未在固定来源中直接确认；压缩后继续追加时 ordinal 是否从原值续写未逐行核对。
3. `thread_history_1.sqlite` 是否为恢复会话的硬依赖未验证。
4. 归档文件复制到其它机器后的可移植性损失无官方证据；删除路径的级联范围未读完，不写"删除父线程会级联删子线程"。
5. 手动 `rm` rollout 文件后的孤儿行、索引漂移与修复路径未确认。
6. 项目根 `archive/codex/` 在本工作区不存在（`archive/` 被 `.gitignore` 忽略），配置参考原件实际只在同仓库 `harness-monitor` 工作树下只读可用；本轮未新增归档原件。
