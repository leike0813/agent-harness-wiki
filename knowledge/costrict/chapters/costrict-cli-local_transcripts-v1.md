---
schema_version: 3
record_kind: production
edition_id: costrict-cli-local_transcripts-v1
harness_id: costrict
topic: local_transcripts
title: "CoStrict CLI（CSC）的本地 Transcript：记录开关、配置根、保留清理与未公开的落盘路径"
sections:
  - section_id: transcripts-record-scope
    surface_ids: [cli]
    source_refs:
      [
        ref-costrict-settings-cleanup,
        ref-costrict-agents-records,
        ref-costrict-mcp-output,
        ref-costrict-dir-global,
        ref-costrict-settings-other,
        ref-costrict-env-oauth,
        ref-costrict-api-keystore,
      ]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      [
        ref-costrict-env-configdir,
        ref-costrict-dir-intro,
        ref-costrict-dir-global,
        ref-costrict-dir-fileref,
        ref-costrict-agents-memory,
        ref-costrict-teams-storage,
        ref-costrict-hooks-debug,
        ref-costrict-pluginref-cache,
        ref-costrict-settings-files,
        ref-costrict-api-keystore,
      ]
  - section_id: transcripts-record-format
    surface_ids: [cli]
    source_refs:
      [
        ref-costrict-agents-records,
        ref-costrict-mcp-output,
        ref-costrict-skills-lifecycle,
        ref-costrict-cmd-doctor,
        ref-costrict-settings-other,
      ]
  - section_id: transcripts-lifecycle
    surface_ids: [cli]
    source_refs:
      [
        ref-costrict-hooks-events,
        ref-costrict-agents-nest,
        ref-costrict-agents-records,
        ref-costrict-agents-bg,
        ref-costrict-agents-session,
        ref-costrict-teams-storage,
        ref-costrict-skills-lifecycle,
      ]
  - section_id: transcripts-retention-cleanup
    surface_ids: [cli]
    source_refs:
      [
        ref-costrict-settings-cleanup,
        ref-costrict-agents-records,
        ref-costrict-cmd-doctor,
        ref-costrict-pluginref-cache,
        ref-costrict-settings-other,
        ref-costrict-dir-global,
        ref-costrict-teams-storage,
      ]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      [
        ref-costrict-cmd-debug,
        ref-costrict-cmd-doctor,
        ref-costrict-cmd-config,
        ref-costrict-hooks-debug,
        ref-costrict-cli-debug,
        ref-costrict-settings-validate,
        ref-costrict-cmd-hooks,
        ref-costrict-dir-fileref,
        ref-costrict-cmd-status,
        ref-costrict-cmd-agents,
        ref-costrict-cmd-intro,
      ]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-scope
        status: partial
        source_refs:
          [
            ref-costrict-settings-cleanup,
            ref-costrict-agents-records,
            ref-costrict-mcp-output,
            ref-costrict-dir-global,
            ref-costrict-settings-other,
          ]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          [
            ref-costrict-env-configdir,
            ref-costrict-dir-global,
            ref-costrict-dir-fileref,
            ref-costrict-settings-files,
            ref-costrict-api-keystore,
          ]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          [
            ref-costrict-hooks-debug,
            ref-costrict-teams-storage,
            ref-costrict-pluginref-cache,
            ref-costrict-dir-fileref,
          ]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: partial
        source_refs:
          [
            ref-costrict-agents-records,
            ref-costrict-mcp-output,
            ref-costrict-cmd-doctor,
          ]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-format
        status: partial
        source_refs:
          [
            ref-costrict-agents-records,
            ref-costrict-mcp-output,
            ref-costrict-skills-lifecycle,
          ]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle
        status: partial
        source_refs:
          [
            ref-costrict-hooks-events,
            ref-costrict-agents-nest,
            ref-costrict-agents-records,
            ref-costrict-teams-storage,
          ]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs:
          [
            ref-costrict-dir-fileref,
            ref-costrict-env-configdir,
            ref-costrict-dir-global,
            ref-costrict-teams-storage,
          ]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-cleanup
        status: partial
        source_refs:
          [
            ref-costrict-cmd-doctor,
            ref-costrict-settings-cleanup,
            ref-costrict-teams-storage,
          ]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-cleanup
        status: partial
        source_refs:
          [
            ref-costrict-settings-cleanup,
            ref-costrict-agents-records,
            ref-costrict-pluginref-cache,
            ref-costrict-settings-other,
          ]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs:
          [
            ref-costrict-cmd-debug,
            ref-costrict-hooks-debug,
            ref-costrict-cli-debug,
            ref-costrict-cmd-doctor,
            ref-costrict-settings-validate,
          ]
---

本章是 CoStrict 的 `local_transcripts` 首采，只覆盖 catalog 登记的 CLI 界面（CSC）。CoStrict 没有登记 git 仓库来源，固定来源全部是 `docs.costrict.ai` 的官方文档快照，抓取时间为 2026-09-30，而每份快照的 `version_applicability` 都是 `unknown`——官方文档页不标注软件版本，因此下面每条结论只能读作「官方文档如此说明」，**不能绑定到任何已安装的 `csc` 发行版本** [@ref-costrict-cmd-intro]。这也是本章不写 `mappings/` 的原因。

读法提醒：本章把三件容易混在一起的东西分开写——**本机会话记录**（子代理转录、压缩边界事件、超阈值工具输出落盘）、**本机应用状态**（`~/.claude.json` 里的主题、OAuth 会话、信任决策、上次会话指标）[@ref-costrict-dir-global]，以及**日志与遥测**（`--debug` 日志文件、OpenTelemetry 导出）[@ref-costrict-hooks-debug][@ref-costrict-env-oauth]。只有第一类属于本主题，后两类只在与记录生命周期相关处点到为止。

最重要的边界先说清楚：**本轮固定来源的这 16 份官方文档页面里，没有一处给出主会话转录文件的路径、文件名、扩展名与文件级 schema**。页面反复出现「会话文件」「会话历史」「转录写入」这些词，也给出了保留期与关闭开关，却始终没有指明文件落盘的具体位置。下面每题都按这个事实定状态。

## 记录范围与开关 {#transcripts-record-scope}

**记录什么**：文档直接描述的落盘对象有三类。一是子代理转录——「Subagents 记录独立于主对话持久化」，主对话压缩时不受影响，它们存储在单独的文件中 [@ref-costrict-agents-records]。二是写入记录文件的压缩边界事件（见下一节给出原文示例）[@ref-costrict-agents-records]。三是超阈值的 MCP 工具输出——未声明 `anthropic/maxResultSizeChars` 的工具，超过默认阈值的结果会持久化到磁盘，并在对话中替换为文件引用 [@ref-costrict-mcp-output]。除此之外，`~/.claude.json` 保存「不属于 settings.json 的状态」：主题、OAuth 会话、每个项目的信任决策、个人 MCP 服务器与 UI 开关；它的 `projects` 键跟踪每个项目的状态，如信任对话框接受和**上次会话指标** [@ref-costrict-dir-global]。这属于应用状态而非会话正文，但清理时会遇到同一目录。

**记录开关**：非交互模式（`-p`）下可以用 `--no-session-persistence` 标志或 `persistSession: false` SDK 选项**完全禁用转录写入**；文档明确写出没有交互模式的等效项 [@ref-costrict-settings-cleanup]。也就是说交互式会话的转录写入无法通过设置关闭。

**哪些不落盘（或至少不属于本机转录）**：凭据类内容不在会话记录里——OAuth 访问令牌走环境变量或钥匙串，`CLAUDE_CODE_OAUTH_TOKEN` 优先于钥匙串存储的凭据 [@ref-costrict-env-oauth]；第三方 API Key 由 `/login` 表单写入用户级 `settings.json` 的 `env` 配置、以可读文本保存，文档明确要求不要公开上传该文件，且说明这与 CoStrict 账号登录凭据的存储不是同一条路径 [@ref-costrict-api-keystore]。遥测是另一条出口：`settings.json` 的 `env` 块可以设 `CLAUDE_CODE_ENABLE_TELEMETRY` 与 `OTEL_METRICS_EXPORTER` [@ref-costrict-settings-other]，环境变量侧还有若干 OpenTelemetry 刷新超时 [@ref-costrict-env-oauth]。

**缺口**：`transcripts.scope` 记为 partial。已查入口：`/csc/configuration/settings`（`--no-session-persistence` 与 `cleanupPeriodDays` 段落）、`/csc/agent/sub-agents`（记录持久化与压缩事件）、`/csc/tools-and-plugins/mcp`（超阈值落盘）、`/csc/getting-started/costrict-directory`（`~/.claude.json` 与 `projects` 键）、`/csc/reference/env-vars`（凭据与遥测变量）。剩余缺口：主会话转录是否记录推理块、思考摘要、工具调用的完整入参与返回，文档没有任何字段级说明；也没有说明被 `--no-session-persistence` 关闭后哪些内容仍然落在 `~/.claude.json` 或调试日志里。

## 配置根、位置与命名 {#transcripts-storage-layout}

**唯一一条把「会话历史」和路径直接绑定的文档证据**来自环境变量参考：`CLAUDE_CONFIG_DIR` 覆盖配置目录（默认 `~/.costrict`），「所有设置、凭据、**会话历史**和插件都存储在此路径下」，并给出并行多账户的用法（`alias csc-work='CLAUDE_CONFIG_DIR=~/.claude-work csc'`）[@ref-costrict-env-configdir]。这确定了会话历史的**根**，但没有确定子目录名。目录页复述同一约束：「如果你设置了 `CLAUDE_CONFIG_DIR`，此页面上的每个 `~/.costrict` 路径都将位于该目录下」[@ref-costrict-dir-intro]。因此 `~/.costrict` 在本章所有路径模板里都是可被环境变量改写的相对根，不应被当作固定绝对路径。

**这个根下面已知的东西**（逐条来自目录页与各主题页，而非推测）：

| 路径 | 内容 | 来源 |
| :-- | :-- | :-- |
| `~/.claude.json` | 应用状态、OAuth、UI 开关、个人 MCP 服务器；`projects` 键按项目记信任决策与上次会话指标 | [@ref-costrict-dir-global] |
| `~/.costrict/` | 你的个人配置，作用于所有项目，永不提交；项目 `.costrict/` 的全局对应物 | [@ref-costrict-dir-intro][@ref-costrict-dir-global] |
| `projects/〔project〕/memory/`（仅全局） | 自动记忆：CSC 跨会话给自己的笔记 | [@ref-costrict-dir-fileref] |
| `~/.costrict/agent-memory/〔name〕/` | 子代理持久记忆（`user` 作用域） | [@ref-costrict-agents-memory] |
| `.costrict/agent-memory/〔name〕/` / `.costrict/agent-memory-local/〔name〕/` | 子代理记忆的项目级与本地级作用域 | [@ref-costrict-agents-memory] |
| `~/.costrict/teams/{team-name}/config.json` | 团队配置，保存运行时状态（会话 ID、tmux 窗格 ID）与 `members` 数组 | [@ref-costrict-teams-storage] |
| `~/.costrict/tasks/{team-name}/` | 任务列表，创建团队时自动生成 | [@ref-costrict-teams-storage] |
| `~/.costrict/debug/〔session-id〕.txt` | 调试日志（不是会话转录） | [@ref-costrict-hooks-debug] |
| `~/.costrict/plugins/cache` | 市场插件的本地缓存，每个已安装版本一个独立目录 | [@ref-costrict-pluginref-cache] |

**命名规则**在文档里只以三种形态出现：调试日志用 `〔session-id〕.txt` [@ref-costrict-hooks-debug]；团队配置用 `{team-name}/config.json` 并在正文里保存会话 ID [@ref-costrict-teams-storage]；插件缓存按版本分目录、不按项目分 [@ref-costrict-pluginref-cache]。子代理记忆与自动记忆按**代理名/项目名**分目录 [@ref-costrict-agents-memory][@ref-costrict-dir-fileref]。**会话转录文件本身用会话 ID 命名、按项目路径编码目录这两件事都没有文档依据**，不写。

**操作系统差异**：托管设置在 macOS 落在 `/Library/Application Support/CoStrict/`，Linux 与 WSL 落在 `/etc/claude-code/`，Windows 走注册表 `HKLM\SOFTWARE\Policies\CoStrict`（用户级为 `HKCU` 同名键）[@ref-costrict-settings-files]。这些是托管策略文件的位置，不是会话记录位置；WSL 也不等于 Windows native，不据此外推。

值得单独指出的一处对照：CoStrict API 接入页对第三方 Key 存储位置给出了**带软件版本**的表述——在 CSC 4.2.38 中写入用户级 `settings.json` 的 `env`，默认 macOS 为 `~/.costrict/settings.json`、Windows 为 `%USERPROFILE%\.costrict\settings.json`，设置了自定义配置目录时实际位置变化 [@ref-costrict-api-keystore]。也就是说，本产品文档里唯一有版本锚点的存储位置陈述落在凭据文件上，会话记录位置没有。这正好说明为什么本章的 `transcripts.location` 只能是 partial：一个能被引用到具体版本的目录事实，恰恰在会话记录这边缺席。

**`transcripts.location` 与 `transcripts.database` 的状态**：`location` 记 partial——配置根与同目录下的已知文件已确定，子路径未知。`database` 记 **unknown**——已查入口为目录页「文件参考」的全量文件表 [@ref-costrict-dir-fileref]、`CLAUDE_CONFIG_DIR` 说明 [@ref-costrict-env-configdir]、`~/.claude.json` 说明 [@ref-costrict-dir-global] 与团队本地存储说明 [@ref-costrict-teams-storage]，**没有任何页面提到 SQLite、数据库文件或会话索引**。这不等于「CSC 不用数据库」，只等于官方文档没有记录；因此本节不给出「会话文件与数据库分工」的任何结论。

## 记录形态与可见的 schema 片段 {#transcripts-record-format}

官方文档里唯一逐字给出的、会写在记录文件内部的 schema 片段是子代理记录中的压缩边界事件（该页原文，脱敏后照录）[@ref-costrict-agents-records]：

```json
{ "type": "system", "subtype": "compact_boundary", "compactMetadata": { "trigger": "auto", "preTokens": 167189 } }
```

从这段能确定的只有：`type`/`subtype`/`compactMetadata` 三个层级，`trigger` 区分自动触发，`preTokens` 记录压缩前已用 token。**不能**由此推出整个转录文件的记录类型枚举。

**超阈值工具输出**是另一处第一方数据结构：MCP 工具可在 `tools/list` 响应条目里设置 `_meta["anthropic/maxResultSizeChars"]` 提高该工具的持久化阈值，上限 500,000 字符；没有该注解时，超过默认阈值的结果持久化到磁盘，对话中只保留文件引用 [@ref-costrict-mcp-output]。默认阈值的具体字节数没有给出。

**内容注入形态**：技能内容以**单条消息**进入对话，并在会话剩余时间内保留，CSC 不会在后续轮次重读技能文件；自动压缩时会在摘要后重新附加每个技能最近一次调用，每个技能保留前 5,000 token、组合预算 25,000 token [@ref-costrict-skills-lifecycle]。这描述的是「技能内容如何进入对话」，不是转录文件的写入规则。

**导出形态**：`/export [filename]` 把当前对话导出为纯文本，带文件名直接写入该文件，不带文件名则打开对话框以复制到剪贴板或保存到文件 [@ref-costrict-cmd-doctor]。纯文本导出与转录文件是两件东西。

**缺口**：`transcripts.format` 与 `transcripts.schema` 均记 partial。已查入口同上。剩余缺口具体为：转录文件的容器格式（JSON、JSONL、数据库还是二进制）；字符编码；每轮追加还是整体覆盖；是否分片、是否压缩；消息、工具调用、系统事件的必填字段与类型；schema 版本迁移规则；除 `compact_boundary` 外还有哪些 `type`/`subtype` 取值。这些都没有固定来源，因此本章不编造示例。

## 生命周期、恢复与子代理分支 {#transcripts-lifecycle}

**创建与恢复的外部信号**是 Hook 事件表：`SessionStart` 在「会话开始或恢复时」触发，`SessionEnd` 每会话一次 [@ref-costrict-hooks-events]。同一张表还给出压缩前后的 `PreCompact`/`PostCompact`、子代理的 `SubagentStart`/`SubagentStop`、工作树的 `WorktreeCreate`/`WorktreeRemove`（会话退出或子代理完成时移除）[@ref-costrict-hooks-events]。这些事件说明记录的生命周期节点存在且可被外部观察，但事件本身不描述记录文件。

**子代理记录**是文档描述最完整的一段 [@ref-costrict-agents-records]：

- 独立于主对话持久化，存储在单独的文件中；
- 主对话压缩时子代理记录不受影响；
- 在其会话内持久化，重启 CSC 后**通过恢复同一会话**恢复；
- 按 `cleanupPeriodDays`（默认 30 天）自动清理；
- 支持与主对话相同逻辑的自动压缩，默认约在 95% 容量时触发，可用 `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` 调低。

**恢复一个已有子代理**走代理 ID 而不是重放：`SendMessage` 工具以代理的 ID 作为 `to` 字段恢复它，恢复后保留完整对话历史，包括所有之前的工具调用、结果和推理，从停止处继续；该工具仅在通过 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 启用 Agent teams 时可用 [@ref-costrict-agents-nest]。这解释了「分支」在本产品里的形态：子代理是独立上下文实例，每次调用新建、靠代理 ID 续接，而不是主会话的树状子节点。会话本身同理——`csc --agent 〔name〕` 启动的会话在被恢复时，所选子代理会被持久化 [@ref-costrict-agents-session]。

**并发**：子代理可前台阻塞或后台并发运行，运行前 CSC 会预先提示所需工具权限；`Ctrl+B` 可把正在运行的任务置于后台，整个后台任务功能可用 `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` 关闭 [@ref-costrict-agents-bg]。Agent teams 侧，团队配置保存会话 ID 与 tmux 窗格 ID，并在队友加入、空闲或离开时更新；文档明确要求不要手工编辑该文件，你的改动会在下次状态更新时被覆盖 [@ref-costrict-teams-storage]。

**缺口**：`transcripts.lifecycle` 记 partial。已查入口：Hooks 生命周期表、子代理页的「管理 Subagents 上下文」与「自动压缩」两节、Agent teams 的本地存储节。剩余缺口：记录在什么时机刷盘；会话关闭时的落盘顺序；`--fork-session` 类分支在记录文件里如何表达；子代理转录文件与主会话文件之间是否存在引用关系；恢复会话时除记录外还需要哪些文件（见下一节 `transcripts.archive` 的缺口）。

## 保留、导出、归档与清理 {#transcripts-retention-cleanup}

**官方唯一文档化的保留机制是 `cleanupPeriodDays`**，原文在「可用设置」表里：该期限之前的**会话文件在启动时被删除**（默认 30 天，最小值 1），设置为 0 会因验证错误被拒绝；同一个设置还控制启动时自动移除**孤立子代理工作树**的年龄截止 [@ref-costrict-settings-cleanup]。子代理记录按同一设置清理，默认 30 天 [@ref-costrict-agents-records]。这是本主题里唯一有明确默认值、明确执行时机（启动时）和明确取值的开关。

**关闭记录**同样只覆盖非交互模式：`--no-session-persistence` 或 `persistSession: false` 完全禁用转录写入，无交互模式等效项 [@ref-costrict-settings-cleanup]。

**导出 ≠ 归档。** `/export [filename]` 导出的是当前对话的纯文本 [@ref-costrict-cmd-doctor]；`~/.costrict/teams/{team-name}/config.json` 里的会话 ID 供队友发现与状态同步 [@ref-costrict-teams-storage]。官方文档**没有**描述任何原生归档开关、归档包格式、归档依赖哪些必要文件，也没有描述恢复归档后在路径、机器可移植性或信息完整性上的损失。因此 `transcripts.archive` 记 partial：可确认的是「有纯文本导出、无文档化归档机制」，不可确认的是「没有归档机制」。

**手动删除的后果没有文档**。文档只说明 CSC 启动时会删掉超过期限的会话文件 [@ref-costrict-settings-cleanup]，没有说明运行中删除、转录文件中途截断、删除后遗留索引或项目状态时的行为。`transcripts.cleanup` 记 partial，并明确写下边界：**缺少证据不等于可以安全删除**。删除前必须停止哪些写入者（CSC 进程、后台子代理、Agent teams 的队友 tmux 会话）只能从「清理发生在启动时」推出运行期并发写入的行为未被记录，官方没有给出手动清理流程。

**同一配置根下另有三种清理，容易与转录混淆，必须区分**：

| 机制 | 对象 | 时机与期限 | 来源 |
| :-- | :-- | :-- | :-- |
| `cleanupPeriodDays` | 会话文件 + 孤立子代理工作树 | 启动时删除，默认 30 天 | [@ref-costrict-settings-cleanup][@ref-costrict-agents-records] |
| 插件缓存孤立版本 | `~/.costrict/plugins/cache` 中的旧版本目录 | 宽限期 7 天后自动删除；宽限期的目的是让仍在加载旧版本的并发 CSC 会话继续运行 | [@ref-costrict-pluginref-cache] |
| 配置文件备份 | 设置配置文件的时间戳备份 | 自动创建，保留最近五个 | [@ref-costrict-settings-other] |

第三条尤其要留意：CSC 会自动创建配置文件备份，**文档没有说会话转录是否也有同类备份** [@ref-costrict-settings-other]。而 `~/.claude.json` 里的「上次会话指标」意味着删除会话文件不会清掉项目状态 [@ref-costrict-dir-global]——这是删除后的孤儿状态的一个已知形态。

## 定位、完整性与排错 {#transcripts-diagnostics}

**先分清两条线。** 调试日志不是会话转录，但它是当前唯一有明确路径与命名的按会话产物：`csc --debug` 把日志写到 `~/.costrict/debug/〔session-id〕.txt`，且不打印到终端；`csc --debug-file 〔path〕` 写到指定文件路径并隐式启用调试模式，优先于 `CLAUDE_CODE_DEBUG_LOGS_DIR` [@ref-costrict-hooks-debug][@ref-costrict-cli-debug]。日志行形态示例（该页原文）：`[DEBUG] Executing hooks for PostToolUse:Write`、`[DEBUG] Hook command completed with status 0: 〔Your stdout〕`；要更细粒度的匹配信息可设 `CLAUDE_CODE_DEBUG_LOG_LEVEL=verbose` [@ref-costrict-hooks-debug]。`--debug` 按会话 ID 分文件这一点，是文档里唯一能侧面印证「会话有稳定 ID」的证据。

**交互式诊断入口**：

- `/debug [description]` 为当前会话启用日志捕获，可描述问题以聚焦分析 [@ref-costrict-cmd-config][@ref-costrict-cmd-debug]；
- `/doctor` 诊断并验证 CSC 安装与设置 [@ref-costrict-cmd-doctor]；
- `/status` 显示每个配置层（托管、用户、项目）及其来源，并在设置文件含错误时报告 [@ref-costrict-settings-validate]；
- `/context` 以彩色网格可视化当前上下文用量 [@ref-costrict-cmd-config]；
- `/insights` 生成分析 CSC 会话的报告，包括项目领域、交互模式和摩擦点 [@ref-costrict-cmd-hooks]。

**检查「已加载了什么」的一组命令**由目录页给出：查看本会话实际加载内容的入口是 `/context`（按类别的令牌使用）、`/memory`（已加载的 AGENTS.md、rules 与自动记忆条目）、`/agents`、`/hooks`、`/mcp`、`/skills` [@ref-costrict-dir-fileref]。这些回答的是上下文与配置来源，不是转录文件内容。

**云端边界要单列**：`/teleport`（别名 `/tp`）把 CSC 网页版会话拉入本终端，打开选择器后获取分支和对话，需要 costrict.ai 订阅 [@ref-costrict-cmd-status]；`/autofix-pr` 启动的 CSC 网页版会话同样是远程会话 [@ref-costrict-cmd-agents]。这两者涉及的会话历史在服务端，不能当作本机记录；`/desktop`（别名 `/app`）则相反，它在**本机**桌面应用中继续当前会话，且仅 macOS 与 Windows 可用 [@ref-costrict-cmd-debug]。

**缺口**：`transcripts.diagnostics` 记 partial。已查入口：CLI 参考（`--debug-file`）、命令参考（`/debug`、`/doctor`、`/status`、`/context`、`/insights`、`/teleport`、`/desktop`）、Hooks 参考（调试日志路径与 `verbose`）、目录页（已加载内容命令表）。剩余缺口：**没有任何官方命令被文档描述为直接读取、校验或导出会话转录文件**（`/export` 导出的是当前对话纯文本，不是文件）；没有记录完整性检查手段；没有为备份／恢复／清理提供排错入口。本章因此不提供「怎样校验转录文件是否完整」的步骤——缺少来源，不是机制不存在。
