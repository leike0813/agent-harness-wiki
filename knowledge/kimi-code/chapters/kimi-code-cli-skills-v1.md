---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-skills-v1
harness_id: kimi-code
topic: skills
title: "Kimi Code CLI 的 Agent Skills：目录、格式、发现、调用与诊断"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-kimi-code-skills-locations, ref-kimi-code-src-skill-roots-dirs, ref-kimi-code-src-skill-roots-resolve, ref-kimi-code-src-skill-roots-merge, ref-kimi-code-config-top, ref-kimi-code-cmd-skills-dirs]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-kimi-code-skills-doc, ref-kimi-code-src-skill-scan-depth, ref-kimi-code-src-skill-flat, ref-kimi-code-src-skill-subskill, ref-kimi-code-src-skill-subskill-name, ref-kimi-code-skills-locations, ref-kimi-code-src-skill-parser-required]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-kimi-code-skills-format, ref-kimi-code-skills-frontmatter, ref-kimi-code-src-skill-parser-required, ref-kimi-code-src-skill-parser-aliases, ref-kimi-code-skills-doc, ref-kimi-code-skills-placeholders]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-kimi-code-skills-invoking, ref-kimi-code-src-skill-registry, ref-kimi-code-slash-dynamic, ref-kimi-code-src-skill-prompt, ref-kimi-code-plugins-skills, ref-kimi-code-slash-builtin-skills]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-kimi-code-config-top, ref-kimi-code-env-switches, ref-kimi-code-config-watch, ref-kimi-code-slash-session, ref-kimi-code-skills-invoking, ref-kimi-code-slash-dynamic, ref-kimi-code-cmd-doctor, ref-kimi-code-src-skill-parser-required, ref-kimi-code-env-logs, ref-kimi-code-agents-locations]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-kimi-code-skills-locations, ref-kimi-code-src-skill-roots-dirs, ref-kimi-code-src-skill-roots-resolve, ref-kimi-code-src-skill-roots-merge, ref-kimi-code-config-top, ref-kimi-code-cmd-skills-dirs]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-kimi-code-skills-doc, ref-kimi-code-src-skill-scan-depth, ref-kimi-code-src-skill-flat, ref-kimi-code-src-skill-subskill, ref-kimi-code-src-skill-subskill-name, ref-kimi-code-skills-locations, ref-kimi-code-src-skill-parser-required]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-kimi-code-skills-doc, ref-kimi-code-src-skill-scan-depth, ref-kimi-code-src-skill-flat, ref-kimi-code-src-skill-subskill, ref-kimi-code-src-skill-subskill-name, ref-kimi-code-skills-locations, ref-kimi-code-src-skill-parser-required]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-kimi-code-skills-format, ref-kimi-code-skills-frontmatter, ref-kimi-code-src-skill-parser-required, ref-kimi-code-src-skill-parser-aliases, ref-kimi-code-skills-doc, ref-kimi-code-skills-placeholders]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-kimi-code-skills-format, ref-kimi-code-skills-frontmatter, ref-kimi-code-src-skill-parser-required, ref-kimi-code-src-skill-parser-aliases, ref-kimi-code-skills-doc, ref-kimi-code-skills-placeholders]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-kimi-code-skills-invoking, ref-kimi-code-src-skill-registry, ref-kimi-code-slash-dynamic, ref-kimi-code-src-skill-prompt, ref-kimi-code-plugins-skills, ref-kimi-code-slash-builtin-skills]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-kimi-code-skills-invoking, ref-kimi-code-src-skill-registry, ref-kimi-code-slash-dynamic, ref-kimi-code-src-skill-prompt, ref-kimi-code-plugins-skills, ref-kimi-code-slash-builtin-skills]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-kimi-code-config-top, ref-kimi-code-env-switches, ref-kimi-code-config-watch, ref-kimi-code-slash-session, ref-kimi-code-skills-invoking, ref-kimi-code-slash-dynamic, ref-kimi-code-cmd-doctor, ref-kimi-code-src-skill-parser-required, ref-kimi-code-env-logs, ref-kimi-code-agents-locations]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: partial
        source_refs: [ref-kimi-code-config-top, ref-kimi-code-env-switches, ref-kimi-code-config-watch, ref-kimi-code-slash-session, ref-kimi-code-skills-invoking, ref-kimi-code-slash-dynamic, ref-kimi-code-cmd-doctor, ref-kimi-code-src-skill-parser-required, ref-kimi-code-env-logs, ref-kimi-code-agents-locations]
---

Kimi Code CLI 的 Agent Skill 是带 YAML frontmatter 的 Markdown 文档，宿主按作用域分层扫描目录、解析 frontmatter，并在会话构建提示词时把名称与描述注入模型上下文、在调用时再读取正文 [@ref-kimi-code-skills-doc]。本章固定来源是 `MoonshotAI/kimi-code` 仓库固定 commit 上的 `docs/en/customization/skills.md`、`docs/en/reference/kimi-command.md`、`docs/en/reference/slash-commands.md` 与 `packages/agent-core-v2/src/features/skill` 的发现与解析实现。

## 技能目录与作用域 {#skills-roots}

宿主按四级作用域扫描，作用域越具体优先级越高：**Project > User > Extra > Built-in**；用户级与项目级各自又区分 Kimi 专有目录与跨工具通用目录 [@ref-kimi-code-skills-locations]。

| 作用域 | Kimi 专有目录 | 跨工具通用目录 |
| --- | --- | --- |
| User（对所有项目生效） | `$KIMI_CODE_HOME/skills/`，默认 `~/.kimi-code/skills/` | `~/.agents/skills/` |
| Project（对当前仓库生效） | `.kimi-code/skills/` | `.agents/skills/` |
| Extra | `extra_skill_dirs` 声明的目录 | — |
| Built-in | 随 CLI 分发，优先级最低 | — |

- 项目根目录取自「从工作目录向上找到的第一个含 `.git` 的目录」；源码用 `findUpwardRoot(workDir, '.git', ...)` 实现，并把它同时用于用户级与项目级根目录的拼接 [@ref-kimi-code-src-skill-roots-dirs] [@ref-kimi-code-src-skill-roots-resolve]。
- Kimi 专有目录随 `KIMI_CODE_HOME` 迁移，因此隔离的数据根也获得隔离的 Kimi 技能；通用 `.agents/skills/` 固定在真实 OS home 下，便于跨工具共享 [@ref-kimi-code-skills-locations]。
- 已存在的根目录先做 `realpath` 解析再入列，重复的真实路径只登记一次，避免同一目录经由不同符号链接被扫描两遍；`configuredRoots` 还支持 `~` 展开与相对项目根的解析 [@ref-kimi-code-src-skill-roots-merge] [@ref-kimi-code-src-skill-roots-resolve]。
- 顶层 `merge_all_available_skills`（默认 `true`）控制同一层级内的合并方式：默认把该层级的专有目录与通用目录都纳入搜索；设为 `false` 时只取该组中第一个存在的目录 [@ref-kimi-code-src-skill-roots-merge] [@ref-kimi-code-config-top]。

命令行参数与配置项的语义不同，不要混用 [@ref-kimi-code-cmd-skills-dirs]：

- `--skills-dir DIR`：**替换**本次启动自动发现的用户级与项目级目录，可重复以叠加多个目录，仅对本次会话有效。
- `extra_skill_dirs`（`config.toml` 顶层）：在自动发现目录之上**追加**，长期生效，适合团队共享技能。

```sh
# 依据 reference/kimi-command.md 的 Custom Skills Directories 一节
kimi --skills-dir /path/to/team-skills --skills-dir ./local-skills
```

```toml
# 依据 customization/skills.md 的 Skill Locations 与 configuration/config-files.md 的顶层字段
extra_skill_dirs = ["~/team-skills", ".agents/team-skills"]
```

## 目录扫描与同名冲突 {#skills-discovery}

发现是「按根目录顺序递归遍历并登记」的过程，同名冲突由扫描顺序而非合并决定 [@ref-kimi-code-skills-doc]。

- 每个根目录递归扫描 `SKILL.md`，深度上限为 8 层；条目名等于 `node_modules` 或以 `.` 开头时跳过，因此隐藏目录与依赖目录不会被扫描。由于递归有深度上限，符号链接成环也不会无限展开 [@ref-kimi-code-src-skill-scan-depth]。
- 目录形态（推荐）：`<技能名>/SKILL.md`，脚本与参考资料放在同目录；扁平形态：技能目录顶层的单个 `.md` 文件 [@ref-kimi-code-skills-doc]。
- 扁平形态只在根目录顶层生效：`SKILL.md` 之外的非顶层 `.md` 不会登记为技能；同一目录同时存在 `foo/SKILL.md` 与 `foo.md` 时目录形态优先，扁平文件被忽略 [@ref-kimi-code-src-skill-flat]。
- 名称来源：目录形态取 frontmatter 的 `name`；扁平形态可省略 `name`，回退为去掉 `.md` 后缀的文件名 [@ref-kimi-code-skills-doc]。
- 子技能包（sub-skill）：父技能若在 metadata 中声明 `has-sub-skill`（或 `hasSubSkill`，包括嵌套在 `metadata` 子对象里的写法），其下的同名子目录会被继续下钻，并把子技能注册为 `父技能名.子技能名`；没有该声明的目录不会作为子技能包展开 [@ref-kimi-code-src-skill-subskill] [@ref-kimi-code-src-skill-subskill-name]。
- 登记以规范化后的名称为键，先到先得：某名称已被更高优先级作用域占用时，后扫描到的同名技能不覆盖它；插件提供的技能以「插件 id + 名称」单独建索引，因此不会与普通技能互相覆盖 [@ref-kimi-code-src-skill-scan-depth]。
- 扫描顺序即优先级顺序（Project > User > Extra > Built-in），同一次扫描内先登记的根目录胜出 [@ref-kimi-code-skills-locations]。
- 非法文件（缺少 frontmatter、frontmatter 不是映射、目录形态缺少 `name`/`description`、`type` 不受支持）只跳过该文件并给出警告，不影响其他技能 [@ref-kimi-code-src-skill-parser-required]。

## SKILL.md 结构与字段 {#skills-format}

`SKILL.md` 由 YAML frontmatter 与 Markdown 正文两部分组成；正文就是发送给模型的指令，frontmatter 字段及其取值见下表 [@ref-kimi-code-skills-format] [@ref-kimi-code-skills-frontmatter]。

| 字段 | 说明 |
| --- | --- |
| `name` | 技能名，大小写不敏感。目录形态必填；扁平 `.md` 省略时回退为文件名（去掉 `.md`） |
| `description` | 一行摘要，模型据此决定何时调用。目录形态必填；扁平 `.md` 省略时回退为正文首个非空行（截断到 240 字符） |
| `type` | `prompt`（默认）、`inline`（同 `prompt`）、`flow`（仅手动调用）；其他取值一律跳过 |
| `whenToUse` | 触发时机说明，亦接受 `when-to-use`、`when_to_use` |
| `disableModelInvocation` | 设为 `true` 时阻止模型自动调用，亦接受 `disable-model-invocation`、`disable_model_invocation` |
| `arguments` | 具名参数，字符串数组或空格分隔的字符串；声明后可在正文中以 `$参数名` 读取 |

- 目录形态的 `name` 与 `description` 必须显式提供，缺任一即解析失败；解析器先检查首行是否为 `---`，再校验这两个字段 [@ref-kimi-code-src-skill-parser-required]。
- 短横线与下划线写法会在解析前被规整为驼峰字段名，因此 `when-to-use`、`when_to_use`、`whenToUse` 三种写法等价 [@ref-kimi-code-src-skill-parser-aliases]。
- 未知字段被忽略，新版本新增的字段不会让旧版本读取失败 [@ref-kimi-code-skills-doc]。
- 正文在发送给模型前会展开一小批占位符 [@ref-kimi-code-skills-placeholders]：

| 占位符 | 展开为 |
| --- | --- |
| `$ARGUMENTS` | 调用时传入的完整原始参数字符串 |
| `$ARGUMENTS[0]`、`$0` | 按空白切分后的位置参数（零基） |
| `$参数名` | `arguments` 中声明的具名参数 |
| `${KIMI_SKILL_DIR}` | 当前技能文件所在目录；扁平形态下指向技能目录本身 |

- 位置参数支持单双引号，因此 `/skill:commit "fix login" patch` 中 `$0` 展开为 `fix login`；正文没有任何参数占位符时，调用时传入的文本以 `ARGUMENTS: 文本` 追加到末尾 [@ref-kimi-code-skills-placeholders]。

一个完整技能（来自 `customization/skills.md` 的 Complete Example）[@ref-kimi-code-skills-doc]：

```markdown
---
name: review-pr
description: Review a Pull Request according to team standards and produce a structured review report
type: prompt
whenToUse: When the user asks me to review a PR, inspect code changes, or evaluate commit quality
arguments:
  - pr_ref
---

Please review the PR the user specified: $pr_ref
```

把它存为 `$KIMI_CODE_HOME/skills/review-pr/SKILL.md`（未设置 `KIMI_CODE_HOME` 时即 `~/.kimi-code/skills/review-pr/SKILL.md`），配合同目录的 `references/checklist.md`，新会话即可用 `/skill:review-pr #1234` 调用，`#1234` 展开为 `$pr_ref` [@ref-kimi-code-skills-doc]。

## 加载、调用与嵌套 {#skills-invocation}

名称与描述在会话构建提示词时进入模型上下文，正文只在被调用时读取 [@ref-kimi-code-skills-invoking]。

- 模型可见的清单只列出「可自动调用」的技能：`disableModelInvocation: true` 或非 `prompt`/`inline` 类型（即 `flow`）的技能被排除，子技能也不进入清单，只能经父技能嵌套调用 [@ref-kimi-code-src-skill-registry]。
- 用户手动调用使用命名空间前缀：外部技能注册为 `/skill:名称`，可携带额外文本，例如 `/skill:code-style` 或 `/skill:git-commits fix concurrency issue in login endpoint` [@ref-kimi-code-slash-dynamic]。
- 调用后，宿主把技能正文包进一个名为 `skill-loaded` 的标记块注入，块上带 `name`、`trigger`、`source`、`dir`、`args` 属性；触发来源区分 `user-slash`（用户斜杠命令）、`model-tool`（模型调用技能工具）与 `nested-skill`（嵌套调用）[@ref-kimi-code-src-skill-prompt]。
- 模型自行调用依赖 `description` 与 `whenToUse`；`disableModelInvocation: true` 或 `type: flow` 会阻止自动调用。技能调用最多嵌套 3 层，超过即终止 [@ref-kimi-code-skills-invoking]。
- 插件提供的技能所用的 `SKILL.md` 格式与普通技能相同；插件还能用 `sessionStart.skill` 在会话启动时把某个技能载入主 Agent，并为其附加 `skillInstructions` 说明 [@ref-kimi-code-plugins-skills]。
- 内置技能（随 CLI 分发、描述 Kimi Code 自身的用法）在 TUI 中注册为内置斜杠命令，包括 `/mcp-config`、`/custom-theme`、`/update-config`、`/check-kimi-code-docs`、`/import-from-cc-codex` 与 `/sub-skill`（其 `/sub-skill.review`、`/sub-skill.consolidate` 用于把本地技能清单重组为层级化子技能包）[@ref-kimi-code-slash-builtin-skills]。

## 生效条件、重载与诊断 {#skills-conditions}

- `builtin_product_skills`（顶层，默认 `true`）决定是否把描述 Kimi Code 自身的内置技能提供给模型；环境变量 `KIMI_CODE_BUILTIN_PRODUCT_SKILLS` 优先级高于该配置项 [@ref-kimi-code-config-top] [@ref-kimi-code-env-switches]。
- `watch`（默认开启）会挂载文件系统监视器，用于重载 `local.toml`、`AGENTS.md`、技能、MCP 配置与 `config.toml` 本身；设为 `false` 后改动要到重启才生效 [@ref-kimi-code-config-watch]。
- 改动技能文件后，可用 `/new` 新建会话或 `/reload` 重新加载当前会话（`/reload` 会应用最新的 `config.toml` 与 `tui.toml` 设置）[@ref-kimi-code-slash-session]。
- 发现与解析结果的可观察入口：非法或不受支持的文件在扫描时被跳过并在日志中给出原因（缺少 frontmatter、缺少必填字段、`type` 不支持等），不会被任何技能引用；`/skill:` 前缀的命令列表可直接确认某技能是否已登记 [@ref-kimi-code-skills-invoking] [@ref-kimi-code-slash-dynamic]。
- 固定来源没有提供「列出全部技能并显示来源根目录与跳过原因」的专门命令：TUI 侧可观察到的是技能斜杠命令清单与日志警告，`kimi doctor` 只校验 `config.toml` 与 `tui.toml` [@ref-kimi-code-cmd-doctor]。这一缺口在诊断技能「为什么没出现」时需要以日志与斜杠命令清单为准。
- 排查顺序建议：先确认技能文件落在上述四个作用域之一（`realpath` 后是否与已登记根目录重复）→ 确认目录形态的 frontmatter 有 `name` 与 `description`、`type` 是受支持值 → 用 `/skill:` 前缀的命令清单确认是否已登记 → 用 `/reload` 或 `/new` 重读（`watch` 关闭时尤其如此）→ 仍未出现时查日志中的跳过原因 [@ref-kimi-code-skills-invoking] [@ref-kimi-code-src-skill-parser-required] [@ref-kimi-code-config-watch]。
- 日志入口：全局诊断日志在 `~/.kimi-code/logs/kimi-code.log`，级别由 `KIMI_LOG_LEVEL`（`off`/`error`/`warn`/`info`/`debug`，进程启动时读取一次）控制；技能扫描的警告走同一日志系统 [@ref-kimi-code-env-logs]。
- 信任边界：固定来源把工作区信任提示与「覆盖内置 Agent 的项目文件」风险写在一起，但没有把技能目录纳入信任提示的范围——项目级 `.kimi-code/skills/` 与 `.agents/skills/` 的内容会作为提示词注入，其内容来自仓库本身，因此需要像审阅 agent 文件一样先看清楚再在陌生仓库运行 [@ref-kimi-code-agents-locations]。
