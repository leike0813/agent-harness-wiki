---
schema_version: 3
record_kind: production
edition_id: kimi-code-cli-custom_agents-v1
harness_id: kimi-code
topic: custom_agents
title: "Kimi Code CLI 的自定义 Agent：文件发现、格式、角色、委派与边界"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-kimi-code-agents-locations, ref-kimi-code-src-agent-roots, ref-kimi-code-agents-systemmd, ref-kimi-code-plugins-agents, ref-kimi-code-cmd-options]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-kimi-code-agents-format, ref-kimi-code-src-agent-scan, ref-kimi-code-agents-instructions, ref-kimi-code-agents-systemmd]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-kimi-code-agents-builtin, ref-kimi-code-agents-locations, ref-kimi-code-agents-select, ref-kimi-code-agents-doc, ref-kimi-code-agents-systemmd]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-kimi-code-agents-invoke, ref-kimi-code-agents-permissions, ref-kimi-code-agents-format, ref-kimi-code-slash-info]
  - section_id: agents-overrides
    surface_ids: [cli]
    source_refs: [ref-kimi-code-agents-format, ref-kimi-code-config-secondary, ref-kimi-code-config-thinking, ref-kimi-code-config-models, ref-kimi-code-config-tools, ref-kimi-code-agents-permissions]
  - section_id: agents-limits
    surface_ids: [cli]
    source_refs: [ref-kimi-code-agents-builtin, ref-kimi-code-agents-doc, ref-kimi-code-config-subagent, ref-kimi-code-config-swarm, ref-kimi-code-env-switches, ref-kimi-code-config-background, ref-kimi-code-agents-storage, ref-kimi-code-data-sessions, ref-kimi-code-agents-select, ref-kimi-code-cmd-doctor]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-kimi-code-agents-locations, ref-kimi-code-src-agent-roots, ref-kimi-code-agents-systemmd, ref-kimi-code-plugins-agents, ref-kimi-code-cmd-options]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-kimi-code-agents-format, ref-kimi-code-src-agent-scan, ref-kimi-code-agents-instructions, ref-kimi-code-agents-systemmd]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-kimi-code-agents-builtin, ref-kimi-code-agents-locations, ref-kimi-code-agents-select, ref-kimi-code-agents-doc, ref-kimi-code-agents-systemmd]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-kimi-code-agents-invoke, ref-kimi-code-agents-permissions, ref-kimi-code-agents-format, ref-kimi-code-slash-info]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides
        status: partial
        source_refs: [ref-kimi-code-agents-format, ref-kimi-code-config-secondary, ref-kimi-code-config-thinking, ref-kimi-code-config-models, ref-kimi-code-config-tools, ref-kimi-code-agents-permissions]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: answered
        source_refs: [ref-kimi-code-agents-builtin, ref-kimi-code-agents-doc, ref-kimi-code-config-subagent, ref-kimi-code-config-swarm, ref-kimi-code-env-switches, ref-kimi-code-config-background, ref-kimi-code-agents-storage, ref-kimi-code-data-sessions, ref-kimi-code-agents-select, ref-kimi-code-cmd-doctor]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-limits
        status: partial
        source_refs: [ref-kimi-code-agents-builtin, ref-kimi-code-agents-doc, ref-kimi-code-config-subagent, ref-kimi-code-config-swarm, ref-kimi-code-env-switches, ref-kimi-code-config-background, ref-kimi-code-agents-storage, ref-kimi-code-data-sessions, ref-kimi-code-agents-select, ref-kimi-code-cmd-doctor]
---

Kimi Code CLI 的每个会话由主 Agent 驱动，主 Agent 可按需派发子 Agent；子 Agent 在独立上下文中工作，只把最终结论返回父级。除三个内置子 Agent 外，用户可以写 Markdown agent 文件定义自己的 Agent，主 Agent 会发现它们并作为子 Agent 派发，也可以在启动时把它们选为主 Agent [@ref-kimi-code-agents-doc]。本章固定来源是固定 commit 上的 `docs/en/customization/agents.md`、`docs/en/configuration/config-files.md`、`docs/en/reference/*` 与 `packages/agent-core-v2/src/workspace/workspaceAgentProfileLoader`。

## 定义位置与作用域 {#agents-entry}

Agent 文件的发现优先级为：**显式（`--agent-file`）> Project > Extra > User > Plugin > Built-in**；同名时高优先级作用域胜出，每个目录递归扫描 `.md` 文件 [@ref-kimi-code-agents-locations]。

| 作用域 | 目录 |
| --- | --- |
| User | `$KIMI_CODE_HOME/agents/`（默认 `~/.kimi-code/agents/`）、`~/.agents/agents/` |
| Project | `.kimi-code/agents/`、`.agents/agents/` |
| Extra | `extra_agent_dirs` 声明的目录 |
| Plugin | 插件清单 `agents` 字段声明的目录，省略时自动取插件根下 `agents/` |
| Built-in | 随 CLI 分发，优先级最低 |

- 项目根目录同样是「向上找到的第一个含 `.git` 的目录」；用户级与项目级各含一个 Kimi 专有目录与一个跨工具目录，四个目录名常量在源码中直接可见 [@ref-kimi-code-src-agent-roots] [@ref-kimi-code-agents-locations]。
- 目录发现的文件不能覆盖同名内置 Agent，除非其 frontmatter 声明 `override: true`；通过 `--agent-file` 加载的文件被视为显式启动意图，可以覆盖同名内置 Agent，且优先级高于所有目录作用域，仅对本次启动有效 [@ref-kimi-code-agents-locations]。
- Extra 目录用法与技能一致，写顶层 `extra_agent_dirs` 即可长期追加搜索目录 [@ref-kimi-code-agents-locations]。
- `$KIMI_CODE_HOME/SYSTEM.md` 是另一条通道：它永久覆盖默认主 Agent 的 system prompt，但不参与 agent 文件发现 [@ref-kimi-code-agents-systemmd]。
- 插件提供的 agent 在插件启用期间被发现，优先级低于所有其他文件来源 [@ref-kimi-code-plugins-agents]。
- 启动参数：`--agent NAME` 用指定 Agent 启动新会话（名字可以是内置或任意已发现文件，未知名字报错并列出可用项）；`--agent-file PATH` 以最高优先级加载单个文件并选中它，二者互斥且都不能与 `--session`/`--continue` 同用 [@ref-kimi-code-cmd-options]。

```sh
# 依据 customization/agents.md 的 Selecting the Main Agent 一节
kimi --agent reviewer
kimi -p --agent reviewer "Review the changes on this branch"
```

## 文件格式与解析 {#agents-format}

agent 文件是「YAML frontmatter + 正文」的 Markdown，正文即该 Agent 的 system prompt [@ref-kimi-code-agents-format]：

```markdown
---
name: reviewer
description: Strict code reviewer that reports severity-ranked findings
whenToUse: Code reviews and PR checks
override: false
tools:
  - Read
  - Grep
  - Glob
  - mcp__github__*
disallowedTools:
  - Bash
---

You are a strict code reviewer. Read the diff, then report findings grouped by severity…
```

上例来自 `customization/agents.md` 的 Agent File Format 一节 [@ref-kimi-code-agents-format]。字段语义：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` | 否 | kebab-case 唯一标识，默认取文件名（去扩展名）；缺失或非 kebab-case 的文件被跳过并告警 |
| `description` | 是 | 做什么，供主 Agent 挑选子 Agent 时参考 |
| `whenToUse` | 否 | 额外的使用时机提示 |
| `override` | 否 | 是否允许替换同名内置 Agent，默认 `false`；`--agent-file` 不需要它 |
| `tools` | 否 | 工具允许列表，YAML 数组或逗号分隔字符串；省略或写 `*` 表示允许全部，`tools: []` 表示禁用全部 |
| `disallowedTools` | 否 | 在 `tools` 之后应用的阻止列表，语法与匹配规则相同 |
| `subagents` | 否 | 子 Agent 允许列表；省略时继承内置默认（`coder`、`explore`、`plan`），写 `*` 允许全部类型 |

- 匹配规则：内置与用户工具按精确、大小写敏感的名称匹配；以 `mcp__` 开头的条目按 glob 匹配 MCP 工具。三种写法永远匹配不到任何东西并在生效时告警：`mcp__` 模式之外的通配符（`disallowedTools` 里裸写 `*` 不阻止任何工具）、缺少工具段的 `mcp__github`、以及任何已注册或内置工具都不存在的名字（通常是 `read` 这类大小写错误）[@ref-kimi-code-agents-format]。
- 正文在每次构建 prompt 时作为模板渲染，`${变量}` 用实时上下文替换；未定义的变量原样保留，没有取值的变量渲染为空串。常用变量包括 `${skills}`（合并后的技能注入）、`${agents_md}`（工作区指令文件内容）、`${cwd}`、`${os}`、`${now}`、`${base_prompt}`（生效的默认 system prompt）与 `${plugin_sections}`（已启用插件贡献的指令块）[@ref-kimi-code-agents-format]。
- 未知字段被忽略，因此其他工具的字段（例如 Claude Code 的 `model`、OpenCode 的 `mode`）同样被忽略；逗号分隔的 `tools` 写法让 Claude Code 风格的 agent 文件仍可加载，缺少 `name` 时回退文件名让 OpenCode 风格文件可加载。最小可用文件只需要 `description` 与正文 [@ref-kimi-code-agents-format]。
- 目录中发现的内容非法的文件只跳过并告警，不影响其他文件；`--agent-file` 传入的文件必须合法，否则 CLI 报错退出 [@ref-kimi-code-agents-format]。目录扫描深度上限为 8 层，与技能发现一致 [@ref-kimi-code-src-agent-scan]。
- 工作区指令文件是另一条注入通道：全局 Kimi 专属指令在 `$KIMI_CODE_HOME/AGENTS.md`，跨工具通用指令在 `~/.agents/AGENTS.md`，项目级指令在项目树内（如 `.kimi-code/AGENTS.md`、`AGENTS.md`），其内容以 `${agents_md}` 进入 prompt [@ref-kimi-code-agents-instructions]。
- `SYSTEM.md` 是纯 Markdown 正文，不需要也不读取 frontmatter；文件缺失或为空时不生效，读取失败会回退内置 prompt 并告警 [@ref-kimi-code-agents-systemmd]。

## 角色与主 Agent 选择 {#agents-roles}

- 内置子 Agent 有三个：`coder`（默认可读写文件、执行命令、搜索代码并落地改动的通用工程助手）、`explore`（只读探索，适合快速搜索、阅读与总结仓库）、`plan`（实现规划与架构设计，连 shell 命令都不可用）。它们与自定义 Agent 使用同一套机制，区别只在来源与优先级 [@ref-kimi-code-agents-builtin] [@ref-kimi-code-agents-locations]。
- `coder` 共享主 Agent 的大部分工具集：可后台执行 shell、维护 todo、进入 Plan 模式、调用 Agent Skills；但三个内置子 Agent 都不能再派发子 Agent [@ref-kimi-code-agents-builtin]。
- 主 Agent 与子 Agent 共用同一份 agent 文件格式：`--agent` / `--agent-file` 只决定新会话由谁驱动，同一文件既可当主 Agent 也可被子 Agent 派发 [@ref-kimi-code-agents-select] [@ref-kimi-code-agents-doc]。
- 选中即绑定：Agent 在会话创建时固定，恢复会话会自动还原绑定的 Agent，因此恢复时不需要（也不允许）再传这些参数；TUI 中这两个参数只绑定启动会话，之后用 `/new` 创建的会话回到默认 Agent [@ref-kimi-code-agents-select]。
- 想永久替换主 Agent 的 system prompt 而不每次传参，就写 `$KIMI_CODE_HOME/SYSTEM.md`；文件存在且非空时完全替换内置默认主 Agent 的 prompt，但描述、工具集与委派允许列表仍继承内置默认。SYSTEM.md 在所有启动方式下都生效，包括交互式 TUI [@ref-kimi-code-agents-systemmd]。
- 显式意图仍高于 `SYSTEM.md`：项目级同名 agent 文件声明 `override: true`、以及任何 `--agent-file` 传入的文件都排在它前面；用 `--agent` 选择别的 Agent 会完全绕过它；在用户作用域内部，`SYSTEM.md` 又优先于 `agents/` 目录中发现的同名文件 [@ref-kimi-code-agents-systemmd]。
- 自定义 Agent 可作为主 Agent 时，若想保留默认环境、工作区指令、技能与插件注入，应在正文里引用 `${base_prompt}`；只想保留插件贡献的指令则用 `${plugin_sections}`。正文两者都不含时就拥有整份 prompt，这会排除插件指令 [@ref-kimi-code-agents-select]。

## 调用、审批与委派 {#agents-invocation}

- 派发只分三个阶段：dispatching、审批、收集，都不需要手动管理。子 Agent 由主 Agent 根据任务复杂度、上下文消耗与子任务独立性自动调度 [@ref-kimi-code-agents-invoke]。
- 每次派发在终端呈现为审批请求（除非命中 allow 规则或处于 Ask When Needed 模式），用户可借此审阅任务描述；也可以直接在对话里指定用哪个子 Agent，例如「先用 explore 摸清相关文件再改」[@ref-kimi-code-agents-invoke]。
- 子 Agent 支持后台运行，完成后结果自动回到主 Agent，无需轮询；也可以把已有的子 Agent 实例召回继续同一任务 [@ref-kimi-code-agents-invoke]。
- 权限继承：主 Agent 通过 `/permission` 或审批对话框确认的「始终允许」会自动传播给它派发的所有子 Agent，因此子 Agent 不必重复批准同类工具调用；`Agent` 工具默认允许，使主 Agent 可以多次委派而不打断用户。若要让某类工具在子 Agent 内永久不可用，应在主 Agent 上收紧对应权限规则 [@ref-kimi-code-agents-permissions]。
- `tools` / `disallowedTools` / `subagents` 都先作用于「展示给模型的工具与子 Agent 列表」，并在真正执行前再校验一次：`Agent` 工具只列出调用方可以委派的子 Agent 类型，`Agent` 与 `AgentSwarm` 在派发前都会重新检查允许列表，恢复已有子 Agent 不受此限 [@ref-kimi-code-agents-format]。
- 自定义 Agent 被当作子 Agent 派发时不会带上内置子 Agent 的收尾约定（「你的最后一条消息就是全部交接内容」）；专门用于委派的 agent 应在正文里说明最后一条消息需要是完整、自包含的结果 [@ref-kimi-code-agents-format]。
- 除子 Agent 外，`/btw` 会在一个分叉的子 Agent 中开侧对话，不影响主 Agent 当前回合 [@ref-kimi-code-slash-info]。

## 模型、工具与权限覆盖 {#agents-overrides}

- agent 文件可以覆盖的是工具与子 Agent 允许列表，以及（通过正文模板）system prompt 的内容；覆盖内置 Agent 需要 `override: true` [@ref-kimi-code-agents-format]。
- agent 文件**不能**指定模型：来自其他工具的 `model` 字段属于未知字段，会被直接忽略 [@ref-kimi-code-agents-format]。子 Agent 的模型由 `[secondary_model]` 段与调用时的 `model` 参数决定 [@ref-kimi-code-config-secondary]：

```toml
# 依据 configuration/config-files.md 的 secondary_model 一节
[secondary_model]
default_model = "kimi-code/kimi-for-coding-highspeed"
[secondary_model.models]
"kimi-code/k3" = "Pick this for hard problems. Strong at complex reasoning, algorithm design, deep debugging, math, and systematic challenges."
"kimi-code/kimi-for-coding" = "A balanced coding workhorse. Good for most feature development and code-change tasks."
```

- `force = true` 把所有子 Agent 钉在 `default_model` 上并取消选择（此时 `model` 参数不再对外暴露，显式传入会被拒绝）；`default_model` 在配置了 `models` 表时必填且必须是表内键；`primary` 是保留别名，不能作为池的键 [@ref-kimi-code-config-secondary]。
- 子 Agent 的模型解析顺序是：工具调用里显式传入的 `model` > `default_model`；`model` 取值可以是池中别名，也可以是 `"primary"`（调用方自己正在使用的模型，始终有效）。池未配置时该参数不对外暴露，子 Agent 继承调用方模型 [@ref-kimi-code-config-secondary]。
- Thinking 强度同样受这一套影响：绑定池别名不继承调用方的 effort，`[secondary_model] default_effort` 优先，其后依次是 `[thinking] enabled = false`（保持关闭）、绑定模型条目的 `default_effort`、全局 `[thinking] effort`、以及模型 `support_efforts` 的中间值；`"primary"` 则同时继承模型与 effort [@ref-kimi-code-config-secondary] [@ref-kimi-code-config-thinking]。
- 想让同一底层模型带上不同思考强度，可为它注册「变体」条目：在 `[models]` 里再建一个别名，只用 `[models.别名.overrides]` 覆盖 `default_effort`，然后把两个别名都放进池。变体不会继承被指向条目的字段，`capabilities`、`support_efforts` 等元数据必须完整复制，且 `default_effort` 必须是 `support_efforts` 的成员 [@ref-kimi-code-config-models] [@ref-kimi-code-config-secondary]。
- 模型别名与 provider 必须在 `[models]` / `[providers]` 中已定义，`overrides` 子表不接受 `provider`、`model`、`protocol`、`beta_api`、`base_url` 这类身份/路由字段 [@ref-kimi-code-config-models]。
- 全局工具开关 `[tools] enabled` / `[tools] disabled` 对所有 Agent 生效并与 agent 自身的策略求交 [@ref-kimi-code-config-tools]。
- 沙箱与逐 Agent 的权限声明不在固定来源中：文档只描述「子 Agent 继承主 Agent 的权限规则」这一条路径，没有逐 agent 的权限或沙箱字段 [@ref-kimi-code-agents-permissions]。

## 边界、并发与诊断 {#agents-limits}

- 三个内置子 Agent 不能再派发子 Agent；自定义 Agent 默认继承内置委派允许列表（`coder`、`explore`、`plan`），因此委派链总是终止，想要更深的链必须显式声明 `subagents` 允许列表 [@ref-kimi-code-agents-builtin]。
- 每个子 Agent 有独立上下文窗口，只能看到主 Agent 显式传入的任务描述，看不到主 Agent 的对话历史；中间推理与工具记录不回流，只有最终结果进入主 Agent 上下文。并发多个子 Agent 互不干扰，但每个都独立消耗模型 token；简单任务直接由主 Agent 处理更省 [@ref-kimi-code-agents-doc]。
- 子 Agent 在自己回合结束时若仍有后台任务在跑，会等这些任务落地后才报告完成 [@ref-kimi-code-agents-builtin]。
- 超时与并发上限 [@ref-kimi-code-config-subagent] [@ref-kimi-code-config-swarm] [@ref-kimi-code-env-switches] [@ref-kimi-code-config-background]：

| 控制项 | 默认 | 覆盖方式 |
| --- | --- | --- |
| `[subagent] timeout_ms`（单个 `Agent` 子 Agent 的墙钟上限） | 7200000 毫秒（2 小时），`0` 表示不限时 | `KIMI_SUBAGENT_TIMEOUT_MS`（优先于配置） |
| `[swarm] timeout_ms`（单个 `AgentSwarm` 子 Agent 的上限，超时记 `Subagent timed out.`） | 7200000 毫秒，`0` 表示不限时 | `KIMI_CODE_SWARM_TIMEOUT_MS` |
| `AgentSwarm` 初始爬坡并发上限 | 未设 = 不限制 | `KIMI_CODE_AGENT_SWARM_MAX_CONCURRENCY` |
| 已完成子 Agent 作用域常驻缓存 | 32（`0` 或负数 = 不淘汰） | `KIMI_CODE_SUBAGENT_SCOPE_CACHE_SIZE` |
| 单个作用域淘汰的最长墙钟时间 | 15000 毫秒 | `KIMI_CODE_SUBAGENT_SCOPE_EVICT_TIMEOUT_MS` |
| 后台任务并发数 | — | `[background] max_running_tasks` 或 `KIMI_CODE_BACKGROUND_MAX_RUNNING_TASKS` |

- 上下文边界：子 Agent 没有独立的压缩配置，压缩与预算由全局设置控制；`[loop_control] max_steps_per_turn`、`max_attempts_per_step` 等作用于整个 Agent 循环 [@ref-kimi-code-config-subagent]。
- 诊断入口：子 Agent 的运行时状态持久化在当前会话目录的 `agents/` 子目录下，每个实例一个目录，其中的 `wire.jsonl` 按时间顺序记录 prompt、消息历史与最终状态；后台子 Agent 还在 `tasks/` 子目录暴露生命周期状态。这些是本地的调试材料，可能包含 prompt、命令输出、仓库路径与凭据痕迹，分享前需要脱敏 [@ref-kimi-code-agents-storage]。
- 会话整体结构（`state.json`、`agents/main/`、`tasks/`、`cron/`）与导出方式见配置章的会话数据一节；`kimi export` 可把会话连同日志打包用于排查 [@ref-kimi-code-data-sessions]。
- 定义是否被发现：`--agent` 传入未知名字会报错并列出可用 Agent；目录里内容非法的文件在加载时被跳过并告警。固定来源没有提供「按来源列出所有 agent 文件」的专门命令，`kimi doctor` 也只校验 `config.toml` 与 `tui.toml` [@ref-kimi-code-agents-select] [@ref-kimi-code-cmd-doctor]。
