---
schema_version: 3
record_kind: production
edition_id: trae-trae-skills-v1
harness_id: trae
topic: skills
title: "Trae IDE 的 Skill 机制：目录、格式、按需加载与启停"
sections:
  - section_id: skills-scope
    surface_ids: [trae]
    source_refs: [ref-trae-skills-overview, ref-trae-skills-vs, ref-trae-skills-types]
  - section_id: skills-roots
    surface_ids: [trae]
    source_refs: [ref-trae-skills-structure, ref-trae-skills-dirs, ref-trae-skills-agents-dir, ref-trae-skills-builtin]
  - section_id: skills-format
    surface_ids: [trae]
    source_refs: [ref-trae-skills-format, ref-trae-skills-create]
  - section_id: skills-loading-invocation
    surface_ids: [trae]
    source_refs: [ref-trae-skills-agents-note, ref-trae-skills-overview, ref-trae-skills-vs, ref-trae-skills-use]
  - section_id: skills-diagnostics
    surface_ids: [trae]
    source_refs: [ref-trae-skills-enable, ref-trae-skills-create, ref-trae-skills-agents-dir]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [trae]
        section_id: skills-roots
        status: answered
        source_refs: [ref-trae-skills-dirs, ref-trae-skills-agents-dir, ref-trae-skills-structure]
  - question_id: skills.discovery
    answers:
      - surface_ids: [trae]
        section_id: skills-roots
        status: partial
        source_refs: [ref-trae-skills-dirs, ref-trae-skills-agents-dir]
  - question_id: skills.collision
    answers:
      - surface_ids: [trae]
        section_id: skills-loading-invocation
        status: partial
        source_refs: [ref-trae-skills-agents-note]
  - question_id: skills.format
    answers:
      - surface_ids: [trae]
        section_id: skills-format
        status: answered
        source_refs: [ref-trae-skills-format]
  - question_id: skills.extensions
    answers:
      - surface_ids: [trae]
        section_id: skills-format
        status: partial
        source_refs: [ref-trae-skills-create]
  - question_id: skills.loading
    answers:
      - surface_ids: [trae]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-trae-skills-overview, ref-trae-skills-use]
  - question_id: skills.invocation
    answers:
      - surface_ids: [trae]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-trae-skills-use]
  - question_id: skills.conditions
    answers:
      - surface_ids: [trae]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-trae-skills-enable, ref-trae-skills-agents-dir]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [trae]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-trae-skills-enable, ref-trae-skills-create]
---

## 固定来源与机制边界 {#skills-scope}

本章的固定来源是 Trae 官方文档站 `docs.trae.ai` 的 IDE 分册页面快照（`/ide/skills`，另有 `/ide/rules`、`/ide/ide-settings-overview` 作为交叉引用）。Trae 是闭源产品，没有可固定的源码仓库，也没有官方 npm 包，整章按来源级知识（`version_applicability: unknown`）阅读；文档正文用 "TraeCode" 指代该 IDE 客户端，下文沿用。

结论：Trae 的 Skill 机制是**开放 Agent Skills 约定的实现**，不是私有格式。文档写明一个 Skill 由 `SKILL.md` 定义，"Each skill corresponds to a SKILL.md file, which describes in a structured manner the information required to complete a certain type of task"。[@ref-trae-skills-overview]

Skill 与相邻机制的分工由官方文档明确划开：**Rules 全量加载**——"once a chat starts, all rules are injected into and continuously occupy the context window"，而 Skills 按需加载、被调用时才注入上下文；**MCP Servers 提供工具**，Skill 描述"how TraeCode should accomplish a task"，二者互补而非替代。[@ref-trae-skills-vs]

Skill 分两类：**Global skills** 跨项目生效，**Project skills** 只在当前项目生效；文档给出的典型用途分别是统一个人/团队范式、固化跨项目的工程能力，以及注入项目专有的业务约束与技术方案。[@ref-trae-skills-types]

## 发现位置与作用域 {#skills-roots}

Skill 都是目录约定，没有集中登记表；一个 Skill 目录里除必需的 `SKILL.md` 外可以有可选文件：[@ref-trae-skills-structure]

```text
skill-name/
├── SKILL.md               # (Required) Core instructions for the agent
├── examples/              # (Optional) Example input/output
├── templates/             # (Optional) Reusable templates
└── resources/             # (Optional) References, scripts, materials, etc
```

存放位置（官方原文的路径口径）：[@ref-trae-skills-dirs]

| 作用域 | 路径（macOS/Linux） | 路径（Windows） |
| :-- | :-- | :-- |
| Project skill | 项目路径下的 `.trae/skills/` | 同左 |
| Global skill | 本地根目录 `~/.trae/skills` | `%userprofile%/.trae/skills` |

除 Trae 自有目录外，宿主还识别 Agent Skills 约定的 `.agents/skills/` 目录："The .agents skill directory (that is, `.agents/skills/`) is a convention-based directory specified by Agent Skills for storing skills. You can add this directory to your project, enabling the agent to automatically discover and load the skills within it at runtime." 该目录需要在 `Settings > Skills & Commands` 里用开关启用（原文："In the Skills section, toggle the switch on"）。[@ref-trae-skills-agents-dir]

内置 Skill 不来自磁盘，由客户端提供。国际站文档列出三个：`TRAE-generate-mini-app`（基于 Taro 框架生成多端小程序代码）、`TRAE-debugger`（需要运行时证据的复杂问题调试）、`TRAE-code-review`（代码审查）。它们在文档里以固定表列出，用户无法通过删文件移除。[@ref-trae-skills-builtin]

**缺口（`skills.discovery`）**：固定来源确认了四个发现位置与"必须包含 `SKILL.md`"，但没有说明扫描时机（启动时还是每次会话）、目录递归深度、是否跟随符号链接、忽略规则（`.gitignore`/`.ignore` 是否影响 Skill 扫描），也没有给出 `.trae/skills/` 下的嵌套层级上限（同一文档的 Rules/Commands 章节写明 3 层，Skill 章节未写）。这些点没有可引用证据，保持未验证。[@ref-trae-skills-dirs][@ref-trae-skills-agents-dir]

## SKILL.md 的格式与创建方式 {#skills-format}

`SKILL.md` 由 YAML frontmatter 加 Markdown 正文构成。[@ref-trae-skills-format]

frontmatter 中的 `name` 与 `description` 是文档中唯一逐项描述的字段；`description` 同时是自动调用的匹配依据（见下一节），正文里的 `## When to use` / `## Instructions` 等小节属于约定结构而非强制字段。固定来源没有列出字段长度上限、必填校验规则或对非法 frontmatter 的报错行为。[@ref-trae-skills-format]

创建方式有三条，都从 `Settings > Skills & Commands` 进入：[@ref-trae-skills-create]

1. **让 AI 生成**——在对话里描述需求（文档示例提示词形如 "Create a new skill under the ./trae/skills directory"），AI 直接写出 `SKILL.md`；
2. **手工创建**——在面板里填 name、description、instructions 三个字段；Project skill 会在 `.trae/skills/{skill_name}` 下自动建目录与 `SKILL.md`；
3. **导入外部 Skill**——上传 `SKILL.md` 或包含它的 `.zip`，TraeCode 解析后回填上述三个字段再落盘。

**缺口（`skills.extensions`）**：宿主识别的 Skill 专有配置项只有一处被写明——禁用 Project skill 时生成的 `skill-config.json`（见最后一节）。文档没有说明 `SKILL.md` frontmatter 是否支持 `license`/`compatibility`/`allowed-tools` 之类的开放标准字段、这些字段是否被解析，也没有提资源文件的预加载规则。[@ref-trae-skills-create]

官方给出的格式模板如下（原样抄录，字段来源为该页）：[@ref-trae-skills-format]

```markdown
---
name: skill name
description: briefly describe what the skill does and when to use it

---

# SKill name

## Description
Describe what the skill does.

## When to use
Describe when to use the skill.

## Instructions
Clear step-by-step instructions that tell the agent exactly what to do.

## Examples (optional)
Input/output examples that demonstrate the expected results.
```

## 名称冲突、进入上下文的时机与调用 {#skills-loading-invocation}

**同名冲突**只有一条明确规则：`.trae/skills/` 与 `.agents/skills/` 同名时以前者为准——"If a skill you create in TraeCode (located in the `.trae/skills/` directory) has the same name as a skill in `.agents/skills/`, the system will prioritize the skill in the `.trae/skills/` directory."。Global 与 Project 同名、以及多个 Project 同名时的取舍，固定来源没有写。[@ref-trae-skills-agents-note]

**加载时机**是两段式的按需加载：任务开始前只扫描所有 Skill 的简要描述，判定相关后才加载完整内容——"The agent does not read the full content of all skills at the start of a task. Before executing a task, the agent first scans the brief descriptions of all skills, and only loads the detailed content of a skill when it determines that the current task is highly relevant to that skill."，文档把这一点作为与 Rules 全量注入的核心差异。[@ref-trae-skills-overview][@ref-trae-skills-vs]

**调用有两条路径**：[@ref-trae-skills-use]

- **手动**：在对话里点名，例如 "Use the codemap skill to summarize the changes in this branch"；
- **自动**：AI 依据每个 Skill 的 description 及其 "use case"/"when to use" 描述判断是否加载，在合适阶段自动调用。文档给了一个例子：把触发条件写成"when the user requests code feedback or review"的代码审查 Skill，会在 "How is this function written?" 这类请求上被识别并加载。

固定来源没有给出模型自动选择 Skill 的排序、同时激活数量上限，也没有说明存在类似斜杠命令的专用调用语法（Rules 章节有 `#Rule` 引用语法，Skill 章节没有对应写法）。

## 生效条件、禁用与诊断 {#skills-diagnostics}

**启停**：在 Skill 列表里用开关启用/禁用。禁用状态单独落盘——"After disabling skills, TraeCode will create a `skill-config.json` file in the project's `.trae/` directory. This file lists the disabled project skills. Disabled global skills will not appear in this file."，即该文件只记录被禁用的 Project skill，Global skill 的禁用状态不在其中（存放位置固定来源未说明）。[@ref-trae-skills-enable]

**作用域转换与删除**：项目级 Skill 可以 "Apply to Global" 提升为全局 Skill；编辑/删除通过列表中齿轮图标菜单完成。[@ref-trae-skills-enable]

**入口与观察点**：所有 Skill 管理入口在 `Settings > Skills & Commands`（列表分 Global / Project 两个标签页），`.agents/skills/` 的开关也在同一面板；创建后 Global skill 直接出现在 Skills 面板的 Global 标签下，Project skill 会写文件并出现在 Project 标签下。改完 Skill 文件后如何重载，固定来源没有给出说明——Rules 章节明确建议"新建一个全新对话"，Skill 章节没有对应表述，因此重载时机未验证。[@ref-trae-skills-create][@ref-trae-skills-agents-dir]

**缺口（`skills.diagnostics`）**：文档没有提供列出"实际被发现并解析成功的 Skill 及其路径"的诊断命令或日志开关，也没有描述 frontmatter 非法时的报错文案；可用的观察点只有设置面板列表与对话中是否触发加载。[@ref-trae-skills-enable]
