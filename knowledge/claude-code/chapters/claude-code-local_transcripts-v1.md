---
schema_version: 3
record_kind: production
edition_id: claude-code-local_transcripts-v1
harness_id: claude-code
topic: local_transcripts
title: "Claude Code 主题章节：本地 Transcript"
sections:
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs:
      - ref-cc-lt-configdir-20261006
      - ref-cc-lt-toolresultfile-20261006
      - ref-cc-lt-imagefile-20261006
      - ref-cc-lt-claudejson-20261006
  - section_id: transcripts-record-content
    surface_ids: [cli]
    source_refs:
      - ref-cc-lt-toolresultfile-20261006
      - ref-cc-lt-charlimit-20261006
      - ref-cc-lt-imagefile-20261006
      - ref-cc-lt-nopersist-20261006
      - ref-cc-lt-configdir-20261006
  - section_id: transcripts-session-lifecycle
    surface_ids: [cli]
    source_refs:
      - ref-cc-lt-backgroundtask-20261006
      - ref-cc-lt-tasklist-20261006
      - ref-cc-lt-compaction-20261006
      - ref-cc-lt-checkpoints-20261006
  - section_id: transcripts-retention-and-recovery
    surface_ids: [cli]
    source_refs:
      - ref-cc-lt-syncedtrash-20261006
      - ref-cc-lt-trashretention-20261006
      - ref-cc-lt-claudejsonbackup-20261006
      - ref-cc-lt-dirref-20261006
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs:
      - ref-cc-lt-tasklist-20261006
      - ref-cc-lt-claudejsonbackup-20261006
      - ref-cc-lt-dirref-20261006
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-content
        status: partial
        source_refs:
          - ref-cc-lt-toolresultfile-20261006
          - ref-cc-lt-charlimit-20261006
          - ref-cc-lt-imagefile-20261006
          - ref-cc-lt-nopersist-20261006
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-cc-lt-configdir-20261006
          - ref-cc-lt-toolresultfile-20261006
          - ref-cc-lt-imagefile-20261006
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: unknown
        source_refs: []
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-content
        status: partial
        source_refs:
          - ref-cc-lt-toolresultfile-20261006
          - ref-cc-lt-charlimit-20261006
          - ref-cc-lt-imagefile-20261006
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-record-content
        status: unknown
        source_refs: []
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-session-lifecycle
        status: partial
        source_refs:
          - ref-cc-lt-backgroundtask-20261006
          - ref-cc-lt-tasklist-20261006
          - ref-cc-lt-compaction-20261006
          - ref-cc-lt-checkpoints-20261006
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: partial
        source_refs:
          - ref-cc-lt-claudejson-20261006
          - ref-cc-lt-configdir-20261006
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-recovery
        status: unknown
        source_refs: []
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-retention-and-recovery
        status: partial
        source_refs:
          - ref-cc-lt-syncedtrash-20261006
          - ref-cc-lt-trashretention-20261006
          - ref-cc-lt-dirref-20261006
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs:
          - ref-cc-lt-tasklist-20261006
          - ref-cc-lt-claudejsonbackup-20261006
          - ref-cc-lt-dirref-20261006
---

本章是 claude-code 的本地 Transcript 首采，只覆盖 CLI 界面（`cli`）。产品没有登记 git 仓库来源，因此没有 commit 证据，全部结论来自三份已归档的官方文档快照：`snapshot-claude-code-mcp-doc-20261006`、`snapshot-claude-code-configuration-doc-20261006`（抓取于 2026-10-06T04:33:04Z）、`snapshot-claude-code-skills-doc-20261006`（抓取于 2026-10-06T04:33:04Z），即 MCP 页、设置页与 Skills 页。三份快照的 `version_applicability` 均为 unknown：页面里出现的 “requires v2.1.x or later” 一类门槛只在该页面自己的措辞范围内成立，不能据此把这些机制绑定到某个已安装的 `@anthropic-ai/claude-code` 版本。官方把会话存储的权威清单放在 Claude directory reference 页（`/docs/en/claude-directory`）[@ref-cc-lt-dirref-20261006]，该页未纳入本轮固定快照，这是本主题大量缺口的共同来源；下面每处缺口都写明已查入口。桌面、Web、IDE 界面本轮未调查，查询会按已声明界面派生为 `not_investigated`。

## 会话目录与状态文件的位置 {#transcripts-storage-layout}

可确认的位置有两条。第一条是按会话划分的目录树：`~/.claude/projects/` 下每个会话一个目录，超限的工具结果落在该会话目录的 `tool-results` 子目录里 [@ref-cc-lt-toolresultfile-20261006] [@ref-cc-lt-imagefile-20261006]。第二条是配置目录本身可搬：设置页说明在 Windows 上 `~/.claude` 即 `%USERPROFILE%\.claude`，设置 `CLAUDE_CONFIG_DIR` 后 settings、session history 与 plugins 都改存到该目录 [@ref-cc-lt-configdir-20261006]。因此在 Windows 原生环境上记录位置与 Linux 的 `~/.claude` 不是同一路径形态，两者只能各自成立，不能互相外推。

会话记录与状态文件的分工方面，所引快照没有出现数据库，也没有出现索引。落盘的是文件：`~/.claude.json` 是 Claude Code 自用的第五个文件，保存登录会话、MCP server 配置、每项目的状态（例如信任决定）以及 `/config` 写入的全局配置键 [@ref-cc-lt-claudejson-20261006]。它承载的是元数据与辅助状态，不是会话正文。是否还有别的必需文件参与会话恢复、这些文件能否从记录重建，快照没有给出。

命名规则基本没有证据。快照能确认的只有一个目录名 `tool-results` [@ref-cc-lt-toolresultfile-20261006]；会话目录本身怎样编码项目路径、会话标识与时间戳，父会话、子会话与分支之间如何表达，都不在所引页面中。已查入口为 MCP 页的输出限制与图片两节、设置页的配置文件清单，均只提到 `~/.claude/projects/` 这一层路径；缺的是 Claude directory reference 页与 CLI reference 页，这里按未知记录。

## 落盘内容、开关与格式 {#transcripts-record-content}

记录范围能证实的部分是“工具结果的落盘与替换”。当一次成功的工具结果不含图片且超过 token 上限时，Claude Code 把结果写成文件，并在对话里用一条点名该文件路径的消息替换掉原文，需要时 Claude 再读回文件 [@ref-cc-lt-toolresultfile-20261006]。未声明自身 `anthropic/maxResultSizeChars` 的工具还有一个字符门槛：结果长于 50,000 字符即写文件，与 token 计数无关，`MAX_MCP_OUTPUT_TOKENS` 不改变该门槛 [@ref-cc-lt-charlimit-20261006]。图片方向的规则是：MCP 工具返回 PNG、JPEG、GIF 或 WebP 时，Claude 拿到的是可能被缩放或压缩的内联副本，同时原始字节被另存为会话 `tool-results` 目录下的文件，并把路径交给 Claude [@ref-cc-lt-imagefile-20261006]。

记录开关能确认一个，并且它直接关掉上述落盘：加上 `--no-session-persistence` 或设置 `CLAUDE_CODE_SKIP_PROMPT_HISTORY` 后，Claude Code 不写图片文件，Claude 只收到内联副本 [@ref-cc-lt-nopersist-20261006]。也就是说不落盘的内容至少包括工具结果附件本身；对话消息、工具事件本身如何记录、哪些内容永不落盘，所引三份页面没有描述，属于缺口。

格式方面，快照只固定了附件的两种形态：文本结果是文件，图片结果是原始字节文件（MCP 页把图片保存这一行为限定为 v2.1.283 及以后）。会话记录正文的编码、追加或覆盖写入、分片与压缩规则没有任何陈述，因此这里只给出 partial。

记录 schema 完全未知。快照没有描述任何第一方记录类型、字段、必填项、关系或版本迁移规则，无法给出脱敏的最小记录示例，也无法判断 `~/.claude/projects/` 下会话文件的实际编码。已查入口同上一节，属于明确缺口，本轮不据任何间接描述推断记录结构。

## 会话内事件的生命周期与延续 {#transcripts-session-lifecycle}

生命周期里能证实的是长工具调用转后台与上下文压缩后的延续。仍在运行超过两分钟的主对话 MCP 调用会移入后台任务，Claude 立刻拿到 task ID 并继续工作，结果在调用结束时以任务通知到达；该行为在页面上标注需要 v2.1.212 或以后 [@ref-cc-lt-backgroundtask-20261006]。后台任务出现在 `/tasks` 里，可以在那里停止它，并且退出会话后不会存活，其条目显示 server 报告的最新进度 [@ref-cc-lt-tasklist-20261006]。这就是“记录不跨会话存活”的一条直接证据。

上下文压缩后的延续有具体预算：自动压缩把对话摘要化以腾出上下文后，Claude Code 会在摘要之后重新挂上每个 Skill 最近一次调用的前 5,000 tokens，重挂载的 Skill 共享 25,000 tokens 总额度，并从最近调用的 Skill 开始填满 [@ref-cc-lt-compaction-20261006]。检查点关系也能确认一条边界：后台运行的分叉 Skill 其编辑落在会话检查点之外，`/rewind` 不会撤销它们，需要用 git 回退 [@ref-cc-lt-checkpoints-20261006]。检查点本身存在哪里、恢复一个会话需要写哪些文件、交给子代理时的记录如何分裂，快照没有描述；`/docs/en/checkpointing` 与 sub-agents 页都未纳入本轮快照。

## 保留、回收与备份 {#transcripts-retention-and-recovery}

回收机制在快照里只有一个明确模式，而且边界必须写清：被移除的内容先进 `.trash/` 再由“retention sweep”删除。以 Skills 为例，从 claude.ai 移除的 Skill 被移到 `~/.claude/skills/.trash/`，在 retention sweep 删除前可恢复 [@ref-cc-lt-syncedtrash-20261006]，快照对 trash 条目给出的默认期限是移入后 30 天 [@ref-cc-lt-trashretention-20261006]。这两个说法针对 Skill 文件，不能推断会话记录文件有同样的回收路径与同样的 30 天期限；会话记录的保留期、官方删除开关，以及手动删除文件或 `.claude.json` 的后果、删除前需要停止哪些写入者、是否级联删除或留下孤儿记录，快照均未覆盖。

`claude-directory#cleaned-up-automatically` 这个锚点被三处引用，说明官方确有面向用户的清理说明，但该页本身不在本轮固定快照内 [@ref-cc-lt-dirref-20261006]。按证据纪律，找不到清理说明不等于可以安全删除会话目录或其中任何文件。

备份方面，唯一可证的官方备份是针对 `~/.claude.json` 的：写该文件前 Claude Code 先存一份带时间戳后缀的备份到 `~/.claude/backups/`，解析失败时把损坏文件复制为带时间戳后缀的 `.corrupted` 副本，并提示手工修复或重置，恢复方式是取最近五份备份之一回拷 [@ref-cc-lt-claudejsonbackup-20261006]。归档开关、导出、复制或移动会话记录的官方支持情况，以及恢复后在路径、机器可移植性和信息完整性上的损失，快照没有任何陈述，本题按未知记录。

## 定位、读取与排错 {#transcripts-diagnostics}

可用的观察入口有三类。`/tasks` 显示后台任务及其最新进度，并允许停止任务 [@ref-cc-lt-tasklist-20261006]。配置层的状态由 `/status` 与 `claude doctor` 承担，其中 `~/.claude.json` 损坏时会有明确的配置错误提示、损坏副本与最近五份备份的恢复路径 [@ref-cc-lt-claudejsonbackup-20261006]。官方把“Claude Code 读取的每一个文件”的完整清单集中在 Claude directory reference 页 [@ref-cc-lt-dirref-20261006]，那是核对会话存储条目的正确入口，但该页未纳入本轮快照。

直接读取会话记录文件、检查其完整性与状态，或为备份、恢复、清理排错的具体步骤，所引快照没有提供命令或字段级说明。已查入口为 MCP 页输出限制与后台任务两节、设置页的故障处理一节、Skills 页的 `.trash` 恢复说明，均不含会话文件读取指引；这一部分只能保持 partial。

关于版本边界，本章所引三份页面都未标注适用版本。页面自述的门槛只在其自身措辞内有效：MCP 页称保存 MCP 图片结果需要 v2.1.283 或以后、自动转后台需要 v2.1.212 或以后 [@ref-cc-lt-imagefile-20261006] [@ref-cc-lt-backgroundtask-20261006]；这些是页面级说明，不能推出某个已安装包版本的行为，也不能替代对精确版本的验证。
