---
schema_version: 3
record_kind: production
edition_id: factory-droid-local_transcripts-v1
harness_id: factory-droid
topic: local_transcripts
title: "Droid CLI 的本地 Transcript：会话记录位置、格式、生命周期与保留"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-fd-lt-hook-common-fields, ref-fd-lt-hook-pret-tooluse-input, ref-fd-lt-settings-where-live, ref-fd-lt-privacy-local-execution, ref-fd-lt-cli-resume-flags, ref-fd-lt-exec-json-session-id, ref-fd-lt-exec-run-tags]
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs: [ref-fd-lt-cli-search-command, ref-fd-lt-cli-search-entry-kinds, ref-fd-lt-hook-output-surfaces, ref-fd-lt-settings-tool-result-display, ref-fd-lt-power-user-session-keys, ref-fd-lt-settings-cloud-session-sync, ref-fd-lt-settings-cloudsession-sync-row]
  - section_id: transcripts-record-schema
    surface_ids: [cli]
    source_refs: [ref-fd-lt-hook-common-fields, ref-fd-lt-hook-pret-tooluse-input, ref-fd-lt-hook-precompact-input, ref-fd-lt-cli-search-entry-kinds, ref-fd-lt-guide-read-transcript-tokens, ref-fd-lt-exec-json-session-id]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs: [ref-fd-lt-hook-sessionstart-matchers, ref-fd-lt-hook-sessionend-reasons, ref-fd-lt-hook-stop-input, ref-fd-lt-hook-precompact-input, ref-fd-lt-settings-compaction, ref-fd-lt-cli-resume-fork-commands, ref-fd-lt-cli-exec-session-id, ref-fd-lt-cli-resume-flags, ref-fd-lt-exec-sessions-tagging, ref-fd-lt-power-user-session-management, ref-fd-lt-custom-droids-subagent-resume]
  - section_id: transcripts-index-and-database
    surface_ids: [cli]
    source_refs: [ref-fd-lt-cli-search-command, ref-fd-lt-cli-search-reindex, ref-fd-lt-changelog-search-cache, ref-fd-lt-changelog-sessions-index, ref-fd-lt-changelog-session-storage-reliability, ref-fd-lt-guide-session-cost-db]
  - section_id: transcripts-retention-and-cleanup
    surface_ids: [cli]
    source_refs: [ref-fd-lt-cli-session-list-keys, ref-fd-lt-cli-session-slash-commands, ref-fd-lt-settings-session-retention, ref-fd-lt-privacy-data-retention, ref-fd-lt-changelog-bug-zip, ref-fd-lt-settings-cloud-session-sync]
  - section_id: transcripts-read-and-diagnostics
    surface_ids: [cli]
    source_refs: [ref-fd-lt-guide-read-transcript-tokens, ref-fd-lt-cli-search-reindex, ref-fd-lt-hook-debug-output, ref-fd-lt-cli-resume-fork-commands, ref-fd-lt-exec-json-session-id, ref-fd-lt-exec-run-tags]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: partial
        source_refs: [ref-fd-lt-cli-search-command, ref-fd-lt-cli-search-entry-kinds, ref-fd-lt-hook-output-surfaces, ref-fd-lt-settings-tool-result-display]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-fd-lt-hook-pret-tooluse-input, ref-fd-lt-settings-where-live, ref-fd-lt-privacy-local-execution]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs: [ref-fd-lt-hook-pret-tooluse-input, ref-fd-lt-exec-json-session-id, ref-fd-lt-exec-run-tags, ref-fd-lt-cli-resume-flags]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-fd-lt-hook-pret-tooluse-input, ref-fd-lt-guide-read-transcript-tokens]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-schema
        status: partial
        source_refs: [ref-fd-lt-hook-common-fields, ref-fd-lt-hook-pret-tooluse-input, ref-fd-lt-hook-precompact-input, ref-fd-lt-cli-search-entry-kinds, ref-fd-lt-guide-read-transcript-tokens]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-fd-lt-hook-sessionstart-matchers, ref-fd-lt-hook-sessionend-reasons, ref-fd-lt-hook-precompact-input, ref-fd-lt-cli-resume-fork-commands, ref-fd-lt-exec-sessions-tagging, ref-fd-lt-custom-droids-subagent-resume]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-index-and-database
        status: partial
        source_refs: [ref-fd-lt-cli-search-reindex, ref-fd-lt-changelog-sessions-index, ref-fd-lt-changelog-session-storage-reliability, ref-fd-lt-guide-session-cost-db]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-cleanup
        status: partial
        source_refs: [ref-fd-lt-settings-cloud-session-sync, ref-fd-lt-cli-session-list-keys, ref-fd-lt-changelog-bug-zip]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-cleanup
        status: partial
        source_refs: [ref-fd-lt-cli-session-list-keys, ref-fd-lt-cli-session-slash-commands, ref-fd-lt-settings-session-retention, ref-fd-lt-privacy-data-retention]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-read-and-diagnostics
        status: partial
        source_refs: [ref-fd-lt-guide-read-transcript-tokens, ref-fd-lt-cli-search-reindex, ref-fd-lt-hook-debug-output, ref-fd-lt-cli-resume-fork-commands]
---

## 本章的固定来源边界

本章只调查 catalog 里登记的 `cli` 界面（Droid CLI）。`factory-droid` 的其它已声明界面本轮未调查，查询会派生为 `not_investigated`。

固定来源是官方文档仓库 `https://github.com/Factory-AI/factory` 在 commit `c6ea47082007a32a8a76bb99da42e387565f119a` 的文档树（`snapshot-factory-droid-lt-*`，抓取时间 2026-10-06T04:33:48Z）。这一棵树只有 `.mdx` 文档，没有 CLI 实现代码，因此本章结论是**文档证实的行为**，不是对某个 npm 发行包二进制行为的观察；`droid` 发行包版本与本 commit 的对应关系本轮未证实，所以本章不写 `mappings/`。

一个必须先讲清的限制：官方文档**从未给出 CLI 会话文件的完整路径模板、字段级 schema 或存储布局**。唯一直接暴露会话记录路径的一手材料是 hook 输入里的 `transcript_path` 字段，示例值形如 `~/.factory/projects/.../SESSION-UUID.jsonl`，其中项目段被省略为 `...`。下文凡涉及"确切路径/确切字段"的地方都按 partial 处理并写明缺口。

## 会话记录的存储位置与路径锚点 {#transcripts-storage-layout}

Droid CLI 把会话正文记成本机文件，这一点有直接的官方证据：hook 输入把 `transcript_path` 定义为 `// Path to conversation JSON`，即当前会话的对话记录文件路径 [@ref-fd-lt-hook-common-fields]。官方示例值是 `~/.factory/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl`，也就是**用户级 `.factory` 目录下的 `projects/` 子树，按会话 UUID 命名为单个 `.jsonl` 文件** [@ref-fd-lt-hook-pret-tooluse-input]。

路径锚点随操作系统变化，但变化的只是 `.factory` 根：macOS / Linux 是 `~/.factory/`，Windows 是 `%USERPROFILE%\.factory\` [@ref-fd-lt-settings-where-live]。`projects/` 是否跟随同一根目录，官方没有单独说明；从示例值的一致形态看是同一根，但这是推断，不是文档结论。

部署形态不改变记录落在本机这一点：官方隐私文档说明 agent 循环与运行时完全在 Droid 运行的那台机器上执行，代码不上传、也不在 Factory 云端保留仓库副本 [@ref-fd-lt-privacy-local-execution]。因此 transcript 的生成不依赖远端服务可用。

会话与文件的命名可以从三处互相印证：transcript 文件名是会话 UUID 加 `.jsonl` 后缀 [@ref-fd-lt-hook-pret-tooluse-input]；`droid exec --output-format json` 的结果对象里 `session_id` 同样是 UUID [@ref-fd-lt-exec-json-session-id]；批量运行还可用 `--tag` 给运行附加可搜索标签、用 `--log-group-id` 把相关运行归组 [@ref-fd-lt-exec-run-tags]。父/子会话与分支的关联不靠文件名表达：`droid resume --last` 选的是"当前文件夹"里的最近会话 [@ref-fd-lt-cli-resume-flags]，说明归属靠记录所属的工作目录上下文，fork 出来的新会话则换用新的 session ID。

**缺口**：文档从未写出 `projects/` 下面按什么规则切分目录——示例里的 `...` 省略了项目路径。目录名如何编码项目路径、跨机器移动 transcript 后能否被识别、父子会话与子代理 transcript 在文件树上的对应关系，都无来源可证。本节因此是 partial。

## 记录了哪些内容，以及记录开关 {#transcripts-record-scope}

会话记录的内容可以从官方检索命令反推：`droid search` 检索"本地会话（消息、文档、工具结果）"，并支持按条目类型过滤 —— `message_text`、`document`、`tool_use`、`tool_result` 或 `all` [@ref-fd-lt-cli-search-command][@ref-fd-lt-cli-search-entry-kinds]。这四类是可索引条目的官方枚举，等于对记录内容分类的一次正面确认：对话消息、写入的文档、工具调用与工具结果都进记录。

工具结果进入 transcript 后，展示粒度由设置控制：`toolResultDisplay` 取 `expanded` 或 `compact`，默认 `expanded`，描述是"工具结果在 transcript 中如何渲染" [@ref-fd-lt-settings-tool-result-display]。这是渲染层开关，不改变是否记录。

hook 的输出也是记录内容的一部分，而且去向按事件分叉：PreToolUse / PostToolUse / Stop / SubagentStop 的输出显示在 transcript 中，Notification / SessionEnd 只进 `--debug` 日志，UserPromptSubmit / SessionStart 的 stdout 则作为上下文加给模型 [@ref-fd-lt-hook-output-surfaces]。也就是说同一个 hook 的输出可能落在记录里、只落在日志里，或直接进模型上下文，三者不是同一份数据。

唯一成文的记录去向开关是云端镜像：`cloudSessionSync` 默认 `true`，每个 CLI 会话都会镜像到 Factory web 以便在浏览器里回看；设为 `false` 时"只保留本地会话" [@ref-fd-lt-settings-cloud-session-sync][@ref-fd-lt-settings-cloudsession-sync-row]。它是**副本开关，不是本地记录开关**——设为 `false` 不代表停止本机记录。

**缺口**：文档没有说明哪些内容**不**落盘：密钥与凭据是否在写入前被替换、subagent 内部轮次是否单独成文件、`/btw` 侧问缓冲是否进主 transcript，都没有一手来源。附件（粘贴图片等）存在哪里、是否内联进 jsonl，也没有记载。本节是 partial。

## 记录格式与记录 schema {#transcripts-record-schema}

格式层面可证实的是：**每个会话一个 `.jsonl` 文件**，即按行的 JSON [@ref-fd-lt-hook-pret-tooluse-input]。官方 hooks 指南给出的读取方式印证了这一点——它把 `transcript_path` 当作普通文本文件用 `grep` 抓取 `"input_tokens":`、`"output_tokens":` 字段 [@ref-fd-lt-guide-read-transcript-tokens]。同一份指南也自嘲这套解析是简化版（"实际上你得解析真正的 transcript 格式"），说明官方并不把该格式当作稳定契约。

记录里能看到的字段类型来自官方示例：会话级有 `session_id`、`transcript_path`、`cwd`、`permission_mode`，事件级有 `hook_event_name`，工具事件另有 `tool_name`、`tool_input`、`tool_response`，压缩事件有 `trigger`（`manual` / `auto`）与 `custom_instructions` [@ref-fd-lt-hook-common-fields][@ref-fd-lt-hook-pret-tooluse-input][@ref-fd-lt-hook-precompact-input]。检索侧的条目类型枚举（`message_text`、`document`、`tool_use`、`tool_result`）可以当作记录内条目分类的官方命名 [@ref-fd-lt-cli-search-entry-kinds]。`droid exec --output-format json` 的结果对象里 `session_id` 是一个 UUID [@ref-fd-lt-exec-json-session-id]，与文件名中的 UUID 形态一致。

**这里必须说清的缺口**：上面列的都是 **hook 输入**的 schema 和 CLI 输出 schema，不是 transcript 文件本身的记录 schema。文档从未给出 transcript 行的字段定义、必填项、消息与工具事件的类型名，也没有版本迁移规则。因此本题只能给 partial：一个"脱敏、最小且完整的记录示例"无法从固定来源构造，硬写就会变成编造。已查入口见下文各节的缺口清单。

## 会话记录的生命周期：创建、延续、压缩、关闭 {#transcripts-lifecycle}

官方用 hook 事件给出了生命周期的可观察锚点 [@ref-fd-lt-hook-sessionstart-matchers][@ref-fd-lt-hook-sessionend-reasons][@ref-fd-lt-hook-stop-input][@ref-fd-lt-hook-precompact-input]：

- 创建与延续：SessionStart 的 matcher 有 `startup`（启动）、`resume`（`--resume` / `--continue` / `/resume`）、`clear`（`/clear`）、`compact`（自动或手动压缩）四种，可据此判断某次会话是新建、恢复、清空还是压缩而来。
- 关闭：SessionEnd 的 `reason` 枚举为 `clear`（`/clear` 或 `/new`）、`logout`、`prompt_input_exit`、`other`。Stop / SubagentStop 事件另带 `stop_hook_active`，官方建议检查它或处理 transcript 以免循环。
- 压缩：PreCompact 带 `trigger`（`manual` / `auto`）与 `custom_instructions`；压缩可由 `compactionTokenLimit` 阈值自动触发，也可由 `compactionModelMode` 指定压缩模型 [@ref-fd-lt-settings-compaction]。

恢复与分支的用户入口是这些 [@ref-fd-lt-cli-resume-fork-commands][@ref-fd-lt-exec-sessions-tagging][@ref-fd-lt-power-user-session-management]：`droid resume SESSION_ID`、`droid --resume SESSION_ID`（别名 `-r`）、`droid resume --last`（跳过选择器，取当前文件夹最近会话）、`droid --fork SESSION_ID`；`droid exec` 侧是 `-s, --session-id SESSION_ID` 原地续接与 `--fork SESSION_ID` [@ref-fd-lt-cli-exec-session-id]。官方明确 fork 语义：**从被 fork 会话的历史出发，但分配一个新的 session ID**，原会话不受影响 [@ref-fd-lt-exec-sessions-tagging]。交互界面侧对应 `/sessions`（列出并恢复）、`/fork`（分支）、`/compress`（也可用 `/compact` / `/handoff`）[@ref-fd-lt-power-user-session-management]。

交给子代理的延续同样以会话为单位：`resume` 带上此前的 `task_id` 会向已存在的 subagent 会话发新一轮，subagent 保留其全部先前上下文（transcript），并把自治级别重新对齐到父会话当前级别；前台与后台 subagent 都适用 [@ref-fd-lt-custom-droids-subagent-resume]。

**缺口**：刷盘时机没有来源——官方从未说明每轮写入是即时落盘、批量落盘还是退出时落盘，因此"在 CLI 运行中直接复制 transcript 是否得到一致快照"无解。压缩后是**改写原文件**还是**新文件加指针**同样没有来源，`/compress` 的描述只说"压缩会话并带摘要转到新会话"。子代理 transcript 与父会话在文件树上的父子关系（独立文件、嵌套目录还是共用文件）也无来源。本节是 partial。

## 索引、数据库与派生状态 {#transcripts-index-and-database}

没有来源表明 Droid CLI 用数据库保存会话正文。可以证实的是它维护**可重建的派生索引**：

- `droid search --reindex` 的描述是"丢弃检索缓存并重建本地索引" [@ref-fd-lt-cli-search-reindex]——这同时确认了检索侧存在一个本地索引加一层缓存，且两者都是可丢弃重建的派生物。
- changelog 记过"`/sessions` 命令现在用一个索引优化加载" [@ref-fd-lt-changelog-sessions-index]，说明会话列表另有一份索引，与正文文件分离。
- 同期 changelog 另有"避免不必要的检索缓存重建" [@ref-fd-lt-changelog-search-cache]。
- changelog 还出现过"会话存储可靠性：修复重复保存错误，并加入会话存储权限问题的自动恢复" [@ref-fd-lt-changelog-session-storage-reliability]，确认会话存储有写盘失败与权限异常的处理路径。

官方 hooks 指南里出现的 SQLite（`costs.db`、`file-changes.db`）是**用户脚本自建的旁路存储**，以 `session_id` 为主键，不属于 Droid 的会话状态 [@ref-fd-lt-guide-session-cost-db]。不要把它当成 Droid 的会话数据库。

**缺口**：索引与缓存的文件路径、格式、所在目录都没有来源；也**没有任何来源说明恢复一个会话需要哪些文件**。按文档能安全断言的只有：索引和缓存可以丢，`--reindex` 能重建检索侧索引；正文 jsonl 显然是恢复的前提，但文档没有确认这一点，也没有说正文文件是否冗余可再生成。本节是 partial。

## 归档、保留与清理 {#transcripts-retention-and-cleanup}

官方提供的是**归档到云端**，不是本地导出：

- `cloudSessionSync` 关闭时保持"只保留本地会话" [@ref-fd-lt-settings-cloud-session-sync]，这是本地与云端分界的开关。
- `/sessions` 列表视图里 `Ctrl+X` 归档高亮会话、`Ctrl+R` 重命名它 [@ref-fd-lt-cli-session-list-keys]；同族命令还有 `/rename`（重命名当前会话）、`/favorite`（标记收藏）、`/share`（与组织共享）、`/rewind-conversation`（撤销会话中最近的改动）、`/bug`（带会话数据与日志生成 bug 报告）[@ref-fd-lt-cli-session-slash-commands]。
- changelog 记过 `/bug` 会把会话上下文打包（zip）、上传到 Factory 并返回可分享的报告 ID [@ref-fd-lt-changelog-bug-zip]——这是**上传式导出**，不是本地留档。
- 组织侧的保留策略由 `sessionRetentionDays` 控制，取值 `14`–`365`，描述是"同步的会话历史在删除前保留多久" [@ref-fd-lt-settings-session-retention]。注意其字面限定：这是**已同步**历史的保留期。
- 隐私文档对云端保留的描述是：cloud-managed 模式下 Factory 可能存储有限的运行日志与指标（认证与管理操作、服务健康与调试），保留期在 Trust Center 文档中；混合与隔离部署下遥测由客户自己的栈决定 [@ref-fd-lt-privacy-data-retention]。

**缺口与纪律**：官方文档**没有**提供本地 transcript 的删除命令、保留天数设置或清理流程。`Ctrl+X` 归档、`/rewind-conversation` 与 `sessionRetentionDays` 分别属于会话列表操作、对话回退和云端同步历史保留，不能据此推断删本地文件的语义。手动删除 `.factory/projects/` 下的 jsonl 会发生什么（孤儿索引、`/sessions` 中残留条目、云端副本是否跟随）没有来源。因此本题是 partial，且明确不主张"本地文件可安全删除"。

## 定位、读取与排错 {#transcripts-read-and-diagnostics}

可用的官方入口，按侵入性从低到高：

1. **产品内检索**：`droid search "query"` 跨本地会话检索消息、文档与工具结果，`--kind` 按条目类型过滤，`--json` 输出结构化结果，`--limit-sessions` / `--limit-hits` / `--context-chars` 控制规模与上下文长度 [@ref-fd-lt-cli-search-command]。索引可疑时用 `--reindex` 丢弃缓存重建 [@ref-fd-lt-cli-search-reindex]。
2. **交互内查看**：`Ctrl+O` 切换详细 transcript 视图显示完整消息细节，`Alt+Up` / `Alt+Down` 逐轮滚动，`Alt+PageUp` / `Alt+PageDown` 在用户轮次间跳转 [@ref-fd-lt-power-user-session-keys]。
3. **拿路径**：`droid resume` 打开选择器、`droid exec --output-format json` 输出 `session_id`，二者都是官方给出的定位手段 [@ref-fd-lt-cli-resume-fork-commands][@ref-fd-lt-exec-json-session-id]。
4. **直接读文件**：路径可从 hook 的 `transcript_path` 取得，官方 hooks 指南示范把该文件当文本处理 [@ref-fd-lt-guide-read-transcript-tokens]。也可以写自己的 SessionEnd hook 在收尾时读取 `transcript_path`。
5. **运行诊断**：`droid --debug` 输出 hook 执行细节（匹配到的命令、超时、退出状态与 stdout）[@ref-fd-lt-hook-debug-output]。注意 hook 排错日志与 transcript 是两条不同通道。
6. **批量运行的分组**：`droid exec --tag` 给运行附加可搜索标签，`--log-group-id` 把相关运行的日志归到同一组便于下游过滤 [@ref-fd-lt-exec-run-tags]。

**缺口**：没有官方工具做完整性校验、损坏检测或一致性比对；changelog 提到的"会话存储重复保存错误"和"权限问题自动恢复"说明历史上确实出现过存储异常，但官方未公开校验命令或修复步骤。备份/恢复的官方流程同样没有来源——`--reindex` 能重建检索索引，不等于能重建会话正文。本节是 partial。

## 已查入口与剩余缺口汇总

为便于后续维护与复核，这里集中列出本轮已查的固定来源入口：官方文档仓库 commit `c6ea4708` 的 `docs/reference/hooks-reference.mdx`（hook 输入与生命周期事件，暴露 `transcript_path`）、`docs/reference/cli-reference.mdx`（命令、快捷键、slash 命令、`droid search` 参数）、`docs/cli/configuration/settings.mdx`（`cloudSessionSync`、`sessionRetentionDays`、压缩与渲染设置）、`docs/cli/droid-exec/overview.mdx`（`--session-id`、`--fork`、`--tag`、JSON 输出）、`docs/cli/user-guides/become-a-power-user.mdx`（会话管理与 transcript 视图快捷键）、`docs/guides/hooks/logging-analytics.mdx`（官方示例如何读 transcript）、`docs/enterprise/privacy-and-data-flows.mdx`（本地执行与云端保留边界）、`docs/changelog/release-notes.mdx`（索引、缓存、会话存储可靠性、`/bug` 打包）。项目根 `archive/factory-droid/` 下本轮仅有 subagents、org-control、permission-rules 三份新归档原件，均不涉及会话记录，因此本章**没有新建 `archived_document` 记录**，全部证据来自 pinned 源码文档树。

剩余缺口按优先级：projects/ 下目录切分规则与项目路径编码；transcript 行的字段级 schema 与版本迁移；刷盘与压缩的落盘语义；索引/缓存的实际路径与格式；本地删除的官方语义与级联影响；备份与恢复的官方流程。要闭合这些缺口，需要官方补文档或公开 CLI 实现源码——当前的 docs-only 仓库做不到。