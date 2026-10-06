# Cline 上游巡检报告 · 2026-10-06

- 审计记录：`audit-cline-aa3cc0d5-108c-41d3-a6a7-5cc6bcfc33de`（status `changed`，review_status `pending`）
- 本轮观察：8 个登记来源，其中 3 个 changed
- 协调者语义 triage：源码与 CLI 文档均有推进，交回隔离候选做 `local_transcripts` 首采
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制、不执行真实 harness

## 来源身份变化

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-cline-repo` | git_repository | changed | `39ff2359f7e08231281539696e48a166ce49270c` | `dec80dadfa4fcb5ec6978aa7055406709dddd43d` |
| `source-cline-docs-mcp` | official_documentation | changed | `a546d29285e6a185c5e61b26008cc649c3624914d65e8c621bab0ef6ccb49fb1` | `d47383fc4419cb67e5b61abbd66fab303174003eae49e99be446f040cd4e313c` |
| `source-cline-docs-cli` | official_documentation | changed | `6f91aaa468e08e7e…` | `dbb4abba8b3362695fa57dc4f17fe976aecd80132954d00675fb3f7cfabd4914` |

## 语义 triage 与理由

`local_transcripts` 在本产品此前没有任何章节，查询只能派生为 `not_investigated`。源码推进到 `dec80dad` 且 CLI 参考文档重新抓取，两者都触及会话记录的路径与布局描述，因此本轮按首采处理：只调查 catalog 中的 `cli` 界面，其余三个界面不写答案。

## 受影响与排除的题

- 受影响并成稿：`transcripts.naming`、`transcripts.format`、`transcripts.lifecycle`、`transcripts.database`（`answered`）。
- 受影响但降级：`transcripts.scope`（未找到关闭落盘的开关）、`transcripts.schema`（消息数组内部逐字段 schema 未取证）、`transcripts.archive`（无原生归档开关）、`transcripts.cleanup`（未找到自动保留期或批量清理）、`transcripts.diagnostics`（无记录完整性检查入口）——均为 `partial`。
- 记为 `conflict`：`transcripts.location`。官方 CLI 参考文档把 `~/.cline/data/sessions/` 标注为 “Session database (SQLite)”，固定源码把 SQLite 文件解析到 `CLINE_DB_DATA_DIR` 或 `<数据根>/db/sessions.db`，把 `sessions/` 用作逐会话产物目录。文档快照未标注适用版本，源码 commit 只代表源码树，两者适用边界无法由本轮证据判定。
- 排除：其它七个主题的答案未改写（既有章节仍为当前版），本轮只新增 local_transcripts 的 impact。

## 证据

- 源码：45 条 `git_source_file` 引用，分布在 22 个文件上，每个文件一个 artifact 与一个 snapshot，commit 与 `content_sha256` 取自 pinned 工作区 `dec80dad` 的真实字节。
- 官方文档：1 条 `archived_document` 引用，取自本轮归档的 `https://docs.cline.bot/cli/cli-reference.md` 原件（sha256 `dbb4abba…`），`version_applicability: unknown`。
- 未写 `mappings/`：`source-cline-npm` 本轮观察到 `3.0.68`，但未固定也未比较包内容，源码 commit 不证明发行包行为。

## 复核结果与 blocker

- 自检：逐条核对 `locator.file` 与其 snapshot 绑定 artifact 的 `file`、excerpt 逐字命中且落在 `start`–`end` 内、artifact `content_sha256` 与真实字节一致、无孤儿 artifact、正文标记与 `sections[].source_refs` 及各题 `source_refs` 双向一致；`pnpm maintenance:candidates check` 通过。
- 复核需求：不需要独立复核。本轮是新增主题的首采，未改写任何已接受答案，也未触碰高影响的既有 Claim。
- blocker：无来源阻塞。遗留缺口是上面列出的六条 partial/conflict，需要下一轮针对固定问题继续取证；`pending_question_ids` 因此新增 6 条 local_transcripts 题，其余 53 条其它主题的 pending 未改动，`review_status` 保持 `pending`。
