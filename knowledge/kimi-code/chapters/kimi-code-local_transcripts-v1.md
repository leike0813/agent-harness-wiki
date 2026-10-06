---
schema_version: 3
record_kind: production
edition_id: kimi-code-local_transcripts-v1
harness_id: kimi-code
topic: local_transcripts
title: "Kimi Code CLI 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-doc-session-data, ref-kimi-code-lt-doc-session-storage, ref-kimi-code-lt-doc-log-scopes, ref-kimi-code-lt-doc-user-history, ref-kimi-code-lt-src-wire-types, ref-kimi-code-lt-doc-clearing-data, ref-kimi-code-lt-doc-session-tasks]
  - section_id: transcripts-layout-naming
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-doc-data-root, ref-kimi-code-lt-doc-layout-index, ref-kimi-code-lt-src-addressing, ref-kimi-code-lt-src-workdir-slug, ref-kimi-code-lt-doc-session-data, ref-kimi-code-lt-src-blob-ref, ref-kimi-code-lt-src-blob-ref-format, ref-kimi-code-lt-src-session-meta, ref-kimi-code-lt-src-fork-meta]
  - section_id: transcripts-format-schema
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-src-wire-record, ref-kimi-code-lt-src-append-fsync, ref-kimi-code-lt-src-atomic-write, ref-kimi-code-lt-src-wire-version, ref-kimi-code-lt-src-wire-types, ref-kimi-code-lt-src-session-meta, ref-kimi-code-lt-doc-session-data, ref-kimi-code-lt-src-atomic-tmp-rename, ref-kimi-code-lt-src-wire-migration-missing]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-doc-resume, ref-kimi-code-lt-doc-compaction, ref-kimi-code-lt-doc-fork, ref-kimi-code-lt-src-fork-meta, ref-kimi-code-lt-src-copy-skip, ref-kimi-code-lt-src-append-fsync]
  - section_id: transcripts-database-index
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-src-index-scan, ref-kimi-code-lt-src-index-meta-keys, ref-kimi-code-lt-src-minidb-dir, ref-kimi-code-lt-src-db-switch, ref-kimi-code-lt-doc-layout-index]
  - section_id: transcripts-archive-cleanup
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-src-archive-flag, ref-kimi-code-lt-src-restore-flag, ref-kimi-code-lt-doc-export, ref-kimi-code-lt-src-export-manifest, ref-kimi-code-lt-src-delete, ref-kimi-code-lt-doc-clearing-data, ref-kimi-code-lt-doc-session-storage]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kimi-code-lt-src-wire-repair, ref-kimi-code-lt-src-wire-repair-rewrite, ref-kimi-code-lt-doc-export, ref-kimi-code-lt-doc-session-storage, ref-kimi-code-lt-src-minidb-dir, ref-kimi-code-lt-src-torn-read, ref-kimi-code-lt-src-torn-read-loop, ref-kimi-code-lt-doc-export-sensitivity]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: answered
        source_refs: [ref-kimi-code-lt-doc-session-data, ref-kimi-code-lt-doc-session-storage, ref-kimi-code-lt-doc-log-scopes, ref-kimi-code-lt-doc-user-history, ref-kimi-code-lt-src-wire-types, ref-kimi-code-lt-doc-clearing-data, ref-kimi-code-lt-doc-session-tasks]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout-naming
        status: answered
        source_refs: [ref-kimi-code-lt-doc-data-root, ref-kimi-code-lt-doc-layout-index, ref-kimi-code-lt-src-addressing, ref-kimi-code-lt-src-blob-ref, ref-kimi-code-lt-src-blob-ref-format]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout-naming
        status: answered
        source_refs: [ref-kimi-code-lt-src-addressing, ref-kimi-code-lt-src-workdir-slug, ref-kimi-code-lt-src-session-meta, ref-kimi-code-lt-src-fork-meta, ref-kimi-code-lt-doc-layout-index]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-schema
        status: answered
        source_refs: [ref-kimi-code-lt-src-wire-record, ref-kimi-code-lt-src-append-fsync, ref-kimi-code-lt-src-atomic-write, ref-kimi-code-lt-doc-session-data, ref-kimi-code-lt-src-atomic-tmp-rename]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-schema
        status: partial
        source_refs: [ref-kimi-code-lt-src-wire-record, ref-kimi-code-lt-src-wire-version, ref-kimi-code-lt-src-wire-types, ref-kimi-code-lt-src-session-meta, ref-kimi-code-lt-src-wire-migration-missing]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-kimi-code-lt-doc-resume, ref-kimi-code-lt-doc-compaction, ref-kimi-code-lt-doc-fork, ref-kimi-code-lt-src-fork-meta, ref-kimi-code-lt-src-copy-skip, ref-kimi-code-lt-src-append-fsync]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-index
        status: answered
        source_refs: [ref-kimi-code-lt-src-index-scan, ref-kimi-code-lt-src-index-meta-keys, ref-kimi-code-lt-src-minidb-dir, ref-kimi-code-lt-src-db-switch, ref-kimi-code-lt-doc-layout-index]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup
        status: partial
        source_refs: [ref-kimi-code-lt-src-archive-flag, ref-kimi-code-lt-src-restore-flag, ref-kimi-code-lt-doc-export, ref-kimi-code-lt-src-export-manifest]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup
        status: answered
        source_refs: [ref-kimi-code-lt-src-delete, ref-kimi-code-lt-doc-clearing-data, ref-kimi-code-lt-doc-session-storage]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-kimi-code-lt-src-wire-repair, ref-kimi-code-lt-src-wire-repair-rewrite, ref-kimi-code-lt-doc-export, ref-kimi-code-lt-src-minidb-dir, ref-kimi-code-lt-src-torn-read, ref-kimi-code-lt-src-torn-read-loop, ref-kimi-code-lt-doc-export-sensitivity]
---

Kimi Code CLI 把每次对话持久化为一个「会话」：会话正文是一份逐行追加的 Agent 事件流，会话元数据是一份原子改写的 JSON，两者加上一个可重建的查询索引，构成本主题关注的全部落盘内容 [@ref-kimi-code-lt-doc-session-storage] [@ref-kimi-code-lt-doc-layout-index]。官方明确要求不要手工编辑 `sessions/` 下的文件，并说明这样可能导致会话无法正确恢复 [@ref-kimi-code-lt-doc-session-storage]。

本轮固定来源为 `docs/en/configuration/data-locations.md`、`docs/en/guides/sessions.md` 与 `packages/agent-core-v2` 中的持久化、会话生命周期、wire 与索引模块，全部固定在源码提交 `21406fb4c805cc8c715e6d1f16ad3fb5f25f4fe3`（`source-kimi-code-repo`，快照时间 2026-10-06T04:34:12.300Z，界面 `cli`，源码树 distribution，平台限定 Linux x64）。这两份文档位于同一提交内的仓库 `docs/` 目录，是该提交自带的文档快照；项目 `archive/kimi-code/` 下本轮没有对应的归档原件，因此本章节全部使用 `git_source_file` 证据，没有新建 `archived_document` 记录。

适用性说明：所引来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`），不证明任何特定已发布 npm 版本的行为。源码提交只代表源码树，`2.1.1` 发行包的实际落盘行为未做逐小节核对，本轮不写 `mappings/`。`catalog/harnesses.yaml` 只为 kimi-code 登记了 `cli` 一个界面，本章所有结论都限定在 CLI 形态；不外推到 IDE、桌面、Web 或 SDK 形态。

## 记录了什么，哪些东西单独存放 {#transcripts-recording-scope}

会话正文按 Agent 拆分落盘：主 Agent 写在 `agents/main/wire.jsonl`，每个子 Agent 有自己的 `agents/{agentId}/wire.jsonl`；官方说明这份 `wire.jsonl` 是「Agent 事件流」，除会话恢复与重放外还携带一份请求轨迹——发往模型的工具 schema、请求参数与 MCP 工具清单，用于调试 [@ref-kimi-code-lt-doc-session-data] [@ref-kimi-code-lt-doc-session-storage]。也就是说，记录不只有「对话」，也包含一次请求的形状信息；把它当作纯聊天记录会低估其内容面。

`state.json` 记录会话元数据（标题、创建与更新时间、`lastPrompt`、`forkedFrom`），`agents/main/plans/` 存放 Plan 模式写出的计划文件，`logs/kimi-code.log` 是本会话级诊断日志，仅在产生诊断事件时存在 [@ref-kimi-code-lt-doc-session-data]。`tasks/` 与 `cron/` 同样在会话目录内：`tasks/{task_id}.json` 存状态、pid 与退出码，`tasks/{task_id}/output.log` 存输出；`cron/` 承载定时任务，恢复会话时由 `kimi --session` 重新载入调度器 [@ref-kimi-code-lt-doc-session-tasks]。第一方 wire 记录里被消费的记录类型在源码中被显式枚举，包括 `context.append_message`、`context.append_loop_event`、`context.apply_compaction`、`context.clear`、`context.undo`、`turn.prompt`、`turn.cancel`、`turn.ended`、`llm.request` 与 `tools.update_store` [@ref-kimi-code-lt-src-wire-types]。

与「会话记录」并存但语义不同的产物，官方分开管理：全局诊断日志 `logs/kimi-code.log` 记录启动、登录、导出等跨会话事件，而 `{sessionDir}/logs/kimi-code.log` 只记录单个会话内的诊断事件 [@ref-kimi-code-lt-doc-log-scopes]；终端输入历史按工作目录单独存为 `user-history/{md5(workDir)}.jsonl`，只用于方向键回看曾输入的提示词，不属于会话记录 [@ref-kimi-code-lt-doc-user-history]。清理表把这几类分开列出，删除 `sessions/` 不会顺带删除输入历史或全局日志 [@ref-kimi-code-lt-doc-clearing-data]。

关于「哪些内容不落盘」与「记录开关」：本轮固定来源没有给出关闭会话记录的配置项。`wire.jsonl` 的写入是无条件的追加路径，会话创建、恢复与分叉都依赖它 [@ref-kimi-code-lt-doc-session-data]。可切换的只有派生读模型（下节），不是正文记录本身；这一缺口在 `transcripts.schema` 与 `transcripts.diagnostics` 的答案中继续标注。

## 位置、目录命名与项目作用域 {#transcripts-layout-naming}

数据根默认为 `~/.kimi-code/`，官方按平台列出 macOS `/Users/{name}/.kimi-code`、Linux `/home/{name}/.kimi-code`、Windows `C:\Users\{name}\.kimi-code`；设置 `KIMI_CODE_HOME` 后，配置、会话、日志、OAuth 凭据等**全部** Kimi Code 数据都落到新路径下 [@ref-kimi-code-lt-doc-data-root]。这是搬迁与隔离不同项目环境的唯一官方入口。通用 `.agents` 资源（跨工具共享）仍留在真实 OS home 下，不随 `KIMI_CODE_HOME` 移动。

顶层布局中与本主题相关的两项是 `session_index.jsonl`（会话索引）与 `sessions/{workDirKey}/{sessionId}/`（会话数据） [@ref-kimi-code-lt-doc-layout-index]。作用域在源码中由三段拼接固定：`sessions` scope 之下挂 `workspaceId`，其下是 `sessionId`，会话内再按 `agents/{agentId}` 分目录 [@ref-kimi-code-lt-src-addressing]。

`workDirKey` 是把工作目录路径编码后的桶名，格式为 `wd_{slug}_{normalized path 的 sha256 前 12 位}`：先对路径做 `\`→`/` 与去尾斜杠的归一化，取最后一段作为名字 slug（小写化、非 `[a-z0-9._-]` 折成 `-`、最长 40 字符，空或 `.`/`..` 退化为 `workspace`），再拼上归一化路径的 12 位十六进制摘要 [@ref-kimi-code-lt-src-workdir-slug]。这一编码同时承担两件事：桶名可读（能看到项目目录名），且不同项目即使同名也不碰撞。相应地，会话按工作目录分组——切换到另一个项目目录即落入另一个 `workDirKey`。

会话 ID 由 `session_${randomUUID()}` 生成，因此是带前缀的随机 UUID，而非从标题或时间戳派生 [@ref-kimi-code-lt-src-fork-meta]。会话与子 Agent、分支的关联分三层：

| 关系 | 表达方式 |
| --- | --- |
| 会话 ↔ 子 Agent 实例 | 目录层级 `agents/{agentId}/`，每个实例一份 `wire.jsonl` |
| Agent ↔ 父 Agent | `state.json` 的 `agents` 映射中 `AgentMeta.type`（`main`/`sub`/`independent`）与 `parentAgentId` |
| 会话 ↔ 分叉来源 | `state.json` 的 `forkedFrom`；分叉时写入新会话自己的 `state.json` [@ref-kimi-code-lt-src-fork-meta] |

时间戳不是文件名的一部分：`createdAt`、`updatedAt`、`archivedAt` 都以毫秒时间戳存在 `state.json` 里 [@ref-kimi-code-lt-src-session-meta]。

正文之外的大块二进制不进 `wire.jsonl`。超过阈值的 base64 媒体部分被卸到 blob 存储，wire 里只留一个 `blobref:` 引用，形如 `{protocol}{mimeType};{hash}`，其中协议前缀常量与 sha256 摘要都直接出现在写入路径上 [@ref-kimi-code-lt-src-blob-ref] [@ref-kimi-code-lt-src-blob-ref-format]。按作用域拼接，blob 落在会话之下而非数据根的独立 `blobs/` 目录中。恢复一条含媒体的记录需要同时能读到这个 blob，只复制 `wire.jsonl` 会得到 `[media missing]` 占位而非原图。

## 格式、写入语义与记录 schema {#transcripts-format-schema}

正文是 JSONL，文件名常量就是 `wire.jsonl` [@ref-kimi-code-lt-src-wire-record]。写入是**追加**：底层存储以 `'a'` 模式打开文件，写入后立即 `fsync`，并对所在目录做一次目录同步以固化新建文件 [@ref-kimi-code-lt-src-append-fsync]。这解释了官方所说的事件流「append-only」语义，也意味着单条记录损坏只影响该行之后的内容。元数据 `state.json` 走的是**原子改写**：先写同目录的临时文件，对文件描述符 fsync，再 rename 就位 [@ref-kimi-code-lt-src-atomic-write] [@ref-kimi-code-lt-src-atomic-tmp-rename]。两种语义相反——正文只追加不覆盖，元数据整体替换不留历史，混用是理解恢复行为的关键。

正文记录的信封极简：只有 `type: string`、可选 `time?: number` 加一个开放键值表，没有强制字段 [@ref-kimi-code-lt-src-wire-record]。会话创建时在文件首位写入一条 `metadata` 头记录，携带 `protocol_version` 与 `created_at` [@ref-kimi-code-lt-src-wire-record]。因此**不带 `type` 的行不是合法记录**，读取方按 `type` 字符串分派。源码中被消费的记录类型集合是显式枚举的：`context.append_message`、`context.append_loop_event`、`context.apply_compaction`、`context.clear`、`context.undo`、`turn.prompt`、`turn.cancel`、`turn.ended`、`llm.request`、`tools.update_store` [@ref-kimi-code-lt-src-wire-types]。

版本迁移是显式的、逐记录执行的：当前协议版本常量为 `1.5`，迁移链为 `1.0→1.1→1.2→1.3→1.4→1.5`；读到更低版本时按链逐条改写记录，读到更高版本则直接判定为更新而不做降级 [@ref-kimi-code-lt-src-wire-version]。链中若缺任一环节，解析过程会抛 `WIRE_MIGRATION_MISSING` 并带上缺失版本号，而不是猜测或跳过该条记录 [@ref-kimi-code-lt-src-wire-migration-missing]。

一个脱敏的最小完整正文样本（占位值，仅示意形状）：

```json
{"type":"metadata","protocol_version":"1.5","created_at":0}
{"type":"context.append_message","agentId":"main","time":0,"message":{"role":"user","content":[{"type":"text","text":"{user prompt placeholder}"}]}}
{"type":"context.append_loop_event","agentId":"main","time":0,"event":{"type":"step.begin","uuid":"{uuid}","turnId":"0"}}
{"type":"context.append_loop_event","agentId":"main","time":0,"event":{"type":"content.part","stepUuid":"{uuid}","part":{"type":"text","text":"{assistant text placeholder}"}}}
{"type":"context.apply_compaction","agentId":"main","time":0,"summary":"{compaction summary placeholder}","compactedCount":2}
```

`state.json` 的元数据 schema 为 `SessionMeta`：`id`、`createdAt`、`updatedAt`、`archived` 为必填，其余（`version`、`title`、`titleKind`、`lastPrompt`、`archivedAt`、`cwd`、`forkedFrom`、`agents`、`custom`、`lastTurnReason`）可选，元数据版本常量为 `2` [@ref-kimi-code-lt-src-session-meta]。

schema 缺口（照实列出，不推断）：`context.append_loop_event` 的 `event` 联合类型在本轮未纳入引用的源码片段，其 `step.begin`/`content.part`/`tool.call`/`tool.result`/`step.end` 各变体的完整必填字段集因此未在固定来源中逐项固定；`llm.request`、`tools.update_store`、`turn.*` 记录的实际字段同样未在已引用片段中展开。此外，官方文档只描述 `state.json` 包含「标题、创建时间」等概览字段，未给出完整字段表，本章的字段结论来自源码而非文档 [@ref-kimi-code-lt-doc-session-data]。

## 创建、追加、恢复、分支与压缩后延续 {#transcripts-lifecycle}

**创建**：直接运行 `kimi` 每次都新建会话；`--continue` 恢复当前目录最近一次会话，`--session {id}` 恢复指定会话，`--session` 不带参数则交互式浏览，二者互斥 [@ref-kimi-code-lt-doc-resume]。TUI 内的 `/new`、`/sessions`、`/fork`、`/title` 只在 Agent 空闲时可用。

**追加与刷盘**：wire 记录通过追加日志接口顺序写入，每次追加自带 `fsync`；会话关闭时按序 drain 掉 Agent、追加日志退休队列、元数据写入与索引镜像后才算落定 [@ref-kimi-code-lt-src-append-fsync]。因此「进程退出即丢最后一段」的风险由 fsync 覆盖，但索引与元数据的落盘是关闭流程的一部分，而非每条记录都同步。

**分叉**：`/fork` 不切走当前会话，副本可随时用 `/sessions` 切回；官方说明 fork 不复制已保存的 `/goal` [@ref-kimi-code-lt-doc-fork]。实现侧的分叉对新会话写一份新的 `state.json`，`forkedFrom` 指向源会话，`titleKind` 在显式给标题时记为 `custom` [@ref-kimi-code-lt-src-fork-meta]。复制文件时 `state.json`、`logs`、`upcoming-goals.json` 被显式跳过（各自重建或丢弃），并跳过符号链接 [@ref-kimi-code-lt-src-copy-skip]——这解释了为什么 fork 出的会话不继承源会话日志。

**交给子 Agent**：子 Agent 走 `agents/{agentId}/` 下的独立 `wire.jsonl`，`state.json` 的 `agents` 映射登记 `parentAgentId` 与 `type: 'sub'` [@ref-kimi-code-lt-doc-session-data] [@ref-kimi-code-lt-src-session-meta]。父会话的日志只承载 Agent 工具调用与子 Agent 返回的结果，子 Agent 自身步骤在自己的文件里。

**压缩后延续**：接近上下文上限时 CLI 自动压缩消息历史，`/compact` 可手动触发并附带提示（例如 `/compact Keep the discussion about database migrations`）[@ref-kimi-code-lt-doc-compaction]。压缩不截断 `wire.jsonl`：旧行仍留在文件里，压缩点由 `context.apply_compaction` 记录标出 [@ref-kimi-code-lt-src-wire-types]。所以压缩是「在追加流里插入一个边界记录」，不是「重写并丢弃历史」，恢复时可据此定位压缩前后。

## 数据库与索引的分工 {#transcripts-database-index}

正文不存数据库。数据库承载的是**会话索引的读模型**，且它是可重建的派生物：索引用 `listWorkspaceIds` 列 `sessions/` 下的桶、用 `listSessionIds` 列桶内会话、再逐个读取元数据还原摘要 [@ref-kimi-code-lt-src-index-scan]。读的是 `state.json`（源码里键名常量为 `META_KEY`，同时兼容旧的 `{session-meta}/state.json` 位置），并按 `mtimeMs` 与 `size` 维护一份 `.index-cache` 扫描缓存以跳过未变动的会话 [@ref-kimi-code-lt-src-index-meta-keys]。也就是说，索引的内容完全可从会话目录重新扫描得到。

索引存储位于 `join(bootstrap.cacheDir, 'query-store')` [@ref-kimi-code-lt-src-minidb-dir]。`cacheDir` 在 bootstrap 中是 `cache/` 子目录，与 `sessions/`、`blobs/`、`store/`、`logs/` 并列 [@ref-kimi-code-lt-doc-layout-index]。它落在 cache 而不是 sessions 下，本身就表明这是可丢弃的派生层；读取失败时实现会整体 wipe 后重建。

是否启用由配置节 `database.base` 控制，默认 `true`，并可用环境变量 `KIMI_CODE_PERSISTENCE_MINIDB_READMODEL` 覆盖 [@ref-kimi-code-lt-src-db-switch]。

分工与恢复必需性：

| 组件 | 角色 | 恢复会话是否必需 | 能否重建 |
| --- | --- | --- | --- |
| `state.json` | 会话元数据、归档标记、Agent 登记 | 必需 | 否（元数据即真源） |
| `agents/*/wire.jsonl` | 会话与工具事件正文 | 必需 | 否 |
| blob 引用目标 | 会话内的媒体二进制 | 含媒体的记录必需 | 否 |
| `session_index.jsonl` | 会话发现与排序的日志 | 非必需 | 可由扫描重建 |
| `cache/query-store` | 索引读模型 | 非必需 | 可由投影重建 |

前两行是唯一不可再生的内容；后三行都可从它们重新导出。

## 归档、导出与删除 {#transcripts-archive-cleanup}

**原生归档是一个元数据标志，不搬动文件。** `archive()` 取出会话句柄的元数据服务、写入 `archived` 标志、drain Agent 与追加日志退休队列后关闭会话，全程没有文件移动或删除 [@ref-kimi-code-lt-src-archive-flag]。`restore()` 则是先 `resume()` 再把同一标志清回 `false` [@ref-kimi-code-lt-src-restore-flag]。这意味着归档后磁盘占用不变，原始路径不变，且归档与删除在文件层面完全不同——这也是「归档后仍在原处占空间」的原因。

**导出是打包，不是搬迁。** `kimi export {sessionId}` 产出 ZIP，包含会话目录下的全部文件（含诊断日志），默认还打包全局日志，`--no-include-global-log` 可排除；省略 sessionId 导出当前目录最近会话，`-o` 指定输出路径 [@ref-kimi-code-lt-doc-export]。导出清单记录 `sessionId`、`exportedAt`、`kimiCodeVersion`、`wireProtocolVersion`、`os`、`nodejsVersion`、首末活动时间、标题、工作目录与各日志路径 [@ref-kimi-code-lt-src-export-manifest]。

导出与归档的损失面不同：导出固定了 `wireProtocolVersion` 与宿主版本，可判定兼容性；但它不保证能直接被 CLI 就地恢复——官方文档只描述导出用于分享、归档与提交缺陷报告，未提供「把 ZIP 解压回数据根即可恢复」的说明 [@ref-kimi-code-lt-doc-export]。因此恢复时应把 ZIP 视为内容副本而非可回填的数据根快照。

**官方删除有完整的级联顺序。** `delete()` 先等待正在进行的 resume 结束、确认会话归属当前工作区、关闭活跃句柄，然后依次：删除整个会话目录、移除索引条目、清理文件历史会话、向 `session_index.jsonl` 追加一条 `{sessionId, deleted: true}` 墓碑记录并立即 flush [@ref-kimi-code-lt-src-delete]。先关句柄再删目录的顺序保证了不会删掉仍被写入者的文件；墓碑记录则让索引侧能感知这次删除。

**文档给出的手工清理表**与级联删除并存：清空所有会话需同时删除 `sessions/` 与 `session_index.jsonl`；输入历史、日志、凭据、插件各自独立删除 [@ref-kimi-code-lt-doc-clearing-data]。

手工删除的后果必须按官方警告对待：不要手工编辑 `sessions/` 下的文件，否则可能导致会话无法正确恢复 [@ref-kimi-code-lt-doc-session-storage]。据此，「删除 `sessions/` 但保留 `session_index.jsonl`」会留下指向已不存在目录的索引记录；「只删 `agents/*/wire.jsonl` 而保留 `state.json`」会留下有元数据、无正文的会话目录。二者都不是官方支持的清理形态——官方支持的是删整个会话目录并同时处理索引，或走 `delete()` 的完整级联。

删除前必须停止的写入者：任何持有该会话句柄的进程。`delete()` 会先 `close()` 活跃句柄，但同一工作区被两个进程同时打开时，手工删文件绕过了这一握手。本轮固定来源没有给出进程级互斥或「会话正在使用」的检测机制，这是剩余缺口。

## 定位、读取与排错 {#transcripts-diagnostics}

定位一个会话的落盘位置：先按工作目录算出 `workDirKey`（`wd_{slug}_{sha256 前 12 位}`），再取 `sessionId`（`session_{uuid}`），拼成 `sessions/{workDirKey}/{sessionId}/` [@ref-kimi-code-lt-src-workdir-slug] [@ref-kimi-code-lt-src-addressing]。会话清单另有一份 `session_index.jsonl`，每行含 `sessionId`、`sessionDir` 与 `workDir` [@ref-kimi-code-lt-doc-layout-index]。

读取 `wire.jsonl` 时的判定顺序：首行应为 `metadata` 记录，用它的 `protocol_version` 判断能否被当前版本处理；后续每行必须含 `type` 字符串；正文在 `context.append_message`（用户输入）与 `context.append_loop_event`（`event.type` 为 `step.begin`、`content.part`、`tool.call`、`tool.result`、`step.end`） [@ref-kimi-code-lt-src-wire-record] [@ref-kimi-code-lt-src-wire-types]。`llm.request`、`token_counting.measured`、`usage.record` 一类是记账记录，可跳过。

**完整性检查与自动修复。** 底层文件读取带撕裂重试：读到的字节数与 `stat` 报告的大小不一致时，按固定间隔等待后重读，最多重试三次（`TORN_READ_RETRIES = 3`，间隔 15 毫秒） [@ref-kimi-code-lt-src-torn-read] [@ref-kimi-code-lt-src-torn-read-loop]。若追加日志检测到尾部截断，会走修复路径：先把原文件内容原子写入 `wire.jsonl.bak`（键由 `wireJournalBackupKey` 在原键后加 `.bak` 得到），再按 `appendLog.rewrite()` 把日志重写为有效前缀 [@ref-kimi-code-lt-src-wire-repair] [@ref-kimi-code-lt-src-wire-repair-rewrite]。因此出现「尾部少了几行」时，应先查同目录下是否存在 `wire.jsonl.bak` 再判断是否丢数据。

**状态检查。** 索引读模型自身会暴露状态（`ready` / `preparing` / `degraded`），在读模型缺失或发布世代丢失时自动重建；存储位于 `cache/query-store`，不可恢复故障时整体 wipe 重建 [@ref-kimi-code-lt-src-minidb-dir]。所以索引异常时先确认 `cache/query-store` 可否直接删除重建——它不含唯一内容。

**为备份与排错导出。** 提交缺陷报告的官方路径是 `kimi export`，它会先 flush 活跃会话的元数据与会话日志再打包 [@ref-kimi-code-lt-doc-export]；官方同时提示导出文件可能包含代码、命令输出与文件路径等敏感内容，分享前需自行检查 [@ref-kimi-code-lt-doc-export-sensitivity]。

诊断缺口（照实列出）：本轮固定来源没有给出校验 `wire.jsonl` 完整性的独立校验命令（无 checksum、无行级校验和）；官方文档也未提供 `session_index.jsonl` 与会话目录不一致时的对账步骤。已查入口为 `packages/agent-core-v2/src/wire/repair.ts`、`app/sessionIndex/sessionIndexService.ts`、`persistence/backends/node-fs/fileStorageService.ts` 与两份官方文档，均未发现此类命令。已记录的诊断面仅为：撕裂读重试、尾部截断的 `.bak` 备份与前缀重写、索引读模型的 degraded 状态与自动重建。
