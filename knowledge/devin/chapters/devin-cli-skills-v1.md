---
schema_version: 3
record_kind: production
edition_id: devin-cli-skills-v1
harness_id: devin
topic: skills
title: "Devin CLI 的 Skills：位置、格式、触发、加载与治理"
sections:
  - section_id: skills-scope
    surface_ids: [cli]
    source_refs: [ref-devin-index-vs, ref-devin-ext-where, ref-devin-skills-how]
  - section_id: skills-roots-format
    surface_ids: [cli]
    source_refs: [ref-devin-skills-locations, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-skillc-structure, ref-devin-skillc-frontmatter, ref-devin-skillc-fields, ref-devin-skillc-prompt, ref-devin-skillc-permissions, ref-devin-skillc-allowed, ref-devin-skills-example, ref-devin-skills-triggers, ref-devin-skillc-model, ref-devin-skillc-subagents, ref-devin-rules-local, ref-devin-plug-skillsrules, ref-devin-configfile-locations]
  - section_id: skills-discovery-collision
    surface_ids: [cli]
    source_refs: [ref-devin-plug-format, ref-devin-plug-levels, ref-devin-ext-where, ref-devin-rules-devin, ref-devin-rules-other, ref-devin-skills-how, ref-devin-plug-manifest, ref-devin-skills-locations, ref-devin-import-options, ref-devin-skillc-prompt, ref-devin-skillc-fields, ref-devin-skillc-subagents]
  - section_id: skills-invocation-conditions
    surface_ids: [cli]
    source_refs: [ref-devin-skills-triggers, ref-devin-skillc-fields, ref-devin-mcp-prompts, ref-devin-skillc-subagents, ref-devin-skillc-allowed, ref-devin-skillc-permissions, ref-devin-skills-thirdparty, ref-devin-plug-install, ref-devin-plug-levels, ref-devin-import-disable, ref-devin-cmd-skills, ref-devin-cmd-doctor, ref-devin-hooks-verify]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots-format
        status: partial
        source_refs: [ref-devin-skills-locations, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-skillc-structure, ref-devin-skillc-frontmatter, ref-devin-skillc-fields, ref-devin-skillc-prompt, ref-devin-skillc-permissions, ref-devin-skillc-allowed, ref-devin-skills-example, ref-devin-skills-triggers, ref-devin-skillc-model, ref-devin-skillc-subagents, ref-devin-rules-local, ref-devin-plug-skillsrules, ref-devin-configfile-locations]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-devin-plug-format, ref-devin-plug-levels, ref-devin-ext-where, ref-devin-rules-devin, ref-devin-rules-other, ref-devin-skills-how, ref-devin-plug-manifest, ref-devin-skills-locations, ref-devin-import-options, ref-devin-skillc-prompt, ref-devin-skillc-fields, ref-devin-skillc-subagents]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-discovery-collision
        status: partial
        source_refs: [ref-devin-plug-format, ref-devin-plug-levels, ref-devin-ext-where, ref-devin-rules-devin, ref-devin-rules-other, ref-devin-skills-how, ref-devin-plug-manifest, ref-devin-skills-locations, ref-devin-import-options, ref-devin-skillc-prompt, ref-devin-skillc-fields, ref-devin-skillc-subagents]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-roots-format
        status: answered
        source_refs: [ref-devin-skills-locations, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-skillc-structure, ref-devin-skillc-frontmatter, ref-devin-skillc-fields, ref-devin-skillc-prompt, ref-devin-skillc-permissions, ref-devin-skillc-allowed, ref-devin-skills-example, ref-devin-skills-triggers, ref-devin-skillc-model, ref-devin-skillc-subagents, ref-devin-rules-local, ref-devin-plug-skillsrules, ref-devin-configfile-locations]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-roots-format
        status: answered
        source_refs: [ref-devin-skills-locations, ref-devin-import-windsurf, ref-devin-import-claude, ref-devin-import-copilot, ref-devin-skillc-structure, ref-devin-skillc-frontmatter, ref-devin-skillc-fields, ref-devin-skillc-prompt, ref-devin-skillc-permissions, ref-devin-skillc-allowed, ref-devin-skills-example, ref-devin-skills-triggers, ref-devin-skillc-model, ref-devin-skillc-subagents, ref-devin-rules-local, ref-devin-plug-skillsrules, ref-devin-configfile-locations]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-conditions
        status: partial
        source_refs: [ref-devin-skills-triggers, ref-devin-skillc-fields, ref-devin-mcp-prompts, ref-devin-skillc-subagents, ref-devin-skillc-allowed, ref-devin-skillc-permissions, ref-devin-skills-thirdparty, ref-devin-plug-install, ref-devin-plug-levels, ref-devin-import-disable, ref-devin-cmd-skills, ref-devin-cmd-doctor, ref-devin-hooks-verify]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-conditions
        status: answered
        source_refs: [ref-devin-skills-triggers, ref-devin-skillc-fields, ref-devin-mcp-prompts, ref-devin-skillc-subagents, ref-devin-skillc-allowed, ref-devin-skillc-permissions, ref-devin-skills-thirdparty, ref-devin-plug-install, ref-devin-plug-levels, ref-devin-import-disable, ref-devin-cmd-skills, ref-devin-cmd-doctor, ref-devin-hooks-verify]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-conditions
        status: partial
        source_refs: [ref-devin-skills-triggers, ref-devin-skillc-fields, ref-devin-mcp-prompts, ref-devin-skillc-subagents, ref-devin-skillc-allowed, ref-devin-skillc-permissions, ref-devin-skills-thirdparty, ref-devin-plug-install, ref-devin-plug-levels, ref-devin-import-disable, ref-devin-cmd-skills, ref-devin-cmd-doctor, ref-devin-hooks-verify]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation-conditions
        status: partial
        source_refs: [ref-devin-skills-triggers, ref-devin-skillc-fields, ref-devin-mcp-prompts, ref-devin-skillc-subagents, ref-devin-skillc-allowed, ref-devin-skillc-permissions, ref-devin-skills-thirdparty, ref-devin-plug-install, ref-devin-plug-levels, ref-devin-import-disable, ref-devin-cmd-skills, ref-devin-cmd-doctor, ref-devin-hooks-verify]
---

## 固定来源与适用范围 {#skills-scope}

本章的固定来源是官方文档站 `docs.devin.ai` 上 Devin CLI 相关的 markdown 快照（本产品闭源，没有可固定的源码 commit）。主要用到 `cli/extensibility/skills/overview.md`、`cli/extensibility/skills/creating-skills.md`、`cli/extensibility/plugins/overview.md`、`cli/extensibility/configuration.md`、`cli/extensibility/index.md`、`cli/reference/commands.md`、`cli/reference/configuration/*.md`、`cli/enterprise/*.md`、`cli/reference/permissions.md`（经 permissions 章节交叉引用）。这些页面均未标注对应软件版本，只在个别处提到 "v3000.3（Local 3.6）"、"3000.10.20+" 等发行线，因此全章是来源级知识，不绑定任何已发布版本。

Devin CLI 与云端 Devin 是两套工具：CLI 跑在本机终端，使用本地文件与环境；云端 Devin 账户的 Knowledge、Playbooks、Secrets 目前**不**在 CLI 中提供 [@ref-devin-index-vs]。CLI 的扩展面由 rules、skills、subagents、MCP servers、hooks、plugins 六类机制组成，配置分散在 `~/.config/devin/`（Windows 为 `%APPDATA%\devin\`）与项目的 `.devin/` 目录 [@ref-devin-ext-where]。Skill 在这套分层里的定位是"按需注入的能力包"，与常驻的 rules 分工不同：rules 始终生效，skill 只在被调用时才把正文注入会话 [@ref-devin-ext-where][@ref-devin-skills-how]。

## 位置、格式与宿主专有项 {#skills-roots-format}

**skills.roots**：文档给出的发现位置与作用域如下 [@ref-devin-skills-locations]：

| 位置 | 作用域 | 是否提交到 git |
| - | - | - |
| `.agents/skills/NAME/SKILL.md` | 项目 | 是 |
| `.devin/skills/NAME/SKILL.md` | 项目 | 是 |
| `.windsurf/skills/NAME/SKILL.md` | 项目 | 是 |
| `~/.agents/skills/NAME/SKILL.md` | 全局 | 否 |
| `~/.config/devin/skills/NAME/SKILL.md` | 全局 | 否 |
| `~/.codeium/CHANNEL/skills/NAME/SKILL.md` | 全局（依赖 channel） | 否 |

项目层的 `.devin/skills/` 与 `.windsurf/skills/` 使用同一 `SKILL.md` 格式，随版本库共享 [@ref-devin-skills-locations]。全局路径按 XDG 约定；Windows 用 `%APPDATA%\devin\skills\NAME\SKILL.md` [@ref-devin-skills-locations]。`~/.codeium/` 下的 channel 目录取 `windsurf`、`windsurf-next` 或 `windsurf-insiders`，由 CLI 渠道决定；CLI 只读取与自己渠道匹配的那个目录（stable 读 `~/.codeium/windsurf/`、next 读 `~/.codeium/windsurf-next/`、insiders 读 `~/.codeium/windsurf-insiders/`）[@ref-devin-import-windsurf]。文档没有给出任何专门改写 skills 搜索根目录的环境变量，也没有说明 home 变量如何影响这些路径；这一点按 partial 阅读。

除以上原生位置外，导入机制还会就地读取别的工具的 skill：Claude Code 的 `.claude/skills/**/SKILL.md` 与其 `.claude/commands/**/*.md`（命令按 skill 处理）[@ref-devin-import-claude]，GitHub Copilot 的 `.github/skills/**/SKILL.md`（全局为 `~/.copilot/skills/`，设了 `COPILOT_HOME` 则读 `$COPILOT_HOME/skills/`）[@ref-devin-import-copilot]。这些 skill 不再迁移，原地按 `SKILL.md` 格式读取。Windsurf 的 workflows（`.windsurf/workflows/`）明确**不**作为 skill 导入 [@ref-devin-import-windsurf]；Copilot 的自定义指令文件也不导入 [@ref-devin-import-copilot]。

**skills.format**：一个 skill 是"目录包"——目录名是 skill 标识（也就是 `/NAME` 的调用名），包内 `SKILL.md` 由可选的 YAML frontmatter 加重担正文组成 [@ref-devin-skillc-structure][@ref-devin-skillc-frontmatter]。frontmatter 字段全集与默认值如下 [@ref-devin-skillc-fields]：

| 字段 | 类型 | 默认 | 说明 |
| - | - | - | - |
| `name` | string | 目录名 | 展示名 |
| `description` | string | 无 | 出现在斜杠补全里 |
| `argument-hint` | string | 无 | 命令名后的参数提示 |
| `model` | string | 当前模型 | 运行该 skill 时覆盖模型 |
| `subagent` | boolean | `false` | 以 subagent 方式运行 |
| `agent` | string | 无 | 用指定自定义 subagent profile 运行 |
| `allowed-tools` | list | 无 | 运行期间自动批准的工具 |
| `permissions` | object | 继承 | 该 skill 的 allow/deny/ask 覆盖 |
| `triggers` | list | `[user, model]` | 可被谁触发 |

frontmatter 之后是 prompt 正文，即注入会话的内容 [@ref-devin-skillc-prompt]。权限与自动批准的写法（来自官方字段参考与前缀示例）[@ref-devin-skillc-permissions][@ref-devin-skillc-allowed]：

```yaml
allowed-tools:            # 运行期间自动批准，不限制可用工具
  - read
  - grep
  - mcp__github__list_issues
permissions:              # 与主权限同语法，叠加于会话权限之上
  allow:
    - Read(src/**)
    - Exec(npm run test)
  deny:
    - Write(/etc/**)
    - exec
  ask:
    - Write(src/**)
```

最小示例来自官方技能的 `review` 例子 [@ref-devin-skills-example]：

```markdown
---
name: review
description: Review code changes before committing
allowed-tools:
  - read
  - grep
  - glob
  - exec
---

Review the current git diff and provide feedback.
```

**skills.extensions**：宿主识别但不属于"目录 + SKILL.md"核心的项有：

- `allowed-tools`：只做自动批准，**不是**工具限制；未列出的工具照常可用，只是会走正常权限检查（用户提示，或会话权限已允许时不提示）；省略该字段不会改变 skill 能用的工具，只是没有工具被预批准。要真正限制工具得用 `permissions.deny`（inline skill）或自定义 subagent profile（subagent 运行）。可用工具名是 `read`、`edit`、`grep`、`glob`、`exec`，也支持 MCP 工具名如 `mcp__github__list_issues` [@ref-devin-skillc-allowed]。
- `permissions`：与主权限配置同一语法，`allow`/`deny`/`ask` 在 skill 执行期间生效；它是**叠加**于会话基础权限之上而非替换，skill 不能授予被项目或组织层拒绝的权限；`deny` 可硬阻断整个工具（如 `exec`、`edit`）或 MCP 工具模式 [@ref-devin-skillc-permissions]。
- `triggers`：控制谁能触发，默认 `[user, model]` [@ref-devin-skills-triggers]。
- `model`：覆盖本次运行模型，取值同 `--model` 的模糊名（`opus`、`sonnet`、`swe`、`codex`） [@ref-devin-skillc-model]。
- `subagent` / `agent`：把 skill 变成独立 subagent 运行 [@ref-devin-skillc-subagents]。
- `.local.` 个人覆盖约定：与 `.devin/config.local.json`、`AGENTS.local.md` 同一套思路（个人文件不提交） [@ref-devin-rules-local]。

插件可以改写 skill 的加载目录：清单里的 `skills` 字段接受单个或一组插件内相对路径，空数组 `[]` 完全关闭 skill 加载；路径越界（绝对路径、`~`、`..`）会被拒绝并使整个清单失效 [@ref-devin-plug-skillsrules]。用户/项目/本地三层以及 MCP 专用文件的准确路径同样列在配置文件参考里 [@ref-devin-configfile-locations]。

## 发现、同名冲突与加载 {#skills-discovery-collision}

**skills.discovery**：文档说明 skill 由"agent 自动调用或用户斜杠命令调用"，但**没有**写明冷启动时的扫描时机、目录深度、符号链接与忽略规则。可以确认的相邻事实是：插件在会话开始时按已安装清单加载，其 skill 作为普通 skill 生效 [@ref-devin-plug-format]；插件被治理策略阻止时，其 skill 在会话启动时被跳过并给出指名 forbidder 的警告（soft-fail）[@ref-devin-plug-levels]。rules 类文件（`AGENTS.md`、`.devin/rules/*.md`、`.windsurf/rules/*.md`）的分层发现规则写得很明确——工作区根在会话开始时加载，子目录按需惰性加载，且向上回扫到工作区根 [@ref-devin-ext-where][@ref-devin-rules-devin][@ref-devin-rules-other]，但 skill 的对应扫描时机没有同等说明 [@ref-devin-skills-how]。缺口：扫描时机、目录深度、`node_modules`/`.gitignore` 忽略规则、符号链接均未记载，按 partial 阅读。

**skills.collision**：文档没有给出两个同名普通 skill 的去重或覆盖规则。可确认的是插件的 skill 带命名空间：安装插件后其 skill 以 `/PLUGIN:SKILL` 暴露 [@ref-devin-plug-format]，因此插件之间、插件与本地 skill 之间不会直接撞名；插件还要求自身名字在已安装插件中唯一 [@ref-devin-plug-manifest]。本地多来源（`.agents/`、`.devin/`、`.windsurf/`、`~/.agents/`、`~/.config/devin/`）之间的同层/跨层优先级未记载 [@ref-devin-skills-locations]。`read_config_from` 可以按来源整体开关导入 [@ref-devin-import-options]，这是目前唯一能确定"哪些来源参与"的机制。缺口：同名冲突的胜负与命名空间规则，partial。

**skills.loading**：调用发生后才把 `SKILL.md` 正文（frontmatter 之后的部分）注入会话 [@ref-devin-skillc-prompt][@ref-devin-skills-how]。文档没有说明 name/description 是否在每次会话启动时进入模型上下文，只说 `description` 用于斜杠补全展示 [@ref-devin-skillc-fields]；也没有"按需读取资源目录"的机制描述（skill 目录内除 `SKILL.md` 外没有定义资源 API）。`subagent: true` 或 `agent: PROFILE` 时 skill 改为以 subagent 运行：`subagent: true` 用默认 `subagent_general` profile，此时 skill 的 `allowed-tools` 与 `permissions` **不**生效（subagent 按其 profile 的工具集运行，`subagent_general` 有全部工具）；要真正限制工具必须写自定义 subagent profile 并用 `agent:` 引用 [@ref-devin-skillc-subagents]。两种写法（来自官方示例）[@ref-devin-skillc-subagents]：

```markdown
---
name: deep-research
description: Thorough codebase research on a topic
subagent: true          # 用默认 subagent_general profile，前台运行
model: sonnet
---

Research the topic the user asked about thoroughly.
```

```markdown
---
name: review-pr
description: Review the current PR using the reviewer subagent
agent: reviewer         # 引用自定义 profile，继承其系统提示、工具限制与模型
---

Review the staged changes for correctness, security, and style issues.
```

两者都设时 `agent` 优先；skill 的 `model:` 会覆盖 profile 的模型 [@ref-devin-skillc-subagents]。缺口：名称/描述进入上下文的时机与资源读取路径未记载，partial。

## 调用、生效条件与诊断 {#skills-invocation-conditions}

**skills.invocation**：两种触发，默认都开 [@ref-devin-skills-triggers]：

| Trigger | 含义 | 默认 |
| - | - | - |
| `user` | 用户可用 `/SKILL` 调用 | 启用 |
| `model` | agent 在相关时自行调用 | 启用 |

写 `triggers: [user]` 可禁止模型自触发；命令补全里展示 `description`，`argument-hint` 提示参数 [@ref-devin-skills-triggers][@ref-devin-skillc-fields]。MCP prompts 也以斜杠命令形式出现（`/mcp__SERVER__PROMPT`），但那是另一套机制，不是 skill [@ref-devin-mcp-prompts]。skill 也可以被 agent 编排：官方给出"用一组 subagent skill 各自处理焦点任务，再写一个普通 skill 当编排者调用它们"的模式，编排永远只有一层——subagent skill 里再调用别的 skill 时一律 inline 执行，即使对方声明了 `subagent: true`，因此不会无限嵌套 [@ref-devin-skillc-subagents]。

**skills.conditions**：四个条件。

其一，`allowed-tools` 与 `permissions` 只在 inline 运行时生效，subagent 模式改由 profile 决定 [@ref-devin-skillc-subagents][@ref-devin-skillc-allowed]。其二，skill 权限是叠加的，不能越过项目或组织层的拒绝（组织级 deny 永远压过 skill 的 allow）[@ref-devin-skillc-permissions]。其三，第三方 skill 可执行任意代码，文档明确提示自担风险，但支持 `.agents` 标准，因此第三方安装工具产出的 skill 可直接使用 [@ref-devin-skills-thirdparty]。其四，插件/企业治理会改变可用性：企业可为其成员关闭 CLI 插件，此时已安装插件不被应用 [@ref-devin-plug-install]；被禁插件在会话启动时软失败（跳过其 skill 并给出警告）[@ref-devin-plug-levels]；导入类 skill 受 `read_config_from` 开关控制（`claude` 关掉则 `.claude/skills/` 与 commands 都不导入）[@ref-devin-import-disable]。

**skills.diagnostics**：终端入口是 `devin skills list`、`devin skills show NAME`、`devin skills paths`，其中 `list` 支持 `--trigger user|model` 过滤，`paths` 直接打印 skill 目录位置 [@ref-devin-cmd-skills]。`devin doctor` 诊断的是自定义 subagent 定义（报告已加载的 profile、无法解析的 `AGENT.md` frontmatter 与被忽略的键），不覆盖 skill [@ref-devin-cmd-doctor]。斜杠 `/hooks` 只能列出 hook 及其来源文件，没有 skill 版本 [@ref-devin-hooks-verify]。文档没有专门的"为什么某个 skill 没被发现"命令，也没有列出生效优先级；改动文件后的重载/重启规则未记载（只有插件本地安装是"下一次会话生效"）[@ref-devin-plug-install]。partial。
