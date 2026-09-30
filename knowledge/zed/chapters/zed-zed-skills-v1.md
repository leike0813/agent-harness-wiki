---
schema_version: 3
record_kind: production
edition_id: zed-zed-skills-v1
harness_id: zed
topic: skills
title: "Zed Agent 的 Skill：来源、发现、冲突、按需加载与信任条件"
sections:
  - section_id: skills-roots
    surface_ids: [zed]
    source_refs: [ref-zed-skills-builtin, ref-zed-skills-global-root, ref-zed-skills-project-root, ref-zed-skills-doc-locations, ref-zed-skills-doc-limits, ref-zed-instructions-names, ref-zed-instructions-select, ref-zed-instructions-user-md, ref-zed-instructions-repo-doc, ref-zed-instructions-worktree-context]
  - section_id: skills-discovery
    surface_ids: [zed]
    source_refs: [ref-zed-skills-trust, ref-zed-skills-discovery, ref-zed-skills-doc-format, ref-zed-skills-file-limits, ref-zed-skills-frontmatter, ref-zed-skills-name-rules]
  - section_id: skills-collision
    surface_ids: [zed]
    source_refs: [ref-zed-skills-overrides, ref-zed-skills-precedence, ref-zed-skills-scope, ref-zed-skills-doc-locations]
  - section_id: skills-extensions
    surface_ids: [zed]
    source_refs: [ref-zed-skills-frontmatter, ref-zed-skills-tool-name, ref-zed-skills-builtin, ref-zed-skills-share-link, ref-zed-skills-doc-format, ref-zed-skills-catalog-budget, ref-zed-skills-doc-limits]
  - section_id: skills-loading-invocation
    surface_ids: [zed]
    source_refs: [ref-zed-skills-catalog-budget, ref-zed-skills-body-read, ref-zed-skills-envelope, ref-zed-skills-tool-name, ref-zed-skills-tool-auth, ref-zed-skills-doc-invocation]
  - section_id: skills-conditions-diagnostics
    surface_ids: [zed]
    source_refs: [ref-zed-skills-trust, ref-zed-skills-doc-limits, ref-zed-skills-migration, ref-zed-skills-doc-manage, ref-zed-skills-name-rules, ref-zed-skills-catalog-budget]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [zed]
        section_id: skills-roots
        status: answered
        source_refs: [ref-zed-skills-global-root, ref-zed-skills-project-root, ref-zed-skills-builtin, ref-zed-skills-doc-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [zed]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-zed-skills-discovery, ref-zed-skills-file-limits, ref-zed-skills-doc-format]
  - question_id: skills.collision
    answers:
      - surface_ids: [zed]
        section_id: skills-collision
        status: answered
        source_refs: [ref-zed-skills-precedence, ref-zed-skills-overrides, ref-zed-skills-scope]
  - question_id: skills.format
    answers:
      - surface_ids: [zed]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-zed-skills-frontmatter, ref-zed-skills-name-rules, ref-zed-skills-doc-format]
  - question_id: skills.extensions
    answers:
      - surface_ids: [zed]
        section_id: skills-extensions
        status: answered
        source_refs: [ref-zed-skills-share-link, ref-zed-skills-catalog-budget, ref-zed-skills-builtin, ref-zed-skills-doc-limits]
  - question_id: skills.loading
    answers:
      - surface_ids: [zed]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-zed-skills-catalog-budget, ref-zed-skills-body-read, ref-zed-skills-envelope]
  - question_id: skills.invocation
    answers:
      - surface_ids: [zed]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-zed-skills-tool-name, ref-zed-skills-tool-auth, ref-zed-skills-doc-invocation]
  - question_id: skills.conditions
    answers:
      - surface_ids: [zed]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-zed-skills-trust, ref-zed-skills-doc-limits, ref-zed-skills-doc-manage]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [zed]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-zed-skills-doc-manage, ref-zed-skills-name-rules, ref-zed-skills-catalog-budget]
---

本章固定来源是官方仓库提交 `5d80b4e784636899e209cae89626c3be4487e14f` 的 `crates/agent_skills/agent_skills.rs`、`crates/agent/src/agent.rs`、`crates/agent/src/tools/skill_tool.rs`、`crates/prompt_store/src/prompts.rs`、`crates/agent_settings/src/user_agents_md.rs`，以及官方文档站的 `docs/ai/skills.md` 快照。文档快照不携带适用软件版本号，本章按来源级知识阅读；涉及默认值的结论只以源码常量为准。

## Skill 的三个来源与相邻的指令文件 {#skills-roots}

Skill 是「一个目录 + 目录里的 `SKILL.md`」。Zed Agent 从三个来源装载：

| 来源 | 位置 | 说明 |
| :-- | :-- | :-- |
| 内置 | 编译进二进制（合成路径 `built-in` 下的 `create-skill/SKILL.md`） | 只有 `create-skill` 一个，优先级最低 [@ref-zed-skills-builtin] |
| 全局 | `~/.agents/skills/` | 由 `paths::home_dir().join(".agents").join("skills")` 推出 [@ref-zed-skills-global-root] |
| 项目 | worktree 根下的 `.agents/skills/` | 相对路径常量 `.agents/skills` [@ref-zed-skills-project-root] |

官方文档给出同样的两个用户可见目录，并说明 Windows 上全局目录写作 `%USERPROFILE%\.agents\skills`；文档另有一张「Scope / Path / When it applies」表把全局描述为「Every project」、项目级描述为「Only the current project」。[@ref-zed-skills-doc-locations]

这三个来源只覆盖 Zed Agent。文档明确 External Agents 与 Terminal Threads 有各自的 skill/指令体系，需要在对应 CLI 里配置。[@ref-zed-skills-doc-limits]

同一套加载链里还有一类**不是 Skill** 的东西：always-on 指令文件。项目侧按固定顺序取第一个命中的文件，顺序是 `.rules`、`.cursorrules`、`.windsurfrules`、`.clinerules`、`.github/copilot-instructions.md`、`AGENT.md`、`AGENTS.md`、`CLAUDE.md`、`GEMINI.md`。[@ref-zed-instructions-names] 选择逻辑在 `NativeAgent::load_worktree_rules_file`：按 `RULES_FILE_REL_PATHS` 顺序找第一个存在于 worktree 里的**文件**（目录形式的 `.clinerules` 不支持），读到 buffer 后整份文本进入系统提示。[@ref-zed-instructions-select] 用户级 `AGENTS.md` 位于 config 目录（Linux/macOS 为 `~/.config/zed/AGENTS.md`），由后台 watcher 读取并挂在 `UserAgentsMd` 全局上，空文件等同不存在。[@ref-zed-instructions-user-md][@ref-zed-instructions-repo-doc] 系统提示里个人 `AGENTS.md` 渲染在项目指令之前，因此项目指令可以覆盖个人指令。[@ref-zed-instructions-worktree-context]

## 发现时机、目录深度与 `SKILL.md` 解析 {#skills-discovery}

发现发生在构建项目上下文时：`build_project_context` 并行发起全局目录扫描与每个**已信任** worktree 的项目扫描，扫完才生成系统提示。[@ref-zed-skills-trust] 全局目录走 `fs.read_dir`，每个条目先看 `metadata.is_dir`，是目录再检查 子目录里的 `SKILL.md` 是否存在且是文件；扫描并发上限是常量 `SKILL_IO_CONCURRENCY = 16`。[@ref-zed-skills-discovery] 项目侧不直接读盘，而是展开 worktree 的 `.agents`、`.agents/skills` 与每个 skill 子目录条目后，从 worktree 快照里取 skills 根下每个一级子目录里的 `SKILL.md`。[@ref-zed-skills-discovery]

两个来源都**只认一层**：skill 必须是 skills 根目录的直属子目录，`~/.agents/skills/group/my-skill/` 不会被发现。[@ref-zed-skills-discovery][@ref-zed-skills-doc-format] 文件名固定为常量 `SKILL_FILE_NAME = "SKILL.md"`；单个文件超过 `MAX_SKILL_FILE_SIZE = 100KB` 时在读盘前就被拒绝。[@ref-zed-skills-file-limits]

`SKILL.md` 的解析规则（`parse_skill_frontmatter`）：文件必须以 `---` 开头，其后是 YAML frontmatter，闭合 `---` 必须独占一行；解析器会依次尝试每个候选闭合行，用第一个能反序列化成 `SkillMetadata` 的结果切出正文，正文在加载阶段被丢弃，调用时才重新读取。[@ref-zed-skills-frontmatter] 字段如下：

| 字段 | 必需 | 规则 |
| :-- | :-- | :-- |
| `name` | 是 | 非空；≤64 字节；只允许小写字母、数字、`-`；不能以 `-` 开头或结尾（`MAX_SKILL_NAME_LEN = 64`）[@ref-zed-skills-name-rules] |
| `description` | 是 | 非空；超过 1024 字符只产生 `DescriptionTooLong` 警告，skill 仍然加载 [@ref-zed-skills-frontmatter] |
| `disable-model-invocation` | 否 | 默认 `false`；为 `true` 时该 skill 从模型目录中隐藏 [@ref-zed-skills-frontmatter] |

校验失败（缺 frontmatter、缺字段、name 非法、文件超限）会变成 `SkillLoadError`，随项目状态一起进入 UI 的加载问题列表，而不是静默丢弃。[@ref-zed-skills-name-rules] 文档给出的最小示例与上述字段一致（`name`/`description` 必需，`disable-model-invocation` 可选）。[@ref-zed-skills-doc-format]

```markdown
---
name: my-skill
description: What this skill does and when to use it.
---

## Instructions

Step-by-step instructions for the agent...
```

## 同名冲突与覆盖顺序 {#skills-collision}

加载阶段**不去重**：`combine_skills` 把内置、全局、项目结果依次拼成一个列表，同名项全部保留，只为同一次加载打印冲突警告，因为斜杠命令补全需要展示每个来源的版本。[@ref-zed-skills-overrides] 真正决定模型看到哪一个是 `apply_skill_overrides`：它按顺序扫描，遇到同名项时用 `SkillSource::precedence()` 比较，取值更大者替换已有项。[@ref-zed-skills-overrides] 优先级常量为 `BuiltIn` 为 0、`Global` 为 1、`ProjectLocal` 为 2，即项目覆盖全局、全局覆盖内置；两个同为项目级（不同 worktree）的优先级相等，保留先出现的一个。[@ref-zed-skills-precedence]

这个「至多一个」的投影被用在所有模型交互面上：系统提示目录、`skill` 工具的名字解析、斜杠命令调用。[@ref-zed-skills-overrides] 补全弹窗故意不走这条路径，所以同一个名字可能同时出现在弹窗里，用来源标签区分——全局显示为 `global`、项目级显示 worktree 根目录名、内置显示 `built-in`。[@ref-zed-skills-scope]

斜杠命令的作用域前缀也由来源决定：全局与内置用空前缀（插入文本是 `/:name`），项目级用 worktree 根目录名（`/` 加 worktree 根目录名再加 `:name`）；手写 `/global:name` 不算全局别名，而是去找名为 `global` 的 worktree 的项目 skill。[@ref-zed-skills-scope] 文档从用户角度描述同一条规则：「如果全局与项目级 skill 同名，项目级优先」。[@ref-zed-skills-doc-locations]

## Zed 专有字段、内置 skill 与共享链接 {#skills-extensions}

除通用 frontmatter 外，Zed 特有的行为有四处：

1. **`disable-model-invocation`**：置 `true` 后 skill 从模型目录隐藏，`skill` 工具按名字查找时会跳过它，但用户仍可用斜杠命令或 `@` 提及调用。[@ref-zed-skills-frontmatter][@ref-zed-skills-tool-name]
2. **内置 `create-skill`**：随二进制编译（`include_str!("builtin/create-skill/SKILL.md")`），正文存在 `embedded_body`，因此调用时不需要磁盘读取，也被视为可信、不触发授权提示。[@ref-zed-skills-builtin]
3. **`zed://skill?data=…` 共享链接**：`encode_skill_share_link` 把整份 `SKILL.md` 用 base64url（无填充）编码进 URL；解码时校验 scheme/host、输入长度不超过 `MAX_SKILL_FILE_SIZE` 且必须是 UTF-8。[@ref-zed-skills-share-link] 文档补充：打开链接只会预填设置窗口里的 Create Skill 页面，用户显式保存前不会写盘。[@ref-zed-skills-doc-format]
4. **目录预算 50KB**：系统提示目录里所有 skill 的 `name + description` 长度累加，超过 `MAX_SKILL_DESCRIPTIONS_SIZE = 50KB` 后**停止继续装填**（不再尝试塞下更小的条目），被丢掉的条目形成一条 UI 问题说明。[@ref-zed-skills-catalog-budget] 文档把这称为「50KB catalog budget」，并说明被丢弃的 skill 会带警告从目录中消失。[@ref-zed-skills-doc-limits]

目录结构约定来自文档：`SKILL.md` 必需，`scripts/`、`references/`、`assets/` 可选；正文建议不超过 500 行，超出部分放进参考文件，由 agent 用 `read_file`、`list_directory` 按需读取。[@ref-zed-skills-doc-format] 文档同时说明目录是**扁平**的、不支持自定义搜索路径与远程注册表，需要指向别处时用符号链接；这一条只在文档层面确认，固定源码快照未包含符号链接处理代码。[@ref-zed-skills-doc-limits]

## 何时进入上下文、怎样被调用 {#skills-loading-invocation}

分两级披露：

- **目录级**：系统提示只带 `SkillSummary { name, description, location }`，其中 `location` 是 `SKILL.md` 的绝对路径，供模型解析相对引用。[@ref-zed-skills-catalog-budget] 目录在构建项目上下文时计算，隐藏项与超出预算的项在此被过滤。[@ref-zed-skills-catalog-budget]
- **正文级**：正文只在真正被物化时读取。`read_skill_body` 读盘后重新解析 frontmatter 并返回闭合 `---` 之后的内容；项目级 skill 走 worktree buffer，全局与内置走 `fs` 或内存正文。[@ref-zed-skills-body-read]

模型侧调用通过 `skill` 工具（`NAME = "skill"`）。工具每次运行**重新**解析当前 skill 集合并按名字查找（过滤掉 `disable-model-invocation` 的项），因此线程创建之后新增的 skill 也能被调用；正文渲染成 `skill_content` 信封（尖括号包裹的标签），里面带 `source`、`worktree`、`directory` 三个字段，所有插值都做 XML 转义，正文里的 该信封的闭合标签 会被中和。[@ref-zed-skills-envelope][@ref-zed-skills-tool-name] 内置 skill 直接跳过授权；其它 skill 在返回正文前走标准工具授权流程，权限上下文里的输入值是该 skill 的 `SKILL.md` 绝对路径。[@ref-zed-skills-tool-auth]

用户侧调用有两条：斜杠命令与 `@skill` 提及，二者都把指令以上下文形式注入，加载后在线程里表现为可点击打开的块。[@ref-zed-skills-doc-invocation] 文档把工具审批描述为与其它工具相同的流程（Allow once / Always for…），内置 skill 不弹提示，并可用工具权限来设定常用 skill 的默认值。[@ref-zed-skills-doc-invocation] 与源码一致的对应写法：

```json
{
  "agent": {
    "tool_permissions": {
      "tools": {
        "skill": {
          "default": "confirm",
          "always_allow": [{ "pattern": "my-skill/SKILL\\.md$" }]
        }
      }
    }
  }
}
```

示例中的键名与取值来自工具权限文档的 `tool_permissions` 结构（`tools` 下每个工具名的 `default`/`always_allow`/`always_deny`/`always_confirm`）与 `skill` 工具的匹配输入说明；`pattern` 是 Rust 正则，默认大小写不敏感。[@ref-zed-skills-tool-auth]

## 生效条件、迁移与诊断 {#skills-conditions-diagnostics}

**信任**：项目级 skill 只从**已信任** worktree 加载。`build_project_context` 对每个 worktree 调 `TrustedWorktrees::can_trust`，未通过的直接跳过，skill 既不会出现在目录里，也不会出现在斜杠命令列表中；信任状态由订阅触发，因此在 Zed 里授予信任后无需重启即可看到新 skill。[@ref-zed-skills-trust] 文档给出同样的用户可见结论，并补充全局 skill 不受工作区信任影响。[@ref-zed-skills-doc-limits]

**Rules 迁移**：Rules 机制被 Skill 与 Instructions 取代后有一次一次性迁移，用 `GlobalKeyValueStore` 里的 `rules_to_skills_migration_done` 标记短路；非 Default Rules 迁为 `~/.agents/skills/` 下以 slug 命名的目录里的 `SKILL.md` 且写入 `disable-model-invocation: true`，Default Rules（以及被用户改过内容的 CommitMessage 内置提示）按 H2 标题追加到全局 `AGENTS.md`，迁移不改写也不删除 LMDB 里的原 Rule 行。[@ref-zed-skills-migration]

**开关**：`disable_ai` 为 `true` 时所有 AI 功能（含 Agent 与 Skill）关闭；它在默认设置文件里的默认值是 `false`。[@ref-zed-skills-doc-manage]

**诊断与重载**：

- 设置窗口的 **AI > Skills** 页按 User / Project 分标签列出 skill，可复制共享链接、打开 `SKILL.md`、删除或新建；Agent Panel 里也能打开 Skills Manager。[@ref-zed-skills-doc-manage]
- 加载错误（frontmatter、名字校验、100KB 上限）与目录预算警告以加载问题形式进入 UI，而不是只写日志。[@ref-zed-skills-name-rules][@ref-zed-skills-catalog-budget]
- 文档声明 live reload：增删改 `SKILL.md` 立即生效，无需重启；但改动 `name` 或 `description` 会使当前会话的 prompt cache 失效。[@ref-zed-skills-doc-limits]

**缺口**：固定来源没有描述扫描时如何处理符号链接、`.gitignore` 或 worktree 忽略规则；项目 skill 扫描依赖 worktree 条目是否存在（`entry_for_path`），但忽略规则的交互未在本快照的文件集中给出。技能目录大小总额（正文本身）也没有限额，只有单文件 100KB 与目录 50KB 两项。
