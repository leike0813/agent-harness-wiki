---
schema_version: 3
record_kind: production
edition_id: deepseek-harness-local_transcripts-v1
harness_id: deepseek-harness
topic: local_transcripts
title: "DeepSeek Harness 的本地 Transcript：JSONL 事件日志、派生索引与归档清理"
sections:
  - section_id: transcripts-record-scope
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-catalog-scope, ref-deepseek-harness-lt-surface-vs-logonly, ref-deepseek-harness-lt-event-envelope-type, ref-deepseek-harness-lt-storage-semantics-contract, ref-deepseek-harness-lt-compaction-logonly-events, ref-deepseek-harness-lt-headless-resume-requirements]
  - section_id: transcripts-storage-layout
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-base-jsonl-root-row, ref-deepseek-harness-lt-jsonl-config-fields, ref-deepseek-harness-lt-dsh-home-precedence, ref-deepseek-harness-lt-dsh-home-path-join, ref-deepseek-harness-lt-ondisk-layout-tree, ref-deepseek-harness-lt-project-key, ref-deepseek-harness-lt-project-dir, ref-deepseek-harness-lt-session-dir, ref-deepseek-harness-lt-current-log-path, ref-deepseek-harness-lt-generation-filename, ref-deepseek-harness-lt-encode-segment, ref-deepseek-harness-lt-lease-filename, ref-deepseek-harness-lt-attachment-store-path, ref-deepseek-harness-lt-sdk-minimal-sessions-row, ref-deepseek-harness-lt-desktop-shared-home, ref-deepseek-harness-lt-desktop-web-profile, ref-deepseek-harness-lt-header-lineage-fields, ref-deepseek-harness-lt-delegation-depth-durable, ref-deepseek-harness-lt-layout-selection-rule]
  - section_id: transcripts-record-format
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-event-row-serialization, ref-deepseek-harness-lt-storage-semantics-contract, ref-deepseek-harness-lt-torn-tail-repair, ref-deepseek-harness-lt-jsonl-header-line, ref-deepseek-harness-lt-session-format-version, ref-deepseek-harness-lt-jsonl-config-fields, ref-deepseek-harness-lt-layout-selection-rule]
  - section_id: transcripts-record-schema
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-event-envelope-type, ref-deepseek-harness-lt-user-message-event-shape, ref-deepseek-harness-lt-header-line-encoding, ref-deepseek-harness-lt-logical-header-fields, ref-deepseek-harness-lt-header-lineage-fields, ref-deepseek-harness-lt-create-session-meta, ref-deepseek-harness-lt-catalog-scope, ref-deepseek-harness-lt-session-format-version, ref-deepseek-harness-lt-migrate-usage]
  - section_id: transcripts-lifecycle
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-handle-ownership-model, ref-deepseek-harness-lt-handle-append-semantics, ref-deepseek-harness-lt-handle-flush-barrier, ref-deepseek-harness-lt-handle-close-drain, ref-deepseek-harness-lt-truncate-torn-tail-api, ref-deepseek-harness-lt-interrupted-turn-closers, ref-deepseek-harness-lt-resume-crash-repair, ref-deepseek-harness-lt-headless-resume-requirements, ref-deepseek-harness-lt-headless-resume-adoption, ref-deepseek-harness-lt-delegation-depth-durable, ref-deepseek-harness-lt-compaction-logonly-events, ref-deepseek-harness-lt-create-session-meta]
  - section_id: transcripts-index-and-derived-state
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-base-search-index-row, ref-deepseek-harness-lt-sqlite-index-config, ref-deepseek-harness-lt-web-search-index-row, ref-deepseek-harness-lt-base-storage-rows, ref-deepseek-harness-lt-base-projection-cache-row, ref-deepseek-harness-lt-workspace-domain-state, ref-deepseek-harness-lt-workspace-domain-spec, ref-deepseek-harness-lt-persistence-snapshot-fields]
  - section_id: transcripts-archive-and-export
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-web-workspace-row, ref-deepseek-harness-lt-archive-session-contract, ref-deepseek-harness-lt-archive-drops-pin, ref-deepseek-harness-lt-web-export-row, ref-deepseek-harness-lt-export-command-contract, ref-deepseek-harness-lt-export-archive-log-names, ref-deepseek-harness-lt-export-archive-payloads, ref-deepseek-harness-lt-export-zip-filename]
  - section_id: transcripts-cleanup
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-no-deletion-api, ref-deepseek-harness-lt-workspace-delete-keeps-logs, ref-deepseek-harness-lt-write-lease-posix, ref-deepseek-harness-lt-lease-lifetime, ref-deepseek-harness-lt-attachment-store-path, ref-deepseek-harness-lt-layout-selection-rule]
  - section_id: transcripts-diagnostics
    surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
    source_refs: [ref-deepseek-harness-lt-project-key, ref-deepseek-harness-lt-encode-segment, ref-deepseek-harness-lt-session-location-prose, ref-deepseek-harness-lt-session-location-type, ref-deepseek-harness-lt-revision-token, ref-deepseek-harness-lt-persistence-snapshot-fields, ref-deepseek-harness-lt-migrate-usage, ref-deepseek-harness-lt-jsonl-config-fields, ref-deepseek-harness-lt-truncate-torn-tail-api, ref-deepseek-harness-lt-storage-semantics-contract]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-record-scope
        status: answered
        source_refs: [ref-deepseek-harness-lt-catalog-scope, ref-deepseek-harness-lt-surface-vs-logonly, ref-deepseek-harness-lt-event-envelope-type, ref-deepseek-harness-lt-storage-semantics-contract, ref-deepseek-harness-lt-compaction-logonly-events]
  - question_id: transcripts.location
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-deepseek-harness-lt-base-jsonl-root-row, ref-deepseek-harness-lt-jsonl-config-fields, ref-deepseek-harness-lt-dsh-home-precedence, ref-deepseek-harness-lt-dsh-home-path-join, ref-deepseek-harness-lt-ondisk-layout-tree, ref-deepseek-harness-lt-project-dir, ref-deepseek-harness-lt-session-dir, ref-deepseek-harness-lt-current-log-path, ref-deepseek-harness-lt-attachment-store-path, ref-deepseek-harness-lt-lease-filename, ref-deepseek-harness-lt-sdk-minimal-sessions-row, ref-deepseek-harness-lt-desktop-shared-home, ref-deepseek-harness-lt-desktop-web-profile]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-deepseek-harness-lt-ondisk-layout-tree, ref-deepseek-harness-lt-project-key, ref-deepseek-harness-lt-project-dir, ref-deepseek-harness-lt-session-dir, ref-deepseek-harness-lt-generation-filename, ref-deepseek-harness-lt-encode-segment, ref-deepseek-harness-lt-header-lineage-fields, ref-deepseek-harness-lt-delegation-depth-durable, ref-deepseek-harness-lt-layout-selection-rule]
  - question_id: transcripts.format
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-record-format
        status: answered
        source_refs: [ref-deepseek-harness-lt-event-row-serialization, ref-deepseek-harness-lt-storage-semantics-contract, ref-deepseek-harness-lt-torn-tail-repair, ref-deepseek-harness-lt-jsonl-header-line, ref-deepseek-harness-lt-session-format-version, ref-deepseek-harness-lt-jsonl-config-fields, ref-deepseek-harness-lt-layout-selection-rule]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-deepseek-harness-lt-event-envelope-type, ref-deepseek-harness-lt-user-message-event-shape, ref-deepseek-harness-lt-header-line-encoding, ref-deepseek-harness-lt-logical-header-fields, ref-deepseek-harness-lt-header-lineage-fields, ref-deepseek-harness-lt-create-session-meta, ref-deepseek-harness-lt-catalog-scope, ref-deepseek-harness-lt-session-format-version, ref-deepseek-harness-lt-migrate-usage]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-deepseek-harness-lt-handle-ownership-model, ref-deepseek-harness-lt-handle-append-semantics, ref-deepseek-harness-lt-handle-flush-barrier, ref-deepseek-harness-lt-handle-close-drain, ref-deepseek-harness-lt-truncate-torn-tail-api, ref-deepseek-harness-lt-interrupted-turn-closers, ref-deepseek-harness-lt-resume-crash-repair, ref-deepseek-harness-lt-headless-resume-requirements, ref-deepseek-harness-lt-headless-resume-adoption, ref-deepseek-harness-lt-delegation-depth-durable, ref-deepseek-harness-lt-compaction-logonly-events, ref-deepseek-harness-lt-create-session-meta]
  - question_id: transcripts.database
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-index-and-derived-state
        status: answered
        source_refs: [ref-deepseek-harness-lt-base-search-index-row, ref-deepseek-harness-lt-sqlite-index-config, ref-deepseek-harness-lt-web-search-index-row, ref-deepseek-harness-lt-base-storage-rows, ref-deepseek-harness-lt-base-projection-cache-row, ref-deepseek-harness-lt-workspace-domain-state, ref-deepseek-harness-lt-workspace-domain-spec, ref-deepseek-harness-lt-persistence-snapshot-fields]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [web, desktop]
        section_id: transcripts-archive-and-export
        status: answered
        source_refs: [ref-deepseek-harness-lt-web-workspace-row, ref-deepseek-harness-lt-archive-session-contract, ref-deepseek-harness-lt-archive-drops-pin, ref-deepseek-harness-lt-web-export-row, ref-deepseek-harness-lt-export-command-contract, ref-deepseek-harness-lt-export-archive-log-names, ref-deepseek-harness-lt-export-archive-payloads, ref-deepseek-harness-lt-export-zip-filename]
      - surface_ids: [headless, acp, sdk, sdk-minimal]
        section_id: transcripts-archive-and-export
        status: partial
        source_refs: [ref-deepseek-harness-lt-web-workspace-row, ref-deepseek-harness-lt-web-export-row]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-cleanup
        status: partial
        source_refs: [ref-deepseek-harness-lt-no-deletion-api, ref-deepseek-harness-lt-workspace-delete-keeps-logs, ref-deepseek-harness-lt-write-lease-posix, ref-deepseek-harness-lt-lease-lifetime, ref-deepseek-harness-lt-attachment-store-path, ref-deepseek-harness-lt-layout-selection-rule]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [web, desktop, headless, acp, sdk, sdk-minimal]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-deepseek-harness-lt-project-key, ref-deepseek-harness-lt-encode-segment, ref-deepseek-harness-lt-session-location-prose, ref-deepseek-harness-lt-session-location-type, ref-deepseek-harness-lt-revision-token, ref-deepseek-harness-lt-persistence-snapshot-fields, ref-deepseek-harness-lt-migrate-usage, ref-deepseek-harness-lt-jsonl-config-fields, ref-deepseek-harness-lt-truncate-torn-tail-api, ref-deepseek-harness-lt-storage-semantics-contract]
---

## 记录什么、由什么决定记不记 {#transcripts-record-scope}

一个会话的持久形态就是一条**只追加的 `SessionEvent` 日志**，它是这个会话的真源；没有第二套并行落盘的记录类型。仓库用一份生成文件把这份词汇表逐条列出，覆盖逻辑头、物理头、事件信封以及每个插件的声明合并，所以「记了哪些东西」应当在那份目录里查，而不是从 UI 行为反推[@ref-deepseek-harness-lt-catalog-scope]。事件分两类：**surface 事件**产生模型历史，**log-only 事件**只留在日志里不进模型上下文[@ref-deepseek-harness-lt-surface-vs-logonly]。信封本身固定携带 `type`、`seq`、`time`、`data`、可选的 `ignorable`，以及只在 surface 事件上出现的 `surfaceOp` / `sourceEventSeqs`[@ref-deepseek-harness-lt-event-envelope-type]。落到实践上，日志里除用户、助手与工具消息外，还有 turn/step 边界、审批、hook 调用与结果、模型与沙箱选择、todo、workspace 变更、子代理目录与描述符、压缩三类事件；压缩的三条 `compaction/*` 就是典型 log-only 记录，它们记录锁、摘要、被遮蔽区间与 token 数而不进 surface[@ref-deepseek-harness-lt-compaction-logonly-events]。

**没有面向用户的「记录/不记录」开关**，这是本章最容易被误解的一点。记录行为是结构性的：持久化是一个能力缝（`ctx.sessionPersistence`），组合要么挂一个 provider，要么不挂；不挂时会话只在内存里，进程退出即消失。反过来，headless 的续跑路径会在组合缺这个服务时**直接失败并说明原因**——它不会静默跑完再丢历史，因为「跑成功、打印 id、退出时丢掉全部历史」是最坏的失败形态，所以这条依赖被写成硬失败[@ref-deepseek-harness-lt-headless-resume-requirements]。至于具体记录哪些调用与结果，不由本章决定：工具集与开关见「工具与配置机制」，hook 事件见 `hooks.events`，Agent 预设见 `agents.*`。

**不落盘的东西要说准**。图片与通用文件的字节不在日志里，日志只保留内容寻址引用，字节由 `attachment-local` 存在 harness home 下另一个根（见存储位置一节）；遥测是另一条线，`session-telemetry-otel` 的默认模式是 `FEEDBACK_ONLY`，只有用户明确反馈后才导出日志前缀，它既不写日志也不受日志开关控制。所有后端共享的存储语义是：事件从 seq 0 连续、已提交事件永不重写、撕裂的物理尾部不返回给读者并在写路径首次追加前截断、读取只校验当前格式记录并对未知词汇失败关闭[@ref-deepseek-harness-lt-storage-semantics-contract]。本节已查入口：`docs/subsystems/persistence.md`、`docs/subsystems/session.md`、`docs/persistence-catalog.md` 与 JSONL provider 的 README/源码；剩余缺口是外部插件自带的事件类型不在本仓库目录内，需要各自的声明。

## 日志、附件与索引分别落在哪里 {#transcripts-storage-layout}

出厂位置由 base bundle 的一行固定：`@deepseek-ai/dsh-session-persistence-jsonl` 的 `root` 是 `dshHomePath('sessions')`[@ref-deepseek-harness-lt-base-jsonl-root-row]，而 `dshHomePath()` 把片段拼到解析后的 harness home 上，home 的优先级是**显式配置 > `$DSH_HOME` > `~/.dsh`**，空白的 `$DSH_HOME` 当作未设置[@ref-deepseek-harness-lt-dsh-home-precedence] [@ref-deepseek-harness-lt-dsh-home-path-join]。所以六个界面的默认根是同一条路径，`web`、`headless`、`acp`、`sdk` 都经由 `dsh-base` 拿到它；`desktop` 不另设根，`resolveDesktopPaths()` 默认就取共享的 `resolveDshHome()`，只有 profile 目录被放到 `$DSH_HOME/profiles/desktop`[@ref-deepseek-harness-lt-desktop-shared-home]，而它启动的是 web profile 的 bundle 集合[@ref-deepseek-harness-lt-desktop-web-profile]。provider 只有两个配置字段：`root` 必填且没有默认（源码刻意不用 `process.cwd()`，否则会话文件会随进程工作目录散落），`compression` 默认 `'zstd'`、可选 `'none'`（换行分隔的 UTF-8 文本）[@ref-deepseek-harness-lt-jsonl-config-fields]。

目录层级是**项目目录 / 会话目录 / 代次文件**三层。项目目录名是 cwd 归一化后的 slug 再包在一对 `--` 之间（写成 `--CWD_SLUG--`）：`/`、`\`、`:` 连续出现折成一个 `-`，不安全码元按 `~XXXX` 转义，slug 截到 251 字符；没有 cwd 的会话落在 `_no-cwd`[@ref-deepseek-harness-lt-project-key] [@ref-deepseek-harness-lt-project-dir]。项目目录之下是**一个会话一个目录**，目录名是会话 id 经过单段转义后的结果（`SessionId` 是未校验的品牌字符串，所以 `../`、绝对路径、NUL 与分隔符在进文件系统前被中和，`.` 与 `..` 特殊处理）[@ref-deepseek-harness-lt-session-dir] [@ref-deepseek-harness-lt-encode-segment]。会话目录里的文件名带代次：v0 保留无版本后缀的 `session.jsonl`，之后的每一代是 `session.vN.jsonl`，压缩开启时再加 `.zstd`[@ref-deepseek-harness-lt-generation-filename]，当前代的追加目标由 `logPath()` 在同一路径上解析[@ref-deepseek-harness-lt-current-log-path]。整棵树的形状因此是固定的（以 `$DSH_HOME/sessions` 为例）：

```text
--home-user-src-repo/         # 项目目录，或 _no-cwd/
  01JABCDEF/                  # 会话目录：转义后的会话 id
    session.jsonl.zstd         # 历史 v0
    session.v3.jsonl.zstd      # 历史 v3
    session.v4.jsonl.zstd      # 当前代
    session.lock               # POSIX 写锁文件
```

读日志选**数值最高的规范代次**；归一化后相同的 cwd 共享项目目录，但会话 id 仍各自指向不同目录。格式拒绝的诊断信息会指名那条绝对路径，好让操作者找到被拒绝解释的原始日志[@ref-deepseek-harness-lt-ondisk-layout-tree] [@ref-deepseek-harness-lt-layout-selection-rule]。

**同一目录里还有两处必须知道的邻居**。一是写锁文件：POSIX 上是会话目录里的 `session.lock`，Windows 上没有锁文件而是用由该路径派生的命名内核信号量[@ref-deepseek-harness-lt-lease-filename]；它与代次文件同目录，所以复制会话目录时会一并带走。二是附件字节：图片与通用文件存在 `$DSH_HOME/attachments/v1`，内容寻址、相同图片只存一份，**不会被自动删除**[@ref-deepseek-harness-lt-attachment-store-path]。也就是说，删掉会话目录不会回收附件空间，而保留会话目录但不保留附件根会让历史里的引用指向读不到的内容。

**`sdk-minimal` 是唯一换编码的界面，必须单独记住**：它的 bundle 不叠加 `dsh-base`，自己声明的 `sessions` 行同样是 `root: dshHomePath('sessions')`，但显式写了 `compression: none`[@ref-deepseek-harness-lt-sdk-minimal-sessions-row]。同一个 root 下混两种编码是不被支持的形态（后端在发现与定向查找时按后缀拒绝另一种编码的代次），所以拿 `sdk-minimal` 与其它界面共用一个 `$DSH_HOME` 去读同一批会话是本轮没有找到支持证据的用法。本章其它小节凡涉及 `web`/`desktop`/`headless`/`acp`/`sdk` 的结论都不能直接套到 `sdk-minimal` 的编码上。

会话与项目、父子的关系不靠目录名表达，而靠**头字段**：`SessionHeader.parentSession` 记父会话 id，`isSeeded` 记是否含 fork 继承前缀，`origin: 'subagent'` 是子代理子会话的粗粒度分类，`delegationDepth` 是持久化的委派深度——它落盘是为了让递归预算在重启与续跑后仍然成立，只在运行时算的深度会把续跑的子会话当成顶层[@ref-deepseek-harness-lt-header-lineage-fields] [@ref-deepseek-harness-lt-delegation-depth-durable]。换句话说，父子关系可以从**每个会话自己的头**读出来，不必顺着目录树猜。

## 物理格式、写入方式与代次 {#transcripts-record-format}

每个会话文件是标准 JSONL：**第一行是物理头，之后每个持久事件占一行**（紧凑的助手流是嵌套的事件数据，不是独立行）[@ref-deepseek-harness-lt-jsonl-header-line] [@ref-deepseek-harness-lt-event-row-serialization]。默认物理编码是一串独立的 Zstandard 帧——一个只含头行的带校验帧，之后每个持久批次一帧；`compression: 'none'` 保留同样的逻辑行但不做帧压缩，得到外部工具能直接逐行读的文本[@ref-deepseek-harness-lt-jsonl-config-fields]。**没有分片、没有轮转、没有按大小切分**：一个会话就是一个文件，追加是唯一的写入方向。已提交事件永不重写[@ref-deepseek-harness-lt-storage-semantics-contract]。

写入不是「每事件一次落盘」。`append` 是尽力而为：解析后该批次已被接受、有序、对同一后端实例的读取可见，但只有 `flush` 才承诺崩溃后仍在。撕裂的物理尾部属于某个从未 resolve 的追加，只有它被丢弃；从撕裂尾部解出的完整记录会由写路径在首次新追加前**持久重写**，实现上先 `truncateTornTail()` 截断再 `persistBatch()` 补写已恢复事件，状态按步清除以便失败后重试[@ref-deepseek-harness-lt-torn-tail-repair]。当前格式版本是常量 `SESSION_FORMAT_VERSION = 4`[@ref-deepseek-harness-lt-session-format-version]，历史代次作为独立文件并存于同一会话目录，运行时只操作数值最高的规范代次[@ref-deepseek-harness-lt-layout-selection-rule]。

要注意 `root` 的编码是**整个根的属性**而不是每个文件的属性：迁移保留原配置的编码，而压缩方式转换、混合根回退与双写都不受支持。已发布格式拒绝（读不懂的日志）与损坏（`SessionPersistenceCorruptionError`）是两回事——前者不是数据坏了而是这个构建不能忠实解释它；被完整提交的帧若出现校验、解压或结构失败才按损坏拒绝。面向外部工具的选择只有一条：**在写新根之前就选 `compression: 'none'`**，事后转换不受支持。

## 记录 schema：头、信封与一个最小示例 {#transcripts-record-schema}

字段存在性规则不是本文档自己定的，而是由生成目录对每种第一方事件类型逐条投影出来的；把那份目录当作字段清单的权威来源，而不是从本节示例外推[@ref-deepseek-harness-lt-catalog-scope]。物理头是一个 `type: 'session'` 的对象，必填键是 `type`、`version`、`id`、`createdAt`、`isSeeded`、`delegationDepth`，可选键是 `cwd`、`parentSession`、`origin`、`agentPreset`；不在两个集合里的键会被类型守卫拒绝，已退役的策略字段（`sandboxMode`、`approvalPolicy`）显式报错[@ref-deepseek-harness-lt-jsonl-header-line]。编码时 `delegationDepth` 缺省补 0，并且 **`isSeeded` 为真时必须给出确切的继承前缀长度**、为假时该长度必须为 0，否则构造直接抛错[@ref-deepseek-harness-lt-header-line-encoding]。逻辑侧的头与物理头同形：`version`、`id`、`createdAt`（非负安全整数的 Unix 毫秒）、可选的绝对 `cwd`、可选 `parentSession`、必需的 `isSeeded`，再加 `origin` 与 `delegationDepth` 这两个委派字段[@ref-deepseek-harness-lt-logical-header-fields] [@ref-deepseek-harness-lt-header-lineage-fields]。头的元数据**在事件日志之外**，不参与重放成消息；fork 继承的确切切点存在日志末尾那条带标签的 `session/end-seed` 事件上，而不是存在头里。

事件信封是 `type` 上的判别联合，每个变体带 `seq`（会话内单调序号）、`time`（Unix 毫秒）、`data`（该类型的负载），`ignorable?: true` 标记「读者不认识时可以安全跳过」——缺省意味着必需，遇到不认识且未标记的类型必须拒绝重建而不是静默丢弃[@ref-deepseek-harness-lt-event-envelope-type]。`surfaceOp` 与 `sourceEventSeqs` 只在五个 surface 事件类型（`system/message`、`developer/message`、`user/message`、`assistant/message`、`tool/result`）上出现，其余事件类型上它们被类型层面禁止。仓库为每个第一方事件类型生成一份字段存在性表，例如 `user/message` 的必填项是 `type`、`seq`、`time`、`data`、`surfaceOp`，可选项是 `ignorable` 与 `sourceEventSeqs`[@ref-deepseek-harness-lt-user-message-event-shape]。

按上述固定字段拼出的**脱敏最小示例**（占位值，非任何真实日志；`root` 落在 `_no-cwd` 下只是一个合法取值）：

```jsonl
{"type":"session","version":4,"id":"s_01HX-placeholder","createdAt":1767225600000,"isSeeded":false,"delegationDepth":0}
{"type":"turn/start","seq":0,"time":1767225600100,"data":{"turn":1}}
{"type":"user/message","seq":1,"time":1767225600200,"data":{"text":"占位问题"},"surfaceOp":"append"}
{"type":"turn/end","seq":2,"time":1767225600300,"data":{"reason":{"kind":"completed"}}}
```

创建侧的输入契约是 `CreateSessionOptions`：`seed` 提供初始重放或 fork 历史，`meta` 提供 `cwd`、`parentSession`、`createdAt`、`isSeeded`、`origin`、`delegationDepth`、`agentPreset`，存储层把它们折进头；`seed` 本身**不**使会话成为继承会话，只有 `isSeeded` 加确切切点才是[@ref-deepseek-harness-lt-create-session-meta]。

**为什么这一题只给 `partial`**：已固定的是头字段、信封字段、字段存在性规则与格式版本常量（`SESSION_FORMAT_VERSION = 4`）[@ref-deepseek-harness-lt-session-format-version]；**未固定**的是每一种第一方事件类型的完整必填字段清单——那份清单由生成目录逐条给出，本章只引用了其中一个事件的字段表作为形态示例，没有把全部事件类型的字段表抄进正文。版本迁移规则同理：已固定的只是「历史代次作为独立文件并存、运行时选最高代、迁移保留原编码」以及维护者命令会**在原文件旁发布 V4 后继且不改动源文件**[@ref-deepseek-harness-lt-migrate-usage]；逐代迁移的完整链条与其拒绝规则在源码树里另有专门文档，本轮未逐条核实。

## 创建、追加、刷盘、恢复、分支与压缩后延续 {#transcripts-lifecycle}

所有日志读写都经过**句柄**（`SessionHandle`），而不是按 id 寻址的服务方法；句柄是单所有者状态，进程内第二次 `open(id, 'write')` 会被拒，`close()` 是唯一的拆除动作且幂等、不可取消[@ref-deepseek-harness-lt-handle-ownership-model]。时序是：**`create(header)` 本身不写任何东西**，只交出写句柄；首次 `append` 写入并 fsync 编码后的头与首个批次，之后每个批次追加并 fsync 后才 resolve[@ref-deepseek-harness-lt-handle-append-semantics]。**`flush()` 是唯一的耐久屏障**：resolve 时所有已确认的追加都持久、且会话对其它进程可见，一个从未追加过的空会话也在这里第一次变得可列出[@ref-deepseek-harness-lt-handle-flush-barrier]。`close()` 对写句柄完成待处理耐久并释放写所有权，关闭时仍在路由缓冲里的事件通过尚未关闭的存储落盘，因此拆除扫描不会丢事件[@ref-deepseek-harness-lt-handle-close-drain]。

崩溃恢复的分工要说清：**持久层不截断也不修复语义**。日志可能以一个没有配对结束标记的 turn 收尾，这是合法的物理事实；只有撕裂尾部那段不完整碎片被丢弃，撕裂尾部解出的完整记录在首次新追加前被持久重写，后端会为这件事打一条告警日志[@ref-deepseek-harness-lt-truncate-torn-tail-api]。**补齐语义是 agent 层的职责**：续跑读回存储日志、计算缺失的工具错误、未闭合的 step 与一条合成的 `turn/end { reason: { kind: 'interrupted' } }`，把它们当作普通批次经同一个写句柄追加[@ref-deepseek-harness-lt-interrupted-turn-closers] [@ref-deepseek-harness-lt-resume-crash-repair]。因此修复只发生在写所有权之下，活着的会话不会被并发修复。

续跑入口在 headless 面上是 `--session-id`：先要求持久化与查询两个服务都在，再观察该 id 的存储日志并复核可接管性，然后 `resume` 并在拿到写租约后**再复核一次**，因为观察只是快照、期间别的写入者可能已经追加；id 不存在时报错而不是创建一个同名空历史[@ref-deepseek-harness-lt-headless-resume-adoption] [@ref-deepseek-harness-lt-headless-resume-requirements]。

**分支与子代理**都走同一条创建路径。fork 通过 `seed` 加确切 `inheritedEventCount` 与 `meta.isSeeded: true` 建立，继承前缀的确切长度写在子会话自己日志末尾的 `session/end-seed` 标记上[@ref-deepseek-harness-lt-create-session-meta]。子代理子会话是一个**独立的持久子会话**，有自己的会话目录、自己的头（`parentSession` 指向父会话、`origin: 'subagent'`、`delegationDepth` 比父会话多一）[@ref-deepseek-harness-lt-delegation-depth-durable]；子会话的可续跑性来自持久化的 `delegationDepth` 与子代理描述符，而不是目录层级。

**上下文压缩之后日志是延续的**：压缩把 `compaction/start`、`compaction/summary`、`compaction/end` 作为 log-only 事件追加进同一条日志，摘要本身则骑在一条带 `surfaceOp: { op: 'replace', startSeq, endSeq }` 的 `user/message` 上替换一段既有 surface 节点。被遮蔽的原事件行仍留在日志里——被替换的是「送给模型的 surface」，不是磁盘上的记录[@ref-deepseek-harness-lt-compaction-logonly-events]。这也是为什么恢复一段长会话不需要区分「压缩过的会话」和「没压缩过的会话」。

## 数据库、索引与派生状态的分工 {#transcripts-index-and-derived-state}

**会话正文不在数据库里。** 正文是上面那个 JSONL 文件；系统里出现的 SQLite 都是派生件或与正文无关的 KV。派生检索索引由 `@deepseek-ai/dsh-session-query-sqlite` 提供：出厂 base 行把它**保持挂载但 `openAt: never`**——精确读取、标题与血缘追踪仍然可用，全文搜索调用会以 `SESSION_QUERY_SEARCH_DISABLED` 失败，SQLite 根本不会被打开，Web 侧边栏只匹配标题与工作区名；要开启内容搜索的部署要在更靠后的 patch 层把 `openAt` 覆盖成 `first-search` 或 `startup`，并通常给一个持久 `path`[@ref-deepseek-harness-lt-base-search-index-row]。web bundle 原样复述了同一组临时值（`:memory:` 加 `never`）[@ref-deepseek-harness-lt-web-search-index-row]。该后端的 `path` 是**专用派生索引路径或 `:memory:`**，`openAt` 三档分别是启动打开、首次搜索时延迟打开、永不打开，`journalMode` 默认 `wal`；文档明确要求不要把 `path` 指向会话持久化用的介质，因为它是另一个派生库[@ref-deepseek-harness-lt-sqlite-index-config]。

会话记录之外的持久 KV 走另一条栈：storage hub、json backend 与 domain form，`storage-json` 的 `root` 是 `dshHomePath('storages')`，`storage-domain` 选 `backend: json`[@ref-deepseek-harness-lt-base-storage-rows]。**工作区注册、归档集合与置顶集合就是这一条栈上的一个 domain**：domain 名 `workspace`、版本 2、状态里有 `archivedSessionIds` 与 `pinnedSessionIds` 两个数组[@ref-deepseek-harness-lt-workspace-domain-spec] [@ref-deepseek-harness-lt-workspace-domain-state]。json backend 的默认 `single` 布局把整个单元写成一个 `UNIT.json` 文件，所以出厂组合下这个 domain 的状态是 `$DSH_HOME/storages/workspace.json` 这样一个文件。会话列表用到的投影检查点也在这条栈上，`session-projection-cache` 是 per-record 布局，每个会话一个带版本戳的检查点文档，写回被节流[@ref-deepseek-harness-lt-base-projection-cache-row]。

分工因此可以一句话说清：**恢复一个会话只需要它自己的当前代日志文件（含头行）**；索引、投影检查点与 workspace 状态都是可从日志与用户操作重建的派生或旁路状态。轻量观察走 `stat`/`list`，它们返回头、不透明的 `revision` 变更令牌，以及后端能廉价给出的 `eventCount` 与物理字节数 `sizeBytes`——不必读事件正文[@ref-deepseek-harness-lt-persistence-snapshot-fields]。反过来要记住一条反向依赖：**归档与置顶集合不在日志里**，它们只存在于 workspace domain 的状态文件；把那个文件删掉，隐藏过的会话不会因为日志还在而自动恢复原状。

## 原生归档与导出：Web 与 Desktop 才有 {#transcripts-archive-and-export}

「归档」在这个产品里有两个完全不同的东西，必须分开。

**（一）原生归档开关 = 隐藏，不是搬走文件。** 工作区注册表提供一个**全局持久集合**：`archiveSession(sessionId)` 先要求会话存在，然后（默认）询问 `workspace/session-activity` 瀑布流，只要还有运行中的工作就以 `WorkspaceActiveSessionError` 拒绝且不写任何东西；传 `stopActivity` 则跳过检查、先写归档、再让各 provider 停止该会话的工作——`workspace/session-stop` 走的是与用户自己点停止相同的取消路径，所以会话日志会**正常结束**每一个未闭合的 turn，之后解除归档可以继续对话。归档在同一次持久写里顺带丢掉该会话的置顶（置顶与归档互斥），已归档的 id 再次调用不写、不问、不停[@ref-deepseek-harness-lt-archive-session-contract] [@ref-deepseek-harness-lt-archive-drops-pin]。它**不移动、不复制、不删除**任何日志文件，恢复后日志仍在原路径原位置，对话可继续——损失的是「可见性」而不是信息。这个注册表是 **web 层的能力**（`@deepseek-ai/dsh-workspace` 是 web bundle 的一行）[@ref-deepseek-harness-lt-web-workspace-row]。

**（二）导出 = 浏览器下载的 ZIP。** `@deepseek-ai/dsh-session-log-export` 同样是 web 层挂载的一行，提供 `/export` 斜杠命令与会话头菜单里的下载项[@ref-deepseek-harness-lt-web-export-row]。它的命令契约写得很清楚：`/export` 由提交它的那个浏览器下载 `api/session.export?sessionId=SESSION_ID&includeDescendants=true`，`/export PATH` 是错误——**下载目的地由浏览器决定，宿主不写任何路径**[@ref-deepseek-harness-lt-export-command-contract]。归档内容不是原始字节的打包，而是**从持久化读句柄重新序列化**的规范 JSONL：一个头行加每事件一行，所以任何后端导出的结果一致；根日志用当前代的规范文件名 `session[.vN].jsonl`，每个子代理后继用 `subagents/SUB_ID/session[.vN].jsonl`，被引用的图片在 `media/ATTACHMENT_ID.EXT`（内容寻址，一个归档不会重复同一张图），通用文件在 `files/PREFIX/DIGEST/NAME`，并且**不写清单**；读活会话前宿主先过一遍 flush 屏障，冷会话不需要[@ref-deepseek-harness-lt-export-archive-log-names] [@ref-deepseek-harness-lt-export-archive-payloads]。下载文件名是 `dsh-session-SESSION_ID.zip`[@ref-deepseek-harness-lt-export-zip-filename]。

因此在 `web` 与 `desktop` 上，**归档的损失为零、导出的损失是物理表示**：ZIP 里的日志是纯 JSONL，原始的 Zstandard 分帧、每批 fsync 边界、inode 与 mtime 都不在归档里；ZIP 里的路径是归档内相对路径，宿主上的绝对 `root` 也不在里面。想在新机器上用原生方式继续这个会话，需要把内容写回符合当前编码的 根目录下的 `项目目录/会话目录/session.vN.jsonl`，而不是把 ZIP 解压到 `~/.dsh/sessions` 就能被读到。

**其余四个界面的边界**：`headless`、`acp`、`sdk` 与 `sdk-minimal` 的 bundle patch 里没有工作区注册表行，也没有导出行——两处能力都出现在 web bundle 的 patch 里[@ref-deepseek-harness-lt-web-workspace-row] [@ref-deepseek-harness-lt-web-export-row]，而这些界面共享同一个 `dsh-base` 层。已查入口是 `packages/bundle/*/cordis.patch.yml` 与各 bundle 的 README/源码；**剩余缺口**是本轮没有逐一枚举这些 profile 之外的第三方 bundle 或用户 patch，所以「用户自行挂载导出包」这种可能性没有被排除。给它们的结论因此是 `partial` 而不是 `not_applicable`。

## 删除、保留与手动清理的后果 {#transcripts-cleanup}

**官方没有删除会话日志的机制。** JSONL provider 的限制条目写得毫不含糊：没有任何东西删除会话文件，日志在根目录下累积直到被外部移除，这条缝没有删除 API[@ref-deepseek-harness-lt-no-deletion-api]。相邻的一条容易误读的机制是工作区注册表的 `delete(id)`：它删除登记、顺序项与会话账目，**保留目录与每一个会话日志**，那些会话变成未分组——所以「在 UI 里删掉一个项目」不是删日志[@ref-deepseek-harness-lt-workspace-delete-keeps-logs]。附件同样明确：存储的图片**永不自动删除**[@ref-deepseek-harness-lt-attachment-store-path]。这三句合起来意味着磁盘占用只由用户自己回收。

**删除前必须停掉的写入者**由写租约定义。跨进程写所有权是内核仲裁：POSIX 上是会话目录旁 `session.lock` 上的非阻塞 `flock(2)`，Windows 上是由该路径派生的命名内核信号量（不是文件锁也不是句柄，所以读、搜索与目录删除在持锁期间照常进行）；争用映射为 `SessionAlreadyOwnedError`，内核在持有者描述符或最后一个对象句柄关闭时释放锁，包括任何进程死亡——所以**崩溃的持有者不会挡住后继，活着但卡住的持有者会一直挡到进程退出**（刻意没有过期，以免夺走一个恢复后仍会追加的写者的所有权）[@ref-deepseek-harness-lt-write-lease-posix]。锁的获取时机是既有产物写打开时，对新建会话则只在首次落盘写入之前，因此从未物化的会话没有文件系统足迹；**释放从不删除锁文件**，因为每个获取过的锁都对应一个已物化或正在物化的会话，存活文件保持后续加锁者要校验的稳定 inode[@ref-deepseek-harness-lt-lease-lifetime]。由此得出一条具体的操作规则：在 POSIX 上删除一个活着的会话锁文件等于**放弃互斥**，harness 自身不做这件事；要安全删日志，先确认没有进程持有该会话的写句柄。

手动删文件的后果分三种。删**历史代次**文件最安全：运行时只选数值最高的规范代次，删掉更旧的代次不改变当前可读内容[@ref-deepseek-harness-lt-layout-selection-rule]。删**当前代**文件等于丢弃该会话的正文——没有级联、没有回收站、没有重建路径；会话列表是从持久化的头重建的，所以它会从列表里消失，工作区归属也会退回未分组。删**整个会话目录**还会带走同目录下的 `session.lock`，若原持有者还活着，互斥随之失效。**孤儿记录的方向是双向的**：留下附件而删掉日志会浪费空间但不影响任何读取；留下日志而删掉附件根则让历史中的内容寻址引用指向读不到的数据。

**为什么这一题只给 `partial`**：已固定的是「无删除 API」「工作区删除不碰日志」「附件不自动删除」「锁的获取与释放时机、崩溃与卡死两种阻塞情形、删除锁文件的后果」「历史代次可删而当前代不可删」。**未固定**的是删除之后各类派生件的刷新语义——搜索索引、投影检查点与 workspace 状态里会留下悬空条目还是被重建，本轮在 JSONL provider、`session-query` 与 storage domain 的固定来源里都没有找到明确说明，因此不给结论，也不写成「可以安全删除」。

## 定位、读取、完整性检查与排错 {#transcripts-diagnostics}

**先自己把路径算出来。** 项目目录名由 cwd 归一化而来（分隔符折 `-`、不安全码元转义、截到 251 字符）[@ref-deepseek-harness-lt-project-key]，会话目录名是会话 id 的单段转义结果[@ref-deepseek-harness-lt-encode-segment]，文件名按代次与编码决定。这三条规则合起来足以在磁盘上定位任何会话，不必依赖工具。**再决定怎么读**：`compression: 'none'` 的根是换行分隔 UTF-8 文本，外部工具可直接逐行读；默认的 `'zstd'` 编码**不能**直接按行读，必须经后端打开[@ref-deepseek-harness-lt-jsonl-config-fields]。

**格式拒绝会把路径告诉你。** 后端拒绝一个无法忠实解释的日志时抛 `SessionFormatUnsupportedError`，并把选中的原始日志绝对路径追加到消息里，让用户能找到被拒的那份原始记录；`SessionLocation` 就是为此存在的诊断载体，带后端种类（JSONL 给出项目/会话目录内的绝对 transcript 路径）与绝对路径，它**不是面向消费者的查询接口**——取日志内容仍然只能走句柄的 `read`[@ref-deepseek-harness-lt-session-location-prose] [@ref-deepseek-harness-lt-session-location-type]。

**完整性与状态检查有三条可用信号**。第一，读取端永不返回撕裂的物理尾部，且只校验当前格式记录、对未知词汇失败关闭，所以「能完整读出一段连续前缀」本身就是完整性判据[@ref-deepseek-harness-lt-storage-semantics-contract]。第二，撕裂尾部被丢弃时后端会打一条告警，说明该会话从撕裂尾部恢复、不完整字节已被丢弃——这是排查异常截断的直接线索[@ref-deepseek-harness-lt-truncate-torn-tail-api]。第三，`stat`/`list` 给出不透明的 `revision` 变更令牌：相同 revision 可当作日志未变，不相同 revision 不承诺任何事，写所有权变动不改它；派生读模型用它做缓存键，但它不参与 open、read 与 resume[@ref-deepseek-harness-lt-revision-token]，快照里的 `eventCount` 与 `sizeBytes` 是后端能廉价给出的补充观察[@ref-deepseek-harness-lt-persistence-snapshot-fields]。

**版本落后时的官方动作**是维护者脚本：`pnpm run migrate:sessions-to-v4 [--sessions-dir PATH] [--jobs N]`，默认作用于 `~/.dsh/sessions`，在历史代次旁发布 V4 后继且不改动源文件，不使用模型或 API key，单个会话失败不阻断其余会话，文本日志与最终 JSON 汇总写到私有临时目录[@ref-deepseek-harness-lt-migrate-usage]。

**为什么这一题只给 `partial`**：已查入口包括 `apps/cli/src`（参数与启动诊断）、`packages/interaction/commands`（斜杠命令运行时）、`packages/api/session-controller`（会话列表与导出路由）、`packages/session-query/*` 与 JSONL provider 的 README 与源码。**剩余缺口有两处**：本轮**没有找到**面向用户的「列出/检查会话日志」子命令——已查的 CLI 入口只有启动器 flag 与斜杠命令注册，没有会话日志列举动词；以及 `docs/subsystems/persistence.md` 中关于历史代次 `stat`/`list` 修订号需按根内会话数做元数据工作、以及 NFSv3 上 `flock` 不可靠这两条限制，其原文所在段落长度超出本项目单条摘录的字符上限，本轮未取到可引用的行区间，因此这两点在本章不作断言。缺少这些入口**不等于**可以安全手工删除文件。
