---
schema_version: 3
record_kind: production
edition_id: mistral-vibe-cli-custom_agents-v2
harness_id: mistral-vibe
topic: custom_agents
title: "Mistral Vibe CLI 的自定义 agent：agent_type、覆盖层与 subagent 委派"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-mv-agents-search-paths, ref-mv-agents-discovery, ref-mv-agents-builtin-map, ref-mv-readme-agents, ref-mv-docs-agents-custom, ref-mv-docs-agents-builtin]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-mv-agents-from-toml, ref-mv-docs-config-agent-files, ref-mv-docs-agents-custom, ref-mv-readme-agents]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-mv-agent-enums, ref-mv-agents-builtin-map, ref-mv-agents-select, ref-mv-agents-subagents, ref-mv-docs-agents-custom, ref-mv-docs-agents-builtin, ref-mv-docs-agents-subagents]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-mv-agents-select, ref-mv-readme-builtin-agents, ref-mv-docs-agents-select, ref-mv-task-args, ref-mv-task-tool, ref-mv-readme-subagents]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-mv-agent-profile-layer, ref-mv-docs-config-agent-files, ref-mv-agents-available, ref-mv-task-tool, ref-mv-task-permission]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-mv-agents-discovery, ref-mv-agents-diagnostics, ref-mv-agents-select, ref-mv-task-tool]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-mv-agents-search-paths, ref-mv-agents-discovery, ref-mv-readme-agents]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-mv-agents-from-toml, ref-mv-docs-config-agent-files]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-mv-agent-enums, ref-mv-agents-builtin-map, ref-mv-docs-agents-custom]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-mv-agents-select, ref-mv-task-tool, ref-mv-docs-agents-select]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-mv-agent-profile-layer, ref-mv-agents-available]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-mv-task-tool, ref-mv-task-permission]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-mv-agents-diagnostics, ref-mv-agents-discovery, ref-mv-task-tool]
---

固定来源是官方仓库提交 `7c19608af06f6c61d63f8f7a5c3430da73fba2ab` 与 `docs.mistral.ai` 的 Vibe Code CLI 文档快照。Vibe 的 agent 只有一种数据模型：一个 `AgentProfile`，用 `agent_type` 区分"可选中的模式 agent"与"只能被委派的 subagent"。所谓自定义 agent 就是一个 TOML 文件，没有插件式注册表、也没有单独的 REST 声明。

适用性说明：本章只固定到所列来源身份（源码提交或官方文档快照），来源未标注软件版本，因此按来源级知识记录（`version_applicability: unknown`）；它不证明任何特定已发布版本的行为，平台与条件差异也未在固定来源中逐项验证。

## 定义位置与发现 {#agents-entry}

自定义 agent 是 `$VIBE_HOME/agents/`（默认 `~/.vibe/agents/`）或项目 `.vibe/agents/` 下的 `.toml` 文件，文件名去掉扩展名就是 agent 名。[@ref-mv-readme-agents] 官方文档给出的用户可见位置与之一致，并强调两种 `agent_type` 的区别。[@ref-mv-docs-agents-custom]

发现顺序在注册表里是：配置项 `agent_paths` 中存在的目录 → 项目 agents 目录 → 用户 agents 目录。[@ref-mv-agents-search-paths] 发现时先把内置 agent 表作为底座，然后逐个目录用 `*.toml` 通配读取：与内置同名的文件会**覆盖内置**并记一条 info 日志；非内置重名则跳过后来者（先到先得）。文件解析或覆盖校验失败不会中断启动，只记一条警告并跳过该文件。[@ref-mv-agents-discovery]

内置 agent 一共七个：可被 `--agent` 选中的 `ask`、`plan`、`accept-edits`、`smart-approve`、`auto-approve`、`lean`，加上只能被委派的 `explore`。[@ref-mv-agents-builtin-map] 其中 `smart-approve` 默认"暗发"（要实验或配置放行才出现在选择器里），`lean` 需要先安装。官方文档列出的可见集合是 `default`、`plan`、`accept-edits`、`auto-approve`、`lean`，并指出 `explore` 是内置 subagent、不能用 `--agent` 直接选。[@ref-mv-docs-agents-builtin]

注意名字口径差异：文档站把第一个模式 agent 叫 `default`，而代码里的枚举名是 `ask`（迁移规则也会把旧的 `default` 改写成 `ask`）。

## 文件格式与字段 {#agents-format}

解析器显式"取走"五个第一方键，其余键全部原样收进 `overrides`；agent 名来自文件名而不是文件内容。[@ref-mv-agents-from-toml]

| 字段 | 默认 | 说明 |
| :-- | :-- | :-- |
| （文件名） | 必填 | 决定 agent 名（`path.stem`），文件内不能另起名字 |
| `display_name` | 文件名标题化（`my-agent` → `My Agent`） | 选择器里显示的名字 |
| `description` | 空串 | 说明；subagent 要有非空描述才会被广告给模型 |
| `safety` | `neutral` | 取值 `safe`/`neutral`/`destructive`/`smart`/`yolo` |
| `agent_type` | `agent` | 取值 `agent` 或 `subagent` |
| `instructions` | 无 | 内联提示词正文 |
| 其它任意键 | — | 全部当作配置覆盖（如 `active_model`、`system_prompt_id`、`enabled_tools`、`disabled_tools`、`[tools.*]`） |

同一份解析结果还带 `overrides` 与 `source_path` 两个派生字段。[@ref-mv-agents-from-toml] 官方参考页把 agent 文件里被支持/被记录的键单独列出，并明确它们"不在 `config.toml` 里"。[@ref-mv-docs-config-agent-files] 官方文档另有一个 `safety` 的重要限定：它只改变输入框边框颜色，**不强制权限**，所以要配 `enabled_tools`/`disabled_tools` 与逐工具权限一起用。[@ref-mv-docs-agents-custom]

README 给出的最小示例（用户级 `~/.vibe/agents/redteam.toml`，配合 `~/.vibe/prompts/redteam.md`）：[@ref-mv-readme-agents]

```toml
# Custom agent configuration for red-teaming
active_model = "mistral-medium-3.5"
system_prompt_id = "redteam"

# Disable some tools for this agent
disabled_tools = ["edit", "write_file"]

# Override tool permissions for this agent
[tools.bash]
permission = "always"

[tools.read]
permission = "always"
```

## 角色：主 agent、subagent 与内置/自定义 {#agents-roles}

角色只有两种，由 `AgentType` 枚举判定；`AgentSafety` 是另一套取值（权限姿态），不是角色。[@ref-mv-agent-enums] 两者用同一套机制：内置的七个 `AgentProfile` 就是以代码常量形式写死的条目，自定义文件同名字段直接替换它。[@ref-mv-agents-builtin-map]

差别在可选性上：`--agent` 只接受 `agent_type = "agent"` 的条目，把 subagent 当主 agent 选会报错。[@ref-mv-agents-select] 反向来看，subagent 集合就是类型过滤的结果。[@ref-mv-agents-subagents] 官方文档对用户的表述与此一致：`agent_type = "agent"` 可以用 `--agent` 或 `Shift+Tab` 选中，`agent_type = "subagent"` 只能由模型通过 `task` 工具拉起，用户不能直接选。[@ref-mv-docs-agents-custom] 文档站还把内置 subagent 的角色写清楚了：只读、用于代码库探索，不能向用户提问。[@ref-mv-docs-agents-builtin][@ref-mv-docs-agents-subagents]

插件也能提供 agent，但形态不同：插件里的 agent 只能是 subagent，名字带命名空间前缀，并且不进入 `AgentManager` 的发现表，而是由插件解析结果并入可委派类型集合（见 Native plugins 章节）。

官方文档给出的自定义 subagent 示例（只读、工具面收窄）：[@ref-mv-docs-agents-subagents]

```toml
# ~/.vibe/agents/research.toml
agent_type = "subagent"
display_name = "Research"
description = "Read-only subagent for research tasks."
safety = "safe"
enabled_tools = ["grep", "read_file"]
```

## 调用：显式选择与自动委派 {#agents-invocation}

显式路径有两处入口：启动参数 `--agent NAME`，以及 `config.toml` 的 `default_agent`（默认 `accept-edits`）。[@ref-mv-agents-select] 交互会话里还能用 `Shift+Tab` 循环切换，README 列出了内置 profile 的语义（`ask` 每次工具执行都要批准、`plan` 只读并自动批准安全工具、`accept-edits` 只自动批准文件编辑、`auto-approve` 全部自动批准）。[@ref-mv-readme-builtin-agents]

官方文档补充了一条容易踩的差异：`default_agent` **只对交互式会话生效**；程序化模式（`--prompt`）在没给 `--agent` 时回退到 `auto-approve`；此外 `--auto-approve` / `--yolo` 可以与任意 agent 组合，表示本次运行全部工具免批准。[@ref-mv-docs-agents-select]

自动委派路径是 `task` 工具：模型调用它并指定一个 subagent 类型，参数就是 `task`（任务描述）与 `agent`（默认 `explore`）。[@ref-mv-task-args] 选择规则由参数校验与权限共同决定：未知 agent 名报 "Unknown agent"；选中的不是 subagent 则报 "Only subagents can be used with the task tool"（明确写成"防止递归生成"的安全约束）；没有可用的 runner 也会报错。[@ref-mv-task-tool] README 用一句会话示例说明这个入口，并重申"把 `agent_type = "subagent"` 写进 agent 配置就能创建自定义 subagent"。[@ref-mv-readme-subagents]

## 覆盖与边界 {#agents-overrides-limits}

agent 的"覆盖"就是往配置层栈里插一个专门的 agent profile 层然后重建 orchestrator，因此任何配置字段都能被 agent 改：模型（`active_model`、`models`、`compaction_model`）、工具与权限（`enabled_tools`、`disabled_tools`、`[tools.*]`）、提示词（`system_prompt_id`）、甚至 `bypass_tool_permissions`。[@ref-mv-agent-profile-layer] 有三个字段是硬性例外：`vibe_base_url`、`console_base_url`、`vibe_code_sessions_base_url` 会被忽略，避免不受信任目录里的 agent 文件改写凭据流向。[@ref-mv-agent-profile-layer] 官方文档用的是同一句话：agent 是"叠加在全局配置之上的配置覆盖"，并把 `active_model`、`enabled_tools`、`disabled_tools`、`[tools.*]` 列进 agent 文件可写键。[@ref-mv-docs-config-agent-files]

可见性还有一层过滤：`available_agents` 会剔除安装未完成、被 `enabled_agents`/`disabled_agents` 排除、或尚未放行的实验 agent（例如 `smart-approve`），但显式在启动时选中的 agent 会被强制保留在本次会话的选择器里。[@ref-mv-agents-available]

委派边界有两条明确约束：

- **深度上限为 1**：subagent 内再调用 `task` 会报 "Agent depth limit of 1 reached"，即不允许递归生成 subagent。[@ref-mv-task-tool]
- **并发没有上限**：固定来源里没有子会话数量或信号量限制，只有名字唯一性要求；持续时间/轮次/预算继承父会话的运行时策略（程序化模式的 `--max-turns`、`--max-tokens`、`--max-price` 等）。这是本主题的显式缺口。

委派工具的默认权限允许列表只包含内置的 `explore`，其余靠逐工具权限配置覆盖。[@ref-mv-task-permission]

## 诊断 {#agents-diagnostics}

- **发现成功/失败**：加载时会打"发现的自定义 agent 与搜索路径"日志；单个文件失败记 warning 并跳过，重名同样有日志。[@ref-mv-agents-discovery]
- **为什么这个 agent 不可选**：`excluded_agent_message` 会给出可直接照做的原因，例如"需要先安装，用 `--agent NAME` 跑一次或把它加进 `installed_agents`""不在 `enabled_agents` 里""在 `disabled_agents` 里"。[@ref-mv-agents-diagnostics]
- **启动即失败**：`--agent` 指向不存在的 agent 会抛 `Agent not found`；把 subagent 当主 agent 选择也会给出明确错误。[@ref-mv-agents-select]
- **委派失败**：错误发生在调用时，消息本身区分"未知 agent""不是 subagent""深度超限""缺少 runner"四种情况。[@ref-mv-task-tool]
