---
schema_version: 3
record_kind: production
edition_id: antigravity-cli-local_transcripts-v1
harness_id: antigravity
topic: local_transcripts
title: "Antigravity CLI 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-recorded-content
    surface_ids: [cli]
    source_refs:
      - ref-antigravity-lt-transcript-jsonl
      - ref-antigravity-lt-diff-body-elided
      - ref-antigravity-lt-db-conversation-format
      - ref-antigravity-lt-key-toggle-trajectory
  - section_id: transcripts-storage-and-scope
    surface_ids: [cli]
    source_refs:
      - ref-antigravity-lt-private-app-data-dir
      - ref-antigravity-lt-windows-transcript-path
      - ref-antigravity-lt-picker-grouping
      - ref-antigravity-lt-continue-workspace-fallback
      - ref-antigravity-lt-cmd-rename
      - ref-antigravity-lt-auto-title
  - section_id: transcripts-record-format
    surface_ids: [cli]
    source_refs:
      - ref-antigravity-lt-db-conversation-format
      - ref-antigravity-lt-db-wal-scan
      - ref-antigravity-lt-transcript-jsonl
      - ref-antigravity-lt-diff-body-elided
      - ref-antigravity-lt-trajectory-truncation
      - ref-antigravity-lt-db-row-growth
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-antigravity-lt-print-mode-flush
      - ref-antigravity-lt-auto-resume-restart
      - ref-antigravity-lt-compaction-transcript-race
      - ref-antigravity-lt-wal-checkpoint-exit
      - ref-antigravity-lt-fork-concurrent-instance
      - ref-antigravity-lt-cmd-fork
  - section_id: transcripts-conversation-database
    surface_ids: [cli]
    source_refs:
      - ref-antigravity-lt-db-conversation-format
      - ref-antigravity-lt-db-wal-scan
      - ref-antigravity-lt-summary-cache
      - ref-antigravity-lt-wal-checkpoint-exit
      - ref-antigravity-lt-db-row-growth
  - section_id: transcripts-reuse-retention-and-repair
    surface_ids: [cli]
    source_refs:
      - ref-antigravity-lt-session-export
      - ref-antigravity-lt-db-conversation-format
      - ref-antigravity-lt-deleted-conversation-recreated
      - ref-antigravity-lt-picker-delete-key
      - ref-antigravity-lt-orphan-annotation-files
      - ref-antigravity-lt-missing-step-resume
      - ref-antigravity-lt-cli-log-path
      - ref-antigravity-lt-cmd-resume
      - ref-antigravity-lt-cmd-rewind
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recorded-content
        status: partial
        source_refs:
          - ref-antigravity-lt-transcript-jsonl
          - ref-antigravity-lt-diff-body-elided
          - ref-antigravity-lt-db-conversation-format
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-scope
        status: partial
        source_refs:
          - ref-antigravity-lt-private-app-data-dir
          - ref-antigravity-lt-windows-transcript-path
          - ref-antigravity-lt-picker-grouping
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-and-scope
        status: partial
        source_refs:
          - ref-antigravity-lt-cmd-rename
          - ref-antigravity-lt-auto-title
          - ref-antigravity-lt-picker-grouping
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: partial
        source_refs:
          - ref-antigravity-lt-db-conversation-format
          - ref-antigravity-lt-db-wal-scan
          - ref-antigravity-lt-transcript-jsonl
          - ref-antigravity-lt-diff-body-elided
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: partial
        source_refs:
          - ref-antigravity-lt-db-row-growth
          - ref-antigravity-lt-trajectory-truncation
          - ref-antigravity-lt-transcript-jsonl
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-antigravity-lt-print-mode-flush
          - ref-antigravity-lt-auto-resume-restart
          - ref-antigravity-lt-compaction-transcript-race
          - ref-antigravity-lt-wal-checkpoint-exit
          - ref-antigravity-lt-fork-concurrent-instance
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-conversation-database
        status: partial
        source_refs:
          - ref-antigravity-lt-db-conversation-format
          - ref-antigravity-lt-db-wal-scan
          - ref-antigravity-lt-summary-cache
          - ref-antigravity-lt-wal-checkpoint-exit
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-reuse-retention-and-repair
        status: partial
        source_refs:
          - ref-antigravity-lt-session-export
          - ref-antigravity-lt-db-conversation-format
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-reuse-retention-and-repair
        status: partial
        source_refs:
          - ref-antigravity-lt-picker-delete-key
          - ref-antigravity-lt-deleted-conversation-recreated
          - ref-antigravity-lt-orphan-annotation-files
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-reuse-retention-and-repair
        status: partial
        source_refs:
          - ref-antigravity-lt-missing-step-resume
          - ref-antigravity-lt-cli-log-path
          - ref-antigravity-lt-cmd-resume
          - ref-antigravity-lt-cmd-rewind
---

# Antigravity CLI：本地 Transcript

本主题只覆盖 `cli` 界面（catalog `antigravity` 的 Antigravity CLI）。desktop、ide、sdk 三个已声明界面本轮未调查，查询会派生出 `not_investigated`。

固定来源范围与版本边界：

- 源码来源 `source-agy-repo`（`https://github.com/google-antigravity/antigravity-cli.git`），本轮 pin 在 commit `274d81b9929aaa2b91a7266106d0d0b7f19adf52`，抓取时间 2026-10-06。该 commit 的仓库树只包含 `README.md`、`CHANGELOG.md`、`.github/` 与 `examples/`，**不包含 CLI 的实现源码**。因此本节的机制结论是「发行说明与文档所陈述的行为」，不是对实现代码的读解。
- `CHANGELOG.md` 覆盖 1.0.2 至 1.2.17 的发行条目；每条结论都注明它所属的发行号。一个版本验证过不代表后续版本行为不变。
- 官方文档来源：`source-agy-cli-reference-doc`（`https://antigravity.google/docs/cli/reference.md`）与 `source-agy-repo` 的 `README.md`。文档快照的原件在本轮工作副本的 `archive/antigravity/` 下没有保留，本节引用文档时的摘录取自对同一登记 URL 的直接读取，摘录文本可能与快照内容存在差异；相关问题因此保持 `partial`。
- 本文不写 `mappings/`：源码 commit 不能证明某个 npm 发行包的行为。

## 记录范围与开关 {#transcripts-recorded-content}

**结论（partial）**：Antigravity CLI 的会话以「会话 + 步骤序列」的形式本地持久化，落盘载体是 SQLite `.db` 文件；`.db` 是 CLI 自己的会话格式，并支持从 Antigravity 2.0 导入 SQLite 会话 [@ref-antigravity-lt-db-conversation-format]。CLI 同时维护一份 `transcript.jsonl` 会话日志，终端里失败的步骤（工具执行失败、超时等 `ERROR` 步骤）此前会漏记，1.2.4 起被纳入该日志 [@ref-antigravity-lt-transcript-jsonl]。

从步骤类型可以反推记录的内容种类：用户消息、agent 回复、thinking 帧、命令及其输出、文件 diff、工具调用与结果、错误步骤。会话在终端里通过 `Ctrl+O` 展开或折叠「详细工具推理输出」，对应的 TUI 命令是 `prompt.toggle_trajectory`，也就是记录里的 trajectory 部分对用户可见可展开 [@ref-antigravity-lt-key-toggle-trajectory]。

**不落盘或被裁剪的内容**：单个文件编辑的 diff 超过 1 MiB 时会超出会话存储上限并强制清空会话；1.2.6 起这类超大 diff 只保留行变更统计，从存储的会话历史里省略原始 diff 正文，`/rewind` 回退时也跳过被省略的 diff [@ref-antigravity-lt-diff-body-elided]。这是本轮固定来源中唯一能证实的「内容被主动裁剪」机制。

**开关**：在已登记的固定来源中**没有找到**关闭本地会话落盘的开关。已查入口：

- CLI reference 的 `Configuration keys (settings.json)` 键表，其中与数据相关的只有 `enableTelemetry`（指标与崩溃日志流式上报），没有 transcript/history/recording 类键；
- CLI reference 的 slash 命令表，只有 `/clear`（别名 `/new`）会「清屏并重置活动会话上下文」，属于会话内重置而不是落盘开关；
- `CHANGELOG.md` 全文，没有出现关闭、禁用或保留期（retention）相关的会话记录开关。

缺口：无法判定「不落盘」的完整清单，也无法从固定来源确认默认的保留期或自动清理行为。

## 存储位置、项目作用域与会话命名 {#transcripts-storage-and-scope}

**位置（partial）**：CLI 把自己的私有应用数据放在与共享配置目录分离的位置。1.0.2 的发行说明把 `~/.gemini/config/` 称作「共享配置目录」，并把另一处称作「私有应用数据文件夹」；1.1.0 的发行说明在纠正一个显示错误时直接写出私有目录为 `~/.gemini/antigravity-cli/` [@ref-antigravity-lt-private-app-data-dir]。按 `README.md` 的自述，CLI 与 Antigravity 2.0 共用同一套 agent 引擎和双向同步的设置，但会话记录归属 CLI 自身。

**缺口（重要）**：已登记来源**没有给出存放 `.db` / `transcript.jsonl` 的具体子目录**。可确认的只有 CLI 私有应用数据根目录 `~/.gemini/antigravity-cli/` 这一层；会话文件是否直接位于该根、在其下的哪个子目录、以及是否随发行包而异，本轮无法证实。同理，也没有找到把会话目录重定向到其它位置的环境变量（`AGY_CLI_*` 系列环境变量在本轮来源中用于 logo、渲染优化、LaTeX、命令输出高度、账号信息与自动更新，与会话路径无关）。

**平台差异**：会话 transcript 路径在 Windows 上曾因未识别盘符而在 trajectory 日志转换时崩溃，1.1.12 修正为遵守路径的盘符 [@ref-antigravity-lt-windows-transcript-path]。这条只说明路径按平台解析，**不**把 Linux 的路径结论外推到 Windows。

**项目作用域**：会话与工作区目录相关。`/resume` 选择器支持按工作区分组显示（`pickerGrouping` 设置，同时出现在 `/config` 与 `settings.json`）[@ref-antigravity-lt-picker-grouping]；`--continue` 在从子目录启动、崩溃后或同工作区已有其它会话打开时，会回退到当前工作区或其父/子目录中最近的一个非空会话 [@ref-antigravity-lt-continue-workspace-fallback]。因此「当前工作区」本身参与会话选择，而不只是记录内容。

**命名（partial）**：会话有一个可在 `/resume` 中看到的线程名。CLI reference 把 `/rename`（带名称参数）归在 Conversations 类别，描述为「重命名当前会话线程」 [@ref-antigravity-lt-cmd-rename]；1.1.21 起会话创建时会自动生成标题，使选择器里显示有意义的名称而不是首条消息占位符 [@ref-antigravity-lt-auto-title]。

缺口：会话 ID 的生成规则、目录与文件命名模板、项目路径如何编码进文件名或路径，固定来源均未给出。

## 记录格式与可证实的 schema 片段 {#transcripts-record-format}

**格式（partial）**：可证实的第一方格式有三种形态：

1. **SQLite `.db`**：1.0.4 引入 SQLite 会话支持，并明确它就是 CLI 的会话格式 [@ref-antigravity-lt-db-conversation-format]。
2. **`.db-wal`**：SQLite 的预写日志。`/resume` 在扫描会话时会同时处理 `.db` 与 `.db-wal` [@ref-antigravity-lt-db-wal-scan]，这说明读取路径必须把 `-wal` 副本当成本体记录的一部分。
3. **`transcript.jsonl`**：按名判断是 JSON Lines 形式的会话日志 [@ref-antigravity-lt-transcript-jsonl]。固定来源没有给出它的行结构，也没有说明它与 `.db` 是一份记录的两种投影还是两套并行记录 —— 这是本轮未解决的冲突点，**不做推断**。

**写入与裁剪规则（partial）**：

- 超大 diff 的原始正文不写入存储的会话历史，只保留行变更统计 [@ref-antigravity-lt-diff-body-elided]。
- 长会话会做 trajectory 截断；1.1.13 修正为只对「字节真正可回收」的步骤计入大小预算，避免把受保护的 checkpoint 和已清空步骤的不可回收残余算进预算、进而摧毁几乎全部历史 [@ref-antigravity-lt-trajectory-truncation]。这说明会话历史里存在「受保护的 checkpoint」与「已清空步骤」两类不同保护等级的记录。
- 编码、追加/覆盖语义、分片与压缩规则，固定来源均未描述。

**可证实的字段线索（partial）**：1.1.13 修复了「被后台任务、子代理或 agent 消息唤醒的会话里，每次唤醒都向每一条持久化行追加重复的 grants 与 settings，导致磁盘会话库无界增长」的问题 [@ref-antigravity-lt-db-row-growth]。由此可知持久化行里除步骤内容外还承载权限授予与设置这类会话级状态，并且这些状态以追加而非替换的方式写入历史。

**仍缺的 schema 缺口（照实列出）**：

- 记录类型（消息 / 工具调用 / 事件）的正式类型名与判别字段；
- 各类型的字段名、类型、必填项与相互关系；
- 会话与步骤的主键、外键与排序字段；
- `transcript.jsonl` 每行的结构；
- 版本迁移规则（从 1.0.4 之前的旧格式到 `.db` 的迁移路径只在发行说明里出现过一句「从 Antigravity 2.0 导入 SQLite 会话」）；
- 一个脱敏、最小且完整的记录示例 —— 固定来源不含任何示例记录，**本节不编造示例**。

## 生命周期 {#transcripts-lifecycle}

按固定来源可证实的环节：

- **创建**：会话创建时即生成标题并落盘 [@ref-antigravity-lt-auto-title]。
- **追加**：每一轮用户消息、agent 步骤、工具结果都会追加进存储的会话历史 [@ref-antigravity-lt-db-row-growth]。后台任务、子代理和 agent 消息也会唤醒会话并写入。
- **刷盘**：CLI 退出时执行 SQLite WAL checkpoint，把尾部会话元数据更新刷到磁盘 [@ref-antigravity-lt-wal-checkpoint-exit]。print 模式（`-p`）曾在会话关闭完成前就退出，导致本轮尾部会话历史在到达磁盘前丢失 [@ref-antigravity-lt-print-mode-flush]。
- **压缩后续写**：上下文压缩会重写 transcript；1.1.13 修复了「后台消息在压缩重写期间追加到 transcript，产生无法解析的畸形 JSON」这一损坏 [@ref-antigravity-lt-compaction-transcript-race]。1.1.3 起界面会在每个上下文压缩边界打标记，方便回看压缩发生的位置。
- **恢复**：存在活动轮次或运行中的 daemon 后台任务的会话，在重启后会自动恢复（1.2.4 修复）[@ref-antigravity-lt-auto-resume-restart]。
- **分支**：`/fork`（别名 `/branch`）把当前会话线程克隆为一个并行会话 [@ref-antigravity-lt-cmd-fork]。同一台机器上另一个 CLI 实例已打开同一会话时，CLI 会给出非阻塞提示并指向 `/fork`，以免两个会话把写入交错进同一条 trajectory [@ref-antigravity-lt-fork-concurrent-instance]。
- **交给子代理**：子代理有自己的会话（subtrajectory）。这些子代理会话不会出现在 `/resume` 选择器里，选择器只保留用户直接发起的会话。
- **回退**：`/rewind`（别名 `/undo`）把会话历史回滚到之前的一条消息。

缺口：逐步骤的写入时机（每步追加还是批量）、崩溃后的部分写入如何标记、恢复时重建上下文的顺序，固定来源均未描述。

## 会话数据库与索引的分工 {#transcripts-conversation-database}

**结论（partial）**：CLI 用 SQLite 承载会话，会话文件本体就是 `.db`，格式为 CLI 自有格式 [@ref-antigravity-lt-db-conversation-format]。

会话文件与辅助状态的关系，按固定来源可证实：

- **`.db-wal` 与本体配套**：`/resume` 扫描会话时同时处理 `.db` 与 `.db-wal` [@ref-antigravity-lt-db-wal-scan]。只看本体而忽略未 checkpoint 的 WAL，会漏掉最近的写入。
- **摘要缓存**：存在一个可冷可陈的 summary cache，1.2.2 让 `/resume` 在打开大体量会话历史时更快，说明摘要是与步骤正文分开的派生状态 [@ref-antigravity-lt-summary-cache]。1.0.16 另外把后台同步接到「共享 SQLite summary store」，并在 CLI 退出时解决 goroutine 与数据库连接泄漏，说明除会话库外还有一个被多个组件共享的摘要库。
- **退出刷盘**：会话库的 WAL checkpoint 在 CLI 退出时执行，尾部会话元数据才会落盘 [@ref-antigravity-lt-wal-checkpoint-exit]。
- **行内容**：持久化行除步骤内容外还带权限授予与设置等会话级状态，且历史上以追加方式累积 [@ref-antigravity-lt-db-row-growth]。

**恢复所必需的文件**：从上述证据看，完整恢复一个会话至少需要该会话的 `.db` 及其尚未 checkpoint 的 `-wal` 侧文件；摘要缓存是派生状态，冷或陈旧时只影响打开速度而非会话内容 [@ref-antigravity-lt-summary-cache]。

**能否重建**：固定来源没有提供任何从其它数据重建会话库的工具或流程的记载。`/rewind` 的快照查找有回退到「逐步回放」的逻辑，但那是从会话自身的快照做的回退，不是从原始材料重建整条会话。

缺口：表结构、索引清单、是否有独立索引文件、数据库 schema 版本与迁移脚本，固定来源均未给出。

## 复用、保留、删除与排错 {#transcripts-reuse-retention-and-repair}

**复用与导出（partial）**：`README.md` 在 Integration 一节声明 CLI 与 Antigravity 2.0 具备 Session Export —— 把终端会话导出到 Antigravity 2.0 GUI 继续工作 [@ref-antigravity-lt-session-export]；发行侧还有从 Antigravity 2.0 导入 SQLite 会话的记载 [@ref-antigravity-lt-db-conversation-format]。固定来源**没有**把它描述成开关式的归档功能，也没有说明导出/导入覆盖哪些字段、是否需要 `.db-wal` 一并迁移，因此不能把它当作可依赖的归档契约。

**官方删除机制（partial）**：删除会话的入口是 `/resume` 选择器，快捷键绑定为 `item.delete`，默认 `f4`（早期为 `ctrl+delete`，因与全局退出键冲突、以及 macOS 终端对 `ctrl+delete` 的上报差异而改过）[@ref-antigravity-lt-picker-delete-key]。`item.rename` 与 `item.delete` 都可以在 `keybindings.json` 中重绑。

**手动删除的后果（partial，但方向明确）**：

- 删除会留下孤儿：1.1.24 修复了「删除会话时本地存储中残留孤儿 annotation 文件」的问题 [@ref-antigravity-lt-orphan-annotation-files]。这说明一次会话删除涉及会话记录之外还有与之配对的附属文件。
- 删除后可能被后台重建：1.2.2 修复了「已删除的会话在后台查询重连后被重新创建成空的、无 schema 的 SQLite 数据库文件」[@ref-antigravity-lt-deleted-conversation-recreated]。**因此手动删文件前必须先停止仍在运行的 CLI 实例与后台写入者**，否则空库会重新出现。
- 同一台机器上多个 CLI 实例可打开同一会话并交错写入同一条 trajectory [@ref-antigravity-lt-fork-concurrent-instance]，这是删除前必须确认没有第二个写入者的直接依据。

**保留策略**：固定来源中**没有**任何自动保留期、容量上限或自动清理的说明。已查入口为 `CHANGELOG.md` 全文与 CLI reference 的配置键表。按本主题纪律，**「没找到证据」不等于可以安全删除**：上述孤儿 annotation 文件与被重建的空库说明手工删除并非无副作用。

**定位与排错（partial）**：

- 日志位置：CLI 日志文件路径会显示在 `/help` 菜单里，便于排错 [@ref-antigravity-lt-cli-log-path]。1.2.8 之前启动期诊断（含 `--conversation` 未找到警告、会话加载错误）会被吞进日志文件而到不了终端。
- 读回记录：`/resume`（别名 `/switch`、`/conversation`）打开会话选择器以选择并载入历史线程 [@ref-antigravity-lt-cmd-resume]；搜索框、粘贴、workspace 分组与列自适应都在这个选择器里。
- 回退与排错：`/rewind` 把会话历史回滚到之前一条消息 [@ref-antigravity-lt-cmd-rewind]。
- 完整性：1.2.14 修复了「崩溃或写入被中断导致历史缺一步时，恢复会话会隐藏最近若干步并让新消息覆盖它们」[@ref-antigravity-lt-missing-step-resume]。这说明**恢复路径会重建一条不完整的历史**，只靠「能打开」不能判断记录完整。

缺口：没有官方的一致性检查命令、没有记录校验工具、没有备份与恢复指引；会话目录的绝对路径模板也未在固定来源中给出，因此本节不给出可直接复制的备份路径命令。
