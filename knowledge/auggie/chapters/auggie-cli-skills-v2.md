---
schema_version: 3
record_kind: production
edition_id: auggie-cli-skills-v2
harness_id: auggie
topic: skills
title: "Auggie CLI 的 Skill 位置、格式与调用机制（1.x 文档线）"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-auggie-repo-readme-quickstart, ref-auggie-docs-skills-structure, ref-auggie-docs-skills-locations, ref-auggie-docs-skills-names, ref-auggie-docs-skills-first, ref-auggie-docs-plugins-components, ref-auggie-docs-reference-config, ref-auggie-1x-skills-locations, ref-auggie-1x-skills-extra-roots, ref-auggie-1x-reference-skills]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-format, ref-auggie-docs-skills-required, ref-auggie-docs-skills-names, ref-auggie-docs-plugins-components, ref-auggie-1x-skills-format, ref-auggie-1x-skills-names, ref-auggie-1x-skills-extra-roots]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-invoking, ref-auggie-docs-skills-browsing, ref-auggie-docs-skills-precedence, ref-auggie-docs-skills-what, ref-auggie-docs-skills-viewing, ref-auggie-1x-skills-invoking, ref-auggie-1x-interactive-custom, ref-auggie-1x-settings-options, ref-auggie-1x-reference-skills]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-structure, ref-auggie-docs-skills-locations, ref-auggie-docs-skills-invoking, ref-auggie-docs-interactive-custom, ref-auggie-docs-cmd-vs-skills, ref-auggie-docs-skills-precedence, ref-auggie-docs-plugins-components, ref-auggie-docs-skills-vs-rules, ref-auggie-docs-reference-config, ref-auggie-1x-skills-extra-roots, ref-auggie-1x-skills-invoking, ref-auggie-1x-interactive-custom]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-auggie-docs-skills-viewing, ref-auggie-docs-skills-first, ref-auggie-docs-interactive-additional, ref-auggie-docs-interactive-common, ref-auggie-docs-config-manual, ref-auggie-1x-skills-invoking, ref-auggie-1x-skills-first, ref-auggie-1x-interactive-slash]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-auggie-1x-skills-locations, ref-auggie-1x-skills-extra-roots, ref-auggie-1x-reference-skills]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-auggie-1x-skills-locations, ref-auggie-1x-skills-extra-roots]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-auggie-1x-skills-locations, ref-auggie-docs-skills-structure]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-auggie-1x-skills-format, ref-auggie-docs-skills-required, ref-auggie-docs-skills-names]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-auggie-1x-skills-extra-roots, ref-auggie-docs-skills-format, ref-auggie-docs-plugins-components]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs: [ref-auggie-1x-skills-invoking, ref-auggie-docs-skills-what, ref-auggie-docs-skills-viewing]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-auggie-1x-skills-invoking, ref-auggie-1x-interactive-custom, ref-auggie-1x-settings-options, ref-auggie-docs-skills-precedence]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-auggie-1x-skills-extra-roots, ref-auggie-1x-skills-invoking, ref-auggie-1x-interactive-custom, ref-auggie-docs-plugins-components]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-auggie-1x-skills-invoking, ref-auggie-1x-interactive-slash, ref-auggie-1x-skills-first]
---

适用性说明：本章的 1.x 结论固定在 2026-11-25 观察到的官方文档 “Agent Skills” 页（页顶标注 1.x 文档线）与 CLI 参考页、Interactive 页、Settings 页；文档快照的 `version_applicability` 仍为 `unknown`。0.x 的 `/skills` 弹窗与 `/skill-name` 调用形式保留在旧 edition 与旧引用中，本章按版本线标注差异。

## 固定来源与 Skill 位置 {#skills-roots}

1.x 的固定来源是官方文档站的 Agent Skills 页、CLI 参考页、Interactive 页与 Settings 页，以及官方仓库提交 `9cc3ead419db9486ad44e6e4bba30ecd6784ccff`（仓库只有 README、CHANGELOG、示例命令与示例插件，CLI 实现不开源）。[@ref-auggie-repo-readme-quickstart][@ref-auggie-1x-skills-locations]

Skill 遵循 agentskills.io 规范：每个 Skill 独占一个子目录，目录内必须有 `SKILL.md`。1.x 的发现位置与优先级：[@ref-auggie-1x-skills-locations]

| 位置 | 来源 | 说明 |
| :-- | :-- | :-- |
| `~/.augment/skills/` | User | 所有工作区可用（最高优先级） |
| `WORKSPACE/.augment/skills/` | Workspace | 项目专用，可提交版本库 |
| `~/.claude/skills/` | User | Claude Code 兼容位置 |
| `~/.agents/skills/` | User | 行业约定位置 |
| 当前目录及其父目录中的 `.augment/skills/`、`.claude/skills/`、`.agents/skills/` | Workspace | 向上搜索到 git 仓库根 |

所有位置的 Skill 都会被加载；同名时使用优先级更高位置的那一个。[@ref-auggie-1x-skills-locations]

除自动发现外，1.x 还提供三条显式加载路径：`--skill PATH` 单次加载一个 Skill 文件或目录（可重复）、settings.json 的 `skills` 数组、`--no-skills` 关闭自动发现（`--skill` 传入的仍会加载）。[@ref-auggie-1x-skills-extra-roots][@ref-auggie-1x-reference-skills]

插件也能携带 Skill：插件的 `skills/` 目录下每个 Skill 同样是 `SKILL.md` 加资源文件，例如 `skills/pdf-processor/SKILL.md` 与 `skills/pdf-processor/scripts/process.py`。[@ref-auggie-docs-plugins-components]

**缺口（discovery）**：1.x 页面说明了搜索到 git 根、`.md` 与 `.mdc`（rules 页）与显式路径，但没有说明扫描时机、符号链接跟随、忽略规则与目录递归深度；插件 Skill 与本地 Skill 重名时的处理也未给出。仓库不含实现代码。[@ref-auggie-1x-skills-locations][@ref-auggie-docs-skills-structure]

## SKILL.md 的格式与字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 与正文组成。frontmatter 有两个必填字段：`name`（1–64 字符，只允许小写字母、数字与连字符，不能以连字符开头或结尾，不能出现连续连字符）与 `description`（1–1024 字符）。**目录名匹配在 1.x 页面内自相矛盾**：frontmatter 表写 `name` “should match directory name”，同一页的 “Skill Name Requirements” 却写 “Match the directory name containing the SKILL.md file”。本章按更严格的一处处理：目录名匹配是要求；若实现放宽，应以 frontmatter 表的措辞为准。正文是普通 markdown。[@ref-auggie-1x-skills-format][@ref-auggie-1x-skills-names][@ref-auggie-docs-skills-format][@ref-auggie-docs-skills-required]

文档给出的最小示例（`name` 与目录名一致）：[@ref-auggie-docs-skills-format]

```markdown
---
name: python-testing
description: Best practices for writing and running Python tests with pytest
---

# Python Testing Skill

This skill provides guidance on writing effective Python tests.
```

合法名示例：`python-testing`、`api-design`、`database-migrations`；非法名示例：`Python-Testing`（大写）、`api_design`（下划线）、`-database`（前导连字符）、`my--skill`（连续连字符）。[@ref-auggie-docs-skills-names]

**缺口（extensions）**：除 `name` 与 `description` 外，Skill 页面没有描述其它 frontmatter 字段；宿主侧的扩展入口是 settings 的 `skills` 数组与 `--skill`／`--no-skills`，插件 Skill 用同一套目录结构。Skill 级启用开关或按 Skill 的权限控制在固定来源中没有证据。[@ref-auggie-1x-skills-extra-roots][@ref-auggie-docs-skills-format][@ref-auggie-docs-plugins-components]

## 调用与进入上下文的时机 {#skills-invocation}

1.x 的调用形式是 `/skill:NAME`：`.augment/skills/my-skill/SKILL.md` 对应 `/skill:my-skill`。命令后面的任何文本会随 Skill 指令一起传入（`/skill:my-skill focus on the payments module`）。输入 `/skill:` 会显示可用 Skill 及其描述的自动补全列表；把 `enableSkillCommands` 设为 `false` 可关闭 Skill 命令。[@ref-auggie-1x-skills-invoking][@ref-auggie-1x-settings-options]

内置斜杠命令优先于自定义命令与 Skill：名字冲突时执行内置命令，文档建议避开内置命令名。1.x 的 Interactive 页把 Skill 命令列在 “Custom and skill slash commands” 下，并明确 `/skill:my-skill` 这种形式。[@ref-auggie-1x-interactive-custom][@ref-auggie-docs-skills-precedence]

**版本线**：0.x 文档把每个 Skill 注册为 `/skill-name`，并用 `/skills` 弹窗浏览名称、来源、描述与 token 数；1.x 改为 `/skill:NAME`，`/skills` 弹窗不再出现在 1.x 页面中。旧 edition 与旧引用保留 0.x 说法。[@ref-auggie-docs-skills-invoking][@ref-auggie-docs-skills-browsing][@ref-auggie-docs-skills-viewing]

**上下文时机（loading）**：1.x 明确 agent 能看到每个 Skill 的名称与描述，并在任务匹配时加载完整 `SKILL.md`；手动调用时整份 `SKILL.md` 随当轮请求提交。资源文件（如 `scripts/`）的读取方式没有在此页展开。[@ref-auggie-1x-skills-invoking][@ref-auggie-docs-skills-what]

## 生效条件 {#skills-conditions}

- 位置决定可见范围：home 目录下的 Skill 在所有工作区可用，工作区与父目录链上的 Skill 只在该仓库范围可用；工作区位置适合提交到版本库共享。[@ref-auggie-1x-skills-locations]
- 自动发现可被 `--no-skills` 关闭；`--skill PATH` 与 settings 的 `skills` 数组提供显式加载路径，`--skill` 在 `--no-skills` 下仍生效。[@ref-auggie-1x-skills-extra-roots]
- 交互模式的斜杠菜单同时列出内置命令、自定义命令与 Skill；内置命令优先，名字冲突会遮蔽自定义命令或 Skill。[@ref-auggie-1x-interactive-custom][@ref-auggie-docs-skills-precedence]
- Skill 命令本身可被 `enableSkillCommands: false` 关闭，但 agent 仍可按元数据自动加载 Skill。[@ref-auggie-1x-skills-invoking][@ref-auggie-1x-settings-options]
- 插件携带的 Skill 随插件启用状态生效；插件自身受账号功能开关与工作区启用列表控制，细节见“原生插件”章节。[@ref-auggie-docs-plugins-components]

Skill 与 Rules 的分工（0.x 对照表仍适用）：Skills 用于特定领域与工作流知识，按 agentskills.io 规范书写、基于元数据发现、跨工具通用；Rules 用于代码风格、架构与团队约定，是 Augment 专有的 markdown 准则，按内容或始终应用。1.x 的 Rules 页新增 `manual` 类型与 `$rule-name` 引用，属于 Rules 主题。[@ref-auggie-docs-skills-vs-rules]

**缺口**：固定来源没有出现项目信任提示、沙箱或“禁用单个 Skill”的开关；1.x 只给出全局的 `--no-skills` 与 `enableSkillCommands`。[@ref-auggie-docs-reference-config][@ref-auggie-1x-skills-extra-roots]

## 诊断与重载 {#skills-diagnostics}

- 1.x 的发现入口是自动补全：输入 `/skill:` 查看可用 Skill 与描述；文档不再提供 `/skills` 弹窗的 Source／Tokens 列表。[@ref-auggie-1x-skills-invoking][@ref-auggie-1x-interactive-slash]
- 验证新建 Skill 是否被加载：启动 Auggie 后输入 `/skill:`，确认它出现在列表中；这是 1.x “Creating Your First Skill” 的最后一步。[@ref-auggie-1x-skills-first]
- `/status` 显示系统状态（含 MCP servers 与 rules）；`/about` 显示系统与环境信息。文档没有给出只针对 Skill 的其它检查命令。[@ref-auggie-docs-interactive-additional][@ref-auggie-docs-interactive-common]
- **重载**：`/reload` 重载 keybindings、extensions、skills、prompts 与 themes；设置文件本身仍需重启 Auggie。[@ref-auggie-1x-interactive-slash][@ref-auggie-docs-config-manual]
- **版本线**：0.x 的 `/skills` 弹窗导航（↑／↓、Enter 打开、Esc 关闭）属于旧 edition 的记载，1.x 页面不再描述。[@ref-auggie-docs-skills-viewing]
