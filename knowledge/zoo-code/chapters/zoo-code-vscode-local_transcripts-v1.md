---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-local_transcripts-v1
harness_id: zoo-code
topic: local_transcripts
title: "Zoo Code VS Code 扩展的本地会话记录：文件布局、生命周期与清理"
sections:
  - section_id: transcripts-recorded-content
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-global-file-names, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-ui-messages-write, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-storage-base-path, ref-zoo-code-lt-checkpoint-disabled-switch]
  - section_id: transcripts-storage-layout
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-storage-base-path, ref-zoo-code-lt-storage-base-path-fallback, ref-zoo-code-lt-storage-task-dir, ref-zoo-code-lt-global-file-names, ref-zoo-code-lt-task-id-uuidv7, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-safe-write-atomic-rename, ref-zoo-code-lt-safe-write-stream-format, ref-zoo-code-lt-ui-messages-write, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-checkpoint-shadow-path, ref-zoo-code-lt-checkpoint-global-storage-root]
  - section_id: transcripts-record-schema
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-api-message-fields, ref-zoo-code-lt-api-message-condense-fields, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-api-legacy-migration, ref-zoo-code-lt-ui-messages-parse-check, ref-zoo-code-lt-cline-message-fields, ref-zoo-code-lt-history-item-schema-core, ref-zoo-code-lt-history-item-schema-lineage, ref-zoo-code-lt-global-file-names]
  - section_id: transcripts-lifecycle
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-task-id-uuidv7, ref-zoo-code-lt-task-save-api-history, ref-zoo-code-lt-task-save-cline-messages, ref-zoo-code-lt-safe-write-atomic-rename, ref-zoo-code-lt-read-task-history-item, ref-zoo-code-lt-task-status-transitions, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-reconcile-scan, ref-zoo-code-lt-condense-summary-markers]
  - section_id: transcripts-index-and-state
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-history-store-no-index, ref-zoo-code-lt-reconcile-scan, ref-zoo-code-lt-reconcile-evict, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-checkpoint-shadow-path, ref-zoo-code-lt-checkpoint-global-storage-root, ref-zoo-code-lt-import-file-names]
  - section_id: transcripts-export-and-delete
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-export-task-markdown, ref-zoo-code-lt-export-file-name, ref-zoo-code-lt-import-file-names, ref-zoo-code-lt-import-staging-atomic, ref-zoo-code-lt-delete-task-cascade, ref-zoo-code-lt-delete-current-task-removed, ref-zoo-code-lt-delete-task-files, ref-zoo-code-lt-history-store-delete, ref-zoo-code-lt-reconcile-evict, ref-zoo-code-lt-reconcile-scan]
  - section_id: transcripts-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-lt-open-debug-history, ref-zoo-code-lt-diagnostics-api-history, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-ui-messages-parse-check, ref-zoo-code-lt-storage-task-dir, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-task-status-transitions, ref-zoo-code-lt-reconcile-scan]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-recorded-content
        status: answered
        source_refs: [ref-zoo-code-lt-global-file-names, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-ui-messages-write, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-storage-base-path, ref-zoo-code-lt-checkpoint-disabled-switch]
  - question_id: transcripts.location
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-zoo-code-lt-storage-base-path, ref-zoo-code-lt-storage-base-path-fallback, ref-zoo-code-lt-storage-task-dir, ref-zoo-code-lt-global-file-names, ref-zoo-code-lt-checkpoint-shadow-path, ref-zoo-code-lt-checkpoint-global-storage-root]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-zoo-code-lt-storage-task-dir, ref-zoo-code-lt-global-file-names, ref-zoo-code-lt-task-id-uuidv7, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-safe-write-stream-format]
  - question_id: transcripts.format
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-zoo-code-lt-safe-write-atomic-rename, ref-zoo-code-lt-safe-write-stream-format, ref-zoo-code-lt-ui-messages-write, ref-zoo-code-lt-api-messages-array-check]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-record-schema
        status: answered
        source_refs: [ref-zoo-code-lt-api-message-fields, ref-zoo-code-lt-api-message-condense-fields, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-api-legacy-migration, ref-zoo-code-lt-ui-messages-parse-check, ref-zoo-code-lt-cline-message-fields, ref-zoo-code-lt-history-item-schema-core, ref-zoo-code-lt-history-item-schema-lineage, ref-zoo-code-lt-global-file-names]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-zoo-code-lt-task-id-uuidv7, ref-zoo-code-lt-task-save-api-history, ref-zoo-code-lt-task-save-cline-messages, ref-zoo-code-lt-safe-write-atomic-rename, ref-zoo-code-lt-read-task-history-item, ref-zoo-code-lt-task-status-transitions, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-reconcile-scan, ref-zoo-code-lt-condense-summary-markers]
  - question_id: transcripts.database
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-index-and-state
        status: answered
        source_refs: [ref-zoo-code-lt-history-store-no-index, ref-zoo-code-lt-reconcile-scan, ref-zoo-code-lt-reconcile-evict, ref-zoo-code-lt-checkpoint-shadow-path, ref-zoo-code-lt-checkpoint-global-storage-root, ref-zoo-code-lt-import-file-names]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-export-and-delete
        status: partial
        source_refs: [ref-zoo-code-lt-export-task-markdown, ref-zoo-code-lt-export-file-name, ref-zoo-code-lt-import-file-names, ref-zoo-code-lt-import-staging-atomic]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-export-and-delete
        status: partial
        source_refs: [ref-zoo-code-lt-delete-task-cascade, ref-zoo-code-lt-delete-current-task-removed, ref-zoo-code-lt-delete-task-files, ref-zoo-code-lt-history-store-delete, ref-zoo-code-lt-reconcile-evict, ref-zoo-code-lt-reconcile-scan, ref-zoo-code-lt-import-file-names]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-zoo-code-lt-open-debug-history, ref-zoo-code-lt-diagnostics-api-history, ref-zoo-code-lt-api-messages-array-check, ref-zoo-code-lt-ui-messages-parse-check, ref-zoo-code-lt-storage-task-dir, ref-zoo-code-lt-history-item-fields, ref-zoo-code-lt-task-status-transitions, ref-zoo-code-lt-reconcile-scan]
---

Zoo Code 是 VS Code 扩展形态的 harness，catalog 只声明了 `vscode` 一个界面，本章全部答案只覆盖该界面。固定来源是 `source-zoo-code-repo`（`https://github.com/Zoo-Code-Org/Zoo-Code.git`）在 commit `d7963fc2db8ff07189e9f22079b15d67ad3a8bfd` 处的源码树，抓取时间 2026-10-06T04:35:39.019Z，产物为 `git_source_file`，target 是 `surface: ide` / `distribution: source-tree` / `os: linux` / `arch: x64` / `execution_mode: native`。

三点边界要先说清楚。第一，本章是 source-level 知识：源码 commit 只代表该源码树的行为，不证明任何已发布 VSIX 或市场发行包的行为，因此本章不写 `mappings/`。第二，源码树里同时存在 `apps/cli` 目录，但它没有在 catalog 中登记为界面，本章不为它写答案，查询会把它派生为未调查。第三，会话目录的根路径来自宿主 VS Code 提供的 `context.globalStorageUri`，源码不硬编码任何操作系统的绝对路径，所以具体落盘位置在 Linux、macOS、Windows 上由宿主决定，本章只给路径模板。

## 记录哪些内容、哪些开关影响它 {#transcripts-recorded-content}

一个任务在磁盘上留下三份记录，文件名由 `GlobalFileNames` 常量固定：`api_conversation_history.json`、`ui_messages.json`、`history_item.json` [@ref-zoo-code-lt-global-file-names]。分工是明确的：

- `ui_messages.json` 是 webview 展示用的消息列表，元素类型是 `ClineMessage`；保存时先给缺失的消息补标识符，再整份重写这个文件，可选地在文件锁内做读-改-写合并 [@ref-zoo-code-lt-ui-messages-write]。
- `api_conversation_history.json` 是实际发往模型的 API 消息历史。
- `history_item.json` 是历史列表条目，除 `id`、`number`、`ts` 外还写入由消息派生出的 token 用量统计、任务目录占用字节数、工作区路径、运行模式、provider profile 名，以及委派状态 [@ref-zoo-code-lt-history-item-fields]。

所以记录的是消息与工具事件本身，不是输入历史、调试日志或缓存。缓存目录虽然与 `tasks/` 同级，但不在本主题范围内。

两个正文文件都有严格的读取契约：`api_conversation_history.json` 必须能被 `JSON.parse` 解析成数组，否则读取抛出 `invalid` 类错误而不是静默容错 [@ref-zoo-code-lt-api-messages-array-check]。

开关方面，**没有关闭记录本身的开关**。`zoo-code.customStoragePath` 只决定记录落在哪里，不决定是否记录；为空时直接沿用宿主传入的默认路径 [@ref-zoo-code-lt-storage-base-path]。唯一影响"记录什么"的开关是 checkpoint：`enableCheckpoints` 为假时 `getCheckpointService` 直接返回 `undefined`，工作区文件快照停止产生，但两个消息文件照旧写入 [@ref-zoo-code-lt-checkpoint-disabled-switch]。

已查入口与剩余缺口：已查 `src/utils/storage.ts`、`src/core/task-persistence/`、`src/shared/globalFileNames.ts` 与 `src/core/checkpoints/index.ts` 中的记录开关与路径入口。本 commit 未发现任何"不落盘/不记录会话"的设置项，但这是源码树层面的否定结论，没有 runtime 观察佐证；本轮也未执行扩展。

## 存储位置、命名与格式 {#transcripts-storage-layout}

**位置。** 基准路径由 `getStorageBasePath` 决定：先读 `zoo-code.customStoragePath` 配置；非空时创建该目录并检查读写执行权限，权限不可用则弹出错误提示并回退到默认路径；为空或读取配置失败时直接用默认路径 [@ref-zoo-code-lt-storage-base-path] [@ref-zoo-code-lt-storage-base-path-fallback]。默认路径本身是调用方传入的宿主 `context.globalStorageUri.fsPath`，扩展自身不拼接任何操作系统目录。任务目录是 `{base}/tasks/{taskId}`，取用时会顺带创建 [@ref-zoo-code-lt-storage-task-dir]。

该设置项的声明位置、默认值与加载顺序由配置机制主题回答（`config.sources`、`config.defaults`），设置是否真正生效的排查路径见 `config.diagnostics`；本章只描述它如何改变记录落盘位置。下文的路径模板里，`{base}` 指这个基准路径，`{hostGlobalStorage}` 指未经 `getStorageBasePath` 处理的宿主 global storage 目录。

路径随环境变化的边界：宿主配置（`zoo-code.customStoragePath`）可以整体搬走记录；项目作用域不参与路径计算，`workspace` 只是 `history_item.json` 里的一个字段值，不是目录层级 [@ref-zoo-code-lt-history-item-fields]。**一个容易踩的例外是 checkpoint**：它的影子 git 根目录取的是未经 `getStorageBasePath` 处理的 `globalStorageDir`，落在 `{hostGlobalStorage}/tasks/{taskId}/checkpoints` [@ref-zoo-code-lt-checkpoint-global-storage-root] [@ref-zoo-code-lt-checkpoint-shadow-path]。也就是说改了 `customStoragePath` 之后，会话消息搬走了，工作区快照仍留在原处。

**命名。** 目录名就是任务 ID：新建任务用 `uuidv7()` 生成，恢复已有任务时直接沿用 `historyItem.id`，同时沿用其中的 `rootTaskId` 与 `parentTaskId` [@ref-zoo-code-lt-task-id-uuidv7]。文件名的另一半是固定常量表 [@ref-zoo-code-lt-global-file-names]。父任务与子任务的关联不编码进目录名，而是靠 `HistoryItem` 里的 `rootTaskId`、`parentTaskId`、`childIds`、`delegatedToId`、`awaitingChildId` 等字段表达 [@ref-zoo-code-lt-history-item-fields]。时间戳不进文件名，只作为 `ts` 字段存进 `history_item.json`；唯一按时间命名的是导出文件（见归档一节）。

**格式。** 三个文件都是 UTF-8 的 JSON。会话文件默认写成紧凑 JSON（`prettyPrint` 缺省为假，不缩进），用流式序列化直接落盘 [@ref-zoo-code-lt-safe-write-stream-format]。写入不是原地覆盖：先写同目录下的临时文件，若目标已存在则先改名为 `.bak` 临时文件，然后把新临时文件 `rename` 到目标路径——这一步 rename 就是提交点 [@ref-zoo-code-lt-safe-write-atomic-rename]。整个过程在咨询文件锁内进行，配合 `merge` 回调把"盲覆盖"变成原子读-改-写。**没有分片，没有压缩，没有 JSONL**：源码里会话记录只有整份 JSON 数组这一种形态 [@ref-zoo-code-lt-ui-messages-write] [@ref-zoo-code-lt-api-messages-array-check]。

已查入口与剩余缺口：`getStorageBasePath` 之外，宿主 `globalStorageUri` 在各操作系统上的实际绝对路径由 VS Code 决定，不在本仓库源码内，因此本章不给 Linux、macOS、Windows 各自的路径模板；本轮也没有在 Windows 或 macOS 上运行过扩展。

## 记录类型与字段 {#transcripts-record-schema}

三个记录类型都是第一方定义，且类型定义随源码树一起提供。下面按 `api_conversation_history.json`、`ui_messages.json`、`history_item.json` 这三个固定文件名 [@ref-zoo-code-lt-global-file-names] 逐一说明。

**`api_conversation_history.json` 的元素类型 `ApiMessage`** 是 Anthropic `MessageParam` 再叠加一组本地簿记字段：`messageId`、`ts`、`isSummary`、`id`，以及用于推理内容的 `type`、`summary`、`encrypted_content`、`text`、`reasoning_details`、`reasoning_content` [@ref-zoo-code-lt-api-message-fields]。同一类型还承载上下文压缩与滑窗截断的标记字段：`condenseId` 与 `condenseParent`（摘要消息标识与"被该摘要替代"的指针）、`truncationId` 与 `truncationParent`、`isTruncationMarker` [@ref-zoo-code-lt-api-message-condense-fields]。

**`ui_messages.json` 的元素类型 `ClineMessage`** 的 schema 定义在仓库内的 `@roo-code/types` 包里：必填 `ts`（毫秒时间戳）与 `type`（`ask` 或 `say`），可选 `messageId`、`ask`、`say`、`text`、`images`、`partial`、`reasoning`、`conversationHistoryIndex`、`checkpoint`、`progressStatus` [@ref-zoo-code-lt-cline-message-fields]。`ask` 的取值是闭合枚举，例如 `command`、`command_output`、`tool`、`resume_task`、`use_mcp_server` 等，即"请求用户批准或提供输入"的事件类型；`say` 覆盖助手侧的各类播报。

**`history_item.json` 的 `HistoryItem`** 必填 `id`、`number`、`ts`、`task`、`tokensIn`、`tokensOut`、`totalCost`，可选 `rootTaskId`、`parentTaskId`、`cacheWrites`、`cacheReads`、`size`、`workspace`、`mode`、`apiConfigName` [@ref-zoo-code-lt-history-item-schema-core]，以及委派相关字段 `status`（`active` / `completed` / `delegated` / `interrupted` 四值枚举）、`delegatedToId`、`childIds`、`awaitingChildId`、`completedByChildId`、`completionResultSummary` 和一个 `pendingAction` 判别联合 [@ref-zoo-code-lt-history-item-schema-lineage]。

脱敏的最小完整示例（占位值，直接对应上面三个文件）：

```json
// {base}/tasks/{taskId}/history_item.json
{
  "id": "{task-uuid}",
  "number": 1,
  "ts": 0,
  "task": "{first user message, trimmed}",
  "tokensIn": 0,
  "tokensOut": 0,
  "totalCost": 0,
  "workspace": "{workspace path recorded at task creation}",
  "status": "active"
}
```

```json
// {base}/tasks/{taskId}/ui_messages.json
[
  { "ts": 0, "type": "say", "say": "task", "text": "{task text}" },
  { "ts": 0, "type": "ask", "ask": "command", "text": "{command awaiting approval}", "partial": false }
]
```

```json
// {base}/tasks/{taskId}/api_conversation_history.json
[
  { "role": "user", "content": "{text block}", "messageId": "{uuid}", "ts": 0 },
  { "role": "assistant", "content": "{content blocks}", "messageId": "{uuid}", "ts": 0 }
]
```

**版本迁移规则**只有一条可从固定来源证实：读取时如果新文件不存在而旧文件 `claude_messages.json` 存在，就把旧内容解析后写进 `api_conversation_history.json` 再删除旧文件 [@ref-zoo-code-lt-api-legacy-migration]。两个文件的顶层都必须是 JSON 数组，否则按无效记录报错 [@ref-zoo-code-lt-api-messages-array-check] [@ref-zoo-code-lt-ui-messages-parse-check]。

**仍缺的具体 schema 缺口**：`ClineMessage.say` 的完整取值枚举、`progressStatus` 与 `checkpoint` 的内部结构、以及 `ClineMessage` 各字段的语义细则在本 commit 的记录链路上没有被完整引用，本章不代替上游类型包给出完整枚举；`api_conversation_history.json` 里 `content` 块的形态随所用 provider 变化（OpenAI 与 Anthropic 协议不同），固定来源只保证它是 `MessageParam` 的内容，没有单一闭合 schema。

## 生命周期：创建、追加、刷盘、恢复、委派与压缩 {#transcripts-lifecycle}

**创建。** 新任务在构造时确定身份：没有传入历史条目就用 `uuidv7()` 生成 `taskId`，`rootTaskId` / `parentTaskId` 取自父任务；传入历史条目时全部沿用历史记录里的值 [@ref-zoo-code-lt-task-id-uuidv7]。

**追加与刷盘。** 每条 UI 消息和 API 历史变更都会触发一次保存，两个保存函数默认 `merge = true`，即在文件锁内读出当前内容再合并写入；保存失败只记录日志并保留内存中的内容，不会中断任务 [@ref-zoo-code-lt-task-save-api-history]。UI 消息保存之后紧接着重算历史条目（token 用量、目录大小、工作区、状态）并写回 `history_item.json` [@ref-zoo-code-lt-task-save-cline-messages]。刷盘的提交点是临时文件到目标文件的 `rename`，在此之前目标文件要么是旧版本、要么是 `.bak` 备份 [@ref-zoo-code-lt-safe-write-atomic-rename]。因为每次都是整份重写加合并，本地文件始终是"截至此刻的完整快照"，不是增量日志。

**关闭与恢复。** 重新打开一个历史任务时，先从历史条目解析出任务目录与记录文件路径，再据此重新实例化任务对象 [@ref-zoo-code-lt-read-task-history-item]。恢复不需要额外索引文件：启动时扫描 `tasks/` 目录重建内存视图，磁盘上有而缓存里没有的补进来，文件已消失的逐出 [@ref-zoo-code-lt-reconcile-scan]。

**交给子代理。** 委派通过状态机表达，允许的迁移只有 `active → delegated / completed / interrupted`、`delegated → active`、`interrupted → completed`，`completed` 是终态，非法迁移会抛 `LifecycleTransitionError` [@ref-zoo-code-lt-task-status-transitions]。父记录的 `awaitingChildId` / `delegatedToId` 与子记录的 `parentTaskId` / `rootTaskId` 一起表达分支关系，状态本身落在 `history_item.json` 里 [@ref-zoo-code-lt-history-item-fields]。启动阶段还会针对上次崩溃留下的委派不一致做修复：父任务处于 `delegated` 却没有 `awaitingChildId`、或子任务已不存在等情况，都会被回退到 `active` [@ref-zoo-code-lt-reconcile-scan]。

**上下文压缩后延续。** 压缩不是删除历史，而是追加一条带 `isSummary` 与唯一 `condenseId` 的摘要消息；被摘要替代的旧消息保留在文件里，只是被打上 `condenseParent` 指针，发往 API 前才被过滤掉 [@ref-zoo-code-lt-condense-summary-markers]。因此压缩后的会话文件体积不会明显下降，但上下文可以继续。

## 索引、缓存与 checkpoint 状态 {#transcripts-index-and-state}

**这个产品不用数据库。** `TaskHistoryStore` 的类注释直接写明：每个任务的 `HistoryItem` 各自存放在自己的任务目录里，**没有共享索引文件，读取靠扫描任务目录** [@ref-zoo-code-lt-history-store-no-index]。所以分工是：JSON 文件是唯一持久化载体，内存 `Map` 只是按 mtime 刷新的缓存，目录本身就是索引。扫描会跳过 `_` 和 `.` 前缀的目录名，因此导入用的临时目录与写入用的 `.bak` / `.new_*.tmp` 临时文件不会混进列表 [@ref-zoo-code-lt-reconcile-scan]。

缓存逐出规则是"文件不在就逐出"：`history_item.json` 消失的任务会从缓存移除 [@ref-zoo-code-lt-reconcile-evict]；反过来说，只删这个文件会让任务从列表里消失，但任务目录和两个消息文件仍留在磁盘上。

**与数据库分工的第二块状态是 checkpoint。** 工作区文件快照放在每个任务一个的影子 git 仓库里，路径是 `{shadowDir}/tasks/{taskId}/checkpoints` [@ref-zoo-code-lt-checkpoint-shadow-path]，而 `shadowDir` 直接取宿主 global storage 目录，不受 `customStoragePath` 影响 [@ref-zoo-code-lt-checkpoint-global-storage-root]。它存的是文件内容历史，不是会话正文。

**恢复所必需的最小文件集**可以从导入路径反推：产品把这四个文件视为"一个可迁移的任务"，即 `history_item.json`、`ui_messages.json`、`api_conversation_history.json`、`task_metadata.json` [@ref-zoo-code-lt-import-file-names]。其中 `history_item.json` 决定任务是否出现在列表里并提供恢复所需的元数据，两个消息文件是会话正文；`task_metadata.json` 在当前写路径里没有对应的写入方，本次未确认它的产生条件。

**能否重建**：消息正文不能重建，只能重新生成；`history_item.json` 可以从目录名与消息文件重新算出大部分字段（ID、token、目录大小都来自这些输入）[@ref-zoo-code-lt-history-item-fields]，但委派状态字段（`status`、`childIds` 等）依赖当时的运行时状态，源码没有提供从消息文件反推它们的路径。checkpoint 影子仓库一旦丢失，工作区文件的历史版本无法从会话记录重建。

## 导出、导入与删除 {#transcripts-export-and-delete}

**导出是 Markdown 快照，不是归档。** 导出入口取历史条目和 API 对话历史，交给 `downloadTask` 生成 Markdown，由用户在保存对话框中选择位置，默认目录是用户主目录下的 `Downloads`，并会记住上次导出路径 [@ref-zoo-code-lt-export-task-markdown]。文件名由任务时间戳拼成，形态是 `roo_task_{mon}-{d}-{y}_{h}-{m}-{s}-{am|pm}.md` [@ref-zoo-code-lt-export-file-name]。

导出的信息损失是明确的：进入 Markdown 的只有 API 对话历史，`ui_messages.json` 里的审批事件、webview 展示内容、`history_item.json` 里的元数据与委派状态、以及 checkpoint 影子仓库都不在导出范围内 [@ref-zoo-code-lt-export-task-markdown]。因此导出文件不能当作可回灌的备份。

**导入走的是另一条路**：产品提供的是从 Roo Code 扩展的存储根导入历史任务，识别的是上表那四个 JSON 文件，不是导出的 Markdown [@ref-zoo-code-lt-import-file-names]。导入先为每个任务建一个带前缀的临时目录再原子改名就位，避免中途失败留下半成品目录被后续重试当成"已存在"跳过 [@ref-zoo-code-lt-import-staging-atomic]。导入时还会校验 `history_item.json` 能解析成 `HistoryItem`、其 `id` 与目录名一致，并拒绝含路径分隔符、点或 `_` / `.` 前缀的任务 ID [@ref-zoo-code-lt-import-file-names]。

**删除。** 官方删除入口是按 ID 删除任务，默认级联：函数注释与实现都表明有子任务时会递归删除子任务 [@ref-zoo-code-lt-delete-task-cascade]；若目标任务还在当前任务栈里，会先把它从栈里关掉再动文件 [@ref-zoo-code-lt-delete-current-task-removed]；随后对每个 ID 先尝试删除关联的影子仓库或分支，再用 `fs.rm(dir, { recursive: true, force: true })` 删掉整个任务目录 [@ref-zoo-code-lt-delete-task-files]。历史条目层面的删除是在写锁内先移出内存缓存再尽力 unlink `history_item.json`，unlink 失败会被吞掉，因为文件可能已经不在 [@ref-zoo-code-lt-history-store-delete]。

**手动删文件的后果**，按上面这套机制可以逐项推断：

- 删 `history_item.json`：任务从列表逐出，但目录与两个消息文件残留成为孤儿 [@ref-zoo-code-lt-reconcile-evict]。恢复途径是自行重建该文件；委派状态字段无法从消息文件反推。
- 删 `ui_messages.json`：任务仍在列表里（`history_item.json` 完好），但会话正文读不出来。
- 删整个任务目录而保留外部备份：列表条目会因逐出而消失 [@ref-zoo-code-lt-reconcile-scan]；反之把目录整体拷回原路径，扫描会重新收录，前提是 ID 未被其他任务占用。
- 删除前必须停止的写入者：正在向该任务目录写入的扩展实例。产品内部的删除走的是同一把文件锁，所以自身不会写坏；但在扩展仍打开该任务并继续保存时手工删目录，内存中的历史与磁盘会分叉，本章未在固定来源里找到对应的自愈路径。

**保留机制：本 commit 的源码里没有找到。** 已查入口包括 `src/core/task-persistence/` 的删除与对账路径、`src/core/webview/ClineProvider.ts` 的任务删除入口，以及在 `src/` 下按保留期、清理、修剪等关键词的检索，未发现任务目录的自动保留期或自动清理逻辑。因此本题只能给 `partial`：删除机制有源码证据，保留机制只有"未找到"的否定结论，而"没找到"不等于"可以安全删除"。

## 定位、读取与排错 {#transcripts-diagnostics}

**产品内的读取入口**有两个，都走 webview 消息：

- 调试视图按当前任务拼出任务目录，分别读 `api_conversation_history.json` 与 `ui_messages.json`；文件不存在会明确报出缺哪个文件，解析失败会提示解析错误，然后把内容格式化后写到系统临时目录并在编辑器里打开 [@ref-zoo-code-lt-open-debug-history]。
- 错误诊断包从同一个任务目录读 `api_conversation_history.json`，与错误元数据（时间戳、扩展版本、provider、模型、详情）组合成一个 JSON 交给用户 [@ref-zoo-code-lt-diagnostics-api-history]。

**完整性与状态的检查方式**，从读取契约反推：两个正文文件都必须是 JSON 数组，否则读取侧按无效记录报错 [@ref-zoo-code-lt-api-messages-array-check] [@ref-zoo-code-lt-ui-messages-parse-check]；列表层面的一致性由启动扫描与周期性对账保证，任务在磁盘上而缓存里没有会被补进来，缓存里有而磁盘上没有会被逐出 [@ref-zoo-code-lt-reconcile-scan]。要人工核对某个任务，直接看 `{base}/tasks/{taskId}/` 下这三个文件是否存在、能否解析成数组，并核对 `history_item.json` 里的 `workspace`、`number`、`ts` 与任务目录名是否一致；委派相关的 `status` 取值只能是四值枚举之一，非法组合在写入时就会被状态机拒绝 [@ref-zoo-code-lt-task-status-transitions]。`history_item.json` 里的 `size` 是任务目录占用字节数，可用来粗判记录是否被截断 [@ref-zoo-code-lt-history-item-fields]。

**为备份、恢复、清理排错时的定位起点**是任务目录模板 `{base}/tasks/{taskId}/`，其中 `{base}` 是 `zoo-code.customStoragePath` 指向的目录，未设置时为宿主 global storage 目录 [@ref-zoo-code-lt-storage-task-dir]。checkpoint 相关问题要改看另一处根目录 `{hostGlobalStorage}/tasks/{taskId}/checkpoints`，因为它不随 `customStoragePath` 迁移。

已查入口与剩余缺口：源码里没有"检查全部任务完整性"或"校验记录库"的产品内命令，本章的排错建议由读取契约与对账逻辑推导而来，未在固定来源中找到官方校验流程；本轮也没有运行扩展做 runtime 观察，所有结论都停留在该 commit 的源码树层面。
