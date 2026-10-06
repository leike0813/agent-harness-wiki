---
schema_version: 3
record_kind: production
edition_id: codebuff-local_transcripts-v1
harness_id: codebuff
topic: local_transcripts
title: "Codebuff 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs: [ref-codebuff-lt-chat-message-shape, ref-codebuff-lt-run-state-type, ref-codebuff-lt-save-both-files, ref-codebuff-lt-html-block-not-persisted, ref-codebuff-lt-input-history-path, ref-codebuff-lt-input-history-cap, ref-codebuff-lt-trace-optin, ref-codebuff-lt-log-target, ref-codebuff-lt-doc-chat-history]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-codebuff-lt-config-dir, ref-codebuff-lt-project-data-dir, ref-codebuff-lt-chat-id-naming, ref-codebuff-lt-meta-filenames, ref-codebuff-lt-current-chat-dir, ref-codebuff-lt-log-target, ref-codebuff-lt-trace-optin, ref-codebuff-lt-input-history-path, ref-codebuff-lt-image-block-base64, ref-codebuff-lt-doc-chat-history, ref-codebuff-lt-new-chat-rotate, ref-codebuff-lt-agent-state-tree, ref-codebuff-lt-chat-message-shape]
  - section_id: transcripts-format-and-schema
    surface_ids: [cli]
    source_refs: [ref-codebuff-lt-atomic-write, ref-codebuff-lt-save-both-files, ref-codebuff-lt-serialize-independent, ref-codebuff-lt-chat-message-shape, ref-codebuff-lt-content-block-union, ref-codebuff-lt-run-state-type, ref-codebuff-lt-agent-state-tree, ref-codebuff-lt-meta-schema, ref-codebuff-lt-meta-staleness, ref-codebuff-lt-image-block-base64]
  - section_id: transcripts-lifecycle-and-storage
    surface_ids: [cli]
    source_refs: [ref-codebuff-lt-current-chat-dir, ref-codebuff-lt-save-both-files, ref-codebuff-lt-checkpoint-save, ref-codebuff-lt-load-restore, ref-codebuff-lt-load-chat-id-fallback, ref-codebuff-lt-load-messages-fallback, ref-codebuff-lt-new-chat-rotate, ref-codebuff-lt-continue-flag, ref-codebuff-lt-trace-rewritten, ref-codebuff-lt-agent-state-tree, ref-codebuff-lt-meta-schema, ref-codebuff-lt-run-state-type, ref-codebuff-lt-meta-staleness]
  - section_id: transcripts-export-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-codebuff-lt-export-scope, ref-codebuff-lt-export-format, ref-codebuff-lt-load-restore, ref-codebuff-lt-run-state-type, ref-codebuff-lt-delete-chat-session, ref-codebuff-lt-trim-oversized-logs, ref-codebuff-lt-clear-log-file, ref-codebuff-lt-clear-chat-state, ref-codebuff-lt-input-history-cap, ref-codebuff-lt-save-both-files, ref-codebuff-lt-load-messages-fallback, ref-codebuff-lt-history-screen-unreadable]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuff-lt-project-data-dir, ref-codebuff-lt-chat-id-naming, ref-codebuff-lt-meta-filenames, ref-codebuff-lt-unreadable-chat, ref-codebuff-lt-history-screen-unreadable, ref-codebuff-lt-meta-staleness, ref-codebuff-lt-load-restore, ref-codebuff-lt-load-chat-id-fallback, ref-codebuff-lt-load-messages-fallback, ref-codebuff-lt-log-target, ref-codebuff-lt-trace-optin, ref-codebuff-lt-trace-rewritten, ref-codebuff-lt-doc-chat-history]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: answered
        source_refs: [ref-codebuff-lt-chat-message-shape, ref-codebuff-lt-run-state-type, ref-codebuff-lt-save-both-files, ref-codebuff-lt-html-block-not-persisted, ref-codebuff-lt-input-history-path, ref-codebuff-lt-input-history-cap, ref-codebuff-lt-trace-optin, ref-codebuff-lt-log-target, ref-codebuff-lt-doc-chat-history]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-codebuff-lt-config-dir, ref-codebuff-lt-project-data-dir, ref-codebuff-lt-chat-id-naming, ref-codebuff-lt-meta-filenames, ref-codebuff-lt-current-chat-dir, ref-codebuff-lt-log-target, ref-codebuff-lt-trace-optin, ref-codebuff-lt-input-history-path, ref-codebuff-lt-image-block-base64, ref-codebuff-lt-doc-chat-history]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-codebuff-lt-chat-id-naming, ref-codebuff-lt-meta-filenames, ref-codebuff-lt-project-data-dir, ref-codebuff-lt-new-chat-rotate, ref-codebuff-lt-agent-state-tree, ref-codebuff-lt-chat-message-shape]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: answered
        source_refs: [ref-codebuff-lt-atomic-write, ref-codebuff-lt-save-both-files, ref-codebuff-lt-serialize-independent]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: partial
        source_refs: [ref-codebuff-lt-chat-message-shape, ref-codebuff-lt-content-block-union, ref-codebuff-lt-run-state-type, ref-codebuff-lt-agent-state-tree, ref-codebuff-lt-meta-schema, ref-codebuff-lt-meta-staleness, ref-codebuff-lt-image-block-base64]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle-and-storage
        status: answered
        source_refs: [ref-codebuff-lt-current-chat-dir, ref-codebuff-lt-save-both-files, ref-codebuff-lt-checkpoint-save, ref-codebuff-lt-load-restore, ref-codebuff-lt-load-chat-id-fallback, ref-codebuff-lt-load-messages-fallback, ref-codebuff-lt-new-chat-rotate, ref-codebuff-lt-continue-flag, ref-codebuff-lt-trace-rewritten, ref-codebuff-lt-agent-state-tree]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle-and-storage
        status: partial
        source_refs: [ref-codebuff-lt-save-both-files, ref-codebuff-lt-load-restore, ref-codebuff-lt-load-messages-fallback, ref-codebuff-lt-run-state-type, ref-codebuff-lt-agent-state-tree, ref-codebuff-lt-meta-schema, ref-codebuff-lt-meta-staleness]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-and-cleanup
        status: partial
        source_refs: [ref-codebuff-lt-export-scope, ref-codebuff-lt-export-format, ref-codebuff-lt-load-restore, ref-codebuff-lt-run-state-type]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-and-cleanup
        status: answered
        source_refs: [ref-codebuff-lt-delete-chat-session, ref-codebuff-lt-history-screen-unreadable, ref-codebuff-lt-clear-chat-state, ref-codebuff-lt-trim-oversized-logs, ref-codebuff-lt-clear-log-file, ref-codebuff-lt-input-history-cap, ref-codebuff-lt-save-both-files, ref-codebuff-lt-load-messages-fallback]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs: [ref-codebuff-lt-project-data-dir, ref-codebuff-lt-chat-id-naming, ref-codebuff-lt-meta-filenames, ref-codebuff-lt-unreadable-chat, ref-codebuff-lt-history-screen-unreadable, ref-codebuff-lt-meta-staleness, ref-codebuff-lt-load-restore, ref-codebuff-lt-load-chat-id-fallback, ref-codebuff-lt-load-messages-fallback, ref-codebuff-lt-log-target, ref-codebuff-lt-trace-optin, ref-codebuff-lt-trace-rewritten, ref-codebuff-lt-doc-chat-history]
---

## 固定来源与记录范围 {#transcripts-record-scope}

本章的固定来源是仓库 `CodebuffAI/codebuff` @ `bd198ff2df3ea9b333e8bf2e5b843735afd4ad9c`（快照前缀
`snapshot-codebuff-lt-`，抓取时间 2026-10-06T05:10:00Z），以及官方文档站 troubleshooting 页面在
2026-10-06 的原件快照 `snapshot-codebuff-lt-doc-chat-history`。检索范围是 `cli/src/project-files.ts`、
`cli/src/utils/` 下的 `run-state-storage.ts`、`chat-meta.ts`、`chat-history.ts`、`message-history.ts`、
`logger.ts`、`trace-writer.ts`、`write-file-atomic.ts`、`config-dir.ts`，`cli/src/types/chat.ts`、
`cli/src/commands/export-conversation.ts`、`cli/src/components/chat-history-screen.tsx`，
以及 SDK 侧的 `sdk/src/run-state.ts` 与 `common/src/types/session-state.ts`。所有引用的 target 都是
linux/x64 的 `cli` 界面；本轮只调查 catalog 里登记的这一个界面。

**transcripts.scope**：CLI 落盘的是两类正式记录加若干辅助文件。一次保存会把运行状态与消息正文分别写入
同一个会话目录下的两个文件 [@ref-codebuff-lt-save-both-files]：`run-state.json` 是
`RunState` 信封，含 `sessionState`、`output`、`traceSessionId` 与可选的 `inference`
[@ref-codebuff-lt-run-state-type]；`chat-messages.json` 是 `ChatMessage[]`，覆盖用户、AI、agent 与错误
四类消息及其内容块 [@ref-codebuff-lt-chat-message-shape]。所以记录的不只是"给人看的对话"，还有送给模型的
输入历史——agent 的消息历史、系统提示与工具定义都在运行状态里。

明确不落盘的东西有两类。一是 `html` 内容块，源码在类型定义上直接标注"不可序列化、不要用于持久化数据"
[@ref-codebuff-lt-html-block-not-persisted]。二是渲染期的 UI 状态与广告拉取上下文不属于记录协议本身。
官方文档同时提醒：会话存在本地，但 prompt 与相关项目上下文也会发送给 Freebuff 与模型提供商
[@ref-codebuff-lt-doc-chat-history]——本地记录不等于内容只留在本机。

输入历史是另一份独立文件，落在配置目录根部而非会话目录，只保存用户输入过的字符串
[@ref-codebuff-lt-input-history-path]，写入时截断到最近 1000 条 [@ref-codebuff-lt-input-history-cap]。
调试侧还有 `log.jsonl` 与可选的 `trace.jsonl` [@ref-codebuff-lt-log-target]
[@ref-codebuff-lt-trace-optin]：trace 在生产构建里默认关闭，只有 `CODEBUFF_TRACE` 取 `1`、`true` 或
`yes` 时才逐条写出 agent 收到的原始消息 [@ref-codebuff-lt-trace-optin]。

**记录开关的现状**：没有"关闭会话记录"的总开关——正文与运行状态随每次保存无条件写入。可关的只有调试
副本 [@ref-codebuff-lt-trace-optin]。缺口：本轮没有取到任何官方文档对记录范围或保留策略的说明。

## 存储位置、命名与项目作用域 {#transcripts-storage-layout}

**transcripts.location**：位置由三段拼成，读者要自己创建或备份时按这个形状找：

```text
{config-dir}/
├── message-history.json                       # 输入历史（不分项目）
└── projects/
    └── {project-root-basename}/
        └── chats/
            └── {chat-id}/
                ├── chat-messages.json         # 会话正文
                ├── chat-meta.json             # 旁挂摘要（派生）
                ├── run-state.json             # 运行状态
                ├── log.jsonl                  # 调试日志
                └── trace.jsonl                # 可选原始消息 trace
```

第一段是配置目录：环境变量 `FREEBUFF_CONFIG_DIR` 优先，且必须是绝对路径，否则直接抛错；未设置时用
`~/.config/manicode`，非 prod 构建会在后面追加环境名后缀 [@ref-codebuff-lt-config-dir]。官方文档给出的
形状是 `~/.config/manicode/projects/{your-project-name}/chats`
[@ref-codebuff-lt-doc-chat-history]，与源码一致（注意配置目录名是 `manicode`，不是 `codebuff`）。

第二段是项目作用域，值得单独提醒：目录名只取项目根的 basename
[@ref-codebuff-lt-project-data-dir]，没有哈希也没有路径编码。因此两个不同路径下的同名项目（例如
`~/work/api` 与 `~/tmp/api`）会共用同一份记录目录，彼此的会话混在一起。会话目录本身在首次需要时创建
[@ref-codebuff-lt-current-chat-dir]。

第三段是会话目录，文件名由常量固定 [@ref-codebuff-lt-meta-filenames]。调试日志在生产构建里落进当前会话
目录，开发构建改写到项目根的 `debug/cli.jsonl` [@ref-codebuff-lt-log-target]；trace 落在当前会话目录
[@ref-codebuff-lt-trace-optin]。输入历史不在项目下，而在配置目录根部，因此它是跨项目共享的
[@ref-codebuff-lt-input-history-path]。

**transcripts.naming**：会话 id 就是启动时刻的 ISO 时间戳，把冒号换成连字符
[@ref-codebuff-lt-chat-id-naming]，例如 `2026-10-06T05-10-00.000Z`；`/new` 会轮换出新 id，于是新会话落到
新目录而不覆盖旧会话。项目路径不进文件名，只留 basename [@ref-codebuff-lt-project-data-dir]。会话目录内
只有上面那几个固定文件名 [@ref-codebuff-lt-meta-filenames]，没有分片、没有序号后缀。

父子与分支关系不体现在目录结构上。会话之间没有父子图，`/new` 只是换一个新 id
[@ref-codebuff-lt-new-chat-rotate]；代理之间的父子关系保存在 `run-state.json` 内部——`AgentState` 带
`parentId`、`runId`、`childRunIds`、`ancestorRunIds` 与嵌套的 `subagents`
[@ref-codebuff-lt-agent-state-tree]；消息级另有 `parentId` 字段 [@ref-codebuff-lt-chat-message-shape]。
路径随环境变化的边界：`FREEBUFF_CONFIG_DIR` 换整棵配置树；换项目根就换 `projects/` 下的 basename 目录。
记录目录里没有额外附件目录——图片以 base64 内联在正文中，而 `attachments`、`fileAttachments` 只保存
原始文件路径与文件名，因此换机器后这些引用会指向不存在的文件
[@ref-codebuff-lt-image-block-base64]。适用边界：以上是 linux 源码树与 POSIX 文档的结论；Windows 下
`path.join` 的分隔符不同，本轮未单独取证。

## 格式、编码与记录 schema {#transcripts-format-and-schema}

**transcripts.format**：正文与运行状态都是 JSON，紧凑序列化（不缩进），每次保存整体覆写，不追加。写入是
原子的：先写同目录临时文件再 rename 覆盖目标 [@ref-codebuff-lt-atomic-write]；`saveChatState` 先
`mkdirSync` 补回目录，再依次写 `run-state.json` 与 `chat-messages.json`，最后写旁挂摘要
[@ref-codebuff-lt-save-both-files]。两个文件各自独立序列化，一份坏掉不会阻塞另一份落盘
[@ref-codebuff-lt-serialize-independent]。没有分片、没有压缩、没有归档压缩层。

**transcripts.schema**：记录类型是 TypeScript 类型而非运行时 schema 校验——CLI 读回时直接
`JSON.parse` 后断言类型，没有对 `chat-messages.json` 做字段级校验。`ChatMessage` 的字段是
`id`、`variant`、`content`、`timestamp`，加上可选的 `blocks`、`parentId`、`agent`、`isCompletion`、
`credits`、`completionTime`、`isComplete`、`metadata`、`validationErrors`、`userError` 与三类附件
[@ref-codebuff-lt-chat-message-shape]；`blocks` 是联合类型，可含 agent、agent-list、ask-user、html、
image、mode-divider、sponsored-proposal、text、tool、plan
[@ref-codebuff-lt-content-block-union]。运行状态的信封是 `RunState`
[@ref-codebuff-lt-run-state-type]，其 `sessionState` 里的 `AgentState` 承载 `messageHistory`、
`systemPrompt`、`toolDefinitions` 与代理树 [@ref-codebuff-lt-agent-state-tree]。旁挂摘要
`chat-meta.json` 是唯一有结构约束的文件，四个字段：`messageCount`、`firstPrompt`、`messagesSize`、
`messagesMtimeMs` [@ref-codebuff-lt-meta-schema]。

图片以 base64 内联在记录里（`ImageContentBlock.image` 标注为 base64 编码），而 `attachments`、
`fileAttachments` 存的是原始路径与文件名，不是文件副本
[@ref-codebuff-lt-image-block-base64]。这决定了记录目录本身是自包含的，但引用的外部文件在原机器外不可读。

脱敏后的最小完整示例（占位值，只示意字段形状）：

```json
{
  "id": "user-1759730000000",
  "variant": "user",
  "content": "把「占位函数名」的实现补全",
  "timestamp": "{时间戳}",
  "blocks": [
    { "type": "text", "content": "把「占位函数名」的实现补全" },
    { "type": "tool", "toolCallId": "{tool-call-id}", "toolName": "{tool-name}", "input": {}, "output": "{工具输出}" }
  ]
}
```

**仍缺的 schema 缺口（按 partial 阅读）**：记录里没有 `schema_version` 字段，固定来源也没有任何版本迁移
代码；能观察到的只是读时容错——旁挂摘要会记录正文文件的 size 与 mtime，读时不匹配就判定为过期并回退
全量解析 [@ref-codebuff-lt-meta-staleness]。因此一条旧 CLI 写出的记录能否被新 CLI 正确读回，只有
"能解析就继续"这一层保证。此外本轮没有取到：一级 `ImageAttachment`/`FileAttachment` 的完整落盘实例、
`metadata` 里 `runState` 的嵌套形状、以及 CLI 与 SDK 两条路径写出的记录是否完全同构。

## 生命周期与记录之间的分工 {#transcripts-lifecycle-and-storage}

**transcripts.lifecycle**：创建发生在首次需要当前会话目录时（`mkdirSync`）
[@ref-codebuff-lt-current-chat-dir]。运行期间由合并式检查点写盘消费周期性状态快照：同一会话目录只保留
最新一份，中间状态被丢弃，序列化与落盘放到异步路径以免阻塞渲染
[@ref-codebuff-lt-checkpoint-save]；回合完成与进程退出走同步的权威保存
[@ref-codebuff-lt-save-both-files]。写盘目标在状态捕获时就固定下来，不在写入时重新解析当前会话，
以免 `/new` 或恢复操作把一份记录写进另一个会话的目录；`/new` 在轮换 id 之前先中止正在运行的 run
[@ref-codebuff-lt-new-chat-rotate]。

恢复有两条入口：命令行 `--continue [conversation-id]`
[@ref-codebuff-lt-continue-flag]，以及 `/history` 里选中某个会话——此时恢复目标取
`resumeChatId ?? continueChatId` [@ref-codebuff-lt-new-chat-rotate]。载入时两个文件各自独立解析：运行状态读不到会打 warn 并只恢复正文，
正文读不到同样只恢复 agent 上下文 [@ref-codebuff-lt-load-restore]
[@ref-codebuff-lt-load-messages-fallback]；请求的会话 id 不存在时回退到最近修改的会话目录并打 debug
[@ref-codebuff-lt-load-chat-id-fallback]。交给子代理时，代理上下文以嵌套 `AgentState` 进入同一
份 `run-state.json` [@ref-codebuff-lt-agent-state-tree]。上下文压缩发生在运行期并会重写历史；开启 trace
时这一点会以 `history_rewritten` 标记行落盘 [@ref-codebuff-lt-trace-rewritten]。缺口：SDK 暴露的
`compactRunState` 只在 `sdk/src/index.ts` 导出，本轮在 `cli/` 下未检索到调用点，因此"CLI 是否对已落盘的
运行状态做按需压缩"没有结论。

**transcripts.database**：CLI 的记录路径不使用数据库。写入与恢复全程只经由前两节的文件
[@ref-codebuff-lt-save-both-files][@ref-codebuff-lt-load-restore]，没有 SQLite、LevelDB 或本地 KV 参与。
分工是：`chat-messages.json` 存面向读者的正文，`run-state.json` 存送给模型的上下文
[@ref-codebuff-lt-run-state-type][@ref-codebuff-lt-agent-state-tree]，`chat-meta.json` 是派生索引——只有
消息数、首条提示与正文文件的 size/mtime，不含正文
[@ref-codebuff-lt-meta-schema][@ref-codebuff-lt-meta-staleness]。

恢复所必需的文件因此是两条记录本身：缺正文仍能恢复 agent 上下文，缺运行状态仍能恢复对话
[@ref-codebuff-lt-load-messages-fallback][@ref-codebuff-lt-load-restore]。派生摘要可以在下一次保存时
重建 [@ref-codebuff-lt-save-both-files]，正文与运行状态不可重建。缺口：本轮只审计了 CLI 自己的记录路径；
把 SDK 嵌到别的宿主（云端 runner、桌面端）时记录落在哪里、由谁清理，未在固定来源中确认。

## 导出、归档、删除与保留 {#transcripts-export-and-cleanup}

**transcripts.archive**：第一方导出只有一个命令 `/export [filename]`。它把当前内存中的消息写到项目根
内，默认文件名是 `codebuff-chat-{chat-id}.md`
[@ref-codebuff-lt-export-scope]；文件名以 `.json` 结尾时改为导出原始消息对象，用的是与落盘相同的
容错序列化器 [@ref-codebuff-lt-export-format]。它有两道保护：拒绝写到项目根之外，且目标文件已存在时
拒绝覆盖 [@ref-codebuff-lt-export-scope]。

导出与"复制会话目录"不是一回事。导出只含消息数组，不含 `run-state.json`，也不记录原会话目录位置；因此
它保不住推理身份这类运行状态字段 [@ref-codebuff-lt-run-state-type]。要完整恢复一次会话（含 agent
上下文），依赖的是整个会话目录里的两份记录 [@ref-codebuff-lt-load-restore]。恢复后的损失按 partial
阅读：本轮在 `cli/` 下检索导入命令（`/import`、导入/恢复会话的实现）没有命中，因此导出的 Markdown 无法
被 CLI 读回；`.json` 导出是消息数组，缺运行状态，也没有官方约定的回填路径。另一个未取证据的点是
跨机器可移植性——正文里的工具输入是否包含绝对路径，本轮没有逐字段核对。

**transcripts.cleanup**：官方机制分四类。

- 按会话删除：`/history` 里删除某个会话会递归删掉整个会话目录，删除前校验 id 不为空、不为 `.`/`..`、
      不含路径分隔符，并要求目标是目录 [@ref-codebuff-lt-delete-chat-session]；解析失败的会话在界面上
      标为不可读，仍然允许删除 [@ref-codebuff-lt-history-screen-unreadable]。
- 清当前会话状态：`clearChatState` 逐个删除当前会话的 `run-state.json`、`chat-messages.json`、
      `chat-meta.json` 三个文件 [@ref-codebuff-lt-clear-chat-state]。
- 自动保留策略只覆盖调试日志：`log.jsonl` 超过 10 MiB 且 14 天未修改才会被删除，正文文件不动
      [@ref-codebuff-lt-trim-oversized-logs]。正文与运行状态没有任何自动保留期或自动清理。
- 命令行清理：`--clear-logs` 删除当前日志目标以及项目 `debug/` 下的 `cli.jsonl` 与 `trace.jsonl`
      [@ref-codebuff-lt-clear-log-file]。输入历史另有 1000 条上限，写入时截断最旧
      [@ref-codebuff-lt-input-history-cap]。

手动删除的后果要分两种。只删一个文件会留下不一致状态，但不至于整段丢失：正文缺失仍能恢复 agent
上下文 [@ref-codebuff-lt-load-messages-fallback]。删掉整个会话目录则该会话的正文与运行状态一起消失，
CLI 没有重建路径。删除前必须先退出该项目的 CLI 进程——保存函数每次都会 `mkdirSync` 补回目录
[@ref-codebuff-lt-save-both-files]，所以运行中的检查点会把目录连同最新状态重新写出来。级联关系很简单：
会话目录是唯一单元，目录内没有指向其它记录的引用；`projects/` 与 `message-history.json` 不随会话删除级联
清理。

## 定位、完整性与排错 {#transcripts-diagnostics}

**transcripts.diagnostics**：定位路径按 `配置目录 / projects / 项目根 basename / chats / 会话 id` 逐层
进入 [@ref-codebuff-lt-project-data-dir][@ref-codebuff-lt-chat-id-naming]，目录内的文件名是固定常量
[@ref-codebuff-lt-meta-filenames]；官方文档给出的同一形状可作为交叉核对
[@ref-codebuff-lt-doc-chat-history]。

读取现状用 `/history`：它为每个会话给出首条提示、消息数与时间；正文解析失败（例如写到
一半被崩溃截断）的会话不会被静默隐藏，而是以 `unreadable` 标记列出
[@ref-codebuff-lt-unreadable-chat]，这类会话可删除但不可恢复
[@ref-codebuff-lt-history-screen-unreadable]。

完整性判断有三个可用信号。一是旁挂摘要与正文的绑定：`chat-meta.json` 记录正文的 size 与 mtime，读时不
一致即视为过期并回退全量解析 [@ref-codebuff-lt-meta-staleness]。二是恢复路径的日志级别：运行状态或正文
读不到会打 warn 并说明"只恢复了另一半" [@ref-codebuff-lt-load-restore]
[@ref-codebuff-lt-load-messages-fallback]；请求的会话 id 不存在只打 debug
[@ref-codebuff-lt-load-chat-id-fallback]。三是调试副本：`log.jsonl` 在生产构建里位于当前会话目录
[@ref-codebuff-lt-log-target]；需要逐条原始消息时用 `CODEBUFF_TRACE` 打开 `trace.jsonl`
[@ref-codebuff-lt-trace-optin]，其中 `history_rewritten` 标记行说明历史被压缩重写过，可用来对齐"记录里的
消息条数为何突然变少" [@ref-codebuff-lt-trace-rewritten]。

缺口：没有校验和、版本号或"检查记录健康"的官方命令；判断一份记录是否来自某次特定运行，只能靠会话 id
里的时间戳与 `run-state.json` 的内容。
