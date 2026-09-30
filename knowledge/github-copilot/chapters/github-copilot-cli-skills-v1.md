---
schema_version: 3
record_kind: production
edition_id: github-copilot-cli-skills-v1
harness_id: github-copilot
topic: skills
title: "GitHub Copilot CLI 的 Agent Skills：位置、格式、发现、加载与诊断"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-github-copilot-skillsconc-about, ref-github-copilot-cmdref-skills-ref, ref-github-copilot-skills-vs-instr, ref-github-copilot-cmp-skills, ref-github-copilot-cmp-choose, ref-github-copilot-conc-customize, ref-github-copilot-pluginsconc-contain, ref-github-copilot-invoke-skills]
  - section_id: skills-locations-format
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmdref-skill-locations, ref-github-copilot-cfgdir-skills, ref-github-copilot-cmdref-env, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cmdref-options, ref-github-copilot-pluginref-locations, ref-github-copilot-pluginref-components, ref-github-copilot-skills-create, ref-github-copilot-cmdref-skill-frontmatter, ref-github-copilot-skills-example, ref-github-copilot-skills-script]
  - section_id: skills-discovery-collision
    surface_ids: [cli]
    source_refs: [ref-github-copilot-cmdref-slash, ref-github-copilot-skills-add, ref-github-copilot-skills-commands, ref-github-copilot-cmdref-skill-locations, ref-github-copilot-pluginref-components, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-pluginref-loading, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cmdref-skill-manage]
  - section_id: skills-loading-invocation
    surface_ids: [cli]
    source_refs: [ref-github-copilot-skills-using, ref-github-copilot-cmp-skills, ref-github-copilot-skills-script, ref-github-copilot-cmdref-skill-frontmatter, ref-github-copilot-cmdref-slash, ref-github-copilot-skills-commands, ref-github-copilot-cmdref-skill-manage, ref-github-copilot-pluginref-components]
  - section_id: skills-conditions-diagnostics
    surface_ids: [cli]
    source_refs: [ref-github-copilot-config-trust, ref-github-copilot-conc-trust, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-env, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-lsp-setup-skill, ref-github-copilot-skills-add, ref-github-copilot-skills-commands, ref-github-copilot-cmdref-skill-manage]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-github-copilot-cmdref-skill-locations, ref-github-copilot-cfgdir-skills, ref-github-copilot-cmdref-env, ref-github-copilot-cmdref-options, ref-github-copilot-pluginref-locations, ref-github-copilot-pluginref-components, ref-github-copilot-cfgdir-user-settings]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-github-copilot-cmdref-slash, ref-github-copilot-skills-add, ref-github-copilot-skills-commands, ref-github-copilot-cmdref-skill-locations, ref-github-copilot-pluginref-components, ref-github-copilot-cfgdir-user-settings]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: answered
        source_refs: [ref-github-copilot-pluginref-loading, ref-github-copilot-cmdref-skill-locations, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-cmdref-skill-manage]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-locations-format
        status: answered
        source_refs: [ref-github-copilot-skills-create, ref-github-copilot-cmdref-skill-frontmatter, ref-github-copilot-skills-example]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-locations-format
        status: partial
        source_refs: [ref-github-copilot-skills-script, ref-github-copilot-cmdref-skill-frontmatter, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cmdref-env, ref-github-copilot-pluginref-components, ref-github-copilot-skills-create]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: partial
        source_refs: [ref-github-copilot-skills-using, ref-github-copilot-cmp-skills, ref-github-copilot-skills-script]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-loading-invocation
        status: answered
        source_refs: [ref-github-copilot-skills-using, ref-github-copilot-cmdref-skill-frontmatter, ref-github-copilot-cmdref-slash, ref-github-copilot-skills-commands, ref-github-copilot-cmdref-skill-manage, ref-github-copilot-pluginref-components]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-github-copilot-config-trust, ref-github-copilot-conc-trust, ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-env, ref-github-copilot-cfgdir-user-settings, ref-github-copilot-cfgdir-repo-settings, ref-github-copilot-lsp-setup-skill]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions-diagnostics
        status: partial
        source_refs: [ref-github-copilot-cmdref-slash, ref-github-copilot-cmdref-env, ref-github-copilot-cmdref-skill-manage, ref-github-copilot-skills-add, ref-github-copilot-skills-commands, ref-github-copilot-cfgdir-user-settings]
---

## 固定来源与范围 {#skills-scope}

### 本章来源与阅读方式

本章的固定来源是官方文档站 docs.github.com 的 GitHub Copilot CLI 页面快照（`add-skills`、`about-agent-skills`、`cli-command-reference`、`cli-config-dir-reference`、`cli-plugin-reference`、`about-plugins`、`comparing-cli-features`、`add-lsp-servers`、`invoke-custom-agents`、`configure-copilot-cli` 等），以及公开仓库 github.com/github/copilot-cli 的 README/changelog/install.sh。

产品闭源、没有可读源码，因此本章是文档级知识：文档没有写明的解析与运行时细节一律按 partial/unknown 处理，凡标为 partial 的结论都只描述“文档所及的范围”。

Agent Skills 在本产品里是一组“指令、脚本与资源”的目录包，宿主在相关任务出现时按需加载；该规范是开放标准，GitHub 官方把它同时用于 cloud agent、code review、CLI、app 与 IDE agent mode，本章只覆盖 CLI 这一 surface [@ref-github-copilot-skillsconc-about]。

CLI 参考把 skill 定义为“扩展 CLI 能力的 Markdown 文件”：每个 skill 各占一个目录、内含 `SKILL.md`，被调用时（`/SKILL-NAME` 或由 agent 自动触发）其内容注入当前对话 [@ref-github-copilot-cmdref-skills-ref]。

### skill 与其它定制机制的关系

常驻型规则用 custom instructions，只在相关任务才需要的重复流程用 skill [@ref-github-copilot-skills-vs-instr]。对比文档把 skill 定位为“可按需调用的可重复工作流”，价值是标准化任务做法、提供“just-in-time”指令、避免常驻内容占满上下文窗口 [@ref-github-copilot-cmp-skills]，并给出选型口径——要一个可随时显式调用的可重复流程就选 skill [@ref-github-copilot-cmp-choose]。

CLI 文档把 skill 与 custom agents、hooks、MCP、记忆并列为可定制项 [@ref-github-copilot-conc-customize]。skill 既可自建，也可由 plugin 以 `skills/` 子目录（内含 `SKILL.md`）的形式打包分发，因此本章与插件章节有交叉 [@ref-github-copilot-pluginsconc-contain]。“Use skills”一节只用一句话把读者引到创建指南，本身不含机制细节 [@ref-github-copilot-invoke-skills]。

以下按“位置与格式 → 发现与冲突 → 加载与调用 → 条件与诊断”展开。凡文档未覆盖的运行时细节（目录递归深度、符号链接处理、YAML 解析失败的回退行为等）在本章标为 unknown/partial。

## 位置、格式与宿主专有项 {#skills-locations-format}

### 位置与优先级（skills.roots）

CLI 参考给出按优先级排列的加载位置，同名时 first found wins [@ref-github-copilot-cmdref-skill-locations]：

| 位置 | 作用域 | 说明 |
| --- | --- | --- |
| `.github/skills/` | Project | 项目专用 skill |
| `.agents/skills/` | Project | 备用项目位置 |
| `.claude/skills/` | Project | Claude 兼容位置 |
| 父目录 `.github/skills/` | Inherited | monorepo 父目录支持 |
| `~/.copilot/skills/` | Personal | 所有项目共用的个人 skill |
| `~/.agents/skills/` | Personal | 跨项目共用的 agent skill |
| 插件目录 | Plugin | 已安装插件提供的 skill |
| `COPILOT_SKILLS_DIRS` | Custom | 追加目录（逗号分隔） |
| `--add-dir PATH` | Added root | 该目录下的 `.github/skills/`；属信任决定 |
| 随 CLI 内置 | Built-in | 最低优先级，可被任何来源覆盖 |
| 组织/企业托管 | Remote | 经 AHP relay 按需拉取内容 |

个人 skill 的落点是 `~/.copilot/skills/SKILL-NAME/SKILL.md`，对所有会话可用；同名时项目级优先于个人级 [@ref-github-copilot-cfgdir-skills]。`COPILOT_SKILLS_DIRS` 是逗号分隔的追加 skill 目录列表 [@ref-github-copilot-cmdref-env]。

`settings.json` 还有两个相关键：`skillDirectories`（string[]，默认 `[]`，在 `~/.copilot/skills/` 之外追加搜索目录）与 `ignoredSkillsLocations`（string[]，默认 `[]`，支持 `~` 相对路径）[@ref-github-copilot-cfgdir-user-settings]。

`--add-dir=PATH` 允许文件访问，并把该目录下的 `.github/skills` 与 `.github/agents` 作为受信配置加载；同一机制也适用于 SDK 的 `additionalDirectories` [@ref-github-copilot-cmdref-options]。home 位置本身随 `COPILOT_HOME` 移动，因此 `~/.copilot/skills/` 与 `~/.agents/skills/` 都跟着变 [@ref-github-copilot-cmdref-env]。

插件自带 skill：Agent Plugins 1.0 固定从 `skills/` 发现（无根 `SKILL.md` 回退）；legacy 插件默认也是 `skills/`，可在 manifest 里改写，且没有任何 `skills/` 目录时回退到插件根的 `SKILL.md` [@ref-github-copilot-pluginref-locations]；`skills` 就是这样一个可配置的组件路径字段 [@ref-github-copilot-pluginref-components]。

缺口：文档没有对 skill 位置给出“从当前目录向上到 Git 根逐级查找”的细节（该措辞只出现在 custom agents 一节），也未说明符号链接跟随、目录嵌套深度与基于 gitignore 的忽略规则（`ignoredSkillsLocations` 是唯一的显式忽略机制），这些按 partial 阅读。

### `SKILL.md` 格式（skills.format）

`SKILL.md` 是带 YAML frontmatter 的 Markdown，文件名必须确切为 `SKILL.md`；skill 目录名建议小写并用连字符代替空格 [@ref-github-copilot-skills-create]。CLI 参考给出 frontmatter 字段表 [@ref-github-copilot-cmdref-skill-frontmatter]：

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | string | 是 | 唯一标识，字母或数字开头，仅含字母、数字、连字符、下划线、点、冒号与空格，最长 64 字符；冒号用于命名空间名（如 `my-plugin:search`） |
| `description` | string | 是 | 做什么、何时使用，最长 1024 字符 |
| `argument-hint` | string | 否 | 描述期望参数的提示，显示在 skill 选择器里（如 `"[target] [mode]"`） |
| `allowed-tools` | string 或 string[] | 否 | 逗号分隔列表或 YAML 数组，skill 激活时自动放行的工具；`"*"` 表示全部 |
| `user-invocable` | boolean | 否 | 用户能否用 `/SKILL-NAME` 调用，默认 `true` |
| `disable-model-invocation` | boolean | 否 | 阻止 agent 自动调用，默认 `false` |

创建指南要求 skill 目录名小写、用连字符代替空格，且 `name` 通常与目录名一致 [@ref-github-copilot-skills-create]。文档给出的完整示例 `github-actions-failure-debugging` 展示了 `name`、`description` 两个必填字段加 Markdown 正文步骤的最小形态 [@ref-github-copilot-skills-example]：

```markdown
---
name: github-actions-failure-debugging
description: Guide for debugging failing GitHub Actions workflows. Use this when asked to debug failing GitHub Actions workflows.
---

To debug failing GitHub Actions workflows in a pull request, follow this process...
```

除正文外，skill 目录可放脚本与资源；被调用时 Copilot 会自动发现 skill 目录内的所有文件并使其连同指令一起可用，由 `SKILL.md` 正文说明何时、如何调用这些脚本 [@ref-github-copilot-skills-script]。

### 宿主专有项（skills.extensions）

宿主额外识别、非标准核心的项包括——`allowed-tools`（列出的工具在 skill 激活时自动放行，未列出的仍需逐次确认；官方警告仅在对来源完全信任时才预放行 `shell`/`bash`）[@ref-github-copilot-skills-script]；`user-invocable`（默认 `true`）与 `disable-model-invocation`（默认 `false`）[@ref-github-copilot-cmdref-skill-frontmatter]。

创建指南还列出可选 `license` 字段 [@ref-github-copilot-skills-create]。配置侧有 `disabledSkills`、`dynamicRetrieval.skills`（是否对该类做基于嵌入的检索）、`ignoredSkillsLocations`、`skillDirectories` 四个键 [@ref-github-copilot-cfgdir-user-settings]，以及环境变量 `COPILOT_SKILLS_DIRS` [@ref-github-copilot-cmdref-env]。

插件 manifest 的 `skills` 组件路径字段与 legacy 根 `SKILL.md` 回退是另一组宿主专有项 [@ref-github-copilot-pluginref-components]。文档没有定义 `scripts/` 等附带文件的目录约定与解析顺序，只说明“目录内所有文件都会被暴露”，因此扩展目录结构按 partial 处理。

## 发现与同名冲突 {#skills-discovery-collision}

### 发现时机与识别规则（skills.discovery）

发现发生在会话启动，以及执行 `/skills reload`（“从所有目录重新加载 skill”）时 [@ref-github-copilot-cmdref-slash]。新增 skill 后要么启动新会话，要么在会话内用 `/skills reload` 免重启，随后用 `/skills info SKILL-NAME` 确认已重载 [@ref-github-copilot-skills-add][@ref-github-copilot-skills-commands]。

识别规则：每个 skill 是独立子目录且内含 `SKILL.md` [@ref-github-copilot-cmdref-skill-locations]。插件里只识别 `skills/` 直接子目录中含 `SKILL.md` 的项，legacy 插件在无 `skills/` 时才回退根 `SKILL.md` [@ref-github-copilot-pluginref-components]。

`ignoredSkillsLocations` 可把指定目录及其子孙排除出发现，无论它由哪个位置提供 [@ref-github-copilot-cfgdir-user-settings]。

缺口：文档未说明目录递归深度、符号链接是否跟随、skill 目录内的嵌套子目录是否算独立 skill，也未给出基于 gitignore 的忽略规则（`ignoredSkillsLocations` 是唯一显式忽略机制），这些按 partial 阅读。

### 同名冲突与去重（skills.collision）

同名去重按“加载顺序 + first-found-wins，并以 `SKILL.md` 内的 `name` 字段为准”（不是目录名）[@ref-github-copilot-pluginref-loading]。搜索顺序即上一节的优先级表：项目级 > 继承级 > 个人级 > 插件 > 自定义目录 > 内置 > 远程 [@ref-github-copilot-cmdref-skill-locations]。

因此项目级或个人级的同名 skill 会静默忽略插件里的同名项，插件无法覆盖项目或个人配置 [@ref-github-copilot-pluginref-loading]。

插件之间同名时两个都保留，用插件限定名并存（如 `/my-plugin/search` 与 `/other-plugin/search`），裸名路由到优先级更高的插件；这一点只对 skill 成立，commands 仍按普通层级去重 [@ref-github-copilot-cmdref-skill-locations]。

禁用而非删除：用户级 `disabledSkills`（string[]，默认 `[]`，“被发现但不加载”）[@ref-github-copilot-cfgdir-user-settings]；仓库级 `.github/copilot/settings.json` 的同名键是“并集——仓库只能追加、不能移除” [@ref-github-copilot-cfgdir-repo-settings]。

`copilot skill remove` 只对“你自己添加的个人/项目 skill”生效，插件或内置 skill 不能用它删除，只能禁用 [@ref-github-copilot-cmdref-skill-manage]。

## 加载与调用 {#skills-loading-invocation}

### 何时进入上下文（skills.loading）

模型依据 prompt 与 skill 的 `description` 决定是否使用；一旦选中，`SKILL.md` 被注入 agent 上下文，agent 据此执行并可调用目录内的脚本与示例 [@ref-github-copilot-skills-using]。名称与描述是模型判断是否使用的依据 [@ref-github-copilot-cmp-skills]。

正文之外，skill 目录内的全部文件会被自动发现并随指令提供 [@ref-github-copilot-skills-script]。

缺口：文档没有说明名字/描述是否常驻于 system prompt、正文是否严格在调用时才读取、注入位置与大小上限，这些时序按 partial 阅读。

### 显式与自动调用（skills.invocation）

自动调用由 agent 按任务相关性触发。显式调用可把 skill 名写进 prompt 并冠以斜杠（如 `Use the /frontend-design skill to ...`），或在交互界面直接用 `/SKILL-NAME` [@ref-github-copilot-skills-using]。

frontmatter 的 `user-invocable`（默认 `true`）控制用户能否用 `/SKILL-NAME` 调用，`disable-model-invocation`（默认 `false`）阻止 agent 自动调用 [@ref-github-copilot-cmdref-skill-frontmatter]。

交互式命令：`/skills list` 列出可用 skill，裸 `/skills` 打开 dashboard 的 Skills 标签并可用方向键选择后 Enable/Disable，`/skills info NAME` 看详情，`/skills add|remove|reload` 做管理 [@ref-github-copilot-cmdref-slash][@ref-github-copilot-skills-commands]。

非交互：`copilot skill list [--json]`、`add source [--project]`、`remove name-or-directory`、`enable name`、`disable name`。其中“添加目录”是把目录注册为自定义来源而非复制，文件或 URL 则复制进个人或项目 skill 目录；等价交互命令是 `/skills add [--project] FILE|URL|DIRECTORY`，这套命令取代了已废弃的 `copilot plugins ... --skill` 形式 [@ref-github-copilot-cmdref-skill-manage]。

可调用性还会被策略收窄：`disable-model-invocation`/`user-invocable` 分别作用于模型侧与用户侧，插件提供的 skill 则随其插件生命周期启停 [@ref-github-copilot-pluginref-components]。

## 条件与诊断 {#skills-conditions-diagnostics}

### 生效条件（skills.conditions）

信任是第一道门。启动会话时会询问是否信任启动目录及其子树，信任目录决定 CLI 能在哪里读、改、执行文件 [@ref-github-copilot-config-trust][@ref-github-copilot-conc-trust]；项目级 skill 来自工作目录，因此受该信任门控。

`/add-dir`（及 `--add-dir`）以“信任决定”的方式加载新增根下的 `.github/skills` [@ref-github-copilot-cmdref-slash]。环境变量 `COPILOT_ALLOW_ALL` 设为恰好 `true` 时，无需提示即信任工作目录并加载该目录的 skills、plugins、MCP 与 hooks；它的其它真值写法只自动放行工具，不触发目录信任 [@ref-github-copilot-cmdref-env]。

功能开关：`disabledSkills` 让 skill 被发现但不加载，用户级为个人列表，仓库级为并集追加 [@ref-github-copilot-cfgdir-user-settings][@ref-github-copilot-cfgdir-repo-settings]。

插件生命周期：仅通过仓库 `enabledPlugins` 启用的插件是仓库作用域的，离开仓库或仓库禁用该插件时会拆掉其 MCP server 并停用其 agents 与 skills [@ref-github-copilot-cfgdir-repo-settings]。

外部 skill 可像 `lsp-setup` 那样，从 Awesome GitHub Copilot 下载后放进 `~/.copilot/skills/` 或 `.github/skills/` 使用 [@ref-github-copilot-lsp-setup-skill]。内置 skill 的存在与内容、远程（组织/企业）skill 的鉴权与缓存条件，文档未展开且 CLI 闭源，属 partial。

### 查看与重载（skills.diagnostics）

`/skills list` 列出全部可用 skill，`/skills info NAME` 显示详情与位置，`/skills reload` 从所有目录重新加载，`/env` 显示已加载的 instructions、MCP、skills、agents、hooks、plugins、LSP、extensions [@ref-github-copilot-cmdref-slash]。

裸 `/skills` 打开 dashboard 的 Skills 标签，而 `PLUGINS_DASHBOARD=false` 会禁用该 dashboard 以及非交互 `copilot plugin`/`copilot plugins` 命令 [@ref-github-copilot-cmdref-slash][@ref-github-copilot-cmdref-env]。

非交互侧，`copilot skill list --json` 每行形状为 `{ name, description, source, path, enabled }`，可用来核对发现结果、来源与路径 [@ref-github-copilot-cmdref-skill-manage]。

新增后确认：`/skills reload` 再 `/skills info SKILL-NAME`，或重启会话；`/skills` 列表与 `/skills info` 里的位置字段可辨认 skill 来自哪个目录 [@ref-github-copilot-skills-add][@ref-github-copilot-skills-commands]。`/chronicle skills create|review|status` 可从使用记录生成、复核并跟踪仓库 skill 提案 [@ref-github-copilot-cmdref-slash]。

当预期中的 skill 未出现时，应检查文件是否确切名为 `SKILL.md`、目录是否在受支持位置、是否被 `ignoredSkillsLocations` 排除或被 `disabledSkills` 禁用 [@ref-github-copilot-skills-add][@ref-github-copilot-cfgdir-user-settings]。

缺口：没有专门的“发现/解析逐条错误”输出，`/env` 与 `/skills` 只给已加载结果；frontmatter 解析失败或字段越界时的报错行为文档未写，属 unknown。
