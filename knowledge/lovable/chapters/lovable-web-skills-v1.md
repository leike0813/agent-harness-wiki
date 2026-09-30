---
schema_version: 3
record_kind: production
edition_id: lovable-web-skills-v1
harness_id: lovable
topic: skills
title: "Lovable Web 的技能机制：工作区技能、包格式、发现与调用、权限与诊断"
sections:
  - section_id: skills-sources
    surface_ids: [web]
    source_refs: [ref-lovable-skills-custom-builtin, ref-lovable-skills-faq, ref-lovable-skills-rbac, ref-lovable-projset-skills, ref-lovable-skills-vs-knowledge, ref-lovable-knowledge-intro]
  - section_id: skills-packages
    surface_ids: [web]
    source_refs: [ref-lovable-skills-write-manually, ref-lovable-skills-import-github, ref-lovable-skills-upload-zip]
  - section_id: skills-format
    surface_ids: [web]
    source_refs: [ref-lovable-skills-anatomy, ref-lovable-skills-bundled, ref-lovable-skills-upload-zip, ref-lovable-skills-best-practices]
  - section_id: skills-loading
    surface_ids: [web]
    source_refs: [ref-lovable-skills-autouse, ref-lovable-skills-invoke, ref-lovable-skills-disable-auto, ref-lovable-skills-custom-builtin, ref-lovable-skills-faq, ref-lovable-skills-write-manually, ref-lovable-knowledge-notes]
  - section_id: skills-conditions
    surface_ids: [web]
    source_refs: [ref-lovable-skills-rbac, ref-lovable-skills-faq, ref-lovable-projset-skills]
  - section_id: skills-diagnostics
    surface_ids: [web]
    source_refs: [ref-lovable-skills-rbac, ref-lovable-skills-disable-auto, ref-lovable-skills-invoke, ref-lovable-skills-best-practices, ref-lovable-skills-faq]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [web]
        section_id: skills-sources
        status: answered
        source_refs: [ref-lovable-skills-custom-builtin, ref-lovable-skills-faq, ref-lovable-skills-rbac, ref-lovable-projset-skills, ref-lovable-skills-vs-knowledge, ref-lovable-knowledge-intro]
  - question_id: skills.discovery
    answers:
      - surface_ids: [web]
        section_id: skills-loading
        status: answered
        source_refs: [ref-lovable-skills-autouse, ref-lovable-skills-invoke, ref-lovable-skills-disable-auto, ref-lovable-skills-custom-builtin, ref-lovable-skills-faq, ref-lovable-skills-write-manually, ref-lovable-knowledge-notes]
  - question_id: skills.collision
    answers:
      - surface_ids: [web]
        section_id: skills-format
        status: unknown
        source_refs: [ref-lovable-skills-anatomy, ref-lovable-skills-bundled, ref-lovable-skills-upload-zip, ref-lovable-skills-best-practices]
  - question_id: skills.format
    answers:
      - surface_ids: [web]
        section_id: skills-format
        status: partial
        source_refs: [ref-lovable-skills-anatomy, ref-lovable-skills-bundled, ref-lovable-skills-upload-zip, ref-lovable-skills-best-practices]
  - question_id: skills.extensions
    answers:
      - surface_ids: [web]
        section_id: skills-packages
        status: partial
        source_refs: [ref-lovable-skills-write-manually, ref-lovable-skills-import-github, ref-lovable-skills-upload-zip]
  - question_id: skills.loading
    answers:
      - surface_ids: [web]
        section_id: skills-loading
        status: answered
        source_refs: [ref-lovable-skills-autouse, ref-lovable-skills-invoke, ref-lovable-skills-disable-auto, ref-lovable-skills-custom-builtin, ref-lovable-skills-faq, ref-lovable-skills-write-manually, ref-lovable-knowledge-notes]
  - question_id: skills.invocation
    answers:
      - surface_ids: [web]
        section_id: skills-loading
        status: answered
        source_refs: [ref-lovable-skills-autouse, ref-lovable-skills-invoke, ref-lovable-skills-disable-auto, ref-lovable-skills-custom-builtin, ref-lovable-skills-faq, ref-lovable-skills-write-manually, ref-lovable-knowledge-notes]
  - question_id: skills.conditions
    answers:
      - surface_ids: [web]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-lovable-skills-rbac, ref-lovable-skills-faq, ref-lovable-projset-skills]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [web]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-lovable-skills-rbac, ref-lovable-skills-disable-auto, ref-lovable-skills-invoke, ref-lovable-skills-best-practices, ref-lovable-skills-faq]
---

## 技能来源、作用域与固定来源范围 {#skills-sources}

Lovable 是托管式 Web 产品（catalog 只登记 `web` 界面，`kind: web`），没有 CLI、没有磁盘上的技能根目录，技能是**工作区级（workspace）的平台配置**，而不是仓库里的文件。本章固定来源是官方文档站 2026-10-01 抓取的已登记 markdown 快照：`features/skills.md`、`features/knowledge.md`、`features/projects/settings.md`，以及作为页面全集索引的 `llms.txt`；登记来源里没有官方 npm 包或源码仓库，整章按来源级知识阅读。

技能只有两个来源，页面把它们分成两块列出 [@ref-lovable-skills-custom-builtin]：

| 来源 | 由谁维护 | 作用域 | 可否编辑 |
| :-- | :-- | :-- | :-- |
| **Workspace skills** | 工作区成员（owner/admin 创建与编辑） | 整个工作区，对所有项目可用 | 可以编辑、删除、下载 |
| **Skills built by Lovable** | Lovable 官方 | 每个工作区开箱可用 | 只读，不能编辑、删除或下载 |

两类技能出现在同一个 **Skills** 列表里：输入 `/` 打开列表，可以显式调用，也会在请求匹配时被自动应用 [@ref-lovable-skills-custom-builtin]。技能不进入单项目作用域，也没有"按项目覆盖"的概念——官方 FAQ 明确"每个工作区里定义的技能对该工作区所有项目可用"，并且**在 Chats（工作区级聊天）中不可用** [@ref-lovable-skills-faq]。

管理入口只有工作区侧两处，加上项目内的快捷入口 [@ref-lovable-skills-rbac][@ref-lovable-projset-skills]：

* `Workspace settings → Skills`（工作区设置的 **Customization** 分组）——创建、编辑、删除、导入、下载、开关自动使用；
* `Project settings → Skills`——在项目里打开同一份工作区技能列表；
* 项目聊天中的 `/` 技能列表，以及 **+** 菜单的 **Add context → Skills**。

**与 knowledge 的分工**是理解技能定位的前提：knowledge（工作区知识与项目知识）**始终**进入上下文，技能只在描述匹配时按需加载 [@ref-lovable-skills-vs-knowledge][@ref-lovable-knowledge-intro]。因此"每条消息都适用"的规则放进 knowledge，"只在特定任务适用"的流程放进技能。本章只讲技能；knowledge 的字段、上限与优先级在 `configuration` 主题里展开。

**缺口**：官方来源没有给出技能的服务端存储位置、加载时的排序或截断规则，也没有说明一个请求最多能同时加载多少技能；`skills.faq` 只说明"技能是工作区级、随包下载"，不涉及物理路径。

## 技能包的创建入口与包格式 {#skills-packages}

Workspace owner/admin 有五条创建路径：四条位于 `Workspace settings → Skills → Add`，一条从项目聊天反向固化 [@ref-lovable-skills-write-manually][@ref-lovable-skills-import-github][@ref-lovable-skills-upload-zip]。

| 入口 | 输入 | 平台做什么 |
| :-- | :-- | :-- |
| **Build with Lovable** | 一段引导对话（`/skill-creator`） | Lovable 提问并起草技能，批准后发布到工作区 [@ref-lovable-skills-write-manually] |
| **Write manually** | Name / Description / Content 三个字段 | 直接把技能发布到工作区并立即可用 [@ref-lovable-skills-write-manually] |
| **Import from GitHub** | 公开仓库或子目录 URL | 下载仓库、校验，再作为技能加入工作区 [@ref-lovable-skills-import-github] |
| **Upload ZIP** | `.zip` 或 `.skill` 文件 | 校验压缩包后发布，保留捆绑文件 [@ref-lovable-skills-upload-zip] |
| **Save from a project chat** | 聊天里说"save that as a skill" | 把一次成功交互固化成技能草稿，批准后发布 [@ref-lovable-skills-write-manually] |

包格式的关键约定 [@ref-lovable-skills-import-github][@ref-lovable-skills-upload-zip]：

* 仓库导入支持三种 URL：整仓库 `https://github.com/owner/repo`（此时 `SKILL.md` 必须在仓库根）、子目录 `https://github.com/owner/repo/tree/{branch}/path/to/skill`（`{branch}` 是分支名占位）、以及 `blob` 文件 URL；用 `blob` URL 时会导入 `SKILL.md` 所在的父目录。
* ZIP 包里的 `SKILL.md` 必须在根目录，或位于**一层**包裹目录内；被指令引用的附带文件与 `SKILL.md` 放在同一目录。
* 平台在发布前会校验包；macOS 元数据（`__macOSX/`、根目录的 `.DS_Store`）在根目录被忽略。

官方明确说 Lovable 的技能与 Anthropic Claude 及任何遵循 **Agent Skills** 约定的工具使用同一套 `SKILL.md` 形态，`.skill` / `.zip` 可以双向搬运；下载自定义技能得到 `.zip`，再上传到别的工具即可 [@ref-lovable-skills-upload-zip]。

**缺口**：来源没有给出 `SKILL.md` 的 frontmatter 字段清单与 YAML 键名——文档只以"Name / Description / Content"三段式描述一次技能结构，并说明它与 Agent Skills 约定同形，但没有任何一页展示带 YAML frontmatter 的 `SKILL.md` 全文。因此"frontmatter 里哪些字段必填、可选或被忽略"无法从登记来源确定（详见下一节）。

## 名称、描述、指令与捆绑文件的解析规则 {#skills-format}

技能由三部分组成，三个部分都必填 [@ref-lovable-skills-anatomy]：

| 部分 | 规则 |
| :-- | :-- |
| **Name** | 1–64 个字符；只允许小写字母、数字和连字符；不能以连字符开头或结尾，不能出现连续连字符；**创建后不可改名**（只能删除重建）；`goal` 这一名称保留给内置 [Goal](/features/goal-runs) 命令 |
| **Description** | 决定何时加载技能的主要信号；官方要求以 "Use when..." 开头并写清适用与**不适用**的边界 |
| **Instructions** | 加载后 Lovable 遵循的 markdown 正文；整份 `SKILL.md` 上限 **100,000 字符** |

捆绑文件（bundled files）是可选资源 [@ref-lovable-skills-bundled]：

* 单个文件 ≤ **1 MB**；一个技能最多 **200 个文件**、合计 ≤ **10 MB**；
* 上传的压缩包本身 ≤ **50 MB** [@ref-lovable-skills-upload-zip]；
* 展开技能时捆绑文件列在 **Bundled files** 下，下载/导入时随包一起走；
* 文档给出的目录形态是 `launch-checklist/` 下并列 `SKILL.md`、`seo-checklist.md`、`accessibility-checklist.md` [@ref-lovable-skills-bundled]。

**同名冲突的处理在登记来源里没有写明**：来源只说 Name 是"短的、永久的标识符"，改名必须删除重建 [@ref-lovable-skills-anatomy]，但没有说明同一工作区导入第二个同名技能时是拒绝、覆盖还是并存；也没有命名空间或前缀规则。检查过的入口是 `features/skills.md` 全文（含 Add/Import/Upload 各节与 FAQ）与 `features/knowledge.md` 的 FAQ，两者都未涉及同名去重。这一项按 `unknown` 记录。

描述质量直接决定触发率，官方给了正反例，并建议一个技能只做一件事、把"始终生效"的规则移回 knowledge [@ref-lovable-skills-best-practices]。

## 发现、加载与调用 {#skills-loading}

**发现与加载的时机**：Lovable 读取每个技能的 **description**，判断它与当前请求是否相关；命中才把指令正文载入上下文。工作区里可以并存大量技能而不会全部进入每次对话 [@ref-lovable-skills-autouse]。这是一次"按请求做相关性匹配"的过程，不是文件系统扫描；来源没有给出匹配算法、相似技能竞争时的取舍规则，也没有给出目录深度/文件名/符号链接等扫描语义——这些概念在托管产品里不存在。

**显式调用**：在聊天输入框输入 `/` 打开 **Skills** 列表，选中技能后继续写请求，技能以标签形式出现在消息里；也可以走 **+** → **Add context → Skills**。桌面端在列表旁的面板里显示技能指令（内置技能显示描述）；发送后标签可悬停查看描述、点开预览、用铅笔图标进入该技能设置 [@ref-lovable-skills-invoke]。技能是"怎么做"（how），提示词是"做什么"（what）。

**自动调用与禁用** [@ref-lovable-skills-autouse][@ref-lovable-skills-disable-auto]：

* 每个自定义工作区技能的 **Automatic use** 默认开启，任务匹配时自动应用，同时仍可手动 `/skill-name` 调用；
* 关闭后，Lovable **不会在任何项目里自动应用**该技能，但技能仍留在工作区、仍出现在 `/` 列表里，仍可手动调用；该开关是工作区级，从 `Workspace settings → Skills` 或 `Project settings → Skills` 切换 [@ref-lovable-skills-disable-auto]；
* 内置技能（Skills built by Lovable）不可编辑、删除或下载，包括 `Goal` [@ref-lovable-skills-custom-builtin]。

**一次请求可以命中多个技能**：官方 FAQ 明确"Lovable can use more than one skill in a single message"，并建议保持技能聚焦以免相互矛盾 [@ref-lovable-skills-faq]。

**改动何时生效**：手动新增的技能"立即可用于整个工作区" [@ref-lovable-skills-write-manually]；knowledge 类指令的改动同样在后续消息立即生效（对照来源：`features/knowledge.md` 的 Important notes）[@ref-lovable-knowledge-notes]。

## 角色、计划与审计条件 {#skills-conditions}

技能的可写权限严格按工作区/项目角色划分 [@ref-lovable-skills-rbac]：

| 角色 | 允许的动作 |
| :-- | :-- |
| Workspace owner / admin | 创建、编辑、删除、导入自定义工作区技能（Skills 页面、聊天、GitHub、ZIP）；开关某个技能的工作区级**自动使用** |
| Workspace owner/admin/editor；Project owner/admin/editor | 查看并调用工作区可用技能；下载自定义工作区技能 |

此外，**技能在 Chats 中不可用**（Chats 是项目之外的工作区级聊天）[@ref-lovable-skills-faq]；项目设置里的 Skills 标签页只是同一份工作区技能列表的入口 [@ref-lovable-projset-skills]。

**Enterprise 计划**下技能的每次编辑与删除会写入工作区审计日志 [@ref-lovable-skills-rbac][@ref-lovable-skills-faq]。`features/skills.md` 没有把技能与其他功能开关绑定，也没有"工作区信任/项目信任"这类概念；条件只有上表的角色、计划与"是否在 Chats 中"三条。

**缺口**：来源没有说明管理员关闭自动使用后，是否影响已排队的请求、是否影响内置技能；也没有说明工作区降级（离开 Enterprise）时审计日志的保留策略。

## 管理与诊断 {#skills-diagnostics}

可观察入口 [@ref-lovable-skills-rbac][@ref-lovable-skills-disable-auto]：

* `Workspace settings → Skills` 列出工作区全部技能，展开可看 Description / Instructions / **Bundled files** 列表，以及 **Automatic use** 开关；
* **Download** 导出完整技能包为 `.zip`，用于备份、迁移到另一个工作区或交给其他遵循 `SKILL.md` 的工具；
* 项目聊天里技能标签的悬停描述、预览与设置入口 [@ref-lovable-skills-invoke]；
* 删除技能会把它从工作区和该工作区的所有项目里移除 [@ref-lovable-skills-rbac]。

**排错路径**（来源给出的唯一手段）：如果技能没有在该触发的时候触发，官方建议**改写 description**，写得更明确、更有边界；描述含糊会导致漏触发或误触发 [@ref-lovable-skills-best-practices][@ref-lovable-skills-faq]。技能成本与消耗无关——创建/使用技能本身不额外计费，费用跟随承载它的那条消息 [@ref-lovable-skills-faq]。

**缺口**：来源没有提供"技能被发现/被选中"的诊断日志或调试视图（只有技能内容预览与 Enterprise 审计日志），也没有说明改动技能后需要重载或重启（托管产品无需本地重载，但没有显式说明）。以上已检查 `features/skills.md` 全文与 `features/knowledge.md` 的 FAQ。
