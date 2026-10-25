---
schema_version: 3
record_kind: production
edition_id: omp-local_transcripts-v4
harness_id: omp
topic: local_transcripts
title: Oh My Pi 本地 Transcript：JSONL 会话树、blob 附件与 history.db 索引
sections:
- section_id: transcripts-scope
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-entry-scope-cli-session-flags
  - ref-omp-lt-storage-jsonl-title-slot
  - ref-omp-lt-format-entry-taxonomy
  - ref-omp-lt-format-persisted-roles-conversation
  - ref-omp-lt-format-persisted-roles-tui
  - ref-omp-lt-format-reconstructed-roles
  - ref-omp-lt-format-model-usage-outside-transcript
  - ref-omp-lt-format-reset-boundary
  - ref-omp-lt-storage-size-controls-blobs
  - ref-omp-lt-lifecycle-in-memory-mode
  - ref-omp-lt-diagnostics-history-storage-scope
  - ref-omp-lt-lifecycle-clear-retains-file
  - ref-omp-lt4-scope-prompt-cache-key-code
  - ref-omp-lt4-scope-prompt-cache-key-anonymizer-code
  - ref-omp-lt4-scope-restore-persistence-doc
- section_id: transcripts-storage-layout
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-storage-layout-default
  - ref-omp-lt-storage-cwd-bucket
  - ref-omp-lt-storage-dir-name-resolution-code
  - ref-omp-lt-storage-dir-name-scope-code
  - ref-omp-lt-storage-legacy-abs-dir-name-code
  - ref-omp-lt-storage-sessions-blobs-dir-code
  - ref-omp-lt-storage-layout-blobs-breadcrumb
  - ref-omp-lt-storage-terminal-and-marker-dirs-code
  - ref-omp-lt-storage-session-owners-dir-code
  - ref-omp-lt-storage-agent-root-dirs-code
  - ref-omp-lt-storage-artifacts-dir-code
  - ref-omp-lt-storage-abstractions
  - ref-omp-lt-entry-scope-cli-session-flags
  - ref-omp-lt-format-file-name-code
  - ref-omp-lt-format-header-notes
  - ref-omp-lt-lifecycle-tree-leaf
  - ref-omp-lt-storage-jsonl-title-slot
  - ref-omp-lt-storage-size-controls-blobs
  - ref-omp-lt2-location-natives-dir-code
  - ref-omp-lt2-location-natives-dir-doc
- section_id: transcripts-schema-lifecycle
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-format-header-example
  - ref-omp-lt3-storage-staging-path-code
  - ref-omp-lt3-lifecycle-fork-if-moved-away-code
  - ref-omp-lt3-lifecycle-resume-forks-code
  - ref-omp-lt3-archive-pack-lease-code
  - ref-omp-lt3-archive-pack-atomic-code
  - ref-omp-lt3-archive-pack-missing-blobs-code
  - ref-omp-lt3-archive-unpack-mode-code
  - ref-omp-lt3-archive-unpack-placement-code
  - ref-omp-lt3-archive-unpack-forked-code
  - ref-omp-lt3-archive-transfer-marker-code
  - ref-omp-lt3-archive-transfer-command-code
  - ref-omp-lt-format-header-notes
  - ref-omp-lt-format-entry-base
  - ref-omp-lt-schema-versioning-migration
  - ref-omp-lt-schema-migration-trigger
  - ref-omp-lt-lifecycle-load-behavior
  - ref-omp-lt-lifecycle-set-session-file
  - ref-omp-lt-lifecycle-tree-leaf
  - ref-omp-lt-format-file-name-code
  - ref-omp-lt-lifecycle-persist-vs-memory
  - ref-omp-lt-lifecycle-lazy-persistence-gate
  - ref-omp-lt-lifecycle-error-behavior
  - ref-omp-lt-lifecycle-clear-retains-file
  - ref-omp-lt-format-reset-boundary
  - ref-omp-lt-lifecycle-breadcrumb-root-code
  - ref-omp-lt-format-entry-taxonomy
  - ref-omp-lt-format-persisted-roles-conversation
  - ref-omp-lt-format-persisted-roles-tui
  - ref-omp-lt-format-reconstructed-roles
  - ref-omp-lt-lifecycle-in-memory-mode
  - ref-omp-lt2-schema-prompt-digest-doc
  - ref-omp-lt2-schema-prompt-digest-code
  - ref-omp-lt2-lifecycle-body-lines-code
  - ref-omp-lt2-resume-missing-path-code
  - ref-omp-lt2-resume-missing-path-doc
  - ref-omp-lt2-storage-streaming-write-sync-code
  - ref-omp-lt2-storage-streaming-write-atomic-code
- section_id: transcripts-database
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-database-history-db-path-code
  - ref-omp-lt-database-history-table-ddl-code
  - ref-omp-lt-database-history-fts-code
  - ref-omp-lt-database-index-tables-doc
  - ref-omp-lt-database-index-ddl-code
  - ref-omp-lt-diagnostics-history-storage-scope
  - ref-omp-lt-diagnostics-history-storage-boundary
  - ref-omp-lt2-database-titles-have-no-life-doc
- section_id: transcripts-cleanup-archive
  surface_ids:
  - cli
  source_refs:

  - ref-omp-lt-cleanup-manual-maintenance
  - ref-omp-lt3-cleanup-staging-temps-doc
  - ref-omp-lt3-cleanup-staging-temp-glob-code
  - ref-omp-lt3-archive-transfer-command-code
  - ref-omp-lt3-archive-transfer-module-code
  - ref-omp-lt3-archive-transfer-marker-code
  - ref-omp-lt3-cleanup-staging-temp-sweep-code
  - ref-omp-lt3-cleanup-registered-session-paths-code
  - ref-omp-lt3-cleanup-gc-temp-report-code
  - ref-omp-lt-cleanup-gc-phase-flags-code
  - ref-omp-lt-cleanup-gc-retention-flags-code
  - ref-omp-lt-cleanup-gc-settings-code
  - ref-omp-lt-cleanup-gc-stale-settings-code
  - ref-omp-lt-cleanup-gc-run-order-code
  - ref-omp-lt-cleanup-archive-dir-code
  - ref-omp-lt-cleanup-archive-gate-code
  - ref-omp-lt-cleanup-archive-age-code
  - ref-omp-lt-cleanup-stale-markers-code
  - ref-omp-lt-cleanup-stale-collab-code
  - ref-omp-lt-cleanup-delete-command
  - ref-omp-lt-cleanup-delete-not-erasure-boundary
  - ref-omp-lt-cleanup-delete-session-code
  - ref-omp-lt-cleanup-delete-backup-code
  - ref-omp-lt-cleanup-picker-delete
  - ref-omp-lt-diagnostics-continue-fallback
  - ref-omp-lt-diagnostics-gc-report-code
  - ref-omp-lt-entry-scope-cli-session-flags
  - ref-omp-lt-format-header-notes
  - ref-omp-lt-storage-session-owners-dir-code
  - ref-omp-lt2-gc-drops-session-titles-code
  - ref-omp-lt4-cleanup-compress-settings-code
  - ref-omp-lt4-cleanup-compress-flag-code
  - ref-omp-lt4-cleanup-compress-doc
  - ref-omp-lt4-cleanup-compress-fs-doc
  - ref-omp-lt4-cleanup-compress-scratch-glob-code
  - ref-omp-lt4-cleanup-compress-scratch-sweep-code
  - ref-omp-lt4-cleanup-compress-scratch-roots-code
  - ref-omp-lt4-cleanup-compress-scratch-prefix-code
  - ref-omp-lt4-cleanup-compress-tree-lease-code
  - ref-omp-lt4-cleanup-compress-cutoff-code
  - ref-omp-lt4-cleanup-compress-run-order-code
  - ref-omp-lt4-cleanup-compress-report-code
  - ref-omp-lt4-changelog-compress-doc
- section_id: transcripts-diagnostics
  surface_ids:
  - cli
  source_refs:
  - ref-omp-lt-diagnostics-discovery-utilities
  - ref-omp-lt-diagnostics-continue-order
  - ref-omp-lt-diagnostics-continue-fallback
  - ref-omp-lt-lifecycle-breadcrumb-root-code
  - ref-omp-lt-diagnostics-missing-invalid-header
  - ref-omp-lt-diagnostics-gc-report-code
  - ref-omp-lt-cleanup-gc-run-order-code
  - ref-omp-lt-diagnostics-history-storage-boundary
  - ref-omp-lt-lifecycle-error-behavior
  - ref-omp-lt-storage-agent-root-dirs-code
  - ref-omp-lt-storage-layout-default
  - ref-omp-lt2-resume-missing-path-code
  - ref-omp-lt2-resume-missing-path-doc
  - ref-omp-lt2-resume-enterability-doc
  - ref-omp-lt4-cleanup-compress-report-code
questions:
- question_id: transcripts.scope
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-scope
    status: answered
    source_refs:
    - ref-omp-lt-entry-scope-cli-session-flags
    - ref-omp-lt-storage-jsonl-title-slot
    - ref-omp-lt-format-entry-taxonomy
    - ref-omp-lt-format-persisted-roles-conversation
    - ref-omp-lt-format-persisted-roles-tui
    - ref-omp-lt-format-reconstructed-roles
    - ref-omp-lt-format-model-usage-outside-transcript
    - ref-omp-lt-format-reset-boundary
    - ref-omp-lt-storage-size-controls-blobs
    - ref-omp-lt4-scope-prompt-cache-key-code
    - ref-omp-lt4-scope-prompt-cache-key-anonymizer-code
    - ref-omp-lt4-scope-restore-persistence-doc
- question_id: transcripts.location
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-omp-lt-storage-layout-default
    - ref-omp-lt-storage-cwd-bucket
    - ref-omp-lt-storage-sessions-blobs-dir-code
    - ref-omp-lt-storage-layout-blobs-breadcrumb
    - ref-omp-lt-storage-terminal-and-marker-dirs-code
    - ref-omp-lt-storage-agent-root-dirs-code
    - ref-omp-lt-storage-session-owners-dir-code
    - ref-omp-lt2-location-natives-dir-code
    - ref-omp-lt2-location-natives-dir-doc
- question_id: transcripts.naming
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-omp-lt-storage-layout-default
    - ref-omp-lt-storage-cwd-bucket
    - ref-omp-lt-storage-dir-name-resolution-code
    - ref-omp-lt-storage-dir-name-scope-code
    - ref-omp-lt-storage-legacy-abs-dir-name-code
    - ref-omp-lt-storage-artifacts-dir-code
    - ref-omp-lt-format-file-name-code
    - ref-omp-lt-format-header-notes
    - ref-omp-lt-lifecycle-tree-leaf
- question_id: transcripts.format
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-storage-layout
    status: answered
    source_refs:
    - ref-omp-lt-storage-jsonl-title-slot
    - ref-omp-lt-storage-artifacts-dir-code
    - ref-omp-lt-storage-sessions-blobs-dir-code
    - ref-omp-lt-storage-abstractions
    - ref-omp-lt-storage-size-controls-blobs
- question_id: transcripts.schema
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-schema-lifecycle
    status: answered
    source_refs:
    - ref-omp-lt-format-header-example
    - ref-omp-lt-format-header-notes
    - ref-omp-lt-format-entry-base
    - ref-omp-lt-format-entry-taxonomy
    - ref-omp-lt-format-persisted-roles-conversation
    - ref-omp-lt-format-persisted-roles-tui
    - ref-omp-lt-format-reconstructed-roles
    - ref-omp-lt-schema-versioning-migration
    - ref-omp-lt-schema-migration-trigger
    - ref-omp-lt2-schema-prompt-digest-doc
    - ref-omp-lt2-schema-prompt-digest-code
- question_id: transcripts.lifecycle
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-schema-lifecycle
    status: answered
    source_refs:
    - ref-omp-lt-lifecycle-persist-vs-memory
    - ref-omp-lt3-storage-staging-path-code
    - ref-omp-lt3-lifecycle-fork-if-moved-away-code
    - ref-omp-lt3-lifecycle-resume-forks-code
    - ref-omp-lt-lifecycle-lazy-persistence-gate
    - ref-omp-lt-lifecycle-tree-leaf
    - ref-omp-lt-lifecycle-load-behavior
    - ref-omp-lt-lifecycle-set-session-file
    - ref-omp-lt-lifecycle-error-behavior
    - ref-omp-lt-lifecycle-clear-retains-file
    - ref-omp-lt-lifecycle-in-memory-mode
    - ref-omp-lt2-lifecycle-body-lines-code
    - ref-omp-lt2-storage-streaming-write-sync-code
    - ref-omp-lt2-storage-streaming-write-atomic-code
    - ref-omp-lt2-resume-missing-path-code
    - ref-omp-lt2-resume-missing-path-doc
- question_id: transcripts.database
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-database
    status: answered
    source_refs:
    - ref-omp-lt-database-history-db-path-code
    - ref-omp-lt-database-history-table-ddl-code
    - ref-omp-lt-database-history-fts-code
    - ref-omp-lt-database-index-tables-doc
    - ref-omp-lt-database-index-ddl-code
    - ref-omp-lt-diagnostics-history-storage-scope
    - ref-omp-lt-diagnostics-history-storage-boundary
    - ref-omp-lt2-database-titles-have-no-life-doc
- question_id: transcripts.archive
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-cleanup-archive
    status: partial
    source_refs:
    - ref-omp-lt-cleanup-archive-dir-code
    - ref-omp-lt3-archive-transfer-command-code
    - ref-omp-lt3-archive-transfer-module-code
    - ref-omp-lt3-archive-transfer-marker-code
    - ref-omp-lt-cleanup-archive-gate-code
    - ref-omp-lt-cleanup-archive-age-code
    - ref-omp-lt-cleanup-gc-run-order-code
    - ref-omp-lt-cleanup-gc-phase-flags-code
    - ref-omp-lt-entry-scope-cli-session-flags
    - ref-omp-lt2-gc-drops-session-titles-code
    - ref-omp-lt4-cleanup-compress-doc
    - ref-omp-lt4-cleanup-compress-run-order-code
- question_id: transcripts.cleanup
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-cleanup-archive
    status: partial
    source_refs:
    - ref-omp-lt-cleanup-manual-maintenance
    - ref-omp-lt3-cleanup-staging-temps-doc
    - ref-omp-lt3-cleanup-staging-temp-glob-code
    - ref-omp-lt3-cleanup-staging-temp-sweep-code
    - ref-omp-lt3-cleanup-registered-session-paths-code
    - ref-omp-lt-cleanup-gc-settings-code
    - ref-omp-lt-cleanup-gc-stale-settings-code
    - ref-omp-lt-cleanup-stale-markers-code
    - ref-omp-lt-cleanup-stale-collab-code
    - ref-omp-lt-cleanup-delete-command
    - ref-omp-lt-cleanup-delete-not-erasure-boundary
    - ref-omp-lt-cleanup-delete-session-code
    - ref-omp-lt-cleanup-delete-backup-code
    - ref-omp-lt-cleanup-picker-delete
    - ref-omp-lt-cleanup-gc-retention-flags-code
    - ref-omp-lt2-gc-drops-session-titles-code
    - ref-omp-lt4-cleanup-compress-settings-code
    - ref-omp-lt4-cleanup-compress-flag-code
    - ref-omp-lt4-cleanup-compress-doc
    - ref-omp-lt4-cleanup-compress-fs-doc
    - ref-omp-lt4-cleanup-compress-scratch-glob-code
    - ref-omp-lt4-cleanup-compress-scratch-sweep-code
    - ref-omp-lt4-cleanup-compress-scratch-roots-code
    - ref-omp-lt4-cleanup-compress-scratch-prefix-code
    - ref-omp-lt4-cleanup-compress-tree-lease-code
    - ref-omp-lt4-cleanup-compress-cutoff-code
    - ref-omp-lt4-cleanup-compress-run-order-code
    - ref-omp-lt4-cleanup-compress-report-code
    - ref-omp-lt4-changelog-compress-doc
- question_id: transcripts.diagnostics
  answers:
  - surface_ids:
    - cli
    section_id: transcripts-diagnostics
    status: answered
    source_refs:
    - ref-omp-lt-diagnostics-discovery-utilities
    - ref-omp-lt-diagnostics-continue-order
    - ref-omp-lt-diagnostics-continue-fallback
    - ref-omp-lt-lifecycle-breadcrumb-root-code
    - ref-omp-lt-diagnostics-missing-invalid-header
    - ref-omp-lt-diagnostics-gc-report-code
    - ref-omp-lt-diagnostics-history-storage-boundary
    - ref-omp-lt2-resume-missing-path-code
    - ref-omp-lt2-resume-missing-path-doc
    - ref-omp-lt2-resume-enterability-doc
    - ref-omp-lt4-cleanup-compress-report-code
---

## 固定来源与记录范围 {#transcripts-scope}

本章只覆盖 CLI 界面（catalog `surface_id: cli`）。主体结论来自官方仓库 `can1357/oh-my-pi` 在固定 commit `fc6c0c90dab012a0b7edea731af92f5bbd09cff0` 的源码树与随仓文档，对应本轮候选里的 `snapshot-omp-lt-repo-fc6c-*`（`source_id: source-omp-repo`，`distribution: source-tree`，`os: linux`，`arch: x64`，`source_fetched_at: 2026-10-06T05:20:00Z`）；本版另按 commit `788cf9ef10c82634b2a685fb2d1455362acf81b9`（`snapshot-omp-788c-*`，`source_fetched_at: 2026-10-09T02:00:00Z`）复核了存储、生命周期与清理路径，引用带 `ref-omp-lt2-` 前缀的段落只在该 commit 下成立；本版第三次按 commit `adc7fed5c9d6837d77b590bc313a705e2b4136b0`（`snapshot-omp-adc7-*`，`source_fetched_at: 2026-10-13T00:00:00Z`）复核，该 commit 带来三处实质变化：`omp gc` 的 sessions 阶段开始清扫 transcript 重写临时文件、新增 `omp session pack|unpack|moved` 的跨机搬运命令、以及所有 resume 路径上的"已搬走则分叉"守卫；引用带 `ref-omp-lt3-` 前缀的段落只在该 commit 下成立。本版第四次按 commit `f1ac114d8d3438bee43010aee559bfe720ba3224`（`snapshot-omp-f1ac-*`，`source_fetched_at: 2026-10-13T18:03:02Z`）复核，该 commit 对本章有实质影响的变化只有一处：`omp gc` 新增 opt-in 的 compress 阶段（`--compress` / `gc.compress`，默认关闭；`gc.compressAfterDays` 默认 7），它就地压缩空闲会话的 transcript 及其 artifact 树，并清扫自己留下的 `.omp-gc-compress-*` 暂存目录；另有会话 header 新增 `taskPromptCacheKey` 字段、CLI 新增 `--restore` 选择器。引用带 `ref-omp-lt4-` 前缀的段落只在该 commit 下成立。四个 commit 都只代表源码树，不代表任何已发布二进制或 npm 包版本的行为；本章不写发行版本映射，`source-omp-npm` 上观察到的版本号本轮没有取到对应的会话记录文件。

`adc7fed5` 上复核确认**未变**的部分：默认布局 `~/.omp/agent/sessions|blobs` 的 `data` 域解析、`terminal-sessions`/`custom-session-files` 的 `state` 域解析、`history.db` 路径、文件名与 header 形态、条目类型全集、v1→v2→v3 迁移、惰性落盘门槛、归档目录与三道归档闸、以及标题行随归档删除。`packages/utils/src/dirs.ts` 在该区间只新增了一个 `getMnemopiEmbedRuntimeDir()`（`~/.omp/run/mnemopi`，state 域），它服务于 mnemopi 记忆后端的嵌入服务，不参与本章任何会话、blob 或数据库路径，因此上述路径结论不变。

一句话概括记录形态：**会话正文是每个会话一个 JSONL 文件，存在按 cwd 分桶的目录下，附件（大图、base64 载荷）外置到内容寻址的 blob store，标题与 prompt 历史另存一个 `history.db`** [@ref-omp-lt-storage-jsonl-title-slot]。

落盘的内容与不落盘的内容：

- **会话正文与工具事件同文件**。`message` 条目里，assistant 轮的 tool call 以 `{ "type": "toolCall" }` 块留在 `content` 中，工具结果以独立 `toolResult` 角色配 `toolCallId`/`toolName`；此外还有 `bashExecution`、`pythonExecution`、`hookMessage`、`fileMention` 等 TUI 侧角色 [@ref-omp-lt-format-persisted-roles-conversation][@ref-omp-lt-format-persisted-roles-tui]。也就是说工具调用与对话文本在同一条记录里，不需要另找日志。
- **非对话的会话内状态也写进同一个 JSONL**。`SessionEntry` 联合类型含 `message`、`model_usage`、`thinking_level_change`、`model_change`、`service_tier_change`、`compaction`、`branch_summary`、`reset_boundary`、`custom`、`custom_message`、`label`、`title_change`、`ttsr_injection`、`credential_pin`、`session_init`、`mode_change` [@ref-omp-lt-format-entry-taxonomy]。模型选择、思考档位、标签、重命名审计、ttsr 注入都在同一棵树里。
- **`model_usage` 不进对话**。它记录 transcript 之外的模型调用（`purpose`/`api`/`provider`/`model`/`usage`/`stopReason`/可选 `errorMessage`），只参与用量统计 [@ref-omp-lt-format-model-usage-outside-transcript]。
- **重建角色不等于持久化角色**。`branch_summary`、`compaction`、`custom_message` 在上下文重建时分别合成为 `branchSummary`、`compactionSummary`、`custom`；文档明确要求读者按 `entry.type` 判别而不是按重建角色反推持久化形态 [@ref-omp-lt-format-reconstructed-roles]。
- **`/clear` 不删历史**。它追加一个无载荷的 `reset_boundary`，压缩后的实时 transcript 与重建的模型上下文从最后一个边界之后开始，而 full-history transcript 导出仍保留边界之前的条目 [@ref-omp-lt-format-reset-boundary][@ref-omp-lt-lifecycle-clear-retains-file]。
- **落盘前有投影，不是原样写入**。超过 500,000 字符的字符串被截断成 `"[Session persistence truncated large content]"`（部分 provider 签名/回放载体除外），瞬态 `jsonlEvents` 被移除，`image_url` 里的图片 data URL 一律内容寻址外置并替换为 `blob:sha256:[hash]`，≥1,024 字符的 base64 载荷在图像内容块、`images[]`、snapcompact `frames[]` 与图像生成结果里外置 [@ref-omp-lt-storage-size-controls-blobs]。投影不动内存中的活条目，加载时普通图片引用会被还原为内联载荷。
- **`--no-session` 完全不落盘**。`--session-dir`/`--session` 指定非默认目录，`--continue`/`--resume`/`--fork`/外部会话导入都需要持久化，与 `--no-session` 互斥 [@ref-omp-lt-entry-scope-cli-session-flags]；`f1ac114d` 起这份清单里多了 `--restore`——官方 CLI 参考写明 "`--continue`, `--resume`, `--restore`, `--fork`, and foreign-session imports require persistence and cannot use `--no-session`" [@ref-omp-lt4-scope-restore-persistence-doc]，所以 `--restore` 同样是有文件路径的持久化入口，而不是内存态入口；`SessionManager.inMemory()` 下会话没有文件路径，`/export` 报 `Cannot export in-memory session to HTML`，`/fork` 失败，只有 `/dump` 与 `/share` 仍可用 [@ref-omp-lt-lifecycle-in-memory-mode]。
- **header 里另有两个 prompt-cache 身份字段，其中一个是本 commit 新增的**。`SessionHeader` 现在除 `providerPromptCacheKey` 外还有 `taskPromptCacheKey?: string`，两条注释都写明它们是 "Local-only … omitted from shares and HTML" [@ref-omp-lt4-scope-prompt-cache-key-code]；分享/HTML 导出路径确实按名单把它们抹掉——`session-anonymizer.ts` 的 opaque 字段表同时列出 `providerPromptCacheKey` 与 `taskPromptCacheKey` [@ref-omp-lt4-scope-prompt-cache-key-anonymizer-code]。也就是说这两个键落盘但不随会话外流。

**Prompt 输入历史不在这个 JSONL 里**：`HistoryStorage` 是独立的 SQLite 子系统，文档明确它不是会话回放 [@ref-omp-lt-diagnostics-history-storage-scope]，详见下文数据库小节。

## 存储位置、命名与格式 {#transcripts-storage-layout}

### 路径与它随什么变化

默认布局 [@ref-omp-lt-storage-layout-default]：

```text
~/.omp/agent/sessions/[encoded-cwd]/[timestamp]_[sessionId].jsonl
~/.omp/agent/blobs/[sha256]
~/.omp/agent/terminal-sessions/[terminal-id]
```

- **会话桶随 cwd 变**。`[encoded-cwd]` 由 canonicalize 后的 cwd 推导（所以符号链接别名共享一个桶）：home 下用 `-[relative]`，临时根下用 `-tmp-[relative]`，其它用 `--[编码后的绝对路径]--`，路径分隔符替换为 `-`。计算代码先 `path.resolve` 再 `resolveEquivalentPath`，并分别与 home、temp 根求相对路径 [@ref-omp-lt-storage-dir-name-resolution-code]；scope 判定按“临时根优先、其次 home、最后绝对路径”三段分支，home 与 temp 嵌套时还会算一个 shadowed 名字再向前迁移 [@ref-omp-lt-storage-dir-name-scope-code]；绝对路径分支的编码把开头的 `/` 或 `\` 去掉并把剩下的 `/\:` 全换成 `-` [@ref-omp-lt-storage-legacy-abs-dir-name-code]。`SessionManager.list(cwd, sessionDir?)` 默认只读解析出的那个桶，除非显式传入 `sessionDir` [@ref-omp-lt-storage-cwd-bucket]。
- **根目录随环境变量与 profile 变**。`getSessionsDir`/`getBlobsDir` 走 `dirs.agentSubdir(agentDir, "sessions"|"blobs", "data")`，`terminal-sessions` 与 `custom-session-files` 走 `"state"` 域；解析结果里 XDG 分支会把 `~/.omp/agent/` 前缀拍平——注释写明 `~/.omp/agent/sessions` 在设了 XDG 时变成 `$XDG_DATA_HOME/omp/sessions` [@ref-omp-lt-storage-sessions-blobs-dir-code][@ref-omp-lt-storage-agent-root-dirs-code]。CLI 的 `--profile [name]` 会为 auth、sessions、settings 与缓存启用隔离 profile，因此换 profile 就是换一套会话路径 [@ref-omp-lt-entry-scope-cli-session-flags]。
- **终端面包屑与自定义会话标记**。`terminal-sessions/[terminal-id]` 的首行是 cwd 与会话文件路径，可选附加行是 `fresh` 与 `cwdstat [device] [inode]`；`fresh` 用来保住“刚创建但文件尚未落盘”的 lazy 会话，避免 `continueRecent()` 打开上一个会话 [@ref-omp-lt-storage-layout-blobs-breadcrumb]。每个 `--session-dir`/`--session` 会话都会在 `custom-session-files/` 留一个标记文件，好让 GC 在面包屑被后续会话覆盖之后仍能扫到确切路径 [@ref-omp-lt-storage-terminal-and-marker-dirs-code]。
- **会话所有权租约**。`~/.omp/run/session-owners`（XDG 默认 `$XDG_STATE_HOME/omp/run/session-owners`）存放目录命名会话的租约，注释说它跨 profile 共享，打开同一会话的每个 omp 进程都要满足同一租约 [@ref-omp-lt-storage-session-owners-dir-code]。
- **本轮复核：新出现的目录覆盖不涉及会话路径**。commit `788cf9e` 给 `getNativesDir()` 加了 `PI_NATIVES_DIR` 覆盖（去空白、`~` 展开、相对值忽略，仍回落到 `dirs.rootSubdir("natives", "cache")`）[@ref-omp-lt2-location-natives-dir-code]；随仓文档明确它只改原生插件的解压/暂存根，"Does not move sessions, plugins, or other data"，也不覆盖 sessions、plugins 与其它数据 [@ref-omp-lt2-location-natives-dir-doc]。同一次 `dirs.ts` 改动把 worktree 基址解析函数改名并复用，没有触碰 `getSessionsDir`/`getBlobsDir` 的 `data` 域解析，因此上文的 `~/.omp/agent/sessions` 与 XDG 拍平规则在该 commit 下不变。
- **`adc7fed5` 复核：路径解析未变，新增的是另一个域**。`packages/utils/src/dirs.ts` 在 `788cf9e..adc7fed5` 区间只新增了 `getMnemopiEmbedRuntimeDir()`（`dirs.rootSubdir(path.join("run", "mnemopi"), "state")`，即 `~/.omp/run/mnemopi`，XDG 默认 `$XDG_STATE_HOME/omp/run/mnemopi`），其唯一消费者是 `mnemopi/embed-client.ts` 的 per-model 嵌入服务 shared worker。`getSessionsDir`/`getBlobsDir`/`getArchivedSessionsDir`/`getTerminalSessionsDir`/`getCustomSessionFilesDir`/`getSessionOwnersDir`/`history.db` 全部未改，因此上文所有路径结论在该 commit 下继续成立；`run/mnemopi` 属于记忆后端运行时状态，不是会话记录。

**没有查证的部分**：本轮在固定 commit 里没有读到 blob store 的分片层级、`blobs/` 内部是否分桶，以及归档目录的确切相对层级描述以外的细节；也没有逐项审计缓存、日志与遥测文件。

### 命名与父子关系

文件名形如 `[timestamp]_[sessionId].jsonl`，时间戳里的 `:` 与 `.` 被替换成 `-`，随后紧接着写 256 字节的 title slot 与 header [@ref-omp-lt-format-file-name-code]。父会话/子会话/分支有**三种不同的表达**，容易混淆：

- **header 里的 `parentSession`** 是**不透明的谱系字符串**。当前代码按流程写会话 id 或会话路径（`fork`、`forkFrom`、`createBranchedSession` 或显式 `newSession({ parentSession })`），文档要求把它当元数据而不是类型化外键 [@ref-omp-lt-format-header-notes]。子代理会话因此**不以目录形式嵌在父文件旁边**（这一点与“文件即唯一会话”的直觉相反）。
- **条目树**才是真正的父子关系：普通追加生成一条 `parentId` 为当前 `leafId` 的新条目并前移叶子；`appendMessageToBranch()` 向显式父节点追加但不动活叶子；`branch(entryId)` 只移动 `leafId` 不改既有条目；`resetLeaf()` 置 `leafId = null`，下一次追加生成新的根条目 [@ref-omp-lt-lifecycle-tree-leaf]。
- **同名 artifact 目录**按去掉 `.jsonl` 后缀得到，`[session].jsonl` 的附件住在 `[session]/` [@ref-omp-lt-storage-artifacts-dir-code]。

### 格式与写入方式

JSONL，一行一个 JSON 对象。当前文件物理上以**固定 256 字节的 `type: "title"` slot（含换行）**开头，然后才是 header，然后是 `SessionEntry`；旧文件可能直接从 header 开始，加载器会剥掉这个物理 slot 并把它的标题/来源折进逻辑 header [@ref-omp-lt-storage-jsonl-title-slot]。标题之所以要这个 slot，是因为改名要避免全文件重写；`title_change` 是追加式审计条目，当前标题同时写进 slot [@ref-omp-lt-format-header-notes]。

写入前还有一层投影，因此"文件里看到的"不等于"内存里的"：超长字符串截断、瞬态字段剔除、图片与 base64 载荷外置成 `blob:sha256:[hash]` 引用都发生在这里，加载时普通图片引用再还原为内联载荷 [@ref-omp-lt-storage-size-controls-blobs]。写入规则：普通追加是追加；分支导航只移动内存里的 `leafId` 指针；定向重写/丢弃辅助函数可以改既有记录 [@ref-omp-lt-storage-jsonl-title-slot]。存储后端是可替换的——`SessionStorage` 定义文件系统式操作，`FileSessionStorage` 是真实本地文件，`MemorySessionStorage` 用于非持久会话与测试，`IndexedSessionStorage` 用于共享本地索引加有序远端发布（Redis/SQL 后端） [@ref-omp-lt-storage-abstractions]。也就是说"JSONL 追加"是默认后端的行为，不是协议保证。


## Schema 与生命周期 {#transcripts-schema-lifecycle}

### 记录结构

header 是文件里的第一个逻辑条目，字段集为 [@ref-omp-lt-format-header-example]：

```json
{
  "type": "session",
  "version": 3,
  "id": "019c625b-b900-7000-8000-000000000001",
  "timestamp": "2026-02-16T10:20:30.000Z",
  "cwd": "/work/pi",
  "title": "optional session title",
  "titleSource": "auto",
  "additionalDirectories": ["/work/shared"],
  "previousSessionFiles": ["/old/location/session.jsonl"],
  "providerPromptCacheKey": "optional inherited cache identity",
  "parentSession": "optional lineage marker"
}
```

其余所有条目共享 `SessionEntryBase`：`type`、8 字符 `id`、`parentId`、`timestamp`；`parentId` 可为 `null`（首次追加或 `resetLeaf()` 之后）。条目 id 通常是八个十六进制字符，碰撞耗尽时回退为完整 Snowflake id，**消费者不得假定固定宽度** [@ref-omp-lt-format-entry-base]。`titleSource` 是 `auto` 或 `user`，自动改名不能覆盖用户标题；`additionalDirectories` 是归一去重后的附加工作区根；`previousSessionFiles` 记录成功迁移后的旧绝对位置 [@ref-omp-lt-format-header-notes]。

`type` 取值全集是 `message`、`model_usage`、`thinking_level_change`、`model_change`、`service_tier_change`、`compaction`、`branch_summary`、`reset_boundary`、`custom`、`custom_message`、`label`、`title_change`、`ttsr_injection`、`credential_pin`、`session_init`、`mode_change` [@ref-omp-lt-format-entry-taxonomy]。其中 `type: "message"` 的 `message.role` 取值分两族：pi-ai 的对话族（`user`、`developer`、`assistant`、`toolResult`）与 pi-tui 的执行族（`bashExecution`、`pythonExecution`、遗留的 `hookMessage`、内联 `@file` 的 `fileMention`）[@ref-omp-lt-format-persisted-roles-conversation][@ref-omp-lt-format-persisted-roles-tui]。重建时 `branch_summary`、`compaction`、`custom_message` 会分别合成为 `branchSummary`、`compactionSummary`、`custom`，因此**持久化形态与重建角色不是一一对应**，读取方必须按 `type` 判别 [@ref-omp-lt-format-reconstructed-roles]。

版本迁移。当前会话版本 `3` [@ref-omp-lt-schema-versioning-migration]：

| 从 → 到 | 触发条件 | 动作 |
|---|---|---|
| v1 → v2 | header `version` 缺失或 `< 2` | 给每个非 header 条目补 `id`/`parentId`，按文件顺序重建线性父链，把 compaction 字段 `firstKeptEntryIndex` 迁成 `firstKeptEntryId`，header `version = 2` |
| v2 → v3 | header `version < 3` | 把 `message` 条目里遗留的 `message.role === "hookMessage"` 重写为 `"custom"`，header `version = 3` |

迁移在加载时（`setSessionFile`）运行；只要跑过迁移，内存表示就被标记为“下次持久化全量重写”，重写发生在下一次持久化操作时而不是立刻 [@ref-omp-lt-schema-migration-trigger]。

**`custom` 家族在本轮有了一个可引用的具体实例**。commit `788cf9e` 的随仓文档把 `system-prompt-digest` 列为 core-owned 值：载荷是一个十六进制字符串（基础 system prompt 块的哈希，取自 per-turn hook 覆盖之前），`AgentSession` 会在主模型回话的 prompt 与该分支最新记录不同时、且在该回复之前追加它，并在 rewind 分支上把它带到被改挂的兄弟回复上 [@ref-omp-lt2-schema-prompt-digest-doc]。代码侧的形态是 `type: "custom"` 且 `customType: "system-prompt-digest"` 的条目，`data` 为字符串；恢复会话后的第一次模型调用前，前缀绑定的 tool-list 重建只有能复现同一 prompt 才提交，没有这条记录就冻结 [@ref-omp-lt2-schema-prompt-digest-doc][@ref-omp-lt2-schema-prompt-digest-code]。也就是说 `custom` 的 `data` 字段是 per-`customType` 的多态载荷，读取方不能按 `type: "custom"` 假定统一结构。

**本轮变化：`custom_message` 家族有了第二个可引用的具体实例**。commit `adc7fed5` 引入 `SESSION_TRANSFER_MESSAGE_TYPE = "session-transfer"`，落盘形态是 `type: "custom_message"`、`customType: "session-transfer"`、`details` 为多态对象，`kind` 决定字段：`arrived` 带 `fromCwd`/`cwd`，`departed` 带 `to`，`forked` 带 `source`/`to` [@ref-omp-lt3-archive-transfer-marker-code]。这与 `system-prompt-digest` 一起说明：`custom`/`custom_message` 的载荷是 per-`customType` 的，读取方不能按 `type` 假定统一结构。与 `system-prompt-digest` 不同的是，`session-transfer` 会被回放逻辑读取——`lastSessionTransfer()` 扫描追加顺序找最后一条 `departed` 并据此改变 resume 行为，所以它不是纯旁路输出。

**schema 缺口（如实列出）**：固定来源没有随包发布的机器可读 schema 文件（无 JSON Schema、无 `.schema.json`）；除上面已定位的 `system-prompt-digest` 与本轮新增的 `session-transfer` 外，`custom` 的其它 `customType`、`ttsr_injection`、`credential_pin`、`session_init`、`label` 这几个条目类型的字段定义本轮没有逐一定位到行，只确认它们在联合类型里存在；`providerPayload` 的结构由各 provider 实现决定，源码里没有统一约束；本轮没有查证旧版本读取新格式时的行为——**新写的 `session-transfer` 标记被旧版本读取时的行为尤其未验证**。

### 生命周期

1. **创建与命名**。`SessionManager.create/open/continueRecent/forkFrom` 进持久化模式，`SessionManager.inMemory` 是不持久模式配 `MemorySessionStorage` [@ref-omp-lt-lifecycle-persist-vs-memory]；该模式下没有会话文件路径，`--continue`/`--resume`/`--fork` 与外部会话导入都会被拒绝，`/export` 报 `Cannot export in-memory session to HTML`，只有 `/dump` 与 `/share` 仍可用 [@ref-omp-lt-lifecycle-in-memory-mode]。
2. **惰性落盘门槛**。新的普通会话在出现首条 assistant 消息或调用方显式 `ensureOnDisk()` 之前**只在内存里**；跨过门槛时写入完整 title slot、header 与累积条目。显式 `newSession()`（含 `/new`）返回前会调 `ensureOnDisk()`，以保住跨终端的空会话边界；此后条目增量追加 [@ref-omp-lt-lifecycle-lazy-persistence-gate]。**这条对排错很关键**：刚开就退出的会话可能没有文件，只能靠 `fresh` 面包屑占位。
3. **加载**。`loadEntriesFromFile(path)`：文件缺失返回 `[]`（除非 `throwIfMissing: true`）；当前 ≥8 MiB 的文件走流式 JSONL 加载器，更小或非文件存储走全文读；损坏记录被跳过并计数；固定宽度 title slot 被剥离折进 header；首个逻辑条目不是合法 session header 时返回 `[]` [@ref-omp-lt-lifecycle-load-behavior]。
4. **打开与续接**。`setSessionFile()`：缺失或真空的文件在该确切路径初始化新会话并立即物化 header，`open(..., { throwIfMissing: true })` 则拒绝缺失/空输入；非空但没有合法首条 header 的数据被拒绝且**不改文件**；合法文件加载、必要时迁移、解析 blob 引用、再索引 [@ref-omp-lt-lifecycle-set-session-file]。**本轮变化：CLI 的路径式 `--resume` 变成 fail-closed**。commit `788cf9e` 的启动路径对看起来像路径的值（`/`、`\` 或 `.jsonl`）一律传 `throwIfMissing: true`，ENOENT/ENOTDIR 被翻译成 `Session "〈path〉" not found.` 的 `SessionResolutionError` [@ref-omp-lt2-resume-missing-path-code]；随仓文档同此说法——"a missing path fails with `Session "〈path〉" not found.` instead of creating a session there" [@ref-omp-lt2-resume-missing-path-doc]。这与上一版记录的"缺失路径会就地初始化新会话"的 CLI 行为相反：库的 `setSessionFile()` 仍在缺失路径上初始化，但**命令行不再走到那条路上**。同一份 enterability 策略也适用于会话选择器的选择：缺失的直接路径失败，已存在的空文件或畸形非空 header 同样 fail closed 且不修改文件 [@ref-omp-lt2-resume-enterability-doc]。`--continue` 的解析顺序见诊断小节。
5. **分支与上下文重建**。每次普通追加生成一条新条目并前移 `leafId`，`appendMessageToBranch()` 向显式父节点追加而不动活叶子，`branch(entryId)` 只移动叶子指针、`resetLeaf()` 让下一次追加生成新根 [@ref-omp-lt-lifecycle-tree-leaf]。`buildSessionContext(entries, leafId?, byId?, options?)` 决定送给模型的内容，`options.transcript: true` 改走展示用 transcript。
6. **失败模型**。普通追加失败被**锁存并只记录一次**（带会话文件上下文），不抛进 turn 循环；后续追加可重试完整的内存 journal，`flush()`/`flushSync()` 与 close 才暴露未解决的失败。`onPersistenceNotice` 报告会话移动到兄弟文件，以 home 相对路径在交互模式显示为警告、print 模式写 stderr、RPC 作为 `warning` 通知帧 [@ref-omp-lt-lifecycle-error-behavior]。
6b. **全文件重写是按行流式发布的**。commit `788cf9e` 把"全文件重写"这一条路径改成按行流式发布，**磁盘上的字节内容与顺序没有变化**，变的是内存峰值：`SessionStorage` 新增可选的 `writeLinesSync()` 与 `writeLinesAtomic()`，语义与对应 `writeTextSync`/`writeTextAtomic` 相同（同样的暂存、大小检查与冲突处理），只是不必先把所有行拼成一个字符串 [@ref-omp-lt2-storage-streaming-write-sync-code][@ref-omp-lt2-storage-streaming-write-atomic-code]；没有实现这两个方法的后端由调用方 `lines.join("")` 后回落到整串写入，所以自定义后端不会被迫升级。`SessionManager` 相应地按 title slot、header、逐条 entry 组成 `lines` 并同时累计字节数 [@ref-omp-lt2-lifecycle-body-lines-code]。
6c. **暂存临时文件的命名在本轮变成了一个跨模块契约**。commit `adc7fed5` 把重写暂存路径从两处内联拼接提取成导出的 `sessionStagingPath(target)` 与正则 `SESSION_STAGING_RE = /^\.(.+)\.[0-9a-f]{16}\.tmp$/`（捕获组 1 是目标 basename），`writeTextSync` 与 `writeTextAtomic` 都改调它 [@ref-omp-lt3-storage-staging-path-code]。命名形态与磁盘布局都没有变（仍是目标同目录下的 `.〈basename〉.〈snowflake〉.tmp`），变的是它现在被 GC 直接消费——见清理小节的 temp 清扫。也就是说这个此前只是实现细节的隐藏文件模式，现在是 `omp gc` 会按 mtime 回收的对象。
6d. **本轮变化：所有 resume 路径都多一道"已搬走则分叉"的守卫**。`createSessionManager()` 在路径式 `--resume`、按 id/cwd 解析的 `--resume`、会话移动后的恢复、`--continue`、配置驱动的 auto-resume 以及选择器选中之后，都把结果包进 `forkIfMovedAway()`；它只在 transcript 最后一条 `session-transfer` 标记为 `departed` 时才改变行为 [@ref-omp-lt3-lifecycle-resume-forks-code][@ref-omp-lt3-lifecycle-fork-if-moved-away-code]。对本章的排错含义是：**"我明明 resume 了一个会话却多出一个新会话"在 `adc7fed5` 之后可能是正确行为**，先查该 transcript 末尾有没有 `departed` 标记，而不是先怀疑路径解析。
7. **上下文压缩后延续**。压缩写 `compaction` 条目，只改变"读多少"，不删除旧消息；`reset_boundary` 同理 [@ref-omp-lt-format-reset-boundary][@ref-omp-lt-lifecycle-clear-retains-file]。
8. **交给子代理**。子代理会话是**独立会话文件**，父子关系落在 header 的 `parentSession` 字符串上；面包屑指向子代理会话时会先解析回交互根会话，避免 `--continue` 恢复成子代理记录 [@ref-omp-lt-format-header-notes][@ref-omp-lt-lifecycle-breadcrumb-root-code]。委派机制本身属于自定义 agent 主题（`agents.invocation`）。

## 数据库与索引的分工 {#transcripts-database}

**正文不在数据库里**。`history.db` 是与 JSONL 并存的辅助数据库，承担三类职责：

- **prompt 输入历史**。DDL 是 `history(id, prompt UNIQUE, created_at, cwd, session_id, use_count)` 加 `created_at DESC` 索引 [@ref-omp-lt-database-history-table-ddl-code]，FTS5 虚拟表 `history_fts(prompt, content='history', content_rowid='id')` 由插入触发器维护 [@ref-omp-lt-database-history-fts-code]。文档说它服务 prompt 回忆/搜索而**不是**会话回放：换行与首尾空白归一后跨库去重，重新提交更新最新时间戳/cwd/session 并递增 `use_count`，`add()` 在返回已 resolve 的 promise 之前同步写入、失败只记日志 [@ref-omp-lt-diagnostics-history-storage-scope]。
- **会话标题索引**。`session_titles(session_id PRIMARY KEY, title, updated_at)`；标题创建或改名时写入，近期会话回退扫描也会回填，让欢迎页的 "Recent sessions" 用 stat + 查询代替扫描项目目录里每个会话文件（文档说在数千会话的目录上这是数百毫秒级差异） [@ref-omp-lt-database-index-tables-doc][@ref-omp-lt-database-index-ddl-code]。
- **空闲 recap 日志**。`session_recaps(id, session_id, cwd, recap, created_at)` 是只追加表，recap 是**旁路输出，从不进入会话 JSONL 或 LLM 上下文**，这张表是它唯一的持久记录；`omp gc` 会删除已归档会话的行 [@ref-omp-lt-database-index-tables-doc][@ref-omp-lt-database-index-ddl-code]。
- **本轮变化：标题行也进入 GC 的删除范围**。commit `788cf9e` 的索引模块注释在 `session_titles` 条目下补了"A title has no life beyond its session; `omp gc` drops rows of archived sessions"，与 `session_recaps` 的措辞并列 [@ref-omp-lt2-database-titles-have-no-life-doc]。这一条在此前的 commit 上不成立——上一版据 fc6c0c9 只对 recap 记录了归档删除行为。

数据库路径是 `dirs.agentSubdir(agentDir, "history.db", "data")`，与 `sessions/`、`blobs/` 同在 data 域 [@ref-omp-lt-database-history-db-path-code]。同一模块的注释说明索引侧持有自己惰性打开的连接而不是 `HistoryStorage` 的路径绑定单例，因为 db 路径每次调用都重新解析，`setAgentDir`/profile 切换要能透明重开；**它从不给 db 设版本**——`PRAGMA user_version` 归 `HistoryStorage` 的重建流程所有，而那次重建只删自己的表 [@ref-omp-lt-database-index-tables-doc]。

恢复一个会话**必需**的是该会话的 JSONL 文件、它的同名 artifact 目录，以及 JSONL 里引用的 blob；`history.db` 里的 `session_titles` 与 `history` 行只影响列表显示与 prompt 回忆，删掉之后程序会回退到内容扫描再回填 [@ref-omp-lt-diagnostics-history-storage-boundary]。**能重建的**：表结构（DDL 常量在源码里）、索引、`history_fts`（有 rebuild 触发路径）。**不能重建的**：会话正文、artifact 内容、被引用且已从 blob store 扫掉的附件。

## 归档、备份、移动与删除 {#transcripts-cleanup-archive}

### `omp gc`：四个默认阶段 + `f1ac114d` 起新增的 compress，默认只预览

`omp gc` 默认预览，需要 `--apply` 才真正清扫无引用 blob、归档符合条件的冷会话、checkpoint 数据库 WAL 或剪除陈旧状态；存储维护与模型上下文压缩是两件事 [@ref-omp-lt-cleanup-manual-maintenance]。阶段开关 [@ref-omp-lt-cleanup-gc-phase-flags-code]：

```text
--apply                      Apply changes (default is dry-run)
--json                       Output JSON
--agent-dir DIR             Agent directory to maintain
--blobs                      Sweep unreferenced blobs
--archive                    Archive cold sessions
--wal                        Checkpoint history/model database WAL files
--stale                      Prune dangling session markers/breadcrumbs and old debug reports and collab replicas
```

`f1ac114d` 在同一组开关里加了第五个阶段 `--compress`（与 `--stale` 一样是显式 opt-in）（描述 "Store idle sessions with filesystem compression in place (APFS, NTFS)"），保留参数里加了 `--compress-after-days`（描述 "Minimum idle days before compressing a session"） [@ref-omp-lt4-cleanup-compress-flag-code]。对应的注册设置是 `gc.compress`（boolean，默认 `false`）与 `gc.compressAfterDays`（number，默认 `7`），注释写明它是 opt-in 的："rewrites cold session files in place through the filesystem's transparent compression (APFS, NTFS), so it needs an explicit request" [@ref-omp-lt4-cleanup-compress-settings-code]。随仓 CHANGELOG 用一句话确认了同一对开关与默认值："Added opt-in `omp gc --compress` (or `gc.compress`), which stores sessions idle for `gc.compressAfterDays` (default 7) with filesystem transparent compression (APFS, NTFS); they stay resumable and searchable" [@ref-omp-lt4-changelog-compress-doc]。

保留参数 [@ref-omp-lt-cleanup-gc-retention-flags-code]：`--cold-archive-after-days`、`--retain-newest-global`、`--retain-newest-per-cwd`、`--stale-retain-newest`、`--stale-retain-days`。对应配置项默认值是 `gc.blobs`/`gc.archive`/`gc.wal` 为 true、`gc.coldArchiveAfterDays` 30、`gc.retainNewestGlobal` 20、`gc.retainNewestPerCwd` 10 [@ref-omp-lt-cleanup-gc-settings-code]；**陈旧状态阶段是显式 opt-in**——`gc.stale` 默认 false，因为与其它阶段不同它删的是用户可见文件（debug 报告、collab 副本），一次不带限定的 `omp gc --apply` 不动它们；`gc.staleRetainNewest` 默认 20、`gc.staleRetainDays` 默认 30 [@ref-omp-lt-cleanup-gc-stale-settings-code]。

阶段顺序在 `adc7fed5` 上是 stale → blobs → archive → wal，整体在一把 GC 锁内执行；注释写明理由是"先剪陈旧状态，被剪掉的 collab 副本随后就在本轮 blob 清扫里释放" [@ref-omp-lt-cleanup-gc-run-order-code]。**`f1ac114d` 把 compress 插在 archive 之后、wal 之前**：`runGcCommand()` 现在的调用序列是 stale → blobs → archive → compress → wal，五步都仍在同一把 `withGcLock` 里 [@ref-omp-lt4-cleanup-compress-run-order-code]。

**本轮变化：sessions 阶段多扫一类文件——transcript 重写临时文件**。commit `adc7fed5` 的随仓文档写明："The sessions phase also removes transcript rewrite temps (`.〈name〉.jsonl.〈snowflake〉.tmp`, and the same pattern beside registered `--session` files) once they are past the 5-minute write grace. A live rewrite renames its temp into place within milliseconds, so an older one was left by a killed or crashed writer." [@ref-omp-lt3-cleanup-staging-temps-doc] 代码侧的对应实现是 `collectSessionStagingFiles()` 与 `sweepSessionStagingFiles()`：前者用 `**/.*.jsonl.*.tmp`（`dot: true`）扫 sessions 根目录下所有 `.jsonl` 的 staging temp，并额外按 basename 前缀匹配已登记会话文件旁边的同形 temp，从而覆盖 `--session` 路径与 collab 副本 [@ref-omp-lt3-cleanup-staging-temp-glob-code]；后者对每个候选 stat 后跳过 `mtimeMs > Date.now() - GC_WRITE_GRACE_MS` 的，其余计入 `wouldDeleteTemps`/`tempBytes`，`--apply` 时 `unlink` 并计入 `deletedTemps`，ENOENT 之外的单文件错误进入 `errors` [@ref-omp-lt3-cleanup-staging-temp-sweep-code]。三个要点值得记住：

- **它属于 sessions（archive）阶段，而不是 stale 阶段**，因此不需要 `gc.stale` opt-in；默认只预览，`--apply` 才删 [@ref-omp-lt3-cleanup-staging-temp-sweep-code]。
- **回收宽限与归档宽限是同一个 5 分钟常量**（`GC_WRITE_GRACE_MS`），注释给的理由是活的 publish 会在毫秒级内把 temp rename 到位，留着的一定是被 kill 或崩溃的写者留下的 [@ref-omp-lt3-cleanup-staging-temp-sweep-code]。
- **报告里多一行**：`session staging temps: 〈deleted〉/〈would〉 files, 〈bytes〉`，只在 `wouldDeleteTemps > 0` 时出现 [@ref-omp-lt3-cleanup-gc-temp-report-code]。

配套的一处语义变化：登记会话路径的收集函数从 `collectRegisteredSessionFiles()` 改成 `collectRegisteredSessionPaths()`，不再要求被登记的目标文件存在——注释写明"A first save may leave only its staging temp, so the target need not exist when reclaiming crash leftovers"。blob 清扫那侧仍保留 `isFile()` 过滤，只有 temp 清扫用不存在的路径 [@ref-omp-lt3-cleanup-registered-session-paths-code]。这正好解释了为什么 sweep 要在 stale 清理**之前**收集登记路径：`runGcCommand()` 的注释是"Stale cleanup may prune a missing first-save target's registry marker" [@ref-omp-lt3-cleanup-registered-session-paths-code]。

### `omp gc --compress`：把空闲会话就地交给文件系统透明压缩

**这是 `f1ac114d` 相对上一版新增的唯一清理/保留机制，也是 `transcripts.cleanup` 的答案变化点；`transcripts.archive` 因为"它与归档不同"这一点被连带记录。** 官方文档对该阶段的表述是："The compress phase is opt-in as well: `--compress` or `gc.compress` (default off). It stores every file of a session (the transcript and its artifact tree) with the filesystem's transparent compression once the transcript has been idle for `gc.compressAfterDays` (default 7, `--compress-after-days`); files written more recently are skipped." [@ref-omp-lt4-cleanup-compress-doc]

几条从实现能直接读出的边界：

- **它清扫的对象是"自己的暂存目录"，不是会话记录**。暂存目录前缀是 `.omp-gc-compress-`，glob 形态是 `**/.omp-gc-compress-*`；每个目录在写入任何东西之前先放一个 owner marker `.omp-gc-compress-owner`，注释写明这样清扫就只递归删除 gc 自己建的目录，"a session artifact can carry any name" [@ref-omp-lt4-cleanup-compress-scratch-glob-code]。`sweepCompressScratch(roots, apply, errors)` 的注释与实现一致：只删除带 owner marker 的目录，未带 marker 的非空目录跳过，被杀在写 marker 之前的运行留下的空目录用 `rmdir` 收掉 [@ref-omp-lt4-cleanup-compress-scratch-sweep-code]。同一个前缀也被 stats 侧的会话文件枚举显式排除，注释写明这些 `.jsonl` 是 transcript 的临时副本、"never transcripts of their own" [@ref-omp-lt4-cleanup-compress-scratch-prefix-code]。
- **清扫范围是 sessions 根目录与 archive 根目录两处**，而且只在 APFS 上做——`runCompressGc()` 的分支条件是 `method === "apfs"`，注释解释归档会把 artifact 树里遗留的暂存目录一起搬进 archive 根 [@ref-omp-lt4-cleanup-compress-scratch-roots-code]。这条路径**只由 `--compress` 触发**，不依赖 `gc.stale`，也不在 sessions（archive）阶段的 `.jsonl.*.tmp` 清扫里——上一节那条 temp 清扫扫的是 `.〈name〉.jsonl.〈snowflake〉.tmp`，与 `.omp-gc-compress-*` 是两套互不相干的命名。
- **空闲判定是"会话 modified 早于 cutoff"，cutoff 取天数门与 5 分钟写宽限的较大者**：`cutoffMs = Date.now() - Math.max(options.compressAfterDays * DAY_MS, GC_WRITE_GRACE_MS)`，随后逐会话用 `session.modified` 过滤 [@ref-omp-lt4-cleanup-compress-cutoff-code]。
- **租约是整棵会话树的，不只是自己的 transcript**。`tryAcquireSessionTreeLeases()` 的注释写明它为会话自身 transcript **以及 artifact 树里嵌套的每一个 transcript**（子代理会话，或任何进程能用 `--session` 打开的文件）取租约，识别依据是 session header 而不是文件名；同一个 session id 只取一次，"so a copied transcript that shares an id does not read as live"；任何一个取不到就整体返回 null 并释放已取的全部 [@ref-omp-lt4-cleanup-compress-tree-lease-code]。也就是说"某个子代理会话正被别的进程写"会让整个父会话被跳过，计入 `skippedLive`。
- **文件系统支持是硬前提**。官方文档把检测方式与写入机制分别写明：APFS（macOS）按目录 device 匹配挂载表里的 `apfs` 条目，用 `ditto --hfsCompression` 写压缩副本到新建的 `.omp-gc-compress-XXXXXX` 暂存目录；NTFS（Windows）用 `GetVolumeInformationW` 检测且必须报告支持逐文件压缩，再用 `compact /c` 就地设 LZNT1 压缩；并明确 "Other filesystems report the phase as unsupported" [@ref-omp-lt4-cleanup-compress-fs-doc]。WOF（`compact /exe`）被明确排除，理由是写一次会把整个文件膨胀。
- **文本报告多一组行**：不支持时是 `compress: unsupported on this filesystem (APFS or NTFS only)`；支持时是 `compress: 〈compressed〉/〈wouldCompress〉 files in 〈sessions〉 sessions, 〈bytes〉 on disk before`（`--apply` 时再追加 `, 〈after〉 after`），另有 `compress skipped live: 〈n〉`、`compress leftover scratch dirs removed|found: 〈n〉`、`compress errors: 〈n〉` [@ref-omp-lt4-cleanup-compress-report-code]。

**与归档的差别是这一节最需要记住的一句**：compress **不删任何东西**。官方文档在同一段里写明 "Unlike archiving, a session with an interrupted last turn qualifies"，路径、字节与 mtime 都不变，也不删除 history 或 stats 行，所以压缩后的会话仍可续接。因此 `transcripts.archive` 仍记为 partial：`.jsonl.gz` 归档的恢复缺口没有被 compress 填上——compress 是就地压缩，产物仍在 sessions 根目录里，不是可搬运的归档 [@ref-omp-lt4-cleanup-compress-doc]。反过来，上一版记录的"归档阶段会删掉 `history.db` 里的行（含 `session_titles`）"这一条对 compress **不成立**，排错时不要把两者的副作用混为一谈。

### 归档是"压缩移走"，不是可携带归档

归档目录是 `path.dirname(getSessionsDir(agentDir))/archive/sessions` [@ref-omp-lt-cleanup-archive-dir-code]。归档候选要连过三道闸：会话状态不在活动集合、修改时间早于写入宽限、且没有活的嵌套子会话 [@ref-omp-lt-cleanup-archive-gate-code]；之后按全局/每 cwd 的最新 N 条保留规则放行，最后才检查 `--cold-archive-after-days` 年龄门 [@ref-omp-lt-cleanup-archive-age-code]。

因此归档产物是 `[archive]/sessions/[相对桶路径].jsonl.gz` 这类**压缩移走的文件**，而不是一个能整体搬运的会话包。这带来几个具体后果：

- **可移植性**：JSONL 里存的是 `cwd` 绝对路径、`previousSessionFiles` 旧绝对位置、`custom-session-files` 标记里记的绝对路径、blob 引用 `blob:sha256:[hash]`。换机器或换路径后，cwd 不匹配、`--continue` 的面包屑与目录同一性判断都不会把它当作同一项目 [@ref-omp-lt-format-header-notes][@ref-omp-lt-diagnostics-continue-fallback]。
- **完整性**：归档阶段会同时删掉该会话在 `history.db` 里的行（报告里是 `historyRowsDeleted` 与 `statsRowsDeleted` 计数）[@ref-omp-lt-diagnostics-gc-report-code]。也就是说归档不只是"搬走"，还会**丢弃标题索引与 recap 历史**。
- **本轮变化：标题行的删除是可核对的实现事实**。commit `788cf9e` 的 `deleteHistoryRowsForSessions()` 现在同时探测 `session_titles` 表，并在同一事务里对每个被归档的 session id 执行 `DELETE FROM session_titles WHERE session_id = ?`，注释写明 recaps 与 titles 都是 "session-scoped side output with no life beyond their session"；表不存在时该语句整体跳过，报告里的 `historyRowsDeleted` 仍只统计 `history` 表的行数，标题删除不单独计数 [@ref-omp-lt2-gc-drops-session-titles-code]。
- **本轮变化：多了一个不丢数据的同类机制，但它不是归档**。`f1ac114d` 的 compress 阶段同样用文件系统压缩，但产物留在 sessions 根目录、路径/字节/mtime 不变、且不删 history 或 stats 行 [@ref-omp-lt4-cleanup-compress-doc]；它在阶段序列里排在 archive 之后、wal 之前 [@ref-omp-lt4-cleanup-compress-run-order-code]，因此"归档会丢标题与 recap 历史"这条**只对 archive 成立**，对紧随其后的 compress 不成立。
- **归档后能否恢复**：`.jsonl.gz` 归档本身在固定来源里仍没有查到恢复回活动目录的官方路径——**但 commit `adc7fed5` 新增了一条独立的搬运通道，见下一小节**，它不读 `.jsonl.gz` 归档。CLI 侧另有 `--export [session]` 导出 HTML 后退出，那是展示产物，不是可续接的会话 [@ref-omp-lt-entry-scope-cli-session-flags]。`transcripts.archive` 仍记为 partial：`.jsonl.gz` 的恢复缺口没有被填上。

### `omp session pack|unpack|moved`：跨机搬运的会话档案

**本轮变化：这是 `adc7fed5` 相对上一版最大的新增能力，也是 `transcripts.archive` 唯一新增的可携带形态。** 新增 CLI 命令 `omp session` 带三个动作 [@ref-omp-lt3-archive-transfer-command-code]：

```text
omp session pack 〈session〉 〈out.tar〉
omp session unpack 〈archive.tar〉 --cwd 〈dir〉
omp session moved 〈session〉 --to 〈label〉
```

档案是一个**普通 tar**，成员布局固定 [@ref-omp-lt3-archive-transfer-module-code]：

```text
manifest.json          # { version, id, cwd（打包机 header 里的）, omp（写入方版本） }
session.jsonl          # journal，逐字节原样
artifacts/〈path〉       # 该会话的 artifacts 目录（含子代理 transcript）
blobs/〈sha256〉         # journal 与 artifact transcript 引用到的每个 blob
```

几条从实现能直接读出的行为：

- **`pack` 会拒绝别人正在写的会话**。`claimSessionOrRefuse()` 先通过 `FileSessionStorage().claimSession(id, file)` 取本进程的所有权租约（注释写明这就是 `SessionManager.moveTo` 用的那把检查），取不到就抛 `Cannot 〈action〉 〈file〉: another live omp process writes this session. Exit it first. Nothing was changed.` [@ref-omp-lt3-archive-pack-lease-code]。`packSession()` 的文档注释确认租约在读取文件全程持有，并明确它拒绝别的活进程正在写的会话 [@ref-omp-lt3-archive-pack-atomic-code]。输出先写同目录暂存文件 `〈target〉.〈snowflake〉.tmp` 再原子 rename，失败时删掉暂存再抛，因此不留半份档案 [@ref-omp-lt3-archive-pack-atomic-code]。本地 blob store 缺 hash 时只 `logger.warn` 并把这些 hash 列进 `missingBlobs`，**档案仍会写出，但那些图片在 unpack 后不会加载** [@ref-omp-lt3-archive-pack-missing-blobs-code]。
- **`unpack` 的三种落位模式**由 `UnpackMode` 定义：`created`（本地无副本）、`replaced`（本地副本是传入 journal 的前缀，被整体替换）、`forked`（本地副本已分叉，传入 journal 以新 id 落地为 fork）[@ref-omp-lt3-archive-unpack-mode-code]。分叉分支的实际代码是：逐个本地副本用 `isTranscriptPrefix()` 比对条目 id 序列，只要有任一副本不是前缀就置 `diverged`，随后 `SessionManager.forkFrom()` 落地并记 `Unpacked session as a fork of a diverged local copy`，本地副本原样保留 [@ref-omp-lt3-archive-unpack-forked-code]。`unpackSession()` 的文档注释同时给出前置校验与落位顺序：写任何东西之前整体校验 manifest 版本、成员布局与每个 blob 的 sha256；blob 先入本地 store；journal 与 artifacts 落在临时目录后用 `openRelocated` 搬入并改写 header `cwd`；最后追加 `arrived` 标记；本地副本被整体替换时若落位失败会回滚 [@ref-omp-lt3-archive-unpack-placement-code]。
- **搬运在 transcript 里留痕，标记类型是 `custom_message` 的 `session-transfer`**。`SessionTransferDetails` 有三态：`arrived`（`fromCwd`/`cwd`）、`departed`（`to`）、`forked`（`source`/`to`）。`pack` 侧不写标记，`moved` 给留下的副本追加 `departed`，`unpack` 追加 `arrived`，恢复陈旧副本时追加 `forked`；每条都是模型可见的 `custom_message` 并立即 `flush()` [@ref-omp-lt3-archive-transfer-marker-code]。
- **`moved` 之后 resume 会分叉而不是续接**。`forkIfMovedAway()` 读 transcript 里最后一条 transfer 标记，若为 `departed` 就关闭原会话、从它 fork 出带可见 `forked` 通知的新会话；否则原样返回 [@ref-omp-lt3-lifecycle-fork-if-moved-away-code]。`createSessionManager()` 现在把**每一条** resume 路径都包进这个守卫：路径式 `--resume`、按 id/cwd 解析出的 `--resume`、两处会话移动之后的恢复、以及 `--continue` 与配置驱动的 auto-resume [@ref-omp-lt3-lifecycle-resume-forks-code]。

因此搬运的完整代价现在是可描述的：跨机后 header `cwd` 被改写成新机器的目录（旧的记进 `previousSessionFiles`），本地缺失的 blob 不会凭空出现，原地那份若被 `moved` 标记为陈旧则只能以 fork 形式继续——这些是本命令的既定语义，而不是"没有官方路径"。**仍未解决**的是 `.jsonl.gz` 归档目录的恢复、以及 `omp stream`/分享这类外部备份形态。

### 删除与保留

官方删除入口有两类：

- **`/delete`**（交互式）。它走与 `/new` 相同的切换但带 `drop: true`，需要会话文件路径，尝试删除旧 JSONL 与 artifact 树而不是保留它们，删除失败也仍然起新会话 [@ref-omp-lt-cleanup-delete-command]。文档在已知实现注意事项里明确说它是 **best-effort**：失败只记日志并仍会创建并切换到新会话，**部分失败可能把旧会话或其 artifacts 留在磁盘上，所以 `/delete` 不是保证的擦除边界** [@ref-omp-lt-cleanup-delete-not-erasure-boundary]。
- **会话选择器里的 Delete**。交互选择器里 Delete（或空搜索时按 Backspace）走确认流程，删除 JSONL 与 session artifacts [@ref-omp-lt-cleanup-picker-delete]。

底层删除实现先 unlink 会话文件，再按"去掉 `.jsonl` 后缀"算出 artifact 目录并递归删除；artifact 删除失败会抛出明确错误（此时会话文件已经没了），随后还会 best-effort 清理 EPERM 重写遗留的 `[name].jsonl.[snowflake].bak` 备份，注释说否则选择器扫描会把已删会话从最新陈旧备份里复活 [#11499] [@ref-omp-lt-cleanup-delete-session-code][@ref-omp-lt-cleanup-delete-backup-code]。

陈旧状态清理只处理**指针类文件**：扫描 `custom-session-files` 标记目录找悬空指针、扫描 `terminal-sessions` 面包屑目录找悬空面包屑（`fresh` 面包屑被显式排除，因为它标记的是尚未物化的 `/new` 边界）[@ref-omp-lt-cleanup-stale-markers-code]；在默认 agent dir 下还会按 `gc.staleRetainNewest`/`gc.staleRetainDays` 过期 debug 报告包与 collab 访客副本，副本若被某个终端面包屑指向则跳过 [@ref-omp-lt-cleanup-stale-collab-code]。

**删除前必须停止的写入者**：至少要退出所有正在使用该 agent dir 的 omp 进程。本轮在固定来源里查到的协调机制是 GC 自带的锁（`withGcLock`）与 `~/.omp/run/session-owners` 租约目录 [@ref-omp-lt-cleanup-gc-run-order-code][@ref-omp-lt-storage-session-owners-dir-code]；手工删除 JSONL 而不退出进程时，正在运行的会话仍持有内存 journal 并可能在后续追加时重建或继续写。**没有证据支持"手工删除某个 jsonl 是安全的"**——缺少证据不等于可以安全删除。

## 定位、完整性与排错 {#transcripts-diagnostics}

1. **先确认路径与桶**。默认布局、桶编码与迁移规则见存储小节；`--profile` 与 XDG 环境变量会改变根目录 [@ref-omp-lt-storage-layout-default][@ref-omp-lt-storage-agent-root-dirs-code]。
2. **列出与定位会话**。发现辅助函数在 `session-listing.ts`，`SessionManager` 提供项目作用域包装：`getRecentSessions(sessionDir, limit?)`（欢迎页元数据，默认 4 条）、`findMostRecentSession`（按 mtime）、`findMostRecentNonEmptySession`（`continueRecent` 用的可恢复内容）、`listSessions(sessionDir, storage)` / `SessionManager.list()`（项目作用域加生命周期状态） [@ref-omp-lt-diagnostics-discovery-utilities]。
3. **`--continue` 解析顺序**（排错"为什么续的不是我以为的那个"）：先读终端作用域面包屑，校验目标——已物化的目标可用，目标缺失时只有可选第三行是 `fresh` 才可用（标记尚未物化的 `/new` 边界）；`fresh` 目标缺失则**开新会话而不是回退去复活旧记录** [@ref-omp-lt-diagnostics-continue-order]。随后把陈旧的修复前子代理面包屑解析回交互父会话 [@ref-omp-lt-lifecycle-breadcrumb-root-code]；面包屑 cwd 不同时只在记录的 device/inode 与当前目录一致时重新生根（源码明确说"已删除、已卸载或跨文件系统移动的项目不是重命名的正面证据"），否则用 cwd 匹配的最近非空桶内会话，没有可用面包屑就按 mtime 取最新非空 [@ref-omp-lt-diagnostics-continue-fallback]。
4. **加载失败分类**。缺失或空路径在 `setSessionFile` 下会初始化并持久化新会话；非空文件 header 缺失或格式错误会抛 `Cannot resume session "...": the session header is missing or malformed. The file was not modified.`；严格 open/resume 路径可能拒绝没有条目的文件而不是创建；合法 header 之后的损坏 body 记录被宽松恢复并把文件标记为待重写。**header 恢复永远不会覆盖原文件** [@ref-omp-lt-diagnostics-missing-invalid-header]。
5. **持久化错误**。看到"会话移动到兄弟文件"的提示，对应的是 `SessionPersistenceNotice`（`reason`/`from`/`to`），不是失败；真正的追加失败被锁存且只记一次日志，靠 `flush()`/close 才暴露 [@ref-omp-lt-lifecycle-error-behavior]。
4b. **路径式 `--resume` 的报错形态**。commit `788cf9e` 起，路径式 `--resume` 指向不存在的文件时报 `Session "〈path〉" not found.` 并退出，而不是像库层 `setSessionFile()` 那样在该路径新建会话 [@ref-omp-lt2-resume-missing-path-code][@ref-omp-lt2-resume-missing-path-doc]；选择器选择走同一条 enterability 策略，空文件与畸形 header 也不修改原文件 [@ref-omp-lt2-resume-enterability-doc]。看到这条错误不要再按"路径写错了"之外的原因去找。
6. **GC 结果读取**。文本报告给出 `sessions: archived/wouldArchive archived, … history rows and … stats rows removed`、`sessions skipped active: …`、`session errors: …`、`wal: checkpointed | checkpoint dry-run, …` 等行 [@ref-omp-lt-diagnostics-gc-report-code]；**`adc7fed5` 起在 `wouldDeleteTemps > 0` 时多一行 `session staging temps: 〈deleted〉/〈would〉 files, 〈bytes〉`**，看到它就说明本轮识别到了超过 5 分钟宽限的重写临时文件 [@ref-omp-lt3-cleanup-gc-temp-report-code]。`--json` 给结构化结果，`agentDir`、`apply` 与 `lockPath` 都在里面，archive 结果另带 `wouldDeleteTemps`/`deletedTemps`/`tempBytes` [@ref-omp-lt-cleanup-gc-run-order-code]。
6c. **压缩相关的报告行**。`f1ac114d` 起 `omp gc` 文本报告可能出现 `compress: unsupported on this filesystem (APFS or NTFS only)`、`compress: 〈n〉/〈n〉 files in 〈n〉 sessions, … on disk before`、`compress skipped live: 〈n〉`、`compress leftover scratch dirs removed|found: 〈n〉`；看到 `unsupported` 说明当前文件系统不支持该阶段（此时什么都没扫），看到 `skipped live` 说明那些会话的 transcript 或其 artifact 树里嵌套的 transcript 正被运行中的进程持有租约 [@ref-omp-lt4-cleanup-compress-report-code]。
6b. **resume 却多出一个会话**。`adc7fed5` 起先查该 transcript 末尾有没有 `custom_message`/`session-transfer` 的 `departed` 标记；有则 resume 按设计分叉，见生命周期 6d [@ref-omp-lt3-lifecycle-fork-if-moved-away-code]。
7. **区分数据库与正文**。想把某个会话读出来，应读它的 JSONL；`history.db` 只服务 prompt 回忆与标题/recap 索引，删掉行不会删会话 [@ref-omp-lt-diagnostics-history-storage-boundary]。

**完整性检查的边界**：固定来源里没有提供校验或修复命令。可观察的健全信号是 `SessionManager.list()` 能列出带生命周期状态的会话、`--continue` 能解析到预期会话、以及 `omp gc --json` 的 `errors` 为空。任何超出这些信号（尤其是"手工改库/删文件之后是否安全"）的判断，本轮没有固定来源支撑。

**跨主题链接**：会话标题的持久化与自动命名属于配置与模型侧行为（`config.sources`、`config.defaults`）；子代理委派与父子谱系属于 `agents.invocation`；压缩摘要条目的产生属于 `models.responses` 的上下文构造。