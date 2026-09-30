---
schema_version: 3
record_kind: production
edition_id: auggie-cli-skills-v1
harness_id: auggie
topic: skills
title: "Auggie CLI 的 Skill 位置、格式与调用机制"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-auggie-repo-readme-quickstart, ref-auggie-docs-skills-structure, ref-auggie-docs-skills-locations, ref-auggie-docs-skills-names, ref-auggie-docs-skills-first, ref-auggie-docs-plugins-components, ref-auggie-docs-reference-config]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-format, ref-auggie-docs-skills-required, ref-auggie-docs-skills-names, ref-auggie-docs-plugins-components]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-invoking, ref-auggie-docs-skills-browsing, ref-auggie-docs-skills-precedence, ref-auggie-docs-skills-what, ref-auggie-docs-skills-viewing]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-structure, ref-auggie-docs-skills-locations, ref-auggie-docs-skills-invoking, ref-auggie-docs-interactive-custom, ref-auggie-docs-cmd-vs-skills, ref-auggie-docs-skills-precedence, ref-auggie-docs-plugins-components, ref-auggie-docs-skills-vs-rules, ref-auggie-docs-reference-config]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-viewing, ref-auggie-docs-skills-first, ref-auggie-docs-interactive-additional, ref-auggie-docs-interactive-common, ref-auggie-docs-config-manual]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-auggie-docs-skills-structure, ref-auggie-docs-skills-locations, ref-auggie-docs-skills-names]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-auggie-docs-skills-structure, ref-auggie-docs-skills-locations, ref-auggie-docs-reference-config]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-auggie-docs-skills-locations, ref-auggie-docs-skills-structure]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-auggie-docs-skills-format, ref-auggie-docs-skills-required, ref-auggie-docs-skills-names]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-auggie-docs-skills-format, ref-auggie-docs-plugins-components]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs: [ref-auggie-docs-skills-what, ref-auggie-docs-skills-invoking, ref-auggie-docs-skills-viewing]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-auggie-docs-skills-invoking, ref-auggie-docs-skills-browsing, ref-auggie-docs-skills-precedence]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-auggie-docs-skills-locations, ref-auggie-docs-interactive-custom, ref-auggie-docs-cmd-vs-skills, ref-auggie-docs-reference-config]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-auggie-docs-skills-viewing, ref-auggie-docs-skills-first, ref-auggie-docs-config-manual]
---

## 固定来源与 Skill 位置 {#skills-roots}

本章固定官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff`（该仓库只有 README、CHANGELOG、示例命令与示例插件，CLI 实现不开源）与官方文档站 `docs.augmentcode.com` 的 CLI 页面。机制描述以文档 CLI 的 Agent Skills 页为准。[@ref-auggie-repo-readme-quickstart][@ref-auggie-docs-skills-structure]

Skill 遵循 agentskills.io 规范：每个 Skill 独占一个子目录，目录内必须有 `SKILL.md`，目录名就是 Skill 名。发现位置共六处，按文档列出的优先级从高到低是：用户目录的 `.augment/skills/`、工作区根的 `.augment/skills/`、用户目录的 `.claude/skills/`、工作区根的 `.claude/skills/`、用户目录的 `.agents/skills/`、工作区根的 `.agents/skills/`。中间两组是与 Claude Code 的兼容位置，最后两组是行业约定位置。[@ref-auggie-docs-skills-structure][@ref-auggie-docs-skills-locations][@ref-auggie-docs-skills-names]

文档示例给出的目录结构：

```text
.augment/skills/
  python-testing/
    SKILL.md
  api-design/
    SKILL.md
  database-migrations/
    SKILL.md
```

新建一个 Skill 的最小步骤（文档 “Creating Your First Skill”）：[@ref-auggie-docs-skills-first]

1. 建立目录：`mkdir -p .augment/skills/my-skill`；
2. 在 `.augment/skills/my-skill/SKILL.md` 写入 frontmatter 与正文；
3. 启动 Auggie，用 `/skills` 确认它出现在列表中。

插件也能携带 Skill：插件的 `skills/` 目录下每个 Skill 同样是 `SKILL.md` 加资源文件，例如 `skills/pdf-processor/SKILL.md` 与 `skills/pdf-processor/scripts/process.py`。[@ref-auggie-docs-plugins-components]

**同名冲突**：文档明确“所有位置的 Skill 都会被加载，同名时使用优先级更高位置的那一个”，`/skills` 弹窗的 Source 列区分 User（home 目录）与 Workspace（工作区）来源。固定来源没有命名空间、重命名或正文合并规则。[@ref-auggie-docs-skills-locations]

**缺口（discovery）**：固定来源没有说明扫描时机、目录递归深度、符号链接跟随、忽略规则，也没有插件 Skill 与本地 Skill 重名时的处理。仓库不含实现代码。因此能够确认的只有文档明示的部分：从上述六个位置读取、每个 Skill 必须在自己的子目录中、随会话加载。[@ref-auggie-docs-skills-structure][@ref-auggie-docs-skills-locations][@ref-auggie-docs-reference-config]

## SKILL.md 的格式与字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 与正文组成。frontmatter 有两个必填字段：`name`（1–64 字符，只允许小写字母、数字与连字符，不能以连字符开头或结尾，不能出现连续连字符，且必须与所在目录同名）与 `description`（1–1024 字符，说明 Skill 做什么、何时使用，用于让 agent 判断适用时机）。frontmatter 之后的正文是普通 markdown，可包含标题、代码块、列表与其他格式。[@ref-auggie-docs-skills-format][@ref-auggie-docs-skills-required][@ref-auggie-docs-skills-names]

文档给出的最小示例（`name` 与目录名一致）：[@ref-auggie-docs-skills-format]

```markdown
---
name: python-testing
description: Best practices for writing and running Python tests with pytest
---

# Python Testing Skill

This skill provides guidance on writing effective Python tests.
```

合法名示例：`python-testing`、`api-design`、`database-migrations`；文档列出的非法名示例：`Python-Testing`（大写）、`api_design`（下划线）、`-database`（前导连字符）、`my--skill`（连续连字符）。[@ref-auggie-docs-skills-names]

**缺口（extensions）**：除 `name` 与 `description` 外，文档没有描述其他 frontmatter 字段、Skill 级配置文件或启用开关；插件 Skill 用的是同一套 `SKILL.md` 加 `scripts/` 资源目录。这些之外没有可引用的扩展字段证据。[@ref-auggie-docs-skills-format][@ref-auggie-docs-plugins-components]

## 调用与进入上下文的时机 {#skills-invocation}

交互模式下，每个被发现 Skill 的目录名会被注册成一个斜杠命令：`.augment/skills/my-skill/SKILL.md` 对应 `/my-skill`。输入后 Skill 的指令立即作为当前请求提交，agent 随即开始响应。[@ref-auggie-docs-skills-invoking]

`/skills` 与直接调用是两条不同路径：`/skills` 打开弹窗，列出每个已加载 Skill 的名称、来源、描述与预估 token 数，用于发现；直接输入斜杠加 Skill 名（如 `/my-skill`）才是调用，且不要求先打开弹窗。内置斜杠命令优先——Skill 目录名与内置命令重名时执行内置命令，所以应避开 `/help`、`/model`、`/skills` 等名字。[@ref-auggie-docs-skills-invoking][@ref-auggie-docs-skills-browsing][@ref-auggie-docs-skills-precedence]

**上下文时机（loading）**：文档说明 Skill 是“可发现的”——agent 通过元数据（名称与描述）看到有哪些 Skill；弹窗里的 Token 数按 `SKILL.md` 文件大小估算，说明较大的 Skill 在激活时会占用更多上下文。调用后整份 `SKILL.md` 作为当轮请求提交。文档没有说明名称与描述是否常驻上下文、资源文件（如 `scripts/` 下的脚本）由谁读取，因此只能确认“元数据可见 + 调用时正文进入请求”这一段。[@ref-auggie-docs-skills-what][@ref-auggie-docs-skills-invoking][@ref-auggie-docs-skills-viewing]

## 生效条件 {#skills-conditions}

- 位置决定可见范围：home 目录下的 Skill 在所有工作区可用，工作区根下的 Skill 只在该工作区可用；工作区位置适合提交到版本库共享给团队。[@ref-auggie-docs-skills-structure][@ref-auggie-docs-skills-locations]
- 交互模式提供斜杠命令入口：以 `/` 加 Skill 名直接调用与 `/skills` 浏览都在 interactive mode 的斜杠菜单里；菜单内容随功能开关、可用集成与已加载插件变化。[@ref-auggie-docs-skills-invoking][@ref-auggie-docs-interactive-custom]
- Skill 与自定义命令共用同一个 `/` 加名字的调用表面，两者都可能被内置命令遮蔽，文档建议取不冲突的名字。[@ref-auggie-docs-cmd-vs-skills][@ref-auggie-docs-skills-precedence]
- 插件携带的 Skill 随插件启用状态生效；插件自身受账号功能开关与工作区启用列表控制，细节见“原生插件”章节。[@ref-auggie-docs-plugins-components]

Skill 与 Rules 的分工（文档对照表）：Skills 用于特定领域与工作流知识（框架用法、工具流程、安全实践），按 agentskills.io 规范书写、基于元数据发现、跨工具通用；Rules 用于代码风格、架构与团队约定，是 Augment 专有的 markdown 准则，按内容或始终应用。选择依据是这份知识属于“按名字调用的领域包”还是“项目级常驻约定”。[@ref-auggie-docs-skills-vs-rules]

**缺口**：固定来源没有出现项目信任提示、沙箱或“禁用单个 Skill”的开关；CLI 参考页只在注记中说明 Skill 会从工作区与 home 目录的 `.augment/skills/`、`.claude/skills/`（以及 `.agents/skills/`）自动加载。[@ref-auggie-docs-reference-config]

## 诊断与重载 {#skills-diagnostics}

- `/skills` 打开弹窗，逐项显示 **Name**、**Source**（Workspace 或 User）、**Description**、**Tokens**（按文件大小估算）。弹窗内 `↑`/`↓` 或 `j`/`k` 移动，`Enter` 在编辑器中打开选中的 Skill，`Esc` 关闭。[@ref-auggie-docs-skills-viewing]
- 验证新建 Skill 是否被加载：启动 Auggie 后执行 `/skills`，确认它出现在列表里；这是文档给出的“Creating Your First Skill”最后一步。[@ref-auggie-docs-skills-first]
- `/status` 显示系统状态，包含 MCP servers 与 rules；`/about` 显示系统与环境信息。文档没有给出只针对 Skill 的其它检查命令。[@ref-auggie-docs-interactive-additional][@ref-auggie-docs-interactive-common]
- **重载**：文档没有说明修改 `SKILL.md` 后的热重载行为。可类比的只有设置文件的要求——手动修改设置后需要重启 Auggie 才生效；追加、删除或改名 Skill 目录后是否重启才确定生效，固定来源没有交代。[@ref-auggie-docs-config-manual]
