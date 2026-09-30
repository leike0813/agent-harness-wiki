---
schema_version: 3
record_kind: production
edition_id: rovodev-cli-skills-v1
harness_id: rovodev
topic: skills
title: "Rovo Dev CLI 的 Agent Skills：位置、格式与调用"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-rovodev-skills-overview, ref-rovodev-skills-locations, ref-rovodev-skills-protocol]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-rovodev-skills-manual, ref-rovodev-skills-fields, ref-rovodev-skills-protocol]
  - section_id: skills-builtin
    surface_ids: [cli]
    source_refs: [ref-rovodev-commands-productivity, ref-rovodev-subagents-create]
  - section_id: skills-management
    surface_ids: [cli]
    source_refs: [ref-rovodev-skills-manage, ref-rovodev-commands-interactive, ref-rovodev-features-org, ref-rovodev-features-site]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-rovodev-skills-invoke]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-rovodev-skills-manage, ref-rovodev-help-interactive]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-rovodev-skills-overview, ref-rovodev-skills-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-rovodev-skills-locations, ref-rovodev-skills-protocol]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-rovodev-skills-locations]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-rovodev-skills-manual, ref-rovodev-skills-fields]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-rovodev-skills-fields, ref-rovodev-skills-protocol]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs: [ref-rovodev-skills-invoke]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-rovodev-skills-invoke]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-management
        status: partial
        source_refs: [ref-rovodev-skills-manage, ref-rovodev-features-org]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-rovodev-skills-manage, ref-rovodev-help-interactive]
---

固定来源范围：本章依据 Atlassian 官方支持文档《Extend Rovo Dev CLI with Agent Skills》《Use subagents in Rovo Dev CLI》《Rovo Dev CLI commands》《Turn Rovo Dev features on and off》《Get help in Rovo Dev CLI》的固定快照。Rovo Dev CLI 是闭源产品（以 ACLI 扩展形式分发），`surface_id: cli`；官方页面未标注适用的软件版本，以下内容为来源级知识，`version_applicability` 保持 `unknown`。

## Skill 的存放位置、发现与优先级 {#skills-roots}

Agent Skills 是「可复用的指令集」，教 Rovo Dev 完成特定类型的任务：每个 skill 是 markdown 文件加一段简短 YAML 头，Rovo Dev 在任务匹配时加载其指令。文档说明 Agent Skills 遵循开放的 Agent Skills 协议。[@ref-rovodev-skills-overview]

存放位置决定谁可以使用；同名 skill 冲突时高优先级位置获胜，顺序为 **内置 > 用户 > 项目**：[@ref-rovodev-skills-locations]

| 作用域 | 路径 | 适用于 |
| --- | --- | --- |
| 内置 | 随 Rovo Dev 一起发布 | 所有用户 |
| 用户 | `~/.rovodev/skills/` 或 `~/.agents/skills/`（每个 skill 一个子目录） | 你的全部项目 |
| 项目 | `.rovodev/skills/` 或 `.agents/skills/`（每个 skill 一个子目录） | 仅当前项目 |

路径随环境变化：用户级以 home（`~`）为根，项目级以当前工作目录（仓库根）为根，两者都**不依赖环境变量**——官方表格里没有出现任何环境变量形式的根目录。同一作用域下 `.rovodev/` 与 `.agents/` 是两个并列的根目录，官方把两者写在同一行的 "Path" 单元格里，说明它们是等价的存放约定；`.agents/` 与其他 Agent Skills 宿主共享目录名，这也是「开放协议」在路径层面的体现。[@ref-rovodev-skills-locations][@ref-rovodev-skills-protocol]

一个 skill 的最小目录结构如下（入口固定为 `SKILL.md`，其余为可选辅助文件）：[@ref-rovodev-skills-protocol]

```text
.rovodev/skills/code-review/
  SKILL.md          # 入口：YAML frontmatter + 指令正文
  scripts/          # 可选：脚本
  references/       # 可选：参考文档
  templates/        # 可选：模板
```

**发现范围的缺口**：固定来源只说明「在这些目录中查找」，没有给出扫描时机（启动时、会话开始时还是每次请求前）、子目录深度上限、是否跟随符号链接、忽略规则（如 `.gitignore`）、单目录下的 skill 数量上限，以及内置 skill 的实际落地路径。要确认具体行为需要查看 CLI 运行时的 `/skills` 输出或发行说明，本章不据此断言。

**同名冲突的处理边界**：官方明确的是「按作用域整体优先（内置 > 用户 > 项目）」，但没有说明同一作用域内 `~/.rovodev/skills` 与 `~/.agents/skills` 同时存在同名 skill 时谁获胜，也没有说明是否保留命名空间（例如以目录前缀区分）。这部分保持未验证。[@ref-rovodev-skills-locations]

## SKILL.md 的结构与字段 {#skills-format}

手工创建 skill 时，在对应位置建一个目录和其中的 `SKILL.md`。文件由两部分组成：被 `---` 包围的 YAML frontmatter，以及包含指令的 markdown 正文；正文在 skill 被调用时生效。[@ref-rovodev-skills-manual]

```markdown
---
name: code-review
description: Reviews code changes and provides feedback on code quality, best practices, and potential issues.
allowed-tools:
- open_files
- expand_code_chunks
- grep
- bash
---
You are an expert code reviewer. When reviewing code:
1. Focus on correctness, maintainability, and adherence to best practices
2. Look for potential bugs, security issues, and performance problems
3. Suggest improvements with clear explanations
4. Be constructive and educational in your feedback
```

上面的示例取自官方文档 "Create a skill manually" 一节的代码块。字段表如下：[@ref-rovodev-skills-fields]

| 字段 | 必需 | 说明 |
| --- | --- | --- |
| `name` | 是 | skill 名称，只能用小写字母、数字和连字符，最长 64 字符，且**必须与目录名一致** |
| `description` | 是 | 这个 skill 做什么、什么时候用；Rovo Dev 用它决定何时自动加载 |
| `allowed-tools` | 否 | 该 skill 预授权使用的工具列表 |
| `license` | 否 | 许可证信息 |
| `compatibility` | 否 | 兼容性信息 |
| `metadata` | 否 | 任意键值对元数据 |

解析规则的已知与未知：

- `name` 的字符集与长度受限（小写字母、数字、连字符，≤64），且与目录名的对应关系是**硬约束**；`name` 与 `description` 必需，缺一不可运行。[@ref-rovodev-skills-fields]
- `allowed-tools` 是文档中唯一会改变工具授权行为的 skill 字段：列出的工具对该 skill 属「预先批准」。[@ref-rovodev-skills-protocol]
- `license`、`compatibility`、`metadata` 只承载元数据，来源没有说明它们会参与选择或授权判断。
- 未知字段、frontmatter 类型错误、正文长度上限、`allowed-tools` 名称是否必须是内置工具名，来源均未说明；这部分保持未验证。

## 内置 skill 与子代理内的 skill 选择 {#skills-builtin}

Rovo Dev **自带内置 skill**，它们与用户/项目 skill 一起出现在 `/skills` 菜单里；内置 skill 不能被编辑或删除。官方命令表里可以观察到两个具体的内置 skill 用法：[@ref-rovodev-commands-productivity]

- `/full-context`：「Gather project context from Atlassian tools using the full-context-mode skill」——即该命令加载名为 `full-context-mode` 的内置 skill；
- `/research`：「Conduct deep research using domain-focused subagents」——它用的是子代理而不是 skill。

skill 也可以被指派给子代理：创建子代理向导的最后一步是「选择该子代理可以使用的 skill」，说明某个 skill 的可用集合可以按子代理收窄；相对地，主代理看到的是内置 + 用户 + 项目三个作用域的并集（按优先级去重）。[@ref-rovodev-subagents-create]

## 交互式管理 {#skills-management}

在 Rovo Dev TUI 中运行 `/skills` 打开技能菜单，可以：[@ref-rovodev-skills-manage]

- 查看内置、用户、项目三个作用域的全部可用 skill，以及它们的描述、允许的工具和文件位置；
- 通过一个短向导创建 skill：先选用户级还是项目级，再填名称、描述和指令；
- 编辑已有 skill 的描述或指令（**内置 skill 不能编辑**）；
- 删除用户级或项目级 skill（**内置 skill 不能删除**）。

向导只提供「用户级 / 项目级」两种作用域，与路径表里的两个可写作用域一致；内置作用域只读。[@ref-rovodev-skills-manage]

**生效条件**：`/subagents` 被官方命令表标注为 "when enabled"，`/skills` 没有此类标注，说明 `/skills` 属于常规可用能力；但 Rovo Dev 的整套功能（含 CLI）可在组织与站点两级被管理员关闭，此时 skill 相关能力随 CLI 一起不可用（组织级需要组织管理员权限，站点级需要 Rovo Dev 的应用管理员权限）。固定来源没有单独的「skill 级信任、禁用或沙箱」开关描述。[@ref-rovodev-commands-interactive][@ref-rovodev-features-org][@ref-rovodev-features-site]

## 加载与调用 {#skills-invocation}

两种调用方式：[@ref-rovodev-skills-invoke]

- **自动**：会话开始时 Rovo Dev 读取每个 skill 的 `description` 字段，任务与描述匹配时加载对应 skill 的指令。因此描述要写得具体、包含可识别的关键词。
- **显式**：在提示中按名称要求，例如 `Use the code-review skill to review my latest changes`。

也就是说 `name` 与 `description` 在会话开始时进入上下文，指令正文在 skill 被选中后才加载——这是文档明确写出的「描述先行、正文后到」的渐进式加载；资源文件（`scripts/`、`references/`、`templates/` 等）由正文按需引用，参考协议中关于脚本与资源的说明。固定来源没有说明正文是按需读取文件还是随选择一次性注入，也没有给出上下文预算或截断规则；这部分保持未验证。[@ref-rovodev-skills-invoke]

## 诊断 {#skills-diagnostics}

- `/skills` 是主要的自查入口：它按作用域列出 skill，并显示每个 skill 的描述、允许的工具和文件位置；位置显示可以确认磁盘上的目录是否被识别。[@ref-rovodev-skills-manage]
- `/help` 后接查询词可以让 Rovo Dev 直接回答关于具体功能的问题；具体命令的 `help` 子命令给出该命令的详细帮助（例如 `/skills help`）。[@ref-rovodev-help-interactive]

**缺口**：固定来源没有给出「改动 SKILL.md 后如何重载」的说明（是否需要重启会话、是否有热重载），也没有 skill 级的加载失败日志或校验命令。文档只把 `/skills` 的清单作为观察点；未识别到目录时的排查结论保持未验证。
