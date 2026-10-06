---
schema_version: 3
record_kind: production
edition_id: pi-local_transcripts-v1
harness_id: pi
topic: local_transcripts
title: "Pi 本地 Transcript：JSONL 会话树、存储路径、导出与删除（固定源码 28dcce2）"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-format-jsonl-tree
      - ref-pi-lt-schema-message-entry
      - ref-pi-lt-schema-image-inline
      - ref-pi-lt-lifecycle-nested-calls
      - ref-pi-lt-lifecycle-nested-limits
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-location-file-path
      - ref-pi-lt-location-cwd-encoding
      - ref-pi-lt-location-sessions-dir
      - ref-pi-lt-location-agent-dir
      - ref-pi-lt-location-env-vars
      - ref-pi-lt-location-cli-flags
      - ref-pi-lt-location-env-precedence
      - ref-pi-lt-location-session-storage
      - ref-pi-lt-naming-file-name
      - ref-pi-lt-naming-tree-structure
      - ref-pi-lt-schema-session-header
      - ref-pi-lt-schema-image-inline
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-format-jsonl-tree
      - ref-pi-lt-schema-entry-base
      - ref-pi-lt-schema-message-entry
      - ref-pi-lt-schema-session-header
      - ref-pi-lt-schema-image-inline
      - ref-pi-lt-schema-compaction-boundary
      - ref-pi-lt-format-session-version
      - ref-pi-lt-schema-migration-code
      - ref-pi-lt-format-rewrite-file
      - ref-pi-lt-format-append
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-lifecycle-first-write
      - ref-pi-lt-lifecycle-continue-resume
      - ref-pi-lt-lifecycle-branch-actions
      - ref-pi-lt-branch-commands
      - ref-pi-lt-lifecycle-fork-copy
      - ref-pi-lt-lifecycle-compaction-steps
      - ref-pi-lt-lifecycle-auto-compaction
      - ref-pi-lt-lifecycle-context-building
  - section_id: transcripts-database-and-index
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-boundary-published-files
      - ref-pi-lt-database-catalog-layout
      - ref-pi-lt-database-durable-lock
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-archive-export-share
      - ref-pi-lt-archive-export-jsonl
      - ref-pi-lt-cleanup-deleting
      - ref-pi-lt-cleanup-delete-trash
      - ref-pi-lt-cleanup-delete-fallback
      - ref-pi-lt-schema-session-header
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-pi-lt-diagnostics-commands
      - ref-pi-lt-diagnostics-list
      - ref-pi-lt-diagnostics-missing-cwd
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: answered
        source_refs:
          - ref-pi-lt-format-jsonl-tree
          - ref-pi-lt-schema-message-entry
          - ref-pi-lt-schema-image-inline
          - ref-pi-lt-lifecycle-nested-calls
          - ref-pi-lt-lifecycle-nested-limits
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-pi-lt-location-file-path
          - ref-pi-lt-location-cwd-encoding
          - ref-pi-lt-location-sessions-dir
          - ref-pi-lt-location-agent-dir
          - ref-pi-lt-location-env-vars
          - ref-pi-lt-location-cli-flags
          - ref-pi-lt-location-env-precedence
          - ref-pi-lt-location-session-storage
          - ref-pi-lt-schema-image-inline
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          - ref-pi-lt-location-file-path
          - ref-pi-lt-location-cwd-encoding
          - ref-pi-lt-naming-file-name
          - ref-pi-lt-naming-tree-structure
          - ref-pi-lt-schema-session-header
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: answered
        source_refs:
          - ref-pi-lt-format-jsonl-tree
          - ref-pi-lt-format-append
          - ref-pi-lt-format-rewrite-file
          - ref-pi-lt-format-session-version
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: answered
        source_refs:
          - ref-pi-lt-schema-entry-base
          - ref-pi-lt-schema-message-entry
          - ref-pi-lt-schema-session-header
          - ref-pi-lt-schema-compaction-boundary
          - ref-pi-lt-schema-image-inline
          - ref-pi-lt-schema-migration-code
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-pi-lt-lifecycle-first-write
          - ref-pi-lt-lifecycle-continue-resume
          - ref-pi-lt-lifecycle-branch-actions
          - ref-pi-lt-branch-commands
          - ref-pi-lt-lifecycle-fork-copy
          - ref-pi-lt-lifecycle-compaction-steps
          - ref-pi-lt-lifecycle-auto-compaction
          - ref-pi-lt-lifecycle-context-building
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-database-and-index
        status: answered
        source_refs:
          - ref-pi-lt-boundary-published-files
          - ref-pi-lt-database-catalog-layout
          - ref-pi-lt-database-durable-lock
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs:
          - ref-pi-lt-archive-export-share
          - ref-pi-lt-archive-export-jsonl
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs:
          - ref-pi-lt-cleanup-deleting
          - ref-pi-lt-cleanup-delete-trash
          - ref-pi-lt-cleanup-delete-fallback
          - ref-pi-lt-schema-session-header
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: answered
        source_refs:
          - ref-pi-lt-diagnostics-commands
          - ref-pi-lt-diagnostics-list
          - ref-pi-lt-diagnostics-missing-cwd
---

Pi 把一次会话记录成一个 JSONL 文件，文件里的条目用 `id`/`parentId` 组成一棵树；会话正文没有数据库、也没有独立的附件目录。[@ref-pi-lt-format-jsonl-tree]

本页的固定来源是 pi-mono 仓库 commit `28dcce2ba45ce4a9efeb0f5b686f0be830fd89b9`（`source-pi-repo`，抓取时间 2026-10-06T05:20:00Z），共 15 个文件级 snapshot，一个文件一个 snapshot：

- `snapshot-pi-lt-packages-coding-agent-docs-session-format-md`、`snapshot-pi-lt-packages-coding-agent-docs-sessions-md`、`snapshot-pi-lt-packages-coding-agent-docs-message-types-md`、`snapshot-pi-lt-packages-coding-agent-docs-compaction-md`
- `snapshot-pi-lt-packages-coding-agent-src-core-session-manager-ts`、`snapshot-pi-lt-packages-coding-agent-src-core-session-export-ts`、`snapshot-pi-lt-packages-coding-agent-src-core-session-cwd-ts`、`snapshot-pi-lt-packages-coding-agent-src-core-nested-tool-calls-ts`、`snapshot-pi-lt-packages-coding-agent-src-core-slash-commands-ts`
- `snapshot-pi-lt-packages-coding-agent-src-config-ts`、`snapshot-pi-lt-packages-coding-agent-src-cli-args-ts`、`snapshot-pi-lt-packages-coding-agent-src-modes-interactive-components-session-selector-ts`
- `snapshot-pi-lt-packages-coding-agent-src-experimental-session-catalog-ts`、`snapshot-pi-lt-packages-coding-agent-src-experimental-durable-sessions-ts`、`snapshot-pi-lt-packages-coding-agent-package-json`

**适用边界**：结论只针对 catalog 里 `pi` 的 `cli` 界面，运行环境是该 commit 的源码树（Linux 路径语义，`--path--` 目录名由 POSIX 风格的 `resolvePath` 产生）。同一个 commit 里的 `sdk` 界面本轮没有调查，查询会把它派生为 `not_investigated`。源码 commit 只代表源码树，本文没有写 `mappings/`，因此不对任何 npm 发行版本的记录形态作断言——这一点在数据库一节尤其重要。

## 记录什么、落成什么形状 {#transcripts-recording-scope}

会话文件是 JSONL：每一行一个带 `type` 字段的 JSON 对象，条目之间用 `id`/`parentId` 形成树，因此分支是在同一个文件里就地生长，而不是复制出新文件。[@ref-pi-lt-format-jsonl-tree]

落盘的是对话本身：用户消息、助手消息和工具结果各占一条 `message` 条目，`message` 里带着角色、模型名与用量。最小、脱敏的完整样子是这样（`parentId` 串起树）：

```json
{"type":"message","id":"a1b2c3d4","parentId":null,"timestamp":"2024-12-03T14:00:01.000Z","message":{"role":"user","content":"Hello","timestamp":1733234401000}}
{"type":"message","id":"b2c3d4e5","parentId":"a1b2c3d4","timestamp":"2024-12-03T14:00:02.000Z","message":{"role":"assistant","content":[{"type":"text","text":"Hi!"}],"api":"anthropic-messages","provider":"anthropic","model":"claude-sonnet-4-5","stopReason":"stop","timestamp":1733234402000}}
{"type":"message","id":"c3d4e5f6","parentId":"b2c3d4e5","timestamp":"2024-12-03T14:00:03.000Z","message":{"role":"toolResult","toolCallId":"call_123","toolName":"bash","content":[{"type":"text","text":"output"}],"isError":false,"timestamp":1733234403000}}
```

[@ref-pi-lt-schema-message-entry]

工具事件不另开文件，而是挂在父工具调用的结果消息上。工具在运行中通过 `ctx.executeTool()` 发起的嵌套调用（例如 codemode 脚本），agent 主循环并不知情：会话把每次嵌套调用走一遍自己的工具管道，发出带 `parentToolCallId` 的 `tool_execution_*` 事件，并把调用与用量记录到模型发起的那个调用的工具结果消息上。[@ref-pi-lt-lifecycle-nested-calls] 这条记录是有上限的：单次参数超过 8 KiB、累计超过 32 KiB、调用数超过 256 条时，参数或调用会被丢弃，并把记录标记为不完整。[@ref-pi-lt-lifecycle-nested-limits]

**没有独立附件**。图片以 base64 内联在消息内容块里，`ImageContent` 只有 `type`、`data`、`mimeType` 三个字段，`data` 就是 base64 数据本身。[@ref-pi-lt-schema-image-inline] 所以恢复一个会话只需要那个 `.jsonl` 文件，不存在需要一起搬运的图片目录。

**记录开关**只有一个：`--no-session` 让一次运行不保存会话（见下一节）。固定来源里没有逐类内容的独立开关（"不记录工具参数"、"不记录思考内容"之类），也没有发现输入历史、调试日志进入会话文件——调试日志是另一条独立的落盘路径（`agent-dir/app-name-debug.log`），不属于会话记录，本页不覆盖。

## 存储位置、路径变化与命名 {#transcripts-storage-layout}

默认布局是一个文件：

```
agent-dir/sessions/--encoded-cwd--/file-timestamp_session-id.jsonl
```

（小写连字符名是路径里的占位段，不是真实目录名。）未改配置时 `agent-dir` 是 `~/.pi/agent`，文件名形如 `~/.pi/agent/sessions/--path--/timestamp_session-id.jsonl`。[@ref-pi-lt-location-file-path]

`agent-dir` 的解析是：先看环境变量 `PI_CODING_AGENT_DIR`（变量名由 app 名大写推导，源码里是 `${APP_NAME.toUpperCase()}_CODING_AGENT_DIR`），有就用它并展开 `~`；否则退回 `homedir()/.pi/agent`。[@ref-pi-lt-location-agent-dir] [@ref-pi-lt-location-env-vars] 会话目录是 `agent-dir/sessions`，即把 `getAgentDir()` 再拼一层 `sessions`。[@ref-pi-lt-location-sessions-dir] 这就是环境变量影响记录位置的入口：`PI_CODING_AGENT_DIR` 一变，配置、会话一起搬家。

项目作用域来自当前工作目录。目录名 `--path--` 是 cwd 的编码：先 `resolvePath` 展开，再去掉开头的路径分隔符，把剩下的 `/`、`\`、`:` 全换成 `-`，两端加 `--`。[@ref-pi-lt-location-cwd-encoding] 这是个有损编码——`/a/b` 和 `/a-b` 会撞进同一个目录名。读回时靠的是文件头里的 `cwd` 字段做过滤，而不是目录名。

换一个位置有三条入口，CLI 优先级最高：

| 入口 | 形式 | 说明 |
|---|---|---|
| `--session-dir dir` | CLI 选项 | 会话存储与查找目录，覆盖环境变量 |
| `PI_CODING_AGENT_SESSION_DIR` | 环境变量 | 同上格式，但被 `--session-dir` 覆盖 |
| `sessionDir` | `settings.json` 字段 | 与 `--session-dir` 同格式 |

`--session-dir` 的帮助文本写明它是"session storage directory (overridden by --session-dir)"那行的对应项，即环境变量被它压过。[@ref-pi-lt-location-env-precedence] [@ref-pi-lt-location-cli-flags] 文档侧的表述一致：默认按工作目录分组存放在 `~/.pi/agent/sessions/`，用 `--session-dir`、`PI_CODING_AGENT_SESSION_DIR` 或 `sessionDir` 设置项换位置，CLI 选项优先级最高。[@ref-pi-lt-location-session-storage]

同一组选项还包括 `--session`（会话文件路径或部分 UUID）、`--session-id`（指定项目内会话 ID，不存在则创建）、`--fork`（源会话文件路径或部分 UUID），以及 `--no-session`（不保存，一次性运行）。[@ref-pi-lt-location-cli-flags]

**没有索引文件，也没有附件目录**。上一节说图片以 base64 内联在消息内容块里，因此需要落到磁盘的东西只有那一个 `.jsonl`，没有需要一起备份的旁路文件。[@ref-pi-lt-schema-image-inline]

**命名规则**。文件名是 `fileTimestamp_sessionId.jsonl`，其中 `fileTimestamp` 来自会话创建时刻的 ISO 时间戳，把 `:` 和 `.` 换成 `-`。[@ref-pi-lt-naming-file-name] `session-id` 默认是 UUID，SDK 调用方或 `--session-id` 可以给自定义 ID。[@ref-pi-lt-location-file-path] 条目级的 ID 另有约定：`id` 通常是 8 位十六进制，冲突时回退到完整 UUID。

**父子与分支**。文件第一行是 `SessionHeader`，它不属于树（没有 `id`/`parentId`），只带元数据：

```json
{"type":"session","version":3,"id":"uuid","timestamp":"2024-12-03T14:00:00.000Z","cwd":"/path/to/project"}
{"type":"session","version":3,"id":"uuid","timestamp":"2024-12-03T14:00:00.000Z","cwd":"/path/to/project","parentSession":"/path/to/original/session.jsonl"}
```

[@ref-pi-lt-schema-session-header] `parentSession` 是**源文件路径字符串**，出现在 `/fork`、`/clone` 或 `newSession({ parentSession })` 产生的会话上——这是父子会话的唯一关联形式。树内部分支则完全是文件内的事：`parentId: null` 的条目是根，条目指向父条目，"leaf" 是当前位置，分支就是从更早的条目长出新孩子。[@ref-pi-lt-naming-tree-structure] 换句话说，同一文件内的分支用 `parentId` 表达，跨文件的父子用 header 里的 `parentSession` 表达，两者是不同机制。

## 记录 schema、版本与写入方式 {#transcripts-record-schema}

记录采用 JSONL：每行一个带 `type` 字段的 JSON 对象，文件内没有嵌套结构。[@ref-pi-lt-format-jsonl-tree]

除 `SessionHeader` 外，所有条目都继承同一组基字段：

```typescript
interface SessionEntryBase {
  type: string;
  id: string;                // 通常 8 位十六进制，冲突时可能是完整 UUID
  parentId: string | null;   // 父条目 ID，根条目为 null
  timestamp: string;         // ISO 时间戳
}
```

[@ref-pi-lt-schema-entry-base] 注意这里有两套时间：条目的 `timestamp` 是 ISO 8601 字符串，嵌在 `message` 里的那个 `timestamp` 是 Unix 毫秒。

文件第一行的 `SessionHeader` 不属于树，只有 `type`、`version`、`id`、`timestamp`、`cwd` 这些元数据字段（有父会话时多一个 `parentSession`），它的 JSON 形状见存储布局一节。[@ref-pi-lt-schema-session-header] 一条 `message` 条目的必填项就是 `type`、`id`、`parentId`、`timestamp` 加一个 `message` 对象，角色可以是 `user`、`assistant`、`toolResult`，前两轮正文里已给出脱敏的完整样例。[@ref-pi-lt-schema-message-entry] 消息内容块里的图片是内联 base64 的 `ImageContent`，不引用外部文件，所以记录没有附件依赖。[@ref-pi-lt-schema-image-inline]

**第一方条目类型**（`type` 取值）：`session`（header）、`message`、`model_change`、`thinking_level_change`、`usage`、`compaction`、`context_edit`、`branch_summary`、`custom`、`custom_message`、`label`、`session_info`。其中 `custom` 与 `usage` 不进入 LLM 上下文，`custom_message` 会进入；`compaction` 与 `branch_summary` 会被翻译成对应的摘要消息。

`compaction` 条目带一个必填的 `firstKeptEntryId`，指明压缩点之前"第一条被保留的条目"。重建上下文时，pi 用压缩摘要替换更早的条目，保留范围从这条开始；保留为空的压缩会把自己的 ID 写进这个字段，表示不保留任何前置条目。[@ref-pi-lt-schema-compaction-boundary]

**版本与迁移**。header 里的 `version` 有三代：v1 是线性条目序列（旧格式，加载时自动迁移）、v2 是 `id`/`parentId` 树结构、v3 把 `hookMessage` 角色改名为 `custom`。已有会话在加载时自动迁移到当前版本。[@ref-pi-lt-format-session-version] 代码是逐级升的：读 header 拿到 `version`（缺省视为 1），已经不低于当前版本就直接返回，否则先跑 v1→v2 再跑 v2→v3，返回"改过"。[@ref-pi-lt-schema-migration-code] 迁移触发一次整文件重写——`_rewriteFile()` 以 `"w"` 打开会话文件，把全部条目逐行重新序列化写出。[@ref-pi-lt-format-rewrite-file] 也就是说，**读一个旧会话文件会改写它**。

**写入方式**。首次落盘用 `openSync(..., "wx")` 独占创建，把内存里已有的条目一次性写完并置 `flushed`；之后每条新条目走 `appendFileSync` 追加一行 JSON。[@ref-pi-lt-format-append] 正常路径是纯追加，但整文件重写会在迁移和显式切换会话文件时发生。JSONL 无压缩、无分片：一个会话一个文件，不按大小滚动。

**仍缺的 schema 细节**（照实列出，不补猜）：`SessionHeader` 之外的 `type` 联合在文档里以示例而非完整字段表给出，扩展自定义条目的 `customType` 取值空间没有封闭枚举；`context_edit` 的 `replacement` 具体允许哪些 content block 组合只有散文描述；`usage` 的 `kind` 明确是任意字符串而非枚举。这些都不影响按上述基字段解析文件，但不足以据此写出严格的类型定义。

## 会话的建立、追加、恢复、分支与压缩 {#transcripts-lifecycle}

**创建时机**是有意延后的：会话文件只在会话里出现第一条 user 或 assistant 消息时才真正创建。仅有模型、思考级别、系统提示这类准备条目时它们留在内存里，所以打开又退出 pi 不会留下文件；落盘点选在 user 消息而不是第一条 assistant 回复，为的是首轮没跑完时提示词也能存下来。[@ref-pi-lt-lifecycle-first-write] 这一点对"目录里没有今天的文件"很常见，是个正常现象而不是记录失败。

**自动保存**是默认行为，`--no-session` 才关闭。`--continue` 打开当前工作目录下最近的会话，`--resume` 打开会话选择器，交互模式里 `/resume` 是同一个选择器、`/new` 开新会话。[@ref-pi-lt-lifecycle-continue-resume]

**分支有三种，区别在文件边界**：

| 动作 | 结果 | 何时用 |
|---|---|---|
| `/tree` | 在当前会话文件内移动 | 相关替代方案留在一起 |
| `/fork` | 从更早的 user 消息新建一个会话 | 替代方案要变成独立工作 |
| `/clone` | 把当前活动分支复制成新会话 | 想要当前状态的一份独立副本 |

[@ref-pi-lt-lifecycle-branch-actions] 对应的斜杠命令在命令表里是 `/fork`（"Create a new fork from a previous user message"）、`/clone`（"Duplicate the current session at the current position"）、`/new`、`/compact`、`/resume`。[@ref-pi-lt-branch-commands]

**跨文件的父子**。`forkFrom()` 的做法是：读源文件、生成新 ID、写一条指向源文件的新 header（`parentSession` 存源文件路径，`cwd` 换成目标工作目录），然后把源文件里除 header 外的所有条目逐条追加到新文件。[@ref-pi-lt-lifecycle-fork-copy] 复制是**全量**的：源文件里不属于活动路径的分支也会被带过去，没有过滤。迁移和切换会话文件同样会触发整文件重写。

**压缩后延续**。自动压缩在 `contextTokens > contextWindow - reserveTokens` 时触发，`reserveTokens` 默认 16384；流程是往回走累计 token 找到切点、抽出消息、让模型生成结构化摘要（把上一次的摘要当作迭代上下文）、追加一条 `CompactionEntry`、然后用摘要加 `firstKeptEntryId` 之后的条目重建上下文。[@ref-pi-lt-lifecycle-compaction-steps] 关键是它**只追加不删除**：文档明确写压缩"does not delete the original session entries"，原始条目仍在文件里。[@ref-pi-lt-lifecycle-auto-compaction] `buildContextEntries()` 从当前 leaf 往根走，只取路径上的条目；路径上有多条压缩时用最新那条——先放压缩条目，再放 `firstKeptEntryId` 到压缩条目之间的非 system 条目，最后放压缩条目之后的条目。[@ref-pi-lt-lifecycle-context-building]

**交给子代理这一段没有证据，故本题为 partial**。在本 commit 的 `src/core` 与 `src/extensions` 下检索 `subagent` / `sub-agent` 没有任何命中：这些标识只出现在 `src/experimental/` 下的 durable 与 vacation 实验运行时里。默认 CLI 路径能证实的"嵌套"只有上文那种工具内嵌套调用，它记录在父工具结果消息上，不产生独立子会话文件。**剩余缺口**：默认 `pi` CLI 是否存在把会话移交给子代理并落盘的机制，本轮固定来源无法证实，既不能断言不支持，也不能断言支持。若要继续查证，入口是 `packages/coding-agent/src/core/agent-session*.ts` 与 `src/core/extensions/` 里的会话创建入口，以及 slash 命令表里是否存在委派类命令（本轮未见）。

## 是否使用数据库 {#transcripts-database-and-index}

**默认 CLI 路径不使用数据库。** 会话正文、元数据、分支结构全部在 `.jsonl` 里；派生索引是内存里的 `Map`（条目按 `id` 索引、leaf 指针、label 映射），在 `_buildIndex()` 中从文件条目重建——所以索引可以随时从文件重建，不是恢复所必需的独立文件。恢复一个会话需要的是那一个 `.jsonl`，加上目录位置本身。

**源码树里确实有 SQLite 路径，但它属于实验运行时，不是 `pi` CLI 的会话记录**，而且不随 npm 包发布。`packages/coding-agent/package.json` 的 `files` 字段显式排除了 `dist/experimental` 与 `dist/cli/experimental`，发布内容只有 `dist`（去掉那两处）、`docs`、`examples` 和 `CHANGELOG.md`。[@ref-pi-lt-boundary-published-files]

实验路径的形态与 JSONL 完全不同，值得记下来以免混淆：`src/experimental/session-catalog.ts` 描述的每个会话是**一个目录**，目录里放 `meta.json` 和 worker 独占的 `session.sqlite`——`METADATA_FILE = "meta.json"`、`STORAGE_FILE = "session.sqlite"`，会话 ID 有正则约束 `^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$`。[@ref-pi-lt-database-catalog-layout] `src/experimental/durable/sessions.ts` 则换了一套布局：会话放在 `agent-dir/experimental/durable-sessions/` 下，先按 cwd 的 sha256 取前 24 位十六进制分一层目录，再按"13 位毫秒时间戳 + 连字符 + uuid"命名会话目录，正文落在该目录的 `session.sqlite`，并用 `proper-lockfile` 对会话目录加锁（崩溃留下的锁 10 秒后视为失效）。[@ref-pi-lt-database-durable-lock]

因此本题对 `cli` 界面记为 answered：默认路径无数据库、无跨文件索引文件；实验路径的 SQLite 会话既不在默认 CLI 的记录链上，也不在发布包的文件清单内。需要提醒的是，这里的"不发布"结论来自该 commit 的 `package.json` 与源码树，**不构成对任何已发布 npm 包版本行为的断言**——本轮没有做发行包验证，所以没有写 `mappings/`。

## 归档、导出、备份与删除 {#transcripts-archive-and-cleanup}

pi 没有"归档开关"这种原生留存机制：没有把会话移入归档区的设置，也没有自动保留期。它的对应能力是导出与分享。

**`/export`** 把当前会话写成 HTML（默认）或 JSONL。源码侧的 `exportSessionToJsonl()` 序列化的是**当前活动分支**加可选的尾部条目：它新建一个 header（不带 `parentSession`），然后遍历 `sessionManager.getBranch()`，把每条条目的 `parentId` 重新串成线性链，最后接上导出专用的尾部条目。[@ref-pi-lt-archive-export-jsonl] 输出路径没给就用 `session-时间戳.jsonl` 这样的默认名，目录不存在会先创建。这意味着导出的 JSONL 是**一条线性链**，不是原来那棵带分支的树；未被导出的旁支不会出现在文件里。

**`/share`** 是上传并拿查看链接：配置了 Radius 认证时走 Radius artifact，否则退回私有 GitHub gist。文档提醒导出或分享前先检查内容——里面会有 prompt、模型回复、工具参数、命令输出、文件内容和扩展消息。[@ref-pi-lt-archive-export-share]

**外部备份**的最小充分集就是那一个 `.jsonl` 文件（图片已内联，无附件目录）。但把它拷到别的机器或别的目录后，位置信息会变：header 的 `parentSession` 存的是绝对路径字符串，[@ref-pi-lt-schema-session-header] 拷贝后原路径可能不存在；会话 header 里的 `cwd` 也需要真实存在，否则恢复时会报"存储的会话工作目录不存在"（见下一节）。源码没有描述归档恢复后的信息损失度量，本题因此记为 partial。**剩余缺口**：`/import`（"Import and resume a session from a JSONL file"）在命令表里声明了，但本轮在这个 commit 的 `src/` 下没有检索到对应的分发处理分支，因此"从 JSONL 恢复"这条路径的具体行为与限制无法证实。

**删除**有官方入口，两种：

1. 直接删除 `~/.pi/agent/sessions/` 下的 `.jsonl` 文件。[@ref-pi-lt-cleanup-deleting]
2. 在 `/resume` 选择器里选中会话按 `Ctrl+D` 确认。[@ref-pi-lt-cleanup-deleting]

交互式删除的实现是**先试 `trash` CLI 再退回 `unlink`**：`deleteSessionFile()` 先 `spawnSync("trash", ...)`，路径以 `-` 开头时会插入 `--` 分隔符。[@ref-pi-lt-cleanup-delete-trash] `trash` 返回 0 或文件已经不存在就算成功；否则退回**永久删除** `unlink`，失败则把 `trash` 的错误作为提示拼进错误信息。[@ref-pi-lt-cleanup-delete-fallback] 也就是说，是否可恢复取决于系统上有没有 `trash`——文档的措辞"when available"就是这个意思。

**手动删除的后果与缺口**。删掉 `.jsonl` 就是删掉全部记录，没有可重建的来源：正文、树结构、label、session 名称都在这一个文件里，内存索引是从它派生的，删了无法从别处恢复。级联行为**没有来源支撑**：源码只在 header 里以路径字符串记录 `parentSession`，没有说明删除父会话时是否会处理引用它的子会话，也没有孤儿检测或重建入口。**删除前必须停止哪些写入者**这一点同样没有直接来源：源码里会话目录的独占创建用 `openSync(..., "wx")`，`durable` 实验路径用 `proper-lockfile` 锁会话目录，但默认 CLI 路径**没有**会话级文件锁，源码未说明并发进程写同一会话文件的行为，所以"是否需要先退出其它 pi 进程"应按未证实处理。本题记为 partial：删除入口与实现已证实，级联、孤儿、并发写入三项是明确缺口。**没有证据不等于可以安全删除**——尤其是没有 `trash` 的系统上，`Ctrl+D` 会直接永久删除。

## 定位、读取与排错 {#transcripts-diagnostics}

斜杠命令是用户侧的入口。命令表里与会话记录相关的有：`/export`（"Export session (HTML default, or specify path: .html/.jsonl)"）、`/import`、`/share`、`/name`（设置显示名）、`/session`（"Show session info and stats"）。[@ref-pi-lt-diagnostics-commands] 其中 `/session` 是查当前会话的正规入口，文档说它显示会话文件、ID、消息数、token 用量与花费。

**按目录列出会话**是 `SessionManager.list()`。它按传入的 `sessionDir` 或当前 cwd 的默认目录列出会话，并有一个关键过滤规则：当 `sessionDir` 是显式传入的、且不等于该 cwd 的默认目录时，`filterCwd` 为真，这时会额外按 `sessionCwdMatches(session.cwd, resolvedCwd)` 过滤。[@ref-pi-lt-diagnostics-list] 也就是说，共享一个自定义 `--session-dir` 时，列表靠**文件 header 里的 `cwd`** 而不是目录名来区分项目——回到上一节那个有损编码问题，这里正是它的补救点。`listAll()` 则跨所有项目目录遍历 `getSessionsDir()` 下的每个子目录，按 mtime 倒序、再按文件名排序。

**检查完整性**。文件解析是宽容的：逐行 `JSON.parse`，解析失败的行被跳过；读完之后还会校验首行是不是 `type: "session"` 且 `id` 是字符串，不是就整个当作无效返回。加载时若发现文件末尾有未换行的残留内容，会补写一个 `\n`。反过来，如果一个非空文件解析不出有效会话，`setSessionFile` 会直接抛 `Session file is not a valid pi session: path`，**不会**去修改它；只有大小为 0 的空文件才会被初始化。所以"文件被误改导致无法识别"会表现为一条明确错误，而不是静默重建。

**恢复时的 cwd 检查**是一个独立的诊断点：`getMissingSessionCwdIssue()` 取会话文件、比较 `sessionManager.getCwd()` 与 `existsSync(sessionCwd)`；记录的 cwd 不存在时返回一个问题对象，由 `assertSessionCwdExists()` 抛 `MissingSessionCwdError`，错误文本里同时给出存储的路径、当前工作目录和会话文件路径。[@ref-pi-lt-diagnostics-missing-cwd] 交互模式会捕获它并提示用户在当前 cwd 继续。这解释了从别的机器或备份恢复会话时最常见的报错来源。

**为备份、恢复、清理排错时**，按这个顺序用上面的入口：先 `/session` 确认当前会话文件与统计，再用选择器确认文件在预期目录，最后在改动任何文件前确认没有其它 pi 进程正持有该会话（默认路径无文件锁，源码未定义并发写行为）。

**跨主题链接**：本页涉及的 `PI_CODING_AGENT_DIR` 与 `sessionDir` 的作用域、优先级与合并规则属于配置机制的 `config.sources` 与 `config.overrides`；斜杠命令可由扩展注册的部分属于 Hooks 的 `hooks.entry` 与原生插件的 `plugins.api`；`/export`、`/share`、`/session` 均为内建命令，不经扩展注册。
