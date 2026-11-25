# replit-agent 巡检维护报告（2026-11-25 冻结观察）

- 审计：`audit-replit-agent-bedf04de-2902-4ad0-9b62-f53887028d54`
- 上一次审计：`audit-replit-agent-84a7b1bc-b219-49f3-a6eb-10acfa66eb5c`
- 角色：worker，`delivery=local`（候选隔离），未发布、未切换全局指针、未运行受管二进制
- 观察：37 个官方文档来源全部 changed（`checked_at` 2026-11-25T00:29:30.225Z）

## 1. 给维护者的结论

本轮 37 个来源的字节都变了，但绝大多数是 Mintlify 渲染方式变化：旧快照里嵌着 JSX/CSS/SVG
组件源码，新观察是带 card/tab/accordion 的干净 Markdown。按可见文本逐页比对后，只有四处
变化需要改答案：**plan-mode**（Plan toggle 被移除）、**agent-modes**（Plan Mode 从每用户
设置列表移除）、**model-selector**（Power 模型表 GPT-6 Luna Fast → GPT-6.1 Terra）、
**workspace-settings**（新增账户策略 / Workspace exception / Workspace managed 委托控制）。

已交付两个新章节版本：`replit-agent-web-configuration-v2`（账户/Workspace 策略三层取值与
锁定项观察点）与 `replit-agent-web-custom_providers-v2`（模型表更新）。**custom_agents 没有
生成新版本**：plan-mode 的新文本明确推翻已发布的 Plan toggle 与审批步骤，按 wave 契约
hold + flag，保留 `replit-agent-web-custom_agents-v1` 为 current，等待独立复核。

## 2. 验证窗口与基线限制

本项目**没有保留监控基线**。最新保留原件是 2026-09-30T16:51Z 抓取的 37 个
snapshot；候选 artifact 的 `archive_path` 能逐字读到这些文件，因此每个来源的验证窗口是
**2026-09-30 快照 → 2026-11-25 观察**。

窗口内还存在 10-03、10-06、10-08、10-11、10-12、10-13、10-14、10-22、10-23、10-24
等中间观察，但对应原件没有保留。本报告不能声称这些中间版本各自改了什么；所有结论都只覆盖
两端。审计 YAML 的 `baseline` 字段记录冻结观察时的基线身份：多数来源与 2026-09-30 保留原件
相同，但 `source-replit-docs-index`（保留 `e700dae0…`，baseline `83aeb8a8…`）与
`source-replit-replit-ai-integrations-doc`（保留 `23f23c11…`，baseline `b380929a…`）的最新
保留原件比 baseline 更旧。这两页的差异不能全部归因于本轮，只能作低置信度证据，且不进入
需要改答案的结论。

## 3. 语义变化与证据

### 3.1 workspace-settings：账户策略、Workspace exception 与委托控制

新页在 `Workspace settings` 下新增 `Manage delegated controls`，在 `Account settings` 下新增
`Account policies and Workspace exceptions` 与 `Delegate a setting to Workspace admins`：

- 账户管理员在 **Settings → Advanced** 对受支持设置三选一：**Account-wide policy**（跨
  Workspace 共享规则）、**Workspace exception**（只改一个 Workspace 的值）、**Workspace
  managed**（把取值权委托给该 Workspace 管理员）。
- Workspace 管理员在 **Settings → Workspace settings** 只能改被委托的控件；标注
  **Set by account policy** 的控件被锁定，需要账户管理员改策略或配置 exception。
- 委托只适用于单个受支持的设置，不是所有控件。

这直接补上了 `config.sources`（Advanced 的新职责）、`config.overrides`（作用域优先级）、
`config.trust`（策略 > Workspace 设置）与 `config.diagnostics`（锁定项是可观察信号）。
新固定件：

- `snapshot-replit-workspace-settings-doc-20261125`（observed `b2112f94…`，artifact
  `artifact-source-replit-workspace-settings-doc-b2112f942d12`，archive raw.md 已按 observed
  sha256 保留）
- `ref-replit-config-ws-policy-20261125`、`ref-replit-config-ws-delegated-20261125`

旧 `snapshot-replit-workspace-settings-doc`、`ref-replit-config-ws-settings` 与
`configuration-v1` 全部保留未改。

### 3.2 model-selector：Power 模型表更新

新表把 Power 的 `GPT-6 Luna Fast` 换成 `GPT-6.1 Terra`；Max 表（GPT-6 Astra、Claude Fable
5.1、Claude Opus 5.5/4.8/5、Claude Opus 5 Fast、Kimi K3）不变。手动选择步骤第 2 步改为
"Select **Power** or **Max** to expand that mode's model list"，rollout/授权差异、Fast 需
Pro/Enterprise、Effort 与 Compare models 的语义未变。

新固定件：`snapshot-replit-model-selector-doc-20261125`（observed `bc13f508…`，artifact
`artifact-source-replit-model-selector-doc-bc13f50898f5`）与
`ref-replit-prov-selector-models-20261125`。`custom_providers-v2` 只改 `providers-models-metadata`
的模型表句子；`providers.entry/auth/protocol/metadata/forwarding/responses/diagnostics` 的
机制答案不变。

### 3.3 plan-mode / agent-modes：推翻已发布步骤，hold + flag

plan-mode 页整页重写为 "Plan with Replit"：

- 明确 **"The Plan toggle is no longer used"**；`/plan` 变成可选快捷键，用普通语言要求规划即可，
  模型还会主动提议计划。
- 旧的 `Accessing Plan Mode`（聊天输入框右下角 Plan toggle）与
  `2. Task approval and building`（Review/Revise/Cancel、Build here、Build in background、
  首次 checkpoint 前 Start building、Automatically apply changes）整段消失，改为审阅方案后
  要求 Replit 实施。
- 计费段落保留并改写：规划本身是 Replit AI work，付费请求即使只得到解释或计划也可能计费。

agent-modes 同时把每用户设置列表里的 **Plan Mode** 移除（剩 Mode、Primary model/Effort、
Auto-merge、Auto-approve）。

这推翻了已发布 `agents-surfaces`（Plan Mode 作为右下角开关）、`agents-invocation`
（Revise/Cancel/Build here/Build in background）与 `agents-limits-overrides`（每用户设置含 Plan
Mode）。按 wave 契约：

- **未创建** `replit-agent-web-custom_agents-v2`，草稿不进入候选；
- `registry/chapter-current.yaml` 仍选 `replit-agent-web-custom_agents-v1`；
- 审计 `review_status` 保持 `pending`，需要独立复核后再决定新版本的措辞与范围。

另：新 docs-index 新增 `Code` 一节与 "Work with a team of agents"（独立 worker chats）、
`worker agents` 导航与 `Missions`（`/mission`）。这些只是索引标题与一句摘要，没有定义、
并发、权限或诊断细节，不足以改写 `agents.roles/entry/limits`；记为新证据缺口，待页面级来源。

### 3.4 其余来源

- **品牌与组件化**：overview、task-system、general-agent、mcp-*、integrations、
  secrets、checkpoints、replit-md、workspaces、add-collaborators、groups-permissions、
  enterprise-model-controls、modes-and-models、auto-mode、memories、custom-instructions、
  skills 系列等，语义段落逐字未变。
- **入口措辞**：customization / standardization / memories / custom-instructions 把
  "Workspace Settings → Customization" 写成 "Customization in Settings"，同一 Settings 入口；
  connect-via-mcp 补 Discover integrations → MCP 与 "Add custom → Add personal/workspace MCP
  server"；managing-connectors / custom-connectors 把 Integrations 写成 Settings 内入口。
  这些都在既有 `mcp.entry` / `skills.roots` 答案覆盖范围内，没有推翻旧步骤。
- **新服务条目**：integrations 新增 Firecrawl connector（自有 Firecrawl key，不计 Replit
  credits）与 Firecrawl Agent service（计入 Replit credits，用量页 `AI → Tools → firecrawl`）；
  不改变 Connectors/MCP 的机制分类。
- **app-configuration**：Show hidden files 入口改为 Library → Files → Search files 三点菜单；
  `.replit`/`replit.nix` 字段与弃用说明未变。config 章节只写"需要 Show hidden files"，未写错入口。
- **git-pane**：Git 入口改为 Tools → Setup → Git，Shell 入口改为 + → Tools & files →
  Search tools；Git/gh/glab 能力与凭据告警未变。
- **user-settings**：类别改为 Agent / App Preview / Appearance / Code Editing / Advanced
  Developer Settings；Production Alerts 改到 Settings → Notifications → Email Notifications
  下方；仍然没有记录/导出设置，local_transcripts 的结论不变。
- **replit-ai-integrations**：app 侧模型清单更新（新增 gpt-6.1-sol、gpt-6-astra/sol/luna、
  claude-sonnet-5、gemini-3.7/3.5 flash 等，移除旧 gpt-5.x），Last updated 2026-10-02；本章
  不枚举 app 侧清单，答案不变。
- **docs-index**：Chat→Chats、Build→Apps、Design→Designs，新增 Code 节、Missions 与 worker
  agents 导航；只作新证据记录，不改八主题答案。

## 4. 本次发布与保留

| 主题 | 章节版本 | 受影响问题与状态 | 结果 |
| --- | --- | --- | --- |
| configuration | `replit-agent-web-configuration-v2` | config.sources / overrides / trust / diagnostics：partial（扩展账户策略与委托控制） | 新版本已进入候选并设为 current |
| custom_providers | `replit-agent-web-custom_providers-v2` | providers.models：partial（Power 表更新） | 新版本已进入候选并设为 current |
| custom_agents | `replit-agent-web-custom_agents-v1`（保留） | agents.roles / agents.invocation / agents.overrides：旧答案已被 plan-mode 改写推翻（涉及 section agents-surfaces、agents-invocation、agents-limits-overrides）；agents.roles 的 docs-index worker chats 线索亦不足 | 保留旧版本，hold + flag，待独立复核 |
| 其余 5 主题 | 原版本 | 逐题核对无答案变化 | 不动 |

旧章节、旧快照、旧引用全部保留；没有新增 software mapping（37 个来源都是
`version_applicability: unknown`，没有 npm/Git 版本身份可映射）。

## 5. 待处理与独立复核

**审计记录：**本目录 YAML。**待处理旧审计：**f9dec7ee、3eac336d、50b6e7ad、d90a82ec、
8e2da212、8d52239b、51258176、9c858d69 是历史记录；`pending_audit_refs` 已按 wave 要求置空，
本审计不关闭也不改写它们。

**待复核问题：**`agents.roles`、`agents.invocation`、`agents.overrides`（涉及 section
`agents-surfaces`、`agents-invocation`、`agents-limits-overrides`；触发原因：新证据
推翻已发布的 Plan toggle 与审批步骤；`agents.roles` 另有 docs-index 新增 worker chats 线索，
证据仅索引级）。复核状态：未开始；本报告不把作者自审当作独立复核。

## 6. 来源核查记录

| 来源 | 基线 → 观察 | 实际内容变化 |
| --- | --- | --- |
| source-replit-agent-skills-doc | `ade22d80…` → `349390c5…` | 组件噪声；语义不变 |
| source-replit-agent-skills-directory-doc | `3de5830d…` → `1411e2a0…` | Note/card；语义不变 |
| source-replit-agent-customization-doc | `ccb19fe5…` → `24d5a2d3…` | 入口措辞；权限表不变 |
| source-replit-agent-use-skills-doc | `42191279…` → `7f694d14…` | 步骤拆分；语义不变 |
| source-replit-agent-skills-learn-doc | `a80b1353…` → `a47c14b1…` | 组件噪声；语义不变 |
| source-replit-standardization-doc | `b256d9a9…` → `3148fefe…` | 入口措辞；语义不变 |
| source-replit-mcp-overview-doc | `831a2fd5…` → `b56666d6…` | card；server/安全段不变 |
| source-replit-connect-via-mcp-doc | `d6b920e8…` → `dcd9061b…` | 入口细化；无推翻 |
| source-replit-mcp-server-doc | `ad808f18…` → `01854f1f…` | tab/card；语义不变 |
| source-replit-managing-connectors-doc | `c2b37090…` → `4134309b…` | 入口措辞；语义不变 |
| source-replit-mcp-concept-doc | `9f440457…` → `38785285…` | accordion；语义不变 |
| source-replit-integrations-doc | `7734443c…` → `d77696f7…` | 新增 Firecrawl 条目 |
| source-replit-custom-connectors-doc | `5974ba74…` → `e374eb27…` | 入口/步骤；字段不变 |
| source-replit-agent-overview-doc | `67fcf13d…` → `2b15ff78…` | 品牌化；可用性表不变 |
| source-replit-agent-modes-doc | `e7ed5554…` → `5bdfafe7…` | Model tiers；移除 Plan Mode 设置项 |
| source-replit-general-agent-doc | `cf682246…` → `6475df7f…` | accordion；语义不变 |
| source-replit-task-system-doc | `8a3c639a…` → `847730cc…` | 品牌化；并发上限不变 |
| source-replit-task-lifecycle-doc | `de8cb2f4…` → `b5ed69df…` | 移除内嵌组件；状态语义不变 |
| source-replit-plan-mode-doc | `ee3b6b21…` → `5c8f554f…` | 整页重写；推翻 Plan toggle 与审批步骤 |
| source-replit-enterprise-model-controls-doc | `7fee37ae…` → `3df2325a…` | Note/步骤；语义不变 |
| source-replit-modes-and-models-doc | `3429aeef…` → `fa5989af…` | 步骤/截图；语义不变 |
| source-replit-model-selector-doc | `58724c6a…` → `bc13f508…` | Power 表更新 |
| source-replit-auto-mode-doc | `af8a94cc…` → `4a0a9c74…` | 组件噪声；语义不变 |
| source-replit-replit-ai-integrations-doc | `b380929a…` → `d095b488…` | app 侧模型清单更新 |
| source-replit-replit-md-doc | `e903d88e…` → `5851ae5a…` | Note/截图；语义不变 |
| source-replit-app-configuration-doc | `d21b21f7…` → `8277fc21…` | Show hidden files 新入口 |
| source-replit-secrets-doc | `9b1c3ae3…` → `49bc77cb…` | Note/截图；语义不变 |
| source-replit-custom-instructions-doc | `50980d06…` → `3adb6239…` | 入口措辞；语义不变 |
| source-replit-workspace-settings-doc | `9f731941…` → `b2112f94…` | 新增账户策略/exception/委托控制 |
| source-replit-memories-doc | `bbdfb09d…` → `c5df7fc2…` | accordion；语义不变 |
| source-replit-user-settings-doc | `0028b7f2…` → `94ab7a54…` | 类别重组；仍无记录设置 |
| source-replit-workspaces-doc | `be0ad7d6…` → `6a488b1a…` | 截图/card；语义不变 |
| source-replit-add-collaborators-doc | `f3001592…` → `54a7f554…` | 入口措辞；角色不变 |
| source-replit-groups-permissions-doc | `413533b1…` → `215fe7b9…` | 步骤/截图；权限不变 |
| source-replit-checkpoints-doc | `90d0c23e…` → `01298cd4…` | 截图/Note；语义不变 |
| source-replit-git-pane-doc | `f89eab24…` → `f7a75c85…` | Git/Shell 新入口 |
| source-replit-docs-index | `83aeb8a8…` → `e4fada62…` | 章节改名 + Code/Missions/worker agents 导航 |

## 7. 验证与差异入口

```sh
cd /home/joshua/Workspace/Code/JavaScript/agent-harness-wiki
pnpm -s maintenance:candidates check --candidate /tmp/ahw-batch-11/candidates/replit-agent
```

结果：通过（exit 0），列出候选文件清单；章节引用、问题覆盖、章节选择与审计引用均由工具校验。

新增固定件：

- `knowledge/replit-agent/artifacts/artifact-source-replit-workspace-settings-doc-b2112f942d12.yaml`
- `knowledge/replit-agent/artifacts/artifact-source-replit-model-selector-doc-bc13f50898f5.yaml`
- `knowledge/replit-agent/snapshots/snapshot-replit-workspace-settings-doc-20261125.yaml`
- `knowledge/replit-agent/snapshots/snapshot-replit-model-selector-doc-20261125.yaml`
- `knowledge/replit-agent/references/ref-replit-config-ws-policy-20261125.yaml`
- `knowledge/replit-agent/references/ref-replit-config-ws-delegated-20261125.yaml`
- `knowledge/replit-agent/references/ref-replit-prov-selector-models-20261125.yaml`
- `knowledge/replit-agent/chapters/replit-agent-web-configuration-v2.md`
- `knowledge/replit-agent/chapters/replit-agent-web-custom_providers-v2.md`

未运行：`pnpm knowledge:validate`、`pnpm sources:audit-log`、任何构建/发布/受管二进制命令
（worker 不发布；这些由 coordinator 在集成后运行）。已知风险：harness-monitor 工作树没有
2026-09-30 的旧 archive 原件，若在该树运行 `sources:audit-log`，旧 artifact 会报缺失；本轮的
两个新原件已在 harness-monitor/archive 下按 observed hash 保留。
