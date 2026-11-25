# amp 上游审阅报告 · 2026-11-25 冻结观察

## 给维护者的结论

本轮 triage 分类为 maintain。审计 `audit-amp-1ff8b02b-6c1f-4070-bc8f-4985ab18fe65` 的冻结观察时间 2026-11-25T00:28:01.101Z。三个官方文档有正文变化，其中一个产生答案更新：

- `source-amp-docs-customize-model-routing`：`9c6c1b88…` → `f43509fa…`。Precedence 之后新增整节 **Block Amp-Billed Inference**（工作区管理员停用第 3 步 Amp 额度）。候选修订为 `amp-cli-configuration-v5` 与 `amp-cli-custom_providers-v5`。
- `source-amp-docs-the-dial`：`e84fa1e1…` → `ee987b8c…`。Who Pays 首句删掉 icon 行措辞、Claude Code 段删除指向 `/news/use-your-claude-plan` 的概览链接；两段都不被选中章节引用，判为无答案变化。
- `source-amp-docs-cli-runners`：`864e50fc…` → `8d8f19f5…`。Portals 在 Windows runner 上不受支持、Portal 能力行补 macOS/Linux 限定；属于平台支持说明，不改变配置机制。

`source-amp-npm` 的 `0.0.1795449633-g4295dd` → `0.0.1795564863-gd17172` 是同一 0.0.x 开发构建的身份前移，不产生章节影响或版本映射。

## 变化的意义与证据边界

### Model routing：工作区阻断 Amp 计费

基线到观察的唯一正文 diff 是新增小节：

- 工作区管理员在 **Workspace Model Routing** 打开 **Block Amp-Billed Inference**（默认关闭），停掉路由顺序第 3 步 Amp 额度；
- 成员只能用 personal 或 workspace 的 connection 服务模型；没有 connection 服务的请求失败，消息说明工作区要求连接并指出添加位置，而不是使用 Amp credits；
- 覆盖工作区线程内 agent 的模型请求：未连接凭据的成员、到达用量上限的订阅（仍可在同套餐另一条订阅间切换）、子代理/线程标题/压缩、box 与服务账号线程、Auto Painter、插件决策、orb 内代码经 Amp 的请求；
- 不覆盖 agent 之外的用量：Dictation、Puck 语音、连接都不服务其模型时的媒体分析、Sign in with Amp 应用、orb/box/Mac satellite 运行时长、web 搜索与读取网页；Enterprise 计价下连接服务的 token 仍收 Amp fee。

Precedence 的顺序列表、priority 段与路由图句逐字未变，既有 order/priority 引用保持有效。

已固定的证据：

- artifact `artifact-source-amp-docs-customize-model-routing-f43509facf77`（archive 原件已按 observed sha256 `f43509fa…` 保留）
- snapshot `snapshot-amp-docs-customize-model-routing-20261125`（`source_fetched_at` 2026-11-25T00:27:59.592Z）
- reference `ref-amp-routing-block-amp-billed`（locator 小节 `Block Amp-Billed Inference`，摘录覆盖设置、失败消息、默认关闭与覆盖范围开头）

章节变更：

- `amp-cli-configuration-v5`：`config-trust` 增加「阻断 Amp 计费推理」政策条目，`config.trust` answer 追加新引用。
- `amp-cli-custom_providers-v5`：`providers-entry` 指向该策略；`providers-routing` 写覆盖范围与失败行为；`providers-diagnostics` 增加失败消息入口；`providers.entry`、`providers.forwarding`、`providers.responses`、`providers.diagnostics` answer 追加新引用。
- `registry/chapter-current.yaml` 选择 `amp-cli-configuration-v5` 与 `amp-cli-custom_providers-v5`。

### Dial：Who Pays 措辞与 Claude 订阅概览链接

基线到观察的 2 处变化：

1. Who Pays 首句去掉「icon on each row of the selector」描述，只保留「selector 显示模型计费到哪：订阅、API key 或 Amp credits」；紧随的 personal → workspace → Amp 顺序句未变。
2. Claude Code 段删除句末「For an overview, read Use Your Claude Subscription in Amp」链接，Amp 服务器侧运行与「无需在 orb/runner 安装」的说明未变。

现有 dial 引用只覆盖 first-message、off-dial、custom-modes、build、tune、tune-subagents、preset-follow、preset-role-override、auto、system-models 与 ChatGPT 订阅段，不包含 Who Pays 或该 Claude 段；被删链接指向 `/news` 概览，不是任何已发布结论的依据。判为无答案变化，不新建章节、快照或引用。

### Runners：Portals 的平台限制

基线到观察的 2 处正文变化：Portals 段新增「Portals are not supported on Windows runners yet」，Portal 能力行改为「Available on macOS and Linux when you start the runner with `--remote-control-portals`」。这些是 Portals 的平台支持说明，不改变配置来源、优先级、环境变量或 provider 路由；被引用段（How It Works、Secrets & Env Vars、What to Expect、Troubleshoot a Runner）逐字未变，无答案变化。

## 逐题结论

| 主题 | 问题 | 结论 |
| --- | --- | --- |
| configuration | `config.trust` | 已更新：`amp-cli-configuration-v5` 记录工作区阻断 Amp 计费策略 |
| configuration | `config.runtime` | 无变化：runners 引用段逐字未变 |
| custom_providers | `providers.entry`、`providers.forwarding`、`providers.responses`、`providers.diagnostics` | 已更新：路由第 3 步可停用、失败行为与诊断入口 |
| custom_providers | `providers.auth`、`providers.protocol`、`providers.models`、`providers.metadata` | 无变化：变化只在新增策略节，引用段逐字未变 |
| custom_agents | `agents.roles`、`agents.invocation`、`agents.overrides` | 无变化：dial 变化段不被引用 |
| local_transcripts | `transcripts.lifecycle` | 无变化：`ref-amp-dial-first-message` 段未变 |

## 待处理与独立复核

**审计记录：** `audits/amp/audit-amp-1ff8b02b-6c1f-4070-bc8f-4985ab18fe65.yaml`。本轮 14 个 pending 问题全部完成，`pending_question_ids: []`，`review_status: reviewed`。**待处理旧审计：** 本审计不引用历史 pending 审计，`pending_audit_refs: []` 只表示本审计不借旧审计结案；历史审计保持原状态、未被关闭。

高影响判据逐条排除：新增的是默认关闭的可选工作区策略，未推翻已发布配置步骤，无来源冲突，无跨主题加载机制变化，因此不要求独立 reviewer。

## 验证

候选自检：`pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-9/candidates/amp`（exit 0）。
