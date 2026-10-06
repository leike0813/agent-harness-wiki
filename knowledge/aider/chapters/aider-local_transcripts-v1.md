---
schema_version: 3
record_kind: production
edition_id: aider-local_transcripts-v1
harness_id: aider
topic: local_transcripts
title: "Aider CLI 的本地会话记录：`.aider.chat.history.md`、恢复、归档与清理"
sections:
  - section_id: transcripts-recording-scope
    surface_ids: [cli]
    source_refs:
      [
        ref-aider-lt-io-user-ai-output,
        ref-aider-lt-io-tool-message,
        ref-aider-lt-io-llm-history,
        ref-aider-lt-base-llm-log,
        ref-aider-lt-base-to-llm-log,
        ref-aider-lt-io-input-history,
      ]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      [
        ref-aider-lt-args-history-file-defaults,
        ref-aider-lt-args-history-file-options,
        ref-aider-lt-args-env-prefix,
        ref-aider-lt-main-io-construction,
        ref-aider-lt-io-chat-history-init,
        ref-aider-lt-io-session-header,
        ref-aider-lt-io-append-chat-history,
        ref-aider-lt-io-llm-history,
        ref-aider-lt-base-coder-switch,
        ref-aider-lt-docs-history-options,
      ]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs:
      [
        ref-aider-lt-utils-split-markdown-head,
        ref-aider-lt-utils-split-markdown-body,
        ref-aider-lt-io-user-ai-output,
        ref-aider-lt-io-tool-message,
        ref-aider-lt-io-llm-history,
      ]
  - section_id: transcripts-session-lifecycle
    surface_ids: [cli]
    source_refs:
      [
        ref-aider-lt-io-session-header,
        ref-aider-lt-io-append-chat-history,
        ref-aider-lt-base-restore-history,
        ref-aider-lt-main-restore-flag,
        ref-aider-lt-base-summarize-start,
        ref-aider-lt-base-move-back,
        ref-aider-lt-base-coder-switch,
        ref-aider-lt-utils-split-markdown-body,
      ]
  - section_id: transcripts-archive-and-cleanup
    surface_ids: [cli]
    source_refs:
      [
        ref-aider-lt-faq-share-transcript,
        ref-aider-lt-cmd-save-add,
        ref-aider-lt-cmd-save-readonly,
        ref-aider-lt-cmd-clear,
        ref-aider-lt-cmd-clear-reset,
        ref-aider-lt-io-append-chat-history,
      ]
  - section_id: transcripts-state-and-diagnostics
    surface_ids: [cli]
    source_refs:
      [
        ref-aider-lt-repomap-tags-cache,
        ref-aider-lt-cmd-undo,
        ref-aider-lt-base-restore-history,
        ref-aider-lt-io-read-text,
        ref-aider-lt-utils-split-markdown-body,
        ref-aider-lt-io-llm-history,
      ]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recording-scope
        status: partial
        source_refs:
          [
            ref-aider-lt-io-user-ai-output,
            ref-aider-lt-io-tool-message,
            ref-aider-lt-io-llm-history,
            ref-aider-lt-base-llm-log,
            ref-aider-lt-base-to-llm-log,
            ref-aider-lt-io-input-history,
          ]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          [
            ref-aider-lt-args-history-file-defaults,
            ref-aider-lt-args-history-file-options,
            ref-aider-lt-args-env-prefix,
            ref-aider-lt-main-io-construction,
            ref-aider-lt-io-chat-history-init,
          ]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          [
            ref-aider-lt-args-history-file-defaults,
            ref-aider-lt-io-session-header,
            ref-aider-lt-base-coder-switch,
          ]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs:
          [
            ref-aider-lt-io-append-chat-history,
            ref-aider-lt-io-session-header,
            ref-aider-lt-io-llm-history,
          ]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs:
          [
            ref-aider-lt-utils-split-markdown-head,
            ref-aider-lt-utils-split-markdown-body,
            ref-aider-lt-io-user-ai-output,
            ref-aider-lt-io-tool-message,
            ref-aider-lt-io-llm-history,
          ]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-session-lifecycle
        status: answered
        source_refs:
          [
            ref-aider-lt-base-restore-history,
            ref-aider-lt-main-restore-flag,
            ref-aider-lt-base-summarize-start,
            ref-aider-lt-base-move-back,
            ref-aider-lt-base-coder-switch,
            ref-aider-lt-io-append-chat-history,
          ]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-state-and-diagnostics
        status: answered
        source_refs:
          [
            ref-aider-lt-repomap-tags-cache,
            ref-aider-lt-cmd-undo,
            ref-aider-lt-base-restore-history,
          ]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs:
          [
            ref-aider-lt-faq-share-transcript,
            ref-aider-lt-cmd-save-add,
            ref-aider-lt-cmd-save-readonly,
          ]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-cleanup
        status: partial
        source_refs:
          [
            ref-aider-lt-cmd-clear,
            ref-aider-lt-cmd-clear-reset,
            ref-aider-lt-io-append-chat-history,
          ]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-state-and-diagnostics
        status: partial
        source_refs:
          [
            ref-aider-lt-io-read-text,
            ref-aider-lt-utils-split-markdown-body,
            ref-aider-lt-io-llm-history,
            ref-aider-lt-repomap-tags-cache,
          ]
---

## 固定来源与范围 {#transcripts-recording-scope}

本章的全部结论来自官方仓库提交 `5dc9490bb35f9729ef2c95d00a19ccd30c26339c`（`https://github.com/Aider-AI/aider`），取用时间是 2026-10-06，界面范围限定为 catalog 中登记的 Aider CLI（`surface_id: cli`）。绑定快照为 `snapshot-aider-lt-aider-args-py`、`snapshot-aider-lt-aider-io-py`、`snapshot-aider-lt-aider-utils-py`、`snapshot-aider-lt-aider-coders-base-coder-py`、`snapshot-aider-lt-aider-commands-py`、`snapshot-aider-lt-aider-main-py`、`snapshot-aider-lt-aider-repomap-py`、`snapshot-aider-lt-aider-website-docs-faq-md`、`snapshot-aider-lt-aider-website-docs-config-options-md`。这是源码级结论：提交号只代表这一棵源码树，不证明任何已发布 pip 包的运行时行为；本章也没有为发行包写 `mappings/`。本章不逐项审计缓存、日志与遥测，只覆盖会话记录本身以及维持它所必需的存储依赖；仓库图缓存、模型响应缓存、analytics 一律在外。

Aider CLI 没有结构化会话数据库。它的"会话记录"是**一个给人读的 Markdown 文件**：`.aider.chat.history.md`。会话消息在内存里是 `dict(role=..., content=...)` 列表，落盘时按行前缀编码成 Markdown，再由同一套前缀规则解析回消息列表。因此理解这套记录的关键不是数据库结构，而是行前缀约定。

### 记录了什么

写入记录的三类内容，都通过同一个 `append_chat_history()` 入口追加：

| 内容 | 落盘形态 | 依据 |
| :-- | :-- | :-- |
| 用户输入 | 每行前缀 `#### `，多行输入用 `#### ` 连接；空输入写成一行 `####` 加占位标记 | [@ref-aider-lt-io-user-ai-output] |
| 助手回复正文 | 无前缀的纯文本段落 | [@ref-aider-lt-io-user-ai-output] |
| 工具输出与错误提示 | 每行前缀 `> `（引用块），逐行写入 | [@ref-aider-lt-io-tool-message] |

当模型这一轮没有文本回复、只有函数调用时，解析后的调用参数会被 `json.dumps(..., indent=4)` 展开后写入记录，因此函数调用在记录里表现为一段 JSON 文本，而不是结构化事件。[@ref-aider-lt-base-llm-log]

另有两条独立、可选的记录：

- **LLM 对话日志**：`--llm-history-file`（如 `.aider.llm.history`）默认关闭。开启后，发送给模型的完整消息列表记为 `TO LLM` 块，返回的助手内容记为 `LLM RESPONSE` 块，每块带秒级 ISO 时间戳，UTF-8 追加写入。[@ref-aider-lt-base-to-llm-log][@ref-aider-lt-base-llm-log][@ref-aider-lt-io-llm-history] 这是本产品里唯一能拿到"原始消息列表"的地方，默认的 `.aider.chat.history.md` 不含角色元数据之外的模型侧字段。
- **输入历史**：`.aider.input.history` 由 prompt_toolkit 的 `FileHistory` 承载，服务于命令行输入的上箭头调阅，不参与对话恢复。[@ref-aider-lt-io-input-history]

**不落盘的内容**：token 与费用统计只存在于内存与终端输出；结构化的工具调用/工具结果事件、消息 id、时间戳字段在默认记录里都没有；工具输出在恢复时被丢弃（见下文）。已查入口与剩余缺口见"记录 schema"小节。

## 存储位置、命名与格式 {#transcripts-storage-layout}

### 路径与开关

三个记录文件的默认值按 git 根目录解析；不在 git 仓库里时退化为当前工作目录下的相对文件名。[@ref-aider-lt-args-history-file-defaults]

| 选项 | 默认值 | 作用 |
| :-- | :-- | :-- |
| `--chat-history-file` | `[git 根]/.aider.chat.history.md` | 会话 Markdown 记录 |
| `--input-history-file` | `[git 根]/.aider.input.history` | 输入调阅历史 |
| `--restore-chat-history` | False | 启动时把上次记录读回对话 |
| `--llm-history-file` | 未设置 | 记录与模型的原始对话；不设即不写 |

选项定义见 `aider/args.py` 的 "History Files" 参数组；解析器统一使用 `AIDER_` 前缀，因此每个选项都有对应环境变量（`AIDER_CHAT_HISTORY_FILE`、`AIDER_RESTORE_CHAT_HISTORY`、`AIDER_LLM_HISTORY_FILE` 等），官方选项文档逐条列出了这些名字。[@ref-aider-lt-args-history-file-options][@ref-aider-lt-args-env-prefix][@ref-aider-lt-docs-history-options] 命令行、YAML 配置与环境变量之间的优先级与合并规则属于配置机制主题（`config.sources`、`config.defaults`），本章只说明这三个历史文件选项受该机制管辖。

值从参数层传到 `InputOutput`，`chat_history_file` 为 `None` 时记录功能整体停用。[@ref-aider-lt-main-io-construction][@ref-aider-lt-io-chat-history-init] 路径用 `os.path.join` 拼接，具体分隔符随操作系统变化；本条结论的取证在 Linux 上完成，Windows 与 macOS 的绝对路径形态未在本章验证。

### 命名与"会话"的表达方式

文件名固定，**没有会话 id、没有时间戳、没有项目路径编码**；同一仓库共用同一个文件，多次会话累积在同一个文件里。[@ref-aider-lt-args-history-file-defaults] 一次启动对应文件里的一行标题：

```
# aider chat started at 2026-01-01 09:30:00
```

这行在 `InputOutput` 构造时立即追加，用的是执行机的本地时间。[@ref-aider-lt-io-session-header] 解析时 `# ` 开头的行被跳过，不产生消息。[@ref-aider-lt-base-coder-switch]

因此本产品**没有可引用的会话标识、分支标识或父子会话关联**：模式切换（`/ask`、`/code`、`/architect` 等）只把内存里的消息列表搬到新 coder 对象上，不落盘任何链接信息。[@ref-aider-lt-base-coder-switch] 后果是恢复时无法只恢复"最后一次会话"——`--restore-chat-history` 读的是整个文件，历史上更早的会话会一并回到上下文。已查入口：`aider/args.py`、`aider/io.py`、`aider/coders/base_coder.py`、`aider/commands.py`。剩余缺口：固定来源里没有任何按会话切分、索引或查询记录文件的机制。

### 文件形态

纯文本 Markdown，`encoding` 取自 `--encoding`，以追加模式 `"a"` 打开，写入时 `errors="ignore"`；父目录按需创建；不压缩、不分片、不轮转。[@ref-aider-lt-io-append-chat-history] LLM 对话日志同属追加写，但固定为 UTF-8，格式是 `角色 大写 + 空格 + 秒级 ISO 时间戳`，随后是内容行。[@ref-aider-lt-io-llm-history]

## 记录 schema 与回解析 {#transcripts-record-schema}

记录没有独立 schema 文件，也没有版本字段或迁移路径；它的"schema"就是写入与解析双方共享的行前缀约定。解析函数 `split_chat_history_markdown(text, include_tool=False)` 的规则：[@ref-aider-lt-utils-split-markdown-head][@ref-aider-lt-utils-split-markdown-body]

| 行前缀 | 归属 | 处理 |
| :-- | :-- | :-- |
| `# ` | 无 | 跳过（会话标题行） |
| `> ` | `tool` | 去掉两个字符前缀 |
| `#### ` | `user` | 去掉五个字符前缀 |
| 其它 | `assistant` | 原样保留换行 |

产出统一是 `dict(role=..., content=...)`，其中 `role` 取 `user`、`assistant`、`tool`。写入侧与之对称：用户输入带 `#### ` 前缀，助手正文无前缀，工具提示逐行加 `> `。[@ref-aider-lt-io-user-ai-output][@ref-aider-lt-io-tool-message] `include_tool` 默认 `False`，**恢复时所有 `tool` 消息被丢弃**：这是记录到恢复的一次确定性有损转换，工具输出与工具错误在恢复后的上下文里不再存在。[@ref-aider-lt-utils-split-markdown-body]

脱敏后的最小完整示例：

```markdown
# aider chat started at 2026-01-01 09:30:00

#### 把 README 里的示例命令改短
> Applied edit to README.md
改好了：示例命令只保留一条。

#### 顺便补一句用法说明
这是最小示例，路径与内容均为占位。
```

对应的解析结果是四条消息，顺序为 `user`、`assistant`（此处被丢弃的 `tool` 行不入列）、`user`、`assistant`。LLM 对话日志的结构与它不同，是另一套记录。[@ref-aider-lt-io-llm-history]

**已查入口**：`aider/io.py`（写入路径）、`aider/utils.py`（解析路径）、`aider/commands.py`（命令与文件交互）、`aider/website/docs/`（FAQ 与选项文档）。**剩余缺口**：固定来源里没有 schema 文档、版本号或迁移代码，因此无法说明记录格式在历史版本间的兼容策略；多模态消息（图片）如何进入记录、`--restore-chat-history` 之后图像消息的处理在该提交上未确认（`move_back_cur_messages` 里留有"检查图像消息影响"的 TODO），故本题记为 partial。

## 会话生命周期 {#transcripts-session-lifecycle}

| 阶段 | 固定来源中的行为 |
| :-- | :-- |
| 创建 | `InputOutput` 构造时立刻追加标题行，文件与父目录随之产生；因此**每次启动都会动这个文件** [@ref-aider-lt-io-session-header][@ref-aider-lt-io-append-chat-history] |
| 追加 | 每次输入、回复、工具提示各触发一次"打开—写入—关闭"；没有长驻句柄，也没有显式 flush 接口 [@ref-aider-lt-io-append-chat-history] |
| 内存态 | 当前轮在 `cur_messages`，轮次结束后并入 `done_messages` 并清空 [@ref-aider-lt-base-move-back] |
| 恢复 | 仅当 `done_messages` 为空时读取记录，解析后赋值并立即触发一次压缩检查；`--restore-chat-history` 只传给初始 coder [@ref-aider-lt-base-restore-history][@ref-aider-lt-main-restore-flag] |
| 压缩 | `done_messages` 超过 `max_chat_history_tokens` 时在后台线程里摘要；**摘要只改内存，不回写记录文件**，所以文件始终保留完整原文，而上下文已缩短 [@ref-aider-lt-base-summarize-start] |
| 分支/委派 | 模式切换把 `done_messages`、`cur_messages` 等整体搬到新 coder 对象；architect 模式再委派给 editor coder，同样只在进程内 [@ref-aider-lt-base-coder-switch] |

由此得出三条实践后果。第一，**磁盘上的记录比送进模型的上下文更完整**：文件里有被压缩掉的早期原文，也里有恢复时会被丢掉的工具行。第二，**恢复是全量恢复**，没有按会话或按分支恢复的选择。第三，因为追加是逐事件立即落盘，进程被中断时最多丢失正在进行的那一次写入，而不是整段会话；这一点由写入模式推断，固定来源没有给出显式的崩溃一致性承诺。

## 归档、分享与清理 {#transcripts-archive-and-cleanup}

### 没有原生归档

固定来源里**没有归档开关、没有保留期、没有导出命令、没有自动清理**。官方 FAQ 对"分享会话记录"给的方案是人工操作：把 `.aider.chat.history.md` 里想公开的 Markdown 手工复制出去（例如做成 gist）。[@ref-aider-lt-faq-share-transcript]

两个名字相近的官方命令都不能替代归档：

- `/save <文件>` 写出的只是一串 `/add` 与 `/read-only` 命令，用来重建**当前加入聊天上下文的文件集合**，不含任何对话文本，因此无法用来恢复会话。[@ref-aider-lt-cmd-save-add][@ref-aider-lt-cmd-save-readonly]
- `/copy-context` 把用户消息整理成 Markdown 送进剪贴板，同样不落盘。

把记录当作备份时，它依赖的唯一文件就是那一个 Markdown 文件；但恢复时会丢掉全部 `tool` 行（见 schema 小节），跨机器使用时还得用 `--chat-history-file` 指向备份文件，否则默认路径会按新的 git 根目录解析。信息完整性上的损失集中在工具输出与 LLM 原始消息，后者只有开启 `--llm-history-file` 时才有另一份可查。

### 删除与保留

`/clear` 与 `/reset` 看起来是清理命令，实际作用范围只在内存：`_clear_chat_history()` 把 `done_messages` 与 `cur_messages` 置空，`/reset` 额外把文件从聊天上下文里 drop 掉，两者都不触碰磁盘上的记录文件。[@ref-aider-lt-cmd-clear][@ref-aider-lt-cmd-clear-reset] 这就是本主题最容易误判的一点：`/clear` 之后记录文件仍在增长，因为下一次启动仍会追加新的标题行。

手动删除的实际后果：

- 删 `.aider.chat.history.md`：**唯一恢复输入消失**，且因为下次启动就重建标题行，文件会以"只有一行新标题"的形式回来，旧内容无法找回。
- 删 `.aider.input.history`：只损失输入调阅，不影响恢复。
- 删 `.aider.llm.history`：只损失该次运行的模型侧原始日志。
- 无级联、无孤儿记录：因为没有索引和数据库，删文件不会留下悬挂引用；反过来，被手工截断或改写的 Markdown 也没有任何一致性校验，只有行前缀解析规则兜底。

**删除前必须停止的写入者**：所有正在运行的 aider 进程。它们在构造 `InputOutput` 时就追加标题行，并在整个会话期间持续追加；先删后跑会得到一段丢失历史的记录文件。写入失败时程序会打印警告并在本进程内停用写入，这一条见下一小节。[@ref-aider-lt-io-append-chat-history]

**已查入口**：`aider/commands.py` 全部 `cmd_*` 定义、`aider/args.py` 选项组、`aider/io.py` 写入路径、`aider/website/docs/usage/commands.md` 与 `faq.md`。**剩余缺口**：没有找到官方删除、保留期或保留策略的说明；"未找到"只说明固定来源没有提供该机制，不能推断记录文件可以随手删除。

## 存储依赖、排错与状态检查 {#transcripts-state-and-diagnostics}

### 会话记录不依赖数据库

会话记录没有数据库、索引或辅助状态表：恢复所必需的只有那一个 Markdown 文件。仓库图（repo map）另有缓存，形态是仓库根下的 `.aider.tags.cache.v<版本>` 目录，`sqlite3` 在该模块只用于错误类型判断，属于缓存而非会话存储，本章不逐项审计。[@ref-aider-lt-repomap-tags-cache] 也不能从 git 反推对话：`/undo` 操作的是 aider 自己做的 git 提交，与记录文件无关。[@ref-aider-lt-cmd-undo] 换句话说，记录文件是**唯一事实源，不可重建**——删掉就只能重跑对话，且重跑得到的是新记录，不会补回旧原文。

### 定位与排错

| 想确认什么 | 怎么看 | 依据 |
| :-- | :-- | :-- |
| 记录写到哪 | 默认值按 git 根目录解析后的 `.aider.chat.history.md`；自定义值来自 `--chat-history-file` / `AIDER_CHAT_HISTORY_FILE`，选项文档列出默认值与环境变量名 | [@ref-aider-lt-docs-history-options] |
| 写入是否成功 | 写入失败会打印 `Warning: Unable to write to chat history file …`，并在本次运行内停用后续写入 | [@ref-aider-lt-io-append-chat-history] |
| 恢复是否生效 | 恢复以非静默方式读取文件，文件不存在时终端会出现 `file not found error` | [@ref-aider-lt-io-read-text][@ref-aider-lt-base-restore-history] |
| 模型侧日志是否在写 | 失败时打印 `Unable to write to llm history file …` 并停用 | [@ref-aider-lt-io-llm-history] |
| 结构是否完整 | 只能按行前缀规则人工核对：`# ` 跳过、`#### ` 为用户、`> ` 为工具、其余为助手；恢复时 `tool` 行必然被丢弃 | [@ref-aider-lt-utils-split-markdown-body] |
| 会话上下文现在有多大 | 进程内用 `/tokens` 查看，注意它反映的是可能已被摘要缩短的内存上下文，不是文件内容 | [@ref-aider-lt-base-summarize-start] |

排查时的关键区分：**文件里没有**某段内容，与**上下文里没有**某段内容，原因不同。前者看写入路径（是否被 `--chat-history-file` 停用、是否写失败），后者看压缩是否已触发。[@ref-aider-lt-io-append-chat-history][@ref-aider-lt-base-summarize-start] 固定来源没有提供校验工具、完整性检查命令或记录格式版本号，结构异常只能靠上表逐项人工核对。