---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-local_transcripts-v4
harness_id: mistral-vibe
topic: local_transcripts
title: "Mistral Vibe CLI 的本地 Transcript：unified 存储格式、CURRENT 指针与旧会话导入"
sections:
  - section_id: transcripts-recording-switches
    surface_ids: [cli]
    source_refs: [ref-mv-301-session-config, ref-mv-301-unified-root]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-mv-301-unified-root, ref-mv-301-session-config, ref-mv-301-store-format, ref-mv-301-store-current, ref-mv-301-legacy-store, ref-mv-315-lt-store-minor, ref-mv-315-lt-chunk-codec, ref-mv-315-lt-relocate, ref-mv-315-changelog-sessions]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-mv-301-manifest, ref-mv-301-metadata, ref-mv-301-store-format, ref-mv-315-lt-store-minor]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-mv-301-store-current, ref-mv-301-manifest, ref-mv-301-metadata, ref-mv-315-lt-sparse-warning, ref-mv-315-changelog-sessions]
  - section_id: transcripts-index-and-required-files
    surface_ids: [cli]
    source_refs: [ref-mv-301-legacy-store, ref-mv-301-store-current, ref-mv-301-manifest, ref-mv-315-lt-catalog-reader]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-mv-301-store-format, ref-mv-301-legacy-import, ref-mv-301-lt-permission-sweep, ref-mv-301-session-lease, ref-mv-301-legacy-store, ref-mv-315-changelog-sessions, ref-mv-315-lt-relocate, ref-mv-315-lt-archive-flag]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-store-errors, ref-mv-301-store-current, ref-mv-301-legacy-import, ref-mv-315-lt-chunk-read, ref-mv-315-lt-sparse-warning, ref-mv-315-lt-catalog-reader]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-switches
        status: answered
        source_refs: [ref-mv-301-session-config, ref-mv-301-unified-root]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-mv-301-unified-root, ref-mv-301-session-config, ref-mv-315-lt-relocate, ref-mv-315-changelog-sessions]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-mv-301-store-current, ref-mv-301-legacy-store]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-mv-301-store-format, ref-mv-301-store-current, ref-mv-315-lt-store-minor, ref-mv-315-lt-chunk-codec]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: answered
        source_refs: [ref-mv-301-manifest, ref-mv-301-metadata, ref-mv-315-lt-store-minor]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-mv-301-store-current, ref-mv-301-manifest, ref-mv-315-lt-sparse-warning, ref-mv-315-changelog-sessions]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-required-files
        status: answered
        source_refs: [ref-mv-301-legacy-store, ref-mv-301-store-current, ref-mv-301-manifest, ref-mv-315-lt-catalog-reader]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-mv-301-store-format, ref-mv-301-legacy-import, ref-mv-315-changelog-sessions, ref-mv-315-lt-archive-flag]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-mv-301-lt-permission-sweep, ref-mv-301-session-lease, ref-mv-301-legacy-store, ref-mv-315-changelog-sessions, ref-mv-315-lt-relocate]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-mv-301-store-errors, ref-mv-301-store-current, ref-mv-301-legacy-import, ref-mv-315-lt-chunk-read, ref-mv-315-lt-sparse-warning, ref-mv-315-lt-catalog-reader]
---

固定来源是官方仓库提交 `fb7511a791f80516a57b06525707215b6a00ebd1`（变更日志 3.1.5）与它之前的 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（3.0.1）：存储格式的次版本与块编码按 3.1.5 复核，旧 JSONL 写入器的结构性切换沿用 3.0.1 的固定快照。界面为 `cli`。会话正文由 Unified harness 的私有存储（`mistral.vibe.unified-session-store/v1`）写入；会话 `messages.jsonl` 不再写入，只在导入旧会话时被读取。`meta.json` 并没有消失——Unified 会话目录里的元数据仍由宿主以临时文件 + `fsync` + `rename` 原子替换写入（见下文记录结构）。本章按"当前写入者"描述，并把仍可读的旧目录单列。[@ref-mv-301-metadata]

## 记录范围与开关 {#transcripts-recording-switches}

会话记录由 `session_logging` 配置组控制，字段四个：`save_dir`、`session_prefix`、`enabled`、`generate_titles`。`save_dir` 为空时替换为内置会话日志目录并展开为用户绝对路径，`session_prefix` 默认 `session`，`enabled` 默认真，`generate_titles` 默认真（后台 LLM 生成会话标题，展示在 `--resume` 与终端 tab，关掉回落到首条消息预览）。[@ref-mv-301-session-config]

`enabled` 的作用点在存储根：为真时 unified 存储根就是 `save_dir`；为假时改用一个一次性临时目录，进程收尾时丢弃。因此 `enabled = false` 不是"不写盘"，而是"写到进程结束即消失的位置"。[@ref-mv-301-unified-root]

需要与 transcript 区分的内容：输入历史走独立的历史文件，运行日志与缓存位于 `$VIBE_HOME` 下，它们都不参与会话恢复，也不由 `session_logging` 控制。旧版会话目录里的 `system` 消息不进正文、只留在元数据里这一类细节，现在只对**被导入的旧会话**成立。

## 存储位置与格式 {#transcripts-storage-layout}

**根目录**：`save_dir`，默认 `$VIBE_HOME/logs/session`；`VIBE_HOME` 未设置时是 `~/.vibe`。[@ref-mv-301-session-config]

**目录划分**：unified 会话在 `存储根/unified/会话ID`；会话租约在 `存储根/active/会话ID.lock` 与其 `.lock.json` 诊断文件；旧的 JSONL 会话目录仍在存储根下，按 `前缀_` 命名，供列表与导入使用。[@ref-mv-301-unified-root]

**会话跟随工作目录**：3.1.5 的 `/cd [path]` 把当前会话迁到另一个目录时只改会话记录——`environment.working_directory` 改成新目录，`origin_directory` 保留首次位置，`repository_root`/`checkout_root` 被丢弃并在下次写记录时重新探测；目录本身不移动，因此记录仍在原存储根下。[@ref-mv-315-lt-relocate][@ref-mv-315-changelog-sessions]

**会话 ID 与代数**：unified 会话目录名就是会话 ID，必须在 `[A-Za-z0-9][A-Za-z0-9_-]{0,127}` 之内；每次发布写入一个 16 位数字的"代数"，`CURRENT` 指针记录当前代数与清单哈希。[@ref-mv-301-store-current] 旧格式目录名是 `前缀_日期_时间_短ID`，查找按 `前缀_*` 匹配。[@ref-mv-301-legacy-store]

**格式**：unified 存储是 JSON 文档集合，格式标识 `mistral.vibe.unified-session-store/v1`。3.1.5 的写入次版本是 **10**（首个 Core 输入不再重复记录本代已记录的配置基线）；读取端接受不高于 `READABLE_STORE_FORMAT_MINOR = 11` 的次版本、拒绝更高的，且降级只允许降到"已经能读该次版本"的构建。11 是"读取先行"的次版本：当代代数引用了一个只以 gzip 保存的池化块时，这一代会以 11 写出，否则仍写 10；除 gzip 块之外会破坏旧读取端的变化才会升到 12。[@ref-mv-301-store-format][@ref-mv-315-lt-store-minor] 正文按 64 KiB 目标大小切块，另有 journal 段与 `quarantine/` 目录；保留的代数数量是 2。[@ref-mv-301-store-format]

**块编码**：池化块以"未压缩规范化字节的 SHA-256"命名，可以是明文 `DIGEST.json`，也可以是 gzip 压缩的 `DIGEST.json.gz`；复用与回收都不看编码，同一存储里两种文件并存仍可读取。读取 gzip 块时上限为解压后 1 GiB，超过、格式不合法或尾随数据都会报错，明文块没有这个上限。[@ref-mv-315-lt-chunk-codec]

## 记录 schema {#transcripts-record-schema}

unified 存储的两份核心文档：

- **`CURRENT` 指针**（`CurrentPointerV1`）：`store_format`、`store_format_minor`（缺省 1，兼容更早的指针）、`session_id`、`generation`、`snapshot_sequence`、`manifest_sha256`。读到更高次版本时用 `store_format_minor` 报告"需要更新的读取端"，而不是把未知字段当成损坏；3.1.5 的读取端接受不高于 11 的次版本，会话目录列表读取 `CURRENT` 时用同一上限判断。[@ref-mv-301-store-current][@ref-mv-315-lt-store-minor]
- **代数清单**（`GenerationManifestV1`）：`manifest_version`（1）、`session_id`、`generation`、`created_at`、`snapshot_sequence`、`execution_state`（`quiescent` 或 `recoverable`）、`checkpoint`、`runtime_state`、`projection_state`、`recovery_journal_segment`，以及只在旧版写入的 `interop_export`（现在读取端自行派生，该字段被保留但不读）。[@ref-mv-301-manifest]

旧格式（仅导入时读取）的 schema 是 `meta.json` + `messages.jsonl`：`meta.json` 由会话元数据加保存期统计键组成，`messages.jsonl` 每行一条消息、逐行 JSON。宿主写元数据仍然是"临时文件 + fsync + 原子替换"，序列化带缩进，临时文件后缀 `.json.tmp`。[@ref-mv-301-metadata] 两条格式之间没有逐字段对应表：导入器按旧 schema 读取，再投影成 unified 的检查点与 journal，因此旧文件不会被改写。[@ref-mv-301-legacy-import]

## 生命周期 {#transcripts-lifecycle}

- **创建与发布**：写入以"代数"为单位；新代数先落盘，再由 `CURRENT` 原子指向它，读端要么看到旧代数要么看到新代数。书写次版本按本代是否引用"只以 gzip 保存"的池化块在 10 与 11 之间选择；次版本 9 覆盖的"原子会话迁移"仍沿用同一发布语义。[@ref-mv-301-store-format][@ref-mv-315-lt-store-minor]
- **追加**：运行中的动作写入 journal 段（`journal/16 位数字.jsonl`），清单记录该段的起始序号，校验规则要求"journal 起始序号等于快照序号 + 1"。[@ref-mv-301-manifest]
- **恢复**：读 `CURRENT` 得到当前代数与清单哈希，再读清单与其检查点；缓存按 `CURRENT` 字节、journal 路径/大小/mtime 校验，重新校验只需几次系统调用，而不是重解析整个快照。[@ref-mv-301-store-current]
- **子会话**：子 agent 拥有独立会话，`HarnessChildSessionRequiresParentError` 明确子会话不能脱离父会话独立执行某些操作（例如独立停止）。[@ref-mv-301-store-errors]
- **元数据修正**：宿主对既有会话的元数据更新仍是原子替换，不会出现半写的 `meta.json`。[@ref-mv-301-metadata]
- **读取更高次版本写下的历史位置**：Session API 的稀疏历史位置若以本构建无法解析的形状保存，加载时丢弃这些位置并**每次加载只警告一次**（"Saved Session API history positions of session … are unreadable (…); dropping them"），历史按顺序重新编号而不是拒绝加载。[@ref-mv-315-lt-sparse-warning]
- **`/resume` 的会话列表**：3.1.5 起 `/resume` 与 `vibe --resume` 打开 Sessions 页面，列出**所有目录**的会话（此前只列当前目录）；页面还提供搜索、排序、归档与重命名，并记住上次位置。[@ref-mv-315-changelog-sessions]

## 索引、数据库与恢复必需文件 {#transcripts-index-and-required-files}

**这条路径上没有 SQLite 或其它数据库。** 会话正文与状态都是普通 JSON 文件；旧格式的 `.session_index.json` 是**缓存**：类文档写明 `meta.json` 才是事实源，索引每次读取都用 `stat` 与 `meta.json` 对账，结构性损坏时从会话目录全量重建。[@ref-mv-301-legacy-store]

分工：

- **unified 会话**：`CURRENT` 指针 + 清单 + 检查点/journal 段是事实源；正文块按内容摘要命名，可被校验但不可被重建。缓存（会话目录列表、能力目录）可以重建。指针记录代数与清单哈希，清单记录检查点与 journal 段边界，两者缺一不可。[@ref-mv-301-store-current] 清单本身的校验规则（journal 起始序号必须紧接快照序号）就是"文件之间如何关联"的定义。[@ref-mv-301-manifest] 会话目录列表另外读取 `CURRENT`，并以可读次版本上限（11）判断"需要更新的读取端"；因此删除或重写 `CURRENT` 会让该会话从列表读取路径上失败。[@ref-mv-315-lt-catalog-reader]
- **旧会话**：`meta.json` 与 `messages.jsonl` 是恢复必需文件；`.session_index.json` 可删可重建。
- **租约**：`active/` 下的锁文件用于并发写入者互斥，不属于恢复数据。

因此备份的最小集是"整个 `unified/会话ID` 目录"（含 `CURRENT`）；只拷正文块会丢失指针与清单。旧格式则是"整个 `前缀_*` 目录"。

## 归档、删除与保留 {#transcripts-archive-and-cleanup}

**归档**：3.1.5 的 Sessions 页面提供归档/恢复与重命名（`/resume` 打开的就是它）。归档只改 unified 会话的元数据：把 `archived_at` 时间戳写进会话记录（`meta.json`），目录不移动、正文块不变；恢复把 `archived_at` 清空，归档状态由列表读取。仍记为 `partial` 的原因不再是有没有入口，而是归档与 Vibe 管理的 worktree、跨机器复制的确切关系没有第一方说明：`quarantine/` 的触发条件与保留策略没有说明，也不能据此推断"复制目录即可跨机器恢复"——跨机器还依赖 `save_dir`、`VIBE_HOME` 与租约语义。[@ref-mv-315-changelog-sessions][@ref-mv-315-lt-archive-flag][@ref-mv-301-store-format][@ref-mv-301-legacy-import]

**迁移与会话归属**：`/cd` 迁移只改写会话记录里的工作目录与原目录，不移动存储目录；因此清理、备份仍按会话 ID 所在的存储根处理，归档后的会话也不会因为工作目录变化而改变位置。[@ref-mv-315-lt-relocate][@ref-mv-315-changelog-sessions]

**删除**：会话删除仍然落到文件系统（按会话 ID 找到目录后递归删除）。删除前必须确认没有写入者：同一存储根上的 CLI 进程与 `active/` 里该会话的租约持有者；尝试打开一个被占用的会话会得到 `Session is already open`（`session_busy`）。[@ref-mv-301-session-lease]

**保留与自动维护**：没有基于时间或条数的清退策略。自动发生的是两件事：

- **权限收敛**：一个扫描把存储根及其下路径的 group/other 位剥掉；该扫描**即使 `session_logging.enabled = false` 也会运行**（它只治理已有数据、不创建目录），Windows 上是 no-op；unified 会话目录是唯一例外——只收敛目录本身，不进入内部，因为存储自己以 owner-only 创建它们。[@ref-mv-301-lt-permission-sweep]
- **缓存与临时文件**：旧索引按需重建；元数据的 `.json.tmp` 临时文件在替换后清理。

`transcripts.cleanup` 仍是 `partial`：有明确的删除路径与权限收敛，但缺少官方保留期配置、批量清理入口，以及删除对会话列表/缓存的影响说明。[@ref-mv-301-legacy-store]

## 定位、读取与排错 {#transcripts-diagnostics}

| 现象 | 检查位置 | 依据 |
| :-- | :-- | :-- |
| 会话打不开，提示已被占用 | `active/会话ID.lock` 与 `.lock.json`；确认没有活着的 CLI 进程持有它 | `session_busy` 错误与租约文件[@ref-mv-301-session-lease] |
| 提示存储需要更新的读取端 | `CURRENT` 的 `store_format_minor` 高于当前读取端（3.1.5 为 11）；升级已发布版本，别删目录 | `store_requires_newer_reader`[@ref-mv-301-store-current][@ref-mv-315-lt-catalog-reader] |
| 提示存储无效/损坏 | 清单哈希与 journal 段是否一致（`journal 起始序号 = 快照序号 + 1`）；正文块是否按摘要可读 | 清单校验规则[@ref-mv-301-manifest] |
| 提示 "stored chunk is not valid gzip" 或 "inflates past its size limit" | 池化块被损坏、被截断，或解压后超过 1 GiB；不要手改块内容，从备份恢复该会话目录 | gzip 块读取规则[@ref-mv-315-lt-chunk-read] |
| 日志出现 "Saved Session API history positions … are unreadable" | 该会话由更新构建写过稀疏历史位置；本构建丢弃它们并重新编号，会话仍可打开 | 稀疏位置降级规则[@ref-mv-315-lt-sparse-warning] |
| 旧会话在列表里但内容为空 | 旧目录的 `meta.json` 是否存在、`messages.jsonl` 是否为空而 `total_messages` 非零 | 旧索引对账规则[@ref-mv-301-legacy-store] |
| 恢复旧会话后看不到新写入 | 导入成功后写的是 unified 存储；旧目录不再变化属正常 | 导入器语义[@ref-mv-301-legacy-import] |

错误码本身是排错入口：`session_busy`、`invalid_session_store`、`store_requires_newer_reader`、`child_session_requires_parent` 各有独立 code，宿主可以区分"被占用""坏了""需要升级"与"子会话操作不合法"。[@ref-mv-301-store-errors]
