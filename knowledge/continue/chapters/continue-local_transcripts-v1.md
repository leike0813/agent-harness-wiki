---
schema_version: 3
record_kind: production
edition_id: continue-local_transcripts-v1
harness_id: continue
topic: local_transcripts
title: "Continue CLI 的本地 Transcript：落盘范围、存储布局、schema、生命周期与归档清理"
sections:
  - section_id: transcripts-what-gets-recorded
    surface_ids: [cli]
    source_refs: [ref-continue-lt-session-types, ref-continue-lt-tool-call-state-type, ref-continue-lt-tool-status-values, ref-continue-lt-tool-call-state-update, ref-continue-lt-persist-filter, ref-continue-lt-has-content-guard, ref-continue-lt-save-session-write, ref-continue-lt-subagent-child-history, ref-continue-lt-subagent-parent-record, ref-continue-lt-input-history-file, ref-continue-lt-input-history-cap, ref-continue-lt-cli-log-path, ref-continue-lt-storage-sync-start, ref-continue-lt-storage-upload-interval]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-continue-lt-continue-home-env, ref-continue-lt-global-dir-resolution, ref-continue-lt-continue-global-path, ref-continue-lt-sessions-folder-path, ref-continue-lt-session-file-paths, ref-continue-lt-cli-session-dir, ref-continue-lt-cli-session-file-path, ref-continue-lt-sessions-list-read, ref-continue-lt-sessions-list-filter, ref-continue-lt-save-key-order, ref-continue-lt-save-list-metadata, ref-continue-lt-save-list-entry, ref-continue-lt-metadata-preview-fields, ref-continue-lt-start-new-session-id, ref-continue-lt-load-latest-by-mtime, ref-continue-lt-load-latest-read]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-continue-lt-session-types, ref-continue-lt-tool-call-state-type, ref-continue-lt-tool-status-values, ref-continue-lt-persist-filter, ref-continue-lt-metadata-preview, ref-continue-lt-metadata-preview-fields, ref-continue-lt-load-session-read, ref-continue-lt-load-session-fallback, ref-continue-lt-export-envelope-guard]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-continue-lt-save-session-write, ref-continue-lt-has-content-guard, ref-continue-lt-persist-on-change, ref-continue-lt-tool-call-state-update, ref-continue-lt-compact-and-clear, ref-continue-lt-compacted-history, ref-continue-lt-edit-rewind-history, ref-continue-lt-init-chat-history, ref-continue-lt-load-session-read, ref-continue-lt-load-or-create-by-id, ref-continue-lt-resume-fork-init, ref-continue-lt-start-new-session-id, ref-continue-lt-tui-load-session, ref-continue-lt-session-command-handlers]
  - section_id: transcripts-databases
    surface_ids: [cli]
    source_refs: [ref-continue-lt-sessions-folder-path, ref-continue-lt-session-file-paths, ref-continue-lt-index-db-paths, ref-continue-lt-devdata-sqlite-path, ref-continue-lt-save-list-metadata, ref-continue-lt-save-list-entry, ref-continue-lt-metadata-preview, ref-continue-lt-load-session-fallback]
  - section_id: transcripts-archive-export
    surface_ids: [cli]
    source_refs: [ref-continue-lt-tui-export-session, ref-continue-lt-export-envelope-guard, ref-continue-lt-import-handler, ref-continue-lt-import-save-result, ref-continue-lt-session-command-handlers, ref-continue-lt-core-history-clear, ref-continue-lt-share-markdown-export, ref-continue-lt-share-markdown-file, ref-continue-lt-sessions-list-filter, ref-continue-lt-cli-session-file-path]
  - section_id: transcripts-cleanup-and-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-lt-core-history-protocol, ref-continue-lt-core-history-clear, ref-continue-lt-delete-session-file, ref-continue-lt-delete-list-entry, ref-continue-lt-clear-all-sessions, ref-continue-lt-sessions-list-read, ref-continue-lt-metadata-preview, ref-continue-lt-ls-json-output, ref-continue-lt-resume-fork-flags, ref-continue-lt-verbose-log-hint, ref-continue-lt-cli-log-path, ref-continue-lt-init-chat-history, ref-continue-lt-has-content-guard, ref-continue-lt-save-session-write, ref-continue-lt-load-latest-read, ref-continue-lt-save-list-entry, ref-continue-lt-session-command-handlers]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-what-gets-recorded
        status: partial
        source_refs: [ref-continue-lt-session-types, ref-continue-lt-tool-call-state-type, ref-continue-lt-tool-status-values, ref-continue-lt-tool-call-state-update, ref-continue-lt-persist-filter, ref-continue-lt-has-content-guard, ref-continue-lt-save-session-write, ref-continue-lt-subagent-child-history, ref-continue-lt-subagent-parent-record, ref-continue-lt-input-history-file, ref-continue-lt-input-history-cap, ref-continue-lt-cli-log-path, ref-continue-lt-storage-sync-start, ref-continue-lt-storage-upload-interval]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-continue-lt-continue-home-env, ref-continue-lt-global-dir-resolution, ref-continue-lt-continue-global-path, ref-continue-lt-sessions-folder-path, ref-continue-lt-session-file-paths, ref-continue-lt-cli-session-dir, ref-continue-lt-sessions-list-filter]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-continue-lt-cli-session-file-path, ref-continue-lt-start-new-session-id, ref-continue-lt-save-list-entry, ref-continue-lt-metadata-preview-fields, ref-continue-lt-sessions-list-read, ref-continue-lt-load-latest-by-mtime, ref-continue-lt-load-latest-read]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-continue-lt-save-key-order, ref-continue-lt-save-list-metadata, ref-continue-lt-cli-session-dir, ref-continue-lt-session-file-paths]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-continue-lt-session-types, ref-continue-lt-tool-call-state-type, ref-continue-lt-tool-status-values, ref-continue-lt-persist-filter, ref-continue-lt-metadata-preview-fields, ref-continue-lt-load-session-read, ref-continue-lt-load-session-fallback, ref-continue-lt-export-envelope-guard]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-continue-lt-save-session-write, ref-continue-lt-has-content-guard, ref-continue-lt-persist-on-change, ref-continue-lt-tool-call-state-update, ref-continue-lt-compacted-history, ref-continue-lt-edit-rewind-history, ref-continue-lt-init-chat-history, ref-continue-lt-load-session-read, ref-continue-lt-load-or-create-by-id, ref-continue-lt-resume-fork-init, ref-continue-lt-start-new-session-id, ref-continue-lt-tui-load-session, ref-continue-lt-session-command-handlers]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-databases
        status: answered
        source_refs: [ref-continue-lt-sessions-folder-path, ref-continue-lt-session-file-paths, ref-continue-lt-index-db-paths, ref-continue-lt-devdata-sqlite-path, ref-continue-lt-save-list-metadata, ref-continue-lt-save-list-entry, ref-continue-lt-metadata-preview, ref-continue-lt-load-session-fallback]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-export
        status: partial
        source_refs: [ref-continue-lt-tui-export-session, ref-continue-lt-export-envelope-guard, ref-continue-lt-import-handler, ref-continue-lt-import-save-result, ref-continue-lt-session-command-handlers, ref-continue-lt-core-history-clear, ref-continue-lt-share-markdown-export, ref-continue-lt-share-markdown-file, ref-continue-lt-sessions-list-filter, ref-continue-lt-cli-session-file-path]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-diagnostics
        status: partial
        source_refs: [ref-continue-lt-core-history-protocol, ref-continue-lt-core-history-clear, ref-continue-lt-delete-session-file, ref-continue-lt-delete-list-entry, ref-continue-lt-clear-all-sessions, ref-continue-lt-metadata-preview, ref-continue-lt-has-content-guard, ref-continue-lt-save-session-write]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-diagnostics
        status: partial
        source_refs: [ref-continue-lt-ls-json-output, ref-continue-lt-session-command-handlers, ref-continue-lt-resume-fork-flags, ref-continue-lt-verbose-log-hint, ref-continue-lt-cli-log-path, ref-continue-lt-save-session-write, ref-continue-lt-load-latest-read, ref-continue-lt-save-list-entry, ref-continue-lt-sessions-list-read]
---

适用性说明：本章只覆盖 catalog 中登记的 `cli`（Continue CLI，`cn`）界面。`vscode` 与 `jetbrains` 两个界面在 catalog 中已声明，但本轮没有取到能证明其会话记录落盘入口与键名的证据，因此不写答案，查询会派生为 `not_investigated`。章节内所有结论都固定到同一批源码快照：来源仓库 `https://github.com/continuedev/continue.git`，commit `5522c6f44ca0ac3528b37244818fbfa39b5af470`，抓取时间 `2026-10-06T05:33:00.000Z`。来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）：它不证明任何具体已发布版本的行为，也不证明 npm 发行包的行为，本轮因此不写 `mappings/`。目标固定为 linux / x64 / native 的源码树观察，其余操作系统与宿主的路径语义未在本轮逐项验证。

## 记录了什么：会话正文、工具事件与被排除的内容 {#transcripts-what-gets-recorded}

CLI 把「当前会话的完整历史数组」当作唯一的会话记录，每次历史变化都把整份数组写进一个 JSON 文件（写入时机见[记录 schema 与生命周期](#transcripts-lifecycle)）。会话对象顶层字段是 `sessionId`、`title`、`workspaceDirectory`、`history` 四项必填，加三个可选的 `mode`、`chatModelTitle`、`usage`；`usage` 记录整场会话累计的费用与 token。[@ref-continue-lt-session-types]

历史数组的元素是 `ChatHistoryItem`：必填 `message` 与 `contextItems`，可选 `editorState`、`promptLogs`、`toolCallStates`、`isGatheringContext`、`reasoning`、`appliedRules`、`conversationSummary`。`toolCallStates` 只出现在带工具调用的 assistant 消息上，每项含 `toolCallId`、`toolCall`、`status`、`parsedArgs`，以及执行后写入的 `output`（`ContextItem[]`）。[@ref-continue-lt-tool-call-state-type]

**工具调用与工具结果都落盘，但不是独立的消息行**：`status` 是一个六值枚举 `generating` / `generated` / `calling` / `errored` / `done` / `canceled`，注释分别说明「参数还在流式生成」「已生成待批准」「正在执行」「执行报错」「成功完成」「被取消」；`addToolResult` 找到发起该调用的那条 assistant 消息，把结果包成 `{name: "Tool Result", description: "Tool execution result", content: ...}` 写进它的 `toolCallStates.output`，而不是新增一条 `role: "tool"` 的历史项。因此工具事件的完整状态轨迹可以在会话文件里复原，但只能顺着 `toolCallId` 反查。[@ref-continue-lt-tool-status-values][@ref-continue-lt-tool-call-state-update]

**落盘前有一次过滤**：`getSessionPersistenceSnapshot` 先剔除 `message.role === "system"` 的条目，再给每条 user 消息补上 `editorState`（值等于该消息的内容本身）。所以系统提示词不会进会话文件，历史里只会出现 user、assistant 以及挂在 assistant 上的工具状态。[@ref-continue-lt-persist-filter]

**没有非 system 内容就不写盘**：`hasSessionContent` 要求历史里至少有一条非 system 消息，`saveSession` 在不满足时直接返回，不产生文件也不更新列表。这一条决定了 `/clear` 之后文件既不会被清空也不会立刻消失（见[归档、备份与删除](#transcripts-cleanup-and-diagnostics)）。[@ref-continue-lt-has-content-guard][@ref-continue-lt-save-session-write]

**子代理不产生独立会话文件**：`executeSubAgent` 把 `ChatHistoryService` 的 `isReady` 临时改成返回 `false`（注释写明是为了让子会话不干扰主服务），子代理的历史只是一个进程内的局部数组；流式输出通过 `addToolResult` 增量写回**父会话**同一条工具调用的 `output`。子代理内部的中间消息、工具调用在磁盘上不留独立记录。子代理本身的定义与委派机制属于 custom agents 主题（`custom_agents.roles`）。[@ref-continue-lt-subagent-child-history][@ref-continue-lt-subagent-parent-record]

**输入历史与日志是另外两个文件，不属于会话记录**：`input_history.json` 是纯输入框历史（`{text, timestamp}` 数组，重复文本先移除，新的置顶，上限 1000 条），日志固定写在 `{continueHome}/logs/cn.log`。它们不随会话走，也不参与 `--resume` 的恢复。[@ref-continue-lt-input-history-file][@ref-continue-lt-input-history-cap][@ref-continue-lt-cli-log-path]

**唯一一条让记录离开本机的路径**：`cn serve --id AGENT_ID` 会调用 `StorageSyncService.startFromOptions({ storageOption: options.id })`，凭 Continue API key 换一对预签名 URL，然后默认每 30 秒把状态快照上传一次。缺 storage id 或缺 API key 时直接跳过上传并记 warn。[@ref-continue-lt-storage-sync-start][@ref-continue-lt-storage-upload-interval]

**缺口（本条使 `transcripts.scope` 记为 partial）**：固定来源里 `saveSession` 由消息处理链无条件调用，我没有找到任何配置项、环境变量或命令行选项可以关闭落盘、缩小落盘范围或设置保留期。这只是「本轮来源中没有找到开关」，不等于产品确认不存在这种能力；要给出确定结论需要官方文档或运行期验证，而本产品在 `archive/` 下没有已归档的官方文档原件。

## 存储位置、命名与写入格式 {#transcripts-storage-layout}

**只有一个目录：`{continueHome}/sessions/`**。`continueHome` 在 CLI 侧是 `process.env.CONTINUE_GLOBAL_DIR || path.join(os.homedir(), ".continue")`；core 侧另有一份等价实现，额外把相对的 `CONTINUE_GLOBAL_DIR` 按当前工作目录解析成绝对路径。两处默认值相同，因此正常情况下 CLI 与 core 读写的是同一个目录。全局目录本身的取用优先级属于配置机制主题（`config.sources`）；本章只固定它如何影响会话记录的落盘位置。[@ref-continue-lt-continue-home-env][@ref-continue-lt-global-dir-resolution]

目录按需创建：`getContinueGlobalPath()`、`getSessionsFolderPath()` 与 CLI 自己的 `getSessionDir()` 都会在路径不存在时 `mkdir` 之后再返回。CLI 那份在测试模式下（设置了 `CONTINUE_CLI_TEST` 且有 `HOME`）固定落到 `$HOME/.continue/sessions`。[@ref-continue-lt-continue-global-path][@ref-continue-lt-sessions-folder-path][@ref-continue-lt-cli-session-dir]

**没有项目级作用域，也没有宿主级切换**。工作区不参与路径计算，只作为 `workspaceDirectory` 字段写进会话文件与 `sessions.json`，并在列会话时可按小写相等做过滤。会话文件不按项目或工作区分目录，多项目会话混在同一目录里。[@ref-continue-lt-sessions-list-filter]

目录里只有两类文件：[@ref-continue-lt-session-file-paths]

| 文件 | 内容 | 由谁维护 |
| :-- | :-- | :-- |
| `{sessionId}.json` | 单个会话的完整对象（`sessionId`/`title`/`workspaceDirectory`/`history` 及可选字段） | 每次历史变更整文件覆盖 |
| `sessions.json` | `BaseSessionMetadata[]`，每项含 `sessionId`、`title`、`dateCreated`、`workspaceDirectory`、`messageCount` | 每次保存后重写；不存在时自动写入 `[]` |

**命名**：`sessionId` 是 `uuidv4()`，文件名就是 `{uuid}.json`；`startNewSession` 每次生成新的 uuid，`createSession` 也用 uuid，只有 `cn serve` 那条路径会沿用调用方给定的 id。文件名里没有时间戳、没有项目路径编码、没有可读标题。[@ref-continue-lt-start-new-session-id][@ref-continue-lt-cli-session-file-path]

时间信息只存在于 `sessions.json`：`dateCreated` 写成 `String(Date.now())`（毫秒数字的字符串），且只在某个 id 首次入库时写入，之后保存不再更新；CLI 列表展示时改用会话文件的 `birthtime` 拼 ISO 时间，所以两个时间可能不一致（后者受复制文件、恢复备份影响）。[@ref-continue-lt-save-list-entry][@ref-continue-lt-metadata-preview-fields]

**格式**：单文件 JSON，`JSON.stringify(x, undefined, 2)` 两空格缩进，写入方式是 `fs.writeFileSync` —— **整文件覆盖，没有追加、没有 JSONL、没有分片、没有压缩**。写入前显式重排键顺序以固定输出形态：`sessionId` → `title` → `workspaceDirectory` → `history` → 可选的 `mode` / `chatModelTitle` / `usage`，其余字段一律不落盘。`sessions.json` 同样整文件重写。[@ref-continue-lt-save-key-order][@ref-continue-lt-save-list-metadata]

**读取规则**：`HistoryManager.list` 读 `sessions.json`，过滤掉带 `session_id` 字段的旧格式条目（不是 `sessionId`），再反转成「最新在前」，然后按 `workspaceDirectory` 与可选的 `limit`/`offset` 截取。`--resume` 不走这个列表：它直接扫描 `sessions` 目录下除 `sessions.json` 外的所有 `.json`，按文件 mtime 倒序取第一个并 `JSON.parse` 整份文件。解析失败或文件不可读时 CLI 的 `loadSession()` 记一条 `Error loading session:` 日志并返回 `null`，调用方再退回空会话（core 的 `HistoryManager.load` 是另一套行为，见[记录 schema](#transcripts-record-schema)）。[@ref-continue-lt-sessions-list-read][@ref-continue-lt-load-latest-by-mtime][@ref-continue-lt-load-latest-read]

**父子与分支关系在文件里没有表达**：`Session` 与 `BaseSessionMetadata` 都没有父会话或来源会话字段，会话之间也不互相引用。`--fork SESSION_ID` 的语义是「把源会话的 history 复制进一个新 uuid 的会话」，所以 fork 之后新旧两个文件内容相同但没有任何链接。[@ref-continue-lt-resume-fork-init]

## 记录 schema：一个脱敏的最小完整会话文件 {#transcripts-record-schema}

下面的示例按 `Session` 类型、落盘前的过滤规则与固定键顺序拼出，值全部是占位符，不含任何真实会话、路径或凭据：

```json
{
  "sessionId": "uuid-v4",
  "title": "Untitled Session",
  "workspaceDirectory": "/absolute/workspace/path",
  "history": [
    {
      "message": { "role": "user", "content": "user input text" },
      "contextItems": [],
      "editorState": "user input text"
    },
    {
      "message": {
        "role": "assistant",
        "content": "assistant text",
        "toolCalls": [
          {
            "id": "tool-call-id",
            "type": "function",
            "function": { "name": "tool-name", "arguments": "{\"key\": \"value\"}" }
          }
        ]
      },
      "contextItems": [],
      "toolCallStates": [
        {
          "toolCallId": "tool-call-id",
          "toolCall": {
            "id": "tool-call-id",
            "type": "function",
            "function": { "name": "tool-name", "arguments": "{\"key\": \"value\"}" }
          },
          "status": "done",
          "parsedArgs": {},
          "output": [
            {
              "name": "Tool Result",
              "description": "Tool execution result",
              "content": "tool output text"
            }
          ]
        }
      ]
    }
  ],
  "usage": {
    "totalCost": 0,
    "promptTokens": 0,
    "completionTokens": 0,
    "promptTokensDetails": { "cachedTokens": 0, "cacheWriteTokens": 0 }
  }
}
```

字段口径：`title` 新会话默认 `Untitled Session`；`workspaceDirectory` 是创建会话时的 `process.cwd()`，之后不再刷新；`message.toolCalls` 与 `toolCallStates[].toolCall` 是同一份调用的两处副本，参数在 `toolCall.function.arguments` 里始终是字符串；`parsedArgs` 是对该字符串的 JSON 解析结果，解析失败时是 `{}`；`usage.totalCost` 是美元累计值，其余三个是 token 计数。[@ref-continue-lt-session-types][@ref-continue-lt-tool-call-state-type][@ref-continue-lt-tool-status-values]

落盘形态还有两处必须知道的加工：system 消息被剔除；每条 user 消息被补一个 `editorState`。这两条改写在写文件之前发生，因此**磁盘上的会话文件里没有 system 消息，却有 `editorState`**。[@ref-continue-lt-persist-filter]

**没有 schema 版本，也就没有版本迁移**。会话文件本身不带任何版本字段；`version` 只出现在导出信封 `{version: 1, exportedAt, session}` 里，`/import` 也只校验这一个数字。跨版本读取靠宽松解析：字段缺失就是 `undefined`，`historyManager.load` 在解析抛错时吞掉异常并返回 `{history: [], title: "New Session", workspaceDirectory: "", sessionId: <请求的 id>}` —— 也就是说损坏的会话文件不会让 CLI 崩溃，而是以一份空会话继续对话。[@ref-continue-lt-load-session-read][@ref-continue-lt-load-session-fallback][@ref-continue-lt-export-envelope-guard]

列表侧还有一份只在内存里组装的元数据，**不落盘**：`sessionId`、`title`、`dateCreated`（文件 `birthtime` 的 ISO 串）、`workspaceDirectory`，加上 CLI 特有的 `firstUserMessage`（取历史里第一条 user 消息的文本；内容是数组时取第一个 text 段，取不到就显示 `(multimodal message)` 或 `(unknown content type)`）。它用来渲染会话选择器与 `cn ls --json`。[@ref-continue-lt-metadata-preview][@ref-continue-lt-metadata-preview-fields]

**缺口（`transcripts.schema` 记为 partial 的原因）**：`contextItems` 的元素类型 `ContextItemWithId`、`reasoning`、`promptLogs`、`appliedRules`、`toolCallStates[].processedArgs` 与 `mcpUiState` 的逐字段 schema，本轮只看到类型名与注释，没有取到字段清单；也没有任何官方文档描述这个文件格式（本产品在 `archive/` 下无原件可引用）。这里不代其它产品归纳通用记录 schema。

## 生命周期：创建、落盘、恢复、分支与压缩 {#transcripts-lifecycle}

**创建不落盘**。进程启动时 `createSession([])` 只在内存里造对象、注册到单例 `SessionManager`；文件要等第一次出现非 system 消息时才由 `saveSession` 写出。`saveSession` 整体包在 try/catch 里，出错只写 `Error saving session:` 日志，不会打断对话。[@ref-continue-lt-save-session-write][@ref-continue-lt-has-content-guard]

**每次历史变化都全量重写**。`ChatHistoryService.setHistoryInternal` 是唯一出口：加 user 消息、加 assistant 消息、加工具结果、更新工具状态、压缩、清空，都会构造一份新数组、调用 `setState`，然后（除非远程模式或显式 `persist: false`）调用 `updateSessionHistory(history)` → `saveSession()`。也就是说一轮对话里每发生一个工具事件就整文件重写一次，没有增量写、没有尾部追加、没有周期性 flush。[@ref-continue-lt-persist-on-change][@ref-continue-lt-tool-call-state-update]

**恢复有三条路径**：

1. `--resume`：按 mtime 取最新的会话文件（见[存储位置](#transcripts-storage-layout)），**不区分项目**。
2. `/sessions` 与 `/resume`（两者都打开同一个会话选择器）、以及 `cn ls` 选中：走 `loadSessionById(id)`，落到 core 的 `HistoryManager.load`，它读文件、解析、并把 `session.sessionId` 强制改写回请求的 id。TUI 载入后还会把该 id 写进 `process.env.CONTINUE_CLI_TEST_SESSION_ID`（剥掉 `continue-cli-` 前缀），使后续写入继续落在同一个文件上。[@ref-continue-lt-load-session-read][@ref-continue-lt-tui-load-session][@ref-continue-lt-session-command-handlers]
3. `cn serve`：`loadOrCreateSessionById(trimmedId, initialHistory)` 先按 id 试读，读不到才新建，这是长驻进程跨重启保留历史的机制。[@ref-continue-lt-load-or-create-by-id]

**分支**。`--fork SESSION_ID` 在 TUI 初始化时读源会话并调 `startNewSession(source.history)`：清空内存会话、生成新 uuid、把整段历史搬过去。`/fork` 不做这件事，它只是把 `cn --fork CURRENT_SESSION_ID` 复制到剪贴板，由你在新进程里执行。[@ref-continue-lt-resume-fork-init][@ref-continue-lt-start-new-session-id]

**编辑消息会截断磁盘记录**。编辑历史中的第 N 条消息时，代码取 `history.slice(0, N)` 并 `updateSessionHistory(rewindedHistory)`，随后以同一个 sessionId 覆盖写原文件——**被截掉的后续消息在本机文件里就没有了**，且没有备份副本。[@ref-continue-lt-edit-rewind-history]

**压缩会替换整段历史**。`/compact` 与自动压缩构造 `compactedHistory`：有 system 消息就只保留 `[systemMessage, 摘要消息]`，否则只保留一条 `conversationSummary` 字段等于摘要文本的 assistant 消息，然后 `updateSessionHistory(result.compactedHistory)` 写回同一个文件。也就是说**落盘记录被摘要取代，原始消息不再保留**；`findCompactionIndex` 之后再用这个索引切出发给模型的上下文。[@ref-continue-lt-compacted-history][@ref-continue-lt-compact-and-clear]

**`/clear` 不换会话也不删文件**。它触发 `initChatHistory(false)`，该函数只返回空数组（`resume` 为假时不读盘），随后 `setChatHistory([])` 走服务层落盘；因为空历史不满足落盘条件，旧文件内容原样保留，直到这个 id 下次出现非 system 消息时被整体覆盖。[@ref-continue-lt-init-chat-history][@ref-continue-lt-has-content-guard]

**缺口**：固定来源里 `saveSession` 的调用点都在历史、标题与用量更新路径上，没有进程退出钩子或定时刷盘入口，因此崩溃或强杀时正在流式输出的那一条 assistant 消息不保证落盘。这是从调用点分布得出的判断，不是运行期观测。

## 数据库：会话不落库，索引库各司其职 {#transcripts-databases}

**会话正文与列表都不在数据库里**。`sessions` 目录下只有 JSON 文件，索引侧没有任何表保存聊天记录。恢复一个会话所必需的文件只有 `{sessionId}.json` 一个。[@ref-continue-lt-sessions-folder-path][@ref-continue-lt-session-file-paths]

同一棵全局目录树下的 SQLite / LanceDB 属于代码索引、文档检索与补全缓存，与会话恢复无关：[@ref-continue-lt-index-db-paths][@ref-continue-lt-devdata-sqlite-path]

| 路径 | 用途 |
| :-- | :-- |
| `{continueHome}/index/index.sqlite` | 代码库索引（`SqliteDb` 的默认落点） |
| `{continueHome}/index/docs.sqlite` | 文档索引的全文库 |
| `{continueHome}/index/lancedb/` | 文档向量库 |
| `{continueHome}/index/autocompleteCache.sqlite` | 补全缓存 |
| `{continueHome}/dev_data/devdata.sqlite` | 开发/遥测事件（`DataLogger`） |

**两者的分工与故障后果不一样**。`sessions.json` 只是列表索引：`save` 时先解析它，空文件会被重写为 `[]`，但若它是**非法 JSON**，会抛出明确的 `It looks like there is a JSON formatting error in your sessions.json file ... Please fix this before creating a new session.`——这是需要人工修复的硬失败。[@ref-continue-lt-save-list-metadata][@ref-continue-lt-save-list-entry]

反过来，单个会话文件缺失或损坏只会退化：`list` 侧对文件不存在的条目回退到基础元数据（条目仍显示、但载不进去），`load` 侧回退成一份空会话。[@ref-continue-lt-metadata-preview][@ref-continue-lt-load-session-fallback]

**重建**：再次保存同一个 sessionId 会把缺失的 `sessions.json` 条目重新 push 回去（含 title、workspaceDirectory、按 assistant 消息数算出的 `messageCount`）；但从 `sessions.json` 反推不出正文——元数据里没有任何消息内容。[@ref-continue-lt-save-list-entry]

## 归档、导出与备份 {#transcripts-archive-export}

**没有原生归档开关**。固定来源里没有把会话标记为归档、只读、免清理或按天数保留的字段与配置（这是「未找到」，见下面的缺口说明）。真正可用的只有两条显式路径。

**`/export`：JSON 信封，写到当前工作目录**。导出对象是 `{version: 1, exportedAt: ISO8601, session}`，`session` 直接来自 `loadSessionById(sessionId)`，文件名 `{cwd}/continue-session-{sessionId}.json`，两空格缩进。[@ref-continue-lt-tui-export-session][@ref-continue-lt-export-envelope-guard]

导出的是**当前磁盘上那份会话对象**，因此凡是被压缩、消息编辑或 `/clear` 丢掉的内容都不会出现在导出文件里——它不能用来抢救已经被覆盖掉的原始记录。[@ref-continue-lt-tui-export-session]

**`/import FILE_PATH`：写回本机目录**（与 `/export` 同属斜杠命令表）。[@ref-continue-lt-session-command-handlers] 流程是读文件 → `JSON.parse` → 校验 `version === 1` 且 `exportedAt` 是字符串且 `session.sessionId`/`title` 是字符串且 `history` 是数组；若该 sessionId 在本机已有非空历史，则**换一个新 uuid** 再保存，避免覆盖既有会话，否则用原 id 保存（`sessions.json` 条目随之补写或更新）。校验失败只返回一条红字提示，不落任何盘。[@ref-continue-lt-import-handler][@ref-continue-lt-import-save-result]

**依赖哪些必要文件**：往返只需 `{sessionId}.json` 一个文件；`sessions.json` 会由保存流程自动维护，不需要手工搬运。[@ref-continue-lt-cli-session-file-path]

**可移植性与信息完整性上的损失**：

- `workspaceDirectory` 是写死的绝对路径。换机器后它不会被重写，只是让按工作区过滤的列表不再匹配这个会话，跨项目过滤因此失效。[@ref-continue-lt-sessions-list-filter]
- 导出信封只含会话对象本身，不含模型、MCP server、工具定义或凭据。要在新环境继续这段对话，需要重新配置这些依赖；历史里的工具结果文本还在，但当时的环境无法从文件里复原。
- 跨版本恢复没有迁移层，导入时不做字段补齐；旧文件里多出的字段会被原样写回并在读取时忽略。

**另一条不同的导出形态**：`history/share` 走的是 core 协议层，与 CLI 的 `/export` 不是一回事——它把消息渲染成 Markdown（`### [Continue](https://continue.dev) session transcript` 开头，每条消息加 `#### _User_` / `#### _Assistant_` 标题并转成 blockquote），默认写到全局目录下的 `<无分隔符时间戳>_session.md`，随后用 IDE 的 `writeFile` 写入并打开。本轮在 CLI 源码中没有找到调用该协议消息的地方，所以它在 CLI 界面上的可用性未证实。[@ref-continue-lt-core-history-clear][@ref-continue-lt-share-markdown-export][@ref-continue-lt-share-markdown-file]

**缺口（`transcripts.archive` 记为 partial 的原因）**：归档开关、保留期、压缩归档、异地备份等产品级能力都没有在固定来源中出现；「不存在」这一结论需要官方文档或运行期验证才能成立，本产品本轮也没有可引用的官方文档原件。

## 删除、保留与排错 {#transcripts-cleanup-and-diagnostics}

### 官方删除与保留机制

**删除能力存在于 core 协议层，不在 CLI 界面**。core 注册了五个会话相关消息：`history/list`、`history/delete`、`history/load`、`history/save`、`history/share`，以及 `history/clear`。其中 `history/delete` 调 `historyManager.delete(id)`，`history/clear` 调 `historyManager.clearAll()`。[@ref-continue-lt-core-history-protocol][@ref-continue-lt-core-history-clear]

`delete` 的顺序是：先删 `{id}.json`（文件不存在就抛错），再读 `sessions.json`、过滤掉该 id、整文件重写。`clearAll` 是 `fs.rmSync(sessions 目录, { recursive: true, force: true })`，连目录带 `sessions.json` 一起删；下次访问时 `getSessionsFolderPath()` / `getSessionsListPath()` 会重建目录与空列表。[@ref-continue-lt-delete-session-file][@ref-continue-lt-delete-list-entry][@ref-continue-lt-clear-all-sessions]

**但 CLI 没有把它们接上**：本轮在 `extensions/cli/src` 内检索 `history/delete`、`history/clear`、`historyManager.delete`、`historyManager.clearAll` 只命中定义文件自身；会话选择器只处理上/下/回车/Esc，没有删除键；`session.ts` 里的 `clearSession()` 会 `unlinkSync` 当前会话文件，但本轮也没有找到 CLI 调用点。`/clear` 是唯一在 CLI 里可达的「清理」，而它只清空内存历史、保留文件：空历史不满足落盘条件，因此旧内容会一直留到该 id 下次被覆盖写。[@ref-continue-lt-init-chat-history][@ref-continue-lt-has-content-guard]（见[生命周期](#transcripts-lifecycle)）

**手动删除的后果**：

- 只删 `{id}.json`：留下孤儿元数据条目，它仍会出现在列表里，但载入时走「文件不存在 → 用基础元数据」的分支，选中也载不出内容。[@ref-continue-lt-metadata-preview]
- 删整个 `sessions` 目录：等价于 `clearAll`，全部会话与列表一起消失，没有回收站、没有备份。
- 删 `sessions.json`：正文文件仍在，列表为空；下一次保存同 id 会重建条目，但其余孤儿条目不会自动回来。

**删除前必须先停掉的写入者**：任何仍在运行的 `cn` 进程，包括 `cn serve`。因为每次历史变化都会整文件重写会话文件并重写 `sessions.json`，一个内存里仍持有该会话的进程会在下一次保存时把文件写回来、并把元数据条目 push 回列表——手动删除的结果被运行中的进程覆盖。

**没有保留期**：固定来源里没有按大小、条数或天数清理会话的代码（会话目录下的删除调用只有上面那两处），也没有官方文档承诺。**因此不能据此断言「删掉是安全的」**——这一点是 `transcripts.cleanup` 记为 partial 而不是 answered 的原因。

### 定位、读取与排错入口

- **列出会话**：`cn ls` 打开选择器（TUI）；`cn ls --json` 输出 `sessions` 数组，每项 `id`、`timestamp`、`workspaceDirectory`、`title`、`firstUserMessage`、`isRemote`、`remoteId` —— 这是不进入会话就能核对元数据的入口。`remoteId` 恒为未定义，`getRemoteSessions()` 现在直接返回空数组（源码注释写明 Hub 集成已移除）。[@ref-continue-lt-ls-json-output]
- **会话内**：`/sessions` 与 `/resume` 打开同一个选择器并在右侧预览历史；`--resume` 只恢复 mtime 最新的那一个，不接受 id。[@ref-continue-lt-session-command-handlers][@ref-continue-lt-resume-fork-flags]
- **读原文**：直接看 `{continueHome}/sessions/{sessionId}.json`，或用 `/export` 导出再读 JSON 信封。
- **日志**：`--verbose` 会打开 debug 级别，打印日志文件路径与一个进程内随机 session id，并给出对应的 `grep` 过滤命令，形如 `grep "[SESSION_ID]" LOG_PATH`。日志固定在 `{continueHome}/logs/cn.log`。加载与保存失败分别记 `Error loading session:` 与 `Error saving session:`；`load` 解析失败还会 `console.log` 一行 `Error loading session: ...`。排错时先看这些行，能区分「文件不存在」「JSON 损坏」「写入被拒」三类情况。[@ref-continue-lt-verbose-log-hint][@ref-continue-lt-cli-log-path][@ref-continue-lt-save-session-write][@ref-continue-lt-load-latest-read]
- **列表为空但文件还在**：先确认读的是同一个 `continueHome`（`CONTINUE_GLOBAL_DIR` 是否被设置），再确认文件名以 `.json` 结尾且不是 `sessions.json` —— `--resume` 只扫描这两类。[@ref-continue-lt-load-latest-by-mtime][@ref-continue-lt-sessions-list-read]
- **`sessions.json` 损坏**：这是唯一会给出明确人工修复指引的失败点，报错文本里带文件路径，按提示修好即可，不必删除会话文件。[@ref-continue-lt-save-list-entry]

**缺口（`transcripts.diagnostics` 记为 partial 的原因）**：没有官方的一致性校验或「重建列表」命令；`history/clear` 这类批量清理在 CLI 界面不可达；磁盘占用、会话体积排行这类观测在固定来源中都没有入口。