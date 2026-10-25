---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-custom_agents-v4
harness_id: mistral-vibe
topic: custom_agents
title: "Mistral Vibe CLI 的自定义 agent：TOML profile、可选性与 agents.* 委派"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-mv-301-agents-registry, ref-mv-301-agents-models]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-mv-301-agents-models]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-mv-301-agents-builtin, ref-mv-301-agents-available]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-mv-301-agents-tools, ref-mv-301-agents-spawn, ref-mv-301-agents-subagent-gate, ref-mv-301-agents-cli, ref-mv-301-changelog]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-mv-301-agents-profile, ref-mv-301-agents-available, ref-mv-301-agents-mode, ref-mv-301-agents-types, ref-mv-301-agents-subagent-gate, ref-mv-301-agents-subagent-limits, ref-mv-301-agents-subagent-limit-enforcement, ref-mv-301-agents-subagent-depth-guard]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-301-agents-diagnostics, ref-mv-301-agents-registry]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-mv-301-agents-registry, ref-mv-301-agents-models]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-mv-301-agents-models]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-mv-301-agents-builtin, ref-mv-301-agents-available]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-mv-301-agents-tools, ref-mv-301-agents-spawn, ref-mv-301-agents-subagent-gate]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-mv-301-agents-profile, ref-mv-301-agents-available]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-mv-301-agents-subagent-gate, ref-mv-301-agents-mode, ref-mv-301-agents-types, ref-mv-301-agents-subagent-limits, ref-mv-301-agents-subagent-limit-enforcement, ref-mv-301-agents-subagent-depth-guard]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-mv-301-agents-diagnostics, ref-mv-301-agents-registry]
---

固定来源是官方仓库提交 `dd2c04ce717c417731ab89c333cd0a72541e33ba`（变更日志 3.0.1），界面为 `cli`。Vibe 的 agent 只有一种数据模型：一个 `AgentProfile`，用 `agent_type` 区分"可被选中的模式 agent"与"只能被委派的 subagent"；自定义 agent 就是一个 TOML 文件，没有插件式注册表。

## 定义位置与发现 {#agents-entry}

自定义 agent 是 `.toml` 文件，文件名去掉扩展名就是 agent 名。搜索路径按顺序拼接并去重：配置项 `agent_paths` 中存在的目录 → 各项目根下的 `.vibe/agents` → 用户级 `~/.vibe/agents`。[@ref-mv-301-agents-registry]

项目根的集合是"受信任的当前工作目录 + 由 `--add-dir` 显式加入的目录"，因此项目 agent 只有在目录受信任（或由命令行显式加入）时才可见；每个根只检查自身，不向下递归。

发现时先把内置表作为底座，再逐个目录用 `*.toml` 通配读取：

- 与内置同名的文件**覆盖内置**，并记一条 info 日志；
- 非内置重名时跳过后来者（先到先得），记 debug 日志；
- 每个 profile 在发现阶段就通过"把它的 overrides 套到一份一次性的 orchestrator 副本上"来校验，校验失败的整个文件被丢弃并记 warning，而不是等到选中时才报错。[@ref-mv-301-agents-registry]

发现之前还有一次文件迁移：旧字段 `base_disabled` 会被合并进 `disabled_tools` 并原子写回，避免旧 agent 文件在升级后行为不同。[@ref-mv-301-agents-models]

## 文件格式与字段 {#agents-format}

解析器显式取走五个第一方键，其余键全部原样收进 `overrides`；名字来自文件名而不是文件内容。[@ref-mv-301-agents-models]

| 字段 | 默认 | 说明 |
| :-- | :-- | :-- |
| （文件名） | 必填 | 决定 agent 名（`path.stem`），文件内不能另起名字 |
| `display_name` | 由文件名标题化（`my-agent` 变 `My Agent`） | 选择器显示名 |
| `description` | 空串 | 说明；subagent 需要非空描述才会被介绍给模型 |
| `safety` | `neutral` | `safe` / `neutral` / `destructive` / `smart` / `yolo` |
| `agent_type` | `agent` | `agent` 或 `subagent` |
| `instructions` | 无 | 内联提示词正文 |
| 其它任意键 | — | 全部作为配置覆盖（例如 `active_model`、`system_prompt_id`、`enabled_tools`、`disabled_tools`、`[tools.*]`） |

解析结果另外带 `overrides` 与 `source_path`。`source_path` 不是装饰：Unified harness 向模型广告一个 subagent 时会带上它背后的文件路径，因此 profile 必须记住自己来自哪个文件。

`safety` 只表达权限姿态，不强制权限；真正的限制要靠 `enabled_tools` / `disabled_tools` 与逐工具 `permission` 一起写。最小示例（用户级 agent，覆盖模型与工具）：

```toml
# ~/.vibe/agents/redteam.toml
active_model = "mistral-medium-3.5"
system_prompt_id = "redteam"
disabled_tools = ["edit", "write_file"]

[tools.bash]
permission = "always"
```

## 角色：模式 agent、subagent 与内置集合 {#agents-roles}

角色只有两种，由 `AgentType` 判定；`AgentSafety` 是另一套取值（权限姿态），不是角色。两者共用同一套机制：内置 agent 就是代码里写死的 `AgentProfile` 常量，同名的自定义文件直接替换它。

本提交的内置集合是六个：可被选中的 `ask`、`accept-edits`、`smart-approve`、`auto-approve`、需要安装的 `lean`，加上只能被委派的 `explore`。[@ref-mv-301-agents-builtin] 与上一版相比 `plan` 已被移除：配置里仍把 `plan` 写成 `default_agent` 时，启动会改用 `ask` 并记一条警告；回退目标选 `ask` 的理由写在代码注释里——`ask` 不会在未批准的情况下执行任何工具，因此不会因为回退而给出用户原本没有的权限。[@ref-mv-301-agents-builtin]

差别在可选性上：`--agent` 只接受 `agent_type = "agent"` 的条目，把 subagent 当主 agent 选会得到明确的类型错误；反向的 subagent 集合就是类型过滤的结果。[@ref-mv-301-agents-available]

插件也能提供 agent，但只能是 subagent，名字带插件命名空间前缀，且不进入这里的发现表（见 Native plugins 章节）。

## 调用：显式选择与委派 {#agents-invocation}

显式路径有三处：启动参数 `--agent NAME`、配置项 `default_agent`（默认 `accept-edits`），以及交互会话里的循环切换。`default_agent` 的合法取值是内置主 agent、已安装的 `lean`，或 `~/.vibe/agents` 与 `.vibe/agents` 里的任意自定义名字；subagent 会被拒绝；它同时作用于交互模式与程序化（`-p`）模式。[@ref-mv-301-agents-cli] 循环顺序固定为 `ask`、`accept-edits`、`smart-approve`、`auto-approve`，随后是其余可用主 agent 按名字排序；因显式启动选择而被强制保留的 agent 始终留在循环里。[@ref-mv-301-agents-available]

委派面在 Unified harness 里是 `agents.*` 一族工具，共五个操作：`list_configs`（可用 agent 配置）、`list`（运行中的子会话及其状态）、`spawn`（创建子会话）、`send_message`（向已有子会话发消息）、`interrupt`（中断）。[@ref-mv-301-agents-tools] 它们以 `tools.agents.*` 的形式出现在 `run_typescript` 程序化工具面里，旧的 `subagent.*` 名字已退役，仅保留给历史调用的重放匹配。

`spawn` 的输入是三个字段：`name`（调用方给子会话起的唯一名字，不能包含斜杠或恰好是 `.`/`..`）、`message`（首条消息）、可选 `config_name`（用哪个 agent 配置）。另有一个会话派生变体，多一个 `fork_turns`，取值 `all`、`none` 或正整数，用来决定子会话带走父会话多少轮历史。[@ref-mv-301-agents-spawn] 子会话是后台运行的：父会话可以继续工作，用 `list` 查看状态、用 `send_message` 追加指令、用 `interrupt` 停止。程序化运行（`vibe -p`）退出前会等待本轮留下的子会话，超时或其他停止条件会中断它们，`--output-dir` 导出会逐个列出子会话的状态、模型、用量、成本与步数并复制其 journal。[@ref-mv-301-changelog]

`enable_subagents = false` 时整族工具都不提供给模型，agent 只能独自工作；该开关默认开启。[@ref-mv-301-agents-subagent-gate]

## 覆盖、可见性与边界 {#agents-overrides-limits}

agent 的"覆盖"就是往配置层栈里插入 agent profile 层再重建 orchestrator，因此任何配置字段都能被 agent 改：模型、工具与权限、提示词、甚至 `bypass_tool_permissions`。有三个字段是硬性例外并被剥离：`vibe_base_url`、`console_base_url`、`vibe_code_sessions_base_url`，因为账号调用与 teleport 会把 API key 发往这些地址，不受信任目录里的 agent 文件不得改写凭据流向。[@ref-mv-301-agents-profile]

可见性过滤器按下列顺序判定，任一命中即隐藏（显式启动选中的 agent 例外，它整场保留）：[@ref-mv-301-agents-available]

1. `enable_auto_approve = false` 且 agent 的 `safety` 是 `yolo`——`auto-approve` 与任何自定义 `safety = "yolo"` 的 agent 都被禁止，这条优先于下面所有名单；
2. `smart-approve` 未获得实验或配置放行（默认不发）；
3. `install_required` 的 agent 不在 `installed_agents` 里（`lean` 属于此类）；
4. 配置了 `enabled_agents` 时，名字不匹配其中任一模式；
5. 否则，名字匹配 `disabled_agents` 任一模式。

边界与限制：

- **操作面由会话级 Mode 决定**：subagent 功能要么整体禁用，要么启用并指定允许的操作集合、是否允许会话派生、父消息是否能唤起空闲子会话；这套设置一旦建立会话就不能再改配置。[@ref-mv-301-agents-mode] 用户在配置里的入口是 `enable_subagents`，关掉后整族委派工具都不存在。[@ref-mv-301-agents-subagent-gate]
- **agent 类型定义有上限**：一次配置最多 128 个 agent 类型，名字必须唯一且三项文本都非空，超出或重名直接报配置错误。[@ref-mv-301-agents-types]
- **并发与深度**：Unified harness 的 `SubagentLimits` 固定了四个上限——嵌套深度恒为 1、同时存活的子会话最多 8 个、同一时刻执行的子 turn 最多 4 个、会话生命周期内用过的名字总数最多 128 个（已停止的子会话记录仍占一个名字）。控制器在 `spawn` 时分别以 `subagent_name_limit`、`subagent_child_limit`、`subagent_concurrency_limit` 拒绝超限请求，深度 1 另由"a depth-one child cannot install a subagent controller"保证：子会话里根本装不了新的控制器。[@ref-mv-301-agents-subagent-limits][@ref-mv-301-agents-subagent-limit-enforcement][@ref-mv-301-agents-subagent-depth-guard]
- 程序化执行另有总时长与单次 `sleep` 上限（源码注释给出 60 秒与 30 秒的默认值），它们限制的是 `run_typescript` 程序本身，而不是 subagent 数量。

## 诊断 {#agents-diagnostics}

- **发现结果**：启动时会记录"在哪些搜索路径下发现了哪些自定义 agent"；单个文件解析或覆盖校验失败只记 warning 并跳过该文件，不影响其余 agent。[@ref-mv-301-agents-registry]
- **为什么不可选**：`excluded_agent_message` 按上面的过滤顺序给出可直接照做的原因——"auto-approve 模式被禁用（`enable_auto_approve` 为假）""需要先安装，用 `--agent NAME` 跑一次或加入 `installed_agents`""不在 `enabled_agents` 里""在 `disabled_agents` 里"。[@ref-mv-301-agents-diagnostics]
- **名字不存在**：`--agent` 或切换到一个从未被发现的 agent 会抛 `Agent 'name' not found`；把 subagent 当主 agent 选会抛类型错误并说明只有 `agent` 类型能被 `--agent` 选中。
- **委派失败**：错误出现在工具调用处——`spawn` 的名字不合法、`config_name` 不存在、对未启用的操作下达指令都会在该次调用上失败，而不会静默降级。
