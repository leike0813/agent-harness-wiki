---
schema_version: 3
record_kind: production
edition_id: goose-cli-skills-v1
harness_id: goose
topic: skills
title: "Goose CLI 的 Skills：根目录、发现、格式、加载、调用与诊断"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-goose-skills-doc-locations, ref-goose-skills-src-config-dir, ref-goose-skills-src-global-dir, ref-goose-skills-src-project-dir, ref-goose-skills-src-roots, ref-goose-skills-src-scan]
  - section_id: skills-discovery
    surface_ids: [cli]
    source_refs: [ref-goose-skills-src-discover, ref-goose-skills-src-parse, ref-goose-skills-src-plugin-namespace, ref-goose-skills-src-scan, ref-goose-skills-src-walk]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-goose-config-doc-settings, ref-goose-skills-doc-best, ref-goose-skills-doc-builtin, ref-goose-skills-doc-locations, ref-goose-skills-doc-plugin, ref-goose-skills-doc-structure, ref-goose-skills-src-builtin, ref-goose-skills-src-docs-root, ref-goose-skills-src-frontmatter, ref-goose-skills-src-loaded, ref-goose-skills-src-meta, ref-goose-skills-src-name-validate, ref-goose-skills-src-parse, ref-goose-skills-src-plugin-dirs, ref-goose-skills-src-plugin-namespace, ref-goose-skills-src-scan]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-goose-skills-src-args, ref-goose-skills-src-client-file, ref-goose-skills-src-client-instr, ref-goose-skills-src-client-load, ref-goose-skills-src-loaded, ref-goose-skills-src-ops, ref-goose-skills-src-supporting]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-goose-skills-cli-doc, ref-goose-skills-doc-intro, ref-goose-skills-src-chat, ref-goose-skills-src-client, ref-goose-skills-src-client-load, ref-goose-skills-src-ops-command, ref-goose-skills-src-roots]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-goose-skills-src-cli-list, ref-goose-skills-src-ops-command, ref-goose-skills-src-parse, ref-goose-skills-src-scan]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-goose-skills-doc-locations, ref-goose-skills-src-config-dir, ref-goose-skills-src-global-dir, ref-goose-skills-src-project-dir, ref-goose-skills-src-roots, ref-goose-skills-src-scan]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-goose-skills-src-discover, ref-goose-skills-src-parse, ref-goose-skills-src-plugin-namespace, ref-goose-skills-src-scan, ref-goose-skills-src-walk]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery
        status: answered
        source_refs: [ref-goose-skills-src-discover, ref-goose-skills-src-parse, ref-goose-skills-src-plugin-namespace, ref-goose-skills-src-scan, ref-goose-skills-src-walk]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-goose-config-doc-settings, ref-goose-skills-doc-best, ref-goose-skills-doc-builtin, ref-goose-skills-doc-locations, ref-goose-skills-doc-plugin, ref-goose-skills-doc-structure, ref-goose-skills-src-builtin, ref-goose-skills-src-docs-root, ref-goose-skills-src-frontmatter, ref-goose-skills-src-loaded, ref-goose-skills-src-meta, ref-goose-skills-src-name-validate, ref-goose-skills-src-parse, ref-goose-skills-src-plugin-dirs, ref-goose-skills-src-plugin-namespace, ref-goose-skills-src-scan]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: partial
        source_refs: [ref-goose-config-doc-settings, ref-goose-skills-doc-best, ref-goose-skills-doc-builtin, ref-goose-skills-doc-locations, ref-goose-skills-doc-plugin, ref-goose-skills-doc-structure, ref-goose-skills-src-builtin, ref-goose-skills-src-docs-root, ref-goose-skills-src-frontmatter, ref-goose-skills-src-loaded, ref-goose-skills-src-meta, ref-goose-skills-src-name-validate, ref-goose-skills-src-parse, ref-goose-skills-src-plugin-dirs, ref-goose-skills-src-plugin-namespace, ref-goose-skills-src-scan]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-goose-skills-src-args, ref-goose-skills-src-client-file, ref-goose-skills-src-client-instr, ref-goose-skills-src-client-load, ref-goose-skills-src-loaded, ref-goose-skills-src-ops, ref-goose-skills-src-supporting]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-goose-skills-cli-doc, ref-goose-skills-doc-intro, ref-goose-skills-src-chat, ref-goose-skills-src-client, ref-goose-skills-src-client-load, ref-goose-skills-src-ops-command, ref-goose-skills-src-roots]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-goose-skills-cli-doc, ref-goose-skills-doc-intro, ref-goose-skills-src-chat, ref-goose-skills-src-client, ref-goose-skills-src-client-load, ref-goose-skills-src-ops-command, ref-goose-skills-src-roots]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: partial
        source_refs: [ref-goose-skills-src-cli-list, ref-goose-skills-src-ops-command, ref-goose-skills-src-parse, ref-goose-skills-src-scan]
---

本节固定来源：仓库 `block/goose` 提交 `ac15f938`（已随 redirect 迁至 `aaif-goose/goose`）的官方文档与 Rust 源码；文档不含适用软件版本号，源码为 `distribution: source-tree` 的来源级知识，本章不声明对应某个已发布版本（无版本映射）。CLI 没有官方安装文档之外的 npm 安装步骤，但仓库自身在 `ui/goose-acp` 下发布 npm 启动包，身份核对见 `registry/sources/`。

技能（Skill）是一组可复用的指令与资源，宿主把已发现技能的名称与描述放进系统指令，正文按需加载 [@ref-goose-skills-doc-intro]。

## 技能根目录与作用域 {#skills-roots}

源码里技能根目录是一个有序列表，宿主按顺序扫描：先项目级三个目录 `PROJECT/.agents/skills`、`PROJECT/.goose/skills`、`PROJECT/.claude/skills`，再是项目作用域的插件技能目录；然后是用户级 `HOME/.agents/skills`、`Paths::config_dir()/skills`、`HOME/.claude/skills`、`HOME/.config/agents/skills`，再是用户作用域的插件技能目录；最后才是内置技能 [@ref-goose-skills-src-roots]。项目根来自会话的工作目录，工作目录为空时项目层与项目插件层被跳过 [@ref-goose-skills-src-roots]。`Paths::config_dir()` 由 etcetera 的 app 策略（作者 `Block`、应用 `goose`）解析，设置绝对路径的 `GOOSE_PATH_ROOT` 时改为 `GOOSE_PATH_ROOT/config` [@ref-goose-skills-src-config-dir]。

用户级标准目录在源码里各有一个构造函数：全局是 `~/.agents/skills` [@ref-goose-skills-src-global-dir]，项目级是 `PROJECT/.agents/skills` [@ref-goose-skills-src-project-dir]。

官方文档列出的位置与源码一致但顺序相反：文档把 `~/.agents/skills/`（全局）排在 `.agents/skills/`（项目）之前，第三项是插件目录 `~/.agents/plugins/PLUGIN_NAME/`；文档同时说明 `.goose/skills/`、`.claude/skills/`、`~/.claude/skills/` 与平台相关配置目录属于向后兼容发现路径，推荐使用 `.agents/skills/` [@ref-goose-skills-doc-locations]。

冲突与判定：文档的表格只给位置清单、没有写明优先级，其排列（全局在前）与源码的扫描顺序（项目在前）相反。源码对同名技能采用先到先得去重 [@ref-goose-skills-src-scan]，因此实际生效的是「项目覆盖全局」；把文档表格顺序读成优先级的读者会得到相反结论。固定来源不足以判断文档是否有意如此，需要在本地放两个同名技能实测。

## 发现时机、范围与同名处理 {#skills-discovery}

发现没有缓存：`discover_skills` 每次调用都重新读文件系统，模型侧提示构建与 `load_skill` 调用各自触发一次 [@ref-goose-skills-src-discover]。技能文件的判定是文件名恰好等于 `SKILL.md`（大小写敏感、精确匹配），文件按 UTF-8 读取，读失败只记警告并跳过 [@ref-goose-skills-src-parse]。

扫描是**无深度上限的递归遍历**，根目录下任意层级的 `SKILL.md` 都会被收进来；只有文件名等于 `.git`、`.hg`、`.svn` 的目录不下探，没有 `.gitignore` 或隐藏文件规则 [@ref-goose-skills-src-walk]。目录项的 `is_dir()` 会跟随符号链接，因此符号链接目录会被进入；为避免环，遍历对每个目录做 canonicalize 去重，重复出现即跳过，canonicalize 失败的目录整棵跳过 [@ref-goose-skills-src-walk]。

同名技能按「先到先得」处理：扫描时维护一个 `seen` 集合，某个 frontmatter 名称一旦被登记，后续根目录中同名技能直接丢弃，没有命名空间前缀、没有合并 [@ref-goose-skills-src-scan]。内置技能在列表最后扫描，因此同名时总是让位于文件系统技能 [@ref-goose-skills-src-scan]。插件提供的 Open Plugins 技能在安装时就被改写成 `PLUGIN:SKILL` 形式，因而不会与普通技能撞名 [@ref-goose-skills-src-plugin-namespace]。frontmatter 名称里含 `/` 的技能会被跳过并记警告，`/` 保留给「技能名/资源路径」这一种加载形式 [@ref-goose-skills-src-parse]。

`goose skills list` 在未给定工作目录时回落到 `std::env::current_dir()` [@ref-goose-skills-src-discover]。

## SKILL.md 的解析规则 {#skills-format}

`SKILL.md` 的 frontmatter 结构只有三个字段 [@ref-goose-skills-src-frontmatter]：

| 字段 | 类型 | 必需 | 用途与解析规则 |
| --- | --- | --- | --- |
| `name` | 字符串 | 事实必需 | 技能标识；缺失或为空时该技能被跳过并记警告 |
| `description` | 字符串 | 否 | 进入系统指令的一行摘要，缺省为空串 |
| `metadata` | 对象 | 否 | 调用方自定义属性包，缺省为空；未声明的顶层键不被保留 |

frontmatter 必须以（允许前置空白的）`---` 开头，否则该文件被视为没有 frontmatter 并整份忽略 [@ref-goose-skills-src-parse]。正文是 frontmatter 之后的全部内容，原样保存，只有带参数加载时才做占位符替换 [@ref-goose-skills-src-loaded]。

官方文档给出的最小技能示例是一个只含 `name` 与 `description` 的 `SKILL.md`，正文即指令 [@ref-goose-skills-doc-structure]。文档还说明技能名与 `SKILL.md` 所在子目录同名（例如全局技能 `code-review` 放在 `~/.agents/skills/code-review/SKILL.md`）[@ref-goose-skills-doc-locations]。

宿主识别的专有项有三处。第一，`metadata` 里的 `arguments`（字符串数组）与 `argument-hint`（字符串）会被读取，用于把斜杠命令参数映射到 `$ARGUMENTS`/`$1`/`$name` 占位符 [@ref-goose-skills-src-meta]。第二，技能目录下的其余文件都作为「支持文件」注册（详见下一节）[@ref-goose-skills-src-scan]。第三，只有名为 `goose-doc-guide` 的内置技能会把正文里的 `{{GOOSE_DOCS_ROOT}}` 占位符替换为配置 `GOOSE_DOCS_ROOT` 的值，未设置时用默认值 `https://goose-docs.ai`；其它技能保留字面量 [@ref-goose-skills-src-docs-root]。

内置技能在编译期从 `src/skills/builtins` 嵌入二进制，加载时取该目录下所有 `.md` 文件的 UTF-8 内容 [@ref-goose-skills-src-builtin]。这一构建快照只签出源码文件、未签出 `src/skills/builtins` 目录，因此内置清单以官方文档为准：文档明确列出的常驻内置技能是 `web-search` [@ref-goose-skills-doc-builtin]；文档中 `GOOSE_DOCS_ROOT` 一栏同时提到 `goose-doc-guide` [@ref-goose-config-doc-settings]。

插件提供的技能走另一条解析路径：插件安装时扫描插件 `skills/` 目录，或清单 `skills` 声明的路径；只有两者都缺席且插件根下直接存在 `SKILL.md` 时，才把插件根本身当作技能根。每个技能根按一层深扫描取含 `SKILL.md` 的目录，技能名依次取 frontmatter `name`、目录名、`unnamed`，并在安装时改写成 `plugin:skill` 形式写回文件 [@ref-goose-skills-src-plugin-dirs] [@ref-goose-skills-src-plugin-namespace]。文档从用户视角给出同样的命名空间约定（如 `my-plugin:review`），并说明插件技能在会话启动时被发现、用法与普通技能相同 [@ref-goose-skills-doc-plugin]。

文档给出的写作建议是：一个工作流或领域一个技能，语言清晰、步骤编号，并包含验证步骤 [@ref-goose-skills-doc-best]；技能与 `.goosehints`、recipe 的分工也由文档说明——.goosehints 适合通用偏好与重复指令，recipe 用于打包可分享的配置 [@ref-goose-skills-doc-best]。

技能名称在写入口有额外约束：非空、≤64 字符、只允许小写字母数字与连字符、首尾不能是连字符 [@ref-goose-skills-src-name-validate]；发现路径只额外禁止 `/` [@ref-goose-skills-src-parse]。

## 名称/描述的注入与正文、资源的按需加载 {#skills-loading}

每一次构建提示时进入上下文的只有技能名与描述，并按（名称，路径）排序；正文从不预载 [@ref-goose-skills-src-client-instr]。状态机侧同样只生成一个 `# Skills` 小节，逐行给出 `- 名称: 描述` [@ref-goose-skills-src-ops]。

正文只在 `load_skill` 被调用时进入上下文；带参数时先做占位符替换，参数解析失败会作为工具错误返回而不是中断会话 [@ref-goose-skills-src-client-load]。加载后的文本会渲染成 `# Loaded Skill: 名称 (来源类型)`、描述、`## Content` 加正文；若技能带支持文件，再附 `## Supporting Files` 段，逐行给出「相对路径 -> 绝对路径（用 `load_skill(name: "技能名/相对路径")` 读取）」的提示 [@ref-goose-skills-src-loaded]。

支持文件用 `load_skill` 的 `技能名/相对路径` 形式读取，路径先按 `/` 切成父技能名与相对路径，再与该技能登记的支持文件清单比对（反斜杠归一为 `/`）；找不到时返回最多 10 条可用相对路径 [@ref-goose-skills-src-client-file]。读到的文件被包成 `# Loaded: 技能名` 加内容与 `File loaded into context.` 结尾，长度以字符计被 `max_tool_response_size` 减去包装长度裁剪 [@ref-goose-skills-src-supporting]。相对路径只允许常规分量，读取以 `openat`/`O_NOFOLLOW` 从技能目录逐级打开，符号链接无法逃出技能目录（Windows 用 `FILE_FLAG_OPEN_REPARSE_POINT` 检查）[@ref-goose-skills-src-supporting]。

未知技能名返回错误并给出最多 3 个大小写不敏感的子串近似名 [@ref-goose-skills-src-client-file]。

参数替换规则：`$ARGUMENTS[N]`（0 起）、裸 `$ARGUMENTS`、`$N`（1 起的位置参数）、以及仅在 `metadata.arguments` 中声明过的 `$name`；未声明的具名占位符保持字面量。如果正文里没有任何可解析占位符，则改为把原始参数以 `ARGUMENTS: 原文` 追加到末尾 [@ref-goose-skills-src-args]。

## 调用方式与生效条件 {#skills-invocation}

三条用户可见路径：

* 交互会话里的 `/skills [NAME...]`：不带参数列出可用技能，带参数按名加载一个或多个 [@ref-goose-skills-cli-doc]。
* 终端命令 `goose skills list`：列出当前工作目录可发现的技能 [@ref-goose-skills-cli-doc]。
* 把技能当斜杠命令用：`/skills` 之外的任何斜杠命令都会交给技能命令解析器，命中即注入一条对模型可见、对用户不可见的用户消息；解析为不适用则不注入，出错则渲染错误响应 [@ref-goose-skills-src-ops-command]。

模型侧没有独立的开关：自动使用是提示驱动——技能小节与 `load_skill` 的描述都要求模型在需要时先加载技能，再由 `load_skill` 提供正文 [@ref-goose-skills-src-client-load]。文档从用户视角描述同一行为：会话启动时把已发现技能的名称与描述加入指令，请求与技能用途匹配、或用户明确要求时会加载完整指令 [@ref-goose-skills-doc-intro]。

改变生效的条件有四项：

| 条件 | 作用 | 来源 |
| --- | --- | --- |
| 内置技能开关 | `with_builtin_skills(false)` 让发现阶段过滤掉内置技能；原始 `discover_skills`（状态机与 CLI 走这条）没有该开关，总是包含内置技能 | [@ref-goose-skills-src-client] |
| 会话模式 | `GooseMode::Chat` 下待执行的 `load_skill` 调用不执行，返回“聊天模式已跳过”的成功结果，也不触发钩子生命周期 | [@ref-goose-skills-src-chat] |
| 插件启用状态 | 插件技能目录只取已启用插件，判定链为 `config.yaml` 的 `plugins` 映射（`enabled: false` 剔除）→ 设置文件的 `enabledPlugins`/`disabledPlugins`（作用域优先 Local > Project > User，同作用域内 disabled 优先，均未列出即启用） | [@ref-goose-skills-src-roots] |
| 来源可写性 | 项目作用域插件技能以只读方式登记（`global=false`、`writable=false`），写操作会被拒绝；用户作用域插件技能可写 | [@ref-goose-skills-src-roots] |

文档另说明技能机制由内置的 Skills 平台扩展提供且默认启用 [@ref-goose-skills-doc-intro]；本轮固定快照未签出扩展注册点，因此「默认启用」只按文档记录。

## 诊断 {#skills-diagnostics}

`goose skills list` 输出五列表格：`Name | Description | Description tokens | Content tokens | Location`，描述压缩空白并截断到 50 字符，表格宽度随终端收缩，超宽时带省略号截断 [@ref-goose-skills-src-cli-list]。来源位置一列就是上一节的技能路径（内置技能显示为 `builtin://skills/NAME`）[@ref-goose-skills-src-scan]。

发现阶段的诊断只有 tracing 警告：frontmatter 解析失败、缺少必需 `name`、名称含 `/`、技能文件不可读各记一条警告，插件自动更新失败也记警告 [@ref-goose-skills-src-parse]。会话内的 `/skills` 输出则作为一条可见的助手消息返回 [@ref-goose-skills-src-ops-command]。

缺口：固定快照里没有技能重载或 verbose 子命令，改动 `SKILL.md` 后如何让运行中的会话看到新内容未被来源确立；发现无缓存、每次构建提示都会重扫，这只说明「新会话能看到改动」，对已在跑的会话不构成证据。

诊断覆盖不到的项：`crate::slash_commands::skill_slash_command`（技能如何变成斜杠命令、列表文案）与 `crate::token_counter`（token 计数口径）不在本次签出范围，token 两列的具体语义未能验证。
