---
schema_version: 3
record_kind: production
edition_id: rovodev-local_transcripts-v1
harness_id: rovodev
topic: local_transcripts
title: "Rovo Dev CLI 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-rovodev-lt-config-sessions, ref-rovodev-lt-commands-clear, ref-rovodev-lt-config-logging]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-rovodev-lt-config-sessions, ref-rovodev-lt-config-file, ref-rovodev-lt-config-newfile, ref-rovodev-lt-config-logging]
  - section_id: transcripts-session-identity
    surface_ids: [cli]
    source_refs: [ref-rovodev-lt-commands-restore, ref-rovodev-lt-commands-sessions, ref-rovodev-lt-config-console-title, ref-rovodev-lt-config-sessions]
  - section_id: transcripts-record-format
    surface_ids: [cli]
    source_refs: [ref-rovodev-lt-config-sessions, ref-rovodev-lt-config-file]
  - section_id: transcripts-export-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-rovodev-lt-commands-copy, ref-rovodev-lt-commands-clear]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-lt-help-interactive, ref-rovodev-lt-commands-status, ref-rovodev-lt-commands-restore, ref-rovodev-lt-config-console-title, ref-rovodev-lt-config-logging, ref-rovodev-lt-config-sessions]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-rovodev-lt-config-sessions, ref-rovodev-lt-commands-clear, ref-rovodev-lt-config-logging]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-rovodev-lt-config-sessions, ref-rovodev-lt-config-file, ref-rovodev-lt-config-newfile, ref-rovodev-lt-config-logging]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-session-identity
        status: partial
        source_refs: [ref-rovodev-lt-commands-restore, ref-rovodev-lt-commands-sessions, ref-rovodev-lt-config-console-title, ref-rovodev-lt-config-sessions]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: unknown
        source_refs: []
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: unknown
        source_refs: []
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-session-identity
        status: partial
        source_refs: [ref-rovodev-lt-commands-restore, ref-rovodev-lt-commands-sessions, ref-rovodev-lt-config-sessions]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: []
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-and-cleanup
        status: partial
        source_refs: [ref-rovodev-lt-commands-copy]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-and-cleanup
        status: partial
        source_refs: [ref-rovodev-lt-commands-clear]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-rovodev-lt-help-interactive, ref-rovodev-lt-commands-status, ref-rovodev-lt-commands-restore, ref-rovodev-lt-config-console-title, ref-rovodev-lt-config-logging, ref-rovodev-lt-config-sessions]
---

固定来源范围：本章只依据 Atlassian 官方支持文档的三份固定快照，全部为 `surface_id: cli`（catalog 中 `rovodev` 仅登记 CLI 一个界面）：

| 快照 | 文档 | 抓取时间 | version_applicability |
| --- | --- | --- | --- |
| `snapshot-rovodev-lt-docs-settings` | Manage Rovo Dev CLI settings | 2026-10-06 | unknown |
| `snapshot-rovodev-lt-docs-commands` | Rovo Dev CLI commands | 2026-10-06 | unknown |
| `snapshot-rovodev-lt-docs-help` | Get help in Rovo Dev CLI | 2026-10-06 | unknown |

三份文档都不标注适用的软件版本，`version_applicability: unknown`；因此本章结论是来源级知识，不能绑定到某个已安装版本，也不能因为某台机器上观察到的行为就断言其它安装也如此。Rovo Dev CLI 是闭源产品，本轮没有登记 git 源码来源，全部证据来自已归档的官方文档原件。

关于引用形态需要先说明一句：这三份来源的 retained original 以 JSON 转义形式保存页面正文（正文落在 JSON-LD 的 `articleBody` 字符串里），因此路径与引号在原件中呈现为 `~\/.rovodev\/sessions`、`\"` 的转义写法，相邻段落也被压成连续文本。本章的 `excerpt` 按原件逐字转义形态呈现，这是原件的保存形态，不是改写了引用内容；阅读时去掉转义斜杠即是页面上的原文。

阅读前需要先分清三件不同的事。本章的目标是**本机会话记录**；官方文档另有服务端/云端的对话与使用数据治理页面，但那份材料不在本产品已登记来源内，本章不对云端保存、保留或删除做任何断言；`acli rovodev run --web` 只是同一 CLI 的 web UI 启动形态，已归档文档没有说明该形态下的会话记录落在哪里，本章不把终端形态的结论外推过去。

最大的已知缺口：这三份文档都把更细的会话说明链接到另一页 **Manage sessions in Rovo Dev CLI**（`https://support.atlassian.com/rovo/docs/manage-sessions-in-rovo-dev-cli/`），该页不在本产品已登记来源、也未归档。下文凡标为 `unknown` 的题目，几乎都是等这一页补齐后才能升为 `answered`。

## 记录内容与开关 {#transcripts-scope}

官方对会话记录范围的直接陈述只有一句：配置项 `sessions.persistenceDir` 的注释是 "Directory where session data is stored"，即会话数据存放于用户目录下的会话目录。[@ref-rovodev-lt-config-sessions]

记录里到底包含什么，已归档文档只能从命令语义反推，而不能当作完整字段清单：

- `/clear` 的说明是 "Clear the current session's message history (cannot be undone)" —— 会话记录包含消息历史。[@ref-rovodev-lt-commands-clear]
- `/prune` 的说明是 "Reduce token size while retaining context (removes tool results)" —— 工具结果（tool results）也是会话记录的一部分，并且可以被单独剥离。[@ref-rovodev-lt-commands-clear]

开关方面，文档没有为会话记录提供「不落盘」或「关闭记录」的总开关，也没有说明哪些内容明确不会写入磁盘。与会话记录相关的可配置项只有三类：

| 配置项 | 默认值 | 与会话记录的关系 |
| --- | --- | --- |
| `sessions.persistenceDir` | `~/.rovodev/sessions` | 会话数据目录，注释见上 |
| `sessions.enableWorkspaceStateSync` | `false` | 实验性；启用后在恢复或切换会话时可能提示把工作区 git 状态切到 session checkpoint |
| `logging.enablePromptCollection` | `false` | 调试用的 prompt 收集，文档标注 internal users only；与日志文件同属 `logging` 段 |

`logging` 段的默认日志路径是 `~/.rovodev/logs/rovodev.log`，与 `enablePromptCollection` 同处一个配置块。[@ref-rovodev-lt-config-logging] 日志不是会话记录本身；本章只把它当作排错入口，在 [定位与排错](#transcripts-diagnostics) 一节使用。

剩余缺口：已查入口为《Manage Rovo Dev CLI settings》的完整配置表（Sessions、Logging、Console 等段）、《Rovo Dev CLI commands》的 Interactive mode 段与《Get help in Rovo Dev CLI》。这些入口都没有枚举会话记录的完整内容集合，也没有给出输入历史、调试日志、缓存各自的落盘规则。

## 会话数据的位置与相邻存储 {#transcripts-storage-layout}

会话数据的位置由一个配置项决定，位于主配置文件里：

```yaml
# ~/.rovodev/config.yml
sessions:
  # Directory where session data is stored
  persistenceDir: "~/.rovodev/sessions"
```

主配置文件默认位于 `~/.rovodev/config.yml`，用 `acli rovodev config` 在默认编辑器中打开。[@ref-rovodev-lt-config-file] 上面 `persistenceDir` 的官方注释只有 "Directory where session data is stored"，即官方只承诺到这一层目录。[@ref-rovodev-lt-config-sessions] 该注释在原件中写作 `persistenceDir: \"~\/.rovodev\/sessions\"`，是页首说明的 JSON 转义形态。 会话目录里的**文件级布局**——文件名、扩展名、索引、附件——已归档文档没有给出。

路径的变化方式只有一条已文档化的路径：换配置文件。`acli rovodev run --config-file <位置>` 会在指定位置创建并使用新的配置文件（文件不存在时创建）。[@ref-rovodev-lt-config-newfile] 因此 `persistenceDir` 是跟着配置文件走的：改用另一份配置文件，就会读另一份 `sessions.persistenceDir`。文档没有说明 `persistenceDir` 是否相对于配置文件解析，也没有给出任何环境变量形式的覆盖入口。

同一 `~/.rovodev` 树下还有几个位置容易被误认成会话记录，需要明确区分：

| 位置 | 配置项 | 是什么 |
| --- | --- | --- |
| `~/.rovodev/sessions` | `sessions.persistenceDir` | 会话数据目录，本章目标 |
| `~/.rovodev/logs/rovodev.log` | `logging.path` | 日志文件，非会话记录；路径由 `logging.path` 配置，默认值见该配置项注释 [@ref-rovodev-lt-config-logging] |
| `~/.rovodev/mcp_config.json` | `mcp.mcpConfigPath` | MCP 配置，非会话记录 |
| `~/.rovodev/atlassian_local_overrides` | `atlassianConnections.localOverridePath` | Atlassian 本地覆盖，非会话记录 |

操作系统差异方面，这三份文档只在 `toolPermissions.bash.runInSandbox` 一处标注了 macOS 限定，对会话目录路径没有任何平台差异说明。安装文档覆盖 macOS、Linux、Windows 三种终端，但那是 ACLI 的安装步骤，没有给出会话目录的平台差异。因此 Linux 上的路径观察不能外推为 Windows 或 macOS 结论。

数据库问题（`transcripts.database`）的状态是 `unknown`：已归档的三份文档没有任何关于数据库文件、索引表或辅助状态存储的表述，也没有说明会话正文是否落在数据库里。这里不做「不使用数据库」的推断——缺少证据只意味着未知。

## 会话标识、标题与恢复 {#transcripts-session-identity}

会话的对外标识有两层，文档都能证实：

- **会话 ID**：`acli rovodev run --restore [session ID]` 接受一个会话 ID；不带值时恢复「当前工作区最近的一个会话」（restore the last session from the current workspace / restore the most recent session）。[@ref-rovodev-lt-commands-restore]
- **会话标题**：`/new` 可带可选标题，`/sessions new [title]` 用自定义标题创建，`/sessions rename [title]` 重命名当前会话，`/sessions rename [current_title] [new_title]` 重命名指定会话。终端标题模板里的 `{session}` 变量取的就是 session title，可用来在多标签终端里确认当前会话身份。[@ref-rovodev-lt-commands-sessions][@ref-rovodev-lt-config-console-title]

会话之间的关系只有「派生」一种被文档记载：`/sessions fork` 从当前会话派生，默认标题，`/sessions fork [title]` 可指定标题。[@ref-rovodev-lt-commands-sessions] 文档没有描述父子会话在磁盘上的关联表达。

作用域以工作区为单位：`--restore` 明确说恢复的是「当前工作区」的会话。[@ref-rovodev-lt-commands-restore] 同页还记载 `acli rovodev run --worktree [name]` 会在 Git worktree 中运行（不指定名字时自动生成带时间戳的名字），但文档没有说明 worktree 与会话作用域之间是什么关系——这是 `transcripts.naming` 保持 `partial` 的原因之一。

生命周期上，文档可证实的环节是：创建（`/new`、`/sessions new`）、派生（`/sessions fork`）、重命名、恢复（`--restore`，含按 ID 与取最近两种）、以及与工作区状态对齐。`enableWorkspaceStateSync` 是其中唯一的恢复期副作用开关：启用后，Rovo Dev 可能发出提示并提供切换，把工作区 git 状态（branch/commit）切到该会话的 checkpoint，作用时点是「恢复或切换会话时」。[@ref-rovodev-lt-config-sessions]

剩余缺口：记录何时追加到磁盘、退出时是否落盘、上下文压缩后如何延续、把会话交给子代理时的处理，这四件事在已归档文档中都没有描述，`transcripts.lifecycle` 因此记为 `partial` 而不是 `answered`。

## 记录格式与 schema 缺口 {#transcripts-record-format}

`transcripts.format` 与 `transcripts.schema` 两题的结论都是 `unknown`，原因相同：已归档文档对会话数据只给到目录级的描述——`persistenceDir` 是「会话数据存放的目录」。[@ref-rovodev-lt-config-sessions] 目录里放的是 JSON、JSONL、数据库还是二进制文件，编码、追加还是覆盖、是否分片压缩，全部没有记载。

已查入口，逐项确认无对应表述：

- 《Manage Rovo Dev CLI settings》全配置表：只有 `persistenceDir` 一句目录注释，没有任何文件格式、命名或迁移字段。[@ref-rovodev-lt-config-file]
- 《Rovo Dev CLI commands》全部命令条目：命令面向会话操作（新建、派生、重命名、恢复、清空、裁剪），没有面向文件或数据库的操作入口。
- 《Get help in Rovo Dev CLI》：只说明 `/help` 与「命令名 help」子命令的用法。

因此本章不给出任何记录 schema 示例，也不归纳跨产品的通用记录 schema。相应地，有两件事不能从「文档没写」推出：不能说这些文件可以被任意读取或解析，也不能说它们可以被安全删除。

## 导出、清理与会话内容的削减 {#transcripts-export-and-cleanup}

官方文档里没有原生归档开关，也没有把会话导出为文件的命令。唯一被记载的「把会话内容取出来」的入口是 `/copy conversation [limit]`，作用是把对话历史复制到剪贴板；它是剪贴板内容，不是归档文件，文档没有给出导出格式、文件路径或体积上限语义。[@ref-rovodev-lt-commands-copy]

清理侧的官方机制只有两条，都作用于当前会话而非磁盘上的会话文件：

| 入口 | 官方说明 | 可逆性 |
| --- | --- | --- |
| `/clear` | Clear the current session's message history (cannot be undone) | 文档明确不可撤销 |
| `/prune` | Reduce token size while retaining context (removes tool results) | 移除工具结果、保留上下文 |

[@ref-rovodev-lt-commands-clear]

需要写明的边界：

- 文档没有提供删除某个会话、删除全部会话、保留期、配额或级联删除的任何入口。
- 手动删除 `sessions.persistenceDir` 下的文件或子目录会怎样，文档没有说明。**缺少删除文档不等于可以安全删除**；在目录布局、记录格式和会话间关联都未文档化（见上一节）的前提下，无法判断删掉的是正文、索引还是仍被其它会话引用的部分。
- 若确实要动这个目录，先停止写入者：至少结束正在运行的 `acli rovodev run` 与 `acli rovodev serve`（后者是文档记载的 server 模式启动命令）。这一点是操作建议，不是官方文档给出的删除前置条件声明。

`transcripts.archive` 记为 `partial`：剪贴板复制可证实，归档开关与文件级备份/恢复/迁移不可证实；恢复后在路径可移植性与信息完整性上的损失因此无法评估。

## 定位、读取与排错 {#transcripts-diagnostics}

可用的观察入口如下，全部来自已归档文档：

| 入口 | 能看到什么 | 来源定位 |
| --- | --- | --- |
| `/help`、「命令名 help」（例如 `/sessions help`） | 命令清单与单个命令的详细说明 | Get help in Rovo Dev CLI，Interactive mode |
| `/status` | CLI 状态、版本、账户信息与当前模型 | Rovo Dev CLI commands，System |
| `acli rovodev 任一命令 --help` | 命令行层的 flags 与子命令 | Get help in Rovo Dev CLI，Command line |
| `acli rovodev run --restore`（不带 session ID） | 当前工作区是否还有可恢复的最近会话 | Rovo Dev CLI commands，Run Rovo Dev CLI |
| `console.terminalTitle` 的 `{session}` | 当前会话标题 | Manage Rovo Dev CLI settings，Console |
| `logging.path`（默认 `~/.rovodev/logs/rovodev.log`） | 运行日志 | Manage Rovo Dev CLI settings，Logging |
| `sessions.persistenceDir`（默认 `~/.rovodev/sessions`） | 会话数据目录本身 | Manage Rovo Dev CLI settings，Sessions |

[@ref-rovodev-lt-help-interactive][@ref-rovodev-lt-commands-status][@ref-rovodev-lt-commands-restore][@ref-rovodev-lt-config-console-title][@ref-rovodev-lt-config-logging][@ref-rovodev-lt-config-sessions]

这些入口能回答「会话目录在哪」「当前会话是谁」「日志在哪」「这个工作区还有没有可恢复的会话」，但没有一条能回答「记录文件是否完整」。文档没有提供校验、修复或重建命令，所以为备份与恢复排错时，可用的只是上面这些观察点加上目录本身的文件列表；一旦需要判断某份记录能否跨机器复用，必须先补上 format 与 schema 两题的证据。

跨主题引用：会话目录、日志路径与配置文件位置属于配置机制，参见 `config.sources`、`config.defaults` 与 `config.runtime`（`--config-file` 的作用时点），生效值排查参见 `config.diagnostics`；`mcp_config.json` 的作用域与字段属于 MCP 主题的 `mcp.entry`。