---
schema_version: 3
record_kind: production
edition_id: sourcecraft-code-assistant-vscode-skills-v1
harness_id: sourcecraft-code-assistant
topic: skills
title: "SourceCraft Code Assistant（VS Code）的 Skill 目录、格式与优先级"
sections:
  - section_id: skills-roots
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-skills-features, ref-sc-ca-skills-intro, ref-sc-ca-skills-locations, ref-sc-ca-skills-structure]
  - section_id: skills-format
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-skills-format]
  - section_id: skills-discovery
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-skills-discovery, ref-sc-ca-skills-modes, ref-sc-ca-skills-structure, ref-sc-ca-skills-symlinks]
  - section_id: skills-priority
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-skills-compare, ref-sc-ca-skills-priority]
  - section_id: skills-loading
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-cli-skills, ref-sc-ca-skills-features, ref-sc-ca-skills-how, ref-sc-ca-skills-intro, ref-sc-ca-slash-create]
  - section_id: skills-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-sc-ca-logs, ref-sc-ca-skills-notloading, ref-sc-ca-skills-troubleshooting]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [vscode]
        section_id: skills-roots
        status: answered
        source_refs: [ref-sc-ca-skills-locations, ref-sc-ca-skills-structure]
  - question_id: skills.discovery
    answers:
      - surface_ids: [vscode]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-sc-ca-skills-discovery, ref-sc-ca-skills-symlinks]
  - question_id: skills.collision
    answers:
      - surface_ids: [vscode]
        section_id: skills-priority
        status: answered
        source_refs: [ref-sc-ca-skills-priority]
  - question_id: skills.format
    answers:
      - surface_ids: [vscode]
        section_id: skills-format
        status: answered
        source_refs: [ref-sc-ca-skills-format]
  - question_id: skills.extensions
    answers:
      - surface_ids: [vscode]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-sc-ca-skills-modes, ref-sc-ca-skills-structure]
  - question_id: skills.loading
    answers:
      - surface_ids: [vscode]
        section_id: skills-loading
        status: answered
        source_refs: [ref-sc-ca-skills-how, ref-sc-ca-skills-features]
  - question_id: skills.invocation
    answers:
      - surface_ids: [vscode]
        section_id: skills-loading
        status: answered
        source_refs: [ref-sc-ca-skills-features, ref-sc-ca-slash-create, ref-sc-ca-cli-skills]
  - question_id: skills.conditions
    answers:
      - surface_ids: [vscode]
        section_id: skills-loading
        status: answered
        source_refs: [ref-sc-ca-skills-intro]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-sc-ca-skills-troubleshooting, ref-sc-ca-skills-notloading]
---

## Skill 的目录、作用域与结构 {#skills-roots}

Code Assistant 的 Skill 是"按需加载的任务专用指令包"，与始终生效的 custom rules 相对：rules 进入基础 prompt，Skill 只在请求与其描述匹配时才载入。[@ref-sc-ca-skills-features]

Skill 机制在官方文档中标注为**仅 Visual Studio Code 可用**（该页与 SourceCraft 界面侧的 AI skills 分属两套机制）。[@ref-sc-ca-skills-intro]

Skill 文件统一命名为 `SKILL.md`，存放位置决定作用域。官方 "Select the location" 列出四类（Linux/macOS 路径，Windows 用 `%USERPROFILE%`）：[@ref-sc-ca-skills-locations]

| 作用域 | 路径 | 说明 |
| :-- | :-- | :-- |
| 全局（Code Assistant 专用，高优先级） | `~/.codeassistant/skills/NAME/SKILL.md` | Windows：`%USERPROFILE%\.codeassistant\skills\NAME\SKILL.md` |
| 全局（跨 agent 共享） | `~/.agents/skills/NAME/SKILL.md` | 与其它 agentic 工具共享的通用目录 |
| 项目（Code Assistant 专用，高优先级） | `.codeassistant/skills/NAME/SKILL.md`（相对项目根） | 随仓库提交，团队共享 |
| 项目（跨 agent 共享） | `.agents/skills/NAME/SKILL.md`（相对项目根） | 通用目录 |

目录结构上 `SKILL.md` 是必需文件，同目录下可放脚本、模板等资源；官方 "Basic structure" 给出的树形示例包含 `extract.py`、`templates/output-template.md` 之类附属文件，并明确 `~/.codeassistant/skills/` 为全局高优先级、`.codeassistant/skills/` 覆盖全局。[@ref-sc-ca-skills-structure]

创建方式为纯文件操作（官方示例）：建立 `~/.codeassistant/skills/pdf-processing/`，在其中 `touch SKILL.md`，无需注册或额外配置。[@ref-sc-ca-skills-structure]

## SKILL.md 的字段与解析规则 {#skills-format}

`SKILL.md` 使用 Agent Skills 格式（官方链接 agentskills.io），由 YAML frontmatter 与正文组成。官方示例：[@ref-sc-ca-skills-format]

```markdown
---
name: pdf-processing
description: Extract text and tables from PDF files using Python libraries
---

# PDF processing instructions

When a user sends a PDF processing request:
...
```

解析规则（官方逐条列明）：[@ref-sc-ca-skills-format]

- `name` 与 `description` 两个 metadata 字段**必需**。
- `name` 必须与目录名（或符号链接名）**完全一致**，例如目录名为 `pdf-processing` 时 `name: pdf_processing` 非法。
- `name` 长度 1–64 字符，只允许小写字母、数字与连字符；不能以连字符开头或结尾，也不能有连续连字符（`my--skill` 非法）。
- `description` 长度 1–1024 字符（不计首尾空格），用于让 Code Assistant 判断何时使用该 Skill，需写得具体。

正文为 Markdown 指令；官方建议给出具体函数/库名、代码模板、边界情形与排错指引。[@ref-sc-ca-skills-format]

## 发现、扫描与模式过滤 {#skills-discovery}

官方 "Skill discovery" 说明三个时机：[@ref-sc-ca-skills-discovery]

1. 启动时读取并解析每个 `SKILL.md` 建立索引；
2. 开发过程中**定期扫描** `SKILL.md` 的变化；
3. 按模式过滤：只有与当前 mode 相关的 Skill 保持可用。

**模式专用目录**：`skills-{modeSlug}` 目录只在对应模式生效，全局与项目两侧都支持，跨 agent 的 `.agents/` 目录同样支持 `skills-{modeSlug}`。官方示例：`~/.codeassistant/skills-code/`（仅 Code 模式）、`.codeassistant/skills-architect/`（仅 Architect 模式）。[@ref-sc-ca-skills-modes]

**符号链接**：Skill 支持用符号链接共享库，例如 `ln -s /shared/company-skills ~/.codeassistant/skills/company-standards`；Skill 名取自符号链接名或目录名，且 frontmatter 的 `name` 必须与之一致，因此**不能**用不同别名指向同一 Skill。[@ref-sc-ca-skills-symlinks]

官方目录树同时给出跨 agent 的形态 `.agents/skills/` 与 `.agents/skills-{modeSlug}/`。[@ref-sc-ca-skills-structure]

## 同名 Skill 的覆盖优先级 {#skills-priority}

同名 Skill 出现在多个目录时，官方给出从高到低的八级优先序，并明确"**同一项目层级下 `.codeassistant/` 永远优先于 `.agents/`**"、"项目 Skill 永远覆盖同名全局 Skill"：[@ref-sc-ca-skills-priority]

1. 项目 `.codeassistant/skills-{mode}/NAME/`（最高）
2. 项目 `.codeassistant/skills/NAME/`
3. 项目 `.agents/skills-{mode}/NAME/`
4. 项目 `.agents/skills/NAME/`
5. 全局 `~/.codeassistant/skills-{mode}/NAME/`
6. 全局 `~/.codeassistant/skills/NAME/`
7. 全局 `~/.agents/skills-{mode}/NAME/`
8. 全局 `~/.agents/skills/NAME/`（最低）

官方对比表把 Skill 的覆盖规则概括为 "Project 优先于 Global，Mode 优先于 General"，并把发现方式记为"自动目录扫描"。[@ref-sc-ca-skills-compare]

## 加载、调用与生效条件 {#skills-loading}

官方把加载描述为 progressive disclosure（渐进披露），分三步：[@ref-sc-ca-skills-how]

1. **发现**：读取每个 `SKILL.md` 的 `name` 与 `description`；**只有这两个 metadata 进内存缓存**，正文不载入。
2. **指令**：当请求匹配某个 Skill 的描述时，才把完整 `SKILL.md` 正文载入上下文。
3. **资源**：prompt 会告知 Code Assistant 该 Skill 目录下有哪些关联文件；**没有单独的资源清单**，Code Assistant 在指令提到这些文件时按需发现。

调用方式为**模型自动匹配**：用户只需提出与描述匹配的请求（官方测试示例为 "Help me extract tables from this PDF"），Code Assistant 匹配描述后读取 `SKILL.md` 并遵循其指令；Skill 无显式注册步骤。[@ref-sc-ca-skills-how]

Skill 与相邻机制的分工（官方对照表）：[@ref-sc-ca-skills-features]

| 特性 | Skills | Custom rules | Slash 命令 |
| :-- | :-- | :-- | :-- |
| 激活 | 请求相关时触发 | 常驻，属于基础 prompt | 调用时触发 |
| 适用 | 任务专用工作流 | 通用编码规范 | 预定义指令的执行 |
| 可附带文件 | 是 | 否 | 否 |
| 模式专用 | 是（`skills-{mode}` 目录） | 是（`rules-{mode}` 目录） | 否 |
| 覆盖优先级 | Project 高于 Global，Mode 高于 General | Project 高于 Global | Project 高于 Global |
| 格式 | 带 metadata 的 `SKILL.md` | 任意文本文件 | JSON metadata 与正文 |

自定义 Slash 命令存放在 `.codeassistant/commands/` 与 `~/.codeassistant/commands/`，是另一套按名显式调用的机制，与 Skill 的自动匹配不同。[@ref-sc-ca-slash-create]

跨界面提示：SourceCraft CLI 的内置 `opencode` 通过 `src skill NAME ARGS` 运行自定义 Skill，并额外注入 `src-cli` 技能；官方指引说明自定义 Skill 可按 OpenCode 的 Skill 指南创建，也可下载现成的 Skill。插件侧另有 `.agents/skills/` 这一"与其它 agentic 工具共享"的跨 agent 目录；两者是不同前端各自的 Skill 入口，本节只记录来源写明的部分。[@ref-sc-ca-cli-skills]

生效条件：整个 Skill 机制仅在 VS Code 插件中提供。[@ref-sc-ca-skills-intro]

## 诊断与排错 {#skills-diagnostics}

官方 Troubleshooting 一节按症状给出排查入口：[@ref-sc-ca-skills-troubleshooting]

- **请求匹配但 Skill 未加载**：核对 `name` 与目录名是否一致、`name`/`description` 是否齐全、`skills-code/` 是否用在非 Code 模式（模式不匹配则不加载），以及 `description` 是否过于宽泛。[@ref-sc-ca-skills-notloading]
- **读了 Skill 但不遵循**：指令过宽或缺少关键细节，需补充具体库/函数、模板、边界与排错。[@ref-sc-ca-skills-notloading]
- **多个 Skill 可能适用、不知用了哪个**：说明描述重叠或模式配置重叠，应写精确描述、用模式目录隔离作用域，或利用覆盖优先级。[@ref-sc-ca-skills-troubleshooting]
- **团队要统一 Skill**：把 Skill 放进项目的 `.codeassistant/skills/` 并提交到远端仓库。[@ref-sc-ca-skills-troubleshooting]

插件级日志通过 VS Code 底栏插件图标菜单的 **Export Logs** 导出 `logs.zip` 交给支持团队，这是唯一的官方日志收集入口。[@ref-sc-ca-logs]

**缺口**：固定来源没有给出 Skill 的 token/大小上限、扫描去抖间隔、`SKILL.md` 解析失败时的具体报错文案，以及"Skill 目录中发现但未载入"的清单入口；这些保持未验证。
