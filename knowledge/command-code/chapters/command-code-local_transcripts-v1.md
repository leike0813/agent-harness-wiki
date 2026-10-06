---
schema_version: 3
record_kind: production
edition_id: command-code-local_transcripts-v1
harness_id: command-code
topic: local_transcripts
title: "Command Code CLI 的本地 Transcript：落盘范围、存储布局、记录生命周期与清理缺口"
sections:
  - section_id: transcripts-scope-and-switches
    surface_ids: [cli]
    source_refs: [ref-cc-lt-conversation-history-local, ref-cc-lt-checkpoints-local-persession, ref-cc-lt-cli-nosession-name, ref-cc-lt-headless-persists-transcript, ref-cc-lt-mods-session-store, ref-cc-lt-mods-nosession-in-memory]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-cc-lt-conversation-history-local, ref-cc-lt-slash-session-file-export, ref-cc-lt-cli-session-flags, ref-cc-lt-settings-scratchpad-env, ref-cc-lt-context-scratchpad-manifest, ref-cc-lt-mods-session-store, ref-cc-lt-context-append-only-log, ref-cc-lt-hooks-transcript-path]
  - section_id: transcripts-format-and-schema
    surface_ids: [cli]
    source_refs: [ref-cc-lt-hooks-transcript-path, ref-cc-lt-cli-session-flags, ref-cc-lt-context-append-only-log, ref-cc-lt-mods-session-store]
  - section_id: transcripts-lifecycle-and-branching
    surface_ids: [cli]
    source_refs: [ref-cc-lt-context-append-only-log, ref-cc-lt-slash-session-commands, ref-cc-lt-slash-session-file-export, ref-cc-lt-cli-session-flags, ref-cc-lt-cli-nosession-name, ref-cc-lt-headless-persists-transcript, ref-cc-lt-mods-nosession-in-memory]
  - section_id: transcripts-export-share-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-cc-lt-slash-session-file-export, ref-cc-lt-settings-export-formats, ref-cc-lt-checkpoints-local-persession, ref-cc-lt-slash-session-commands, ref-cc-lt-conversation-history-local]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-lt-slash-session-file-export, ref-cc-lt-cli-session-flags, ref-cc-lt-headless-session-id-stderr, ref-cc-lt-slash-session-commands, ref-cc-lt-hooks-transcript-path]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope-and-switches
        status: answered
        source_refs: [ref-cc-lt-conversation-history-local, ref-cc-lt-checkpoints-local-persession, ref-cc-lt-cli-nosession-name, ref-cc-lt-headless-persists-transcript, ref-cc-lt-mods-session-store, ref-cc-lt-mods-nosession-in-memory]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-cc-lt-conversation-history-local, ref-cc-lt-slash-session-file-export, ref-cc-lt-cli-session-flags, ref-cc-lt-settings-scratchpad-env, ref-cc-lt-context-scratchpad-manifest]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-cc-lt-cli-session-flags, ref-cc-lt-slash-session-file-export, ref-cc-lt-mods-session-store]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: partial
        source_refs: [ref-cc-lt-hooks-transcript-path, ref-cc-lt-cli-session-flags, ref-cc-lt-context-append-only-log]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: partial
        source_refs: [ref-cc-lt-mods-session-store, ref-cc-lt-hooks-transcript-path, ref-cc-lt-context-append-only-log]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle-and-branching
        status: partial
        source_refs: [ref-cc-lt-context-append-only-log, ref-cc-lt-slash-session-commands, ref-cc-lt-cli-session-flags, ref-cc-lt-headless-persists-transcript, ref-cc-lt-mods-nosession-in-memory]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-cc-lt-mods-session-store, ref-cc-lt-context-append-only-log, ref-cc-lt-hooks-transcript-path]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-share-and-cleanup
        status: partial
        source_refs: [ref-cc-lt-slash-session-file-export, ref-cc-lt-settings-export-formats, ref-cc-lt-checkpoints-local-persession]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-export-share-and-cleanup
        status: unknown
        source_refs: [ref-cc-lt-slash-session-commands, ref-cc-lt-slash-session-file-export, ref-cc-lt-conversation-history-local]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-cc-lt-slash-session-file-export, ref-cc-lt-cli-session-flags, ref-cc-lt-headless-session-id-stderr, ref-cc-lt-slash-session-commands, ref-cc-lt-hooks-transcript-path]
---

Command Code CLI 的本地会话记录由一个 harness 层维护的 tree-format 会话存储承载，官方文档在 hook 接口处把它称作 transcript。安全文档把「Conversation history」标为 Local only，位置在 `~/.commandcode/projects/` [@ref-cc-lt-conversation-history-local]。

本节全部结论只来自本轮已归档的官方文档原件，快照为 `snapshot-cc-lt-docs-resource-security`、`snapshot-cc-lt-docs-reference-cli`、`snapshot-cc-lt-docs-context`、`snapshot-cc-lt-docs-reference-slash-commands`、`snapshot-cc-lt-docs-headless`、`snapshot-cc-lt-docs-hooks`、`snapshot-cc-lt-docs-mods`、`snapshot-cc-lt-docs-settings`，抓取时间均为 2026-10-06 04:33 UTC。这批文档来源的 `version_applicability` 一律是 `unknown`：command-code 没有登记 git 仓库来源，本轮也没有固定任何 npm 发行包版本，因此下面每条机制都不能绑定到某个已安装版本，只能当作该抓取时刻的文档表述。界面只有 catalog 登记的 `cli`（kind: cli）；catalog 未登记其它界面，本节不覆盖它们。

## 记录范围与开关 {#transcripts-scope-and-switches}

会话记录包含两类东西：对话本身，以及围绕文件修改的 checkpoint。

对话记录的落盘范围由安全文档的存储表直接给出：Conversation history 标为 Local only、位于 `~/.commandcode/projects/`、不用于训练 [@ref-cc-lt-conversation-history-local]。记录的内容不止纯文本消息——`/context` 文档的压缩说明按 `tool_use` 与 `tool_result` 成对裁剪，说明工具调用与工具结果也在记录里 [@ref-cc-lt-mods-session-store]。压缩摘要还会携带一份 session-scratchpad 文件清单（只有文件名与元数据），所以 scratchpad 文件的存在也被间接记进会话 [@ref-cc-lt-context-scratchpad-manifest]。

checkpoint 是与对话并列的第二类本机记录。安全文档说明每次文件修改前都会创建 checkpoint，可用 `Esc` 连按两次打开选择器，恢复时可以只恢复文件、只恢复对话或两者都恢复，并且 checkpoint 本地存储、按会话区分 [@ref-cc-lt-checkpoints-local-persession]。这是本节能证实的、唯一一处官方声明「每次文件修改前」写入的动作。

控制是否落盘的开关有两个，语义不同。`--no-session` 的表述是「Don't persist this session to disk (in-memory only)」[@ref-cc-lt-cli-nosession-name]，整场会话不落盘；默认行为则是落盘，headless 文档明确写每次 headless 运行都会把 transcript 持久化到磁盘 [@ref-cc-lt-headless-persists-transcript]。

`--no-session` 的边界要读 mods 文档才看得清：即使不落盘，`session` 对象仍会被填充，条目照常追加、在进程生命周期内可读，只是永不触碰磁盘 [@ref-cc-lt-mods-nosession-in-memory]。也就是说「不落盘」关掉的是持久化，不是记录机制本身。

「哪些内容不落盘」这一问，固定来源只给出一条明确表述：mod 写入的 `custom` 树条目是 mod 私有数据，never sent to the LLM、never rendered [@ref-cc-lt-mods-session-store]。这句说的是不进模型上下文与界面渲染，不能据此推断它不写进 transcript 文件——恰恰相反，同一段说明 mods 的持久化接口与 transcript 是同一个 append-only 文件上的逐条目入口。官方文档没有在本轮声明任何「不写入 transcript」的类别。

## 存储位置、命名与数据库 {#transcripts-storage-layout}

### 目录与根路径

对话记录的根目录是 `~/.commandcode/projects/` [@ref-cc-lt-conversation-history-local]。这是本轮文档给出的唯一根路径，它与 settings 文档里 per-project state 的 `~/.commandcode/projects/{project}/…` 形态一致（后者用于 MCP、config 等，本节不展开，见 `config.sources`）。`~` 的解析依赖 `HOME` 或 `USERPROFILE` 环境变量，settings 文档把这两个变量列为「Home directory used to resolve `~/.commandcode`」[@ref-cc-lt-settings-scratchpad-env]，这是路径随环境变化的唯一已文档化入口。

会话文件的确切路径不写在文档里，而是由命令现场报出：`/session-file`「Show the current session id and session file path」[@ref-cc-lt-slash-session-file-export]。hook 侧同样从入参拿到，字段名 `transcript_path`，描述为「Absolute path to this session's transcript JSONL」[@ref-cc-lt-hooks-transcript-path]。因此要定位一个会话记录的正确做法是问运行中的进程，而不是猜目录结构。

会话另有 per-session scratchpad，位置可由 `COMMANDCODE_SCRATCHPAD` 或 `COMMANDCODE_SCRATCHPAD_BASE` 覆盖（前者指定具体位置，后者指定基目录）[@ref-cc-lt-settings-scratchpad-env]。它与 transcript 是两套东西：scratchpad 文件留在磁盘上，压缩摘要里带的是它们的名字与元数据清单 [@ref-cc-lt-context-scratchpad-manifest]。

已知缺口：文档没有给出 `~/.commandcode/projects/` 之下的子目录层级、每会话目录名规则，也没有说明 Linux、macOS 与 Windows 之间该路径是否一致。本轮界面是 CLI，未验证其它平台表述。

### 会话文件命名与标识

`--session` 接受两种形态：「Resume a session by transcript path (`.jsonl`) or a unique session-id prefix」，示例前缀形如 `01hx` [@ref-cc-lt-cli-session-flags]。由此可确认会话文件扩展名是 `.jsonl`，并且会话 id 至少可以用唯一前缀匹配。示例前缀形似按时间递增的 id，但文档没有给出 id 的生成规则、字符集与位数，本轮不做进一步断言。

会话另有一个可读显示名，与 id 分离：`-n` 配 `--name` 是「Set the session display name」[@ref-cc-lt-cli-nosession-name]；交互态下 `/rename` 重命名当前会话，`/name` 是它的别名 [@ref-cc-lt-slash-session-commands]。`--resume` 按 id 或 name 恢复，也接受从历史里挑 [@ref-cc-lt-cli-session-flags]。

分支关系表达为树，而不是线性文件。`/tree`「Browse the session tree and jump to any point in it」[@ref-cc-lt-slash-session-file-export]；harness 把这个存储称为 tree-format 会话存储 [@ref-cc-lt-mods-session-store]。文档没有公开树在文件里的编码方式，也没给父子会话与跨文件引用的具体字段。项目路径如何编码进目录或文件名，文档同样未写。

### 数据库与索引

固定来源指向文件而非数据库，而且三处口径一致：mods 文档说 transcript 处在会话存储的那个 append-only 文件里 [@ref-cc-lt-mods-session-store]；`/context` 文档把持久化载体称作 session log 并声明它是 append-only [@ref-cc-lt-context-append-only-log]；hook 侧称之为 transcript JSONL 文件 [@ref-cc-lt-hooks-transcript-path]。三处都把 transcript 当成一个文件。

已查入口与剩余缺口：18 份原件里没有任何一处提到 SQLite、索引表、sidecar 数据库或检索索引，也没有任何一处提到分片或压缩。因此本节不能断言「不使用数据库」——只能记录「已归档文档把 transcript 描述为单一 append-only JSONL 文件，未描述任何数据库、索引或辅助状态文件」。哪些文件是恢复所必需、能否重建，文档同样没有回答。

## 记录格式与 schema {#transcripts-format-and-schema}

### 格式

可证实的部分：扩展名 `.jsonl`，即换行分隔的 JSON 记录流 [@ref-cc-lt-cli-session-flags]；hook 入参把它称作 transcript JSONL [@ref-cc-lt-hooks-transcript-path]；写入语义是追加而非覆盖——「The session log is append-only」[@ref-cc-lt-context-append-only-log]。同段还说明压缩不会改写原日志，压缩被记成 session tree 里的独立条目，指向摘要与第一条保留的消息。

导出侧的格式枚举是另一组值，不要与存储格式混为一谈：`/export` 接受 `html`、`jsonl`、`md` 或一个输出路径，默认写 HTML [@ref-cc-lt-slash-session-file-export]；`defaultExportFormat` 与 `defaultShareGistFormat` 两个设置项各自取值 `html | jsonl | md`，默认均为 `html`。`jsonl` 出现在两处，但它在设置里是导出格式的枚举值，本轮文档没有说明导出的 jsonl 与磁盘上的 transcript 是否字节等价。

缺口：字符编码、字段顺序、是否有文件头记录、是否分片、是否压缩，本轮文档均未描述。

### 已文档化的记录类型与字段

文档没有发布 transcript 的第一方逐字段 schema。能从固定来源确证的是以下三组。

第一组是 tree 条目的两种 kinds，来自 mods 文档 [@ref-cc-lt-mods-session-store]：`appendCustomEntry` 接受 `customType` 与可选 `data`，产生 `custom` 树条目，是 mod 私有数据，永不发给模型、永不渲染；`appendCustomMessageEntry` 接受 `customType`、`content`、`display` 与可选 `details`，产生 `custom_message` 树条目，内容应该在下一轮作为普通 `user` 消息投影给模型，`display` 为真时另在 TUI 里以区别样式渲染，为假时只进上下文，调用返回 `entryId` 与 `message`。`getCustomEntries` 按 `customType` 过滤、回读该 mod 自己写过的条目，按文件顺序，覆盖活动分支的完整条目列表。

第二组是压缩条目：它是 session tree 里的独立条目，指向摘要与第一条保留消息 [@ref-cc-lt-context-append-only-log]。

第三组来自 hook 入参，属于旁证而非 transcript schema：hook 每次触发时收到的公共字段包含 `session_id`（「Session identifier, stable for the lifetime of one CLI session」）与 `transcript_path` [@ref-cc-lt-hooks-transcript-path]。这条能证实会话 id 与 transcript 路径对扩展是可见的，但不能反推 JSONL 内的字段布局。

仍缺的具体 schema 缺口，逐条照实列出：本轮 18 份已归档文档中，没有 user、assistant、tool_use、tool_result、compaction 各记录类型的字段表、必填项、类型与相互引用关系；没有 schema 版本号或迁移规则；没有给出任何一条脱敏的最小完整 transcript 样例。因此本节不提供示例记录，也不归纳跨产品的通用记录 schema。上面的自定义条目字段是 mods 扩展接口的签名，属于扩展面而非文件格式。

## 生命周期与分支 {#transcripts-lifecycle-and-branching}

创建与追加：会话启动后记录持续追加 [@ref-cc-lt-headless-persists-transcript]；不落盘时条目仍追加但只存在于进程内 [@ref-cc-lt-mods-nosession-in-memory]。关闭与恢复：`/clear`（别名 `/new`）是「Start a new session with empty context; previous stays on disk, resumable with `/resume`」——即开新会话不清旧记录 [@ref-cc-lt-slash-session-commands]；恢复入口是 `/resume`（别名 `/sessions`）、CLI 的 `--resume`、`--continue` 与 `--session` [@ref-cc-lt-slash-session-commands] [@ref-cc-lt-cli-session-flags]。`/reload` 重启 Command Code 并恢复当前会话，同时应用已暂存的更新 [@ref-cc-lt-slash-session-file-export]。

分支：交互态有三条路径。`/fork` 把对话分叉成新会话；`/clone` 克隆当前分支成新会话并切换过去，且从不接受参数 [@ref-cc-lt-slash-session-commands]。命令行侧 `--fork-session` 配合 `--resume` 或 `--continue` 使用，把会话分叉成新的一个，原会话保持不变 [@ref-cc-lt-cli-nosession-name]。`/tree` 允许跳到树中任意一点 [@ref-cc-lt-slash-session-file-export]。

上下文压缩后的延续：压缩只改变发给模型的内容，不改变存储内容；原日志保持 append-only，完整历史留在磁盘上，checkpoint 恢复、`/rewind` 与会话分叉仍能看到全部 [@ref-cc-lt-context-append-only-log]。

交给子代理：agents 文档说明 subagent 在自己的上下文窗口里跑、返回单个结果，其文件读取与推理留在自己的窗口中；本轮已归档文档没有描述 subagent 是否产生独立 transcript、如何关联到父会话。因此该子问题记为缺口，不做推断。相关机制见 `agents.diagnostics`。

## 归档、导出、分享与清理 {#transcripts-export-share-and-cleanup}

原生归档开关：未发现。本轮 18 份原件里没有任何一处提供「归档会话」或「停止记录但保留」的独立开关；控制落盘的是 `--no-session`，它是「本次不写盘」，不是归档。

导出是复制出去，不改变原记录。`/export` 接受格式关键字或一个输出路径，裸调用时 HTML 为默认格式 [@ref-cc-lt-slash-session-file-export]；默认格式由 `defaultExportFormat` 控制。这与「复制目录」的区别是：导出产出的是渲染产物（HTML、Markdown）或某种序列化（jsonl），不是会话存储本身，恢复一段会话所需的存储文件集合不会由 `/export` 描述。

分享必须与本机归档分开记。`/share gist` 会发布一个 secret GitHub gist，格式同样由 `defaultShareGistFormat` 决定 [@ref-cc-lt-settings-export-formats]；`/unshare` 停止分享 [@ref-cc-lt-slash-session-file-export]。这是文档中唯一一处会话内容离开本机的机制，属于外部发布，不是本机归档。安全文档那一行「Local only」的表述限定的是默认存储位置，不等于分享路径不存在。裸 `/share` 文档写明正在重建、指向 `/export`，不要按可用命令对待。

checkpoint 是另一套本机归档：本地、按会话区分，可在文件与对话两个维度恢复 [@ref-cc-lt-checkpoints-local-persession]。它恢复的是状态快照，不是会话记录文件，因此不能替代对 transcript 的备份。

关于「归档依赖哪些必要文件、恢复后损失什么」：已归档文档没有给出必要文件清单，也没有讨论路径可移植性与信息完整性。这一整问只能记为部分已知，不做推断。

### 清理：官方删除与保留机制

本轮结论是 unknown，不是「不支持」，也不是「可以安全删除」。

已查入口：`/reference/slash-commands` 的 Sessions 组与 `/reference/cli` 的 flags 全表，无删除、无 prune、无保留期、无容量或配额说明 [@ref-cc-lt-slash-session-file-export]；`/docs/security` 的存储与隐私表只有「Local only / 不用于训练」，没有删除承诺 [@ref-cc-lt-conversation-history-local]；`/docs/context` 的压缩与恢复说明只讲追加与保留，没有回收；`/docs/headless` 的会话与恢复一节；`/docs/settings` 的文件与键表。18 份原件里没有任何一处出现保留期、自动清理、配额上限或官方删除入口。

唯一与「清掉」相关的已文档化行为，方向恰恰相反：`/clear` 开新会话时明说 previous stays on disk、可用 `/resume` 恢复 [@ref-cc-lt-slash-session-commands]。文档描述的默认路径是保留而非回收。

剩余缺口：手动删除会话文件或删除 `~/.commandcode/projects/` 下内容的后果、删除前必须停止哪些写入者、是否有孤儿索引或重建路径，固定来源都没有回答。既然连必要文件集合都未公开，本节不给出任何「可以安全删除」的结论；读者要清理本机记录，需要官方补充说明或源码级证据。

## 定位、完整性与排错 {#transcripts-diagnostics}

排查本机记录时，优先走产品自己报出的入口，而不是猜路径。

定位当前会话文件：`/session-file` 打印当前 session id 与 session file path [@ref-cc-lt-slash-session-file-export]。该命令列在安全文档的「agent 忙碌时仍可用」清单里，属只读会话事实，可在一轮进行中调用。

从外部拿到路径：hook 入参里的 `transcript_path` 是该会话 transcript JSONL 的绝对路径，公共字段每次触发都带 [@ref-cc-lt-hooks-transcript-path]；机制细节见 `hooks.input`。

按 id 或前缀恢复：`--session` 接 transcript 路径或唯一 session-id 前缀，`--resume` 接 id 或 name，`--continue` 取当前目录最近一场 [@ref-cc-lt-cli-session-flags]。headless 场景下 `--continue` 取最近一次 headless 运行，裸 `--resume` 不带 id 会报错，因为没有交互选择器。

在脚本里取 id：headless 的 `--verbose` 把 session id 写到 stderr（形如 `session: 9f4e1c0a-...`），stdout 保持干净可管道 [@ref-cc-lt-headless-session-id-stderr]。

浏览与跳转：`/tree` 打开会话树并跳到任意节点，`/resume` 从历史里选 [@ref-cc-lt-slash-session-commands]。

完整性检查与状态校验这一问，固定来源没有对应入口：没有校验 transcript 是否损坏、是否截断、是否与 checkpoint 一致的工具或命令描述，也没有诊断输出格式说明。因此本节能给出的是「怎样定位与读取」，不能给出「怎样检查完整性」。恢复失败或文件缺失时的排错流程同样无据可依，保持缺口。

本主题只覆盖会话记录及其维持所需的存储依赖。以下机制在更接近读者问题的主题里，本节不重复：`config.sources`（`~/.commandcode/` 下各配置文件与 per-project 作用域、HOME 与 USERPROFILE 解析）、`config.diagnostics`（`settings.json` 与 `config.json` 的排查路径）、`hooks.input`（hook 入参完整字段面，本节只用到 `session_id` 与 `transcript_path`）、`plugins.api`（mods 的 hook 生命周期与 `ctx.session` 完整 API 面，本节只取与持久化相关的两条）、`agents.diagnostics`（subagent 的上下文隔离与委派机制，subagent 是否单独落盘仍缺来源）。