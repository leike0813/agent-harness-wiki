# audit-devin-db1977d6-de59-4ef2-9e71-4fe333a94c56（devin · custom_agents · narrow_investigation）

- 任务：`monitor-20261013-devin`，role=worker，delivery=pr
- 候选：`/tmp/ahw-monitor-fa60cb88-ac51-446f-83dd-ae9a5d0a45e2-QlS6z6/batch-1/candidates/devin`
- 范围：`custom_agents` 的 `agents.entry`、`agents.format`、`agents.invocation`
- 协调者审计：`audit-devin-db1977d6-de59-4ef2-9e71-4fe333a94c56`

## 变化的来源

| source | baseline | observed | resolved_url |
| - | - | - | - |
| source-devin-cli-essential | `c303b3470eaf…` | `5732ff4937eb…` | https://docs.devin.ai/cli/essential-commands.md |
| source-devin-cli-subagents | `eecfc36fb6a3…` | `22a8a7142ddf…` | https://docs.devin.ai/cli/subagents.md |

其余 31 个已登记来源与 npm 身份本轮 unchanged。

## 已读入口

- `archive/devin/artifact-source-devin-cli-subagents-22a8a7142ddf/source.md`（本轮 observed 原件）
  用到的小节标题：How Subagents Work、Subagent Cost、Which Model Does a Subagent Use?、
  Influencing the Model、Enterprise Controls、Enabling and Disabling Subagents、
  Subagent Profiles、Tool Permissions、Monitoring Subagents（Subagent Indicator / Subagent Panel）、
  Foreground / Background Switching、Interrupting a Turn、Cancelling Subagents、
  Resuming Subagents、Nesting Depth、Custom Subagents（Creating a Custom Subagent /
  Definition File Format / Frontmatter Fields / How Custom Subagents Are Used / Examples）。
- `archive/devin/artifact-source-devin-cli-essential-5732ff4937eb/source.md`（本轮 observed 原件）
  用到的小节标题：Essential Commands、Starting Devin CLI、Running shell commands、Modes、
  Session History、Devin Cloud、Slash Commands、Keyboard Shortcuts。
- 交叉参照（未变化来源，只读）：`archive/devin/artifact-source-devin-cli-config-file-2d49f48a2677/source.md`
  的 Options Reference / `agent` 段。

## 逐题结论

| question | 结论 | 依据（当前原件小节） |
| - | - | - |
| agents.entry | 仍成立 | Creating a Custom Subagent：`agents/<name>.md` 与 `agents/<name>/AGENT.md` 两种布局；`AGENT.md` > `AGENTS.md` > `agent.md` > `agents.md`；frontmatter `name` 覆盖路径推导标识；`.devin/agents/`、`.agents/agents/`、`~/.config/devin/agents/`（Windows `%APPDATA%\devin\agents\`） |
| agents.format | 仍成立 | Definition File Format + Frontmatter Fields：与 skill 相同的 YAML frontmatter 加系统提示；五字段 name/description/model/allowed-tools/max-nesting 与默认值、`ask_user_question` 不可授予、`tools` 别名均未变 |
| agents.invocation | **不再完全成立** | Influencing the Model 由"两个手段"改为"三个手段"，新增 `agent.subagent_model` 用户配置杠杆；已发布 `ref-devin-sub-influence` 摘录只覆盖前两个 |

## 候选改动

- 新增 `knowledge/devin/chapters/devin-cli-custom_agents-v2.md`（v1 原样保留）：在
  `agents-invocation-overrides` 补写 `agent.subagent_model` 的优先级、作用范围与"仅对新会话生效"，
  并记录它在配置文件 Options Reference 的 `agent` 段尚未登记这一文档不一致。
- 新增 `knowledge/devin/references/ref-devin-sub-influence-user-model.yaml`（逐字短摘录 +
  `Influencing the Model` 章节定位）。
- 新增 `knowledge/devin/artifacts/artifact-source-devin-cli-subagents-22a8a7142ddf.yaml`
  与 `knowledge/devin/snapshots/snapshot-devin-lt-subagents-22a8a7142ddf.yaml`
  （`archived_document` + `archive_path`，原件留在原项目 archive，未复制进候选）。
- `registry/chapter-current.yaml` 保持基线不变：devin × custom_agents 仍指向
  `devin-cli-custom_agents-v1`（本审计 `review_status: pending`，v2 未获独立复核批准）。
- 更新 `audits/devin/audit-devin-db1977d6-….yaml`：`custom_agents` impact 的 reason 只写本轮三题的
  核对结论；`custom_providers` / `local_transcripts` 的 impact 与对应问题全部保留
  （`providers.diagnostics`、`transcripts.scope/naming/lifecycle`），`pending_question_ids` 同时保留
  `agents.*` 未完成题；investigation_notes 记录入口、逐题结论与限制。

## 限制（必须随审计一起读）

本轮**不能**做逐行比对。旧一版原件（essential 基线 `c303b347…`、subagents 基线 `eecfc36f…`）
未被 archive 保留。archive 内另有更早的两版（essential `8db93ee1…`、subagents `673dfc4e…`），
但它们既不是本轮基线也不是当前版，只能作参考、不能充当基线。因此审计写的是
"当前来源仍支持这些已发布答案"，**不是**"无变化"；这两个页面是否还有与本轮三题无关的部分
发生变化，本轮无法排除。

作为有限的旁证（仅供参考，不构成基线比对）：旧新两版 retained 原件之间，
subagents 页只有两处差异（新增第三杠杆、前台取消键描述改写），essential-commands 页只有两处差异
（页首导览链接、`Ctrl+C` 行描述）。

## 留待协调者处理的观察（超出本轮入口，未调查、未改写）

1. 同一次 subagents 页变化把 Cancelling Subagents 的前台取消键改为"空输入时 `Ctrl+C`，或连按两次
   `Esc`；非空草稿时 `Ctrl+C` 先清草稿" —— 触及 `agents.limits`、`agents.diagnostics`，保持 pending。
   v2 正文原句曾写作"`Ctrl+C` 或 `Esc`"，与 pinned 原件矛盾，本轮已按原件更正；`agents.diagnostics`
   的答案相应由 `answered` 降为 `partial`，该题保持 pending。
2. 同一次变化新增 Foreground / Background Switching 小节与面板 `f` 键表述，与 `agents.invocation`
   小节相邻但不在本轮入口内，已在 v2 中保留 v1 原文。
3. essential-commands 页的变化属 `custom_providers` / `local_transcripts` 主题，本轮未调查；
   两个主题的 impact 与问题仍在本审计中追踪，交由协调者另行分派，不会丢失。

## 复核

`agents.invocation` 的结论改动了已发布机制（新增用户级模型杠杆、优先级与生效范围），按高影响规则
保持 `review_status: pending`，声明需要独立 reviewer；`pending_audit_refs` 中三个未解决审计也未关闭。

## 验证

`pnpm maintenance:candidates check --candidate <candidate_root>` 通过。未运行 merge plan、
未 publish、未跑 `managed:packages`、未重新扫描来源。