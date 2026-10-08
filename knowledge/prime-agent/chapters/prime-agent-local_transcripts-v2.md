---
schema_version: 3
record_kind: production
edition_id: prime-agent-local_transcripts-v2
harness_id: prime-agent
topic: local_transcripts
title: "Prime Agent CLI 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-prime-agent-lt-session-file-entry-variants, ref-prime-agent-lt-session-message-roles, ref-prime-agent-lt-ai-tool-result, ref-prime-agent-lt-session-bash-execution, ref-prime-agent-lt-session-state-entry, ref-prime-agent-lt-bash-spill-temp-file, ref-prime-agent-lt-lifecycle-persist-modes, ref-prime-agent-lt-cli-session-dir-flags]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-prime-agent-lt-paths-agent-dir, ref-prime-agent-lt-paths-sessions-dir, ref-prime-agent-lt-cli-session-dir-env, ref-prime-agent-lt-settings-session-dir, ref-prime-agent-lt-cli-session-dir-flags, ref-prime-agent-lt-store-file-name, ref-prime-agent-lt-session-file-path, ref-prime-agent-lt-session-header-fields, ref-prime-agent-lt-session-iso-timestamp, ref-prime-agent-lt-session-entry-base, ref-prime-agent-lt-sidecar-version-gate, ref-prime-agent-lt-ledger-path, ref-prime-agent-lt-archive-dir-name, ref-prime-agent-lt-bash-spill-temp-file, ref-prime-agent-lt-catalog-archive-fallback]
  - section_id: transcripts-format-and-writes
    surface_ids: [cli]
    source_refs: [ref-prime-agent-lt-session-entry-tag, ref-prime-agent-lt-persist-append-arm, ref-prime-agent-lt-persist-flush-now, ref-prime-agent-lt-persist-atomic-write, ref-prime-agent-lt-repair-load, ref-prime-agent-lt-r967-repair-tail-scan, ref-prime-agent-lt-r967-repair-entry-gate, ref-prime-agent-lt-r967-repair-streaming-rewrite, ref-prime-agent-lt-r967-repair-public-export, ref-prime-agent-lt-r967-create-repair-before-open, ref-prime-agent-lt-r967-open-replacement-repair-gate, ref-prime-agent-lt-repair-damage-signals, ref-prime-agent-lt-repair-header-required, ref-prime-agent-lt-lifecycle-new-session, ref-prime-agent-lt-session-migrate, ref-prime-agent-lt-session-current-version, ref-prime-agent-lt-catalog-archive-fallback, ref-prime-agent-lt-fork-branch-copy]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-prime-agent-lt-session-file-entry-variants, ref-prime-agent-lt-session-unknown-entry, ref-prime-agent-lt-session-entry-base, ref-prime-agent-lt-session-header-version, ref-prime-agent-lt-session-header-fields, ref-prime-agent-lt-session-current-version, ref-prime-agent-lt-session-migrate, ref-prime-agent-lt-session-message-roles, ref-prime-agent-lt-ai-tool-result, ref-prime-agent-lt-session-bash-execution, ref-prime-agent-lt-session-state-entry]
  - section_id: transcripts-index-and-archive
    surface_ids: [cli]
    source_refs: [ref-prime-agent-lt-persist-index, ref-prime-agent-lt-sidecar-purpose, ref-prime-agent-lt-sidecar-version-gate, ref-prime-agent-lt-ledger-path, ref-prime-agent-lt-archive-defaults, ref-prime-agent-lt-archive-policy-resolve, ref-prime-agent-lt-archive-policy-doc, ref-prime-agent-lt-archive-dir-name, ref-prime-agent-lt-archive-sweep, ref-prime-agent-lt-archive-move-fallback, ref-prime-agent-lt-archive-restore, ref-prime-agent-lt-catalog-archive-fallback, ref-prime-agent-lt-export-commands, ref-prime-agent-lt-bash-spill-temp-file]
  - section_id: transcripts-cleanup-and-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-lt-delete-refuses-active, ref-prime-agent-lt-delete-forward-to-owner, ref-prime-agent-lt-delete-trash-unlink, ref-prime-agent-lt-delete-artifact-partition, ref-prime-agent-lt-archive-sweep, ref-prime-agent-lt-persist-append-arm, ref-prime-agent-lt-store-header-bounded, ref-prime-agent-lt-repair-load, ref-prime-agent-lt-repair-damage-signals, ref-prime-agent-lt-repair-header-required, ref-prime-agent-lt-r967-repair-tail-scan, ref-prime-agent-lt-r967-repair-entry-gate, ref-prime-agent-lt-r967-repair-streaming-rewrite, ref-prime-agent-lt-r967-create-repair-before-open, ref-prime-agent-lt-r967-open-replacement-repair-gate, ref-prime-agent-lt-session-state-entry, ref-prime-agent-lt-catalog-archive-fallback, ref-prime-agent-lt-sidecar-purpose]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: answered
        source_refs: [ref-prime-agent-lt-session-file-entry-variants, ref-prime-agent-lt-session-message-roles, ref-prime-agent-lt-ai-tool-result, ref-prime-agent-lt-session-bash-execution, ref-prime-agent-lt-session-state-entry, ref-prime-agent-lt-bash-spill-temp-file, ref-prime-agent-lt-lifecycle-persist-modes, ref-prime-agent-lt-cli-session-dir-flags]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-prime-agent-lt-paths-agent-dir, ref-prime-agent-lt-paths-sessions-dir, ref-prime-agent-lt-cli-session-dir-env, ref-prime-agent-lt-settings-session-dir, ref-prime-agent-lt-cli-session-dir-flags, ref-prime-agent-lt-store-file-name, ref-prime-agent-lt-session-file-path, ref-prime-agent-lt-sidecar-version-gate, ref-prime-agent-lt-ledger-path, ref-prime-agent-lt-archive-dir-name, ref-prime-agent-lt-bash-spill-temp-file]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-prime-agent-lt-store-file-name, ref-prime-agent-lt-session-file-path, ref-prime-agent-lt-session-header-fields, ref-prime-agent-lt-session-iso-timestamp, ref-prime-agent-lt-session-entry-base, ref-prime-agent-lt-catalog-archive-fallback]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-writes
        status: answered
        source_refs: [ref-prime-agent-lt-session-entry-tag, ref-prime-agent-lt-persist-append-arm, ref-prime-agent-lt-persist-flush-now, ref-prime-agent-lt-persist-atomic-write, ref-prime-agent-lt-r967-repair-entry-gate, ref-prime-agent-lt-r967-repair-streaming-rewrite]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-prime-agent-lt-session-file-entry-variants, ref-prime-agent-lt-session-unknown-entry, ref-prime-agent-lt-session-entry-base, ref-prime-agent-lt-session-header-version, ref-prime-agent-lt-session-header-fields, ref-prime-agent-lt-session-current-version, ref-prime-agent-lt-session-migrate, ref-prime-agent-lt-session-message-roles, ref-prime-agent-lt-ai-tool-result, ref-prime-agent-lt-session-bash-execution, ref-prime-agent-lt-session-state-entry]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-writes
        status: answered
        source_refs: [ref-prime-agent-lt-lifecycle-new-session, ref-prime-agent-lt-persist-append-arm, ref-prime-agent-lt-persist-flush-now, ref-prime-agent-lt-repair-load, ref-prime-agent-lt-r967-repair-tail-scan, ref-prime-agent-lt-r967-repair-entry-gate, ref-prime-agent-lt-r967-repair-streaming-rewrite, ref-prime-agent-lt-r967-repair-public-export, ref-prime-agent-lt-r967-create-repair-before-open, ref-prime-agent-lt-r967-open-replacement-repair-gate, ref-prime-agent-lt-repair-damage-signals, ref-prime-agent-lt-repair-header-required, ref-prime-agent-lt-session-migrate, ref-prime-agent-lt-session-current-version, ref-prime-agent-lt-catalog-archive-fallback, ref-prime-agent-lt-fork-branch-copy]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-archive
        status: partial
        source_refs: [ref-prime-agent-lt-persist-index, ref-prime-agent-lt-sidecar-purpose, ref-prime-agent-lt-sidecar-version-gate, ref-prime-agent-lt-ledger-path]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-archive
        status: answered
        source_refs: [ref-prime-agent-lt-archive-defaults, ref-prime-agent-lt-archive-policy-resolve, ref-prime-agent-lt-archive-policy-doc, ref-prime-agent-lt-archive-dir-name, ref-prime-agent-lt-archive-sweep, ref-prime-agent-lt-archive-move-fallback, ref-prime-agent-lt-archive-restore, ref-prime-agent-lt-catalog-archive-fallback, ref-prime-agent-lt-export-commands, ref-prime-agent-lt-bash-spill-temp-file]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-diagnostics
        status: partial
        source_refs: [ref-prime-agent-lt-delete-refuses-active, ref-prime-agent-lt-delete-forward-to-owner, ref-prime-agent-lt-delete-trash-unlink, ref-prime-agent-lt-delete-artifact-partition, ref-prime-agent-lt-archive-sweep, ref-prime-agent-lt-persist-append-arm]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-and-diagnostics
        status: answered
        source_refs: [ref-prime-agent-lt-store-header-bounded, ref-prime-agent-lt-repair-load, ref-prime-agent-lt-repair-damage-signals, ref-prime-agent-lt-repair-header-required, ref-prime-agent-lt-r967-repair-tail-scan, ref-prime-agent-lt-r967-repair-entry-gate, ref-prime-agent-lt-r967-repair-streaming-rewrite, ref-prime-agent-lt-r967-create-repair-before-open, ref-prime-agent-lt-r967-open-replacement-repair-gate, ref-prime-agent-lt-session-state-entry, ref-prime-agent-lt-catalog-archive-fallback, ref-prime-agent-lt-sidecar-purpose]
---

适用性说明：本章的证据固定在仓库 `source-prime-agent-repo`（`https://github.com/PrimeIntellect-ai/prime-agent.git`）的两个提交上。多数条目型引用仍指向提交 `7a52276cb17310f331f1075f28fa5cf9c4ae0a0a`（抓取时间 2026-10-06T04:34:43Z）；本轮新增的尾部修复相关引用指向提交 `967eb13fd488507af5f590e9c6ea8b2672f1fc05`（`crates/pa-core/src/session/manager/repair.rs`、`crates/pa-core/src/session/manager.rs`、`crates/pa-daemon/src/worker/create.rs`、`crates/pa-daemon/src/session_navigation.rs`）。来源没有标注发行版本，所以按来源级知识记录（`version_applicability: unknown`），本章不写 `mappings/`，也不代表任何已发布的 npm 包或安装包的行为。

两点必须先说清楚。其一，本章只覆盖 catalog 里登记的 `surface_id: cli`；本轮在该固定源码树内没有找到独立的桌面或 IDE 界面实现，因此不对其它形态作任何断言。其二，这个源码树已经是 Rust 工作区（`crates/`），与本产品更早几章所引的 TypeScript 源码树（`packages/…`）不是同一批文件；本章的每条结论只对该源码树成立，跨提交的行为一致性未被本章验证。路径解析在源码里有 POSIX 与 Windows 两个分支（`HOME`，Windows 再退到 `USERPROFILE`、`HOMEDRIVE` + `HOMEPATH`），本章按源码陈述分支逻辑，未在任何平台上实测。

## 记录什么：会话正文、工具事件与簿记行 {#transcripts-scope}

Prime Agent 的会话记录是**一个会话一个 JSONL 文件**：首行是 `type: "session"` 的 header，其后每一行是一条 entry，`type` 标签选载荷。这不是"消息 + 调试日志"的混合体——entry 类型在固定源码里是一个封闭枚举加上一个兜底变体：`session`、`message`、`thinking_level_change`、`service_tier_change`、`model_change`、`compaction`、`branch_summary`、`custom`、`child_usage_attributed`、`label`、`session_info`、`session_state`、`git_state`、`custom_message`，其余一律落进 `Unknown` 原样保留。[@ref-prime-agent-lt-session-file-entry-variants]

`message` 行的 `role` 同样是封闭枚举：`user`、`assistant`、`toolResult`、`bashExecution`、`custom`、`branchSummary`、`compactionSummary`。也就是说发给模型的消息、工具调用与工具结果、`!` 开头的 bash 执行、上下文压缩摘要和分支摘要都落在同一个文件里。[@ref-prime-agent-lt-session-message-roles] 工具结果行保留 `toolCallId`、`toolName`、`content`、`isError`、`timestamp`，并用 flatten 把未建模字段原样带走，因此外部工具写入的额外字段不会在往返中丢失。[@ref-prime-agent-lt-ai-tool-result]

有一类内容**不进** JSONL 正文。`bashExecution` 行只保存 `command`、`output`、`exitCode`、`cancelled`、`truncated`、`fullOutputPath` 与 `timestamp`：输出过长时 `truncated` 置位，完整输出另写一个文件，行里只留路径。[@ref-prime-agent-lt-session-bash-execution] 那个文件落在**操作系统临时目录**（文件名形如 `{prefix}-{hex}.log`），不在会话目录内。[@ref-prime-agent-lt-bash-spill-temp-file] 同理，会话级状态（`session_state` 的 `status`）也是文件内的一行，不是独立的数据库或状态文件。[@ref-prime-agent-lt-session-state-entry]

记录行为的开关在 CLI 全局参数上：`--session-dir` 改会话目录，同一参数表里紧邻的 `--no-session` 的帮助文本是 `Do not save the session`。[@ref-prime-agent-lt-cli-session-dir-flags] 源码层对应的开关是会话管理器的持久化位——`persisted(cwd, session_dir)` 构造的管理器绑定会话目录并把条目写到磁盘，`in_memory(cwd)` 构造的管理器只有内存副本。[@ref-prime-agent-lt-lifecycle-persist-modes]

本章不覆盖 daemon 日志目录、遥测与 trace 上传、MCP 连接记录、模型目录缓存：它们在固定源码里都不是会话文件的 entry 类型，其格式与保留策略不在本章范围内。

剩余缺口：本轮没有在固定源码里找到"只落盘部分 entry 类型"或"对已存在的会话中途关闭记录"的开关；也没有找到落盘前的凭据脱敏路径——已查入口是 `crates/pa-core/src/tools`（`sanitize_binary_output` 只清理控制字符）与 `crates/pa-core/src/mcp/connection_store.rs`（`sanitize` 只作用于 MCP 连接记录）。"没有找到"不等于"不存在脱敏"，也不构成"落盘内容不含凭据"的结论。

## 存储位置与命名：一个平铺目录，父子与分支靠字段表达 {#transcripts-storage-layout}

会话根目录的解析链是固定的。daemon 侧的 `sessions_dir()` 在 `PRIME_AGENT_SESSION_DIR` 存在时展开 `~` 后直接采用，否则取 `{agent-dir}/sessions`；`agent_dir()` 同样先看 `PRIME_AGENT_CODING_AGENT_DIR`，否则取 `{home}/.prime/agent`。[@ref-prime-agent-lt-paths-agent-dir][@ref-prime-agent-lt-paths-sessions-dir] home 解析不出来时 daemon 显式报错而不是降级到某个临时目录。

CLI 侧多一层兼容：会话目录的环境变量覆盖先读 `PRIME_AGENT_SESSION_DIR`，读不到再退回 legacy 名 `PRIME_AGENT_CODING_AGENT_SESSION_DIR`。[@ref-prime-agent-lt-cli-session-dir-env] 设置里的 `sessionDir` 也能改址，`~` 与 `~/` 前缀会展开成 home 下的路径；这个设置文件本身的位置与多作用域合并规则属于配置机制主题（`config.sources`、`config.overrides`），本章不重复。[@ref-prime-agent-lt-settings-session-dir] 命令行 `--session-dir` 的优先级最高。[@ref-prime-agent-lt-cli-session-dir-flags]

目录内部是**平铺**的：每个会话就是 sessions 目录下的一个 `{uuid}.jsonl`，文件名的生成函数只做字符串拼接，uuid 由 `Uuid::now_v7()` 产生，因此 id 本身时间有序。[@ref-prime-agent-lt-store-file-name][@ref-prime-agent-lt-session-file-path] 没有按项目、工作区或 cwd 再分目录——同一个 sessions 目录服务所有项目。

项目与家族关系因此只能靠字段表达。header 固定携带 `id`、`timestamp`（ISO-8601、毫秒精度、UTC，以 `Z` 结尾）、`cwd`、`parentSession`、`rlmDepth`、`git`；header 的 `id` 被当作单一文件名使用，会话的 artifact 目录直接拿它拼接。[@ref-prime-agent-lt-session-header-fields][@ref-prime-agent-lt-session-iso-timestamp] 父子会话靠 header 的 `parentSession` 加 `rlmDepth` 表达；同一文件内的分支靠每条 entry 共享的 `id`、`parentId`（树根为 null）与 `timestamp` 表达。[@ref-prime-agent-lt-session-entry-base] 恢复时的选择器解析先做 cwd 过滤的本地匹配，再退回全目录匹配——cwd 参与的是匹配而不是目录结构。[@ref-prime-agent-lt-catalog-archive-fallback]

会话目录之外还有四处与记录相关的路径：

- 每个会话文件旁有一个 `{stem}.info-cache.json` sidecar，存的是扫描状态缓存，不是正文。[@ref-prime-agent-lt-sidecar-version-gate]
- `{agent-dir}/rlm-ledger/{hash}.jsonl` 是 RLM（子代理）账本，文件名是 sessions 目录规范化路径的 sha256 前 16 位——这是整套布局里唯一一处按目录而不是按项目分片的地方。[@ref-prime-agent-lt-ledger-path]
- `{agent-dir}/sessions-archive` 是归档目录，同样平铺、同样的 `{uuid}.jsonl` 命名。[@ref-prime-agent-lt-archive-dir-name]
- bash 溢写的完整输出落在操作系统临时目录（`{prefix}-{hex}.log`），既不在 agent 目录也不在 sessions 目录里；消息行只保存它的路径。[@ref-prime-agent-lt-bash-spill-temp-file] 换机器或清空临时目录后，这些路径就指向不存在的文件，而 JSONL 里的引用不会自动改写。

剩余缺口：本轮没有找到把会话按项目或工作区分目录的实现；也没有取证 Windows 上临时目录与 `~` 展开的具体取值（源码只有路径拼接，未在 Windows 实测）。

## 格式与写入：JSONL 追加，整文件原子重写 {#transcripts-format-and-writes}

格式是 JSONL：每行一个 JSON 对象，行尾 `\n`，标签字段用 snake_case、其余字段用 camelCase。[@ref-prime-agent-lt-session-entry-tag] 固定源码里没有压缩、没有分片、没有自定义二进制编码，也没有对同一会话的多文件切分。

写入有两条路径。**追加**是常态：会话出现第一条 assistant 条目之后，每条新 entry 序列化成一行加 `\n` 追加到文件尾部；在此之前只有 `session_state` 与 `session_info` 会落盘，其余条目先留在内存。[@ref-prime-agent-lt-persist-append-arm] **整文件重写**用于强制刷盘与结构性改写：`flush_now()` 把内存里的全部条目一次性重写（注释写明这是 pre-model durability），未持久化的管理器直接成功返回、不碰磁盘。[@ref-prime-agent-lt-persist-flush-now] 重写本身走原子替换——同目录临时文件、私有权限（0600）、`write_all` 后 `sync_all`，最后 rename 覆盖目标；源码注释明确说这里的 fsync 是这个移植版刻意加强的会话持久性承诺。[@ref-prime-agent-lt-persist-atomic-write]

打开时先自愈再读。加载函数在 repair 打开时先跑一次损坏修复。[@ref-prime-agent-lt-repair-load] 自愈本身有两道闸，判定细节随本轮提交变化：

- **尾部扫描**不再只读文件末尾固定的一兆字节窗口。它从文件尾向前按一兆字节的窗口反复回退，直到定位到换行边界才确定"最后一行"的起点，然后从文件里流式解析这一行判断它是不是合法 JSON；三个损坏信号（窗口内有 NUL 字节、最后一个字节不是换行、最后一行不是合法 JSON）本身没变。[@ref-prime-agent-lt-repair-damage-signals][@ref-prime-agent-lt-r967-repair-tail-scan]
- **新增的首行闸**：首行必须能解析成合法的 `session` header，否则整个文件被原样跳过、不做任何重写。这与加载完成后"第一行不是合法 header 则整份 entries 作废"的门槛是两处独立检查。[@ref-prime-agent-lt-r967-repair-entry-gate]
- **重写方式**从"整文件读入内存再拼字符串"改成逐行流式写入同目录的 `{path}.tmp{pid}`（私有权限），`sync_all` 之后 rename 覆盖原文件；没有实际改写时直接丢弃临时文件。[@ref-prime-agent-lt-r967-repair-streaming-rewrite]

修复入口本轮从 `pub(super)` 提升为 `pub`，并由 `pa_core::session::manager` 重新导出，因此 daemon 可以在打开会话文件之前直接调用它。[@ref-prime-agent-lt-r967-repair-public-export] 两个新增调用点决定了"哪一次打开会顺带修复"：

- worker 续接一个已存在的会话文件时，先取运行时会话租约，再修复，然后才以窗口化方式打开。[@ref-prime-agent-lt-r967-create-repair-before-open]
- 替换会话的共用入口（`switch_session` / `import_jsonl` / `fork` 走同一条路径）**只在持有租约时**才修复；没有租约就只读打开，不写文件。[@ref-prime-agent-lt-r967-open-replacement-repair-gate]

加载完成后还有一道硬门槛：entries 的第一行必须是合法的 `session` header，否则整份 entries 作废返回空。[@ref-prime-agent-lt-repair-header-required]

会话的创建与恢复。创建时首行 header 一次性写入 `version`、`timestamp`、`cwd`、`parentSession`、`rlmDepth`、`git`。[@ref-prime-agent-lt-lifecycle-new-session] 加载后按 header 的 `version` 决定迁移：当前磁盘格式版本是 3，v1 会话没有 `version` 字段按 1 处理，低于 2 走 v1→v2、低于 3 走 v2→v3，已是当前版本则不重写。[@ref-prime-agent-lt-session-current-version][@ref-prime-agent-lt-session-migrate] 恢复走选择器解析：cwd 本地匹配 → 全目录匹配 → 归档兜底。[@ref-prime-agent-lt-catalog-archive-fallback] 分叉（fork）产生新文件时丢弃源 header 与全部 `git_state` 行，并把父行被丢弃的子条目重新挂到最近的保留祖先上，其余字段逐字保留。[@ref-prime-agent-lt-fork-branch-copy] 上下文压缩不另开文件：`compaction` entry 与 `compactionSummary` 消息行都写在原文件内，树结构仍由 `parentId` 维持；子代理会话则是独立文件，靠 header 的 `parentSession` 与 `rlmDepth` 挂回父会话。

## 记录 schema：封闭的 entry 枚举、共享信封与版本阶梯 {#transcripts-record-schema}

每条 entry 的公共部分是 `EntryBase`：`id`（可选）、`parentId`（树根为 null）、`timestamp`（ISO-8601），其余未建模字段经 flatten 原样保留。[@ref-prime-agent-lt-session-entry-base] `type` 标签选出的载荷类型是 `session`、`message`、`thinking_level_change`、`service_tier_change`、`model_change`、`compaction`、`branch_summary`、`custom`、`child_usage_attributed`、`label`、`session_info`、`session_state`、`git_state`、`custom_message`；[@ref-prime-agent-lt-session-file-entry-variants] 未知标签与"已知标签但载荷校验失败"两种情况都降级为 `Unknown` 并逐字保留，因此较新构建写入的行不会让整个会话加载失败。[@ref-prime-agent-lt-session-unknown-entry]

header 的必填项是 `type`、`id`、`timestamp`、`cwd`；`version`、`parentSession`、`rlmDepth`、`git` 是可选且为 None 时不写出。v1 会话没有 `version` 字段，字段顺序按 TS 声明顺序（`type`、`version`、`id`、`timestamp`、`cwd`、`parentSession`、`rlmDepth`、`git`）序列化。[@ref-prime-agent-lt-session-header-version][@ref-prime-agent-lt-session-header-fields] 当前磁盘格式版本是 3，低于 3 的会话按 v1→v2→v3 的顺序迁移。[@ref-prime-agent-lt-session-current-version][@ref-prime-agent-lt-session-migrate]

`message` 行的 `role` 取值集合是 `user`、`assistant`、`toolResult`、`bashExecution`、`custom`、`branchSummary`、`compactionSummary`。[@ref-prime-agent-lt-session-message-roles] 其中 `bashExecution` 行保存 `command`、`output`、`exitCode`、`cancelled`、`truncated`、`fullOutputPath` 与 `timestamp`，其中 `fullOutputPath` 指向会话目录之外的溢写文件。[@ref-prime-agent-lt-session-bash-execution] 状态行只有三种取值：`session_state` 的载荷是 `{ status }`，`status` 属于 `active` / `archived` / `crash`。[@ref-prime-agent-lt-session-state-entry] 工具结果行的字段与未知字段保留见上一节。[@ref-prime-agent-lt-ai-tool-result]

脱敏的最小完整示例（占位值，形状取自 header 与 user 消息行）：

```json
{"type":"session","version":3,"id":"0193f1c2-0000-7000-8000-0000000000aa","timestamp":"2026-01-01T00:00:00.000Z","cwd":"/workspace/example","parentSession":null,"rlmDepth":0,"git":{"repoUrl":"https://example.invalid/repo.git","commit":"0000000000000000000000000000000000000000","branch":"main"}}
{"type":"message","id":"e1","parentId":null,"timestamp":"2026-01-01T00:00:01.000Z","message":{"role":"user","content":"占位问题文本","timestamp":1767225601000}}
{"type":"session_state","id":"e2","parentId":"e1","timestamp":"2026-01-01T00:00:02.000Z","state":{"status":"active"}}
```

仍缺的具体 schema 缺口，照实列出：

- `crates/pa-types/src/ai/mod.rs` 里 `UserContent` / `AssistantContentBlock` / `UserContentBlock` 的块级结构本轮未逐字段取证，所以上面的示例只覆盖 envelope 与 role 层，不覆盖多模态内容块。
- 固定源码里没有面向用户的会话文件 schema 文档，也没有从该格式导出的 JSON Schema。
- v1→v2、v2→v3 迁移函数的具体改写内容未逐条取证；已证的只是迁移阶梯、触发条件与"不重写当前版本"。
- `custom` / `custom_message` 两类条目的 `customType` 取值集合未取证（源码里散落多个自定义类型常量，如一次性告警标记）。

因此本题记为 partial。

## 索引、辅助状态与原生归档 {#transcripts-index-and-archive}

会话正文**不在数据库里**。本轮在该固定源码树内检索 `sqlite` / `rusqlite` / `libsql` / `diesel` 依赖与调用无命中，正文、簿记与树结构全部在 `{uuid}.jsonl` 内。这是"检索无命中"的否定性结论，所以本题只到 partial：能证的是正文落文件、索现在内存，不能证的是"该产品在任何运行形态下都不存在数据库型会话存储"。

可证的分工是这样的。条目索引（`id` → 行号、以及当前叶子 id）在每次加载或重写时于内存中重建，不落盘。[@ref-prime-agent-lt-persist-index] 磁盘上只有两类辅助状态文件：daemon 写的 `{stem}.info-cache.json` 扫描状态 sidecar，进程缓存 miss 时加载，缺失、损坏或版本不符一律退化为冷扫描；[@ref-prime-agent-lt-sidecar-purpose][@ref-prime-agent-lt-sidecar-version-gate] 以及按 sessions 目录哈希分片的 RLM 账本 `{agent-dir}/rlm-ledger/{hash}.jsonl`。[@ref-prime-agent-lt-ledger-path] 恢复一个会话所必需的文件只有 `{uuid}.jsonl` 本身；sidecar 明确可重建，RLM 账本的重建规则本轮未取证。

原生归档是一个**移动**机制，不是删除。开关是设置里的 `sessionArchiveMaxAgeDays` 与 `sessionArchiveMaxSessions`，默认 30 天 / 200 个会话；两条规则独立，任一命中即归档；取 `"off"`、`"none"`（计数规则还认 `0`）关闭对应规则，非法值回落默认值。[@ref-prime-agent-lt-archive-defaults][@ref-prime-agent-lt-archive-policy-resolve] 年龄规则按文件 mtime 判定且边界含等号，计数规则保留 mtime 最新的若干个、其余按 mtime 从旧到新归档；驻留 worker 与有活跃定时任务的会话受保护、永不归档，但计数规则仍把它们算进上限。[@ref-prime-agent-lt-archive-policy-doc]

归档动作把文件移到 `{agent-dir}/sessions-archive`，保持同样的 `{uuid}.jsonl` 命名；两条规则都关闭时扫描直接返回空；目标已存在则跳过而不是覆盖历史；单个文件移动失败只跳过该文件、留到下一轮重试，批次不会因此失败。[@ref-prime-agent-lt-archive-sweep][@ref-prime-agent-lt-archive-dir-name] 跨文件系统时 rename 失败退化为 copy + delete。[@ref-prime-agent-lt-archive-move-fallback] 恢复就是归档的逆操作：命中归档选择器时先确认源文件存在、确认 sessions 目录里没有同名文件，再移动回去，随后 worker 才在活动路径上接管。[@ref-prime-agent-lt-archive-restore][@ref-prime-agent-lt-catalog-archive-fallback]

归档与导出、备份是三件不同的事。`export_html` 与 `export_jsonl` 是独立的导出动作：HTML 由内嵌模板加会话数据渲染，JSONL 把当前分支重新串成一条线性文件，输出到调用方给定的路径；它不改 sessions 目录，也不参与归档策略。[@ref-prime-agent-lt-export-commands] 把整个 agent 目录复制到别处属于外部备份，本产品的固定来源没有对它做任何声明。

恢复后的损失有两处可证：header 里的 `cwd` 与 `git` 描述的是原机器上的项目位置，换机器后这些字段不会自动改写；bash 溢写文件在操作系统临时目录，跨机器不可用，消息行里的 `fullOutputPath` 会指向不存在的路径。[@ref-prime-agent-lt-session-header-fields][@ref-prime-agent-lt-bash-spill-temp-file]

剩余缺口：本轮未取证导出路径的默认值与相对基准（源码里输出路径由调用方传入），也未取证外部备份与本产品的兼容性。

## 删除、保留与排错 {#transcripts-cleanup-and-diagnostics}

官方删除走 `delete_saved_session`。第一道闸是拒绝当前活跃会话，直接返回 `Cannot delete the currently active session`。[@ref-prime-agent-lt-delete-refuses-active] 第二道闸是归属：仍托管该文件的 worker 自己拥有这次删除，请求被转发给已连接的 owner，owner 不可达或属于别的 client 时按 unknown-target 错误拒绝。[@ref-prime-agent-lt-delete-forward-to-owner] 真正删除时先试系统 `trash` 命令，失败则退回 unlink；文件消失后先运行钩子（取消该会话的定时任务），再删除 `{agent-dir}/session-artifacts/{id}` 这个会话的 artifact 分区。[@ref-prime-agent-lt-delete-trash-unlink][@ref-prime-agent-lt-delete-artifact-partition] 归档是保留机制而不是删除：sweep 只移动文件。[@ref-prime-agent-lt-archive-sweep]

手动删文件的后果，源码能证的部分是：会话目录是发现入口，文件不在就不会再被列出或解析；而在活动会话运行期间把文件移走，追加路径会先做一次整文件重写，避免追加造出一个没有 header 的残缺文件。[@ref-prime-agent-lt-persist-append-arm] 除此以外本轮没有取证，所以本题记 partial。已查入口：`delete_session_file_after_file_removed` 的文件删除与 artifact 分区清理、supervisor 的删除分支、归档 sweep。剩余缺口：删除会话文件时同名的 `.info-cache.json` sidecar 与 RLM 账本条目如何处理（账本有追加 tombstone 的代码路径，但本轮未取其行区间为证据）；父子会话的级联删除语义；删除后是否存在任何形式的重建入口。"缺少证据"不等于可以安全手动删除。

排错入口按可用信号从弱到强：

- 判断一个文件是不是会话文件：只读首行且上限 512 字节，首行不是合法的 `session` header 就不是会话文件——列表与有效性判断不整文件读。[@ref-prime-agent-lt-store-header-bounded]
- 判断文件是否会被修复：修复前的尾部扫描从文件尾按一兆字节窗口向前回退，找到换行边界后流式解析最后一行；命中 NUL 字节、末尾缺换行或末行非法 JSON 才进入修复。[@ref-prime-agent-lt-repair-load][@ref-prime-agent-lt-repair-damage-signals][@ref-prime-agent-lt-r967-repair-tail-scan]
- 判断修复会不会真的落盘：首行不是合法 `session` header 时整个文件被跳过、不重写；进入重写后逐行流式写临时文件并 rename 覆盖原文件。[@ref-prime-agent-lt-r967-repair-entry-gate][@ref-prime-agent-lt-r967-repair-streaming-rewrite]
- 判断哪一次打开会顺带修复：续接已存在会话的 worker 在拿到运行时会话租约后修复；替换会话的共用入口只在持有租约时修复。[@ref-prime-agent-lt-r967-create-repair-before-open][@ref-prime-agent-lt-r967-open-replacement-repair-gate]
- 判断整份记录是否可用：第一行不是合法 session header 时整份 entries 作废。[@ref-prime-agent-lt-repair-header-required]
- 判断会话处于什么状态：读 `session_state` 行的 `status`，取值 `active` / `archived` / `crash`。[@ref-prime-agent-lt-session-state-entry]
- 恢复失败时先分清是哪种失败：选择器解析按 cwd 本地匹配、全目录匹配、归档兜底三步走，歧义与未命中是不同的错误路径；命中归档会先 restore 再唤醒。[@ref-prime-agent-lt-catalog-archive-fallback]
- 列表变慢或 sidecar 行为异常：sidecar 只在版本精确匹配时生效，其余情况静默冷扫描，写失败也只是让下一次打开失去 warm resume。[@ref-prime-agent-lt-sidecar-purpose]

剩余缺口：本轮未取证是否有面向用户的"校验 / 修复会话文件"命令（只见到 daemon 内部的 repair 路径与 `sessions` 列表动作）；`--fork` 的隔离语义与 daemon 侧父子树一致性校验也未取证。