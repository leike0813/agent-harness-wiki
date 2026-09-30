---
schema_version: 3
record_kind: production
edition_id: crush-cli-skills-v1
harness_id: crush
topic: skills
title: "Crush 的 Agent Skills：目录、格式、发现、调用与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-crush-readme-skills, ref-crush-configdoc-option]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-crush-code-skill-dirs, ref-crush-readme-skills, ref-crush-configdoc-option, ref-crush-code-option-specs, ref-crush-code-config-defaults, ref-crush-code-skill-discovery, ref-crush-code-skill-builtin-fs, ref-crush-skilldoc-config, ref-crush-skilldoc-hooks]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-crush-code-skill-discovery, ref-crush-code-skill-discover, ref-crush-code-skill-manager]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-crush-code-skill-frontmatter, ref-crush-code-skill-struct, ref-crush-code-skill-validate, ref-crush-code-skill-discover, ref-crush-readme-skills, ref-crush-skilldoc-config, ref-crush-code-skill-read]
  - section_id: skills-extensions
    surface_ids: [cli]
    source_refs: [ref-crush-code-skill-struct, ref-crush-readme-skills-user, ref-crush-configdoc-option, ref-crush-code-option-specs, ref-crush-code-skill-dedupe, ref-crush-code-skill-prompt-xml, ref-crush-code-skill-builtin-fs, ref-crush-readme-disable-skills, ref-crush-schema-root]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-crush-code-skill-dedupe, ref-crush-code-skill-discovery, ref-crush-code-prompt-skills, ref-crush-code-skill-prompt-xml, ref-crush-code-view-mark, ref-crush-code-skill-read, ref-crush-code-skill-tracker, ref-crush-code-skill-log, ref-crush-code-skill-command-load, ref-crush-code-skill-command-run, ref-crush-code-skill-commands, ref-crush-code-command-sources, ref-crush-readme-skills-user, ref-crush-code-info-skills]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-crush-code-skill-discovery, ref-crush-code-skill-dirs, ref-crush-code-skill-prompt-xml, ref-crush-code-view-skill, ref-crush-code-skill-log, ref-crush-code-info-skills, ref-crush-code-skill-catalog, ref-crush-code-skill-label]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-crush-code-skill-dirs, ref-crush-readme-skills, ref-crush-code-option-specs, ref-crush-code-config-defaults, ref-crush-code-skill-discovery]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-crush-code-skill-discovery, ref-crush-code-skill-discover, ref-crush-code-skill-manager]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: partial
        source_refs: [ref-crush-code-skill-dedupe, ref-crush-code-skill-discovery, ref-crush-code-prompt-skills]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-crush-code-skill-frontmatter, ref-crush-code-skill-struct, ref-crush-code-skill-validate]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-extensions
        status: answered
        source_refs: [ref-crush-code-skill-struct, ref-crush-readme-skills-user, ref-crush-configdoc-option, ref-crush-code-option-specs, ref-crush-code-skill-prompt-xml, ref-crush-code-skill-builtin-fs, ref-crush-readme-disable-skills, ref-crush-schema-root]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-crush-code-skill-prompt-xml, ref-crush-code-prompt-skills, ref-crush-code-skill-tracker, ref-crush-code-skill-read, ref-crush-code-info-skills]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-crush-code-skill-commands, ref-crush-code-skill-command-load, ref-crush-code-skill-command-run, ref-crush-readme-skills-user, ref-crush-code-skill-prompt-xml]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-crush-code-skill-discovery, ref-crush-code-skill-dirs, ref-crush-code-skill-prompt-xml, ref-crush-code-view-skill, ref-crush-code-info-skills]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-crush-code-skill-log, ref-crush-code-info-skills, ref-crush-code-skill-catalog, ref-crush-code-skill-label]
---

## 固定来源与界面 {#skills-scope}

本章依据官方仓库 `charmbracelet/crush` 固定 commit `69c65c3d5be0a388d62047feb55d88b9bad7f1b2` 的检出：README 的 Agent Skills 与 User-Invocable Skills 两节、`docs/config/README.md` 的 option 命令参考、内置技能 `internal/skills/builtin/*/SKILL.md`，以及 `internal/skills/`、`internal/agent/prompt/`、`internal/commands/`、`internal/agent/tools/view.go` 的实现。界面口径为 catalog 唯一登记的 `cli`。[@ref-crush-readme-skills][@ref-crush-configdoc-option]

Crush 实现的是 Agent Skills 开放标准：一个技能就是包含 `SKILL.md` 的目录 [@ref-crush-readme-skills]。除此之外没有第二套技能格式。

## 技能来源目录与作用域 {#skills-roots}

全局（用户级）默认目录由 `GlobalSkillsDirs` 计算，README 与代码一致 [@ref-crush-code-skill-dirs][@ref-crush-readme-skills]：

| 位置 | 说明 |
| :-- | :-- |
| `$CRUSH_SKILLS_DIR` | 设置后**只**返回该目录，其他默认目录全部不参与 |
| `$XDG_CONFIG_HOME/crush/skills`（默认 `~/.config/crush/skills`） | Crush 自有全局技能目录 |
| `$XDG_CONFIG_HOME/agents/skills` | 跨工具的 agents 约定目录 |
| `~/.agents/skills` | Agent Skills 规范目录 |
| `~/.claude/skills` | 兼容 Claude Code 的技能目录 |
| `%LOCALAPPDATA%\crush\skills`、`%LOCALAPPDATA%\agents\skills` | 仅 Windows 额外扫描 |

项目级目录由 `ProjectSkillsDir` 计算，先工作目录再 git 工作树根，按此顺序追加到 `options.skills_paths`，因此子目录里的技能优先于同名的 monorepo 级技能 [@ref-crush-code-skill-dirs]：

- 工作目录下：`.agents/skills`、`.crush/skills`、`.claude/skills`、`.cursor/skills`
- git 工作树根下同样四个子目录（工作目录正是仓库根时不重复添加）

用户还可以在配置里追加任意目录：`option skill-path ./skills`（对应 `options.skills_paths`，每次调用追加一个值）[@ref-crush-configdoc-option][@ref-crush-code-option-specs]。`setDefaults` 把默认全局目录与项目目录并入 `options.skills_paths`，因此模型看到的技能列表来自“默认目录 + 用户追加目录”的并集 [@ref-crush-code-config-defaults][@ref-crush-code-skill-discovery]。

内置技能不来自磁盘：三个内置技能（`crush-config`、`crush-hooks`、`jq`）嵌在二进制里，路径写成 `crush://skills/` 前缀加技能目录名再拼 `SKILL.md` 的形式，并带 `Builtin` 标记 [@ref-crush-code-skill-builtin-fs][@ref-crush-skilldoc-config][@ref-crush-skilldoc-hooks]。

缺口：未发现任何环境变量可以改项目级相对目录（`.agents/skills` 等是硬编码列表），`CRUSH_SKILLS_DIR` 也只影响全局列表 [@ref-crush-code-skill-dirs]。

## 发现时机与扫描范围 {#skills-discovery}

发现入口是 `DiscoverFromConfig`：先走内嵌文件系统取内置技能，再对 `options.skills_paths` 解析后的每个目录调用 `DiscoverWithStates`，最后去重与过滤 [@ref-crush-code-skill-discovery][@ref-crush-code-skill-discovery]。

扫描细节（`fastwalk`，`Follow: true`）[@ref-crush-code-skill-discover]：

- 只要文件名恰为 `SKILL.md` 就解析；目录名与深度没有显式上限，会递归到任意深度。
- 会跟随符号链接的**目录**（这是相对 `filepath.WalkDir` 的刻意选择），并用“绝对路径已访问”集合去重，避免同一文件被解析两次。
- 走目录出错只记 warning、写一条错误状态，不中断其他目录的扫描；路径不存在也不报错。
- 每个文件的解析与校验结果都会记成一条状态（成功或失败），供诊断使用。
- 遍历顺序不确定，所以结果最后按路径、再按名称排序，保证输出稳定。

时机：发现发生在启动/工作区创建阶段（本地模式在 `cmd/root.go` 启动流程里，服务模式在 backend 创建工作区时），每个工作区各有一个 `skills.Manager`，互不共享状态 [@ref-crush-code-skill-discovery][@ref-crush-code-skill-manager]。没有文件监听：运行期改盘上的技能需要重启动 Crush 才会被重新扫描。[@ref-crush-code-skill-discovery]

## SKILL.md 的格式与校验 {#skills-format}

`ParseContent` 先把 CRLF 归一化成 LF、去掉 UTF-8 BOM，然后要求内容以一行 `---` 开头、以另一行 `---` 结束；没有 frontmatter 或 frontmatter 未闭合都会直接报错 [@ref-crush-code-skill-frontmatter]。frontmatter 用 YAML 反序列化到下面的结构，剩余正文整体作为 `Instructions`（首尾空白被裁掉）[@ref-crush-code-skill-struct]：

| YAML 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | 技能标识；只允许字母数字与单个连字符分隔，必须以字母数字开头结尾，不得有连续连字符，最长 64 字符，且必须与所在目录名大小写无关地相等 |
| `description` | 是 | 说明用途，最长 1024 字符 |
| `compatibility` | 否 | 最长 500 字符 |
| `license` | 否 | 原样解析，宿主不做处理 |
| `metadata` | 否 | `map[string]string`，任意键值 |
| `user-invocable` | 否 | 见下文调用一节 |
| `disable-model-invocation` | 否 | 见下文调用一节 |

校验规则集中在 `Validate`：`name` 与 `description` 缺失即失败，目录名不匹配会失败（例如目录 `my-skill/` 里写 `name: other`）[@ref-crush-code-skill-validate]。校验失败或解析失败的技能不会进入可用列表，只留下一条错误状态。[@ref-crush-code-skill-discover]

最小可用技能（字段与示例依据 README 与内置技能文件的同构写法）[@ref-crush-readme-skills][@ref-crush-skilldoc-config]：

```markdown
---
name: my-hot-skill
description: 说明这个技能做什么、什么时候用。
user-invocable: true
---

正文指令，按 Markdown 写给模型。
```

正文之外的文件（脚本、参考资料、模板）Crush 没有做任何约定或预加载：`SKILL.md` 之外的内容都只是普通文件，模型需要时用 `view` 或 `bash` 自己去读 [@ref-crush-code-skill-read][@ref-crush-code-skill-discover]。

## 宿主识别的扩展字段与配置项 {#skills-extensions}

| 项 | 位置 | 默认 | 作用 |
| :-- | :-- | :-- | :-- |
| `user-invocable` | `SKILL.md` frontmatter | false | 设为 true 时技能会出现在命令面板（`ctrl+p`）里，名称前缀 `user:`（全局目录）或 `project:`（项目目录） |
| `disable-model-invocation` | `SKILL.md` frontmatter | false | 设为 true 时该技能不进系统提示里的可用技能列表，但保留用户显式调用 |
| `license` / `compatibility` / `metadata` | `SKILL.md` frontmatter | 无 | 被解析并保留在技能记录里；固定来源没有说明宿主对其行为有任何影响 |
| `options.skills_paths` / `option skill-path` | 配置 | 默认目录集合 | 追加技能目录，可重复 |
| `options.disabled_skills` / `option disable-skill` | 配置 | 空 | 按名称隐藏技能（含内置技能），`option disable-skill crush-config` 即可禁用内置配置技能 |
| 内置技能标记 | 二进制内嵌 | 无 | 内置技能在提示与目录里带 `builtin` 类型标记，路径前缀为 `crush://skills/` |

依据：字段名与解析见实现与 README 的 User-Invocable Skills 一节 [@ref-crush-code-skill-struct][@ref-crush-readme-skills-user]；配置键见 option 参考 [@ref-crush-configdoc-option][@ref-crush-code-option-specs]；禁用与提示标记见过滤器与提示生成 [@ref-crush-code-skill-dedupe][@ref-crush-code-skill-prompt-xml]；内置技能来源见内嵌文件系统 [@ref-crush-code-skill-builtin-fs]。

`disable-skill` 同时作用于内置技能和磁盘技能，README 明确说明“被禁用的技能对被隐藏，包含内置技能” [@ref-crush-readme-disable-skills]。配置里没有“技能优先级”或“技能开关组”之类的其它键，`schema.json` 的 `options` 定义里与技能相关的只有 `skills_paths` 与 `disabled_skills`。[@ref-crush-schema-root]

## 名称描述与正文何时进入上下文，以及怎样调用 {#skills-loading-invocation}

**发现与去重**：内置技能先入列，磁盘技能追加在后，然后 `Deduplicate` 按名称保留**最后一次出现**，因此同名时用户技能覆盖内置技能；接着 `Filter` 按 `disabled_skills` 移除 [@ref-crush-code-skill-dedupe][@ref-crush-code-skill-discovery]。系统提示构建时在“用户技能覆盖内置技能”的情况下另记一条 warning，口径一致 [@ref-crush-code-prompt-skills]。

**同名消解的实际规则**（比“谁覆盖谁”的直觉更精确）[@ref-crush-code-skill-dedupe][@ref-crush-code-skill-discovery][@ref-crush-code-prompt-skills]：

- 内置技能先入列、磁盘技能随后追加，去重按名称保留**最后一次出现**，所以同名时用户技能覆盖内置技能，系统提示构建时也会为这种情况记一条 warning。
- 磁盘技能之间的顺序由发现函数决定：收集完成后按路径（目录）做不区分大小写的稳定排序，因此同名用户技能的胜者是**路径字典序最后**的那一个，而不是显式的“项目优先于全局”。
- 这一规则在官方文档里没有说明，固定来源只能给出实现行为，故 `skills.collision` 记为 `partial`：内置 vs 用户有明确结论，用户 vs 用户、多目录并列时只有实现层面的排序结论，没有文档承诺。

**上下文注入**：系统提示里注入的是 `available_skills` 结构，每个技能只给 `name`、`description`、`location`（`SKILL.md` 的完整路径）三项，内置技能多一个 `builtin` 类型标记；`disable-model-invocation` 的技能被跳过。也就是说模型默认只看到名称与描述，看不到正文。[@ref-crush-code-skill-prompt-xml][@ref-crush-code-prompt-skills]

**正文加载**：正文只在两种情况下进入上下文——用户从命令面板显式调用时，把 `name`/`description`/`location` 与整段 `instructions` 包成一条“已加载技能”的消息发给模型；或者模型用 `view` 工具打开技能的 `SKILL.md`（内置技能用 `crush://skills/...` 路径）时读到原文，此时该技能被标记为本次会话已加载。每个会话记录“本轮加载了哪些技能”，供日志与状态查询使用；`view` 打开技能文件时会调用追踪器的标记接口，只有仍处于生效集合里的同名技能才会被记为已加载。[@ref-crush-code-view-mark][@ref-crush-code-skill-prompt-xml][@ref-crush-code-skill-read][@ref-crush-code-skill-tracker][@ref-crush-code-skill-log]

**用户显式调用**：命令面板（`ctrl+p`）里会把 `user-invocable` 的技能当自定义命令加载，标签形式是 `user:` 或 `project:` 前缀加技能名；选中后按技能格式展开成一条消息发送 [@ref-crush-code-skill-command-load][@ref-crush-code-skill-command-run][@ref-crush-code-skill-commands]。这一加载路径与磁盘上的自定义命令（`~/.config/crush/commands`、`~/.crush/commands`、项目数据目录的 `commands/`）共用同一套命令面板机制 [@ref-crush-code-command-sources]。

**模型自动调用**：技能描述出现在系统提示中，由模型自行决定是否读取正文；`disable-model-invocation: true` 的作用正是不让描述进入这份列表 [@ref-crush-code-skill-prompt-xml][@ref-crush-readme-skills-user]。固定来源没有给出模型自动选择技能的阈值、排序或“同时激活数量”上限。

**状态标记**：`crush_info` 的 `[skills]` 小节会给出 `loaded_this_session = 已加载/生效总数`，并逐条列出技能名及其 `builtin|user` 来源与 `loaded|unloaded|disabled` 状态 [@ref-crush-code-info-skills]。

## 生效条件与诊断 {#skills-conditions-diagnostics}

生效条件 [@ref-crush-code-skill-discovery][@ref-crush-code-skill-dirs][@ref-crush-code-skill-prompt-xml]：

- 目录必须已进入 `options.skills_paths`（默认全局与项目目录由 `setDefaults` 并入）。
- `SKILL.md` 必须解析成功并通过名称、描述、目录名一致性校验，否则只留下错误状态。
- 名称必须不在 `options.disabled_skills` 中。
- 用户在命令面板里能否看到，取决于 `user-invocable`；模型能否看到，取决于技能是否设了 `disable-model-invocation`。
- 技能目录下的文件可读且不受“工作目录外需要授权”的限制：`view` 对技能路径做了豁免，因此读技能文件不会弹权限询问 [@ref-crush-code-skill-dirs][@ref-crush-code-view-skill]。除“技能目录集合”这一条件外，固定来源没有提到信任、市场、组织策略等其它门槛。

诊断入口 [@ref-crush-code-skill-log][@ref-crush-code-info-skills][@ref-crush-code-skill-catalog][@ref-crush-code-skill-label]：

- 日志：发现完成时打一条 `Skill discovery complete`，含内置/用户技能的成败条数、去重后总数、生效数、禁用数、提示字节数与其估算 token 数、生效技能名列表；每个技能的加载/校验失败另有 `Failed to parse skill file`、`Skill validation failed` 之类的 warning。
- 状态：`crush_info` 的 `[skills]` 小节列出每个生效技能的来源（`builtin` 还是 `user`）与本会话是否已加载；技能目录接口还会给出 `system:`/`user:`/`project:` 标签与来源类型。
- 观察是否真的读到正文：会话内加载计数会变化，日志里也有按轮的技能使用记录。
- 重载：发现只在启动或工作区创建时执行，改完技能文件需要重启 Crush（本轮没有找到文件监听或热重载入口）[@ref-crush-code-skill-discovery]。

缺口：没有一条独立的 CLI 子命令用于“列出实际发现到的技能及其文件路径”（`crush_info` 是模型工具，日志需要 `--debug` 或按级别抓取）；校验失败的具体错误只落在日志与内部状态里，没有面向用户的汇总界面。另外，技能的权限边界（例如技能内脚本能否自行执行）在固定来源里没有专门约定。[@ref-crush-code-skill-log][@ref-crush-code-info-skills]
