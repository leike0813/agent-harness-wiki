---
schema_version: 3
record_kind: production
edition_id: codebuddy-cli-skills-v2
harness_id: codebuddy
topic: skills
title: "CodeBuddy Code（CLI）Skills 机制"
sections:
  - section_id: skills-roots
    surface_ids: [cli]
    source_refs: [ref-codebuddy-skills-roots, ref-codebuddy-dir-user, ref-codebuddy-dir-project, ref-codebuddy-pluginsref-components, ref-codebuddy-dir-priority, ref-codebuddy-site-cli]
  - section_id: skills-format
    surface_ids: [cli]
    source_refs: [ref-codebuddy-skills-format, ref-codebuddy-skills-frontmatter, ref-codebuddy-skills-placeholders, ref-codebuddy-skills-shell, ref-codebuddy-skills-artifacts]
  - section_id: skills-loading
    surface_ids: [cli]
    source_refs: [ref-codebuddy-skills-selection, ref-codebuddy-skills-debug, ref-codebuddy-skills-fork, ref-codebuddy-skills-frontmatter, ref-codebuddy-changelog-skill-trigger]
  - section_id: skills-invocation
    surface_ids: [cli]
    source_refs: [ref-codebuddy-skills-overrides, ref-codebuddy-skills-permissions]
  - section_id: skills-conditions
    surface_ids: [cli]
    source_refs: [ref-codebuddy-skills-hooks]
  - section_id: skills-diagnostics
    surface_ids: [cli]
    source_refs: [ref-codebuddy-skills-debug, ref-codebuddy-skills-hooks, ref-codebuddy-env-debug]
questions:
  - question_id: skills.roots
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-codebuddy-skills-roots, ref-codebuddy-dir-user, ref-codebuddy-dir-project]
  - question_id: skills.discovery
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: partial
        source_refs: [ref-codebuddy-skills-roots, ref-codebuddy-pluginsref-components]
  - question_id: skills.collision
    answers:
      - surface_ids: [cli]
        section_id: skills-roots
        status: answered
        source_refs: [ref-codebuddy-dir-priority, ref-codebuddy-pluginsref-components]
  - question_id: skills.format
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-codebuddy-skills-format, ref-codebuddy-skills-frontmatter]
  - question_id: skills.extensions
    answers:
      - surface_ids: [cli]
        section_id: skills-format
        status: answered
        source_refs: [ref-codebuddy-skills-artifacts, ref-codebuddy-skills-placeholders, ref-codebuddy-skills-shell]
  - question_id: skills.loading
    answers:
      - surface_ids: [cli]
        section_id: skills-loading
        status: answered
        source_refs: [ref-codebuddy-skills-selection, ref-codebuddy-skills-fork, ref-codebuddy-changelog-skill-trigger]
  - question_id: skills.invocation
    answers:
      - surface_ids: [cli]
        section_id: skills-invocation
        status: answered
        source_refs: [ref-codebuddy-skills-overrides]
  - question_id: skills.conditions
    answers:
      - surface_ids: [cli]
        section_id: skills-conditions
        status: answered
        source_refs: [ref-codebuddy-skills-hooks]
  - question_id: skills.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: skills-diagnostics
        status: answered
        source_refs: [ref-codebuddy-skills-debug, ref-codebuddy-skills-hooks, ref-codebuddy-env-debug]
---

本章的固定来源是 CodeBuddy Code 官方文档仓库 `https://cnb.cool/codebuddy/codebuddy-code` 在提交 `47ec6f132a3f52925ee999deb782807bf6d82a2b` 的 Markdown 文档（`docs/skills.md`、`docs/codebuddy-dir.md`、`docs/sub-agents.md`、`docs/settings.md`、`docs/plugins-reference.md`、`docs/env-vars.md`）、同一仓库提交 `694ae23f44308ca901d620d2e48c2c3d35c75fc9` 的 `CHANGELOG.md`（2.161.0 发行记录，被引的 `docs/*.md` 在两个提交之间逐字未变），以及官方站 `https://www.codebuddy.cn/llms.txt` 对 CLI 产品线的说明。CodeBuddy Code（CLI）是闭源产品，官方渠道只发布文档与 npm 包（`@tencent-ai/codebuddy-code`），本章按来源级知识阅读，不映射到某个具体已发布版本；发行记录里的版本号只用来标注行为自哪个 CLI 版本起成立；文档自身把 Hooks、Frontmatter Hooks、Function Hooks 等标为 Beta。

机制边界：Skills 是「AI 自动识别并调用的领域能力包」，与用户手动触发的 Slash Commands 并列，二者在 frontmatter、变量占位符与 Shell 内联执行上共用同一套处理链。

## 发现位置与优先级 {#skills-roots}

Skill 通过在特定目录里放置一个 `SKILL.md` 定义。官方列出两个内置来源：项目级 `.codebuddy/skills/`（项目根目录下）与用户级 `~/.codebuddy/skills/`（用户主目录下），每个 Skill 一个独立子目录。[@ref-codebuddy-skills-roots]

全局目录的清单把 `~/.codebuddy/skills/` 列为用户级技能的位置，与 `agents/`、`rules/` 并列，在全部项目中可用。[@ref-codebuddy-dir-user] 项目目录 `.codebuddy/` 下同样有 `skills/`，随项目版本控制共享给团队。[@ref-codebuddy-dir-project]

第三种来源是插件：插件在 `skills/`（或插件清单指定的自定义路径）下携带技能，安装后与用户自定义 Skill 一起被发现和展示。[@ref-codebuddy-pluginsref-components]

同名冲突的处理规则写在文档的优先级一节：代理、技能、规则的优先级为**项目级 > 用户级 > 插件级**，同名时项目级优先。[@ref-codebuddy-dir-priority] 状态为 `answered`：三条来源方向明确，但文档没有给出符号链接、隐藏目录或最大扫描深度的具体规则（见 `skills.discovery` 的缺口说明）。官方站把 CodeBuddy Code 列为「命令行 Agent 工具」产品线，指向 `https://www.codebuddy.cn/cli/` 与产品文档。[@ref-codebuddy-site-cli]

## SKILL.md 格式与字段 {#skills-format}

`SKILL.md` 是带 YAML frontmatter 的 Markdown，frontmatter 之后为正文指令。[@ref-codebuddy-skills-format] 官方列出的字段与约束如下表；全部字段都是可选的，`name` 未指定时回退到目录名。[@ref-codebuddy-skills-frontmatter]

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` | 否 | Skill 名称，未指定时使用目录名 |
| `description` | 否 | 帮助 AI 判断何时使用；描述质量直接影响自动选择 |
| `allowed-tools` | 否 | 工具白名单，逗号分隔，支持 `Bash(git:*)`、`Edit(src/**/*.ts)` 等模式 |
| `disable-model-invocation` | 否 | 为 `true` 时不出现在 Skill 工具中，只能 `/skill-name` 手动触发 |
| `user-invocable` | 否 | 为 `false` 时从 `/` 菜单隐藏，仅供 AI 或其它 Skill 调用，默认 `true` |
| `context` | 否 | 设为 `fork` 时在独立 subagent 上下文执行 |
| `agent` | 否 | 指定 subagent 类型，仅在 `context: fork` 时有效 |
| `model` | 否 | fork 时指定模型，未配置回退到 agent 默认模型 |
| `hooks` | 否 | 声明 Skill 专属 Hooks，仅 `context: fork` 时生效 |

正文支持三类扩展语法：变量占位符、内联 Shell 命令、`@file` 文件引用。[@ref-codebuddy-skills-format] 变量占位符在加载或执行时替换，`${CODEBUDDY_SKILL_DIR}` 指向当前 `SKILL.md` 所在目录，`${CODEBUDDY_SESSION_ID}` 为运行时会话 ID，大写环境变量可写成 `${MY_ENV_VAR:-默认值}`；未设置且无默认值的变量保留原样，不替换为空串。为兼容 Claude Code，`${CLAUDE_*}` 前缀被识别为等价别名。[@ref-codebuddy-skills-placeholders]

内联 Shell 命令用 `` !`command` `` 语法，在 Skill 被触发时执行并用输出替换；处理顺序是 `$ARGUMENTS` 替换 → Shell 执行 → `@file` 引用处理，与自定义斜杠命令一致，单条命令失败会被替换为空串、不影响其它命令。[@ref-codebuddy-skills-shell]

一个较新的专有扩展是「声明产出的文件」：执行 Bash 命令时宿主为本次命令准备一个空文件，路径放在环境变量 `$CODEBUDDY_ARTIFACTS`，脚本按行追加 JSON（字段 `uri`、`name`、`mimeType`、`description`、`sizeBytes`）声明交付物；单次命令最多 64 条、单行上限 8192 字节，本地路径必须在项目目录内。旧写法 `::codebuddy-artifact::` 已被移除。该声明只在 CodeBuddy Code 作为 A2A 被调方时生效。[@ref-codebuddy-skills-artifacts]

## 加载与调用 {#skills-loading}

模型侧选择依据四项：任务描述与 description 的相关性、任务所需工具是否在 `allowed-tools` 内、上下文相关性、以及来源（项目级优先于用户级）。[@ref-codebuddy-skills-selection] `/skills` 面板显示每个 Skill 的名称与预估 token 数，来自用户级、项目级与插件三级。[@ref-codebuddy-skills-debug]

`context: fork` 的 Skill 在隔离的子代理上下文中执行、不访问对话历史：创建隔离上下文，子代理接收 Skill 内容作为提示，`agent` 字段决定执行环境，结果返回主对话；可用的 agent 类型为 `general-purpose`（默认）、`Explore`、`Plan` 及 `.codebuddy/agents/` 中定义的自定义 agent。文档提醒 `context: fork` 只适用于包含明确任务的 Skill。[@ref-codebuddy-skills-fork]

调用面：用户可用 `/skill-name` 显式触发；模型可在任务匹配时自动调用（`disable-model-invocation: true` 会关闭模型侧入口，只保留手动）；`user-invocable: false` 则反之，隐藏 `/` 菜单、仅供内部引用。[@ref-codebuddy-skills-frontmatter][@ref-codebuddy-skills-selection] 用户侧的触发条件在 CLI 2.161.0 收紧过：只有显式输入 `/skill-name` 才会展开 Skill；此前以某个已安装 Skill 名开头、但不带斜杠的普通文本会被判成 Skill 命令，模型收到的是 Skill 全文而不是用户原话，下一轮之后历史中的用户原始消息还会被覆盖。[@ref-codebuddy-changelog-skill-trigger]

## 可见性覆盖与权限 {#skills-invocation}

`settings.json` 的 `skillOverrides` 允许不改 `SKILL.md` 就控制单个 Skill 的可见性，按 Skill 名索引，取四态之一：`on`（回退 frontmatter 现状）、`name-only`（只对模型暴露名称、在 `/` 菜单可见）、`user-invocable-only`（对模型隐藏、菜单仍可见，`/skills` 面板显示为 `user-only`）、`off`（对模型和菜单都隐藏，按名调用返回禁用提示）。未列出的 Skill 视为 `on`。[@ref-codebuddy-skills-overrides]

生效优先级为 `PROJECT_LOCAL（.codebuddy/settings.local.json）> PROJECT（.codebuddy/settings.json）> USER（~/.codebuddy/settings.json）`，高优先级按 Skill 名覆盖；非法值在合并前被过滤，不会遮蔽低优先级的合法值。plugin Skill 不受 `skillOverrides` 影响，改由 `/plugin` 管理，在 `/skills` 中显示为 `locked by plugin`。`/skills` 面板按 ↑/↓ 选择、`enter`/`space`/`←/→` 切换状态，按 `Esc` 统一写入 `.codebuddy/settings.local.json`。[@ref-codebuddy-skills-overrides]

权限上，`allowed-tools` 限定 Skill 可用的工具集合；每个 Skill 还有 `baseDirectory`（即 `SKILL.md` 所在目录），可在指令里用 `{baseDirectory}` 引用。[@ref-codebuddy-skills-permissions]

## 条件与 Frontmatter Hooks {#skills-conditions}

`context: fork` 的 Skill 可在 frontmatter 里声明 `hooks`，字段结构与 `settings.json` 的 `hooks` 一致（按事件分组，每条可带 `matcher` 与 `hooks[]`）；支持的 hook `type` 为 `command`、`prompt`、`agent`、`http`。生命周期与 fork subagent 绑定，启动时注册到 scoped registry、结束时清理；frontmatter 里写 `Stop` 会被自动重写为 `SubagentStop`。非 fork（注入路径）的 Skill 没有清晰生命周期边界，frontmatter hooks 会被解析但不注册。[@ref-codebuddy-skills-hooks]

安全闸门：来自非内置来源（`.codebuddy/skills/`、项目本地、插件市场）的 frontmatter hooks 默认不注册，需要在 `~/.codebuddy/settings.json` 设 `"allowUntrustedFrontmatterHooks": true`；内置 product-bundled Skill 自动放行。被拦截时 CLI 输出 `[AgentTask] Frontmatter hooks from skill '...' skipped`。Skill frontmatter hooks 与 `settings.json` 全局 hooks 是叠加合并关系，同一事件下两边的匹配项并行执行。插件通过 `hooks/hooks.json` 配置的 hooks 走另一条路径，不受此闸门控制。[@ref-codebuddy-skills-hooks]

## 诊断 {#skills-diagnostics}

使用 `/skills` 查看当前已加载的 Skills，面板按来源分组（User skills、Project skills、Plugin skills），显示名称与预估 token 数。[@ref-codebuddy-skills-debug] 常见失配有三类：未被触发（检查 description 是否清晰、能力是否匹配、`allowed-tools` 是否包含所需工具）、权限不足（核对 `allowed-tools` 与工具名拼写）、项目级与用户级同名（项目级优先，建议改用不同 name）。[@ref-codebuddy-skills-debug]

frontmatter hooks 的调试：启动时 `CODEBUDDY_DEBUG=1` 可在日志看到 `[ScopedHookRegistry] registered N hook config(s) for scope ...` 注册行；非法 hook 定义会被静默丢弃，但会输出 `[parseFrontmatterHooks] skill 'xxx': event 'YYY' invalid: ...`。[@ref-codebuddy-skills-hooks] 环境变量侧，`CODEBUDDY_DEBUG` 设为 `1`/`true`/`yes`/`on` 等同 `--debug`，也可用 `--debug` 与 `--verbose` 观察加载日志。[@ref-codebuddy-env-debug]

改动文件后的重载：文档未给 Skill 文件的热重载约定；`/reload-plugins` 明确用于重新加载插件提供的 Skills、Agents、Hooks 与 MCP/LSP 服务器。[@ref-codebuddy-skills-debug] 缺口（`partial`）：非插件来源的 Skill 改动是即时生效还是需重启会话，本文没有直接说明，需在真实进程上验证。
