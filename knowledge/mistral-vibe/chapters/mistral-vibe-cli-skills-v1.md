---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-skills-v1
harness_id: mistral-vibe
topic: skills
title: "Mistral Vibe CLI 的 Skill：发现顺序、SKILL.md 格式与两种调用控制"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-mv-skills-search-paths, ref-mv-skills-dedup, ref-mv-user-dirs, ref-mv-docs-skills-locations, ref-mv-readme-skills-discovery]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-mv-skills-frontmatter, ref-mv-skills-metadata, ref-mv-skills-info, ref-mv-skills-openai-policy, ref-mv-skills-openai-path, ref-mv-docs-skills-format, ref-mv-skills-allowed-tools]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-mv-docs-skills-slash, ref-mv-readme-skills, ref-mv-skills-filters, ref-mv-name-matching, ref-mv-docs-skills-filtering, ref-mv-skills-fields]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-mv-skills-system-prompt, ref-mv-skill-tool, ref-mv-skill-files, ref-mv-docs-skills-format, ref-mv-readme-skills]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-mv-docs-trusted-folders, ref-mv-user-dirs, ref-mv-skills-registry, ref-mv-skills-fields, ref-mv-plugin-resolved-set, ref-mv-readme-skills-managing]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-skills-issues, ref-mv-skills-parse, ref-mv-skills-system-prompt, ref-mv-skill-tool, ref-mv-skills-search-paths, ref-mv-skills-dedup]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-mv-skills-search-paths, ref-mv-user-dirs]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-mv-skills-dedup, ref-mv-skills-search-paths]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-mv-skills-dedup, ref-mv-skills-search-paths]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-mv-skills-frontmatter, ref-mv-skills-metadata]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-mv-skills-openai-policy, ref-mv-skills-openai-path, ref-mv-skills-metadata, ref-mv-skills-allowed-tools]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-mv-skills-system-prompt, ref-mv-skill-tool, ref-mv-skill-files]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-mv-readme-skills, ref-mv-skills-filters, ref-mv-docs-skills-slash]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-mv-docs-trusted-folders, ref-mv-skills-registry, ref-mv-plugin-resolved-set]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-mv-skills-issues, ref-mv-skill-tool, ref-mv-skills-system-prompt]
---

固定来源是官方仓库提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab` 与 `docs.mistral.ai` 的 Vibe Code CLI 文档快照。Vibe 声明自己遵循 Agent Skills 规范（`agentskills.io/specification`），实现落在 `vibe/core/skills/`。需要先说明一个条件：仓库同时存在"旧 harness"与"Unified Harness"两条执行路径，插件提供的 skill 只在后者生效（见本文末尾与 Native plugins 章节）；本地 skill 的发现与加载两条路径一致。

## 发现位置与优先级 {#skills-roots}

SkillManager 在构造时一次性算出一份有序搜索路径列表，随后只在这个列表里找 skill。[@ref-mv-skills-search-paths] 代码里的顺序是：

1. `config.toml` 的 `skill_paths` 里存在且是目录的路径（作用域记为 GLOBAL）；
2. 每个项目根目录下的 `.vibe/skills/`；
3. 每个项目根目录下的 `.agents/skills/`；
4. 用户目录 `~/.vibe/skills/`；
5. 用户目录 `~/.agents/skills/`。

项目根 = 受信任的工作目录 + `--add-dir` 追加目录；用户目录只在 `user` 源启用时参与，且只有目录真实存在才会入选。[@ref-mv-user-dirs] 官方文档给用户的说法是"自定义 `skill_paths` → 受信任工作目录下的 `./.vibe/skills/` 或 `./.agents/skills/` → 用户级 `~/.vibe/skills/`"。[@ref-mv-docs-skills-locations] 三份来源（代码、README、文档站）在"项目内两个目录谁先"这点上并不完全一致：README 把 `.agents/skills/` 列在 `.vibe/skills/` 之前，文档站则并列二者、且没有提到 `~/.agents/skills/`。[@ref-mv-readme-skills-discovery] 由于同名去重是"先到先得"，这个顺序差异在项目内同名 skill 上有实际影响，读源码的实现顺序最稳妥。

发现本身只有一层深度：遍历搜索目录的**直接子目录**，子目录里存在 `SKILL.md` 才算一个 skill，不做递归、也没有文件名忽略规则。[@ref-mv-skills-dedup] 资源目录就放在 skill 目录里，`SKILL.md` 同级的其它文件属于该 skill。

同名冲突一律"先到先得"，不做合并或改名。内置 skill 先被种进结果表，其名字被保留：后续任何同名 skill 都会被跳过。[@ref-mv-skills-dedup] 之后按搜索路径顺序填充，遇到重复名字记一条 debug 日志并丢弃后来者。[@ref-mv-skills-search-paths] 官方文档只描述了"过滤器"这一层，没有描述重名策略，需要按实现理解。

## 文件格式与扩展字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 加 Markdown 正文组成，frontmatter 必须以上下两条 `---` 分隔，正文被当作 skill 的提示词内容（`prompt`）保存。[@ref-mv-skills-frontmatter] frontmatter 解析成 `SkillMetadata`，字段与约束如下。[@ref-mv-skills-metadata]

| 字段 | 必填 | 约束 | 说明 |
| :-- | :-- | :-- | :-- |
| `name` | 是 | 1–64 字符，`^[a-z0-9]+(-[a-z0-9]+)*$` | skill 标识；目录名不一致只告警，不拒绝 |
| `description` | 是 | 1–1024 字符 | 用于列表与模型选择的说明 |
| `license` | 否 | 字符串 | 许可证名或指向随包许可证文件 |
| `compatibility` | 否 | ≤500 字符 | 环境要求说明 |
| `metadata` | 否 | 值统一转成字符串 | 自由键值，宿主保留但不解释 |
| `allowed-tools` | 否 | 字符串（按空格切分）或列表 | 声明该 skill 建议使用的工具 |
| `user-invocable` | 否 | 布尔，默认 `true` | 为真时暴露为 `/skill-name` |
| `disable-model-invocation` | 否 | 布尔，默认 `false` | 为真时模型看不到、也不能自动加载 |

frontmatter 里未知的键会被忽略（不是错误），Python 风格的下划线写法也接受。[@ref-mv-skills-metadata] 解析产物 `SkillInfo` 里，`model_invocable` 是派生值：`caller 开关 and 非 disable-model-invocation`；`skill_dir` 由 `SKILL.md` 所在目录解析得到，供正文里的相对路径使用。[@ref-mv-skills-info]

官方文档给出的 SKILL.md 示例（字段与实际解析一致）：[@ref-mv-docs-skills-format]

```markdown
---
name: code-review
description: Perform automated code reviews.
license: MIT
compatibility: Python 3.12+
user-invocable: true
allowed-tools:
  - read_file
  - grep
  - ask_user_question
---

# Code review skill

This skill helps analyze code quality and suggest improvements.
```

frontmatter 之后的部分被原样保留为 skill 的提示词内容，因此写在这里的规则就是模型真正读到的规则。

宿主额外识别一个第三方约定：skill 目录下的 `agents/openai.yaml` 旁车文件。它只解释一个策略字段 `policy.allow_implicit_invocation`（为假即"仅显式调用"）；策略字段缺失时默认可隐式调用，策略文件解析失败或含未知策略字段时按"仅显式调用"处理并记一条配置问题。[@ref-mv-skills-openai-policy] 该文件的查找位置固定在 skill 目录的 `agents/openai.yaml`，插件内的 skill 还要求它解析后仍位于插件根内。[@ref-mv-skills-openai-path]

关于 `allowed-tools`，两份官方来源说不一致：文档站写"`allowed-tools` 限制该 skill 能调用哪些工具"，并建议用它把 skill 的工具面收窄；而固定提交的实现只把这个字段解析成 `SkillInfo.allowed_tools`（一个普通列表字段），渲染 skill 内容时最多把它写回成 frontmatter 行，权限判定层并不读它——实际生效的工具权限来自 `[tools.*]` 与 `enabled_tools`/`disabled_tools`。[@ref-mv-skills-info][@ref-mv-skills-allowed-tools][@ref-mv-docs-skills-format] 因此把它当"建议使用的工具"来读更稳妥，真正的限制要写在权限配置里。

## 调用：显式、自动与过滤 {#skills-invocation}

两条调用轴相互独立：

- `user-invocable` 决定 `/skill-name` 是否可用。用户输入以 `/` 开头时，宿主按小写名解析成一次 skill 调用，且要求该 skill 的 `user_invocable` 为真；否则按普通消息处理。
- `model_invocable` 决定模型能否自动加载。它同时控制系统提示里是否出现该 skill，以及模型调用 `skill` 工具时能否解析到它。

官方文档对这两个字段的用户可见后果的描述与此一致：`user-invocable: true` 让 skill 变成 CLI 里的斜杠命令。[@ref-mv-docs-skills-slash] README 补充了一个容易忽略的组合：把 `user-invocable` 设为假只是从 `/` 菜单里隐藏、禁止显式调用，模型仍然可以加载；`disable-model-invocation: true` 则相反，用户仍可用 `/skill-name`，但模型看不到、也不会自动调用。[@ref-mv-readme-skills]

启用/禁用过滤器在整套 skill 上再做一层筛选：`enabled_skills` 非空时只有匹配的 skill 可用，否则用 `disabled_skills` 做排除；匹配支持精确名、fnmatch 通配和 `re:` 前缀正则，且大小写不敏感。[@ref-mv-skills-filters][@ref-mv-name-matching] 官方文档的表述是"若 `enabled_skills` 非空则作为白名单，否则每个被发现的 skill 都可用，减去被 `disabled_skills` 匹配的"。[@ref-mv-docs-skills-filtering] 这两个键与 `skill_paths` 在 schema 上都是列表字段。[@ref-mv-skills-fields]

## 加载：名称何时进上下文，正文何时读盘 {#skills-loading}

只有"可被模型调用"的 skill 会进入系统提示，而且只注入名称与描述（有路径时附路径），正文不进上下文。[@ref-mv-skills-system-prompt] 正文在真正被调用时才从磁盘读：模型调用 `skill` 工具时按名字取"可被模型调用"的 skill，取不到就报错并列出当前可用的名字；同一个 skill 在一次会话里已经加载过时返回"已加载，复用之前的说明"而不是重复注入。[@ref-mv-skill-tool] 渲染结果会把正文包成一段带 skill 名的内容，并附带该 skill 目录下的文件清单（有目录上限、跳过 `.git`、`node_modules`、缓存目录等噪声目录），同时告诉模型"相对路径基于这个目录"。[@ref-mv-skill-files]

用户显式输入 `/skill-name` 时走另一条路径：宿主把它解析成一次合成调用，效果等同于模型加载同一 skill。

官方文档只说明了"`name` 用于调用、`description` 显示在 skill 列表里、`allowed-tools` 限制该 skill 可用的工具"，没有描述分层加载的时序。[@ref-mv-docs-skills-format] README 则明确描述了"默认情况下用户和模型都可以调用 skill，两种调用控制相互独立"。[@ref-mv-readme-skills]

## 生效条件：信任、开关与来源 {#skills-conditions}

- 信任：项目内的 `.vibe/skills/` 与 `.agents/skills/` 只在工作目录受信任时进入搜索路径；未信任则只有用户级目录与 `skill_paths` 生效。[@ref-mv-docs-trusted-folders]
- 用户源开关：`user_skills_dirs` 在 `user` 源未启用时返回空表。[@ref-mv-user-dirs]
- 注册表 skill：由实验开关 `experimental_enable_registry_skills` 控制（默认关），打开后读取 `$VIBE_HOME/skills.toml` 与各项目根的 `.vibe/skills.toml` 钉住的版本；注册表 skill 在重名时总是输给本地与内置 skill，且未成功落盘到缓存目录的条目不参与。[@ref-mv-skills-registry][@ref-mv-skills-fields]
- 插件 skill：由插件解析器单独产出，名字带命名空间前缀，只在 Unified Harness 路径下交给模型。[@ref-mv-plugin-resolved-set]

配置入口的最小示例（来自 README 对 `skill_paths` / `enabled_skills` / `disabled_skills` 的说明）：[@ref-mv-readme-skills-managing]

```toml
skill_paths = ["/path/to/custom/skills"]
enabled_skills = ["code-review", "test-*"]
disabled_skills = ["experimental-*"]
```

## 诊断 {#skills-diagnostics}

- 解析/读取失败不会中断启动，而是变成 `SkillConfigIssue`（`file` + `message`），在启动时以警告形式呈现。[@ref-mv-skills-issues] 例如"Failed to load: ..."或"Model invocation disabled: ...（OpenAI 策略文件解析失败）"。[@ref-mv-skills-parse]
- 可用性从系统提示里的 skill 清单就能看出：不在清单里的 skill 对模型不可见。[@ref-mv-skills-system-prompt]
- 模型调用失败时工具会直接列出可用的 skill 名，这是最快的定位方式。[@ref-mv-skill-tool]
- 调试日志会打印"从 N 个搜索路径发现 M 个 skill"以及每条被跳过的重名/保留名记录（INFO/DEBUG 级）。[@ref-mv-skills-search-paths]
- skill 发现发生在 SkillManager 构造时（搜索路径与目录遍历都在构造函数里完成），所以改动磁盘或配置后需要重新构造、也就是会话内 `/reload` 或重启才会看到结果。[@ref-mv-skills-search-paths][@ref-mv-skills-dedup]
