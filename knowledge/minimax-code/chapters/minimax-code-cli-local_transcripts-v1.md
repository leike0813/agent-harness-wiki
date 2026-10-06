---
schema_version: 3
record_kind: production
edition_id: minimax-code-cli-local_transcripts-v1
harness_id: minimax-code
topic: local_transcripts
title: "MiniMax Code CLI 的本地会话记录：存储布局、JSONL schema、数据库分工、删除与诊断"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-history-dir-layout, ref-minimax-code-lt-history-dir-naming, ref-minimax-code-lt-session-id-encoding, ref-minimax-code-lt-history-manifest, ref-minimax-code-lt-history-manifest-identity, ref-minimax-code-lt-history-dir-create-mode, ref-minimax-code-lt-history-relative-dir-validation, ref-minimax-code-lt-history-location-legacy-discovery, ref-minimax-code-lt-history-location-manifest-index, ref-minimax-code-lt-db-file-relative-path, ref-minimax-code-lt-tui-runtime-dependency, ref-minimax-code-lt-sessions-row-identity, ref-minimax-code-lt-sessions-row-lineage, ref-minimax-code-lt-sessions-kind-check, ref-minimax-code-lt-resume-cli-options, ref-minimax-code-lt-continue-workspace-scoped]
  - section_id: transcripts-record-scope-and-format
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-history-message-record, ref-minimax-code-lt-persisted-message-fields, ref-minimax-code-lt-turn-config-shape, ref-minimax-code-lt-history-envelope-shape, ref-minimax-code-lt-history-envelope-decode, ref-minimax-code-lt-sensitive-turn-config-keys, ref-minimax-code-lt-jsonl-append-lane, ref-minimax-code-lt-jsonl-read-malformed, ref-minimax-code-lt-history-append-path, ref-minimax-code-lt-history-replace-atomic, ref-minimax-code-lt-message-rows-table, ref-minimax-code-lt-legacy-messages-table, ref-minimax-code-lt-session-assets-table, ref-minimax-code-lt-mavis-session-commands, ref-minimax-code-lt-mavis-session-messages-doc]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-history-envelope-shape, ref-minimax-code-lt-history-envelope-decode, ref-minimax-code-lt-history-artifact-shape, ref-minimax-code-lt-history-message-record, ref-minimax-code-lt-persisted-message-fields, ref-minimax-code-lt-turn-config-shape, ref-minimax-code-lt-message-rows-table, ref-minimax-code-lt-session-assets-table, ref-minimax-code-lt-sessions-row-identity, ref-minimax-code-lt-history-manifest-identity]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-history-dir-create-mode, ref-minimax-code-lt-history-manifest, ref-minimax-code-lt-history-location-legacy-discovery, ref-minimax-code-lt-jsonl-append-lane, ref-minimax-code-lt-history-append-path, ref-minimax-code-lt-history-replace-atomic, ref-minimax-code-lt-history-publish-snapshot, ref-minimax-code-lt-history-compact, ref-minimax-code-lt-checkpoint-media-rejection, ref-minimax-code-lt-compact-media-recovery, ref-minimax-code-lt-stale-compaction-repair, ref-minimax-code-lt-fork-parent-link, ref-minimax-code-lt-fork-origin-marker, ref-minimax-code-lt-rotation-continuation, ref-minimax-code-lt-resume-cli-options, ref-minimax-code-lt-continue-workspace-scoped]
  - section_id: transcripts-database-and-index
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-db-file-relative-path, ref-minimax-code-lt-db-open-path, ref-minimax-code-lt-db-integrity-check, ref-minimax-code-lt-sessions-row-identity, ref-minimax-code-lt-sessions-row-lineage, ref-minimax-code-lt-sessions-kind-check, ref-minimax-code-lt-sessions-fts-index, ref-minimax-code-lt-message-rows-table, ref-minimax-code-lt-legacy-messages-table, ref-minimax-code-lt-session-assets-table, ref-minimax-code-lt-message-repo-delete-rows, ref-minimax-code-lt-backup-file-naming, ref-minimax-code-lt-backup-if-pending, ref-minimax-code-lt-backup-retention-guard]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-backup-file-naming, ref-minimax-code-lt-backup-if-pending, ref-minimax-code-lt-backup-retention-guard, ref-minimax-code-lt-deletion-cascade, ref-minimax-code-lt-deletion-reparent, ref-minimax-code-lt-artifact-delete-fanout, ref-minimax-code-lt-deletion-gate-process-local, ref-minimax-code-lt-deletion-gate-admission, ref-minimax-code-lt-turn-diff-retention-window, ref-minimax-code-lt-turn-diff-retention-scope, ref-minimax-code-lt-log-retention-scope, ref-minimax-code-lt-history-delete-guard, ref-minimax-code-lt-message-repo-delete-rows, ref-minimax-code-lt-mavis-session-commands]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-minimax-code-lt-debug-history-export, ref-minimax-code-lt-db-integrity-check, ref-minimax-code-lt-jsonl-read-malformed, ref-minimax-code-lt-history-manifest-identity, ref-minimax-code-lt-history-location-manifest-index, ref-minimax-code-lt-history-relative-dir-validation, ref-minimax-code-lt-mavis-session-messages-doc, ref-minimax-code-lt-log-retention-scope]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope-and-format
        status: answered
        source_refs: [ref-minimax-code-lt-history-message-record, ref-minimax-code-lt-persisted-message-fields, ref-minimax-code-lt-turn-config-shape, ref-minimax-code-lt-history-envelope-shape, ref-minimax-code-lt-sensitive-turn-config-keys, ref-minimax-code-lt-message-rows-table, ref-minimax-code-lt-session-assets-table, ref-minimax-code-lt-mavis-session-messages-doc]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-minimax-code-lt-history-dir-layout, ref-minimax-code-lt-db-file-relative-path, ref-minimax-code-lt-sessions-row-lineage, ref-minimax-code-lt-continue-workspace-scoped]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-minimax-code-lt-history-dir-naming, ref-minimax-code-lt-session-id-encoding, ref-minimax-code-lt-history-manifest, ref-minimax-code-lt-history-manifest-identity, ref-minimax-code-lt-sessions-row-identity, ref-minimax-code-lt-sessions-kind-check]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope-and-format
        status: answered
        source_refs: [ref-minimax-code-lt-jsonl-append-lane, ref-minimax-code-lt-history-append-path, ref-minimax-code-lt-history-replace-atomic, ref-minimax-code-lt-jsonl-read-malformed, ref-minimax-code-lt-legacy-messages-table]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-minimax-code-lt-history-envelope-decode, ref-minimax-code-lt-history-artifact-shape, ref-minimax-code-lt-history-message-record, ref-minimax-code-lt-turn-config-shape, ref-minimax-code-lt-message-rows-table, ref-minimax-code-lt-session-assets-table, ref-minimax-code-lt-sessions-row-identity, ref-minimax-code-lt-history-manifest-identity]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-minimax-code-lt-history-dir-create-mode, ref-minimax-code-lt-history-manifest, ref-minimax-code-lt-jsonl-append-lane, ref-minimax-code-lt-history-append-path, ref-minimax-code-lt-history-publish-snapshot, ref-minimax-code-lt-history-compact, ref-minimax-code-lt-checkpoint-media-rejection, ref-minimax-code-lt-compact-media-recovery, ref-minimax-code-lt-stale-compaction-repair, ref-minimax-code-lt-fork-parent-link, ref-minimax-code-lt-fork-origin-marker, ref-minimax-code-lt-rotation-continuation, ref-minimax-code-lt-resume-cli-options, ref-minimax-code-lt-continue-workspace-scoped]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-and-index
        status: answered
        source_refs: [ref-minimax-code-lt-db-file-relative-path, ref-minimax-code-lt-db-open-path, ref-minimax-code-lt-db-integrity-check, ref-minimax-code-lt-sessions-row-identity, ref-minimax-code-lt-sessions-row-lineage, ref-minimax-code-lt-sessions-fts-index, ref-minimax-code-lt-message-rows-table, ref-minimax-code-lt-legacy-messages-table, ref-minimax-code-lt-session-assets-table, ref-minimax-code-lt-message-repo-delete-rows, ref-minimax-code-lt-backup-file-naming, ref-minimax-code-lt-backup-if-pending]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-minimax-code-lt-backup-file-naming, ref-minimax-code-lt-backup-if-pending, ref-minimax-code-lt-backup-retention-guard, ref-minimax-code-lt-mavis-session-commands]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: answered
        source_refs: [ref-minimax-code-lt-deletion-cascade, ref-minimax-code-lt-deletion-reparent, ref-minimax-code-lt-artifact-delete-fanout, ref-minimax-code-lt-deletion-gate-process-local, ref-minimax-code-lt-deletion-gate-admission, ref-minimax-code-lt-turn-diff-retention-window, ref-minimax-code-lt-turn-diff-retention-scope, ref-minimax-code-lt-log-retention-scope, ref-minimax-code-lt-history-delete-guard, ref-minimax-code-lt-message-repo-delete-rows, ref-minimax-code-lt-mavis-session-commands]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-minimax-code-lt-debug-history-export, ref-minimax-code-lt-db-integrity-check, ref-minimax-code-lt-jsonl-read-malformed, ref-minimax-code-lt-history-manifest-identity, ref-minimax-code-lt-history-location-manifest-index, ref-minimax-code-lt-history-relative-dir-validation, ref-minimax-code-lt-mavis-session-messages-doc, ref-minimax-code-lt-log-retention-scope]
---

MiniMax Code CLI（命令 `mcode`）的会话记录是**两套存储的组合**：会话正文按会话存成 JSONL 文件，会话身份与检索所需的状态存在一个 SQLite 库里。TUI 入口直接依赖 `@mavis/local-runtime-v2` [@ref-minimax-code-lt-tui-runtime-dependency]，下面描述的都是这一代运行时在 Linux 上的源码行为。

固定来源：`MiniMax-AI/MiniMax-Code` 仓库 commit `185277170817c50e9dd5339c2893e850d610fa1e`，观察时间 2026-10-06，snapshot 为逐文件的 `snapshot-minimax-code-lt-*`（每个 snapshot 绑定一个文件 artifact，`content_sha256` 为真实字节摘要）。**适用性边界**：这些是源码级结论，不是某个已发布 npm 包版本的观测；本轮没有可用的官方文档原件（`archive/minimax-code/` 在本工作区不存在），因此本章不引用任何 `archived_document`，也没有把源码行为映射到发行包（`mappings/` 空缺）。未在源码中出现的用户可见开关按「未找到」记录，不按「不支持」下结论。

## 会话文件与数据库各在哪里 {#transcripts-storage-layout}

| 内容 | 路径（相对数据目录） |
| --- | --- |
| 会话正文 JSONL 与配套目录 | `v2/sessions/2026/10/06/13-41-50-000-session_M0VTc2lvbi0wMDE/`（`YYYY/MM/DD/HH-mm-SSS-session_` 加 base64url 会话 ID） |
| 该目录内的固定文件名 | `manifest.json`、`messages.jsonl`、`snapshots/`、`reports/` |
| SQLite 主库 | `v2/sqlite/runtime-state.sqlite` |
| 迁移前的库备份 | `v2/sqlite/backups/runtime-state-before-v2-migration-1788618110000-6f1c2d3e-4b5a-4c6d-8e9f-0a1b2c3d4e5f.sqlite` |

数据目录本身的解析（默认 `~/.minimax`、`MINIMAX_DATA_DIR`、`--profile` 改变目录基名、`~/.mavis` 迁移）属于配置机制，见 `config.sources`；本章只固定「记录落在数据目录之下」这一层事实。

会话目录由 `resolveSessionHistoryPathsFromRelativeDir` 拼出：根是数据目录下的 `v2/sessions`，相对目录被拆成四段固定形状，目录内文件名写死为 `manifest.json`、`messages.jsonl`、`snapshots`、`reports` [@ref-minimax-code-lt-history-dir-layout]。库文件同理是常量拼接数据目录下的 `v2/sqlite/runtime-state.sqlite` [@ref-minimax-code-lt-db-file-relative-path]，打开时先按需 `mkdir -p` 再以 better-sqlite3 打开 [@ref-minimax-code-lt-db-open-path]。

命名规则是「UTC 时间戳目录 + 编码会话 ID」，全部由 `buildSessionRelativeDir` 计算：年月日各自补零成三段目录，时分秒毫秒拼成 `HH-mm-SSS` 段，最后一段是 `session_` 前缀加 base64url 编码的会话 ID（截断到 180 字符） [@ref-minimax-code-lt-history-dir-naming] [@ref-minimax-code-lt-session-id-encoding]。目录用 **UTC**，同一份代码保留了一条本地时区分支用于识别旧布局 [@ref-minimax-code-lt-history-location-legacy-discovery]；也就是说新会话目录名与机器时区无关，但历史会话可能落在本地时区命名的旧目录里。

会话身份是数据库行与文件目录之间的**唯一绑定**：每行会话记录一个 `session_id`、一份 JSON 记录体、`created_at_ms` 与 `history_relative_dir` [@ref-minimax-code-lt-sessions-row-identity] [@ref-minimax-code-lt-sessions-row-lineage]，行里还有 `parent_session_id`、`workspace_dir`、`project_id`、`session_kind`（取值被 CHECK 约束限定为 `conversation`、`task`、`peek`、`channel`、`cron`、`unknown`）[@ref-minimax-code-lt-sessions-kind-check]。`history_relative_dir` 一旦绑定就写回数据库，宿主不再扫描猜测；只有未绑定的会话才会去扫描 `v2/sessions` 下四层目录里的 `manifest.json`，按「canonical 优于 legacy 优于只有 manifest，再比修改时间」的顺序选一个 [@ref-minimax-code-lt-history-location-manifest-index]。

`manifest.json` 是每个会话目录的身份文件，写明 `schemaVersion`、`sessionId`、`createdAtMs`、`source: local-runtime`、`layout: v2-final-dated-session` 以及各文件路径，先写临时文件再 rename [@ref-minimax-code-lt-history-manifest]；会话目录创建时 `mkdir` 带 `0o700` 权限，已存在的 manifest 会校验身份再复用 [@ref-minimax-code-lt-history-dir-create-mode]。**恢复会话时 manifest 的 `sessionId` 与 `createdAtMs` 必须与数据库行一致，否则直接抛身份不匹配** [@ref-minimax-code-lt-history-manifest-identity]，这是判断「文件被搬动或替换」的第一道检查。

项目作用域不是靠目录路径区分的，而是靠行上的 `workspace_dir`：CLI 的 `--continue` 在当前工作区里挑最近一个未归档、未隐藏的会话，找不到就提示没有可继续的会话 [@ref-minimax-code-lt-continue-workspace-scoped] [@ref-minimax-code-lt-resume-cli-options]。所以换工作区打开不会看到别的项目的会话正文，即使文件都在同一个数据目录下。

## 记录了什么、以什么格式写 {#transcripts-record-scope-and-format}

**记录范围**是「模型上下文 + 每轮输入配置 + 展示用消息 + 附件索引 + 用量」，不是日志：

- 会话正文的一行是一个 **envelope**：`message_id`、`turn_id`、`message`、`turn_config?`、`history_artifact?` [@ref-minimax-code-lt-history-envelope-shape]。`message` 要么是带 `role` 与 `timestamp` 的普通消息，要么是压缩摘要 `compactionSummary` [@ref-minimax-code-lt-history-message-record]；落盘形态就是 `message_id`/`turn_id`/`message`/`turn_config` 四字段 [@ref-minimax-code-lt-persisted-message-fields]。
- `turn_config` 锚定在**用户消息**上，记录那一轮真实的系统提示、模型与工具定义（`tool_name`/`description`/`schema`）[@ref-minimax-code-lt-turn-config-shape]；解码时校验它只允许出现在 `role === 'user'` 的 envelope 上 [@ref-minimax-code-lt-history-envelope-decode]。
- **不落盘的内容**：落盘前会按键名剔除凭据类字段（`authorization`、`token`、`secret`、`password`、`credentials`、`headers`、`apikey` 等及其常见后缀）[@ref-minimax-code-lt-sensitive-turn-config-keys]。因此会话文件可读，但不等于里面有可用凭据。
- 数据库侧另存展示用消息行（`data_json` 承载消息体，带 `role`/`turn_id`/`source` 列与按会话与轮次的索引）[@ref-minimax-code-lt-message-rows-table]、附件索引行（`asset_key`、`path`、`asset_type` 等，`file_api_uploads` 以 `session_id` 级联引用会话）[@ref-minimax-code-lt-session-assets-table]，以及旧一代表 `local_runtime_messages` 的两列 JSON [@ref-minimax-code-lt-legacy-messages-table]。
- 面向读取的入口是内置 `mavis` 工具的 `session messages`，它按游标分页读会话历史，本地为默认来源、云端另有来源 [@ref-minimax-code-lt-mavis-session-messages-doc] [@ref-minimax-code-lt-mavis-session-commands]。

**格式与写入规则**：正文是 UTF-8 的 JSONL，一个会话一个 `messages.jsonl`，不压缩、不分片、不轮转——固定来源里没有出现这类逻辑。追加走 `appendJsonl`，其注释明确要求**由调用方按会话串行化写入，本原语不提供跨进程写锁** [@ref-minimax-code-lt-jsonl-append-lane]；历史层的 `append` 在追加前重读当前文件并校验序列连续，再做追加 [@ref-minimax-code-lt-history-append-path]；整体替换（压缩、回退、删除后重建）用「临时文件 + rename」并回读校验 revision 的原子替换 [@ref-minimax-code-lt-history-replace-atomic]。读取侧有两条路径：普通读逐行解析并把损坏行作为结构化 `JsonlMalformedLine` 上报而不整体失败，严格读则任何一行不合法就整体失败 [@ref-minimax-code-lt-jsonl-read-malformed]。

也就是说「哪些内容不落盘」在本产品里有一条明确答案：**凭据类字段被剥离，其余对话内容按轮落盘**；日志与遥测走另外的目录，不在本章范围。

## 记录 schema {#transcripts-record-schema}

已由固定来源直接证实的部分：

| 层 | 关键字段 |
| --- | --- |
| JSONL envelope | `message_id`（必须匹配 `msg-.+` 或纯数字）、`turn_id`（非空字符串）、`message`、`turn_config?`、`history_artifact?`；键集合是封闭的，出现未知键即拒绝 [@ref-minimax-code-lt-history-envelope-decode] |
| `turn_config` | `system_prompt`、`model`、`tools?`，其中工具项为 `tool_name`/`description`/`schema` [@ref-minimax-code-lt-turn-config-shape] |
| `history_artifact` | `schemaVersion: 1`、`generation`、`producedBy`（`tool_archive`/`tool_trim`/`llm_checkpoint`）、`parentSnapshot`（`generation`/`compactionId`/`revision`），并校验 `父 generation + 1 === generation` [@ref-minimax-code-lt-history-artifact-shape] |
| 会话行 | `session_id` 主键 + `record_json` + `updated_at_ms` + `columnar_version` 等列 [@ref-minimax-code-lt-sessions-row-identity] |
| 消息行 | 自增 `id`、`session_id`、`msg_id`、`role`、`turn_id`、`source`、`source_context_json`、`created_at_ms`、`data_json`；`(session_id, msg_id)` 唯一 [@ref-minimax-code-lt-message-rows-table] |
| 附件索引行 | `(session_id, msg_id, asset_index, asset_key, source_tag, path, name, asset_type, artifact_id, drive_node_id, …)` [@ref-minimax-code-lt-session-assets-table] |
| manifest | `schemaVersion`、`sessionId`、`createdAtMs`、`updatedAtMs`、`source`、`layout`、`paths` [@ref-minimax-code-lt-history-manifest-identity] |

脱敏的最小完整示例（占位值，与上述 schema 一致）：

```jsonl
{"message_id":"msg-0001","turn_id":"turn-0001","message":{"role":"user","timestamp":0}}
{"message_id":"msg-0002","turn_id":"turn-0001","message":{"role":"assistant","timestamp":0}}
{"message_id":"msg-0003","turn_id":"turn-0002","message":{"role":"user","timestamp":0},"turn_config":{"system_prompt":"占位系统提示文本","model":{"id":"占位模型 ID"},"tools":[{"tool_name":"read","description":"占位描述","schema":{}}]}}
```

**仍缺的具体 schema 缺口**（照实列出，不跨产品归纳）：

1. `message` 的**字段级 schema 未固定**：源码只约束了 `role`、`timestamp` 与压缩摘要的 `summary`，其余字段随 provider 内容块变化（`CanonicalHistoryMessage` 本身就是开放记录）[@ref-minimax-code-lt-history-message-record]。
2. 展示用消息行 `data_json` 的内部结构、附件索引 `path` 指向的字节实际存放位置、token/用量表的字段，本轮未逐表核实 [@ref-minimax-code-lt-session-assets-table]。
3. **版本迁移规则**只在会话层看到列级版本标记（`columnar_version`）与 `manifest.schemaVersion`，JSONL envelope 本身没有版本字段；旧记录如何被规整到当前布局的完整规则未由本轮来源覆盖。

## 生命周期：从创建到恢复、分支与压缩 {#transcripts-lifecycle}

1. **创建**：分配会话时按 UTC 规则算出相对目录、以 `0o700` 创建目录并写 `manifest.json`；随后把 `history_relative_dir` 绑定进数据库行 [@ref-minimax-code-lt-history-dir-create-mode] [@ref-minimax-code-lt-history-manifest]。未绑定的新会话不再扫描旧目录 [@ref-minimax-code-lt-history-location-legacy-discovery]。
2. **追加**：每轮写入经调用方按会话串行化后追加到 `messages.jsonl`，追加前校验既有序列 [@ref-minimax-code-lt-jsonl-append-lane] [@ref-minimax-code-lt-history-append-path]。**没有跨进程写锁**，也没有独立的「刷盘」接口——落盘即写文件，写入序列化由会话写入通道承担。
3. **上下文压缩**：压缩先把当前正文以「不存在才发布」的方式写进 `snapshots/` 下的快照，再原子替换活动文件 [@ref-minimax-code-lt-history-publish-snapshot] [@ref-minimax-code-lt-history-compact]；压缩产物本身也作为 envelope 记录，用 `history_artifact.producedBy = llm_checkpoint` 与递增 `generation` 表达 [@ref-minimax-code-lt-history-artifact-shape]。本 commit 的一个具体变化：checkpoint 阶段若 provider 因图片过多拒绝请求，会抛出媒体拒绝错误并转入「把媒体替换为文本后重试」的恢复路径 [@ref-minimax-code-lt-checkpoint-media-rejection] [@ref-minimax-code-lt-compact-media-recovery]——这影响的是压缩能否成功，不改变已落盘记录的形状。
4. **中断恢复**：进程重启后，`compaction_start` 若是上一进程留下的、且不是当前最后一条，会被改写为 `compaction_failed` [@ref-minimax-code-lt-stale-compaction-repair]；历史文件读取走带缓存与序列校验的路径，损坏行按 `JsonlMalformedLine` 报告而不是静默丢弃 [@ref-minimax-code-lt-jsonl-read-malformed]。
5. **恢复会话（用户动作）**：`--session SESSION_ID` 直接打开，`--session` 不带 id 打开会话选择器，`-c/--continue` 在当前工作区继续最近会话，三者互斥 [@ref-minimax-code-lt-resume-cli-options] [@ref-minimax-code-lt-continue-workspace-scoped]。
6. **轮换与分支**：上下文轮换会产生新会话 ID，宿主收到轮换完成事件后切换到新会话继续 [@ref-minimax-code-lt-rotation-continuation]；显式 fork（含 TUI 的侧会话）创建子会话并把父会话 ID 记在 `sidePresentation.parentSessionId` [@ref-minimax-code-lt-fork-parent-link]，父会话的继承历史在目标会话里以一条 `fork-origin` 系统消息标注来源会话 [@ref-minimax-code-lt-fork-origin-marker]。
7. **交给子代理**：子代理会话与普通会话同库同目录，区分靠 `session_kind` 与 `parent_session_id` 列 [@ref-minimax-code-lt-sessions-row-lineage]；委派与子代理角色的语义属于 `agents.invocation`，本章不重复。

## 数据库与索引的分工 {#transcripts-database-and-index}

- **正文在文件，状态在库**：会话正文是 `messages.jsonl`；SQLite 保存会话行（`session_id` 主键 + JSON 记录体 + `columnar_version` 等列，含 `history_relative_dir` 这一到文件的绑定）[@ref-minimax-code-lt-sessions-row-identity]、展示用消息行、附件索引 [@ref-minimax-code-lt-session-assets-table]、用量，以及旧一代表 [@ref-minimax-code-lt-sessions-row-lineage] [@ref-minimax-code-lt-message-rows-table] [@ref-minimax-code-lt-legacy-messages-table]。库文件在打开前按需创建父目录 [@ref-minimax-code-lt-db-open-path]。
- **索引**：会话查询走 `columnar_version = 3` 的索引族（按更新时间、按 agent、按归档、按根会话/子会话等），另有一个 FTS5 虚表 `local_runtime_sessions_fts`，对 `session_id`、agent、标题、工作区目录、purpose、status 等分词建索引（`tokenize = unicode61`）[@ref-minimax-code-lt-sessions-fts-index]。
- **恢复所必需的文件**：数据库行（否则找不到 `history_relative_dir` 与会话身份）+ 该会话目录下的 `manifest.json` 与 `messages.jsonl`；缺任一项都不能重建正文。数据库侧可以从空库按迁移重建，**会话正文不能**——它是唯一副本 [@ref-minimax-code-lt-db-file-relative-path]。库文件本身是否可用由一次独立的 `PRAGMA integrity_check` 判定：只有恰好一条 `ok` 结果才算通过 [@ref-minimax-code-lt-db-integrity-check]。
- **删库行不等于删文件**：删除会话数据的事务只清数据库里的附件索引、消息行、消息行迁移标记与旧代表行，不触碰磁盘上的会话目录 [@ref-minimax-code-lt-message-repo-delete-rows]；目录由历史层的删除路径负责，两者被不同的服务组合在一起。
- **备份**：数据库在**迁移待执行**时做一次 SQLite 在线备份，落盘到数据目录下 `v2/sqlite/backups/`，文件名形如 `runtime-state-before-v2-migration-1788618110000-6f1c2d3e-4b5a-4c6d-8e9f-0a1b2c3d4e5f.sqlite` [@ref-minimax-code-lt-backup-file-naming] [@ref-minimax-code-lt-backup-if-pending]；备份只在身份校验通过后才允许裁剪旧备份，未知文件与时间戳相同或更新的文件一律保留 [@ref-minimax-code-lt-backup-retention-guard]。备份覆盖数据库，不覆盖会话正文目录。

## 归档、删除与保留 {#transcripts-archive-and-cleanup}

**归档（partial）**：本轮在固定来源里**没有找到面向用户的会话归档开关或导出命令**。已查入口：`packages/tui/src/cli` 的命令注册（`auth`、`plugin`、`provider`、`telemetry`、`update`、`exec`、`acp`）、内置 `mavis` 工具的子命令表（`session list|get|send|update|delete|messages`，无 export/archive）[@ref-minimax-code-lt-mavis-session-commands]、数据库备份模块（仅迁移期在线备份，文件名带固定前缀与时间戳、uuid 后缀，落在 `v2/sqlite/backups/`，且只在新备份身份校验通过后才裁剪旧备份）[@ref-minimax-code-lt-backup-file-naming] [@ref-minimax-code-lt-backup-if-pending] [@ref-minimax-code-lt-backup-retention-guard]。因此**归档答案停在 partial**：唯一可证实的「保留副本」机制是迁移期数据库备份，它不含会话正文目录；把它当作会话归档会在恢复时丢正文。进程内有一个只读的历史导出投影（`readCurrentHistoryExport`，读当前 `messages.jsonl`）[@ref-minimax-code-lt-debug-history-export]，但固定来源中未见 CLI 或工具暴露它，故不计为用户可用的导出机制。剩余缺口：是否存在 ACP 或桌面侧的导出入口，本轮未在 CLI 源码内核实。

**官方删除机制**：删除是产品内的**会话删除**（`mavis` 工具 `session delete` 及 TUI 侧会话清理路径），不是一个目录清理脚本。删除顺序是：标记旧迁移已删 → 删画布 → 删会话自有产物（peek 会话保留用量行）→ 删 diff、沟通、channel 绑定、问卷、权限、goal、折叠视图与 pin [@ref-minimax-code-lt-deletion-cascade]；随后把子会话改挂到祖父会话、清会话引用、删会话记录行 [@ref-minimax-code-lt-deletion-reparent]。产物删除本身是一次扇出：队列、文件、用量、消息数据、旧历史、canonical 历史目录、流状态并行执行，任一失败聚合成错误 [@ref-minimax-code-lt-artifact-delete-fanout]。

**删除前必须停止的写入者**：删除闸门只在拥有它的 local-runtime 进程内协调，不持久化删除状态；会话处于删除中时，Turn 准入返回 `session-deleting`、队列准入返回 `maintenance-active` [@ref-minimax-code-lt-deletion-gate-process-local] [@ref-minimax-code-lt-deletion-gate-admission]。也就是说闸门只挡住**同一进程内**的写入者——手动删文件或删库行之前必须先退出正在使用该数据目录的其它 MCode 进程，源码没有跨进程删除互斥。历史目录的删除还有独立的路径安全校验：目标必须落在 `v2/sessions` 之下，manifest 存在时先校验身份，再递归删除 [@ref-minimax-code-lt-history-delete-guard]。

**保留机制的实际范围**：会话历史**不在自动保留范围内**——保留任务明确说明已迁移的会话历史被有意排除、从不读取，它只裁剪 Turn Diff（7 天窗口、每批 250）[@ref-minimax-code-lt-turn-diff-retention-window] [@ref-minimax-code-lt-turn-diff-retention-scope]；日志目录另有 7 天保留并删除已退役的 `debug` 目录 [@ref-minimax-code-lt-log-retention-scope]。因此**不存在自动清理会话文件的官方保留策略**；空间回收只能靠逐个删除会话。

**手动删除的后果**：删掉 `messages.jsonl` 而保留库行，会话仍会出现在列表里但正文缺失或只剩 manifest；删掉库行而保留目录，磁盘目录成为孤儿文件，宿主不会因为缺行而主动清理它——删会话数据的事务只清数据库里的附件索引、消息行、消息行迁移标记与旧代表行，磁盘目录由另一条历史删除路径负责 [@ref-minimax-code-lt-message-repo-delete-rows]。两者都不可逆，因为正文没有第二份副本。

## 定位、完整性检查与排错 {#transcripts-diagnostics}

- **读当前正文**：进程内的 `CanonicalHistoryDebugService.readCurrentHistoryExport(sessionId)` 返回 `{ sessionId, exportedAtMs, messages }`，只读当前 canonical `messages.jsonl`，不初始化也不声明旧来源 [@ref-minimax-code-lt-debug-history-export]。日常读取走 `mavis` 工具 `session messages`（默认本地来源，游标分页）[@ref-minimax-code-lt-mavis-session-messages-doc]。
- **定位会话目录**：先按 `history_relative_dir` 解析；未绑定时扫描 `v2/sessions` 四年层目录下的 `manifest.json` 建索引，按身份匹配后择优 [@ref-minimax-code-lt-history-location-manifest-index]。相对目录解析本身做安全校验：拒绝绝对路径、反斜杠、空段、`.`/`..`，且必须是四段 [@ref-minimax-code-lt-history-relative-dir-validation]。
- **判断文件是否对得上会话**：读已有目录时校验 `manifest.json` 的 `sessionId` 与 `createdAtMs` 是否与数据库行一致，不一致抛 `Session history manifest identity mismatch` [@ref-minimax-code-lt-history-manifest-identity]；这是判断「文件被搬走/被换过/来自另一台机器」最快的检查点。
- **判断文件本身是否完整**：普通读会把每一处解析失败按行号与原因上报（`path`/`lineNo`/`reason`），严格读则直接失败 [@ref-minimax-code-lt-jsonl-read-malformed]；带缓存的读只在字节完全一致或前缀未变时复用，因此时间戳与文件大小不能证明内容未变。
- **判断数据库是否可用**：`hasValidIntegrity(path)` 用独立的只读连接跑 `PRAGMA integrity_check`，只有恰好一条 `ok` 结果才算通过 [@ref-minimax-code-lt-db-integrity-check]。
- **排错时注意**：日志与 `debug` 目录会被自动清理 [@ref-minimax-code-lt-log-retention-scope]，不能当作长期留存证据；会话正文则相反，没有任何自动清理会动它，所以「文件不见了」通常来自会话删除路径而不是保留策略。
