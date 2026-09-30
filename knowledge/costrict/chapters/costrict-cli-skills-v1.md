---
schema_version: 3
record_kind: production
edition_id: costrict-cli-skills-v1
harness_id: costrict
topic: skills
title: "CoStrict CLI（CSC）的 Skills 机制"
sections:
  - section_id: skills-overview
    surface_ids: [cli]
    source_refs: [ref-costrict-skills-overview, ref-costrict-skills-locations, ref-costrict-api-intro]
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-costrict-skills-locations, ref-costrict-skills-overview, ref-costrict-skills-nested]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-costrict-skills-overview, ref-costrict-skills-support, ref-costrict-skills-frontmatter, ref-costrict-skills-frontmatter2, ref-costrict-skills-substitution]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-costrict-skills-control, ref-costrict-skills-overview, ref-costrict-skills-access, ref-costrict-skills-frontmatter2, ref-costrict-settings-hooks]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-costrict-skills-lifecycle, ref-costrict-skills-fork, ref-costrict-agents-skills, ref-costrict-skills-frontmatter2, ref-costrict-settings-hooks]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-costrict-skills-trouble, ref-costrict-skills-budget, ref-costrict-skills-lifecycle, ref-costrict-skills-nested, ref-costrict-plugins-test]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-costrict-skills-locations, ref-costrict-skills-overview, ref-costrict-skills-nested]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-costrict-skills-locations, ref-costrict-skills-overview, ref-costrict-skills-nested]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-costrict-skills-locations, ref-costrict-skills-overview, ref-costrict-skills-nested]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-costrict-skills-overview, ref-costrict-skills-support, ref-costrict-skills-frontmatter, ref-costrict-skills-frontmatter2, ref-costrict-skills-substitution]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-costrict-skills-overview, ref-costrict-skills-support, ref-costrict-skills-frontmatter, ref-costrict-skills-frontmatter2, ref-costrict-skills-substitution]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-costrict-skills-lifecycle, ref-costrict-skills-fork, ref-costrict-agents-skills, ref-costrict-skills-frontmatter2, ref-costrict-settings-hooks]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-costrict-skills-control, ref-costrict-skills-overview, ref-costrict-skills-access, ref-costrict-skills-frontmatter2, ref-costrict-settings-hooks]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: partial
        source_refs: [ref-costrict-skills-control, ref-costrict-skills-overview, ref-costrict-skills-access, ref-costrict-skills-frontmatter2, ref-costrict-settings-hooks]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-costrict-skills-trouble, ref-costrict-skills-budget, ref-costrict-skills-lifecycle, ref-costrict-skills-nested, ref-costrict-plugins-test]
---

## 固定来源与机制边界 {#skills-overview}

本章的固定来源是 CoStrict 官方文档站 `https://docs.costrict.ai/` 的 CSC（CoStrict CLI）页面快照：`/csc/tools-and-plugins/skills`、`/csc/tools-and-plugins/plugins`、`/csc/reference/plugins-reference`、`/csc/configuration/settings`、`/csc/reference/commands`。CoStrict 的命令行面没有可固定的官方 Git 仓库；`@costrict/csc` 是厂商在 npm 上发布的官方 CLI 包（维护者 `zgsm`，随官方文档的 `npm install -g @costrict/csc` 指引），因此本章按来源级知识（`version_applicability: unknown`）阅读，文档中出现的版本号（如 CSC 4.2.x）只作为该页面的陈述引用。

结论：CSC 的 Skill 是**开放 Agent Skills 标准**的实现，官方写明 "CSC Skills 遵循 Agent Skills 开放标准"，并用调用控制、Subagents 执行与动态上下文注入做了扩展。[@ref-costrict-skills-overview] 同一套目录约定也用于插件 Skills（`〔plugin〕/skills/〔name〕/SKILL.md`）与旧的 `.costrict/commands/*.md`。[@ref-costrict-skills-locations][@ref-costrict-skills-overview]

**命名边界**：官方 API 接入页把 "CoStrict CLI" 直接缩写为 CSC（"本文介绍如何在 CoStrict 插件和 CoStrict CLI（以下简称 CSC）中配置自己的模型 API"），因此本章把 CLI 面固定在 `csc` 命令上。文档站另有一节 `/cli/*` 描述旧命令 `cs`（配置文件为 `costrict.json`），与本章的 CSC 配置体系不同；本章不把两者混写。[@ref-costrict-api-intro]

## Skill 的存放位置与作用域 {#skills-roots}

Skill 是目录约定，没有集中登记表。作用域由存放位置决定：[@ref-costrict-skills-locations]

| 作用域 | 路径 | 适用范围 |
| :-- | :-- | :-- |
| 企业级 | 参见托管设置 | 组织中的所有用户 |
| 个人 | `~/.costrict/skills/〔skill-name〕/SKILL.md` | 你的所有项目 |
| 项目 | `.costrict/skills/〔skill-name〕/SKILL.md` | 仅此项目 |
| Plugins | `〔plugin〕/skills/〔skill-name〕/SKILL.md` | 启用 Plugins 的范围 |

同名时的优先级为 **企业级 > 个人 > 项目**；Plugins Skill 带 `plugin-name:skill-name` 命名空间，因此不与其他级别冲突。[@ref-costrict-skills-locations] 旧的 `.costrict/commands/*.md` 仍然有效并创建同样的 `/name`；**同名时 Skill 优先于命令**。[@ref-costrict-skills-overview]

**嵌套发现**：在子目录中工作时，CSC 会自动发现嵌套的 `.costrict/skills/`（例如编辑 `packages/frontend/` 中的文件时会查找 `packages/frontend/.costrict/skills/`），用于 monorepo 中按包划分 Skill。[@ref-costrict-skills-nested]

**额外目录的例外**：`--add-dir` 通常只授予文件访问权限，不参与配置发现；Skills 是例外——额外目录中的 `.costrict/skills/` 会被自动加载，并被实时变更检测捕获，可以在会话期间编辑而无需重启。其他 `.costrict/` 配置（Subagents、命令、输出样式）不从额外目录加载；额外目录的 `AGENTS.md` 默认也不加载，除非设置 `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`。[@ref-costrict-skills-nested]

**缺口（`skills.discovery`）**：固定来源说明了两个扫描位置、嵌套目录发现和额外目录例外，但没有给出目录递归深度、符号链接是否跟随、`.gitignore` 之类忽略规则是否影响 Skill 扫描，也没有扫描上限的说明。这些点保持未验证。

## SKILL.md 的字段、替换与支持文件 {#skills-format}

每个 Skill 是一个目录，入口必须是 `SKILL.md`（YAML frontmatter + Markdown 指令）；同目录还可放模板、示例、脚本与参考文档，并在 `SKILL.md` 中用相对路径指示何时读取。[@ref-costrict-skills-overview][@ref-costrict-skills-support]

frontmatter 字段全部可选，官方只推荐 `description`：[@ref-costrict-skills-frontmatter]

| 字段 | 必需 | 说明 |
| :-- | :--: | :-- |
| `name` | 否 | 显示名；省略则用目录名；小写字母、数字、连字符，最长 64 |
| `description` | 推荐 | CSC 用它决定何时使用；超过 250 字符会在列表中截断 |
| `argument-hint` | 否 | 自动完成提示，如 `[issue-number]` |
| `disable-model-invocation` | 否 | `true` 时只有用户能调用（默认 `false`） |
| `user-invocable` | 否 | `false` 时从 `/` 菜单隐藏，只由模型调用（默认 `true`） |
| `allowed-tools` | 否 | Skill 激活时免批准的工具（空格分隔字符串或 YAML 列表） |
| `model` / `effort` | 否 | 激活时使用的模型 / 努力级别（`low`、`medium`、`high`、`max`） |
| `context` / `agent` | 否 | `context: fork` 在分叉的 Subagents 上下文中运行，`agent` 指定代理类型 |
| `hooks` | 否 | 限定在该 Skill 生命周期的钩子 |
| `paths` | 否 | 限制自动激活的 glob 模式 |
| `shell` | 否 | `!`command`` 与围栏块使用的 shell（`bash` 或 `powershell`） |

其中 `model`、`effort`、`context`、`agent`、`hooks`、`paths`、`shell` 的取值与默认值取自同一页的字段表（`effort` 默认继承会话，`max` 仅 Opus 4.6；`paths` 用逗号分隔字符串或 YAML 列表）。[@ref-costrict-skills-frontmatter2]

**字符串替换**：`$ARGUMENTS`（全部参数，无占位符时以 `ARGUMENTS: 〔值〕` 追加）、`$ARGUMENTS[N]` 与 `$N`（0 起始的索引参数）、`${CLAUDE_SESSION_ID}`、`${CLAUDE_SKILL_DIR}`（含 `SKILL.md` 的目录；插件 Skill 指向插件内子目录而非插件根）。索引参数按 shell 风格引用，可用引号把多词值作为单个参数。[@ref-costrict-skills-substitution]

## 调用方式与可用性控制 {#skills-invocation}

默认情况下用户与模型都可以调用任何 Skill：用户输入 `/skill-name`，模型在相关时自动加载。两个字段控制这一分工：[@ref-costrict-skills-control]

| frontmatter | 用户可调用 | 模型可调用 | 进入上下文的时机 |
| :-- | :--: | :--: | :-- |
| （默认） | 是 | 是 | description 常在上下文中，完整内容调用时加载 |
| `disable-model-invocation: true` | 是 | 否 | description 不进入上下文，完整内容在你调用时加载 |
| `user-invocable: false` | 否 | 是 | description 常在上下文中，完整内容调用时加载 |

CSC 还附带内置 Skills（`/simplify`、`/batch`、`/debug`、`/loop`、`/claude-api` 等），它们与内置命令一起列在命令参考中并以 "Skill" 标注；内置命令（如 `/help`、`/compact`、`/init`）不能通过 Skill 工具调用。[@ref-costrict-skills-overview][@ref-costrict-skills-access]

**程序化调用的收窄**（三条路径）：[@ref-costrict-skills-access]

- 在 `/permissions` 中拒绝 `Skill` 工具可禁用全部 Skill；
- 用 `Skill(name)`（精确）与 `Skill(name *)`（前缀 + 任意参数）规则允许或拒绝特定 Skill；
- 用 `disable-model-invocation: true` 从模型上下文中彻底移除某个 Skill。

`user-invocable` 只影响菜单可见性，不控制 Skill 工具访问。[@ref-costrict-skills-access] `allowed-tools` 只**授予**权限、不限制可用工具；要限制请写权限 deny 规则。[@ref-costrict-skills-frontmatter2]

**缺口（`skills.conditions`）**：固定来源说明了企业级托管分发的位置与 `disableSkillShellExecution` 对用户/项目/插件/额外目录来源 Skill 内联 shell 的关闭（捆绑与托管 Skill 不受影响），但没有给出影响 Skill 可用性的其他条件的完整清单——例如工作区信任、插件启用状态之外的开关、或按作用域禁用 Skill 的配置项。

**条件类控制**：企业管理员可通过托管设置做组织级分发；用户、项目、插件与额外目录来源的 Skill 中，`` !`command` `` 与 ```! 围栏块的内联 shell 执行可以被设置 `disableSkillShellExecution: true` 关闭（命令被替换为 `[shell command execution disabled by policy]`，捆绑与托管 Skill 不受影响）。[@ref-costrict-skills-access][@ref-costrict-settings-hooks]

## 进入上下文的时机与生命周期 {#skills-loading}

处理链是三段式：发现时只加载 `name` 与 `description`，调用时把**渲染后的** `SKILL.md` 内容作为单条消息注入对话，此后整个会话保留；CSC 不会在后续轮次重读 Skill 文件，因此 Skill 里应写成长期有效的指令而不是一次性步骤。[@ref-costrict-skills-lifecycle]

**自动压缩**时，CSC 会在 token 预算内把已调用 Skill 向前传递：摘要后重新附加每个 Skill 最近一次调用（每个 Skill 保留前 5,000 token），重新附加的 Skill 共享 25,000 token 的组合预算，从最近调用者开始填充——因此调用很多 Skill 时较早的会在压缩后被丢弃。若 Skill 看起来在第一次响应后失效，官方建议加强 description 与指令、用 Hooks 强制执行，或在压缩后重新调用。[@ref-costrict-skills-lifecycle]

**Subagents 路径**：`context: fork` 时 Skill 内容成为驱动 Subagents 的提示（无法访问主对话历史），`agent` 字段选择内置（`Explore`、`Plan`、`general-purpose`）或 `.costrict/agents/` 中的自定义 Subagents，省略时使用 `general-purpose`。方向相反的做法是在 Subagents 的 `skills` 字段里预加载 Skill，此时**完整内容在启动时注入**（Subagents 不继承父对话的 Skill）。[@ref-costrict-skills-fork][@ref-costrict-agents-skills]

**动态注入**：`` !`command` `` 在内容发送给模型之前执行，输出替换占位符（属于预处理，不是模型执行的命令）；多行命令用 ```! 围栏块。该行为可由 `disableSkillShellExecution` 按来源关闭。[@ref-costrict-skills-frontmatter2][@ref-costrict-settings-hooks]

## 诊断与重载 {#skills-diagnostics}

- 发现与调用排查（官方故障排除表要点）：Skill 未触发 → 检查 description 是否含用户会说的关键词、确认它出现在"有哪些 Skills 可用？"的回答中、改用更接近 description 的措辞、或直接 `/skill-name` 调用；触发过于频繁 → 让 description 更具体或设 `disable-model-invocation: true`。[@ref-costrict-skills-trouble]
- **描述预算**：Skill 名称始终在上下文中，但很多 Skill 时 description 会被缩短（预算按上下文窗口的 1% 动态缩放，回退值 8,000 字符，单条上限 250 字符）；用 `SLASH_COMMAND_TOOL_CHAR_BUDGET` 调高上限，或把关键用例前置。[@ref-costrict-skills-budget]
- **重载**：Skill 在**会话启动时**加载；手动新增文件后要重启会话或用 `/agents` 立即加载（后者对应 Subagents，Skills 随会话启动）。修改 `--add-dir` 目录中的 Skill 例外——它们被实时变更检测捕获，无需重启。[@ref-costrict-skills-lifecycle][@ref-costrict-skills-nested]
- 插件内的 Skill 改动用 `/reload-plugins` 生效，因为该命令会重新加载 Plugins、Skills、代理、Hooks、插件 MCP 与 LSP 服务器。[@ref-costrict-plugins-test]
