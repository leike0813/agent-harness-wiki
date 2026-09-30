---
schema_version: 3
record_kind: production
edition_id: prime-agent-cli-skills-v1
harness_id: prime-agent
topic: skills
title: "Prime Agent CLI 的 Skill 位置、SKILL.md 契约与 Python 技能"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-prime-agent-readme-install, ref-prime-agent-docs-index, ref-prime-agent-skills-locations, ref-prime-agent-code-agentdir, ref-prime-agent-code-configdir, ref-prime-agent-skills-builtin, ref-prime-agent-skills-code-dedup, ref-prime-agent-pm-precedence, ref-prime-agent-pm-auto, ref-prime-agent-settings-resources, ref-prime-agent-pm-overrides, ref-prime-agent-rl-skillmerge]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-prime-agent-skills-code-scan, ref-prime-agent-pm-scan, ref-prime-agent-pm-ancestor, ref-prime-agent-skills-locations, ref-prime-agent-args-flags, ref-prime-agent-rl-skillmerge]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-prime-agent-skills-structure, ref-prime-agent-skills-frontmatter, ref-prime-agent-skills-code-frontmatter, ref-prime-agent-skills-validation, ref-prime-agent-skills-code-load, ref-prime-agent-skills-code-validate, ref-prime-agent-skill-edit, ref-prime-agent-skill-creator, ref-prime-agent-skills-how]
  - section_id: skills-extensions
    surface_ids: [cli]
    source_refs: [ref-prime-agent-skills-python, ref-prime-agent-skills-code-python, ref-prime-agent-skill-websearch-pyproject, ref-prime-agent-rlrt-kernel, ref-prime-agent-settings-resources, ref-prime-agent-skills-locations, ref-prime-agent-pkg-filtering, ref-prime-agent-rlrt-continual, ref-prime-agent-rlm-skills]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-prime-agent-skills-how, ref-prime-agent-skills-validation, ref-prime-agent-skills-commands, ref-prime-agent-settings-resources, ref-prime-agent-skills-python]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-prime-agent-skills-locations, ref-prime-agent-skills-python, ref-prime-agent-rlm-trust, ref-prime-agent-settings-resources, ref-prime-agent-skills-validation, ref-prime-agent-diag-interactive, ref-prime-agent-diag-reload]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-prime-agent-skills-locations, ref-prime-agent-pm-precedence, ref-prime-agent-pm-auto, ref-prime-agent-code-agentdir, ref-prime-agent-code-configdir, ref-prime-agent-skills-builtin]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-prime-agent-skills-locations, ref-prime-agent-skills-code-scan, ref-prime-agent-pm-scan, ref-prime-agent-pm-ancestor, ref-prime-agent-args-flags]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: conflict
        source_refs: [ref-prime-agent-skills-builtin, ref-prime-agent-skills-code-dedup, ref-prime-agent-pm-precedence, ref-prime-agent-settings-resources, ref-prime-agent-pm-overrides, ref-prime-agent-rl-skillmerge]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-prime-agent-skills-frontmatter, ref-prime-agent-skills-code-frontmatter, ref-prime-agent-skills-code-validate, ref-prime-agent-skills-code-load, ref-prime-agent-skills-validation, ref-prime-agent-skills-structure]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extensions
        status: answered
        source_refs: [ref-prime-agent-skills-python, ref-prime-agent-skills-code-python, ref-prime-agent-skill-websearch-pyproject, ref-prime-agent-settings-resources, ref-prime-agent-pkg-filtering, ref-prime-agent-rlrt-kernel]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-prime-agent-skills-how, ref-prime-agent-skills-python, ref-prime-agent-skills-commands]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-prime-agent-skills-commands, ref-prime-agent-settings-resources, ref-prime-agent-skills-validation, ref-prime-agent-skills-how]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-prime-agent-skills-locations, ref-prime-agent-skills-python, ref-prime-agent-rlm-trust, ref-prime-agent-settings-resources]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-prime-agent-diag-interactive, ref-prime-agent-diag-reload, ref-prime-agent-skills-validation, ref-prime-agent-skills-python]
---

## 固定来源与加载位置 {#skills-roots}

本章依据官方仓库提交 `e2fb7bfa1372552d81c33e9b3261d6a9cf82d30f` 的 `README.md`、`packages/coding-agent/docs/` 官方文档、`packages/coding-agent/skills/` 内置技能与 `packages/coding-agent/src/core/{skills,package-manager,resource-loader}.ts` 实现。产品通过 `https://app.primeintellect.ai/prime-agent/install.sh` 发布的版本化产物安装，源码树里的 npm workspace 名不是公开安装路径；因此本章是 source_only 的来源级知识，没有软件版本映射。[@ref-prime-agent-readme-install][@ref-prime-agent-docs-index]

Skill 是从以下位置发现的（文档顺序即优先级说明顺序）[@ref-prime-agent-skills-locations]：

| 位置 | 作用域 |
| :-- | :-- |
| `~/.prime/agent/skills/` | 全局；根目录直接 `.md` 文件按单个 Skill 发现 |
| `~/.agents/skills/` | 全局兼容目录；根目录 `.md` 被忽略 |
| `.prime/agent/skills/` | 项目；根目录直接 `.md` 文件按单个 Skill 发现 |
| `.agents/skills/` | 项目，向上遍历到 git 仓库根目录，非仓库时为文件系统根 |
| 包内 `skills/` 目录或 `package.json` 的 `pi.skills` | 已安装包提供的资源 |
| 设置 `skills` 数组 | 见下节的过滤规则 |
| `--skill PATH` | 命令行，可重复 |
| 内置 `skills/`（随包发布） | 最低优先级 |

用户目录由 `getAgentDir()` 决定，默认 `~/.prime/agent`，可用 `PRIME_AGENT_CODING_AGENT_DIR` 覆盖；项目目录由 `CONFIG_DIR_NAME`（`package.json` 的 `piConfig.configDir`，默认 `.prime/agent`）拼在 cwd 上。[@ref-prime-agent-code-agentdir][@ref-prime-agent-code-configdir]

同名冲突的规则是**先到者胜**，后到者只产生一条 collision 诊断：`loadSkills` 以 Skill 名做键，同一个真实路径只计一次，冲突记录包含获胜与落败路径；内置 Skill 优先级最低，用户、项目、包或 `--skill` 的同名技能会覆盖它。[@ref-prime-agent-skills-builtin][@ref-prime-agent-skills-code-dedup]

解析顺序在实现里是固定的三级：项目自动目录 → 用户自动目录 → 内置目录，累加器按路径先去重，注释写明“Project resources win collisions with global resources”。[@ref-prime-agent-pm-precedence][@ref-prime-agent-pm-auto]

**来源分歧**：文档《Resources》与《Locations》把设置里的 `skills` 数组描述为“文件或目录”加载位置，并给出 `{"skills": ["~/.claude/skills", "~/.codex/skills"]}` 的例子；在同一提交的实现里，设置 `skills` 只被当作覆盖模式应用在已发现的条目上（`!pattern` 排除、`+path` 强制包含、`-path` 强制排除，裸模式在自动目录路径上被忽略），`--skill` 才是真正追加路径的入口。按该提交的代码，文档里那种裸路径写法不会扫描新目录。[@ref-prime-agent-settings-resources][@ref-prime-agent-pm-overrides][@ref-prime-agent-rl-skillmerge]

## 目录扫描与开关 {#skills-discovery}

启动时（以及每次 `/reload`）扫描，规则可从实现直接核对[@ref-prime-agent-skills-code-scan][@ref-prime-agent-pm-scan]：

- 目录里只要有 `SKILL.md`，该目录就是技能根，**不再向下递归**；
- 否则在扫描根收集直接子级 `.md`（仅 `pi` 模式的 `~/.prime/agent/skills` 与项目 `.prime/agent/skills`），以及继续递归寻找子目录里的 `SKILL.md`；
- `.agents/skills` 模式不收集根目录 `.md`；
- 隐藏目录与 `node_modules` 被跳过；符号链接条目用 `statSync` 解析后判定；
- 读取 `.gitignore`、`.ignore`、`.fdignore` 三条忽略规则（去掉前导 `/`，保留 `!` 取反，跳过 `#` 注释）。

`.agents/skills` 的祖先遍历在 `collectAncestorAgentsSkillDirs`：从 cwd 向上，遇 git 仓库根停止，否则到文件系统根；`~/.agents/skills` 会从祖先列表中剔除以免重复。[@ref-prime-agent-pm-ancestor]

开关与增补入口[@ref-prime-agent-skills-locations][@ref-prime-agent-args-flags][@ref-prime-agent-rl-skillmerge]：

- `--no-skills` / `-ns` 关闭发现，但显式 `--skill PATH` 仍加载（文档明确“additive even with `--no-skills`”）；
- `--skill PATH` 可重复；不存在的路径产生 `skill path does not exist` 诊断，非 `.md` 文件产生 `skill path is not a markdown file`；
- 加载器把路径列表拼成 `[...cliEnabledSkills, ...additionalSkillPaths, ...enabledSkills]`，`--no-skills` 时只保留命令行与显式路径。

## SKILL.md 契约与校验 {#skills-format}

一个 Skill 是一个目录，必须包含 `SKILL.md`，其余目录（`scripts/`、`references/`、`assets/`）结构自由；正文用相对路径引用资源。[@ref-prime-agent-skills-structure]

frontmatter 字段（`---` 之间的 YAML）[@ref-prime-agent-skills-frontmatter][@ref-prime-agent-skills-code-frontmatter]：

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | 最长 64 字符；仅小写字母、数字、连字符；不得首尾连字符或连续连字符；必须与父目录同名 |
| `description` | 是 | 最长 1024 字符；决定模型何时加载该 Skill |
| `license` | 否 | 许可证名或指向随附文件 |
| `compatibility` | 否 | 最长 500 字符的环境要求 |
| `allowed-tools` | 否 | 空格分隔的预批准工具列表（实验性） |
| `disable-model-invocation` | 否 | 为 `true` 时从启动技能列表中隐藏，只能用 `/skill:name` 调用 |

未知字段被忽略。校验结果多数是警告且技能仍加载：名字与父目录不一致、超过 64 字符或含非法字符、首尾或连续连字符、描述超过 1024 字符。**唯一硬失败**是描述缺失或为空——该文件的 `loadSkillFromFile` 直接返回 `skill: null`，技能不加载。[@ref-prime-agent-skills-validation][@ref-prime-agent-skills-code-load][@ref-prime-agent-skills-code-validate]

最小可用写法（依据内置 `edit` 技能的真实 frontmatter）[@ref-prime-agent-skill-edit]：

```markdown
---
name: edit
description: Replace an exact, unique string in an existing file. Use for targeted single-occurrence edits.
---

# Edit

调用方式写在正文里，模型按需读取全文。
```

产品自带 `skill-creator` 技能，用自然语言或 `/skill:skill-creator <需求>` 生成 `SKILL.md`、包结构与校验步骤，因此普通用户不必手写 frontmatter。[@ref-prime-agent-skill-creator][@ref-prime-agent-skills-how]

## Python 技能与设置层扩展 {#skills-extensions}

Python-backed 技能是 markdown 技能的**超集**：同样的 `SKILL.md` 与调用行为，外加一个装进持久 Python 内核的 Python 包。[@ref-prime-agent-skills-python]

识别规则（实现 `detectPythonSkill` 逐条检查）[@ref-prime-agent-skills-python][@ref-prime-agent-skills-code-python]：

1. `SKILL.md` 仍必须存在；
2. 目录内存在 `pyproject.toml`，标记为 Python 技能；
3. 导入名 = 技能名把 `-` 换成 `_`，必须匹配 `^[A-Za-z_][A-Za-z0-9_]*$`，否则告警并放弃；
4. `src/导入名目录/__init__.py` 必须存在，缺失时告警并放弃。

包布局与可选 CLI（真实内置 `websearch` 技能）[@ref-prime-agent-skills-python][@ref-prime-agent-skill-websearch-pyproject]：

```toml
[project]
name = "prime-agent-skill-websearch"
version = "0.1.0"
dependencies = ["httpx>=0.27,<1", "prime-agent-runtime"]

[project.scripts]
websearch = "rlm.skill:cli"
```

安装与内核行为：Python 技能在内核初始化时以 editable 方式装进内核 venv，默认 `~/.prime/agent/kernel-venv`（`PRIME_AGENT_KERNEL_VENV` 可改）；`pyproject.toml` 变化会触发 venv 重建。若设置了 `PRIME_AGENT_KERNEL_PYTHON`，产品不再安装包，该解释器必须已带当前 `prime-agent-runtime` 与默认运行库，否则缺失的 Python 技能导入被禁用并告警，调用时抛 `RuntimeError`。内核本身在第一次使用 Python 工具时惰性创建。[@ref-prime-agent-skills-python][@ref-prime-agent-rlrt-kernel]

设置层的相关键（`settings.json`）[@ref-prime-agent-settings-resources]：

| 键 | 默认 | 作用 |
| :-- | :-- | :-- |
| `skills` | `[]` | 对已发现技能的 include/`!exclude`/`+force-include`/`-force-exclude` 模式 |
| `enableSkillCommands` | `true` | 是否注册 `/skill:name` 命令 |
| `enableBuiltinSkills` | `true` | 是否加载随包内置技能 |
| `bundledSkills.websearch` | `true` | 单独关闭内置 `websearch` |
| `packages` | `[]` | 从中加载资源的 npm/git 包；对象形式可按 `skills`/`extensions`/`prompts`/`themes` 过滤 |

包贡献技能的两种方式是包内 `skills/` 目录，或 `package.json` 的 `pi.skills` 条目；包的对象形式过滤键与设置数组的 `+`/`-`/`!` 语义一致。[@ref-prime-agent-skills-locations][@ref-prime-agent-pkg-filtering]

另外存在“已安装技能”与“持续性 harness 技能条目”的区分：前者是磁盘上的真实包，后者是 `/refine` 写入的、描述可复用 Python 调用的说明条目，存在 `harness/harness_state.json`，它不替代打包新功能。[@ref-prime-agent-rlrt-continual][@ref-prime-agent-rlm-skills]

## 加载与调用 {#skills-loading-invocation}

处理链（官方《How Skills Work》）[@ref-prime-agent-skills-how]：

1. 启动时扫描技能位置，只抽取名称、描述、类型与文件位置；
2. 系统提示里以约定的 XML 结构列出可见技能；
3. 任务匹配时，模型用 `ipython` 工具读取完整 `SKILL.md`（文档明确“models don't always do this”，可用提示词或 `/skill:name` 强制）；
4. 模型按正文指令执行，用相对路径引用脚本与资源。

这就是渐进式披露：常驻上下文的只有描述，全文按需加载。`disable-model-invocation: true` 的技能不会出现在启动列表，但仍可 `/skill:name` 显式调用。[@ref-prime-agent-skills-how][@ref-prime-agent-skills-validation]

调用入口[@ref-prime-agent-skills-commands]：

```bash
/skill:brave-search           # 加载并执行该 Skill
/skill:pdf-tools extract      # 带参数，参数以 User: 参数 的形式追加到技能内容
```

技能命令是否注册由 `enableSkillCommands` 控制（默认 `true`），可在 `/settings` 或 `settings.json` 中改。Python 技能还能在内核里按导入名直接调用（`await web_search("query")`），声明了 console script 时也能从 shell 单元格用 `!web_search ...` 调用。[@ref-prime-agent-settings-resources][@ref-prime-agent-skills-commands][@ref-prime-agent-skills-python]

## 条件与诊断 {#skills-conditions-diagnostics}

影响生效的条件[@ref-prime-agent-skills-locations][@ref-prime-agent-skills-python][@ref-prime-agent-rlm-trust]：

- `--no-skills` 关闭自动发现，但 `--skill` 路径仍加载；
- `enableBuiltinSkills: false` 或 `/settings` 里的 “Built-in skills” 开关关闭全部内置技能，`bundledSkills.websearch: false` 只关 `websearch`；要单独关某个没有专用键的内置技能，用 `{"skills": ["-prime-intellect/SKILL.md"]}` 强制排除；[@ref-prime-agent-settings-resources]
- 为了兼容其它 harness，可把 Claude Code / Codex 的目录加进设置（文档写法，见上文来源分歧）；
- 信任边界：技能可以指示模型做任何事，也可携带模型会执行的代码；内核以 worker 的操作系统权限运行模型生成的 Python 与 `bash()`，它不是安全沙箱，第三方技能按可信代码对待。

诊断与重载[@ref-prime-agent-skills-validation][@ref-prime-agent-diag-interactive][@ref-prime-agent-diag-reload]：

- 启动时或在 `/reload` 后，交互模式会按 `[Skill]`/`[Prompt]`/`[Extension]`/`[Theme]` 头打印资源诊断，冲突按名字分组并标出被跳过（`(skipped)`）的落败路径；`--verbose` 强制打印已加载资源清单；
- 校验警告（名字不匹配父目录等）只警告不阻断；描述缺失会静默不加载，这是最常见“文件写了却没生效”的原因；
- `/reload` 重新发现新增或改动的技能，并重跑 `session_shutdown` → `session_start(reason: "reload")`；新增 Python 技能需要重开一个 Prime Agent 会话，让内核完成安装与导入；
- 加载错误（路径不存在、不是 markdown 文件）以 `Skill path does not exist` 一类诊断出现在设置/资源诊断里。

**缺口**：固定来源没有给出技能目录的扫描深度上限、单个技能包体积限制，也没有专门的 `/skills` 查询命令（可用的只有上面的资源清单与诊断输出）；这些点没有可引用证据，保持未验证。[@ref-prime-agent-diag-interactive]
