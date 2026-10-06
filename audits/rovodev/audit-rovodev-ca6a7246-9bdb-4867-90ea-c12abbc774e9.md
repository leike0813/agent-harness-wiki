# Rovo Dev CLI 本地 Transcript 首采报告

- harness_id：`rovodev`
- 界面：`cli`（catalog 中仅登记这一个界面）
- 主题：`local_transcripts`（首次采写）
- audit_id：`audit-rovodev-ca6a7246-9bdb-4867-90ea-c12abbc774e9`
- 章节：`knowledge/rovodev/chapters/rovodev-local_transcripts-v1.md`

## 来源身份

本轮证据全部来自官方文档已归档原件，没有 git 源码来源，也没有新建
`git_source_file`。

| 快照 | artifact | 原件 | raw_sha256 | 抓取时间 |
| --- | --- | --- | --- | --- |
| `snapshot-rovodev-lt-docs-settings` | `artifact-rovodev-lt-docs-settings` | `archive/rovodev/artifact-source-rovodev-docs-settings-5dec67fa0967/source.md` | `5dec67fa0967…` | 2026-10-06T04:35:08.048Z |
| `snapshot-rovodev-lt-docs-commands` | `artifact-rovodev-lt-docs-commands` | `archive/rovodev/artifact-source-rovodev-docs-commands-65de7d44ead5/source.md` | `65de7d44ead5…` | 2026-10-06T04:35:04.044Z |
| `snapshot-rovodev-lt-docs-help` | `artifact-rovodev-lt-docs-help` | `archive/rovodev/artifact-source-rovodev-docs-help-b57c4caa79c6/source.md` | `b57c4caa79c6…` | 2026-10-06T04:35:04.047Z |

三份快照的 `version_applicability` 均为 `unknown`：官方页面不标注适用软件版本。

## triage 理由

本轮观测显示 14 个已登记来源全部 `changed`。对 local_transcripts 而言这不是可忽略的
排版变化：既有 snapshot（`snapshot-rovodev-docs-settings`、
`snapshot-rovodev-docs-commands`）绑定的是旧 sha，其 `archive_path`
（`archive/rovodev/artifact-rovodev-docs-*/raw.txt`）在当前 archive 布局下已不存在；
把既有 reference 的 excerpt 与本轮原件正文比对也出现多处不命中。因此本轮不复用既有
snapshot，而是按本轮原件重建 artifact 与 snapshot，让新章节的每条引用都绑定到真实
存在、sha 可复算的原件。

旧版原件已不在 archive 中，无法逐行 diff，故本报告只陈述「新章节所引内容在本轮原件中
逐字命中」，不对差异范围作更细的断言。

## 受影响与排除的题

十题全部调查并给出可用答案，无 blocked：

| 题 | 状态 | 主要证据 |
| --- | --- | --- |
| `transcripts.scope` | partial | `ref-rovodev-lt-config-sessions`、`ref-rovodev-lt-commands-clear`、`ref-rovodev-lt-config-logging` |
| `transcripts.location` | partial | `ref-rovodev-lt-config-sessions`、`ref-rovodev-lt-config-file`、`ref-rovodev-lt-config-newfile`、`ref-rovodev-lt-config-logging` |
| `transcripts.naming` | partial | `ref-rovodev-lt-commands-restore`、`ref-rovodev-lt-commands-sessions`、`ref-rovodev-lt-config-console-title`、`ref-rovodev-lt-config-sessions` |
| `transcripts.format` | unknown | 无可引用证据 |
| `transcripts.schema` | unknown | 无可引用证据 |
| `transcripts.lifecycle` | partial | `ref-rovodev-lt-commands-restore`、`ref-rovodev-lt-commands-sessions`、`ref-rovodev-lt-config-sessions` |
| `transcripts.database` | unknown | 无可引用证据 |
| `transcripts.archive` | partial | `ref-rovodev-lt-commands-copy` |
| `transcripts.cleanup` | partial | `ref-rovodev-lt-commands-clear` |
| `transcripts.diagnostics` | partial | `ref-rovodev-lt-help-interactive`、`ref-rovodev-lt-commands-status`、`ref-rovodev-lt-commands-restore`、`ref-rovodev-lt-config-console-title`、`ref-rovodev-lt-config-logging`、`ref-rovodev-lt-config-sessions` |

排除的题：无。其它已声明界面：无（`rovodev` 只声明 `cli`）。

## 未解决的缺口

1. 官方文档把会话细节指向 **Manage sessions in Rovo Dev CLI**
   （`https://support.atlassian.com/rovo/docs/manage-sessions-in-rovo-dev-cli/`），
   该页不在本产品已登记来源内，也未归档。这是 `format`、`schema`、`database` 三题
   保持 `unknown` 的直接原因，也是 `cleanup` 无法给出官方删除入口的原因。
2. 已归档文档未说明 `persistenceDir` 是否相对于配置文件解析，也未给出环境变量形式的
   覆盖入口。
3. 已归档文档未说明会话目录的平台差异（Windows/macOS/Linux），`naming` 与 `location`
   的结论不得跨平台外推。
4. 服务端/云端对话与使用数据的治理材料不在本产品来源内，章节未对云端保存、保留或删除
   作任何断言。

## 复核结果

- 本轮新增 3 个 artifact、3 个 snapshot、11 个 reference；`raw_sha256` 由原件真实字节
  计算，11 条 excerpt 均在本轮原件正文中逐字命中，长度均在 1–800 之间。
- 新建 `archived_document` 的原件均已确认存在。
- 本轮新增的 11 个 reference 文件全部在新章节正文中出现 `[@...]` 标记。
- 未修改任何既有章节、既有 artifact/snapshot/reference 或 scan 写入的 checks。
- `pending_question_ids` 中只剩其它主题遗留的题；`review_status` 保持 `pending`。