---
schema_version: 3
record_kind: production
edition_id: roo-code-vscode-skills-v2
harness_id: roo-code
topic: skills
title: "Roo Code（VS Code 扩展）的 Skill 机制：根目录、发现、SKILL.md 解析、覆盖优先级与调用"
sections:
  - section_id: skills-roots
    surface_ids: [vscode]
    source_refs: [ref-roo-skills-code-dirs, ref-roo-skills-doc-locations, ref-roo-skills-global-roo, ref-roo-skills-global-agents, ref-roo-skills-project-agents, ref-roo-skills-code-modes-list]
  - section_id: skills-discovery
    surface_ids: [vscode]
    source_refs: [ref-roo-skills-code-watchers, ref-roo-skills-code-scan, ref-roo-skills-doc-discovery, ref-roo-skills-code-metadata]
  - section_id: skills-format
    surface_ids: [vscode]
    source_refs: [ref-roo-skills-code-metadata, ref-roo-skills-name-rules, ref-roo-skills-shared-types, ref-roo-skills-code-content, ref-roo-skills-doc-structure, ref-roo-skills-doc-locations]
  - section_id: skills-extensions
    surface_ids: [vscode]
    source_refs: [ref-roo-skills-doc-spec, ref-roo-skills-code-metadata, ref-roo-skills-doc-structure, ref-roo-skills-code-dirs, ref-roo-skills-prompt-section]
  - section_id: skills-selection
    surface_ids: [vscode]
    source_refs: [ref-roo-skills-doc-priority, ref-roo-skills-code-override, ref-roo-skills-code-dirs, ref-roo-skills-code-keys, ref-roo-skills-doc-spec, ref-roo-skills-tool-doc-resolution, ref-roo-skills-prompt-section, ref-roo-skills-tool-execute, ref-roo-skills-code-content, ref-roo-skills-invocation-result, ref-roo-skills-auto-approval, ref-roo-skills-tool-doc-features]
  - section_id: skills-diagnostics
    surface_ids: [vscode]
    source_refs: [ref-roo-skills-ui-handlers, ref-roo-skills-code-metadata, ref-roo-skills-doc-troubleshooting, ref-roo-skills-tool-doc-resolution, ref-roo-skills-code-watchers]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [vscode]
        section_id: skills-roots
        status: answered
        source_refs: [ref-roo-skills-code-dirs, ref-roo-skills-global-roo, ref-roo-skills-global-agents, ref-roo-skills-project-agents, ref-roo-skills-code-modes-list]
  - question_id: skills.discovery
    answers:
      - surface_ids: [vscode]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-roo-skills-code-scan, ref-roo-skills-code-watchers]
  - question_id: skills.collision
    answers:
      - surface_ids: [vscode]
        section_id: skills-selection
        status: answered
        source_refs: [ref-roo-skills-code-dirs, ref-roo-skills-code-override, ref-roo-skills-code-keys]
  - question_id: skills.format
    answers:
      - surface_ids: [vscode]
        section_id: skills-format
        status: answered
        source_refs: [ref-roo-skills-code-metadata, ref-roo-skills-name-rules]
  - question_id: skills.extensions
    answers:
      - surface_ids: [vscode]
        section_id: skills-extensions
        status: answered
        source_refs: [ref-roo-skills-code-metadata, ref-roo-skills-doc-spec]
  - question_id: skills.loading
    answers:
      - surface_ids: [vscode]
        section_id: skills-selection
        status: answered
        source_refs: [ref-roo-skills-prompt-section, ref-roo-skills-code-content]
  - question_id: skills.invocation
    answers:
      - surface_ids: [vscode]
        section_id: skills-selection
        status: answered
        source_refs: [ref-roo-skills-tool-execute, ref-roo-skills-invocation-result, ref-roo-skills-auto-approval]
  - question_id: skills.conditions
    answers:
      - surface_ids: [vscode]
        section_id: skills-extensions
        status: answered
        source_refs: [ref-roo-skills-prompt-section, ref-roo-skills-code-metadata]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [vscode]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-roo-skills-ui-handlers, ref-roo-skills-code-watchers, ref-roo-skills-doc-troubleshooting]
---

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 固定来源与 Skill 根目录 {#skills-roots}

本章的固定来源是官方仓库 https://github.com/RooCodeInc/Roo-Code 的提交 `b867ec9145750d0ae1ff7f02d35406e9bf2a0b16`。Roo Code 以 VS Code 扩展分发（扩展清单 `src/package.json`，publisher `RooVeterinaryInc`，名称 `roo-cline`），因此本章所有结论都针对 `vscode` 界面。官方文档站的页面源码就在同一提交的 `apps/docs/docs/` 下，`apps/docs/docs/features/skills.mdx` 与实现文件一起作为证据。

结论：Skill 是"一个目录 + 一个 `SKILL.md`"的指令包。宿主从四个根目录族寻找它们，每个族下再分通用目录与按模式区分的目录 [@ref-roo-skills-code-dirs][@ref-roo-skills-doc-locations]：

| 层级 | 路径（相对可用模式） | 来源标记 |
| :-- | :-- | :-- |
| 全局 `.agents` | `~/.agents/skills/`、`~/.agents/skills-{mode}/` | `global` |
| 项目 `.agents` | `项目根/.agents/skills/`、`项目根/.agents/skills-{mode}/` | `project` |
| 全局 `.roo` | `~/.roo/skills/`、`~/.roo/skills-{mode}/` | `global` |
| 项目 `.roo` | `项目根/.roo/skills/`、`项目根/.roo/skills-{mode}/` | `project` |

路径由 `os.homedir()` 加 `path.join` 拼出：`getGlobalRooDirectory()` 返回 `HOME/.roo`，`getGlobalAgentsDirectory()` 返回 `HOME/.agents`，项目侧用当前工作目录拼 `.roo` 与 `.agents`。[@ref-roo-skills-global-roo][@ref-roo-skills-global-agents][@ref-roo-skills-project-agents] Windows 上同一份代码经 `os.homedir()` 得到 `%USERPROFILE%` 下的同名目录，文档里写作 `%USERPROFILE%\.roo\skills\`；代码中没有读取 `HOME`、`USERPROFILE`、`XDG_*` 或其他环境变量来改写根目录，也不做 `~` 手工展开。[@ref-roo-skills-doc-locations][@ref-roo-skills-global-roo]

项目根指的是扩展当前工作区路径（`provider.cwd`），只有它是 truthy 时才加入项目级目录，因此打开空窗口时项目技能不会被扫描。[@ref-roo-skills-code-dirs]

`skills-{mode}/` 中的 `{mode}` 枚举来自"内置模式 + 自定义模式"的 slug 列表：`getAvailableModes()` 取内置 `modes` 的 slug，再尝试从 `customModesManager.getCustomModes()` 合并自定义模式；自定义模式读取失败时静默退回内置列表，此时只属于自定义模式的 `skills-{自定义模式}/` 目录会被漏掉。[@ref-roo-skills-code-modes-list]

## 发现与索引时机 {#skills-discovery}

发现发生在扩展启动时：`ClineProvider` 构造 `SkillsManager` 并调用 `initialize()`，后者先跑一次全量 `discoverSkills()`，再安装文件监听。[@ref-roo-skills-code-watchers]

扫描规则是"每个根目录下一层、且必须是含 `SKILL.md` 的目录"：`scanSkillsDirectory()` 对根目录做 `readdir`，只接受解析后确为目录的条目，然后检查该目录内的 `SKILL.md` 是否存在；嵌套目录（如 `skills/nested/child/SKILL.md`）不会被发现，也没有 `.gitignore`、`.rooignore` 或忽略规则参与筛选。[@ref-roo-skills-code-scan][@ref-roo-skills-doc-discovery]

文件名按字面量 `SKILL.md` 查找，大小写不作特殊处理；在大小写不敏感的文件系统上，效果由文件系统决定。[@ref-roo-skills-code-metadata]

符号链接两处都支持：根目录本身可以是符号链接（扫描前用 `fs.realpath` 解析），单个技能目录也可以是符号链接——此时技能名取链接自身的名字，而不是目标目录名，因此不能用不同链接名给同一份技能起别名。[@ref-roo-skills-code-scan][@ref-roo-skills-doc-discovery]

改动生效方式：`setupFileWatchers()` 为每个通用目录和每个模式目录注册 `RelativePattern(dir, "**/SKILL.md")` 的 `FileSystemWatcher`，create/change/delete 都会重新跑 `discoverSkills()`，刷新内存中的技能表；但它不会主动向 Webview 推送新的技能列表，设置页的技能列表要等重新请求（例如重新打开设置页）才更新。[@ref-roo-skills-code-watchers] 通过设置页做的增删改（`createSkill`/`deleteSkill`/`moveSkill`/`updateSkillModes`）在各自流程里再跑一次 `discoverSkills()`。[@ref-roo-skills-code-watchers]

## SKILL.md 的解析与校验 {#skills-format}

`SKILL.md` 用 `gray-matter` 解析：分隔符之间的 YAML 为 frontmatter，其余为正文。[@ref-roo-skills-code-metadata]

必填与校验规则如下，任何一条不满足都会 `console.error` 并把该技能**静默跳过**（不抛错、不出现在列表里）：[@ref-roo-skills-code-metadata][@ref-roo-skills-name-rules]

- `name`：必填、非空字符串，且必须与目录名（或符号链接名）逐字相等，否则记录 `Skill name "..." doesn't match directory "..."` 并跳过。
- `name` 形态：1–64 个字符，匹配 `^[a-z0-9]+(?:-[a-z0-9]+)*$`——小写字母、数字与单个连字符，不允许首尾连字符或连续连字符。
- `description`：必填、非空字符串，去掉首尾空白后长度 1–1024。
- 其他 frontmatter 字段（例如 `license`、`metadata`）既不解析也不校验，也不会进入上下文。

落库记录为 `{ name, description, path, source, mode, modeSlugs }`：`name` 取目录名，`path` 是 `SKILL.md` 的绝对路径，`source` 是 `global` 或 `project`。[@ref-roo-skills-shared-types][@ref-roo-skills-code-metadata]

正文部分不做结构化解析，只在下一次调用该技能时被整体读出并注入会话；技能目录里的脚本、模板、参考文件等捆绑资源不参与解析，宿主也不会自动加载它们。[@ref-roo-skills-code-content][@ref-roo-skills-doc-structure]

最小可用的 `SKILL.md`（示例依据文档 "Creating Your First Skill" 一节与 `loadSkillMetadata` 的校验规则）[@ref-roo-skills-doc-locations][@ref-roo-skills-code-metadata]：

```markdown
---
name: pdf-processing
description: Extract text and tables from PDF files using Python libraries
---

# PDF Processing Instructions

When the user requests PDF processing:
1. Check if pdfplumber is installed
2. Handle encoding errors gracefully
```

## Roo 专有字段与模式定向 {#skills-extensions}

在 Agent Skills 基本格式之外，Roo Code 额外识别两件事：模式定向目录和两个可选 frontmatter 字段。[@ref-roo-skills-doc-spec]

- 目录自带模式：位于 `skills-{mode}/` 时，该目录内技能默认只在对应模式可用（`mode` 写入记录，`modeSlugs` 设为 `[mode]`）。
- `modeSlugs`（数组）：显式声明可用模式，取数组里的非空字符串；空数组等价于"任意模式"（归一化为 `undefined`）。
- `mode`（字符串，旧字段）：`modeSlugs` 缺失时按 `[mode]` 处理。
- 解析优先级是 `modeSlugs` > `mode` > 目录名推导，三者都缺省时技能对所有模式可用。[@ref-roo-skills-code-metadata]

`modeSlugs` 里的值不与真实模式列表比对，写错模式名不会报错，只会让技能永远匹配不上。[@ref-roo-skills-code-metadata]

捆绑资源靠约定而非清单：文档说明技能目录里可以放脚本、模板与参考文件，但"没有单独的资源清单"，只有技能正文里显式引用时宿主才会去读。[@ref-roo-skills-doc-structure]

两个位置族的差别在共享面：`.roo/` 是 Roo 专用（优先级更高），`.agents/` 是与其它代理工具共用的目录；两者同时存在时 `.roo/` 胜出。[@ref-roo-skills-doc-spec][@ref-roo-skills-code-dirs]

可用性条件：这批固定来源里**没有**任何启用/禁用技能的设置项或实验开关——技能表一旦非空就会进入系统提示；能改变可用性的只有目录位置、模式过滤和 frontmatter 校验是否通过。[@ref-roo-skills-prompt-section][@ref-roo-skills-code-metadata]

## 同名冲突、加载与调用 {#skills-selection}

同名技能靠两级规则消解，没有任何命名空间前缀。[@ref-roo-skills-doc-priority][@ref-roo-skills-code-override]

1. 同一来源层级内，后处理的目录覆盖先处理的目录。处理顺序是全局 `.agents` → 项目 `.agents` → 全局 `.roo` → 项目 `.roo`，每族内先通用目录再各模式目录，因此在同一层级里 `.roo` 覆盖 `.agents`，模式目录覆盖通用目录。[@ref-roo-skills-code-dirs]
2. 跨层级解析时 `shouldOverrideSkill` 比较 `source`：`project`(2) 高于 `global`(1)；同源时带模式限制的技能覆盖"任意模式"的技能；其余情况先到者胜。[@ref-roo-skills-code-override]

内存里的键是 `source:mode:name`（`getSkillKey`），同键 `Map.set` 直接替换，这就是"后者覆盖前者"的实现方式；同名但模式不同的条目可以并存，直到按当前模式解析时才合并。[@ref-roo-skills-code-keys]

进入上下文分三级，文档称为 progressive disclosure：[@ref-roo-skills-doc-spec][@ref-roo-skills-tool-doc-resolution]

1. **元数据**：系统提示只拿到当前模式可见技能的 `name`、`description` 与 `location`，包在 `available_skills` 块里，另外附一段要求模型先核对技能的指令块；没有技能时该小节返回空串。[@ref-roo-skills-prompt-section]
2. **正文**：模型（或用户）调用 `skill` 工具时，`SkillTool.execute` 取当前模式（缺省 `code`），经 `resolveSkillContentForMode` → `getSkillContent(name, mode)` 按当前模式查找技能，再从磁盘读文件、用 `gray-matter` 重新解析并只取正文。[@ref-roo-skills-tool-execute][@ref-roo-skills-code-content]
3. **资源**：链接文件不随正文注入，需要模型自己再用读文件工具打开。[@ref-roo-skills-tool-doc-resolution]

工具返回体的形状是 `Skill: SKILL_NAME`、`Description:`、可选 `Provided arguments:`、`Source: global|project`，随后是 `--- Skill Instructions ---` 与正文。[@ref-roo-skills-invocation-result]

调用失败时的行为：`skill` 参数缺失报缺参错误；名字不在当前模式可见集合里，工具返回 `Skill 'SKILL_NAME' not found. Available skills: ...`（列表为空时写 `(none)`）；技能管理器不可用时返回 `Skills Manager not available`。[@ref-roo-skills-tool-execute]

`skill` 工具默认自动批准，不弹确认框；用户也可以用斜杠命令触发同名技能，该路径复用同一份解析逻辑。[@ref-roo-skills-auto-approval][@ref-roo-skills-tool-doc-features]

## 诊断与重载 {#skills-diagnostics}

- 列表在哪看：设置页的 Skills 标签（`SkillsSettings.tsx`）在挂载时发送 `requestSkills`，宿主用 `skills` 消息回传技能数组，并按 `project`/`global` 分组显示名字与描述。[@ref-roo-skills-ui-handlers]
- 为什么看不到技能：逐项对照校验规则——目录名与 `name` 不一致、缺 `name`/`description`、名字不合 `^[a-z0-9]+(?:-[a-z0-9]+)*$`、描述超长、或当前模式不匹配。宿主对这些情况只在扩展的开发者控制台打印 `console.error`，不会弹窗提示，所以设置页里"没有这个技能"就是最主要的可观察信号。[@ref-roo-skills-code-metadata][@ref-roo-skills-doc-troubleshooting]
- 为什么调不出正文：技能的可用性按调用时的模式判定；写在 `skills-code/` 里的技能在其它模式下调不动。[@ref-roo-skills-tool-doc-resolution]
- 改动何时生效：文件监听会在 create/change/delete 后重新索引（内存表立即更新，下一次工具调用读的就是新内容），但设置页列表要重新请求才会刷新，因此文档建议改动后用重开设置页或重启窗口确认。[@ref-roo-skills-code-watchers][@ref-roo-skills-doc-troubleshooting]
- 检查项缺口：固定来源里没有技能专用的日志通道、状态栏指示或"重新加载技能"命令；`console.error` 与设置页列表是仅有的两个入口。[@ref-roo-skills-code-metadata][@ref-roo-skills-ui-handlers]
