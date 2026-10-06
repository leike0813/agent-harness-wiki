---
schema_version: 3
record_kind: production
edition_id: cursor-local_transcripts-v1
harness_id: cursor
topic: local_transcripts
title: "Cursor 本地 Transcript：记录范围、存储布局、生命周期、归档与排错"
sections:
  - section_id: transcripts-source-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-configuration-cli-config-locations
      - ref-cur-local_transcripts-changelog-persist-to-disk
      - ref-cur-hooks-doc-common-input-fields-3
      - ref-cur-local_transcripts-overview-conversation-search
      - ref-cur-local_transcripts-sdk-store-scope
  - section_id: transcripts-record-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-local_transcripts-changelog-persist-to-disk
      - ref-cur-local_transcripts-changelog-errors-in-transcripts
      - ref-cur-local_transcripts-changelog-headless-jsonl
      - ref-cur-local_transcripts-changelog-no-storage-summarize
      - ref-cur-local_transcripts-changelog-prompt-history
      - ref-cur-local_transcripts-changelog-btw-history
      - ref-cur-local_transcripts-subagents-clean-context
      - ref-cur-local_transcripts-overview-side-chat
      - ref-cur-custom_agents-changelog-transcript
      - ref-cur-hooks-doc-common-input
      - ref-cur-hooks-doc-common-input-fields
      - ref-cur-hooks-doc-common-input-fields-3
      - ref-cur-hooks-doc-env-vars-2
      - ref-cur-custom_providers-byok-zdr
  - section_id: transcripts-storage-layout
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-common-input-fields-3
      - ref-cur-hooks-doc-env-vars-2
      - ref-cur-hooks-doc-event-subagentstop
      - ref-cur-configuration-cli-config-locations
      - ref-cur-local_transcripts-changelog-headless-jsonl
      - ref-cur-local_transcripts-changelog-checkpoint-append
      - ref-cur-local_transcripts-changelog-logs-per-user
      - ref-cur-local_transcripts-params-worker-data-dir
      - ref-cur-local_transcripts-params-sb-debug
      - ref-cur-local_transcripts-overview-side-chat
      - ref-cur-custom_agents-subagents-faq-progress
      - ref-cur-custom_agents-subagents-scope
      - ref-cur-local_transcripts-output-format-events
      - ref-cur-local_transcripts-output-format-notes
      - ref-cur-local_transcripts-sdk-store-table
      - ref-cur-local_transcripts-sdk-store-scope
      - ref-cur-local_transcripts-sdk-jsonl-files
      - ref-cur-local_transcripts-sdk-local-store-default
  - section_id: transcripts-record-schema
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-common-input
      - ref-cur-hooks-doc-common-input-fields
      - ref-cur-hooks-doc-common-input-fields-3
      - ref-cur-hooks-doc-env-vars-2
      - ref-cur-hooks-doc-event-sessionstart
      - ref-cur-local_transcripts-hooks-sessionend
      - ref-cur-hooks-doc-event-subagentstart
      - ref-cur-hooks-doc-event-subagentstop
      - ref-cur-custom_agents-hooks-subagent-start
      - ref-cur-local_transcripts-output-format-events
      - ref-cur-local_transcripts-output-format-notes
      - ref-cur-local_transcripts-slash-conversation-id
      - ref-cur-local_transcripts-params-create-chat
      - ref-cur-local_transcripts-changelog-resume-cache
      - ref-cur-custom_agents-changelog-resume-context
      - ref-cur-local_transcripts-sdk-conversation-turn
      - ref-cur-local_transcripts-sdk-store-interface
      - ref-cur-local_transcripts-sdk-substore-tables
      - ref-cur-local_transcripts-sdk-jsonl-files
  - section_id: transcripts-lifecycle
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-hooks-doc-event-sessionstart
      - ref-cur-local_transcripts-hooks-sessionend
      - ref-cur-local_transcripts-params-resume
      - ref-cur-local_transcripts-params-create-chat
      - ref-cur-local_transcripts-changelog-resume-cache
      - ref-cur-custom_agents-changelog-resume-context
      - ref-cur-local_transcripts-changelog-fork
      - ref-cur-local_transcripts-changelog-rewind
      - ref-cur-local_transcripts-slash-chat-lifecycle
      - ref-cur-local_transcripts-slash-branch-compact
      - ref-cur-local_transcripts-changelog-checkpoint-append
      - ref-cur-local_transcripts-changelog-persist-to-disk
      - ref-cur-local_transcripts-overview-side-chat
      - ref-cur-custom_agents-subagents-resume
      - ref-cur-custom_agents-hooks-subagent-start
      - ref-cur-hooks-doc-event-subagentstop
  - section_id: transcripts-store-and-index
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-local_transcripts-overview-conversation-search
      - ref-cur-local_transcripts-changelog-resume-cache
      - ref-cur-custom_agents-subagents-faq-progress
      - ref-cur-local_transcripts-sdk-store-table
      - ref-cur-local_transcripts-sdk-store-scope
      - ref-cur-local_transcripts-sdk-store-interface
      - ref-cur-local_transcripts-sdk-substore-tables
      - ref-cur-local_transcripts-sdk-jsonl-files
      - ref-cur-local_transcripts-sdk-local-store-default
  - section_id: transcripts-retention-and-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-local_transcripts-changelog-uninstall-data
      - ref-cur-local_transcripts-slash-chat-lifecycle
      - ref-cur-local_transcripts-sdk-cloud-archive
      - ref-cur-configuration-changelog-logs
      - ref-cur-local_transcripts-changelog-logs-per-user
      - ref-cur-local_transcripts-changelog-resume-cache
      - ref-cur-local_transcripts-params-sb-debug
      - ref-cur-local_transcripts-params-worker-data-dir
      - ref-cur-local_transcripts-slash-conversation-id
      - ref-cur-custom_agents-subagents-faq-progress
      - ref-cur-local_transcripts-sdk-conversation-method
      - ref-cur-local_transcripts-sdk-store-table
      - ref-cur-local_transcripts-sdk-local-store-default
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: partial
        source_refs:
          - ref-cur-local_transcripts-changelog-persist-to-disk
          - ref-cur-local_transcripts-changelog-errors-in-transcripts
          - ref-cur-local_transcripts-changelog-headless-jsonl
          - ref-cur-local_transcripts-changelog-prompt-history
          - ref-cur-local_transcripts-changelog-btw-history
          - ref-cur-local_transcripts-subagents-clean-context
          - ref-cur-hooks-doc-common-input-fields-3
          - ref-cur-local_transcripts-changelog-no-storage-summarize
          - ref-cur-custom_providers-byok-zdr
      - surface_ids: [cursor]
        section_id: transcripts-record-scope
        status: partial
        source_refs:
          - ref-cur-local_transcripts-overview-side-chat
          - ref-cur-custom_agents-changelog-transcript
          - ref-cur-local_transcripts-subagents-clean-context
          - ref-cur-hooks-doc-common-input
          - ref-cur-hooks-doc-common-input-fields
          - ref-cur-hooks-doc-common-input-fields-3
          - ref-cur-hooks-doc-env-vars-2
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-cur-hooks-doc-common-input-fields-3
          - ref-cur-hooks-doc-env-vars-2
          - ref-cur-configuration-cli-config-locations
          - ref-cur-local_transcripts-changelog-logs-per-user
          - ref-cur-local_transcripts-params-worker-data-dir
          - ref-cur-local_transcripts-params-sb-debug
          - ref-cur-local_transcripts-sdk-store-table
          - ref-cur-local_transcripts-sdk-store-scope
      - surface_ids: [cursor]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-cur-hooks-doc-common-input-fields-3
          - ref-cur-hooks-doc-env-vars-2
          - ref-cur-local_transcripts-overview-side-chat
          - ref-cur-local_transcripts-changelog-headless-jsonl
          - ref-cur-local_transcripts-sdk-store-table
          - ref-cur-local_transcripts-sdk-store-scope
          - ref-cur-local_transcripts-sdk-local-store-default
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs:
          - ref-cur-hooks-doc-common-input-fields
          - ref-cur-local_transcripts-slash-conversation-id
          - ref-cur-local_transcripts-params-create-chat
          - ref-cur-hooks-doc-event-subagentstop
          - ref-cur-local_transcripts-sdk-jsonl-files
          - ref-cur-local_transcripts-sdk-substore-tables
      - surface_ids: [cursor]
        section_id: transcripts-record-schema
        status: partial
        source_refs:
          - ref-cur-hooks-doc-common-input
          - ref-cur-hooks-doc-common-input-fields
          - ref-cur-hooks-doc-env-vars-2
          - ref-cur-custom_agents-hooks-subagent-start
          - ref-cur-local_transcripts-sdk-substore-tables
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-cur-local_transcripts-changelog-headless-jsonl
          - ref-cur-local_transcripts-changelog-checkpoint-append
          - ref-cur-local_transcripts-output-format-events
          - ref-cur-local_transcripts-output-format-notes
          - ref-cur-local_transcripts-sdk-jsonl-files
      - surface_ids: [cursor]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-cur-hooks-doc-event-subagentstop
          - ref-cur-local_transcripts-changelog-headless-jsonl
          - ref-cur-local_transcripts-sdk-store-table
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs:
          - ref-cur-local_transcripts-output-format-events
          - ref-cur-local_transcripts-output-format-notes
          - ref-cur-hooks-doc-event-sessionstart
          - ref-cur-local_transcripts-hooks-sessionend
          - ref-cur-hooks-doc-event-subagentstop
          - ref-cur-local_transcripts-sdk-conversation-turn
          - ref-cur-local_transcripts-sdk-store-interface
      - surface_ids: [cursor]
        section_id: transcripts-record-schema
        status: partial
        source_refs:
          - ref-cur-hooks-doc-common-input
          - ref-cur-hooks-doc-common-input-fields
          - ref-cur-hooks-doc-event-subagentstart
          - ref-cur-custom_agents-hooks-subagent-start
          - ref-cur-hooks-doc-event-subagentstop
          - ref-cur-local_transcripts-sdk-conversation-turn
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-cur-hooks-doc-event-sessionstart
          - ref-cur-local_transcripts-hooks-sessionend
          - ref-cur-local_transcripts-params-create-chat
          - ref-cur-local_transcripts-params-resume
          - ref-cur-local_transcripts-changelog-resume-cache
          - ref-cur-custom_agents-changelog-resume-context
          - ref-cur-local_transcripts-changelog-checkpoint-append
          - ref-cur-local_transcripts-changelog-fork
          - ref-cur-local_transcripts-changelog-rewind
          - ref-cur-local_transcripts-slash-chat-lifecycle
          - ref-cur-local_transcripts-slash-branch-compact
          - ref-cur-custom_agents-subagents-resume
      - surface_ids: [cursor]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          - ref-cur-hooks-doc-event-sessionstart
          - ref-cur-local_transcripts-hooks-sessionend
          - ref-cur-local_transcripts-overview-side-chat
          - ref-cur-custom_agents-hooks-subagent-start
          - ref-cur-hooks-doc-event-subagentstop
          - ref-cur-local_transcripts-changelog-rewind
          - ref-cur-local_transcripts-slash-branch-compact
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-store-and-index
        status: partial
        source_refs:
          - ref-cur-local_transcripts-changelog-resume-cache
          - ref-cur-local_transcripts-sdk-store-table
          - ref-cur-local_transcripts-sdk-store-scope
          - ref-cur-local_transcripts-sdk-store-interface
          - ref-cur-local_transcripts-sdk-substore-tables
          - ref-cur-local_transcripts-sdk-jsonl-files
          - ref-cur-local_transcripts-sdk-local-store-default
      - surface_ids: [cursor]
        section_id: transcripts-store-and-index
        status: partial
        source_refs:
          - ref-cur-local_transcripts-overview-conversation-search
          - ref-cur-local_transcripts-sdk-store-table
          - ref-cur-local_transcripts-sdk-store-scope
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-diagnostics
        status: partial
        source_refs:
          - ref-cur-local_transcripts-sdk-cloud-archive
          - ref-cur-local_transcripts-changelog-uninstall-data
          - ref-cur-local_transcripts-slash-chat-lifecycle
      - surface_ids: [cursor]
        section_id: transcripts-retention-and-diagnostics
        status: partial
        source_refs:
          - ref-cur-local_transcripts-sdk-cloud-archive
          - ref-cur-local_transcripts-sdk-store-table
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-diagnostics
        status: partial
        source_refs:
          - ref-cur-local_transcripts-changelog-uninstall-data
          - ref-cur-local_transcripts-slash-chat-lifecycle
          - ref-cur-local_transcripts-sdk-cloud-archive
      - surface_ids: [cursor]
        section_id: transcripts-retention-and-diagnostics
        status: unknown
        source_refs: []
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-diagnostics
        status: partial
        source_refs:
          - ref-cur-configuration-changelog-logs
          - ref-cur-local_transcripts-changelog-logs-per-user
          - ref-cur-local_transcripts-changelog-resume-cache
          - ref-cur-local_transcripts-params-sb-debug
          - ref-cur-local_transcripts-params-worker-data-dir
          - ref-cur-local_transcripts-slash-conversation-id
          - ref-cur-custom_agents-subagents-faq-progress
      - surface_ids: [cursor]
        section_id: transcripts-retention-and-diagnostics
        status: partial
        source_refs:
          - ref-cur-configuration-changelog-logs
          - ref-cur-local_transcripts-slash-conversation-id
          - ref-cur-custom_agents-subagents-faq-progress
          - ref-cur-local_transcripts-sdk-conversation-method
---

## 固定来源与界面口径 {#transcripts-source-scope}

本章是 Cursor 的 `local_transcripts` 首采。Cursor 在 catalog 里没有登记 git 仓库来源，本轮全部证据来自已归档的官方文档快照：`snapshot-cur-cli-changelog-doc`（`cli/changelog.md`）、`snapshot-cur-hooks-doc`（`hooks.md`）、`snapshot-cur-cli-slash-commands-doc`、`snapshot-cur-cli-parameters-doc`、`snapshot-cur-cli-output-format-doc`、`snapshot-cur-cli-configuration-doc`、`snapshot-cur-agent-overview-doc`、`snapshot-cur-subagents-doc`、`snapshot-cur-sdk-typescript-doc` 与 `snapshot-cur-help-api-keys-doc`。这些快照的 `kind` 都是 `documentation`，`version_applicability.kind` 一律是 `unknown`，抓取时间集中在 2026-09-30。因此**本章任何结论都不能绑定到某个已安装的 Cursor 版本**：文档描述的是抓取当天的产品形态，没有对应的发行包或 commit 证据，也不写 `mappings/`。

两个界面的读法：catalog 中 Cursor 有 `cli`（Cursor CLI）与 `cursor`（Cursor IDE）两个界面。`hooks.md` 与 `subagents.md` 是两侧共用的引擎文档，`cli/changelog.md` 只描述 CLI 时间线，`agent/overview.md` 描述 IDE 聊天面板。凡是共用文档给出的结论，本章对两个界面各给一条答案；只在单侧有来源的差异（CLI 的 `/logs`、`--resume`、headless JSONL；IDE 的会话搜索与本地索引）逐条标注，不互相外推。

Cursor 有一个容易被误读的边界：官方文档里唯一被写清具体存储布局的会话记录存储，是 TypeScript SDK 的 `LocalAgentStore` [@ref-cur-local_transcripts-sdk-store-scope]。它服务于 **SDK 驱动的本地 agent**，不是 CLI 或 IDE 聊天记录的落盘位置；本章在存储与数据库小节引用它，只是为了说明“文档公开了什么、没公开什么”，不能据此推断 CLI 或 IDE 的会话文件路径 [@ref-cur-local_transcripts-changelog-persist-to-disk]。同理，IDE 的会话搜索是官方明确说明的本地索引 [@ref-cur-local_transcripts-overview-conversation-search]，但它的位置同样没有公开 [@ref-cur-hooks-doc-common-input-fields-3]。

顺带说明一个**同名但不同用途**的目录：Cursor 的配置根在用户主目录下是 `.cursor`（macOS/Linux 为 `~/.cursor`，Windows 为 `$env:USERPROFILE\.cursor`），并且可用 `CURSOR_CONFIG_DIR` 与 `XDG_CONFIG_HOME` 覆盖 [@ref-cur-configuration-cli-config-locations]。这一条只覆盖配置文件，会话记录是否落在同一目录树内没有来源支持。

**本章不覆盖**：缓存、日志与遥测的逐项审计，`~/.cursor` 下与记录无关的其它内容，以及云端（Cloud Agents、cursor.com/agents）上的会话副本。云端部分的证据只在需要划清本地与云端边界时引用。

## 记录范围、开关与不落盘的内容 {#transcripts-record-scope}

Cursor 确实把会话记录落盘。CLI 侧的直接表述是 transcript 持久化到磁盘，供 tooling 与 hooks 使用 [@ref-cur-local_transcripts-changelog-persist-to-disk]；引擎侧则把“主会话 transcript 文件的路径”作为 hook 的公共输入字段 [@ref-cur-hooks-doc-common-input-fields-3]。这两条合起来说明：本地存在按会话保存的 transcript 文件，且宿主会把它的绝对路径交给扩展读取。

**记录了什么**，可由来源直接证实的部分：

| 记录内容 | 证据 | 界面 |
| :--- | :--- | :--- |
| 会话正文与工具事件 | 子代理 transcript 展开后包含 prompt、thinking、tool call 与最终回复 [@ref-cur-custom_agents-changelog-transcript] | cli |
| 运行失败信息 | headless 运行的错误会写进 transcript，供脚本判定失败 [@ref-cur-local_transcripts-changelog-errors-in-transcripts] | cli |
| 每轮 token 用量与 request id | headless transcript 写入 Claude Code 兼容 JSONL，含每轮输入/输出/缓存 token 与 `request_id` [@ref-cur-local_transcripts-changelog-headless-jsonl] | cli |
| 引擎侧记录标识 | hook 收到 `conversation_id`（跨多轮稳定）、`generation_id`（每条用户消息变化）与 `transcript_path` [@ref-cur-hooks-doc-common-input] [@ref-cur-hooks-doc-common-input-fields] | cli, cursor |
| 子代理独立记录 | 子代理有自己的 transcript 文件，与父会话分开 [@ref-cur-hooks-doc-event-subagentstop] | cli, cursor |
| 侧聊（side chat）独立记录 | side chat 是持久会话，用父线程作隐藏参考上下文，并保留自己的 transcript [@ref-cur-local_transcripts-overview-side-chat] | cursor |

**哪些不落盘或被明确排除**，来源只给出两条可证实的边界：

- 上下文里看不到的子代理历史不进记录。子代理以干净上下文启动，父代理必须在 prompt 里显式带上所需信息，因为子代理无法访问此前的会话历史 [@ref-cur-local_transcripts-subagents-clean-context]。所以“记录了子代理 transcript”不等于“子代理能看到父会话历史”。
- `/btw` 侧问不写入会话历史 [@ref-cur-local_transcripts-changelog-btw-history]。CLI 的输入历史按会话分开，方向键上翻只召回本会话输入，不再是所有聊天共享的一条历史 [@ref-cur-local_transcripts-changelog-prompt-history]。

**记录开关**：`hooks.md` 明确 `transcript_path` 在 transcript 关闭时为 `null` [@ref-cur-hooks-doc-common-input-fields-3]，环境变量表也把 `CURSOR_TRANSCRIPT_PATH` 标注为“transcript 启用时才有” [@ref-cur-hooks-doc-env-vars-2]。也就是说存在一个能整体关闭 transcript 的设置，但**本轮固定来源没有公开它的名称、取值与生效层级**：归档的 CLI 配置页 `cli/reference/configuration.md` 的完整字段表里没有 transcript 相关项，`.cursor/cli.json` 与 `~/.cursor/cli-config.json` 都没有；企业侧的线索只有一条 changelog 记录“无存储团队（no-storage teams）的会话摘要改为失败即拒绝” [@ref-cur-local_transcripts-changelog-no-storage-summarize]。因此不能断言某个具体配置键能关闭本地 transcript。

**同步与云端是两件事**：本章讨论的落盘是本机行为。Cursor 的“对话式留存/隐私”类设置（例如 Privacy Mode、Zero Data Retention）影响的是请求在 Cursor 与模型供应商侧的处理，官方对自带 API key 的表述是数据处理遵循所用供应商的隐私政策、Cursor 的 Zero Data Retention 不适用 [@ref-cur-custom_providers-byok-zdr]。这类设置**不改变本地 transcript 是否落盘、落在哪里**；本轮归档的文档里没有 Privacy Mode 与本地记录关系的任何表述，这是本章的已知缺口。

**已查入口与剩余缺口**：`cli/reference/configuration.md`（完整字段表）、`cli/reference/slash-commands.md`（全部斜杠命令）、`cli/reference/parameters.md`（全部参数与子命令）、`hooks.md`（公共输入与环境变量）、`cli/changelog.md`（全部 377 行）、`agent/overview.md`、`subagents.md`。缺口有三处：transcript 开关的配置键未公开；哪些内容不落盘只有上述两条否定性证据，没有完整清单；文档侧没有索引、账号、隐私模式等页面在本轮候选里（`archive/cursor/` 中没有对应原件），所以云端留存与本地记录的关系无法从固定来源回答。

## 存储位置、命名与格式 {#transcripts-storage-layout}

### 已公开的路径

官方只公开了“路径可被读出”，没有公开“路径在哪里”：

- 主会话 transcript 是一个文件，hook 通过 `transcript_path` 拿到它的路径 [@ref-cur-hooks-doc-common-input-fields-3]，hook 进程侧对应环境变量 `CURSOR_TRANSCRIPT_PATH` [@ref-cur-hooks-doc-env-vars-2]。这是**唯一**被文档承诺的 transcript 定位方式：问宿主要路径，而不是猜目录。
- 目录约定上，Cursor 在用户主目录下使用 `.cursor` 作为配置根，macOS/Linux 写作 `~/.cursor`，Windows 写作 `$env:USERPROFILE\.cursor` [@ref-cur-configuration-cli-config-locations]。`CURSOR_CONFIG_DIR` 与 `XDG_CONFIG_HOME` 只影响**配置**文件位置，文档没有说它们会重定向 transcript 或索引。
- 调试日志与 transcript 是两套东西：`/logs` 显示并复制本次会话的 debug log 路径，debug log 按用户分别写以避免多用户主机上的权限冲突 [@ref-cur-local_transcripts-changelog-logs-per-user]。
- 子代理运行输出写在 `~/.cursor/subagents/` 下，父代理直接读这些文件查看进度 [@ref-cur-custom_agents-subagents-faq-progress]。`subagents.md` 覆盖编辑器、CLI 与 Cloud Agents 三种运行形态 [@ref-cur-custom_agents-subagents-scope]，文档没有按界面区分这条路径；对本地两个界面它是本机用户目录下的路径，云端子代理写在它自己的机器上。
- 记录按会话分家：side chat 作为持久会话保留自己的 transcript，与主线程分开 [@ref-cur-local_transcripts-overview-side-chat]；子代理同样有自己的 transcript 文件 [@ref-cur-hooks-doc-event-subagentstop]。也就是说“会话记录位置”至少要按会话 id 与角色分别定位，不存在单一全局文件。
- 两条容易被误当成会话记录的路径：`agent worker --data-dir` 是“日志、制品与录制数据”的基目录 [@ref-cur-local_transcripts-params-worker-data-dir]；`sandbox run --sb-debug` 把沙箱 debug 日志写到临时目录并打印路径 [@ref-cur-local_transcripts-params-sb-debug]。两者都不是聊天 transcript。

### 未公开的部分

CLI 与 IDE 的会话 transcript 究竟落在哪个目录、文件如何命名、是否有分片或压缩，本轮固定来源都没有给出。`cli/reference/configuration.md` 只描述配置文件位置 [@ref-cur-configuration-cli-config-locations]，没有任何 transcript 存储路径的字段。

**唯一有具体布局的第一方存储**是 SDK 的 `LocalAgentStore`，它属于 SDK 驱动的本地 agent，不能当成 CLI/IDE 的会话存储，但值得记下来作为 Cursor 会话记录形态的参照 [@ref-cur-local_transcripts-sdk-store-scope] [@ref-cur-local_transcripts-sdk-store-table]：

| 组件 | 内容 | 适用 |
| :--- | :--- | :--- |
| `SqliteLocalAgentStore` | workspace state root 之下的磁盘 SQLite | SDK 本地 agent |
| `JsonlLocalAgentStore` | 自己指定目录下的 NDJSON 文件，便于查看、复制与 diff | SDK 本地 agent |
| 自定义 `LocalAgentStore` | 自选后端（内存、Redis、Postgres 等） | SDK 本地 agent |

`local.store` 缺省走磁盘 SQLite（经 `node:sqlite`），模块不可用时必须显式配置 `JsonlLocalAgentStore` 或其它 store，否则 `Agent.create()` 抛 `ConfigurationError` [@ref-cur-local_transcripts-sdk-local-store-default]。

### 格式

分层的格式结论：

- **headless transcript**：写 Claude Code 兼容的 JSONL [@ref-cur-local_transcripts-changelog-headless-jsonl]。这是文档对 transcript 文件格式唯一的正面表述，且明确限定在 headless 运行。
- **流式事件**（stdout，非 transcript 文件本身）：`stream-json` 每个事件占一行、以 `\n` 结束，单次执行内 session id 保持一致，工具调用 id 可用于关联 start/completed 事件，并声明字段会以向后兼容方式增加 [@ref-cur-local_transcripts-output-format-notes]。事件是 `type` 加 `subtype` 的判别式结构，官方给出 `system`/`init`、`user`、`assistant`、`tool_call`（`started` 与 `completed`）与 `result` 等取值 [@ref-cur-local_transcripts-output-format-events]。
- **写入方式**：checkpoint 只保存新增的 transcript 条目，不再重载并重写整段对话 [@ref-cur-local_transcripts-changelog-checkpoint-append]。这说明写入是增量追加语义，但 checkpoint 的触发时机、失败回滚与刷盘策略没有公开。
- **子代理 transcript**：`subagentStop` 的示例值是 `/path/to/subagent/transcript.txt` [@ref-cur-hooks-doc-event-subagentstop]，即纯文本路径形态；这是 payload 里的示例值，不能据此断定所有子代理 transcript 都是 `.txt`。

**缺口**：交互式会话 transcript 的文件格式、编码、追加与覆盖规则、分片与压缩策略均未公开；SDK 的 NDJSON store 在自选目录下写四个固定文件 `agents.ndjson`、`runs.ndjson`、`run_events.ndjson`、`checkpoints.ndjson` [@ref-cur-local_transcripts-sdk-jsonl-files]，但那是 SDK 路径，不能外推到 CLI/IDE。

## 记录 schema 与第一方字段 {#transcripts-record-schema}

Cursor 没有为本地 transcript 文件发布独立 schema。文档里能被逐字证实的第一方记录契约有四组，全部是**宿主与扩展之间的接口**，不是文件内部格式；把它们列出来，是因为它们是当前唯一能确定字段名、类型与关系的地方。

**1. Hook 公共输入** [@ref-cur-hooks-doc-common-input] [@ref-cur-hooks-doc-common-input-fields]：

```json
{
  "conversation_id": "string",
  "generation_id": "string",
  "model": "string",
  "model_id": "string",
  "model_params": [{ "id": "string", "value": "string" }],
  "hook_event_name": "string",
  "cursor_version": "string",
  "workspace_roots": ["/absolute/workspace/root"],
  "user_email": "string | null",
  "transcript_path": "string | null"
}
```

`conversation_id` 是跨多轮稳定的会话标识，`generation_id` 每条用户消息变化；`transcript_path` 在 transcript 关闭时为 `null` [@ref-cur-hooks-doc-common-input-fields-3]，对应的 hook 环境变量是 `CURSOR_TRANSCRIPT_PATH`，同样只在 transcript 启用时存在 [@ref-cur-hooks-doc-env-vars-2]。**会话标识就是这三者的组合**：稳定的 `conversation_id`、每轮变化的 `generation_id`、以及指向本会话记录文件的 `transcript_path`。

**2. 会话起止事件**。`sessionStart` 在新建 composer 会话时触发，输入为 `session_id`、`is_background_agent`、`composer_mode` [@ref-cur-hooks-doc-event-sessionstart]。`sessionEnd` 的输入记录了结束原因与时长 [@ref-cur-local_transcripts-hooks-sessionend]：

```json
{
  "session_id": "SESSION_ID",
  "reason": "completed" | "aborted" | "error" | "window_close" | "user_close",
  "duration_ms": 45000,
  "is_background_agent": true | false,
  "final_status": "STATUS_STRING",
  "error_message": "ERROR_DETAILS_WHEN_REASON_IS_ERROR"
}
```

**3. 子代理父子关系**。`subagentStart` 输入含 `subagent_id`、`subagent_type`、`task`、`parent_conversation_id`、`tool_call_id`、`subagent_model`、`is_parallel_worker` [@ref-cur-hooks-doc-event-subagentstart] [@ref-cur-custom_agents-hooks-subagent-start]；`subagentStop` 输出侧含 `status`、`message_count`、`tool_call_count`、`loop_count`、`modified_files` 与 `agent_transcript_path` [@ref-cur-hooks-doc-event-subagentstop]。父子关联的键就是 `parent_conversation_id` ↔ 子代理自己的 `conversation_id`。

**4. 事件流与结构化轮次**。NDJSON 事件样例（官方文档示例，`session_id` 为占位值） [@ref-cur-local_transcripts-output-format-events]：

```json
{"type":"system","subtype":"init","apiKeySource":"login","cwd":"/Users/user/project","session_id":"SESSION_UUID","model":"MODEL_ID","permissionMode":"default"}
{"type":"user","message":{"role":"user","content":[{"type":"text","text":"USER_PROMPT_PLACEHOLDER"}]},"session_id":"SESSION_UUID"}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"ASSISTANT_TEXT_PLACEHOLDER"}]},"session_id":"SESSION_UUID"}
```

SDK 侧给出的结构化轮次类型是 `ConversationTurn`，分为 `agentConversationTurn`（可选 `userMessage` 加 `steps`）与 `shellConversationTurn`（`shellCommand` 加 `shellOutput`） [@ref-cur-local_transcripts-sdk-conversation-turn]；其本地 store 的四个子存储是 `agents`、`checkpoints`、`runs`、`runEvents` [@ref-cur-local_transcripts-sdk-store-interface]。

### 命名与文件标识

固定来源能确定的命名事实集中在“标识符”和“示例文件名”两类：

| 命名对象 | 形态 | 证据 |
| :--- | :--- | :--- |
| 会话标识 | `conversation_id` 跨多轮稳定；`generation_id` 每条用户消息变化 | [@ref-cur-hooks-doc-common-input-fields] |
| 会话标识的取得 | CLI `/copy-conversation-id` 复制当前会话 ID；`agent create-chat` 建空会话并返回其 ID | [@ref-cur-local_transcripts-slash-conversation-id] [@ref-cur-local_transcripts-params-create-chat] |
| 父子关联键 | `parent_conversation_id`（`subagentStart`）与子代理 transcript 路径（`subagentStop` 的 `agent_transcript_path`） | [@ref-cur-custom_agents-hooks-subagent-start] [@ref-cur-hooks-doc-event-subagentstop] |
| 会话记录文件名 | 示例值形如 `/path/to/subagent/transcript.txt`（子代理），主会话文件仅以 `transcript_path` 暴露 | [@ref-cur-hooks-doc-event-subagentstop] [@ref-cur-hooks-doc-env-vars-2] |
| SDK store 文件名 | 目录下四个固定 NDJSON 文件 `agents.ndjson`、`runs.ndjson`、`run_events.ndjson`、`checkpoints.ndjson` | [@ref-cur-local_transcripts-sdk-jsonl-files] |
| SDK 正文指针 | `agents` 行上的 `latestCheckpoint.rootBlobId` 指向 `checkpoints` 里的内容寻址 blob | [@ref-cur-local_transcripts-sdk-substore-tables] |

**缺口**：CLI/IDE 会话记录的实际目录名、文件名规则、时间戳是否进文件名、项目路径如何编码，全部未公开。`/resume` 只间接透出两类人类可读标签：跨工作区会话的文件夹标签 [@ref-cur-custom_agents-changelog-resume-context] 与 Created / Last updated 两列 [@ref-cur-local_transcripts-changelog-resume-cache]——它们是列表展示字段，不能反推磁盘命名。

**仍缺的具体 schema 缺口**（照实列出，不归纳跨产品通用 schema）：

- transcript 文件自身的记录类型、字段与必填项没有公开；`subagentStop` 里的 `/path/to/subagent/transcript.txt` 只是路径字符串，不含内容格式 [@ref-cur-hooks-doc-event-subagentstop]。
- 没有版本迁移规则。官方只对**事件字段**声明“会以向后兼容方式增加，消费者应忽略未知字段” [@ref-cur-local_transcripts-output-format-notes]，这条针对输出流，不能当作 transcript 文件的迁移保证。
- hook payload 的字段表没有说明哪些字段在 transcript 关闭时省略；已知只有 `workspaceOpen` 这类应用生命周期 hook 会因不在会话中而省略 `conversation_id`、`generation_id`、`model`、`session_id`、`transcript_path` [@ref-cur-hooks-doc-common-input]。
- 会话 id 复制入口只有 CLI 的 `/copy-conversation-id` [@ref-cur-local_transcripts-slash-conversation-id]；IDE 侧没有等价的公开入口。

## 生命周期：创建、追加、刷盘、关闭、恢复、分支、子代理与压缩 {#transcripts-lifecycle}

按来源可确证的时序：

| 阶段 | 机制 | 证据 | 界面 |
| :--- | :--- | :--- | :--- |
| 创建 | `sessionStart` 在新建 composer 会话时触发；CLI 可用 `agent create-chat` 建空会话并拿到其 ID | [@ref-cur-hooks-doc-event-sessionstart] [@ref-cur-local_transcripts-params-create-chat] | cli, cursor |
| 追加 | checkpoint 只写入新增条目 | [@ref-cur-local_transcripts-changelog-checkpoint-append] | cli |
| 刷盘 | checkpoint 是唯一被提到的落盘时机，触发条件与失败语义未公开 | [@ref-cur-local_transcripts-changelog-checkpoint-append] | cli |
| 关闭 | `sessionEnd` 带 `reason`：`completed`、`aborted`、`error`、`window_close`、`user_close` | [@ref-cur-local_transcripts-hooks-sessionend] | cli, cursor |
| 恢复 | `agent ls`、`agent --resume`、`/resume` 默认列出所有工作区的会话；`--continue` 等价于 `--resume=-1`；跨工作区会话带文件夹标签，恢复后载入完整对话 | [@ref-cur-custom_agents-changelog-resume-context] [@ref-cur-local_transcripts-params-resume] | cli |
| 分支 | `/fork`（别名 `/branch`、`/duplicate`）把当前对话分支成一份副本 | [@ref-cur-local_transcripts-changelog-fork] | cli |
| 回退 | `/rewind`（别名 `/undo`、`/restore`）可把文件与对话状态恢复到任一更早的轮次，含每轮文件 diff 与仅恢复对话两种方式，需在 `/config` 启用 | [@ref-cur-local_transcripts-changelog-rewind] | cli |
| 压缩 | `/summarize`（别名 `/compress`）把对话摘要化以减少上下文 | [@ref-cur-local_transcripts-slash-branch-compact] | cli |
| 交给子代理 | `subagentStart` 触发，携带 `parent_conversation_id`；`subagentStop` 在完成、报错或中止时触发并回报计数 | [@ref-cur-custom_agents-hooks-subagent-start] [@ref-cur-hooks-doc-event-subagentstop] | cli, cursor |
| 子代理续跑 | 已完成的子代理持久化 checkpoint，恢复时还原先前上下文；后台子代理运行中持续写状态，可完成后按 agent ID 续跑 | [@ref-cur-custom_agents-changelog-resume-context] [@ref-cur-custom_agents-subagents-resume] | cli, cursor |
| 侧聊 | side chat 作为持久会话存在，保留自己的 transcript，可被主线程 @ 引用拉回上下文 | [@ref-cur-local_transcripts-overview-side-chat] | cursor |

CLI 的会话操作入口集中在斜杠命令表：`/rename` 重命名当前会话、`/clear`（别名 `/new`、`/new-chat`、`/newchat`）开新会话、`/resume` 打开最近会话并恢复其一 [@ref-cur-local_transcripts-slash-chat-lifecycle]。恢复体验依赖一份被缓存的会话元数据，`/resume` 打开快且列有 Created 与 Last updated 两列 [@ref-cur-local_transcripts-changelog-resume-cache]；落盘的触发点仍是 checkpoint [@ref-cur-local_transcripts-changelog-persist-to-disk]。

**边界与缺口**：`/clear` 与 `/rename` 的文档措辞只说“开新会话”“重命名”，没有说明旧会话记录是被删除、归档还是仍留在 `/resume` 列表里，因此不能推断清理行为。`/rewind` 与 `/summarize` 之后记录如何变化（是否原地改写、是否新增轮次）没有公开。IDE 侧除 side chat 与子代理外，恢复/分支入口没有在本轮归档文档中出现。

## 数据库、索引与派生状态 {#transcripts-store-and-index}

**CLI 与 IDE 的会话记录是否使用数据库，本轮固定来源没有回答。** 归档文档里与“状态存储”相关的只有两条可证实表述：

- 恢复选择器缓存会话元数据，因此 `/resume`（Ctrl+Y）即使在网络文件系统上也快，列表带 Created 与 Last updated 两列并可靠排序 [@ref-cur-local_transcripts-changelog-resume-cache]。这是**派生的列表元数据缓存**，用于加速选择器，不能据此断定正文存储形态。
- IDE 在 Agents Window 里跨会话搜索过往 agent transcript，并明确说明 Cursor 会构建一个本地搜索索引 [@ref-cur-local_transcripts-overview-conversation-search]。索引的存储引擎、位置与增量更新策略都没有公开。

因此对“会话文件与数据库、索引、辅助状态怎样分工”“哪些文件或表是恢复所必需”“能否重建”，本轮只能给出 `partial`：已知的必需件是主会话 transcript 文件本身（由 `transcript_path` 指出）加上子代理自己的 transcript 文件 [@ref-cur-hooks-doc-event-subagentstop] 与子代理运行输出目录 [@ref-cur-custom_agents-subagents-faq-progress]；重建路径未公开。

**唯一有表级细节的第一方存储**仍是 SDK 的 `LocalAgentStore`，它精确说明了 Cursor 自己怎么组织“会话正文 + 元数据 + 事件日志” [@ref-cur-local_transcripts-sdk-store-table]，但作用域仅限 SDK 驱动的本地 agent [@ref-cur-local_transcripts-sdk-store-scope]。其分工值得记录，因为它是同厂给出的、唯一可复用的结构 [@ref-cur-local_transcripts-sdk-store-interface] [@ref-cur-local_transcripts-sdk-substore-tables]：

| 子存储 | 职责 | 与正文的分工 |
| :--- | :--- | :--- |
| `agents` | 每个 agent 一行，含一个精简的 `latestCheckpoint.rootBlobId` 指针 | 元数据 + 指向正文的指针 |
| `checkpoints` | 内容寻址的对话 blob | 保存对话正文 |
| `runs` | 每次运行一行 | 运行元数据 |
| `runEvents` | 追加写的运行事件日志 | 事件流，按排他 `afterOffset` 续读 |

换句话说，同一家产品在 SDK 侧选了“元数据行 + 内容寻址 blob + 追加事件日志”这套分工；这可以作为理解 CLI/IDE 记录形态的**参照**，但不是 CLI/IDE 实际实现的断言。`JsonlLocalAgentStore` 把这四类落成一个目录下的四个 NDJSON 文件 [@ref-cur-local_transcripts-sdk-jsonl-files]，缺省则是 workspace state root 之下的磁盘 SQLite [@ref-cur-local_transcripts-sdk-local-store-default]。

## 归档、删除与排错 {#transcripts-retention-and-diagnostics}

### 归档与备份

**本地会话记录没有原生归档开关**。本轮固定来源里唯一成体系的归档 API 属于云端 agent：`Agent.archive` 是软删除且 transcript 仍可读，`Agent.unarchive` 恢复，`Agent.delete` 永久删除、后续读取返回 404 [@ref-cur-local_transcripts-sdk-cloud-archive]。这三者作用于团队工作区里的云端 agent，其记录由 Cursor 服务端持久化，不适用于本机 CLI/IDE 会话文件；把它们当成本地归档手段会得到错误结论。云端与本地的这层区分在 SDK 文档里写得很直白：云端 agent 在服务端持久化，`local.store` 只对本地 agent 生效 [@ref-cur-local_transcripts-sdk-store-table]。

对本地记录，可用的只有两条外部手段，两条都没有官方恢复流程：

- 复制或备份文件。文档没有给出应复制哪些文件、也没有给出恢复步骤；由于会话记录的实际根目录未公开（见存储小节），无法从来源得出“完整备份”的文件清单。参考 SDK store 的分工 [@ref-cur-local_transcripts-sdk-store-table]，一份“可恢复”的备份至少需要同时覆盖对话正文与指向它的指针，只复制其中一类并不完整——但这是对 SDK 布局的类比，不是 CLI/IDE 的要求。
- 卸载器级别的整体删除：Windows 卸载程序可选地删除 Cursor 用户数据，包括存放 CLI 凭据的 `~/.cursor` 目录 [@ref-cur-local_transcripts-changelog-uninstall-data]。文档只点名凭据，**没有**说明它是否连带删除会话记录，所以既不能据此认为记录被保留，也不能认为它一定被删掉。

### 删除与保留

官方文档没有提供会话记录的删除命令或保留期设置。`/clear` 开新会话 [@ref-cur-local_transcripts-slash-chat-lifecycle] 是否清除旧记录未说明；云端的 `Agent.delete` 是永久删除且不可恢复 [@ref-cur-local_transcripts-sdk-cloud-archive]，但作用域是云端 agent。**本节不给出“可以安全删除某个文件”的结论**：在 transcript 根目录、文件命名与写入者（正在运行的 CLI、后台子代理、IDE 窗口）都未公开的情况下，手动删除的风险无法评估——读者至少应先关闭所有 Cursor 进程与后台子代理，否则写入者可能重建或写坏残留文件。

CLI 侧的清理能力按题面要求给 `partial`（有上述入口但语义未公开），IDE 侧给 `unknown`：本轮归档的 IDE 文档里没有任何删除、保留期或存储清理入口的表述。

### 排错

可用的读取与检查入口：

| 目的 | 入口 | 说明 | 界面 |
| :--- | :--- | :--- | :--- |
| 找 debug log | `/logs` | 显示本次会话的 debug log 路径并复制到剪贴板；debug log 按用户分别写 [@ref-cur-configuration-changelog-logs] [@ref-cur-local_transcripts-changelog-logs-per-user] | cli |
| 看会话清单与时间 | `/resume` | 列出会话，带 Created 与 Last updated 列，可判断记录是否仍可被发现 [@ref-cur-local_transcripts-changelog-resume-cache] | cli |
| 取会话标识 | `/copy-conversation-id` | 复制当前会话 ID，便于比对与报障 [@ref-cur-local_transcripts-slash-conversation-id] | cli |
| 看子代理进度 | 读 `~/.cursor/subagents/` 下的输出文件 | 父代理用它检查后台子代理 [@ref-cur-custom_agents-subagents-faq-progress] | cli, cursor |
| 定位沙箱问题 | `sandbox run --sb-debug` | 沙箱 debug 日志写入临时目录并打印路径 [@ref-cur-local_transcripts-params-sb-debug] | cli |
| 定位自托管 worker | `agent worker --data-dir` | 日志、制品与录制数据的基目录 [@ref-cur-local_transcripts-params-worker-data-dir] | cli |
| 程序化读取单次运行 | SDK `run.conversation()` | 返回该 run 的 `ConversationTurn[]`，不订阅实时流即可渲染或持久化结构化历史 | SDK 侧；`local.store` 缺省为磁盘 SQLite |

最后一条的边界要写清：`run.conversation()` 属于 SDK 运行对象 [@ref-cur-local_transcripts-sdk-conversation-method]，它读的是 SDK store 里的运行记录，不能用它读取 CLI 或 IDE 的聊天会话。

**检查完整性**：本轮来源没有提供任何校验手段（无记录格式校验、无索引一致性检查、无损坏恢复说明）。可观察的健康信号只有“`/resume` 能否列出并恢复该会话”——changelog 记录过一个相关症状：从其它目录恢复会话会载入空对话而非完整对话 [@ref-cur-local_transcripts-changelog-resume-cache]。这类问题目前只能靠对照会话 ID 与时间戳定位，无法验证记录本身是否完整。
