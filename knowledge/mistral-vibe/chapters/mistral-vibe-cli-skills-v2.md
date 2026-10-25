---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-skills-v2
harness_id: mistral-vibe
topic: skills
title: "Mistral Vibe CLI 的 Skill：搜索路径、SKILL.md 字段与三面投影"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-mv-301-skills-paths, ref-mv-301-skills-discovery]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-mv-301-skills-metadata, ref-mv-301-skills-openai]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-mv-301-skills-metadata, ref-mv-301-skills-filters, ref-mv-301-skills-openai]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-mv-301-skills-projection, ref-mv-301-skills-tool]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-mv-301-skills-registry, ref-mv-301-skills-paths]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-skills-discovery, ref-mv-301-skills-projection, ref-mv-301-skills-tool]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-mv-301-skills-paths, ref-mv-301-skills-discovery]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-mv-301-skills-discovery]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-mv-301-skills-discovery]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-mv-301-skills-metadata, ref-mv-301-skills-openai]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-mv-301-skills-openai, ref-mv-301-skills-metadata]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-mv-301-skills-projection, ref-mv-301-skills-tool]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-mv-301-skills-filters, ref-mv-301-skills-metadata]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-mv-301-skills-registry, ref-mv-301-skills-paths]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-mv-301-skills-discovery, ref-mv-301-skills-projection]
---

固定来源是官方仓库提交 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志 3.0.1），界面为 `cli`。Skill 是一个目录：目录里有 `SKILL.md`，frontmatter 声明元数据，正文是该 skill 的提示词。本提交的实质变化有三处：frontmatter 新增 `license`、`compatibility`、`metadata`、`user-invocable`、`disable-model-invocation`；`description` 上限提高到 1024 字符；发现结果改为"三面投影"（提示词目录、运行时正文、斜杠菜单）由同一份来源生成。

## 搜索路径与发现 {#skills-roots}

搜索路径在 SkillManager 构造时一次算出，顺序是：[@ref-mv-301-skills-discovery]

1. `config.toml` 里 `skill_paths` 指向且真实存在的目录（作用域记为 GLOBAL）；
2. 每个项目根下的 `.vibe/skills/`；
3. 每个项目根下的 `.agents/skills/`；
4. 用户级 `$VIBE_HOME/skills/`（默认 `~/.vibe/skills`）；
5. 用户级 `~/.agents/skills/`。

项目根是"受信任的当前工作目录 + `--add-dir` 目录"；用户目录只在 `user` 源启用且目录存在时入选。[@ref-mv-301-skills-paths] 路径按解析后的真实路径去重，同一个真实目录不会被两个作用域重复计入；若项目目录与某个全局目录指向同一位置，它按 GLOBAL 记。

发现只有一层深度：遍历每个搜索目录的**直接子目录**，子目录内存在 `SKILL.md` 才算一个 skill；不递归、不跟随同名忽略规则。解析结果按 `SKILL.md` 与 `agents/openai.yaml` 两个文件的 inode、mtime、size 缓存，文件一改下次发现就重新解析。[@ref-mv-301-skills-discovery]

同名冲突一律先到先得，不合并不改名：内置 skill 先种进结果表且名字被保留（后续同名一律跳过），随后按搜索路径顺序填充，重复名字记 debug 并丢弃后来者；registry skill 最后加入，本地与内置优先于它。[@ref-mv-301-skills-discovery]

## 文件格式与字段 {#skills-format}

`SKILL.md` 必须以 YAML frontmatter 开头与结尾（`---` 分隔），frontmatter 必须是映射；正文就是提示词。第一方字段：[@ref-mv-301-skills-metadata]

| 字段 | 必填 | 约束 | 作用 |
| :-- | :-- | :-- | :-- |
| `name` | 是 | 1–64 字符，小写字母/数字/连字符，不能以连字符开头或结尾 | skill 标识，也是斜杠命令名 |
| `description` | 是 | 1–1024 字符 | 给模型看的"做什么、何时用" |
| `license` | 否 | 字符串 | 许可证名或指向随包文件 |
| `compatibility` | 否 | 字符串 | 环境要求说明 |
| `metadata` | 否 | 键值都是字符串 | 自由元数据，解析时统一转成字符串 |
| `allowed-tools` | 否 | 空格分隔字符串或列表 | 预批准工具清单（实验性） |
| `user-invocable` | 否 | 布尔，默认真 | 为假时只能由模型调用，且不出现在斜杠菜单 |
| `disable-model-invocation` | 否 | 布尔，默认假 | 为真时只能由用户显式调用 |

未声明的 frontmatter 键被忽略（模型不是严格模式），因此加自定义键不会让文件解析失败。

扩展文件 `agents/openai.yaml` 用来兼容 OpenAI 的 skill 策略：`policy.allow_implicit_invocation`（默认真）控制模型能否隐式调用，`policy.products` 被保留但当前不生效；策略块是严格模型，未知策略键会被当作非法，结果是该 skill 的隐式调用被关闭并记一条配置问题，而不是静默放行。[@ref-mv-301-skills-openai]

## 调用：显式、模型调用与过滤 {#skills-invocation}

用户侧入口是 `/skill-name`，列出的是"有正文且可被用户调用"的集合；模型侧入口是 `skill` 工具，参数 `name` 必须来自 `available_skills`，调用后返回该 skill 的 `skill_content` 块与目录路径。[@ref-mv-301-skills-tool]

- `user-invocable = false`：仅模型可用，斜杠菜单不展示。
- `disable-model-invocation = true` 或 `agents/openai.yaml` 里 `allow_implicit_invocation = false`：仅用户可显式调用。
- 全局过滤：`enabled_skills` 非空时只保留匹配项，**且此时 `disabled_skills` 被忽略**；`enabled_skills` 为空时才应用 `disabled_skills`。匹配支持精确名、fnmatch 通配与 `re:` 正则。[@ref-mv-301-skills-filters]
- `allowed-tools` 是实验字段，用于预批准工具；它不改变 skill 的可见性。[@ref-mv-301-skills-metadata]

## 加载：三面投影 {#skills-loading}

同一份目录被发现一次后，按三面分发，避免提示词目录、运行时正文与斜杠菜单漂移：

- **Core（提示词目录）**拿到"skill 是什么"：名称、描述与真实的 `SKILL.md` 路径，由 Core 渲染进提示词；
- **运行时**拿到"skill 说了什么"：已渲染好的 skill 正文块，按名字取用；
- **客户端**拿到"skill 叫什么"：`/` 菜单背后的名字列表。

解析 frontmatter 只发生在宿主这一侧，运行时既不解析 frontmatter 也不知道 skill 是什么。[@ref-mv-301-skills-projection] 资源目录随 skill 目录一起存在：`skill` 工具会采样列出目录内文件（最多 10 个，遍历上限 200 项，跳过 `.git`、`node_modules`、虚拟环境与构建目录），让模型知道可以按相对路径去读哪些资源。[@ref-mv-301-skills-tool]

## 生效条件 {#skills-conditions}

- **信任**：项目级两个目录只从项目根收集，而项目根要求目录受信任或由 `--add-dir` 显式加入。[@ref-mv-301-skills-paths]
- **用户源**：`user` 源未启用时用户级目录不参与。
- **registry skill**：需要 `experimental_enable_registry_skills` 打开（默认关）；打开后从用户与项目 manifest 读取固定版本，项目 manifest 优先，且本地/内置同名 skill 仍胜过 registry 条目。[@ref-mv-301-skills-registry]
- **插件 skill**：由插件解析结果提供，运行时名字带插件命名空间前缀（见 Native plugins 章节）。
- **内置 skill**：在 Unified 会话里随内置 `vibe` 插件提供，因此宿主侧的 skill 管理器在投影时显式排除内置集合，避免同一 skill 以两个名字出现两次。[@ref-mv-301-skills-projection]

## 诊断 {#skills-diagnostics}

- **发现失败**：解析错误的 skill 变成 `SkillConfigIssue`（文件与原因），由 app_server 归并为会话配置问题；典型的两种原因是"缺少或非法 YAML frontmatter"与"frontmatter 不是映射"。[@ref-mv-301-skills-discovery]
- **数量与路径**：初始化会记录"从 N 个搜索路径发现了 M 个 skill"；M 为 0 时先核对项目根是否受信任、目录是否存在、子目录里是否真的叫 `SKILL.md`。
- **投影一致性**：提示词目录、运行时正文与斜杠菜单由同一次投影产出，因此"菜单里有但模型看不到"或反之通常意味着投影层把该 skill 过滤掉了（`enabled_skills`/`disabled_skills`、插件命名空间、registry 开关）。[@ref-mv-301-skills-projection]
- **调用失败**：`skill` 工具只接受 `available_skills` 里的名字，未知名字直接报错；返回内容为空说明正文为空，资源缺失则检查采样列表里的相对路径。
- **改文件何时生效**：解析缓存按文件 stat 失效，下一次发现会读到新内容；进行中的会话使用建立会话时投影出的集合，改完 skill 后开新会话最稳妥。
