---
schema_version: 3
record_kind: production
edition_id: cline-local_transcripts-v1
harness_id: cline
topic: local_transcripts
title: "Cline CLI 的本地会话记录：位置、格式、生命周期与清理"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs:
      - ref-cline-lt-input-history-path
      - ref-cline-lt-input-history-append
      - ref-cline-lt-stale-hook-log
      - ref-cline-lt-persist-messages-upload
  - section_id: transcripts-layout
    surface_ids: [cli]
    source_refs:
      - ref-cline-lt-cline-dir
      - ref-cline-lt-session-data-dir
      - ref-cline-lt-db-data-dir
      - ref-cline-lt-messages-path
      - ref-cline-lt-manifest-compaction-path
      - ref-cline-lt-persist-messages
      - ref-cline-lt-session-id
      - ref-cline-lt-subsession-id
      - ref-cline-docs-cli-layout
  - section_id: transcripts-schema
    surface_ids: [cli]
    source_refs:
      - ref-cline-lt-manifest-schema
      - ref-cline-lt-messages-file-payload
      - ref-cline-lt-messages-file-context
      - ref-cline-lt-compaction-schema
      - ref-cline-lt-sessions-ddl
      - ref-cline-lt-message-fields
      - ref-cline-lt-message-metrics
      - ref-cline-lt-schema-legacy-migrations
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-cline-lt-empty-messages-file
      - ref-cline-lt-session-start-artifacts
      - ref-cline-lt-session-manifest-init
      - ref-cline-lt-persist-iteration-end
      - ref-cline-lt-persist-after-assistant
      - ref-cline-lt-read-session-messages
      - ref-cline-lt-fork-metadata
      - ref-cline-lt-fork-command
  - section_id: transcripts-index
    surface_ids: [cli]
    source_refs:
      - ref-cline-lt-sessions-db
      - ref-cline-lt-schema-wal
      - ref-cline-lt-backend-selection
      - ref-cline-lt-file-backend-paths
      - ref-cline-lt-manifest-rebuild
  - section_id: transcripts-archive-cleanup-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cline-lt-history-delete
      - ref-cline-lt-delete-session
      - ref-cline-lt-delete-session-files
      - ref-cline-lt-session-row-delete
      - ref-cline-lt-history-export
      - ref-cline-lt-export-output
      - ref-cline-lt-read-messages-artifact
      - ref-cline-lt-history-list
      - ref-cline-lt-cli-session-list
      - ref-cline-lt-read-messages-file
      - ref-cline-lt-read-messages-file-fallback
      - ref-cline-lt-compaction-sidecar-recovery
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: partial
        source_refs:
          - ref-cline-lt-input-history-path
          - ref-cline-lt-input-history-append
          - ref-cline-lt-stale-hook-log
          - ref-cline-lt-persist-messages-upload
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout
        status: conflict
        source_refs:
          - ref-cline-lt-session-data-dir
          - ref-cline-lt-db-data-dir
          - ref-cline-lt-messages-path
          - ref-cline-docs-cli-layout
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout
        status: answered
        source_refs:
          - ref-cline-lt-messages-path
          - ref-cline-lt-manifest-compaction-path
          - ref-cline-lt-session-id
          - ref-cline-lt-subsession-id
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout
        status: answered
        source_refs:
          - ref-cline-lt-persist-messages
          - ref-cline-lt-messages-path
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-schema
        status: partial
        source_refs:
          - ref-cline-lt-manifest-schema
          - ref-cline-lt-messages-file-payload
          - ref-cline-lt-message-fields
          - ref-cline-lt-sessions-ddl
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs:
          - ref-cline-lt-session-manifest-init
          - ref-cline-lt-persist-iteration-end
          - ref-cline-lt-read-session-messages
          - ref-cline-lt-fork-command
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index
        status: answered
        source_refs:
          - ref-cline-lt-sessions-db
          - ref-cline-lt-backend-selection
          - ref-cline-lt-manifest-rebuild
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup-diagnostics
        status: partial
        source_refs:
          - ref-cline-lt-history-export
          - ref-cline-lt-export-output
          - ref-cline-lt-read-messages-artifact
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup-diagnostics
        status: partial
        source_refs:
          - ref-cline-lt-history-delete
          - ref-cline-lt-delete-session
          - ref-cline-lt-delete-session-files
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup-diagnostics
        status: partial
        source_refs:
          - ref-cline-lt-history-list
          - ref-cline-lt-read-messages-file
          - ref-cline-lt-compaction-sidecar-recovery
---

Cline CLI 把一次会话拆成三个文件加一条索引记录，落在用户级目录里，不随项目走。下面的结论来自固定源码快照 `source-cline-repo` 的 commit `dec80dadfa4fcb5ec6978aa7055406709dddd43d`（抓取时间 2026-10-06），以及 2026-10-06 抓取的官方 CLI 参考文档快照 `snapshot-cline-docs-cli-20261006`（`https://docs.cline.bot/cli/cli-reference.md`，该文档未标注适用版本，`version_applicability` 为 `unknown`）。源码 commit 只代表源码树，不证明任何 npm 发行包或扩展的行为；本章只覆盖 catalog 中的 `cli` 界面，`vscode`、`jetbrains`、`desktop` 三个界面的记录机制本轮未调查，查询会把这三组答案派生为 `not_investigated`。

## 记录了什么，没有记录什么 {#transcripts-scope}

会话正文不是独立的“transcript”文件，而是每次落盘时重写的一个 JSON 文件，其中包含模型侧完整消息列表：用户输入、助手回复、工具调用与工具结果，以及每条消息的元数据。系统提示词也随文件一起写入（字段 `system_prompt`），因此该文件包含模型实际看到的提示内容。CLI 侧的记录辅助层还有两处：交互式输入历史单独存成 `user_input_history.jsonl` [@ref-cline-lt-input-history-path]，用于上下键回溯，不进入会话文件；该文件每次整体重写并去重，只保留最近 20 条输入 [@ref-cline-lt-input-history-append]；会话被判定为残留（进程已不在）时，CLI 会向 `hooks.jsonl` 追加一条带时间戳、hook 名、原因、会话 id 与 pid 的行 [@ref-cline-lt-stale-hook-log]，该文件路径可由 `CLINE_HOOKS_LOG_PATH` 改写。

企业集成路径下还有一个额外去处：CLI 注册的 messages artifact uploader 会在消息文件写盘后把它交给上层处理，失败只记 debug 不影响会话 [@ref-cline-lt-persist-messages-upload]。是否真的上传、以及上传到何处，由企业集成代码决定，本轮没有取得该侧证据。

尚未证实的部分：本轮没有在固定来源里找到关闭会话落盘的用户开关。已查入口包括 CLI 的 `history` 子命令集合、路径解析里可用的环境变量（`CLINE_DIR`、`CLINE_DATA_DIR`、`CLINE_SESSION_DATA_DIR`、`CLINE_DB_DATA_DIR`）、以及 `SessionManifestStore.persistSessionMessages` 的全部调用点，它们都是无条件写入。因此“记录范围”一题只能给出已落盘内容的清单，开关一栏留空，不据此推断可以关闭记录。遥测与缓存不在本章范围内。

## 目录、命名与格式 {#transcripts-layout}

路径自上而下解析：数据根先是 `setClineDir()` 显式值或 `CLINE_DIR`，都没有时落到用户主目录下的 `.cline` [@ref-cline-lt-cline-dir]；数据目录是 `CLINE_DATA_DIR` 或 `<数据根>/data`；会话产物目录是 `CLINE_SESSION_DATA_DIR` 或 `<数据目录>/sessions` [@ref-cline-lt-session-data-dir]；SQLite 目录是 `CLINE_DB_DATA_DIR` 或 `<数据根>/db` [@ref-cline-lt-db-data-dir]。也就是说换机器、换用户或改环境变量都会换一套位置，而项目作用域只以 `cwd` / `workspace_root` 字段被记录在会话行和 manifest 里，不改变产物目录。

每个会话在自己的子目录中放三份文件 [@ref-cline-lt-messages-path] [@ref-cline-lt-manifest-compaction-path]：

```text
[会话产物目录]/SESSION_ID/
  SESSION_ID.messages.json     # 正文：模型消息列表 + 提示词 + origin
  SESSION_ID.json              # manifest：会话身份、状态、模型、cwd、metadata
  SESSION_ID.compaction.json   # 上下文压缩边车文件（仅压缩后存在）
```

会话 id 由 `createSessionId()` 生成，形态是 `[可选前缀][毫秒时间戳]_[5 位随机串]` [@ref-cline-lt-session-id]，其中时间戳让 id 天然按时间排序。子会话不另开目录：id 里内嵌父 id，subagent 为 `ROOT__AGENT_ID`，团队任务为 `ROOT__teamtask__AGENT_ID__[6 位随机串]`，非法字符被替换为下划线并截断到 180 字符 [@ref-cline-lt-subsession-id]；它们的正文文件写在根会话目录下，文件名分别是 `AGENT_ID.messages.json` 和 `AGENT_ID__TASK_ID.messages.json`。

格式统一是 UTF-8 的单个 JSON 文件：两空格缩进、结尾换行，每次持久化都用 `writeFileSync` 整体覆盖，不追加、不分片、不压缩 [@ref-cline-lt-persist-messages]。两个 JSONL 旁路文件的写入方式相反——输入历史每次整体重写并去重、上限 20 条 [@ref-cline-lt-input-history-append]，而 `hooks.jsonl` 是逐行追加。

此处有一处需要读者自行核对的来源分歧：官方 CLI 参考文档的目录图把 `~/.cline/data/sessions/` 标注为 “Session database (SQLite)” [@ref-cline-docs-cli-layout]，而固定源码把 SQLite 文件解析到 `<数据根>/db/sessions.db`，把 `sessions/` 用作逐会话产物目录。文档快照未标注适用版本，源码 commit 也只代表该源码树，两者的适用边界无法由本轮证据判定，因此该题记为 `conflict`。

## 记录里有哪些字段 {#transcripts-schema}

manifest 是有版本号的可校验结构，`version` 固定为 1，必填项包含 `session_id`、`source`、`pid`、`started_at`、`status`、`interactive`、`provider`、`model`、`cwd`、`workspace_root`、三个 `enable_*` 开关，可选项包含 `ended_at`、`exit_code`、`team_name`、`prompt`、`metadata`、`messages_path`、`compaction_path` [@ref-cline-lt-manifest-schema]。正文文件的顶层结构同样声明 `version: 1`，加上 `updated_at`、`agent`（`lead` / `subagent` / `teammate`）、`sessionId`、可选 `taskType`、可选 `system_prompt` 和 `messages` 数组 [@ref-cline-lt-messages-file-payload]；其中 `origin` 记录来源、模式、父会话与子代理标识 [@ref-cline-lt-messages-file-context]。压缩边车文件带 `version`、`updated_at`、`source_message_count`、可选的 `source_prefix_hash` / `source_last_message_key`、`messages` 与 `system_prompt` [@ref-cline-lt-compaction-schema]。

单条消息在落盘前会被归一化：缺失的 `id` 用随机串补齐，模型标识统一收敛到 `modelInfo.{id,provider,family}`，旧的 `providerId` / `modelId` 字段被删除 [@ref-cline-lt-message-fields]；助手消息会带上本轮用量指标与时间戳 [@ref-cline-lt-message-metrics]。数据库侧的 `sessions` 表保存的是元数据行而不是正文，正文路径单独放在 `messages_path` 列 [@ref-cline-lt-sessions-ddl]。

一个脱敏的最小正文文件示例（占位值，只保留结构）：

```json
{
  "version": 1,
  "updated_at": "[ISO-8601 时间]",
  "agent": "lead",
  "sessionId": "SESSION_ID",
  "origin": { "source": "cli", "mode": "user", "sessionId": "SESSION_ID" },
  "messages": [
    { "role": "user", "content": "[用户输入占位]", "id": "MESSAGE_ID" },
    { "role": "assistant", "content": "[助手输出占位]", "id": "MESSAGE_ID", "ts": 0 }
  ]
}
```

仍缺的 schema 细节照实列出：消息数组内 `content` 的多模态形态、工具调用与工具结果的具体字段、`metadata` 里的 `displayOnly` 及其它子键的完整集合，都没有在本轮引用的固定文件里被逐字段定义；`StoredMessageWithMetadata` 的完整类型定义位于 `@cline/shared` 与 `@cline/llms` 包内，本轮未取证。字段演进规则方面只找到数据库列的迁移方式，未找到消息文件或 manifest 的版本迁移分支——`version` 是字面量 `1`，读取端对不认识的形状采取容错而非升级 [@ref-cline-lt-schema-legacy-migrations]。官方文档没有给出这两个文件的字段表。

## 一次会话的记录生命周期 {#transcripts-lifecycle}

创建：运行时为会话计算 id、在会话目录下拼出 `messages.json` 与 manifest 路径 [@ref-cline-lt-session-start-artifacts]，随后以 `SessionManifestSchema` 校验并写出 manifest，其中 `status` 依据是否带首轮提示词在 `idle` 与 `running` 之间选择 [@ref-cline-lt-session-manifest-init]；正文文件在此时先以空消息数组落盘，保证文件从一开始就存在 [@ref-cline-lt-empty-messages-file]。

追加：正文不是增量追加，而是每次以当前内存中的完整消息列表重写。触发点有两处——代理迭代结束事件 [@ref-cline-lt-persist-iteration-end]，以及收到 `assistant-message` 事件后 [@ref-cline-lt-persist-after-assistant]。写盘发生在该轮结束而非每条 token 流入时，因此进程被强杀时最后一次重写之后的内容不会出现在文件里。

恢复：恢复一个会话时先按索引行的 `messagesPath` 读取，缺失时回退到 manifest 里的 `messages_path` [@ref-cline-lt-read-session-messages]。用 `--id SESSION_ID` 恢复且同时提供了历史消息、不带新提示词时，运行时还会直接沿用磁盘上既有的 manifest 及其记录的 `cwd` / `workspace_root`。

分支：交互模式提供 `/fork` 命令，把当前会话分叉成新会话并切换过去 [@ref-cline-lt-fork-command]；分叉关系不是靠目录结构表达，而是写进新会话的 `metadata.fork`，包含 `forkedFromSessionId`、`forkedAt`、`source` 与可选的 `beforeRunCount`、检查点快照 [@ref-cline-lt-fork-metadata]。交给子代理或团队任务时，父子关系同时体现在 id 编码、数据库的 `parent_session_id` 列和正文文件的 `origin.parentThreadId` 上。

上下文压缩后延续：压缩结果写入独立的 `.compaction.json` 边车文件（原子写），并把该路径回填进 manifest 的 `compaction_path`；恢复时先读边车、校验通过才采用其中的压缩后消息与来源计数。

## 索引数据库与正文文件的分工 {#transcripts-index}

CLI 默认用 SQLite 存会话索引：库文件是 `<数据根>/db/sessions.db`，通过 `node:sqlite` 打开，建表时开启 WAL 并设置 5 秒忙等超时 [@ref-cline-lt-sessions-db] [@ref-cline-lt-schema-wal]。库内除 `sessions` 表外还有子代理生成队列表与定时任务相关表；本轮只关注 `sessions` 表，它保存状态、pid、模型、cwd、metadata JSON 与正文文件路径，不保存消息正文。旧库升级靠逐列 `ALTER TABLE` 补列（例如 `workspace_root` 补齐后从 `cwd` 回填）[@ref-cline-lt-schema-legacy-migrations]。

SQLite 不可用时运行时整体回退到基于文件的后端，此时索引改为会话目录下的 `sessions.index.json`，子代理生成队列改为 `subagent-spawn-queue.json`，写入走临时文件加 rename 的原子替换 [@ref-cline-lt-backend-selection] [@ref-cline-lt-file-backend-paths]。两种后端的选择发生在创建运行时的那一刻，源码里没有让用户切换后端的配置项；CLI 文档提到的 `CLINE_SESSION_BACKEND_MODE` 属于后端路由，本轮没有取到它如何影响这一选择的证据。

因此恢复所必需的文件是：`sessions/` 下的会话目录（正文 + manifest，压缩后另加边车文件）；数据库与 JSON 索引都可从 manifest 重建——写消息前若索引里查不到该会话，运行时会从磁盘 manifest 重新认领一行并写回索引 [@ref-cline-lt-manifest-rebuild]。反过来说，只备份数据库不足以恢复对话，只备份正文文件也可以靠 manifest 回退被列出（见下一节）。

## 导出、删除与排错 {#transcripts-archive-cleanup-diagnostics}

原生“归档”开关在本轮来源中未找到；可用的是导出。`cline history export SESSION_ID [-o PATH]` 把会话导出为单文件 HTML，或按内部函数支持的 JSON 形态 [@ref-cline-lt-history-export] [@ref-cline-lt-export-output]。导出的内容是重新组装的 `ConversationHistory`：版本号、`updated_at`、`messages`、会话 id，以及当 manifest 的 metadata 里有 `systemPrompt` 时附带的系统提示词 [@ref-cline-lt-read-messages-artifact]。它不包含 manifest、compaction 边车文件与数据库行，因此导出件不能直接被 CLI 当作会话恢复；把它当作长期备份时，机器可移植性取决于其中是否内嵌了原始绝对路径，这一点本轮没有进一步证据。手动复制整个会话目录则相反：正文与 manifest 一起带走，但索引行仍指向原机器的路径。

删除的官方入口是 `cline history delete --session-id SESSION_ID` [@ref-cline-lt-history-delete]。删除先在索引里找行，找不到就退回按 manifest 认领 [@ref-cline-lt-delete-session]；对根会话会连带删除子会话的索引行、它们的正文、压缩边车文件与 manifest，并清理相关检查点引用 [@ref-cline-lt-delete-session-files]；数据库层的删除按 `session_id` 与 `parent_session_id` 两步执行，父会话被删时子行不再单独保留 [@ref-cline-lt-session-row-delete]。必须先停止的写入者是仍在运行的 CLI 进程与 hub 守护进程——源码里写盘是无条件覆盖，没有文件锁或冲突检测，运行中删除会被后续持久化重新写回。级联删除之外，手动只删数据库行会留下孤儿目录；只删会话目录则索引行仍在，但列表与读消息都能退回 manifest 与“文件缺失即空”的容错路径。

需要说明的是：手动删除不等于安全清理。本轮在已查入口（`history` 命令集合、会话存储与持久化服务）中没有找到会话记录的自动保留期或批量清理命令，因此不能断言“删掉不会影响别的机制”。

排错入口有三个层次。列表层用 `cline history [--json] [--limit N]` [@ref-cline-lt-history-list]，CLI 在其后端查询时打开了 manifest 回退，所以索引损坏时仍可能列出磁盘上的会话 [@ref-cline-lt-cli-session-list]。读取层对正文文件是容错的：文件不存在、空白或 JSON 解析失败一律当作空消息列表，同时也接受“顶层就是数组”的旧形态 [@ref-cline-lt-read-messages-file] [@ref-cline-lt-read-messages-file-fallback]——这意味着一个被截断的正文文件不会报错，只会让恢复出来的会话变短。压缩边车文件损坏时同样被忽略，并在日志里记下“规范历史未被改动，删除该边车文件是安全的” [@ref-cline-lt-compaction-sidecar-recovery]。

已查但未取得的诊断能力：CLI 的 `doctor` 命令源码中未发现针对会话记录完整性的检查项；也没有找到校验正文文件与 manifest 是否互相一致的官方命令。排错时目前只能靠 `history` 输出、直接读取会话目录下的三个文件，以及删除后重新启动会话观察是否重建。
