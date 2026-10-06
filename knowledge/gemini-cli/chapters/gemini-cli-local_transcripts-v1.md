---
schema_version: 3
record_kind: production
edition_id: gemini-cli-local_transcripts-v1
harness_id: gemini-cli
topic: local_transcripts
title: "Gemini CLI 本地会话记录：记录范围、落盘位置、格式与清理"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-scope-doc,
        ref-gemini-cli-lt-scope-base-record,
        ref-gemini-cli-lt-scope-message-extra,
        ref-gemini-cli-lt-scope-chats-dir,
        ref-gemini-cli-lt-scope-resumable,
      ]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-loc-runtime-dir,
        ref-gemini-cli-lt-loc-runtime-ensure,
        ref-gemini-cli-lt-loc-gemini-dir,
        ref-gemini-cli-lt-loc-global-temp,
        ref-gemini-cli-lt-loc-project-temp,
        ref-gemini-cli-lt-loc-init-registry,
        ref-gemini-cli-lt-loc-home-env,
        ref-gemini-cli-lt-loc-history-file,
        ref-gemini-cli-lt-loc-history-dir,
        ref-gemini-cli-lt-loc-checkpoints-dir,
        ref-gemini-cli-lt-diag-tool-outputs-a,
        ref-gemini-cli-lt-diag-tool-outputs-b,
        ref-gemini-cli-lt-scope-doc,
      ]
  - section_id: transcripts-naming-and-schema
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-naming-prefix,
        ref-gemini-cli-lt-naming-filename-a,
        ref-gemini-cli-lt-naming-filename-b,
        ref-gemini-cli-lt-naming-project-slug,
        ref-gemini-cli-lt-naming-ownership-marker,
        ref-gemini-cli-lt-naming-project-hash,
        ref-gemini-cli-lt-naming-session-id,
        ref-gemini-cli-lt-naming-shortid,
        ref-gemini-cli-lt-schema-conversation,
        ref-gemini-cli-lt-schema-patch-a,
        ref-gemini-cli-lt-schema-patch-b,
        ref-gemini-cli-lt-scope-base-record,
        ref-gemini-cli-lt-scope-message-extra,
      ]
  - section_id: transcripts-format-and-lifecycle
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-format-append,
        ref-gemini-cli-lt-format-rewrite-head,
        ref-gemini-cli-lt-format-rewrite-preserve,
        ref-gemini-cli-lt-format-rewrite-atomic,
        ref-gemini-cli-lt-format-load,
        ref-gemini-cli-lt-format-legacy,
        ref-gemini-cli-lt-life-rewind-a,
        ref-gemini-cli-lt-life-rewind-b,
        ref-gemini-cli-lt-life-history-sync-a,
        ref-gemini-cli-lt-life-history-sync-b,
        ref-gemini-cli-lt-life-sethistory,
        ref-gemini-cli-lt-life-compression,
        ref-gemini-cli-lt-life-selector-a,
        ref-gemini-cli-lt-life-selector-b,
        ref-gemini-cli-lt-life-import-a,
        ref-gemini-cli-lt-life-import-b,
      ]
  - section_id: transcripts-index-and-archive
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-db-list-a,
        ref-gemini-cli-lt-db-list-b,
        ref-gemini-cli-lt-db-list-c,
        ref-gemini-cli-lt-db-list-sessions-a,
        ref-gemini-cli-lt-db-list-sessions-b,
        ref-gemini-cli-lt-db-core-deps,
        ref-gemini-cli-lt-archive-export,
        ref-gemini-cli-lt-archive-checkpoint-path,
        ref-gemini-cli-lt-archive-checkpoint-save,
        ref-gemini-cli-lt-archive-checkpoint-doc-a,
        ref-gemini-cli-lt-archive-checkpoint-doc-b,
        ref-gemini-cli-lt-life-import-a,
      ]
  - section_id: transcripts-cleanup
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-clean-settings-a,
        ref-gemini-cli-lt-clean-settings-b,
        ref-gemini-cli-lt-clean-doc,
        ref-gemini-cli-lt-clean-entry-a,
        ref-gemini-cli-lt-clean-entry-b,
        ref-gemini-cli-lt-clean-identify-a,
        ref-gemini-cli-lt-clean-identify-b,
        ref-gemini-cli-lt-clean-identify-c,
        ref-gemini-cli-lt-clean-identify-d,
        ref-gemini-cli-lt-clean-delete-session-a,
        ref-gemini-cli-lt-clean-delete-session-b,
        ref-gemini-cli-lt-clean-artifacts-a,
        ref-gemini-cli-lt-clean-artifacts-b,
        ref-gemini-cli-lt-clean-artifacts-c,
        ref-gemini-cli-lt-clean-subagent-a,
        ref-gemini-cli-lt-clean-subagent-b,
        ref-gemini-cli-lt-clean-quit-delete,
        ref-gemini-cli-lt-clean-delete-doc,
      ]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      [
        ref-gemini-cli-lt-diag-doc-listing,
        ref-gemini-cli-lt-diag-resume-doc-a,
        ref-gemini-cli-lt-diag-resume-doc-b,
        ref-gemini-cli-lt-db-list-b,
        ref-gemini-cli-lt-db-list-c,
        ref-gemini-cli-lt-clean-identify-a,
        ref-gemini-cli-lt-format-load,
        ref-gemini-cli-lt-format-legacy,
        ref-gemini-cli-lt-loc-chats-list,
      ]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-scope-doc,
            ref-gemini-cli-lt-scope-base-record,
            ref-gemini-cli-lt-scope-message-extra,
            ref-gemini-cli-lt-scope-chats-dir,
            ref-gemini-cli-lt-scope-resumable,
          ]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-loc-runtime-dir,
            ref-gemini-cli-lt-loc-runtime-ensure,
            ref-gemini-cli-lt-loc-global-temp,
            ref-gemini-cli-lt-loc-project-temp,
            ref-gemini-cli-lt-loc-home-env,
            ref-gemini-cli-lt-loc-history-file,
            ref-gemini-cli-lt-loc-checkpoints-dir,
            ref-gemini-cli-lt-diag-tool-outputs-a,
            ref-gemini-cli-lt-scope-doc,
          ]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-naming-and-schema
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-naming-prefix,
            ref-gemini-cli-lt-naming-filename-a,
            ref-gemini-cli-lt-naming-filename-b,
            ref-gemini-cli-lt-naming-project-slug,
            ref-gemini-cli-lt-naming-project-hash,
            ref-gemini-cli-lt-naming-session-id,
            ref-gemini-cli-lt-naming-shortid,
          ]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-lifecycle
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-format-append,
            ref-gemini-cli-lt-format-rewrite-head,
            ref-gemini-cli-lt-format-rewrite-preserve,
            ref-gemini-cli-lt-format-rewrite-atomic,
            ref-gemini-cli-lt-format-load,
            ref-gemini-cli-lt-format-legacy,
          ]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-naming-and-schema
        status: partial
        source_refs:
          [
            ref-gemini-cli-lt-schema-conversation,
            ref-gemini-cli-lt-schema-patch-a,
            ref-gemini-cli-lt-schema-patch-b,
            ref-gemini-cli-lt-scope-base-record,
            ref-gemini-cli-lt-scope-message-extra,
          ]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-lifecycle
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-format-append,
            ref-gemini-cli-lt-life-rewind-a,
            ref-gemini-cli-lt-life-rewind-b,
            ref-gemini-cli-lt-life-history-sync-a,
            ref-gemini-cli-lt-life-history-sync-b,
            ref-gemini-cli-lt-life-sethistory,
            ref-gemini-cli-lt-life-compression,
            ref-gemini-cli-lt-life-selector-a,
            ref-gemini-cli-lt-life-selector-b,
          ]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-archive
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-db-list-a,
            ref-gemini-cli-lt-db-list-b,
            ref-gemini-cli-lt-db-list-c,
            ref-gemini-cli-lt-db-list-sessions-a,
            ref-gemini-cli-lt-db-list-sessions-b,
            ref-gemini-cli-lt-db-core-deps,
          ]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-archive
        status: partial
        source_refs:
          [
            ref-gemini-cli-lt-archive-export,
            ref-gemini-cli-lt-archive-checkpoint-path,
            ref-gemini-cli-lt-archive-checkpoint-save,
            ref-gemini-cli-lt-archive-checkpoint-doc-a,
            ref-gemini-cli-lt-archive-checkpoint-doc-b,
            ref-gemini-cli-lt-life-import-a,
          ]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-clean-settings-a,
            ref-gemini-cli-lt-clean-settings-b,
            ref-gemini-cli-lt-clean-doc,
            ref-gemini-cli-lt-clean-entry-a,
            ref-gemini-cli-lt-clean-entry-b,
            ref-gemini-cli-lt-clean-identify-a,
            ref-gemini-cli-lt-clean-identify-b,
            ref-gemini-cli-lt-clean-identify-c,
            ref-gemini-cli-lt-clean-identify-d,
            ref-gemini-cli-lt-clean-delete-session-a,
            ref-gemini-cli-lt-clean-delete-session-b,
            ref-gemini-cli-lt-clean-artifacts-a,
            ref-gemini-cli-lt-clean-artifacts-b,
            ref-gemini-cli-lt-clean-artifacts-c,
            ref-gemini-cli-lt-clean-subagent-a,
            ref-gemini-cli-lt-clean-subagent-b,
            ref-gemini-cli-lt-clean-quit-delete,
            ref-gemini-cli-lt-clean-delete-doc,
          ]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs:
          [
            ref-gemini-cli-lt-diag-doc-listing,
            ref-gemini-cli-lt-diag-resume-doc-a,
            ref-gemini-cli-lt-diag-resume-doc-b,
            ref-gemini-cli-lt-db-list-b,
            ref-gemini-cli-lt-db-list-c,
            ref-gemini-cli-lt-clean-identify-a,
            ref-gemini-cli-lt-format-load,
            ref-gemini-cli-lt-loc-chats-list,
          ]
---

本节结论全部来自 gemini-cli 仓库固定 commit `fb972b2f87fe7d5b06d37eac711490162d98de2c` 的源码与同 commit 的 `docs/` 文档，快照 `snapshot-gemini-cli-lt-*`，抓取时间 2026-10-06T04:35:00Z，Target 为 `surface: cli`、`distribution: source-tree`、`os: linux`、`arch: x64`、`execution_mode: native`。源码 commit 只代表该源码树，不证明任何 npm 发行版的行为，本轮不写版本映射。文中路径都是源码里的路径片段，不是执行机的真实绝对路径。日志与遥测不在本节范围内，只在维持会话记录所必需时提及。

## 记录范围 {#transcripts-scope}

CLI 交互时会持续把会话写入项目临时目录下的 `chats/`，用户不需要手动保存 [@ref-gemini-cli-lt-scope-doc]。官方文档把记录内容列为：用户提示与模型回复、全部工具执行的输入输出、token 用量统计，以及可获得的思考摘要 [@ref-gemini-cli-lt-scope-doc]。

源码与之一致。每条消息记录共享 `id`、`timestamp`、`content` 三个基础字段，`displayContent` 可选，只用于界面显示 [@ref-gemini-cli-lt-scope-base-record]。工具调用记录包含 `id`、`name`、`args`、`status`、`timestamp`，`result` 可选，另带 `agentId` 与若干仅供 UI 的字段 [@ref-gemini-cli-lt-scope-base-record]。消息按类型分流：`user`/`info`/`error`/`warning` 只有类型标记；`gemini` 类型可带 `toolCalls`、`thoughts`、`tokens` 与 `model` [@ref-gemini-cli-lt-scope-message-extra]。

会话创建时先写入一条元数据记录，包含 `sessionId`、`projectHash`、`startTime`、`lastUpdated`、`kind`，子代理会话还写 `directories` [@ref-gemini-cli-lt-scope-chats-dir]。没有单独的“停止记录”开关出现在本轮查证的路径里：记录的写入者 `ChatRecordingService` 由 `GeminiChat` 构造后即随会话存在，本节查证的设置项只控制保留期与删除（见清理小节），没有找到关闭记录的官方开关。用户能控制的“开关”形态是删除与保留，而不是记录本身。

记录内容对恢复列表有影响：只有含有真实对话内容的记录才算可恢复，纯启动、系统与内部上下文的记录会被跳过 [@ref-gemini-cli-lt-scope-resumable]。也就是说，落盘范围大于“会被列出和恢复的范围”。

## 存储位置 {#transcripts-storage-layout}

会话记录落在全局运行目录下的项目临时目录。全局运行目录默认等于全局 `.gemini` 目录，即家目录加 `.gemini`；macOS Seatbelt（`SANDBOX=sandbox-exec`）下改到家目录的 `.cache/.gemini`，因为沙箱策略不允许写家目录下的 `.gemini` [@ref-gemini-cli-lt-loc-runtime-dir]。家目录本身可由 `GEMINI_CLI_HOME` 覆盖，否则用系统家目录；取不到家目录时全局 `.gemini` 目录退到系统临时目录下的 `.gemini` [@ref-gemini-cli-lt-loc-gemini-dir] [@ref-gemini-cli-lt-loc-home-env]。

项目临时目录是 `{global runtime dir}/tmp/{project identifier}`，identifier 来自项目注册表给出的短标识 [@ref-gemini-cli-lt-loc-global-temp] [@ref-gemini-cli-lt-loc-project-temp]。这个全局运行目录在启动时被递归创建，创建失败（只读文件系统或权限拒绝）被静默忽略并照常返回路径 [@ref-gemini-cli-lt-loc-runtime-ensure]；也就是说目录不存在时不会报错，后续写入才会失败。注册表文件本身是全局运行目录下的 `projects.json`，启动时以其为基目录注册项目根路径 [@ref-gemini-cli-lt-loc-init-registry]。

按此拼出的会话正文路径是 `{project temp dir}/chats/` [@ref-gemini-cli-lt-scope-doc]。维持这些记录所需的同目录依赖：

- 交互输入历史：`{project temp dir}/shell_history` [@ref-gemini-cli-lt-loc-history-file]。
- 工具输出（被截断的大段输出）：`{project temp dir}/tool-outputs/session-{session id}/`，文件名由工具名与调用 id 组合 [@ref-gemini-cli-lt-diag-tool-outputs-a] [@ref-gemini-cli-lt-diag-tool-outputs-b]。
- 手动检查点文件：`{project temp dir}/checkpoint-{tag}.json`（见归档小节）。
- 影子 Git 仓库与全局历史目录：`{global runtime dir}/history/{project identifier}`，官方 checkpointing 文档写作 `~/.gemini/history/{project_hash}` [@ref-gemini-cli-lt-archive-checkpoint-doc-a] [@ref-gemini-cli-lt-loc-history-dir]。
- 按会话再分目录的 plans、tracker、tasks 也在同一项目临时目录下 [@ref-gemini-cli-lt-loc-checkpoints-dir]。

路径随项目作用域变化：不同项目根对应不同 identifier，因此不同项目的会话记录互不可见 [@ref-gemini-cli-lt-scope-doc]。本节只覆盖 Linux + x64 + 原生执行；其它操作系统与桌面形态没有在本轮固定来源里验证。

## 命名与记录结构 {#transcripts-naming-and-schema}

主会话文件名形如 `session-{timestamp}-{shortId}.jsonl`，前缀常量是 `session-` [@ref-gemini-cli-lt-naming-prefix]。timestamp 取 ISO 时间的前 16 个字符并把冒号换成短横，shortId 是会话 id 前 8 个字符；同一时间戳撞名时在短横后插入递增序号 [@ref-gemini-cli-lt-naming-filename-a] [@ref-gemini-cli-lt-naming-filename-b]。

子代理会话嵌在父会话 id 目录下，文件名直接是 `{sessionId}.jsonl`，不带时间戳与短 id [@ref-gemini-cli-lt-naming-filename-a]。父子关系因此由目录表达，而不是文件内容里的字段。会话 id 本身默认来自本次运行的 prompt id，也可以由 `--session-id` 手工指定 [@ref-gemini-cli-lt-naming-session-id]。

删除与查找时反解出 8 位短 id：输入是 `session-` 开头的文件名就取最后一段，否则取前 8 位，长度必须正好 8 位 [@ref-gemini-cli-lt-naming-shortid]。

记录元数据里的 `projectHash` 字段是项目根路径的 SHA-256 [@ref-gemini-cli-lt-naming-project-hash]，它与目录名用的短标识不是同一套值。目录标识由项目根目录名 slug 化而来，冲突时追加数字后缀，并接受磁盘上已有的归属 [@ref-gemini-cli-lt-naming-project-slug]；每个 slug 目录内用 `.project_root` 标记文件写入归属项目路径，写入时用 `wx` 独占标志防止抢占 [@ref-gemini-cli-lt-naming-ownership-marker]。

会话正文的元数据结构包含 `sessionId`、`projectHash`、`startTime`、`lastUpdated`、`messages`，可选 `summary`、`memoryScratchpad`、`directories`、`kind`（`main` 或 `subagent`）[@ref-gemini-cli-lt-schema-conversation]。消息行按类型分流：`user`/`info`/`error`/`warning` 只有类型标记，`gemini` 类型可带 `toolCalls`、`thoughts`、`tokens` 与 `model` [@ref-gemini-cli-lt-scope-message-extra]；公共基础字段与工具调用字段见记录范围一节 [@ref-gemini-cli-lt-scope-base-record]。除消息行外，文件里还有三类控制记录：`$rewindTo` 回退点，`$patch` 增量更新（支持 `id`、`content`、`toolCalls`、`updates`、`removeIds`、`orderIds`），以及 `$set` 元数据更新，其中内嵌 `messages` 的整段历史写入已标注为 deprecated [@ref-gemini-cli-lt-schema-patch-a] [@ref-gemini-cli-lt-schema-patch-b]。

脱敏最小示例（字段形状来自上述类型，值为占位）：

```jsonl
{"sessionId":"{uuid}","projectHash":"{sha256}","startTime":"{iso}","lastUpdated":"{iso}","kind":"main"}
{"id":"{uuid}","timestamp":"{iso}","type":"user","content":[{"text":"{user text}"}]}
{"id":"{uuid}","timestamp":"{iso}","type":"gemini","content":[{"text":"{model text}"}],"toolCalls":[{"id":"{uuid}","name":"{tool}","args":{},"status":"success","timestamp":"{iso}"}],"tokens":{"input":0,"output":0,"cached":0,"total":0},"model":"{model}"}
{"$set":{"lastUpdated":"{iso}"}}
```

schema 缺口：本轮固定来源给出了 TypeScript 类型与写入逻辑，但没有一份声明式的记录 schema 文档，也没有版本迁移规则表。已查入口是 `packages/core/src/services/chatRecordingTypes.ts`（类型定义）、`chatRecordingService.ts`（写入与解析）。旧格式只有一条兼容路径：`.json` 结尾的会话文件在重写时改名为 `.jsonl`，读取时若整段 JSON 能解析出 `sessionId` 则按旧记录处理 [@ref-gemini-cli-lt-format-legacy]。除此之外的版本迁移规则无法从固定来源确认，本节不做推断。

## 格式与生命周期 {#transcripts-format-and-lifecycle}

格式是 JSONL：每条记录序列化后加换行，用 `appendFileSync` 追加，写前确保目录存在；磁盘写满（`ENOSPC`）时把会话文件置空并告警，之后的写入静默丢弃而不抛错 [@ref-gemini-cli-lt-format-append]。没有分片与压缩逻辑出现在查证路径里。

整文件重写只在少数路径发生：恢复时读取失败会用内存中的会话重写一份干净文件；重写先把已存在但读不出的旧文件改名为 `{file}.unreadable-{timestamp}` 保留 [@ref-gemini-cli-lt-format-rewrite-head] [@ref-gemini-cli-lt-format-rewrite-preserve]，再写 `{file}.tmp-{pid}` 后改名，保证原子替换，失败时删掉临时文件 [@ref-gemini-cli-lt-format-rewrite-atomic]。

读取按行累积：先聚合成内存中的会话记录；整段解析失败时回退到旧 JSON 解析 [@ref-gemini-cli-lt-format-load] [@ref-gemini-cli-lt-format-legacy]。内存窗口只保留最近若干条消息，超出部分按需从文件重读，因此文件是权威副本而不是内存状态的快照。

生命周期顺序：

1. 创建：会话初始化时决定文件名并写入首条元数据 [@ref-gemini-cli-lt-scope-chats-dir]。
2. 追加：每条消息、工具调用、思考与 token 都走追加，元数据变更写成 `$set` 行 [@ref-gemini-cli-lt-format-append]。
3. 回退：`rewindTo` 按消息 id 截断视图，并追加一条 `$rewindTo` 记录 [@ref-gemini-cli-lt-life-rewind-a] [@ref-gemini-cli-lt-life-rewind-b]。
4. 上下文压缩后延续：压缩产生新历史时会先取出当前会话记录与文件路径，再以这些数据重建会话对象，写入同一个文件路径，不新开文件 [@ref-gemini-cli-lt-life-compression]。历史替换经 `setHistory` 回到 `updateMessagesFromHistory`，纯尾部回滚写成 `$rewindTo`，其余内容变更、删除与重排合并成一条 `$patch` [@ref-gemini-cli-lt-life-sethistory] [@ref-gemini-cli-lt-life-history-sync-a] [@ref-gemini-cli-lt-life-history-sync-b]。
5. 交给子代理：子代理在自己的目录里另起文件，父 id 来自主代理上下文 [@ref-gemini-cli-lt-scope-chats-dir]。
6. 恢复：`SessionSelector` 从 `chats` 目录按短 id 匹配文件名，读出记录并交给会话 [@ref-gemini-cli-lt-life-selector-a] [@ref-gemini-cli-lt-life-selector-b]。
7. 导入：`--session-file` 读取外部记录后会重新分配 session id 与 projectHash 并重置时间戳 [@ref-gemini-cli-lt-life-import-a] [@ref-gemini-cli-lt-life-import-b]。

## 索引、数据库与归档 {#transcripts-index-and-archive}

没有数据库参与会话记录：`@google/gemini-cli-core` 的依赖里没有嵌入式数据库 [@ref-gemini-cli-lt-db-core-deps]，会话正文完全由 JSONL 文件承载。索引是每次现算的：`getAllSessionFiles` 读 `chats` 目录，按 `session-` 前缀与 `.json`/`.jsonl` 后缀筛选并按文件名排序 [@ref-gemini-cli-lt-db-list-a]，再逐个读记录取元数据，缺失必需字段的按损坏处理 [@ref-gemini-cli-lt-db-list-b]，无可恢复内容的与子代理会话也在这里被过滤掉 [@ref-gemini-cli-lt-db-list-c]。`getSessionFiles` 再把结果按会话 id 去重、按 `startTime` 排序并编 1 基索引 [@ref-gemini-cli-lt-db-list-sessions-a] [@ref-gemini-cli-lt-db-list-sessions-b]。

因此恢复所必需的只有会话文件本身；列表、计数、排序都可以从文件重建，删除某个派生索引不会丢正文。同一短 id 的重复文件按 `lastUpdated` 取最新一份 [@ref-gemini-cli-lt-db-list-sessions-a]。

原生归档有两套，都不是“把记录压缩搬走”：

- 手动对话检查点：`/resume save {tag}` 写 `checkpoint-{tag}.json`，内容是模型侧历史加认证类型；tag 先做百分号编码再拼进文件名，写入用 `JSON.stringify(..., null, 2)` [@ref-gemini-cli-lt-archive-checkpoint-path] [@ref-gemini-cli-lt-archive-checkpoint-save]。读取时会先试编码后的新路径，再回退到未编码的旧路径 [@ref-gemini-cli-lt-archive-checkpoint-path]。
- 文件修改检查点：官方文档说明它由影子 Git 仓库（家目录下 history 目录）+ 项目临时目录里的 JSON 检查点文件共同组成，三者合起来才构成可恢复的检查点 [@ref-gemini-cli-lt-archive-checkpoint-doc-a] [@ref-gemini-cli-lt-archive-checkpoint-doc-b]。这类检查点默认关闭，只能通过 `settings.json` 打开；命令行开关已在 0.11.0 移除 [@ref-gemini-cli-lt-archive-checkpoint-doc-b]。

导出（复制出去）与归档不同：`/export-session {file}` 把当前会话记录以缩进 JSON 写到用户给定路径，路径相对当前工作目录解析，不改动原会话文件 [@ref-gemini-cli-lt-archive-export]。重新导入时 `--session-file` 会改写身份字段与时间戳 [@ref-gemini-cli-lt-life-import-a]，所以往返一次之后，`sessionId`、目录归属与起止时间都不再是原始值；本轮固定来源没有说明导入会丢失哪些字段，工具输出文件与影子 Git 仓库也不在这个 JSON 里 [@ref-gemini-cli-lt-archive-checkpoint-doc-a]。

## 删除与保留 {#transcripts-cleanup}

`settings.json` 本身的加载位置、优先级与合并规则属于配置机制（`config.sources`、`config.overrides`、`config.defaults`），本节只讲其中与会话保留相关的键。官方保留机制由 `general.sessionRetention` 控制：`enabled` 默认 `true`，`maxAge` 默认 `30d`，`maxCount` 默认不限制，`minRetention` 默认 `1d` 作为安全下限 [@ref-gemini-cli-lt-clean-settings-a] [@ref-gemini-cli-lt-clean-settings-b] [@ref-gemini-cli-lt-clean-doc]。

清理在 CLI 启动时执行，`general.sessionRetention.enabled` 为假时整体跳过；配置校验不过时只告警并禁用清理，不影响启动 [@ref-gemini-cli-lt-clean-entry-a] [@ref-gemini-cli-lt-clean-entry-b]。判定顺序是先无条件收集所有损坏文件，再对有效会话按时间与数量两条规则判断 [@ref-gemini-cli-lt-clean-identify-a]。时间规则按 `lastUpdated` 与截止时间比较 [@ref-gemini-cli-lt-clean-identify-b]；数量规则按 `lastUpdated` 倒序保留最近若干个，且会把当前活动会话从可删除集合中排除 [@ref-gemini-cli-lt-clean-identify-c] [@ref-gemini-cli-lt-clean-identify-d]。

删除是级联的。`deleteStoredSession` 由 id 或文件名反解短 id，列出 `chats` 目录下匹配的全部文件逐个处理 [@ref-gemini-cli-lt-clean-delete-session-a] [@ref-gemini-cli-lt-clean-delete-session-b]；每个文件先读首行拿回完整 session id，再删该会话的活动日志、工具输出目录与顶层会话目录 [@ref-gemini-cli-lt-clean-artifacts-a] [@ref-gemini-cli-lt-clean-artifacts-b] [@ref-gemini-cli-lt-clean-artifacts-c]。子代理目录单独处理：先逐个子代理文件删其产物，再删目录本身，并拒绝越出 `chats` 的路径 [@ref-gemini-cli-lt-clean-subagent-a] [@ref-gemini-cli-lt-clean-subagent-b]。

手工入口有三种：命令行 `--delete-session`（索引或 id）、Session Browser 内按 `x` [@ref-gemini-cli-lt-clean-delete-doc]；交互态 `/quit --delete` 或 `/exit --delete` 退出并删除当前会话的记录与临时文件 [@ref-gemini-cli-lt-clean-quit-delete]。

删除前必须停止的写入者是当前 CLI 进程本身：清理代码会把当前会话标为不可删除 [@ref-gemini-cli-lt-clean-identify-c]，`/quit --delete` 的删除也在退出流程内完成。对运行中的会话做外部删除，本轮固定来源没有给出保证；已查入口是 `sessionCleanup.ts`、`sessionOperations.ts` 与 `chatRecordingService.deleteCurrentSessionAsync`。手工删掉 `chats` 里的文件不会连带删除同 id 的工具输出与影子仓库对象，这些孤儿只有在下一次按 id 删除或保留期清理命中同一 id 时才会被清掉 [@ref-gemini-cli-lt-clean-artifacts-b]。

## 定位、完整性与排错 {#transcripts-diagnostics}

定位记录的命令行入口是 `--list-sessions`，输出按 `startTime` 升序编号，带首条用户消息、相对时间、当前会话标记与会话 id [@ref-gemini-cli-lt-diag-doc-listing]。交互入口是 `/resume` 的 Session Browser：列出时间、消息数与首条用户消息，支持按 id 或内容搜索、直接删除选中项 [@ref-gemini-cli-lt-diag-resume-doc-a] [@ref-gemini-cli-lt-diag-resume-doc-b]。`Storage.listProjectChatFiles` 直接列 `chats` 目录并读每份记录的时间信息，是不经过 UI 的最小读法 [@ref-gemini-cli-lt-loc-chats-list]。

判断一份记录是否可用，看它能否解析出 `sessionId`：解析失败或缺 `sessionId` 会被标为损坏并从列表中剔除 [@ref-gemini-cli-lt-db-list-b]；没有可恢复内容的记录同样按不可用处理 [@ref-gemini-cli-lt-db-list-c]。损坏文件不是只被忽略——保留期清理会把损坏文件一并纳入删除集合 [@ref-gemini-cli-lt-clean-identify-a]，所以排查时要先复制走原始文件再让 CLI 启动。整段 JSON 解析失败时会回退旧格式解析 [@ref-gemini-cli-lt-format-load]，文件里出现半行写入时读取会按行累积并跳过无法解析的行。

排查备份、恢复与清理时的顺序建议：先在退出 CLI 后复制 `{project temp dir}/chats/`、同目录的 `tool-outputs/`、`shell_history`、`checkpoint-*.json`，以及 `{global runtime dir}/history/{project identifier}` 的影子仓库；再决定是否启用自动清理。缺任何一样都不构成“可安全删除”的依据：`chats` 里的文件是会话正文的唯一权威副本，`tool-outputs` 与影子仓库承载的截断输出和文件快照不在会话文件内 [@ref-gemini-cli-lt-diag-tool-outputs-a] [@ref-gemini-cli-lt-archive-checkpoint-doc-a]。