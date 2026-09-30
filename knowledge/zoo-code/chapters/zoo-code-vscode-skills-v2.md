---
schema_version: 3
record_kind: production
edition_id: zoo-code-vscode-skills-v2
harness_id: zoo-code
topic: skills
title: "Zoo Code VS Code 扩展的 Agent Skills：目录、发现、格式与调用"
sections:
  - section_id: skills-roots
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-skills, ref-zoo-code-docs-site, ref-zoo-code-src-roo-home-dir, ref-zoo-code-src-agents-home-dir, ref-zoo-code-src-project-agents-dir, ref-zoo-code-src-skills-dirs]
  - section_id: skills-discovery
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-skills-scan, ref-zoo-code-docs-skills-discovery, ref-zoo-code-src-skills-watchers, ref-zoo-code-src-skills-override, ref-zoo-code-src-skills-mode-filter, ref-zoo-code-src-skills-dirs, ref-zoo-code-docs-skills-priority]
  - section_id: skills-format
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-skills-metadata, ref-zoo-code-src-skills-modeslugs, ref-zoo-code-docs-skills-naming, ref-zoo-code-src-skill-metadata]
  - section_id: skills-invocation
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-docs-skill-tool, ref-zoo-code-src-skill-tool, ref-zoo-code-docs-skill-tool-params, ref-zoo-code-src-skills-content, ref-zoo-code-src-skills-mode-filter, ref-zoo-code-docs-skills]
  - section_id: skills-conditions
    surface_ids: [vscode]
    source_refs: [ref-zoo-code-src-skills-mode-filter, ref-zoo-code-src-skills-watchers, ref-zoo-code-docs-skills-trouble, ref-zoo-code-src-skills-metadata, ref-zoo-code-docs-skill-tool, ref-zoo-code-docs-skills-discovery]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [vscode]
        section_id: skills-roots
        status: answered
        source_refs: [ref-zoo-code-docs-skills, ref-zoo-code-docs-site, ref-zoo-code-src-roo-home-dir, ref-zoo-code-src-agents-home-dir, ref-zoo-code-src-project-agents-dir, ref-zoo-code-src-skills-dirs]
  - question_id: skills.discovery
    answers:
      - surface_ids: [vscode]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-zoo-code-src-skills-scan, ref-zoo-code-docs-skills-discovery, ref-zoo-code-src-skills-watchers, ref-zoo-code-src-skills-override, ref-zoo-code-src-skills-mode-filter, ref-zoo-code-src-skills-dirs, ref-zoo-code-docs-skills-priority]
  - question_id: skills.collision
    answers:
      - surface_ids: [vscode]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-zoo-code-src-skills-scan, ref-zoo-code-docs-skills-discovery, ref-zoo-code-src-skills-watchers, ref-zoo-code-src-skills-override, ref-zoo-code-src-skills-mode-filter, ref-zoo-code-src-skills-dirs, ref-zoo-code-docs-skills-priority]
  - question_id: skills.format
    answers:
      - surface_ids: [vscode]
        section_id: skills-format
        status: answered
        source_refs: [ref-zoo-code-src-skills-metadata, ref-zoo-code-src-skills-modeslugs, ref-zoo-code-docs-skills-naming, ref-zoo-code-src-skill-metadata]
  - question_id: skills.extensions
    answers:
      - surface_ids: [vscode]
        section_id: skills-format
        status: answered
        source_refs: [ref-zoo-code-src-skills-metadata, ref-zoo-code-src-skills-modeslugs, ref-zoo-code-docs-skills-naming, ref-zoo-code-src-skill-metadata]
  - question_id: skills.loading
    answers:
      - surface_ids: [vscode]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-zoo-code-docs-skill-tool, ref-zoo-code-src-skill-tool, ref-zoo-code-docs-skill-tool-params, ref-zoo-code-src-skills-content, ref-zoo-code-src-skills-mode-filter, ref-zoo-code-docs-skills]
  - question_id: skills.invocation
    answers:
      - surface_ids: [vscode]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-zoo-code-docs-skill-tool, ref-zoo-code-src-skill-tool, ref-zoo-code-docs-skill-tool-params, ref-zoo-code-src-skills-content, ref-zoo-code-src-skills-mode-filter, ref-zoo-code-docs-skills]
  - question_id: skills.conditions
    answers:
      - surface_ids: [vscode]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-zoo-code-src-skills-mode-filter, ref-zoo-code-src-skills-watchers, ref-zoo-code-docs-skills-trouble, ref-zoo-code-src-skills-metadata, ref-zoo-code-docs-skill-tool, ref-zoo-code-docs-skills-discovery]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-zoo-code-src-skills-mode-filter, ref-zoo-code-src-skills-watchers, ref-zoo-code-docs-skills-trouble, ref-zoo-code-src-skills-metadata, ref-zoo-code-docs-skill-tool, ref-zoo-code-docs-skills-discovery]
---

本章采写 Zoo Code 的 Agent Skills：目录位置、发现与同名覆盖、`SKILL.md` 字段、渐进式加载与调用条件。固定来源是 Zoo-Code 仓库固定 commit `bf3bc781b813a2a6cbdb29dfd7c86f423589090e` 上的 `src/services/skills/`、`src/services/roo-config/`、`src/core/prompts/tools/native-tools/skill.ts`，以及 Zoo-Code-Docs 仓库固定 commit `dfd2628c31073ec6b111bfedbcd071d197d37ad2` 上的 `docs/features/skills.mdx` 与 `docs/advanced-usage/available-tools/skill.md`。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 技能目录与作用域 {#skills-roots}

Zoo Code 的 Skill 是目录形式：每个技能是 `<技能名>/SKILL.md`，脚本与参考资料放在同一目录；宿主按「全局 / 项目」两档作用域、各含 `.roo` 专有与 `.agents` 跨工具两套目录来扫描 [@ref-zoo-code-docs-skills]。官方文档站点与仓库文档同源，站点首页也把「可定制 Modes」与技能类扩展能力列为产品定位 [@ref-zoo-code-docs-site]。

| 作用域 | Zoo 专有目录 | 跨工具目录 |
| --- | --- | --- |
| 全局（所有项目） | `~/.roo/skills/`，Windows 为 `%USERPROFILE%\.roo\skills\` | `~/.agents/skills/` |
| 项目（当前工作区） | `<工作区>/.roo/skills/` | `<工作区>/.agents/skills/` |

- 全局 `.roo` 目录由 `getGlobalRooDirectory()` 用 `os.homedir()` 拼出，即 `~/.roo`；没有任何环境变量可以改写它 [@ref-zoo-code-src-roo-home-dir]。
- 跨工具目录由 `getGlobalAgentsDirectory()` 拼出 `~/.agents`，项目级由 `getProjectAgentsDirectoryForCwd(cwd)` 拼出「工作区 cwd + `/.agents`」；“工作区根”就是 VS Code 传入的扩展 `cwd` [@ref-zoo-code-src-agents-home-dir] [@ref-zoo-code-src-project-agents-dir]。
- 除通用 `skills/` 外，宿主还为**每个已知 mode** 扫描 `skills-{modeSlug}/` 目录；mode 列表来自内置 mode 加用户自定义 mode（`getAvailableModes()` 合并二者）[@ref-zoo-code-src-skills-dirs]。

```bash
# 依据 docs/features/skills.mdx 的 1. Choose a location 一节
mkdir -p ~/.roo/skills/pdf-processing        # 全局、所有项目、所有 mode
mkdir -p <工作区>/.roo/skills-code/review    # 项目内、仅 code mode
```

## 目录扫描、发现时机与同名冲突 {#skills-discovery}

发现是「启动时全量扫描 + 文件监视增量重扫」：`SkillsManager.initialize()` 先执行一次 `discoverSkills()`，再 `setupFileWatchers()` [@ref-zoo-code-src-skills-scan]。

- 扫描只下钻一层：对每个技能根目录做 `fs.realpath` 后 `fs.readdir`，逐项 `fs.stat` 判断是否目录（跟随符号链接），只把目录当作技能；根目录本身不存在或不可读时静默跳过 [@ref-zoo-code-src-skills-scan]。
- 符号链接支持两种形态：`skills` 目录本身是指向技能库的链接，或 `skills/<名字>` 是指向某个技能目录的链接；技能名取链接名而不是目标目录名，`frontmatter.name` 必须与该名字完全一致 [@ref-zoo-code-src-skills-scan] [@ref-zoo-code-docs-skills-discovery]。
- 文件监视器用 `**/SKILL.md` 的 `RelativePattern` 覆盖 4 组基础目录，并为每个已知 mode 额外挂 `skills-{mode}`；创建、修改、删除任一 `SKILL.md` 都触发一次全量 `discoverSkills()` [@ref-zoo-code-src-skills-watchers]。
- 只在内存里保存名称、描述与路径，扫描结果按 `source:mode:name` 建键；同名技能的覆盖规则是**项目覆盖全局、mode 专属覆盖通用、同级同类先到先得** [@ref-zoo-code-src-skills-override] [@ref-zoo-code-src-skills-mode-filter]。
- 同一 `source` 层级内，后处理的目录会替换先处理的同名技能：全局与项目两条链都是先 `.agents` 后 `.roo`，因此 `.roo` 胜出 [@ref-zoo-code-src-skills-dirs]。
- 文档给出的完整优先级（高到低）：项目 `.roo` mode 专属、项目 `.roo` 通用、项目 `.agents` mode 专属、项目 `.agents` 通用、全局 `.roo` mode 专属、全局 `.roo` 通用、全局 `.agents` mode 专属、全局 `.agents` 通用 [@ref-zoo-code-docs-skills-priority]。

```bash
# 依据 docs/features/skills.mdx 的 Symlink support 一节
ln -s /shared/company-skills ~/.roo/skills/company-standards
```

## SKILL.md 结构与字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 与 Markdown 正文组成；解析用 `gray-matter`，只读取 `name`、`description`、`modeSlugs`（新）与 `mode`（旧）四个键，其余键不影响加载 [@ref-zoo-code-src-skills-metadata] [@ref-zoo-code-src-skills-modeslugs]。

| 字段 | 必填 | 规则 |
| --- | --- | --- |
| `name` | 是 | 必须与目录名（或符号链接名）完全一致；1–64 字符，仅小写字母、数字与连字符，不得以连字符开头/结尾，不得出现连续连字符 [@ref-zoo-code-docs-skills-naming] |
| `description` | 是 | 去空白后 1–1024 字符，模型据此判断何时调用 [@ref-zoo-code-src-skills-metadata] |
| `modeSlugs` | 否 | 字符串数组，限定技能可用的 mode；省略或空数组表示“任意 mode” [@ref-zoo-code-src-skills-modeslugs] |
| `mode` | 否 | 旧式单 mode 字段，仅在 `modeSlugs` 缺失时生效 [@ref-zoo-code-src-skills-modeslugs] |

- 目录名兜底：`modeSlugs` 与 `mode` 都没有时，才会用目录名 `skills-{mode}` 推导 mode；用户界面新建技能总是写入通用 `skills/` 并把 mode 关系放进 frontmatter [@ref-zoo-code-src-skills-modeslugs]。
- 解析失败的四种情形都只跳过该技能并写 `console.error`：缺少 `name`、缺少 `description`、`name` 与目录名不一致、名称或描述不符合长度/格式约束 [@ref-zoo-code-src-skills-metadata]。
- 内存中保存的元数据只有名称、描述、`SKILL.md` 绝对路径、来源（global/project）与 `modeSlugs`；正文不进内存 [@ref-zoo-code-src-skill-metadata]。

最小技能（依据 `docs/features/skills.mdx` 的 3. Write the SKILL.md file 一节）[@ref-zoo-code-docs-skills-naming]：

```markdown
---
name: pdf-processing
description: Extract text and tables from PDF files using Python libraries
---

# PDF Processing Instructions

1. Check if PyPDF2 or pdfplumber is installed
2. For text extraction, use pdfplumber for better table detection
```

## 加载、调用与模式解析 {#skills-invocation}

名称与描述在会话构建提示词时进入模型上下文，正文只在被调用时读取 [@ref-zoo-code-docs-skill-tool]。

- 模型侧入口是原生工具 `skill`，参数固定为 `skill`（必填，技能名）与 `args`（可选上下文）；工具描述明确要求技能名取自系统提示词的 AVAILABLE SKILLS 列表 [@ref-zoo-code-src-skill-tool] [@ref-zoo-code-docs-skill-tool-params]。
- 调用时按当前 mode 解析：先经 `getSkillsForMode(currentMode)` 过滤出该 mode 可用的技能，再按名称取出并读取 `SKILL.md` 正文（frontmatter 剥离后返回 `instructions`）[@ref-zoo-code-src-skills-content] [@ref-zoo-code-src-skills-mode-filter]。
- 返回给模型的结果串包含技能名、描述、传入的 `args`、来源（global/project）与正文，正文以 `--- Skill Instructions ---` 分隔；技能一旦载入就在本次会话中持续可见 [@ref-zoo-code-docs-skill-tool]。
- 渐进披露分三层：发现层只解析 frontmatter 的 `name`/`description`；调用层把正文读入上下文；资源层不自动加载——技能目录里的脚本、模板只有正文明确引用时模型才会另行 `read_file` [@ref-zoo-code-docs-skill-tool]。技能包没有独立清单文件 [@ref-zoo-code-docs-skills]。
- 文档给出的解析顺序与源码一致：项目 `.roo` mode 专属 → 项目 `.roo` 通用 → 项目 `.agents` mode 专属 → 项目 `.agents` 通用 → 全局 `.roo` mode 专属 → 全局 `.roo` 通用 → 全局 `.agents` mode 专属 → 全局 `.agents` 通用 [@ref-zoo-code-docs-skill-tool]。

## 生效条件、重载与诊断 {#skills-conditions}

- mode 过滤是主要开关：`modeSlugs` 为空视为“任意 mode”，非空时仅当当前 mode 的 slug 在数组中才可用；当前 mode 由一个 `.roo` 目录里的技能访问时，仍按该 mode 判定 [@ref-zoo-code-src-skills-mode-filter]。
- 改动 `SKILL.md` 后无需重启：文件监视器在创建/修改/删除时自动重扫全部技能目录；只有 `process.env.NODE_ENV === "test"` 或 VS Code 文件系统 API 不可用时才跳过监视 [@ref-zoo-code-src-skills-watchers]。
- 排查“技能没生效”按文档给出的四类原因依次检查：`name` 与目录名不一致、缺少 `name`/`description`、技能放在 `skills-{mode}/` 而当前处于别的 mode、描述过于笼统 [@ref-zoo-code-docs-skills-trouble]。
- 跳过原因只写在扩展的调试输出里（`console.error` 打印具体原因：缺字段、名字不匹配、名字非法、描述超长），没有专门的“列出全部技能及来源目录”命令；可观察入口是系统提示词里的可用技能清单与 `skill` 工具调用结果 [@ref-zoo-code-src-skills-metadata] [@ref-zoo-code-docs-skill-tool]。
- 同名技能被覆盖后不会出现在解析结果里；判断某个技能最终来自哪个目录，只能看返回结果中的 `Source` 字段（global/project）与解析优先级 [@ref-zoo-code-docs-skill-tool] [@ref-zoo-code-docs-skills-discovery]。
