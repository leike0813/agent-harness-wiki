---
schema_version: 3
record_kind: production
edition_id: lovable-local_transcripts-v1
harness_id: lovable
topic: local_transcripts
title: "Lovable 本地 Transcript：项目文件、云端记录边界与读取入口"
sections:
  - section_id: transcripts-scope
    surface_ids: [web]
    source_refs: [ref-lovable-lt-build-modes-carry, ref-lovable-lt-build-steps, ref-lovable-lt-ws-sso-session, ref-lovable-lt-ai-appcontext, ref-lovable-lt-ai-server-side, ref-lovable-lt-index-chat-page, ref-lovable-lt-index-chats-page]
  - section_id: transcripts-project-files
    surface_ids: [web]
    source_refs: [ref-lovable-lt-plan-store, ref-lovable-lt-plan-faq-store, ref-lovable-lt-plan-shape]
  - section_id: transcripts-lifecycle
    surface_ids: [web]
    source_refs: [ref-lovable-lt-plan-versions, ref-lovable-lt-plan-history-reset, ref-lovable-lt-build-followup, ref-lovable-lt-build-stop-undo, ref-lovable-lt-build-crossproject, ref-lovable-lt-index-crossproject]
  - section_id: transcripts-storage-gaps
    surface_ids: [web]
    source_refs: [ref-lovable-lt-git-no-db, ref-lovable-lt-git-export-only]
  - section_id: transcripts-archive-cleanup
    surface_ids: [web]
    source_refs: [ref-lovable-lt-proj-delete, ref-lovable-lt-ws-delete, ref-lovable-lt-git-branch-backup]
  - section_id: transcripts-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-lt-build-details, ref-lovable-lt-git-restore, ref-lovable-lt-ai-activity-window]
questions:
  - question_id: transcripts.scope
    answers:
      - surface_ids: [web]
        section_id: transcripts-scope
        status: partial
        source_refs: [ref-lovable-lt-build-modes-carry, ref-lovable-lt-build-steps, ref-lovable-lt-index-chat-page, ref-lovable-lt-index-chats-page]
  - question_id: transcripts.location
    answers:
      - surface_ids: [web]
        section_id: transcripts-project-files
        status: partial
        source_refs: [ref-lovable-lt-plan-store, ref-lovable-lt-plan-faq-store]
  - question_id: transcripts.naming
    answers:
      - surface_ids: [web]
        section_id: transcripts-project-files
        status: partial
        source_refs: [ref-lovable-lt-plan-store, ref-lovable-lt-plan-faq-store]
  - question_id: transcripts.format
    answers:
      - surface_ids: [web]
        section_id: transcripts-project-files
        status: partial
        source_refs: [ref-lovable-lt-plan-store, ref-lovable-lt-plan-faq-store, ref-lovable-lt-plan-shape]
  - question_id: transcripts.schema
    answers:
      - surface_ids: [web]
        section_id: transcripts-project-files
        status: unknown
        source_refs: [ref-lovable-lt-plan-shape]
  - question_id: transcripts.lifecycle
    answers:
      - surface_ids: [web]
        section_id: transcripts-lifecycle
        status: partial
        source_refs: [ref-lovable-lt-plan-versions, ref-lovable-lt-plan-history-reset, ref-lovable-lt-build-followup, ref-lovable-lt-build-stop-undo, ref-lovable-lt-build-crossproject, ref-lovable-lt-index-crossproject]
  - question_id: transcripts.database
    answers:
      - surface_ids: [web]
        section_id: transcripts-storage-gaps
        status: unknown
        source_refs: [ref-lovable-lt-git-no-db, ref-lovable-lt-git-export-only]
  - question_id: transcripts.archive
    answers:
      - surface_ids: [web]
        section_id: transcripts-archive-cleanup
        status: partial
        source_refs: [ref-lovable-lt-proj-delete, ref-lovable-lt-ws-delete, ref-lovable-lt-git-branch-backup]
  - question_id: transcripts.cleanup
    answers:
      - surface_ids: [web]
        section_id: transcripts-archive-cleanup
        status: partial
        source_refs: [ref-lovable-lt-proj-delete, ref-lovable-lt-ws-delete, ref-lovable-lt-git-branch-backup]
  - question_id: transcripts.diagnostics
    answers:
      - surface_ids: [web]
        section_id: transcripts-diagnostics
        status: partial
        source_refs: [ref-lovable-lt-build-details, ref-lovable-lt-git-restore, ref-lovable-lt-ai-activity-window]
---

本章回答 Lovable `web` 界面上会话记录的实际形态。结论先行：**已归档的官方文档里没有任何本机（用户机器）会话记录文件、数据库或索引**。Lovable 是云端构建平台，构建会话与项目 chat history 存在 Lovable 侧，唯一被文档写明落在磁盘上的记录是项目内的 `.lovable/plan.md` 与 `.lovable/plan/` 目录——它们属于项目文件，随 Git 同步一起进出，不是本机 transcript。下文严格区分这三类东西：项目文件、Lovable 云端保存的对话记录、以及 Lovable **app 的** AI 调用记录（那是用户构建出来的应用自己的数据面，不是构建会话）。

固定来源范围：`features/plan-mode.md`、`features/agent-mode.md`、`features/projects/settings.md`、`features/workspace-admin-settings.md`、`integrations/git-sync-overview.md`、`features/ai.md` 与 `llms.txt` 页面索引，各自绑定本轮 scan 固定的一个 `documentation` snapshot（`snapshot-lovable-lt-planmode`、`snapshot-lovable-lt-agentmode`、`snapshot-lovable-lt-projset`、`snapshot-lovable-lt-wsadmin`、`snapshot-lovable-lt-gitsync`、`snapshot-lovable-lt-ai`、`snapshot-lovable-lt-index`），抓取时间见各 snapshot 的 `source_fetched_at`（2026-10-06）。这些文档的 `version_applicability` 为 `unknown`，因此**本章结论不能绑定到任何已安装的 Lovable 版本**，只描述抓取时刻官方文档所描述的形态。`catalog/harnesses.yaml` 中 `lovable` 只声明了 `web` 一个界面，桌面应用与移动应用不在本章范围。

## 记录范围与边界 {#transcripts-scope}

三种不同的"记录"在 Lovable 里容易混为一谈，先拆开 [@ref-lovable-lt-build-modes-carry]：

* **构建会话（project chat）**：Chat、Plan、Build 三种模式共享同一条对话，随时切换而不中断。官方文档确认对话存在并可跨模式延续，但**没有**说明每条消息、每次工具调用是否以及以何粒度被持久化，也没有给出控制这一行为的开关。
* **运行过程可见性（不是存储契约）**：Build 模式下任务卡片显示当前步骤、正在修改的文件、正在使用的工具（搜索、网页抓取、图片生成）以及多步实现的进度 [@ref-lovable-lt-build-steps]。这是**界面呈现**，来源没有说这些条目来自何处、有无独立留存期。
* **Lovable app 的 AI 调用记录**：见下文"不要混淆"一节。

官方页面索引确认了对话入口本身：项目内对话在 editor 的 project chat 面板，工作区级别的对话在独立的 Chats 页面 [@ref-lovable-lt-index-chat-page][@ref-lovable-lt-index-chats-page]。两个页面的完整文档**不在**本轮已归档来源内，这是本章最主要的证据缺口——chat 面板页面通常会说明撤销、错误修复与队列等操作，但本轮无法引用。

**易混术语**：`workspace-admin-settings.md` 里的 "session" 指的是 SSO 登录会话时长（可设 8h/24h/48h/7d 一类档位），不是会话记录 [@ref-lovable-lt-ws-sso-session]。搜索文档时若只按 session 匹配，很容易把登录会话误当成 transcript。

**不要混淆：app 的 AI 调用不是构建会话**。`features/ai.md` 记录的是用户**构建出来的应用**调用模型时产生的记录：AI 调用经由 Lovable 创建的后端函数执行，凭据与 prompt 保留在服务端 [@ref-lovable-lt-ai-server-side]；开关打开时 Lovable 为每次调用保留完整请求与响应、自动移除密钥、**细节保留 90 天** [@ref-lovable-lt-ai-appcontext]。这是部署应用的运行数据，与 Lovable 自己的构建对话记录是两套东西，且 90 天这个保留期**不适用**于构建会话。

**已查入口**：`features/plan-mode.md`、`features/agent-mode.md`、`features/ai.md`、`features/projects/settings.md`、`features/workspace-admin-settings.md`、`integrations/git-sync-overview.md`、`llms.txt` 全文（以 session、conversation、chat history、transcript、retention、delete、export、local、storage、history 检索）。

**剩余缺口**：构建会话的记录范围、落盘与否、是否有开关、是否脱敏，全部无来源；需要 `features/projects/chat.md`、`features/chats.md`、`features/drafts.md` 与隐私设置页的原文。

## 项目内记录文件：路径、命名与格式 {#transcripts-project-files}

已归档文档中唯一写明磁盘路径的记录载体是 Plan mode 的计划文件 [@ref-lovable-lt-plan-store]：

* **位置**：项目根下 `.lovable/plan.md` 保存当前正在做的计划；批准后 Lovable 把该文件移入 `.lovable/plan/` 目录，成为**以计划命名的带日期文件**，`.lovable/plan.md` 随后为下一个计划重新开始。
* **命名**：活动文件固定名 `plan.md`；归档文件名由 Lovable 生成，来源只说是"a dated file named after the plan"，**没有**给出日期格式、扩展名以外的规则，也没有会话 ID、项目路径编码等命名维度。
* **格式**：Markdown（`.md`），且是**可读的、面向人的结构化文档**，不是机器记录格式。来源明确说这些文件"像其它项目文件一样"查看 [@ref-lovable-lt-plan-store]，FAQ 复述了同一路径约定 [@ref-lovable-lt-plan-faq-store]。
* **作用域**：这些是**项目文件**，随 Git 同步进出仓库；它们不是本机 transcript，也不随操作系统、环境变量或宿主配置变化。Lovable 没有为它们定义配置开关——用户无法改路径或格式。

计划文档的内容是描述性的而非 schema 化的：来源说一份计划"通常包括"高层方案概述、关键决策/假设/约束、组件与数据模型与 API、分步实施顺序、可选的示意图，且原文用的是 "typically"，即**不构成必填字段契约** [@ref-lovable-lt-plan-shape]。

**本机路径**：已归档来源没有任何 Lovable 客户端在本机写会话记录的位置。不要把 `.lovable/` 写成"本机目录"——它属于项目，随仓库走。

**剩余缺口**：项目 chat history 的存储形态（服务端对象存储、结构化记录或仅界面可读）无来源；附件、草稿、desktop app 的本地状态无来源。

## 记录生命周期 {#transcripts-lifecycle}

已归档来源能证实的生命周期行为集中在计划记录与会话延续上：

* **创建与修改**：计划在 Plan 模式下产生，每次修订都作为一个版本保留 [@ref-lovable-lt-plan-versions]。
* **历史边界**：版本历史只覆盖**当前这一轮规划**；批准或跳过计划后，Lovable 为下一个计划开启全新历史 [@ref-lovable-lt-plan-history-reset]。这意味着计划版本历史**不是**会话历史的替代品，二者不能互相推断。
* **会话中途干预**：可在 Lovable 工作时发送跟进、纠正或新想法，它在下一个自然停顿点接手而不丢失已完成的工作 [@ref-lovable-lt-build-followup]；中止请求时已完成的工作会被保留，按已完成部分计费 [@ref-lovable-lt-build-stop-undo]。
* **分支与子代理**：已归档文档未描述会话的分支（draft）与子代理记录如何落盘。计划模式的定价说明提到 Lovable 会运行 subagent research，但那是计费口径，没有记录格式 [@ref-lovable-lt-plan-versions]。
* **跨项目读取**：跨项目引用允许 agent 访问同工作区**其它项目的 project chat history**，只读且遵守工作区权限 [@ref-lovable-lt-build-crossproject]。官方页面索引对 cross-project referencing 的描述同样把 "chat history" 列为可复用对象之一 [@ref-lovable-lt-index-crossproject]。这是来源里唯一明确写出"对话记录会被另一个执行体读取"的地方，但它说明的是访问控制，不是存储位置。
* **上下文压缩后延续**：无来源。

## 数据库、索引与不可见部分 {#transcripts-storage-gaps}

**已查结论：没有证据表明 Lovable 用数据库保存会话记录，也没有证据表明存在本机索引文件。** 来源在这两点上保持沉默，因此本章对 `transcripts.database` 记 `unknown`，而不是"不使用数据库"。

Git sync 的文档给出两条**反向**边界，说明即使走用户自有基础设施也拿不到这些数据：

* 仓库包含项目代码与数据库迁移文件，但**从不包含数据库里的数据**；导出数据要走 Cloud 数据导出入口，而不是 Git [@ref-lovable-lt-git-no-db]。
* Git sync **只出不进**：不能把已有仓库导入 Lovable，连接项目时 Lovable 总是新建仓库 [@ref-lovable-lt-git-export-only]。

因此：**代码可备份不等于记录可备份**。把项目同步到自己的 Git，并不会带走 project chat history。

**剩余缺口**：需要 Lovable API 文档（`integrations/lovable-api.md` 原文）确认是否存在读取会话/版本的接口，以及桌面应用是否在本地缓存记录。

## 归档、备份与删除 {#transcripts-archive-cleanup}

官方提供的"保留"机制都是**项目级**的，没有会话级导出开关：

* **删除项目**：在 `Project settings → Danger zone` 执行，需输入项目名确认；**永久删除且不可恢复**，来源建议先下载代码或 remix 项目 [@ref-lovable-lt-proj-delete]。这条对记录的含义是：删除项目会一并带走其 chat history 与计划文件，但官方没有把"删除项目后对话记录如何处置"单独说明，因此**不能**据此断言存在或不存在会话级残留。
* **删除工作区**：永久删除工作区、其全部项目与成员访问并取消订阅，只有 owner 可执行；Lovable support 可在 **60 天宽限期内**恢复工作区 [@ref-lovable-lt-ws-delete]。这是本轮来源中唯一带具体天数的恢复窗口。
* **Git 分支备份**：Lovable 保留同步分支的自己的副本；当你重写历史时，下次同步会先备份 Lovable 的副本再替换 [@ref-lovable-lt-git-branch-backup]。这是代码层面的自动备份，与会话记录无关。

**手动删除的后果**：对 `.lovable/plan.md` 与 `.lovable/plan/` 手动删除，来源没有给出任何后果说明、恢复路径或重建方式——**已查而未证**。已归档来源没有提供在停止任何写入者之前需要执行的操作说明，也没有说明这些文件是否被重新生成。缺少证据不等于可以安全删除，本章不对手动删除给出任何许可。

**剩余缺口**：会话级保留期、导出入口、手动删除后果、级联与孤儿记录处理，均需 `features/projects/chat.md`、`features/projects/remix.md`、`features/drafts.md` 与 `features/advanced-settings.md`（Cloud 数据导出）原文。

## 定位、读取与排错 {#transcripts-diagnostics}

来源给出的读取入口都是界面内的，没有命令行或文件级读取路径：

* **单次运行的过程记录**：点击 activity 卡片或已完成变更的 **Details**，**Timeline** 标签列出 Lovable 采取的每一步（含工具调用），**Changes** 标签显示产生的文件改动 [@ref-lovable-lt-build-details]。这是目前唯一能逐事件回看构建过程的入口。
* **计划版本**：`Plan view` 用 undo/redo 箭头在当前规划轮次的版本间移动，并显示 "Viewing version 2 of 3" 之类的横幅 [@ref-lovable-lt-plan-versions]；24 小时后仍可从 `Project settings → Git` 的 **Check for saved Lovable work** 找回被推送覆盖的工作 [@ref-lovable-lt-git-restore]。
* **应用 AI 调用**：`Cloud → AI` 活动面板可查近期请求；可视范围随计划变化（Free 24 小时、付费 90 天），即使请求内容不可用也会保留状态、模型、token、成本、耗时等摘要 [@ref-lovable-lt-ai-activity-window]。**这一条只适用于用户构建出的应用的 AI 调用，不是构建会话。**

**排错含义**：如果你要检查"构建会话记录是否完整"，当前只能依赖 Details 的 Timeline 与 plan 版本历史；没有文档化的完整性校验、导出或离线读取方式。`surface` 为 `web`，不要把上述界面路径外推到 Lovable desktop app 或移动应用。

**剩余缺口**：是否存在会话导出、API 读取或本地缓存核对手段，需要 `integrations/lovable-api.md`、`integrations/desktop-app.md` 与 `features/projects/chat.md` 原文。