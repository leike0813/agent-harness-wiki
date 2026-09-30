---
schema_version: 3
record_kind: production
edition_id: replit-agent-web-skills-v1
harness_id: replit-agent
topic: skills
title: "Replit Agent Skills：位置、格式、发现、加载与生效条件"
sections:
  - section_id: skills-scope
    surface_ids: [web]
    source_refs: [ref-replit-agent-skills-what, ref-replit-agent-skills-dir-catalog, ref-replit-agent-cust-vs, ref-replit-index-chat]
  - section_id: skills-locations-format
    surface_ids: [web]
    source_refs: [ref-replit-agent-skills-scope, ref-replit-agent-skills-what, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-create, ref-replit-std-add-skill, ref-replit-agent-skills-dir-replit, ref-replit-agent-use-skills-write, ref-replit-agent-use-skills-install, ref-replit-agent-skills-github, ref-replit-agent-skills-share]
  - section_id: skills-discovery-collision
    surface_ids: [web]
    source_refs: [ref-replit-agent-skills-loading, ref-replit-agent-cust-use, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-tools, ref-replit-agent-learn-skills-selective, ref-replit-agent-cust-skills]
  - section_id: skills-loading-invocation
    surface_ids: [web]
    source_refs: [ref-replit-agent-skills-loading, ref-replit-agent-use-skills-chat, ref-replit-agent-use-skills-start, ref-replit-agent-use-skills-install, ref-replit-agent-skills-predefined, ref-replit-agent-cust-use, ref-replit-agent-skills-create]
  - section_id: skills-conditions-diagnostics
    surface_ids: [web]
    source_refs: [ref-replit-agent-cust-availability, ref-replit-agent-skills-create, ref-replit-agent-skills-share, ref-replit-agent-learn-skills-security, ref-replit-agent-skills-github, ref-replit-agent-learn-skills-workspace, ref-replit-agent-cust-manage, ref-replit-agent-cust-create-inst, ref-replit-agent-use-skills-install, ref-replit-std-add-skill]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [web]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-replit-agent-skills-scope, ref-replit-agent-skills-what, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-create, ref-replit-std-add-skill, ref-replit-agent-skills-dir-replit, ref-replit-agent-use-skills-write, ref-replit-agent-use-skills-install, ref-replit-agent-skills-github, ref-replit-agent-skills-share]
  - question_id: skills.discovery
    answers:
      - surface_ids: [web]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-replit-agent-skills-loading, ref-replit-agent-cust-use, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-tools, ref-replit-agent-learn-skills-selective, ref-replit-agent-cust-skills]
  - question_id: skills.collision
    answers:
      - surface_ids: [web]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-replit-agent-skills-loading, ref-replit-agent-cust-use, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-tools, ref-replit-agent-learn-skills-selective, ref-replit-agent-cust-skills]
  - question_id: skills.format
    answers:
      - surface_ids: [web]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-replit-agent-skills-scope, ref-replit-agent-skills-what, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-create, ref-replit-std-add-skill, ref-replit-agent-skills-dir-replit, ref-replit-agent-use-skills-write, ref-replit-agent-use-skills-install, ref-replit-agent-skills-github, ref-replit-agent-skills-share]
  - question_id: skills.extensions
    answers:
      - surface_ids: [web]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-replit-agent-skills-scope, ref-replit-agent-skills-what, ref-replit-agent-skills-dir-install, ref-replit-agent-skills-create, ref-replit-std-add-skill, ref-replit-agent-skills-dir-replit, ref-replit-agent-use-skills-write, ref-replit-agent-use-skills-install, ref-replit-agent-skills-github, ref-replit-agent-skills-share]
  - question_id: skills.loading
    answers:
      - surface_ids: [web]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-replit-agent-skills-loading, ref-replit-agent-use-skills-chat, ref-replit-agent-use-skills-start, ref-replit-agent-use-skills-install, ref-replit-agent-skills-predefined, ref-replit-agent-cust-use, ref-replit-agent-skills-create]
  - question_id: skills.invocation
    answers:
      - surface_ids: [web]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-replit-agent-skills-loading, ref-replit-agent-use-skills-chat, ref-replit-agent-use-skills-start, ref-replit-agent-use-skills-install, ref-replit-agent-skills-predefined, ref-replit-agent-cust-use, ref-replit-agent-skills-create]
  - question_id: skills.conditions
    answers:
      - surface_ids: [web]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-replit-agent-cust-availability, ref-replit-agent-skills-create, ref-replit-agent-skills-share, ref-replit-agent-learn-skills-security, ref-replit-agent-skills-github, ref-replit-agent-learn-skills-workspace, ref-replit-agent-cust-manage, ref-replit-agent-cust-create-inst, ref-replit-agent-use-skills-install, ref-replit-std-add-skill]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [web]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-replit-agent-cust-availability, ref-replit-agent-skills-create, ref-replit-agent-skills-share, ref-replit-agent-learn-skills-security, ref-replit-agent-skills-github, ref-replit-agent-learn-skills-workspace, ref-replit-agent-cust-manage, ref-replit-agent-cust-create-inst, ref-replit-agent-use-skills-install, ref-replit-std-add-skill]
---

## 固定来源与适用范围 {#skills-scope}

本章的固定来源是 Replit 官方文档站 `docs.replit.com` 的 markdown 快照：Agent Skills 参考
[@ref-replit-agent-skills-what]、Skills 目录
[@ref-replit-agent-skills-dir-catalog]、Agent Customization
[@ref-replit-agent-cust-vs]，以及官方文档索引 [@ref-replit-index-chat] 中 Chat
一节列出的定制入口。所有快照都没有标注对应软件版本，因此全章是来源级知识，不绑定任何发行版本。本产品只有
`web` 界面（托管在 replit.com 的 Project Editor 与 Workspace Settings），没有本地 CLI
或本机文件系统入口；下文出现的路径都是**项目仓库内**的路径。

Replit 的 skill 与 `agentskills.io` 开放标准一致：一个 skill
是一个**目录**，目录内必须有 `SKILL.md`（Agent
遵循的指令），其余是可选的支撑文件；目录放在项目的 `/.agents/skills` 下
[@ref-replit-agent-skills-what]。它与常驻指令（Workspace Custom Instructions）和 Memory
的分工是：Custom Instructions 每条消息都注入；skill 只在 Agent 判断任务相关时加载
[@ref-replit-agent-cust-vs]。

## 位置、格式与宿主专有项 {#skills-locations-format}

**skills.roots**：文档确认两类作用域——项目级 skill 随项目文件版本化，位于项目根的
`/.agents/skills`；Workspace 级 skill 由 Workspace 集中管理，出现在该 Workspace
每个项目的 skill 选择器顶部
[@ref-replit-agent-skills-scope][@ref-replit-agent-skills-what]。Workspace
内的选择器还会发现装在项目 `.local/secondary_skills/` 目录里的额外 skill
[@ref-replit-agent-skills-dir-install]。Workspace 级 skill 在 **Settings → Customization
→ Skills** 管理 [@ref-replit-agent-skills-create]，新增方式有四种：自己写（Write a
skill）、上传文件夹（Upload a skill）、从 GitHub 导入（Add from GitHub）、浏览 skill 库
[@ref-replit-std-add-skill]。此外 Replit 自带一批预定义
skill（销售、研究、创意、安全等类别），从聊天里的 **Use a skill**
选择器和新建项目起点选择器即可使用，无需安装 [@ref-replit-agent-skills-dir-replit]。

安装到项目有三种入口：聊天中把 skill 附到单条消息（不安装任何东西）、在 Project Editor
的 Skills 面板 **Discover** 页签名 **Install**（装入 `/.agents/skills`）、或用 skills
CLI（`npx skills NAME -a
replit`）[@ref-replit-agent-skills-dir-install]。手工写在项目里：打开文件树的 **Show
Hidden Files**，进入 `/.agents/skills/`，按 Agent Skills 规范新建 Markdown 文件
[@ref-replit-agent-use-skills-write]；安装后的 skill 跨聊天会话持续存在
[@ref-replit-agent-use-skills-install]。

目录形态（依据 [@ref-replit-agent-skills-what] 的"目录包"描述与 `/.agents/skills`
位置）：

```text
项目根/
  .agents/skills/
    my-skill/
      SKILL.md        (必需：Agent 遵循的指令)
      ...             (可选：支撑文件)
```

**skills.format**：官方来源只确定了结构层面的形状——目录 + `SKILL.md` + 可选支撑文件
[@ref-replit-agent-skills-what]；在 Workspace 创建表单里，一个 skill 由
**Name**（在库中的标识）、**Description**（说明何时该用，Agent 靠它决定是否加载）和
**Instructions**（Agent 要遵循的步骤）三部分组成
[@ref-replit-agent-skills-create]。`SKILL.md` 的 frontmatter
字段清单、必填/可选限制、资源目录解析规则**不在**这两份官方来源里，文档把细节交给外部规范
`agentskills.io/specification` [@ref-replit-agent-skills-what]；因此本问题按 partial
处理，缺口正是 frontmatter 字段表。

**skills.extensions**：Replit 专有、超出"目录 + SKILL.md"核心的项有——Workspace
库（集中管理、跨项目共享）[@ref-replit-agent-skills-scope]；Workspace 成员访问策略
Required / Available（默认关，成员自行开启）/ No access（对成员隐藏），新建 skill 默认
Private（仅自己与 Workspace 管理员可用）[@ref-replit-agent-skills-create]；从公开 GitHub
仓库/目录/文件 URL 导入，导入前 **Preview skills**
只检查文件结构、不加载指令与描述，单次导入上限 50 个 skill、3 500 个文件或 200
MiB，不支持私有仓库 [@ref-replit-agent-skills-github]；把项目 skill 存入 Workspace 库的
**Save to workspace** 动作 [@ref-replit-agent-skills-share]；以及
`.local/secondary_skills/` 这一发现路径
[@ref-replit-agent-skills-dir-install]。文档没有提到任何按
home、环境变量或仓库根之外变化的 skill 路径——本界面没有本机 home 概念，这一点属于结构性
gap。

## 发现时机、扫描范围与同名冲突 {#skills-discovery-collision}

**skills.discovery**：Agent 在**每次聊天**都读取所有已安装 skill
的名称与描述；`SKILL.md` 正文只在 Agent 判定该 skill 与当前任务相关时才载入
[@ref-replit-agent-skills-loading]。Workspace 级 skill
同样只靠描述被自动拉入：提示词与描述大致匹配时 Agent 会自己选，用户也可以显式选择
[@ref-replit-agent-cust-use]。扫描深度、符号链接、忽略规则、重载时机在登记来源中都没有说明；已确认的额外发现路径只有项目内
`.local/secondary_skills/` [@ref-replit-agent-skills-dir-install]。跨工具迁移来源
`rulesync` 可以导入/生成 Replit skill
[@ref-replit-agent-skills-tools]。缺口：何时扫描（启动/每轮/文件变更）与扫描深度未写明。

**skills.collision**：登记来源**没有**给出同名 skill
的去重、覆盖、命名空间或搜索顺序规则。官方只有行为性建议：skill
冲突几乎总是描述作用域问题，应把两者的描述改到不会在同一次任务上同时命中
[@ref-replit-agent-learn-skills-selective]；skill 会随项目演进失效，应像文档一样维护
[@ref-replit-agent-learn-skills-selective]。文档另外强调数量与重叠会稀释 Agent
的注意力，应保持每个 skill 范围紧凑并删除不再需要的
[@ref-replit-agent-cust-skills]。项目级与 Workspace 级同名时谁胜出没有来源可依，按
partial/unknown 阅读。

## 加载、激活与调用 {#skills-loading-invocation}

**skills.loading**：渐进披露两层——元数据（名称 + 描述）每轮进入上下文，正文按相关性载入
[@ref-replit-agent-skills-loading]。在聊天中点 **+** 选 **Use a skill** 把 skill
附到单条消息，只对该消息生效、不在项目里安装任何东西
[@ref-replit-agent-use-skills-chat]；在新建项目时选一个 skill 作为起点，Agent 会用该
skill 的指令搭项目骨架 [@ref-replit-agent-use-skills-start]；要让 skill
在所有会话持续生效就安装到项目 `/.agents/skills`
[@ref-replit-agent-use-skills-install]。预定义 Replit skill 直接从选择器取用，无需安装
[@ref-replit-agent-skills-predefined]。缺口：载入后如何读取 skill
目录内的支撑文件（是否有独立资源 API、以何种目录授权）不在登记来源中。

**skills.invocation**：模型侧是"描述匹配即自动调用"——Agent 读取每个 Workspace skill
的描述，提示词大致匹配时自动拉入，不需要用户手动指定
[@ref-replit-agent-cust-use]。用户侧入口有三类：聊天 **+**
菜单选择（消息级）[@ref-replit-agent-use-skills-chat]、**/** 加 skill
名直接调用，以及项目 Skills 面板 Discover 页签安装
[@ref-replit-agent-cust-use][@ref-replit-agent-use-skills-install]。选择器里也可以直接问
Agent 让它加载某个 skill [@ref-replit-agent-skills-predefined]。缺口：没有来源描述"按
skill 名禁用/启用单个 skill"的用户级开关语义（Workspace 侧有 Available/No access 策略
[@ref-replit-agent-skills-create]，但那是成员访问控制，不是运行期调用策略）。

## 生效条件与诊断 {#skills-conditions-diagnostics}

**skills.conditions**：可用性分三个层次。其一，计划与角色：Skills
在所有付费计划可用；Custom Instructions 仅 Pro 与 Enterprise；Enterprise
只有管理员能创建、编辑、删除 skill 与指令，Pro 任意成员可以，Core 成员可管理 skill
但没有 Custom Instructions [@ref-replit-agent-cust-availability]。其二，Workspace
成员访问策略 Required / Available / No access，新建 skill 默认
Private，创建后可以随时改共享策略、立即生效
[@ref-replit-agent-skills-create][@ref-replit-agent-skills-share]。其三，信任与安全：选择器中的
Replit skill 经过安全审计，从外部来源（CLI、GitHub、社区）安装的**没有**审计，因为 skill
就是 Agent 会遵循的指令，安装前应打开 `/.agents/skills/`
下的文件阅读、核对来源与指令内容 [@ref-replit-agent-learn-skills-security]；GitHub
导入还有 50 skill / 3 500 文件 / 200 MiB 的上限且不支持私有仓库
[@ref-replit-agent-skills-github]。作用域上，Workspace Custom Instructions 对 Workspace
内每个项目生效，而 Workspace skill 只在相关任务上加载
[@ref-replit-agent-learn-skills-workspace]。管理面的改动"应用到未来聊天，不回溯进行中的会话"
[@ref-replit-agent-cust-manage]；保存自定义指令后"作用于 Workspace 中的新项目"
[@ref-replit-agent-cust-create-inst]。缺口：工作区信任/沙箱状态对 skill
的影响没有来源说明。

**skills.diagnostics**：可观察入口——项目内 **Agent Skills → Project skills**
查看已安装的项目 skill，并可 **Save to workspace**
[@ref-replit-agent-skills-share]；项目 Skills 面板 **Discover** 页签列出可安装的社区
skill [@ref-replit-agent-use-skills-install]；Workspace 库中用 skill
卡片、筛选与搜索查看已创建项 [@ref-replit-std-add-skill]；Workspace Settings →
Customization 是编辑、禁用、删除 skill 的位置
[@ref-replit-agent-cust-manage]。安全审计状态的唯一提示是"选择器中的 skill
已审计、外部来源未审计"这一说明
[@ref-replit-agent-learn-skills-security]。缺口：没有"为什么这个 skill
没被发现/没被调用"的诊断输出，也没有文档化的手动重载命令；改动生效时机只笼统写为"未来聊天"
[@ref-replit-agent-cust-manage]。
