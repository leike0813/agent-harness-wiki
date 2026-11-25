---
schema_version: 3
record_kind: production
edition_id: auggie-cli-local_transcripts-v2
harness_id: auggie
topic: local_transcripts
title: "Auggie 主题章节：本地 Transcript（1.x 文档线）"
sections:
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs: [ref-auggie-lt-incremental-session-save, ref-auggie-lt-keep-transcript-setting, ref-auggie-lt-session-json-metadata, ref-auggie-docs-reference-sessions, ref-auggie-1x-reference-sessions, ref-auggie-1x-interactive-sessions, ref-auggie-1x-changelog-sessions]
  - section_id: transcripts-storage-and-naming
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-reference-sessions, ref-auggie-lt-session-list-resume-commands, ref-auggie-lt-session-rename, ref-auggie-lt-worker-child-sessions, ref-auggie-lt-picker-filters-subagent-sessions, ref-auggie-lt-session-list-ordering, ref-auggie-lt-session-json-metadata, ref-auggie-1x-reference-sessions, ref-auggie-1x-interactive-sessions]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-auggie-lt-incremental-session-save, ref-auggie-lt-context-compression, ref-auggie-lt-fork-session, ref-auggie-lt-replay-session-summary, ref-auggie-lt-session-list-resume-commands, ref-auggie-lt-session-json-metadata, ref-auggie-docs-reference-sessions, ref-auggie-1x-reference-sessions, ref-auggie-1x-interactive-sessions, ref-auggie-1x-changelog-sessions, ref-auggie-1x-guide-sessions]
  - section_id: transcripts-index-and-queue
    surface_ids: [cli]
    source_refs: [ref-auggie-lt-transcript-queue-rows, ref-auggie-lt-session-list-pagination, ref-auggie-1x-reference-sessions]
  - section_id: transcripts-cleanup-and-deletion
    surface_ids: [cli]
    source_refs: [ref-auggie-lt-session-sharing-link, ref-auggie-lt-session-delete-workspace-id, ref-auggie-lt-selective-session-deletion, ref-auggie-1x-interactive-sessions, ref-auggie-1x-changelog-removed]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-reference-sessions, ref-auggie-lt-session-list-ordering, ref-auggie-lt-replay-session-summary, ref-auggie-1x-reference-sessions, ref-auggie-1x-reference-diagnostics, ref-auggie-docs-logs-path]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: partial
        source_refs: [ref-auggie-1x-reference-sessions, ref-auggie-lt-incremental-session-save, ref-auggie-lt-session-json-metadata]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs: [ref-auggie-1x-reference-sessions]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs: [ref-auggie-1x-reference-sessions, ref-auggie-lt-session-rename, ref-auggie-lt-worker-child-sessions, ref-auggie-lt-picker-filters-subagent-sessions]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs: [ref-auggie-1x-reference-sessions, ref-auggie-lt-session-json-metadata]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-naming
        status: partial
        source_refs: [ref-auggie-lt-session-json-metadata]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-auggie-1x-reference-sessions, ref-auggie-1x-interactive-sessions, ref-auggie-1x-changelog-sessions, ref-auggie-lt-context-compression]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-queue
        status: partial
        source_refs: [ref-auggie-lt-transcript-queue-rows, ref-auggie-lt-session-list-pagination]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-deletion
        status: partial
        source_refs: [ref-auggie-1x-interactive-sessions, ref-auggie-1x-changelog-removed]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-deletion
        status: unknown
        source_refs: [ref-auggie-1x-interactive-sessions]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-auggie-1x-reference-sessions, ref-auggie-1x-reference-diagnostics, ref-auggie-docs-logs-path, ref-auggie-lt-replay-session-summary]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档 CLI 参考页、Interactive 页与 Automation 页（页顶标注 1.x 文档线），以及官方仓库提交 `8bd7186ea04e77d11f63e5850482643c8767666b` 的 `CHANGELOG.md` 与 `docs/1.x-preview-guide.md`。文档快照的 `version_applicability` 仍为 `unknown`，不证明任何具体 npm 版本；0.x 的会话命令与字段保留在原 v1 edition 与旧引用中。

## 记录范围与开关 {#transcripts-record-scope}

Auggie CLI 把一次 CLI 会话保存为一条“已保存会话”，并以“本地历史”称呼这份记录。1.x 参考页把 `--no-session` 描述为“不保存会话”（0.x 的 `--dont-save-session` 已改名），反证默认行为仍是保存。[@ref-auggie-1x-reference-sessions]

保存下来的会话是恢复、列举、导出、导入与统计共同作用的同一份记录：`--continue`／`--resume`／`--session PATH`／`--fork PATH_OR_ID`／`--export SESSION.jsonl [output.html]`、`auggie session list`、`auggie session stats`。恢复会话时会恢复该会话的 `--permission` 与 `--add-workspace` 值，除非再次传入。[@ref-auggie-1x-reference-sessions]

写入是增量的（0.x CHANGELOG 记录，1.x 页面没有否认）：agent 进度在每次 LLM 交换后即被保存，进程在回合中途崩溃也不会丢失已完成工作；排队消息写入会话文件，能跨重启存活。[@ref-auggie-lt-incremental-session-save]

会话记录里除对话正文外还保存每次交换的元数据：0.29.0 的条目写明 Session JSON 记录每次交换的 model ID、summarization 计费信息与 sub-agent 历史。sub-agent 历史进入会话记录，意味着被委派子代理的会话内容也会汇入父会话记录。[@ref-auggie-lt-session-json-metadata]

1.x 的会话入口新增 `/export`、`/import`、`/import-legacy-sessions`、`/tree`、`/worktree`、`/session`、`/name`、`/new`；这些都在交互模式斜杠命令表里。[@ref-auggie-1x-interactive-sessions]

**缺口（scope）**：会话记录是否包含工具调用的完整入参出参、是否有内容被明确排除在落盘之外（例如凭据、密钥类字段）、以及 `keepTranscriptOnNewSession` 在设置文件中的确切写法，固定来源没有说明；1.x 页面也没有重申 `keepTranscriptOnNewSession`。[@ref-auggie-lt-keep-transcript-setting][@ref-auggie-1x-reference-sessions]

## 存储位置、命名与格式 {#transcripts-storage-and-naming}

1.x 首次给出会话存储的可配置入口：`auggie --session-dir DIR` 指定会话存储与查找目录；`auggie --session PATH` 使用指定会话文件；`auggie --fork PATH_OR_ID` 从会话文件或 ID 前缀分叉。**默认目录路径仍未在文档中给出**，`--augment-cache-dir` 也只说明迁移 `~/.augment` 配置与缓存目录，未说明会话是否随之迁移。[@ref-auggie-1x-reference-sessions]

会话以 ID 寻址，恢复入口在 1.x 与 0.x 不同。1.x 只把 `auggie --resume`（`-r`）文档化为**交互式选择**已保存会话；按 ID／前缀直接恢复是 0.x 参考页的行为，1.x 只把 ID 前缀文档化给 `--fork`。`--continue`（`-c`）恢复最近一次；`auggie session list` 列出当前工作区会话（`--all` 覆盖所有工作区、`--json`、`-n NUMBER`），`auggie session stats [sessionId]` 显示会话统计（含 cost 与 credit）。[@ref-auggie-1x-reference-sessions]

恢复后的会话保留原 `--permission` 与 `--add-workspace`，这是 1.x 的新说明。[@ref-auggie-1x-reference-sessions]

会话还带用户可设的名字：0.x 的 `/rename` 为会话命名；1.x 提供 `/name NAME` 设置会话显示名，并在 `/session` 查看会话信息与统计。[@ref-auggie-1x-interactive-sessions][@ref-auggie-lt-session-rename]

父会话与子会话通过父子关系表达。0.33.0 让 `auggie session get` 显示一个会话的子 worker 会话；0.27.0 的会话选择器会过滤掉 subagent 会话并支持滚动查看更多。[@ref-auggie-lt-worker-child-sessions][@ref-auggie-lt-picker-filters-subagent-sessions]

格式上，1.x 的会话文件以 `.jsonl` 作为导出/导入载体：CLI `auggie --export SESSION.jsonl [output.html]` 把会话文件导出为 HTML 后退出；交互模式 `/export [path]` 可导出 HTML（默认）或 JSONL，`/import PATH` 从 JSONL 文件导入并恢复会话。0.x 的 `auggie session list --json` 与 “Session JSON” 称呼说明记录是 JSON 系；1.x 的 JSONL 证据把格式进一步限定为“会话文件可按 JSONL 导出/导入”，但字段级 schema、编码、分片与压缩规则仍未给出。[@ref-auggie-1x-reference-sessions][@ref-auggie-1x-interactive-sessions][@ref-auggie-lt-session-json-metadata]

**缺口（schema）**：消息、工具调用与事件的字段、类型、必填项、相互关系与迁移规则在固定来源中都没有字段级 schema；最小示例因此不予编造。

## 记录的写入、恢复与分支 {#transcripts-lifecycle}

写入是增量的（0.x CHANGELOG）：agent 进度在每次 LLM 交换后即保存，排队消息在入队时写入会话文件。[@ref-auggie-lt-incremental-session-save]

长会话会先被压缩再继续。0.30.0 恢复了上下文压缩；1.x 另有 `/compact [instructions]` 手动压缩与 `compaction.enabled` 自动压缩设置。压缩作用于送给模型的上下文，来源没有说明被压缩掉的原文是否仍完整保留在会话记录里。[@ref-auggie-lt-context-compression]

恢复：`--continue`（最近）、`--resume`（交互选择；按 ID／前缀恢复属 0.x，1.x 只把 ID 前缀给 `--fork`）、`--session PATH`（指定文件）；恢复会恢复 `--permission` 与 `--add-workspace`。恢复过程会重放已保存的会话摘要，0.36.0 修复了重放不支持的 thinking 内容时的崩溃。[@ref-auggie-1x-reference-sessions][@ref-auggie-lt-replay-session-summary]

分支：`--fork PATH_OR_ID` 从会话文件或 ID 前缀分叉；交互模式 `/fork` 从之前的消息创建新分支，`/tree` 可视化会话树并在分支间切换。[@ref-auggie-1x-reference-sessions][@ref-auggie-1x-interactive-sessions]

**0.x 会话迁移**：1.x 的 `CHANGELOG.md` 写明 0.x 会话在导入前不会出现在 `/resume` 中，需在同一项目运行 `/import-legacy-sessions` 导入；`docs/1.x-preview-guide.md` 仍把“无缝 0.x 会话迁移”列为 GA 前在做的项目。两条来源的边界是：导入命令已存在，自动兼容仍属路线图。[@ref-auggie-1x-changelog-sessions][@ref-auggie-1x-guide-sessions]

**缺口**：会话文件在何时创建（首个回合前还是首个交换后）、关闭时是否刷盘或 fsync、压缩后原文在记录中的存留形态、以及 `/fork` 是否共享底层记录还是复制，固定来源没有说明。

## 索引、队列与工作区作用域 {#transcripts-index-and-queue}

来源中出现“行”级别的表述（0.25.0 修复 CLI transcript queue 中的重复行），指向行式或表式存储；0.25.0 还为大列表加入分页，用户侧对应 `auggie session list -n`。[@ref-auggie-lt-transcript-queue-rows][@ref-auggie-lt-session-list-pagination][@ref-auggie-1x-reference-sessions]

1.x 的 `auggie session stats [sessionId]` 直接读取会话统计（cost、credit），说明会话记录与统计索引可由同一组命令观察。[@ref-auggie-1x-reference-sessions]

**缺口（database）**：固定来源没有出现 SQLite 或任何数据库名，也没有表名、文件扩展名或建表语句；哪些文件或表是恢复所必需、能否从记录重建索引，均未知。因此本节不给出可直接用于备份或恢复的文件清单，也不声称会话可以被重新生成。

## 归档、共享与删除 {#transcripts-cleanup-and-deletion}

1.x 提供显式的会话导出与导入：`/export [path]` 把会话导出为 HTML（默认）或 JSONL，`/import PATH` 从 JSONL 导入并恢复；CLI 侧 `auggie --export SESSION.jsonl [output.html]`。这是“导出/导入”，不是本地归档开关：导出文件是否包含全部记录、恢复后在路径与机器可移植性上损失什么，来源没有说明。[@ref-auggie-1x-interactive-sessions]

1.x 移除了 Gist 会话分享：`CHANGELOG.md` 1.2.0 的 “Removed” 列出 “Gist-based session sharing”。0.x 的 `/share` 与分享链接属于旧版。[@ref-auggie-1x-changelog-removed][@ref-auggie-lt-session-sharing-link]

**删除（unknown）**：0.x 的 `auggie session delete` 与选择器内删除属于旧版；1.x 参考页与 Interactive 页的斜杠命令表没有列出删除命令，也没有删除确认、级联或孤儿记录说明。无法确认 1.x 的删除入口，因此不给出“手动删除文件安全”的结论。[@ref-auggie-1x-interactive-sessions][@ref-auggie-lt-session-delete-workspace-id][@ref-auggie-lt-selective-session-deletion]

**缺口**：删除前必须停止哪些写入者、是否级联删除子代理会话、删除后是否留下可重建的孤儿记录、是否存在官方保留期限或容量上限，固定来源没有说明。

## 定位、读取与排错 {#transcripts-diagnostics}

- 列表与统计：`auggie session list`（`--all`、`--json`、`-n`）、`auggie session stats [sessionId]`、`/session` 查看会话信息与统计。[@ref-auggie-1x-reference-sessions][@ref-auggie-1x-interactive-sessions]
- 存储目录：`--session-dir DIR` 指定存储与查找目录；默认路径仍未知。[@ref-auggie-1x-reference-sessions]
- 恢复失败：0.36.0 的崩溃修复表明恢复会重放已保存的会话摘要；不兼容的 thinking 内容会在这条路径上失败。排查时先确认会话能否被列出，再确认能否被恢复。[@ref-auggie-lt-replay-session-summary]
- 日志：`--log-file PATH` 与 `--log-level debug`；日志文件默认在系统临时目录（macOS `$TMPDIR/augment-log.txt`，Windows `%TEMP%\augment-log.txt`）。日志不是会话记录，只能作为线索。[@ref-auggie-1x-reference-diagnostics][@ref-auggie-docs-logs-path]

**缺口**：官方是否提供会话完整性校验或损坏修复命令、是否存在推荐备份流程，固定来源没有说明。
