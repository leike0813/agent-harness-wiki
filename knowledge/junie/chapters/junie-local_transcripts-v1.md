---
schema_version: 3
record_kind: production
edition_id: junie-local_transcripts-v1
harness_id: junie
topic: local_transcripts
title: "Junie CLI 的本地 Transcript：会话记录的位置、命名、生命周期与清理边界"
sections:
  - section_id: transcripts-sources
    surface_ids: [cli]
    source_refs: [ref-junie-quickstart-transcript, ref-junie-config-locations, ref-junie-lt-shim-export-data]
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-junie-quickstart-transcript, ref-junie-lt-history-context, ref-junie-lt-sandbox-transcript, ref-junie-lt-sandbox-channel, ref-junie-lt-hooks-failure-history, ref-junie-lt-hooks-output-discarded, ref-junie-lt-system-prompt-history]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-junie-quickstart-transcript, ref-junie-lt-session-id, ref-junie-env-config, ref-junie-config-locations, ref-junie-env-project, ref-junie-lt-cache-dir, ref-junie-lt-shim-data-layout, ref-junie-lt-shim-export-data, ref-junie-lt-config-temp-project-storage, ref-junie-agents-locations]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-junie-lt-new-session, ref-junie-lt-hooks-session-start, ref-junie-lt-hooks-session-switch, ref-junie-lt-hooks-background-session, ref-junie-lt-quit-session, ref-junie-lt-history-context, ref-junie-lt-resume, ref-junie-lt-session-id, ref-junie-quickstart-transcript]
  - section_id: transcripts-records
    surface_ids: [cli]
    source_refs: [ref-junie-hooks-input, ref-junie-lt-history-context, ref-junie-lt-session-id, ref-junie-quickstart-transcript]
  - section_id: transcripts-archive-cleanup
    surface_ids: [cli]
    source_refs: [ref-junie-lt-remote-session, ref-junie-lt-session-id, ref-junie-lt-prompt-history, ref-junie-lt-new-session, ref-junie-lt-hooks-session-switch, ref-junie-lt-config-temp-project-storage]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-junie-quickstart-transcript, ref-junie-lt-history-context, ref-junie-lt-resume, ref-junie-lt-session-id, ref-junie-hooks-input, ref-junie-lt-shim-log-dir, ref-junie-env-config, ref-junie-lt-cache-dir]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-junie-quickstart-transcript, ref-junie-lt-history-context, ref-junie-lt-sandbox-transcript, ref-junie-lt-hooks-failure-history, ref-junie-lt-hooks-output-discarded, ref-junie-lt-system-prompt-history]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-junie-quickstart-transcript, ref-junie-env-config, ref-junie-lt-cache-dir, ref-junie-lt-shim-data-layout, ref-junie-lt-shim-export-data, ref-junie-lt-config-temp-project-storage]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-junie-quickstart-transcript, ref-junie-lt-session-id]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-junie-quickstart-transcript]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: answered
        source_refs: [ref-junie-lt-new-session, ref-junie-lt-hooks-session-start, ref-junie-lt-hooks-session-switch, ref-junie-lt-hooks-background-session, ref-junie-lt-quit-session, ref-junie-lt-history-context, ref-junie-lt-resume, ref-junie-lt-session-id, ref-junie-quickstart-transcript]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-records
        status: unknown
        source_refs: [ref-junie-hooks-input, ref-junie-lt-history-context, ref-junie-lt-session-id]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-records
        status: unknown
        source_refs: []
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup
        status: unknown
        source_refs: [ref-junie-lt-remote-session, ref-junie-lt-session-id]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup
        status: unknown
        source_refs: [ref-junie-lt-prompt-history, ref-junie-lt-new-session, ref-junie-lt-hooks-session-switch, ref-junie-lt-config-temp-project-storage]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-junie-quickstart-transcript, ref-junie-lt-history-context, ref-junie-lt-resume, ref-junie-lt-session-id, ref-junie-hooks-input, ref-junie-lt-shim-log-dir]
---

## 固定来源与适用范围 {#transcripts-sources}

本章只用五份 Junie 官方文档快照与一个固定源码提交：`junie-cli.html`（抓取于
2026-09-30T16:50:47Z）、`junie-cli-configuration.html`（16:50:47Z）、`environment-variables.html`
（16:50:48Z）、`parameters.html`（16:50:48Z）、`junie-cli-hooks.html`（16:51:22Z），以及
`github.com/JetBrains/junie` 提交 `e75d6eef6bb955495d3b3c72befdb5166147195e` 的
`templates/junie.shim.sh`（2026-10-06T05:10:00Z）。五份文档快照的 `version_applicability` 都是
`unknown`，页面没有标注适用构建号，因此本章是来源级知识，不声称某个具体发行构建的记录形态。

catalog 为 Junie 登记了 `cli` 与 `jetbrains` 两个界面。本轮固定来源全部是终端界面的资料
[@ref-junie-quickstart-transcript][@ref-junie-config-locations]，因此本章只在 `cli` 界面作答；IDE
插件界面的会话记录位置与生命周期由宿主 IDE 支配，本轮没有该界面的固定来源，查询会把它派生为
`not_investigated`。仓库提交在本章里只用于说明受管启动脚本怎样把数据目录环境变量交给二进制
[@ref-junie-lt-shim-export-data]，不用于推断发行包内部的记录实现，也不构成源码到发行包的映射。

## 记录范围与明确不落盘的内容 {#transcripts-scope}

**transcripts.scope**。Junie 把当前会话的完整记录写成可读 transcript：按 `Ctrl+O` 打开的内容
包括当前会话的全部先前提示与 agent 输出[@ref-junie-quickstart-transcript]。`/history` 的 Task
history 说明保存了什么——Junie 为所有已保存会话保存完整会话上下文，其中包含 LLM 用量数据以及
用户提示与 agent 回应的历史[@ref-junie-lt-history-context]。沙箱模式下被拒绝的操作也留在记录里：
被记录的拒绝出现在任务中的提示上方，任务结束后仍在 transcript 中
[@ref-junie-lt-sandbox-transcript]；这条只对开启沙箱的构建成立
[@ref-junie-lt-sandbox-channel]。

明确不落盘的内容有三类。Hook 的标准输出与标准错误只按 debug 级别记入日志，失败时可以出现在 TUI
错误详情里，但不写入 session history[@ref-junie-lt-hooks-failure-history]；`SessionEnd` 的 hook
输出被直接丢弃，`PreToolUse` 的 `additionalContext` 只进入模型上下文
[@ref-junie-lt-hooks-output-discarded]。命令行 `--system-prompt` 的值明确不保存到设置或 session
history[@ref-junie-lt-system-prompt-history]。

这一题的剩余缺口：文档只给出 transcript 面向读者的内容范围，没有说明事件流里是否逐条记录工具
调用及其参数，没有给出关闭记录的开关（`/settings` 的 `Show transcript` 只切换 transcript 的打开
方式），也没有说明 prompt history 与会话 transcript 各自的保留期限。已查入口是本轮归档的全部
20 份官方文档页面与固定仓库提交的全文检索。

## 存储位置、命名与格式 {#transcripts-storage-layout}

**transcripts.location**。官方文档只给出会话目录内部的相对关系：`Ctrl+O` 默认打开一个持续更新的
`transcript.md`，它保存在该会话的 `events.jsonl` 旁边；子代理 transcript 保存在同一会话的
`subagents` 文件夹[@ref-junie-quickstart-transcript]。会话目录本身的绝对路径在这五份文档里没有
出现。能确定的是若干决定"根目录在哪"的变量：

| 变量 | 默认 | 与会话记录位置的关系 |
| --- | --- | --- |
| Junie Home | `~/.junie` | `JUNIE_HOME` 覆盖该默认值[@ref-junie-env-config]；用户级配置、信任标记等状态都在这里[@ref-junie-config-locations]。文档未说明会话记录是否也在其中。 |
| 缓存目录 | 文档未给默认值 | `-c/--cache-dir` 指定存放缓存的自定义路径，用于隔离项目或受限 home 环境[@ref-junie-lt-cache-dir]。文档未说明会话记录是否算缓存。 |
| 受管安装数据目录 | `$HOME/.local/share/junie`（POSIX） | 受管启动脚本用 `JUNIE_DATA` 变量定位 `versions/`、`updates/` 与 `current`[@ref-junie-lt-shim-data-layout]，并在启动二进制前导出它，让应用知道数据存在哪里[@ref-junie-lt-shim-export-data]。 |
| 项目作用域 | 项目根目录、默认当前工作目录 | 项目级配置在项目根的 `.junie/config.json`[@ref-junie-config-locations]；项目目录默认取当前工作目录[@ref-junie-env-project]。未受信任的项目不用仓库内的 `.junie`，改用仓库外的临时项目 Junie 目录，CLI 进程关闭时删除[@ref-junie-lt-config-temp-project-storage]。 |

同一套用户级目录在不同系统上的写法也不同：官方文档对用户级子代理目录给出 `~/.junie/agents/`
（macOS/Linux）与 `%USERPROFILE%\.junie\agents\`（Windows）两种形式
[@ref-junie-agents-locations]。本章的路径模板按 POSIX 写，不据此断言 Windows 上的会话目录位置。

**transcripts.naming**。会话目录内的文件名是固定的：事件流 `events.jsonl`、面向读者的
`transcript.md`、子代理 `subagents` 文件夹[@ref-junie-quickstart-transcript]。会话本身由一个会话
ID 标识，`--session-id` 接受裸 ID 或带 `junie://sessions/` 前缀的会话链接，链接也可以作为位置
参数传入，未提供时 Junie 生成新 ID；文档示例的 ID 形如 `session-251209-172932-1ze8`，即
`session-` 前缀加日期时间再接一段后缀[@ref-junie-lt-session-id]。父子关系只写明一种：子代理
transcript 位于所属会话的 `subagents` 文件夹之下[@ref-junie-quickstart-transcript]。缺口是会话
目录在磁盘上的命名规则（是否直接用会话 ID、是否按项目再分层）、ID 后缀的生成方式与长度约束，
以及是否存在会话分支或分叉——文档都没有说明。

**transcripts.format**。已证实的两种格式：事件流是 JSON Lines（`events.jsonl`），面向读者的是
持续更新的 Markdown（`transcript.md`）[@ref-junie-quickstart-transcript]。"持续更新"表明
`transcript.md` 在会话运行期间被反复重写，而 `events.jsonl` 以事件流形式增长，但文档没有写明
`events.jsonl` 的追加还是覆盖语义。字符编码、分片、压缩与轮转规则在本轮来源中均无记载。

## 会话生命周期与记录延续 {#transcripts-lifecycle}

**transcripts.lifecycle**。新会话在同一交互实例内用 `/new` 启动，已经活跃的会话继续在后台运行并
保留在 Task history 中[@ref-junie-lt-new-session]。Hooks 文档给出同一套生命周期词汇：
`SessionStart` 的 `source` 取 `resume`（同进程内恢复既有会话）、`clear`（同进程内由 `/new` 之类
开启新会话）、`compact`（任务内触发历史压缩时在合成的压缩会话上分发）
[@ref-junie-lt-hooks-session-start]。切换会话不结束原会话：无论是 `/new`、`/history` 选择还是
其它切换，原会话继续在后台运行且切换时不分发它的 `SessionEnd`；只有会话真正终止时才分发
`SessionEnd`（`prompt_input_exit`、`logout`，或批处理的 `other`）
[@ref-junie-lt-hooks-session-switch]。限制一节重复了同一边界并补充：切换时只有进入的会话分发
`SessionStart`（`/new` 为 `clear`，冷加载的已恢复 ID 为 `resume`），已经在同一进程内活跃的会话
被重新前置时不分发任何 hook[@ref-junie-lt-hooks-background-session]。

关闭交互模式用 `/quit`，也可以连按两次 `Ctrl+C`[@ref-junie-lt-quit-session]。恢复有两条路径：
`/history` 打开 Task history，用于搜索会话历史、在活跃会话之间切换，或恢复上一次运行保存的会话
[@ref-junie-lt-history-context]；命令行侧 `--resume` 恢复上一次会话或 `--session-id` 指定的会话
[@ref-junie-lt-resume]，配合会话链接可以从新进程继续同一个任务
[@ref-junie-lt-session-id]。上下文压缩后的延续由 `compact` 这一 `SessionStart` 来源见证，但压缩
会话是合成的，其记录如何与原任务的记录对应没有文档说明。交给子代理时子代理有独立 transcript，
放在所属会话的 `subagents` 文件夹，在查看该任务时 `Ctrl+O` 打开被选中的那个
[@ref-junie-quickstart-transcript]。

## 记录形态与存储依赖 {#transcripts-records}

**transcripts.schema**。官方文档描述了记录"保存什么"，没有公开记录"长什么样"。已知的第一方字段
只出现在 hooks 的 JSON 载荷里：`SessionStart` 载荷带 `hook_event_name`、`session_id`、`cwd`、
`project_path` 与 `source`[@ref-junie-hooks-input]——这证明运行时会持有一个会话 ID、工作目录与
项目路径，但它描述的是 hook 输入，不是 `events.jsonl` 的记录结构。会话层只有一句范围描述
（完整上下文、LLM 用量数据、提示与回应历史）[@ref-junie-lt-history-context] 和会话 ID 的形态
[@ref-junie-lt-session-id]。

已查入口：20 份归档文档页面全文检索 `transcript`、`events.jsonl`、`session`、`Task history`、
`history`、`storage`、`jsonl`、`sqlite`、`database`；固定仓库提交 `e75d6eef6bb9` 全树检索 `session`、
`jsonl`、`transcript`、`history`、`.junie`、`storage`。仍缺的具体 schema 缺口：`events.jsonl` 的事件
类型枚举与字段、必填项与版本迁移规则，`transcript.md` 与 `events.jsonl` 的派生关系，记录里是否
引用附件或大对象，以及脱敏后的最小完整示例。该仓库只含安装脚本、渠道清单与 Hermes 插件，不含
CLI 的会话实现，因此源码侧也拿不到记录结构。本章不给出编造的示例。

**transcripts.database**。本轮固定来源没有出现数据库、索引或辅助表：文档只用 `events.jsonl`
与同目录的 `transcript.md` 描述会话记录[@ref-junie-quickstart-transcript]，源码树里也没有会话
存储的实现。只能记为未知，这不是"不使用数据库"的结论。一起未知的是：恢复一个会话必需哪些文件
（文档只保证 `/history` 能恢复保存过的会话[@ref-junie-lt-history-context]）、能否仅凭
`events.jsonl` 重建 `transcript.md`、删掉其中之一会怎样。

## 归档、备份与清理 {#transcripts-archive-cleanup}

**transcripts.archive**。固定来源没有记载任何原生归档开关，也没有会话导出、复制或移动的官方
入口。离"把会话带走"最近的两条通道都不是归档：`/remote` 把正在运行的会话共享给 Junie 网页应用，
让人换设备在同一任务上继续，这是把活会话交给另一个前端，不产生离线副本
[@ref-junie-lt-remote-session]；`--session-id` 接受带 `junie://sessions/` 前缀的会话链接，链接
中的 ID 可以从新进程恢复会话[@ref-junie-lt-session-id]。因此归档依赖哪些必要文件、恢复后在路径与
机器可移植性上损失什么、控制台导出后能否重建会话，本轮都无从证实，不作断言。

**transcripts.cleanup**。官方文档给出的是保留而不是删除：prompt history 跨所有会话与所有应用运行
保留[@ref-junie-lt-prompt-history]；`/new` 之后旧会话仍在 Task history 中并继续后台运行
[@ref-junie-lt-new-session]；会话只在真正终止时才触发 `SessionEnd`
[@ref-junie-lt-hooks-session-switch]。文档里唯一明确的自动清理发生在未受信任项目：仓库外的临时
项目 Junie 目录在 CLI 进程关闭时被删除，而该句的对象是会话期间新增的 MCP server、skill 与
command，不是会话 transcript[@ref-junie-lt-config-temp-project-storage]。

因此以下问题保持未知，也不能当作"可以安全删除"：手动删除 `events.jsonl` 或 `transcript.md` 的
后果；是否存在会话保留期限或自动清理策略；删除前必须先停止哪些写入者；级联删除与孤儿记录如何
处理。文档中出现的删除操作都指向其它数据——信任标记、`allowlist.json` 里的条目、扩展与 slash
command——不构成对会话记录的删除承诺。

## 定位、读取与排错 {#transcripts-diagnostics}

**transcripts.diagnostics**。读者可见的入口分三类。查看当前会话：`Ctrl+O` 打开持续更新的
`transcript.md`；在 `/settings` 里把 `Show transcript` 改为 `Terminal` 改用内置 Transcript 视图，
`Esc` 返回主视图；查看子代理任务时 `Ctrl+O` 打开该子代理的 transcript
[@ref-junie-quickstart-transcript]。找回会话：`/history` 打开 Task history 搜索、切换与恢复
[@ref-junie-lt-history-context]；命令行用 `--resume`[@ref-junie-lt-resume] 或 `--session-id` 加
会话链接[@ref-junie-lt-session-id]。把一次运行与外部记录对上：hook 的 JSON 载荷带 `session_id`、
`cwd` 与 `project_path`[@ref-junie-hooks-input]，可以用它把 hook 观察关联到具体会话；受管启动
脚本的升级日志固定追加在 Junie Home 下的 `logs/upgrade.log`，默认 `$HOME/.junie/logs`，并与数据
目录分离，重装清掉数据目录不会丢更新历史[@ref-junie-lt-shim-log-dir]。

排错的现实边界：本轮来源没有提供完整性校验工具或检查命令，也没有说明 `events.jsonl` 损坏时 Junie
的表现。定位记录目录时可先用 `JUNIE_HOME`（覆盖 `~/.junie`）[@ref-junie-env-config] 与
`--cache-dir`[@ref-junie-lt-cache-dir] 确认根目录被改到了哪里，再回到会话目录内部找
`events.jsonl`。