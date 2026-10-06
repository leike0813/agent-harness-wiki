# 审计：audit-kiro-a0cd3d52-4e56-4a01-8aa5-13a6f3a8c8dc

## 来源身份与本轮观察

本轮对 Kiro 的 44 个已登记官方文档来源做了检查，YAML 中的 `checks` 照录 scan 结果：8 个来源 `status: changed`，其余 `unchanged`，无 `blocked`。变化的 8 个来源是 `source-kiro-docs-cli-v3-agent`、`source-kiro-docs-exit-codes`、`source-kiro-docs-headless`、`source-kiro-docs-install`、`source-kiro-docs-models`、`source-kiro-docs-settings`、`source-kiro-docs-slash-commands`、`source-kiro-docs-steering`，每条都带 `candidate_path`，原件保存在项目根 `archive/kiro/artifact-source-<source-id>-<observed 前缀>/source.md`。

已登记的旧 `archived_document` 记录指向 `archive/kiro/artifact-<artifact-id>/raw.md`，这些字节已不在工作区，因此本轮没有在任何新结论里引用无法逐字核对的旧快照。

## 受影响与排除的题

本轮写入 `local_transcripts` 首采章节 `kiro-local_transcripts-v1`，只覆盖 `surface_id: cli`，十题全部给出答案（`lifecycle` 与 `diagnostics` 为 `answered`，`scope`/`location`/`naming`/`format`/`archive`/`cleanup` 为 `partial`，`schema` 与 `database` 为 `unknown`）。

排除的题：其它七个主题（configuration、custom_agents、custom_providers、hooks、mcp、native_plugins、skills）受本轮 changed 来源影响的题仍留在 `pending_question_ids`，本轮不据文档字节变化推断这些题答案发生变化，也未改写它们的章节。

## 证据

新建 4 个 `archived_document` artifact（分别绑定 settings、slash-commands、headless、installation 的本轮原件）、4 个 `documentation` snapshot（`version_applicability: unknown`，`source_fetched_at: 2026-10-06T04:34:18.893Z`）与 19 条 reference。`raw_sha256` 由原件真实字节计算，`excerpt` 由原件行区间逐字抽取并逐条校验落在 `start`–`end` 内、长度 1–800。每个 artifact 至少被一条 reference 绑定，无孤儿记录。

## 剩余缺口与阻塞

- 自动保存会话文件的落盘路径、命名、编码与字段 schema 没有官方来源；`transcripts.schema` 与 `transcripts.database` 因此为 `unknown`，不是“不支持”。
- 官方删除入口只覆盖“空本地会话”（`/sessions clean --yes`）；手动删除会话文件或索引的后果没有来源，正文明确写出不能把删除文件当作安全清理方式。
- 旧 `archived_document` 原件缺失，其它主题的逐题差异复核仍被阻塞；恢复条件是取得可审计的旧原件后逐题比较。
- 本题无来源失败，也未出现来源互相冲突的事实，无需独立复核的高影响结论；`review_status` 因其它主题仍有 pending 题而保持 `pending`。