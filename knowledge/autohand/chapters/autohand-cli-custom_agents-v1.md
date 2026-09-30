---
schema_version: 3
record_kind: production
edition_id: autohand-cli-custom_agents-v1
harness_id: autohand
topic: custom_agents
title: "Autohand Code CLI 的自定义 Agent、角色与委派"
sections:
  - section_id: agents-entry
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-subagents-discovery, ref-autohand-config-external-agents, ref-autohand-docs-subagents-create, ref-autohand-docs-extapi-agent]
  - section_id: agents-format
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-subagents-create, ref-autohand-agents-inline, ref-autohand-agents-skills]
  - section_id: agents-roles
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-subagents-what, ref-autohand-teams-arch, ref-autohand-docs-subagents-bundled, ref-autohand-docs-teams-specialists, ref-autohand-docs-extapi-agent, ref-autohand-docs-teams-what]
  - section_id: agents-invocation
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-subagents-what, ref-autohand-docs-subagents-parallel, ref-autohand-config-multiagent, ref-autohand-docs-teams-commands, ref-autohand-docs-teams-tasks, ref-autohand-agents-inline, ref-autohand-teams-arch]
  - section_id: agents-overrides-limits
    surface_ids: [cli]
    source_refs: [ref-autohand-agents-models, ref-autohand-teams-options, ref-autohand-docs-extapi-agent, ref-autohand-docs-subagents-guardrails, ref-autohand-config-multiagent, ref-autohand-docs-subagents-parallel]
  - section_id: agents-diagnostics
    surface_ids: [cli]
    source_refs: [ref-autohand-docs-subagents-troubleshooting, ref-autohand-config-multiagent, ref-autohand-docs-teams-commands, ref-autohand-docs-teams-tasks, ref-autohand-agents-monitoring, ref-autohand-teams-arch]
questions:
  - question_id: agents.entry
    answers:
      - surface_ids: [cli]
        section_id: agents-entry
        status: answered
        source_refs: [ref-autohand-docs-subagents-discovery, ref-autohand-config-external-agents, ref-autohand-docs-subagents-create]
  - question_id: agents.format
    answers:
      - surface_ids: [cli]
        section_id: agents-format
        status: answered
        source_refs: [ref-autohand-docs-subagents-create, ref-autohand-agents-inline]
  - question_id: agents.roles
    answers:
      - surface_ids: [cli]
        section_id: agents-roles
        status: answered
        source_refs: [ref-autohand-docs-subagents-what, ref-autohand-teams-arch, ref-autohand-docs-subagents-bundled, ref-autohand-docs-extapi-agent, ref-autohand-docs-teams-what]
  - question_id: agents.invocation
    answers:
      - surface_ids: [cli]
        section_id: agents-invocation
        status: answered
        source_refs: [ref-autohand-docs-subagents-what, ref-autohand-docs-subagents-parallel, ref-autohand-config-multiagent, ref-autohand-docs-teams-commands, ref-autohand-teams-arch]
  - question_id: agents.overrides
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-autohand-agents-models, ref-autohand-teams-options, ref-autohand-docs-extapi-agent]
  - question_id: agents.limits
    answers:
      - surface_ids: [cli]
        section_id: agents-overrides-limits
        status: answered
        source_refs: [ref-autohand-docs-subagents-guardrails, ref-autohand-config-multiagent, ref-autohand-teams-options]
  - question_id: agents.diagnostics
    answers:
      - surface_ids: [cli]
        section_id: agents-diagnostics
        status: answered
        source_refs: [ref-autohand-docs-subagents-troubleshooting, ref-autohand-config-multiagent, ref-autohand-docs-teams-commands, ref-autohand-agents-monitoring]
---

本页固定来源为 Autohand Code CLI 仓库 commit `a248656e78244f8387c0d0e436786fe801ad6599` 的自定义 agent/团队文档与配置参考，以及官方文档站 Sub-agents 与 Agent Teams 页面。固定问题只针对 `cli` 界面回答。

## 定义入口与来源 {#agents-entry}

自定义 agent 定义按「文件在前、内置在后、内联最高」的顺序加载，同名首次命中即生效（first-match-wins）：[@ref-autohand-docs-subagents-discovery]

1. 用户定义：`~/.autohand/agents/`（`AUTOHAND_HOME` 下的 `agents/`），支持 `.md`、`.markdown` 或 JSON，**文件名即 agent 名**。
2. 配置的外部目录：`externalAgents.paths` 按声明顺序加载，例如把仓库内的 `.autohand/agents` 加进来；相对路径以运行 Autohand 的目录为基准。[@ref-autohand-config-external-agents]
3. Autohand 自带定义（内置资源）。
4. 会话内联：`--agents`（或等价入口）传入的 JSON 覆盖同名文件定义，仅对本次进程有效。

`externalAgents` 的对象含 `enabled`（默认 `false`）与 `paths`（默认 `[]`）两个字段；不启用时用户目录仍是默认来源。[@ref-autohand-config-external-agents]

交互式创建用 `/agents new`，生成的 markdown 保存在 `~/.autohand/agents/`。扩展包也能以 `contributes.agents` 贡献定义，其 JSON 形式使用 `description`、`systemPrompt`、`tools`、可选 `model`，markdown 形式以文件名作为 agent 名。[@ref-autohand-docs-subagents-create][@ref-autohand-docs-extapi-agent]

**未证实项**：文档明确说明 Autohand 不会自动扫描项目目录或其他 Codex agent 目录，只有通过 `externalAgents.paths` 显式加入才参与发现；源码中未发现插件之外的第二套 agent 目录约定。检查过的入口：Sub-agents 的定义发现小节、`docs/config-reference.md` 的 External Agents。

## 定义格式与字段 {#agents-format}

markdown 定义以 YAML frontmatter 加正文，正文即该 agent 的 system prompt：[@ref-autohand-docs-subagents-create]

```markdown
---
description: Reviews billing changes for contract and webhook regressions
tools: read_file, fff_grep, fff_find
model: gpt-5.4
skills: systematic-debugging, root-cause-analysis
---

You are the billing-contract reviewer for this repository.
Report findings with file paths, line numbers, and the violated contract.
```

内联 JSON 是「agent 名 → 定义」的映射，字段表：[@ref-autohand-agents-inline]

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `description` | 是 | 一行摘要，显示在 `/agents` 并供编排器选择 |
| `prompt` | 是 | 该 agent 的 system prompt（角色、边界与输出契约） |
| `tools` | 否 | 数组或逗号分隔字符串；缺省为全部工具 |
| `model` | 否 | 仅对该 agent 覆盖模型 |

markdown frontmatter 与 JSON 的主要差异：markdown 用 `description`/`tools`/`model`/`skills`/`reasoning`，正文充当 prompt；若 markdown 定义省略 `tools`，该 agent 视为**不受限**，因此应显式声明最窄的工具集。`skills` 行声明该 agent 起始加载的技能，其余技能只按名字列出、由 agent 自行激活。[@ref-autohand-docs-subagents-create][@ref-autohand-agents-skills]

内联定义的其他行为：会话内有效、不写入 `~/.autohand/agents/`；出现在 `/agents` 与 system prompt 的 Available Agents 列表中，可像文件定义一样被团队 spawn；JSON 非法或缺 `description`/`prompt` 会在会话开始前报错并以非零退出码结束；若 `--agents` 的值不以 `{` 开头，则被当作外部 agent 目录路径。[@ref-autohand-agents-inline]

## 角色与原生/扩展实现的区分 {#agents-roles}

三层角色使用同一套定义机制：

- **主代理（lead）**：正常启动的交互会话，选择 worker、下发任务、汇总结果。[@ref-autohand-docs-subagents-what]
- **子代理（sub-agent）**：由定义创建的派生子 agent，同步返回结果。[@ref-autohand-docs-subagents-what]
- **teammate**：由 lead 以无头子进程方式 spawn（`autohand --mode teammate`），通过 stdio 上的 JSON-RPC 2.0 通信，受 lead 的任务表与消息路由管理，teammate 之间无直连通道。[@ref-autohand-teams-arch]

官方 Agent Teams 页面进一步说明角色边界：Agent Teams 把复杂任务拆成若干可并行的部分交给最多 5 个 teammate，每个 teammate 运行自己的 LLM 循环、拥有自己的工具权限、上下文窗口与工作分支，lead 负责拆解原任务、建任务表、spawn teammate 并收集结果（该功能需 Autohand Code v0.18 或更新，可用 `autohand --version` 核对）。[@ref-autohand-docs-teams-what]

原生实现有三个来源：随 CLI 发布的 6 个内置定义（`researcher`、`reviewer`、`tester`、`code-cleaner`、`docs-writer`、`todo-resolver`，各自工具边界不同，例如 researcher/reviewer 只读）；[@ref-autohand-docs-subagents-bundled]默认的 `awesome-sub-agents` 目录提供更窄的角色（`api-designer`、`security-auditor` 等），目录内容会演进，官方建议在使用具体名字前先检索实时 registry；[@ref-autohand-docs-teams-specialists]以及文件式用户/外部定义。扩展提供的实现通过 `contributes.agents` 声明，属于扩展包的一部分，需扩展已安装且启用。[@ref-autohand-docs-extapi-agent]

## 调用与自动委派 {#agents-invocation}

- 显式委派：`delegate_task` 是模型面向的工具，用户在提示词里描述「委派给某个具名 sub-agent」及任务契约（目标、范围、只读或可写、期望产物），而不是把工具名当斜杠命令输入。[@ref-autohand-docs-subagents-what]
- 并行委派：`delegate_parallel` 一次最多接受 5 个任务，适合互不依赖且（对可写 worker）不碰同一批文件的工作；从 lead 视角是同步的，全部子运行结束后得到一份带标签的合并结果。[@ref-autohand-docs-subagents-parallel]
- 自动编组：实验开关 `features.automaticSpecialists`（默认开，覆盖后需重启）在 lead 的 ReAct 循环之前解析显式的专家团队请求，渲染名册、并行执行有界的只读工作、串行执行会改动工作区的专家任务，并把结构化结果回馈给 lead。[@ref-autohand-config-multiagent]
- 团队：`/team create`、`/team status`、`/team shutdown` 与 `/tasks`、`/message 名称 文本`；创建向导会问团队名、最大 teammate 数（1–5）与总任务描述，也可用「team prompt」或 `--tmux` 启动。[@ref-autohand-docs-teams-commands][@ref-autohand-docs-teams-tasks]
- 选择规则：`description` 既是 `/agents` 的展示文案，也是编排器挑选 agent 的依据；自动分配发生在 teammate 首次上报 `team.ready` 或之后上报 `team.idle` 时，lead 取下一个待办且依赖已满足的任务。[@ref-autohand-agents-inline][@ref-autohand-teams-arch]

## 模型/工具覆盖与边界限制 {#agents-overrides-limits}

覆盖：
- 定义级 `model` 只对该 agent 生效，团队其他成员仍用全局默认。[@ref-autohand-agents-models]
- `~/.autohand/config.json` 的 `teams.agentModelOverrides` 以 agent 名为键，含 `provider` 与 `model`；`/agents provider` 与 `/agents provider 名称` 通过选择器保存团队默认或单个 sub-agent 的覆盖。[@ref-autohand-teams-options]
- 优先级（高到低）：显式 teammate 指派 → `SUB_AGENTS_PROVIDER` / `SUB_AGENTS_MODEL` 环境变量 → agent 级覆盖 → 团队默认 → 定义中的 `model` → lead 会话当前 provider 与 model；provider 与 model 始终成对解析。[@ref-autohand-teams-options]
- `tools` 是 allowlist，解析时对最终运行注册表生效并叠加上下文过滤与权限；子代理的工具调用继承会话的审批路径，委派不绕过权限策略。[@ref-autohand-docs-extapi-agent][@ref-autohand-docs-subagents-guardrails]

边界：
- 并行宽度：单次 `delegate_parallel` ≤5 个 worker。[@ref-autohand-docs-subagents-guardrails]
- 嵌套深度：默认最大嵌套 3 层，防止递归 agent 树无限扩张。[@ref-autohand-docs-subagents-guardrails]
- 团队上限：`teams.maxTeammates` 默认 5，是独立的 teammate 上限。[@ref-autohand-teams-options]
- 会话线程预算：`features.multi_agent_v2.max_concurrent_threads_per_session` 默认 9（1 个主 agent + 最多 8 个 subagent），可取 1–64；设为 1 时保留主 agent 并禁用委派；提高 `teams.maxTeammates` 不能绕过该会话级预算。[@ref-autohand-config-multiagent]
- 授权失败即关闭（fail closed）：teammate 由 lead 当前的工具能力、权限规则与 hooks 授权，无头 teammate 不会静默批准未解决的交互式请求。[@ref-autohand-config-multiagent]

**未证实项**：定义级是否支持声明沙箱或权限模式（如只读沙箱、worktree 隔离）没有在固定来源中出现；可写 worker 与 lead 同工作区，同一文件需串行或交给只读 worker。[@ref-autohand-docs-subagents-parallel]

## 诊断 {#agents-diagnostics}

- `/agents definitions` 列出当前会话已注册的定义（按文件名、`~/.autohand/agents/`、外部目录逐项核对）。[@ref-autohand-docs-subagents-troubleshooting]
- `/agents view` 查看直接与团队运行的实时活动、父子关系、模型/provider、用量、输出与错误；方向键选择、Enter 打开详情、`m` 打开消息编辑器、`c` 请求取消。[@ref-autohand-config-multiagent]
- `/team status` 显示团队名、成员状态与任务列表（每条任务带 owner 与 blocked-by，teammate 显示 idle/working/已完成），idle 表示在等待新工作或等待被阻塞的任务解除；`/tasks` 显示任务 ID、负责人与 blocked-by。[@ref-autohand-agents-monitoring][@ref-autohand-docs-teams-commands][@ref-autohand-docs-teams-tasks]
- 直接对话：`/message 名称 文本` 在运行中把消息发给指定 teammate，agent 把它当作对话的一部分并据此调整做法；`/message` 也是 lead 侧的路由入口，其 JSON-RPC 消息格式见 Teams 参考。[@ref-autohand-agents-monitoring][@ref-autohand-teams-arch]
- 失败定位：名字找不到时核对文件名与外部目录是否启用；子代理缺工具时检查 `tools` 字段；并行结果矛盾时比较证据而非按 agent 计数表决；并行编辑冲突时停止重叠工作并显式分配文件所有权。[@ref-autohand-docs-subagents-troubleshooting]

**未证实项**：没有独立的 agent 定义校验命令（不同于扩展的 `extensions validate`），内联 JSON 的字段错误只在会话启动时报出。检查过的入口：`/agents` 子命令、Team commands 表、Sub-agents Troubleshooting。
