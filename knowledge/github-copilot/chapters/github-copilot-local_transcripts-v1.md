---
schema_version: 3
record_kind: production
edition_id: github-copilot-local_transcripts-v1
harness_id: github-copilot
topic: local_transcripts
title: "GitHub Copilot CLI 本地会话记录：位置、格式、生命周期、归档与清理"
sections:
  - section_id: transcripts-scope-and-boundary
    surface_ids: [cli]
    source_refs: [ref-github-copilot-reporeadme-intro, ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-conc-context, ref-github-copilot-lt-changelog-events-metrics]
  - section_id: transcripts-storage-layout
    surface_ids: [cli]
    source_refs: [ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-cfgdir-overview, ref-github-copilot-cfgdir-move, ref-github-copilot-lt-changelog-settings-json-split]
  - section_id: transcripts-naming-and-branch
    surface_ids: [cli]
    source_refs: [ref-github-copilot-lt-changelog-session-name, ref-github-copilot-lt-changelog-continue-cwd, ref-github-copilot-lt-changelog-fork-branch, ref-github-copilot-lt-changelog-session-sync, ref-github-copilot-cmdref-options]
  - section_id: transcripts-format-and-schema
    surface_ids: [cli]
    source_refs: [ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-lt-changelog-events-metrics]
  - section_id: transcripts-lifecycle-and-compaction
    surface_ids: [cli]
    source_refs: [ref-github-copilot-lt-changelog-session-checkpoint, ref-github-copilot-conc-context, ref-github-copilot-lt-changelog-sessionend-hooks, ref-github-copilot-lt-changelog-session-sync, ref-github-copilot-cmp-hooks, ref-github-copilot-lt-changelog-continue-cwd, ref-github-copilot-lt-changelog-fork-branch, ref-github-copilot-lt-changelog-session-resume-integrity, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-lt-changelog-events-metrics, ref-github-copilot-best-context]
  - section_id: transcripts-storage-database-and-sync
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-overview, ref-github-copilot-lt-changelog-events-metrics, ref-github-copilot-lt-changelog-session-sync, ref-github-copilot-lt-changelog-settings-json-split, ref-github-copilot-cfgdir-move]
  - section_id: transcripts-archive-and-move
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cfgdir-move, ref-github-copilot-lt-changelog-session-sync, ref-github-copilot-lt-changelog-fork-branch, ref-github-copilot-cmp-hooks]
  - section_id: transcripts-cleanup
    surface_ids: [cli]
    source_refs: [ref-github-copilot-lt-changelog-session-delete-subcommands, ref-github-copilot-lt-changelog-session-picker-delete, ref-github-copilot-lt-changelog-delete-old-sessions, ref-github-copilot-cfgdir-delete, ref-github-copilot-lt-changelog-logs-pruning, ref-github-copilot-cfgdir-move]
  - section_id: transcripts-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-best-sessions, ref-github-copilot-lt-changelog-session-resume-integrity, ref-github-copilot-conc-context, ref-github-copilot-cfgdir-delete]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [cli]
        section_id: transcripts-scope-and-boundary
        status: partial
        source_refs: [ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-lt-changelog-events-metrics]
  - question_id: transcripts.location
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-layout
        status: answered
        source_refs: [ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-cfgdir-overview, ref-github-copilot-cfgdir-move]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [cli]
        section_id: transcripts-naming-and-branch
        status: partial
        source_refs: [ref-github-copilot-lt-changelog-session-name, ref-github-copilot-lt-changelog-continue-cwd, ref-github-copilot-lt-changelog-fork-branch, ref-github-copilot-lt-changelog-session-sync, ref-github-copilot-cmdref-options]
  - question_id: transcripts.format
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: partial
        source_refs: [ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul, ref-github-copilot-lt-changelog-events-metrics]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [cli]
        section_id: transcripts-format-and-schema
        status: partial
        source_refs: [ref-github-copilot-best-context, ref-github-copilot-lt-changelog-storage-layout-overhaul]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [cli]
        section_id: transcripts-lifecycle-and-compaction
        status: partial
        source_refs: [ref-github-copilot-lt-changelog-session-checkpoint, ref-github-copilot-conc-context, ref-github-copilot-lt-changelog-sessionend-hooks]
  - question_id: transcripts.database
    answers:
      - surface_ids: [cli]
        section_id: transcripts-storage-database-and-sync
        status: partial
        source_refs: [ref-github-copilot-cfgdir-overview, ref-github-copilot-lt-changelog-events-metrics, ref-github-copilot-lt-changelog-session-sync]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [cli]
        section_id: transcripts-archive-and-move
        status: partial
        source_refs: [ref-github-copilot-cfgdir-move, ref-github-copilot-lt-changelog-session-sync, ref-github-copilot-lt-changelog-fork-branch, ref-github-copilot-cmp-hooks]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [cli]
        section_id: transcripts-cleanup
        status: partial
        source_refs: [ref-github-copilot-lt-changelog-session-delete-subcommands, ref-github-copilot-lt-changelog-session-picker-delete, ref-github-copilot-lt-changelog-delete-old-sessions, ref-github-copilot-cfgdir-delete, ref-github-copilot-lt-changelog-logs-pruning]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-github-copilot-best-sessions, ref-github-copilot-lt-changelog-session-resume-integrity, ref-github-copilot-conc-context, ref-github-copilot-cfgdir-delete]
---

GitHub Copilot CLI 是闭源发行包，本地会话记录的实现没有任何公开源码：公开仓库 `github/copilot-cli` 在 commit `6783c47bfd23f2b497808cc3b8d217560bdf19bf` 只有 18 个文件（`README.md`、`install.sh`、`changelog.md`、`LICENSE.md` 与 GitHub workflow），不含 CLI 实现代码 [@ref-github-copilot-reporeadme-intro]。因此本章的事实来源是两类：官方文档站点归档页（`cli-best-practices.md`、`cli-config-dir-reference.md`、`cli-command-reference.md`、`about-copilot-cli.md`，快照见各引用）与上述固定 commit 的 `changelog.md`。`changelog.md` 是发行说明而非源码，对机制的描述属于发行方自述，按 `source_inspected` 使用，不等同于运行观察。

适用性说明：文档来源未标注软件版本，本章按来源级知识记录（`version_applicability: unknown`）；`changelog.md` 引用固定到 commit `6783c47bfd23f2b497808cc3b8d217560bdf19bf`（对应 1.0.92 发布），其描述的机制至少在该发行时点存在，但不证明任何后续版本的行为。全部结论限定 `surface_id: cli`，未在 Windows 或 macOS 上单独验证路径形态。

最大的结构性限制：由于无公开源码，`events.jsonl` 的记录类型、字段与必填项、写入时机、刷盘策略、压缩与分片规则都没有第一方逐项说明。本章如实标为 `partial` 并逐题列出缺口，不从文件名反推 schema，也不把“未找到记录开关”写成“不记录”。

## 记录范围与本章边界 {#transcripts-scope-and-boundary}

固定来源能证实的记录范围是**完整的会话事件流**，不是输入历史或调试日志。官方最佳实践页把会话存储描述为“Full session history”，并说明记录格式与时间线显示解耦 [@ref-github-copilot-lt-changelog-storage-layout-overhaul]。落在同一记录里的还有会话结束时的用量指标（请求数、token、代码改动），`changelog.md` 明确说这些指标在每个会话结束后被持久化到 `events.jsonl` [@ref-github-copilot-lt-changelog-events-metrics]。

`events.jsonl` 之外，会话目录还保存 `workspace.yaml` 元数据、`plan.md` 实施计划、`checkpoints/` 压缩历史与 `files/` 持久产物 [@ref-github-copilot-best-context]。这些属于维持会话状态所需的存储依赖，在本章范围内；调试日志（`~/.copilot/logs/`）、遥测与 `config.json` 里的认证状态不在本章逐项审计范围，只在与清理、删除相关处提及。

**已查入口与剩余缺口（`transcripts.scope`）**：官方文档的 CLI 最佳实践页、配置目录参考页、命令参考页、about-copilot-cli 概念页，以及固定 commit 的完整 `changelog.md` 均已检索 `transcript`/`record`/`telemetry`/`opt-out`/`disable` 等关键词。缺口有三项：（1）没有任何官方页面说明是否存在**关闭或降级会话记录的用户开关**，因此本章不声称可关闭记录，也不声称不可关闭；（2）工具调用的完整载荷、模型原始响应、凭据是否落盘在 `events.jsonl` 中，来源没有逐项说明；（3）哪些内容被脱敏或排除（例如环境变量、凭据）只有零散修复记录，没有成文的记录策略。

## 存储位置与目录结构 {#transcripts-storage-layout}

会话记录的根路径是 `~/.copilot/session-state/{session-id}/`，官方最佳实践页给出该目录树：`events.jsonl`（完整会话历史）、`workspace.yaml`（元数据）、`plan.md`（实施计划，若创建）、`checkpoints/`（压缩历史）、`files/`（持久产物）[@ref-github-copilot-best-context]。这是本章唯一有第一方逐文件清单的存储布局。

`session-state/` 是较新的位置。`changelog.md` 在 0.0.342（2025-10-15）记录过一次会话日志格式改版：新会话存入 `~/.copilot/session-state`，旧版会话留在 `~/.copilot/history-session-state`，**在用 `copilot --resume` 恢复它们时**才迁移到新格式与新位置 [@ref-github-copilot-lt-changelog-storage-layout-overhaul]。这意味着 `history-session-state/` 目录可能仍存在于已升级过但尚未恢复过某些旧会话的机器上，且迁移是按会话懒触发而非一次性全量。

路径随配置目录变化。`~/.copilot` 是默认用户级目录，官方配置目录参考页把 `logs/` 列为其中一项“Session log files” [@ref-github-copilot-cfgdir-overview]；同一参考页说明设置 `COPILOT_HOME` 会**整体替换** `~/.copilot` 路径 [@ref-github-copilot-cfgdir-move]。因此 `session-state/` 随 `COPILOT_HOME` 一起迁移。官方文档没有给出 `session-state` 在 Windows 与 macOS 上的独立路径写法；`changelog.md` 中所有路径都写作 `~/.copilot/...` 的 POSIX 形式 [@ref-github-copilot-lt-changelog-logs-pruning]，Windows 形态未验证。

`config.json` 与 `settings.json` 承担的是状态与用户设置，不是会话正文：`changelog.md` 记录用户设置已迁到 `~/.copilot/settings.json`，与 `config.json` 里的内部状态分离 [@ref-github-copilot-lt-changelog-settings-json-split]。本章未验证 `workspace.yaml` 是否与 `config.json` 有交叉引用。

**已查入口与剩余缺口（`transcripts.location`）**：路径、目录树、位置迁移与 `COPILOT_HOME` 覆盖规则已由文档与发行说明直接证实，状态为 `answered`。缺口是 `session-state` 的 Windows 路径写法、`{session-id}` 的实际字符集，以及是否存在项目级或仓库级的会话存储作用域——来源均未说明。

## 会话标识、命名与分支关联 {#transcripts-naming-and-branch}

会话可以被显式命名并按名恢复：`changelog.md` 记录 `--name` 为会话命名、`--resume=NAME` 形式按名恢复（发行说明原文写作 `--resume` 后接会话名）[@ref-github-copilot-lt-changelog-session-name]。会话选择器会显示分支名与空闲/占用状态，并支持搜索 [@ref-github-copilot-lt-changelog-session-sync]。这两条说明 `{session-id}` 目录在有名字的会话上与该名字对应，但**没有**说明名字如何编码进目录名。

分支关系由 `/fork` 表达。`changelog.md` 记录 `/fork` 把当前会话分叉为一个新的独立会话，可接受一个可选名字，且分叉出的会话在会话对话框里显示其来源 [@ref-github-copilot-lt-changelog-fork-branch]。这是父子/兄弟会话关联的第一方描述：分叉产生独立会话并保留来源标注。

会话选择与工作目录相关：`--continue` 优先恢复**当前工作目录**的会话，而不是最近被触碰的会话 [@ref-github-copilot-lt-changelog-continue-cwd]。命令参考页指出，相对路径按会话工作目录解析（即 `--resume`、`--worktree` 或 `-C` 指定的目录），与选项顺序无关 [@ref-github-copilot-cmdref-options]。这说明会话记录里保存了工作目录这一项目作用域信息，且恢复行为依赖它。

**已查入口与剩余缺口（`transcripts.naming`）**：`{session-id}` 的编码规则、时间戳是否入名、名字与 id 的对应关系、跨设备同步后 id 是否保持不变，都没有任何来源说明。因此状态为 `partial`：命名与分支关系可证实，标识编码不可证实。

## 记录格式与 schema 缺口 {#transcripts-format-and-schema}

格式层面可证实的只有文件选择：会话正文是 JSON Lines（`events.jsonl`，扩展名即格式声明），元数据是 YAML（`workspace.yaml`），实施计划是 Markdown（`plan.md`），压缩历史与持久产物是目录 [@ref-github-copilot-best-context]。文件改版说明指出新格式的意图是“更简洁、可扩展”，并与时间线显示解耦 [@ref-github-copilot-lt-changelog-storage-layout-overhaul]。

写入语义有两处第一方线索。用量指标（请求数、token、代码改动）在**每个会话结束后**被持久化到 `events.jsonl` [@ref-github-copilot-lt-changelog-events-metrics]；“会话结束”由 `sessionEnd` hook 的触发时机间接印证 [@ref-github-copilot-lt-changelog-sessionend-hooks]。这两条支持“追加写、按会话结束时批量落盘指标”的理解，但**不构成完整写入契约**：来源没有说明一条 JSONL 记录对应消息、工具调用还是聚合事件，也没有说明是否 fsync、是否分片、是否压缩。

**`transcripts.schema` 的具体缺口**：无公开源码，官方文档没有给出 `events.jsonl` 的记录类型枚举、字段名、类型、必填项、记录间关系或版本迁移规则。`changelog.md` 只记录了一次整体格式改版（0.0.342）这一迁移事实 [@ref-github-copilot-lt-changelog-storage-layout-overhaul]，没有给出改版前后的字段对照。因此本章**不提供** `events.jsonl` 的示例记录——任何示例都将是编造的。已查入口：官方最佳实践页、配置目录参考页、命令参考页、about-copilot-cli 页、hooks 参考页与固定 commit 的完整 `changelog.md`。剩余缺口：记录类型、字段、必填项、版本迁移、脱敏规则。

`transcripts.format` 与 `transcripts.schema` 同记于本节，状态均为 `partial`。

## 生命周期、压缩与检查点 {#transcripts-lifecycle-and-compaction}

创建与追加：会话目录在会话开始时建立，`events.jsonl` 随会话推进累积事件，指标在会话结束时追加 [@ref-github-copilot-lt-changelog-events-metrics]。来源没有说明文件是先创建后追加、还是每轮落盘，也没有说明关闭时的收尾写入次序。

压缩与延续是本章证据最完整的生命周期环节。官方概念页说明自动压缩在对话接近 token 上限 95% 时在后台进行，不中断工作流；`/compact` 可手动触发，Esc 键取消；`/context` 展示 token 用量明细 [@ref-github-copilot-conc-context]。`changelog.md` 记录自动压缩现在会保存一个检查点，出现在 `/session checkpoints` 中 [@ref-github-copilot-lt-changelog-session-checkpoint]。检查点就是压缩历史的落盘形式，位于会话目录的 `checkpoints/` 子目录 [@ref-github-copilot-best-context]。

恢复：`--resume` 与 `--continue` 是恢复入口，`--continue` 优先当前工作目录的会话 [@ref-github-copilot-lt-changelog-continue-cwd]。旧格式会话在恢复时才从 `history-session-state/` 迁移 [@ref-github-copilot-lt-changelog-storage-layout-overhaul]。发行说明另记录恢复待决 MCP 权限提示不再卡住、恢复大本地会话时 transcript 内存有界等行为修复 [@ref-github-copilot-lt-changelog-session-resume-integrity]。

分支与交给子代理：`/fork` 产生独立的新会话并保留来源 [@ref-github-copilot-lt-changelog-fork-branch]。hooks 层面 `sessionStart`/`sessionEnd` 界定会话边界，`subagentStop` 在子代理完成时触发 [@ref-github-copilot-cmp-hooks]；会话结束时 `sessionEnd` hook 的触发时机也可用于观察记录收尾 [@ref-github-copilot-lt-changelog-sessionend-hooks]——但**子代理是否复用父会话的 `events.jsonl`、还是各有独立记录，来源没有说明**，这是 `transcripts.lifecycle` 的主要缺口，故状态为 `partial`。

## 存储分工：文件、配置与远端同步 {#transcripts-storage-database-and-sync}

**没有证据表明 Copilot CLI 用数据库存会话。** 官方最佳实践页给出的会话存储是文件与目录树 [@ref-github-copilot-best-context]；配置目录参考页的顶层清单里也没有任何数据库文件，只有 `config.json`、`settings.json` 等 JSON 文件与若干子目录 [@ref-github-copilot-cfgdir-overview]。因此 `transcripts.database` 记为“未使用数据库”，但这是**基于已列举的目录清单的否定性结论**，不是官方声明；仍标 `partial`，因为无源码可排除 CLI 内部使用嵌入式存储而未在文档目录中出现。

分工上，会话正文与元数据在 `session-state/{session-id}/`；认证与已安装插件等内部状态在 `config.json`；用户设置在 `settings.json` [@ref-github-copilot-lt-changelog-settings-json-split]；用量指标追加进 `events.jsonl` 本身而不是独立指标库 [@ref-github-copilot-lt-changelog-events-metrics]。会话选择器读取的分支名与空闲/占用状态说明存在会话级索引信息，但来源未说明该索引是每次扫描目录得出还是另有缓存。

远端同步是本章唯一涉及会话正文的非本地路径。`changelog.md` 记录会话同步提示会解释 GitHub.com 跨设备同步 [@ref-github-copilot-lt-changelog-session-sync]。这条只说明存在该机制，**没有**说明同步的是完整 `events.jsonl`、压缩后的摘要还是仅元数据，也没有说明是否可关闭、加密方式或配额。本章不对同步内容做任何断言。

恢复所必需的文件：来源能证实的必需项是 `events.jsonl`（正文）与 `checkpoints/`（压缩历史）；`workspace.yaml` 被文档描述为“Metadata”，其是否参与恢复未证实；`files/` 是“persistent artifacts”，与恢复对话的关系未证实。**能否重建**：`events.jsonl` 显然是记录本体，无法从其它文件重建；`workspace.yaml` 能否由 CLI 重新生成未证实。

## 归档、导出与移动 {#transcripts-archive-and-move}

Copilot CLI **没有官方会话归档开关或导出命令**。已查入口包括命令参考页、配置目录参考页、slash 命令清单与完整 `changelog.md`，未发现 `archive`、`export`、`backup` 类会话命令；hooks 概念页把“会话结束时把 transcript 归档到存储位置”列为 hook 的**示例用途**，即由用户自己写脚本实现，而不是产品内建开关 [@ref-github-copilot-cmp-hooks]。

官方支持的做法是**整体移动配置目录**。配置目录参考页说明：设置 `COPILOT_HOME` 后，原位置的配置、会话历史、已安装插件与已保存权限都不会在新位置被找到；如需保留，应把 `~/.copilot` 的内容复制或移动到新位置 [@ref-github-copilot-cfgdir-move]。这是本主题唯一有第一方依据的“迁移会话记录”途径。

移动的代价：路径改变后，本机会话与新位置绑定；若涉及跨设备，还要面对同步机制的不确定性 [@ref-github-copilot-lt-changelog-session-sync]。手工复制单个 `session-state/{session-id}/` 目录到另一台机器能否被识别，来源没有说明——本章不给出该操作。

`/fork` 是唯一由产品自身提供的、会保留来源的记录衍生方式 [@ref-github-copilot-lt-changelog-fork-branch]，但它产生的是新会话而不是归档副本。

**已查入口与剩余缺口（`transcripts.archive`）**：官方归档/导出能力、备份文件格式、跨机器可移植性、会话文件的路径无关性均无来源，故状态为 `partial`。

## 删除与保留 {#transcripts-cleanup}

官方删除机制在 `/session` 下：`changelog.md` 记录新增 `/session delete`、`delete {session-id}` 与 `delete-all` 子命令，以及会话选择器里的 x 删除键 [@ref-github-copilot-lt-changelog-session-delete-subcommands]。同一条发行说明给出关键区分：本地会话被**永久删除**，而由服务器托管的会话只是**关闭**，其对话仍留在服务器上 [@ref-github-copilot-lt-changelog-session-picker-delete]；界面会说明当前行将执行哪一种，不能删除的行不显示 x 提示。另有发行说明提到“从 CLI 内直接运行删除旧会话曾失败、已修复” [@ref-github-copilot-lt-changelog-delete-old-sessions]，说明删除路径曾有问题。

`config.json` 层面：配置目录参考页把 `config.json` 标为“删除需谨慎”，删除会重置包括认证在内的应用状态，需要重新认证，CLI 会在下次启动时重新探测内部状态 [@ref-github-copilot-cfgdir-delete]。该表把 `logs/` 标为可安全删除，理由是日志每个会话重新生成、删除无功能影响 [@ref-github-copilot-cfgdir-delete]。**该表的行项目里不包含 `session-state/`**，因此官方没有对手工删除会话目录给出任何安全性说明。

保留机制：唯一由产品自身执行的保留/回收策略是启动时自动清理旧的进程日志文件，位于 `~/.copilot/logs/`，目的是避免磁盘无界增长 [@ref-github-copilot-lt-changelog-logs-pruning]。**来源没有说明 `events.jsonl` 或会话目录有任何自动保留期限或自动回收。**

手工删除的后果与必须停止的写入者：`changelog.md` 多处记录会话在**运行中**被写（`sessionEnd` 时才追加指标 [@ref-github-copilot-lt-changelog-events-metrics]），因此删除前应先退出所有正在运行的 Copilot CLI 进程。级联删除、孤儿记录与重建行为没有来源描述。

**关键纪律**：官方未把 `session-state/` 列入“safe to delete”表，这**不等于**可以安全删除，也**不等于**不安全。本章不给出该目录的手工删除建议——需要该结论时，先取得官方对会话目录删除语义的说明。状态为 `partial`。

## 定位、读取与排错 {#transcripts-diagnostics}

会话内可直接读取的记录视图由 `/session` 提供：查看当前会话信息、`/session checkpoints` 列出检查点、`/session checkpoints NUMBER` 查看某个检查点详情、`/session files` 列出本会话产生的临时文件、`/session plan` 查看当前计划 [@ref-github-copilot-best-sessions]。这些是官方支持的读取入口；`/context` 给出 token 用量明细（系统/工具、消息历史、剩余空间、缓冲分配）[@ref-github-copilot-conc-context]。

完整性排错方面，发行说明记录了两条可观察行为：会话恢复在保存失败时会保留待写入的对话事件并说明重试是安全的 [@ref-github-copilot-lt-changelog-session-resume-integrity]；恢复大型本地会话时 transcript 内存保持有界以避免 CLI 变慢 [@ref-github-copilot-lt-changelog-session-resume-integrity]。这两条说明恢复失败有可识别信号，但来源没有给出校验 `events.jsonl` 完整性的官方手段。

超出官方工具的排查路径（本机可做，但非产品承诺）：直接读 `~/.copilot/session-state/{session-id}/events.jsonl`（JSON Lines，可逐行解析）、`workspace.yaml`（YAML）、`checkpoints/` 与 `files/`。路径模板中的 `{session-id}` 为占位符；替换 `COPILOT_HOME` 时整棵 `session-state` 随之改址 [@ref-github-copilot-cfgdir-move]。清理相关排错可对照配置目录参考页的删除建议表 [@ref-github-copilot-cfgdir-delete]。

**已查入口与剩余缺口（`transcripts.diagnostics`）**：`/session` 系列命令已确认为官方读取入口；缺口是官方没有提供校验命令、损坏 `events.jsonl` 的修复方式、以及判断某个会话目录是否可安全删除的官方判据。

跨主题关联：会话工作目录与恢复行为见 Configuration 章节的运行时覆盖；会话生命周期边界与 hook 触发时机见 Hooks 章节的 `sessionStart`/`sessionEnd`；`files/` 中持久产物与子代理的记录归属涉及 Custom agents 章节。
