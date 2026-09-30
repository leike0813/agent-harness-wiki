---
schema_version: 3
record_kind: production
edition_id: cursor-cli-skills-v1
harness_id: cursor
topic: skills
title: Cursor 的 Agent Skills：目录、格式、发现、调用与诊断
sections:
  - section_id: skills-scope
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-how
      - ref-cur-skills-doc-builtin-intro
  - section_id: skills-roots
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-dirs-table
      - ref-cur-skills-doc-dirs-local
      - ref-cur-skills-doc-dirs-compat
      - ref-cur-skills-doc-nested-project
      - ref-cur-skills-doc-nested-scope
      - ref-cur-skills-doc-install-repo
      - ref-cur-skills-cli-other-tools
      - ref-cur-skills-cli-nested
      - ref-cur-skills-cli-plugin-dir
      - ref-cur-skills-cli-sticky
      - ref-cur-skills-plugins-components
      - ref-cur-skills-plugins-install
  - section_id: skills-format
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-structure
      - ref-cur-skills-doc-format-example
      - ref-cur-skills-doc-frontmatter-core
      - ref-cur-skills-doc-frontmatter-paths-disable
      - ref-cur-skills-doc-frontmatter-mode
      - ref-cur-skills-doc-optional-dirs
      - ref-cur-skills-doc-scripts-dir
      - ref-cur-skills-doc-scripts-run
  - section_id: skills-discovery
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-how
      - ref-cur-skills-doc-dirs-table
      - ref-cur-skills-doc-nested-walk
      - ref-cur-skills-doc-nested-project
      - ref-cur-skills-doc-nested-scope
      - ref-cur-skills-cli-sticky
      - ref-cur-skills-cli-symlinks
      - ref-cur-skills-cli-add-dir
      - ref-cur-skills-cli-nested
      - ref-cur-skills-plugins-local-symlink
  - section_id: skills-collision
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-dirs-table
      - ref-cur-skills-plugins-local-admin
      - ref-cur-skills-plugins-publish
  - section_id: skills-extensions
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-paths
      - ref-cur-skills-doc-globs-legacy
      - ref-cur-skills-doc-disable-invocation
      - ref-cur-skills-doc-frontmatter-mode
      - ref-cur-skills-doc-custom-mode-icons
      - ref-cur-skills-cli-user-invocable
      - ref-cur-skills-plugins-components
      - ref-cur-skills-plugins-standard
      - ref-cur-skills-plugins-manifest-paths
      - ref-cur-skills-customize-components
  - section_id: skills-loading
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-progressive
      - ref-cur-skills-doc-how
      - ref-cur-skills-doc-frontmatter-core
      - ref-cur-skills-doc-optional-dirs
  - section_id: skills-invocation
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-how
      - ref-cur-skills-doc-disable-invocation
      - ref-cur-skills-doc-custom-mode
      - ref-cur-skills-doc-builtin-intro
      - ref-cur-skills-doc-builtin-rows
      - ref-cur-skills-doc-builtin-run
      - ref-cur-skills-cli-custom-modes
      - ref-cur-skills-cli-sticky
      - ref-cur-skills-cli-user-invocable
      - ref-cur-skills-cli-plugin-skills
      - ref-cur-skills-plugins-manage
      - ref-cur-skills-worktrees-ide
  - section_id: skills-conditions
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-sync-scope
      - ref-cur-skills-doc-sync-steps
      - ref-cur-skills-doc-sync-stop
      - ref-cur-skills-doc-team-controls
      - ref-cur-skills-doc-dirs-local
      - ref-cur-skills-cli-coverage
      - ref-cur-skills-plugins-local-admin
      - ref-cur-skills-plugins-install-modes
      - ref-cur-skills-plugins-allow-publish
      - ref-cur-skills-plugins-marketplace-access
      - ref-cur-skills-plugins-publish-after
      - ref-cur-skills-customize-scope
  - section_id: skills-diagnostics
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-viewing
      - ref-cur-skills-cli-browser
      - ref-cur-skills-cli-add-dir
      - ref-cur-skills-cli-coverage
      - ref-cur-skills-plugins-local-dir
      - ref-cur-skills-plugins-manage
      - ref-cur-skills-customize-scope
  - section_id: skills-migration
    surface_ids: [cli, cursor]
    source_refs:
      - ref-cur-skills-doc-migrate-intro
      - ref-cur-skills-doc-migrate-converts
      - ref-cur-skills-doc-migrate-exclusions
      - ref-cur-skills-doc-builtin-rows
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-roots
        status: partial
        source_refs:
          - ref-cur-skills-doc-dirs-table
          - ref-cur-skills-doc-dirs-local
          - ref-cur-skills-doc-dirs-compat
          - ref-cur-skills-doc-nested-project
          - ref-cur-skills-cli-other-tools
          - ref-cur-skills-cli-sticky
          - ref-cur-skills-cli-plugin-dir
          - ref-cur-skills-plugins-components
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-discovery
        status: partial
        source_refs:
          - ref-cur-skills-doc-how
          - ref-cur-skills-doc-nested-walk
          - ref-cur-skills-doc-nested-project
          - ref-cur-skills-doc-nested-scope
          - ref-cur-skills-cli-sticky
          - ref-cur-skills-cli-symlinks
          - ref-cur-skills-cli-add-dir
          - ref-cur-skills-cli-nested
  - question_id: skills.collision
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-collision
        status: partial
        source_refs:
          - ref-cur-skills-doc-dirs-table
          - ref-cur-skills-plugins-local-admin
          - ref-cur-skills-plugins-publish
  - question_id: skills.format
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-format
        status: answered
        source_refs:
          - ref-cur-skills-doc-structure
          - ref-cur-skills-doc-frontmatter-core
          - ref-cur-skills-doc-frontmatter-paths-disable
          - ref-cur-skills-doc-frontmatter-mode
          - ref-cur-skills-doc-optional-dirs
          - ref-cur-skills-doc-scripts-dir
          - ref-cur-skills-doc-scripts-run
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-extensions
        status: answered
        source_refs:
          - ref-cur-skills-doc-paths
          - ref-cur-skills-doc-globs-legacy
          - ref-cur-skills-doc-disable-invocation
          - ref-cur-skills-doc-frontmatter-mode
          - ref-cur-skills-doc-custom-mode-icons
          - ref-cur-skills-cli-user-invocable
          - ref-cur-skills-plugins-components
          - ref-cur-skills-plugins-standard
  - question_id: skills.loading
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-loading
        status: answered
        source_refs:
          - ref-cur-skills-doc-progressive
          - ref-cur-skills-doc-how
          - ref-cur-skills-doc-frontmatter-core
          - ref-cur-skills-doc-optional-dirs
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-invocation
        status: answered
        source_refs:
          - ref-cur-skills-doc-how
          - ref-cur-skills-doc-disable-invocation
          - ref-cur-skills-doc-builtin-rows
          - ref-cur-skills-doc-builtin-run
          - ref-cur-skills-cli-custom-modes
          - ref-cur-skills-cli-sticky
          - ref-cur-skills-cli-user-invocable
          - ref-cur-skills-cli-plugin-skills
          - ref-cur-skills-plugins-manage
          - ref-cur-skills-worktrees-ide
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-conditions
        status: partial
        source_refs:
          - ref-cur-skills-doc-sync-scope
          - ref-cur-skills-doc-sync-steps
          - ref-cur-skills-doc-sync-stop
          - ref-cur-skills-doc-team-controls
          - ref-cur-skills-doc-dirs-local
          - ref-cur-skills-cli-coverage
          - ref-cur-skills-plugins-local-admin
          - ref-cur-skills-plugins-install-modes
          - ref-cur-skills-plugins-allow-publish
          - ref-cur-skills-plugins-marketplace-access
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli, cursor]
        section_id: skills-diagnostics
        status: partial
        source_refs:
          - ref-cur-skills-doc-viewing
          - ref-cur-skills-cli-browser
          - ref-cur-skills-cli-add-dir
          - ref-cur-skills-cli-coverage
          - ref-cur-skills-plugins-local-dir
          - ref-cur-skills-plugins-manage
          - ref-cur-skills-customize-scope
---

## 固定来源与界面边界 {#skills-scope}

本章事实来源全部是 2026-09-30 抓取的官方文档快照：`skills.md`（Agent Skills 总页）、`plugins.md`（插件与团队市场）、`customize-cursor.md`（Customize 页）、`cli/using.md`（CLI 交互）、`cli/changelog.md`（CLI 变更日志）、`configuration/worktrees.md`（工作树）。所有引用绑定到这些页面的快照，`excerpt` 是对应原文的逐字片段；正文不联网校验，也不虚构未登记来源。

界面口径：catalog 为 Cursor 登记了两个界面——`cli`（Cursor CLI）与 `cursor`（Cursor IDE）。`skills.md` 是跨界面共享页，它既写通用机制（"When Cursor starts, it automatically discovers skills from skill directories"）[@ref-cur-skills-doc-how]，也写 IDE 侧入口（Customize 侧栏、Settings → Agents）；内置 skill 由 Cursor 管理、与用户自有 skill 并列出现 [@ref-cur-skills-doc-builtin-intro]。`cli/changelog.md` 描述 CLI 侧行为。因此本章把共享机制写一次，只在有来源支撑处区分：CLI 专属行为（`/skills` 浏览、`-p` 打印模式、`/add-dir` 刷新、隐藏目录与符号链接扫描、`user-invocable` 字段）逐处标注，IDE 专属行为（Customize 页、Settings → Agents、`/worktree` 类技能）同样标注。

缺口：Cursor 文档里的 `agent/prompting.md#custom-modes`（Custom Modes 页）没有被登记为本轮固定来源，因此 Custom Mode 的完整语义（模式列表、模式切换、与非 skill 模式的关系）无法从固定来源核验；本章只写 `skills.md` 与 CLI 文档中关于「用 skill 作 Custom Mode」的表述。产品没有登记的 npm 包，也没有软件版本映射，本章按来源级知识阅读；正文出现的版本号（如内置迁移技能标注的 "2.4"）一律来自原文，不代表整章适用版本。

## 目录结构与 SKILL.md 格式 {#skills-format}

一个 skill 是「目录包」：目录内必须有 `SKILL.md`，其余是可选的资源子目录（官方示例含 `scripts/`、`references/`、`assets/`）[@ref-cur-skills-doc-structure]。占位符 `{...}` 为普通文本：

```text
.agents/
└── skills/
    └── deploy-app/
        ├── SKILL.md
        ├── scripts/
        │   ├── deploy.sh
        │   └── validate.py
        ├── references/
        │   └── REFERENCE.md
        └── assets/
            └── config-template.json
```

`SKILL.md` 由 YAML frontmatter 与随后的 Markdown 正文组成。官方给出的示例（此处只摘取开头一段）[@ref-cur-skills-doc-format-example]：

```markdown
---
name: my-skill
description: Short description of what this skill does and when to use it.
---

# My Skill

Detailed instructions for the agent.
```

字段清单（官方表格逐项）[@ref-cur-skills-doc-frontmatter-core][@ref-cur-skills-doc-frontmatter-paths-disable][@ref-cur-skills-doc-frontmatter-mode]：

| 字段 | 必填 | 说明 |
| :-- | :-- | :-- |
| `name` | 是 | skill 标识；只允许小写字母、数字与连字符，且必须与所在文件夹同名。 |
| `description` | 是 | 说明 skill 做什么、何时使用；agent 用它判断相关性。 |
| `paths` | 否 | 限定作用域的 glob 模式；接受逗号分隔字符串或列表，设置了就只在匹配文件被处理时对外呈现。 |
| `disable-model-invocation` | 否 | 设为 `true` 时只在显式 `/skill-name` 调用时进入上下文。 |
| `icon` | 否 | 作为 Custom Mode 时徽标用的图标，默认闪电图标。 |
| `color` | 否 | 徽标颜色，取值 `default`、`green`、`cyan`、`blue`、`purple`、`magenta`、`orange`、`yellow`、`red` 或 `brand`。 |
| `metadata` | 否 | 任意键值映射，官方只说明「用于附加元数据」。 |

正文解析：frontmatter 之后即 skill 正文，按 Markdown 交给 agent 使用。固定来源没有给出正文长度或 token 上限，也没有说明无法识别的额外 frontmatter 键是被忽略、报错还是保留 —— 这属于缺口。

可选目录 [@ref-cur-skills-doc-optional-dirs]：`scripts/` 放 agent 可执行的代码，`references/` 放按需加载的补充文档，`assets/` 放模板、图片或数据等静态资源。官方建议保持 `SKILL.md` 精简、把细节移到单独文件，因为资源是渐进加载的。

脚本：`scripts/` 中的文件在 skill 被调用时由 agent 执行，`SKILL.md` 用相对 skill 根目录的路径引用它们 [@ref-cur-skills-doc-scripts-dir][@ref-cur-skills-doc-scripts-run]。脚本可用 Bash、Python、JavaScript 或实现支持的任何可执行形式，官方要求自包含、错误信息有用并能处理边界情况。固定来源没有规定脚本的执行超时、工作目录与权限边界。

## 自动加载的位置与作用域 {#skills-roots}

官方列出的自动加载位置 [@ref-cur-skills-doc-dirs-table]：

| 位置 | 作用域 |
| :-- | :-- |
| `.agents/skills/` | 项目级 |
| `.cursor/skills/` | 项目级 |
| `~/.agents/skills/` | 用户级（本机全局） |
| `~/.cursor/skills/` | 用户级（本机全局） |

项目级两项随仓库/工作区根变化（嵌套一节说明仓库里任意位置的同类目录都会被拾取）[@ref-cur-skills-doc-nested-project]；用户级路径相对 home 解析（`~/.agents/skills/`、`~/.cursor/skills/`）。用户级 `~/.cursor/skills/` 只留在本机，除非同步给 Cloud Agents 或发布到团队市场；Cursor 不会把 `~/.agents/skills/` 或未同步的本地 skill 复制到 Cloud Agents、Agents Window 远程 SSH 会话或自托管 worker [@ref-cur-skills-doc-dirs-local]。Cursor 还兼容 Claude 与 Codex 的目录：`.claude/skills/`、`.codex/skills/`、`~/.claude/skills/`、`~/.codex/skills/` [@ref-cur-skills-doc-dirs-compat]；CLI 变更日志中的对应条目只列了 `.claude/skills`、`.agents/skills`、`.codex/skills` [@ref-cur-skills-cli-other-tools]。

嵌套项目目录：仓库里任意位置的 `.cursor/skills/`（或 `.agents/skills/`）都会被拾取，因此 monorepo 可以把 skill 与它适用的包放在一起，且这些 skill 会自动限定在该目录内 [@ref-cur-skills-doc-nested-project][@ref-cur-skills-doc-nested-scope]。CLI 侧同样「子目录里的 `.cursor/rules` 和 `.cursor/skills` 到处都会被探测，与 IDE 一致」[@ref-cur-skills-cli-nested]。

插件携带：插件可以把 skills 作为组件分发，Agent Plugins 与 Cursor Plugins 两种格式都支持 skills [@ref-cur-skills-plugins-components]；安装时选择 project 或 user 作用域 [@ref-cur-skills-plugins-install]。skill 不能单独导入 —— 从 GitHub 仓库引入 skill 必须先包成插件，并经市场发布/安装，skill 随插件到达并出现在 Customize 中 [@ref-cur-skills-doc-install-repo]。CLI 还可以用 `--plugin-dir` 直接加载本地插件目录 [@ref-cur-skills-cli-plugin-dir]。CLI 变更日志另提到托管 skill 的同步会把 skill 里的嵌套 Markdown 落盘到 `~/.cursor/skills-cursor`，可作为 CLI 侧托管/内置 skill 落盘位置的线索 [@ref-cur-skills-cli-sticky]。

缺口：固定来源没有给出「已安装插件」在磁盘上的确切目录（只给了本地开发目录 `~/.cursor/plugins/local`），也没有任何会改写这些查找路径的环境变量；项目级根目录如何随当前工作目录、`--add-dir` 与 `--workspace` 变化，skill 文档也没有说明。状态 partial。

## 发现时机与扫描范围 {#skills-discovery}

时机：Cursor 启动时自动从 skill 目录发现 skill 并让它对 Agent 可用 [@ref-cur-skills-doc-how]。CLI 侧 `/add-dir` 会立即刷新斜杠技能与自定义命令，只有在希望 agent 自动发现新 skill 时才需要重启 [@ref-cur-skills-cli-add-dir]。

结构与深度：Cursor 递归遍历 skills 根目录，找到任何 `SKILL.md` 就拾取；分类文件夹纯粹用于组织，skill 身份来自包含 `SKILL.md` 的那个文件夹 [@ref-cur-skills-doc-nested-walk]。四类根目录都会被扫描 [@ref-cur-skills-doc-dirs-table]。仓库内嵌套的 `.cursor/skills/`（或 `.agents/skills/`）同样被发现，并自动限定到该目录（相当于隐式设置了 `paths`）[@ref-cur-skills-doc-nested-project][@ref-cur-skills-doc-nested-scope]；CLI 侧声明与 IDE 一致 [@ref-cur-skills-cli-nested]。

忽略与符号链接：CLI 变更日志说 skill 与 subagent 扫描不再下探隐藏的点目录，以免大型嵌套目录拖慢加载 [@ref-cur-skills-cli-sticky]；skill 菜单会跟随符号链接目录 [@ref-cur-skills-cli-symlinks]。插件本地开发目录的符号链接只有在目标解析到该目录内部时才加载，指向磁盘别处插件仓库的符号链接会被跳过 [@ref-cur-skills-plugins-local-symlink]。

缺口：扫描深度上限、是否存在 ignore/排除清单、除 `SKILL.md` 外是否还有别的识别文件名，以及上述隐藏目录与符号链接规则是否同样适用于 IDE 侧，固定来源都没有写。状态 partial；已检查入口是 `skills.md` 的 Skill directories 与 Nested skill directories 两节，以及 `cli/changelog.md` 的相关条目。

## 同名冲突与优先级 {#skills-collision}

固定来源**没有**给出四类根目录之间同名 skill 的搜索顺序、覆盖或合并规则，也没有说明插件携带的 skill 与本地 skill 同名时谁生效。可追溯的相邻规则只有两条：

1. `~/.cursor/plugins/local` 下的本地插件：若已安装同名市场插件，以已安装的市场插件为准 [@ref-cur-skills-plugins-local-admin]。
2. 把个人 skill 发布到团队市场后，该 skill 改为从插件加载，而不再从本地文件夹加载 [@ref-cur-skills-plugins-publish]。

背景是四类根目录并列存在、没有文档化的优先级声明 [@ref-cur-skills-doc-dirs-table]。

状态 partial：目前只能确认「已安装的市场插件优先于同名本地插件目录」这一条与插件相关的取舍，用户级与项目级、内置与用户自有、多个插件之间的同名消解全都未定。要判定实际结果只能运行观察（IDE 看 Customize → Skills 的条目，CLI 用 `/skills`）。

## 宿主识别的专有字段与附加文件 {#skills-extensions}

除标准字段外，固定来源还记录了下列宿主识别项：

| 项 | 位置 | 默认 | 用途与解析 |
| :-- | :-- | :-- | :-- |
| `paths` | `SKILL.md` frontmatter | 未设置 = 始终可用 | glob 模式（列表或逗号分隔字符串）；设置后只在 agent 读取或编辑匹配文件时把 skill 呈现出来。模式遵循标准 glob 语法 [@ref-cur-skills-doc-paths]。 |
| `globs` | `SKILL.md` frontmatter | 无 | 旧字段，作为 `paths` 的回退仍被接受；新 skill 应改用 `paths` [@ref-cur-skills-doc-globs-legacy]。 |
| `disable-model-invocation` | `SKILL.md` frontmatter | 未设置 = 自动可用 | 设为 `true` 后行为像传统斜杠命令，只在显式 `/skill-name` 时进入上下文 [@ref-cur-skills-doc-disable-invocation]。 |
| `user-invocable` | `SKILL.md` frontmatter | 未设置 = 可被斜杠调用 | CLI 变更日志：设为 `false` 会把 skill 从 `/` 自动补全与键入的 `/skill-name` 解析中隐藏，同时保留模型可用 [@ref-cur-skills-cli-user-invocable]。`skills.md` 的字段表没有列这一项，属 CLI 侧字段。 |
| `icon` / `color` | `SKILL.md` frontmatter | 默认闪电图标 | 作为 Custom Mode 时的徽标样式；图标名来自 Cursor 图标集（如 `code`、`terminal`、`bug`、`git-branch`、`book-open`、`beaker`、`shield`、`rocket`），无法识别的图标或颜色回退到默认徽标 [@ref-cur-skills-doc-custom-mode-icons][@ref-cur-skills-doc-frontmatter-mode]。 |
| `scripts/`、`references/`、`assets/` | skill 目录 | 无 | 可选的脚本、补充文档与静态资源目录，随 skill 一起分发。 |
| 插件清单 | 插件根 | 无 | Agent Plugins 用根 `plugin.json`（含标准 schema 标识），Cursor Plugins 用 `.cursor-plugin/plugin.json`（只要求 `name`），组件从默认目录发现；两种格式都可携带 `skills/` 目录 [@ref-cur-skills-plugins-standard][@ref-cur-skills-plugins-components]。 |

Customize 页把 Skills 作为可独立管理的扩展组件列出，与 Plugins、Rules、Subagents、Hooks、Commands 并列 [@ref-cur-skills-customize-components]。

缺口：固定来源只列了上述字段，未说明是否还有其它被识别的 frontmatter 键、`metadata` 内是否有约定键；插件清单方面只说明「组件可从默认目录发现，也可在清单中指定自定义路径」[@ref-cur-skills-plugins-manifest-paths]，没有给出覆盖 `skills/` 的具体键名与语法。

## 名称、描述与正文何时进入上下文 {#skills-loading}

Skill 采用渐进披露：资源按需加载，以保持上下文占用高效 [@ref-cur-skills-doc-progressive]。启动时 agent 被呈现可用的 skill，并由它按上下文自行判断相关性 [@ref-cur-skills-doc-how]；`description` 正是 agent 判断相关性时看到的内容 [@ref-cur-skills-doc-frontmatter-core]。正文（`SKILL.md` 的 Markdown 指令）在 skill 被采用时才读取，`references/` 里的补充文档进一步按需加载，`scripts/` 的脚本在调用时执行 [@ref-cur-skills-doc-optional-dirs]。

缺口：固定来源没有说明名称与描述在上下文中的具体呈现格式与额度占用，也没有说明调用后读取资源所用的工具与路径解析细节。渐进披露这一机制本身有明确来源。

## 显式与自动调用 {#skills-invocation}

三类入口：

1. **自动**：默认情况下 agent 判断相关就自动应用 skill [@ref-cur-skills-doc-how][@ref-cur-skills-doc-disable-invocation]。
2. **显式斜杠**：在 Agent chat 输入 `/` 搜索 skill 名，这样调用只附着到一条消息 [@ref-cur-skills-doc-how]。
3. **Custom Mode**：在 `/` 菜单里用 Option+Enter（Mac）或 Alt+Enter（Windows）调用，让 skill 在整个会话保持生效 [@ref-cur-skills-doc-how]；CLI 文档给出同样口径（Enter 只附着一条消息，Option+Enter 进入 Custom Mode 直到退出）[@ref-cur-skills-cli-custom-modes]，CLI 变更日志把它描述为「粘性（sticky）skill 与自定义模式」[@ref-cur-skills-cli-sticky]。任何带有效 frontmatter 的 skill 都能充当一个 Custom Mode [@ref-cur-skills-doc-custom-mode]。

影响可用性的字段：`disable-model-invocation: true` 让 skill 只在显式 `/skill-name` 时进入上下文 [@ref-cur-skills-doc-disable-invocation]；`user-invocable: false` 把 skill 从斜杠补全与解析中隐藏，但模型仍可调用 [@ref-cur-skills-cli-user-invocable]。

内置 skills：Cursor 自带一组由官方管理、与用户自有 skill 并列出现的内置 skill，可用 `/` 运行，部分也会在请求明显匹配时被 agent 自动使用 [@ref-cur-skills-doc-builtin-intro][@ref-cur-skills-doc-builtin-run]。固定来源列出的条目包括 `/loop`（按指定间隔重复运行 prompt 或 skill）与 `/migrate-to-skills`（把符合条件的动态规则与斜杠命令转成 skill）[@ref-cur-skills-doc-builtin-rows]。

插件与 IDE：插件携带的 skill 会加载进会话 [@ref-cur-skills-cli-plugin-skills]，并出现在 Customize 的 Agent Decides 区，可用 `/skill-name` 手动调用 [@ref-cur-skills-plugins-manage]。IDE 侧还有以命令形式出现的 worktree 类技能：`/worktree` 与 `/best-of-n` 用来在隔离工作树中运行任务 [@ref-cur-skills-worktrees-ide]。

缺口：固定来源没有说明模型自动选择 skill 的阈值或排序、单轮能同时激活多少 skill、显式调用与自动选择冲突时谁优先，也没有工具级调用约定。

## 生效条件：本机、云端、团队与插件状态 {#skills-conditions}

- **本机与云端**：`~/.cursor/skills/` 的个人 skill 只在本机运行；要让 Cloud Agents 用同一批 skill，必须开启 Sync Skills for Cloud Agents [@ref-cur-skills-doc-sync-scope]。入口是 Settings → Agents → Context and Tools → Sync Skills for Cloud Agents（也可从 Customize → Skills 发起），Cursor 会复制 `~/.cursor/skills/` 的内容 [@ref-cur-skills-doc-sync-steps]。只有 `~/.cursor/skills/` 会同步，项目 skill 与 `~/.agents/skills/` 保持本地 [@ref-cur-skills-doc-sync-steps]；关闭同步会把已同步的 skill 移回本机 [@ref-cur-skills-doc-sync-stop]。Cursor 不会把 `~/.agents/skills/` 或未同步的本地 skill 复制到 Cloud Agents、Agents Window 远程 SSH 会话或自托管 worker，自托管 worker 上要用仓库里的项目 skill 或把 skill 打进镜像 [@ref-cur-skills-doc-dirs-local]。
- **团队管控**：Teams/Enterprise 管理员可在 Team Settings → Security & Identity 关闭 Sync Skills for Cloud Agents，关闭后全团队都不能同步；团队开关开启时成员仍各自决定是否同步 [@ref-cur-skills-doc-team-controls]。发布与同步是两件事：发布后同事可安装、Cursor 在团队仓库保存副本且作者自动获得，作者可用 Sync changes / Unpublish 管理，发布不会替他人安装，且「一个 skill 一个插件」[@ref-cur-skills-plugins-publish-after]。管理员可用 Allow Members to Publish 关闭成员发布（默认开启）[@ref-cur-skills-plugins-allow-publish]。
- **市场与安装方式**：团队市场插件的分发模式分 Default Off / Default On / Required [@ref-cur-skills-plugins-install-modes]；市场默认对团队所有人可用，管理员可在 Marketplace Settings → Marketplace Access 限制到指定组织组，团队管理员保留访问 [@ref-cur-skills-plugins-marketplace-access]；Customize 页可按你、工作区或团队作用域筛选已安装项 [@ref-cur-skills-customize-scope]。
- **本地插件导入**：Teams/Enterprise 由 Allow Local Plugin Imports（Dashboard → Settings → Security & Identity → Marketplace and Plugins）控制，Enterprise 默认关闭；已安装的同名市场插件优先于本地副本 [@ref-cur-skills-plugins-local-admin]。
- **启动入口**：CLI 侧 skill 在交互、headless 与编辑器集成模式下都会加载，`/skill-name` 在 `-p` 打印模式下也可用 [@ref-cur-skills-cli-coverage]。

缺口：工作区信任（CLI 的信任提示与 `--trust`）是否影响 skill 加载、禁用插件是否连带禁用其 skill、组织网络或权限策略对 skill 的其它限制，固定来源都没有说明。状态 partial。

## 查看、重载与刷新 {#skills-diagnostics}

- **IDE 查看**：Customize 侧栏 → Skills 可看到已发现的 skill；来自插件或项目的 skill 与 rules 一起出现在 Agent Decides 区 [@ref-cur-skills-doc-viewing]。Customize 还能按用户、工作区、团队作用域筛选 [@ref-cur-skills-customize-scope]，插件提供的 skill 也可以直接用 `/skill-name` 调用验证 [@ref-cur-skills-plugins-manage]。
- **CLI 查看**：`/skills` 浏览与内联 `/skill-name` 调用是 CLI 既有能力 [@ref-cur-skills-cli-browser]。
- **刷新与重载**：`/add-dir` 立即刷新斜杠技能与自定义命令，只有在希望 agent 自动发现新 skill 时才需要重启 [@ref-cur-skills-cli-add-dir]。本地开发插件时把插件放进 `~/.cursor/plugins/local`，然后重启 Cursor 或运行 Developer: Reload Window，再在 Customize 里确认 rules、skills、MCP 等组件是否出现 [@ref-cur-skills-plugins-local-dir]。
- **覆盖面自检**：CLI 侧「skill 在交互、headless、编辑器集成模式下都会加载、`-p` 打印模式下 `/skill-name` 可用」可作为是否已加载的检查口径 [@ref-cur-skills-cli-coverage]。

缺口：固定来源没有给出一条能列出「实际生效的 skill 文件路径与来源根」的诊断命令，也没有说明解析失败时的报错方式与输出字段。状态 partial；已检查入口为上述 Customize 页、`/skills`、`/add-dir` 与插件重载说明。

## 规则与命令迁移到 Skills {#skills-migration}

Cursor 2.4 起内置 `/migrate-to-skills` skill，用于把既有的动态规则与斜杠命令转成 skill [@ref-cur-skills-doc-migrate-intro]；它也是内置 skill 表中的条目之一 [@ref-cur-skills-doc-builtin-rows]。

迁移对象的判定与结果 [@ref-cur-skills-doc-migrate-converts]：

- **动态规则**：使用「Apply Intelligently」配置的规则，即 `alwaysApply: false`（或未定义）且没有定义 `globs` 模式的规则，转成标准 skill。
- **斜杠命令**：用户级与工作区级命令都会转成带 `disable-model-invocation: true` 的 skill，以保留其显式调用行为。

流程：在 Agent chat 输入 `/migrate-to-skills`，agent 找出符合条件的规则与命令并转换，随后在 `.cursor/skills/` 检查生成的 skill [@ref-cur-skills-doc-migrate-converts]。

不迁移的对象：`alwaysApply: true` 或带具体 `globs` 模式的规则（有与 skill 不同的显式触发条件），以及用户规则（不存放在文件系统上）[@ref-cur-skills-doc-migrate-exclusions]。
