---
schema_version: 3
record_kind: production
edition_id: zed-local_transcripts-v2
harness_id: zed
topic: local_transcripts
title: "Zed Agent 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-scope-and-switch
    surface_ids: [zed]
    source_refs: [ref-zed-lt-db-thread-fields-a, ref-zed-lt-db-thread-fields-b, ref-zed-lt-message-enum, ref-zed-lt-user-message-content, ref-zed-lt-agent-message-content, ref-zed-lt-mention-uri, ref-zed-lt-image-base64, ref-zed-lt-save-payload-skip-empty, ref-zed-lt-stateless-env, ref-zed-lt-db-stateless-open, ref-zed-lt-db-open-path]
  - section_id: transcripts-storage-naming-format
    surface_ids: [zed]
    source_refs: [ref-zed-lt-data-dir, ref-zed-lt-database-dir, ref-zed-lt-db-path-dir, ref-zed-lt-db-path-scope, ref-zed-lt-db-open-path, ref-zed-lt-session-id-uuid, ref-zed-lt-thread-id-uuid, ref-zed-lt-save-payload, ref-zed-lt-save-payload-folder-paths, ref-zed-lt-path-list-encode, ref-zed-lt-threads-table-ddl, ref-zed-lt-threads-table-alters, ref-zed-lt-data-types, ref-zed-lt-save-compress, ref-zed-lt-save-upsert, ref-zed-lt-deserialize-thread, ref-zed-lt-image-base64, ref-zed-lt-shared-thread-bytes, ref-zed-lt-draft-prompt-read]
  - section_id: transcripts-record-schema
    surface_ids: [zed]
    source_refs: [ref-zed-lt-db-thread-fields-a, ref-zed-lt-db-thread-fields-b, ref-zed-lt-save-payload, ref-zed-lt-save-compress, ref-zed-lt-message-enum, ref-zed-lt-user-message-content, ref-zed-lt-agent-message-content, ref-zed-lt-mention-uri, ref-zed-lt-image-base64, ref-zed-lt-version-migration, ref-zed-lt-threads-table-ddl, ref-zed-lt-threads-table-alters, ref-zed-lt-data-types, ref-zed-lt-db-save-count-test-only, ref-zed-lt-streaming-save-key]
  - section_id: transcripts-lifecycle
    surface_ids: [zed]
    source_refs: [ref-zed-lt-observe-save, ref-zed-lt-save-payload-skip-empty, ref-zed-lt-save-payload-folder-paths, ref-zed-lt-quit-flush, ref-zed-lt-load-thread, ref-zed-lt-save-upsert, ref-zed-lt-message-enum, ref-zed-lt-save-payload, ref-zed-lt-doc-new-from-summary, ref-zed-lt-shared-thread-to-db-thread, ref-zed-lt-streaming-save-skip, ref-zed-lt-streaming-save-key, ref-zed-lt-streaming-predicate, ref-zed-lt-save-enqueue-key, ref-zed-lt-flush-pending-notify, ref-zed-lt-draft-prompt-revision, ref-zed-lt-to-db-streaming-contract]
  - section_id: transcripts-database-layout
    surface_ids: [zed]
    source_refs: [ref-zed-lt-db-open-path, ref-zed-lt-threads-table-ddl, ref-zed-lt-threads-table-alters, ref-zed-lt-list-threads, ref-zed-lt-database-dir, ref-zed-lt-db-path-dir, ref-zed-lt-db-path-scope, ref-zed-lt-metadata-table-ddl, ref-zed-lt-metadata-v2-table, ref-zed-lt-archive-fn, ref-zed-lt-update-archived, ref-zed-lt-draft-prompt-read, ref-zed-lt-load-thread, ref-zed-lt-worktree-persist-state, ref-zed-lt-metadata-list-connection]
  - section_id: transcripts-archive-restore-cleanup
    surface_ids: [zed]
    source_refs: [ref-zed-lt-doc-archive-thread, ref-zed-lt-doc-thread-history, ref-zed-lt-archive-fn, ref-zed-lt-update-archived, ref-zed-lt-worktree-persist-state, ref-zed-lt-worktree-remove-root, ref-zed-lt-worktree-cleanup, ref-zed-lt-doc-open-markdown, ref-zed-lt-thread-to-markdown, ref-zed-lt-shared-thread-bytes, ref-zed-lt-shared-thread-to-db-thread, ref-zed-lt-cross-channel-detect, ref-zed-lt-doc-thread-history-delete, ref-zed-lt-archive-view-delete, ref-zed-lt-metadata-delete, ref-zed-lt-session-delete-api, ref-zed-lt-delete-entry, ref-zed-lt-delete-cascade, ref-zed-lt-worktree-short-name-style]
  - section_id: transcripts-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-lt-db-open-path, ref-zed-lt-threads-table-ddl, ref-zed-lt-list-threads, ref-zed-lt-deserialize-thread, ref-zed-lt-version-migration, ref-zed-lt-logs-dir, ref-zed-lt-db-path-dir, ref-zed-lt-cross-channel-detect, ref-zed-lt-metadata-list-connection, ref-zed-lt-show-thread-metadata, ref-zed-lt-db-stateless-open, ref-zed-lt-metadata-table-ddl]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [zed]
        section_id: transcripts-scope-and-switch
        status: answered
        source_refs: [ref-zed-lt-db-thread-fields-a, ref-zed-lt-db-thread-fields-b, ref-zed-lt-message-enum, ref-zed-lt-user-message-content, ref-zed-lt-agent-message-content, ref-zed-lt-mention-uri, ref-zed-lt-image-base64, ref-zed-lt-save-payload-skip-empty, ref-zed-lt-stateless-env, ref-zed-lt-db-stateless-open]
  - question_id: transcripts.location
    answers:
      - surface_ids: [zed]
        section_id: transcripts-storage-naming-format
        status: answered
        source_refs: [ref-zed-lt-data-dir, ref-zed-lt-database-dir, ref-zed-lt-db-path-dir, ref-zed-lt-db-path-scope, ref-zed-lt-db-open-path, ref-zed-lt-draft-prompt-read]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [zed]
        section_id: transcripts-storage-naming-format
        status: answered
        source_refs: [ref-zed-lt-session-id-uuid, ref-zed-lt-thread-id-uuid, ref-zed-lt-save-payload, ref-zed-lt-save-payload-folder-paths, ref-zed-lt-path-list-encode, ref-zed-lt-db-path-dir, ref-zed-lt-db-path-scope]
  - question_id: transcripts.format
    answers:
      - surface_ids: [zed]
        section_id: transcripts-storage-naming-format
        status: answered
        source_refs: [ref-zed-lt-data-types, ref-zed-lt-save-compress, ref-zed-lt-save-upsert, ref-zed-lt-deserialize-thread, ref-zed-lt-image-base64, ref-zed-lt-shared-thread-bytes]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [zed]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-zed-lt-db-thread-fields-a, ref-zed-lt-db-thread-fields-b, ref-zed-lt-save-payload, ref-zed-lt-save-compress, ref-zed-lt-message-enum, ref-zed-lt-user-message-content, ref-zed-lt-agent-message-content, ref-zed-lt-mention-uri, ref-zed-lt-image-base64, ref-zed-lt-version-migration, ref-zed-lt-threads-table-ddl, ref-zed-lt-threads-table-alters, ref-zed-lt-data-types, ref-zed-lt-db-save-count-test-only, ref-zed-lt-streaming-save-key]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [zed]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-zed-lt-observe-save, ref-zed-lt-save-payload-skip-empty, ref-zed-lt-save-payload-folder-paths, ref-zed-lt-quit-flush, ref-zed-lt-load-thread, ref-zed-lt-save-upsert, ref-zed-lt-message-enum, ref-zed-lt-save-payload, ref-zed-lt-doc-new-from-summary, ref-zed-lt-streaming-save-skip, ref-zed-lt-streaming-save-key, ref-zed-lt-streaming-predicate, ref-zed-lt-save-enqueue-key, ref-zed-lt-flush-pending-notify, ref-zed-lt-draft-prompt-revision, ref-zed-lt-to-db-streaming-contract]
  - question_id: transcripts.database
    answers:
      - surface_ids: [zed]
        section_id: transcripts-database-layout
        status: answered
        source_refs: [ref-zed-lt-db-open-path, ref-zed-lt-threads-table-ddl, ref-zed-lt-threads-table-alters, ref-zed-lt-list-threads, ref-zed-lt-database-dir, ref-zed-lt-db-path-dir, ref-zed-lt-db-path-scope, ref-zed-lt-metadata-table-ddl, ref-zed-lt-metadata-v2-table, ref-zed-lt-archive-fn, ref-zed-lt-draft-prompt-read, ref-zed-lt-load-thread, ref-zed-lt-metadata-list-connection]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [zed]
        section_id: transcripts-archive-restore-cleanup
        status: partial
        source_refs: [ref-zed-lt-doc-archive-thread, ref-zed-lt-doc-thread-history, ref-zed-lt-archive-fn, ref-zed-lt-update-archived, ref-zed-lt-worktree-persist-state, ref-zed-lt-worktree-remove-root, ref-zed-lt-doc-open-markdown, ref-zed-lt-thread-to-markdown, ref-zed-lt-shared-thread-bytes, ref-zed-lt-shared-thread-to-db-thread, ref-zed-lt-cross-channel-detect, ref-zed-lt-worktree-short-name-style]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [zed]
        section_id: transcripts-archive-restore-cleanup
        status: partial
        source_refs: [ref-zed-lt-doc-thread-history-delete, ref-zed-lt-archive-view-delete, ref-zed-lt-metadata-delete, ref-zed-lt-session-delete-api, ref-zed-lt-delete-entry, ref-zed-lt-delete-cascade, ref-zed-lt-worktree-cleanup, ref-zed-lt-worktree-remove-root]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-zed-lt-db-open-path, ref-zed-lt-threads-table-ddl, ref-zed-lt-list-threads, ref-zed-lt-deserialize-thread, ref-zed-lt-version-migration, ref-zed-lt-logs-dir, ref-zed-lt-db-path-dir, ref-zed-lt-cross-channel-detect, ref-zed-lt-metadata-list-connection, ref-zed-lt-show-thread-metadata, ref-zed-lt-metadata-table-ddl]
---

Zed Agent 的会话记录不是一个可读的会话日志文件集合，而是两套彼此独立的本地 SQLite 存储：一套保存会话正文与运行状态，一套保存侧边栏所需的元数据与归档状态。本章的全部结论只针对 catalog 中登记的 `zed` 界面（Zed IDE 的 Agent Panel 与 Threads Sidebar）。基础来源是仓库 `zed-industries/zed` 的 commit `a1b71072e5b43faef437b471e988fbb5f972c99c`（`source-zed-repo`，抓取时间 2026-10-06T04:35:37.164Z）及其内的第一方文档 `docs/src/ai/`；保存时机与 worktree 短名两处结论另取本轮观察到的 commit `b47a4ca595d3a3fba116b9e78ef01a46e2e43f3e`（抓取时间 2026-10-08T18:04:22.811Z），对应位置已在各小节就近标注。本轮该产品的官方文档来源（`zed.dev/docs/*`）在本批次候选里没有可用的归档原件，因此结论不引用在线文档；提交对应的文档页面在固定源码树内。commit 只代表源码树，不证明任何已发布发行包的行为，本章因此不写发行包映射。

## 记录范围与无状态开关 {#transcripts-scope-and-switch}

落盘的是 Zed Agent（内置 agent）会话的完整状态，而不是输入历史、调试日志或缓存。`crates/agent/src/db.rs` 的 `DbThread` 结构定义了每个会话被保存的字段：标题、消息数组、更新时间，外加详细摘要、初始项目快照、累计与单次请求的 token 用量、使用的模型、agent profile、subagent 上下文、速度、思考开关与思考强度、未发送的草稿提示、界面滚动位置、沙箱终端临时目录和线程级沙箱授权 [@ref-zed-lt-db-thread-fields-a] [@ref-zed-lt-db-thread-fields-b]。也就是说，一次会话的工具调用记录、思考内容、UI 位置和沙箱授权都写进同一个会话记录，而不是分散在别处 [@ref-zed-lt-db-thread-fields-b]。

消息本身是强类型枚举：`Message` 只有 `User`、`Agent`、`Resume` 和 `Compaction` 四个变体 [@ref-zed-lt-message-enum]。用户消息内容是 `Text`、`Mention`、`Image` 三种 [@ref-zed-lt-user-message-content]；agent 消息内容是 `Text`、`Thinking`、`RedactedThinking`、`ToolUse`，并且消息对象本身还带 `tool_results` 与 `reasoning_details` 两个字段 [@ref-zed-lt-agent-message-content]。`Mention` 保存的是引用（文件、目录、符号的绝对路径，或另一个 thread 的 id），不是被引用内容的副本 [@ref-zed-lt-mention-uri]；粘贴的图像则以 base64 PNG 字符串直接内联在记录里 [@ref-zed-lt-image-base64]，因此记录自包含，不依赖外部附件文件。

不落盘的内容同样有明确边界。空会话不写库：保存前先检查线程是否为空，空则直接返回，不产生行 [@ref-zed-lt-save-payload-skip-empty]。唯一的“记录开关”是无状态模式：`ZED_STATELESS` 环境变量为真时 Zed 改用内存数据库而不做持久化 [@ref-zed-lt-stateless-env] [@ref-zed-lt-db-stateless-open]；会话库本身在同一开关下也会退化为内存库而不是 `threads/threads.db` [@ref-zed-lt-db-open-path]。这不是面向用户的设置项，固定来源中也没有找到按界面区分的“关闭会话记录”配置。

范围之外的部分本章不覆盖：Zed 的编辑器状态、协作（collab）状态、项目历史与外部 agent 自己的记录都不属于本主题。外部 agent 与终端线程（Terminal Threads）的记录由对应 CLI/TUI 自己拥有，Zed 只在侧边栏保存导入后的元数据；本轮只调查内置 Zed Agent 的会话存储。

## 存储位置、命名与格式 {#transcripts-storage-naming-format}

两个数据库都在数据目录下。数据目录按平台解析：macOS 为 `~/Library/Application Support/Zed`，Linux/FreeBSD 取 XDG data 目录再拼小写应用名（Flatpak 下优先 `FLATPAK_XDG_DATA_HOME`），Windows 取 LocalAppData 再拼应用名，并允许被自定义数据目录覆盖 [@ref-zed-lt-data-dir]。会话正文库固定为该目录下的 `threads/threads.db`，打开前会创建 `threads` 目录 [@ref-zed-lt-db-open-path]。元数据库在数据目录的 `db/` 子目录下 [@ref-zed-lt-database-dir]，文件名固定为 `db.sqlite` [@ref-zed-lt-db-path-scope]，并按发布通道分目录存放，目录名为 `0-` 加发布通道名（例如 `0-stable`）（channel 取值为 dev、nightly、preview、stable）[@ref-zed-lt-db-path-dir]。未发送的草稿提示不放在会话库里，而是作为 JSON 存在同一个 `db.sqlite` 的 key-value 区域，键是 thread id 的连字符形式 [@ref-zed-lt-draft-prompt-read]。

命名上不使用时间戳文件或分片。`threads.db` 只有一个 `threads` 表 [@ref-zed-lt-threads-table-ddl]，行主键是 session id；会话 id 在创建时由 UUID v4 生成并序列化为字符串 [@ref-zed-lt-session-id-uuid]。侧边栏另有一个独立的 thread id，同样是 UUID v4 [@ref-zed-lt-thread-id-uuid]，两套 id 通过 `session_id` 列关联。父子关系用 `parent_id` 表达，取值来自会话自身的 subagent 上下文里的父线程 id [@ref-zed-lt-save-payload]；用户可见的“分支”在这一 commit 的记录类型中未见独立表示，官方文档给出的换线方式是新建一个以当前会话摘要为种子的新线程 [@ref-zed-lt-doc-new-from-summary]。项目作用域不编码进文件名，而是逐会话记录 worktree 的绝对路径列表 [@ref-zed-lt-save-payload-folder-paths]，序列化时路径用换行连接、顺序用逗号连接的索引列表，两列分别存在 `folder_paths` 与 `folder_paths_order` [@ref-zed-lt-path-list-encode]。

格式是 SQLite 中的压缩 JSON，不是 JSONL，也没有分片。行内 `data_type` 区分 `json` 与 `zstd` 两种负载 [@ref-zed-lt-data-types]；当前写入路径统一用 zstd level 3 压缩序列化后的 JSON [@ref-zed-lt-save-compress]。写入方式是按主键 upsert，同一会话每次保存整行覆盖，不追加历史版本 [@ref-zed-lt-save-upsert]。读取时按 `data_type` 选择 zstd 解压或直接按 UTF-8 文本处理 [@ref-zed-lt-deserialize-thread]。图片不产生外部附件，而是以 base64 PNG 内联在 JSON 里 [@ref-zed-lt-image-base64]；同一份记录也可以整体压成 zstd 字节再 base64 编码导出（调试通道）[@ref-zed-lt-shared-thread-bytes]。

## 记录 schema 与版本迁移 {#transcripts-record-schema}

一行 `threads` 记录由两类信息组成：可查询的标量列（id、`parent_id`、folder 路径两列、`summary`、`updated_at`、`created_at`）和承载完整会话状态的 `data` blob [@ref-zed-lt-threads-table-ddl]。列的演进方式是启动时按“存在才加”的方式逐条 `ALTER TABLE` 追加 `parent_id`、`folder_paths`、`folder_paths_order`、`created_at` [@ref-zed-lt-threads-table-alters]。

blob 解压后是一个把 `DbThread` 字段平铺、并附带 `version` 字段的 JSON 对象 [@ref-zed-lt-save-payload] [@ref-zed-lt-save-compress]。消息条目本身是 `Message` 枚举（用户、agent、resume、压缩）[@ref-zed-lt-message-enum]，用户消息内容为文本、mention、图像三种 [@ref-zed-lt-user-message-content]，agent 消息内容为文本、思考、被遮蔽思考与工具调用 [@ref-zed-lt-agent-message-content]；blob 采用哪种压缩形态由同一行的 `data_type` 标记 [@ref-zed-lt-data-types]。字段可见性由 `#[serde(default)]` 决定：标题、消息、更新时间、思考开关是必填项，其余（摘要、项目快照、token 用量、模型、profile、subagent 上下文、速度、思考强度、草稿提示、滚动位置、沙箱临时目录、沙箱授权）缺失时可省略 [@ref-zed-lt-db-thread-fields-a] [@ref-zed-lt-db-thread-fields-b]。当前写出版本号是 `0.3.0`；读取时按记录里的 `version` 分派，版本不等于当前值时走旧格式升级路径，缺失 `version` 字段时同样按旧格式处理 [@ref-zed-lt-version-migration]。图片以 base64 PNG 内联，mentions 存引用而非内容 [@ref-zed-lt-image-base64] [@ref-zed-lt-mention-uri]。

按源码字段推导的最小完整示例（占位值，非运行时采样）：

```json
{
  "title": "示例会话",
  "messages": [
    { "User": { "id": "客户端消息 id 占位", "content": [{ "Text": "占位问题" }] } },
    { "Agent": { "content": [{ "Text": "占位回答" }], "tool_results": {} } }
  ],
  "updated_at": "2026-01-01T00:00:00Z",
  "thinking_enabled": false,
  "subagent_context": null,
  "version": "0.3.0"
}
```

仍缺的具体 schema 细节照实列出：本轮只覆盖 `DbThread` 顶层字段与消息枚举，沙箱授权结构、初始项目快照、单次请求 token 用量的键形态没有逐字段取证；JSON 键名依据 serde 默认命名推导，没有对真实 `threads.db` 行做运行时采样核对；`legacy_thread` 旧格式的各历史版本字段也未逐版展开。因此本题记为 partial。

本轮（`b47a4ca`）`db.rs` 的改动只是给测试加了一个 `#[cfg(test)]` 的保存计数器，公开的 `save_thread` 行为与 `DbThread` 字段集合都没有变化 [@ref-zed-lt-db-save-count-test-only]，因此 blob schema 与写出版本号不变。流式期间不落盘的那部分字段集合（`StreamingSaveKey`）是保存时机的判据，不是新增的持久化字段 [@ref-zed-lt-streaming-save-key]。

## 记录生命周期 {#transcripts-lifecycle}

创建：线程构造时分配 UUID v4 会话 id [@ref-zed-lt-session-id-uuid]；此时还没有任何行落盘。

追加与刷盘：agent 层对线程实体注册观察回调，线程状态一变就触发保存请求 [@ref-zed-lt-observe-save]；真正的写入由每个会话的保存协程完成，保存内容由 payload 构造函数组装，其中空线程被跳过、可见 worktree 路径被收集为项目作用域、草稿提示一并写入 [@ref-zed-lt-save-payload-skip-empty] [@ref-zed-lt-save-payload-folder-paths]。行按主键覆盖写，因此同一会话在磁盘上始终只有最新一版 [@ref-zed-lt-save-upsert]。

流式期间的保存抑制：`b47a4ca` 起，观察回调触发的保存会在「正在流式且没有新东西可写」时被直接跳过。判定由三部分组成——线程存在进行中的消息（`pending_message` 非空）[@ref-zed-lt-streaming-predicate]、构成 `StreamingSaveKey` 的字段集合与上一次成功入队时完全相同、ACP 线程的草稿修订号未变 [@ref-zed-lt-streaming-save-skip]。不参与比较的字段是显式排除的：token 用量与滚动位置因为每个流式分片或每次滚动都可能变化，被排除在 key 之外 [@ref-zed-lt-streaming-save-key]。被比较的字段为消息条数、标题、摘要、模型、profile、速度、思考开关与思考强度、沙箱终端临时目录与线程级沙箱授权 [@ref-zed-lt-streaming-save-key] [@ref-zed-lt-streaming-predicate]。每次真正入队保存时，会话把当时的 key 与草稿修订号记下来，作为下一次比较的基准 [@ref-zed-lt-save-enqueue-key]；草稿提示每次被替换时修订号自增，因此流式期间的草稿编辑仍会触发一次写入 [@ref-zed-lt-draft-prompt-revision]。源码同时把这条约束写成契约：`to_db` 新增字段时必须同步进 `StreamingSaveKey`，除非该字段可以等到响应流结束后再保存 [@ref-zed-lt-to-db-streaming-contract]。

这对读者可见的结果是：流式过程中磁盘上的会话行不会跟着每个分片抖动；一条消息的最终内容、期间改过的标题/模型/思考设置，以及流式结束前完成的草稿编辑，都会在下一次判定为「有变化」时写入。若这一轮回复最终没有产出任何内容（`pending_message` 内容为空），刷盘路径不会追加消息，而是显式发出一次 `notify` 以把期间累积的 token 用量之类改动落盘 [@ref-zed-lt-flush-pending-notify]。

关闭：进程退出时会对所有非空会话做一次并发刷盘，注释明确目的是避免异步保存竞态导致“有元数据没正文” [@ref-zed-lt-quit-flush]。

恢复：按 id 从 `threads` 表读取行并解压还原为线程对象，行不存在时返回空 [@ref-zed-lt-load-thread]。

分支与子代理：交给子代理的会话不是新格式，而是同一张表里多一行，`parent_id` 指向父会话，删除父会话时按父子关系递归收集后代 [@ref-zed-lt-save-payload] [@ref-zed-lt-delete-cascade]。用户侧的“换一条线”目前由文档描述为新建一个以当前会话摘要为种子的新线程 [@ref-zed-lt-doc-new-from-summary]。

上下文压缩后延续：压缩结果作为 `Compaction` 消息留在消息数组里（摘要式或 provider 原生式）[@ref-zed-lt-message-enum]，所以压缩后的会话在磁盘上仍是同一条可恢复的记录。

## 数据库布局与两库分工 {#transcripts-database-layout}

Zed Agent 使用数据库，而且是两套：正文在 `threads/threads.db` 的 `threads` 表 [@ref-zed-lt-db-open-path] [@ref-zed-lt-threads-table-ddl]，元数据在按发布通道隔离的另一个文件里。

- 正文库 `threads/threads.db`：`threads` 单表，保存会话内容 blob 及用于列表的标量列；列的演进方式是启动时逐条 `ALTER TABLE` 追加 [@ref-zed-lt-threads-table-alters]，列表按 `updated_at`、`created_at` 倒序，不做内容检索索引 [@ref-zed-lt-list-threads]。
- 元数据库位于数据目录的 `db/` 子目录下 [@ref-zed-lt-database-dir]：`sidebar_threads` 表保存 thread id、session id、agent id、标题、时间戳、路径与归档标记 [@ref-zed-lt-metadata-table-ddl]，后续版本重建为以 thread id 为主键的 `sidebar_threads_v2` 并补上 remote 连接信息 [@ref-zed-lt-metadata-v2-table]；归档开关就是这一行上的 `archived` 字段更新 [@ref-zed-lt-archive-fn] [@ref-zed-lt-update-archived]。同一库里还有 worktree 归档记录表，草稿提示存在 key-value 区域 [@ref-zed-lt-draft-prompt-read]。数据库文件按发布通道隔离在 `0-` 加发布通道名（例如 `0-stable`） 子目录 [@ref-zed-lt-db-path-dir] [@ref-zed-lt-db-path-scope]。

恢复会话所必需的是正文库中的那一行 [@ref-zed-lt-load-thread]；元数据库只影响列表展示、归档状态和 worktree 归属。反方向不成立：元数据可以从正文库重建（固定源码中存在把 native thread store 的条目迁移进新元数据存储的流程），但正文只有一份来源，无法从元数据重建。跨通道读取已有实现可作参照：它直接对另一通道的 `db.sqlite` 执行 `SELECT 1 FROM sidebar_threads LIMIT 1` 判断是否有线程 [@ref-zed-lt-cross-channel-detect] [@ref-zed-lt-metadata-list-connection]。固定源码中未见针对会话正文的独立全文或向量索引。

## 归档、恢复、移动与删除 {#transcripts-archive-restore-cleanup}

原生“归档”不是导出，也不是删除：文档描述为在侧边栏点归档图标或按 `agent::ArchiveSelectedThread`，线程进入 Thread History 并可随时恢复 [@ref-zed-lt-doc-archive-thread] [@ref-zed-lt-doc-thread-history]。实现上就是把元数据行的 `archived` 置为真 [@ref-zed-lt-archive-fn] [@ref-zed-lt-update-archived]。对被归档的 Git worktree，Zed 会先把工作区状态存成两个 detached WIP commit 并写入 worktree 归档记录 [@ref-zed-lt-worktree-persist-state]，移除 worktree 时先校验是 Zed 自己创建的再从磁盘移除 [@ref-zed-lt-worktree-remove-root]。Thread History 与侧边栏里显示的 worktree 短名由会话记录的 `folder_paths` 推导，本轮 `b47a4ca` 把这一推导显式固定为按本机路径风格解析（`PathStyle::local()`），短名只用于显示，不进入持久化记录 [@ref-zed-lt-worktree-short-name-style]。

导出与外部备份是另外三条路：

- “Open Thread as Markdown” 在编辑器中打开整个线程 [@ref-zed-lt-doc-open-markdown]，而生成的 Markdown 只由消息数组渲染 [@ref-zed-lt-thread-to-markdown]，因此标题以外的运行状态、token 用量、沙箱授权、worktree 归属都不在这份文件里 [@ref-zed-lt-shared-thread-to-db-thread]。
- 调试用的剪贴板导出把会话压成 zstd 字节再 base64 编码 [@ref-zed-lt-shared-thread-bytes]；反向导入会新建一行并给标题加链接前缀，其余运行态字段重置为默认值 [@ref-zed-lt-shared-thread-to-db-thread]。这是调试通道，不是官方备份格式。
- 跨发布通道导入：Zed 会检查其它通道的数据库里是否存在线程并提示导入 [@ref-zed-lt-cross-channel-detect]。
- 手工复制 `threads.db` 与 `db/0-` 加通道名（例如 `db/0-stable/db.sqlite`） 即为文件级备份，固定来源没有为备份定义校验或迁移流程；把文件搬到另一台机器后，`folder_paths`、worktree 归档记录里的绝对路径仍然指向原机器 [@ref-zed-lt-save-payload-folder-paths] [@ref-zed-lt-worktree-persist-state]，可移植性损失由这两处绝对路径决定。

永久删除走官方入口：文档说明在 Thread History 里点垃圾桶图标会移除会话历史并清理关联 worktree 数据，删除后不可恢复 [@ref-zed-lt-doc-thread-history-delete]。实现顺序是：先删元数据库中的那一行 [@ref-zed-lt-archive-view-delete] [@ref-zed-lt-metadata-delete]，再清理该线程的 worktree 归档记录 [@ref-zed-lt-worktree-cleanup]，最后通过 agent 会话列表接口删除会话内容；内置 agent 声明支持删除，单条删除与全量删除分别映射到正文库的 `delete_thread` 与 `delete_threads` [@ref-zed-lt-session-delete-api] [@ref-zed-lt-delete-entry]。正文库删除按 `parent_id` 递归收集所有后代子代理会话后逐条删除 [@ref-zed-lt-delete-cascade]，并顺带移除这些会话记录的沙箱终端临时目录。

本题记为 partial：官方删除路径的每个环节都有源码证据，但“手动删除文件或数据库”的后果没有第一方说明。固定源码只能支持这样的推断——手动删掉 `threads.db` 后，下次启动会重新创建空库并重建表结构 [@ref-zed-lt-db-open-path] [@ref-zed-lt-threads-table-ddl]，而元数据库中的 `sidebar_threads` 行不会被同步清掉 [@ref-zed-lt-metadata-table-ddl]，形成指向不存在会话的元数据；这属于代码路径推断，未做运行时验证，也不能据此认为手动删除是安全的清理方式。删除前必须停掉写入者（Zed 进程本身），否则观察回调与退出刷盘会重新写回 [@ref-zed-lt-observe-save] [@ref-zed-lt-quit-flush]。

## 定位、读取与排错 {#transcripts-diagnostics}

按顺序定位：数据目录按平台规则解析 [@ref-zed-lt-data-dir]，正文库是 `threads/threads.db` [@ref-zed-lt-db-open-path]，元数据库是 `db/0-` 加通道名（例如 `db/0-stable/db.sqlite`） [@ref-zed-lt-db-path-dir] [@ref-zed-lt-db-path-scope]。检查完整性与状态时，SQLite 侧先看 `threads` 表的行数与 `updated_at` 分布（列表查询本身就是按时间倒序）[@ref-zed-lt-threads-table-ddl] [@ref-zed-lt-list-threads]；正文需要解压后按 `data_type` 分支处理，`zstd` 走解压、`json` 直接当 UTF-8 文本 [@ref-zed-lt-deserialize-thread]。解压后先看 `version` 字段：等于当前版本直接反序列化，否则走旧格式升级；两者都失败通常意味着该行是更早或第三方写入的格式，源码没有兜底重建 [@ref-zed-lt-version-migration]。元数据一侧可按 `archived` 与 `session_id` 判断条目是否还指向真实会话 [@ref-zed-lt-metadata-table-ddl]。

界面内的现成入口：调试动作 `ShowThreadMetadata` 会把当前线程的元数据以 JSON 打开在编辑器里 [@ref-zed-lt-show-thread-metadata]；跨通道检查可参考导入流程对其它通道数据库执行的探测查询 [@ref-zed-lt-cross-channel-detect] [@ref-zed-lt-metadata-list-connection]。备份或恢复出错时，日志目录在数据目录下的 `logs`（macOS 为 `~/Library/Logs/Zed`）[@ref-zed-lt-logs-dir]；会话库打开失败会带上 “Failed to create threads table” 之类的上下文报错。若进程运行在无状态模式下，两套数据库都是内存库，磁盘上不会有可读记录 [@ref-zed-lt-db-stateless-open]，此时排查方向应完全不同。

本章未覆盖：日志与崩溃转储的轮转策略、遥测、编辑器的 undo/checkpoint 记录、外部 agent 各自的数据目录，以及跨通道导入的字段映射细节——这些超出“会话记录与维持它所需的存储依赖”的范围。
