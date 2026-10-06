---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-local_transcripts-v1
harness_id: mistral-vibe
topic: local_transcripts
title: "Mistral Vibe CLI 的本地 Transcript：会话目录、JSONL 正文、索引与清理"
sections:
  - section_id: transcripts-recording-switches
    surface_ids: [cli]
    source_refs: [ref-mv-lt-config-session-fields, ref-mv-lt-config-session-savedir, ref-mv-lt-scope-disabled, ref-mv-lt-vibe-home-env, ref-mv-lt-input-history-manager, ref-mv-lt-unified-storage-root]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-mv-lt-session-dir-init, ref-mv-lt-session-folder-naming, ref-mv-lt-store-filenames, ref-mv-lt-messages-append, ref-mv-lt-messages-overwrite, ref-mv-lt-metadata-dump, ref-mv-lt-attachments-dir, ref-mv-lt-session-lease-layout, ref-mv-lt-unified-session-dir, ref-mv-lt-unified-store-format, ref-mv-lt-unified-store-paths, ref-mv-lt-vibe-home-paths, ref-mv-lt-vibe-home-env, ref-mv-lt-config-session-savedir, ref-mv-lt-unified-storage-root]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-mv-lt-session-metadata-model, ref-mv-lt-message-model, ref-mv-lt-metadata-dump, ref-mv-lt-child-session-link, ref-mv-lt-adr-compaction, ref-mv-lt-store-filenames]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-mv-lt-messages-append, ref-mv-lt-messages-overwrite, ref-mv-lt-append-vs-rewrite, ref-mv-lt-session-reset, ref-mv-lt-session-resume-bind, ref-mv-lt-cli-resume-flags, ref-mv-lt-cli-resume-command, ref-mv-lt-cli-branch-command, ref-mv-lt-adr-rewind, ref-mv-lt-child-session-record, ref-mv-lt-adr-compaction]
  - section_id: transcripts-index-and-required-files
    surface_ids: [cli]
    source_refs: [ref-mv-lt-index-is-cache, ref-mv-lt-index-read-entry, ref-mv-lt-unified-catalog, ref-mv-lt-loader-required-files, ref-mv-lt-loader-loadable, ref-mv-lt-unified-store-format, ref-mv-lt-store-filenames]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-mv-lt-session-migration, ref-mv-lt-migration-startup-thread, ref-mv-lt-permission-sweep, ref-mv-lt-saved-session-delete, ref-mv-lt-cli-session-delete, ref-mv-lt-cli-resume-command, ref-mv-lt-tmp-cleanup, ref-mv-lt-last-session-pointer, ref-mv-lt-attachments-dir, ref-mv-lt-adr-rewind, ref-mv-lt-cli-branch-command, ref-mv-lt-unified-store-format]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-lt-loader-load, ref-mv-lt-loader-empty-check, ref-mv-lt-loader-find-short-id, ref-mv-lt-index-read-entry, ref-mv-lt-store-filenames, ref-mv-lt-last-session-pointer, ref-mv-lt-permission-sweep, ref-mv-lt-unified-catalog]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-switches
        status: answered
        source_refs: [ref-mv-lt-config-session-fields, ref-mv-lt-scope-disabled, ref-mv-lt-input-history-manager, ref-mv-lt-unified-storage-root]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-mv-lt-vibe-home-paths, ref-mv-lt-vibe-home-env, ref-mv-lt-config-session-savedir, ref-mv-lt-session-dir-init, ref-mv-lt-attachments-dir, ref-mv-lt-session-lease-layout, ref-mv-lt-unified-session-dir, ref-mv-lt-unified-storage-root]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-mv-lt-session-folder-naming, ref-mv-lt-store-filenames, ref-mv-lt-session-lease-layout, ref-mv-lt-unified-session-dir]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-mv-lt-store-filenames, ref-mv-lt-messages-append, ref-mv-lt-messages-overwrite, ref-mv-lt-unified-store-format, ref-mv-lt-unified-store-paths]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: answered
        source_refs: [ref-mv-lt-session-metadata-model, ref-mv-lt-message-model, ref-mv-lt-metadata-dump, ref-mv-lt-child-session-link, ref-mv-lt-adr-compaction]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-mv-lt-messages-append, ref-mv-lt-append-vs-rewrite, ref-mv-lt-session-reset, ref-mv-lt-session-resume-bind, ref-mv-lt-cli-resume-flags, ref-mv-lt-cli-resume-command, ref-mv-lt-cli-branch-command, ref-mv-lt-adr-rewind, ref-mv-lt-child-session-record, ref-mv-lt-adr-compaction]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-required-files
        status: answered
        source_refs: [ref-mv-lt-index-is-cache, ref-mv-lt-index-read-entry, ref-mv-lt-loader-required-files, ref-mv-lt-loader-loadable, ref-mv-lt-unified-catalog, ref-mv-lt-unified-store-format, ref-mv-lt-store-filenames]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-mv-lt-adr-rewind, ref-mv-lt-cli-branch-command, ref-mv-lt-unified-store-format]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-mv-lt-cli-resume-command, ref-mv-lt-cli-session-delete, ref-mv-lt-saved-session-delete, ref-mv-lt-tmp-cleanup, ref-mv-lt-permission-sweep, ref-mv-lt-last-session-pointer, ref-mv-lt-attachments-dir, ref-mv-lt-session-migration, ref-mv-lt-migration-startup-thread]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-mv-lt-loader-load, ref-mv-lt-loader-empty-check, ref-mv-lt-loader-find-short-id, ref-mv-lt-index-read-entry, ref-mv-lt-store-filenames, ref-mv-lt-last-session-pointer]
---

本章的固定来源是仓库 `mistralai/mistral-vibe` 的提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab`（`source-mistral-vibe-repo`，`source_fetched_at` 为 `2026-09-30T17:16:51.734Z`），产品身份取自 `catalog/harnesses.yaml` 中唯一的界面 `cli`。所有 `snapshot-mv-lt-*` 都是 `kind: source_revision` 的源码快照，`target` 固定为 `distribution: source-tree` / `os: linux` / `arch: x64` / `execution_mode: native`，`version_identity` 是这个 commit。commit 只代表源码树：仓库里同时存在 Python 前端（`vibe/`）、Rust 前端（`vibe/cli-rust/`）和随仓库分发的本地 harness 包（`harness/`），本章只写 Python CLI 在这个 commit 上能证实的存储行为，不写任何发行包版本映射。`session_logging` 的字段从哪一层配置来、怎么被合并，属于配置主题（`config.sources`、`config.overrides`、`config.defaults`），本章只引用其最终取值。

## 记录范围与开关 {#transcripts-recording-switches}

会话记录由 `session_logging` 配置组控制，固定字段只有四个：`save_dir`、`session_prefix`、`enabled`、`generate_titles`。默认 `enabled = true`、`session_prefix = "session"`、`save_dir` 为空字符串，空值会在校验阶段被替换成内置的会话日志目录。[@ref-mv-lt-config-session-fields] `generate_titles` 默认关闭，它只影响标题生成（标题缺失时回落到首条用户消息预览），不影响正文是否落盘。

`enabled = false` 时，`SessionLogger` 直接短路：`save_dir`、`session_prefix`、`session_dir`、`session_metadata` 全部置空，`session_id` 变成字符串 `disabled`，`session_start_time` 变成 `N/A`，此后所有保存调用在入口就返回，不创建目录也不写文件。[@ref-mv-lt-scope-disabled] 同一开关在实验性 unified 后端上的表现不同：存储根不再用 `save_dir`，而是一次性的临时目录，进程收尾时被丢弃。[@ref-mv-lt-unified-storage-root]

落盘内容按 `meta.json` + `messages.jsonl` 两份文件划分，详见“记录 schema”一节。需要与 transcript 区分开的另外两处本地文件：

- **输入历史**：用户敲过的提示词走独立的 `HistoryManager`，单文件、只保留最近 100 条，写成每行一个 JSON 字符串。它不属于会话记录，删掉它不影响任何会话恢复。[@ref-mv-lt-input-history-manager]
- **运行日志与缓存**：`$VIBE_HOME` 下另有 `logs/vibe.log`、`cache.toml`、`projects.toml`、`whoami_cache.json` 等固定文件，本章不逐项审计，只在需要判断“记录依赖”时提及。

不落盘的部分可以直接从代码读出：system 消息不写进 `messages.jsonl`（写盘前按 `role != system` 过滤），只作为 `system_prompt` 字段留在 `meta.json`；仅含 system 消息的空会话默认不写盘，除非调用方显式允许空记录。图片附件在没有会话目录时保持 base64 内联，不落成文件。

## 存储位置、命名、格式与写入 {#transcripts-storage-layout}

### 根目录

会话存储根是一个 `GlobalPath` 常量 `$VIBE_HOME/logs/session`，与 `WORKTREES_DIR`、`HISTORY_FILE`、`PLANS_DIR` 等并列定义。[@ref-mv-lt-vibe-home-paths] `$VIBE_HOME` 由环境变量决定，未设置时是 `Path.home() / ".vibe"`；设置了就做 `expanduser().resolve()`。[@ref-mv-lt-vibe-home-env] 配置字段 `session_logging.save_dir` 可以整体改写这个位置：空值回落到上述常量，非空值同样经过 `expanduser().resolve()`。[@ref-mv-lt-config-session-savedir] 因此路径随三件事变化：环境变量 `VIBE_HOME`、配置里的 `save_dir`、以及运行平台本身——目录名是拼接的 `logs/session`，没有平台分支，Windows 上是同一套相对拼接。同一开关还有一个例外路径：`enabled = false` 时 unified 后端不落到上面这个根，而是一次性临时目录，进程收尾时被丢弃。[@ref-mv-lt-unified-storage-root]

### 会话目录与文件名

一个新会话在 `SessionLogger` 构造时就算出目录名：先 `mkdir(parents=True, mode=0o700)` 建出存储根，再把 `save_folder` 记为当前会话目录。[@ref-mv-lt-session-dir-init] 目录名格式是 `{session_prefix}_{YYYYmmdd_HHMMSS}_{session_id 前 8 位}`，时间戳取 UTC，截短规则是固定 8 字符。[@ref-mv-lt-session-folder-naming]

会话目录内的文件常量只有三个（另加 lease 与附件目录）：

| 名称 | 角色 |
| :-- | :-- |
| `meta.json` | 会话元数据、统计、工具清单、agent profile、config 快照 |
| `messages.jsonl` | 正文，逐行一条消息 |
| `attachments/` | 以内容摘要在会话目录内的图片附件 |

[@ref-mv-lt-store-filenames] 存储根上还有三处附属物：`active/{session_id}.lock` 与旁边的 `active/{session_id}.lock.json` 是会话独占锁与诊断信息（诊断文件单独放，是因为 Windows 上持锁时锁文件不可读）。[@ref-mv-lt-session-lease-layout] `attachments/` 里的文件名是图片字节的 SHA-1 加扩展名，同内容只写一次。[@ref-mv-lt-attachments-dir] 第三处是 `.last_session/` 下的终端指针文件，见清理一节。

会话目录名**不编码项目路径**。目录归属靠 `meta.json` 里的 `environment.working_directory` 和 `origin_directory` 两个字段表达，加载时用它们过滤，因此同一个存储根可以同时容纳多个项目的会话。

### 格式与写入方式

`messages.jsonl` 是 JSONL：每行一个 `json.dumps(..., ensure_ascii=False)` 的消息对象，UTF-8 编码。追加写入用 `O_APPEND | O_CREAT | O_WRONLY` 打开、权限 `0o600`，逐行写完 `flush()` 后 `fsync()`。文件权限的理由写在代码注释里：会话日志保存原始工具结果，所以按 owner-only 创建。[@ref-mv-lt-messages-append] 重写路径不同：先写同目录临时文件（后缀 `.jsonl.tmp`），`fsync` 后 `os.replace()` 原子替换。[@ref-mv-lt-messages-overwrite] `meta.json` 同样是临时文件加 `os.replace()`，序列化时带 `indent=2`。[@ref-mv-lt-metadata-dump] 没有压缩，没有分片，没有自定义二进制格式。

### 实验性 unified 后端的另一套布局

CLI 可以跑在实验性的 unified harness 后端上（终端 banner 会标注 `unified harness`）。它不是同一套文件的另一种读法，而是另一个存储格式：`STORE_FORMAT = "mistral.vibe.unified-session-store/v1"`，带一个次版本号，读取端接受更低次版本、拒绝更高次版本，并明确“新版写过之后不支持降级”。[@ref-mv-lt-unified-store-format] 正文按 `chunks/` 分块存储，单块目标 64 KiB，块名是内容的 SHA-256，另有 `quarantine/` 目录；journal 段路径形如 `journal/{16 位数字}.jsonl`，会话内文档路径包括 `("context", "messages")` 与 `("snapshot", "history", "entries")`，保留的代数数量是 2。[@ref-mv-lt-unified-store-paths] 会话目录本身是 `{storage_root}/unified/{session_id}`，storage_root 就是 `session_logging.save_dir`。[@ref-mv-lt-unified-session-dir] 需要注意：这一套路径常量来自随仓库分发的 harness 包，不是 Python CLI 自己的 `vibe/core/session/` 模块，两者的演进节奏不同。

## 记录 schema {#transcripts-record-schema}

会话元数据由 `SessionMetadata` 模型定义，必填项是 `session_id`、`start_time`、`end_time`、`git_commit`、`git_branch`、`environment`、`username`；`end_time`、`git_commit`、`git_branch` 允许为 `None`。其余字段都有默认值：`parent_session_id`、`origin_directory`、`title`、`title_source`（`auto` / `manual`）、`bumped_at`、`pinned_at`、`archived_at`、`unseen_at`、`seen_at`、`experiments`、`config`、`import_provenance`、`created_worktree`，以及两个列表 `child_sessions` 与 `loops`。其中 `unseen_at` / `seen_at` 在旧会话里根本不存在，注释写明这是“新记录没有 unseen 追踪时的惰性迁移”，缺字段的老会话一律当作已读。[@ref-mv-lt-session-metadata-model]

写盘时 `meta.json` 还会在 `SessionMetadata` 的字段之上叠加几个只有保存时才计算的键：`stats`、`total_messages`、`last_message_fingerprint`、`tools_available`、`agent_profile`、`system_prompt`、`config`、`end_time`。`last_message_fingerprint` 是最后一条非 system 消息的 SHA-256，用来判断追加边界；`tools_available` 是当前可用工具的 function 规格列表；`system_prompt` 存的是本轮 system 消息的完整 dump。[@ref-mv-lt-metadata-dump] 这些键不在 `SessionMetadata` 模型里，加载时按普通 JSON 读取，因此**跨版本读取这些键没有模型层校验**。

`messages.jsonl` 的每一行都是一条 `LLMMessage`，字段包括 `role`、`content`、`images`、`injected`、`reasoning_content`、`reasoning_payloads`、`reasoning_message_id`、`tool_calls`、`name`、`tool_call_id`、`tool_result`、`message_id`、`user_display_content`、`input_text`、`resources`、`manual_shell`、`context_boundary`。模型配置是 `extra="ignore"`，未声明字段在反序列化时被丢弃而不是报错。[@ref-mv-lt-message-model] 由此可以确定几件事：

- 工具调用与工具结果是同一条消息上的字段（`tool_calls` / `tool_result` / `tool_call_id`），没有独立的 tool 事件流文件；
- 角色由 `role` 表达，加载时 `system` 角色的行被丢弃；
- 上下文压缩不是新会话，而是在同一条消息上打 `context_boundary = "compaction"` 标记。

压缩标记的语义在仓库自带的 ADR 里写明：压缩保留当前会话身份与 transcript，压缩后的上下文作为一条注入消息存储，模型请求只带当前 system 消息、最新一条被标记的压缩消息以及它之后写入的内容，而公开历史仍然投影完整 transcript。[@ref-mv-lt-adr-compaction]

子代理与父子关系用链接表达：`ChildSessionLink` 只有 `session_id`、`tool_call_id`、`agent` 和可选的 `relative_path` 四个字段，`model_config` 是 `extra="forbid"`。[@ref-mv-lt-child-session-link] 也就是说父会话的 `meta.json` 里保存的是子会话 id 列表加对应的工具调用 id，不是子会话正文；子会话正文是它自己目录下的 `messages.jsonl`。

脱敏后的最小完整示例（结构取自上面的字段定义，内容为占位值）：

```text
$STORAGE_ROOT/session_20260930_171651_1a2b3c4d/
  meta.json      {"session_id": "1a2b3c4d-…", "start_time": "2026-09-30T17:16:51Z",
                  "end_time": "2026-09-30T17:22:10Z", "total_messages": 4,
                  "last_message_fingerprint": "SHA256_PLACEHOLDER", "title": null,
                  "environment": {"working_directory": "PROJECT_DIR_PLACEHOLDER"}}
  messages.jsonl {"role": "user", "content": "PROMPT_PLACEHOLDER", "message_id": "UUID_PLACEHOLDER"}
                 {"role": "assistant", "content": "ANSWER_PLACEHOLDER", "tool_calls": [...]}
                 {"role": "tool", "tool_call_id": "TOOL_CALL_ID_PLACEHOLDER", "tool_result": {...}}
                 {"role": "user", "content": "PROMPT_PLACEHOLDER", "context_boundary": "compaction"}
  attachments/   SHA1_HEX_PLACEHOLDER.png
```

仍然存在的 schema 缺口（照实列出，不补猜）：`meta.json` 的保存期键（`stats`、`tools_available`、`system_prompt`、`last_message_fingerprint`）没有对应的模型定义，`SessionMetadata` 不校验它们；`messages.jsonl` 的行没有版本字段，也没有逐行 schema 版本号，跨版本兼容只依赖 `extra="ignore"` 与仓库内的迁移逻辑。

## 生命周期 {#transcripts-lifecycle}

**创建与追加。** 每轮交互结束后调用保存：先在内存里快照消息与配置，再持锁把非 system 消息落盘、把元数据整体重写，最后置位“已持久化”。[@ref-mv-lt-messages-append] 追加还是重写由边界判断决定：读旧 `meta.json` 的 `total_messages` 与 `last_message_fingerprint`，若新消息数严格增加且边界处指纹吻合，就只追加新增的那几条；否则整体重写。指纹缺失的旧会话无法验证边界，会被强制走重写而不是追加或跳过。[@ref-mv-lt-append-vs-rewrite] 这就是 ADR 说的“普通消息写入应可追加、元数据应原子、对旧 transcript 形状保持宽容”再加上一个例外：显式的原地 rewind 会重写当前会话 transcript 到更早的边界。[@ref-mv-lt-adr-rewind]

**关闭与刷盘。** 每次消息写入后都 `flush()` + `fsync()`；元数据替换前同样 `fsync` 临时文件。进程正常退出没有单独的收尾 flush 调用——刷盘粒度就是每次保存。

**恢复。** 命令行有三种入口：`-c/--continue` 取最近一次保存的会话，`--resume` 不带 id 时打开交互式选择器、带 `SESSION_ID` 时恢复指定会话，两者互斥。[@ref-mv-lt-cli-resume-flags] 会话内的 `/resume`（别名 `/continue`）同样打开选择器，它的描述明确写着“浏览、恢复或删除已保存会话”。[@ref-mv-lt-cli-resume-command] 恢复时先读旧 `meta.json` 得到元数据，再把 `session_id`、`session_dir`、`session_metadata` 绑定到当前 logger，并把“已持久化”置真；这个绑定过程本身不读盘，可以在 prepare 失败后的 commit 阶段安全调用。[@ref-mv-lt-session-resume-bind]

**新会话与父子关系。** `/clear`（别名 `/new`）不是清空当前 transcript，而是换一个会话 id、换一个会话目录，并用 `parent_session_id` 指回旧会话。[@ref-mv-lt-session-reset] 子代理同样落成独立会话：子 runtime 先持久化一个空会话，再由父会话记录一条 child link；任一步失败会连带删除这个子会话。[@ref-mv-lt-child-session-record] `/branch` 是显式的分叉入口，描述为“把当前对话分叉成一个新的可恢复会话，本会话保持不变，用 `vibe --resume SESSION_ID` 恢复副本”。[@ref-mv-lt-cli-branch-command]

**压缩后延续。** 压缩不换会话 id、不改写历史，只追加一条带 `context_boundary = "compaction"` 的消息，恢复时按标记找到最新压缩点继续。[@ref-mv-lt-adr-compaction]

**崩溃恢复的边界。** ADR 明确写着：新进程不会从 JSONL 恢复进行中的一轮、未决的回调或实时事件序列，不要把“连到同一个活着的 harness”当作崩溃恢复。[@ref-mv-lt-adr-rewind]

## 索引、目录与恢复所必需的文件 {#transcripts-index-and-required-files}

**这条路径上没有数据库。** 在本 commit 的 Python CLI 代码里没有 SQLite 或其它 SQL 依赖：正文、元数据、统计全部是普通文件，unified 后端用的是带 journal 与代数的文档存储，同样不是数据库。[@ref-mv-lt-unified-store-format]

分工是这样的：

- **正文与元数据是唯一事实源。** 恢复一个会话必须同时有 `meta.json` 与 `messages.jsonl` 两个文件，缺任何一个都判为不可加载。[@ref-mv-lt-loader-required-files] 校验还要求 `messages.jsonl` 非空，除非 `meta.json` 里的 `total_messages` 明确为 0。[@ref-mv-lt-loader-loadable]
- **`.session_index.json` 是缓存，不是事实源。** 类文档写得很直接：索引是磁盘持久化的缓存，每次读取都用便宜的 `stat` 与 `meta.json` 对账，只有 `meta.json` 变化的目录才会重读；索引结构性损坏时从会话目录全量重建。[@ref-mv-lt-index-is-cache] 缓存文件名是模块级常量，与 `meta.json`、`messages.jsonl` 两个常量并列。[@ref-mv-lt-store-filenames] 读单个条目时除了读 `meta.json`，还要 `stat` `messages.jsonl` 拿大小，空文件但 `total_messages != 0` 的会话被判为损坏并排除在列表之外。[@ref-mv-lt-index-read-entry]
- **unified 后端的目录也是可重建缓存。** `UnifiedSessionCatalog` 的文档说明它是一个小的缓存文档，与每个会话的 `CURRENT` 指针和活动恢复 journal 对账；完整私有 store 才是权威，只在条目新增或变化时才加载。[@ref-mv-lt-unified-catalog]
- **`active/*.lock` 是并发写入者标记**，恢复会话前应确认目标没有活跃 lease（见清理一节）。

因此“能否重建”的答案是分层的：`meta.json` 与 `messages.jsonl` 不能重建，是恢复必需；`.session_index.json`、unified catalog、`active/` 下的 lease、`.last_session/` 指针都可以从会话目录重建或重新生成，不需要备份。附件是否必需取决于恢复内容：`attachments/` 里是指向文件的图片源，删除后 transcript 行仍在但图片路径失效。

## 归档、备份、删除与保留 {#transcripts-archive-and-cleanup}

### 归档

固定来源里**没有**面向用户的“归档整个会话”或“导出会话”命令：`/resume` 选择器提供的是浏览、恢复、删除三项。[@ref-mv-lt-cli-resume-command] 因此“归档”在本产品里最接近的是两种 rewind 持久化模式的区分：forked rewind 保留源会话并从选中的历史前缀派生一个新会话；in-place rewind 保留当前会话身份并把截断后的前缀写回该身份，被丢弃的后缀**故意**从持久化历史中移除，无法通过恢复该会话找回。[@ref-mv-lt-adr-rewind] `/branch` 是用户可见的“保留原件、复制一份”的入口。[@ref-mv-lt-cli-branch-command] unified 存储格式里另有一个 `quarantine/` 目录名常量，但本轮没有进一步证据说明它的触发条件与保留策略。[@ref-mv-lt-unified-store-format]

`SessionMetadata` 有 `archived_at` 字段，unified 的会话列表在 `include_archived` 为假时会过滤掉 `archived_at` 非空的条目；但在本 commit 的 Python CLI 路径里没有找到给这个字段赋值的写入点，所以“归档会话”目前不是可确认的 CLI 能力。这一题因此是 `partial`：**缺口**是没有官方导出/归档开关、没有导出文件格式、没有归档与恢复后的可移植性说明；不要据此推断“可以自己拷走目录”——跨机器恢复还依赖 `save_dir`、`VIBE_HOME` 与 lease 语义。

### 删除

CLI 侧的删除入口在 `/resume` 选择器：按 `d` 触发，需要二次确认；正在运行的当前会话被显式拒绝删除并给出提示，失败时展示 `Failed to delete session: …`。[@ref-mv-lt-cli-session-delete] 落到存储层是 `delete_saved_session`：按 session id 找到目录后 `shutil.rmtree` 整个会话目录，并顺带清掉内容等于该 id 的 last-session 指针文件；本存储没有这个会话时只清指针并返回 `False`。[@ref-mv-lt-saved-session-delete]

手动删文件的后果可以从加载规则反推，不需要猜测：

- 只删 `messages.jsonl`、留下 `meta.json`：正文不可加载，索引条目也会在下次对账时被剔除；如果 `meta.json` 里 `total_messages` 不为 0，恢复会明确报“messages 文件为空（可能被中断损坏）”。
- 只删 `meta.json`、留下 `messages.jsonl`：同样不可加载，因为两个文件都是必需项。
- 删整个会话目录但留着 `active/{id}.lock`：目录消失，锁文件残留；源码对 lease 残留的注释是“无害，下次 acquire 会复用并覆盖诊断文件”。
- 删 `.session_index.json`：下次读取从会话目录重建。
- 删 `attachments/`：transcript 行保留，图片路径悬空。

删除前要停的写入者：`active/` 下该 session id 的 lease 持有者（正常由 CLI 进程退出时释放）、以及同一存储根上的其它 CLI 进程——源码没有跨进程的会话目录写锁，只有 lease 文件锁，且 `SessionLease` 在 id 已被占用时直接抛 `Session is already open`。指针文件按终端 tty 分文件记录当前会话，删会话时会顺带清理同 id 指针。[@ref-mv-lt-last-session-pointer] 附件目录随会话目录一起被 `rmtree` 删除，不会留下孤儿附件。[@ref-mv-lt-attachments-dir]

### 保留与自动维护

固定来源里**没有**基于时间或条数的会话保留/清退策略。自动发生的只有两件事：

- **临时文件清理。** 保存结束后的收尾会尝试删除存储根下递归匹配 `**/*.json.tmp`、修改时间超过 5 分钟的文件，并且整个进程内以 5 秒为间隔节流。[@ref-mv-lt-tmp-cleanup]
- **权限收敛。** 一个守护线程把存储根及其下所有路径的 group/other 位剥掉，保留 owner 位（插件脚本的 owner-execute 位不能丢）；Windows 上是 no-op，因为它不跟随符号链接、不会创建不存在的根目录，并且即使 `enabled = false` 也会运行——它只治理已有数据。[@ref-mv-lt-permission-sweep]

另外有一条**格式迁移**会在会话循环启动时以守护线程触发：扫描存储根下的 `{prefix}_*.json` 单文件会话（旧格式），拆成 `meta.json` + `messages.jsonl` 两份写进同名目录，然后删掉旧文件；单条失败只 `continue`，不影响其余。[@ref-mv-lt-session-migration] 调用点在 agent loop 构造末尾。[@ref-mv-lt-migration-startup-thread] 这意味着**升级后的第一次启动会改写旧格式会话**，备份应在升级前做。

所以 `transcripts.cleanup` 记为 `partial`：有明确的用户可见删除路径与两个自动维护行为，但缺少官方保留期配置、缺少“删除 N 天前全部会话”这类批量入口、缺少删除对 `bumped_at`/`pinned_at` 等元数据影响的说明。

## 定位、读取与排错 {#transcripts-diagnostics}

**按 id 找目录。** 会话 id 在磁盘上只留前 8 位，查找用 glob `{prefix}_*_{前 8 位}`，命中多个时取 `messages.jsonl` 修改时间最新的一个。[@ref-mv-lt-loader-find-short-id] 这解释了为什么目录名里的时间戳与短 id 组合是稳定的定位键，也解释了同名短 id 冲突时“取最近”的行为。

**直接读一份会话。** 读取路径读 `meta.json`（缺失时退化为空对象），再逐行解析 `messages.jsonl`；两类错误都带明确提示：metadata JSON 非法时报“invalid JSON (may have been corrupted)”，空正文且 `total_messages != 0` 时报“may have been corrupted by interruption”。[@ref-mv-lt-loader-load] [@ref-mv-lt-loader-empty-check] 这两条消息就是排错时最直接的判据。

**检查列表完整性。** 列表侧的完整性检查与加载侧一致：`meta.json` 与 `messages.jsonl` 都要存在且能解析，正文大小为 0 时必须 `total_messages == 0`。[@ref-mv-lt-index-read-entry] 缓存文件名是固定常量 `.session_index.json`，删掉即可触发重建。[@ref-mv-lt-store-filenames]

**排错时的三个可观察点：**

| 现象 | 检查位置 |
| :-- | :-- |
| 会话列不出来但目录在 | `.session_index.json` 是否陈旧或损坏；`meta.json` 的 `session_id` 是否缺失 |
| 恢复报“可能被中断损坏” | `messages.jsonl` 行数与 `meta.json` 的 `total_messages` 是否一致 |
| 同 id 会话被占用 | `active/{session_id}.lock` 及其 `.lock.json` 诊断文件（进程 id、获取时间） |

统一后端的对应入口是它自己的可重建 catalog 与 journal 段，语义见上一节。[@ref-mv-lt-unified-catalog]

权限异常则由权限收敛线程处理，它只改 mode 不动内容，日志级别是 debug，所以要确认收敛是否发生，得直接看文件模式而不是看日志。[@ref-mv-lt-permission-sweep] last-session 指针按 tty 分文件，终端换了（换了 tty、Windows 换了 console 宿主）就会失配，此时“继续上次会话”找不到记录，但会话目录本身仍在。[@ref-mv-lt-last-session-pointer]