---
schema_version: 3
record_kind: production
edition_id: qwen-code-local_transcripts-v1
harness_id: qwen-code
topic: local_transcripts
title: "Qwen Code 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs: [ref-qwen-transcripts-checkpoints-dir, ref-qwen-transcripts-record-cwd-version, ref-qwen-transcripts-record-identity, ref-qwen-transcripts-record-message-payload, ref-qwen-transcripts-record-subtypes-a, ref-qwen-transcripts-record-subtypes-b, ref-qwen-transcripts-record-system-payload, ref-qwen-transcripts-recording-toggle, ref-qwen-transcripts-runtime-status-path, ref-qwen-transcripts-shell-history-path]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-qwen-transcripts-chats-dirs, ref-qwen-transcripts-global-qwen-dir, ref-qwen-transcripts-headless-session-path, ref-qwen-transcripts-jsonl-overwrite-atomic, ref-qwen-transcripts-organization-store, ref-qwen-transcripts-organization-store-path, ref-qwen-transcripts-project-dirs, ref-qwen-transcripts-project-hash, ref-qwen-transcripts-runtime-base-dir, ref-qwen-transcripts-runtime-status-path, ref-qwen-transcripts-sanitize-cwd, ref-qwen-transcripts-session-file-pattern, ref-qwen-transcripts-writer-lock-path]
  - section_id: transcripts-naming-and-format
    surface_ids: [cli]
    source_refs: [ref-qwen-transcripts-branch-checkpoint, ref-qwen-transcripts-jsonl-append-fsync, ref-qwen-transcripts-jsonl-overwrite-atomic, ref-qwen-transcripts-parent-session-payload, ref-qwen-transcripts-prompt-ledger-path, ref-qwen-transcripts-record-identity, ref-qwen-transcripts-sanitize-cwd, ref-qwen-transcripts-session-file-pattern, ref-qwen-transcripts-sidecar-paths, ref-qwen-transcripts-subagent-jsonl-path, ref-qwen-transcripts-subagent-layout, ref-qwen-transcripts-writer-lock-path]
  - section_id: transcripts-record-schema-and-lifecycle
    surface_ids: [cli]
    source_refs: [ref-qwen-transcripts-append-write-path, ref-qwen-transcripts-branch-checkpoint, ref-qwen-transcripts-compression-payload, ref-qwen-transcripts-conversation-file-create, ref-qwen-transcripts-flush, ref-qwen-transcripts-headless-session-path, ref-qwen-transcripts-jsonl-append-fsync, ref-qwen-transcripts-parent-session-payload, ref-qwen-transcripts-record-cwd-version, ref-qwen-transcripts-record-identity, ref-qwen-transcripts-record-message-payload, ref-qwen-transcripts-record-subtypes-a, ref-qwen-transcripts-record-subtypes-b, ref-qwen-transcripts-record-system-payload, ref-qwen-transcripts-subagent-layout]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-qwen-transcripts-archive-move, ref-qwen-transcripts-chats-dirs, ref-qwen-transcripts-daemon-archive, ref-qwen-transcripts-daemon-delete, ref-qwen-transcripts-remove-cleanup, ref-qwen-transcripts-residual-lock-recovery, ref-qwen-transcripts-sidecar-paths, ref-qwen-transcripts-writer-conflict, ref-qwen-transcripts-writer-lock-path, ref-qwen-transcripts-writer-reclaim-rules]
  - section_id: transcripts-diagnostics-and-recovery
    surface_ids: [cli]
    source_refs: [ref-qwen-transcripts-sessions-list-output, ref-qwen-transcripts-sessions-ps-scope, ref-qwen-transcripts-sessions-command-table, ref-qwen-transcripts-jsonl-append-fsync, ref-qwen-transcripts-recording-failure-message, ref-qwen-transcripts-residual-lock-recovery, ref-qwen-transcripts-writer-diagnostics, ref-qwen-transcripts-writer-lock-path, ref-qwen-transcripts-writer-reclaim-rules]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: partial
        source_refs: [ref-qwen-transcripts-recording-toggle, ref-qwen-transcripts-record-identity, ref-qwen-transcripts-record-cwd-version, ref-qwen-transcripts-record-message-payload, ref-qwen-transcripts-record-subtypes-a, ref-qwen-transcripts-record-subtypes-b, ref-qwen-transcripts-record-system-payload, ref-qwen-transcripts-shell-history-path, ref-qwen-transcripts-checkpoints-dir, ref-qwen-transcripts-runtime-status-path]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-qwen-transcripts-runtime-base-dir, ref-qwen-transcripts-global-qwen-dir, ref-qwen-transcripts-project-dirs, ref-qwen-transcripts-project-hash, ref-qwen-transcripts-sanitize-cwd, ref-qwen-transcripts-chats-dirs, ref-qwen-transcripts-session-file-pattern, ref-qwen-transcripts-headless-session-path, ref-qwen-transcripts-runtime-status-path, ref-qwen-transcripts-writer-lock-path, ref-qwen-transcripts-organization-store, ref-qwen-transcripts-organization-store-path, ref-qwen-transcripts-jsonl-overwrite-atomic]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-naming-and-format
        status: answered
        source_refs: [ref-qwen-transcripts-session-file-pattern, ref-qwen-transcripts-sanitize-cwd, ref-qwen-transcripts-record-identity, ref-qwen-transcripts-sidecar-paths, ref-qwen-transcripts-prompt-ledger-path, ref-qwen-transcripts-parent-session-payload, ref-qwen-transcripts-subagent-layout, ref-qwen-transcripts-subagent-jsonl-path]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-naming-and-format
        status: answered
        source_refs: [ref-qwen-transcripts-jsonl-append-fsync, ref-qwen-transcripts-jsonl-overwrite-atomic, ref-qwen-transcripts-sidecar-paths, ref-qwen-transcripts-prompt-ledger-path, ref-qwen-transcripts-subagent-layout]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema-and-lifecycle
        status: partial
        source_refs: [ref-qwen-transcripts-record-identity, ref-qwen-transcripts-record-subtypes-a, ref-qwen-transcripts-record-subtypes-b, ref-qwen-transcripts-record-message-payload, ref-qwen-transcripts-record-system-payload, ref-qwen-transcripts-compression-payload, ref-qwen-transcripts-parent-session-payload, ref-qwen-transcripts-branch-checkpoint]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema-and-lifecycle
        status: answered
        source_refs: [ref-qwen-transcripts-conversation-file-create, ref-qwen-transcripts-append-write-path, ref-qwen-transcripts-flush, ref-qwen-transcripts-compression-payload, ref-qwen-transcripts-branch-checkpoint, ref-qwen-transcripts-parent-session-payload, ref-qwen-transcripts-subagent-layout]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-qwen-transcripts-chats-dirs, ref-qwen-transcripts-jsonl-overwrite-atomic, ref-qwen-transcripts-runtime-status-path, ref-qwen-transcripts-organization-store, ref-qwen-transcripts-organization-store-path, ref-qwen-transcripts-writer-lock-path]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: answered
        source_refs: [ref-qwen-transcripts-chats-dirs, ref-qwen-transcripts-archive-move, ref-qwen-transcripts-daemon-archive, ref-qwen-transcripts-sidecar-paths]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs: [ref-qwen-transcripts-daemon-delete, ref-qwen-transcripts-remove-cleanup, ref-qwen-transcripts-sidecar-paths, ref-qwen-transcripts-writer-lock-path, ref-qwen-transcripts-writer-conflict, ref-qwen-transcripts-writer-reclaim-rules, ref-qwen-transcripts-residual-lock-recovery]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics-and-recovery
        status: answered
        source_refs: [ref-qwen-transcripts-sessions-command-table, ref-qwen-transcripts-sessions-list-output, ref-qwen-transcripts-sessions-ps-scope, ref-qwen-transcripts-recording-failure-message, ref-qwen-transcripts-writer-lock-path, ref-qwen-transcripts-writer-diagnostics, ref-qwen-transcripts-writer-reclaim-rules, ref-qwen-transcripts-jsonl-append-fsync]
---

## 记录范围、固定来源与开关 {#transcripts-recording-scope}

本章的固定来源只有两处：仓库 `QwenLM/qwen-code` 的提交 `18dc7775e5a2d5d49edda57096ca7265803259cf`（本轮 `sources:scan` 观察到的 `refs/heads/main`，基线为 `35616f3b643f6d87cc00112d961a0fbb448aca00`，抓取时间 `2026-10-06T04:34:54.138Z`）中的源码与同提交的用户／开发者文档。所有源码引用绑定各自文件的 `snapshot-qwen-code-lt-*` 快照与 `artifact-qwen-code-lt-*` 原件，快照的 `version_identity` 是 `kind: commit`；官方文档引用同样按文件各自绑定一个固定快照，文档与源码在本章里使用同一套绑定规则。

结论只覆盖 `cli` 界面，也就是 `packages/cli` 与 `packages/core` 这条本地 CLI 运行路径。catalog 里 `qwen-code` 还声明了 `vscode` 与 `jetbrains` 两个界面，本轮没有任何针对它们的证据，因此这两界面的答案由查询侧派生为 `not_investigated`，本章不代写。提交号只代表源码树，本轮没有逐小节证据把任何结论对应到某个 npm 发行包版本，所以本章不写 `mappings/`。

平台边界写在每条路径结论里：源码对项目标识的处理在 Windows 上折叠大小写（`os.platform() === 'win32'`），在 macOS 与 Linux 上不折叠；本轮在 Linux 上核对文件内容与路径拼接，没有在 Windows 或 macOS 上执行，因此不给出这两个平台的实测结论。本章里的路径占位符一律写成大写名（`RUNTIME_BASE_DIR`、`SANITIZED_CWD`、`PROJECT_HASH`、`SESSION_ID`、`PROJECT_DIR` 等），读者替换它们即可，不需要把执行机的绝对路径写进任何配置。

会话记录是**逐条追加的消息事件流**，不是输入历史、调试日志或缓存的汇总。落盘的基本单位是 `ChatRecord`，每条都带 `uuid`、`parentUuid`、`sessionId`、ISO 8601 `timestamp` 和 `type`，其中 `type` 只有 `'user' | 'assistant' | 'tool_result' | 'system'` 四种；`system` 记录是只追加的事件，用于改变历史如何被重建（例如压缩检查点），同时保留原始 UI 历史 [@ref-qwen-transcripts-record-identity]。除这五个字段外，记录还带 `cwd`、`version`（CLI 版本）、可选的 `gitBranch` 与 `promptId` [@ref-qwen-transcripts-record-cwd-version]。

正文负载分两层。一层是 `message`，即送给／来自模型的原始 API `Content` 结构（文本、`functionCall`、`functionResponse`、thought 等），恢复会话时可直接聚合成 `Content[]`；另一层是不属于 API `Content` 的元数据：`usageMetadata`、`model`、`contextWindowSize` 以及给 UI 恢复用的 `toolCallResult` [@ref-qwen-transcripts-record-message-payload]。也就是说 token 用量、模型名、上下文窗口这类每次响应都会变的字段也进记录，恢复时按记录逐条还原，而不是重新推断。

非标准记录用 `subtype` 区分，源码给出的闭集分两段列出：前半段包含 `chat_compression`、`slash_command`、`ui_telemetry`、`at_command`、`attribution_snapshot`、`notification`、`background_task_completed`、`cron`、`mid_turn_user_message`、`custom_title`、`parent_session`、`session_source`、`session_execution_engine`、`omni_recall`、`session_model`、`session_approval_mode`、`rewind` [@ref-qwen-transcripts-record-subtypes-a]；后半段包含 `agent_bootstrap`、`agent_launch_prompt`、`agent_retry`、`agent_session_ready`、`file_history_snapshot`、`user_text_elements`、`session_artifact_event`、`session_artifact_snapshot`、`session_sources_snapshot`、`branch_checkpoint`、`goal_state`、`goal_runtime`、`goal_turn_end`、`code_mode_tool_result`、`realtime_message`、`turn_result` 以及三个 `managed_session_*_v1` 包装记录 [@ref-qwen-transcripts-record-subtypes-b]。`system` 记录的额外字段放在 `systemPayload` 里，源码按 subtype 列出各自的载荷类型 [@ref-qwen-transcripts-record-system-payload]。

控制落盘的开关是 `general.chatRecording`，布尔值，默认 `true`，`requiresRestart: true`，`showInDialog: false`，官方描述是"Enable saving chat history to disk. Disabling this will also prevent --continue and --resume from working." [@ref-qwen-transcripts-recording-toggle]。这条描述同时界定了关闭的代价：没有落盘就没有可续的会话。加载顺序与命令行覆盖规则属于配置机制主题（见 `config.sources`、`config.runtime`），本章只确认该键是记录行为的总开关，不在此断言各来源的优先级。

与会话正文分开存放、不进 transcript 的东西至少有四类，值得在备份时分开对待：

- **shell 输入历史**落在 `PROJECT_TEMP_DIR/shell_history`，按项目隔离，与会话正文无关 [@ref-qwen-transcripts-shell-history-path]；
- **检查点目录**是 `PROJECT_TEMP_DIR/checkpoints`，供 `/restore` 一类命令使用 [@ref-qwen-transcripts-checkpoints-dir]；
- **运行期状态**是每会话一个 `PROJECT_DIR/chats/SESSION_ID.runtime.json`，供终端复用器、IDE 集成与状态守护进程扫描"现在哪些会话活着" [@ref-qwen-transcripts-runtime-status-path]；
- **文件历史备份**、subagent transcript、遥测与调试日志同样是独立文件，见下文各节。

**剩余缺口（`transcripts.scope` 记为 `partial` 的原因）**：以上是固定来源能正面证实的落盘内容与总开关。哪些内容**从不**进 transcript 无法从固定来源穷尽枚举——`subtype` 是源码中的闭集，但并非每条可能产生的内容都会走到 `record*` 方法（例如被沙箱或权限层拦下的工具调用、只经遥测通道上报的用量），而遥测与调试日志各自的完整字段不在本章范围内逐项审计。所以本节给出的是"记录了什么、由什么开关控制"的确定结论，不给出"没有记录什么"的完整清单。

## 存储位置、项目作用域与数据库分工 {#transcripts-storage-layout}

会话正文的路径由三段拼成，顺序固定。

第一段是 `RUNTIME_BASE_DIR`，即所有运行期输出的基目录，源码注释写明其优先级为：pinned runtime context > `QWEN_RUNTIME_DIR` 环境变量 > configurable context > `setRuntimeBaseDir()` 值 > `getGlobalQwenDir()` [@ref-qwen-transcripts-runtime-base-dir]。末一档 `getGlobalQwenDir()` 先看 `QWEN_HOME` 环境变量，没有则取 `$HOME/.qwen`；`HOME` 取不到时退到 `os.tmpdir()/.qwen` [@ref-qwen-transcripts-global-qwen-dir]。也就是说换机器、换用户或改 `QWEN_HOME` 会让整批会话文件换位置，而 `QWEN_RUNTIME_DIR` 只重定向运行期基目录。

第二段是项目标识。`getProjectDir()` 用 `sanitizeCwd(cwd)` 把工作目录里的非字母数字字符全部替换成 `-`，拼成 `RUNTIME_BASE_DIR/projects/SANITIZED_CWD`；`sanitizeCwd` 在 Windows 上先整体转小写 [@ref-qwen-transcripts-sanitize-cwd]。另一套标识是 `getProjectHash()`：把项目根路径做 SHA-256 十六进制摘要，Windows 上先转小写，用于 `RUNTIME_BASE_DIR/tmp/PROJECT_HASH/…` 这一类目录 [@ref-qwen-transcripts-project-hash]。两套标识并存是有意分工：`projects/SANITIZED_CWD` 承载会话正文，`tmp/PROJECT_HASH` 承载临时产物（shell 历史、checkpoints、工具结果、附件等）[@ref-qwen-transcripts-project-dirs]。

第三段是会话文件本身：`getChatsDir()` 返回 `PROJECT_DIR/chats`，归档态则是 `PROJECT_DIR/chats/archive`，会话文件名为 `${sessionId}.jsonl` [@ref-qwen-transcripts-chats-dirs]。官方文档给出与之相同的说法：会话数据是项目作用域的 JSONL，位于 `~/.qwen/projects/SANITIZED_CWD/chats` [@ref-qwen-transcripts-headless-session-path]。

> **固定来源内部的文档漂移**：同提交的 `SessionService` 类注释仍写 `File location: ~/.qwen/tmp/PROJECT_ID/chats/`（`packages/core/src/services/sessionService.ts` 第 855 行），而同一文件的 `getChatsDir()`、官方 `headless.md` 与上面的路径拼接一致指向 `projects/SANITIZED_CWD/chats`。本节按可执行代码与官方文档给结论，把该注释记为过期；需要引用时以 `getChatsDir()` 为准。

同一会话 ID 周围还有几个必须与正文一起理解的邻近文件：`PROJECT_DIR/chats/SESSION_ID.runtime.json` 是运行期状态 [@ref-qwen-transcripts-runtime-status-path]；`PROJECT_DIR/session-organization.v1.json` 是单个项目共用的组织状态文件，文件名里带 `v1` 版本标记，由 `SessionOrganizationService` 维护 [@ref-qwen-transcripts-organization-store] [@ref-qwen-transcripts-organization-store-path]；写入者锁在 `RUNTIME_BASE_DIR/tmp/session-writer-locks/URL_ENCODED_SESSION_ID.lock`，注意锁文件名走的是 URL 编码而不是项目标识 [@ref-qwen-transcripts-writer-lock-path]；临时产物在 `RUNTIME_BASE_DIR/tmp/PROJECT_HASH/` 下 [@ref-qwen-transcripts-project-dirs]。会话文件名本身受一个正则约束，只接受 32–36 位的十六进制与连字符组合 [@ref-qwen-transcripts-session-file-pattern]。

**关于数据库（`transcripts.database`）**：会话正文不用数据库。固定提交里 `packages/core` 与 `packages/cli` 没有任何 SQLite 依赖，会话存储路径全部经 `SessionService`、`ChatRecordingService` 与 JSONL 工具落到文件；整份 transcript 被整体重写时走的是原子写文件而不是事务 [@ref-qwen-transcripts-jsonl-overwrite-atomic]。仓库内唯一的 SQLite 使用出现在 `packages/qwen-live/src/memory/`，那是另一套记忆子系统（`node:sqlite` 的 `DatabaseSync`），与本产品的会话 transcript 不是同一个存储；它与 CLI 会话记录的关系在本轮来源里没有被证实，本章不对二者下结论。

分工因此是：正文与它恢复所必需的一切（`subtype` 系统记录、压缩检查点、标题与 `parentUuid` 链）都在 `SESSION_ID.jsonl` 里；运行期状态、组织状态、写入者锁、文件历史备份、subagent transcript 各自独立，恢复一个会话不需要读它们，但改动或删除它们会影响"现在有哪些会话""标题与置顶""能否再被写入"这些外围状态。没有索引文件、也没有可从这些辅助文件重建 transcript 的第一方路径：重建方向只有"从 transcript 读出辅助视图"，源码未见反向重建。判定"可重建"所需的反向迁移证据在本轮来源中不存在，因此本章只断言恢复所必需的文件是那一个 `.jsonl`，不断言其它文件丢了就一定不可恢复。

## 命名、父子关系与文件格式 {#transcripts-naming-and-format}

**命名**。会话 ID 必须匹配 `/^[0-9a-fA-F-]{32,36}\.jsonl$/`，即 UUID 形态；这个校验被用作存在性守卫——不匹配的 ID 直接判为不存在，不去碰文件系统 [@ref-qwen-transcripts-session-file-pattern]。项目目录名不是时间戳也不是哈希，而是工作目录逐字符替换后的结果，所以项目路径里出现的字母数字全部可见，其余一律变成 `-`，两个只差符号的项目可能落到同一目录名，源码对此有专门注释说明不同项目可能共享同一 `chats` 目录 [@ref-qwen-transcripts-sanitize-cwd]。锁文件是唯一的例外，它用 `encodeURIComponent(sessionId)`，避免 ID 里的字符破坏路径分层 [@ref-qwen-transcripts-writer-lock-path]。

**父子与分支**。记录级的关系由 `uuid` / `parentUuid` 表达，`parentUuid` 为 `null` 表示会话根记录，因此一棵会话内的对话拓扑可以按父链重建，也可以从任一历史记录分叉 [@ref-qwen-transcripts-record-identity]。会话级的关系由 `system` 记录的 `parent_session` subtype 表达，其载荷只有 `parentSessionId` 一个字段（"Id of the session that spawned this one."）[@ref-qwen-transcripts-parent-session-payload]。分支本身另有一条 `branch_checkpoint` 系统记录，载荷形如 `{ v: 1, startExclusiveRecordUuid, assistantRecordUuid }` [@ref-qwen-transcripts-branch-checkpoint]。

**同一会话的旁挂文件**按固定后缀命名，与正文同目录并列：`SESSION_ID.worktree.json`（worktree 会话状态，文件可能尚未存在，消费者须把 ENOENT 当作"没有活动 worktree"）、`SESSION_ID.pr.json`（PR 绑定）、`SESSION_ID.ledger.jsonl`（追加写的提示词终态账本）[@ref-qwen-transcripts-sidecar-paths] [@ref-qwen-transcripts-prompt-ledger-path]。它们不与正文同格式，账本是独立 JSONL。

**子代理的记录另有一套目录**。每个后台子代理在其会话目录下产生三个并列文件：`agent-AGENT_ID.jsonl` 是规范事件日志、`agent-AGENT_ID.meta.json` 是带 `agentType`、`description`、父会话／父代理 ID 与 `createdAt` 的旁挂元数据、`agent-AGENT_ID.jsonl.stream` 是写者关闭时删除的临时实时文本；布局是 `PROJECT_DIR/subagents/SESSION_ID/` [@ref-qwen-transcripts-subagent-layout]，文件名里的 ID 经 `sanitizeFilenameComponent` 把非字母数字、下划线、连字符的字符换成 `_` [@ref-qwen-transcripts-subagent-jsonl-path]。所以子代理事件不写进主会话 transcript，只通过 `parent_session` 指向父会话。

**格式**。正文是 JSONL：一行一个 `JSON.stringify` 后的对象，行尾加 `\n`。写入用 `appendFile` 追加，并带 `flush: true`，源码注释说明这一选项在每条记录后 fsync，动机是让写入中途被杀死的进程不在盘上留下粘连的 `}{` 记录 [@ref-qwen-transcripts-jsonl-append-fsync]。并发由按文件路径建立的互斥锁串行化，目录在首次写入时按需创建。与之相对，`write()` 是"用一组对象覆盖整个文件"，它经原子写文件完成 [@ref-qwen-transcripts-jsonl-overwrite-atomic]——备份、回滚与重写类操作走的是覆盖路径。子代理的账本合并会显式补换行封住两侧边界，因为读取方跳过空行而粘连的行会同时丢掉两条记录 [@ref-qwen-transcripts-sidecar-paths]。字节层面没有分片、压缩或加密的证据：正文按记录增长，不分片；本轮未找到压缩或加密步骤，因此不断言其不存在于其它运行形态。

## 记录 schema 与生命周期 {#transcripts-record-schema-and-lifecycle}

**schema**。第一方记录类型是上节那一个 `ChatRecord` 接口：必填 `uuid`、`parentUuid`、`sessionId`、`timestamp`、`type`、`cwd`、`version`，可选 `subtype`、`provenance`、`goalContext`、`backgroundTurn`、`promptId`、`message`、`usageMetadata`、`model`、`contextWindowSize`、`toolCallResult`、`systemPayload` 以及 daemon 侧的 `daemonPromptId`、`deliveredTurn` [@ref-qwen-transcripts-record-identity] [@ref-qwen-transcripts-record-cwd-version] [@ref-qwen-transcripts-record-message-payload]。`subtype` 与 `systemPayload` 是一一对应的两半：`subtype` 给出事件种类，`systemPayload` 给出该种类的载荷类型集合 [@ref-qwen-transcripts-record-subtypes-a] [@ref-qwen-transcripts-record-subtypes-b] [@ref-qwen-transcripts-record-system-payload]。脱敏后的最小完整示例如下，字段名与类型取自上面的接口声明，取值全部是占位值；示例取 `branch_checkpoint` 这一系统记录的载荷形状 [@ref-qwen-transcripts-branch-checkpoint]：

```json
{"uuid":"00000000-0000-4000-8000-000000000002","parentUuid":"00000000-0000-4000-8000-000000000001","sessionId":"00000000-0000-4000-8000-00000000abcd","timestamp":"2026-01-01T00:00:00.000Z","type":"system","subtype":"branch_checkpoint","cwd":"/path/to/project","version":"0.0.0","systemPayload":{"v":1,"startExclusiveRecordUuid":"00000000-0000-4000-8000-000000000003","assistantRecordUuid":"00000000-0000-4000-8000-000000000004"}}
```

压缩是一个值得单独看的例子：压缩结果不是改写旧记录，而是追加一条 `subtype: 'chat_compression'` 的系统记录，其载荷含压缩信息、压缩后模型应看到的新历史快照 `compressedHistory`（摘要轮加保留尾部）、与之平行的 `promptIds` 与已完成的工具调用 ID [@ref-qwen-transcripts-compression-payload]。旧记录因此原样保留，恢复时按记录重建压缩后的上下文；压缩触发阈值属于配置机制主题（`config.defaults`），本章不重复。

**schema 缺口（`transcripts.schema` 记为 `partial` 的原因）**，逐条列出：

1. 记录本身**没有版本字段**。源码里带版本语义的是旁挂文件（`session-organization.v1.json`）、锁记录（`schema_version` 分 1/2/3 三代）与三个 `managed_session_*_v1` 包装 subtype，而基础记录没有对应的版本标记，因此本轮来源无法证明"同一会话文件跨版本如何迁移"。
2. **没有第一方 schema 迁移规则**。读取侧存在容错恢复——`jsonl-utils` 能从一条物理行里按花括号深度切出粘连的多个顶层对象，但注释明确其局限：只恢复顶层 `{...}` 记录，顶层数组记录不会拆分 [@ref-qwen-transcripts-jsonl-append-fsync]。这是损坏恢复，不是版本迁移。
3. **多数 subtype 的载荷结构不在同一个文件里**，只在本模块声明了类型名（例如 `ChatCompressionRecordPayload` 与 `ParentSessionRecordPayload` 在此，其余分散于工具、目标、子代理等模块）[@ref-qwen-transcripts-record-system-payload]。想要逐字段的完整 schema，需要按 subtype 分别打开对应源码，本章不做跨模块归纳。
4. `managed_session_*` 记录说明存在另一条记录通道（Managed 会话的记录写入方），但它与 legacy JSONL 的字段对应关系在本轮只看到 subtype 名称，未见完整映射表 [@ref-qwen-transcripts-record-subtypes-b]。

**生命周期**。创建：首条记录写入前调用 `ensureConversationFile()`，用 `flag: 'wx'` 独占创建空文件，已存在时按 `EEXIST` 吞掉继续 [@ref-qwen-transcripts-conversation-file-create]——因此磁盘上出现零字节 transcript 是合法状态，代表"已建立但还没有记录"。追加：所有写入排进一条内部的 operation tail，按序执行；有写入者租约时经租约追加，无租约且未要求租约时走 legacy 的 JSONL 行写入，写失败会把记录器置为永久降级并把错误绑定到该 `sessionId` [@ref-qwen-transcripts-append-write-path]。刷盘：`flush()` 先等待 operation tail 排空，再抛出累积的写失败 [@ref-qwen-transcripts-flush]；`readActiveTranscriptChain()` 也是先 `flush()` 再读，可见"读到最新"依赖显式 flush 而不是后台定时器。关闭：记录器有 `close()`，支持 handoff 语义；释放租约的具体条件见归档与清理一节。恢复：`--continue` / `--resume SESSION_ID` 走 `SessionService` 的加载路径，恢复时重建历史、工具输出与压缩检查点，官方文档对此有明确表述 [@ref-qwen-transcripts-headless-session-path]。分支：分叉会话时生成**新的** session ID，旧会话文件保持原样。上下文压缩后延续：如上，压缩以追加系统记录实现，不截断文件 [@ref-qwen-transcripts-compression-payload]。交给子代理：子代理事件写入独立的 `PROJECT_DIR/subagents/SESSION_ID/agent-AGENT_ID.jsonl`，父会话通过 `parent_session` 记录建立关系 [@ref-qwen-transcripts-subagent-layout] [@ref-qwen-transcripts-parent-session-payload]。

## 归档与清理 {#transcripts-archive-and-cleanup}

**归档是移动，不是导出**。归档态目录是 `PROJECT_DIR/chats/archive`，会话文件在两个目录之间按同一 `SESSION_ID.jsonl` 命名 [@ref-qwen-transcripts-chats-dirs]；实现是先确保归档目录存在、再 `renameSync` 同一文件系统内的源文件到目标，失败包装成 `archive` 移动错误，随后搬运旁挂文件 [@ref-qwen-transcripts-archive-move]。`qwen serve` 的生命周期文档给出对外契约：`POST /sessions/archive` 把不活跃会话的 JSONL 从 `chats/` 移到 `chats/archive/`；目标会话还活着时，先进入每会话归档闸门并执行严格关闭，要求 ACP 子进程把 `ChatRecordingService` 刷盘，关闭或刷盘失败就把 JSONL 留在原处 [@ref-qwen-transcripts-daemon-archive]。`POST /sessions/unarchive` 只是存储状态回迁，客户端随后必须自己调用 `session/load` 或 `session/resume`；归档会话的加载／恢复返回 `409 session_archived`，与归档转换竞态的写操作返回 `409 session_archiving` [@ref-qwen-transcripts-daemon-archive]。

因此归档的**损失面**很窄：文件内容不重写，只换目录；恢复后信息完整，代价是路径改变，并且归档态在业务上不可直接加载，必须先 unarchive。需要连同搬运的是旁挂文件，源码把它们按归档态分别定位 [@ref-qwen-transcripts-sidecar-paths]。本轮**未**在 CLI 交互界面的斜杠命令里找到归档入口——固定提交里归档／反归档／删除的调用方在 `qwen serve` 的路由与后台服务侧；交互式 CLI 是否有等价入口属于未查证项，不要按"没有找到"推断为不支持。导出或外部备份也没有第一方机制证据，本章只描述移动式归档。

**删除**。同一份生命周期文档描述 `POST /sessions/delete`：接受最多 100 个 `sessionIds`，关闭桥接会话，删除活跃或已归档的 transcript 文件；若同一 ID 在两处都存在，硬删除会同时删掉两者以便清理冲突态；它会清理活跃与归档的 worktree 旁挂文件，但**声明**保留 file-history 快照、subagent transcript 与运行期旁挂文件；使用 `Promise.allSettled` 保证韧性，返回 `{ removed, notFound, errors }` [@ref-qwen-transcripts-daemon-delete]。`SessionService` 侧的清理顺序则是：移除 worktree 旁挂、PR 旁挂、提示词账本、file-history 备份（按 `GLOBAL_QWEN_DIR/file-history/SESSION_ID` 递归删除），最后递归删除该会话的受管资源根 [@ref-qwen-transcripts-remove-cleanup]。

> **未解决分歧（`transcripts.cleanup` 记为 `partial` 的原因）**：同一提交的两处固定来源对"删除是否连带 file-history"说法不一致——生命周期文档说批量删除保留 file-history 快照，而 `SessionService` 的清理路径显式调用了 file-history 备份的递归删除，且删除根用的是全局 qwen 目录而非项目目录。旁挂清理范围也不完全重合。本轮无法判定哪条描述对应读者实际触发的删除路径（可能分别对应不同的调用方或文档简写），因此只并列陈述两者，不给"删了会怎样"的确定结论。

**删除前必须停止的写入者**。会话写入受写入者租约保护，锁文件位于 `RUNTIME_BASE_DIR/tmp/session-writer-locks/URL_ENCODED_SESSION_ID.lock` [@ref-qwen-transcripts-writer-lock-path]。官方恢复文档把这件事讲得很直接：`session_writer_conflict` 表示写者栅栏阻止了访问，可能是别的进程开着该会话，也可能是残留锁无法安全回收——它**不**证明另一个写者此刻还活着；`session_writer_unavailable` 表示无法验证所有权，重试不构成绕过授权 [@ref-qwen-transcripts-writer-conflict]。自动回收的边界同样明确：正常关闭释放租约；已死的活跃写者只有在身份检查确认其进程属于同一已验证存活域时才可回收；活着或卡住的写者保持被栅栏，杀死守护进程不够，如果它的 ACP 写者子进程还活着；缺失的 PID 不足以证明外部写者已退出；畸形记录与不确定的 transcript 身份一律失败关闭，光凭时间流逝永不授权接管 [@ref-qwen-transcripts-writer-reclaim-rules]。需要人工介入时，官方步骤是：先从本地诊断确认受影响的会话与存储，保留失败日志与该 transcript、锁工件的私有备份；然后**围堵所有可能的写者**，包括脱离的 ACP 子进程、其它守护进程、容器、命名空间以及共享同一文件系统的其它机器，并从相关宿主／命名空间验证围堵是否成立 [@ref-qwen-transcripts-residual-lock-recovery]。同一文档声明本版本没有强制解锁 API，也没有自动的跨重启／超时接管。**没有证据不等于可以安全删除**：手工删 transcript 而不处理锁与其它写入者，只会让后续状态更难判断。

**级联与孤儿**。归档态与活跃态同名文件同时存在构成"冲突态"，源码与文档都把这种状态显式建模：只有显式给出 `resolveConflicts: true` 时才移动，且归档保留归档副本、反归档保留活跃副本，否则两个持久化副本都不移动、不删除、不覆盖，作为批量结果里的 `errors` 返回 [@ref-qwen-transcripts-daemon-archive]。空、损坏、孤立的 transcript 文件仍然可以被这些生命周期操作处理，即使它们无法被当作会话加载 [@ref-qwen-transcripts-daemon-archive]。因此"文件还在但读不出来"不等于不能删，也不等于删了就没问题——归属检查可能故意失败关闭，需要人工判断。

## 定位、完整性与排错 {#transcripts-diagnostics-and-recovery}

日常定位用 CLI 自带的会话命令。`qwen sessions list` 列出最近的会话会话，`qwen sessions ps` 列出当前正在跑的交互式会话，`qwen sessions controllers` 管理受信控制者令牌 [@ref-qwen-transcripts-sessions-command-table]。`qwen sessions list` 默认输出表格（SESSION ID、STARTED、TITLE、BRANCH、PROMPT），加 `--json` 后按 JSON Lines 输出，每行字段为 `sessionId, startTime, mtime, prompt, gitBranch, customTitle, titleSource, filePath, cwd`——`filePath` 直接给出该会话 transcript 的绝对路径，`--limit` 默认 20，"还有更多"的提示走 stderr 以便管道安全 [@ref-qwen-transcripts-sessions-list-output]。`qwen sessions ps` 面向"这台机器上可见的会话记录"，它同时展示活跃进程登记与标记为 `managed` 的 Agent View 记录，会在发现时清扫被强杀会话留下的记录；一条 managed 记录是持久簿记，不是其 worker 仍活着的证据；一次性的 `qwen -p` 从不登记也不会出现 [@ref-qwen-transcripts-sessions-ps-scope]。

**记录降级时的可见信号**。写入失败不会静默：CLI 定义了一条失败消息，说明会话记录在写失败后停止、该会话的新消息不会被保存，应检查磁盘空间与权限后重开会话，并提示查看调试日志；交互式界面对应文案建议运行 `/clear` 开启一个新的被记录会话 [@ref-qwen-transcripts-recording-failure-message]。这两条文案是判断"记录还在不在写"的第一手信号。

**检查完整性与状态**。逐条记录都是独立一行且写入带 `flush: true` fsync，因此判断磁盘上的完整性可以按行解析；读取侧对粘连的 `}{` 有容错恢复，但只覆盖顶层对象记录 [@ref-qwen-transcripts-jsonl-append-fsync]。判断"是不是被别的进程占着"看锁目录：锁路径由 `runtimeBaseDir` 与会话 ID 拼出（`RUNTIME_BASE_DIR/tmp/session-writer-locks/URL_ENCODED_SESSION_ID.lock`）[@ref-qwen-transcripts-writer-lock-path]，可据此定位单个会话的锁工件；官方文档提示租约获取失败的诊断包含会话 ID、错误种类与解析出的确切 `lockPath`，并明确不要凭主工作区或默认家目录去猜锁路径，同时指出对外的 HTTP/ACP 错误有意省略路径与所有权记录，诊断文件须保持私有 [@ref-qwen-transcripts-writer-diagnostics]。是否可自动回收仍按上文那组规则判断 [@ref-qwen-transcripts-writer-reclaim-rules]。

**备份、恢复与清理的排错顺序**（按官方恢复文档的步骤整理）：先从本地诊断确定受影响的会话与存储并做私有备份；再围堵所有可能的写者并验证围堵；从相关宿主或命名空间确认围栏成立之后，才在运维监督下把逐个核验过的残留工件移到私有恢复存储——绝不递归删除整个锁目录、也绝不批量删除全部锁；最后启动一个更新后的守护进程、恢复原会话、追加之前先核对最后一条已记录轮次，保留备份直到连续性确认 [@ref-qwen-transcripts-residual-lock-recovery]。会话归属判断还有一个跨进程线索：若记录的 `cwd` 不等于当前项目哈希，源码会先尝试从 worktree 路径（形如 `REPO_ROOT/.qwen/worktrees/SLUG`）反推仓库根并比对哈希，再退到运行期状态文件核对；两者都失败才判为不属当前项目。

**跨主题边界**。控制 `general.chatRecording` 生效与否的加载顺序与合并规则写在配置机制主题（`config.sources`、`config.runtime`、`config.defaults`）；子代理记录的调用与编排写在 custom agents 主题（`agents.invocation`、`agents.limits`）。本章只陈述记录形态本身。

**本节剩余缺口**：调试日志与遥测各自的路径、字段与保留策略不在本章范围内（`docs/users/features/headless.md` 只作为会话路径与恢复语义的旁证被引用）；固定提交里没有面向 transcript 的官方完整性校验命令，本节的完整性判断依据是 JSONL 逐行解析规则与 fsync 语义，不是一个可执行的校验器。