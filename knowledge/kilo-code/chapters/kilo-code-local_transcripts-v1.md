---
schema_version: 3
record_kind: production
edition_id: kilo-code-local_transcripts-v1
harness_id: kilo-code
topic: local_transcripts
title: "Kilo Code CLI 本地 Transcript：记录范围、存储位置、schema、生命周期、保留与排错"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      - ref-kilo-code-lt-storage-root-paths
      - ref-kilo-code-lt-storage-config-override
      - ref-kilo-code-lt-state-dir-sticky
      - ref-kilo-code-lt-state-dir-fallback
      - ref-kilo-code-lt-db-path-override
      - ref-kilo-code-lt-db-channel-names
      - ref-kilo-code-lt-snapshot-gitdir
      - ref-kilo-code-lt-tool-output-dir
      - ref-kilo-code-lt-legacy-json-storage-root
      - ref-kilo-code-lt-session-diff-json
      - ref-kilo-code-lt-runtime-json-remaining-doc
      - ref-kilo-code-lt-db-path-doc
      - ref-kilo-code-lt-local-vs-cloud-doc
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs:
      - ref-kilo-code-lt-session-table-fields
      - ref-kilo-code-lt-export-part-types
      - ref-kilo-code-lt-export-tool-part
      - ref-kilo-code-lt-recall-text-fields
      - ref-kilo-code-lt-recall-part-filter
      - ref-kilo-code-lt-share-gate
      - ref-kilo-code-lt-share-auto-create
  - section_id: transcripts-record-format
    surface_ids: [cli]
    source_refs:
      - ref-kilo-code-lt-message-table
      - ref-kilo-code-lt-part-table
      - ref-kilo-code-lt-db-pragmas
      - ref-kilo-code-lt-projector-part-write
      - ref-kilo-code-lt-text-part-schema
      - ref-kilo-code-lt-compaction-part-schema
      - ref-kilo-code-lt-id-prefixes
      - ref-kilo-code-lt-identifier-encoding
      - ref-kilo-code-lt-session-table-fields
      - ref-kilo-code-lt-session-archive-index
      - ref-kilo-code-lt-runtime-storage-doc
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-kilo-code-lt-projector-message-write
      - ref-kilo-code-lt-compaction-record
      - ref-kilo-code-lt-fork-child-session-link
      - ref-kilo-code-lt-resume-commands-doc
      - ref-kilo-code-lt-projector-session-delete
  - section_id: transcripts-retention-cleanup
    surface_ids: [cli]
    source_refs:
      - ref-kilo-code-lt-retention-config-schema
      - ref-kilo-code-lt-retention-gate
      - ref-kilo-code-lt-retention-policy
      - ref-kilo-code-lt-retention-selection
      - ref-kilo-code-lt-retention-roots
      - ref-kilo-code-lt-retention-run
      - ref-kilo-code-lt-retention-reclaim
      - ref-kilo-code-lt-retention-http-trigger
      - ref-kilo-code-lt-cleanup-policy-doc
      - ref-kilo-code-lt-cleanup-config-doc
      - ref-kilo-code-lt-cleanup-protected-doc
      - ref-kilo-code-lt-cleanup-snapshot-gc-doc
      - ref-kilo-code-lt-session-delete-cli
      - ref-kilo-code-lt-projector-session-delete
      - ref-kilo-code-lt-reset-procedure-doc
      - ref-kilo-code-lt-json-migration-bootstrap
      - ref-kilo-code-lt-runtime-storage-doc
      - ref-kilo-code-lt-message-table
      - ref-kilo-code-lt-part-table
      - ref-kilo-code-lt-session-diff-json
      - ref-kilo-code-lt-snapshot-gitdir
      - ref-kilo-code-lt-runtime-json-remaining-doc
  - section_id: transcripts-export-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-kilo-code-lt-export-cli
      - ref-kilo-code-lt-export-cli-output
      - ref-kilo-code-lt-import-cli-messages
      - ref-kilo-code-lt-import-cli-parts
      - ref-kilo-code-lt-transcript-markdown
      - ref-kilo-code-lt-session-archive-index
      - ref-kilo-code-lt-cleanup-config-doc
      - ref-kilo-code-lt-db-path-doc
      - ref-kilo-code-lt-db-cli-query
      - ref-kilo-code-lt-db-cli-shell
      - ref-kilo-code-lt-db-inspection-doc
      - ref-kilo-code-lt-sqlite-shell-doc
      - ref-kilo-code-lt-retention-state-file
      - ref-kilo-code-lt-reset-procedure-doc
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: partial
        source_refs:
          - ref-kilo-code-lt-session-table-fields
          - ref-kilo-code-lt-export-part-types
          - ref-kilo-code-lt-export-tool-part
          - ref-kilo-code-lt-recall-text-fields
          - ref-kilo-code-lt-recall-part-filter
          - ref-kilo-code-lt-share-gate
          - ref-kilo-code-lt-share-auto-create
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-kilo-code-lt-storage-root-paths
          - ref-kilo-code-lt-storage-config-override
          - ref-kilo-code-lt-state-dir-sticky
          - ref-kilo-code-lt-state-dir-fallback
          - ref-kilo-code-lt-db-path-override
          - ref-kilo-code-lt-db-channel-names
          - ref-kilo-code-lt-snapshot-gitdir
          - ref-kilo-code-lt-tool-output-dir
          - ref-kilo-code-lt-legacy-json-storage-root
          - ref-kilo-code-lt-session-diff-json
          - ref-kilo-code-lt-db-path-doc
          - ref-kilo-code-lt-local-vs-cloud-doc
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: answered
        source_refs:
          - ref-kilo-code-lt-id-prefixes
          - ref-kilo-code-lt-identifier-encoding
          - ref-kilo-code-lt-session-archive-index
          - ref-kilo-code-lt-session-table-fields
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: answered
        source_refs:
          - ref-kilo-code-lt-message-table
          - ref-kilo-code-lt-part-table
          - ref-kilo-code-lt-db-pragmas
          - ref-kilo-code-lt-projector-part-write
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: partial
        source_refs:
          - ref-kilo-code-lt-message-table
          - ref-kilo-code-lt-part-table
          - ref-kilo-code-lt-text-part-schema
          - ref-kilo-code-lt-compaction-part-schema
          - ref-kilo-code-lt-session-table-fields
          - ref-kilo-code-lt-runtime-storage-doc
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-kilo-code-lt-projector-message-write
          - ref-kilo-code-lt-compaction-record
          - ref-kilo-code-lt-fork-child-session-link
          - ref-kilo-code-lt-resume-commands-doc
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-cleanup
        status: answered
        source_refs:
          - ref-kilo-code-lt-message-table
          - ref-kilo-code-lt-part-table
          - ref-kilo-code-lt-session-diff-json
          - ref-kilo-code-lt-runtime-storage-doc
          - ref-kilo-code-lt-runtime-json-remaining-doc
          - ref-kilo-code-lt-json-migration-bootstrap
          - ref-kilo-code-lt-snapshot-gitdir
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-diagnostics
        status: partial
        source_refs:
          - ref-kilo-code-lt-export-cli
          - ref-kilo-code-lt-export-cli-output
          - ref-kilo-code-lt-import-cli-messages
          - ref-kilo-code-lt-import-cli-parts
          - ref-kilo-code-lt-transcript-markdown
          - ref-kilo-code-lt-session-archive-index
          - ref-kilo-code-lt-cleanup-config-doc
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-cleanup
        status: answered
        source_refs:
          - ref-kilo-code-lt-retention-config-schema
          - ref-kilo-code-lt-retention-gate
          - ref-kilo-code-lt-retention-policy
          - ref-kilo-code-lt-retention-selection
          - ref-kilo-code-lt-retention-roots
          - ref-kilo-code-lt-retention-run
          - ref-kilo-code-lt-retention-reclaim
          - ref-kilo-code-lt-retention-http-trigger
          - ref-kilo-code-lt-cleanup-policy-doc
          - ref-kilo-code-lt-cleanup-config-doc
          - ref-kilo-code-lt-cleanup-protected-doc
          - ref-kilo-code-lt-cleanup-snapshot-gc-doc
          - ref-kilo-code-lt-session-delete-cli
          - ref-kilo-code-lt-projector-session-delete
          - ref-kilo-code-lt-reset-procedure-doc
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-diagnostics
        status: answered
        source_refs:
          - ref-kilo-code-lt-db-cli-query
          - ref-kilo-code-lt-db-cli-shell
          - ref-kilo-code-lt-db-inspection-doc
          - ref-kilo-code-lt-sqlite-shell-doc
          - ref-kilo-code-lt-retention-state-file
          - ref-kilo-code-lt-reset-procedure-doc
          - ref-kilo-code-lt-db-path-doc
---

本章说明 Kilo Code **CLI 界面**（`kilo` 命令行）如何把会话记录落到本机。固定来源是官方仓库提交 `62f674d4a91969ac077e4a7b6ceeb8a99de80e47`，取用时间为 2026-10-06T05:56:00Z，每条引用都绑定到该提交下某一个具体文件对应的 snapshot（`snapshot-kilo-code-lt-*`，每个 snapshot 只对应一个文件，`commit` 与 `content_sha256` 均按真实字节计算）。版本适用边界：结论只描述这一提交对应的源码树，`packages/core/src/**` 与 `packages/schema/src/**` 是 CLI 运行时与共享 schema 包，`packages/opencode/src/**` 是 CLI 自身实现，`packages/kilo-docs/pages/**` 是同提交内的官方文档。本章不写 `mappings/`，不把源码行为等同于任何 npm 发行包版本的行为，也不把结论外推到 VS Code 扩展与 JetBrains 插件界面——这两者的记录载体与界面相关配置入口不在本章取证范围内。

catalog 为本产品登记了 `cli`、`vscode`、`jetbrains` 三个界面，已有七章也只覆盖 `cli`。因此本章十题全部只给 `cli` 界面的答案，另外两个界面的同一批问题由查询派生为 `not_investigated`。

## 记录落在哪里：数据根、数据库、快照与遗留 JSON {#transcripts-storage-layout}

Kilo 把自己的全部本地数据放在一个以应用名 `kilo` 为子目录的根下，各子目录由 XDG 基础目录变量解析，并额外固定一个临时目录：

```text
${XDG_DATA_HOME}/kilo        # data：数据库、快照仓库、工具输出、状态文件
${XDG_CACHE_HOME}/kilo       # cache：可重建的缓存（bin 也挂在这里）
${XDG_CONFIG_HOME}/kilo      # config：kilo.json 等配置文件
${XDG_STATE_HOME}/kilo       # state：状态；不可用时退回 data/state
${TMPDIR}/kilo               # tmp：临时文件
```

路径根由 `xdg-basedir` 的 `xdgData`/`xdgCache`/`xdgConfig`/`xdgState` 拼上常量 `app = "kilo"` 得到，临时根是 `os.tmpdir()` 加同名子目录；解析前会剥掉路径中的换行符，避免 `$HOME` 带尾随换行时建目录失败[@ref-kilo-code-lt-storage-root-paths]。配置根另有一个覆盖入口：生效配置目录取 `Flag.KILO_CONFIG_DIR ?? Path.config`[@ref-kilo-code-lt-storage-config-override]。state 目录不是硬绑定：未显式设置 `XDG_STATE_HOME` 时，若 `data/state` 已经是可写目录就一直沿用它（sticky），否则先尝试 `XDG_STATE_HOME/kilo`，失败再退回 `data/state` 并打印一条警告[@ref-kilo-code-lt-state-dir-sticky][@ref-kilo-code-lt-state-dir-fallback]。

会话正文默认落在一个 SQLite 文件里，路径由 `Database.path()` 在**打开数据库时**解析，而不是模块求值时固定[@ref-kilo-code-lt-db-path-override]：

- `KILO_DB` 存在时优先：值为 `:memory:` 或绝对路径就直接使用，相对路径拼在 data 根下。
- 稳定渠道（`latest`/`beta`/`prod`）或 `KILO_DISABLE_CHANNEL_DB` 为 `1`/`true` 时用 `${Global.Path.data}/kilo.db`。
- 其它开发渠道用渠道名派生的文件名 `kilo-CHANNEL.db`；若该文件不存在而同名的 `opencode-CHANNEL.db` 存在，则继续沿用后者[@ref-kilo-code-lt-db-channel-names]。

官方文档给出的默认路径与源码一致，并明确要求以 `kilo db path` 的实际输出为准，因为 `KILO_DB`、`XDG_DATA_HOME`、开发渠道或隔离开发环境都会改变结果；Windows 为 `%USERPROFILE%\.local\share\kilo\kilo.db`，macOS 与 Linux 为 `~/.local/share/kilo/kilo.db`[@ref-kilo-code-lt-db-path-doc]。这些是路径模板，不是某一台机器上的绝对路径，实际取值请以命令输出为准。会话随运行 Kilo 的机器走：使用远程主机时记录在远端机器上，云端会话与分享副本是独立对象，不出现在本地 SQLite 里[@ref-kilo-code-lt-local-vs-cloud-doc]。

除数据库外，还有三处与记录直接相关的落盘位置：

| 位置 | 内容 | 依据 |
|---|---|---|
| `${Global.Path.data}/snapshot/PROJECT_ID/WORKTREE_HASH` | 每项目一个专用 Git 目录，work tree 指向项目本身，用于文件基线与回退 | [@ref-kilo-code-lt-snapshot-gitdir] |
| `${Global.Path.data}/tool-output` | 被截断落盘的工具输出 | [@ref-kilo-code-lt-tool-output-dir] |
| `${Global.Path.data}/storage` | 遗留 JSON 存储根，当前仍被会话 diff 使用 | [@ref-kilo-code-lt-legacy-json-storage-root]、[@ref-kilo-code-lt-session-diff-json] |

快照存储与 SQLite、JSON 存储是彼此独立的第三套存储，官方架构文档把它单列为一个边界，并说明配置、认证与部分本地状态文件各有自己的归属；`session_diff` 这个 JSON 存储路径仍被使用[@ref-kilo-code-lt-runtime-json-remaining-doc]。这三处都在 data 根之下，路径形态与 `kilo.db` 相同，共享同一套 XDG 解析和渠道无关的目录名。

## 记录什么：一个会话由哪些内容组成 {#transcripts-record-scope}

一个会话在库里有三层：会话行本身、消息行、内容片段行。会话行除主键与项目外，还带工作区、父会话、`slug`、工作目录 `directory`、子目录 `path`、标题、版本、`share_url`、增删行数统计、`metadata`、成本与各类 token 计数[@ref-kilo-code-lt-session-table-fields]。

消息与内容片段以**整份 JSON 文档**存入各自表的 `data` 列，片段类型由 `data.type` 区分。`kilo export` 的脱敏逻辑逐类型枚举了实际会出现在会话记录里的片段类型，可以据此判断记录范围：`text`（含 `text`、`metadata`）、`reasoning`、`file`（含文件名、URL、来源路径/符号/资源与文本片段）、`subtask`、`tool`、`patch`、`snapshot`、`step-start`、`step-finish`、`agent`[@ref-kilo-code-lt-export-part-types]。`tool` 片段保存的是完整工具生命周期：按 `pending`/`running`/`completed`/其他状态分别保留 input、raw、title、metadata、output 与 attachments[@ref-kilo-code-lt-export-tool-part]。也就是说，工具调用的输入、输出与被截断前的原始文本都进入记录，而不是只留一句摘要。

**记录了什么已能逐项证实；哪些内容不落盘则不能只凭“没看到”就断言。** 已查入口与剩余缺口如下：

- 已查：片段类型全集来自 `kilo export` 的脱敏分支与 `packages/schema/src/v1/session.ts` 的片段定义；`recall` 检索的文本拼接只取 `text` 片段的 `text`、`file` 片段的文件名/URL/来源路径/符号/资源名，以及工具片段的 `state.error`[@ref-kilo-code-lt-recall-text-fields]；参与检索的片段还要再过一层过滤，标了 `synthetic` 或 `ignored` 的文本片段被排除，只保留非合成文本、`file` 片段和**失败**的工具调用[@ref-kilo-code-lt-recall-part-filter]。
- 由此可确定的是**检索范围**，不是落盘范围：`synthetic` 片段、推理内容与成功的工具输出仍在记录里，只是不进 recall 索引。把这一点读成“这些内容不落盘”是错的。
- 剩余缺口：固定来源里没有逐项说明凭据或密钥在写入前被脱敏的路径；`kilo export --sanitize` 的脱敏发生在**导出时**，不能用来推断库里存的是脱敏内容。也没有一份来源说明输入历史（TUI 提示历史）与记录正文的关系，因此本章不判断输入历史的落盘形态。

记录会离开本机的情况只有分享一路，并且受配置开关控制：`share` 配置为 `disabled` 时分享直接抛错，`manual` 只允许手动分享，`auto` 会在**根会话**创建时自动分享，子会话因带 `parentID` 而直接跳过[@ref-kilo-code-lt-share-gate][@ref-kilo-code-lt-share-auto-create]。分享产生的是一份云端公开副本，本地原会话仍留在本机库中，两者不是同一份记录。

## 格式与记录 schema：一个库文件、按 id 覆写的 JSON 文档 {#transcripts-record-format}

格式是**嵌入式 SQLite**，不是 JSONL、不是每会话一个文件。正文以两张表承载：

- `message`：`id` 主键、`session_id`（外键指向 `session`，`onDelete: cascade`）、时间戳，以及一个非空 JSON `data` 列；`data` 的类型是去掉 `id` 与 `sessionID` 后的消息信息。
- `part`：`id` 主键、`message_id`（外键指向 `message`，级联删除）、`session_id`、时间戳，以及非空 JSON `data` 列（类型是去掉 `id`/`sessionID`/`messageID` 的片段）。除常规索引外还有针对 `step-finish` 片段的部分索引与 recall 索引[@ref-kilo-code-lt-message-table][@ref-kilo-code-lt-part-table]。

数据库打开时统一设置运行期参数：WAL 日志、`synchronous = NORMAL`、5 秒 busy timeout、开启外键、被动 checkpoint 与有界缓存，并在之后应用 Drizzle 迁移与一层面向已发布 CLI 的兼容处理[@ref-kilo-code-lt-db-pragmas]。WAL 意味着活跃事务还会用到 `kilo.db-wal` 与 `kilo.db-shm` 两个伴随文件。

**写入语义是按 id 覆写，而不是只追加。** 片段更新事件走 `insert(...).onConflictDoUpdate({ target: part.id, set: { data } })`：同 id 的片段再次更新时整份 `data` 被新状态替换，库中始终只保留该片段的最新状态[@ref-kilo-code-lt-projector-part-write]。因此库文件里看不到片段演进的中间历史，排查时不能指望从库里还原某一步的旧内容。

记录 schema 的一等类型由 `packages/schema/src/v1/session.ts` 定义，`data` 列就是这个结构的序列化。最小、脱敏的片段示例（字段取自源码定义，值用占位符）：

```json
{ "type": "text", "text": "占位的用户输入", "synthetic": false }
```

`TextPart` 的字段是 `text`，加上可选的 `synthetic`、`ignored`、`metadata` 与 `time`（`start`/`end`）[@ref-kilo-code-lt-text-part-schema]。上下文压缩在记录里是一条独立片段 `compaction`，字段为 `auto`、可选 `overflow` 与可选 `tail_start_id`[@ref-kilo-code-lt-compaction-part-schema]。会话行上与生命周期相关的两个时间戳是 `time_compacting` 与 `time_archived`，并有 `session_parent_idx` 索引支撑按父会话查找[@ref-kilo-code-lt-session-archive-index]。

命名规则是固定前缀加统一编码：会话 `ses`、消息 `msg`、片段 `prt`，另有 `job`/`evt`/`per`/`que`/`pty`/`tool`/`wrk` 等其它前缀[@ref-kilo-code-lt-id-prefixes]。标识符本体长 26 字符：前 12 位是十六进制的“时间高位 + 同毫秒计数器”（毫秒时间戳左移 12 位再与计数器相加，降序 ID 取按位取反），后 14 位是随机字节映射到 62 字符表[@ref-kilo-code-lt-identifier-encoding]。因此 ID 自身按时间可排序，**但项目路径不编码进文件名**——项目归属由 `project_id` 外键与 `directory` 列表达，没有把工作目录路径编码成目录名[@ref-kilo-code-lt-session-table-fields]。项目路径可移植性由此受影响：库里的 `directory` 是当时的绝对路径，换机器后不会自动改写。

**仍缺的 schema 缺口**：`data` 列内部**字段级**的版本迁移规则没有在固定来源里逐字段取证。已查到的只有两层相邻机制——数据库 schema 本身由 Drizzle 迁移管理[@ref-kilo-code-lt-runtime-storage-doc]（旧 JSON 布局的一次性迁移见下节），以及库边界上的一层兼容处理。旧版客户端写入的历史 `data` 在新版本读取时如何被规范化，属于未取证项，本章不据此给出结论。

## 生命周期：事件投影、压缩、分支与子代理 {#transcripts-lifecycle}

写入路径是**事件投影**：消息与片段先作为会话事件发出，再由投影器落库。消息更新事件执行 `insert(MessageTable).onConflictDoUpdate({ target: id, set: { data } })`，即按消息 id 插入或整份替换 `data`[@ref-kilo-code-lt-projector-message-write]。会话创建、标题等字段更新、移动目录与删除各有对应的投影分支；删除分支直接删掉 `session` 行，子会话、消息与片段靠外键的 `onDelete: cascade` 一并消失[@ref-kilo-code-lt-projector-session-delete]。

上下文压缩在记录里是**追加一个标记**而不是截断历史：压缩时新建一条 user 角色的消息，再往这条消息下写一个 `type: "compaction"` 的片段，随后把提示队列重定向到这条新消息上[@ref-kilo-code-lt-compaction-record]。也就是说压缩后的会话继续沿用同一个 `session_id`，早期消息与片段仍在库中。

分支与子代理表现为**独立的会话行**，靠 `parent_id` 关联，并各自持有自己的 `ses_` 标识符。子会话与父会话的连接点在记录里是可见的：任务工具片段的 metadata 或 input 里会带子会话 id，fork 逻辑正是从这些字段（`metadata.sessionId`、`metadata.sessionID`、part 级同名字段、`state.input.task_id`）里解析出子会话标识并重写引用[@ref-kilo-code-lt-fork-child-session-link]。fork 还会为在途任务创建私有子会话；进行中的任务无法安全复制，会作为历史错误保留。

恢复（resume）面向的是同一个库里的同一个会话 id：列表命令返回的 id 可直接用于 `kilo --session SESSION_ID`、`kilo run --session SESSION_ID` 或 `kilo export SESSION_ID`[@ref-kilo-code-lt-resume-commands-doc]。`kilo session list` 的 `--search` 只对标题做 SQLite `LIKE` 子串匹配，不检索消息内容[@ref-kilo-code-lt-resume-commands-doc]。

**部分未取证**：会话被 resume 后，运行时从库里重建上下文的具体加载路径（按什么顺序读哪些表、压缩后如何回放）没有在固定来源里逐行取证。已查入口是 `packages/core/src/session/` 下的 store、history 与 projector 模块与 CLI 的 session 命令目录；本章只写“记录被按 id 覆写与追加”这一层，不对恢复时的读取顺序下结论。

## 数据库与其它存储的分工，以及保留与清理 {#transcripts-retention-cleanup}

SQLite 是默认的结构化存储，主表覆盖项目、会话、消息、片段、待办、权限、会话消息、工作区、同步事件、账号与账号状态；首次建库时 CLI 会跑一次性的 JSON→SQLite 迁移，覆盖项目、会话、消息、片段、待办、权限与分享[@ref-kilo-code-lt-runtime-storage-doc]。迁移的触发条件可以直接读出来：数据库文件不存在、旧 JSON 存储目录不存在时都直接返回；一旦开始迁移就先在库文件旁写一个 `DB_PATH.json-migration` 标记文件，中断后下次启动会重试[@ref-kilo-code-lt-json-migration-bootstrap]。

分工上：**会话正文与元数据在 SQLite**（`session`/`message`/`part`/`todo`）[@ref-kilo-code-lt-message-table][@ref-kilo-code-lt-part-table]，**会话 diff 仍走 JSON 存储**的 `session_diff` 路径[@ref-kilo-code-lt-session-diff-json]，**文件基线在独立的快照 Git 仓库**[@ref-kilo-code-lt-snapshot-gitdir]；官方架构文档把这三者描述为彼此独立的存储边界[@ref-kilo-code-lt-runtime-json-remaining-doc]。恢复一个会话的对话本身只需要 `kilo.db`；`session_diff` 与快照仓库影响的是 diff 展示与文件回退，不是消息正文的可读性。这两套存储都无法从零重建会话内容——JSON 迁移只对**旧布局**生效，新建的空库不会凭空长出会话。

官方保留机制是 `retention` 策略，两个键都写在与其它配置同源的 `kilo.json` 里，由后端统一评估，客户端只负责触发：

```json
{
  "retention": {
    "enabled": true,
    "maxAgeDays": 30
  }
}
```

`enabled` 默认 `false`，`maxAgeDays` 默认 30 且最小为 1；策略由后端拥有，启用后对本机**所有项目、所有 Kilo 客户端**生效，而不是只影响打开设置的那个窗口[@ref-kilo-code-lt-retention-config-schema][@ref-kilo-code-lt-cleanup-policy-doc][@ref-kilo-code-lt-cleanup-config-doc]。

删除是**失败关闭**的：策略未显式启用时直接返回不运行；非强制触发时距上次运行不足 23 小时的计划任务也会被跳过；天数取值必须是不小于 1 的整数，否则回落到默认值[@ref-kilo-code-lt-retention-gate][@ref-kilo-code-lt-retention-policy]。一次通过会读取**整张会话表**的 id、父 id 与更新时间，再据此判定过期[@ref-kilo-code-lt-retention-run]。判定规则是：先按“会话树的最新时间”判断是否超过保留天数——父会话与它的最年轻后代一样新，**一个父会话只要有近期或忙碌的后代就整体受保护**；被判定为 busy 的会话跳过不删[@ref-kilo-code-lt-retention-selection]。真正执行删除的只有**最顶层的过期会话**，子会话随父会话的级联一起消失[@ref-kilo-code-lt-retention-roots]。同一份规则在文档里表述为“活跃会话、最近 fork 的会话、在用会话的子代理会被保护”，并明确删除是**永久**的，连同对话历史一起消失[@ref-kilo-code-lt-cleanup-protected-doc]。

一次通过结束后，回收磁盘空间有明确门槛：只有空闲页同时超过 16 MiB 与全库 20% 才执行 `VACUUM`，随后 `PRAGMA wal_checkpoint(TRUNCATE)` 让两个文件都收缩；内存库不做这件事[@ref-kilo-code-lt-retention-reclaim]。**快照仓库不由会话清理负责**：它有独立的每小时 GC，用 7 天年龄阈值清理快照引用与不可达对象，且只在项目快照服务活跃时运行，会话删除不会触发它[@ref-kilo-code-lt-cleanup-snapshot-gc-doc]。

触发方式是本地 HTTP API，不是专门的 CLI 子命令：`retentionStatus` 汇总策略、上次结果与进行中的进度，`retentionRun` 接受 `force` 立即执行，`retentionCancel` 请求中止（协作式，保留已删部分并记录为中断）[@ref-kilo-code-lt-retention-http-trigger]。

手动清理有两条路径。官方单会话删除命令是 `kilo session delete SESSION_ID`，找不到会话时报错退出[@ref-kilo-code-lt-session-delete-cli]；它走的是删除会话行的同一路径，因此同样级联到子会话、消息与片段[@ref-kilo-code-lt-projector-session-delete]。**手工删除文件**则没有任何官方保证：文档给出的损坏恢复流程是先停掉 Kilo 后端（`pkill -f "kilo serve"`），把 `kilo.db`、`kilo.db-wal`、`kilo.db-shm` 一起改名成 `.bak`，下次启动重建空库[@ref-kilo-code-lt-reset-procedure-doc]。这条流程是**重置**而不是恢复：改名后本地会话与历史全部消失，只有 `.bak` 里还留着原文件。没有来源说明“只删 `kilo.db` 而留下 `-wal`/`-shm`”或“只删 `storage/session_diff`”的后果，因此不要把这些文件当作可以单独安全删除的缓存。

## 导出、导入、Markdown 渲染与排错 {#transcripts-export-diagnostics}

原生归档开关在 CLI 侧没有对应机制；可证实的是会话行上的归档时间戳 `time_archived`[@ref-kilo-code-lt-session-archive-index]，以及文档说明归档会话与其它会话按同一时钟老化[@ref-kilo-code-lt-cleanup-config-doc]。除此之外，**导出、导入与渲染**是三条独立的、面向用户的路径：

- `kilo export [sessionID]` 把选中会话导出为 JSON，带 `--sanitize` 时对标题、目录、路径、文本、工具输入输出、diff 等做替换式脱敏（把真实值换成 `[redacted:KIND:ID]`，非空才替换）[@ref-kilo-code-lt-export-cli]。结果直接写到 **stdout**，不落到任何托管的归档目录，文件名与位置由使用者的重定向决定[@ref-kilo-code-lt-export-cli-output]。
- `kilo import` 反向写库：解码消息信息与片段后插入 `message` 与 `part` 行，消息使用 `onConflictDoNothing()`，**已存在的 id 被跳过**而不是覆盖[@ref-kilo-code-lt-import-cli-messages][@ref-kilo-code-lt-import-cli-parts]。
- 会话还可以按需渲染成 Markdown 文本：头部包含标题、工作目录与创建时间，用户消息按 `## User`、助手消息按 `## Assistant` 分段，工具片段只保留一行，形如 `[Tool: 工具名] 工具标题`；超过上限时保留首尾并在中间插入省略标记，默认上限 100000 字符[@ref-kilo-code-lt-transcript-markdown]。

**恢复后的损失**因此是具体可说的：导入只重建 `session`/`message`/`part` 三层记录，`session_diff` 的 JSON 记录与快照 Git 仓库都不随导出走；`directory` 等列里保存的是原机器的绝对路径；`share_url` 指向的云端副本不随之转移。已 id 冲突的记录不会被导入覆盖，所以重复导入同一份导出会保留首次写入的版本。**剩余缺口**：没有取证到“归档到独立目录并在 CLI 内恢复归档”的开关或命令，也没有取证分享副本能否反向导入为本地会话——已查入口是 CLI 的 session、export、import、db 命令目录与 `packages/opencode/src/share/`，均未发现本地归档目录或归档开关。

排错按这条顺序定位：

1. **先确定库文件**。`kilo db path` 打印当前环境实际选中的数据库路径[@ref-kilo-code-lt-db-path-doc]。
2. **读状态**。`kilo db "SELECT ..." --format json` 执行任意 SQL，不带查询时改为启动一个交互式 `sqlite3` 进程并继承 stdio[@ref-kilo-code-lt-db-cli-query][@ref-kilo-code-lt-db-cli-shell]。
3. **用只读方式手工检查**。文档建议交互时用 `sqlite3 -readonly "$(kilo db path)"`，并列出 `.tables`、`.schema session`、`.schema message`、`.schema part` 作为入口；同一文档也明确警告 `kilo db` 接受包括写入在内的任意 SQL[@ref-kilo-code-lt-sqlite-shell-doc][@ref-kilo-code-lt-db-inspection-doc]。
4. **复制或替换库之前先停写入者**。活跃事务还会用到 `kilo.db-wal` 与 `kilo.db-shm`，只复制 `kilo.db` 会拿到不一致的快照；这也是官方重置流程先停后端、再一起改名三个文件的原因[@ref-kilo-code-lt-db-inspection-doc][@ref-kilo-code-lt-reset-procedure-doc]。
5. **检查保留策略的运行结果**。每次通过的结果写在 `${Global.Path.data}/retention/state.json`，读取失败时返回 `null` 而不是报错；该文件记录上次运行时间、扫描数、删除数、跳过数、失败数与耗时，可用于判断“清理是否已跑过、跑失败了多少、被什么保护住了”[@ref-kilo-code-lt-retention-state-file]。

判断记录完整性时有两个容易误判的点：片段是按 id 覆写的，库里只有每个片段的最新状态，**看不到中间演进**；而 `--search` 之类的列表检索只匹配标题，**不代表消息内容缺失**。要确认内容是否真的在库里，用 `sqlite3` 或 `kilo db` 直接查 `message` 与 `part` 的 `data` 列。
