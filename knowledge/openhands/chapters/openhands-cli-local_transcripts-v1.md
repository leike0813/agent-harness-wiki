---
schema_version: 3
record_kind: production
edition_id: openhands-cli-local_transcripts-v1
harness_id: openhands
topic: local_transcripts
title: "OpenHands CLI 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-scope
    surface_ids: [cli]
    source_refs: [ref-openhands-lt-setup-conversation-persistence, ref-openhands-lt-local-store-load-events, ref-openhands-lt-local-store-validate-event, ref-openhands-lt-prompt-history-store, ref-openhands-lt-cloud-store-unimplemented, ref-openhands-lt-cloud-conversation-server-side, ref-openhands-lt-docs-config-files, ref-openhands-docs-env-core]
  - section_id: transcripts-layout
    surface_ids: [cli]
    source_refs: [ref-openhands-lt-locations-state-dirs, ref-openhands-lt-locations-project-scope, ref-openhands-lt-local-store-create, ref-openhands-lt-local-store-load-events, ref-openhands-lt-prompt-history-append, ref-openhands-lt-prompt-history-store, ref-openhands-lt-setup-conversation-persistence, ref-openhands-lt-tui-conversation-dir, ref-openhands-lt-agent-store-base-state, ref-openhands-lt-legacy-system-prompt-probe, ref-openhands-lt-docs-config-files]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-openhands-lt-prompt-history-store, ref-openhands-lt-local-store-parse-metadata, ref-openhands-lt-local-store-validate-event, ref-openhands-lt-conversation-metadata, ref-openhands-lt-agent-store-base-state-tools, ref-openhands-lt-legacy-system-prompt-probe, ref-openhands-cli-conversation-persistence]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-openhands-lt-local-store-create, ref-openhands-lt-setup-conversation-persistence, ref-openhands-lt-resume-args, ref-openhands-lt-resume-logic, ref-openhands-lt-docs-resume-flags, ref-openhands-lt-condense-command, ref-openhands-lt-docs-interactive-commands, ref-openhands-cli-conversation-persistence]
  - section_id: transcripts-recovery-store
    surface_ids: [cli]
    source_refs: [ref-openhands-lt-agent-store-base-state, ref-openhands-lt-agent-store-base-state-tools, ref-openhands-cli-conversation-persistence, ref-openhands-lt-local-store-load-events, ref-openhands-lt-tui-conversation-dir, ref-openhands-lt-locations-state-dirs, ref-openhands-lt-locations-project-scope, ref-openhands-lt-local-store-parse-metadata, ref-openhands-lt-conversation-metadata, ref-openhands-lt-viewer-read-events, ref-openhands-lt-cloud-store-unimplemented]
  - section_id: transcripts-cleanup-diagnostics
    surface_ids: [cli]
    source_refs: [ref-openhands-lt-locations-state-dirs, ref-openhands-lt-resume-logic, ref-openhands-lt-view-subcommand, ref-openhands-lt-viewer-read-events, ref-openhands-lt-local-store-event-count, ref-openhands-lt-local-store-validate-event, ref-openhands-lt-local-store-parse-metadata, ref-openhands-lt-prompt-history-append]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-openhands-lt-local-store-load-events, ref-openhands-lt-local-store-validate-event, ref-openhands-lt-prompt-history-store, ref-openhands-lt-cloud-store-unimplemented, ref-openhands-lt-cloud-conversation-server-side, ref-openhands-docs-env-core]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout
        status: answered
        source_refs: [ref-openhands-lt-locations-state-dirs, ref-openhands-lt-locations-project-scope, ref-openhands-lt-tui-conversation-dir, ref-openhands-lt-docs-config-files]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout
        status: answered
        source_refs: [ref-openhands-lt-local-store-create, ref-openhands-lt-tui-conversation-dir, ref-openhands-lt-agent-store-base-state, ref-openhands-lt-legacy-system-prompt-probe]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-layout
        status: partial
        source_refs: [ref-openhands-lt-local-store-load-events, ref-openhands-lt-local-store-create, ref-openhands-lt-prompt-history-append]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-openhands-lt-local-store-parse-metadata, ref-openhands-lt-local-store-validate-event, ref-openhands-lt-conversation-metadata, ref-openhands-lt-agent-store-base-state-tools, ref-openhands-lt-legacy-system-prompt-probe]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-openhands-lt-local-store-create, ref-openhands-lt-setup-conversation-persistence, ref-openhands-lt-resume-logic, ref-openhands-lt-condense-command, ref-openhands-cli-conversation-persistence]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recovery-store
        status: partial
        source_refs: [ref-openhands-lt-agent-store-base-state, ref-openhands-lt-agent-store-base-state-tools, ref-openhands-lt-local-store-load-events, ref-openhands-cli-conversation-persistence, ref-openhands-lt-cloud-store-unimplemented]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-recovery-store
        status: partial
        source_refs: [ref-openhands-lt-tui-conversation-dir, ref-openhands-lt-agent-store-base-state, ref-openhands-lt-cloud-store-unimplemented, ref-openhands-lt-locations-state-dirs, ref-openhands-lt-locations-project-scope, ref-openhands-lt-viewer-read-events]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-diagnostics
        status: partial
        source_refs: [ref-openhands-lt-prompt-history-append, ref-openhands-lt-local-store-parse-metadata, ref-openhands-lt-local-store-validate-event, ref-openhands-lt-viewer-read-events]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup-diagnostics
        status: answered
        source_refs: [ref-openhands-lt-view-subcommand, ref-openhands-lt-viewer-read-events, ref-openhands-lt-local-store-event-count, ref-openhands-lt-local-store-parse-metadata]
---

## 固定来源与调查范围 {#transcripts-scope}

本页只回答 catalog 中登记的 CLI 界面（`surface_id: cli`），不覆盖同产品的 web 界面。固定来源是 OpenHands 官方仓库 `OpenHands/OpenHands-CLI` 在 commit `954f2ba646e8d749261a8f2b2b7e3031fa39be9f` 的源码树（pinned 检出，抓取时间 2026-10-06），每条源码证据绑定到按文件区分的 `kind: source_revision` 快照；文档证据来自命令参考页快照（`https://docs.openhands.dev/openhands/usage/cli/command-reference.md`），其 `version_applicability` 为 unknown，因此文档只用于佐证用户可见的入口与默认路径，不用来证明某个发行包版本的行为。commit 只代表源码树，本页不写 `mappings/`。路径形态在 Linux 上取证，Windows 与 macOS 未验证。

本产品要先分清三层存储，下面的结论都按这个划分给出：

1. **本机会话记录**：`~/.openhands/conversations/<会话 ID>/` 下的事件文件与会话状态文件，由 CLI 侧的 `LocalFileStore` 读取 [@ref-openhands-lt-local-store-load-events]。
2. **本机项目级输入历史**：`<状态目录>/projects/<工作目录路径的 sha256>/prompt_history.json`，与会话目录平行，存的是用户输入 [@ref-openhands-lt-prompt-history-store]。
3. **运行时会话状态**：智能体真正执行动作的工作区由 `Workspace(working_dir=get_work_dir())` 绑定，默认当前目录 [@ref-openhands-lt-setup-conversation-persistence]；`openhands cloud` 创建的会话由服务端持有并只回一个浏览器链接，本机没有对应文件 [@ref-openhands-lt-cloud-conversation-server-side]。第 3 类不是本机 transcript，不应与会话记录混为一谈。

记录范围与开关：

- 落盘的是会话事件流：每个事件一个 JSON 文件，读取时按文件名字典序排序后逐个反序列化为 SDK 的 `Event` 对象 [@ref-openhands-lt-local-store-load-events]。事件的完整类型集合与字段由 `openhands-sdk` 的 `Event` 联合类型定义，CLI 侧不定义，本轮没有固定 SDK 源码，详见 schema 小节的缺口 [@ref-openhands-lt-local-store-validate-event]。
- 用户输入历史单独落一个文件，字段只有 `text` 与 `timestamp`，与事件流无关 [@ref-openhands-lt-prompt-history-store]。
- CLI 侧没有“关闭会话记录”的开关：只要会话建立，事件写入就跟随 `persistence_dir`；源码里没有按环境变量或配置项停写事件文件的分支。要停写只能改 `OPENHANDS_CONVERSATIONS_DIR` 指向别处，或改用会话由服务端持有的 `cloud` 模式（CLI 侧的云端 store 本身仍未实现） [@ref-openhands-lt-cloud-store-unimplemented] [@ref-openhands-lt-cloud-conversation-server-side]。
- 官方环境变量页列出了 `SAVE_TRAJECTORY_PATH`（默认 `./trajectories`）与 `REPLAY_TRAJECTORY_PATH`，并说明 `CACHE_DIR`、`FILE_STORE_PATH` 等路径 [@ref-openhands-docs-env-core]；但 CLI 源码在本 commit 下没有引用这些变量，它们属于 SDK／agent server 侧的轨迹导出与缓存，**不能据此断定 CLI 界面会写这些文件**。
- TUI 自身的界面状态（滚动位置、展开的面板）不进事件流；`/history` 只是切换历史面板 [@ref-openhands-lt-docs-config-files]。

## 存储位置、命名与格式 {#transcripts-layout}

路径全部由 `openhands_cli/locations.py` 派生，没有第二处实现 [@ref-openhands-lt-locations-state-dirs] [@ref-openhands-lt-locations-project-scope]：

| 用途 | 路径 | 覆盖方式 |
| --- | --- | --- |
| 状态根目录 | `~/.openhands` | `OPENHANDS_PERSISTENCE_DIR` |
| 会话记录 | `<状态根目录>/conversations` | `OPENHANDS_CONVERSATIONS_DIR` |
| 项目输入历史 | `<状态根目录>/projects/{sha256(工作目录绝对真实路径)}/prompt_history.json` | 随 `OPENHANDS_WORK_DIR` 变化 |
| 会话工作区 | 默认当前目录 | `OPENHANDS_WORK_DIR` |

会话目录的形状：`LocalFileStore.create()` 建 `<会话目录>/<会话 ID>/`，并预先建好 `events/` 子目录 [@ref-openhands-lt-local-store-create]；CLI 创建会话时把 `persistence_dir=get_conversations_dir()` 交给 SDK，由 SDK 追加会话 ID 拼出最终目录，TUI 侧用 `BaseConversation.get_persistence_dir(base, id)` 计算同一路径 [@ref-openhands-lt-setup-conversation-persistence] [@ref-openhands-lt-tui-conversation-dir]。官方命令参考页把 `~/.openhands/conversations/` 列为 “Conversation history” [@ref-openhands-lt-docs-config-files]。同一状态根目录下的 `agent_settings.json`、`cli_config.json`、`mcp.json` 以及环境变量覆盖的优先级属于“配置机制”主题（`config.sources`、`config.overrides`），本节只覆盖维持会话记录所需的路径。

命名：

- 会话 ID 由 `uuid.uuid4().hex` 生成（无横线的 hex 形式） [@ref-openhands-lt-local-store-create]；TUI 启动时先算 `uuid.uuid4()` 再交给 SDK [@ref-openhands-lt-tui-conversation-dir]。CLI 的读侧对两种写法都兼容，显式把 ID 里的横线去掉再拼路径，注释写明“目录名用无横线 hex，调用方可能传 `str(UUID)`” [@ref-openhands-lt-agent-store-base-state]。
- 会话目录内至少两个条目：`base_state.json`（文件名来自 SDK 常量 `BASE_STATE`，CLI 侧只按常量引用） [@ref-openhands-lt-agent-store-base-state] 与 `events/` 目录。
- 事件文件名为 `event-*.json`；首个事件文件匹配 `event-00000-*.json`，CLI 从中读系统提示事件 [@ref-openhands-lt-legacy-system-prompt-probe]。索引是 5 位零填充序号，五位以后的后缀由 SDK 生成，本轮没有固定 SDK 源码，不能断言它的具体形式。
- 项目级输入历史按工作目录路径的 sha256 命名项目目录，因此同一路径恒定、换路径即换目录；跨机器迁移后工作目录路径不同会落到不同的项目目录 [@ref-openhands-lt-locations-project-scope]。

格式：

- 会话正文是一组 UTF-8 JSON 文件（每个事件一个文件），不是 JSONL、不是数据库。读取端先 `glob("event-*.json")` 再对文件名排序，因此时序由文件名的字典序决定，而不是由文件写入时间决定 [@ref-openhands-lt-local-store-load-events]。
- `base_state.json` 是单个 JSON 文档，用 `json.load` 整体读入 [@ref-openhands-lt-agent-store-base-state]。
- `prompt_history.json` 是 JSON 数组，写入时 `json.dump(..., indent=2)` **整文件覆盖**，超过 `max_entries`（默认 100）时只保留最后 100 条 [@ref-openhands-lt-prompt-history-store] [@ref-openhands-lt-prompt-history-append]。
- 事件文件的写入方是 SDK 的 `Conversation`：CLI 只传 `persistence_dir`、`conversation_id` 和回调 [@ref-openhands-lt-setup-conversation-persistence]。因此**追加写入、刷盘时机、是否压缩或分片在 CLI 源码里不可见**，本 commit 下也没有分片或压缩配置的证据。这一段是 format 题记为 partial 的原因。

## 记录 schema {#transcripts-record-schema}

CLI 自己定义的第一方记录类型只有两个：

| 记录 | 字段 | 必填 | 说明 |
| --- | --- | --- | --- |
| `ConversationMetadata` [@ref-openhands-lt-conversation-metadata] | `id: str` | 是 | 取会话目录名 |
| | `created_at: datetime` | 是 | 取首个事件文件的 `timestamp` |
| | `title: str \| None` | 否 | 扫描事件文件后取第一条 `source == "user"` 消息的文本 |
| | `last_modified: datetime \| None` | 否 | CLI 的本地读取路径不填，恒为 `None` |
| `PromptHistoryEntry` [@ref-openhands-lt-prompt-history-store] | `text: str` | 是 | 用户输入原文 |
| | `timestamp: str` | 是 | `datetime.now().isoformat()`，无时区后缀 |

事件文件的 schema 由 `openhands.sdk.Event` 联合类型决定，CLI 侧用 `TypeAdapter(Event)` 校验 [@ref-openhands-lt-local-store-validate-event]。CLI 源码能证实的字段线索只有三处：

- 每个事件 JSON 顶层有 `timestamp`，取值按 ISO 8601 解析（读入时把结尾的 `Z` 换成 `+00:00`），缺这个字段时该会话被视为没有元数据 [@ref-openhands-lt-local-store-parse-metadata]。
- 系统提示事件顶层带 `tools` 数组，元素是带 `title` 的对象，CLI 靠它判断旧会话是否用过 delegate 工具 [@ref-openhands-lt-legacy-system-prompt-probe]。
- `base_state.json` 顶层有 `agent` 对象，其中 `agent.tools` 是工具定义数组，可逐项 `Tool.model_validate` [@ref-openhands-lt-agent-store-base-state-tools]。

脱敏最小示例（占位值，形状来自上面三处线索，不是完整 schema）：

```text
<状态目录>/conversations/<32 位 hex 会话 ID>/
├── base_state.json      # {"agent": {"tools": [...]}, ...}
└── events/
    ├── event-00000-<后缀>.json   # 系统提示事件，顶层带 tools
    ├── event-00001-<后缀>.json
    └── event-000NN-<后缀>.json   # 顶层带 timestamp
```

仍缺的具体 schema 缺口（照实列出）：

- 事件类型的完整清单、每个类型的必填字段与判别方式、字段版本与迁移规则，全部在 `openhands-sdk` 内，本轮没有固定该仓库的来源。
- 事件文件名的 `<后缀>` 生成规则未知。
- `base_state.json` 除 `agent.tools` 外的字段（事件列表、统计、condenser 状态等）在本轮证据中未被读取，只能确认它不止含 `tools` [@ref-openhands-cli-conversation-persistence]。
- 没有 schema 版本字段的证据，也没有读取旧格式并升级的迁移代码在本候选证据范围内；CLI 里确实存在为兼容旧 delegate 会话格式而保留的探测逻辑 [@ref-openhands-cli-conversation-persistence]，说明历史上存在过格式差异，但迁移路径本身未取证。

## 生命周期 {#transcripts-lifecycle}

- 创建：CLI 建会话时把 `persistence_dir` 与 `conversation_id` 交给 SDK 的 `Conversation` [@ref-openhands-lt-setup-conversation-persistence]；直接用 store 建目录时会先生成 hex ID、建会话目录与 `events/` 子目录 [@ref-openhands-lt-local-store-create]。
- 追加：事件由 SDK 写进 `events/`，CLI 侧只注册回调消费事件。追加顺序、刷盘时机不可见（见 format 小节）。
- 恢复：`--resume <会话 ID>` 直接指定会话；`--resume` 不带值时列出最近会话并退出；`--resume --last` 取按创建时间倒序的第一个会话 [@ref-openhands-lt-resume-args] [@ref-openhands-lt-resume-logic] [@ref-openhands-lt-docs-resume-flags]。恢复时工具集不是取当前默认值，而是从该会话 `base_state.json` 里读回创建时的 `tools`，以免出现“当初可用、现在没了”的工具（例如 delegate） [@ref-openhands-cli-conversation-persistence]。
- 新建：`/new` 开一个新会话，`/history` 切换历史面板，`/condense` 触发上下文压缩 [@ref-openhands-lt-condense-command] [@ref-openhands-lt-docs-interactive-commands]。压缩后的延续由 condenser 实现，CLI 侧只把 condenser 随运行时配置注入会话，本轮没有证据说明压缩是否改写既有事件文件（推测是追加新事件，未证实）。
- 关闭：源码里没有“关闭并落盘”的显式步骤，事件写入随进程结束自然停止；没有 flush 或 finalize 的 CLI 侧调用。
- 分支与父子会话：CLI 侧没有找到分支（fork）或从某条事件分叉的入口，也没有父子会话的关联字段。这是**未找到入口**，不等于上游不支持（见下文缺口）。
- 交给子代理：delegate 工具由 SDK 提供，CLI 只注册内置子代理类型并在恢复时用持久化的工具集 [@ref-openhands-cli-conversation-persistence]；子代理自身是否单独落盘、子代理事件是否写进主会话的同一事件流，本轮无证据。

生命周期一题记为 partial 的原因：写入与刷盘在 SDK 侧、压缩后的延续方式、父子会话与分支关系都缺少可引用的固定来源。已查入口：`openhands_cli/entrypoint.py` 的恢复分支、`argparsers/util.py` 的恢复参数、`tui/core/commands.py` 的斜杠命令表、`tui/textual_app.py` 的会话目录计算。

## 恢复依赖、备份与归档 {#transcripts-recovery-store}

**没有数据库。** 会话记录在本 commit 下全部是文件：`LocalFileStore` 走 `pathlib`，读的是目录和 JSON 文件，没有 SQLite、索引表或 FTS 之类的旁路结构 [@ref-openhands-lt-local-store-load-events]。唯一另一个 store 实现 `CloudStore` 在固定来源里每个方法都直接 `raise NotImplementedError("Cloud storage is not yet implemented")`，所以本机不存在“文件 + 数据库”双写的形态 [@ref-openhands-lt-cloud-store-unimplemented]。

分工与恢复必需件：

| 组成 | 作用 | 恢复会话是否必需 | 能否重建 |
| --- | --- | --- | --- |
| `events/event-*.json` | 会话正文：用户消息、工具事件、系统提示 | 是 | 不能，源码没有从其它地方重建事件的路径 |
| `base_state.json` | 会话状态，其中 `agent.tools` 决定恢复时的工具集 | 是（缺它会用当前默认工具，行为会变） [@ref-openhands-cli-conversation-persistence] | 不能 |
| `events/` 目录本身 | 元数据解析的前置条件 | 是 | 见 cleanup 小节 |
| `projects/{sha256}/prompt_history.json` | 输入历史 | 否 | 与会话恢复无关 |

注意 `ConversationMetadata` 是**读取时派生**的：列表里的标题、创建时间都来自事件文件，没有独立的元数据文件需要同步 [@ref-openhands-lt-local-store-parse-metadata] [@ref-openhands-lt-conversation-metadata]。这要求会话目录本身与 `base_state.json` 的位置必须与 `persistence_dir`、会话 ID 对得上：TUI 侧由 SDK 的 `get_persistence_dir` 计算 [@ref-openhands-lt-tui-conversation-dir]，CLI 读侧按 `BASE_STATE` 常量拼路径 [@ref-openhands-lt-agent-store-base-state] 并从中读回工具集 [@ref-openhands-lt-agent-store-base-state-tools]。这对备份有直接影响——只需要复制会话目录，不需要额外同步索引。

归档：固定来源里没有归档开关、导出命令、压缩打包或保留策略，也没有把会话目录移动到别处的代码。可行的只有两件事：

- **外部备份**：停掉 CLI 后整目录复制 `<状态目录>/conversations/`。恢复时把 `OPENHANDS_CONVERSATIONS_DIR` 指到备份位置即可，路径由环境变量决定而不是写死在记录里 [@ref-openhands-lt-locations-state-dirs]。
- **只读查看**：`view` 子命令按事件文件读，不写回 [@ref-openhands-lt-viewer-read-events]（见下节）。

损失面：路径信息只存在于“事件文件名序号 + 目录名”，不随机器走；项目级输入历史依赖工作目录路径的 sha256，换机器或换路径后同一个项目会落到不同目录，需要把状态根下的 `projects/` 树一起备份 [@ref-openhands-lt-locations-project-scope]；事件文件是会话内容的唯一副本，损坏即永久丢失，源码没有校验或修复工具。

## 清理与诊断 {#transcripts-cleanup-diagnostics}

官方删除与保留机制：在固定来源里没有找到删除单个会话、删除全部会话、设置保留天数或按时间清理的命令与 API（已查 `argparsers/` 全部子命令、`conversations/` 模块与 `stores/` 模块；命中 `unlink()` 的只有认证 token 文件和输入框的临时文件，与会话记录无关）。唯一的自动保留机制是输入历史：写入时超过 100 条只保留最后 100 条 [@ref-openhands-lt-prompt-history-append]。

手动删除的后果（按删除对象区分）：

- 删掉整个会话目录：`--resume --last`、`--resume` 的列表、`view` 都找不到它，因为这些入口全部以 `<会话目录>` 存在且含 `events/` 为准 [@ref-openhands-lt-resume-logic]。
- 只删 `events/` 目录、留下 `base_state.json`：会话仍在磁盘上，但元数据解析直接返回 `None`，于是它从列表里消失，`--last` 也不会选中它 [@ref-openhands-lt-local-store-parse-metadata]。这是一处典型的孤儿状态——文件还在、入口看不见。
- 删掉个别事件文件：事件计数按 `event-*.json` 的文件数算，读单个文件失败（`OSError`、`JSONDecodeError`、`ValueError`）时静默跳过并继续，**不会报错** [@ref-openhands-lt-local-store-validate-event] [@ref-openhands-lt-viewer-read-events]。因此“少了几条事件”只表现为显示变少，不是显式失败。
- 删除前必须先停掉写入者：正在运行的会话进程由 SDK 往 `events/` 和 `base_state.json` 写，删除或搬移这些文件会产生半写或竞态；源码里没有提供在线删除的安全点，也没有备份—删除—校验流程。这一段是 cleanup 记为 partial 的原因：**没找到官方删除机制不等于可以安全直接删**。

定位与读取：

1. 列出会话：`openhands --resume`（不带值）打印最近会话，默认 15 条，含 ID、相对时间与首条用户消息预览（超过 60 字符截断）。
2. 读单个会话：`openhands view <会话 ID> [--limit N]`，`--limit` 默认 20 [@ref-openhands-lt-viewer-read-events] [@ref-openhands-lt-view-subcommand]。
3. 状态判断：事件总数就是 `event-*.json` 的文件数 [@ref-openhands-lt-local-store-event-count]；目录里没有事件文件时，该会话不进入列表 [@ref-openhands-lt-local-store-parse-metadata]。
4. 一个事件都没解析出来时 `view` 打印 “No valid events could be displayed.”，加载过程中抛异常则打印 “Error loading events: …” 并显示已渲染的部分 [@ref-openhands-lt-viewer-read-events]。这两条是判断“文件损坏”与“文件缺失”的分界：缺失时前一条，损坏时后一条。
5. 跨机核对：把 `OPENHANDS_CONVERSATIONS_DIR` 指向待检查的目录后再执行上面的只读命令，即可在不改动原状态目录的前提下验证备份 [@ref-openhands-lt-locations-state-dirs]。
