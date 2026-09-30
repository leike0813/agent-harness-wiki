---
schema_version: 3
record_kind: production
edition_id: kiro-cli-skills-v1
harness_id: kiro
topic: skills
title: "Kiro CLI 的 Agent Skills 机制"
sections:
  - section_id: skills-overview
    surface_ids: [cli]
    source_refs: [ref-kiro-skills-overview, ref-kiro-v3-skills, ref-kiro-skills-diff]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-kiro-skills-scope, ref-kiro-skills-import, ref-kiro-config-paths, ref-kiro-config-scopes, ref-kiro-skills-agents, ref-kiro-agentref-resources]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-kiro-skills-format, ref-kiro-skills-frontmatter, ref-kiro-skills-references]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-kiro-skills-progressive, ref-kiro-skills-using, ref-kiro-skills-arguments, ref-kiro-skills-import]
  - section_id: skills-collision
    surface_ids: [cli]
    source_refs: [ref-kiro-skills-scope, ref-kiro-skills-trouble]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-kiro-skills-using, ref-kiro-config-inspect, ref-kiro-skills-trouble, ref-kiro-skills-progressive, ref-kiro-agentref-resources]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-kiro-skills-scope, ref-kiro-config-paths, ref-kiro-skills-agents]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: partial
        source_refs: [ref-kiro-skills-progressive, ref-kiro-skills-import]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-collision
        status: answered
        source_refs: [ref-kiro-skills-scope]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-kiro-skills-format, ref-kiro-skills-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-kiro-skills-frontmatter, ref-kiro-skills-references]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-kiro-skills-progressive, ref-kiro-skills-using]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-kiro-skills-using, ref-kiro-skills-arguments]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-kiro-skills-agents, ref-kiro-skills-scope]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-kiro-skills-trouble, ref-kiro-config-inspect]
---

## 固定来源与机制边界 {#skills-overview}

本章的固定来源是 Kiro 官方文档站 `https://kiro.dev/docs/` 的 Markdown 页面快照（`/docs/skills.md`、`/docs/steering.md`、`/docs/configuration.md`、`/docs/reference/settings.md`、`/docs/cli/v3/new-features.md`、`/docs/reference/slash-commands.md` 等）。Kiro 是闭源产品，没有可固定的 Git 仓库，也没有官方 npm 包，因此整章按来源级知识（`version_applicability: unknown`）阅读；文档本身把 CLI 3.0 与 2.x 分开描述，凡是版本相关的结论都在正文中标注。

结论：Kiro 的 Skill 机制是**开放 Agent Skills 标准**的实现，不是 Kiro 自有的私有格式。官方文档写明 Skills 是 "portable instruction packages that follow the open Agent Skills standard"，可跨兼容工具导入导出。[@ref-kiro-skills-overview]

可用性（文档开头的表格，CLI 列）：Skill 激活、工作区 Skill（`.kiro/skills/`）、全局 Skill（`~/.kiro/skills/`）三项在 CLI 都可用；全局 Skill 在 Web 不可用。CLI 3.0 的新特性页把它概括为 "Create reusable agent capabilities in `.kiro/skills/NAME/SKILL.md` … automatically discovered and available to all agents in the workspace"。[@ref-kiro-skills-overview][@ref-kiro-v3-skills]

三种相近机制的分工由官方文档给出：**Skills** 是按需加载、可含脚本的开放标准包；**Steering** 是 Kiro 专有的持久上下文，支持 `always`/`auto`/`fileMatch`/`manual` 包含模式；**Powers** 把 MCP 工具与知识打包成可从目录安装的插件，可内含 Skills。[@ref-kiro-skills-diff]

## 发现位置与作用域 {#skills-roots}

Skill 有两个作用域，都是目录约定，没有集中登记表：

| 位置 | 作用域 | 文档用途 |
| :-- | :-- | :-- |
| `.kiro/skills/` | 工作区 | 项目专属工作流、团队约定 |
| `~/.kiro/skills/` | 全局 | 跨所有项目的个人工作流 |

文档给出的加入方式是直接把 Skill 文件夹拷进上述目录之一，CLI 在**新会话启动时**自动发现。[@ref-kiro-skills-scope][@ref-kiro-skills-import]

配置作用域参考页把 Skill 路径固化在全局/项目两列：全局 `~/.kiro/skills/`、项目 `.kiro/skills/`；同一页还说明 `KIRO_HOME` 环境变量会把全局的 `~/.kiro` 目录整体重定向到别处，Agents、Skills、Steering、Settings、Sessions 都随 `KIRO_HOME` 改变——这是在一台机器上隔离多套 Kiro 配置的官方手段。[@ref-kiro-config-paths][@ref-kiro-config-scopes]

**自定义 Agent 默认不加载 Skill**。文档明确：自定义 agent 需要在其 `resources` 字段里用 `skill://` URI 显式加入，支持具体路径、glob 与 home 目录展开：

```json
{
  "name": "my-agent",
  "resources": [
    "skill://.kiro/skills/*/SKILL.md",
    "skill://~/.kiro/skills/*/SKILL.md"
  ]
}
```

该示例直接来自官方 Skills 页的 "Custom agents and skills" 小节；Agent 配置参考页进一步说明 `skill://` 资源在启动时只加载元数据（name 与 description），正文按需加载。[@ref-kiro-skills-agents][@ref-kiro-agentref-resources]

## SKILL.md 的格式与字段 {#skills-format}

一个 Skill 是一个目录，必需文件是 `SKILL.md`，另有可选的 `scripts/`、`references/`、`assets/`：[@ref-kiro-skills-format]

```text
my-skill/
├── SKILL.md           # Required
├── scripts/           # Optional executable code
├── references/        # Optional documentation
└── assets/            # Optional templates
```

`SKILL.md` 以 YAML frontmatter 开头，随后是 Markdown 指令。官方文档给出的最小示例（原样抄录，仅字段来源为该页）：[@ref-kiro-skills-format]

```markdown
---
name: pr-review
description: Review pull requests for code quality, security issues, and test coverage. Use when reviewing PRs or preparing code for review.
---

### Review checklist

When reviewing a pull request:

1. Check for vulnerabilities, injection risks, exposed secrets
2. Verify edge cases and failure modes are handled
3. Confirm new code has appropriate tests
4. Ensure variables and functions have clear names
```

frontmatter 字段表原文：[@ref-kiro-skills-frontmatter]

| 字段 | 必需 | 说明 |
| :-- | :--: | :-- |
| `name` | 是 | 必须与文件夹名一致；只用小写字母、数字和连字符，最长 64 字符 |
| `description` | 是 | 何时使用该 Skill；Kiro 用它匹配你的请求，最长 1024 字符 |
| `license` | 否 | 许可证名或指向随包许可证文件的引用 |
| `compatibility` | 否 | 环境要求（例如需要的工具、网络访问） |
| `metadata` | 否 | 附加键值数据，例如作者或版本 |

`references/` 目录用于大量文档，`SKILL.md` 里用相对路径指示 Kiro 去读，例如 `references/ecs-guide.md`；文档写明 "Kiro loads reference files only when the instructions direct it to"，即引用文件不随正文一起整体进入上下文。[@ref-kiro-skills-references]

## 进入上下文的时机与调用方式 {#skills-loading}

官方把 Skill 的处理链写成三段式**渐进式披露**（progressive disclosure），这是理解 Skill 何时占用上下文的关键：[@ref-kiro-skills-progressive]

1. **Discovery** — 启动时只加载每个 Skill 的 `name` 与 `description`；
2. **Activation** — 请求与某个 Skill 的 description 匹配时，加载完整指令；
3. **Execution** — 按指令需要再读取脚本或引用文件。

调用有两条路径：[@ref-kiro-skills-using]

- **自动**：Kiro 用请求文本去匹配 Skill 的 description 并自动激活；
- **斜杠命令**：在输入框输入 `/` 加 Skill 名直接调用（名为 `pr-review` 的 Skill 即成为 `/pr-review`），加载完整指令。

CLI 还支持参数替换：若 Skill 正文包含 `$ARGUMENTS` 或 `$` 占位符，斜杠命令后面的文本会替换进去；没有占位符时，尾部文本仍作为额外上下文传给 agent。文档注明该占位符替换**目前仅 CLI 支持**。[@ref-kiro-skills-arguments]

要查看当前会话有哪些 Skill，用 `/context show` 或直接询问 Kiro。会话启动即完成发现，改动目录后需要新开会话才能被重新发现。[@ref-kiro-skills-using][@ref-kiro-skills-progressive]

**缺口（`skills.discovery`）**：固定来源确认了"新会话启动时扫描""发现范围是 `.kiro/skills/` 与 `~/.kiro/skills/` 下的 Skill 目录""每个 Skill 必须有 SKILL.md"，但没有给出目录递归深度、是否跟随符号链接、忽略规则（例如 `.gitignore`/`kiroignore` 是否影响 Skill 扫描）以及超大目录的扫描上限；官方加入 Skill 的方式只是把目录拷进两个位置之一，未给出更细的扫描规则。这些点没有可引用证据，保持未验证。[@ref-kiro-skills-import]

## 同名冲突与优先级 {#skills-collision}

文档直接给出规则：当工作区与全局存在同名 Skill 时，**工作区 Skill 优先于全局 Skill**，以便用项目级覆盖个人级。文档没有描述更细的命名空间、合并或重命名机制——没有"重命名后仍引用"的入口，冲突只按作用域优先级消解。[@ref-kiro-skills-scope]

同一页的故障排查表也印证这一模型：Slash 命令找不到时要"verify the skill folder name matches what you're typing"，Wrong skill activating 要通过更具体的 description 关键词区分，而不是改名规则。[@ref-kiro-skills-trouble]

## 诊断与重载 {#skills-diagnostics}

- `/context show` 列出当前会话可用的 Skill；`/config`（本地或云 V3 会话）打开配置总览，可进入 Skills 分类查看已配置项的数量或状态。[@ref-kiro-skills-using][@ref-kiro-config-inspect]
- 官方排查表（原文要点）：
  - Skill not activating → 让 description 更具体、包含与请求一致的关键词；
  - Slash command not found → 确认 Skill 文件夹名与输入一致，且 `SKILL.md` 有合法 frontmatter；
  - Skill not found → 确认 `SKILL.md` 存在于正确位置且有合法 frontmatter；
  - Custom agent missing skills → 在 agent 的 `resources` 字段加入 `skill://` URI；
  - Wrong skill activating → 用更具体的关键词区分 description。[@ref-kiro-skills-trouble]

**重载时机**：Skill 的发现发生在会话启动阶段，目录内容改动要在新会话生效；固定来源没有提供会话内热重载 Skill 的说明。自定义 agent 的 `skill://` 资源同理在 agent 启动时解析元数据。改动 agent 配置或 MCP 配置文档描述为支持热重载，但**未**声明 Skill 文件本身支持热重载。[@ref-kiro-skills-progressive][@ref-kiro-agentref-resources]
