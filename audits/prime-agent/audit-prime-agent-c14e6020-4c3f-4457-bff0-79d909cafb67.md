# prime-agent 本地 Transcript 首采报告 · 2026-10-06

- 审计记录：`audit-prime-agent-c14e6020-4c3f-4457-bff0-79d909cafb67`（status `changed`，review_status 保持 `pending`）
- 本轮观察：1 个登记来源，其中 1 个非 unchanged
- 交付方式：`delivery=pr`，本轮不切换本地发布指针、不更新受管二进制、不执行真实 harness

## 来源身份

| 来源 | 类型 | 状态 | 基线 | 本轮观察 |
| --- | --- | --- | --- | --- |
| `source-prime-agent-repo` | git_repository | changed | `c24ac227f11f552ed1d3fa8ebc7d916937d7f6bc` | `7a52276cb17310f331f1075f28fa5cf9c4ae0a0a` |

固定工作区由协调者打开：`/tmp/ahw-source-workspaces/ws-7a52276cb173-08af7d2c-1d51-4a37-8c47-b81cea7c451d`（只读）。本 worker 没有新开工作区，没有重跑 `sources:scan`，也没有把临时路径写进任何记录。

## Triage 理由

基线到本轮观察之间只有一个提交，内容是 `install.ps1` 的发布打包改动（beta 切割时发布安装脚本并改指 Windows 一行命令）。它不触碰任何会话记录代码，因此对 `local_transcripts` 没有语义影响：该主题此前根本没有章节，本轮是**从零首采**，不是修订。

一个需要维护者留意的来源身份问题：本轮固定的提交已经是 Rust 工作区（`crates/`），而本产品既有七章引用的是 `packages/coding-agent/src/` 下的 TypeScript 文件，这两个文件集合在本提交里不同时存在。本章只对 `7a52276c` 作证，不主张两棵源码树的行为一致；该一致性问题由协调者决定是否单独立项。

## 证据

- 19 个 `git_source_file` artifact、19 个 `source_revision` snapshot（严格一文件一 artifact 一 snapshot），48 条 `source_reference`。
- 全部用 `var/lt-refs.py` 生成，excerpt 直接从固定工作区按行区间抽取，`content_sha256` 为文件真实字节 sha256。
- 未新建 `archived_document`：项目内不存在 `archive/prime-agent/`，因此没有任何官方文档原件可引。
- 未写 `mappings/`：源码提交不证明任何已发布包的行为。

## 维护结果

| topic | 新 edition | 固定问题与状态 | 已选入当前版本 |
| --- | --- | --- | --- |
| local_transcripts | `prime-agent-local_transcripts-v1` | `scope`/`location`/`naming`/`format`/`lifecycle`/`archive`/`diagnostics`：answered；`schema`/`database`/`cleanup`：partial | 是 |

既有七章与其 selection 未动。`edition_id` 采用本轮统一契约的 `{harness-id}-{topic}-v1` 形式，与既有 `prime-agent-cli-{topic}-vN` 命名不同；校验只要求文件名与 `edition_id` 一致，若维护者希望统一命名，可在合入前重命名。

## 剩余缺口（对应 audit 的 pending 题）

- `transcripts.schema`：`crates/pa-types/src/ai/mod.rs` 的内容块结构、v1→v2 / v2→v3 迁移改写体、`customType` 取值集合均未逐条取证；固定来源没有面向用户的 schema 文档或导出的 JSON Schema。
- `transcripts.database`：“不用数据库”是检索 `sqlite`/`rusqlite`/`libsql`/`diesel` 无命中的否定性结论；RLM 账本的重建规则未取证。
- `transcripts.cleanup`：删除时 sidecar 与 RLM 账本如何处理、父子会话级联语义、是否存在重建入口，均未取证。

## 复核结果与 blocker

`pnpm maintenance:candidates check --candidate …/candidates/prime-agent` 通过。逐条自检：`locator.file` 与 snapshot 绑定 artifact 的 `file` 全部一致；48 条 excerpt 逐字命中且落在 `start`–`end` 内；artifact 与 snapshot 的 `content_sha256` 等于固定工作区中该文件的真实 sha256；无孤儿 artifact；正文每个 `[@ref]` 都有对应 reference 文件，且每条本轮 reference 都在正文出现；十题齐备；selection 唯一。

本轮没有阻塞项，也没有未解决的分歧——所有"没找到"都按 partial 记录并列出已查入口，没有写成“不支持”或“可以安全删除”。
