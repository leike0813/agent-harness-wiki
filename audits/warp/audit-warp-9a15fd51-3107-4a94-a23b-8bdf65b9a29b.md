# Warp 上游巡检报告：audit-warp-9a15fd51-3107-4a94-a23b-8bdf65b9a29b

## 来源身份

本轮巡检覆盖 Warp 已登记的全部 22 个官方文档来源（`official_documentation`，无 git 仓库来源）。抓取时间 2026-10-06T04:35Z 起，原件按 `archive/warp/artifact-source-<source_id>-<sha12>/source.md` 落盘，YAML 中的 `checks` 保留了 scan 写下的来源身份与 `observed` 摘要，未做任何改写。

结果：**17 个来源 `changed`**，3 个 `unchanged`（all-settings、settings、skills），**0 个 `blocked`**。因此 audit `status: changed`，与 checks 一致。

## Triage 理由

changed 的 17 个来源与既有章节（configuration、custom_agents、custom_providers、hooks、mcp、native_plugins、skills）引用到的来源集合完全重合，这些主题的影响已由既有 impacts 记录，本轮不重复判定，也不在本轮重写任何已有章节。

本次任务的范围是 `local_transcripts` 主题的**首采**，与来源变化判定相互独立：产品没有登记 git 源码来源，全部证据只能来自上述文档快照。

## 受影响与排除的题

- 受影响并已成稿：`transcripts.scope`、`transcripts.location`、`transcripts.naming`、`transcripts.format`、`transcripts.schema`、`transcripts.lifecycle`、`transcripts.database`、`transcripts.archive`、`transcripts.cleanup`、`transcripts.diagnostics` —— 十题全部给出可用答案（6 个 partial、3 个 unknown、0 个 answered），章节 `warp-local_transcripts-v1`，界面 `desktop`。
- 排除：`transcripts.*` 在其它界面上不适用——catalog 中 warp 只声明了 `desktop` 一个界面。
- 未动其它主题的遗留 pending 题，`review_status` 保持 `pending`。

## 证据

新增 8 个 `archived_document` artifact（原件均已存在于 `archive/warp/` 下，`raw_sha256` 由原件真实字节计算，并与本轮 scan 的 `observed` 摘要一致）、8 个 `documentation` snapshot（一文档一 artifact 一 snapshot，无共用）与 27 条 `source_reference`。使用的文档页：File and folder locations、Slash Commands、Multi-agent orchestration、Agent Notifications、Bring Your Own API Key、Model Choice、Warp Drive overview、SSH extension。

## 复核结果与 blocker

自检已通过：每条引用的 `locator.file_lines` 与原件行区间一致、excerpt 在原件中逐字命中且长度 1–800、artifact/snapshot 摘要一致、正文 `[@ref]` 与 `sections[].source_refs` 及各题 `source_refs` 三者互相闭合、无孤儿 artifact/snapshot、`pnpm maintenance:candidates check` 通过。

无 blocker。已记录的缺口（不是失败，属来源本身未记载）：记录格式与记录 schema 无来源；会话记录的删除/保留机制无来源（已明确不得据此认为可安全删除）；本地数据库的文件名、表结构与重建方式无来源。

复核判断：文档来源的措辞变化本身不改变既有章节结论的风险较低，本轮不触发高影响独立复核；若后续把 `unknown` 的三题补成 `partial`/`answered`，需要独立复核。