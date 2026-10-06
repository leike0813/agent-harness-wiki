---
schema_version: 3
record_kind: production
edition_id: devin-local_transcripts-v1
harness_id: devin
topic: local_transcripts
title: "Devin CLI 的本地 Transcript：会话记录、导出、删除与证据缺口"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-devin-lt-ess-history, ref-devin-lt-cmd-export-flag, ref-devin-lt-cmd-btw, ref-devin-lt-index-vs, ref-devin-lt-cmd-resume-cloud-flags, ref-devin-lt-cmd-archive]
  - section_id: transcripts-storage
    surface_ids: [cli]
    source_refs: [ref-devin-lt-cmd-resume-cloud-flags, ref-devin-lt-cmd-list, ref-devin-lt-cmd-session-mgmt, ref-devin-lt-ess-history, ref-devin-lt-cmd-export-flag, ref-devin-lt-adapt-configpath, ref-devin-lt-cmd-buildlogs]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-devin-lt-ess-resume-ls, ref-devin-lt-cmd-resume-cloud-flags, ref-devin-lt-cmd-export-flag, ref-devin-lt-cmd-session-mgmt, ref-devin-lt-cmd-context-usage, ref-devin-lt-cmd-stats, ref-devin-lt-cmd-handoff, ref-devin-lt-cmd-pickup]
  - section_id: transcripts-archive-cleanup
    surface_ids: [cli]
    source_refs: [ref-devin-lt-cmd-archive, ref-devin-lt-cmd-export-info, ref-devin-lt-cmd-rm-session, ref-devin-lt-cmd-uninstall]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-devin-lt-cmd-list, ref-devin-lt-cmd-doctor, ref-devin-lt-cmd-session-mgmt, ref-devin-lt-cmd-export-info, ref-devin-lt-cmd-stats]
  - section_id: transcripts-gaps
    surface_ids: [cli]
    source_refs: []
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-devin-lt-ess-history, ref-devin-lt-cmd-export-flag, ref-devin-lt-cmd-btw, ref-devin-lt-index-vs]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage
        status: unknown
        source_refs: [ref-devin-lt-adapt-configpath, ref-devin-lt-cmd-buildlogs]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage
        status: partial
        source_refs: [ref-devin-lt-cmd-resume-cloud-flags, ref-devin-lt-ess-history, ref-devin-lt-cmd-list, ref-devin-lt-cmd-session-mgmt]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage
        status: partial
        source_refs: [ref-devin-lt-cmd-export-flag]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-devin-lt-cmd-session-mgmt, ref-devin-lt-cmd-stats, ref-devin-lt-cmd-context-usage]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-devin-lt-ess-resume-ls, ref-devin-lt-cmd-resume-cloud-flags, ref-devin-lt-cmd-export-flag, ref-devin-lt-cmd-session-mgmt, ref-devin-lt-cmd-context-usage, ref-devin-lt-cmd-stats, ref-devin-lt-cmd-handoff, ref-devin-lt-cmd-pickup]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage
        status: unknown
        source_refs: [ref-devin-lt-cmd-buildlogs, ref-devin-lt-adapt-configpath, ref-devin-lt-cmd-list]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup
        status: partial
        source_refs: [ref-devin-lt-cmd-archive, ref-devin-lt-cmd-export-info]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-cleanup
        status: partial
        source_refs: [ref-devin-lt-cmd-rm-session, ref-devin-lt-cmd-uninstall]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-devin-lt-cmd-list, ref-devin-lt-cmd-doctor, ref-devin-lt-cmd-session-mgmt, ref-devin-lt-cmd-export-info]
---

## 固定来源与本轮检索边界 {#transcripts-scope}

本章只覆盖 `cli` 界面（Devin CLI）。catalog 还声明了 `desktop`（Devin Desktop），本轮没有任何桌面端原件可查，因此不写答案。

`devin` 没有登记 git 仓库来源，全部证据来自 `docs.devin.ai` 的官方文档快照，抓取时间 2026-10-06：

| snapshot_id | 文档 | 抓取时间 |
| - | - | - |
| `snapshot-devin-lt-commands-725f8023d1dd` | `/cli/reference/commands.md` | 2026-10-06T04:33:38.105Z |
| `snapshot-devin-lt-essential-c303b3470eaf` | `/cli/essential-commands.md` | 2026-10-06T04:33:40.113Z |
| `snapshot-devin-lt-index-9db0bdeb8aba` | `/cli/index.md` | 2026-10-06T04:33:41.453Z |
| `snapshot-devin-lt-adaptive-527c75165212` | `/cli/adaptive.md` | 2026-10-06T04:33:38.101Z |

四个 snapshot 的 `version_applicability` 都是 `unknown`：文档页不标注软件版本，本章的结论不能绑定到任何已发布的 CLI 版本（npm 上观察到的 `3000.6.11` 属于另一条证据链，本章不用它推断行为）。这四页是本轮 `archive/devin/` 实际留存的原件；产品登记的其余文档页（troubleshooting、cloud、handoff、subagents 等）本轮没有保留原件，不在检索范围内，缺口按此计入。

检索前先划清边界。Devin CLI 是跑在用户终端里的本地编码代理，Devin 本身是跑在云端虚拟机里的 AI 工程师，两者被官方明确写成两套互不相同的工具 [@ref-devin-lt-index-vs]。云端会话由 `devin-abc123…` 形式的 ID 或会话 URL 标识 [@ref-devin-lt-cmd-resume-cloud-flags]，并有 `/archive` 这样的服务端归档操作 [@ref-devin-lt-cmd-archive]。本主题问的是本机的会话记录；云端那部分只在本地与云端互相交接的地方出现。

**transcripts.scope（partial）**：本机会话历史确实被保存并可恢复，官方表述是"对话历史被保存，以便之后恢复会话"，并给出 `devin -c` 恢复当前目录最近会话、`devin -r SESSION_ID` 按 ID 恢复 [@ref-devin-lt-ess-history]。被明确记录的粒度是"对话"本身：可导出的是 conversation，每一轮之后写一次 [@ref-devin-lt-cmd-export-flag]；能明确排除的一项是 `/btw` 旁路问答，它复用当前上下文但**不进主对话** [@ref-devin-lt-cmd-btw]。

已查入口与剩余缺口：四页原里没有任何一处列出记录的内容全集——工具调用事件、后台 shell 的输出与 shell ID、调试日志、缓存是否落盘均无来源；也没有任何关闭或裁剪记录行为的开关（`--export` 是导出开关，不是记录开关）。需要区分"文档没说"和"不记录"：这里只能记为未记载。

## 存储位置、会话标识与导出格式 {#transcripts-storage}

**transcripts.location（unknown）**：本轮四页原里唯一给出的本机路径是配置文件 `~/.config/devin/config.json`（Windows `%APPDATA%\devin\config.json`）[@ref-devin-lt-adapt-configpath]，那是模型默认值的配置入口，不是会话记录。会话记录本身的目录、文件、索引或数据库路径，四页都没有提到；官方按目录来过滤会话（`devin list` 只列当前目录）而不是按路径 [@ref-devin-lt-cmd-list]。唯一出现 NDJSON 的地方是云端构建日志流 `devin cloud drs build-logs`，属于云端侧产物，与本机会话记录无关 [@ref-devin-lt-cmd-buildlogs]。

**transcripts.database（unknown）**：没有任何来源说明会话记录是文件还是数据库，也没有索引、辅助状态或迁移机制的描述。因此"没有找到数据库"不能写成"没有数据库"，只能记为未知。

**transcripts.naming（partial）**：会话由 ID 标识，`--resume SESSION_ID` 按 ID 恢复，配 `--cloud` 时同一个参数还接受云端会话 ID 或 URL [@ref-devin-lt-cmd-resume-cloud-flags]；文档示例里的 ID 形如 `brisk-otter`，是两个短词加连字符的可读串，而不是 UUID [@ref-devin-lt-ess-history]。归属关系上，记录按"当前目录"分组：`devin list` 默认只列当前目录的会话 [@ref-devin-lt-cmd-list]，会话内 `/ls` 也只列当前目录，`/ls --all` 才跨目录 [@ref-devin-lt-cmd-session-mgmt]。

缺口：磁盘上的目录与文件命名、会话 ID 与时间戳及项目路径的编码方式、父会话与分支在磁盘上的关联表达，四页都没有来源；可确认的只有"ID + 目录归属"这一层。

**transcripts.format（partial）**：唯一被官方命名的记录格式是 ATIF。`--export [PATH]` 在每一轮之后把对话导出成文件，不给路径时用默认路径 [@ref-devin-lt-cmd-export-flag]。ATIF 的字段结构在四页原里没有定义，追加/覆盖、分片、压缩、编码规则同样没有来源。`devin list --format json|csv` 是列表的输出格式，不是记录格式，不要混用 [@ref-devin-lt-cmd-list]。

## 会话记录的生命周期 {#transcripts-lifecycle}

**transcripts.lifecycle（partial）**：文档能直接读出的顺序是——会话可按最近一次或按 ID 恢复；恢复有三条入口，命令行 `--continue` / `--resume SESSION_ID` [@ref-devin-lt-cmd-resume-cloud-flags] 和会话内 `/continue`、`/resume SESSION_ID`、`/ls`、`/ls --all` [@ref-devin-lt-ess-resume-ls]。每一轮之后是唯一被写明的写入时机，也就是 `--export` 的导出点 [@ref-devin-lt-cmd-export-flag]。`/clear`（别名 `/new`）清空对话历史并开始一个新会话 [@ref-devin-lt-cmd-session-mgmt]，它是"清历史"，不是"删记录文件"。

分支与回退都发生在步骤粒度上：`/steps` 列出对话步骤，`/fork [step]` 从某个步骤分叉出新会话，`/revert STEP` 从该步起回退文件改动并把对话倒回该步之前 [@ref-devin-lt-cmd-session-mgmt]。压缩由 `/compact` 强制触发；同组的 `/context` 与 `/usage` 是只读的上下文窗口与额度视图 [@ref-devin-lt-cmd-context-usage]。跨打开的延续有一条明确证据：`/session-stats` 的累计值在恢复后保留，恢复的会话报告累计用量而不是从头开始 [@ref-devin-lt-cmd-stats]——说明会话元数据随记录一起被保留，而不只是消息正文。

本地与云端之间的延续走 `/handoff`：本地会话把任务交给云端会话继续 [@ref-devin-lt-cmd-handoff]。反方向的动作写在云端会话那一侧，`/pickup` 检出该会话的 PR 分支并回到本地继续 [@ref-devin-lt-cmd-pickup]。这条路径同时也是边界提醒：跨过去的任务不再只是本机记录。

缺口：记录的创建时刻、每轮的刷盘时机、退出时的落盘与关闭语义、交给子代理或 ACP 宿主会话时记录如何归属、压缩后记录内容如何续写，四页都没有来源。

**transcripts.schema（partial）**：可见的结构只有"会话 → 有序步骤"这一层，体现在 `/steps`、`/fork [step]`、`/revert STEP` 的按步骤寻址 [@ref-devin-lt-cmd-session-mgmt]。会话上可读的字段面是标题（`/title`、`/rename-session`）[@ref-devin-lt-cmd-session-mgmt]、上下文占用（`/context`）与额度（`/usage`）[@ref-devin-lt-cmd-context-usage]，以及统计（`/session-stats`）；统计维度由服务端上报，CLI 用服务端自己的标签渲染，所以新维度无需升级 CLI 就会出现 [@ref-devin-lt-cmd-stats]。

缺口照实列出：没有第一方记录类型清单、字段与类型、必填项、消息与工具调用的字段结构、必填项之间的关系，也没有版本迁移规则；无法给出脱敏的最小完整记录示例——因为来源没有定义记录格式。

## 归档、导出与删除 {#transcripts-archive-cleanup}

**transcripts.archive（partial）**：文档里的 `/archive` 只出现在 Cloud Sessions 一节，归档对象是**云端会话**，不是本机会话记录 [@ref-devin-lt-cmd-archive]。本地侧与之对应的能力是导出：会话内 `/export` 只显示导出信息，真正启用要靠启动时的 `--export` 标志 [@ref-devin-lt-cmd-export-info]，也就是说导出是启动时决定的行为，会话中途不能打开。

导出与原生归档的区别在这里很实际：归档是服务端状态操作，导出是本地逐轮写文件。四页原里没有把导出文件再导回 CLI 的入口，导出一侧是单向的；恢复后的路径可移植性与信息完整性损失也没有来源可答。

**transcripts.cleanup（partial）**：官方的删除入口有两个。`/rm-session SESSION_ID` 不可逆地删除一个会话及其全部数据 [@ref-devin-lt-cmd-rm-session]；`devin uninstall --clean` 删除包括配置、历史与自定义数据在内的全部数据 [@ref-devin-lt-cmd-uninstall]——这是官方唯一一处把 history 与 configuration 并列称为"数据"的地方，说明会话记录属于本机数据，但仍然没有给出它的路径或形态。

手动删除文件或数据库会怎样：没有来源。文档从未描述记录的文件形态，因此不能推断"删掉某个文件是安全的"，也不能推断删掉后 CLI 会重建还是报错。删除前需要停止哪些写入者、级联删除范围、孤儿记录、备份恢复同样没有来源。补一句操作上的谨慎：文档没有说明运行中的会话是否独占记录文件，所以在 `/rm-session` 之外做文件级操作前先退出全部会话更稳妥——这是操作建议，不是来源声明。

## 定位记录与排错入口 {#transcripts-diagnostics}

**transcripts.diagnostics（partial）**：能用的读入口都是官方 CLI 命令，不是文件读取。跨会话看有哪些记录，用 `devin list`（别名 `devin ls`）：默认交互式选择器，`--format json` / `--format csv` 给出机器可读输出，作用域是当前目录 [@ref-devin-lt-cmd-list]。会话内按步骤查记录结构用 `/steps`，`/ls` 与 `/ls --all` 区分当前目录与全部目录 [@ref-devin-lt-cmd-session-mgmt]；想确认导出状态用 `/export` 显示导出信息 [@ref-devin-lt-cmd-export-info]；用量层面的核对用 `/session-stats` 与 `/usage` [@ref-devin-lt-cmd-stats]。

`devin doctor` / `devin doctor --json` 是产品自带的本地诊断命令，但它报告的是本地配置：加载了哪些子代理 profile、哪些 `AGENT.md` frontmatter 解析失败、哪些键被忽略，检查失败时退出码非零 [@ref-devin-lt-cmd-doctor]。它没有任何会话记录文件相关的检查项。

因此排错现实可行的顺序是：先 `devin list --format json` 确认记录是否还在、按什么 ID 和目录归属，再在会话内用 `/steps` 和 `/session-stats` 确认记录自身状态。缺口：没有记录完整性校验、修复或重建命令，也没有"记录文件在哪里"的官方答案可供人工核对——这一题与 `transcripts.location` 共享同一个空白。

## 已查入口与剩余缺口小结 {#transcripts-gaps}

- **已查**：`/cli/reference/commands.md`、`/cli/essential-commands.md`、`/cli/index.md`、`/cli/adaptive.md` 四份本轮留存原件中的全局标志表、`devin list`、`devin uninstall`、`devin doctor`、`devin cloud drs`、Slash Commands 的 Session Management / Automation / Utilities / Session statistics / Cloud Sessions 各节，以及 Session History 一节。
- **未查（原件未留存）**：`/cli/troubleshooting.md`、`/cli/cloud.md`、`/cli/handoff.md`、`/cli/subagents.md` 等已登记来源。它们最可能补上存储路径与压缩行为，值得在原件保留补齐后重新调查。
- **需要的新证据**：官方对会话记录落盘位置、格式与字段的正面说明；或一个带固定 commit 的官方源码来源（本产品当前没有登记 git 仓库来源）。