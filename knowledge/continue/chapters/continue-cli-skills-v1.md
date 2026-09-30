---
schema_version: 3
record_kind: production
edition_id: continue-cli-skills-v1
harness_id: continue
topic: skills
title: "Continue CLI 的 Skills：位置、SKILL.md 解析、调用与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-continue-src-cli-pkg, ref-continue-doc-cli-config-precedence]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-continue-src-skills-dirs, ref-continue-src-env, ref-continue-src-skills-load, ref-continue-src-skills-tool, ref-continue-src-skills-slashname]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-continue-src-markdown-frontmatter, ref-continue-src-skills-schema, ref-continue-src-skills-slashname, ref-continue-src-skills-tool, ref-continue-src-skills-load, ref-continue-src-skills-walk, ref-continue-src-skills-dirs]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-continue-src-tools-assemble, ref-continue-src-skills-load, ref-continue-src-skills-dirs, ref-continue-src-skills-walk]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-continue-src-skills-tool, ref-continue-src-skills-meta, ref-continue-src-builtins, ref-continue-src-slash-skills, ref-continue-src-commands-skills, ref-continue-src-slash-skillmatch, ref-continue-src-slash-importskill, ref-continue-src-skills-import-prompt]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-continue-src-perms-default, ref-continue-src-perms-modes, ref-continue-src-agent-toolgate, ref-continue-src-slash-skills, ref-continue-src-skills-load, ref-continue-src-tools-assemble, ref-continue-src-logger]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-continue-src-skills-dirs, ref-continue-src-env, ref-continue-src-skills-load, ref-continue-src-skills-tool, ref-continue-src-skills-slashname]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-continue-src-tools-assemble, ref-continue-src-skills-load, ref-continue-src-skills-dirs, ref-continue-src-skills-walk]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-continue-src-skills-dirs, ref-continue-src-env, ref-continue-src-skills-load, ref-continue-src-skills-tool, ref-continue-src-skills-slashname]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-continue-src-markdown-frontmatter, ref-continue-src-skills-schema, ref-continue-src-skills-slashname, ref-continue-src-skills-tool, ref-continue-src-skills-load, ref-continue-src-skills-walk, ref-continue-src-skills-dirs]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-continue-src-markdown-frontmatter, ref-continue-src-skills-schema, ref-continue-src-skills-slashname, ref-continue-src-skills-tool, ref-continue-src-skills-load, ref-continue-src-skills-walk, ref-continue-src-skills-dirs]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-continue-src-skills-tool, ref-continue-src-skills-meta, ref-continue-src-builtins, ref-continue-src-slash-skills, ref-continue-src-commands-skills, ref-continue-src-slash-skillmatch, ref-continue-src-slash-importskill, ref-continue-src-skills-import-prompt]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-continue-src-skills-tool, ref-continue-src-skills-meta, ref-continue-src-builtins, ref-continue-src-slash-skills, ref-continue-src-commands-skills, ref-continue-src-slash-skillmatch, ref-continue-src-slash-importskill, ref-continue-src-skills-import-prompt]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: answered
        source_refs: [ref-continue-src-perms-default, ref-continue-src-perms-modes, ref-continue-src-agent-toolgate, ref-continue-src-slash-skills, ref-continue-src-skills-load, ref-continue-src-tools-assemble, ref-continue-src-logger]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-continue-src-perms-default, ref-continue-src-perms-modes, ref-continue-src-agent-toolgate, ref-continue-src-slash-skills, ref-continue-src-skills-load, ref-continue-src-tools-assemble, ref-continue-src-logger]
---

## 固定来源与机制边界 {#skills-scope}

本章的固定来源只有两处：官方仓库 `https://github.com/continuedev/continue.git` 在提交 `5522c6f44ca0ac3528b37244818fbfa39b5af470` 的源码与文档，以及官方 npm 包 `@continuedev/cli`（`bin: cn`）的渠道身份。[@ref-continue-src-cli-pkg] 仓库里的 `docs/**` 就是 docs.continue.dev 的 Markdown 源（`docs/docs.json` 是 Mintlify 站点配置，其中 `CLI` 标签页只列 `cli/quickstart`、`cli/tui-mode`、`cli/headless-mode`、`cli/configuration`、`cli/tool-permissions` 五页），因此本章引用的文档页与站点页面一一对应；docs.continue.dev 本身不提供 `.md` 端点（同一路径加 `.md` 返回 404），所以没有把 HTML 页面单独登记为来源。[@ref-continue-doc-cli-config-precedence][@ref-continue-src-cli-pkg]

Continue CLI 的「Skill」是一个**目录包**：目录名是 skill 的名字，目录里必须有一个 `SKILL.md`，其余文件是该 skill 的资源。CLI 通过三个固定目录发现 skill，把一个内置工具（`Skills`）暴露给模型，用户侧还提供 `/skills`、`/import-skill` 与 `/skill-{name}` 三个入口。本章只写 `surface_id: cli`（`cn` 命令）的行为；catalog 同时声明的 `vscode`、`jetbrains` 两个界面本轮没有答案，查询会派生为 `not_investigated`。

## Skill 的查找位置与同名处理 {#skills-roots}

每次调用 `loadMarkdownSkills()` 时，CLI 以当前进程工作目录 `process.cwd()` 为基准，按固定顺序检查三个目录，顺序即数组顺序：[@ref-continue-src-skills-dirs]

1. `{cwd}/.continue/skills`
2. `{cwd}/.claude/skills`
3. `{continueHome}/skills`

其中 `continueHome` 由环境变量 `CONTINUE_GLOBAL_DIR` 覆盖，未设置时回退到 `os.homedir()/.continue`。[@ref-continue-src-env] 这带来两条读者可操作的事实：

- **全局与项目级靠路径区分，而不是靠配置项**：把 skill 放进 `{cwd}/.continue/skills/{name}/SKILL.md` 只在该目录（及其子目录）下运行时可见；放进 `~/.continue/skills/{name}/SKILL.md` 则对所有工作目录可见。改写 `CONTINUE_GLOBAL_DIR` 会把「全局 skill 根」整体挪走（`~/.continue` 下的 `config.yaml`、`permissions.yaml`、`logs/` 也一起挪走）。
- **`.claude/skills` 是兼容目录**：CLI 顺带读取 Claude Code 的 skill 目录，位置与 `.continue/skills` 平级。

同名 skill **不会合并，也不会覆盖**：三个目录扫出来的 `SKILL.md` 全部 push 进同一个数组，`loadMarkdownSkills()` 里没有任何按名字去重的逻辑。[@ref-continue-src-skills-load] 真正决定「用哪一个」的是消费方：

- 模型调用 `Skills` 工具时，实现是 `skills.find((s) => s.name === skill_name)`，即取数组中**第一个** `name` 精确相等的项；数组顺序来自三个目录的并发读取（`Promise.all(...).flat()` 后逐个 `readFile` 再 push），源码没有对最终顺序做排序保证，因此同名 skill 的胜者只能靠运行观察，不能从源码推定。[@ref-continue-src-skills-tool][@ref-continue-src-skills-dirs]
- 斜杠命令用 `getSkillSlashCommandName(skill)` 生成 `skill-{规范化名}`：名字先转小写，非字母数字连续段压成 `-`，再去掉首尾 `-`；规范化后为空则回退用 skill 目录名做同样处理，仍为空则用字面量 `skill`。[@ref-continue-src-skills-slashname] 因此两个不同 `name` 但规范化结果相同的 skill 会在斜杠命令层撞名，而 `name` 相同的 skill 也会产生同一个斜杠命令。

扫描**不跟随符号链接**：目录枚举用 `readdir(..., { withFileTypes: true })` 并只保留 `isDirectory()` 为真的条目，符号链接指向的目录不会被当作 skill 目录（skill 目录**内部**的资源枚举另见下一节）。[@ref-continue-src-skills-load]

## SKILL.md 的格式与目录内附加内容 {#skills-format}

`SKILL.md` 走与规则文件相同的 Markdown frontmatter 解析器 `parseMarkdownRule`：把内容按行首独占的 `---` 切分，若切出至少三段，第二段按 YAML 解析成 frontmatter、其余部分拼回正文；YAML 解析失败时**不报错**，而是把整篇内容当正文、frontmatter 视为空对象。[@ref-continue-src-markdown-frontmatter] 解析结果随后过一遍 zod 结构 `skillFrontmatterSchema`：`name` 与 `description` 必须都是**长度至少 1 的字符串**，缺任意一个都会抛错并被记为一条非致命错误，该 skill 被丢弃。[@ref-continue-src-skills-schema]

| 字段 | 位置 | 必填 | 解析规则 |
| :-- | :-- | :-- | :-- |
| `name` | `SKILL.md` frontmatter | 是 | 非空字符串；同时是 `Skills` 工具的匹配键和斜杠命令 `skill-{name}` 的来源 [@ref-continue-src-skills-schema][@ref-continue-src-skills-slashname] |
| `description` | `SKILL.md` frontmatter | 是 | 非空字符串；原样进入 `Skills` 工具描述，是模型决定是否调用该 skill 时唯一能看到的说明 [@ref-continue-src-skills-schema][@ref-continue-src-skills-tool] |
| 其余 frontmatter 键 | `SKILL.md` frontmatter | 否 | zod 对象默认丢弃未知键；源码里被消费的只有 `name`、`description`、`content`、`path`、`files`，没有别的专有 frontmatter 字段被读取 [@ref-continue-src-skills-schema][@ref-continue-src-skills-load] |

正文（frontmatter 之后的部分）以 `markdown` 原样存入 `content`，没有长度、小标题或语法的额外约束。[@ref-continue-src-skills-load]

目录内的其余文件由 `getFilePathsInSkillDirectory` 枚举：以 skill 目录为根跑 `ignore-walk` 的 `WalkerSync`（`includeEmpty: false`、`follow: false`，即不跟随符号链接），把结果拼成绝对路径后**剔除 `SKILL.md` 本身**，再把位于当前工作目录内的路径转成 `./` 开头的相对路径。[@ref-continue-src-skills-walk] 这份文件清单不解析内容，只在模型调用 skill 时随结果一起交给模型，并附一句「需要时用读文件工具打开」的提示。[@ref-continue-src-skills-tool]

最小可用结构（花括号占位符是普通文本，不是标签）：

```
{cwd}/.continue/skills/{skill-name}/SKILL.md
---
name: {skill-name}
description: {一句话说明这个 skill 做什么、什么时候用}
---

{给模型的指令正文}
```

这个结构来自上表的两个必填字段与三个查找位置；CLI 自己的仓库里也放了同样形状的示例资产（`skills/cn-check/SKILL.md` 与打包用的 `skills/cn-check.zip`）。仓库内的 `skills/` 目录是 Continue 自己的示例文件，不参与运行期发现。[@ref-continue-src-skills-dirs][@ref-continue-src-skills-schema]

## 发现时机与扫描范围 {#skills-discovery}

**时机**：`loadMarkdownSkills()` 在每次构造工具集时被调用一次——`getAllAvailableTools()` 里执行 `tools.push(await skillsTool())`，而 `getAllAvailableTools()` 在每次请求、每批工具调用前都会重新执行。所以 skill 目录的改动**在下一个请求生效**，没有一个常驻的 skill 索引，也不需要显式重载命令。[@ref-continue-src-tools-assemble]

**深度与文件名**：每个根目录只取**直接子目录**（`readdir` 加 `isDirectory()`），随后要求该子目录下存在 `SKILL.md`（对 `{skillDir}/SKILL.md` 做一次 `stat`）；不存在就跳过，不会尝试其它文件名，也不会往更深层找 skill。根目录本身不存在时函数直接返回空数组，不报错。[@ref-continue-src-skills-load]

**发现范围**：三个根目录并发扫描后 `flat()` 合并，没有任何忽略规则（不读 `.gitignore`、不读 `.continueignore`），也没有数量上限。[@ref-continue-src-skills-dirs]

**资源文件范围**：与 skill 发现不同，skill **目录内**的资源用 `ignore-walk` 递归枚举（`includeEmpty: false`、`follow: false`），因此子目录里的文件会被列出来，符号链接不会被跟随。[@ref-continue-src-skills-walk]

**缺口**：源码没有给出隐藏文件的过滤规则（`includeEmpty: false` 只影响空目录），也没有说明 `SKILL.md` 之外的忽略清单；`.continueignore` 这类机制在 CLI 的 skill 路径上完全没有出现。这些属于 partial，已检查的入口是 `extensions/cli/src/util/loadMarkdownSkills.ts` 全文与 `extensions/cli/src/tools/index.tsx` 的工具装配处。

## 名称、描述与正文何时进入上下文，以及怎样调用 {#skills-invocation}

**进入上下文的时机分两段**：

1. **工具描述阶段**：`skillsTool()` 在构造时就调用 `loadMarkdownSkills()`，把每个 skill 的 `name` 与 `description` 拼进 `Skills` 工具的 `description` 文本（每项形如一行 `name: {名称}` 加一行 `description: {描述}`）。模型在工具定义里看到的是**全部 skill 的名字与描述**，看不到正文。[@ref-continue-src-skills-tool]
2. **工具调用阶段**：模型调用 `Skills` 并传 `skill_name` 后，实现用 `find` 精确定位 skill，返回 `content`，也就是 frontmatter 之后的正文；目录内有资源文件时再追加文件清单与「需要用读文件工具打开」的提示。名称不存在时抛出 `Skill not found` 并列出全部可用名称。[@ref-continue-src-skills-tool]

工具本身的参数只有 `skill_name` 一个必填字符串；`Skills` 在 `ALL_BUILT_IN_TOOLS` 里注册，`readonly: false`、`isBuiltIn: true`。[@ref-continue-src-skills-meta][@ref-continue-src-builtins]

**模型自动调用**：没有额外的策略开关，模型是否调用完全取决于它读到工具描述后的判断；CLI 不做相关性打分，也不做命中计数。[@ref-continue-src-skills-tool]

**用户显式调用**有三种，全部走斜杠命令：

- `/skills`：列出所有已发现 skill，每行是「名字 - 描述 (相对路径)」；一个都没有时提示 `No skills found. Add skills under .continue/skills or .claude/skills.`。[@ref-continue-src-slash-skills]
- `/skill-{name}`：命令表里不存在这个命令字面量，它由 `getSkillSlashCommands()` 按已发现 skill 动态生成，名字为 `getSkillSlashCommandName(skill)`；命中后 CLI **不把正文直接塞进输入**，而是注入一句指令，让模型去调用 `Skills` 工具并把 `skill_name` 设为该 skill 的名字。[@ref-continue-src-commands-skills][@ref-continue-src-slash-skillmatch]
- `/import-skill {url-or-name}`：把用户给的标识符包进一段固定提示词（`buildImportSkillPrompt`）作为新的用户输入，提示词要求 agent 先确认、再把 skill 写到 `~/.continue/skills/{skill-name}`，并保留原仓库里的 `SKILL.md` 与相关文件。这条路径是「让 agent 写文件」，不是内建的下载器。[@ref-continue-src-slash-importskill][@ref-continue-src-skills-import-prompt]

## 生效条件与诊断 {#skills-conditions-diagnostics}

**权限条件**：`Skills` 工具在三套内置策略里都是 `allow`（默认策略、plan 模式策略、auto 模式策略），因此正常会话里 skill 无需批准即可读取；只有把工具名显式 `exclude`（`--exclude Skills` 或写进 `permissions.yaml`）才会让模型无法加载任何 skill。[@ref-continue-src-perms-default][@ref-continue-src-perms-modes]

**agent 文件条件**：当通过 `--agent` 载入 agent 文件并声明了 `tools:` 时，CLI 会把未列出的内置工具批量设为 `exclude`；`built_in` 关键字表示放行全部内置工具。也就是说 agent 文件可以把 `Skills` 关掉，此时 skill 目录仍会被扫描（`/skills` 仍能列出），但模型侧不可调用。[@ref-continue-src-agent-toolgate]

**信任与沙箱**：固定来源里没有项目信任、目录白名单或沙箱开关作用于 skill 的发现与读取；skill 只是 Markdown 文本，读取路径与 `Read` 工具同级，差别只在 `Skills` 工具的权限位。[@ref-continue-src-perms-default]

**诊断**：

- `/skills` 是唯一的内建查看入口，输出名字、描述与相对路径，用来确认「发现了什么、从哪个目录来的」。[@ref-continue-src-slash-skills]
- 解析失败**不会**出现在 `/skills` 输出里：`loadMarkdownSkills()` 把 `SKILL.md` 读取或 frontmatter 校验的异常收进 `errors` 数组返回，但 `skillsTool()` 与 `/skills` 都只解构 `skills`，`errors` 没有任何消费方。也就是说 `description` 漏写、YAML 写坏时，现象是「这个 skill 直接不见了」。[@ref-continue-src-skills-load][@ref-continue-src-slash-skills]
- 重载：没有 skill 专用的重载命令，改动文件后重新发一次消息即可（工具集与工具描述按请求重建）。[@ref-continue-src-tools-assemble]
- 进程日志写在 `{continueHome}/logs/cn.log`（`continueHome` 同样受 `CONTINUE_GLOBAL_DIR` 影响），CLI 用 `--verbose` 提高日志级别；日志会记录 skill 工具调用参数，但不记录发现阶段的错误列表。[@ref-continue-src-logger][@ref-continue-src-skills-load]

**缺口（diagnostics 记为 partial 的原因）**：固定来源能证明「列表入口存在、解析错误被吞掉」，但没有给出任何把 `errors` 暴露给用户或日志的路径，因此「怎样定位一个没被发现的 skill」目前只能靠逐个字段比对 `SKILL.md`，这条链路没有可观察的官方出口。
