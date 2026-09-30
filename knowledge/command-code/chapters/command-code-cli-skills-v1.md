---
schema_version: 3
record_kind: production
edition_id: command-code-cli-skills-v1
harness_id: command-code
topic: skills
title: "Command Code CLI 的 Agent Skills：发现位置、优先级、SKILL.md 格式与调用链"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-cc-skills-storage, ref-cc-skills-agents, ref-cc-skills-extra, ref-cc-skills-nested, ref-cc-settings-keys, ref-cc-cli-flags, ref-cc-skills-how]
  - section_id: skills-priority
    surface_ids: [cli]
    source_refs: [ref-cc-skills-priority, ref-cc-skills-cli, ref-cc-slash-precedence]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-cc-skills-spec, ref-command-code-skills-frontmatter, ref-cc-skills-dirs, ref-cc-skills-compliance]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-cc-skills-how, ref-cc-skills-invoke, ref-cc-skills-browse, ref-cc-skills-substitution, ref-cc-skills-shell]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-cc-skills-disable, ref-cc-settings-keys, ref-cc-cli-flags, ref-cc-skills-shell, ref-command-code-skills-frontmatter, ref-cc-mods-trust]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-cc-trouble-skills, ref-cc-skills-cli, ref-cc-cli-skills, ref-cc-skills-browse, ref-cc-trouble-reload]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-cc-skills-storage, ref-cc-skills-agents, ref-cc-skills-extra, ref-cc-skills-nested, ref-cc-cli-flags, ref-cc-settings-keys]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-cc-skills-extra, ref-cc-skills-nested, ref-cc-skills-how]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-priority
        status: answered
        source_refs: [ref-cc-skills-priority, ref-cc-slash-precedence]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-cc-skills-spec, ref-command-code-skills-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-command-code-skills-frontmatter, ref-cc-skills-dirs, ref-cc-skills-compliance]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-cc-skills-how, ref-cc-skills-invoke]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-cc-skills-invoke, ref-cc-skills-browse, ref-cc-skills-substitution, ref-cc-skills-shell]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-cc-skills-disable, ref-cc-cli-flags, ref-cc-mods-trust]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-cc-trouble-skills, ref-cc-skills-cli, ref-cc-cli-skills, ref-cc-trouble-reload]
---

本章的固定来源是 Command Code 官方文档站 `https://commandcode.ai/docs/` 在 2026-10-01 抓取的页面快照（`/docs/skills`、`/docs/settings`、`/docs/reference/cli`、`/docs/reference/slash-commands`、`/docs/mods`、`/docs/troubleshooting/common-issues`）。Command Code 是闭源产品，文档站只提供 HTML（没有 Markdown 端点，`llms.txt` 只给导航），因此每个引用都记录了文档小节标题与从页面正文摘出的短摘录；`raw_sha256` 固定的是 HTML 字节。整章属于来源级知识（`version_applicability: unknown`）：文档没有绑定到某个 `cmd` 版本，官方 npm 包 `command-code` 仅登记了渠道身份，没有做软件版本映射。

官方文档把 Command Code 的 Skill 机制写成对 **Agent Skills 开放标准**（agentskills.io）的实现，同时又在其上加了若干扩展字段；下面按“发现位置 → 冲突与优先级 → 文件格式 → 加载与调用 → 生效条件 → 诊断”的处理链展开。

## 发现位置与扫描范围 {#skills-roots}

Skill 是目录约定，没有集中登记表。文档给出四个标准位置，并声明完全实现 Agent Skills 开放标准：[@ref-cc-skills-storage]

| 位置 | 作用域 | 文档用途 |
| :-- | :-- | :-- |
| `~/.commandcode/skills/` | 用户（全局） | 跨所有项目的个人工作流 |
| `.commandcode/skills/` | 项目（本地） | 项目专属模式、团队约定 |
| `~/.agents/skills/` | 用户（`.agents` 兼容） | 其他 Agent Skills 工具已有的用户级技能 |
| `.agents/skills/` | 项目（`.agents` 兼容） | 其他工具已有的项目级技能 |

`.agents/` 的发现规则有一条明确的边界：Command Code 从工作目录向上最多走 10 层查找 `.agents/skills/`，并在遇到 home 目录时停止，以免把 `~/.agents/skills/` 误当作项目级来源。从 `.agents/` 载入的 Skill 在 `/skills` 菜单里带 `[.agents]` 徽标。[@ref-cc-skills-agents]

除了标准目录，还可以用配置和启动参数把任意技能目录接进来：`settings.json` 顶层的 `skills` 数组接受目录，`~/` 展开为 home，相对路径相对于项目根（git 根，仓库外则是工作目录）；settings 各层对 `skills` 数组是**整体覆盖**，最高层定义者生效。启动参数 `--skill`（后跟一个技能目录路径）为单次会话追加位置且可重复，`--no-skills` 跳过全部发现（`--skill` 给出的路径仍会加载）。[@ref-cc-skills-extra][@ref-cc-settings-keys][@ref-cc-cli-flags]

发现是**递归**的：一个位置下面可以按中间目录分组，但每个 Skill 仍是“直接包含 `SKILL.md` 的那个目录”，`name` 字段匹配的是 Skill 自己的目录名而不是分组目录名；Skill 自己的子目录（`scripts/`、`references/`、`assets/`）不会被继续当作技能扫描。[@ref-cc-skills-nested]

**缺口（`skills.discovery`）**：固定来源确认了“启动时只加载 name/description/path（发现阶段）”“标准目录 + `.agents/` 向上 10 层”“额外目录递归”这些规则，但没有给出 `.commandcode/skills/` 与 `~/.commandcode/skills/` 自身的递归深度上限、是否跟随符号链接、忽略规则（如 `.gitignore`）以及单个目录扫描规模上限。文档也没有说明“何时重新扫描”（见诊断小节的编辑生效说明）。这些点没有可引用证据，保持未验证。[@ref-cc-skills-extra][@ref-cc-skills-nested][@ref-cc-skills-how]

## 同名冲突与优先级 {#skills-priority}

Skill、自定义命令与内置命令共用同一个 `/` 菜单，文档给了完整的六段查找顺序：[@ref-cc-skills-priority]

1. `.commandcode/skills/`（项目）
2. `.agents/skills/`（项目）
3. `~/.commandcode/skills/`（用户）
4. `~/.agents/skills/`（用户）
5. 额外位置（先 `--skill` 参数，再 settings `skills` 条目）
6. Command Code 内置 Skill

也就是说：项目级永远压过用户级，同一级别里 `.commandcode/` 优先于 `.agents/`。同名时高优先级副本胜出，被遮蔽的副本**不会静默丢弃**——它会在 `/skills` 的 issues 视图和 `cmd skills list --debug` 里报一条 **Duplicate names** 警告。[@ref-cc-skills-priority][@ref-cc-skills-cli]

Skill 与内置命令/自定义命令同名时，斜杠派发顺序是 **内置 → mod 命令 → 自定义命令 → Skill**（先写者胜），所以键入 `/` 加该名字会解析到更优先的属主，Skill 不会被调用；此时可以用命名空间形式 `/skill:` 加 Skill 名直接跑 Skill，该命名空间跳过整条优先级阶梯、只会解析到 Skill。菜单里被遮蔽的 Skill 仍会显示 `[skill]` 徽标并附 `- shadowed by` 加属主名的说明。[@ref-cc-slash-precedence][@ref-cc-skills-priority]

## SKILL.md 的格式与扩展字段 {#skills-format}

一个 Skill 是目录，必需文件是 `SKILL.md`，以 YAML frontmatter 开头、后接 Markdown 正文；标准字段如下：[@ref-cc-skills-spec]

| 字段 | 必需 | 约束 |
| :-- | :--: | :-- |
| `name` | 是 | ≤64 字符，仅小写字母、数字、连字符；目录名必须匹配 |
| `description` | 是 | ≤1024 字符；缺省或为空会导致 Skill 无法加载 |
| `license` | 否 | 许可证名或随包许可证文件引用 |
| `compatibility` | 否 | ≤500 字符的环境要求说明 |
| `metadata` | 否 | 任意键值元数据（author、version 等） |
| `allowed-tools` | 否 | 空格分隔或 YAML 数组的预批准工具（实验性） |

Command Code 还识别一组扩展字段，其中若干与 Agent Skills / Claude Code 的 frontmatter 对应，使为其他 agent 写的 Skill 能原样加载：[@ref-command-code-skills-frontmatter]

| 字段 | 行为 |
| :-- | :-- |
| `argument-hint` | 在 `/` 菜单里显示该 Skill 期望的参数 |
| `when_to_use` | 追加到面向模型的目录描述上，供自动调用匹配 |
| `disable-model-invocation` | `true` 时对模型完全隐藏，只能显式 `/skill-name` 调用 |
| `user-invocable` | `false` 时保持模型可调用但从 `/` 菜单隐藏 |
| `disallowed-tools` | 声明该 Skill 不应使用的工具 |
| `arguments` | 位置参数名（如 `arguments: issue branch`），启用 `$issue`/`$branch` 占位符 |
| `model` | 为该 Skill 的工作固定模型 |
| `effort` | 推理强度提示（`low`/`medium`/`high`/`xhigh`/`max`/`inherit`） |

目录可带三个可选子目录：`scripts/`（可执行代码）、`references/`（按需读取的补充文档）、`assets/`（模板等静态资源）；`SKILL.md` 正文用相对路径引用它们，参考文献按需加载而不是整体进上下文。[@ref-cc-skills-dirs]

校验遵循开放标准，且比标准更严：`name` 必须与目录名一致，违反规则的 Skill 会被跳过并给出分类警告（在 `/skills` 与 `cmd skills list --debug` 可见），而不是让会话失败；扩展字段与标准字段并存，其他实现会忽略它们，反过来未知的 frontmatter 字段也会被忽略。[@ref-cc-skills-compliance]

## 加载时机、调用方式与参数替换 {#skills-loading}

文档给出的处理链是**渐进式披露**（progressive disclosure）：[@ref-cc-skills-how]

1. **Discovery** —— 启动时只加载每个 Skill 的 name、description 与文件路径；
2. **Activation** —— 任务匹配某个 Skill，或被 `/skill-name` 直接调用时，读取完整 `SKILL.md` 指令；
3. **Execution** —— 按指令需要再读取引用文件。

调用有三条路径：**精确斜杠调用**（`/skill-name`，每个 Skill 也响应 `/skill:` 加名字（冒号或空格形式））、**内联斜杠引用**（在较长提示里任意位置写 `/skill-name`，可同时混用多个）、**推断建议**（宿主扫描提示，在明显匹配时提示某个 Skill）。每个已安装 Skill 也会作为一等斜杠命令出现在 `/` 菜单里。[@ref-cc-skills-invoke][@ref-cc-skills-browse]

用 `/skill-name` 后跟参数调用时，正文中的占位符在模型看到之前完成一次替换：`$ARGUMENTS`（全部参数，若正文无占位符则非空参数以 `ARGUMENTS: …` 尾注追加）、`$ARGUMENTS[N]`/`${N}`（0 起第 N 个）、已声明的 `$name`，以及 `${COMMANDCODE_SKILL_DIR}`、`${COMMANDCODE_PROJECT_DIR}`、`${COMMANDCODE_SESSION_ID}`、`${COMMANDCODE_EFFORT}`；`${CLAUDE_*}` 别名解析到相同值。替换只做一次、参数按字面插入，不会被二次展开；除这些已知 token 外其他 `${...}` 原样保留。[@ref-cc-skills-substitution]

正文还可以内联 shell 输出：行首或空白后的单行 `` !`cmd` `` 会执行一次，```` ```! ```` 围栏则执行多行脚本，命令从项目目录运行并导出 `COMMANDCODE_SKILL_DIR`/`COMMANDCODE_PROJECT_DIR`；输出只替换一次、不会被再次扫描。用 `settings.json` 的 `disableSkillShellExecution: true` 可以整体关掉，此时每个占位符替换为 `[shell command execution disabled by policy]`。[@ref-cc-skills-shell]

## 生效条件与禁用 {#skills-conditions}

- **禁用单个 Skill**：在 `/skills` 选择器里高亮后按 Enter 切换，或在 `settings.json` 的 `disabledSkills` 数组里按名字禁用（跨层取并集）。被禁用的 Skill 对模型不可见、不会被调用。[@ref-cc-skills-disable][@ref-cc-settings-keys]
- **跳过全部发现**：启动参数 `--no-skills`；通过 `--skill` 给出的路径仍会加载，因此可以只跑一个 Skill。[@ref-cc-cli-flags]
- **关闭正文里的 shell 占位符**：`disableSkillShellExecution: true`。[@ref-cc-skills-shell]
- **字段级开关**：`disable-model-invocation: true` 让 Skill 只能显式调用；`user-invocable: false` 让 Skill 保持模型可调用但从 `/` 菜单隐藏。[@ref-command-code-skills-frontmatter]
- **信任边界**：项目级内容受工作区信任门控——mods 文档写“project mods are trust-gated like project skills”，即项目 Skill 在信任提示通过前不加载。[@ref-cc-mods-trust] 用户级位置是否受同一门控未在固定来源中单独说明。

**缺口（`skills.conditions`）**：文档说明了 `disabledSkills`、`--no-skills`、`disableSkillShellExecution`、两个 frontmatter 开关以及项目级的信任门控，但没有给出组织级策略（例如企业强制禁用的开关名）、plan/功能开关对 Skill 的影响，也没有说明 `.agents/` 项目目录是否与 `.commandcode/` 项目目录同样受信任门控。这些未验证。[@ref-cc-skills-disable][@ref-cc-mods-trust]

## 诊断与重载 {#skills-diagnostics}

- **TUI**：打开 `/skills` 按 `space` 查看分组的 *Skipped* 报告，每个坏 Skill 是可点击的文件链接，按 `c` 可复制成 markdown 交给 Command Code 修。[@ref-cc-trouble-skills]
- **CLI**：`cmd skills list` 按 Project/Global 分组列出；失败项下方给出 “N skills skipped · run with --debug to see issues”；`cmd skills list --debug` 输出按错误类别分组的报告。[@ref-cc-skills-cli][@ref-cc-cli-skills]
- **空结果**：`cmd skills list` 在没有任何 Skill 时会打印它查找过的位置清单（四个标准目录），可用来判断“位置对不对”。[@ref-cc-skills-cli]
- **编辑生效**：通过 `/skills` 在 `$EDITOR` 里改完 `SKILL.md` 后文档写明“changes are immediately applied and ready to use. No restart is required”；但新增/删除整个目录或改配置，官方排查页给的办法是运行 `/reload`（重启并恢复当前会话，重新发现 Skill、mod 与 keybinding）。[@ref-cc-skills-browse][@ref-cc-trouble-reload]
