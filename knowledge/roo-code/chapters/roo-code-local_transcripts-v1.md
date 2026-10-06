---
schema_version: 3
record_kind: production
edition_id: roo-code-local_transcripts-v1
harness_id: roo-code
topic: local_transcripts
title: "Roo Code 的会话记录：按任务分目录的 JSON 记录、列表索引与影子 Git 检查点"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-global-file-names,
        ref-roo-code-lt-setting-custom-storage-path,
        ref-roo-code-lt-doc-custom-storage-path,
        ref-roo-code-lt-storage-base-path,
        ref-roo-code-lt-storage-base-path-fallback,
        ref-roo-code-lt-storage-task-dir,
        ref-roo-code-lt-write-ui-messages,
        ref-roo-code-lt-read-api-messages,
        ref-roo-code-lt-get-task-with-id,
        ref-roo-code-lt-task-id-uuid7,
        ref-roo-code-lt-create-task-relations,
        ref-roo-code-lt-history-item-schema-core,
        ref-roo-code-lt-history-item-schema-relations,
        ref-roo-code-lt-safe-write-doc,
        ref-roo-code-lt-safe-write-atomic,
      ]
  - section_id: transcripts-record-content
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-read-ui-messages,
        ref-roo-code-lt-write-ui-messages,
        ref-roo-code-lt-read-api-messages,
        ref-roo-code-lt-legacy-claude-messages,
        ref-roo-code-lt-cline-message-schema,
        ref-roo-code-lt-api-message-fields,
        ref-roo-code-lt-api-message-condense-fields,
        ref-roo-code-lt-history-item-build,
        ref-roo-code-lt-file-context-read,
        ref-roo-code-lt-file-context-write,
        ref-roo-code-lt-image-data-url,
      ]
  - section_id: transcripts-lifecycle
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-task-id-uuid7,
        ref-roo-code-lt-create-task-relations,
        ref-roo-code-lt-save-api-history,
        ref-roo-code-lt-save-cline-messages,
        ref-roo-code-lt-store-upsert,
        ref-roo-code-lt-resume-trim-messages,
        ref-roo-code-lt-resume-drop-empty-req,
        ref-roo-code-lt-condense-summary,
        ref-roo-code-lt-history-item-schema-relations,
        ref-roo-code-lt-store-write-index,
      ]
  - section_id: transcripts-list-and-index
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-store-layout,
        ref-roo-code-lt-store-paths,
        ref-roo-code-lt-store-upsert,
        ref-roo-code-lt-store-reconcile,
        ref-roo-code-lt-store-load-index,
        ref-roo-code-lt-store-write-index,
        ref-roo-code-lt-store-migrate,
        ref-roo-code-lt-store-migration-gate,
        ref-roo-code-lt-globalstate-writethrough,
        ref-roo-code-lt-get-task-with-id,
      ]
  - section_id: transcripts-checkpoints
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-checkpoint-shadow-dir,
        ref-roo-code-lt-checkpoint-repo-path,
        ref-roo-code-lt-checkpoint-save,
        ref-roo-code-lt-doc-checkpoint-storage,
      ]
  - section_id: transcripts-export-and-cleanup
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-export-task,
        ref-roo-code-lt-export-filename,
        ref-roo-code-lt-export-markdown-body,
        ref-roo-code-lt-delete-task-head,
        ref-roo-code-lt-delete-task-collect,
        ref-roo-code-lt-delete-task-state,
        ref-roo-code-lt-delete-task-files,
        ref-roo-code-lt-store-delete,
      ]
  - section_id: transcripts-diagnostics
    surface_ids: [vscode]
    source_refs:
      [
        ref-roo-code-lt-safe-write-doc,
        ref-roo-code-lt-safe-write-atomic,
        ref-roo-code-lt-read-ui-messages,
        ref-roo-code-lt-read-api-messages,
        ref-roo-code-lt-store-load-index,
        ref-roo-code-lt-store-write-index,
        ref-roo-code-lt-store-reconcile,
        ref-roo-code-lt-store-paths,
        ref-roo-code-lt-get-task-with-id,
        ref-roo-code-lt-file-context-read,
      ]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-record-content
        status: partial
        source_refs:
          [
            ref-roo-code-lt-read-ui-messages,
            ref-roo-code-lt-write-ui-messages,
            ref-roo-code-lt-cline-message-schema,
            ref-roo-code-lt-api-message-fields,
            ref-roo-code-lt-image-data-url,
            ref-roo-code-lt-file-context-write,
          ]
  - question_id: transcripts.location
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          [
            ref-roo-code-lt-storage-base-path,
            ref-roo-code-lt-storage-base-path-fallback,
            ref-roo-code-lt-storage-task-dir,
            ref-roo-code-lt-get-task-with-id,
            ref-roo-code-lt-setting-custom-storage-path,
            ref-roo-code-lt-doc-custom-storage-path,
            ref-roo-code-lt-global-file-names,
          ]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          [
            ref-roo-code-lt-global-file-names,
            ref-roo-code-lt-storage-task-dir,
            ref-roo-code-lt-task-id-uuid7,
            ref-roo-code-lt-create-task-relations,
            ref-roo-code-lt-history-item-schema-core,
            ref-roo-code-lt-history-item-schema-relations,
          ]
  - question_id: transcripts.format
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          [
            ref-roo-code-lt-global-file-names,
            ref-roo-code-lt-write-ui-messages,
            ref-roo-code-lt-read-api-messages,
            ref-roo-code-lt-safe-write-doc,
            ref-roo-code-lt-safe-write-atomic,
          ]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-record-content
        status: answered
        source_refs:
          [
            ref-roo-code-lt-cline-message-schema,
            ref-roo-code-lt-api-message-fields,
            ref-roo-code-lt-api-message-condense-fields,
            ref-roo-code-lt-history-item-build,
            ref-roo-code-lt-legacy-claude-messages,
            ref-roo-code-lt-file-context-read,
          ]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-lifecycle
        status: answered
        source_refs:
          [
            ref-roo-code-lt-save-api-history,
            ref-roo-code-lt-save-cline-messages,
            ref-roo-code-lt-store-upsert,
            ref-roo-code-lt-resume-trim-messages,
            ref-roo-code-lt-resume-drop-empty-req,
            ref-roo-code-lt-condense-summary,
            ref-roo-code-lt-create-task-relations,
          ]
  - question_id: transcripts.database
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-list-and-index
        status: answered
        source_refs:
          [
            ref-roo-code-lt-store-layout,
            ref-roo-code-lt-store-paths,
            ref-roo-code-lt-store-reconcile,
            ref-roo-code-lt-store-migrate,
            ref-roo-code-lt-store-migration-gate,
            ref-roo-code-lt-globalstate-writethrough,
            ref-roo-code-lt-get-task-with-id,
          ]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-export-and-cleanup
        status: partial
        source_refs:
          [
            ref-roo-code-lt-export-task,
            ref-roo-code-lt-export-markdown-body,
            ref-roo-code-lt-export-filename,
          ]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-export-and-cleanup
        status: partial
        source_refs:
          [
            ref-roo-code-lt-delete-task-head,
            ref-roo-code-lt-delete-task-collect,
            ref-roo-code-lt-delete-task-state,
            ref-roo-code-lt-delete-task-files,
            ref-roo-code-lt-store-delete,
          ]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-diagnostics
        status: answered
        source_refs:
          [
            ref-roo-code-lt-safe-write-doc,
            ref-roo-code-lt-read-ui-messages,
            ref-roo-code-lt-read-api-messages,
            ref-roo-code-lt-store-load-index,
            ref-roo-code-lt-store-reconcile,
            ref-roo-code-lt-store-paths,
          ]
---

## 记录写在哪儿：扩展全局存储下的 tasks 目录 {#transcripts-storage-layout}

固定来源是官方仓库提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`，本章只描述 catalog 中登记的 `vscode` 界面（VS Code 扩展）。取用时间 2026-10-06T05:40:00Z，artifact 与 snapshot 由本轮生成，每条引用的 snapshot 绑定到被引用文件本身。本章结论只覆盖该提交下的源码树：不证明任何 npm 发行包版本的行为，也不覆盖仓库内未在 catalog 登记的其它形态。

**记录基址由一个用户设置决定，默认为宿主的扩展全局存储。** 读记录的每个函数都先调用 `getStorageBasePath`：它读取 `roo-cline.customStoragePath`，为空时直接返回调用方传入的默认路径（即 VS Code 的 `context.globalStorageUri.fsPath`）。[@ref-roo-code-lt-storage-base-path][@ref-roo-code-lt-get-task-with-id] 清单里的设置项是一个字符串键，默认 `""`；官方设置参考把它的用途写为"自定义 Roo Code 存储目录……用于存放任务历史、设置与其他数据"。[@ref-roo-code-lt-setting-custom-storage-path][@ref-roo-code-lt-doc-custom-storage-path]

**自定义路径不可用时静默回落，不是报错退出。** 代码会 `mkdir` 该路径并做读写执行权限检查；失败时打印错误、向用户弹一条 `custom_storage_path_unusable` 提示，然后返回默认路径。[@ref-roo-code-lt-storage-base-path-fallback] 这条回落对使用者很重要：设置写错不会丢记录，但记录会出现在你没有预期的目录里。

**目录与文件名是固定常量，不随界面变化。** `GlobalFileNames` 给出全部第一方文件名：`api_conversation_history.json`、`ui_messages.json`、`task_metadata.json`、`history_item.json`、`_index.json`（另有 `mcp_settings.json`、`custom_modes.yaml` 属设置类文件，不是会话记录）。[@ref-roo-code-lt-global-file-names] 会话目录形如 `<基址>/tasks/{taskId}`，读取时按需创建。[@ref-roo-code-lt-storage-task-dir]

**会话 ID 与父子关系。** 新任务的 ID 是 `uuidv7()`，除非传入的 `historyItem` 自带 ID。[@ref-roo-code-lt-task-id-uuid7] 子任务在创建时把栈底任务作为 `rootTask`、当前父任务作为 `parentTask`、栈深作为 `taskNumber`。[@ref-roo-code-lt-create-task-relations] 列表条目里对应 `rootTaskId`、`parentTaskId`、`childIds`、`awaitingChildId`、`delegatedToId`、`completedByChildId` 等字段，父子关系由 ID 表达而不是目录嵌套。[@ref-roo-code-lt-history-item-schema-core][@ref-roo-code-lt-history-item-schema-relations]

**写入方式是整文件覆盖 + 原子替换。** 界面消息与模型对话历史都是整份数组覆盖写入，不是追加日志：[@ref-roo-code-lt-write-ui-messages][@ref-roo-code-lt-read-api-messages] 落盘统一走 `safeWriteJson`，先对目标路径加进程间文件锁，创建父目录，把数据流式写入同目录的临时文件，若目标已存在先重命名为备份，最后把临时文件重命名到目标，失败时回滚。[@ref-roo-code-lt-safe-write-doc][@ref-roo-code-lt-safe-write-atomic] 因此会话文件是完整的 JSON 快照；本轮未在固定来源中找到分片、压缩或轮转的机制。

**已知缺口。** 宿主侧的实际绝对路径由 VS Code 的 `globalStorageUri` 决定，本轮固定来源里没有 VS Code 自身的路径契约，因此这里不给出各操作系统的具体目录；使用 `roo-cline.customStoragePath` 时的相对层级（`tasks/`、各记录文件）则是源码直接证实的。

## 记录内容：两份会话正文加一份辅助元数据 {#transcripts-record-content}

每个任务目录里有三份与"继续这个会话"有关的记录，职责不同：

1. `ui_messages.json` —— 界面事件流。读函数按 `JSON.parse` 解析并要求顶层是数组，否则打警告并返回空数组。[@ref-roo-code-lt-read-ui-messages] 写函数把整个消息数组交给 `safeWriteJson` 覆盖，不追加。[@ref-roo-code-lt-write-ui-messages]
2. `api_conversation_history.json` —— 发给模型的对话历史，读写同样是整份数组。[@ref-roo-code-lt-read-api-messages]
3. `task_metadata.json` —— 文件上下文元数据，由 `FileContextTracker` 读写：记录每个文件进入上下文的时间与状态，文件缺失时读取返回空列表，[@ref-roo-code-lt-file-context-read] 写入同样经 `safeWriteJson` 整份覆盖。[@ref-roo-code-lt-file-context-write]

**界面事件的字段。** `ClineMessage` 的第一方 schema 是：`ts`（数字时间戳）、`type`（`ask` 或 `say`）、可选的 `ask` 或 `say` 枚举、`text`、`images`（字符串数组）、`partial`、`reasoning`、`conversationHistoryIndex`、`checkpoint`、`progressStatus`、`contextCondense`、`contextTruncation`、`isProtected`、`apiProtocol`、`isAnswered`。[@ref-roo-code-lt-cline-message-schema] 图片不是独立附件：从 Webview 侧看，粘贴或拖入的文件由 `readAsDataURL` 读成 data URL 字符串随消息传递，因此进入记录的就是内联字符串。[@ref-roo-code-lt-image-data-url]

**对话历史的字段。** `ApiMessage` 以 Anthropic 的 `MessageParam` 为基底，附加 `ts`、`isSummary`、`id`、推理相关字段（`type: "reasoning"`、`summary`、`encrypted_content`、`reasoning_details`、`reasoning_content`）以及压缩与截断标记。[@ref-roo-code-lt-api-message-fields] 非破坏式压缩与截断的对应关系直接写在记录里：摘要消息带唯一 `condenseId`，被它替代的旧消息带 `condenseParent`；截断同理使用 `truncationId` / `truncationParent` / `isTruncationMarker`。[@ref-roo-code-lt-api-message-condense-fields]

**列表条目是派生值。** 每次保存界面消息时，代码顺带重算一个 `HistoryItem`：时间戳取自最后一条非 resume 类消息，标题取首条消息文本，token 与成本由消息数组统计，目录体积用 `get-folder-size` 量取（带 30 秒缓存），工作区路径与模式取自该任务自身。[@ref-roo-code-lt-history-item-build] 也就是说列表条目不独立存储正文，只是同目录记录的摘要。

**脱敏最小示例**（占位值，字段取自上面的 schema）：

`ui_messages.json`：

```json
[
  { "ts": 1700000000000, "type": "ask", "ask": "followup", "text": "<占位：用户提问>" },
  { "ts": 1700000001000, "type": "say", "say": "text", "text": "<占位：助手回答>" }
]
```

`history_item.json`：

```json
{
  "id": "<占位：会话 ID>",
  "number": 1,
  "ts": 1700000001000,
  "task": "<占位：首条消息文本>",
  "tokensIn": 0,
  "tokensOut": 0,
  "totalCost": 0,
  "workspace": "<占位：工作区路径>"
}
```

**版本迁移。** 至少两处迁移被固定来源直接记录：旧文件名 `claude_messages.json` 仍会被读取，读取后随即被删除；[@ref-roo-code-lt-legacy-claude-messages] 历史列表从宿主全局状态里的 `taskHistory` 数组迁到按任务的 `history_item.json`（见下一节）。[@ref-roo-code-lt-history-item-build]

**已查入口与剩余缺口（`transcripts.scope` 记为 partial 的原因）。** 已查 `src/core/task-persistence/` 全部文件、`GlobalFileNames` 的全部常量、`src/utils/storage.ts` 的全部目录构造函数。本轮固定来源能证实"记录了什么"，但**没有**取到"哪些内容明确不落盘"的正面证据：输入历史、调试日志与缓存的存放位置不在这些入口内，也未在会话目录中留下痕迹。不能说它们不落盘，也不能说它们落盘。

## 记录的生命周期：新建、整份保存、恢复、压缩 {#transcripts-lifecycle}

**创建。** 任务实例创建时确定 ID（UUIDv7 或沿用列表条目 ID）、父子关系与任务编号，并把 `provider.context.globalStorageUri.fsPath` 记为后续所有写盘的基准路径。[@ref-roo-code-lt-task-id-uuid7][@ref-roo-code-lt-create-task-relations]

**追加与刷盘。** 会话没有显式的"提交"动作：新消息通过 `addToClineMessages` / `say` / `ask` 追加后立即调用 `saveClineMessages`，它先整份写 `ui_messages.json`，再重算列表条目并交给 `updateTaskHistory`；模型侧历史则由 `saveApiConversationHistory` 整份写 `api_conversation_history.json`，写失败会返回 false 并记日志，委派流程另有 3 次退避重试。[@ref-roo-code-lt-save-cline-messages][@ref-roo-code-lt-save-api-history] 列表条目在存储层被 `upsert`：先写该任务的 `history_item.json`（真源），再安排一次 2 秒去抖的索引写入。[@ref-roo-code-lt-store-upsert]

**上下文压缩后延续。** 压缩不是覆盖式重写：新增一条 `isSummary: true` 且带新 `condenseId` 的摘要消息，被替代的旧消息被标记 `condenseParent`，发送时按摘要存在与否过滤。因此同一会话在压缩后仍可从原记录继续，且旧内容仍在文件里。[@ref-roo-code-lt-condense-summary] 压缩后新增的 `condense_context` 界面消息同样进入 `ui_messages.json`，压缩与截断的界面侧结果记在 `contextCondense` / `contextTruncation` 字段。[@ref-roo-code-lt-cline-message-schema]

**恢复。** 恢复时先读 `ui_messages.json`，然后按规则裁剪：删掉尾部所有 `resume_task` / `resume_completed_task` 消息，[@ref-roo-code-lt-resume-trim-messages] 再删掉尾部仅含推理的 `say: "reasoning"` 消息；[@ref-roo-code-lt-resume-trim-messages] 若最后一条 `api_req_started` 的 JSON 里既无 `cost` 也无 `cancelReason`，说明这次请求没有真正产生内容，该消息被移除。[@ref-roo-code-lt-resume-drop-empty-req] 这些裁剪发生在内存副本上；本轮未取到"恢复完成后立即把裁剪结果回写文件"的固定证据，因此不能断言被裁掉的条目已从磁盘记录中消失。

**交给子代理。** 子任务是一个独立的任务实例，拿到自己的 ID 与自己的 `tasks/{taskId}/` 目录；父子关系只由列表条目里的 ID 字段串起来，父任务文件里不内嵌子任务正文。[@ref-roo-code-lt-create-task-relations][@ref-roo-code-lt-history-item-schema-relations]

## 列表、索引与宿主全局状态：分工与可重建性 {#transcripts-list-and-index}

**本界面不使用数据库。** 在固定源码树的扩展部分检索 SQLite 依赖未命中；会话正文与列表都以文件形式保存。宿主自身（VS Code）用什么存储自己的全局状态，不由本仓库的固定来源决定，本章不对其内部结构作断言。

**三份列表相关文件分工明确。** `TaskHistoryStore` 的类注释写明：每个任务的 `HistoryItem` 存在自己的任务目录里（`globalStorage/tasks/{taskId}/history_item.json`），另有一个 `globalStorage/tasks/_index.json` 作为启动时快速列表读取的缓存；跨进程安全由 `safeWriteJson` 的文件锁提供，进程内由一条写锁串行化。[@ref-roo-code-lt-store-layout] 路径解析统一经 `getStorageBasePath`，因此列表与正文跟随同一个自定义存储设置。[@ref-roo-code-lt-store-paths]

**索引是可重建的缓存。** 它的结构是 `{ version: 1, updatedAt, entries }`；[@ref-roo-code-lt-store-write-index] 加载时只接受 `version === 1` 且 `entries` 为数组，其余情况（文件不存在或损坏）都让缓存保持空并交给后续 reconcile 修复。[@ref-roo-code-lt-store-load-index] reconcile 会列出 `tasks/` 下的目录名（跳过 `_` 和 `.` 前缀），把磁盘上有而缓存里没有的条目读回来、把缓存里有而磁盘上没有的条目移除，修复后重新安排索引写入。[@ref-roo-code-lt-store-reconcile] 因此 `_index.json` 损坏或丢失不会造成会话丢失，重新打开扩展即可从各任务目录重建。

**恢复一个会话需要哪些文件。** 按任务的 `ui_messages.json` 与 `api_conversation_history.json` 是正文，`history_item.json` 提供列表与元数据，`_index.json` 只影响列表读取速度。存储层在读取列表条目时先查自己的缓存，再回落到宿主全局状态里的 `taskHistory` 数组，然后才按 ID 拼出任务目录与两个正文文件的路径。[@ref-roo-code-lt-get-task-with-id]

**一次性的格式迁移。** 扩展启动时按 `taskHistoryMigratedToFiles` 标记决定是否把宿主全局状态里的 `taskHistory` 数组回填为按任务文件；存储层的迁移只对磁盘上已存在任务目录的条目写 `history_item.json`（目录不存在的条目被当作孤儿跳过），因此它不会凭空造出会话。[@ref-roo-code-lt-store-migrate][@ref-roo-code-lt-store-migration-gate]

**宿主全局状态是降级兼容副本。** 每次变更后存储层触发一次去抖回写，把整个列表写进 `globalState.taskHistory`；源码注释明确说按任务文件才是权威，全局状态只为降级兼容保留。删除全局状态里的这份副本不会破坏按任务文件。[@ref-roo-code-lt-globalstate-writethrough]

## 检查点：同一任务目录下的影子 Git 仓库 {#transcripts-checkpoints}

**检查点记录工作区文件快照，不记录会话正文。** `getCheckpointService` 用任务的 `cwd` 作为工作区，用宿主的 `globalStorageUri.fsPath` 作为 `shadowDir`。[@ref-roo-code-lt-checkpoint-shadow-dir] 每任务的仓库路径由 `RepoPerTaskCheckpointService.create` 拼成 `path.join(shadowDir, "tasks", taskId, "checkpoints")`。[@ref-roo-code-lt-checkpoint-repo-path] 注意这里的 `shadowDir` 是**未经** `getStorageBasePath` 的原始全局存储路径，也就是设了 `roo-cline.customStoragePath` 之后，检查点仓库仍留在默认位置，不会跟随自定义目录。

**开关。** 任务未启用检查点时 `getCheckpointService` 直接返回 undefined，`checkpointSave` 随即返回，什么都不写。[@ref-roo-code-lt-checkpoint-save] 官方文档把影子仓库描述为"专门用于检查点跟踪的独立 Git 仓库，作为检查点状态的持久化机制"，并说明它与项目自身的 Git 配置互不影响。[@ref-roo-code-lt-doc-checkpoint-storage]

**与正文记录的分工。** 正文（消息、工具事件、token 统计）在 `ui_messages.json` / `api_conversation_history.json`；检查点保存的是同一时间点的工作区文件内容，两者通过界面消息里的 `checkpoint_saved` 事件与提交哈希互相对应。要"回到某一步"必须同时具备两者，缺一会话正文与文件状态就对不上。

## 导出与删除 {#transcripts-export-and-cleanup}

**导出是单向的 Markdown 摘要，不是归档。** `exportTaskWithId` 读取列表条目与 `api_conversation_history`，交给 `downloadTask` 生成 Markdown 并让用户选择保存位置。[@ref-roo-code-lt-export-task] 生成的正文只保留 user / assistant 两个角色的内容，块之间用 `---` 分隔。[@ref-roo-code-lt-export-markdown-body] 默认文件名由列表条目时间戳推出，形如 `roo_task_{月}-{日}-{年}_{时}-{分}-{秒}{am|pm}.md`。[@ref-roo-code-lt-export-filename]

**导出的信息损失（`transcripts.archive` 记为 partial 的原因）。** 固定来源显示导出只覆盖 `api_conversation_history`：界面侧事件（工具调用明细、审批、todo 列表、压缩记录）、`task_metadata.json` 的文件上下文、检查点仓库都不在导出范围内。`formatContentBlockToMarkdown` 对图片块输出 `[Image]` 占位，因此图片内容不随导出保留。**本轮未取到**任何原生归档开关、定时快照或"整会话打包"机制的证据，也没有取到官方关于"复制整个任务目录到另一台机器"的说明；跨机器搬运因此没有可引用的官方路径规则，读者只能自己判断目录里缺了哪一部分。已查入口：`src/integrations/misc/export-markdown.ts`、`ClineProvider.exportTaskWithId`、以及 `src/package.json` 的 `contributes.commands`。

**删除是级联的。** `deleteTaskWithId` 的注释写明它同时删历史条目、检查点与任务目录，默认递归处理子任务。[@ref-roo-code-lt-delete-task-head] 子任务 ID 从条目的 `childIds` 递归收集，找不到的子任务被跳过而中断整批。[@ref-roo-code-lt-delete-task-collect] 执行顺序是：若目标任务在当前任务栈里，先把它从栈里移除；[@ref-roo-code-lt-delete-task-state] 再批量删除列表条目（存储层会 `unlink` 每个 `history_item.json`）[@ref-roo-code-lt-store-delete] 然后逐个删除影子仓库或分支，并 `fs.rm(..., { recursive: true, force: true })` 整个任务目录；[@ref-roo-code-lt-delete-task-files] 这两处删除各自吞掉异常并只记日志，所以单个任务失败不会阻止其余任务被删除，也不会让整批回滚。

**手动删除的后果与"删除前必须停止哪些写入者"（`transcripts.cleanup` 记为 partial 的原因）。** 由上可见：**正在运行或仍被委派引用的任务必须先从任务栈里退出**，否则同一 ID 的目录会被写回。手动删目录后，reconcile 会把该条目从列表缓存里移除，UI 上的会话随之消失；删掉 `ui_messages.json` 或 `api_conversation_history.json` 中的一份，读取会返回空数组（带警告），任务仍会出现在列表里但恢复后没有正文。孤儿目录（目录在、索引缺）会被 reconcile 重新纳回列表，而索引里有、目录没有的条目会被移除。**本轮未取到**任何自动保留期、定时清理或容量上限机制的证据；源码里出现的是显式删除与迁移跳过，不能据此推断"长期不清理也没有问题"。

## 定位、完整性与排错 {#transcripts-diagnostics}

**先定位目录。** 确认 `roo-cline.customStoragePath` 是否生效，然后按 `<基址>/tasks/<会话 ID>/` 打开；文件名是 `GlobalFileNames` 里的固定常量。[@ref-roo-code-lt-store-paths] 若列表为空但目录存在，看 `tasks/_index.json`：它带 `version` 字段，损坏或版本不符时缓存直接清空，随后由 reconcile 依据 `tasks/` 下的实际目录名重建。[@ref-roo-code-lt-store-load-index][@ref-roo-code-lt-store-reconcile]

**检查单份记录的完整性。** `ui_messages.json` 与 `api_conversation_history.json` 都以"顶层必须是数组"为前提：形状不对或解析失败时读取函数返回空数组并打警告，而不是抛错。[@ref-roo-code-lt-read-ui-messages][@ref-roo-code-lt-read-api-messages] 因此"任务在列表里但打开是空的"通常意味着该文件缺失、不是合法 JSON 数组，或写入被中断。

**看写入是否原子。** 落盘经过文件锁与临时文件重命名，同目录里可能出现 `.<文件名>.new_<时间戳>_<随机串>.tmp` 与 `.<文件名>.bak_<时间戳>_<随机串>.tmp` 这样的中间文件；写入成功时备份会被删除，失败时备份被改回原位。[@ref-roo-code-lt-safe-write-doc][@ref-roo-code-lt-safe-write-atomic] 目录里残留这类文件，说明对应写入没有正常收尾。索引文件被写坏也不会丢会话，只影响列表读取速度。

**区分正文缺失与元数据缺失。** `task_metadata.json` 只承载文件上下文；读取失败时返回 `{ files_in_context: [] }` 而不影响会话正文。[@ref-roo-code-lt-file-context-read] 排查"上下文里少了文件线索"时先看这份文件，再看 `ui_messages.json` 里的文件相关消息。

**外部读取的边界。** 以上都是对固定文件格式的源码级说明。本轮没有在受支持的发行包上运行扩展，也没有在真实 Windows 或 macOS 宿主上验证过这些路径，因此关于宿主如何选择默认全局存储目录、以及 UI 上各按钮在不同宿主版本中的行为，本章不下结论。
