---
schema_version: 3
record_kind: production
edition_id: warp-local_transcripts-v1
harness_id: warp
topic: local_transcripts
title: "Warp 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-record-scope
    surface_ids: [desktop]
    source_refs: [ref-warp-lt-orch-run-transcript, ref-warp-lt-notif-orchestrated, ref-warp-lt-notif-orchestrated-child, ref-warp-lt-byok-backend-context, ref-warp-lt-byok-retention, ref-warp-lt-model-zdr, ref-warp-lt-slash-export]
  - section_id: transcripts-storage-layout
    surface_ids: [desktop]
    source_refs: [ref-warp-lt-files-buckets, ref-warp-lt-files-cross, ref-warp-lt-files-macos-state, ref-warp-lt-files-windows-state, ref-warp-lt-files-linux-state, ref-warp-lt-files-preview, ref-warp-lt-files-preview-linux, ref-warp-lt-ssh-remote-state, ref-warp-lt-ssh-install-path, ref-warp-lt-slash-session-ops]
  - section_id: transcripts-run-lifecycle
    surface_ids: [desktop]
    source_refs: [ref-warp-lt-slash-fork, ref-warp-lt-slash-fork-handoff, ref-warp-lt-slash-history, ref-warp-lt-slash-session-ops, ref-warp-lt-orch-run-transcript, ref-warp-lt-orch-message-bus, ref-warp-lt-orch-resumable]
  - section_id: transcripts-database-and-sync
    surface_ids: [desktop]
    source_refs: [ref-warp-lt-files-buckets, ref-warp-lt-files-macos-state, ref-warp-lt-files-linux-state, ref-warp-lt-orch-message-bus, ref-warp-lt-orch-isolation, ref-warp-lt-drive-sync, ref-warp-lt-drive-offline]
  - section_id: transcripts-export-and-retention
    surface_ids: [desktop]
    source_refs: [ref-warp-lt-slash-export, ref-warp-lt-drive-sync, ref-warp-lt-drive-offline, ref-warp-lt-byok-retention, ref-warp-lt-model-zdr]
  - section_id: transcripts-diagnostics
    surface_ids: [desktop]
    source_refs: [ref-warp-lt-slash-history, ref-warp-lt-slash-session-ops, ref-warp-lt-files-macos-state, ref-warp-lt-files-linux-state, ref-warp-lt-files-windows-state, ref-warp-lt-orch-state-observers, ref-warp-lt-orch-state-api, ref-warp-lt-notif-orchestrated-child]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-record-scope
        status: partial
        source_refs: [ref-warp-lt-orch-run-transcript, ref-warp-lt-notif-orchestrated, ref-warp-lt-notif-orchestrated-child, ref-warp-lt-byok-backend-context]
  - question_id: transcripts.location
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-warp-lt-files-buckets, ref-warp-lt-files-macos-state, ref-warp-lt-files-windows-state, ref-warp-lt-files-linux-state, ref-warp-lt-files-preview, ref-warp-lt-ssh-install-path]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-warp-lt-files-buckets, ref-warp-lt-files-cross, ref-warp-lt-files-preview, ref-warp-lt-files-preview-linux, ref-warp-lt-slash-session-ops]
  - question_id: transcripts.format
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-export-and-retention
        status: unknown
        source_refs: [ref-warp-lt-slash-export]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-record-scope
        status: unknown
        source_refs: [ref-warp-lt-slash-export]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-run-lifecycle
        status: partial
        source_refs: [ref-warp-lt-slash-fork, ref-warp-lt-slash-fork-handoff, ref-warp-lt-slash-history, ref-warp-lt-orch-resumable]
  - question_id: transcripts.database
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-database-and-sync
        status: partial
        source_refs: [ref-warp-lt-files-buckets, ref-warp-lt-files-macos-state, ref-warp-lt-files-linux-state, ref-warp-lt-orch-message-bus, ref-warp-lt-orch-isolation]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-export-and-retention
        status: partial
        source_refs: [ref-warp-lt-slash-export, ref-warp-lt-drive-sync, ref-warp-lt-drive-offline]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-export-and-retention
        status: unknown
        source_refs: [ref-warp-lt-drive-offline, ref-warp-lt-byok-retention, ref-warp-lt-model-zdr]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [desktop]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-warp-lt-slash-history, ref-warp-lt-slash-session-ops, ref-warp-lt-files-macos-state, ref-warp-lt-files-linux-state, ref-warp-lt-orch-state-observers, ref-warp-lt-orch-state-api, ref-warp-lt-notif-orchestrated-child]
---

## 会话记录的范围：run 级 transcript 与对话历史 {#transcripts-record-scope}

Warp 没有登记 git 源码来源，本主题的全部证据来自本轮已归档的官方文档快照：`snapshot-warp-lt-file-locations-20261006`、`snapshot-warp-lt-slash-commands-20261006`、`snapshot-warp-lt-orchestration-20261006`、`snapshot-warp-lt-agent-notifications-20261006`、`snapshot-warp-lt-byok-20261006`、`snapshot-warp-lt-model-choice-20261006`、`snapshot-warp-lt-warp-drive-20261006`、`snapshot-warp-lt-ssh-extension-20261006`（抓取时间 2026-10-06）。这些快照的 `version_applicability` 都是 `unknown`，所以下文描述的是**当前文档所描述的形态**，不能被读成任何已安装版本的行为。

可由固定来源直接证实的范围事实有四条。

第一，**记录的粒度是 run**。在多 agent 编排里，parent 与每个 child 各有一个独立 run，"each have an independent **run** with its own lifecycle, transcript, conversation, and credit usage"，而且编排目前只有一层深度，child 不再继续派生 [@ref-warp-lt-orch-run-transcript]。文档在这里把 transcript 与 conversation 并列：transcript 是 run 的记录，conversation 是它面向用户的呈现。

第二，**父记录包含子 run 的状态事件，而不是子记录全文**。应用内通知只在 parent 的 conversation 上触发，child conversation 被排除在 toast 流和通知信箱之外；子状态通过 parent 的 transcript 反映出来，`BLOCKED` 时可以从父记录里看到子在等用户动作 [@ref-warp-lt-notif-orchestrated][@ref-warp-lt-notif-orchestrated-child]。

第三，**会话上下文会离开本机进入后端处理路径**。Warp Agent harness 跑在 Warp 后端，由它把 system instructions、conversation context、tools 组装成完整请求再发给模型 provider，响应再流回客户端 [@ref-warp-lt-byok-backend-context]。因此"记录落在本机"与"内容只在本机"是两件事，不能混为一谈。

第四，**落盘之外的保留有明确声明**：Warp 与 LLM provider 签有 ZDR 协议，provider 承诺不用于训练并在固定时限后删除输入输出；BYOK 的 prompt 与 response 经 Warp 后端，其保留与分析处理遵循账户级 privacy 与 telemetry 设置 [@ref-warp-lt-model-zdr][@ref-warp-lt-byok-retention]。

`transcripts.scope` 因此只能记 **partial**：已查入口是 file-locations 页（只讲目录分桶与内容归属）、slash-commands 页（会话级命令）、orchestration 与 agent-notifications 页（run 状态与通知面）、BYOK 与 model-choice 页（保留策略）、Warp Drive 页（同步对象类型）。剩余缺口是没有文档化的"记录开关"清单——哪些输入历史、调试信息、缓存会落盘、控制它们的设置项在本轮来源集合内均无记载。

`transcripts.schema` 记 **unknown**：已归档的固定来源没有给出任何第一方记录类型、字段、必填项、关系或版本迁移规则，也没有脱敏的记录样例。本轮来源中唯一被文档规定的会话序列化产物是 markdown 文本导出 [@ref-warp-lt-slash-export]——那是导出格式，不能当作落盘记录 schema 的证据。

## 存储位置、目录分桶与通道差异 {#transcripts-storage-layout}

Warp 把磁盘文件分成三类，会话记录所在的类别是 **non-portable state**：文档明确把 "logs, the local database, and the Codebase Context index" 归到这一类，同时把 themes、tab configs、workflows、launch configurations 归为可搬迁的 portable user data，把 `settings.toml`、`keybindings.yaml` 归为 non-portable config [@ref-warp-lt-files-buckets]。这个分桶是判断"哪些文件可以整机复制、哪些必须留在本机"的唯一官方依据。

各平台的 non-portable state 根目录不同，同一个 App 在不同系统上不是同一路径：

| 平台 | 会话记录相关状态所在位置 |
|---|---|
| macOS（Stable） | `~/Library/Logs/warp.log*`；Database、Codebase Context index、MCP logs 位于 `~/Library/Group Containers/2BBY89MBSN.dev.warp/Library/Application Support/dev.warp.Warp-Stable/` [@ref-warp-lt-files-macos-state] |
| Windows（Stable） | `%LOCALAPPDATA%\warp\Warp\data\logs\warp.log*`；Database、Codebase Context index、MCP logs 是 `%LOCALAPPDATA%\warp\Warp\data\` 下的其它子目录；Cache 在 `%LOCALAPPDATA%\warp\Warp\cache\` [@ref-warp-lt-files-windows-state] |
| Linux（Stable） | `${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/warp.log*`；Database、Codebase Context index、MCP logs 是 `${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/` 下的其它文件；Cache 在 `${XDG_CACHE_HOME:-$HOME/.cache}/warp-terminal/` [@ref-warp-lt-files-linux-state] |

Linux 的路径随 `XDG_STATE_HOME` 等标准环境变量变化；Windows 的路径随 `%LOCALAPPDATA%` 变化，且 portable 与 non-portable 数据分别落在 `%APPDATA%`（Roaming）与 `%LOCALAPPDATA%`（Local）两个 `data\` 目录下，定位时必须看完整路径。

发布通道会改变目录名。Preview 通道在 macOS 上把 `~/.warp/` 换成 `~/.warp-preview/`、把 `Warp-Stable` 换成 `Warp-Preview`，在 Windows 上把 `\warp\Warp\` 换成 `\warp\WarpPreview\` [@ref-warp-lt-files-preview]；Linux 则给每个 `warp-terminal` 目录追加 `-preview`，例如 `~/.config/warp-terminal-preview/settings.toml`，日志变成 `warp_preview.log*` [@ref-warp-lt-files-preview-linux]。唯一跨通道共享的是 home 目录下的横切文件——当前是 MCP server 配置与随附 skills，Stable 与 Preview 共用同一个 `~/.warp/`，其它通道才用带通道后缀的目录（如 OSS 的 `~/.warp-oss/`）[@ref-warp-lt-files-cross]。把两条规则合起来读：Preview 用一套独立目录以免覆盖 Stable 配置，而记录所在的 non-portable state 也随通道改名，因此同一台机器上并存两个通道时，会话记录分属两套互不覆盖的状态目录（文档未逐条列出 Preview 下的数据库文件名）。

SSH 会话会额外在**远端**产生状态目录。SSH extension 安装在远端 `~/.warp/remote-server`（Preview 为 `~/.warp-preview/remote-server`），同一主机的多个 SSH 会话与 Warp 窗口共用一个 server 进程，卸载方式是删除远端 `~/.warp*/remote-server` 目录 [@ref-warp-lt-ssh-install-path][@ref-warp-lt-ssh-remote-state]。本机路径表不描述远端主机上的记录；备份一台机器不等于备份了它连过的所有远端主机。

`transcripts.location` 记 **partial**：目录层级与平台、通道变量关系有官方依据，但**没有任何文件名、表名或索引文件被文档化**——文档只说"Database、Codebase Context index、MCP logs 位于某目录"，没有列出具体文件。已查入口即 file-locations 全页与 SSH extension 页。

`transcripts.naming` 同样记 **partial**，且分两层。磁盘层：官方只定义了按用途命名的**目录**（state 根目录、portable 数据目录），没有会话文件命名规则、会话 ID 落盘形式、时间戳格式或项目路径编码规则的记载 [@ref-warp-lt-files-buckets][@ref-warp-lt-files-cross]。用户可见层：会话可以用 `/rename-conversation` 重命名，标签用 `/rename-tab` 重命名，这只是显示名，不构成磁盘命名规则 [@ref-warp-lt-slash-session-ops]。父/子与分支关系：编排只有一层深度，parent 与 child 各有独立 run；跨 run 的关联用 agent ID 寻址，不是文件名约定 [@ref-warp-lt-orch-run-transcript]。

## run 的生命周期：分叉、压缩、回退与交接 {#transcripts-run-lifecycle}

会话记录的派生与延续由会话级命令驱动，全部是**用户显式触发**，没有自动的周期归档或轮转：

- `/fork` 把当前会话分叉成新线程，带上原会话的完整上下文与历史；`/fork-and-compact` 在分叉后自动压缩；`/fork-from` 提供可搜索菜单，从某个 query 处分叉，包含到那一点为止的内容 [@ref-warp-lt-slash-fork]。
- `/compact` 通过总结对话历史释放上下文，`/compact-and` 先压缩再发追问——压缩之后会话**继续延续**，而不是新建记录 [@ref-warp-lt-slash-history]。
- `/rewind` 回退到会话中的前一个点 [@ref-warp-lt-slash-session-ops]。
- 跨位置交接是双向的：`/handoff` 把本地会话交给 cloud agent，携带它的历史与未提交改动的快照；`/continue-locally` 在 cloud agent 会话活动时把该会话分叉成本地 Warp 会话 [@ref-warp-lt-slash-fork-handoff]。
- 子 agent 生命周期独立于父：编排目前只有一层深度，parent 与每个 child 各是一个拥有独立 transcript 与 conversation 的 run，child 不再继续派生 [@ref-warp-lt-orch-run-transcript]。达到终态（`SUCCEEDED`、`FAILED`、`CANCELLED`、`ERROR`）的 child 并未被销毁，仍可由 agent ID 寻址，父发来新消息时会唤醒处理；编排另有持久的服务端消息总线，每个 agent 有按 agent ID 寻址的收件箱 [@ref-warp-lt-orch-resumable][@ref-warp-lt-orch-message-bus]。

`transcripts.lifecycle` 记 **partial**：创建、分叉、压缩后延续、回退、交接与子 run 的可恢复性都有官方表述。剩余缺口是落盘层面的时序——记录何时追加、何时刷盘、关闭会话时如何收尾、上下文压缩后被摘要替换的原始内容是否仍完整保留，本轮来源集合没有说明；`/continue-locally` 与 `/handoff` 的实现细节指向的 Handoff 文档页也未包含在已归档来源内。

## 本地数据库、索引与"什么才真的同步" {#transcripts-database-and-sync}

Warp 桌面端确实使用本地数据库：文档把 "the local database" 列为 non-portable state 的典型内容，与 logs、Codebase Context index 并列 [@ref-warp-lt-files-buckets]，并给出各平台所在目录——macOS 在应用支持目录下与日志同一 Group Container 路径 [@ref-warp-lt-files-macos-state]，Linux 在 `${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/` 下 [@ref-warp-lt-files-linux-state]。数据库承担什么、与 Codebase Context 索引如何分工、恢复会话需要哪些文件、能否重建，文档都没有说明。

多 agent 编排的记录侧**不在本机**：编排建立在持久的服务端消息总线上，每个 agent 有按 agent ID 寻址的收件箱；每个 run 拥有自己的 conversation、工作目录或环境与额度，agent 之间不互相读取 transcript 或活动工作树，而是交换显式消息，消息与 run 状态迁移共享一个全局序列号 [@ref-warp-lt-orch-message-bus][@ref-warp-lt-orch-isolation]。这解释了为什么本地记录删除不等于本地 agent 失去协作上下文，也解释了为什么跨 agent 的记录无法靠复制本机目录获得。

必须把"同步"与"本地落盘"分开。Warp Drive 里**实时同步**的对象是 Workflows、Notebooks、Prompts 和 Environment Variables [@ref-warp-lt-drive-sync]；会话记录不在这个列表里。Drive 的离线行为也说明这类对象的存储模型：离线时个人空间仍可创建与编辑，内容只保存在本地、不同步，且在恢复在线前不能移入团队空间或删除 [@ref-warp-lt-drive-offline]。文档没有给出任何"会话记录同步到云端"的开关或说明。

`transcripts.database` 记 **partial**：本地数据库的存在与位置、编排记录的服务端形态、run 之间的隔离与全局序列号有依据；表结构、正文与元数据的分工、恢复所必需的文件清单、能否重建均无依据。

## 导出、保留与删除 {#transcripts-export-and-retention}

Warp 为会话提供的**原生导出**只有两条命令，结果都是 markdown：`/export-to-clipboard` 把当前会话导出到剪贴板，`/export-to-file` 导出为一个 markdown 文件 [@ref-warp-lt-slash-export]。这属于导出，不是归档开关——没有文档化的"把会话移入归档"入口，也没有归档依赖哪些必要文件的说明。因此 `transcripts.format` 记 **unknown`：落盘记录的编码、JSON/JSONL/二进制形态、追加还是覆盖、分片与压缩规则都没有来源；markdown 是导出格式，不能反推记录格式。

`transcripts.archive` 记 **partial**：导出可用、且导出产物是 markdown 文本；但没有原生归档开关，也没有"归档依赖哪些文件""恢复后损失什么"的说明。Warp Drive 的对象级同步与离线行为只对 Drive 对象成立，不能当作会话记录的归档语义 [@ref-warp-lt-drive-sync][@ref-warp-lt-drive-offline]。

`transcripts.cleanup` 记 **unknown`，并且明确**不能**据此认为记录可以安全删除。已查入口：slash-commands 全表（无删除会话的命令）、orchestration 页（只有 run 状态与可恢复性，无删除语义）、agent-notifications 页、file-locations 页（卸载相关文件清理指向一个未包含在本轮归档集合中的文档页）、Warp Drive 页（"Delete permanently" 与离线删除限制都只针对 Drive 对象）、BYOK 与 model-choice 页（只有保留与 ZDR 声明，属服务端与 provider 侧，不涉及本机记录）。剩余缺口是本机记录与本地数据库的官方删除/保留机制、手动删除的后果、需要先停止的写入者、级联删除与孤儿记录——本轮固定来源均未记载。可对照的两类保留声明都只约束服务端与 provider 侧，不涉及本机记录：Warp 与 LLM provider 的 ZDR 协议（provider 承诺不训练、并在固定时限后删除输入输出）[@ref-warp-lt-model-zdr]，以及 BYOK 内容的保留与分析处理遵循账户级 privacy 与 telemetry 设置 [@ref-warp-lt-byok-retention]。对照面是 Drive 对象：文档为那类对象写明了离线期间的保存位置与删除限制 [@ref-warp-lt-drive-offline]，会话记录没有对应段落。**"文档没写"不等于"可以安全删除"**。

## 定位、读取与排错入口 {#transcripts-diagnostics}

在**应用内**定位一条会话记录：

- `/conversations` 打开 conversation history，`/copy-debugging-id` 在会话活动时把当前会话的调试信息复制到剪贴板，用于提交问题 [@ref-warp-lt-slash-history]。
- `/rewind`、`/rename-conversation` 等会话级命令确认"当前会话"对象存在且可寻址 [@ref-warp-lt-slash-session-ops]。
- 多 agent 场景：Warp 应用内 agent 视图上方的 orchestration pill bar 可在 parent 与各 child 的会话之间切换并显示实时状态徽标；云端子 run 在 Oz web 应用 Runs 页面的 parent 行下与 Sub-agents 标签中呈现；API 侧 `GET /agent/runs/{runId}` 返回任一 run 的最新状态，`GET /agent/runs?ancestor_run_id=PARENT_RUN_ID` 一次列出全部后代 [@ref-warp-lt-orch-state-observers][@ref-warp-lt-orch-state-api]。子 run 阻塞时，从 pill bar 打开该子会话解决，parent 的 transcript 会同步反映 `BLOCKED` [@ref-warp-lt-notif-orchestrated-child]。

在**文件系统**上定位：日志与本地数据库在各平台的 non-portable state 目录内，日志路径是平台相关且随通道变化的（macOS `~/Library/Logs/warp.log*`、Linux `${XDG_STATE_HOME:-$HOME/.local/state}/warp-terminal/warp.log*`、Windows `%LOCALAPPDATA%\warp\Warp\data\logs\warp.log*`）[@ref-warp-lt-files-macos-state][@ref-warp-lt-files-linux-state][@ref-warp-lt-files-windows-state]。远端 SSH 主机的状态在远端 `~/.warp*/remote-server`，本机路径表不覆盖。

`transcripts.diagnostics` 记 **partial**：有官方入口可用于定位会话与 run 状态，并有日志目录位置；但没有记录完整性校验、状态自检、备份/恢复排错流程的说明——没有任何文档化的工具能判断本地数据库是否损坏、能否在不丢记录的前提下回滚。